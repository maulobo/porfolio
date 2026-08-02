import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const StudioIntro = () => {
  return (
    <section className="bg-white px-5 py-20 text-black md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 border-black bg-[#f3f0e8] p-6 shadow-[12px_12px_0_#111111] md:p-10"
        >
          <p className="inline-block border-2 border-black bg-[#d7ff4f] px-3 py-1 font-mono text-[11px] font-black uppercase tracking-[0.24rem]">
            Desde Argentina
          </p>
          <h1 className="mt-8 max-w-4xl text-4xl font-black uppercase leading-[0.9] md:text-7xl">
            Un estudio de software con criterio creativo.
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-black/70 md:text-xl">
              Somos un equipo de tres personas que combina desarrollo, experiencia de usuario y producción
              visual para construir soluciones digitales con identidad.
            </p>
            <p className="text-lg leading-relaxed text-black/70 md:text-xl">
              Nos involucramos de forma directa, trabajamos con procesos claros y respondemos por cada
              decisión, cada entrega y cada etapa del proyecto.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/work"
              className="clickable group inline-flex w-fit items-center gap-3 border-2 border-black bg-[#d7ff4f] px-6 py-4 font-semibold text-black shadow-[6px_6px_0_#111111] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_#111111]"
            >
              Explorar proyectos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#equipo"
              className="clickable inline-flex w-fit items-center gap-3 border-2 border-black bg-white px-6 py-4 font-semibold text-black shadow-[6px_6px_0_#111111] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_#111111]"
            >
              Conocer al equipo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioIntro;
