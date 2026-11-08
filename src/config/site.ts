// Datos globales del sitio. Los placeholders [[PENDIENTE: ...]] hacen fallar `npm run build:prod`.
export const site = {
  name: 'Pablo Rodríguez Cascón',
  shortName: 'Pablo',
  title: 'PabloFolio',
  description: 'Portfolio personal de Pablo Rodríguez Cascón, desarrollador de aplicaciones multiplataforma y especialista en seguridad informática.',
  lang: 'es',
  locale: 'es_ES',
  ogImage: '/og/default.png',
  github: 'https://github.com/cascon77',
  linkedin: 'https://www.linkedin.com/in/cascon77/',
} as const;

export const isPlaceholder = (v?: string): boolean => !v || v.includes('[[PENDIENTE');
