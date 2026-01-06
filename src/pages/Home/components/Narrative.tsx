import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

const paragraph =
  "Cada detalle importa: lo que se ve, lo que se siente y lo que funciona.";

const Word = ({ children, range, progress }: any) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative mr-3 mt-3 inline-block">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const Narrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = paragraph.split(" ");

  return (
    <div ref={containerRef} className="h-[200vh] bg-brand-dark relative">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-12">
        <p className="flex flex-wrap justify-center text-center text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] max-w-5xl text-brand-light">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default Narrative;
