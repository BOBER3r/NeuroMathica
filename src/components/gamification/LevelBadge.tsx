"use client";

import { cn } from "@/lib/utils/cn";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface LevelBadgeProps {
  /** Current level number. */
  level: number;
  /** Tier display name (e.g. "Synapse"). */
  tierName: string;
  /** Progress to next level as a percentage (0-100). */
  progressPercent: number;
  /** Compact mode shows only the level number in a circle. */
  compact?: boolean;
}

/**
 * Tier-color palette keyed by tier name.
 * Matches the 10-tier gamification system.
 */
const tierColors: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  Spark:         { text: "text-nm-text-secondary", bg: "bg-nm-bg-surface",       border: "border-nm-bg-elevated",     glow: "" },
  Signal:        { text: "text-nm-info",           bg: "bg-nm-info/10",          border: "border-nm-info/30",         glow: "" },
  Synapse:       { text: "text-nm-accent-cyan",    bg: "bg-nm-accent-cyan/10",   border: "border-nm-accent-cyan/30",  glow: "" },
  Circuit:       { text: "text-nm-accent-emerald", bg: "bg-nm-accent-emerald/10",border: "border-nm-accent-emerald/30",glow: "" },
  Network:       { text: "text-nm-accent-indigo",  bg: "bg-nm-accent-indigo/10", border: "border-nm-accent-indigo/30",glow: "shadow-[0_0_12px_rgba(129,140,248,0.2)]" },
  Cortex:        { text: "text-nm-accent-violet",  bg: "bg-nm-accent-violet/10", border: "border-nm-accent-violet/30",glow: "shadow-[0_0_12px_rgba(167,139,250,0.2)]" },
  Hemisphere:    { text: "text-nm-accent-rose",    bg: "bg-nm-accent-rose/10",   border: "border-nm-accent-rose/30",  glow: "shadow-[0_0_12px_rgba(251,113,133,0.2)]" },
  Resonance:     { text: "text-nm-accent-amber",   bg: "bg-nm-accent-amber/10",  border: "border-nm-accent-amber/30", glow: "shadow-[0_0_12px_rgba(251,191,36,0.25)]" },
  Architect:     { text: "text-nm-accent-cyan",    bg: "bg-nm-accent-cyan/10",   border: "border-nm-accent-cyan/40",  glow: "shadow-[0_0_16px_rgba(34,211,238,0.3)]" },
  Transcendent:  { text: "text-nm-accent-amber",   bg: "bg-nm-accent-amber/15",  border: "border-nm-accent-amber/50", glow: "shadow-[0_0_20px_rgba(251,191,36,0.35)]" },
};

function getTierStyle(tierName: string) {
  return tierColors[tierName] ?? tierColors["Spark"]!;
}

/**
 * Displays the current tier + level + progress toward the next level.
 * Supports a compact mode that renders only the level number inside a circle.
 */
function LevelBadge({
  level,
  tierName,
  progressPercent,
  compact = false,
}: LevelBadgeProps) {
  const style = getTierStyle(tierName);

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center",
          "h-8 w-8 rounded-full border text-xs font-bold",
          style.bg,
          style.border,
          style.text,
          style.glow,
        )}
        aria-label={`Level ${level} ${tierName}`}
      >
        {level}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-xl border px-3 py-2",
        style.bg,
        style.border,
        style.glow,
      )}
    >
      {/* Tier + level label */}
      <div className="flex items-baseline gap-1.5">
        <span className={cn("text-sm font-semibold", style.text)}>
          {tierName}
        </span>
        <span className="text-lg font-bold text-nm-text-primary tabular-nums">
          {level}
        </span>
      </div>

      {/* Progress bar to next level */}
      <ProgressBar value={progressPercent} variant="level" size="sm" />
    </div>
  );
}

export { LevelBadge };
export type { LevelBadgeProps };
