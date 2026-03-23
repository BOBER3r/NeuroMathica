"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type AchievementRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

interface AchievementCardProps {
  /** Achievement display name. */
  name: string;
  /** Short description of how to earn the achievement. */
  description: string;
  /** Achievement category (e.g. "mastery", "streak", "social"). */
  category: string;
  /** Rarity tier — determines border color. */
  rarity: string;
  /** Whether the student has unlocked this achievement. */
  unlocked: boolean;
  /** Timestamp of when it was unlocked. */
  unlockedAt?: Date;
  /** Partial progress toward unlocking (0-100). */
  progress?: number;
}

const rarityStyles: Record<
  AchievementRarity,
  { border: string; glow: string; label: string }
> = {
  common: {
    border: "border-nm-bg-elevated",
    glow: "",
    label: "text-nm-text-muted",
  },
  uncommon: {
    border: "border-nm-accent-emerald/40",
    glow: "",
    label: "text-nm-accent-emerald",
  },
  rare: {
    border: "border-nm-info/40",
    glow: "shadow-[0_0_8px_rgba(96,165,250,0.15)]",
    label: "text-nm-info",
  },
  epic: {
    border: "border-nm-accent-violet/50",
    glow: "shadow-[0_0_12px_rgba(167,139,250,0.2)]",
    label: "text-nm-accent-violet",
  },
  legendary: {
    border: "border-nm-accent-amber/60",
    glow: "shadow-[0_0_16px_rgba(251,191,36,0.25)]",
    label: "text-nm-accent-amber",
  },
};

function getRarityStyle(rarity: string) {
  return (
    rarityStyles[rarity as AchievementRarity] ?? rarityStyles.common
  );
}

/** Padlock SVG icon for locked achievements. */
function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/**
 * Achievement card with rarity-based styling, locked/unlocked states,
 * and optional partial-progress indication.
 */
function AchievementCard({
  name,
  description,
  category,
  rarity,
  unlocked,
  unlockedAt,
  progress,
}: AchievementCardProps) {
  const style = getRarityStyle(rarity);
  const showProgress = !unlocked && progress !== undefined && progress > 0;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border p-3",
        "bg-nm-bg-secondary",
        style.border,
        unlocked && style.glow,
        !unlocked && "grayscale opacity-70",
      )}
      whileHover={unlocked ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {/* Subtle shimmer on unlocked cards */}
      {unlocked && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "linear",
          }}
        />
      )}

      {/* Lock overlay for locked achievements */}
      {!unlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-nm-bg-primary/30">
          <LockIcon className="text-nm-text-muted" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-0 flex flex-col gap-1">
        {/* Name */}
        <h3 className="text-sm font-semibold text-nm-text-primary leading-tight">
          {name}
        </h3>

        {/* Description */}
        <p className="text-xs text-nm-text-secondary leading-snug">
          {description}
        </p>

        {/* Category + rarity */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-nm-text-muted">
            {category}
          </span>
          <span className={cn("text-[10px] font-semibold uppercase tracking-wider", style.label)}>
            {rarity}
          </span>
        </div>

        {/* Unlocked date */}
        {unlocked && unlockedAt && (
          <span className="text-[10px] text-nm-text-muted">
            Unlocked {unlockedAt.toLocaleDateString()}
          </span>
        )}

        {/* Progress bar for partial completion */}
        {showProgress && (
          <div className="mt-1.5">
            <div className="h-1 w-full overflow-hidden rounded-full bg-nm-bg-surface">
              <motion.div
                className="h-full rounded-full bg-nm-accent-indigo/60"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              />
            </div>
            <span className="mt-0.5 block text-right text-[10px] text-nm-text-muted tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { AchievementCard };
export type { AchievementCardProps, AchievementRarity };
