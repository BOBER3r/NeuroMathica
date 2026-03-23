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
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useDrag } from "@use-gesture/react";
import katex from "katex";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

// ---------------------------------------------------------------------------
// Constants & types
// ---------------------------------------------------------------------------

const ANGLE_COLORS = {
  acute: "#34d399",
  right: "#fbbf24",
  obtuse: "#60a5fa",
  straight: "#818cf8",
  reflex: "#fb7185",
} as const;

type AngleType = keyof typeof ANGLE_COLORS;

const NOTABLE_ANGLES = [
  0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330,
  360,
];

const PRESET_ANGLES: ReadonlyArray<{
  label: string;
  value: number;
  color: string;
}> = [
  { label: "45\u00B0", value: 45, color: ANGLE_COLORS.acute },
  { label: "90\u00B0", value: 90, color: ANGLE_COLORS.right },
  { label: "120\u00B0", value: 120, color: ANGLE_COLORS.obtuse },
  { label: "180\u00B0", value: 180, color: ANGLE_COLORS.straight },
  { label: "270\u00B0", value: 270, color: ANGLE_COLORS.reflex },
];

const DEG = Math.PI / 180;

// ---------------------------------------------------------------------------
// Shared token aliases
// ---------------------------------------------------------------------------

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT_SECONDARY = colors.text.secondary;
const BORDER = colors.bg.surface;
const BORDER_LIGHT = colors.bg.elevated;
const SUCCESS = colors.functional.success;
const WARNING = colors.functional.warning;
const INFO = colors.functional.info;

const SPRING = springs.default;

// ---------------------------------------------------------------------------
// Lesson-specific theme
// ---------------------------------------------------------------------------

const THEME = {
  primary: INFO,
  acute: ANGLE_COLORS.acute,
  right: ANGLE_COLORS.right,
  obtuse: ANGLE_COLORS.obtuse,
  straight: ANGLE_COLORS.straight,
  reflex: ANGLE_COLORS.reflex,
  textLight: "#e2e8f0",
  vertex: "#f8fafc",
  lineGray: TEXT_SECONDARY,
  handleDefault: INFO,
  handleHover: "#60a5fa",
  handleActive: "#93c5fd",
  handleStroke: "#60a5fa",
  dividerHandle: colors.accent.violet,
  dividerStroke: "#c4b5fd",
};

// ---------------------------------------------------------------------------
// Pure math helpers
// ---------------------------------------------------------------------------

function classifyAngle(deg: number): AngleType | null {
  if (deg <= 0 || deg >= 360) return null;
  if (deg >= 89 && deg <= 91) return "right";
  if (deg < 90) return "acute";
  if (deg >= 179 && deg <= 181) return "straight";
  if (deg < 180) return "obtuse";
  return "reflex";
}

function angleTypeName(t: AngleType | null): string {
  if (!t) return "";
  const names: Record<AngleType, string> = {
    acute: "Acute",
    right: "Right Angle",
    obtuse: "Obtuse",
    straight: "Straight",
    reflex: "Reflex",
  };
  return names[t];
}

function angleColor(deg: number): string {
  const t = classifyAngle(deg);
  if (!t) return TEXT_SECONDARY;
  return ANGLE_COLORS[t];
}

/**
 * SVG arc path (counterclockwise in math, clockwise visually because SVG y
 * points down). Start/end in degrees; 0 = positive x-axis.
 */
