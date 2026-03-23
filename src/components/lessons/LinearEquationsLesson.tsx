"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * AL-3.8 Linear Equations — Grade 8
 * Prerequisites: AL-3.6 (Two-Step Equations), AL-3.7 (Functions)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: y = mx + b defines a straight line where m is the slope
 *   (rate of change) and b is the y-intercept (starting value).
 *
 * Stage flow:
 *  1. Hook — a point traces a line as x increments; slope visualized as "rise over run"
 *  2. Spatial — adjust m and b sliders; see line change in real time on coordinate grid
 *  3. Discovery — slope = rise/run; y-intercept = where line crosses y-axis
 *  4. Symbol Bridge — y = mx + b with color-coded parts
 *  5. Real World — car speed, phone battery, savings account
 *  6. Practice — 9 problems
 *  7. Reflection
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BG = "#0f172a";
const SURFACE = "#1e293b";
const TEXT = "#f8fafc";
const MUTED = "#94a3b8";
const BORDER = "#475569";
const PRIMARY = "#818cf8";
const SUCCESS = "#34d399";
const ERROR = "#f87171";

const SLOPE_COLOR = "#f472b6";   // pink
const INTERCEPT_COLOR = "#60a5fa"; // blue
const LINE_COLOR = "#a78bfa";    // purple

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

