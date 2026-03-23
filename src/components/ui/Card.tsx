"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: CardPadding;
  interactive?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

/**
 * Container card with dark theme styling.
 * Supports padding options and an interactive hover state.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    padding = "md",
    interactive = false,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-nm-bg-secondary rounded-2xl border border-nm-bg-surface/20",
        paddingStyles[padding],
        interactive &&
          "hover:border-nm-accent-indigo/30 transition-colors cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export { Card };
export type { CardProps, CardPadding };
