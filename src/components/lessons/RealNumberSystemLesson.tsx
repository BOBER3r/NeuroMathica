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
  natural: "#34d399",
  whole: "#60a5fa",
  integer: "#818cf8",
  rational: "#f59e0b",
  irrational: "#ec4899",
  real: "#a78bfa",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  bgElevated: "#334155",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  success: "#34d399",
  error: "#f87171",
  primary: "#818cf8",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

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
    prompt: "Which set does 7 belong to?",
    options: ["Natural, Whole, Integer, Rational, Real", "Whole, Integer, Rational only", "Only Natural"],
    correctAnswer: "Natural, Whole, Integer, Rational, Real",
    feedback: "7 is a counting number, so it belongs to ALL sets: Natural \u2282 Whole \u2282 Integer \u2282 Rational \u2282 Real." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "Which set does \u22123 belong to?",
    options: ["Natural numbers", "Integers, Rational, Real", "Only Irrational"],
    correctAnswer: "Integers, Rational, Real",
    feedback: "\u22123 is negative, so not natural or whole. But it IS an integer (and therefore rational and real)." },
  { id: 3, layer: "Recall", type: "multiple-choice",
    prompt: "0 is a natural number.",
    options: ["True", "False"],
    correctAnswer: "False",
    feedback: "Natural numbers are counting numbers: 1, 2, 3, ... Zero is a WHOLE number but not natural." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Classify \u221A5:",
    options: ["Rational", "Irrational", "Integer", "Whole"],
    correctAnswer: "Irrational",
    feedback: "\u221A5 = 2.2360679... It never terminates or repeats. It\u2019s irrational (and real)." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Classify 0.75:",
    options: ["Irrational", "Rational (and Real)", "Natural"],
    correctAnswer: "Rational (and Real)",
    feedback: "0.75 = 3/4. It can be written as a fraction, so it\u2019s rational." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "Which is the smallest set containing \u22127?",
    options: ["Natural", "Whole", "Integer", "Rational"],
    correctAnswer: "Integer",
    feedback: "\u22127 is negative, so the smallest set it fits in is the integers." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Every integer is rational because...",
    options: [
      "It can be written as n/1",
      "It has a decimal expansion",
      "Integers are bigger than rationals",
    ],
    correctAnswer: "It can be written as n/1",
    feedback: "Any integer n = n/1, which is a fraction. So every integer is also rational." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Rational and irrational numbers together make up the...",
    options: ["Integers", "Whole numbers", "Real numbers"],
    correctAnswer: "Real numbers",
    feedback: "Real = Rational \u222A Irrational. Every point on the number line is a real number." },
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
  return <VideoHook src="/videos/RealNumberSystemHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2000));
    timers.push(setTimeout(() => setPhase(3), 3200));
    timers.push(setTimeout(() => setPhase(4), 4400));
    timers.push(setTimeout(() => setPhase(5), 5600));
    timers.push(setTimeout(() => setPhase(6), 7000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const sets = [
    { label: "Natural", examples: "1, 2, 3, ...", color: COLORS.natural },
    { label: "Whole", examples: "0, 1, 2, 3, ...", color: COLORS.whole },
    { label: "Integer", examples: "..., \u22122, \u22121, 0, 1, 2, ...", color: COLORS.integer },
    { label: "Rational", examples: "\u00BD, 0.75, \u22123, ...", color: COLORS.rational },
    { label: "Real", examples: "\u03C0, \u221A2, and ALL above", color: COLORS.real },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      <div className="relative mb-6" style={{ width: 280, height: 280 }}>
        {/* Render largest circle first (behind), smallest last (on top) */}
        {[...sets].reverse().map((s, ri) => {
          const i = sets.length - 1 - ri;
          const size = 60 + i * 48;
          const offset = (280 - size) / 2;
          return (
            <AnimatePresence key={i}>
              {phase >= i + 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                  className="absolute rounded-full flex items-end justify-center pb-1"
                  style={{
                    width: size, height: size,
                    left: offset, top: offset,
                    border: `2px solid ${s.color}`,
                    backgroundColor: `${s.color}10`,
                  }}>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.label}</span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      <AnimatePresence>
        {phase >= 6 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Every number has a home. Some belong to many sets at once!
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 6 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const numbers: Array<{ value: string; sets: string[]; color: string }> = [
    { value: "5", sets: ["Natural", "Whole", "Integer", "Rational", "Real"], color: COLORS.natural },
    { value: "0", sets: ["Whole", "Integer", "Rational", "Real"], color: COLORS.whole },
    { value: "\u22123", sets: ["Integer", "Rational", "Real"], color: COLORS.integer },
    { value: "3/4", sets: ["Rational", "Real"], color: COLORS.rational },
    { value: "\u221A2", sets: ["Irrational", "Real"], color: COLORS.irrational },
    { value: "\u03C0", sets: ["Irrational", "Real"], color: COLORS.irrational },
  ];

  const selected = numbers.find((n) => n.value === selectedNumber);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-3 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Tap a number to see which sets it belongs to
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {numbers.map((n) => (
          <button key={n.value} onClick={() => { setSelectedNumber(n.value); interact(); }}
            className="rounded-xl px-4 py-2 font-mono font-bold min-h-[44px] min-w-[44px] transition-colors active:scale-95"
            style={{
              backgroundColor: n.value === selectedNumber ? n.color : COLORS.bgSurface,
              color: n.value === selectedNumber ? COLORS.bgPrimary : COLORS.textPrimary,
            }}>
            {n.value}
          </button>
        ))}
      </div>

      {selected && (
        <motion.div key={selected.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={SPRING} className="w-full max-w-sm">
          <div className="rounded-xl p-4" style={{ backgroundColor: COLORS.bgSurface }}>
            <p className="font-bold text-lg text-center mb-3" style={{ color: selected.color }}>
              {selected.value}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selected.sets.map((s) => (
                <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: `${selected.color}20`, color: selected.color, border: `1px solid ${selected.color}` }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-4">
        <InteractionDots count={Math.min(interactions, 6)} total={6} />
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
    { text: "Natural numbers are the counting numbers: 1, 2, 3, ... Add zero and you get the Whole numbers.", btn: "I see it!" },
    { text: "Add negatives to whole numbers and you get Integers. Add fractions and you get Rationals.", btn: "I see it!" },
    { text: "Irrational numbers (\u03C0, \u221A2) can\u2019t be fractions. Rational + Irrational = the complete Real number line!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-2 items-center">
            <div className="rounded-xl px-4 py-2" style={{ border: `2px solid ${COLORS.natural}`, backgroundColor: `${COLORS.natural}15` }}>
              <span className="font-mono font-bold text-sm" style={{ color: COLORS.natural }}>Natural: 1, 2, 3, 4, ...</span>
            </div>
            <span className="text-lg font-bold" style={{ color: COLORS.textMuted }}>{"\u2193"} add 0</span>
            <div className="rounded-xl px-4 py-2" style={{ border: `2px solid ${COLORS.whole}`, backgroundColor: `${COLORS.whole}15` }}>
              <span className="font-mono font-bold text-sm" style={{ color: COLORS.whole }}>Whole: 0, 1, 2, 3, ...</span>
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-2 items-center">
            <div className="rounded-xl px-4 py-2" style={{ border: `2px solid ${COLORS.whole}`, backgroundColor: `${COLORS.whole}15` }}>
              <span className="font-mono font-bold text-sm" style={{ color: COLORS.whole }}>Whole numbers</span>
            </div>
            <span className="text-lg font-bold" style={{ color: COLORS.textMuted }}>{"\u2193"} add negatives</span>
            <div className="rounded-xl px-4 py-2" style={{ border: `2px solid ${COLORS.integer}`, backgroundColor: `${COLORS.integer}15` }}>
              <span className="font-mono font-bold text-sm" style={{ color: COLORS.integer }}>Integers: ..., {"\u2212"}2, {"\u2212"}1, 0, 1, 2, ...</span>
            </div>
            <span className="text-lg font-bold" style={{ color: COLORS.textMuted }}>{"\u2193"} add fractions</span>
            <div className="rounded-xl px-4 py-2" style={{ border: `2px solid ${COLORS.rational}`, backgroundColor: `${COLORS.rational}15` }}>
              <span className="font-mono font-bold text-sm" style={{ color: COLORS.rational }}>Rational: a/b</span>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-2 items-center">
            <div className="flex gap-3">
              <div className="rounded-xl px-3 py-2" style={{ border: `2px solid ${COLORS.rational}`, backgroundColor: `${COLORS.rational}15` }}>
                <span className="font-mono font-bold text-xs" style={{ color: COLORS.rational }}>Rational</span>
              </div>
              <span className="font-bold text-lg self-center" style={{ color: COLORS.textMuted }}>+</span>
              <div className="rounded-xl px-3 py-2" style={{ border: `2px solid ${COLORS.irrational}`, backgroundColor: `${COLORS.irrational}15` }}>
                <span className="font-mono font-bold text-xs" style={{ color: COLORS.irrational }}>Irrational</span>
              </div>
            </div>
            <span className="text-lg font-bold" style={{ color: COLORS.textMuted }}>=</span>
            <div className="rounded-xl px-4 py-2" style={{ border: `2px solid ${COLORS.real}`, backgroundColor: `${COLORS.real}15` }}>
              <span className="font-mono font-bold text-sm" style={{ color: COLORS.real }}>Real Numbers</span>
            </div>
          </motion.div>
        )}
      </div>

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
    timers.push(setTimeout(() => setRevealed(1), 1200));
    timers.push(setTimeout(() => setRevealed(2), 2400));
    timers.push(setTimeout(() => setRevealed(3), 3600));
    timers.push(setTimeout(() => setRevealed(4), 4800));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "\u2115 \u2282 \u2124\u2080 \u2282 \u2124 \u2282 \u211A \u2282 \u211D", desc: "Natural \u2282 Whole \u2282 Integer \u2282 Rational \u2282 Real", color: COLORS.real },
    { formula: "\u211A = {a/b : a,b \u2208 \u2124, b \u2260 0}", desc: "Rationals are fractions of integers", color: COLORS.rational },
    { formula: "Irrational = \u211D \\ \u211A", desc: "Irrationals are reals that aren't rational", color: COLORS.irrational },
    { formula: "\u211D = \u211A \u222A Irrational", desc: "Every real number is rational OR irrational", color: COLORS.real },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Set Notation
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
    { icon: "\u{1F3C3}", title: "Counting People", desc: "5 runners = natural number", math: "Natural: 1, 2, 3, ..." },
    { icon: "\u{1F321}\u{FE0F}", title: "Temperature", desc: "\u221215\u00B0F needs integers (negatives)", math: "Integer: ..., \u22122, \u22121, 0, 1, 2, ..." },
    { icon: "\u{1F4CF}", title: "Measurement", desc: "2.5 inches = rational number", math: "Rational: a/b" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Numbers All Around Us
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
              <p className="text-xs font-mono mt-1" style={{ color: COLORS.real }}>{s.math}</p>
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
    if (isLast) { onComplete(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false);
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

        <div className="space-y-2 w-full">
          {problem.options.map((opt) => {
            let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
            if (submitted) {
              if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; }
              else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; }
            } else if (opt === selected) { bg = "#818cf833"; border = COLORS.primary; }
            return (
              <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                disabled={submitted}
                className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
                style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>
                {opt}
              </button>
            );
          })}
        </div>

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
            <Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full"
              style={{ backgroundColor: COLORS.primary, opacity: selected ? 1 : 0.4 }}>
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
          Why do mathematicians organize numbers into nested sets? How does knowing which set a number belongs to help you?
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
              style={{ color: COLORS.textMuted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
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

export function RealNumberSystemLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>NO-1.10 Real Number System</span>
          <span className="text-xs tabular-nums" style={{ color: COLORS.bgElevated }}>{stageIdx + 1}/{STAGES.length}</span>
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
