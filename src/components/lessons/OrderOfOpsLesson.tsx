"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface OrderOfOpsLessonProps {
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
  paren: "#a78bfa",      // violet — parentheses
  exponent: "#fbbf24",   // amber — exponents
  mulDiv: "#818cf8",     // indigo — multiply/divide
  addSub: "#34d399",     // emerald — add/subtract
  primary: "#8b5cf6",
  primaryHover: "#7c3aed",
  success: "#34d399",
  error: "#f87171",
  amber: "#fbbf24",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
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
      whileTap={disabled ? {} : { scale: 0.97 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

function McButton({
  label,
  selected,
  correct,
  wrong,
  onClick,
  disabled,
}: {
  label: string;
  selected: boolean;
  correct: boolean;
  wrong: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl text-left transition-transform active:scale-[0.97] font-semibold"
      style={{
        minHeight: 52,
        padding: "12px 16px",
        fontSize: 15,
        background: correct
          ? `${C.success}15`
          : wrong
            ? `${C.error}15`
            : C.border,
        color: correct ? C.success : wrong ? C.error : C.textPrimary,
        border: correct
          ? `2px solid ${C.success}`
          : wrong
            ? `2px solid ${C.error}`
            : selected
              ? `2px solid ${C.mulDiv}`
              : "2px solid transparent",
        opacity: disabled && !correct && !wrong ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPRESSION TREE TYPES & HELPERS
// ═══════════════════════════════════════════════════════════════════════════

interface TreeNode {
  id: string;
  label: string;
  isOp: boolean;
  left?: string;
  right?: string;
  x: number;
  y: number;
  depth: number;
}

interface TreeExpression {
  display: string;
  nodes: TreeNode[];
  evalOrder: string[];
  finalResult: number;
}

const NODE_R = 22;

function buildExpressions(): TreeExpression[] {
  return [
    {
      // 3 + 4 * 2 = 11
      display: "3 + 4 \u00d7 2",
      nodes: [
        { id: "plus", label: "+", isOp: true, left: "n3", right: "times", x: 180, y: 50, depth: 1 },
        { id: "n3", label: "3", isOp: false, x: 90, y: 140, depth: 2 },
        { id: "times", label: "\u00d7", isOp: true, left: "n4", right: "n2", x: 270, y: 140, depth: 0 },
        { id: "n4", label: "4", isOp: false, x: 220, y: 220, depth: 2 },
        { id: "n2", label: "2", isOp: false, x: 320, y: 220, depth: 2 },
      ],
      evalOrder: ["times", "plus"],
      finalResult: 11,
    },
    {
      // 8 - 2 + 3 = 9
      display: "8 \u2212 2 + 3",
      nodes: [
        { id: "plus", label: "+", isOp: true, left: "minus", right: "n3", x: 180, y: 50, depth: 1 },
        { id: "minus", label: "\u2212", isOp: true, left: "n8", right: "n2", x: 90, y: 140, depth: 0 },
        { id: "n8", label: "8", isOp: false, x: 40, y: 220, depth: 2 },
        { id: "n2", label: "2", isOp: false, x: 140, y: 220, depth: 2 },
        { id: "n3", label: "3", isOp: false, x: 270, y: 140, depth: 2 },
      ],
      evalOrder: ["minus", "plus"],
      finalResult: 9,
    },
    {
      // 12 / 3 * 2 = 8
      display: "12 \u00f7 3 \u00d7 2",
      nodes: [
        { id: "times", label: "\u00d7", isOp: true, left: "div", right: "n2", x: 180, y: 50, depth: 1 },
        { id: "div", label: "\u00f7", isOp: true, left: "n12", right: "n3", x: 90, y: 140, depth: 0 },
        { id: "n12", label: "12", isOp: false, x: 40, y: 220, depth: 2 },
        { id: "n3", label: "3", isOp: false, x: 140, y: 220, depth: 2 },
        { id: "n2", label: "2", isOp: false, x: 270, y: 140, depth: 2 },
      ],
      evalOrder: ["div", "times"],
      finalResult: 8,
    },
    {
      // (2 + 3) * 4 = 20
      display: "(2 + 3) \u00d7 4",
      nodes: [
        { id: "times", label: "\u00d7", isOp: true, left: "plus", right: "n4", x: 180, y: 50, depth: 1 },
        { id: "plus", label: "+", isOp: true, left: "n2", right: "n3", x: 90, y: 140, depth: 0 },
        { id: "n2", label: "2", isOp: false, x: 40, y: 220, depth: 2 },
        { id: "n3", label: "3", isOp: false, x: 140, y: 220, depth: 2 },
        { id: "n4", label: "4", isOp: false, x: 270, y: 140, depth: 2 },
      ],
      evalOrder: ["plus", "times"],
      finalResult: 20,
    },
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// Two calculators, same expression, different answers
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/OrderOfOpsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 500));
    timers.push(setTimeout(() => setPhase(2), 1500));
    timers.push(setTimeout(() => setPhase(3), 2200));
    timers.push(setTimeout(() => setPhase(4), 3000));
    timers.push(setTimeout(() => setPhase(5), 3800));
    timers.push(setTimeout(() => setPhase(6), 5000));
    timers.push(setTimeout(() => setPhase(7), 6200));
    timers.push(setTimeout(() => setPhase(8), 7200));
    timers.push(setTimeout(() => setPhase(9), 8200));
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
        {/* Main expression */}
        {phase >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-center font-mono font-bold tabular-nums"
            style={{
              color: C.textPrimary,
              fontSize: "clamp(28px, 7vw, 48px)",
              textShadow: `0 0 24px ${C.mulDiv}40`,
            }}
          >
            {"2 + 3 \u00d7 4"}
          </motion.p>
        )}

        {phase >= 2 && phase < 7 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center font-mono text-2xl font-bold"
            style={{ color: C.amber }}
          >
            = ???
          </motion.p>
        )}

        {/* Two calculators */}
        <svg
          viewBox="0 0 700 280"
          className="mx-auto w-full"
          style={{ maxWidth: 560 }}
          aria-label="Two calculators. Left computes 2+3=5, then 5 times 4 = 20. Right computes 3 times 4 = 12, then 2+12 = 14. The right answer is 14."
        >
          <rect width="700" height="280" fill={C.bgPrimary} rx="8" />

          {/* Left calculator */}
          {phase >= 3 && (
            <motion.g
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect x={40} y={20} width={280} height={200} rx={16} fill={C.bgSurface} stroke={C.borderLight} strokeWidth={2} />
              <text x={180} y={55} textAnchor={"middle" as const} fill={C.textMuted} fontSize={13} fontWeight={600}>
                Calculator A
              </text>
              {phase >= 4 && (
                <>
                  <text x={180} y={90} textAnchor={"middle" as const} fill={C.textSecondary} fontSize={14} fontFamily="monospace">
                    {"2 + 3 = 5"}
                  </text>
                  <text x={180} y={115} textAnchor={"middle" as const} fill={C.textSecondary} fontSize={14} fontFamily="monospace">
                    {"5 \u00d7 4 = ..."}
                  </text>
                  <motion.text
                    x={180}
                    y={165}
                    textAnchor={"middle" as const}
                    fill={C.error}
                    fontSize={40}
                    fontWeight={800}
                    fontFamily="monospace"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={SPRING_POP}
                  >
                    20
                  </motion.text>
                </>
              )}
              {phase >= 7 && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  <circle cx={290} cy={30} r={18} fill={C.error} />
                  <text x={290} y={36} textAnchor={"middle" as const} fill="white" fontSize={18} fontWeight={800}>
                    {"\u2717"}
                  </text>
                </motion.g>
              )}
            </motion.g>
          )}

          {/* Right calculator */}
          {phase >= 3 && (
            <motion.g
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <rect x={380} y={20} width={280} height={200} rx={16} fill={C.bgSurface} stroke={C.borderLight} strokeWidth={2} />
              <text x={520} y={55} textAnchor={"middle" as const} fill={C.textMuted} fontSize={13} fontWeight={600}>
                Calculator B
              </text>
              {phase >= 5 && (
                <>
                  <text x={520} y={90} textAnchor={"middle" as const} fill={C.textSecondary} fontSize={14} fontFamily="monospace">
                    {"3 \u00d7 4 = 12"}
                  </text>
                  <text x={520} y={115} textAnchor={"middle" as const} fill={C.textSecondary} fontSize={14} fontFamily="monospace">
                    {"2 + 12 = ..."}
                  </text>
                  <motion.text
                    x={520}
                    y={165}
                    textAnchor={"middle" as const}
                    fill={C.success}
                    fontSize={40}
                    fontWeight={800}
                    fontFamily="monospace"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={SPRING_POP}
                  >
                    14
                  </motion.text>
                </>
              )}
              {phase >= 7 && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  <circle cx={630} cy={30} r={18} fill={C.success} />
                  <text x={630} y={36} textAnchor={"middle" as const} fill="white" fontSize={18} fontWeight={800}>
                    {"\u2713"}
                  </text>
                </motion.g>
              )}
            </motion.g>
          )}

          {/* Who's right? */}
          {phase >= 6 && phase < 7 && (
            <motion.text
              x={350}
              y={255}
              textAnchor={"middle" as const}
              fill={C.amber}
              fontSize={20}
              fontWeight={700}
              fontStyle="italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {"Who\u2019s right?"}
            </motion.text>
          )}

          {/* Tagline */}
          {phase >= 8 && (
            <motion.text
              x={350}
              y={260}
              textAnchor={"middle" as const}
              fill={C.textMuted}
              fontSize={16}
              fontStyle="italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Rules prevent chaos.
            </motion.text>
          )}
        </svg>

        {phase >= 9 && (
          <div className="flex justify-center mt-6">
            <ContinueButton onClick={onComplete} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE
// Interactive expression trees — tap operations in correct order
// ═══════════════════════════════════════════════════════════════════════════

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const expressions = useMemo(() => buildExpressions(), []);
  const [exprIdx, setExprIdx] = useState(0);
  const [evalStep, setEvalStep] = useState(0);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [interactions, setInteractions] = useState(0);

  const expr = expressions[exprIdx]!;
  const currentTarget = expr.evalOrder[evalStep];
  const isExprDone = evalStep >= expr.evalOrder.length;

  const handleNodeTap = useCallback(
    (nodeId: string) => {
      if (isExprDone) return;
      const node = expr.nodes.find((n) => n.id === nodeId);
      if (!node || !node.isOp) return;

      setInteractions((n) => n + 1);

      if (nodeId === currentTarget) {
        setEvalStep((s) => s + 1);
      } else {
        setShakeId(nodeId);
        setTimeout(() => setShakeId(null), 500);
      }
    },
    [isExprDone, currentTarget, expr.nodes],
  );

  const handleNextExpr = useCallback(() => {
    if (exprIdx < expressions.length - 1) {
      setExprIdx((i) => i + 1);
      setEvalStep(0);
      setInteractions((n) => n + 1);
    }
  }, [exprIdx, expressions.length]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg" aria-live="polite">
        <h2
          className="mb-2 text-center text-xl font-bold"
          style={{ color: C.textPrimary }}
        >
          Tap operations in the correct order!
        </h2>

        <p
          className="mb-4 text-center font-mono text-2xl font-bold tabular-nums"
          style={{ color: C.textSecondary }}
        >
          {expr.display}
        </p>

        <div className="flex justify-center mb-4">
          <svg
            viewBox="0 0 360 260"
            className="w-full max-w-sm"
            aria-label={`Expression tree for ${expr.display}. Tap operations from deepest to shallowest.`}
          >
            {/* Draw edges */}
            {expr.nodes.map((node) => {
              if (!node.left && !node.right) return null;
              return (
                <g key={`edges-${node.id}`}>
                  {node.left && (() => {
                    const child = expr.nodes.find((n) => n.id === node.left);
                    if (!child) return null;
                    return (
                      <line
                        x1={node.x}
                        y1={node.y + NODE_R}
                        x2={child.x}
                        y2={child.y - NODE_R}
                        stroke={C.borderLight}
                        strokeWidth={2}
                      />
                    );
                  })()}
                  {node.right && (() => {
                    const child = expr.nodes.find((n) => n.id === node.right);
                    if (!child) return null;
                    return (
                      <line
                        x1={node.x}
                        y1={node.y + NODE_R}
                        x2={child.x}
                        y2={child.y - NODE_R}
                        stroke={C.borderLight}
                        strokeWidth={2}
                      />
                    );
                  })()}
                </g>
              );
            })}

            {/* Draw nodes */}
            {expr.nodes.map((node) => {
              const evalIdx = expr.evalOrder.indexOf(node.id);
              const isDone = evalIdx >= 0 && evalIdx < evalStep;
              const isCurrent = node.id === currentTarget;
              const isShaking = node.id === shakeId;

              let fillColor: string = C.bgSurface;
              let strokeColor: string = C.borderLight;
              let textColor: string = C.textPrimary;

              if (isDone) {
                fillColor = `${C.success}30`;
                strokeColor = C.success;
                textColor = C.success;
              } else if (isCurrent && !isExprDone) {
                strokeColor = C.amber;
              }

              return (
                <motion.g
                  key={node.id}
                  animate={
                    isShaking
                      ? { x: [0, -6, 6, -4, 4, 0] }
                      : {}
                  }
                  transition={isShaking ? { duration: 0.4 } : {}}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_R}
                    fill={fillColor}
                    stroke={isShaking ? C.error : strokeColor}
                    strokeWidth={2}
                    style={{ cursor: node.isOp && !isDone ? "pointer" : "default" }}
                    onClick={() => handleNodeTap(node.id)}
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor={"middle" as const}
                    dominantBaseline="central"
                    fill={isShaking ? C.error : textColor}
                    fontSize={node.isOp ? 20 : 16}
                    fontWeight={700}
                    fontFamily="monospace"
                    style={{ pointerEvents: "none" }}
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        <p className="text-center text-sm mb-2" style={{ color: C.textDim }}>
          Step: {Math.min(evalStep + 1, expr.evalOrder.length)}/{expr.evalOrder.length}
        </p>

        {isExprDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p className="font-mono text-lg font-bold" style={{ color: C.success }}>
              {expr.display} = {expr.finalResult}
            </p>
            {exprIdx < expressions.length - 1 && (
              <button
                onClick={handleNextExpr}
                className="mt-3 min-h-[44px] min-w-[44px] rounded-lg px-4 py-2 text-sm font-semibold active:scale-95"
                style={{ background: C.border, color: C.textPrimary }}
              >
                New Expression
              </button>
            )}
          </motion.div>
        )}

        <p className="text-center text-sm mb-4" style={{ color: C.textDim }}>
          Interactions: {Math.min(interactions, 8)}/8
        </p>

        {interactions >= 8 && (
          <div className="flex justify-center">
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

const DISCOVERY_PROMPTS = [
  {
    text: "Notice which operation is DEEPEST in the tree. That one happens first!",
    detail: "The tree shows priority as depth \u2014 deeper operations evaluate before shallower ones.",
    button: "I see it!",
  },
  {
    text: "What about 12 \u00f7 3 \u00d7 2? Division and multiplication are at the SAME level. When tied, go left to right.",
    detail: "12 \u00f7 3 = 4 first (it\u2019s leftmost), then 4 \u00d7 2 = 8. NOT 12 \u00f7 6 = 2!",
    button: "I see it!",
  },
  {
    text: "Parentheses are like an elevator \u2014 they push an operation DOWN to the deepest level, so it goes first.",
    detail: "(2 + 3) \u00d7 4: the parentheses force + to happen before \u00d7. Without them, \u00d7 would go first.",
    button: "I see it!",
  },
  {
    text: "The order is: Parentheses, Exponents, Multiply/Divide (left-to-right), Add/Subtract (left-to-right). This is PEMDAS.",
    detail: "P \u2192 E \u2192 MD \u2192 AS. Remember: M and D are the SAME level. A and S are the SAME level.",
    button: "Got it!",
  },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const prompt = DISCOVERY_PROMPTS[promptIdx]!;
  const isLast = promptIdx >= DISCOVERY_PROMPTS.length - 1;

  const handleAck = useCallback(() => {
    setShowDetail(false);
    if (isLast) {
      onComplete();
    } else {
      setPromptIdx((i) => i + 1);
    }
  }, [isLast, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className="mb-6 text-lg font-semibold"
              style={{ color: C.textPrimary, fontSize: "clamp(16px, 4vw, 20px)" }}
            >
              {prompt.text}
            </p>

            {/* PEMDAS tower for prompt 4 */}
            {promptIdx === 3 && (
              <div className="flex justify-center mb-6">
                <div className="space-y-2">
                  {[
                    { label: "P \u2014 Parentheses ( )", color: C.paren },
                    { label: "E \u2014 Exponents", color: C.exponent },
                    { label: "MD \u2014 Multiply / Divide", color: C.mulDiv },
                    { label: "AS \u2014 Add / Subtract", color: C.addSub },
                  ].map((level, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="rounded-lg px-4 py-2 text-left font-mono text-sm font-bold"
                      style={{
                        background: `${level.color}20`,
                        color: level.color,
                        border: `1px solid ${level.color}40`,
                      }}
                    >
                      {level.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!showDetail && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setShowDetail(true)}
                className="mx-auto mb-4 block min-h-[44px] rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: C.border, color: C.amber }}
              >
                Reveal insight
              </motion.button>
            )}

            {showDetail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-6 text-base" style={{ color: C.amber }}>
                  {prompt.detail}
                </p>
                <ContinueButton onClick={handleAck} label={prompt.button} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOL_STEPS = [
  { label: "P \u2014 Parentheses ( )", color: C.paren, example: "(2 + 3) = 5 first" },
  { label: "E \u2014 Exponents", color: C.exponent, example: "4\u00B2 = 16" },
  { label: "M/D \u2014 Multiply & Divide (left \u2192 right)", color: C.mulDiv, example: "3 \u00d7 16 = 48" },
  { label: "A/S \u2014 Add & Subtract (left \u2192 right)", color: C.addSub, example: "2 + 48 = 50" },
] as const;

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < SYMBOL_STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <h2
          className="mb-4 text-xl font-bold"
          style={{ color: C.textPrimary }}
        >
          PEMDAS
        </h2>

        <p
          className="mb-6 font-mono text-lg font-bold tabular-nums"
          style={{ color: C.textSecondary }}
        >
          {"2 + 3 \u00d7 4\u00B2"}
        </p>

        <div className="space-y-3">
          {SYMBOL_STEPS.map((s, i) =>
            i < step ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl p-3 text-left"
                style={{
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}40`,
                }}
              >
                <p className="font-mono text-sm font-bold" style={{ color: s.color }}>
                  {s.label}
                </p>
                <p className="font-mono text-xs mt-1 tabular-nums" style={{ color: C.textSecondary }}>
                  {s.example}
                </p>
              </motion.div>
            ) : null,
          )}
        </div>

        {step >= SYMBOL_STEPS.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div
              className="rounded-xl p-4 mb-6"
              style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}40` }}
            >
              <p className="font-mono text-sm font-semibold" style={{ color: C.amber }}>
                {"2 + 3 \u00d7 4\u00B2 = 2 + 3 \u00d7 16 = 2 + 48 = 50"}
              </p>
            </div>
            <ContinueButton onClick={onComplete} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL WORLD ANCHOR
// ═══════════════════════════════════════════════════════════════════════════

const REAL_WORLD = [
  { title: "Shopping", text: "2 shirts at $15 + $5 shipping", math: "2 \u00d7 15 + 5 = $35, not $40", color: C.mulDiv },
  { title: "Recipes", text: "Double a recipe: 2 \u00d7 (3+4) cups", math: "Parentheses change the meaning!", color: C.paren },
  { title: "Gaming", text: "Score: base 100 + 3 \u00d7 bonus 50", math: "100 + 150 = 250, not 7500", color: C.addSub },
  { title: "Coding", text: "Every programming language", math: "Computers follow these EXACT rules", color: C.exponent },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <h2
          className="mb-6 text-center text-xl font-bold"
          style={{ color: C.textPrimary }}
        >
          Order of Operations Is Everywhere
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {REAL_WORLD.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.3 }}
              className="rounded-xl p-4"
              style={{ background: C.bgSurface, border: `1px solid ${C.border}` }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: item.color }}>
                {item.title}
              </p>
              <p className="text-sm mb-2" style={{ color: C.textSecondary }}>
                {item.text}
              </p>
              <p className="font-mono text-xs tabular-nums" style={{ color: C.amber }}>
                {item.math}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <ContinueButton onClick={onComplete} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE
// ═══════════════════════════════════════════════════════════════════════════

interface PracticeProblem {
  layer: string;
  type: "mc" | "numeric";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctNumeric?: number;
  feedback: string;
}

const PROBLEMS: PracticeProblem[] = [
  {
    layer: "Recall",
    type: "mc",
    prompt: "In PEMDAS, what does the \u2018E\u2019 stand for?",
    options: ["Equals", "Exponents", "Equations", "Everything"],
    correctIndex: 1,
    feedback: "E = Exponents. They come after Parentheses and before Multiply/Divide.",
  },
  {
    layer: "Recall",
    type: "mc",
    prompt: "Are multiplication and division at the same priority level?",
    options: [
      "Yes, left-to-right",
      "No, multiply first",
      "No, divide first",
      "Depends on the problem",
    ],
    correctIndex: 0,
    feedback: "Yes! M and D are at the same level. When both appear, go left to right.",
  },
  {
    layer: "Recall",
    type: "mc",
    prompt: "What operation do you do FIRST in: 5 + (3 \u2212 1) \u00d7 2?",
    options: ["5 + 3", "3 \u2212 1", "1 \u00d7 2", "5 + 3 \u2212 1"],
    correctIndex: 1,
    feedback: "Parentheses first! (3\u22121) = 2, then 2\u00d72 = 4, then 5+4 = 9.",
  },
  {
    layer: "Procedure",
    type: "mc",
    prompt: "Evaluate: 8 \u2212 2 + 3",
    options: ["3", "9", "7", "13"],
    correctIndex: 1,
    feedback: "Left to right: 8\u22122 = 6, then 6+3 = 9. Addition and subtraction are the same level!",
  },
  {
    layer: "Procedure",
    type: "numeric",
    prompt: "Evaluate: 4 + 3 \u00d7 2",
    correctNumeric: 10,
    feedback: "3\u00d72 = 6 first (multiply before add), then 4+6 = 10.",
  },
  {
    layer: "Procedure",
    type: "mc",
    prompt: "Evaluate: (5 + 1) \u00d7 3 \u2212 2",
    options: ["16", "14", "18", "12"],
    correctIndex: 0,
    feedback: "(5+1) = 6, then 6\u00d73 = 18, then 18\u22122 = 16.",
  },
  {
    layer: "Understanding",
    type: "mc",
    prompt: "Why does 2 + 3 \u00d7 4 equal 14, not 20?",
    options: [
      "Because 2 is small",
      "Because multiply happens before add",
      "Because you start with the bigger number",
      "It depends on the calculator",
    ],
    correctIndex: 1,
    feedback: "Multiplication has higher priority than addition. 3\u00d74 = 12 first, then 2+12 = 14.",
  },
  {
    layer: "Understanding",
    type: "mc",
    prompt: "12 \u00f7 4 \u00d7 3 equals:",
    options: ["1", "9", "12", "36"],
    correctIndex: 1,
    feedback: "Same level \u2014 go left to right: 12\u00f74 = 3, then 3\u00d73 = 9.",
  },
  {
    layer: "Understanding",
    type: "mc",
    prompt: "How can you make 2 + 3 \u00d7 4 equal 20?",
    options: [
      "It\u2019s impossible",
      "Write (2 + 3) \u00d7 4",
      "Write 2 + (3 \u00d7 4)",
      "Write 2 + 3 + 4 \u00d7 1",
    ],
    correctIndex: 1,
    feedback: "Parentheses override the default order: (2+3) = 5, then 5\u00d74 = 20.",
  },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [numInput, setNumInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const problem = PROBLEMS[qIdx]!;
  const isLast = qIdx >= PROBLEMS.length - 1;

  const handleMcSelect = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      setIsCorrect(idx === problem.correctIndex);
      setAnswered(true);
    },
    [answered, problem.correctIndex],
  );

  const handleNumericSubmit = useCallback(() => {
    if (answered) return;
    const val = parseFloat(numInput);
    if (isNaN(val)) return;
    const correct =
      problem.correctNumeric !== undefined &&
      Math.abs(val - problem.correctNumeric) < 0.01;
    setIsCorrect(correct);
    setAnswered(true);
  }, [answered, numInput, problem.correctNumeric]);

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete();
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
      setNumInput("");
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [isLast, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.textDim }}>
            {problem.layer}
          </span>
          <span className="font-mono text-xs tabular-nums" style={{ color: C.textDim }}>
            {qIdx + 1}/{PROBLEMS.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mb-5 text-base font-semibold" style={{ color: C.textPrimary }}>
              {problem.prompt}
            </p>

            {problem.type === "mc" && problem.options && (
              <div className="space-y-2">
                {problem.options.map((opt, i) => (
                  <McButton
                    key={i}
                    label={opt}
                    selected={selected === i}
                    correct={answered && i === problem.correctIndex}
                    wrong={answered && selected === i && i !== problem.correctIndex}
                    onClick={() => handleMcSelect(i)}
                    disabled={answered}
                  />
                ))}
              </div>
            )}

            {problem.type === "numeric" && (
              <div className="flex gap-2">
                <input
                  type="number"
                  step="1"
                  value={numInput}
                  onChange={(e) => setNumInput(e.target.value)}
                  disabled={answered}
                  className="flex-1 rounded-xl px-4 py-3 font-mono text-base tabular-nums min-h-[48px]"
                  style={{
                    background: C.border,
                    color: C.textPrimary,
                    border: answered
                      ? `2px solid ${isCorrect ? C.success : C.error}`
                      : `2px solid transparent`,
                  }}
                  aria-label="Your answer"
                />
                {!answered && (
                  <button
                    onClick={handleNumericSubmit}
                    className="min-h-[48px] min-w-[48px] rounded-xl px-4 font-semibold text-white active:scale-95"
                    style={{ background: C.primary }}
                  >
                    Check
                  </button>
                )}
              </div>
            )}

            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 rounded-xl p-4"
                style={{
                  background: isCorrect ? `${C.success}15` : `${C.error}15`,
                  border: `1px solid ${isCorrect ? C.success : C.error}40`,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: isCorrect ? C.success : C.error }}>
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                <p className="text-sm mt-1" style={{ color: C.textSecondary }}>
                  {problem.feedback}
                </p>
              </motion.div>
            )}

            {answered && (
              <div className="flex justify-center mt-5">
                <ContinueButton
                  onClick={handleNext}
                  label={isLast ? "Finish Practice" : "Next \u2192"}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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

  const handleSubmit = useCallback(() => {
    if (text.length >= 20) setSubmitted(true);
  }, [text]);

  const handleSkip = useCallback(() => {
    setSubmitted(true);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <h2 className="mb-4 text-xl font-bold" style={{ color: C.textPrimary }}>
          Reflect
        </h2>
        <p className="mb-6 text-base" style={{ color: C.textSecondary }}>
          Explain in your own words why we need an agreed-upon order of operations. What would happen without it?
        </p>

        {!submitted ? (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl p-4 text-sm min-h-[100px] resize-none"
              style={{
                background: C.bgSurface,
                color: C.textPrimary,
                border: `1px solid ${C.border}`,
              }}
              placeholder="Type your explanation here..."
              aria-label="Your reflection"
            />
            <p className="mt-1 text-xs" style={{ color: C.textDim }}>
              {text.length < 20
                ? `${20 - text.length} more characters needed`
                : "Ready to submit!"}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={handleSkip}
                className="min-h-[44px] rounded-lg px-4 py-2 text-sm"
                style={{ color: C.textDim }}
              >
                Skip
              </button>
              <ContinueButton
                onClick={handleSubmit}
                label="Submit"
                disabled={text.length < 20}
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
          >
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${C.success}15`, border: `1px solid ${C.success}40` }}
            >
              <p className="text-base font-semibold" style={{ color: C.success }}>
                Great thinking!
              </p>
              <p className="text-sm mt-2" style={{ color: C.textSecondary }}>
                Without agreed rules, the same expression could give different answers. Your explanation shows you understand why order matters! +15 XP
              </p>
            </div>
            <ContinueButton onClick={onComplete} label="Complete Lesson" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LESSON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function OrderOfOpsLesson({ onComplete }: OrderOfOpsLessonProps) {
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
