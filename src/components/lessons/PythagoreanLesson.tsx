"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * GE-4.3 Pythagorean Theorem — Grade 8
 * Prerequisites: GE-4.2 (Triangle Properties), AL-3.8a (Square Roots)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: In a right triangle, the area of the square on the
 *   hypotenuse equals the sum of the areas on the two legs (a² + b² = c²).
 *
 * Stage flow:
 *  1. Hook — animated right triangle with squares growing on each side
 *  2. Spatial — drag triangle vertices to see squares resize; areas update live
 *  3. Discovery — guided prompts: notice a²+b², compare to c², equality
 *  4. Symbol Bridge — a² + b² = c² overlaid on the spatial model
 *  5. Real World — ladder, TV size, distance on map
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
 *
 * Neuroscience: spatial (parietal IPS) before symbolic (angular gyrus).
 *   Squares on sides leverage area intuition. Drag interaction embodies
 *   the relationship. Discovery builds productive struggle.
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
/*  Lesson-specific theme                                              */
/* ------------------------------------------------------------------ */

const THEME = {
  sideA: "#60a5fa", // blue
  sideB: "#a78bfa", // purple
  sideC: "#f472b6", // pink
} as const;

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/PythagoreanHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => setPhase(5), 4200),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Right triangle: 3-4-5 proportions, scaled to SVG
  const triPts = "160,260 340,260 160,140";
  const a = 3;
  const b = 4;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 0 ? 1 : 0 }}
          className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: colors.text.primary }}
        >
          What if squares could prove a triangle right?
        </motion.h2>

        <svg viewBox="0 0 500 350" className="w-full max-w-md" aria-label="Right triangle with squares on each side">
          {/* Triangle */}
          {phase >= 1 && (
            <motion.polygon
              points={triPts}
              fill={`${colors.accent.indigo}20`}
              stroke={colors.text.primary}
              strokeWidth={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Right-angle marker */}
          {phase >= 1 && (
            <motion.polyline
              points="160,245 175,245 175,260"
              fill="none"
              stroke={colors.text.secondary}
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          )}

          {/* Square on side a (vertical, left side) — height=120 */}
          {phase >= 2 && (
            <motion.rect
              x={40}
              y={140}
              width={120}
              height={120}
              fill={`${THEME.sideA}30`}
              stroke={THEME.sideA}
              strokeWidth={2}
              initial={{ scale: 0, originX: "160px", originY: "200px" }}
              animate={{ scale: 1 }}
              transition={springs.default}
            />
          )}
          {phase >= 2 && (
            <motion.text
              x={100}
              y={205}
              textAnchor={"middle" as const}
              fill={THEME.sideA}
              fontSize={18}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {`${a}\u00B2 = ${a * a}`}
            </motion.text>
          )}

          {/* Square on side b (horizontal, bottom) — width=180 */}
          {phase >= 3 && (
            <motion.rect
              x={160}
              y={260}
              width={180}
              height={180}
              fill={`${THEME.sideB}30`}
              stroke={THEME.sideB}
              strokeWidth={2}
              initial={{ scale: 0, originX: "250px", originY: "260px" }}
              animate={{ scale: 1 }}
              transition={springs.default}
            />
          )}
          {phase >= 3 && (
            <motion.text
              x={250}
              y={355}
              textAnchor={"middle" as const}
              fill={THEME.sideB}
              fontSize={18}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {`${b}\u00B2 = ${b * b}`}
            </motion.text>
          )}

          {/* Square on hypotenuse c — approximate, tilted */}
          {phase >= 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <rect
                x={280}
                y={40}
                width={150}
                height={150}
                fill={`${THEME.sideC}30`}
                stroke={THEME.sideC}
                strokeWidth={2}
              />
              <text
                x={355}
                y={120}
                textAnchor={"middle" as const}
                fill={THEME.sideC}
                fontSize={18}
                fontWeight="bold"
              >
                {`c\u00B2 = ${a * a + b * b}`}
              </text>
            </motion.g>
          )}
        </svg>

        {/* Equation reveal */}
        {phase >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <p className="font-mono text-[clamp(18px,4vw,28px)] font-bold" style={{ color: colors.text.primary }}>
              <span style={{ color: THEME.sideA }}>{a * a}</span>
              {" + "}
              <span style={{ color: THEME.sideB }}>{b * b}</span>
              {" = "}
              <span style={{ color: THEME.sideC }}>{a * a + b * b}</span>
            </p>
            <ContinueButton onClick={onContinue} delay={0.5} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [interactions, setInteractions] = useState(0);

  const sideC = useMemo(() => Math.sqrt(sideA * sideA + sideB * sideB), [sideA, sideB]);
  const canContinue = interactions >= 6;

  const adjust = useCallback((side: "a" | "b", delta: number) => {
    setInteractions((c) => c + 1);
    if (side === "a") {
      setSideA((v) => Math.max(1, Math.min(8, v + delta)));
    } else {
      setSideB((v) => Math.max(1, Math.min(8, v + delta)));
    }
  }, []);

  // SVG layout
  const scale = 25;
  const ox = Math.max(120, sideA * scale + 20);
  const oy = 260;

  const ax = ox;
  const ay = oy - sideA * scale;
  const bx = ox + sideB * scale;
  const by = oy;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: colors.text.primary }}>
          Adjust the sides and watch the squares
        </h2>

        <svg viewBox="0 0 500 340" className="w-full max-w-lg" aria-label="Interactive right triangle with adjustable sides">
          {/* Triangle */}
          <polygon
            points={`${ox},${oy} ${bx},${by} ${ax},${ay}`}
            fill={`${colors.accent.indigo}15`}
            stroke={colors.text.primary}
            strokeWidth={2}
          />

          {/* Right angle marker */}
          <polyline
            points={`${ox},${oy - 15} ${ox + 15},${oy - 15} ${ox + 15},${oy}`}
            fill="none"
            stroke={colors.text.secondary}
            strokeWidth={1.5}
          />

          {/* Square on side a (left, vertical) */}
          <rect
            x={ox - sideA * scale}
            y={ay}
            width={sideA * scale}
            height={sideA * scale}
            fill={`${THEME.sideA}20`}
            stroke={THEME.sideA}
            strokeWidth={1.5}
          />
          <text
            x={ox - (sideA * scale) / 2}
            y={ay + (sideA * scale) / 2 + 6}
            textAnchor={"middle" as const}
            fill={THEME.sideA}
            fontSize={14}
            fontWeight="bold"
          >
            {`a\u00B2=${sideA * sideA}`}
          </text>

          {/* Square on side b (bottom, horizontal) */}
          <rect
            x={ox}
            y={oy}
            width={sideB * scale}
            height={sideB * scale}
            fill={`${THEME.sideB}20`}
            stroke={THEME.sideB}
            strokeWidth={1.5}
          />
          <text
            x={ox + (sideB * scale) / 2}
            y={oy + (sideB * scale) / 2 + 6}
            textAnchor={"middle" as const}
            fill={THEME.sideB}
            fontSize={14}
            fontWeight="bold"
          >
            {`b\u00B2=${sideB * sideB}`}
          </text>

          {/* Side labels */}
          <text x={ox - 18} y={(oy + ay) / 2 + 4} textAnchor={"middle" as const} fill={THEME.sideA} fontSize={16} fontWeight="bold">
            {sideA}
          </text>
          <text x={(ox + bx) / 2} y={oy + 20} textAnchor={"middle" as const} fill={THEME.sideB} fontSize={16} fontWeight="bold">
            {sideB}
          </text>
          <text
            x={(ax + bx) / 2 + 12}
            y={(ay + by) / 2 - 6}
            textAnchor={"middle" as const}
            fill={THEME.sideC}
            fontSize={16}
            fontWeight="bold"
          >
            {sideC.toFixed(1)}
          </text>
        </svg>

        {/* Area sums */}
        <div className="rounded-xl bg-nm-bg-secondary px-6 py-3 text-center">
          <p className="font-mono text-lg font-bold" style={{ color: colors.text.primary }}>
            <span style={{ color: THEME.sideA }}>{sideA * sideA}</span>
            {" + "}
            <span style={{ color: THEME.sideB }}>{sideB * sideB}</span>
            {" = "}
            <span style={{ color: THEME.sideC }}>{sideA * sideA + sideB * sideB}</span>
            {" = "}
            <span style={{ color: THEME.sideC }}>{sideC.toFixed(1)}{"\u00B2"}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-6">
          {(["a", "b"] as const).map((side) => {
            const color = side === "a" ? THEME.sideA : THEME.sideB;
            const val = side === "a" ? sideA : sideB;
            return (
              <div key={side} className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color }}>{side}={val}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjust(side, -1)}
                  className="flex items-center justify-center rounded-lg font-bold"
                  style={{ background: `${color}30`, color, minHeight: 44, minWidth: 44 }}
                  aria-label={`Decrease side ${side}`}
                >
                  {"\u2212"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjust(side, 1)}
                  className="flex items-center justify-center rounded-lg font-bold"
                  style={{ background: `${color}30`, color, minHeight: 44, minWidth: 44 }}
                  aria-label={`Increase side ${side}`}
                >
                  +
                </motion.button>
              </div>
            );
          })}
        </div>

        <InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={colors.accent.indigo} />

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    {
      text: "Notice how each side of the right triangle has a square built on it. The square's area equals the side length times itself.",
      button: "I see it!",
    },
    {
      text: "Now compare: add the two smaller square areas together. What do you get?",
      button: "I see it!",
    },
    {
      text: "The sum of the two smaller squares ALWAYS equals the largest square\u2014the one on the hypotenuse. This is the Pythagorean Theorem!",
      button: "Got it!",
    },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) {
      setPromptIdx((i) => i + 1);
    } else {
      onContinue();
    }
  }, [promptIdx, prompts.length, onContinue]);

  const current = prompts[promptIdx]!;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <InteractionDots count={promptIdx + 1} total={prompts.length} activeColor={colors.accent.indigo} />

        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl bg-nm-bg-secondary p-6 text-center"
          >
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: colors.text.primary }}>
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Illustration: 3-4-5 triangle with area labels */}
        <svg viewBox="0 0 300 180" className="w-full max-w-sm" aria-label="3-4-5 right triangle illustration">
          <polygon points="40,160 200,160 40,40" fill={`${colors.accent.indigo}15`} stroke={colors.text.primary} strokeWidth={1.5} />
          <text x={20} y={105} textAnchor={"middle" as const} fill={THEME.sideA} fontSize={16} fontWeight="bold">3</text>
          <text x={120} y={175} textAnchor={"middle" as const} fill={THEME.sideB} fontSize={16} fontWeight="bold">4</text>
          <text x={130} y={90} textAnchor={"middle" as const} fill={THEME.sideC} fontSize={16} fontWeight="bold">5</text>
          {promptIdx >= 1 && (
            <motion.text
              x={220}
              y={100}
              fill={colors.text.primary}
              fontSize={14}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {`9 + 16 = 25`}
            </motion.text>
          )}
        </svg>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAck}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white"
          style={{ background: colors.accent.indigo, minHeight: 48, minWidth: 160 }}
          aria-label={current.button}
        >
          {current.button}
        </motion.button>
      </div>
    </div>
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
    { text: "a = leg 1, b = leg 2", color: colors.text.primary },
    { text: "c = hypotenuse (longest side)", color: THEME.sideC },
    { text: "a\u00B2 + b\u00B2 = c\u00B2", color: colors.accent.indigo },
  ];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: colors.text.primary }}>
          The Pythagorean Theorem
        </h2>

        <div className="flex flex-col gap-4">
          {notations.map((n, i) => (
            i <= step ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springs.default}
                className="rounded-xl bg-nm-bg-secondary px-6 py-4 text-center"
              >
                <p className="font-mono text-[clamp(16px,4vw,24px)] font-bold" style={{ color: n.color }}>
                  {n.text}
                </p>
              </motion.div>
            ) : null
          ))}
        </div>

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springs.default}
            className="rounded-2xl border-2 px-8 py-6 text-center"
            style={{ borderColor: colors.accent.indigo, background: `${colors.accent.indigo}15` }}
          >
            <p className="font-mono text-[clamp(24px,6vw,40px)] font-bold" style={{ color: colors.accent.indigo }}>
              {"a\u00B2 + b\u00B2 = c\u00B2"}
            </p>
          </motion.div>
        )}

        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World Anchor                                         */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    {
      icon: "\uD83E\uDE9C",
      title: "Ladder Safety",
      desc: "A 10-ft ladder leans against a wall. If its base is 6 ft from the wall, the ladder reaches 8 ft high (6\u00B2 + 8\u00B2 = 10\u00B2).",
    },
    {
      icon: "\uD83D\uDCFA",
      title: "TV Screen Size",
      desc: "A 55-inch TV is measured diagonally. The width and height form a right triangle with the diagonal as the hypotenuse.",
    },
    {
      icon: "\uD83D\uDDFA\uFE0F",
      title: "Distance on a Map",
      desc: "Walk 3 blocks east and 4 blocks north\u2014the shortcut across is 5 blocks (3\u00B2 + 4\u00B2 = 5\u00B2).",
    },
  ];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: colors.text.primary }}>
          Pythagorean Theorem in Real Life
        </h2>

        <div className="flex flex-col gap-4">
          {scenarios.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, ...springs.default }}
              className="rounded-xl bg-nm-bg-secondary p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold" style={{ color: colors.text.primary }}>{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: colors.text.secondary }}>{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ContinueButton onClick={onContinue} />
      </div>
    </div>
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
  // Recall (1-3)
  {
    id: 1, layer: "recall",
    question: "In a right triangle, which side is the hypotenuse?",
    options: ["The shortest side", "The side opposite the right angle", "Any of the three sides", "The vertical side"],
    correctIndex: 1,
    feedback: "The hypotenuse is always the side opposite the right angle\u2014and the longest side.",
  },
  {
    id: 2, layer: "recall",
    question: "The Pythagorean Theorem states:",
    options: ["a + b = c", "a\u00B2 + b\u00B2 = c\u00B2", "a\u00B2 \u00D7 b\u00B2 = c\u00B2", "2a + 2b = 2c"],
    correctIndex: 1,
    feedback: "a\u00B2 + b\u00B2 = c\u00B2 is the Pythagorean Theorem, where c is the hypotenuse.",
  },
  {
    id: 3, layer: "recall",
    question: "The Pythagorean Theorem applies to which type of triangle?",
    options: ["Any triangle", "Right triangles only", "Equilateral triangles", "Isosceles triangles"],
    correctIndex: 1,
    feedback: "The Pythagorean Theorem only applies to right triangles (one 90\u00B0 angle).",
  },
  // Procedure (4-6)
  {
    id: 4, layer: "procedure",
    question: "A right triangle has legs 6 and 8. What is the hypotenuse?",
    options: ["10", "14", "48", "100"],
    correctIndex: 0,
    feedback: "6\u00B2 + 8\u00B2 = 36 + 64 = 100. The square root of 100 is 10.",
  },
  {
    id: 5, layer: "procedure",
    question: "A right triangle has legs 5 and 12. What is the hypotenuse?",
    options: ["17", "15", "13", "60"],
    correctIndex: 2,
    feedback: "5\u00B2 + 12\u00B2 = 25 + 144 = 169. The square root of 169 is 13.",
  },
  {
    id: 6, layer: "procedure",
    question: "A right triangle has hypotenuse 10 and one leg 6. What is the other leg?",
    options: ["4", "6", "8", "16"],
    correctIndex: 2,
    feedback: "10\u00B2 \u2212 6\u00B2 = 100 \u2212 36 = 64. The square root of 64 is 8.",
  },
  // Understanding (7-9)
  {
    id: 7, layer: "understanding",
    question: "Can a right triangle have sides 7, 24, and 25?",
    options: ["Yes", "No"],
    correctIndex: 0,
    feedback: "7\u00B2 + 24\u00B2 = 49 + 576 = 625 = 25\u00B2. It satisfies the theorem!",
  },
  {
    id: 8, layer: "understanding",
    question: "A triangle has sides 4, 5, and 7. Is it a right triangle?",
    options: ["Yes", "No"],
    correctIndex: 1,
    feedback: "4\u00B2 + 5\u00B2 = 16 + 25 = 41, but 7\u00B2 = 49. Since 41 \u2260 49, it is NOT a right triangle.",
  },
  {
    id: 9, layer: "understanding",
    question: "If you double all sides of a 3-4-5 triangle, does it still satisfy the Pythagorean Theorem?",
    options: ["Yes (6-8-10 works)", "No (doubling breaks it)", "Only if you triple", "It depends on the angle"],
    correctIndex: 0,
    feedback: "6\u00B2 + 8\u00B2 = 36 + 64 = 100 = 10\u00B2. Scaling a right triangle preserves the relationship!",
  },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;

  const problem = done ? null : (PROBLEMS[currentIdx] ?? null);

  const handleSelect = useCallback(
    (optIdx: number) => {
      if (answered || !problem) return;
      setSelected(optIdx);
      setAnswered(true);
      if (optIdx === problem.correctIndex) {
        setScore((s) => s + 1);
      }
    },
    [answered, problem],
  );

  const handleNext = useCallback(() => {
    setSelected(null);
    setAnswered(false);
    setCurrentIdx((i) => i + 1);
  }, []);

  if (done || !problem) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: colors.text.primary }}>Practice Complete!</h2>
          <p className="text-lg" style={{ color: colors.text.secondary }}>
            You got {score} out of {PROBLEMS.length} correct.
          </p>
          <ContinueButton onClick={onContinue} label="Continue" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: colors.text.secondary }}>
          Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})
        </p>

        <div className="w-full rounded-xl bg-nm-bg-secondary p-6">
          <p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: colors.text.primary }}>
            {problem.question}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex;
            const isSelected = i === selected;
            let bg: string = colors.bg.secondary;
            let border: string = colors.bg.elevated;
            if (answered) {
              if (isCorrect) { bg = `${colors.functional.success}20`; border = colors.functional.success; }
              else if (isSelected) { bg = `${colors.functional.error}20`; border = colors.functional.error; }
            }
            return (
              <motion.button
                key={i}
                whileTap={answered ? {} : { scale: 0.97 }}
                onClick={() => handleSelect(i)}
                className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors"
                style={{ background: bg, borderColor: border, color: colors.text.primary, minHeight: 48 }}
                aria-label={`Option: ${opt}`}
              >
                {opt}
                {answered && isCorrect && <span className="ml-2" style={{ color: colors.functional.success }}>{"  \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span className="ml-2" style={{ color: colors.functional.error }}>{"  \u2717"}</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback persists until Next */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-xl p-4"
            style={{ background: selected === problem.correctIndex ? `${colors.functional.success}15` : `${colors.functional.error}15` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: colors.text.primary }}>{problem.feedback}</p>
          </motion.div>
        )}

        {answered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-xl px-8 py-3 font-semibold text-white"
            style={{ background: colors.accent.indigo, minHeight: 48, minWidth: 160 }}
            aria-label="Next problem"
          >
            {"Next \u2192"}
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STAGE 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  if (submitted) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springs.default}
          >
            <p className="text-4xl">{"\uD83E\uDDE0"}</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: colors.text.primary }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>
              Self-explanation strengthens your understanding. +50 XP
            </p>
          </motion.div>
          <ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: colors.text.primary }}>
          Reflect
        </h2>
        <p className="text-center text-sm" style={{ color: colors.text.secondary }}>
          In your own words, explain why a{"\u00B2"} + b{"\u00B2"} = c{"\u00B2"} works for right triangles.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          className="w-full rounded-xl border-2 bg-nm-bg-secondary p-4 text-base"
          style={{ borderColor: colors.bg.elevated, color: colors.text.primary, minHeight: 120, resize: "vertical" }}
          aria-label="Reflection text"
        />

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="rounded-xl bg-nm-bg-secondary px-6 py-3 text-sm"
            style={{ color: colors.text.secondary, minHeight: 44 }}
          >
            Skip
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={text.length < 20}
            className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40"
            style={{ background: colors.accent.indigo, minHeight: 48, minWidth: 120 }}
            aria-label="Submit reflection"
          >
            Submit
          </motion.button>
        </div>

        <p className="text-xs" style={{ color: colors.text.secondary }}>
          {text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main Lesson Component                                              */
/* ================================================================== */

export function PythagoreanLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.3 Pythagorean Theorem" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
