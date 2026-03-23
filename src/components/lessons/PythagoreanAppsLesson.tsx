"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/**
 * GE-4.3a Pythagorean Applications — Grade 8
 * Prerequisites: GE-4.3 (Pythagorean Theorem)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: The Pythagorean theorem isn't just abstract — it solves
 *   real problems: finding distances between points, checking if a
 *   triangle is right, and computing rectangle diagonals.
 *
 * Stage flow:
 *  1. Hook — animated city map showing "shortcut" diagonal vs walking blocks
 *  2. Spatial — interactive coordinate grid; tap two points, see distance calc
 *  3. Discovery — guided prompts connecting distance formula to Pythagorean theorem
 *  4. Symbol Bridge — d = sqrt((x2-x1)^2 + (y2-y1)^2) overlay
 *  5. Real World — TV diagonals, walking shortcuts, construction right-angle checks
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const MUTED = colors.text.secondary;
const BORDER = colors.bg.elevated;
const PRIMARY = colors.accent.indigo;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

/* ── Lesson-specific semantic colors ── */
const THEME = {
  colorA: colors.domain.numbers,    // "#60a5fa" — horizontal
  colorB: colors.accent.violet,     // "#a78bfa" — vertical
  colorC: "#f472b6",                // diagonal (lesson-specific pink)
} as const;

