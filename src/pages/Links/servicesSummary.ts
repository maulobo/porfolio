export type ServiceSummary = {
  title: string;
  description: string;
  /** Versión celular: los cuatro servicios tienen que entrar en una pantalla. */
  shortTitle: string;
  shortDescription: string;
  tags: string[];
  path: string;
  /** Color de acento de la tarjeta (sombra). */
  accent: string;
};

export const servicesSummary: ServiceSummary[] = [
  {
    title: "Sitios web y landings",
    shortTitle: "Sitios web",
    shortDescription: "Sitios a medida, con identidad propia y estructura clara.",
    description:
      "Diseñamos y desarrollamos sitios a medida, con una identidad propia, una estructura clara y el nivel técnico que cada proyecto requiere.",
    tags: ["Institucionales", "Landing pages", "E-commerce", "UX/UI", "Desarrollo interactivo"],
    path: "/servicios/web",
    accent: "#d7ff4f",
  },
  {
    title: "Software a medida",
    shortTitle: "Software a medida",
    shortDescription: "Plataformas y automatizaciones que ordenan tus procesos.",
    description:
      "Creamos plataformas, backoffices y automatizaciones que ordenan procesos, conectan información y facilitan el trabajo cotidiano.",
    tags: ["Dashboards", "Paneles internos", "Integraciones", "MVP y productos digitales", "Automatizaciones"],
    path: "/servicios/software",
    accent: "#ff2bf9",
  },
  {
    title: "Visibilidad en buscadores e IA",
    shortTitle: "Buscadores e IA",
    shortDescription: "Que tu marca aparezca en Google y en respuestas de IA.",
    description:
      "Trabajamos la estructura, el rendimiento y los contenidos para mejorar la presencia de una marca en buscadores tradicionales y respuestas generadas por inteligencia artificial.",
    tags: [
      "SEO técnico",
      "GEO/AEO",
      "Contenido",
      "Analítica",
      "Arquitectura de contenidos",
      "Visibilidad en respuestas de IA",
    ],
    path: "/servicios/visibilidad",
    accent: "#ffe500",
  },
  {
    title: "Video, motion y piezas digitales",
    shortTitle: "Video y motion",
    shortDescription: "Piezas audiovisuales para productos, ideas y redes.",
    description:
      "Producimos contenido audiovisual para presentar productos, explicar ideas y construir una comunicación visual coherente en distintos canales.",
    tags: [
      "Video",
      "Motion graphics",
      "Animación",
      "Social assets",
      "Piezas para redes y campañas",
      "Contenido para lanzamientos y presentaciones",
    ],
    path: "/servicios/audiovisual",
    accent: "#f3f0e8",
  },
];
