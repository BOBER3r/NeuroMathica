"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface InequalitiesLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TOKEN ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.surface;
const BORDER_LIGHT = colors.bg.elevated;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;
const SPRING_POP = springs.pop;
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC THEME
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  solution: colors.accent.cyan,
  solutionFill: colors.accent.cyan + "33",
  boundary: "#f59e0b",
  boundaryFill: "#f59e0b33",
  flip: "#f87171",
  flipFill: "#f8717133",
  variable: colors.accent.violet,
  variableFill: colors.accent.violet + "33",
  successFill: colors.functional.success + "33",
  errorFill: colors.functional.error + "33",
  textLight: "#e2e8f0",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function InequalitiesLesson({ onComplete }: InequalitiesLessonProps) {
  return (
    <LessonShell title="AL-4.1 Inequalities" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onComplete={advance} />;
          case "spatial": return <SpatialStage onComplete={advance} />;
          case "discovery": return <DiscoveryStage onComplete={advance} />;
          case "symbol": return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld": return <RealWorldStage onComplete={advance} />;
          case "practice": return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={advance} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/InequalitiesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1400));
    timers.push(setTimeout(() => setPhase(3), 2800));
    timers.push(setTimeout(() => setPhase(4), 4200));
    timers.push(setTimeout(() => setPhase(5), 5400));
    timers.push(setTimeout(() => setPhase(6), 6400));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Number line constants
  const NL_W = 500;
  const NL_ML = 60;
  const NL_MR = 40;
  const NL_LW = NL_W - NL_ML - NL_MR;
  const NL_Y = 100;
  const NL_MIN = -1;
  const NL_MAX = 8;

  const valToX = (v: number) => NL_ML + ((v - NL_MIN) / (NL_MAX - NL_MIN)) * NL_LW;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="relative w-full" style={{ maxWidth: 640 }} aria-live="polite">
        {/* Phase 1: x = 3 with a single dot */}
        <AnimatePresence>
          {phase >= 1 && phase < 3 && (
            <motion.div key="eq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p
                className="mb-4 text-center font-mono"
                style={{ fontSize: "clamp(24px, 6vw, 40px)", fontWeight: 700, color: THEME.variable }}
              >
                x = 3
              </p>
              <svg viewBox={`0 0 ${NL_W} 160`} className="mx-auto w-full" style={{ maxWidth: 500 }}>
                <line x1={NL_ML} y1={NL_Y} x2={NL_W - NL_MR} y2={NL_Y} stroke={BORDER_LIGHT} strokeWidth={2} />
                {Array.from({ length: NL_MAX - NL_MIN + 1 }, (_, i) => {
                  const v = NL_MIN + i;
                  const x = valToX(v);
                  return (
                    <g key={v}>
                      <line x1={x} y1={NL_Y - 6} x2={x} y2={NL_Y + 6} stroke={BORDER_LIGHT} strokeWidth={2} />
                      <text x={x} y={NL_Y + 22} textAnchor={"middle" as const} fill={TEXT_SEC} fontSize={12}>{v}</text>
                    </g>
                  );
                })}
                <motion.circle
                  cx={valToX(3)}
                  cy={NL_Y}
                  r={8}
                  fill={THEME.variable}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2-3: x > 3 with a ray */}
        <AnimatePresence>
          {phase >= 2 && phase < 5 && (
            <motion.div key="ineq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p
                className="mb-4 text-center font-mono"
                style={{ fontSize: "clamp(24px, 6vw, 40px)", fontWeight: 700, color: THEME.solution }}
              >
                {phase >= 4 ? "x < 3" : "x > 3"}
              </p>
              <svg viewBox={`0 0 ${NL_W} 160`} className="mx-auto w-full" style={{ maxWidth: 500 }}>
                <line x1={NL_ML} y1={NL_Y} x2={NL_W - NL_MR} y2={NL_Y} stroke={BORDER_LIGHT} strokeWidth={2} />
                {Array.from({ length: NL_MAX - NL_MIN + 1 }, (_, i) => {
                  const v = NL_MIN + i;
                  const x = valToX(v);
                  return (
                    <g key={v}>
                      <line x1={x} y1={NL_Y - 6} x2={x} y2={NL_Y + 6} stroke={BORDER_LIGHT} strokeWidth={2} />
                      <text x={x} y={NL_Y + 22} textAnchor={"middle" as const} fill={TEXT_SEC} fontSize={12}>{v}</text>
                    </g>
                  );
                })}
                {/* Ray */}
                <motion.line
                  x1={valToX(3)}
                  y1={NL_Y}
                  x2={phase >= 4 ? NL_ML : NL_W - NL_MR}
                  y2={NL_Y}
                  stroke={THEME.solution}
                  strokeWidth={4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                {/* Open circle at boundary */}
                <circle cx={valToX(3)} cy={NL_Y} r={7} fill={BG} stroke={THEME.boundary} strokeWidth={3} />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: "Not one answer" */}
        <AnimatePresence>
          {phase >= 3 && phase < 5 && (
            <motion.p
              key="many"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center"
              style={{ color: THEME.textLight, fontSize: "clamp(16px, 4vw, 22px)" }}
            >
              Not one answer {"\u2014"} infinitely many!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Phase 5: tagline */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
              style={{ color: THEME.textLight, fontSize: "clamp(18px, 4.5vw, 26px)" }}
            >
              Welcome to inequalities.
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 6 && (
          <ContinueButton onClick={onComplete} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL
// ═══════════════════════════════════════════════════════════════════════════

interface InequalityProblem {
  inequality: string;
  options: string[];
  answer: string;
  boundaryValue: number;
  direction: "left" | "right";
  closed: boolean;
  flip: boolean;
}

const INEQUALITY_PROBLEMS: readonly InequalityProblem[] = [
  { inequality: "x + 3 > 7", options: ["x > 4", "x > 7", "x < 4", "x > 10"], answer: "x > 4", boundaryValue: 4, direction: "right", closed: false, flip: false },
  { inequality: "x \u2212 2 \u2264 5", options: ["x \u2264 7", "x \u2264 3", "x \u2265 7", "x < 5"], answer: "x \u2264 7", boundaryValue: 7, direction: "left", closed: true, flip: false },
  { inequality: "2x < 10", options: ["x < 5", "x < 10", "x > 5", "x \u2264 5"], answer: "x < 5", boundaryValue: 5, direction: "left", closed: false, flip: false },
  { inequality: "x + 1 \u2265 4", options: ["x \u2265 3", "x > 4", "x \u2265 5", "x < 3"], answer: "x \u2265 3", boundaryValue: 3, direction: "right", closed: true, flip: false },
  { inequality: "\u2212x > 2", options: ["x < \u22122", "x > 2", "x > \u22122", "x < 2"], answer: "x < \u22122", boundaryValue: -2, direction: "left", closed: false, flip: true },
  { inequality: "\u22122x \u2264 6", options: ["x \u2265 \u22123", "x \u2264 \u22123", "x \u2265 3", "x \u2264 3"], answer: "x \u2265 \u22123", boundaryValue: -3, direction: "right", closed: true, flip: true },
] as const;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = INEQUALITY_PROBLEMS[problemIdx % INEQUALITY_PROBLEMS.length]!;
  const canContinue = correctCount >= 4 && interactions >= 6;

  // Number line setup
  const NL_W = 480;
  const NL_ML = 50;
  const NL_MR = 30;
  const NL_LW = NL_W - NL_ML - NL_MR;
  const NL_Y = 60;
  const rangeMin = Math.min(problem.boundaryValue - 4, -5);
  const rangeMax = Math.max(problem.boundaryValue + 4, 9);
  const valToX = (v: number) => NL_ML + ((v - rangeMin) / (rangeMax - rangeMin)) * NL_LW;

  const handleSelect = useCallback(
    (option: string) => {
      if (showFeedback) return;
      setSelected(option);
      setShowFeedback(true);
      setInteractions((c) => c + 1);
      if (option === problem.answer) {
        setCorrectCount((c) => c + 1);
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
      {/* Inequality display */}
      <div
        className="mb-4 w-full rounded-2xl bg-nm-bg-secondary p-5 text-center"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: TEXT_SEC }}>
          Solve the inequality
        </p>
        <p
          className="font-mono"
          style={{ fontSize: "clamp(22px, 5.5vw, 36px)", fontWeight: 700, color: TEXT, fontVariantNumeric: "tabular-nums" }}
        >
          {problem.inequality}
        </p>
        {problem.flip && (
          <p className="mt-1 text-xs font-semibold" style={{ color: THEME.flip }}>
            Watch out {"\u2014"} negative coefficient!
          </p>
        )}
      </div>

      {/* Number line (shows solution after correct answer) */}
      {showFeedback && selected === problem.answer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-4 w-full"
        >
          <svg viewBox={`0 0 ${NL_W} 100`} className="mx-auto w-full" style={{ maxWidth: 480 }} aria-label={`Number line showing ${problem.answer}`}>
            <line x1={NL_ML} y1={NL_Y} x2={NL_W - NL_MR} y2={NL_Y} stroke={BORDER_LIGHT} strokeWidth={2} />
            {Array.from({ length: rangeMax - rangeMin + 1 }, (_, i) => {
              const v = rangeMin + i;
              const x = valToX(v);
              return (
                <g key={v}>
                  <line x1={x} y1={NL_Y - 5} x2={x} y2={NL_Y + 5} stroke={BORDER_LIGHT} strokeWidth={1.5} />
                  <text x={x} y={NL_Y + 18} textAnchor={"middle" as const} fill={TEXT_SEC} fontSize={10}>{v}</text>
                </g>
              );
            })}
            {/* Shaded region */}
            <motion.line
              x1={valToX(problem.boundaryValue)}
              y1={NL_Y}
              x2={problem.direction === "right" ? NL_W - NL_MR : NL_ML}
              y2={NL_Y}
              stroke={THEME.solution}
              strokeWidth={5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* Boundary circle */}
            <circle
              cx={valToX(problem.boundaryValue)}
              cy={NL_Y}
              r={6}
              fill={problem.closed ? THEME.boundary : BG}
              stroke={THEME.boundary}
              strokeWidth={2.5}
            />
          </svg>
        </motion.div>
      )}

      {/* Options */}
      <div className="mb-4 grid w-full grid-cols-2 gap-3">
        {problem.options.map((opt) => {
          const isCorrect = opt === problem.answer;
          const isSelected = opt === selected;
          let bg: string = SURFACE;
          let borderColor: string = BORDER_LIGHT;
          if (showFeedback && isSelected) {
            bg = isCorrect ? THEME.successFill : THEME.errorFill;
            borderColor = isCorrect ? SUCCESS : ERROR;
          } else if (showFeedback && isCorrect) {
            bg = THEME.successFill;
            borderColor = SUCCESS;
          }
          return (
            <motion.button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={showFeedback}
              className="min-h-[48px] rounded-xl px-4 py-3 font-mono text-base font-semibold transition-colors disabled:cursor-not-allowed"
              style={{ backgroundColor: bg, border: `2px solid ${borderColor}`, color: TEXT }}
              whileTap={showFeedback ? {} : { scale: 0.95 }}
              aria-label={`Answer: ${opt}`}
            >
              {opt}
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
              backgroundColor: selected === problem.answer ? THEME.successFill : THEME.errorFill,
              color: selected === problem.answer ? SUCCESS : ERROR,
            }}
          >
            {selected === problem.answer
              ? `Correct! ${problem.closed ? "Closed" : "Open"} circle, shade ${problem.direction}.${problem.flip ? " Sign flipped!" : ""}`
              : `Not quite. The answer is ${problem.answer}.`}
          </motion.div>
        )}
      </AnimatePresence>

      {showFeedback && !canContinue && (
        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: SURFACE, border: `2px solid ${BORDER_LIGHT}`, color: THEME.textLight }}
          whileTap={{ scale: 0.95 }}
        >
          {"Next \u2192"}
        </motion.button>
      )}

      {/* Progress */}
      <div className="mt-4">
        <InteractionDots count={interactions} total={6} activeColor={PRIMARY} />
      </div>

      {canContinue && (
        <ContinueButton onClick={onComplete} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  {
    text: "An equation x + 3 = 7 has ONE answer: x = 4. But x + 3 > 7 has MANY answers: 4.1, 5, 10, 100...",
    detail: "Inequality solutions are ranges, not single points.",
    button: "I see it!",
  },
  {
    text: "The circle at the boundary tells you: OPEN = not included (< or >), CLOSED = included (\u2264 or \u2265).",
    detail: "x > 3: open circle at 3. x \u2265 3: closed circle at 3.",
    button: "I see it!",
  },
  {
    text: "Watch: 2 < 5. Multiply both by \u22121: \u22122 ? \u22125. Which is bigger?",
    detail: "\u22122 > \u22125! Negative multiplication REVERSED the order!",
    button: "I see it!",
  },
  {
    text: "\u22122 > \u22125! Multiplying by a negative FLIPPED the order. So we must flip the inequality sign too.",
    detail: "If a < b, then \u2212a > \u2212b. Always.",
    button: "Got it!",
  },
  {
    text: "Rule: multiply or divide both sides by a NEGATIVE \u2192 flip the inequality sign.",
    detail: "This is the ONE difference between equations and inequalities.",
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-4">
          <InteractionDots count={promptIdx + 1} total={DISCOVERY_PROMPTS.length} activeColor={PRIMARY} />
        </div>

        <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: TEXT }}>
            {prompt.text}
          </p>
          <p
            className="mb-6 rounded-lg bg-nm-bg-primary px-4 py-3 font-mono text-sm"
            style={{ color: THEME.textLight }}
          >
            {prompt.detail}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleAck}
            className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white"
            style={{ backgroundColor: PRIMARY }}
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
  { notation: "x + 3 > 7 \u2192 x > 4", description: "Subtract 3: no flip needed" },
  { notation: "2x \u2264 10 \u2192 x \u2264 5", description: "Divide by +2: no flip needed" },
  { notation: "\u2212x > 3 \u2192 x < \u22123", description: "Divide by \u22121: FLIP the sign!" },
  { notation: "Open \u25CB = not included | Closed \u25CF = included", description: "Circle type matches strict vs non-strict" },
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: PRIMARY + "20", color: THEME.variable }}
        >
          Symbol Bridge
        </span>

        <div className="space-y-3">
          {SYMBOL_STEPS.map((_, i) => {
            const step = SYMBOL_STEPS[i]!;
            const isFlip = i === 2;
            return i < visibleCount ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={SPRING}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{
                  backgroundColor: isFlip ? THEME.flipFill : BG,
                  border: `1px solid ${isFlip ? THEME.flip : BORDER}`,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: isFlip ? THEME.flip : PRIMARY, color: "#fff" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: isFlip ? THEME.flip : THEME.solution }}>
                    {step.notation}
                  </p>
                  <p className="text-xs" style={{ color: TEXT_SEC }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ) : null;
          })}
        </div>

        {allRevealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <p className="mb-4 text-center text-sm font-semibold" style={{ color: THEME.textLight }}>
              Solve like equations. Flip the sign when multiplying/dividing by negative.
            </p>
            <ContinueButton onClick={onComplete} />
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
  { title: "Roller Coaster", icon: "\uD83C\uDFA2", example: "Must be at least 48 inches tall", math: "h \u2265 48" },
  { title: "Budget", icon: "\uD83D\uDCB0", example: "Spend less than $50 on books at $8 each", math: "8x < 50" },
  { title: "Speed Limit", icon: "\uD83D\uDE97", example: "Drive no more than 65 mph", math: "s \u2264 65" },
  { title: "Temperature", icon: "\uD83C\uDF21\uFE0F", example: "Water freezes below 0\u00B0C", math: "t < 0" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <span className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: TEXT_SEC }}>
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
            style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
          >
            <p className="mb-1 text-lg">{card.icon}</p>
            <p className="mb-1 text-sm font-semibold" style={{ color: TEXT }}>
              {card.title}
            </p>
            <p className="mb-2 text-xs" style={{ color: THEME.textLight }}>
              {card.example}
            </p>
            <p className="font-mono text-xs" style={{ color: THEME.solution }}>
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
  type: "mc" | "tf";
  prompt: string;
  options: string[];
  answer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  { layer: "Recall", type: "mc", prompt: "What does the open circle mean on a number line?", options: ["The boundary value is NOT included", "The boundary value IS included", "The solution is at that point", "There is no solution"], answer: "The boundary value is NOT included", feedback: "Open circle = strict inequality (< or >). The point itself is not a solution." },
  { layer: "Recall", type: "mc", prompt: "When do you flip the inequality sign?", options: ["When multiplying or dividing by a negative", "When adding a negative", "When subtracting", "Always when solving"], answer: "When multiplying or dividing by a negative", feedback: "Only negative multiplication/division reverses order, requiring a sign flip." },
  { layer: "Recall", type: "tf", prompt: "x > 5 means x could equal 5.", options: ["True", "False"], answer: "False", feedback: "False! > means strictly greater. x = 5 is not included (open circle)." },
  { layer: "Procedure", type: "mc", prompt: "Solve: x + 4 > 9", options: ["x > 5", "x > 13", "x < 5", "x > 4"], answer: "x > 5", feedback: "Subtract 4: x > 5. No flip needed (subtraction, not negative multiplication)." },
  { layer: "Procedure", type: "mc", prompt: "Solve: \u22123x \u2264 12", options: ["x \u2265 \u22124", "x \u2264 \u22124", "x \u2265 4", "x \u2264 4"], answer: "x \u2265 \u22124", feedback: "Divide by \u22123 AND flip: x \u2265 \u22124. Divide by negative = flip!" },
  { layer: "Procedure", type: "mc", prompt: "Solve: 2x \u2212 1 \u2265 7", options: ["x \u2265 4", "x \u2265 3", "x > 4", "x \u2264 4"], answer: "x \u2265 4", feedback: "Add 1: 2x \u2265 8. Divide by 2: x \u2265 4. No flip (divided by positive)." },
  { layer: "Understanding", type: "mc", prompt: "Why does \u22122 > \u22125 even though 2 < 5?", options: ["Negatives reverse order on the number line", "Because \u22122 is closer to zero", "Because 2 and 5 are positive", "It doesn\u2019t \u2014 they\u2019re equal"], answer: "Negatives reverse order on the number line", feedback: "On a number line, \u22122 is to the RIGHT of \u22125, so \u22122 is greater." },
  { layer: "Understanding", type: "mc", prompt: "How many solutions does x > 3 have?", options: ["Infinitely many", "One (x = 4)", "Three", "None"], answer: "Infinitely many", feedback: "Every number greater than 3 is a solution: 3.001, 4, 100, 1000000..." },
  { layer: "Understanding", type: "mc", prompt: "Graph of x \u2264 2: which direction is shaded?", options: ["Left (toward smaller numbers)", "Right (toward bigger numbers)", "Both directions", "Neither \u2014 just a point"], answer: "Left (toward smaller numbers)", feedback: "x \u2264 2 includes all numbers less than or equal to 2, so shade LEFT." },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
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

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete();
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setShowFeedback(false);
  }, [isLast, onComplete]);

  if (!problem) return null;

  const isCorrect = selected === problem.answer;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: PRIMARY + "30", color: PRIMARY }}>
            {problem.layer}
          </span>
          <span className="text-xs font-semibold" style={{ color: TEXT_SEC }}>
            {idx + 1}/{PRACTICE_PROBLEMS.length}
          </span>
        </div>

        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>
          {problem.prompt}
        </p>

        <div className="mb-4 space-y-2">
          {problem.options.map((opt) => {
            const optCorrect = opt === problem.answer;
            const optSelected = opt === selected;
            let bg: string = BG;
            let border: string = BORDER;
            if (showFeedback && optSelected) {
              bg = optCorrect ? THEME.successFill : THEME.errorFill;
              border = optCorrect ? SUCCESS : ERROR;
            } else if (showFeedback && optCorrect) {
              bg = THEME.successFill;
              border = SUCCESS;
            }
            return (
              <motion.button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={showFeedback}
                className="min-h-[44px] w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed"
                style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }}
                whileTap={showFeedback ? {} : { scale: 0.98 }}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor: isCorrect ? THEME.successFill : THEME.errorFill,
                color: isCorrect ? SUCCESS : ERROR,
              }}
            >
              <p className="mb-1 font-semibold">{isCorrect ? "Correct!" : `Incorrect. Answer: ${problem.answer}`}</p>
              <p style={{ color: THEME.textLight }}>{problem.feedback}</p>
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
              style={{ backgroundColor: PRIMARY }}
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: PRIMARY + "20", color: PRIMARY }}
        >
          Reflection
        </span>

        {!submitted ? (
          <>
            <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>
              Explain to a friend WHY the inequality sign flips when you multiply both sides by a negative number. Use the number line to help your explanation.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mb-2 min-h-[100px] w-full rounded-lg bg-nm-bg-primary px-4 py-3 text-sm"
              style={{ border: `2px solid ${BORDER}`, color: TEXT, resize: "vertical" }}
              placeholder="Type your explanation..."
              aria-label="Reflection text"
            />

            <p className="mb-4 text-xs" style={{ color: text.length >= 20 ? SUCCESS : TEXT_SEC }}>
              {text.length}/20 characters minimum
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={onComplete}
                className="min-h-[44px] px-4 py-2 text-sm"
                style={{ color: MUTED }}
                aria-label="Skip reflection"
              >
                Skip
              </button>
              <motion.button
                onClick={handleSubmit}
                disabled={text.length < 20}
                className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: PRIMARY }}
                whileTap={text.length >= 20 ? { scale: 0.95 } : {}}
              >
                Submit
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            <p className="mb-4 text-lg font-semibold" style={{ color: SUCCESS }}>
              Great explanation!
            </p>
            <p className="mb-6 text-sm" style={{ color: THEME.textLight }}>
              Understanding WHY the sign flips {"\u2014"} not just that it does {"\u2014"} is what separates real understanding from memorization. Negatives reverse order on the number line!
            </p>
            <ContinueButton onClick={onComplete} label="Complete Lesson" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
