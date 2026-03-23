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
  direct: "#60a5fa",
  directFill: "#60a5fa33",
  inverse: "#f59e0b",
  inverseFill: "#f59e0b33",
  constant: "#34d399",
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

interface PracticeProblem {
  id: number;
  layer: string;
  type: "multiple-choice" | "numeric-input";
  prompt: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "In direct variation y = kx, what happens to y when x doubles?",
    options: ["y doubles", "y halves", "y stays the same", "y squares"],
    correctAnswer: "y doubles",
    feedback: "In direct variation, y and x change by the same factor. If x doubles, y doubles too." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "In inverse variation y = k/x, what happens to y when x doubles?",
    options: ["y doubles", "y halves", "y stays the same", "y squares"],
    correctAnswer: "y halves",
    feedback: "In inverse variation, when x gets bigger, y gets smaller by the same factor." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "What is k called in both y = kx and y = k/x?",
    options: ["The variable", "The constant of variation", "The slope intercept", "The coefficient of x"],
    correctAnswer: "The constant of variation",
    feedback: "k is the constant of variation \u2014 it stays the same no matter which (x, y) pair you use." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "y varies directly with x. If y = 12 when x = 3, what is k?",
    correctAnswer: "4",
    feedback: "k = y / x = 12 / 3 = 4" },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "y varies directly with x and k = 5. What is y when x = 7?",
    correctAnswer: "35",
    feedback: "y = kx = 5 \u00D7 7 = 35" },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "y varies inversely with x. If y = 6 when x = 4, what is k?",
    correctAnswer: "24",
    feedback: "k = y \u00D7 x = 6 \u00D7 4 = 24" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Which graph shows direct variation?",
    options: ["A straight line through the origin", "A curve that never touches the axes", "A horizontal line", "A vertical line"],
    correctAnswer: "A straight line through the origin",
    feedback: "Direct variation y = kx is a line through (0, 0) with slope k." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Speed and travel time for a fixed distance are an example of...",
    options: ["Direct variation", "Inverse variation", "Neither"],
    correctAnswer: "Inverse variation",
    feedback: "Faster speed means less time: speed \u00D7 time = distance (constant), so t = d/s." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "If y = 3x, the point (0, 0) is on the graph. Why?",
    options: [
      "Because direct variation always passes through the origin",
      "Because k = 0",
      "Because x is always positive",
      "It actually is not on the graph",
    ],
    correctAnswer: "Because direct variation always passes through the origin",
    feedback: "When x = 0, y = k \u00D7 0 = 0 for any k. So (0, 0) is always on a direct variation graph." },
];

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

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/VariationHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2000));
    timers.push(setTimeout(() => setPhase(3), 3500));
    timers.push(setTimeout(() => setPhase(4), 5000));
    timers.push(setTimeout(() => setPhase(5), 6500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const svgW = 320;
  const svgH = 220;
  const marginL = 50;
  const marginB = 30;
  const plotW = 240;
  const plotH = 160;

  const directPoints = [0, 1, 2, 3, 4, 5].map((x) => ({
    x: marginL + (x / 5) * plotW,
    y: svgH - marginB - (x * 2 / 10) * plotH,
  }));

  const inversePoints = [1, 2, 3, 4, 5].map((x) => ({
    x: marginL + (x / 5) * plotW,
    y: svgH - marginB - (10 / x / 10) * plotH,
  }));

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Direct vs inverse variation">
        {/* Axes */}
        <line x1={marginL} y1={svgH - marginB} x2={marginL + plotW} y2={svgH - marginB}
          stroke={COLORS.textMuted} strokeWidth={1} />
        <line x1={marginL} y1={svgH - marginB} x2={marginL} y2={svgH - marginB - plotH}
          stroke={COLORS.textMuted} strokeWidth={1} />
        <text x={marginL + plotW / 2} y={svgH - 5} textAnchor={"middle" as const}
          fill={COLORS.textMuted} fontSize={12}>x</text>
        <text x={20} y={svgH - marginB - plotH / 2} textAnchor={"middle" as const}
          fill={COLORS.textMuted} fontSize={12}>y</text>

        {/* Direct line */}
        {phase >= 1 && (
          <motion.polyline
            points={directPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke={COLORS.direct} strokeWidth={3}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} />
        )}

        {phase >= 1 && (
          <motion.text x={marginL + plotW - 10} y={svgH - marginB - plotH + 20}
            textAnchor={"end" as const} fill={COLORS.direct} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            y = kx
          </motion.text>
        )}

        {/* Inverse curve */}
        {phase >= 2 && (
          <motion.polyline
            points={inversePoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke={COLORS.inverse} strokeWidth={3}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} />
        )}

        {phase >= 2 && (
          <motion.text x={marginL + plotW - 10} y={svgH - marginB - 20}
            textAnchor={"end" as const} fill={COLORS.inverse} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            y = k/x
          </motion.text>
        )}

        {/* Question */}
        {phase >= 3 && (
          <motion.text x={svgW / 2} y={25} textAnchor={"middle" as const}
            fill={COLORS.textPrimary} fontSize={15} fontWeight={700}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Two ways quantities relate
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            One grows together. One trades off. Both share a secret constant.
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
  const [k, setK] = useState(3);
  const [mode, setMode] = useState<"direct" | "inverse">("direct");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const svgW = 300;
  const svgH = 250;
  const marginL = 45;
  const marginB = 35;
  const plotW = 230;
  const plotH = 190;

  const xValues = mode === "direct" ? [0, 1, 2, 3, 4, 5] : [0.5, 1, 2, 3, 4, 5];
  const maxY = mode === "direct" ? k * 5 : k / 0.5;

  const points = xValues.map((x) => {
    const yVal = mode === "direct" ? k * x : k / x;
    return {
      x: marginL + (x / 5) * plotW,
      y: svgH - marginB - (yVal / maxY) * plotH,
      xVal: x,
      yVal: Math.round(yVal * 100) / 100,
    };
  });

  const handleK = useCallback((newK: number) => {
    setK(newK);
    setInteractions((i) => i + 1);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust k and switch between direct and inverse variation
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2 justify-center mb-3">
        {(["direct", "inverse"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setInteractions((i) => i + 1); }}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: mode === m ? (m === "direct" ? COLORS.direct : COLORS.inverse) : COLORS.bgSurface,
              color: COLORS.textPrimary,
            }}>
            {m === "direct" ? "Direct (y = kx)" : "Inverse (y = k/x)"}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Interactive variation graph">
        {/* Axes */}
        <line x1={marginL} y1={svgH - marginB} x2={marginL + plotW} y2={svgH - marginB}
          stroke={COLORS.textMuted} strokeWidth={1} />
        <line x1={marginL} y1={svgH - marginB} x2={marginL} y2={svgH - marginB - plotH}
          stroke={COLORS.textMuted} strokeWidth={1} />
        <text x={marginL + plotW / 2} y={svgH - 8} textAnchor={"middle" as const}
          fill={COLORS.textMuted} fontSize={11}>x</text>
        <text x={15} y={svgH - marginB - plotH / 2} textAnchor={"middle" as const}
          fill={COLORS.textMuted} fontSize={11}>y</text>

        {/* Curve/Line */}
        <motion.polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none" stroke={mode === "direct" ? COLORS.direct : COLORS.inverse}
          strokeWidth={3} strokeLinejoin="round" strokeLinecap="round"
          animate={{ d: "update" }} transition={SPRING} />

        {/* Points */}
        {points.map((p, i) => (
          <motion.circle key={`${mode}-${i}`} cx={p.x} cy={p.y} r={5}
            fill={mode === "direct" ? COLORS.direct : COLORS.inverse}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, ...SPRING }} />
        ))}

        {/* Formula */}
        <text x={marginL + plotW - 10} y={25} textAnchor={"end" as const}
          fill={mode === "direct" ? COLORS.direct : COLORS.inverse} fontSize={14} fontWeight={700}>
          {mode === "direct" ? `y = ${k}x` : `y = ${k}/x`}
        </text>
      </svg>

      {/* k slider */}
      <div className="w-full max-w-xs flex items-center gap-3 mb-2">
        <button onClick={() => { if (k > 1) handleK(k - 1); }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-xl"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
          aria-label="Decrease k">
          {"\u2212"}
        </button>
        <div className="flex-1 text-center">
          <span className="font-mono font-bold text-lg tabular-nums" style={{ color: COLORS.textPrimary }}>
            k = {k}
          </span>
        </div>
        <button onClick={() => { if (k < 10) handleK(k + 1); }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-xl"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
          aria-label="Increase k">
          +
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: COLORS.bgSurface }}>
        <div className="grid grid-cols-3 gap-1 text-sm text-center">
          <span style={{ color: COLORS.textMuted }}>x</span>
          <span style={{ color: COLORS.textMuted }}>y</span>
          <span style={{ color: COLORS.textMuted }}>{mode === "direct" ? "y/x" : "x \u00D7 y"}</span>
          {points.slice(mode === "direct" ? 1 : 0, 5).map((p) => {
            const ratio = mode === "direct"
              ? (p.xVal !== 0 ? Math.round((p.yVal / p.xVal) * 100) / 100 : 0)
              : Math.round(p.xVal * p.yVal * 100) / 100;
            return (
              <motion.div key={p.xVal} className="contents" layout>
                <span className="font-mono tabular-nums" style={{ color: COLORS.textPrimary }}>{p.xVal}</span>
                <span className="font-mono tabular-nums" style={{ color: mode === "direct" ? COLORS.direct : COLORS.inverse }}>
                  {p.yVal}
                </span>
                <span className="font-mono tabular-nums font-bold" style={{ color: COLORS.constant }}>
                  {ratio}
                </span>
              </motion.div>
            );
          })}
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
    { text: "In direct variation, the ratio y/x is always the same. That constant is k!", btn: "I see it!" },
    { text: "In inverse variation, the product x \u00D7 y is always the same. That constant is also k!", btn: "I see it!" },
    { text: "Direct: as x grows, y grows. Inverse: as x grows, y shrinks. The constant k ties them together.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 260 120" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={30} y1={100} x2={230} y2={20} stroke={COLORS.direct} strokeWidth={3} />
            <text x={130} y={15} textAnchor={"middle" as const} fill={COLORS.direct} fontSize={16} fontWeight={700}>
              y/x = k
            </text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M30,20 Q80,20 130,60 T230,95" fill="none" stroke={COLORS.inverse} strokeWidth={3} />
            <text x={130} y={15} textAnchor={"middle" as const} fill={COLORS.inverse} fontSize={16} fontWeight={700}>
              x {"\u00D7"} y = k
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={30} y1={100} x2={120} y2={25} stroke={COLORS.direct} strokeWidth={2} />
            <path d="M140,20 Q170,20 200,60 T230,90" fill="none" stroke={COLORS.inverse} strokeWidth={2} />
            <motion.text x={130} y={60} textAnchor={"middle" as const} fill={COLORS.constant}
              fontSize={28} fontWeight={800}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING}>
              k
            </motion.text>
          </motion.g>
        )}
      </svg>

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
    timers.push(setTimeout(() => setRevealed(1), 1500));
    timers.push(setTimeout(() => setRevealed(2), 3500));
    timers.push(setTimeout(() => setRevealed(3), 5500));
    timers.push(setTimeout(() => setRevealed(4), 7000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "y = kx", desc: "Direct variation \u2014 y is proportional to x", color: COLORS.direct },
    { formula: "k = y / x", desc: "Find k by dividing any y by its x", color: COLORS.direct },
    { formula: "y = k / x", desc: "Inverse variation \u2014 y is inversely proportional to x", color: COLORS.inverse },
    { formula: "k = x \u00D7 y", desc: "Find k by multiplying any x \u00D7 y pair", color: COLORS.inverse },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Variation Formulas
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4"
                style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>{n.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= 4 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F697}", title: "Earnings & Hours", desc: "Work more hours, earn more pay: pay = rate \u00D7 hours.", math: "Direct: y = kx" },
    { icon: "\u{1F3D7}\uFE0F", title: "Workers & Time", desc: "More workers finish a job in less time.", math: "Inverse: y = k/x" },
    { icon: "\u26FD", title: "Speed & Travel Time", desc: "Drive faster and the trip takes less time for the same distance.", math: "Inverse: time = distance/speed" },
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
          Give a real-life example of direct variation and one of inverse variation. What makes them different?
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

export function VariationLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx] ?? ("hook" as Stage);

  const advanceStage = useCallback(() => {
    setStageIdx((i) => {
      const next = i + 1;
      if (next >= STAGES.length) { onComplete?.(); return i; }
      return next;
    });
  }, [onComplete]);

  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2"
        style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>AL-3.14 Variation</span>
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
