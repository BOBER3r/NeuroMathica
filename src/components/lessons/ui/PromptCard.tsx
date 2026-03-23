"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PromptCardProps {
  /** The discovery prompt text */
  text: string;
  /** Button label — defaults to "I see it!" */
  buttonText?: string;
  /** Called when the user acknowledges the prompt */
  onAcknowledge: () => void;
  /** Optional visual content rendered inside the card */
  children?: ReactNode;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * A discovery prompt card with text and an acknowledgment button.
 * Fades up on mount for visual delight.
 */
export function PromptCard({
  text,
  buttonText = "I see it!",
  onAcknowledge,
  children,
}: PromptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={cn(
        "w-full rounded-2xl bg-nm-bg-secondary p-6",
        "border border-nm-bg-surface/20",
      )}
    >
      {/* Prompt text */}
      <p className="text-base leading-relaxed text-nm-text-primary">{text}</p>

      {/* Optional child content */}
      {children && <div className="mt-4">{children}</div>}

      {/* Acknowledge button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onAcknowledge}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-xl bg-nm-accent-indigo",
            "px-6 py-2.5 text-sm font-semibold text-white",
            "transition-all active:scale-95",
          )}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}
