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

/* ── Lesson-specific semantic colors ── */
const THEME = {
  add: colors.accent.emerald,
  multiply: colors.accent.amber,
  result: colors.accent.indigo,
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;
const PRIMARY = colors.accent.indigo;

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
    prompt: "(3 \u00D7 10\u2074) \u00D7 (2 \u00D7 10\u00B3) = ?",
    options: ["6 \u00D7 10\u2077", "5 \u00D7 10\u2077", "6 \u00D7 10\u00B9\u00B2", "6 \u00D7 10\u00B9"],
    correctAnswer: "6 \u00D7 10\u2077",
    feedback: "Multiply coefficients: 3 \u00D7 2 = 6. Add exponents: 4 + 3 = 7. Result: 6 \u00D7 10\u2077." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "(8 \u00D7 10\u2075) \u00F7 (4 \u00D7 10\u00B2) = ?",
    options: ["2 \u00D7 10\u00B3", "4 \u00D7 10\u00B3", "2 \u00D7 10\u2077", "32 \u00D7 10\u00B3"],
    correctAnswer: "2 \u00D7 10\u00B3",
    feedback: "Divide coefficients: 8 \u00F7 4 = 2. Subtract exponents: 5 \u2212 2 = 3. Result: 2 \u00D7 10\u00B3." },
  { id: 3, layer: "Procedure", type: "multiple-choice",
    prompt: "(4 \u00D7 10\u00B3) + (3 \u00D7 10\u00B3) = ?",
    options: ["7 \u00D7 10\u00B3", "7 \u00D7 10\u2076", "12 \u00D7 10\u00B3", "4.3 \u00D7 10\u00B3"],
    correctAnswer: "7 \u00D7 10\u00B3",
    feedback: "Same exponent: add coefficients. 4 + 3 = 7. Result: 7 \u00D7 10\u00B3." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "(5 \u00D7 10\u2074) + (3 \u00D7 10\u00B3) = ?",
    options: ["5.3 \u00D7 10\u2074", "8 \u00D7 10\u2074", "8 \u00D7 10\u00B3", "53 \u00D7 10\u00B3"],
    correctAnswer: "5.3 \u00D7 10\u2074",
    feedback: "Rewrite 3 \u00D7 10\u00B3 as 0.3 \u00D7 10\u2074. Then 5 + 0.3 = 5.3. Result: 5.3 \u00D7 10\u2074." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "(6 \u00D7 10\u00B2) \u00D7 (5 \u00D7 10\u00B3) = ?",
    options: ["3 \u00D7 10\u2076", "30 \u00D7 10\u2075", "3 \u00D7 10\u2075", "3.0 \u00D7 10\u2076"],
    correctAnswer: "3.0 \u00D7 10\u2076",
    feedback: "6 \u00D7 5 = 30, exponents: 2+3 = 5. But 30 \u00D7 10\u2075 = 3.0 \u00D7 10\u2076 (adjust coefficient)." },
  { id: 6, layer: "Understanding", type: "multiple-choice",
    prompt: "Why must exponents match to add numbers in scientific notation?",
    options: [
      "You can only add like terms",
      "It's a random rule",
      "Calculators require it",
    ],
    correctAnswer: "You can only add like terms",
    feedback: "Just like adding fractions needs a common denominator, adding in scientific notation needs a common power of 10." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "When multiplying, you ADD exponents because...",
    options: [
      "10\u00B2 \u00D7 10\u00B3 = 10\u00B2\u207A\u00B3 = 10\u2075",
      "Multiplication always adds",
      "The coefficient determines it",
    ],
    correctAnswer: "10\u00B2 \u00D7 10\u00B3 = 10\u00B2\u207A\u00B3 = 10\u2075",
    feedback: "Multiplying powers of the same base means adding exponents. That\u2019s the exponent rule!" },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "(2 \u00D7 10\u207B\u00B2) \u00D7 (3 \u00D7 10\u207B\u00B3) = ?",
    options: ["6 \u00D7 10\u207B\u2075", "6 \u00D7 10\u2076", "5 \u00D7 10\u207B\u2075", "6 \u00D7 10\u207B\u00B9"],
    correctAnswer: "6 \u00D7 10\u207B\u2075",
    feedback: "2 \u00D7 3 = 6. Exponents: (\u22122) + (\u22123) = \u22125. Result: 6 \u00D7 10\u207B\u2075." },
];

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/SciNotationOpsHook.webm" onComplete={onComplete} />;

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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={SPRING} className="text-center mb-4">
            <p className="text-sm mb-1" style={{ color: MUTED }}>How far do 3 light-years travel?</p>
            <p className="font-mono text-sm" style={{ color: TEXT_SEC }}>
              3 {"\u00D7"} 5,870,000,000,000 miles...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={SPRING} className="text-center mb-4">
            <p className="text-sm mb-1" style={{ color: MUTED }}>That is painful. But in scientific notation:</p>
            <p className="font-mono font-bold" style={{ color: THEME.multiply, fontSize: "clamp(16px, 4vw, 22px)" }}>
              3 {"\u00D7"} (5.87 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>12</span>)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={SPRING} className="text-center mb-4">
            <p className="font-mono font-bold" style={{ color: THEME.result, fontSize: "clamp(18px, 5vw, 26px)" }}>
              = 1.761 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>13</span> miles
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium"
            style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Operating on huge (and tiny) numbers becomes simple!
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
  const [op, setOp] = useState<"multiply" | "divide">("multiply");
  const [coeff1, setCoeff1] = useState(3);
  const [exp1, setExp1] = useState(4);
  const [coeff2, setCoeff2] = useState(2);
  const [exp2, setExp2] = useState(3);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const resultCoeff = op === "multiply" ? coeff1 * coeff2 : +(coeff1 / coeff2).toFixed(2);
  const resultExp = op === "multiply" ? exp1 + exp2 : exp1 - exp2;

  // Adjust if coefficient is out of [1,10)
  let finalCoeff = resultCoeff;
  let finalExp = resultExp;
  if (finalCoeff >= 10) { finalCoeff = +(finalCoeff / 10).toFixed(2); finalExp += 1; }
  else if (finalCoeff < 1 && finalCoeff > 0) { finalCoeff = +(finalCoeff * 10).toFixed(2); finalExp -= 1; }

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-3 font-medium"
        style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust numbers and see how operations work
      </p>

      <div className="flex gap-3 mb-4">
        {(["multiply", "divide"] as const).map((o) => (
          <button key={o} onClick={() => { setOp(o); interact(); }}
            className="rounded-lg px-4 py-2 font-medium min-h-[44px] min-w-[44px] transition-colors active:scale-95"
            style={{ backgroundColor: o === op ? THEME.multiply : SURFACE,
              color: o === op ? colors.bg.primary : TEXT }}>
            {o === "multiply" ? "Multiply" : "Divide"}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 mb-4 w-full max-w-xs">
        {/* First number — coefficient */}
        <div className="flex items-center gap-2">
          <button onClick={() => { setCoeff1((c) => Math.max(1, c - 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Decrease first coefficient">{"\u2212"}</button>
          <span className="font-mono font-bold" style={{ color: THEME.add }}>
            {coeff1} {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{exp1}</span>
          </span>
          <button onClick={() => { setCoeff1((c) => Math.min(9, c + 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Increase first coefficient">+</button>
        </div>
        {/* First number — exponent */}
        <div className="flex items-center gap-2">
          <button onClick={() => { setExp1((e) => Math.max(-5, e - 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 text-xs"
            style={{ backgroundColor: SURFACE, color: THEME.multiply }}
            aria-label="Decrease first exponent">exp{"\u2212"}</button>
          <span className="text-xs font-medium" style={{ color: MUTED }}>
            exponent: <span className="font-mono font-bold" style={{ color: THEME.multiply }}>{exp1}</span>
          </span>
          <button onClick={() => { setExp1((e) => Math.min(9, e + 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 text-xs"
            style={{ backgroundColor: SURFACE, color: THEME.multiply }}
            aria-label="Increase first exponent">exp+</button>
        </div>

        <span className="font-bold text-xl" style={{ color: MUTED }}>
          {op === "multiply" ? "\u00D7" : "\u00F7"}
        </span>

        {/* Second number — coefficient */}
        <div className="flex items-center gap-2">
          <button onClick={() => { setCoeff2((c) => Math.max(1, c - 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Decrease second coefficient">{"\u2212"}</button>
          <span className="font-mono font-bold" style={{ color: THEME.add }}>
            {coeff2} {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{exp2}</span>
          </span>
          <button onClick={() => { setCoeff2((c) => Math.min(9, c + 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
            style={{ backgroundColor: SURFACE, color: TEXT }}
            aria-label="Increase second coefficient">+</button>
        </div>
        {/* Second number — exponent */}
        <div className="flex items-center gap-2">
          <button onClick={() => { setExp2((e) => Math.max(-5, e - 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 text-xs"
            style={{ backgroundColor: SURFACE, color: THEME.multiply }}
            aria-label="Decrease second exponent">exp{"\u2212"}</button>
          <span className="text-xs font-medium" style={{ color: MUTED }}>
            exponent: <span className="font-mono font-bold" style={{ color: THEME.multiply }}>{exp2}</span>
          </span>
          <button onClick={() => { setExp2((e) => Math.min(9, e + 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 text-xs"
            style={{ backgroundColor: SURFACE, color: THEME.multiply }}
            aria-label="Increase second exponent">exp+</button>
        </div>
      </div>

      <motion.div key={`${op}-${coeff1}-${exp1}-${coeff2}-${exp2}`}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={SPRING} className="rounded-xl p-4 text-center w-full max-w-xs"
        style={{ backgroundColor: SURFACE }}>
        <p className="font-mono font-bold text-lg" style={{ color: THEME.result }}>
          = {finalCoeff} {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>{finalExp}</span>
        </p>
        <p className="text-xs mt-2" style={{ color: MUTED }}>
          Coefficients: {coeff1} {op === "multiply" ? "\u00D7" : "\u00F7"} {coeff2} = {resultCoeff}
          {" | "}Exponents: {exp1} {op === "multiply" ? "+" : "\u2212"} {exp2} = {resultExp}
        </p>
      </motion.div>

      <div className="mt-3">
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
    { text: "To MULTIPLY: multiply the coefficients and ADD the exponents. (a \u00D7 10\u207F)(b \u00D7 10\u1D50) = ab \u00D7 10\u207F\u207A\u1D50", btn: "I see it!" },
    { text: "To DIVIDE: divide the coefficients and SUBTRACT the exponents. (a \u00D7 10\u207F) \u00F7 (b \u00D7 10\u1D50) = a/b \u00D7 10\u207F\u207B\u1D50", btn: "I see it!" },
    { text: "To ADD or SUBTRACT: make the exponents the same first, then add/subtract the coefficients.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">

      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono font-bold" style={{ color: THEME.multiply }}>
              (3 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span>) {"\u00D7"} (2 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>3</span>)
            </p>
            <p className="font-mono font-bold mt-2" style={{ color: THEME.result }}>
              = (3{"\u00D7"}2) {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4+3</span> = 6 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>7</span>
            </p>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono font-bold" style={{ color: THEME.multiply }}>
              (8 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>6</span>) {"\u00F7"} (4 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>2</span>)
            </p>
            <p className="font-mono font-bold mt-2" style={{ color: THEME.result }}>
              = (8{"\u00F7"}4) {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>6{"\u2212"}2</span> = 2 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span>
            </p>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono font-bold" style={{ color: THEME.add }}>
              (5 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span>) + (3 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>3</span>)
            </p>
            <p className="font-mono text-sm mt-1" style={{ color: MUTED }}>
              = (5 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span>) + (0.3 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span>)
            </p>
            <p className="font-mono font-bold mt-1" style={{ color: THEME.result }}>
              = 5.3 {"\u00D7"} 10<span style={{ fontSize: "0.7em", verticalAlign: "super" }}>4</span>
            </p>
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
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
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
    { formula: "Multiply: coefficients \u00D7, exponents +", desc: "(a\u00D710\u207F)(b\u00D710\u1D50) = ab \u00D7 10\u207F\u207A\u1D50", color: THEME.multiply },
    { formula: "Divide: coefficients \u00F7, exponents \u2212", desc: "(a\u00D710\u207F)\u00F7(b\u00D710\u1D50) = a/b \u00D7 10\u207F\u207B\u1D50", color: THEME.multiply },
    { formula: "Add/Sub: match exponents first", desc: "Convert to same power of 10, then combine", color: THEME.add },
    { formula: "Always adjust: 1 \u2264 coefficient < 10", desc: "If coefficient leaves range, shift the exponent", color: THEME.result },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Operation Rules
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
      {revealed >= 4 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F680}", title: "Space Travel", desc: "Distance = speed \u00D7 time. Both in scientific notation!", math: "(3\u00D710\u2078 m/s)(3.15\u00D710\u2077 s) = 9.46\u00D710\u00B9\u2075 m" },
    { icon: "\u{1F9EC}", title: "Virus Counting", desc: "Total = count per mL \u00D7 volume", math: "(5\u00D710\u2076/mL)(2\u00D710\u00B2 mL) = 10\u2079 viruses" },
    { icon: "\u{1F4B0}", title: "National Debt", desc: "Per person = total \u00F7 population", math: "(3\u00D710\u00B9\u00B3)\u00F7(3.3\u00D710\u2078) \u2248 9.1\u00D710\u2074" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Calculations That Matter
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
              <p className="text-xs font-mono mt-1" style={{ color: THEME.multiply }}>{s.math}</p>
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
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
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
              else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; }
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
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120",
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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6"
          style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why is it easier to multiply numbers in scientific notation than in standard form?
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

export function SciNotationOpsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="NO-1.9a Sci Notation Ops" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onComplete={advance} />;
          case "spatial": return <SpatialStage onComplete={advance} />;
          case "discovery": return <DiscoveryStage onComplete={advance} />;
          case "symbol": return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld": return <RealWorldStage onComplete={advance} />;
          case "practice": return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? advance} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
