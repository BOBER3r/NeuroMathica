"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLORS = {
  box: "#34d399",
  boxFill: "#34d39933",
  median: "#f59e0b",
  whisker: "#94a3b8",
  dots: "#818cf8",
  dotsFill: "#818cf880",
  quartile: "#60a5fa",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  bgElevated: "#334155",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  success: "#34d399",
  error: "#f87171",
  primary: "#8b5cf6",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface FiveNumberSummary {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface PracticeProblem {
  id: number;
  layer: string;
  type: "multiple-choice" | "numeric-input";
  prompt: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

const DATASETS: Record<string, number[]> = {
  A: [55, 60, 65, 70, 72, 75, 78, 80, 82, 85, 90, 95],
  B: [20, 22, 25, 50, 55, 58, 60, 62, 65, 80, 85, 90],
  C: [40, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 95],
};

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice",
    prompt: "The five-number summary includes...",
    options: [
      "Mean, Median, Mode, Range, IQR",
      "Min, Q1, Median, Q3, Max",
      "Q1, Q2, Q3, Q4, Q5",
      "Min, Mean, Median, Mode, Max",
    ],
    correctAnswer: "Min, Q1, Median, Q3, Max",
    feedback: "These five values define the entire box plot." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "The box in a box plot spans from...",
    options: ["Min to Max", "Q1 to Q3", "Mean to Median", "Q1 to Median"],
    correctAnswer: "Q1 to Q3",
    feedback: "The box shows the interquartile range \u2014 the middle 50% of data." },
  { id: 3, layer: "Recall", type: "multiple-choice",
    prompt: "The line inside the box represents...",
    options: ["The mean", "The median", "The mode", "Q2 minus Q1"],
    correctAnswer: "The median",
    feedback: "The center line marks the median \u2014 the middle value." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "Data: 3, 5, 7, 9, 11. What is the median?",
    correctAnswer: "7",
    feedback: "The middle value of the sorted data is 7." },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "Data: 2, 4, 6, 8, 10, 12. What is Q1?",
    correctAnswer: "4",
    feedback: "Q1 is the median of the lower half: 2, 4, 6. Q1 = 4." },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "If Q1 = 20 and Q3 = 45, what is the IQR?",
    correctAnswer: "25",
    feedback: "IQR = Q3 \u2212 Q1 = 45 \u2212 20 = 25." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "A box plot has a very long right whisker. This means...",
    options: [
      "Most data is on the right",
      "There are some high values far from the rest",
      "The median is on the right",
      "There are more data points on the right",
    ],
    correctAnswer: "There are some high values far from the rest",
    feedback: "A long whisker shows data stretching far in that direction." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Each section of a box plot contains about...",
    options: ["10% of the data", "25% of the data", "50% of the data", "It varies"],
    correctAnswer: "25% of the data",
    feedback: "The four sections (two whiskers, two box halves) each hold about 25%." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Two box plots: A has a wider box than B. This tells you...",
    options: [
      "A has more data points",
      "A's middle 50% is more spread out",
      "A has a higher median",
      "A has a larger maximum",
    ],
    correctAnswer: "A's middle 50% is more spread out",
    feedback: "A wider box (larger IQR) means more variability in the middle half." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeFiveNumber(data: number[]): FiveNumberSummary {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0]!;
  const max = sorted[n - 1]!;

  let median: number;
  const mid = Math.floor(n / 2);
  if (n % 2 === 0) {
    median = (sorted[mid - 1]! + sorted[mid]!) / 2;
  } else {
    median = sorted[mid]!;
  }

  const lowerHalf = sorted.slice(0, Math.floor(n / 2));
  const upperHalf = sorted.slice(Math.ceil(n / 2));

  function medianOf(arr: number[]): number {
    const m = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) return (arr[m - 1]! + arr[m]!) / 2;
    return arr[m]!;
  }

  const q1 = medianOf(lowerHalf);
  const q3 = medianOf(upperHalf);

  return { min, q1, median, q3, max };
}

function valueToX(value: number, minVal: number, maxVal: number, lineLeft: number, lineWidth: number): number {
  return lineLeft + ((value - minVal) / (maxVal - minVal)) * lineWidth;
}

// ---------------------------------------------------------------------------
// Shared micro-components
// ---------------------------------------------------------------------------

function ContinueButton({ onClick, label = "Continue", delay = 0 }: {
  onClick: () => void; label?: string; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="w-full flex justify-center pt-4 pb-8">
      <Button size="lg" onClick={onClick} className="min-w-[160px]"
        style={{ backgroundColor: COLORS.primary }}>{label}</Button>
    </motion.div>
  );
}

