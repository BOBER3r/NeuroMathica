"use client";

import { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AhaMomentProps {
  /** Called when the celebration animation completes. */
  onComplete: () => void;
  /** Optional encouraging quote displayed in the center. */
  quote?: string;
}

const AUTO_DISMISS_MS = 3_000;

const DEFAULT_QUOTES = [
  "Your neurons just fired in perfect sync!",
  "That connection will last a lifetime.",
  "Brilliance — one synapse at a time.",
  "You just leveled up your understanding!",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
}

const PARTICLE_COLORS = [
  "var(--nm-accent-indigo)",
  "var(--nm-accent-cyan)",
  "var(--nm-accent-emerald)",
  "var(--nm-accent-amber)",
  "var(--nm-accent-violet)",
  "var(--nm-accent-rose)",
];

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const distance = 100 + Math.random() * 200;
    particles.push({
      id: i,
      x: 50,
      y: 50,
      size: 3 + Math.random() * 5,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length] as string,
      delay: Math.random() * 0.3,
      duration: 0.8 + Math.random() * 0.6,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
    });
  }
  return particles;
}

/**
 * Full-screen celebration overlay with a "Neuron Flash" burst-of-particles
 * animation. Displays an encouraging quote in the center and auto-dismisses
 * after 3 seconds or on tap.
 */
function AhaMoment({ onComplete, quote }: AhaMomentProps) {
  const particles = useMemo(() => generateParticles(28), []);

  const displayQuote = useMemo(() => {
    if (quote) return quote;
    return DEFAULT_QUOTES[
      Math.floor(Math.random() * DEFAULT_QUOTES.length)
    ] as string;
  }, [quote]);

  useEffect(() => {
    const timer = setTimeout(onComplete, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleTap = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="aha-overlay"
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center",
          "cursor-pointer select-none",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleTap}
        role="alert"
        aria-label="Breakthrough moment celebration"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-nm-bg-primary/80 backdrop-blur-sm" />

        {/* Burst particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.2, 0.8],
                x: p.dx,
                y: p.dy,
                opacity: [1, 1, 0],
              }}
              transition={{
                delay: p.delay,
                duration: p.duration,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Central flash ring */}
        <motion.div
          className={cn(
            "absolute h-40 w-40 rounded-full",
            "border-2 border-nm-accent-indigo/50",
          )}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Central glow */}
        <motion.div
          className="absolute h-24 w-24 rounded-full bg-nm-accent-indigo/20 blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Quote text */}
        <motion.div
          className="relative z-10 max-w-xs px-6 text-center"
          initial={{ scale: 0.7, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", damping: 14 }}
        >
          {/* Lightning icon */}
          <motion.div
            className="mx-auto mb-3 text-nm-accent-amber"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 10 }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 2L3 14h7l-2 8 10-12h-7l2-8z" />
            </svg>
          </motion.div>

          <p className="text-lg font-semibold text-nm-text-primary leading-snug">
            {displayQuote}
          </p>

          <p className="mt-2 text-xs text-nm-text-muted">Tap to continue</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export { AhaMoment };
export type { AhaMomentProps };
