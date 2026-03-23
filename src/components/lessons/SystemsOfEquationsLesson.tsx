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

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* ── Lesson-specific semantic colors ── */
const THEME = {
  line1: colors.accent.emerald,
  line2: "#f59e0b",
  intersection: "#ec4899",
} as const;

/* ── Aliases for shared tokens ── */
const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const PRIMARY = colors.accent.indigo;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

interface PracticeProblem {
  id: number; layer: string; type: "multiple-choice";
  prompt: string; options: string[]; correctAnswer: string; feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice",
    prompt: "What is the solution to a system of equations?",
    options: ["The point where both lines intersect", "The slope of each line", "The y-intercepts"],
    correctAnswer: "The point where both lines intersect",
    feedback: "A solution is an (x, y) pair that satisfies BOTH equations \u2014 where the lines cross." },
  { id: 2, layer: "Recall", type: "multiple-choice",
    prompt: "Solve: x + y = 5, x = 3. What is y?",
    options: ["2", "3", "8", "5"],
    correctAnswer: "2",
    feedback: "Substitute x = 3 into x + y = 5: 3 + y = 5, so y = 2." },
  { id: 3, layer: "Procedure", type: "multiple-choice",
    prompt: "Solve by substitution: y = 2x, x + y = 9",
    options: ["(3, 6)", "(4, 5)", "(2, 7)", "(9, 0)"],
    correctAnswer: "(3, 6)",
    feedback: "Substitute y = 2x: x + 2x = 9, 3x = 9, x = 3. Then y = 2(3) = 6." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Solve: x + y = 10, x \u2212 y = 4",
    options: ["(7, 3)", "(5, 5)", "(6, 4)", "(8, 2)"],
    correctAnswer: "(7, 3)",
    feedback: "Add equations: 2x = 14, x = 7. Then 7 + y = 10, y = 3." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "If two lines are parallel, the system has:",
    options: ["One solution", "No solution", "Infinite solutions"],
    correctAnswer: "No solution",
    feedback: "Parallel lines never intersect, so there is no (x, y) that satisfies both." },
  { id: 6, layer: "Understanding", type: "multiple-choice",
    prompt: "If two equations describe the SAME line, the system has:",
    options: ["One solution", "No solution", "Infinitely many solutions"],
    correctAnswer: "Infinitely many solutions",
    feedback: "Every point on the line satisfies both equations. Infinitely many solutions!" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Why does substitution work?",
    options: [
      "Because equal things can replace each other",
      "Because we're guessing",
      "It only works sometimes",
    ],
    correctAnswer: "Because equal things can replace each other",
    feedback: "If y = 2x, then y and 2x are the same thing. We can substitute one for the other." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Solve: 2x + y = 7, x + y = 5. What is x?",
    options: ["2", "3", "1", "4"],
    correctAnswer: "2",
    feedback: "Subtract the second from the first: (2x + y) \u2212 (x + y) = 7 \u2212 5, so x = 2." },
];

