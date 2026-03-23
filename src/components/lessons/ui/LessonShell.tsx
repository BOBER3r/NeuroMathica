"use client";

import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface LessonShellProps {
  /** Lesson title, e.g. "GE-4.1 Angles" */
  title: string;
  /** Stage identifiers in order */
  stages: string[];
  /** Render-prop receiving current stage key and advance callback */
  children: (stage: string, advance: () => void) => ReactNode;
  /** Fired after the last stage completes */
  onComplete?: () => void;
}

// ─── Animation variants ─────────────────────────────────────────────────────

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

// ─── Stage dot colors ───────────────────────────────────────────────────────

const STAGE_COLORS: Record<string, string> = {
  hook: "bg-nm-accent-indigo",
  spatial: "bg-nm-accent-cyan",
  discovery: "bg-nm-accent-emerald",
  symbol: "bg-nm-accent-amber",
  realWorld: "bg-nm-accent-rose",
  practice: "bg-nm-accent-violet",
  reflection: "bg-nm-accent-indigo",
};

// ─── Component ──────────────────────────────────────────────────────────────

export function LessonShell({
  title,
  stages,
  children,
  onComplete,
}: LessonShellProps) {
  const [stageIdx, setStageIdx] = useState(0);
  const currentStage = stages[stageIdx] ?? stages[0] ?? "hook";

  const advance = useCallback(() => {
    setStageIdx((prev) => {
      const next = prev + 1;
      if (next >= stages.length) {
        onComplete?.();
        return prev;
      }
      return next;
    });
  }, [stages.length, onComplete]);

  return (
    <div className="flex min-h-dvh flex-col bg-nm-bg-primary">
      {/* ── Progress header ── */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-nm-bg-surface/20 bg-nm-bg-primary/90 px-4 py-3 backdrop-blur-sm">
        <span className="text-sm font-medium text-nm-text-primary">
          {title}
        </span>

        <div className="flex items-center gap-2">
          {/* Stage dots */}
          <div className="flex items-center gap-1.5">
            {stages.map((s, i) => {
              const color = STAGE_COLORS[s] ?? "bg-nm-accent-indigo";
              const done = i < stageIdx;
              const active = i === stageIdx;
              return (
                <div
                  key={s}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    done && color,
                    active && cn(color, "ring-2 ring-white/30 scale-125"),
                    !done && !active && "bg-nm-bg-surface",
                  )}
                />
              );
            })}
          </div>

          {/* Counter */}
          <span className="ml-1 text-xs tabular-nums text-nm-text-secondary">
            {stageIdx + 1}/{stages.length}
          </span>
        </div>
      </header>

      {/* ── Stage content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={SPRING}
          className="flex flex-1 flex-col"
        >
          {children(currentStage, advance)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
