"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface XpDisplayProps {
  /** XP amount gained. */
  amount: number;
  /** Source label (e.g. "Lesson Complete", "Explanation Quality"). */
  source: string;
  /** Multiplier applied. Shows badge when > 1. */
  multiplier?: number;
  /** Reason the multiplier was applied (e.g. "Connection Maker"). */
  multiplierReason?: string;
  /** Called when the notification finishes its exit animation. */
  onDone?: () => void;
}

const AUTO_DISMISS_MS = 3_000;

/**
 * Animated XP-gain notification that slides up from the bottom of the viewport.
 * Auto-dismisses after 3 seconds with an exit animation. Uses Framer Motion
 * AnimatePresence for mount/unmount transitions.
 */
function XpDisplay({
  amount,
  source,
  multiplier = 1,
  multiplierReason,
  onDone,
}: XpDisplayProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone?.();
    }, AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [onDone]);

  const showMultiplier = multiplier > 1;

  return (
    <AnimatePresence onExitComplete={onDone}>
      <motion.div
        key="xp-display"
        className={cn(
          "fixed bottom-20 left-1/2 z-50 -translate-x-1/2",
          "pointer-events-none select-none",
        )}
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className={cn(
            "flex flex-col items-center gap-1 rounded-2xl px-6 py-3",
            "bg-nm-bg-secondary/90 backdrop-blur-md",
            "border border-nm-accent-indigo/30",
            "shadow-[0_0_24px_rgba(129,140,248,0.25)]",
          )}
        >
          {/* XP amount */}
          <motion.span
            className={cn(
              "text-3xl font-bold tabular-nums",
              "text-nm-accent-indigo",
              "drop-shadow-[0_0_8px_var(--nm-xp-glow)]",
            )}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", damping: 12 }}
          >
            +{amount} XP
          </motion.span>

          {/* Source label */}
          <span className="text-xs font-medium text-nm-text-secondary">
            {source}
          </span>

          {/* Multiplier badge */}
          {showMultiplier && (
            <motion.div
              className={cn(
                "mt-1 flex items-center gap-1.5 rounded-full",
                "bg-nm-accent-indigo/15 px-3 py-1",
              )}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <span className="text-sm font-bold text-nm-accent-cyan">
                &times;{multiplier.toFixed(1)}
              </span>
              {multiplierReason && (
                <span className="text-xs text-nm-text-secondary">
                  {multiplierReason}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export { XpDisplay };
export type { XpDisplayProps };
