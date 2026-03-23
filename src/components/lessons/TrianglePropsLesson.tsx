"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

// ---------------------------------------------------------------------------
// Lesson-specific theme (not covered by shared tokens)
// ---------------------------------------------------------------------------

const THEME = {
  valid: "#34d399",
  validFill: "#34d39933",
  invalid: "#f87171",
  invalidFill: "#f8717133",
  exterior: "#60a5fa",
  midsegment: "#f59e0b",
} as const;

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

const SIDE_SETS: Array<{ sides: [number, number, number]; label: string }> = [
  { sides: [3, 4, 5], label: "3, 4, 5" },
  { sides: [5, 5, 5], label: "5, 5, 5" },
  { sides: [2, 3, 10], label: "2, 3, 10" },
  { sides: [7, 10, 5], label: "7, 10, 5" },
  { sides: [1, 1, 100], label: "1, 1, 100" },
  { sides: [6, 8, 10], label: "6, 8, 10" },
];

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 1,
    layer: "Recall",
    type: "multiple-choice",
    prompt: "Can sides 3, 4, 8 form a triangle?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    feedback:
      "3 + 4 = 7 < 8, so the two shorter sides can't reach. The triangle inequality fails.",
  },
  {
    id: 2,
    layer: "Recall",
    type: "multiple-choice",
    prompt: "Can sides 5, 7, 10 form a triangle?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback:
      "5 + 7 = 12 > 10. All three inequalities hold, so these sides form a valid triangle.",
  },
  {
    id: 3,
    layer: "Recall",
    type: "multiple-choice",
    prompt: "The exterior angle theorem states the exterior angle equals...",
    options: [
      "The adjacent interior angle",
      "The sum of the two remote interior angles",
      "180 degrees",
      "The opposite interior angle",
    ],
    correctAnswer: "The sum of the two remote interior angles",
    feedback:
      "The exterior angle equals the sum of the two non-adjacent (remote) interior angles.",
  },
  {
    id: 4,
    layer: "Procedure",
    type: "numeric-input",
    prompt:
      "Interior angles are 50\u00B0 and 60\u00B0. What is the exterior angle adjacent to the third angle?",
    correctAnswer: "110",
    feedback:
      "The exterior angle = sum of remote interior angles = 50 + 60 = 110\u00B0.",
  },
  {
    id: 5,
    layer: "Procedure",
    type: "numeric-input",
    prompt:
      "A triangle has sides 10, 14, 18. The midsegment parallel to side 18 has length...?",
    correctAnswer: "9",
    feedback: "The midsegment is half the parallel side: 18 / 2 = 9.",
  },
  {
    id: 6,
    layer: "Procedure",
    type: "multiple-choice",
    prompt: "Which set of sides CANNOT form a triangle?",
    options: ["3, 5, 7", "2, 4, 7", "6, 6, 6", "4, 5, 8"],
    correctAnswer: "2, 4, 7",
    feedback:
      "2 + 4 = 6 < 7, violating the triangle inequality. The short sides are too short.",
  },
  {
    id: 7,
    layer: "Understanding",
    type: "multiple-choice",
    prompt: "Why can't sides 1, 1, 3 form a triangle?",
    options: [
      "1 + 1 = 2, which is less than 3",
      "The sides are too small",
      "Triangles need different side lengths",
      "The angles wouldn't add to 180",
    ],
    correctAnswer: "1 + 1 = 2, which is less than 3",
    feedback:
      "The two shorter sides together (1 + 1 = 2) are too short to bridge the gap of the longest side (3).",
  },
  {
    id: 8,
    layer: "Understanding",
    type: "multiple-choice",
    prompt:
      "If an exterior angle is 130\u00B0, the sum of the two remote interior angles is...",
    options: ["50\u00B0", "130\u00B0", "180\u00B0", "65\u00B0"],
    correctAnswer: "130\u00B0",
    feedback:
      "By the exterior angle theorem, the exterior angle equals the sum of the two remote interior angles.",
  },
  {
    id: 9,
    layer: "Understanding",
    type: "multiple-choice",
    prompt: "A midsegment is always ___ to the third side.",
    options: [
      "Perpendicular",
      "Equal in length",
      "Parallel and half the length",
      "Parallel and equal in length",
    ],
    correctAnswer: "Parallel and half the length",
    feedback:
      "A midsegment connects midpoints of two sides and is parallel to the third side at half its length.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function canFormTriangle(a: number, b: number, c: number): boolean {
  return a + b > c && a + c > b && b + c > a;
}

