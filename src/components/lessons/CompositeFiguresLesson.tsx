"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * GE-4.6a Composite Figures — Grade 7
 * Prerequisites: GE-4.6 (Area/Perimeter basics), GE-4.5a (Circle Measurements)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: Any complex shape can be decomposed into simpler shapes
 *   (rectangles, triangles, circles) whose areas you already know.
 *
 * Stage flow:
 *  1. Hook — complex shape splits into colored simple shapes
 *  2. Spatial — tap to highlight sub-shapes, see areas update
 *  3. Discovery — sum of parts = total; subtraction method for cut-outs
 *  4. Symbol Bridge — A_total = A1 + A2 + ... or A_total = A_outer - A_hole
 *  5. Real World — floor plans, swimming pools, park layouts
 *  6. Practice — 9 problems
 *  7. Reflection
 */

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* ── Lesson-specific semantic colors (aliases to shared tokens) ── */
const THEME = {
  shapeA: colors.functional.info,       // blue — rectangle
  shapeB: colors.accent.violet,         // purple — triangle
  shapeC: colors.accent.cyan,           // cyan — semicircle
  shapeD: colors.accent.rose,           // pink — total
  primary: colors.accent.indigo,
  success: colors.functional.success,
  error: colors.functional.error,
  surface: colors.bg.secondary,
  border: colors.bg.elevated,
  text: colors.text.primary,
  muted: colors.text.secondary,
} as const;

const SPRING = springs.default;

/* ================================================================== */
/*  STAGE 1: Hook — complex shape splits apart                         */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/AreaCompositeHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 4800),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: THEME.text }}
        >
          How do you measure a complex shape?
        </motion.h2>

        <svg viewBox="0 0 400 300" className="w-full max-w-md" aria-label="L-shaped figure decomposing into rectangles">
          {/* Phase 0-1: Full L-shape */}
          {phase < 2 && (
            <motion.path
              d="M 60,40 L 260,40 L 260,140 L 160,140 L 160,260 L 60,260 Z"
              fill={`${THEME.shapeD}20`}
              stroke={THEME.text}
              strokeWidth={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
          {phase >= 1 && phase < 2 && (
            <motion.text
              x={160}
              y={155}
              textAnchor={"middle" as const}
              fill={THEME.text}
              fontSize={18}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"Area = ?"}
            </motion.text>
          )}

          {/* Phase 2+: Split into two rectangles */}
          {phase >= 2 && (
            <>
              {/* Top rectangle */}
              <motion.rect
                x={60}
                y={phase >= 3 ? 20 : 40}
                width={200}
                height={100}
                fill={`${THEME.shapeA}25`}
                stroke={THEME.shapeA}
                strokeWidth={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={SPRING}
              />
              {phase >= 3 && (
                <motion.text x={160} y={78} textAnchor={"middle" as const} fill={THEME.shapeA} fontSize={16} fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {"200 \u00D7 100"}
                </motion.text>
              )}

              {/* Bottom rectangle */}
              <motion.rect
                x={60}
                y={phase >= 3 ? 150 : 140}
                width={100}
                height={120}
                fill={`${THEME.shapeB}25`}
                stroke={THEME.shapeB}
                strokeWidth={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, ...SPRING }}
              />
              {phase >= 3 && (
                <motion.text x={110} y={218} textAnchor={"middle" as const} fill={THEME.shapeB} fontSize={16} fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {"100 \u00D7 120"}
                </motion.text>
              )}

              {/* Dashed split line */}
              <motion.line
                x1={60}
                y1={140}
                x2={160}
                y2={140}
                stroke={THEME.muted}
                strokeWidth={1.5}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </>
          )}

          {/* Phase 4: Total */}
          {phase >= 4 && (
            <motion.text
              x={300}
              y={200}
              textAnchor={"middle" as const}
              fill={THEME.shapeD}
              fontSize={16}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"= 32,000"}
            </motion.text>
          )}
        </svg>

        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-center font-mono text-lg font-bold"
            style={{ color: THEME.text }}
          >
            <span style={{ color: THEME.shapeA }}>20,000</span>
            {" + "}
            <span style={{ color: THEME.shapeB }}>12,000</span>
            {" = "}
            <span style={{ color: THEME.shapeD }}>32,000</span>
          </motion.p>
        )}

        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial — tap sub-shapes                                  */
/* ================================================================== */

