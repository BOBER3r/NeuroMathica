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
  perimeter: "#60a5fa",
  perimeterFill: "#60a5fa33",
  area: "#34d399",
  areaFill: "#34d39933",
  triangle: "#f59e0b",
  triangleFill: "#f59e0b33",
  circle: "#818cf8",
  circleFill: "#818cf833",
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

type ShapeType = "rectangle" | "triangle" | "circle";

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
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Perimeter measures...",
    options: ["The space inside a shape", "The distance around a shape", "The number of sides", "The weight of a shape"],
    correctAnswer: "The distance around a shape",
    feedback: "Perimeter is the total length of all sides \u2014 the path around the edge." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "Area is measured in...",
    options: ["Centimeters", "Square units", "Cubic units", "Degrees"],
    correctAnswer: "Square units",
    feedback: "Area counts how many unit squares fit inside, so we use square units." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "The formula for rectangle area is...",
    options: ["A = length + width", "A = length \u00D7 width", "A = 2 \u00D7 length \u00D7 width", "A = length \u00D7 width / 2"],
    correctAnswer: "A = length \u00D7 width",
    feedback: "Multiply length times width to get the number of unit squares." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "A rectangle is 6 by 9. What is its perimeter?",
    correctAnswer: "30",
    feedback: "P = 2(6) + 2(9) = 12 + 18 = 30" },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "A rectangle is 6 by 9. What is its area?",
    correctAnswer: "54",
    feedback: "A = 6 \u00D7 9 = 54" },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "A triangle has base 10 and height 6. What is its area?",
    correctAnswer: "30",
    feedback: "A = (1/2) \u00D7 10 \u00D7 6 = 30" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Two rectangles have the same perimeter. Must they have the same area?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    feedback: "A 1\u00D79 and 5\u00D75 rectangle both have P=20, but areas are 9 and 25." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "You need to buy fencing. Do you need area or perimeter?",
    options: ["Area", "Perimeter"],
    correctAnswer: "Perimeter",
    feedback: "Fencing goes around the outside \u2014 that's perimeter!" },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Why is triangle area half of base \u00D7 height?",
    options: [
      "Because a triangle is half of a rectangle",
      "Because triangles have 3 sides",
      "Because the height is always half the base",
      "Because triangles are smaller than rectangles",
    ],
    correctAnswer: "Because a triangle is half of a rectangle",
    feedback: "Cut a rectangle along its diagonal and you get two triangles." },
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
  return <VideoHook src="/videos/AreaPerimeterHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 1000));
    timers.push(setTimeout(() => setPhase(2), 2500));
    timers.push(setTimeout(() => setPhase(3), 4000));
    timers.push(setTimeout(() => setPhase(4), 5500));
    timers.push(setTimeout(() => setPhase(5), 6500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const rectX = 60;
  const rectY = 60;
  const rectW = 180;
  const rectH = 100;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 300 220" className="w-full max-w-md" aria-label="Area vs perimeter animation">
        {/* Rectangle (yard) */}
        <rect x={rectX} y={rectY} width={rectW} height={rectH}
          fill="none" stroke={COLORS.textMuted} strokeWidth={1} />

        {/* House icon */}
        <rect x={120} y={90} width={60} height={50} fill={COLORS.bgElevated} stroke={COLORS.textMuted} strokeWidth={1} />
        <polygon points="120,90 150,65 180,90" fill={COLORS.bgElevated} stroke={COLORS.textMuted} strokeWidth={1} />

        {/* Perimeter highlight (ant walking) */}
        {phase >= 1 && (
          <motion.rect x={rectX} y={rectY} width={rectW} height={rectH}
            fill="none" stroke={COLORS.perimeter} strokeWidth={3}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }} />
        )}

        {/* Perimeter label */}
        {phase >= 1 && (
          <motion.text x={150} y={180} textAnchor={"middle" as const}
            fill={COLORS.perimeter} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            Perimeter = fencing
          </motion.text>
        )}

        {/* Area fill */}
        {phase >= 2 && (
          <motion.rect x={rectX + 1} y={rectY + 1} width={rectW - 2} height={rectH - 2}
            fill={COLORS.areaFill} stroke="none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
        )}

        {/* Area label */}
        {phase >= 2 && (
          <motion.text x={150} y={200} textAnchor={"middle" as const}
            fill={COLORS.area} fontSize={13} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Area = grass inside
          </motion.text>
        )}

        {/* Numbers */}
        {phase >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={150} y={50} textAnchor={"middle" as const} fill={COLORS.textPrimary} fontSize={14} fontWeight={700}>
              P = 40 ft
            </text>
            <text x={150} y={40} textAnchor={"middle" as const} fill={COLORS.textPrimary} fontSize={14} fontWeight={700}>
              A = 96 sq ft
            </text>
          </motion.g>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Same yard. Two different questions. Two different answers.
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
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(4);
  const [shape, setShape] = useState<ShapeType>("rectangle");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 10;

  const perimeter = useMemo(() => {
    if (shape === "rectangle") return 2 * width + 2 * height;
    if (shape === "triangle") return width + height + Math.round(Math.sqrt(width * width + height * height) * 10) / 10;
    return Math.round(2 * Math.PI * width * 100) / 100;
  }, [shape, width, height]);

  const area = useMemo(() => {
    if (shape === "rectangle") return width * height;
    if (shape === "triangle") return Math.round((width * height) / 2 * 10) / 10;
    return Math.round(Math.PI * width * width * 100) / 100;
  }, [shape, width, height]);

  const svgW = 280;
  const svgH = 200;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const scaleW = width * 15;
  const scaleH = height * 15;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust dimensions and switch shapes
      </p>

      {/* Shape selector */}
      <div className="flex gap-2 justify-center mb-3">
        {(["rectangle", "triangle", "circle"] as const).map((s) => (
          <button key={s}
            onClick={() => { setShape(s); interact(); }}
            className="rounded-lg px-3 py-1 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: shape === s ? COLORS.primary : COLORS.bgSurface,
              color: COLORS.textPrimary,
            }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-sm" aria-label={`Interactive ${shape}`}>
        {/* Grid background */}
        {shape === "rectangle" && (
          <motion.g animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            {Array.from({ length: width * height }, (_, i) => {
              const gx = cx - scaleW / 2 + (i % width) * 15;
              const gy = cy - scaleH / 2 + Math.floor(i / width) * 15;
              return (
                <motion.rect key={i} x={gx} y={gy} width={14} height={14}
                  fill={COLORS.areaFill} stroke={COLORS.area} strokeWidth={0.5}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.01 }} />
              );
            })}
          </motion.g>
        )}

        {shape === "rectangle" && (
          <motion.rect x={cx - scaleW / 2} y={cy - scaleH / 2}
            width={scaleW} height={scaleH}
            fill="none" stroke={COLORS.perimeter} strokeWidth={2}
            animate={{ width: scaleW, height: scaleH, x: cx - scaleW / 2, y: cy - scaleH / 2 }}
            transition={SPRING} />
        )}

        {shape === "triangle" && (
          <motion.g animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <motion.polygon
              points={`${cx - scaleW / 2},${cy + scaleH / 2} ${cx + scaleW / 2},${cy + scaleH / 2} ${cx},${cy - scaleH / 2}`}
              fill={COLORS.triangleFill} stroke={COLORS.triangle} strokeWidth={2}
              transition={SPRING} />
            <text x={cx} y={cy + scaleH / 2 + 18} textAnchor={"middle" as const}
              fill={COLORS.triangle} fontSize={11}>base = {width}</text>
            <text x={cx + scaleW / 2 + 14} y={cy} textAnchor={"middle" as const}
              fill={COLORS.triangle} fontSize={11}>h = {height}</text>
          </motion.g>
        )}

        {shape === "circle" && (
          <motion.g animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <motion.circle cx={cx} cy={cy} r={scaleW / 2}
              fill={COLORS.circleFill} stroke={COLORS.circle} strokeWidth={2}
              animate={{ r: scaleW / 2 }} transition={SPRING} />
            <line x1={cx} y1={cy} x2={cx + scaleW / 2} y2={cy}
              stroke={COLORS.circle} strokeWidth={2} />
            <text x={cx + scaleW / 4} y={cy - 6} textAnchor={"middle" as const}
              fill={COLORS.circle} fontSize={11}>r = {width}</text>
          </motion.g>
        )}
      </svg>

      {/* Controls */}
      <div className="w-full max-w-xs space-y-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm w-16" style={{ color: COLORS.textMuted }}>
            {shape === "circle" ? "Radius:" : "Width:"}
          </span>
          <button onClick={() => { if (width > 1) { setWidth((w) => w - 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
            aria-label="Decrease width">{"\u2212"}</button>
          <span className="font-mono font-bold tabular-nums flex-1 text-center"
            style={{ color: COLORS.textPrimary }}>{width}</span>
          <button onClick={() => { if (width < 10) { setWidth((w) => w + 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
            aria-label="Increase width">+</button>
        </div>
        {shape !== "circle" && (
          <div className="flex items-center gap-3">
            <span className="text-sm w-16" style={{ color: COLORS.textMuted }}>Height:</span>
            <button onClick={() => { if (height > 1) { setHeight((h) => h - 1); interact(); } }}
              className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
              style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
              aria-label="Decrease height">{"\u2212"}</button>
            <span className="font-mono font-bold tabular-nums flex-1 text-center"
              style={{ color: COLORS.textPrimary }}>{height}</span>
            <button onClick={() => { if (height < 10) { setHeight((h) => h + 1); interact(); } }}
              className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
              style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
              aria-label="Increase height">+</button>
          </div>
        )}
      </div>

      {/* Live values */}
      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: COLORS.bgSurface }}>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span style={{ color: COLORS.textMuted }}>Perimeter:</span>
          <span className="font-mono tabular-nums text-right" style={{ color: COLORS.perimeter }}>{perimeter}</span>
          <span style={{ color: COLORS.textMuted }}>Area:</span>
          <span className="font-mono tabular-nums text-right" style={{ color: COLORS.area }}>{area}</span>
        </div>
      </div>

      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 10)} total={10} />
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
    { text: "Make a 1\u00D79 rectangle (P=20, A=9) and a 5\u00D75 square (P=20, A=25). Same perimeter, but very different areas!", btn: "I see it!" },
    { text: "A triangle is exactly half a rectangle with the same base and height. That's why the formula has \u00BD!", btn: "I see it!" },
    { text: "A circle's area counts the square units inside. It's \u03C0 times the radius squared: A = \u03C0r\u00B2", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 280 160" className="w-full max-w-sm mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* 1x9 rectangle */}
            <rect x={10} y={50} width={108} height={12} fill={COLORS.areaFill} stroke={COLORS.perimeter} strokeWidth={2} />
            <text x={64} y={40} textAnchor={"middle" as const} fill={COLORS.textSecondary} fontSize={11}>1 {"\u00D7"} 9 = 9</text>
            {/* 5x5 square */}
            <rect x={150} y={20} width={60} height={60} fill={COLORS.areaFill} stroke={COLORS.perimeter} strokeWidth={2} />
            <text x={180} y={15} textAnchor={"middle" as const} fill={COLORS.textSecondary} fontSize={11}>5 {"\u00D7"} 5 = 25</text>
            <text x={140} y={110} textAnchor={"middle" as const} fill={COLORS.perimeter} fontSize={13} fontWeight={600}>
              Both P = 20, but different areas!
            </text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={60} y={30} width={160} height={80} fill="none" stroke={COLORS.textMuted} strokeWidth={1} strokeDasharray="4 4" />
            <polygon points="60,110 220,110 220,30" fill={COLORS.triangleFill} stroke={COLORS.triangle} strokeWidth={2} />
            <text x={140} y={140} textAnchor={"middle" as const} fill={COLORS.triangle} fontSize={13} fontWeight={600}>
              Triangle = half the rectangle
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={140} cy={75} r={55} fill={COLORS.circleFill} stroke={COLORS.circle} strokeWidth={2} />
            <line x1={140} y1={75} x2={195} y2={75} stroke={COLORS.circle} strokeWidth={2} />
            <text x={167} y={68} textAnchor={"middle" as const} fill={COLORS.circle} fontSize={11}>r</text>
            <motion.text x={140} y={150} textAnchor={"middle" as const} fill={COLORS.circle} fontSize={14} fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              A = {"\u03C0"}r{"\u00B2"}
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
    timers.push(setTimeout(() => setRevealed(2), 3000));
    timers.push(setTimeout(() => setRevealed(3), 4500));
    timers.push(setTimeout(() => setRevealed(4), 6000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "P = 2l + 2w", desc: "Rectangle perimeter", color: COLORS.perimeter },
    { formula: "A = l \u00D7 w", desc: "Rectangle area", color: COLORS.area },
    { formula: "A = \u00BD \u00D7 b \u00D7 h", desc: "Triangle area", color: COLORS.triangle },
    { formula: "A = \u03C0r\u00B2", desc: "Circle area", color: COLORS.circle },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Key Formulas
      </h2>
      <div className="space-y-5 w-full max-w-md">
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
    { icon: "\u{1F3E1}", title: "Fencing a Garden", desc: "How many feet of fence for a 12\u00D78 garden?", math: "P = 2(12) + 2(8) = 40 ft" },
    { icon: "\u{1F58C}\u{FE0F}", title: "Painting a Wall", desc: "How many square feet of paint for a 10\u00D78 wall?", math: "A = 10 \u00D7 8 = 80 sq ft" },
    { icon: "\u{1FA79}", title: "Buying Carpet", desc: "How many square yards for a 4\u00D73 room?", math: "A = 4 \u00D7 3 = 12 sq yd" },
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
          Give a real-life example where you would need to find area, and another where you would need perimeter. Why are they different?
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

export function AreaPerimeterLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>GE-4.6 Area & Perimeter</span>
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
