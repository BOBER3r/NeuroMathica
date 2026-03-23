"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */

interface PrimeNumbersLessonProps {
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

/* ═══════════════════════════════════════════════════════════════════════════
   SPRING CONFIGS (per NT-2.2 spec)
   ═══════════════════════════════════════════════════════════════════════════ */

const GENTLE_SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const BOUNCY_SPRING = { type: "spring" as const, damping: 15, stiffness: 350 };
const _SNAP_SPRING = { type: "spring" as const, damping: 25, stiffness: 400 };
const TREE_SPRING = { type: "spring" as const, damping: 22, stiffness: 350 };

/* ═══════════════════════════════════════════════════════════════════════════
   COLORS (per NT-2.2 colour palette)
   ═══════════════════════════════════════════════════════════════════════════ */

const C = {
  primeGlow: "#fbbf24",
  primeBg: "rgba(251,191,36,0.12)",
  composite: "#818cf8",
  compositeBg: "rgba(129,140,248,0.19)",
  crossedOut: "rgba(251,113,133,0.4)",
  valid: "#34d399",
  invalid: "#fb7185",
  textPrimary: "#f1f5f9",
  textSecondary: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  textDimmer: "#475569",
  surface: "#1e293b",
  surfaceDeep: "#0f172a",
  border: "#334155",
  branch: "#475569",
  violet: "#a78bfa",
  blue: "#60a5fa",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   MATH UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/** Get non-trivial factor pairs for n (excluding 1*n). */
function getFactorPairs(n: number): Array<[number, number]> {
  const pairs: Array<[number, number]> = [];
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) pairs.push([i, n / i]);
  }
  return pairs;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Floating "+N XP" text. */
function XpFloat({ amount }: { amount: number }) {
  return (
    <motion.span
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 text-xs font-bold"
      style={{ color: C.primeGlow }}
    >
      +{amount} XP
    </motion.span>
  );
}

/** Standard bottom-action CTA button (44px+ touch target). */
function CTAButton({
  label,
  onClick,
  disabled = false,
  ariaLabel,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
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
          "w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition-all duration-150",
          "min-h-[44px] min-w-[44px] select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        )}
        style={{ backgroundColor: C.composite }}
      >
        {label}
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK
   Factor tree for 60 (two different splits), then 7 unsplittable
   ═══════════════════════════════════════════════════════════════════════════ */

type HookPhase =
  | "init"
  | "split1a"
  | "split1b"
  | "primes1"
  | "equation1"
  | "fadeOut1"
  | "split2a"
  | "split2b"
  | "equation2"
  | "fadeOut2"
  | "seven"
  | "sevenTry"
  | "sevenPrime"
  | "ready";

const HOOK_TIMELINE: Array<{ phase: HookPhase; ms: number }> = [
  { phase: "split1a", ms: 1000 },
  { phase: "split1b", ms: 800 },
  { phase: "primes1", ms: 800 },
  { phase: "equation1", ms: 1700 },
  { phase: "fadeOut1", ms: 1500 },
  { phase: "split2a", ms: 500 },
  { phase: "split2b", ms: 800 },
  { phase: "equation2", ms: 1500 },
  { phase: "fadeOut2", ms: 1800 },
  { phase: "seven", ms: 500 },
  { phase: "sevenTry", ms: 600 },
  { phase: "sevenPrime", ms: 1400 },
  { phase: "ready", ms: 2000 },
];

const HOOK_ALL_PHASES: HookPhase[] = [
  "init",
  "split1a",
  "split1b",
  "primes1",
  "equation1",
  "fadeOut1",
  "split2a",
  "split2b",
  "equation2",
  "fadeOut2",
  "seven",
  "sevenTry",
  "sevenPrime",
  "ready",
];

function HookStage({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<HookPhase>("init");
  const tRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (phase === "init") {
      tRef.current = setTimeout(() => setPhase("split1a"), 1200);
      return () => {
        if (tRef.current) clearTimeout(tRef.current);
      };
    }
    const idx = HOOK_TIMELINE.findIndex((t) => t.phase === phase);
    if (idx >= 0 && idx + 1 < HOOK_TIMELINE.length) {
      const cur = HOOK_TIMELINE[idx]!;
      const next = HOOK_TIMELINE[idx + 1]!;
      tRef.current = setTimeout(() => setPhase(next.phase), cur.ms);
    }
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, [phase]);

  // Failsafe: guarantee Continue button within 4s
  useEffect(() => {
    const failsafe = setTimeout(() => setPhase("ready"), 4000);
    return () => clearTimeout(failsafe);
  }, []);

  const phaseNum = HOOK_ALL_PHASES.indexOf(phase);

  const showTree1 = phaseNum >= 0 && phaseNum <= 4;
  const showTree2 = phaseNum >= 6 && phaseNum <= 8;
  const showSeven = phaseNum >= 10 && phaseNum <= 13;
  const showCTA = phase === "ready";

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4">
      {/* aria-live narrator */}
      <div className="sr-only" aria-live="polite">
        {phase === "primes1" &&
          "60 splits into a factor tree: 60 equals 6 times 10. 6 splits into 2 times 3. 10 splits into 2 times 5. The prime factors are 2, 2, 3, and 5."}
        {phase === "equation2" &&
          "60 splits differently: 60 equals 4 times 15. 4 splits into 2 times 2. 15 splits into 3 times 5. Same prime factors: 2, 2, 3, 5."}
        {phase === "sevenPrime" &&
          "7 cannot be split into factors. 7 is itself a building block, a prime number."}
      </div>

      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-md"
        role="img"
        aria-label="Factor tree animation showing how numbers decompose into prime factors"
      >
        <defs>
          <filter id="prime-glow-hook">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor="#fbbf24"
              floodOpacity="0.4"
            />
          </filter>
        </defs>

        <AnimatePresence>
          {/* ── TREE 1: 60 → 6×10 → 2×3 × 2×5 ── */}
          {showTree1 && (
            <motion.g
              key="tree1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Root 60 */}
              <motion.text
                x={200}
                y={55}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={C.textPrimary}
                fontSize={40}
                fontWeight={700}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={GENTLE_SPRING}
              >
                60
              </motion.text>

              {phase === "init" && (
                <motion.text
                  x={200}
                  y={90}
                  textAnchor={"middle" as const}
                  fill={C.textMuted}
                  fontSize={15}
                  fontStyle="italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Every number has a secret code...
                </motion.text>
              )}

              {/* Level 1: 6 and 10 */}
              {phaseNum >= 1 && (
                <>
                  <motion.line x1={200} y1={70} x2={120} y2={130} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={200} y1={70} x2={280} y2={130} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.rect x={90} y={115} width={60} height={34} rx={10}
                    fill={C.surface} stroke={C.composite} strokeWidth={1.5}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: phaseNum >= 3 ? 0.5 : 1 }}
                    transition={GENTLE_SPRING} />
                  <motion.text x={120} y={132}
                    textAnchor={"middle" as const} dominantBaseline="central"
                    fill={C.composite} fontSize={24} fontWeight={700}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phaseNum >= 3 ? 0.5 : 1 }}
                    transition={GENTLE_SPRING}>
                    6
                  </motion.text>
                  <motion.rect x={250} y={115} width={60} height={34} rx={10}
                    fill={C.surface} stroke={C.composite} strokeWidth={1.5}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: phaseNum >= 3 ? 0.5 : 1 }}
                    transition={GENTLE_SPRING} />
                  <motion.text x={280} y={132}
                    textAnchor={"middle" as const} dominantBaseline="central"
                    fill={C.composite} fontSize={24} fontWeight={700}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phaseNum >= 3 ? 0.5 : 1 }}>
                    10
                  </motion.text>
                  <motion.text x={200} y={132}
                    textAnchor={"middle" as const} dominantBaseline="central"
                    fill={C.textDim} fontSize={14}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}>
                    {"\u00d7"}
                  </motion.text>
                </>
              )}

              {/* Level 2: prime leaves 2, 3, 2, 5 */}
              {phaseNum >= 2 && (
                <>
                  <motion.line x1={120} y1={150} x2={80} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={120} y1={150} x2={160} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={280} y1={150} x2={240} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={280} y1={150} x2={320} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  {[
                    { x: 80, y: 210, n: 2 },
                    { x: 160, y: 210, n: 3 },
                    { x: 240, y: 210, n: 2 },
                    { x: 320, y: 210, n: 5 },
                  ].map((leaf, i) => (
                    <g key={`l1-${i}`}>
                      <motion.rect
                        x={leaf.x - 25} y={leaf.y - 15} width={50} height={30} rx={10}
                        fill={C.primeBg} stroke={C.primeGlow} strokeWidth={2}
                        filter="url(#prime-glow-hook)"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: phaseNum >= 3 ? [1, 1.15, 1] : 1, opacity: 1 }}
                        transition={{
                          ...BOUNCY_SPRING,
                          scale: phaseNum >= 3 ? { delay: i * 0.1, duration: 0.2 } : BOUNCY_SPRING,
                        }}
                      />
                      <motion.text x={leaf.x} y={leaf.y}
                        textAnchor={"middle" as const} dominantBaseline="central"
                        fill={C.primeGlow} fontSize={22} fontWeight={700}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ ...BOUNCY_SPRING, delay: 0.1 }}>
                        {leaf.n}
                      </motion.text>
                    </g>
                  ))}
                </>
              )}

              {/* Equation */}
              {phaseNum >= 4 && (
                <>
                  <motion.text x={200} y={265} textAnchor={"middle" as const}
                    fill={C.textSecondary} fontSize={18}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    {"60 = 2 \u00d7 2 \u00d7 3 \u00d7 5"}
                  </motion.text>
                  <motion.text x={200} y={290} textAnchor={"middle" as const}
                    fill={C.textMuted} fontSize={14} fontStyle="italic"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}>
                    The same primes, every time.
                  </motion.text>
                </>
              )}
            </motion.g>
          )}

          {/* ── TREE 2: 60 → 4×15 → 2×2 × 3×5 ── */}
          {showTree2 && (
            <motion.g key="tree2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.text x={200} y={30} textAnchor={"middle" as const}
                fill={C.textMuted} fontSize={14} fontStyle="italic"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                What if we split differently?
              </motion.text>
              <motion.text x={200} y={60} textAnchor={"middle" as const} dominantBaseline="central"
                fill={C.textPrimary} fontSize={36} fontWeight={700}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                60
              </motion.text>
              <motion.line x1={200} y1={78} x2={120} y2={130} stroke={C.branch} strokeWidth={2}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
              <motion.line x1={200} y1={78} x2={280} y2={130} stroke={C.branch} strokeWidth={2}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
              {/* 4 and 15 */}
              <motion.rect x={90} y={115} width={60} height={34} rx={10}
                fill={C.surface} stroke={C.composite} strokeWidth={1.5}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: phaseNum >= 7 ? 0.5 : 1 }}
                transition={GENTLE_SPRING} />
              <motion.text x={120} y={132} textAnchor={"middle" as const} dominantBaseline="central"
                fill={C.composite} fontSize={24} fontWeight={700}
                initial={{ opacity: 0 }} animate={{ opacity: phaseNum >= 7 ? 0.5 : 1 }}>
                4
              </motion.text>
              <motion.rect x={250} y={115} width={60} height={34} rx={10}
                fill={C.surface} stroke={C.composite} strokeWidth={1.5}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: phaseNum >= 7 ? 0.5 : 1 }}
                transition={GENTLE_SPRING} />
              <motion.text x={280} y={132} textAnchor={"middle" as const} dominantBaseline="central"
                fill={C.composite} fontSize={24} fontWeight={700}
                initial={{ opacity: 0 }} animate={{ opacity: phaseNum >= 7 ? 0.5 : 1 }}>
                15
              </motion.text>
              <motion.text x={200} y={132} textAnchor={"middle" as const} dominantBaseline="central"
                fill={C.textDim} fontSize={14}
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}>
                {"\u00d7"}
              </motion.text>

              {/* Level 2 */}
              {phaseNum >= 7 && (
                <>
                  <motion.line x1={120} y1={150} x2={80} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={120} y1={150} x2={160} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={280} y1={150} x2={240} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  <motion.line x1={280} y1={150} x2={320} y2={210} stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                  {[
                    { x: 80, y: 210, n: 2 },
                    { x: 160, y: 210, n: 2 },
                    { x: 240, y: 210, n: 3 },
                    { x: 320, y: 210, n: 5 },
                  ].map((leaf, i) => (
                    <g key={`l2-${i}`}>
                      <motion.rect x={leaf.x - 25} y={leaf.y - 15} width={50} height={30} rx={10}
                        fill={C.primeBg} stroke={C.primeGlow} strokeWidth={2}
                        filter="url(#prime-glow-hook)"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={BOUNCY_SPRING} />
                      <motion.text x={leaf.x} y={leaf.y}
                        textAnchor={"middle" as const} dominantBaseline="central"
                        fill={C.primeGlow} fontSize={22} fontWeight={700}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 + 0.1 }}>
                        {leaf.n}
                      </motion.text>
                    </g>
                  ))}
                </>
              )}

              {/* Equation */}
              {phaseNum >= 8 && (
                <>
                  <motion.text x={200} y={265} textAnchor={"middle" as const}
                    fill={C.primeGlow} fontSize={18}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}>
                    {"60 = 2 \u00d7 2 \u00d7 3 \u00d7 5"}
                  </motion.text>
                  <motion.text x={200} y={295} textAnchor={"middle" as const}
                    fill={C.primeGlow} fontSize={15} fontWeight={600}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}>
                    Same primes! No matter how you split it.
                  </motion.text>
                </>
              )}
            </motion.g>
          )}

          {/* ── SEVEN — unsplittable ── */}
          {showSeven && (
            <motion.g key="seven"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.text x={200} y={140}
                textAnchor={"middle" as const} dominantBaseline="central"
                fill={C.textPrimary} fontSize={48} fontWeight={700}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1, opacity: 1,
                  filter: phaseNum >= 12
                    ? "drop-shadow(0 0 8px rgba(251,191,36,0.5))"
                    : "none",
                  fill: phaseNum >= 12 ? C.primeGlow : C.textPrimary,
                }}
                transition={GENTLE_SPRING}>
                7
              </motion.text>

              {phase === "sevenTry" && (
                <>
                  <motion.line x1={200} y1={165} x2={150} y2={210}
                    stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0.7 }}
                    animate={{ pathLength: [0, 0.6, 0], opacity: [0.7, 0.5, 0] }}
                    transition={{ duration: 0.6 }} />
                  <motion.line x1={200} y1={165} x2={250} y2={210}
                    stroke={C.branch} strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0.7 }}
                    animate={{ pathLength: [0, 0.6, 0], opacity: [0.7, 0.5, 0] }}
                    transition={{ duration: 0.6 }} />
                </>
              )}

              {phaseNum >= 12 && (
                <>
                  <motion.text x={200} y={220} textAnchor={"middle" as const}
                    fill={C.textPrimary} fontSize={18} fontWeight={600}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>
                    {"7 can\u2019t be split."}
                  </motion.text>
                  <motion.text x={200} y={250} textAnchor={"middle" as const}
                    fill={C.primeGlow} fontSize={18} fontWeight={700}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}>
                    It IS the building block.
                  </motion.text>
                </>
              )}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {showCTA && (
        <CTAButton
          label="Discover the atoms of math"
          onClick={onComplete}
          ariaLabel="Continue to interactive exploration of prime numbers"
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE
   Phase A: Sieve of Eratosthenes (1-100 grid)
   Phase B: Interactive Factor Tree Builder (60, then 36)
   ═══════════════════════════════════════════════════════════════════════════ */

type CellState = "default" | "special" | "crossedOut" | "currentPrime" | "revealedPrime";
type SieveStep = 2 | 3 | 5 | 7 | "reveal" | "done";

interface TreeNode {
  id: number;
  value: number;
  parentId: number | null;
  children: [number, number] | null;
  isPrime: boolean;
  depth: number;
  x: number;
  y: number;
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [spatialPhase, setSpatialPhase] = useState<"sieve" | "tree">("sieve");

  /* ────────── SIEVE STATE ────────── */
  const [cellStates, setCellStates] = useState<CellState[]>(() => {
    const states = new Array<CellState>(101).fill("default");
    states[0] = "special";
    states[1] = "special";
    return states;
  });
  const [sieveStep, setSieveStep] = useState<SieveStep>(2);
  const [manualCrossCount, setManualCrossCount] = useState(0);
  const [totalCrossed, setTotalCrossed] = useState(0);
  const [primesFound, setPrimesFound] = useState(0);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [sieveComplete, setSieveComplete] = useState(false);

  /* ────────── TREE STATE ────────── */
  const [treeNumber, setTreeNumber] = useState(60);
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [treesCompleted, setTreesCompleted] = useState(0);
  const [treeComplete, setTreeComplete] = useState(false);
  const [showXp, setShowXp] = useState(false);
  const nextNodeId = useRef(1);

  // Initialise tree when entering tree phase or changing number
  useEffect(() => {
    if (spatialPhase === "tree") {
      nextNodeId.current = 1;
      setTreeNodes([{
        id: 0, value: treeNumber, parentId: null, children: null,
        isPrime: isPrime(treeNumber), depth: 0, x: 180, y: 30,
      }]);
      setSelectedNode(null);
      setTreeComplete(false);
    }
  }, [spatialPhase, treeNumber]);

  /* ────────── SIEVE HELPERS ────────── */
  const multiplesOfStep = useCallback((p: number): number[] => {
    const result: number[] = [];
    for (let i = p * 2; i <= 100; i += p) {
      if (cellStates[i] === "default") result.push(i);
    }
    return result;
  }, [cellStates]);

  const THRESHOLD: Record<number, number> = useMemo(
    () => ({ 2: 8, 3: 5, 5: 3, 7: 2 }), [],
  );

  // Mark current sieve prime highlighted on step change
  useEffect(() => {
    if (typeof sieveStep === "number") {
      setCellStates((prev) => {
        const next = [...prev];
        if (next[sieveStep] === "default") next[sieveStep] = "currentPrime";
        return next;
      });
    }
  }, [sieveStep]);

  // Show auto-complete button after threshold taps
  useEffect(() => {
    if (typeof sieveStep === "number") {
      setShowAutoComplete(manualCrossCount >= (THRESHOLD[sieveStep] ?? 3));
    }
  }, [manualCrossCount, sieveStep, THRESHOLD]);

  const showTip = useCallback((text: string) => {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    setTooltip(text);
    tooltipTimer.current = setTimeout(() => setTooltip(null), 1500);
  }, []);

  const completeCurrentStep = useCallback(() => {
    const order: SieveStep[] = [2, 3, 5, 7, "reveal"];
    const idx = order.indexOf(sieveStep);
    setCellStates((prev) => {
      const next = [...prev];
      if (typeof sieveStep === "number") next[sieveStep] = "revealedPrime";
      return next;
    });
    setPrimesFound((p) => p + 1);
    setManualCrossCount(0);
    setShowAutoComplete(false);
    const nextStep = order[idx + 1];
    if (nextStep !== undefined) setSieveStep(nextStep);
  }, [sieveStep]);

  const handleCellTap = useCallback((n: number) => {
    if (typeof sieveStep !== "number") return;
    if (n <= 1) return;
    const state = cellStates[n];
    if (state === "crossedOut" || state === "special" || state === "revealedPrime") return;
    if (n === sieveStep || state === "currentPrime") {
      showTip("That\u2019s the prime itself \u2014 we keep it!");
      return;
    }
    if (n % sieveStep === 0 && state === "default") {
      setCellStates((prev) => { const next = [...prev]; next[n] = "crossedOut"; return next; });
      setManualCrossCount((c) => c + 1);
      setTotalCrossed((c) => c + 1);
      const remaining = multiplesOfStep(sieveStep).filter((m) => m !== n);
      if (remaining.length === 0) completeCurrentStep();
      return;
    }
    if (state === "default" && n % sieveStep !== 0) {
      if (isPrime(n)) showTip("This one has no smaller factors \u2014 it might be prime!");
      else showTip("Not a multiple of " + sieveStep + ".");
    }
  }, [cellStates, sieveStep, multiplesOfStep, showTip, completeCurrentStep]);

  // Reveal all primes once sieve reaches "reveal" step
  useEffect(() => {
    if (sieveStep === "reveal") {
      const timer = setTimeout(() => {
        setCellStates((prev) => {
          const next = [...prev];
          for (let i = 2; i <= 100; i++) {
            if (next[i] === "default" || next[i] === "currentPrime") next[i] = "revealedPrime";
          }
          return next;
        });
        setPrimesFound(25);
        setSieveComplete(true);
        setSieveStep("done");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sieveStep]);

  const handleAutoComplete = useCallback(() => {
    if (typeof sieveStep !== "number") return;
    const remaining = multiplesOfStep(sieveStep);
    remaining.forEach((n, i) => {
      setTimeout(() => {
        setCellStates((prev) => { const next = [...prev]; next[n] = "crossedOut"; return next; });
        setTotalCrossed((c) => c + 1);
      }, i * 30);
    });
    setTimeout(() => completeCurrentStep(), remaining.length * 30 + 100);
    setShowAutoComplete(false);
  }, [sieveStep, multiplesOfStep, completeCurrentStep]);

  /* ────────── TREE HELPERS ────────── */
  const handleNodeTap = useCallback((nodeId: number) => {
    const node = treeNodes.find((n) => n.id === nodeId);
    if (!node || node.isPrime || node.children) return;
    setSelectedNode(nodeId);
  }, [treeNodes]);

  const handleSplit = useCallback((nodeId: number, a: number, b: number) => {
    setTreeNodes((prev) => {
      const newNodes = [...prev];
      const parentIdx = newNodes.findIndex((n) => n.id === nodeId);
      if (parentIdx < 0) return prev;
      const parent = newNodes[parentIdx]!;
      const leftId = nextNodeId.current++;
      const rightId = nextNodeId.current++;
      const spread = Math.max(50, 120 / (parent.depth + 1));

      newNodes[parentIdx] = { ...parent, children: [leftId, rightId] };
      newNodes.push(
        { id: leftId, value: a, parentId: nodeId, children: null, isPrime: isPrime(a), depth: parent.depth + 1, x: parent.x - spread, y: parent.y + 60 },
        { id: rightId, value: b, parentId: nodeId, children: null, isPrime: isPrime(b), depth: parent.depth + 1, x: parent.x + spread, y: parent.y + 60 },
      );
      return newNodes;
    });
    setSelectedNode(null);
  }, []);

  // Detect tree completion
  useEffect(() => {
    if (spatialPhase !== "tree" || treeNodes.length === 0) return;
    const leaves = treeNodes.filter((n) => n.children === null);
    if (leaves.length > 0 && leaves.every((n) => n.isPrime)) {
      setTreeComplete(true);
      setShowXp(true);
      setTimeout(() => setShowXp(false), 1200);
    }
  }, [treeNodes, spatialPhase]);

  const handleTreeContinue = useCallback(() => {
    if (treesCompleted === 0) {
      setTreesCompleted(1);
      setTreeNumber(36);
      setTreeComplete(false);
      setShowXp(false);
    } else {
      onComplete();
    }
  }, [treesCompleted, onComplete]);

  const primeLeaves = useMemo(
    () => treeNodes.filter((n) => !n.children && n.isPrime).map((n) => n.value).sort((a, b) => a - b),
    [treeNodes],
  );

  /* ────────── SIEVE RENDER ────────── */
  if (spatialPhase === "sieve") {
    const instructionText = (() => {
      if (sieveStep === 2) return "2 is prime! Tap all the multiples of 2 to cross them out.";
      if (sieveStep === 3) return "Now 3! Tap the multiples of 3 that aren\u2019t already crossed out.";
      if (sieveStep === 5) return "Now 5! Cross out the remaining multiples of 5.";
      if (sieveStep === 7) return "Almost done! Cross out the multiples of 7.";
      if (sieveStep === "reveal") return "After 7, the next prime is 11, but 11 \u00d7 11 = 121 > 100. We\u2019ve found ALL primes up to 100!";
      return "";
    })();

    return (
      <div className="flex flex-1 flex-col items-center px-4">
        {/* Instruction */}
        <motion.div className="w-full max-w-md mb-3 rounded-xl px-4 py-3 text-center"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          key={String(sieveStep)}>
          <p className="text-sm font-medium" style={{ color: C.textSecondary }}>
            {sieveComplete ? (
              <span style={{ color: C.composite, fontWeight: 700, fontSize: 18 }}>25 primes between 1 and 100!</span>
            ) : instructionText}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="relative w-full max-w-md">
          <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
            role="grid" aria-label="Number grid from 1 to 100 for the Sieve of Eratosthenes">
            {Array.from({ length: 100 }, (_, i) => {
              const n = i + 1;
              const state = cellStates[n]!;
              const isCurrent = state === "currentPrime" || (typeof sieveStep === "number" && n === sieveStep);

              let bgColor: string = C.surface;
              let textColor: string = C.textSecondary;
              let borderColor: string = C.border;
              let showCross = false;

              if (state === "special") { bgColor = C.surfaceDeep; textColor = C.textDimmer; borderColor = C.surfaceDeep; }
              else if (isCurrent) { bgColor = C.primeBg; textColor = C.primeGlow; borderColor = C.primeGlow; }
              else if (state === "crossedOut") { bgColor = C.surfaceDeep; textColor = C.textDimmer; borderColor = C.surfaceDeep; showCross = true; }
              else if (state === "revealedPrime") { bgColor = C.compositeBg; textColor = C.composite; borderColor = C.composite; }

              return (
                <motion.button key={n} onClick={() => handleCellTap(n)}
                  className={cn(
                    "relative flex items-center justify-center rounded select-none",
                    "min-h-[32px] aspect-square text-xs font-medium",
                    "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-400",
                  )}
                  style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, color: textColor, fontSize: "clamp(11px, 2.8vw, 15px)" }}
                  whileTap={{ scale: 0.92 }}
                  animate={isCurrent ? {
                    boxShadow: ["0 0 0px rgba(251,191,36,0.2)", "0 0 8px rgba(251,191,36,0.4)", "0 0 0px rgba(251,191,36,0.2)"],
                  } : {}}
                  transition={isCurrent ? { duration: 1.5, repeat: Infinity } : { duration: 0.1 }}
                  role="gridcell"
                  aria-label={`${n}, ${state === "crossedOut" ? "crossed out" : state === "revealedPrime" ? "prime" : state === "special" ? "neither prime nor composite" : "unmarked"}`}>
                  {n}
                  {showCross && (
                    <svg className="pointer-events-none absolute inset-0" viewBox="0 0 32 32" aria-hidden="true">
                      <line x1={4} y1={4} x2={28} y2={28} stroke={C.crossedOut} strokeWidth={2} />
                      <line x1={28} y1={4} x2={4} y2={28} stroke={C.crossedOut} strokeWidth={2} />
                    </svg>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div className="absolute z-10 rounded-lg px-3 py-2 text-xs font-medium pointer-events-none"
                style={{ backgroundColor: C.surface, border: `1px solid ${C.primeGlow}`, color: C.primeGlow, left: "50%", top: -40, transform: "translateX(-50%)", maxWidth: 260 }}
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {tooltip}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats bar */}
        <div className="mt-3 flex w-full max-w-md items-center justify-between rounded-lg px-4 py-2 text-xs"
          style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.border}`, color: C.textDim }}>
          <span>Primes found: <span style={{ color: C.composite, fontWeight: 600 }}>{primesFound}</span></span>
          <span>Composites: <span style={{ color: C.invalid, fontWeight: 600 }}>{totalCrossed}</span></span>
        </div>

        {/* Auto-complete shortcut */}
        <AnimatePresence>
          {showAutoComplete && typeof sieveStep === "number" && (
            <motion.div className="mt-3 w-full max-w-md"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
              <button onClick={handleAutoComplete}
                className="w-full rounded-lg px-4 py-3 text-sm font-medium min-h-[44px]"
                style={{ backgroundColor: C.surface, border: `1px solid ${C.composite}`, color: C.composite }}
                aria-label={`Cross out remaining multiples of ${sieveStep}`}>
                Cross out remaining multiples of {sieveStep}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {sieveComplete && (
          <div className="mt-6">
            <CTAButton label="Now let\u2019s build with primes..." onClick={() => setSpatialPhase("tree")}
              ariaLabel="Continue to factor tree builder" />
          </div>
        )}
      </div>
    );
  }

  /* ────────── TREE RENDER ────────── */
  const splits = selectedNode !== null
    ? getFactorPairs(treeNodes.find((n) => n.id === selectedNode)?.value ?? 0)
    : [];

  return (
    <div className="flex flex-1 flex-col items-center px-4">
      {/* Instruction */}
      <motion.div className="w-full max-w-md mb-4 rounded-xl px-4 py-3 text-center"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-sm font-medium" style={{ color: C.textSecondary }}>
          {treeComplete ? (
            <>
              <span style={{ color: C.primeGlow, fontWeight: 700 }}>
                {treeNumber} = {primeLeaves.join(" \u00d7 ")}
              </span>
              <br />
              <span>The building blocks of {treeNumber}!</span>
            </>
          ) : (
            <>
              Build a factor tree for:{" "}
              <span style={{ color: C.composite, fontWeight: 700, fontSize: 20 }}>{treeNumber}</span>
              <br />
              <span style={{ color: C.textMuted, fontSize: 13 }}>Tap a number to split it into factors!</span>
            </>
          )}
        </p>
      </motion.div>

      {/* Tree SVG */}
      <div className="relative w-full max-w-md">
        {showXp && <XpFloat amount={15} />}
        <svg viewBox="0 0 360 340" className="w-full" role="tree" aria-label={`Factor tree for ${treeNumber}`}>
          <defs>
            <filter id="prime-glow-tree">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fbbf24" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Branches */}
          {treeNodes.map((node) => {
            if (!node.children) return null;
            const left = treeNodes.find((n) => n.id === node.children![0]);
            const right = treeNodes.find((n) => n.id === node.children![1]);
            if (!left || !right) return null;
            return (
              <g key={`br-${node.id}`}>
                <motion.line x1={node.x} y1={node.y + 16} x2={left.x} y2={left.y - 16}
                  stroke={C.branch} strokeWidth={2}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ ...TREE_SPRING, duration: 0.25 }} />
                <motion.line x1={node.x} y1={node.y + 16} x2={right.x} y2={right.y - 16}
                  stroke={C.branch} strokeWidth={2}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ ...TREE_SPRING, duration: 0.25 }} />
              </g>
            );
          })}

          {/* Nodes */}
          {treeNodes.map((node) => {
            const isLeaf = node.children === null;
            const isCompositeLeaf = isLeaf && !node.isPrime;
            const isPrimeLeaf = isLeaf && node.isPrime;

            return (
              <g key={`nd-${node.id}`}
                onClick={() => { if (isCompositeLeaf) handleNodeTap(node.id); }}
                style={{ cursor: isCompositeLeaf ? "pointer" : "default" }}
                role="treeitem"
                aria-label={`${node.value}${node.isPrime ? ", prime" : ", composite"}`}>
                <motion.rect
                  x={node.x - 25} y={node.y - 16} width={50} height={32} rx={12}
                  fill={isPrimeLeaf ? C.primeBg : C.surface}
                  stroke={isPrimeLeaf ? C.primeGlow : C.composite}
                  strokeWidth={isPrimeLeaf ? 2 : 1.5}
                  filter={isPrimeLeaf ? "url(#prime-glow-tree)" : undefined}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: node.children ? 0.5 : 1,
                    strokeOpacity: isCompositeLeaf ? [0.6, 1, 0.6] : 1,
                  }}
                  transition={isCompositeLeaf
                    ? { strokeOpacity: { duration: 1.5, repeat: Infinity }, ...GENTLE_SPRING }
                    : GENTLE_SPRING}
                />
                <motion.text x={node.x} y={node.y}
                  textAnchor={"middle" as const} dominantBaseline="central"
                  fill={isPrimeLeaf ? C.primeGlow : node.children ? C.textDim : C.textPrimary}
                  fontSize={node.depth === 0 ? 22 : 18} fontWeight={700}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}>
                  {node.value}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Split picker */}
      <AnimatePresence>
        {selectedNode !== null && splits.length > 0 && (
          <motion.div className="flex flex-wrap items-center justify-center gap-2 mt-2 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }} transition={GENTLE_SPRING}
            role="menu" aria-label="Choose how to split this number">
            {splits.map(([a, b]) => (
              <button key={`${a}x${b}`}
                onClick={() => handleSplit(selectedNode, a, b)}
                className="rounded-full px-4 py-2 text-sm font-medium min-h-[44px] transition-colors hover:border-indigo-400"
                style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.border}`, color: C.textSecondary }}
                role="menuitem" aria-label={`Split into ${a} times ${b}`}>
                {a} {"\u00d7"} {b}
              </button>
            ))}
            <button onClick={() => setSelectedNode(null)}
              className="rounded-full px-3 py-2 text-xs min-h-[44px]"
              style={{ color: C.textDim }} aria-label="Cancel split">
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {treeComplete && (
        <div className="mt-4">
          <CTAButton
            label={treesCompleted === 0 ? "Now try 36!" : "Ready to discover the patterns?"}
            onClick={handleTreeContinue}
            ariaLabel={treesCompleted === 0 ? "Continue to build factor tree for 36" : "Continue to guided discovery"} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY
   6 prompts with visual highlights + interactive micro-check
   ═══════════════════════════════════════════════════════════════════════════ */

interface DiscoveryPrompt {
  id: number;
  content: string;
  highlightPhrase?: string;
  hasInteraction?: boolean;
  buttonText: string;
}

const DISCOVERY_PROMPTS: DiscoveryPrompt[] = [
  {
    id: 1,
    content: "Look at the sieve. The numbers that survived \u2014 2, 3, 5, 7, 11, 13... \u2014 are called prime numbers. They have exactly two factors: 1 and themselves. No other number divides them evenly.",
    highlightPhrase: "prime numbers",
    buttonText: "Next",
  },
  {
    id: 2,
    content: "You might wonder: why not 1? Here\u2019s the key: primes must have exactly two different factors. 1 only has one factor \u2014 itself. It\u2019s like asking \u2018what are the atoms of an atom?\u2019 \u2014 the question doesn\u2019t apply.",
    highlightPhrase: "exactly two different factors",
    buttonText: "Next",
  },
  { id: 3, content: "", hasInteraction: true, buttonText: "Next" },
  {
    id: 4,
    content: "Look at the gaps between primes: 2\u21923 (gap 1), 3\u21925 (gap 2), 5\u21927 (gap 2), 7\u219211 (gap 4), 11\u219213 (gap 2), 13\u219217 (gap 4)... The gaps jump around unpredictably. Mathematicians have been trying to find a pattern for thousands of years \u2014 and they\u2019re still looking!",
    highlightPhrase: "jump around unpredictably",
    buttonText: "Next",
  },
  {
    id: 5,
    content: "Will primes ever run out? No! There are infinitely many primes. Even past 1,000,000,000... there\u2019s always another prime waiting. An ancient Greek named Euclid proved this over 2,300 years ago.",
    highlightPhrase: "infinitely many primes",
    buttonText: "Next",
  },
  {
    id: 6,
    content: "Here\u2019s a secret shortcut: to check if a number is prime, you only need to test divisors up to its square root. For 37, test 2, 3, 4, 5, 6. None divide it, so 37 is prime!",
    highlightPhrase: "square root",
    buttonText: "Next",
  },
];

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [oddPrimeAnswer, setOddPrimeAnswer] = useState<"yes" | "no" | null>(null);
  const [showOddExplanation, setShowOddExplanation] = useState(false);

  const currentPrompt = DISCOVERY_PROMPTS[promptIdx]!;

  const handleNext = useCallback(() => {
    if (promptIdx + 1 >= DISCOVERY_PROMPTS.length) onComplete();
    else { setPromptIdx((p) => p + 1); setOddPrimeAnswer(null); setShowOddExplanation(false); }
  }, [promptIdx, onComplete]);

  const handleOddPrime = useCallback((answer: "yes" | "no") => {
    setOddPrimeAnswer(answer);
    setShowOddExplanation(true);
  }, []);

  const renderHighlighted = (text: string, highlight?: string) => {
    if (!highlight || !text.includes(highlight)) return <span>{text}</span>;
    const idx = text.indexOf(highlight);
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ color: C.composite, fontWeight: 600 }}>{highlight}</span>
        {text.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div key={promptIdx} className="w-full max-w-lg rounded-2xl p-5"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} transition={GENTLE_SPRING}>
          <div className="mb-2 text-xs font-medium" style={{ color: C.textDim }}>
            Discovery {promptIdx + 1} of {DISCOVERY_PROMPTS.length}
          </div>

          {currentPrompt.hasInteraction ? (
            <div>
              <p className="mb-4 text-base leading-relaxed" style={{ color: C.textSecondary }}>
                Is every odd number prime?
              </p>
              {!showOddExplanation && (
                <div className="flex gap-3 mb-4" role="radiogroup">
                  <button onClick={() => handleOddPrime("yes")}
                    className="flex-1 rounded-xl px-6 py-3 text-base font-semibold min-h-[48px]"
                    style={{ backgroundColor: "rgba(52,211,153,0.1)", border: `2px solid ${C.valid}`, color: C.valid }}
                    role="radio" aria-checked={oddPrimeAnswer === "yes"}
                    aria-label="I think all odd numbers are prime">
                    Yes
                  </button>
                  <button onClick={() => handleOddPrime("no")}
                    className="flex-1 rounded-xl px-6 py-3 text-base font-semibold min-h-[48px]"
                    style={{ backgroundColor: "rgba(251,113,133,0.1)", border: `2px solid ${C.invalid}`, color: C.invalid }}
                    role="radio" aria-checked={oddPrimeAnswer === "no"}
                    aria-label="I think not all odd numbers are prime">
                    No
                  </button>
                </div>
              )}
              <AnimatePresence>
                {showOddExplanation && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="mb-3 text-sm font-medium" style={{ color: oddPrimeAnswer === "no" ? C.valid : C.textMuted }}>
                      {oddPrimeAnswer === "no" ? "Correct! Not all odd numbers are prime." : "Let\u2019s check..."}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>
                      A common mistake: &quot;all odd numbers are prime.&quot; But look:{" "}
                      <span style={{ color: C.invalid, fontWeight: 600 }}>9 = 3{"\u00d7"}3</span>,{" "}
                      <span style={{ color: C.invalid, fontWeight: 600 }}>15 = 3{"\u00d7"}5</span>,{" "}
                      <span style={{ color: C.invalid, fontWeight: 600 }}>21 = 3{"\u00d7"}7</span>,{" "}
                      <span style={{ color: C.invalid, fontWeight: 600 }}>25 = 5{"\u00d7"}5</span>.
                      These are odd AND composite! Meanwhile,{" "}
                      <span style={{ color: C.primeGlow, fontWeight: 600 }}>2 is even AND prime</span> {"\u2014"} the only even prime.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-base leading-relaxed" style={{ color: C.textSecondary }} aria-live="polite">
              {renderHighlighted(currentPrompt.content, currentPrompt.highlightPhrase)}
            </p>
          )}

          <div className="mt-5 flex justify-end">
            <button onClick={handleNext}
              disabled={currentPrompt.hasInteraction && !showOddExplanation}
              className={cn(
                "rounded-xl px-6 py-3 text-sm font-semibold text-white min-h-[44px] min-w-[44px] transition-all duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                currentPrompt.hasInteraction && !showOddExplanation && "opacity-40 cursor-not-allowed",
              )}
              style={{ backgroundColor: C.composite }}
              aria-label={promptIdx + 1 >= DISCOVERY_PROMPTS.length ? "Continue to symbol bridge" : "Go to next discovery"}>
              {currentPrompt.buttonText}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE
   ═══════════════════════════════════════════════════════════════════════════ */

interface SymbolStep {
  id: number;
  notation: string;
  description: string;
  color: string;
}

const SYMBOL_STEPS: SymbolStep[] = [
  { id: 1, notation: "p is prime if its only factors are 1 and p", description: "Example: 7 has factors {1, 7}. 13 has factors {1, 13}. 29 has factors {1, 29}. Only two factors each!", color: C.primeGlow },
  { id: 2, notation: "n is composite if it has factors other than 1 and n", description: "Example: 12 has factors {1, 2, 3, 4, 6, 12}. Those extra factors (2, 3, 4, 6) make it composite.", color: C.valid },
  { id: 3, notation: "60 = 2\u00b2 \u00d7 3 \u00d7 5", description: "The two 2s in the factor tree combine into 2\u00b2. We write each prime base with its exponent.", color: C.primeGlow },
  { id: 4, notation: "Every whole number > 1 is either prime or can be written as a unique product of primes.", description: "This is the Fundamental Theorem of Arithmetic \u2014 one of the most important facts in all of mathematics!", color: C.primeGlow },
];

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = SYMBOL_STEPS[stepIdx]!;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-4">
        <AnimatePresence mode="wait">
          <motion.div key={stepIdx} className="rounded-2xl p-5"
            style={{
              backgroundColor: C.surface,
              border: stepIdx === 3 ? `2px solid ${C.primeGlow}` : `1px solid ${C.border}`,
              boxShadow: stepIdx === 3 ? "0 0 20px rgba(251,191,36,0.1)" : "none",
            }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={GENTLE_SPRING}>
            <div className="mb-1 text-xs" style={{ color: C.textDim }}>
              Symbol {stepIdx + 1} of {SYMBOL_STEPS.length}
            </div>
            <motion.div className="mb-3 rounded-xl px-4 py-3"
              style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.border}` }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-lg font-semibold leading-relaxed" style={{ color: currentStep.color }}
                role="math" aria-label={currentStep.notation}>
                {currentStep.notation}
              </p>
            </motion.div>
            <motion.p className="text-sm leading-relaxed" style={{ color: C.textMuted }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {currentStep.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end">
          <button onClick={() => { if (stepIdx + 1 >= SYMBOL_STEPS.length) onComplete(); else setStepIdx((s) => s + 1); }}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white min-h-[44px] min-w-[44px]"
            style={{ backgroundColor: C.composite }}
            aria-label={stepIdx + 1 >= SYMBOL_STEPS.length ? "Continue to real-world examples" : "Next symbol"}>
            {stepIdx + 1 >= SYMBOL_STEPS.length ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 5 — REAL WORLD ANCHOR
   ═══════════════════════════════════════════════════════════════════════════ */

interface RealWorldCard {
  title: string;
  body: string;
  accentColor: string;
  icon: "lock" | "bug" | "music";
  miniViz: "encryption" | "cicadas" | "music";
}

const REAL_WORLD_CARDS: RealWorldCard[] = [
  {
    title: "Your Passwords Are Protected by Primes",
    body: "When you log into a website, your password is protected using two giant prime numbers multiplied together. It\u2019s easy to multiply two primes \u2014 but incredibly hard to figure out which two primes were used!",
    accentColor: C.composite, icon: "lock", miniViz: "encryption",
  },
  {
    title: "Why Cicadas Love Primes",
    body: "Some cicadas emerge every 13 or 17 years \u2014 both prime numbers! Since 13 and 17 don\u2019t share factors with predator cycles (every 2, 3, or 4 years), the cicadas rarely meet their predators.",
    accentColor: C.valid, icon: "bug", miniViz: "cicadas",
  },
  {
    title: "Primes in Music",
    body: "Musical rhythms that feel \u2018interesting\u2019 often use prime numbers. A pattern that repeats every 7 or 5 beats feels fresh because it doesn\u2019t line up neatly with the standard 4-beat measure.",
    accentColor: C.violet, icon: "music", miniViz: "music",
  },
];

function RenderIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === "lock") return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <rect x={3} y={11} width={18} height={11} rx={2} /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
  if (icon === "bug") return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <circle cx={12} cy={14} r={6} /><path d="M12 8V2M6.3 9.7L2 6M17.7 9.7L22 6M6 16H1M18 16h5M6.3 18.3L2 22M17.7 18.3L22 22" />
    </svg>
  );
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M9 18V5l12-2v13" /><circle cx={6} cy={18} r={3} /><circle cx={18} cy={16} r={3} />
    </svg>
  );
}

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [cardIdx, setCardIdx] = useState(0);
  const card = REAL_WORLD_CARDS[cardIdx]!;

  const handleNext = useCallback(() => {
    if (cardIdx + 1 >= REAL_WORLD_CARDS.length) onComplete();
    else setCardIdx((c) => c + 1);
  }, [cardIdx, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div key={cardIdx} className="w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ backgroundColor: C.surface, borderLeft: `4px solid ${card.accentColor}`, border: `1px solid ${C.border}` }}
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }} transition={GENTLE_SPRING} role="article">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <RenderIcon icon={card.icon} color={card.accentColor} />
              <h3 className="text-lg font-bold" style={{ color: C.textPrimary }}>{card.title}</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.textSecondary }}>{card.body}</p>

            {/* Mini-visualizations */}
            {card.miniViz === "encryption" && (
              <div className="flex items-center justify-center gap-4 rounded-xl py-4 px-3"
                style={{ backgroundColor: C.surfaceDeep }}
                role="img" aria-label="Two prime numbers p and q multiply easily into p times q, but reversing the process is extremely difficult">
                <div className="flex items-center justify-center rounded-full w-10 h-10 text-sm font-bold"
                  style={{ backgroundColor: C.primeBg, border: `2px solid ${C.primeGlow}`, color: C.primeGlow }}>p</div>
                <span style={{ color: C.textDim }}>{"\u00d7"}</span>
                <div className="flex items-center justify-center rounded-full w-10 h-10 text-sm font-bold"
                  style={{ backgroundColor: C.primeBg, border: `2px solid ${C.primeGlow}`, color: C.primeGlow }}>q</div>
                <span style={{ color: C.valid, fontSize: 18 }} aria-hidden="true">{"\u2192"}</span>
                <div className="flex items-center justify-center rounded-lg px-3 py-1 text-sm font-bold"
                  style={{ backgroundColor: C.compositeBg, border: `2px solid ${C.composite}`, color: C.composite }}>
                  p{"\u00d7"}q
                </div>
                <span style={{ color: C.invalid, fontSize: 12, fontWeight: 600 }}>{"\u2190"} Hard!</span>
              </div>
            )}
            {card.miniViz === "cicadas" && (
              <div className="flex items-center justify-center gap-1 rounded-xl py-3 px-3 overflow-x-auto"
                style={{ backgroundColor: C.surfaceDeep }}
                role="img" aria-label="Timeline showing predator cycle every 4 years and cicada cycle every 13 years">
                {Array.from({ length: 17 }, (_, i) => {
                  const yr = i + 1;
                  return (
                    <div key={yr} className="flex flex-col items-center" style={{ minWidth: 18 }}>
                      <div className="w-3 h-3 rounded-full mb-1"
                        style={{ backgroundColor: yr === 13 ? C.valid : yr % 4 === 0 ? C.invalid : "transparent", border: `1px solid ${C.border}` }} />
                      <span className="text-[9px]" style={{ color: C.textDim }}>{yr}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {card.miniViz === "music" && (
              <div className="rounded-xl py-3 px-3 space-y-2" style={{ backgroundColor: C.surfaceDeep }}
                role="img" aria-label="Two beat patterns: standard 4-beat and prime 7-beat rarely align">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] w-16 shrink-0" style={{ color: C.textDim }}>4-beat</span>
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: i % 4 === 0 ? C.blue : "transparent", border: `1px solid ${i % 4 === 0 ? C.blue : C.border}` }} />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] w-16 shrink-0" style={{ color: C.textDim }}>7-beat</span>
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: i % 7 === 0 ? C.violet : "transparent", border: `1px solid ${i % 7 === 0 ? C.violet : C.border}` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6">
        <CTAButton
          label={cardIdx + 1 >= REAL_WORLD_CARDS.length ? "Continue" : "Next"}
          onClick={handleNext}
          ariaLabel={cardIdx + 1 >= REAL_WORLD_CARDS.length ? "Continue to practice" : "Next real-world example"} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE (9 problems)
   ═══════════════════════════════════════════════════════════════════════════ */

type ProblemType = "multi-select" | "true-false" | "multiple-choice" | "numeric-input";

interface PracticeProblem {
  id: string;
  layer: 0 | 1 | 2;
  type: ProblemType;
  prompt: string;
  options?: string[];
  correctAnswer: string | string[] | number;
  feedback: Record<string, string>;
  explanation: string;
}

const PROBLEMS: PracticeProblem[] = [
  // ── Recall ──
  {
    id: "R1", layer: 0, type: "multi-select",
    prompt: "Which of these numbers are prime? Select ALL the primes.",
    options: ["2", "9", "11", "15", "17", "21", "23", "27"],
    correctAnswer: ["2", "11", "17", "23"],
    feedback: {
      "9": "9 seems prime, but 3 \u00d7 3 = 9 \u2014 it has factors other than 1 and itself!",
      "15": "15 = 3 \u00d7 5, so 15 is composite.",
      "21": "21 = 3 \u00d7 7, so 21 is composite.",
      "27": "27 = 3 \u00d7 9 = 3 \u00d7 3 \u00d7 3.",
    },
    explanation: "The primes are 2, 11, 17, and 23. Each has exactly two factors: 1 and itself.",
  },
  {
    id: "R2", layer: 0, type: "true-false",
    prompt: "Is 51 prime?",
    correctAnswer: "not-prime",
    feedback: {
      correct: "Right! 51 = 3 \u00d7 17. The digit sum 5 + 1 = 6 is divisible by 3.",
      incorrect: "Tricky one! 51 looks prime, but 5 + 1 = 6, divisible by 3. So 51 / 3 = 17.",
    },
    explanation: "51 = 3 \u00d7 17. The digit-sum test: 5 + 1 = 6, divisible by 3.",
  },
  {
    id: "R3", layer: 0, type: "multiple-choice",
    prompt: "Which statement BEST describes a prime number?",
    options: [
      "A number that is odd",
      "A number with exactly two factors: 1 and itself",
      "A number that can\u2019t be divided by anything",
      "A number less than 100",
    ],
    correctAnswer: "A number with exactly two factors: 1 and itself",
    feedback: {
      "A number that is odd": "2 is even and prime! And 9 is odd but not prime (9 = 3 \u00d7 3).",
      "A number that can\u2019t be divided by anything": "Every number can be divided by 1 and itself. Primes are special because ONLY 1 and themselves divide them.",
      "A number less than 100": "Primes go on forever! 101, 103, 107... are all prime.",
    },
    explanation: "A prime number has exactly two factors: 1 and itself.",
  },
  // ── Procedure ──
  {
    id: "P1", layer: 1, type: "multiple-choice",
    prompt: "What is the prime factorization of 48?",
    options: ["2\u2074 \u00d7 3", "2\u00b3 \u00d7 6", "4 \u00d7 12", "2\u00b2 \u00d7 12"],
    correctAnswer: "2\u2074 \u00d7 3",
    feedback: {
      "2\u00b3 \u00d7 6": "6 is not prime! 6 = 2 \u00d7 3. Keep splitting until all factors are prime.",
      "4 \u00d7 12": "4 and 12 are not prime. We need to break them down further.",
      "2\u00b2 \u00d7 12": "12 is not prime! 12 = 2\u00b2 \u00d7 3.",
    },
    explanation: "48 = 2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 3 = 2\u2074 \u00d7 3.",
  },
  {
    id: "P2", layer: 1, type: "multiple-choice",
    prompt: "The prime factorization of 90 is:",
    options: ["2 \u00d7 3\u00b2 \u00d7 5", "2 \u00d7 3 \u00d7 15", "9 \u00d7 10", "2 \u00d7 5 \u00d7 9"],
    correctAnswer: "2 \u00d7 3\u00b2 \u00d7 5",
    feedback: {
      "2 \u00d7 3 \u00d7 15": "15 is not prime! 15 = 3 \u00d7 5.",
      "9 \u00d7 10": "Neither 9 nor 10 is prime.",
      "2 \u00d7 5 \u00d7 9": "9 is not prime! 9 = 3 \u00d7 3.",
    },
    explanation: "90 = 2 \u00d7 3 \u00d7 3 \u00d7 5 = 2 \u00d7 3\u00b2 \u00d7 5.",
  },
  {
    id: "P3", layer: 1, type: "multi-select",
    prompt: "Which of these are multiples of 3? Select all that apply.",
    options: ["9", "14", "15", "22", "27", "28"],
    correctAnswer: ["9", "15", "27"],
    feedback: {
      "14": "14 = 2 \u00d7 7. Not a multiple of 3.",
      "22": "22 = 2 \u00d7 11. Not a multiple of 3.",
      "28": "28 = 4 \u00d7 7. Not a multiple of 3.",
    },
    explanation: "9 = 3\u00d73, 15 = 3\u00d75, and 27 = 3\u00d79 are the multiples of 3.",
  },
  // ── Understanding ──
  {
    id: "U1", layer: 2, type: "multiple-choice",
    prompt: "If we DID count 1 as prime, the Fundamental Theorem of Arithmetic would break. Why?",
    options: [
      "Because 1 \u00d7 1 \u00d7 1 = 1 means infinite factorizations",
      "Because you could write 12 = 1 \u00d7 2\u00b2 \u00d7 3, or 12 = 1 \u00d7 1 \u00d7 2\u00b2 \u00d7 3, making factorization NOT unique",
      "Because 1 is too small to be useful",
      "Because 1 is even",
    ],
    correctAnswer: "Because you could write 12 = 1 \u00d7 2\u00b2 \u00d7 3, or 12 = 1 \u00d7 1 \u00d7 2\u00b2 \u00d7 3, making factorization NOT unique",
    feedback: {
      "Because 1 \u00d7 1 \u00d7 1 = 1 means infinite factorizations": "You\u2019re on the right track with infinite 1s, but the key issue is about uniqueness.",
      "Because 1 is too small to be useful": "Size doesn\u2019t determine primality \u2014 2 is small and it\u2019s prime!",
      "Because 1 is even": "1 is actually odd! The real reason is about uniqueness of factorization.",
    },
    explanation: "If 1 were prime, you could stick any number of 1s into a factorization, destroying uniqueness.",
  },
  {
    id: "U2", layer: 2, type: "multiple-choice",
    prompt: "72 = 2\u00b3 \u00d7 3\u00b2 and 75 = 3 \u00d7 5\u00b2. What do these numbers have in common?",
    options: [
      "They share the prime factor 3",
      "They are both prime",
      "They have the same number of prime factors",
      "Nothing \u2014 they share no factors",
    ],
    correctAnswer: "They share the prime factor 3",
    feedback: {
      "They are both prime": "72 and 75 are much larger than their prime factors and are composite.",
      "They have the same number of prime factors": "72 has 5 prime factors (with repeats), while 75 has 3.",
      "Nothing \u2014 they share no factors": "Look carefully \u2014 do you see any prime in BOTH factorizations?",
    },
    explanation: "Both 72 and 75 have 3 as a prime factor. The GCF of 72 and 75 is 3!",
  },
  {
    id: "U3", layer: 2, type: "numeric-input",
    prompt: "What is the LARGEST prime factor of 84?",
    correctAnswer: 7,
    feedback: {
      correct: "84 = 2 \u00d7 2 \u00d7 3 \u00d7 7. The prime factors are 2, 3, and 7. The largest is 7!",
      incorrect: "Try building a factor tree: 84 = 2 \u00d7 42 = 2 \u00d7 2 \u00d7 21 = 2 \u00d7 2 \u00d7 3 \u00d7 7. The largest prime factor is 7.",
    },
    explanation: "84 = 2\u00b2 \u00d7 3 \u00d7 7. The largest prime factor is 7.",
  },
];

const LAYER_COLORS: Record<number, string> = { 0: C.blue, 1: C.violet, 2: "#f59e0b" };

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [phase, setPhase] = useState<"answering" | "feedback">("answering");
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [numericInput, setNumericInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showXp, setShowXp] = useState(false);

  const problem = PROBLEMS[problemIdx]!;

  const handleSelect = useCallback((option: string) => {
    if (phase !== "answering") return;
    if (problem.type === "multi-select") {
      setSelectedAnswers((prev) => prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]);
    } else {
      setSelectedAnswers([option]);
    }
  }, [phase, problem.type]);

  const handleSubmit = useCallback(() => {
    let correct = false;
    if (problem.type === "multi-select") {
      const correctArr = problem.correctAnswer as string[];
      const selected = [...selectedAnswers].sort();
      const expected = [...correctArr].sort();
      correct = selected.length === expected.length && selected.every((s, i) => s === expected[i]);
    } else if (problem.type === "multiple-choice" || problem.type === "true-false") {
      correct = selectedAnswers[0] === problem.correctAnswer;
    } else if (problem.type === "numeric-input") {
      correct = parseInt(numericInput, 10) === problem.correctAnswer;
    }
    setIsCorrect(correct);
    setPhase("feedback");
    if (correct) { setShowXp(true); setTimeout(() => setShowXp(false), 1200); }
  }, [selectedAnswers, numericInput, problem]);

  const handleNext = useCallback(() => {
    if (problemIdx + 1 >= PROBLEMS.length) { onComplete(); return; }
    setProblemIdx((p) => p + 1);
    setPhase("answering"); setSelectedAnswers([]); setNumericInput(""); setIsCorrect(false); setShowXp(false);
  }, [problemIdx, onComplete]);

  const canSubmit = problem.type === "numeric-input" ? numericInput.trim().length > 0 : selectedAnswers.length > 0;

  const getFeedbackText = (): string => {
    if (problem.type === "multi-select") {
      if (isCorrect) return problem.explanation;
      const correctArr = problem.correctAnswer as string[];
      const wrong = selectedAnswers.filter((s) => !correctArr.includes(s));
      if (wrong.length > 0) return problem.feedback[wrong[0]!] ?? problem.explanation;
      return problem.explanation;
    }
    if (isCorrect) return problem.feedback["correct"] ?? problem.explanation;
    if (problem.type === "true-false" || problem.type === "numeric-input") return problem.feedback["incorrect"] ?? problem.explanation;
    const sel = selectedAnswers[0];
    return sel ? (problem.feedback[sel] ?? problem.explanation) : problem.explanation;
  };

  return (
    <div className="flex flex-1 flex-col items-center px-4">
      <AnimatePresence mode="wait">
        <motion.div key={problem.id} className="relative w-full max-w-lg rounded-2xl p-5"
          style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.surface}` }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }} transition={GENTLE_SPRING}>
          {showXp && <XpFloat amount={10} />}

          {/* Header */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LAYER_COLORS[problem.layer] ?? C.blue }} aria-hidden="true" />
            <span className="text-xs" style={{ color: C.textDim }}>{problemIdx + 1} of {PROBLEMS.length}</span>
          </div>

          <p className="mb-5 text-base font-medium leading-relaxed" style={{ color: C.textPrimary }}>{problem.prompt}</p>

          {phase === "answering" && (
            <>
              {/* Multi-select / multiple-choice */}
              {(problem.type === "multi-select" || problem.type === "multiple-choice") && problem.options && (
                <div className={cn("mb-5", problem.type === "multi-select" ? "grid grid-cols-2 gap-2" : "space-y-2")}
                  role={problem.type === "multi-select" ? "group" : "radiogroup"}>
                  {problem.options.map((opt) => {
                    const sel = selectedAnswers.includes(opt);
                    return (
                      <button key={opt} onClick={() => handleSelect(opt)}
                        className={cn(
                          "w-full rounded-xl px-4 py-3 text-left text-sm font-medium min-h-[44px] transition-all",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                        )}
                        style={{
                          backgroundColor: sel ? C.surface : "transparent",
                          border: `2px solid ${sel ? C.composite : C.border}`,
                          color: sel ? C.composite : C.textSecondary,
                        }}
                        role={problem.type === "multi-select" ? "checkbox" : "radio"}
                        aria-checked={sel}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True/False */}
              {problem.type === "true-false" && (
                <div className="flex gap-3 mb-5" role="radiogroup">
                  <button onClick={() => handleSelect("prime")}
                    className="flex-1 rounded-xl px-6 py-3 text-base font-semibold min-h-[48px] transition-all"
                    style={{ backgroundColor: selectedAnswers[0] === "prime" ? C.primeBg : "transparent", border: `2px solid ${selectedAnswers[0] === "prime" ? C.primeGlow : C.border}`, color: selectedAnswers[0] === "prime" ? C.primeGlow : C.textSecondary }}
                    role="radio" aria-checked={selectedAnswers[0] === "prime"}>
                    Prime
                  </button>
                  <button onClick={() => handleSelect("not-prime")}
                    className="flex-1 rounded-xl px-6 py-3 text-base font-semibold min-h-[48px] transition-all"
                    style={{ backgroundColor: selectedAnswers[0] === "not-prime" ? C.compositeBg : "transparent", border: `2px solid ${selectedAnswers[0] === "not-prime" ? C.composite : C.border}`, color: selectedAnswers[0] === "not-prime" ? C.composite : C.textSecondary }}
                    role="radio" aria-checked={selectedAnswers[0] === "not-prime"}>
                    Not Prime
                  </button>
                </div>
              )}

              {/* Numeric input */}
              {problem.type === "numeric-input" && (
                <div className="mb-5 flex justify-center">
                  <input type="text" inputMode="numeric" value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-20 rounded-lg px-3 py-3 text-center text-2xl font-bold outline-none"
                    style={{ backgroundColor: C.surfaceDeep, border: `2px solid ${C.border}`, color: C.textPrimary }}
                    aria-label="Enter a number"
                    onFocus={(e) => { e.currentTarget.style.borderColor = C.composite; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = C.border; }} />
                </div>
              )}

              <button onClick={handleSubmit} disabled={!canSubmit}
                className={cn("w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px] transition-all duration-150", !canSubmit && "opacity-40 cursor-not-allowed")}
                style={{ backgroundColor: C.composite }} aria-disabled={!canSubmit}>
                Check Answer
              </button>
            </>
          )}

          {phase === "feedback" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} aria-live="assertive">
              <div className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
                style={{
                  backgroundColor: isCorrect ? "rgba(52,211,153,0.15)" : "rgba(148,163,184,0.15)",
                  color: isCorrect ? C.valid : C.textMuted,
                  border: `1px solid ${isCorrect ? C.valid : C.textMuted}`,
                }}>
                {isCorrect ? "Correct!" : "Not quite \u2014 let\u2019s think about this..."}
              </div>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: C.textSecondary }}>{getFeedbackText()}</p>
              <button onClick={handleNext}
                className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px]"
                style={{ backgroundColor: C.composite }}>
                {problemIdx + 1 >= PROBLEMS.length ? "Continue" : "Next \u2192"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 7 — REFLECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const REFL_PROMPT = "Imagine explaining to a friend why prime numbers are called the \u2018building blocks\u2019 or \u2018atoms\u2019 of math. What would you say?";
const REFL_MIN = 20;
const REFL_MAX = 800;

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const ok = text.trim().length >= REFL_MIN;

  if (submitted || skipped) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <motion.div className="w-full max-w-lg text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={GENTLE_SPRING}>
          {submitted && (
            <div className="mb-6 rounded-2xl p-5" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: C.primeBg }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill={C.primeGlow}>
                    <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold" style={{ color: C.primeGlow }}>Great reflection!</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>
                Thanks for sharing your thinking! Explaining concepts in your own words is one of the best ways to truly understand them.
              </p>
            </div>
          )}
          <CTAButton label="Complete Lesson" onClick={onComplete} ariaLabel="Complete the Prime Numbers lesson" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col justify-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(167,139,250,0.1)" }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2}>
            <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 013.002 3.002L7.368 18.635a2 2 0 01-.855.506l-2.872.838a.5.5 0 01-.62-.62l.838-2.872a2 2 0 01.506-.854z" />
          </svg>
        </div>
        <h2 className="mb-2 text-lg font-bold" style={{ color: C.textPrimary }}>Reflect &amp; Explain</h2>
        <div className="mb-6 rounded-2xl p-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.primeGlow}` }}>
          <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{REFL_PROMPT}</p>
        </div>
        <textarea value={text} onChange={(e) => { if (e.target.value.length <= REFL_MAX) setText(e.target.value); }}
          placeholder="I'd tell my friend that..." rows={5}
          className="w-full resize-none rounded-xl px-4 py-3 outline-none"
          style={{ backgroundColor: C.surfaceDeep, border: `1px solid ${C.border}`, color: C.textPrimary, fontSize: 16, minHeight: 120, maxHeight: 300 }}
          aria-label="Write your reflection explaining why prime numbers are the building blocks of math" />
        <div className="mt-2 flex justify-between">
          <span className="text-xs" style={{ color: ok ? C.valid : C.textDim }}>{text.trim().length}/{REFL_MIN} min characters</span>
          <span className="text-xs" style={{ color: C.textDim }}>{text.length}/{REFL_MAX}</span>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-2 pb-8">
        <CTAButton label="Share My Thinking" onClick={() => setSubmitted(true)} disabled={!ok} ariaLabel="Submit your reflection" />
        <button onClick={() => setSkipped(true)} className="text-xs min-h-[44px] px-4" style={{ color: C.textDimmer }} aria-label="Skip reflection">
          Skip
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — PrimeNumbersLesson
   ═══════════════════════════════════════════════════════════════════════════ */

export function PrimeNumbersLesson({ onComplete }: PrimeNumbersLessonProps) {
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
      case "symbol":     return <SymbolBridgeStage onComplete={advance} />;
      case "realWorld":  return <RealWorldStage onComplete={advance} />;
      case "practice":   return <PracticeStage onComplete={advance} />;
      case "reflection": return <ReflectionStage onComplete={finish} />;
      default:           return null;
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-nm-bg-primary">
      {/* Stage progress indicator */}
      <div className="sticky top-0 z-10 flex items-center gap-2 bg-nm-bg-primary/95 px-4 py-3 backdrop-blur-sm">
        {STAGE_ORDER.map((s, i) => (
          <div key={s} className="flex-1 h-1.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= si ? C.composite : C.border, opacity: i <= si ? 1 : 0.3 }}
            role="progressbar" aria-valuenow={i <= si ? 100 : 0} aria-valuemin={0} aria-valuemax={100}
            aria-label={`Stage ${i + 1}: ${s}`} />
        ))}
      </div>

      <main className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={stage} className="flex flex-1 flex-col"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}>
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
