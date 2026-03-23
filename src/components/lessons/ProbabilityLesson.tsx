"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Lesson-specific theme (semantic aliases)
// ---------------------------------------------------------------------------

const THEME = {
  probability: colors.accent.indigo,     // #818cf8
  red: "#f87171",
  blue: colors.functional.info,          // #60a5fa
  green: colors.functional.success,      // #34d399
  yellow: colors.functional.warning,     // #fbbf24
} as const;

// ---------------------------------------------------------------------------
// Shared token aliases (keeps inline style refs short)
// ---------------------------------------------------------------------------

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
// Lesson-specific constants
// ---------------------------------------------------------------------------

const SPINNER_SECTIONS = [
  { label: "Red", color: THEME.red },
  { label: "Blue", color: THEME.blue },
  { label: "Green", color: THEME.green },
  { label: "Yellow", color: THEME.yellow },
] as const;

const DIE_FACES = [1, 2, 3, 4, 5, 6] as const;

type ExperimentType = "spinner" | "die" | "coin";

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
    prompt: "Probability is calculated as...",
    options: [
      "Total outcomes / Favorable outcomes",
      "Favorable outcomes / Total outcomes",
      "Favorable outcomes \u00D7 Total outcomes",
      "Favorable outcomes \u2212 Total outcomes",
    ],
    correctAnswer: "Favorable outcomes / Total outcomes",
    feedback: "Count the outcomes you want, divide by all possible outcomes." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "A probability of 0 means the event is...",
    options: ["Certain", "Likely", "Unlikely", "Impossible"],
    correctAnswer: "Impossible",
    feedback: "0 = can never happen. 1 = always happens." },
  { id: 3, layer: "Recall", type: "multiple-choice",
    prompt: "The sample space for flipping a coin is...",
    options: [
      "{Heads}",
      "{Heads, Tails}",
      "{1, 2, 3, 4, 5, 6}",
      "{Win, Lose}",
    ],
    correctAnswer: "{Heads, Tails}",
    feedback: "The sample space lists all possible outcomes." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "P(rolling a 3 on a standard die) = ?",
    options: ["1/2", "1/3", "1/6", "3/6"],
    correctAnswer: "1/6",
    feedback: "One favorable outcome (3) out of six total: 1/6." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "A bag has 3 red and 5 blue marbles. P(red) = ?",
    options: ["3/5", "3/8", "5/8", "5/3"],
    correctAnswer: "3/8",
    feedback: "3 favorable (red) out of 8 total: 3/8." },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "A spinner has 8 equal sections, 2 are green. What is P(green) as a percent?",
    correctAnswer: "25",
    feedback: "P(green) = 2/8 = 1/4 = 25%." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "You flip a coin 5 times and get 5 heads. The probability of heads on the 6th flip is...",
    options: ["0", "1/2", "Less than 1/2", "Greater than 1/2"],
    correctAnswer: "1/2",
    feedback: "Each flip is independent. Past results don't change future probability." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Theoretical vs experimental probability: as you do more trials...",
    options: [
      "They stay the same",
      "Experimental gets closer to theoretical",
      "Theoretical gets closer to experimental",
      "They get further apart",
    ],
    correctAnswer: "Experimental gets closer to theoretical",
    feedback: "The Law of Large Numbers: more trials = closer to theoretical." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Which probability is impossible?",
    options: ["P = 0", "P = 0.5", "P = 1", "P = \u22120.5"],
    correctAnswer: "P = \u22120.5",
    feedback: "Probability is always between 0 and 1 (inclusive). Negative probabilities don't exist." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randomSpinnerResult(): number {
  return Math.floor(Math.random() * 4);
}

