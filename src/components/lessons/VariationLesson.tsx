"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/* ── Lesson-specific semantic colors ── */
const THEME = {
  direct: colors.functional.info,
  inverse: "#f59e0b",
  constant: colors.accent.emerald,
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/VariationHook.webm" onComplete={onContinue} />;

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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Direct vs inverse variation">
        {/* Axes */}
        <line x1={marginL} y1={svgH - marginB} x2={marginL + plotW} y2={svgH - marginB}
          stroke={MUTED} strokeWidth={1} />
        <line x1={marginL} y1={svgH - marginB} x2={marginL} y2={svgH - marginB - plotH}
          stroke={MUTED} strokeWidth={1} />
        <text x={marginL + plotW / 2} y={svgH - 5} textAnchor={"middle" as const}
          fill={MUTED} fontSize={12}>x</text>
        <text x={20} y={svgH - marginB - plotH / 2} textAnchor={"middle" as const}
          fill={MUTED} fontSize={12}>y</text>

        {/* Direct line */}
        {phase >= 1 && (
          <motion.polyline
            points={directPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke={THEME.direct} strokeWidth={3}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} />
        )}

        {phase >= 1 && (
          <motion.text x={marginL + plotW - 10} y={svgH - marginB - plotH + 20}
            textAnchor={"end" as const} fill={THEME.direct} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            y = kx
          </motion.text>
        )}

        {/* Inverse curve */}
        {phase >= 2 && (
          <motion.polyline
            points={inversePoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke={THEME.inverse} strokeWidth={3}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} />
        )}

        {phase >= 2 && (
          <motion.text x={marginL + plotW - 10} y={svgH - marginB - 20}
            textAnchor={"end" as const} fill={THEME.inverse} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            y = k/x
          </motion.text>
        )}

        {/* Question */}
        {phase >= 3 && (
          <motion.text x={svgW / 2} y={25} textAnchor={"middle" as const}
            fill={TEXT} fontSize={15} fontWeight={700}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Two ways quantities relate
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            One grows together. One trades off. Both share a secret constant.
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 5 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onContinue }: { onContinue: () => void }) {
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
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust k and switch between direct and inverse variation
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2 justify-center mb-3">
        {(["direct", "inverse"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setInteractions((i) => i + 1); }}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: mode === m ? (m === "direct" ? THEME.direct : THEME.inverse) : SURFACE,
              color: TEXT,
            }}>
            {m === "direct" ? "Direct (y = kx)" : "Inverse (y = k/x)"}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Interactive variation graph">
        {/* Axes */}
        <line x1={marginL} y1={svgH - marginB} x2={marginL + plotW} y2={svgH - marginB}
          stroke={MUTED} strokeWidth={1} />
        <line x1={marginL} y1={svgH - marginB} x2={marginL} y2={svgH - marginB - plotH}
          stroke={MUTED} strokeWidth={1} />
        <text x={marginL + plotW / 2} y={svgH - 8} textAnchor={"middle" as const}
          fill={MUTED} fontSize={11}>x</text>
        <text x={15} y={svgH - marginB - plotH / 2} textAnchor={"middle" as const}
          fill={MUTED} fontSize={11}>y</text>

        {/* Curve/Line */}
        <motion.polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none" stroke={mode === "direct" ? THEME.direct : THEME.inverse}
          strokeWidth={3} strokeLinejoin="round" strokeLinecap="round"
          animate={{ d: "update" }} transition={SPRING} />

        {/* Points */}
        {points.map((p, i) => (
          <motion.circle key={`${mode}-${i}`} cx={p.x} cy={p.y} r={5}
            fill={mode === "direct" ? THEME.direct : THEME.inverse}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, ...SPRING }} />
        ))}

        {/* Formula */}
        <text x={marginL + plotW - 10} y={25} textAnchor={"end" as const}
          fill={mode === "direct" ? THEME.direct : THEME.inverse} fontSize={14} fontWeight={700}>
          {mode === "direct" ? `y = ${k}x` : `y = ${k}/x`}
        </text>
      </svg>

      {/* k slider */}
      <div className="w-full max-w-xs flex items-center gap-3 mb-2">
        <button onClick={() => { if (k > 1) handleK(k - 1); }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-xl"
          style={{ backgroundColor: SURFACE, color: TEXT }}
          aria-label="Decrease k">
          {"\u2212"}
        </button>
        <div className="flex-1 text-center">
          <span className="font-mono font-bold text-lg tabular-nums" style={{ color: TEXT }}>
            k = {k}
          </span>
        </div>
        <button onClick={() => { if (k < 10) handleK(k + 1); }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-xl"
          style={{ backgroundColor: SURFACE, color: TEXT }}
          aria-label="Increase k">
          +
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: SURFACE }}>
        <div className="grid grid-cols-3 gap-1 text-sm text-center">
          <span style={{ color: MUTED }}>x</span>
          <span style={{ color: MUTED }}>y</span>
          <span style={{ color: MUTED }}>{mode === "direct" ? "y/x" : "x \u00D7 y"}</span>
          {points.slice(mode === "direct" ? 1 : 0, 5).map((p) => {
            const ratio = mode === "direct"
              ? (p.xVal !== 0 ? Math.round((p.yVal / p.xVal) * 100) / 100 : 0)
              : Math.round(p.xVal * p.yVal * 100) / 100;
            return (
              <motion.div key={p.xVal} className="contents" layout>
                <span className="font-mono tabular-nums" style={{ color: TEXT }}>{p.xVal}</span>
                <span className="font-mono tabular-nums" style={{ color: mode === "direct" ? THEME.direct : THEME.inverse }}>
                  {p.yVal}
                </span>
                <span className="font-mono tabular-nums font-bold" style={{ color: THEME.constant }}>
                  {ratio}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 8)} total={8} activeColor={PRIMARY} />
      </div>
      {canContinue && <ContinueButton onClick={onContinue} />}
    </section>
  );
}

