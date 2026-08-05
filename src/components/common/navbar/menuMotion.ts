import type { Variants } from "framer-motion";

/** Curvas suaves: entrada expresiva, salida corta para que no se sienta pegajosa. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeIn = [0.7, 0, 0.84, 0] as const;

/**
 * El wrapper no anima nada por sí mismo, pero tiene que ser un componente de
 * motion: AnimatePresence sólo retrasa el desmontaje de sus hijos directos.
 * Desde acá las variantes se propagan al panel, la sombra y las filas.
 */
export const wrapperVariants: Variants = {
  hidden: {},
  visible: {},
  exit: {},
};

export const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
    scaleY: 0.9,
    clipPath: "inset(0% 0% 100% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.46,
      ease: easeOut,
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scaleY: 0.94,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.26,
      ease: easeIn,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const rowVariants: Variants = {
  hidden: { opacity: 0, y: 18, x: -6 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.42, ease: easeOut } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: easeIn } },
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.32, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: easeIn } },
};

export const shadowVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  visible: { opacity: 1, x: 10, y: 10, transition: { duration: 0.5, ease: easeOut, delay: 0.06 } },
  exit: { opacity: 0, x: 0, y: 0, transition: { duration: 0.2, ease: easeIn } },
};