const SPRING = springs.default;

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12"
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/PythagoreanAppsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3400),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const startX = 60;
  const startY = 280;
  const endX = 340;
  const endY = 100;
  const dx = endX - startX;
  const dy = startY - endY;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 0 ? 1 : 0 }}
          className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: TEXT }}
        >
          What is the shortest path across the city?
        </motion.h2>

        <svg viewBox="0 0 400 340" className="w-full max-w-md" aria-label="City grid showing shortcut diagonal">
          {Array.from({ length: 8 }, (_, i) => {
            const gx = 40 + i * 45;
            return (
              <line key={`v${i}`} x1={gx} y1={60} x2={gx} y2={310} stroke={BORDER} strokeWidth={1} strokeOpacity={0.4} />
            );
          })}
          {Array.from({ length: 7 }, (_, i) => {
            const gy = 60 + i * 45;
            return (
              <line key={`h${i}`} x1={40} y1={gy} x2={370} y2={gy} stroke={BORDER} strokeWidth={1} strokeOpacity={0.4} />
            );
          })}

          {phase >= 1 && (
            <motion.polyline
              points={`${startX},${startY} ${endX},${startY} ${endX},${endY}`}
              fill="none"
              stroke={THEME.colorA}
              strokeWidth={3}
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />
          )}

          {phase >= 2 && (
            <motion.text
              x={200}
              y={305}
              textAnchor={"middle" as const}
              fill={THEME.colorA}
              fontSize={14}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {`Walking: ${dx} + ${dy} = ${dx + dy} m`}
            </motion.text>
          )}

          {phase >= 3 && (
            <motion.line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={THEME.colorC}
              strokeWidth={3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {phase >= 3 && (
            <motion.text
              x={170}
              y={175}
              textAnchor={"middle" as const}
              fill={THEME.colorC}
              fontSize={14}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {`Shortcut: ${Math.round(Math.sqrt(dx * dx + dy * dy))} m`}
            </motion.text>
          )}

          <circle cx={startX} cy={startY} r={6} fill={SUCCESS} />
          <circle cx={endX} cy={endY} r={6} fill={ERROR} />
          <text x={startX - 5} y={startY + 20} fill={SUCCESS} fontSize={12} fontWeight="bold">Start</text>
          <text x={endX - 5} y={endY - 12} fill={ERROR} fontSize={12} fontWeight="bold">End</text>
        </svg>

        {phase >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-sm"
            style={{ color: MUTED }}
          >
            The Pythagorean theorem gives us the exact diagonal distance!
          </motion.p>
        )}

        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [pointA, setPointA] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [pointB, setPointB] = useState<{ x: number; y: number }>({ x: 5, y: 4 });
  const [interactions, setInteractions] = useState(0);
  const [selectingA, setSelectingA] = useState(true);

  const canContinue = interactions >= 4;

  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const gridSize = 7;
  const margin = 40;
  const cellSize = 45;
  const svgW = margin * 2 + gridSize * cellSize;
  const svgH = margin * 2 + gridSize * cellSize;

  const toSvgX = useCallback((gx: number) => margin + gx * cellSize, []);
  const toSvgY = useCallback((gy: number) => svgH - margin - gy * cellSize, [svgH]);

  const handleGridClick = useCallback(
    (gx: number, gy: number) => {
      setInteractions((c) => c + 1);
      if (selectingA) {
        setPointA({ x: gx, y: gy });
      } else {
        setPointB({ x: gx, y: gy });
      }
      setSelectingA((v) => !v);
    },
    [selectingA],
  );

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Tap grid intersections to place points
        </h2>
        <p className="text-sm" style={{ color: MUTED }}>
          {selectingA ? "Tap to place Point A (blue)" : "Tap to place Point B (pink)"}
        </p>

        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Interactive coordinate grid">
          {Array.from({ length: gridSize + 1 }, (_, i) => (
            <g key={`g${i}`}>
              <line x1={margin + i * cellSize} y1={margin} x2={margin + i * cellSize} y2={svgH - margin} stroke={BORDER} strokeWidth={0.5} />
              <line x1={margin} y1={margin + i * cellSize} x2={svgW - margin} y2={margin + i * cellSize} stroke={BORDER} strokeWidth={0.5} />
              <text x={margin + i * cellSize} y={svgH - margin + 18} textAnchor={"middle" as const} fill={MUTED} fontSize={11}>{i}</text>
              <text x={margin - 15} y={svgH - margin - i * cellSize + 4} textAnchor={"middle" as const} fill={MUTED} fontSize={11}>{i}</text>
            </g>
          ))}

          {Array.from({ length: gridSize + 1 }, (_, gx) =>
            Array.from({ length: gridSize + 1 }, (_, gy) => (
              <rect
                key={`c${gx}-${gy}`}
                x={toSvgX(gx) - 12}
                y={toSvgY(gy) - 12}
                width={24}
                height={24}
                fill="transparent"
                className="cursor-pointer"
                data-interactive="true"
                onClick={() => handleGridClick(gx, gy)}
              />
            )),
          )}

          <line x1={toSvgX(pointA.x)} y1={toSvgY(pointA.y)} x2={toSvgX(pointB.x)} y2={toSvgY(pointA.y)} stroke={THEME.colorA} strokeWidth={2} strokeDasharray="6 3" />
          <line x1={toSvgX(pointB.x)} y1={toSvgY(pointA.y)} x2={toSvgX(pointB.x)} y2={toSvgY(pointB.y)} stroke={THEME.colorB} strokeWidth={2} strokeDasharray="6 3" />
          <line x1={toSvgX(pointA.x)} y1={toSvgY(pointA.y)} x2={toSvgX(pointB.x)} y2={toSvgY(pointB.y)} stroke={THEME.colorC} strokeWidth={2.5} />

          <circle cx={toSvgX(pointA.x)} cy={toSvgY(pointA.y)} r={7} fill={THEME.colorA} />
          <circle cx={toSvgX(pointB.x)} cy={toSvgY(pointB.y)} r={7} fill={THEME.colorC} />
          <text x={toSvgX(pointA.x)} y={toSvgY(pointA.y) - 12} textAnchor={"middle" as const} fill={THEME.colorA} fontSize={12} fontWeight="bold">
            {`A(${pointA.x},${pointA.y})`}
          </text>
          <text x={toSvgX(pointB.x)} y={toSvgY(pointB.y) - 12} textAnchor={"middle" as const} fill={THEME.colorC} fontSize={12} fontWeight="bold">
            {`B(${pointB.x},${pointB.y})`}
          </text>

          <text x={(toSvgX(pointA.x) + toSvgX(pointB.x)) / 2} y={toSvgY(pointA.y) + 18} textAnchor={"middle" as const} fill={THEME.colorA} fontSize={13} fontWeight="bold">
            {`|${dx}|`}
          </text>
          <text x={toSvgX(pointB.x) + 18} y={(toSvgY(pointA.y) + toSvgY(pointB.y)) / 2 + 4} textAnchor={"middle" as const} fill={THEME.colorB} fontSize={13} fontWeight="bold">
            {`|${dy}|`}
          </text>
        </svg>

        <div className="rounded-xl px-6 py-3 text-center" style={{ background: SURFACE }}>
          <p className="font-mono text-sm font-bold" style={{ color: TEXT }}>
            <span style={{ color: THEME.colorA }}>{`${Math.abs(dx)}\u00B2`}</span>
            {" + "}
            <span style={{ color: THEME.colorB }}>{`${Math.abs(dy)}\u00B2`}</span>
            {" = "}
            <span style={{ color: MUTED }}>{dx * dx + dy * dy}</span>
            {" "}{"\u2192"}{" "}
            <span style={{ color: THEME.colorC }}>{"d = "}{dist.toFixed(2)}</span>
          </p>
        </div>

        <InteractionDots count={interactions} total={4} activeColor={PRIMARY} />

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(
    () => [
      { text: "When you moved the points, a right triangle appeared between them. The horizontal and vertical legs are just the differences in x and y coordinates.", button: "I see it!" },
      { text: "The diagonal line between the points is the hypotenuse! Its length is the actual distance. Can you see how a\u00B2 + b\u00B2 = c\u00B2 applies?", button: "I see it!" },
      { text: "This is the distance formula: d = \u221A((x\u2082\u2212x\u2081)\u00B2 + (y\u2082\u2212y\u2081)\u00B2). It is literally the Pythagorean theorem applied to coordinates!", button: "Got it!" },
    ],
    [],
  );

  const [promptIdx, setPromptIdx] = useState(0);

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) { setPromptIdx((i) => i + 1); } else { onContinue(); }
  }, [promptIdx, prompts.length, onContinue]);

  const current = prompts[promptIdx]!;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <InteractionDots count={promptIdx + 1} total={prompts.length} activeColor={PRIMARY} />
        <AnimatePresence mode="wait">
          <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl p-6 text-center" style={{ background: SURFACE }}>
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>{current.text}</p>
          </motion.div>
        </AnimatePresence>

        <svg viewBox="0 0 300 200" className="w-full max-w-sm" aria-label="Distance formula triangle illustration">
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i}>
              <line x1={30 + i * 40} y1={20} x2={30 + i * 40} y2={180} stroke={BORDER} strokeWidth={0.3} />
              <line x1={30} y1={20 + i * 27} x2={270} y2={20 + i * 27} stroke={BORDER} strokeWidth={0.3} />
            </g>
          ))}
          <line x1={110} y1={153} x2={230} y2={153} stroke={THEME.colorA} strokeWidth={2} strokeDasharray="5 3" />
          <line x1={230} y1={153} x2={230} y2={72} stroke={THEME.colorB} strokeWidth={2} strokeDasharray="5 3" />
          <line x1={110} y1={153} x2={230} y2={72} stroke={THEME.colorC} strokeWidth={2.5} />
          <circle cx={110} cy={153} r={5} fill={THEME.colorA} />
          <circle cx={230} cy={72} r={5} fill={THEME.colorC} />
          <text x={110} y={170} textAnchor={"middle" as const} fill={THEME.colorA} fontSize={12} fontWeight="bold">A(2,1)</text>
          <text x={230} y={64} textAnchor={"middle" as const} fill={THEME.colorC} fontSize={12} fontWeight="bold">B(5,4)</text>
          {promptIdx >= 1 && (
            <motion.text x={170} y={172} textAnchor={"middle" as const} fill={THEME.colorA} fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {"\u0394x = 3"}
            </motion.text>
          )}
          {promptIdx >= 1 && (
            <motion.text x={252} y={117} textAnchor={"middle" as const} fill={THEME.colorB} fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {"\u0394y = 3"}
            </motion.text>
          )}
          {promptIdx >= 2 && (
            <motion.text x={150} y={105} textAnchor={"middle" as const} fill={THEME.colorC} fontSize={11} fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {"d \u2248 4.24"}
            </motion.text>
          )}
        </svg>

        <motion.button whileTap={{ scale: 0.95 }} onClick={handleAck} className="rounded-xl px-8 py-3 text-base font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label={current.button}>
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
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 2400),
      setTimeout(() => setStep(3), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const formulas = [
    { text: "Distance between two points:", color: MUTED },
    { text: "d = \u221A((x\u2082 \u2212 x\u2081)\u00B2 + (y\u2082 \u2212 y\u2081)\u00B2)", color: PRIMARY },
    { text: "Is it a right triangle? Check: a\u00B2 + b\u00B2 = c\u00B2", color: THEME.colorC },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Pythagorean Applications</h2>
        <div className="flex flex-col gap-4">
          {formulas.map((f, i) =>
            i <= step ? (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
                <p className="font-mono text-[clamp(14px,3.5vw,20px)] font-bold" style={{ color: f.color }}>{f.text}</p>
              </motion.div>
            ) : null,
          )}
        </div>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-4 text-center" style={{ background: SURFACE }}>
            <p className="text-sm" style={{ color: MUTED }}>Rectangle diagonal: d = {"\u221A"}(w{"\u00B2"} + h{"\u00B2"})</p>
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-2xl border-2 px-8 py-6 text-center" style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}>
            <p className="font-mono text-[clamp(18px,5vw,32px)] font-bold" style={{ color: PRIMARY }}>{"a\u00B2 + b\u00B2 = c\u00B2"}</p>
            <p className="mt-2 text-xs" style={{ color: MUTED }}>Powers distance, right-triangle checks, and diagonals</p>
          </motion.div>
        )}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World Anchor                                         */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\uD83D\uDCF1", title: "Phone Screen Diagonal", desc: "A phone is 6.1\u2033 wide and 13.3\u2033 tall. The advertised 14.7\u2033 diagonal comes from \u221A(6.1\u00B2 + 13.3\u00B2)." },
    { icon: "\uD83D\uDDFA\uFE0F", title: "Map Distance", desc: "You walk 3 blocks east and 4 blocks north. The straight-line distance is \u221A(3\u00B2 + 4\u00B2) = 5 blocks." },
    { icon: "\uD83D\uDCD0", title: "Right-Angle Check (3-4-5)", desc: "Builders use a 3-4-5 triangle to verify right angles. If the sides satisfy a\u00B2 + b\u00B2 = c\u00B2, the corner is exactly 90\u00B0." },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Pythagorean Theorem in Action</h2>
        <div className="flex flex-col gap-4">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4" style={{ background: SURFACE }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
  { id: 1, layer: "recall", question: "The distance formula is derived from which theorem?", options: ["Pythagorean Theorem", "Triangle Inequality", "Angle Sum Property", "Law of Cosines"], correctIndex: 0, feedback: "The distance formula d = \u221A((x\u2082\u2212x\u2081)\u00B2 + (y\u2082\u2212y\u2081)\u00B2) comes directly from the Pythagorean theorem." },
  { id: 2, layer: "recall", question: "To find the diagonal of a rectangle, you use:", options: ["length + width", "length \u00D7 width", "\u221A(length\u00B2 + width\u00B2)", "2(length + width)"], correctIndex: 2, feedback: "The diagonal of a rectangle is the hypotenuse of a right triangle formed by the length and width." },
  { id: 3, layer: "recall", question: "How do you check if a triangle with sides 5, 12, 13 is a right triangle?", options: ["Check if 5 + 12 = 13", "Check if 5\u00B2 + 12\u00B2 = 13\u00B2", "Check if all angles are equal", "Check if 5 \u00D7 12 = 13"], correctIndex: 1, feedback: "5\u00B2 + 12\u00B2 = 25 + 144 = 169 = 13\u00B2 \u2714 It is a right triangle!" },
  { id: 4, layer: "procedure", question: "Find the distance between (1, 2) and (4, 6).", options: ["5", "7", "3", "25"], correctIndex: 0, feedback: "d = \u221A((4\u22121)\u00B2 + (6\u22122)\u00B2) = \u221A(9 + 16) = \u221A25 = 5." },
  { id: 5, layer: "procedure", question: "A rectangle is 8 cm wide and 6 cm tall. What is its diagonal?", options: ["10 cm", "14 cm", "48 cm", "100 cm"], correctIndex: 0, feedback: "d = \u221A(8\u00B2 + 6\u00B2) = \u221A(64 + 36) = \u221A100 = 10 cm." },
  { id: 6, layer: "procedure", question: "Is a triangle with sides 6, 8, 11 a right triangle?", options: ["Yes", "No"], correctIndex: 1, feedback: "6\u00B2 + 8\u00B2 = 36 + 64 = 100, but 11\u00B2 = 121. Since 100 \u2260 121, it is NOT a right triangle." },
  { id: 7, layer: "understanding", question: "Two points are at (0, 0) and (0, 5). What is the distance?", options: ["5", "25", "0", "\u221A5"], correctIndex: 0, feedback: "When points share an x-coordinate, the distance is just the difference in y-values: |5 \u2212 0| = 5." },
  { id: 8, layer: "understanding", question: "A TV is 48\u2033 wide and 27\u2033 tall. Its diagonal is closest to:", options: ["55 inches", "75 inches", "40 inches", "65 inches"], correctIndex: 0, feedback: "\u221A(48\u00B2 + 27\u00B2) = \u221A(2304 + 729) = \u221A3033 \u2248 55.1 inches." },
  { id: 9, layer: "understanding", question: "If you double the legs of a right triangle, the diagonal:", options: ["Also doubles", "Quadruples", "Stays the same", "Increases by 2"], correctIndex: 0, feedback: "\u221A((2a)\u00B2 + (2b)\u00B2) = \u221A(4a\u00B2 + 4b\u00B2) = 2\u221A(a\u00B2 + b\u00B2) = 2c. The diagonal doubles!" },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = done ? null : (PROBLEMS[currentIdx] ?? null);

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
          <p className="text-lg" style={{ color: MUTED }}>You got {score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} label="Continue" />
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
            let bg: string = SURFACE;
            let border: string = BORDER;
            if (answered) {
              if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; }
              else if (isSelected) { bg = `${ERROR}20`; border = ERROR; }
            }
            return (
              <motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>
                {opt}
                {answered && isCorrect && <span className="ml-2" style={{ color: SUCCESS }}>{"  \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span className="ml-2" style={{ color: ERROR }}>{"  \u2717"}</span>}
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
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label="Next problem">
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
  const handleSubmit = useCallback(() => { setSubmitted(true); }, []);

  if (submitted) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">{"\uD83E\uDDE0"}</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Connecting the theorem to real applications deepens understanding. +50 XP</p>
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
        <p className="text-center text-sm" style={{ color: MUTED }}>Describe a real-world situation where you would use the Pythagorean theorem to find a distance.</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." className="w-full rounded-xl border-2 p-4 text-base" style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }} aria-label="Reflection text" />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }} aria-label="Submit reflection">Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main Lesson Component                                              */
/* ================================================================== */

export function PythagoreanAppsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.3a Pythagorean Applications" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