function InteractionDots({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="rounded-full transition-colors duration-200"
          style={{ width: 6, height: 6,
            backgroundColor: i < count ? COLORS.primary : COLORS.bgElevated }} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Box plot SVG component
// ---------------------------------------------------------------------------

function BoxPlotSVG({ data, rangeMin, rangeMax }: { data: number[]; rangeMin: number; rangeMax: number }) {
  const svgW = 320;
  const svgH = 140;
  const lineLeft = 30;
  const lineRight = svgW - 30;
  const lineWidth = lineRight - lineLeft;
  const lineY = 90;
  const boxTop = 55;
  const boxBottom = 105;
  const boxH = boxBottom - boxTop;
  const dotY = 30;

  const fns = useMemo(() => computeFiveNumber(data), [data]);

  const toX = useCallback(
    (v: number) => valueToX(v, rangeMin, rangeMax, lineLeft, lineWidth),
    [rangeMin, rangeMax, lineLeft, lineWidth],
  );

  const tickValues = useMemo(() => {
    const step = Math.ceil((rangeMax - rangeMin) / 10);
    const ticks: number[] = [];
    for (let v = rangeMin; v <= rangeMax; v += step) ticks.push(v);
    return ticks;
  }, [rangeMin, rangeMax]);

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Box plot">
      {/* Number line */}
      <line x1={lineLeft} y1={lineY} x2={lineRight} y2={lineY} stroke={COLORS.whisker} strokeWidth={1} />
      {tickValues.map((v) => (
        <g key={v}>
          <line x1={toX(v)} y1={lineY - 4} x2={toX(v)} y2={lineY + 4} stroke={COLORS.whisker} strokeWidth={1} />
          <text x={toX(v)} y={lineY + 16} textAnchor={"middle" as const} fill={COLORS.textMuted} fontSize={9}>
            {v}
          </text>
        </g>
      ))}

      {/* Data dots */}
      {data.map((v, i) => (
        <motion.circle key={i} cx={toX(v)} cy={dotY} r={4}
          fill={COLORS.dotsFill} stroke={COLORS.dots} strokeWidth={1}
          initial={{ opacity: 0, cy: dotY + 20 }}
          animate={{ opacity: 1, cy: dotY }}
          transition={{ delay: i * 0.05, ...SPRING }} />
      ))}

      {/* Whiskers */}
      <motion.line x1={toX(fns.min)} y1={(boxTop + boxBottom) / 2} x2={toX(fns.q1)} y2={(boxTop + boxBottom) / 2}
        stroke={COLORS.whisker} strokeWidth={2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
      <motion.line x1={toX(fns.q3)} y1={(boxTop + boxBottom) / 2} x2={toX(fns.max)} y2={(boxTop + boxBottom) / 2}
        stroke={COLORS.whisker} strokeWidth={2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />

      {/* Whisker end caps */}
      <line x1={toX(fns.min)} y1={boxTop + 10} x2={toX(fns.min)} y2={boxBottom - 10} stroke={COLORS.whisker} strokeWidth={2} />
      <line x1={toX(fns.max)} y1={boxTop + 10} x2={toX(fns.max)} y2={boxBottom - 10} stroke={COLORS.whisker} strokeWidth={2} />

      {/* Box */}
      <motion.rect x={toX(fns.q1)} y={boxTop} width={toX(fns.q3) - toX(fns.q1)} height={boxH}
        fill={COLORS.boxFill} stroke={COLORS.box} strokeWidth={2} rx={2}
        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.3, ...SPRING }} />

      {/* Median line */}
      <motion.line x1={toX(fns.median)} y1={boxTop} x2={toX(fns.median)} y2={boxBottom}
        stroke={COLORS.median} strokeWidth={3}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }} />
    </svg>
  );
}

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/BoxPlotsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 1500));
    timers.push(setTimeout(() => setPhase(2), 3000));
    timers.push(setTimeout(() => setPhase(3), 4500));
    timers.push(setTimeout(() => setPhase(4), 5500));
    timers.push(setTimeout(() => setPhase(5), 6500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const hookData = [55, 60, 62, 65, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 95, 98];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
          <BoxPlotSVG data={hookData} rangeMin={50} rangeMax={100} />
        </motion.div>
      )}

      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-bold"
            style={{ color: COLORS.primary, fontSize: "clamp(18px, 4.5vw, 28px)" }}>
            20 numbers. 5 landmarks. 1 picture.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-2 font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            This is a box plot.
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 5 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [datasetKey, setDatasetKey] = useState<string>("A");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const data = DATASETS[datasetKey]!;
  const fns = useMemo(() => computeFiveNumber(data), [data]);

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Switch datasets to see how the box plot changes
      </p>

      {/* Dataset selector */}
      <div className="flex gap-2 justify-center mb-4">
        {Object.keys(DATASETS).map((key) => (
          <button key={key} onClick={() => { setDatasetKey(key); interact(); }}
            className="rounded-lg px-4 py-1 font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: datasetKey === key ? COLORS.primary : COLORS.bgSurface,
              color: COLORS.textPrimary,
            }}>
            Set {key}
          </button>
        ))}
      </div>

      <motion.div key={datasetKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} className="w-full max-w-md">
        <BoxPlotSVG data={data} rangeMin={0} rangeMax={100} />
      </motion.div>

      {/* Five number summary */}
      <div className="rounded-xl p-3 w-full max-w-xs mt-2" style={{ backgroundColor: COLORS.bgSurface }}>
        <p className="text-xs font-medium mb-2 text-center" style={{ color: COLORS.textMuted }}>
          Five-Number Summary
        </p>
        <div className="grid grid-cols-5 gap-1 text-center text-xs">
          {[
            { label: "Min", value: fns.min, color: COLORS.whisker },
            { label: "Q1", value: fns.q1, color: COLORS.quartile },
            { label: "Med", value: fns.median, color: COLORS.median },
            { label: "Q3", value: fns.q3, color: COLORS.quartile },
            { label: "Max", value: fns.max, color: COLORS.whisker },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ color: COLORS.textMuted }}>{item.label}</p>
              <p className="font-mono font-bold tabular-nums" style={{ color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 8)} total={8} />
      </div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

