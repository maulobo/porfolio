import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  Clapperboard,
  Code2,
  Gauge,
  Megaphone,
  Search,
  Sparkles,
} from "lucide-react";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import { projects } from "../../utils/projects";

const heroImages = [
  "/images/projects/banner-case.jpg",
  "/images/projects/banner-vivra.jpg",
  "/images/projects/banner-ssi.jpg",
  "/images/projects/minimal-banner.webp",
  "/images/projects/bo-banner.jpeg",
  "/images/projects/banner-help.jpg",
];

const capabilities = [
  {
    icon: Code2,
    title: "Webs y landing pages",
    eyebrow: "Convertir",
    copy: "Sitios rapidos, memorables y pensados para explicar tu negocio sin vueltas.",
    items: ["Institucionales", "Landing pages", "Ecommerce", "UX/UI"],
  },
  {
    icon: Blocks,
    title: "Software a medida",
    eyebrow: "Operar",
    copy: "Backoffices, plataformas y automatizaciones para que el negocio funcione mejor.",
    items: ["Dashboards", "Paneles internos", "Integraciones", "MVPs"],
  },
  {
    icon: Search,
    title: "SEO, GEO y contenido",
    eyebrow: "Aparecer",
    copy: "Estructura, performance y contenido para ser encontrado en Google y en respuestas de IA.",
    items: ["SEO tecnico", "GEO/AEO", "Contenido", "Analitica"],
  },
  {
    icon: Clapperboard,
    title: "Video, motion y piezas",
    eyebrow: "Mover",
    copy: "Edicion, animacion y assets para lanzamientos, redes, ads y presentaciones.",
    items: ["Video", "Motion", "Animacion", "Social assets"],
  },
];

const workflow = [
  {
    icon: Bot,
    title: "Diagnostico",
    copy: "Vemos que tenes, que falta y que puede mover la aguja primero.",
  },
  {
    icon: Sparkles,
    title: "Sistema",
    copy: "Ordenamos mensaje, web, contenido, tecnologia y canales en una misma hoja de ruta.",
  },
  {
    icon: Gauge,
    title: "Produccion",
    copy: "Disenamos, desarrollamos, editamos y publicamos con entregables concretos.",
  },
  {
    icon: BarChart3,
    title: "Crecimiento",
    copy: "Medimos, mejoramos y dejamos una base lista para escalar o sumar chatbot.",
  },
];

const proofProjects = projects.slice(0, 4).map((project, index) => {
  const outcomes = [
    "Ecommerce mayorista con experiencia de compra clara.",
    "Real estate con visualizacion 3D y recorrido digital.",
    "Marca industrial con web institucional y presencia solida.",
    "Website premium para estudio creativo.",
  ];

  return {
    ...project,
    outcome: outcomes[index],
  };
});

const stats = [
  ["8+", "proyectos visibles"],
  ["4", "frentes integrados"],
  ["1", "equipo para todo"],
];

