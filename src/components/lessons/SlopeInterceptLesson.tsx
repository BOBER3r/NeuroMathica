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
const SLOPE_COLOR = "#f472b6";
const INTERCEPT_COLOR = "#60a5fa";
const LINE_COLOR = "#a78bfa";
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

/* ---- MiniGraph helper ---- */
function MiniGraph({ m, b, showSteps = false, label }: { m: number; b: number; showSteps?: boolean; label?: string }) {
  const w = 320; const h = 320; const margin = 40; const gw = w - margin * 2; const gh = h - margin * 2; const range = 6;
  const toX = (v: number) => margin + ((v + range) / (2 * range)) * gw;
  const toY = (v: number) => margin + ((range - v) / (2 * range)) * gh;
  const ticks = [-4, -2, 0, 2, 4];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-sm" aria-label={label ?? "Graph of y=mx+b"}>
      {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((t) => (<g key={t}><line x1={toX(t)} y1={margin} x2={toX(t)} y2={h - margin} stroke={BORDER} strokeWidth={0.3} /><line x1={margin} y1={toY(t)} x2={w - margin} y2={toY(t)} stroke={BORDER} strokeWidth={0.3} /></g>))}
      <line x1={margin} y1={toY(0)} x2={w - margin} y2={toY(0)} stroke={MUTED} strokeWidth={1.5} />
      <line x1={toX(0)} y1={margin} x2={toX(0)} y2={h - margin} stroke={MUTED} strokeWidth={1.5} />
      {ticks.filter((t) => t !== 0).map((t) => (<g key={`lbl${t}`}><text x={toX(t)} y={toY(0) + 14} textAnchor={"middle" as const} fill={MUTED} fontSize={9}>{t}</text><text x={toX(0) - 12} y={toY(t) + 3} textAnchor={"middle" as const} fill={MUTED} fontSize={9}>{t}</text></g>))}
      <line x1={toX(-range)} y1={toY(m * -range + b)} x2={toX(range)} y2={toY(m * range + b)} stroke={LINE_COLOR} strokeWidth={2.5} />
      <circle cx={toX(0)} cy={toY(b)} r={6} fill={INTERCEPT_COLOR} />
      <text x={toX(0) + 12} y={toY(b) + 4} fill={INTERCEPT_COLOR} fontSize={11} fontWeight="bold">{`b=${b}`}</text>
      {showSteps && m !== 0 && (
        <g>
          <line x1={toX(0)} y1={toY(b)} x2={toX(1)} y2={toY(b)} stroke={SLOPE_COLOR} strokeWidth={2} strokeDasharray="4 2" />
          <line x1={toX(1)} y1={toY(b)} x2={toX(1)} y2={toY(b + m)} stroke={SLOPE_COLOR} strokeWidth={2} strokeDasharray="4 2" />
          <circle cx={toX(1)} cy={toY(b + m)} r={4} fill={SLOPE_COLOR} />
          <text x={toX(0.5)} y={toY(b) + 14} textAnchor={"middle" as const} fill={SLOPE_COLOR} fontSize={10}>run=1</text>
          <text x={toX(1) + 14} y={toY(b + m / 2) + 3} fill={SLOPE_COLOR} fontSize={10}>{`rise=${m}`}</text>
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
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold" style={{ color: TEXT }}>Two numbers define every line</motion.h2>
        {phase >= 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}><MiniGraph m={2} b={-1} showSteps={phase >= 2} label="Line y=2x-1 building from y-intercept" /></motion.div>}
        {phase >= 2 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-center text-sm" style={{ color: MUTED }}>Start at <span style={{ color: INTERCEPT_COLOR }}>b = {"\u22121"}</span> on the y-axis, then step with <span style={{ color: SLOPE_COLOR }}>slope m = 2</span></motion.p>)}
        {phase >= 3 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 rounded-xl px-6 py-3 text-center" style={{ background: SURFACE }}><p className="font-mono text-lg font-bold" style={{ color: LINE_COLOR }}>{"y = "}<span style={{ color: SLOPE_COLOR }}>2</span>{"x + ("}<span style={{ color: INTERCEPT_COLOR }}>{"\u22121"}</span>{")"}</p></motion.div>)}
        {phase >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
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
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-3">
        <h2 className="text-center text-[clamp(16px,4vw,24px)] font-bold" style={{ color: TEXT }}>Change m and b to explore y = mx + b</h2>
        <MiniGraph m={m} b={b} showSteps label="Interactive graph with adjustable slope and intercept" />
        <div className="rounded-xl px-6 py-2 text-center" style={{ background: SURFACE }}>
          <p className="font-mono text-lg font-bold" style={{ color: TEXT }}>{"y = "}<span style={{ color: SLOPE_COLOR }}>{m}</span>{"x + "}<span style={{ color: INTERCEPT_COLOR }}>{b}</span></p>
        </div>
        <div>
          <p className="mb-1 text-center text-xs font-semibold" style={{ color: SLOPE_COLOR }}>Slope (m)</p>
          <div className="flex flex-wrap justify-center gap-1">
            {mValues.map((v) => (<motion.button key={`m${v}`} whileTap={{ scale: 0.9 }} onClick={() => { setM(v); setInteractions((c) => c + 1); }} data-interactive="true" className={cn("flex items-center justify-center rounded-lg font-mono text-sm font-bold", v === m && "ring-2 ring-white")} style={{ background: v === m ? SLOPE_COLOR : `${SLOPE_COLOR}30`, color: v === m ? BG : SLOPE_COLOR, minHeight: 44, minWidth: 44 }} aria-label={`Slope ${v}`}>{v}</motion.button>))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-center text-xs font-semibold" style={{ color: INTERCEPT_COLOR }}>Y-intercept (b)</p>
          <div className="flex flex-wrap justify-center gap-1">
            {bValues.map((v) => (<motion.button key={`b${v}`} whileTap={{ scale: 0.9 }} onClick={() => { setB(v); setInteractions((c) => c + 1); }} data-interactive="true" className={cn("flex items-center justify-center rounded-lg font-mono text-sm font-bold", v === b && "ring-2 ring-white")} style={{ background: v === b ? INTERCEPT_COLOR : `${INTERCEPT_COLOR}30`, color: v === b ? BG : INTERCEPT_COLOR, minHeight: 44, minWidth: 44 }} aria-label={`Y-intercept ${v}`}>{v}</motion.button>))}
          </div>
        </div>
        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
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
  useEffect(() => { const t = [setTimeout(() => setStep(1), 1200), setTimeout(() => setStep(2), 2400), setTimeout(() => setStep(3), 3600)]; return () => t.forEach(clearTimeout); }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Slope-Intercept Form</h2>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-2xl border-2 px-8 py-6 text-center" style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}>
          <p className="font-mono text-[clamp(24px,6vw,40px)] font-bold" style={{ color: TEXT }}>{"y = "}<span style={{ color: SLOPE_COLOR }}>m</span>{"x + "}<span style={{ color: INTERCEPT_COLOR }}>b</span></p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {step >= 1 && (<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-3" style={{ background: SURFACE }}><p className="text-sm" style={{ color: TEXT }}><span className="font-bold" style={{ color: SLOPE_COLOR }}>m</span> = slope = rise/run = steepness and direction</p></motion.div>)}
          {step >= 2 && (<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-3" style={{ background: SURFACE }}><p className="text-sm" style={{ color: TEXT }}><span className="font-bold" style={{ color: INTERCEPT_COLOR }}>b</span> = y-intercept = where line crosses y-axis = the value of y when x = 0</p></motion.div>)}
          {step >= 3 && (<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-3" style={{ background: SURFACE }}><p className="text-sm" style={{ color: TEXT }}>Example: y = <span style={{ color: SLOPE_COLOR }}>3</span>x + <span style={{ color: INTERCEPT_COLOR }}>2</span> {"\u2192"} slope 3, crosses y-axis at 2</p></motion.div>)}
        </div>
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
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
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>y = mx + b in Real Life</h2>
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
  if (submitted) { return (<StageWrapper><div className="flex flex-col items-center gap-4 text-center"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}><p className="text-4xl">{"\uD83E\uDDE0"}</p><h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2><p className="mt-2 text-sm" style={{ color: MUTED }}>Slope-intercept form is the gateway to understanding all linear relationships. +50 XP</p></motion.div><ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} /></div></StageWrapper>); }
  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>Explain how you would graph y = {"\u22122"}x + 4 without plotting lots of points.</p>
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
export function SlopeInterceptLesson({ onComplete }: { onComplete?: () => void }) {
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
