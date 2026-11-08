import type { APIContext } from 'astro';
import { withBase } from '../utils/url';
export const GET = ({ site }: APIContext) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('/sitemap-index.xml'), site).href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
