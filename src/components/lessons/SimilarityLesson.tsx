"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

const COLORS = {
  original: "#60a5fa", similar: "#34d399", scale: "#f59e0b",
  bgPrimary: "#0f172a", bgSurface: "#1e293b", bgElevated: "#334155",
  textPrimary: "#f8fafc", textSecondary: "#e2e8f0", textMuted: "#94a3b8",
  success: "#34d399", error: "#f87171", primary: "#8b5cf6",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface PracticeProblem {
  id: number; layer: string; type: "multiple-choice" | "numeric-input";
  prompt: string; options?: string[]; correctAnswer: string; feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Similar figures have...",
    options: ["Same shape and size", "Same shape, different size", "Different shape, same size", "Nothing in common"],
    correctAnswer: "Same shape, different size", feedback: "Similar means same shape but possibly different sizes \u2014 all angles equal, sides proportional." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "Which transformation creates similar (not congruent) figures?",
    options: ["Translation", "Reflection", "Rotation", "Dilation"],
    correctAnswer: "Dilation", feedback: "A dilation changes the size while keeping the shape \u2014 making figures similar." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "The symbol for similar is...",
    options: ["=", "\u2245", "~", "\u2248"],
    correctAnswer: "~", feedback: "The tilde ~ means \"similar to\" in geometry." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "Triangle A has sides 3, 4, 5. Triangle B is similar with scale factor 2. What is B's longest side?",
    correctAnswer: "10", feedback: "Scale factor 2 means multiply each side by 2: 5 \u00D7 2 = 10." },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "Two similar rectangles: the first is 6 \u00D7 8, the second is 9 \u00D7 ?. Find the missing side.",
    correctAnswer: "12", feedback: "Scale factor = 9/6 = 1.5. So the missing side = 8 \u00D7 1.5 = 12." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "Triangles are similar by AA if...",
    options: ["Two angles of one equal two angles of the other", "Two sides are equal", "All sides are equal", "One angle is 90\u00B0"],
    correctAnswer: "Two angles of one equal two angles of the other",
    feedback: "AA (Angle-Angle): if two angles match, the third must too, making the triangles similar." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "If the scale factor between similar figures is 3, the ratio of their areas is...",
    options: ["3", "6", "9", "27"],
    correctAnswer: "9", feedback: "Area scales by the square of the scale factor: 3\u00B2 = 9." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "All circles are...",
    options: ["Congruent", "Similar", "Neither similar nor congruent", "Only similar if same radius"],
    correctAnswer: "Similar", feedback: "Any circle can be scaled (dilated) to match any other circle, so all circles are similar." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Are all squares similar?",
    options: ["Yes", "No"],
    correctAnswer: "Yes", feedback: "All squares have 4 right angles and can be scaled to match any other square. Same shape, any size." },
];

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay }}
    className="w-full flex justify-center pt-4 pb-8">
    <Button size="lg" onClick={onClick} className="min-w-[160px]" style={{ backgroundColor: COLORS.primary }}>{label}</Button>
  </motion.div>);
}

