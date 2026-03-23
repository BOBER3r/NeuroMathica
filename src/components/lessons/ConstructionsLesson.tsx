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

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Lesson-specific semantic colors (aliases to shared tokens) ── */
const THEME = {
  compass: colors.functional.info,
  straightedge: colors.accent.emerald,
  arc: "#f59e0b",
} as const;

const SPRING = springs.default;

interface PracticeProblem { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "The two tools used in classical constructions are...",
    options: ["Ruler and protractor", "Compass and straightedge", "Calculator and pencil", "T-square and triangle"],
    correctAnswer: "Compass and straightedge", feedback: "Classical constructions use only a compass (for circles/arcs) and an unmarked straightedge (for lines)." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "A compass is used to...",
    options: ["Measure angles", "Draw circles and arcs", "Draw straight lines", "Measure distances with numbers"],
    correctAnswer: "Draw circles and arcs", feedback: "A compass draws circles and arcs of a set radius \u2014 no measurements needed." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "To bisect means to...",
    options: ["Double something", "Cut into two equal parts", "Cut into three parts", "Extend"],
    correctAnswer: "Cut into two equal parts", feedback: "Bisect = \"bi\" (two) + \"sect\" (cut) = divide into two equal parts." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "To bisect a line segment, you draw arcs from each endpoint with...",
    options: ["The same radius (more than half the segment)", "Different radii", "The same radius (less than half)", "No arcs needed"],
    correctAnswer: "The same radius (more than half the segment)",
    feedback: "Equal radii > half the length ensures the arcs intersect above and below the segment." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "To bisect an angle, the first step is...",
    options: ["Draw a straight line", "Place the compass at the vertex and draw an arc crossing both rays", "Measure the angle", "Use a protractor"],
    correctAnswer: "Place the compass at the vertex and draw an arc crossing both rays",
    feedback: "The arc creates two points equidistant from the vertex on each ray." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "A perpendicular bisector of a segment...",
    options: ["Passes through one endpoint", "Crosses at the midpoint at 90\u00B0", "Is parallel to the segment", "Only bisects angles"],
    correctAnswer: "Crosses at the midpoint at 90\u00B0",
    feedback: "It both bisects the segment (at its midpoint) and is perpendicular (90\u00B0)." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Why can't you use a ruler's markings in a classical construction?",
    options: ["They are inaccurate", "Constructions prove things with logic, not measurement", "Rulers are too long", "Markings aren't needed for any construction"],
    correctAnswer: "Constructions prove things with logic, not measurement",
    feedback: "Classical constructions rely on geometric reasoning, not measured numbers. The proof is in the process." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Every point on the perpendicular bisector of a segment is...",
    options: ["Equidistant from both endpoints", "Closer to one endpoint", "On the segment", "At a 45\u00B0 angle"],
    correctAnswer: "Equidistant from both endpoints",
    feedback: "This is the key property: any point on the perpendicular bisector is the same distance from both endpoints." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "An angle bisector divides an angle into two angles that are...",
    options: ["Equal", "Complementary", "Supplementary", "Right angles"],
    correctAnswer: "Equal", feedback: "Bisect = two equal parts. Each half is exactly half the original angle." },
];

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/ConstructionsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500)); t.push(setTimeout(() => setPhase(3), 4500)); t.push(setTimeout(() => setPhase(4), 6000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  const svgW = 320; const svgH = 220;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Compass and straightedge construction">
        {phase >= 1 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={60} y1={120} x2={260} y2={120} stroke={THEME.straightedge} strokeWidth={2} />
          <circle cx={60} cy={120} r={3} fill={colors.text.primary} /><circle cx={260} cy={120} r={3} fill={colors.text.primary} />
          <text x={55} y={140} textAnchor={"middle" as const} fill={colors.text.muted} fontSize={10}>A</text>
          <text x={265} y={140} textAnchor={"middle" as const} fill={colors.text.muted} fontSize={10}>B</text>
        </motion.g>)}
        {phase >= 2 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.path d="M 60,120 A 120,120 0 0,0 160,20" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
          <motion.path d="M 260,120 A 120,120 0 0,1 160,20" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
          <motion.circle cx={160} cy={30} r={4} fill={THEME.compass} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, ...SPRING }} />
        </motion.g>)}
        {phase >= 2 && (<motion.line x1={160} y1={30} x2={160} y2={120} stroke={THEME.compass} strokeWidth={2} strokeDasharray="6,3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />)}
        {phase >= 3 && (<motion.text x={svgW / 2} y={200} textAnchor={"middle" as const} fill={colors.text.primary} fontSize={14} fontWeight={600}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Perpendicular bisector {"\u2014"} no ruler needed!</motion.text>)}
      </svg>
      <AnimatePresence>{phase >= 3 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mt-4 font-medium" style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        With just a compass and straightedge, you can build perfect geometric figures.</motion.p>)}</AnimatePresence>
      {phase >= 4 && <ContinueButton onClick={onComplete} delay={0.3} color={colors.accent.violet} />}
    </section>);
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [construction, setConstruction] = useState<"bisectSegment" | "bisectAngle" | "perpendicular">("bisectSegment");
  const [step, setStep] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const maxSteps = 3;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Pick a construction and step through it
      </p>
      <div className="flex gap-1 justify-center mb-3 flex-wrap">
        {([["bisectSegment", "Bisect Segment"], ["bisectAngle", "Bisect Angle"], ["perpendicular", "Perpendicular"]] as const).map(([k, lbl]) => (
          <button key={k} onClick={() => { setConstruction(k); setStep(0); interact(); }}
            className="rounded-lg px-3 py-2 text-xs font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{ backgroundColor: construction === k ? THEME.compass : colors.bg.secondary, color: colors.text.primary }}>{lbl}</button>
        ))}
      </div>
      <svg viewBox="0 0 280 200" className="w-full max-w-xs" aria-label={`${construction} step ${step + 1}`}>
        {construction === "bisectSegment" && (<g>
          <line x1={40} y1={100} x2={240} y2={100} stroke={THEME.straightedge} strokeWidth={2} />
          <circle cx={40} cy={100} r={3} fill={colors.text.primary} /><circle cx={240} cy={100} r={3} fill={colors.text.primary} />
          {step >= 1 && (<><path d="M 40,100 A 120,120 0 0,0 140,10" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" />
            <path d="M 240,100 A 120,120 0 0,1 140,10" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" /></>)}
          {step >= 2 && (<><path d="M 40,100 A 120,120 0 0,1 140,190" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" />
            <path d="M 240,100 A 120,120 0 0,0 140,190" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" />
            <line x1={140} y1={10} x2={140} y2={190} stroke={THEME.compass} strokeWidth={2} />
            <circle cx={140} cy={100} r={4} fill={THEME.compass} /></>)}
        </g>)}
        {construction === "bisectAngle" && (<g>
          <line x1={40} y1={160} x2={140} y2={40} stroke={THEME.straightedge} strokeWidth={2} />
          <line x1={40} y1={160} x2={240} y2={160} stroke={THEME.straightedge} strokeWidth={2} />
          {step >= 1 && (<path d="M 90,100 A 70,70 0 0,1 110,160" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" />)}
          {step >= 2 && (<line x1={40} y1={160} x2={200} y2={80} stroke={THEME.compass} strokeWidth={2} strokeDasharray="6,3" />)}
        </g>)}
        {construction === "perpendicular" && (<g>
          <line x1={40} y1={120} x2={240} y2={120} stroke={THEME.straightedge} strokeWidth={2} />
          <circle cx={140} cy={120} r={3} fill={colors.text.primary} />
          {step >= 1 && (<><path d="M 80,120 A 60,60 0 0,0 80,60" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" />
            <path d="M 200,120 A 60,60 0 0,1 200,60" fill="none" stroke={THEME.arc} strokeWidth={1.5} strokeDasharray="4,3" /></>)}
          {step >= 2 && (<line x1={140} y1={40} x2={140} y2={180} stroke={THEME.compass} strokeWidth={2} />)}
        </g>)}
        <text x={140} y={195} textAnchor={"middle" as const} fill={colors.text.muted} fontSize={10}>Step {step + 1} of {maxSteps}</text>
      </svg>

      <div className="flex gap-3 mt-2">
        <button onClick={() => { if (step > 0) { setStep(step - 1); interact(); } }}
          className="rounded-lg px-4 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
          style={{ backgroundColor: colors.bg.secondary, color: colors.text.primary }}>{"<"} Back</button>
        <button onClick={() => { if (step < maxSteps - 1) { setStep(step + 1); interact(); } }}
          className="rounded-lg px-4 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
          style={{ backgroundColor: THEME.compass, color: colors.text.primary }}>Next Step {">"}</button>
      </div>

      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={colors.accent.violet} /></div>
      {canContinue && <ContinueButton onClick={onComplete} color={colors.accent.violet} />}
    </section>);
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Arcs from two points intersect at locations equidistant from both. That's the key insight behind all constructions!", btn: "I see it!" },
    { text: "A perpendicular bisector uses this: both intersection points are equidistant from the endpoints.", btn: "I see it!" },
    { text: "Constructions prove geometric facts visually \u2014 no measurements, just pure logic and symmetry.", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox="0 0 260 80" className="w-full max-w-[260px] mb-6">
        <motion.text x={130} y={40} textAnchor={"middle" as const} fill={THEME.compass} fontSize={14} fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {step === 0 ? "Equal arcs \u2192 Equidistant points" : step === 1 ? "Symmetry makes it exact" : "Logic, not measurement"}
        </motion.text>
      </svg>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: colors.text.primary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
          className="min-w-[140px]" style={{ backgroundColor: colors.accent.violet }}>{current.btn}</Button>
      </motion.div>)}
    </section>);
}

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500)); t.push(setTimeout(() => setRevealed(2), 3000)); t.push(setTimeout(() => setRevealed(3), 4500));
    return () => t.forEach(clearTimeout); }, []);
  const notations = [
    { formula: "Perpendicular Bisector", desc: "Crosses segment at midpoint at 90\u00B0 \u2014 every point equidistant from endpoints", color: THEME.compass },
    { formula: "Angle Bisector", desc: "Ray that divides an angle into two equal angles", color: THEME.arc },
    { formula: "Perpendicular from a Point", desc: "Shortest distance from a point to a line is perpendicular", color: THEME.straightedge },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Construction Types</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4"
            style={{ backgroundColor: colors.bg.secondary, borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold text-base" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} color={colors.accent.violet} />}
    </section>);
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F4D0}", title: "Architecture", desc: "Architects use geometric constructions to ensure walls are perfectly perpendicular.", math: "Perpendicular lines" },
    { icon: "\u{1F3A8}", title: "Art & Design", desc: "Symmetrical designs use angle bisectors and perpendicular bisectors.", math: "Bisection" },
    { icon: "\u26F5", title: "Navigation", desc: "Triangulation uses the same principles as compass constructions.", math: "Equal arc intersections" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Real World Connections</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: colors.bg.secondary }}>
          <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
          <div><p className="font-semibold" style={{ color: colors.text.primary }}>{s.title}</p>
            <p className="text-sm" style={{ color: colors.text.secondary }}>{s.desc}</p>
            <p className="text-xs font-mono mt-1" style={{ color: colors.accent.violet }}>{s.math}</p></div>
        </motion.div>))}
      </div>
      <ContinueButton onClick={onComplete} delay={0.3} color={colors.accent.violet} />
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
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = colors.bg.surface;
          if (r === true) bg = colors.functional.success; else if (r === false) bg = colors.functional.error;
          return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${colors.accent.violet}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: colors.text.muted }}>{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: colors.text.primary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">{problem.options.map((opt) => { let bg: string = colors.bg.secondary; let border: string = colors.bg.surface;
          if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = colors.functional.success; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = colors.functional.error; } }
          else if (opt === selected) { bg = "#8b5cf633"; border = colors.accent.violet; }
          return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
            className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
            style={{ backgroundColor: bg, border: `2px solid ${border}`, color: colors.text.primary }}>{opt}</button>); })}</div>
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? colors.functional.success : colors.functional.error}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? colors.functional.success : colors.functional.error }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: colors.text.secondary }}>{problem.feedback}</p>
          </motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full" style={{ backgroundColor: colors.accent.violet, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>)
            : (<Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: colors.accent.violet }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}
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
        <h2 className="text-center font-bold mb-2" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why is it powerful to construct perfect shapes without any measurements? What does it prove?
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
            style={{ backgroundColor: colors.bg.secondary, color: colors.text.primary, border: `2px solid ${colors.bg.surface}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? colors.functional.success : colors.text.muted }}>{text.trim().length}/20 characters minimum</p>
        </>) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: colors.bg.secondary }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: colors.functional.success }}>Great thinking!</p>
          <p className="text-sm mt-1" style={{ color: colors.text.secondary }}>Reflecting on concepts deepens your understanding.</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: colors.accent.violet, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: colors.text.muted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: colors.accent.violet }}>Complete Lesson</Button></motion.div>)}
      </div>
    </section>);
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

export function ConstructionsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.11 Constructions" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onComplete={advance} />;
          case "spatial": return <SpatialStage onComplete={advance} />;
          case "discovery": return <DiscoveryStage onComplete={advance} />;
          case "symbol": return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld": return <RealWorldStage onComplete={advance} />;
          case "practice": return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
