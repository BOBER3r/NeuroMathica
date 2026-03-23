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
  point: colors.functional.info,
  line: colors.accent.emerald,
  predict: "#f59e0b",
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const ELEVATED = colors.bg.surface;
const BORDER = colors.bg.elevated;
const TEXT = colors.text.primary;
const MUTED = colors.text.muted;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PracticeProblem { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "A line of best fit...",
    options: ["Passes through every data point", "Approximates the trend in scattered data", "Is always horizontal", "Only works with two points"],
    correctAnswer: "Approximates the trend in scattered data", feedback: "The line of best fit shows the general direction (trend) of the data, even though most points are not on it." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "A scatter plot with an upward trend has...",
    options: ["Positive correlation", "Negative correlation", "No correlation", "Perfect correlation"],
    correctAnswer: "Positive correlation", feedback: "Points going up from left to right = positive correlation = positive slope." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "The line of best fit minimizes...",
    options: ["The number of points", "The distances from points to the line", "The number of x-values", "The slope"],
    correctAnswer: "The distances from points to the line", feedback: "The best fit line minimizes the sum of squared vertical distances from all points to the line." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "A scatter plot shows study hours vs test scores with trend line y = 8x + 40. Predict the score for 5 hours of study.",
    options: ["80", "45", "48", "85"],
    correctAnswer: "80", feedback: "y = 8(5) + 40 = 40 + 40 = 80." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "The trend line equation is y = \u22122x + 50. What is the slope?",
    options: ["\u22122", "50", "2", "\u221250"],
    correctAnswer: "\u22122", feedback: "In y = mx + b, m is the slope. Here m = \u22122 (negative means downward trend)." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "When is a prediction from a trend line most reliable?",
    options: ["When extrapolating far beyond the data", "When interpolating within the data range", "When there is no correlation", "Always"],
    correctAnswer: "When interpolating within the data range", feedback: "Predictions within the data range (interpolation) are most reliable. Extrapolation gets risky." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "A line of best fit has slope 0. This means...",
    options: ["Strong positive correlation", "Strong negative correlation", "No linear correlation", "Perfect correlation"],
    correctAnswer: "No linear correlation", feedback: "Slope 0 = horizontal line = no linear relationship between x and y." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "If a scatter plot has a curved pattern, should you use a straight trend line?",
    options: ["Yes, always use a line", "No, a curve would fit better", "Only if the curve goes up", "Lines and curves are the same"],
    correctAnswer: "No, a curve would fit better", feedback: "A straight line only works for linear trends. Curved data needs a curved model." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "An outlier in a scatter plot...",
    options: ["Should always be removed", "Can pull the line of best fit toward it", "Has no effect on the line", "Is always an error"],
    correctAnswer: "Can pull the line of best fit toward it", feedback: "Outliers can shift the trend line. Investigate why they exist before deciding what to do." },
];

const SCATTER_DATA: [number, number][] = [[1, 3], [2, 5], [3, 4], [4, 7], [5, 8], [6, 7], [7, 10], [8, 9], [9, 12], [10, 11]];

