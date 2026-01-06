import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HomeFooter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer
      ref={containerRef}
      className="bg-brand-dark min-h-screen flex flex-col justify-between px-4 md:px-12 py-12 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Label */}
      <div className="flex justify-between items-start border-b border-white/10 pb-8 relative z-10">
        <span className="text-sm font-mono uppercase text-brand-pink tracking-widest">
          Contacto
        </span>
        <span className="text-sm font-mono uppercase text-white/40 tracking-widest hidden md:block">
          Estado: Aceptando proyectos
        </span>
      </div>

      {/* Main CTA */}
      <motion.div
        style={{ y }}
        className="flex-1 flex flex-col justify-center py-10 md:py-20 relative z-10 group"
      >
        <a
          href="mailto:hola@scland.com"
          className="block w-full clickable text-center"
        >
          <h2 className="text-[14vw] leading-[0.8] font-bold tracking-tighter text-white uppercase transition-all duration-500 cursor-pointer flex flex-col items-center">
            <span className="block translate-x-[-10vw] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1] text-brand-light/90">
              HABLE
            </span>
            <span className="block translate-x-[10vw] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1] text-brand-pink/90 group-hover:text-white">
              MOS
            </span>
          </h2>
        </a>
      </motion.div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 relative z-10">
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-medium mb-2 uppercase text-sm tracking-wider opacity-50">
            Socials
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="text-white/80 hover:text-brand-pink flex items-center gap-2 group transition-colors text-lg clickable w-fit"
            >
              Instagram{" "}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-brand-pink flex items-center gap-2 group transition-colors text-lg clickable w-fit"
            >
              LinkedIn{" "}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-brand-pink flex items-center gap-2 group transition-colors text-lg clickable w-fit"
            >
              Behance{" "}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-white font-medium mb-2 uppercase text-sm tracking-wider opacity-50">
            Email
          </h3>
          <a
            href="mailto:hola@scland.com"
            className="text-xl md:text-2xl text-white hover:text-brand-pink transition-colors clickable underline decoration-white/20 underline-offset-4 decoration-1"
          >
            hola@scland.com
          </a>
        </div>

        <div className="flex flex-col justify-end gap-4 items-start md:items-end">
          <div className="flex justify-end mb-8 md:mb-0">
            <a
              href="mailto:hola@scland.com"
              className="w-32 h-32 rounded-full bg-brand-light text-brand-dark font-bold text-sm uppercase tracking-widest hover:scale-110 hover:bg-brand-pink hover:text-white transition-all duration-300 clickable flex items-center justify-center"
            >
              Enviar <br /> Info
            </a>
          </div>
          <p className="text-right text-white/20 text-xs font-mono uppercase tracking-widest mt-auto">
            © 2026 Scland Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
