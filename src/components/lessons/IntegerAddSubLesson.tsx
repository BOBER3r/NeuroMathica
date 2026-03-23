"use client";

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
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/* ───────────────────────────── constants ───────────────────────────── */

/** Lesson-specific color aliases that don't exist in the shared palette. */
const THEME = {
  positive: colors.accent.emerald,
  positiveBorder: "#10b981",
  negative: colors.accent.rose,
  negativeBorder: "#f43f5e",
  zero: colors.accent.amber,
  walker: colors.accent.violet,
  walkerOutline: "#7c3aed",
  surface: "rgba(15,23,42,0.85)",
  line: colors.text.secondary,
  tick: colors.text.muted,
  label: "#cbd5e1",
} as const;

const STEP_DURATION_MS = 300;
const STEP_PAUSE_MS = 100;

type Direction = "right" | "left";

interface IntegerAddSubLessonProps {
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

/* ════════════════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ════════════════════════════════════════════════════════════════════════ */

/* ───── Walker (CSS triangle arrow) ───── */

interface WalkerSVGProps {
  x: number;
  facing: Direction;
  unitWidth: number;
  lineY: number;
  animate?: boolean;
}

function WalkerSVG({ x, facing, unitWidth, lineY, animate = true }: WalkerSVGProps) {
  const size = unitWidth * 0.6;
  const yTop = lineY - size * 2.2;
  const flip = facing === "left" ? -1 : 1;

  const body = (
    <g
      transform={`translate(${x},${yTop}) scale(${flip},1)`}
      style={{ transition: animate ? "transform 0.2s ease-in-out" : undefined }}
    >
      {/* Triangle head pointing right */}
      <polygon
        points={`${-size * 0.4},${-size * 0.5} ${size * 0.4},0 ${-size * 0.4},${size * 0.5}`}
        fill={THEME.walker}
        stroke={THEME.walkerOutline}
        strokeWidth={size * 0.08}
      />
      {/* Stick body */}
      <line
        x1={0}
        y1={size * 0.5}
        x2={0}
        y2={size * 1.1}
        stroke={THEME.walkerOutline}
        strokeWidth={size * 0.06}
      />
      {/* Legs */}
      <line
        x1={0}
        y1={size * 1.1}
        x2={-size * 0.22}
        y2={size * 1.5}
        stroke={THEME.walkerOutline}
        strokeWidth={size * 0.06}
      />
      <line
        x1={0}
        y1={size * 1.1}
        x2={size * 0.22}
        y2={size * 1.5}
        stroke={THEME.walkerOutline}
        strokeWidth={size * 0.06}
      />
    </g>
  );

  return body;
}

/* ───── SVG Number Line ───── */

interface NumberLineSVGProps {
  rangeMin: number;
  rangeMax: number;
  width: number;
  height: number;
  lineY?: number;
  walkerPos?: number | null;
  walkerFacing?: Direction;
  arcs?: ArcData[];
  trail?: { from: number; to: number; dir: Direction } | null;
  footprints?: number[];
  zeroCrossing?: boolean;
  children?: ReactNode;
}

interface ArcData {
  from: number;
  to: number;
  stepIndex: number;
  dir: Direction;
}

function NumberLineSVGComponent({
  rangeMin,
  rangeMax,
  width,
  height,
  lineY: lineYProp,
  walkerPos = null,
  walkerFacing = "right",
  arcs = [],
  trail = null,
  footprints = [],
  zeroCrossing = false,
  children,
}: NumberLineSVGProps) {
  const padding = 30;
  const lineY = lineYProp ?? height * 0.55;
  const span = rangeMax - rangeMin;
  const unitWidth = (width - padding * 2) / span;

  const toX = (v: number) => padding + (v - rangeMin) * unitWidth;

  // Build tick positions
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
      aria-label={`Number line from ${rangeMin} to ${rangeMax}`}
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
        stroke={THEME.line}
        strokeWidth={2}
      />

      {/* Arrowheads */}
      <polygon
        points={`${toX(rangeMin)},${lineY} ${toX(rangeMin) + 8},${lineY - 4} ${toX(rangeMin) + 8},${lineY + 4}`}
        fill={THEME.line}
      />
      <polygon
        points={`${toX(rangeMax)},${lineY} ${toX(rangeMax) - 8},${lineY - 4} ${toX(rangeMax) - 8},${lineY + 4}`}
        fill={THEME.line}
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
              stroke={isZero ? THEME.zero : THEME.tick}
              strokeWidth={isZero ? 2 : 1}
            />
            <text
              x={x}
              y={lineY + tickH / 2 + 14}
              textAnchor="middle"
              fill={isZero ? THEME.zero : THEME.label}
              fontSize={isZero ? 13 : 11}
              fontWeight={isZero ? 700 : 400}
              fontFamily="system-ui, sans-serif"
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
          stroke={trail.dir === "right" ? THEME.positive : THEME.negative}
          strokeWidth={4}
          opacity={0.5}
          strokeLinecap="round"
        />
      )}

      {/* Step arcs */}
      {arcs.map((arc, i) => {
        const x1 = toX(arc.from);
        const x2 = toX(arc.to);
        const above = arc.dir === "right";
        const cy = above ? lineY - unitWidth * 1.2 : lineY + unitWidth * 1.2;
        const mx = (x1 + x2) / 2;
        const color = arc.dir === "right" ? THEME.positive : THEME.negative;
        return (
          <g key={`arc-${i}`}>
            <path
              d={`M ${x1} ${lineY} Q ${mx} ${cy} ${x2} ${lineY}`}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              opacity={0.8}
            />
            <text
              x={mx}
              y={above ? cy + 4 : cy + 4}
              textAnchor="middle"
              fill={color}
              fontSize={9}
              fontFamily="system-ui, sans-serif"
            >
              {arc.stepIndex}
            </text>
          </g>
        );
      })}

      {/* Footprints */}
      {footprints.map((pos, i) => (
        <circle
          key={`fp-${i}`}
          cx={toX(pos)}
          cy={lineY}
          r={3}
          fill={THEME.walker}
          opacity={0.25}
        />
      ))}

      {/* Zero crossing flash */}
      {zeroCrossing && (
        <motion.circle
          cx={toX(0)}
          cy={lineY}
          r={0}
          fill={THEME.zero}
          opacity={0.4}
          animate={{ r: [0, unitWidth * 1.5, unitWidth * 2], opacity: [0.4, 0.2, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Walker */}
      {walkerPos !== null && (
        <WalkerSVG
          x={toX(walkerPos)}
          facing={walkerFacing}
          unitWidth={unitWidth}
          lineY={lineY}
        />
      )}

      {/* Dashed position indicator from walker to line */}
      {walkerPos !== null && (
        <line
          x1={toX(walkerPos)}
          y1={lineY - unitWidth * 0.6 * 2.2 + unitWidth * 0.6 * 1.5}
          x2={toX(walkerPos)}
          y2={lineY}
          stroke={THEME.walker}
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.5}
        />
      )}

      {children}
    </svg>
  );
}

/* ───── Equation Display ───── */

interface EquationDisplayProps {
  parts: Array<{ text: string; color?: string }>;
  className?: string;
}

function EquationDisplay({ parts, className }: EquationDisplayProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-3 py-2",
        "backdrop-blur-md font-mono text-lg font-semibold",
        className,
      )}
      style={{ background: THEME.surface }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.color ?? colors.text.secondary }}>
          {p.text}
        </span>
      ))}
    </motion.div>
  );
}

/* (local ContinueButton and StageContainer removed — using shared components) */