// ===========================================================================
// STAGE 3: DISCOVERY
// ===========================================================================

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const prompts = useMemo(() => [
    { text: "Count the dots in each section. Each part of the box plot contains about 25% of the data!", btn: "I see it!" },
    { text: "A wider section means the data is more spread out there \u2014 not that there's more data.", btn: "I see it!" },
    { text: "The five-number summary tells the whole story: Min, Q1, Median, Q3, Max.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      <div className="w-full max-w-md mb-6">
        <BoxPlotSVG data={DATASETS["A"]!} rangeMin={50} rangeMax={100} />
      </div>

      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={SPRING} className="max-w-md text-center px-4">
          <p className="font-medium mb-4"
            style={{ color: COLORS.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            {current.text}
          </p>
          <Button size="lg"
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
            className="min-w-[140px]" style={{ backgroundColor: COLORS.primary }}>
            {current.btn}
          </Button>
        </motion.div>
      )}
    </section>
  );
}

// ===========================================================================
// STAGE 4: SYMBOL BRIDGE
// ===========================================================================

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setRevealed(1), 1200));
    timers.push(setTimeout(() => setRevealed(2), 2400));
    timers.push(setTimeout(() => setRevealed(3), 3600));
    timers.push(setTimeout(() => setRevealed(4), 4800));
    timers.push(setTimeout(() => setRevealed(5), 6000));
    timers.push(setTimeout(() => setRevealed(6), 7200));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "Min = smallest value", desc: "Left whisker tip", color: COLORS.whisker },
    { formula: "Q1 = 25th percentile", desc: "Left edge of the box", color: COLORS.quartile },
    { formula: "Median = 50th percentile", desc: "Line inside the box", color: COLORS.median },
    { formula: "Q3 = 75th percentile", desc: "Right edge of the box", color: COLORS.quartile },
    { formula: "Max = largest value", desc: "Right whisker tip", color: COLORS.whisker },
    { formula: "IQR = Q3 \u2212 Q1", desc: "Width of the box", color: COLORS.box },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Five-Number Summary
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-3"
                style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>{n.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= 6 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F4CB}", title: "Test Scores", desc: "Compare two classes' test results with box plots.", math: "Side-by-side comparison" },
    { icon: "\u{1F321}\u{FE0F}", title: "Daily Temperatures", desc: "A month of temperatures at a glance.", math: "Spread and center" },
    { icon: "\u{1F3C0}", title: "Sports Stats", desc: "Points per game for two players.", math: "Consistency vs range" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Real World Connections
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }}
            className="rounded-xl p-4 flex gap-3 items-start"
            style={{ backgroundColor: COLORS.bgSurface }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: COLORS.textPrimary }}>{s.title}</p>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: COLORS.primary }}>{s.math}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onComplete} delay={0.3} />
    </section>
  );
}

