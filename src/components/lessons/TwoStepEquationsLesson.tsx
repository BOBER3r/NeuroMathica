"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface TwoStepEquationsLessonProps {
  onComplete?: () => void;
}

type NLSStage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGE_ORDER: readonly NLSStage[] = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// SPRING & ANIMATION CONFIGS
// ═══════════════════════════════════════════════════════════════════════════

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// COLORS
// ═══════════════════════════════════════════════════════════════════════════

const C = {
  variable: "#a78bfa",
  variableFill: "#a78bfa33",
  operation: "#f59e0b",
  operationFill: "#f59e0b33",
  inverse: "#22d3ee",
  inverseFill: "#22d3ee33",
  solution: "#34d399",
  solutionFill: "#34d39933",
  block: "#60a5fa",
  blockFill: "#60a5fa33",
  scale: "#64748b",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  success: "#34d399",
  error: "#f87171",
  warning: "#fbbf24",
  primary: "#8b5cf6",
  primaryHover: "#7c3aed",
  border: "#334155",
  borderLight: "#475569",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function StageProgressDots({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === currentIndex ? 10 : 8,
            height: i === currentIndex ? 10 : 8,
            backgroundColor:
              i < currentIndex
                ? C.success
                : i === currentIndex
                  ? C.primary
                  : C.border,
            boxShadow:
              i === currentIndex ? `0 0 8px ${C.primary}80` : "none",
          }}
          aria-label={
            i < currentIndex
              ? `Stage ${i + 1}: completed`
              : i === currentIndex
                ? `Stage ${i + 1}: current`
                : `Stage ${i + 1}: upcoming`
          }
        />
      ))}
    </div>
  );
}

