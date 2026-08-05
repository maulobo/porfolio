export type ServiceLink = {
  name: string;
  path: string;
  
  /** `live` = la sección ya existe. `soon` = pantalla "en construcción". */
  status: "live" | "soon";
};

export const serviceLinks: readonly ServiceLink[] = [
  {
    name: "Software a medida",
    path: "/servicios/software",
    status: "live",
  },
  {
    name: "Sitios web y landings",
    path: "/servicios/web",
    status: "soon",
  },
  {
    name: "Visibilidad en buscadores e IA",
    path: "/servicios/visibilidad",
    status: "soon",
  },
  {
    name: "Contenido audiovisual",
    path: "/servicios/audiovisual",
    status: "soon",
  },
] as const;

export const primaryLinks = [
  { name: "Inicio", path: "/" },
  { name: "Proyectos", path: "/work" },
  { name: "Studio", path: "/studio" },
] as const;
