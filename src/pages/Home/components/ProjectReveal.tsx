import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const words = [
  { text: "IDEAS", sub: "Que inician todo" },
  { text: "OBRAS", sub: "Que construyen valor" },
  { text: "HUELLAS", sub: "Que marcan el camino" },
  { text: "PROYECTOS", sub: "Que definen el futuro" },
];

// Componente para cada palabra animada
const ScrollWord = ({ 
  word, 
  index, 
  progress, 
  total 
}: { 
  word: { text: string; sub: string }; 
  index: number; 
  progress: MotionValue<number>; 
  total: number;
}) => {
  // Calculamos el rango de tiempo de esta palabra específica
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  
  // Animación de entrada y salida
  // opacity: Entra rápido, se queda, se va al final
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );
  
  // y: Entra desde abajo, sube un poco mientras está activa, se va hacia arriba rápido
  const y = useTransform(
    progress,
    [start, start + 0.1, end],
    ["100%", "0%", "-100%"]
  );

  // blur: Desenfocado al entrar/salir, nítido en el centro
  const blur = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [10, 0, 0, 10]
  );

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity, y, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
        className="flex flex-col items-center"
      >
        <h2 className="text-[12vw] leading-none font-bold text-transparent text-stroke-white md:text-white uppercase tracking-tighter">
          {word.text}
        </h2>
        <p className="mt-4 text-sm md:text-xl font-mono text-brand-light/60 uppercase tracking-widest">
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

  // El botón final aparece solo al terminar todas las palabras
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 1], [50, 0]);
  const pointerEvents = useTransform(scrollYProgress, (pos) => pos > 0.9 ? "auto" : "none");

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-brand-dark">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Contenedor de palabras */}
        <div className="relative w-full h-full flex items-center justify-center">
          {words.map((word, i) => (
            <ScrollWord 
              key={i} 
              word={word} 
              index={i} 
              progress={scrollYProgress} 
              total={words.length}
            />
          ))}
        </div>

        {/* Botón final fijo o que aparece */}
        <motion.div 
          style={{ opacity: buttonOpacity, y: buttonY, pointerEvents }}
          className="absolute bottom-24 z-50"
        >
          <Link
            to="/works"
            className="flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full text-lg font-bold tracking-tight hover:bg-brand-pink transition-colors clickable"
          >
            VER TODOS LOS PROYECTOS
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Indicador de scroll sutil */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono uppercase">
          Scroll para revelar
        </div>
      </div>
    </section>
  );
};

export default ProjectReveal;
