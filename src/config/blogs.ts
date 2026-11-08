// REGISTRO DE BLOGS. Añadir Homelab = cambiar status a 'active' + crear colección
// (ver docs/FUTURE-HOMELAB.md). Mientras sea 'locked', no genera ninguna ruta.
export type BlogId = 'hack' | 'homelab';
export type BlogStatus = 'active' | 'locked';

export interface BlogDef {
  id: BlogId;
  status: BlogStatus;
  base: string; // segmento de URL
  collection: 'hacking' | 'homelab';
  label: string; // texto del menú
  title: string;
  description: string;
  prompt: string; // prompt de terminal decorativo
}

export const blogs: Record<BlogId, BlogDef> = {
  hack: {
    id: 'hack',
    status: 'active',
    base: 'hack',
    collection: 'hacking',
    label: 'HACK BLOG',
    title: 'Hack Blog',
    description: 'Ciberseguridad y hacking ético: writeups de HTB, TryHackMe, TheHackerLABS, DockerLabs, ThepwnLab, CTF, pentesting y herramientas.',
    prompt: 'user@hack:~$',
  },
  homelab: {
    id: 'homelab',
    status: 'locked',
    base: 'homelab',
    collection: 'homelab',
    label: 'HOMELAB',
    title: 'Homelab Blog',
    description: 'Infraestructura y administración de sistemas.',
    prompt: 'user@lab:~$',
  },
};

export const activeBlogs = Object.values(blogs).filter((b) => b.status === 'active');
