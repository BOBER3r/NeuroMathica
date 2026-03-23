"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface RationalOpsLessonProps {
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
  positive: "#34d399",
  positiveFill: "#34d39933",
  negative: "#f87171",
  negativeFill: "#f8717133",
  fraction: "#a78bfa",
  fractionFill: "#a78bfa33",
  decimal: "#60a5fa",
  decimalFill: "#60a5fa33",
  operation: "#f59e0b",
  operationFill: "#f59e0b33",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  success: "#34d399",
  error: "#f87171",
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

export function RationalOpsLesson({ onComplete }: RationalOpsLessonProps) {
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
  return <VideoHook src="/videos/RationalOpsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1200));
    timers.push(setTimeout(() => setPhase(3), 2400));
    timers.push(setTimeout(() => setPhase(4), 3600));
    timers.push(setTimeout(() => setPhase(5), 5000));
    timers.push(setTimeout(() => setPhase(6), 6000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="relative w-full" style={{ maxWidth: 640 }} aria-live="polite">
        <AnimatePresence>
          {phase >= 1 && phase < 4 && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8 flex justify-center gap-4"
            >
              {["0.5", "\u00BD", `${"\u2212"}(${"\u2212"}\u00BD)`].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ ...SPRING, delay: i * 0.3 }}
                  className="rounded-xl px-5 py-4 text-center"
                  style={{
                    backgroundColor: C.bgSurface,
                    border: `2px solid ${C.fraction}`,
                    fontSize: "clamp(20px, 5vw, 32px)",
                    fontWeight: 700,
                    color: C.fraction,
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && phase < 4 && (
            <motion.p
              key="same-value"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-center italic"
              style={{ color: C.textPrimary, fontSize: "clamp(18px, 4.5vw, 28px)" }}
            >
              Same value. Different disguises.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && phase < 5 && (
            <motion.div
              key="add-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-center"
              style={{ color: C.textPrimary, fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 700 }}
            >
              <span style={{ color: C.fraction }}>{"\u00BD"}</span>
              <span style={{ color: C.operation }}>{" + "}</span>
              <span style={{ color: C.decimal }}>0.25</span>
              <span style={{ color: C.textMuted }}>{" = "}</span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING_POP, delay: 0.5 }}
                style={{ color: C.positive }}
              >
                {"\u00BE"}
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
              Mix fractions, decimals, negatives {"\u2014"} one set of rules.
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

interface SpatialProblem {
  left: string;
  op: string;
  right: string;
  answer: string;
  options: string[];
}

const SPATIAL_PROBLEMS: readonly SpatialProblem[] = [
  { left: "-3/4", op: "+", right: "1/2", answer: "-1/4", options: ["-1/4", "1/4", "-5/4", "1/2"] },
  { left: "1.5", op: "+", right: "-0.75", answer: "0.75", options: ["0.75", "2.25", "-0.75", "0.25"] },
  { left: "1/2", op: "\u2212", right: "3/4", answer: "-1/4", options: ["-1/4", "1/4", "5/4", "-1/2"] },
  { left: "-0.5", op: "\u2212", right: "0.25", answer: "-0.75", options: ["-0.75", "-0.25", "0.75", "0.25"] },
  { left: "-1/2", op: "\u00D7", right: "2/3", answer: "-1/3", options: ["-1/3", "1/3", "-2/6", "2/3"] },
  { left: "0.5", op: "\u00D7", right: "-4", answer: "-2", options: ["-2", "2", "-0.5", "4.5"] },
  { left: "3/4", op: "\u00F7", right: "1/2", answer: "3/2", options: ["3/2", "3/8", "1/2", "2/3"] },
  { left: "-1", op: "\u00F7", right: "0.25", answer: "-4", options: ["-4", "4", "-0.25", "0.75"] },
] as const;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = SPATIAL_PROBLEMS[problemIdx % SPATIAL_PROBLEMS.length]!;
  const canContinue = solvedCount >= 6 && interactions >= 8;

  const shuffledOptions = useMemo(() => {
    const opts = [...problem.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j]!, opts[i]!];
    }
    return opts;
  }, [problem]);

  const handleSelect = useCallback(
    (option: string) => {
      if (showFeedback) return;
      setSelected(option);
      setShowFeedback(true);
      setInteractions((c) => c + 1);
      if (option === problem.answer) {
        setSolvedCount((c) => c + 1);
      }
    },
    [showFeedback, problem.answer],
  );

  const handleNext = useCallback(() => {
    setSelected(null);
    setShowFeedback(false);
    setProblemIdx((i) => i + 1);
  }, []);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Problem display */}
      <div
        className="mb-6 w-full rounded-2xl p-6 text-center"
        style={{ backgroundColor: C.bgSurface }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: C.textMuted }}>
          Compute
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: "clamp(24px, 6vw, 40px)",
            fontWeight: 700,
            color: C.textPrimary,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ color: C.fraction }}>{problem.left}</span>
          <span style={{ color: C.operation }}>{` ${problem.op} `}</span>
          <span style={{ color: C.decimal }}>{problem.right}</span>
          <span style={{ color: C.textMuted }}>{" = ?"}</span>
        </p>
      </div>

      {/* Answer options */}
      <div className="mb-4 grid w-full grid-cols-2 gap-3">
        {shuffledOptions.map((option) => {
          const isCorrect = option === problem.answer;
          const isSelected = option === selected;
          let bg: string = C.bgSurface;
          let borderColor: string = C.borderLight;
          if (showFeedback && isSelected) {
            bg = isCorrect ? C.positiveFill : C.negativeFill;
            borderColor = isCorrect ? C.positive : C.negative;
          } else if (showFeedback && isCorrect) {
            bg = C.positiveFill;
            borderColor = C.positive;
          }
          return (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={showFeedback}
              className="min-h-[48px] rounded-xl px-4 py-3 text-lg font-semibold transition-colors disabled:cursor-not-allowed"
              style={{
                backgroundColor: bg,
                border: `2px solid ${borderColor}`,
                color: showFeedback && isCorrect ? C.positive : C.textPrimary,
                fontVariantNumeric: "tabular-nums",
              }}
              whileTap={showFeedback ? {} : { scale: 0.95 }}
              aria-label={`Answer: ${option}`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 w-full rounded-lg px-4 py-3 text-center text-sm font-semibold"
            style={{
              backgroundColor: selected === problem.answer ? C.positiveFill : C.negativeFill,
              color: selected === problem.answer ? C.positive : C.negative,
            }}
          >
            {selected === problem.answer
              ? "Correct!"
              : `Not quite. The answer is ${problem.answer}.`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next / Continue */}
      {showFeedback && !canContinue && (
        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: C.bgSurface, border: `2px solid ${C.borderLight}`, color: C.textSecondary }}
          whileTap={{ scale: 0.95 }}
        >
          {"Next \u2192"}
        </motion.button>
      )}

      {/* Progress dots */}
      <div className="mt-4 flex items-center gap-1 justify-center">
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
    text: "Watch: positive \u00D7 positive = positive. Negative \u00D7 positive = negative.",
    detail: "The sign tells you the direction. One negative flips the direction once.",
    button: "I see it!",
  },
  {
    text: "Now: negative \u00D7 negative = positive! Reversing a reversal goes forward.",
    detail: "(\u22122) \u00D7 (\u22123) = +6. Two flips = back to start.",
    button: "I see it!",
  },
  {
    text: "For fractions: to add 1/3 + 1/4, we need the same size pieces.",
    detail: "Convert: 4/12 + 3/12 = 7/12. Common denominator = same size pieces.",
    button: "I see it!",
  },
  {
    text: "Dividing by 1/2 means: how many halves fit? 3 \u00F7 1/2 = 6!",
    detail: "Six halves fit inside 3 wholes. Dividing by a fraction gives MORE, not less.",
    button: "Got it!",
  },
  {
    text: "Shortcut: dividing by a fraction = multiplying by its reciprocal (flip).",
    detail: "3/4 \u00F7 1/2 = 3/4 \u00D7 2/1 = 6/4 = 3/2",
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
  { notation: "a/b + c/d = (ad + bc) / bd", description: "Adding fractions: common denominator" },
  { notation: "a/b \u00D7 c/d = ac / bd", description: "Multiplying: multiply across" },
  { notation: "a/b \u00F7 c/d = a/b \u00D7 d/c", description: "Dividing: flip and multiply" },
  { notation: "(\u2212a) \u00D7 (\u2212b) = +ab", description: "Negative \u00D7 negative = positive" },
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
          style={{ backgroundColor: "#7c3aed20", color: C.fraction }}
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
                style={{ backgroundColor: C.bgPrimary, border: `1px solid ${C.border}` }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: C.primary, color: "#fff" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: C.fraction }}>
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
              Convert to common form, apply the operation, simplify.
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
  { title: "Temperature", icon: "\uD83C\uDF21\uFE0F", example: "It was \u22123.5\u00B0C and dropped 2\u00BE degrees", math: "\u22123.5 + (\u22122.75) = \u22126.25" },
  { title: "Cooking", icon: "\uD83E\uDD63", example: "Recipe needs \u2154 cup, making 1\u00BD batches", math: "2/3 \u00D7 3/2 = 1 cup" },
  { title: "Money", icon: "\uD83D\uDCB0", example: "Owe $4.50, pay back half", math: "\u22124.50 \u00F7 2 = \u22122.25 remaining" },
  { title: "Elevation", icon: "\u26F0\uFE0F", example: "Submarine at \u2212120m rises \u2153 of that", math: "\u2212120 \u00D7 1/3 = \u221240m" },
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
            <p className="font-mono text-xs" style={{ color: C.fraction }}>
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
  { layer: "Recall", type: "mc", prompt: "What is \u22123 \u00D7 (\u22124)?", options: ["12", "\u221212", "7", "\u22127"], answer: "12", feedback: "Negative \u00D7 negative = positive. 3 \u00D7 4 = 12." },
  { layer: "Recall", type: "mc", prompt: "What is 1/2 + 1/3?", options: ["5/6", "2/5", "1/5", "3/2"], answer: "5/6", feedback: "Common denominator 6: 3/6 + 2/6 = 5/6." },
  { layer: "Recall", type: "tf", prompt: "Dividing by \u00BD gives a smaller number.", options: ["True", "False"], answer: "False", feedback: "False! Dividing by \u00BD doubles the number. 6 \u00F7 \u00BD = 12." },
  { layer: "Procedure", type: "mc", prompt: "Compute: \u22122/3 + 5/6", options: ["1/6", "\u22121/6", "7/6", "3/6"], answer: "1/6", feedback: "\u22124/6 + 5/6 = 1/6. Convert to common denominator first." },
  { layer: "Procedure", type: "numeric", prompt: "Compute: \u22120.75 \u00D7 4 = ?", answer: "-3", feedback: "\u22120.75 \u00D7 4 = \u22123. Negative \u00D7 positive = negative." },
  { layer: "Procedure", type: "mc", prompt: "Compute: 3/4 \u00F7 1/2", options: ["3/2", "3/8", "1/2", "2/3"], answer: "3/2", feedback: "3/4 \u00D7 2/1 = 6/4 = 3/2. Flip and multiply!" },
  { layer: "Understanding", type: "mc", prompt: "Why do we need common denominators to add fractions?", options: ["So the pieces are the same size", "To make the numbers bigger", "Because the rule says so", "To eliminate denominators"], answer: "So the pieces are the same size", feedback: "We can only combine pieces of equal size \u2014 that\u2019s what common denominators ensure." },
  { layer: "Understanding", type: "mc", prompt: "Why does negative \u00D7 negative = positive?", options: ["Reversing a reversal returns to the original direction", "Because two negatives cancel out the signs", "The rule is arbitrary", "Negatives become positive when multiplied"], answer: "Reversing a reversal returns to the original direction", feedback: "Each negative flips direction. Two flips = back to start = positive." },
  { layer: "Understanding", type: "mc", prompt: "Which gives the largest result: 6 \u00F7 2, 6 \u00F7 1, or 6 \u00F7 \u00BD?", options: ["6 \u00F7 \u00BD = 12", "6 \u00F7 1 = 6", "6 \u00F7 2 = 3", "They are all equal"], answer: "6 \u00F7 \u00BD = 12", feedback: "Dividing by a smaller number gives a larger result. 6 \u00F7 \u00BD = 12." },
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
        {/* Progress */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: C.primary + "30", color: C.primary }}>
            {problem.layer}
          </span>
          <span className="text-xs font-semibold" style={{ color: C.textMuted }}>
            {idx + 1}/{PRACTICE_PROBLEMS.length}
          </span>
        </div>

        {/* Question */}
        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>
          {problem.prompt}
        </p>

        {/* Options */}
        {problem.type === "mc" || problem.type === "tf" ? (
          <div className="mb-4 space-y-2">
            {(problem.options ?? []).map((opt) => {
              const optCorrect = opt === problem.answer;
              const optSelected = opt === selected;
              let bg: string = C.bgPrimary;
              let border: string = C.border;
              if (showFeedback && optSelected) {
                bg = optCorrect ? C.positiveFill : C.negativeFill;
                border = optCorrect ? C.positive : C.negative;
              } else if (showFeedback && optCorrect) {
                bg = C.positiveFill;
                border = C.positive;
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
                {"Check"}
              </motion.button>
            )}
          </div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor: isCorrect ? C.positiveFill : C.negativeFill,
                color: isCorrect ? C.positive : C.negative,
              }}
            >
              <p className="mb-1 font-semibold">{isCorrect ? "Correct!" : `Incorrect. Answer: ${problem.answer}`}</p>
              <p style={{ color: C.textSecondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next button */}
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
    if (text.length >= 20) {
      setSubmitted(true);
    }
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
              A friend says &quot;dividing always makes numbers smaller.&quot; Explain why this isn&apos;t true using an example with fractions.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mb-2 min-h-[100px] w-full rounded-lg px-4 py-3 text-sm"
              style={{ backgroundColor: C.bgPrimary, border: `2px solid ${C.border}`, color: C.textPrimary, resize: "vertical" }}
              placeholder="Type your explanation..."
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
              Great thinking!
            </p>
            <p className="mb-6 text-sm" style={{ color: C.textSecondary }}>
              Your reflection helps strengthen your understanding. Dividing by fractions less than 1 actually gives a larger result {"\u2014"} a concept that surprises many people!
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
