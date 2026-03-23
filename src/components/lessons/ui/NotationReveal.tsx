"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface NotationItem {
  /** Text to display (plain readable text, NO raw LaTeX) */
  text: string;
  /** Optional accent color class, e.g. "text-nm-accent-cyan" */
  color?: string;
}

interface NotationRevealProps {
  /** Items revealed one at a time */
  items: NotationItem[];
  /** Delay between reveals in ms (default 1500) */
  delayMs?: number;
  /** Called when the user taps Continue after all items are shown */
  onComplete: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Auto-reveals mathematical notation one piece at a time with a fade-in.
 * Text is rendered as plain readable text (not raw LaTeX).
 * A Continue button appears after all items are revealed.
 */
export function NotationReveal({
  items,
  delayMs = 1500,
  onComplete,
}: NotationRevealProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const allRevealed = visibleCount >= items.length;

  useEffect(() => {
    if (allRevealed) return;

    timerRef.current = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, delayMs);

    return () => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    };
  }, [visibleCount, allRevealed, delayMs]);

  // Kick off the first reveal immediately on mount
  useEffect(() => {
    if (visibleCount === 0 && items.length > 0) {
      setVisibleCount(1);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6">
      {/* Notation items */}
      <div className="flex flex-col items-center gap-4">
        <AnimatePresence>
          {items.slice(0, visibleCount).map((item, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn(
                "text-xl font-semibold",
                item.color ?? "text-nm-text-primary",
              )}
            >
              {item.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* Continue button — appears after all revealed */}
      <AnimatePresence>
        {allRevealed && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className={cn(
              "min-h-[44px] min-w-[44px] rounded-2xl bg-nm-accent-indigo",
              "px-8 py-3.5 text-lg font-semibold text-white",
              "transition-all active:scale-95",
            )}
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export type { NotationItem, NotationRevealProps };
