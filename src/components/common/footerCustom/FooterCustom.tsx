import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
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
    const gradient = new Gradient();
    // @ts-ignore
    gradient.initGradient("#gradient-canvas");
    
    // Inicializar EmailJS
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="mt-32 border-t border-brand-gray footer-custom-container relative"
      style={{ scale, y }}
    >
      <canvas id="gradient-canvas" data-transition-in />
      {
        typeFooter === FooterType.FOOTERWORK ? (
          <div className="footer-content">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-slate-900">
              Trabajemos juntos
            </h2>
            <p className="text-xl text-slate-900 max-w-2xl mb-8">
              Cuéntanos sobre tu proyecto y
              trabajemos juntos para hacerlo memorable.
            </p>
            <a
            href="mailto:contacto@smartcloudstudio.com"
            className="mailF text-xl md:text-2xl text-slate-900 clickable underline decoration-white/20 underline-offset-4 decoration-1"
          >
             contacto@smartcloudstudio.com
          </a>
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