/* ════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK
   ════════════════════════════════════════════════════════════════════════ */

interface HookStageProps {
  onComplete: () => void;
}

function HookStage({ onComplete }: HookStageProps) {
  const [walkerPos, setWalkerPos] = useState<number | null>(null);
  const [facing, setFacing] = useState<Direction>("right");
  const [arcs, setArcs] = useState<ArcData[]>([]);
  const [footprints, setFootprints] = useState<number[]>([]);
  const [equation, setEquation] = useState<Array<{ text: string; color?: string }>>([]);
  const [textOverlay, setTextOverlay] = useState<string | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [zeroCrossing, setZeroCrossing] = useState(false);
  const isAnimating = useRef(false);

  const animateWalk = useCallback(
    async (from: number, to: number, dir: Direction) => {
      const totalSteps = Math.abs(to - from);
      const stepDir = to > from ? 1 : -1;
      setFacing(dir);
      await delay(200);

      for (let i = 0; i < totalSteps; i++) {
        const next = from + stepDir * (i + 1);
        const prev = from + stepDir * i;
        setWalkerPos(next);
        setFootprints((fp) => [...fp, next]);
        setArcs((a) => [
          ...a,
          { from: prev, to: next, stepIndex: i + 1, dir },
        ]);

        // zero crossing check
        if ((prev < 0 && next >= 0) || (prev > 0 && next <= 0) || (prev >= 0 && next < 0) || (prev <= 0 && next > 0)) {
          setZeroCrossing(true);
          setTimeout(() => setZeroCrossing(false), 600);
        }

        await delay(STEP_DURATION_MS + STEP_PAUSE_MS);
      }
    },
    [],
  );

  useEffect(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const run = async () => {
      // 0: Number line draws, walker appears
      await delay(800);
      setWalkerPos(0);

      // 1: Walk right 3
      await delay(600);
      setTextOverlay("Walk 3 steps right...");
      await animateWalk(0, 3, "right");
      setEquation([
        { text: "0" },
        { text: " + ", color: THEME.positive },
        { text: "3", color: THEME.positive },
        { text: " = " },
        { text: "3", color: THEME.positive },
      ]);
      setTextOverlay("...you're at 3.");

      await delay(1500);

      // 2: Walk left 2
      setArcs([]);
      setFootprints([]);
      setTextOverlay("Now walk 2 steps left...");
      await animateWalk(3, 1, "left");
      setEquation([
        { text: "3" },
        { text: " - ", color: THEME.negative },
        { text: "2", color: THEME.negative },
        { text: " = " },
        { text: "1", color: THEME.positive },
      ]);
      setTextOverlay("...you're at 1. Easy.");

      await delay(1500);

      // 3: Reset to 0
      setArcs([]);
      setFootprints([]);
      setEquation([]);
      setWalkerPos(0);
      setFacing("right");
      setTextOverlay("Back to zero.");
      await delay(1000);

      // 4: The twist
      setTextOverlay("But what if I told you to walk BACKWARDS?");

      await delay(2000);

      // 5: Walk left 3 from 0
      setTextOverlay("Walk 3 steps backward from zero...");
      await animateWalk(0, -3, "left");
      setEquation([
        { text: "0" },
        { text: " + ", color: colors.text.secondary },
        { text: "(-3)", color: THEME.negative },
        { text: " = " },
        { text: "-3", color: THEME.negative },
      ]);
      setTextOverlay("...you're at negative 3.");

      await delay(2000);

      setTextOverlay("Adding and subtracting aren't just math. They're directions.");
      await delay(1500);
      setShowContinue(true);
    };

    void run();
    // Failsafe: guarantee Continue button within 4s
    const failsafe = setTimeout(() => setShowContinue(true), 4000);
    return () => clearTimeout(failsafe);
  }, [animateWalk]);

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Equation */}
        {equation.length > 0 && <EquationDisplay parts={equation} />}

        {/* Number line */}
        <div className="relative w-full" style={{ height: 180 }}>
          <NumberLineSVGComponent
            rangeMin={-5}
            rangeMax={10}
            width={600}
            height={180}
            walkerPos={walkerPos}
            walkerFacing={facing}
            arcs={arcs}
            footprints={footprints}
            zeroCrossing={zeroCrossing}
          />
        </div>

        {/* Text overlay */}
        <AnimatePresence mode="wait">
          {textOverlay && (
            <motion.p
              key={textOverlay}
              className="text-center text-base font-medium"
              style={{ color: colors.text.secondary }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {textOverlay}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Continue */}
        {showContinue && <ContinueButton onClick={onComplete} />}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE
   ════════════════════════════════════════════════════════════════════════ */

/* ── Chip Model sub-component ── */

interface ChipData {
  id: number;
  type: "positive" | "negative";
  x: number;
  y: number;
  alive: boolean;
}

interface ChipModelProps {
  onInteraction: () => void;
}

function ChipModel({ onInteraction }: ChipModelProps) {
  const [chips, setChips] = useState<ChipData[]>([]);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; color: string; dx: number; dy: number }>
  >([]);
  const [floatingZeros, setFloatingZeros] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const nextId = useRef(0);
  const particleId = useRef(0);

  const addChip = useCallback(
    (type: "positive" | "negative") => {
      const alive = chips.filter((c) => c.alive);
      const sameType = alive.filter((c) => c.type === type);
      const col = sameType.length % 5;
      const row = Math.floor(sameType.length / 5);
      const baseX = type === "positive" ? 30 : 180;
      setChips((prev) => [
        ...prev,
        {
          id: nextId.current++,
          type,
          x: baseX + col * 42,
          y: 20 + row * 42,
          alive: true,
        },
      ]);
      onInteraction();
    },
    [chips, onInteraction],
  );

  const cancelPairs = useCallback(() => {
    const alive = chips.filter((c) => c.alive);
    const pos = alive.filter((c) => c.type === "positive");
    const neg = alive.filter((c) => c.type === "negative");
    const pairsCount = Math.min(pos.length, neg.length);
    if (pairsCount === 0) return;

    const removedIds = new Set<number>();

    for (let i = 0; i < pairsCount; i++) {
      const p = pos[i];
      const n = neg[i];
      if (!p || !n) continue;
      removedIds.add(p.id);
      removedIds.add(n.id);

      const mx = (p.x + n.x) / 2 + 16;
      const my = (p.y + n.y) / 2 + 16;

      // Spawn particles
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI * 2 * j) / 6 + Math.random() * 0.5;
        setParticles((prev) => [
          ...prev,
          {
            id: particleId.current++,
            x: mx,
            y: my,
            color: j < 3 ? THEME.positive : THEME.negative,
            dx: Math.cos(angle) * 25,
            dy: Math.sin(angle) * 25,
          },
        ]);
      }

      // Floating zero
      setFloatingZeros((prev) => [...prev, { id: particleId.current++, x: mx, y: my }]);
    }

    // Remove chips after a brief delay for visual effect
    setTimeout(() => {
      setChips((prev) => prev.map((c) => (removedIds.has(c.id) ? { ...c, alive: false } : c)));
    }, 50);

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
      setFloatingZeros([]);
    }, 800);

    onInteraction();
  }, [chips, onInteraction]);

  const clearAll = useCallback(() => {
    setChips([]);
    setParticles([]);
    setFloatingZeros([]);
  }, []);

  const alive = chips.filter((c) => c.alive);
  const posCount = alive.filter((c) => c.type === "positive").length;
  const negCount = alive.filter((c) => c.type === "negative").length;
  const total = posCount - negCount;

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-xl p-4" style={{ background: THEME.surface }}>
      {/* Expression */}
      <div className="text-center font-mono text-sm" style={{ color: colors.text.secondary }}>
        <span style={{ color: THEME.positive }}>+{posCount}</span>
        {" and "}
        <span style={{ color: THEME.negative }}>-{negCount}</span>
        {" = "}
        <span
          style={{
            color: total > 0 ? THEME.positive : total < 0 ? THEME.negative : THEME.zero,
            fontWeight: 700,
          }}
        >
          {total}
        </span>
      </div>

      {/* Workspace */}
      <div
        className="relative overflow-hidden rounded-lg border border-white/10 bg-nm-bg-primary/50"
        style={{ height: 200 }}
      >
        <AnimatePresence>
          {alive.map((chip) => (
            <motion.div
              key={chip.id}
              className="absolute flex items-center justify-center rounded-full text-xs font-bold text-white"
              style={{
                width: 32,
                height: 32,
                left: chip.x,
                top: chip.y,
                background: chip.type === "positive" ? THEME.positive : THEME.negative,
                border: `2px solid ${chip.type === "positive" ? THEME.positiveBorder : THEME.negativeBorder}`,
                boxShadow: `0 2px 6px ${chip.type === "positive" ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.3)"}`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={springs.default}
            >
              {chip.type === "positive" ? "+" : "\u2212"}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              left: p.x,
              top: p.y,
              background: p.color,
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: [0, 1.2, 0], x: p.dx, y: p.dy, opacity: [1, 1, 0] }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}

        {/* Floating zeros */}
        {floatingZeros.map((fz) => (
          <motion.span
            key={fz.id}
            className="absolute font-mono text-sm font-bold"
            style={{ left: fz.x - 5, top: fz.y, color: THEME.zero }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            0
          </motion.span>
        ))}
      </div>

      {/* Chip tray */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => addChip("positive")}
          className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: THEME.positive }}
          disabled={posCount >= 15}
          aria-label="Add positive chip"
        >
          + Positive
        </button>
        <button
          onClick={() => addChip("negative")}
          className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: THEME.negative }}
          disabled={negCount >= 15}
          aria-label="Add negative chip"
        >
          &minus; Negative
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={cancelPairs}
          disabled={Math.min(posCount, negCount) === 0}
          className={cn(
            "flex min-h-[44px] flex-1 items-center justify-center rounded-lg text-sm font-semibold",
            "border border-white/20 text-white",
            "disabled:opacity-40",
          )}
          style={{ background: "rgba(251,191,36,0.15)" }}
          aria-label="Cancel zero pairs"
        >
          Cancel Pairs
        </button>
        <button
          onClick={clearAll}
          className={cn(
            "flex min-h-[44px] flex-1 items-center justify-center rounded-lg text-sm font-semibold",
            "border border-white/20",
          )}
          style={{ color: colors.text.muted }}
          aria-label="Clear all chips"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/* ── Number Line Walking Simulator ── */

