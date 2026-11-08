/** Antepone el `base` del sitio (necesario en GitHub Pages de proyecto: /nombre-repo/). Idempotente. */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (base && (path === base || path.startsWith(base + '/'))) return path;
  return base + (path.startsWith('/') ? path : '/' + path);
};
