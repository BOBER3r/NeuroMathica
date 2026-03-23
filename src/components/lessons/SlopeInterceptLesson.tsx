"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * AL-3.8b Slope-Intercept Form — Grade 8
 * Prerequisites: AL-3.8a (Slope)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: y = mx + b packs two pieces of info: m (slope) and
 *   b (y-intercept). From these two values you can graph any line,
 *   and from any line you can write its equation.
 *
 * Stage flow:
 *  1. Hook — animated line building from y-intercept using slope steps
 *  2. Spatial — selectors for m and b; line updates in real time
 *  3. Discovery — guided prompts: what b controls, what m controls
 *  4. Symbol Bridge — y = mx + b notation with labeled parts
 *  5. Real World — cell phone plan cost, savings over time
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
 */

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/* ---- Lesson-specific semantic theme ---- */
const THEME = {
  slope: "#f472b6",
  intercept: colors.functional.info,
  line: colors.accent.violet,
} as const;

/* ---- MiniGraph helper ---- */
function MiniGraph({ m, b, showSteps = false, label }: { m: number; b: number; showSteps?: boolean; label?: string }) {
  const w = 320; const h = 320; const margin = 40; const gw = w - margin * 2; const gh = h - margin * 2; const range = 6;
  const toX = (v: number) => margin + ((v + range) / (2 * range)) * gw;
  const toY = (v: number) => margin + ((range - v) / (2 * range)) * gh;
  const ticks = [-4, -2, 0, 2, 4];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-sm" aria-label={label ?? "Graph of y=mx+b"}>
      {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((t) => (<g key={t}><line x1={toX(t)} y1={margin} x2={toX(t)} y2={h - margin} stroke={colors.bg.elevated} strokeWidth={0.3} /><line x1={margin} y1={toY(t)} x2={w - margin} y2={toY(t)} stroke={colors.bg.elevated} strokeWidth={0.3} /></g>))}
      <line x1={margin} y1={toY(0)} x2={w - margin} y2={toY(0)} stroke={colors.text.secondary} strokeWidth={1.5} />
      <line x1={toX(0)} y1={margin} x2={toX(0)} y2={h - margin} stroke={colors.text.secondary} strokeWidth={1.5} />
      {ticks.filter((t) => t !== 0).map((t) => (<g key={`lbl${t}`}><text x={toX(t)} y={toY(0) + 14} textAnchor={"middle" as const} fill={colors.text.secondary} fontSize={9}>{t}</text><text x={toX(0) - 12} y={toY(t) + 3} textAnchor={"middle" as const} fill={colors.text.secondary} fontSize={9}>{t}</text></g>))}
      <line x1={toX(-range)} y1={toY(m * -range + b)} x2={toX(range)} y2={toY(m * range + b)} stroke={THEME.line} strokeWidth={2.5} />
      <circle cx={toX(0)} cy={toY(b)} r={6} fill={THEME.intercept} />
      <text x={toX(0) + 12} y={toY(b) + 4} fill={THEME.intercept} fontSize={11} fontWeight="bold">{`b=${b}`}</text>
      {showSteps && m !== 0 && (
        <g>
          <line x1={toX(0)} y1={toY(b)} x2={toX(1)} y2={toY(b)} stroke={THEME.slope} strokeWidth={2} strokeDasharray="4 2" />
          <line x1={toX(1)} y1={toY(b)} x2={toX(1)} y2={toY(b + m)} stroke={THEME.slope} strokeWidth={2} strokeDasharray="4 2" />
          <circle cx={toX(1)} cy={toY(b + m)} r={4} fill={THEME.slope} />
          <text x={toX(0.5)} y={toY(b) + 14} textAnchor={"middle" as const} fill={THEME.slope} fontSize={10}>run=1</text>
          <text x={toX(1) + 14} y={toY(b + m / 2) + 3} fill={THEME.slope} fontSize={10}>{`rise=${m}`}</text>
        </g>
      )}
    </svg>
  );
}

