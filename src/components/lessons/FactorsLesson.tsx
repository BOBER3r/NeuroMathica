"use client";

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
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */

interface FactorsLessonProps {
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

interface DotPos {
  x: number;
  y: number;
  id: number;
}

interface FactorPair {
  a: number;
  b: number;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPRING CONFIGS  (per NT-2.1 spec)
   ═══════════════════════════════════════════════════════════════════════════ */

const SNAP_SPRING   = { type: "spring" as const, damping: 25, stiffness: 400 };
const GENTLE_SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const BOUNCY_SPRING = { type: "spring" as const, damping: 15, stiffness: 350 };
const _QUICK_SPRING  = { type: "spring" as const, damping: 30, stiffness: 500, mass: 0.8 };

/* ═══════════════════════════════════════════════════════════════════════════
   COLORS  (per NT-2.1 colour palette)
   ═══════════════════════════════════════════════════════════════════════════ */

const C = {
  dotPrimary:   "#818cf8",
  dotStroke:    "#6366f1",
  valid:        "#34d399",
  invalid:      "#fb7185",
  highlight:    "#fbbf24",
  textPrimary:  "#f1f5f9",
  textSecondary:"#e2e8f0",
  textMuted:    "#94a3b8",
  textDim:      "#64748b",
  surface:      "#1e293b",
  surfaceDeep:  "#0f172a",
  border:       "#334155",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   MATH UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

function getFactorPairs(n: number): FactorPair[] {
  const pairs: FactorPair[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) pairs.push({ a: i, b: n / i });
  }
  return pairs;
}

/** Precomputed factor-pair map for 1..36. */
const FP_MAP = new Map<number, FactorPair[]>();
for (let n = 1; n <= 36; n++) FP_MAP.set(n, getFactorPairs(n));

/* ═══════════════════════════════════════════════════════════════════════════
   DOT LAYOUT
   ═══════════════════════════════════════════════════════════════════════════ */

function gridPositions(
  n: number,
  rows: number,
  cols: number,
  cx: number,
  cy: number,
  sp: number,
): DotPos[] {
  const positions: DotPos[] = [];
  const ox = ((cols - 1) * sp) / 2;
  const oy = ((rows - 1) * sp) / 2;
  let id = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (id >= n) break;
      positions.push({ x: cx - ox + c * sp, y: cy - oy + r * sp, id });
      id++;
    }
  }
  return positions;
}

function clusterPositions(n: number, cx: number, cy: number, seed = 42): DotPos[] {
  let s = seed;
  const rng = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s / 0x7fffffff) * 2 - 1; };
  return Array.from({ length: n }, (_, id) => ({
    x: cx + rng() * 60,
    y: cy + rng() * 50,
    id,
  }));
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Motion-animated SVG dot. */
function Dot({
  cx, cy, r = 10, fill = C.dotPrimary, stroke = C.dotStroke,
  opacity = 1, pulsing = false, glowing = false,
}: {
  cx: number; cy: number; r?: number;
  fill?: string; stroke?: string; opacity?: number;
  pulsing?: boolean; glowing?: boolean;
}) {
  return (
    <motion.circle
      cx={cx ?? 0}
      cy={cy ?? 0}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.5}
      style={{ filter: "drop-shadow(0 1px 2px rgba(129,140,248,0.3))" }}
      initial={{ opacity: 0 }}
      animate={{
        cx, cy, opacity, fill,
        scale: pulsing ? [1, 1.08, 1] : 1,
        filter: glowing
          ? "drop-shadow(0 0 8px rgba(129,140,248,0.6)) brightness(1.4)"
          : "drop-shadow(0 1px 2px rgba(129,140,248,0.3))",
      }}
      transition={{
        ...SNAP_SPRING,
        fill: { duration: 0.3 },
        filter: { duration: 0.3 },
        scale: pulsing ? { duration: 0.15 } : undefined,
      }}
    />
  );
}

/** A pill badge for one factor pair. */
function PairBadge({ pair, found, flash = false }: { pair: FactorPair | null; found: boolean; flash?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0, scale: flash ? [1, 1.05, 1] : 1 }}
      transition={GENTLE_SPRING}
      className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold min-h-[44px] min-w-[44px] select-none"
      style={{
        border: `2px solid ${found ? C.valid : C.border}`,
        backgroundColor: found ? C.surface : "transparent",
        color: found ? C.valid : C.textDim,
      }}
    >
      {found && pair ? `${pair.a} \u00d7 ${pair.b}` : "? \u00d7 ?"}
    </motion.span>
  );
}

/** Floating "+N XP" text. */
function XpFloat({ amount }: { amount: number }) {
  return (
    <motion.span
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 text-xs font-bold"
      style={{ color: C.highlight }}
    >
      +{amount} XP
    </motion.span>
  );
}