function InteractionDots({ count, total }: { count: number; total: number }) {
  return (<div className="flex items-center gap-1 justify-center">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 6, height: 6, backgroundColor: i < count ? COLORS.primary : COLORS.bgElevated }} />
    ))}
  </div>);
}

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/GE4_9bHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 4500)); t.push(setTimeout(() => setPhase(4), 6000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Similar triangles at different sizes">
        {phase >= 1 && (
          <motion.polygon points="40,160 80,60 120,160" fill="none" stroke={COLORS.original} strokeWidth={2}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        )}
        {phase >= 2 && (
          <motion.polygon points="160,160 220,20 280,160" fill="none" stroke={COLORS.similar} strokeWidth={2}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} />
        )}
        {phase >= 2 && (
          <motion.text x={160} y={185} textAnchor={"middle" as const} fill={COLORS.textPrimary} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Same shape, different size ~ Similar
          </motion.text>
        )}
        {phase >= 3 && (
          <motion.text x={160} y={15} textAnchor={"middle" as const} fill={COLORS.scale} fontSize={16} fontWeight={700}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            Scale factor connects them!
          </motion.text>
        )}
      </svg>
      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Dilations create similar figures {"\u2014"} the angles stay equal, only the size changes.
          </motion.p>
        )}
      </AnimatePresence>
      {phase >= 4 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [scaleFactor, setScaleFactor] = useState(2);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const origSides = [3, 4, 5];
  const scaledSides = origSides.map((s) => s * scaleFactor);
  const svgW = 300; const svgH = 220;
  const origScale = 15; const newScale = 15;
  const origPts = `60,${svgH - 40} ${60 + origSides[0]! * origScale},${svgH - 40} ${60 + origSides[0]! * origScale},${svgH - 40 - origSides[1]! * origScale}`;
  const sx = 170; const sy = svgH - 40;
  const newPts = `${sx},${sy} ${sx + scaledSides[0]! * newScale / scaleFactor},${sy} ${sx + scaledSides[0]! * newScale / scaleFactor},${sy - scaledSides[1]! * newScale / scaleFactor}`;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Change the scale factor and watch all sides change proportionally
      </p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Similar triangles interactive">
        <polygon points={origPts} fill={`${COLORS.original}33`} stroke={COLORS.original} strokeWidth={2} />
        <text x={80} y={svgH - 25} textAnchor={"middle" as const} fill={COLORS.original} fontSize={10}>
          {origSides[0]}, {origSides[1]}, {origSides[2]}
        </text>
        <motion.polygon key={scaleFactor} points={newPts} fill={`${COLORS.similar}33`} stroke={COLORS.similar} strokeWidth={2}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        <text x={200} y={svgH - 25} textAnchor={"middle" as const} fill={COLORS.similar} fontSize={10}>
          {scaledSides[0]}, {scaledSides[1]}, {scaledSides[2]}
        </text>
      </svg>

      <div className="w-full max-w-xs flex items-center gap-3 mb-2">
        <button onClick={() => { if (scaleFactor > 1) { setScaleFactor(scaleFactor - 1); interact(); } }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>{"\u2212"}</button>
        <div className="flex-1 text-center">
          <span className="font-mono font-bold tabular-nums text-lg" style={{ color: COLORS.scale }}>
            Scale: {"\u00D7"}{scaleFactor}
          </span>
        </div>
        <button onClick={() => { if (scaleFactor < 4) { setScaleFactor(scaleFactor + 1); interact(); } }}
          className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>+</button>
      </div>

      <div className="rounded-xl p-3 w-full max-w-xs" style={{ backgroundColor: COLORS.bgSurface }}>
        <div className="grid grid-cols-3 gap-2 text-sm text-center">
          <span style={{ color: COLORS.textMuted }}>Original</span>
          <span style={{ color: COLORS.textMuted }}>Scaled</span>
          <span style={{ color: COLORS.textMuted }}>Ratio</span>
          {origSides.map((s, i) => (
            <div key={i} className="contents">
              <span className="font-mono tabular-nums" style={{ color: COLORS.original }}>{s}</span>
              <span className="font-mono tabular-nums" style={{ color: COLORS.similar }}>{scaledSides[i]}</span>
              <span className="font-mono tabular-nums font-bold" style={{ color: COLORS.scale }}>{scaleFactor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Similar figures have equal angles and proportional sides. The ratio between corresponding sides is the scale factor.", btn: "I see it!" },
    { text: "AA similarity: if two angles match, the triangles are similar. (The third angle is forced to match too!)", btn: "I see it!" },
    { text: "If the scale factor is k, areas scale by k\u00B2 and volumes by k\u00B3!", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 260 100" className="w-full max-w-[260px] mb-6">
        {step === 0 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={130} y={50} textAnchor={"middle" as const} fill={COLORS.scale} fontSize={16} fontWeight={700}>Equal angles + proportional sides</text>
        </motion.g>)}
        {step === 1 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={130} y={40} textAnchor={"middle" as const} fill={COLORS.similar} fontSize={16} fontWeight={700}>AA Similarity</text>
          <text x={130} y={65} textAnchor={"middle" as const} fill={COLORS.textSecondary} fontSize={12}>Two matching angles is enough!</text>
        </motion.g>)}
        {step === 2 && (<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={130} y={35} textAnchor={"middle" as const} fill={COLORS.primary} fontSize={14} fontWeight={600}>Lengths: {"\u00D7"}k</text>
          <text x={130} y={60} textAnchor={"middle" as const} fill={COLORS.primary} fontSize={14} fontWeight={600}>Areas: {"\u00D7"}k{"\u00B2"}</text>
          <text x={130} y={85} textAnchor={"middle" as const} fill={COLORS.primary} fontSize={14} fontWeight={600}>Volumes: {"\u00D7"}k{"\u00B3"}</text>
        </motion.g>)}
      </svg>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: COLORS.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
          className="min-w-[140px]" style={{ backgroundColor: COLORS.primary }}>{current.btn}</Button>
      </motion.div>)}
    </section>
  );
}

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500)); t.push(setTimeout(() => setRevealed(2), 3000)); t.push(setTimeout(() => setRevealed(3), 4500));
    return () => t.forEach(clearTimeout); }, []);
  const notations = [
    { formula: "\u25B3ABC ~ \u25B3DEF", desc: "Triangle ABC is similar to triangle DEF", color: COLORS.similar },
    { formula: "AB/DE = BC/EF = AC/DF = k", desc: "All corresponding side ratios equal the scale factor", color: COLORS.scale },
    { formula: "AA, SAS~, SSS~", desc: "Shortcuts to prove similarity", color: COLORS.original },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Similarity Notation</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4"
            style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F5FA}\uFE0F", title: "Maps", desc: "A map is a similar figure to the real area \u2014 same shape, smaller size.", math: "Scale: 1:50,000" },
    { icon: "\u{1F4F7}", title: "Photo Resize", desc: "Resizing a photo keeps it similar \u2014 same proportions, different dimensions.", math: "Aspect ratio preserved" },
    { icon: "\u{1F3DB}\uFE0F", title: "Scale Models", desc: "Architects build similar miniatures of buildings before construction.", math: "Scale factor" },
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
    </section>
  );
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
        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2 w-full">{problem.options.map((opt) => { let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
            if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; } }
            else if (opt === selected) { bg = "#8b5cf633"; border = COLORS.primary; }
            return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
              className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
              style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>{opt}</button>); })}</div>)}
        {problem.type === "numeric-input" && (
          <input type="number" value={inputValue} onChange={(e) => { if (!submitted) setInputValue(e.target.value); }}
            disabled={submitted} placeholder="Enter your answer"
            className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary,
              border: `2px solid ${submitted ? (isCorrect ? COLORS.success : COLORS.error) : COLORS.bgElevated}`, outline: "none" }} />)}
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
    </section>
  );
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
          How is similarity different from congruence? Why is the scale factor so important?
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
            style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary, border: `2px solid ${COLORS.bgElevated}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? COLORS.success : COLORS.textMuted }}>{text.trim().length}/20 characters minimum</p>
        </>) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: COLORS.bgSurface }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: COLORS.success }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>Reflecting on concepts deepens your understanding.</p>
          </motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: COLORS.primary }}>Complete Lesson</Button>
        </motion.div>)}
      </div>
    </section>
  );
}

export function SimilarityLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0); const stage = STAGES[stageIdx] ?? ("hook" as Stage);
  const advanceStage = useCallback(() => { setStageIdx((i) => { const next = i + 1; if (next >= STAGES.length) { onComplete?.(); return i; } return next; }); }, [onComplete]);
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2" style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>GE-4.9b Similarity</span>
          <span className="text-xs tabular-nums" style={{ color: "#475569" }}>{stageIdx + 1}/{STAGES.length}</span>
        </div>
        <ProgressBar value={stageProgress} variant="xp" size="sm" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex flex-1 flex-col" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={SPRING_GENTLE}>
          {stage === "hook" && <HookStage onComplete={advanceStage} />}
          {stage === "spatial" && <SpatialStage onComplete={advanceStage} />}
          {stage === "discovery" && <DiscoveryStage onComplete={advanceStage} />}
          {stage === "symbol" && <SymbolBridgeStage onComplete={advanceStage} />}
          {stage === "realWorld" && <RealWorldStage onComplete={advanceStage} />}
          {stage === "practice" && <PracticeStage onComplete={advanceStage} />}
          {stage === "reflection" && <ReflectionStage onComplete={handleReflectionComplete} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
