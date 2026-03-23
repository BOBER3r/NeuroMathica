"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

const C = { arith: "#34d399", arithFill: "#34d39933", geo: "#f59e0b", geoFill: "#f59e0b33", nth: "#60a5fa", bgPrimary: "#0f172a", bgSurface: "#1e293b", bgElevated: "#334155", textPrimary: "#f8fafc", textSecondary: "#e2e8f0", textMuted: "#94a3b8", success: "#34d399", error: "#f87171", primary: "#818cf8" } as const;
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };
type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface PP { id: number; layer: string; type: "multiple-choice" | "numeric-input"; prompt: string; options?: string[]; correctAnswer: string; feedback: string; }
const PROBLEMS: PP[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "3, 7, 11, 15, ... What type of sequence?", options: ["Arithmetic", "Geometric"], correctAnswer: "Arithmetic", feedback: "The difference is constant: +4 each time." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "2, 6, 18, 54, ... What type of sequence?", options: ["Arithmetic", "Geometric"], correctAnswer: "Geometric", feedback: "The ratio is constant: \u00D73 each time." },
  { id: 3, layer: "Recall", type: "numeric-input", prompt: "4, 9, 14, 19, _. What comes next?", correctAnswer: "24", feedback: "Common difference is +5. So 19 + 5 = 24." },
  { id: 4, layer: "Procedure", type: "numeric-input", prompt: "Arithmetic: a\u2081 = 3, d = 4. Find a\u2085.", correctAnswer: "19", feedback: "a\u2085 = a\u2081 + (5\u22121)d = 3 + 4(4) = 3 + 16 = 19." },
  { id: 5, layer: "Procedure", type: "numeric-input", prompt: "Geometric: a\u2081 = 2, r = 3. Find a\u2084.", correctAnswer: "54", feedback: "a\u2084 = a\u2081 \u00D7 r\u00B3 = 2 \u00D7 27 = 54." },
  { id: 6, layer: "Procedure", type: "multiple-choice", prompt: "What is the common difference of 10, 7, 4, 1?", options: ["+3", "\u22123", "+7", "\u22127"], correctAnswer: "\u22123", feedback: "7 \u2212 10 = \u22123. The sequence decreases by 3 each time." },
  { id: 7, layer: "Understanding", type: "multiple-choice", prompt: "Which grows faster: arithmetic (+5) or geometric (\u00D75), starting from 1?", options: ["Arithmetic", "Geometric", "They grow equally"], correctAnswer: "Geometric", feedback: "Geometric: 1, 5, 25, 125... vs Arithmetic: 1, 6, 11, 16... Multiplying outpaces adding." },
  { id: 8, layer: "Understanding", type: "multiple-choice", prompt: "The nth term formula for arithmetic sequences is:", options: ["a\u2081 + (n\u22121)d", "a\u2081 \u00D7 r\u207F", "a\u2081 + nd", "n \u00D7 d"], correctAnswer: "a\u2081 + (n\u22121)d", feedback: "Start at a\u2081, add d exactly (n\u22121) times to reach the nth term." },
];

function CB({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number; }) {
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay }} className="w-full flex justify-center pt-4 pb-8">
    <Button size="lg" onClick={onClick} className="min-w-[160px]" style={{ backgroundColor: C.primary }}>{label}</Button></motion.div>); }