type Stage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGES: Stage[] = [
  "hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection",
];

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-2 py-3" style={{ background: BG }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-2 w-2 rounded-full transition-all duration-300" style={{ background: i <= current ? PRIMARY : BORDER, transform: i === current ? "scale(1.4)" : "scale(1)" }} />
      ))}
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white hover:brightness-110 active:scale-[0.97]"
      style={{ background: PRIMARY, minHeight: 48 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-12"
      style={{ background: BG }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Coordinate grid helper                                             */
/* ------------------------------------------------------------------ */

/** Convert math coords to SVG coords. Grid: -6..6 on both axes. */
function mathToSvg(mx: number, my: number): { sx: number; sy: number } {
  const PAD = 40;
  const SIZE = 320;
  const range = 12; // -6 to 6
  const sx = PAD + ((mx + 6) / range) * SIZE;
  const sy = PAD + ((6 - my) / range) * SIZE;
  return { sx, sy };
}

function CoordinateGrid({ m, b, showSlope }: { m: number; b: number; showSlope?: boolean }) {
  const PAD = 40;
  const SIZE = 320;
  const W = PAD * 2 + SIZE;

  // Axis positions
  const origin = mathToSvg(0, 0);

  // Line: compute two endpoints at x = -6 and x = 6
  const y1 = m * -6 + b;
  const y2 = m * 6 + b;
  const p1 = mathToSvg(-6, Math.max(-6, Math.min(6, y1)));
  const p2 = mathToSvg(6, Math.max(-6, Math.min(6, y2)));

  // Y-intercept point
  const intPt = mathToSvg(0, b);

  // Rise/run triangle: from (0, b) to (1, m+b)
  const runEnd = mathToSvg(1, b);
  const riseEnd = mathToSvg(1, m + b);

  return (
    <svg viewBox={`0 0 ${W} ${W}`} className="w-full max-w-sm" aria-label={`Graph of y = ${m}x + ${b}`}>
      {/* Grid lines */}
      {Array.from({ length: 13 }, (_, i) => {
        const val = i - 6;
        const pos = mathToSvg(val, 0);
        const posY = mathToSvg(0, val);
        return (
          <g key={i}>
            <line x1={pos.sx} y1={PAD} x2={pos.sx} y2={PAD + SIZE} stroke={BORDER} strokeWidth={0.5} />
            <line x1={PAD} y1={posY.sy} x2={PAD + SIZE} y2={posY.sy} stroke={BORDER} strokeWidth={0.5} />
          </g>
        );
      })}

      {/* Axes */}
      <line x1={PAD} y1={origin.sy} x2={PAD + SIZE} y2={origin.sy} stroke={MUTED} strokeWidth={1.5} />
      <line x1={origin.sx} y1={PAD} x2={origin.sx} y2={PAD + SIZE} stroke={MUTED} strokeWidth={1.5} />

      {/* Axis labels */}
      <text x={PAD + SIZE + 5} y={origin.sy + 5} fill={MUTED} fontSize={12}>x</text>
      <text x={origin.sx + 5} y={PAD - 5} fill={MUTED} fontSize={12}>y</text>

      {/* Line */}
      <motion.line
        x1={p1.sx}
        y1={p1.sy}
        x2={p2.sx}
        y2={p2.sy}
        stroke={LINE_COLOR}
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Y-intercept dot */}
      <motion.circle
        cx={intPt.sx}
        cy={intPt.sy}
        r={6}
        fill={INTERCEPT_COLOR}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={SPRING}
      />

      {/* Rise/run triangle */}
      {showSlope && m !== 0 && (
        <g>
          {/* Run (horizontal) */}
          <line x1={intPt.sx} y1={intPt.sy} x2={runEnd.sx} y2={runEnd.sy} stroke={SLOPE_COLOR} strokeWidth={2} strokeDasharray="4 3" />
          <text x={(intPt.sx + runEnd.sx) / 2} y={intPt.sy + 16} textAnchor={"middle" as const} fill={SLOPE_COLOR} fontSize={11} fontWeight="bold">
            run=1
          </text>

          {/* Rise (vertical) */}
          <line x1={runEnd.sx} y1={runEnd.sy} x2={riseEnd.sx} y2={riseEnd.sy} stroke={SLOPE_COLOR} strokeWidth={2} strokeDasharray="4 3" />
          <text x={riseEnd.sx + 20} y={(runEnd.sy + riseEnd.sy) / 2 + 4} textAnchor={"middle" as const} fill={SLOPE_COLOR} fontSize={11} fontWeight="bold">
            {`rise=${m}`}
          </text>
        </g>
      )}
    </svg>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook — line being drawn                                   */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/LinearEquationsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4000),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 3)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: TEXT }}
        >
          Every line has a story
        </motion.h2>

        {phase >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CoordinateGrid m={2} b={1} showSlope={phase >= 2} />
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-center text-lg"
            style={{ color: MUTED }}
          >
            <span style={{ color: SLOPE_COLOR }}>{"Rise over run"}</span>
            {" tells you the slope. "}
            <span style={{ color: INTERCEPT_COLOR }}>{"Where it crosses y"}</span>
            {" is the intercept."}
          </motion.p>
        )}

        {phase >= 3 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial — m & b sliders                                   */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [m, setM] = useState(1);
  const [b, setB] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const handleM = useCallback((val: number) => {
    setM(val);
    setInteractions((c) => c + 1);
  }, []);

  const handleB = useCallback((val: number) => {
    setB(val);
    setInteractions((c) => c + 1);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Adjust slope and intercept
        </h2>

        <CoordinateGrid m={m} b={b} showSlope />

        {/* Equation display */}
        <div className="rounded-xl px-6 py-3 text-center" style={{ background: SURFACE }}>
          <p className="font-mono text-xl font-bold" style={{ color: TEXT }}>
            {"y = "}
            <span style={{ color: SLOPE_COLOR }}>{m}</span>
            {"x + "}
            <span style={{ color: INTERCEPT_COLOR }}>{b}</span>
          </p>
        </div>

        {/* Slope slider */}
        <div className="flex w-full max-w-xs items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: SLOPE_COLOR }}>m</span>
          <input
            type="range"
            min={-4}
            max={4}
            step={1}
            value={m}
            onChange={(e) => handleM(Number(e.target.value))}
            className="flex-1"
            style={{ accentColor: SLOPE_COLOR, minHeight: 44 }}
            aria-label="Slope slider"
          />
          <span className="font-mono text-sm tabular-nums" style={{ color: TEXT }}>{m}</span>
        </div>

        {/* Intercept slider */}
        <div className="flex w-full max-w-xs items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: INTERCEPT_COLOR }}>b</span>
          <input
            type="range"
            min={-5}
            max={5}
            step={1}
            value={b}
            onChange={(e) => handleB(Number(e.target.value))}
            className="flex-1"
            style={{ accentColor: INTERCEPT_COLOR, minHeight: 44 }}
            aria-label="Y-intercept slider"
          />
          <span className="font-mono text-sm tabular-nums" style={{ color: TEXT }}>{b}</span>
        </div>

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Discovery                                                 */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "The SLOPE (m) tells you how steep the line is. Positive slope goes up; negative slope goes down.", button: "I see it!" },
    { text: "Slope = rise \u00F7 run. If you go 1 step right (run) and the line goes up 2 (rise), the slope is 2.", button: "I see it!" },
    { text: "The Y-INTERCEPT (b) is where the line crosses the y-axis. That's the output when x = 0.", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const current = prompts[promptIdx]!;

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) setPromptIdx((i) => i + 1);
    else onContinue();
  }, [promptIdx, prompts.length, onContinue]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">
          {prompts.map((_, i) => (
            <div key={i} className="h-2 w-8 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: SURFACE }}
          >
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>{current.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Mini graph for current concept */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-64">
          <CoordinateGrid
            m={promptIdx === 0 ? 2 : promptIdx === 1 ? 2 : 0}
            b={promptIdx === 2 ? 3 : 0}
            showSlope={promptIdx <= 1}
          />
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAck}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white"
          style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}
        >
          {current.button}
        </motion.button>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 4: Symbol Bridge                                             */
/* ================================================================== */

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Slope-Intercept Form
        </h2>

        {/* Big equation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SPRING}
          className="rounded-2xl border-2 px-8 py-6 text-center"
          style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}
        >
          <p className="font-mono text-[clamp(24px,6vw,40px)] font-bold">
            <span style={{ color: TEXT }}>{"y = "}</span>
            <span style={{ color: SLOPE_COLOR }}>m</span>
            <span style={{ color: TEXT }}>{"x + "}</span>
            <span style={{ color: INTERCEPT_COLOR }}>b</span>
          </p>
        </motion.div>

        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="w-full rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
            <p className="font-bold" style={{ color: SLOPE_COLOR }}>m = slope (rate of change)</p>
            <p className="mt-1 text-sm" style={{ color: MUTED }}>How much y changes when x increases by 1</p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="w-full rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
            <p className="font-bold" style={{ color: INTERCEPT_COLOR }}>b = y-intercept (starting value)</p>
            <p className="mt-1 text-sm" style={{ color: MUTED }}>Where the line crosses the y-axis (when x = 0)</p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="w-full rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
            <p className="text-sm" style={{ color: MUTED }}>Example</p>
            <p className="font-mono text-lg font-bold" style={{ color: TEXT }}>
              {"y = "}
              <span style={{ color: SLOPE_COLOR }}>3</span>
              {"x + "}
              <span style={{ color: INTERCEPT_COLOR }}>2</span>
              {"  \u2192  slope 3, starts at 2"}
            </p>
          </motion.div>
        )}

        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World                                                */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "🚗", title: "Car Trip", desc: "You start 20 miles from home (b=20) and drive 60 mph (m=60). Distance = 60t + 20. After 3 hours: 200 miles." },
    { icon: "🔋", title: "Phone Battery", desc: "Battery at 100% drains 8% per hour. y = \u22128x + 100. Negative slope = decreasing!" },
    { icon: "💰", title: "Savings Account", desc: "Start with $50 (b=50), save $15/week (m=15). y = 15x + 50. After 10 weeks: $200." },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Linear Equations in Real Life
        </h2>
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="w-full rounded-xl p-4" style={{ background: SURFACE }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <ContinueButton onClick={onContinue} />
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 6: Practice                                                  */
/* ================================================================== */

interface PracticeProblem {
  id: number;
  layer: "recall" | "procedure" | "understanding";
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

const PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "recall", question: "In y = mx + b, what does m represent?", options: ["The y-intercept", "The slope", "The x-value", "The origin"], correctIndex: 1, feedback: "m is the slope\u2014the rate of change. It tells you how steep the line is." },
  { id: 2, layer: "recall", question: "In y = mx + b, what does b represent?", options: ["The slope", "The x-intercept", "The y-intercept", "The midpoint"], correctIndex: 2, feedback: "b is the y-intercept\u2014where the line crosses the y-axis (when x=0)." },
  { id: 3, layer: "recall", question: "A line with negative slope goes:", options: ["Up from left to right", "Down from left to right", "Horizontally", "Vertically"], correctIndex: 1, feedback: "Negative slope means the line falls as you move right. Think: downhill." },
  { id: 4, layer: "procedure", question: "What is the slope of y = 4x \u2212 3?", options: ["\u22123", "4", "3", "\u22124"], correctIndex: 1, feedback: "In y = 4x \u2212 3, the coefficient of x is 4. That's the slope." },
  { id: 5, layer: "procedure", question: "A line passes through (0,5) and (2,11). What is the slope?", options: ["3", "5", "6", "8"], correctIndex: 0, feedback: "slope = (11\u22125)/(2\u22120) = 6/2 = 3" },
  { id: 6, layer: "procedure", question: "Write the equation for slope=2, y-intercept=\u22121:", options: ["y = \u22121x + 2", "y = 2x \u2212 1", "y = 2x + 1", "y = x + 2"], correctIndex: 1, feedback: "Slope 2 and y-intercept \u22121 gives y = 2x + (\u22121) = 2x \u2212 1." },
  { id: 7, layer: "understanding", question: "Two lines have the same slope but different y-intercepts. They are:", options: ["Parallel (never cross)", "Perpendicular", "The same line", "Intersecting at one point"], correctIndex: 0, feedback: "Same slope = same steepness = parallel lines. They never meet!" },
  { id: 8, layer: "understanding", question: "If slope = 0, the line is:", options: ["Vertical", "Horizontal", "Diagonal", "Undefined"], correctIndex: 1, feedback: "Slope 0 means no rise: the line is perfectly horizontal (y = b)." },
  { id: 9, layer: "understanding", question: "You earn $12/hour plus a $20 bonus. Which equation models total pay (y) for hours (x)?", options: ["y = 20x + 12", "y = 12x + 20", "y = 32x", "y = 12x \u2212 20"], correctIndex: 1, feedback: "Rate = $12/hr (slope), starting bonus = $20 (intercept). y = 12x + 20." },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = PROBLEMS[currentIdx];

  const handleSelect = useCallback((optIdx: number) => {
    if (answered || !problem) return;
    setSelected(optIdx);
    setAnswered(true);
    if (optIdx === problem.correctIndex) setScore((s) => s + 1);
  }, [answered, problem]);

  const handleNext = useCallback(() => {
    setSelected(null);
    setAnswered(false);
    setCurrentIdx((i) => i + 1);
  }, []);

  if (done || !problem) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: TEXT }}>Practice Complete!</h2>
          <p className="text-lg" style={{ color: MUTED }}>{score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} />
        </div>
      </StageWrapper>
    );
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: MUTED }}>Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})</p>
        <div className="w-full rounded-xl p-6" style={{ background: SURFACE }}>
          <p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: TEXT }}>{problem.question}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex;
            const isSelected = i === selected;
            let bg = SURFACE;
            let border = BORDER;
            if (answered) {
              if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; }
              else if (isSelected) { bg = `${ERROR}20`; border = ERROR; }
            }
            return (
              <motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>
                {opt}
                {answered && isCorrect && <span style={{ color: SUCCESS }}>{" \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span style={{ color: ERROR }}>{" \u2717"}</span>}
              </motion.button>
            );
          })}
        </div>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-xl p-4" style={{ background: selected === problem.correctIndex ? `${SUCCESS}15` : `${ERROR}15` }}>
            <p className="text-sm leading-relaxed" style={{ color: TEXT }}>{problem.feedback}</p>
          </motion.div>
        )}
        {answered && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}>
            {"Next \u2192"}
          </motion.button>
        )}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">🧠</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Self-explanation strengthens your understanding. +50 XP</p>
          </motion.div>
          <ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} />
        </div>
      </StageWrapper>
    );
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>
          Think of a real-life situation that can be modeled by a linear equation. What are the slope and y-intercept?
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          className="w-full rounded-xl border-2 p-4 text-base"
          style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }}
          aria-label="Reflection text"
        />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setSubmitted(true)} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }}>Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main                                                               */
/* ================================================================== */

export function LinearEquationsLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGES[stageIdx + 1];
    if (next) setStage(next);
    else onComplete?.();
  }, [stageIdx, onComplete]);

  return (
    <div className="flex min-h-dvh flex-col" style={{ background: BG }}>
      <ProgressBar current={stageIdx} total={STAGES.length} />
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex-1">
          {stage === "hook" && <HookStage onContinue={advance} />}
          {stage === "spatial" && <SpatialStage onContinue={advance} />}
          {stage === "discovery" && <DiscoveryStage onContinue={advance} />}
          {stage === "symbol" && <SymbolBridgeStage onContinue={advance} />}
          {stage === "realWorld" && <RealWorldStage onContinue={advance} />}
          {stage === "practice" && <PracticeStage onContinue={advance} />}
          {stage === "reflection" && <ReflectionStage onContinue={advance} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
