import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Clapperboard,
  Code2,
  Layers3,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import Scene from "../Home/components/Scene";

const studioCards = [
  {
    icon: Sparkles,
    title: "Ideas que abren camino",
    copy: "Pensamos conceptos, mensajes y experiencias antes de empujar pixeles.",
    color: "bg-[#d7ff4f]",
  },
  {
    icon: Layers3,
    title: "Imagen con sistema",
    copy: "Una marca no vive solo en un logo: vive en pantallas, piezas y decisiones.",
    color: "bg-white",
  },
  {
    icon: MousePointer2,
    title: "Interaccion con pulso",
    copy: "Movimiento, microinteracciones y detalles para que la web no se sienta quieta.",
    color: "bg-[#ff2bf9]",
  },
  {
    icon: Code2,
    title: "Codigo que sostiene",
    copy: "La experiencia se tiene que ver bien, cargar bien y aguantar el uso real.",
    color: "bg-[#f3f0e8]",
  },
];

const comicStrips = [
  "lo que se ve",
  "lo que se siente",
  "lo que funciona",
  "lo que queda",
];

const scrollPanels = [
  {
    title: "Ideas",
    copy: "El primer golpe tiene que ordenar: que decir, como entrar y por que importa.",
    color: "bg-[#d7ff4f]",
  },
  {
    title: "Imagen",
    copy: "Despues aparece el lenguaje visual: tipografia, ritmo, color, textura y tension.",
    color: "bg-white",
  },
  {
    title: "Movimiento",
    copy: "La web empieza a respirar con scroll, transiciones, video, motion y microdetalles.",
    color: "bg-[#ff2bf9]",
  },
  {
    title: "Proyecto",
    copy: "Todo termina en algo publicable: una experiencia que se entiende y queda.",
    color: "bg-[#f3f0e8]",
  },
] as const;

const StudioHero = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white text-brand-dark">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/5 via-white/20 to-white/55" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        className="absolute bottom-8 left-0 z-10 flex w-full items-end justify-between px-5 font-mono text-xs uppercase tracking-[0.24rem] text-brand-dark/55 md:px-12"
      >
        <span>Desliza para Explorar</span>
        <span>Desde Argentina</span>
      </motion.div>
    </section>
  );
};

