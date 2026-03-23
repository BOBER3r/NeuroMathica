"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface DataDisplaysLessonProps {
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
  bar1: "#818cf8",
  bar2: "#f59e0b",
  bar3: "#34d399",
  bar4: "#f87171",
  line: "#22d3ee",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  success: "#34d399",
  successFill: "#34d39933",
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

function StageProgressDots({ currentIndex, total }: { currentIndex: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === currentIndex ? 10 : 8,
            height: i === currentIndex ? 10 : 8,
            backgroundColor: i < currentIndex ? C.success : i === currentIndex ? C.primary : C.border,
            boxShadow: i === currentIndex ? `0 0 8px ${C.primary}80` : "none",
          }}
          aria-label={i < currentIndex ? `Stage ${i + 1}: completed` : i === currentIndex ? `Stage ${i + 1}: current` : `Stage ${i + 1}: upcoming`}
        />
      ))}
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue", disabled = false }: { onClick: () => void; label?: string; disabled?: boolean }) {
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

export function DataDisplaysLesson({ onComplete }: DataDisplaysLessonProps) {
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
        <motion.div key={stage} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={FADE} className="flex flex-1 flex-col">
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
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1600));
    timers.push(setTimeout(() => setPhase(3), 3000));
    timers.push(setTimeout(() => setPhase(4), 4400));
    timers.push(setTimeout(() => setPhase(5), 5600));
    timers.push(setTimeout(() => setPhase(6), 6400));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const barColors = [C.bar1, C.bar2, C.bar3, C.bar4];
  const barData = [
    { label: "Apple", value: 12 },
    { label: "Banana", value: 8 },
    { label: "Orange", value: 6 },
    { label: "Grape", value: 4 },
  ];
  const maxVal = 12;
  const barW = 50;
  const barGap = 20;
  const chartH = 120;
  const chartY = 160;
  const chartX = 120;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="relative w-full" style={{ maxWidth: 640 }} aria-live="polite">
        {/* Phase 1: Data table */}
        <AnimatePresence>
          {phase >= 1 && phase < 3 && (
            <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-6 mx-auto" style={{ maxWidth: 300 }}>
              <p className="mb-2 text-center text-sm font-semibold" style={{ color: C.textMuted }}>Favorite Fruit Survey</p>
              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                {barData.map((d, i) => (
                  <div key={d.label} className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: i % 2 === 0 ? C.bgSurface : C.bgPrimary }}>
                    <span className="text-sm" style={{ color: C.textPrimary }}>{d.label}</span>
                    <span className="font-mono text-sm font-semibold" style={{ color: barColors[i] }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Bar graph */}
        <AnimatePresence>
          {phase >= 2 && phase < 4 && (
            <motion.div key="bar-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <svg viewBox="0 0 480 200" className="mx-auto w-full" style={{ maxWidth: 480 }} aria-label="Bar graph of favorite fruits">
                {/* Y axis */}
                <line x1={chartX - 5} y1={chartY - chartH} x2={chartX - 5} y2={chartY} stroke={C.borderLight} strokeWidth={1} />
                {/* X axis */}
                <line x1={chartX - 5} y1={chartY} x2={chartX + 4 * (barW + barGap)} y2={chartY} stroke={C.borderLight} strokeWidth={1} />

                {barData.map((d, i) => {
                  const bh = (d.value / maxVal) * chartH;
                  const bx = chartX + i * (barW + barGap);
                  return (
                    <g key={d.label}>
                      <motion.rect
                        x={bx}
                        y={chartY - bh}
                        width={barW}
                        height={bh}
                        rx={4}
                        fill={barColors[i]}
                        initial={{ height: 0, y: chartY }}
                        animate={{ height: bh, y: chartY - bh }}
                        transition={{ ...SPRING, delay: i * 0.15 }}
                      />
                      <text x={bx + barW / 2} y={chartY + 14} textAnchor={"middle" as const} fill={C.textMuted} fontSize={10}>{d.label}</text>
                      <text x={bx + barW / 2} y={chartY - bh - 6} textAnchor={"middle" as const} fill={barColors[i]} fontSize={11} fontWeight={700}>{d.value}</text>
                    </g>
                  );
                })}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3-4: Wrong chart warning */}
        <AnimatePresence>
          {phase >= 3 && phase < 5 && (
            <motion.div key="wrong" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 text-center">
              <div className="mx-auto mb-2 inline-block rounded-lg px-4 py-2" style={{ backgroundColor: C.errorFill, border: `2px solid ${C.error}` }}>
                <span className="text-sm font-semibold" style={{ color: C.error }}>
                  {"\u2717"} Line graph for categories? Wrong chart!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 5: Tagline */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.p key="tagline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center" style={{ color: C.textSecondary, fontSize: "clamp(16px, 4vw, 22px)" }}>
              Every chart tells a story. Choose the right one.
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 6 && (
          <div className="flex justify-center"><ContinueButton onClick={onComplete} /></div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL
// ═══════════════════════════════════════════════════════════════════════════

interface ChartMatchProblem {
  description: string;
  correctChart: string;
  explanation: string;
}

const CHART_PROBLEMS: readonly ChartMatchProblem[] = [
  { description: "Favorite colors in a class", correctChart: "Bar Graph", explanation: "Colors are categories \u2014 bar graph compares them." },
  { description: "Temperature each month for a year", correctChart: "Line Graph", explanation: "Time series data \u2014 line graph shows change over time." },
  { description: "Test scores grouped by range (0-60, 60-70, 70-80, 80-90, 90-100)", correctChart: "Histogram", explanation: "Continuous numerical ranges \u2014 histogram shows frequency distribution." },
  { description: "Budget breakdown: rent 40%, food 30%, transport 20%, other 10%", correctChart: "Pie Chart", explanation: "Parts of a whole that sum to 100% \u2014 pie chart." },
  { description: "Number of books read by each student this year", correctChart: "Histogram", explanation: "Numerical data grouped into ranges \u2014 histogram." },
  { description: "Sales revenue per product category (shoes, hats, shirts, bags)", correctChart: "Bar Graph", explanation: "Comparing separate categories \u2014 bar graph." },
] as const;

const CHART_TYPES = ["Bar Graph", "Line Graph", "Histogram", "Pie Chart"] as const;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = CHART_PROBLEMS[problemIdx % CHART_PROBLEMS.length]!;
  const canContinue = correctCount >= 4 && interactions >= 6;

  const handleSelect = useCallback(
    (chartType: string) => {
      if (showFeedback) return;
      setSelected(chartType);
      setShowFeedback(true);
      setInteractions((c) => c + 1);
      if (chartType === problem.correctChart) {
        setCorrectCount((c) => c + 1);
      }
    },
    [showFeedback, problem.correctChart],
  );

  const handleNext = useCallback(() => {
    setSelected(null);
    setShowFeedback(false);
    setProblemIdx((i) => i + 1);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      {/* Data description */}
      <div className="mb-4 w-full rounded-2xl p-5 text-center" style={{ backgroundColor: C.bgSurface }}>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: C.textMuted }}>Which chart is best for this data?</p>
        <p className="text-base font-medium" style={{ color: C.textPrimary }}>{problem.description}</p>
      </div>

      {/* Chart type buttons */}
      <div className="mb-4 grid w-full grid-cols-2 gap-3">
        {CHART_TYPES.map((ct) => {
          const isCorrect = ct === problem.correctChart;
          const isSelected = ct === selected;
          let bg: string = C.bgSurface;
          let borderColor: string = C.borderLight;
          if (showFeedback && isSelected) {
            bg = isCorrect ? C.successFill : C.errorFill;
            borderColor = isCorrect ? C.success : C.error;
          } else if (showFeedback && isCorrect) {
            bg = C.successFill;
            borderColor = C.success;
          }
          return (
            <motion.button
              key={ct}
              onClick={() => handleSelect(ct)}
              disabled={showFeedback}
              className="min-h-[48px] rounded-xl px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed"
              style={{ backgroundColor: bg, border: `2px solid ${borderColor}`, color: C.textPrimary }}
              whileTap={showFeedback ? {} : { scale: 0.95 }}
              aria-label={`Select ${ct}`}
            >
              {ct}
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
            className="mb-4 w-full rounded-lg px-4 py-3 text-center text-sm"
            style={{
              backgroundColor: selected === problem.correctChart ? C.successFill : C.errorFill,
              color: selected === problem.correctChart ? C.success : C.error,
            }}
          >
            <p className="mb-1 font-semibold">{selected === problem.correctChart ? "Correct!" : `Not quite. Best choice: ${problem.correctChart}`}</p>
            <p style={{ color: C.textSecondary }}>{problem.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showFeedback && !canContinue && (
        <motion.button onClick={handleNext} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold" style={{ backgroundColor: C.bgSurface, border: `2px solid ${C.borderLight}`, color: C.textSecondary }} whileTap={{ scale: 0.95 }}>{"Next \u2192"}</motion.button>
      )}

      <div className="mt-4 flex items-center gap-1 justify-center">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 6, height: 6, backgroundColor: i < interactions ? C.primary : C.border }} />
        ))}
      </div>

      {canContinue && <div className="mt-4 flex justify-center"><ContinueButton onClick={onComplete} /></div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  { text: "BAR GRAPHS compare separate CATEGORIES. Each bar is a different thing. Bars have gaps between them.", detail: "Categories: colors, fruits, countries. Each is distinct and separate.", button: "I see it!" },
  { text: "LINE GRAPHS show how something CHANGES OVER TIME. The line connects the journey.", detail: "Time axis: months, years, hours. The trend matters.", button: "I see it!" },
  { text: "HISTOGRAMS group NUMBERS into ranges. Bars TOUCH because the ranges are continuous.", detail: "Score ranges: 0-60, 60-70, 70-80. No gaps \u2014 every number belongs to a range.", button: "I see it!" },
  { text: "PIE CHARTS show PARTS OF A WHOLE. All slices must add up to 100%.", detail: "Budget, survey results, composition. The whole circle = 100%.", button: "Got it!" },
  { text: "The key question: Is your data categories, time-series, numerical ranges, or parts of a whole?", detail: "Categories \u2192 Bar. Time \u2192 Line. Ranges \u2192 Histogram. Parts \u2192 Pie.", button: "Got it!" },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const prompt = DISCOVERY_PROMPTS[promptIdx];

  const handleAck = useCallback(() => {
    if (promptIdx < DISCOVERY_PROMPTS.length - 1) setPromptIdx((i) => i + 1);
    else onComplete();
  }, [promptIdx, onComplete]);

  if (!prompt) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <div className="mb-4 flex items-center gap-1 justify-center">
          {DISCOVERY_PROMPTS.map((_, i) => (
            <div key={i} className="rounded-full" style={{ width: 8, height: 8, backgroundColor: i <= promptIdx ? C.primary : C.border }} />
          ))}
        </div>
        <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: C.textPrimary }}>{prompt.text}</p>
          <p className="mb-6 rounded-lg px-4 py-3 font-mono text-sm" style={{ backgroundColor: C.bgPrimary, color: C.textSecondary }}>{prompt.detail}</p>
        </motion.div>
        <div className="flex justify-center">
          <motion.button onClick={handleAck} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white" style={{ backgroundColor: C.primary }} whileTap={{ scale: 0.95 }}>{prompt.button}</motion.button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOL_STEPS = [
  { notation: "Categories \u2192 Bar Graph", description: "Compare distinct groups with separate bars" },
  { notation: "Time Series \u2192 Line Graph", description: "Show trends and change over time" },
  { notation: "Numerical Ranges \u2192 Histogram", description: "Show frequency distribution with touching bars" },
  { notation: "Parts of Whole \u2192 Pie Chart", description: "Show proportions that sum to 100%" },
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

  const chartColors = [C.bar1, C.bar2, C.line, C.bar3];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#7c3aed20", color: C.bar1 }}>Symbol Bridge</span>
        <div className="space-y-3">
          {SYMBOL_STEPS.map((_, i) => {
            const step = SYMBOL_STEPS[i]!;
            return i < visibleCount ? (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: C.bgPrimary, border: `1px solid ${C.border}` }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: chartColors[i], color: "#fff" }}>{i + 1}</span>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: chartColors[i] }}>{step.notation}</p>
                  <p className="text-xs" style={{ color: C.textMuted }}>{step.description}</p>
                </div>
              </motion.div>
            ) : null;
          })}
        </div>
        {visibleCount >= SYMBOL_STEPS.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <p className="mb-4 text-center text-sm font-semibold" style={{ color: C.textSecondary }}>Ask: What type of data? Then choose the right chart.</p>
            <div className="flex justify-center"><ContinueButton onClick={onComplete} /></div>
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
  { title: "Sports", icon: "\u26BD", example: "Points per game this season", math: "Line Graph (time series)" },
  { title: "Weather", icon: "\u2601\uFE0F", example: "Rain vs. sunshine days per month", math: "Bar Graph (categories)" },
  { title: "School", icon: "\uD83D\uDCDA", example: "Test score distribution", math: "Histogram (frequency ranges)" },
  { title: "Allowance", icon: "\uD83D\uDCB0", example: "How you spend your money", math: "Pie Chart (parts of whole)" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <span className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: C.textMuted }}>Real World Connections</span>
      <div className="mb-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {REAL_WORLD_CARDS.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: i * 0.15 }} className="rounded-xl p-4" style={{ backgroundColor: C.bgSurface, border: `1px solid ${C.border}` }}>
            <p className="mb-1 text-lg">{card.icon}</p>
            <p className="mb-1 text-sm font-semibold" style={{ color: C.textPrimary }}>{card.title}</p>
            <p className="mb-2 text-xs" style={{ color: C.textSecondary }}>{card.example}</p>
            <p className="font-mono text-xs" style={{ color: C.bar1 }}>{card.math}</p>
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

