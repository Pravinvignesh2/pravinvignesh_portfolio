import { Transition, Variants } from 'motion/react';

// Apple-inspired smooth settling curve: cubic-bezier(0.16, 1, 0.3, 1)
export const EASE_APPLE = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT = [0, 0, 0.2, 1] as const;

// Transition tokens
export const TRANSITION_FAST: Transition = {
  duration: 0.15,
  ease: EASE_APPLE,
};

export const TRANSITION_NORMAL: Transition = {
  duration: 0.25,
  ease: EASE_APPLE,
};

export const TRANSITION_EDITORIAL: Transition = {
  duration: 0.5,
  ease: EASE_APPLE,
};

export const SPRING_SUBTLE: Transition = {
  type: 'spring',
  damping: 24,
  stiffness: 260,
  mass: 0.3,
};

export const SPRING_MAGNETIC: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 200,
  mass: 0.2,
};

// Reusable Scroll Reveal Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION_NORMAL,
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_EDITORIAL,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Page Transition Variants
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASE_APPLE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: EASE_OUT,
    },
  },
};
