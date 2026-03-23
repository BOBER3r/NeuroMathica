"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import MathScene from "@/components/math-scene/MathScene";
import type { SceneDefinition } from "@/components/math-scene/animation/types";

const MIN_INTERACTIONS = 3;

interface SpatialExperienceProps {
  scene: unknown;
  onComplete: () => void;
}

export function SpatialExperience({ scene, onComplete }: SpatialExperienceProps) {
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= MIN_INTERACTIONS;

  const sceneData = scene as SceneDefinition | undefined;

  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4">
      <div className="absolute right-4 top-4 rounded-full bg-nm-bg-surface px-3 py-1 text-xs text-nm-text-muted tabular-nums">
        {interactions} / {MIN_INTERACTIONS} interactions
      </div>

      {!canContinue && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-nm-accent-cyan">
            Tap and explore the scene below!
          </p>
        </motion.div>
      )}

      <div
        className="flex flex-1 items-center justify-center w-full py-4"
        onClick={() => setInteractions((i) => i + 1)}
      >
        {sceneData && sceneData.objects ? (
          <MathScene
            scene={sceneData}
            className="w-full max-w-lg"
            onInteraction={() => setInteractions((i) => i + 1)}
          />
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }, (_, i) => (
              <motion.div
                key={i}
                className="flex h-20 w-20 items-center justify-center rounded-xl bg-nm-bg-surface border border-nm-bg-elevated cursor-pointer text-2xl"
                whileHover={{ scale: 1.1, borderColor: "var(--nm-accent-indigo)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); setInteractions((n) => n + 1); }}
              >
                {["1", "10", "100", "1K", "+", "-", "×", "÷", "="][i]}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <motion.div
        className="w-full max-w-sm mx-auto pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={canContinue ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        <Button size="lg" onClick={onComplete} disabled={!canContinue} className="w-full">
          Continue
        </Button>
      </motion.div>
    </section>
  );
}
