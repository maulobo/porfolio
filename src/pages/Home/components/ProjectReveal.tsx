import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const words = [
  { text: "IDEAS", sub: "Que inician todo" },
  { text: "IMAGEN", sub: "Que construye identidad" },
  { text: "DISEÑO", sub: "Que define el estilo" },
  { text: "PROYECTOS", sub: "Que quedan" },
];


const ScrollWord = ({
  word,
  index,
  progress,
  total,
}: {
  word: { text: string; sub: string };
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

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <motion.div
        style={{
          opacity,
          y,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
        className="flex flex-col items-center"
      >
        <h2 className="text-5xl md:text-[12vw] leading-none font-bold  text-stroke-white text-white uppercase tracking-tighter">
          {word.text}
        </h2>
        <p className="mt-4 text-xl md:text-4xl font-normal text-brand-light/60 uppercase tracking-widest">
          {word.sub}
        </p>
      </motion.div>
    </div>
  );
};

const ProjectReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const wordProgress = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.7, 0.82], [14, 0]);
  const buttonScale = useTransform(scrollYProgress, [0.7, 0.82], [0.96, 1]);
  const buttonBlur = useTransform(scrollYProgress, [0.7, 0.82], [10, 0]);
  const buttonFilter = useTransform(buttonBlur, (v) => `blur(${v}px)`);
  const pointerEvents = useTransform(scrollYProgress, (pos) =>
    pos > 0.74 ? "auto" : "none"
  );

  return (
    <section ref={containerRef} className="h-[520vh] relative bg-brand-dark">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
       
        <div className="relative w-full h-full flex items-center justify-center">
          {words.map((word, i) => (
            <ScrollWord
              key={i}
              word={word}
              index={i}
              progress={wordProgress}
              total={words.length}
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
            className="group relative m-6 md:m-4  flex items-center gap-4 px-10 py-5 border border-brand-light/30 text-brand-light rounded-md bg-transparent hover:border-brand-pink transition-colors clickable"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white/5 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative text-lg md:text-lg font-mono uppercase tracking-[0.5rem] text-white">
              Explorar el portfolio
            </span>
            <span className="relative opacity-80 group-hover:opacity-100 transition-opacity text-white">
              <ArrowRight size={18} />
            </span>
            <span className="absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-brand-pink transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
        </motion.div>


        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono uppercase">
          Scroll para revelar
        </div>
      </div>
    </section>
  );
};

export default ProjectReveal;
