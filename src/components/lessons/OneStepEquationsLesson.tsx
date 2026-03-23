"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface OneStepEquationsLessonProps {
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
  return <VideoHook src="/videos/OneStepEquationsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400)); // title text
    timers.push(setTimeout(() => setPhase(2), 1200)); // glowing 7
    timers.push(setTimeout(() => setPhase(3), 2000)); // mystery box covers 7
    timers.push(setTimeout(() => setPhase(4), 2800)); // +5 badge
    timers.push(setTimeout(() => setPhase(5), 3200)); // = 12
    timers.push(setTimeout(() => setPhase(6), 3800)); // undo text
    timers.push(setTimeout(() => setPhase(7), 4500)); // -5 badges appear
    timers.push(setTimeout(() => setPhase(8), 5200)); // +5 cancels
    timers.push(setTimeout(() => setPhase(9), 5500)); // 12 becomes 7
    timers.push(setTimeout(() => setPhase(10), 6000)); // box reveals 7
    timers.push(setTimeout(() => setPhase(11), 6800)); // tagline
    timers.push(setTimeout(() => setPhase(12), 7500)); // continue button
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 12)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 640 }}
        aria-live="polite"
      >
        {/* Title text */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              key="hook-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center italic"
              style={{
                color: C.textPrimary,
                fontSize: "clamp(20px, 5vw, 32px)",
              }}
            >
              Someone hid a number...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Main SVG animation */}
        <svg
          viewBox="0 0 800 500"
          className="mx-auto w-full"
          style={{ maxWidth: 600 }}
          aria-label="A number 7 is hidden in a box. Plus 5 equals 12. Subtract 5 from both sides to find the hidden number is 7."
        >
          {/* Glowing 7 appears */}
          {phase >= 2 && phase < 3 && (
            <motion.text
              x={280}
              y={250}
              textAnchor={"middle" as const}
              dominantBaseline="central"
              fill={C.variable}
              fontSize={64}
              fontWeight={700}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING_POP}
            >
              7
            </motion.text>
          )}

          {/* Mystery box */}
          {phase >= 3 && (
            <motion.g
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <rect
                x={240}
                y={210}
                width={80}
                height={80}
                rx={16}
                fill="#8b5cf620"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
              {/* ? or revealed 7 */}
              {phase < 10 ? (
                <motion.text
                  x={280}
                  y={250}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill="#8b5cf6"
                  fontSize={48}
                  fontWeight={700}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ?
                </motion.text>
              ) : (
                <motion.text
                  x={280}
                  y={250}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill={C.variable}
                  fontSize={48}
                  fontWeight={700}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING_POP}
                >
                  7
                </motion.text>
              )}
            </motion.g>
          )}

          {/* +5 badge */}
          {phase >= 4 && phase < 8 && (
            <motion.g
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={SPRING}
            >
              <rect
                x={352}
                y={230}
                width={56}
                height={40}
                rx={10}
                fill="#f59e0b20"
                stroke={C.operation}
                strokeWidth={2}
              />
              <text
                x={380}
                y={250}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={C.operation}
                fontSize={24}
                fontWeight={700}
              >
                + 5
              </text>
            </motion.g>
          )}

          {/* = 12 or = 7 */}
          {phase >= 5 && (
            <motion.text
              x={490}
              y={250}
              textAnchor={"middle" as const}
              dominantBaseline="central"
              fill={C.solution}
              fontSize={40}
              fontWeight={700}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={FADE}
            >
              {phase >= 9 ? "= 7" : "= 12"}
            </motion.text>
          )}

          {/* -5 badges (both sides) */}
          {phase >= 7 && phase < 9 && (
            <>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={SPRING_POP}
              >
                <rect
                  x={252}
                  y={310}
                  width={56}
                  height={40}
                  rx={10}
                  fill="#22d3ee20"
                  stroke={C.inverse}
                  strokeWidth={2}
                />
                <text
                  x={280}
                  y={330}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill={C.inverse}
                  fontSize={24}
                  fontWeight={700}
                >
                  {"\u2212 5"}
                </text>
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={SPRING_POP}
              >
                <rect
                  x={462}
                  y={310}
                  width={56}
                  height={40}
                  rx={10}
                  fill="#22d3ee20"
                  stroke={C.inverse}
                  strokeWidth={2}
                />
                <text
                  x={490}
                  y={330}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill={C.inverse}
                  fontSize={24}
                  fontWeight={700}
                >
                  {"\u2212 5"}
                </text>
              </motion.g>
              {/* "both sides!" label */}
              <motion.text
                x={385}
                y={340}
                textAnchor={"middle" as const}
                fill={C.inverse}
                fontSize={12}
                fontStyle="italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                both sides!
              </motion.text>
            </>
          )}

          {/* Calculation label 12 - 5 = 7 */}
          {phase >= 9 && phase < 11 && (
            <motion.text
              x={490}
              y={290}
              textAnchor={"middle" as const}
              fill={C.textSecondary}
              fontSize={14}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, times: [0, 0.1, 0.7, 1] }}
            >
              {"12 \u2212 5 = 7"}
            </motion.text>
          )}
        </svg>

        {/* Undo text */}
        <AnimatePresence>
          {phase >= 6 && (
            <motion.p
              key="undo-text"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-2 text-center italic"
              style={{ color: C.textSecondary, fontSize: 16 }}
            >
              The +5 is a disguise. Let&apos;s remove it.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <AnimatePresence>
          {phase >= 11 && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-4 text-center font-semibold"
              style={{ color: C.textPrimary, fontSize: 18 }}
            >
              {"To find the hidden number, "}
              <span
                style={{
                  color: C.inverse,
                  textTransform: "uppercase",
                  textShadow: "0 0 8px #22d3ee40",
                }}
              >
                UNDO
              </span>
              {" the operation."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Continue */}
      {phase >= 12 && (
        <div className="mt-8">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE (Balance Scale + Reverse Function Machine)
// ═══════════════════════════════════════════════════════════════════════════

interface BalanceScenario {
  equation: string;
  leftMystery: number;
  leftUnits: number;
  rightUnits: number;
}

const BALANCE_SCENARIOS: readonly BalanceScenario[] = [
  { equation: "x + 3 = 7", leftMystery: 4, leftUnits: 3, rightUnits: 7 },
  { equation: "x + 5 = 9", leftMystery: 4, leftUnits: 5, rightUnits: 9 },
  { equation: "x + 2 = 8", leftMystery: 6, leftUnits: 2, rightUnits: 8 },
] as const;

interface ReverseMachinePreset {
  equation: string;
  output: number;
  forwardOp: string;
  inverseOp: string;
  inverseLabel: string;
  solution: number;
}

const MACHINE_PRESETS: readonly ReverseMachinePreset[] = [
  { equation: "x + 5 = 12", output: 12, forwardOp: "+ 5", inverseOp: "\u2212 5", inverseLabel: "subtract 5", solution: 7 },
  { equation: "x \u2212 3 = 4", output: 4, forwardOp: "\u2212 3", inverseOp: "+ 3", inverseLabel: "add 3", solution: 7 },
  { equation: "2x = 10", output: 10, forwardOp: "\u00d7 2", inverseOp: "\u00f7 2", inverseLabel: "divide by 2", solution: 5 },
  { equation: "x + 8 = 15", output: 15, forwardOp: "+ 8", inverseOp: "\u2212 8", inverseLabel: "subtract 8", solution: 7 },
] as const;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [activeTab, setActiveTab] = useState<"balance" | "machine">("balance");

  // Balance scale state
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenario = BALANCE_SCENARIOS[scenarioIdx]!;
  const [leftUnits, setLeftUnits] = useState(scenario.leftUnits);
  const [rightUnits, setRightUnits] = useState(scenario.rightUnits);
  const [solved, setSolved] = useState(false);
  const [unfairMsg, setUnfairMsg] = useState<string | null>(null);
  const unfairTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Reverse machine state
  const [machineIdx, setMachineIdx] = useState(0);
  const [machineRunning, setMachineRunning] = useState(false);
  const [machineRevealed, setMachineRevealed] = useState(false);
  const machineTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Interaction tracking
  const [balanceInteractions, setBalanceInteractions] = useState(0);
  const [machineInteractions, setMachineInteractions] = useState(0);
  const [hasSolvedBalance, setHasSolvedBalance] = useState(false);
  const [hasSolvedMachine, setHasSolvedMachine] = useState(false);

  const totalInteractions = balanceInteractions + machineInteractions;
  const canContinue =
    totalInteractions >= 10 &&
    balanceInteractions >= 3 &&
    machineInteractions >= 3 &&
    hasSolvedBalance &&
    hasSolvedMachine;

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (unfairTimerRef.current) clearTimeout(unfairTimerRef.current);
      if (machineTimerRef.current) clearTimeout(machineTimerRef.current);
    };
  }, []);

  // Balance: tilt angle
  const tiltAngle = useMemo(() => {
    const leftVal = scenario.leftMystery + leftUnits;
    const rightVal = rightUnits;
    const diff = leftVal - rightVal;
    return Math.max(-15, Math.min(15, diff * 2));
  }, [scenario.leftMystery, leftUnits, rightUnits]);

  // Check for solve
  useEffect(() => {
    if (leftUnits === 0 && !solved) {
      setSolved(true);
      setHasSolvedBalance(true);
    }
  }, [leftUnits, solved]);

  const handleRemoveBoth = useCallback(() => {
    if (leftUnits <= 0 || rightUnits <= 0) return;
    setLeftUnits((u) => u - 1);
    setRightUnits((u) => u - 1);
    setBalanceInteractions((c) => c + 1);
  }, [leftUnits, rightUnits]);

  const handleAddBoth = useCallback(() => {
    if (leftUnits >= 10 || rightUnits >= 10) return;
    setLeftUnits((u) => u + 1);
    setRightUnits((u) => u + 1);
    setBalanceInteractions((c) => c + 1);
  }, [leftUnits, rightUnits]);

  const handleUnfairRemove = useCallback(() => {
    if (unfairTimerRef.current) clearTimeout(unfairTimerRef.current);
    setUnfairMsg("Not fair! Remove from BOTH sides!");
    setBalanceInteractions((c) => c + 1);
    unfairTimerRef.current = setTimeout(() => setUnfairMsg(null), 2000);
  }, []);

  const handleNewEquation = useCallback(() => {
    const nextIdx = (scenarioIdx + 1) % BALANCE_SCENARIOS.length;
    setScenarioIdx(nextIdx);
    const nextScenario = BALANCE_SCENARIOS[nextIdx]!;
    setLeftUnits(nextScenario.leftUnits);
    setRightUnits(nextScenario.rightUnits);
    setSolved(false);
    setBalanceInteractions((c) => c + 1);
  }, [scenarioIdx]);

  // Machine
  const preset = MACHINE_PRESETS[machineIdx]!;

  const handleRunMachine = useCallback(() => {
    if (machineRunning || machineRevealed) return;
    setMachineRunning(true);
    setMachineInteractions((c) => c + 1);
    machineTimerRef.current = setTimeout(() => {
      setMachineRevealed(true);
      setMachineRunning(false);
      setHasSolvedMachine(true);
    }, 2000);
  }, [machineRunning, machineRevealed]);

  const handleNextMachine = useCallback(() => {
    if (machineTimerRef.current) clearTimeout(machineTimerRef.current);
    const nextIdx = (machineIdx + 1) % MACHINE_PRESETS.length;
    setMachineIdx(nextIdx);
    setMachineRevealed(false);
    setMachineRunning(false);
    setMachineInteractions((c) => c + 1);
  }, [machineIdx]);

  // SVG dimensions for balance scale
  const SVG_W = 400;
  const SVG_H = 280;
  const FULCRUM_X = SVG_W / 2;
  const FULCRUM_Y = 200;
  const BEAM_W = 280;
  const PAN_W = 100;
  const BLOCK_SIZE = 24;

  return (
    <div className="flex flex-1 flex-col px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      {/* Tab switcher */}
      <div className="mb-4 mt-2 flex overflow-hidden rounded-xl" style={{ border: `1px solid ${C.border}` }}>
        <button
          onClick={() => setActiveTab("balance")}
          className="flex-1 py-2 text-sm font-semibold transition-colors"
          style={{
            minHeight: 44,
            backgroundColor: activeTab === "balance" ? C.primary : "transparent",
            color: activeTab === "balance" ? "#fff" : C.textMuted,
          }}
        >
          Balance Scale
        </button>
        <button
          onClick={() => setActiveTab("machine")}
          className="flex-1 py-2 text-sm font-semibold transition-colors"
          style={{
            minHeight: 44,
            backgroundColor: activeTab === "machine" ? C.primary : "transparent",
            color: activeTab === "machine" ? "#fff" : C.textMuted,
          }}
        >
          Reverse Machine
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "balance" ? (
          <motion.div
            key="balance"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={FADE}
          >
            {/* Equation display */}
            <div
              className="mb-3 flex items-center justify-center rounded-xl px-5 py-3 font-mono"
              style={{
                backgroundColor: C.bgSurface,
                fontSize: "clamp(20px, 5vw, 32px)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ color: C.variable }}>x</span>
              <span style={{ color: C.textMuted }}>
                {leftUnits > 0 ? ` + ${leftUnits}` : ""}
              </span>
              <span style={{ color: C.textMuted }}>{" = "}</span>
              <span style={{ color: C.textPrimary }}>
                {solved ? scenario.leftMystery.toString() : rightUnits.toString()}
              </span>
            </div>

            {/* Balance scale SVG */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="mx-auto w-full"
              aria-label={`Balance scale showing x plus ${leftUnits} on the left and ${rightUnits} on the right`}
            >
              {/* Fulcrum triangle */}
              <polygon
                points={`${FULCRUM_X - 20},${FULCRUM_Y + 40} ${FULCRUM_X + 20},${FULCRUM_Y + 40} ${FULCRUM_X},${FULCRUM_Y - 10}`}
                fill="#475569"
                stroke={C.scale}
                strokeWidth={2}
              />

              {/* Beam (tilts) */}
              <motion.g
                style={{ originX: `${FULCRUM_X}px`, originY: `${FULCRUM_Y - 10}px` }}
                animate={{ rotate: tiltAngle }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
              >
                {/* Beam bar */}
                <rect
                  x={FULCRUM_X - BEAM_W / 2}
                  y={FULCRUM_Y - 14}
                  width={BEAM_W}
                  height={8}
                  rx={4}
                  fill={C.scale}
                />

                {/* Left pan wires */}
                <line x1={FULCRUM_X - BEAM_W / 2 + 10} y1={FULCRUM_Y - 10} x2={FULCRUM_X - BEAM_W / 2 + 10} y2={FULCRUM_Y + 20} stroke={C.scale} strokeWidth={2} />
                <line x1={FULCRUM_X - BEAM_W / 2 + PAN_W - 10} y1={FULCRUM_Y - 10} x2={FULCRUM_X - BEAM_W / 2 + PAN_W - 10} y2={FULCRUM_Y + 20} stroke={C.scale} strokeWidth={2} />

                {/* Left pan */}
                <rect
                  x={FULCRUM_X - BEAM_W / 2}
                  y={FULCRUM_Y + 20}
                  width={PAN_W}
                  height={20}
                  rx={6}
                  fill="#334155"
                  stroke="#475569"
                  strokeWidth={1}
                />

                {/* Mystery box on left pan */}
                <rect
                  x={FULCRUM_X - BEAM_W / 2 + 4}
                  y={FULCRUM_Y + 20 - 32}
                  width={30}
                  height={30}
                  rx={6}
                  fill="#8b5cf620"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
                <text
                  x={FULCRUM_X - BEAM_W / 2 + 19}
                  y={FULCRUM_Y + 20 - 17}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill="#8b5cf6"
                  fontSize={16}
                  fontWeight={700}
                >
                  {solved ? scenario.leftMystery.toString() : "?"}
                </text>

                {/* Unit blocks on left pan */}
                {Array.from({ length: leftUnits }, (_, i) => {
                  const bx = FULCRUM_X - BEAM_W / 2 + 38 + i * (BLOCK_SIZE + 2);
                  const by = FULCRUM_Y + 20 - BLOCK_SIZE - 2;
                  return (
                    <g key={`left-block-${i}`}>
                      <rect
                        x={bx}
                        y={by}
                        width={BLOCK_SIZE}
                        height={BLOCK_SIZE}
                        rx={4}
                        fill={C.blockFill}
                        stroke={C.block}
                        strokeWidth={1}
                      />
                      <text
                        x={bx + BLOCK_SIZE / 2}
                        y={by + BLOCK_SIZE / 2}
                        textAnchor={"middle" as const}
                        dominantBaseline="central"
                        fill="#fff"
                        fontSize={12}
                        fontWeight={700}
                      >
                        1
                      </text>
                    </g>
                  );
                })}

                {/* Right pan wires */}
                <line x1={FULCRUM_X + BEAM_W / 2 - PAN_W + 10} y1={FULCRUM_Y - 10} x2={FULCRUM_X + BEAM_W / 2 - PAN_W + 10} y2={FULCRUM_Y + 20} stroke={C.scale} strokeWidth={2} />
                <line x1={FULCRUM_X + BEAM_W / 2 - 10} y1={FULCRUM_Y - 10} x2={FULCRUM_X + BEAM_W / 2 - 10} y2={FULCRUM_Y + 20} stroke={C.scale} strokeWidth={2} />

                {/* Right pan */}
                <rect
                  x={FULCRUM_X + BEAM_W / 2 - PAN_W}
                  y={FULCRUM_Y + 20}
                  width={PAN_W}
                  height={20}
                  rx={6}
                  fill="#334155"
                  stroke="#475569"
                  strokeWidth={1}
                />

                {/* Right pan block count label */}
                <text
                  x={FULCRUM_X + BEAM_W / 2 - PAN_W / 2}
                  y={FULCRUM_Y + 20 - 12}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill={C.block}
                  fontSize={16}
                  fontWeight={700}
                >
                  {rightUnits}
                </text>

                {/* Balance indicator */}
                <circle
                  cx={FULCRUM_X}
                  cy={FULCRUM_Y - 14}
                  r={6}
                  fill={tiltAngle === 0 ? C.success : C.error}
                />
              </motion.g>
            </svg>

            {/* Unfair warning */}
            <AnimatePresence>
              {unfairMsg !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-2 rounded-lg px-4 py-2 text-center text-sm font-semibold"
                  style={{ backgroundColor: "#f8717120", color: C.error }}
                  aria-live="assertive"
                >
                  {unfairMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Solved message */}
            {solved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING}
                className="mb-3 rounded-xl px-4 py-3 text-center font-semibold"
                style={{ backgroundColor: C.solutionFill, color: C.solution }}
              >
                {"x = "}
                {scenario.leftMystery}
                {" "}
                <span style={{ fontSize: 20 }}>{"✓"}</span>
              </motion.div>
            )}

            {/* Control panel */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleRemoveBoth}
                  disabled={leftUnits <= 0 || rightUnits <= 0 || solved}
                  className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-colors disabled:opacity-40"
                  style={{ backgroundColor: C.primary, minHeight: 48 }}
                >
                  {"\u2212 Remove from Both"}
                </button>
                <button
                  onClick={handleAddBoth}
                  disabled={leftUnits >= 10 || rightUnits >= 10 || solved}
                  className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-colors disabled:opacity-40"
                  style={{ backgroundColor: C.primary, minHeight: 48 }}
                >
                  + Add to Both
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUnfairRemove}
                  disabled={solved}
                  className="flex-1 rounded-lg py-2 text-sm transition-colors"
                  style={{
                    border: `1px solid ${C.borderLight}`,
                    color: C.textMuted,
                    minHeight: 44,
                  }}
                >
                  Remove Left Only
                </button>
                <button
                  onClick={handleUnfairRemove}
                  disabled={solved}
                  className="flex-1 rounded-lg py-2 text-sm transition-colors"
                  style={{
                    border: `1px solid ${C.borderLight}`,
                    color: C.textMuted,
                    minHeight: 44,
                  }}
                >
                  Remove Right Only
                </button>
              </div>
              <button
                onClick={handleNewEquation}
                className="w-full py-2 text-sm hover:underline"
                style={{ color: C.textMuted, minHeight: 44 }}
              >
                New Equation
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="machine"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={FADE}
          >
            {/* Machine display */}
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: C.bgSurface,
                border: `1px solid ${C.border}`,
              }}
            >
              <p
                className="mb-3 text-center font-mono text-lg font-bold"
                style={{ color: C.textPrimary }}
              >
                {preset.equation}
              </p>

              {/* Machine visual */}
              <svg viewBox="0 0 300 280" className="mx-auto w-full" style={{ maxWidth: 300 }}>
                {/* Arrow marker definition */}
                <defs>
                  <marker id="arrowhead-machine" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill={C.textMuted} />
                  </marker>
                </defs>

                {/* Machine frame */}
                <rect x={50} y={10} width={200} height={260} rx={20} fill={C.bgSurface} stroke={C.border} strokeWidth={2} />

                {/* Output slot label (top) */}
                <text x={150} y={25} textAnchor={"middle" as const} fill={C.textDim} fontSize={10} fontWeight={600}>
                  KNOWN OUTPUT
                </text>

                {/* Output slot (top) */}
                <rect x={90} y={32} width={120} height={50} rx={10} fill={C.solutionFill} stroke={C.solution} strokeWidth={2} />
                <text x={150} y={57} textAnchor={"middle" as const} dominantBaseline="central" fill={C.solution} fontSize={28} fontWeight={700}>
                  {preset.output}
                </text>

                {/* Arrow down */}
                <line
                  x1={150} y1={87} x2={150} y2={112}
                  stroke={C.textMuted}
                  strokeWidth={2}
                  markerEnd="url(#arrowhead-machine)"
                />

                {/* Inverse operation box */}
                <rect x={75} y={117} width={150} height={60} rx={12} fill={C.inverseFill} stroke={C.inverse} strokeWidth={2} />
                {/* Gear icon placeholder (circle) */}
                <motion.circle
                  cx={110}
                  cy={147}
                  r={14}
                  fill="none"
                  stroke={C.inverse}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  animate={machineRunning ? { rotate: -360 } : { rotate: 0 }}
                  transition={machineRunning ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0 }}
                />
                <text x={170} y={147} textAnchor={"middle" as const} dominantBaseline="central" fill={C.inverse} fontSize={22} fontWeight={700}>
                  {preset.inverseOp}
                </text>

                {/* Arrow down */}
                <line x1={150} y1={182} x2={150} y2={207} stroke={C.textMuted} strokeWidth={2} markerEnd="url(#arrowhead-machine)" />

                {/* Input slot (bottom - solution) */}
                <rect x={90} y={212} width={120} height={50} rx={10} fill={C.variableFill} stroke={C.variable} strokeWidth={2} />
                <text x={150} y={237} textAnchor={"middle" as const} dominantBaseline="central" fill={C.variable} fontSize={28} fontWeight={700}>
                  {machineRevealed ? preset.solution.toString() : "?"}
                </text>

                {/* Input slot label (bottom) */}
                <text x={150} y={275} textAnchor={"middle" as const} fill={C.textDim} fontSize={10} fontWeight={600}>
                  UNKNOWN INPUT
                </text>
              </svg>

              {/* Verification bar */}
              {machineRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={FADE}
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-2"
                  style={{ backgroundColor: C.solutionFill }}
                >
                  <span style={{ color: C.success, fontSize: 16 }}>{"✓"}</span>
                  <span className="font-mono text-sm font-semibold" style={{ color: C.solution }}>
                    {"Check: "}
                    {preset.solution}
                    {" "}
                    {preset.forwardOp}
                    {" = "}
                    {preset.output}
                  </span>
                </motion.div>
              )}

              {/* Run / Next buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleRunMachine}
                  disabled={machineRevealed || machineRunning}
                  className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-colors disabled:opacity-40"
                  style={{ backgroundColor: C.primary, minHeight: 48 }}
                >
                  {machineRunning ? "Running..." : "Run Machine"}
                </button>
                <button
                  onClick={handleNextMachine}
                  className="rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
                  style={{
                    border: `1px solid ${C.borderLight}`,
                    color: C.textMuted,
                    minHeight: 48,
                    minWidth: 44,
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction counter & Continue */}
      <div className="mt-4 text-center">
        <p className="text-xs" style={{ color: C.textDim }}>
          {"Interactions: "}
          {totalInteractions}
          {" / 10 minimum"}
        </p>
        {canContinue && (
          <div className="mt-4">
            <ContinueButton onClick={onComplete} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

interface DiscoveryCard {
  equation: string;
  opDone: string;
  inverse: string;
  solution: string;
  color: string;
}

const DISCOVERY_CARDS: readonly DiscoveryCard[] = [
  { equation: "x + 6 = 10", opDone: "Added 6", inverse: "Subtract 6 from both sides", solution: "x = 4", color: C.solution },
  { equation: "x \u2212 3 = 5", opDone: "Subtracted 3", inverse: "Add 3 to both sides", solution: "x = 8", color: C.operation },
  { equation: "4x = 20", opDone: "Multiplied by 4", inverse: "Divide both sides by 4", solution: "x = 5", color: C.inverse },
  { equation: "x / 2 = 6", opDone: "Divided by 2", inverse: "Multiply both sides by 2", solution: "x = 12", color: C.variable },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showP3Text, setShowP3Text] = useState(false);

  const allFlipped = flippedCards.size >= 4;

  useEffect(() => {
    if (allFlipped) setShowP3Text(true);
  }, [allFlipped]);

  const handleFlipCard = useCallback((idx: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }, []);

  const advancePrompt = useCallback(() => {
    setPromptIdx((i) => i + 1);
  }, []);

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <AnimatePresence mode="wait">
        {/* Prompt 1: Balance Principle */}
        {promptIdx === 0 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={FADE}
            className="flex flex-1 flex-col items-center justify-center"
          >
            {/* Mini balance SVG */}
            <svg viewBox="0 0 400 160" className="mx-auto mb-4 w-full" style={{ maxWidth: 400 }}>
              <polygon points="200,100 180,130 220,130" fill="#475569" stroke={C.scale} strokeWidth={2} />
              <rect x={80} y={90} width={240} height={6} rx={3} fill={C.scale} />
              <text x={120} y={82} textAnchor={"middle" as const} fill={C.variable} fontSize={14} fontWeight={700}>
                x + 4
              </text>
              <text x={280} y={82} textAnchor={"middle" as const} fill={C.textPrimary} fontSize={14} fontWeight={700}>
                9
              </text>
              <circle cx={200} cy={88} r={5} fill={C.success} />
            </svg>

            <div
              className="rounded-xl p-4 text-base leading-relaxed"
              style={{ backgroundColor: C.bgSurface, color: C.textSecondary }}
            >
              {"Watch carefully: when we remove the "}
              <span className="font-bold" style={{ color: C.inverse }}>
                SAME amount
              </span>
              {" from "}
              <span className="font-bold" style={{ color: C.operation }}>
                BOTH sides
              </span>
              {", the scale stays balanced. That\u2019s the secret \u2014 whatever you do to one side, do the SAME to the other."}
            </div>

            <div className="mt-6">
              <ContinueButton onClick={advancePrompt} label="I see it!" />
            </div>
          </motion.div>
        )}

        {/* Prompt 2: Inverse Operations */}
        {promptIdx === 1 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={FADE}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <div className="mb-4 flex w-full gap-3">
              {/* Forward panel */}
              <div
                className="flex-1 rounded-xl p-4"
                style={{
                  backgroundColor: C.bgSurface,
                  borderTop: `3px solid ${C.operation}`,
                }}
              >
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: C.operationFill, color: C.operation }}
                >
                  Building
                </span>
                <p className="mt-2 font-mono text-sm" style={{ color: C.textPrimary }}>
                  x = 7
                </p>
                <p className="font-mono text-sm" style={{ color: C.operation }}>
                  {"+ 5 \u2192"}
                </p>
                <p className="font-mono text-sm font-bold" style={{ color: C.textPrimary }}>
                  x + 5 = 12
                </p>
              </div>

              {/* Backward panel */}
              <div
                className="flex-1 rounded-xl p-4"
                style={{
                  backgroundColor: C.bgSurface,
                  borderTop: `3px solid ${C.inverse}`,
                }}
              >
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: C.inverseFill, color: C.inverse }}
                >
                  Solving
                </span>
                <p className="mt-2 font-mono text-sm" style={{ color: C.textPrimary }}>
                  x + 5 = 12
                </p>
                <p className="font-mono text-sm" style={{ color: C.inverse }}>
                  {"\u2212 5 \u2192"}
                </p>
                <p className="font-mono text-sm font-bold" style={{ color: C.solution }}>
                  x = 7
                </p>
              </div>
            </div>

            <div
              className="rounded-xl p-4 text-base leading-relaxed"
              style={{ backgroundColor: C.bgSurface, color: C.textSecondary }}
            >
              {"Building an equation means "}
              <span className="font-bold" style={{ color: C.operation }}>DOING</span>
              {" operations to x. Solving means "}
              <span className="font-bold" style={{ color: C.inverse }}>UNDOING</span>
              {" them. Addition and subtraction are opposites. Multiplication and division are opposites. The opposite is called the "}
              <span
                className="inline-block rounded px-2 py-0.5 font-bold"
                style={{ backgroundColor: C.inverseFill, color: C.inverse }}
              >
                inverse operation
              </span>
              {"."}
            </div>

            <div className="mt-6">
              <ContinueButton onClick={advancePrompt} label="Got it!" />
            </div>
          </motion.div>
        )}

        {/* Prompt 3: Four Cases (flip cards) */}
        {promptIdx === 2 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={FADE}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <div className="mb-4 grid w-full grid-cols-2 gap-3">
              {DISCOVERY_CARDS.map((card, i) => {
                const isFlipped = flippedCards.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleFlipCard(i)}
                    className="rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: isFlipped ? C.bgSurface : "#334155",
                      border: `1px solid ${isFlipped ? card.color : C.borderLight}`,
                      borderLeft: isFlipped ? `4px solid ${card.color}` : `1px solid ${C.borderLight}`,
                      padding: 12,
                      minHeight: 120,
                    }}
                    role="button"
                    aria-label={isFlipped ? `Equation: ${card.equation}. Solution: ${card.solution}` : `Equation card: ${card.equation}. Tap to reveal.`}
                  >
                    <p className="font-mono text-base font-bold" style={{ color: C.textPrimary }}>
                      {card.equation}
                    </p>
                    {isFlipped && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={FADE}
                      >
                        <p className="mt-1 text-xs" style={{ color: C.operation }}>
                          {"Operation: "}
                          {card.opDone}
                        </p>
                        <p className="text-xs" style={{ color: C.textDim }}>
                          {"\u2193 Inverse"}
                        </p>
                        <p className="text-xs" style={{ color: C.inverse }}>
                          {"Undo: "}
                          {card.inverse}
                        </p>
                        <p className="mt-1 font-mono text-sm font-bold" style={{ color: C.solution }}>
                          {card.solution}
                        </p>
                      </motion.div>
                    )}
                    {!isFlipped && (
                      <p className="mt-2 text-xs" style={{ color: C.textDim }}>
                        Tap to reveal
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {showP3Text && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={FADE}
                className="rounded-xl p-4 text-base leading-relaxed"
                style={{ backgroundColor: C.bgSurface, color: C.textSecondary }}
              >
                {"See the pattern? Whatever was "}
                <span className="font-bold" style={{ color: C.operation }}>DONE</span>
                {" to x, do the "}
                <span className="font-bold" style={{ color: C.inverse }}>OPPOSITE</span>
                {" to both sides. That\u2019s how you isolate x and solve the equation."}
              </motion.div>
            )}

            {allFlipped && (
              <div className="mt-6">
                <ContinueButton onClick={advancePrompt} />
              </div>
            )}
          </motion.div>
        )}

        {/* Prompt 4: Why Not Guess? */}
        {promptIdx === 3 && (
          <motion.div
            key="p4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={FADE}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <div className="mb-4 flex w-full gap-3">
              {/* Guessing approach */}
              <div
                className="flex-1 rounded-xl p-3"
                style={{
                  backgroundColor: C.bgSurface,
                  borderTop: `3px solid ${C.error}`,
                }}
              >
                <span className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#f8717120", color: C.error }}>
                  Guess and Check
                </span>
                <div className="mt-2 space-y-1 text-xs" style={{ color: C.textSecondary }}>
                  <p>
                    {"x = 20? \u2192 20 + 47 = 67 "}
                    <span style={{ color: C.error }}>{"✗"}</span>
                  </p>
                  <p>
                    {"x = 40? \u2192 40 + 47 = 87 "}
                    <span style={{ color: C.error }}>{"✗"}</span>
                  </p>
                  <p>
                    {"x = 35? \u2192 35 + 47 = 82 "}
                    <span style={{ color: C.error }}>{"✗"}</span>
                  </p>
                  <p>
                    {"x = 36? \u2192 36 + 47 = 83 "}
                    <span style={{ color: C.success }}>{"✓"}</span>
                  </p>
                </div>
                <p className="mt-2 text-xs" style={{ color: C.textDim }}>
                  4 tries. Works... but slow.
                </p>
              </div>

              {/* Inverse operation approach */}
              <div
                className="flex-1 rounded-xl p-3"
                style={{
                  backgroundColor: C.bgSurface,
                  borderTop: `3px solid ${C.solution}`,
                }}
              >
                <span className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: C.solutionFill, color: C.solution }}>
                  Inverse Operation
                </span>
                <div className="mt-2 space-y-1 font-mono text-xs" style={{ color: C.textPrimary }}>
                  <p>x + 47 = 83</p>
                  <p>
                    {"x + 47 "}
                    <span style={{ color: C.inverse }}>{"\u2212 47"}</span>
                    {" = 83 "}
                    <span style={{ color: C.inverse }}>{"\u2212 47"}</span>
                  </p>
                  <p className="font-bold" style={{ color: C.solution }}>
                    {"x = 36 ✓"}
                  </p>
                </div>
                <p className="mt-2 text-xs" style={{ color: C.textDim }}>
                  1 step. Works EVERY time.
                </p>
              </div>
            </div>

            <div
              className="rounded-xl p-4 text-sm leading-relaxed"
              style={{ backgroundColor: C.bgSurface, color: C.textSecondary }}
            >
              {"Guessing might work for easy numbers, but what about "}
              <span className="font-mono">x + 2.7 = 9.13</span>
              {" or "}
              <span className="font-mono">47x = 1,551</span>
              {"? The inverse operation method works for ANY equation, no matter how big or messy the numbers are."}
            </div>

            <div className="mt-6">
              <ContinueButton onClick={advancePrompt} label="Got it!" />
            </div>
          </motion.div>
        )}

        {/* Prompt 5: Key Insight */}
        {promptIdx === 4 && (
          <motion.div
            key="p5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={FADE}
            className="flex flex-1 flex-col items-center justify-center"
          >
            {/* Insight card */}
            <div
              className="rounded-r-xl p-5"
              style={{
                backgroundColor: "#7c3aed20",
                borderLeft: `4px solid ${C.variable}`,
              }}
            >
              {/* Lightbulb icon */}
              <div className="mb-3 flex items-center gap-2">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a7 7 0 0 1 4.5 12.37V17a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-2.63A7 7 0 0 1 12 2Z" fill={C.operation} />
                  <rect x={9} y={19} width={6} height={2} rx={1} fill={C.operation} />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: C.variable }}>
                  Key Insight
                </span>
              </div>

              <p
                className="text-lg font-medium leading-relaxed"
                style={{ color: C.textPrimary, lineHeight: 1.7 }}
              >
                {"Solving an equation means "}
                <span
                  className="inline-block rounded px-2 py-0.5"
                  style={{ backgroundColor: "#8b5cf620", color: C.variable }}
                >
                  isolating x
                </span>
                {" \u2014 getting x alone on one side. You do this by applying the "}
                <span
                  className="inline-block rounded px-2 py-0.5"
                  style={{ backgroundColor: C.inverseFill, color: C.inverse }}
                >
                  inverse operation
                </span>
                {" to "}
                <span
                  className="inline-block rounded px-2 py-0.5"
                  style={{ backgroundColor: C.operationFill, color: C.operation }}
                >
                  both sides
                </span>
                {". If x was added to, subtract. If x was multiplied by, divide. Always do the same thing to both sides to keep the equation balanced."}
              </p>
            </div>

            <div className="mt-6">
              <ContinueButton onClick={onComplete} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 2000));
    timers.push(setTimeout(() => setStep(2), 4500));
    timers.push(setTimeout(() => setStep(3), 7000));
    timers.push(setTimeout(() => setStep(4), 9500));
    timers.push(setTimeout(() => setStep(5), 12000));
    timers.push(setTimeout(() => setStep(6), 15000));
    timers.push(setTimeout(() => setStep(7), 17000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Main equation */}
      <div className="mt-4 flex items-center justify-center">
        <p
          className="font-mono font-bold"
          style={{
            fontSize: "clamp(28px, 6vw, 44px)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ color: C.variable }}>x</span>
          <span style={{ color: C.textMuted }}>{" + "}</span>
          <span style={{ color: C.textPrimary }}>5</span>
          <span style={{ color: C.textMuted }}>{" = "}</span>
          <span style={{ color: C.textPrimary }}>12</span>
        </p>
      </div>

      {/* Mini balance SVG */}
      <svg viewBox="0 0 300 100" className="mx-auto mb-4 w-full" style={{ maxWidth: 300 }}>
        <polygon points="150,60 135,85 165,85" fill="#475569" stroke={C.scale} strokeWidth={1.5} />
        <rect x={40} y={54} width={220} height={5} rx={2} fill={C.scale} />
        <text x={80} y={48} textAnchor={"middle" as const} fill={C.variable} fontSize={12} fontWeight={700}>
          ? + 5
        </text>
        <text x={220} y={48} textAnchor={"middle" as const} fill={C.textPrimary} fontSize={12} fontWeight={700}>
          12
        </text>
        <circle cx={150} cy={53} r={4} fill={C.success} />
      </svg>

      {/* Step annotations */}
      <div className="space-y-3">
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
            className="rounded-lg px-4 py-2 text-sm"
            style={{ color: C.operation }}
          >
            <span className="font-bold">The operation:</span>
            {" something was ADDED to x"}
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
            className="rounded-lg px-4 py-2 text-sm"
            style={{ color: C.inverse }}
          >
            <span className="font-bold">The inverse:</span>
            {" to undo +5, we "}
            <span className="font-bold">subtract 5</span>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
            className="rounded-lg px-4 py-3 font-mono text-base"
            style={{ backgroundColor: C.bgSurface, color: C.textPrimary }}
          >
            {"x + 5 "}
            <span style={{ color: C.inverse }}>{"\u2212 5"}</span>
            {" = 12 "}
            <span style={{ color: C.inverse }}>{"\u2212 5"}</span>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            className="flex items-center justify-center rounded-xl px-4 py-3 font-mono font-bold"
            style={{ fontSize: "clamp(32px, 7vw, 48px)" }}
          >
            <span style={{ color: C.variable }}>x</span>
            <span style={{ color: C.textPrimary }}>{" = "}</span>
            <span style={{ color: C.solution }}>7</span>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
            className="rounded-xl p-4"
            style={{
              backgroundColor: C.bgSurface,
              borderLeft: `4px solid ${C.solution}`,
            }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: C.solution }}>
              Check your answer
            </p>
            <div className="space-y-1 font-mono text-sm" style={{ color: C.textPrimary }}>
              <p>x + 5 = 12</p>
              <p>
                <span style={{ color: C.solution }}>7</span>
                {" + 5 = 12"}
              </p>
              <p>
                {"12 = 12 "}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                  style={{ color: C.success, display: "inline-block" }}
                >
                  {"✓"}
                </motion.span>
              </p>
            </div>
          </motion.div>
        )}

        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
            className="rounded-xl p-4"
            style={{ backgroundColor: C.bgSurface }}
            aria-label="Summary of the four-step method for solving one-step equations"
          >
            <p className="mb-2 text-sm font-bold" style={{ color: C.textPrimary }}>
              Solving One-Step Equations:
            </p>
            <ol className="space-y-1 text-sm">
              <li style={{ color: C.operation }}>1. Identify the operation done to x</li>
              <li style={{ color: C.inverse }}>2. Apply the INVERSE to BOTH sides</li>
              <li style={{ color: C.solution }}>3. Simplify to get x = [answer]</li>
              <li style={{ color: C.success }}>
                {"4. Check by substituting back ✓"}
              </li>
            </ol>
          </motion.div>
        )}
      </div>

      {step >= 7 && (
        <div className="mt-6 flex justify-center">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL-WORLD ANCHOR
// ═══════════════════════════════════════════════════════════════════════════

interface RealWorldCard {
  title: string;
  scenario: string;
  equation: string;
  solutionHint: string;
  color: string;
}

const REAL_WORLD_CARDS: readonly RealWorldCard[] = [
  {
    title: "Shopping",
    scenario: "You buy a game and a $5 drink. Your total is $47. How much was the game?",
    equation: "x + 5 = 47",
    solutionHint: "Subtract 5 from both sides: x = 42. The game cost $42.",
    color: C.block,
  },
  {
    title: "Gaming",
    scenario: "You scored triple your friend\u2019s score: 186 points. What was your friend\u2019s score?",
    equation: "3x = 186",
    solutionHint: "Divide both sides by 3: x = 62. Friend scored 62 points.",
    color: C.variable,
  },
  {
    title: "Cooking",
    scenario: "A recipe needs some flour plus 2 cups of sugar. You use 7 cups total. How much flour?",
    equation: "x + 2 = 7",
    solutionHint: "Subtract 2 from both sides: x = 5. You need 5 cups of flour.",
    color: C.operation,
  },
  {
    title: "Sharing",
    scenario: "You split a pizza bill equally among 4 friends. Each person pays $9. What was the total bill?",
    equation: "x / 4 = 9",
    solutionHint: "Multiply both sides by 4: x = 36. The total bill was $36.",
    color: C.inverse,
  },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <h2 className="mb-4 mt-4 text-center text-lg font-bold" style={{ color: C.textPrimary }}>
        Equations in Real Life
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {REAL_WORLD_CARDS.map((card, i) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...FADE, delay: i * 0.15 }}
            className="rounded-xl p-4"
            style={{
              backgroundColor: C.bgSurface,
              borderTop: `3px solid ${card.color}`,
            }}
            aria-label={`${card.title}: ${card.scenario}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
                aria-hidden="true"
              >
                {card.title.charAt(0)}
              </div>
              <span className="text-sm font-bold" style={{ color: C.textPrimary }}>
                {card.title}
              </span>
            </div>

            <p className="mb-2 text-sm" style={{ color: C.textSecondary }}>
              {card.scenario}
            </p>

            <p className="mb-1 font-mono text-base font-bold" style={{ color: C.textPrimary }}>
              {card.equation}
            </p>

            <p className="text-xs" style={{ color: C.textMuted }}>
              {card.solutionHint}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <ContinueButton onClick={onComplete} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE (9 problems, 3 layers)
// ═══════════════════════════════════════════════════════════════════════════

type PracticeLayer = "recall" | "procedure" | "understanding";

interface PracticeProblem {
  id: string;
  layer: PracticeLayer;
  prompt: string;
  kind: "multi-choice" | "numeric" | "tap-match";
  options?: readonly string[];
  correctAnswer: string;
  correctFeedback: string;
  incorrectFeedbacks: Record<string, string>;
  defaultIncorrect: string;
}

const LAYER_COLORS: Record<PracticeLayer, string> = {
  recall: C.variable,
  procedure: C.operation,
  understanding: C.inverse,
};

const LAYER_LABELS: Record<PracticeLayer, string> = {
  recall: "Recall",
  procedure: "Procedure",
  understanding: "Understanding",
};

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  // Layer 0: Recall
  {
    id: "p1",
    layer: "recall",
    prompt: "To solve x + 9 = 14, what should you do to both sides?",
    kind: "multi-choice",
    options: [
      "Add 9 to both sides",
      "Subtract 9 from both sides",
      "Multiply both sides by 9",
      "Divide both sides by 9",
    ],
    correctAnswer: "Subtract 9 from both sides",
    correctFeedback:
      "Correct! The equation has + 9, so we UNDO it by subtracting 9 from both sides. Addition and subtraction are inverse operations.",
    incorrectFeedbacks: {
      "Add 9 to both sides":
        "Adding 9 would make x + 9 + 9 = 14 + 9, which wraps x up more! To UNDO adding 9, use the OPPOSITE: subtract 9.",
    },
    defaultIncorrect:
      "Multiply and divide are for equations like 3x = 12. Here, x was ADDED to, so we need to SUBTRACT. Match the operation type!",
  },
  {
    id: "p2",
    layer: "recall",
    prompt: "In the equation x + 3 = 10, what does the = sign mean?",
    kind: "multi-choice",
    options: [
      "The answer is 10",
      "The left side and right side have the same value",
      "Calculate x + 3",
    ],
    correctAnswer: "The left side and right side have the same value",
    correctFeedback:
      "Exactly! The equals sign means \u2018these two sides are the SAME.\u2019 Like a balance scale \u2014 both pans hold the same weight.",
    incorrectFeedbacks: {
      "The answer is 10":
        "If = meant \u2018the answer is,\u2019 then 10 = x + 3 wouldn\u2019t make sense \u2014 but it\u2019s a valid equation! The = means both sides are the SAME value.",
      "Calculate x + 3":
        "The equals sign doesn\u2019t mean \u2018calculate.\u2019 It means the two sides are already equal \u2014 they have the SAME value. Think of a balance scale.",
    },
    defaultIncorrect:
      "The equals sign means both sides have the same value, like a balance scale.",
  },
  {
    id: "p3",
    layer: "recall",
    prompt: "Match each operation to its inverse. Tap an operation on the left, then tap its inverse on the right.",
    kind: "tap-match",
    correctAnswer: "",
    correctFeedback:
      "Perfect! Every operation has an inverse. Addition undoes subtraction. Multiplication undoes division. These pairs are the key to solving equations.",
    incorrectFeedbacks: {},
    defaultIncorrect:
      "Not quite \u2014 think about what UNDOES the operation. What\u2019s the opposite?",
  },
  // Layer 1: Procedure
  {
    id: "p4",
    layer: "procedure",
    prompt: "Solve for x:  x + 8 = 15",
    kind: "numeric",
    correctAnswer: "7",
    correctFeedback:
      "Correct! Subtract 8 from both sides: 15 \u2212 8 = 7. Check: 7 + 8 = 15. It works!",
    incorrectFeedbacks: {
      "23": "You may have ADDED 8 instead of SUBTRACTING it. The equation has + 8, so undo it by subtracting. Try 15 \u2212 8.",
    },
    defaultIncorrect:
      "To isolate x, subtract 8 from both sides: x = 15 \u2212 8. What is 15 \u2212 8?",
  },
  {
    id: "p5",
    layer: "procedure",
    prompt: "Solve for x:  5x = 35",
    kind: "numeric",
    correctAnswer: "7",
    correctFeedback:
      "Correct! Divide both sides by 5: 35 \u00f7 5 = 7. Check: 5 \u00d7 7 = 35. Perfect!",
    incorrectFeedbacks: {
      "175":
        "That\u2019s too big! You may have MULTIPLIED by 5 instead of DIVIDING. The equation has 5 times x, so undo by dividing. Try 35 \u00f7 5.",
    },
    defaultIncorrect:
      "In 5x = 35, x is being MULTIPLIED by 5. The inverse of multiplication is division. Divide both sides by 5: x = 35 \u00f7 5.",
  },
  {
    id: "p6",
    layer: "procedure",
    prompt: "Solve for x:  x \u2212 4 = 9",
    kind: "multi-choice",
    options: ["5", "13", "\u221213", "36"],
    correctAnswer: "13",
    correctFeedback:
      "Yes! The equation has \u2212 4, so ADD 4 to both sides: 9 + 4 = 13. Check: 13 \u2212 4 = 9.",
    incorrectFeedbacks: {
      "5": "If x = 5, then 5 \u2212 4 = 1, not 9. You might have subtracted 4 from 9, but to undo \u2212 4 we ADD. Try 9 + 4.",
    },
    defaultIncorrect:
      "To undo \u2212 4, add 4 to both sides: x = 9 + 4. What is 9 + 4?",
  },
  // Layer 2: Understanding
  {
    id: "p7",
    layer: "understanding",
    prompt:
      "Sam solved x + 6 = 15 like this:\n  x + 6 \u2212 6 = 15\n  x = 15\nWhat did Sam do wrong?",
    kind: "multi-choice",
    options: [
      "Sam subtracted 6 from only the LEFT side, not both sides",
      "Sam should have added 6, not subtracted 6",
      "Sam\u2019s answer is correct, there\u2019s no error",
    ],
    correctAnswer: "Sam subtracted 6 from only the LEFT side, not both sides",
    correctFeedback:
      "Exactly! Sam forgot the golden rule: whatever you do to one side, do the SAME to the other. The correct work: x + 6 \u2212 6 = 15 \u2212 6, so x = 9.",
    incorrectFeedbacks: {
      "Sam should have added 6, not subtracted 6":
        "Sam was right to subtract (the equation has + 6, so subtracting is the correct inverse). The problem is Sam only subtracted from ONE side.",
      "Sam\u2019s answer is correct, there\u2019s no error":
        "Check: if x = 15, then 15 + 6 = 21, not 15. Sam\u2019s answer is wrong! Look at the second line \u2014 the \u2212 6 only appears on the left.",
    },
    defaultIncorrect:
      "Sam only subtracted from one side. Both sides must get the same operation.",
  },
  {
    id: "p8",
    layer: "understanding",
    prompt: "To solve x + 12 = 20, which operation should you apply to BOTH sides?",
    kind: "multi-choice",
    options: ["+ 12", "\u2212 12", "\u00d7 12", "\u00f7 12"],
    correctAnswer: "\u2212 12",
    correctFeedback:
      "Perfect! You apply \u2212 12 to BOTH sides, keeping the equation balanced. x = 20 \u2212 12 = 8. Check: 8 + 12 = 20.",
    incorrectFeedbacks: {
      "+ 12":
        "Adding 12 would make x + 12 + 12 = 20 + 12, wrapping x up more! To UNDO + 12, use \u2212 12.",
    },
    defaultIncorrect:
      "The equation has + 12. To undo addition, use subtraction: apply \u2212 12 to both sides.",
  },
  {
    id: "p9",
    layer: "understanding",
    prompt:
      "Maya has some stickers. She gives away 8 and has 15 left. Which equation represents this?",
    kind: "multi-choice",
    options: ["x + 8 = 15", "x \u2212 8 = 15", "8x = 15", "x + 15 = 8"],
    correctAnswer: "x \u2212 8 = 15",
    correctFeedback:
      "That\u2019s right! Maya STARTED with x stickers, GAVE AWAY 8 (subtracted), and had 15 left. So x \u2212 8 = 15. Solving: x = 15 + 8 = 23.",
    incorrectFeedbacks: {
      "x + 8 = 15":
        "If Maya ADDED 8, that would be x + 8 = 15. But she GAVE AWAY 8 \u2014 giving away is subtraction: x \u2212 8 = 15.",
      "8x = 15":
        "8x = 15 means 8 TIMES x equals 15 \u2014 multiplying. She gave away 8, which is subtraction: x \u2212 8 = 15.",
      "x + 15 = 8":
        "x + 15 = 8 means adding 15 and getting 8 \u2014 fewer after adding doesn\u2019t make sense. She started with x, subtracted 8, got 15: x \u2212 8 = 15.",
    },
    defaultIncorrect:
      "Maya started with x, gave away 8 (subtract), had 15 left. The equation is x \u2212 8 = 15.",
  },
] as const;

// Match pairs for problem 3
interface MatchPair {
  op: string;
  inv: string;
}

const MATCH_PAIRS: readonly MatchPair[] = [
  { op: "+ 7", inv: "\u2212 7" },
  { op: "\u2212 3", inv: "+ 3" },
  { op: "\u00d7 4", inv: "\u00f7 4" },
  { op: "\u00f7 5", inv: "\u00d7 5" },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState("");
  const [phase, setPhase] = useState<"answering" | "feedback">("answering");
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [dotStates, setDotStates] = useState<Array<"pending" | "correct" | "incorrect">>(
    Array.from({ length: PRACTICE_PROBLEMS.length }, () => "pending" as const)
  );
  const [done, setDone] = useState(false);

  // Match problem state
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [selectedOp, setSelectedOp] = useState<number | null>(null);
  const [wrongMatch, setWrongMatch] = useState(false);
  const wrongMatchTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (wrongMatchTimerRef.current) clearTimeout(wrongMatchTimerRef.current);
    };
  }, []);

  // Shuffled inverse indices for match problem (fixed for consistency)
  const shuffledInvIndices = useMemo(() => [2, 0, 3, 1], []);

  const total = PRACTICE_PROBLEMS.length;
  const prob = PRACTICE_PROBLEMS[currentIdx]!;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    let answer: string;
    if (prob.kind === "numeric") {
      answer = numericInput.trim();
    } else {
      answer = selectedAnswer ?? "";
    }

    const correct = answer === prob.correctAnswer;
    setIsCorrect(correct);
    setPhase("feedback");
    setAttempts((a) => a + 1);

    if (correct) {
      setCorrectCount((c) => c + 1);
      setDotStates((prev) => {
        const next = [...prev];
        next[currentIdx] = "correct";
        return next;
      });
    }
  }, [prob, numericInput, selectedAnswer, currentIdx]);

  const handleNext = useCallback(() => {
    if (!isCorrect && attempts < 3) {
      // Allow retry
      setPhase("answering");
      setSelectedAnswer(null);
      setNumericInput("");
      return;
    }

    if (!isCorrect) {
      setDotStates((prev) => {
        const next = [...prev];
        next[currentIdx] = "incorrect";
        return next;
      });
    }

    const nextIdx = currentIdx + 1;
    if (nextIdx >= total) {
      setDone(true);
    } else {
      setCurrentIdx(nextIdx);
      setSelectedAnswer(null);
      setNumericInput("");
      setPhase("answering");
      setIsCorrect(false);
      setAttempts(0);
      setMatchedPairs(new Set());
      setSelectedOp(null);
    }
  }, [isCorrect, attempts, currentIdx, total]);

  const handleSelectOp = useCallback((idx: number) => {
    if (matchedPairs.has(idx)) return;
    setSelectedOp(idx);
  }, [matchedPairs]);

  const handleSelectInv = useCallback(
    (origIdx: number) => {
      if (matchedPairs.has(origIdx)) return;
      if (selectedOp === null) return;

      if (origIdx === selectedOp) {
        // Correct match
        const nextMatched = new Set(matchedPairs);
        nextMatched.add(origIdx);
        setMatchedPairs(nextMatched);
        setSelectedOp(null);

        // Check if all matched
        if (nextMatched.size >= MATCH_PAIRS.length) {
          setIsCorrect(true);
          setPhase("feedback");
          setCorrectCount((c) => c + 1);
          setDotStates((prev) => {
            const next = [...prev];
            next[currentIdx] = "correct";
            return next;
          });
        }
      } else {
        // Wrong match
        setSelectedOp(null);
        setWrongMatch(true);
        if (wrongMatchTimerRef.current) clearTimeout(wrongMatchTimerRef.current);
        wrongMatchTimerRef.current = setTimeout(() => setWrongMatch(false), 1000);
      }
    },
    [matchedPairs, selectedOp, currentIdx]
  );

  const getFeedbackText = useCallback((): string => {
    if (isCorrect) return prob.correctFeedback;
    const answer = prob.kind === "numeric" ? numericInput.trim() : (selectedAnswer ?? "");
    const specific = prob.incorrectFeedbacks[answer];
    return specific ?? prob.defaultIncorrect;
  }, [isCorrect, prob, numericInput, selectedAnswer]);

  if (done) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center px-4"
      >
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: C.solutionFill }}
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.success}
            strokeWidth={2.5}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold" style={{ color: C.textPrimary }}>
          Practice Complete!
        </h2>
        <p className="mb-6" style={{ color: C.textMuted }}>
          {correctCount}/{total} correct ({pct}%)
        </p>
        <ContinueButton onClick={onComplete} />
      </motion.div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Problem progress dots */}
      <div className="mb-4 mt-2 flex items-center justify-center gap-1.5">
        {dotStates.map((state, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor:
                state === "correct"
                  ? C.success
                  : state === "incorrect"
                    ? C.error
                    : C.border,
              border: i === currentIdx ? `2px solid ${C.primary}` : "none",
              boxShadow: i === currentIdx ? `0 0 6px ${C.primary}80` : "none",
            }}
          />
        ))}
      </div>

      {/* Problem header */}
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: `${LAYER_COLORS[prob.layer]}20`,
              color: LAYER_COLORS[prob.layer],
            }}
          >
            {LAYER_LABELS[prob.layer]}
          </span>
          <span style={{ color: C.textDim }}>
            {"Problem "}
            {currentIdx + 1}
            {" / "}
            {total}
          </span>
        </span>
        <span style={{ color: C.textDim }}>
          {correctCount}
          {" correct"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={prob.id}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={FADE}
        >
          {/* Problem card */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: C.bgSurface,
              border: `1px solid ${C.border}`,
            }}
            role="form"
            aria-label={prob.prompt}
          >
            <p
              className="mb-5 whitespace-pre-line text-base font-medium leading-relaxed"
              style={{ color: C.textPrimary }}
            >
              {prob.prompt}
            </p>

            {/* Answer area */}
            {phase === "answering" && (
              <>
                {/* Multi-choice */}
                {prob.kind === "multi-choice" && prob.options != null && (
                  <div className="mb-4 space-y-2" role="radiogroup">
                    {prob.options.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      return (
                        <button
                          key={opt}
                          onClick={() => setSelectedAnswer(opt)}
                          className="flex w-full items-center gap-3 rounded-xl px-4 text-left text-base transition-all"
                          style={{
                            minHeight: 52,
                            backgroundColor:
                              selectedAnswer === opt ? `${C.primary}20` : C.bgPrimary,
                            border: `2px solid ${selectedAnswer === opt ? C.primary : C.border}`,
                            color: C.textPrimary,
                          }}
                          role="radio"
                          aria-checked={selectedAnswer === opt}
                        >
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                            style={{
                              backgroundColor: selectedAnswer === opt ? C.primary : C.border,
                              color: selectedAnswer === opt ? "#fff" : C.textMuted,
                            }}
                          >
                            {letter}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Numeric input */}
                {prob.kind === "numeric" && (
                  <div className="mb-4 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xl font-bold" style={{ color: C.variable }}>
                        {"x = "}
                      </span>
                      <input
                        ref={inputRef}
                        type="number"
                        inputMode="numeric"
                        value={numericInput}
                        onChange={(e) => setNumericInput(e.target.value)}
                        className="rounded-xl text-center font-mono text-2xl font-bold"
                        style={{
                          width: 120,
                          height: 52,
                          backgroundColor: C.bgPrimary,
                          border: `2px solid ${C.borderLight}`,
                          color: C.textPrimary,
                          fontVariantNumeric: "tabular-nums",
                        }}
                        aria-label="Enter the value of x"
                      />
                    </div>
                  </div>
                )}

                {/* Tap-match for problem 3 */}
                {prob.kind === "tap-match" && (
                  <div className="mb-4">
                    {wrongMatch && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-2 text-center text-sm"
                        style={{ color: C.error }}
                      >
                        {"Not quite \u2014 think about what UNDOES the operation."}
                      </motion.p>
                    )}
                    <div className="flex gap-4">
                      {/* Operations column */}
                      <div className="flex flex-1 flex-col gap-2">
                        <p className="text-xs font-semibold" style={{ color: C.operation }}>
                          Operations
                        </p>
                        {MATCH_PAIRS.map((pair, i) => (
                          <button
                            key={`op-${i}`}
                            onClick={() => handleSelectOp(i)}
                            className="flex items-center justify-center rounded-lg font-mono text-lg font-semibold transition-all"
                            style={{
                              minHeight: 44,
                              minWidth: 44,
                              width: "100%",
                              backgroundColor: matchedPairs.has(i)
                                ? C.solutionFill
                                : selectedOp === i
                                  ? `${C.primary}20`
                                  : C.operationFill,
                              border: `2px solid ${
                                matchedPairs.has(i)
                                  ? C.solution
                                  : selectedOp === i
                                    ? C.primary
                                    : C.operation
                              }`,
                              color: matchedPairs.has(i) ? C.solution : C.operation,
                            }}
                            disabled={matchedPairs.has(i)}
                          >
                            {pair.op}
                          </button>
                        ))}
                      </div>

                      {/* Inverses column (shuffled) */}
                      <div className="flex flex-1 flex-col gap-2">
                        <p className="text-xs font-semibold" style={{ color: C.inverse }}>
                          Inverses
                        </p>
                        {shuffledInvIndices.map((origIdx) => {
                          const pair = MATCH_PAIRS[origIdx]!;
                          return (
                            <button
                              key={`inv-${origIdx}`}
                              onClick={() => handleSelectInv(origIdx)}
                              className="flex items-center justify-center rounded-lg font-mono text-lg font-semibold transition-all"
                              style={{
                                minHeight: 44,
                                minWidth: 44,
                                width: "100%",
                                backgroundColor: matchedPairs.has(origIdx) ? C.solutionFill : C.inverseFill,
                                border: `2px solid ${matchedPairs.has(origIdx) ? C.solution : C.inverse}`,
                                color: matchedPairs.has(origIdx) ? C.solution : C.inverse,
                              }}
                              disabled={matchedPairs.has(origIdx)}
                            >
                              {pair.inv}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button (not for tap-match) */}
                {prob.kind !== "tap-match" && (
                  <button
                    onClick={handleSubmit}
                    disabled={
                      prob.kind === "multi-choice"
                        ? selectedAnswer === null
                        : numericInput.trim() === ""
                    }
                    className="w-full rounded-xl py-3 text-base font-semibold text-white transition-colors disabled:opacity-40"
                    style={{
                      backgroundColor: C.primary,
                      minHeight: 48,
                    }}
                  >
                    Check
                  </button>
                )}
              </>
            )}

            {/* Feedback */}
            {phase === "feedback" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={FADE}
              >
                {/* Feedback icon */}
                <div className="mb-3 flex items-center gap-2">
                  {isCorrect ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={SPRING_POP}
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: C.solutionFill }}
                    >
                      <span style={{ color: C.success, fontSize: 18 }}>{"✓"}</span>
                    </motion.div>
                  ) : (
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#f8717120" }}
                    >
                      <span style={{ color: C.error, fontSize: 18 }}>{"✗"}</span>
                    </div>
                  )}
                  <span
                    className="text-sm font-bold"
                    style={{ color: isCorrect ? C.success : C.error }}
                  >
                    {isCorrect ? "Correct!" : "Not quite"}
                  </span>
                </div>

                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: isCorrect ? C.success : "#fca5a5" }}
                >
                  {getFeedbackText()}
                </p>

                {/* Next button -- feedback stays until tapped */}
                <button
                  onClick={handleNext}
                  className="w-full rounded-xl py-3 text-base font-semibold text-white transition-colors"
                  style={{
                    backgroundColor: isCorrect ? C.success : C.primary,
                    minHeight: 48,
                  }}
                >
                  {isCorrect || attempts >= 3 ? "Next \u2192" : "Try Again \u2192"}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
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
  const meetsMin = text.length >= minChars;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleSkip = useCallback(() => {
    setSkipped(true);
  }, []);

  if (submitted || skipped) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={FADE}
        className="flex flex-1 flex-col items-center justify-center px-4"
      >
        <div
          className="w-full rounded-2xl p-6"
          style={{ maxWidth: 640, backgroundColor: C.bgSurface }}
        >
          {submitted && (
            <>
              {/* Stars */}
              <div className="mb-3 flex justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill={i < 4 ? C.warning : C.border}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="mb-3 text-center text-sm" style={{ color: C.solution }}>
                Good thinking! You&apos;re on the right track.
              </p>

              <div
                className="mb-4 rounded-lg p-3"
                style={{
                  backgroundColor: C.bgPrimary,
                  borderLeft: `4px solid ${C.primary}`,
                }}
              >
                <p className="text-sm italic" style={{ color: "#cbd5e1" }}>
                  Your explanation shows you understand the importance of
                  keeping both sides balanced. The balance scale metaphor is
                  a powerful way to think about equations!
                </p>
              </div>
            </>
          )}

          {skipped && (
            <p className="mb-4 text-center text-sm" style={{ color: C.textMuted }}>
              Reflection skipped. You can always come back to reflect later!
            </p>
          )}

          {/* Confirmation animation */}
          <EquationCycler />

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
        {/* Header */}
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: "#7c3aed20", color: C.variable }}
        >
          Reflection
        </span>

        {/* Prompt */}
        <p
          className="mb-4 text-lg font-medium leading-relaxed"
          style={{ color: C.textPrimary }}
        >
          {"Imagine your friend tries to solve "}
          <span className="font-mono">x + 5 = 12</span>
          {" by subtracting 5 from ONLY the left side. Explain why that doesn\u2019t work, and what they should do instead."}
        </p>

        {/* Visual hint */}
        <div className="mb-4 flex gap-3">
          <div
            className="flex-1 rounded-lg p-3 text-center"
            style={{ backgroundColor: "#f8717120" }}
          >
            <p className="text-xs font-semibold" style={{ color: C.error }}>
              One side only
            </p>
            <p className="font-mono text-sm" style={{ color: C.error }}>
              {"x \u2260 12 ✗"}
            </p>
          </div>
          <div
            className="flex-1 rounded-lg p-3 text-center"
            style={{ backgroundColor: C.solutionFill }}
          >
            <p className="text-xs font-semibold" style={{ color: C.success }}>
              Both sides
            </p>
            <p className="font-mono text-sm" style={{ color: C.success }}>
              {"x = 7 ✓"}
            </p>
          </div>
        </div>

        {/* Text area */}
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="If you only subtract from one side..."
          className="w-full resize-none rounded-xl p-4 text-base leading-relaxed"
          style={{
            minHeight: 120,
            maxHeight: 240,
            backgroundColor: C.bgPrimary,
            border: `1px solid ${C.borderLight}`,
            color: C.textSecondary,
          }}
          aria-label="Write your reflection explaining why you must apply operations to both sides"
        />

        {/* Character counter */}
        <div className="mt-1 text-right text-xs" style={{ color: meetsMin ? C.success : C.textDim }}>
          {text.length}
          {" / "}
          {minChars}
          {" minimum"}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!meetsMin}
          className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none"
          style={{ backgroundColor: C.primary, minHeight: 52 }}
        >
          Submit Reflection
        </button>

        {/* Skip button */}
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

/** Mini animation: cycles through equations showing inverse operation solutions */
function EquationCycler() {
  const equations = useMemo(
    () => [
      { a: 3, ans: 9 },
      { a: 7, ans: 12 },
      { a: 15, ans: 22 },
      { a: 42, ans: 50 },
      { a: 100, ans: 147 },
    ],
    []
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % equations.length);
    }, 600);
    return () => clearInterval(interval);
  }, [equations.length]);

  const eq = equations[idx]!;
  const x = eq.ans - eq.a;

  return (
    <div
      className="text-center"
      aria-label="The inverse operation method works for any equation. One method, any equation."
    >
      <div className="font-mono text-lg font-bold">
        <span style={{ color: C.variable }}>x</span>
        <span style={{ color: C.textMuted }}>{" + "}</span>
        <span style={{ color: C.operation }}>{eq.a}</span>
        <span style={{ color: C.textMuted }}>{" = "}</span>
        <span style={{ color: C.textPrimary }}>{eq.ans}</span>
        <span style={{ color: C.textMuted }}>{" \u2192 "}</span>
        <motion.span
          key={x}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING}
          style={{
            color: C.solution,
            display: "inline-block",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {"x = "}
          {x}
        </motion.span>
      </div>
      <p className="mt-2 text-sm font-semibold" style={{ color: C.textMuted }}>
        One method. Any equation.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LESSON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function OneStepEquationsLesson({ onComplete }: OneStepEquationsLessonProps) {
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
      {/* Stage progress */}
      <StageProgressDots currentIndex={stageIndex} total={STAGE_ORDER.length} />

      {/* Stage content */}
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
