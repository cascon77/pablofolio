export interface Project {
  slug: string; name: string; description: string; tech: string[];
  image?: { src: string; alt: string }; // ruta bajo /public (el base se añade solo), p. ej. /images/projects/mi-proyecto.png
  github?: string; demo?: string; featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'valorant-wiki',
    image: { src: '/images/projects/valorant-wiki.png', alt: 'Valorant Wiki & Web Scraper' },
    github: 'https://github.com/cascon77/Valorant-Wiki',
    name: 'Valorant Wiki & Web Scraper',
    description: 'Aplicación web y herramienta de extracción automatizada de datos diseñada para recopilar, estructurar y visualizar información en tiempo real sobre agentes, mapas y estadísticas del videojuego Valorant mediante técnicas de web scraping.',
    tech: ['Flutter', 'Dart', 'Web Scraping', 'REST API'],
    featured: true,
  },
  /*
  {
    slug: 'pendiente-1',
    name: '[[PENDIENTE: nombre del proyecto]]',
    description: '[[PENDIENTE: descripción]]',
    tech: ['[[PENDIENTE: tecnología]]'],
    featured: true,
  },
  */
];
