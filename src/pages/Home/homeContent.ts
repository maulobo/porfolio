export const homeHero = {
  eyebrow: "SC Studio / Creative Tech",
  headline: "Construimos presencia digital completa para negocios que quieren crecer online.",
  description:
    "Diseño, software, contenido y posicionamiento trabajando como una sola experiencia.",
  primaryCta: "Hablemos",
  secondaryCta: "Ver proyectos",
  location: "Desde Argentina",
};

export const homeNarrative =
  "Tu negocio no necesita piezas sueltas. Necesita una experiencia digital que se vea bien, funcione bien y sea fácil de encontrar.";

export const servicePillars = [
  {
    num: "01",
    key: "web",
    title: "Web",
    label: "Websites / Landing pages / Ecommerce",
    desc: "Experiencias rápidas, visuales y pensadas para convertir.",
    prompt: "Necesito una web o landing",
  },
  {
    num: "02",
    key: "software",
    title: "Software",
    label: "Backoffices / Automatizaciones / Plataformas",
    desc: "Herramientas digitales para operar, vender y escalar mejor.",
    prompt: "Necesito software o automatización",
  },
  {
    num: "03",
    key: "content",
    title: "Contenido",
    label: "Video / Motion / Animaciones",
    desc: "Contenido que explica, muestra y hace que la marca se mueva.",
    prompt: "Busco video, motion o contenido",
  },
  {
    num: "04",
    key: "growth",
    title: "Growth",
    label: "SEO / GEO / Descubrimiento por IA",
    desc: "Estructura y contenido para que te encuentren donde importa.",
    prompt: "Quiero mejorar mi posicionamiento",
  },
] as const;

export const revealWords = [
  { text: "WEB", sub: "Landing pages, ecommerce y sitios que convierten" },
  { text: "SOFTWARE", sub: "Herramientas para operar y escalar" },
  { text: "CONTENIDO", sub: "Video, motion y piezas para vender mejor" },
  { text: "GROWTH", sub: "SEO, GEO y estructura para ser encontrado" },
] as const;

export const proofIntro = {
  eyebrow: "Prueba real",
  title: "Proyectos que conectan diseño, tecnología y negocio.",
  description:
    "Cada caso muestra una parte del sistema: ecommerce, visualización 3D, backoffice, websites y experiencias digitales.",
};

export const projectCapabilityById: Record<string, string> = {
  "01": "Ecommerce + plataforma web",
  "02": "Web institucional + branding",
  "03": "Real estate + visualización 3D",
  "04": "Website premium",
  "05": "UX/UI + producto digital",
  "06": "Web + backoffice",
  "07": "UX/UI + diseño web",
  "08": "Backoffice + gestión interna",
};

export const processSteps = [
  {
    title: "Diagnóstico",
    desc: "Entendemos el negocio, el usuario y qué tiene que mejorar primero.",
  },
  {
    title: "Estrategia",
    desc: "Ordenamos prioridades, mensaje, estructura y canales digitales.",
  },
  {
    title: "Producción",
    desc: "Diseñamos, desarrollamos y producimos las piezas necesarias.",
  },
  {
    title: "Lanzamiento",
    desc: "Publicamos, medimos y dejamos la experiencia lista para operar.",
  },
  {
    title: "Optimización",
    desc: "Iteramos contenido, performance y posicionamiento para crecer.",
  },
] as const;

export const finalCta = {
  eyebrow: "Contacto",
  headline: "Hablemos de tu presencia digital.",
  description:
    "Contanos qué querés mejorar y te ayudamos a ordenar el próximo paso.",
  email: "contacto@smartcloudstudio.com",
};

export const clients = [
  { name: "SSI", logo: "/assets/clients/ssi.png" },
  { name: "Telefé", logo: "/assets/clients/telefe.png" },
  { name: "YPF", logo: "/assets/clients/ypf.png" },
  { name: "GSG Design", logo: "/assets/clients/gsg.png" },
  { name: "Aflora", logo: "/assets/clients/afflora.png" },
  { name: "Petroplastic", logo: "/assets/clients/pet.png" },
  { name: "Portal Patagonia", logo: "/assets/clients/pp.png" },
  { name: "Ultra Tech", logo: "/assets/clients/ultratech.png" },
  { name: "Vitatech", logo: "/assets/clients/vitatech.png" },
  { name: "HelpWin", logo: "/assets/clients/helpwin.png" },
  { name: "Minimal", logo: "/assets/clients/minimal.png" },
  { name: "PubliMark", logo: "/assets/clients/publimark.png" },
  { name: "Vivra Güemes", logo: "/assets/clients/vivra.png" },
];

export const testimonials = [
  {
    quote: "Entregaron en tiempo, el resultado superó lo que esperábamos.",
    name: "Ana Gómez",
    company: "SSI",
    role: "Directora",
  },
  {
    quote: "Por fin alguien que entiende el negocio antes de ponerse a diseñar.",
    name: "Martín Torres",
    company: "Aflora",
    role: "Fundador",
  },
  {
    quote: "La web nueva duplicó las consultas en el primer mes.",
    name: "Lucía Fernández",
    company: "Helpwin",
    role: "Marketing",
  },
  {
    quote: "Trabajar con SmartCloud fue directo, sin burocracia y con resultados.",
    name: "Carlos Ruiz",
    company: "TGB",
    role: "CEO",
  },
] as const;

export const techStackRow1 = [
  { name: "Blender", slug: "blender" },
  { name: "React", slug: "react" },
  { name: "Supabase", slug: "supabase" },
  { name: "n8n", slug: "n8n" },
  { name: "DaVinci Resolve", slug: "davinciresolve" },
  { name: "Figma", slug: "figma" },
] as const;

export const techStackRow2 = [
  { name: "Vercel", slug: "vercel" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Trello", slug: "trello" },
  { name: "Asana", slug: "asana" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "JavaScript", slug: "javascript" },
] as const;
