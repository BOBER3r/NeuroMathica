"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ReflectionInputProps {
  /** Prompt displayed above the textarea */
  prompt: string;
  /** Minimum character length before submit is enabled (default 20) */
  minLength?: number;
  /** Called with the user's text (or empty string on skip) */
  onComplete: (text: string) => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const ENCOURAGEMENTS = [
  "Great reflection!",
  "Thoughtful answer!",
  "Nice thinking!",
  "Well said!",
];

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Standard reflection textarea with character counter, submit, and skip.
 * NOT graded — participation only. Shows encouraging feedback after submit.
 */
export function ReflectionInput({
  prompt,
  minLength = 20,
  onComplete,
}: ReflectionInputProps) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = text.trim().length >= minLength;

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setSubmitted(true);
  }, [canSubmit]);

  const handleSkip = useCallback(() => {
    onComplete("");
  }, [onComplete]);

  // Pick a deterministic encouragement based on text length
  const encouragement =
    ENCOURAGEMENTS[text.length % ENCOURAGEMENTS.length] ?? ENCOURAGEMENTS[0];

  // ── Post-submit view ──
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col items-center justify-center gap-6 px-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-nm-accent-emerald">
            {encouragement}
          </p>
          <p className="mt-2 text-sm text-nm-text-secondary">
            Your reflection has been saved.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onComplete(text)}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-2xl bg-nm-accent-indigo",
            "px-8 py-3.5 text-lg font-semibold text-white",
            "transition-all active:scale-95",
          )}
        >
          Complete Lesson
        </button>
      </motion.div>
    );
  }

  // ── Input view ──
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-6">
      {/* Prompt */}
      <p className="text-lg font-medium leading-relaxed text-nm-text-primary">
        {prompt}
      </p>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Write your thoughts here..."
          className={cn(
            "w-full resize-none rounded-xl border border-nm-bg-surface bg-nm-bg-secondary",
            "p-4 text-sm text-nm-text-primary placeholder:text-nm-text-muted",
            "focus:border-nm-accent-indigo focus:outline-none focus:ring-1 focus:ring-nm-accent-indigo/50",
          )}
        />
        {/* Character counter */}
        <span
          className={cn(
            "absolute bottom-3 right-3 text-xs tabular-nums",
            canSubmit ? "text-nm-accent-emerald" : "text-nm-text-muted",
          )}
        >
          {text.trim().length}/{minLength}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleSkip}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-xl px-4 py-2 text-sm",
            "text-nm-text-muted transition-all hover:text-nm-text-secondary",
            "active:scale-95",
          )}
        >
          Skip
        </button>

        <AnimatePresence>
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            animate={{ opacity: canSubmit ? 1 : 0.4 }}
            className={cn(
              "min-h-[44px] min-w-[44px] rounded-xl bg-nm-accent-indigo",
              "px-6 py-2.5 text-sm font-semibold text-white",
              "transition-all active:scale-95",
              !canSubmit && "cursor-not-allowed opacity-50",
            )}
          >
            Submit
          </motion.button>
        </AnimatePresence>
      </div>
    </div>
  );
}

export type { ReflectionInputProps };
