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

/* ── Lesson-specific semantic colors (maps to shared tokens where possible) ── */
const THEME = {
  add: colors.accent.emerald,
  sub: colors.functional.info,
  mult: "#f59e0b",               // lesson-specific amber (differs from token amber #fbbf24)
  bgPrimary: colors.bg.primary,
  bgSurface: colors.bg.secondary,
  bgElevated: colors.bg.surface,
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
  textMuted: colors.text.secondary,
  success: colors.functional.success,
  error: colors.functional.error,
  primary: colors.accent.indigo,
} as const;

const SPRING = springs.default;

interface PP { id: number; layer: string; type: "multiple-choice"; prompt: string; options: string[]; correctAnswer: string; feedback: string; }
const PROBLEMS: PP[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "(3x\u00B2 + 2x) + (x\u00B2 + 5x) = ?", options: ["4x\u00B2 + 7x", "3x\u2074 + 10x\u00B2", "4x\u00B2 + 7", "4x\u2074 + 7x\u00B2"], correctAnswer: "4x\u00B2 + 7x", feedback: "Combine like terms: 3x\u00B2 + x\u00B2 = 4x\u00B2, and 2x + 5x = 7x." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "(5x\u00B2 + 3) \u2212 (2x\u00B2 + 1) = ?", options: ["3x\u00B2 + 2", "7x\u00B2 + 4", "3x\u00B2 + 4", "3x + 2"], correctAnswer: "3x\u00B2 + 2", feedback: "Distribute the negative: 5x\u00B2 \u2212 2x\u00B2 = 3x\u00B2, and 3 \u2212 1 = 2." },
  { id: 3, layer: "Procedure", type: "multiple-choice", prompt: "2x(x + 3) = ?", options: ["2x\u00B2 + 6x", "2x\u00B2 + 3", "2x + 6", "x\u00B2 + 6x"], correctAnswer: "2x\u00B2 + 6x", feedback: "Distribute: 2x \u00D7 x = 2x\u00B2, and 2x \u00D7 3 = 6x." },
  { id: 4, layer: "Procedure", type: "multiple-choice", prompt: "(x + 2)(x + 3) = ?", options: ["x\u00B2 + 5x + 6", "x\u00B2 + 6x + 5", "x\u00B2 + 5x + 5", "2x + 5"], correctAnswer: "x\u00B2 + 5x + 6", feedback: "FOIL: x\u00B2 + 3x + 2x + 6 = x\u00B2 + 5x + 6." },
  { id: 5, layer: "Procedure", type: "multiple-choice", prompt: "(x + 1)(x \u2212 1) = ?", options: ["x\u00B2 \u2212 1", "x\u00B2 + 1", "x\u00B2 \u2212 x", "2x"], correctAnswer: "x\u00B2 \u2212 1", feedback: "This is a difference of squares: (a+b)(a\u2212b) = a\u00B2 \u2212 b\u00B2." },
  { id: 6, layer: "Understanding", type: "multiple-choice", prompt: "When adding polynomials, you can only combine:", options: ["Like terms (same variable and exponent)", "Any terms", "Terms with the same coefficient"], correctAnswer: "Like terms (same variable and exponent)", feedback: "3x\u00B2 and 5x\u00B2 are like terms. 3x\u00B2 and 5x are NOT (different exponents)." },
  { id: 7, layer: "Understanding", type: "multiple-choice", prompt: "(2x + 3)(x \u2212 4) = ?", options: ["2x\u00B2 \u2212 5x \u2212 12", "2x\u00B2 + 5x \u2212 12", "2x\u00B2 \u2212 8x + 3", "2x\u00B2 \u2212 5x + 12"], correctAnswer: "2x\u00B2 \u2212 5x \u2212 12", feedback: "FOIL: 2x\u00B2 \u2212 8x + 3x \u2212 12 = 2x\u00B2 \u2212 5x \u2212 12." },
  { id: 8, layer: "Understanding", type: "multiple-choice", prompt: "The degree of the product of a degree-2 and degree-3 polynomial is:", options: ["5", "6", "3", "2"], correctAnswer: "5", feedback: "When multiplying, degrees ADD: 2 + 3 = 5." },
];

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/PolynomialOpsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 4000)); t.push(setTimeout(() => setPhase(4), 5500));
    t.push(setTimeout(() => setPhase(5), 7000));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <AnimatePresence>{phase >= 1 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="text-center mb-3">
        <p className="font-mono font-bold" style={{ color: THEME.add, fontSize: "clamp(16px, 4vw, 22px)" }}>(3x + 2) + (5x + 1)</p>
      </motion.div>)}</AnimatePresence>
      <AnimatePresence>{phase >= 2 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="text-center mb-3">
        <p className="font-mono font-bold" style={{ color: THEME.add, fontSize: "clamp(18px, 5vw, 26px)" }}>= 8x + 3</p>
        <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Combine like terms!</p>
      </motion.div>)}</AnimatePresence>
      <AnimatePresence>{phase >= 3 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="text-center mb-3">
        <p className="font-mono font-bold" style={{ color: THEME.mult, fontSize: "clamp(16px, 4vw, 22px)" }}>(x + 2)(x + 3)</p>
      </motion.div>)}</AnimatePresence>
      <AnimatePresence>{phase >= 4 && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="text-center mb-3">
        <p className="font-mono font-bold" style={{ color: THEME.mult, fontSize: "clamp(18px, 5vw, 26px)" }}>= x{"\u00B2"} + 5x + 6</p>
        <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Multiply each term!</p>
      </motion.div>)}</AnimatePresence>
      {phase >= 5 && <ContinueButton onClick={onComplete} delay={0.3} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [a, setA] = useState(2); const [b, setB] = useState(3);
  const [interactions, setInteractions] = useState(0); const canContinue = interactions >= 6;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary" aria-live="polite">
      <p className="text-center mb-3 font-medium" style={{ color: THEME.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        See (x + a)(x + b) as an area model
      </p>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: THEME.textMuted }}>a:</span>
          <button onClick={() => { if (a > 1) { setA((v) => v - 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: THEME.bgSurface, color: THEME.textPrimary }}>{"\u2212"}</button>
          <span className="font-mono font-bold w-4 text-center" style={{ color: THEME.add }}>{a}</span>
          <button onClick={() => { if (a < 6) { setA((v) => v + 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: THEME.bgSurface, color: THEME.textPrimary }}>+</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: THEME.textMuted }}>b:</span>
          <button onClick={() => { if (b > 1) { setB((v) => v - 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: THEME.bgSurface, color: THEME.textPrimary }}>{"\u2212"}</button>
          <span className="font-mono font-bold w-4 text-center" style={{ color: THEME.mult }}>{b}</span>
          <button onClick={() => { if (b < 6) { setB((v) => v + 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: THEME.bgSurface, color: THEME.textPrimary }}>+</button>
        </div>
      </div>
      <motion.div key={`${a}-${b}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
        className="rounded-xl p-4 text-center w-full max-w-sm" style={{ backgroundColor: THEME.bgSurface }}>
        <p className="font-mono font-bold text-sm mb-2" style={{ color: THEME.textSecondary }}>
          (x + {a})(x + {b})
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3 max-w-[200px] mx-auto">
          <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${THEME.primary}30` }}><span className="font-mono text-sm font-bold" style={{ color: THEME.primary }}>x{"\u00B2"}</span></div>
          <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${THEME.mult}30` }}><span className="font-mono text-sm font-bold" style={{ color: THEME.mult }}>{b}x</span></div>
          <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${THEME.add}30` }}><span className="font-mono text-sm font-bold" style={{ color: THEME.add }}>{a}x</span></div>
          <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${THEME.sub}30` }}><span className="font-mono text-sm font-bold" style={{ color: THEME.sub }}>{a * b}</span></div>
        </div>
        <p className="font-mono font-bold" style={{ color: THEME.primary }}>= x{"\u00B2"} + {a + b}x + {a * b}</p>
      </motion.div>
      <div className="mt-3"><InteractionDots count={Math.min(interactions, 6)} total={6} activeColor={THEME.primary} /></div>
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Adding polynomials: combine like terms (same variable, same exponent). Just add the coefficients!", btn: "I see it!" },
    { text: "Subtracting: distribute the negative sign to EVERY term in the second polynomial, then combine like terms.", btn: "I see it!" },
    { text: "Multiplying: use the distributive property (FOIL for binomials). Multiply each term in one by each term in the other.", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: THEME.bgSurface }}>
          <p className="font-mono" style={{ color: THEME.add }}>(3x{"\u00B2"} + 2x) + (x{"\u00B2"} + 5x)</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.primary }}>= 4x{"\u00B2"} + 7x</p></motion.div>)}
        {step === 1 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: THEME.bgSurface }}>
          <p className="font-mono" style={{ color: THEME.sub }}>(5x{"\u00B2"} + 3) {"\u2212"} (2x{"\u00B2"} + 1)</p>
          <p className="font-mono text-xs mt-1" style={{ color: THEME.textMuted }}>= 5x{"\u00B2"} + 3 {"\u2212"} 2x{"\u00B2"} {"\u2212"} 1</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.primary }}>= 3x{"\u00B2"} + 2</p></motion.div>)}
        {step === 2 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 text-center" style={{ backgroundColor: THEME.bgSurface }}>
          <p className="font-mono" style={{ color: THEME.mult }}>(x + 2)(x + 3)</p>
          <p className="font-mono text-xs mt-1" style={{ color: THEME.textMuted }}>F: x{"\u00B7"}x O: x{"\u00B7"}3 I: 2{"\u00B7"}x L: 2{"\u00B7"}3</p>
          <p className="font-mono font-bold mt-1" style={{ color: THEME.primary }}>= x{"\u00B2"} + 5x + 6</p></motion.div>)}
      </div>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: THEME.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
          className="min-w-[140px]" style={{ backgroundColor: THEME.primary }}>{current.btn}</Button></motion.div>)}
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
    { formula: "Add: combine like terms", desc: "(ax\u207F + bx\u207F) = (a+b)x\u207F", color: THEME.add },
    { formula: "Subtract: distribute \u2212, then combine", desc: "Watch signs on every term", color: THEME.sub },
    { formula: "Multiply: distributive property", desc: "Each term \u00D7 each term, then combine", color: THEME.mult },
    { formula: "FOIL: First, Outer, Inner, Last", desc: "Shortcut for binomial \u00D7 binomial", color: THEME.primary },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: THEME.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Operation Rules</h2>
      <div className="space-y-5 w-full max-w-md">{n.map((item, i) => (<AnimatePresence key={i}>{revealed > i && (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4" style={{ backgroundColor: THEME.bgSurface, borderLeft: `4px solid ${item.color}` }}>
          <p className="font-bold font-mono text-lg" style={{ color: item.color }}>{item.formula}</p>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>{item.desc}</p></motion.div>)}</AnimatePresence>))}</div>
      {revealed >= 4 && <ContinueButton onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const s = [
    { icon: "\u{1F4D0}", title: "Area of Combined Shapes", desc: "Length (x+3) times width (x+2)", math: "A = x\u00B2 + 5x + 6" },
    { icon: "\u{1F4B0}", title: "Profit Calculation", desc: "Revenue minus Cost, both polynomials", math: "P(x) = R(x) \u2212 C(x)" },
    { icon: "\u{1F3D7}\u{FE0F}", title: "Construction", desc: "Expanding a room by x feet on two sides", math: "(L+x)(W+x) = LW + (L+W)x + x\u00B2" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: THEME.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Polynomial Operations in Life</h2>
      <div className="space-y-4 w-full max-w-md">{s.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }}
        className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: THEME.bgSurface }}>
        <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
        <div><p className="font-semibold" style={{ color: THEME.textPrimary }}>{item.title}</p>
          <p className="text-sm" style={{ color: THEME.textSecondary }}>{item.desc}</p>
          <p className="text-xs font-mono mt-1" style={{ color: THEME.primary }}>{item.math}</p></div></motion.div>))}</div>
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
      <div className="flex items-center gap-1.5 justify-center mb-4">{PROBLEMS.map((_, i) => { const r = res[i]; let bg: string = THEME.bgElevated;
        if (r === true) bg = THEME.success; else if (r === false) bg = THEME.error;
        return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === cQ ? `2px solid ${THEME.primary}` : "none" }} />; })}</div>
      <motion.div key={cQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: THEME.textMuted }}>{p.layer} {"\u2022"} {cQ + 1}/{PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: THEME.textPrimary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{p.prompt}</p>
        <div className="space-y-2 w-full">{p.options.map((opt) => { let bg: string = THEME.bgSurface; let brd: string = THEME.bgElevated;
          if (sub) { if (opt === p.correctAnswer) { bg = `${colors.functional.success}33`; brd = THEME.success; } else if (opt === sel && opt !== p.correctAnswer) { bg = `${colors.functional.error}33`; brd = THEME.error; } }
          else if (opt === sel) { bg = `${colors.accent.indigo}33`; brd = THEME.primary; }
          return (<button key={opt} onClick={() => { if (!sub) setSel(opt); }} disabled={sub} className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
            style={{ backgroundColor: bg, border: `2px solid ${brd}`, color: THEME.textPrimary }}>{opt}</button>); })}</div>
        <AnimatePresence>{sub && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
          style={{ backgroundColor: ok ? `${colors.functional.success}20` : `${colors.functional.error}20`, border: `1px solid ${ok ? THEME.success : THEME.error}` }}>
          <p className="font-bold mb-1" style={{ color: ok ? THEME.success : THEME.error }}>{ok ? "Correct!" : "Not quite"}</p>
          <p className="text-sm" style={{ color: THEME.textSecondary }}>{p.feedback}</p></motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">{!sub ? (
          <Button size="lg" onClick={doSubmit} disabled={!sel} className="w-full" style={{ backgroundColor: THEME.primary, opacity: sel ? 1 : 0.4 }}>Check Answer</Button>
        ) : (<Button size="lg" onClick={doNext} className="w-full" style={{ backgroundColor: THEME.primary }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}</div>
      </motion.div>
    </section>
  );
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false); const canSubmit = text.trim().length >= 20;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary" aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: THEME.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: THEME.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>How is multiplying polynomials like the area model from elementary school? What connections do you see?</p>
        {!submitted ? (<><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
          className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]" style={{ backgroundColor: THEME.bgSurface, color: THEME.textPrimary, border: `2px solid ${THEME.bgElevated}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? THEME.success : THEME.textMuted }}>{text.trim().length}/20 characters minimum</p></>
        ) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: THEME.bgSurface }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: THEME.success }}>Great thinking!</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">{!submitted ? (<>
        <Button size="lg" onClick={() => { if (canSubmit) setSubmitted(true); }} disabled={!canSubmit} className="w-full" style={{ backgroundColor: THEME.primary, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
        <button onClick={() => setSubmitted(true)} className="w-full text-center py-2 min-h-[44px]" style={{ color: THEME.textMuted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
      </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: THEME.primary }}>Complete Lesson</Button></motion.div>)}</div>
    </section>
  );
}

export function PolynomialOpsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="AL-3.10a Polynomial Ops" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
