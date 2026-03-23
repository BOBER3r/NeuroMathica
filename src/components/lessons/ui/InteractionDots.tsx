"use client";

import { colors } from "@/lib/tokens/colors";

interface InteractionDotsProps {
  /** Number of filled (completed) dots */
  count: number;
  /** Total dots to render */
  total: number;
  /** Color for the filled dots. Default: colors.accent.indigo */
  activeColor?: string;
}

/**
 * Small progress dots showing interaction completion (e.g. "3 of 5 explored").
 */
export function InteractionDots({
  count,
  total,
  activeColor = colors.accent.indigo,
}: InteractionDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="rounded-full transition-colors duration-200"
          style={{
            width: 6,
            height: 6,
            backgroundColor: i < count ? activeColor : colors.bg.elevated,
          }}
        />
      ))}
    </div>
  );
}
