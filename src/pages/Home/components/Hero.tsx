import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeHero } from "../homeContent";
import Scene from "./Scene";

const Hero = () => {
  return (
    <section className="min-h-screen w-full relative flex items-center overflow-hidden bg-white text-brand-dark">
      <div className="absolute inset-0 z-0">
        <Scene showText={false} />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/10 via-white/35 to-white/70 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full px-5 pb-28 pt-28 md:px-12 md:pb-16"
      >
        <div className="max-w-6xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.35rem] text-brand-dark/60">
            {homeHero.eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-normal text-brand-dark md:text-7xl lg:text-8xl">
            {homeHero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-dark/70 md:text-2xl">
            {homeHero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:contacto@smartcloudstudio.com"
              className="clickable group inline-flex w-fit items-center gap-3 rounded-md bg-brand-dark px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-white transition-colors hover:bg-brand-pink"
            >
              {homeHero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/work"
              className="clickable inline-flex w-fit items-center gap-3 rounded-md border border-brand-dark/20 bg-white/40 px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-brand-dark backdrop-blur-md transition-colors hover:border-brand-dark/60"
            >
              {homeHero.secondaryCta}
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-8 left-0 z-10 flex w-full items-end justify-between px-5 font-mono text-xs uppercase tracking-[0.24rem] text-brand-dark/55 md:px-12"
      >
        <span className="inline-flex items-center gap-2">
          <ArrowDown className="h-4 w-4" />
          Desliza
        </span>
        <span>{homeHero.location}</span>
      </motion.div>
    </section>
  );
};

export default Hero;
