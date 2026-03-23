"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ───────────────────────────── constants ───────────────────────────── */

const COLORS = {
  positive: "#10b981",
  positiveBorder: "#059669",
  negative: "#f43f5e",
  negativeBorder: "#e11d48",
  zero: "#fbbf24",
  primary: "#818cf8",
  primaryDark: "#6366f1",
  surface: "rgba(15,23,42,0.85)",
  surfaceBlur: "rgba(15,23,42,0.7)",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  line: "#94a3b8",
  tick: "#64748b",
  label: "#cbd5e1",
  patternConnector: "#475569",
  arrowRight: "#10b981",
  arrowLeft: "#f43f5e",
} as const;

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };
const SPRING_GENTLE = { type: "spring" as const, damping: 25, stiffness: 200 };
const FADE = { duration: 0.3, ease: "easeOut" as const };

type NLSStage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

interface IntegerMultDivLessonProps {
  onComplete?: () => void;
}

/* ════════════════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ════════════════════════════════════════════════════════════════════════ */

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function signColor(n: number): string {
  return n > 0 ? COLORS.positive : n < 0 ? COLORS.negative : COLORS.zero;
}

/* ════════════════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ════════════════════════════════════════════════════════════════════════ */

/* ───── Continue Button ───── */

interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

function ContinueButton({ onClick, label = "Continue", disabled = false }: ContinueButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-h-[48px] min-w-[200px] rounded-xl px-6 py-3 text-base font-semibold text-white",
        "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
        "hover:brightness-110 active:scale-[0.98] active:brightness-95",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3aed]",
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING_GENTLE}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

/* ───── Section Container ───── */

