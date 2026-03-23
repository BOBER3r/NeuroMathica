"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import MathScene from "@/components/math-scene/MathScene";
import type { SceneDefinition } from "@/components/math-scene/animation/types";

interface HookProps {
  animation: unknown;
  onComplete: () => void;
}

export function Hook({ animation, onComplete }: HookProps) {
  const [showContinue, setShowContinue] = useState(false);

  // Show continue after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const scene = animation as SceneDefinition | undefined;

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4">
      <div className="flex flex-1 w-full items-center justify-center">
        {scene && scene.objects ? (
          <MathScene
            scene={scene}
            className="w-full max-w-lg"
            onAnimationComplete={() => setShowContinue(true)}
          />
        ) : (
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="h-40 w-40 rounded-3xl bg-gradient-to-br from-nm-accent-indigo to-nm-accent-cyan shadow-lg shadow-nm-accent-indigo/20"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-center text-lg text-nm-text-secondary">
              {typeof animation === "object" && animation !== null && "hooks" in (animation as Record<string, unknown>)
                ? String((animation as Record<string, unknown>).hooks ?? "")
                : "Discover something amazing..."}
            </p>
          </motion.div>
        )}
      </div>

      <motion.div
        className="w-full max-w-sm pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={showContinue ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        <Button size="lg" onClick={onComplete} disabled={!showContinue} className="w-full">
          Continue
        </Button>
      </motion.div>
    </section>
  );
}
