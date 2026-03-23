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
  translate: colors.functional.info,
  reflect: "#f59e0b",
  rotate: colors.accent.emerald,
  dilate: colors.accent.indigo,
} as const;

const SPRING = springs.default;

type TransformType = "translate" | "reflect" | "rotate" | "dilate";

interface PracticeProblem {
  id: number; layer: string; type: "multiple-choice";
  prompt: string; options: string[]; correctAnswer: string; feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "A translation is...",
    options: ["A slide", "A flip", "A turn", "A resize"],
    correctAnswer: "A slide",
    feedback: "A translation slides every point the same distance in the same direction." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "A reflection is...",
    options: ["A slide", "A flip over a line", "A turn around a point", "A stretch"],
    correctAnswer: "A flip over a line",
    feedback: "A reflection flips a figure over a line of reflection, like a mirror." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "A rotation is...",
    options: ["A slide", "A flip", "A turn around a fixed point", "A resize"],
    correctAnswer: "A turn around a fixed point",
    feedback: "A rotation turns a figure around a center point by a specified angle." },
  { id: 4, layer: "Procedure", type: "multiple-choice",
    prompt: "Point (3, 2) is translated by (4, \u22121). Where does it land?",
    options: ["(7, 1)", "(7, 3)", "(\u22121, 3)", "(3, 4)"],
    correctAnswer: "(7, 1)",
    feedback: "(3+4, 2+(\u22121)) = (7, 1). Add the translation vector to each coordinate." },
  { id: 5, layer: "Procedure", type: "multiple-choice",
    prompt: "Point (5, 3) is reflected over the y-axis. Where does it land?",
    options: ["(\u22125, 3)", "(5, \u22123)", "(\u22125, \u22123)", "(3, 5)"],
    correctAnswer: "(\u22125, 3)",
    feedback: "Reflecting over the y-axis negates the x-coordinate: (5, 3) \u2192 (\u22125, 3)." },
  { id: 6, layer: "Procedure", type: "multiple-choice",
    prompt: "Point (2, 0) is rotated 90\u00B0 counterclockwise around the origin. Where does it land?",
    options: ["(0, 2)", "(0, \u22122)", "(\u22122, 0)", "(2, 2)"],
    correctAnswer: "(0, 2)",
    feedback: "90\u00B0 CCW: (x, y) \u2192 (\u2212y, x). So (2, 0) \u2192 (0, 2)." },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "Which transformations preserve the size and shape of a figure?",
    options: ["Translations only", "Translations, reflections, and rotations", "All four including dilations", "Only rotations"],
    correctAnswer: "Translations, reflections, and rotations",
    feedback: "These three are rigid motions \u2014 they keep size and shape. Dilations change size." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "A dilation with scale factor 2 makes a figure...",
    options: ["Twice as big", "Half as big", "The same size", "Rotated 180\u00B0"],
    correctAnswer: "Twice as big",
    feedback: "Scale factor > 1 enlarges. Factor 2 doubles all lengths." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "If you translate a square, then rotate it, the final shape is...",
    options: ["A different shape", "Still a congruent square", "A larger square", "A rectangle"],
    correctAnswer: "Still a congruent square",
    feedback: "Translations and rotations are rigid motions, so the result is always congruent to the original." },
];

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/TransformationsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800));
    t.push(setTimeout(() => setPhase(2), 2200));
    t.push(setTimeout(() => setPhase(3), 3800));
    t.push(setTimeout(() => setPhase(4), 5500));
    t.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox="0 0 320 200" className="w-full max-w-md" aria-label="Four transformations">
        <polygon points="80,120 120,60 160,120" fill="none" stroke={colors.text.secondary} strokeWidth={2} />
        <text x={120} y={145} textAnchor={"middle" as const} fill={colors.text.secondary} fontSize={10}>Original</text>

        {phase >= 1 && (
          <motion.g initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}>
            <polygon points="200,120 240,60 280,120" fill="none" stroke={THEME.translate} strokeWidth={2} />
            <text x={240} y={145} textAnchor={"middle" as const} fill={THEME.translate} fontSize={10}>Slide</text>
          </motion.g>
        )}

        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING}>
            <polygon points="80,180 120,240 160,180" fill="none" stroke={THEME.reflect} strokeWidth={2} />
            <text x={120} y={255} textAnchor={"middle" as const} fill={THEME.reflect} fontSize={10}>Flip</text>
          </motion.g>
        )}

        {phase >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING}>
            <polygon points="220,180 180,220 220,240" fill="none" stroke={THEME.rotate} strokeWidth={2} />
            <text x={210} y={255} textAnchor={"middle" as const} fill={THEME.rotate} fontSize={10}>Turn</text>
          </motion.g>
        )}

        {phase >= 4 && (
          <motion.text x={160} y={25} textAnchor={"middle" as const}
            fill={colors.text.primary} fontSize={16} fontWeight={700}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Move shapes without changing them
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Slide, flip, turn, resize {"\u2014"} four ways to transform figures.
          </motion.p>
        )}
      </AnimatePresence>
      {phase >= 5 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [transform, setTransform] = useState<TransformType>("translate");
  const [param, setParam] = useState(2);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  const svgW = 300; const svgH = 280;
  const gridSize = 20; const ox = 150; const oy = 140;
  const origPts: [number, number][] = [[1, 1], [3, 1], [2, 3]];

  const transformed = useMemo(() => {
    return origPts.map(([px, py]) => {
      switch (transform) {
        case "translate": return [px + param, py] as [number, number];
        case "reflect": return [-px, py] as [number, number];
        case "rotate": {
          const rad = (param * 45 * Math.PI) / 180;
          return [
            Math.round((px * Math.cos(rad) - py * Math.sin(rad)) * 100) / 100,
            Math.round((px * Math.sin(rad) + py * Math.cos(rad)) * 100) / 100,
          ] as [number, number];
        }
        case "dilate": return [px * param, py * param] as [number, number];
      }
    });
  }, [transform, param]);

  const toSvg = (gx: number, gy: number): [number, number] => [ox + gx * gridSize, oy - gy * gridSize];
  const origSvg = origPts.map(([x, y]) => toSvg(x, y));
  const transSvg = transformed.map(([x, y]) => toSvg(x, y));
  const tColor = transform === "translate" ? THEME.translate : transform === "reflect" ? THEME.reflect
    : transform === "rotate" ? THEME.rotate : THEME.dilate;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Pick a transformation and adjust the parameter
      </p>

      <div className="flex gap-1 justify-center mb-2 flex-wrap">
        {(["translate", "reflect", "rotate", "dilate"] as const).map((t) => {
          const c = t === "translate" ? THEME.translate : t === "reflect" ? THEME.reflect
            : t === "rotate" ? THEME.rotate : THEME.dilate;
          return (
            <button key={t} onClick={() => { setTransform(t); setParam(t === "dilate" ? 2 : t === "rotate" ? 1 : 2); interact(); }}
              className="rounded-lg px-3 py-2 text-xs font-medium transition-colors min-h-[44px] min-w-[44px]"
              style={{ backgroundColor: transform === t ? c : colors.bg.secondary, color: colors.text.primary }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          );
        })}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label="Coordinate plane with transformation">
        {Array.from({ length: 15 }, (_, i) => i - 7).map((v) => (
          <g key={v}>
            <line x1={ox + v * gridSize} y1={0} x2={ox + v * gridSize} y2={svgH} stroke={colors.bg.surface} strokeWidth={0.5} />
            <line x1={0} y1={oy - v * gridSize} x2={svgW} y2={oy - v * gridSize} stroke={colors.bg.surface} strokeWidth={0.5} />
          </g>
        ))}
        <line x1={0} y1={oy} x2={svgW} y2={oy} stroke={colors.text.secondary} strokeWidth={1} />
        <line x1={ox} y1={0} x2={ox} y2={svgH} stroke={colors.text.secondary} strokeWidth={1} />

        {transform === "reflect" && (
          <line x1={ox} y1={0} x2={ox} y2={svgH} stroke={THEME.reflect} strokeWidth={2} strokeDasharray="6,4" />
        )}

        <polygon points={origSvg.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="#94a3b833" stroke={colors.text.secondary} strokeWidth={2} />
        <motion.polygon key={`${transform}-${param}`}
          points={transSvg.map(([x, y]) => `${x},${y}`).join(" ")}
          fill={`${tColor}33`} stroke={tColor} strokeWidth={2}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SPRING} />
      </svg>

      {transform !== "reflect" && (
        <div className="w-full max-w-xs flex items-center gap-3 mb-2">
          <button onClick={() => { const min = transform === "dilate" ? 1 : -3; if (param > min) { setParam(param - 1); interact(); } }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
            style={{ backgroundColor: colors.bg.secondary, color: colors.text.primary }}>{"\u2212"}</button>
          <div className="flex-1 text-center">
            <span className="font-mono font-bold tabular-nums" style={{ color: colors.text.primary }}>
              {transform === "translate" ? `(${param}, 0)` : transform === "rotate" ? `${param * 45}\u00B0` : `\u00D7${param}`}
            </span>
          </div>
          <button onClick={() => { if (param < 4) { setParam(param + 1); interact(); } }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
            style={{ backgroundColor: colors.bg.secondary, color: colors.text.primary }}>+</button>
        </div>
      )}

      <div className="mt-3"><InteractionDots count={Math.min(interactions, 8)} total={8} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Translations, reflections, and rotations are rigid motions \u2014 the shape stays exactly the same size.", btn: "I see it!" },
    { text: "Dilations change the size but keep the shape. Scale factor > 1 enlarges, < 1 shrinks.", btn: "I see it!" },
    { text: "You can combine transformations! Translate then reflect, or rotate then dilate.", btn: "Got it!" },
  ], []);
  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <svg viewBox="0 0 260 100" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={30} textAnchor={"middle" as const} fill={THEME.translate} fontSize={14} fontWeight={600}>Rigid Motions</text>
            <text x={130} y={55} textAnchor={"middle" as const} fill={colors.text.secondary} fontSize={12}>Same size + same shape = congruent</text>
            <text x={130} y={80} textAnchor={"middle" as const} fill={colors.text.muted} fontSize={11}>Translate {"\u2022"} Reflect {"\u2022"} Rotate</text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <polygon points="30,80 60,30 90,80" fill="none" stroke={colors.text.secondary} strokeWidth={1.5} />
            <polygon points="140,80 200,30 260,80" fill="none" stroke={THEME.dilate} strokeWidth={2} />
            <text x={130} y={95} textAnchor={"middle" as const} fill={THEME.dilate} fontSize={12} fontWeight={600}>Same shape, different size</text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={50} textAnchor={"middle" as const} fill={colors.accent.violet} fontSize={14} fontWeight={600}>Combine them!</text>
            <text x={130} y={75} textAnchor={"middle" as const} fill={colors.text.muted} fontSize={11}>Translate + Rotate = still rigid</text>
          </motion.g>
        )}
      </svg>

      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={SPRING} className="max-w-md text-center px-4">
          <p className="font-medium mb-4" style={{ color: colors.text.primary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
          <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
            className="min-w-[140px]" style={{ backgroundColor: colors.accent.violet }}>{current.btn}</Button>
        </motion.div>
      )}
    </section>
  );
}

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1500));
    t.push(setTimeout(() => setRevealed(2), 3000));
    t.push(setTimeout(() => setRevealed(3), 4500));
    t.push(setTimeout(() => setRevealed(4), 6000));
    return () => t.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "T(a,b): (x,y) \u2192 (x+a, y+b)", desc: "Translation by vector (a, b)", color: THEME.translate },
    { formula: "r(y-axis): (x,y) \u2192 (\u2212x, y)", desc: "Reflection over the y-axis", color: THEME.reflect },
    { formula: "R(90\u00B0): (x,y) \u2192 (\u2212y, x)", desc: "90\u00B0 counterclockwise rotation", color: THEME.rotate },
    { formula: "D(k): (x,y) \u2192 (kx, ky)", desc: "Dilation with scale factor k", color: THEME.dilate },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Transformation Notation
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4" style={{ backgroundColor: colors.bg.secondary, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-base" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{n.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= 4 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F3AE}", title: "Video Games", desc: "Characters translate across the screen, rotate to aim, and scale up when powered up.", math: "T + R + D" },
    { icon: "\u{1FA9E}", title: "Mirrors", desc: "Your mirror image is a reflection \u2014 same shape, flipped across a line.", math: "Reflection" },
    { icon: "\u{1F5FA}\uFE0F", title: "Maps & Zoom", desc: "Zooming in/out is a dilation \u2014 same shape, different size.", math: "Dilation" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Real World Connections
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }}
            className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: colors.bg.secondary }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: colors.text.primary }}>{s.title}</p>
              <p className="text-sm" style={{ color: colors.text.secondary }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: colors.accent.violet }}>{s.math}</p>
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
  const problem = PRACTICE_PROBLEMS[currentQ]!;
  const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;

  const handleSubmit = useCallback(() => {
    if (!selected) return; setSubmitted(true);
    setResults((prev) => { const next = [...prev]; next[currentQ] = selected === problem.correctAnswer; return next; });
  }, [selected, currentQ, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false);
  }, [isLast, onComplete]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i]; let bg: string = colors.bg.surface;
          if (r === true) bg = colors.functional.success; else if (r === false) bg = colors.functional.error;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${colors.accent.violet}` : "none" }} />;
        })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: colors.text.muted }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: colors.text.primary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">
          {problem.options.map((opt) => {
            let bg: string = colors.bg.secondary; let border: string = colors.bg.surface;
            if (submitted) {
              if (opt === problem.correctAnswer) { bg = "#34d39933"; border = colors.functional.success; }
              else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = colors.functional.error; }
            } else if (opt === selected) { bg = "#8b5cf633"; border = colors.accent.violet; }
            return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
              className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
              style={{ backgroundColor: bg, border: `2px solid ${border}`, color: colors.text.primary }}>{opt}</button>);
          })}
        </div>
        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? colors.functional.success : colors.functional.error}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? colors.functional.success : colors.functional.error }}>{isCorrect ? "Correct!" : "Not quite"}</p>
              <p className="text-sm" style={{ color: colors.text.secondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full"
              style={{ backgroundColor: colors.accent.violet, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: colors.accent.violet }}>
              {isLast ? "Continue" : "Next \u2192"}</Button>
          )}
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
        <h2 className="text-center font-bold mb-2" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          What is the difference between rigid motions and dilations? Give an example of each from everyday life.
        </p>
        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: colors.bg.secondary, color: colors.text.primary, border: `2px solid ${colors.bg.surface}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? colors.functional.success : colors.text.muted }}>
              {text.trim().length}/20 characters minimum</p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
            className="rounded-xl p-6 text-center" style={{ backgroundColor: colors.bg.secondary }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: colors.functional.success }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: colors.text.secondary }}>Reflecting on concepts deepens your understanding.</p>
          </motion.div>
        )}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: colors.accent.violet, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: colors.text.muted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: colors.accent.violet }}>Complete Lesson</Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function TransformationsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.9 Transformations" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
