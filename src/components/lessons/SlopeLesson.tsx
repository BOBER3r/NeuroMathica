"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * AL-3.8a Slope — Grade 8
 * Prerequisites: AL-3.8 (Linear Equations)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: Slope measures steepness — rise over run. It is the ratio
 *   (y2-y1)/(x2-x1). Positive slopes go uphill, negative go downhill,
 *   zero is flat, and undefined is vertical.
 *
 * Stage flow:
 *  1. Hook — animated hills of different steepness
 *  2. Spatial — interactive graph with movable points; slope recalculates live
 *  3. Discovery — guided prompts about rise/run and sign of slope
 *  4. Symbol Bridge — m = (y2-y1)/(x2-x1) overlaid on examples
 *  5. Real World — road grades, wheelchair ramps, roof pitch
 *  6. Practice — 9 problems (recall, procedure, understanding)
 *  7. Reflection — explain in own words
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BG = "#0f172a";
const SURFACE = "#1e293b";
const TEXT = "#f8fafc";
const MUTED = "#94a3b8";
const BORDER = "#475569";
const PRIMARY = "#818cf8";
const SUCCESS = "#34d399";
const ERROR = "#f87171";

const RISE_COLOR = "#a78bfa";
const RUN_COLOR = "#60a5fa";
const LINE_COLOR = "#f472b6";

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

