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
  email: "hola@scland.com",
};
