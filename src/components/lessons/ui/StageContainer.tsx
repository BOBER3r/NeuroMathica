"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface StageContainerProps {
  children: ReactNode;
  /** Max width preset: sm=384, md=448, lg=512, xl=640 */
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// ─── Width mapping ──────────────────────────────────────────────────────────

const MAX_WIDTH: Record<string, string> = {
  sm: "max-w-[384px]",
  md: "max-w-[448px]",
  lg: "max-w-[512px]",
  xl: "max-w-[640px]",
};

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Standard container for any stage content.
 * Centers vertically, constrains width, adds consistent padding.
 */
export function StageContainer({
  children,
  maxWidth = "lg",
  className,
}: StageContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-4 py-6",
        "w-full mx-auto",
        MAX_WIDTH[maxWidth],
        className,
      )}
    >
      {children}
    </div>
  );
}
