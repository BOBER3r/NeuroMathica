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
  root: "#34d399",
  rootFill: "#34d39933",
  square: "#818cf8",
  squareFill: "#818cf833",
  perfect: "#f59e0b",
  perfectFill: "#f59e0b33",
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
  type: "multiple-choice" | "numeric-input";
  prompt: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "numeric-input",
    prompt: "\u221A25 = ?",
    correctAnswer: "5",
    feedback: "5 \u00D7 5 = 25, so \u221A25 = 5." },
  { id: 2, layer: "Recall", type: "numeric-input",
    prompt: "\u221A64 = ?",
    correctAnswer: "8",
    feedback: "8 \u00D7 8 = 64, so \u221A64 = 8." },
  { id: 3, layer: "Recall", type: "numeric-input",
    prompt: "\u221A100 = ?",
    correctAnswer: "10",
    feedback: "10 \u00D7 10 = 100, so \u221A100 = 10." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Between which two whole numbers does \u221A10 fall?",
    options: ["2 and 3", "3 and 4", "4 and 5", "9 and 11"],
    correctAnswer: "3 and 4",
    feedback: "3\u00B2 = 9 and 4\u00B2 = 16. Since 9 < 10 < 16, \u221A10 is between 3 and 4." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Which is a perfect square?",
    options: ["12", "18", "36", "50"],
    correctAnswer: "36",
    feedback: "6 \u00D7 6 = 36. It has an exact whole number square root." },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "\u221A144 = ?",
    correctAnswer: "12",
    feedback: "12 \u00D7 12 = 144, so \u221A144 = 12." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "If \u221An = 7, what is n?",
    options: ["14", "49", "7", "343"],
    correctAnswer: "49",
    feedback: "If \u221An = 7, then n = 7\u00B2 = 49." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "\u221A2 is approximately:",
    options: ["1.41", "1.73", "2.00", "1.00"],
    correctAnswer: "1.41",
    feedback: "1.41 \u00D7 1.41 \u2248 1.9881, very close to 2. So \u221A2 \u2248 1.41." },
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
  return <VideoHook src="/videos/SquareRootsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2000));
    timers.push(setTimeout(() => setPhase(3), 3500));
    timers.push(setTimeout(() => setPhase(4), 5000));
    timers.push(setTimeout(() => setPhase(5), 6500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const CELL = 32;
  const sideLength = 3;
  const area = sideLength * sideLength;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      {/* Grid showing 3x3 = 9 */}
      <div className="mb-4">
        <svg viewBox={`0 0 ${CELL * sideLength + 20} ${CELL * sideLength + 20}`}
          className="mx-auto" style={{ width: 140, height: 140 }}
          aria-label={`${sideLength} by ${sideLength} grid of unit squares showing area ${area}`}>
          <rect width={CELL * sideLength + 20} height={CELL * sideLength + 20} fill={COLORS.bgPrimary} />
          {Array.from({ length: area }, (_, i) => {
            const row = Math.floor(i / sideLength);
            const col = i % sideLength;
            return (
              <motion.rect key={i}
                x={10 + col * CELL} y={10 + row * CELL}
                width={CELL - 2} height={CELL - 2} rx={4}
                fill={COLORS.squareFill} stroke={COLORS.square} strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.5 }}
                transition={{ delay: i * 0.05, ...SPRING }}
              />
            );
          })}
        </svg>
      </div>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-bold mb-2"
            style={{ color: COLORS.square, fontSize: "clamp(18px, 4vw, 24px)" }}>
            3 {"\u00D7"} 3 = 9 square units
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-bold mb-2"
            style={{ color: COLORS.root, fontSize: "clamp(18px, 4vw, 24px)" }}>
            What if you know the area is 9?
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium"
            style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            {"\u221A"}9 = 3 {"\u2014"} the side length is the square root!
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
  const [selectedN, setSelectedN] = useState(4);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const perfectSquares = [1, 4, 9, 16, 25, 36];
  const side = Math.sqrt(selectedN);
  const isPerfect = Number.isInteger(side);
  const CELL = 28;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-3 font-medium"
        style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Tap a number to see its square root
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {perfectSquares.map((n) => (
          <button key={n} onClick={() => { setSelectedN(n); interact(); }}
            className="rounded-lg font-mono font-bold text-sm min-h-[44px] min-w-[44px] px-3 py-2 transition-colors active:scale-95"
            style={{
              backgroundColor: n === selectedN ? COLORS.perfect : COLORS.bgSurface,
              color: n === selectedN ? COLORS.bgPrimary : COLORS.textPrimary,
            }}>
            {n}
          </button>
        ))}
      </div>

      {/* Grid visualization */}
      <div className="mb-4">
        <svg viewBox={`0 0 ${CELL * Math.ceil(side) + 20} ${CELL * Math.ceil(side) + 20}`}
          className="mx-auto" style={{ width: Math.min(200, CELL * Math.ceil(side) + 20), height: Math.min(200, CELL * Math.ceil(side) + 20) }}
          aria-label={`Grid showing ${selectedN} unit squares`}>
          <rect width={CELL * Math.ceil(side) + 20} height={CELL * Math.ceil(side) + 20} fill={COLORS.bgPrimary} />
          {Array.from({ length: selectedN }, (_, i) => {
            const intSide = Math.ceil(side);
            const row = Math.floor(i / intSide);
            const col = i % intSide;
            return (
              <motion.rect key={`${selectedN}-${i}`}
                x={10 + col * CELL} y={10 + row * CELL}
                width={CELL - 2} height={CELL - 2} rx={3}
                fill={COLORS.perfectFill} stroke={COLORS.perfect} strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, ...SPRING }}
              />
            );
          })}
        </svg>
      </div>

      <motion.div key={selectedN} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={SPRING} className="text-center mb-4">
        <p className="font-bold text-lg" style={{ color: COLORS.perfect }}>
          {"\u221A"}{selectedN} = {isPerfect ? side : side.toFixed(4) + "..."}
        </p>
        <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
          {isPerfect
            ? `${side} \u00D7 ${side} = ${selectedN} \u2014 perfect square!`
            : `Not a perfect square`}
        </p>
      </motion.div>

      <InteractionDots count={Math.min(interactions, 6)} total={6} />
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
    { text: "\u221An asks: \"What number times itself gives n?\" That's the square root!", btn: "I see it!" },
    { text: "Perfect squares like 1, 4, 9, 16, 25 have whole number roots: 1, 2, 3, 4, 5.", btn: "I see it!" },
    { text: "Non-perfect squares like 2, 3, 5, 7 have irrational roots that go on forever!", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">

      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2">
            <div className="rounded-xl p-4 text-center" style={{ backgroundColor: COLORS.squareFill, border: `2px solid ${COLORS.square}` }}>
              <p className="font-mono font-bold text-lg" style={{ color: COLORS.square }}>
                ? {"\u00D7"} ? = n
              </p>
              <p className="font-mono font-bold text-lg mt-1" style={{ color: COLORS.root }}>
                {"\u221A"}n = ?
              </p>
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-wrap gap-3 justify-center">
            {[{n: 1, r: 1}, {n: 4, r: 2}, {n: 9, r: 3}, {n: 16, r: 4}, {n: 25, r: 5}].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, ...SPRING }}
                className="rounded-xl px-3 py-2 text-center"
                style={{ backgroundColor: COLORS.perfectFill, border: `2px solid ${COLORS.perfect}` }}>
                <p className="font-mono font-bold text-sm" style={{ color: COLORS.perfect }}>
                  {"\u221A"}{item.n} = {item.r}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-wrap gap-3 justify-center">
            {[{n: 2, r: "1.414..."}, {n: 3, r: "1.732..."}, {n: 5, r: "2.236..."}].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, ...SPRING }}
                className="rounded-xl px-3 py-2 text-center"
                style={{ backgroundColor: COLORS.rootFill, border: `2px solid ${COLORS.root}` }}>
                <p className="font-mono font-bold text-sm" style={{ color: COLORS.root }}>
                  {"\u221A"}{item.n} = {item.r}
                </p>
              </motion.div>
            ))}
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
    { formula: "\u221An = the number that squares to n", desc: "Definition of square root", color: COLORS.root },
    { formula: "\u221A(a\u00B2) = a", desc: "Root undoes squaring", color: COLORS.square },
    { formula: "\u221A(a \u00D7 b) = \u221Aa \u00D7 \u221Ab", desc: "Product property of roots", color: COLORS.perfect },
    { formula: "(\u221An)\u00B2 = n", desc: "Squaring undoes the root", color: COLORS.root },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Square Root Notation
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
    { icon: "\u{1F3E0}", title: "Floor Tiling", desc: "A room with 81 sq ft of tile needs sides of \u221A81 = 9 feet", math: "\u221A81 = 9" },
    { icon: "\u{1F4D0}", title: "Distance Formula", desc: "Pythagorean theorem uses square roots to find distances", math: "d = \u221A(a\u00B2 + b\u00B2)" },
    { icon: "\u{1F4F1}", title: "Screen Diagonal", desc: "A 16\u00D79 inch screen has diagonal \u221A(256+81) = \u221A337", math: "\u221A337 \u2248 18.36 inches" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Square Roots in Real Life
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
              <p className="text-xs font-mono mt-1" style={{ color: COLORS.root }}>{s.math}</p>
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
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
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
          Why is the square root the reverse of squaring? Can you think of an everyday situation where you need a square root?
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

export function SquareRootsLesson({ onComplete }: { onComplete?: () => void }) {
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
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>NO-1.8a Square Roots</span>
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
