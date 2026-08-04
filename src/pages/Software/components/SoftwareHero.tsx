import { motion, useReducedMotion, type Variants } from "framer-motion";
import { softwarePageCopy } from "../softwareContent";

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const SoftwareHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? staticVariants : heroVariants;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.section
      className="software-hero min-h-screen"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transition}
    >
      <div className="software-hero__content">
        <motion.h1 className="software-hero__title" variants={variants} transition={transition}>
          {softwarePageCopy.hero.title}
        </motion.h1>
        <motion.p className="software-hero__body" variants={variants} transition={transition}>
          {softwarePageCopy.hero.body}
        </motion.p>
        <motion.div className="software-hero__actions" variants={variants} transition={transition}>
          <a
            className="software-button software-button--primary"
            href="https://wa.me/5492995831639"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iniciar un proyecto
          </a>
          <a
            className="software-button software-button--secondary"
            href="/software/panel-crm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver demostración
          </a>
        </motion.div>
      </div>

      <motion.div className="software-product-stage" variants={variants} transition={transition}>
        <img
          className="software-product-stage__image"
          src="/software/1.png"
          alt="Panel operativo con indicadores, actividad reciente y accesos de gestión"
          width={2996}
          height={1540}
          fetchPriority="high"
        />
      </motion.div>
    </motion.section>
  );
};

export default SoftwareHero;
