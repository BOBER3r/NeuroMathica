"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface CoordinatePlaneLessonProps {
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
// ANIMATION CONFIGS
// ═══════════════════════════════════════════════════════════════════════════

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// COLORS
// ═══════════════════════════════════════════════════════════════════════════

const C = {
  xAxis: "#60a5fa",
  xAxisFill: "#60a5fa33",
  yAxis: "#34d399",
  yAxisFill: "#34d39933",
  point: "#818cf8",
  pointFill: "#818cf820",
  origin: "#fbbf24",
  originFill: "#fbbf2420",
  gridLine: "#1e293b",
  axisLine: "#475569",
  bgPrimary: "#0f172a",
  bgSurface: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  success: "#34d399",
  successFill: "#34d39933",
  error: "#f87171",
  errorFill: "#f8717120",
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
// SVG GRID HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const GRID_UNITS = 10;
const SVG_MARGIN = 40;
const SVG_GRID = 320;
const SVG_SIZE = SVG_GRID + SVG_MARGIN * 2;

function toPixelX(gridX: number): number {
  return SVG_MARGIN + (gridX / GRID_UNITS) * SVG_GRID;
}

function toPixelY(gridY: number): number {
  return SVG_MARGIN + ((GRID_UNITS - gridY) / GRID_UNITS) * SVG_GRID;
}

function toGridCoords(
  svgEl: SVGSVGElement,
  clientX: number,
  clientY: number,
): { gx: number; gy: number } {
  const pt = svgEl.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svgEl.getScreenCTM();
  if (!ctm) return { gx: 0, gy: 0 };
  const svgPt = pt.matrixTransform(ctm.inverse());
  const rawX = ((svgPt.x - SVG_MARGIN) / SVG_GRID) * GRID_UNITS;
  const rawY = GRID_UNITS - ((svgPt.y - SVG_MARGIN) / SVG_GRID) * GRID_UNITS;
  const gx = Math.max(0, Math.min(GRID_UNITS, Math.round(rawX)));
  const gy = Math.max(0, Math.min(GRID_UNITS, Math.round(rawY)));
  return { gx, gy };
}

interface GridPoint {
  x: number;
  y: number;
  id: number;
}

function CoordinateGrid({
  points,
  showTraceLines,
  highlightPoint,
  onGridClick,
  svgRef,
}: {
  points: readonly GridPoint[];
  showTraceLines?: boolean;
  highlightPoint?: { x: number; y: number } | null;
  onGridClick?: (gx: number, gy: number) => void;
  svgRef?: React.RefObject<SVGSVGElement | null>;
}) {
  const internalRef = useRef<SVGSVGElement>(null);
  const ref = svgRef ?? internalRef;

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!onGridClick || !ref.current) return;
      const { gx, gy } = toGridCoords(ref.current, e.clientX, e.clientY);
      onGridClick(gx, gy);
    },
    [onGridClick, ref],
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      className="mx-auto w-full touch-none"
      style={{ maxWidth: 400 }}
      onClick={handleClick}
      aria-label="Coordinate plane grid"
    >
      {/* Grid lines */}
      {Array.from({ length: GRID_UNITS + 1 }, (_, i) => (
        <g key={`grid-${i}`}>
          <line
            x1={toPixelX(i)}
            y1={SVG_MARGIN}
            x2={toPixelX(i)}
            y2={SVG_MARGIN + SVG_GRID}
            stroke={C.gridLine}
            strokeWidth={1}
          />
          <line
            x1={SVG_MARGIN}
            y1={toPixelY(i)}
            x2={SVG_MARGIN + SVG_GRID}
            y2={toPixelY(i)}
            stroke={C.gridLine}
            strokeWidth={1}
          />
        </g>
      ))}

      {/* Axes */}
      <line
        x1={SVG_MARGIN}
        y1={toPixelY(0)}
        x2={SVG_MARGIN + SVG_GRID}
        y2={toPixelY(0)}
        stroke={C.xAxis}
        strokeWidth={2}
      />
      <line
        x1={toPixelX(0)}
        y1={SVG_MARGIN}
        x2={toPixelX(0)}
        y2={SVG_MARGIN + SVG_GRID}
        stroke={C.yAxis}
        strokeWidth={2}
      />

      {/* Axis labels */}
      {Array.from({ length: GRID_UNITS + 1 }, (_, i) => (
        <g key={`label-${i}`}>
          {/* x-axis labels */}
          <text
            x={toPixelX(i)}
            y={toPixelY(0) + 16}
            textAnchor={"middle" as const}
            fill={C.xAxis}
            fontSize={10}
          >
            {i}
          </text>
          {/* y-axis labels */}
          {i > 0 && (
            <text
              x={toPixelX(0) - 12}
              y={toPixelY(i) + 4}
              textAnchor={"middle" as const}
              fill={C.yAxis}
              fontSize={10}
            >
              {i}
            </text>
          )}
        </g>
      ))}

      {/* Axis names */}
      <text
        x={SVG_MARGIN + SVG_GRID + 8}
        y={toPixelY(0) + 4}
        fill={C.xAxis}
        fontSize={14}
        fontWeight={700}
      >
        x
      </text>
      <text
        x={toPixelX(0) - 4}
        y={SVG_MARGIN - 8}
        textAnchor={"middle" as const}
        fill={C.yAxis}
        fontSize={14}
        fontWeight={700}
      >
        y
      </text>

      {/* Origin dot */}
      <circle
        cx={toPixelX(0)}
        cy={toPixelY(0)}
        r={4}
        fill={C.origin}
      />

      {/* Highlight point (for practice) */}
      {highlightPoint && (
        <g>
          <line
            x1={toPixelX(highlightPoint.x)}
            y1={toPixelY(0)}
            x2={toPixelX(highlightPoint.x)}
            y2={toPixelY(highlightPoint.y)}
            stroke={C.yAxis}
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.5}
          />
          <line
            x1={toPixelX(0)}
            y1={toPixelY(highlightPoint.y)}
            x2={toPixelX(highlightPoint.x)}
            y2={toPixelY(highlightPoint.y)}
            stroke={C.xAxis}
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.5}
          />
          <motion.circle
            cx={toPixelX(highlightPoint.x)}
            cy={toPixelY(highlightPoint.y)}
            r={8}
            fill={C.origin}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </g>
      )}

      {/* Plotted points */}
      {points.map((p) => (
        <g key={p.id}>
          {/* Trace lines */}
          {showTraceLines && (
            <>
              <line
                x1={toPixelX(p.x)}
                y1={toPixelY(0)}
                x2={toPixelX(p.x)}
                y2={toPixelY(p.y)}
                stroke={C.yAxis}
                strokeWidth={1}
                strokeDasharray="4 3"
                opacity={0.4}
              />
              <line
                x1={toPixelX(0)}
                y1={toPixelY(p.y)}
                x2={toPixelX(p.x)}
                y2={toPixelY(p.y)}
                stroke={C.xAxis}
                strokeWidth={1}
                strokeDasharray="4 3"
                opacity={0.4}
              />
            </>
          )}
          <motion.circle
            cx={toPixelX(p.x)}
            cy={toPixelY(p.y)}
            r={6}
            fill={C.point}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={SPRING_POP}
          />
          <text
            x={toPixelX(p.x) + 10}
            y={toPixelY(p.y) - 8}
            fill={C.textSecondary}
            fontSize={10}
          >
            ({p.x}, {p.y})
          </text>
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/CoordinatePlaneHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 500));
    timers.push(setTimeout(() => setPhase(2), 1500));
    timers.push(setTimeout(() => setPhase(3), 2500));
    timers.push(setTimeout(() => setPhase(4), 3500));
    timers.push(setTimeout(() => setPhase(5), 4500));
    timers.push(setTimeout(() => setPhase(6), 5500));
    timers.push(setTimeout(() => setPhase(7), 6500));
    timers.push(setTimeout(() => setPhase(8), 7500));
    timers.push(setTimeout(() => setPhase(9), 8500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 9)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const hookPoints: Array<{ x: number; y: number; label: string }> = [
    { x: 3, y: 4, label: "(3, 4)" },
    { x: 7, y: 2, label: "(7, 2)" },
    { x: 1, y: 6, label: "(1, 6)" },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 480 }}
        aria-live="polite"
      >
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              key="hook-text-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 text-center italic"
              style={{ color: C.textPrimary, fontSize: "clamp(18px, 5vw, 28px)" }}
            >
              Every point has an address.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Grid with animated points */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              className="mx-auto w-full"
              style={{ maxWidth: 380 }}
              aria-label="A coordinate grid with three points appearing"
            >
              {/* Grid lines */}
              {Array.from({ length: GRID_UNITS + 1 }, (_, i) => (
                <g key={`hg-${i}`}>
                  <line x1={toPixelX(i)} y1={SVG_MARGIN} x2={toPixelX(i)} y2={SVG_MARGIN + SVG_GRID} stroke={C.gridLine} strokeWidth={1} />
                  <line x1={SVG_MARGIN} y1={toPixelY(i)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(i)} stroke={C.gridLine} strokeWidth={1} />
                </g>
              ))}

              {/* Axes */}
              <line x1={SVG_MARGIN} y1={toPixelY(0)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(0)} stroke={C.xAxis} strokeWidth={2} />
              <line x1={toPixelX(0)} y1={SVG_MARGIN} x2={toPixelX(0)} y2={SVG_MARGIN + SVG_GRID} stroke={C.yAxis} strokeWidth={2} />

              {/* Points appearing */}
              {hookPoints.map((p, i) => {
                const phaseNeeded = 3 + i;
                if (phase < phaseNeeded) return null;
                return (
                  <g key={`hp-${i}`}>
                    {/* Trace lines */}
                    <motion.line
                      x1={toPixelX(p.x)}
                      y1={toPixelY(0)}
                      x2={toPixelX(p.x)}
                      y2={toPixelY(p.y)}
                      stroke={C.yAxis}
                      strokeWidth={1}
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.line
                      x1={toPixelX(0)}
                      y1={toPixelY(p.y)}
                      x2={toPixelX(p.x)}
                      y2={toPixelY(p.y)}
                      stroke={C.xAxis}
                      strokeWidth={1}
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Dot */}
                    <motion.circle
                      cx={toPixelX(p.x)}
                      cy={toPixelY(p.y)}
                      r={7}
                      fill={C.point}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={SPRING_POP}
                    />
                    {/* Label */}
                    <motion.text
                      x={toPixelX(p.x) + 10}
                      y={toPixelY(p.y) - 10}
                      fill={C.textPrimary}
                      fontSize={12}
                      fontWeight={600}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {p.label}
                    </motion.text>
                  </g>
                );
              })}

              {/* Triangle connecting points */}
              {phase >= 7 && (
                <motion.polygon
                  points={hookPoints.map((p) => `${toPixelX(p.x)},${toPixelY(p.y)}`).join(" ")}
                  fill="none"
                  stroke={C.point}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  opacity={0.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </svg>
          </motion.div>
        )}

        <AnimatePresence>
          {phase >= 6 && phase < 8 && (
            <motion.p
              key="hook-text-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              className="mt-2 text-center font-semibold"
              style={{ color: C.xAxis, fontSize: 16 }}
            >
              How far right. How far up.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 8 && (
            <motion.p
              key="hook-text-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-2 text-center font-semibold"
              style={{ color: C.textPrimary, fontSize: 18 }}
            >
              {"Every point has a unique "}
              <span style={{ color: C.point }}>address</span>
              {"."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {phase >= 9 && (
        <div className="mt-6">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [points, setPoints] = useState<GridPoint[]>([]);
  const [lastCoord, setLastCoord] = useState<{ x: number; y: number } | null>(null);
  const nextIdRef = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const canContinue = points.length >= 8;

  const handleGridClick = useCallback((gx: number, gy: number) => {
    setPoints((prev) => {
      const next = [...prev, { x: gx, y: gy, id: nextIdRef.current++ }];
      if (next.length > 20) return next.slice(next.length - 20);
      return next;
    });
    setLastCoord({ x: gx, y: gy });
  }, []);

  const handleClear = useCallback(() => {
    setPoints([]);
    setLastCoord(null);
  }, []);

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Coordinate display */}
      <div
        className="mb-2 mt-2 flex items-center justify-center rounded-xl px-4 py-2 font-mono"
        style={{
          backgroundColor: C.bgSurface,
          fontSize: "clamp(18px, 4.5vw, 24px)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: C.textMuted }}>(</span>
        <span style={{ color: C.xAxis }}>{lastCoord ? lastCoord.x : "?"}</span>
        <span style={{ color: C.textMuted }}>, </span>
        <span style={{ color: C.yAxis }}>{lastCoord ? lastCoord.y : "?"}</span>
        <span style={{ color: C.textMuted }}>)</span>
      </div>

      {/* Grid */}
      <CoordinateGrid
        points={points}
        showTraceLines
        onGridClick={handleGridClick}
        svgRef={svgRef}
      />

      {/* Instructions + counter */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm" style={{ color: C.textMuted }}>
          Tap the grid to place points!
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold"
            style={{ color: canContinue ? C.success : C.textDim }}
          >
            {points.length} / 8
          </span>
          {points.length > 0 && (
            <button
              onClick={handleClear}
              className="rounded-lg px-2 py-1 text-xs"
              style={{ color: C.textDim, minHeight: 32, minWidth: 44 }}
            >
              Clear
            </button>
          )}
        </div>
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
    text: "Notice: the FIRST number tells how far RIGHT the point is from the origin.",
    detail: "This is the x-coordinate. It measures horizontal position.",
    button: "I see it!",
  },
  {
    text: "The SECOND number tells how far UP. Run first (x), then jump (y)!",
    detail: "Think: you run horizontally (x), then jump vertically (y).",
    button: "I see it!",
  },
  {
    text: "Look: (3, 5) and (5, 3) are DIFFERENT points! Order matters.",
    detail: "(3, 5) = 3 right, 5 up. (5, 3) = 5 right, 3 up. Different places!",
    button: "I see it!",
  },
  {
    text: "The center point (0, 0) is called the ORIGIN. Every address is measured from here.",
    detail: "The origin is home base. All coordinates describe distance from (0, 0).",
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

  // Special visualization for prompt 3
  const showSwapDemo = promptIdx === 2;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="w-full rounded-2xl p-6" style={{ backgroundColor: C.bgSurface }}>
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
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: C.textPrimary }}>
            {prompt.text}
          </p>
          <p
            className="mb-4 rounded-lg px-4 py-3 text-sm"
            style={{ backgroundColor: C.bgPrimary, color: C.textSecondary }}
          >
            {prompt.detail}
          </p>
        </motion.div>

        {/* Mini grid for swap demo */}
        {showSwapDemo && (
          <div className="mb-4">
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              className="mx-auto w-full"
              style={{ maxWidth: 240 }}
            >
              {/* Simple grid */}
              {Array.from({ length: GRID_UNITS + 1 }, (_, i) => (
                <g key={`dg-${i}`}>
                  <line x1={toPixelX(i)} y1={SVG_MARGIN} x2={toPixelX(i)} y2={SVG_MARGIN + SVG_GRID} stroke={C.gridLine} strokeWidth={1} />
                  <line x1={SVG_MARGIN} y1={toPixelY(i)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(i)} stroke={C.gridLine} strokeWidth={1} />
                </g>
              ))}
              <line x1={SVG_MARGIN} y1={toPixelY(0)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(0)} stroke={C.xAxis} strokeWidth={2} />
              <line x1={toPixelX(0)} y1={SVG_MARGIN} x2={toPixelX(0)} y2={SVG_MARGIN + SVG_GRID} stroke={C.yAxis} strokeWidth={2} />

              {/* (3,5) */}
              <motion.circle cx={toPixelX(3)} cy={toPixelY(5)} r={8} fill={C.point} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING_POP} />
              <text x={toPixelX(3) + 12} y={toPixelY(5) - 10} fill={C.point} fontSize={11} fontWeight={700}>
                (3, 5)
              </text>

              {/* (5,3) */}
              <motion.circle cx={toPixelX(5)} cy={toPixelY(3)} r={8} fill={C.origin} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING_POP, delay: 0.3 }} />
              <text x={toPixelX(5) + 12} y={toPixelY(3) - 10} fill={C.origin} fontSize={11} fontWeight={700}>
                (5, 3)
              </text>
            </svg>
          </div>
        )}

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
  { notation: "x-axis: horizontal (left \u2194 right)", color: C.xAxis },
  { notation: "y-axis: vertical (up \u2195 down)", color: C.yAxis },
  { notation: "(x, y) = (3, 4) means: 3 right, 4 up", color: C.point },
  { notation: "Origin = (0, 0) \u2014 the starting point", color: C.origin },
  { notation: "Quadrant I: x > 0, y > 0 (top-right)", color: C.primary },
] as const;

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < SYMBOL_STEPS.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 1800 * (i + 1)));
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
          style={{ backgroundColor: C.pointFill, color: C.point }}
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
                style={{ backgroundColor: C.bgPrimary, border: `1px solid ${C.border}` }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {i + 1}
                </span>
                <p className="text-sm font-semibold" style={{ color: step.color }}>
                  {step.notation}
                </p>
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
              {"(x, y) means: go x units right, then y units up from the origin."}
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
  { icon: "Pin", title: "Maps", example: "GPS uses coordinates (latitude, longitude) to find any place on Earth." },
  { icon: "Joy", title: "Gaming", example: "In Minecraft, every block has (x, y, z) coordinates." },
  { icon: "Seat", title: "Theater", example: "Row 3, Seat 7 is like coordinates (7, 3)." },
  { icon: "Ship", title: "Battleship", example: "B4 in Battleship = column B, row 4 = a coordinate!" },
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
          style={{ backgroundColor: C.xAxisFill, color: C.xAxis }}
        >
          Real World
        </span>

        <p className="mb-4 text-base font-medium" style={{ color: C.textPrimary }}>
          Coordinates are everywhere!
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
                  style={{ backgroundColor: C.pointFill, color: C.point }}
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
  type: "multiple-choice" | "true-false" | "tap-grid";
  prompt: string;
  options?: readonly string[];
  correctIndex?: number;
  correctBool?: boolean;
  gridTarget?: { x: number; y: number };
  feedback: string;
}

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  {
    layer: "recall",
    type: "multiple-choice",
    prompt: "Which axis runs horizontally (left to right)?",
    options: ["y-axis", "x-axis", "z-axis", "origin"],
    correctIndex: 1,
    feedback: "The x-axis is horizontal. Think: x looks like a cross on the ground!",
  },
  {
    layer: "recall",
    type: "multiple-choice",
    prompt: "What is the coordinate of the origin?",
    options: ["(1, 1)", "(0, 0)", "(0, 1)", "(1, 0)"],
    correctIndex: 1,
    feedback: "The origin is at (0, 0) \u2014 the starting point for all coordinates.",
  },
  {
    layer: "recall",
    type: "true-false",
    prompt: "In (5, 3), the 5 tells how far up the point is.",
    correctBool: false,
    feedback: "False! The first number (5) is x = how far RIGHT. The second (3) is y = how far UP.",
  },
  {
    layer: "procedure",
    type: "tap-grid",
    prompt: "Tap the point at (4, 6) on the grid.",
    gridTarget: { x: 4, y: 6 },
    feedback: "Correct! Go 4 right and 6 up.",
  },
  {
    layer: "procedure",
    type: "multiple-choice",
    prompt: "A point is 7 units right and 2 units up. What are its coordinates?",
    options: ["(2, 7)", "(7, 2)", "(7, 7)", "(2, 2)"],
    correctIndex: 1,
    feedback: "7 right = x is 7, 2 up = y is 2. The point is (7, 2).",
  },
  {
    layer: "procedure",
    type: "tap-grid",
    prompt: "Tap the point at (2, 8) on the grid.",
    gridTarget: { x: 2, y: 8 },
    feedback: "2 units right, 8 units up. You got it!",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "Are (4, 7) and (7, 4) the same point?",
    options: [
      "Yes, same numbers",
      "No, they are different points",
      "Only if on the same axis",
      "It depends on the grid",
    ],
    correctIndex: 1,
    feedback: "Order matters! (4,7) is 4 right, 7 up. (7,4) is 7 right, 4 up. Different locations!",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "A point is at (5, 0). Where does it sit?",
    options: ["On the y-axis", "On the x-axis", "At the origin", "In quadrant I"],
    correctIndex: 1,
    feedback: "When y = 0, the point sits directly on the x-axis. No vertical movement!",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "Why do we need TWO numbers to describe a point on a flat surface?",
    options: [
      "Because math likes pairs",
      "Because a flat surface has two directions: horizontal and vertical",
      "Because one number would be too easy",
      "Because the grid has two colors",
    ],
    correctIndex: 1,
    feedback: "A flat plane is 2D, so we need 2 numbers \u2014 one for each direction!",
  },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [probIdx, setProbIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [gridTap, setGridTap] = useState<{ x: number; y: number } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const gridSvgRef = useRef<SVGSVGElement>(null);

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
    } else if (problem.type === "tap-grid" && gridTap && problem.gridTarget) {
      correct = gridTap.x === problem.gridTarget.x && gridTap.y === problem.gridTarget.y;
    } else {
      return;
    }

    setIsCorrect(correct);
    setAnswered(true);
  };

  const handleNext = () => {
    setSelected(null);
    setTfSelected(null);
    setGridTap(null);
    setAnswered(false);
    setIsCorrect(false);
    if (probIdx < PRACTICE_PROBLEMS.length - 1) {
      setProbIdx((i) => i + 1);
    } else {
      onComplete();
    }
  };

  const handleGridTap = (gx: number, gy: number) => {
    if (answered) return;
    setGridTap({ x: gx, y: gy });
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
                      ? C.successFill
                      : showIncorrect
                        ? C.errorFill
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
                      ? C.successFill
                      : showIncorrect
                        ? C.errorFill
                        : isSel
                          ? `${C.primary}30`
                          : C.bgPrimary,
                    border: `2px solid ${
                      showCorrect ? C.success : showIncorrect ? C.error : isSel ? C.primary : C.border
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

        {/* Tap grid */}
        {problem.type === "tap-grid" && (
          <div className="mb-2">
            <CoordinateGrid
              points={gridTap ? [{ x: gridTap.x, y: gridTap.y, id: 0 }] : []}
              showTraceLines
              highlightPoint={answered && !isCorrect && problem.gridTarget ? problem.gridTarget : null}
              onGridClick={handleGridTap}
              svgRef={gridSvgRef}
            />
            {gridTap && (
              <p className="mt-1 text-center text-sm font-mono" style={{ color: C.textSecondary }}>
                Selected: ({gridTap.x}, {gridTap.y})
              </p>
            )}
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
                (problem.type === "tap-grid" && gridTap === null)
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
                backgroundColor: isCorrect ? C.successFill : C.errorFill,
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
                style={{ backgroundColor: C.successFill }}
              >
                <span style={{ color: C.success, fontSize: 32 }}>{"✓"}</span>
              </motion.div>
              <p className="mb-2 text-lg font-semibold" style={{ color: C.textPrimary }}>
                Great reflection!
              </p>
              <p className="mb-4 text-sm" style={{ color: C.textMuted }}>
                Understanding why order matters in coordinates is a key skill.
                You are ready to explore more on the coordinate plane!
              </p>
            </>
          )}

          {skipped && (
            <p className="mb-4 text-center text-sm" style={{ color: C.textMuted }}>
              Reflection skipped. You can always come back to reflect later!
            </p>
          )}

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
          style={{ backgroundColor: C.pointFill, color: C.point }}
        >
          Reflection
        </span>

        <p className="mb-4 text-lg font-medium leading-relaxed" style={{ color: C.textPrimary }}>
          {"Explain to a friend why (3, 5) and (5, 3) are different points. Use the idea of \u2018running\u2019 and \u2018jumping\u2019 or any other analogy."}
        </p>

        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="They're different because..."
          className="w-full resize-none rounded-xl p-4 text-base leading-relaxed"
          style={{
            minHeight: 120,
            maxHeight: 240,
            backgroundColor: C.bgPrimary,
            border: `1px solid ${C.borderLight}`,
            color: C.textSecondary,
          }}
          aria-label="Write your reflection explaining why coordinate order matters"
        />

        <div className="mt-1 text-right text-xs" style={{ color: meetsMin ? C.success : C.textDim }}>
          {text.length} / {minChars} minimum
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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LESSON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function CoordinatePlaneLesson({ onComplete }: CoordinatePlaneLessonProps) {
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
