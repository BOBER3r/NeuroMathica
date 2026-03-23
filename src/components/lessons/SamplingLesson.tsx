"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * SP-5.5 Sampling — Grade 7
 * Prerequisites: SP-5.4 (Data Displays)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: You can learn about a large population by studying a
 *   small, representative sample. Random sampling avoids bias. Biased
 *   samples give misleading conclusions.
 *
 * Stage flow:
 *  1. Hook — animated scenario: surveying a school of 1000 by asking 50 random students
 *  2. Spatial — interactive: tap to draw random samples, see how results vary but cluster
 *  3. Discovery — guided prompts about random vs biased, population vs sample
 *  4. Symbol Bridge — population/sample notation, inference rules
 *  5. Real World — election polls, quality control, medical trials
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const BG = "#0f172a";
const SURFACE = "#1e293b";
const TEXT = "#f8fafc";
const MUTED = "#94a3b8";
const BORDER = "#475569";
const PRIMARY = "#818cf8";
const SUCCESS = "#34d399";
const ERROR = "#f87171";
const POP_COLOR = "#60a5fa";
const SAMPLE_COLOR = "#a78bfa";
const BIAS_COLOR = "#f472b6";
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (<div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-2 py-3" style={{ background: BG }}>{Array.from({ length: total }, (_, i) => (<div key={i} className="h-2 w-2 rounded-full transition-all duration-300" style={{ background: i <= current ? PRIMARY : BORDER, transform: i === current ? "scale(1.4)" : "scale(1)" }} />))}</div>);
}
function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5, ease: "easeOut" }} onClick={onClick} className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors hover:brightness-110 active:scale-[0.97]" style={{ background: PRIMARY, minHeight: 48 }} aria-label={label}>{label}</motion.button>);
}
function StageWrapper({ children }: { children: ReactNode }) {
  return (<motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="flex min-h-dvh flex-col items-center justify-center px-4 py-12" style={{ background: BG }}>{children}</motion.div>);
}

function simpleRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

