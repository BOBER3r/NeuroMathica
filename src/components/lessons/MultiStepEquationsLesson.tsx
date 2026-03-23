"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface MultiStepEquationsLessonProps {
  onComplete?: () => void;
}

type Stage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGE_ORDER: readonly Stage[] = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// SPRING & ANIMATION CONFIGS
// ═══════════════════════════════════════════════════════════════════════════

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// COLORS
// ═══════════════════════════════════════════════════════════════════════════

const C = {
  variable: "#a78bfa",
  variableFill: "#a78bfa33",
  constant: "#f59e0b",
  constantFill: "#f59e0b33",
  distribute: "#f59e0b",
  inverse: "#22d3ee",
  inverseFill: "#22d3ee33",
  solution: "#34d399",
  solutionFill: "#34d39933",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  success: "#34d399",
  error: "#f87171",
  errorFill: "#f8717133",
  primary: "#8b5cf6",
  primaryHover: "#7c3aed",
  border: "#334155",
  borderLight: "#475569",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function StageProgressDots({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === currentIndex ? 10 : 8,
            height: i === currentIndex ? 10 : 8,
            backgroundColor:
              i < currentIndex
                ? C.success
                : i === currentIndex
                  ? C.primary
                  : C.border,
            boxShadow:
              i === currentIndex ? `0 0 8px ${C.primary}80` : "none",
          }}
          aria-label={
            i < currentIndex
              ? `Stage ${i + 1}: completed`
              : i === currentIndex
                ? `Stage ${i + 1}: current`
                : `Stage ${i + 1}: upcoming`
          }
        />
      ))}
    </div>
  );
}

