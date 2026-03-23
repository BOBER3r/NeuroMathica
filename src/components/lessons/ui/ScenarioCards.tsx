"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Scenario {
  /** Card title */
  title: string;
  /** Description text */
  description: string;
  /** Optional emoji or icon character */
  icon?: string;
  /** Optional highlighted math text */
  highlight?: string;
}

interface ScenarioCardsProps {
  /** Array of real-world scenarios */
  scenarios: Scenario[];
  /** Called when the user is done browsing */
  onComplete: () => void;
}

// ─── Animation ──────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
    },
  }),
};

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Displays real-world scenario cards for Stage 5 (Real World Anchor).
 * Cards stagger-animate in and a Continue button is always visible.
 */
export function ScenarioCards({ scenarios, onComplete }: ScenarioCardsProps) {
  return (
    <div className="flex flex-1 flex-col px-4 py-6">
      {/* Cards — vertical stack (scrollable on small screens) */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {scenarios.map((scenario, idx) => (
          <motion.div
            key={scenario.title}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "rounded-2xl border border-nm-bg-surface/20 bg-nm-bg-secondary p-5",
            )}
          >
            {/* Icon + Title row */}
            <div className="flex items-center gap-3">
              {scenario.icon && (
                <span className="text-2xl" role="img" aria-hidden="true">
                  {scenario.icon}
                </span>
              )}
              <h3 className="text-base font-semibold text-nm-text-primary">
                {scenario.title}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed text-nm-text-secondary">
              {scenario.description}
            </p>

            {/* Highlighted math */}
            {scenario.highlight && (
              <p className="mt-3 text-sm font-semibold text-nm-accent-cyan">
                {scenario.highlight}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Continue — always visible */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onComplete}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-2xl bg-nm-accent-indigo",
            "px-8 py-3.5 text-lg font-semibold text-white",
            "transition-all active:scale-95",
          )}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export type { Scenario, ScenarioCardsProps };
