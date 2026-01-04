

import React, { useEffect } from 'react';
// @ts-ignore
import { Gradient } from '../../../utils/Gradient';
import './FooterCustom.css';

const FooterCustom = () => {
  useEffect(() => {
    const gradient = new Gradient();
    // @ts-ignore
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <div className="mt-32 border-t border-brand-gray footer-custom-container relative">
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
    </div>
  )
}

export default FooterCustom