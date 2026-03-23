/**
 * Shared Framer Motion spring configs and animation variants.
 * Replaces the per-lesson SPRING / SPRING_BOUNCY / slideVariants constants.
 */

export const springs = {
  default: { type: "spring" as const, damping: 20, stiffness: 300 },
  bouncy: { type: "spring" as const, damping: 12, stiffness: 400 },
  stiff: { type: "spring" as const, damping: 25, stiffness: 400 },
  gentle: { type: "spring" as const, damping: 25, stiffness: 200 },
  pop: { type: "spring" as const, damping: 15, stiffness: 400 },
} as const;

/** Stage / problem slide transition (enter right, exit left). */
export const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
} as const;

/** Fade-up reveal for cards, prompts, and staggered lists. */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

/** Simple fade in/out. */
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;