function StageContainer({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      {title && (
        <h2
          className="mb-4 text-sm font-medium uppercase tracking-widest"
          style={{ color: COLORS.textMuted }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

/* ───── Equation Display ───── */

interface EquationDisplayProps {
  parts: Array<{ text: string; color?: string }>;
  subtitle?: string;
  className?: string;
}

function EquationDisplay({ parts, subtitle, className }: EquationDisplayProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg px-4 py-3",
        "backdrop-blur-md",
        className,
      )}
      style={{ background: COLORS.surfaceBlur }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={FADE}
    >
      <div className="inline-flex items-center gap-1 font-mono text-xl font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
        {parts.map((p, i) => (
          <span key={i} style={{ color: p.color ?? COLORS.textSecondary }}>
            {p.text}
          </span>
        ))}
      </div>
      {subtitle && (
        <span className="text-sm italic" style={{ color: COLORS.textMuted }}>
          {subtitle}
        </span>
      )}
    </motion.div>
  );
}

/* ───── SVG Number Line (for multiplication) ───── */

interface JumpArcData {
  from: number;
  to: number;
  jumpIndex: number;
  direction: "right" | "left";
}

interface NumberLineSVGProps {
  rangeMin: number;
  rangeMax: number;
  width: number;
  height: number;
  lineY?: number;
  arcs?: JumpArcData[];
  landingDots?: Array<{ pos: number; color: string }>;
  trail?: { from: number; to: number; direction: "right" | "left" } | null;
  zeroCrossing?: boolean;
  arrowDirection?: "right" | "left" | null;
  arrowPos?: number;
  children?: ReactNode;
}

function NumberLineSVG({
  rangeMin,
  rangeMax,
  width,
  height,
  lineY: lineYProp,
  arcs = [],
  landingDots = [],
  trail = null,
  zeroCrossing = false,
  arrowDirection = null,
  arrowPos = 0,
  children,
}: NumberLineSVGProps) {
  const padding = 30;
  const lineY = lineYProp ?? height * 0.55;
  const span = rangeMax - rangeMin;
  const unitWidth = (width - padding * 2) / span;

  const toX = (v: number) => padding + (v - rangeMin) * unitWidth;

  const ticks: number[] = [];
  for (let v = rangeMin; v <= rangeMax; v++) {
    ticks.push(v);
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      className="select-none"
      role="figure"
      aria-label={`Interactive number line from ${rangeMin} to ${rangeMax} for multiplication`}
    >
      {/* Positive/Negative region tints */}
      {rangeMin < 0 && (
        <rect
          x={toX(rangeMin)}
          y={lineY - 50}
          width={toX(Math.min(0, rangeMax)) - toX(rangeMin)}
          height={100}
          fill="rgba(244,63,94,0.04)"
        />
      )}
      {rangeMax > 0 && (
        <rect
          x={toX(Math.max(0, rangeMin))}
          y={lineY - 50}
          width={toX(rangeMax) - toX(Math.max(0, rangeMin))}
          height={100}
          fill="rgba(16,185,129,0.04)"
        />
      )}

      {/* Main line */}
      <line
        x1={toX(rangeMin)}
        y1={lineY}
        x2={toX(rangeMax)}
        y2={lineY}
        stroke={COLORS.line}
        strokeWidth={2}
      />

      {/* Line arrowheads */}
      <polygon
        points={`${toX(rangeMin)},${lineY} ${toX(rangeMin) + 8},${lineY - 4} ${toX(rangeMin) + 8},${lineY + 4}`}
        fill={COLORS.line}
      />
      <polygon
        points={`${toX(rangeMax)},${lineY} ${toX(rangeMax) - 8},${lineY - 4} ${toX(rangeMax) - 8},${lineY + 4}`}
        fill={COLORS.line}
      />

      {/* Ticks & labels */}
      {ticks.map((v) => {
        const x = toX(v);
        const isZero = v === 0;
        const tickH = isZero ? 14 : 10;
        return (
          <g key={v}>
            <line
              x1={x}
              y1={lineY - tickH / 2}
              x2={x}
              y2={lineY + tickH / 2}
              stroke={isZero ? COLORS.zero : COLORS.tick}
              strokeWidth={isZero ? 2 : 1}
            />
            <text
              x={x}
              y={lineY + tickH / 2 + 14}
              textAnchor={"middle" as const}
              fill={isZero ? COLORS.zero : COLORS.label}
              fontSize={isZero ? 13 : 11}
              fontWeight={isZero ? 700 : 400}
              fontFamily="system-ui, sans-serif"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {v}
            </text>
          </g>
        );
      })}

      {/* Trail highlight */}
      {trail && (
        <line
          x1={toX(trail.from)}
          y1={lineY}
          x2={toX(trail.to)}
          y2={lineY}
          stroke={trail.direction === "right" ? COLORS.positive : COLORS.negative}
          strokeWidth={4}
          opacity={0.5}
          strokeLinecap="round"
        />
      )}

      {/* Jump arcs */}
      {arcs.map((arc, i) => {
        const x1 = toX(arc.from);
        const x2 = toX(arc.to);
        const above = arc.direction === "right";
        const cy = above ? lineY - unitWidth * 2 : lineY + unitWidth * 2;
        const mx = (x1 + x2) / 2;
        const color = arc.direction === "right" ? COLORS.positive : COLORS.negative;
        return (
          <g key={`arc-${i}`}>
            <path
              d={`M ${x1} ${lineY} Q ${mx} ${cy} ${x2} ${lineY}`}
              fill="none"
              stroke={color}
              strokeWidth={2}
              opacity={0.8}
            />
            <text
              x={mx}
              y={above ? cy + 6 : cy - 2}
              textAnchor={"middle" as const}
              fill={color}
              fontSize={9}
              fontWeight={600}
              fontFamily="system-ui, sans-serif"
            >
              {arc.jumpIndex}
            </text>
          </g>
        );
      })}

      {/* Landing dots */}
      {landingDots.map((dot, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={toX(dot.pos)}
          cy={lineY}
          r={3}
          fill={dot.color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.2 }}
        />
      ))}

      {/* Zero crossing flash */}
      {zeroCrossing && (
        <motion.circle
          cx={toX(0)}
          cy={lineY}
          r={0}
          fill={COLORS.zero}
          opacity={0.4}
          animate={{ r: [0, unitWidth * 1.5, unitWidth * 2], opacity: [0.4, 0.2, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Direction arrow */}
      {arrowDirection && (
        <g>
          <polygon
            points={
              arrowDirection === "right"
                ? `${toX(arrowPos) - 20},${lineY - 35} ${toX(arrowPos) + 20},${lineY - 30} ${toX(arrowPos) - 20},${lineY - 25}`
                : `${toX(arrowPos) + 20},${lineY - 35} ${toX(arrowPos) - 20},${lineY - 30} ${toX(arrowPos) + 20},${lineY - 25}`
            }
            fill={arrowDirection === "right" ? COLORS.arrowRight : COLORS.arrowLeft}
            stroke={arrowDirection === "right" ? COLORS.positiveBorder : COLORS.negativeBorder}
            strokeWidth={1.5}
          />
        </g>
      )}

      {children}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK
   ════════════════════════════════════════════════════════════════════════ */

interface PatternRow {
  left: string;
  result: string | null;
  resultColor: string;
  isQuestion: boolean;
}

const HOOK_PATTERN: PatternRow[] = [
  { left: "3 \u00D7 3", result: "9", resultColor: COLORS.positive, isQuestion: false },
  { left: "3 \u00D7 2", result: "6", resultColor: COLORS.positive, isQuestion: false },
  { left: "3 \u00D7 1", result: "3", resultColor: COLORS.positive, isQuestion: false },
  { left: "3 \u00D7 0", result: "0", resultColor: COLORS.zero, isQuestion: false },
  { left: "3 \u00D7 (\u22121)", result: "\u22123", resultColor: COLORS.negative, isQuestion: true },
  { left: "3 \u00D7 (\u22122)", result: "\u22126", resultColor: COLORS.negative, isQuestion: true },
];

interface HookStageProps {
  onComplete: () => void;
}

function HookStage({ onComplete }: HookStageProps) {
  return <VideoHook src="/videos/IntegerMultDivHook.webm" onComplete={onComplete} />;

  const [visibleRows, setVisibleRows] = useState(0);
  const [showDiffLabels, setShowDiffLabels] = useState(false);
  const [patternText, setPatternText] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState(0);
  const [finalText, setFinalText] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const run = async () => {
      // Title
      await delay(1500);
      setTitleVisible(false);
      await delay(300);

      // Show first 4 rows (known values)
      for (let i = 0; i < 4; i++) {
        setVisibleRows(i + 1);
        await delay(1000);
      }

      // Show pattern labels
      await delay(500);
      setShowDiffLabels(true);
      setPatternText("Each answer drops by 3...");
      await delay(1500);

      // Show question row 1: 3 x (-1) = ?
      setVisibleRows(5);
      setPatternText("If the pattern continues...");
      await delay(2000);
      setPatternText("...what HAS to come next?");
      await delay(2000);

      // Reveal answer: -3
      setRevealedAnswers(1);
      await delay(1500);

      // Show question row 2: 3 x (-2) = ?
      setVisibleRows(6);
      await delay(1500);

      // Reveal answer: -6
      setRevealedAnswers(2);
      await delay(1000);

      // Final text
      setPatternText(null);
      setFinalText("The pattern DEMANDS it.");
      await delay(2000);

      setQuestionText("But WHY? And what about (\u22123) \u00D7 (\u22122)?");
      await delay(2000);

      setShowContinue(true);
    };

    void run();
    // Failsafe: guarantee Continue button within 4s
    const failsafe = setTimeout(() => setShowContinue(true), 4000);
    return () => clearTimeout(failsafe);
  }, []);

  return (
    <StageContainer>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        {/* Title */}
        <AnimatePresence>
          {titleVisible && (
            <motion.h1
              className="text-center font-light"
              style={{ color: COLORS.textSecondary, fontSize: "clamp(24px, 6vw, 40px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={FADE}
            >
              A Pattern...
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Pattern rows */}
        <div className="flex flex-col items-center gap-2">
          {HOOK_PATTERN.slice(0, visibleRows).map((row, i) => {
            const isQuestionRow = row.isQuestion;
            const isRevealed =
              !isQuestionRow ||
              (i === 4 && revealedAnswers >= 1) ||
              (i === 5 && revealedAnswers >= 2);

            return (
              <motion.div
                key={i}
                className="flex items-center gap-3 font-mono text-lg"
                style={{ minHeight: 44 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={FADE}
              >
                <span style={{ color: COLORS.textSecondary, minWidth: 120, textAlign: "right" }}>
                  {row.left}
                </span>
                <span style={{ color: COLORS.textMuted }}>=</span>
                {isRevealed ? (
                  <motion.span
                    style={{ color: row.resultColor, fontWeight: 700, minWidth: 40, textAlign: "left" }}
                    initial={isQuestionRow ? { scale: 1.15 } : undefined}
                    animate={{ scale: 1 }}
                    transition={SPRING}
                  >
                    {row.result}
                  </motion.span>
                ) : (
                  <motion.span
                    style={{ color: COLORS.zero, fontWeight: 700, minWidth: 40, textAlign: "left" }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ?
                  </motion.span>
                )}

                {/* Diff labels */}
                {showDiffLabels && i < visibleRows - 1 && i < 5 && (
                  <motion.span
                    className="text-xs"
                    style={{ color: COLORS.textMuted, marginLeft: 8 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {"\u22123"}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Pattern text */}
        <AnimatePresence mode="wait">
          {patternText && (
            <motion.p
              key={patternText}
              className="text-center text-sm italic"
              style={{ color: COLORS.textMuted }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={FADE}
            >
              {patternText}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Final text */}
        {finalText && (
          <motion.p
            className="text-center text-lg font-bold"
            style={{ color: COLORS.zero }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {finalText}
          </motion.p>
        )}

        {/* Question text */}
        {questionText && (
          <motion.p
            className="text-center text-base font-medium"
            style={{ color: COLORS.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {questionText}
          </motion.p>
        )}

        {/* Continue */}
        {showContinue && <ContinueButton onClick={onComplete} />}
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE (Repeated Jumps Number Line)
   ════════════════════════════════════════════════════════════════════════ */

interface SpatialStageProps {
  onComplete: () => void;
}

function SpatialStage({ onComplete }: SpatialStageProps) {
  const [multiplierMag, setMultiplierMag] = useState(3);
  const [multiplierSign, setMultiplierSign] = useState<"positive" | "negative">("positive");
  const [multiplicandMag, setMultiplicandMag] = useState(2);
  const [multiplicandSign, setMultiplicandSign] = useState<"positive" | "negative">("positive");

  const [arcs, setArcs] = useState<JumpArcData[]>([]);
  const [landingDots, setLandingDots] = useState<Array<{ pos: number; color: string }>>([]);
  const [trail, setTrail] = useState<{ from: number; to: number; direction: "right" | "left" } | null>(null);
  const [zeroCrossing, setZeroCrossing] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [reversalBadge, setReversalBadge] = useState<string | null>(null);
  const [interactions, setInteractions] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const triedCombos = useRef(new Set<string>());

  const multiplier = multiplierSign === "positive" ? multiplierMag : -multiplierMag;
  const multiplicand = multiplicandSign === "positive" ? multiplicandMag : -multiplicandMag;
  const product = multiplier * multiplicand;

  const computeDirection = useCallback((mult: number, mcand: number): "right" | "left" => {
    const resultSign = Math.sign(mult * mcand);
    return resultSign >= 0 ? "right" : "left";
  }, []);

  const direction = computeDirection(multiplier, multiplicand);

  const handleJump = useCallback(async () => {
    if (isJumping) return;
    setIsJumping(true);
    setArcs([]);
    setLandingDots([]);
    setTrail(null);
    setResult(null);
    setReversalBadge(null);

    // Show reversal badge if multiplier is negative
    if (multiplierSign === "negative") {
      if (multiplicandSign === "negative") {
        setReversalBadge("DOUBLE REVERSAL!");
      } else {
        setReversalBadge("REVERSED!");
      }
      await delay(1200);
      setReversalBadge(null);
    }

    const dir = direction;
    const jumpSize = multiplicandMag;
    const jumpCount = multiplierMag;
    const newArcs: JumpArcData[] = [];
    const newDots: Array<{ pos: number; color: string }> = [];
    const dotColor = dir === "right" ? COLORS.positive : COLORS.negative;

    for (let i = 0; i < jumpCount; i++) {
      const from = dir === "right" ? jumpSize * i : -(jumpSize * i);
      const to = dir === "right" ? jumpSize * (i + 1) : -(jumpSize * (i + 1));

      newArcs.push({ from, to, jumpIndex: i + 1, direction: dir });
      newDots.push({ pos: to, color: dotColor });

      setArcs([...newArcs]);
      setLandingDots([...newDots]);

      // Zero crossing check
      if ((from < 0 && to >= 0) || (from > 0 && to <= 0) || (from >= 0 && to < 0) || (from <= 0 && to > 0)) {
        setZeroCrossing(true);
        setTimeout(() => setZeroCrossing(false), 600);
      }

      await delay(400);
    }

    const finalPos = dir === "right" ? jumpSize * jumpCount : -(jumpSize * jumpCount);
    setTrail({ from: 0, to: finalPos, direction: dir });
    setResult(product);
    setIsJumping(false);

    // Track interaction
    const comboKey = `${multiplierSign}-${multiplicandSign}`;
    triedCombos.current.add(comboKey);
    setInteractions((prev) => {
      const next = prev + 1;
      if (next >= 10) {
        setShowContinue(true);
      }
      return next;
    });
  }, [isJumping, multiplierSign, multiplicandSign, multiplierMag, multiplicandMag, direction, product]);

  const handleReset = useCallback(() => {
    setArcs([]);
    setLandingDots([]);
    setTrail(null);
    setResult(null);
    setZeroCrossing(false);
    setReversalBadge(null);
  }, []);

  const rangeVal = multiplicandMag * multiplierMag;
  const rangeMin = -rangeVal - 3;
  const rangeMax = rangeVal + 3;

  const equationParts: Array<{ text: string; color?: string }> = [
    { text: `${multiplier}`, color: signColor(multiplier) },
    { text: " \u00D7 ", color: COLORS.textMuted },
    { text: `(${multiplicand})`, color: signColor(multiplicand) },
    { text: " = " },
    result !== null
      ? { text: `${result}`, color: signColor(result) }
      : { text: "?", color: COLORS.textMuted },
  ];

  const subtitle = multiplierSign === "negative"
    ? `${multiplierMag} jumps of ${multiplicandMag}, then REVERSE`
    : `${multiplierMag} jumps of ${multiplicandSign === "negative" ? `-${multiplicandMag}` : `${multiplicandMag}`}`;

  return (
    <StageContainer title="Explore: Repeated Jumps">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Equation display */}
        <EquationDisplay parts={equationParts} subtitle={subtitle} />

        {/* Number line */}
        <div className="relative w-full" style={{ height: 180 }}>
          <NumberLineSVG
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            width={600}
            height={180}
            arcs={arcs}
            landingDots={landingDots}
            trail={trail}
            zeroCrossing={zeroCrossing}
            arrowDirection={direction}
            arrowPos={0}
          />
          {/* Reversal badge */}
          <AnimatePresence>
            {reversalBadge && (
              <motion.div
                className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold"
                style={{ color: COLORS.zero, background: "rgba(251,191,36,0.15)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={SPRING}
              >
                {reversalBadge}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex w-full max-w-md flex-col gap-4">
          {/* Multiplier */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs" style={{ color: COLORS.textMuted }}>Multiplier</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMultiplierMag((v) => clamp(v - 1, 1, 9))}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border text-lg font-bold text-white"
                  style={{ background: "#334155", borderColor: COLORS.patternConnector }}
                  aria-label="Decrease multiplier magnitude"
                >
                  {"\u2212"}
                </button>
                <span
                  className="w-12 text-center text-2xl font-bold"
                  style={{ color: COLORS.textPrimary, fontVariantNumeric: "tabular-nums" }}
                  role="spinbutton"
                  aria-valuemin={1}
                  aria-valuemax={9}
                  aria-valuenow={multiplierMag}
                  aria-label="Number of jumps (multiplier magnitude)"
                >
                  {multiplierMag}
                </span>
                <button
                  onClick={() => setMultiplierMag((v) => clamp(v + 1, 1, 9))}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border text-lg font-bold text-white"
                  style={{ background: "#334155", borderColor: COLORS.patternConnector }}
                  aria-label="Increase multiplier magnitude"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xs" style={{ color: COLORS.textMuted }}>Multiplier sign</span>
              <button
                onClick={() => {
                  setMultiplierSign((s) => (s === "positive" ? "negative" : "positive"));
                  handleReset();
                }}
                className="flex min-h-[44px] w-[110px] items-center justify-center rounded-full text-sm font-semibold text-white transition-colors"
                style={{
                  background: multiplierSign === "positive" ? COLORS.positive : COLORS.negative,
                }}
                role="switch"
                aria-checked={multiplierSign === "positive"}
                aria-label={`Multiplier sign. Currently ${multiplierSign}`}
              >
                {multiplierSign === "positive" ? "+ POSITIVE" : "\u2212 NEGATIVE"}
              </button>
            </div>
          </div>

          {/* Multiplicand */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs" style={{ color: COLORS.textMuted }}>Multiplicand</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMultiplicandMag((v) => clamp(v - 1, 1, 9))}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border text-lg font-bold text-white"
                  style={{ background: "#334155", borderColor: COLORS.patternConnector }}
                  aria-label="Decrease multiplicand magnitude"
                >
                  {"\u2212"}
                </button>
                <span
                  className="w-12 text-center text-2xl font-bold"
                  style={{ color: COLORS.textPrimary, fontVariantNumeric: "tabular-nums" }}
                  role="spinbutton"
                  aria-valuemin={1}
                  aria-valuemax={9}
                  aria-valuenow={multiplicandMag}
                  aria-label="Jump size (multiplicand magnitude)"
                >
                  {multiplicandMag}
                </span>
                <button
                  onClick={() => setMultiplicandMag((v) => clamp(v + 1, 1, 9))}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border text-lg font-bold text-white"
                  style={{ background: "#334155", borderColor: COLORS.patternConnector }}
                  aria-label="Increase multiplicand magnitude"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xs" style={{ color: COLORS.textMuted }}>Multiplicand sign</span>
              <button
                onClick={() => {
                  setMultiplicandSign((s) => (s === "positive" ? "negative" : "positive"));
                  handleReset();
                }}
                className="flex min-h-[44px] w-[110px] items-center justify-center rounded-full text-sm font-semibold text-white transition-colors"
                style={{
                  background: multiplicandSign === "positive" ? COLORS.positive : COLORS.negative,
                }}
                role="switch"
                aria-checked={multiplicandSign === "positive"}
                aria-label={`Multiplicand sign. Currently ${multiplicandSign}`}
              >
                {multiplicandSign === "positive" ? "+ POSITIVE" : "\u2212 NEGATIVE"}
              </button>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => void handleJump()}
            disabled={isJumping}
            className={cn(
              "flex min-h-[48px] min-w-[160px] items-center justify-center gap-2 rounded-xl text-base font-semibold text-white",
              "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
              "hover:brightness-110 active:scale-[0.98]",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
            aria-label={`Perform ${multiplierMag} jumps of ${multiplicandMag}. ${multiplier} times ${multiplicand} equals ${product}`}
          >
            {isJumping ? (
              <span className="animate-spin text-sm">{"\u25CE"}</span>
            ) : (
              "\u00BB"
            )}{" "}
            JUMP
          </button>
          <button
            onClick={handleReset}
            className={cn(
              "flex min-h-[48px] min-w-[120px] items-center justify-center gap-2 rounded-xl text-base font-semibold",
              "border border-white/20",
            )}
            style={{ color: COLORS.textMuted }}
            aria-label="Reset number line and clear all jumps"
          >
            {"\u00AB"} RESET
          </button>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-6 rounded-full"
                style={{
                  background: i < interactions ? COLORS.positive : "#334155",
                }}
                animate={
                  i === interactions - 1 && interactions > 0
                    ? { scale: [1, 1.3, 1] }
                    : {}
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            Interactions: {Math.min(interactions, 10)} / 10
          </p>
        </div>

        {showContinue && (
          <div className="mt-2">
            <ContinueButton onClick={onComplete} />
          </div>
        )}
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY
   ════════════════════════════════════════════════════════════════════════ */

interface DiscoveryStageProps {
  onComplete: () => void;
}

interface DiscoveryStep {
  kind: "jump" | "mc" | "mc-chain" | "division-grid";
  challenge: string;
  /** For "jump" type */
  multiplier?: number;
  multiplicand?: number;
  /** For "mc" type */
  options?: number[];
  correctAnswer?: number;
  /** For "mc-chain": multiple sub-questions */
  subQuestions?: Array<{
    label: string;
    options: number[];
    correct: number;
  }>;
  successText?: string;
  ruleCard?: string;
}

const DISCOVERY_STEPS: DiscoveryStep[] = [
  {
    kind: "jump",
    challenge: "Let\u2019s start with what you know. Press JUMP to see 4 jumps of 3.",
    multiplier: 4,
    multiplicand: 3,
    successText: "Four jumps of 3, all to the right. Multiplication IS repeated jumping.",
  },
  {
    kind: "mc",
    challenge: "The multiplier goes 3, 2, 1, 0... Each result drops by 3. So what is 3 \u00D7 (\u22121)?",
    options: [-3, -1, 3, -6],
    correctAnswer: -3,
    successText: "The pattern continues! One jump reversed lands at \u22123.",
  },
  {
    kind: "mc",
    challenge: "And 3 \u00D7 (\u22122)? The pattern should tell you.",
    options: [-6, -9, -3, 6],
    correctAnswer: -6,
    successText: "Positive \u00D7 Negative = Negative. The jumps go LEFT.",
    ruleCard: "Positive \u00D7 Negative = Negative",
  },
  {
    kind: "mc-chain",
    challenge: "Now the mind-bender. As the multiplier counts down from 3 with multiplicand \u22122, the results go \u22126, \u22124, \u22122, 0... each INCREASES by 2. Continue the pattern.",
    subQuestions: [
      { label: "(\u22121) \u00D7 (\u22122) = ?", options: [2, -2, 0, -4], correct: 2 },
      { label: "(\u22122) \u00D7 (\u22122) = ?", options: [4, -4, 2, -2], correct: 4 },
      { label: "(\u22123) \u00D7 (\u22122) = ?", options: [6, -6, -3, 3], correct: 6 },
    ],
    successText: "Two negatives: one sets direction LEFT, the other REVERSES to RIGHT. Two reversals = POSITIVE!",
    ruleCard: "Negative \u00D7 Negative = Positive",
  },
  {
    kind: "mc",
    challenge: "If (\u22123) \u00D7 (\u22122) = 6, what is 6 \u00F7 (\u22122)?",
    options: [-3, 3, -2, 2],
    correctAnswer: -3,
    successText: "Division undoes multiplication. Same sign rules: different signs = negative result.",
  },
  {
    kind: "division-grid",
    challenge: "Division follows the exact same sign rules as multiplication.",
    successText: "Same signs = positive. Different signs = negative.",
  },
];

function DiscoveryStage({ onComplete }: DiscoveryStageProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [jumpCompleted, setJumpCompleted] = useState(false);

  // For mc-chain
  const [chainIdx, setChainIdx] = useState(0);
  const [chainAnswers, setChainAnswers] = useState<number[]>([]);

  const step = DISCOVERY_STEPS[stepIdx];

  const resetStepState = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback(null);
    setShowSuccess(false);
    setJumpCompleted(false);
    setChainIdx(0);
    setChainAnswers([]);
  }, []);

  const handleNext = useCallback(() => {
    if (stepIdx >= DISCOVERY_STEPS.length - 1) {
      onComplete();
    } else {
      resetStepState();
      setStepIdx((i) => i + 1);
    }
  }, [stepIdx, onComplete, resetStepState]);

  const handleMCSelect = useCallback((value: number) => {
    if (feedback !== null) return;
    setSelectedAnswer(value);
  }, [feedback]);

  const handleMCSubmit = useCallback(() => {
    if (!step || selectedAnswer === null) return;
    if (selectedAnswer === step.correctAnswer) {
      setFeedback("correct");
      setShowSuccess(true);
    } else {
      setFeedback("incorrect");
      // Auto-show correct after delay
      setTimeout(() => {
        setSelectedAnswer(step.correctAnswer ?? 0);
        setFeedback("correct");
        setShowSuccess(true);
      }, 2000);
    }
  }, [step, selectedAnswer]);

  const handleChainSelect = useCallback((value: number) => {
    if (!step?.subQuestions) return;
    const sub = step.subQuestions[chainIdx];
    if (!sub) return;

    if (value === sub.correct) {
      const newAnswers = [...chainAnswers, value];
      setChainAnswers(newAnswers);
      if (chainIdx >= step.subQuestions.length - 1) {
        setShowSuccess(true);
      } else {
        setChainIdx((i) => i + 1);
      }
    }
  }, [step, chainIdx, chainAnswers]);

  if (!step) return null;

  return (
    <StageContainer title="Guided Discovery">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Progress */}
        <div className="flex gap-1">
          {DISCOVERY_STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-8 rounded-full"
              style={{
                background: i < stepIdx ? COLORS.positive : i === stepIdx ? COLORS.primary : "#334155",
              }}
            />
          ))}
        </div>

        {/* Challenge */}
        <motion.p
          className="max-w-md text-center text-base font-medium"
          style={{ color: COLORS.textPrimary }}
          key={stepIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FADE}
        >
          {step.challenge}
        </motion.p>

        {/* JUMP type */}
        {step.kind === "jump" && (
          <>
            <div className="relative w-full" style={{ height: 160 }}>
              {(() => {
                const mult = step.multiplier;
                const mcand = step.multiplicand;
                if (jumpCompleted && mult != null && mcand != null) {
                  return (
                    <NumberLineSVG
                      rangeMin={-15}
                      rangeMax={20}
                      width={600}
                      height={160}
                      arcs={Array.from({ length: mult }).map((_, i) => ({
                        from: mcand * i,
                        to: mcand * (i + 1),
                        jumpIndex: i + 1,
                        direction: "right" as const,
                      }))}
                      landingDots={Array.from({ length: mult }).map((_, i) => ({
                        pos: mcand * (i + 1),
                        color: COLORS.positive,
                      }))}
                      trail={{ from: 0, to: mult * mcand, direction: "right" }}
                      arrowDirection="right"
                      arrowPos={0}
                    />
                  );
                }
                return (
                  <NumberLineSVG
                    rangeMin={-15}
                    rangeMax={20}
                    width={600}
                    height={160}
                    arrowDirection="right"
                    arrowPos={0}
                  />
                );
              })()}
            </div>
            {!jumpCompleted && (
              <button
                onClick={() => {
                  setJumpCompleted(true);
                  setShowSuccess(true);
                }}
                className={cn(
                  "flex min-h-[48px] min-w-[160px] items-center justify-center gap-2 rounded-xl text-base font-semibold text-white",
                  "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
                  "hover:brightness-110 active:scale-[0.98]",
                )}
                aria-label="Perform 4 jumps of 3"
              >
                {"\u00BB"} JUMP
              </button>
            )}
            {jumpCompleted && step.multiplier != null && step.multiplicand != null && (
              <EquationDisplay
                parts={[
                  { text: `${step.multiplier}`, color: COLORS.positive },
                  { text: " \u00D7 " },
                  { text: `${step.multiplicand}`, color: COLORS.positive },
                  { text: " = " },
                  { text: `${step.multiplier * step.multiplicand}`, color: COLORS.positive },
                ]}
              />
            )}
          </>
        )}

        {/* MC type */}
        {step.kind === "mc" && !showSuccess && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {step.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleMCSelect(opt)}
                  className={cn(
                    "flex min-h-[48px] min-w-[64px] items-center justify-center rounded-lg text-lg font-bold transition-all",
                    selectedAnswer === opt
                      ? "ring-2 ring-[#818cf8]"
                      : "opacity-80 hover:opacity-100",
                  )}
                  style={{
                    background: selectedAnswer === opt ? "#312e81" : "#1e293b",
                    border: `1.5px solid ${selectedAnswer === opt ? COLORS.primary : COLORS.patternConnector}`,
                    color: COLORS.textSecondary,
                  }}
                  disabled={feedback !== null}
                  aria-label={`Answer: ${opt}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && feedback === null && (
              <button
                onClick={handleMCSubmit}
                className="min-h-[44px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] px-5 text-sm font-semibold text-white"
              >
                Check
              </button>
            )}
            {feedback === "incorrect" && (
              <motion.p
                className="text-sm font-semibold"
                style={{ color: COLORS.negative }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Not quite. Look at the pattern...
              </motion.p>
            )}
          </div>
        )}

        {/* MC-Chain type */}
        {step.kind === "mc-chain" && !showSuccess && step.subQuestions && (
          <div className="flex w-full max-w-md flex-col items-center gap-3">
            {/* Show completed sub-answers */}
            {chainAnswers.map((ans, i) => {
              const sub = step.subQuestions?.[i];
              if (!sub) return null;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 font-mono text-base"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span style={{ color: COLORS.textSecondary }}>{sub.label.replace("?", "")}</span>
                  <span style={{ color: COLORS.positive, fontWeight: 700 }}>{ans}</span>
                </motion.div>
              );
            })}

            {/* Current sub-question */}
            {(() => {
              const currentSub = step.subQuestions[chainIdx];
              if (!currentSub) return null;
              return (
                <motion.div
                  key={chainIdx}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-mono text-base font-semibold" style={{ color: COLORS.textPrimary }}>
                    {currentSub.label}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {currentSub.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleChainSelect(opt)}
                        className="flex min-h-[48px] min-w-[64px] items-center justify-center rounded-lg text-lg font-bold transition-all"
                        style={{
                          background: "#1e293b",
                          border: `1.5px solid ${COLORS.patternConnector}`,
                          color: COLORS.textSecondary,
                        }}
                        aria-label={`Answer: ${opt}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}

        {/* Division grid */}
        {step.kind === "division-grid" && !showSuccess && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { eq: "6 \u00F7 (\u22122) = \u22123", label: "different = negative", color: COLORS.negative },
              { eq: "(\u22126) \u00F7 (\u22122) = 3", label: "same = positive", color: COLORS.positive },
              { eq: "6 \u00F7 (\u22123) = \u22122", label: "different = negative", color: COLORS.negative },
              { eq: "(\u22126) \u00F7 2 = \u22123", label: "different = negative", color: COLORS.negative },
            ].map((cell, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1 rounded-xl p-3"
                style={{ background: COLORS.surface, border: `1px solid ${cell.color}30` }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: COLORS.textPrimary }}>
                  {cell.eq}
                </span>
                <span className="text-xs" style={{ color: cell.color }}>
                  {cell.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Success text & rule card */}
        {showSuccess && (
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
          >
            <p className="max-w-md text-center text-sm font-medium" style={{ color: COLORS.textSecondary }}>
              {step.successText}
            </p>
            {step.ruleCard && (
              <motion.div
                className="rounded-lg px-4 py-2"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: `1px solid ${COLORS.positive}40`,
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: [0, 1, 1, 0.8, 1], scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-sm font-bold" style={{ color: COLORS.positive }}>
                  {step.ruleCard}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Division grid "Got it" button */}
        {step.kind === "division-grid" && !showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => setShowSuccess(true)}
              className="min-h-[44px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] px-5 text-sm font-semibold text-white"
            >
              Got it!
            </button>
          </motion.div>
        )}

        {/* Next button */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ContinueButton
              onClick={handleNext}
              label={stepIdx >= DISCOVERY_STEPS.length - 1 ? "Continue" : "Next"}
            />
          </motion.div>
        )}
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE
   ════════════════════════════════════════════════════════════════════════ */

interface SymbolRule {
  expression: string;
  subtitle: string;
  example: string;
  direction: "right" | "left";
  reversed: boolean;
  accentColor: string;
  bracketLabel: string;
}

const SYMBOL_RULES: SymbolRule[] = [
  {
    expression: "(+) \u00D7 (+) = (+)",
    subtitle: "Same direction. Jumps go RIGHT.",
    example: "3 \u00D7 2 = 6",
    direction: "right",
    reversed: false,
    accentColor: COLORS.positive,
    bracketLabel: "same sign",
  },
  {
    expression: "(+) \u00D7 (\u2212) = (\u2212)",
    subtitle: "Jump direction is LEFT (negative multiplicand).",
    example: "3 \u00D7 (\u22122) = \u22126",
    direction: "left",
    reversed: false,
    accentColor: COLORS.negative,
    bracketLabel: "different signs",
  },
  {
    expression: "(\u2212) \u00D7 (+) = (\u2212)",
    subtitle: "Jumps go RIGHT, then REVERSE to LEFT.",
    example: "(\u22123) \u00D7 2 = \u22126",
    direction: "left",
    reversed: true,
    accentColor: COLORS.negative,
    bracketLabel: "different signs",
  },
  {
    expression: "(\u2212) \u00D7 (\u2212) = (+)",
    subtitle: "Two reversals = original direction = POSITIVE!",
    example: "(\u22123) \u00D7 (\u22122) = 6",
    direction: "right",
    reversed: true,
    accentColor: COLORS.positive,
    bracketLabel: "same sign (both negative)",
  },
];

interface SymbolBridgeStageProps {
  onComplete: () => void;
}

function SymbolBridgeStage({ onComplete }: SymbolBridgeStageProps) {
  const [ruleIdx, setRuleIdx] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const rule = SYMBOL_RULES[ruleIdx];
  const isLast = ruleIdx >= SYMBOL_RULES.length - 1;

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowCard(true);
    } else {
      setRuleIdx((i) => i + 1);
    }
  }, [isLast]);

  // Summary card
  if (showCard) {
    return (
      <StageContainer title="Symbol Bridge">
        <motion.div
          className="flex w-full max-w-md flex-col gap-3 rounded-xl p-5"
          style={{ background: COLORS.surface, border: "1px solid rgba(255,255,255,0.1)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SPRING_GENTLE}
        >
          <h3 className="text-center text-sm font-bold uppercase tracking-wide" style={{ color: COLORS.textPrimary }}>
            Integer Multiplication & Division
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <div
              className="flex items-center gap-2 rounded-lg border-l-[3px] py-1 pl-3"
              style={{ borderColor: COLORS.positive, color: COLORS.textSecondary }}
            >
              <span className="font-mono font-bold" style={{ color: COLORS.positive }}>SAME SIGNS</span>
              <span>{"\u2192"} POSITIVE (+)</span>
            </div>
            <div className="pl-6 text-xs" style={{ color: COLORS.textMuted }}>
              (+) {"\u00D7"} (+) or ({"\u2212"}) {"\u00D7"} ({"\u2212"})
            </div>
            <div
              className="flex items-center gap-2 rounded-lg border-l-[3px] py-1 pl-3"
              style={{ borderColor: COLORS.negative, color: COLORS.textSecondary }}
            >
              <span className="font-mono font-bold" style={{ color: COLORS.negative }}>DIFFERENT SIGNS</span>
              <span>{"\u2192"} NEGATIVE ({"\u2212"})</span>
            </div>
            <div className="pl-6 text-xs" style={{ color: COLORS.textMuted }}>
              (+) {"\u00D7"} ({"\u2212"}) or ({"\u2212"}) {"\u00D7"} (+)
            </div>
            <div className="mt-2 border-t border-white/10 pt-2 text-xs" style={{ color: COLORS.textMuted }}>
              Same rules for division: (+) {"\u00F7"} (+) = (+) &nbsp; ({"\u2212"}) {"\u00F7"} ({"\u2212"}) = (+)
            </div>
            <div className="text-center text-xs font-medium" style={{ color: COLORS.zero }}>
              WHY: Negative = REVERSE direction. Two reverses = original direction.
            </div>
          </div>
        </motion.div>
        <div className="mt-4">
          <ContinueButton onClick={onComplete} />
        </div>
      </StageContainer>
    );
  }

  if (!rule) return null;

  return (
    <StageContainer title="Symbol Bridge">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Progress dots */}
        <div className="flex gap-2">
          {SYMBOL_RULES.map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ background: i <= ruleIdx ? COLORS.primary : "#334155" }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={ruleIdx}
            className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={FADE}
          >
            {/* Left: Rule expression */}
            <div className="flex flex-col items-center gap-2 md:w-2/5">
              <span className="font-mono text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
                {rule.expression}
              </span>
              <motion.span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ color: rule.accentColor, background: `${rule.accentColor}18` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {rule.bracketLabel}
              </motion.span>
              <p className="text-center text-sm" style={{ color: COLORS.textMuted }}>
                {rule.subtitle}
              </p>
              <motion.p
                className="font-mono text-base font-bold"
                style={{ color: rule.accentColor }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {rule.example}
              </motion.p>
            </div>

            {/* Right: Mini animation */}
            <div className="md:w-3/5" style={{ height: 140 }}>
              <NumberLineSVG
                rangeMin={-8}
                rangeMax={8}
                width={400}
                height={140}
                lineY={80}
                arrowDirection={rule.direction}
                arrowPos={0}
                arcs={Array.from({ length: 3 }).map((_, i) => ({
                  from: rule.direction === "right" ? 2 * i : -(2 * i),
                  to: rule.direction === "right" ? 2 * (i + 1) : -(2 * (i + 1)),
                  jumpIndex: i + 1,
                  direction: rule.direction,
                }))}
                trail={{
                  from: 0,
                  to: rule.direction === "right" ? 6 : -6,
                  direction: rule.direction,
                }}
                landingDots={Array.from({ length: 3 }).map((_, i) => ({
                  pos: rule.direction === "right" ? 2 * (i + 1) : -(2 * (i + 1)),
                  color: rule.accentColor,
                }))}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <ContinueButton
          onClick={handleNext}
          label={isLast ? "See Rule Card" : "Next Rule"}
        />
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 5 — REAL-WORLD ANCHOR
   ════════════════════════════════════════════════════════════════════════ */

interface RealWorldScenario {
  icon: string;
  title: string;
  description: string;
  equation: string;
  connection: string;
}

const RW_SCENARIOS: RealWorldScenario[] = [
  {
    icon: "\u23EA",
    title: "Video Rewind",
    description: "You watch someone walking BACKWARD at 2 m/s. You hit REWIND (\u22123x speed). In the rewind, the person walks FORWARD!",
    equation: "(\u22123) \u00D7 (\u22122) = 6 m/s forward",
    connection: "Rewinding a backward walk looks like walking FORWARD. Negative \u00D7 negative = positive.",
  },
  {
    icon: "$",
    title: "Debt Removal",
    description: "You have 4 debts of $50 each (\u2212$50 each). Your aunt REMOVES (subtracts) all 4 debts.",
    equation: "(\u22124) \u00D7 (\u221250) = +$200",
    connection: "Removing debts (negative \u00D7 negative) INCREASES your balance. Taking away something bad is something GOOD!",
  },
  {
    icon: "\uD83C\uDF21\uFE0F",
    title: "Temperature Rate",
    description: "Temperature drops 3 degrees every hour (\u22123 deg/hr). What was the temperature 5 hours AGO (\u22125 hours)?",
    equation: "(\u22125 hr) \u00D7 (\u22123 deg/hr) = +15 deg",
    connection: "Going BACK in time on a DROPPING temperature means it was WARMER. Negative \u00D7 negative = positive.",
  },
];

interface RealWorldStageProps {
  onComplete: () => void;
}

function RealWorldStage({ onComplete }: RealWorldStageProps) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenario = RW_SCENARIOS[scenarioIdx];
  const isLast = scenarioIdx >= RW_SCENARIOS.length - 1;

  return (
    <StageContainer title="Real-World Anchor">
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        {/* Navigation dots */}
        <div className="flex gap-2">
          {RW_SCENARIOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setScenarioIdx(i)}
              className="h-3 w-3 rounded-full transition-colors"
              style={{
                background: i === scenarioIdx ? COLORS.primary : "#334155",
              }}
              aria-label={`Scenario ${i + 1}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {scenario && (
            <motion.div
              key={scenarioIdx}
              className="flex w-full flex-col items-center gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={FADE}
            >
              {/* Card */}
              <div
                className="w-full rounded-xl p-5"
                style={{ background: COLORS.surface, border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="mb-2 text-2xl">{scenario.icon}</div>
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: COLORS.textMuted }}>
                  {scenario.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
                  {scenario.description}
                </p>
              </div>

              {/* Equation */}
              <p className="font-mono text-base font-bold" style={{ color: COLORS.positive }}>
                {scenario.equation}
              </p>

              {/* Connection */}
              <p className="text-center text-sm italic" style={{ color: COLORS.textMuted }}>
                {scenario.connection}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          {!isLast ? (
            <ContinueButton onClick={() => setScenarioIdx((i) => i + 1)} label="Next Scenario" />
          ) : (
            <ContinueButton onClick={onComplete} />
          )}
        </div>
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE
   ════════════════════════════════════════════════════════════════════════ */

type PracticeType =
  | "sign-rule"
  | "multiple-choice"
  | "numeric-input"
  | "chain"
  | "word-problem"
  | "true-false";

interface SignSubQuestion {
  expr: string;
  correct: "positive" | "negative";
}

interface TFSubQuestion {
  statement: string;
  correct: boolean;
  explanation: string;
}

interface PracticeProblem {
  id: string;
  type: PracticeType;
  layer: number;
  prompt: string;
  options?: number[];
  correctAnswer?: number;
  signQuestions?: SignSubQuestion[];
  tfQuestions?: TFSubQuestion[];
  chainSteps?: Array<{ label: string; answer: number }>;
  correctFeedback: string;
  incorrectFeedback: string;
  xp: number;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  // R1: Sign Rule Quick-Fire
  {
    id: "R1",
    type: "sign-rule",
    layer: 0,
    prompt: "What is the SIGN of each result? (Don\u2019t calculate the number \u2014 just the sign!)",
    signQuestions: [
      { expr: "5 \u00D7 (\u22123)", correct: "negative" },
      { expr: "(\u22124) \u00D7 (\u22127)", correct: "positive" },
      { expr: "(\u22126) \u00D7 2", correct: "negative" },
      { expr: "8 \u00D7 3", correct: "positive" },
    ],
    correctFeedback: "Perfect! Same signs = positive, different signs = negative.",
    incorrectFeedback: "Look at the signs: same signs = positive, different signs = negative.",
    xp: 11,
  },
  // R2: Basic Multiplication
  {
    id: "R2",
    type: "multiple-choice",
    layer: 0,
    prompt: "Solve: (\u22124) \u00D7 3",
    options: [-12, 12, -7, -1],
    correctAnswer: -12,
    correctFeedback: "Different signs (negative \u00D7 positive) = negative. 4 \u00D7 3 = 12, so \u221212.",
    incorrectFeedback: "Different signs = negative result. 4 \u00D7 3 = 12, so the answer is \u221212.",
    xp: 5,
  },
  // P1: Negative x Negative
  {
    id: "P1",
    type: "numeric-input",
    layer: 1,
    prompt: "Solve: (\u22127) \u00D7 (\u22124)",
    correctAnswer: 28,
    correctFeedback: "Same signs (both negative) = positive. 7 \u00D7 4 = 28.",
    incorrectFeedback: "Both numbers are negative (same signs) = positive result. 7 \u00D7 4 = 28.",
    xp: 8,
  },
  // R3: Basic Division
  {
    id: "R3",
    type: "multiple-choice",
    layer: 0,
    prompt: "Solve: (\u221218) \u00F7 3",
    options: [-6, 6, -15, -3],
    correctAnswer: -6,
    correctFeedback: "Different signs: negative \u00F7 positive = negative. 18 \u00F7 3 = 6, so \u22126.",
    incorrectFeedback: "Same sign rules as multiplication! Different signs = negative.",
    xp: 5,
  },
  // P2: Division neg/neg
  {
    id: "P2",
    type: "numeric-input",
    layer: 1,
    prompt: "Solve: (\u221224) \u00F7 (\u22126)",
    correctAnswer: 4,
    correctFeedback: "Same signs = positive. 24 \u00F7 6 = 4.",
    incorrectFeedback: "Both negative = same signs = positive. 24 \u00F7 6 = ?",
    xp: 8,
  },
  // U1: Best argument MC
  {
    id: "U1",
    type: "multiple-choice",
    layer: 2,
    prompt: "A classmate says \u2018negative \u00D7 negative should be negative.\u2019 Which argument BEST shows why this is wrong?",
    options: [1, 2, 3, 4],
    correctAnswer: 2,
    correctFeedback: "The pattern argument is the most compelling: extending 3\u00D72, 3\u00D71, 3\u00D70 past zero forces the sign rules into existence.",
    incorrectFeedback: "The strongest argument uses the descending pattern to show the rules are mathematically inevitable.",
    xp: 10,
  },
  // P3: Chain
  {
    id: "P3",
    type: "chain",
    layer: 1,
    prompt: "Evaluate step by step: (\u22122) \u00D7 5 \u00D7 (\u22123)",
    chainSteps: [
      { label: "Step 1: (\u22122) \u00D7 5 = ?", answer: -10 },
      { label: "Step 2: (\u221210) \u00D7 (\u22123) = ?", answer: 30 },
    ],
    correctAnswer: 30,
    correctFeedback: "The first step gives negative, but multiplying by another negative FLIPS it back to positive!",
    incorrectFeedback: "Break it down: first (\u22122) \u00D7 5 = \u221210, then (\u221210) \u00D7 (\u22123) = 30.",
    xp: 10,
  },
  // P4: Word Problem
  {
    id: "P4",
    type: "multiple-choice",
    layer: 1,
    prompt: "A scuba diver descends 8 meters per minute. She dives for 6 minutes. How far below the surface is she? Express as an integer.",
    options: [-48, 48, -14, -2],
    correctAnswer: -48,
    correctFeedback: "Descending is negative: (\u22128) \u00D7 6 = \u221248. She\u2019s 48 meters below the surface.",
    incorrectFeedback: "Descending means going DOWN (negative). (\u22128) \u00D7 6 = \u221248.",
    xp: 10,
  },
  // U2: True/False
  {
    id: "U2",
    type: "true-false",
    layer: 2,
    prompt: "For each statement, decide TRUE or FALSE:",
    tfQuestions: [
      {
        statement: "The product of two negative numbers is always positive.",
        correct: true,
        explanation: "Same signs = positive. Always.",
      },
      {
        statement: "If a \u00D7 b is negative, then BOTH a and b must be negative.",
        correct: false,
        explanation: "If a \u00D7 b is negative, one is positive and one is negative \u2014 NOT both negative.",
      },
      {
        statement: "(\u22121) \u00D7 any number = the opposite of that number.",
        correct: true,
        explanation: "Multiplying by \u22121 flips the sign. (\u22121) \u00D7 5 = \u22125, (\u22121) \u00D7 (\u22123) = 3.",
      },
      {
        statement: "If a \u00F7 b is positive, then a and b have the same sign.",
        correct: true,
        explanation: "Positive quotient means same signs: both positive or both negative.",
      },
    ],
    correctFeedback: "Excellent reasoning on all four!",
    incorrectFeedback: "Review the sign rules: same signs = positive, different signs = negative.",
    xp: 16,
  },
];

// U1 text options
const U1_OPTIONS: Record<number, string> = {
  1: "Because the rule says so",
  2: "The pattern 3\u00D72=6, 3\u00D71=3, 3\u00D70=0 forces 3\u00D7(\u22121)=\u22123, and extending with neg multiplier forces positive",
  3: "Two wrongs make a right",
  4: "Calculators say it\u2019s positive",
};

interface PracticeStageProps {
  onComplete: () => void;
}

function PracticeStage({ onComplete }: PracticeStageProps) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showRuleCard, setShowRuleCard] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // For MC and numeric
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState("");
  const [numericSign, setNumericSign] = useState<"positive" | "negative">("positive");

  // For sign-rule
  const [signAnswers, setSignAnswers] = useState<Record<number, "positive" | "negative">>({});

  // For true-false
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});

  // For chain
  const [chainStep, setChainStep] = useState(0);
  const [chainInput, setChainInput] = useState("");
  const [chainCompleted, setChainCompleted] = useState(false);

  const problem = PRACTICE_PROBLEMS[problemIdx];
  const total = PRACTICE_PROBLEMS.length;

  const resetProblemState = useCallback(() => {
    setSelectedOption(null);
    setNumericAnswer("");
    setNumericSign("positive");
    setSignAnswers({});
    setTfAnswers({});
    setChainStep(0);
    setChainInput("");
    setChainCompleted(false);
    setFeedback(null);
  }, []);

  const handleCheck = useCallback(() => {
    if (!problem || feedback !== null) return;

    let isCorrect = false;

    switch (problem.type) {
      case "multiple-choice":
      case "word-problem":
        isCorrect = selectedOption === problem.correctAnswer;
        break;

      case "numeric-input": {
        const val = parseInt(numericAnswer, 10);
        const signedVal = numericSign === "negative" ? -val : val;
        isCorrect = signedVal === problem.correctAnswer;
        break;
      }

      case "sign-rule": {
        if (!problem.signQuestions) break;
        isCorrect = problem.signQuestions.every((sq, i) => signAnswers[i] === sq.correct);
        break;
      }

      case "true-false": {
        if (!problem.tfQuestions) break;
        isCorrect = problem.tfQuestions.every((tq, i) => tfAnswers[i] === tq.correct);
        break;
      }

      case "chain": {
        isCorrect = chainCompleted;
        break;
      }
    }

    setFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) {
      setXpEarned((x) => x + problem.xp);
    }
  }, [problem, feedback, selectedOption, numericAnswer, numericSign, signAnswers, tfAnswers, chainCompleted]);

  const handleChainCheck = useCallback(() => {
    if (!problem?.chainSteps) return;
    const currentStep = problem.chainSteps[chainStep];
    if (!currentStep) return;

    const val = parseInt(chainInput, 10);
    if (val === currentStep.answer) {
      setChainInput("");
      if (chainStep >= problem.chainSteps.length - 1) {
        setChainCompleted(true);
        setFeedback("correct");
        setXpEarned((x) => x + problem.xp);
      } else {
        setChainStep((s) => s + 1);
      }
    }
  }, [problem, chainStep, chainInput]);

  const nextProblem = useCallback(() => {
    if (problemIdx >= total - 1) {
      onComplete();
      return;
    }
    resetProblemState();
    setProblemIdx((i) => i + 1);
  }, [problemIdx, total, onComplete, resetProblemState]);

  if (!problem) return null;

  const canCheck = (() => {
    switch (problem.type) {
      case "multiple-choice":
      case "word-problem":
        return selectedOption !== null;
      case "numeric-input":
        return numericAnswer !== "";
      case "sign-rule":
        return problem.signQuestions ? Object.keys(signAnswers).length === problem.signQuestions.length : false;
      case "true-false":
        return problem.tfQuestions ? Object.keys(tfAnswers).length === problem.tfQuestions.length : false;
      case "chain":
        return chainCompleted;
      default:
        return false;
    }
  })();

  return (
    <StageContainer title="Practice">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Progress bar */}
        <div className="flex w-full max-w-md items-center gap-1">
          {PRACTICE_PROBLEMS.map((_, i) => (
            <div
              key={i}
              className="h-2 flex-1 rounded-full"
              style={{
                background:
                  i < problemIdx
                    ? COLORS.positive
                    : i === problemIdx
                      ? COLORS.primary
                      : "#334155",
              }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: COLORS.textMuted }}>
          Problem {problemIdx + 1} of {total} {"\u00B7"} +{xpEarned} XP
        </p>

        {/* Problem card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={problem.id}
            className="w-full rounded-xl p-5"
            style={{ background: COLORS.surface }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={FADE}
          >
            <p className="mb-4 text-center text-base font-medium" style={{ color: COLORS.textPrimary }}>
              {problem.prompt}
            </p>

            {/* Multiple Choice */}
            {(problem.type === "multiple-choice" || problem.type === "word-problem") && !feedback && (
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {problem.id === "U1"
                    ? problem.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedOption(opt)}
                          className={cn(
                            "flex min-h-[48px] w-full max-w-sm items-center justify-start rounded-lg px-3 text-left text-sm font-medium transition-all",
                            selectedOption === opt
                              ? "ring-2 ring-[#818cf8]"
                              : "opacity-80 hover:opacity-100",
                          )}
                          style={{
                            background: selectedOption === opt ? "#312e81" : "#1e293b",
                            border: `1.5px solid ${selectedOption === opt ? COLORS.primary : COLORS.patternConnector}`,
                            color: COLORS.textSecondary,
                          }}
                          aria-label={U1_OPTIONS[opt] ?? `Option ${opt}`}
                        >
                          {U1_OPTIONS[opt] ?? `Option ${opt}`}
                        </button>
                      ))
                    : problem.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedOption(opt)}
                          className={cn(
                            "flex min-h-[48px] min-w-[64px] items-center justify-center rounded-lg text-lg font-bold transition-all",
                            selectedOption === opt
                              ? "ring-2 ring-[#818cf8]"
                              : "opacity-80 hover:opacity-100",
                          )}
                          style={{
                            background: selectedOption === opt ? "#312e81" : "#1e293b",
                            border: `1.5px solid ${selectedOption === opt ? COLORS.primary : COLORS.patternConnector}`,
                            color: COLORS.textSecondary,
                          }}
                          aria-label={`Answer: ${opt}`}
                        >
                          {opt}
                        </button>
                      ))}
                </div>
              </div>
            )}

            {/* Numeric Input */}
            {problem.type === "numeric-input" && !feedback && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setNumericSign((s) => (s === "positive" ? "negative" : "positive"))}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{
                    background: numericSign === "positive" ? COLORS.positive : COLORS.negative,
                  }}
                  aria-label={`Sign: ${numericSign}`}
                >
                  {numericSign === "positive" ? "+" : "\u2212"}
                </button>
                <input
                  type="number"
                  min={0}
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  className="h-12 w-24 rounded-lg border border-white/20 bg-white/5 text-center text-xl font-bold text-white focus:border-[#7c3aed] focus:outline-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  aria-label="Your answer"
                  autoFocus
                />
              </div>
            )}

            {/* Sign Rule */}
            {problem.type === "sign-rule" && !feedback && problem.signQuestions && (
              <div className="flex flex-col gap-3">
                {problem.signQuestions.map((sq, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm font-semibold" style={{ color: COLORS.textSecondary }}>
                      {sq.expr}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSignAnswers((prev) => ({ ...prev, [i]: "positive" }))}
                        className={cn(
                          "flex min-h-[44px] w-14 items-center justify-center rounded-lg text-sm font-bold text-white transition-all",
                          signAnswers[i] === "positive" ? "ring-2 ring-white" : "opacity-70",
                        )}
                        style={{ background: COLORS.positive }}
                        aria-label={`${sq.expr}: positive`}
                      >
                        +
                      </button>
                      <button
                        onClick={() => setSignAnswers((prev) => ({ ...prev, [i]: "negative" }))}
                        className={cn(
                          "flex min-h-[44px] w-14 items-center justify-center rounded-lg text-sm font-bold text-white transition-all",
                          signAnswers[i] === "negative" ? "ring-2 ring-white" : "opacity-70",
                        )}
                        style={{ background: COLORS.negative }}
                        aria-label={`${sq.expr}: negative`}
                      >
                        {"\u2212"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* True/False */}
            {problem.type === "true-false" && !feedback && problem.tfQuestions && (
              <div className="flex flex-col gap-3">
                {problem.tfQuestions.map((tq, i) => (
                  <div key={i} className="flex flex-col gap-2 rounded-lg border border-white/10 p-3">
                    <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                      {tq.statement}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTfAnswers((prev) => ({ ...prev, [i]: true }))}
                        className={cn(
                          "flex min-h-[44px] w-[72px] items-center justify-center rounded-lg text-sm font-semibold transition-all",
                          tfAnswers[i] === true ? "text-white" : "text-white/60",
                        )}
                        style={{
                          background: tfAnswers[i] === true ? COLORS.positive : "#1e293b",
                          border: `1.5px solid ${tfAnswers[i] === true ? COLORS.positive : COLORS.patternConnector}`,
                        }}
                        aria-label={`Statement ${i + 1}: TRUE`}
                      >
                        TRUE
                      </button>
                      <button
                        onClick={() => setTfAnswers((prev) => ({ ...prev, [i]: false }))}
                        className={cn(
                          "flex min-h-[44px] w-[72px] items-center justify-center rounded-lg text-sm font-semibold transition-all",
                          tfAnswers[i] === false ? "text-white" : "text-white/60",
                        )}
                        style={{
                          background: tfAnswers[i] === false ? COLORS.negative : "#1e293b",
                          border: `1.5px solid ${tfAnswers[i] === false ? COLORS.negative : COLORS.patternConnector}`,
                        }}
                        aria-label={`Statement ${i + 1}: FALSE`}
                      >
                        FALSE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chain */}
            {problem.type === "chain" && !feedback && problem.chainSteps && (
              <div className="flex flex-col items-center gap-3">
                {problem.chainSteps.slice(0, chainStep).map((cs, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-sm">
                    <span style={{ color: COLORS.textSecondary }}>{cs.label.replace("?", "")}</span>
                    <span style={{ color: COLORS.positive, fontWeight: 700 }}>{cs.answer}</span>
                  </div>
                ))}

                {!chainCompleted && problem.chainSteps[chainStep] != null && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
                      {problem.chainSteps[chainStep]!.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={chainInput}
                        onChange={(e) => setChainInput(e.target.value)}
                        className="h-12 w-24 rounded-lg border border-white/20 bg-white/5 text-center text-xl font-bold text-white focus:border-[#7c3aed] focus:outline-none"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                        aria-label="Step answer"
                        autoFocus
                      />
                      <button
                        onClick={handleChainCheck}
                        disabled={chainInput === ""}
                        className="min-h-[44px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] px-4 text-sm font-semibold text-white disabled:opacity-50"
                      >
                        Check
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Check button (for non-chain types) */}
            {!feedback && problem.type !== "chain" && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleCheck}
                  disabled={!canCheck}
                  className="min-h-[44px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] px-5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Check
                </button>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <motion.div
                className="mt-4 flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={FADE}
              >
                {feedback === "correct" ? (
                  <span className="text-lg font-bold" style={{ color: COLORS.positive }}>
                    Correct! +{problem.xp} XP
                  </span>
                ) : (
                  <span className="text-lg font-bold" style={{ color: COLORS.negative }}>
                    Not quite.
                  </span>
                )}
                <p className="max-w-sm text-center text-sm" style={{ color: COLORS.textMuted }}>
                  {feedback === "correct" ? problem.correctFeedback : problem.incorrectFeedback}
                </p>

                {/* Show TF explanations on incorrect feedback */}
                {problem.type === "true-false" && problem.tfQuestions && feedback === "incorrect" && (
                  <div className="flex w-full flex-col gap-2">
                    {problem.tfQuestions.map((tq, i) => {
                      const userAnswer = tfAnswers[i];
                      const isWrong = userAnswer !== tq.correct;
                      if (!isWrong) return null;
                      return (
                        <div key={i} className="rounded-lg p-2 text-xs" style={{ background: "rgba(244,63,94,0.1)", color: COLORS.textSecondary }}>
                          <span className="font-bold" style={{ color: COLORS.negative }}>
                            {tq.correct ? "TRUE" : "FALSE"}:
                          </span>{" "}
                          {tq.explanation}
                        </div>
                      );
                    })}
                  </div>
                )}

                <ContinueButton
                  onClick={nextProblem}
                  label={problemIdx >= total - 1 ? "Finish Practice" : "Next \u2192"}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rule card toggle */}
        <button
          onClick={() => setShowRuleCard((v) => !v)}
          className="min-h-[44px] rounded-lg border border-white/20 px-3 text-sm"
          style={{ color: COLORS.textMuted }}
          aria-label={showRuleCard ? "Hide rule card" : "Show rule card"}
        >
          {showRuleCard ? "Hide Rules" : "? Show Rules"}
        </button>

        {/* Rule card overlay */}
        <AnimatePresence>
          {showRuleCard && (
            <motion.div
              className="w-full max-w-sm rounded-xl p-4"
              style={{ background: COLORS.surface, border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={FADE}
            >
              <div className="flex flex-col gap-1 text-sm" style={{ color: COLORS.textSecondary }}>
                <span>
                  <span style={{ color: COLORS.positive }}>Same signs</span> {"\u2192"} positive (+)
                </span>
                <span>
                  <span style={{ color: COLORS.negative }}>Different signs</span> {"\u2192"} negative ({"\u2212"})
                </span>
                <span className="mt-1 text-xs" style={{ color: COLORS.textMuted }}>
                  Same rules for multiplication and division
                </span>
                <span className="text-xs" style={{ color: COLORS.zero }}>
                  Negative = REVERSE. Two reverses = original.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 7 — REFLECTION
   ════════════════════════════════════════════════════════════════════════ */

interface ReflectionStageProps {
  onComplete: () => void;
}

function ReflectionStage({ onComplete }: ReflectionStageProps) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [feedbackText, setFeedbackText] = useState<string | null>(null);

  const minChars = 30;
  const maxChars = 1000;
  const canSubmit = text.length >= minChars;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    const lower = text.toLowerCase();
    const mentionsPattern = lower.includes("pattern") || lower.includes("3x2") || lower.includes("descend") || lower.includes("drops by");
    const mentionsReversal = lower.includes("reverse") || lower.includes("flip") || lower.includes("direction") || lower.includes("turn");
    const mentionsExample = /\d/.test(text);
    const mentionsDouble = lower.includes("double") || lower.includes("two") || lower.includes("twice");

    let fb: string;
    if ((mentionsPattern || mentionsReversal) && mentionsDouble && mentionsExample) {
      fb =
        "Excellent explanation! You showed WHY negative \u00D7 negative must be positive, not just that it IS. The double-reversal concept with a concrete example is exactly the kind of reasoning that sticks.";
    } else if (mentionsPattern || mentionsReversal) {
      fb =
        "Good reasoning! You referenced a solid model. To make it even stronger, try showing the specific pattern: 3\u00D72=6, 3\u00D71=3, 3\u00D70=0, and continuing past zero forces the result to be positive.";
    } else {
      fb =
        "You\u2019ve got the basic idea. To make your argument more convincing, try the descending pattern: 3\u00D72=6, 3\u00D71=3, 3\u00D70=0. Each answer drops by 3. So 3\u00D7(\u22121) MUST be \u22123. Then extend with negative multipliers to show negative \u00D7 negative must be positive.";
    }
    setFeedbackText(fb);
  }, [text]);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    setFeedbackText("Reflection skipped. You can always come back and practice explaining concepts \u2014 self-explanation is one of the most powerful learning tools.");
  }, []);

  return (
    <StageContainer title="Reflection">
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <p className="text-center text-base font-medium" style={{ color: COLORS.textPrimary }}>
          Explain to a friend who believes &quot;negative {"\u00D7"} negative = negative&quot; why they are wrong.
        </p>
        <p className="text-center text-sm" style={{ color: COLORS.textMuted }}>
          Use either the pattern method (3{"\u00D7"}2, 3{"\u00D7"}1, 3{"\u00D7"}0, 3{"\u00D7"}({"\u2212"}1)...) or the direction reversal method to convince them.
        </p>

        {!submitted && !skipped && (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, maxChars))}
              placeholder="Think about what happens when you extend the multiplication pattern past zero..."
              className={cn(
                "w-full resize-none rounded-xl border border-white/20 bg-white/5 p-4 text-sm text-white",
                "placeholder:text-white/30",
                "focus:border-[#7c3aed] focus:outline-none",
              )}
              style={{ minHeight: 120, maxHeight: 250 }}
              rows={5}
              aria-label="Reflection text"
            />

            <p className="text-xs" style={{ color: text.length < minChars ? COLORS.zero : COLORS.textMuted }}>
              {text.length < minChars
                ? `${text.length} / ${minChars} minimum`
                : text.length > maxChars - 50
                  ? `${text.length} / ${maxChars}`
                  : `${text.length} characters`}
            </p>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "min-h-[48px] min-w-[200px] rounded-xl px-6 py-3 text-base font-semibold text-white",
                "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              Submit Reflection
            </button>

            <button
              onClick={handleSkip}
              className="text-sm"
              style={{ color: COLORS.tick, fontSize: "0.8rem" }}
            >
              Skip
            </button>
          </>
        )}

        {/* AI Feedback */}
        <AnimatePresence>
          {feedbackText && (
            <motion.div
              className="w-full rounded-xl p-4"
              style={{ background: COLORS.surface, border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
                {feedbackText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion summary */}
        {(submitted || skipped) && feedbackText && (
          <motion.div
            className="flex w-full flex-col items-center gap-3 rounded-xl p-5"
            style={{ background: COLORS.surface, border: `2px solid ${COLORS.positive}` }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>
              LESSON COMPLETE!
            </h3>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>
              Integer Multiplication & Division
            </p>
            <div className="flex flex-col gap-1 text-sm" style={{ color: COLORS.textSecondary }}>
              <span>Lesson completion: <span style={{ color: COLORS.positive }}>100 XP</span></span>
              <span>Exploration bonus: <span style={{ color: COLORS.positive }}>30 XP</span></span>
              <span>Discovery insight: <span style={{ color: COLORS.positive }}>25 XP</span></span>
              <span>Reflection: <span style={{ color: COLORS.positive }}>{skipped ? "0" : "48"} XP</span></span>
            </div>
            <div
              className="mt-1 border-t border-white/10 pt-2 text-center text-lg font-bold"
              style={{ color: COLORS.zero, fontVariantNumeric: "tabular-nums" }}
            >
              Total: {skipped ? 155 : 203} XP
            </div>

            <ContinueButton onClick={onComplete} label={"Continue to Next Lesson \u2192"} />
          </motion.div>
        )}
      </div>
    </StageContainer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MAIN LESSON COMPONENT
   ════════════════════════════════════════════════════════════════════════ */

const STAGE_ORDER: NLSStage[] = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
];

const STAGE_LABELS: Record<NLSStage, string> = {
  hook: "Hook",
  spatial: "Explore",
  discovery: "Discover",
  symbol: "Symbols",
  realWorld: "Real World",
  practice: "Practice",
  reflection: "Reflect",
};

export function IntegerMultDivLesson({ onComplete }: IntegerMultDivLessonProps) {
  const [stageIdx, setStageIdx] = useState(0);
  const currentStage = STAGE_ORDER[stageIdx] ?? "hook";

  const advance = useCallback(() => {
    if (stageIdx >= STAGE_ORDER.length - 1) {
      onComplete?.();
      return;
    }
    setStageIdx((i) => i + 1);
  }, [stageIdx, onComplete]);

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "#0f172a", color: COLORS.textPrimary }}
    >
      {/* Stage progress nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 px-4 py-2 backdrop-blur-md"
        style={{ background: "rgba(15,23,42,0.9)" }}
      >
        <span className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
          Integer Mul & Div
        </span>
        <div className="flex items-center gap-1">
          {STAGE_ORDER.map((s, i) => (
            <div key={s} className="flex items-center gap-0.5" title={STAGE_LABELS[s]}>
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === stageIdx ? 24 : 10,
                  background:
                    i < stageIdx
                      ? COLORS.positive
                      : i === stageIdx
                        ? COLORS.primary
                        : "#334155",
                }}
              />
            </div>
          ))}
        </div>
        <span className="text-xs" style={{ color: COLORS.textMuted }}>
          {stageIdx + 1}/{STAGE_ORDER.length}
        </span>
      </nav>

      {/* Stage content */}
      <main className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={SPRING_GENTLE}
          >
            {currentStage === "hook" && <HookStage onComplete={advance} />}
            {currentStage === "spatial" && <SpatialStage onComplete={advance} />}
            {currentStage === "discovery" && <DiscoveryStage onComplete={advance} />}
            {currentStage === "symbol" && <SymbolBridgeStage onComplete={advance} />}
            {currentStage === "realWorld" && <RealWorldStage onComplete={advance} />}
            {currentStage === "practice" && <PracticeStage onComplete={advance} />}
            {currentStage === "reflection" && <ReflectionStage onComplete={advance} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
