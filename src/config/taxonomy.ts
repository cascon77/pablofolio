// Vocabularios controlados del Hack Blog. Añadir una categoría = añadir una línea aquí.
export const platforms = {
  htb: 'Hack The Box',
  tryhackme: 'TryHackMe',
  thehackerlabs: 'TheHackerLABS',
  dockerlabs: 'DockerLabs',
  thepwnlab: 'ThepwnLab',
  ctf: 'CTF',
  otros: 'Otros',
} as const;

export const difficulties = {
  'very-easy': 'Muy fácil',
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
  insane: 'Insane',
} as const;

export const systems = {
  linux: 'Linux',
  windows: 'Windows',
  other: 'Otro',
} as const;

export const topics = {
  web: 'Web',
  'active-directory': 'Active Directory',
  privesc: 'Privilege Escalation',
  enumeration: 'Enumeración',
  tools: 'Herramientas',
  network: 'Redes',
  exploitation: 'Explotación',
  auth: 'Autenticación',
  cloud: 'Cloud',
  forensics: 'Forense',
  crypto: 'Criptografía',
  osint: 'OSINT',
  steganography: 'Esteganografía',
  reversing: 'Reversing',
} as const;

export type Vocab = Record<string, string>;
export const keys = <T extends Vocab>(v: T) => Object.keys(v) as [keyof T & string, ...(keyof T & string)[]];

/** Taxonomías con página propia: /<blog>/<clave>/<término>/ */
export const taxonomies = {
  platform: { label: 'Plataforma', vocab: platforms },
  difficulty: { label: 'Dificultad', vocab: difficulties },
  os: { label: 'Sistema', vocab: systems },
  topic: { label: 'Temática', vocab: topics },
  tag: { label: 'Etiqueta', vocab: null },
} as const;
export type TaxKey = keyof typeof taxonomies;
