"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface CoordinatePlaneLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION CONFIGS
// ═══════════════════════════════════════════════════════════════════════════

const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC THEME (values not covered by shared tokens)
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  xAxisFill: "#60a5fa33",
  pointFill: "#818cf820",
  successFill: "#34d39933",
  errorFill: "#f8717120",
} as const;

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
            stroke={colors.bg.secondary}
            strokeWidth={1}
          />
          <line
            x1={SVG_MARGIN}
            y1={toPixelY(i)}
            x2={SVG_MARGIN + SVG_GRID}
            y2={toPixelY(i)}
            stroke={colors.bg.secondary}
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
        stroke={colors.domain.numbers}
        strokeWidth={2}
      />
      <line
        x1={toPixelX(0)}
        y1={SVG_MARGIN}
        x2={toPixelX(0)}
        y2={SVG_MARGIN + SVG_GRID}
        stroke={colors.accent.emerald}
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
            fill={colors.domain.numbers}
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
              fill={colors.accent.emerald}
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
        fill={colors.domain.numbers}
        fontSize={14}
        fontWeight={700}
      >
        x
      </text>
      <text
        x={toPixelX(0) - 4}
        y={SVG_MARGIN - 8}
        textAnchor={"middle" as const}
        fill={colors.accent.emerald}
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
        fill={colors.accent.amber}
      />

      {/* Highlight point (for practice) */}
      {highlightPoint && (
        <g>
          <line
            x1={toPixelX(highlightPoint.x)}
            y1={toPixelY(0)}
            x2={toPixelX(highlightPoint.x)}
            y2={toPixelY(highlightPoint.y)}
            stroke={colors.accent.emerald}
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.5}
          />
          <line
            x1={toPixelX(0)}
            y1={toPixelY(highlightPoint.y)}
            x2={toPixelX(highlightPoint.x)}
            y2={toPixelY(highlightPoint.y)}
            stroke={colors.domain.numbers}
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.5}
          />
          <motion.circle
            cx={toPixelX(highlightPoint.x)}
            cy={toPixelY(highlightPoint.y)}
            r={8}
            fill={colors.accent.amber}
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
                stroke={colors.accent.emerald}
                strokeWidth={1}
                strokeDasharray="4 3"
                opacity={0.4}
              />
              <line
                x1={toPixelX(0)}
                y1={toPixelY(p.y)}
                x2={toPixelX(p.x)}
                y2={toPixelY(p.y)}
                stroke={colors.domain.numbers}
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
            fill={colors.accent.indigo}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springs.pop}
          />
          <text
            x={toPixelX(p.x) + 10}
            y={toPixelY(p.y) - 8}
            fill={colors.text.primary}
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
              style={{ color: colors.text.primary, fontSize: "clamp(18px, 5vw, 28px)" }}
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
                  <line x1={toPixelX(i)} y1={SVG_MARGIN} x2={toPixelX(i)} y2={SVG_MARGIN + SVG_GRID} stroke={colors.bg.secondary} strokeWidth={1} />
                  <line x1={SVG_MARGIN} y1={toPixelY(i)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(i)} stroke={colors.bg.secondary} strokeWidth={1} />
                </g>
              ))}

              {/* Axes */}
              <line x1={SVG_MARGIN} y1={toPixelY(0)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(0)} stroke={colors.domain.numbers} strokeWidth={2} />
              <line x1={toPixelX(0)} y1={SVG_MARGIN} x2={toPixelX(0)} y2={SVG_MARGIN + SVG_GRID} stroke={colors.accent.emerald} strokeWidth={2} />

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
                      stroke={colors.accent.emerald}
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
                      stroke={colors.domain.numbers}
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
                      fill={colors.accent.indigo}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={springs.pop}
                    />
                    {/* Label */}
                    <motion.text
                      x={toPixelX(p.x) + 10}
                      y={toPixelY(p.y) - 10}
                      fill={colors.text.primary}
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
                  stroke={colors.accent.indigo}
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
              style={{ color: colors.domain.numbers, fontSize: 16 }}
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
              style={{ color: colors.text.primary, fontSize: 18 }}
            >
              {"Every point has a unique "}
              <span style={{ color: colors.accent.indigo }}>address</span>
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
        className="mb-2 mt-2 flex items-center justify-center rounded-xl bg-nm-bg-secondary px-4 py-2 font-mono"
        style={{
          fontSize: "clamp(18px, 4.5vw, 24px)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: colors.text.muted }}>(</span>
        <span style={{ color: colors.domain.numbers }}>{lastCoord ? lastCoord.x : "?"}</span>
        <span style={{ color: colors.text.muted }}>, </span>
        <span style={{ color: colors.accent.emerald }}>{lastCoord ? lastCoord.y : "?"}</span>
        <span style={{ color: colors.text.muted }}>)</span>
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
        <p className="text-sm" style={{ color: colors.text.muted }}>
          Tap the grid to place points!
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold"
            style={{ color: canContinue ? colors.functional.success : colors.text.muted }}
          >
            {points.length} / 8
          </span>
          {points.length > 0 && (
            <button
              onClick={handleClear}
              className="rounded-lg px-2 py-1 text-xs"
              style={{ color: colors.text.muted, minHeight: 32, minWidth: 44 }}
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-4 flex items-center gap-1 justify-center">
          <InteractionDots
            count={promptIdx + 1}
            total={DISCOVERY_PROMPTS.length}
            activeColor={colors.accent.violet}
          />
        </div>

        <motion.div
          key={promptIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.default}
        >
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: colors.text.primary }}>
            {prompt.text}
          </p>
          <p
            className="mb-4 rounded-lg bg-nm-bg-primary px-4 py-3 text-sm"
            style={{ color: colors.text.primary }}
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
                  <line x1={toPixelX(i)} y1={SVG_MARGIN} x2={toPixelX(i)} y2={SVG_MARGIN + SVG_GRID} stroke={colors.bg.secondary} strokeWidth={1} />
                  <line x1={SVG_MARGIN} y1={toPixelY(i)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(i)} stroke={colors.bg.secondary} strokeWidth={1} />
                </g>
              ))}
              <line x1={SVG_MARGIN} y1={toPixelY(0)} x2={SVG_MARGIN + SVG_GRID} y2={toPixelY(0)} stroke={colors.domain.numbers} strokeWidth={2} />
              <line x1={toPixelX(0)} y1={SVG_MARGIN} x2={toPixelX(0)} y2={SVG_MARGIN + SVG_GRID} stroke={colors.accent.emerald} strokeWidth={2} />

              {/* (3,5) */}
              <motion.circle cx={toPixelX(3)} cy={toPixelY(5)} r={8} fill={colors.accent.indigo} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springs.pop} />
              <text x={toPixelX(3) + 12} y={toPixelY(5) - 10} fill={colors.accent.indigo} fontSize={11} fontWeight={700}>
                (3, 5)
              </text>

              {/* (5,3) */}
              <motion.circle cx={toPixelX(5)} cy={toPixelY(3)} r={8} fill={colors.accent.amber} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...springs.pop, delay: 0.3 }} />
              <text x={toPixelX(5) + 12} y={toPixelY(3) - 10} fill={colors.accent.amber} fontSize={11} fontWeight={700}>
                (5, 3)
              </text>
            </svg>
          </div>
        )}

        <div className="flex justify-center">
          <motion.button
            onClick={handleAck}
            className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white"
            style={{ backgroundColor: colors.accent.violet }}
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
  { notation: "x-axis: horizontal (left \u2194 right)", color: colors.domain.numbers },
  { notation: "y-axis: vertical (up \u2195 down)", color: colors.accent.emerald },
  { notation: "(x, y) = (3, 4) means: 3 right, 4 up", color: colors.accent.indigo },
  { notation: "Origin = (0, 0) \u2014 the starting point", color: colors.accent.amber },
  { notation: "Quadrant I: x > 0, y > 0 (top-right)", color: colors.accent.violet },
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: THEME.pointFill, color: colors.accent.indigo }}
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
                transition={springs.default}
                className="flex items-center gap-3 rounded-lg bg-nm-bg-primary px-4 py-3"
                style={{ border: `1px solid ${colors.bg.surface}` }}
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
            <p className="mb-4 text-center text-sm font-medium" style={{ color: colors.text.primary }}>
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
      <div className="mt-4 rounded-2xl bg-nm-bg-secondary p-6">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: THEME.xAxisFill, color: colors.domain.numbers }}
        >
          Real World
        </span>

        <p className="mb-4 text-base font-medium" style={{ color: colors.text.primary }}>
          Coordinates are everywhere!
        </p>

        <div className="space-y-3">
          {REAL_WORLD_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.default, delay: i * 0.15 }}
              className="rounded-xl bg-nm-bg-primary px-4 py-3"
              style={{ border: `1px solid ${colors.bg.surface}` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: THEME.pointFill, color: colors.accent.indigo }}
                >
                  {card.icon.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                    {card.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: colors.text.muted }}>
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
    recall: colors.domain.numbers,
    procedure: colors.accent.amber,
    understanding: colors.accent.violet,
  };

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="mt-4 rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${layerColors[problem.layer] ?? colors.accent.violet}20`,
              color: layerColors[problem.layer] ?? colors.accent.violet,
            }}
          >
            {problem.layer}
          </span>
          <span className="text-xs" style={{ color: colors.text.muted }}>
            {probIdx + 1} / {PRACTICE_PROBLEMS.length}
          </span>
        </div>

        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: colors.text.primary }}>
          {problem.prompt}
        </p>

        {/* Multiple choice */}
        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2">
            {problem.options.map((opt, i) => {
              const isSelected = selected === i;
              const showCorrect = answered && i === problem.correctIndex;
              const showIncorrect = answered && isSelected && i !== problem.correctIndex;

              let bgColor: string = colors.bg.primary;
              if (showCorrect) bgColor = THEME.successFill;
              else if (showIncorrect) bgColor = THEME.errorFill;
              else if (isSelected) bgColor = `${colors.accent.violet}30`;

              let borderColor: string = colors.bg.surface;
              if (showCorrect) borderColor = colors.functional.success;
              else if (showIncorrect) borderColor = colors.functional.error;
              else if (isSelected) borderColor = colors.accent.violet;

              let textColor: string = colors.text.primary;
              if (showCorrect) textColor = colors.functional.success;
              else if (showIncorrect) textColor = colors.functional.error;

              return (
                <motion.button
                  key={i}
                  onClick={() => { if (!answered) setSelected(i); }}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors"
                  style={{
                    minHeight: 48,
                    backgroundColor: bgColor,
                    border: `2px solid ${borderColor}`,
                    color: textColor,
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

              let bgColor: string = colors.bg.primary;
              if (showCorrect) bgColor = THEME.successFill;
              else if (showIncorrect) bgColor = THEME.errorFill;
              else if (isSel) bgColor = `${colors.accent.violet}30`;

              let borderColor: string = colors.bg.surface;
              if (showCorrect) borderColor = colors.functional.success;
              else if (showIncorrect) borderColor = colors.functional.error;
              else if (isSel) borderColor = colors.accent.violet;

              let textColor: string = colors.text.primary;
              if (showCorrect) textColor = colors.functional.success;
              else if (showIncorrect) textColor = colors.functional.error;

              return (
                <motion.button
                  key={String(val)}
                  onClick={() => { if (!answered) setTfSelected(val); }}
                  className="flex-1 rounded-xl py-3 text-center text-base font-semibold"
                  style={{
                    minHeight: 48,
                    backgroundColor: bgColor,
                    border: `2px solid ${borderColor}`,
                    color: textColor,
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
              <p className="mt-1 text-center text-sm font-mono" style={{ color: colors.text.primary }}>
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
              backgroundColor: colors.accent.violet,
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
                backgroundColor: isCorrect ? THEME.successFill : THEME.errorFill,
                border: `1px solid ${isCorrect ? colors.functional.success : colors.functional.error}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: isCorrect ? colors.functional.success : colors.functional.error }}>
                {isCorrect ? "Correct!" : "Not quite."}
              </p>
              <p className="mt-1 text-sm" style={{ color: colors.text.primary }}>
                {problem.feedback}
              </p>
            </div>

            <motion.button
              onClick={handleNext}
              className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white"
              style={{ minHeight: 48, backgroundColor: colors.accent.violet }}
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
        <div className="w-full rounded-2xl bg-nm-bg-secondary p-6 text-center">
          {submitted && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={springs.pop}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: THEME.successFill }}
              >
                <span style={{ color: colors.functional.success, fontSize: 32 }}>{"✓"}</span>
              </motion.div>
              <p className="mb-2 text-lg font-semibold" style={{ color: colors.text.primary }}>
                Great reflection!
              </p>
              <p className="mb-4 text-sm" style={{ color: colors.text.muted }}>
                Understanding why order matters in coordinates is a key skill.
                You are ready to explore more on the coordinate plane!
              </p>
            </>
          )}

          {skipped && (
            <p className="mb-4 text-center text-sm" style={{ color: colors.text.muted }}>
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
      <div className="mt-4 rounded-2xl bg-nm-bg-secondary p-6">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: THEME.pointFill, color: colors.accent.indigo }}
        >
          Reflection
        </span>

        <p className="mb-4 text-lg font-medium leading-relaxed" style={{ color: colors.text.primary }}>
          {"Explain to a friend why (3, 5) and (5, 3) are different points. Use the idea of \u2018running\u2019 and \u2018jumping\u2019 or any other analogy."}
        </p>

        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="They're different because..."
          className="w-full resize-none rounded-xl bg-nm-bg-primary p-4 text-base leading-relaxed"
          style={{
            minHeight: 120,
            maxHeight: 240,
            border: `1px solid ${colors.bg.elevated}`,
            color: colors.text.primary,
          }}
          aria-label="Write your reflection explaining why coordinate order matters"
        />

        <div className="mt-1 text-right text-xs" style={{ color: meetsMin ? colors.functional.success : colors.text.muted }}>
          {text.length} / {minChars} minimum
        </div>

        <button
          onClick={handleSubmit}
          disabled={!meetsMin}
          className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none"
          style={{ backgroundColor: colors.accent.violet, minHeight: 52 }}
        >
          Submit Reflection
        </button>

        <button
          onClick={handleSkip}
          className="mt-2 w-full py-2 text-sm underline-offset-2 hover:underline"
          style={{ color: colors.text.muted, minHeight: 44 }}
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
  return (
    <LessonShell
      title="GE-5.1 Coordinate Plane"
      stages={[...NLS_STAGES]}
      onComplete={onComplete}
    >
      {({ stage, advance }) => {
        switch (stage) {
          case "hook":
            return <HookStage onComplete={advance} />;
          case "spatial":
            return <SpatialStage onComplete={advance} />;
          case "discovery":
            return <DiscoveryStage onComplete={advance} />;
          case "symbol":
            return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld":
            return <RealWorldStage onComplete={advance} />;
          case "practice":
            return <PracticeStage onComplete={advance} />;
          case "reflection":
            return <ReflectionStage onComplete={advance} />;
          default:
            return null;
        }
      }}
    </LessonShell>
  );
}
