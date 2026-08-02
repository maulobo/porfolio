import { ArrowRight, Blocks, Clapperboard, Code2, Search } from "lucide-react";

const entryCards = [
  {
    white: false,
    icon: Code2,
    title: "Un sitio a la altura del proyecto",
    copy: "Landing, sitio institucional o e-commerce con una identidad propia, una estructura clara y una ejecución visual cuidada.",
    color: "bg-[#d7ff4f]",
    action: "Explorar soluciones web",
  },
  {
     white: false,
    icon: Blocks,
    title: "Herramientas para trabajar mejor",
    copy: "Software, backoffices, automatizaciones e integraciones para ordenar procesos y conectar información.",
    color: "bg-white",
    action: "Explorar software a medida",
  },
  {
     white: false,
    icon: Search,
    title: "Una base sólida para ganar visibilidad",
    copy: "SEO técnico, arquitectura de contenidos y optimización para buscadores y respuestas generadas por IA.",
    color: "bg-[#f3f0e8]",
    action: "Explorar visibilidad",
  },
  {
     white: true,
    icon: Clapperboard,
    title: "Contenido para explicar mejor",
    copy: "Video, motion, animación y piezas digitales para presentar productos, servicios e ideas con claridad.",
    color: "bg-[#ff2bf9]",
    action: "Explorar contenido audiovisual",
  },
];

const EntryPointsSection = () => {
  return (
    <section className="bg-white px-5 py-24 md:px-12 md:py-32">
      <div className="mb-12 max-w-5xl">
       
        <h2 className="mt-4 text-5xl font-black leading-[0.9] tracking-normal md:text-7xl">
          Podemos iniciar por lo que hoy necesitás resolver
        </h2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-black/62">
          No necesitás llegar con todo definido. En la primera meet ordenamos el contexto, detectamos
          prioridades y proponemos un punto de partida.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {entryCards.map((card) => {
          const Icon = card.icon;

          return (
            <a
              key={card.title}
              href="mailto:contacto@smartcloudstudio.com"
              className={`clickable group min-h-80 border-2 border-black p-6 shadow-[10px_10px_0_#111111] transition hover:-translate-y-1 hover:shadow-[14px_14px_0_#111111] ${card.color} ${
                card.white ? "text-white" : "text-black"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <Icon className="h-9 w-9" />
                <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className={`mt-16 max-w-xl text-3xl font-black leading-none md:text-5xl ${card.white ? "text-white" : "text-black"}`}>
                {card.title}
              </h3>
              <p
                className={`mt-5 max-w-lg text-lg leading-relaxed ${
                  card.white ? "text-white/80" : "text-black/68"
                }`}
              >
                {card.copy}
              </p>
              <span
                className={`mt-8 inline-block border-2 px-4 py-2 text-sm font-semibold ${
                  card.white
                    ? "border-white bg-transparent text-white"
                    : "border-black bg-white text-black"
                }`}
              >
                {card.action}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default EntryPointsSection;
