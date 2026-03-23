"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

const COLOR = {
  positive: "#34d399",
  negative: "#60a5fa",
  zero: "#fbbf24",
  incorrect: "#ef4444",
  accent: "#8b5cf6",
  highlight: "#f472b6",
  bgPrimary: "#0f172a",
  bgCard: "#1e293b",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#475569",
} as const;

const SPRING_DEFAULT = { damping: 20, stiffness: 300 };
const SPRING_BOUNCY = { damping: 15, stiffness: 300 };
const SPRING_STIFF = { damping: 25, stiffness: 400 };

function integerColor(n: number): string {
  if (n < 0) return COLOR.negative;
  if (n > 0) return COLOR.positive;
  return COLOR.zero;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LESSON STATE
   ═══════════════════════════════════════════════════════════════════════════ */

type Stage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface ProblemResult {
  problemId: string;
  correct: boolean;
  attempts: number;
  hintsUsed: number;
  answer: string;
}

interface LessonState {
  currentStage: Stage;
  lessonComplete: boolean;
}

type Action =
  | { type: "SET_STAGE"; stage: Stage }
  | { type: "LESSON_COMPLETE" };

function reducer(state: LessonState, action: Action): LessonState {
  switch (action.type) {
    case "SET_STAGE":
      return { ...state, currentStage: action.stage };
    case "LESSON_COMPLETE":
      return { ...state, lessonComplete: true };
  }
}

const initialState: LessonState = {
  currentStage: 1,
  lessonComplete: false,
};

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function PillButton({
  onClick,
  color = COLOR.positive,
  children,
  disabled = false,
}: {
  onClick: () => void;
  color?: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full px-8 py-3 font-semibold text-base select-none"
      style={{
        backgroundColor: disabled ? COLOR.textMuted : color,
        color: disabled ? COLOR.textSecondary : COLOR.bgPrimary,
        minHeight: 48,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", ...SPRING_STIFF }}
    >
      {children}
    </motion.button>
  );
}

function StageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{ backgroundColor: COLOR.bgPrimary, minHeight: "100dvh" }}
    >
      {children}
    </div>
  );
}

function PromptCard({
  children,
  button,
  dots,
}: {
  children: ReactNode;
  button?: ReactNode;
  dots?: ReactNode;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-20"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
    >
      <div
        className="rounded-t-2xl px-6 pt-5 pb-4 shadow-2xl"
        style={{
          backgroundColor: `${COLOR.bgCard}f2`,
          borderTop: "1px solid #334155",
          backdropFilter: "blur(12px)",
        }}
      >
        {dots && <div className="flex justify-center gap-2 mb-4">{dots}</div>}
        <div className="text-base leading-relaxed" style={{ color: COLOR.textPrimary }}>
          {children}
        </div>
        {button && <div className="flex justify-end mt-4">{button}</div>}
      </div>
    </motion.div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <>
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: i === current ? 10 : 8,
            height: i === current ? 10 : 8,
            backgroundColor:
              i < current
                ? COLOR.positive
                : i === current
                  ? COLOR.zero
                  : COLOR.textMuted,
          }}
          animate={
            i === current
              ? { opacity: [0.8, 1, 0.8], scale: [1, 1.15, 1] }
              : {}
          }
          transition={
            i === current
              ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        />
      ))}
    </>
  );
}