function angleArcPath(
  startDeg: number,
  endDeg: number,
  radius: number,
): string {
  const sRad = startDeg * DEG;
  const eRad = endDeg * DEG;
  const x1 = radius * Math.cos(sRad);
  const y1 = -radius * Math.sin(sRad);
  const x2 = radius * Math.cos(eRad);
  const y2 = -radius * Math.sin(eRad);
  let diff = endDeg - startDeg;
  if (diff < 0) diff += 360;
  const largeArc = diff > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 0 ${x2} ${y2}`;
}

/** Filled pie-slice for translucent angle fill. */
function anglePiePath(
  startDeg: number,
  endDeg: number,
  radius: number,
): string {
  const arc = angleArcPath(startDeg, endDeg, radius);
  return `M 0 0 L ${arc.substring(2)} L 0 0 Z`;
}

function snapAngle(raw: number): number {
  for (const n of NOTABLE_ANGLES) {
    if (Math.abs(raw - n) < 2.5) return n;
  }
  return Math.round(raw);
}

function renderKatex(tex: string): string {
  try {
    return katex.renderToString(tex, { throwOnError: false });
  } catch {
    return tex;
  }
}

/** Pointer client coords -> SVG user-space. */
function clientToSvg(
  svgEl: SVGSVGElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const pt = svgEl.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svgEl.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const svgPt = pt.matrixTransform(ctm.inverse());
  return { x: svgPt.x, y: svgPt.y };
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface AnglesLessonProps {
  onComplete?: () => void;
}

// ---------------------------------------------------------------------------
// NLS stages (shared)
// ---------------------------------------------------------------------------

// ===========================================================================
// Shared micro-components
// ===========================================================================

function Katex({
  tex,
  className,
}: {
  tex: string;
  className?: string;
}) {
  const html = useMemo(() => renderKatex(tex), [tex]);
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label={tex.replace(/\\/g, " ").replace(/[{}]/g, "")}
    />
  );
}

// ===========================================================================
// AngleMaker -- the core interactive SVG used across stages 2-4
// ===========================================================================

interface AngleMakerProps {
  angle: number;
  onAngleChange?: (deg: number) => void;
  interactive?: boolean;
  showLabel?: boolean;
  width?: number;
  height?: number;
  viewBox?: string;
  mode?: "free" | "complementary" | "supplementary";
  dividerAngle?: number;
  onDividerChange?: (deg: number) => void;
}

function AngleMaker({
  angle,
  onAngleChange,
  interactive = true,
  showLabel = true,
  width = 400,
  height = 400,
  viewBox = "-8 -8 16 16",
  mode = "free",
  dividerAngle = 45,
  onDividerChange,
}: AngleMakerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rayLength = 6;
  const arcRadius = 1.8;

  // Endpoint of the draggable ray
  const rad = angle * DEG;
  const rayX = rayLength * Math.cos(rad);
  const rayY = -rayLength * Math.sin(rad);

  const roundedAngle = Math.round(angle);
  const currentType = classifyAngle(roundedAngle);
  const color = angleColor(roundedAngle);
  const typeName = angleTypeName(currentType);

  // Position the degree label inside or outside the arc
  const labelRadius =
    roundedAngle > 30 ? arcRadius * 0.6 : arcRadius * 1.35;
  const midRad = (angle / 2) * DEG;
  const labelX = labelRadius * Math.cos(midRad);
  const labelY = -labelRadius * Math.sin(midRad);

  /* ---------- Ray drag (free mode) ---------- */
  const bind = useDrag(
    ({ xy: [px, py], active, first, last }) => {
      if (!interactive || !onAngleChange) return;
      if (first) setDragging(true);
      if (last) {
        setDragging(false);
        return;
      }
      if (!svgRef.current) return;
      const { x, y } = clientToSvg(svgRef.current, px, py);
      let deg = Math.atan2(-y, x) * (180 / Math.PI);
      if (deg < 0) deg += 360;
      onAngleChange(snapAngle(deg));

      // Haptic feedback at snap points
      if (
        active &&
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        const nearest = NOTABLE_ANGLES.find((n) => Math.abs(deg - n) < 1);
        if (nearest !== undefined) {
          if (nearest === 90 || nearest === 180) {
            navigator.vibrate([10, 30, 10]);
          } else {
            navigator.vibrate(10);
          }
        }
      }
    },
    { pointer: { touch: true }, filterTaps: true },
  );

  /* ---------- Divider drag (comp/supp mode) ---------- */
  const divBind = useDrag(
    ({ xy: [px, py], last }) => {
      if (!interactive || !onDividerChange) return;
      if (!svgRef.current || last) return;
      const { x, y } = clientToSvg(svgRef.current, px, py);
      let deg = Math.atan2(-y, x) * (180 / Math.PI);
      if (deg < 0) deg += 360;
      const maxAngle = mode === "complementary" ? 90 : 180;
      deg = Math.max(1, Math.min(maxAngle - 1, deg));
      onDividerChange(Math.round(deg));
    },
    { pointer: { touch: true }, filterTaps: true },
  );

  const showRightSquare = currentType === "right" && mode === "free";
  const pairMode = mode === "complementary" || mode === "supplementary";
  const totalPairAngle = mode === "complementary" ? 90 : 180;

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      width={width}
      height={height}
      className="touch-none select-none"
      style={{ maxWidth: "100%", height: "auto" }}
      role="img"
    >
      <title>Interactive angle maker</title>
      <desc>
        {pairMode
          ? `${mode === "complementary" ? "Complementary" : "Supplementary"} pair: ${Math.round(dividerAngle)}\u00B0 and ${totalPairAngle - Math.round(dividerAngle)}\u00B0`
          : `Angle of ${roundedAngle} degrees, classified as ${typeName || "zero"}`}
      </desc>

      {/* Vertex glow filter */}
      <defs>
        <filter
          id="vertex-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="0.15" result="blur" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.96  0 0 0 0 0.96  0 0 0 0 0.98  0 0 0 0.4 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="arrowGray"
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={4}
          markerHeight={4}
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill={TEXT_SECONDARY} />
        </marker>
        <marker
          id="arrowWhite"
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={4}
          markerHeight={4}
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill={THEME.vertex} />
        </marker>
      </defs>

      {/* ======= FREE MODE arcs ======= */}
      {!pairMode && roundedAngle > 0 && roundedAngle < 360 && (
        <>
          <path
            d={anglePiePath(0, angle, arcRadius)}
            fill={color}
            fillOpacity={0.15}
          />
          <path
            d={angleArcPath(0, angle, arcRadius)}
            fill="none"
            stroke={color}
            strokeWidth={0.18}
            strokeLinecap="round"
          />
        </>
      )}

      {/* Right-angle square indicator */}
      {showRightSquare && (
        <motion.rect
          x={0.15}
          y={-0.65}
          width={0.5}
          height={0.5}
          fill="none"
          stroke={ANGLE_COLORS.right}
          strokeWidth={0.1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* ======= PAIR MODE arcs + divider ======= */}
      {pairMode && (
        <>
          {/* First arc */}
          {dividerAngle > 0 && (
            <>
              <path
                d={anglePiePath(0, dividerAngle, arcRadius)}
                fill={angleColor(dividerAngle)}
                fillOpacity={0.15}
              />
              <path
                d={angleArcPath(0, dividerAngle, arcRadius)}
                fill="none"
                stroke={angleColor(dividerAngle)}
                strokeWidth={0.18}
                strokeLinecap="round"
              />
            </>
          )}
          {/* Second arc */}
          {totalPairAngle - dividerAngle > 0 && (
            <>
              <path
                d={anglePiePath(dividerAngle, totalPairAngle, arcRadius)}
                fill={angleColor(totalPairAngle - dividerAngle)}
                fillOpacity={0.15}
              />
              <path
                d={angleArcPath(dividerAngle, totalPairAngle, arcRadius)}
                fill="none"
                stroke={angleColor(totalPairAngle - dividerAngle)}
                strokeWidth={0.18}
                strokeLinecap="round"
              />
            </>
          )}

          {/* Dividing ray with drag handle */}
          {(() => {
            const dRad = dividerAngle * DEG;
            const dX = rayLength * Math.cos(dRad);
            const dY = -rayLength * Math.sin(dRad);
            return (
              <g>
                <line
                  x1={0}
                  y1={0}
                  x2={dX}
                  y2={dY}
                  stroke={THEME.textLight}
                  strokeWidth={0.15}
                />
                {/* Invisible touch target */}
                <circle
                  cx={dX}
                  cy={dY}
                  r={0.8}
                  fill="transparent"
                  style={{ cursor: "grab", touchAction: "none" }}
                  {...divBind()}
                />
                {/* Visible handle */}
                <circle
                  cx={dX}
                  cy={dY}
                  r={0.3}
                  fill={THEME.dividerHandle}
                  stroke={THEME.dividerStroke}
                  strokeWidth={0.08}
                />
              </g>
            );
          })()}

          {/* Boundary ray (dashed) */}
          {(() => {
            const bRad = totalPairAngle * DEG;
            const bX = rayLength * Math.cos(bRad);
            const bY = -rayLength * Math.sin(bRad);
            return (
              <line
                x1={0}
                y1={0}
                x2={bX}
                y2={bY}
                stroke={TEXT_SECONDARY}
                strokeWidth={0.12}
                strokeDasharray="0.3 0.2"
              />
            );
          })()}

          {/* Pair degree labels */}
          {(() => {
            const mid1 = (dividerAngle / 2) * DEG;
            const mid2 = ((dividerAngle + totalPairAngle) / 2) * DEG;
            const lr = arcRadius * 0.55;
            return (
              <>
                <text
                  x={lr * Math.cos(mid1)}
                  y={-lr * Math.sin(mid1)}
                  fill={angleColor(dividerAngle)}
                  fontSize={0.7}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="'Space Grotesk', monospace"
                >
                  {Math.round(dividerAngle)}&deg;
                </text>
                <text
                  x={lr * Math.cos(mid2)}
                  y={-lr * Math.sin(mid2)}
                  fill={angleColor(totalPairAngle - dividerAngle)}
                  fontSize={0.7}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="'Space Grotesk', monospace"
                >
                  {totalPairAngle - Math.round(dividerAngle)}&deg;
                </text>
              </>
            );
          })()}
        </>
      )}

      {/* Fixed ray (horizontal right) */}
      <line
        x1={0}
        y1={0}
        x2={rayLength}
        y2={0}
        stroke={TEXT_SECONDARY}
        strokeWidth={0.12}
        markerEnd="url(#arrowGray)"
      />

      {/* Draggable ray (free mode only) */}
      {!pairMode && (
        <line
          x1={0}
          y1={0}
          x2={rayX}
          y2={rayY}
          stroke={THEME.vertex}
          strokeWidth={0.16}
          markerEnd="url(#arrowWhite)"
        />
      )}

      {/* Vertex dot */}
      <circle
        cx={0}
        cy={0}
        r={0.2}
        fill={THEME.vertex}
        stroke={TEXT_SECONDARY}
        strokeWidth={0.06}
        filter="url(#vertex-glow)"
      />

      {/* Drag handle (free mode) */}
      {interactive && !pairMode && (
        <g
          style={{
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          {...bind()}
        >
          {/* Expanded invisible touch target (>=44px) */}
          <circle cx={rayX} cy={rayY} r={1.2} fill="transparent" />
          {/* Visible circle */}
          <motion.circle
            cx={rayX}
            cy={rayY}
            r={0.4}
            fill={
              dragging ? THEME.handleActive : hovering ? THEME.handleHover : THEME.handleDefault
            }
            stroke={THEME.handleStroke}
            strokeWidth={0.08}
            animate={{
              scale: dragging ? 1.25 : hovering ? 1.15 : 1,
            }}
            transition={SPRING}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
          />
        </g>
      )}

      {/* Degree display (free mode) */}
      {showLabel && !pairMode && roundedAngle > 0 && (
        <text
          x={labelX}
          y={labelY}
          fill={color}
          fontSize={0.8}
          fontFamily="'Space Grotesk', monospace"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {roundedAngle}&deg;
        </text>
      )}

      {/* Angle type label (free mode) */}
      {showLabel && !pairMode && typeName && (
        <AnimatePresence mode="wait">
          <motion.text
            key={typeName}
            x={0}
            y={-arcRadius - 0.8}
            fill={color}
            fontSize={0.7}
            fontWeight={700}
            textAnchor={"middle" as const}
            dominantBaseline="central"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
          >
            {typeName}!
          </motion.text>
        </AnimatePresence>
      )}

      {/* Screen-reader live region */}
      <text
        aria-live="polite"
        className="sr-only"
        x={-100}
        y={-100}
        fontSize={0}
      >
        {pairMode
          ? `${mode} pair: ${Math.round(dividerAngle)} degrees and ${totalPairAngle - Math.round(dividerAngle)} degrees`
          : `${roundedAngle} degrees, ${typeName || "zero"}`}
      </text>
    </svg>
  );
}

// ===========================================================================
// STAGE 1 -- Hook: Clock rotation
// ===========================================================================

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/AnglesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const degreeValue = useMotionValue(0);
  const displayDeg = useTransform(degreeValue, (v) => Math.round(v));
  const [degText, setDegText] = useState("0");
  const [minuteRot, setMinuteRot] = useState(0);
  const [montageIdx, setMontageIdx] = useState(0);

  // Subscribe to motion values
  useEffect(() => {
    const u1 = displayDeg.on("change", (v) => setDegText(String(v)));
    const u2 = degreeValue.on("change", (v) => setMinuteRot(v));
    return () => {
      u1();
      u2();
    };
  }, [degreeValue, displayDeg]);

  // Phase timeline
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    ids.push(setTimeout(() => setPhase(1), 800));
    ids.push(
      setTimeout(() => {
        setPhase(2);
        animate(degreeValue, 90, { duration: 1.2, ease: "easeInOut" });
      }, 800),
    );
    ids.push(
      setTimeout(() => {
        setPhase(3);
        animate(degreeValue, 180, { duration: 1.1, ease: "easeInOut" });
      }, 2200),
    );
    ids.push(
      setTimeout(() => {
        setPhase(4);
        animate(degreeValue, 270, { duration: 1.0, ease: "easeInOut" });
      }, 3500),
    );
    ids.push(
      setTimeout(() => {
        setPhase(5);
        animate(degreeValue, 360, { duration: 1.0, ease: "easeInOut" });
      }, 4700),
    );
    ids.push(setTimeout(() => setPhase(6), 2800));
    ids.push(setTimeout(() => setPhase(7), 3200));
    ids.push(
      setTimeout(() => {
        setPhase(8);
        setShowContinue(true);
      }, 4000),
    );
    // Failsafe: guarantee Continue button within 4s
    ids.push(setTimeout(() => setShowContinue(true), 4000));
    return () => ids.forEach(clearTimeout);
  }, [degreeValue]);

  const annotations: Record<number, string> = {
    2: "Quarter turn",
    3: "Half turn",
    4: "Three-quarter turn",
    5: "Full turn = back to start",
  };

  function sweepColor(): string {
    const d = Number(degText);
    if (d <= 0) return "transparent";
    if (d <= 90) return `${THEME.acute}60`;
    if (d <= 180) return `${THEME.obtuse}60`;
    if (d <= 270) return `${THEME.straight}60`;
    return `${THEME.reflex}60`;
  }

  const realLifeItems = [
    { label: "Door: ~45\u00B0", angle: 45 },
    { label: "Pizza slice: ~30\u00B0", angle: 30 },
    { label: "Ramp: ~20\u00B0", angle: 20 },
    { label: "Scissors: ~25\u00B0", angle: 25 },
  ];

  // Cycle through montage images
  useEffect(() => {
    if (phase !== 7) return;
    setMontageIdx(0);
    const iv = setInterval(() => {
      setMontageIdx((i) => {
        if (i >= 3) {
          clearInterval(iv);
          return 3;
        }
        return i + 1;
      });
    }, 500);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4">
      <div aria-live="polite" className="sr-only">
        A clock shows the minute hand sweeping from 12 to 3, forming a 90
        degree angle. The hand continues to 6 forming 180 degrees, to 9
        forming 270 degrees, and back to 12 for a full 360 degree rotation.
      </div>

      {/* ---- Clock (phases 0-5) ---- */}
      {phase <= 8 && (
        <motion.div
          className="flex flex-col items-center"
          animate={phase === 6 ? { scale: 0.5, x: -120 } : {}}
          transition={SPRING}
        >
          <svg
            viewBox="-6 -6 12 12"
            width={300}
            height={300}
            className="select-none"
            style={{ maxWidth: "80vw" }}
            role="img"
          >
            <title>Clock showing angle rotation</title>

            {/* Clock face fill */}
            <circle cx={0} cy={0} r={5} fill={BG} />

            {/* Border */}
            <motion.circle
              cx={0}
              cy={0}
              r={5}
              fill="none"
              stroke={BORDER_LIGHT}
              strokeWidth={0.18}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Hour ticks */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const a = i * 30 * DEG;
                return (
                  <line
                    key={i}
                    x1={4.4 * Math.sin(a)}
                    y1={-4.4 * Math.cos(a)}
                    x2={4.8 * Math.sin(a)}
                    y2={-4.8 * Math.cos(a)}
                    stroke={TEXT_SECONDARY}
                    strokeWidth={0.12}
                  />
                );
              })}
            </motion.g>

            {/* Swept colour fill */}
            {minuteRot > 0 && minuteRot <= 360 && (
              <path
                d={(() => {
                  const d = minuteRot;
                  const r = 4;
                  // 12 o'clock = 90 degrees in math coords
                  const sRad = 90 * DEG;
                  const eRad = (90 - d) * DEG;
                  const x1 = r * Math.cos(sRad);
                  const y1 = -r * Math.sin(sRad);
                  const x2 = r * Math.cos(eRad);
                  const y2 = -r * Math.sin(eRad);
                  const large = d > 180 ? 1 : 0;
                  return `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
                })()}
                fill={sweepColor()}
              />
            )}

            {/* Hour hand (fixed at 3 o'clock) */}
            <motion.line
              x1={0}
              y1={0}
              x2={2.5}
              y2={0}
              stroke="#cbd5e1"
              strokeWidth={0.28}
              strokeLinecap="round"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.3, ease: "backOut" }}
              style={{ transformOrigin: "0 0" }}
            />

            {/* Minute hand (rotates clockwise) */}
            <motion.line
              x1={0}
              y1={0}
              x2={0}
              y2={-4}
              stroke={THEME.primary}
              strokeWidth={0.22}
              strokeLinecap="round"
              style={{ transformOrigin: "0 0" }}
              animate={{ rotate: minuteRot }}
              transition={{ duration: 0 }}
            />

            {/* Center dot */}
            <circle cx={0} cy={0} r={0.25} fill={WARNING} />
          </svg>

          {/* Degree counter */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span
              className="text-3xl font-bold text-white tabular-nums"
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {degText}&deg;
            </span>
            {annotations[phase] && (
              <motion.p
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-slate-400"
              >
                {annotations[phase]}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ---- Core message (phase 6) ---- */}
      <AnimatePresence>
        {phase === 6 && (
          <motion.div
            className="flex flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="text-xl font-bold text-slate-50"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Angles measure ROTATION.
            </motion.h2>
            <motion.p
              className="text-base text-slate-300"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              A full turn = 360&deg;.
            </motion.p>
            <motion.p
              className="text-base text-slate-300"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              A quarter turn = 90&deg;.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Real-life montage (phase 7) ---- */}
      <AnimatePresence>
        {phase === 7 && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={montageIdx}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="-4 -4 8 8" width={180} height={180}>
                  {(() => {
                    const item =
                      (realLifeItems[montageIdx] ?? realLifeItems[0])!;
                    const r = item.angle * DEG;
                    const len = 3;
                    return (
                      <>
                        <line
                          x1={0}
                          y1={0}
                          x2={len}
                          y2={0}
                          stroke={THEME.textLight}
                          strokeWidth={0.12}
                        />
                        <line
                          x1={0}
                          y1={0}
                          x2={len * Math.cos(r)}
                          y2={-len * Math.sin(r)}
                          stroke={THEME.textLight}
                          strokeWidth={0.12}
                        />
                        <path
                          d={angleArcPath(0, item.angle, 1.2)}
                          fill="none"
                          stroke={SUCCESS}
                          strokeWidth={0.1}
                        />
                      </>
                    );
                  })()}
                </svg>
                <p className="text-sm text-slate-400 mt-1">
                  {realLifeItems[montageIdx]?.label ?? ""}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <motion.div
        className="absolute bottom-8 w-full max-w-sm px-4"
        initial={{ opacity: 0, y: 8 }}
        animate={
          showContinue ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
        }
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={onComplete}
          disabled={!showContinue}
          className="w-full h-12 rounded-xl bg-nm-domain-numbers text-white text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Let's explore angles"
        >
          Let&apos;s explore angles
        </button>
      </motion.div>
    </section>
  );
}

// ===========================================================================
// STAGE 2 -- Spatial Experience: free angle making
// ===========================================================================

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [angle, setAngle] = useState(45);
  const [interactions, setInteractions] = useState(0);
  const [mode, setMode] = useState<
    "free" | "complementary" | "supplementary"
  >("free");
  const [dividerAngle, setDividerAngle] = useState(45);
  const prevAngleRef = useRef(45);

  const MIN_INTERACTIONS = 10;
  const canContinue = interactions >= MIN_INTERACTIONS;

  const handleAngleChange = useCallback((deg: number) => {
    setAngle(deg);
    if (Math.abs(deg - prevAngleRef.current) > 5) {
      setInteractions((i) => Math.min(i + 1, MIN_INTERACTIONS));
      prevAngleRef.current = deg;
    }
  }, []);

  const handlePreset = useCallback((target: number) => {
    setAngle(target);
    setInteractions((i) => Math.min(i + 1, MIN_INTERACTIONS));
    prevAngleRef.current = target;
  }, []);

  const handleModeToggle = useCallback(
    (newMode: "complementary" | "supplementary") => {
      setMode((prev) => {
        if (prev === newMode) return "free";
        setInteractions((i) => Math.min(i + 1, MIN_INTERACTIONS));
        return newMode;
      });
    },
    [],
  );

  const handleDividerChange = useCallback((deg: number) => {
    setDividerAngle(deg);
    setInteractions((i) => Math.min(i + 1, MIN_INTERACTIONS));
  }, []);

  const totalPairAngle = mode === "complementary" ? 90 : 180;

  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4">
      {/* Interaction dots */}
      <div className="pt-3 pb-1">
        <InteractionDots count={interactions} total={MIN_INTERACTIONS} activeColor={THEME.primary} />
      </div>

      {/* Equation for pair modes */}
      <AnimatePresence>
        {mode !== "free" && (
          <motion.div
            className="text-center py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Katex
              tex={`${Math.round(dividerAngle)}^\\circ + ${totalPairAngle - Math.round(dividerAngle)}^\\circ = ${totalPairAngle}^\\circ`}
              className="text-lg text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The angle maker */}
      <div className="flex flex-1 items-center justify-center w-full">
        <AngleMaker
          angle={angle}
          onAngleChange={handleAngleChange}
          interactive
          mode={mode}
          dividerAngle={dividerAngle}
          onDividerChange={handleDividerChange}
        />
      </div>

      {/* Controls */}
      <div className="pb-4 space-y-3">
        {/* Preset buttons */}
        <div className="flex gap-2 justify-center overflow-x-auto pb-1">
          {PRESET_ANGLES.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePreset(p.value)}
              className="min-h-[40px] min-w-[44px] rounded-lg border-[1.5px] bg-transparent px-3 text-sm font-semibold text-slate-200 transition-colors hover:brightness-110"
              style={{ borderColor: p.color }}
              aria-label={`Set angle to ${p.value} degrees`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Mode toggles */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleModeToggle("complementary")}
            className="min-h-[40px] rounded-lg border-[1.5px] px-4 text-sm font-semibold transition-colors"
            style={{
              borderColor:
                mode === "complementary" ? SUCCESS : BORDER_LIGHT,
              backgroundColor:
                mode === "complementary"
                  ? `${SUCCESS}26`
                  : "transparent",
              color:
                mode === "complementary" ? SUCCESS : THEME.textLight,
            }}
            role="switch"
            aria-checked={mode === "complementary"}
            aria-label="Complementary pair mode"
          >
            Complementary = 90&deg;
          </button>
          <button
            onClick={() => handleModeToggle("supplementary")}
            className="min-h-[40px] rounded-lg border-[1.5px] px-4 text-sm font-semibold transition-colors"
            style={{
              borderColor:
                mode === "supplementary" ? INFO : BORDER_LIGHT,
              backgroundColor:
                mode === "supplementary"
                  ? `${INFO}26`
                  : "transparent",
              color:
                mode === "supplementary" ? INFO : THEME.textLight,
            }}
            role="switch"
            aria-checked={mode === "supplementary"}
            aria-label="Supplementary pair mode"
          >
            Supplementary = 180&deg;
          </button>
        </div>

        {/* Continue */}
        {canContinue && (
          <ContinueButton onClick={onComplete} color={THEME.primary}>
            Continue
          </ContinueButton>
        )}
      </div>
    </section>
  );
}

// ===========================================================================
// STAGE 3 -- Guided Discovery: 6 progressive prompts
// ===========================================================================

interface DiscoveryPrompt {
  text: ReactNode;
  goalCheck: (
    angle: number,
    mode: string,
    time: number,
    subGoals: boolean[],
  ) => boolean;
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [angle, setAngle] = useState(0);
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [holdTime, setHoldTime] = useState(0);
  const holdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [mode, setMode] = useState<
    "free" | "complementary" | "supplementary"
  >("free");
  const [dividerAngle, setDividerAngle] = useState(45);
  const [compUsed, setCompUsed] = useState(false);
  const [suppUsed, setSuppUsed] = useState(false);
  const [compDragged, setCompDragged] = useState(false);
  const [suppDragged, setSuppDragged] = useState(false);
  const compInitRef = useRef(45);
  const suppInitRef = useRef(90);
  const [allDone, setAllDone] = useState(false);

  const prompts: DiscoveryPrompt[] = useMemo(
    () => [
      {
        text: (
          <>
            Drag the ray to make different angles. Angles less than 90
            degrees are called{" "}
            <strong style={{ color: ANGLE_COLORS.acute }}>
              ACUTE
            </strong>{" "}
            (sharp!). Try to make one.
          </>
        ),
        goalCheck: (a) => a > 0 && a < 90,
      },
      {
        text: (
          <>
            Now make exactly 90 degrees. See the little square?
            That&apos;s a{" "}
            <strong style={{ color: ANGLE_COLORS.right }}>
              RIGHT ANGLE
            </strong>{" "}
            -- the most important angle in math!
          </>
        ),
        goalCheck: (a) => Math.abs(a - 90) <= 2,
      },
      {
        text: (
          <>
            Keep going past 90 degrees. Now it&apos;s{" "}
            <strong style={{ color: ANGLE_COLORS.obtuse }}>
              OBTUSE
            </strong>{" "}
            (wide/blunt). These are between 90 and 180 degrees.
          </>
        ),
        goalCheck: (a) => a > 90 && a < 180,
      },
      {
        text: (
          <>
            Go to 180 degrees -- a perfectly flat line. This is a{" "}
            <strong style={{ color: ANGLE_COLORS.straight }}>
              STRAIGHT ANGLE
            </strong>
            .
          </>
        ),
        goalCheck: (a) => Math.abs(a - 180) <= 2,
      },
      {
        text: (
          <>
            Now for the <em>secret level</em>: keep going past 180
            degrees! This is a{" "}
            <strong style={{ color: ANGLE_COLORS.reflex }}>
              REFLEX ANGLE
            </strong>
            .
          </>
        ),
        goalCheck: (a) => a > 180 && a < 360,
      },
      {
        text: (
          <>
            Final discovery: use the{" "}
            <strong style={{ color: ANGLE_COLORS.acute }}>
              Complementary
            </strong>{" "}
            and{" "}
            <strong style={{ color: ANGLE_COLORS.obtuse }}>
              Supplementary
            </strong>{" "}
            buttons below, and drag the divider ray!
          </>
        ),
        goalCheck: (_a, _m, _t, sg) =>
          sg[0] === true && sg[1] === true,
      },
    ],
    [],
  );

  // Goal-hold timer
  useEffect(() => {
    if (completed[currentPromptIdx]) return;
    const prompt = prompts[currentPromptIdx];
    if (!prompt) return;

    const subGoals = [
      compUsed && compDragged,
      suppUsed && suppDragged,
    ];
    const goalMet = prompt.goalCheck(
      angle,
      mode,
      holdTime,
      subGoals,
    );

    if (goalMet) {
      if (!holdRef.current) {
        holdRef.current = setInterval(
          () => setHoldTime((t) => t + 100),
          100,
        );
      }
      if (holdTime >= 500) {
        if (holdRef.current) clearInterval(holdRef.current);
        holdRef.current = null;
        setHoldTime(0);
        setCompleted((prev) => {
          const next = [...prev];
          next[currentPromptIdx] = true;
          return next;
        });
        if (currentPromptIdx < prompts.length - 1) {
          setTimeout(
            () => setCurrentPromptIdx((i) => i + 1),
            800,
          );
        } else {
          setTimeout(() => setAllDone(true), 800);
        }
      }
    } else {
      if (holdRef.current) {
        clearInterval(holdRef.current);
        holdRef.current = null;
      }
      setHoldTime(0);
    }

    return () => {
      if (holdRef.current) clearInterval(holdRef.current);
      holdRef.current = null;
    };
  }, [
    angle,
    mode,
    holdTime,
    currentPromptIdx,
    completed,
    prompts,
    compUsed,
    compDragged,
    suppUsed,
    suppDragged,
  ]);

  const handleModeToggle = useCallback(
    (newMode: "complementary" | "supplementary") => {
      setMode((prev) => {
        if (prev === newMode) return "free";
        if (newMode === "complementary") {
          setCompUsed(true);
          compInitRef.current = dividerAngle;
        }
        if (newMode === "supplementary") {
          setSuppUsed(true);
          suppInitRef.current = dividerAngle;
        }
        return newMode;
      });
    },
    [dividerAngle],
  );

  const handleDividerChange = useCallback(
    (deg: number) => {
      setDividerAngle(deg);
      if (
        mode === "complementary" &&
        Math.abs(deg - compInitRef.current) >= 5
      ) {
        setCompDragged(true);
      }
      if (
        mode === "supplementary" &&
        Math.abs(deg - suppInitRef.current) >= 5
      ) {
        setSuppDragged(true);
      }
    },
    [mode],
  );

  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4">
      {/* Prompts */}
      <div className="pt-3 pb-2 space-y-2 max-h-[40%] overflow-y-auto">
        {prompts.slice(0, currentPromptIdx + 1).map((p, i) => (
          <motion.div
            key={i}
            className="rounded-[10px] px-4 py-3 text-[15px] leading-relaxed flex items-start gap-2"
            style={{
              background: `${BG}e6`,
              opacity: completed[i] ? 0.6 : 1,
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{
              opacity: completed[i] ? 0.6 : 1,
              y: 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex-1 text-slate-200">{p.text}</span>
            {completed[i] && (
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke={SUCCESS}
                strokeWidth={3}
                className="flex-shrink-0 mt-1"
                aria-label="Completed"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Angle maker */}
      <div className="flex flex-1 items-center justify-center w-full">
        <AngleMaker
          angle={angle}
          onAngleChange={setAngle}
          interactive
          mode={mode}
          dividerAngle={dividerAngle}
          onDividerChange={handleDividerChange}
          width={320}
          height={320}
        />
      </div>

      {/* Mode toggles (appear for prompt 6) */}
      {currentPromptIdx >= 5 && (
        <div className="flex gap-2 justify-center pb-2">
          <button
            onClick={() => handleModeToggle("complementary")}
            className="min-h-[40px] rounded-lg border-[1.5px] px-3 text-sm font-semibold transition-colors"
            style={{
              borderColor:
                mode === "complementary" ? SUCCESS : BORDER_LIGHT,
              backgroundColor:
                mode === "complementary"
                  ? `${SUCCESS}26`
                  : "transparent",
              color:
                mode === "complementary" ? SUCCESS : THEME.textLight,
            }}
            role="switch"
            aria-checked={mode === "complementary"}
            aria-label="Complementary pair mode"
          >
            Complementary
          </button>
          <button
            onClick={() => handleModeToggle("supplementary")}
            className="min-h-[40px] rounded-lg border-[1.5px] px-3 text-sm font-semibold transition-colors"
            style={{
              borderColor:
                mode === "supplementary" ? INFO : BORDER_LIGHT,
              backgroundColor:
                mode === "supplementary"
                  ? `${INFO}26`
                  : "transparent",
              color:
                mode === "supplementary" ? INFO : THEME.textLight,
            }}
            role="switch"
            aria-checked={mode === "supplementary"}
            aria-label="Supplementary pair mode"
          >
            Supplementary
          </button>
        </div>
      )}

      {/* Completion + continue */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            className="pb-6 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-lg border-l-[3px] border-nm-accent-emerald bg-nm-bg-secondary p-3 text-sm text-slate-200">
              You&apos;ve discovered all the angle types! Let&apos;s
              put names to what you&apos;ve learned.
            </div>
            <ContinueButton onClick={onComplete} color={THEME.primary}>
              Continue
            </ContinueButton>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ===========================================================================
// STAGE 4 -- Symbol Bridge: notation + classification table
// ===========================================================================

function SymbolBridgeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const [demoAngle, setDemoAngle] = useState(45);
  const [highlightRow, setHighlightRow] = useState(-1);
  const [visibleRows, setVisibleRows] = useState(0);

  const tableRows: ReadonlyArray<{
    type: string;
    range: string;
    color: string;
    angle: number;
  }> = useMemo(
    () => [
      {
        type: "Acute",
        range: "0^\\circ < \\theta < 90^\\circ",
        color: ANGLE_COLORS.acute,
        angle: 45,
      },
      {
        type: "Right",
        range: "\\theta = 90^\\circ",
        color: ANGLE_COLORS.right,
        angle: 90,
      },
      {
        type: "Obtuse",
        range: "90^\\circ < \\theta < 180^\\circ",
        color: ANGLE_COLORS.obtuse,
        angle: 135,
      },
      {
        type: "Straight",
        range: "\\theta = 180^\\circ",
        color: ANGLE_COLORS.straight,
        angle: 180,
      },
      {
        type: "Reflex",
        range: "180^\\circ < \\theta < 360^\\circ",
        color: ANGLE_COLORS.reflex,
        angle: 270,
      },
    ],
    [],
  );

  // Step timeline
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    ids.push(setTimeout(() => setStep(1), 5000));
    ids.push(setTimeout(() => setStep(2), 12000));
    ids.push(setTimeout(() => setStep(3), 18000));
    ids.push(setTimeout(() => setStep(4), 35000));
    ids.push(setTimeout(() => setStep(5), 42000));
    return () => ids.forEach(clearTimeout);
  }, []);

  // Reveal table rows one at a time
  useEffect(() => {
    if (step < 3) return;
    let row = 0;
    const iv = setInterval(() => {
      row++;
      if (row <= tableRows.length) {
        setVisibleRows(row);
        const r = tableRows[row - 1];
        if (r) {
          setDemoAngle(r.angle);
          setHighlightRow(row - 1);
        }
      } else {
        clearInterval(iv);
      }
    }, 2500);
    return () => clearInterval(iv);
  }, [step, tableRows]);

  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4 overflow-y-auto">
      <div className="flex flex-col gap-4 py-4 flex-1">
        {/* Notation introduction */}
        <motion.div
          className="flex gap-4 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex-shrink-0">
            <AngleMaker
              angle={demoAngle}
              interactive={step >= 3 && step < 5}
              onAngleChange={(deg) => {
                setDemoAngle(deg);
                const matchIdx = tableRows.findIndex((r) => {
                  const t = classifyAngle(deg);
                  return t === r.type.toLowerCase();
                });
                setHighlightRow(matchIdx);
              }}
              showLabel
              width={180}
              height={180}
              viewBox="-8 -8 16 16"
            />
          </div>

          <div className="flex-1 space-y-3">
            {/* Vertex labels */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-slate-400">
                Points:{" "}
                <strong className="text-slate-200">A</strong> (ray
                1),{" "}
                <span className="text-amber-400 font-bold">B</span>{" "}
                (vertex),{" "}
                <strong className="text-slate-200">C</strong> (ray 2)
              </p>
            </motion.div>

            {/* Angle symbol */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                <Katex
                  tex="\\angle ABC"
                  className="text-xl text-white"
                />
                <p className="text-xs text-slate-500">
                  The vertex letter always goes in the{" "}
                  <strong className="text-slate-300">MIDDLE</strong>
                </p>
              </motion.div>
            )}

            {/* Degree symbol */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-slate-500"
              >
                The small circle is the degree symbol: 360&deg; in a
                full turn.
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Classification table */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <table
              className="w-full rounded-[10px] overflow-hidden border border-nm-bg-secondary text-sm"
              style={{ background: BG }}
            >
              <thead>
                <tr style={{ background: SURFACE }}>
                  <th className="py-2 px-3 text-left text-xs text-slate-400 font-medium">
                    Type
                  </th>
                  <th className="py-2 px-3 text-left text-xs text-slate-400 font-medium">
                    Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows
                  .slice(0, visibleRows)
                  .map((row, i) => (
                    <motion.tr
                      key={row.type}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        borderLeft:
                          highlightRow === i
                            ? `3px solid ${row.color}`
                            : "3px solid transparent",
                      }}
                    >
                      <td
                        className="py-2 px-3 font-semibold"
                        style={{ color: row.color }}
                      >
                        {row.type}
                      </td>
                      <td className="py-2 px-3">
                        <Katex
                          tex={row.range}
                          className="text-slate-300"
                        />
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Comp/supp/triangle preview notation */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="rounded-lg bg-nm-bg-primary border border-nm-bg-secondary p-3">
              <p className="text-xs text-slate-500 mb-1">
                Complementary
              </p>
              <Katex
                tex="\\alpha + \\beta = 90^\\circ"
                className="text-base text-white"
              />
            </div>
            <div className="rounded-lg bg-nm-bg-primary border border-nm-bg-secondary p-3">
              <p className="text-xs text-slate-500 mb-1">
                Supplementary
              </p>
              <Katex
                tex="\\alpha + \\beta = 180^\\circ"
                className="text-base text-white"
              />
            </div>
            <div className="rounded-lg bg-nm-bg-primary border-l-2 border-dashed border-nm-bg-elevated p-3">
              <p className="text-xs text-slate-600 mb-1">
                Preview (next lesson!)
              </p>
              <Katex
                tex="\\alpha + \\beta + \\gamma = 180^\\circ"
                className="text-sm text-slate-400"
              />
              <p className="text-xs text-slate-600 mt-1">
                Triangle angle sum
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Continue */}
      {step >= 5 && (
        <ContinueButton onClick={onComplete} color={THEME.primary}>
          See it in the real world
        </ContinueButton>
      )}
    </section>
  );
}

// ===========================================================================
// STAGE 5 -- Real-World Anchor: swipeable cards
// ===========================================================================

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [viewedCards, setViewedCards] = useState<Set<number>>(
    new Set([0]),
  );

  const cards = useMemo(
    () => [
      {
        title: "Right angles make buildings stand up straight",
        description:
          "Look around any room -- walls meet floors and ceilings at 90-degree angles. This makes structures stable. If the angles were off by even a few degrees, the building would lean.",
        angle: 90,
        color: ANGLE_COLORS.right,
        label: "90\u00B0",
      },
      {
        title: "A basketball shot at 45\u00B0 goes the farthest",
        description:
          "In physics, a projectile launched at 45 degrees covers the maximum horizontal distance. Basketball players instinctively adjust their shot angle.",
        angle: 45,
        color: ANGLE_COLORS.acute,
        label: "45\u00B0",
      },
      {
        title: "Compass bearings use angles to navigate",
        description:
          "Sailors, pilots, and hikers use compass bearings measured in degrees from North. North is 0\u00B0, East is 90\u00B0, South is 180\u00B0, West is 270\u00B0.",
        angle: 45,
        color: ANGLE_COLORS.acute,
        label: "NE = 45\u00B0",
      },
      {
        title:
          "Scissors open at different angles for different cuts",
        description:
          "Tool design is all about angles. Scissors open wider for cutting thick material (~60\u00B0) and narrower for precision cuts (~25\u00B0).",
        angle: 25,
        color: ANGLE_COLORS.acute,
        label: "~25\u00B0",
      },
    ],
    [],
  );

  const canContinue = viewedCards.size >= 2;

  const goToCard = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(cards.length - 1, idx));
      setCurrentCard(clamped);
      setViewedCards((prev) => new Set([...prev, clamped]));
    },
    [cards.length],
  );

  const cardSwipeBind = useDrag(
    ({ direction: [dx], distance: [dist], last }) => {
      if (!last || dist < 30) return;
      if (dx > 0) goToCard(currentCard - 1);
      else goToCard(currentCard + 1);
    },
    { axis: "x", filterTaps: true },
  );

  const card = cards[currentCard];

  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4">
      <div
        className="flex flex-1 items-center justify-center w-full py-4"
        style={{ touchAction: "pan-y" }}
        {...cardSwipeBind()}
      >
        <AnimatePresence mode="wait">
          {card && (
            <motion.div
              key={currentCard}
              className="w-full max-w-md rounded-xl border border-nm-bg-secondary bg-nm-bg-primary p-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              {/* SVG illustration */}
              <div className="flex justify-center mb-4">
                <svg viewBox="-4 -4 8 8" width={160} height={160}>
                  <line
                    x1={0}
                    y1={0}
                    x2={3}
                    y2={0}
                    stroke={THEME.textLight}
                    strokeWidth={0.1}
                  />
                  <line
                    x1={0}
                    y1={0}
                    x2={
                      3 * Math.cos(card.angle * DEG)
                    }
                    y2={
                      -3 * Math.sin(card.angle * DEG)
                    }
                    stroke={THEME.textLight}
                    strokeWidth={0.1}
                  />
                  <path
                    d={angleArcPath(0, card.angle, 1)}
                    fill="none"
                    stroke={card.color}
                    strokeWidth={0.08}
                  />
                  <text
                    x={
                      1.4 *
                      Math.cos(
                        (card.angle / 2) * DEG,
                      )
                    }
                    y={
                      -1.4 *
                      Math.sin(
                        (card.angle / 2) * DEG,
                      )
                    }
                    fill={card.color}
                    fontSize={0.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {card.label}
                  </text>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 pb-2">
        <button
          onClick={() => goToCard(currentCard - 1)}
          disabled={currentCard === 0}
          className="min-h-[44px] min-w-[44px] rounded-full border border-nm-bg-surface text-slate-400 disabled:opacity-30 flex items-center justify-center"
          aria-label="Previous card"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {cards.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-colors"
              style={{
                width: 6,
                height: 6,
                backgroundColor:
                  i === currentCard ? THEME.primary : BORDER_LIGHT,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => goToCard(currentCard + 1)}
          disabled={currentCard === cards.length - 1}
          className="min-h-[44px] min-w-[44px] rounded-full border border-nm-bg-surface text-slate-400 disabled:opacity-30 flex items-center justify-center"
          aria-label="Next card"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Continue */}
      {canContinue && (
        <ContinueButton onClick={onComplete} color={THEME.primary}>
          Practice time
        </ContinueButton>
      )}
    </section>
  );
}

// ===========================================================================
// STAGE 6 -- Practice: 9 problems across 3 layers
// ===========================================================================

interface Problem {
  id: string;
  layer: 0 | 1 | 2;
  question: ReactNode;
  type: "mc" | "numeric" | "text" | "interactive";
  options?: ReadonlyArray<{ label: string; color: string }>;
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  visualization?: ReactNode;
}

// --- Triangle interactive sub-component for Problem 7 ---

function InteractiveTriangle({
  onAnglesDiscovered,
}: {
  onAnglesDiscovered: () => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vertices, setVertices] = useState([
    { x: -3, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: -2.5 },
  ]);
  const [moveCount, setMoveCount] = useState(0);
  const [tearPhase, setTearPhase] = useState(-1); // -1 = not started

  function triAngle(
    p1: { x: number; y: number },
    vertex: { x: number; y: number },
    p2: { x: number; y: number },
  ): number {
    const v1x = p1.x - vertex.x;
    const v1y = p1.y - vertex.y;
    const v2x = p2.x - vertex.x;
    const v2y = p2.y - vertex.y;
    const dot = v1x * v2x + v1y * v2y;
    const cross = v1x * v2y - v1y * v2x;
    return Math.round(
      Math.atan2(Math.abs(cross), dot) * (180 / Math.PI),
    );
  }

  const v = vertices;
  const angles = [
    triAngle(v[1]!, v[0]!, v[2]!),
    triAngle(v[0]!, v[1]!, v[2]!),
    triAngle(v[0]!, v[2]!, v[1]!),
  ];
  const sum = angles[0]! + angles[1]! + angles[2]!;

  // Drag bindings for each vertex -- we must create them unconditionally
  const dragBind0 = useDrag(
    ({ xy: [px, py], last }) => {
      if (!svgRef.current) return;
      const { x, y } = clientToSvg(svgRef.current, px, py);
      setVertices((prev) => {
        const next = [...prev];
        next[0] = {
          x: Math.max(-5, Math.min(5, x)),
          y: Math.max(-4, Math.min(4, y)),
        };
        return next;
      });
      if (last) setMoveCount((c) => c + 1);
    },
    { pointer: { touch: true }, filterTaps: true },
  );

  const dragBind1 = useDrag(
    ({ xy: [px, py], last }) => {
      if (!svgRef.current) return;
      const { x, y } = clientToSvg(svgRef.current, px, py);
      setVertices((prev) => {
        const next = [...prev];
        next[1] = {
          x: Math.max(-5, Math.min(5, x)),
          y: Math.max(-4, Math.min(4, y)),
        };
        return next;
      });
      if (last) setMoveCount((c) => c + 1);
    },
    { pointer: { touch: true }, filterTaps: true },
  );

  const dragBind2 = useDrag(
    ({ xy: [px, py], last }) => {
      if (!svgRef.current) return;
      const { x, y } = clientToSvg(svgRef.current, px, py);
      setVertices((prev) => {
        const next = [...prev];
        next[2] = {
          x: Math.max(-5, Math.min(5, x)),
          y: Math.max(-4, Math.min(4, y)),
        };
        return next;
      });
      if (last) setMoveCount((c) => c + 1);
    },
    { pointer: { touch: true }, filterTaps: true },
  );

  const dragBindings = [dragBind0, dragBind1, dragBind2];

  const canStartTearOff = moveCount >= 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        ref={svgRef}
        viewBox="-6 -5 12 10"
        width={300}
        height={250}
        className="touch-none select-none"
        role="img"
      >
        <title>
          Interactive triangle with draggable vertices
        </title>

        {tearPhase < 0 ? (
          <>
            {/* Triangle fill + edges */}
            <polygon
              points={v
                .map((pt) => `${pt.x},${pt.y}`)
                .join(" ")}
              fill="rgba(99, 102, 241, 0.08)"
              stroke={TEXT_SECONDARY}
              strokeWidth={0.08}
            />

            {/* Angle arcs + labels at each vertex */}
            {v.map((vertex, i) => {
              const prev = v[(i + 2) % 3]!;
              const next = v[(i + 1) % 3]!;
              const a1 =
                Math.atan2(
                  -(prev.y - vertex.y),
                  prev.x - vertex.x,
                ) *
                (180 / Math.PI);
              const a2 =
                Math.atan2(
                  -(next.y - vertex.y),
                  next.x - vertex.x,
                ) *
                (180 / Math.PI);
              let start = a1;
              let end = a2;
              let diff = end - start;
              if (diff < 0) diff += 360;
              if (diff > 180) {
                const tmp = start;
                start = end;
                end = tmp;
              }
              const r = 0.6;
              const sRad = start * DEG;
              const eRad = end * DEG;
              const ax1 = vertex.x + r * Math.cos(sRad);
              const ay1 =
                vertex.y - r * Math.sin(sRad);
              const ax2 = vertex.x + r * Math.cos(eRad);
              const ay2 =
                vertex.y - r * Math.sin(eRad);
              let d2 = end - start;
              if (d2 < 0) d2 += 360;
              const large = d2 > 180 ? 1 : 0;
              const midAng =
                ((start + end) / 2 +
                  (end < start ? 180 : 0)) *
                DEG;
              return (
                <g key={i}>
                  <path
                    d={`M ${ax1} ${ay1} A ${r} ${r} 0 ${large} 0 ${ax2} ${ay2}`}
                    fill="none"
                    stroke={angleColor(angles[i]!)}
                    strokeWidth={0.06}
                  />
                  <text
                    x={
                      vertex.x +
                      0.9 * Math.cos(midAng)
                    }
                    y={
                      vertex.y -
                      0.9 * Math.sin(midAng)
                    }
                    fill={THEME.textLight}
                    fontSize={0.45}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {angles[i]}&deg;
                  </text>
                </g>
              );
            })}

            {/* Draggable vertices */}
            {v.map((vertex, i) => (
              <g
                key={i}
                style={{
                  cursor: "grab",
                  touchAction: "none",
                }}
                {...dragBindings[i]!()}
              >
                <circle
                  cx={vertex.x}
                  cy={vertex.y}
                  r={0.8}
                  fill="transparent"
                />
                <circle
                  cx={vertex.x}
                  cy={vertex.y}
                  r={0.25}
                  fill={THEME.handleDefault}
                  stroke={THEME.handleStroke}
                  strokeWidth={0.06}
                />
              </g>
            ))}
          </>
        ) : (
          /* === TEAR-OFF CORNERS ANIMATION === */
          <>
            {/* Faded original triangle outline */}
            <polygon
              points={v
                .map((pt) => `${pt.x},${pt.y}`)
                .join(" ")}
              fill="none"
              stroke={BORDER}
              strokeWidth={0.04}
              strokeDasharray="0.15 0.1"
            />

            {/* Three angle pieces arranged into a straight line */}
            {tearPhase >= 0 && (
              <g>
                <motion.g
                  initial={{
                    opacity: 0,
                    x: v[0]!.x,
                    y: v[0]!.y,
                  }}
                  animate={{
                    opacity: 1,
                    x: -2.5,
                    y: 3,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d={angleArcPath(0, angles[0]!, 0.8)}
                    fill={
                      angleColor(angles[0]!) + "40"
                    }
                    stroke={angleColor(angles[0]!)}
                    strokeWidth={0.06}
                  />
                  <text
                    x={0}
                    y={-0.2}
                    fill={THEME.textLight}
                    fontSize={0.35}
                    textAnchor="middle"
                  >
                    {angles[0]}&deg;
                  </text>
                </motion.g>

                <motion.g
                  initial={{
                    opacity: 0,
                    x: v[1]!.x,
                    y: v[1]!.y,
                  }}
                  animate={{ opacity: 1, x: 0, y: 3 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d={angleArcPath(
                      angles[0]!,
                      angles[0]! + angles[1]!,
                      0.8,
                    )}
                    fill={
                      angleColor(angles[1]!) + "40"
                    }
                    stroke={angleColor(angles[1]!)}
                    strokeWidth={0.06}
                  />
                  <text
                    x={0}
                    y={-0.2}
                    fill={THEME.textLight}
                    fontSize={0.35}
                    textAnchor="middle"
                  >
                    {angles[1]}&deg;
                  </text>
                </motion.g>

                <motion.g
                  initial={{
                    opacity: 0,
                    x: v[2]!.x,
                    y: v[2]!.y,
                  }}
                  animate={{
                    opacity: 1,
                    x: 2.5,
                    y: 3,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d={angleArcPath(
                      angles[0]! + angles[1]!,
                      180,
                      0.8,
                    )}
                    fill={
                      angleColor(angles[2]!) + "40"
                    }
                    stroke={angleColor(angles[2]!)}
                    strokeWidth={0.06}
                  />
                  <text
                    x={0}
                    y={-0.2}
                    fill={THEME.textLight}
                    fontSize={0.35}
                    textAnchor="middle"
                  >
                    {angles[2]}&deg;
                  </text>
                </motion.g>

                {/* Straight line underneath */}
                {tearPhase >= 1 && (
                  <motion.line
                    x1={-4}
                    y1={3}
                    x2={4}
                    y2={3}
                    stroke={colors.accent.indigo}
                    strokeWidth={0.06}
                    strokeDasharray="0.15 0.1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                )}
              </g>
            )}

            {/* Annotation */}
            {tearPhase >= 1 && (
              <motion.text
                x={0}
                y={4.2}
                fill={THEME.vertex}
                fontSize={0.4}
                textAnchor={"middle" as const}
                fontWeight={600}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Three angles → one straight angle =
                180&deg;. Always.
              </motion.text>
            )}
          </>
        )}
      </svg>

      {/* Sum display */}
      <div className="text-center">
        <Katex
          tex={`${angles[0]}^\\circ + ${angles[1]}^\\circ + ${angles[2]}^\\circ = ${sum}^\\circ`}
          className="text-base text-white"
        />
      </div>

      {/* Tear-off prompt */}
      {canStartTearOff && tearPhase < 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            className="text-sm text-indigo-400 underline min-h-[44px]"
            onClick={() => {
              setTearPhase(0);
              setTimeout(() => setTearPhase(1), 1500);
              onAnglesDiscovered();
            }}
          >
            Watch the proof: tear off the corners!
          </button>
        </motion.div>
      )}
    </div>
  );
}

// --- Main Practice stage ---

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | null
  >(null);
  const [numericInput, setNumericInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [triangleReady, setTriangleReady] = useState(false);

  const problems: Problem[] = useMemo(
    () => [
      // ---------- Layer 0: Recall ----------
      {
        id: "p1",
        layer: 0,
        question: "What type of angle is 135 degrees?",
        type: "mc",
        options: [
          { label: "Acute", color: ANGLE_COLORS.acute },
          { label: "Right", color: ANGLE_COLORS.right },
          { label: "Obtuse", color: ANGLE_COLORS.obtuse },
          { label: "Reflex", color: ANGLE_COLORS.reflex },
        ],
        correctAnswer: "Obtuse",
        feedbackCorrect:
          "That's right! 135 degrees is between 90 and 180, making it obtuse.",
        feedbackIncorrect:
          "Not quite. Think about where 135 falls relative to 90 and 180.",
        visualization: (
          <AngleMaker
            angle={135}
            interactive={false}
            showLabel
            width={160}
            height={160}
            viewBox="-8 -8 16 16"
          />
        ),
      },
      {
        id: "p2",
        layer: 0,
        question:
          "What type of angle is shown below? (No degree label this time!)",
        type: "mc",
        options: [
          { label: "Acute", color: ANGLE_COLORS.acute },
          { label: "Right", color: ANGLE_COLORS.right },
          { label: "Obtuse", color: ANGLE_COLORS.obtuse },
          {
            label: "Straight",
            color: ANGLE_COLORS.straight,
          },
          { label: "Reflex", color: ANGLE_COLORS.reflex },
        ],
        correctAnswer: "Acute",
        feedbackCorrect:
          "Yes! This angle is clearly less than 90 degrees.",
        feedbackIncorrect:
          "Look at the angle compared to a right angle (90\u00B0). Is it smaller or larger?",
        visualization: (
          <AngleMaker
            angle={72}
            interactive={false}
            showLabel={false}
            width={160}
            height={160}
            viewBox="-8 -8 16 16"
          />
        ),
      },
      {
        id: "p3",
        layer: 0,
        question:
          "What type of angle do the clock hands make at 10:00?",
        type: "mc",
        options: [
          { label: "Acute", color: ANGLE_COLORS.acute },
          { label: "Right", color: ANGLE_COLORS.right },
          { label: "Obtuse", color: ANGLE_COLORS.obtuse },
          {
            label: "Straight",
            color: ANGLE_COLORS.straight,
          },
          { label: "Reflex", color: ANGLE_COLORS.reflex },
        ],
        correctAnswer: "Acute",
        feedbackCorrect:
          "Right! The hands are 2 hours apart. Each hour is 30\u00B0, so 2 \u00D7 30 = 60\u00B0. That's acute.",
        feedbackIncorrect:
          "Each hour on a clock = 30\u00B0. The hands at 10:00 are 2 hours apart.",
        visualization: (
          <svg
            viewBox="-5 -5 10 10"
            width={140}
            height={140}
          >
            <circle
              cx={0}
              cy={0}
              r={4}
              fill="none"
              stroke={BORDER}
              strokeWidth={0.08}
            />
            {/* Hour hand at 10 o'clock */}
            <line
              x1={0}
              y1={0}
              x2={-1.25}
              y2={-2.17}
              stroke={SURFACE}
              strokeWidth={0.18}
              strokeLinecap="round"
            />
            {/* Minute hand at 12 */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={-3.5}
              stroke={THEME.primary}
              strokeWidth={0.12}
              strokeLinecap="round"
            />
            <circle cx={0} cy={0} r={0.12} fill={WARNING} />
            <path
              d={angleArcPath(90, 150, 1.5)}
              fill="none"
              stroke={SUCCESS}
              strokeWidth={0.06}
            />
          </svg>
        ),
      },
      // ---------- Layer 1: Procedure ----------
      {
        id: "p4",
        layer: 1,
        question:
          "Two angles are complementary. One is 35\u00B0. What is the other?",
        type: "numeric",
        correctAnswer: "55",
        feedbackCorrect:
          "Perfect! 35 + 55 = 90. Complementary angles always sum to 90\u00B0.",
        feedbackIncorrect:
          "Remember, complementary angles add to 90\u00B0. What is 90 - 35?",
      },
      {
        id: "p5",
        layer: 1,
        question:
          "Find the supplementary angle to 110\u00B0.",
        type: "numeric",
        correctAnswer: "70",
        feedbackCorrect:
          "Yes! 110 + 70 = 180. Notice how one is obtuse and the other is acute.",
        feedbackIncorrect:
          "Supplementary angles add to 180\u00B0. So the missing angle = 180 - 110 = ?",
      },
      {
        id: "p6",
        layer: 1,
        question:
          "What is the angle between the clock hands at 4:00? (Each hour = 30\u00B0)",
        type: "numeric",
        correctAnswer: "120",
        feedbackCorrect:
          "Exactly! 4 hours \u00D7 30\u00B0/hour = 120\u00B0. That's an obtuse angle.",
        feedbackIncorrect:
          "Each hour = 360\u00B0 / 12 = 30\u00B0. At 4:00, the hands are 4 hours apart...",
      },
      // ---------- Layer 2: Understanding ----------
      {
        id: "p7",
        layer: 2,
        question:
          "Drag the corners of this triangle and watch the angles. What do they always add up to?",
        type: "interactive",
        correctAnswer: "180",
        feedbackCorrect:
          "The angles of any triangle always sum to exactly 180\u00B0!",
        feedbackIncorrect:
          "Try dragging the vertices around more. Watch the sum at the bottom.",
      },
      {
        id: "p8",
        layer: 2,
        question:
          "Why can a triangle NEVER have two obtuse angles?",
        type: "mc",
        options: [
          { label: "Two obtuse angles would already exceed 180\u00B0, leaving no room for a third angle", color: SUCCESS },
          { label: "Because obtuse angles are too wide to fit inside a triangle", color: INFO },
          { label: "Triangles can have two obtuse angles if they are very large", color: WARNING },
        ],
        correctAnswer: "Two obtuse angles would already exceed 180\u00B0, leaving no room for a third angle",
        feedbackCorrect:
          "Great reasoning! Two angles > 90\u00B0 would sum to more than 180\u00B0, which is impossible.",
        feedbackIncorrect:
          "Think about the triangle angle sum. If both angles were > 90\u00B0, their sum alone would exceed 180\u00B0.",
      },
      {
        id: "p9",
        layer: 2,
        question:
          "Why do the angles in any triangle ALWAYS add to 180\u00B0?",
        type: "mc",
        options: [
          { label: "It\u2019s just a rule you have to memorize", color: WARNING },
          { label: "When you tear off the 3 corners and line them up, they form a straight line (180\u00B0)", color: SUCCESS },
          { label: "Because all triangles have 3 sides", color: INFO },
        ],
        correctAnswer: "When you tear off the 3 corners and line them up, they form a straight line (180\u00B0)",
        feedbackCorrect:
          "Exactly! The tear-off-corners demonstration shows this beautifully.",
        feedbackIncorrect:
          "Remember the tear-off proof: when you rearrange the three angle corners, they form a straight line = 180\u00B0.",
      },
    ],
    [],
  );

  const total = problems.length;
  const problem = problems[currentIdx];
  const progress =
    total > 0
      ? ((currentIdx + (done ? 1 : 0)) / total) * 100
      : 0;

  const checkAnswer = useCallback(() => {
    if (!problem) return;
    let answer = "";
    if (problem.type === "mc") answer = selectedOption ?? "";
    else if (
      problem.type === "numeric" ||
      problem.type === "interactive"
    )
      answer = numericInput.trim();
    else answer = textInput.trim();

    let correct = false;
    if (problem.type === "mc") {
      correct = answer === problem.correctAnswer;
    } else if (
      problem.type === "numeric" ||
      problem.type === "interactive"
    ) {
      correct = answer === problem.correctAnswer;
    } else {
      // Text problems: keyword heuristic
      const lower = answer.toLowerCase();
      correct =
        lower.includes("180") ||
        lower.includes("more than") ||
        lower.includes("exceed") ||
        lower.includes("straight") ||
        lower.includes("sum") ||
        answer.length >= 30;
    }

    setAttempts((a) => a + 1);
    setFeedback({
      correct,
      message: correct
        ? problem.feedbackCorrect
        : problem.feedbackIncorrect,
    });
    if (correct) setCorrectCount((c) => c + 1);
  }, [problem, selectedOption, numericInput, textInput]);

  const nextProblem = useCallback(() => {
    setFeedback(null);
    setSelectedOption(null);
    setNumericInput("");
    setTextInput("");
    setAttempts(0);
    setTriangleReady(false);
    if (currentIdx + 1 >= total) setDone(true);
    else setCurrentIdx((i) => i + 1);
  }, [currentIdx, total]);

  // Done summary
  if (done) {
    const accuracy =
      total > 0
        ? Math.round((correctCount / total) * 100)
        : 0;
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke={SUCCESS}
            strokeWidth={2.5}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-50">
          Practice Complete!
        </h2>
        <p className="mb-1 text-slate-300">
          {correctCount}/{total} correct ({accuracy}%)
        </p>
        <div className="mb-6 mt-4 w-full max-w-xs">
          <ProgressBar
            value={progress}
            variant="level"
            size="sm"
          />
        </div>
        <ContinueButton onClick={onComplete} color={THEME.primary}>
          Continue
        </ContinueButton>
      </motion.section>
    );
  }

  if (!problem) return null;

  return (
    <section className="flex flex-1 flex-col bg-nm-bg-primary px-4">
      {/* Progress bar */}
      <div className="mb-3 mt-2">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>
            Problem {currentIdx + 1} of {total}
          </span>
          <span>{correctCount} correct</span>
        </div>
        <ProgressBar
          value={progress}
          variant="default"
          size="sm"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={problem.id}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          className="flex-1 flex flex-col"
        >
          <div className="rounded-xl border border-nm-bg-secondary bg-nm-bg-primary p-5 flex-1 flex flex-col">
            {/* Layer badge */}
            <span className="text-[10px] uppercase tracking-wider text-slate-600 mb-2">
              {
                ["Recall", "Procedure", "Understanding"][
                  problem.layer
                ]
              }
            </span>

            {/* Question */}
            <p className="text-base text-slate-200 leading-relaxed mb-4">
              {problem.question}
            </p>

            {/* Static visualization */}
            {problem.visualization && (
              <div className="flex justify-center mb-4">
                {problem.visualization}
              </div>
            )}

            {/* Interactive triangle (p7) */}
            {problem.type === "interactive" &&
              problem.id === "p7" && (
                <InteractiveTriangle
                  onAnglesDiscovered={() =>
                    setTriangleReady(true)
                  }
                />
              )}

            {/* MC options */}
            {problem.type === "mc" && problem.options && (
              <div className="space-y-2 mb-4">
                {problem.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() =>
                      !feedback &&
                      setSelectedOption(opt.label)
                    }
                    disabled={!!feedback}
                    className="w-full min-h-[48px] rounded-[10px] border-[1.5px] px-4 py-2 text-left text-sm font-medium text-slate-200 transition-all"
                    style={{
                      borderColor:
                        selectedOption === opt.label
                          ? opt.color
                          : SURFACE,
                      backgroundColor:
                        selectedOption === opt.label
                          ? opt.color + "26"
                          : "transparent",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Numeric input */}
            {(problem.type === "numeric" ||
              (problem.type === "interactive" &&
                triangleReady)) && (
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) =>
                    setNumericInput(e.target.value)
                  }
                  disabled={!!feedback}
                  placeholder="?"
                  className="w-20 h-12 rounded-lg border border-nm-bg-surface bg-nm-bg-secondary text-center text-xl text-white outline-none focus:border-nm-domain-numbers"
                  style={{
                    fontVariantNumeric: "tabular-nums",
                  }}
                />
                <span className="text-lg text-slate-400">
                  &deg;
                </span>
              </div>
            )}

            {/* Free-text input */}
            {problem.type === "text" && (
              <div className="mb-4">
                <textarea
                  value={textInput}
                  onChange={(e) =>
                    setTextInput(e.target.value)
                  }
                  disabled={!!feedback}
                  placeholder="Type your explanation here..."
                  rows={3}
                  className="w-full rounded-lg border border-nm-bg-surface bg-nm-bg-secondary px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-nm-domain-numbers resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-slate-600 mt-1">
                  {textInput.length}/500
                </p>
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg p-3 mb-4"
                  style={{
                    borderLeft: `3px solid ${feedback.correct ? SUCCESS : WARNING}`,
                    background: BG,
                  }}
                >
                  <p className="text-sm text-slate-300">
                    {feedback.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="mt-auto pt-2">
              {!feedback ? (
                <Button
                  size="md"
                  onClick={checkAnswer}
                  disabled={
                    (problem.type === "mc" &&
                      !selectedOption) ||
                    (problem.type === "numeric" &&
                      !numericInput.trim()) ||
                    (problem.type === "text" &&
                      textInput.trim().length < 10) ||
                    (problem.type === "interactive" &&
                      !numericInput.trim())
                  }
                  className="w-full"
                >
                  Check
                </Button>
              ) : (
                <div className="flex gap-2">
                  {!feedback.correct && attempts < 3 && (
                    <Button
                      size="md"
                      variant="secondary"
                      onClick={() => {
                        setFeedback(null);
                        setSelectedOption(null);
                        setNumericInput("");
                        setTextInput("");
                      }}
                      className="flex-1"
                    >
                      Retry
                    </Button>
                  )}
                  <Button
                    size="md"
                    onClick={nextProblem}
                    className="flex-1"
                  >
                    {currentIdx + 1 >= total
                      ? "See Results"
                      : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ===========================================================================
// STAGE 7 -- Reflection: open-ended writing
// ===========================================================================

function ReflectionStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const canSubmit = text.trim().length >= 30;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const lower = text.toLowerCase();
    const mentions180 = lower.includes("180");
    const mentionsStraight = lower.includes("straight");
    const mentionsTear =
      lower.includes("tear") ||
      lower.includes("corner") ||
      lower.includes("rip");
    const mentionsHalf = lower.includes("half");

    if (mentions180 && (mentionsTear || mentionsStraight)) {
      setFeedbackText(
        "Excellent! You've captured the key insight: the three angles of a triangle form a straight angle (180\u00B0) when rearranged. That's deep understanding.",
      );
    } else if (
      mentions180 ||
      mentionsStraight ||
      mentionsHalf
    ) {
      setFeedbackText(
        "Good reasoning! You've connected the 180\u00B0 sum to the concept of a straight angle. Think about the tear-off-corners demonstration -- it shows this visually.",
      );
    } else {
      setFeedbackText(
        "Good start! Think about what happened when you tore off the three corners of the triangle and lined them up. What shape did they form?",
      );
    }
  }, [text]);

  return (
    <section className="flex flex-1 flex-col bg-nm-bg-primary px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center max-w-[500px] mx-auto w-full"
      >
        <h2 className="text-xl font-semibold text-slate-50 text-center mb-2">
          Why do you think the angles in any triangle always
          add up to exactly 180 degrees?
        </h2>
        <p className="text-sm text-slate-600 text-center mb-6">
          There&apos;s no single &quot;right answer&quot; here.
          Explain in your own words.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
          placeholder="Type your thoughts..."
          rows={5}
          className="w-full rounded-[10px] border-[1.5px] border-nm-bg-surface bg-nm-bg-primary px-4 py-3 text-[15px] leading-relaxed text-slate-200 placeholder-nm-bg-elevated outline-none focus:border-nm-domain-numbers resize-none"
          maxLength={500}
        />
        <div className="flex justify-end mt-1">
          <span
            className="text-xs"
            style={{
              color:
                text.length > 450 ? WARNING : BORDER_LIGHT,
            }}
          >
            {text.length}/500
          </span>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {submitted && feedbackText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg p-3"
              style={{
                borderLeft: `3px solid ${INFO}`,
                background: BG,
              }}
            >
              <p className="text-sm text-slate-300 leading-relaxed">
                {feedbackText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!submitted ? (
        <ContinueButton onClick={handleSubmit} disabled={!canSubmit} color={THEME.primary}>
          Share my thinking
        </ContinueButton>
      ) : (
        <ContinueButton onClick={onComplete} color={THEME.primary}>
          Complete Lesson
        </ContinueButton>
      )}
    </section>
  );
}

// ===========================================================================
// ROOT COMPONENT
// ===========================================================================

export function AnglesLesson({ onComplete }: AnglesLessonProps) {
  return (
    <LessonShell title="GE-4.1 Angles" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onComplete={advance} />;
          case "spatial": return <SpatialStage onComplete={advance} />;
          case "discovery": return <DiscoveryStage onComplete={advance} />;
          case "symbol": return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld": return <RealWorldStage onComplete={advance} />;
          case "practice": return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
