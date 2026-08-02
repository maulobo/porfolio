import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const heroImages = [
  "/images/projects/banner-case.jpg",
  "/images/projects/banner-vivra.jpg",
  "/images/projects/banner-ssi.jpg",
  "/images/projects/minimal-banner.webp",
  "/images/projects/bo-banner.jpeg",
  "/images/projects/banner-help.jpg",
];

const heroTags = [
  "Web y e-commerce",
  "Software a medida",
  "Visibilidad en buscadores e IA",
  "Video y motion",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#111111] text-white">
      <div className="absolute inset-0 grid grid-cols-2 opacity-55 md:grid-cols-3">
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15 + index * 0.08,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative min-h-[34vh] overflow-hidden border border-white/5"
          >
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[#111111]/72" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#111111] to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 pb-8 pt-28 md:px-12 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <h1 className="max-w-6xl text-5xl font-semibold leading-[0.94] tracking-normal md:text-7xl lg:text-[6.4rem]">
            Software a medida. Diseño con identidad.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/74 md:text-2xl">
            Desarrollamos software, sitios web y contenido digital con una dirección propia. Integramos creatividad, lógica y procesos claros para lograr soluciones funcionales, reconocibles y bien ejecutadas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/5492995831639"
              target="_blank"
              rel="noopener noreferrer"
              className="clickable group inline-flex w-fit items-center gap-3 rounded-md bg-[#d7ff4f] px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-black transition hover:bg-white"
            >
              Iniciar un proyecto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/work"
              className="clickable inline-flex w-fit items-center gap-3 rounded-md border border-white/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-white transition hover:border-[#ff2bf9]"
            >
              Ver proyectos
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 pt-16">
          {heroTags.map((item) => (
            <span
              key={item}
              className="border border-white/24 bg-black/25 px-4 py-2 text-sm text-white/78 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