/** Standard bottom-action CTA button (44px+ touch target). */
function CTAButton({
  label, onClick, disabled = false, ariaLabel,
}: {
  label: string; onClick: () => void; disabled?: boolean; ariaLabel?: string;
}) {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={disabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "w-full rounded-xl px-6 py-3 text-lg font-semibold text-white transition-all duration-150",
          "min-h-[44px] min-w-[44px] select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        )}
        style={{ backgroundColor: C.dotPrimary }}
      >
        {label}
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK
   12 dots cluster → 3×4 → 2×6 → 1×12 → 4×3 (flipped!) → "What about 7?"
   → 7 tries 2×3+1 → 1×7 → "7 is special..."
   ═══════════════════════════════════════════════════════════════════════════ */

type HookPhase =
  | "cluster" | "3x4" | "lbl-3x4"
  | "2x6"    | "lbl-2x6"
  | "1x12"   | "lbl-1x12"
  | "4x3"    | "lbl-4x3" | "thought"
  | "question"
  | "7-cluster" | "7-try" | "7-1x7" | "7-rev" | "ready";

const HOOK_SEQ: { phase: HookPhase; ms: number }[] = [
  { phase: "3x4",      ms: 1400 },
  { phase: "lbl-3x4",  ms: 400  },
  { phase: "2x6",      ms: 1400 },
  { phase: "lbl-2x6",  ms: 400  },
  { phase: "1x12",     ms: 1400 },
  { phase: "lbl-1x12", ms: 400  },
  { phase: "4x3",      ms: 1400 },
  { phase: "lbl-4x3",  ms: 400  },
  { phase: "thought",   ms: 800  },
  { phase: "question",  ms: 1800 },
  { phase: "7-cluster", ms: 2400 },
  { phase: "7-try",     ms: 600  },
  { phase: "7-1x7",     ms: 1500 },
  { phase: "7-rev",     ms: 1200 },
  { phase: "ready",     ms: 1600 },
];

function HookStage({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<HookPhase>("cluster");
  const [pulse, setPulse] = useState(false);
  const tRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const CX = 200;
  const CY = 160;
  const SP = 36;

  /* ── timeline ── */
  useEffect(() => {
    const seqIdx = HOOK_SEQ.findIndex((s) => s.phase === phase);
    if (seqIdx < 0) {
      // Find the *next* transition
      const nextIdx = HOOK_SEQ.findIndex((s) => {
        const phIdx = HOOK_SEQ.findIndex((h) => h.phase === phase);
        return phIdx < 0; // cluster -> first entry
      });
      if (phase === "cluster") {
        tRef.current = setTimeout(() => setPhase("3x4"), 1400);
      }
    } else {
      const next = HOOK_SEQ[seqIdx + 1];
      if (next) tRef.current = setTimeout(() => setPhase(next.phase), HOOK_SEQ[seqIdx]!.ms);
    }
    // pulse on grid arrivals
    if (["3x4","2x6","1x12","4x3"].includes(phase)) {
      setPulse(true);
      setTimeout(() => setPulse(false), 200);
    }
    return () => { if (tRef.current) clearTimeout(tRef.current); };
  }, [phase]);

  // Kick off the first transition separately since "cluster" isn't in HOOK_SEQ
  useEffect(() => {
    if (phase === "cluster") {
      tRef.current = setTimeout(() => setPhase("3x4"), 1400);
    }
    return () => { if (tRef.current) clearTimeout(tRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Failsafe: guarantee Continue button within 4s
  useEffect(() => {
    const failsafe = setTimeout(() => setPhase("ready"), 4000);
    return () => clearTimeout(failsafe);
  }, []);

  /* ── dot positions per phase ── */
  const is7 = phase.startsWith("7") || phase === "ready";
  const dotCount = phase === "question" ? 0 : is7 ? 7 : 12;

  const positions: DotPos[] = useMemo(() => {
    switch (phase) {
      case "cluster":           return clusterPositions(12, CX, CY);
      case "3x4": case "lbl-3x4": return gridPositions(12, 3, 4, CX, CY, SP);
      case "2x6": case "lbl-2x6": return gridPositions(12, 2, 6, CX, CY, SP);
      case "1x12": case "lbl-1x12": return gridPositions(12, 1, 12, CX, CY, 28);
      case "4x3": case "lbl-4x3": case "thought":
        return gridPositions(12, 4, 3, CX, CY, SP);
      case "question":          return [];
      case "7-cluster":         return clusterPositions(7, CX, CY, 77);
      case "7-try": {
        const g = gridPositions(6, 2, 3, CX, CY, SP);
        g.push({ x: CX + 3 * SP, y: CY + 10, id: 6 });
        return g;
      }
      case "7-1x7": case "7-rev": case "ready":
        return gridPositions(7, 1, 7, CX, CY, SP);
      default: return [];
    }
  }, [phase]);

  /* ── label ── */
  const label: string | null = (() => {
    if (phase === "lbl-3x4") return "12 = 3 \u00d7 4";
    if (phase === "lbl-2x6") return "12 = 2 \u00d7 6";
    if (phase === "lbl-1x12") return "12 = 1 \u00d7 12";
    if (phase === "lbl-4x3" || phase === "thought") return "12 = 4 \u00d7 3";
    if (phase === "7-1x7") return "7 = 1 \u00d7 7";
    return null;
  })();

  const remainderDot = phase === "7-try";

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4">
      {/* a11y live region */}
      <div className="sr-only" aria-live="polite">
        {label}
        {phase === "7-rev" && "7 is special. It has only one rectangle: 1 times 7."}
      </div>

      <svg
        viewBox="0 0 400 320"
        className="w-full max-w-lg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${dotCount} dots in the hook animation`}
      >
        {/* dots */}
        {positions.map((p, i) => {
          const isRemainder = remainderDot && i === 6;
          return (
            <Dot
              key={`h-${p.id}`}
              cx={p.x}
              cy={p.y}
              r={10}
              fill={isRemainder ? C.invalid : C.dotPrimary}
              stroke={isRemainder ? C.invalid : C.dotStroke}
              opacity={isRemainder ? 0.75 : 1}
              pulsing={pulse && !isRemainder}
            />
          );
        })}

        {/* "Doesn't fit..." */}
        {remainderDot && (
          <motion.text
            x={CX + 3 * SP + 22} y={CY + 28}
            fill={C.invalid} fontSize={13} fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            Doesn&apos;t fit...
          </motion.text>
        )}

        {/* label beneath the grid */}
        <AnimatePresence>
          {label && (
            <motion.text
              key={label}
              x={CX} y={CY + 80}
              textAnchor="middle" fill={C.textSecondary} fontSize={20}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.text>
          )}
        </AnimatePresence>

        {/* thought bubble: "Wait... that's just 3x4 flipped!" */}
        <AnimatePresence>
          {phase === "thought" && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <rect x={CX + 36} y={CY - 82} width={168} height={36} rx={8}
                fill={C.surface} opacity={0.85} />
              <text x={CX + 120} y={CY - 59} textAnchor="middle"
                fill={C.highlight} fontSize={14} fontStyle="italic">
                {"Wait... that's just 3\u00d74 flipped!"}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* transition questions */}
        {phase === "question" && (
          <motion.g>
            <motion.text x={CX} y={CY - 12} textAnchor="middle"
              fill={C.textPrimary} fontSize={19} fontWeight={600}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              How many rectangles can you
            </motion.text>
            <motion.text x={CX} y={CY + 12} textAnchor="middle"
              fill={C.textPrimary} fontSize={19} fontWeight={600}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              make with 12 dots?
            </motion.text>
            <motion.text x={CX} y={CY + 50} textAnchor="middle"
              fill={C.highlight} fontSize={19} fontWeight={600}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}>
              What about 7 dots?
            </motion.text>
          </motion.g>
        )}

        {/* "Only ONE rectangle..." */}
        {phase === "7-1x7" && (
          <motion.text x={CX} y={CY + 42} textAnchor="middle"
            fill={C.textMuted} fontSize={16}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Only ONE rectangle...
          </motion.text>
        )}

        {/* "7 is special..." revelation */}
        {(phase === "7-rev" || phase === "ready") && (
          <motion.text x={CX} y={CY + 50} textAnchor="middle"
            fill={C.highlight} fontSize={24} fontWeight={700}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}>
            7 is special...
          </motion.text>
        )}
      </svg>

      {/* continue */}
      {phase === "ready" && (
        <CTAButton
          label="Let's explore"
          onClick={onComplete}
          ariaLabel="Continue to interactive exploration"
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE  "Rectangle Factory"
   Number selector (2-36, locked during challenges), dot grid, +/- row/col
   controls, factor pair discovery list, celebration.
   ═══════════════════════════════════════════════════════════════════════════ */

type Challenge = "n12" | "n24" | "n7" | "free";

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [challenge, setChallenge] = useState<Challenge>("n12");
  const [n, setN] = useState(12);
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(12);
  const [found, setFound] = useState<Map<number, Set<string>>>(() => new Map());
  const [interactions, setInteractions] = useState(0);
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [xpVisible, setXpVisible] = useState(false);
  const [primeReveal, setPrimeReveal] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [alreadyMsg, setAlreadyMsg] = useState(false);
  const [instruction, setInstruction] = useState("Find ALL the factor pairs for 12!");
  const hintTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const allPairs  = useMemo(() => FP_MAP.get(n) ?? [], [n]);
  const foundSet  = useMemo(() => found.get(n) ?? new Set<string>(), [found, n]);
  const isValid   = rows * cols === n;
  const remainder = n - rows * cols;
  const allFound  = foundSet.size >= allPairs.length;

  const CX = 200;
  const CY = 180;
  const sp = Math.min(36, 300 / Math.max(rows, cols, 1));

  const dots = useMemo(
    () => gridPositions(Math.min(rows * cols, n), rows, cols, CX, CY, sp),
    [n, rows, cols, sp],
  );

  /* ── discover a pair ── */
  const discover = useCallback((r: number, c: number) => {
    const a = Math.min(r, c);
    const b = Math.max(r, c);
    const key = `${a}x${b}`;
    setFound((prev) => {
      const next = new Map(prev);
      const s = new Set(prev.get(n) ?? []);
      if (s.has(key)) {
        setAlreadyMsg(true);
        setTimeout(() => setAlreadyMsg(false), 1000);
        return prev;
      }
      s.add(key);
      next.set(n, s);
      setLastKey(key);
      setXpVisible(true);
      setTimeout(() => { setLastKey(null); setXpVisible(false); }, 800);
      return next;
    });
    setInteractions((i) => i + 1);
  }, [n]);

  /* ── challenge progression ── */
  useEffect(() => {
    const s = found.get(n);
    const total = (FP_MAP.get(n) ?? []).length;
    if (!s || s.size < total) return;
    setCelebrating(true);
    const t = setTimeout(() => {
      setCelebrating(false);
      if (challenge === "n12") {
        setChallenge("n24"); setN(24); setRows(1); setCols(24);
        setInstruction("24 has even MORE factor pairs. Find them all!");
        setInvalidAttempts(0);
      } else if (challenge === "n24") {
        setChallenge("n7"); setN(7); setRows(1); setCols(7);
        setInstruction("Now try 7. How many rectangles can you make?");
        setInvalidAttempts(0);
      } else if (challenge === "n7") {
        setChallenge("free");
        setInstruction("Explore any number! Which have the MOST factor pairs?");
      }
    }, 1800);
    return () => clearTimeout(t);
  }, [found, n, challenge]);

  /* ── prime reveal for 7 ── */
  useEffect(() => {
    if (challenge !== "n7" || n !== 7) return;
    const s = found.get(7);
    if (s?.has("1x7") && invalidAttempts >= 2) setPrimeReveal(true);
  }, [challenge, n, found, invalidAttempts]);

  /* ── row / col controls ── */
  const adjust = useCallback((dim: "row" | "col", delta: number) => {
    const newVal = dim === "row" ? rows + delta : cols + delta;
    if (newVal < 1 || newVal > n) return;
    const other = Math.floor(n / newVal);
    const valid = newVal * other === n;
    if (dim === "row") { setRows(newVal); setCols(valid ? other : Math.floor(n / newVal)); }
    else               { setCols(newVal); setRows(valid ? other : Math.floor(n / newVal)); }
    if (valid) discover(dim === "row" ? newVal : other, dim === "row" ? other : newVal);
    else { setInvalidAttempts((c) => c + 1); setInteractions((i) => i + 1); }
  }, [rows, cols, n, discover]);

  /* ── number selector for free mode ── */
  const changeN = useCallback((d: number) => {
    if (challenge !== "free") return;
    const next = n + d;
    if (next < 2 || next > 36) return;
    setN(next); setRows(1); setCols(next); setInvalidAttempts(0);
  }, [challenge, n]);

  /* ── seed initial 1×N on number change ── */
  useEffect(() => { discover(1, n); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [n]);

  /* ── hint timer ── */
  useEffect(() => {
    if (hintTimer.current) clearTimeout(hintTimer.current);
    if (allFound || challenge === "free") return;
    hintTimer.current = setTimeout(() => {
      if (challenge === "n12") setInstruction("Hint: try making 2 rows...");
      else if (challenge === "n24") setInstruction("Hint: 24 can make wider rectangles...");
    }, 30_000);
    return () => { if (hintTimer.current) clearTimeout(hintTimer.current); };
  }, [challenge, allFound]);

  const locked = challenge !== "free";
  const canContinue = challenge === "free" && interactions >= 8;

  /* ── stepper button ── */
  const StepBtn = ({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-lg text-lg font-bold transition-colors",
        disabled ? "text-slate-700 cursor-not-allowed opacity-50" : "text-slate-300 hover:bg-slate-800",
      )}
    >
      {label.includes("Decrease") || label.includes("Previous") ? "\u2212" : "+"}
    </button>
  );

  return (
    <div className="relative flex flex-1 flex-col px-4">
      {/* number selector */}
      <div className="flex items-center justify-center gap-4 py-3">
        <button onClick={() => changeN(-1)}
          disabled={locked || n <= 2}
          className={cn("flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold transition-colors",
            locked || n <= 2 ? "text-slate-700 cursor-not-allowed opacity-50" : "text-slate-400 hover:text-indigo-400")}
          aria-label="Previous number">
          &#8249;
        </button>
        <div className="relative">
          <span className="text-3xl font-bold tabular-nums" style={{ color: C.textPrimary }}>{n}</span>
          {locked && (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth={2}
              className="absolute -right-5 top-1/2 -translate-y-1/2" aria-hidden="true">
              <rect x={3} y={11} width={18} height={11} rx={2}/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          )}
          {primeReveal && (
            <motion.span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold"
              style={{ color: C.highlight }}
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={BOUNCY_SPRING}>
              PRIME!
            </motion.span>
          )}
        </div>
        <button onClick={() => changeN(1)}
          disabled={locked || n >= 36}
          className={cn("flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold transition-colors",
            locked || n >= 36 ? "text-slate-700 cursor-not-allowed opacity-50" : "text-slate-400 hover:text-indigo-400")}
          aria-label="Next number">
          &#8250;
        </button>
      </div>

      {/* instruction */}
      <motion.p key={instruction} className="mb-2 text-center text-sm"
        style={{ color: C.textMuted }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {instruction}
      </motion.p>

      {/* SVG dot grid */}
      <div className="relative flex flex-1 items-center justify-center w-full"
        role="application"
        aria-label={`Rectangle Factory: ${n} dots as ${rows} by ${cols}`}>
        <svg viewBox="0 0 400 360" className="w-full max-w-lg" preserveAspectRatio="xMidYMid meet">
          {/* valid rectangle outline */}
          {isValid && dots.length > 1 && (() => {
            const d0 = dots[0];
            if (!d0) return null;
            return (
              <motion.rect
                x={d0.x - sp / 2} y={d0.y - sp / 2}
                width={(cols - 1) * sp + sp} height={(rows - 1) * sp + sp}
                rx={6} fill="none" stroke={C.valid} strokeWidth={1.5} strokeDasharray="6 3"
                initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
              />
            );
          })()}

          {/* main dots */}
          {dots.map((p) => (
            <Dot key={`s-${p.id}`} cx={p.x} cy={p.y} r={Math.min(10, sp / 3)} />
          ))}

          {/* remainder dots */}
          {remainder > 0 && Array.from({ length: remainder }, (_, i) => {
            const last = dots[dots.length - 1];
            return (
              <Dot key={`rem-${i}`}
                cx={(last?.x ?? CX) + sp * (i + 1)} cy={last?.y ?? CY}
                r={Math.min(10, sp / 3)} fill={C.invalid} stroke={C.invalid} opacity={0.75} />
            );
          })}

          {/* invalid tooltip */}
          {remainder > 0 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <rect x={CX + 40} y={CY - 62} width={190} height={28} rx={6}
                fill={C.surface} opacity={0.85}/>
              <text x={CX + 135} y={CY - 44} textAnchor="middle" fill={C.invalid} fontSize={13}>
                Doesn&apos;t divide evenly!
              </text>
            </motion.g>
          )}

          {/* dimension labels */}
          {isValid && dots[0] && (
            <>
              <text x={dots[0].x - sp} y={CY} textAnchor="middle" fill={C.textMuted} fontSize={14}>{rows}</text>
              <text x={CX} y={dots[0].y - sp * 0.7} textAnchor="middle" fill={C.textMuted} fontSize={14}>{cols}</text>
            </>
          )}

          {/* "already found" */}
          {alreadyMsg && (
            <motion.text x={CX} y={CY + 80} textAnchor="middle" fill={C.textMuted} fontSize={13}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              You already found this one!
            </motion.text>
          )}

          {/* perfect square */}
          {isValid && rows === cols && rows > 1 && (
            <motion.text x={CX} y={CY + 90} textAnchor="middle" fill={C.valid} fontSize={14}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              A perfect square!
            </motion.text>
          )}

          {/* celebration */}
          {celebrating && (
            <motion.text x={CX} y={40} textAnchor="middle" fill={C.valid} fontSize={18} fontWeight={700}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={BOUNCY_SPRING}>
              All factor pairs found!
            </motion.text>
          )}
        </svg>

        {xpVisible && <XpFloat amount={5} />}
      </div>

      {/* row / col controls */}
      <div className="flex items-center justify-center gap-6 py-2">
        {(["Rows", "Cols"] as const).map((dimLabel) => {
          const isRow = dimLabel === "Rows";
          const val = isRow ? rows : cols;
          return (
            <div key={dimLabel} className="flex items-center gap-2">
              <span className="text-xs" style={{ color: C.textMuted }}>{dimLabel}:</span>
              <StepBtn label={`Decrease ${dimLabel.toLowerCase()}`} disabled={val <= 1}
                onClick={() => adjust(isRow ? "row" : "col", -1)} />
              <span className="w-8 text-center text-lg font-bold tabular-nums"
                style={{ color: C.textPrimary }}>{val}</span>
              <StepBtn label={`Increase ${dimLabel.toLowerCase()}`} disabled={val >= n}
                onClick={() => adjust(isRow ? "row" : "col", 1)} />
            </div>
          );
        })}
      </div>

      {/* factor pair list */}
      <div className="mb-4">
        <p className="mb-2 text-center text-sm font-medium" style={{ color: C.textMuted }}>
          Factor Pairs Found: {foundSet.size}/{allPairs.length}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2" role="list">
          {allPairs.map((pair) => {
            const key = `${pair.a}x${pair.b}`;
            return (
              <div key={key} role="listitem">
                <PairBadge pair={pair} found={foundSet.has(key)} flash={lastKey === key} />
              </div>
            );
          })}
        </div>
      </div>

      {/* prime reveal banner */}
      <AnimatePresence>
        {primeReveal && challenge === "n7" && (
          <motion.div className="mb-4 rounded-2xl p-4 text-center"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p style={{ color: C.textPrimary }}>7 has only ONE rectangle: 1{"\u00d7"}7.</p>
            <p className="mt-1">
              <span style={{ color: C.textPrimary }}>Numbers like this are called </span>
              <span className="text-lg font-bold" style={{ color: C.highlight }}>PRIME!</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <CTAButton label="Ready to learn more?" onClick={onComplete} disabled={!canContinue} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY   (5 prompts)
   ═══════════════════════════════════════════════════════════════════════════ */

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [micro, setMicro] = useState<"prime" | "not" | null>(null);

  /* visual state */
  const [dN, setDN] = useState(12);
  const [dR, setDR] = useState(3);
  const [dC, setDC] = useState(4);
  const CX = 200;
  const CY = 110;
  const sp = 28;

  const dots = useMemo(() => gridPositions(dN, dR, dC, CX, CY, sp), [dN, dR, dC]);

  /* cycle arrangements for prompt 0 */
  useEffect(() => {
    if (idx !== 0) return;
    const arrs = [{ r: 3, c: 4 }, { r: 2, c: 6 }, { r: 1, c: 12 }];
    let k = 0;
    const iv = setInterval(() => { k = (k + 1) % arrs.length; const a = arrs[k]; if (a) { setDR(a.r); setDC(a.c); } }, 1500);
    return () => clearInterval(iv);
  }, [idx]);

  useEffect(() => {
    if (idx === 0) { setDN(12); setDR(3); setDC(4); }
    if (idx === 1) { setDN(12); setDR(3); setDC(4); }
    if (idx === 2) { setDN(7);  setDR(1); setDC(7);  }
    if (idx === 3) { setDN(1);  setDR(1); setDC(1);  }
    if (idx === 4) { setDN(15); setDR(1); setDC(15); }
  }, [idx]);

  useEffect(() => {
    if (idx !== 4 || micro === null) return;
    const t = setTimeout(() => { setDR(3); setDC(5); }, 1000);
    return () => clearTimeout(t);
  }, [idx, micro]);

  const HL = (t: string) => <span className="font-semibold" style={{ color: C.dotPrimary }}>{t}</span>;

  const factorNums: number[] =
    idx <= 1 ? [1,2,3,4,6,12] : idx === 2 ? [1,7] : idx === 3 ? [1] : [1,3,5,15];

  const prompts: { body: ReactNode; hasMicro?: boolean }[] = [
    { body: <>You found all the rectangles for 12: 1{"\u00d7"}12, 2{"\u00d7"}6, 3{"\u00d7"}4. The numbers on the sides &mdash; {HL("1, 2, 3, 4, 6, 12")} &mdash; are called {HL("factors")} of 12.</> },
    { body: <>Notice they come in {HL("pairs")}: {HL("1 & 12")}, {HL("2 & 6")}, {HL("3 & 4")}. Each pair multiplies to give 12!</> },
    { body: <>Now think about 7. Just {HL("1\u00d77")}. Numbers with exactly {HL("two factors")} (1 and themselves) are called <span className="font-bold" style={{ color: C.highlight }}>prime numbers</span>.</> },
    { body: <>Is 1 prime? It only has {HL("one")} factor: just 1 (1{"\u00d7"}1=1). Primes need {HL("exactly two different factors")}. So 1 is {HL("not")} prime &mdash; it&apos;s special in its own way.</> },
    {
      body: (
        <>
          Quick: is 15 prime?
          {micro === null && " Tap to answer:"}
          {micro === "prime" && <span style={{ color: C.textMuted }}> Let&apos;s check! Any rectangles besides 1{"\u00d7"}15?</span>}
          {micro === "not" && <span style={{ color: C.valid }}> Correct! Let&apos;s see why...</span>}
          {micro !== null && (
            <> 1{"\u00d7"}15 works, but also {HL("3\u00d75")}! More than two factors, so 15 is {HL("not prime")} &mdash; it&apos;s <span className="font-bold" style={{ color: C.valid }}>composite</span>.</>
          )}
        </>
      ),
      hasMicro: true,
    },
  ];

  const allDone = idx >= prompts.length;
  const cur = prompts[idx] as typeof prompts[number] | undefined;
  const needMicro = cur?.hasMicro && micro === null;

  return (
    <div className="relative flex flex-1 flex-col px-4">
      {/* visual area */}
      <div className="flex flex-1 items-center justify-center w-full py-2">
        <svg viewBox="0 0 400 240" className="w-full max-w-lg" preserveAspectRatio="xMidYMid meet">
          {dots.map((p) => (
            <Dot key={`d-${p.id}`} cx={p.x} cy={p.y}
              r={dN <= 7 ? 12 : dN <= 15 ? 9 : 8} />
          ))}

          {/* factor circles */}
          {factorNums.map((f, i) => {
            const fx = CX - ((factorNums.length - 1) * 36) / 2 + i * 36;
            const clr = idx === 2 ? C.highlight : C.dotPrimary;
            return (
              <motion.g key={`fc-${f}`}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ ...GENTLE_SPRING, delay: i * 0.1 }}>
                <circle cx={fx} cy={220} r={16} fill={C.surface} stroke={clr} strokeWidth={2} />
                <text x={fx} y={225} textAnchor="middle" fill={clr} fontSize={14} fontWeight={700}>{f}</text>
              </motion.g>
            );
          })}

          {/* PRIME / COMPOSITE label */}
          {idx === 2 && (
            <motion.text x={CX} y={195} textAnchor="middle" fill={C.highlight}
              fontSize={20} fontWeight={700}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, ...BOUNCY_SPRING }}>
              PRIME
            </motion.text>
          )}
          {idx === 4 && micro !== null && (
            <motion.text x={CX} y={195} textAnchor="middle" fill={C.valid}
              fontSize={20} fontWeight={700}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, ...BOUNCY_SPRING }}>
              COMPOSITE
            </motion.text>
          )}
        </svg>
      </div>

      {/* prompt card */}
      <div className="mb-4">
        <AnimatePresence mode="wait">
          {!allDone && cur && (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-5"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
              aria-live="polite">
              <p className="mb-4 leading-relaxed" style={{ color: C.textSecondary, fontSize: 16 }}>
                {cur.body}
              </p>
              {needMicro && (
                <div className="mb-4 flex gap-3">
                  <button onClick={() => setMicro("prime")}
                    className="flex-1 rounded-xl py-3 text-base font-semibold min-h-[48px]"
                    style={{ backgroundColor: "rgba(251,191,36,0.1)", border: `2px solid ${C.highlight}`, color: C.highlight }}
                    aria-label="I think 15 is prime">
                    Prime
                  </button>
                  <button onClick={() => setMicro("not")}
                    className="flex-1 rounded-xl py-3 text-base font-semibold min-h-[48px]"
                    style={{ backgroundColor: "rgba(52,211,153,0.1)", border: `2px solid ${C.valid}`, color: C.valid }}
                    aria-label="I think 15 is not prime">
                    Not Prime
                  </button>
                </div>
              )}
              {!needMicro && (
                <button
                  onClick={() => { setIdx((i) => i + 1); setMicro(null); }}
                  className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px]"
                  style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${C.border}`, color: C.textPrimary }}>
                  {idx < prompts.length - 1 ? "Next" : "Got it!"}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {allDone && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-2xl p-5 text-center"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <p className="mb-4" style={{ color: C.textSecondary }}>Let&apos;s write this down properly.</p>
          <CTAButton label="Continue" onClick={onComplete} />
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE
   Factor set notation → Multiples number-line → GCF Venn diagram
   ═══════════════════════════════════════════════════════════════════════════ */

type SymPhase = "factors" | "multiples" | "gcf" | "done";

function SymbolStage({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<SymPhase>("factors");
  const [hopIdx, setHopIdx] = useState(-1);

  /* auto-advance */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "factors")    t = setTimeout(() => setPhase("multiples"), 4000);
    if (phase === "multiples")  t = setTimeout(() => setPhase("gcf"), 5500);
    if (phase === "gcf")        t = setTimeout(() => setPhase("done"), 5500);
    return () => { if (t !== undefined) clearTimeout(t); };
  }, [phase]);

  /* number-line hops */
  useEffect(() => {
    if (phase !== "multiples") return;
    setHopIdx(-1);
    let k = 0;
    const iv = setInterval(() => { k++; if (k > 6) { clearInterval(iv); return; } setHopIdx(k); }, 500);
    return () => clearInterval(iv);
  }, [phase]);

  const factors12 = [1,2,3,4,6,12];
  const commonF   = [1,2,3,6];
  const only12    = [4,12];
  const only18    = [9,18];

  const past = (p: SymPhase) => {
    const order: SymPhase[] = ["factors","multiples","gcf","done"];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  return (
    <div className="relative flex flex-1 flex-col items-center px-4 overflow-y-auto">
      <h2 className="mt-4 mb-4 text-lg font-semibold" style={{ color: C.textPrimary }}>
        Now let&apos;s add the math notation
      </h2>

      {/* ─ Factor Set ─ */}
      <motion.div className="w-full max-w-md rounded-2xl p-5 mb-4"
        style={{ backgroundColor: C.surface, border: "1px solid rgba(129,140,248,0.2)" }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={GENTLE_SPRING}
        role="math" aria-label="The factors of 12 are 1, 2, 3, 4, 6, 12">
        <p className="text-center text-lg" style={{ color: C.textSecondary }}>
          Factors of 12 = {"{ "}
          {factors12.map((f, i) => (
            <motion.span key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="font-semibold" style={{ color: C.dotPrimary }}>
              {f}{i < factors12.length - 1 ? ", " : ""}
            </motion.span>
          ))}
          {" }"}
        </p>
      </motion.div>

      {/* ─ Multiples ─ */}
      <AnimatePresence>
        {past("multiples") && (
          <motion.div className="w-full max-w-md rounded-2xl p-5 mb-4"
            style={{ backgroundColor: C.surface, border: "1px solid rgba(129,140,248,0.2)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={GENTLE_SPRING}
            role="math" aria-label="12 is a multiple of each of its factors">
            <p className="text-center mb-3" style={{ color: C.textSecondary, fontSize: 16 }}>
              12 is a <span className="font-bold" style={{ color: C.valid }}>multiple</span> of each of its factors
            </p>
            <svg viewBox="0 0 360 60" className="w-full" preserveAspectRatio="xMidYMid meet">
              <line x1={20} y1={30} x2={340} y2={30} stroke={C.border} strokeWidth={1.5} />
              {Array.from({ length: 25 }, (_, i) => {
                const x = 20 + (i / 24) * 320;
                const isMult = i > 0 && i % 3 === 0;
                return (
                  <g key={i}>
                    <line x1={x} y1={isMult ? 24 : 27} x2={x} y2={36}
                      stroke={C.textDim} strokeWidth={isMult ? 1.5 : 0.5} />
                    {isMult && <text x={x} y={50} textAnchor="middle" fill={C.textMuted} fontSize={10}>{i}</text>}
                  </g>
                );
              })}
              {[3,6,9,12,15,18].map((m, i) => (
                <motion.circle key={m}
                  cx={20 + (m / 24) * 320} cy={30} r={5}
                  fill={m === 12 ? C.dotPrimary : C.valid}
                  initial={{ opacity: 0, cy: 10 }}
                  animate={hopIdx >= i + 1 ? { opacity: 1, cy: 30 } : { opacity: 0, cy: 10 }}
                  transition={{ type: "spring", damping: 18, stiffness: 350 }}
                />
              ))}
            </svg>
            <p className="mt-2 text-center text-sm" style={{ color: C.textSecondary }}>
              Multiples of 3:{" "}
              <span style={{ color: C.valid }}>3, 6, 9, </span>
              <span className="font-bold underline" style={{ color: C.dotPrimary }}>12</span>
              <span style={{ color: C.valid }}>, 15, 18, ...</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─ GCF Venn ─ */}
      <AnimatePresence>
        {past("gcf") && (
          <motion.div className="w-full max-w-md rounded-2xl p-5 mb-4"
            style={{ backgroundColor: C.surface, border: "1px solid rgba(129,140,248,0.2)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={GENTLE_SPRING}
            role="img" aria-label="Venn diagram: factors of 12 and 18, GCF is 6">
            <svg viewBox="0 0 360 220" className="w-full" preserveAspectRatio="xMidYMid meet">
              <text x={120} y={20} textAnchor="middle" fill={C.dotPrimary} fontSize={13}>Factors of 12</text>
              <text x={240} y={20} textAnchor="middle" fill={C.valid} fontSize={13}>Factors of 18</text>
              <circle cx={145} cy={100} r={75} fill="rgba(129,140,248,0.08)" stroke={C.dotPrimary} strokeWidth={2} />
              <circle cx={215} cy={100} r={75} fill="rgba(52,211,153,0.08)" stroke={C.valid} strokeWidth={2} />
              {only12.map((n, i) => (
                <motion.text key={`l${n}`} x={95 + i * 30} y={95 + i * 20}
                  textAnchor="middle" fill={C.dotPrimary} fontSize={15} fontWeight={600}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * i }}>
                  {n}
                </motion.text>
              ))}
              {only18.map((n, i) => (
                <motion.text key={`r${n}`} x={250 + i * 30} y={95 + i * 20}
                  textAnchor="middle" fill={C.valid} fontSize={15} fontWeight={600}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * i + 0.4 }}>
                  {n}
                </motion.text>
              ))}
              {commonF.map((n, i) => (
                <motion.text key={`c${n}`} x={170 + (i % 2) * 20} y={85 + Math.floor(i / 2) * 25}
                  textAnchor="middle" fill={C.highlight} fontSize={15} fontWeight={600}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * i + 0.8 }}>
                  {n}
                </motion.text>
              ))}
              <motion.text x={180} y={195} textAnchor="middle" fill={C.highlight}
                fontSize={18} fontWeight={700}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                GCF(12, 18) = 6
              </motion.text>
              <motion.text x={180} y={215} textAnchor="middle" fill={C.textMuted} fontSize={12}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
                Greatest Common Factor = the BIGGEST in the overlap
              </motion.text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <CTAButton label="Continue" onClick={onComplete} disabled={phase !== "done"} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 5 — REAL-WORLD ANCHOR  (3 cards)
   ═══════════════════════════════════════════════════════════════════════════ */

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [ci, setCi] = useState(0);

  const cards: { title: string; accent: string; icon: ReactNode; body: ReactNode }[] = [
    {
      title: "Fair Sharing",
      accent: "#fb923c",
      icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth={2} strokeLinecap="round"><circle cx={12} cy={12} r={10}/><path d="M8 12h8M12 8v8"/></svg>,
      body: <>Can 12 cookies be shared equally among 5 people? 12/5=2.4 &mdash; <span style={{ color: C.invalid }}>5 is NOT a factor of 12.</span> But among 4? <span style={{ color: C.valid }}>12/4=3 each. That works!</span></>,
    },
    {
      title: "Music & Rhythm",
      accent: "#a78bfa",
      icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2} strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx={6} cy={18} r={3}/><circle cx={18} cy={16} r={3}/></svg>,
      body: <>In 4/4 time a measure has 4 beats. Split into: 1 group of 4, 2 groups of 2, or 4 groups of 1. These are the factors of 4!</>,
    },
    {
      title: "Architecture & Tiling",
      accent: "#2dd4bf",
      icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth={2} strokeLinecap="round"><rect x={3} y={3} width={18} height={18} rx={2}/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
      body: <>A 12-inch floor can be tiled perfectly with 1, 2, 3, 4, 6, or 12-inch tiles &mdash; the factors of 12! <span style={{ color: C.invalid }}>A 5-inch tile leaves gaps.</span></>,
    },
  ];

  const allSeen = ci >= cards.length;

  return (
    <div className="relative flex flex-1 flex-col px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 mb-4">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(52,211,153,0.1)" }}>
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.valid} strokeWidth={2} strokeLinecap="round">
            <circle cx={12} cy={12} r={10}/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold" style={{ color: C.textPrimary }}>Real World Connection</h2>
      </motion.div>

      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          {!allSeen && (() => {
            const card = cards[ci];
            if (!card) return null;
            return (
              <motion.div key={ci}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                className="rounded-2xl p-5 flex gap-4"
                style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${card.accent}` }}
                role="article">
                <div className="shrink-0 mt-1">{card.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: C.textPrimary }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>{card.body}</p>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {!allSeen && (
          <div className="mt-4 flex justify-end">
            <button onClick={() => setCi((i) => i + 1)}
              className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px]"
              style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${C.border}`, color: C.textPrimary }}>
              {ci < cards.length - 1 ? "Next" : "Done"}
            </button>
          </div>
        )}
      </div>

      <CTAButton label="Continue" onClick={onComplete} disabled={!allSeen} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE  (9 problems, 3 layers)
   ═══════════════════════════════════════════════════════════════════════════ */

interface Prob {
  id: string;
  layer: number;          // 0 recall · 1 procedure · 2 understanding
  prompt: string;
  kind: "multi" | "choice" | "text" | "free";
  options?: string[];
  correct: string[];      // for multi/choice: matching set; for text: single
  explanation: string;
}

const PROBLEMS: Prob[] = [
  { id: "r1", layer: 0, prompt: "Select ALL the factors of 18.",
    kind: "multi", options: ["1","2","3","4","5","6","7","8","9","10","12","18"],
    correct: ["1","2","3","6","9","18"],
    explanation: "18 = 1\u00d718, 2\u00d79, 3\u00d76. Factors: {1,2,3,6,9,18}." },
  { id: "r2", layer: 0, prompt: "Is 4 a factor of 20?",
    kind: "choice", options: ["YES","NO"], correct: ["YES"],
    explanation: "20 \u00f7 4 = 5, no remainder. Yes!" },
  { id: "r3", layer: 0, prompt: "What is the 4th multiple of 6?  (6, 12, 18, ?)",
    kind: "text", correct: ["24"],
    explanation: "Multiples of 6: 6, 12, 18, 24 ... each time +6." },
  { id: "p1", layer: 1, prompt: "Find the GCF of 16 and 24.",
    kind: "text", correct: ["8"],
    explanation: "Factors of 16: {1,2,4,8,16}. Factors of 24: {1,2,3,4,6,8,12,24}. Common: {1,2,4,8}. GCF = 8." },
  { id: "p2", layer: 1, prompt: "Find the LCM of 4 and 6.",
    kind: "text", correct: ["12"],
    explanation: "Multiples of 4: 4,8,12... Multiples of 6: 6,12... Smallest common = 12." },
  { id: "a1", layer: 1, prompt: "24 = 3 \u00d7 ___",
    kind: "text", correct: ["8"],
    explanation: "24 \u00f7 3 = 8." },
  { id: "a3", layer: 0, prompt: "Select all the PRIME numbers.",
    kind: "multi", options: ["2","9","11","15","17","21","23"],
    correct: ["2","11","17","23"],
    explanation: "2, 11, 17, 23 have exactly two factors. 9=3\u00d73, 15=3\u00d75, 21=3\u00d77 are composite." },
  { id: "u1", layer: 2, prompt: "Why are 1 and N always factors of any number N?",
    kind: "choice", options: ["Because 1 is special","Because you can always make a 1\u00d7N rectangle","Because N divides into 1 evenly","Because all numbers start with 1"],
    correct: ["Because you can always make a 1\u00d7N rectangle"],
    explanation: "You can always make a 1\u00d7N rectangle \u2014 one single row. So 1 and N are always factors." },
  { id: "u2", layer: 2, prompt: "12 has 6 factors. 13 has only 2. Why do some numbers have many factors while others have few?",
    kind: "choice", options: ["Bigger numbers always have more factors","Numbers divisible by many small primes have more factors; primes only form 1\u00d7N","Even numbers have more factors than odd numbers","It\u2019s random \u2014 there\u2019s no pattern"],
    correct: ["Numbers divisible by many small primes have more factors; primes only form 1\u00d7N"],
    explanation: "Numbers divisible by many small primes have more factors. Primes only form 1\u00d7N." },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [ci, setCi] = useState(0);
  const [ok, setOk] = useState(0);
  const [done, setDone] = useState(false);
  const [answer, setAnswer] = useState("");
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<"ans" | "fb">("ans");
  const [correct, setCorrect] = useState(false);

  const p = PROBLEMS[ci]!;
  const total = PROBLEMS.length;
  const pct = ((ci + (done ? 1 : 0)) / total) * 100;

  const check = useCallback(() => {
    const prob = PROBLEMS[ci]!;
    let isOk = false;
    if (prob.kind === "multi") {
      const cs = new Set(prob.correct);
      isOk = sel.size === cs.size && [...sel].every((s) => cs.has(s));
    } else if (prob.kind === "choice") {
      isOk = prob.correct.includes(answer);
    } else if (prob.kind === "free") {
      isOk = answer.trim().length >= 20;
    } else {
      isOk = prob.correct.map((c) => c.toLowerCase()).includes(answer.trim().toLowerCase());
    }
    setCorrect(isOk);
    if (isOk) setOk((c) => c + 1);
    setPhase("fb");
  }, [ci, answer, sel]);

  const next = useCallback(() => {
    if (ci + 1 >= total) { setDone(true); return; }
    setCi((i) => i + 1);
    setAnswer(""); setSel(new Set()); setPhase("ans"); setCorrect(false);
  }, [ci, total]);

  const toggle = (o: string) => setSel((prev) => { const s = new Set(prev); s.has(o) ? s.delete(o) : s.add(o); return s; });

  const layerClr = ["#60a5fa","#a78bfa","#f59e0b"];

  if (done) {
    const acc = Math.round((ok / total) * 100);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(52,211,153,0.1)" }}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={C.valid} strokeWidth={2.5}><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h2 className="mb-2 text-xl font-bold" style={{ color: C.textPrimary }}>Practice Complete!</h2>
        <p className="mb-6" style={{ color: C.textMuted }}>{ok}/{total} correct ({acc}%)</p>
        <CTAButton label="Continue" onClick={onComplete} />
      </motion.div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4">
      {/* progress */}
      <div className="mb-4 mt-2">
        <div className="mb-2 flex justify-between text-xs" style={{ color: C.textDim }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: layerClr[p.layer] ?? "#60a5fa" }} aria-hidden="true" />
            Problem {ci + 1} / {total}
          </span>
          <span>{ok} correct</span>
        </div>
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: C.border }}>
          <motion.div className="h-full rounded-full" style={{ backgroundColor: C.dotPrimary }}
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={p.id}
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          className="flex-1">
          <div className="w-full rounded-2xl p-5" style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.surface}` }}
            role="form" aria-label={p.prompt}>
            <p className="mb-5 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>
              {p.prompt}
            </p>

            {phase === "ans" && (
              <>
                {/* multi-select grid */}
                {p.kind === "multi" && p.options && (
                  <div className="mb-5 flex flex-wrap gap-2" role="group">
                    {p.options.map((o) => (
                      <button key={o} onClick={() => toggle(o)} role="checkbox" aria-checked={sel.has(o)}
                        className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg px-3 py-2 text-base font-semibold transition-colors"
                        style={{ border: `2px solid ${sel.has(o) ? C.dotPrimary : C.border}`,
                          backgroundColor: sel.has(o) ? "rgba(129,140,248,0.12)" : C.surface,
                          color: sel.has(o) ? C.dotPrimary : C.textSecondary }}>
                        {o}
                      </button>
                    ))}
                  </div>
                )}

                {/* single-choice */}
                {p.kind === "choice" && p.options && (
                  <div className="mb-5 flex gap-3">
                    {p.options.map((o) => (
                      <button key={o} onClick={() => setAnswer(o)}
                        className="flex-1 rounded-xl py-3 text-base font-semibold min-h-[48px] border-2 transition-colors"
                        style={{ borderColor: answer === o ? C.dotPrimary : C.border,
                          backgroundColor: answer === o ? "rgba(129,140,248,0.12)" : C.surface,
                          color: answer === o ? C.dotPrimary : C.textSecondary }}>
                        {o}
                      </button>
                    ))}
                  </div>
                )}

                {/* short text */}
                {p.kind === "text" && (
                  <div className="mb-5">
                    <input type="text" value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="min-h-[44px] w-full rounded-xl px-4 py-3 text-base outline-none"
                      style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.textPrimary }}
                      onKeyDown={(e) => { if (e.key === "Enter" && answer.trim()) check(); }}
                    />
                  </div>
                )}

                {/* free response */}
                {p.kind === "free" && (
                  <div className="mb-5">
                    <textarea value={answer} onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Explain in your own words..." rows={4}
                      className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none"
                      style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.textPrimary }} />
                    <p className="mt-1 text-xs" style={{ color: C.textDim }}>{answer.trim().length}/20 min characters</p>
                  </div>
                )}

                <button onClick={check}
                  disabled={p.kind === "multi" ? sel.size === 0 : answer.trim() === ""}
                  className={cn("w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px] transition-all",
                    (p.kind === "multi" ? sel.size === 0 : answer.trim() === "") && "opacity-40 cursor-not-allowed")}
                  style={{ backgroundColor: C.dotPrimary }}>
                  Check Answer
                </button>
              </>
            )}

            {phase === "fb" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ backgroundColor: correct ? "rgba(52,211,153,0.15)" : "rgba(148,163,184,0.15)",
                    color: correct ? C.valid : C.textMuted }}>
                  {correct ? "Correct! Nice work." : "Not quite \u2014 let\u2019s think about this..."}
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: C.textMuted }}>
                  {p.explanation}
                </p>
                <button onClick={next}
                  className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px]"
                  style={{ backgroundColor: C.dotPrimary }}>
                  Next
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 7 — REFLECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const REFL_PROMPT = "Why do some numbers have many factors while others (primes) have very few? Explain in your own words.";
const REFL_MIN = 20;
const REFL_MAX = 800;

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const ok = text.trim().length >= REFL_MIN;

  return (
    <div className="flex flex-1 flex-col px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center">
        {/* icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(167,139,250,0.1)" }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2}>
            <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 013.002 3.002L7.368 18.635a2 2 0 01-.855.506l-2.872.838a.5.5 0 01-.62-.62l.838-2.872a2 2 0 01.506-.854z"/>
          </svg>
        </div>

        <h2 className="mb-2 text-lg font-bold" style={{ color: C.textPrimary }}>Reflect &amp; Explain</h2>

        <div className="mb-6 rounded-2xl p-4"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.highlight}` }}>
          <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{REFL_PROMPT}</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => { if (e.target.value.length <= REFL_MAX) setText(e.target.value); }}
          placeholder="In my own words..."
          rows={5}
          className="w-full resize-none rounded-xl px-4 py-3 outline-none"
          style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.border}`,
            color: C.textPrimary, fontSize: 16, minHeight: 120, maxHeight: 300 }}
          aria-label="Write your reflection about factors and primes"
        />
        <div className="mt-2 flex justify-between">
          <span className="text-xs" style={{ color: ok ? C.valid : C.textDim }}>
            {text.trim().length}/{REFL_MIN} min characters
          </span>
          <span className="text-xs" style={{ color: C.textDim }}>{text.length}/{REFL_MAX}</span>
        </div>
      </motion.div>

      <CTAButton label="Share My Thinking" onClick={onComplete} disabled={!ok}
        ariaLabel="Submit your reflection" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — FactorsLesson
   ═══════════════════════════════════════════════════════════════════════════ */

export function FactorsLesson({ onComplete }: FactorsLessonProps) {
  const [si, setSi] = useState(0);
  const stage = STAGE_ORDER[si] ?? "hook";

  const advance = useCallback(() => {
    setSi((prev) => {
      if (prev + 1 >= STAGE_ORDER.length) { onComplete?.(); return prev; }
      return prev + 1;
    });
  }, [onComplete]);

  const finish = useCallback(() => { onComplete?.(); }, [onComplete]);

  function renderStage() {
    switch (stage) {
      case "hook":       return <HookStage onComplete={advance} />;
      case "spatial":    return <SpatialStage onComplete={advance} />;
      case "discovery":  return <DiscoveryStage onComplete={advance} />;
      case "symbol":     return <SymbolStage onComplete={advance} />;
      case "realWorld":  return <RealWorldStage onComplete={advance} />;
      case "practice":   return <PracticeStage onComplete={advance} />;
      case "reflection": return <ReflectionStage onComplete={finish} />;
      default:           return null;
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-nm-bg-primary">
      {/* stage progress indicator */}
      <div className="sticky top-0 z-10 flex items-center gap-2 bg-nm-bg-primary/95 px-4 py-3 backdrop-blur-sm">
        {STAGE_ORDER.map((s, i) => (
          <div key={s}
            className="flex-1 h-1.5 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: i <= si ? C.dotPrimary : C.border,
              opacity: i <= si ? 1 : 0.3,
            }}
            role="progressbar"
            aria-valuenow={i <= si ? 100 : 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Stage ${i + 1}: ${s}`}
          />
        ))}
      </div>

      {/* active stage */}
      <main className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
