import { motion } from "framer-motion";
import Scene from "./Scene";

const Hero = () => {
  return (
    <div className="h-screen w-full relative  flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-0 w-full flex justify-between px-8 md:px-12 text-sm uppercase tracking-widest text-brand-dark/60 font-mono z-10 pointer-events-none"
      >
        <span>Desliza para Explorar</span>
        <span>Desde Argentina</span>
      </motion.div>
    </div>
  );
};

export default Hero;
