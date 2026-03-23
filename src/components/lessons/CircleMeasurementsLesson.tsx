"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

/**
 * GE-4.5a Circle Measurements — Grade 7
 * Prerequisites: GE-4.5 (Circles basics)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: A circle's circumference is always pi times its diameter,
 *   and its area is pi times the radius squared.
 *
 * Stage flow:
 *  1. Hook — circle unrolls to show circumference = pi*d
 *  2. Spatial — adjust radius slider, watch C and A update live
 *  3. Discovery — ratio C/d is always pi; wedges rearrange to approximate rectangle
 *  4. Symbol Bridge — C=2*pi*r, A=pi*r^2
 *  5. Real World — pizza, wheel, circular garden
 *  6. Practice — 9 problems
 *  7. Reflection
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

const CIRCUM_COLOR = "#22d3ee"; // cyan
const AREA_COLOR = "#a78bfa";   // purple
const RADIUS_COLOR = "#f472b6"; // pink
const DIAM_COLOR = "#60a5fa";   // blue

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };

type Stage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGES: Stage[] = [
  "hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection",
];

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-2 py-3" style={{ background: BG }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full transition-all duration-300"
          style={{ background: i <= current ? PRIMARY : BORDER, transform: i === current ? "scale(1.4)" : "scale(1)" }}
        />
      ))}
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue", delay = 0 }: { onClick: () => void; label?: string; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white hover:brightness-110 active:scale-[0.97]"
      style={{ background: PRIMARY, minHeight: 48 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-12"
      style={{ background: BG }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook — Unrolling circle                                   */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/CircleMeasurementsHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 4800),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const r = 60;
  const cx = 160;
  const cy = 130;
  const circumference = 2 * Math.PI * r;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: TEXT }}
        >
          What happens when you unroll a circle?
        </motion.h2>

        <svg viewBox="0 0 420 260" className="w-full max-w-md" aria-label="Circle unrolling animation">
          {/* Circle */}
          {phase >= 0 && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={CIRCUM_COLOR}
              strokeWidth={3}
              strokeDasharray={circumference}
              strokeDashoffset={phase >= 2 ? circumference : 0}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Diameter line */}
          {phase >= 1 && (
            <motion.line
              x1={cx - r}
              y1={cy}
              x2={cx + r}
              y2={cy}
              stroke={DIAM_COLOR}
              strokeWidth={2}
              strokeDasharray="6 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
          {phase >= 1 && (
            <motion.text
              x={cx}
              y={cy + 20}
              textAnchor={"middle" as const}
              fill={DIAM_COLOR}
              fontSize={14}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              d
            </motion.text>
          )}

          {/* Unrolled line */}
          {phase >= 2 && (
            <motion.line
              x1={40}
              y1={220}
              x2={40 + 3.14159 * 2 * r * 0.95}
              y2={220}
              stroke={CIRCUM_COLOR}
              strokeWidth={3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}

          {/* Pi * d markers */}
          {phase >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* Diameter-length segments marked on unrolled line */}
              {[0, 1, 2].map((i) => {
                const segStart = 40 + i * (2 * r);
                const segEnd = Math.min(segStart + 2 * r, 40 + 3.14159 * 2 * r * 0.95);
                return (
                  <g key={i}>
                    <line x1={segStart} y1={215} x2={segStart} y2={225} stroke={DIAM_COLOR} strokeWidth={2} />
                    {i < 3 && (
                      <text
                        x={(segStart + segEnd) / 2}
                        y={240}
                        textAnchor={"middle" as const}
                        fill={DIAM_COLOR}
                        fontSize={12}
                        fontWeight="bold"
                      >
                        d
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={40 + 3.14159 * 2 * r * 0.95 + 8} y={224} fill={CIRCUM_COLOR} fontSize={14} fontWeight="bold">
                {"= \u03C0d"}
              </text>
            </motion.g>
          )}
        </svg>

        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center font-mono text-[clamp(18px,4vw,26px)] font-bold"
            style={{ color: TEXT }}
          >
            {"Circumference = "}
            <span style={{ color: CIRCUM_COLOR }}>{"\u03C0"}</span>
            {" \u00D7 "}
            <span style={{ color: DIAM_COLOR }}>d</span>
          </motion.p>
        )}

        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial — radius slider                                   */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [radius, setRadius] = useState(4);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;

  const svgR = radius * 20;
  const cxSvg = 200;
  const cySvg = 140;

  const handleChange = useCallback((val: number) => {
    setRadius(val);
    setInteractions((c) => c + 1);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Adjust the radius
        </h2>

        <svg viewBox="0 0 400 280" className="w-full max-w-md" aria-label="Circle with adjustable radius">
          {/* Filled area */}
          <motion.circle
            cx={cxSvg}
            cy={cySvg}
            r={svgR}
            fill={`${AREA_COLOR}20`}
            stroke={CIRCUM_COLOR}
            strokeWidth={2.5}
            transition={SPRING}
          />

          {/* Radius line */}
          <motion.line
            x1={cxSvg}
            y1={cySvg}
            x2={cxSvg + svgR}
            y2={cySvg}
            stroke={RADIUS_COLOR}
            strokeWidth={2}
            transition={SPRING}
          />

          {/* r label */}
          <motion.text
            x={cxSvg + svgR / 2}
            y={cySvg - 10}
            textAnchor={"middle" as const}
            fill={RADIUS_COLOR}
            fontSize={16}
            fontWeight="bold"
            transition={SPRING}
          >
            {`r = ${radius}`}
          </motion.text>

          {/* Center dot */}
          <circle cx={cxSvg} cy={cySvg} r={4} fill={TEXT} />
        </svg>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="rounded-xl px-4 py-3 text-center" style={{ background: SURFACE }}>
            <p className="text-xs font-semibold" style={{ color: CIRCUM_COLOR }}>Circumference</p>
            <p className="font-mono text-lg font-bold tabular-nums" style={{ color: TEXT }}>
              {circumference.toFixed(1)}
            </p>
          </div>
          <div className="rounded-xl px-4 py-3 text-center" style={{ background: SURFACE }}>
            <p className="text-xs font-semibold" style={{ color: AREA_COLOR }}>Area</p>
            <p className="font-mono text-lg font-bold tabular-nums" style={{ color: TEXT }}>
              {area.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="flex w-full max-w-xs items-center gap-3">
          <span className="text-sm" style={{ color: MUTED }}>1</span>
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={radius}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="flex-1"
            style={{ accentColor: RADIUS_COLOR, minHeight: 44 }}
            aria-label="Radius slider"
          />
          <span className="text-sm" style={{ color: MUTED }}>8</span>
        </div>

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Discovery                                                 */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "Look at the circumference values as you changed the radius. Divide circumference by diameter (2r). What do you notice?", button: "I see it!" },
    { text: "The ratio C \u00F7 d is ALWAYS the same number: approximately 3.14159... This special number is called \u03C0 (pi)!", button: "I see it!" },
    { text: "For area, imagine cutting the circle into thin wedges and rearranging them into a rectangle. Its width is \u03C0r and height is r, so area = \u03C0r\u00B2!", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const current = prompts[promptIdx]!;

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) setPromptIdx((i) => i + 1);
    else onContinue();
  }, [promptIdx, prompts.length, onContinue]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex gap-2">
          {prompts.map((_, i) => (
            <div key={i} className="h-2 w-8 rounded-full" style={{ background: i <= promptIdx ? PRIMARY : BORDER }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: SURFACE }}
          >
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Ratio table */}
        {promptIdx >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl p-4"
            style={{ background: SURFACE }}
          >
            <table className="text-sm" style={{ color: TEXT }}>
              <thead>
                <tr>
                  <th className="px-3 py-1" style={{ color: MUTED }}>r</th>
                  <th className="px-3 py-1" style={{ color: CIRCUM_COLOR }}>C</th>
                  <th className="px-3 py-1" style={{ color: DIAM_COLOR }}>d</th>
                  <th className="px-3 py-1" style={{ color: PRIMARY }}>C/d</th>
                </tr>
              </thead>
              <tbody>
                {[2, 3, 5].map((r) => (
                  <tr key={r}>
                    <td className="px-3 py-1 text-center font-mono tabular-nums">{r}</td>
                    <td className="px-3 py-1 text-center font-mono tabular-nums">{(2 * Math.PI * r).toFixed(1)}</td>
                    <td className="px-3 py-1 text-center font-mono tabular-nums">{2 * r}</td>
                    <td className="px-3 py-1 text-center font-mono font-bold tabular-nums" style={{ color: PRIMARY }}>
                      {(Math.PI).toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAck}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white"
          style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}
        >
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
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { text: "C = 2\u03C0r", subtitle: "(or C = \u03C0d)", color: CIRCUM_COLOR },
    { text: "A = \u03C0r\u00B2", subtitle: "", color: AREA_COLOR },
    { text: "\u03C0 \u2248 3.14159...", subtitle: "an irrational number!", color: PRIMARY },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Circle Formulas
        </h2>

        {notations.map((n, i) =>
          i <= step ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={SPRING}
              className="w-full rounded-xl px-6 py-4 text-center"
              style={{ background: SURFACE }}
            >
              <p className="font-mono text-[clamp(20px,5vw,32px)] font-bold" style={{ color: n.color }}>
                {n.text}
              </p>
              {n.subtitle && (
                <p className="mt-1 text-sm" style={{ color: MUTED }}>{n.subtitle}</p>
              )}
            </motion.div>
          ) : null
        )}

        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World                                                */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "🍕", title: "Pizza Size", desc: "A 14-inch pizza has diameter 14. Area = \u03C0(7)\u00B2 \u2248 153.9 sq inches of deliciousness." },
    { icon: "🚲", title: "Bike Wheel", desc: "A wheel with radius 13 inches rolls one circumference (2\u03C0 \u00D7 13 \u2248 81.7 in) per revolution." },
    { icon: "🌻", title: "Circular Garden", desc: "A 5-meter radius garden needs 2\u03C0(5) \u2248 31.4 m of fencing around it." },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Circles in Real Life
        </h2>
        {scenarios.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }}
            className="w-full rounded-xl p-4"
            style={{ background: SURFACE }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <ContinueButton onClick={onContinue} />
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 6: Practice                                                  */
/* ================================================================== */

interface PracticeProblem {
  id: number;
  layer: "recall" | "procedure" | "understanding";
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

const PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "recall", question: "What is the formula for circumference?", options: ["C = \u03C0r", "C = 2\u03C0r", "C = \u03C0r\u00B2", "C = 2r"], correctIndex: 1, feedback: "C = 2\u03C0r. The circumference is 2 times \u03C0 times the radius." },
  { id: 2, layer: "recall", question: "What is the formula for circle area?", options: ["A = 2\u03C0r", "A = \u03C0d", "A = \u03C0r\u00B2", "A = 2\u03C0r\u00B2"], correctIndex: 2, feedback: "A = \u03C0r\u00B2. Area equals \u03C0 times the radius squared." },
  { id: 3, layer: "recall", question: "If the diameter is 10, what is the radius?", options: ["5", "10", "20", "15"], correctIndex: 0, feedback: "The radius is half the diameter: 10 \u00F7 2 = 5." },
  { id: 4, layer: "procedure", question: "A circle has radius 7. What is its circumference? (Use \u03C0 \u2248 3.14)", options: ["21.98", "43.96", "153.86", "14"], correctIndex: 1, feedback: "C = 2\u03C0(7) = 14\u03C0 \u2248 43.96" },
  { id: 5, layer: "procedure", question: "A circle has radius 5. What is its area? (Use \u03C0 \u2248 3.14)", options: ["31.4", "78.5", "15.7", "25"], correctIndex: 1, feedback: "A = \u03C0(5)\u00B2 = 25\u03C0 \u2248 78.5" },
  { id: 6, layer: "procedure", question: "A circle has circumference 31.4. What is its diameter? (Use \u03C0 \u2248 3.14)", options: ["5", "10", "15.7", "100"], correctIndex: 1, feedback: "d = C/\u03C0 = 31.4/3.14 = 10" },
  { id: 7, layer: "understanding", question: "If you double the radius, what happens to the area?", options: ["It doubles", "It triples", "It quadruples (4\u00D7)", "It stays the same"], correctIndex: 2, feedback: "Area = \u03C0r\u00B2. Doubling r gives \u03C0(2r)\u00B2 = 4\u03C0r\u00B2 \u2014 four times the original!" },
  { id: 8, layer: "understanding", question: "If you double the radius, what happens to the circumference?", options: ["It doubles", "It quadruples", "It halves", "It stays the same"], correctIndex: 0, feedback: "C = 2\u03C0r. Doubling r gives 2\u03C0(2r) = 2 \u00D7 2\u03C0r \u2014 exactly double." },
  { id: 9, layer: "understanding", question: "Which grows faster as radius increases: circumference or area?", options: ["Circumference (linear)", "Area (quadratic)", "They grow at the same rate", "Neither grows"], correctIndex: 1, feedback: "Area grows as r\u00B2 (quadratic) while circumference grows as r (linear). Area grows faster!" },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = PROBLEMS[currentIdx];

  const handleSelect = useCallback((optIdx: number) => {
    if (answered || !problem) return;
    setSelected(optIdx);
    setAnswered(true);
    if (optIdx === problem.correctIndex) setScore((s) => s + 1);
  }, [answered, problem]);

  const handleNext = useCallback(() => {
    setSelected(null);
    setAnswered(false);
    setCurrentIdx((i) => i + 1);
  }, []);

  if (done || !problem) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: TEXT }}>Practice Complete!</h2>
          <p className="text-lg" style={{ color: MUTED }}>{score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} />
        </div>
      </StageWrapper>
    );
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: MUTED }}>
          Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})
        </p>
        <div className="w-full rounded-xl p-6" style={{ background: SURFACE }}>
          <p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: TEXT }}>
            {problem.question}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex;
            const isSelected = i === selected;
            let bg = SURFACE;
            let border = BORDER;
            if (answered) {
              if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; }
              else if (isSelected) { bg = `${ERROR}20`; border = ERROR; }
            }
            return (
              <motion.button
                key={i}
                whileTap={answered ? {} : { scale: 0.97 }}
                onClick={() => handleSelect(i)}
                className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium"
                style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }}
                aria-label={`Option: ${opt}`}
              >
                {opt}
                {answered && isCorrect && <span style={{ color: SUCCESS }}>{" \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span style={{ color: ERROR }}>{" \u2717"}</span>}
              </motion.button>
            );
          })}
        </div>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-xl p-4"
            style={{ background: selected === problem.correctIndex ? `${SUCCESS}15` : `${ERROR}15` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: TEXT }}>{problem.feedback}</p>
          </motion.div>
        )}
        {answered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-xl px-8 py-3 font-semibold text-white"
            style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}
          >
            {"Next \u2192"}
          </motion.button>
        )}
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

  if (submitted) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">🧠</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Self-explanation strengthens your understanding. +50 XP</p>
          </motion.div>
          <ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} />
        </div>
      </StageWrapper>
    );
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>
          Explain in your own words why circumference grows linearly with radius but area grows quadratically.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          className="w-full rounded-xl border-2 p-4 text-base"
          style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }}
          aria-label="Reflection text"
        />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>
            Skip
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSubmitted(true)}
            disabled={text.length < 20}
            className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40"
            style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }}
          >
            Submit
          </motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>
          {text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}
        </p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main                                                               */
/* ================================================================== */

export function CircleMeasurementsLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGES[stageIdx + 1];
    if (next) setStage(next);
    else onComplete?.();
  }, [stageIdx, onComplete]);

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
