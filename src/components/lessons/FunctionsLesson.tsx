"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * AL-3.7 Functions — Grade 8
 * Prerequisites: AL-3.4 (Expressions)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: A function is a rule that assigns each input to exactly
 *   one output. f(x) notation names the rule; domain is the set of valid
 *   inputs, range is the set of possible outputs.
 *
 * Stage flow:
 *  1. Hook — "input machine" animation: number goes in, different number comes out
 *  2. Spatial — function machine: tap inputs, see outputs appear
 *  3. Discovery — multiple inputs can't map to multiple outputs; vertical line test
 *  4. Symbol Bridge — f(x) notation, domain, range
 *  5. Real World — vending machine, temperature converter, age-to-grade
 *  6. Practice — 9 problems
 *  7. Reflection
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BG = "#0f172a";
const SURFACE = "#1e293b";
const TEXT = "#f8fafc";
const MUTED = "#94a3b8";
const BORDER = "#475569";
const PRIMARY = "#818cf8";
const SUCCESS = "#34d399";
const ERROR = "#f87171";

const INPUT_COLOR = "#60a5fa";  // blue
const OUTPUT_COLOR = "#34d399"; // green
const RULE_COLOR = "#a78bfa";   // purple
const DOMAIN_COLOR = "#f472b6"; // pink

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