/* ------------------------------------------------------------------ */
/*  Stage components                                                   */
/* ------------------------------------------------------------------ */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/LineOfBestFitHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500)); t.push(setTimeout(() => setPhase(3), 4500)); t.push(setTimeout(() => setPhase(4), 6000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  const svgW = 320; const svgH = 220; const ml = 40; const mb = 30; const pw = 250; const ph = 160;
  const toX = (v: number) => ml + (v / 11) * pw;
  const toY = (v: number) => svgH - mb - (v / 13) * ph;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Scatter plot with trend line">
        <line x1={ml} y1={svgH - mb} x2={ml + pw} y2={svgH - mb} stroke={MUTED} strokeWidth={1} />
        <line x1={ml} y1={svgH - mb} x2={ml} y2={svgH - mb - ph} stroke={MUTED} strokeWidth={1} />
        {phase >= 1 && SCATTER_DATA.map(([x, y], i) => (
          <motion.circle key={i} cx={toX(x)} cy={toY(y)} r={4} fill={THEME.point}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08, ...SPRING }} />
        ))}
        {phase >= 2 && (<motion.line x1={toX(0)} y1={toY(2)} x2={toX(11)} y2={toY(12.5)}
          stroke={THEME.line} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }} />)}
        {phase >= 3 && (<motion.text x={svgW / 2} y={20} textAnchor={"middle" as const} fill={TEXT} fontSize={15} fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>One line to tell the story</motion.text>)}
      </svg>
      <AnimatePresence>{phase >= 3 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mt-4 font-medium text-nm-text-secondary" style={{ fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        The line of best fit captures the trend hidden in scattered data.</motion.p>)}</AnimatePresence>
      {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>);
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(2);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const svgW = 280; const svgH = 250; const ml = 40; const mb = 30; const pw = 220; const ph = 190;
  const toX = (v: number) => ml + (v / 11) * pw;
  const toY = (v: number) => svgH - mb - (v / 14) * ph;
  const lineY = (x: number) => slope * x + intercept;

  const residuals = SCATTER_DATA.reduce((sum, [x, y]) => sum + Math.abs(y - lineY(x)), 0);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium text-nm-text-secondary" style={{ fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust slope and intercept to fit the data
      </p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Interactive trend line">
        <line x1={ml} y1={svgH - mb} x2={ml + pw} y2={svgH - mb} stroke={MUTED} strokeWidth={1} />
        <line x1={ml} y1={svgH - mb} x2={ml} y2={svgH - mb - ph} stroke={MUTED} strokeWidth={1} />
        {SCATTER_DATA.map(([x, y], i) => (<circle key={i} cx={toX(x)} cy={toY(y)} r={4} fill={THEME.point} />))}
        <line x1={toX(0)} y1={toY(lineY(0))} x2={toX(11)} y2={toY(lineY(11))} stroke={THEME.line} strokeWidth={2.5} />
        {SCATTER_DATA.map(([x, y], i) => (<line key={`r${i}`} x1={toX(x)} y1={toY(y)} x2={toX(x)} y2={toY(lineY(x))}
          stroke={THEME.predict} strokeWidth={1} strokeDasharray="2,2" opacity={0.6} />))}
      </svg>
      <div className="w-full max-w-xs space-y-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-xs w-16" style={{ color: MUTED }}>Slope</span>
          <button onClick={() => { setSlope(Math.round((slope - 0.5) * 10) / 10); interact(); }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold bg-nm-bg-surface text-nm-text-primary">{"\u2212"}</button>
          <span className="font-mono font-bold tabular-nums flex-1 text-center text-nm-text-primary">{slope}</span>
          <button onClick={() => { setSlope(Math.round((slope + 0.5) * 10) / 10); interact(); }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold bg-nm-bg-surface text-nm-text-primary">+</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs w-16" style={{ color: MUTED }}>Intercept</span>
          <button onClick={() => { setIntercept(intercept - 1); interact(); }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold bg-nm-bg-surface text-nm-text-primary">{"\u2212"}</button>
          <span className="font-mono font-bold tabular-nums flex-1 text-center text-nm-text-primary">{intercept}</span>
          <button onClick={() => { setIntercept(intercept + 1); interact(); }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold bg-nm-bg-surface text-nm-text-primary">+</button>
        </div>
      </div>
      <div className="rounded-xl p-3 w-full max-w-xs bg-nm-bg-surface">
        <p className="font-mono text-sm text-center text-nm-text-primary">
          y = {slope}x + {intercept} | Total error: <span style={{ color: residuals < 10 ? SUCCESS : THEME.predict }}>{Math.round(residuals * 10) / 10}</span>
        </p>
      </div>
      <div className="mt-3"><InteractionDots count={Math.min(interactions, 8)} total={8} activeColor={PRIMARY} /></div>
      {canContinue && <ContinueButton onClick={onContinue} />}
    </section>);
}

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "The best fit line minimizes the total distance from all points to the line. Less error = better fit!", btn: "I see it!" },
    { text: "The slope tells you the rate of change: for each unit increase in x, y changes by the slope amount.", btn: "I see it!" },
    { text: "Interpolation (within data) is more reliable than extrapolation (beyond data). Don't predict too far!", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox="0 0 260 80" className="w-full max-w-[260px] mb-6">
        <motion.text x={130} y={40} textAnchor={"middle" as const} fill={THEME.line} fontSize={14} fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {step === 0 ? "Minimize error!" : step === 1 ? "Slope = rate of change" : "Interpolate, don't extrapolate"}
        </motion.text>
      </svg>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4 text-nm-text-primary" style={{ fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
          className="min-w-[140px]" style={{ backgroundColor: PRIMARY }}>{current.btn}</Button>
      </motion.div>)}
    </section>);
}

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500)); t.push(setTimeout(() => setRevealed(2), 3000)); t.push(setTimeout(() => setRevealed(3), 4500));
    return () => t.forEach(clearTimeout); }, []);
  const notations = [
    { formula: "y = mx + b", desc: "Trend line equation: m = slope, b = y-intercept", color: THEME.line },
    { formula: "r (correlation coefficient)", desc: "Measures strength: r near \u00B11 is strong, near 0 is weak", color: THEME.point },
    { formula: "Residual = actual \u2212 predicted", desc: "How far each point is from the line", color: THEME.predict },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8 text-nm-text-primary" style={{ fontSize: "clamp(20px, 5vw, 28px)" }}>Trend Line Concepts</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4 bg-nm-bg-surface"
            style={{ borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold font-mono text-base" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1 text-nm-text-muted">{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
    </section>);
}

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F4C8}", title: "Stock Prices", desc: "Trend lines help predict future prices from historical data.", math: "Extrapolation" },
    { icon: "\u{1F3C3}", title: "Athletic Performance", desc: "Track training hours vs race times to optimize preparation.", math: "Negative correlation" },
    { icon: "\u{1F321}\uFE0F", title: "Climate Data", desc: "Temperature trends over decades show global warming patterns.", math: "Long-term trend" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6 text-nm-text-primary" style={{ fontSize: "clamp(20px, 5vw, 28px)" }}>Real World Connections</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4 flex gap-3 items-start bg-nm-bg-surface">
          <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
          <div><p className="font-semibold text-nm-text-primary">{s.title}</p>
            <p className="text-sm text-nm-text-secondary">{s.desc}</p>
            <p className="text-xs font-mono mt-1" style={{ color: PRIMARY }}>{s.math}</p></div>
        </motion.div>))}
      </div>
      <ContinueButton onClick={onContinue} delay={0.3} />
    </section>);
}

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentQ, setCurrentQ] = useState(0); const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!selected) return; setSubmitted(true);
    setResults((p) => { const n = [...p]; n[currentQ] = selected === problem.correctAnswer; return n; }); }, [selected, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onContinue(); return; } setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false); }, [isLast, onContinue]);
  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = BORDER;
          if (r === true) bg = SUCCESS; else if (r === false) bg = ERROR;
          return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${PRIMARY}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide text-nm-text-muted">{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6 text-nm-text-primary" style={{ fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">{problem.options.map((opt) => { let bg: string = ELEVATED; let border: string = BORDER;
          if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; } }
          else if (opt === selected) { bg = "#8b5cf633"; border = PRIMARY; }
          return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
            className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] text-nm-text-primary"
            style={{ backgroundColor: bg, border: `2px solid ${border}` }}>{opt}</button>); })}</div>
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? SUCCESS : ERROR}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? SUCCESS : ERROR }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm text-nm-text-secondary">{problem.feedback}</p>
          </motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full" style={{ backgroundColor: PRIMARY, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>)
            : (<Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: PRIMARY }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}
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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2 text-nm-text-primary" style={{ fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6 text-nm-text-secondary" style={{ fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why is it dangerous to extrapolate too far from your data? Give an example.
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px] bg-nm-bg-surface text-nm-text-primary"
            style={{ border: `2px solid ${BORDER}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? SUCCESS : MUTED }}>{text.trim().length}/20 characters minimum</p>
        </>) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center bg-nm-bg-surface">
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p>
          <p className="text-sm mt-1 text-nm-text-secondary">Reflecting on concepts deepens your understanding.</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px] text-nm-text-muted" style={{ fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>Complete Lesson</Button></motion.div>)}
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function LineOfBestFitLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="SP-5.6a Line of Best Fit" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
