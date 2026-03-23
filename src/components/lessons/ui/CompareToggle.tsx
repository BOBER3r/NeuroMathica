"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/lib/tokens/colors";

interface CompareToggleProps {
  /** Whether compare mode is currently active */
  active: boolean;
  /** Called when the user taps the toggle */
  onToggle: () => void;
  /** Label when active. Default: "Comparing..." */
  activeLabel?: string;
  /** Label when inactive. Default: "Compare" */
  inactiveLabel?: string;
  /** Accent color when active. Default: colors.accent.violet */
  accentColor?: string;
  className?: string;
}

/**
 * Toggle button for entering/exiting compare mode in interactive stages.
 * Placed in normal document flow (self-start) — NOT absolutely positioned.
 * Meets 44px touch-target (DR-5).
 */
export function CompareToggle({
  active,
  onToggle,
  activeLabel = "Comparing...",
  inactiveLabel = "Compare",
  accentColor = colors.accent.violet,
  className,
}: CompareToggleProps) {
  return (
    <motion.button
      className={cn(
        "self-start rounded-xl px-4 text-sm font-medium select-none",
        className,
      )}
      style={{
        minHeight: 44,
        backgroundColor: active ? accentColor : "rgba(255,255,255,0.1)",
        color: active ? "white" : colors.text.secondary,
        border: `1px solid ${active ? accentColor : "rgba(255,255,255,0.2)"}`,
      }}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
    >
      {active ? activeLabel : inactiveLabel}
    </motion.button>
  );
}