type Stage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGES: Stage[] = [
  "hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection",
];

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-2 py-3" style={{ background: BG }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-2 w-2 rounded-full transition-all duration-300" style={{ background: i <= current ? PRIMARY : BORDER, transform: i === current ? "scale(1.4)" : "scale(1)" }} />
      ))}
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white hover:brightness-110 active:scale-[0.97]"
      style={{ background: PRIMARY, minHeight: 48 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-12"
      style={{ background: BG }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook — Function Machine                                   */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/FunctionsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 4000),
      setTimeout(() => setPhase(5), 5200),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const examples = [
    { input: 3, output: 7 },
    { input: 5, output: 11 },
    { input: 0, output: 1 },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: TEXT }}
        >
          The Mystery Machine
        </motion.h2>

        {/* Machine SVG */}
        <svg viewBox="0 0 400 240" className="w-full max-w-md" aria-label="Function machine: input goes in, output comes out">
          {/* Machine body */}
          <rect x={120} y={60} width={160} height={120} rx={16} fill={SURFACE} stroke={RULE_COLOR} strokeWidth={2.5} />
          <text x={200} y={125} textAnchor={"middle" as const} fill={RULE_COLOR} fontSize={20} fontWeight="bold">
            {"f(x) = ?"}
          </text>

          {/* Input arrow */}
          <line x1={40} y1={120} x2={118} y2={120} stroke={INPUT_COLOR} strokeWidth={2} />
          <polygon points="118,113 118,127 130,120" fill={INPUT_COLOR} />
          <text x={40} y={108} fill={INPUT_COLOR} fontSize={12} fontWeight="bold">INPUT</text>

          {/* Output arrow */}
          <line x1={282} y1={120} x2={360} y2={120} stroke={OUTPUT_COLOR} strokeWidth={2} />
          <polygon points="360,113 360,127 372,120" fill={OUTPUT_COLOR} />
          <text x={330} y={108} fill={OUTPUT_COLOR} fontSize={12} fontWeight="bold">OUTPUT</text>

          {/* Animated input/output pairs */}
          {examples.map((ex, i) => {
            const showInput = phase >= i + 1;
            const showOutput = phase >= i + 2;
            const yOff = 165 + i * 25;
            return showInput ? (
              <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <text x={80} y={yOff} textAnchor={"middle" as const} fill={INPUT_COLOR} fontSize={16} fontWeight="bold" className="font-mono tabular-nums">
                  {ex.input}
                </text>
                <text x={200} y={yOff} textAnchor={"middle" as const} fill={MUTED} fontSize={16}>
                  {"\u2192"}
                </text>
                {showOutput && (
                  <motion.text
                    x={320}
                    y={yOff}
                    textAnchor={"middle" as const}
                    fill={OUTPUT_COLOR}
                    fontSize={16}
                    fontWeight="bold"
                    className="font-mono tabular-nums"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={SPRING}
                  >
                    {ex.output}
                  </motion.text>
                )}
              </motion.g>
            ) : null;
          })}
        </svg>

        {phase >= 5 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-lg"
            style={{ color: MUTED }}
          >
            Each input produces exactly one output. Can you guess the rule?
          </motion.p>
        )}

        {phase >= 5 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial — Interactive function machine                    */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  // Rule: f(x) = 2x + 1
  const rule = useCallback((x: number) => 2 * x + 1, []);
  const [inputs, setInputs] = useState<number[]>([]);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const availableInputs = [-2, -1, 0, 1, 2, 3, 4, 5];

  const handleInput = useCallback((x: number) => {
    setInteractions((c) => c + 1);
    setInputs((prev) => {
      if (prev.includes(x)) return prev;
      return [...prev, x];
    });
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Feed numbers into the machine
        </h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>
          Tap a number to see what comes out. Try to figure out the rule!
        </p>

        {/* Machine */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs font-semibold" style={{ color: INPUT_COLOR }}>Input</p>
          </div>
          <div className="rounded-2xl border-2 px-8 py-4" style={{ borderColor: RULE_COLOR, background: SURFACE }}>
            <p className="text-center font-mono text-lg font-bold" style={{ color: RULE_COLOR }}>f(x) = ???</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold" style={{ color: OUTPUT_COLOR }}>Output</p>
          </div>
        </div>

        {/* Input buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {availableInputs.map((x) => {
            const used = inputs.includes(x);
            return (
              <motion.button
                key={x}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleInput(x)}
                className="flex items-center justify-center rounded-xl font-mono text-lg font-bold tabular-nums"
                style={{
                  background: used ? `${INPUT_COLOR}30` : SURFACE,
                  color: used ? INPUT_COLOR : MUTED,
                  minHeight: 48,
                  minWidth: 48,
                  border: `2px solid ${used ? INPUT_COLOR : BORDER}`,
                }}
                aria-label={`Input ${x}`}
              >
                {x}
              </motion.button>
            );
          })}
        </div>

        {/* Results table */}
        {inputs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full rounded-xl p-4"
            style={{ background: SURFACE }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {inputs.map((x) => (
                <motion.div
                  key={x}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                  className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{ background: `${RULE_COLOR}15` }}
                >
                  <span className="font-mono font-bold tabular-nums" style={{ color: INPUT_COLOR }}>{x}</span>
                  <span style={{ color: MUTED }}>{"\u2192"}</span>
                  <span className="font-mono font-bold tabular-nums" style={{ color: OUTPUT_COLOR }}>{rule(x)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reveal hint after enough tries */}
        {inputs.length >= 4 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm font-semibold"
            style={{ color: RULE_COLOR }}
          >
            {"Hint: f(x) = 2x + 1"}
          </motion.p>
        )}

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Discovery                                                 */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "A function is a rule: each input maps to exactly ONE output. If input 3 gave both 7 and 10, that's NOT a function.", button: "I see it!" },
    { text: "The set of all valid inputs is called the DOMAIN. The set of all possible outputs is the RANGE.", button: "I see it!" },
    { text: "We write f(x) to name the function. f(3) means \"plug in 3 for x.\" The letter f is just a name\u2014we could use g, h, or anything!", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const current = prompts[promptIdx]!;

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) setPromptIdx((i) => i + 1);
    else onContinue();
  }, [promptIdx, prompts.length, onContinue]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">
          {prompts.map((_, i) => (
            <div key={i} className="h-2 w-8 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: SURFACE }}
          >
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Visual: function vs not-function */}
        {promptIdx === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
            {/* Function */}
            <div className="rounded-xl p-3 text-center" style={{ background: `${SUCCESS}15` }}>
              <p className="text-xs font-bold" style={{ color: SUCCESS }}>Function</p>
              <p className="mt-1 font-mono text-sm" style={{ color: TEXT }}>
                {"3 \u2192 7"}<br />
                {"5 \u2192 11"}<br />
                {"0 \u2192 1"}
              </p>
            </div>
            {/* Not function */}
            <div className="rounded-xl p-3 text-center" style={{ background: `${ERROR}15` }}>
              <p className="text-xs font-bold" style={{ color: ERROR }}>NOT a Function</p>
              <p className="mt-1 font-mono text-sm" style={{ color: TEXT }}>
                {"3 \u2192 7"}<br />
                {"3 \u2192 10"}<br />
                {"5 \u2192 11"}
              </p>
            </div>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAck}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white"
          style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}
        >
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
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { text: "f(x) = 2x + 1", subtitle: "f is the name, x is the input", color: RULE_COLOR },
    { text: "Domain: all valid inputs", subtitle: "\"What can I put in?\"", color: DOMAIN_COLOR },
    { text: "Range: all possible outputs", subtitle: "\"What can come out?\"", color: OUTPUT_COLOR },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Function Notation
        </h2>
        {notations.map((n, i) =>
          i <= step ? (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="w-full rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
              <p className="font-mono text-[clamp(18px,4.5vw,28px)] font-bold" style={{ color: n.color }}>{n.text}</p>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>{n.subtitle}</p>
            </motion.div>
          ) : null
        )}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-2xl border-2 px-8 py-6 text-center" style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}>
            <p className="text-sm" style={{ color: MUTED }}>Example</p>
            <p className="font-mono text-[clamp(18px,4vw,24px)] font-bold" style={{ color: PRIMARY }}>
              {"f(3) = 2(3) + 1 = 7"}
            </p>
          </motion.div>
        )}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World                                                */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "🎰", title: "Vending Machine", desc: "Press button A3 (input) \u2192 get one specific snack (output). Each button maps to exactly one item." },
    { icon: "🌡️", title: "Temperature Converter", desc: "f(\u00B0C) = 1.8\u00B0C + 32 gives \u00B0F. Every Celsius value produces exactly one Fahrenheit value." },
    { icon: "🏫", title: "Age to Grade", desc: "Your age determines your grade level. Each age maps to one grade (mostly!)" },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Functions in Real Life
        </h2>
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="w-full rounded-xl p-4" style={{ background: SURFACE }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
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
  { id: 1, layer: "recall", question: "What makes a relation a function?", options: ["Each input has exactly one output", "Each output has exactly one input", "Inputs and outputs are equal", "It uses f(x) notation"], correctIndex: 0, feedback: "A function assigns each input to EXACTLY one output. One input, one answer." },
  { id: 2, layer: "recall", question: "In f(x) = 3x + 2, what does x represent?", options: ["The output", "The input", "The function name", "A constant"], correctIndex: 1, feedback: "x is the input variable. You substitute a value for x to get the output." },
  { id: 3, layer: "recall", question: "What is the domain of a function?", options: ["The set of all outputs", "The set of all inputs", "The function rule", "The graph"], correctIndex: 1, feedback: "The domain is the set of all valid inputs\u2014everything you CAN put into the function." },
  { id: 4, layer: "procedure", question: "If f(x) = 2x + 5, what is f(4)?", options: ["9", "13", "11", "14"], correctIndex: 1, feedback: "f(4) = 2(4) + 5 = 8 + 5 = 13." },
  { id: 5, layer: "procedure", question: "If g(x) = x\u00B2 \u2212 1, what is g(3)?", options: ["8", "6", "10", "4"], correctIndex: 0, feedback: "g(3) = 3\u00B2 \u2212 1 = 9 \u2212 1 = 8." },
  { id: 6, layer: "procedure", question: "If f(x) = x + 7 and f(a) = 12, what is a?", options: ["5", "7", "19", "12"], correctIndex: 0, feedback: "f(a) = a + 7 = 12, so a = 12 \u2212 7 = 5." },
  { id: 7, layer: "understanding", question: "Is {(1,3), (2,5), (1,7)} a function?", options: ["Yes", "No"], correctIndex: 1, feedback: "No! Input 1 maps to both 3 and 7. A function requires each input to have ONE output." },
  { id: 8, layer: "understanding", question: "Can two different inputs have the same output?", options: ["Yes", "No"], correctIndex: 0, feedback: "Yes! For example, f(x) = x\u00B2 gives f(2) = 4 and f(\u22122) = 4. Same output is fine\u2014same INPUT can't give different outputs." },
  { id: 9, layer: "understanding", question: "f(x) = 2x + 1. As x increases by 1, the output increases by:", options: ["1", "2", "3", "It varies"], correctIndex: 1, feedback: "The coefficient of x is 2, so each +1 in x gives +2 in output. This is the rate of change!" },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = PROBLEMS[currentIdx];

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
          <p className="text-lg" style={{ color: MUTED }}>{score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} />
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
            let bg = SURFACE;
            let border = BORDER;
            if (answered) {
              if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; }
              else if (isSelected) { bg = `${ERROR}20`; border = ERROR; }
            }
            return (
              <motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>
                {opt}
                {answered && isCorrect && <span style={{ color: SUCCESS }}>{" \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span style={{ color: ERROR }}>{" \u2717"}</span>}
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
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}>
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

  if (submitted) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">🧠</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Self-explanation strengthens your understanding. +50 XP</p>
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
        <p className="text-center text-sm" style={{ color: MUTED }}>
          In your own words, explain why a vending machine is a good metaphor for a function.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          className="w-full rounded-xl border-2 p-4 text-base"
          style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }}
          aria-label="Reflection text"
        />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setSubmitted(true)} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }}>Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main                                                               */
/* ================================================================== */

export function FunctionsLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGES[stageIdx + 1];
    if (next) setStage(next);
    else onComplete?.();
  }, [stageIdx, onComplete]);

  return (
    <div className="flex min-h-dvh flex-col" style={{ background: BG }}>
      <ProgressBar current={stageIdx} total={STAGES.length} />
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex-1">
          {stage === "hook" && <HookStage onContinue={advance} />}
          {stage === "spatial" && <SpatialStage onContinue={advance} />}
          {stage === "discovery" && <DiscoveryStage onContinue={advance} />}
          {stage === "symbol" && <SymbolBridgeStage onContinue={advance} />}
          {stage === "realWorld" && <RealWorldStage onContinue={advance} />}
          {stage === "practice" && <PracticeStage onContinue={advance} />}
          {stage === "reflection" && <ReflectionStage onContinue={advance} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
