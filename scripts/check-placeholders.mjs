#!/usr/bin/env node
// Falla si quedan placeholders [[PENDIENTE: ...]] o falta SITE_URL. Se ejecuta en `npm run build:prod`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src/config', 'src/data', 'src/content/hacking', 'src/pages', 'src/components'];
const hits = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|astro|md|mdx|json)$/.test(name)) scan(p);
  }
};
const scan = (file) =>
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('//') || t.startsWith('*') || t.startsWith('<!--')) return; // comentarios y documentación
    if (/\[\[PENDIENTE/.test(line)) hits.push(`${file}:${i + 1}  ${t.slice(0, 90)}`);
  });
roots.forEach((r) => { try { walk(r); } catch { /* carpeta opcional */ } });

const problems = [];
if (hits.length) problems.push(`${hits.length} placeholder(s) sin rellenar:\n  ` + hits.join('\n  '));
if (!process.env.SITE_URL || /example\.com/.test(process.env.SITE_URL))
  problems.push('SITE_URL no definida (o es example.com). Ejemplo: SITE_URL=https://midominio.com npm run build:prod');

if (problems.length) {
  console.error('\n✗ NO SE PUEDE PUBLICAR:\n' + problems.join('\n\n') + '\n');
  process.exit(1);
}
console.log('✓ Sin placeholders y SITE_URL definida.');
