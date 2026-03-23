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
  distance: colors.functional.info,
  midpoint: colors.accent.emerald,
  slope: "#f59e0b",
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

/* ------------------------------------------------------------------ */
/*  Practice data                                                      */
/* ------------------------------------------------------------------ */

interface PracticeProblem { id: number; layer: string; type: "multiple-choice" | "numeric-input"; prompt: string; options?: string[]; correctAnswer: string; feedback: string; }

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "The distance formula is based on...",
    options: ["The area formula", "The Pythagorean theorem", "The slope formula", "The quadratic formula"],
    correctAnswer: "The Pythagorean theorem", feedback: "Distance = \u221A((x\u2082\u2212x\u2081)\u00B2 + (y\u2082\u2212y\u2081)\u00B2) comes directly from a\u00B2 + b\u00B2 = c\u00B2." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "The midpoint formula gives...",
    options: ["The distance between two points", "The point exactly halfway between two points", "The slope of a line", "The y-intercept"],
    correctAnswer: "The point exactly halfway between two points", feedback: "Midpoint = ((x\u2081+x\u2082)/2, (y\u2081+y\u2082)/2) \u2014 average the coordinates." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "Slope measures...",
    options: ["How long a line is", "How steep a line is", "Where a line starts", "The midpoint of a line"],
    correctAnswer: "How steep a line is", feedback: "Slope = rise/run = (y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081) tells you the steepness and direction." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "Distance from (1, 2) to (4, 6)? (Round to nearest tenth)", correctAnswer: "5",
    feedback: "d = \u221A((4\u22121)\u00B2 + (6\u22122)\u00B2) = \u221A(9+16) = \u221A25 = 5" },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "Midpoint of (2, 8) and (6, 4)? Give the x-coordinate.", correctAnswer: "4",
    feedback: "x = (2+6)/2 = 4. The midpoint is (4, 6)." },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "Slope of the line through (1, 3) and (4, 9)?", correctAnswer: "2",
    feedback: "m = (9\u22123)/(4\u22121) = 6/3 = 2" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "A horizontal line has slope...", options: ["0", "1", "Undefined", "\u221E"],
    correctAnswer: "0", feedback: "Horizontal means no rise: rise/run = 0/run = 0." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "A vertical line has slope...", options: ["0", "1", "Undefined", "\u22121"],
    correctAnswer: "Undefined", feedback: "Vertical means no run: rise/0 is undefined." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "If two points have the same y-coordinate, the distance between them equals...",
    options: ["The difference of their x-coordinates", "The sum of their x-coordinates", "The product of their x-coordinates", "Zero"],
    correctAnswer: "The difference of their x-coordinates",
    feedback: "Same y means the vertical part is 0, so distance = |x\u2082 \u2212 x\u2081|." },
];