/* ---- Hook ---- */
function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/SlopeInterceptHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t = [setTimeout(() => setPhase(1), 600), setTimeout(() => setPhase(2), 2000), setTimeout(() => setPhase(3), 3500),
    // Failsafe: guarantee Continue button within 4s
    setTimeout(() => setPhase((p) => Math.max(p, 3)), 4000)]; return () => t.forEach(clearTimeout); }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold text-nm-text-primary">Two numbers define every line</motion.h2>
        {phase >= 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}><MiniGraph m={2} b={-1} showSteps={phase >= 2} label="Line y=2x-1 building from y-intercept" /></motion.div>}
        {phase >= 2 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-center text-sm" style={{ color: colors.text.secondary }}>Start at <span style={{ color: THEME.intercept }}>b = {"\u22121"}</span> on the y-axis, then step with <span style={{ color: THEME.slope }}>slope m = 2</span></motion.p>)}
        {phase >= 3 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 rounded-xl px-6 py-3 text-center bg-nm-bg-secondary"><p className="font-mono text-lg font-bold" style={{ color: THEME.line }}>{"y = "}<span style={{ color: THEME.slope }}>2</span>{"x + ("}<span style={{ color: THEME.intercept }}>{"\u22121"}</span>{")"}</p></motion.div>)}
        {phase >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </div>
  );
}

/* ---- Spatial ---- */
function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [m, setM] = useState(1);
  const [b, setB] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const mValues = [-3, -2, -1, -0.5, 0, 0.5, 1, 2, 3];
  const bValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-3">
        <h2 className="text-center text-[clamp(16px,4vw,24px)] font-bold text-nm-text-primary">Change m and b to explore y = mx + b</h2>
        <MiniGraph m={m} b={b} showSteps label="Interactive graph with adjustable slope and intercept" />
        <div className="rounded-xl bg-nm-bg-secondary px-6 py-2 text-center">
          <p className="font-mono text-lg font-bold text-nm-text-primary">{"y = "}<span style={{ color: THEME.slope }}>{m}</span>{"x + "}<span style={{ color: THEME.intercept }}>{b}</span></p>
        </div>
        <div>
          <p className="mb-1 text-center text-xs font-semibold" style={{ color: THEME.slope }}>Slope (m)</p>
          <div className="flex flex-wrap justify-center gap-1">
            {mValues.map((v) => (<motion.button key={`m${v}`} whileTap={{ scale: 0.9 }} onClick={() => { setM(v); setInteractions((c) => c + 1); }} data-interactive="true" className={cn("flex items-center justify-center rounded-lg font-mono text-sm font-bold", v === m && "ring-2 ring-white")} style={{ background: v === m ? THEME.slope : `${THEME.slope}30`, color: v === m ? colors.bg.primary : THEME.slope, minHeight: 44, minWidth: 44 }} aria-label={`Slope ${v}`}>{v}</motion.button>))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-center text-xs font-semibold" style={{ color: THEME.intercept }}>Y-intercept (b)</p>
          <div className="flex flex-wrap justify-center gap-1">
            {bValues.map((v) => (<motion.button key={`b${v}`} whileTap={{ scale: 0.9 }} onClick={() => { setB(v); setInteractions((c) => c + 1); }} data-interactive="true" className={cn("flex items-center justify-center rounded-lg font-mono text-sm font-bold", v === b && "ring-2 ring-white")} style={{ background: v === b ? THEME.intercept : `${THEME.intercept}30`, color: v === b ? colors.bg.primary : THEME.intercept, minHeight: 44, minWidth: 44 }} aria-label={`Y-intercept ${v}`}>{v}</motion.button>))}
          </div>
        </div>
        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </div>
  );
}

/* ---- Discovery ---- */
function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "The y-intercept b is where the line crosses the y-axis (where x = 0). Changing b slides the whole line up or down without changing its steepness.", button: "I see it!" },
    { text: "The slope m controls the steepness and direction. Larger |m| means steeper. Positive m tilts uphill; negative m tilts downhill.", button: "I see it!" },
    { text: "Together, m and b fully define a line. From any equation y = mx + b, you can plot the line: start at (0, b), then use slope steps.", button: "Got it!" },
  ], []);
  const [promptIdx, setPromptIdx] = useState(0);
  const handleAck = useCallback(() => { if (promptIdx < prompts.length - 1) { setPromptIdx((i) => i + 1); } else { onContinue(); } }, [promptIdx, prompts.length, onContinue]);
  const current = prompts[promptIdx]!;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">{prompts.map((_, i) => (<div key={i} className="h-2 w-8 rounded-full" style={{ background: i <= promptIdx ? colors.accent.indigo : colors.bg.elevated }} />))}</div>
        <AnimatePresence mode="wait"><motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl bg-nm-bg-secondary p-6 text-center"><p className="text-[clamp(16px,4vw,20px)] leading-relaxed text-nm-text-primary">{current.text}</p></motion.div></AnimatePresence>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleAck} className="rounded-xl px-8 py-3 text-base font-semibold text-white" style={{ background: colors.accent.indigo, minHeight: 48, minWidth: 160 }} aria-label={current.button}>{current.button}</motion.button>
      </div>
    </div>
  );
}

