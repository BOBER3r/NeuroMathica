"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";

interface ContinueButtonProps {
  onClick: () => void;
  /** Button label — accepts string or ReactNode. Default: "Continue" */
  children?: ReactNode;
  /** Alias for children (string only). Prefer children for ReactNode content. */
  label?: string;
  /** Fade-in delay in seconds. Default: 0 */
  delay?: number;
  disabled?: boolean;
  /** Accent color for the button background. Default: colors.accent.indigo */
  color?: string;
  className?: string;
}

/**
 * Standard "Continue" / advance button used across lesson stages.
 * Fades up on mount, meets 44px touch-target (DR-5).
 */
export function ContinueButton({
  onClick,
  children,
  label,
  delay = 0,
  disabled = false,
  color = colors.accent.indigo,
  className,
}: ContinueButtonProps) {
  const content = children ?? label ?? "Continue";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.gentle, delay }}
      className="flex w-full justify-center pt-4 pb-8"
    >
      <motion.button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={cn(
          "min-h-[48px] min-w-[160px] rounded-xl px-8 py-3",
          "text-base font-semibold text-white select-none",
          "hover:brightness-110 active:brightness-95",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-[filter] duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-accent-indigo",
          className,
        )}
        style={{ backgroundColor: color }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
      >
        {content}
      </motion.button>
    </motion.div>
  );
}
