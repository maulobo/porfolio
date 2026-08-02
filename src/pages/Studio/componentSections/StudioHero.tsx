import { motion } from "framer-motion";
import Scene from "../../Home/components/Scene";

const StudioHero = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white text-brand-dark">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/5 via-white/20 to-white/55" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        className="absolute bottom-8 left-0 z-10 flex w-full items-end justify-between px-5 font-mono text-xs uppercase tracking-[0.24rem] text-brand-dark/55 md:px-12"
      >
        <span>Desliza para Explorar</span>
        <span>Desde Argentina</span>
      </motion.div>
    </section>
  );
};

export default StudioHero;