function randomDieResult(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function randomCoinResult(): "Heads" | "Tails" {
  return Math.random() < 0.5 ? "Heads" : "Tails";
}

// ---------------------------------------------------------------------------
// Shared micro-components
// ---------------------------------------------------------------------------

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4" aria-live="polite">
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Spinner SVG
// ---------------------------------------------------------------------------

function SpinnerSVG({ highlightIdx, spinning }: { highlightIdx: number | null; spinning: boolean }) {
  const cx = 100;
  const cy = 100;
  const r = 80;

  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40" aria-label="Spinner">
      {SPINNER_SECTIONS.map((sec, i) => {
        const startAngle = (i * 90 - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * 90 - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const isHighlighted = highlightIdx === i;
        return (
          <path key={i}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
            fill={sec.color}
            opacity={highlightIdx === null || isHighlighted ? 1 : 0.3}
            stroke={colors.bg.primary} strokeWidth={2} />
        );
      })}
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={6} fill={colors.bg.primary} />
      {/* Spinner needle */}
      <motion.line x1={cx} y1={cy} x2={cx} y2={cy - r + 15}
        stroke={colors.bg.primary} strokeWidth={3} strokeLinecap="round"
        animate={spinning ? { rotate: [0, 720 + (highlightIdx ?? 0) * 90 + 45] } : {}}
        transition={spinning ? { duration: 1.5, ease: "easeOut" } : {}}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
    </svg>
  );
}

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/ProbabilityHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [spin2Result, setSpin2Result] = useState<number | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => { setSpinResult(1); setPhase(1); }, 1000));
    timers.push(setTimeout(() => setPhase(2), 2500));
    timers.push(setTimeout(() => { setSpin2Result(0); setPhase(3); }, 3500));
    timers.push(setTimeout(() => setPhase(4), 5000));
    timers.push(setTimeout(() => setPhase(5), 6000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <StageWrapper>
      <div className="flex items-center justify-center mb-4">
        <SpinnerSVG highlightIdx={phase >= 1 ? spinResult : null} spinning={phase >= 1 && phase < 2} />
      </div>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium mb-2"
            style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Could you predict that?
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 3 && (
        <div className="flex items-center justify-center mb-4">
          <SpinnerSVG highlightIdx={spin2Result} spinning={false} />
        </div>
      )}

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-medium"
            style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            You can&apos;t predict exactly, but you CAN measure how likely each color is.
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 5 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </StageWrapper>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [experiment, setExperiment] = useState<ExperimentType>("spinner");
  const [interactions, setInteractions] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const canContinue = interactions >= 10;

  const tally = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of results) {
      counts.set(r, (counts.get(r) ?? 0) + 1);
    }
    return counts;
  }, [results]);

  const handleExperiment = useCallback(() => {
    let result: string;
    if (experiment === "spinner") {
      const idx = randomSpinnerResult();
      result = SPINNER_SECTIONS[idx]!.label;
    } else if (experiment === "die") {
      result = String(randomDieResult());
    } else {
      result = randomCoinResult();
    }
    setLastResult(result);
    setResults((prev) => [...prev, result]);
    setInteractions((i) => i + 1);
  }, [experiment]);

  const handleSwitchExperiment = useCallback((exp: ExperimentType) => {
    setExperiment(exp);
    setResults([]);
    setLastResult(null);
    setInteractions((i) => i + 1);
  }, []);

  const possibleOutcomes = useMemo(() => {
    if (experiment === "spinner") return SPINNER_SECTIONS.map((s) => s.label);
    if (experiment === "die") return DIE_FACES.map(String);
    return ["Heads", "Tails"];
  }, [experiment]);

  return (
    <section className="flex flex-1 flex-col items-center bg-nm-bg-primary px-4 pt-4" aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Run experiments and track the results
      </p>

      {/* Experiment selector */}
      <div className="flex gap-2 justify-center mb-3">
        {(["spinner", "die", "coin"] as const).map((exp) => (
          <button key={exp} onClick={() => handleSwitchExperiment(exp)}
            className="rounded-lg px-3 py-1 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: experiment === exp ? PRIMARY : SURFACE,
              color: TEXT,
            }}>
            {exp.charAt(0).toUpperCase() + exp.slice(1)}
          </button>
        ))}
      </div>

      {/* Visual + action */}
      <div className="flex flex-col items-center mb-3">
        {experiment === "spinner" && (
          <SpinnerSVG highlightIdx={lastResult ? SPINNER_SECTIONS.findIndex((s) => s.label === lastResult) : null} spinning={false} />
        )}
        {experiment === "die" && (
          <motion.div key={lastResult} initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }} transition={SPRING}
            className="rounded-xl flex items-center justify-center mb-2"
            style={{ width: 80, height: 80, backgroundColor: SURFACE, border: `2px solid ${THEME.probability}` }}>
            <span className="font-bold font-mono text-3xl tabular-nums" style={{ color: TEXT }}>
              {lastResult ?? "?"}
            </span>
          </motion.div>
        )}
        {experiment === "coin" && (
          <motion.div key={lastResult} initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }} transition={SPRING}
            className="rounded-full flex items-center justify-center mb-2"
            style={{ width: 80, height: 80,
              backgroundColor: lastResult === "Heads" ? THEME.yellow : THEME.blue,
              border: `3px solid ${ELEVATED}` }}>
            <span className="font-bold text-sm" style={{ color: colors.bg.primary }}>
              {lastResult ?? "?"}
            </span>
          </motion.div>
        )}

        <motion.button whileTap={{ scale: 0.97 }} onClick={handleExperiment}
          className="rounded-xl px-8 py-3 font-semibold text-white min-h-[48px] min-w-[140px]"
          style={{ backgroundColor: PRIMARY }}>
          {experiment === "spinner" ? "Spin!" : experiment === "die" ? "Roll!" : "Flip!"}
        </motion.button>
      </div>

      {/* Tally */}
      {results.length > 0 && (
        <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: SURFACE }}>
          <p className="text-xs font-medium mb-2 text-center" style={{ color: MUTED }}>
            Results ({results.length} trials)
          </p>
          <div className="space-y-1">
            {possibleOutcomes.map((outcome) => {
              const count = tally.get(outcome) ?? 0;
              const pct = results.length > 0 ? Math.round((count / results.length) * 100) : 0;
              return (
                <div key={outcome} className="flex items-center gap-2 text-xs">
                  <span className="w-12 font-medium" style={{ color: TEXT_SEC }}>{outcome}</span>
                  <div className="flex-1 rounded-full h-3" style={{ backgroundColor: ELEVATED }}>
                    <motion.div className="rounded-full h-3"
                      style={{ backgroundColor: THEME.probability }}
                      animate={{ width: `${pct}%` }} transition={SPRING} />
                  </div>
                  <span className="font-mono tabular-nums w-10 text-right" style={{ color: MUTED }}>
                    {count} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 10)} total={10} />
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
    { text: "Look at your results. With a fair die, each outcome is equally likely \u2014 about 1/6 of the time!", btn: "I see it!" },
    { text: "Theoretical probability is what SHOULD happen. Experimental is what DID happen. With more trials, they get closer!", btn: "I see it!" },
    { text: "Probability = favorable outcomes / total outcomes. For a die showing even: 3 favorable (2,4,6) out of 6 total = 3/6 = 1/2.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <StageWrapper>
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 justify-center">
            {DIE_FACES.map((face) => (
              <div key={face} className="rounded-lg flex items-center justify-center flex-col"
                style={{ width: 44, height: 56, backgroundColor: SURFACE, border: `1px solid ${ELEVATED}` }}>
                <span className="font-bold font-mono" style={{ color: TEXT }}>{face}</span>
                <span className="text-xs" style={{ color: THEME.probability }}>1/6</span>
              </div>
            ))}
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex gap-4 justify-center items-end">
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: MUTED }}>Theoretical</p>
              <div className="rounded-lg p-3" style={{ backgroundColor: SURFACE }}>
                <p className="font-mono font-bold" style={{ color: THEME.green }}>1/6 = 16.7%</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: MUTED }}>Experimental</p>
              <div className="rounded-lg p-3" style={{ backgroundColor: SURFACE }}>
                <p className="font-mono font-bold" style={{ color: THEME.blue }}>~varies</p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              <p className="text-xs font-bold text-center" style={{ color: THEME.yellow }}>
                More trials {"\u2192"} closer!
              </p>
            </motion.div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
            <p className="font-mono text-lg font-bold mb-2" style={{ color: THEME.probability }}>
              P(event) = favorable / total
            </p>
            <p className="text-sm" style={{ color: TEXT_SEC }}>
              P(even on die) = 3/6 = 1/2 = 50%
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
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
            className="rounded-xl px-8 py-3 font-semibold text-white min-h-[48px] min-w-[140px]"
            style={{ backgroundColor: PRIMARY }}>
            {current.btn}
          </motion.button>
        </motion.div>
      )}
    </StageWrapper>
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
    { formula: "P(Event) = favorable / total", desc: "The probability formula", color: THEME.probability },
    { formula: "0 = impossible, 1 = certain", desc: "Probability scale", color: THEME.yellow },
    { formula: "P(heads) = 1/2 = 0.5 = 50%", desc: "Three ways to express the same probability", color: THEME.green },
  ];

  return (
    <StageWrapper>
      <h2 className="text-center font-bold mb-8"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Probability Notation
      </h2>
      <div className="space-y-6 w-full max-w-md">
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
      {revealed >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
    </StageWrapper>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{2601}\u{FE0F}", title: "Weather Forecast", desc: "30% chance of rain means P(rain) = 0.3", math: "Percent to decimal" },
    { icon: "\u{1F3B2}", title: "Board Games", desc: "Probability of rolling a 6: 1/6", math: "P = 1/6" },
    { icon: "\u{1F3C0}", title: "Basketball", desc: "A player makes 80% of free throws: P(make) = 0.8", math: "Experimental probability" },
  ];

  return (
    <StageWrapper>
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
    </StageWrapper>
  );
}

