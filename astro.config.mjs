import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { arcadeTheme } from './src/config/shiki-theme.ts';
import { remarkCallouts, remarkExternalLinks } from './src/utils/remark-callouts.mjs';

// GitHub Pages: el workflow (.github/workflows/deploy.yml) define SITE_URL y BASE_PATH automáticamente.
//  - Repo "usuario.github.io"  → SITE_URL=https://usuario.github.io  BASE_PATH=/
//  - Repo de proyecto "web"     → SITE_URL=https://usuario.github.io  BASE_PATH=/web
const site = process.env.SITE_URL || 'https://example.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [sitemap({ filter: (p) => !p.includes('/404') })],
  markdown: {
    processor: unified({ remarkPlugins: [remarkCallouts, remarkExternalLinks] }),
    shikiConfig: { theme: arcadeTheme, wrap: false },
  },
  vite: {
    plugins: [tailwindcss()],
    // Sin scripts inline: los assets se emiten siempre como ficheros.
    build: { assetsInlineLimit: 0 },
  },
});