interface SubShape {
  name: string;
  color: string;
  area: number;
  label: string;
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const shapes: SubShape[] = useMemo(() => [
    { name: "Rectangle A", color: THEME.shapeA, area: 48, label: "8 \u00D7 6 = 48" },
    { name: "Rectangle B", color: THEME.shapeB, area: 24, label: "4 \u00D7 6 = 24" },
    { name: "Triangle C", color: THEME.shapeC, area: 12, label: "\u00BD \u00D7 6 \u00D7 4 = 12" },
  ], []);

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [interactions, setInteractions] = useState(0);

  const toggleShape = useCallback((idx: number) => {
    setInteractions((c) => c + 1);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const totalArea = useMemo(() => {
    let sum = 0;
    selected.forEach((idx) => {
      const shape = shapes[idx];
      if (shape) sum += shape.area;
    });
    return sum;
  }, [selected, shapes]);

  const canContinue = interactions >= 6;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: THEME.text }}>
          Tap each part to see its area
        </h2>

        <InteractionDots count={interactions} total={6} activeColor={THEME.primary} />

        <svg viewBox="0 0 360 260" className="w-full max-w-md" aria-label="Composite figure with tappable sub-shapes">
          {/* Rectangle A: 8x6 */}
          <motion.rect
            x={40}
            y={40}
            width={160}
            height={120}
            fill={selected.has(0) ? `${THEME.shapeA}40` : `${THEME.shapeA}15`}
            stroke={THEME.shapeA}
            strokeWidth={selected.has(0) ? 3 : 1.5}
            onClick={() => toggleShape(0)}
            style={{ cursor: "pointer" }}
            whileTap={{ scale: 0.98 }}
            aria-label="Rectangle A: 8 by 6"
            role="button"
            tabIndex={0}
          />
          <text x={120} y={105} textAnchor={"middle" as const} fill={THEME.shapeA} fontSize={14} fontWeight="bold" style={{ pointerEvents: "none" }}>
            {selected.has(0) ? "48" : "?"}
          </text>

          {/* Rectangle B: 4x6 */}
          <motion.rect
            x={200}
            y={40}
            width={80}
            height={120}
            fill={selected.has(1) ? `${THEME.shapeB}40` : `${THEME.shapeB}15`}
            stroke={THEME.shapeB}
            strokeWidth={selected.has(1) ? 3 : 1.5}
            onClick={() => toggleShape(1)}
            style={{ cursor: "pointer" }}
            whileTap={{ scale: 0.98 }}
            aria-label="Rectangle B: 4 by 6"
            role="button"
            tabIndex={0}
          />
          <text x={240} y={105} textAnchor={"middle" as const} fill={THEME.shapeB} fontSize={14} fontWeight="bold" style={{ pointerEvents: "none" }}>
            {selected.has(1) ? "24" : "?"}
          </text>

          {/* Triangle C: base 6, height 4 */}
          <motion.polygon
            points="40,160 200,160 120,220"
            fill={selected.has(2) ? `${THEME.shapeC}40` : `${THEME.shapeC}15`}
            stroke={THEME.shapeC}
            strokeWidth={selected.has(2) ? 3 : 1.5}
            onClick={() => toggleShape(2)}
            style={{ cursor: "pointer" }}
            whileTap={{ scale: 0.98 }}
            aria-label="Triangle C: base 6 height 4"
            role="button"
            tabIndex={0}
          />
          <text x={120} y={195} textAnchor={"middle" as const} fill={THEME.shapeC} fontSize={14} fontWeight="bold" style={{ pointerEvents: "none" }}>
            {selected.has(2) ? "12" : "?"}
          </text>

          {/* Dimension labels */}
          <text x={120} y={35} textAnchor={"middle" as const} fill={THEME.muted} fontSize={12}>8</text>
          <text x={240} y={35} textAnchor={"middle" as const} fill={THEME.muted} fontSize={12}>4</text>
          <text x={32} y={105} textAnchor={"middle" as const} fill={THEME.muted} fontSize={12}>6</text>
        </svg>

