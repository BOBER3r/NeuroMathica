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
  arithmetic: "#34d399",
  arithmeticFill: "#34d39933",
  geometric: "#f59e0b",
  geometricFill: "#f59e0b33",
  difference: "#60a5fa",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  bgElevated: "#334155",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  success: "#34d399",
  error: "#f87171",
  primary: "#818cf8",
  question: "#f87171",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

type RuleType = "add" | "multiply";

interface Rule {
  type: RuleType;
  value: number;
  label: string;
}

const RULES: Rule[] = [
  { type: "add", value: 2, label: "+2" },
  { type: "add", value: 3, label: "+3" },
  { type: "add", value: 5, label: "+5" },
  { type: "multiply", value: 2, label: "\u00D72" },
  { type: "multiply", value: 3, label: "\u00D73" },
];

interface PracticeProblem {
  id: number;
  layer: string;
  type: "multiple-choice" | "numeric-input";
  prompt: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice",
    prompt: "3, 7, 11, 15, ... What type of sequence?",
    options: ["Arithmetic", "Geometric"],
    correctAnswer: "Arithmetic",
    feedback: "The difference is constant: +4 each time." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "2, 6, 18, 54, ... What type of sequence?",
    options: ["Arithmetic", "Geometric"],
    correctAnswer: "Geometric",
    feedback: "The ratio is constant: multiply by 3 each time." },
  { id: 3, layer: "Recall", type: "numeric-input",
    prompt: "4, 9, 14, 19, _. What comes next?",
    correctAnswer: "24",
    feedback: "The common difference is +5. So 19 + 5 = 24." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "1, 3, 9, 27, _. What comes next?",
    correctAnswer: "81",
    feedback: "The common ratio is 3. So 27 \u00D7 3 = 81." },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "10, 7, 4, 1, _. What comes next?",
    correctAnswer: "-2",
    feedback: "The common difference is \u22123. So 1 + (\u22123) = \u22122." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "What is the common difference of 6, 11, 16, 21?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    feedback: "11 \u2212 6 = 5, 16 \u2212 11 = 5. The difference is 5." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Which grows faster: arithmetic (+3) or geometric (\u00D73), starting from 1?",
    options: ["Arithmetic", "Geometric"],
    correctAnswer: "Geometric",
    feedback: "Geometric: 1, 3, 9, 27 vs Arithmetic: 1, 4, 7, 10. Multiplying outpaces adding." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "5, 10, 20, 40 \u2014 the common ratio is...",
    options: ["2", "5", "10", "15"],
    correctAnswer: "2",
    feedback: "10/5 = 2, 20/10 = 2, 40/20 = 2. Multiply by 2 each time." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Can a sequence be both arithmetic and geometric?",
    options: [
      "Never",
      "Only if all terms are equal (like 5, 5, 5, 5)",
      "Always",
    ],
    correctAnswer: "Only if all terms are equal (like 5, 5, 5, 5)",
    feedback: "A constant sequence has d = 0 and r = 1, satisfying both definitions." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateSequence(start: number, rule: Rule, count: number): number[] {
  const seq: number[] = [start];
  for (let i = 1; i < count; i++) {
    const prev = seq[i - 1]!;
    seq.push(rule.type === "add" ? prev + rule.value : prev * rule.value);
  }
  return seq;
}

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
  return <VideoHook src="/videos/NumberPatternsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 1500));
    timers.push(setTimeout(() => setPhase(2), 2500));
    timers.push(setTimeout(() => setPhase(3), 3000));
    timers.push(setTimeout(() => setPhase(4), 4500));
    timers.push(setTimeout(() => setPhase(5), 5500));
    timers.push(setTimeout(() => setPhase(6), 6500));
    timers.push(setTimeout(() => setPhase(7), 7500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 7)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      {/* Arithmetic sequence */}
      <div className="flex items-center gap-3 mb-4">
        {[2, 4, 6, 8].map((n, i) => (
          <motion.div key={`a-${i}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className="rounded-xl flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: COLORS.arithmeticFill,
              border: `2px solid ${COLORS.arithmetic}` }}>
            <span className="font-bold font-mono tabular-nums" style={{ color: COLORS.arithmetic }}>{n}</span>
          </motion.div>
        ))}
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            className="rounded-xl flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: COLORS.question + "33",
              border: `2px dashed ${COLORS.question}` }}>
            <span className="font-bold" style={{ color: COLORS.question }}>?</span>
          </motion.div>
        )}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            className="rounded-xl flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: COLORS.arithmeticFill,
              border: `2px solid ${COLORS.arithmetic}` }}>
            <span className="font-bold font-mono tabular-nums" style={{ color: COLORS.arithmetic }}>10</span>
          </motion.div>
        )}
      </div>

      {/* Geometric sequence */}
      {phase >= 3 && (
        <div className="flex items-center gap-3 mb-4">
          {[3, 6, 12, 24].map((n, i) => (
            <motion.div key={`g-${i}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="rounded-xl flex items-center justify-center"
              style={{ width: 48, height: 48, backgroundColor: COLORS.geometricFill,
                border: `2px solid ${COLORS.geometric}` }}>
              <span className="font-bold font-mono tabular-nums" style={{ color: COLORS.geometric }}>{n}</span>
            </motion.div>
          ))}
          {phase >= 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={SPRING}
              className="rounded-xl flex items-center justify-center"
              style={{ width: 48, height: 48, backgroundColor: COLORS.question + "33",
                border: `2px dashed ${COLORS.question}` }}>
              <span className="font-bold" style={{ color: COLORS.question }}>?</span>
            </motion.div>
          )}
          {phase >= 5 && (
            <motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={SPRING}
              className="rounded-xl flex items-center justify-center"
              style={{ width: 48, height: 48, backgroundColor: COLORS.geometricFill,
                border: `2px solid ${COLORS.geometric}` }}>
              <span className="font-bold font-mono tabular-nums" style={{ color: COLORS.geometric }}>48</span>
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence>
        {phase >= 6 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            One adds. One multiplies. Both follow rules.
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 7 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [ruleIdx, setRuleIdx] = useState(0);
  const [start, setStart] = useState(2);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const rule = RULES[ruleIdx]!;
  const sequence = useMemo(() => generateSequence(start, rule, 6), [start, rule]);
  const isArithmetic = rule.type === "add";

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Pick a rule and starting number to build sequences
      </p>

      {/* Rule buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {RULES.map((r, i) => (
          <button key={i} onClick={() => { setRuleIdx(i); interact(); }}
            className="rounded-lg px-3 py-1 font-mono text-sm transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: i === ruleIdx
                ? (r.type === "add" ? COLORS.arithmetic : COLORS.geometric)
                : COLORS.bgSurface,
              color: COLORS.textPrimary,
            }} aria-label={`Rule: ${r.label}`}>
            {r.label}
          </button>
        ))}
      </div>

      {/* Start number */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm" style={{ color: COLORS.textMuted }}>Start:</span>
        <button onClick={() => { if (start > 1) { setStart((s) => s - 1); interact(); } }}
          className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
          aria-label="Decrease start">{"\u2212"}</button>
        <span className="font-mono font-bold text-lg tabular-nums w-8 text-center"
          style={{ color: COLORS.textPrimary }}>{start}</span>
        <button onClick={() => { if (start < 10) { setStart((s) => s + 1); interact(); } }}
          className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}
          aria-label="Increase start">+</button>
      </div>

      {/* Sequence display */}
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {sequence.map((n, i) => (
          <motion.div key={`${ruleIdx}-${start}-${i}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, ...SPRING }}
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 56, height: 56,
              backgroundColor: isArithmetic ? COLORS.arithmeticFill : COLORS.geometricFill,
              border: `2px solid ${isArithmetic ? COLORS.arithmetic : COLORS.geometric}`,
            }}>
            <span className="font-bold font-mono tabular-nums text-sm"
              style={{ color: isArithmetic ? COLORS.arithmetic : COLORS.geometric }}>
              {n > 99999 ? "..." : n}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Differences / ratios */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {sequence.slice(0, -1).map((n, i) => {
          const next = sequence[i + 1]!;
          const label = isArithmetic ? `+${next - n}` : `\u00D7${rule.value}`;
          return (
            <motion.span key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-xs font-mono"
              style={{ color: COLORS.difference }}>
              {label}
            </motion.span>
          );
        })}
      </div>

      <p className="text-sm font-medium mb-2"
        style={{ color: isArithmetic ? COLORS.arithmetic : COLORS.geometric }}>
        {isArithmetic ? "Arithmetic sequence (constant difference)" : "Geometric sequence (constant ratio)"}
      </p>

      <div className="mt-2">
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
    { text: "Look at 2, 5, 8, 11. The difference between each pair is always +3. That's a constant difference!", btn: "I see it!" },
    { text: "Now look at 2, 6, 18, 54. The ratio between each pair is always \u00D73. That's a constant ratio!", btn: "I see it!" },
    { text: "Adding the same number = arithmetic. Multiplying by the same number = geometric. The rule predicts ANY term!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      {/* Visual */}
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2">
            <div className="flex gap-3 items-center">
              {[2, 5, 8, 11].map((n, i) => (
                <div key={i} className="rounded-lg flex items-center justify-center"
                  style={{ width: 48, height: 48, backgroundColor: COLORS.arithmeticFill,
                    border: `2px solid ${COLORS.arithmetic}` }}>
                  <span className="font-bold font-mono" style={{ color: COLORS.arithmetic }}>{n}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 mt-1">
              {["+3", "+3", "+3"].map((d, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className="text-sm font-mono font-bold" style={{ color: COLORS.difference }}>
                  {d}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2">
            <div className="flex gap-3 items-center">
              {[2, 6, 18, 54].map((n, i) => (
                <div key={i} className="rounded-lg flex items-center justify-center"
                  style={{ width: 48, height: 48, backgroundColor: COLORS.geometricFill,
                    border: `2px solid ${COLORS.geometric}` }}>
                  <span className="font-bold font-mono" style={{ color: COLORS.geometric }}>{n}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 mt-1">
              {["\u00D73", "\u00D73", "\u00D73"].map((d, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className="text-sm font-mono font-bold" style={{ color: COLORS.geometric }}>
                  {d}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-3 items-center">
            <div className="rounded-xl p-3" style={{ backgroundColor: COLORS.arithmeticFill, border: `1px solid ${COLORS.arithmetic}` }}>
              <p className="font-mono text-sm font-bold text-center" style={{ color: COLORS.arithmetic }}>
                Arithmetic: +d each time
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: COLORS.geometricFill, border: `1px solid ${COLORS.geometric}` }}>
              <p className="font-mono text-sm font-bold text-center" style={{ color: COLORS.geometric }}>
                Geometric: {"\u00D7"}r each time
              </p>
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
    timers.push(setTimeout(() => setRevealed(1), 1500));
    timers.push(setTimeout(() => setRevealed(2), 3000));
    timers.push(setTimeout(() => setRevealed(3), 4500));
    timers.push(setTimeout(() => setRevealed(4), 6000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "d = difference between terms", desc: "Common difference (arithmetic)", color: COLORS.arithmetic },
    { formula: "next = current + d", desc: "Arithmetic rule", color: COLORS.difference },
    { formula: "r = ratio between terms", desc: "Common ratio (geometric)", color: COLORS.geometric },
    { formula: "next = current \u00D7 r", desc: "Geometric rule", color: COLORS.geometric },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Pattern Rules
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
    { icon: "\u{1F4B0}", title: "Savings Account", desc: "Save $5/week: 5, 10, 15, 20...", math: "Arithmetic, d = 5" },
    { icon: "\u{1F52C}", title: "Bacteria Growth", desc: "Bacteria double every hour: 1, 2, 4, 8...", math: "Geometric, r = 2" },
    { icon: "\u{1FA91}", title: "Stacking Chairs", desc: "Each row adds 2 more chairs.", math: "Arithmetic, d = 2" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Real World Connections
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
              <p className="text-xs font-mono mt-1" style={{ color: COLORS.primary }}>{s.math}</p>
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
    setResults((prev) => { const next = [...prev]; next[currentQ] = userAnswer === problem.correctAnswer; return next; });
  }, [userAnswer, currentQ, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false);
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

        {problem.type === "multiple-choice" && problem.options && (
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
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
                  style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>
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
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary,
              border: `2px solid ${submitted ? (isCorrect ? COLORS.success : COLORS.error) : COLORS.bgElevated}`,
              outline: "none" }} />
        )}

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
            <Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full"
              style={{ backgroundColor: COLORS.primary, opacity: userAnswer ? 1 : 0.4 }}>
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
          Describe a pattern you see in your everyday life. Is it arithmetic, geometric, or something else?
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
              style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
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

export function NumberPatternsLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>NT-2.6 Number Patterns</span>
          <span className="text-xs tabular-nums" style={{ color: "#475569" }}>{stageIdx + 1}/{STAGES.length}</span>
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
