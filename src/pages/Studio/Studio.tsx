import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import Scene from "../Home/components/Scene";

const narrative =
  "Cada detalle importa: lo que se ve, lo que se siente y lo que funciona.";

const revealWords = [
  { text: "IDEAS", sub: "Que inician todo" },
  { text: "IMAGEN", sub: "Que construye identidad" },
  { text: "DISEÑO", sub: "Que define el estilo" },
  { text: "PROYECTOS", sub: "Que quedan" },
] as const;

const NarrativeWord = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <span className="relative mr-3 mt-3 inline-block">
      <span className="absolute text-brand-light opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const ScrollWord = ({
  word,
  index,
  progress,
  total,
}: {
  word: (typeof revealWords)[number];
  index: number;
  progress: MotionValue<number>;
  total: number;
}) => {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + 0.1, end],
    ["100%", "0%", "-100%"]
  );
  const blur = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [10, 0, 0, 10]
  );
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <motion.div
        style={{ opacity, y, filter }}
        className="flex flex-col items-center px-5 text-center"
      >
        <h2 className="text-stroke-white text-5xl font-bold uppercase leading-none tracking-normal text-white md:text-[12vw]">
          {word.text}
        </h2>
        <p className="mt-4 max-w-3xl text-lg font-normal uppercase tracking-[0.26rem] text-brand-light/60 md:text-4xl md:tracking-[0.34rem]">
          {word.sub}
        </p>
      </motion.div>
    </div>
  );
};

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

const StudioNarrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const words = narrative.split(" ");

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-brand-dark">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 md:px-12">
        <p className="flex max-w-5xl flex-wrap justify-center text-center text-3xl font-medium leading-[1.1] text-brand-light md:text-5xl lg:text-6xl">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = start + 1 / words.length;

            return (
              <NarrativeWord
                key={`${word}-${index}`}
                range={[start, end]}
                progress={scrollYProgress}
              >
                {word}
              </NarrativeWord>
            );
          })}
        </p>
      </div>
    </section>
  );
};

const StudioReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const wordProgress = useTransform(scrollYProgress, [0, 0.72], [0, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.72, 0.84], [14, 0]);
  const buttonScale = useTransform(scrollYProgress, [0.72, 0.84], [0.96, 1]);
  const buttonBlur = useTransform(scrollYProgress, [0.72, 0.84], [10, 0]);
  const buttonFilter = useTransform(buttonBlur, (value) => `blur(${value}px)`);
  const pointerEvents = useTransform(scrollYProgress, (value) =>
    value > 0.76 ? "auto" : "none"
  );

  return (
    <section ref={containerRef} className="relative h-[520vh] bg-brand-dark">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center">
          {revealWords.map((word, index) => (
            <ScrollWord
              key={word.text}
              word={word}
              index={index}
              progress={wordProgress}
              total={revealWords.length}
            />
          ))}
        </div>

        <motion.div
          style={{
            opacity: buttonOpacity,
            y: buttonY,
            scale: buttonScale,
            filter: buttonFilter,
            pointerEvents,
          }}
          className="absolute inset-0 z-50 flex items-center justify-center"
        >
          <Link
            to="/work"
            className="clickable group relative m-6 flex items-center gap-4 rounded-md border border-brand-light/30 bg-transparent px-8 py-5 text-brand-light transition-colors hover:border-brand-pink md:m-4 md:px-10"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white/5 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative text-center font-mono text-sm uppercase tracking-[0.28rem] text-white md:text-lg md:tracking-[0.5rem]">
              Explorar el portfolio
            </span>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-pink transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.24rem] text-white/20">
          Scroll para revelar
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
        <StudioNarrative />
        <StudioReveal />
      </main>
    </TransitionAnimate>
  );
};

export default Studio;