// ===========================================================================
// STAGE 6: PRACTICE
// ===========================================================================

function PracticeStage({ onContinue }: { onContinue: () => void }) {
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
    if (isLast) { onContinue(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false);
  }, [isLast, onContinue]);

  return (
    <section className="flex flex-1 flex-col bg-nm-bg-primary px-4 pt-4" aria-live="polite">
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

        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2 w-full">
            {problem.options.map((opt) => {
              let bg: string = SURFACE; let border: string = ELEVATED;
              if (submitted) {
                if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; }
                else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; }
              } else if (opt === selected) { bg = "#8b5cf633"; border = PRIMARY; }
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
        )}

        {problem.type === "numeric-input" && (
          <input type="number" value={inputValue}
            onChange={(e) => { if (!submitted) setInputValue(e.target.value); }}
            disabled={submitted} placeholder="Enter your answer"
            className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
            style={{ backgroundColor: SURFACE, color: TEXT,
              border: `2px solid ${submitted ? (isCorrect ? SUCCESS : ERROR) : ELEVATED}`,
              outline: "none" }} />
        )}

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
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={!userAnswer}
              className="w-full rounded-xl px-8 py-3 font-semibold text-white min-h-[48px] disabled:opacity-40"
              style={{ backgroundColor: PRIMARY }}>
              Check Answer
            </motion.button>
          ) : (
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleNext}
              className="w-full rounded-xl px-8 py-3 font-semibold text-white min-h-[48px]"
              style={{ backgroundColor: PRIMARY }}>
              {isLast ? "Continue" : "Next \u2192"}
            </motion.button>
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
    <StageWrapper>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6"
          style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          In your own words, explain the difference between theoretical and experimental probability. Why might they be different?
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
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={!canSubmit}
              className="w-full rounded-xl px-8 py-3 font-semibold text-white min-h-[48px] disabled:opacity-40"
              style={{ backgroundColor: PRIMARY }}>
              Submit Reflection
            </motion.button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <motion.button whileTap={{ scale: 0.97 }} onClick={onContinue}
              className="w-full rounded-xl px-8 py-3 font-semibold text-white min-h-[48px]"
              style={{ backgroundColor: PRIMARY }}>
              Complete Lesson
            </motion.button>
          </motion.div>
        )}
      </div>
    </StageWrapper>
  );
}

// ===========================================================================
// ROOT COMPONENT
// ===========================================================================

export function ProbabilityLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="SP-5.4 Probability Basics" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