/* ---- Hook ---- */
function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/SamplingHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t = [setTimeout(() => setPhase(1), 600), setTimeout(() => setPhase(2), 1800), setTimeout(() => setPhase(3), 3200), setTimeout(() => setPhase(4), 4400),
    // Failsafe: guarantee Continue button within 4s
    setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000)]; return () => t.forEach(clearTimeout); }, []);

  const dots = useMemo(() => {
    const rand = simpleRandom(42);
    return Array.from({ length: 100 }, (_, i) => ({ x: 30 + rand() * 340, y: 30 + rand() * 200, sampled: i < 5 }));
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold" style={{ color: TEXT }}>How can you learn about 1,000 students without asking every one?</motion.h2>
        <svg viewBox="0 0 400 280" className="w-full max-w-md" aria-label="School population with sampled students highlighted">
          {phase >= 1 && dots.map((d, i) => (
            <motion.circle key={i} cx={d.x} cy={d.y} r={4} fill={phase >= 2 && d.sampled ? SAMPLE_COLOR : `${POP_COLOR}40`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: phase >= 2 && d.sampled ? 2 : 1 }} transition={{ delay: i * 0.008, ...SPRING }} />
          ))}
          {phase >= 2 && (<g><circle cx={30} cy={260} r={4} fill={`${POP_COLOR}40`} /><text x={40} y={264} fill={MUTED} fontSize={11}>Population (1,000)</text><circle cx={200} cy={260} r={6} fill={SAMPLE_COLOR} /><text x={212} y={264} fill={SAMPLE_COLOR} fontSize={11}>Sample (50)</text></g>)}
        </svg>
        {phase >= 3 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-sm" style={{ color: MUTED }}>Ask 50 random students their favorite lunch. If 60% say pizza, you can predict about 60% of all 1,000 would too!</motion.p>)}
        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ---- Spatial ---- */
function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const populationProp = 0.60;
  const sampleSize = 20;
  const [samples, setSamples] = useState<number[]>([]);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 5;

  const drawSample = useCallback(() => {
    let yesCount = 0;
    for (let i = 0; i < sampleSize; i++) { if (Math.random() < populationProp) yesCount++; }
    const pct = Math.round((yesCount / sampleSize) * 100);
    setSamples((prev) => [...prev, pct]);
    setInteractions((c) => c + 1);
  }, []);

  const avg = samples.length > 0 ? Math.round(samples.reduce((a, b) => a + b, 0) / samples.length) : 0;
  const barMargin = 40; const barAreaW = 320; const barAreaH = 120;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(16px,4vw,24px)] font-bold" style={{ color: TEXT }}>Draw random samples and see how they compare</h2>
        <p className="text-xs" style={{ color: MUTED }}>Population truth: 60% prefer pizza. Each sample has {sampleSize} people.</p>
        <svg viewBox={`0 0 ${barMargin * 2 + barAreaW} ${barMargin + barAreaH + 30}`} className="w-full max-w-md" aria-label="Bar chart of sample results">
          <line x1={barMargin} y1={barMargin + barAreaH} x2={barMargin + barAreaW} y2={barMargin + barAreaH} stroke={MUTED} strokeWidth={1} />
          <line x1={barMargin} y1={barMargin + barAreaH * (1 - 0.6)} x2={barMargin + barAreaW} y2={barMargin + barAreaH * (1 - 0.6)} stroke={SUCCESS} strokeWidth={1} strokeDasharray="6 3" />
          <text x={barMargin + barAreaW + 5} y={barMargin + barAreaH * (1 - 0.6) + 4} fill={SUCCESS} fontSize={10}>60%</text>
          {samples.map((pct, i) => {
            const maxBars = 15;
            const visibleIdx = i >= samples.length - maxBars ? i - (samples.length - maxBars) : -1;
            if (visibleIdx < 0) return null;
            const bw = Math.min(20, barAreaW / maxBars - 2);
            const bx = barMargin + visibleIdx * (bw + 2);
            const bh = (pct / 100) * barAreaH;
            return (<motion.rect key={i} x={bx} y={barMargin + barAreaH - bh} width={bw} height={bh} rx={3} fill={SAMPLE_COLOR} initial={{ height: 0, y: barMargin + barAreaH }} animate={{ height: bh, y: barMargin + barAreaH - bh }} transition={SPRING} />);
          })}
          <text x={barMargin} y={barMargin + barAreaH + 18} fill={MUTED} fontSize={10}>Samples drawn: {samples.length}</text>
        </svg>
        <div className="flex flex-col items-center gap-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={drawSample} data-interactive="true" className="flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white" style={{ background: SAMPLE_COLOR, minHeight: 48, minWidth: 160 }} aria-label="Draw a random sample">Draw Sample</motion.button>
          {samples.length > 0 && (
            <div className="rounded-xl px-6 py-2 text-center" style={{ background: SURFACE }}>
              <p className="text-sm font-bold" style={{ color: TEXT }}>
                {"Last sample: "}<span style={{ color: SAMPLE_COLOR }}>{samples[samples.length - 1]}%</span>{" | Average: "}<span style={{ color: SUCCESS }}>{avg}%</span>{" | True: "}<span style={{ color: SUCCESS }}>60%</span>
              </p>
            </div>
          )}
        </div>
        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ---- Discovery ---- */
function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "Each sample gave a slightly different result, but they all clustered around the true 60%. That is the power of random sampling \u2014 it works even with small groups!", button: "I see it!" },
    { text: "A biased sample picks people who are not representative. Asking only students in the lunch line about food preferences would over-represent hungry students!", button: "I see it!" },
    { text: "Population = the entire group you want to learn about. Sample = the smaller group you actually measure. Random selection keeps the sample fair.", button: "Got it!" },
  ], []);
  const [promptIdx, setPromptIdx] = useState(0);
  const handleAck = useCallback(() => { if (promptIdx < prompts.length - 1) { setPromptIdx((i) => i + 1); } else { onContinue(); } }, [promptIdx, prompts.length, onContinue]);
  const current = prompts[promptIdx]!;
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">{prompts.map((_, i) => (<div key={i} className="h-2 w-8 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />))}</div>
        <AnimatePresence mode="wait"><motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl p-6 text-center" style={{ background: SURFACE }}><p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>{current.text}</p></motion.div></AnimatePresence>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleAck} className="rounded-xl px-8 py-3 text-base font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label={current.button}>{current.button}</motion.button>
      </div>
    </StageWrapper>
  );
}

