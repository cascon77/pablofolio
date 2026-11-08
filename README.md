# Web personal · Portfolio + Hack Blog

Sitio 100 % estático (Astro 7 + TypeScript + Tailwind 4). Estética arcade/cyberpunk en naranja.

## Requisitos
- **Node.js ≥ 22.23.4** (requisito de Astro 7) y npm.

## Comandos
| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo (muestra borradores) |
| `npm run build` | Comprueba tipos y compila a `dist/` (permite placeholders) |
| `npm run build:prod` | Como `build`, pero **falla** si quedan `[[PENDIENTE: ...]]` o falta `SITE_URL` |
| `npm run new-post -- htb mi-maquina "Título"` | Crea un artículo con plantilla (`draft: true`) |

## Dónde editar
- Tus datos: `src/data/profile.ts`, `src/data/projects.ts`, `src/config/site.ts`
- Foto: `src/assets/profile.jpg` (opcional; jpg, png o webp). Si no existe, se muestra `public/og/yo.jpeg`.
- Artículos: `src/content/hacking/<plataforma>/<slug>/index.md`
- Categorías: `src/config/taxonomy.ts`
- Blogs activos/bloqueados: `src/config/blogs.ts`

## Despliegue en GitHub Pages
1. Sube el proyecto a GitHub (rama `main`).
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada `git push` a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica.

La URL y el `base` se calculan solos: si el repo se llama `usuario.github.io` se publica en la raíz;
si tiene otro nombre, en `https://usuario.github.io/<repo>/`. Con dominio propio, define `SITE_URL`
(y `BASE_PATH=/`) en el workflow y añade `public/CNAME`.

Prueba local como en producción: `SITE_URL=https://usuario.github.io BASE_PATH=/mi-repo npm run build && npm run preview`.