/* ---- Symbol Bridge ---- */
function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = [setTimeout(() => setStep(1), 1200), setTimeout(() => setStep(2), 2400), setTimeout(() => setStep(3), 3600)]; return () => t.forEach(clearTimeout); }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold text-nm-text-primary">Slope-Intercept Form</h2>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={springs.default} className="rounded-2xl border-2 px-8 py-6 text-center" style={{ borderColor: colors.accent.indigo, background: `${colors.accent.indigo}15` }}>
          <p className="font-mono text-[clamp(24px,6vw,40px)] font-bold text-nm-text-primary">{"y = "}<span style={{ color: THEME.slope }}>m</span>{"x + "}<span style={{ color: THEME.intercept }}>b</span></p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {step >= 1 && (<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={springs.default} className="rounded-xl bg-nm-bg-secondary px-6 py-3"><p className="text-sm text-nm-text-primary"><span className="font-bold" style={{ color: THEME.slope }}>m</span> = slope = rise/run = steepness and direction</p></motion.div>)}
          {step >= 2 && (<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={springs.default} className="rounded-xl bg-nm-bg-secondary px-6 py-3"><p className="text-sm text-nm-text-primary"><span className="font-bold" style={{ color: THEME.intercept }}>b</span> = y-intercept = where line crosses y-axis = the value of y when x = 0</p></motion.div>)}
          {step >= 3 && (<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={springs.default} className="rounded-xl bg-nm-bg-secondary px-6 py-3"><p className="text-sm text-nm-text-primary">Example: y = <span style={{ color: THEME.slope }}>3</span>x + <span style={{ color: THEME.intercept }}>2</span> {"\u2192"} slope 3, crosses y-axis at 2</p></motion.div>)}
        </div>
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </div>
  );
}

/* ---- Real World ---- */
function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\uD83D\uDCF1", title: "Cell Phone Plan", desc: "cost = 0.05 \u00D7 minutes + 20. The base fee ($20) is b; the per-minute rate ($0.05) is m." },
    { icon: "\uD83D\uDCB0", title: "Savings Account", desc: "balance = 50 \u00D7 weeks + 200. You start with $200 (b) and add $50/week (m)." },
    { icon: "\u26FD", title: "Fuel Consumption", desc: "gas_left = \u22120.04 \u00D7 miles + 15. You start with 15 gallons (b) and use 0.04 gal/mile (negative m)." },
  ];
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold text-nm-text-primary">y = mx + b in Real Life</h2>
        <div className="flex flex-col gap-4">
          {scenarios.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...springs.default }} className="rounded-xl bg-nm-bg-secondary p-4"><div className="flex items-start gap-3"><span className="text-2xl">{s.icon}</span><div><p className="font-semibold text-nm-text-primary">{s.title}</p><p className="mt-1 text-sm leading-relaxed" style={{ color: colors.text.secondary }}>{s.desc}</p></div></div></motion.div>))}
        </div>
        <ContinueButton onClick={onContinue} />
      </div>
    </div>
  );
}

/* ---- Practice ---- */
interface PracticeProblem { id: number; layer: "recall" | "procedure" | "understanding"; question: string; options: string[]; correctIndex: number; feedback: string; }

const PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "recall", question: "In y = mx + b, what does m represent?", options: ["y-intercept", "Slope", "x-value", "Output"], correctIndex: 1, feedback: "m is the slope \u2014 the rate of change, or how steep the line is." },
  { id: 2, layer: "recall", question: "In y = mx + b, what does b represent?", options: ["Slope", "x-intercept", "y-intercept", "The origin"], correctIndex: 2, feedback: "b is the y-intercept \u2014 where the line crosses the y-axis (x = 0)." },
  { id: 3, layer: "recall", question: "The equation y = 5x has a y-intercept of:", options: ["5", "0", "1", "Undefined"], correctIndex: 1, feedback: "y = 5x is the same as y = 5x + 0. The y-intercept b = 0, so the line passes through the origin." },
  { id: 4, layer: "procedure", question: "What are the slope and y-intercept of y = \u22123x + 7?", options: ["m = \u22123, b = 7", "m = 7, b = \u22123", "m = 3, b = 7", "m = \u22123, b = \u22127"], correctIndex: 0, feedback: "Comparing with y = mx + b: m = \u22123 and b = 7." },
  { id: 5, layer: "procedure", question: "A line has slope 2 and passes through (0, \u22124). What is its equation?", options: ["y = 2x \u2212 4", "y = \u22124x + 2", "y = 2x + 4", "y = \u22122x \u2212 4"], correctIndex: 0, feedback: "Slope m = 2, y-intercept b = \u22124 (since the point is on the y-axis). So y = 2x \u2212 4." },
  { id: 6, layer: "procedure", question: "Write the equation for a line with slope 1/2 passing through (0, 3).", options: ["y = (1/2)x + 3", "y = 3x + 1/2", "y = 2x + 3", "y = (1/2)x \u2212 3"], correctIndex: 0, feedback: "m = 1/2, b = 3. Plug into y = mx + b: y = (1/2)x + 3." },
  { id: 7, layer: "understanding", question: "Two lines have equations y = 2x + 1 and y = 2x + 5. How are they related?", options: ["Parallel (same slope, different intercepts)", "Perpendicular", "The same line", "They intersect at x = 0"], correctIndex: 0, feedback: "Same slope (m = 2) means parallel. Different b values mean they never intersect." },
  { id: 8, layer: "understanding", question: "A graph shows a line crossing the y-axis at 3 and going down 1 unit per 1 unit right. What is the equation?", options: ["y = \u22121x + 3", "y = 3x \u2212 1", "y = x + 3", "y = \u22123x + 1"], correctIndex: 0, feedback: "b = 3 (crosses y-axis at 3). Goes down 1 per 1 right means m = \u22121. So y = \u2212x + 3." },
  { id: 9, layer: "understanding", question: "If you increase b in y = mx + b, what happens to the line?", options: ["It shifts up", "It gets steeper", "It shifts left", "It rotates"], correctIndex: 0, feedback: "Increasing b moves the y-intercept up, shifting the entire line upward without changing its slope." },
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
    return (<div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12"><div className="flex flex-col items-center gap-4"><h2 className="text-[clamp(20px,5vw,28px)] font-bold text-nm-text-primary">Practice Complete!</h2><p className="text-lg" style={{ color: colors.text.secondary }}>You got {score} out of {PROBLEMS.length} correct.</p><ContinueButton onClick={onContinue} label="Continue" /></div></div>);
  }
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: colors.text.secondary }}>Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})</p>
        <div className="w-full rounded-xl bg-nm-bg-secondary p-6"><p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed text-nm-text-primary">{problem.question}</p></div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex; const isSelected = i === selected;
            let bg: string = colors.bg.secondary; let border: string = colors.bg.elevated;
            if (answered) { if (isCorrect) { bg = `${colors.functional.success}20`; border = colors.functional.success; } else if (isSelected) { bg = `${colors.functional.error}20`; border = colors.functional.error; } }
            return (<motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium text-nm-text-primary transition-colors" style={{ background: bg, borderColor: border, minHeight: 48 }} aria-label={`Option: ${opt}`}>{opt}{answered && isCorrect && <span className="ml-2" style={{ color: colors.functional.success }}>{"  \u2713"}</span>}{answered && isSelected && !isCorrect && <span className="ml-2" style={{ color: colors.functional.error }}>{"  \u2717"}</span>}</motion.button>);
          })}
        </div>
        {answered && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-xl p-4" style={{ background: selected === problem.correctIndex ? `${colors.functional.success}15` : `${colors.functional.error}15` }}><p className="text-sm leading-relaxed text-nm-text-primary">{problem.feedback}</p></motion.div>)}
        {answered && (<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: colors.accent.indigo, minHeight: 48, minWidth: 160 }} aria-label="Next problem">{"Next \u2192"}</motion.button>)}
      </div>
    </div>
  );
}

/* ---- Reflection ---- */
function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback(() => { setSubmitted(true); }, []);
  if (submitted) { return (<div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12"><div className="flex flex-col items-center gap-4 text-center"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={springs.default}><p className="text-4xl">{"\uD83E\uDDE0"}</p><h2 className="mt-2 text-xl font-bold text-nm-text-primary">Great reflection!</h2><p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>Slope-intercept form is the gateway to understanding all linear relationships. +50 XP</p></motion.div><ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} /></div></div>); }
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold text-nm-text-primary">Reflect</h2>
        <p className="text-center text-sm" style={{ color: colors.text.secondary }}>Explain how you would graph y = {"\u22122"}x + 4 without plotting lots of points.</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." className="w-full rounded-xl border-2 bg-nm-bg-secondary p-4 text-base text-nm-text-primary" style={{ borderColor: colors.bg.elevated, minHeight: 120, resize: "vertical" }} aria-label="Reflection text" />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl bg-nm-bg-secondary px-6 py-3 text-sm" style={{ color: colors.text.secondary, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: colors.accent.indigo, minHeight: 48, minWidth: 120 }} aria-label="Submit reflection">Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: colors.text.secondary }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </div>
  );
}

/* ---- Main ---- */
export function SlopeInterceptLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="AL-3.8b Slope-Intercept Form" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