// ===========================================================================
// STAGE 6: PRACTICE
// ===========================================================================

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));

  const problem = PRACTICE_PROBLEMS[currentQ]!;
  const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const userAnswer = problem.type === "numeric-input" ? inputValue.trim() : selected;
  const isCorrect = userAnswer === problem.correctAnswer;

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;
    setSubmitted(true);
    setResults((prev) => { const next = [...prev]; next[currentQ] = userAnswer === problem.correctAnswer; return next; });
  }, [userAnswer, currentQ, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false);
  }, [isLast, onComplete]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i];
          let bg: string = COLORS.bgElevated;
          if (r === true) bg = COLORS.success;
          else if (r === false) bg = COLORS.error;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg,
              border: i === currentQ ? `2px solid ${COLORS.primary}` : "none" }} />;
        })}
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: COLORS.textMuted }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}
        </p>
        <p className="text-center font-medium mb-6"
          style={{ color: COLORS.textPrimary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>
          {problem.prompt}
        </p>

        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2 w-full">
            {problem.options.map((opt) => {
              let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
              if (submitted) {
                if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; }
                else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; }
              } else if (opt === selected) { bg = "#8b5cf633"; border = COLORS.primary; }
              return (
                <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                  disabled={submitted}
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
                  style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {problem.type === "numeric-input" && (
          <input type="number" value={inputValue}
            onChange={(e) => { if (!submitted) setInputValue(e.target.value); }}
            disabled={submitted} placeholder="Enter your answer"
            className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary,
              border: `2px solid ${submitted ? (isCorrect ? COLORS.success : COLORS.error) : COLORS.bgElevated}`,
              outline: "none" }} />
        )}

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120",
                border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? COLORS.success : COLORS.error }}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full"
              style={{ backgroundColor: COLORS.primary, opacity: userAnswer ? 1 : 0.4 }}>
              Check Answer
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: COLORS.primary }}>
              {isLast ? "Continue" : "Next \u2192"}
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ===========================================================================
// STAGE 7: REFLECTION
// ===========================================================================

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = text.trim().length >= 20;

  const handleSubmit = useCallback(() => { if (canSubmit) setSubmitted(true); }, [canSubmit]);
  const handleSkip = useCallback(() => { setSubmitted(true); }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6"
          style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why might a box plot be more useful than just listing all the numbers? When would you want to see the full data instead?
        </p>

        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary,
                border: `2px solid ${COLORS.bgElevated}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right"
              style={{ color: text.trim().length >= 20 ? COLORS.success : COLORS.textMuted }}>
              {text.trim().length}/20 characters minimum
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING} className="rounded-xl p-6 text-center"
            style={{ backgroundColor: COLORS.bgSurface }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: COLORS.success }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
              Reflecting on concepts deepens your understanding.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: COLORS.primary, opacity: canSubmit ? 1 : 0.4 }}>
              Submit Reflection
            </Button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: COLORS.primary }}>
              Complete Lesson
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ===========================================================================
// ROOT COMPONENT
// ===========================================================================

export function BoxPlotsLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx] ?? ("hook" as Stage);

  const advanceStage = useCallback(() => {
    setStageIdx((i) => { const next = i + 1; if (next >= STAGES.length) { onComplete?.(); return i; } return next; });
  }, [onComplete]);

  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2"
        style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>SP-5.3 Box Plots</span>
          <span className="text-xs tabular-nums" style={{ color: "#475569" }}>{stageIdx + 1}/{STAGES.length}</span>
        </div>
        <ProgressBar value={stageProgress} variant="xp" size="sm" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex flex-1 flex-col"
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }} transition={SPRING_GENTLE}>
          {stage === "hook" && <HookStage onComplete={advanceStage} />}
          {stage === "spatial" && <SpatialStage onComplete={advanceStage} />}
          {stage === "discovery" && <DiscoveryStage onComplete={advanceStage} />}
          {stage === "symbol" && <SymbolBridgeStage onComplete={advanceStage} />}
          {stage === "realWorld" && <RealWorldStage onComplete={advanceStage} />}
          {stage === "practice" && <PracticeStage onComplete={advanceStage} />}
          {stage === "reflection" && <ReflectionStage onComplete={handleReflectionComplete} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
