import { motion, useReducedMotion, type Variants } from "framer-motion";
import SoftwareFigure from "./SoftwareFigure";
import { softwarePageCopy } from "../softwareContent";

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const { hero } = softwarePageCopy;

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
        <motion.p className="software-eyebrow" variants={variants} transition={transition}>
          {hero.eyebrow}
        </motion.p>
        <motion.h1 className="software-hero__title" variants={variants} transition={transition}>
          {hero.title}
        </motion.h1>
        <motion.p className="software-hero__body" variants={variants} transition={transition}>
          {hero.body}
        </motion.p>
        <motion.div className="software-hero__actions" variants={variants} transition={transition}>
          {hero.actions.map((action) => (
            <a
              key={action.label}
              className={`software-button software-button--${action.variant}`}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div className="software-hero__figure" variants={variants} transition={transition}>
        <SoftwareFigure {...hero.image} priority />
      </motion.div>
    </motion.section>
  );
};

export default SoftwareHero;
