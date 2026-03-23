"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FractionsLessonProps {
  onComplete?: () => void;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

interface PracticeProblem {
  id: string;
  stem: string;
  visualization?: {
    model: "bar" | "circle" | "comparison";
    denominator: number;
    shadedParts: number[];
    fractionB?: Fraction;
  };
  inputType: "fraction" | "multiple-choice" | "free-text";
  options?: Array<{ id: string; text: string; correct: boolean }>;
  correctAnswer?: Fraction;
  acceptedEquivalents?: Fraction[];
  feedback: { correct: string; incorrect: string };
  hints?: string[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* ── Lesson-specific semantic colors (not in shared tokens) ── */
const THEME = {
  numerHL: colors.accent.indigo,
  denomHL: "#f59e0b",
  pizzaBase: "#f59e0b",
  pizzaStroke: "#d97706",
  pizzaCrust: "#b45309",
  cutLine: "#fefce8",
  incorrect: "#f87171",
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const SHADED = colors.accent.indigo;
const UNSHADED = colors.bg.surface;
const CYAN = colors.accent.cyan;
const BORDER = colors.text.muted;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const CORRECT = colors.functional.success;
const SURFACE = colors.bg.secondary;
const BG = colors.bg.primary;

const SPRING = springs.default;
const SPRING_GENTLE = springs.gentle;
const EASE: { type: "tween"; duration: number; ease: "easeInOut" } = {
  type: "tween",
  duration: 0.3,
  ease: "easeInOut",
};

const MIN_DENOM = 2;
const MAX_DENOM = 12;
const MIN_INTERACTIONS = 10;

/* ------------------------------------------------------------------ */
/*  Utility helpers                                                    */
/* ------------------------------------------------------------------ */

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % t;
    x = t;
  }
  return x;
}

function fractionsEqual(a: Fraction, b: Fraction): boolean {
  return a.numerator * b.denominator === b.numerator * a.denominator;
}

/** SVG arc-wedge path for a pie-chart sector. */
function sectorPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const rad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startDeg));
  const y1 = cy + r * Math.sin(rad(startDeg));
  const x2 = cx + r * Math.cos(rad(endDeg));
  const y2 = cy + r * Math.sin(rad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

/** Set of 0..n-1 */
function rangeSet(n: number): Set<number> {
  return new Set(Array.from({ length: n }, (_, i) => i));
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

/* ContinueButton is now imported from @/components/lessons/ui/ContinueButton */
/* InteractionDots is now imported from @/components/lessons/ui/InteractionDots */

/* ------------------------------------------------------------------ */
/*  FractionBar                                                        */
/* ------------------------------------------------------------------ */

interface FractionBarProps {
  denominator: number;
  shadedParts: ReadonlySet<number>;
  width: number;
  height: number;
  interactive: boolean;
  onToggle?: (i: number) => void;
  shadedColor?: string;
  unshadedColor?: string;
  showLabel?: boolean;
}

function FractionBar({
  denominator,
  shadedParts,
  width,
  height,
  interactive,
  onToggle,
  shadedColor = SHADED,
  unshadedColor = UNSHADED,
  showLabel = true,
}: FractionBarProps) {
  const pw = width / denominator;
  const n = shadedParts.size;
  const clipId = `bar-clip-${denominator}-${width}-${height}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={width + 4}
        height={height + 4}
        viewBox={`-2 -2 ${width + 4} ${height + 4}`}
        role="group"
        aria-label={`Fraction bar: ${n} of ${denominator} shaded`}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={0} y={0} width={width} height={height} rx={4} ry={4} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {Array.from({ length: denominator }, (_, i) => {
            const filled = shadedParts.has(i);
            return (
              <motion.rect
                key={`p-${denominator}-${i}`}
                x={i * pw}
                y={0}
                width={pw}
                height={height}
                initial={{ fill: unshadedColor, opacity: 0.6 }}
                animate={{ fill: filled ? shadedColor : unshadedColor, opacity: 1 }}
                transition={SPRING}
                whileTap={interactive ? { scale: 0.95 } : undefined}
                style={{ cursor: interactive ? "pointer" : "default" }}
                role={interactive ? "checkbox" : undefined}
                aria-checked={interactive ? filled : undefined}
                aria-label={`Part ${i + 1} of ${denominator}${filled ? ", shaded" : ""}`}
                tabIndex={interactive ? 0 : undefined}
                onClick={interactive ? () => onToggle?.(i) : undefined}
                onKeyDown={
                  interactive
                    ? (e: ReactKeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onToggle?.(i);
                        }
                      }
                    : undefined
                }
              />
            );
          })}

          {/* Division lines */}
          {Array.from({ length: denominator - 1 }, (_, i) => (
            <motion.line
              key={`d-${denominator}-${i}`}
              x1={(i + 1) * pw}
              y1={0}
              x2={(i + 1) * pw}
              y2={height}
              stroke={BORDER}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ ...EASE, delay: i * 0.05 }}
            />
          ))}
        </g>

        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={4}
          ry={4}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.5}
        />
      </svg>

      {showLabel && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${n}/${denominator}`}
            className="flex items-baseline gap-1 text-xl font-bold tabular-nums"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <span style={{ color: THEME.numerHL }}>{n}</span>
            <span style={{ color: TEXT_SEC }}>/</span>
            <span style={{ color: THEME.denomHL }}>{denominator}</span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FractionCircle                                                     */
/* ------------------------------------------------------------------ */

interface FractionCircleProps {
  denominator: number;
  shadedSectors: ReadonlySet<number>;
  radius: number;
  interactive: boolean;
  onToggle?: (i: number) => void;
  shadedColor?: string;
  unshadedColor?: string;
  showLabel?: boolean;
}

function FractionCircle({
  denominator,
  shadedSectors,
  radius,
  interactive,
  onToggle,
  shadedColor = SHADED,
  unshadedColor = UNSHADED,
  showLabel = true,
}: FractionCircleProps) {
  const cx = radius + 4;
  const cy = radius + 4;
  const sz = (radius + 4) * 2;
  const n = shadedSectors.size;
  const angle = 360 / denominator;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={sz}
        height={sz}
        viewBox={`0 0 ${sz} ${sz}`}
        role="group"
        aria-label={`Fraction circle: ${n} of ${denominator} shaded`}
      >
        <circle cx={cx} cy={cy} r={radius} fill={unshadedColor} stroke={BORDER} strokeWidth={1.5} />

        {Array.from({ length: denominator }, (_, i) => {
          const s = -90 + i * angle;
          const e = s + angle;
          const filled = shadedSectors.has(i);
          return (
            <motion.path
              key={`s-${denominator}-${i}`}
              d={sectorPath(cx, cy, radius, s, e)}
              initial={{ fill: unshadedColor, opacity: 0.6 }}
              animate={{ fill: filled ? shadedColor : unshadedColor, opacity: 1 }}
              transition={SPRING}
              whileTap={interactive ? { scale: 0.97 } : undefined}
              style={{ cursor: interactive ? "pointer" : "default" }}
              role={interactive ? "checkbox" : undefined}
              aria-checked={interactive ? filled : undefined}
              aria-label={`Sector ${i + 1} of ${denominator}${filled ? ", shaded" : ""}`}
              tabIndex={interactive ? 0 : undefined}
              onClick={interactive ? () => onToggle?.(i) : undefined}
              onKeyDown={
                interactive
                  ? (ev: ReactKeyboardEvent) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        onToggle?.(i);
                      }
                    }
                  : undefined
              }
            />
          );
        })}

        {/* Radial lines */}
        {Array.from({ length: denominator }, (_, i) => {
          const a = -90 + i * angle;
          const rd = (a * Math.PI) / 180;
          return (
            <motion.line
              key={`r-${denominator}-${i}`}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(rd)}
              y2={cy + radius * Math.sin(rd)}
              stroke={BORDER}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ ...EASE, delay: i * 0.04 }}
            />
          );
        })}
      </svg>

      {showLabel && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${n}/${denominator}`}
            className="flex items-baseline gap-1 text-xl font-bold tabular-nums"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <span style={{ color: THEME.numerHL }}>{n}</span>
            <span style={{ color: TEXT_SEC }}>/</span>
            <span style={{ color: THEME.denomHL }}>{denominator}</span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DenominatorSlider                                                  */
/* ------------------------------------------------------------------ */

function DenominatorSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const range = MAX_DENOM - MIN_DENOM;
  const pct = ((value - MIN_DENOM) / range) * 100;

  const snap = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      onChange(clamp(Math.round(ratio * range + MIN_DENOM), MIN_DENOM, MAX_DENOM));
    },
    [onChange, range],
  );

  const bind = useDrag(({ xy: [x] }) => snap(x), { axis: "x", filterTaps: true });

  return (
    <div className="w-full max-w-xs mx-auto px-2">
      <div
        className="relative h-12 flex items-center"
        role="slider"
        aria-valuemin={MIN_DENOM}
        aria-valuemax={MAX_DENOM}
        aria-valuenow={value}
        aria-label="Number of equal parts"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onChange(clamp(value + 1, MIN_DENOM, MAX_DENOM));
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onChange(clamp(value - 1, MIN_DENOM, MAX_DENOM));
          } else if (e.key === "Home") {
            e.preventDefault();
            onChange(MIN_DENOM);
          } else if (e.key === "End") {
            e.preventDefault();
            onChange(MAX_DENOM);
          }
        }}
        onClick={(e) => snap(e.clientX)}
      >
        <div ref={trackRef} className="relative w-full h-1.5 rounded-full bg-nm-bg-secondary">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ background: SHADED }}
            animate={{ width: `${pct}%` }}
            transition={SPRING}
          />
        </div>

        <motion.div
          {...(bind() as Record<string, unknown>)}
          className="absolute rounded-full shadow-md touch-none"
          style={{
            width: 28,
            height: 28,
            background: SHADED,
            border: `2px solid ${TEXT}`,
            left: `calc(${pct}% - 14px)`,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "grab",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 1.1, cursor: "grabbing" }}
          transition={springs.pop}
        />
      </div>

      <div className="flex justify-between mt-1">
        {Array.from({ length: range + 1 }, (_, i) => {
          const tick = MIN_DENOM + i;
          return (
            <button
              key={tick}
              className="text-xs font-mono flex items-start justify-center pt-0.5"
              style={{
                minWidth: 20,
                minHeight: 44,
                color: tick === value ? SHADED : TEXT_SEC,
                fontWeight: tick === value ? 600 : 400,
              }}
              onClick={() => onChange(tick)}
              aria-label={`Set to ${tick}`}
            >
              {tick}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FractionInput                                                      */
/* ------------------------------------------------------------------ */

function FractionInput({
  value,
  onChange,
  disabled,
}: {
  value: Fraction;
  onChange: (f: Fraction) => void;
  disabled?: boolean;
}) {
  return (
    <div className="inline-flex flex-col items-center">
      <input
        type="number"
        min={0}
        max={99}
        value={value.numerator || ""}
        onChange={(e) => onChange({ ...value, numerator: parseInt(e.target.value) || 0 })}
        disabled={disabled}
        className="w-16 h-10 text-center text-lg font-bold rounded-t-lg border border-b-0 bg-transparent focus:outline-none tabular-nums"
        style={{ borderColor: BORDER, color: TEXT }}
        aria-label="Numerator"
        placeholder="?"
      />
      <div className="w-16 h-0.5" style={{ background: TEXT }} />
      <input
        type="number"
        min={1}
        max={99}
        value={value.denominator || ""}
        onChange={(e) => onChange({ ...value, denominator: parseInt(e.target.value) || 0 })}
        disabled={disabled}
        className="w-16 h-10 text-center text-lg font-bold rounded-b-lg border border-t-0 bg-transparent focus:outline-none tabular-nums"
        style={{ borderColor: BORDER, color: TEXT }}
        aria-label="Denominator"
        placeholder="?"
      />
    </div>
  );
}

/* ================================================================== */
/*  Stage 1 — Hook: Pizza Slicing Animation                           */
/* ================================================================== */

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/FractionsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /*
   * Phases:
   * 0  whole pizza fade-in
   * 1  cut horizontal  => halves
   * 2  shade 1/2
   * 3  cut vertical    => quarters
   * 4  shade 1/4
   * 5  cut diagonals   => eighths
   * 6  shade 1/8
   * 7  side-by-side comparison
   * 8  insight text
   */

  useEffect(() => {
    const delays = [1500, 1200, 1500, 1200, 1500, 1200, 1500, 3500, 4000];
    let i = 0;
    function next() {
      if (i >= delays.length) return;
      timerRef.current = setTimeout(() => {
        setPhase(i + 1);
        if (i + 1 >= 3) setCanSkip(true);
        i++;
        next();
      }, delays[i]);
    }
    next();
    // Failsafe: guarantee Continue button within 4s
    const failsafe = setTimeout(() => setCanSkip(true), 4000);
    return () => { clearTimeout(timerRef.current); clearTimeout(failsafe); };
  }, []);

  const cx = 200;
  const cy = 160;
  const r = 120;

  const cuts = useMemo(() => {
    const c: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    if (phase >= 1) c.push({ x1: 80, y1: 160, x2: 320, y2: 160 });
    if (phase >= 3) c.push({ x1: 200, y1: 40, x2: 200, y2: 280 });
    if (phase >= 5) {
      c.push({ x1: 115, y1: 75, x2: 285, y2: 245 });
      c.push({ x1: 285, y1: 75, x2: 115, y2: 245 });
    }
    return c;
  }, [phase]);

  const shadedPath = useMemo(() => {
    if (phase >= 6) return sectorPath(cx, cy, r, -90, -90 + 45);
    if (phase >= 4) return sectorPath(cx, cy, r, -90, 0);
    if (phase >= 2) return sectorPath(cx, cy, r, -90, 90);
    return undefined;
  }, [phase]);

  const label = phase >= 5 ? "1 / 8" : phase >= 3 ? "1 / 4" : phase >= 1 ? "1 / 2" : "1 whole pizza";

  const narration =
    phase >= 8
      ? "The BIGGER the bottom number, the SMALLER the piece!"
      : phase >= 7
        ? "More cuts = smaller pieces."
        : phase >= 5
          ? "Eighths -- eight tiny pieces."
          : phase >= 3
            ? "Quarters -- four equal pieces."
            : phase >= 1
              ? "Cut in half -- two equal pieces."
              : null;

  const showComparison = phase >= 7;

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4">
      {/* Narration */}
      <AnimatePresence mode="wait">
        {narration && (
          <motion.p
            key={narration}
            className="text-base text-center max-w-sm font-medium"
            style={{ color: TEXT }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {narration}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Pizza SVG */}
      <motion.svg
        width={400}
        height={360}
        viewBox="0 0 400 360"
        className="max-w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Base */}
        <circle cx={cx} cy={cy} r={r} fill={THEME.pizzaBase} stroke={THEME.pizzaStroke} strokeWidth={2.5} />
        <circle cx={cx} cy={cy} r={r} fill="transparent" stroke={THEME.pizzaCrust} strokeWidth={6} />

        {/* Shaded sector */}
        {shadedPath && (
          <motion.path
            d={shadedPath}
            fill={SHADED}
            fillOpacity={0.6}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Cut lines */}
        {cuts.map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={THEME.cutLine}
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}

        {/* Side-by-side comparison slices */}
        {showComparison && (
          <>
            {/* 1/2 slice */}
            <motion.path
              d={sectorPath(130, 310, 50, -90, 90)}
              fill={SHADED}
              initial={{ opacity: 0, x: 70, y: -150 }}
              animate={{ opacity: 0.85, x: 0, y: 0 }}
              transition={SPRING}
            />
            <motion.text
              x={130}
              y={356}
              textAnchor="middle"
              fill={TEXT}
              fontSize={14}
              fontWeight={600}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              1/2
            </motion.text>

            {/* 1/8 slice */}
            <motion.path
              d={sectorPath(270, 310, 50, -90, -90 + 45)}
              fill={SHADED}
              initial={{ opacity: 0, x: -70, y: -150 }}
              animate={{ opacity: 0.85, x: 0, y: 0 }}
              transition={SPRING}
            />
            <motion.text
              x={270}
              y={356}
              textAnchor="middle"
              fill={TEXT}
              fontSize={14}
              fontWeight={600}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              1/8
            </motion.text>

            <motion.text
              x={200}
              y={300}
              textAnchor="middle"
              fill={CYAN}
              fontSize={13}
              fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              4x bigger!
            </motion.text>
          </>
        )}
      </motion.svg>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={label}
          className="text-2xl font-bold tabular-nums"
          style={{ color: TEXT }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.p>
      </AnimatePresence>

      {canSkip && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ContinueButton onClick={onComplete}>Continue</ContinueButton>
        </motion.div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Stage 2 — Spatial Experience                                       */
/* ================================================================== */

interface SpatialState {
  denominator: number;
  shaded: Set<number>;
  interactions: number;
  comparing: boolean;
  compDenom: number;
  compShaded: Set<number>;
  overlayVisible: boolean;
  everFoundEquivalence: boolean;
}

type SpatialAction =
  | { type: "SET_DENOM"; v: number }
  | { type: "TOGGLE"; i: number }
  | { type: "OPEN_CMP" }
  | { type: "SET_COMP_DENOM"; v: number }
  | { type: "TOGGLE_CMP"; i: number }
  | { type: "SHOW_OVERLAY" }
  | { type: "HIDE_OVERLAY" };

function spatialReducer(s: SpatialState, a: SpatialAction): SpatialState {
  switch (a.type) {
    case "SET_DENOM":
      return { ...s, denominator: a.v, shaded: new Set(), interactions: s.interactions + 1 };
    case "TOGGLE": {
      const next = new Set(s.shaded);
      next.has(a.i) ? next.delete(a.i) : next.add(a.i);
      return { ...s, shaded: next, interactions: s.interactions + 1 };
    }
    case "OPEN_CMP":
      return {
        ...s,
        comparing: true,
        compDenom: 2,
        compShaded: new Set(),
        overlayVisible: false,
        interactions: s.interactions + 1,
      };
    case "SET_COMP_DENOM":
      return { ...s, compDenom: a.v, compShaded: new Set(), interactions: s.interactions + 1 };
    case "TOGGLE_CMP": {
      const next = new Set(s.compShaded);
      next.has(a.i) ? next.delete(a.i) : next.add(a.i);
      return { ...s, compShaded: next, interactions: s.interactions + 1 };
    }
    case "SHOW_OVERLAY": {
      const fA: Fraction = { numerator: s.shaded.size, denominator: s.denominator };
      const fB: Fraction = { numerator: s.compShaded.size, denominator: s.compDenom };
      const eq =
        fA.numerator > 0 && fB.numerator > 0 && fractionsEqual(fA, fB);
      return {
        ...s,
        overlayVisible: true,
        everFoundEquivalence: s.everFoundEquivalence || eq,
        interactions: s.interactions + 1,
      };
    }
    case "HIDE_OVERLAY":
      return { ...s, overlayVisible: false };
    default:
      return s;
  }
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [s, dispatch] = useReducer(spatialReducer, {
    denominator: 2,
    shaded: new Set<number>(),
    interactions: 0,
    comparing: false,
    compDenom: 2,
    compShaded: new Set<number>(),
    overlayVisible: false,
    everFoundEquivalence: false,
  });

  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (s.comparing && !s.everFoundEquivalence && !hint) {
      const t = setTimeout(() => setHint(true), 4000);
      return () => clearTimeout(t);
    }
  }, [s.comparing, s.everFoundEquivalence, hint]);

  const ready = s.interactions >= MIN_INTERACTIONS;

  const fA: Fraction = { numerator: s.shaded.size, denominator: s.denominator };
  const fB: Fraction = { numerator: s.compShaded.size, denominator: s.compDenom };
  const overlayEq =
    s.overlayVisible && fA.numerator > 0 && fB.numerator > 0 && fractionsEqual(fA, fB);
  const barW = 280;

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Explore Fractions
      </h2>

      {/* Bar + Circle side by side (desktop) / stacked (mobile) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <FractionBar
          denominator={s.denominator}
          shadedParts={s.shaded}
          width={barW}
          height={56}
          interactive
          onToggle={(i) => dispatch({ type: "TOGGLE", i })}
        />
        <FractionCircle
          denominator={s.denominator}
          shadedSectors={s.shaded}
          radius={90}
          interactive
          onToggle={(i) => dispatch({ type: "TOGGLE", i })}
        />
      </div>

      <DenominatorSlider value={s.denominator} onChange={(v) => dispatch({ type: "SET_DENOM", v })} />

      {s.shaded.size === s.denominator && s.denominator > 0 && (
        <motion.p
          className="text-sm font-medium"
          style={{ color: THEME.denomHL }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          That&apos;s 1 whole!
        </motion.p>
      )}

      {/* Comparison tool */}
      {!s.comparing ? (
        <button
          className="rounded-xl px-5 py-3 text-base font-medium border transition-colors hover:bg-white/5"
          style={{ minHeight: 48, color: SHADED, borderColor: SHADED, background: "transparent" }}
          onClick={() => dispatch({ type: "OPEN_CMP" })}
        >
          Compare Fractions
        </button>
      ) : (
        <motion.div
          className="flex flex-col items-center gap-4 w-full max-w-md rounded-xl p-4 bg-nm-bg-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_GENTLE}
        >
          <p className="text-sm font-medium" style={{ color: TEXT_SEC }}>
            Fraction B
          </p>

          <FractionBar
            denominator={s.compDenom}
            shadedParts={s.compShaded}
            width={barW}
            height={48}
            interactive={!s.overlayVisible}
            onToggle={(i) => dispatch({ type: "TOGGLE_CMP", i })}
            shadedColor={CYAN}
          />

          <DenominatorSlider value={s.compDenom} onChange={(v) => dispatch({ type: "SET_COMP_DENOM", v })} />

          {!s.overlayVisible ? (
            <button
              className="rounded-xl px-5 py-3 text-base font-medium"
              style={{ minHeight: 48, background: SHADED, color: "#fff" }}
              onClick={() => dispatch({ type: "SHOW_OVERLAY" })}
              disabled={fA.numerator === 0 && fB.numerator === 0}
            >
              Show Overlay
            </button>
          ) : (
            <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Overlay bars */}
              <div className="relative" style={{ height: 56 }}>
                <svg width={barW + 4} height={52} viewBox={`-2 -2 ${barW + 4} 52`}>
                  <rect
                    x={0}
                    y={0}
                    width={(fA.numerator / fA.denominator) * barW}
                    height={48}
                    rx={4}
                    fill={SHADED}
                  />
                  <rect x={0} y={0} width={barW} height={48} rx={4} fill="none" stroke={BORDER} strokeWidth={1} />
                </svg>
                <motion.div
                  className="absolute left-0"
                  initial={{ top: 60 }}
                  animate={{ top: 0 }}
                  transition={SPRING}
                >
                  <svg width={barW + 4} height={52} viewBox={`-2 -2 ${barW + 4} 52`}>
                    <rect
                      x={0}
                      y={0}
                      width={(fB.numerator / fB.denominator) * barW}
                      height={48}
                      rx={4}
                      fill={CYAN}
                      fillOpacity={0.4}
                    />
                    <rect
                      x={0}
                      y={0}
                      width={barW}
                      height={48}
                      rx={4}
                      fill="none"
                      stroke={CYAN}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                  </svg>
                </motion.div>
              </div>

              {overlayEq ? (
                <motion.p
                  className="text-base font-bold text-center"
                  style={{ color: CORRECT }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                >
                  They&apos;re the same size!
                  <br />
                  <span className="text-sm font-normal">
                    {fA.numerator}/{fA.denominator} = {fB.numerator}/{fB.denominator}
                  </span>
                </motion.p>
              ) : (
                fA.numerator > 0 &&
                fB.numerator > 0 && (
                  <motion.p className="text-sm" style={{ color: TEXT_SEC }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {fA.numerator / fA.denominator > fB.numerator / fB.denominator
                      ? `${fA.numerator}/${fA.denominator} is bigger!`
                      : `${fB.numerator}/${fB.denominator} is bigger!`}
                  </motion.p>
                )
              )}

              <button
                className="text-sm underline"
                style={{ minHeight: 44, color: TEXT_SEC }}
                onClick={() => dispatch({ type: "HIDE_OVERLAY" })}
              >
                Hide Overlay
              </button>
            </motion.div>
          )}

          {hint && !s.everFoundEquivalence && (
            <motion.p className="text-xs italic" style={{ color: CYAN }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Try comparing 1/2 and 2/4!
            </motion.p>
          )}
        </motion.div>
      )}

      <InteractionDots count={Math.min(s.interactions, MIN_INTERACTIONS)} total={MIN_INTERACTIONS} />

      <ContinueButton onClick={onComplete} disabled={!ready}>
        Continue to Discovery
      </ContinueButton>
    </div>
  );
}

/* ================================================================== */
/*  Stage 3 — Guided Discovery                                        */
/* ================================================================== */

const DISCOVERY_PROMPTS = [
  {
    id: "eq-half",
    text: "Make 1/2 on the fraction bar. Now change the denominator to 4 and make 2/4. Notice anything?",
    hint: "Compare the shaded area. Are they covering the same amount of the bar?",
    feedback:
      "Interesting! 1/2 and 2/4 take up exactly the same amount of space. They are equivalent fractions.",
  },
  {
    id: "eq-extend",
    text: "Try making 3/6 and 4/8. Are they the same as 1/2?",
    hint: "Use the comparison overlay to check if the shaded areas match.",
    feedback:
      "Another match! So 1/2 = 2/4 = 3/6 = 4/8. These are called equivalent fractions.",
  },
  {
    id: "pattern",
    text: "The key pattern: 1/2 = 2/4 = 3/6 = 4/8. What's happening to the top and bottom numbers each time?",
    hint: "Look at the numerators: 1, 2, 3, 4. Now the denominators: 2, 4, 6, 8.",
    feedback:
      "Both the numerator and denominator are being multiplied by the same number. That keeps the fraction the same size!",
  },
  {
    id: "misconception",
    text: 'Now compare 1/2 and 1/3. Which is BIGGER?',
    hint: "Make both fractions and overlay them. Which covers more of the bar?",
    feedback:
      "Even though 3 > 2, the piece is SMALLER. More pieces = smaller pieces. So 1/2 > 1/3.",
  },
  {
    id: "harder",
    text: "Which is bigger: 2/3 or 3/4? Make both bars and overlay them to find out.",
    hint: "The difference is small! 3/4 = 0.75 and 2/3 ≈ 0.667.",
    feedback:
      "Close one! 3/4 is slightly more than 2/3. When fractions have different denominators, visual models help!",
  },
];

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const p = DISCOVERY_PROMPTS[idx]!;
  const last = idx === DISCOVERY_PROMPTS.length - 1;

  useEffect(() => {
    setShowHint(false);
    const t = setTimeout(() => setShowHint(true), 30_000);
    return () => clearTimeout(t);
  }, [idx]);

  const handleSubmit = () => {
    if (!response.trim()) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    if (last) {
      onComplete();
      return;
    }
    setIdx(idx + 1);
    setResponse("");
    setSubmitted(false);
  };

  /* Illustrations for each prompt */
  const illustration = useMemo((): ReactNode => {
    if (idx === 0) {
      return (
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-3">
            <FractionBar denominator={2} shadedParts={new Set([0])} width={200} height={36} interactive={false} showLabel={false} />
            <span className="text-sm font-bold" style={{ color: TEXT }}>1/2</span>
          </div>
          <div className="flex items-center gap-3">
            <FractionBar denominator={4} shadedParts={new Set([0, 1])} width={200} height={36} interactive={false} showLabel={false} />
            <span className="text-sm font-bold" style={{ color: TEXT }}>2/4</span>
          </div>
        </div>
      );
    }
    if (idx === 1) {
      const eqs = [
        { n: 1, d: 2 },
        { n: 2, d: 4 },
        { n: 3, d: 6 },
        { n: 4, d: 8 },
      ];
      return (
        <div className="flex flex-col gap-2 items-center">
          {eqs.map((f, i) => (
            <motion.div
              key={`${f.n}/${f.d}`}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.25 }}
            >
              <FractionBar
                denominator={f.d}
                shadedParts={rangeSet(f.n)}
                width={200}
                height={28}
                interactive={false}
                showLabel={false}
              />
              <span className="text-xs font-bold tabular-nums" style={{ color: TEXT }}>
                {f.n}/{f.d}
              </span>
            </motion.div>
          ))}
        </div>
      );
    }
    if (idx === 2) {
      return (
        <motion.div
          className="flex items-center gap-2 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["1/2", "2/4", "3/6", "4/8"].map((f, i, a) => (
            <span key={f} className="flex items-center gap-1">
              <span className="text-lg font-bold" style={{ color: TEXT }}>{f}</span>
              {i < a.length - 1 && (
                <motion.span
                  className="text-sm font-bold"
                  style={{ color: CYAN }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                >
                  {" "}={" "}
                </motion.span>
              )}
            </span>
          ))}
        </motion.div>
      );
    }
    if (idx === 3) {
      return (
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-3">
            <FractionBar denominator={2} shadedParts={new Set([0])} width={200} height={36} interactive={false} showLabel={false} />
            <span className="text-sm font-bold" style={{ color: TEXT }}>1/2</span>
          </div>
          <div className="flex items-center gap-3">
            <FractionBar denominator={3} shadedParts={new Set([0])} width={200} height={36} interactive={false} showLabel={false} />
            <span className="text-sm font-bold" style={{ color: TEXT }}>1/3</span>
          </div>
          <motion.p
            className="text-sm font-bold"
            style={{ color: THEME.incorrect }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            1/2 covers more! Bigger denominator = smaller pieces.
          </motion.p>
        </div>
      );
    }
    /* idx === 4 */
    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center gap-3">
          <FractionBar denominator={3} shadedParts={new Set([0, 1])} width={200} height={36} interactive={false} showLabel={false} />
          <span className="text-sm font-bold" style={{ color: TEXT }}>2/3</span>
        </div>
        <div className="flex items-center gap-3">
          <FractionBar
            denominator={4}
            shadedParts={new Set([0, 1, 2])}
            width={200}
            height={36}
            interactive={false}
            showLabel={false}
            shadedColor={CYAN}
          />
          <span className="text-sm font-bold" style={{ color: TEXT }}>3/4</span>
        </div>
        <motion.p className="text-xs" style={{ color: TEXT_SEC }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          3/4 is just a tiny bit bigger!
        </motion.p>
      </div>
    );
  }, [idx]);

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Guided Discovery
      </h2>

      {/* Dots */}
      <div className="flex gap-2">
        {DISCOVERY_PROMPTS.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: i < idx ? CORRECT : i === idx ? SHADED : UNSHADED,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="w-full max-w-md flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={SPRING_GENTLE}
        >
          <div className="rounded-xl p-4 w-full bg-nm-bg-secondary">
            <p className="text-base leading-relaxed" style={{ color: TEXT }}>
              {p.text}
            </p>
          </div>

          <div className="py-2">{illustration}</div>

          {!submitted ? (
            <div className="w-full flex flex-col gap-3">
              <textarea
                className="w-full p-3 rounded-lg text-sm resize-none focus:outline-none bg-nm-bg-primary"
                style={{
                  minHeight: 80,
                  border: `1px solid ${BORDER}`,
                  color: TEXT,
                }}
                placeholder="Type your observation..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <div className="flex justify-center">
                <ContinueButton onClick={handleSubmit} disabled={!response.trim()}>
                  Submit
                </ContinueButton>
              </div>
            </div>
          ) : (
            <motion.div className="w-full flex flex-col gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div
                className="rounded-lg p-3 text-sm leading-relaxed"
                style={{ background: `${BG}cc`, borderLeft: `3px solid ${CORRECT}`, color: TEXT }}
              >
                {p.feedback}
              </div>
              <ContinueButton onClick={handleNext}>
                {last ? "Continue to Symbols" : "Next"}
              </ContinueButton>
            </motion.div>
          )}

          {showHint && !submitted && (
            <motion.p className="text-xs italic" style={{ color: CYAN }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Hint: {p.hint}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  Stage 4 — Symbol Bridge                                            */
/* ================================================================== */

function SymbolStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<Fraction>({ numerator: 0, denominator: 0 });
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  /* 0: label numerator/denominator on 3/4
   * 1: general a/b with cycling examples
   * 2: equivalent-fractions formula
   * 3: mini practice  2/6 = ?/3
   */

  useEffect(() => {
    if (step < 3) {
      const ms = step === 1 ? 6000 : 4500;
      const t = setTimeout(() => setStep(step + 1), ms);
      return () => clearTimeout(t);
    }
  }, [step]);

  /* Cycling examples for step 1 */
  const examples: Array<{ n: number; d: number }> = useMemo(() => [
    { n: 3, d: 4 },
    { n: 2, d: 5 },
    { n: 5, d: 8 },
  ], []);
  const [exIdx, setExIdx] = useState(0);

  useEffect(() => {
    if (step !== 1) return;
    const iv = setInterval(() => setExIdx((i) => (i + 1) % examples.length), 1800);
    return () => clearInterval(iv);
  }, [step, examples.length]);

  const ex = examples[exIdx]!;

  const handleCheck = () => {
    const ok = answer.numerator === 1 && answer.denominator === 3;
    setCorrect(ok);
    setChecked(true);
  };

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Symbol Bridge
      </h2>

      <AnimatePresence mode="wait">
        {/* Step 0: numerator / denominator labels */}
        {step === 0 && (
          <motion.div
            key="s0"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FractionBar
              denominator={4}
              shadedParts={new Set([0, 1, 2])}
              width={260}
              height={52}
              interactive={false}
              showLabel={false}
            />

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <motion.span
                  className="text-4xl font-bold"
                  style={{ color: THEME.numerHL }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  3
                </motion.span>
                <div className="w-12 h-0.5 my-1" style={{ background: TEXT }} />
                <motion.span
                  className="text-4xl font-bold"
                  style={{ color: THEME.denomHL }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  4
                </motion.span>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <motion.p style={{ color: THEME.numerHL }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  3 parts shaded (numerator)
                </motion.p>
                <motion.p style={{ color: THEME.denomHL }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}>
                  4 equal parts total (denominator)
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: general a/b */}
        {step === 1 && (
          <motion.div
            key="s1"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-lg" style={{ color: TEXT }}>
              <span style={{ color: THEME.numerHL }}>a</span>
              <span style={{ color: TEXT_SEC }}> / </span>
              <span style={{ color: THEME.denomHL }}>b</span>
              <span style={{ color: TEXT_SEC }}> means: split into </span>
              <span style={{ color: THEME.denomHL }}>b</span>
              <span style={{ color: TEXT_SEC }}> parts, take </span>
              <span style={{ color: THEME.numerHL }}>a</span>
              <span style={{ color: TEXT_SEC }}> of them.</span>
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${ex.n}/${ex.d}`}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FractionBar denominator={ex.d} shadedParts={rangeSet(ex.n)} width={240} height={48} interactive={false} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Step 2: equivalent formula */}
        {step === 2 && (
          <motion.div
            key="s2"
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-base text-center" style={{ color: TEXT }}>
              Equivalent Fractions Rule
            </p>

            <div className="text-center text-xl font-bold">
              <span style={{ color: THEME.numerHL }}>a</span>
              <span style={{ color: TEXT_SEC }}>/</span>
              <span style={{ color: THEME.denomHL }}>b</span>
              <span style={{ color: TEXT_SEC }}> = </span>
              <span style={{ color: THEME.numerHL }}>(a</span>
              <span style={{ color: CYAN }}> * n</span>
              <span style={{ color: THEME.numerHL }}>)</span>
              <span style={{ color: TEXT_SEC }}> / </span>
              <span style={{ color: THEME.denomHL }}>(b</span>
              <span style={{ color: CYAN }}> * n</span>
              <span style={{ color: THEME.denomHL }}>)</span>
            </div>

            <motion.div
              className="flex items-center gap-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span style={{ color: TEXT }}>1/2</span>
              <span style={{ color: TEXT_SEC }}>=</span>
              <span style={{ color: TEXT_SEC }}>(1</span>
              <motion.span style={{ color: CYAN }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                *2
              </motion.span>
              <span style={{ color: TEXT_SEC }}>)/(2</span>
              <motion.span style={{ color: CYAN }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                *2
              </motion.span>
              <span style={{ color: TEXT_SEC }}>)</span>
              <span style={{ color: TEXT_SEC }}>=</span>
              <motion.span style={{ color: TEXT }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                2/4
              </motion.span>
            </motion.div>

            <motion.div className="flex flex-col gap-2 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              <FractionBar denominator={2} shadedParts={new Set([0])} width={200} height={32} interactive={false} showLabel={false} />
              <FractionBar denominator={4} shadedParts={new Set([0, 1])} width={200} height={32} interactive={false} showLabel={false} shadedColor={CYAN} />
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: mini practice */}
        {step >= 3 && (
          <motion.div key="s3" className="flex flex-col items-center gap-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-base text-center" style={{ color: TEXT }}>
              Quick check: find the missing number.
            </p>

            <FractionBar denominator={6} shadedParts={new Set([0, 1])} width={240} height={40} interactive={false} />

            <div className="flex items-center gap-3 text-xl font-bold">
              <span style={{ color: TEXT }}>2/6 = </span>
              {!checked ? (
                <FractionInput value={answer} onChange={setAnswer} />
              ) : (
                <span style={{ color: correct ? CORRECT : THEME.incorrect }}>
                  {answer.numerator}/{answer.denominator || "?"}
                </span>
              )}
            </div>

            {!checked ? (
              <ContinueButton onClick={handleCheck} disabled={answer.numerator === 0 || answer.denominator === 0}>
                Check
              </ContinueButton>
            ) : (
              <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm text-center" style={{ color: correct ? CORRECT : THEME.incorrect }}>
                  {correct
                    ? "Correct! 2/6 simplified is 1/3. You divided both by 2."
                    : "The answer is 1/3. Divide both 2 and 6 by 2."}
                </p>
                {correct && (
                  <FractionBar denominator={3} shadedParts={new Set([0])} width={240} height={40} interactive={false} shadedColor={CYAN} />
                )}
                <ContinueButton onClick={onComplete}>Continue</ContinueButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  Stage 5 — Real-World Anchor                                        */
/* ================================================================== */

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [ci, setCi] = useState(0);

  const cards = useMemo(
    () => [
      {
        title: "Pizza Sharing",
        text: "If 8 people share a pizza equally, each person gets 1/8 of the pizza.",
      },
      {
        title: "Cooking Recipes",
        text: "A recipe calls for 3/4 cup of flour. That means fill 3 of the 4 equal sections.",
      },
      {
        title: "Time",
        text: "A quarter hour = 1/4 of 60 minutes = 15 minutes. Half hour = 1/2 = 30 minutes.",
      },
      {
        title: "Sales & Discounts",
        text: "1/3 off a $30 item: you save 1/3 ($10) and pay 2/3 ($20).",
      },
    ],
    [],
  );

  const bind = useDrag(
    ({ direction: [dx], velocity: [vx], cancel }) => {
      if (vx > 0.3) {
        setCi((c) => clamp(c + (dx > 0 ? -1 : 1), 0, cards.length - 1));
        cancel();
      }
    },
    { axis: "x", filterTaps: true },
  );

  const card = cards[ci]!;

  const cardIllustration = useMemo((): ReactNode => {
    switch (ci) {
      case 0:
        return <FractionCircle denominator={8} shadedSectors={new Set([0])} radius={70} interactive={false} />;
      case 1:
        return <FractionBar denominator={4} shadedParts={new Set([0, 1, 2])} width={220} height={44} interactive={false} />;
      case 2:
        return (
          <svg width={160} height={160} viewBox="0 0 160 160">
            <circle cx={80} cy={80} r={70} fill={BG} stroke={BORDER} strokeWidth={2} />
            <motion.path
              d={sectorPath(80, 80, 65, -90, 0)}
              fill={SHADED}
              fillOpacity={0.4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {Array.from({ length: 12 }, (_, i) => {
              const a = ((i * 30 - 90) * Math.PI) / 180;
              const len = i % 3 === 0 ? 8 : 4;
              return (
                <line
                  key={i}
                  x1={80 + (65 - len) * Math.cos(a)}
                  y1={80 + (65 - len) * Math.sin(a)}
                  x2={80 + 65 * Math.cos(a)}
                  y2={80 + 65 * Math.sin(a)}
                  stroke={TEXT_SEC}
                  strokeWidth={i % 3 === 0 ? 2 : 1}
                />
              );
            })}
            <text x={80} y={22} textAnchor="middle" fill={TEXT_SEC} fontSize={10}>12</text>
            <text x={148} y={83} textAnchor="middle" fill={TEXT_SEC} fontSize={10}>3</text>
            <circle cx={80} cy={80} r={3} fill={TEXT} />
          </svg>
        );
      case 3:
        return (
          <FractionBar
            denominator={3}
            shadedParts={new Set([0])}
            width={220}
            height={44}
            interactive={false}
            shadedColor={THEME.incorrect}
          />
        );
      default:
        return null;
    }
  }, [ci]);

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Fractions in the Real World
      </h2>

      <div className="w-full max-w-sm touch-pan-y" {...(bind() as Record<string, unknown>)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={ci}
            className="rounded-xl p-5 flex flex-col gap-4"
            style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={SPRING_GENTLE}
          >
            <h3 className="text-base font-bold" style={{ color: SHADED }}>
              {card.title}
            </h3>
            <div className="flex justify-center py-2">{cardIllustration}</div>
            <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
              {card.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots — 44px touch target */}
      <div className="flex gap-3">
        {cards.map((_, i) => (
          <button
            key={i}
            className="flex items-center justify-center"
            style={{ minWidth: 44, minHeight: 44 }}
            onClick={() => setCi(i)}
            aria-label={`Card ${i + 1}`}
          >
            <div
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: i === ci ? SHADED : BORDER }}
            />
          </button>
        ))}
      </div>

      {/* Nav arrows */}
      <div className="flex gap-4">
        <button
          className="rounded-lg flex items-center justify-center"
          style={{ minHeight: 44, minWidth: 44, background: ci > 0 ? SURFACE : "transparent", color: ci > 0 ? TEXT : BORDER }}
          onClick={() => setCi(Math.max(0, ci - 1))}
          disabled={ci === 0}
          aria-label="Previous"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
          </svg>
        </button>
        <button
          className="rounded-lg flex items-center justify-center"
          style={{
            minHeight: 44,
            minWidth: 44,
            background: ci < cards.length - 1 ? SURFACE : "transparent",
            color: ci < cards.length - 1 ? TEXT : BORDER,
          }}
          onClick={() => setCi(Math.min(cards.length - 1, ci + 1))}
          disabled={ci === cards.length - 1}
          aria-label="Next"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
        </button>
      </div>

      <ContinueButton onClick={onComplete}>Continue to Practice</ContinueButton>
    </div>
  );
}

/* ================================================================== */
/*  Stage 6 — Practice                                                 */
/* ================================================================== */

const PROBLEMS: PracticeProblem[] = [
  /* Layer 0 — Recall */
  {
    id: "R1",
    stem: "What fraction of the bar is shaded?",
    visualization: { model: "bar", denominator: 5, shadedParts: [0, 1, 2] },
    inputType: "fraction",
    correctAnswer: { numerator: 3, denominator: 5 },
    acceptedEquivalents: [{ numerator: 6, denominator: 10 }],
    feedback: {
      correct: "That's right! 3 out of 5 parts are shaded, so it's 3/5.",
      incorrect: "Count the total parts (denominator) and the shaded parts (numerator). 5 total, 3 shaded.",
    },
  },
  {
    id: "R2",
    stem: "Write the fraction: '3 out of 5 equal parts'.",
    inputType: "fraction",
    correctAnswer: { numerator: 3, denominator: 5 },
    feedback: {
      correct: "Exactly! '3 out of 5' means 3 on top and 5 on the bottom.",
      incorrect: "Parts you HAVE go on top. TOTAL equal parts go on the bottom. 3/5.",
    },
  },
  {
    id: "R3",
    stem: "What fraction of the circle is shaded?",
    visualization: { model: "circle", denominator: 8, shadedParts: [0, 1, 2, 3, 4] },
    inputType: "fraction",
    correctAnswer: { numerator: 5, denominator: 8 },
    feedback: {
      correct: "That's 5/8! Five out of eight sectors are shaded.",
      incorrect: "8 sectors total, 5 are shaded -- the fraction is 5/8.",
    },
  },
  /* Layer 1 — Procedure */
  {
    id: "P1",
    stem: "Find a fraction equivalent to 2/3 with denominator 9.",
    visualization: { model: "bar", denominator: 3, shadedParts: [0, 1] },
    inputType: "fraction",
    correctAnswer: { numerator: 6, denominator: 9 },
    hints: ["What do you multiply 3 by to get 9?", "3 * 3 = 9. Do the same to the top.", "2 * 3 = 6. Answer: 6/9."],
    feedback: {
      correct: "6/9 is correct! You multiplied both by 3.",
      incorrect: "3 to 9 means multiply by 3. 2 * 3 = 6. Answer: 6/9.",
    },
  },
  {
    id: "P2",
    stem: "Simplify 6/8 to its simplest form.",
    visualization: { model: "bar", denominator: 8, shadedParts: [0, 1, 2, 3, 4, 5] },
    inputType: "fraction",
    correctAnswer: { numerator: 3, denominator: 4 },
    hints: ["What number divides both 6 and 8?", "2 divides both! 6/2 = 3, 8/2 = 4."],
    feedback: {
      correct: "3/4 is correct! Dividing both by 2 gives the simplest form.",
      incorrect: "Divide both by 2: 6/2 = 3, 8/2 = 4. Simplest form: 3/4.",
    },
  },
  {
    id: "P3",
    stem: "Which is bigger: 2/5 or 3/7?",
    visualization: {
      model: "comparison",
      denominator: 5,
      shadedParts: [0, 1],
      fractionB: { numerator: 3, denominator: 7 },
    },
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "2/5 is bigger", correct: false },
      { id: "b", text: "3/7 is bigger", correct: true },
      { id: "c", text: "They are equal", correct: false },
    ],
    feedback: {
      correct: "Right! 3/7 (about 0.43) is slightly bigger than 2/5 (0.4).",
      incorrect: "3/7 extends a tiny bit further than 2/5. 3/7 > 2/5.",
    },
  },
  /* Layer 2 — Understanding */
  {
    id: "U1",
    stem: "Your friend says '1/3 is bigger than 1/2 because 3 > 2.' Why are they wrong?",
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "Because 1/3 and 1/2 are actually equal", correct: false },
      { id: "b", text: "Because a bigger denominator means smaller pieces, so 1/2 > 1/3", correct: true },
      { id: "c", text: "Because you should compare the numerators, not the denominators", correct: false },
    ],
    feedback: {
      correct: "Exactly! More pieces means each piece is smaller, so 1/2 > 1/3.",
      incorrect: "Cutting into more pieces makes each piece smaller, so 1/2 > 1/3.",
    },
  },
  {
    id: "U2",
    stem: "Name a fraction equivalent to 2/3. (Multiply top and bottom by the same number.)",
    inputType: "fraction",
    correctAnswer: { numerator: 4, denominator: 6 },
    acceptedEquivalents: [
      { numerator: 6, denominator: 9 },
      { numerator: 8, denominator: 12 },
      { numerator: 10, denominator: 15 },
    ],
    feedback: {
      correct: "Correct! That's equivalent to 2/3.",
      incorrect: "For example: 2*2 = 4, 3*2 = 6, so 4/6 works.",
    },
  },
  {
    id: "U3",
    stem: "Without bars, which is bigger: 5/8 or 7/12?",
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "5/8 is bigger", correct: true },
      { id: "b", text: "7/12 is bigger", correct: false },
      { id: "c", text: "They are equal", correct: false },
    ],
    feedback: {
      correct: "Yes! 5/8 = 0.625 and 7/12 is about 0.583.",
      incorrect: "5/8 = 15/24 and 7/12 = 14/24. Since 15 > 14, 5/8 is bigger.",
    },
  },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [pi, setPi] = useState(0);
  const [frac, setFrac] = useState<Fraction>({ numerator: 0, denominator: 0 });
  const [choice, setChoice] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ok, setOk] = useState(false);
  const [hintIdx, setHintIdx] = useState(-1);
  const [results, setResults] = useState<boolean[]>([]);

  const prob = PROBLEMS[pi]!;
  const last = pi === PROBLEMS.length - 1;

  const check = (): boolean => {
    if (prob.inputType === "fraction" && prob.correctAnswer) {
      const f: Fraction = { numerator: frac.numerator, denominator: frac.denominator };
      if (fractionsEqual(f, prob.correctAnswer)) return true;
      return (prob.acceptedEquivalents ?? []).some((eq) => fractionsEqual(f, eq));
    }
    if (prob.inputType === "multiple-choice" && prob.options) {
      return prob.options.find((o) => o.id === choice)?.correct ?? false;
    }
    if (prob.inputType === "free-text") return text.trim().length >= 20;
    return false;
  };

  const handleSubmit = () => {
    const c = check();
    setOk(c);
    setSubmitted(true);
    setResults([...results, c]);
  };

  const handleNext = () => {
    if (last) { onComplete(); return; }
    setPi(pi + 1);
    setFrac({ numerator: 0, denominator: 0 });
    setChoice(null);
    setText("");
    setSubmitted(false);
    setOk(false);
    setHintIdx(-1);
  };

  const canSubmit =
    !submitted &&
    ((prob.inputType === "fraction" && frac.numerator > 0 && frac.denominator > 0) ||
      (prob.inputType === "multiple-choice" && choice !== null) ||
      (prob.inputType === "free-text" && text.trim().length >= 10));

  const viz = useMemo((): ReactNode => {
    const v = prob.visualization;
    if (!v) return null;
    if (v.model === "bar") {
      return <FractionBar denominator={v.denominator} shadedParts={new Set(v.shadedParts)} width={240} height={44} interactive={false} />;
    }
    if (v.model === "circle") {
      return <FractionCircle denominator={v.denominator} shadedSectors={new Set(v.shadedParts)} radius={70} interactive={false} />;
    }
    if (v.model === "comparison" && v.fractionB) {
      return (
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-2">
            <FractionBar denominator={v.denominator} shadedParts={new Set(v.shadedParts)} width={200} height={36} interactive={false} showLabel={false} />
            <span className="text-xs font-bold" style={{ color: TEXT }}>{v.shadedParts.length}/{v.denominator}</span>
          </div>
          <div className="flex items-center gap-2">
            <FractionBar
              denominator={v.fractionB.denominator}
              shadedParts={rangeSet(v.fractionB.numerator)}
              width={200}
              height={36}
              interactive={false}
              showLabel={false}
              shadedColor={CYAN}
            />
            <span className="text-xs font-bold" style={{ color: TEXT }}>{v.fractionB.numerator}/{v.fractionB.denominator}</span>
          </div>
        </div>
      );
    }
    return null;
  }, [prob.visualization]);

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>Practice</h2>

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {PROBLEMS.map((_, i) => {
          let dotColor: string = UNSHADED;
          if (i < results.length) {
            dotColor = results[i] ? CORRECT : THEME.incorrect;
          } else if (i === pi) {
            dotColor = SHADED;
          }
          return (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: dotColor }}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pi}
          className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4"
          style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={SPRING_GENTLE}
        >
          <p className="text-base leading-relaxed" style={{ color: TEXT }}>{prob.stem}</p>

          {viz && <div className="flex justify-center py-2">{viz}</div>}

          {/* Fraction input */}
          {prob.inputType === "fraction" && (
            <div className="flex justify-center">
              <FractionInput value={frac} onChange={setFrac} disabled={submitted} />
            </div>
          )}

          {/* Multiple choice */}
          {prob.inputType === "multiple-choice" && prob.options && (
            <div className="flex flex-col gap-2">
              {prob.options.map((o) => {
                let optBg: string = "transparent";
                if (submitted && o.correct) {
                  optBg = `${CORRECT}22`;
                } else if (submitted && choice === o.id && !o.correct) {
                  optBg = `${THEME.incorrect}22`;
                } else if (choice === o.id) {
                  optBg = `${SHADED}22`;
                }
                return (
                  <button
                    key={o.id}
                    className="text-left px-4 py-3 rounded-lg text-sm border transition-colors"
                    style={{
                      minHeight: 44,
                      background: optBg,
                      borderColor: choice === o.id ? SHADED : UNSHADED,
                      color: TEXT,
                      cursor: submitted ? "default" : "pointer",
                    }}
                    onClick={() => !submitted && setChoice(o.id)}
                    disabled={submitted}
                  >
                    {o.text}
                  </button>
                );
              })}
            </div>
          )}

          {/* Free text */}
          {prob.inputType === "free-text" && (
            <textarea
              className="w-full p-3 rounded-lg text-sm resize-none focus:outline-none bg-nm-bg-primary"
              style={{ minHeight: 80, border: `1px solid ${BORDER}`, color: TEXT }}
              placeholder="Write your explanation..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={submitted}
            />
          )}

          {/* Hints */}
          {prob.hints && !submitted && hintIdx >= 0 &&
            prob.hints.slice(0, hintIdx + 1).map((h, i) => (
              <motion.div
                key={i}
                className="text-sm rounded-lg p-3"
                style={{ background: "#1e1b4b", borderLeft: `3px solid ${SHADED}`, color: "#c7d2fe" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {h}
              </motion.div>
            ))}

          {prob.hints && !submitted && hintIdx < (prob.hints?.length ?? 0) - 1 && (
            <button
              className="text-xs underline self-start"
              style={{ minHeight: 44, color: TEXT_SEC }}
              onClick={() => setHintIdx(hintIdx + 1)}
            >
              {hintIdx < 0 ? "Need a hint?" : "Another hint"}
            </button>
          )}

          {/* Feedback */}
          {submitted && (
            <motion.div
              className="rounded-lg p-3 text-sm leading-relaxed"
              style={{ background: `${BG}cc`, borderLeft: `3px solid ${ok ? CORRECT : THEME.incorrect}`, color: TEXT }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {ok ? prob.feedback.correct : prob.feedback.incorrect}
            </motion.div>
          )}

          <div className="flex justify-center pt-2">
            {!submitted ? (
              <ContinueButton onClick={handleSubmit} disabled={!canSubmit}>Submit</ContinueButton>
            ) : (
              <ContinueButton onClick={handleNext}>
                {last ? "Continue to Reflection" : "Next Problem"}
              </ContinueButton>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  Stage 7 — Reflection                                               */
/* ================================================================== */

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const min = 50;

  const handleSubmit = () => {
    if (text.trim().length < min) return;
    const lo = text.toLowerCase();
    let s = 1;
    if (/parts?|piece|whole/.test(lo)) s++;
    if (/numerator|denominator|top|bottom/.test(lo)) s++;
    if (/bigger|smaller|more pieces|inverse|less/.test(lo)) s++;
    if (/bar|circle|pizza|visual/.test(lo)) s++;
    setScore(Math.min(s, 5));
    setSubmitted(true);
  };

  const feedback =
    score >= 4
      ? "Excellent explanation! You clearly understand fractions and why the denominator matters."
      : score >= 3
        ? "Good understanding! You captured the core idea. Try also explaining why bigger denominator means smaller pieces."
        : score >= 2
          ? "Nice start! Explain more about what the numerator and denominator represent."
          : "Keep exploring! Think about what happens when you cut a pizza into more slices.";

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>Reflection</h2>

      <div className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4" style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}>
        <p className="text-base font-medium leading-relaxed" style={{ color: TEXT }}>
          Explain what a fraction really means and why the denominator matters.
        </p>

        <textarea
          className="w-full p-3 rounded-lg text-sm resize-y focus:outline-none bg-nm-bg-primary"
          style={{
            minHeight: 120,
            border: `1px solid ${submitted ? SHADED : BORDER}`,
            color: TEXT,
          }}
          placeholder="Write your explanation here... What does the top number mean? The bottom number? Why does a bigger bottom number mean smaller pieces?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
        />

        <p className="text-xs text-right tabular-nums" style={{ color: text.length >= min ? CORRECT : TEXT_SEC }}>
          {text.length}/{min} minimum
        </p>

        {!submitted ? (
          <ContinueButton onClick={handleSubmit} disabled={text.trim().length < min}>
            Submit Reflection
          </ContinueButton>
        ) : (
          <motion.div className="flex flex-col gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stars */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <motion.svg
                  key={i}
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={i < score ? THEME.denomHL : UNSHADED}
                    stroke={i < score ? THEME.denomHL : BORDER}
                    strokeWidth={1}
                  />
                </motion.svg>
              ))}
            </div>

            <div
              className="rounded-lg p-3 text-sm leading-relaxed"
              style={{ background: `${BG}cc`, borderLeft: `3px solid ${CORRECT}`, color: TEXT }}
            >
              {feedback}
            </div>

            <motion.p
              className="text-center text-lg font-bold"
              style={{ color: THEME.denomHL }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SPRING }}
            >
              +{score * 16} XP
            </motion.p>

            <ContinueButton onClick={onComplete}>Complete Lesson</ContinueButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main export                                                        */
/* ================================================================== */

export function FractionsLesson({ onComplete }: FractionsLessonProps) {
  return (
    <LessonShell title="NO-2.1 Fractions" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook":       return <HookStage onComplete={advance} />;
          case "spatial":    return <SpatialStage onComplete={advance} />;
          case "discovery":  return <DiscoveryStage onComplete={advance} />;
          case "symbol":     return <SymbolStage onComplete={advance} />;
          case "realWorld":  return <RealWorldStage onComplete={advance} />;
          case "practice":   return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={advance} />;
          default:           return null;
        }
      }}
    </LessonShell>
  );
}
