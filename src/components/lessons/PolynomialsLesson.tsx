"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

const COLORS = {
  term: "#34d399", degree: "#f59e0b", classify: "#ec4899",
  bgPrimary: "#0f172a", bgSurface: "#1e293b", bgElevated: "#334155",
  textPrimary: "#f8fafc", textSecondary: "#e2e8f0", textMuted: "#94a3b8",
  success: "#34d399", error: "#f87171", primary: "#818cf8",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface PracticeProblem { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "How many terms does 3x\u00B2 + 5x \u2212 1 have?", options: ["2", "3", "4", "1"], correctAnswer: "3", feedback: "The three terms are 3x\u00B2, 5x, and \u22121." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "What is the degree of 7x\u00B3 + 2x?", options: ["2", "3", "7", "1"], correctAnswer: "3", feedback: "The highest exponent on x is 3, so the degree is 3." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "A polynomial with one term is called a:", options: ["Monomial", "Binomial", "Trinomial", "Constant"], correctAnswer: "Monomial", feedback: "Mono = one. A monomial has exactly one term, like 5x\u00B2." },
  { id: 4, layer: "Procedure", type: "multiple-choice", prompt: "Classify 4x + 7:", options: ["Monomial", "Binomial", "Trinomial", "Quadratic"], correctAnswer: "Binomial", feedback: "Two terms (4x and 7), so it's a binomial. Its degree is 1 (linear)." },
  { id: 5, layer: "Procedure", type: "multiple-choice", prompt: "What is the degree of the constant 5?", options: ["0", "1", "5", "Undefined"], correctAnswer: "0", feedback: "A constant like 5 = 5x\u2070. The degree is 0." },
  { id: 6, layer: "Procedure", type: "multiple-choice", prompt: "What is the leading coefficient of 2x\u00B3 \u2212 4x + 1?", options: ["1", "\u22124", "2", "3"], correctAnswer: "2", feedback: "The leading term is 2x\u00B3 (highest degree). Its coefficient is 2." },
  { id: 7, layer: "Understanding", type: "multiple-choice", prompt: "Is 3/x a polynomial?", options: ["Yes", "No"], correctAnswer: "No", feedback: "3/x = 3x\u207B\u00B9 has a negative exponent. Polynomials need whole number exponents." },
  { id: 8, layer: "Understanding", type: "multiple-choice", prompt: "A polynomial of degree 2 is called:", options: ["Linear", "Quadratic", "Cubic", "Quartic"], correctAnswer: "Quadratic", feedback: "Degree 1 = linear, degree 2 = quadratic, degree 3 = cubic." },
];

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number; }) {
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay }} className="w-full flex justify-center pt-4 pb-8">
    <Button size="lg" onClick={onClick} className="min-w-[160px]" style={{ backgroundColor: COLORS.primary }}>{label}</Button></motion.div>);
}
function InteractionDots({ count, total }: { count: number; total: number }) {
  return (<div className="flex items-center gap-1 justify-center">{Array.from({ length: total }, (_, i) => (
    <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 6, height: 6, backgroundColor: i < count ? COLORS.primary : COLORS.bgElevated }} />))}</div>);
}

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/PolynomialsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2200));
    t.push(setTimeout(() => setPhase(3), 3800)); t.push(setTimeout(() => setPhase(4), 5200));
    t.push(setTimeout(() => setPhase(5), 6500));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  const terms = [
    { coeff: "3", var: "x\u00B2", color: COLORS.term },
    { coeff: "+5", var: "x", color: COLORS.degree },
    { coeff: "\u22121", var: "", color: COLORS.classify },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <AnimatePresence>{phase >= 1 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4 font-medium"
          style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
          Polynomials are made of building blocks called terms
        </motion.p>
      )}</AnimatePresence>
      <div className="flex gap-3 mb-6">
        {terms.map((t, i) => (
          <AnimatePresence key={i}>{phase >= i + 2 && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
              className="rounded-xl px-4 py-3" style={{ backgroundColor: `${t.color}20`, border: `2px solid ${t.color}` }}>
              <span className="font-mono font-bold text-lg" style={{ color: t.color }}>{t.coeff}{t.var}</span>
            </motion.div>
          )}</AnimatePresence>
        ))}
      </div>
      <AnimatePresence>{phase >= 5 && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center font-bold"
          style={{ color: COLORS.primary, fontSize: "clamp(16px, 4vw, 22px)" }}>
          3x{"\u00B2"} + 5x {"\u2212"} 1 is a trinomial of degree 2
        </motion.p>
      )}</AnimatePresence>
      {phase >= 5 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [numTerms, setNumTerms] = useState(1);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const termData = [
    { label: "5x\u00B3", type: "Monomial" },
    { label: "5x\u00B3 + 2x", type: "Binomial" },
    { label: "5x\u00B3 + 2x \u2212 1", type: "Trinomial" },
    { label: "5x\u00B3 + 2x\u00B2 + 2x \u2212 1", type: "Polynomial (4 terms)" },
  ];
  const current = termData[numTerms - 1];

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <p className="text-center mb-3 font-medium" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Add terms to build a polynomial
      </p>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => { if (numTerms > 1) { setNumTerms((n) => n - 1); interact(); } }}
          className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>{"\u2212"}</button>
        <span className="font-mono font-bold text-xl" style={{ color: COLORS.primary }}>{numTerms} term{numTerms > 1 ? "s" : ""}</span>
        <button onClick={() => { if (numTerms < 4) { setNumTerms((n) => n + 1); interact(); } }}
          className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95"
          style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary }}>+</button>
      </div>
      {current && (
        <motion.div key={numTerms} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
          className="rounded-xl p-6 text-center w-full max-w-sm" style={{ backgroundColor: COLORS.bgSurface }}>
          <p className="font-mono font-bold text-xl mb-2" style={{ color: COLORS.term }}>{current.label}</p>
          <p className="font-bold" style={{ color: COLORS.classify }}>{current.type}</p>
          <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>Degree: 3 (highest exponent)</p>
        </motion.div>
      )}
      <div className="mt-4"><InteractionDots count={Math.min(interactions, 6)} total={6} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "A TERM is a number, a variable, or a number times variables with whole number exponents. Like 3x\u00B2 or \u22127.", btn: "I see it!" },
    { text: "The DEGREE of a term is the exponent on its variable. The degree of the polynomial is the highest term degree.", btn: "I see it!" },
    { text: "Classification: 1 term = monomial, 2 terms = binomial, 3 terms = trinomial. Also by degree: linear (1), quadratic (2), cubic (3).", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-3 justify-center">
          {["3x\u00B2", "5x", "\u22121", "7y\u00B3"].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15, ...SPRING }}
              className="rounded-xl px-3 py-2" style={{ backgroundColor: `${COLORS.term}20`, border: `2px solid ${COLORS.term}` }}>
              <span className="font-mono font-bold" style={{ color: COLORS.term }}>{t}</span>
            </motion.div>))}
        </motion.div>)}
        {step === 1 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 items-center">
          {[{t:"3x\u00B2",d:"degree 2"},{t:"5x",d:"degree 1"},{t:"\u22121",d:"degree 0"}].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-mono font-bold" style={{ color: COLORS.term }}>{item.t}</span>
              <span className="text-sm" style={{ color: COLORS.degree }}>{"\u2192"} {item.d}</span>
            </div>))}
        </motion.div>)}
        {step === 2 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 items-center">
          {[{name:"Monomial",ex:"5x\u00B3"},{name:"Binomial",ex:"x+1"},{name:"Trinomial",ex:"x\u00B2+3x\u22122"}].map((item, i) => (
            <div key={i} className="rounded-xl px-4 py-2" style={{ backgroundColor: `${COLORS.classify}15`, border: `1px solid ${COLORS.classify}` }}>
              <span className="font-bold text-sm" style={{ color: COLORS.classify }}>{item.name}: {item.ex}</span>
            </div>))}
        </motion.div>)}
      </div>
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
    t.push(setTimeout(() => setRevealed(1), 1200)); t.push(setTimeout(() => setRevealed(2), 2400));
    t.push(setTimeout(() => setRevealed(3), 3600)); t.push(setTimeout(() => setRevealed(4), 4800));
    return () => t.forEach(clearTimeout); }, []);
  const notations = [
    { formula: "Term = coefficient \u00D7 variable^exponent", desc: "Building block of polynomials", color: COLORS.term },
    { formula: "Degree = highest exponent", desc: "Determines the polynomial's behavior", color: COLORS.degree },
    { formula: "Standard form: descending degree order", desc: "3x\u00B3 + 2x\u00B2 \u2212 x + 5", color: COLORS.primary },
    { formula: "Leading coefficient = coefficient of highest term", desc: "In 3x\u00B3 + 2x\u00B2, leading coeff = 3", color: COLORS.classify },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Polynomial Vocabulary</h2>
      <div className="space-y-5 w-full max-w-md">
        {notations.map((n, i) => (<AnimatePresence key={i}>{revealed > i && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
            className="rounded-xl p-4" style={{ backgroundColor: COLORS.bgSurface, borderLeft: `4px solid ${n.color}` }}>
            <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>{n.desc}</p>
          </motion.div>)}</AnimatePresence>))}
      </div>
      {revealed >= 4 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { icon: "\u{1F3C0}", title: "Ball Trajectory", desc: "Height of a thrown ball is a quadratic polynomial", math: "h(t) = \u221216t\u00B2 + 40t + 5" },
    { icon: "\u{1F4C8}", title: "Revenue Models", desc: "Business revenue often follows polynomial patterns", math: "R(x) = \u2212x\u00B2 + 100x" },
    { icon: "\u{1F30D}", title: "Population Growth", desc: "Population curves can be modeled with polynomials", math: "P(t) = at\u00B3 + bt\u00B2 + ct + d" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Polynomials in Action</h2>
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
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));
  const problem = PRACTICE_PROBLEMS[currentQ]!; const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const isCorrect = selected === problem.correctAnswer;
  const handleSubmit = useCallback(() => { if (!selected) return; setSubmitted(true);
    setResults((prev) => { const next = [...prev]; next[currentQ] = selected === problem.correctAnswer; return next; }); }, [selected, currentQ, problem.correctAnswer]);
  const handleNext = useCallback(() => { if (isLast) { onComplete(); return; } setCurrentQ((q) => q + 1); setSelected(null); setSubmitted(false); }, [isLast, onComplete]);
  return (
    <section className="flex flex-1 flex-col px-4 pt-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => { const r = results[i]; let bg: string = COLORS.bgElevated;
          if (r === true) bg = COLORS.success; else if (r === false) bg = COLORS.error;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg, border: i === currentQ ? `2px solid ${COLORS.primary}` : "none" }} />; })}
      </div>
      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: COLORS.textMuted }}>{problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: COLORS.textPrimary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{problem.prompt}</p>
        <div className="space-y-2 w-full">{problem.options.map((opt) => {
          let bg: string = COLORS.bgSurface; let border: string = COLORS.bgElevated;
          if (submitted) { if (opt === problem.correctAnswer) { bg = "#34d39933"; border = COLORS.success; }
            else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = COLORS.error; } }
          else if (opt === selected) { bg = "#818cf833"; border = COLORS.primary; }
          return (<button key={opt} onClick={() => { if (!submitted) setSelected(opt); }} disabled={submitted}
            className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
            style={{ backgroundColor: bg, border: `2px solid ${border}`, color: COLORS.textPrimary }}>{opt}</button>); })}</div>
        <AnimatePresence>{submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
            style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120", border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}` }}>
            <p className="font-bold mb-1" style={{ color: isCorrect ? COLORS.success : COLORS.error }}>{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>{problem.feedback}</p></motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">{!submitted ? (
          <Button size="lg" onClick={handleSubmit} disabled={!selected} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: selected ? 1 : 0.4 }}>Check Answer</Button>
        ) : (<Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: COLORS.primary }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}</div>
      </motion.div>
    </section>
  );
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false); const canSubmit = text.trim().length >= 20;
  const handleSubmit = useCallback(() => { if (canSubmit) setSubmitted(true); }, [canSubmit]);
  const handleSkip = useCallback(() => { setSubmitted(true); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: COLORS.bgPrimary }} aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: COLORS.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: COLORS.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why do you think we classify polynomials by both the number of terms and the degree? How does this help?
        </p>
        {!submitted ? (<>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
            className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]" style={{ backgroundColor: COLORS.bgSurface, color: COLORS.textPrimary, border: `2px solid ${COLORS.bgElevated}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? COLORS.success : COLORS.textMuted }}>{text.trim().length}/20 characters minimum</p>
        </>) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: COLORS.bgSurface }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: COLORS.success }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>Reflecting on concepts deepens your understanding.</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">{!submitted ? (<>
        <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full" style={{ backgroundColor: COLORS.primary, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
        <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]" style={{ color: COLORS.textMuted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
      </>) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: COLORS.primary }}>Complete Lesson</Button></motion.div>)}</div>
    </section>
  );
}

