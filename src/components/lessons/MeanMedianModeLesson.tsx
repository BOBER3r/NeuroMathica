"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { Button } from "@/components/ui/Button";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

// ---------------------------------------------------------------------------
// Shared token aliases
// ---------------------------------------------------------------------------

const TEXT_PRIMARY = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const TEXT_MUTED = colors.text.muted;
const SURFACE = colors.bg.secondary;
const SURFACE_DEEP = colors.bg.primary;
const ELEVATED = colors.bg.surface;

const SPRING = springs.default;
const SPRING_GENTLE = springs.gentle;

// ---------------------------------------------------------------------------
// Lesson-specific theme
// ---------------------------------------------------------------------------

const THEME = {
  mean: "#f59e0b",
  meanFill: "#f59e0b33",
  median: "#8b5cf6",
  medianFill: "#8b5cf633",
  mode: "#06b6d4",
  modeFill: "#06b6d433",
  dotsFill: "#818cf880",
  dotStroke: "#6366f1",
  outlier: "#fbbf24",
  primary: "#8b5cf6",
  rose: colors.accent.rose,
  indigo: colors.accent.indigo,
  success: colors.functional.success,
  error: colors.functional.error,
} as const;

// Fulcrum spring — slightly different from default
const SPRING_FULCRUM = { type: "spring" as const, damping: 22, stiffness: 250 };

const INITIAL_DATA = [2, 3, 3, 5, 5, 5, 7, 8];
const NUMBER_LINE_MIN = 0;
const NUMBER_LINE_MAX = 12;
const MAX_DOTS_PER_POSITION = 4;
const MIN_INTERACTIONS = 10;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MeanMedianModeLessonProps {
  onComplete?: () => void;
}

interface Dot {
  id: string;
  value: number;
}

interface MeasureResult {
  mean: number;
  median: number;
  mode: number[] | null;
  modeCount: number;
  sortedValues: number[];
  valueCounts: Map<number, number>;
}

// ---------------------------------------------------------------------------
// Pure math helpers
// ---------------------------------------------------------------------------

let dotIdCounter = 0;
function nextDotId(): string {
  dotIdCounter += 1;
  return `dot-${dotIdCounter}`;
}

function computeMeasures(dots: Dot[]): MeasureResult {
  if (dots.length === 0) {
    return {
      mean: 0,
      median: 0,
      mode: null,
      modeCount: 0,
      sortedValues: [],
      valueCounts: new Map(),
    };
  }

  const values = dots.map((d) => d.value);
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = Math.round((sum / values.length) * 10) / 10;

  let median: number;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1]! + sorted[mid]!) / 2;
  } else {
    median = sorted[mid]!;
  }

  const counts = new Map<number, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }

  let maxCount = 0;
  for (const c of counts.values()) {
    if (c > maxCount) maxCount = c;
  }

  let modeVals: number[] | null = null;
  let modeCount = 0;
  if (maxCount > 1) {
    modeVals = [];
    for (const [val, c] of counts.entries()) {
      if (c === maxCount) modeVals.push(val);
    }
    modeVals.sort((a, b) => a - b);
    modeCount = maxCount;
  }

  return {
    mean,
    median,
    mode: modeVals,
    modeCount,
    sortedValues: sorted,
    valueCounts: counts,
  };
}

function formatMode(mode: number[] | null): string {
  if (!mode) return "None";
  return mode.join(", ");
}

// ---------------------------------------------------------------------------
// Shared micro-components
// ---------------------------------------------------------------------------