// ===========================================================================
// STAGE 3: DISCOVERY
// ===========================================================================

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  const prompts = useMemo(() => [
    { text: "In direct variation, the ratio y/x is always the same. That constant is k!", btn: "I see it!" },
    { text: "In inverse variation, the product x \u00D7 y is always the same. That constant is also k!", btn: "I see it!" },
    { text: "Direct: as x grows, y grows. Inverse: as x grows, y shrinks. The constant k ties them together.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox="0 0 260 120" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={30} y1={100} x2={230} y2={20} stroke={THEME.direct} strokeWidth={3} />
            <text x={130} y={15} textAnchor={"middle" as const} fill={THEME.direct} fontSize={16} fontWeight={700}>
              y/x = k
            </text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M30,20 Q80,20 130,60 T230,95" fill="none" stroke={THEME.inverse} strokeWidth={3} />
            <text x={130} y={15} textAnchor={"middle" as const} fill={THEME.inverse} fontSize={16} fontWeight={700}>
              x {"\u00D7"} y = k
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={30} y1={100} x2={120} y2={25} stroke={THEME.direct} strokeWidth={2} />
            <path d="M140,20 Q170,20 200,60 T230,90" fill="none" stroke={THEME.inverse} strokeWidth={2} />
            <motion.text x={130} y={60} textAnchor={"middle" as const} fill={THEME.constant}
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
            style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            {current.text}
          </p>
          <Button size="lg"
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
            className="min-w-[140px]" style={{ backgroundColor: PRIMARY }}>
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

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
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
    { formula: "y = kx", desc: "Direct variation \u2014 y is proportional to x", color: THEME.direct },
    { formula: "k = y / x", desc: "Find k by dividing any y by its x", color: THEME.direct },
    { formula: "y = k / x", desc: "Inverse variation \u2014 y is inversely proportional to x", color: THEME.inverse },
    { formula: "k = x \u00D7 y", desc: "Find k by multiplying any x \u00D7 y pair", color: THEME.inverse },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Variation Formulas
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4"
                style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: MUTED }}>{n.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= 4 && <ContinueButton onClick={onContinue} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F697}", title: "Earnings & Hours", desc: "Work more hours, earn more pay: pay = rate \u00D7 hours.", math: "Direct: y = kx" },
    { icon: "\u{1F3D7}\uFE0F", title: "Workers & Time", desc: "More workers finish a job in less time.", math: "Inverse: y = k/x" },
    { icon: "\u26FD", title: "Speed & Travel Time", desc: "Drive faster and the trip takes less time for the same distance.", math: "Inverse: time = distance/speed" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Real World Connections
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }}
            className="rounded-xl p-4 flex gap-3 items-start"
            style={{ backgroundColor: SURFACE }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
              <p className="text-sm" style={{ color: TEXT_SEC }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: PRIMARY }}>{s.math}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onContinue} delay={0.3} />
    </section>
  );
}

// ===========================================================================
// STAGE 6: PRACTICE
// ===========================================================================

function PracticeStage({ onContinue }: { onContinue: () => void }) {
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
    if (isLast) { onContinue(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false);
  }, [isLast, onContinue]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i];
          let bg: string = ELEVATED;
          if (r === true) bg = SUCCESS;
          else if (r === false) bg = ERROR;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg,
              border: i === currentQ ? `2px solid ${PRIMARY}` : "none" }} />;
        })}
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: MUTED }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}
        </p>
        <p className="text-center font-medium mb-6"
          style={{ color: TEXT, fontSize: "clamp(15px, 3.5vw, 18px)" }}>
          {problem.prompt}
        </p>

        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2 w-full">
            {problem.options.map((opt) => {
              let bg: string = SURFACE; let border: string = ELEVATED;
              if (submitted) {
                if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; }
                else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; }
              } else if (opt === selected) { bg = "#8b5cf633"; border = PRIMARY; }
              return (
                <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                  disabled={submitted}
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
                  style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }}>
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
            style={{ backgroundColor: SURFACE, color: TEXT,
              border: `2px solid ${submitted ? (isCorrect ? SUCCESS : ERROR) : ELEVATED}`,
              outline: "none" }} />
        )}

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120",
                border: `1px solid ${isCorrect ? SUCCESS : ERROR}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? SUCCESS : ERROR }}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm" style={{ color: TEXT_SEC }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: userAnswer ? 1 : 0.4 }}>
              Check Answer
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: PRIMARY }}>
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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6"
          style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Give a real-life example of direct variation and one of inverse variation. What makes them different?
        </p>

        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: SURFACE, color: TEXT,
                border: `2px solid ${ELEVATED}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right"
              style={{ color: text.trim().length >= 20 ? SUCCESS : MUTED }}>
              {text.trim().length}/20 characters minimum
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING} className="rounded-xl p-6 text-center"
            style={{ backgroundColor: SURFACE }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>
              Reflecting on concepts deepens your understanding.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>
              Submit Reflection
            </Button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>
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
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);

  return (
    <LessonShell title="AL-3.14 Variation" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onContinue={advance} />;
          case "spatial": return <SpatialStage onContinue={advance} />;
          case "discovery": return <DiscoveryStage onContinue={advance} />;
          case "symbol": return <SymbolBridgeStage onContinue={advance} />;
          case "realWorld": return <RealWorldStage onContinue={advance} />;
          case "practice": return <PracticeStage onContinue={advance} />;
          case "reflection": return <ReflectionStage onComplete={handleReflectionComplete} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
