export type ChatOption = {
  label: string;
  nextId: string;
};

export type ChatNode = {
  id: string;
  message: string;
  options: ChatOption[];
  cta?: { label: string; href: string };
};

export const chatbotFlow: Record<string, ChatNode> = {
  start: {
    id: "start",
    message: "¡Hola! Soy el bot de SmartCloud. ¿En qué te puedo ayudar?",
    options: [
      { label: "Quiero una web", nextId: "web" },
      { label: "Necesito software", nextId: "software" },
      { label: "Busco contenido o video", nextId: "contenido" },
      { label: "Solo estoy viendo", nextId: "casual" },
    ],
  },
  web: {
    id: "web",
    message: "¡Genial! ¿Tenés algo armado o arrancamos de cero?",
    options: [
      { label: "Tengo algo pero hay que mejorarlo", nextId: "cta" },
      { label: "Arrancamos de cero", nextId: "cta" },
    ],
  },
  software: {
    id: "software",
    message: "Perfecto. ¿Qué tipo de herramienta necesitás?",
    options: [
      { label: "Backoffice o panel interno", nextId: "cta" },
      { label: "Automatizaciones", nextId: "cta" },
      { label: "MVP o producto nuevo", nextId: "cta" },
    ],
  },
  contenido: {
    id: "contenido",
    message: "Buenísimo. ¿Para qué lo necesitás?",
    options: [
      { label: "Redes sociales", nextId: "cta" },
      { label: "Ads o campañas", nextId: "cta" },
      { label: "Presentaciones o lanzamientos", nextId: "cta" },
    ],
  },
  casual: {
    id: "casual",
    message: "Genial, tomá tu tiempo. Si necesitás algo, acá estamos.",
    options: [
      { label: "En realidad sí tengo algo", nextId: "start" },
      { label: "Gracias, nos vemos", nextId: "bye" },
    ],
  },
  bye: {
    id: "bye",
    message: "¡Hasta luego! Si en algún momento querés avanzar, escribinos.",
    options: [],
    cta: { label: "Escribinos igual", href: "mailto:hola@scland.com" },
  },
  cta: {
    id: "cta",
    message: "Contanos qué necesitás y te respondemos en menos de 24hs.",
    options: [],
    cta: { label: "Escribinos →", href: "mailto:hola@scland.com" },
  },
};