function ContinueButton({
  onClick,
  label = "Continue",
  disabled = false,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: disabled ? 0.4 : 1 }}
      transition={FADE}
      onClick={onClick}
      disabled={disabled}
      className="min-h-[48px] min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:pointer-events-none"
      style={{ backgroundColor: C.primary }}
      whileHover={disabled ? {} : { backgroundColor: C.primaryHover }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/TwoStepEquationsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1000));
    timers.push(setTimeout(() => setPhase(3), 2000));
    timers.push(setTimeout(() => setPhase(4), 3000));
    timers.push(setTimeout(() => setPhase(5), 4000));
    timers.push(setTimeout(() => setPhase(6), 5500));
    timers.push(setTimeout(() => setPhase(7), 6500));
    timers.push(setTimeout(() => setPhase(8), 7500));
    timers.push(setTimeout(() => setPhase(9), 8500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 9)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 640 }}
        aria-live="polite"
      >
        {/* Title */}
        <AnimatePresence>
          {phase >= 1 && phase < 5 && (
            <motion.p
              key="hook-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-center italic"
              style={{
                color: C.textPrimary,
                fontSize: "clamp(20px, 5vw, 32px)",
              }}
            >
              A number hidden behind two disguises...
            </motion.p>
          )}
        </AnimatePresence>

        <svg
          viewBox="0 0 600 360"
          className="mx-auto w-full"
          style={{ maxWidth: 520 }}
          aria-label="A number 5 is disguised: first multiplied by 3 to become 15, then 7 is added to become 22. Undoing in reverse reveals the original number."
        >
          {/* The original number */}
          {phase >= 2 && phase < 3 && (
            <motion.text
              x={300}
              y={180}
              textAnchor={"middle" as const}
              dominantBaseline="central"
              fill={C.variable}
              fontSize={56}
              fontWeight={700}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING_POP}
            >
              5
            </motion.text>
          )}

          {/* Multiply ring wrapping */}
          {phase >= 3 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
            >
              <circle
                cx={300}
                cy={180}
                r={50}
                fill="none"
                stroke={C.operation}
                strokeWidth={3}
                strokeDasharray="8 4"
              />
              <motion.text
                x={300}
                y={120}
                textAnchor={"middle" as const}
                fill={C.operation}
                fontSize={16}
                fontWeight={600}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {"multiply by 3"}
              </motion.text>
              <text
                x={300}
                y={180}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={phase >= 6 ? C.variable : C.textPrimary}
                fontSize={phase >= 6 ? 56 : 40}
                fontWeight={700}
              >
                {phase >= 8 ? "5" : phase >= 6 ? "15" : "15"}
              </text>
            </motion.g>
          )}

          {/* Addition shell */}
          {phase >= 4 && phase < 7 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
            >
              <circle
                cx={300}
                cy={180}
                r={80}
                fill="none"
                stroke={C.inverse}
                strokeWidth={3}
                strokeDasharray="12 4"
              />
              <motion.text
                x={300}
                y={90}
                textAnchor={"middle" as const}
                fill={C.inverse}
                fontSize={16}
                fontWeight={600}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {"+ 7"}
              </motion.text>
            </motion.g>
          )}

          {/* Result display */}
          {phase >= 4 && phase < 6 && (
            <motion.text
              x={300}
              y={290}
              textAnchor={"middle" as const}
              fill={C.textPrimary}
              fontSize={28}
              fontWeight={700}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
            >
              {"? "}{"\u2192"}{" 22"}
            </motion.text>
          )}

          {/* Peel off phase labels */}
          {phase >= 6 && phase < 8 && (
            <motion.text
              x={300}
              y={290}
              textAnchor={"middle" as const}
              fill={C.inverse}
              fontSize={20}
              fontWeight={600}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={FADE}
            >
              {"22 \u2212 7 = 15"}
            </motion.text>
          )}

          {phase >= 7 && phase < 9 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={FADE}
            >
              {/* x3 ring still visible, shrinks */}
              <circle
                cx={300}
                cy={180}
                r={50}
                fill="none"
                stroke={C.operation}
                strokeWidth={3}
                strokeDasharray="8 4"
                opacity={phase >= 8 ? 0.3 : 1}
              />
            </motion.g>
          )}

          {phase >= 8 && (
            <motion.text
              x={300}
              y={290}
              textAnchor={"middle" as const}
              fill={C.operation}
              fontSize={20}
              fontWeight={600}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={FADE}
            >
              {"15 \u00f7 3 = 5"}
            </motion.text>
          )}
        </svg>

        {/* Tagline text */}
        <AnimatePresence>
          {phase >= 5 && phase < 6 && (
            <motion.p
              key="tagline-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              className="mt-2 text-center italic"
              style={{ color: C.textSecondary, fontSize: 16 }}
            >
              Two disguises. Two steps to reveal.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 9 && (
            <motion.p
              key="tagline-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-4 text-center font-semibold"
              style={{ color: C.textPrimary, fontSize: 18 }}
            >
              {"Always undo the "}
              <span
                style={{
                  color: C.inverse,
                  textTransform: "uppercase",
                  textShadow: "0 0 8px #22d3ee40",
                }}
              >
                outer layer
              </span>
              {" first."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {phase >= 9 && (
        <div className="mt-8">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE (Two-Step Balance Scale)
// ═══════════════════════════════════════════════════════════════════════════

interface TwoStepScenario {
  coefficient: number;
  constant: number;
  result: number;
  solution: number;
}

const SCENARIOS: readonly TwoStepScenario[] = [
  { coefficient: 2, constant: 4, result: 12, solution: 4 },
  { coefficient: 3, constant: 5, result: 17, solution: 4 },
  { coefficient: 4, constant: 2, result: 18, solution: 4 },
] as const;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenario = SCENARIOS[scenarioIdx]!;
  const [step, setStep] = useState<"subtract" | "divide" | "solved">("subtract");
  const [interactions, setInteractions] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [wrongOrderMsg, setWrongOrderMsg] = useState<string | null>(null);
  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const canContinue = solvedCount >= 2 && interactions >= 8;

  useEffect(() => {
    return () => {
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
    };
  }, []);

  // Current display values
  const displayConst = step === "subtract" ? scenario.constant : 0;
  const displayRight = step === "subtract" ? scenario.result : scenario.result - scenario.constant;
  const displayCoeff = scenario.coefficient;

  const handleSubtract = useCallback(() => {
    if (step !== "subtract") return;
    setStep("divide");
    setInteractions((c) => c + 1);
  }, [step]);

  const handleDivide = useCallback(() => {
    if (step === "subtract") {
      // Wrong order!
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
      setWrongOrderMsg("Undo the OUTER layer first! Subtract before dividing.");
      setInteractions((c) => c + 1);
      wrongTimerRef.current = setTimeout(() => setWrongOrderMsg(null), 2500);
      return;
    }
    if (step !== "divide") return;
    setStep("solved");
    setSolvedCount((c) => c + 1);
    setInteractions((c) => c + 1);
  }, [step]);

  const handleNext = useCallback(() => {
    const nextIdx = (scenarioIdx + 1) % SCENARIOS.length;
    setScenarioIdx(nextIdx);
    setStep("subtract");
    setInteractions((c) => c + 1);
  }, [scenarioIdx]);

  // SVG layout
  const SVG_W = 440;
  const SVG_H = 260;
  const CX = SVG_W / 2;
  const CY = 160;
  const BEAM_W = 320;
  const PAN_W = 120;
  const BLOCK = 22;

  // Tilt: balanced when equation holds
  const leftVal = displayCoeff * scenario.solution + displayConst;
  const rightVal = displayRight;
  const tiltAngle = Math.max(-12, Math.min(12, (leftVal - rightVal) * 1.5));

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Equation display */}
      <div
        className="mb-3 mt-2 flex items-center justify-center rounded-xl px-5 py-3 font-mono"
        style={{
          backgroundColor: C.bgSurface,
          fontSize: "clamp(20px, 5vw, 28px)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {step === "solved" ? (
          <>
            <span style={{ color: C.variable }}>x</span>
            <span style={{ color: C.textMuted }}>{" = "}</span>
            <span style={{ color: C.solution }}>{scenario.solution}</span>
          </>
        ) : (
          <>
            {displayCoeff > 1 && (
              <span style={{ color: C.variable }}>{displayCoeff}</span>
            )}
            <span style={{ color: C.variable }}>x</span>
            {displayConst > 0 && (
              <span style={{ color: C.operation }}>
                {" + "}
                {displayConst}
              </span>
            )}
            <span style={{ color: C.textMuted }}>{" = "}</span>
            <span style={{ color: C.textPrimary }}>{displayRight}</span>
          </>
        )}
      </div>

      {/* Step indicator */}
      <div
        className="mb-2 rounded-lg px-4 py-2 text-center text-sm font-semibold"
        style={{
          backgroundColor: step === "solved" ? C.solutionFill : C.inverseFill,
          color: step === "solved" ? C.solution : C.inverse,
        }}
      >
        {step === "subtract" && `Step 1: Undo the + ${scenario.constant}`}
        {step === "divide" && `Step 2: Undo the multiply by ${scenario.coefficient}`}
        {step === "solved" && "Solved! x is revealed!"}
      </div>

      {/* Balance scale SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="mx-auto w-full"
        aria-label={`Balance scale showing ${displayCoeff}x + ${displayConst} on the left and ${displayRight} on the right`}
      >
        {/* Fulcrum */}
        <polygon
          points={`${CX - 20},${CY + 40} ${CX + 20},${CY + 40} ${CX},${CY - 8}`}
          fill="#475569"
          stroke={C.scale}
          strokeWidth={2}
        />

        {/* Beam group (tilts) */}
        <motion.g
          style={{ originX: `${CX}px`, originY: `${CY - 8}px` }}
          animate={{ rotate: tiltAngle }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
        >
          {/* Beam bar */}
          <rect
            x={CX - BEAM_W / 2}
            y={CY - 12}
            width={BEAM_W}
            height={8}
            rx={4}
            fill={C.scale}
          />

          {/* Left pan */}
          <line x1={CX - BEAM_W / 2 + 10} y1={CY - 8} x2={CX - BEAM_W / 2 + 10} y2={CY + 18} stroke={C.scale} strokeWidth={2} />
          <line x1={CX - BEAM_W / 2 + PAN_W - 10} y1={CY - 8} x2={CX - BEAM_W / 2 + PAN_W - 10} y2={CY + 18} stroke={C.scale} strokeWidth={2} />
          <rect
            x={CX - BEAM_W / 2}
            y={CY + 18}
            width={PAN_W}
            height={18}
            rx={6}
            fill="#334155"
            stroke="#475569"
            strokeWidth={1}
          />

          {/* x-boxes on left */}
          {step !== "solved" &&
            Array.from({ length: displayCoeff }, (_, i) => {
              const bx = CX - BEAM_W / 2 + 4 + i * (BLOCK + 3);
              const by = CY + 18 - BLOCK - 2;
              return (
                <g key={`xbox-${i}`}>
                  <rect x={bx} y={by} width={BLOCK} height={BLOCK} rx={5} fill={C.variableFill} stroke={C.variable} strokeWidth={2} />
                  <text x={bx + BLOCK / 2} y={by + BLOCK / 2} textAnchor={"middle" as const} dominantBaseline="central" fill={C.variable} fontSize={12} fontWeight={700}>
                    x
                  </text>
                </g>
              );
            })}

          {/* constant blocks on left */}
          {displayConst > 0 &&
            Array.from({ length: displayConst }, (_, i) => {
              const bx = CX - BEAM_W / 2 + 4 + displayCoeff * (BLOCK + 3) + i * (BLOCK + 2);
              const by = CY + 18 - BLOCK - 2;
              return (
                <g key={`const-${i}`}>
                  <rect x={bx} y={by} width={BLOCK} height={BLOCK} rx={4} fill={C.operationFill} stroke={C.operation} strokeWidth={1} />
                  <text x={bx + BLOCK / 2} y={by + BLOCK / 2} textAnchor={"middle" as const} dominantBaseline="central" fill="#fff" fontSize={10} fontWeight={700}>
                    1
                  </text>
                </g>
              );
            })}

          {/* Solved x on left */}
          {step === "solved" && (
            <motion.text
              x={CX - BEAM_W / 2 + PAN_W / 2}
              y={CY + 2}
              textAnchor={"middle" as const}
              dominantBaseline="central"
              fill={C.solution}
              fontSize={24}
              fontWeight={700}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={SPRING_POP}
            >
              {scenario.solution}
            </motion.text>
          )}

          {/* Right pan */}
          <line x1={CX + BEAM_W / 2 - PAN_W + 10} y1={CY - 8} x2={CX + BEAM_W / 2 - PAN_W + 10} y2={CY + 18} stroke={C.scale} strokeWidth={2} />
          <line x1={CX + BEAM_W / 2 - 10} y1={CY - 8} x2={CX + BEAM_W / 2 - 10} y2={CY + 18} stroke={C.scale} strokeWidth={2} />
          <rect
            x={CX + BEAM_W / 2 - PAN_W}
            y={CY + 18}
            width={PAN_W}
            height={18}
            rx={6}
            fill="#334155"
            stroke="#475569"
            strokeWidth={1}
          />

          {/* Right pan value */}
          <text
            x={CX + BEAM_W / 2 - PAN_W / 2}
            y={CY + 4}
            textAnchor={"middle" as const}
            dominantBaseline="central"
            fill={step === "solved" ? C.solution : C.textPrimary}
            fontSize={22}
            fontWeight={700}
          >
            {step === "solved" ? scenario.solution : displayRight}
          </text>
        </motion.g>
      </svg>

      {/* Wrong-order message */}
      <AnimatePresence>
        {wrongOrderMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 rounded-lg px-4 py-2 text-center text-sm font-semibold"
            style={{ backgroundColor: "#f8717120", color: C.error }}
          >
            {wrongOrderMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      {step !== "solved" ? (
        <div className="mt-2 flex gap-3 justify-center">
          <motion.button
            onClick={handleSubtract}
            className="min-h-[48px] min-w-[140px] rounded-xl px-4 py-3 text-sm font-semibold text-white"
            style={{
              backgroundColor: step === "subtract" ? C.inverse : C.bgSurface,
              border: `2px solid ${step === "subtract" ? C.inverse : C.borderLight}`,
              color: step === "subtract" ? "#fff" : C.textMuted,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Subtract ${scenario.constant} from both sides`}
          >
            {`\u2212 ${scenario.constant} both sides`}
          </motion.button>

          <motion.button
            onClick={handleDivide}
            className="min-h-[48px] min-w-[140px] rounded-xl px-4 py-3 text-sm font-semibold text-white"
            style={{
              backgroundColor: step === "divide" ? C.inverse : C.bgSurface,
              border: `2px solid ${step === "divide" ? C.inverse : C.borderLight}`,
              color: step === "divide" ? "#fff" : C.textMuted,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Divide both sides by ${scenario.coefficient}`}
          >
            {`\u00f7 ${scenario.coefficient} both sides`}
          </motion.button>
        </div>
      ) : (
        <div className="mt-2 flex justify-center">
          <motion.button
            onClick={handleNext}
            className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold"
            style={{ backgroundColor: C.bgSurface, border: `2px solid ${C.borderLight}`, color: C.textSecondary }}
            whileTap={{ scale: 0.95 }}
          >
            {"Next equation \u2192"}
          </motion.button>
        </div>
      )}

      {/* Interaction count */}
      <div className="mt-3 flex items-center gap-1 justify-center">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-colors duration-200"
            style={{
              width: 6,
              height: 6,
              backgroundColor: i < interactions ? C.primary : C.border,
            }}
          />
        ))}
      </div>

      {canContinue && (
        <div className="mt-4 flex justify-center">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  {
    text: "Look at 3x + 5 = 17. There are TWO things happening to x: multiply by 3, then add 5.",
    detail: "We color-code them: multiply in purple, addition in amber.",
    button: "I see it!",
  },
  {
    text: "When you get dressed: socks THEN shoes. To undress: shoes THEN socks. Same idea here!",
    detail: "The last thing done to x is the first thing you undo.",
    button: "I see it!",
  },
  {
    text: "The +5 is the OUTER layer (last thing done to x). So we undo it FIRST: subtract 5 from both sides.",
    detail: "3x + 5 \u2212 5 = 17 \u2212 5 \u2192 3x = 12",
    button: "Got it!",
  },
  {
    text: "Now only ONE layer remains: multiply by 3. Undo it by dividing both sides by 3.",
    detail: "3x \u00f7 3 = 12 \u00f7 3 \u2192 x = 4",
    button: "Got it!",
  },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const prompt = DISCOVERY_PROMPTS[promptIdx];

  const handleAck = useCallback(() => {
    if (promptIdx < DISCOVERY_PROMPTS.length - 1) {
      setPromptIdx((i) => i + 1);
    } else {
      onComplete();
    }
  }, [promptIdx, onComplete]);

  if (!prompt) return null;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        {/* Progress */}
        <div className="mb-4 flex items-center gap-1 justify-center">
          {DISCOVERY_PROMPTS.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: i <= promptIdx ? C.primary : C.border,
              }}
            />
          ))}
        </div>

        <motion.div
          key={promptIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
        >
          <p
            className="mb-3 text-lg font-medium leading-relaxed"
            style={{ color: C.textPrimary }}
          >
            {prompt.text}
          </p>
          <p
            className="mb-6 rounded-lg px-4 py-3 font-mono text-sm"
            style={{ backgroundColor: C.bgPrimary, color: C.textSecondary }}
          >
            {prompt.detail}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleAck}
            className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white"
            style={{ backgroundColor: C.primary }}
            whileTap={{ scale: 0.95 }}
          >
            {prompt.button}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOL_STEPS = [
  { notation: "3x + 5 = 17", description: "Start with the two-step equation" },
  { notation: "3x + 5 \u2212 5 = 17 \u2212 5", description: "Subtract 5 from both sides" },
  { notation: "3x = 12", description: "Simplify: the constant is gone" },
  { notation: "3x \u00f7 3 = 12 \u00f7 3", description: "Divide both sides by 3" },
  { notation: "x = 4", description: "Solution revealed!" },
] as const;

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < SYMBOL_STEPS.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 1500 * (i + 1)));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  const allRevealed = visibleCount >= SYMBOL_STEPS.length;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: "#7c3aed20", color: C.variable }}
        >
          Symbol Bridge
        </span>

        <div className="space-y-3">
          {SYMBOL_STEPS.map((_, i) => {
            const step = SYMBOL_STEPS[i]!;
            return i < visibleCount ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={SPRING}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{
                  backgroundColor: i === SYMBOL_STEPS.length - 1 ? C.solutionFill : C.bgPrimary,
                  border: `1px solid ${i === SYMBOL_STEPS.length - 1 ? C.solution : C.border}`,
                }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: i === SYMBOL_STEPS.length - 1 ? C.solution : C.primary,
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <p
                    className="font-mono text-base font-semibold"
                    style={{
                      color: i === SYMBOL_STEPS.length - 1 ? C.solution : C.textPrimary,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {step.notation}
                  </p>
                  <p className="text-xs" style={{ color: C.textMuted }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ) : null;
          })}
        </div>

        {allRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ...FADE }}
            className="mt-4"
          >
            <p className="mb-4 text-center text-sm font-medium" style={{ color: C.textSecondary }}>
              Two-step equations: undo addition/subtraction first, then multiplication/division.
            </p>
            <div className="flex justify-center">
              <ContinueButton onClick={onComplete} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL WORLD ANCHOR
// ═══════════════════════════════════════════════════════════════════════════

const REAL_WORLD_CARDS = [
  { icon: "Cart", title: "Shopping", example: "3 identical shirts + $5 tax = $32 total. How much is each shirt?", math: "3x + 5 = 32" },
  { icon: "Temp", title: "Temperature", example: "Double the temp then add 32 for Fahrenheit. If F = 98, what was the original?", math: "2x + 32 = 98" },
  { icon: "Game", title: "Gaming", example: "Earn 4 coins per level + 10 bonus = 50 total. Coins per level?", math: "4x + 10 = 50" },
  { icon: "Chef", title: "Cooking", example: "Triple a recipe + 2 extra cups = 14 cups total. Original recipe?", math: "3x + 2 = 14" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="mt-4 rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: "#22d3ee20", color: C.inverse }}
        >
          Real World
        </span>

        <p className="mb-4 text-base font-medium" style={{ color: C.textPrimary }}>
          Two-step equations are everywhere!
        </p>

        <div className="space-y-3">
          {REAL_WORLD_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: i * 0.15 }}
              className="rounded-xl px-4 py-3"
              style={{ backgroundColor: C.bgPrimary, border: `1px solid ${C.border}` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: C.variableFill, color: C.variable }}
                >
                  {card.icon.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: C.textPrimary }}>
                    {card.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                    {card.example}
                  </p>
                  <p
                    className="mt-1 font-mono text-xs font-semibold"
                    style={{ color: C.variable }}
                  >
                    {card.math}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <ContinueButton onClick={onComplete} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE
// ═══════════════════════════════════════════════════════════════════════════

interface PracticeProblem {
  layer: "recall" | "procedure" | "understanding";
  type: "multiple-choice" | "true-false" | "numeric-input";
  prompt: string;
  options?: readonly string[];
  correctIndex?: number;
  correctValue?: number;
  correctBool?: boolean;
  feedback: string;
}

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  {
    layer: "recall",
    type: "multiple-choice",
    prompt: "In 2x + 7 = 15, which operation do you undo FIRST?",
    options: ["Divide by 2", "Subtract 7", "Add 7", "Multiply by 2"],
    correctIndex: 1,
    feedback: "The +7 is the outer layer, so we undo it first by subtracting 7 from both sides.",
  },
  {
    layer: "recall",
    type: "multiple-choice",
    prompt: "After subtracting 7 from both sides of 2x + 7 = 15, what equation remains?",
    options: ["2x = 22", "2x = 8", "x = 8", "2x = 7"],
    correctIndex: 1,
    feedback: "15 \u2212 7 = 8, so we get 2x = 8.",
  },
  {
    layer: "recall",
    type: "true-false",
    prompt: "To solve 5x + 3 = 18, the first step is to divide by 5.",
    correctBool: false,
    feedback: "False! Undo the outer layer first: subtract 3 before dividing by 5.",
  },
  {
    layer: "procedure",
    type: "multiple-choice",
    prompt: "Solve: 3x + 4 = 19",
    options: ["x = 3", "x = 5", "x = 7", "x = 4"],
    correctIndex: 1,
    feedback: "Step 1: 19 \u2212 4 = 15, so 3x = 15. Step 2: 15 \u00f7 3 = 5, so x = 5.",
  },
  {
    layer: "procedure",
    type: "numeric-input",
    prompt: "Solve: 2x + 6 = 20. x = ?",
    correctValue: 7,
    feedback: "20 \u2212 6 = 14, then 14 \u00f7 2 = 7. x = 7!",
  },
  {
    layer: "procedure",
    type: "multiple-choice",
    prompt: "Solve: 4x + 1 = 25",
    options: ["x = 5", "x = 6", "x = 7", "x = 4"],
    correctIndex: 1,
    feedback: "25 \u2212 1 = 24, then 24 \u00f7 4 = 6. x = 6.",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "Why must we subtract before dividing in 3x + 5 = 20?",
    options: [
      "Because subtraction is easier",
      "Because +5 was the last operation applied to x",
      "Because 3 is bigger than 5",
      "It doesn't matter which order",
    ],
    correctIndex: 1,
    feedback: "The last operation applied is the first we undo, like taking off the outer coat first.",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "If you accidentally divide 3x + 5 = 20 by 3 first, why is that harder?",
    options: [
      "You get a bigger number",
      "It creates fractions that are harder to work with",
      "The equation becomes negative",
      "It makes the variable disappear",
    ],
    correctIndex: 1,
    feedback: "Undoing in the wrong order creates messy fractions. Reverse order keeps things clean!",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "Kim solved 2x + 8 = 22 and got x = 7. Verify: 2(7) + 8 = ?",
    options: ["20 \u2212 No", "22 \u2212 Yes, correct!", "24 \u2212 No", "14 \u2212 No"],
    correctIndex: 1,
    feedback: "2(7) = 14, and 14 + 8 = 22. The solution checks out!",
  },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [probIdx, setProbIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const problem = PRACTICE_PROBLEMS[probIdx];
  if (!problem) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <ContinueButton onClick={onComplete} label="Complete Practice" />
      </div>
    );
  }

  const checkAnswer = () => {
    if (answered) return;
    let correct = false;

    if (problem.type === "multiple-choice" && selected !== null) {
      correct = selected === problem.correctIndex;
    } else if (problem.type === "true-false" && tfSelected !== null) {
      correct = tfSelected === problem.correctBool;
    } else if (problem.type === "numeric-input") {
      const val = parseInt(inputValue, 10);
      correct = !isNaN(val) && val === problem.correctValue;
    } else {
      return; // nothing selected
    }

    setIsCorrect(correct);
    setAnswered(true);
  };

  const handleNext = () => {
    setSelected(null);
    setInputValue("");
    setTfSelected(null);
    setAnswered(false);
    setIsCorrect(false);
    if (probIdx < PRACTICE_PROBLEMS.length - 1) {
      setProbIdx((i) => i + 1);
    } else {
      onComplete();
    }
  };

  const layerColors: Record<string, string> = {
    recall: "#60a5fa",
    procedure: "#f59e0b",
    understanding: "#a78bfa",
  };

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="mt-4 rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        {/* Problem counter */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${layerColors[problem.layer] ?? C.primary}20`,
              color: layerColors[problem.layer] ?? C.primary,
            }}
          >
            {problem.layer}
          </span>
          <span className="text-xs" style={{ color: C.textDim }}>
            {probIdx + 1} / {PRACTICE_PROBLEMS.length}
          </span>
        </div>

        {/* Prompt */}
        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>
          {problem.prompt}
        </p>

        {/* Multiple choice */}
        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2">
            {problem.options.map((opt, i) => {
              const isSelected = selected === i;
              const showCorrect = answered && i === problem.correctIndex;
              const showIncorrect = answered && isSelected && i !== problem.correctIndex;
              return (
                <motion.button
                  key={i}
                  onClick={() => { if (!answered) setSelected(i); }}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors"
                  style={{
                    minHeight: 48,
                    backgroundColor: showCorrect
                      ? C.solutionFill
                      : showIncorrect
                        ? "#f8717120"
                        : isSelected
                          ? `${C.primary}30`
                          : C.bgPrimary,
                    border: `2px solid ${
                      showCorrect
                        ? C.success
                        : showIncorrect
                          ? C.error
                          : isSelected
                            ? C.primary
                            : C.border
                    }`,
                    color: showCorrect ? C.success : showIncorrect ? C.error : C.textSecondary,
                  }}
                  whileTap={answered ? {} : { scale: 0.98 }}
                  aria-label={opt}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {problem.type === "true-false" && (
          <div className="flex gap-3">
            {([true, false] as const).map((val) => {
              const isSel = tfSelected === val;
              const showCorrect = answered && val === problem.correctBool;
              const showIncorrect = answered && isSel && val !== problem.correctBool;
              return (
                <motion.button
                  key={String(val)}
                  onClick={() => { if (!answered) setTfSelected(val); }}
                  className="flex-1 rounded-xl py-3 text-center text-base font-semibold"
                  style={{
                    minHeight: 48,
                    backgroundColor: showCorrect
                      ? C.solutionFill
                      : showIncorrect
                        ? "#f8717120"
                        : isSel
                          ? `${C.primary}30`
                          : C.bgPrimary,
                    border: `2px solid ${
                      showCorrect
                        ? C.success
                        : showIncorrect
                          ? C.error
                          : isSel
                            ? C.primary
                            : C.border
                    }`,
                    color: showCorrect ? C.success : showIncorrect ? C.error : C.textSecondary,
                  }}
                  whileTap={answered ? {} : { scale: 0.95 }}
                >
                  {val ? "True" : "False"}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Numeric input */}
        {problem.type === "numeric-input" && (
          <div className="flex gap-3">
            <input
              type="number"
              inputMode="numeric"
              value={inputValue}
              onChange={(e) => { if (!answered) setInputValue(e.target.value); }}
              className="flex-1 rounded-xl px-4 py-3 text-center font-mono text-lg"
              style={{
                minHeight: 48,
                backgroundColor: answered
                  ? isCorrect
                    ? C.solutionFill
                    : "#f8717120"
                  : C.bgPrimary,
                border: `2px solid ${
                  answered
                    ? isCorrect
                      ? C.success
                      : C.error
                    : C.border
                }`,
                color: C.textPrimary,
              }}
              aria-label="Enter your answer"
              readOnly={answered}
            />
          </div>
        )}

        {/* Submit */}
        {!answered && (
          <motion.button
            onClick={checkAnswer}
            className="mt-4 w-full rounded-xl py-3 text-base font-semibold text-white"
            style={{
              minHeight: 48,
              backgroundColor: C.primary,
              opacity:
                (problem.type === "multiple-choice" && selected === null) ||
                (problem.type === "true-false" && tfSelected === null) ||
                (problem.type === "numeric-input" && inputValue === "")
                  ? 0.4
                  : 1,
            }}
            whileTap={{ scale: 0.97 }}
          >
            Check Answer
          </motion.button>
        )}

        {/* Feedback */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
            className="mt-4"
          >
            <div
              className="rounded-xl px-4 py-3"
              style={{
                backgroundColor: isCorrect ? C.solutionFill : "#f8717120",
                border: `1px solid ${isCorrect ? C.success : C.error}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: isCorrect ? C.success : C.error }}>
                {isCorrect ? "Correct!" : "Not quite."}
              </p>
              <p className="mt-1 text-sm" style={{ color: C.textSecondary }}>
                {problem.feedback}
              </p>
            </div>

            <motion.button
              onClick={handleNext}
              className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white"
              style={{ minHeight: 48, backgroundColor: C.primary }}
              whileTap={{ scale: 0.97 }}
            >
              {probIdx < PRACTICE_PROBLEMS.length - 1 ? "Next \u2192" : "Finish Practice"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 7 — REFLECTION
// ═══════════════════════════════════════════════════════════════════════════

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const minChars = 20;
  const meetsMin = text.trim().length >= minChars;

  const handleSubmit = useCallback(() => {
    if (!meetsMin) return;
    setSubmitted(true);
  }, [meetsMin]);

  const handleSkip = useCallback(() => {
    setSkipped(true);
  }, []);

  if (submitted || skipped) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center px-4"
        style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
      >
        <div className="w-full rounded-2xl p-6 text-center" style={{ backgroundColor: C.bgSurface }}>
          {submitted && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={SPRING_POP}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: C.solutionFill }}
              >
                <span style={{ color: C.success, fontSize: 32 }}>{"✓"}</span>
              </motion.div>
              <p className="mb-2 text-lg font-semibold" style={{ color: C.textPrimary }}>
                Great reflection!
              </p>
              <p className="mb-4 text-sm" style={{ color: C.textMuted }}>
                Explaining your thinking deepens your understanding. The reverse-order
                principle is just like getting dressed and undressed!
              </p>
            </>
          )}

          {skipped && (
            <p className="mb-4 text-center text-sm" style={{ color: C.textMuted }}>
              Reflection skipped. You can always come back to reflect later!
            </p>
          )}

          <TwoStepCycler />

          <div className="mt-6 flex justify-center">
            <ContinueButton onClick={onComplete} label="Complete Lesson" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="mt-4 rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: "#7c3aed20", color: C.variable }}
        >
          Reflection
        </span>

        <p
          className="mb-4 text-lg font-medium leading-relaxed"
          style={{ color: C.textPrimary }}
        >
          {"Explain to a friend why you have to subtract before dividing when solving "}
          <span className="font-mono">3x + 5 = 20</span>
          {". Use the \u2018getting dressed\u2019 analogy or the balance scale idea."}
        </p>

        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="You subtract first because..."
          className="w-full resize-none rounded-xl p-4 text-base leading-relaxed"
          style={{
            minHeight: 120,
            maxHeight: 240,
            backgroundColor: C.bgPrimary,
            border: `1px solid ${C.borderLight}`,
            color: C.textSecondary,
          }}
          aria-label="Write your reflection explaining why order matters when solving two-step equations"
        />

        <div className="mt-1 text-right text-xs" style={{ color: meetsMin ? C.success : C.textDim }}>
          {text.length}
          {" / "}
          {minChars}
          {" minimum"}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!meetsMin}
          className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none"
          style={{ backgroundColor: C.primary, minHeight: 52 }}
        >
          Submit Reflection
        </button>

        <button
          onClick={handleSkip}
          className="mt-2 w-full py-2 text-sm underline-offset-2 hover:underline"
          style={{ color: C.textDim, minHeight: 44 }}
          aria-label="Skip reflection"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

function TwoStepCycler() {
  const equations = useMemo(
    () => [
      { a: 2, b: 3, result: 13 },
      { a: 3, b: 5, result: 17 },
      { a: 4, b: 1, result: 25 },
      { a: 5, b: 10, result: 45 },
      { a: 6, b: 2, result: 50 },
    ],
    [],
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % equations.length);
    }, 700);
    return () => clearInterval(interval);
  }, [equations.length]);

  const eq = equations[idx]!;
  const x = (eq.result - eq.b) / eq.a;

  return (
    <div
      className="text-center"
      aria-label="Two-step equations solved with reverse-order undoing"
    >
      <div className="font-mono text-lg font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
        <span style={{ color: C.variable }}>{eq.a}x</span>
        <span style={{ color: C.operation }}>{" + "}{eq.b}</span>
        <span style={{ color: C.textMuted }}>{" = "}</span>
        <span style={{ color: C.textPrimary }}>{eq.result}</span>
        <span style={{ color: C.textMuted }}>{" \u2192 "}</span>
        <motion.span
          key={x}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING}
          style={{ color: C.solution, display: "inline-block" }}
        >
          {"x = "}
          {x}
        </motion.span>
      </div>
      <p className="mt-2 text-sm font-semibold" style={{ color: C.textMuted }}>
        Undo outer layer first. Always.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LESSON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function TwoStepEquationsLesson({ onComplete }: TwoStepEquationsLessonProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = STAGE_ORDER[stageIndex]!;

  const advanceStage = useCallback(() => {
    setStageIndex((i) => {
      const next = i + 1;
      if (next >= STAGE_ORDER.length) {
        onComplete?.();
        return i;
      }
      return next;
    });
  }, [onComplete]);

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: C.bgPrimary }}
    >
      <StageProgressDots currentIndex={stageIndex} total={STAGE_ORDER.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-1 flex-col"
        >
          {stage === "hook" && <HookStage onComplete={advanceStage} />}
          {stage === "spatial" && <SpatialStage onComplete={advanceStage} />}
          {stage === "discovery" && <DiscoveryStage onComplete={advanceStage} />}
          {stage === "symbol" && <SymbolBridgeStage onComplete={advanceStage} />}
          {stage === "realWorld" && <RealWorldStage onComplete={advanceStage} />}
          {stage === "practice" && <PracticeStage onComplete={advanceStage} />}
          {stage === "reflection" && <ReflectionStage onComplete={advanceStage} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
