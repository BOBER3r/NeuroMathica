"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/**
 * SP-5.6 Scatter Plots — Grade 8
 * Prerequisites: SP-5.2 (Coordinate Plane)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: Scatter plots reveal relationships between two numerical
 *   variables. Points can show positive correlation (both increase),
 *   negative correlation (one up, other down), or no correlation.
 *   Outliers are points far from the pattern.
 *
 * Stage flow:
 *  1. Hook — animated dots falling into place revealing an upward trend
 *  2. Spatial — interactive: tap to add data points, see correlation update
 *  3. Discovery — guided prompts: positive/negative/no correlation, outliers
 *  4. Symbol Bridge — correlation types, trend line concept
 *  5. Real World — height vs shoe size, study time vs grades, temp vs ice cream
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Lesson-specific semantic colors ── */
const THEME = {
  posColor: colors.accent.emerald,
  negColor: "#f472b6",
  neutralColor: colors.functional.info,
  dotColor: colors.accent.violet,
  outlierColor: colors.accent.amber,
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const MUTED = colors.text.secondary;
const BORDER = colors.bg.elevated;
const PRIMARY = colors.accent.indigo;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12"
    >
      {children}
    </motion.div>
  );
}

/* ---- Hook ---- */
function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/ScatterPlotsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t = [setTimeout(() => setPhase(1), 600), setTimeout(() => setPhase(2), 2500), setTimeout(() => setPhase(3), 3800),
    // Failsafe: guarantee Continue button within 4s
    setTimeout(() => setPhase((p) => Math.max(p, 3)), 4000)]; return () => t.forEach(clearTimeout); }, []);

  const data = useMemo(() => [
    { x: 1, y: 55 }, { x: 1.5, y: 62 }, { x: 2, y: 58 }, { x: 2.5, y: 70 },
    { x: 3, y: 72 }, { x: 3.5, y: 75 }, { x: 4, y: 78 }, { x: 4.5, y: 82 },
    { x: 5, y: 85 }, { x: 5.5, y: 88 }, { x: 6, y: 90 }, { x: 6.5, y: 92 },
  ], []);

  const margin = 50; const w = 380; const h = 280;
  const plotW = w - margin * 2; const plotH = h - margin * 2;
  const toSvgX = (v: number) => margin + ((v - 0) / 7) * plotW;
  const toSvgY = (v: number) => margin + ((100 - v) / 60) * plotH;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold" style={{ color: TEXT }}>Do more study hours mean higher scores?</motion.h2>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md" aria-label="Scatter plot of study hours vs test scores">
          <line x1={margin} y1={h - margin} x2={w - margin} y2={h - margin} stroke={MUTED} strokeWidth={1.5} />
          <line x1={margin} y1={margin} x2={margin} y2={h - margin} stroke={MUTED} strokeWidth={1.5} />
          <text x={w / 2} y={h - 8} textAnchor={"middle" as const} fill={MUTED} fontSize={12}>Hours Studied</text>
          <text x={14} y={h / 2} textAnchor={"middle" as const} fill={MUTED} fontSize={12} transform={`rotate(-90, 14, ${h / 2})`}>Test Score</text>
          {[1, 2, 3, 4, 5, 6].map((t) => (<text key={`xt${t}`} x={toSvgX(t)} y={h - margin + 16} textAnchor={"middle" as const} fill={MUTED} fontSize={10}>{t}</text>))}
          {[50, 60, 70, 80, 90].map((t) => (<text key={`yt${t}`} x={margin - 10} y={toSvgY(t) + 4} textAnchor={"end" as const} fill={MUTED} fontSize={10}>{t}</text>))}
          {phase >= 1 && data.map((d, i) => (<motion.circle key={i} cx={toSvgX(d.x)} cy={toSvgY(d.y)} r={6} fill={THEME.dotColor} initial={{ opacity: 0, cy: margin }} animate={{ opacity: 1, cy: toSvgY(d.y) }} transition={{ delay: i * 0.12, ...SPRING }} />))}
          {phase >= 2 && (<motion.line x1={toSvgX(0.5)} y1={toSvgY(52)} x2={toSvgX(7)} y2={toSvgY(95)} stroke={THEME.posColor} strokeWidth={2} strokeDasharray="8 4" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.6 }} />)}
        </svg>
        {phase >= 2 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-center text-sm" style={{ color: MUTED }}>The dots trend upward: more hours studied correlates with higher scores!</motion.p>)}
        {phase >= 3 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ---- Spatial ---- */
function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([{ x: 2, y: 3 }, { x: 4, y: 5 }, { x: 6, y: 7 }]);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 5;

  const margin = 45; const w = 360; const h = 320;
  const plotW = w - margin * 2; const plotH = h - margin * 2; const gridMax = 10;
  const toSvgX = useCallback((v: number) => margin + (v / gridMax) * plotW, [plotW]);
  const toSvgY = useCallback((v: number) => margin + ((gridMax - v) / gridMax) * plotH, [plotH]);

  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = w / rect.width; const scaleY = h / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    const gx = Math.round(((px - margin) / plotW) * gridMax);
    const gy = Math.round(((margin + plotH - py) / plotH) * gridMax);
    if (gx >= 0 && gx <= gridMax && gy >= 0 && gy <= gridMax) {
      setPoints((prev) => [...prev, { x: gx, y: gy }]);
      setInteractions((c) => c + 1);
    }
  }, [plotW, plotH, w, h]);

  const correlation = useMemo(() => {
    if (points.length < 3) return "insufficient data";
    const n = points.length;
    const sumX = points.reduce((a, p) => a + p.x, 0);
    const sumY = points.reduce((a, p) => a + p.y, 0);
    const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
    const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);
    const sumY2 = points.reduce((a, p) => a + p.y * p.y, 0);
    const num = n * sumXY - sumX * sumY;
    const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    if (den === 0) return "no correlation";
    const r = num / den;
    if (r > 0.5) return "positive";
    if (r < -0.5) return "negative";
    return "weak/none";
  }, [points]);

  const corrColor = correlation === "positive" ? THEME.posColor : correlation === "negative" ? THEME.negColor : THEME.neutralColor;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(16px,4vw,24px)] font-bold" style={{ color: TEXT }}>Tap the graph to add data points</h2>
        <p className="text-xs" style={{ color: MUTED }}>Try creating different patterns: upward trend, downward trend, scattered</p>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md cursor-crosshair" aria-label="Interactive scatter plot" onClick={handleSvgClick} data-interactive="true">
          {Array.from({ length: 11 }, (_, i) => (<g key={i}><line x1={toSvgX(i)} y1={margin} x2={toSvgX(i)} y2={h - margin} stroke={BORDER} strokeWidth={0.3} /><line x1={margin} y1={toSvgY(i)} x2={w - margin} y2={toSvgY(i)} stroke={BORDER} strokeWidth={0.3} />{i % 2 === 0 && (<><text x={toSvgX(i)} y={h - margin + 14} textAnchor={"middle" as const} fill={MUTED} fontSize={10}>{i}</text><text x={margin - 10} y={toSvgY(i) + 4} textAnchor={"end" as const} fill={MUTED} fontSize={10}>{i}</text></>)}</g>))}
          <line x1={margin} y1={h - margin} x2={w - margin} y2={h - margin} stroke={MUTED} strokeWidth={1.5} />
          <line x1={margin} y1={margin} x2={margin} y2={h - margin} stroke={MUTED} strokeWidth={1.5} />
          {points.map((p, i) => (<motion.circle key={i} cx={toSvgX(p.x)} cy={toSvgY(p.y)} r={6} fill={THEME.dotColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} />))}
        </svg>
        <div className="flex gap-3">
          <div className="rounded-xl px-4 py-2 text-center" style={{ background: SURFACE }}>
            <p className="text-xs" style={{ color: MUTED }}>Points: {points.length}</p>
            <p className="text-sm font-bold" style={{ color: corrColor }}>Correlation: {correlation}</p>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setPoints([]); setInteractions((c) => c + 1); }} className="flex items-center justify-center rounded-xl px-4 py-2 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44, minWidth: 44 }} aria-label="Clear all points">Clear</motion.button>
        </div>
        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ---- Discovery ---- */
