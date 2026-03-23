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
// Constants
// ---------------------------------------------------------------------------

/* ── Lesson-specific semantic colors (aliases to shared tokens) ── */
const THEME = {
  irrational: "#f59e0b",
  irrationalFill: "#f59e0b33",
  rational: colors.accent.indigo,
  rationalFill: "#818cf833",
  pi: "#ec4899",
  sqrt2: colors.accent.emerald,
  primary: colors.accent.indigo,
  success: colors.functional.success,
  error: colors.functional.error,
  surface: colors.bg.secondary,
  elevated: colors.bg.surface,
  text: colors.text.primary,
  textSecondary: colors.text.secondary,
  muted: colors.text.muted,
} as const;

// ---------------------------------------------------------------------------
// Practice problems
// ---------------------------------------------------------------------------

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
  { id: 1, layer: "Recall", type: "multiple-choice",
    prompt: "Which of these is an irrational number?",
    options: ["\u00BD", "\u221A2", "0.75", "3"],
    correctAnswer: "\u221A2",
    feedback: "\u221A2 = 1.41421356... The digits never end or repeat." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "Is \u03C0 rational or irrational?",
    options: ["Rational", "Irrational"],
    correctAnswer: "Irrational",
    feedback: "\u03C0 = 3.14159265... It never terminates or repeats." },
  { id: 3, layer: "Recall", type: "multiple-choice",
    prompt: "Which decimal is irrational?",
    options: ["0.333...", "0.25", "1.41421356...", "0.5"],
    correctAnswer: "1.41421356...",
    feedback: "0.333... repeats (= 1/3). 1.41421356... never repeats \u2014 it's \u221A2." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Which can be written as a fraction?",
    options: ["3.14159...", "2.5", "\u221A3", "\u221A5"],
    correctAnswer: "2.5",
    feedback: "2.5 = 5/2. The square roots and \u03C0 cannot be written as fractions." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "\u221A9 is:",
    options: ["Irrational", "Rational (it equals 3)"],
    correctAnswer: "Rational (it equals 3)",
    feedback: "\u221A9 = 3, which is a whole number. Perfect squares have rational roots." },
  { id: 6, layer: "Understanding", type: "multiple-choice",
    prompt: "Why is 0.101001000100001... irrational?",
    options: [
      "It's too long",
      "The pattern never repeats exactly",
      "It has zeros",
    ],
    correctAnswer: "The pattern never repeats exactly",
    feedback: "Although there's a visible pattern, no block of digits repeats forever. That makes it irrational." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Between any two rational numbers there is:",
    options: [
      "Nothing",
      "Exactly one irrational number",
      "Infinitely many irrational numbers",
    ],
    correctAnswer: "Infinitely many irrational numbers",
    feedback: "The irrationals are dense on the number line \u2014 infinitely many exist between any two rationals." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "If you multiply \u221A2 by itself, the result is:",
    options: ["Irrational", "Rational (equals 2)", "\u221A4"],
    correctAnswer: "Rational (equals 2)",
    feedback: "\u221A2 \u00D7 \u221A2 = 2. Squaring a square root returns a rational number." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function piDigits(count: number): string[] {
  const pi = "3.14159265358979323846264338327950288419716939937510";
  return pi.slice(0, count).split("");
}

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/IrrationalNumbersHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  const digits = useMemo(() => piDigits(30), []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2500));
    timers.push(setTimeout(() => setPhase(3), 4000));
    timers.push(setTimeout(() => setPhase(4), 5500));
    timers.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">

      {/* Pi digits streaming */}
      <div className="flex flex-wrap gap-1 justify-center mb-6 max-w-xs">
        {digits.map((d, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ delay: i * 0.06, ...springs.default }}
            className="font-mono text-xl font-bold"
            style={{ color: d === "." ? THEME.muted : THEME.pi }}>
            {d}
          </motion.span>
        ))}
        {phase >= 2 && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-mono text-xl font-bold" style={{ color: THEME.muted }}>
            ...
          </motion.span>
        )}
      </div>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-bold mb-2"
            style={{ color: THEME.pi, fontSize: "clamp(18px, 4vw, 24px)" }}>
            {"\u03C0"} = 3.14159265...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium"
            style={{ color: THEME.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            The digits go on forever, never repeating.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-1 font-medium"
            style={{ color: THEME.irrational, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
            This is an irrational number.
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
  const [zoom, setZoom] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const NL_W = 520;
  const NL_M = 40;
  const NL_VB_W = 600;
  const NL_VB_H = 140;
  const NL_Y = 60;

  const ranges: Array<{ min: number; max: number; step: number }> = [
    { min: 0, max: 4, step: 1 },
    { min: 3, max: 3.5, step: 0.1 },
    { min: 3.1, max: 3.2, step: 0.02 },
    { min: 3.14, max: 3.15, step: 0.002 },
  ];

  const range = ranges[zoom] ?? ranges[0]!;

  function valToX(val: number): number {
    return NL_M + ((val - range.min) / (range.max - range.min)) * NL_W;
  }

  const ticks = useMemo(() => {
    const result: number[] = [];
    for (let v = range.min; v <= range.max + range.step * 0.1; v += range.step) {
      result.push(Math.round(v * 10000) / 10000);
    }
    return result;
  }, [range.min, range.max, range.step]);

  const piX = valToX(Math.PI);
  const piInRange = Math.PI >= range.min && Math.PI <= range.max;

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 1, ranges.length - 1));
    setInteractions((i) => i + 1);
  }, [ranges.length]);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 1, 0));
    setInteractions((i) => i + 1);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: THEME.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Zoom into the number line to find {"\u03C0"}
      </p>

      <svg viewBox={`0 0 ${NL_VB_W} ${NL_VB_H}`} className="w-full max-w-lg mb-4"
        aria-label="Number line zooming into pi">
        <rect width={NL_VB_W} height={NL_VB_H} fill={colors.bg.primary} rx={8} />
        <line x1={NL_M} y1={NL_Y} x2={NL_M + NL_W} y2={NL_Y} stroke={THEME.elevated} strokeWidth={2} />

        {ticks.map((v) => {
          const x = valToX(v);
          return (
            <g key={v}>
              <line x1={x} y1={NL_Y - 8} x2={x} y2={NL_Y + 8} stroke={THEME.elevated} strokeWidth={1.5} />
              <text x={x} y={NL_Y + 24} textAnchor={"middle" as const} fill={THEME.muted}
                fontSize={zoom >= 2 ? 9 : 11} fontFamily="monospace">
                {v.toFixed(zoom >= 2 ? (zoom >= 3 ? 3 : 2) : zoom >= 1 ? 1 : 0)}
              </text>
            </g>
          );
        })}

        {piInRange && (
          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={springs.default}>
            <circle cx={piX} cy={NL_Y} r={7} fill={THEME.pi} />
            <text x={piX} y={NL_Y - 16} textAnchor={"middle" as const} fill={THEME.pi}
              fontSize={13} fontWeight={700} fontFamily="monospace">
              {"\u03C0"}
            </text>
          </motion.g>
        )}
      </svg>

      <div className="flex gap-3 mb-4">
        <button onClick={handleZoomOut} disabled={zoom === 0}
          className="rounded-xl px-4 py-2 font-medium min-h-[44px] min-w-[44px] transition-colors active:scale-95"
          style={{ backgroundColor: zoom === 0 ? THEME.elevated : THEME.surface,
            color: zoom === 0 ? THEME.muted : THEME.text,
            opacity: zoom === 0 ? 0.5 : 1 }}>
          Zoom Out
        </button>
        <button onClick={handleZoomIn} disabled={zoom >= ranges.length - 1}
          className="rounded-xl px-4 py-2 font-medium min-h-[44px] min-w-[44px] transition-colors active:scale-95"
          style={{ backgroundColor: zoom >= ranges.length - 1 ? THEME.elevated : THEME.pi,
            color: THEME.text,
            opacity: zoom >= ranges.length - 1 ? 0.5 : 1 }}>
          Zoom In
        </button>
      </div>

      <p className="text-xs text-center mb-2" style={{ color: THEME.muted }}>
        Zoom level {zoom + 1}/{ranges.length} {"\u2014"} No matter how far you zoom, {"\u03C0"} sits between rational numbers
      </p>

      <InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={THEME.primary} />
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
    { text: "Rational numbers can be written as a/b where a and b are integers. Like 0.5 = 1/2 or 0.333... = 1/3.", btn: "I see it!" },
    { text: "Irrational numbers CANNOT be written as any fraction. Their decimals never end AND never repeat.", btn: "I see it!" },
    { text: "\u221A2 = 1.41421356... and \u03C0 = 3.14159265... are the most famous examples. They fill the \"gaps\" between rationals!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">

      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3">
            <div className="flex gap-4 items-center">
              {["0.5", "0.333...", "0.75"].map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2, ...springs.default }}
                  className="rounded-xl px-3 py-2"
                  style={{ backgroundColor: THEME.rationalFill, border: `2px solid ${THEME.rational}` }}>
                  <span className="font-mono font-bold text-sm" style={{ color: THEME.rational }}>{n}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              {["= 1/2", "= 1/3", "= 3/4"].map((n, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.2 }}
                  className="font-mono text-xs font-bold" style={{ color: THEME.rational }}>
                  {n}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3">
            <div className="flex gap-4 items-center">
              {["1.4142...", "3.1415...", "2.7182..."].map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2, ...springs.default }}
                  className="rounded-xl px-3 py-2"
                  style={{ backgroundColor: THEME.irrationalFill, border: `2px solid ${THEME.irrational}` }}>
                  <span className="font-mono font-bold text-sm" style={{ color: THEME.irrational }}>{n}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              {["\u221A2", "\u03C0", "e"].map((n, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.2 }}
                  className="font-mono text-xs font-bold" style={{ color: THEME.irrational }}>
                  {n}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3">
            <div className="rounded-xl p-4" style={{ backgroundColor: THEME.rationalFill, border: `1px solid ${THEME.rational}` }}>
              <p className="font-mono text-sm font-bold text-center" style={{ color: THEME.rational }}>
                Rational: a/b (terminates or repeats)
              </p>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: THEME.irrationalFill, border: `1px solid ${THEME.irrational}` }}>
              <p className="font-mono text-sm font-bold text-center" style={{ color: THEME.irrational }}>
                Irrational: no fraction (never repeats)
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={springs.default} className="max-w-md text-center px-4">
          <p className="font-medium mb-4"
            style={{ color: THEME.text, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            {current.text}
          </p>
          <Button size="lg"
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
            className="min-w-[140px]" style={{ backgroundColor: THEME.primary }}>
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
    timers.push(setTimeout(() => setRevealed(1), 1200));
    timers.push(setTimeout(() => setRevealed(2), 2400));
    timers.push(setTimeout(() => setRevealed(3), 3600));
    timers.push(setTimeout(() => setRevealed(4), 4800));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "\u03C0 = 3.14159265...", desc: "Ratio of circumference to diameter", color: THEME.pi },
    { formula: "\u221A2 = 1.41421356...", desc: "Diagonal of a unit square", color: THEME.sqrt2 },
    { formula: "Rational: a/b where b \u2260 0", desc: "Can be expressed as a fraction", color: THEME.rational },
    { formula: "Irrational: NOT a/b for any integers", desc: "Cannot be expressed as any fraction", color: THEME.irrational },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: THEME.text, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Rational vs Irrational
      </h2>
      <div className="space-y-5 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={springs.default}
                className="rounded-xl p-4"
                style={{ backgroundColor: THEME.surface, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: THEME.muted }}>{n.desc}</p>
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
    { icon: "\u{1F4D0}", title: "Circle Measurements", desc: "Every circle\u2019s circumference/diameter = \u03C0", math: "C = \u03C0d" },
    { icon: "\u{1F4D0}", title: "Diagonal of a Square", desc: "A 1\u00D71 square has diagonal = \u221A2", math: "d = \u221A2 \u2248 1.414" },
    { icon: "\u{1F3B5}", title: "Music & Sound", desc: "Frequencies relate by irrational ratios in equal temperament tuning", math: "ratio = 2^(1/12)" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: THEME.text, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Where Irrationals Appear
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...springs.default }}
            className="rounded-xl p-4 flex gap-3 items-start"
            style={{ backgroundColor: THEME.surface }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: THEME.text }}>{s.title}</p>
              <p className="text-sm" style={{ color: THEME.textSecondary }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: THEME.irrational }}>{s.math}</p>
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
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i];
          let bg: string = THEME.elevated;
          if (r === true) bg = THEME.success;
          else if (r === false) bg = THEME.error;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg,
              border: i === currentQ ? `2px solid ${THEME.primary}` : "none" }} />;
        })}
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={springs.default} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: THEME.muted }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}
        </p>
        <p className="text-center font-medium mb-6"
          style={{ color: THEME.text, fontSize: "clamp(15px, 3.5vw, 18px)" }}>
          {problem.prompt}
        </p>

        <div className="space-y-2 w-full">
          {problem.options.map((opt) => {
            let bg: string = THEME.surface; let border: string = THEME.elevated;
            if (submitted) {
              if (opt === problem.correctAnswer) { bg = "#34d39933"; border = THEME.success; }
              else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = THEME.error; }
            } else if (opt === selected) { bg = "#818cf833"; border = THEME.primary; }
            return (
              <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                disabled={submitted}
                className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
                style={{ backgroundColor: bg, border: `2px solid ${border}`, color: THEME.text }}>
                {opt}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={springs.default}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120",
                border: `1px solid ${isCorrect ? THEME.success : THEME.error}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? THEME.success : THEME.error }}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm" style={{ color: THEME.textSecondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full"
              style={{ backgroundColor: THEME.primary, opacity: selected ? 1 : 0.4 }}>
              Check Answer
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: THEME.primary }}>
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

function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = text.trim().length >= 20;

  const handleSubmit = useCallback(() => { if (canSubmit) setSubmitted(true); }, [canSubmit]);
  const handleSkip = useCallback(() => { setSubmitted(true); }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={springs.default} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: THEME.text, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6"
          style={{ color: THEME.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why do you think some numbers can never be written as exact fractions? What does that mean for measurement?
        </p>

        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: THEME.surface, color: THEME.text,
                border: `2px solid ${THEME.elevated}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right"
              style={{ color: text.trim().length >= 20 ? THEME.success : THEME.muted }}>
              {text.trim().length}/20 characters minimum
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={springs.default} className="rounded-xl p-6 text-center"
            style={{ backgroundColor: THEME.surface }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: THEME.success }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: THEME.textSecondary }}>
              Reflecting on concepts deepens your understanding.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: THEME.primary, opacity: canSubmit ? 1 : 0.4 }}>
              Submit Reflection
            </Button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: THEME.muted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onContinue} className="w-full" style={{ backgroundColor: THEME.primary }}>
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

export function IrrationalNumbersLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="NO-1.8 Irrational Numbers" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
