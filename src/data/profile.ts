// TUS DATOS. Edita solo este fichero (y los de al lado). Nada de esto está inventado:
// todo lo que empieza por [[PENDIENTE: ...]] debe sustituirse antes de publicar.
export interface Skill { name: string; level: number | null } // level: 0-100, o null = "SIN VALORAR"
export interface Mission { company: string; role: string; start: string; end: string; description: string; responsibilities: string[]; tech: string[] }
export interface Achievement { name: string; type: string; issuer: string; date: string; description: string; url?: string }

export const profile = {
  headline: 'Desarrollador de Aplicaciones Multiplataforma y Especialista en Ciberseguridad',
  lvl: '01',
  intro: 'Especialista en Ciberseguridad en Entornos IT y desarrollador DAM. Utilizo mis primeros \
  pasos en consultoría (ISO 27001 y ENS) y mi background en programación como cimientos para enfocar \
  mi futuro profesional hacia auditorías de pentesting y Red Team.',
  about: [
    'Soy Técnico en Desarrollo de Aplicaciones Multiplataforma y Especialista en Ciberseguridad en Entornos IT, \
     con experiencia reciente en consultoría tecnológica enfocado en las normativas ISO 27001 y ENS. \
     Apasionado por la tecnología y la seguridad desde siempre, destaco por mi constante capacidad de aprendizaje, \
     rigurosidad y adaptación en entornos cambiantes. Mi orientación profesional está enfocada en el análisis de \
     vulnerabilidades, la seguridad ofensiva y el crecimiento hacia roles especializados de Pentesting y Red Team.',
  ],
  // Intereses indicados en el brief del proyecto.
  interests: ['Sistemas Linux', 'Administración de sistemas', 'Redes', 'Ciberseguridad',
     'Hacking ético', 'Infraestructura', 'Automatización', 'Virtualización', 'Desarrollo de software'],
  contactEmail: '[[PENDIENTE: email de contacto]]',
} as const;

// Pon level (0-100) cuando quieras mostrar un valor. Con null se muestra "SIN VALORAR".
export const skills: Skill[] = [
  { name: 'Linux', level: 90 },
  { name: 'Redes', level: 85 },
  { name: 'Python', level: 85 },
  { name: 'Java', level: 90 },
  { name: 'Flutter', level: 90 },
  { name: 'Bash', level: 80 },
  { name: 'Docker', level: 75 },
  { name: 'Ciberseguridad', level: 80 },
  { name: 'Pentesting', level: 75 },
  { name: 'Virtualización', level: 85 },
  { name: 'Administración de sistemas', level: 70 },
];

export const missions: Mission[] = [
  {
    company: 'Tempo Consultores',
    role: 'Consultor IT',
    start: 'ago. 2026',
    end: 'Actualidad',
    description: 'Consultoría especializada en ciberseguridad, gobierno y cumplimiento normativo, \
    enfocada en la implantación y el mantenimiento continuo de sistemas de gestión de seguridad de la información.',
    responsibilities: [
      'Implantación, auditoría interna y mantenimiento de sistemas de gestión de seguridad de la información bajo la norma ISO 27001.',
      'Adaptación, implantación y mantenimiento de medidas de seguridad conforme al Esquema Nacional de Seguridad (ENS).',
      'Análisis y gestión de riesgos tecnológicos y evaluación de la conformidad normativa.',
      'Elaboración de la documentación técnica y de políticas de seguridad requeridas por los marcos normativos.'
    ],
    tech: ['ISO 27001', 'Esquema Nacional de Seguridad (ENS)', 'Gestión de Riesgos', 'Auditoría de Seguridad', 'Seguridad de la Información'],
  },
  {
    company: 'Nunegal Consulting',
    role: 'Desarrollador en Prácticas (Software Factory)',
    start: 'mar. 2025',
    end: 'jun. 2025',
    description: 'Prácticas de formación en un entorno de software factory, \
    participando en el diseño, desarrollo y pruebas de aplicaciones web enfocadas en el ecosistema Java.',
    responsibilities: [
      'Desarrollo de componentes backend utilizando Java, Spring Framework y Spring Boot.',
      'Implementación de autenticación y control de accesos con Java Spring Security.',
      'Gestión de consultas y persistencia de datos mediante JDBC.',
      'Desarrollo de funcionalidades del lado del cliente utilizando JavaScript.',
      'Escritura de pruebas unitarias con JUnit para garantizar la calidad y robustez del código.'
    ],
    tech: ['Java', 'Spring Boot', 'Spring Framework', 'Spring Security', 'JUnit', 'JDBC', 'JavaScript'],
  },
];

export const achievements: Achievement[] = [
  { name: 'Protección de Datos: RGPD y Actualización LOPDGDD', 
    type: 'Curso', issuer: 'Bureau Veritas Business School', date: 'oct. 2026',
    description: 'Formación especializada de 40 horas sobre el marco legal de protección de datos (RGPD y LOPDGDD). \
    Abarca principios fundamentales, derechos de usuarios (ARCO, olvido, portabilidad), responsabilidad proactiva, \
    análisis de riesgos, registro de actividades de tratamiento (RAT), transferencias internacionales y la figura del DPO.' },

  { name: 'Curso de Especialización en Ciberseguridad en Entornos de las Tecnologías de la Información', 
    type: 'Título', issuer: 'CIFP Rodolfo Ucha Piñeiro', date: '2025-2026', 
    description: 'Curso de especialización de Grado Superior (720 horas) enfocado en la securización de redes y sistemas, \
    gestión de incidentes de ciberseguridad, puesta en producción segura, análisis forense informático, \
    hacking ético y normativas de seguridad.' },

  { name: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)', 
    type: 'Título', issuer: 'CIFP Rodolfo Ucha Piñeiro', date: '2023-2025',
     description: 'Ciclo Formativo de Grado Superior (2000 horas) enfocado en el diseño, desarrollo, \
     prueba y mantenimiento de aplicaciones informáticas para la gestión empresarial, \
     dispositivos móviles y sistemas de propósito general, incluyendo gestión de bases de datos y entornos de desarrollo.' },
// { name: '[[PENDIENTE: titulación o certificación]]', type: '[[PENDIENTE: tipo]]', issuer: '[[PENDIENTE: entidad]]', date: '[[PENDIENTE: fecha]]', description: '[[PENDIENTE: descripción]]' },
];