function ID({ count, total }: { count: number; total: number }) {
  return (<div className="flex items-center gap-1 justify-center">{Array.from({ length: total }, (_, i) => (
    <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 6, height: 6, backgroundColor: i < count ? C.primary : C.bgElevated }} />))}</div>); }

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/SequencesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  useEffect(() => { const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 800)); t.push(setTimeout(() => setPhase(2), 2500));
    t.push(setTimeout(() => setPhase(3), 3500)); t.push(setTimeout(() => setPhase(4), 5000));
    t.push(setTimeout(() => setPhase(5), 6000)); t.push(setTimeout(() => setPhase(6), 7500));
    // Failsafe: guarantee Continue button within 4s
    t.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => t.forEach(clearTimeout); }, []);
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <div className="flex items-center gap-3 mb-4">
        {[2, 5, 8, 11].map((n, i) => (
          <motion.div key={`a-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }}
            className="rounded-xl flex items-center justify-center" style={{ width: 48, height: 48, backgroundColor: C.arithFill, border: `2px solid ${C.arith}` }}>
            <span className="font-bold font-mono tabular-nums" style={{ color: C.arith }}>{n}</span>
          </motion.div>))}
        {phase >= 1 && (<motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
          className="rounded-xl flex items-center justify-center" style={{ width: 48, height: 48, backgroundColor: `${C.error}33`, border: `2px dashed ${C.error}` }}>
          <span className="font-bold" style={{ color: C.error }}>?</span></motion.div>)}
        {phase >= 2 && (<motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
          className="rounded-xl flex items-center justify-center" style={{ width: 48, height: 48, backgroundColor: C.arithFill, border: `2px solid ${C.arith}` }}>
          <span className="font-bold font-mono tabular-nums" style={{ color: C.arith }}>14</span></motion.div>)}
      </div>
      {phase >= 3 && (<div className="flex items-center gap-3 mb-4">
        {[3, 6, 12, 24].map((n, i) => (
          <motion.div key={`g-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
            className="rounded-xl flex items-center justify-center" style={{ width: 48, height: 48, backgroundColor: C.geoFill, border: `2px solid ${C.geo}` }}>
            <span className="font-bold font-mono tabular-nums" style={{ color: C.geo }}>{n}</span>
          </motion.div>))}
        {phase >= 4 && (<motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
          className="rounded-xl flex items-center justify-center" style={{ width: 48, height: 48, backgroundColor: `${C.error}33`, border: `2px dashed ${C.error}` }}>
          <span className="font-bold" style={{ color: C.error }}>?</span></motion.div>)}
        {phase >= 5 && (<motion.div initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}
          className="rounded-xl flex items-center justify-center" style={{ width: 48, height: 48, backgroundColor: C.geoFill, border: `2px solid ${C.geo}` }}>
          <span className="font-bold font-mono tabular-nums" style={{ color: C.geo }}>48</span></motion.div>)}
      </div>)}
      <AnimatePresence>{phase >= 6 && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center font-medium"
        style={{ color: C.textSecondary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        One adds. One multiplies. Can you predict the 100th term?
      </motion.p>)}</AnimatePresence>
      {phase >= 6 && <CB onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [seqType, setSeqType] = useState<"arith" | "geo">("arith");
  const [start, setStart] = useState(2); const [rule, setRule] = useState(3);
  const [interactions, setInteractions] = useState(0); const canContinue = interactions >= 8;
  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);
  const seq = useMemo(() => {
    const s: number[] = [start];
    for (let i = 1; i < 6; i++) { const prev = s[i - 1]!; s.push(seqType === "arith" ? prev + rule : prev * rule); }
    return s;
  }, [start, rule, seqType]);
  const color = seqType === "arith" ? C.arith : C.geo;
  const fill = seqType === "arith" ? C.arithFill : C.geoFill;

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <p className="text-center mb-2 font-medium" style={{ color: C.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Pick a type, start, and rule to build sequences
      </p>
      <div className="flex gap-2 mb-3">
        {(["arith", "geo"] as const).map((t) => (
          <button key={t} onClick={() => { setSeqType(t); if (t === "geo" && rule > 4) setRule(2); interact(); }}
            className="rounded-lg px-3 py-1 font-medium text-sm min-h-[44px] min-w-[44px] transition-colors active:scale-95"
            style={{ backgroundColor: t === seqType ? (t === "arith" ? C.arith : C.geo) : C.bgSurface, color: t === seqType ? C.bgPrimary : C.textPrimary }}>
            {t === "arith" ? "Arithmetic (+)" : "Geometric (\u00D7)"}</button>))}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm" style={{ color: C.textMuted }}>Start:</span>
        <button onClick={() => { if (start > 1) { setStart((s) => s - 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: C.bgSurface, color: C.textPrimary }}>{"\u2212"}</button>
        <span className="font-mono font-bold text-lg w-8 text-center" style={{ color: C.textPrimary }}>{start}</span>
        <button onClick={() => { if (start < 10) { setStart((s) => s + 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: C.bgSurface, color: C.textPrimary }}>+</button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm" style={{ color: C.textMuted }}>Rule:</span>
        <button onClick={() => { if (rule > 1) { setRule((r) => r - 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: C.bgSurface, color: C.textPrimary }}>{"\u2212"}</button>
        <span className="font-mono font-bold text-lg w-8 text-center" style={{ color: C.textPrimary }}>{seqType === "arith" ? `+${rule}` : `\u00D7${rule}`}</span>
        <button onClick={() => { const max = seqType === "arith" ? 10 : 4; if (rule < max) { setRule((r) => r + 1); interact(); } }} className="rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center font-bold active:scale-95" style={{ backgroundColor: C.bgSurface, color: C.textPrimary }}>+</button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {seq.map((n, i) => (<motion.div key={`${seqType}-${start}-${rule}-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, ...SPRING }} className="rounded-xl flex items-center justify-center"
          style={{ width: 56, height: 56, backgroundColor: fill, border: `2px solid ${color}` }}>
          <span className="font-bold font-mono tabular-nums text-sm" style={{ color }}>{n > 99999 ? "..." : n}</span>
        </motion.div>))}
      </div>
      <p className="text-sm font-medium mb-2" style={{ color }}>
        {seqType === "arith" ? `a\u2099 = ${start} + (n\u22121)\u00D7${rule}` : `a\u2099 = ${start} \u00D7 ${rule}\u207F\u207B\u00B9`}
      </p>
      <ID count={Math.min(interactions, 8)} total={8} />
      {canContinue && <CB onClick={onComplete} />}
    </section>
  );
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const prompts = useMemo(() => [
    { text: "Arithmetic sequences add the same number (d = common difference) each time: 2, 5, 8, 11... (d = 3).", btn: "I see it!" },
    { text: "Geometric sequences multiply by the same number (r = common ratio) each time: 3, 6, 12, 24... (r = 2).", btn: "I see it!" },
    { text: "The nth term formula lets you jump to ANY position! Arithmetic: a\u2081 + (n\u22121)d. Geometric: a\u2081 \u00D7 r\u207F\u207B\u00B9.", btn: "Got it!" },
  ], []);
  const current = prompts[step];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <div className="mb-6 w-full max-w-sm">
        {step === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
          <div className="flex gap-3">{[2, 5, 8, 11].map((n, i) => (<div key={i} className="rounded-lg flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: C.arithFill, border: `2px solid ${C.arith}` }}>
            <span className="font-bold font-mono" style={{ color: C.arith }}>{n}</span></div>))}</div>
          <div className="flex gap-8 mt-1">{["+3", "+3", "+3"].map((d, i) => (<motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.3 }} className="text-sm font-mono font-bold" style={{ color: C.nth }}>{d}</motion.span>))}</div>
        </motion.div>)}
        {step === 1 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
          <div className="flex gap-3">{[3, 6, 12, 24].map((n, i) => (<div key={i} className="rounded-lg flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: C.geoFill, border: `2px solid ${C.geo}` }}>
            <span className="font-bold font-mono" style={{ color: C.geo }}>{n}</span></div>))}</div>
          <div className="flex gap-8 mt-1">{["\u00D72", "\u00D72", "\u00D72"].map((d, i) => (<motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.3 }} className="text-sm font-mono font-bold" style={{ color: C.geo }}>{d}</motion.span>))}</div>
        </motion.div>)}
        {step === 2 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3 items-center">
          <div className="rounded-xl p-3" style={{ backgroundColor: C.arithFill, border: `1px solid ${C.arith}` }}>
            <p className="font-mono text-sm font-bold text-center" style={{ color: C.arith }}>Arithmetic: a{"\u2099"} = a{"\u2081"} + (n{"\u2212"}1)d</p></div>
          <div className="rounded-xl p-3" style={{ backgroundColor: C.geoFill, border: `1px solid ${C.geo}` }}>
            <p className="font-mono text-sm font-bold text-center" style={{ color: C.geo }}>Geometric: a{"\u2099"} = a{"\u2081"} {"\u00D7"} r{"\u207F\u207B\u00B9"}</p></div>
        </motion.div>)}
      </div>
      {current && (<motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="max-w-md text-center px-4">
        <p className="font-medium mb-4" style={{ color: C.textPrimary, fontSize: "clamp(14px, 3.5vw, 18px)" }}>{current.text}</p>
        <Button size="lg" onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onComplete(); }}
          className="min-w-[140px]" style={{ backgroundColor: C.primary }}>{current.btn}</Button></motion.div>)}
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
    { formula: "d = a\u2082 \u2212 a\u2081", desc: "Common difference (arithmetic)", color: C.arith },
    { formula: "a\u2099 = a\u2081 + (n\u22121)d", desc: "nth term of arithmetic sequence", color: C.nth },
    { formula: "r = a\u2082 / a\u2081", desc: "Common ratio (geometric)", color: C.geo },
    { formula: "a\u2099 = a\u2081 \u00D7 r\u207F\u207B\u00B9", desc: "nth term of geometric sequence", color: C.geo },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-8" style={{ color: C.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Sequence Formulas</h2>
      <div className="space-y-5 w-full max-w-md">{n.map((item, i) => (<AnimatePresence key={i}>{revealed > i && (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl p-4" style={{ backgroundColor: C.bgSurface, borderLeft: `4px solid ${item.color}` }}>
          <p className="font-bold font-mono text-lg" style={{ color: item.color }}>{item.formula}</p>
          <p className="text-sm mt-1" style={{ color: C.textMuted }}>{item.desc}</p></motion.div>)}</AnimatePresence>))}</div>
      {revealed >= 4 && <CB onClick={onComplete} delay={0.5} />}
    </section>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const s = [
    { icon: "\u{1F4B0}", title: "Savings Account", desc: "Save $5/week: 5, 10, 15, 20...", math: "Arithmetic, d = 5" },
    { icon: "\u{1F9EC}", title: "Bacteria Growth", desc: "Bacteria double every hour: 1, 2, 4, 8...", math: "Geometric, r = 2" },
    { icon: "\u{1FA91}", title: "Stacking Chairs", desc: "Each row adds 2 more chairs.", math: "Arithmetic, d = 2" },
  ];
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <h2 className="text-center font-bold mb-6" style={{ color: C.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Sequences in the Wild</h2>
      <div className="space-y-4 w-full max-w-md">{s.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }}
        className="rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: C.bgSurface }}>
        <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
        <div><p className="font-semibold" style={{ color: C.textPrimary }}>{item.title}</p><p className="text-sm" style={{ color: C.textSecondary }}>{item.desc}</p>
          <p className="text-xs font-mono mt-1" style={{ color: C.primary }}>{item.math}</p></div></motion.div>))}</div>
      <CB onClick={onComplete} delay={0.3} />
    </section>
  );
}

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [cQ, setCQ] = useState(0); const [sel, setSel] = useState<string | null>(null); const [inp, setInp] = useState(""); const [sub, setSub] = useState(false);
  const [res, setRes] = useState<Array<boolean | null>>(() => PROBLEMS.map(() => null));
  const p = PROBLEMS[cQ]!; const isLast = cQ === PROBLEMS.length - 1;
  const userAns = p.type === "numeric-input" ? inp.trim() : sel;
  const ok = userAns === p.correctAnswer;
  const doSubmit = useCallback(() => { if (!userAns) return; setSub(true); setRes((prev) => { const n = [...prev]; n[cQ] = userAns === p.correctAnswer; return n; }); }, [userAns, cQ, p.correctAnswer]);
  const doNext = useCallback(() => { if (isLast) { onComplete(); return; } setCQ((q) => q + 1); setSel(null); setInp(""); setSub(false); }, [isLast, onComplete]);
  return (
    <section className="flex flex-1 flex-col px-4 pt-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">{PROBLEMS.map((_, i) => { const r = res[i]; let bg: string = C.bgElevated;
        if (r === true) bg = C.success; else if (r === false) bg = C.error;
        return <div key={i} className="rounded-full transition-colors duration-200" style={{ width: 10, height: 10, backgroundColor: bg, border: i === cQ ? `2px solid ${C.primary}` : "none" }} />; })}</div>
      <motion.div key={cQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: C.textMuted }}>{p.layer} {"\u2022"} {cQ + 1}/{PROBLEMS.length}</p>
        <p className="text-center font-medium mb-6" style={{ color: C.textPrimary, fontSize: "clamp(15px, 3.5vw, 18px)" }}>{p.prompt}</p>
        {p.type === "multiple-choice" && p.options && (<div className="space-y-2 w-full">{p.options.map((opt) => { let bg: string = C.bgSurface; let brd: string = C.bgElevated;
          if (sub) { if (opt === p.correctAnswer) { bg = "#34d39933"; brd = C.success; } else if (opt === sel && opt !== p.correctAnswer) { bg = "#f8717133"; brd = C.error; } }
          else if (opt === sel) { bg = "#818cf833"; brd = C.primary; }
          return (<button key={opt} onClick={() => { if (!sub) setSel(opt); }} disabled={sub} className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px] active:scale-[0.97]"
            style={{ backgroundColor: bg, border: `2px solid ${brd}`, color: C.textPrimary }}>{opt}</button>); })}</div>)}
        {p.type === "numeric-input" && (<input type="number" value={inp} onChange={(e) => { if (!sub) setInp(e.target.value); }} disabled={sub} placeholder="Enter your answer"
          className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
          style={{ backgroundColor: C.bgSurface, color: C.textPrimary, border: `2px solid ${sub ? (ok ? C.success : C.error) : C.bgElevated}`, outline: "none" }} />)}
        <AnimatePresence>{sub && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="mt-4 rounded-xl p-4 w-full"
          style={{ backgroundColor: ok ? "#34d39920" : "#f8717120", border: `1px solid ${ok ? C.success : C.error}` }}>
          <p className="font-bold mb-1" style={{ color: ok ? C.success : C.error }}>{ok ? "Correct!" : "Not quite"}</p>
          <p className="text-sm" style={{ color: C.textSecondary }}>{p.feedback}</p></motion.div>)}</AnimatePresence>
        <div className="w-full mt-4 pb-8">{!sub ? (
          <Button size="lg" onClick={doSubmit} disabled={!userAns} className="w-full" style={{ backgroundColor: C.primary, opacity: userAns ? 1 : 0.4 }}>Check Answer</Button>
        ) : (<Button size="lg" onClick={doNext} className="w-full" style={{ backgroundColor: C.primary }}>{isLast ? "Continue" : "Next \u2192"}</Button>)}</div>
      </motion.div>
    </section>
  );
}

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false); const canSubmit = text.trim().length >= 20;
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4" style={{ backgroundColor: C.bgPrimary }} aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2" style={{ color: C.textPrimary, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6" style={{ color: C.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Describe a pattern you see in your everyday life. Is it arithmetic, geometric, or something else?
        </p>
        {!submitted ? (<><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." rows={4}
          className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]" style={{ backgroundColor: C.bgSurface, color: C.textPrimary, border: `2px solid ${C.bgElevated}`, outline: "none" }} />
          <p className="text-xs mt-1 text-right" style={{ color: text.trim().length >= 20 ? C.success : C.textMuted }}>{text.trim().length}/20 characters minimum</p></>
        ) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-xl p-6 text-center" style={{ backgroundColor: C.bgSurface }}>
          <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p><p className="font-bold" style={{ color: C.success }}>Great thinking!</p>
          <p className="text-sm mt-1" style={{ color: C.textSecondary }}>Reflecting on concepts deepens your understanding.</p></motion.div>)}
      </motion.div>
      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">{!submitted ? (<>
        <Button size="lg" onClick={() => { if (canSubmit) setSubmitted(true); }} disabled={!canSubmit} className="w-full" style={{ backgroundColor: C.primary, opacity: canSubmit ? 1 : 0.4 }}>Submit Reflection</Button>
        <button onClick={() => setSubmitted(true)} className="w-full text-center py-2 min-h-[44px]" style={{ color: C.textMuted, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Skip</button>
      </>) : (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: C.primary }}>Complete Lesson</Button></motion.div>)}</div>
    </section>
  );
}

export function SequencesLesson({ onComplete }: { onComplete?: () => void }) {
  const [si, setSi] = useState(0); const stage = STAGES[si] ?? ("hook" as Stage);
  const adv = useCallback(() => { setSi((i) => { const n = i + 1; if (n >= STAGES.length) { onComplete?.(); return i; } return n; }); }, [onComplete]);
  const reflDone = useCallback(() => { onComplete?.(); }, [onComplete]);
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: C.bgPrimary }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm px-4 py-2" style={{ backgroundColor: `${C.bgPrimary}e6`, borderBottom: `1px solid ${C.bgSurface}` }}>
        <div className="flex items-center justify-between mb-1"><span className="text-xs font-medium" style={{ color: C.textMuted }}>AL-3.13 Sequences</span>
          <span className="text-xs tabular-nums" style={{ color: C.bgElevated }}>{si + 1}/{STAGES.length}</span></div>
        <ProgressBar value={((si + 1) / STAGES.length) * 100} variant="xp" size="sm" /></div>
      <AnimatePresence mode="wait"><motion.div key={stage} className="flex flex-1 flex-col" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={SPRING_GENTLE}>
        {stage === "hook" && <HookStage onComplete={adv} />}{stage === "spatial" && <SpatialStage onComplete={adv} />}
        {stage === "discovery" && <DiscoveryStage onComplete={adv} />}{stage === "symbol" && <SymbolBridgeStage onComplete={adv} />}
        {stage === "realWorld" && <RealWorldStage onComplete={adv} />}{stage === "practice" && <PracticeStage onComplete={adv} />}
        {stage === "reflection" && <ReflectionStage onComplete={reflDone} />}
      </motion.div></AnimatePresence></div>);
}