/* ------------------------------------------------------------------ */
/*  Stage components                                                   */
/* ------------------------------------------------------------------ */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/SystemsOfEquationsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800));
    t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 4000));
    t.push(setTimeout(() => setPhase(4), 5500));
    t.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => t.forEach(clearTimeout);
  }, []);

  const GW = 300; const GH = 300; const GM = 40;
  const toPixel = (v: number, min: number, max: number, size: number) => GM + ((v - min) / (max - min)) * (size - 2 * GM);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <AnimatePresence>
        {phase >= 1 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-medium mb-2"
            style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Two friends share some money...
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 2 && (
        <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full max-w-xs mb-4" aria-label="Two lines intersecting on a graph">
          <rect width={GW} height={GH} fill={BG} rx={8} />
          <line x1={GM} y1={GH - GM} x2={GW - GM} y2={GH - GM} stroke={ELEVATED} strokeWidth={1.5} />
          <line x1={GM} y1={GM} x2={GM} y2={GH - GM} stroke={ELEVATED} strokeWidth={1.5} />
          {/* y = x + 1 */}
          <motion.line x1={toPixel(0, 0, 8, GW)} y1={toPixel(1, 0, 8, GH)} x2={toPixel(7, 0, 8, GW)} y2={toPixel(8, 0, 8, GH)}
            stroke={THEME.line1} strokeWidth={2.5}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
            transform={`scale(1,-1) translate(0,-${GH})`} />
          {/* y = -x + 7 */}
          {phase >= 3 && (
            <motion.line x1={toPixel(0, 0, 8, GW)} y1={toPixel(7, 0, 8, GH)} x2={toPixel(7, 0, 8, GW)} y2={toPixel(0, 0, 8, GH)}
              stroke={THEME.line2} strokeWidth={2.5}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
              transform={`scale(1,-1) translate(0,-${GH})`} />
          )}
          {/* Intersection at (3,4) */}
          {phase >= 4 && (
            <motion.circle cx={toPixel(3, 0, 8, GW)} cy={GH - toPixel(4, 0, 8, GH) + GM} r={7}
              fill={THEME.intersection} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} />
          )}
        </svg>
      )}

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center font-bold" style={{ color: THEME.intersection, fontSize: "clamp(16px, 4vw, 22px)" }}>
            The answer is where the lines meet: (3, 4)
          </motion.p>
        )}
      </AnimatePresence>
      {phase >= 5 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [m1, setM1] = useState(1);
  const [b1, setB1] = useState(1);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const m2 = -1; const b2 = 7;
  const xInt = (b2 - b1) / (m1 - m2);
  const yInt = m1 * xInt + b1;
  const hasIntersection = m1 !== m2;

  const GW = 300; const GH = 260; const GM = 30;
  const toX = (v: number) => GM + ((v - 0) / 8) * (GW - 2 * GM);
  const toY = (v: number) => GH - GM - ((v - 0) / 8) * (GH - 2 * GM);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust the slope and intercept of the green line
      </p>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: MUTED }}>Slope:</span>
          <button onClick={() => { setM1((m) => Math.max(-3, m - 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 bg-nm-bg-secondary text-nm-text-primary">
            {"\u2212"}</button>
          <span className="font-mono font-bold w-6 text-center" style={{ color: THEME.line1 }}>{m1}</span>
          <button onClick={() => { setM1((m) => Math.min(3, m + 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 bg-nm-bg-secondary text-nm-text-primary">+</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: MUTED }}>b:</span>
          <button onClick={() => { setB1((b) => Math.max(-2, b - 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 bg-nm-bg-secondary text-nm-text-primary">
            {"\u2212"}</button>
          <span className="font-mono font-bold w-6 text-center" style={{ color: THEME.line1 }}>{b1}</span>
          <button onClick={() => { setB1((b) => Math.min(8, b + 1)); interact(); }}
            className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95 bg-nm-bg-secondary text-nm-text-primary">+</button>
        </div>
      </div>

      <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full max-w-xs mb-3" aria-label="Interactive graph of two lines">
        <rect width={GW} height={GH} fill={BG} rx={8} />
        <line x1={GM} y1={GH - GM} x2={GW - GM} y2={GH - GM} stroke={ELEVATED} strokeWidth={1} />
        <line x1={GM} y1={GM} x2={GM} y2={GH - GM} stroke={ELEVATED} strokeWidth={1} />
        {/* Line 1: y = m1*x + b1 */}
        <line x1={toX(0)} y1={toY(b1)} x2={toX(8)} y2={toY(m1 * 8 + b1)} stroke={THEME.line1} strokeWidth={2.5} />
        {/* Line 2: y = -x + 7 */}
        <line x1={toX(0)} y1={toY(b2)} x2={toX(8)} y2={toY(m2 * 8 + b2)} stroke={THEME.line2} strokeWidth={2.5} />
        {hasIntersection && xInt >= 0 && xInt <= 8 && yInt >= 0 && yInt <= 8 && (
          <motion.circle cx={toX(xInt)} cy={toY(yInt)} r={6} fill={THEME.intersection}
            key={`${xInt}-${yInt}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} />
        )}
      </svg>

      <div className="text-center mb-2">
        <p className="font-mono text-sm" style={{ color: THEME.line1 }}>y = {m1}x + {b1}</p>
        <p className="font-mono text-sm" style={{ color: THEME.line2 }}>y = {"\u2212"}x + 7</p>
        {hasIntersection && xInt >= 0 && xInt <= 8 && (
          <p className="font-mono text-sm font-bold mt-1" style={{ color: THEME.intersection }}>
            Intersection: ({xInt.toFixed(1)}, {yInt.toFixed(1)})
          </p>
        )}
        {!hasIntersection && (
          <p className="text-sm font-bold mt-1" style={{ color: ERROR }}>Parallel lines {"\u2014"} no solution!</p>
        )}
      </div>

      <InteractionDots count={Math.min(interactions, 6)} total={6} />
      {canContinue && <ContinueButton onClick={onContinue} />}
    </section>
  );
}

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "A system of equations is two (or more) equations with the same variables. The solution is the values that make BOTH true.", btn: "I see it!" },
    { text: "Graphing method: graph both lines. Where they cross is the solution (x, y).", btn: "I see it!" },
    { text: "Substitution method: solve one equation for a variable, then plug it into the other. Algebra does the work!", btn: "Got it!" },
  ], []);
  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center bg-nm-bg-secondary">
            <p className="font-mono font-bold" style={{ color: THEME.line1 }}>x + y = 5</p>
            <p className="font-mono font-bold" style={{ color: THEME.line2 }}>x {"\u2212"} y = 1</p>
            <p className="font-mono font-bold mt-2" style={{ color: THEME.intersection }}>Solution: (3, 2)</p>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center bg-nm-bg-secondary">
            <p className="text-sm" style={{ color: TEXT_SEC }}>Graph both lines {"\u2192"} find the crossing point</p>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 bg-nm-bg-secondary">
            <p className="font-mono text-sm" style={{ color: THEME.line1 }}>y = 2x</p>
            <p className="font-mono text-sm" style={{ color: THEME.line2 }}>x + y = 9</p>
            <p className="font-mono text-sm mt-1" style={{ color: MUTED }}>Substitute: x + 2x = 9</p>
            <p className="font-mono text-sm" style={{ color: MUTED }}>3x = 9 {"\u2192"} x = 3</p>
            <p className="font-mono text-sm font-bold" style={{ color: THEME.intersection }}>y = 6 {"\u2192"} (3, 6)</p>
          </motion.div>
        )}
      </div>
      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
          <p className="font-medium mb-4" style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
          <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
            className="min-w-[140px]" style={{ backgroundColor: PRIMARY }}>{current.btn}</Button>
        </motion.div>
      )}
    </section>
  );
}

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1200));
    t.push(setTimeout(() => setRevealed(2), 2400));
    t.push(setTimeout(() => setRevealed(3), 3600));
    t.push(setTimeout(() => setRevealed(4), 4800));
    return () => t.forEach(clearTimeout);
  }, []);
  const notations = [
    { formula: "System: two equations, two unknowns", desc: "Find (x, y) that satisfies both", color: THEME.line1 },
    { formula: "Graphing: intersection = solution", desc: "Where lines cross on the coordinate plane", color: THEME.line2 },
    { formula: "Substitution: isolate then replace", desc: "Solve one for a variable, plug into the other", color: THEME.intersection },
    { formula: "One solution, no solution, or infinite", desc: "Intersecting, parallel, or identical lines", color: PRIMARY },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Solving Systems
      </h2>
      <div className="space-y-5 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4 bg-nm-bg-secondary" style={{ borderLeft: `4px solid ${n.color}` }}>
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

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F4B0}", title: "Mixing Coins", desc: "Quarters and dimes totaling $2.50 with 15 coins", math: "q + d = 15, 0.25q + 0.10d = 2.50" },
    { icon: "\u{1F697}", title: "Meeting Point", desc: "Two cars driving toward each other \u2014 when do they meet?", math: "d\u2081 + d\u2082 = total distance" },
    { icon: "\u{1F6D2}", title: "Shopping", desc: "3 apples and 2 oranges = $5; 1 apple and 4 oranges = $6", math: "3a + 2o = 5, a + 4o = 6" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Systems in Real Life</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }}
            className="rounded-xl p-4 flex gap-3 items-start bg-nm-bg-secondary">
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
    </section>
  );
}

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!;
  const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;

  const handleSubmit = useCallback(() => {
    if (!selected) return; setSubmitted(true);
    setResults((prev) => { const next = [...prev]; next[currentQ] = selected === problem.correctAnswer; return next; });
  }, [selected, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => {
    if (isLast) { onContinue(); return; } setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false);
  }, [isLast, onContinue]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i]; let bg: string = ELEVATED;
          if (r === true) bg = SUCCESS; else if (r === false) bg = ERROR;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${PRIMARY}` : "none" }} />;
        })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: MUTED }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}
        </p>
        <p className="text-center font-medium mb-6" style={{ color: TEXT, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">
          {problem.options.map((opt) => {
            let bg: string = SURFACE; let border: string = ELEVATED;
            if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; }
              else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; }
            } else if (opt === selected) { bg = "#818cf833"; border = PRIMARY; }
            return (
              <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
                className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
                style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }}>{opt}</button>
            );
          })}
        </div>
        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? SUCCESS : ERROR}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? SUCCESS : ERROR }}>{isCorrect ? "Correct!" : "Not quite"}</p>
              <p className="text-sm" style={{ color: TEXT_SEC }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: PRIMARY }}>
              {isLast ? "Continue" : "Next \u2192"}</Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false);
  const canSubmit = text.trim().length >= 20;
  const handleSubmit = useCallback(() => { if (canSubmit) setSubmitted(true); }, [canSubmit]);
  const handleSkip = useCallback(() => { setSubmitted(true); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          When would you prefer graphing over substitution to solve a system? When would substitution be better?
        </p>
        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: SURFACE, color: TEXT, border: `2px solid ${ELEVATED}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? SUCCESS : MUTED }}>
              {text.trim().length}/20 characters minimum</p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
            className="rounded-xl p-6 text-center bg-nm-bg-secondary">
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>Reflecting on concepts deepens your understanding.</p>
          </motion.div>
        )}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>Complete Lesson</Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function SystemsOfEquationsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="AL-3.9 Systems of Equations" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