function StageProgressDots({
  current,
  total,
  results,
}: {
  current: number;
  total: number;
  results?: Array<boolean | null>;
}) {
  return (
    <div className="flex items-center gap-1.5 justify-center">
      {Array.from({ length: total }, (_, i) => {
        const result = results?.[i];
        let bg: string = ELEVATED;
        let borderColor: string = "transparent";
        if (result === true) bg = THEME.success;
        else if (result === false) bg = THEME.error;
        if (i === current) borderColor = THEME.primary;
        return (
          <div
            key={i}
            className="rounded-full transition-colors duration-200"
            style={{
              width: 12,
              height: 12,
              backgroundColor: bg,
              border: i === current ? `2px solid ${borderColor}` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

function MeasureIcon({
  type,
  size = 16,
}: {
  type: "mean" | "median" | "mode";
  size?: number;
}) {
  if (type === "mean") {
    // Fulcrum triangle
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <polygon
          points="8,2 14,14 2,14"
          fill={THEME.mean}
          stroke={THEME.mean}
          strokeWidth="1"
        />
      </svg>
    );
  }
  if (type === "median") {
    // Diamond (rotated square)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="10"
          height="10"
          fill={THEME.median}
          transform="rotate(45 8 8)"
        />
      </svg>
    );
  }
  // Stacked dots
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <circle cx="8" cy="13" r="2.5" fill={THEME.mode} />
      <circle cx="8" cy="7" r="2.5" fill={THEME.mode} />
      <circle cx="8" cy="1" r="2.5" fill={THEME.mode} opacity="0.5" />
    </svg>
  );
}

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Phase 0: players appear (already shown on mount)
    timers.push(setTimeout(() => setPhase(1), 1600)); // title
    timers.push(setTimeout(() => setPhase(2), 2500)); // outlier
    timers.push(setTimeout(() => setPhase(3), 4000)); // bracket + average
    timers.push(setTimeout(() => setPhase(4), 5500)); // avg line
    timers.push(setTimeout(() => setPhase(5), 5900)); // punchline
    timers.push(setTimeout(() => setPhase(6), 6500)); // question card
    timers.push(setTimeout(() => setPhase(7), 8000)); // continue
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 7)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const players = [
    { height: 120, label: '6\'0"', color: TEXT_MUTED },
    { height: 123, label: '6\'1"', color: TEXT_MUTED },
    { height: 126, label: '6\'2"', color: TEXT_MUTED },
    { height: 129, label: '6\'3"', color: TEXT_MUTED },
    { height: 190, label: '7\'6"', color: THEME.outlier },
  ];

  return (
    <section
      className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite"
    >
      {/* Title */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-6 font-medium"
            style={{
              color: TEXT_SEC,
              fontSize: "clamp(14px, 3.5vw, 18px)",
            }}
          >
            A basketball team&apos;s heights:
          </motion.p>
        )}
      </AnimatePresence>

      {/* Figures */}
      <div className="flex items-end justify-center gap-4 sm:gap-6 md:gap-8 mb-4">
        {players.map((p, i) => {
          const isOutlier = i === 4;
          const show = isOutlier ? phase >= 2 : true;
          if (!show) return <div key={i} style={{ width: 48 }} />;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: isOutlier ? 100 : 12 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={
                isOutlier
                  ? { duration: 0.6, ease: "easeOut" }
                  : {
                      duration: 0.4,
                      ease: "easeOut",
                      delay: i * 0.3,
                    }
              }
              className="flex flex-col items-center"
            >
              {/* Height label */}
              <span
                className="font-mono font-semibold tabular-nums mb-1"
                style={{
                  fontSize: "clamp(12px, 3vw, 16px)",
                  color: p.color === THEME.outlier ? THEME.outlier : TEXT_PRIMARY,
                }}
              >
                {p.label}
              </span>
              {isOutlier && (
                <span
                  className="text-xs italic mb-1"
                  style={{ color: THEME.outlier }}
                >
                  Yao Ming!
                </span>
              )}
              {/* Silhouette (simple rect as stick figure) */}
              <svg
                width={32}
                height={p.height}
                viewBox={`0 0 32 ${p.height}`}
                aria-label={`Player ${p.label}`}
              >
                {/* Head */}
                <circle
                  cx={16}
                  cy={12}
                  r={8}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={2}
                />
                {/* Body */}
                <line
                  x1={16}
                  y1={20}
                  x2={16}
                  y2={p.height * 0.6}
                  stroke={p.color}
                  strokeWidth={2}
                />
                {/* Arms */}
                <line
                  x1={4}
                  y1={p.height * 0.35}
                  x2={28}
                  y2={p.height * 0.35}
                  stroke={p.color}
                  strokeWidth={2}
                />
                {/* Legs */}
                <line
                  x1={16}
                  y1={p.height * 0.6}
                  x2={6}
                  y2={p.height - 2}
                  stroke={p.color}
                  strokeWidth={2}
                />
                <line
                  x1={16}
                  y1={p.height * 0.6}
                  x2={26}
                  y2={p.height - 2}
                  stroke={p.color}
                  strokeWidth={2}
                />
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* Baseline */}
      <div
        style={{
          width: "80%",
          maxWidth: 500,
          height: 1,
          backgroundColor: ELEVATED,
        }}
      />

      {/* Average display */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center mt-4"
          >
            {/* Bracket */}
            <div
              style={{
                width: "70%",
                maxWidth: 400,
                height: 2,
                backgroundColor: THEME.indigo,
                borderRadius: 2,
              }}
            />
            <p
              className="mt-2 font-medium"
              style={{
                color: THEME.indigo,
                fontSize: "clamp(14px, 3vw, 18px)",
              }}
            >
              Average height:
            </p>
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 400 }}
              className="font-extrabold"
              style={{
                color: THEME.indigo,
                fontSize: "clamp(32px, 7vw, 56px)",
                textShadow: "0 0 20px #818cf860",
              }}
            >
              6&apos;5&quot;
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Punchline */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-2 font-semibold italic text-center"
            style={{
              color: THEME.rose,
              fontSize: "clamp(14px, 3.5vw, 18px)",
            }}
          >
            But NOBODY on the team is actually 6&apos;5&quot;!
          </motion.p>
        )}
      </AnimatePresence>

      {/* Question card */}
      <AnimatePresence>
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-6 rounded-xl px-5 py-4 max-w-md text-center"
            style={{
              backgroundColor: SURFACE,
              lineHeight: 1.5,
            }}
          >
            <p
              style={{
                color: TEXT_SEC,
                fontSize: "clamp(14px, 3.5vw, 16px)",
              }}
            >
              Maybe &lsquo;
              <span
                className="font-semibold"
                style={{ color: THEME.indigo }}
              >
                average
              </span>
              &rsquo; isn&apos;t always the best way to describe a group...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      {phase >= 7 && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL EXPERIENCE — Interactive dot plot (SVG-based)
// ===========================================================================

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [dots, setDots] = useState<Dot[]>(() =>
    INITIAL_DATA.map((v) => ({ id: nextDotId(), value: v })),
  );
  const [interactionCount, setInteractionCount] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);
  const _dragState = useRef<string | null>(null); // unused but keeps ref pattern

  const measures = useMemo(() => computeMeasures(dots), [dots]);
  const canContinue =
    interactionCount >= MIN_INTERACTIONS && hasDragged && hasAdded;

  const recordInteraction = useCallback(() => {
    setInteractionCount((c) => c + 1);
  }, []);

  // Get stacks: value -> array of dot ids, sorted bottom to top
  const stacks = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const dot of dots) {
      const arr = map.get(dot.value) ?? [];
      arr.push(dot.id);
      map.set(dot.value, arr);
    }
    return map;
  }, [dots]);

  const addDot = useCallback(() => {
    // Find a position that isn't too crowded
    const candidates: number[] = [];
    for (let i = 1; i <= NUMBER_LINE_MAX; i++) {
      if ((stacks.get(i)?.length ?? 0) < MAX_DOTS_PER_POSITION) {
        candidates.push(i);
      }
    }
    if (candidates.length === 0) return;
    const val = candidates[Math.floor(Math.random() * candidates.length)]!;
    setDots((prev) => [...prev, { id: nextDotId(), value: val }]);
    setHasAdded(true);
    recordInteraction();
  }, [stacks, recordInteraction]);

  const removeLast = useCallback(() => {
    setDots((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
    recordInteraction();
  }, [recordInteraction]);

  const resetDots = useCallback(() => {
    setDots(INITIAL_DATA.map((v) => ({ id: nextDotId(), value: v })));
  }, []);

  // SVG layout constants
  const SVG_W = 600;
  const SVG_H = 220;
  const MARGIN_L = 40;
  const MARGIN_R = 20;
  const LINE_Y = SVG_H - 40;
  const LINE_W = SVG_W - MARGIN_L - MARGIN_R;
  const DOT_R = 10;
  const DOT_GAP = 3;

  const valToX = (v: number) =>
    MARGIN_L +
    ((v - NUMBER_LINE_MIN) / (NUMBER_LINE_MAX - NUMBER_LINE_MIN)) * LINE_W;

  const handleDotClick = (dotId: string, currentVal: number) => {
    const newVal =
      currentVal >= NUMBER_LINE_MAX ? NUMBER_LINE_MIN + 1 : currentVal + 1;
    setDots((prev) =>
      prev.map((d) => (d.id === dotId ? { ...d, value: newVal } : d)),
    );
    setHasDragged(true);
    recordInteraction();
  };

  return (
    <section
      className="flex flex-1 flex-col px-4 py-4 bg-nm-bg-primary"
    >
      {/* Measure readout */}
      <div className="flex justify-center gap-6 mb-4 flex-wrap">
        <span style={{ color: THEME.mean }} className="font-bold">
          Mean: {measures.mean.toFixed(1)}
        </span>
        <span style={{ color: THEME.median }} className="font-bold">
          Median: {measures.median}
        </span>
        <span style={{ color: THEME.mode }} className="font-bold">
          Mode: {formatMode(measures.mode)}
        </span>
      </div>

      <p
        className="text-center text-sm mb-2"
        style={{ color: TEXT_SEC }}
      >
        Tap dots to move them. Add/remove dots to see how measures change.
      </p>

      {/* SVG Dot Plot */}
      <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto w-full">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ maxHeight: 280 }}
          role="img"
          aria-label="Interactive dot plot"
        >
          {/* Number line */}
          <line
            x1={valToX(0)}
            y1={LINE_Y}
            x2={valToX(NUMBER_LINE_MAX)}
            y2={LINE_Y}
            stroke="#64748b"
            strokeWidth={2}
          />

          {/* Tick marks + labels */}
          {Array.from({ length: NUMBER_LINE_MAX + 1 }, (_, i) => (
            <g key={`tick-${i}`}>
              <line
                x1={valToX(i)}
                y1={LINE_Y - 6}
                x2={valToX(i)}
                y2={LINE_Y + 6}
                stroke="#475569"
                strokeWidth={1}
              />
              <text
                x={valToX(i)}
                y={LINE_Y + 20}
                textAnchor="middle"
                fill={TEXT_MUTED}
                fontSize={11}
                fontFamily="monospace"
              >
                {i}
              </text>
            </g>
          ))}

          {/* Mode highlight — cyan rect behind tallest stack */}
          {measures.mode &&
            measures.mode.map((modeVal) => {
              const count = measures.valueCounts.get(modeVal) ?? 0;
              const stackH = count * (DOT_R * 2 + DOT_GAP);
              const cx = valToX(modeVal);
              return (
                <motion.rect
                  key={`mode-hl-${modeVal}`}
                  x={cx - DOT_R - 4}
                  y={LINE_Y - stackH - 4}
                  width={(DOT_R + 4) * 2}
                  height={stackH + 4}
                  rx={4}
                  fill={THEME.modeFill}
                  stroke="#06b6d440"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

          {/* Dots */}
          {Array.from(stacks.entries()).map(([value, ids]) =>
            ids.map((id, stackIdx) => {
              const cx = valToX(value);
              const cy = LINE_Y - DOT_R - stackIdx * (DOT_R * 2 + DOT_GAP);
              return (
                <motion.circle
                  key={id}
                  cx={cx}
                  animate={{ cy }}
                  r={DOT_R}
                  fill={THEME.dotsFill}
                  stroke={THEME.dotStroke}
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                  transition={SPRING}
                  onClick={() => handleDotClick(id, value)}
                  role="button"
                  aria-label={`Dot at value ${value}. Click to change.`}
                  tabIndex={0}
                />
              );
            }),
          )}

          {/* Mean fulcrum — amber triangle below the line */}
          <motion.polygon
            points={`${valToX(measures.mean)},${LINE_Y + 8} ${valToX(measures.mean) - 8},${LINE_Y + 22} ${valToX(measures.mean) + 8},${LINE_Y + 22}`}
            fill={THEME.mean}
            stroke="#d97706"
            strokeWidth={1.5}
            animate={{
              points: `${valToX(measures.mean)},${LINE_Y + 8} ${valToX(measures.mean) - 8},${LINE_Y + 22} ${valToX(measures.mean) + 8},${LINE_Y + 22}`,
            }}
            transition={SPRING_FULCRUM}
            aria-label={`Mean balance point at ${measures.mean}`}
          />
          <motion.text
            x={valToX(measures.mean)}
            animate={{ x: valToX(measures.mean) }}
            y={LINE_Y + 34}
            textAnchor={"middle" as const}
            fill={THEME.mean}
            fontSize={10}
            fontWeight={600}
            transition={SPRING_FULCRUM}
          >
            Mean
          </motion.text>

          {/* Median diamond — purple diamond below the line */}
          <motion.polygon
            points={`${valToX(measures.median)},${LINE_Y + 10} ${valToX(measures.median) - 5},${LINE_Y + 16} ${valToX(measures.median)},${LINE_Y + 22} ${valToX(measures.median) + 5},${LINE_Y + 16}`}
            fill={THEME.median}
            animate={{
              points: `${valToX(measures.median)},${LINE_Y + 10} ${valToX(measures.median) - 5},${LINE_Y + 16} ${valToX(measures.median)},${LINE_Y + 22} ${valToX(measures.median) + 5},${LINE_Y + 16}`,
            }}
            transition={SPRING_FULCRUM}
            aria-label={`Median at ${measures.median}`}
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
        <button
          onClick={addDot}
          className="flex items-center gap-2 rounded-xl px-4 font-semibold"
          style={{
            minWidth: 120,
            height: 48,
            backgroundColor: ELEVATED,
            border: "1px solid #475569",
            color: TEXT_PRIMARY,
            fontSize: 14,
          }}
          aria-label="Add a data point"
        >
          + Add Dot
        </button>
        <button
          onClick={removeLast}
          disabled={dots.length === 0}
          className="flex items-center gap-2 rounded-xl px-4 font-semibold"
          style={{
            minWidth: 120,
            height: 48,
            backgroundColor: ELEVATED,
            border: "1px solid #475569",
            color: TEXT_PRIMARY,
            fontSize: 14,
            opacity: dots.length === 0 ? 0.3 : 1,
            pointerEvents: dots.length === 0 ? "none" : "auto",
          }}
          aria-label="Remove most recent data point"
        >
          - Remove
        </button>
        <button
          onClick={resetDots}
          className="flex items-center gap-1 rounded-xl px-3 font-semibold"
          style={{
            minWidth: 80,
            height: 40,
            backgroundColor: "transparent",
            border: "1px solid #475569",
            color: TEXT_MUTED,
            fontSize: 13,
          }}
          aria-label="Reset data points"
        >
          Reset
        </button>
      </div>

      {/* Interaction counter */}
      <p
        className="text-center text-xs mt-2"
        style={{ color: TEXT_MUTED }}
      >
        Interactions: {interactionCount} / {MIN_INTERACTIONS}
      </p>

      {/* Continue */}
      {canContinue && <ContinueButton onClick={onComplete} />}
    </section>
  );
}

// ===========================================================================
// STAGE 3: GUIDED DISCOVERY
// ===========================================================================

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);

  const advancePrompt = useCallback(() => {
    setPromptIdx((i) => i + 1);
  }, []);

  return (
    <section
      className="flex flex-1 flex-col items-center justify-start px-4 py-6 overflow-y-auto bg-nm-bg-primary"
    >
      <AnimatePresence mode="wait">
        {promptIdx === 0 && (
          <DiscoveryPrompt1
            key="dp1"
            onContinue={advancePrompt}
          />
        )}
        {promptIdx === 1 && (
          <DiscoveryPrompt2
            key="dp2"
            onContinue={advancePrompt}
          />
        )}
        {promptIdx === 2 && (
          <DiscoveryPrompt3
            key="dp3"
            onContinue={advancePrompt}
          />
        )}
        {promptIdx === 3 && (
          <DiscoveryPrompt4
            key="dp4"
            onContinue={advancePrompt}
          />
        )}
        {promptIdx === 4 && (
          <DiscoveryPrompt5
            key="dp5"
            onContinue={onComplete}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// --- Prompt 1: Observation ---

function DiscoveryPrompt1({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [showAnnotations, setShowAnnotations] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowAnnotations(1), 500);
    const t2 = setTimeout(() => setShowAnnotations(2), 1000);
    const t3 = setTimeout(() => setShowAnnotations(3), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={SPRING_GENTLE}
      className="max-w-2xl w-full"
    >
      {/* Mini dot plot display */}
      <MiniDotPlot data={INITIAL_DATA} showMeasures />

      {/* Annotations */}
      <div className="mt-4 space-y-2">
        {showAnnotations >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium"
            style={{ color: THEME.mean }}
          >
            Mean = 4.75 -- the balance point
          </motion.p>
        )}
        {showAnnotations >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium"
            style={{ color: THEME.median }}
          >
            Median = 5 -- the middle value
          </motion.p>
        )}
        {showAnnotations >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium"
            style={{ color: THEME.mode }}
          >
            Mode = 5 -- the most common value
          </motion.p>
        )}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-6 rounded-xl p-4"
        style={{ backgroundColor: SURFACE }}
      >
        <p
          className="leading-relaxed"
          style={{
            color: TEXT_SEC,
            fontSize: 16,
          }}
        >
          This dataset has three ways to describe its &ldquo;
          <strong>center</strong>&rdquo;. Right now, all three are
          telling a similar story -- the center is around 5. But watch what
          happens when one data point goes wild...
        </p>
      </motion.div>

      <ContinueButton onClick={onContinue} label="Show me!" delay={2.5} />
    </motion.div>
  );
}

// --- Prompt 2: Outlier experiment ---

function DiscoveryPrompt2({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [data, setData] = useState([2, 3, 3, 5, 5, 5, 7, 8]);
  const [outlierDone, setOutlierDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const measures = useMemo(() => {
    const dots: Dot[] = data.map((v, i) => ({
      id: `disc-${i}`,
      value: v,
    }));
    return computeMeasures(dots);
  }, [data]);

  const outlierVal = data[7]!;

  const bind = useDrag(
    ({ movement: [mx], active, last }) => {
      if (outlierDone) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pxPerUnit = rect.width / 20;
      const newVal = 8 + mx / pxPerUnit;
      const clamped = Math.max(0, Math.min(20, Math.round(newVal)));

      if (active || last) {
        setData((prev) => {
          const next = [...prev];
          next[7] = clamped;
          return next;
        });
      }

      if (last && clamped >= 16) {
        setOutlierDone(true);
      }
    },
    { filterTaps: true, threshold: 8, axis: "x" },
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={SPRING_GENTLE}
      className="max-w-2xl w-full"
    >
      {/* Instructions */}
      <p
        className="text-center mb-4 font-medium"
        style={{
          color: TEXT_SEC,
          fontSize: 15,
        }}
      >
        Drag the rightmost dot to 20 and watch what happens!
      </p>

      {/* Interactive mini dot plot */}
      <div ref={containerRef} className="relative">
        <MiniDotPlot data={data} showMeasures interactive />
        {/* Draggable overlay for the rightmost dot */}
        {!outlierDone && (
          <div
            {...bind()}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{
              bottom: 32,
              left: `${(outlierVal / 20) * 100}%`,
              width: 48,
              height: 48,
              transform: "translateX(-50%)",
              touchAction: "none",
              zIndex: 20,
            }}
            role="slider"
            aria-label="Drag this dot to explore outlier effect"
            aria-valuenow={outlierVal}
            tabIndex={0}
          />
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {outlierDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl p-4 space-y-2"
            style={{ backgroundColor: SURFACE }}
          >
            <p style={{ color: TEXT_SEC, fontSize: 15 }}>
              Look at that! You moved just ONE data point, and...
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-bold"
              style={{ color: THEME.mean }}
            >
              The mean jumped from 4.75 to {measures.mean}!
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-bold"
              style={{ color: THEME.median }}
            >
              The median stayed right at {measures.median}.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="font-bold"
              style={{ color: THEME.mode }}
            >
              The mode didn&apos;t budge -- still{" "}
              {formatMode(measures.mode)}.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {outlierDone && (
        <ContinueButton
          onClick={onContinue}
          label="Interesting..."
          delay={1.5}
        />
      )}
    </motion.div>
  );
}

// --- Prompt 3: Why? ---

function DiscoveryPrompt3({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={SPRING_GENTLE}
      className="max-w-lg w-full"
    >
      <div
        className="rounded-xl p-5 space-y-4"
        style={{ backgroundColor: SURFACE }}
      >
        <p
          className="leading-relaxed"
          style={{
            color: TEXT_SEC,
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          The mean is like a seesaw&apos;s{" "}
          <strong style={{ color: THEME.mean }}>balance point</strong>.
          One very heavy kid sitting far from the center can tip the whole
          seesaw -- even if there are lots of lighter kids on the other
          side.
        </p>
        <p
          className="leading-relaxed"
          style={{
            color: TEXT_SEC,
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          The median doesn&apos;t care about extreme values. It only cares
          about{" "}
          <strong style={{ color: THEME.median }}>position</strong>:
          &ldquo;Am I the middle one when everyone lines up?&rdquo; Moving
          one person from the end of the line doesn&apos;t change who&apos;s
          in the middle.
        </p>
      </div>

      <ContinueButton onClick={onContinue} label="I see it!" />
    </motion.div>
  );
}

// --- Prompt 4: Matching exercise (simplified to tap-based) ---

function DiscoveryPrompt4({
  onContinue,
}: {
  onContinue: () => void;
}) {
  type MatchKey = "shoes" | "house" | "scores";
  type MeasureKey = "mean" | "median" | "mode";

  const correctMap: Record<MatchKey, MeasureKey> = {
    shoes: "mode",
    house: "median",
    scores: "mean",
  };

  const scenarios: Array<{
    key: MatchKey;
    text: string;
    borderColor: string;
  }> = [
    {
      key: "shoes",
      text: "What shoe size should a store stock the most of?",
      borderColor: THEME.mode,
    },
    {
      key: "house",
      text: "What's a 'typical' home price in a neighborhood with one mansion?",
      borderColor: THEME.median,
    },
    {
      key: "scores",
      text: "A student's test scores: 88, 92, 85, 90, 91. What's their overall performance?",
      borderColor: THEME.mean,
    },
  ];

  const [matches, setMatches] = useState<
    Record<MatchKey, MeasureKey | null>
  >({
    shoes: null,
    house: null,
    scores: null,
  });
  const [activeScenario, setActiveScenario] = useState<MatchKey | null>(null);
  const [wrongFlash, setWrongFlash] = useState<MatchKey | null>(null);
  const [allCorrect, setAllCorrect] = useState(false);

  const selectMeasure = useCallback(
    (measure: MeasureKey) => {
      if (!activeScenario) return;
      if (correctMap[activeScenario] === measure) {
        setMatches((prev) => ({
          ...prev,
          [activeScenario]: measure,
        }));
        setActiveScenario(null);
        // Check if all done
        const updated = { ...matches, [activeScenario]: measure };
        if (
          updated.shoes !== null &&
          updated.house !== null &&
          updated.scores !== null
        ) {
          setAllCorrect(true);
        }
      } else {
        setWrongFlash(activeScenario);
        setTimeout(() => setWrongFlash(null), 600);
      }
    },
    [activeScenario, matches, correctMap],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={SPRING_GENTLE}
      className="max-w-lg w-full"
    >
      <p
        className="text-center mb-4 font-medium"
        style={{
          color: TEXT_SEC,
          fontSize: 16,
        }}
      >
        Match each scenario with the best measure!
      </p>
      <p
        className="text-center mb-4 text-xs"
        style={{ color: TEXT_MUTED }}
      >
        Tap a scenario, then tap the matching measure.
      </p>

      {/* Scenario cards */}
      <div className="space-y-3 mb-6">
        {scenarios.map((s) => {
          const matched = matches[s.key];
          const isActive = activeScenario === s.key;
          const isWrong = wrongFlash === s.key;

          return (
            <motion.button
              key={s.key}
              onClick={() => {
                if (matched) return;
                setActiveScenario(s.key);
              }}
              className="w-full text-left rounded-xl px-4 py-3"
              style={{
                backgroundColor: matched
                  ? `${s.borderColor}20`
                  : SURFACE,
                borderLeft: `3px solid ${
                  matched
                    ? THEME.success
                    : isActive
                      ? TEXT_PRIMARY
                      : s.borderColor
                }`,
                opacity: matched && !isActive ? 0.7 : 1,
                minHeight: 56,
              }}
              animate={
                isWrong
                  ? {
                      x: [0, -6, 6, -4, 4, 0],
                      borderColor: THEME.error,
                    }
                  : {}
              }
              transition={{ duration: 0.4 }}
              disabled={matched !== null}
              aria-label={s.text}
            >
              <span
                style={{
                  color: TEXT_SEC,
                  fontSize: 14,
                }}
              >
                {s.text}
              </span>
              {matched && (
                <span
                  className="ml-2 font-bold text-xs uppercase"
                  style={{ color: THEME.success }}
                >
                  {matched}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Measure buttons */}
      {activeScenario && !allCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 justify-center mb-4"
        >
          {(["mean", "median", "mode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => selectMeasure(m)}
              className="rounded-xl px-5 py-3 font-semibold uppercase text-sm"
              style={{
                backgroundColor: ELEVATED,
                color:
                  m === "mean"
                    ? THEME.mean
                    : m === "median"
                      ? THEME.median
                      : THEME.mode,
                border: `2px dashed ${
                  m === "mean"
                    ? `${THEME.mean}60`
                    : m === "median"
                      ? `${THEME.median}60`
                      : `${THEME.mode}60`
                }`,
                minHeight: 48,
                minWidth: 90,
              }}
              aria-label={`Match with ${m}`}
            >
              {m}
            </button>
          ))}
        </motion.div>
      )}

      {/* Insight */}
      <AnimatePresence>
        {allCorrect && (
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            role="note"
            className="rounded-xl p-4 mt-4"
            style={{
              backgroundColor: "#7c3aed20",
              borderLeft: `4px solid ${THEME.median}`,
            }}
          >
            <p
              className="font-medium leading-relaxed"
              style={{
                color: TEXT_SEC,
                fontSize: 15,
              }}
            >
              <strong>Key Insight:</strong> Mean, median, and mode each
              tell a different story about your data. The right measure
              depends on the data&apos;s shape and the question you&apos;re
              asking.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>

      {allCorrect && <ContinueButton onClick={onContinue} delay={0.5} />}
    </motion.div>
  );
}

// --- Prompt 5: Quick check ---

function DiscoveryPrompt5({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  const handleSelect = useCallback(
    (choice: string) => {
      if (feedback) return;
      setSelected(choice);
      if (choice === "Median") {
        setFeedback({
          correct: true,
          message:
            "The median! The one low score (5) is an outlier that would drag the mean down, but the median ignores it and stays right in the 70-90 range where most students actually scored.",
        });
      } else if (choice === "Mean") {
        setFeedback({
          correct: false,
          message:
            "The mean would be pulled down by that 5. If 24 students scored 80 and one scored 5, the mean drops to about 77. But 24 out of 25 students did better than 77! The mean is misleading here.",
        });
      } else {
        setFeedback({
          correct: false,
          message:
            "Mode would only help if many students scored the exact same number. With scores spread across 70-90, mode might not even exist. Median is more reliable here!",
        });
      }
    },
    [feedback],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={SPRING_GENTLE}
      className="max-w-lg w-full"
    >
      <div
        className="rounded-xl p-5 mb-4"
        style={{ backgroundColor: SURFACE }}
      >
        <p
          className="leading-relaxed"
          style={{
            color: TEXT_SEC,
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          A class of 25 students takes a test. 24 students score between
          70-90, but one student scores 5 (they were sick). Which measure
          best represents the class&apos;s performance?
        </p>
      </div>

      <div className="space-y-3">
        {(["Mean", "Median", "Mode"] as const).map((choice) => {
          const color =
            choice === "Mean"
              ? THEME.mean
              : choice === "Median"
                ? THEME.median
                : THEME.mode;
          let bg: string = ELEVATED;
          if (feedback && selected === choice) {
            bg = feedback.correct ? THEME.success : THEME.error;
          }

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={feedback !== null}
              className="w-full rounded-xl px-4 py-3 text-left font-semibold"
              style={{
                minHeight: 48,
                backgroundColor: bg,
                border: `2px solid ${color}40`,
                color: TEXT_PRIMARY,
                fontSize: 16,
                opacity:
                  feedback && selected !== choice && !feedback.correct
                    ? 0.5
                    : 1,
              }}
              aria-label={choice}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl p-4"
            style={{
              backgroundColor: SURFACE,
              borderLeft: `3px solid ${
                feedback.correct ? THEME.success : THEME.error
              }`,
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: TEXT_SEC }}
            >
              {feedback.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {feedback?.correct && (
        <ContinueButton onClick={onContinue} delay={0.5} />
      )}
      {feedback && !feedback.correct && (
        <div className="mt-4 flex justify-center">
          <Button
            size="md"
            onClick={() => {
              setSelected(null);
              setFeedback(null);
            }}
          >
            Try again
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// --- Mini Dot Plot (used in discovery stages) ---

function MiniDotPlot({
  data,
  showMeasures = false,
  interactive = false,
}: {
  data: number[];
  showMeasures?: boolean;
  interactive?: boolean;
}) {
  const dots: Dot[] = data.map((v, i) => ({
    id: `mini-${i}`,
    value: v,
  }));
  const measures = computeMeasures(dots);
  const max = 20;

  // Build stacks
  const stacks = new Map<number, number>();
  for (const v of data) {
    stacks.set(v, (stacks.get(v) ?? 0) + 1);
  }

  const valToLeft = (val: number) => {
    const frac = val / max;
    // 16px padding on each side; line spans from 16px to calc(100% - 16px)
    // left = 16px + frac * (100% - 32px)
    return `calc(16px + ${frac * 100}% - ${frac * 32}px)`;
  };

  return (
    <div className="w-full" style={{ height: 140 }}>
      <div className="relative w-full h-full px-4">
        {/* Number line */}
        <div
          className="absolute left-4 right-4 bottom-8"
          style={{ height: 2, backgroundColor: "#64748b" }}
        />
        {/* Ticks */}
        {Array.from({ length: max + 1 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: valToLeft(i),
              bottom: 8,
              width: 1,
              height: i % 5 === 0 ? 6 : 3,
              backgroundColor: "#475569",
            }}
          >
            {i % 5 === 0 && (
              <span
                className="absolute font-mono tabular-nums"
                style={{
                  fontSize: 9,
                  color: TEXT_MUTED,
                  bottom: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {i}
              </span>
            )}
          </div>
        ))}

        {/* Dots */}
        {Array.from(stacks.entries()).map(([value, count]) =>
          Array.from({ length: count }, (_, si) => (
            <div
              key={`${value}-${si}`}
              className="absolute"
              style={{
                left: valToLeft(value),
                bottom: 12 + si * 16,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: THEME.dotsFill,
                border: `1.5px solid ${THEME.dotStroke}`,
                transform: "translateX(-50%)",
              }}
            />
          )),
        )}

        {/* Fulcrum */}
        {showMeasures && (
          <motion.div
            className="absolute"
            animate={{
              left: valToLeft(measures.mean),
            }}
            transition={SPRING_FULCRUM}
            style={{
              bottom: 0,
              transform: "translateX(-50%)",
            }}
          >
            <svg width={16} height={10} viewBox="0 0 16 10">
              <polygon
                points="8,0 16,10 0,10"
                fill={THEME.mean}
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Mini readout */}
      {showMeasures && (
        <div className="flex gap-4 justify-center mt-1">
          <span
            className="text-xs font-mono font-bold tabular-nums"
            style={{ color: THEME.mean }}
          >
            Mean: {measures.mean}
          </span>
          <span
            className="text-xs font-mono font-bold tabular-nums"
            style={{ color: THEME.median }}
          >
            Median: {measures.median}
          </span>
          <span
            className="text-xs font-mono font-bold tabular-nums"
            style={{ color: THEME.mode }}
          >
            Mode: {formatMode(measures.mode)}
          </span>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// STAGE 4: SYMBOL BRIDGE
// ===========================================================================

function SymbolBridgeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 500));
    timers.push(setTimeout(() => setStep(2), 3500));
    timers.push(setTimeout(() => setStep(3), 6000));
    timers.push(setTimeout(() => setStep(4), 8000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="flex flex-1 flex-col items-center px-4 py-6 overflow-y-auto bg-nm-bg-primary"
    >
      {/* Mini dot plot */}
      <div className="w-full max-w-xl mb-6">
        <MiniDotPlot data={INITIAL_DATA} showMeasures />
      </div>

      <div className="max-w-lg w-full space-y-4">
        {/* Mean formula */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.meanFill,
                borderLeft: `3px solid ${THEME.mean}`,
              }}
              aria-label="Mean equals the sum of all values divided by the number of values. Equals 2 plus 3 plus 3 plus 5 plus 5 plus 5 plus 7 plus 8, divided by 8, equals 38 over 8, equals 4.75."
            >
              <p
                className="uppercase font-bold text-xs mb-2"
                style={{
                  color: THEME.mean,
                  letterSpacing: "0.5px",
                }}
              >
                Mean
              </p>
              <p
                className="font-mono text-sm mb-1"
                style={{ color: TEXT_PRIMARY }}
              >
                Mean = Sum of all values / Number of values
              </p>
              <p className="font-mono text-sm" style={{ color: TEXT_PRIMARY }}>
                ={" "}
                <span style={{ color: THEME.indigo }}>
                  (2 + 3 + 3 + 5 + 5 + 5 + 7 + 8)
                </span>{" "}
                / 8 = 38 / 8 ={" "}
                <span
                  className="font-bold"
                  style={{ color: THEME.mean }}
                >
                  4.75
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Median formula */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.medianFill,
                borderLeft: `3px solid ${THEME.median}`,
              }}
              aria-label="Median: Sort values from least to greatest. 8 values, so the middle is between positions 4 and 5. Both are 5, so the median is 5."
            >
              <p
                className="uppercase font-bold text-xs mb-2"
                style={{
                  color: THEME.median,
                  letterSpacing: "0.5px",
                }}
              >
                Median
              </p>
              <p
                className="text-sm mb-1"
                style={{ color: TEXT_PRIMARY }}
              >
                Step 1: Sort the values from least to greatest
              </p>
              <p
                className="font-mono text-sm mb-1"
                style={{ color: TEXT_PRIMARY }}
              >
                2, 3, 3, 5,{" "}
                <span
                  className="font-bold underline"
                  style={{ color: THEME.median }}
                >
                  5
                </span>
                , 5, 7, 8
              </p>
              <p
                className="text-sm mb-1"
                style={{ color: TEXT_PRIMARY }}
              >
                Step 2: Find the middle value
              </p>
              <p
                className="font-mono text-sm mb-1"
                style={{ color: TEXT_PRIMARY }}
              >
                8 values -- middle is between positions 4 and 5
              </p>
              <p className="font-mono text-sm" style={{ color: TEXT_PRIMARY }}>
                Median = (5 + 5) / 2 ={" "}
                <span
                  className="font-bold"
                  style={{ color: THEME.median }}
                >
                  5
                </span>
              </p>
              <p
                className="text-xs italic mt-1"
                style={{ color: TEXT_MUTED }}
              >
                (With an even count, average the two middle values)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode formula */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.modeFill,
                borderLeft: `3px solid ${THEME.mode}`,
              }}
              aria-label="Mode equals 5, appearing 3 times, the most of any value."
            >
              <p
                className="uppercase font-bold text-xs mb-2"
                style={{
                  color: THEME.mode,
                  letterSpacing: "0.5px",
                }}
              >
                Mode
              </p>
              <p
                className="text-sm mb-2"
                style={{ color: TEXT_PRIMARY }}
              >
                The value that appears most often
              </p>
              {/* Mini frequency table */}
              <div className="grid grid-cols-5 gap-2 text-center mb-2">
                {[
                  { v: 2, c: 1 },
                  { v: 3, c: 2 },
                  { v: 5, c: 3 },
                  { v: 7, c: 1 },
                  { v: 8, c: 1 },
                ].map((item) => (
                  <div key={item.v}>
                    <div
                      className="text-xs font-mono"
                      style={{ color: TEXT_MUTED }}
                    >
                      {item.v}
                    </div>
                    <div
                      className="text-sm font-mono font-bold"
                      style={{
                        color:
                          item.c === 3
                            ? THEME.mode
                            : TEXT_PRIMARY,
                      }}
                    >
                      {item.c}
                      {item.c === 3 ? " *" : ""}
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-sm" style={{ color: TEXT_PRIMARY }}>
                Mode ={" "}
                <span
                  className="font-bold"
                  style={{ color: THEME.mode }}
                >
                  5
                </span>{" "}
                (appears 3 times)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: SURFACE }}
            >
              <div className="flex justify-center gap-6 mb-3">
                <div className="flex items-center gap-1">
                  <MeasureIcon type="mean" />
                  <span
                    className="text-sm font-bold"
                    style={{ color: THEME.mean }}
                  >
                    Mean = 4.75
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MeasureIcon type="median" />
                  <span
                    className="text-sm font-bold"
                    style={{ color: THEME.median }}
                  >
                    Median = 5
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MeasureIcon type="mode" />
                  <span
                    className="text-sm font-bold"
                    style={{ color: THEME.mode }}
                  >
                    Mode = 5
                  </span>
                </div>
              </div>
              <p
                className="text-sm italic"
                style={{ color: TEXT_SEC }}
              >
                All three are close here -- but add an outlier and watch
                the mean fly away!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step >= 4 && <ContinueButton onClick={onComplete} delay={1} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL-WORLD ANCHOR
// ===========================================================================

function RealWorldStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const cards: Array<{
    title: string;
    body: string;
    badge: string;
    badgeColor: string;
    iconColor: string;
  }> = [
    {
      title: "Why Job Sites Show Median Salary",
      body: "A company has 9 employees earning $50K each and a CEO earning $5 million. The mean salary is $545K -- making the company sound way richer than it is. The median is $50K -- much more honest. That's why salary websites report median income!",
      badge: "Median",
      badgeColor: THEME.median,
      iconColor: THEME.median,
    },
    {
      title: "The Most Popular Shoe Size",
      body: "A shoe store needs to decide which sizes to stock the most. Mean shoe size is 8.3 -- but nobody wears size 8.3! The store really wants the mode -- size 9, the one bought most often. Mode is the best measure for 'what's most popular.'",
      badge: "Mode",
      badgeColor: THEME.mode,
      iconColor: THEME.mode,
    },
    {
      title: "Your Gaming Average",
      body: "You play 5 rounds of a game and score: 120, 135, 128, 140, 132. No outliers, no repeats. Mean gives you the best summary: 131 points per round. When data is spread evenly without extreme values, mean is the most useful measure!",
      badge: "Mean",
      badgeColor: THEME.mean,
      iconColor: THEME.mean,
    },
    {
      title: "What's the Class Favorite?",
      body: "You survey your class for their favorite color. Results: Blue (12), Red (7), Green (5), Purple (4). You can't calculate the mean or median of colors -- they're not numbers! The mode (Blue) is the only measure that works for categories.",
      badge: "Mode",
      badgeColor: THEME.mode,
      iconColor: THEME.mode,
    },
  ];

  return (
    <section
      className="flex flex-1 flex-col items-center px-4 py-6 overflow-y-auto bg-nm-bg-primary"
    >
      <div className="max-w-xl w-full space-y-4">
        {cards.map((card, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: i * 0.2,
            }}
            className="rounded-2xl p-5 relative"
            style={{ backgroundColor: SURFACE }}
            role="article"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${card.iconColor}20`,
                }}
                aria-hidden="true"
              >
                <MeasureIcon
                  type={
                    card.badge === "Mean"
                      ? "mean"
                      : card.badge === "Median"
                        ? "median"
                        : "mode"
                  }
                  size={20}
                />
              </div>
              <div className="flex-1">
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: TEXT_PRIMARY }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: TEXT_SEC,
                    lineHeight: 1.6,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </div>
            {/* Badge */}
            <span
              className="absolute bottom-3 right-4 text-xs font-bold uppercase px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${card.badgeColor}20`,
                color: card.badgeColor,
              }}
              aria-label={`Best measure for this scenario: ${card.badge}`}
            >
              {card.badge}
            </span>
          </motion.article>
        ))}
      </div>

      <ContinueButton onClick={onComplete} delay={cards.length * 0.2 + 0.5} />
    </section>
  );
}

// ===========================================================================
// STAGE 6: PRACTICE
// ===========================================================================

function PracticeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<Array<boolean | null>>(
    Array.from({ length: 9 }, () => null),
  );
  const [done, setDone] = useState(false);

  const advanceProblem = useCallback(
    (correct: boolean) => {
      setResults((prev) => {
        const next = [...prev];
        next[currentIdx] = correct;
        return next;
      });
    },
    [currentIdx],
  );

  const goNext = useCallback(() => {
    if (currentIdx >= 8) {
      setDone(true);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }, [currentIdx]);

  if (done) {
    const correctCount = results.filter((r) => r === true).length;
    return (
      <section
        className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p
            className="text-3xl font-bold mb-2"
            style={{ color: TEXT_PRIMARY }}
          >
            {correctCount} / 9
          </p>
          <p
            className="text-sm mb-6"
            style={{ color: TEXT_SEC }}
          >
            {correctCount >= 7
              ? "Excellent work!"
              : correctCount >= 5
                ? "Good job! Keep practicing."
                : "Keep going -- you'll get there!"}
          </p>
          <ContinueButton onClick={onComplete} />
        </motion.div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-1 flex-col items-center px-4 py-6 bg-nm-bg-primary"
    >
      {/* Progress dots */}
      <div className="mb-4">
        <StageProgressDots
          current={currentIdx}
          total={9}
          results={results}
        />
        <p
          className="text-center text-xs mt-2"
          style={{ color: TEXT_MUTED }}
        >
          Problem {currentIdx + 1} of 9
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={SPRING_GENTLE}
          className="max-w-xl w-full"
        >
          {currentIdx === 0 && (
            <Problem1 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 1 && (
            <Problem2 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 2 && (
            <Problem3 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 3 && (
            <Problem4 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 4 && (
            <Problem5 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 5 && (
            <Problem6 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 6 && (
            <Problem7 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 7 && (
            <Problem8 onResult={advanceProblem} onNext={goNext} />
          )}
          {currentIdx === 8 && (
            <Problem9 onResult={advanceProblem} onNext={goNext} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// --- Shared Problem Shell ---

function ProblemShell({
  layerLabel,
  prompt,
  children,
  feedback,
  onNext,
}: {
  layerLabel: string;
  prompt: string;
  children: React.ReactNode;
  feedback: { correct: boolean; message: string } | null;
  onNext: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: SURFACE }}
    >
      <span
        className="text-xs font-bold uppercase px-2 py-1 rounded-full mb-3 inline-block"
        style={{
          backgroundColor: `${THEME.primary}20`,
          color: THEME.primary,
          letterSpacing: "0.5px",
        }}
      >
        {layerLabel}
      </span>
      <p
        className="font-medium mb-4 leading-relaxed"
        style={{
          color: TEXT_PRIMARY,
          fontSize: 16,
        }}
      >
        {prompt}
      </p>

      {children}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-lg p-3"
            style={{
              borderLeft: `3px solid ${
                feedback.correct ? THEME.success : THEME.error
              }`,
              backgroundColor: SURFACE_DEEP,
            }}
            aria-live="assertive"
          >
            <div className="flex items-start gap-2">
              <span
                style={{
                  color: feedback.correct
                    ? THEME.success
                    : THEME.error,
                  fontSize: 16,
                }}
              >
                {feedback.correct ? "Correct!" : "Not quite."}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mt-1"
              style={{ color: TEXT_SEC }}
              aria-live="polite"
            >
              {feedback.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button (only after feedback) */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <Button size="md" onClick={onNext} className="w-full">
            Next
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// --- Multiple Choice Helper ---

function MCOptions({
  options,
  selected,
  correctAnswer,
  feedback,
  onSelect,
}: {
  options: Array<{ label: string; color?: string }>;
  selected: string | null;
  correctAnswer: string;
  feedback: { correct: boolean; message: string } | null;
  onSelect: (label: string) => void;
}) {
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="space-y-2">
      {options.map((opt, i) => {
        const letter = letters[i]!;
        const isSelected = selected === opt.label;
        let bg: string = ELEVATED;
        if (feedback && isSelected) {
          bg = feedback.correct ? THEME.success : THEME.error;
        } else if (feedback && opt.label === correctAnswer && !feedback.correct) {
          bg = `${THEME.success}40`;
        }

        return (
          <button
            key={opt.label}
            onClick={() => onSelect(opt.label)}
            disabled={feedback !== null}
            className="w-full text-left rounded-xl px-4 py-3 flex items-center gap-3"
            style={{
              minHeight: 52,
              backgroundColor: bg,
              fontSize: 16,
              color: TEXT_PRIMARY,
              opacity: feedback && !isSelected && opt.label !== correctAnswer ? 0.5 : 1,
            }}
            aria-label={`${letter}: ${opt.label}`}
          >
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: `${THEME.primary}30`,
                color: TEXT_PRIMARY,
              }}
            >
              {letter}
            </span>
            <span className="font-semibold">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// --- Problem 1: Identify the measure (MC) ---

function Problem1({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handleSelect = useCallback(
    (label: string) => {
      if (feedback) return;
      setSelected(label);
      const correct = label === "Mean";
      const message = correct
        ? "The mean is calculated by adding all values and dividing by the count. It's like finding the balance point of your data."
        : label === "Median"
          ? "Not quite. The median is the middle value when data is sorted -- no adding or dividing needed! The measure that involves adding and dividing is the mean."
          : "Not quite. The mode is the most frequent value -- just count which number appears most! The measure that involves adding and dividing is the mean.";
      setFeedback({ correct, message });
      if (!reported.current) {
        onResult(correct);
        reported.current = true;
      }
    },
    [feedback, onResult],
  );

  return (
    <ProblemShell
      layerLabel="Recall"
      prompt="Which measure of center is found by adding all the values and dividing by how many there are?"
      feedback={feedback}
      onNext={onNext}
    >
      <MCOptions
        options={[
          { label: "Mean" },
          { label: "Median" },
          { label: "Mode" },
        ]}
        selected={selected}
        correctAnswer="Mean"
        feedback={feedback}
        onSelect={handleSelect}
      />
    </ProblemShell>
  );
}

// --- Problem 2: Find the Mode (Tap) ---

function Problem2({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const data = [1, 3, 3, 5, 7, 7, 7, 9];
  const [tapped, setTapped] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  // Build stacks
  const stacks = new Map<number, number>();
  for (const v of data) {
    stacks.set(v, (stacks.get(v) ?? 0) + 1);
  }

  const handleTap = useCallback(
    (value: number) => {
      if (feedback) return;
      setTapped(value);
      const correct = value === 7;
      const message = correct
        ? "That's right! 7 appears 3 times -- more than any other value. That makes it the mode."
        : `${value} appears ${stacks.get(value) ?? 0} time(s), but look for the value that appears the MOST. Which stack has the most dots?`;
      setFeedback({ correct, message });
      if (!reported.current) {
        onResult(correct);
        reported.current = true;
      }
    },
    [feedback, onResult, stacks],
  );

  return (
    <ProblemShell
      layerLabel="Recall"
      prompt="Tap the MODE of this dataset:"
      feedback={feedback}
      onNext={onNext}
    >
      <div
        className="relative w-full mb-4"
        style={{ height: 120 }}
      >
        {/* Mini number line */}
        <div
          className="absolute left-4 right-4 bottom-6"
          style={{ height: 2, backgroundColor: "#64748b" }}
        />
        {/* Stacks */}
        {Array.from(stacks.entries()).map(([value, count]) => {
          const frac = value / 10;
          const isCorrect = value === 7;
          const isTapped = tapped === value;
          let borderColor: string = "transparent";
          if (feedback && isTapped) {
            borderColor = feedback.correct
              ? THEME.success
              : THEME.error;
          }

          return (
            <button
              key={value}
              onClick={() => handleTap(value)}
              disabled={feedback !== null}
              className="absolute flex flex-col-reverse items-center"
              style={{
                left: `calc(16px + ${frac * 100}% - ${frac * 32}px)`,
                bottom: 10,
                transform: "translateX(-50%)",
                minWidth: 44,
                minHeight: 44,
                outline:
                  borderColor !== "transparent"
                    ? `3px solid ${borderColor}`
                    : "none",
                borderRadius: 8,
                padding: 4,
              }}
              aria-label={`Value ${value}, appears ${count} times`}
            >
              {Array.from({ length: count }, (_, si) => (
                <div
                  key={si}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor:
                      feedback && isCorrect
                        ? THEME.modeFill
                        : THEME.dotsFill,
                    border: `1.5px solid ${THEME.dotStroke}`,
                    marginBottom: 2,
                  }}
                />
              ))}
              <span
                className="text-xs font-mono mt-1 tabular-nums"
                style={{ color: TEXT_MUTED }}
              >
                {value}
              </span>
            </button>
          );
        })}
      </div>
    </ProblemShell>
  );
}

// --- Problem 3: True/False ---

function Problem3({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handleSelect = useCallback(
    (choice: string) => {
      if (feedback) return;
      setSelected(choice);
      const correct = choice === "TRUE";
      const message = correct
        ? "True! You MUST sort first. Without sorting, the 'middle number' could be any value depending on the order you wrote them down."
        : "Actually, sorting IS required! Look at the unsorted list: 8, 2, 5, 1, 9. The middle number appears to be 5, but that's just luck. Try 8, 2, 1, 5, 9 -- now the middle position has 1, which isn't the true center at all.";
      setFeedback({ correct, message });
      if (!reported.current) {
        onResult(correct);
        reported.current = true;
      }
    },
    [feedback, onResult],
  );

  return (
    <ProblemShell
      layerLabel="Recall"
      prompt="True or False: To find the median, you must sort the data from least to greatest first."
      feedback={feedback}
      onNext={onNext}
    >
      {/* Visual */}
      <div className="flex items-center gap-4 justify-center mb-4">
        <div className="text-center">
          <p
            className="text-xs mb-1"
            style={{ color: TEXT_MUTED }}
          >
            Unsorted
          </p>
          <div className="flex gap-1">
            {[8, 2, 5, 1, 9].map((n, i) => (
              <span
                key={i}
                className="inline-block rounded-lg px-2 py-1 text-sm font-mono font-semibold"
                style={{
                  backgroundColor: ELEVATED,
                  color: TEXT_PRIMARY,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
        <span style={{ color: TEXT_MUTED, fontSize: 20 }}>
          ?
        </span>
        <div className="text-center">
          <p
            className="text-xs mb-1"
            style={{ color: TEXT_MUTED }}
          >
            Sorted
          </p>
          <div className="flex gap-1">
            {[1, 2, 5, 8, 9].map((n, i) => (
              <span
                key={i}
                className="inline-block rounded-lg px-2 py-1 text-sm font-mono font-semibold"
                style={{
                  backgroundColor:
                    n === 5 ? `${THEME.median}40` : ELEVATED,
                  color: TEXT_PRIMARY,
                  border:
                    n === 5
                      ? `2px solid ${THEME.median}`
                      : "none",
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center">
        {["TRUE", "FALSE"].map((choice) => {
          let bg: string = ELEVATED;
          if (feedback && selected === choice) {
            bg = feedback.correct ? THEME.success : THEME.error;
          }
          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={feedback !== null}
              className="rounded-xl px-6 py-3 font-bold text-lg"
              style={{
                minHeight: 48,
                minWidth: 140,
                backgroundColor: bg,
                color: TEXT_PRIMARY,
              }}
              aria-label={choice}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </ProblemShell>
  );
}

// --- Problem 4: Calculate the Mean (Numeric) ---

function Problem4({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handleCheck = useCallback(() => {
    if (feedback) return;
    const val = parseFloat(input);
    const correct = Math.abs(val - 6) < 0.01;
    let message: string;
    if (correct) {
      message =
        "The mean is 6. You added all 5 values to get 30, then divided by 5.";
    } else if (Math.abs(val - 30) < 0.01) {
      message =
        "That's the sum, not the mean! Now divide 30 by the number of values (5).";
    } else if (Math.abs(val - 5) < 0.01) {
      message =
        "That's the count, not the mean! Add all the values first, then divide by 5.";
    } else {
      message =
        "Not quite. Add up all the values: 4 + 7 + 10 + 3 + 6 = 30. Then divide by how many values there are: 30 / 5 = ?";
    }
    setFeedback({ correct, message });
    if (!reported.current) {
      onResult(correct);
      reported.current = true;
    }
  }, [input, feedback, onResult]);

  return (
    <ProblemShell
      layerLabel="Procedure"
      prompt="Calculate the mean of this dataset: 4, 7, 10, 3, 6"
      feedback={feedback}
      onNext={onNext}
    >
      {/* Values display */}
      <div className="flex gap-2 justify-center mb-3 flex-wrap">
        {[4, 7, 10, 3, 6].map((n, i) => (
          <span
            key={i}
            className="inline-block rounded-lg px-3 py-1 font-mono font-semibold text-lg"
            style={{
              backgroundColor: `${THEME.indigo}20`,
              color: THEME.indigo,
            }}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Scaffold */}
      <div
        className="text-sm font-mono mb-4 space-y-1 p-3 rounded-lg"
        style={{
          backgroundColor: SURFACE_DEEP,
          color: TEXT_MUTED,
        }}
      >
        <p>Sum: 4 + 7 + 10 + 3 + 6 = {feedback?.correct ? <strong style={{ color: TEXT_PRIMARY }}>30</strong> : "___"}</p>
        <p>Count: 5 values</p>
        <p>Mean: {feedback?.correct ? <><strong style={{ color: TEXT_PRIMARY }}>30</strong> / <strong style={{ color: TEXT_PRIMARY }}>5</strong> = <strong style={{ color: THEME.mean }}>6</strong></> : "___ / 5 = ___"}</p>
      </div>

      {/* Input */}
      {!feedback && (
        <div className="flex items-center gap-3 justify-center">
          <input
            type="number"
            step="0.1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="?"
            className="rounded-xl text-center font-mono text-2xl tabular-nums"
            style={{
              width: 120,
              height: 52,
              border: `2px solid #475569`,
              backgroundColor: SURFACE_DEEP,
              color: TEXT_PRIMARY,
              outline: "none",
            }}
            aria-label="Enter the mean value"
          />
          <Button
            size="md"
            onClick={handleCheck}
            disabled={input.trim() === ""}
          >
            Check
          </Button>
        </div>
      )}
    </ProblemShell>
  );
}

// --- Problem 5: Find the Median (simplified: sort then pick) ---

function Problem5({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const unsorted = [12, 5, 8, 15, 3, 8, 20];
  const sorted = [3, 5, 8, 8, 12, 15, 20];
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [remaining, setRemaining] = useState<number[]>([...unsorted]);
  const [sortCorrect, setSortCorrect] = useState(false);
  const [tappedMedian, setTappedMedian] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handlePickNumber = useCallback(
    (val: number, idx: number) => {
      if (sortCorrect) return;
      const expectedIdx = userOrder.length;
      const expectedVal = sorted[expectedIdx];
      // Find the correct value at this position
      if (val === expectedVal) {
        setUserOrder((prev) => [...prev, val]);
        setRemaining((prev) => {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        });
        if (expectedIdx === 6) {
          // All sorted
          setSortCorrect(true);
        }
      }
    },
    [sortCorrect, userOrder.length, sorted],
  );

  const handleTapMedian = useCallback(
    (val: number) => {
      if (feedback) return;
      setTappedMedian(val);
      const correct = val === 8;
      const message = correct
        ? "The median is 8! With 7 values sorted, the middle is the 4th value. Notice there are exactly 3 values less than 8 and 3 values greater than 8."
        : "That's not the middle position. Count: with 7 values, the middle is at position (7+1)/2 = 4th. Which value is in the 4th slot?";
      setFeedback({ correct, message });
      if (!reported.current) {
        onResult(correct);
        reported.current = true;
      }
    },
    [feedback, onResult],
  );

  return (
    <ProblemShell
      layerLabel="Procedure"
      prompt="Find the median. Tap the values from least to greatest to sort them, then tap the middle value."
      feedback={feedback}
      onNext={onNext}
    >
      {/* Remaining values to pick from */}
      {!sortCorrect && (
        <div className="mb-3">
          <p
            className="text-xs mb-2"
            style={{ color: TEXT_MUTED }}
          >
            Tap values in order (least to greatest):
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {remaining.map((val, idx) => (
              <button
                key={`rem-${idx}`}
                onClick={() => handlePickNumber(val, idx)}
                className="rounded-xl font-mono font-semibold text-lg"
                style={{
                  width: 56,
                  height: 48,
                  backgroundColor: ELEVATED,
                  color: TEXT_PRIMARY,
                  minHeight: 44,
                  minWidth: 44,
                }}
                aria-label={`Pick ${val}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sorted order */}
      <div className="flex gap-1 justify-center mb-4">
        {Array.from({ length: 7 }, (_, i) => {
          const val = userOrder[i];
          const isFilled = val !== undefined;
          const isMiddle = i === 3 && sortCorrect;

          return (
            <motion.button
              key={i}
              onClick={() => {
                if (sortCorrect && isFilled && val !== undefined) {
                  handleTapMedian(val);
                }
              }}
              disabled={!sortCorrect || feedback !== null}
              layout
              className="rounded-xl font-mono font-semibold text-lg flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                backgroundColor: isFilled
                  ? feedback && tappedMedian === val
                    ? feedback.correct
                      ? `${THEME.success}40`
                      : `${THEME.error}40`
                    : isMiddle
                      ? `${THEME.median}30`
                      : ELEVATED
                  : "transparent",
                border: isFilled
                  ? isMiddle
                    ? `2px solid ${THEME.median}`
                    : `1px solid #475569`
                  : "2px dashed #475569",
                color: TEXT_PRIMARY,
                minHeight: 44,
                minWidth: 44,
              }}
              aria-label={
                isFilled
                  ? `Position ${i + 1}: ${val}`
                  : `Empty slot ${i + 1}`
              }
            >
              {isFilled ? val : ""}
            </motion.button>
          );
        })}
      </div>

      {sortCorrect && !feedback && (
        <p
          className="text-center text-sm font-medium mb-2"
          style={{ color: THEME.median }}
        >
          Now tap the middle value!
        </p>
      )}
    </ProblemShell>
  );
}

// --- Problem 6: Choose the Best Measure (MC) ---

function Problem6({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handleSelect = useCallback(
    (label: string) => {
      if (feedback) return;
      setSelected(label);
      const correct = label === "Mode";
      let message: string;
      if (correct) {
        message =
          "Mode! The restaurant wants the most common order -- that's exactly what mode measures.";
      } else if (label === "Mean") {
        message =
          "The mean would tell her the average number of orders across all dishes (40.75), but that doesn't tell her WHICH dish to prepare more of! She needs the most popular dish -- that's the mode.";
      } else {
        message =
          "The median would give her the middle dish by popularity. But she doesn't need the 'middle' -- she needs the 'most.' The mode tells her which dish is ordered most often.";
      }
      setFeedback({ correct, message });
      if (!reported.current) {
        onResult(correct);
        reported.current = true;
      }
    },
    [feedback, onResult],
  );

  return (
    <ProblemShell
      layerLabel="Procedure"
      prompt="A restaurant owner wants to know the most commonly ordered dish so she can prepare more of it. Which measure should she use?"
      feedback={feedback}
      onNext={onNext}
    >
      {/* Bar chart */}
      <div className="flex items-end gap-2 justify-center mb-4 h-24">
        {[
          { label: "Pasta", count: 45 },
          { label: "Salad", count: 32 },
          { label: "Burger", count: 58 },
          { label: "Soup", count: 28 },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center"
          >
            <span
              className="text-xs font-mono tabular-nums mb-1"
              style={{ color: TEXT_MUTED }}
            >
              {item.count}
            </span>
            <div
              className="rounded-t"
              style={{
                width: 40,
                height: (item.count / 58) * 80,
                backgroundColor:
                  item.count === 58
                    ? `${THEME.mode}60`
                    : THEME.dotsFill,
              }}
            />
            <span
              className="text-xs mt-1"
              style={{
                color: TEXT_MUTED,
                fontSize: 10,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <MCOptions
        options={[
          { label: "Mean" },
          { label: "Median" },
          { label: "Mode" },
        ]}
        selected={selected}
        correctAnswer="Mode"
        feedback={feedback}
        onSelect={handleSelect}
      />
    </ProblemShell>
  );
}

// --- Problem 7: Outlier Detection (Two-part) ---

function Problem7({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const data = [10, 11, 12, 12, 13, 50];
  const [selectedOutlier, setSelectedOutlier] = useState<
    number | null
  >(null);
  const [selectedMeasure, setSelectedMeasure] = useState<
    string | null
  >(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handleTapDot = useCallback(
    (val: number) => {
      if (selectedMeasure || feedback) return;
      setSelectedOutlier(val);
    },
    [selectedMeasure, feedback],
  );

  const handleSelectMeasure = useCallback(
    (label: string) => {
      if (feedback) return;
      setSelectedMeasure(label);
      const outlierCorrect = selectedOutlier === 50;
      const measureCorrect = label === "Mean";
      const bothCorrect = outlierCorrect && measureCorrect;

      let message: string;
      if (bothCorrect) {
        message =
          "50 is the outlier -- it's far from the other values (10-13). It pulls the mean from 11.6 all the way to 18.0! The median barely changes, and the mode stays at 12 no matter what.";
      } else if (!outlierCorrect) {
        message =
          "That value is close to the others. An outlier is a value that's far away from the rest. Look for the one that doesn't fit!";
      } else {
        message =
          "The outlier affects the mean the most because mean uses every value in its calculation. Median only cares about position (middle), and mode only cares about frequency.";
      }

      setFeedback({ correct: bothCorrect, message });
      if (!reported.current) {
        onResult(bothCorrect);
        reported.current = true;
      }
    },
    [selectedOutlier, feedback, onResult],
  );

  return (
    <ProblemShell
      layerLabel="Understanding"
      prompt="The dataset is: 10, 12, 11, 13, 12, 50. Tap the outlier, then choose which measure it affects MOST."
      feedback={feedback}
      onNext={onNext}
    >
      {/* Dot display */}
      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {data.map((val, i) => (
          <button
            key={i}
            onClick={() => handleTapDot(val)}
            disabled={selectedMeasure !== null}
            className="rounded-full font-mono font-semibold flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              backgroundColor:
                selectedOutlier === val
                  ? `${THEME.outlier}40`
                  : ELEVATED,
              border:
                selectedOutlier === val
                  ? `2px solid ${THEME.outlier}`
                  : "1px solid #475569",
              color: TEXT_PRIMARY,
              minHeight: 44,
              minWidth: 44,
            }}
            aria-label={`Value ${val}`}
          >
            {val}
          </button>
        ))}
      </div>

      {/* Measure selection (after tapping outlier) */}
      {selectedOutlier !== null && !feedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p
            className="text-sm mb-2 text-center"
            style={{ color: TEXT_MUTED }}
          >
            Which measure does the outlier affect MOST?
          </p>
          <MCOptions
            options={[
              { label: "Mean" },
              { label: "Median" },
              { label: "Mode" },
            ]}
            selected={selectedMeasure}
            correctAnswer="Mean"
            feedback={feedback}
            onSelect={handleSelectMeasure}
          />
        </motion.div>
      )}
    </ProblemShell>
  );
}

// --- Problem 8: Even-Count Median (Numeric) ---

function Problem8({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handleCheck = useCallback(() => {
    if (feedback) return;
    const val = parseFloat(input);
    const correct = Math.abs(val - 8) < 0.01;
    let message: string;
    if (correct) {
      message =
        "With an even number of values, the median is the average of the two middle values. Here, (7 + 9) / 2 = 8. Notice 8 isn't even in the dataset -- the median doesn't have to be a data point!";
    } else if (val === 7 || val === 9) {
      message =
        "Close! With an even count, you can't pick just one middle number. You need to average the two middle values: (7 + 9) / 2 = ?";
    } else {
      message =
        "Not quite. The two middle values are 7 and 9. Average them: (7 + 9) / 2 = ?";
    }
    setFeedback({ correct, message });
    if (!reported.current) {
      onResult(correct);
      reported.current = true;
    }
  }, [input, feedback, onResult]);

  return (
    <ProblemShell
      layerLabel="Understanding"
      prompt="Find the median of: 3, 7, 9, 15"
      feedback={feedback}
      onNext={onNext}
    >
      {/* Visual */}
      <div className="flex items-center gap-1 justify-center mb-4">
        {[3, 7, 9, 15].map((n, i) => (
          <div key={i} className="text-center">
            <span
              className="text-xs block mb-1"
              style={{ color: TEXT_MUTED }}
            >
              {["1st", "2nd", "3rd", "4th"][i]}
            </span>
            <span
              className="inline-block rounded-lg px-3 py-2 font-mono font-semibold text-lg"
              style={{
                backgroundColor:
                  i === 1 || i === 2
                    ? `${THEME.median}30`
                    : ELEVATED,
                color: TEXT_PRIMARY,
                border:
                  i === 1 || i === 2
                    ? `2px solid ${THEME.median}60`
                    : "none",
              }}
            >
              {n}
            </span>
          </div>
        ))}
      </div>

      {/* Bracket hint */}
      <p
        className="text-center text-sm mb-3"
        style={{ color: THEME.median }}
      >
        Middle values: 7 and 9 -- what&apos;s between them?
      </p>

      {/* Input */}
      {!feedback && (
        <div className="flex items-center gap-3 justify-center">
          <input
            type="number"
            step="0.5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="?"
            className="rounded-xl text-center font-mono text-2xl tabular-nums"
            style={{
              width: 120,
              height: 52,
              border: `2px solid #475569`,
              backgroundColor: SURFACE_DEEP,
              color: TEXT_PRIMARY,
              outline: "none",
            }}
            aria-label="Enter the median value"
          />
          <Button
            size="md"
            onClick={handleCheck}
            disabled={input.trim() === ""}
          >
            Check
          </Button>
        </div>
      )}
    </ProblemShell>
  );
}

// --- Problem 9: Best Measure for Context (Two-part) ---

function Problem9({
  onResult,
  onNext,
}: {
  onResult: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [partA, setPartA] = useState<string | null>(null);
  const [partB, setPartB] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const reported = useRef(false);

  const handlePartA = useCallback(
    (choice: string) => {
      if (partA) return;
      setPartA(choice);
      if (choice === "Yes, it's fair") {
        // Wrong, but still let them continue to part B
        // We'll evaluate both at the end
      }
    },
    [partA],
  );

  const handlePartB = useCallback(
    (choice: string) => {
      if (feedback) return;
      setPartB(choice);
      const aCorrect = partA === "No, it's misleading";
      const bCorrect = choice === "Median";
      const bothCorrect = aCorrect && bCorrect;

      let message: string;
      if (bothCorrect) {
        message =
          "The mean ($333 million) is completely distorted by one billionaire. The median ($50K) accurately represents the typical household. This is exactly why government agencies report median household income!";
      } else if (!aCorrect) {
        message =
          "$333 million per household? But 5 out of 6 households earn less than $60K! The billionaire's income inflated the mean so much that it describes nobody's actual experience.";
      } else if (choice === "Mean") {
        message =
          "The mean IS the problem here! It's being pulled up to $333 million by one outlier. The town needs a measure that resists outliers.";
      } else {
        message =
          "Mode would tell you the most common income value, which could work if many households earn the same amount. But with only 6 households, the median is more reliable.";
      }

      setFeedback({ correct: bothCorrect, message });
      if (!reported.current) {
        onResult(bothCorrect);
        reported.current = true;
      }
    },
    [partA, feedback, onResult],
  );

  return (
    <ProblemShell
      layerLabel="Understanding"
      prompt="A town reports its 'average' household income. Five homes earn $40K-$60K, and one tech billionaire earns $2 billion. The town advertises: 'Average household income: $333 million!' Is this fair?"
      feedback={feedback}
      onNext={onNext}
    >
      {/* Visual: bar chart */}
      <div className="flex items-end gap-1 justify-center mb-4 h-20">
        {[40, 45, 50, 55, 60].map((v, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="rounded-t"
              style={{
                width: 20,
                height: 12,
                backgroundColor: THEME.dotsFill,
              }}
            />
            <span
              className="text-xs mt-0.5 font-mono"
              style={{ color: TEXT_MUTED, fontSize: 8 }}
            >
              ${v}K
            </span>
          </div>
        ))}
        <div className="flex flex-col items-center ml-4">
          <div className="text-xs" style={{ color: TEXT_MUTED }}>
            //
          </div>
          <div
            className="rounded-t"
            style={{
              width: 20,
              height: 60,
              backgroundColor: `${THEME.outlier}60`,
            }}
          />
          <span
            className="text-xs mt-0.5 font-mono"
            style={{ color: THEME.outlier, fontSize: 8 }}
          >
            $2B
          </span>
        </div>
      </div>

      <p
        className="text-center text-sm font-bold mb-3"
        style={{ color: THEME.mean }}
      >
        Reported &quot;average&quot;: $333,000,000
      </p>

      {/* Part A */}
      {!partA && (
        <div className="space-y-2 mb-4">
          <p
            className="text-sm mb-2"
            style={{ color: TEXT_MUTED }}
          >
            Is this a fair representation?
          </p>
          {["Yes, it's fair", "No, it's misleading"].map(
            (choice) => (
              <button
                key={choice}
                onClick={() => handlePartA(choice)}
                className="w-full rounded-xl px-4 py-3 text-left font-semibold"
                style={{
                  minHeight: 48,
                  backgroundColor: ELEVATED,
                  color: TEXT_PRIMARY,
                }}
                aria-label={choice}
              >
                {choice}
              </button>
            ),
          )}
        </div>
      )}

      {/* Part B */}
      {partA && !feedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p
            className="text-sm mb-2"
            style={{ color: TEXT_MUTED }}
          >
            Which measure should they use instead?
          </p>
          <MCOptions
            options={[
              { label: "Mean" },
              { label: "Median" },
              { label: "Mode" },
            ]}
            selected={partB}
            correctAnswer="Median"
            feedback={feedback}
            onSelect={handlePartB}
          />
        </motion.div>
      )}
    </ProblemShell>
  );
}

// ===========================================================================
// STAGE 7: REFLECTION
// ===========================================================================

function ReflectionStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const canSubmit = text.trim().length >= 20;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const lower = text.toLowerCase();
    const mentionsMean = lower.includes("mean");
    const mentionsMedian = lower.includes("median");
    const mentionsMode = lower.includes("mode");
    const mentionsOutlier =
      lower.includes("outlier") || lower.includes("extreme");
    const mentionsMisleading =
      lower.includes("misleading") ||
      lower.includes("unfair") ||
      lower.includes("wrong");

    if (
      mentionsMean &&
      mentionsMedian &&
      (mentionsOutlier || mentionsMisleading)
    ) {
      setFeedbackText(
        "Excellent explanation! You clearly understand that 'average' can refer to different measures, and that the mean can be misleading when outliers are present. Great thinking!",
      );
    } else if (mentionsMean && (mentionsMedian || mentionsMode)) {
      setFeedbackText(
        "Good reasoning! You've identified that there are multiple types of averages. Think about specific scenarios where one measure is better than another.",
      );
    } else {
      setFeedbackText(
        "Good start! Remember: mean (balance point), median (middle value), and mode (most common) each tell a different story. The mean can be pulled by outliers, while the median resists them.",
      );
    }
  }, [text]);

  const handleSkip = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <section
      className="flex flex-1 flex-col px-4 py-6 bg-nm-bg-primary"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center max-w-xl mx-auto w-full"
      >
        {/* Header */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: SURFACE }}
        >
          <span
            className="text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4"
            style={{
              backgroundColor: "#7c3aed20",
              color: "#a78bfa",
              letterSpacing: "1px",
            }}
          >
            Reflection
          </span>

          <p
            className="font-medium leading-relaxed mb-4"
            style={{
              color: TEXT_PRIMARY,
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            A friend says &ldquo;average just means the mean.&rdquo;
            Explain why this isn&apos;t true and give an example of when
            the mean is NOT the best measure to use.
          </p>

          {/* Visual hint */}
          <div className="flex items-center gap-6 justify-center mb-4">
            {(["mean", "median", "mode"] as const).map((type) => (
              <div
                key={type}
                className="flex flex-col items-center gap-1"
              >
                <MeasureIcon type={type} size={24} />
                <span
                  className="text-xs font-semibold capitalize"
                  style={{
                    color:
                      type === "mean"
                        ? THEME.mean
                        : type === "median"
                          ? THEME.median
                          : THEME.mode,
                  }}
                >
                  {type}
                </span>
              </div>
            ))}
          </div>
          <p
            className="text-center text-xs"
            style={{ color: "#64748b" }}
          >
            Three different measures, three different stories
          </p>
        </div>

        {/* Text area */}
        <div className="mt-4 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            placeholder="There are actually three types of 'average'..."
            rows={5}
            className="w-full rounded-xl px-4 py-3 text-base leading-relaxed resize-none"
            style={{
              border: "1px solid #475569",
              backgroundColor: SURFACE_DEEP,
              color: TEXT_SEC,
              outline: "none",
              minHeight: 120,
              maxHeight: 240,
              lineHeight: 1.6,
            }}
            id="reflection-input"
            maxLength={500}
          />
          <span
            className="absolute bottom-2 right-3 text-xs tabular-nums"
            style={{
              color:
                text.trim().length >= 20
                  ? THEME.success
                  : "#64748b",
            }}
          >
            {text.trim().length} / 20 minimum
          </span>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {submitted && feedbackText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg p-4"
              style={{
                borderLeft: `4px solid ${THEME.median}`,
                backgroundColor: SURFACE_DEEP,
              }}
              aria-live="polite"
            >
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: "#cbd5e1" }}
              >
                {feedbackText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation visual */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <MiniDotPlot data={[5, 5, 6, 7, 7, 7, 8, 40]} showMeasures />
              <p
                className="text-center text-sm italic mt-2"
                style={{ color: TEXT_SEC }}
              >
                Same data, three stories. Choosing the right measure
                matters!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      <div className="w-full max-w-xl mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full"
              style={{
                backgroundColor: THEME.primary,
                opacity: canSubmit ? 1 : 0.4,
              }}
            >
              Submit Reflection
            </Button>
            <button
              onClick={handleSkip}
              className="w-full text-center py-2"
              style={{
                color: "#64748b",
                fontSize: 13,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Skip
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              size="lg"
              onClick={onComplete}
              className="w-full"
              style={{ backgroundColor: THEME.primary }}
            >
              Complete Lesson
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ===========================================================================
// ROOT COMPONENT
// ===========================================================================

export function MeanMedianModeLesson({ onComplete }: MeanMedianModeLessonProps) {
  return (
    <LessonShell title="SP-5.1 Mean, Median, Mode" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook":       return <HookStage onComplete={advance} />;
          case "spatial":    return <SpatialStage onComplete={advance} />;
          case "discovery":  return <DiscoveryStage onComplete={advance} />;
          case "symbol":     return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld":  return <RealWorldStage onComplete={advance} />;
          case "practice":   return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default:           return null;
        }
      }}
    </LessonShell>
  );
}
