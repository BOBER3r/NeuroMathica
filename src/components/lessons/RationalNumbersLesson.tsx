"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { cn } from "@/lib/utils/cn";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface RationalNumbersLessonProps {
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
  integer: "#818cf8",     // indigo — integer color
  fraction: "#34d399",    // emerald — fraction color
  decimal: "#fbbf24",     // amber — decimal color
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
  line: "#475569",
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
              ? `2px solid ${C.integer}`
              : "2px solid transparent",
        opacity: disabled && !correct && !wrong ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NUMBER LINE HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const NL_MARGIN = 40;
const NL_WIDTH = 520;
const NL_VB_W = 600;
const NL_VB_H = 120;
const NL_Y = 50;

function valToX(val: number, min: number, max: number): number {
  return NL_MARGIN + ((val - min) / (max - min)) * NL_WIDTH;
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// Number neighborhoods that merge
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/RationalNumbersHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 500));   // boxes appear
    timers.push(setTimeout(() => setPhase(2), 1200));  // numbers pop in
    timers.push(setTimeout(() => setPhase(3), 2800));  // question
    timers.push(setTimeout(() => setPhase(4), 4000));  // walls dissolve
    timers.push(setTimeout(() => setPhase(5), 5000));  // merge on line
    timers.push(setTimeout(() => setPhase(6), 6500));  // collisions
    timers.push(setTimeout(() => setPhase(7), 7500));  // tagline
    timers.push(setTimeout(() => setPhase(8), 8500));  // continue
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 8)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 640 }}
        aria-live="polite"
      >
        <svg
          viewBox="0 0 800 420"
          className="mx-auto w-full"
          style={{ maxWidth: 620 }}
          aria-label="Three neighborhoods of numbers merge onto one number line, showing 0.5 and one-half are the same point."
        >
          <rect width="800" height="420" fill={C.bgPrimary} rx="8" />

          {/* Three boxes */}
          {phase >= 1 && phase < 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Integer box */}
              <rect x={40} y={40} width={220} height={160} rx={12} fill="none" stroke={C.integer} strokeWidth={2} strokeDasharray="6 3" />
              <motion.text x={150} y={30} textAnchor={"middle" as const} fill={C.integer} fontSize={14} fontWeight={700}>
                Integers
              </motion.text>
              {/* Fraction box */}
              <rect x={290} y={40} width={220} height={160} rx={12} fill="none" stroke={C.fraction} strokeWidth={2} strokeDasharray="6 3" />
              <motion.text x={400} y={30} textAnchor={"middle" as const} fill={C.fraction} fontSize={14} fontWeight={700}>
                Fractions
              </motion.text>
              {/* Decimal box */}
              <rect x={540} y={40} width={220} height={160} rx={12} fill="none" stroke={C.decimal} strokeWidth={2} strokeDasharray="6 3" />
              <motion.text x={650} y={30} textAnchor={"middle" as const} fill={C.decimal} fontSize={14} fontWeight={700}>
                Decimals
              </motion.text>
            </motion.g>
          )}

          {/* Numbers in boxes */}
          {phase >= 2 && phase < 5 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Integers */}
              {[
                { v: "-2", x: 90, y: 90 },
                { v: "0", x: 150, y: 130 },
                { v: "1", x: 120, y: 170 },
                { v: "3", x: 200, y: 110 },
              ].map((n) => (
                <motion.text
                  key={`int-${n.v}`}
                  x={n.x}
                  y={n.y}
                  textAnchor={"middle" as const}
                  fill={C.integer}
                  fontSize={22}
                  fontWeight={700}
                  fontFamily="monospace"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  {n.v}
                </motion.text>
              ))}
              {/* Fractions */}
              {[
                { v: "\u00BD", x: 340, y: 100 },
                { v: "\u00BE", x: 420, y: 140 },
                { v: "-\u2153", x: 380, y: 175 },
              ].map((n) => (
                <motion.text
                  key={`frac-${n.v}`}
                  x={n.x}
                  y={n.y}
                  textAnchor={"middle" as const}
                  fill={C.fraction}
                  fontSize={22}
                  fontWeight={700}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  {n.v}
                </motion.text>
              ))}
              {/* Decimals */}
              {[
                { v: "0.5", x: 600, y: 100 },
                { v: "0.75", x: 680, y: 140 },
                { v: "-0.33...", x: 650, y: 175 },
              ].map((n) => (
                <motion.text
                  key={`dec-${n.v}`}
                  x={n.x}
                  y={n.y}
                  textAnchor={"middle" as const}
                  fill={C.decimal}
                  fontSize={20}
                  fontWeight={700}
                  fontFamily="monospace"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  {n.v}
                </motion.text>
              ))}
            </motion.g>
          )}

          {/* Question */}
          {phase >= 3 && phase < 5 && (
            <motion.text
              x={400}
              y={250}
              textAnchor={"middle" as const}
              fill={C.amber}
              fontSize={22}
              fontWeight={700}
              fontStyle="italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Are these really different?
            </motion.text>
          )}

          {/* Merged number line */}
          {phase >= 5 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Number line */}
              <line x1={60} y1={200} x2={740} y2={200} stroke={C.line} strokeWidth={2} />
              {/* Tick marks and labels */}
              {[-3, -2, -1, 0, 1, 2, 3].map((v) => {
                const x = 60 + ((v + 3) / 6) * 680;
                return (
                  <g key={v}>
                    <line x1={x} y1={190} x2={x} y2={210} stroke={C.line} strokeWidth={2} />
                    <text x={x} y={230} textAnchor={"middle" as const} fill={C.textMuted} fontSize={14}>
                      {v}
                    </text>
                  </g>
                );
              })}

              {/* Points showing different notations at same position */}
              {/* 0.5 = 1/2 merge */}
              {phase >= 6 && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  <circle cx={60 + (3.5 / 6) * 680} cy={200} r={8} fill={C.amber} />
                  <text
                    x={60 + (3.5 / 6) * 680}
                    y={175}
                    textAnchor={"middle" as const}
                    fill={C.decimal}
                    fontSize={13}
                    fontWeight={700}
                    fontFamily="monospace"
                  >
                    0.5
                  </text>
                  <text
                    x={60 + (3.5 / 6) * 680}
                    y={260}
                    textAnchor={"middle" as const}
                    fill={C.fraction}
                    fontSize={13}
                    fontWeight={700}
                  >
                    {"\u00BD"}
                  </text>
                </motion.g>
              )}

              {/* 0.75 = 3/4 merge */}
              {phase >= 6 && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...SPRING_POP, delay: 0.3 }}
                >
                  <circle cx={60 + (3.75 / 6) * 680} cy={200} r={8} fill={C.amber} />
                  <text
                    x={60 + (3.75 / 6) * 680}
                    y={175}
                    textAnchor={"middle" as const}
                    fill={C.decimal}
                    fontSize={13}
                    fontWeight={700}
                    fontFamily="monospace"
                  >
                    0.75
                  </text>
                  <text
                    x={60 + (3.75 / 6) * 680}
                    y={260}
                    textAnchor={"middle" as const}
                    fill={C.fraction}
                    fontSize={13}
                    fontWeight={700}
                  >
                    {"\u00BE"}
                  </text>
                </motion.g>
              )}
            </motion.g>
          )}

          {/* Tagline */}
          {phase >= 7 && (
            <motion.text
              x={400}
              y={320}
              textAnchor={"middle" as const}
              fill={C.textMuted}
              fontSize={18}
              fontStyle="italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              One family. One line.
            </motion.text>
          )}
        </svg>

        {phase >= 8 && (
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
// Drag number tokens onto a number line
// ═══════════════════════════════════════════════════════════════════════════

interface NumberToken {
  id: string;
  display: string;
  value: number;
  color: string;
  altLabels: string[];
}

const TOKENS: NumberToken[] = [
  { id: "half", display: "\u00BD", value: 0.5, color: C.fraction, altLabels: ["0.5", "50%"] },
  { id: "075", display: "0.75", value: 0.75, color: C.decimal, altLabels: ["\u00BE", "75%"] },
  { id: "neg1", display: "-1", value: -1, color: C.integer, altLabels: ["-1/1", "-1.0"] },
  { id: "2pt5", display: "2.5", value: 2.5, color: C.decimal, altLabels: ["5/2", "250%"] },
  { id: "neg1pt5", display: "-3/2", value: -1.5, color: C.fraction, altLabels: ["-1.5", "-150%"] },
  { id: "third", display: "0.333...", value: 1 / 3, color: C.decimal, altLabels: ["1/3", "33.3...%"] },
];

const NL_MIN = -3;
const NL_MAX = 3;
const SNAP_TOLERANCE = 0.25;

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [interactions, setInteractions] = useState(0);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const unplaced = useMemo(
    () => TOKENS.filter((t) => !placed.has(t.id)),
    [placed],
  );

  const placedTokens = useMemo(
    () => TOKENS.filter((t) => placed.has(t.id)),
    [placed],
  );

  const lineY = 60;
  const svgW = 600;
  const svgH = 140;
  const margin = 50;
  const lineW = svgW - margin * 2;

  const vToX = useCallback(
    (v: number) => margin + ((v - NL_MIN) / (NL_MAX - NL_MIN)) * lineW,
    [],
  );

  const xToV = useCallback(
    (x: number) => NL_MIN + ((x - margin) / lineW) * (NL_MAX - NL_MIN),
    [],
  );

  const handleDrop = useCallback(
    (tokenId: string, clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const svgX = ((clientX - rect.left) / rect.width) * svgW;
      const svgY = ((clientY - rect.top) / rect.height) * svgH;

      // Check if drop is near the number line
      if (Math.abs(svgY - lineY) > 40) return;

      const droppedValue = xToV(svgX);
      const token = TOKENS.find((t) => t.id === tokenId);
      if (!token) return;

      if (Math.abs(droppedValue - token.value) < SNAP_TOLERANCE) {
        setPlaced((prev) => new Set(prev).add(tokenId));
        setInteractions((n) => n + 1);
      } else {
        // Wrong position — count as interaction anyway
        setInteractions((n) => n + 1);
      }
      setDragging(null);
      setDragPos(null);
    },
    [xToV],
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg" aria-live="polite">
        <h2
          className="mb-4 text-center text-xl font-bold"
          style={{ color: C.textPrimary }}
        >
          Place numbers on the number line
        </h2>

        {/* Number line SVG */}
        <div className="mb-4">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full"
            aria-label="Number line from -3 to 3"
          >
            {/* Main line */}
            <line
              x1={margin}
              y1={lineY}
              x2={svgW - margin}
              y2={lineY}
              stroke={C.line}
              strokeWidth={2}
            />
            {/* Arrows */}
            <polygon
              points={`${margin - 8},${lineY} ${margin},${lineY - 5} ${margin},${lineY + 5}`}
              fill={C.line}
            />
            <polygon
              points={`${svgW - margin + 8},${lineY} ${svgW - margin},${lineY - 5} ${svgW - margin},${lineY + 5}`}
              fill={C.line}
            />

            {/* Tick marks and labels */}
            {[-3, -2, -1, 0, 1, 2, 3].map((v) => {
              const x = vToX(v);
              return (
                <g key={v}>
                  <line x1={x} y1={lineY - 8} x2={x} y2={lineY + 8} stroke={C.line} strokeWidth={1.5} />
                  <text
                    x={x}
                    y={lineY + 24}
                    textAnchor={"middle" as const}
                    fill={C.textMuted}
                    fontSize={12}
                    fontFamily="monospace"
                  >
                    {v}
                  </text>
                </g>
              );
            })}

            {/* Placed tokens */}
            {placedTokens.map((t) => {
              const x = vToX(t.value);
              return (
                <motion.g
                  key={t.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  <circle cx={x} cy={lineY} r={7} fill={t.color} />
                  <text
                    x={x}
                    y={lineY - 16}
                    textAnchor={"middle" as const}
                    fill={t.color}
                    fontSize={11}
                    fontWeight={700}
                    fontFamily="monospace"
                  >
                    {t.display}
                  </text>
                  <text
                    x={x}
                    y={lineY + 42}
                    textAnchor={"middle" as const}
                    fill={C.textDim}
                    fontSize={9}
                    fontFamily="monospace"
                  >
                    {t.altLabels[0]!}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Token tray */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {unplaced.map((token) => (
            <TokenDraggable
              key={token.id}
              token={token}
              onDrop={(cX, cY) => handleDrop(token.id, cX, cY)}
            />
          ))}
        </div>

        {unplaced.length === 0 && (
          <p className="text-center text-sm mb-2" style={{ color: C.success }}>
            All placed! Great work!
          </p>
        )}

        <p className="text-center text-sm mb-4" style={{ color: C.textDim }}>
          Placed: {placed.size}/{TOKENS.length} {"  "}
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

function TokenDraggable({
  token,
  onDrop,
}: {
  token: NumberToken;
  onDrop: (clientX: number, clientY: number) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const bind = useDrag(
    ({ down, movement: [mx, my], last, event, xy: [x, y] }) => {
      event?.preventDefault();
      if (down) {
        setOffset({ x: mx, y: my });
        setIsDragging(true);
      }
      if (last) {
        setOffset({ x: 0, y: 0 });
        setIsDragging(false);
        onDrop(x, y);
      }
    },
    { filterTaps: true },
  );

  return (
    <motion.div
      ref={elRef}
      className="min-h-[44px] min-w-[44px] cursor-grab rounded-lg px-3 py-2 text-center font-mono text-sm font-bold select-none touch-none active:cursor-grabbing"
      style={{
        background: `${token.color}20`,
        color: token.color,
        border: `2px solid ${token.color}60`,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.8 : 1,
      }}
      whileTap={{ scale: 0.95 }}
      {...(bind() as Record<string, unknown>)}
      role="button"
      aria-label={`Drag ${token.display} to the number line`}
    >
      {token.display}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  {
    text: "Look at where \u00BD and 0.5 are on the line. What do you notice?",
    detail: "They\u2019re at the SAME point! \u00BD = 0.5 — different notation, same number.",
    button: "I see it!",
  },
  {
    text: "Every integer is on this line too. Can you write 3 as a fraction?",
    detail: "3 = 3/1. Every integer n = n/1, so every integer is a rational number!",
    button: "I see it!",
  },
  {
    text: "Zoom in between 0 and 1. How many fractions fit there?",
    detail: "Infinitely many! 1/4, 1/3, 1/2, 2/3, 3/4... Between any two rationals, there\u2019s always another one.",
    button: "I see it!",
  },
  {
    text: "Any number you can write as p/q (q \u2260 0) is a RATIONAL number. Integers, fractions, terminating and repeating decimals \u2014 they\u2019re all rational.",
    detail: "Rational numbers = the whole family. One line, one family, many notations.",
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

  // Mini number line for illustration
  const lineW = 400;
  const margin = 30;

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

            {/* Mini number line */}
            <div className="flex justify-center mb-4">
              <svg
                viewBox={`0 0 ${lineW + 20} 80`}
                className="w-full max-w-sm"
                aria-label="Number line illustration"
              >
                <line x1={margin} y1={35} x2={lineW - margin} y2={35} stroke={C.line} strokeWidth={2} />
                {[0, 1, 2, 3].map((v) => {
                  const x = margin + (v / 3) * (lineW - margin * 2);
                  return (
                    <g key={v}>
                      <line x1={x} y1={28} x2={x} y2={42} stroke={C.line} strokeWidth={1.5} />
                      <text x={x} y={60} textAnchor={"middle" as const} fill={C.textMuted} fontSize={12}>
                        {v}
                      </text>
                    </g>
                  );
                })}
                {/* Highlight points based on prompt */}
                {promptIdx === 0 && (
                  <>
                    <motion.circle
                      cx={margin + (0.5 / 3) * (lineW - margin * 2)}
                      cy={35}
                      r={7}
                      fill={C.amber}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <text
                      x={margin + (0.5 / 3) * (lineW - margin * 2) - 15}
                      y={18}
                      textAnchor={"middle" as const}
                      fill={C.fraction}
                      fontSize={11}
                      fontWeight={700}
                    >
                      {"\u00BD"}
                    </text>
                    <text
                      x={margin + (0.5 / 3) * (lineW - margin * 2) + 18}
                      y={18}
                      textAnchor={"middle" as const}
                      fill={C.decimal}
                      fontSize={11}
                      fontWeight={700}
                      fontFamily="monospace"
                    >
                      0.5
                    </text>
                  </>
                )}
                {promptIdx === 1 && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <circle
                      cx={margin + (3 / 3) * (lineW - margin * 2)}
                      cy={35}
                      r={7}
                      fill={C.integer}
                    />
                    <text
                      x={margin + (3 / 3) * (lineW - margin * 2)}
                      y={18}
                      textAnchor={"middle" as const}
                      fill={C.integer}
                      fontSize={12}
                      fontWeight={700}
                      fontFamily="monospace"
                    >
                      3 = 3/1
                    </text>
                  </motion.g>
                )}
                {promptIdx === 2 && (
                  <>
                    {[0.25, 0.333, 0.5, 0.667, 0.75].map((v, i) => (
                      <motion.circle
                        key={v}
                        cx={margin + (v / 3) * (lineW - margin * 2)}
                        cy={35}
                        r={5}
                        fill={C.fraction}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.15, ...SPRING_POP }}
                      />
                    ))}
                  </>
                )}
              </svg>
            </div>

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
  { notation: "p/q where q \u2260 0", color: C.integer, detail: "The definition of a rational number" },
  { notation: "5 = 5/1", color: C.integer, detail: "Every integer is rational (denominator = 1)" },
  { notation: "0.75 = 75/100 = 3/4", color: C.fraction, detail: "Terminating decimals are rational" },
  { notation: "0.333... = 1/3", color: C.decimal, detail: "Repeating decimals are rational too" },
  { notation: "-2 = -2/1 = -4/2", color: C.error, detail: "Negative numbers can be rational" },
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
          className="mb-8 text-xl font-bold"
          style={{ color: C.textPrimary }}
        >
          The Notation
        </h2>

        <div className="space-y-4">
          {SYMBOL_STEPS.map((s, i) =>
            i < step ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-4"
                style={{ background: C.bgSurface, border: `1px solid ${C.border}` }}
              >
                <p className="font-mono text-base font-bold" style={{ color: s.color }}>
                  {s.notation}
                </p>
                <p className="mt-1 text-sm" style={{ color: C.textSecondary }}>
                  {s.detail}
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
            className="mt-8"
          >
            <div
              className="rounded-xl p-4 mb-6"
              style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}40` }}
            >
              <p className="font-mono text-sm font-semibold" style={{ color: C.amber }}>
                Rational Number = p/q where q {"\u2260"} 0
              </p>
              <p className="text-sm mt-1" style={{ color: C.textSecondary }}>
                Integers, terminating decimals, repeating decimals {"\u2014"} all rational.
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
  { title: "Temperature", text: "-3.5\u00B0C \u2014 rational! (-7/2)", color: C.integer },
  { title: "Cooking", text: "Add \u2154 cup flour \u2014 rational!", color: C.fraction },
  { title: "Money", text: "$4.99 = 499/100 \u2014 rational!", color: C.decimal },
  { title: "Sports", text: "Batting .333 = 1/3 \u2014 rational!", color: C.amber },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <h2
          className="mb-6 text-center text-xl font-bold"
          style={{ color: C.textPrimary }}
        >
          Rational Numbers Are Everywhere
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
              <p className="text-sm" style={{ color: C.textSecondary }}>
                {item.text}
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
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

const PROBLEMS: PracticeProblem[] = [
  {
    layer: "Recall",
    prompt: "Which of these is a rational number?",
    options: ["\u03C0 (pi)", "3/7", "\u221A2", "\u221A5"],
    correctIndex: 1,
    feedback: "3/7 is rational because it\u2019s written as p/q. Pi and square roots of non-perfect squares are irrational.",
  },
  {
    layer: "Recall",
    prompt: "Is -4 a rational number?",
    options: ["Yes", "No"],
    correctIndex: 0,
    feedback: "Yes! -4 = -4/1, which is p/q form.",
  },
  {
    layer: "Recall",
    prompt: "0.75 is rational because it can be written as 3/4.",
    options: ["True", "False"],
    correctIndex: 0,
    feedback: "Correct! 0.75 = 75/100 = 3/4, a fraction.",
  },
  {
    layer: "Procedure",
    prompt: "Convert 0.6 to a fraction in simplest form.",
    options: ["6/10", "3/5", "6/100", "1/6"],
    correctIndex: 1,
    feedback: "0.6 = 6/10 = 3/5 after simplifying.",
  },
  {
    layer: "Procedure",
    prompt: "Write 7 as a fraction.",
    options: ["7/0", "1/7", "7/1", "0/7"],
    correctIndex: 2,
    feedback: "7 = 7/1. The denominator is 1, not 0 (division by zero is undefined).",
  },
  {
    layer: "Procedure",
    prompt: "Which decimal equals 1/3?",
    options: ["0.3", "0.33", "0.333...", "0.13"],
    correctIndex: 2,
    feedback: "1/3 = 0.333... (repeating). 0.3 and 0.33 are close but not equal.",
  },
  {
    layer: "Understanding",
    prompt: "Why is every integer also a rational number?",
    options: [
      "Because integers are fractions",
      "Because any integer n = n/1",
      "Because integers are decimals",
      "They\u2019re not",
    ],
    correctIndex: 1,
    feedback: "Any integer n can be written as n/1, which is p/q form with q \u2260 0.",
  },
  {
    layer: "Understanding",
    prompt: "On a number line, 0.5 and \u00BD are:",
    options: ["Different points", "The same point", "Close but not equal", "Only equal sometimes"],
    correctIndex: 1,
    feedback: "0.5 = 5/10 = \u00BD. Same value, same point on the number line.",
  },
  {
    layer: "Understanding",
    prompt: "Is 0.101001000100001... (non-repeating, non-terminating) rational?",
    options: ["Yes", "No"],
    correctIndex: 1,
    feedback: "No! A rational decimal must terminate or repeat. This one has a pattern but does NOT repeat \u2014 it\u2019s irrational.",
  },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const problem = PROBLEMS[qIdx]!;
  const isLast = qIdx >= PROBLEMS.length - 1;

  const handleSelect = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      setIsCorrect(idx === problem.correctIndex);
      setAnswered(true);
    },
    [answered, problem.correctIndex],
  );

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete();
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
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

            <div className="space-y-2">
              {problem.options.map((opt, i) => (
                <McButton
                  key={i}
                  label={opt}
                  selected={selected === i}
                  correct={answered && i === problem.correctIndex}
                  wrong={answered && selected === i && i !== problem.correctIndex}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                />
              ))}
            </div>

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
          Explain in your own words why integers, fractions, and decimals are all part of the same {"\u201C"}family{"\u201D"} of numbers.
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
                Explaining concepts in your own words strengthens your understanding. +15 XP
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

export function RationalNumbersLesson({ onComplete }: RationalNumbersLessonProps) {
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