interface WalkingSimProps {
  onInteraction: () => void;
  rangeMin?: number;
  rangeMax?: number;
  initialPos?: number;
}

function WalkingSimulator({
  onInteraction,
  rangeMin = -10,
  rangeMax = 10,
  initialPos = 0,
}: WalkingSimProps) {
  const [walkerPos, setWalkerPos] = useState(initialPos);
  const [facing, setFacing] = useState<Direction>("right");
  const [steps, setSteps] = useState(3);
  const [arcs, setArcs] = useState<ArcData[]>([]);
  const [footprints, setFootprints] = useState<number[]>([]);
  const [trail, setTrail] = useState<{ from: number; to: number; dir: Direction } | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [zeroCrossing, setZeroCrossing] = useState(false);
  const [equation, setEquation] = useState<Array<{ text: string; color?: string }>>([]);

  const walk = useCallback(async () => {
    if (isWalking) return;
    setIsWalking(true);
    setArcs([]);
    setFootprints([]);
    setTrail(null);

    const dir = facing;
    const delta = dir === "right" ? steps : -steps;
    const from = walkerPos;
    const to = clamp(from + delta, rangeMin, rangeMax);
    const actualSteps = Math.abs(to - from);
    const stepDir = to > from ? 1 : -1;

    // Build equation
    const op = dir === "right" ? "+" : "\u2212";
    const opColor = dir === "right" ? THEME.positive : THEME.negative;
    setEquation([
      { text: `${from}` },
      { text: ` ${op} `, color: opColor },
      { text: `${steps}`, color: opColor },
      { text: " = " },
      { text: "...", color: colors.text.muted },
    ]);

    for (let i = 0; i < actualSteps; i++) {
      const prev = from + stepDir * i;
      const next = from + stepDir * (i + 1);
      setWalkerPos(next);
      setFootprints((fp) => [...fp, next]);
      setArcs((a) => [...a, { from: prev, to: next, stepIndex: i + 1, dir }]);

      if ((prev < 0 && next >= 0) || (prev > 0 && next <= 0) || (prev >= 0 && next < 0) || (prev <= 0 && next > 0)) {
        setZeroCrossing(true);
        setTimeout(() => setZeroCrossing(false), 600);
      }

      await delay(STEP_DURATION_MS + STEP_PAUSE_MS);
    }

    const resultColor = to > 0 ? THEME.positive : to < 0 ? THEME.negative : THEME.zero;
    setEquation([
      { text: `${from}` },
      { text: ` ${op} `, color: opColor },
      { text: `${steps}`, color: opColor },
      { text: " = " },
      { text: `${to}`, color: resultColor },
    ]);

    setTrail({ from, to, dir });
    setIsWalking(false);
    onInteraction();
  }, [isWalking, facing, steps, walkerPos, rangeMin, rangeMax, onInteraction]);

  const reset = useCallback(() => {
    setWalkerPos(initialPos);
    setFacing("right");
    setArcs([]);
    setFootprints([]);
    setTrail(null);
    setEquation([]);
    setZeroCrossing(false);
  }, [initialPos]);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-3">
      {/* Equation */}
      {equation.length > 0 && <EquationDisplay parts={equation} />}

      {/* Number line */}
      <div className="relative w-full" style={{ height: 180 }}>
        <NumberLineSVGComponent
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          width={600}
          height={180}
          walkerPos={walkerPos}
          walkerFacing={facing}
          arcs={arcs}
          footprints={footprints}
          trail={trail}
          zeroCrossing={zeroCrossing}
        />
      </div>

      {/* Controls */}
      <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-4">
        {/* Direction toggle */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs" style={{ color: colors.text.muted }}>
            Direction
          </span>
          <button
            onClick={() => setFacing((d) => (d === "right" ? "left" : "right"))}
            className="flex min-h-[44px] w-[120px] items-center justify-center rounded-full text-sm font-semibold text-white transition-colors"
            style={{
              background: facing === "right" ? THEME.positive : THEME.negative,
            }}
            aria-label={`Walking direction. Currently facing ${facing}`}
            role="switch"
            aria-checked={facing === "right"}
          >
            {facing === "right" ? "\u2192 RIGHT" : "\u2190 LEFT"}
          </button>
        </div>

        {/* Steps slider */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs" style={{ color: colors.text.muted }}>
            Steps
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={1}
              max={9}
              step={1}
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="h-2 w-32 cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, ${facing === "right" ? THEME.positive : THEME.negative} ${((steps - 1) / 8) * 100}%, #334155 ${((steps - 1) / 8) * 100}%)`,
              }}
              aria-label="Number of steps"
            />
            <span
              className="w-6 text-center text-xl font-bold"
              style={{ color: colors.text.primary }}
            >
              {steps}
            </span>
          </div>
        </div>
      </div>

      {/* Walk / Reset */}
      <div className="flex gap-3">
        <button
          onClick={() => void walk()}
          disabled={isWalking}
          className={cn(
            "flex min-h-[48px] min-w-[140px] items-center justify-center gap-2 rounded-xl text-base font-semibold text-white",
            "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
            "hover:brightness-110 active:scale-[0.98]",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-label={`Walk ${steps} steps ${facing} from ${walkerPos}`}
        >
          {isWalking ? (
            <span className="animate-spin text-sm">{"\u25CE"}</span>
          ) : (
            "\u25B6"
          )}{" "}
          WALK
        </button>
        <button
          onClick={reset}
          className={cn(
            "flex min-h-[48px] min-w-[120px] items-center justify-center gap-2 rounded-xl text-base font-semibold",
            "border border-white/20",
          )}
          style={{ color: colors.text.muted }}
          aria-label="Reset walker to zero and clear all paths"
        >
          {"↺"} RESET
        </button>
      </div>
    </div>
  );
}

/* ── Spatial Stage ── */

interface SpatialStageProps {
  onComplete: () => void;
}

function SpatialStage({ onComplete }: SpatialStageProps) {
  const [activeTab, setActiveTab] = useState<"numberline" | "chips">("numberline");
  const [interactions, setInteractions] = useState({ numberline: 0, chips: 0 });
  const [showContinue, setShowContinue] = useState(false);

  const total = interactions.numberline + interactions.chips;
  const meetsMin = interactions.numberline >= 2 && interactions.chips >= 2 && total >= 10;

  useEffect(() => {
    if (meetsMin && !showContinue) {
      setShowContinue(true);
    }
  }, [meetsMin, showContinue]);

  const handleNLInteraction = useCallback(() => {
    setInteractions((prev) => ({ ...prev, numberline: prev.numberline + 1 }));
  }, []);

  const handleChipInteraction = useCallback(() => {
    setInteractions((prev) => ({ ...prev, chips: prev.chips + 1 }));
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
        Explore: Spatial Experience
      </h2>
      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-nm-bg-primary/60 p-1">
        {(["numberline", "chips"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "min-h-[44px] rounded-md px-4 py-2 text-sm font-semibold transition-all",
              activeTab === tab
                ? "bg-[#7c3aed] text-white"
                : "text-white/60 hover:text-white/80",
            )}
          >
            {tab === "numberline" ? "Number Line" : "Chips"}
          </button>
        ))}
      </div>

      {/* Active model */}
      <AnimatePresence mode="wait">
        {activeTab === "numberline" ? (
          <motion.div
            key="nl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
          >
            <WalkingSimulator
              onInteraction={handleNLInteraction}
              rangeMin={-10}
              rangeMax={10}
            />
          </motion.div>
        ) : (
          <motion.div
            key="chips"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <ChipModel onInteraction={handleChipInteraction} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <InteractionDots count={Math.min(total, 10)} total={10} activeColor={THEME.positive} />
        <p className="text-xs" style={{ color: colors.text.muted }}>
          Interactions: {Math.min(total, 10)} / 10
          {interactions.numberline < 2 && " (try the number line)"}
          {interactions.numberline >= 2 && interactions.chips < 2 && " (try the chips)"}
        </p>
      </div>

      {showContinue && (
        <div className="mt-4">
          <ContinueButton onClick={onComplete} />
        </div>
      )}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY
   ════════════════════════════════════════════════════════════════════════ */

interface DiscoveryPrompt {
  challenge: string;
  startPos: number;
  expectedAnswer: number;
  presetDir?: Direction;
  presetSteps?: number;
  hint?: string;
  revelationLines?: string[];
  isAutoplay?: boolean;
}

const DISCOVERY_PROMPTS: DiscoveryPrompt[] = [
  {
    challenge: 'Start at 3. Walk RIGHT 5 steps. Where do you end up?',
    startPos: 3,
    expectedAnswer: 8,
    presetDir: "right",
    presetSteps: 5,
    revelationLines: ["Walking right = adding. Simple enough."],
  },
  {
    challenge: 'Start at 3. Now add NEGATIVE 5. Adding a negative means you walk LEFT.',
    startPos: 3,
    expectedAnswer: -2,
    presetDir: "left",
    presetSteps: 5,
    hint: "Adding (-5) means turn LEFT and walk 5 steps.",
    revelationLines: ["You crossed zero! Negative territory."],
  },
  {
    challenge: 'Start at 3. Subtract 5. Walk LEFT 5 steps.',
    startPos: 3,
    expectedAnswer: -2,
    presetDir: "left",
    presetSteps: 5,
    revelationLines: [
      "Wait \u2014 3 + (-5) = -2 and 3 - 5 = -2.",
      "Same answer!",
      "Adding a negative IS the same as subtracting!",
      "a + (-b) = a - b",
    ],
  },
  {
    challenge:
      'Now the mind-bender. Start at 3. SUBTRACT negative 5: 3 - (-5). Think about what that means...',
    startPos: 3,
    expectedAnswer: 8,
    hint: "Subtract = turn LEFT. But it\u2019s NEGATIVE = turn around AGAIN. Two reverses = facing RIGHT!",
    revelationLines: [
      "3 + 5 = 8 and 3 - (-5) = 8.",
      "Same answer AGAIN!",
      "Subtracting a negative IS the same as adding!",
      "The two negatives cancel out: - (-b) = + b",
    ],
  },
  {
    challenge: "Rule summary \u2014 watch all four operations:",
    startPos: 0,
    expectedAnswer: 0,
    isAutoplay: true,
    revelationLines: [],
  },
  {
    challenge: 'Quick check! What is -4 - (-7)?',
    startPos: -4,
    expectedAnswer: 3,
    hint: "Remember: subtracting a negative is the same as adding!",
    revelationLines: ["(-4) - (-7) = -4 + 7 = 3. Two negatives make a positive \u2014 always."],
  },
];

interface DiscoveryStageProps {
  onComplete: () => void;
}

function DiscoveryStage({ onComplete }: DiscoveryStageProps) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showRevelation, setShowRevelation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [walkerPos, setWalkerPos] = useState(DISCOVERY_PROMPTS[0]?.startPos ?? 0);
  const [facing, setFacing] = useState<Direction>("right");
  const [arcs, setArcs] = useState<ArcData[]>([]);
  const [footprints, setFootprints] = useState<number[]>([]);
  const [zeroCrossing, setZeroCrossing] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prompt = DISCOVERY_PROMPTS[promptIdx];

  // Reset state when prompt changes
  useEffect(() => {
    if (!prompt) return;
    setAnswer("");
    setShowResult(false);
    setShowRevelation(false);
    setShowHint(false);
    setArcs([]);
    setFootprints([]);
    setWalkerPos(prompt.startPos);
    setFacing(prompt.presetDir ?? "right");
    setZeroCrossing(false);

    // Auto-show hint after 15s
    if (prompt.hint) {
      hintTimer.current = setTimeout(() => setShowHint(true), 15000);
    }
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, [promptIdx, prompt]);

  const animateWalk = useCallback(
    async (from: number, to: number, dir: Direction) => {
      const totalSteps = Math.abs(to - from);
      const stepDir = to > from ? 1 : -1;
      setFacing(dir);
      await delay(200);

      for (let i = 0; i < totalSteps; i++) {
        const prev = from + stepDir * i;
        const next = from + stepDir * (i + 1);
        setWalkerPos(next);
        setFootprints((fp) => [...fp, next]);
        setArcs((a) => [...a, { from: prev, to: next, stepIndex: i + 1, dir }]);

        if (
          (prev < 0 && next >= 0) ||
          (prev > 0 && next <= 0) ||
          (prev >= 0 && next < 0) ||
          (prev <= 0 && next > 0)
        ) {
          setZeroCrossing(true);
          setTimeout(() => setZeroCrossing(false), 600);
        }
        await delay(STEP_DURATION_MS + STEP_PAUSE_MS);
      }
    },
    [],
  );

  const handleWalk = useCallback(async () => {
    if (!prompt || isWalking) return;
    setIsWalking(true);
    const dir = prompt.presetDir ?? facing;
    const numSteps = prompt.presetSteps ?? Math.abs(prompt.expectedAnswer - prompt.startPos);
    const to = prompt.startPos + (dir === "right" ? numSteps : -numSteps);
    await animateWalk(prompt.startPos, to, dir);
    setIsWalking(false);
    setShowResult(true);
  }, [prompt, isWalking, facing, animateWalk]);

  const handleSubmit = useCallback(() => {
    if (!prompt) return;
    const parsed = parseInt(answer, 10);
    if (parsed === prompt.expectedAnswer) {
      setShowRevelation(true);
    }
  }, [answer, prompt]);

  const handleNextPrompt = useCallback(() => {
    if (promptIdx >= DISCOVERY_PROMPTS.length - 1) {
      onComplete();
    } else {
      setPromptIdx((i) => i + 1);
    }
  }, [promptIdx, onComplete]);

  if (!prompt) return null;

  // Special: autoplay rule summary (prompt 5)
  if (prompt.isAutoplay) {
    return (
      <section className="flex flex-1 flex-col items-center px-4 py-6">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
          Guided Discovery
        </h2>
        <RuleSummaryAutoplay onComplete={handleNextPrompt} />
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
        Guided Discovery
      </h2>
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Progress */}
        <div className="flex gap-1">
          {DISCOVERY_PROMPTS.map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-8 rounded-full"
              style={{
                background: i < promptIdx ? THEME.positive : i === promptIdx ? THEME.walker : "#334155",
              }}
            />
          ))}
        </div>

        {/* Challenge text */}
        <motion.p
          className="max-w-md text-center text-base font-medium"
          style={{ color: colors.text.primary }}
          key={promptIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {prompt.challenge}
        </motion.p>

        {/* Hint */}
        {showHint && prompt.hint && (
          <motion.div
            className="rounded-lg px-4 py-2 text-center text-sm"
            style={{ background: "rgba(167,139,250,0.15)", color: THEME.walker }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {prompt.hint}
          </motion.div>
        )}

        {/* Number line */}
        <div className="relative w-full" style={{ height: 180 }}>
          <NumberLineSVGComponent
            rangeMin={-10}
            rangeMax={10}
            width={600}
            height={180}
            walkerPos={walkerPos}
            walkerFacing={facing}
            arcs={arcs}
            footprints={footprints}
            zeroCrossing={zeroCrossing}
          />
        </div>

        {/* Walk button */}
        {!showResult && (
          <div className="flex items-center gap-3">
            {/* If no preset dir, let user choose */}
            {!prompt.presetDir && (
              <button
                onClick={() => setFacing((d) => (d === "right" ? "left" : "right"))}
                className="flex min-h-[44px] w-[100px] items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: facing === "right" ? THEME.positive : THEME.negative }}
                aria-label={`Direction: ${facing}`}
              >
                {facing === "right" ? "\u2192 RIGHT" : "\u2190 LEFT"}
              </button>
            )}
            <button
              onClick={() => void handleWalk()}
              disabled={isWalking}
              className={cn(
                "flex min-h-[48px] min-w-[140px] items-center justify-center gap-2 rounded-xl text-base font-semibold text-white",
                "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
                "disabled:opacity-50",
              )}
            >
              {isWalking ? "Walking..." : "\u25B6 WALK"}
            </button>
            {!showHint && prompt.hint && (
              <button
                onClick={() => setShowHint(true)}
                className="min-h-[44px] rounded-lg border border-white/20 px-3 text-sm"
                style={{ color: colors.text.muted }}
              >
                Hint
              </button>
            )}
          </div>
        )}

        {/* Answer input after walk */}
        {showResult && !showRevelation && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span style={{ color: colors.text.secondary }}>Answer:</span>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="h-12 w-20 rounded-lg border border-white/20 bg-white/5 text-center text-xl font-bold text-white focus:border-[#7c3aed] focus:outline-none"
              aria-label="Your answer"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={answer === ""}
              className="min-h-[44px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] px-5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Check
            </button>
          </motion.div>
        )}

        {/* Revelation */}
        {showRevelation && prompt.revelationLines && prompt.revelationLines.length > 0 && (
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.3 }}
          >
            {prompt.revelationLines.map((line, i) => {
              const isLast = i === (prompt.revelationLines?.length ?? 0) - 1;
              return (
                <motion.p
                  key={i}
                  className="text-center text-sm font-medium"
                  style={{
                    color: isLast ? THEME.zero : colors.text.secondary,
                    fontWeight: isLast ? 700 : 500,
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.4 }}
                >
                  {line}
                </motion.p>
              );
            })}
          </motion.div>
        )}

        {/* Next */}
        {showRevelation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (prompt.revelationLines?.length ?? 0) * 0.4 + 0.3 }}
          >
            <ContinueButton
              onClick={handleNextPrompt}
              label={promptIdx >= DISCOVERY_PROMPTS.length - 1 ? "Continue" : "Next"}
            />
          </motion.div>
        )}

        {/* For autoplay summary: skip answer step */}
        {prompt.isAutoplay && (
          <ContinueButton onClick={handleNextPrompt} />
        )}
      </div>
    </section>
  );
}

