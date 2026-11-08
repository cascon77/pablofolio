import { getCollection, type CollectionEntry } from 'astro:content';
import { blogs, type BlogId } from '../config/blogs';
import { taxonomies, type TaxKey } from '../config/taxonomy';
import { withBase } from './url';

export type Post = CollectionEntry<'hacking'>;

/** Posts publicados de un blog activo, del más reciente al más antiguo. En dev se ven también los borradores. */
export async function getPosts(blog: BlogId): Promise<Post[]> {
  const def = blogs[blog];
  if (def.status !== 'active') return [];
  const all = await getCollection(def.collection as 'hacking', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const blogUrl = (blog: BlogId) => withBase(`/${blogs[blog].base}/`);
export const postUrl = (blog: BlogId, p: Post) => withBase(`/${blogs[blog].base}/${p.id}/`);
export const termUrl = (blog: BlogId, tax: TaxKey, term: string) => withBase(`/${blogs[blog].base}/${tax}/${term}/`);

const normalizeTerm = (term: string) =>
  term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

/** Tags are only shown as tags when they add information beyond the other taxonomies. */
export function uniqueTags(p: Post): string[] {
  const d = p.data;
  const representedTerms = [
    d.platform,
    termLabel('platform', d.platform),
    ...(d.difficulty ? [d.difficulty, termLabel('difficulty', d.difficulty)] : []),
    ...(d.os ? [d.os, termLabel('os', d.os)] : []),
    ...d.topics.flatMap((topic) => [topic, termLabel('topic', topic)]),
  ].map(normalizeTerm);
  const represented = new Set(representedTerms);
  const seen = new Set<string>();

  return d.tags.filter((tag) => {
    const normalized = normalizeTerm(tag);
    if (!normalized || represented.has(normalized) || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

export function termsOf(p: Post, tax: TaxKey): string[] {
  const d = p.data;
  switch (tax) {
    case 'platform': return [d.platform];
    case 'difficulty': return d.difficulty ? [d.difficulty] : [];
    case 'os': return d.os ? [d.os] : [];
    case 'topic': return d.topics;
    case 'tag': return uniqueTags(p);
  }
}

export function termLabel(tax: TaxKey, term: string): string {
  const v = taxonomies[tax].vocab as Record<string, string> | null;
  return v?.[term] ?? term;
}

export function compactTermLabel(tax: TaxKey, term: string): string {
  return tax === 'topic' && term === 'privesc' ? 'Privesc' : termLabel(tax, term);
}

/** Mapa término → posts, ordenado por nº de posts. */
export function collectTerms(posts: Post[], tax: TaxKey): [string, Post[]][] {
  const m = new Map<string, Post[]>();
  for (const p of posts) for (const t of termsOf(p, tax)) m.set(t, [...(m.get(t) ?? []), p]);
  return [...m.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

export function readingMinutes(body?: string): number {
  const content = body ?? '';
  const codeBlocks = [...content.matchAll(/```[^\n]*\n([\s\S]*?)```/g)];
  const code = codeBlocks.map((match) => match[1]).join(' ');
  const images = [...content.matchAll(/!\[[^\]]*\]\([^)]+\)/g)].length;
  const prose = content
    .replace(/```[^\n]*\n[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const countWords = (text: string) => text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const estimatedMinutes = countWords(prose) / 200 + countWords(code) / 100 + images / 5;

  return Math.max(1, Math.ceil(estimatedMinutes));
}

export const fmtDate = (d: Date) => d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
