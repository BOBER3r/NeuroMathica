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

/* ── Lesson-specific semantic colors (not in shared tokens) ── */
const THEME = {
  parabola: colors.accent.emerald,
  formula: "#f59e0b",
  factor: "#ec4899",
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.primary;    // original #e2e8f0 maps closest to primary
const MUTED = colors.text.secondary;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;
const PRIMARY = colors.accent.indigo;

const SPRING = springs.default;

/* ------------------------------------------------------------------ */
/*  Problem data                                                       */
/* ------------------------------------------------------------------ */

interface PP { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }
const PROBLEMS: PP[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Solve by factoring: x\u00B2 \u2212 5x + 6 = 0", options: ["x = 2 or x = 3", "x = \u22122 or x = \u22123", "x = 1 or x = 6", "x = 6"], correctAnswer: "x = 2 or x = 3", feedback: "Factor: (x\u22122)(x\u22123) = 0. Set each factor = 0: x = 2 or x = 3." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "In ax\u00B2 + bx + c = 0, what are a, b, c for 2x\u00B2 \u2212 3x + 1 = 0?", options: ["a=2, b=\u22123, c=1", "a=2, b=3, c=1", "a=\u22123, b=2, c=1", "a=1, b=\u22123, c=2"], correctAnswer: "a=2, b=\u22123, c=1", feedback: "Standard form ax\u00B2 + bx + c: a is the x\u00B2 coefficient, b is the x coefficient, c is the constant." },
  { id: 3, layer: "Procedure", type: "multiple-choice", prompt: "Solve: x\u00B2 = 16", options: ["x = 4 or x = \u22124", "x = 4 only", "x = 8", "x = 256"], correctAnswer: "x = 4 or x = \u22124", feedback: "x\u00B2 = 16 means x = \u00B1\u221A16 = \u00B14. Both 4\u00B2 and (\u22124)\u00B2 equal 16." },
  { id: 4, layer: "Procedure", type: "multiple-choice", prompt: "Solve: x\u00B2 + 3x \u2212 10 = 0", options: ["x = 2 or x = \u22125", "x = \u22122 or x = 5", "x = 10 or x = \u22121", "x = 5 or x = 2"], correctAnswer: "x = 2 or x = \u22125", feedback: "Factor: (x+5)(x\u22122) = 0. So x = \u22125 or x = 2." },
  { id: 5, layer: "Procedure", type: "multiple-choice", prompt: "The discriminant b\u00B2 \u2212 4ac tells you:", options: ["How many solutions the equation has", "The vertex of the parabola", "The y-intercept", "The slope"], correctAnswer: "How many solutions the equation has", feedback: "If b\u00B2\u22124ac > 0: two solutions. If = 0: one solution. If < 0: no real solutions." },
  { id: 6, layer: "Understanding", type: "multiple-choice", prompt: "Why does a quadratic equation have at most 2 solutions?", options: ["A parabola crosses the x-axis at most twice", "Because degree = 2", "Both of the above", "Neither"], correctAnswer: "Both of the above", feedback: "The degree determines the max number of roots. Graphically, a parabola crosses x-axis at most 2 times." },
  { id: 7, layer: "Understanding", type: "multiple-choice", prompt: "Use the quadratic formula for x\u00B2 \u2212 4x + 4 = 0. How many solutions?", options: ["One (x = 2)", "Two (x = 2 and x = \u22122)", "None", "Infinite"], correctAnswer: "One (x = 2)", feedback: "b\u00B2 \u2212 4ac = 16 \u2212 16 = 0. One repeated solution: x = 4/2 = 2." },
  { id: 8, layer: "Understanding", type: "multiple-choice", prompt: "If the discriminant is negative, the equation has:", options: ["No real solutions", "Two real solutions", "One real solution", "Infinite solutions"], correctAnswer: "No real solutions", feedback: "A negative discriminant means \u221A(negative), which has no real value. The parabola doesn't touch the x-axis." },
];

/* ------------------------------------------------------------------ */
/*  Stage components                                                   */
/* ------------------------------------------------------------------ */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/QuadraticEquationsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 4000)); t.push(setTimeout(() => setPhase(4), 5500));
    t.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => t.forEach(clearTimeout); }, []);

  const GW = 300; const GH = 200; const GM = 30;
  const points = Array.from({ length: 21 }, (_, i) => { const x = -2 + i * 0.4; const y = x * x - 4; return { x, y }; });
  const toX = (v: number) => GM + ((v + 3) / 6) * (GW - 2 * GM);
  const toY = (v: number) => GH - GM - ((v + 5) / 10) * (GH - 2 * GM);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(" ");

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <AnimatePresence>{phase >= 1 && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-2 font-medium"
        style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>A ball thrown upward follows a parabola...</motion.p>)}</AnimatePresence>
      {phase >= 2 && (<svg viewBox={`0 0 ${GW} ${GH}`} className="w-full max-w-xs mb-4" aria-label="Parabola y equals x squared minus 4">
        <rect width={GW} height={GH} fill={BG} rx={8} />
        <line x1={GM} y1={GH - GM} x2={GW - GM} y2={GH - GM} stroke={ELEVATED} strokeWidth={1} />
        <line x1={toX(0)} y1={GM} x2={toX(0)} y2={GH - GM} stroke={ELEVATED} strokeWidth={1} />
        <motion.path d={pathD} fill="none" stroke={THEME.parabola} strokeWidth={2.5}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
        {phase >= 3 && (<>
          <motion.circle cx={toX(-2)} cy={toY(0)} r={6} fill={THEME.formula} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} />
          <motion.circle cx={toX(2)} cy={toY(0)} r={6} fill={THEME.formula} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} />
        </>)}
      </svg>)}
      <AnimatePresence>{phase >= 4 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center font-bold"
        style={{ color: THEME.formula, fontSize: "clamp(16px, 4vw, 22px)" }}>
        Where does it hit the ground? Solve x{"\u00B2"} {"\u2212"} 4 = 0 {"\u2192"} x = {"\u00B1"}2
      </motion.p>)}</AnimatePresence>
      {phase >= 5 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [a, setA] = useState(1); const [c, setC] = useState(-4);
  const [interactions, setInteractions] = useState(0); const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const disc = -4 * a * c;
  const numSolutions = disc > 0 ? 2 : disc === 0 ? 1 : 0;

  const GW = 280; const GH = 180; const GM = 25;
  const points = Array.from({ length: 21 }, (_, i) => { const x = -3 + i * 0.3; const y = a * x * x + c; return { x, y }; });
  const toX = (v: number) => GM + ((v + 3.5) / 7) * (GW - 2 * GM);
  const toY = (v: number) => GH - GM - ((v + 6) / 12) * (GH - 2 * GM);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(" ");

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: MUTED, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Adjust the equation and see how many times it crosses zero
      </p>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1">
          <span className="text-xs" style={{ color: MUTED }}>a:</span>
          <button onClick={() => { if (a > 1) { setA((v) => v - 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: SURFACE, color: TEXT }}>{"\u2212"}</button>
          <span className="font-mono font-bold w-4 text-center" style={{ color: THEME.parabola }}>{a}</span>
          <button onClick={() => { if (a < 3) { setA((v) => v + 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: SURFACE, color: TEXT }}>+</button>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs" style={{ color: MUTED }}>c:</span>
          <button onClick={() => { if (c > -6) { setC((v) => v - 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: SURFACE, color: TEXT }}>{"\u2212"}</button>
          <span className="font-mono font-bold w-6 text-center" style={{ color: THEME.formula }}>{c}</span>
          <button onClick={() => { if (c < 4) { setC((v) => v + 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: SURFACE, color: TEXT }}>+</button>
        </div>
      </div>
      <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full max-w-xs mb-3" aria-label="Interactive parabola">
        <rect width={GW} height={GH} fill={BG} rx={8} />
        <line x1={GM} y1={toY(0)} x2={GW - GM} y2={toY(0)} stroke={ELEVATED} strokeWidth={1} />
        <path d={pathD} fill="none" stroke={THEME.parabola} strokeWidth={2.5} />
      </svg>
      <div className="text-center mb-2">
        <p className="font-mono text-sm" style={{ color: THEME.parabola }}>{a}x{"\u00B2"} + ({c}) = 0</p>
        <p className="font-bold text-sm mt-1" style={{ color: numSolutions === 0 ? ERROR : THEME.formula }}>
          {numSolutions === 2 ? "2 solutions (crosses x-axis twice)" : numSolutions === 1 ? "1 solution (touches x-axis)" : "No real solutions (above x-axis)"}
        </p>
      </div>
      <InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={PRIMARY} />
      {canContinue && <ContinueButton onClick={onContinue} />}
    </section>
  );
}

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "A quadratic equation has the form ax\u00B2 + bx + c = 0. The graph is a parabola. Solutions are where it crosses the x-axis.", btn: "I see it!" },
    { text: "Factoring method: rewrite as (x \u2212 r)(x \u2212 s) = 0, then x = r or x = s. Quick when you can spot the factors!", btn: "I see it!" },
    { text: "Quadratic formula: x = (\u2212b \u00B1 \u221A(b\u00B2\u22124ac)) / 2a. Works for ANY quadratic, even when factoring is hard.", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
          <p className="font-mono font-bold" style={{ color: THEME.parabola }}>ax{"\u00B2"} + bx + c = 0</p>
          <p className="text-sm mt-2" style={{ color: MUTED }}>The standard form of every quadratic</p></motion.div>)}
        {step === 1 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
          <p className="font-mono" style={{ color: THEME.factor }}>x{"\u00B2"} {"\u2212"} 5x + 6 = 0</p>
          <p className="font-mono text-xs mt-1" style={{ color: MUTED }}>(x {"\u2212"} 2)(x {"\u2212"} 3) = 0</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.factor }}>x = 2 or x = 3</p></motion.div>)}
        {step === 2 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: SURFACE }}>
          <p className="font-mono font-bold" style={{ color: THEME.formula }}>
            x = ({"\u2212"}b {"\u00B1"} {"\u221A"}(b{"\u00B2"}{"\u2212"}4ac)) / 2a
          </p>
          <p className="text-sm mt-2" style={{ color: MUTED }}>The universal solver!</p></motion.div>)}
      </div>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
          className="min-w-[140px]" style={{ backgroundColor: PRIMARY }}>{current.btn}</Button></motion.div>)}
    </section>
  );
}

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1200)); t.push(setTimeout(() => setRevealed(2), 2400));
    t.push(setTimeout(() => setRevealed(3), 3600)); t.push(setTimeout(() => setRevealed(4), 4800));
    return () => t.forEach(clearTimeout); }, []);
  const n = [
    { formula: "ax\u00B2 + bx + c = 0", desc: "Standard form of a quadratic equation", color: THEME.parabola },
    { formula: "Factor: (x\u2212r)(x\u2212s) = 0", desc: "Find r and s such that r+s = \u2212b/a, r\u00D7s = c/a", color: THEME.factor },
    { formula: "x = (\u2212b \u00B1 \u221A(b\u00B2\u22124ac)) / 2a", desc: "Quadratic formula \u2014 always works", color: THEME.formula },
    { formula: "Discriminant: b\u00B2 \u2212 4ac", desc: "> 0: two solutions, = 0: one, < 0: none", color: PRIMARY },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Solving Methods</h2>
      <div className="space-y-5 w-full max-w-md">{n.map((item, i) => (<AnimatePresence key={i}>{revealed > i && (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4" style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${item.color}` }}>
          <p className="font-bold font-mono text-lg" style={{ color: item.color }}>{item.formula}</p>
          <p className="text-sm mt-1" style={{ color: MUTED }}>{item.desc}</p></motion.div>)}</AnimatePresence>))}</div>
      {revealed >= 4 && <ContinueButton onClick={onContinue} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const s = [
    { icon: "\u{1F3C0}", title: "Projectile Motion", desc: "When does a ball hit the ground?", math: "h(t) = \u221216t\u00B2 + 64t = 0 \u2192 t = 4s" },
    { icon: "\u{1F4D0}", title: "Area Problems", desc: "Find dimensions when area = 24 and perimeter = 20", math: "x(10\u2212x) = 24 \u2192 x\u00B2 \u2212 10x + 24 = 0" },
    { icon: "\u{1F4B0}", title: "Break-Even Point", desc: "When does revenue equal cost?", math: "R(x) = C(x) \u2192 quadratic equation" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Quadratics Everywhere</h2>
      <div className="space-y-4 w-full max-w-md">{s.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }}
        className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: SURFACE }}>
        <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
        <div><p className="font-semibold" style={{ color: TEXT }}>{item.title}</p><p className="text-sm" style={{ color: TEXT_SEC }}>{item.desc}</p>
          <p className="text-xs font-mono mt-1" style={{ color: PRIMARY }}>{item.math}</p></div></motion.div>))}</div>
      <ContinueButton onClick={onContinue} delay={0.3} />
    </section>
  );
}

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [cQ, setCQ] = useState(0); const [sel, setSel] = useState<string | null>(null); const [sub, setSub] = useState(false);
  const [res, setRes] = useState<Array<boolean | null>>(() => PROBLEMS.map(() => null));
  const p = PROBLEMS[cQ]!; const isLast = cQ === PROBLEMS.length - 1; const ok = sel === p.correctAnswer;
  const doSubmit = useCallback(() => { if (!sel) return; setSub(true); setRes((prev) => { const n = [...prev]; n[cQ] = sel === p.correctAnswer; return n; }); }, [sel, cQ, p.correctAnswer]);
  const doNext = useCallback(() => { if (isLast) { onContinue(); return; } setCQ((q) => q + 1); setSel(null); setSub(false); }, [isLast, onContinue]);
  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">{PROBLEMS.map((_, i) => { const r = res[i]; let bg: string = ELEVATED;
        if (r === true) bg = SUCCESS; else if (r === false) bg = ERROR;
        return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === cQ ? `2px solid ${PRIMARY}` : "none" }} />; })}</div>
      <motion.div key={cQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: MUTED }}>{p.layer} {"\u2022"} {cQ + 1}/{PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: TEXT, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{p.prompt}</p>
        <div className="space-y-2 w-full">{p.options.map((opt) => { let bg: string = SURFACE; let brd: string = ELEVATED;
          if (sub) { if (opt === p.correctAnswer) { bg = "#34d39933"; brd = SUCCESS; } else if (opt === sel && opt !== p.correctAnswer) { bg = "#f8717133"; brd = ERROR; } }
          else if (opt === sel) { bg = "#818cf833"; brd = PRIMARY; }
          return (<button key={opt} onClick={() => { if (!sub) setSel(opt); }} disabled={sub} className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
            style={{ backgroundColor: bg, border: `2px solid ${brd}`, color: TEXT }}>{opt}</button>); })}</div>
        <AnimatePresence>{sub && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
          style={{ backgroundColor: ok ? "#34d39920" : "#f8717120", border: `1px solid ${ok ? SUCCESS : ERROR}` }}>
          <p className="font-bold mb-1" style={{ color: ok ? SUCCESS : ERROR }}>{ok ? "Correct!" : "Not quite"}</p>
          <p className="text-sm" style={{ color: TEXT_SEC }}>{p.feedback}</p></motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">{!sub ? (
          <Button size="lg" onClick={doSubmit} disabled={!sel} className="w-full" style={{ backgroundColor: PRIMARY, opacity: sel ? 1 : 0.4 }}>Check Answer</Button>
        ) : (<Button size="lg" onClick={doNext} className="w-full" style={{ backgroundColor: PRIMARY }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}</div>
      </motion.div>
    </section>
  );
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false); const canSubmit = text.trim().length >= 20;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>When would you choose factoring over the quadratic formula? What does the discriminant tell you about the graph?</p>
        {!submitted ? (<><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
          className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]" style={{ backgroundColor: SURFACE, color: TEXT, border: `2px solid ${ELEVATED}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? SUCCESS : MUTED }}>{text.trim().length}/20 characters minimum</p></>
        ) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: SURFACE }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">{!submitted ? (<>
        <Button size="lg" onClick={() => { if (canSubmit) setSubmitted(true); }} disabled={!canSubmit} className="w-full" style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
        <button onClick={() => setSubmitted(true)} className="w-full text-center py-2 min-h-[44px]" style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
      </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>Complete Lesson</Button></motion.div>)}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function QuadraticEquationsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="AL-3.12 Quadratic Equations" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
