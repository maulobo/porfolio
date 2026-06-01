import { motion } from "framer-motion";
import * as simpleIcons from "simple-icons";
import { techStackRow1, techStackRow2 } from "../homeContent";

type Tool = { name: string; slug: string };

const getIcon = (slug: string) => {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  return simpleIcons[key] as { path: string } | undefined;
};

const allTools = [...techStackRow1, ...techStackRow2] as Tool[];

const accentColors = [
  "hover:bg-[#d7ff4f]",
  "hover:bg-white",
  "hover:bg-[#ff2bf9]",
  "hover:bg-white",
  "hover:bg-[#d7ff4f]",
  "hover:bg-white",
  "hover:bg-[#ff2bf9]",
  "hover:bg-white",
  "hover:bg-[#d7ff4f]",
  "hover:bg-white",
  "hover:bg-[#ff2bf9]",
  "hover:bg-white",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const TechStack = () => {
  return (
    <section className="bg-[#f3f0e8] px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] uppercase tracking-[0.28rem] text-black/50"
            >
              Herramientas que usamos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-4xl font-semibold leading-tight md:text-6xl"
            >
              Stack tecnológico
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-lg leading-relaxed text-black/60"
          >
            Combinamos diseño, desarrollo, IA y producción con herramientas modernas y probadas.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          {allTools.map((tool, i) => {
            const icon = getIcon(tool.slug);
            return (
              <motion.div
                key={tool.name}
                variants={item}
                className={`group relative flex flex-col items-center justify-center gap-4 border-2 border-black bg-white p-6 shadow-[6px_6px_0_#111111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_#111111] ${accentColors[i]}`}
              >
                {icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-9 w-9 shrink-0 fill-current text-black/70 transition-colors duration-200 group-hover:text-black"
                    aria-hidden="true"
                  >
                    <path d={icon.path} />
                  </svg>
                ) : (
                  <div className="h-9 w-9 rounded-full bg-black/10" />
                )}
                <span className="text-center text-sm font-semibold leading-tight tracking-tight text-black/90 md:text-base">
                  {tool.name}
                </span>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
