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
import TrustBar from "./components/TrustBar";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";

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
    copy: "Sitios rapidos, memorables y pensados para explicar tu negocio sin vueltas.",
    items: ["Institucionales", "Landing pages", "Ecommerce", "UX/UI"],
  },
  {
    icon: Blocks,
    title: "Software a medida",
    copy: "Backoffices, plataformas y automatizaciones para que el negocio funcione mejor.",
    items: ["Dashboards", "Paneles internos", "Integraciones", "MVPs"],
  },
  {
    icon: Search,
    title: "SEO, GEO y contenido",
    copy: "Estructura, performance y contenido para ser encontrado en Google y en respuestas de IA.",
    items: ["SEO tecnico", "GEO/AEO", "Contenido", "Analitica"],
  },
  {
    icon: Clapperboard,
    title: "Video, motion y piezas",
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

const entryCards = [
  {
    icon: Code2,
    title: "Quiero una web seria",
    copy: "Landing, sitio institucional o ecommerce con mensaje claro y buena ejecucion visual.",
    color: "bg-[#d7ff4f]",
    action: "Entrar por web",
  },
  {
    icon: Blocks,
    title: "Necesito ordenar mi negocio",
    copy: "Software, backoffice, automatizaciones o herramientas internas para trabajar mejor.",
    color: "bg-white",
    action: "Entrar por software",
  },
  {
    icon: Search,
    title: "Quiero que me encuentren",
    copy: "SEO, GEO, contenido y estructura para aparecer en Google, IA y busquedas reales.",
    color: "bg-[#ff2bf9]",
    action: "Entrar por growth",
  },
  {
    icon: Clapperboard,
    title: "Necesito contenido que venda",
    copy: "Video, motion, animaciones y piezas para explicar mejor lo que haces.",
    color: "bg-[#f3f0e8]",
    action: "Entrar por contenido",
  },
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
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-normal md:text-7xl lg:text-[6.4rem]">
                Hacemos crecer tu negocio online.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/74 md:text-2xl">
                Webs, software, SEO/GEO, video y motion en una presencia digital clara, linda y facil de vender.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:contacto@smartcloudstudio.com"
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

            <div className="flex flex-wrap gap-2 pt-16">
              {["Web", "Software", "SEO/GEO", "Video", "Motion", "Landing pages"].map(
                (item) => (
                  <span
                    key={item}
                    className="border border-white/24 bg-black/25 px-4 py-2 text-sm text-white/78 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <TrustBar />

        <section className="bg-[#f3f0e8] px-5 py-24 md:px-12 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="max-w-xl">
              <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
                Cuatro formas de resolver lo digital.
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
                    className="group border-2 border-black bg-white p-5 shadow-[8px_8px_0_#111111] transition hover:-translate-y-1 hover:shadow-[12px_12px_0_#111111]"
                  >
                    <div className="mb-10 flex items-center justify-end">
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

        <TechStack />

        <section className="bg-[#111111] px-5 py-24 text-white md:px-12 md:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b-4 border-white pb-10 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Del quilombo al sistema.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-white/58">
              Del diagnostico al lanzamiento: estrategia, produccion y medicion en el mismo flujo.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              const cardColors = [
                "bg-[#d7ff4f] text-black",
                "bg-white text-black",
                "bg-[#ff2bf9] text-black",
                "bg-[#f3f0e8] text-black",
              ];

              return (
                <article
                  key={step.title}
                  className={`relative min-h-72 overflow-hidden border-2 border-black p-6 shadow-[10px_10px_0_#ffffff] ${cardColors[index]}`}
                >
                  <Icon className="mt-8 h-8 w-8" />
                  <h3 className="mt-8 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 leading-relaxed text-black/68">{step.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <Testimonials />

        <section className="bg-white px-5 py-24 md:px-12 md:py-32">
          <div className="mb-12 max-w-5xl">
            <h2 className="text-5xl font-black leading-[0.9] tracking-normal md:text-7xl">
              Elegi por donde queres entrar.
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-black/62">
              No hace falta llegar con el brief perfecto. Entra por el problema que tenes hoy y lo convertimos en plan.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {entryCards.map((card) => {
              const Icon = card.icon;

              return (
                <a
                  key={card.title}
                  href="mailto:contacto@smartcloudstudio.com"
                  className={`clickable group min-h-80 border-2 border-black p-6 text-black shadow-[10px_10px_0_#111111] transition hover:-translate-y-1 hover:shadow-[14px_14px_0_#111111] ${card.color}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <Icon className="h-9 w-9" />
                    <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-16 max-w-xl text-3xl font-black leading-none md:text-5xl">
                    {card.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-black/68">
                    {card.copy}
                  </p>
                  <span className="mt-8 inline-block border-2 border-black bg-white px-4 py-2 text-sm font-semibold">
                    {card.action}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="bg-[#f3f0e8] px-5 py-20 text-black md:px-12 md:py-28">
          <div className="border-2 border-black bg-white p-6 shadow-[12px_12px_0_#111111] md:p-10">
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <h2 className="max-w-5xl text-5xl font-black leading-[0.92] md:text-7xl">
                  Contanos que queres mejorar y armamos el mapa.
                </h2>
              </div>
              <div>
                <p className="text-xl leading-relaxed text-black/66">
                  Web nueva, software interno, SEO/GEO, contenido, video o una mezcla. Lo primero es ordenar prioridades.
                </p>
                <a
                  href="mailto:contacto@smartcloudstudio.com"
                  className="clickable mt-8 inline-flex items-center gap-3 border-2 border-black bg-[#d7ff4f] px-6 py-4 font-semibold text-black shadow-[6px_6px_0_#111111] transition hover:-translate-y-1"
                >
                  Hablemos
                  <Megaphone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </TransitionAnimate>
  );
};

export default Home;
