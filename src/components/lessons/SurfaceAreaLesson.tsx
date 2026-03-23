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
  face: "#60a5fa",
  faceFill: "#60a5fa33",
  net: "#34d399",
  netFill: "#34d39933",
  cylinder: "#f59e0b",
  cylinderFill: "#f59e0b33",
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
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Surface area measures...",
    options: ["The 3D space inside a solid", "The total area of all outside faces", "The perimeter of the base", "The weight of a solid"],
    correctAnswer: "The total area of all outside faces",
    feedback: "Surface area is the sum of the areas of every face/surface on the outside." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "A rectangular prism has how many faces?",
    options: ["4", "5", "6", "8"],
    correctAnswer: "6",
    feedback: "A box has 6 faces: top, bottom, front, back, left, right." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "Surface area of a rectangular prism is...",
    options: ["lwh", "2(lw + lh + wh)", "6lw", "2lw + 2lh"],
    correctAnswer: "2(lw + lh + wh)",
    feedback: "SA = 2(lw + lh + wh) \u2014 three pairs of equal faces." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "A rectangular prism is 4 \u00D7 3 \u00D7 5. What is its surface area?",
    correctAnswer: "94",
    feedback: "SA = 2(4\u00D73 + 4\u00D75 + 3\u00D75) = 2(12+20+15) = 2(47) = 94" },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "A cube has side length 6. What is its surface area?",
    correctAnswer: "216",
    feedback: "SA = 6s\u00B2 = 6 \u00D7 36 = 216" },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "A cylinder has radius 3 and height 5. What is its surface area? (Use \u03C0 = 3.14, round to nearest tenth)",
    correctAnswer: "150.7",
    feedback: "SA = 2\u03C0r\u00B2 + 2\u03C0rh = 2(3.14)(9) + 2(3.14)(3)(5) = 56.52 + 94.2 = 150.72 \u2248 150.7" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Why does unfolding a 3D shape (making a net) help find surface area?",
    options: [
      "Because you can see and measure every face as a flat shape",
      "Because it changes the volume",
      "Because 3D shapes don't have area",
      "It doesn't help at all",
    ],
    correctAnswer: "Because you can see and measure every face as a flat shape",
    feedback: "A net lays all faces flat so you can calculate each area separately, then add them up." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "If you double all dimensions of a cube, the surface area...",
    options: ["Doubles", "Triples", "Quadruples", "Multiplies by 8"],
    correctAnswer: "Quadruples",
    feedback: "SA = 6s\u00B2. Double s gives 6(2s)\u00B2 = 6 \u00D7 4s\u00B2 = 4 times the original." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "You want to wrap a gift box. Do you need volume or surface area?",
    options: ["Volume", "Surface area"],
    correctAnswer: "Surface area",
    feedback: "Wrapping covers the outside \u2014 that's surface area!" },
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
  return <VideoHook src="/videos/GE4_7aHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2200));
    timers.push(setTimeout(() => setPhase(3), 4000));
    timers.push(setTimeout(() => setPhase(4), 5500));
    timers.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const svgW = 320;
  const svgH = 240;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Unfolding a box into a net">
        {/* Closed box */}
        {phase < 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={110} y={70} width={100} height={80}
              fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={2} rx={2} />
            {/* 3D edges */}
            <line x1={110} y1={70} x2={130} y2={50} stroke={COLORS.face} strokeWidth={1.5} />
            <line x1={210} y1={70} x2={230} y2={50} stroke={COLORS.face} strokeWidth={1.5} />
            <line x1={130} y1={50} x2={230} y2={50} stroke={COLORS.face} strokeWidth={1.5} />
            <line x1={210} y1={70} x2={210} y2={150} stroke={COLORS.face} strokeWidth={2} />
            <line x1={230} y1={50} x2={230} y2={130} stroke={COLORS.face} strokeWidth={1.5} />
            <line x1={210} y1={150} x2={230} y2={130} stroke={COLORS.face} strokeWidth={1.5} />
            <text x={160} y={185} textAnchor={"middle" as const} fill={COLORS.textPrimary} fontSize={14} fontWeight={600}>
              A gift box
            </text>
          </motion.g>
        )}

        {/* Net (unfolded) */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            {/* Cross-shaped net */}
            <rect x={120} y={10} width={80} height={50} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={1.5} />
            <rect x={40} y={60} width={80} height={50} fill={COLORS.netFill} stroke={COLORS.net} strokeWidth={1.5} />
            <rect x={120} y={60} width={80} height={50} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={1.5} />
            <rect x={200} y={60} width={80} height={50} fill={COLORS.netFill} stroke={COLORS.net} strokeWidth={1.5} />
            <rect x={120} y={110} width={80} height={50} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={1.5} />
            <rect x={120} y={160} width={80} height={50} fill={COLORS.netFill} stroke={COLORS.net} strokeWidth={1.5} />
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.text x={svgW / 2} y={230} textAnchor={"middle" as const}
            fill={COLORS.textSecondary} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Unfold it {"\u2192"} measure each face {"\u2192"} add them up
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            How much wrapping paper do you need?
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
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(5);
  const [highlighted, setHighlighted] = useState<"top" | "front" | "side">("top");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const topArea = length * width;
  const frontArea = length * height;
  const sideArea = width * height;
  const sa = 2 * (topArea + frontArea + sideArea);

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust dimensions and highlight each face pair
      </p>

      {/* Face selector */}
      <div className="flex gap-2 justify-center mb-3">
        {(["top", "front", "side"] as const).map((f) => (
          <button key={f} onClick={() => { setHighlighted(f); interact(); }}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: highlighted === f ? COLORS.face : COLORS.bgSurface,
              color: COLORS.textPrimary,
            }}>
            {f === "top" ? `Top/Bottom (${topArea})` : f === "front" ? `Front/Back (${frontArea})` : `Left/Right (${sideArea})`}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 280 180" className="w-full max-w-xs" aria-label="Interactive rectangular prism net">
        {/* Simplified net */}
        <rect x={90} y={5} width={length * 16} height={width * 16}
          fill={highlighted === "top" ? COLORS.faceFill : "transparent"}
          stroke={highlighted === "top" ? COLORS.face : COLORS.textMuted} strokeWidth={highlighted === "top" ? 2.5 : 1} />
        <rect x={10} y={5 + width * 16} width={width * 16} height={height * 16}
          fill={highlighted === "side" ? COLORS.netFill : "transparent"}
          stroke={highlighted === "side" ? COLORS.net : COLORS.textMuted} strokeWidth={highlighted === "side" ? 2.5 : 1} />
        <rect x={90} y={5 + width * 16} width={length * 16} height={height * 16}
          fill={highlighted === "front" ? COLORS.cylinderFill : "transparent"}
          stroke={highlighted === "front" ? COLORS.cylinder : COLORS.textMuted} strokeWidth={highlighted === "front" ? 2.5 : 1} />
        <rect x={90} y={5 + width * 16 + height * 16} width={length * 16} height={width * 16}
          fill={highlighted === "top" ? COLORS.faceFill : "transparent"}
          stroke={highlighted === "top" ? COLORS.face : COLORS.textMuted} strokeWidth={highlighted === "top" ? 2.5 : 1} />
      </svg>

      {/* Dimension controls */}
      <div className="w-full max-w-xs space-y-2 mb-2">
        {([["Length", length, setLength] as const, ["Width", width, setWidth] as const, ["Height", height, setHeight] as const]).map(([label, val, setter]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs w-14" style={{ color: COLORS.textMuted }}>{label}</span>
            <button onClick={() => { if (val > 1) { setter(val - 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
              style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>
              {"\u2212"}
            </button>
            <span className="font-mono font-bold tabular-nums flex-1 text-center" style={{ color: COLORS.textPrimary }}>
              {val}
            </span>
            <button onClick={() => { if (val < 8) { setter(val + 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
              style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>
              +
            </button>
          </div>
        ))}
      </div>

      {/* Calculation */}
      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: COLORS.bgSurface }}>
        <p className="font-mono text-sm text-center" style={{ color: COLORS.textPrimary }}>
          SA = 2({topArea} + {frontArea} + {sideArea}) = <span className="font-bold" style={{ color: COLORS.primary }}>{sa}</span>
        </p>
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
    { text: "A rectangular prism has 3 pairs of identical faces. That's why we multiply by 2: SA = 2(lw + lh + wh).", btn: "I see it!" },
    { text: "A cylinder's surface unrolls into two circles and a rectangle. The rectangle's width is the circumference!", btn: "I see it!" },
    { text: "Surface area is always in square units \u2014 even for curved surfaces. We're measuring area, not volume.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 260 130" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Three face pairs */}
            <rect x={10} y={10} width={60} height={40} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={2} />
            <rect x={10} y={60} width={60} height={40} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={2} />
            <text x={40} y={115} textAnchor={"middle" as const} fill={COLORS.face} fontSize={10}>top/bottom</text>
            <rect x={90} y={10} width={40} height={60} fill={COLORS.netFill} stroke={COLORS.net} strokeWidth={2} />
            <rect x={90} y={75} width={40} height={25} fill={COLORS.netFill} stroke={COLORS.net} strokeWidth={2} />
            <text x={110} y={115} textAnchor={"middle" as const} fill={COLORS.net} fontSize={10}>front/back</text>
            <rect x={150} y={10} width={40} height={60} fill={COLORS.cylinderFill} stroke={COLORS.cylinder} strokeWidth={2} />
            <rect x={150} y={75} width={40} height={25} fill={COLORS.cylinderFill} stroke={COLORS.cylinder} strokeWidth={2} />
            <text x={170} y={115} textAnchor={"middle" as const} fill={COLORS.cylinder} fontSize={10}>left/right</text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={40} cy={30} r={20} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={2} />
            <circle cx={40} cy={100} r={20} fill={COLORS.faceFill} stroke={COLORS.face} strokeWidth={2} />
            <rect x={80} y={15} width={160} height={50} fill={COLORS.netFill} stroke={COLORS.net} strokeWidth={2} />
            <text x={160} y={90} textAnchor={"middle" as const} fill={COLORS.net} fontSize={11}>
              width = 2{"\u03C0"}r
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.text x={130} y={65} textAnchor={"middle" as const} fill={COLORS.primary}
              fontSize={20} fontWeight={700}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING}>
              square units (cm{"\u00B2"}, m{"\u00B2"}, ...)
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
    { formula: "SA = 2(lw + lh + wh)", desc: "Rectangular prism: 3 pairs of rectangular faces", color: COLORS.face },
    { formula: "SA = 2\u03C0r\u00B2 + 2\u03C0rh", desc: "Cylinder: two circles + one rectangle", color: COLORS.net },
    { formula: "SA = 6s\u00B2", desc: "Cube: six identical square faces", color: COLORS.cylinder },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Surface Area Formulas
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
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F381}", title: "Gift Wrapping", desc: "How much paper to wrap a box? Surface area tells you.", math: "SA = 2(lw + lh + wh)" },
    { icon: "\u{1F3E0}", title: "Painting a Room", desc: "The wall area determines how much paint you need.", math: "Sum of wall areas" },
    { icon: "\u{1F96B}", title: "Tin Can Label", desc: "The label wraps around the curved surface: 2\u03C0rh.", math: "Lateral SA of cylinder" },
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
          How is surface area different from volume? When would you use each in real life?
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

export function SurfaceAreaLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>GE-4.7a Surface Area</span>
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
