"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * AL-3.7a Function Notation — Grade 8
 * Prerequisites: AL-3.7 (Functions)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: f(x) notation is a naming convention for a rule machine —
 *   you input x, the rule transforms it, and f(x) is the output. Evaluating
 *   f(3) means substituting 3 for x and computing. Composition chains machines.
 *
 * Stage flow:
 *  1. Hook — animated "function machine" box: input goes in, output comes out
 *  2. Spatial — interactive machine: tap a number, see f(x)=2x+1 compute step-by-step
 *  3. Discovery — guided prompts: f(x) is just a name, evaluating, finding input from output
 *  4. Symbol Bridge — f(x) notation, f(3), solving f(x)=10, g(f(x))
 *  5. Real World — temperature conversion, taxi fare as f(miles)
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
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

const INPUT_COLOR = "#60a5fa";
const OUTPUT_COLOR = "#a78bfa";
const MACHINE_COLOR = "#f472b6";

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
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
    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5, ease: "easeOut" }} onClick={onClick} className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors hover:brightness-110 active:scale-[0.97]" style={{ background: PRIMARY, minHeight: 48 }} aria-label={label}>
      {label}
    </motion.button>
  );
}

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="flex min-h-dvh flex-col items-center justify-center px-4 py-12" style={{ background: BG }}>
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/FunctionNotationHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 3800),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold" style={{ color: TEXT }}>
          Meet the Function Machine
        </motion.h2>

        <svg viewBox="0 0 400 300" className="w-full max-w-md" aria-label="Function machine animation">
          {phase >= 1 && (
            <motion.circle cx={200} cy={30} r={22} fill={INPUT_COLOR} initial={{ y: 0, opacity: 0 }} animate={{ y: phase >= 2 ? 80 : 0, opacity: 1 }} transition={{ duration: 0.6, ...SPRING }} />
          )}
          {phase >= 1 && phase < 2 && (
            <text x={200} y={36} textAnchor={"middle" as const} fill={BG} fontSize={18} fontWeight="bold">3</text>
          )}

          <rect x={120} y={100} width={160} height={80} rx={12} fill={SURFACE} stroke={MACHINE_COLOR} strokeWidth={3} />
          <text x={200} y={130} textAnchor={"middle" as const} fill={MACHINE_COLOR} fontSize={16} fontWeight="bold">f(x) = 2x + 1</text>
          <text x={200} y={155} textAnchor={"middle" as const} fill={MUTED} fontSize={13}>rule machine</text>

          <line x1={200} y1={60} x2={200} y2={100} stroke={INPUT_COLOR} strokeWidth={2} />
          <line x1={200} y1={180} x2={200} y2={220} stroke={OUTPUT_COLOR} strokeWidth={2} />

          <defs>
            <marker id="arrowDown" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={OUTPUT_COLOR} />
            </marker>
          </defs>

          {phase >= 3 && (
            <motion.circle cx={200} cy={250} r={22} fill={OUTPUT_COLOR} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} />
          )}
          {phase >= 3 && (
            <motion.text x={200} y={256} textAnchor={"middle" as const} fill={BG} fontSize={18} fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              7
            </motion.text>
          )}
          {phase >= 3 && (
            <motion.text x={320} y={145} textAnchor={"middle" as const} fill={TEXT} fontSize={13} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {"2(3) + 1 = 7"}
            </motion.text>
          )}
        </svg>

        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-sm" style={{ color: MUTED }}>
            {"Put in 3, the rule doubles it and adds 1. Out comes 7. That's f(3) = 7!"}
          </motion.p>
        )}
        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [inputVal, setInputVal] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 5;
  const output = 2 * inputVal + 1;
  const inputValues = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

  const handleInput = useCallback((val: number) => {
    setInputVal(val);
    setInteractions((c) => c + 1);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Try different inputs for f(x) = 2x + 1</h2>

        <div className="flex flex-wrap justify-center gap-2">
          {inputValues.map((v) => (
            <motion.button key={v} whileTap={{ scale: 0.9 }} onClick={() => handleInput(v)} data-interactive="true" className={cn("flex items-center justify-center rounded-lg font-mono font-bold", v === inputVal && "ring-2 ring-white")} style={{ background: v === inputVal ? INPUT_COLOR : `${INPUT_COLOR}30`, color: v === inputVal ? BG : INPUT_COLOR, minHeight: 44, minWidth: 44 }} aria-label={`Input ${v}`}>
              {v}
            </motion.button>
          ))}
        </div>

        <svg viewBox="0 0 360 200" className="w-full max-w-sm" aria-label="Function machine with current input and output">
          <circle cx={80} cy={100} r={28} fill={INPUT_COLOR} />
          <text x={80} y={106} textAnchor={"middle" as const} fill={BG} fontSize={20} fontWeight="bold">{inputVal}</text>
          <text x={80} y={145} textAnchor={"middle" as const} fill={MUTED} fontSize={12}>input x</text>

          <line x1={112} y1={100} x2={140} y2={100} stroke={MUTED} strokeWidth={2} />
          <polygon points="140,95 150,100 140,105" fill={MUTED} />

          <rect x={150} y={70} width={80} height={60} rx={8} fill={SURFACE} stroke={MACHINE_COLOR} strokeWidth={2} />
          <text x={190} y={95} textAnchor={"middle" as const} fill={MACHINE_COLOR} fontSize={12} fontWeight="bold">{"2x + 1"}</text>
          <text x={190} y={115} textAnchor={"middle" as const} fill={MUTED} fontSize={10}>{"f(x)"}</text>

          <line x1={230} y1={100} x2={258} y2={100} stroke={MUTED} strokeWidth={2} />
          <polygon points="258,95 268,100 258,105" fill={MUTED} />

          <motion.circle cx={296} cy={100} r={28} fill={OUTPUT_COLOR} key={output} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={SPRING} />
          <motion.text key={`t${output}`} x={296} y={106} textAnchor={"middle" as const} fill={BG} fontSize={20} fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {output}
          </motion.text>
          <text x={296} y={145} textAnchor={"middle" as const} fill={MUTED} fontSize={12}>output f(x)</text>
        </svg>

        <motion.div key={inputVal} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl px-6 py-3 text-center" style={{ background: SURFACE }}>
          <p className="font-mono text-base font-bold" style={{ color: TEXT }}>
            {"f("}<span style={{ color: INPUT_COLOR }}>{inputVal}</span>{") = 2("}<span style={{ color: INPUT_COLOR }}>{inputVal}</span>{") + 1 = "}<span style={{ color: OUTPUT_COLOR }}>{output}</span>
          </p>
        </motion.div>

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "f(x) is just a name for a rule. Instead of saying \"the rule that doubles x and adds 1\", we write f(x) = 2x + 1. Much shorter!", button: "I see it!" },
    { text: "f(3) means \"plug in 3 for every x\". So f(3) = 2(3) + 1 = 7. The parentheses in f(3) are NOT multiplication!", button: "I see it!" },
    { text: "What if f(x) = 10? Work backwards: 2x + 1 = 10, so 2x = 9, so x = 4.5. You can find the input from any output!", button: "I see it!" },
    { text: "Function composition: if g(x) = x\u00B2, then g(f(3)) = g(7) = 49. You feed the output of one function into another!", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) { setPromptIdx((i) => i + 1); } else { onContinue(); }
  }, [promptIdx, prompts.length, onContinue]);
  const current = prompts[promptIdx]!;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">
          {prompts.map((_, i) => (
            <div key={i} className="h-2 w-6 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl p-6 text-center" style={{ background: SURFACE }}>
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>{current.text}</p>
          </motion.div>
        </AnimatePresence>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleAck} className="rounded-xl px-8 py-3 text-base font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label={current.button}>
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
    const timers = [setTimeout(() => setStep(1), 1200), setTimeout(() => setStep(2), 2400), setTimeout(() => setStep(3), 3600), setTimeout(() => setStep(4), 5000)];
    return () => timers.forEach(clearTimeout);
  }, []);

  const items = [
    { label: "Define:", text: "f(x) = 2x + 1", color: MACHINE_COLOR },
    { label: "Evaluate:", text: "f(3) = 2(3) + 1 = 7", color: INPUT_COLOR },
    { label: "Solve:", text: "f(x) = 10 \u2192 x = 4.5", color: OUTPUT_COLOR },
    { label: "Compose:", text: "g(f(3)) = g(7) = 49", color: PRIMARY },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Function Notation</h2>
        <div className="flex flex-col gap-4">
          {items.map((item, i) =>
            i <= step ? (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-4" style={{ background: SURFACE }}>
                <p className="text-xs font-semibold uppercase" style={{ color: MUTED }}>{item.label}</p>
                <p className="mt-1 font-mono text-[clamp(16px,4vw,22px)] font-bold" style={{ color: item.color }}>{item.text}</p>
              </motion.div>
            ) : null,
          )}
        </div>
        {step >= 4 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World Anchor                                         */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\uD83C\uDF21\uFE0F", title: "Temperature Conversion", desc: "F(C) = (9/5)C + 32 converts Celsius to Fahrenheit. F(100) = 212\u00B0F \u2014 boiling point!" },
    { icon: "\uD83D\uDE95", title: "Taxi Fare", desc: "fare(miles) = 2.50 + 1.75 \u00D7 miles. Input the distance, get the price. fare(5) = $11.25." },
    { icon: "\uD83D\uDCB0", title: "Simple Interest", desc: "A(t) = 1000(1 + 0.05t) calculates balance after t years. A(3) = $1150." },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Functions in Real Life</h2>
        <div className="flex flex-col gap-4">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4" style={{ background: SURFACE }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
  { id: 1, layer: "recall", question: "In f(x) = 3x \u2212 2, what does f represent?", options: ["A variable", "A name for the function (rule)", "Multiplication by x", "The y-intercept"], correctIndex: 1, feedback: "f is the name of the function. f(x) reads as \"f of x\" \u2014 the output when x is the input." },
  { id: 2, layer: "recall", question: "f(5) means:", options: ["f times 5", "Replace x with 5 in the rule", "5 factorial", "f equals 5"], correctIndex: 1, feedback: "f(5) means substitute 5 for every x in the function's rule and calculate the result." },
  { id: 3, layer: "recall", question: "True or false: f(x) = 2x means f times x equals 2x.", options: ["True", "False"], correctIndex: 1, feedback: "False! The parentheses in f(x) do NOT mean multiplication. f(x) names the output of function f for input x." },
  { id: 4, layer: "procedure", question: "If f(x) = 4x + 3, what is f(2)?", options: ["11", "9", "8", "6"], correctIndex: 0, feedback: "f(2) = 4(2) + 3 = 8 + 3 = 11." },
  { id: 5, layer: "procedure", question: "If f(x) = x\u00B2 \u2212 1, what is f(\u22123)?", options: ["8", "\u221210", "10", "\u22128"], correctIndex: 0, feedback: "f(\u22123) = (\u22123)\u00B2 \u2212 1 = 9 \u2212 1 = 8." },
  { id: 6, layer: "procedure", question: "If f(x) = 2x + 4 and f(x) = 10, what is x?", options: ["3", "7", "14", "5"], correctIndex: 0, feedback: "2x + 4 = 10, so 2x = 6, so x = 3." },
  { id: 7, layer: "understanding", question: "If f(x) = x + 2 and g(x) = 3x, what is g(f(4))?", options: ["18", "14", "10", "36"], correctIndex: 0, feedback: "First: f(4) = 4 + 2 = 6. Then: g(6) = 3(6) = 18." },
  { id: 8, layer: "understanding", question: "If f(a) = f(b), does a always equal b?", options: ["Yes, always", "Not necessarily", "Only if a and b are positive", "Never"], correctIndex: 1, feedback: "For f(x) = x\u00B2, f(3) = 9 and f(\u22123) = 9, but 3 \u2260 \u22123. Different inputs can give the same output!" },
  { id: 9, layer: "understanding", question: "A function f has f(0) = 5 and f(1) = 8. Which rule fits?", options: ["f(x) = 3x + 5", "f(x) = 5x + 3", "f(x) = 8x", "f(x) = x + 5"], correctIndex: 0, feedback: "f(0) = 3(0) + 5 = 5 \u2714 and f(1) = 3(1) + 5 = 8 \u2714. The rule f(x) = 3x + 5 matches both!" },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = done ? null : (PROBLEMS[currentIdx] ?? null);

  const handleSelect = useCallback((optIdx: number) => {
    if (answered || !problem) return;
    setSelected(optIdx);
    setAnswered(true);
    if (optIdx === problem.correctIndex) setScore((s) => s + 1);
  }, [answered, problem]);

  const handleNext = useCallback(() => { setSelected(null); setAnswered(false); setCurrentIdx((i) => i + 1); }, []);

  if (done || !problem) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: TEXT }}>Practice Complete!</h2>
          <p className="text-lg" style={{ color: MUTED }}>You got {score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} label="Continue" />
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
            let bg: string = SURFACE;
            let border: string = BORDER;
            if (answered) {
              if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; }
              else if (isSelected) { bg = `${ERROR}20`; border = ERROR; }
            }
            return (
              <motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>
                {opt}
                {answered && isCorrect && <span className="ml-2" style={{ color: SUCCESS }}>{"  \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span className="ml-2" style={{ color: ERROR }}>{"  \u2717"}</span>}
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
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label="Next problem">
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
  const handleSubmit = useCallback(() => { setSubmitted(true); }, []);

  if (submitted) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">{"\uD83E\uDDE0"}</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Understanding notation unlocks all of algebra. +50 XP</p>
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
        <p className="text-center text-sm" style={{ color: MUTED }}>Why do you think mathematicians use f(x) notation instead of just writing the formula every time?</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." className="w-full rounded-xl border-2 p-4 text-base" style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }} aria-label="Reflection text" />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }} aria-label="Submit reflection">Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main Lesson Component                                              */
/* ================================================================== */

export function FunctionNotationLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGES[stageIdx + 1];
    if (next) { setStage(next); } else { onComplete?.(); }
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
