import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { blogs, type BlogId } from '../../config/blogs';
import { getPosts, postUrl } from '../../utils/posts';

export function getStaticPaths() {
  return [];
}
export async function GET(ctx: APIContext) {
  const id = (ctx.props as { id: BlogId }).id;
  const posts = await getPosts(id);
  return rss({
    title: blogs[id].title,
    description: blogs[id].description,
    site: ctx.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: postUrl(id, p) })),
    customData: '<language>es-es</language>',
  });
}
