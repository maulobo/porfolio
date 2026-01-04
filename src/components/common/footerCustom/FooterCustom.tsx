

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
// @ts-ignore
import { Gradient } from '../../../utils/Gradient';
import './FooterCustom.css';

const FooterCustom = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const y = useTransform(smoothProgress, [0, 1], [200, 0]);

   const scale = useTransform(smoothProgress, [0, 1], [0.3, 1]);

  useEffect(() => {
    const gradient = new Gradient();
    // @ts-ignore
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="mt-32 border-t border-brand-gray footer-custom-container relative"
      style={{ scale, y }}
    >
        <canvas id="gradient-canvas" data-transition-in />
        <div className="footer-content">
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
            Let's work together
          </h2>
          <p className="text-xl text-brand-light/60 max-w-2xl mb-8">
            Sound like your kind of studio? Tell us about your project and let’s
            work together to make it memorable.
          </p>
          <button className="text-lg border-b border-brand-pink pb-1 hover:text-brand-pink transition-colors duration-300">
            Get in touch
          </button>
        </div>
    </motion.div>
  )
}

export default FooterCustom