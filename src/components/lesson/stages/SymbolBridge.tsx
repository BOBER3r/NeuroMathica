"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import katex from "katex";

interface SymbolBridgeProps {
  scene: unknown;
  notation: string[];
  onComplete: () => void;
}

export function SymbolBridge({ notation, onComplete }: SymbolBridgeProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const displayNotation = notation.length > 0 ? notation : [
    "a + b = c",
    "\\text{position} \\times \\text{value} = \\text{total}",
  ];
  const allRevealed = revealedCount >= displayNotation.length;

  useEffect(() => {
    if (revealedCount >= displayNotation.length) return;
    const timer = setTimeout(() => setRevealedCount((c) => c + 1), 2000);
    return () => clearTimeout(timer);
  }, [revealedCount, displayNotation.length]);

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4">
      <h2 className="mb-6 text-lg font-semibold text-nm-text-primary">
        Now let&apos;s add the math notation
      </h2>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <AnimatePresence>
          {displayNotation.slice(0, revealedCount).map((tex, i) => {
            let html: string;
            try {
              html = katex.renderToString(tex, { throwOnError: false, displayMode: true });
            } catch {
              html = `<span>${tex}</span>`;
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="rounded-2xl bg-nm-bg-secondary border border-nm-accent-indigo/20 p-6 w-full text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          })}
        </AnimatePresence>
        {!allRevealed && (
          <div className="flex items-center gap-2 text-sm text-nm-text-muted">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
            Revealing notation...
          </div>
        )}
      </div>

      <motion.div
        className="absolute bottom-8 w-full max-w-sm px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={allRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        <Button size="lg" onClick={onComplete} disabled={!allRevealed} className="w-full">
          Continue
        </Button>
      </motion.div>
    </section>
  );
}
