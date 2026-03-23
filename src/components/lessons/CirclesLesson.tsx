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
  radius: "#818cf8",
  diameter: "#60a5fa",
  circumference: "#34d399",
  circumferenceFill: "#34d39933",
  pi: "#f59e0b",
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
const PI = Math.PI;
const PI_DISPLAY = "3.14159...";

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
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "The diameter of a circle is...",
    options: ["Half the radius", "Twice the radius", "Equal to the radius", "Twice the circumference"],
    correctAnswer: "Twice the radius", feedback: "Diameter goes all the way across through the center: d = 2r." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "Pi (\u03C0) is approximately...",
    options: ["2.14159", "3.14159", "3.41529", "4.14159"],
    correctAnswer: "3.14159", feedback: "Pi is the ratio of circumference to diameter, approximately 3.14159." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "Which formula gives circumference?",
    options: ["C = \u03C0 \u00D7 r", "C = \u03C0 \u00D7 d", "C = 2 \u00D7 d", "C = r \u00D7 d"],
    correctAnswer: "C = \u03C0 \u00D7 d", feedback: "Circumference equals pi times diameter." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "A circle has diameter 10. What is its circumference? (Use \u03C0 = 3.14, round to nearest tenth)",
    correctAnswer: "31.4", feedback: "C = \u03C0 \u00D7 d = 3.14 \u00D7 10 = 31.4" },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "A circle has radius 7. What is its circumference? (Use \u03C0 = 3.14, round to nearest tenth)",
    correctAnswer: "44.0", feedback: "C = 2 \u00D7 \u03C0 \u00D7 r = 2 \u00D7 3.14 \u00D7 7 = 43.96 \u2248 44.0" },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "A wheel has circumference 62.8 cm. What is its diameter? (Use \u03C0 = 3.14)",
    correctAnswer: "20", feedback: "d = C / \u03C0 = 62.8 / 3.14 = 20" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "If you double the radius, the circumference...",
    options: ["Stays the same", "Also doubles", "Quadruples", "Halves"],
    correctAnswer: "Also doubles", feedback: "C = 2\u03C0r. Double r means double C." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Why is \u03C0 the same for every circle?",
    options: [
      "Because all circles are the same shape, just different sizes",
      "Because \u03C0 is defined as exactly 3.14",
      "Because circumference and diameter are the same",
      "It actually changes for large circles",
    ],
    correctAnswer: "Because all circles are the same shape, just different sizes",
    feedback: "All circles are similar figures \u2014 the C/d ratio is a geometric constant." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "A tire rolls exactly one full turn. The distance traveled equals...",
    options: ["The radius", "The diameter", "The circumference", "2 \u00D7 diameter"],
    correctAnswer: "The circumference", feedback: "One rotation covers exactly one circumference of distance." },
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
  return <VideoHook src="/videos/CirclesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 1000));
    timers.push(setTimeout(() => setPhase(2), 2000));
    timers.push(setTimeout(() => setPhase(3), 3500));
    timers.push(setTimeout(() => setPhase(4), 5000));
    timers.push(setTimeout(() => setPhase(5), 6000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const svgW = 320;
  const svgH = 200;
  const wheelCx = 60;
  const wheelCy = 120;
  const wheelR = 30;
  const trailY = 155;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Circle rolling animation">
        {/* Wheel */}
        <motion.circle cx={wheelCx ?? 0} cy={wheelCy ?? 0} r={wheelR ?? 0}
          fill="none" stroke={COLORS.radius} strokeWidth={2}
          animate={{ cx: phase >= 1 ? 250 : wheelCx }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Trail (circumference unrolled) */}
        {phase >= 1 && (
          <motion.line x1={wheelCx} y1={trailY} x2={250} y2={trailY}
            stroke={COLORS.circumference} strokeWidth={3} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }} />
        )}

        {/* Diameter markers on trail */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {[0, 1, 2].map((i) => {
              const segWidth = (250 - wheelCx) / PI;
              const xStart = wheelCx + i * segWidth;
              return (
                <motion.line key={i} x1={xStart} y1={trailY - 8} x2={xStart} y2={trailY + 8}
                  stroke={COLORS.diameter} strokeWidth={2}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.3 }} />
              );
            })}
            <text x={(wheelCx + 250) / 2} y={trailY + 24}
              textAnchor={"middle" as const} fill={COLORS.diameter} fontSize={11}>
              Diameter fits ~3.14 times
            </text>
          </motion.g>
        )}

        {/* Pi symbol */}
        {phase >= 3 && (
          <motion.text x={svgW / 2} y={50} textAnchor={"middle" as const}
            fill={COLORS.pi} fontSize={36} fontWeight={800}
            initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}>
            {"\u03C0"}
          </motion.text>
        )}

        {phase >= 3 && (
          <motion.text x={svgW / 2} y={72} textAnchor={"middle" as const}
            fill={COLORS.pi} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            = {PI_DISPLAY}
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            No matter the circle size, this ratio never changes.
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
  const [radius, setRadius] = useState(5);
  const [interactions, setInteractions] = useState(0);
  const [activeLabel, setActiveLabel] = useState<"radius" | "diameter" | "circumference">("radius");
  const canContinue = interactions >= 8;

  const diameter = radius * 2;
  const circumference = Math.round(2 * PI * radius * 100) / 100;
  const ratio = Math.round((circumference / diameter) * 100000) / 100000;

  const svgW = 300;
  const svgH = 300;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const displayR = radius * 12;

  const handleRadiusChange = useCallback((newR: number) => {
    setRadius(newR);
    setInteractions((i) => i + 1);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust the radius and watch the measurements change
      </p>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Interactive circle">
        {/* Circle */}
        <motion.circle cx={cx ?? 0} cy={cy ?? 0} r={displayR ?? 0} fill="none"
          stroke={activeLabel === "circumference" ? COLORS.circumference : COLORS.radius}
          strokeWidth={activeLabel === "circumference" ? 4 : 2}
          animate={{ r: displayR }} transition={SPRING} />

        {/* Radius line */}
        {activeLabel === "radius" && (
          <motion.line x1={cx} y1={cy} x2={cx + displayR} y2={cy}
            stroke={COLORS.radius} strokeWidth={3} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
        )}

        {/* Diameter line */}
        {activeLabel === "diameter" && (
          <motion.line x1={cx - displayR} y1={cy} x2={cx + displayR} y2={cy}
            stroke={COLORS.diameter} strokeWidth={3} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
        )}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={3} fill={COLORS.textPrimary} />

        {/* Labels */}
        {activeLabel === "radius" && (
          <motion.text x={cx + displayR / 2} y={cy - 10} textAnchor={"middle" as const}
            fill={COLORS.radius} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            r = {radius}
          </motion.text>
        )}
        {activeLabel === "diameter" && (
          <motion.text x={cx} y={cy - 10} textAnchor={"middle" as const}
            fill={COLORS.diameter} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            d = {diameter}
          </motion.text>
        )}
        {activeLabel === "circumference" && (
          <motion.text x={cx} y={cy - displayR - 10} textAnchor={"middle" as const}
            fill={COLORS.circumference} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            C = {circumference}
          </motion.text>
        )}
      </svg>

      {/* Label selector */}
      <div className="flex gap-2 justify-center mb-3">
        {(["radius", "diameter", "circumference"] as const).map((lbl) => (
          <button key={lbl} onClick={() => { setActiveLabel(lbl); setInteractions((i) => i + 1); }}
            className="rounded-lg px-3 py-1 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: activeLabel === lbl ? (
                lbl === "radius" ? COLORS.radius : lbl === "diameter" ? COLORS.diameter : COLORS.circumference
              ) : COLORS.bgSurface,
              color: COLORS.textPrimary,
            }}>
            {lbl.charAt(0).toUpperCase() + lbl.slice(1)}
          </button>
        ))}
      </div>

      {/* Radius slider */}
      <div className="w-full max-w-xs flex items-center gap-3 mb-2">
        <button onClick={() => { if (radius > 1) handleRadiusChange(radius - 1); }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-xl"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
          aria-label="Decrease radius">
          {"\u2212"}
        </button>
        <div className="flex-1 text-center">
          <span className="font-mono font-bold text-lg tabular-nums" style={{ color: COLORS.textPrimary }}>
            r = {radius}
          </span>
        </div>
        <button onClick={() => { if (radius < 10) handleRadiusChange(radius + 1); }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-xl"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
          aria-label="Increase radius">
          +
        </button>
      </div>

      {/* Live values */}
      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: COLORS.bgSurface }}>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span style={{ color: COLORS.textMuted }}>Radius (r):</span>
          <span className="font-mono tabular-nums text-right" style={{ color: COLORS.radius }}>{radius}</span>
          <span style={{ color: COLORS.textMuted }}>Diameter (d):</span>
          <span className="font-mono tabular-nums text-right" style={{ color: COLORS.diameter }}>{diameter}</span>
          <span style={{ color: COLORS.textMuted }}>Circumference (C):</span>
          <span className="font-mono tabular-nums text-right" style={{ color: COLORS.circumference }}>{circumference}</span>
          <span style={{ color: COLORS.textMuted }}>C / d:</span>
          <span className="font-mono tabular-nums text-right font-bold" style={{ color: COLORS.pi }}>{ratio}</span>
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
    { text: "Watch the ratio C / d as you change the radius. It always stays at 3.14159... \u2014 that's \u03C0!", btn: "I see it!" },
    { text: "The diameter is always twice the radius: d = 2r. Simple but important!", btn: "I see it!" },
    { text: "Since C / d is always \u03C0, we can write C = \u03C0 \u00D7 d. And since d = 2r, that gives us C = 2\u03C0r!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mb-6">
        <circle cx={100} cy={100} r={60} fill="none" stroke={COLORS.circumference} strokeWidth={3} />
        <circle cx={100} cy={100} r={3} fill={COLORS.textPrimary} />
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={100} y1={100} x2={160} y2={100} stroke={COLORS.radius} strokeWidth={2} />
            <text x={130} y={92} textAnchor={"middle" as const} fill={COLORS.radius} fontSize={12}>r</text>
            <motion.text x={100} y={30} textAnchor={"middle" as const} fill={COLORS.pi} fontSize={18} fontWeight={700}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING}>
              C/d = {"\u03C0"}
            </motion.text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={40} y1={100} x2={160} y2={100} stroke={COLORS.diameter} strokeWidth={3} />
            <text x={100} y={92} textAnchor={"middle" as const} fill={COLORS.diameter} fontSize={14} fontWeight={600}>d = 2r</text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.text x={100} y={30} textAnchor={"middle" as const} fill={COLORS.circumference} fontSize={14} fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              C = {"\u03C0"}d = 2{"\u03C0"}r
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
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "C / d = \u03C0", desc: "The ratio of circumference to diameter", color: COLORS.pi },
    { formula: "C = \u03C0 \u00D7 d", desc: "Circumference from diameter", color: COLORS.circumference },
    { formula: "C = 2\u03C0r", desc: "Since d = 2r, substitute", color: COLORS.radius },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Circle Formulas
      </h2>
      <div className="space-y-6 w-full max-w-md">
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
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F6B2}", title: "Bicycle Wheel", desc: "A 26-inch wheel travels 26\u03C0 inches per rotation.", math: "C = \u03C0d" },
    { icon: "\u{1F355}", title: "Pizza", desc: "How much crust on a 14-inch pizza?", math: "C = \u03C0 \u00D7 14 \u2248 44 in" },
    { icon: "\u{1F552}", title: "Clock Face", desc: "The minute hand tip traces a circle every hour.", math: "C = 2\u03C0r" },
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
          In your own words, explain what {"\u03C0"} is and why it shows up in every circle formula.
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

export function CirclesLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>GE-4.5 Circles</span>
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
