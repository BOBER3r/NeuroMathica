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

/* ── Lesson-specific semantic colors (THEME) ── */
const THEME = {
  slice: colors.functional.info,
  sliceFill: colors.functional.info + "33",
  solid: colors.accent.indigo,
  solidFill: colors.accent.indigo + "33",
  highlight: colors.accent.emerald,
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

type SliceAngle = "horizontal" | "vertical" | "diagonal";
type SolidChoice = "cube" | "cylinder" | "cone";

interface PracticeProblem {
  id: number;
  layer: string;
  type: "multiple-choice";
  prompt: string;
  options: string[];
  correctAnswer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "A cross-section is...",
    options: ["A 3D copy of a solid", "The 2D shape you see when you slice through a solid", "The surface area of a solid", "The shadow of a solid"],
    correctAnswer: "The 2D shape you see when you slice through a solid",
    feedback: "A cross-section is the flat 2D shape revealed when a plane cuts through a 3D solid." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "A horizontal slice through a cube gives...",
    options: ["A circle", "A square", "A triangle", "A rectangle"],
    correctAnswer: "A square",
    feedback: "Slicing a cube parallel to a face always gives a square." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "A horizontal slice through a cylinder gives...",
    options: ["A rectangle", "A circle", "An ellipse", "A triangle"],
    correctAnswer: "A circle",
    feedback: "Slicing perpendicular to the height (horizontally) gives a circle." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "A vertical slice through the center of a cylinder gives...",
    options: ["A circle", "A rectangle", "A triangle", "An ellipse"],
    correctAnswer: "A rectangle",
    feedback: "Cutting vertically through the center reveals a rectangle (width = diameter, height = cylinder height)." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "A vertical slice through the apex of a cone gives...",
    options: ["A circle", "A triangle", "A square", "An oval"],
    correctAnswer: "A triangle",
    feedback: "Cutting through the tip and center of the base reveals a triangle." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "A horizontal slice through a cone (not at the tip) gives...",
    options: ["A triangle", "A circle", "A rectangle", "A point"],
    correctAnswer: "A circle",
    feedback: "Slicing horizontally through a cone gives a circle (smaller as you go higher)." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "A diagonal slice through a cube can give...",
    options: ["Only squares", "Only rectangles", "A rectangle (non-square)", "Only triangles"],
    correctAnswer: "A rectangle (non-square)",
    feedback: "A diagonal cut can create rectangles, triangles, pentagons, or even hexagons depending on the angle!" },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Why do different slice angles through the same solid give different shapes?",
    options: [
      "Because the plane intersects different faces at different angles",
      "Because the solid changes shape",
      "Because 2D shapes don't exist inside 3D solids",
      "They always give the same shape",
    ],
    correctAnswer: "Because the plane intersects different faces at different angles",
    feedback: "The angle of the cutting plane determines which faces it crosses, creating different 2D outlines." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "An MRI scanner creates images using...",
    options: ["Shadows", "Cross-sections of the body", "3D printing", "Volume calculations"],
    correctAnswer: "Cross-sections of the body",
    feedback: "MRIs take horizontal slice images through your body \u2014 real-world cross-sections!" },
];

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/CrossSectionsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2500));
    timers.push(setTimeout(() => setPhase(3), 4200));
    timers.push(setTimeout(() => setPhase(4), 5800));
    timers.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const svgW = 300;
  const svgH = 220;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Slicing a loaf of bread">
        {/* Bread loaf */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={60} y={60} width={180} height={100} rx={20} ry={20}
              fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
            <text x={150} y={185} textAnchor={"middle" as const} fill={MUTED} fontSize={12}>
              A loaf of bread
            </text>
          </motion.g>
        )}

        {/* Slice plane */}
        {phase >= 2 && (
          <motion.line x1={150} y1={45} x2={150} y2={175}
            stroke={THEME.slice} strokeWidth={3} strokeDasharray="6,4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
        )}

        {/* Revealed cross-section */}
        {phase >= 3 && (
          <motion.g initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}>
            <rect x={155} y={60} width={85} height={100} rx={20} ry={20}
              fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
            <rect x={147} y={62} width={6} height={96} rx={3}
              fill={THEME.sliceFill} stroke={THEME.slice} strokeWidth={2} />
          </motion.g>
        )}

        {/* Label */}
        {phase >= 4 && (
          <motion.text x={150} y={35} textAnchor={"middle" as const}
            fill={THEME.slice} fontSize={15} fontWeight={700}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Cross-Section!
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Cut through a 3D solid and see the 2D shape inside.
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
  const [solid, setSolid] = useState<SolidChoice>("cube");
  const [angle, setAngle] = useState<SliceAngle>("horizontal");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const crossSectionShape = useMemo(() => {
    if (solid === "cube") {
      if (angle === "horizontal") return "Square";
      if (angle === "vertical") return "Square";
      return "Rectangle";
    }
    if (solid === "cylinder") {
      if (angle === "horizontal") return "Circle";
      if (angle === "vertical") return "Rectangle";
      return "Ellipse";
    }
    // cone
    if (angle === "horizontal") return "Circle";
    if (angle === "vertical") return "Triangle";
    return "Parabola";
  }, [solid, angle]);

  const svgW = 280;
  const svgH = 220;
  const cx = svgW / 2;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Pick a solid and slice direction
      </p>

      {/* Solid picker */}
      <div className="flex gap-2 justify-center mb-2">
        {(["cube", "cylinder", "cone"] as const).map((s) => (
          <button key={s} onClick={() => { setSolid(s); interact(); }}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{ backgroundColor: solid === s ? THEME.solid : SURFACE, color: TEXT }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Angle picker */}
      <div className="flex gap-2 justify-center mb-3">
        {(["horizontal", "vertical", "diagonal"] as const).map((a) => (
          <button key={a} onClick={() => { setAngle(a); interact(); }}
            className="rounded-lg px-3 py-2 text-xs font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{ backgroundColor: angle === a ? THEME.slice : SURFACE, color: TEXT }}>
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label={`${solid} with ${angle} slice`}>
        {/* Solid outline */}
        {solid === "cube" && (
          <rect x={cx - 50} y={30} width={100} height={100}
            fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} rx={2} />
        )}
        {solid === "cylinder" && (
          <g>
            <ellipse cx={cx} cy={40} rx={50} ry={12} fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
            <line x1={cx - 50} y1={40} x2={cx - 50} y2={140} stroke={THEME.solid} strokeWidth={2} />
            <line x1={cx + 50} y1={40} x2={cx + 50} y2={140} stroke={THEME.solid} strokeWidth={2} />
            <ellipse cx={cx} cy={140} rx={50} ry={12} fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
          </g>
        )}
        {solid === "cone" && (
          <g>
            <line x1={cx} y1={30} x2={cx - 50} y2={150} stroke={THEME.solid} strokeWidth={2} />
            <line x1={cx} y1={30} x2={cx + 50} y2={150} stroke={THEME.solid} strokeWidth={2} />
            <ellipse cx={cx} cy={150} rx={50} ry={10} fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
          </g>
        )}

        {/* Slice plane visualization */}
        {angle === "horizontal" && (
          <motion.line x1={cx - 70} y1={90} x2={cx + 70} y2={90}
            stroke={THEME.slice} strokeWidth={3} strokeDasharray="6,4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        )}
        {angle === "vertical" && (
          <motion.line x1={cx} y1={15} x2={cx} y2={170}
            stroke={THEME.slice} strokeWidth={3} strokeDasharray="6,4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        )}
        {angle === "diagonal" && (
          <motion.line x1={cx - 60} y1={140} x2={cx + 60} y2={40}
            stroke={THEME.slice} strokeWidth={3} strokeDasharray="6,4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        )}

        {/* Cross-section label */}
        <motion.text x={cx} y={195} textAnchor={"middle" as const}
          fill={THEME.highlight} fontSize={16} fontWeight={700}
          key={`${solid}-${angle}`}
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
          {crossSectionShape}
        </motion.text>
      </svg>

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
    { text: "The same solid can produce different cross-sections depending on the angle of the cut.", btn: "I see it!" },
    { text: "Horizontal slices through cylinders and cones always give circles (just different sizes).", btn: "I see it!" },
    { text: "Cross-sections help us see inside 3D objects \u2014 just like an MRI scans your body in slices.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox="0 0 280 120" className="w-full max-w-[280px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Show same cube, different slices */}
            <rect x={20} y={20} width={60} height={60} fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
            <line x1={20} y1={50} x2={80} y2={50} stroke={THEME.slice} strokeWidth={2} />
            <text x={50} y={100} textAnchor={"middle" as const} fill={THEME.slice} fontSize={10}>Square</text>
            <rect x={110} y={20} width={60} height={60} fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
            <line x1={110} y1={80} x2={170} y2={20} stroke={THEME.slice} strokeWidth={2} />
            <text x={140} y={100} textAnchor={"middle" as const} fill={THEME.slice} fontSize={10}>Rectangle</text>
            <rect x={200} y={20} width={60} height={60} fill={THEME.solidFill} stroke={THEME.solid} strokeWidth={2} />
            <line x1={200} y1={50} x2={230} y2={20} stroke={THEME.slice} strokeWidth={2} />
            <text x={230} y={100} textAnchor={"middle" as const} fill={THEME.slice} fontSize={10}>Triangle</text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Circles of decreasing size */}
            <circle cx={60} cy={60} r={40} fill="none" stroke={THEME.highlight} strokeWidth={2} />
            <circle cx={150} cy={60} r={30} fill="none" stroke={THEME.highlight} strokeWidth={2} />
            <circle cx={225} cy={60} r={18} fill="none" stroke={THEME.highlight} strokeWidth={2} />
            <text x={140} y={115} textAnchor={"middle" as const} fill={THEME.highlight} fontSize={12} fontWeight={600}>
              Always circles, getting smaller
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={140} y={55} textAnchor={"middle" as const} fill={PRIMARY} fontSize={14} fontWeight={600}>
              MRI = real-world cross-sections
            </text>
            <text x={140} y={80} textAnchor={"middle" as const} fill={MUTED} fontSize={11}>
              Slice by slice, building a 3D picture
            </text>
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
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "Cube \u2192 Square, Rectangle, Triangle", desc: "Depending on the cut angle through a cube", color: THEME.solid },
    { formula: "Cylinder \u2192 Circle, Rectangle, Ellipse", desc: "Horizontal gives circle, vertical gives rectangle", color: THEME.slice },
    { formula: "Cone \u2192 Circle, Triangle, Parabola, Ellipse", desc: "These are the famous conic sections!", color: THEME.highlight },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Cross-Section Reference
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4"
                style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold text-base" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: MUTED }}>{n.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F3E5}", title: "MRI / CT Scans", desc: "Doctors view cross-sectional slices of the body to find problems.", math: "Horizontal slices" },
    { icon: "\u{1F352}", title: "Cutting Fruit", desc: "Slice an orange horizontally: circle. Vertically: circle. Diagonally: ellipse!", math: "Sphere cross-sections" },
    { icon: "\u{1F3D7}\uFE0F", title: "Architecture", desc: "Floor plans are horizontal cross-sections of buildings.", math: "Horizontal slice of a building" },
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
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));

  const problem = PRACTICE_PROBLEMS[currentQ]!;
  const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;

  const handleSubmit = useCallback(() => {
    if (!selected) return;
    setSubmitted(true);
    setResults((prev) => { const next = [...prev]; next[currentQ] = selected === problem.correctAnswer; return next; });
  }, [selected, currentQ, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) { onContinue(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false);
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

        <div className="space-y-2 w-full">
          {problem.options.map((opt) => {
            let bg: string = SURFACE;
            let border: string = ELEVATED;
            if (submitted) {
              if (opt === problem.correctAnswer) { bg = SUCCESS + "33"; border = SUCCESS; }
              else if (opt === selected && opt !== problem.correctAnswer) { bg = ERROR + "33"; border = ERROR; }
            } else if (opt === selected) { bg = PRIMARY + "33"; border = PRIMARY; }
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

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? SUCCESS + "20" : ERROR + "20",
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
            <Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: selected ? 1 : 0.4 }}>
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
          Pick a 3D object from your room. Imagine slicing it horizontally, then vertically. What shapes would you see?
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
              style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
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

export function CrossSectionsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.8 Cross-Sections" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onContinue={advance} />;
          case "spatial": return <SpatialStage onContinue={advance} />;
          case "discovery": return <DiscoveryStage onContinue={advance} />;
          case "symbol": return <SymbolBridgeStage onContinue={advance} />;
          case "realWorld": return <RealWorldStage onContinue={advance} />;
          case "practice": return <PracticeStage onContinue={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
