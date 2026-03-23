"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/* ── Lesson-specific semantic colors ── */
const THEME = {
  gcf: colors.accent.emerald,
  dos: colors.accent.amber,
  trinomial: "#ec4899",
} as const;

interface PP { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }
const PROBLEMS: PP[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Factor: 6x + 12", options: ["6(x + 2)", "3(2x + 4)", "2(3x + 6)", "6(x + 12)"], correctAnswer: "6(x + 2)", feedback: "GCF of 6x and 12 is 6. Factor it out: 6(x + 2)." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "Factor: x\u00B2 \u2212 9", options: ["(x + 3)(x \u2212 3)", "(x \u2212 3)\u00B2", "(x + 9)(x \u2212 1)", "Cannot factor"], correctAnswer: "(x + 3)(x \u2212 3)", feedback: "Difference of squares: a\u00B2 \u2212 b\u00B2 = (a+b)(a\u2212b). Here a=x, b=3." },
  { id: 3, layer: "Procedure", type: "multiple-choice", prompt: "Factor: x\u00B2 + 5x + 6", options: ["(x + 2)(x + 3)", "(x + 1)(x + 6)", "(x + 5)(x + 1)", "(x + 3)\u00B2"], correctAnswer: "(x + 2)(x + 3)", feedback: "Find two numbers that multiply to 6 and add to 5: 2 and 3." },
  { id: 4, layer: "Procedure", type: "multiple-choice", prompt: "Factor: x\u00B2 \u2212 7x + 12", options: ["(x \u2212 3)(x \u2212 4)", "(x \u2212 2)(x \u2212 6)", "(x + 3)(x + 4)", "(x \u2212 12)(x + 1)"], correctAnswer: "(x \u2212 3)(x \u2212 4)", feedback: "Two numbers that multiply to 12 and add to \u22127: \u22123 and \u22124." },
  { id: 5, layer: "Procedure", type: "multiple-choice", prompt: "Factor: 4x\u00B2 \u2212 25", options: ["(2x + 5)(2x \u2212 5)", "(4x + 5)(x \u2212 5)", "(2x \u2212 5)\u00B2", "Cannot factor"], correctAnswer: "(2x + 5)(2x \u2212 5)", feedback: "Difference of squares: (2x)\u00B2 \u2212 5\u00B2 = (2x+5)(2x\u22125)." },
  { id: 6, layer: "Procedure", type: "multiple-choice", prompt: "Factor completely: 2x\u00B2 + 8x", options: ["2x(x + 4)", "x(2x + 8)", "2(x\u00B2 + 4x)", "4x(x + 2)"], correctAnswer: "2x(x + 4)", feedback: "GCF of 2x\u00B2 and 8x is 2x. Factor: 2x(x + 4)." },
  { id: 7, layer: "Understanding", type: "multiple-choice", prompt: "Factoring is the reverse of:", options: ["Multiplying (expanding)", "Adding", "Dividing", "Subtracting"], correctAnswer: "Multiplying (expanding)", feedback: "Expanding: (x+2)(x+3) = x\u00B2+5x+6. Factoring reverses this." },
  { id: 8, layer: "Understanding", type: "multiple-choice", prompt: "Can x\u00B2 + 4 be factored using real numbers?", options: ["No (sum of squares doesn't factor)", "Yes: (x+2)(x+2)", "Yes: (x+2)(x\u22122)"], correctAnswer: "No (sum of squares doesn't factor)", feedback: "x\u00B2 + 4 is a SUM of squares. Only DIFFERENCES of squares factor over the reals." },
];

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/FactoringHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 4000)); t.push(setTimeout(() => setPhase(4), 5500));
    t.push(setTimeout(() => setPhase(5), 7000));
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <AnimatePresence>{phase >= 1 && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4 font-medium"
        style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        Multiplying breaks things apart. Factoring puts them back together!
      </motion.p>)}</AnimatePresence>
      <AnimatePresence>{phase >= 2 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={springs.default} className="text-center mb-3">
        <p className="font-mono" style={{ color: colors.text.muted }}>Expand:</p>
        <p className="font-mono font-bold" style={{ color: THEME.dos, fontSize: "clamp(16px, 4vw, 22px)" }}>
          (x + 2)(x + 3) = x{"\u00B2"} + 5x + 6
        </p></motion.div>)}</AnimatePresence>
      <AnimatePresence>{phase >= 3 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={springs.default} className="text-center mb-3">
        <p className="font-mono" style={{ color: colors.text.muted }}>Factor (reverse!):</p>
        <p className="font-mono font-bold" style={{ color: THEME.trinomial, fontSize: "clamp(16px, 4vw, 22px)" }}>
          x{"\u00B2"} + 5x + 6 = (x + 2)(x + 3)
        </p></motion.div>)}</AnimatePresence>
      <AnimatePresence>{phase >= 4 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center font-bold"
        style={{ color: colors.accent.indigo, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        Factoring = finding what multiplies together to make your expression
      </motion.p>)}</AnimatePresence>
      {phase >= 5 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState(0);
  const [interactions, setInteractions] = useState(0); const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const examples = [
    { expr: "6x + 12", factored: "6(x + 2)", method: "GCF", color: THEME.gcf },
    { expr: "x\u00B2 \u2212 16", factored: "(x + 4)(x \u2212 4)", method: "Difference of Squares", color: THEME.dos },
    { expr: "x\u00B2 + 7x + 10", factored: "(x + 2)(x + 5)", method: "Trinomial", color: THEME.trinomial },
  ];
  const ex = examples[selected]!;
  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-3 font-medium" style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Tap to explore different factoring methods
      </p>
      <div className="flex gap-2 mb-4">{examples.map((e, i) => (
        <button key={i} onClick={() => { setSelected(i); interact(); }}
          className="rounded-lg px-3 py-2 font-medium text-sm min-h-[44px] min-w-[44px] transition-colors active:scale-95"
          style={{ backgroundColor: i === selected ? e.color : colors.bg.surface, color: i === selected ? colors.bg.primary : colors.text.primary }}>
          {e.method}</button>))}</div>
      <motion.div key={selected} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={springs.default}
        className="rounded-xl p-6 text-center w-full max-w-sm" style={{ backgroundColor: colors.bg.surface }}>
        <p className="text-sm mb-2" style={{ color: colors.text.muted }}>Method: {ex.method}</p>
        <p className="font-mono font-bold text-lg mb-1" style={{ color: colors.text.primary }}>{ex.expr}</p>
        <p className="text-lg" style={{ color: colors.text.muted }}>{"\u2193"}</p>
        <p className="font-mono font-bold text-lg" style={{ color: ex.color }}>{ex.factored}</p>
      </motion.div>
      <div className="mt-4"><InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={colors.accent.indigo} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "GCF Factoring: find the greatest common factor of all terms and pull it out. 6x + 12 = 6(x + 2).", btn: "I see it!" },
    { text: "Difference of Squares: a\u00B2 \u2212 b\u00B2 = (a + b)(a \u2212 b). Works when you have a perfect square minus a perfect square.", btn: "I see it!" },
    { text: "Trinomial Factoring: x\u00B2 + bx + c = (x + m)(x + n) where m \u00D7 n = c and m + n = b. Find two numbers!", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: colors.bg.surface }}>
          <p className="font-mono" style={{ color: THEME.gcf }}>6x + 12</p>
          <p className="font-mono text-xs mt-1" style={{ color: colors.text.muted }}>GCF = 6</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.gcf }}>= 6(x + 2)</p></motion.div>)}
        {step === 1 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: colors.bg.surface }}>
          <p className="font-mono" style={{ color: THEME.dos }}>x{"\u00B2"} {"\u2212"} 25</p>
          <p className="font-mono text-xs mt-1" style={{ color: colors.text.muted }}>= x{"\u00B2"} {"\u2212"} 5{"\u00B2"}</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.dos }}>= (x + 5)(x {"\u2212"} 5)</p></motion.div>)}
        {step === 2 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: colors.bg.surface }}>
          <p className="font-mono" style={{ color: THEME.trinomial }}>x{"\u00B2"} + 7x + 12</p>
          <p className="font-mono text-xs mt-1" style={{ color: colors.text.muted }}>3 {"\u00D7"} 4 = 12, 3 + 4 = 7</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.trinomial }}>= (x + 3)(x + 4)</p></motion.div>)}
      </div>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springs.default} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: colors.text.primary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
          className="min-w-[140px]" style={{ backgroundColor: colors.accent.indigo }}>{current.btn}</Button></motion.div>)}
    </section>
  );
}

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setRevealed(1), 1200)); t.push(setTimeout(() => setRevealed(2), 2400));
    t.push(setTimeout(() => setRevealed(3), 3600)); t.push(setTimeout(() => setRevealed(4), 4800));
    return () => t.forEach(clearTimeout); }, []);
  const n = [
    { formula: "GCF: ab + ac = a(b + c)", desc: "Pull out the common factor", color: THEME.gcf },
    { formula: "a\u00B2 \u2212 b\u00B2 = (a+b)(a\u2212b)", desc: "Difference of squares", color: THEME.dos },
    { formula: "x\u00B2 + bx + c = (x+m)(x+n)", desc: "m\u00D7n = c, m+n = b", color: THEME.trinomial },
    { formula: "Always check GCF first!", desc: "Factor out common factors before trying other methods", color: colors.accent.indigo },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Factoring Formulas</h2>
      <div className="space-y-5 w-full max-w-md">{n.map((item, i) => (<AnimatePresence key={i}>{revealed > i && (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={springs.default} className="rounded-xl p-4" style={{ backgroundColor: colors.bg.surface, borderLeft: `4px solid ${item.color}` }}>
          <p className="font-bold font-mono text-lg" style={{ color: item.color }}>{item.formula}</p>
          <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{item.desc}</p></motion.div>)}</AnimatePresence>))}</div>
      {revealed >= 4 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const s = [
    { icon: "\u{1F4D0}", title: "Area Problems", desc: "If area = x\u00B2 + 5x + 6, sides are (x+2) and (x+3)", math: "Factor to find dimensions" },
    { icon: "\u{1F3AF}", title: "Simplifying Fractions", desc: "Factor numerator and denominator to cancel", math: "(x\u00B2\u22121)/(x+1) = x\u22121" },
    { icon: "\u{1F9EE}", title: "Solving Equations", desc: "Factor, then set each factor = 0", math: "x\u00B2 \u2212 5x + 6 = 0 \u2192 x = 2 or 3" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Why Factor?</h2>
      <div className="space-y-4 w-full max-w-md">{s.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...springs.default }}
        className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: colors.bg.surface }}>
        <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
        <div><p className="font-semibold" style={{ color: colors.text.primary }}>{item.title}</p><p className="text-sm" style={{ color: colors.text.secondary }}>{item.desc}</p>
          <p className="text-xs font-mono mt-1" style={{ color: colors.accent.indigo }}>{item.math}</p></div></motion.div>))}</div>
      <ContinueButton onClick={onComplete} delay={0.3} />
    </section>
  );
}

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [cQ, setCQ] = useState(0); const [sel, setSel] = useState<string | null>(null); const [sub, setSub] = useState(false);
  const [res, setRes] = useState<Array<boolean | null>>(() => PROBLEMS.map(() => null));
  const p = PROBLEMS[cQ]!; const isLast = cQ === PROBLEMS.length - 1; const ok = sel === p.correctAnswer;
  const doSubmit = useCallback(() => { if (!sel) return; setSub(true); setRes((prev) => { const n = [...prev]; n[cQ] = sel === p.correctAnswer; return n; }); }, [sel, cQ, p.correctAnswer]);
  const doNext = useCallback(() => { if (isLast) { onComplete(); return; } setCQ((q) => q + 1); setSel(null); setSub(false); }, [isLast, onComplete]);
  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">{PROBLEMS.map((_, i) => { const r = res[i]; let bg: string = colors.bg.elevated;
        if (r === true) bg = colors.functional.success; else if (r === false) bg = colors.functional.error;
        return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === cQ ? `2px solid ${colors.accent.indigo}` : "none" }} />; })}</div>
      <motion.div key={cQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={springs.default} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: colors.text.muted }}>{p.layer} {"\u2022"} {cQ + 1}/{PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: colors.text.primary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{p.prompt}</p>
        <div className="space-y-2 w-full">{p.options.map((opt) => { let bg: string = colors.bg.surface; let brd: string = colors.bg.elevated;
          if (sub) { if (opt === p.correctAnswer) { bg = "#34d39933"; brd = colors.functional.success; } else if (opt === sel && opt !== p.correctAnswer) { bg = "#f8717133"; brd = colors.functional.error; } }
          else if (opt === sel) { bg = "#818cf833"; brd = colors.accent.indigo; }
          return (<button key={opt} onClick={() => { if (!sub) setSel(opt); }} disabled={sub} className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
            style={{ backgroundColor: bg, border: `2px solid ${brd}`, color: colors.text.primary }}>{opt}</button>); })}</div>
        <AnimatePresence>{sub && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={springs.default} className="mt-4 rounded-xl p-4 w-full"
          style={{ backgroundColor: ok ? "#34d39920" : "#f8717120", border: `1px solid ${ok ? colors.functional.success : colors.functional.error}` }}>
          <p className="font-bold mb-1" style={{ color: ok ? colors.functional.success : colors.functional.error }}>{ok ? "Correct!" : "Not quite"}</p>
          <p className="text-sm" style={{ color: colors.text.secondary }}>{p.feedback}</p></motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">{!sub ? (
          <Button size="lg" onClick={doSubmit} disabled={!sel} className="w-full" style={{ backgroundColor: colors.accent.indigo, opacity: sel ? 1 : 0.4 }}>Check Answer</Button>
        ) : (<Button size="lg" onClick={doNext} className="w-full" style={{ backgroundColor: colors.accent.indigo }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}</div>
      </motion.div>
    </section>
  );
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false); const canSubmit = text.trim().length >= 20;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springs.default} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: colors.text.primary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: colors.text.secondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>How is factoring like finding the prime factors of a number? What strategy do you use to factor a trinomial?</p>
        {!submitted ? (<><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
          className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]" style={{ backgroundColor: colors.bg.surface, color: colors.text.primary, border: `2px solid ${colors.bg.elevated}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? colors.functional.success : colors.text.muted }}>{text.trim().length}/20 characters minimum</p></>
        ) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={springs.default} className="rounded-xl p-6 text-center" style={{ backgroundColor: colors.bg.surface }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: colors.functional.success }}>Great thinking!</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">{!submitted ? (<>
        <Button size="lg" onClick={() => { if (canSubmit) setSubmitted(true); }} disabled={!canSubmit} className="w-full" style={{ backgroundColor: colors.accent.indigo, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
        <button onClick={() => setSubmitted(true)} className="w-full text-center py-2 min-h-[44px]" style={{ color: colors.text.muted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
      </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: colors.accent.indigo }}>Complete Lesson</Button></motion.div>)}</div>
    </section>
  );
}

export function FactoringLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="AL-3.11 Factoring" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
