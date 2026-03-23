"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import MathScene from "@/components/math-scene/MathScene";
import type { SceneDefinition } from "@/components/math-scene/animation/types";

interface GuidedDiscoveryProps {
  scene: unknown;
  prompts: string[];
  onComplete: () => void;
}

export function GuidedDiscovery({ scene, prompts, onComplete }: GuidedDiscoveryProps) {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const displayPrompts = prompts.length > 0 ? prompts : [
    "Look at the visualization. What patterns do you notice?",
    "Try changing the values. What happens?",
    "Can you see the relationship?",
  ];
  const allAcknowledged = currentPrompt >= displayPrompts.length;
  const sceneData = scene as SceneDefinition | undefined;

  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4">
      <div className="flex flex-1 items-center justify-center w-full py-4">
        {sceneData && sceneData.objects ? (
          <MathScene scene={sceneData} className="w-full max-w-lg" />
        ) : (
          <div className="flex h-48 w-full max-w-sm items-center justify-center rounded-2xl bg-nm-bg-secondary border border-nm-bg-surface">
            <p className="text-nm-text-muted text-sm">Interactive scene</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <AnimatePresence mode="wait">
          {!allAcknowledged && displayPrompts[currentPrompt] && (
            <motion.div
              key={currentPrompt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl bg-nm-bg-secondary border border-nm-bg-surface p-4"
            >
              <p className="mb-3 text-nm-text-primary">{displayPrompts[currentPrompt]}</p>
              <Button variant="secondary" size="sm" onClick={() => setCurrentPrompt((c) => c + 1)}>
                {currentPrompt < displayPrompts.length - 1 ? "I see it!" : "Got it!"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="w-full max-w-sm mx-auto pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={allAcknowledged ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        <Button size="lg" onClick={onComplete} disabled={!allAcknowledged} className="w-full">
          Continue
        </Button>
      </motion.div>
    </section>
  );
}
