import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import clsx from "clsx";
// @ts-ignore
import { Gradient } from "../../../utils/Gradient";
import "./FooterCustom.css";

type FormData = {
  nombreApellido: string;
  telefono: string;
  mensaje: string;
};


export const enum FooterType {
  FOTERHOME = "FOTERHOME",
  FOOTERWORK = "FOOTERWORK",
}
interface FooterCustomProps {
  typeFooter?: FooterType;
}

const FooterCustom = ({typeFooter}: FooterCustomProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  const y = useTransform(smoothProgress, [0, 1], [200, 0]);

  const scale = useTransform(smoothProgress, [0, 1], [0.3, 1]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const templateParams = {
        nombreApellido: data.nombreApellido,
        telefono: data.telefono,
        mensaje: data.mensaje,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitMessage({ type: 'success', text: '¡Gracias por contactarnos! Te responderemos pronto.' });
      reset();
    } catch (error) {
      console.error('Error al enviar el email:', error);
      setSubmitMessage({ type: 'error', text: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (typeFooter === FooterType.FOTERHOME) {
      const gradient = new Gradient();
      // @ts-ignore
      gradient.initGradient("#gradient-canvas");
    }
    // Inicializar EmailJS
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, [typeFooter]);

  const isHome = typeFooter === FooterType.FOTERHOME;

  return (
    <motion.div
      ref={containerRef}
      className={clsx(
        "relative",
        isHome ? "mt-32 border-t border-brand-gray footer-custom-container" : "mt-32 overflow-hidden border-t-2 border-black bg-[#f3f0e8]"
      )}
      style={{
        scale: isHome ? scale : 1,
        y,
      }}
    >
      {isHome && <canvas id="gradient-canvas" data-transition-in />}

      {
        typeFooter === FooterType.FOOTERWORK ? (
          <div className="relative px-5 py-20 md:px-12 md:py-28">
            {/* Halftone pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
                backgroundSize: "14px 14px",
              }}
            />

            <div className="relative mx-auto max-w-6xl">
              {/* Comic burst decoration */}
              <svg
                className="absolute -right-2 -top-10 z-10 h-28 w-28 -rotate-12 text-[#ff2bf9] md:-right-4 md:-top-14 md:h-40 md:w-40"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <polygon
                  points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                  fill="currentColor"
                />
              </svg>

              {/* Action lines */}
              <div className="pointer-events-none absolute -left-8 top-1/2 hidden -translate-y-1/2 md:block">
                <div className="mb-3 h-1 w-16 -rotate-45 bg-black" />
                <div className="mb-3 ml-4 h-1 w-12 -rotate-45 bg-black" />
                <div className="ml-8 h-1 w-8 -rotate-45 bg-black" />
              </div>

              {/* Main speech bubble */}
              <div className="relative border-2 border-black bg-white p-8 shadow-[12px_12px_0_#111111] md:p-14">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-[13px] left-10 h-6 w-6 -rotate-45 border-2 border-black border-t-0 border-l-0 bg-white md:left-16" />

                <div className="relative">
                  <h2 className="text-5xl font-black leading-[0.9] tracking-tight text-black md:text-7xl lg:text-[5.5rem]">
                    Trabajemos
                    <br />
                    juntos
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/60">
                    Cuéntanos sobre tu proyecto y lo convertimos en una
                    experiencia digital que funcione.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="mailto:contacto@smartcloudstudio.com"
                      className="clickable inline-flex items-center justify-center gap-3 border-2 border-black bg-[#d7ff4f] px-8 py-4 font-mono text-sm uppercase tracking-[0.22rem] text-black shadow-[6px_6px_0_#111111] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_#111111]"
                    >
                      Escribinos
                    </a>
                    <a
                      href="https://wa.me/5492995831639"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clickable inline-flex items-center justify-center gap-3 border-2 border-black bg-white px-8 py-4 font-mono text-sm uppercase tracking-[0.22rem] text-black shadow-[6px_6px_0_#111111] transition-all hover:-translate-y-1 hover:bg-[#ff2bf9] hover:shadow-[8px_8px_0_#111111]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact strip */}
              <div className="mt-12 flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.2rem] text-black/40">
                <a href="mailto:contacto@smartcloudstudio.com" className="clickable w-fit hover:text-black">
                  contacto@smartcloudstudio.com
                </a>
                <a href="tel:+5492995831639" className="clickable w-fit hover:text-black">
                  +54 9 2995 83-1639
                </a>
              </div>
            </div>
          </div>
        ) : typeFooter === FooterType.FOTERHOME ? (
          <div className="container-footer-home flex flex-col lg:flex-row gap-8 items-start justify-center p-4 md:p-16">
            <section className=" footer-content-two">
              <h2 className="text-xl md:text-3xl font-medium mb-2 text-slate-900 text-start">
              Hablemos de tu proyecto
              </h2>
              <p className="text-lg text-slate-900 max-w-2xl mb-4">
                Cuéntanos sobre tu proyecto y trabajemos juntos para hacerlo realidad.
              </p>
            
              <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mb-2 flex flex-col ">
                <div className="mb-2">
                  <input
                    {...register("nombreApellido", { 
                      required: "El nombre y apellido son requeridos",
                      minLength: { value: 3, message: "Debe tener al menos 3 caracteres" }
                    })}
                    type="text"
                    placeholder="Nombre y Apellido"
                    className="w-full px-4 py-3 bg-white/20 border border-white/50 rounded-md text-slate-900 placeholder-slate-900/50 focus:outline-none focus:border-slate-900"
                  />
                  {errors.nombreApellido && (
                    <span className="text-red-600 text-sm mt-1 block">{errors.nombreApellido.message}</span>
                  )}
                </div>

                <div className="mb-2">
                  <input
                    {...register("telefono", { 
                      required: "El teléfono es requerido",
                      pattern: { value: /^[0-9+\-\s()]+$/, message: "Formato de teléfono inválido" }
                    })}
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full px-4 py-3 bg-white/20 border border-white/50 rounded-md text-slate-900 placeholder-slate-900/50 focus:outline-none focus:border-slate-900"
                  />
                  {errors.telefono && (
                    <span className="text-red-600 text-sm mt-1 block">{errors.telefono.message}</span>
                  )}
                </div>

                <div className="mb-2">
                  <textarea
                    {...register("mensaje", { 
                      required: "El mensaje es requerido",
                      minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" }
                    })}
                    placeholder="Cuéntanos sobre tu proyecto..."
                    rows={5}
                    className="w-full px-4 py-3 bg-white/20 border border-white/50  rounded-md text-slate-900 placeholder-slate-900/50 focus:outline-none focus:border-slate-900 resize-none"
                  />
                  {errors.mensaje && (
                    <span className="text-red-600 text-sm mt-1 block">{errors.mensaje.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-end px-8 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors clickable disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
              
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-md ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage.text}
                </div>
              )}
            </section>
            

            <div className="footer-content-two section-h">
              <p className="text-slate-900 mb-2 text-lg">O escríbenos directamente a:</p>
              <a
                href="mailto:contacto@smartcloudstudio.com"
                style={{color:"var(--color-slate-900)"}}
                className="text-xl mb-4 md:text-2xl text-slate-900 clickable underline decoration-slate-900/20 underline-offset-4 decoration-1"
              >
                contacto@smartcloudstudio.com
              </a>
              <p className="text-slate-900 mb-2 text-lg">También puedes contactarte por whatsapp al</p>
              <a
                href="https://wa.me/5492995831639" target="_blank" rel="noopener noreferrer"
                style={{color:"var(--color-slate-900)"}}
                className="text-xl md:text-2xl text-slate-900 clickable underline decoration-slate-900/20 underline-offset-4 decoration-1"
              >
                +54 9 2995 83-1639
              </a>
            </div>
          </div>
        ) : null
      }
    </motion.div>
  );
};

export default FooterCustom;
