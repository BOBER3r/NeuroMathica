"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface AngleRelationshipsLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TOKEN ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.surface;
const BORDER_LIGHT = colors.bg.elevated;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;
const SPRING_POP = springs.pop;
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC THEME
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  angleA: colors.accent.indigo,
  angleAFill: `${colors.accent.indigo}30`,
  angleB: "#f59e0b",
  angleBFill: "#f59e0b30",
  line: colors.text.secondary,
  vertex: "#ffffff",
  textSecondary: "#e2e8f0",
  successFill: `${colors.functional.success}33`,
  errorFill: `${colors.functional.error}20`,
  primary: "#8b5cf6",
  primaryHover: "#7c3aed",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// MATH HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const DEG = Math.PI / 180;

function lineEndpoint(angleDeg: number, radius: number): { x: number; y: number } {
  return {
    x: radius * Math.cos(angleDeg * DEG),
    y: -radius * Math.sin(angleDeg * DEG),
  };
}

function anglePiePath(startDeg: number, endDeg: number, radius: number): string {
  let diff = endDeg - startDeg;
  if (diff < 0) diff += 360;
  const sRad = startDeg * DEG;
  const eRad = endDeg * DEG;
  const x1 = radius * Math.cos(sRad);
  const y1 = -radius * Math.sin(sRad);
  const x2 = radius * Math.cos(eRad);
  const y2 = -radius * Math.sin(eRad);
  const largeArc = diff > 180 ? 1 : 0;
  return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 0 ${x2} ${y2} Z`;
}

function snapToNotable(raw: number): number {
  const notable = [30, 45, 60, 90, 120, 135, 150];
  for (const n of notable) {
    if (Math.abs(raw - n) < 3) return n;
  }
  return Math.round(raw);
}

function clampAngle(deg: number): number {
  return Math.max(5, Math.min(175, deg));
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERSECTING LINES SVG COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function IntersectionDiagram({
  angleDeg,
  showLabels,
  showValues,
  highlightPair,
  arcRadius,
}: {
  angleDeg: number;
  showLabels?: boolean;
  showValues?: boolean;
  highlightPair?: "vertical" | "supplementary" | null;
  arcRadius?: number;
}) {
  const r = arcRadius ?? 40;
  const lineLen = 140;

  const A = angleDeg;
  const B = 180 - angleDeg;

  const line1Start = lineEndpoint(0, lineLen);
  const line1End = lineEndpoint(180, lineLen);
  const line2Start = lineEndpoint(angleDeg, lineLen);
  const line2End = lineEndpoint(angleDeg + 180, lineLen);

  const labelR = r + 16;
  const labelA = lineEndpoint(angleDeg / 2, labelR);
  const labelB = lineEndpoint(angleDeg + (180 - angleDeg) / 2, labelR);
  const labelC = lineEndpoint(180 + angleDeg / 2, labelR);
  const labelD = lineEndpoint(180 + angleDeg + (180 - angleDeg) / 2, labelR);

  const highlightA = highlightPair === "vertical" || highlightPair === "supplementary";
  const highlightB = highlightPair === "supplementary";

  return (
    <g>
      {/* A: from 0 to angleDeg */}
      <path
        d={anglePiePath(0, angleDeg, r)}
        fill={THEME.angleAFill}
        stroke={THEME.angleA}
        strokeWidth={highlightA ? 2.5 : 1.5}
        opacity={highlightPair === "supplementary" ? 1 : highlightPair === "vertical" ? 1 : 0.8}
      />
      {/* B: from angleDeg to 180 */}
      <path
        d={anglePiePath(angleDeg, 180, r)}
        fill={THEME.angleBFill}
        stroke={THEME.angleB}
        strokeWidth={highlightB ? 2.5 : 1.5}
        opacity={highlightPair === "supplementary" ? 1 : 0.8}
      />
      {/* C: from 180 to 180+angleDeg */}
      <path
        d={anglePiePath(180, 180 + angleDeg, r)}
        fill={THEME.angleAFill}
        stroke={THEME.angleA}
        strokeWidth={highlightPair === "vertical" ? 2.5 : 1.5}
        opacity={highlightPair === "vertical" ? 1 : 0.8}
      />
      {/* D: from 180+angleDeg to 360 */}
      <path
        d={anglePiePath(180 + angleDeg, 360, r)}
        fill={THEME.angleBFill}
        stroke={THEME.angleB}
        strokeWidth={1.5}
        opacity={0.8}
      />

      {/* Lines */}
      <line x1={line1Start.x} y1={line1Start.y} x2={line1End.x} y2={line1End.y} stroke={THEME.line} strokeWidth={2.5} />
      <line x1={line2Start.x} y1={line2Start.y} x2={line2End.x} y2={line2End.y} stroke={THEME.line} strokeWidth={2.5} />

      {/* Vertex */}
      <circle cx={0} cy={0} r={4} fill={THEME.vertex} />

      {/* Labels */}
      {showLabels && (
        <>
          <text x={labelA.x} y={labelA.y} textAnchor={"middle" as const} dominantBaseline="central" fill={THEME.angleA} fontSize={12} fontWeight={700}>
            A
          </text>
          <text x={labelB.x} y={labelB.y} textAnchor={"middle" as const} dominantBaseline="central" fill={THEME.angleB} fontSize={12} fontWeight={700}>
            B
          </text>
          <text x={labelC.x} y={labelC.y} textAnchor={"middle" as const} dominantBaseline="central" fill={THEME.angleA} fontSize={12} fontWeight={700}>
            C
          </text>
          <text x={labelD.x} y={labelD.y} textAnchor={"middle" as const} dominantBaseline="central" fill={THEME.angleB} fontSize={12} fontWeight={700}>
            D
          </text>
        </>
      )}

      {/* Values */}
      {showValues && (
        <>
          <text x={labelA.x} y={labelA.y + 14} textAnchor={"middle" as const} fill={THEME.angleA} fontSize={10}>
            {Math.round(A)}{"\u00b0"}
          </text>
          <text x={labelB.x} y={labelB.y + 14} textAnchor={"middle" as const} fill={THEME.angleB} fontSize={10}>
            {Math.round(B)}{"\u00b0"}
          </text>
          <text x={labelC.x} y={labelC.y + 14} textAnchor={"middle" as const} fill={THEME.angleA} fontSize={10}>
            {Math.round(A)}{"\u00b0"}
          </text>
          <text x={labelD.x} y={labelD.y + 14} textAnchor={"middle" as const} fill={THEME.angleB} fontSize={10}>
            {Math.round(B)}{"\u00b0"}
          </text>
        </>
      )}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [animAngle, setAnimAngle] = useState(60);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 500));
    timers.push(setTimeout(() => setPhase(2), 1500));
    timers.push(setTimeout(() => setPhase(3), 2500));
    timers.push(setTimeout(() => setPhase(4), 3500));
    timers.push(setTimeout(() => setPhase(5), 4500));
    timers.push(setTimeout(() => setPhase(6), 5500));
    timers.push(setTimeout(() => setPhase(7), 7000));
    timers.push(setTimeout(() => {
      setPhase(8);
      setAnimAngle(45);
    }, 8000));
    timers.push(setTimeout(() => setPhase(9), 9500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 9)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const SVG_W = 400;
  const SVG_H = 300;
  const CX = SVG_W / 2;
  const CY = SVG_H / 2;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 520 }}
        aria-live="polite"
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="mx-auto w-full"
          style={{ maxWidth: 440 }}
          aria-label="Two lines intersecting creating four angles with special relationships"
        >
          {/* Line 1: horizontal */}
          {phase >= 1 && (
            <motion.line
              x1={CX - 160}
              y1={CY}
              x2={CX + 160}
              y2={CY}
              stroke={THEME.line}
              strokeWidth={2.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Line 2 + angles */}
          {phase >= 2 && (
            <g transform={`translate(${CX}, ${CY})`}>
              <IntersectionDiagram
                angleDeg={animAngle}
                showLabels={phase >= 3}
                showValues={phase >= 4}
                highlightPair={
                  phase >= 5 && phase < 6
                    ? "vertical"
                    : phase >= 6 && phase < 7
                      ? "supplementary"
                      : null
                }
              />
            </g>
          )}
        </svg>

        {/* Text overlays */}
        <AnimatePresence>
          {phase >= 5 && phase < 7 && (
            <motion.p
              key="notice"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              className="text-center font-semibold"
              style={{ color: TEXT, fontSize: 16 }}
            >
              {phase < 6
                ? "Opposite angles are always equal."
                : `${animAngle}\u00b0 + ${180 - animAngle}\u00b0 = 180\u00b0`}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 8 && (
            <motion.p
              key="rule"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-2 text-center font-semibold"
              style={{ color: TEXT, fontSize: 18 }}
            >
              No matter the angle, these rules{" "}
              <span style={{ color: THEME.angleA }}>never</span>{" "}
              break.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {phase >= 9 && (
        <ContinueButton onClick={onComplete} color={THEME.primary} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE (Draggable intersecting lines)
// ═══════════════════════════════════════════════════════════════════════════

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [angleDeg, setAngleDeg] = useState(60);
  const [interactions, setInteractions] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const canContinue = interactions >= 10;

  const SVG_W = 400;
  const SVG_H = 340;
  const CX = SVG_W / 2;
  const CY = SVG_H / 2 - 10;
  const LINE_LEN = 140;

  const handleEnd = lineEndpoint(angleDeg, LINE_LEN);

  const bind = useDrag(
    ({ event, xy: [clientX, clientY] }) => {
      event.preventDefault();
      if (!svgRef.current) return;
      const pt = svgRef.current.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svgRef.current.getScreenCTM();
      if (!ctm) return;
      const svgPt = pt.matrixTransform(ctm.inverse());
      const dx = svgPt.x - CX;
      const dy = svgPt.y - CY;
      let rawAngle = Math.atan2(-dy, dx) / DEG;
      if (rawAngle < 0) rawAngle += 360;
      if (rawAngle > 180) rawAngle = 360 - rawAngle;
      const snapped = snapToNotable(clampAngle(rawAngle));
      setAngleDeg(snapped);
      setInteractions((c) => c + 1);
    },
    { filterTaps: true },
  );

  const presets = [30, 45, 60, 90];

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Angle readout */}
      <div
        className="mb-2 mt-2 flex items-center justify-center gap-4 rounded-xl bg-nm-bg-secondary px-4 py-2"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span style={{ color: THEME.angleA, fontSize: 16, fontWeight: 700 }}>
          A = {Math.round(angleDeg)}{"\u00b0"}
        </span>
        <span style={{ color: THEME.angleB, fontSize: 16, fontWeight: 700 }}>
          B = {Math.round(180 - angleDeg)}{"\u00b0"}
        </span>
        <span style={{ color: THEME.angleA, fontSize: 14, fontWeight: 600 }}>
          C = {Math.round(angleDeg)}{"\u00b0"}
        </span>
        <span style={{ color: THEME.angleB, fontSize: 14, fontWeight: 600 }}>
          D = {Math.round(180 - angleDeg)}{"\u00b0"}
        </span>
      </div>

      {/* SVG */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="mx-auto w-full touch-none"
        style={{ maxWidth: 440 }}
        aria-label={`Two intersecting lines. Angle A is ${Math.round(angleDeg)} degrees. Drag the handle to change the angle.`}
      >
        <g transform={`translate(${CX}, ${CY})`}>
          <IntersectionDiagram
            angleDeg={angleDeg}
            showLabels
            showValues
          />

          {/* Drag handle */}
          <motion.circle
            cx={handleEnd.x}
            cy={handleEnd.y}
            r={14}
            fill={THEME.primary}
            fillOpacity={0.3}
            stroke={THEME.primary}
            strokeWidth={2}
            style={{ cursor: "grab", touchAction: "none" }}
            {...(bind() as Record<string, unknown>)}
            whileHover={{ scale: 1.2 }}
            aria-label="Drag to rotate the line"
          />
          <circle
            cx={handleEnd.x}
            cy={handleEnd.y}
            r={5}
            fill={THEME.primary}
            pointerEvents="none"
          />
        </g>
      </svg>

      {/* Relationships */}
      <div className="mt-2 flex gap-2 justify-center text-xs font-semibold">
        <span
          className="rounded-lg px-3 py-1"
          style={{ backgroundColor: THEME.angleAFill, color: THEME.angleA }}
        >
          A = C (vertical)
        </span>
        <span
          className="rounded-lg px-3 py-1"
          style={{ backgroundColor: THEME.angleBFill, color: THEME.angleB }}
        >
          A + B = 180{"\u00b0"}
        </span>
      </div>

      {/* Preset buttons */}
      <div className="mt-3 flex gap-2 justify-center">
        {presets.map((p) => (
          <motion.button
            key={p}
            onClick={() => {
              setAngleDeg(p);
              setInteractions((c) => c + 1);
            }}
            className="rounded-lg px-3 py-2 text-xs font-semibold"
            style={{
              minHeight: 44,
              minWidth: 48,
              backgroundColor: angleDeg === p ? THEME.primary : SURFACE,
              color: angleDeg === p ? "#fff" : MUTED,
              border: `1px solid ${angleDeg === p ? THEME.primary : BORDER}`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {p}{"\u00b0"}
          </motion.button>
        ))}
      </div>

      {/* Interaction counter */}
      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 10)} total={10} activeColor={THEME.primary} />
      </div>

      {canContinue && (
        <ContinueButton onClick={onComplete} color={THEME.primary} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  {
    text: "Look at angles across from each other (A and C). No matter how you rotate the line, they are always the same value!",
    detail: "These are called VERTICAL angles. They share the vertex and are always equal.",
    button: "They're always equal!",
    highlight: "vertical" as const,
  },
  {
    text: "Now look at angles NEXT to each other (A and B). Add them up. What do you always get?",
    detail: "A + B = 180\u00b0, always! These are SUPPLEMENTARY angles.",
    button: "They add to 180!",
    highlight: "supplementary" as const,
  },
  {
    text: "Here's WHY vertical angles are equal: A + B = 180 and C + B = 180. Since both equal 180, A must equal C!",
    detail: "Both A and C are supplementary to B. So A = 180 \u2212 B = C.",
    button: "I see it!",
    highlight: null,
  },
  {
    text: "Adjacent angles on a straight line are supplementary because a straight line is exactly 180 degrees!",
    detail: "A straight angle = 180\u00b0. Adjacent angles fill that straight angle.",
    button: "Got it!",
    highlight: "supplementary" as const,
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-4 flex items-center gap-1 justify-center">
          <InteractionDots count={promptIdx + 1} total={DISCOVERY_PROMPTS.length} activeColor={THEME.primary} />
        </div>

        {/* Mini diagram */}
        <div className="mb-4">
          <svg viewBox="0 0 300 200" className="mx-auto w-full" style={{ maxWidth: 280 }}>
            <g transform="translate(150, 100)">
              <IntersectionDiagram
                angleDeg={65}
                showLabels
                showValues
                highlightPair={prompt.highlight}
                arcRadius={35}
              />
            </g>
          </svg>
        </div>

        <motion.div
          key={promptIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
        >
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: TEXT }}>
            {prompt.text}
          </p>
          <p
            className="mb-6 rounded-lg bg-nm-bg-primary px-4 py-3 text-sm"
            style={{ color: THEME.textSecondary }}
          >
            {prompt.detail}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleAck}
            className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white"
            style={{ backgroundColor: THEME.primary }}
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
  { notation: "Vertical angles: \u2220A = \u2220C", description: "Opposite angles at an intersection are equal", color: THEME.angleA },
  { notation: "Vertical angles: \u2220B = \u2220D", description: "The other pair of opposite angles are also equal", color: THEME.angleB },
  { notation: "Supplementary: \u2220A + \u2220B = 180\u00b0", description: "Adjacent angles on a line sum to 180\u00b0", color: TEXT },
  { notation: "If \u2220A = 65\u00b0, then \u2220B = 180\u00b0 \u2212 65\u00b0 = 115\u00b0", description: "Finding a missing angle", color: SUCCESS },
  { notation: "\u2220C = 65\u00b0, \u2220D = 115\u00b0", description: "All four angles from just ONE!", color: SUCCESS },
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
          style={{ backgroundColor: THEME.angleAFill, color: THEME.angleA }}
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
                style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: step.color }}>
                    {step.notation}
                  </p>
                  <p className="text-xs" style={{ color: MUTED }}>
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
            <p className="mb-4 text-center text-sm font-medium" style={{ color: THEME.textSecondary }}>
              Vertical angles are equal. Adjacent angles on a line sum to 180{"\u00b0"}.
            </p>
            <ContinueButton onClick={onComplete} color={THEME.primary} />
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
  { icon: "S", title: "Scissors", example: "Open scissors form vertical angles \u2014 the two openings are always equal!" },
  { icon: "C", title: "Clock", example: "When clock hands point at 2:00 and 8:00, they form vertical angles." },
  { icon: "R", title: "Road Intersection", example: "Two roads crossing create 4 angles. If one is 70\u00b0, you know all four!" },
  { icon: "X", title: "Letter X", example: "The letter X is two lines crossing \u2014 the top and bottom V-angles match!" },
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
          style={{ backgroundColor: THEME.angleAFill, color: THEME.angleA }}
        >
          Real World
        </span>

        <p className="mb-4 text-base font-medium" style={{ color: TEXT }}>
          Angle relationships are everywhere!
        </p>

        <div className="space-y-3">
          {REAL_WORLD_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: i * 0.15 }}
              className="rounded-xl px-4 py-3"
              style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: THEME.angleAFill, color: THEME.angleA }}
                >
                  {card.icon}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: TEXT }}>
                    {card.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
                    {card.example}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ContinueButton onClick={onComplete} color={THEME.primary} />
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
    prompt: "What are vertical angles?",
    options: [
      "Angles that point up and down",
      "Angles across from each other at an intersection",
      "Angles that are 90\u00b0",
      "Angles on the same side",
    ],
    correctIndex: 1,
    feedback: "Vertical angles are opposite each other where two lines cross \u2014 they share a vertex.",
  },
  {
    layer: "recall",
    type: "true-false",
    prompt: "Vertical angles add up to 180\u00b0.",
    correctBool: false,
    feedback: "False! Vertical angles are EQUAL. SUPPLEMENTARY (adjacent) angles add to 180\u00b0.",
  },
  {
    layer: "recall",
    type: "multiple-choice",
    prompt: "Two supplementary angles add up to...",
    options: ["90\u00b0", "180\u00b0", "360\u00b0", "270\u00b0"],
    correctIndex: 1,
    feedback: "Supplementary angles always add to 180\u00b0 because they form a straight line.",
  },
  {
    layer: "procedure",
    type: "numeric-input",
    prompt: "Two lines cross. One angle is 70\u00b0. What is the angle next to it?",
    correctValue: 110,
    feedback: "Adjacent angles are supplementary: 180 \u2212 70 = 110\u00b0.",
  },
  {
    layer: "procedure",
    type: "numeric-input",
    prompt: "Two lines cross. One angle is 40\u00b0. What is the vertical angle?",
    correctValue: 40,
    feedback: "Vertical angles are equal! The angle across is also 40\u00b0.",
  },
  {
    layer: "procedure",
    type: "multiple-choice",
    prompt: "Two lines cross. One angle is 55\u00b0. What are all four angles?",
    options: [
      "55\u00b0, 55\u00b0, 55\u00b0, 55\u00b0",
      "55\u00b0, 125\u00b0, 55\u00b0, 125\u00b0",
      "55\u00b0, 135\u00b0, 55\u00b0, 135\u00b0",
      "55\u00b0, 125\u00b0, 125\u00b0, 55\u00b0",
    ],
    correctIndex: 1,
    feedback: "Vertical: 55 = 55. Supplementary: 180 \u2212 55 = 125. The four angles are 55, 125, 55, 125.",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "Why are vertical angles always equal?",
    options: [
      "Because they look the same",
      "Because both are supplementary to the same angle",
      "Because they are on opposite sides",
      "Because all angles in an intersection are equal",
    ],
    correctIndex: 1,
    feedback: "If A + B = 180 and C + B = 180, then A and C must be equal!",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "Can two vertical angles both be 100\u00b0?",
    options: [
      "No, that's impossible",
      "Yes, and the other pair would be 80\u00b0 each",
      "Yes, and the other pair would be 100\u00b0 each",
      "Only if the lines are perpendicular",
    ],
    correctIndex: 1,
    feedback: "If vertical angles are 100\u00b0, adjacent = 180 \u2212 100 = 80\u00b0. Works!",
  },
  {
    layer: "understanding",
    type: "multiple-choice",
    prompt: "If all four angles at an intersection are equal, what is each angle?",
    options: ["45\u00b0", "60\u00b0", "90\u00b0", "180\u00b0"],
    correctIndex: 2,
    feedback: "If all angles are equal and adjacent ones sum to 180: each must be 180/2 = 90\u00b0. The lines are perpendicular!",
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
        <ContinueButton onClick={onComplete} color={THEME.primary}>Complete Practice</ContinueButton>
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
      return;
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
      <div className="mt-4 rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${layerColors[problem.layer] ?? THEME.primary}20`,
              color: layerColors[problem.layer] ?? THEME.primary,
            }}
          >
            {problem.layer}
          </span>
          <span className="text-xs" style={{ color: MUTED }}>
            {probIdx + 1} / {PRACTICE_PROBLEMS.length}
          </span>
        </div>

        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>
          {problem.prompt}
        </p>

        {/* Multiple choice */}
        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2">
            {problem.options.map((opt, i) => {
              const isSelected = selected === i;
              const showCorrect = answered && i === problem.correctIndex;
              const showIncorrect = answered && isSelected && i !== problem.correctIndex;
              let bgColor: string = BG;
              if (showCorrect) bgColor = THEME.successFill;
              else if (showIncorrect) bgColor = THEME.errorFill;
              else if (isSelected) bgColor = `${THEME.primary}30`;
              let borderColor: string = BORDER;
              if (showCorrect) borderColor = SUCCESS;
              else if (showIncorrect) borderColor = ERROR;
              else if (isSelected) borderColor = THEME.primary;
              let textColor: string = THEME.textSecondary;
              if (showCorrect) textColor = SUCCESS;
              else if (showIncorrect) textColor = ERROR;
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
              let bgColor: string = BG;
              if (showCorrect) bgColor = THEME.successFill;
              else if (showIncorrect) bgColor = THEME.errorFill;
              else if (isSel) bgColor = `${THEME.primary}30`;
              let borderColor: string = BORDER;
              if (showCorrect) borderColor = SUCCESS;
              else if (showIncorrect) borderColor = ERROR;
              else if (isSel) borderColor = THEME.primary;
              let textColor: string = THEME.textSecondary;
              if (showCorrect) textColor = SUCCESS;
              else if (showIncorrect) textColor = ERROR;
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
                    ? THEME.successFill
                    : THEME.errorFill
                  : BG,
                border: `2px solid ${
                  answered
                    ? isCorrect
                      ? SUCCESS
                      : ERROR
                    : BORDER
                }`,
                color: TEXT,
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
              backgroundColor: THEME.primary,
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
                backgroundColor: isCorrect ? THEME.successFill : THEME.errorFill,
                border: `1px solid ${isCorrect ? SUCCESS : ERROR}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: isCorrect ? SUCCESS : ERROR }}>
                {isCorrect ? "Correct!" : "Not quite."}
              </p>
              <p className="mt-1 text-sm" style={{ color: THEME.textSecondary }}>
                {problem.feedback}
              </p>
            </div>

            <motion.button
              onClick={handleNext}
              className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white"
              style={{ minHeight: 48, backgroundColor: THEME.primary }}
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
                transition={SPRING_POP}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: THEME.successFill }}
              >
                <span style={{ color: SUCCESS, fontSize: 32 }}>{"✓"}</span>
              </motion.div>
              <p className="mb-2 text-lg font-semibold" style={{ color: TEXT }}>
                Great reflection!
              </p>
              <p className="mb-4 text-sm" style={{ color: MUTED }}>
                Understanding WHY vertical angles are equal (not just that they are)
                is the key to mastering geometry!
              </p>
            </>
          )}

          {skipped && (
            <p className="mb-4 text-center text-sm" style={{ color: MUTED }}>
              Reflection skipped. You can always come back to reflect later!
            </p>
          )}

          <ContinueButton onClick={onComplete} color={THEME.primary}>Complete Lesson</ContinueButton>
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
          style={{ backgroundColor: THEME.angleAFill, color: THEME.angleA }}
        >
          Reflection
        </span>

        <p className="mb-4 text-lg font-medium leading-relaxed" style={{ color: TEXT }}>
          {"Explain to a friend WHY vertical angles are always equal. Hint: use the fact that both vertical angles are supplementary to the SAME angle."}
        </p>

        {/* Mini diagram hint */}
        <div className="mb-4">
          <svg viewBox="0 0 260 160" className="mx-auto w-full" style={{ maxWidth: 200 }}>
            <g transform="translate(130, 80)">
              <IntersectionDiagram
                angleDeg={65}
                showLabels
                showValues={false}
                arcRadius={30}
              />
            </g>
          </svg>
        </div>

        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Vertical angles are equal because..."
          className="w-full resize-none rounded-xl p-4 text-base leading-relaxed"
          style={{
            minHeight: 120,
            maxHeight: 240,
            backgroundColor: BG,
            border: `1px solid ${BORDER_LIGHT}`,
            color: THEME.textSecondary,
          }}
          aria-label="Write your reflection explaining why vertical angles are equal"
        />

        <div className="mt-1 text-right text-xs" style={{ color: meetsMin ? SUCCESS : MUTED }}>
          {text.length} / {minChars} minimum
        </div>

        <button
          onClick={handleSubmit}
          disabled={!meetsMin}
          className="mt-3 w-full rounded-xl py-3 text-base font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none"
          style={{ backgroundColor: THEME.primary, minHeight: 52 }}
        >
          Submit Reflection
        </button>

        <button
          onClick={handleSkip}
          className="mt-2 w-full py-2 text-sm underline-offset-2 hover:underline"
          style={{ color: MUTED, minHeight: 44 }}
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

export function AngleRelationshipsLesson({ onComplete }: AngleRelationshipsLessonProps) {
  return (
    <LessonShell title="GE-4.2 Angle Relationships" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