/* ---- Symbol Bridge ---- */
function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = [setTimeout(() => setStep(1), 1200), setTimeout(() => setStep(2), 2400), setTimeout(() => setStep(3), 3800)]; return () => t.forEach(clearTimeout); }, []);
  const items = [
    { label: "Population", text: "The entire group (N = all)", color: POP_COLOR },
    { label: "Sample", text: "A subset you measure (n < N)", color: SAMPLE_COLOR },
    { label: "Inference", text: "Use sample results to predict population", color: SUCCESS },
  ];
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Sampling Vocabulary</h2>
        <div className="flex flex-col gap-4">
          {items.map((item, i) => i <= step ? (<motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-4" style={{ background: SURFACE }}><p className="text-xs font-semibold uppercase" style={{ color: MUTED }}>{item.label}</p><p className="mt-1 font-mono text-[clamp(14px,3.5vw,20px)] font-bold" style={{ color: item.color }}>{item.text}</p></motion.div>) : null)}
        </div>
        {step >= 3 && (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-2xl border-2 px-6 py-4 text-center" style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}><p className="text-sm font-bold" style={{ color: TEXT }}>Random sample {"\u2192"} Representative {"\u2192"} Valid predictions</p><p className="mt-1 text-sm font-bold" style={{ color: BIAS_COLOR }}>Biased sample {"\u2192"} Not representative {"\u2192"} Misleading!</p></motion.div>)}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ---- Real World ---- */
function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\uD83D\uDDF3\uFE0F", title: "Election Polls", desc: "Pollsters survey about 1,000 random voters to predict the results for millions. The margin of error tells how accurate the estimate is." },
    { icon: "\uD83C\uDFED", title: "Quality Control", desc: "A factory tests 50 random lightbulbs from each batch of 10,000. If 2% are defective in the sample, they estimate 2% of the batch is defective." },
    { icon: "\uD83D\uDC8A", title: "Medical Trials", desc: "New medicines are tested on a random sample of patients. Results from the sample are used to predict how the medicine will work for the whole population." },
  ];
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Sampling in Real Life</h2>
        <div className="flex flex-col gap-4">
          {scenarios.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4" style={{ background: SURFACE }}><div className="flex items-start gap-3"><span className="text-2xl">{s.icon}</span><div><p className="font-semibold" style={{ color: TEXT }}>{s.title}</p><p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p></div></div></motion.div>))}
        </div>
        <ContinueButton onClick={onContinue} />
      </div>
    </StageWrapper>
  );
}

/* ---- Practice ---- */
interface PracticeProblem { id: number; layer: "recall" | "procedure" | "understanding"; question: string; options: string[]; correctIndex: number; feedback: string; }
const PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "recall", question: "What is the difference between a population and a sample?", options: ["A population is a subset of the sample", "A sample is a subset of the population", "They are the same thing", "A sample is always larger"], correctIndex: 1, feedback: "A sample is a smaller group selected FROM the population to represent it." },
  { id: 2, layer: "recall", question: "A random sample means:", options: ["You pick whoever you want", "Every member has an equal chance of being selected", "You pick the first people you see", "You only pick people who volunteer"], correctIndex: 1, feedback: "In a random sample, every member of the population has an equal chance of being chosen, reducing bias." },
  { id: 3, layer: "recall", question: "A biased sample is one that:", options: ["Is randomly selected", "Represents the whole population fairly", "Systematically favors certain outcomes", "Is very large"], correctIndex: 2, feedback: "A biased sample over-represents or under-represents certain groups, making conclusions unreliable." },
  { id: 4, layer: "procedure", question: "You want to survey middle school students about recess. Which method is most random?", options: ["Ask students at the basketball court", "Assign each student a number and use a random number generator", "Ask your friends", "Survey the chess club"], correctIndex: 1, feedback: "Using a random number generator gives every student an equal chance of being selected." },
  { id: 5, layer: "procedure", question: "In a sample of 40 students, 30 prefer dogs over cats. Predict how many out of 200 students prefer dogs.", options: ["150", "120", "75", "160"], correctIndex: 0, feedback: "30/40 = 75% prefer dogs. 75% of 200 = 150 students." },
  { id: 6, layer: "procedure", question: "A factory samples 100 items and finds 4 defective. In a batch of 5,000, how many defective items do you predict?", options: ["200", "400", "100", "40"], correctIndex: 0, feedback: "4/100 = 4% defective. 4% of 5,000 = 200 predicted defective items." },
  { id: 7, layer: "understanding", question: "A phone survey about internet usage calls only landline numbers. This sample is likely:", options: ["Random and fair", "Biased toward older people", "Too large", "Perfectly representative"], correctIndex: 1, feedback: "Younger people are less likely to have landlines, so this sample is biased toward older demographics." },
  { id: 8, layer: "understanding", question: "Why does increasing sample size generally improve predictions?", options: ["More data reduces the effect of random variation", "Larger samples are always biased", "It makes the survey cheaper", "Smaller samples are more accurate"], correctIndex: 0, feedback: "Larger samples reduce the impact of unusual individual responses, making the results more stable and accurate." },
  { id: 9, layer: "understanding", question: "Two random samples of 50 students give 58% and 64% for pizza preference. What should you conclude?", options: ["The true value is likely between 58% and 64%", "The survey is broken", "Only the larger result counts", "You need to survey all students"], correctIndex: 0, feedback: "Random samples vary! Both results suggest the true value is around 60%. Multiple samples help narrow the estimate." },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = done ? null : (PROBLEMS[currentIdx] ?? null);
  const handleSelect = useCallback((optIdx: number) => { if (answered || !problem) return; setSelected(optIdx); setAnswered(true); if (optIdx === problem.correctIndex) setScore((s) => s + 1); }, [answered, problem]);
  const handleNext = useCallback(() => { setSelected(null); setAnswered(false); setCurrentIdx((i) => i + 1); }, []);

  if (done || !problem) {
    return (<StageWrapper><div className="flex flex-col items-center gap-4"><h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: TEXT }}>Practice Complete!</h2><p className="text-lg" style={{ color: MUTED }}>You got {score} out of {PROBLEMS.length} correct.</p><ContinueButton onClick={onContinue} label="Continue" /></div></StageWrapper>);
  }
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: MUTED }}>Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})</p>
        <div className="w-full rounded-xl p-6" style={{ background: SURFACE }}><p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: TEXT }}>{problem.question}</p></div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex; const isSelected = i === selected;
            let bg: string = SURFACE; let border: string = BORDER;
            if (answered) { if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; } else if (isSelected) { bg = `${ERROR}20`; border = ERROR; } }
            return (<motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>{opt}{answered && isCorrect && <span className="ml-2" style={{ color: SUCCESS }}>{"  \u2713"}</span>}{answered && isSelected && !isCorrect && <span className="ml-2" style={{ color: ERROR }}>{"  \u2717"}</span>}</motion.button>);
          })}
        </div>
        {answered && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-xl p-4" style={{ background: selected === problem.correctIndex ? `${SUCCESS}15` : `${ERROR}15` }}><p className="text-sm leading-relaxed" style={{ color: TEXT }}>{problem.feedback}</p></motion.div>)}
        {answered && (<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label="Next problem">{"Next \u2192"}</motion.button>)}
      </div>
    </StageWrapper>
  );
}

/* ---- Reflection ---- */
function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback(() => { setSubmitted(true); }, []);
  if (submitted) { return (<StageWrapper><div className="flex flex-col items-center gap-4 text-center"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}><p className="text-4xl">{"\uD83E\uDDE0"}</p><h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2><p className="mt-2 text-sm" style={{ color: MUTED }}>Understanding sampling helps you think critically about data everywhere. +50 XP</p></motion.div><ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} /></div></StageWrapper>); }
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>Give an example of a biased sample and explain why it would lead to wrong conclusions.</p>
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

/* ---- Main ---- */
export function SamplingLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);
  const advance = useCallback(() => { const next = STAGES[stageIdx + 1]; if (next) { setStage(next); } else { onComplete?.(); } }, [stageIdx, onComplete]);
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
