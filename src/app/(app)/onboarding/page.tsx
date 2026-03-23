"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function OnboardingHookPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary p-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-12 flex h-64 w-64 items-center justify-center"
      >
        {/* Fractal / Mandelbrot placeholder animation */}
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <radialGradient id="nebula-grad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="var(--nm-accent-indigo)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="var(--nm-accent-cyan)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--nm-bg-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#nebula-grad)"
            animate={{ r: [60, 80, 70, 80] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r = 40 + Math.random() * 30;
            return (
              <motion.circle
                key={i}
                cx={100 + Math.cos(angle) * r}
                cy={100 + Math.sin(angle) * r}
                r={2 + Math.random() * 3}
                fill="var(--nm-accent-cyan)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
              />
            );
          })}
        </svg>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-3 text-center text-3xl font-bold text-nm-text-primary"
      >
        Welcome to NeuroMathica
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-10 text-center text-nm-text-secondary"
      >
        See math come alive
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/onboarding/taste")}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
