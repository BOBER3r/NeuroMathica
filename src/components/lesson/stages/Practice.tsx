"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProblemCard } from "../ProblemCard";
import type { ProblemData } from "../types";

interface PracticeProps {
  problems: ProblemData[];
  onComplete: () => void;
}

export function Practice({ problems, onComplete }: PracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const total = problems.length;
  const current = problems[currentIndex];
  const progress = total > 0 ? ((currentIndex + (done ? 1 : 0)) / total) * 100 : 0;

  if (total === 0) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4">
        <p className="text-nm-text-secondary">No practice problems available.</p>
        <Button size="lg" onClick={onComplete} className="mt-6">Continue</Button>
      </section>
    );
  }

  if (done) {
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-nm-accent-emerald/10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--nm-accent-emerald)" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-nm-text-primary">Practice Complete!</h2>
        <p className="mb-6 text-nm-text-secondary">{correctCount}/{total} correct ({accuracy}%)</p>
        <Button size="lg" onClick={onComplete}>Continue</Button>
      </motion.section>
    );
  }

  return (
    <section className="flex flex-1 flex-col bg-nm-bg-primary px-4">
      <div className="mb-4 mt-2">
        <div className="mb-2 flex justify-between text-xs text-nm-text-muted">
          <span>Problem {currentIndex + 1} of {total}</span>
          <span>{correctCount} correct</span>
        </div>
        <ProgressBar value={progress} variant="default" size="sm" />
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            className="flex-1"
          >
            <ProblemCard
              problem={current}
              onSubmit={(_answer, correct) => {
                if (correct) setCorrectCount((c) => c + 1);
                setTimeout(() => {
                  if (currentIndex + 1 >= total) setDone(true);
                  else setCurrentIndex((i) => i + 1);
                }, 1200);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
