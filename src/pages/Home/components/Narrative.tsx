import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

const paragraph =
  "No solo hacemos sitios web; creamos ecosistemas digitales inmersivos. Fusionamos la estética visual con la perfección técnica.";

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
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] flex items-center justify-center px-4 md:px-12 py-24 bg-brand-dark"
    >
      <p className="flex flex-wrap text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] max-w-5xl text-brand-light">
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
  );
};

export default Narrative;
