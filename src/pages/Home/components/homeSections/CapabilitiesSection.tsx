import { Blocks, Clapperboard, Code2, Search } from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    id: "servicios-web",
    title: "Sitios web y landings",
    copy: "Diseñamos y desarrollamos sitios a medida, con una identidad propia, una estructura clara y el nivel técnico que cada proyecto requiere.",
    items: ["Institucionales", "Landing pages", "E-commerce", "UX/UI", "Desarrollo interactivo"],
  },
  {
    icon: Blocks,
    id: "servicios-software",
    title: "Software a medida",
    copy: "Creamos plataformas, backoffices y automatizaciones que ordenan procesos, conectan información y facilitan el trabajo cotidiano.",
    items: ["Dashboards", "Paneles internos", "Integraciones", "MVP y productos digitales", "Automatizaciones"],
  },
  {
    icon: Search,
    id: "servicios-visibilidad",
    title: "Visibilidad en buscadores e IA",
    copy: "Trabajamos la estructura, el rendimiento y los contenidos para mejorar la presencia de una marca en buscadores tradicionales y respuestas generadas por inteligencia artificial.",
    items: ["SEO tecnico", "GEO/AEO", "Contenido", "Analitica", "Arquitectura de contenidos","Visibilidad en respuestas de IA"],
  },
  {
    icon: Clapperboard,
    id: "servicios-audiovisual",
    title: "Video, motion y piezas digitales",
    copy: "Producimos contenido audiovisual para presentar productos, explicar ideas y construir una comunicación visual coherente en distintos canales.",
    items: ["Video", "Motion graphics", "Animacion", "Social assets","Piezas para redes y campañas", "Contenido para lanzamientos y presentaciones"],
  },
];

const CapabilitiesSection = () => {
  return (
    <section className="bg-[#f3f0e8] px-5 py-24 md:px-12 md:py-32">
      <div className="mb-12 flex flex-col gap-6 border-b-4 border-black pb-10 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="flex max-w-2xl flex-col text-4xl font-semibold leading-tight md:text-6xl">
          <span>Cuatro áreas.</span>
          <span>Una dirección común.</span>
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-black/62">
          Podemos resolver una necesidad puntual o integrar varias disciplinas en un mismo proyecto. En ambos
          casos trabajamos con el mismo criterio: claridad, consistencia y buena ejecución.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {capabilities.map((capability) => {
          const Icon = capability.icon;

          return (
            <article
              key={capability.title}
              id={capability.id}
              className="group flex flex-col border-2 border-black bg-white p-6 shadow-[8px_8px_0_#111111] transition hover:-translate-y-1 hover:shadow-[12px_12px_0_#111111] md:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-black bg-[#f3f0e8]">
                  <Icon className="h-5 w-5 text-[#ff2bf9]" />
                </span>
                <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
                  {capability.title}
                </h3>
              </div>
              <p className="mt-5 max-w-xl leading-relaxed text-black/62 md:text-lg">
                {capability.copy}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                {capability.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16rem] text-black/55"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CapabilitiesSection;
