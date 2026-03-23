"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

const COLORS = {
  correlation: "#60a5fa", causation: "#f87171", sample: "#34d399", margin: "#f59e0b",
  bgPrimary: "#0f172a", bgSurface: "#1e293b", bgElevated: "#334155",
  textPrimary: "#f8fafc", textSecondary: "#e2e8f0", textMuted: "#94a3b8",
  success: "#34d399", error: "#f87171", primary: "#8b5cf6",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface PracticeProblem { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Correlation means...",
    options: ["One variable causes another", "Two variables tend to change together", "The data is always linear", "The sample is biased"],
    correctAnswer: "Two variables tend to change together", feedback: "Correlation means two variables have a statistical relationship \u2014 they tend to move together." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "\"Correlation does not imply causation\" means...",
    options: ["Variables never cause each other", "Just because two things are correlated doesn't mean one causes the other", "Causation implies correlation", "All correlations are false"],
    correctAnswer: "Just because two things are correlated doesn't mean one causes the other",
    feedback: "Ice cream sales and drowning rates are correlated (hot weather causes both), but ice cream doesn't cause drowning!" },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "Margin of error tells you...",
    options: ["The exact population value", "How much a sample estimate might differ from the true value", "The sample size", "The number of errors in data collection"],
    correctAnswer: "How much a sample estimate might differ from the true value",
    feedback: "Margin of error gives a range: the true value is likely within estimate \u00B1 margin." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "A survey says 60% prefer vanilla, margin of error \u00B13%. What range contains the true value?",
    options: ["57% to 63%", "60% to 63%", "57% to 60%", "56% to 64%"],
    correctAnswer: "57% to 63%", feedback: "60% \u00B1 3% = 57% to 63%." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Ice cream sales and shark attacks are correlated. The lurking variable is...",
    options: ["Ice cream flavor", "Hot weather / summer season", "Shark species", "Population size"],
    correctAnswer: "Hot weather / summer season", feedback: "Hot weather drives both more ice cream consumption AND more swimming (hence more shark encounters)." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "To establish causation (not just correlation), you need...",
    options: ["A bigger sample", "A controlled experiment", "More variables", "A prettier graph"],
    correctAnswer: "A controlled experiment", feedback: "Only controlled experiments with random assignment can establish causation." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "A larger sample size typically...",
    options: ["Increases margin of error", "Decreases margin of error", "Has no effect on margin of error", "Eliminates all bias"],
    correctAnswer: "Decreases margin of error", feedback: "Larger samples give more precise estimates, reducing the margin of error." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "A convenience sample (surveying your friends) is problematic because...",
    options: ["It takes too long", "It may not represent the population", "Friends always lie", "The sample is too large"],
    correctAnswer: "It may not represent the population", feedback: "Your friends are likely similar to you, so the sample is biased and may not represent everyone." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Which conclusion is strongest?",
    options: [
      "The data shows a correlation between A and B",
      "The data proves A causes B",
      "A randomized experiment showed A causes B",
      "Many people believe A causes B",
    ],
    correctAnswer: "A randomized experiment showed A causes B",
    feedback: "Randomized experiments are the gold standard for proving causation." },
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
  return <VideoHook src="/videos/StatisticalReasoningHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 3000)); t.push(setTimeout(() => setPhase(3), 5000)); t.push(setTimeout(() => setPhase(4), 6500));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="w-full max-w-md space-y-4">
        {phase >= 1 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
          className="rounded-xl p-4" style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${COLORS.correlation}` }}>
          <p className="font-bold" style={{ color: COLORS.correlation }}>Headline:</p>
          <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
            &quot;Cities with more firefighters have more fires!&quot;
          </p>
        </motion.div>)}
        {phase >= 2 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
          className="rounded-xl p-4" style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${COLORS.causation}` }}>
          <p className="font-bold" style={{ color: COLORS.causation }}>Does this mean firefighters cause fires?</p>
          <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
            Of course not! Bigger cities have both more fires AND more firefighters.
          </p>
        </motion.div>)}
        {phase >= 3 && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center font-bold text-lg" style={{ color: COLORS.primary }}>
          Correlation {"\u2260"} Causation
        </motion.p>)}
      </div>
      {phase >= 4 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>);
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [scenario, setScenario] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const scenarios = useMemo(() => [
    { claim: "People who eat breakfast get better grades.", corr: true, cause: false, lurking: "Wealthier families can afford breakfast AND tutoring." },
    { claim: "Smoking causes lung cancer.", corr: true, cause: true, lurking: "Confirmed by randomized studies (animal) and decades of evidence." },
    { claim: "Countries with more chocolate consumption have more Nobel Prize winners.", corr: true, cause: false, lurking: "Wealthier countries have both more chocolate and better universities." },
    { claim: "Exercising regularly lowers heart disease risk.", corr: true, cause: true, lurking: "Confirmed by controlled clinical trials." },
  ], []);

  const current = scenarios[scenario]!;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-3 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        For each claim, decide: correlation, causation, or lurking variable?
      </p>
      <motion.div key={scenario} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
        className="rounded-xl p-4 w-full max-w-md" style={{ backgroundColor: COLORS.bgSurface }}>
        <p className="font-medium mb-3" style={{ color: COLORS.textPrimary }}>&quot;{current.claim}&quot;</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span style={{ color: COLORS.textMuted }}>Correlated?</span>
          <span className="font-bold" style={{ color: current.corr ? COLORS.success : COLORS.error }}>{current.corr ? "Yes" : "No"}</span>
          <span style={{ color: COLORS.textMuted }}>Causation?</span>
          <span className="font-bold" style={{ color: current.cause ? COLORS.success : COLORS.causation }}>{current.cause ? "Yes (proven)" : "Not proven"}</span>
          <span className="col-span-2 mt-2 text-xs" style={{ color: COLORS.margin }}>
            {current.lurking}
          </span>
        </div>
      </motion.div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => { if (scenario > 0) { setScenario(scenario - 1); interact(); } }}
          className="rounded-lg px-4 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>{"<"} Prev</button>
        <button onClick={() => { if (scenario < scenarios.length - 1) { setScenario(scenario + 1); interact(); } }}
          className="rounded-lg px-4 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
          style={{ backgroundColor: COLORS.primary, color: COLORS.textPrimary }}>Next {">"}</button>
      </div>

      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>);
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Correlation means two things tend to happen together. But there might be a hidden \"lurking variable\" causing both!", btn: "I see it!" },
    { text: "Only controlled experiments can prove causation. Observational studies can only show correlation.", btn: "I see it!" },
    { text: "Margin of error shrinks with larger samples. A poll of 1000 people is more precise than a poll of 50.", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 260 80" className="w-full max-w-[260px] mb-6">
        <motion.text x={130} y={40} textAnchor={"middle" as const} fill={step === 0 ? COLORS.correlation : step === 1 ? COLORS.causation : COLORS.margin} fontSize={14} fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {step === 0 ? "Lurking variables hide everywhere" : step === 1 ? "Experiment > Observation" : "Bigger sample = More precise"}
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
    { formula: "Correlation \u2260 Causation", desc: "Two variables moving together doesn't prove one causes the other", color: COLORS.correlation },
    { formula: "Estimate \u00B1 Margin of Error", desc: "The confidence interval: true value likely falls in this range", color: COLORS.margin },
    { formula: "Lurking Variable", desc: "A hidden variable that influences both correlated variables", color: COLORS.sample },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Key Concepts</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4"
            style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold text-base" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>);
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F4F0}", title: "News Headlines", desc: "\"Study shows X linked to Y\" \u2014 linked means correlation, not causation. Be a critical reader!", math: "Correlation" },
    { icon: "\u{1F5F3}\uFE0F", title: "Election Polls", desc: "\"Candidate A leads 52% \u00B1 3%\" \u2014 the margin of error means the race could be 49-55%.", math: "Margin of error" },
    { icon: "\u{1F52C}", title: "Medical Research", desc: "Clinical trials randomly assign treatments to prove causation, not just correlation.", math: "Controlled experiment" },
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
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!selected) return; setSubmitted(true);
    setResults((p) => { const n = [...p]; n[currentQ] = selected === problem.correctAnswer; return n; }); }, [selected, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onComplete(); return; } setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false); }, [isLast, onComplete]);
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
        <div className="space-y-2 w-full">{problem.options.map((opt) => { let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
          if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; } }
          else if (opt === selected) { bg = "#8b5cf633"; border = COLORS.primary; }
          return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
            className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
            style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>{opt}</button>); })}</div>
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? COLORS.success : COLORS.error }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>{problem.feedback}</p>
          </motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>)
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
          Find a news headline that confuses correlation with causation. What might the lurking variable be?
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

export function StatisticalReasoningLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0); const stage = STAGES[stageIdx] ?? ("hook" as Stage);
  const advanceStage = useCallback(() => { setStageIdx((i) => { const next = i + 1; if (next >= STAGES.length) { onComplete?.(); return i; } return next; }); }, [onComplete]);
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2" style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>SP-5.8 Statistical Reasoning</span>
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
