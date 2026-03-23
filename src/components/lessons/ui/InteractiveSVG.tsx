"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface InteractiveSVGProps {
  /** SVG viewBox string (default "0 0 500 350") */
  viewBox?: string;
  /** SVG child elements */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Standard SVG canvas with consistent viewBox and responsive sizing.
 * Fills available width while maintaining aspect ratio.
 * Dark-themed background matching the app's visual language.
 */
export function InteractiveSVG({
  viewBox = "0 0 500 350",
  children,
  className,
  ariaLabel,
}: InteractiveSVGProps) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={ariaLabel ?? "Interactive math visualization"}
      className={cn(
        "w-full rounded-2xl bg-nm-bg-secondary",
        className,
      )}
      style={{ maxWidth: "100%" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

export type { InteractiveSVGProps };
