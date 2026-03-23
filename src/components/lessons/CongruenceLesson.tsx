"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import { useCallback, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* -- Lesson-specific semantic colors (THEME) -- */
const THEME = {
  original: colors.functional.info,
  congruent: colors.accent.emerald,
  rigid: colors.accent.indigo,
} as const;

/* -- Aliases for shared tokens -- */
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const ELEVATED = colors.bg.surface;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

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

/* ------------------------------------------------------------------ */
/*  Stage components                                                   */
/* ------------------------------------------------------------------ */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/CongruenceHook.webm" onComplete={onContinue} />;

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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Congruent shapes overlay">
        {phase >= 1 && (
          <motion.polygon points="60,140 100,60 140,140" fill="none" stroke={THEME.original} strokeWidth={2}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        )}
        {phase >= 2 && (
          <motion.polygon points="180,140 220,60 260,140" fill="none" stroke={THEME.congruent} strokeWidth={2}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} />
        )}
        {phase >= 2 && (
          <motion.text x={160} y={165} textAnchor={"middle" as const} fill={TEXT} fontSize={14} fontWeight={600}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Same shape. Same size. {"\u2245"}
          </motion.text>
        )}
        {phase >= 3 && (
          <motion.text x={160} y={30} textAnchor={"middle" as const} fill={THEME.rigid} fontSize={18} fontWeight={700}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            Congruent!
          </motion.text>
        )}
      </svg>
      <AnimatePresence>
        {phase >= 3 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            If you can slide, flip, or turn one shape to match another exactly, they are congruent.
          </motion.p>
        )}
      </AnimatePresence>
      {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [motion_, setMotion] = useState<"translate" | "reflect" | "rotate">("translate");
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const origPts = "60,140 100,60 140,140";
  const transPts = motion_ === "translate" ? "180,140 220,60 260,140"
    : motion_ === "reflect" ? "260,140 220,60 180,140"
    : "180,60 260,100 180,140";

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Apply rigid motions and see that the shape stays congruent
      </p>
      <div className="flex gap-2 justify-center mb-3">
        {(["translate", "reflect", "rotate"] as const).map((m) => (
          <button key={m} onClick={() => { setMotion(m); interact(); }}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
            style={{ backgroundColor: motion_ === m ? THEME.rigid : SURFACE, color: TEXT }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Rigid motion demo">
        <polygon points={origPts} fill={`${THEME.original}33`} stroke={THEME.original} strokeWidth={2} />
        <text x={100} y={160} textAnchor={"middle" as const} fill={THEME.original} fontSize={11}>Original</text>
        <motion.polygon key={motion_} points={transPts} fill={`${THEME.congruent}33`} stroke={THEME.congruent} strokeWidth={2}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
        <text x={220} y={160} textAnchor={"middle" as const} fill={THEME.congruent} fontSize={11}>{"\u2245"} Congruent</text>
      </svg>
      <div className="rounded-xl p-3 w-full max-w-xs text-center mt-2 bg-nm-bg-secondary">
        <p className="font-mono text-sm" style={{ color: TEXT }}>
          Rigid motions {"\u2192"} same size & shape {"\u2192"} <span style={{ color: THEME.congruent }}>{"\u2245"}</span>
        </p>
      </div>
      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={PRIMARY} /></div>
      {canContinue && <ContinueButton onClick={onContinue} color={PRIMARY} />}
    </section>
  );
}

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Rigid motions (translate, reflect, rotate) don't stretch or shrink. The image is always congruent to the original.", btn: "I see it!" },
    { text: "For triangles, we have shortcuts: SSS, SAS, ASA, AAS. If these parts match, the triangles are congruent.", btn: "I see it!" },
    { text: "Corresponding parts of congruent figures are equal \u2014 every side and every angle matches up.", btn: "Got it!" },
  ], []);
  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox="0 0 260 100" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={50} textAnchor={"middle" as const} fill={THEME.rigid} fontSize={16} fontWeight={700}>
              Rigid Motion = Congruent
            </text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={35} textAnchor={"middle" as const} fill={THEME.congruent} fontSize={14} fontWeight={600}>Triangle shortcuts</text>
            <text x={130} y={60} textAnchor={"middle" as const} fill={TEXT_SEC} fontSize={12}>SSS {"\u2022"} SAS {"\u2022"} ASA {"\u2022"} AAS</text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={50} textAnchor={"middle" as const} fill={PRIMARY} fontSize={14} fontWeight={600}>
              CPCTC: Corresponding Parts are Equal
            </text>
          </motion.g>
        )}
      </svg>
      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
          <p className="font-medium mb-4" style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
          <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
            className="min-w-[140px]" style={{ backgroundColor: PRIMARY }}>{current.btn}</Button>
        </motion.div>
      )}
    </section>
  );
}

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500)); t.push(setTimeout(() => setRevealed(2), 3000)); t.push(setTimeout(() => setRevealed(3), 4500));
    return () => t.forEach(clearTimeout);
  }, []);
  const notations = [
    { formula: "\u25B3ABC \u2245 \u25B3DEF", desc: "Triangle ABC is congruent to triangle DEF", color: THEME.congruent },
    { formula: "SSS, SAS, ASA, AAS", desc: "Shortcuts to prove triangles congruent", color: THEME.original },
    { formula: "CPCTC", desc: "Corresponding Parts of Congruent Triangles are Congruent", color: THEME.rigid },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Congruence Notation</h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>{revealed > i && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4 bg-nm-bg-secondary"
              style={{ borderLeft: `4px solid ${n.color}` }}>
              <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
              <p className="text-sm mt-1" style={{ color: MUTED }}>{n.desc}</p>
            </motion.div>
          )}</AnimatePresence>
        ))}
      </div>
      {revealed >= 3 && <ContinueButton onClick={onContinue} delay={0.5} color={PRIMARY} />}
    </section>
  );
}

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F9E9}", title: "Puzzle Pieces", desc: "Each piece has a unique shape \u2014 only the congruent match fits.", math: "Congruent shapes" },
    { icon: "\u{1F3ED}", title: "Manufacturing", desc: "Factory parts must be congruent so they fit together perfectly.", math: "Quality control" },
    { icon: "\u{1FA9F}", title: "Tiling Patterns", desc: "Tiles are congruent copies that fit together without gaps.", math: "Tessellations" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Real World Connections</h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4 flex gap-3 items-start bg-nm-bg-secondary">
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
              <p className="text-sm" style={{ color: TEXT_SEC }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: PRIMARY }}>{s.math}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onContinue} delay={0.3} color={PRIMARY} />
    </section>
  );
}

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!selected) return; setSubmitted(true); setResults((p) => { const n = [...p]; n[currentQ] = selected === problem.correctAnswer; return n; }); }, [selected, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onContinue(); return; } setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false); }, [isLast, onContinue]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = ELEVATED; if (r === true) bg = SUCCESS; else if (r === false) bg = ERROR;
          return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${PRIMARY}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: MUTED }}>{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: TEXT, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">
          {problem.options.map((opt) => { let bg: string = SURFACE; let border: string = ELEVATED;
            if (submitted) { if (opt === problem.correctAnswer) { bg = `${colors.accent.emerald}33`; border = SUCCESS; } else if (opt === selected && opt !== problem.correctAnswer) { bg = `${colors.functional.error}33`; border = ERROR; } }
            else if (opt === selected) { bg = `${colors.accent.violet}33`; border = PRIMARY; }
            return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
              className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
              style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }}>{opt}</button>); })}
        </div>
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? `${colors.accent.emerald}20` : `${colors.functional.error}20`, border: `1px solid ${isCorrect ? SUCCESS : ERROR}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? SUCCESS : ERROR }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: TEXT_SEC }}>{problem.feedback}</p>
          </motion.div>
        )}</AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (<Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full" style={{ backgroundColor: PRIMARY, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>)
            : (<Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: PRIMARY }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}
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
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: TEXT_SEC, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why is congruence important in the real world? Think of an example where you need things to be exactly the same.
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px] bg-nm-bg-secondary"
            style={{ color: TEXT, border: `2px solid ${ELEVATED}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? SUCCESS : MUTED }}>{text.trim().length}/20 characters minimum</p>
        </>) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center bg-nm-bg-secondary">
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>Reflecting on concepts deepens your understanding.</p>
          </motion.div>
        )}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (<>
          <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
          <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
        </>) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>Complete Lesson</Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function CongruenceLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.9a Congruence" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
