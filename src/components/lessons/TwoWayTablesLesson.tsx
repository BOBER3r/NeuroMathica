"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

const COLORS = {
  catA: "#60a5fa", catB: "#34d399", joint: "#f59e0b", marginal: "#818cf8",
  bgPrimary: "#0f172a", bgSurface: "#1e293b", bgElevated: "#334155",
  textPrimary: "#f8fafc", textSecondary: "#e2e8f0", textMuted: "#94a3b8",
  success: "#34d399", error: "#f87171", primary: "#8b5cf6",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface PracticeProblem { id: number; layer: string; type: "multiple-choice" | "numeric-input"; prompt: string; options?: string[]; correctAnswer: string; feedback: string; }

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "A two-way table organizes data by...",
    options: ["One variable", "Two categorical variables", "Continuous data", "Time series"],
    correctAnswer: "Two categorical variables", feedback: "Two-way tables cross-classify data by two categories (e.g., gender and preference)." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "The row and column totals in a two-way table are called...",
    options: ["Joint frequencies", "Marginal frequencies", "Conditional frequencies", "Relative frequencies"],
    correctAnswer: "Marginal frequencies", feedback: "Marginal frequencies are the totals in the margins (edges) of the table." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "A joint frequency is...",
    options: ["A row total", "A column total", "The count in an interior cell", "The grand total"],
    correctAnswer: "The count in an interior cell", feedback: "Joint frequencies are the counts where two categories intersect (inside the table)." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "In a table: 20 students like pizza, 15 like tacos, 10 like both. How many like at least one?",
    correctAnswer: "25", feedback: "Pizza + Tacos \u2212 Both = 20 + 15 \u2212 10 = 25." },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "A table shows 30 boys and 20 girls surveyed. 18 boys play sports. What percent of boys play sports?",
    correctAnswer: "60", feedback: "18/30 = 0.6 = 60%." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "To find relative frequency, you...",
    options: ["Count the cells", "Divide each cell by the grand total", "Add all the cells", "Subtract the marginals"],
    correctAnswer: "Divide each cell by the grand total", feedback: "Relative frequency = cell count / grand total. It converts counts to proportions or percentages." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Two variables have an association in a two-way table when...",
    options: ["All cells are equal", "The conditional distributions differ across rows or columns", "The row totals are equal", "The table is symmetric"],
    correctAnswer: "The conditional distributions differ across rows or columns",
    feedback: "If the distribution of one variable changes depending on the other, there's an association." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "If 60% of boys and 60% of girls like sports, is there an association between gender and sports?",
    options: ["Yes", "No"],
    correctAnswer: "No", feedback: "Same conditional percentages means no association \u2014 the variables are independent." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Can a two-way table prove that one variable causes the other?",
    options: ["Yes", "No, it only shows association"],
    correctAnswer: "No, it only shows association", feedback: "Association is not causation! Two-way tables show relationships, not causes." },
];

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay }} className="w-full flex justify-center pt-4 pb-8">
    <Button size="lg" onClick={onClick} className="min-w-[160px]" style={{ backgroundColor: COLORS.primary }}>{label}</Button></motion.div>);
}
function InteractionDots({ count, total }: { count: number; total: number }) {
  return (<div className="flex items-center gap-1 justify-center">{Array.from({ length: total }, (_, i) => (
    <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 6, height: 6, backgroundColor: i < count ? COLORS.primary : COLORS.bgElevated }} />))}</div>);
}

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/TwoWayTablesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500)); t.push(setTimeout(() => setPhase(3), 4500)); t.push(setTimeout(() => setPhase(4), 6000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="w-full max-w-md">
        {phase >= 1 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
          className="rounded-xl overflow-hidden" style={{ backgroundColor: COLORS.bgSurface }}>
          <table className="w-full text-sm" style={{ color: COLORS.textPrimary }}>
            <thead><tr style={{ backgroundColor: COLORS.bgElevated }}>
              <th className="p-3 text-left" style={{ color: COLORS.textMuted }}></th>
              <th className="p-3 text-center" style={{ color: COLORS.catA }}>Pizza</th>
              <th className="p-3 text-center" style={{ color: COLORS.catB }}>Tacos</th>
              <th className="p-3 text-center" style={{ color: COLORS.marginal }}>Total</th>
            </tr></thead>
            <tbody>
              <tr><td className="p-3 font-medium">Boys</td>
                <td className="p-3 text-center font-mono">{phase >= 2 ? "15" : "?"}</td>
                <td className="p-3 text-center font-mono">{phase >= 2 ? "10" : "?"}</td>
                <td className="p-3 text-center font-mono font-bold" style={{ color: COLORS.marginal }}>{phase >= 2 ? "25" : "?"}</td></tr>
              <tr style={{ backgroundColor: `${COLORS.bgElevated}44` }}><td className="p-3 font-medium">Girls</td>
                <td className="p-3 text-center font-mono">{phase >= 2 ? "12" : "?"}</td>
                <td className="p-3 text-center font-mono">{phase >= 2 ? "13" : "?"}</td>
                <td className="p-3 text-center font-mono font-bold" style={{ color: COLORS.marginal }}>{phase >= 2 ? "25" : "?"}</td></tr>
              <tr style={{ backgroundColor: COLORS.bgElevated }}><td className="p-3 font-bold" style={{ color: COLORS.marginal }}>Total</td>
                <td className="p-3 text-center font-mono font-bold" style={{ color: COLORS.marginal }}>{phase >= 2 ? "27" : "?"}</td>
                <td className="p-3 text-center font-mono font-bold" style={{ color: COLORS.marginal }}>{phase >= 2 ? "23" : "?"}</td>
                <td className="p-3 text-center font-mono font-bold" style={{ color: COLORS.joint }}>{phase >= 2 ? "50" : "?"}</td></tr>
            </tbody>
          </table>
        </motion.div>)}
        {phase >= 3 && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center mt-4 font-medium" style={{ color: COLORS.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
          Two categories. One table. The whole story.
        </motion.p>)}
      </div>
      {phase >= 4 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>);
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [a, setA] = useState(15); const [b, setB] = useState(10); const [c, setC] = useState(12); const [d, setD] = useState(13);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const rowA = a + b; const rowB = c + d; const colA = a + c; const colB = b + d; const total = a + b + c + d;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-3 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Change the cell values and watch the totals update
      </p>
      <div className="rounded-xl overflow-hidden w-full max-w-sm" style={{ backgroundColor: COLORS.bgSurface }}>
        <table className="w-full text-sm" style={{ color: COLORS.textPrimary }}>
          <thead><tr style={{ backgroundColor: COLORS.bgElevated }}>
            <th className="p-2"></th><th className="p-2 text-center" style={{ color: COLORS.catA }}>Cat A</th>
            <th className="p-2 text-center" style={{ color: COLORS.catB }}>Cat B</th>
            <th className="p-2 text-center" style={{ color: COLORS.marginal }}>Total</th>
          </tr></thead>
          <tbody>
            <tr><td className="p-2 font-medium">Group 1</td>
              <td className="p-2 text-center"><div className="flex items-center justify-center gap-1">
                <button onClick={() => { if (a > 0) { setA(a - 1); interact(); } }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>{"\u2212"}</button>
                <span className="font-mono w-8 text-center">{a}</span>
                <button onClick={() => { setA(a + 1); interact(); }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>+</button>
              </div></td>
              <td className="p-2 text-center"><div className="flex items-center justify-center gap-1">
                <button onClick={() => { if (b > 0) { setB(b - 1); interact(); } }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>{"\u2212"}</button>
                <span className="font-mono w-8 text-center">{b}</span>
                <button onClick={() => { setB(b + 1); interact(); }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>+</button>
              </div></td>
              <td className="p-2 text-center font-bold font-mono" style={{ color: COLORS.marginal }}>{rowA}</td></tr>
            <tr><td className="p-2 font-medium">Group 2</td>
              <td className="p-2 text-center"><div className="flex items-center justify-center gap-1">
                <button onClick={() => { if (c > 0) { setC(c - 1); interact(); } }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>{"\u2212"}</button>
                <span className="font-mono w-8 text-center">{c}</span>
                <button onClick={() => { setC(c + 1); interact(); }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>+</button>
              </div></td>
              <td className="p-2 text-center"><div className="flex items-center justify-center gap-1">
                <button onClick={() => { if (d > 0) { setD(d - 1); interact(); } }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>{"\u2212"}</button>
                <span className="font-mono w-8 text-center">{d}</span>
                <button onClick={() => { setD(d + 1); interact(); }} className="min-h-[44px] min-w-[44px] rounded" style={{ backgroundColor: COLORS.bgElevated, color: COLORS.textPrimary }}>+</button>
              </div></td>
              <td className="p-2 text-center font-bold font-mono" style={{ color: COLORS.marginal }}>{rowB}</td></tr>
            <tr style={{ backgroundColor: COLORS.bgElevated }}><td className="p-2 font-bold" style={{ color: COLORS.marginal }}>Total</td>
              <td className="p-2 text-center font-bold font-mono" style={{ color: COLORS.marginal }}>{colA}</td>
              <td className="p-2 text-center font-bold font-mono" style={{ color: COLORS.marginal }}>{colB}</td>
              <td className="p-2 text-center font-bold font-mono" style={{ color: COLORS.joint }}>{total}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-xl p-3 w-full max-w-sm mt-3" style={{ backgroundColor: COLORS.bgSurface }}>
        <p className="text-xs text-center" style={{ color: COLORS.textMuted }}>
          Group 1 Cat A rate: <span className="font-mono font-bold" style={{ color: COLORS.catA }}>{rowA > 0 ? Math.round(a / rowA * 100) : 0}%</span>
          {" | "}Group 2 Cat A rate: <span className="font-mono font-bold" style={{ color: COLORS.catA }}>{rowB > 0 ? Math.round(c / rowB * 100) : 0}%</span>
        </p>
      </div>
      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>);
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Joint frequencies (inside cells) tell you how many share BOTH categories. Marginals (edges) give row/column totals.", btn: "I see it!" },
    { text: "Relative frequencies convert counts to percentages by dividing by the grand total.", btn: "I see it!" },
    { text: "Compare conditional percentages across rows: if they differ, the variables are associated!", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 260 80" className="w-full max-w-[260px] mb-6">
        <motion.text x={130} y={40} textAnchor={"middle" as const} fill={COLORS.joint} fontSize={14} fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {step === 0 ? "Joint vs Marginal" : step === 1 ? "Counts \u2192 Percentages" : "Same rates = No association"}
        </motion.text>
      </svg>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: COLORS.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
          className="min-w-[140px]" style={{ backgroundColor: COLORS.primary }}>{current.btn}</Button>
      </motion.div>)}
    </section>);
}

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500)); t.push(setTimeout(() => setRevealed(2), 3000)); t.push(setTimeout(() => setRevealed(3), 4500));
    return () => t.forEach(clearTimeout); }, []);
  const notations = [
    { formula: "Joint freq = cell count", desc: "How many share both categories", color: COLORS.joint },
    { formula: "Marginal freq = row/column total", desc: "Total for one category across all of the other", color: COLORS.marginal },
    { formula: "Relative freq = cell / grand total", desc: "Proportion or percentage of the whole", color: COLORS.catA },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Two-Way Table Terms</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4"
            style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold font-mono text-base" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>);
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F4CA}", title: "Survey Results", desc: "Do boys and girls prefer different activities? A two-way table reveals the pattern.", math: "Gender \u00D7 Preference" },
    { icon: "\u{1F48A}", title: "Medical Studies", desc: "Treatment vs placebo outcomes organized in a two-way table.", math: "Treatment \u00D7 Outcome" },
    { icon: "\u{1F4F1}", title: "App Usage", desc: "Age group vs social media platform shows which demographics use what.", math: "Age \u00D7 Platform" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Real World Connections</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: COLORS.bgSurface }}>
          <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
          <div><p className="font-semibold" style={{ color: COLORS.textPrimary }}>{s.title}</p>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>{s.desc}</p>
            <p className="text-xs font-mono mt-1" style={{ color: COLORS.primary }}>{s.math}</p></div>
        </motion.div>))}
      </div>
      <ContinueButton onClick={onComplete} delay={0.3} />
    </section>);
}

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [currentQ, setCurrentQ] = useState(0); const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(""); const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const userAnswer = problem.type === "numeric-input" ? inputValue.trim() : selected;
  const isCorrect = userAnswer === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!userAnswer) return; setSubmitted(true);
    setResults((p) => { const n = [...p]; n[currentQ] = userAnswer === problem.correctAnswer; return n; }); }, [userAnswer, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onComplete(); return; } setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false); }, [isLast, onComplete]);
  return (
    <section className="flex flex-1 flex-col px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = COLORS.bgElevated;
          if (r === true) bg = COLORS.success; else if (r === false) bg = COLORS.error;
          return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${COLORS.primary}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: COLORS.textMuted }}>{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: COLORS.textPrimary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        {problem.type === "multiple-choice" && problem.options && (<div className="space-y-2 w-full">{problem.options.map((opt) => {
          let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
          if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; } }
          else if (opt === selected) { bg = "#8b5cf633"; border = COLORS.primary; }
          return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
            className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
            style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>{opt}</button>); })}</div>)}
        {problem.type === "numeric-input" && (
          <input type="number" value={inputValue} onChange={(e) => { if (!submitted) setInputValue(e.target.value); }}
            disabled={submitted} placeholder="Enter your answer" className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary, border: `2px solid ${submitted ? (isCorrect ? COLORS.success : COLORS.error) : COLORS.bgElevated}`, outline: "none" }} />)}
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? COLORS.success : COLORS.error }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>{problem.feedback}</p>
          </motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: userAnswer ? 1 : 0.4 }}>Check Answer</Button>)
            : (<Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: COLORS.primary }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}
        </div>
      </motion.div>
    </section>);
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false);
  const canSubmit = text.trim().length >= 20;
  const handleSubmit = useCallback(() => { if (canSubmit) setSubmitted(true); }, [canSubmit]);
  const handleSkip = useCallback(() => { setSubmitted(true); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Design a two-way table for a survey you would like to do at school. What two categories would you use?
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary, border: `2px solid ${COLORS.bgElevated}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? COLORS.success : COLORS.textMuted }}>{text.trim().length}/20 characters minimum</p>
        </>) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: COLORS.bgSurface }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: COLORS.success }}>Great thinking!</p>
          <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>Reflecting on concepts deepens your understanding.</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: COLORS.primary }}>Complete Lesson</Button></motion.div>)}
      </div>
    </section>);
}

export function TwoWayTablesLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0); const stage = STAGES[stageIdx] ?? ("hook" as Stage);
  const advanceStage = useCallback(() => { setStageIdx((i) => { const next = i + 1; if (next >= STAGES.length) { onComplete?.(); return i; } return next; }); }, [onComplete]);
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2" style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>SP-5.7 Two-Way Tables</span>
          <span className="text-xs tabular-nums" style={{ color: "#475569" }}>{stageIdx + 1}/{STAGES.length}</span>
        </div><ProgressBar value={stageProgress} variant="xp" size="sm" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex flex-1 flex-col" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={SPRING_GENTLE}>
          {stage === "hook" && <HookStage onComplete={advanceStage} />}{stage === "spatial" && <SpatialStage onComplete={advanceStage} />}
          {stage === "discovery" && <DiscoveryStage onComplete={advanceStage} />}{stage === "symbol" && <SymbolBridgeStage onComplete={advanceStage} />}
          {stage === "realWorld" && <RealWorldStage onComplete={advanceStage} />}{stage === "practice" && <PracticeStage onComplete={advanceStage} />}
          {stage === "reflection" && <ReflectionStage onComplete={handleReflectionComplete} />}
        </motion.div>
      </AnimatePresence>
    </div>);
}