/* ── Rule Summary Autoplay (Prompt 5 of Discovery) ── */

interface RuleSummaryAutoplayProps {
  onComplete: () => void;
}

interface MiniWalkData {
  label: string;
  subtitle: string;
  from: number;
  to: number;
  dir: Direction;
  borderColor: string;
}

const MINI_WALKS: MiniWalkData[] = [
  {
    label: "a + b",
    subtitle: "Walk RIGHT \u2192",
    from: 2,
    to: 6,
    dir: "right",
    borderColor: THEME.positive,
  },
  {
    label: "a + (-b)",
    subtitle: "Walk LEFT \u2190",
    from: 3,
    to: -2,
    dir: "left",
    borderColor: THEME.negative,
  },
  {
    label: "a - b",
    subtitle: "Walk LEFT \u2190",
    from: 5,
    to: 2,
    dir: "left",
    borderColor: THEME.negative,
  },
  {
    label: "a - (-b)",
    subtitle: "Walk RIGHT \u2192",
    from: -1,
    to: 5,
    dir: "right",
    borderColor: THEME.positive,
  },
];

function RuleSummaryAutoplay({ onComplete }: RuleSummaryAutoplayProps) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Reveal each cell one at a time
    for (let i = 0; i < 4; i++) {
      timers.push(setTimeout(() => setActiveIdx(i), 800 + i * 1500));
    }
    timers.push(setTimeout(() => setShowContinue(true), 800 + 4 * 1500 + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-3">
        {MINI_WALKS.map((mw, i) => {
          const isActive = i <= activeIdx;
          return (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1 rounded-xl p-3"
              style={{
                background: THEME.surface,
                border: `2px solid ${isActive ? mw.borderColor : "transparent"}`,
                opacity: isActive ? 1 : 0.3,
              }}
              animate={{ opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-mono text-sm font-bold" style={{ color: colors.text.primary }}>
                {mw.label}
              </span>
              <span className="text-xs" style={{ color: mw.borderColor }}>
                {mw.subtitle}
              </span>
              {/* Mini number line */}
              <div style={{ height: 60, width: "100%" }}>
                <NumberLineSVGComponent
                  rangeMin={-5}
                  rangeMax={8}
                  width={200}
                  height={60}
                  lineY={35}
                  walkerPos={isActive ? mw.to : mw.from}
                  walkerFacing={mw.dir}
                  arcs={
                    isActive
                      ? Array.from({ length: Math.abs(mw.to - mw.from) }).map((_, si) => ({
                          from: mw.from + (mw.to > mw.from ? si : -si),
                          to: mw.from + (mw.to > mw.from ? si + 1 : -(si + 1)),
                          stepIndex: si + 1,
                          dir: mw.dir,
                        }))
                      : []
                  }
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Diagonal connection hint */}
      {activeIdx >= 3 && (
        <motion.p
          className="text-center text-sm font-medium"
          style={{ color: THEME.zero }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Diagonal pairs give the same direction! a+b = a-(-b) and a+(-b) = a-b
        </motion.p>
      )}

      {showContinue && <ContinueButton onClick={onComplete} />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE
   ════════════════════════════════════════════════════════════════════════ */

interface SymbolRule {
  expression: string;
  equivalence?: string;
  subtitle: string;
  walkFrom: number;
  walkTo: number;
  dir: Direction;
}

const SYMBOL_RULES: SymbolRule[] = [
  {
    expression: "a + b",
    subtitle: "Start at a, walk RIGHT b steps",
    walkFrom: 2,
    walkTo: 6,
    dir: "right",
  },
  {
    expression: "a - b",
    subtitle: "Start at a, walk LEFT b steps",
    walkFrom: 5,
    walkTo: 2,
    dir: "left",
  },
  {
    expression: "a + (-b)",
    equivalence: "= a - b",
    subtitle: "Adding a negative = walking LEFT = subtracting",
    walkFrom: 3,
    walkTo: -2,
    dir: "left",
  },
  {
    expression: "a - (-b)",
    equivalence: "= a + b",
    subtitle: "Subtracting a negative = two turns = walking RIGHT = adding",
    walkFrom: -1,
    walkTo: 5,
    dir: "right",
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

  if (!rule && !showCard) return null;

  if (showCard) {
    return (
      <section className="flex flex-1 flex-col items-center px-4 py-6">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
          Symbol Bridge
        </h2>
        <motion.div
          className="flex w-full max-w-md flex-col gap-3 rounded-xl p-5"
          style={{ background: THEME.surface, border: "1px solid rgba(255,255,255,0.1)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-center text-sm font-bold uppercase tracking-wide" style={{ color: colors.text.primary }}>
            Integer Addition & Subtraction
          </h3>
          <div className="flex flex-col gap-2 text-sm" style={{ color: colors.text.secondary }}>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold" style={{ color: THEME.positive }}>+ positive</span>
              <span>{"\u2192"} walk RIGHT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold" style={{ color: THEME.negative }}>{"\u2212"} positive</span>
              <span>{"\u2192"} walk LEFT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold" style={{ color: THEME.negative }}>+ negative</span>
              <span>{"\u2192"} walk LEFT (= sub)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold" style={{ color: THEME.positive }}>{"\u2212"} negative</span>
              <span>{"\u2192"} walk RIGHT (= add)</span>
            </div>
            <div className="mt-2 border-t border-white/10 pt-2 text-center font-mono text-xs" style={{ color: THEME.zero }}>
              Remember: two negatives {"\u2192"} positive &nbsp; {"\u2212"}({"\u2212"}b) = +b
            </div>
          </div>
        </motion.div>
        <div className="mt-4">
          <ContinueButton onClick={onComplete} />
        </div>
      </section>
    );
  }

  if (!rule) return null;

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
        Symbol Bridge
      </h2>
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        {/* Progress dots */}
        <div className="flex gap-2">
          {SYMBOL_RULES.map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ background: i <= ruleIdx ? THEME.walker : "#334155" }}
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
            transition={{ duration: 0.3 }}
          >
            {/* Left: Rule expression */}
            <div className="flex flex-col items-center gap-2 md:w-2/5">
              <span className="font-mono text-2xl font-bold" style={{ color: colors.text.primary }}>
                {rule.expression}
              </span>
              {rule.equivalence && (
                <motion.span
                  className="font-mono text-lg font-semibold"
                  style={{ color: THEME.zero }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {rule.equivalence}
                </motion.span>
              )}
              <p className="text-center text-sm" style={{ color: colors.text.muted }}>
                {rule.subtitle}
              </p>
            </div>

            {/* Right: Mini animation */}
            <div className="md:w-3/5" style={{ height: 140 }}>
              <NumberLineSVGComponent
                rangeMin={-5}
                rangeMax={10}
                width={400}
                height={140}
                lineY={80}
                walkerPos={rule.walkTo}
                walkerFacing={rule.dir}
                arcs={Array.from({ length: Math.abs(rule.walkTo - rule.walkFrom) }).map(
                  (_, i) => ({
                    from:
                      rule.walkFrom +
                      (rule.walkTo > rule.walkFrom ? i : -i),
                    to:
                      rule.walkFrom +
                      (rule.walkTo > rule.walkFrom ? i + 1 : -(i + 1)),
                    stepIndex: i + 1,
                    dir: rule.dir,
                  }),
                )}
                trail={{
                  from: rule.walkFrom,
                  to: rule.walkTo,
                  dir: rule.dir,
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <ContinueButton
          onClick={handleNext}
          label={isLast ? "See Rule Card" : "Next Rule"}
        />
      </div>
    </section>
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
  animFrom: number;
  animTo: number;
  dir: Direction;
}

const SCENARIOS: RealWorldScenario[] = [
  {
    icon: "\uD83C\uDF21\uFE0F",
    title: "Temperature",
    description: "It's 5\u00B0C at noon in Moscow. By midnight, the temperature DROPS 12 degrees.",
    equation: "5 - 12 = -7",
    connection: "Temperature dropping = subtracting = walking LEFT on the number line.",
    animFrom: 5,
    animTo: -7,
    dir: "left",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Debt & Money",
    description: "You owe your friend $8 (that's -8). Your friend CANCELS your debt (subtracts the negative).",
    equation: "-8 - (-8) = -8 + 8 = 0",
    connection: "Cancelling a debt (removing a negative) = adding money. Subtracting a negative IS adding!",
    animFrom: -8,
    animTo: 0,
    dir: "right",
  },
  {
    icon: "\uD83C\uDFD4\uFE0F",
    title: "Elevation",
    description: "A submarine is at -200m (200m below sea level). It rises 350 meters.",
    equation: "-4 + 7 = 3 (scaled)",
    connection: "Rising = adding positive = walking UP (or RIGHT on a horizontal number line).",
    animFrom: -4,
    animTo: 3,
    dir: "right",
  },
];

interface RealWorldStageProps {
  onComplete: () => void;
}

function RealWorldStage({ onComplete }: RealWorldStageProps) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenario = SCENARIOS[scenarioIdx];
  const isLast = scenarioIdx >= SCENARIOS.length - 1;

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
        Real-World Anchor
      </h2>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        {/* Navigation dots */}
        <div className="flex gap-2">
          {SCENARIOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setScenarioIdx(i)}
              className="h-3 w-3 rounded-full transition-colors"
              style={{
                background: i === scenarioIdx ? THEME.walker : "#334155",
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
              transition={{ duration: 0.3 }}
            >
              {/* Card */}
              <div
                className="w-full rounded-xl p-5"
                style={{ background: THEME.surface, border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="mb-2 text-2xl">{scenario.icon}</div>
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: colors.text.muted }}>
                  {scenario.title}
                </h3>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  {scenario.description}
                </p>
              </div>

              {/* Number line visualization */}
              <div className="relative w-full" style={{ height: 140 }}>
                <NumberLineSVGComponent
                  rangeMin={Math.min(scenario.animFrom, scenario.animTo) - 3}
                  rangeMax={Math.max(scenario.animFrom, scenario.animTo) + 3}
                  width={500}
                  height={140}
                  lineY={80}
                  walkerPos={scenario.animTo}
                  walkerFacing={scenario.dir}
                  trail={{ from: scenario.animFrom, to: scenario.animTo, dir: scenario.dir }}
                  arcs={Array.from({
                    length: Math.abs(scenario.animTo - scenario.animFrom),
                  }).map((_, i) => ({
                    from:
                      scenario.animFrom + (scenario.animTo > scenario.animFrom ? i : -i),
                    to:
                      scenario.animFrom +
                      (scenario.animTo > scenario.animFrom ? i + 1 : -(i + 1)),
                    stepIndex: i + 1,
                    dir: scenario.dir,
                  }))}
                />
              </div>

              {/* Equation */}
              <p className="font-mono text-base font-bold" style={{ color: colors.text.primary }}>
                {scenario.equation}
              </p>

              {/* Connection */}
              <p className="text-center text-sm italic" style={{ color: colors.text.muted }}>
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
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE
   ════════════════════════════════════════════════════════════════════════ */

interface PracticeProblem {
  id: string;
  prompt: string;
  type: "numeric" | "sign-pattern" | "chain";
  /** For numeric: a single expected answer. For sign-pattern: array of sign answers. */
  expectedAnswer: number | string[];
  /** IRT difficulty */
  difficulty: number;
  layer: number;
  subQuestions?: Array<{ text: string; answer: string }>;
  startPos?: number;
  steps?: number;
  dir?: Direction;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: "R1",
    prompt: "Use the number line to solve: 7 + 4",
    type: "numeric",
    expectedAnswer: 11,
    difficulty: -1.5,
    layer: 0,
    startPos: 7,
    steps: 4,
    dir: "right",
  },
  {
    id: "R2",
    prompt: "Solve: 3 - 8",
    type: "numeric",
    expectedAnswer: -5,
    difficulty: -0.8,
    layer: 0,
    startPos: 3,
    steps: 8,
    dir: "left",
  },
  {
    id: "P1",
    prompt: "Evaluate: (-3) + 7",
    type: "numeric",
    expectedAnswer: 4,
    difficulty: 0.0,
    layer: 1,
    startPos: -3,
    steps: 7,
    dir: "right",
  },
  {
    id: "R3",
    prompt: "What is the sign of 12 + (-5)?",
    type: "sign-pattern",
    expectedAnswer: ["positive"],
    difficulty: -0.3,
    layer: 0,
  },
  {
    id: "P2",
    prompt: "Solve: 5 - (-3)",
    type: "numeric",
    expectedAnswer: 8,
    difficulty: 0.5,
    layer: 1,
    startPos: 5,
    steps: 3,
    dir: "right",
  },
  {
    id: "P3",
    prompt: "Solve: -6 + (-4)",
    type: "numeric",
    expectedAnswer: -10,
    difficulty: 0.3,
    layer: 1,
    startPos: -6,
    steps: 4,
    dir: "left",
  },
  {
    id: "P4",
    prompt: "Solve: -2 - (-9)",
    type: "numeric",
    expectedAnswer: 7,
    difficulty: 0.8,
    layer: 1,
    startPos: -2,
    steps: 9,
    dir: "right",
  },
  {
    id: "U1",
    prompt:
      'Explain in your own words: Why does 3 + (-5) give the same result as 3 - 5?',
    type: "numeric",
    expectedAnswer: -2,
    difficulty: 1.5,
    layer: 2,
    startPos: 3,
    steps: 5,
    dir: "left",
  },
  {
    id: "U2",
    prompt: "Solve: -7 - (-7)",
    type: "numeric",
    expectedAnswer: 0,
    difficulty: 1.0,
    layer: 2,
    startPos: -7,
    steps: 7,
    dir: "right",
  },
];

interface PracticeStageProps {
  onComplete: () => void;
}

function PracticeStage({ onComplete }: PracticeStageProps) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [signAnswer, setSignAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showRuleCard, setShowRuleCard] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const problem = PRACTICE_PROBLEMS[problemIdx];
  const total = PRACTICE_PROBLEMS.length;

  const checkAnswer = useCallback(() => {
    if (!problem) return;
    if (problem.type === "sign-pattern") {
      const expectedArr = problem.expectedAnswer as string[];
      const expected = expectedArr.length > 0 ? expectedArr[0] : undefined;
      if (expected != null && signAnswer === expected) {
        setFeedback("correct");
        setXpEarned((x) => x + 5);
      } else {
        setFeedback("incorrect");
      }
    } else {
      const parsed = parseInt(answer, 10);
      if (parsed === problem.expectedAnswer) {
        setFeedback("correct");
        setXpEarned((x) => x + (problem.layer === 0 ? 5 : problem.layer === 1 ? 8 : 16));
      } else {
        setFeedback("incorrect");
      }
    }
  }, [problem, answer, signAnswer]);

  const nextProblem = useCallback(() => {
    if (problemIdx >= total - 1) {
      onComplete();
      return;
    }
    setProblemIdx((i) => i + 1);
    setAnswer("");
    setSignAnswer(null);
    setFeedback(null);
  }, [problemIdx, total, onComplete]);

  if (!problem) return null;

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
        Practice
      </h2>
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
                    ? THEME.positive
                    : i === problemIdx
                      ? THEME.walker
                      : "#334155",
              }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: colors.text.muted }}>
          Problem {problemIdx + 1} of {total} &middot; +{xpEarned} XP
        </p>

        {/* Problem card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={problem.id}
            className="w-full rounded-xl p-5"
            style={{ background: THEME.surface }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="mb-4 text-center text-base font-medium" style={{ color: colors.text.primary }}>
              {problem.prompt}
            </p>

            {/* Number line for context */}
            {problem.startPos !== undefined && problem.dir && (
              <div className="mb-4" style={{ height: 130 }}>
                <NumberLineSVGComponent
                  rangeMin={Math.min((problem.startPos ?? 0) - 3, (problem.expectedAnswer as number) - 3, -5)}
                  rangeMax={Math.max((problem.startPos ?? 0) + 3, (problem.expectedAnswer as number) + 3, 5)}
                  width={500}
                  height={130}
                  lineY={75}
                  walkerPos={
                    feedback === "correct"
                      ? (problem.expectedAnswer as number)
                      : (problem.startPos ?? 0)
                  }
                  walkerFacing={problem.dir ?? "right"}
                  arcs={
                    feedback === "correct"
                      ? Array.from({ length: problem.steps ?? 0 }).map((_, i) => ({
                          from:
                            (problem.startPos ?? 0) +
                            (problem.dir === "right" ? i : -i),
                          to:
                            (problem.startPos ?? 0) +
                            (problem.dir === "right" ? i + 1 : -(i + 1)),
                          stepIndex: i + 1,
                          dir: problem.dir ?? "right",
                        }))
                      : []
                  }
                  trail={
                    feedback === "correct"
                      ? {
                          from: problem.startPos ?? 0,
                          to: problem.expectedAnswer as number,
                          dir: problem.dir ?? "right",
                        }
                      : null
                  }
                />
              </div>
            )}

            {/* Input */}
            {!feedback && (
              <div className="flex items-center justify-center gap-3">
                {problem.type === "sign-pattern" ? (
                  <div className="flex gap-2">
                    {(["positive", "zero", "negative"] as const).map((sign) => (
                      <button
                        key={sign}
                        onClick={() => setSignAnswer(sign)}
                        className={cn(
                          "min-h-[44px] min-w-[52px] rounded-lg text-sm font-semibold text-white transition-all",
                          signAnswer === sign ? "ring-2 ring-white" : "opacity-70",
                        )}
                        style={{
                          background:
                            sign === "positive"
                              ? THEME.positive
                              : sign === "negative"
                                ? THEME.negative
                                : THEME.zero,
                        }}
                      >
                        {sign === "positive" ? "+" : sign === "negative" ? "\u2212" : "0"}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="h-12 w-24 rounded-lg border border-white/20 bg-white/5 text-center text-xl font-bold text-white focus:border-[#7c3aed] focus:outline-none"
                    aria-label="Your answer"
                    autoFocus
                  />
                )}
                <button
                  onClick={checkAnswer}
                  disabled={problem.type === "sign-pattern" ? !signAnswer : answer === ""}
                  className="min-h-[44px] rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] px-5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Check
                </button>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <motion.div
                className="mt-4 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {feedback === "correct" ? (
                  <span className="text-lg font-bold" style={{ color: THEME.positive }}>
                    Correct!
                  </span>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold" style={{ color: THEME.negative }}>
                      Not quite.
                    </span>
                    <span className="text-sm" style={{ color: colors.text.muted }}>
                      The answer is{" "}
                      <span className="font-bold" style={{ color: colors.text.primary }}>
                        {Array.isArray(problem.expectedAnswer)
                          ? problem.expectedAnswer[0]
                          : problem.expectedAnswer}
                      </span>
                    </span>
                  </div>
                )}
                <ContinueButton
                  onClick={nextProblem}
                  label={problemIdx >= total - 1 ? "Finish Practice" : "Next Problem"}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rule card toggle */}
        <button
          onClick={() => setShowRuleCard((v) => !v)}
          className="min-h-[44px] rounded-lg border border-white/20 px-3 text-sm"
          style={{ color: colors.text.muted }}
        >
          {showRuleCard ? "Hide Rules" : "? Show Rules"}
        </button>

        {/* Rule card overlay */}
        <AnimatePresence>
          {showRuleCard && (
            <motion.div
              className="w-full max-w-sm rounded-xl p-4"
              style={{
                background: THEME.surface,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex flex-col gap-1 text-sm" style={{ color: colors.text.secondary }}>
                <span>
                  <span style={{ color: THEME.positive }}>+ positive</span> = walk RIGHT
                </span>
                <span>
                  <span style={{ color: THEME.negative }}>{"\u2212"} positive</span> = walk LEFT
                </span>
                <span>
                  <span style={{ color: THEME.negative }}>+ negative</span> = walk LEFT
                </span>
                <span>
                  <span style={{ color: THEME.positive }}>{"\u2212"} negative</span> = walk RIGHT
                </span>
                <span className="mt-1 text-xs" style={{ color: THEME.zero }}>
                  {"\u2212"}({"\u2212"}b) = +b
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
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
  const [feedbackText, setFeedbackText] = useState<string | null>(null);

  const minChars = 30;
  const maxChars = 1000;
  const canSubmit = text.length >= minChars;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    // Simulated AI feedback based on text quality signals
    const lower = text.toLowerCase();
    const mentionsWalking = lower.includes("walk") || lower.includes("step") || lower.includes("direction");
    const mentionsChips = lower.includes("chip") || lower.includes("cancel") || lower.includes("pair");
    const mentionsDouble = lower.includes("double") || lower.includes("two") || lower.includes("reverse") || lower.includes("turn");
    const mentionsExample = /\d/.test(text);

    let fb = "";
    if (mentionsWalking && mentionsDouble && mentionsExample) {
      fb =
        "Excellent explanation! You connected the double-reversal concept to the walking metaphor with a concrete example. That's the kind of understanding that sticks.";
    } else if (mentionsWalking || mentionsChips) {
      fb =
        "Good explanation! You referenced the spatial model well. To strengthen it further, try explaining the double turn-around: subtract means turn LEFT, negative means turn around AGAIN, so you end up facing RIGHT.";
    } else {
      fb =
        "You've got the basic idea. To make your explanation stronger, try using the walking metaphor: imagine standing on a number line, turning around once for subtract, and again for negative. Two turns put you back in the original direction!";
    }
    setFeedbackText(fb);
  }, [text]);

  return (
    <section className="flex flex-1 flex-col items-center px-4 py-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-nm-text-muted">
        Reflection
      </h2>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <p className="text-center text-base font-medium" style={{ color: colors.text.primary }}>
          Why does subtracting a negative number give the same result as adding a positive?
        </p>
        <p className="text-center text-sm" style={{ color: colors.text.muted }}>
          Explain it as if teaching a friend who has never seen this before.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxChars))}
          disabled={submitted}
          placeholder="Think about what happens on the number line when you subtract a negative..."
          className={cn(
            "w-full resize-none rounded-xl border border-white/20 bg-white/5 p-4 text-sm text-white",
            "placeholder:text-white/30",
            "focus:border-[#7c3aed] focus:outline-none",
            "disabled:opacity-60",
          )}
          style={{ minHeight: 120, maxHeight: 250 }}
          rows={5}
          aria-label="Reflection text"
        />

        <p className="text-xs" style={{ color: text.length < minChars ? THEME.zero : colors.text.muted }}>
          {text.length < minChars
            ? `${text.length} / ${minChars} minimum`
            : text.length > maxChars - 50
              ? `${text.length} / ${maxChars}`
              : `${text.length} characters`}
        </p>

        {!submitted && (
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
        )}

        {/* AI Feedback */}
        <AnimatePresence>
          {feedbackText && (
            <motion.div
              className="w-full rounded-xl p-4"
              style={{ background: THEME.surface, border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>
                {feedbackText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion summary */}
        {submitted && feedbackText && (
          <motion.div
            className="flex w-full flex-col items-center gap-3 rounded-xl p-5"
            style={{ background: THEME.surface, border: `2px solid ${THEME.positive}` }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-bold" style={{ color: colors.text.primary }}>
              LESSON COMPLETE!
            </h3>
            <p className="text-sm" style={{ color: colors.text.muted }}>
              Integer Addition & Subtraction
            </p>
            <div className="flex flex-col gap-1 text-sm" style={{ color: colors.text.secondary }}>
              <span>Lesson completion: <span style={{ color: THEME.positive }}>100 XP</span></span>
              <span>Exploration bonus: <span style={{ color: THEME.positive }}>30 XP</span></span>
              <span>Reflection quality: <span style={{ color: THEME.positive }}>48 XP</span></span>
            </div>
            <div className="mt-1 border-t border-white/10 pt-2 text-center text-lg font-bold" style={{ color: THEME.zero }}>
              Total: 178 XP
            </div>

            <ContinueButton onClick={onComplete} label="Continue to Next Lesson \u2192" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MAIN LESSON COMPONENT
   ════════════════════════════════════════════════════════════════════════ */

export function IntegerAddSubLesson({ onComplete }: IntegerAddSubLessonProps) {
  return (
    <LessonShell
      title="Integer Add & Sub"
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