const StudioManifesto = () => {
  return (
    <section className="bg-[#f3f0e8] px-5 py-20 text-black md:px-12 md:py-28">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="border-2 border-black bg-white p-6 shadow-[12px_12px_0_#111111] md:p-10">
          <p className="inline-block border-2 border-black bg-[#d7ff4f] px-3 py-1 text-sm font-black uppercase">
            Studio Files
          </p>
          <h1 className="mt-8 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl">
            Cada detalle cuenta.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-black/68">
            Lo visual, lo tecnico y lo que se siente cuando alguien toca la web tienen que hablar el mismo idioma.
          </p>
        </div>

        <div className="grid gap-4">
          {comicStrips.map((strip, index) => (
            <motion.div
              key={strip}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="border-2 border-black bg-[#111111] px-5 py-5 text-white shadow-[8px_8px_0_#ff2bf9]"
            >
              <span className="mr-4 inline-block text-[#d7ff4f]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-3xl font-black uppercase md:text-5xl">
                {strip}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StudioCards = () => {
  return (
    <section className="bg-[#111111] px-5 py-20 text-white md:px-12 md:py-28">
      <div className="mb-12 flex flex-col justify-between gap-5 border-b-4 border-white pb-8 md:flex-row md:items-end">
        <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] md:text-7xl">
          La cocina visual.
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-white/62">
          Aca vive lo mas experimental: identidad, motion, interaccion y ese golpe visual que hace que una web no parezca plantilla.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {studioCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className={`${card.color} min-h-80 border-2 border-black p-6 text-black shadow-[10px_10px_0_#ffffff]`}
            >
              <Icon className="h-9 w-9" />
              <h3 className="mt-16 text-3xl font-black leading-none">
                {card.title}
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-black/68">
                {card.copy}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

// Final resting offsets — lower cards peek from behind upper ones
const cardRest = [
  { x: -20, y: 14, r: -3 },
  { x: 16, y: -10, r: 2 },
  { x: -10, y: 7, r: -1.5 },
  { x: 0, y: 0, r: 0 },
] as const;

const ScrollPanel = ({
  panel,
  index,
  progress,
}: {
  panel: (typeof scrollPanels)[number];
  index: number;
  progress: MotionValue<number>;
}) => {
  const n = scrollPanels.length;
  const isFirst = index === 0;
  const off = cardRest[index];

  const rangeStart = isFirst ? 0 : (index - 1) / (n - 1);
  const rangeEnd = isFirst ? 0.5 : index / (n - 1);

  const y = useTransform(
    progress,
    [rangeStart, rangeEnd],
    isFirst ? [off.y, off.y] : [920, off.y]
  );
  const x = useTransform(
    progress,
    [rangeStart, rangeEnd],
    isFirst ? [off.x, off.x] : [0, off.x]
  );
  const rotate = useTransform(
    progress,
    [rangeStart, rangeEnd],
    isFirst ? [off.r, off.r] : [index % 2 === 0 ? 6 : -6, off.r]
  );
  const scale = useTransform(
    progress,
    [rangeStart, rangeEnd],
    isFirst ? [1, 1] : [0.88, 1]
  );

  return (
    <motion.article
      style={{ x, y, scale, rotate, zIndex: index }}
      className={`absolute left-1/2 top-1/2 w-[88vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 border-2 border-black p-6 text-black md:p-10 ${panel.color}`}
    >
      <h2 className="text-4xl font-black uppercase leading-[0.82] md:text-7xl">
        {panel.title}
      </h2>
      <p className="mt-8 max-w-2xl text-xl leading-relaxed text-black/70">
        {panel.copy}
      </p>
    </motion.article>
  );
};

const StudioScrollComic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[460vh] bg-[#111111]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute left-5 top-24 border-2 border-white bg-black px-3 py-2 text-sm font-black uppercase text-white md:left-12">
          Scroll comic
        </div>
        {scrollPanels.map((panel, index) => (
          <ScrollPanel
            key={panel.title}
            panel={panel}
            index={index}
            progress={scrollYProgress}
          />
        ))}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 border-2 border-white px-4 py-2 text-xs font-black uppercase tracking-[0.18rem] text-white">
          Segui scrolleando
        </div>
      </div>
    </section>
  );
};

const StudioPoster = () => {
  return (
    <section className="bg-white px-5 py-20 text-black md:px-12 md:py-28">
      <div className="relative overflow-hidden border-2 border-black bg-[#d7ff4f] p-6 shadow-[14px_14px_0_#111111] md:p-10">
        <div className="absolute right-4 top-2 hidden text-[12rem] font-black leading-none opacity-10 md:block">
          SC
        </div>
        <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_0.85fr] md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-sm font-black uppercase">
              <Clapperboard className="h-4 w-4" />
              visual issue
            </p>
            <h2 className="mt-7 max-w-4xl text-5xl font-black uppercase leading-[0.88] md:text-7xl">
              Diseñamos para que se note.
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-black/68">
              Si la home nueva es la puerta clara de la empresa, Studio es el cuarto donde probamos forma, ritmo y presencia.
            </p>
            <Link
              to="/work"
              className="clickable mt-8 inline-flex items-center gap-3 border-2 border-black bg-black px-6 py-4 font-semibold text-white shadow-[6px_6px_0_#ff2bf9] transition hover:-translate-y-1"
            >
              Explorar portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Studio = () => {
  return (
    <TransitionAnimate>
      <main className="min-h-screen bg-brand-dark">
        <StudioHero />
        <StudioManifesto />
        <StudioScrollComic />
        <StudioCards />
        <StudioPoster />
      </main>
    </TransitionAnimate>
  );
};

export default Studio;