/* ------------------------------------------------------------------ */
/*  Stage components                                                   */
/* ------------------------------------------------------------------ */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/CoordinateGeometryHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500)); t.push(setTimeout(() => setPhase(3), 4500)); t.push(setTimeout(() => setPhase(4), 6000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  const svgW = 320; const svgH = 240; const gs = 30; const ox = 40; const oy = 200;
  const p1x = ox + 1 * gs; const p1y = oy - 2 * gs; const p2x = ox + 7 * gs; const p2y = oy - 6 * gs;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Coordinate geometry concepts">
        <line x1={ox} y1={oy} x2={ox + 8 * gs} y2={oy} stroke={MUTED} strokeWidth={1} />
        <line x1={ox} y1={oy} x2={ox} y2={oy - 7 * gs} stroke={MUTED} strokeWidth={1} />
        {phase >= 1 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <circle cx={p1x} cy={p1y} r={5} fill={THEME.distance} /><circle cx={p2x} cy={p2y} r={5} fill={THEME.distance} />
          <text x={p1x - 5} y={p1y + 18} textAnchor={"middle" as const} fill={THEME.distance} fontSize={10}>(1, 2)</text>
          <text x={p2x + 5} y={p2y - 8} textAnchor={"middle" as const} fill={THEME.distance} fontSize={10}>(7, 6)</text>
        </motion.g>)}
        {phase >= 2 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={p1x} y1={p1y} x2={p2x} y2={p2y} stroke={THEME.distance} strokeWidth={2} />
          <line x1={p1x} y1={p1y} x2={p2x} y2={p1y} stroke={THEME.slope} strokeWidth={1.5} strokeDasharray="4,3" />
          <line x1={p2x} y1={p1y} x2={p2x} y2={p2y} stroke={THEME.slope} strokeWidth={1.5} strokeDasharray="4,3" />
          <text x={(p1x + p2x) / 2} y={p1y + 15} textAnchor={"middle" as const} fill={THEME.slope} fontSize={10}>run = 6</text>
          <text x={p2x + 18} y={(p1y + p2y) / 2} textAnchor={"start" as const} fill={THEME.slope} fontSize={10}>rise = 4</text>
        </motion.g>)}
        {phase >= 2 && (<motion.circle cx={(p1x + p2x) / 2} cy={(p1y + p2y) / 2} r={4} fill={THEME.midpoint}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} />)}
        {phase >= 3 && (<motion.text x={svgW / 2} y={25} textAnchor={"middle" as const} fill={TEXT} fontSize={15} fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Distance, Midpoint, Slope</motion.text>)}
      </svg>
      <AnimatePresence>{phase >= 3 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mt-4 font-medium" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        Three powerful tools for analyzing points on the coordinate plane.</motion.p>)}</AnimatePresence>
      {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>);
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [x1, setX1] = useState(1); const [y1, setY1] = useState(2);
  const [x2, setX2] = useState(5); const [y2, setY2] = useState(6);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const dist = Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 100) / 100;
  const mx = (x1 + x2) / 2; const my = (y1 + y2) / 2;
  const slopeVal = x2 !== x1 ? Math.round(((y2 - y1) / (x2 - x1)) * 100) / 100 : undefined;
  const svgW = 280; const svgH = 280; const gs = 28; const ox = 28; const oy = 252;
  const toSx = (v: number) => ox + v * gs; const toSy = (v: number) => oy - v * gs;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Move the points and watch distance, midpoint, and slope update
      </p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Interactive coordinate plane">
        {Array.from({ length: 10 }, (_, i) => (<g key={i}>
          <line x1={ox + i * gs} y1={0} x2={ox + i * gs} y2={svgH} stroke={ELEVATED} strokeWidth={0.5} />
          <line x1={0} y1={oy - i * gs} x2={svgW} y2={oy - i * gs} stroke={ELEVATED} strokeWidth={0.5} />
        </g>))}
        <line x1={ox} y1={oy} x2={svgW} y2={oy} stroke={MUTED} strokeWidth={1} />
        <line x1={ox} y1={0} x2={ox} y2={oy} stroke={MUTED} strokeWidth={1} />
        <line x1={toSx(x1)} y1={toSy(y1)} x2={toSx(x2)} y2={toSy(y2)} stroke={THEME.distance} strokeWidth={2} />
        <circle cx={toSx(x1)} cy={toSy(y1)} r={6} fill={THEME.distance} />
        <circle cx={toSx(x2)} cy={toSy(y2)} r={6} fill={THEME.distance} />
        <circle cx={toSx(mx)} cy={toSy(my)} r={4} fill={THEME.midpoint} />
        <text x={toSx(mx) + 8} y={toSy(my) - 5} textAnchor={"start" as const} fill={THEME.midpoint} fontSize={9}>M</text>
      </svg>
      <div className="w-full max-w-xs space-y-1 mb-2">
        {([["x\u2081", x1, setX1], ["y\u2081", y1, setY1], ["x\u2082", x2, setX2], ["y\u2082", y2, setY2]] as const).map(([lbl, val, setter]) => (
          <div key={lbl} className="flex items-center gap-2">
            <span className="text-xs w-8 font-mono" style={{ color: MUTED }}>{lbl}</span>
            <button onClick={() => { if (val > 0) { setter(val - 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-sm"
              style={{ backgroundColor: SURFACE, color: TEXT }}>{"\u2212"}</button>
            <span className="font-mono font-bold tabular-nums flex-1 text-center text-sm" style={{ color: TEXT }}>{val}</span>
            <button onClick={() => { if (val < 8) { setter(val + 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold text-sm"
              style={{ backgroundColor: SURFACE, color: TEXT }}>+</button>
          </div>))}
      </div>
      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: SURFACE }}>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <span style={{ color: MUTED }}>Distance:</span><span className="font-mono tabular-nums text-right" style={{ color: THEME.distance }}>{dist}</span>
          <span style={{ color: MUTED }}>Midpoint:</span><span className="font-mono tabular-nums text-right" style={{ color: THEME.midpoint }}>({mx}, {my})</span>
          <span style={{ color: MUTED }}>Slope:</span><span className="font-mono tabular-nums text-right" style={{ color: THEME.slope }}>{slopeVal !== undefined ? slopeVal : "undefined"}</span>
        </div>
      </div>
      <div className="mt-3"><InteractionDots count={Math.min(interactions, 8)} total={8} /></div>
      {canContinue && <ContinueButton onClick={onContinue} />}
    </section>);
}

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "The distance formula is just the Pythagorean theorem in disguise \u2014 the horizontal and vertical differences are the legs!", btn: "I see it!" },
    { text: "The midpoint is the average of the x-coordinates and the average of the y-coordinates.", btn: "I see it!" },
    { text: "Slope = rise / run. Positive slope goes up, negative goes down, zero is flat, undefined is vertical.", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" aria-live="polite">
      <svg viewBox="0 0 260 100" className="w-full max-w-[260px] mb-6">
        {step === 0 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={130} y={40} textAnchor={"middle" as const} fill={THEME.distance} fontSize={14} fontWeight={700}>d = {"\u221A"}((x{"\u2082"}{"\u2212"}x{"\u2081"}){"\u00B2"} + (y{"\u2082"}{"\u2212"}y{"\u2081"}){"\u00B2"})</text>
          <text x={130} y={70} textAnchor={"middle" as const} fill={MUTED} fontSize={11}>= Pythagorean theorem on a grid</text>
        </motion.g>)}
        {step === 1 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={130} y={50} textAnchor={"middle" as const} fill={THEME.midpoint} fontSize={14} fontWeight={700}>M = ((x{"\u2081"}+x{"\u2082"})/2, (y{"\u2081"}+y{"\u2082"})/2)</text>
        </motion.g>)}
        {step === 2 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={130} y={50} textAnchor={"middle" as const} fill={THEME.slope} fontSize={14} fontWeight={700}>m = (y{"\u2082"}{"\u2212"}y{"\u2081"}) / (x{"\u2082"}{"\u2212"}x{"\u2081"})</text>
        </motion.g>)}
      </svg>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
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
    { formula: "d = \u221A((x\u2082\u2212x\u2081)\u00B2 + (y\u2082\u2212y\u2081)\u00B2)", desc: "Distance between two points", color: THEME.distance },
    { formula: "M = ((x\u2081+x\u2082)/2, (y\u2081+y\u2082)/2)", desc: "Midpoint of a segment", color: THEME.midpoint },
    { formula: "m = (y\u2082\u2212y\u2081) / (x\u2082\u2212x\u2081)", desc: "Slope of a line through two points", color: THEME.slope },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Coordinate Geometry Formulas</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4"
            style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold font-mono text-base" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1" style={{ color: MUTED }}>{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
    </section>);
}

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F4CD}", title: "GPS Navigation", desc: "GPS calculates the distance between locations using coordinates.", math: "Distance formula" },
    { icon: "\u26BD", title: "Sports Analytics", desc: "Finding the midpoint of a pass or the slope of a player's run.", math: "Midpoint & slope" },
    { icon: "\u{1F3D7}\uFE0F", title: "Road Grade", desc: "The steepness of a road is its slope: rise over run.", math: "Slope = grade %" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Real World Connections</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: SURFACE }}>
          <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
          <div><p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
            <p className="text-sm" style={{ color: TEXT_SEC }}>{s.desc}</p>
            <p className="text-xs font-mono mt-1" style={{ color: PRIMARY }}>{s.math}</p></div>
        </motion.div>))}
      </div>
      <ContinueButton onClick={onContinue} delay={0.3} />
    </section>);
}

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentQ, setCurrentQ] = useState(0); const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(""); const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const userAnswer = problem.type === "numeric-input" ? inputValue.trim() : selected;
  const isCorrect = userAnswer === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!userAnswer) return; setSubmitted(true);
    setResults((p) => { const n = [...p]; n[currentQ] = userAnswer === problem.correctAnswer; return n; }); }, [userAnswer, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onContinue(); return; } setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false); }, [isLast, onContinue]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = ELEVATED;
          if (r === true) bg = SUCCESS; else if (r === false) bg = ERROR;
          return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${PRIMARY}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: MUTED }}>{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: TEXT, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        {problem.type === "multiple-choice" && problem.options && (<div className="space-y-2 w-full">{problem.options.map((opt) => {
          let bg: string = SURFACE; let border: string = ELEVATED;
          if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; } }
          else if (opt === selected) { bg = "#8b5cf633"; border = PRIMARY; }
          return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
            className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
            style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }}>{opt}</button>); })}</div>)}
        {problem.type === "numeric-input" && (
          <input type="number" value={inputValue} onChange={(e) => { if (!submitted) setInputValue(e.target.value); }}
            disabled={submitted} placeholder="Enter your answer" className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
            style={{ backgroundColor: SURFACE, color: TEXT, border: `2px solid ${submitted ? (isCorrect ? SUCCESS : ERROR) : ELEVATED}`, outline: "none" }} />)}
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? SUCCESS : ERROR}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? SUCCESS : ERROR }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: TEXT_SEC }}>{problem.feedback}</p>
          </motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full" style={{ backgroundColor: PRIMARY, opacity: userAnswer ? 1 : 0.4 }}>Check Answer</Button>)
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
    <section className="flex flex-1 flex-col items-center justify-center px-4" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          How does the Pythagorean theorem connect to the distance formula? Why is slope useful?
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
            style={{ backgroundColor: SURFACE, color: TEXT, border: `2px solid ${ELEVATED}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? SUCCESS : MUTED }}>{text.trim().length}/20 characters minimum</p>
        </>) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: SURFACE }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p>
          <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>Reflecting on concepts deepens your understanding.</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>Complete Lesson</Button></motion.div>)}
      </div>
    </section>);
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function CoordinateGeometryLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.10 Coord. Geometry" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
