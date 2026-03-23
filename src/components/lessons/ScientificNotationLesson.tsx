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
  coefficient: "#34d399",
  exponent: "#f59e0b",
  standard: "#818cf8",
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
    prompt: "Write 5,000 in scientific notation.",
    options: ["5 \u00D7 10\u00B3", "50 \u00D7 10\u00B2", "0.5 \u00D7 10\u2074", "5 \u00D7 10\u2074"],
    correctAnswer: "5 \u00D7 10\u00B3",
    feedback: "5,000 = 5 \u00D7 1,000 = 5 \u00D7 10\u00B3. The coefficient must be 1 \u2264 a < 10." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "Write 0.003 in scientific notation.",
    options: ["3 \u00D7 10\u207B\u00B3", "30 \u00D7 10\u207B\u2074", "0.3 \u00D7 10\u207B\u00B2", "3 \u00D7 10\u00B3"],
    correctAnswer: "3 \u00D7 10\u207B\u00B3",
    feedback: "Move the decimal 3 places right to get 3. So 0.003 = 3 \u00D7 10\u207B\u00B3." },
  { id: 3, layer: "Recall", type: "multiple-choice",
    prompt: "What is 4.2 \u00D7 10\u00B2 in standard form?",
    options: ["420", "42", "4,200", "0.042"],
    correctAnswer: "420",
    feedback: "10\u00B2 = 100. So 4.2 \u00D7 100 = 420." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Write 93,000,000 in scientific notation.",
    options: ["9.3 \u00D7 10\u2077", "93 \u00D7 10\u2076", "9.3 \u00D7 10\u2078", "0.93 \u00D7 10\u2078"],
    correctAnswer: "9.3 \u00D7 10\u2077",
    feedback: "Move decimal 7 places left: 93,000,000 = 9.3 \u00D7 10\u2077." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Write 0.00067 in scientific notation.",
    options: ["6.7 \u00D7 10\u207B\u2074", "67 \u00D7 10\u207B\u2075", "6.7 \u00D7 10\u2074", "0.67 \u00D7 10\u207B\u00B3"],
    correctAnswer: "6.7 \u00D7 10\u207B\u2074",
    feedback: "Move decimal 4 places right to get 6.7. So 0.00067 = 6.7 \u00D7 10\u207B\u2074." },
  { id: 6, layer: "Understanding", type: "multiple-choice",
    prompt: "Which is larger: 3.1 \u00D7 10\u2075 or 9.8 \u00D7 10\u2074?",
    options: ["3.1 \u00D7 10\u2075", "9.8 \u00D7 10\u2074", "They are equal"],
    correctAnswer: "3.1 \u00D7 10\u2075",
    feedback: "3.1 \u00D7 10\u2075 = 310,000 vs 9.8 \u00D7 10\u2074 = 98,000. Compare exponents first!" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Why must the coefficient be between 1 and 10?",
    options: [
      "It's just a convention",
      "To ensure a unique representation for each number",
      "Because of calculator limits",
    ],
    correctAnswer: "To ensure a unique representation for each number",
    feedback: "Without this rule, 500 could be 5\u00D710\u00B2 or 50\u00D710\u00B9 or 0.5\u00D710\u00B3. The rule gives one answer." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "What does a negative exponent mean in scientific notation?",
    options: [
      "The number is negative",
      "The number is less than 1 (small)",
      "Multiply by a negative power",
    ],
    correctAnswer: "The number is less than 1 (small)",
    feedback: "Negative exponent = divide by 10 repeatedly. The number is between 0 and 1." },
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
  return <VideoHook src="/videos/ScientificNotationHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

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
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING} className="text-center mb-4">
            <p className="font-mono text-sm mb-1" style={{ color: COLORS.textMuted }}>Distance to the Sun:</p>
            <p className="font-mono font-bold" style={{ color: COLORS.standard, fontSize: "clamp(16px, 4vw, 22px)" }}>
              93,000,000 miles
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING} className="text-center mb-4">
            <p className="font-mono text-sm mb-1" style={{ color: COLORS.textMuted }}>Width of a human hair:</p>
            <p className="font-mono font-bold" style={{ color: COLORS.standard, fontSize: "clamp(16px, 4vw, 22px)" }}>
              0.000075 meters
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-bold mb-2"
            style={{ color: COLORS.exponent, fontSize: "clamp(16px, 4vw, 22px)" }}>
            So many zeros! There has to be a better way...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center">
            <p className="font-mono font-bold" style={{ color: COLORS.coefficient, fontSize: "clamp(18px, 5vw, 26px)" }}>
              <span style={{ color: COLORS.coefficient }}>9.3</span>
              <span style={{ color: COLORS.textMuted }}> {"\u00D7"} </span>
              <span style={{ color: COLORS.exponent }}>10</span>
              <span style={{ color: COLORS.exponent, fontSize: "0.7em", verticalAlign: "super" }}>7</span>
            </p>
          </motion.div>
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
  const [exponent, setExponent] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const value = Math.pow(10, exponent);
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const formatValue = (v: number): string => {
    if (v >= 1) return v.toLocaleString();
    return v.toFixed(Math.abs(exponent));
  };

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-3 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Slide the exponent to see powers of 10
      </p>

      <div className="w-full max-w-sm mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button onClick={() => { if (exponent > -5) { setExponent((e) => e - 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
            aria-label="Decrease exponent">{"\u2212"}</button>
          <div className="text-center">
            <p className="font-mono font-bold text-2xl" style={{ color: COLORS.exponent }}>
              10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{exponent}</span>
            </p>
          </div>
          <button onClick={() => { if (exponent < 9) { setExponent((e) => e + 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
            aria-label="Increase exponent">+</button>
        </div>

        <motion.div key={exponent} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={SPRING} className="rounded-xl p-4 text-center"
          style={{ backgroundColor: COLORS.bgSurface }}>
          <p className="font-mono font-bold text-xl mb-2" style={{ color: COLORS.standard }}>
            = {formatValue(value)}
          </p>
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            {exponent >= 0
              ? `1 followed by ${exponent} zeros`
              : `Decimal point, then ${Math.abs(exponent) - 1} zeros, then 1`}
          </p>
        </motion.div>
      </div>

      <InteractionDots count={Math.min(interactions, 8)} total={8} />
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
    { text: "Scientific notation writes numbers as a \u00D7 10\u207F where 1 \u2264 a < 10.", btn: "I see it!" },
    { text: "For big numbers: move the decimal LEFT and count places. That count becomes the positive exponent.", btn: "I see it!" },
    { text: "For small numbers: move the decimal RIGHT and count places. That count becomes the negative exponent.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: COLORS.bgSurface }}>
            <p className="font-mono font-bold text-lg">
              <span style={{ color: COLORS.coefficient }}>a</span>
              <span style={{ color: COLORS.textMuted }}> {"\u00D7"} </span>
              <span style={{ color: COLORS.exponent }}>10</span>
              <span style={{ color: COLORS.exponent, fontSize: "0.7em", verticalAlign: "super" }}>n</span>
            </p>
            <p className="text-sm mt-2" style={{ color: COLORS.textMuted }}>
              where 1 {"\u2264"} <span style={{ color: COLORS.coefficient }}>a</span> {"<"} 10
            </p>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2">
            <p className="font-mono text-lg" style={{ color: COLORS.textPrimary }}>
              45,000 {"\u2192"} 4.5 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super", color: COLORS.exponent }}>4</span>
            </p>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Moved 4 places left</p>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2">
            <p className="font-mono text-lg" style={{ color: COLORS.textPrimary }}>
              0.0062 {"\u2192"} 6.2 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super", color: COLORS.exponent }}>{"\u207B\u00B3"}</span>
            </p>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Moved 3 places right</p>
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
    { formula: "a \u00D7 10\u207F, 1 \u2264 a < 10", desc: "Standard form of scientific notation", color: COLORS.coefficient },
    { formula: "Large numbers: positive exponent", desc: "93,000,000 = 9.3 \u00D7 10\u2077", color: COLORS.exponent },
    { formula: "Small numbers: negative exponent", desc: "0.003 = 3 \u00D7 10\u207B\u00B3", color: COLORS.exponent },
    { formula: "Exponent = number of decimal shifts", desc: "Count how many places the decimal moved", color: COLORS.standard },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        The Rules
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
    { icon: "\u{1F30D}", title: "Earth to Sun", desc: "93 million miles = 9.3 \u00D7 10\u2077 miles", math: "Astronomy uses it constantly" },
    { icon: "\u{1F9EC}", title: "Cell Size", desc: "Red blood cell: 7 \u00D7 10\u207B\u2076 meters", math: "Biology measures tiny structures" },
    { icon: "\u{1F4BB}", title: "Computer Memory", desc: "1 TB = 10\u00B9\u00B2 bytes", math: "Tech describes huge data sizes" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Why Scientists Love It
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
              <p className="text-xs font-mono mt-1" style={{ color: COLORS.exponent }}>{s.math}</p>
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
          Why is scientific notation useful? Can you think of a number from everyday life that would be easier to write this way?
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

export function ScientificNotationLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>NO-1.9 Scientific Notation</span>
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