function ContinueButton({
  onClick,
  label = "Continue",
  disabled = false,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: disabled ? 0.4 : 1 }}
      transition={FADE}
      onClick={onClick}
      disabled={disabled}
      className="min-h-[48px] min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:pointer-events-none"
      style={{ backgroundColor: C.primary }}
      whileHover={disabled ? {} : { backgroundColor: C.primaryHover }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function MultiStepEquationsLesson({ onComplete }: MultiStepEquationsLessonProps) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGE_ORDER.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGE_ORDER[stageIdx + 1];
    if (next) setStage(next);
    else onComplete?.();
  }, [stageIdx, onComplete]);

  return (
    <div className="flex min-h-dvh flex-col" style={{ backgroundColor: C.bgPrimary }}>
      <StageProgressDots currentIndex={stageIdx} total={STAGE_ORDER.length} />
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={FADE}
          className="flex flex-1 flex-col"
        >
          {stage === "hook" && <HookStage onComplete={advance} />}
          {stage === "spatial" && <SpatialStage onComplete={advance} />}
          {stage === "discovery" && <DiscoveryStage onComplete={advance} />}
          {stage === "symbol" && <SymbolBridgeStage onComplete={advance} />}
          {stage === "realWorld" && <RealWorldStage onComplete={advance} />}
          {stage === "practice" && <PracticeStage onComplete={advance} />}
          {stage === "reflection" && <ReflectionStage onComplete={advance} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/MultiStepEquationsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1200));
    timers.push(setTimeout(() => setPhase(3), 2400));
    timers.push(setTimeout(() => setPhase(4), 3600));
    timers.push(setTimeout(() => setPhase(5), 4800));
    timers.push(setTimeout(() => setPhase(6), 5800));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="relative w-full" style={{ maxWidth: 640 }} aria-live="polite">
        {/* Distribution demo */}
        <AnimatePresence>
          {phase >= 1 && phase < 3 && (
            <motion.div
              key="distribute-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-center"
              style={{ fontSize: "clamp(24px, 6vw, 40px)", fontWeight: 700 }}
            >
              <span style={{ color: C.distribute }}>3</span>
              <span style={{ color: C.textMuted }}>(</span>
              <span style={{ color: C.variable }}>x</span>
              <span style={{ color: C.textMuted }}> + </span>
              <span style={{ color: C.constant }}>2</span>
              <span style={{ color: C.textMuted }}>)</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && phase < 4 && (
            <motion.div
              key="arrows"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-center"
              style={{ fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 700 }}
            >
              <span style={{ color: C.distribute }}>3</span>
              <span style={{ color: C.textMuted }}>{" \u00B7 "}</span>
              <span style={{ color: C.variable }}>x</span>
              <span style={{ color: C.textMuted }}>{" + "}</span>
              <span style={{ color: C.distribute }}>3</span>
              <span style={{ color: C.textMuted }}>{" \u00B7 "}</span>
              <span style={{ color: C.constant }}>2</span>
              <span style={{ color: C.textMuted }}>{" = "}</span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING_POP}
                style={{ color: C.variable }}
              >
                3x + 6
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && phase < 5 && (
            <motion.div
              key="combine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-center"
              style={{ fontSize: "clamp(18px, 4.5vw, 28px)", fontWeight: 700 }}
            >
              <span style={{ color: C.variable }}>3x</span>
              <span style={{ color: C.textMuted }}>{" + "}</span>
              <span style={{ color: C.constant }}>6</span>
              <span style={{ color: C.textMuted }}>{" + "}</span>
              <span style={{ color: C.variable }}>2x</span>
              <span style={{ color: C.textMuted }}>{" = 21 \u2192 "}</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING_POP, delay: 0.3 }}
                style={{ color: C.solution }}
              >
                5x + 6 = 21
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 5 && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
              style={{ color: C.textSecondary, fontSize: "clamp(16px, 4vw, 22px)" }}
            >
              Simplify. Gather. Solve. Layer by layer.
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 6 && (
          <div className="flex justify-center">
            <ContinueButton onClick={onComplete} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL
// ═══════════════════════════════════════════════════════════════════════════

interface EquationScenario {
  display: string;
  steps: readonly { label: string; button: string; nextEq: string }[];
  solution: number;
}

const EQUATION_SCENARIOS: readonly EquationScenario[] = [
  {
    display: "2(x + 3) + x = 15",
    steps: [
      { label: "Distribute the 2", button: "Distribute", nextEq: "2x + 6 + x = 15" },
      { label: "Combine like terms (2x + x)", button: "Combine", nextEq: "3x + 6 = 15" },
      { label: "Subtract 6 from both sides", button: "\u2212 6 both sides", nextEq: "3x = 9" },
      { label: "Divide both sides by 3", button: "\u00F7 3 both sides", nextEq: "x = 3" },
    ],
    solution: 3,
  },
  {
    display: "4x + 3 = 2x + 11",
    steps: [
      { label: "Subtract 2x from both sides", button: "\u2212 2x both sides", nextEq: "2x + 3 = 11" },
      { label: "Subtract 3 from both sides", button: "\u2212 3 both sides", nextEq: "2x = 8" },
      { label: "Divide both sides by 2", button: "\u00F7 2 both sides", nextEq: "x = 4" },
    ],
    solution: 4,
  },
  {
    display: "3(x \u2212 1) = 2x + 5",
    steps: [
      { label: "Distribute the 3", button: "Distribute", nextEq: "3x \u2212 3 = 2x + 5" },
      { label: "Subtract 2x from both sides", button: "\u2212 2x both sides", nextEq: "x \u2212 3 = 5" },
      { label: "Add 3 to both sides", button: "+ 3 both sides", nextEq: "x = 8" },
    ],
    solution: 8,
  },
] as const;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState(EQUATION_SCENARIOS[0]!.display);
  const [solvedCount, setSolvedCount] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [solved, setSolved] = useState(false);

  const scenario = EQUATION_SCENARIOS[scenarioIdx % EQUATION_SCENARIOS.length]!;
  const currentStep = scenario.steps[stepIdx];
  const canContinue = solvedCount >= 2 && interactions >= 8;

  const handleStep = useCallback(() => {
    if (!currentStep || solved) return;
    setInteractions((c) => c + 1);
    setCurrentDisplay(currentStep.nextEq);
    if (stepIdx < scenario.steps.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      setSolved(true);
      setSolvedCount((c) => c + 1);
    }
  }, [currentStep, solved, stepIdx, scenario.steps.length]);

  const handleNextEquation = useCallback(() => {
    setScenarioIdx((i) => i + 1);
    setStepIdx(0);
    setSolved(false);
    const nextScenario = EQUATION_SCENARIOS[(scenarioIdx + 1) % EQUATION_SCENARIOS.length]!;
    setCurrentDisplay(nextScenario.display);
  }, [scenarioIdx]);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Equation display */}
      <div
        className="mb-4 w-full rounded-2xl p-6 text-center"
        style={{ backgroundColor: C.bgSurface }}
      >
        <motion.p
          key={currentDisplay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono"
          style={{
            fontSize: "clamp(22px, 5.5vw, 36px)",
            fontWeight: 700,
            color: solved ? C.solution : C.textPrimary,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {currentDisplay}
        </motion.p>
      </div>

      {/* Step indicator */}
      {currentStep && !solved && (
        <motion.div
          key={stepIdx}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-lg px-4 py-2 text-center text-sm font-semibold"
          style={{ backgroundColor: C.inverseFill, color: C.inverse }}
        >
          {currentStep.label}
        </motion.div>
      )}

      {solved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SPRING_POP}
          className="mb-4 rounded-lg px-4 py-2 text-center text-sm font-semibold"
          style={{ backgroundColor: C.solutionFill, color: C.solution }}
        >
          {"Solved! x = "}{scenario.solution}
        </motion.div>
      )}

      {/* Action button */}
      {!solved && currentStep && (
        <motion.button
          onClick={handleStep}
          className="mb-4 min-h-[48px] min-w-[200px] rounded-xl px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: C.inverse, border: `2px solid ${C.inverse}` }}
          whileTap={{ scale: 0.95 }}
        >
          {currentStep.button}
        </motion.button>
      )}

      {solved && !canContinue && (
        <motion.button
          onClick={handleNextEquation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: C.bgSurface, border: `2px solid ${C.borderLight}`, color: C.textSecondary }}
          whileTap={{ scale: 0.95 }}
        >
          {"Next equation \u2192"}
        </motion.button>
      )}

      {/* Interaction progress */}
      <div className="mt-2 flex items-center gap-1 justify-center">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-colors duration-200"
            style={{
              width: 6,
              height: 6,
              backgroundColor: i < interactions ? C.primary : C.border,
            }}
          />
        ))}
      </div>

      {canContinue && (
        <div className="mt-4 flex justify-center">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  {
    text: "See 3(x + 2)? The 3 multiplies EVERYTHING inside the parentheses.",
    detail: "3 \u00B7 x = 3x and 3 \u00B7 2 = 6, so 3(x + 2) = 3x + 6",
    button: "I see it!",
  },
  {
    text: "After distributing: 3x + 6 + 2x. Notice 3x and 2x are 'like terms' \u2014 they both have x!",
    detail: "3x + 2x = 5x. Constants and variables don\u2019t mix.",
    button: "I see it!",
  },
  {
    text: "Variables on BOTH sides? Gather them! Subtract the smaller variable term from both sides.",
    detail: "4x + 3 = 2x + 11 \u2192 subtract 2x \u2192 2x + 3 = 11",
    button: "Got it!",
  },
  {
    text: "Strategy: Distribute first, combine like terms, then use inverse operations to isolate x.",
    detail: "Distribute \u2192 Combine \u2192 Inverse ops \u2192 Solution",
    button: "Got it!",
  },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const prompt = DISCOVERY_PROMPTS[promptIdx];

  const handleAck = useCallback(() => {
    if (promptIdx < DISCOVERY_PROMPTS.length - 1) {
      setPromptIdx((i) => i + 1);
    } else {
      onComplete();
    }
  }, [promptIdx, onComplete]);

  if (!prompt) return null;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <div className="mb-4 flex items-center gap-1 justify-center">
          {DISCOVERY_PROMPTS.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: i <= promptIdx ? C.primary : C.border,
              }}
            />
          ))}
        </div>

        <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: C.textPrimary }}>
            {prompt.text}
          </p>
          <p
            className="mb-6 rounded-lg px-4 py-3 font-mono text-sm"
            style={{ backgroundColor: C.bgPrimary, color: C.textSecondary }}
          >
            {prompt.detail}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleAck}
            className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white"
            style={{ backgroundColor: C.primary }}
            whileTap={{ scale: 0.95 }}
          >
            {prompt.button}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOL_STEPS = [
  { notation: "3(x + 2) = 3\u00B7x + 3\u00B72 = 3x + 6", description: "Distributive property: multiply each term inside" },
  { notation: "3x + 2x = 5x", description: "Combine like terms: same variable, add coefficients" },
  { notation: "4x + 3 = 2x + 11 \u2192 2x = 8", description: "Variables on both sides: subtract smaller variable term" },
  { notation: "x = 4  \u2713 verify: 4(4)+3=19, 2(4)+11=19 \u2713", description: "Solution + verification by substitution" },
] as const;

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < SYMBOL_STEPS.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 1800 * (i + 1)));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  const allRevealed = visibleCount >= SYMBOL_STEPS.length;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: "#7c3aed20", color: C.variable }}
        >
          Symbol Bridge
        </span>

        <div className="space-y-3">
          {SYMBOL_STEPS.map((_, i) => {
            const step = SYMBOL_STEPS[i]!;
            return i < visibleCount ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={SPRING}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{
                  backgroundColor: i === SYMBOL_STEPS.length - 1 ? C.solutionFill : C.bgPrimary,
                  border: `1px solid ${i === SYMBOL_STEPS.length - 1 ? C.solution : C.border}`,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: C.primary, color: "#fff" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: i === SYMBOL_STEPS.length - 1 ? C.solution : C.variable }}>
                    {step.notation}
                  </p>
                  <p className="text-xs" style={{ color: C.textMuted }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ) : null;
          })}
        </div>

        {allRevealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <p className="mb-4 text-center text-sm font-semibold" style={{ color: C.textSecondary }}>
              {"Distribute \u2192 Combine like terms \u2192 Isolate variable \u2192 Verify"}
            </p>
            <div className="flex justify-center">
              <ContinueButton onClick={onComplete} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL WORLD
// ═══════════════════════════════════════════════════════════════════════════

const REAL_WORLD_CARDS = [
  { title: "Cell Plans", icon: "\uD83D\uDCF1", example: "Plan A: $20 + $5/GB. Plan B: $10 + $8/GB. When equal?", math: "20 + 5x = 10 + 8x" },
  { title: "Savings Race", icon: "\uD83D\uDC37", example: "You: $50 + $15/week. Friend: $20 + $25/week.", math: "50 + 15x = 20 + 25x" },
  { title: "Perimeter", icon: "\uD83D\uDCCF", example: "Rectangle: length = 2w + 3, perimeter = 36", math: "2(2w + 3) + 2w = 36" },
  { title: "Tickets", icon: "\uD83C\uDFAB", example: "3 adult ($12 each) + child tickets ($8) = $56", math: "3(12) + 8x = 56" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <span className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: C.textMuted }}>
        Real World Connections
      </span>

      <div className="mb-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {REAL_WORLD_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: i * 0.15 }}
            className="rounded-xl p-4"
            style={{ backgroundColor: C.bgSurface, border: `1px solid ${C.border}` }}
          >
            <p className="mb-1 text-lg">{card.icon}</p>
            <p className="mb-1 text-sm font-semibold" style={{ color: C.textPrimary }}>
              {card.title}
            </p>
            <p className="mb-2 text-xs" style={{ color: C.textSecondary }}>
              {card.example}
            </p>
            <p className="font-mono text-xs" style={{ color: C.variable }}>
              {card.math}
            </p>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onComplete} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE
