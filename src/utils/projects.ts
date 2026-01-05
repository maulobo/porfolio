export interface Project {
  id: string;
  title: string;
  category: string[];
  description: string;
  imageUrl: string;
  hoverImages?: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "CASE Company",
    category: ["E-commerce Mayorista", "Diseño de Interfaz", "Desarrollo"],
    description:
      "Plataforma de comercio electrónico mayorista con panel de administración personalizado y diseño de interfaz de usuario.",
    imageUrl: "/images/projects/case-banner.png",
    hoverImages: [
      "/images/projects/case/1.png",
      "/images/projects/case/2.png",
      "/images/projects/case/3.png",
      "/images/projects/case/4.png",
      "/images/projects/case/5.png",
      "/images/projects/case/6.png",
      "/images/projects/case/7.png",
    ],
    link: "/work/case-company",
  },
  {
    id: "03",
    title: "Vivra Guemes",
    category: ["Bienes Raíces", "Visualización 3D", "Desarrollo Web"],
    description:
      "Plataforma de exhibición inmobiliaria con recorridos inmersivos de apartamentos en 3D.",
    imageUrl: "/images/projects/vivra-banner.png",
    hoverImages: [
      "/images/projects/vivra/1.png",
      "/images/projects/vivra/2.png",
      "/images/projects/vivra/3.png",
      "/images/projects/vivra/4.png",
    ],
    link: "/work/vivra-guemes",
  },
  {
    id: "02",
    title: "SSI Servicios Industriales",
    category: ["Desarrollo Frontend", "Diseño de Interfaz", "Branding"],
    description:
      "Transformación digital completa incluyendo frontend, diseño de interfaz y marca.",
    imageUrl: "/images/projects/BannerSSI.jpg",
    hoverImages: [
      "/images/projects/ssi/1.png",
      "/images/projects/ssi/2.png",
      "/images/projects/ssi/3.png",
      "/images/projects/ssi/4.png",
      "/images/projects/ssi/5.png",
      "/images/projects/ssi/6.png",
    ],
    link: "/work/ssi",
  },
  {
    id: "04",
    title: "Helpwin",
    category: ["Diseño Web", "Interfaz Móvil", "Diseño de Apps"],
    description: "Diseño de interfaz integral para aplicaciones web y móviles.",
    imageUrl: "/images/projects/help-banner.png",
    hoverImages: [
      "/images/projects/help/1.png",
      "/images/projects/help/2.png",
      "/images/projects/help/3.png",
      "/images/projects/help/4.png",
      "/images/projects/help/5.png",
    ],
    link: "/work/helpwin",
  },
  {
    id: "05",
    title: "GSG",
    category: ["Desarrollo Web", "Diseño Web", "Backoffice"],
    description:
      "Desarrollo completo de sitio web, diseño y backoffice para gestión de productos.",
    imageUrl: "/images/projects/gsg/1.png",
    hoverImages: [
      "/images/projects/gsg/1.png",
      "/images/projects/gsg/2.png",
      "/images/projects/gsg/3.png",
      "/images/projects/gsg/4.png",
      "/images/projects/gsg/5.png",
    ],
    link: "/work/gsg",
  },
  {
    id: "06",
    title: "UX/UI",
    category: ["Desarrollo Web", "Diseño Web"],
    description:
      "Desarrollo completo de sitio web, diseño y backoffice para gestión de productos.",
    imageUrl: "/images/projects/ux-banner.jpeg",
    hoverImages: [
      "/images/projects/ux/1.jpeg",
      "/images/projects/ux/2.jpeg",
      "/images/projects/ux/3.jpeg",
    ],
    link: "/work/gsg",
  },
];

export const categories = [
  "Todos",
  "E-commerce Mayorista",
  "Diseño de Interfaz",
  "Desarrollo",
  "Desarrollo Frontend",
  "Branding",
  "Bienes Raíces",
  "Visualización 3D",
  "Desarrollo Web",
  "Diseño Web",
  "Interfaz Móvil",
  "Diseño de Apps",
  "Backoffice",
];
