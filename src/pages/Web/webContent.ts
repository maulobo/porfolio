const WHATSAPP_URL = "https://wa.me/5492995831639";
const EMAIL = "contacto@smartcloudstudio.com";

/** Copy final de docs/smartcloud-servicios-web-copy-implementacion.md. */
export const webPageCopy = {
  metadata: {
    title: "Sitios web a medida | SmartCloud Studio",
    description:
      "Nos involucramos en tu negocio para entender qué hacés, a quién querés llegar y qué necesitás resolver. Con esa información creamos un sitio que comunica tu identidad y facilita lo que tus clientes vienen a hacer.",
  },

  hero: {
    eyebrow: "Desarrollo web a medida",
    title: "Tu web empieza mucho antes del diseño.",
    body: "Nos involucramos en tu negocio para entender qué hacés, a quién querés llegar y qué necesitás resolver. Con esa información creamos un sitio que comunica tu identidad y facilita lo que tus clientes vienen a hacer.",
    primary: { label: "Hablemos de tu proyecto", href: WHATSAPP_URL },
    secondary: { label: "Ver nuestro trabajo", to: "/work" },
  },

  approach: {
    title: "Para comunicar bien tu negocio, primero tenemos que entenderlo.",
    body: "Escuchamos tus ideas, conocemos tus desafíos e investigamos tu sector y a tus usuarios. Así podemos decidir qué contenido es importante, cómo organizarlo y qué necesita realmente tu sitio.",
  },

  offer: {
    title: "Cada negocio necesita una web diferente.",
    body: "No partimos de una fórmula única. Creamos desde sitios institucionales y landing pages hasta catálogos, tiendas online y experiencias interactivas. La estructura y las funcionalidades dependen de los objetivos de cada proyecto.",
    items: [
      {
        title: "Sitios institucionales",
        body: "Presentamos tu empresa de forma clara, con una identidad que te represente.",
      },
      {
        title: "Landing pages",
        body: "Diseñamos recorridos enfocados en una campaña, lanzamiento u objetivo concreto.",
      },
      {
        title: "Catálogos y tiendas online",
        body: "Organizamos productos y compras para que encontrar y elegir sea sencillo.",
      },
      {
        title: "Experiencias interactivas",
        body: "Usamos el diseño y el movimiento para contar historias sin dificultar la navegación.",
      },
    ],
  },

  process: {
    title: "De una idea a una web que funciona.",
    body: "Investigamos, definimos prioridades, organizamos contenidos, diseñamos y desarrollamos. Durante el proceso revisamos cada decisión con vos, probamos cómo funciona el sitio y preparamos su publicación.",
    steps: [
      {
        title: "Conocemos tu proyecto.",
        body: "Escuchamos tus objetivos y entendemos qué necesitás resolver.",
      },
      {
        title: "Definimos el camino.",
        body: "Organizamos contenidos y recorridos en función de tus usuarios.",
      },
      {
        title: "Diseñamos y desarrollamos.",
        body: "Convertimos la idea en una experiencia clara, visual y funcional.",
      },
      {
        title: "Revisamos y publicamos.",
        body: "Probamos el sitio y ajustamos los detalles antes de lanzarlo.",
      },
    ],
  },

  experience: {
    title: "Una buena web se entiende en segundos.",
    body: "Hoy muchas personas no leen todo: recorren la pantalla, buscan respuestas rápidas y se van si algo resulta confuso. Por eso diseñamos sitios fáciles de entender y recorrer, donde encontrar información o completar una acción no requiera esfuerzo. La estética importa, pero la experiencia de quien está del otro lado, todavía más.",
  },

  contact: {
    title: "Construyamos una web que tenga sentido para tu negocio.",
    body: "No necesitás tener todo resuelto para empezar. Contanos qué hacés, qué te preocupa o qué querés mejorar. Te ayudamos a encontrar el punto de partida.",
    cta: { label: "Contanos tu proyecto", href: WHATSAPP_URL },
    channels: [
      { label: "WhatsApp", value: "+54 9 2995 83-1639", href: WHATSAPP_URL },
      { label: "Correo electrónico", value: EMAIL, href: `mailto:${EMAIL}` },
    ],
  },
} as const;