        {/* Selected sub-shape labels */}
        <div className="flex flex-wrap justify-center gap-2">
          {shapes.map((s, i) => (
            selected.has(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING}
                className="rounded-lg px-3 py-1 text-sm font-mono font-bold"
                style={{ background: `${s.color}20`, color: s.color }}
              >
                {s.label}
              </motion.div>
            ) : null
          ))}
        </div>

        {/* Total */}
        <div className="rounded-xl px-6 py-3 text-center" style={{ background: THEME.surface }}>
          <p className="text-sm" style={{ color: THEME.muted }}>Total Area</p>
          <p className="font-mono text-2xl font-bold tabular-nums" style={{ color: THEME.shapeD }}>
            {totalArea}
          </p>
        </div>

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STAGE 3: Discovery                                                 */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "Any complex shape can be broken into simpler shapes you already know: rectangles, triangles, and circles.", button: "I see it!" },
    { text: "Addition method: find each sub-shape's area, then add them all together. A = A\u2081 + A\u2082 + A\u2083 + ...", button: "I see it!" },
    { text: "Subtraction method: sometimes it's easier to start with a big shape and subtract the hole. Like a rectangle with a circle cut out!", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const current = prompts[promptIdx]!;

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) setPromptIdx((i) => i + 1);
    else onContinue();
  }, [promptIdx, prompts.length, onContinue]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <InteractionDots count={promptIdx + 1} total={prompts.length} activeColor={THEME.primary} />

        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: THEME.surface }}
          >
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: THEME.text }}>
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Subtraction illustration */}
        {promptIdx >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <svg viewBox="0 0 100 100" width={80} height={80}>
              <rect x={10} y={10} width={80} height={80} fill={`${THEME.shapeA}30`} stroke={THEME.shapeA} strokeWidth={2} />
              <circle cx={50} cy={50} r={25} fill={colors.bg.primary} stroke={THEME.error} strokeWidth={2} />
            </svg>
            <span className="font-mono text-lg font-bold" style={{ color: THEME.text }}>
              {"= "}<span style={{ color: THEME.shapeA }}>{"rect"}</span>{" \u2212 "}<span style={{ color: THEME.error }}>{"circle"}</span>
            </span>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAck}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white"
          style={{ background: THEME.primary, minHeight: 48, minWidth: 160 }}
        >
          {current.button}
        </motion.button>
      </div>
    </section>
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

  const notations = [
    { text: "Addition: A = A\u2081 + A\u2082 + A\u2083 + ...", color: THEME.shapeA },
    { text: "Subtraction: A = A\u2080 \u2212 A\u2081", color: THEME.error },
    { text: "Decompose \u2192 Calculate \u2192 Combine", color: THEME.primary },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: THEME.text }}>
          Composite Figure Strategy
        </h2>
        {notations.map((n, i) =>
          i <= step ? (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="w-full rounded-xl px-6 py-4 text-center" style={{ background: THEME.surface }}>
              <p className="font-mono text-[clamp(16px,4vw,22px)] font-bold" style={{ color: n.color }}>{n.text}</p>
            </motion.div>
          ) : null
        )}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World                                                */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F3E0}", title: "Floor Plans", desc: "Rooms are rarely perfect rectangles. Architects break them into simpler shapes to calculate flooring needed." },
    { icon: "\u{1F3CA}", title: "Swimming Pools", desc: "An L-shaped pool is two rectangles. A kidney-shaped pool uses curves, measured by combining semicircles and rectangles." },
    { icon: "\u{1F333}", title: "Park Layout", desc: "A city park with a circular pond: total usable area = park rectangle minus pond circle." },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: THEME.text }}>
          Composite Figures Everywhere
        </h2>
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="w-full rounded-xl p-4" style={{ background: THEME.surface }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: THEME.text }}>{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: THEME.muted }}>{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <ContinueButton onClick={onContinue} />
      </div>
    </section>
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
  { id: 1, layer: "recall", question: "What is a composite figure?", options: ["A figure made of one shape", "A figure made of two or more simpler shapes", "A 3D shape", "A figure with no area"], correctIndex: 1, feedback: "A composite figure is any shape that can be broken down into two or more simpler shapes." },
  { id: 2, layer: "recall", question: "What are the two strategies for finding composite area?", options: ["Addition and multiplication", "Addition and subtraction", "Division and multiplication", "Counting and measuring"], correctIndex: 1, feedback: "You can ADD sub-shape areas together, or SUBTRACT a hole from a larger shape." },
  { id: 3, layer: "recall", question: "When do you use the subtraction method?", options: ["When the shape has a hole or cut-out", "When the shape is a triangle", "When you know the perimeter", "Always"], correctIndex: 0, feedback: "Use subtraction when there is a hole or cut-out: total = outer shape \u2212 hole." },
  { id: 4, layer: "procedure", question: "An L-shape is two rectangles: 10\u00D74 and 6\u00D74. What is the total area?", options: ["40", "64", "24", "100"], correctIndex: 1, feedback: "(10 \u00D7 4) + (6 \u00D7 4) = 40 + 24 = 64 square units." },
  { id: 5, layer: "procedure", question: "A rectangle 12\u00D78 has a 4\u00D74 square cut out. What is the remaining area?", options: ["96", "80", "64", "112"], correctIndex: 1, feedback: "12\u00D78 = 96; cut-out = 4\u00D74 = 16; remaining = 96 \u2212 16 = 80." },
  { id: 6, layer: "procedure", question: "A rectangle 10\u00D76 has a semicircle (r=3) on one end. Total area? (Use \u03C0\u22483.14)", options: ["74.13", "60", "88.27", "46.13"], correctIndex: 0, feedback: "Rectangle = 60. Semicircle = \u00BD\u03C0(3)\u00B2 = 14.13. Total = 60 + 14.13 = 74.13." },
  { id: 7, layer: "understanding", question: "Two students split the same shape differently. Will they get the same total area?", options: ["Yes, decomposition doesn't change total area", "No, different splits give different areas", "Only if they use the same shapes", "It depends on the method"], correctIndex: 0, feedback: "The total area is the same no matter how you decompose the shape. The parts always sum to the whole." },
  { id: 8, layer: "understanding", question: "Which is easier to calculate: a shape with a circular hole, or a shape made of rectangles?", options: ["Circular hole (subtraction)", "Rectangles (addition)", "They're always equally difficult", "Neither can be calculated"], correctIndex: 1, feedback: "Rectangle addition is simpler since rectangles have the easiest area formula. But both methods work!" },
  { id: 9, layer: "understanding", question: "A shape has perimeter 40 and is made of two rectangles. Can you find the area from just the perimeter?", options: ["Yes, always", "No, you need more info about each rectangle", "Only if it's a square", "Yes, divide by 4"], correctIndex: 1, feedback: "Perimeter alone doesn't determine area. You need the dimensions of each sub-shape." },
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
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: THEME.text }}>Practice Complete!</h2>
          <p className="text-lg" style={{ color: THEME.muted }}>{score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: THEME.muted }}>Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})</p>
        <div className="w-full rounded-xl p-6" style={{ background: THEME.surface }}>
          <p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: THEME.text }}>{problem.question}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex;
            const isSelected = i === selected;
            let bg: string = THEME.surface;
            let border: string = THEME.border;
            if (answered) {
              if (isCorrect) { bg = `${THEME.success}20`; border = THEME.success; }
              else if (isSelected) { bg = `${THEME.error}20`; border = THEME.error; }
            }
            return (
              <motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium" style={{ background: bg, borderColor: border, color: THEME.text, minHeight: 48 }} aria-label={`Option: ${opt}`}>
                {opt}
                {answered && isCorrect && <span style={{ color: THEME.success }}>{" \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span style={{ color: THEME.error }}>{" \u2717"}</span>}
              </motion.button>
            );
          })}
        </div>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-xl p-4" style={{ background: selected === problem.correctIndex ? `${THEME.success}15` : `${THEME.error}15` }}>
            <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>{problem.feedback}</p>
          </motion.div>
        )}
        {answered && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: THEME.primary, minHeight: 48, minWidth: 160 }}>
            {"Next \u2192"}
          </motion.button>
        )}
      </div>
    </section>
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
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">{"\u{1F9E0}"}</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: THEME.text }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: THEME.muted }}>Self-explanation strengthens your understanding. +50 XP</p>
          </motion.div>
          <ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-nm-bg-primary">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: THEME.text }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: THEME.muted }}>
          When would you use the addition method vs. the subtraction method for composite figures? Give an example.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          className="w-full rounded-xl border-2 p-4 text-base"
          style={{ background: THEME.surface, borderColor: THEME.border, color: THEME.text, minHeight: 120, resize: "vertical" }}
          aria-label="Reflection text"
        />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: THEME.surface, color: THEME.muted, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setSubmitted(true)} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: THEME.primary, minHeight: 48, minWidth: 120 }}>Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: THEME.muted }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Main                                                               */
/* ================================================================== */

export function CompositeFiguresLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.6a Composite Figures" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onContinue={advance} />;
          case "spatial": return <SpatialStage onContinue={advance} />;
          case "discovery": return <DiscoveryStage onContinue={advance} />;
          case "symbol": return <SymbolBridgeStage onContinue={advance} />;
          case "realWorld": return <RealWorldStage onContinue={advance} />;
          case "practice": return <PracticeStage onContinue={advance} />;
          case "reflection": return <ReflectionStage onContinue={advance} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
