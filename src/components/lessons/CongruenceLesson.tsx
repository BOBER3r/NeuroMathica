"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

const COLORS = {
  original: "#60a5fa", congruent: "#34d399", rigid: "#818cf8",
  bgPrimary: "#0f172a", bgSurface: "#1e293b", bgElevated: "#334155",
  textPrimary: "#f8fafc", textSecondary: "#e2e8f0", textMuted: "#94a3b8",
  success: "#34d399", error: "#f87171", primary: "#8b5cf6",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface PracticeProblem {
  id: number; layer: string; type: "multiple-choice";
  prompt: string; options: string[]; correctAnswer: string; feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Two figures are congruent if they have...",
    options: ["The same color", "The same shape and size", "The same number of sides", "The same area only"],
    correctAnswer: "The same shape and size",
    feedback: "Congruent means identical in shape AND size \u2014 one can be placed exactly on top of the other." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "Which transformations produce congruent figures?",
    options: ["Only translations", "Translations, reflections, and rotations", "Only dilations", "All transformations"],
    correctAnswer: "Translations, reflections, and rotations",
    feedback: "These are rigid motions \u2014 they preserve size and shape, producing congruent figures." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "Congruent is written as...",
    options: ["\u2245", "~", "=", "\u2248"],
    correctAnswer: "\u2245",
    feedback: "The symbol \u2245 means congruent (equal sign with a tilde on top)." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Triangle ABC has sides 3, 4, 5. Triangle DEF has sides 3, 4, 5. Are they congruent?",
    options: ["Yes, by SSS", "No, angles might differ", "Need more information", "Only if they look the same"],
    correctAnswer: "Yes, by SSS",
    feedback: "If all three sides match (SSS), the triangles must be congruent." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Which is NOT a valid congruence shortcut for triangles?",
    options: ["SSS", "SAS", "ASA", "SSA"],
    correctAnswer: "SSA",
    feedback: "SSA (or ASS) is the ambiguous case \u2014 it doesn't guarantee congruence." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "If \u25B3ABC \u2245 \u25B3XYZ, then angle A equals...",
    options: ["Angle X", "Angle Y", "Angle Z", "Cannot tell"],
    correctAnswer: "Angle X",
    feedback: "Corresponding parts match in order: A\u2194X, B\u2194Y, C\u2194Z." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Why does a dilation NOT produce a congruent figure?",
    options: ["It changes the shape", "It changes the size", "It changes the angles", "It reverses the figure"],
    correctAnswer: "It changes the size",
    feedback: "Dilations change all lengths by a scale factor, so the result is a different size (similar, not congruent)." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "Two figures have the same area. Are they necessarily congruent?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    feedback: "A 2\u00D78 rectangle and a 4\u00D74 square both have area 16, but they are not congruent." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "A figure is translated 5 units right, then reflected over the x-axis. The result is...",
    options: ["Congruent to the original", "Similar but not congruent", "A completely different shape", "Larger than the original"],
    correctAnswer: "Congruent to the original",
    feedback: "Both translation and reflection are rigid motions. Any sequence of rigid motions gives a congruent figure." },
];

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="w-full flex justify-center pt-4 pb-8">
      <Button size="lg" onClick={onClick} className="min-w-[160px]" style={{ backgroundColor: COLORS.primary }}>{label}</Button>
    </motion.div>
  );
}

