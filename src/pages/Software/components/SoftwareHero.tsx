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
      className="software-hero"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transition}
    >
      <div className="software-hero__content">
        <motion.p className="software-hero__eyebrow" variants={variants} transition={transition}>
          {softwarePageCopy.hero.eyebrow}
        </motion.p>
        <motion.h1 variants={variants} transition={transition}>
          {softwarePageCopy.hero.title}
        </motion.h1>
        <motion.p className="software-hero__body" variants={variants} transition={transition}>
          {softwarePageCopy.hero.body}
        </motion.p>
        <motion.div className="software-hero__actions" variants={variants} transition={transition}>
          <a
            href="https://wa.me/5492995831639"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iniciar un proyecto
          </a>
          <a href="/software/panel-crm" target="_blank" rel="noopener noreferrer">
            Ver demostración
          </a>
        </motion.div>
      </div>

      <motion.div className="software-screen-stack" variants={variants} transition={transition}>
        <img
          className="software-screen-stack__image software-screen-stack__image--primary"
          src="/software/1.png"
          alt=""
          aria-hidden="true"
          width={2996}
          height={1540}
          fetchPriority="high"
        />
        <img
          className="software-screen-stack__image software-screen-stack__image--secondary"
          src="/software/2.png"
          alt=""
          aria-hidden="true"
          width={2998}
          height={1548}
          fetchPriority="high"
        />
      </motion.div>

      <div className="software-system-trace" aria-hidden="true" />
    </motion.section>
  );
};

export default SoftwareHero;