// ═══════════════════════════════════════════════════════════════════════════

interface PracticeProblem {
  layer: string;
  type: "mc" | "tf" | "numeric";
  prompt: string;
  options?: string[];
  answer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  { layer: "Recall", type: "mc", prompt: "What does 3(x + 4) expand to?", options: ["3x + 12", "3x + 4", "x + 12", "3x + 7"], answer: "3x + 12", feedback: "Distribute: 3\u00B7x + 3\u00B74 = 3x + 12." },
  { layer: "Recall", type: "mc", prompt: "Which are 'like terms': 5x, 3, 2x, 7?", options: ["5x and 2x", "5x and 3", "3 and 2x", "All of them"], answer: "5x and 2x", feedback: "Like terms have the same variable part. 5x and 2x both have x." },
  { layer: "Recall", type: "tf", prompt: "In 4x + 3 = 2x + 9, the first step is to divide by 4.", options: ["True", "False"], answer: "False", feedback: "False! First gather variables: subtract 2x from both sides." },
  { layer: "Procedure", type: "mc", prompt: "Solve: 2(x + 5) = 16", options: ["x = 3", "x = 5", "x = 8", "x = 11"], answer: "x = 3", feedback: "2x + 10 = 16. Then 2x = 6. Then x = 3." },
  { layer: "Procedure", type: "numeric", prompt: "Solve: 5x + 3 = 3x + 11. x = ?", answer: "4", feedback: "5x \u2212 3x = 11 \u2212 3. 2x = 8. x = 4." },
  { layer: "Procedure", type: "mc", prompt: "Solve: 3(x \u2212 2) = x + 6", options: ["x = 6", "x = 3", "x = 4", "x = 8"], answer: "x = 6", feedback: "3x \u2212 6 = x + 6. 2x = 12. x = 6." },
  { layer: "Understanding", type: "mc", prompt: "Why distribute BEFORE combining like terms?", options: ["Parentheses hide terms that might be combinable", "It makes the numbers smaller", "The textbook says so", "It doesn\u2019t matter what order"], answer: "Parentheses hide terms that might be combinable", feedback: "You can\u2019t see all like terms until parentheses are removed." },
  { layer: "Understanding", type: "mc", prompt: "Sam got x = 5 for 2x + 3 = x + 7. Check: is 2(5)+3 = 5+7?", options: ["13 = 12. No, incorrect!", "13 = 13. Yes, correct!", "10 = 12. No!", "13 = 10. No!"], answer: "13 = 12. No, incorrect!", feedback: "2(5)+3=13 but 5+7=12. They\u2019re not equal, so x=5 is wrong." },
  { layer: "Understanding", type: "mc", prompt: "Which equation has variables on both sides?", options: ["3x + 1 = x + 9", "2x + 5 = 17", "4(x + 2) = 20", "x + 8 = 15"], answer: "3x + 1 = x + 9", feedback: "x appears on both sides \u2014 gather variables to one side first." },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [numericValue, setNumericValue] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = PRACTICE_PROBLEMS[idx];
  const isLast = idx === PRACTICE_PROBLEMS.length - 1;

