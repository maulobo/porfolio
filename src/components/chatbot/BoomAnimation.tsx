import { useEffect } from "react";
import { motion } from "framer-motion";

const BoomAnimation = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 750);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#111111]/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.75, times: [0, 0.1, 0.75, 1], ease: "easeInOut" }}
    >
      <motion.span
        className="select-none font-black text-[#d7ff4f]"
        style={{ fontSize: "3.5rem", lineHeight: 1, letterSpacing: "-0.02em" }}
        initial={{ scale: 0.3, rotate: -8 }}
        animate={{ scale: [0.3, 1.4, 1.1], rotate: [-8, 4, -2] }}
        transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" }}
      >
        ¡BOOM!
      </motion.span>
    </motion.div>
  );
};

export default BoomAnimation;