/** Reusable SVG number line for visualizations throughout the lesson. */
function NumberLineSVG({
  min,
  max,
  highlights = [],
  showLabels = true,
  width = 320,
  height = 80,
  activeHighlight,
}: {
  min: number;
  max: number;
  highlights?: Array<{ value: number; color: string; label?: string }>;
  showLabels?: boolean;
  width?: number;
  height?: number;
  activeHighlight?: number | null;
}) {
  const padding = 24;
  const lineY = height / 2;
  const range = max - min;
  const toX = (v: number) =>
    padding + ((v - min) / range) * (width - padding * 2);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Number line from ${min} to ${max}`}
    >
      {/* Axis */}
      <line
        x1={padding}
        y1={lineY}
        x2={width - padding}
        y2={lineY}
        stroke={COLOR.textMuted}
        strokeWidth={2}
      />
      {/* Arrowheads */}
      <polygon
        points={`${padding - 6},${lineY} ${padding + 2},${lineY - 4} ${padding + 2},${lineY + 4}`}
        fill={COLOR.textMuted}
      />
      <polygon
        points={`${width - padding + 6},${lineY} ${width - padding - 2},${lineY - 4} ${width - padding - 2},${lineY + 4}`}
        fill={COLOR.textMuted}
      />
      {/* Ticks & labels */}
      {showLabels &&
        Array.from({ length: range + 1 }, (_, i) => {
          const v = min + i;
          const x = toX(v);
          return (
            <g key={v}>
              <line
                x1={x}
                y1={lineY - 6}
                x2={x}
                y2={lineY + 6}
                stroke={v === 0 ? COLOR.zero : integerColor(v)}
                strokeWidth={v === 0 ? 2.5 : 1}
              />
              <text
                x={x}
                y={lineY + 20}
                textAnchor="middle"
                fontSize={11}
                fill={v === 0 ? COLOR.zero : integerColor(v)}
                fontFamily="system-ui, sans-serif"
              >
                {v}
              </text>
            </g>
          );
        })}
      {/* Highlighted points */}
      {highlights.map((h) => (
        <g key={`hl-${h.value}`}>
          <motion.circle
            cx={toX(h.value)}
            cy={lineY}
            r={6}
            fill={h.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", ...SPRING_BOUNCY }}
          />
          {h.label && (
            <text
              x={toX(h.value)}
              y={lineY - 14}
              textAnchor="middle"
              fontSize={10}
              fill={h.color}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              {h.label}
            </text>
          )}
        </g>
      ))}
      {/* Active ring */}
      {activeHighlight != null && (
        <motion.circle
          cx={toX(activeHighlight)}
          cy={lineY}
          r={10}
          fill="none"
          stroke={integerColor(activeHighlight)}
          strokeWidth={2}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", ...SPRING_DEFAULT }}
        />
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK: "What's Below Zero?"
   Cinematic thermometer dropping from +5 through 0 to -5.
   Background warm→cold gradient. Ice crystals at negatives.
   ═══════════════════════════════════════════════════════════════════════════ */

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/IntegersHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState<
    "countdown" | "pause" | "below" | "done"
  >("countdown");
  const [temp, setTemp] = useState(5);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [bgCold, setBgCold] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const startAnimation = useCallback(() => {
    clearTimers();
    setPhase("countdown");
    setTemp(5);
    setShowQuestion(false);
    setShowContinue(false);
    setShowReplay(false);
    setBgCold(false);

    // Phase 1 — countdown 5→0
    schedule(() => setTemp(4), 1300);
    schedule(() => setTemp(3), 1800);
    schedule(() => setTemp(2), 2300);
    schedule(() => setTemp(1), 2800);
    schedule(() => setTemp(0), 3300);

    // Phase 2 — dramatic pause at zero
    schedule(() => {
      setPhase("pause");
      setShowQuestion(true);
    }, 4500);

    // Phase 3 — below zero
    schedule(() => {
      setPhase("below");
      setShowQuestion(false);
      setBgCold(true);
    }, 5500);
    schedule(() => setTemp(-1), 5700);
    schedule(() => setTemp(-2), 6100);
    schedule(() => setTemp(-3), 6500);
    schedule(() => setTemp(-4), 6900);
    schedule(() => setTemp(-5), 7300);

    // Phase 4 — final state
    schedule(() => setPhase("done"), 8000);
    schedule(() => {
      setShowContinue(true);
      setShowReplay(true);
    }, 8500);
    // Failsafe: guarantee Continue button within 4s
    schedule(() => setShowContinue(true), 4000);
  }, []);

  useEffect(() => {
    startAnimation();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReplay = () => {
    if (replayCount >= 2) return;
    setReplayCount((c) => c + 1);
    startAnimation();
  };

  /* Mercury height: maps temp [+5 … -5] → [full … tiny] */
  const mercuryFraction = (temp + 5) / 10; // 1 at +5, 0 at -5
  const mercuryHeight = Math.max(mercuryFraction * 240, 8);
  const mercuryColor =
    temp > 0 ? "#ef4444" : temp === 0 ? COLOR.zero : "#3b82f6";
  const bulbColor =
    temp > 0 ? "#ef4444" : temp === 0 ? COLOR.zero : "#3b82f6";

  /* Ice crystals */
  const crystals = useMemo(
    () => [
      { x: 80, y: 390, size: 16, speed: 6 },
      { x: 310, y: 420, size: 22, speed: 8 },
      { x: 60, y: 460, size: 12, speed: 10 },
      { x: 330, y: 490, size: 18, speed: 7 },
      { x: 90, y: 510, size: 14, speed: 9 },
    ],
    [],
  );

  /* SVG y positions for temperature labels */
  const tempY = (v: number) => 120 + (5 - v) * 30;

  return (
    <StageContainer>
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: bgCold
            ? "linear-gradient(180deg, #0f172a 0%, #1e3a5f 40%, #1e40af 100%)"
            : "linear-gradient(180deg, #92400e 0%, #dc2626 40%, #f97316 100%)",
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Thermometer SVG */}
      <motion.svg
        viewBox="0 0 400 600"
        className="relative z-10 w-full max-w-sm"
        style={{ maxHeight: "68dvh" }}
        role="img"
        aria-label="Thermometer animation: temperature dropping from 5 degrees to negative 5 degrees"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* ── Tube outline ── */}
        <rect
          x={180}
          y={90}
          width={40}
          height={330}
          rx={20}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={2}
        />

        {/* ── Mercury column ── */}
        <motion.rect
          x={188}
          width={24}
          rx={12}
          animate={{
            height: mercuryHeight,
            y: 420 - mercuryHeight,
            fill: mercuryColor,
          }}
          transition={{ type: "spring", ...SPRING_DEFAULT }}
        />

        {/* ── Bulb ── */}
        <motion.circle
          cx={200}
          cy={440}
          r={28}
          animate={{ fill: bulbColor }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={2}
        />

        {/* ── Tick marks on tube ── */}
        {Array.from({ length: 11 }, (_, i) => {
          const v = 5 - i;
          const y = tempY(v);
          return (
            <line
              key={`tick-${v}`}
              x1={172}
              y1={y}
              x2={180}
              y2={y}
              stroke={
                v === 0
                  ? COLOR.zero
                  : "rgba(255,255,255,0.25)"
              }
              strokeWidth={v === 0 ? 2.5 : 1}
            />
          );
        })}

        {/* ── Temperature labels ── */}
        {Array.from({ length: 11 }, (_, i) => {
          const v = 5 - i;
          const y = tempY(v);
          // Show label if it is the *current* temp or, once below-zero phase
          // finishes, show all negative labels and zero.
          const show =
            v === temp ||
            (phase === "done" && v <= 0) ||
            (phase === "pause" && v === 0);
          if (!show) return null;
          return (
            <motion.text
              key={`lbl-${v}`}
              x={255}
              y={y + 5}
              fill={
                v > 0 ? "#fde68a" : v === 0 ? COLOR.zero : COLOR.negative
              }
              fontSize={v === 0 ? 18 : 14}
              fontFamily="system-ui, sans-serif"
              fontWeight={v === 0 ? 700 : 400}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {v}°C
            </motion.text>
          );
        })}

        {/* ── Zero dashed line ── */}
        {(phase === "pause" || phase === "below" || phase === "done") && (
          <motion.line
            x1={172}
            y1={tempY(0)}
            x2={228}
            y2={tempY(0)}
            stroke={COLOR.zero}
            strokeWidth={2}
            strokeDasharray="5 5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* ── Ice crystals ── */}
        {(phase === "below" || phase === "done") &&
          crystals.map((c, i) => (
            <motion.g
              key={`ice-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.75, scale: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.15 },
                scale: {
                  duration: 0.5,
                  delay: i * 0.15,
                  type: "spring",
                  ...SPRING_BOUNCY,
                },
                rotate: {
                  duration: c.speed,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
            >
              {/* Six-pointed snowflake shape built from three crossed lines */}
              {[0, 60, 120].map((angle) => (
                <line
                  key={angle}
                  x1={c.x - c.size / 2}
                  y1={c.y}
                  x2={c.x + c.size / 2}
                  y2={c.y}
                  stroke={["#93c5fd", "#bfdbfe", "#dbeafe"][i % 3]!}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  transform={`rotate(${angle}, ${c.x}, ${c.y})`}
                />
              ))}
            </motion.g>
          ))}
      </motion.svg>

      {/* "What happens next?" question */}
      <AnimatePresence>
        {showQuestion && (
          <motion.h2
            className="absolute top-20 z-20 text-2xl font-bold text-white text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", ...SPRING_BOUNCY }}
          >
            What happens next?
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Continue */}
      <AnimatePresence>
        {showContinue && (
          <motion.div
            className="absolute bottom-12 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...SPRING_BOUNCY }}
          >
            <PillButton onClick={onComplete} color="rgba(255,255,255,0.18)">
              <span style={{ color: "white" }}>Continue</span>
            </PillButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replay */}
      {showReplay && replayCount < 3 && (
        <motion.button
          className="absolute top-4 right-4 z-20 flex items-center justify-center rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            width: 40,
            height: 40,
          }}
          onClick={handleReplay}
          aria-label="Replay animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </motion.button>
      )}
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE: Interactive Number Line
   Draggable point, tap-for-opposite, compare mode.
   ═══════════════════════════════════════════════════════════════════════════ */

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [pointPos, setPointPos] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const prevPosRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareFirst, setCompareFirst] = useState<number | null>(null);
  const [comparison, setComparison] = useState<{
    a: number;
    b: number;
  } | null>(null);
  const [oppositeShowing, setOppositeShowing] = useState<number | null>(null);
  const [zeroCrossFlash, setZeroCrossFlash] = useState(false);
  const lastSignRef = useRef<"neg" | "zero" | "pos">("zero");
  const zeroCrossTimeRef = useRef(0);
  const [trail, setTrail] = useState<
    Array<{ x: number; color: string; opacity: number; r: number }>
  >([]);
  const [showComplete, setShowComplete] = useState(false);
  const [prompt, setPrompt] = useState(
    "Drag the point along the number line. Watch what happens at zero!",
  );

  // SVG layout
  const svgWidth = 720;
  const svgHeight = 240;
  const lineY = 120;
  const pad = 40;
  const toX = (v: number) =>
    pad + ((v + 10) / 20) * (svgWidth - pad * 2);
  const fromX = (x: number) =>
    Math.round(((x - pad) / (svgWidth - pad * 2)) * 20 - 10);

  const countInteraction = useCallback(() => {
    setInteractionCount((c) => {
      const next = c + 1;
      if (next === 3)
        setPrompt("Try tapping a number to find its opposite.");
      if (next === 6)
        setPrompt("Hit the Compare button to see which number is greater.");
      if (next >= 10) {
        setPrompt("Great exploring! Ready to discover something cool?");
        setShowComplete(true);
      }
      return next;
    });
  }, []);

  const handleSnap = useCallback(
    (newPos: number) => {
      const clamped = Math.max(-10, Math.min(10, newPos));
      if (clamped !== prevPosRef.current) {
        // Zero-crossing flash
        const newSign: "neg" | "zero" | "pos" =
          clamped < 0 ? "neg" : clamped > 0 ? "pos" : "zero";
        const oldSign = lastSignRef.current;
        const now = Date.now();
        if (
          newSign !== "zero" &&
          oldSign !== "zero" &&
          newSign !== oldSign &&
          now - zeroCrossTimeRef.current > 500
        ) {
          setZeroCrossFlash(true);
          zeroCrossTimeRef.current = now;
          setTimeout(() => setZeroCrossFlash(false), 500);
        }
        lastSignRef.current = newSign;
        prevPosRef.current = clamped;
        countInteraction();
      }
      setPointPos(clamped);
    },
    [countInteraction],
  );

  // Gesture binding
  const bind = useDrag(
    ({ movement: [mx], first, last, memo }) => {
      if (first) {
        setIsDragging(true);
        return toX(pointPos);
      }
      const startX = (memo as number) ?? toX(pointPos);
      const rawVal = fromX(startX + mx);
      const clamped = Math.max(-10, Math.min(10, rawVal));
      setPointPos(clamped);
      // Trail
      setTrail((prev) => [
        { x: clamped, color: integerColor(clamped), opacity: 0.45, r: 6 },
        ...prev.slice(0, 4).map((t) => ({
          ...t,
          opacity: t.opacity * 0.65,
          r: t.r * 0.82,
        })),
      ]);
      if (last) {
        setIsDragging(false);
        handleSnap(clamped);
        setTimeout(() => setTrail([]), 600);
      }
      return startX;
    },
    { axis: "x" },
  );

  const handleIntegerTap = useCallback(
    (v: number) => {
      if (compareMode) {
        if (compareFirst === null) {
          setCompareFirst(v);
        } else {
          setComparison({ a: compareFirst, b: v });
          setCompareFirst(null);
          countInteraction();
          setTimeout(() => setComparison(null), 3500);
        }
        return;
      }
      // Opposite mode
      if (oppositeShowing === v) {
        setOppositeShowing(null);
        return;
      }
      setOppositeShowing(v);
      countInteraction();
      setTimeout(() => setOppositeShowing(null), 3000);
    },
    [compareMode, compareFirst, oppositeShowing, countInteraction],
  );

  return (
    <StageContainer>
      {/* Prompt */}
      <AnimatePresence mode="wait">
        <motion.p
          key={prompt}
          className="text-sm text-center px-6 mb-2 z-10"
          style={{ color: `${COLOR.textPrimary}cc` }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {prompt}
        </motion.p>
      </AnimatePresence>

      {/* Compare toggle */}
      <motion.button
        className="absolute top-4 left-4 z-20 rounded-xl px-4 text-sm font-medium select-none"
        style={{
          minHeight: 44,
          backgroundColor: compareMode
            ? COLOR.accent
            : "rgba(255,255,255,0.1)",
          color: compareMode ? "white" : COLOR.textSecondary,
          border: `1px solid ${compareMode ? COLOR.accent : "rgba(255,255,255,0.2)"}`,
        }}
        onClick={() => {
          setCompareMode((m) => !m);
          setCompareFirst(null);
          setComparison(null);
        }}
        whileTap={{ scale: 0.95 }}
      >
        {compareMode ? "Comparing..." : "Compare"}
      </motion.button>

      {/* Compare instruction */}
      {compareMode && !comparison && (
        <motion.p
          className="text-xs mt-1 z-10"
          style={{ color: `${COLOR.textPrimary}80` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {compareFirst === null
            ? "Tap two numbers to compare"
            : "Now tap the second number"}
        </motion.p>
      )}

      {/* Interactive SVG number line */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-2 mt-4 overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full"
          style={{ touchAction: "none" }}
          role="img"
          aria-label="Interactive number line from negative 10 to positive 10"
        >
          <defs>
            <linearGradient id="nl-cold-bg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={COLOR.negative} stopOpacity={0.06} />
              <stop offset="100%" stopColor={COLOR.negative} stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="nl-warm-bg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={COLOR.positive} stopOpacity={0.01} />
              <stop offset="100%" stopColor={COLOR.positive} stopOpacity={0.06} />
            </linearGradient>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={COLOR.positive} />
            </marker>
          </defs>

          {/* Background regions */}
          <rect
            x={pad}
            y={16}
            width={(svgWidth - pad * 2) / 2}
            height={svgHeight - 32}
            fill="url(#nl-cold-bg)"
            rx={4}
          />
          <rect
            x={toX(0)}
            y={16}
            width={(svgWidth - pad * 2) / 2}
            height={svgHeight - 32}
            fill="url(#nl-warm-bg)"
            rx={4}
          />

          {/* Region labels */}
          <text
            x={toX(-5)}
            y={36}
            textAnchor="middle"
            fill={COLOR.negative}
            fontSize={13}
            fontFamily="system-ui, sans-serif"
            opacity={0.55}
          >
            Negative
          </text>
          <text
            x={toX(5)}
            y={36}
            textAnchor="middle"
            fill={COLOR.positive}
            fontSize={13}
            fontFamily="system-ui, sans-serif"
            opacity={0.55}
          >
            Positive
          </text>

          {/* Main axis */}
          <line
            x1={pad}
            y1={lineY}
            x2={svgWidth - pad}
            y2={lineY}
            stroke={`${COLOR.textPrimary}40`}
            strokeWidth={2}
          />

          {/* Zero divider */}
          <motion.line
            x1={toX(0)}
            y1={lineY - 22}
            x2={toX(0)}
            y2={lineY + 22}
            stroke={COLOR.zero}
            strokeWidth={2.5}
            animate={
              zeroCrossFlash
                ? { strokeWidth: [2.5, 5, 2.5], opacity: [1, 1, 1] }
                : {}
            }
            transition={{ duration: 0.3 }}
          />
          <text
            x={toX(0)}
            y={lineY - 30}
            textAnchor="middle"
            fill={COLOR.zero}
            fontSize={11}
            fontWeight={700}
            fontFamily="system-ui, sans-serif"
          >
            ZERO
          </text>

          {/* Zero-crossing flash */}
          {zeroCrossFlash && (
            <motion.circle
              cx={toX(0)}
              cy={lineY}
              fill="white"
              initial={{ r: 0, opacity: 0.3 }}
              animate={{ r: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Ticks & labels */}
          {Array.from({ length: 21 }, (_, i) => {
            const v = i - 10;
            const x = toX(v);
            const yOff = (v / 10) * -1; // subtle perspective
            const isHL =
              oppositeShowing === v ||
              (oppositeShowing !== null && oppositeShowing !== 0 && v === -oppositeShowing);
            const isCMP =
              compareFirst === v ||
              comparison?.a === v ||
              comparison?.b === v;
            return (
              <g key={v}>
                <line
                  x1={x}
                  y1={lineY - 7 + yOff}
                  x2={x}
                  y2={lineY + 7 + yOff}
                  stroke={v === 0 ? COLOR.zero : integerColor(v)}
                  strokeWidth={v === 0 ? 2 : 1}
                  opacity={isHL || isCMP ? 1 : 0.6}
                />
                {/* Tappable label with 44px hit area */}
                <g
                  onClick={() => handleIntegerTap(v)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  aria-label={`${v}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleIntegerTap(v);
                  }}
                >
                  <rect
                    x={x - 16}
                    y={lineY + 6}
                    width={32}
                    height={32}
                    fill="transparent"
                  />
                  <motion.text
                    x={x}
                    y={lineY + 26}
                    textAnchor="middle"
                    fill={v === 0 ? COLOR.zero : integerColor(v)}
                    fontSize={12}
                    fontFamily="system-ui, sans-serif"
                    fontWeight={v === 0 ? 700 : 400}
                    animate={
                      isHL || isCMP ? { scale: 1.3 } : { scale: 1 }
                    }
                    transition={{ type: "spring", ...SPRING_BOUNCY }}
                  >
                    {v}
                  </motion.text>
                </g>
                {/* Highlight ring */}
                {(isHL || isCMP) && (
                  <motion.circle
                    cx={x}
                    cy={lineY}
                    r={12}
                    fill="none"
                    stroke={isCMP ? COLOR.accent : integerColor(v)}
                    strokeWidth={2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", ...SPRING_DEFAULT }}
                  />
                )}
              </g>
            );
          })}

          {/* Opposite connection line */}
          {oppositeShowing !== null && oppositeShowing !== 0 && (
            <>
              <motion.line
                x1={toX(oppositeShowing)}
                y1={lineY - 16}
                x2={toX(-oppositeShowing)}
                y2={lineY - 16}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.circle
                cx={toX(0)}
                cy={lineY - 16}
                r={3}
                fill={COLOR.zero}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
              <motion.text
                x={toX(0)}
                y={lineY - 28}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize={10}
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                opposites
              </motion.text>
            </>
          )}

          {/* Zero is its own opposite */}
          {oppositeShowing === 0 && (
            <motion.text
              x={toX(0)}
              y={lineY - 42}
              textAnchor="middle"
              fill={COLOR.zero}
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              fontWeight={600}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Zero is its own opposite!
            </motion.text>
          )}

          {/* Comparison arrow */}
          {comparison && (() => {
            const lesser = Math.min(comparison.a, comparison.b);
            const greater = Math.max(comparison.a, comparison.b);
            const isEqual = comparison.a === comparison.b;
            if (isEqual) {
              return (
                <motion.text
                  x={toX(comparison.a)}
                  y={lineY - 34}
                  textAnchor="middle"
                  fill={COLOR.zero}
                  fontSize={12}
                  fontFamily="system-ui, sans-serif"
                  fontWeight={600}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {"Same number! They're equal."}
                </motion.text>
              );
            }
            return (
              <>
                <motion.line
                  x1={toX(lesser)}
                  y1={lineY - 22}
                  x2={toX(greater)}
                  y2={lineY - 22}
                  stroke={COLOR.positive}
                  strokeWidth={3}
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.text
                  x={toX((lesser + greater) / 2)}
                  y={lineY - 34}
                  textAnchor="middle"
                  fill={COLOR.textPrimary}
                  fontSize={14}
                  fontWeight={700}
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {`${lesser} < ${greater}`}
                </motion.text>
                <motion.text
                  x={toX((lesser + greater) / 2)}
                  y={lineY + 50}
                  textAnchor="middle"
                  fill={`${COLOR.textPrimary}60`}
                  fontSize={10}
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Further right = greater
                </motion.text>
              </>
            );
          })()}

          {/* Trail */}
          {trail.map((t, i) => (
            <motion.circle
              key={`trail-${i}`}
              cx={toX(t.x)}
              cy={lineY}
              r={t.r}
              fill={t.color}
              initial={{ opacity: t.opacity }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}

          {/* Draggable point — 48px invisible hit area + visible 24px circle */}
          <g style={{ touchAction: "none" }}>
            <circle
              cx={toX(pointPos)}
              cy={lineY}
              r={24}
              fill="transparent"
              {...(bind() as Record<string, unknown>)}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: "none",
              }}
            />
            <motion.circle
              cx={toX(pointPos)}
              cy={lineY}
              r={12}
              animate={{
                fill: integerColor(pointPos),
                scale: isDragging ? 1.2 : 1,
              }}
              stroke="white"
              strokeWidth={2.5}
              transition={{ type: "spring", ...SPRING_DEFAULT }}
              style={{ pointerEvents: "none" }}
            />
          </g>

          {/* Value display */}
          <motion.text
            x={toX(pointPos)}
            y={lineY - 46}
            textAnchor="middle"
            animate={{ fill: integerColor(pointPos) }}
            fontSize={28}
            fontWeight={700}
            fontFamily="system-ui, sans-serif"
            transition={{ duration: 0.15 }}
          >
            {pointPos}
          </motion.text>
        </svg>
      </div>

      {/* Counter + bar */}
      <div className="flex items-center gap-2 mt-4 z-10">
        <span
          className="text-xs font-mono"
          style={{
            color:
              interactionCount >= 10
                ? COLOR.positive
                : `${COLOR.textPrimary}60`,
          }}
        >
          {interactionCount} / 10{interactionCount >= 10 ? " ✓" : ""}
        </span>
        <div
          className="rounded-full overflow-hidden"
          style={{
            width: 60,
            height: 3,
            backgroundColor: `${COLOR.textPrimary}20`,
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: COLOR.positive }}
            animate={{
              width: `${Math.min((interactionCount / 10) * 100, 100)}%`,
            }}
            transition={{ type: "spring", ...SPRING_DEFAULT }}
          />
        </div>
      </div>

      {/* Continue */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            className="mt-6 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...SPRING_BOUNCY }}
          >
            <PillButton onClick={onComplete}>Continue</PillButton>
          </motion.div>
        )}
      </AnimatePresence>
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY: 4 Prompts
   ═══════════════════════════════════════════════════════════════════════════ */

const DISCOVERY_PROMPTS: Array<{ text: ReactNode }> = [
  {
    text: (
      <>
        Notice how every positive number has a twin on the other side of
        zero.
        <br />3 and -3. 7 and -7.
        <br />
        These are called{" "}
        <strong style={{ color: COLOR.zero }}>OPPOSITES</strong>.
      </>
    ),
  },
  {
    text: (
      <>
        {"Here's something weird:"}
        <br />
        -5 is <strong style={{ color: COLOR.zero }}>LESS</strong> than -2,
        even though 5 is greater than 2.
        <br />
        Why?
      </>
    ),
  },
  {
    text: (
      <>
        Think about it like floors in a building:
        <br />
        Floor -5 (5 floors underground) is{" "}
        <strong style={{ color: COLOR.zero }}>DEEPER</strong> than Floor -2
        (2 floors underground).
        <br />
        Going deeper means going further from zero — but the number gets{" "}
        <strong style={{ color: COLOR.zero }}>SMALLER</strong>.
      </>
    ),
  },
  {
    text: (
      <>
        Where does zero fit?
        <br />
        {"It's not positive OR negative — it's the boundary between two worlds."}
      </>
    ),
  },
];

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);

  const visuals: Array<{
    highlights: Array<{ value: number; color: string; label?: string }>;
    min: number;
    max: number;
  }> = useMemo(
    () => [
      {
        min: -10,
        max: 10,
        highlights: [
          { value: 1, color: COLOR.positive },
          { value: -1, color: COLOR.negative },
          { value: 3, color: COLOR.positive },
          { value: -3, color: COLOR.negative },
          { value: 7, color: COLOR.positive },
          { value: -7, color: COLOR.negative },
          { value: 5, color: COLOR.positive },
          { value: -5, color: COLOR.negative },
        ],
      },
      {
        min: -7,
        max: 3,
        highlights: [
          { value: -5, color: COLOR.negative, label: "-5" },
          { value: -2, color: "#93c5fd", label: "-2" },
        ],
      },
      {
        min: -6,
        max: 6,
        highlights: [
          { value: -5, color: COLOR.negative, label: "B5" },
          { value: -2, color: COLOR.negative, label: "B2" },
          { value: 0, color: COLOR.zero, label: "G" },
          { value: 3, color: COLOR.positive, label: "F3" },
        ],
      },
      {
        min: -6,
        max: 6,
        highlights: [{ value: 0, color: COLOR.zero, label: "ZERO" }],
      },
    ],
    [],
  );

  const current = visuals[idx];
  const currentPrompt = DISCOVERY_PROMPTS[idx];
  if (!current || !currentPrompt) return null;

  const handleAck = () => {
    if (idx < 3) setIdx(idx + 1);
    else onComplete();
  };

  return (
    <StageContainer>
      <motion.div
        className="z-10 w-full max-w-md mx-auto px-4"
        key={idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <NumberLineSVG
          min={current.min}
          max={current.max}
          highlights={current.highlights}
          width={380}
          height={100}
        />

        {/* Extra visual for prompt 2 — arrow annotation */}
        {idx === 1 && (
          <motion.div
            className="flex justify-center -mt-1 text-xs font-semibold"
            style={{ color: COLOR.highlight }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            -5 &lt; -2&nbsp;
            <span
              style={{
                color: `${COLOR.textPrimary}60`,
                fontWeight: 400,
              }}
            >
              — Further right = greater
            </span>
          </motion.div>
        )}

        {/* Building metaphor for prompt 3 */}
        {idx === 2 && (
          <motion.div
            className="flex justify-center mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div
              className="rounded-lg px-4 py-3 text-center text-xs"
              style={{ backgroundColor: `${COLOR.bgCard}cc` }}
            >
              <div className="flex flex-col items-center gap-0.5">
                {[3, 2, 1].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2"
                    style={{ color: COLOR.positive }}
                  >
                    <span className="w-8 text-right font-mono text-xs">
                      F{f}
                    </span>
                    <div
                      className="rounded"
                      style={{
                        width: 40,
                        height: 10,
                        backgroundColor: `${COLOR.positive}30`,
                        border: `1px solid ${COLOR.positive}50`,
                      }}
                    />
                  </div>
                ))}
                <div
                  className="flex items-center gap-2 font-bold"
                  style={{ color: COLOR.zero }}
                >
                  <span className="w-8 text-right font-mono text-xs">
                    G
                  </span>
                  <div
                    className="rounded"
                    style={{
                      width: 40,
                      height: 12,
                      backgroundColor: `${COLOR.zero}40`,
                      border: `2px solid ${COLOR.zero}`,
                    }}
                  />
                </div>
                {[-1, -2, -3, -4, -5].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2"
                    style={{ color: COLOR.negative }}
                  >
                    <span className="w-8 text-right font-mono text-xs">
                      B{-f}
                    </span>
                    <div
                      className="rounded"
                      style={{
                        width: 40,
                        height: 10,
                        backgroundColor: `${COLOR.negative}20`,
                        border: `1px solid ${COLOR.negative}40`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <motion.p
                className="mt-2 text-xs"
                style={{ color: COLOR.negative }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Deeper = smaller number
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Zero nature for prompt 4 */}
        {idx === 3 && (
          <motion.div
            className="flex justify-center gap-6 mt-4 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span style={{ color: COLOR.negative }}>
              Negatives: -1, -2, -3...
            </span>
            <motion.span
              style={{ color: COLOR.zero, fontWeight: 700 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Zero
            </motion.span>
            <span style={{ color: COLOR.positive }}>
              Positives: 1, 2, 3...
            </span>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        <PromptCard
          key={idx}
          dots={<ProgressDots total={4} current={idx} />}
          button={
            <PillButton onClick={handleAck}>I see it!</PillButton>
          }
        >
          {currentPrompt.text}
        </PromptCard>
      </AnimatePresence>
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE: Notation Overlay
   ═══════════════════════════════════════════════════════════════════════════ */

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [nIdx, setNIdx] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleNext = () => {
    if (nIdx < 2) setNIdx(nIdx + 1);
    else setShowSummary(true);
  };

  return (
    <StageContainer>
      <div className="z-10 w-full max-w-lg mx-auto px-6">
        {/* Number line */}
        <div className="flex justify-center mb-6">
          <NumberLineSVG
            min={-8}
            max={8}
            width={380}
            height={80}
            highlights={
              nIdx === 1
                ? [
                    {
                      value: 3,
                      color: COLOR.positive,
                      label: "|3| = 3",
                    },
                    {
                      value: -3,
                      color: COLOR.negative,
                      label: "|-3| = 3",
                    },
                  ]
                : nIdx === 2
                  ? [
                      { value: 4, color: COLOR.positive },
                      { value: -4, color: COLOR.negative },
                    ]
                  : []
            }
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Notation 1: Integer Set */}
          {nIdx === 0 && !showSummary && (
            <motion.div
              key="n0"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-2xl font-mono font-bold mb-4"
                style={{ color: COLOR.textPrimary }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  ...SPRING_BOUNCY,
                  delay: 0.3,
                }}
              >
                <span
                  style={{ fontFamily: "serif", fontStyle: "italic" }}
                >
                  Z
                </span>{" "}
                = {"{ ..., -3, -2, -1, 0, 1, 2, 3, ... }"}
              </motion.p>
              <motion.p
                className="text-sm"
                style={{ color: `${COLOR.textPrimary}80` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                The integers include all whole numbers — positive, negative,
                and zero.
              </motion.p>
            </motion.div>
          )}

          {/* Notation 2: Absolute Value */}
          {nIdx === 1 && !showSummary && (
            <motion.div
              key="n1"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center gap-8 mb-4">
                <motion.p
                  className="text-xl font-mono font-bold"
                  style={{ color: COLOR.positive }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  |3| = 3
                </motion.p>
                <motion.p
                  className="text-xl font-mono font-bold"
                  style={{ color: COLOR.negative }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  |-3| = 3
                </motion.p>
              </div>
              <motion.p
                className="text-lg font-mono font-bold mb-2"
                style={{ color: COLOR.textPrimary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                |n| ={" "}
                <span style={{ color: COLOR.zero }}>
                  distance from zero
                </span>
              </motion.p>
              <motion.p
                className="text-sm"
                style={{ color: `${COLOR.textPrimary}80` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                Absolute value measures how far a number is from zero —
                always positive or zero.
              </motion.p>
            </motion.div>
          )}

          {/* Notation 3: Opposites */}
          {nIdx === 2 && !showSummary && (
            <motion.div
              key="n2"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-xl font-mono font-bold mb-2"
                style={{ color: COLOR.textPrimary }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  ...SPRING_BOUNCY,
                }}
              >
                Opposite of{" "}
                <span style={{ color: COLOR.positive }}>4</span> ={" "}
                <span style={{ color: COLOR.negative }}>-4</span>
              </motion.p>
              <motion.p
                className="text-lg font-mono font-bold mb-2"
                style={{ color: COLOR.highlight }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Opposite of{" "}
                <span style={{ color: COLOR.highlight }}>n</span> ={" "}
                <span style={{ color: COLOR.highlight }}>-n</span>
              </motion.p>
              <motion.p
                className="text-sm"
                style={{ color: `${COLOR.textPrimary}80` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Flipping across zero gives you the opposite — and
                flipping back returns to the original!
              </motion.p>
            </motion.div>
          )}

          {/* Summary */}
          {showSummary && (
            <motion.div
              key="summary"
              className="text-center space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-base font-mono"
                style={{ color: `${COLOR.textPrimary}b0` }}
              >
                <span
                  style={{ fontFamily: "serif", fontStyle: "italic" }}
                >
                  Z
                </span>{" "}
                = {"{ ..., -3, -2, -1, 0, 1, 2, 3, ... }"}
              </p>
              <p
                className="text-base font-mono"
                style={{ color: `${COLOR.textPrimary}b0` }}
              >
                |n| = distance from zero
              </p>
              <p
                className="text-base font-mono"
                style={{ color: `${COLOR.textPrimary}b0` }}
              >
                Opposite of n = -n
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 z-20">
        {!showSummary ? (
          <PillButton onClick={handleNext}>Next</PillButton>
        ) : (
          <PillButton onClick={onComplete}>Continue</PillButton>
        )}
      </div>
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 5 — REAL-WORLD ANCHOR: Card Carousel
   ═══════════════════════════════════════════════════════════════════════════ */

interface RWCard {
  icon: ReactNode;
  title: string;
  description: string;
  example: string;
  highlights: Array<{ value: number; color: string; label?: string }>;
  lineMin: number;
  lineMax: number;
}

const RW_CARDS: RWCard[] = [
  {
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <rect x={20} y={8} width={8} height={32} rx={4} fill={COLOR.negative} opacity={0.3} />
        <rect x={22} y={24} width={4} height={14} rx={2} fill="#ef4444" />
        <circle cx={24} cy={38} r={5} fill="#ef4444" />
        <line x1={16} y1={24} x2={20} y2={24} stroke={COLOR.zero} strokeWidth={2} />
        <text x={10} y={27} fill={COLOR.zero} fontSize={6} fontFamily="system-ui, sans-serif">0°</text>
      </svg>
    ),
    title: "Temperature",
    description: "Below zero in winter",
    example: "Moscow in January: -15°C",
    highlights: [
      { value: -15, color: COLOR.negative, label: "-15°C" },
      { value: 0, color: COLOR.zero, label: "Freezing" },
    ],
    lineMin: -20,
    lineMax: 10,
  },
  {
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <polygon points="24,4 8,28 40,28" fill={COLOR.positive} opacity={0.4} />
        <rect x={4} y={28} width={40} height={2} fill={COLOR.zero} />
        <rect x={4} y={30} width={40} height={14} fill={COLOR.negative} opacity={0.2} />
        <text x={6} y={26} fill={COLOR.zero} fontSize={5} fontFamily="system-ui, sans-serif">Sea Level</text>
      </svg>
    ),
    title: "Elevation",
    description: "Below sea level",
    example: "Death Valley: -86 m",
    highlights: [
      { value: -86, color: COLOR.negative, label: "-86m" },
      { value: 0, color: COLOR.zero, label: "Sea Level" },
    ],
    lineMin: -100,
    lineMax: 100,
  },
  {
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <rect x={10} y={14} width={28} height={22} rx={4} fill={COLOR.bgCard} stroke={COLOR.textMuted} />
        <circle cx={20} cy={30} r={5} fill={COLOR.positive} opacity={0.5} />
        <circle cx={28} cy={26} r={5} fill={COLOR.negative} opacity={0.5} />
        <text x={26} y={29} fill={COLOR.negative} fontSize={8} fontWeight="bold" fontFamily="system-ui, sans-serif">-</text>
      </svg>
    ),
    title: "Money",
    description: "Owing money means a negative balance",
    example: "You owe $20 → balance is -$20",
    highlights: [
      { value: -20, color: COLOR.negative, label: "-$20" },
      { value: 0, color: COLOR.zero, label: "$0" },
    ],
    lineMin: -30,
    lineMax: 30,
  },
  {
    icon: (
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <rect x={14} y={4} width={20} height={40} rx={2} fill={COLOR.bgCard} stroke={COLOR.textMuted} />
        <rect x={18} y={10} width={12} height={6} rx={1} fill={COLOR.positive} opacity={0.3} />
        <rect x={18} y={22} width={12} height={6} rx={1} fill={COLOR.zero} opacity={0.4} />
        <rect x={18} y={34} width={12} height={6} rx={1} fill={COLOR.negative} opacity={0.3} />
        <text x={22} y={15} fill={COLOR.positive} fontSize={5} fontFamily="system-ui, sans-serif">3</text>
        <text x={22} y={27} fill={COLOR.zero} fontSize={5} fontFamily="system-ui, sans-serif">G</text>
        <text x={20} y={39} fill={COLOR.negative} fontSize={5} fontFamily="system-ui, sans-serif">B2</text>
      </svg>
    ),
    title: "Elevator",
    description: "Parking levels below ground",
    example: "B1 = -1, B2 = -2, B3 = -3",
    highlights: [
      { value: -3, color: COLOR.negative, label: "B3" },
      { value: -2, color: COLOR.negative, label: "B2" },
      { value: -1, color: COLOR.negative, label: "B1" },
      { value: 0, color: COLOR.zero, label: "G" },
      { value: 1, color: COLOR.positive },
      { value: 2, color: COLOR.positive },
      { value: 3, color: COLOR.positive },
    ],
    lineMin: -4,
    lineMax: 5,
  },
];

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [active, setActive] = useState(0);
  const [viewed, setViewed] = useState<Set<number>>(new Set([0]));
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardW = 292; // 280 + 12 gap
    const next = Math.round(scrollLeft / cardW);
    setActive(next);
    setViewed((prev) => new Set([...prev, next]));
  };

  const scrollTo = (i: number) =>
    scrollRef.current?.scrollTo({ left: i * 292, behavior: "smooth" });

  const allViewed = viewed.size >= 4;

  return (
    <StageContainer>
      <h2
        className="text-lg font-semibold mb-4 z-10 px-4 text-center"
        style={{ color: COLOR.textPrimary }}
      >
        Integers in the Real World
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-8 z-10"
        style={{
          maxWidth: "100vw",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={handleScroll}
      >
        {RW_CARDS.map((card, i) => (
          <motion.div
            key={i}
            className="snap-center flex-shrink-0 rounded-xl p-4"
            style={{
              width: 280,
              backgroundColor: COLOR.bgCard,
              border:
                active === i
                  ? `1px solid ${COLOR.accent}60`
                  : "1px solid #33415580",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start gap-3 mb-3">
              {card.icon}
              <div>
                <h3
                  className="font-semibold text-base"
                  style={{ color: COLOR.textPrimary }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: COLOR.textSecondary }}
                >
                  {card.description}
                </p>
              </div>
            </div>
            <p
              className="text-sm font-medium mb-3"
              style={{ color: COLOR.negative }}
            >
              {card.example}
            </p>
            <NumberLineSVG
              min={card.lineMin}
              max={card.lineMax}
              highlights={card.highlights}
              width={248}
              height={56}
            />
          </motion.div>
        ))}
      </div>

      {/* Nav arrows & dots */}
      <div className="flex items-center gap-4 mt-4 z-10">
        <button
          onClick={() => scrollTo(Math.max(0, active - 1))}
          disabled={active === 0}
          style={{
            minWidth: 44,
            minHeight: 44,
            color: active === 0 ? COLOR.textMuted : COLOR.textPrimary,
            fontSize: 24,
          }}
          aria-label="Previous card"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {RW_CARDS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-200"
              style={{
                width: active === i ? 10 : 8,
                height: active === i ? 10 : 8,
                backgroundColor: viewed.has(i)
                  ? active === i
                    ? COLOR.zero
                    : COLOR.positive
                  : COLOR.textMuted,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => scrollTo(Math.min(3, active + 1))}
          disabled={active === 3}
          style={{
            minWidth: 44,
            minHeight: 44,
            color: active === 3 ? COLOR.textMuted : COLOR.textPrimary,
            fontSize: 24,
          }}
          aria-label="Next card"
        >
          ›
        </button>
      </div>

      {!allViewed && (
        <motion.p
          className="text-xs mt-3 z-10"
          style={{ color: `${COLOR.textPrimary}60` }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Swipe to see more examples
        </motion.p>
      )}

      <AnimatePresence>
        {allViewed && (
          <motion.div
            className="mt-6 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...SPRING_BOUNCY }}
          >
            <PillButton onClick={onComplete}>Continue</PillButton>
          </motion.div>
        )}
      </AnimatePresence>
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE: 9 Problems (Recall / Procedure / Understanding)
   ═══════════════════════════════════════════════════════════════════════════ */

/* Shared problem-component prop signature */
interface ProblemProps {
  onCorrect: () => void;
  onIncorrect: () => void;
}

/* ---------- Problem 1: Plot -4 on Number Line ---------- */

function P1PlotNeg4({ onCorrect, onIncorrect }: ProblemProps) {
  const [pos, setPos] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const W = 400;
  const P = 24;
  const LY = 50;
  const toX = (v: number) => P + ((v + 10) / 20) * (W - P * 2);
  const fromX = (x: number) =>
    Math.round(((x - P) / (W - P * 2)) * 20 - 10);

  const bind = useDrag(
    ({ movement: [mx], first, last, memo }) => {
      if (submitted && correct) return memo;
      if (first) return toX(pos);
      const s = (memo as number) ?? toX(pos);
      const v = Math.max(-10, Math.min(10, fromX(s + mx)));
      setPos(v);
      if (last) setPos(v);
      return memo ?? s;
    },
    { axis: "x" },
  );

  const check = () => {
    const a = attempts + 1;
    setAttempts(a);
    if (pos === -4) {
      setCorrect(true);
      setSubmitted(true);
    } else {
      setSubmitted(true);
      if (a >= 3) {
        setPos(-4);
        setCorrect(true);
      } else {
        setTimeout(() => setSubmitted(false), 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p style={{ color: COLOR.textPrimary }}>
        Place the point at <strong>-4</strong> on the number line.
      </p>
      <svg viewBox={`0 0 ${W} 100`} className="w-full max-w-md" style={{ touchAction: "none" }}>
        <line x1={P} y1={LY} x2={W - P} y2={LY} stroke={COLOR.textMuted} strokeWidth={2} />
        {Array.from({ length: 21 }, (_, i) => {
          const v = i - 10;
          return (
            <g key={v}>
              <line x1={toX(v)} y1={LY - 5} x2={toX(v)} y2={LY + 5} stroke={integerColor(v)} strokeWidth={1} />
              <text x={toX(v)} y={LY + 18} textAnchor="middle" fontSize={9} fill={integerColor(v)} fontFamily="system-ui, sans-serif">{v}</text>
            </g>
          );
        })}
        {submitted && !correct && (
          <motion.circle cx={toX(-4)} cy={LY} r={8} fill="none" stroke={COLOR.positive} strokeWidth={2} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1, repeat: 2 }} />
        )}
        <circle cx={toX(pos)} cy={LY} r={20} fill="transparent" {...(bind() as Record<string, unknown>)} style={{ cursor: "grab", touchAction: "none" }} />
        <motion.circle cx={toX(pos)} cy={LY} r={10} animate={{ fill: submitted ? (correct ? COLOR.positive : COLOR.incorrect) : COLOR.highlight }} stroke="white" strokeWidth={2} style={{ pointerEvents: "none" }} />
      </svg>
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm font-medium" style={{ color: correct ? COLOR.positive : COLOR.incorrect }}>
            {correct ? (attempts <= 1 ? "Correct!" : "The answer is -4.") : "Not quite. -4 is here."}
          </p>
          {correct && <PillButton onClick={attempts <= 1 ? onCorrect : onIncorrect}>Next &rarr;</PillButton>}
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check}>Check Answer</PillButton>}
      {!showHint && !submitted && attempts > 0 && (
        <button onClick={() => setShowHint(true)} className="text-xs underline" style={{ color: COLOR.textMuted, minHeight: 44 }}>Hint</button>
      )}
      {showHint && <p className="text-xs px-4 text-center" style={{ color: COLOR.textSecondary }}>Negative numbers are to the LEFT of zero. Count 4 spaces to the left.</p>}
    </div>
  );
}

/* ---------- Problem 2: Opposite of 7 ---------- */

function P2Opposite7({ onCorrect, onIncorrect }: ProblemProps) {
  const [ans, setAns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correct = parseInt(ans, 10) === -7;

  const check = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p style={{ color: COLOR.textPrimary }}>What is the opposite of <strong>7</strong>?</p>
      <NumberLineSVG min={-10} max={10} highlights={[{ value: 7, color: COLOR.positive, label: "7" }]} width={360} height={70} activeHighlight={7} />
      <input type="text" inputMode="numeric" value={ans} onChange={(e) => setAns(e.target.value.replace(/[^0-9-]/g, ""))} placeholder="Type your answer" disabled={submitted} className="rounded-xl px-4 py-3 text-center text-lg font-mono" style={{ backgroundColor: COLOR.bgCard, color: COLOR.textPrimary, border: `1px solid ${submitted ? (correct ? COLOR.positive : COLOR.incorrect) : "#334155"}`, minHeight: 48, width: 200 }} onKeyDown={(e) => { if (e.key === "Enter" && ans) check(); }} />
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm font-medium text-center" style={{ color: correct ? COLOR.positive : COLOR.incorrect }}>{correct ? "Correct! The opposite of 7 is -7." : ans === "7" ? "The opposite is on the OTHER side of zero." : "The opposite of 7 is the same distance from zero, but on the other side: -7"}</p>
          <PillButton onClick={correct ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check} disabled={!ans}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Problem 3: Is It an Integer? ---------- */

function P3IsInteger({ onCorrect, onIncorrect }: ProblemProps) {
  const items: Array<{ display: string; isInt: boolean }> = [
    { display: "-3", isInt: true },
    { display: "2.5", isInt: false },
    { display: "0", isInt: true },
    { display: "1/2", isInt: false },
  ];
  const [ans, setAns] = useState<Record<number, boolean | null>>({ 0: null, 1: null, 2: null, 3: null });
  const [submitted, setSubmitted] = useState(false);
  const allSet = Object.values(ans).every((a) => a !== null);

  const [isOk, setIsOk] = useState(false);

  const check = () => {
    const ok = items.every((it, i) => ans[i] === it.isInt);
    setIsOk(ok);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p style={{ color: COLOR.textPrimary }}>Which of these are integers?</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {items.map((it, i) => {
          const sel = ans[i];
          const ok = submitted ? sel === it.isInt : null;
          return (
            <div key={i} className="rounded-xl p-3 text-center" style={{ backgroundColor: COLOR.bgCard, border: `2px solid ${submitted ? (ok ? COLOR.positive : COLOR.incorrect) : "#334155"}` }}>
              <p className="text-lg font-mono font-bold mb-2" style={{ color: COLOR.textPrimary }}>{it.display}</p>
              <div className="flex gap-2 justify-center">
                <button onClick={() => !submitted && setAns({ ...ans, [i]: true })} className="rounded-lg px-3 py-1.5 text-sm font-medium" style={{ minHeight: 44, backgroundColor: sel === true ? COLOR.positive : "transparent", color: sel === true ? COLOR.bgPrimary : COLOR.textSecondary, border: `1px solid ${sel === true ? COLOR.positive : COLOR.textMuted}` }}>Yes</button>
                <button onClick={() => !submitted && setAns({ ...ans, [i]: false })} className="rounded-lg px-3 py-1.5 text-sm font-medium" style={{ minHeight: 44, backgroundColor: sel === false ? COLOR.incorrect : "transparent", color: sel === false ? "white" : COLOR.textSecondary, border: `1px solid ${sel === false ? COLOR.incorrect : COLOR.textMuted}` }}>No</button>
              </div>
              {submitted && !ok && <p className="text-xs mt-1" style={{ color: COLOR.incorrect }}>{it.isInt ? "This IS an integer" : "Not an integer"}</p>}
            </div>
          );
        })}
      </div>
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-center px-4" style={{ color: COLOR.textSecondary }}>Integers are whole numbers — positive, negative, and zero. No fractions or decimals.</p>
          <PillButton onClick={isOk ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check} disabled={!allSet}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Problem 4: Order Least → Greatest ---------- */

function P4Order({ onCorrect, onIncorrect }: ProblemProps) {
  const correct = [-5, -1, 0, 3, 4];
  const [chips, setChips] = useState(() => {
    const a = [3, -5, 0, -1, 4];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j] as number, a[i] as number];
    }
    return a;
  });
  const [submitted, setSubmitted] = useState(false);
  const [sel, setSel] = useState<number | null>(null);

  const [isOk, setIsOk] = useState(false);

  const check = () => {
    const ok = chips.every((c, i) => c === correct[i]);
    setIsOk(ok);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p style={{ color: COLOR.textPrimary }}>Order from least to greatest: <strong>3, -5, 0, -1, 4</strong></p>
      <p className="text-xs" style={{ color: COLOR.textSecondary }}>Tap two chips to swap them</p>
      <div className="flex gap-2">
        {chips.map((c, i) => {
          const ok = submitted ? c === correct[i] : null;
          return (
            <motion.button key={`${c}-${i}`} className="rounded-xl px-4 py-3 font-mono font-bold text-lg" style={{ minWidth: 52, minHeight: 52, backgroundColor: submitted ? (ok ? `${COLOR.positive}20` : `${COLOR.incorrect}20`) : sel === i ? `${COLOR.accent}40` : COLOR.bgCard, color: integerColor(c), border: `2px solid ${submitted ? (ok ? COLOR.positive : COLOR.incorrect) : sel === i ? COLOR.accent : "transparent"}` }} onClick={() => {
              if (submitted) return;
              if (sel === null) { setSel(i); } else {
                const next = [...chips];
                [next[sel], next[i]] = [next[i] as number, next[sel] as number];
                setChips(next);
                setSel(null);
              }
            }} whileTap={{ scale: 1.1 }}>{c}</motion.button>
          );
        })}
      </div>
      <NumberLineSVG min={-6} max={5} width={320} height={56} />
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm" style={{ color: isOk ? COLOR.positive : COLOR.incorrect }}>{isOk ? "Correct!" : "Correct order: -5, -1, 0, 3, 4. Further LEFT = LESS."}</p>
          <PillButton onClick={isOk ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Problem 5: Which is Greater? -8 or -3 ---------- */

function P5Greater({ onCorrect, onIncorrect }: ProblemProps) {
  const [sel, setSel] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const ok = sel === -3;

  const check = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p style={{ color: COLOR.textPrimary }}>Which is greater: <strong>-8</strong> or <strong>-3</strong>?</p>
      <NumberLineSVG min={-10} max={0} highlights={[{ value: -8, color: COLOR.negative, label: "-8" }, { value: -3, color: "#93c5fd", label: "-3" }]} width={320} height={70} />
      <div className="flex gap-4">
        {[-8, -3].map((v) => (
          <motion.button key={v} className="rounded-xl px-8 py-4 font-mono text-2xl font-bold" style={{ minWidth: 100, minHeight: 64, backgroundColor: COLOR.bgCard, color: COLOR.negative, border: `3px solid ${submitted ? (v === -3 ? COLOR.positive : v === sel ? COLOR.incorrect : "transparent") : sel === v ? COLOR.accent : "transparent"}` }} onClick={() => !submitted && setSel(v)} whileTap={!submitted ? { scale: 0.95 } : undefined}>{v}</motion.button>
        ))}
      </div>
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-center px-4 max-w-xs" style={{ color: ok ? COLOR.positive : COLOR.incorrect }}>{ok ? "Right! -3 is further right on the number line." : "On the number line, -3 is further RIGHT — and further right always means greater."}</p>
          <PillButton onClick={ok ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check} disabled={sel === null}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Problem 6: |-6| ---------- */

function P6AbsVal({ onCorrect, onIncorrect }: ProblemProps) {
  const [ans, setAns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ok = parseInt(ans, 10) === 6;

  const check = () => { setSubmitted(true); };

  return (
    <div className="flex flex-col items-center gap-4">
      <p style={{ color: COLOR.textPrimary }}>What is <strong>|-6|</strong>?</p>
      <NumberLineSVG min={-8} max={8} highlights={[{ value: -6, color: COLOR.negative, label: "-6" }]} width={360} height={70} />
      <input type="text" inputMode="numeric" value={ans} onChange={(e) => setAns(e.target.value.replace(/[^0-9]/g, ""))} placeholder="Distance from zero" disabled={submitted} className="rounded-xl px-4 py-3 text-center text-lg font-mono" style={{ backgroundColor: COLOR.bgCard, color: COLOR.textPrimary, border: `1px solid ${submitted ? (ok ? COLOR.positive : COLOR.incorrect) : "#334155"}`, minHeight: 48, width: 200 }} onKeyDown={(e) => { if (e.key === "Enter" && ans) check(); }} />
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-center px-4 max-w-xs" style={{ color: ok ? COLOR.positive : COLOR.incorrect }}>{ok ? "Correct! |-6| = 6. The absolute value is the distance from zero." : ans === "-6" ? "Almost! Distance is never negative. |-6| = 6." : "|-6| asks: how far is -6 from zero? That's 6 units."}</p>
          <PillButton onClick={ok ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check} disabled={!ans}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Problem 7: Explain -5 < -2 (free text → multiple choice) ---------- */

function P7Explain({ onCorrect, onIncorrect }: ProblemProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { id: "a", text: "Because 5 is bigger than 2, so -5 must also be bigger", correct: false },
    { id: "b", text: "Because -5 is further LEFT on the number line than -2", correct: true },
    { id: "c", text: "Because negative numbers are always less than positive numbers", correct: false },
    { id: "d", text: "Because -5 has more digits than -2", correct: false },
  ];

  const isCorrect = options.find((o) => o.id === selected)?.correct ?? false;

  const check = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <p className="text-center" style={{ color: COLOR.textPrimary }}>Why is <strong>-5 less than -2</strong>?</p>
      <NumberLineSVG min={-6} max={0} highlights={[{ value: -5, color: COLOR.negative, label: "-5" }, { value: -2, color: "#93c5fd", label: "-2" }]} width={300} height={70} />
      <div className="flex w-full flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => !submitted && setSelected(opt.id)}
            disabled={submitted}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all active:scale-[0.98]"
            style={{
              background: submitted
                ? (opt.correct ? `${COLOR.positive}30` : selected === opt.id ? `${COLOR.incorrect}30` : COLOR.bgCard)
                : selected === opt.id ? `${COLOR.accent}30` : COLOR.bgCard,
              border: `2px solid ${submitted ? (opt.correct ? COLOR.positive : selected === opt.id ? COLOR.incorrect : "transparent") : selected === opt.id ? COLOR.accent : "transparent"}`,
              color: COLOR.textPrimary,
              minHeight: 48,
            }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "#334155", color: COLOR.textPrimary }}>
              {opt.id.toUpperCase()}
            </span>
            {opt.text}
          </button>
        ))}
      </div>
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-center" style={{ color: isCorrect ? COLOR.positive : COLOR.incorrect }}>
            {isCorrect ? "Correct! On the number line, further left means less." : "Not quite. On the number line, -5 is further LEFT than -2 — further left always means less."}
          </p>
          <PillButton onClick={isCorrect ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check} disabled={!selected}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Problem 8: Submarine ---------- */

function P8Submarine({ onCorrect, onIncorrect }: ProblemProps) {
  const [risen, setRisen] = useState(false);
  const [ans, setAns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ok = parseInt(ans, 10) === -150;

  const check = () => { setSubmitted(true); };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center px-2" style={{ color: COLOR.textPrimary }}>A submarine is at <strong>-200 m</strong>. It rises 50 m. Where is it now?</p>
      <div className="relative rounded-xl overflow-hidden" style={{ width: 200, height: 180, background: "linear-gradient(180deg, #7dd3fc 0%, #0369a1 30%, #0c4a6e 70%, #082f49 100%)" }}>
        <div className="absolute left-0 right-0" style={{ top: "15%", borderTop: `2px solid ${COLOR.zero}` }}>
          <span className="absolute left-2 -top-4 text-xs font-bold" style={{ color: COLOR.zero }}>Sea Level</span>
        </div>
        <motion.div className="absolute left-1/2 -translate-x-1/2 text-2xl" animate={{ top: risen ? "40%" : "72%" }} transition={{ duration: 1.2, ease: "easeInOut" }}>
          <svg width={40} height={20} viewBox="0 0 40 20" fill={COLOR.negative}><ellipse cx={20} cy={10} rx={18} ry={8} /><polygon points="2,10 -4,6 -4,14" /><rect x={16} y={2} width={3} height={8} rx={1} /></svg>
        </motion.div>
        <span className="absolute right-2 text-xs" style={{ top: "40%", color: COLOR.negative }}>-150m</span>
        <span className="absolute right-2 text-xs" style={{ top: "72%", color: COLOR.negative }}>-200m</span>
      </div>
      {!risen ? <PillButton onClick={() => setRisen(true)} color={COLOR.accent}>Rise 50m</PillButton> : (
        <>
          <input type="text" inputMode="numeric" value={ans} onChange={(e) => setAns(e.target.value.replace(/[^0-9-]/g, ""))} placeholder="Final position" disabled={submitted} className="rounded-xl px-4 py-3 text-center text-lg font-mono" style={{ backgroundColor: COLOR.bgCard, color: COLOR.textPrimary, border: `1px solid ${submitted ? (ok ? COLOR.positive : COLOR.incorrect) : "#334155"}`, minHeight: 48, width: 200 }} onKeyDown={(e) => { if (e.key === "Enter" && ans) check(); }} />
          {submitted && (
            <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm text-center px-4 max-w-xs" style={{ color: ok ? COLOR.positive : COLOR.incorrect }}>{ok ? "Correct! -200 + 50 = -150." : ans === "-250" ? "The submarine ROSE (went UP). -200 + 50 = -150." : ans === "150" ? "It started below sea level! -200 + 50 = -150." : "Start at -200, rise 50: -200 + 50 = -150."}</p>
              <PillButton onClick={ok ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
            </motion.div>
          )}
          {!submitted && <PillButton onClick={check} disabled={!ans}>Check Answer</PillButton>}
        </>
      )}
    </div>
  );
}

/* ---------- Problem 9: Money Balance ---------- */

function P9Money({ onCorrect, onIncorrect }: ProblemProps) {
  const [ans, setAns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ok = parseInt(ans, 10) === -5;
  const [showAnim, setShowAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowAnim(true), 500); return () => clearTimeout(t); }, []);

  const check = () => { setSubmitted(true); };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center px-2" style={{ color: COLOR.textPrimary }}>You have <strong>$10</strong> and spend <strong>$15</strong>. Represent your balance as an integer.</p>
      <motion.div className="rounded-xl px-6 py-4 text-center" style={{ backgroundColor: COLOR.bgCard }} animate={{ borderColor: showAnim ? COLOR.incorrect : COLOR.positive }} transition={{ duration: 1 }}>
        <p className="text-xs mb-1" style={{ color: COLOR.textSecondary }}>Balance</p>
        <motion.p className="text-2xl font-mono font-bold" animate={{ color: showAnim ? COLOR.incorrect : COLOR.positive }} transition={{ duration: 1 }}>{showAnim ? "-$5" : "$10"}</motion.p>
      </motion.div>
      <NumberLineSVG min={-10} max={15} highlights={showAnim ? [{ value: 10, color: COLOR.positive, label: "$10" }, { value: -5, color: COLOR.incorrect, label: "-$5" }] : [{ value: 10, color: COLOR.positive, label: "$10" }]} width={360} height={70} />
      <input type="text" inputMode="numeric" value={ans} onChange={(e) => setAns(e.target.value.replace(/[^0-9-]/g, ""))} placeholder="Your balance" disabled={submitted} className="rounded-xl px-4 py-3 text-center text-lg font-mono" style={{ backgroundColor: COLOR.bgCard, color: COLOR.textPrimary, border: `1px solid ${submitted ? (ok ? COLOR.positive : COLOR.incorrect) : "#334155"}`, minHeight: 48, width: 200 }} onKeyDown={(e) => { if (e.key === "Enter" && ans) check(); }} />
      {submitted && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-center px-4 max-w-xs" style={{ color: ok ? COLOR.positive : COLOR.incorrect }}>{ok ? "Correct! $10 - $15 = -$5." : ans === "5" ? "You owe money — the balance is negative: -5." : "$10 - $15 = -$5."}</p>
          <PillButton onClick={ok ? onCorrect : onIncorrect}>Next &rarr;</PillButton>
        </motion.div>
      )}
      {!submitted && <PillButton onClick={check} disabled={!ans}>Check Answer</PillButton>}
    </div>
  );
}

/* ---------- Practice Stage Orchestrator ---------- */

const PROBLEMS: Array<{
  id: string;
  layer: string;
  Component: (props: ProblemProps) => ReactNode;
}> = [
  { id: "p1", layer: "Recall", Component: P1PlotNeg4 },
  { id: "p2", layer: "Recall", Component: P2Opposite7 },
  { id: "p3", layer: "Recall", Component: P3IsInteger },
  { id: "p4", layer: "Procedure", Component: P4Order },
  { id: "p5", layer: "Procedure", Component: P5Greater },
  { id: "p6", layer: "Procedure", Component: P6AbsVal },
  { id: "p7", layer: "Understanding", Component: P7Explain },
  { id: "p8", layer: "Understanding", Component: P8Submarine },
  { id: "p9", layer: "Understanding", Component: P9Money },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [cur, setCur] = useState(0);
  const [results, setResults] = useState<ProblemResult[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const recordAndAdvance = (correct: boolean) => {
    const p = PROBLEMS[cur];
    if (p) {
      setResults((r) => [
        ...r,
        { problemId: p.id, correct, attempts: 1, hintsUsed: 0, answer: "" },
      ]);
    }
    if (cur < 8) setCur(cur + 1);
    else setShowSummary(true);
  };

  if (showSummary) {
    const correctN = results.filter((r) => r.correct).length;
    const recallOk = results.slice(0, 3).filter((r) => r.correct).length;
    const procOk = results.slice(3, 6).filter((r) => r.correct).length;
    const undOk = results.slice(6, 9).filter((r) => r.correct).length;
    const stars = correctN >= 9 ? 3 : correctN >= 7 ? 2 : correctN >= 5 ? 1 : 0;
    const xp = correctN * 8 + undOk * 8;

    return (
      <StageContainer>
        <motion.div className="z-10 text-center px-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", ...SPRING_BOUNCY }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLOR.textPrimary }}>Practice Complete!</h2>
          <div className="text-3xl mb-4" style={{ color: COLOR.zero }}>
            {Array.from({ length: 3 }, (_, i) => <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>★</span>)}
          </div>
          <p className="text-lg mb-6" style={{ color: COLOR.textSecondary }}>Correct: {correctN}/9 · XP: +{xp}</p>
          <div className="space-y-2 mb-8 w-full max-w-xs mx-auto">
            {([
              { name: "Recall", score: recallOk, max: 3, color: COLOR.negative },
              { name: "Procedure", score: procOk, max: 3, color: COLOR.positive },
              { name: "Understanding", score: undOk, max: 3, color: COLOR.highlight },
            ] as const).map((l) => (
              <div key={l.name} className="flex items-center gap-3">
                <span className="text-xs w-28 text-right" style={{ color: COLOR.textSecondary }}>{l.name}</span>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, backgroundColor: `${COLOR.textPrimary}15` }}>
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: l.color }} initial={{ width: 0 }} animate={{ width: `${(l.score / l.max) * 100}%` }} transition={{ delay: 0.3, duration: 0.6 }} />
                </div>
                <span className="text-xs font-mono" style={{ color: l.color }}>{l.score}/{l.max}</span>
              </div>
            ))}
          </div>
          <PillButton onClick={onComplete}>Continue to Reflection</PillButton>
        </motion.div>
      </StageContainer>
    );
  }

  const prob = PROBLEMS[cur];
  if (!prob) return null;
  const Comp = prob.Component;

  return (
    <StageContainer>
      <div className="z-10 w-full max-w-md mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs" style={{ color: COLOR.textSecondary }}>Problem {cur + 1} of 9</p>
          <p className="text-xs" style={{ color: COLOR.textMuted }}>{prob.layer}</p>
        </div>
        <div className="rounded-full overflow-hidden mb-6" style={{ height: 3, backgroundColor: `${COLOR.textPrimary}15` }}>
          <motion.div className="h-full rounded-full" style={{ backgroundColor: COLOR.positive }} animate={{ width: `${((cur + 1) / 9) * 100}%` }} transition={{ type: "spring", ...SPRING_DEFAULT }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cur} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", ...SPRING_DEFAULT }}>
            <Comp onCorrect={() => recordAndAdvance(true)} onIncorrect={() => recordAndAdvance(false)} />
          </motion.div>
        </AnimatePresence>
      </div>
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 7 — REFLECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const evaluate = (s: string): { score: number; feedback: string } => {
    const l = s.toLowerCase();
    let sc = 1;
    if (l.includes("number line") || l.includes("position")) sc = 2;
    if (l.includes("further left") || l.includes("more to the left") || l.includes("to the left")) sc = 3;
    if ((l.includes("right") && l.includes("greater")) || (l.includes("left") && l.includes("less"))) sc = 4;
    if (sc >= 3 && (l.includes("distance") || l.includes("deeper") || l.includes("floor") || l.includes("temperature"))) sc = 5;
    const fb = sc >= 4 ? "Excellent explanation! You clearly understand how the number line shows which integer is greater." : sc >= 3 ? "Nice! You've grasped the key idea." : "Good effort! Remember: -5 is further LEFT than -2 on the number line.";
    return { score: sc, feedback: fb };
  };

  const submit = () => {
    const r = evaluate(text);
    setScore(r.score);
    setFeedback(r.feedback);
    setSubmitted(true);
  };

  if (showCompletion) {
    return (
      <StageContainer>
        <motion.div className="z-10 text-center px-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", ...SPRING_BOUNCY }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: COLOR.textPrimary }}>Lesson Complete!</h2>
          <p className="text-lg mb-2" style={{ color: COLOR.textSecondary }}>NO-1.2: Integers</p>
          <div className="my-6">
            <NumberLineSVG min={-5} max={5} highlights={Array.from({ length: 11 }, (_, i) => ({ value: i - 5, color: integerColor(i - 5) }))} width={320} height={80} />
          </div>
          <motion.p className="text-2xl font-bold mb-6" style={{ color: COLOR.positive }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring", ...SPRING_BOUNCY }}>+{score >= 4 ? 64 : score >= 3 ? 48 : 32} XP</motion.p>
          <p className="text-sm mb-8" style={{ color: COLOR.textSecondary }}>{"What's next: "}<strong style={{ color: COLOR.textPrimary }}>NO-1.2a: Integer Addition & Subtraction</strong></p>
          <PillButton onClick={onComplete} color={COLOR.accent}>Return to Map</PillButton>
        </motion.div>
      </StageContainer>
    );
  }

  return (
    <StageContainer>
      <div className="z-10 w-full max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold mb-2" style={{ color: COLOR.textPrimary }}>Reflection</h2>
        <p className="text-base mb-4" style={{ color: COLOR.textPrimary }}>Explain why <strong>-5 is less than -2</strong>, even though 5 is greater than 2.</p>
        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="In your own words..." maxLength={500} rows={4} className="w-full rounded-xl px-4 py-3 text-sm resize-none mb-2" style={{ backgroundColor: COLOR.bgCard, color: COLOR.textPrimary, border: "1px solid #334155" }} />
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs" style={{ color: COLOR.textMuted }}>{text.length} / 500</p>
              <p className="text-xs" style={{ color: COLOR.textSecondary }}>Tip: Use what you learned about the number line.</p>
            </div>
            <div className="flex justify-end">
              <PillButton onClick={submit} disabled={text.length < 20} color={COLOR.accent}>Submit</PillButton>
            </div>
          </>
        ) : (
          <motion.div className="rounded-xl p-5" style={{ backgroundColor: COLOR.bgCard, border: "1px solid #334155" }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-base font-semibold mb-3" style={{ color: score >= 4 ? COLOR.positive : score >= 3 ? COLOR.zero : COLOR.textPrimary }}>{score >= 4 ? "Great explanation!" : score >= 3 ? "Good understanding!" : "Nice effort!"}</p>
            <p className="text-sm mb-4" style={{ color: COLOR.textSecondary }}>{feedback}</p>
            <p className="text-lg font-bold mb-4" style={{ color: COLOR.accent }}>XP Earned: +{score >= 4 ? 64 : score >= 3 ? 48 : 32}</p>
            <div className="flex justify-end">
              <PillButton onClick={() => setShowCompletion(true)} color={COLOR.positive}>Complete Lesson</PillButton>
            </div>
          </motion.div>
        )}
      </div>
    </StageContainer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

interface IntegersLessonProps {
  onComplete?: () => void;
}

export function IntegersLesson({ onComplete }: IntegersLessonProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const advanceStage = useCallback((next: Stage) => {
    dispatch({ type: "SET_STAGE", stage: next });
  }, []);

  const handleLessonComplete = useCallback(() => {
    dispatch({ type: "LESSON_COMPLETE" });
    onComplete?.();
  }, [onComplete]);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: COLOR.bgPrimary }}>
      {/* Stage progress */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-2 pb-1" style={{ backgroundColor: `${COLOR.bgPrimary}e0`, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 max-w-lg mx-auto">
          {([1, 2, 3, 4, 5, 6, 7] as const).map((s) => (
            <div key={s} className="flex-1 rounded-full overflow-hidden" style={{ height: 3, backgroundColor: `${COLOR.textPrimary}15` }}>
              <motion.div className="h-full rounded-full" style={{ backgroundColor: s < state.currentStage ? COLOR.positive : s === state.currentStage ? COLOR.zero : "transparent" }} animate={{ width: s < state.currentStage ? "100%" : s === state.currentStage ? "50%" : "0%" }} transition={{ type: "spring", ...SPRING_DEFAULT }} />
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-1" style={{ color: COLOR.textMuted }}>
          {state.currentStage === 1 && "Hook"}
          {state.currentStage === 2 && "Explore"}
          {state.currentStage === 3 && "Discover"}
          {state.currentStage === 4 && "Symbols"}
          {state.currentStage === 5 && "Real World"}
          {state.currentStage === 6 && "Practice"}
          {state.currentStage === 7 && "Reflect"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={state.currentStage} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="pt-12">
          {state.currentStage === 1 && <HookStage onComplete={() => advanceStage(2)} />}
          {state.currentStage === 2 && <SpatialStage onComplete={() => advanceStage(3)} />}
          {state.currentStage === 3 && <DiscoveryStage onComplete={() => advanceStage(4)} />}
          {state.currentStage === 4 && <SymbolBridgeStage onComplete={() => advanceStage(5)} />}
          {state.currentStage === 5 && <RealWorldStage onComplete={() => advanceStage(6)} />}
          {state.currentStage === 6 && <PracticeStage onComplete={() => advanceStage(7)} />}
          {state.currentStage === 7 && <ReflectionStage onComplete={handleLessonComplete} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