function computeTriangleVertices(
  a: number,
  b: number,
  c: number,
  cx: number,
  cy: number,
  scale: number,
): { p1x: number; p1y: number; p2x: number; p2y: number; p3x: number; p3y: number } | null {
  if (!canFormTriangle(a, b, c)) return null;
  const sc = c * scale;
  const sb = b * scale;
  const p1x = cx - sc / 2;
  const p1y = cy + 40;
  const p2x = cx + sc / 2;
  const p2y = cy + 40;
  const cosA = (sb * sb + sc * sc - (a * scale) * (a * scale)) / (2 * sb * sc);
  const clampedCos = Math.max(-1, Math.min(1, cosA));
  const sinA = Math.sqrt(1 - clampedCos * clampedCos);
  const p3x = p1x + sb * clampedCos;
  const p3y = p1y - sb * sinA;
  return { p1x, p1y, p2x, p2y, p3x, p3y };
}

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/TrianglePropsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 1000));
    timers.push(setTimeout(() => setPhase(2), 2000));
    timers.push(setTimeout(() => setPhase(3), 3000));
    timers.push(setTimeout(() => setPhase(4), 4000));
    timers.push(setTimeout(() => setPhase(5), 5000));
    timers.push(setTimeout(() => setPhase(6), 6000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite"
    >
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Triangle formation animation">
        {/* Valid triangle 3,4,5 */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.line
            x1={40} y1={130} x2={140} y2={130}
            stroke={THEME.valid} strokeWidth={3} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
          />
          {phase >= 1 && (
            <>
              <motion.line
                x1={140} y1={130} x2={100} y2={55}
                stroke={THEME.valid} strokeWidth={3} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
              />
              <motion.line
                x1={100} y1={55} x2={40} y2={130}
                stroke={THEME.valid} strokeWidth={3} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
              />
              <motion.text
                x={90} y={155} textAnchor={"middle" as const}
                fill={THEME.valid} fontSize={14} fontWeight={600}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                {"3, 4, 5 \u2713"}
              </motion.text>
            </>
          )}
        </motion.g>

        {/* Invalid triangle 1,2,10 */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.line
              x1={180} y1={130} x2={300} y2={130}
              stroke={THEME.invalid} strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
            />
            {phase >= 3 && (
              <>
                <motion.line
                  x1={180} y1={130} x2={190} y2={115}
                  stroke={THEME.invalid} strokeWidth={3} strokeLinecap="round"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={springs.default}
                />
                <motion.line
                  x1={300} y1={130} x2={285} y2={112}
                  stroke={THEME.invalid} strokeWidth={3} strokeLinecap="round"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={springs.default}
                />
                <motion.text
                  x={240} y={155} textAnchor={"middle" as const}
                  fill={THEME.invalid} fontSize={14} fontWeight={600}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                >
                  {"1, 2, 10 \u2717"}
                </motion.text>
              </>
            )}
          </motion.g>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}
          >
            Not every trio of sides can make a triangle...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 5 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-2 font-bold"
            style={{ color: colors.accent.indigo, fontSize: "clamp(20px, 5vw, 32px)" }}
          >
            What&apos;s the rule?
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 6 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [currentSet, setCurrentSet] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const set = SIDE_SETS[currentSet]!;
  const [a, b, c] = set.sides;
  const valid = canFormTriangle(a, b, c);

  const svgW = 320;
  const svgH = 220;
  const cx = svgW / 2;
  const cy = svgH / 2 - 10;
  const maxSide = Math.max(a, b, c);
  const scale = Math.min(100 / maxSide, 25);

  const verts = useMemo(
    () => (valid ? computeTriangleVertices(a, b, c, cx, cy, scale) : null),
    [a, b, c, cx, cy, scale, valid],
  );

  const sorted = useMemo(() => [a, b, c].sort((x, y) => x - y), [a, b, c]);

  const handleSelectSet = useCallback((idx: number) => {
    setCurrentSet(idx);
    setInteractions((i) => i + 1);
  }, []);

  return (
    <section
      className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite"
    >
      <p className="text-center mb-2 font-medium"
        style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Tap different side sets to see which form triangles
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {SIDE_SETS.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSelectSet(i)}
            className="rounded-lg px-3 font-mono text-sm transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: i === currentSet ? colors.accent.indigo : colors.bg.secondary,
              color: colors.text.primary,
              border: `1px solid ${i === currentSet ? colors.accent.indigo : colors.bg.surface}`,
            }}
            aria-label={`Side set ${s.label}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md"
        aria-label={`Triangle with sides ${set.label}: ${valid ? "valid" : "invalid"}`}>
        {valid && verts ? (
          <motion.g key={`valid-${currentSet}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={springs.default}>
            <motion.polygon
              points={`${verts.p1x},${verts.p1y} ${verts.p2x},${verts.p2y} ${verts.p3x},${verts.p3y}`}
              fill={THEME.validFill} stroke={THEME.valid} strokeWidth={3} strokeLinejoin="round"
            />
            <text x={(verts.p1x + verts.p2x) / 2} y={verts.p1y + 18}
              textAnchor={"middle" as const} fill={THEME.valid} fontSize={13}>{c}</text>
            <text x={(verts.p2x + verts.p3x) / 2 + 10} y={(verts.p2y + verts.p3y) / 2}
              textAnchor={"middle" as const} fill={THEME.valid} fontSize={13}>{a}</text>
            <text x={(verts.p1x + verts.p3x) / 2 - 10} y={(verts.p1y + verts.p3y) / 2}
              textAnchor={"middle" as const} fill={THEME.valid} fontSize={13}>{b}</text>
          </motion.g>
        ) : (
          <motion.g key={`invalid-${currentSet}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={springs.default}>
            <motion.line x1={cx - 60} y1={cy + 40} x2={cx + 60} y2={cy + 40}
              stroke={THEME.invalid} strokeWidth={3} strokeLinecap="round" />
            <motion.line x1={cx - 60} y1={cy + 40} x2={cx - 50} y2={cy + 20}
              stroke={THEME.invalid} strokeWidth={3} strokeLinecap="round"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
            <motion.line x1={cx + 60} y1={cy + 40} x2={cx + 50} y2={cy + 20}
              stroke={THEME.invalid} strokeWidth={3} strokeLinecap="round"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
            <motion.text x={cx} y={cy - 10} textAnchor={"middle" as const}
              fill={THEME.invalid} fontSize={16} fontWeight={700}
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, ...springs.default }}>
              Cannot close!
            </motion.text>
          </motion.g>
        )}
      </svg>

      <motion.div key={currentSet} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={springs.default} className="text-center mt-2">
        <span className="font-bold text-lg" style={{ color: valid ? THEME.valid : THEME.invalid }}>
          {valid ? "Valid triangle \u2713" : "Not a triangle \u2717"}
        </span>
        <p className="text-sm mt-1" style={{ color: colors.text.muted }}>
          {valid
            ? `${sorted[0]} + ${sorted[1]} = ${sorted[0]! + sorted[1]!} > ${sorted[2]} \u2713`
            : `${sorted[0]} + ${sorted[1]} = ${sorted[0]! + sorted[1]!} < ${sorted[2]}`}
        </p>
      </motion.div>

      <div className="mt-4">
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
    { text: "Look at the sets that worked. The two shorter sides always add up to MORE than the longest side!", btn: "I see it!" },
    { text: "The exterior angle of a triangle equals the sum of the two remote interior angles. Watch them combine!", btn: "I see it!" },
    { text: "Connect midpoints of two sides \u2014 you get a midsegment that is parallel to the third side and exactly half its length!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox="0 0 300 200" className="w-full max-w-sm mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <polygon points="50,160 250,160 150,40" fill={THEME.validFill} stroke={THEME.valid} strokeWidth={2} />
            <motion.text x={150} y={185} textAnchor={"middle" as const} fill={THEME.valid} fontSize={14} fontWeight={600}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              a + b &gt; c {"\u2713"}
            </motion.text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <polygon points="60,160 240,160 180,50" fill="none" stroke={colors.text.muted} strokeWidth={2} />
            <line x1={240} y1={160} x2={290} y2={160} stroke={THEME.exterior} strokeWidth={2} strokeDasharray="4 4" />
            <motion.path d="M 260 160 A 20 20 0 0 0 248 148" fill="none" stroke={THEME.exterior} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
            <motion.text x={150} y={30} textAnchor={"middle" as const} fill={THEME.exterior} fontSize={12} fontWeight={600}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Ext. = Remote Int. 1 + Remote Int. 2
            </motion.text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <polygon points="50,170 250,170 150,30" fill="none" stroke={colors.text.muted} strokeWidth={2} />
            <motion.circle cx={100} cy={100} r={5} fill={THEME.midsegment}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, ...springs.default }} />
            <motion.circle cx={200} cy={100} r={5} fill={THEME.midsegment}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, ...springs.default }} />
            <motion.line x1={100} y1={100} x2={200} y2={100} stroke={THEME.midsegment} strokeWidth={3}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7 }} />
            <motion.text x={150} y={90} textAnchor={"middle" as const} fill={THEME.midsegment} fontSize={12} fontWeight={600}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              Midsegment = half of base
            </motion.text>
          </motion.g>
        )}
      </svg>

      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={springs.default} className="max-w-md text-center px-4">
          <p className="font-medium mb-4"
            style={{ color: colors.text.primary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            {current.text}
          </p>
          <Button size="lg"
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
            className="min-w-[140px]" style={{ backgroundColor: colors.accent.indigo }}>
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
    { formula: "a + b > c", desc: "Triangle Inequality", color: THEME.valid },
    { formula: "Exterior = Remote\u2081 + Remote\u2082", desc: "Exterior Angle Theorem", color: THEME.exterior },
    { formula: "Midsegment = \u00BD \u00D7 parallel side", desc: "Midsegment Theorem", color: THEME.midsegment },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Key Formulas
      </h2>
      <div className="space-y-6 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={springs.default}
                className="rounded-xl p-4"
                style={{ backgroundColor: colors.bg.secondary, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{n.desc}</p>
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
    { icon: "\u{1F309}", title: "Bridge Trusses", desc: "Engineers check triangle inequality to ensure beams connect.", math: "a + b > c" },
    { icon: "\u{1F3E0}", title: "Roof Framing", desc: "Rafter lengths must satisfy the inequality to form a stable roof.", math: "Side constraints" },
    { icon: "\u{1F9ED}", title: "Land Surveying", desc: "Surveyors verify triangle closure from measured sides.", math: "All three inequalities" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Real World Connections
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...springs.default }}
            className="rounded-xl p-4 flex gap-3 items-start"
            style={{ backgroundColor: colors.bg.secondary }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: colors.text.primary }}>{s.title}</p>
              <p className="text-sm" style={{ color: colors.text.secondary }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: colors.accent.indigo }}>{s.math}</p>
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
    setResults((prev) => {
      const next = [...prev];
      next[currentQ] = userAnswer === problem.correctAnswer;
      return next;
    });
  }, [userAnswer, currentQ, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setInputValue("");
    setSubmitted(false);
  }, [isLast, onComplete]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i];
          let bg: string = colors.bg.elevated;
          if (r === true) bg = colors.functional.success;
          else if (r === false) bg = colors.functional.error;
          return (
            <div key={i} className="rounded-full transition-colors duration-200"
              style={{ width: 10, height: 10, backgroundColor: bg,
                border: i === currentQ ? `2px solid ${colors.accent.indigo}` : "none" }} />
          );
        })}
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={springs.default} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: colors.text.muted }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}
        </p>
        <p className="text-center font-medium mb-6"
          style={{ color: colors.text.primary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>
          {problem.prompt}
        </p>

        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2 w-full">
            {problem.options.map((opt) => {
              let bg: string = colors.bg.secondary;
              let border: string = colors.bg.surface;
              if (submitted) {
                if (opt === problem.correctAnswer) { bg = "#34d39933"; border = colors.functional.success; }
                else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = colors.functional.error; }
              } else if (opt === selected) { bg = "#818cf833"; border = colors.accent.indigo; }
              return (
                <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                  disabled={submitted}
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
                  style={{ backgroundColor: bg, border: `2px solid ${border}`, color: colors.text.primary }}>
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
            style={{
              backgroundColor: colors.bg.secondary, color: colors.text.primary,
              border: `2px solid ${submitted ? (isCorrect ? colors.functional.success : colors.functional.error) : colors.bg.surface}`,
              outline: "none",
            }} />
        )}

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={springs.default}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120",
                border: `1px solid ${isCorrect ? colors.functional.success : colors.functional.error}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? colors.functional.success : colors.functional.error }}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm" style={{ color: colors.text.secondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full"
              style={{ backgroundColor: colors.accent.indigo, opacity: userAnswer ? 1 : 0.4 }}>
              Check Answer
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full"
              style={{ backgroundColor: colors.accent.indigo }}>
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
        transition={springs.default} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>
          Reflect
        </h2>
        <p className="text-center mb-6"
          style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          In your own words, explain why two short sticks can&apos;t always form a triangle with a long stick.
        </p>

        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: colors.bg.secondary, color: colors.text.primary,
                border: `2px solid ${colors.bg.surface}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right"
              style={{ color: text.trim().length >= 20 ? colors.functional.success : colors.text.muted }}>
              {text.trim().length}/20 characters minimum
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={springs.default} className="rounded-xl p-6 text-center"
            style={{ backgroundColor: colors.bg.secondary }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: colors.functional.success }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: colors.text.secondary }}>
              Reflecting on concepts deepens your understanding.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: colors.accent.indigo, opacity: canSubmit ? 1 : 0.4 }}>
              Submit Reflection
            </Button>
            <button onClick={handleSkip}
              className="w-full text-center py-2 min-h-[44px]"
              style={{ color: colors.text.muted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full"
              style={{ backgroundColor: colors.accent.indigo }}>
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

export function TrianglePropsLesson({ onComplete }: { onComplete?: () => void }) {
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);

  return (
    <LessonShell title="GE-4.2a Triangle Properties" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook":
            return <HookStage onComplete={advance} />;
          case "spatial":
            return <SpatialStage onComplete={advance} />;
          case "discovery":
            return <DiscoveryStage onComplete={advance} />;
          case "symbol":
            return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld":
            return <RealWorldStage onComplete={advance} />;
          case "practice":
            return <PracticeStage onComplete={advance} />;
          case "reflection":
            return <ReflectionStage onComplete={handleReflectionComplete} />;
          default:
            return null;
        }
      }}
    </LessonShell>
  );
}