function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "When both variables increase together (dots go up-right), that is a positive correlation. Example: taller people tend to have bigger shoe sizes.", button: "I see it!" },
    { text: "When one variable increases while the other decreases (dots go down-right), that is a negative correlation. Example: more absences, lower grades.", button: "I see it!" },
    { text: "When there is no pattern \u2014 dots are scattered randomly \u2014 there is no correlation. Example: birthday month vs test score.", button: "I see it!" },
    { text: "An outlier is a point far from the general pattern. It might be an error, or it might represent an unusual case worth investigating!", button: "Got it!" },
  ], []);
  const [promptIdx, setPromptIdx] = useState(0);
  const handleAck = useCallback(() => { if (promptIdx < prompts.length - 1) { setPromptIdx((i) => i + 1); } else { onContinue(); } }, [promptIdx, prompts.length, onContinue]);
  const current = prompts[promptIdx]!;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">{prompts.map((_, i) => (<div key={i} className="h-2 w-6 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />))}</div>
        <AnimatePresence mode="wait"><motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl p-6 text-center" style={{ background: SURFACE }}><p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>{current.text}</p></motion.div></AnimatePresence>
        <svg viewBox="0 0 360 100" className="w-full max-w-sm" aria-label="Three types of correlation">
          {[{ x: 15, y: 80 }, { x: 30, y: 65 }, { x: 50, y: 50 }, { x: 70, y: 35 }, { x: 90, y: 20 }].map((d, i) => (<circle key={`p${i}`} cx={d.x} cy={d.y} r={4} fill={THEME.posColor} />))}
          <text x={55} y={95} textAnchor={"middle" as const} fill={THEME.posColor} fontSize={10} fontWeight="bold">Positive</text>
          {[{ x: 140, y: 20 }, { x: 155, y: 35 }, { x: 175, y: 50 }, { x: 195, y: 65 }, { x: 215, y: 80 }].map((d, i) => (<circle key={`n${i}`} cx={d.x} cy={d.y} r={4} fill={THEME.negColor} />))}
          <text x={175} y={95} textAnchor={"middle" as const} fill={THEME.negColor} fontSize={10} fontWeight="bold">Negative</text>
          {[{ x: 270, y: 40 }, { x: 290, y: 70 }, { x: 310, y: 25 }, { x: 330, y: 60 }, { x: 350, y: 45 }].map((d, i) => (<circle key={`o${i}`} cx={d.x} cy={d.y} r={4} fill={THEME.neutralColor} />))}
          <text x={310} y={95} textAnchor={"middle" as const} fill={THEME.neutralColor} fontSize={10} fontWeight="bold">None</text>
        </svg>
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
    { text: "Positive correlation: as x increases, y increases", color: THEME.posColor },
    { text: "Negative correlation: as x increases, y decreases", color: THEME.negColor },
    { text: "No correlation: x and y have no clear pattern", color: THEME.neutralColor },
  ];
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Types of Correlation</h2>
        <div className="flex flex-col gap-4">
          {items.map((item, i) => i <= step ? (<motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}><p className="text-[clamp(14px,3.5vw,18px)] font-bold" style={{ color: item.color }}>{item.text}</p></motion.div>) : null)}
        </div>
        {step >= 3 && (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-2xl border-2 px-6 py-4 text-center" style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}><p className="text-sm font-bold" style={{ color: THEME.outlierColor }}>Outlier = a data point far from the overall trend</p><p className="mt-1 text-xs" style={{ color: MUTED }}>Correlation {"\u2260"} causation! Two things can be correlated without one causing the other.</p></motion.div>)}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ---- Real World ---- */
function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\uD83D\uDC5F", title: "Height vs Shoe Size", desc: "Taller people tend to have larger feet. A scatter plot shows a positive correlation." },
    { icon: "\uD83D\uDCDA", title: "Study Time vs Grades", desc: "Students who study more generally score higher. Positive correlation \u2014 but some outliers exist!" },
    { icon: "\uD83C\uDF66", title: "Temperature vs Ice Cream Sales", desc: "Hotter days = more ice cream sold. Positive correlation. But temperature does not cause ice cream \u2014 people's desire for cold treats does!" },
  ];
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Scatter Plots in Real Life</h2>
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
  { id: 1, layer: "recall", question: "A scatter plot shows the relationship between:", options: ["One variable over time", "Two numerical variables", "Categories and frequencies", "Parts of a whole"], correctIndex: 1, feedback: "A scatter plot uses two axes to show how two numerical variables relate to each other." },
  { id: 2, layer: "recall", question: "If dots in a scatter plot trend from lower-left to upper-right, the correlation is:", options: ["Positive", "Negative", "None", "Undefined"], correctIndex: 0, feedback: "Lower-left to upper-right means both variables increase together \u2014 that is positive correlation." },
  { id: 3, layer: "recall", question: "An outlier in a scatter plot is:", options: ["The point closest to the center", "A point far from the general pattern", "The first point plotted", "The y-intercept"], correctIndex: 1, feedback: "An outlier is a data point that is significantly different from the other points in the dataset." },
  { id: 4, layer: "procedure", question: "Given data: (1,2), (2,4), (3,5), (4,8), (5,9). What type of correlation?", options: ["Positive", "Negative", "No correlation", "Cannot tell"], correctIndex: 0, feedback: "As x increases (1 to 5), y also increases (2 to 9). This is a positive correlation." },
  { id: 5, layer: "procedure", question: "Plot shows: (1,9), (2,7), (3,6), (4,3), (5,1). What type of correlation?", options: ["Positive", "Negative", "No correlation", "Perfect"], correctIndex: 1, feedback: "As x increases, y decreases. This is a negative correlation." },
  { id: 6, layer: "procedure", question: "Data: (1,5), (2,2), (3,8), (4,1), (5,7). What type of correlation?", options: ["Positive", "Negative", "No correlation", "Positive then negative"], correctIndex: 2, feedback: "The y-values bounce around with no clear increasing or decreasing pattern. This is no correlation." },
  { id: 7, layer: "understanding", question: "Ice cream sales and drowning incidents both increase in summer. Does ice cream cause drowning?", options: ["Yes, the data proves it", "No \u2014 correlation does not mean causation", "Only if the correlation is strong", "Yes, if there are no outliers"], correctIndex: 1, feedback: "Both are caused by a third variable (hot weather). Correlation does not prove that one thing causes another!" },
  { id: 8, layer: "understanding", question: "Adding one outlier far from the trend would make the correlation appear:", options: ["Weaker", "Stronger", "Exactly the same", "Undefined"], correctIndex: 0, feedback: "An outlier far from the pattern weakens the apparent correlation because it disrupts the trend." },
  { id: 9, layer: "understanding", question: "A scatter plot shows no correlation between shoe size and math scores. This means:", options: ["Shoe size has no predictable relationship with math scores", "Everyone has the same shoe size", "Everyone has the same math score", "The data is wrong"], correctIndex: 0, feedback: "No correlation means knowing one variable tells you nothing about the other. They are unrelated!" },
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
  if (submitted) { return (<StageWrapper><div className="flex flex-col items-center gap-4 text-center"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}><p className="text-4xl">{"\uD83E\uDDE0"}</p><h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2><p className="mt-2 text-sm" style={{ color: MUTED }}>Scatter plots are a powerful tool for seeing patterns in data. +50 XP</p></motion.div><ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} /></div></StageWrapper>); }
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>Why is it important to remember that correlation does not mean causation? Give an example.</p>
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
export function ScatterPlotsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="SP-5.6 Scatter Plots" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
