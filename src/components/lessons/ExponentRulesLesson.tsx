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

/* -- Lesson-specific semantic colors -- */
const THEME = {
  product: colors.accent.emerald,
  quotient: colors.functional.info,
  power: colors.accent.amber,
  zero: colors.accent.rose,
  negative: colors.accent.violet,
} as const;

/* -- Aliases for shared tokens (keeps inline style refs short) -- */
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const PRIMARY = colors.accent.indigo;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

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
    prompt: "Simplify: x\u00B3 \u00B7 x\u2074",
    options: ["x\u2077", "x\u00B9\u00B2", "x\u00B9", "2x\u2077"],
    correctAnswer: "x\u2077",
    feedback: "Product rule: add exponents. 3 + 4 = 7, so x\u00B3 \u00B7 x\u2074 = x\u2077." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "Simplify: y\u2078 \u00F7 y\u00B3",
    options: ["y\u2075", "y\u00B9\u00B9", "y\u00B2\u2074", "y\u2076"],
    correctAnswer: "y\u2075",
    feedback: "Quotient rule: subtract exponents. 8 \u2212 3 = 5, so y\u2078 \u00F7 y\u00B3 = y\u2075." },
  { id: 3, layer: "Recall", type: "multiple-choice",
    prompt: "Simplify: (a\u00B2)\u00B3",
    options: ["a\u2076", "a\u2075", "a\u2078", "a\u2079"],
    correctAnswer: "a\u2076",
    feedback: "Power rule: multiply exponents. 2 \u00D7 3 = 6, so (a\u00B2)\u00B3 = a\u2076." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "What is 5\u2070?",
    options: ["0", "1", "5", "Undefined"],
    correctAnswer: "1",
    feedback: "Any nonzero number to the zero power equals 1. 5\u2070 = 1." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Simplify: 2\u207B\u00B3",
    options: ["1/8", "\u22128", "\u22126", "8"],
    correctAnswer: "1/8",
    feedback: "Negative exponent means reciprocal: 2\u207B\u00B3 = 1/2\u00B3 = 1/8." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "Simplify: (3x\u00B2)\u00B2",
    options: ["9x\u2074", "6x\u2074", "3x\u2074", "9x\u00B2"],
    correctAnswer: "9x\u2074",
    feedback: "Apply power to both: 3\u00B2 = 9, (x\u00B2)\u00B2 = x\u2074. So (3x\u00B2)\u00B2 = 9x\u2074." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Why does x\u2070 = 1?",
    options: [
      "Because x\u00B9 \u00F7 x\u00B9 = x\u2070 = 1",
      "It's a random convention",
      "Because 0 times anything is 0",
    ],
    correctAnswer: "Because x\u00B9 \u00F7 x\u00B9 = x\u2070 = 1",
    feedback: "By the quotient rule, x\u00B9/x\u00B9 = x\u00B9\u207B\u00B9 = x\u2070. And x/x = 1. So x\u2070 must equal 1." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Which is equivalent to 1/x\u00B2?",
    options: ["x\u207B\u00B2", "x\u00B2", "\u22122x", "x\u207B\u00B9"],
    correctAnswer: "x\u207B\u00B2",
    feedback: "Negative exponent = reciprocal. 1/x\u00B2 = x\u207B\u00B2." },
];

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/ExponentRulesHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2200));
    timers.push(setTimeout(() => setPhase(3), 3800));
    timers.push(setTimeout(() => setPhase(4), 5200));
    timers.push(setTimeout(() => setPhase(5), 6500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING} className="text-center mb-3">
            <p className="font-mono font-bold" style={{ color: THEME.product, fontSize: "clamp(18px, 5vw, 28px)" }}>
              2 {"\u00D7"} 2 {"\u00D7"} 2 {"\u00D7"} 2 {"\u00D7"} 2
            </p>
            <p className="text-sm mt-1" style={{ color: MUTED }}>That is a LOT of 2s...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={SPRING} className="text-center mb-3">
            <p className="font-mono font-bold" style={{ color: THEME.power, fontSize: "clamp(22px, 6vw, 36px)" }}>
              = 2<span style={{ fontSize: "0.6em", verticalAlign: "super" }}>5</span> = 32
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium mb-2"
            style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            But what happens when you multiply powers?
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={SPRING} className="text-center">
            <p className="font-mono font-bold" style={{ color: THEME.quotient, fontSize: "clamp(16px, 4vw, 24px)" }}>
              2<span style={{ fontSize: "0.6em", verticalAlign: "super" }}>3</span> {"\u00D7"} 2<span style={{ fontSize: "0.6em", verticalAlign: "super" }}>2</span> = 2<span style={{ fontSize: "0.6em", verticalAlign: "super" }}>?</span>
            </p>
          </motion.div>
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
  const [base, setBase] = useState(2);
  const [exp1, setExp1] = useState(3);
  const [exp2, setExp2] = useState(2);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const val1 = Math.pow(base, exp1);
  const val2 = Math.pow(base, exp2);
  const product = val1 * val2;
  const sumExp = exp1 + exp2;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <p className="text-center mb-3 font-medium"
        style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust the base and exponents to discover the pattern
      </p>

      <div className="flex flex-col gap-3 items-center mb-4 w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: MUTED }}>Base:</span>
          <button onClick={() => { if (base > 2) { setBase((b) => b - 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Decrease base">{"\u2212"}</button>
          <span className="font-mono font-bold text-xl w-6 text-center" style={{ color: THEME.product }}>{base}</span>
          <button onClick={() => { if (base < 5) { setBase((b) => b + 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Increase base">+</button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: MUTED }}>Exp 1:</span>
          <button onClick={() => { if (exp1 > 0) { setExp1((e) => e - 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Decrease first exponent">{"\u2212"}</button>
          <span className="font-mono font-bold text-xl w-6 text-center" style={{ color: THEME.power }}>{exp1}</span>
          <button onClick={() => { if (exp1 < 6) { setExp1((e) => e + 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Increase first exponent">+</button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: MUTED }}>Exp 2:</span>
          <button onClick={() => { if (exp2 > 0) { setExp2((e) => e - 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Decrease second exponent">{"\u2212"}</button>
          <span className="font-mono font-bold text-xl w-6 text-center" style={{ color: THEME.power }}>{exp2}</span>
          <button onClick={() => { if (exp2 < 6) { setExp2((e) => e + 1); interact(); } }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Increase second exponent">+</button>
        </div>
      </div>

      <motion.div key={`${base}-${exp1}-${exp2}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={SPRING} className="rounded-xl p-4 text-center w-full max-w-xs"
        style={{ backgroundColor: SURFACE }}>
        <p className="font-mono font-bold" style={{ color: THEME.product, fontSize: "clamp(16px, 4vw, 20px)" }}>
          {base}<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{exp1}</span> {"\u00D7"} {base}<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{exp2}</span> = {val1} {"\u00D7"} {val2} = {product}
        </p>
        <p className="font-mono font-bold mt-2" style={{ color: THEME.quotient, fontSize: "clamp(16px, 4vw, 20px)" }}>
          = {base}<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{exp1}+{exp2}</span> = {base}<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{sumExp}</span> = {Math.pow(base, sumExp)}
        </p>
        <p className="text-xs mt-2" style={{ color: MUTED }}>
          Exponents add when you multiply same bases!
        </p>
      </motion.div>

      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={PRIMARY} />
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
    { text: "Product Rule: when you multiply same bases, ADD the exponents. x\u00B3 \u00B7 x\u2074 = x\u2077.", btn: "I see it!" },
    { text: "Quotient Rule: when you divide same bases, SUBTRACT the exponents. x\u2075 \u00F7 x\u00B2 = x\u00B3.", btn: "I see it!" },
    { text: "Power Rule: a power of a power MULTIPLIES the exponents. (x\u00B2)\u00B3 = x\u2076.", btn: "I see it!" },
    { text: "Zero exponent: x\u2070 = 1. Negative exponent: x\u207B\u207F = 1/x\u207F. These follow from the quotient rule!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">

      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono font-bold text-lg" style={{ color: THEME.product }}>
              x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>3</span> {"\u00B7"} x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span> = x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>3+4</span> = x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>7</span>
            </p>
            <p className="text-xs mt-2" style={{ color: MUTED }}>(xxx)(xxxx) = xxxxxxx</p>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono font-bold text-lg" style={{ color: THEME.quotient }}>
              x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>5</span> {"\u00F7"} x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>2</span> = x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>5{"\u2212"}2</span> = x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>3</span>
            </p>
            <p className="text-xs mt-2" style={{ color: MUTED }}>Cancel 2 of the 5 x{"'"}s</p>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono font-bold text-lg" style={{ color: THEME.power }}>
              (x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>2</span>)<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>3</span> = x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>2{"\u00D7"}3</span> = x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>6</span>
            </p>
            <p className="text-xs mt-2" style={{ color: MUTED }}>(x{"\u00B2"})(x{"\u00B2"})(x{"\u00B2"}) = x{"\u2076"}</p>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-3">
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: SURFACE }}>
              <p className="font-mono font-bold" style={{ color: THEME.zero }}>
                x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>0</span> = 1
              </p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: SURFACE }}>
              <p className="font-mono font-bold" style={{ color: THEME.negative }}>
                x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{"\u207B"}n</span> = 1/x<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>n</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>

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
    timers.push(setTimeout(() => setRevealed(1), 1200));
    timers.push(setTimeout(() => setRevealed(2), 2400));
    timers.push(setTimeout(() => setRevealed(3), 3600));
    timers.push(setTimeout(() => setRevealed(4), 4800));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "x\u1D43 \u00B7 x\u1D47 = x\u1D43\u207A\u1D47", desc: "Product Rule: add exponents", color: THEME.product },
    { formula: "x\u1D43 \u00F7 x\u1D47 = x\u1D43\u207B\u1D47", desc: "Quotient Rule: subtract exponents", color: THEME.quotient },
    { formula: "(x\u1D43)\u1D47 = x\u1D43\u00B7\u1D47", desc: "Power Rule: multiply exponents", color: THEME.power },
    { formula: "x\u2070 = 1, x\u207B\u207F = 1/x\u207F", desc: "Zero and Negative exponents", color: THEME.negative },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        The Four Rules
      </h2>
      <div className="space-y-5 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4"
                style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: MUTED }}>{n.desc}</p>
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
    { icon: "\u{1F9EC}", title: "Cell Division", desc: "Cells double each division: 2\u00B9, 2\u00B2, 2\u00B3...", math: "After n divisions: 2\u207F cells" },
    { icon: "\u{1F4BB}", title: "Computer Memory", desc: "Memory sizes are powers of 2", math: "1 KB = 2\u00B9\u2070 bytes = 1,024" },
    { icon: "\u{1F4B0}", title: "Compound Interest", desc: "Money grows exponentially over time", math: "A = P(1+r)\u207F" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Exponents Everywhere
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
              <p className="text-xs font-mono mt-1" style={{ color: THEME.power }}>{s.math}</p>
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
            let bg: string = SURFACE; let border: string = ELEVATED;
            if (submitted) {
              if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; }
              else if (opt === selected && opt !== problem.correctAnswer) { bg = "#fb718533"; border = ERROR; }
            } else if (opt === selected) { bg = "#818cf833"; border = PRIMARY; }
            return (
              <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                disabled={submitted}
                className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
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
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#fb718520",
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
          How do the exponent rules connect to each other? Why does the zero exponent rule make sense?
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

export function ExponentRulesLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="NT-2.4a Exponent Rules" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