type Stage = "hook" | "spatial" | "discovery" | "symbol" | "realWorld" | "practice" | "reflection";
const STAGES: Stage[] = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-2 py-3" style={{ background: BG }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-2 w-2 rounded-full transition-all duration-300" style={{ background: i <= current ? PRIMARY : BORDER, transform: i === current ? "scale(1.4)" : "scale(1)" }} />
      ))}
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (
    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5, ease: "easeOut" }} onClick={onClick} className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors hover:brightness-110 active:scale-[0.97]" style={{ background: PRIMARY, minHeight: 48 }} aria-label={label}>
      {label}
    </motion.button>
  );
}

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="flex min-h-dvh flex-col items-center justify-center px-4 py-12" style={{ background: BG }}>
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/SlopeHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [setTimeout(() => setPhase(1), 600), setTimeout(() => setPhase(2), 1800), setTimeout(() => setPhase(3), 3000), setTimeout(() => setPhase(4), 4200),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000)];
    return () => timers.forEach(clearTimeout);
  }, []);

  const slopes = [
    { label: "Gentle hill", x1: 40, y1: 200, x2: 200, y2: 160, color: SUCCESS },
    { label: "Steep hill", x1: 220, y1: 200, x2: 320, y2: 80, color: PRIMARY },
    { label: "Downhill", x1: 340, y1: 100, x2: 460, y2: 200, color: ERROR },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold" style={{ color: TEXT }}>
          Which hill is steepest?
        </motion.h2>

        <svg viewBox="0 0 500 260" className="w-full max-w-md" aria-label="Three hills of different steepness">
          <line x1={20} y1={220} x2={480} y2={220} stroke={BORDER} strokeWidth={1} />
          {slopes.map((s, i) =>
            phase >= i + 1 ? (
              <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.color} strokeWidth={4} strokeLinecap="round" />
                <motion.circle cx={s.x1} cy={s.y1} r={8} fill={s.color} animate={{ cx: [s.x1, s.x2], cy: [s.y1, s.y2] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, repeatDelay: 1 }} />
                <text x={(s.x1 + s.x2) / 2} y={235} textAnchor={"middle" as const} fill={s.color} fontSize={12} fontWeight="bold">{s.label}</text>
              </motion.g>
            ) : null,
          )}
        </svg>

        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-sm" style={{ color: MUTED }}>
            Steepness has a name in math: slope. It measures how much a line rises (or falls) for each step forward.
          </motion.p>
        )}
        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [p1, setP1] = useState({ x: 1, y: 1 });
  const [p2, setP2] = useState({ x: 4, y: 3 });
  const [interactions, setInteractions] = useState(0);
  const [selectingP1, setSelectingP1] = useState(true);
  const canContinue = interactions >= 4;

  const rise = p2.y - p1.y;
  const run = p2.x - p1.x;
  const slopeDecimal = run === 0 ? null : rise / run;

  const gridRange = 6;
  const margin = 45;
  const cellSize = 40;
  const svgW = margin * 2 + gridRange * 2 * cellSize;
  const svgH = margin * 2 + gridRange * 2 * cellSize;
  const originX = margin + gridRange * cellSize;
  const originY = margin + gridRange * cellSize;

  const toSvgX = useCallback((gx: number) => originX + gx * cellSize, [originX]);
  const toSvgY = useCallback((gy: number) => originY - gy * cellSize, [originY]);

  const handleGridClick = useCallback((gx: number, gy: number) => {
    setInteractions((c) => c + 1);
    if (selectingP1) { setP1({ x: gx, y: gy }); } else { setP2({ x: gx, y: gy }); }
    setSelectingP1((v) => !v);
  }, [selectingP1]);

  const ticks = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-3">
        <h2 className="text-center text-[clamp(16px,4vw,24px)] font-bold" style={{ color: TEXT }}>Tap to place two points and see the slope</h2>
        <p className="text-xs" style={{ color: MUTED }}>{selectingP1 ? "Tap to place Point 1 (blue)" : "Tap to place Point 2 (pink)"}</p>

        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="Interactive coordinate graph for slope">
          <line x1={margin} y1={originY} x2={svgW - margin} y2={originY} stroke={MUTED} strokeWidth={1.5} />
          <line x1={originX} y1={margin} x2={originX} y2={svgH - margin} stroke={MUTED} strokeWidth={1.5} />

          {ticks.map((t) => (
            <g key={`t${t}`}>
              <line x1={toSvgX(t)} y1={margin} x2={toSvgX(t)} y2={svgH - margin} stroke={BORDER} strokeWidth={0.3} />
              <line x1={margin} y1={toSvgY(t)} x2={svgW - margin} y2={toSvgY(t)} stroke={BORDER} strokeWidth={0.3} />
              {t !== 0 && (
                <>
                  <text x={toSvgX(t)} y={originY + 16} textAnchor={"middle" as const} fill={MUTED} fontSize={10}>{t}</text>
                  <text x={originX - 14} y={toSvgY(t) + 4} textAnchor={"middle" as const} fill={MUTED} fontSize={10}>{t}</text>
                </>
              )}
            </g>
          ))}

          {ticks.map((gx) =>
            ticks.map((gy) => (
              <rect key={`c${gx}-${gy}`} x={toSvgX(gx) - 10} y={toSvgY(gy) - 10} width={20} height={20} fill="transparent" className="cursor-pointer" data-interactive="true" onClick={() => handleGridClick(gx, gy)} />
            )),
          )}

          <line x1={toSvgX(p2.x)} y1={toSvgY(p1.y)} x2={toSvgX(p2.x)} y2={toSvgY(p2.y)} stroke={RISE_COLOR} strokeWidth={2} strokeDasharray="5 3" />
          <line x1={toSvgX(p1.x)} y1={toSvgY(p1.y)} x2={toSvgX(p2.x)} y2={toSvgY(p1.y)} stroke={RUN_COLOR} strokeWidth={2} strokeDasharray="5 3" />

          {run !== 0 && (
            <line x1={toSvgX(-6)} y1={toSvgY(p1.y + ((-6 - p1.x) * rise) / run)} x2={toSvgX(6)} y2={toSvgY(p1.y + ((6 - p1.x) * rise) / run)} stroke={LINE_COLOR} strokeWidth={2} opacity={0.5} />
          )}
          {run === 0 && (
            <line x1={toSvgX(p1.x)} y1={margin} x2={toSvgX(p1.x)} y2={svgH - margin} stroke={LINE_COLOR} strokeWidth={2} opacity={0.5} />
          )}

          <circle cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r={6} fill={RUN_COLOR} />
          <circle cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r={6} fill={LINE_COLOR} />
          <text x={toSvgX(p1.x)} y={toSvgY(p1.y) - 10} textAnchor={"middle" as const} fill={RUN_COLOR} fontSize={11} fontWeight="bold">{`(${p1.x},${p1.y})`}</text>
          <text x={toSvgX(p2.x)} y={toSvgY(p2.y) - 10} textAnchor={"middle" as const} fill={LINE_COLOR} fontSize={11} fontWeight="bold">{`(${p2.x},${p2.y})`}</text>

          <text x={toSvgX(p2.x) + 16} y={(toSvgY(p1.y) + toSvgY(p2.y)) / 2 + 4} fill={RISE_COLOR} fontSize={12} fontWeight="bold">{`rise=${rise}`}</text>
          <text x={(toSvgX(p1.x) + toSvgX(p2.x)) / 2} y={toSvgY(p1.y) + 18} textAnchor={"middle" as const} fill={RUN_COLOR} fontSize={12} fontWeight="bold">{`run=${run}`}</text>
        </svg>

        <div className="rounded-xl px-6 py-3 text-center" style={{ background: SURFACE }}>
          <p className="font-mono text-base font-bold" style={{ color: TEXT }}>
            {"slope = "}<span style={{ color: RISE_COLOR }}>{"rise"}</span>{" / "}<span style={{ color: RUN_COLOR }}>{"run"}</span>{" = "}
            <span style={{ color: RISE_COLOR }}>{rise}</span>{" / "}<span style={{ color: RUN_COLOR }}>{run}</span>{" = "}
            <span style={{ color: LINE_COLOR }}>{run === 0 ? "undefined" : slopeDecimal !== null ? slopeDecimal.toFixed(2) : ""}</span>
          </p>
          <p className="mt-1 text-xs" style={{ color: MUTED }}>
            {run === 0 ? "Vertical line \u2014 slope is undefined!" : slopeDecimal !== null && slopeDecimal > 0 ? "Positive slope \u2014 line goes uphill left to right" : slopeDecimal !== null && slopeDecimal < 0 ? "Negative slope \u2014 line goes downhill left to right" : "Zero slope \u2014 horizontal line"}
          </p>
        </div>

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "Slope = rise \u00F7 run. Rise is how far up (or down) the line goes. Run is how far right it goes. A bigger rise for the same run means a steeper line.", button: "I see it!" },
    { text: "When the line goes uphill (left to right), rise is positive, so slope is positive. When it goes downhill, rise is negative, making slope negative.", button: "I see it!" },
    { text: "A horizontal line has zero rise, so slope = 0/run = 0. A vertical line has zero run, so slope = rise/0 \u2014 undefined! You cannot divide by zero.", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) { setPromptIdx((i) => i + 1); } else { onContinue(); }
  }, [promptIdx, prompts.length, onContinue]);
  const current = prompts[promptIdx]!;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">
          {prompts.map((_, i) => (<div key={i} className="h-2 w-8 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl p-6 text-center" style={{ background: SURFACE }}>
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>{current.text}</p>
          </motion.div>
        </AnimatePresence>

        <svg viewBox="0 0 360 120" className="w-full max-w-sm" aria-label="Four types of slope">
          <line x1={20} y1={100} x2={80} y2={30} stroke={SUCCESS} strokeWidth={3} />
          <text x={50} y={115} textAnchor={"middle" as const} fill={SUCCESS} fontSize={11} fontWeight="bold">Positive</text>
          <line x1={110} y1={30} x2={170} y2={100} stroke={ERROR} strokeWidth={3} />
          <text x={140} y={115} textAnchor={"middle" as const} fill={ERROR} fontSize={11} fontWeight="bold">Negative</text>
          <line x1={200} y1={65} x2={260} y2={65} stroke={RUN_COLOR} strokeWidth={3} />
          <text x={230} y={115} textAnchor={"middle" as const} fill={RUN_COLOR} fontSize={11} fontWeight="bold">Zero</text>
          <line x1={320} y1={25} x2={320} y2={100} stroke={RISE_COLOR} strokeWidth={3} />
          <text x={320} y={115} textAnchor={"middle" as const} fill={RISE_COLOR} fontSize={11} fontWeight="bold">Undefined</text>
        </svg>

        <motion.button whileTap={{ scale: 0.95 }} onClick={handleAck} className="rounded-xl px-8 py-3 text-base font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label={current.button}>
          {current.button}
        </motion.button>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 4: Symbol Bridge                                             */
/* ================================================================== */

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [setTimeout(() => setStep(1), 1200), setTimeout(() => setStep(2), 2400), setTimeout(() => setStep(3), 3600)];
    return () => timers.forEach(clearTimeout);
  }, []);

  const formulas = [
    { text: "slope = rise / run", color: MUTED },
    { text: "m = (y\u2082 \u2212 y\u2081) / (x\u2082 \u2212 x\u2081)", color: PRIMARY },
    { text: "Example: (1,2) and (4,8) \u2192 m = 6/3 = 2", color: LINE_COLOR },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>The Slope Formula</h2>
        <div className="flex flex-col gap-4">
          {formulas.map((f, i) => i <= step ? (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
              <p className="font-mono text-[clamp(14px,3.5vw,22px)] font-bold" style={{ color: f.color }}>{f.text}</p>
            </motion.div>
          ) : null)}
        </div>
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING} className="rounded-2xl border-2 px-8 py-6 text-center" style={{ borderColor: PRIMARY, background: `${PRIMARY}15` }}>
            <p className="font-mono text-[clamp(20px,5vw,36px)] font-bold" style={{ color: PRIMARY }}>{"m = \u0394y / \u0394x"}</p>
          </motion.div>
        )}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World Anchor                                         */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\uD83D\uDEE3\uFE0F", title: "Road Grade", desc: "A 6% grade means the road rises 6 feet for every 100 feet forward. That is a slope of 0.06." },
    { icon: "\u267F", title: "Wheelchair Ramp", desc: "ADA requires a maximum slope of 1/12 (1 inch rise per 12 inches run). Steeper is unsafe." },
    { icon: "\uD83C\uDFE0", title: "Roof Pitch", desc: "A 4/12 roof pitch means 4 inches of rise for every 12 inches of run. Steeper roofs shed snow better." },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Slope in Real Life</h2>
        <div className="flex flex-col gap-4">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="rounded-xl p-4" style={{ background: SURFACE }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <ContinueButton onClick={onContinue} />
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 6: Practice                                                  */
/* ================================================================== */

interface PracticeProblem { id: number; layer: "recall" | "procedure" | "understanding"; question: string; options: string[]; correctIndex: number; feedback: string; }

const PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "recall", question: "Slope is defined as:", options: ["run / rise", "rise / run", "rise \u00D7 run", "rise + run"], correctIndex: 1, feedback: "Slope = rise / run, or the vertical change divided by the horizontal change." },
  { id: 2, layer: "recall", question: "A horizontal line has a slope of:", options: ["0", "1", "Undefined", "\u22121"], correctIndex: 0, feedback: "A horizontal line has zero rise, so slope = 0/run = 0." },
  { id: 3, layer: "recall", question: "A vertical line has a slope that is:", options: ["0", "1", "Undefined", "Infinity"], correctIndex: 2, feedback: "A vertical line has zero run. Division by zero is undefined, so the slope is undefined." },
  { id: 4, layer: "procedure", question: "Find the slope between (2, 3) and (5, 9).", options: ["2", "3", "1/2", "6"], correctIndex: 0, feedback: "m = (9 \u2212 3) / (5 \u2212 2) = 6/3 = 2." },
  { id: 5, layer: "procedure", question: "Find the slope between (1, 7) and (4, 1).", options: ["\u22122", "2", "\u22121/2", "6"], correctIndex: 0, feedback: "m = (1 \u2212 7) / (4 \u2212 1) = \u22126/3 = \u22122. Negative slope means the line goes downhill." },
  { id: 6, layer: "procedure", question: "Find the slope between (\u22121, 4) and (3, 4).", options: ["0", "4", "Undefined", "1"], correctIndex: 0, feedback: "m = (4 \u2212 4) / (3 \u2212 (\u22121)) = 0/4 = 0. Same y-values means horizontal line." },
  { id: 7, layer: "understanding", question: "If a line has slope \u22123, what happens to y when x increases by 1?", options: ["y decreases by 3", "y increases by 3", "y stays the same", "y decreases by 1/3"], correctIndex: 0, feedback: "Slope = rise/run = \u22123/1. For each 1 step right, y drops 3 units." },
  { id: 8, layer: "understanding", question: "Two lines have slopes 2 and 5. Which is steeper?", options: ["Slope 5", "Slope 2", "They are equally steep", "Cannot tell without points"], correctIndex: 0, feedback: "A larger absolute slope means steeper. |5| > |2|, so slope 5 is steeper." },
  { id: 9, layer: "understanding", question: "Can two different pairs of points on the same line give different slopes?", options: ["No \u2014 slope is constant for a line", "Yes, depending on which points", "Only if the line is vertical", "Only if slope is 0"], correctIndex: 0, feedback: "A straight line has the same slope everywhere. Any two distinct points give the same result!" },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = done ? null : (PROBLEMS[currentIdx] ?? null);

  const handleSelect = useCallback((optIdx: number) => {
    if (answered || !problem) return;
    setSelected(optIdx); setAnswered(true);
    if (optIdx === problem.correctIndex) setScore((s) => s + 1);
  }, [answered, problem]);

  const handleNext = useCallback(() => { setSelected(null); setAnswered(false); setCurrentIdx((i) => i + 1); }, []);

  if (done || !problem) {
    return (<StageWrapper><div className="flex flex-col items-center gap-4"><h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: TEXT }}>Practice Complete!</h2><p className="text-lg" style={{ color: MUTED }}>You got {score} out of {PROBLEMS.length} correct.</p><ContinueButton onClick={onContinue} label="Continue" /></div></StageWrapper>);
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: MUTED }}>Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})</p>
        <div className="w-full rounded-xl p-6" style={{ background: SURFACE }}><p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: TEXT }}>{problem.question}</p></div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex;
            const isSelected = i === selected;
            let bg: string = SURFACE; let border: string = BORDER;
            if (answered) { if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; } else if (isSelected) { bg = `${ERROR}20`; border = ERROR; } }
            return (<motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>{opt}{answered && isCorrect && <span className="ml-2" style={{ color: SUCCESS }}>{"  \u2713"}</span>}{answered && isSelected && !isCorrect && <span className="ml-2" style={{ color: ERROR }}>{"  \u2717"}</span>}</motion.button>);
          })}
        </div>
        {answered && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-xl p-4" style={{ background: selected === problem.correctIndex ? `${SUCCESS}15` : `${ERROR}15` }}><p className="text-sm leading-relaxed" style={{ color: TEXT }}>{problem.feedback}</p></motion.div>)}
        {answered && (<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }} aria-label="Next problem">{"Next \u2192"}</motion.button>)}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback(() => { setSubmitted(true); }, []);

  if (submitted) {
    return (<StageWrapper><div className="flex flex-col items-center gap-4 text-center"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}><p className="text-4xl">{"\uD83E\uDDE0"}</p><h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2><p className="mt-2 text-sm" style={{ color: MUTED }}>Understanding slope unlocks the entire world of linear functions. +50 XP</p></motion.div><ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} /></div></StageWrapper>);
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>Why does it not matter which two points on a line you pick to calculate slope?</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your explanation here..." className="w-full rounded-xl border-2 p-4 text-base" style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }} aria-label="Reflection text" />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }} aria-label="Submit reflection">Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main Lesson Component                                              */
/* ================================================================== */

export function SlopeLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);
  const advance = useCallback(() => { const next = STAGES[stageIdx + 1]; if (next) { setStage(next); } else { onComplete?.(); } }, [stageIdx, onComplete]);

  return (
    <div className="flex min-h-dvh flex-col" style={{ background: BG }}>
      <ProgressBar current={stageIdx} total={STAGES.length} />
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="flex-1">
          {stage === "hook" && <HookStage onContinue={advance} />}
          {stage === "spatial" && <SpatialStage onContinue={advance} />}
          {stage === "discovery" && <DiscoveryStage onContinue={advance} />}
          {stage === "symbol" && <SymbolBridgeStage onContinue={advance} />}
          {stage === "realWorld" && <RealWorldStage onContinue={advance} />}
          {stage === "practice" && <PracticeStage onContinue={advance} />}
          {stage === "reflection" && <ReflectionStage onContinue={advance} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
