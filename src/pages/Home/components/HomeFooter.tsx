import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FooterCustom, { FooterType } from "../../../components/common/footerCustom/FooterCustom";
import { finalCta, servicePillars } from "../homeContent";

export default function HomeFooter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <footer
      ref={containerRef}
      className="bg-brand-dark min-h-screen flex flex-col justify-between px-4 md:px-12 py-12 relative overflow-hidden"
    >
    
      <div className="absolute top-0 right-0 w-125 h-125 bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex justify-between items-start border-b border-white/10 pb-8 relative z-10">
        <span className="text-sm font-mono uppercase text-brand-pink tracking-widest">
          Contacto
        </span>
        <span className="text-sm font-mono uppercase text-white/40 tracking-widest hidden md:block">
          Estado: Aceptando proyectos
        </span>
      </div>

   
      <motion.div
        style={{ y }}
        className="flex-1 flex flex-col justify-center py-10 md:py-20 relative z-10 group"
      >
        <a
          href={`mailto:${finalCta.email}`}
          className="block w-full clickable text-center"
        >
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
              {finalCta.eyebrow}
            </p>
            <h2 className="text-5xl font-bold uppercase leading-[0.9] tracking-normal text-white transition-all duration-500 md:text-[9vw]">
              {finalCta.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
              {finalCta.description}
            </p>
          </div>
        </a>
      </motion.div>
      <div className="relative z-10 mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-3">
        {servicePillars.map((pillar) => (
          <span
            key={pillar.key}
            className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18rem] text-white/55"
          >
            {pillar.prompt}
          </span>
        ))}
      </div>
    <FooterCustom typeFooter={FooterType.FOTERHOME}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 relative z-10">
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-medium mb-2 uppercase text-sm tracking-wider opacity-50">
            Socials
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <a
              href="https://www.instagram.com/smartcloudar?igsh=MWU2MHQwN3FjajY4dg==" target="_blank"
              style={{color: '#ffffff'}}
              className=" hover:text-brand-pink border-white border rounded-full py-2 px-6 flex items-center gap-2 group transition-colors text-lg clickable w-fit"
            >
              Instagram{" "}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a
              href="https://www.linkedin.com/company/smartcloud-studio/" target="_blank"
                 style={{color: '#ffffff'}}
              className=" hover:text-brand-pink border-white border rounded-full py-2 px-6 flex items-center gap-2 group transition-colors text-lg clickable w-fit"
            >
              LinkedIn{" "}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a
              href="#"
                 style={{color: '#ffffff'}}
              className=" hover:text-brand-pink border-white border rounded-full py-2 px-6 flex items-center gap-2 group transition-colors text-lg clickable w-fit"
            >
              Behance{" "}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </div>
        
          
        
      </div>
      <div>
         <p className="text-right text-white text-xs font-mono uppercase tracking-widest mt-auto">
            © 2026 ScStudio Agency
          </p>
        </div>
    </footer>
  );
}
