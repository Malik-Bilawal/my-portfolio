import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const RISE_TRANSITION: Transition = {
  duration: 0.5,
  ease: EASE_OUT,
};

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE_OUT },
  }),
};