export function PolynomialsLesson({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(0); const stage = STAGES[stageIdx] ?? ("hook" as Stage);
  const advanceStage = useCallback(() => { setStageIdx((i) => { const next = i + 1; if (next >= STAGES.length) { onComplete?.(); return i; } return next; }); }, [onComplete]);
  const handleReflectionComplete = useCallback(() => { onComplete?.(); }, [onComplete]);
  const stageProgress = ((stageIdx + 1) / STAGES.length) * 100;
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2" style={{ backgroundColor: `${COLORS.bgPrimary}e6`, borderBottom: `1px solid ${COLORS.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>AL-3.10 Polynomials</span>
          <span className="text-xs tabular-nums" style={{ color: COLORS.bgElevated }}>{stageIdx + 1}/{STAGES.length}</span></div>
        <ProgressBar value={stageProgress} variant="xp" size="sm" /></div>
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex flex-1 flex-col" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={SPRING_GENTLE}>
          {stage === "hook" && <HookStage onComplete={advanceStage} />}
          {stage === "spatial" && <SpatialStage onComplete={advanceStage} />}
          {stage === "discovery" && <DiscoveryStage onComplete={advanceStage} />}
          {stage === "symbol" && <SymbolBridgeStage onComplete={advanceStage} />}
          {stage === "realWorld" && <RealWorldStage onComplete={advanceStage} />}
          {stage === "practice" && <PracticeStage onComplete={advanceStage} />}
          {stage === "reflection" && <ReflectionStage onComplete={handleReflectionComplete} />}
        </motion.div></AnimatePresence></div>);
}
