"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface MCQuestionProps {
  /** The question text */
  question: string;
  /** Answer option strings (3-4 items) */
  options: string[];
  /** Zero-based index of the correct option */
  correctIndex: number;
  /** Explanation shown after the user answers */
  explanation?: string;
  /** Callback with whether the selected answer was correct */
  onAnswer: (correct: boolean) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Standard multiple-choice question with immediate feedback.
 * Correct option turns green, incorrect turns red, correct answer is always highlighted.
 * No auto-advance — parent controls navigation via PracticeShell.
 */
export function MCQuestion({
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
}: MCQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = useCallback(
    (idx: number) => {
      if (submitted) return;
      setSelected(idx);
    },
    [submitted],
  );

  const handleSubmit = useCallback(() => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    onAnswer(selected === correctIndex);
  }, [selected, submitted, correctIndex, onAnswer]);

  return (
    <div className="flex flex-col gap-4">
      {/* Question text */}
      <p className="text-lg font-medium leading-relaxed text-nm-text-primary">
        {question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => {
          const isCorrect = idx === correctIndex;
          const isSelected = idx === selected;
          const showCorrect = submitted && isCorrect;
          const showIncorrect = submitted && isSelected && !isCorrect;

          return (
            <motion.button
              key={idx}
              type="button"
              whileTap={submitted ? undefined : { scale: 0.97 }}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={cn(
                "min-h-[44px] w-full rounded-xl border px-4 py-3 text-left text-sm",
                "transition-all duration-150",
                // Default state
                !submitted &&
                  !isSelected &&
                  "border-nm-bg-surface bg-nm-bg-secondary text-nm-text-primary hover:border-nm-accent-indigo/50",
                // Selected (pre-submit)
                !submitted &&
                  isSelected &&
                  "border-nm-accent-indigo bg-nm-accent-indigo/10 text-nm-text-primary",
                // Correct answer (post-submit)
                showCorrect &&
                  "border-nm-success bg-nm-success/15 text-nm-success",
                // Incorrect selection (post-submit)
                showIncorrect &&
                  "border-nm-error bg-nm-error/15 text-nm-error",
                // Other options after submit (not selected, not correct)
                submitted &&
                  !isCorrect &&
                  !isSelected &&
                  "border-nm-bg-surface/50 bg-nm-bg-secondary/50 text-nm-text-muted opacity-60",
              )}
            >
              <span className="mr-2 font-semibold">
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Submit button */}
      {!submitted && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: selected !== null ? 1 : 0.4 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className={cn(
            "min-h-[44px] min-w-[44px] self-end rounded-xl bg-nm-accent-indigo",
            "px-6 py-2.5 text-sm font-semibold text-white",
            "transition-all active:scale-95",
            selected === null && "cursor-not-allowed opacity-50",
          )}
        >
          Submit
        </motion.button>
      )}

      {/* Explanation */}
      {submitted && explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-xl bg-nm-bg-surface/30 p-4"
        >
          <p className="text-sm leading-relaxed text-nm-text-secondary">
            {explanation}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export type { MCQuestionProps };