  const handleSelect = useCallback(
    (option: string) => {
      if (showFeedback) return;
      setSelected(option);
      setShowFeedback(true);
    },
    [showFeedback],
  );

  const handleNumericSubmit = useCallback(() => {
    if (showFeedback || !numericValue.trim()) return;
    setSelected(numericValue.trim());
    setShowFeedback(true);
  }, [showFeedback, numericValue]);

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete();
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setNumericValue("");
    setShowFeedback(false);
  }, [isLast, onComplete]);

  if (!problem) return null;

  const isCorrect = selected === problem.answer;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: C.primary + "30", color: C.primary }}>
            {problem.layer}
          </span>
          <span className="text-xs font-semibold" style={{ color: C.textMuted }}>
            {idx + 1}/{PRACTICE_PROBLEMS.length}
          </span>
        </div>

        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>
          {problem.prompt}
        </p>

        {problem.type === "mc" || problem.type === "tf" ? (
          <div className="mb-4 space-y-2">
            {(problem.options ?? []).map((opt) => {
              const optCorrect = opt === problem.answer;
              const optSelected = opt === selected;
              let bg: string = C.bgPrimary;
              let border: string = C.border;
              if (showFeedback && optSelected) {
                bg = optCorrect ? C.solutionFill : C.errorFill;
                border = optCorrect ? C.success : C.error;
              } else if (showFeedback && optCorrect) {
                bg = C.solutionFill;
                border = C.success;
              }
              return (
                <motion.button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={showFeedback}
                  className="min-h-[44px] w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed"
                  style={{ backgroundColor: bg, border: `2px solid ${border}`, color: C.textPrimary }}
                  whileTap={showFeedback ? {} : { scale: 0.98 }}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={numericValue}
              onChange={(e) => setNumericValue(e.target.value)}
              disabled={showFeedback}
              className="min-h-[44px] flex-1 rounded-lg px-4 py-2 text-sm font-mono disabled:opacity-50"
              style={{ backgroundColor: C.bgPrimary, border: `2px solid ${C.border}`, color: C.textPrimary }}
              placeholder="Your answer"
              aria-label="Numeric answer input"
            />
            {!showFeedback && (
              <motion.button
                onClick={handleNumericSubmit}
                className="min-h-[44px] min-w-[44px] rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: C.primary }}
                whileTap={{ scale: 0.95 }}
                aria-label="Submit answer"
              >
                Check
              </motion.button>
            )}
          </div>
        )}

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor: isCorrect ? C.solutionFill : C.errorFill,
                color: isCorrect ? C.success : C.error,
              }}
            >
              <p className="mb-1 font-semibold">{isCorrect ? "Correct!" : `Incorrect. Answer: ${problem.answer}`}</p>
              <p style={{ color: C.textSecondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showFeedback && (
          <div className="flex justify-center">
            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: C.primary }}
              whileTap={{ scale: 0.95 }}
            >
              {isLast ? "Complete" : "Next \u2192"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 7 — REFLECTION
// ═══════════════════════════════════════════════════════════════════════════

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    if (text.length >= 20) setSubmitted(true);
  }, [text]);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: "#7c3aed20", color: C.primary }}
        >
          Reflection
        </span>

        {!submitted ? (
          <>
            <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>
              What is the first thing you look for when solving a multi-step equation? Describe your strategy in order.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mb-2 min-h-[100px] w-full rounded-lg px-4 py-3 text-sm"
              style={{ backgroundColor: C.bgPrimary, border: `2px solid ${C.border}`, color: C.textPrimary, resize: "vertical" }}
              placeholder="Type your strategy..."
              aria-label="Reflection text"
            />

            <p className="mb-4 text-xs" style={{ color: text.length >= 20 ? C.success : C.textMuted }}>
              {text.length}/20 characters minimum
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={onComplete}
                className="min-h-[44px] px-4 py-2 text-sm"
                style={{ color: C.textDim }}
                aria-label="Skip reflection"
              >
                Skip
              </button>
              <motion.button
                onClick={handleSubmit}
                disabled={text.length < 20}
                className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: C.primary }}
                whileTap={text.length >= 20 ? { scale: 0.95 } : {}}
              >
                Submit
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            <p className="mb-4 text-lg font-semibold" style={{ color: C.success }}>
              Excellent strategy thinking!
            </p>
            <p className="mb-6 text-sm" style={{ color: C.textSecondary }}>
              Having a clear order of operations {"\u2014"} distribute, combine, isolate {"\u2014"} is the key to tackling any multi-step equation confidently.
            </p>
            <div className="flex justify-center">
              <ContinueButton onClick={onComplete} label="Complete Lesson" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
