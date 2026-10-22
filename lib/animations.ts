import { Variants } from "framer-motion";

/**
 * Standard smooth ease curve for luxury editorial interactions
 */
export const luxuryEase = [0.22, 1, 0.36, 1] as const;

/**
 * Fade up entrance variant
 */
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
};

/**
 * Pure Fade in variant with zero positional shift (optimal for accessibility / reduced motion)
 */
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

/**
 * Reveal variant with vertical mask wipe
 */
export const revealVariant: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
};

/**
 * Stagger container for sequential children animation orchestrations
 */
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

/**
 * Subtle image zoom variant for architectural photography
 */
export const imageZoomVariant: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.7, ease: luxuryEase },
  },
};

/**
 * Drawer / slide-in menu variant
 */
export const slideOverVariant: Variants = {
  closed: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  },
  open: {
    x: "0%",
    transition: { duration: 0.5, ease: luxuryEase },
  },
};

/**
 * Horizontal slide in variant
 */
export const slideInVariant = (direction: "left" | "right"): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -40 : 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
});