interface PracticeProblem { layer: string; type: "mc" | "tf"; prompt: string; options: string[]; answer: string; feedback: string; }

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  { layer: "Recall", type: "mc", prompt: "Which chart is best for comparing favorite pizza toppings?", options: ["Bar graph", "Line graph", "Histogram", "Pie chart"], answer: "Bar graph", feedback: "Pizza toppings are categories \u2014 bar graph compares categories." },
  { layer: "Recall", type: "mc", prompt: "What makes histograms different from bar graphs?", options: ["Histogram bars touch (continuous ranges)", "Histograms use colors", "Bar graphs are vertical", "They are the same"], answer: "Histogram bars touch (continuous ranges)", feedback: "Histograms show continuous ranges \u2014 bars touch. Bar graphs show separate categories \u2014 bars have gaps." },
  { layer: "Recall", type: "tf", prompt: "A pie chart is good for showing change over time.", options: ["True", "False"], answer: "False", feedback: "False! Pie charts show parts of a whole. Use a line graph for change over time." },
  { layer: "Procedure", type: "mc", prompt: "Data: Student heights (140-145: 3, 145-150: 7, 150-155: 5). Which display?", options: ["Histogram", "Pie chart", "Line graph", "Bar graph"], answer: "Histogram", feedback: "Height ranges are continuous numerical data \u2014 histogram is right." },
  { layer: "Procedure", type: "mc", prompt: "Bar graph shows: Math 25, Science 18, English 22, Art 15. Most popular?", options: ["Math (25 students)", "English (22)", "Science (18)", "Art (15)"], answer: "Math (25 students)", feedback: "The tallest bar (Math, 25) represents the most popular." },
  { layer: "Procedure", type: "mc", prompt: "Pie chart: Rent 40%, Food 30%, Transport 20%, Other 10%. Budget $2000. Food cost?", options: ["$600", "$300", "$800", "$400"], answer: "$600", feedback: "30% of $2000 = 0.30 \u00D7 2000 = $600." },
  { layer: "Understanding", type: "mc", prompt: "Why would a line graph be misleading for 'favorite color' data?", options: ["It implies connection between categories that doesn\u2019t exist", "Colors can\u2019t be graphed", "Line graphs are only for big data", "It would look ugly"], answer: "It implies connection between categories that doesn\u2019t exist", feedback: "Line graphs suggest a trend \u2014 colors have no natural order or connection." },
  { layer: "Understanding", type: "mc", prompt: "Why must pie chart slices sum to 100%?", options: ["They represent ALL parts of one whole", "Because pies are round", "To make them easier to read", "They don\u2019t have to"], answer: "They represent ALL parts of one whole", feedback: "A pie chart shows how one whole is divided \u2014 all parts = the whole." },
  { layer: "Understanding", type: "mc", prompt: "A student uses a pie chart for 'temperature each month.' What\u2019s wrong?", options: ["Temperatures aren\u2019t parts of a whole \u2014 use a line graph", "Pie charts can\u2019t show numbers", "There are too many months", "Nothing \u2014 it\u2019s fine"], answer: "Temperatures aren\u2019t parts of a whole \u2014 use a line graph", feedback: "Monthly temperatures are time-series data showing change, not parts of a total." },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = PRACTICE_PROBLEMS[idx];
  const isLast = idx === PRACTICE_PROBLEMS.length - 1;

  const handleSelect = useCallback((option: string) => { if (showFeedback) return; setSelected(option); setShowFeedback(true); }, [showFeedback]);
  const handleNext = useCallback(() => { if (isLast) { onComplete(); return; } setIdx((i) => i + 1); setSelected(null); setShowFeedback(false); }, [isLast, onComplete]);

  if (!problem) return null;
  const isCorrect = selected === problem.answer;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: C.primary + "30", color: C.primary }}>{problem.layer}</span>
          <span className="text-xs font-semibold" style={{ color: C.textMuted }}>{idx + 1}/{PRACTICE_PROBLEMS.length}</span>
        </div>
        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>{problem.prompt}</p>

        <div className="mb-4 space-y-2">
          {problem.options.map((opt) => {
            const oc = opt === problem.answer;
            const os = opt === selected;
            let bg: string = C.bgPrimary; let border: string = C.border;
            if (showFeedback && os) { bg = oc ? C.successFill : C.errorFill; border = oc ? C.success : C.error; }
            else if (showFeedback && oc) { bg = C.successFill; border = C.success; }
            return (<motion.button key={opt} onClick={() => handleSelect(opt)} disabled={showFeedback} className="min-h-[44px] w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed" style={{ backgroundColor: bg, border: `2px solid ${border}`, color: C.textPrimary }} whileTap={showFeedback ? {} : { scale: 0.98 }}>{opt}</motion.button>);
          })}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: isCorrect ? C.successFill : C.errorFill, color: isCorrect ? C.success : C.error }}>
              <p className="mb-1 font-semibold">{isCorrect ? "Correct!" : `Incorrect. Answer: ${problem.answer}`}</p>
              <p style={{ color: C.textSecondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showFeedback && (
          <div className="flex justify-center">
            <motion.button onClick={handleNext} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ backgroundColor: C.primary }} whileTap={{ scale: 0.95 }}>{isLast ? "Complete" : "Next \u2192"}</motion.button>
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
  const handleSubmit = useCallback(() => { if (text.length >= 20) setSubmitted(true); }, [text]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#7c3aed20", color: C.primary }}>Reflection</span>
        {!submitted ? (
          <>
            <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>Your friend collected data about how students get to school (walk, bus, car, bike). They want to make a chart. Which type would you recommend and why?</p>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="mb-2 min-h-[100px] w-full rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: C.bgPrimary, border: `2px solid ${C.border}`, color: C.textPrimary, resize: "vertical" }} placeholder="Type your recommendation..." aria-label="Reflection text" />
            <p className="mb-4 text-xs" style={{ color: text.length >= 20 ? C.success : C.textMuted }}>{text.length}/20 characters minimum</p>
            <div className="flex items-center justify-between">
              <button onClick={onComplete} className="min-h-[44px] px-4 py-2 text-sm" style={{ color: C.textDim }} aria-label="Skip reflection">Skip</button>
              <motion.button onClick={handleSubmit} disabled={text.length < 20} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed" style={{ backgroundColor: C.primary }} whileTap={text.length >= 20 ? { scale: 0.95 } : {}}>Submit</motion.button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            <p className="mb-4 text-lg font-semibold" style={{ color: C.success }}>Great data thinking!</p>
            <p className="mb-6 text-sm" style={{ color: C.textSecondary }}>Choosing the right chart is a crucial skill {"\u2014"} it determines whether your data story is clear or confusing. Both bar graphs (comparing counts) and pie charts (showing proportions) could work here!</p>
            <div className="flex justify-center"><ContinueButton onClick={onComplete} label="Complete Lesson" /></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