const Home = () => {
  return (
    <TransitionAnimate>
      <main className="min-h-screen overflow-hidden bg-[#f3f0e8] text-[#111111]">
        <section className="relative min-h-screen overflow-hidden bg-[#111111] text-white">
          <div className="absolute inset-0 grid grid-cols-2 opacity-55 md:grid-cols-3">
            {heroImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15 + index * 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative min-h-[34vh] overflow-hidden border border-white/5"
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>

          <div className="absolute inset-0 bg-[#111111]/72" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#111111] to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 pb-8 pt-28 md:px-12 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl"
            >
              <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28rem] text-[#ff2bf9]">
                <span className="h-2 w-2 bg-[#d7ff4f]" />
                SC Studio para empresas
              </p>
              <h1 className="max-w-6xl text-5xl font-semibold leading-[0.94] tracking-normal md:text-7xl lg:text-[6.8rem]">
                Web, software y contenido para negocios que necesitan crecer online.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/72 md:text-2xl">
                Construimos presencia digital completa: sitios que convierten, sistemas que ordenan, contenido que explica y SEO/GEO para aparecer donde tus clientes buscan.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:hola@scland.com"
                  className="clickable group inline-flex w-fit items-center gap-3 rounded-md bg-[#d7ff4f] px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-black transition hover:bg-white"
                >
                  Empezar proyecto
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  to="/work"
                  className="clickable inline-flex w-fit items-center gap-3 rounded-md border border-white/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-white transition hover:border-[#ff2bf9]"
                >
                  Ver trabajos
                </Link>
              </div>
            </motion.div>

            <div className="grid gap-3 pt-16 md:grid-cols-3">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="flex items-end justify-between border-t border-white/18 pt-4"
                >
                  <span className="text-4xl font-semibold text-white">{value}</span>
                  <span className="max-w-32 text-right font-mono text-xs uppercase tracking-[0.2rem] text-white/48">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e8] px-5 py-24 md:px-12 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.28rem] text-[#ff2bf9]">
                Que hacemos
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
                No vendemos piezas sueltas. Armamos el sistema digital que tu empresa necesita.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/62">
                Si hoy necesitas web, posicionamiento, video, software o todo junto, lo ordenamos en una experiencia coherente para vender mejor y operar con menos friccion.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {capabilities.map((capability) => {
                const Icon = capability.icon;

                return (
                  <article
                    key={capability.title}
                    className="group rounded-md border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:border-black hover:shadow-[12px_12px_0_#111111]"
                  >
                    <div className="mb-10 flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.22rem] text-black/45">
                        {capability.eyebrow}
                      </span>
                      <Icon className="h-6 w-6 text-[#ff2bf9]" />
                    </div>
                    <h3 className="text-2xl font-semibold">{capability.title}</h3>
                    <p className="mt-4 leading-relaxed text-black/62">{capability.copy}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
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
          </div>
        </section>

        <section className="bg-[#111111] px-5 py-24 text-white md:px-12 md:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/12 pb-10 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28rem] text-[#d7ff4f]">
                Metodo
              </p>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Una empresa no necesita mas ruido. Necesita una ruta.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-white/58">
              Del diagnostico al lanzamiento: estrategia, produccion y medicion en el mismo flujo.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="relative min-h-72 overflow-hidden rounded-md border border-white/12 bg-white/[0.04] p-6"
                >
                  <span className="font-mono text-xs text-[#ff2bf9]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="mt-12 h-8 w-8 text-[#d7ff4f]" />
                  <h3 className="mt-8 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/58">{step.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:px-12 md:py-32">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28rem] text-[#ff2bf9]">
                Prueba
              </p>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Proyectos que muestran tecnologia, criterio visual y negocio.
              </h2>
            </div>
            <Link
              to="/work"
              className="clickable group inline-flex w-fit items-center gap-3 rounded-md bg-black px-5 py-4 font-mono text-xs uppercase tracking-[0.2rem] text-white transition hover:bg-[#ff2bf9]"
            >
              Ver portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {proofProjects.map((project) => (
              <Link
                key={project.id}
                to="/work"
                className="clickable group overflow-hidden rounded-md border border-black/10 bg-[#f3f0e8]"
                aria-label={`Ver proyectos relacionados con ${project.title}`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="grid gap-5 p-5 md:grid-cols-[0.65fr_1fr]">
                  <div>
                    <p className="font-mono text-xs text-[#ff2bf9]">{project.id}</p>
                    <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                  </div>
                  <div>
                    <p className="leading-relaxed text-black/62">{project.outcome}</p>
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.18rem] text-black/45">
                      {project.category.join(" / ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#d7ff4f] px-5 py-20 text-black md:px-12 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28rem]">
                Siguiente paso
              </p>
              <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.95] md:text-7xl">
                Contanos que queres mejorar y armamos el mapa.
              </h2>
            </div>
            <div>
              <p className="text-xl leading-relaxed text-black/66">
                Web nueva, software interno, SEO/GEO, contenido, video o una mezcla. Lo primero es ordenar prioridades.
              </p>
              <a
                href="mailto:hola@scland.com"
                className="clickable mt-8 inline-flex items-center gap-3 rounded-md bg-black px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-white transition hover:bg-[#ff2bf9]"
              >
                Hablemos
                <Megaphone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </TransitionAnimate>
  );
};

export default Home;