function InteractionDots({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="rounded-full transition-colors duration-200"
          style={{ width: 6, height: 6, backgroundColor: i < count ? COLORS.primary : COLORS.bgElevated }} />
      ))}
    </div>
  );
}

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/CongruenceHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800));
    t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 4500));
    t.push(setTimeout(() => setPhase(4), 6000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Congruent shapes overlay">
        {phase >= 1 && (
          <motion.polygon points="60,140 100,60 140,140" fill="none" stroke={COLORS.original} strokeWidth={2}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        )}
        {phase >= 2 && (
          <motion.polygon points="180,140 220,60 260,140" fill="none" stroke={COLORS.congruent} strokeWidth={2}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} />
        )}
        {phase >= 2 && (
          <motion.text x={160} y={165} textAnchor={"middle" as const} fill={COLORS.textPrimary} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Same shape. Same size. {"\u2245"}
          </motion.text>
        )}
        {phase >= 3 && (
          <motion.text x={160} y={30} textAnchor={"middle" as const} fill={COLORS.rigid} fontSize={18} fontWeight={700}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            Congruent!
          </motion.text>
        )}
      </svg>
      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            If you can slide, flip, or turn one shape to match another exactly, they are congruent.
          </motion.p>
        )}
      </AnimatePresence>
      {phase >= 4 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [motion_, setMotion] = useState<"translate" | "reflect" | "rotate">("translate");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const origPts = "60,140 100,60 140,140";
  const transPts = motion_ === "translate" ? "180,140 220,60 260,140"
    : motion_ === "reflect" ? "260,140 220,60 180,140"
    : "180,60 260,100 180,140";

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Apply rigid motions and see that the shape stays congruent
      </p>
      <div className="flex gap-2 justify-center mb-3">
        {(["translate", "reflect", "rotate"] as const).map((m) => (
          <button key={m} onClick={() => { setMotion(m); interact(); }}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{ backgroundColor: motion_ === m ? COLORS.rigid : COLORS.bgSurface, color: COLORS.textPrimary }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Rigid motion demo">
        <polygon points={origPts} fill={`${COLORS.original}33`} stroke={COLORS.original} strokeWidth={2} />
        <text x={100} y={160} textAnchor={"middle" as const} fill={COLORS.original} fontSize={11}>Original</text>
        <motion.polygon key={motion_} points={transPts} fill={`${COLORS.congruent}33`} stroke={COLORS.congruent} strokeWidth={2}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        <text x={220} y={160} textAnchor={"middle" as const} fill={COLORS.congruent} fontSize={11}>{"\u2245"} Congruent</text>
      </svg>
      <div className="rounded-xl p-3 w-full max-w-xs text-center mt-2" style={{ backgroundColor: COLORS.bgSurface }}>
        <p className="font-mono text-sm" style={{ color: COLORS.textPrimary }}>
          Rigid motions {"\u2192"} same size & shape {"\u2192"} <span style={{ color: COLORS.congruent }}>{"\u2245"}</span>
        </p>
      </div>
      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Rigid motions (translate, reflect, rotate) don't stretch or shrink. The image is always congruent to the original.", btn: "I see it!" },
    { text: "For triangles, we have shortcuts: SSS, SAS, ASA, AAS. If these parts match, the triangles are congruent.", btn: "I see it!" },
    { text: "Corresponding parts of congruent figures are equal \u2014 every side and every angle matches up.", btn: "Got it!" },
  ], []);
  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <svg viewBox="0 0 260 100" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={50} textAnchor={"middle" as const} fill={COLORS.rigid} fontSize={16} fontWeight={700}>
              Rigid Motion = Congruent
            </text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={35} textAnchor={"middle" as const} fill={COLORS.congruent} fontSize={14} fontWeight={600}>Triangle shortcuts</text>
            <text x={130} y={60} textAnchor={"middle" as const} fill={COLORS.textSecondary} fontSize={12}>SSS {"\u2022"} SAS {"\u2022"} ASA {"\u2022"} AAS</text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={50} textAnchor={"middle" as const} fill={COLORS.primary} fontSize={14} fontWeight={600}>
              CPCTC: Corresponding Parts are Equal
            </text>
          </motion.g>
        )}
      </svg>
      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
          <p className="font-medium mb-4" style={{ color: COLORS.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
          <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
            className="min-w-[140px]" style={{ backgroundColor: COLORS.primary }}>{current.btn}</Button>
        </motion.div>
      )}
    </section>
  );
}

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500)); t.push(setTimeout(() => setRevealed(2), 3000)); t.push(setTimeout(() => setRevealed(3), 4500));
    return () => t.forEach(clearTimeout);
  }, []);
  const notations = [
    { formula: "\u25B3ABC \u2245 \u25B3DEF", desc: "Triangle ABC is congruent to triangle DEF", color: COLORS.congruent },
    { formula: "SSS, SAS, ASA, AAS", desc: "Shortcuts to prove triangles congruent", color: COLORS.original },
    { formula: "CPCTC", desc: "Corresponding Parts of Congruent Triangles are Congruent", color: COLORS.rigid },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Congruence Notation</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>{revealed > i && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4"
              style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
              <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
              <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>{n.desc}</p>
            </motion.div>
          )}</AnimatePresence>
        ))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F9E9}", title: "Puzzle Pieces", desc: "Each piece has a unique shape \u2014 only the congruent match fits.", math: "Congruent shapes" },
    { icon: "\u{1F3ED}", title: "Manufacturing", desc: "Factory parts must be congruent so they fit together perfectly.", math: "Quality control" },
    { icon: "\u{1FA9F}", title: "Tiling Patterns", desc: "Tiles are congruent copies that fit together without gaps.", math: "Tessellations" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Real World Connections</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: COLORS.bgSurface }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: COLORS.textPrimary }}>{s.title}</p>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: COLORS.primary }}>{s.math}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onComplete} delay={0.3} />
    </section>
  );
}

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!selected) return; setSubmitted(true); setResults((p) => { const n = [...p]; n[currentQ] = selected === problem.correctAnswer; return n; }); }, [selected, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onComplete(); return; } setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false); }, [isLast, onComplete]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = COLORS.bgElevated; if (r === true) bg = COLORS.success; else if (r === false) bg = COLORS.error;
          return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${COLORS.primary}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: COLORS.textMuted }}>{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: COLORS.textPrimary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">
          {problem.options.map((opt) => { let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
            if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; } else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; } }
            else if (opt === selected) { bg = "#8b5cf633"; border = COLORS.primary; }
            return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
              className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
              style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>{opt}</button>); })}
        </div>
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? COLORS.success : COLORS.error }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>{problem.feedback}</p>
          </motion.div>
        )}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>)
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
          Why is congruence important in the real world? Think of an example where you need things to be exactly the same.
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
          </motion.div>
        )}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: COLORS.primary }}>Complete Lesson</Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function CongruenceLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx] ?? ("hook" as Stage);
  const advanceStage = useCallback(() => { setStageIdx((i) => { const next = i + 1; if (next >= STAGES.length) { onComplete?.(); return i; } return next; }); }, [onComplete]);
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2" style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>GE-4.9a Congruence</span>
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
