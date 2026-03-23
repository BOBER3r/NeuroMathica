"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Problem {
  id: string;
}

interface PracticeShellProps {
  /** Array of problems to work through */
  problems: Problem[];
  /** Render callback for each problem */
  renderProblem: (
    problem: Problem,
    onAnswer: (correct: boolean) => void,
  ) => React.ReactNode;
  /** Called when all problems are completed */
  onComplete: () => void;
}

// ─── Animation ──────────────────────────────────────────────────────────────

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Wraps practice problems with progress tracking and "Next" navigation.
 * Shows a summary screen at the end with a score.
 */
export function PracticeShell({
  problems,
  renderProblem,
  onComplete,
}: PracticeShellProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const total = problems.length;
  const currentProblem = problems[currentIdx];

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (answered) return;
      setAnswered(true);
      if (correct) setCorrectCount((c) => c + 1);
    },
    [answered],
  );

  const handleNext = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= total) {
      setShowSummary(true);
    } else {
      setCurrentIdx(nextIdx);
      setAnswered(false);
    }
  }, [currentIdx, total]);

  // ── Summary screen ──
  if (showSummary) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING}
        className="flex flex-1 flex-col items-center justify-center gap-6 px-4"
      >
        <div className="text-center">
          <p className="text-4xl font-bold text-nm-text-primary">
            {correctCount}/{total}
          </p>
          <p className="mt-2 text-sm text-nm-text-secondary">
            problems correct
          </p>
        </div>
        <button
          type="button"
          onClick={onComplete}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-2xl bg-nm-accent-indigo",
            "px-8 py-3.5 text-lg font-semibold text-white",
            "transition-all active:scale-95",
          )}
        >
          Continue
        </button>
      </motion.div>
    );
  }

  // ── Problem view ──
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-nm-text-primary">
          Problem {currentIdx + 1} of {total}
        </span>
        <span className="text-xs tabular-nums text-nm-text-secondary">
          {correctCount} correct
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-nm-bg-surface">
        <motion.div
          className="h-full rounded-full bg-nm-accent-indigo"
          animate={{ width: `${((currentIdx + (answered ? 1 : 0)) / total) * 100}%` }}
          transition={SPRING}
        />
      </div>

      {/* Problem content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProblem?.id ?? currentIdx}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={SPRING}
          className="flex flex-1 flex-col"
        >
          {currentProblem && renderProblem(currentProblem, handleAnswer)}
        </motion.div>
      </AnimatePresence>

      {/* Next button — visible only after answering */}
      <div className="mt-4 flex justify-end">
        {answered && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className={cn(
              "min-h-[44px] min-w-[44px] rounded-xl bg-nm-accent-indigo",
              "px-6 py-2.5 text-sm font-semibold text-white",
              "transition-all active:scale-95",
            )}
          >
            {"Next →"}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export type { Problem, PracticeShellProps };
