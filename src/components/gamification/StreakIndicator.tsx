"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface StreakIndicatorProps {
  /** Current consecutive streak count. */
  currentStreak: number;
  /** Number of freeze-shields available. */
  shieldsAvailable: number;
  /** Streak mode label (e.g. "daily", "weekday"). */
  streakMode: string;
  /** Whether the student has completed their session today. */
  todayCompleted: boolean;
}

/** Inline SVG flame icon. */
function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 23c-4.97 0-9-3.13-9-7.5 0-3.17 2.36-5.84 4.5-7.43.42-.31 1.04-.04 1.08.49.12 1.53.78 3.17 2.02 3.93.15.09.34-.02.32-.2-.17-1.48.04-3.72 1.42-6.14a.65.65 0 0 1 1.14-.04c1.47 2.53 3.52 5.07 3.52 8.39v.5c0 .18.19.3.35.2A4.63 4.63 0 0 0 19 11.5c.05-.42.55-.58.82-.26C21.22 12.86 21 15.5 21 15.5c0 4.37-4.03 7.5-9 7.5z" />
    </svg>
  );
}

/** Inline SVG shield icon. */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
    </svg>
  );
}

/** Inline SVG checkmark icon. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Neural Pulse streak display.
 * Shows current streak count with a flame icon, shield count, and a green
 * checkmark when today's session is complete. The flame pulses continuously
 * when the streak is active (> 0 and today completed).
 */
function StreakIndicator({
  currentStreak,
  shieldsAvailable,
  streakMode,
  todayCompleted,
}: StreakIndicatorProps) {
  const isActive = currentStreak > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2",
        "bg-nm-accent-amber/10 border-nm-accent-amber/30",
      )}
      aria-label={`${currentStreak} day streak, ${streakMode} mode${todayCompleted ? ", today complete" : ""}`}
    >
      {/* Flame icon with pulse animation */}
      <motion.div
        className="text-nm-accent-amber"
        animate={
          isActive && todayCompleted
            ? {
                scale: [1, 1.15, 1],
                filter: [
                  "drop-shadow(0 0 4px rgba(251,191,36,0.4))",
                  "drop-shadow(0 0 10px rgba(251,191,36,0.7))",
                  "drop-shadow(0 0 4px rgba(251,191,36,0.4))",
                ],
              }
            : {}
        }
        transition={
          isActive && todayCompleted
            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <FlameIcon />
      </motion.div>

      {/* Streak count */}
      <span
        className={cn(
          "text-lg font-bold tabular-nums",
          isActive ? "text-nm-accent-amber" : "text-nm-text-muted",
        )}
      >
        {currentStreak}
      </span>

      {/* Today completed checkmark */}
      {todayCompleted && (
        <CheckIcon className="text-nm-success" />
      )}

      {/* Shield badge */}
      {shieldsAvailable > 0 && (
        <div
          className="flex items-center gap-0.5 rounded-full bg-nm-accent-cyan/15 px-1.5 py-0.5"
          aria-label={`${shieldsAvailable} streak shields`}
        >
          <ShieldIcon className="text-nm-accent-cyan" />
          <span className="text-[10px] font-bold text-nm-accent-cyan tabular-nums">
            {shieldsAvailable}
          </span>
        </div>
      )}
    </div>
  );
}

export { StreakIndicator };
export type { StreakIndicatorProps };
