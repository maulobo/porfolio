export type ServiceLink = {
  name: string;
  path: string;
  description: string;
};

export const serviceLinks: readonly ServiceLink[] = [
  {
    name: "Sitios web y landings",
    path: "/#servicios-web",
    description: "Sitios con identidad, estructura y ejecución cuidada.",
  },
  {
    name: "Software a medida",
    path: "/servicios/software",
    description: "Plataformas, paneles, integraciones y automatizaciones.",
  },
  {
    name: "Visibilidad en buscadores e IA",
    path: "/#servicios-visibilidad",
    description: "SEO técnico, contenidos y respuestas generativas.",
  },
  {
    name: "Video y motion",
    path: "/#servicios-audiovisual",
    description: "Piezas para explicar productos, servicios e ideas.",
  },
] as const;

export const primaryLinks = [
  { name: "Inicio", path: "/" },
  { name: "Proyectos", path: "/work" },
  { name: "Studio", path: "/studio" },
] as const;
