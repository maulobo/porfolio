import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const scrollPanels = [
  {
    label: "Mensaje",
    title: "Lo que necesita entenderse.",
    copy: "Antes de diseñar una pantalla, definimos qué necesita comunicar el proyecto, qué debe comprender la persona y cuál es la acción principal.",
    note: "Ordenar el mensaje es el primer paso para construir una experiencia clara.",
    color: "bg-[#d7ff4f]",
  },
  {
    label: "Experiencia",
    title: "Lo que sucede al utilizarlo.",
    copy: "Organizamos contenidos, recorridos e interacciones para que cada decisión tenga sentido.",
    note: "La experiencia se construye en la navegación, el ritmo, la jerarquía y los pequeños detalles que hacen que una interfaz resulte natural.",
    color: "bg-white",
  },
  {
    label: "Sistema",
    title: "Lo que permite que funcione.",
    copy: "Conectamos diseño, código, datos e infraestructura para desarrollar soluciones estables, rápidas y preparadas para el uso real.",
    note: "Lo visual necesita una base técnica que lo sostenga.",
    color: "bg-[#ff2bf9]",
  },
  {
    label: "Entrega",
    title: "Lo que finalmente se publica.",
    copy: "Probamos, ajustamos, documentamos y acompañamos la puesta en marcha.",
    note: "El trabajo no termina cuando algo parece terminado. Termina cuando está publicado, funciona correctamente y puede sostenerse en el tiempo.",
    color: "bg-[#f3f0e8]",
  },
] as const;

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
      <p className="inline-block border-2 border-black bg-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.22rem] md:text-xs">
        {panel.label}
      </p>
      <h2 className="mt-6 text-3xl font-black uppercase leading-[0.9] md:text-6xl">
        {panel.title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/70 md:text-xl">
        {panel.copy}
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70 md:text-xl">
        {panel.note}
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
          Studio files
        </div>
        {scrollPanels.map((panel, index) => (
          <ScrollPanel
            key={panel.label}
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

export default StudioScrollComic;
