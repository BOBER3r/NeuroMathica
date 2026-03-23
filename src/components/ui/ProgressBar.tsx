"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ProgressBarVariant = "default" | "xp" | "streak" | "level";
type ProgressBarSize = "sm" | "md";

interface ProgressBarProps {
  /** Current progress value (0 to max). */
  value: number;
  /** Maximum value. Defaults to 100. */
  max?: number;
  variant?: ProgressBarVariant;
  showLabel?: boolean;
  size?: ProgressBarSize;
  className?: string;
}

const variantFillStyles: Record<ProgressBarVariant, string> = {
  default: "bg-nm-accent-indigo",
  xp: "bg-gradient-to-r from-nm-accent-indigo to-nm-accent-cyan",
  streak: "bg-nm-accent-amber",
  level: "bg-nm-accent-emerald",
};

const sizeTrackStyles: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
};

/**
 * Animated progress bar with themed variants for XP, streak, and level tracking.
 * Uses framer-motion for smooth width transitions.
 */
function ProgressBar({
  value,
  max = 100,
  variant = "default",
  showLabel = false,
  size = "md",
  className,
}: ProgressBarProps) {
  const clampedMax = Math.max(max, 1);
  const percentage = Math.min(Math.max((value / clampedMax) * 100, 0), 100);

  return (
    <div className={cn("w-full flex items-center gap-2", className)}>
      {/* Track */}
      <div
        className={cn(
          "flex-1 bg-nm-bg-surface rounded-full overflow-hidden",
          sizeTrackStyles[size],
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {/* Fill */}
        <motion.div
          className={cn(
            "h-full rounded-full",
            variantFillStyles[variant],
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <span className="text-xs font-medium text-nm-text-secondary tabular-nums whitespace-nowrap">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

export { ProgressBar };
export type { ProgressBarProps, ProgressBarVariant, ProgressBarSize };
