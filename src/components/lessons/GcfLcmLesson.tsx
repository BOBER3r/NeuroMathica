"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

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

interface GcfLcmLessonProps {
  onComplete?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED TOKEN ALIASES
   ═══════════════════════════════════════════════════════════════════════════ */

const SPRING = springs.default;
const SPRING_POP = springs.pop;
const SPRING_STIFF = springs.stiff;
const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const SURFACE_ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const PRIMARY = colors.accent.indigo;
const EMERALD = colors.accent.emerald;
const AMBER = colors.accent.amber;
const VIOLET = colors.accent.violet;
const SUCCESS = colors.functional.success;
const INFO = colors.functional.info;

/* ═══════════════════════════════════════════════════════════════════════════
   LESSON-SPECIFIC THEME
   ═══════════════════════════════════════════════════════════════════════════ */

const THEME = {
  numberABg: "rgba(129,140,248,0.06)",
  numberAStroke: "#6366f1",
  numberBBg: "rgba(52,211,153,0.06)",
  numberBStroke: "#059669",
  gcfBg: "rgba(251,191,36,0.08)",
  textLight: "#e2e8f0",   // slate-200, lighter than tokens text.secondary
  amber500: "#f59e0b",    // amber-500, distinct from tokens amber-400
} as const;

const LAYER_COLORS: Record<number, string> = {
  0: INFO,
  1: VIOLET,
  2: THEME.amber500,
};

/* ═══════════════════════════════════════════════════════════════════════════
   MATH UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

function primeFactorize(n: number): number[] {
  const factors: number[] = [];
  let val = n;
  for (let d = 2; d * d <= val; d++) {
    while (val % d === 0) {
      factors.push(d);
      val /= d;
    }
  }
  if (val > 1) factors.push(val);
  return factors;
}

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function lcmOf(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

/** Generate the max-count tile set for a Venn challenge. */
function vennTiles(a: number, b: number): number[] {
  const fa = primeFactorize(a);
  const fb = primeFactorize(b);
  const countA = new Map<number, number>();
  const countB = new Map<number, number>();
  for (const p of fa) countA.set(p, (countA.get(p) ?? 0) + 1);
  for (const p of fb) countB.set(p, (countB.get(p) ?? 0) + 1);
  const primes = new Set([...countA.keys(), ...countB.keys()]);
  const tiles: number[] = [];
  for (const p of primes) {
    const max = Math.max(countA.get(p) ?? 0, countB.get(p) ?? 0);
    for (let i = 0; i < max; i++) tiles.push(p);
  }
  tiles.sort((x, y) => x - y);
  return tiles;
}

/** Compute correct Venn placement: left crescent, overlap, right crescent. */
function correctVennPlacement(
  a: number,
  b: number,
): { left: number[]; overlap: number[]; right: number[] } {
  const fa = primeFactorize(a);
  const fb = primeFactorize(b);
  const countA = new Map<number, number>();
  const countB = new Map<number, number>();
  for (const p of fa) countA.set(p, (countA.get(p) ?? 0) + 1);
  for (const p of fb) countB.set(p, (countB.get(p) ?? 0) + 1);
  const primes = new Set([...countA.keys(), ...countB.keys()]);

  const left: number[] = [];
  const overlap: number[] = [];
  const right: number[] = [];
  for (const p of primes) {
    const ca = countA.get(p) ?? 0;
    const cb = countB.get(p) ?? 0;
    const shared = Math.min(ca, cb);
    const onlyA = ca - shared;
    const onlyB = cb - shared;
    for (let i = 0; i < shared; i++) overlap.push(p);
    for (let i = 0; i < onlyA; i++) left.push(p);
    for (let i = 0; i < onlyB; i++) right.push(p);
  }
  left.sort((x, y) => x - y);
  overlap.sort((x, y) => x - y);
  right.sort((x, y) => x - y);
  return { left, overlap, right };
}

function product(arr: number[]): number {
  return arr.length === 0 ? 1 : arr.reduce((acc, v) => acc * v, 1);
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function XpFloat({ amount }: { amount: number }) {
  return (
    <motion.span
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 text-xs font-bold"
      style={{ color: AMBER }}
    >
      +{amount} XP
    </motion.span>
  );
}

/* CTAButton removed — now using shared ContinueButton from ui/ */

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK
   Two metronomes ticking at different rates; sync at beat 12 (LCM).
   ═══════════════════════════════════════════════════════════════════════════ */

type HookPhase =
  | "init"
  | "teaser"
  | "beat3"
  | "beat4"
  | "beat6"
  | "beat8"
  | "beat9"
  | "sync12"
  | "annotation"
  | "lcmLabel"
  | "gcfTease"
  | "ready";

const HOOK_PHASES: HookPhase[] = [
  "init", "teaser", "beat3", "beat4", "beat6", "beat8", "beat9",
  "sync12", "annotation", "lcmLabel", "gcfTease", "ready",
];

const HOOK_DELAYS: Record<HookPhase, number> = {
  init: 800,
  teaser: 1000,
  beat3: 500,
  beat4: 500,
  beat6: 500,
  beat8: 500,
  beat9: 750,
  sync12: 1200,
  annotation: 1800,
  lcmLabel: 1800,
  gcfTease: 1500,
  ready: 0,
};

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/GcfLcmHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState<HookPhase>("init");
  const tRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const phaseIdx = HOOK_PHASES.indexOf(phase);

  useEffect(() => {
    if (phase === "ready") return;
    const nextIdx = phaseIdx + 1;
    if (nextIdx >= HOOK_PHASES.length) return;
    const delay = HOOK_DELAYS[phase];
    tRef.current = setTimeout(() => {
      setPhase(HOOK_PHASES[nextIdx]!);
    }, delay);
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, [phase, phaseIdx]);

  // Failsafe: guarantee Continue button within 4s
  useEffect(() => {
    const failsafe = setTimeout(() => setPhase("ready"), 4000);
    return () => clearTimeout(failsafe);
  }, []);

  // Beat track layout
  const trackY = 220;
  const trackLeft = 20;
  const trackRight = 380;
  const trackWidth = trackRight - trackLeft;

  const beatX = (beat: number) => trackLeft + (beat / 12) * trackWidth;

  // Which beats have been reached
  const shownIndigoBeats = useMemo(() => {
    const beats: number[] = [];
    if (phaseIdx >= 2) beats.push(3);
    if (phaseIdx >= 4) beats.push(6);
    if (phaseIdx >= 6) beats.push(9);
    if (phaseIdx >= 7) beats.push(12);
    return beats;
  }, [phaseIdx]);

  const shownEmeraldBeats = useMemo(() => {
    const beats: number[] = [];
    if (phaseIdx >= 3) beats.push(4);
    if (phaseIdx >= 5) beats.push(8);
    if (phaseIdx >= 7) beats.push(12);
    return beats;
  }, [phaseIdx]);

  const showSync = phaseIdx >= 7;
  const showAnnotation = phaseIdx >= 8;
  const showLcmLabel = phaseIdx >= 9;
  const showGcfTease = phaseIdx >= 10;
  const showCTA = phase === "ready";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <svg viewBox="0 0 400 360" className="w-full max-w-md" role="img" aria-label="Two metronomes ticking at different rates, syncing at beat 12">
        {/* Teaser text */}
        {phaseIdx >= 1 && (
          <motion.text
            x={200} y={30}
            textAnchor={"middle" as const}
            fill={TEXT_SEC}
            fontSize={18}
            fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            When do they sync up?
          </motion.text>
        )}

        {/* Left metronome arm + bob */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING}
          style={{ transformOrigin: "130px 80px" }}
        >
          <rect x={128} y={80} width={4} height={80} rx={2} fill={PRIMARY} />
          <circle cx={130} cy={160} r={10} fill={PRIMARY} stroke={THEME.numberAStroke} strokeWidth={1.5} />
        </motion.g>

        {/* Left metronome label */}
        <motion.text
          x={130} y={185}
          textAnchor={"middle" as const}
          fill={PRIMARY}
          fontSize={14}
          fontWeight={600}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={SPRING}
        >
          Every 3 beats
        </motion.text>

        {/* Right metronome arm + bob */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...SPRING, delay: 0.15 }}
          style={{ transformOrigin: "270px 80px" }}
        >
          <rect x={268} y={80} width={4} height={80} rx={2} fill={EMERALD} />
          <circle cx={270} cy={160} r={10} fill={EMERALD} stroke={THEME.numberBStroke} strokeWidth={1.5} />
        </motion.g>

        {/* Right metronome label */}
        <motion.text
          x={270} y={185}
          textAnchor={"middle" as const}
          fill={EMERALD}
          fontSize={14}
          fontWeight={600}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...SPRING, delay: 0.15 }}
        >
          Every 4 beats
        </motion.text>

        {/* Beat track baseline */}
        <line x1={trackLeft} y1={trackY} x2={trackRight} y2={trackY} stroke={SURFACE} strokeWidth={1} />

        {/* Tick marks and labels */}
        {Array.from({ length: 13 }, (_, i) => {
          const x = beatX(i);
          const isSyncBeat = i === 12 && showSync;
          return (
            <g key={`tick-${i}`}>
              <line x1={x} y1={trackY - 5} x2={x} y2={trackY + 5} stroke={SURFACE_ELEVATED} strokeWidth={1} />
              <text
                x={x}
                y={trackY + 18}
                textAnchor={"middle" as const}
                fontSize={11}
                fill={isSyncBeat ? AMBER : colors.bg.elevated}
                fontWeight={isSyncBeat ? 700 : 400}
              >
                {i}
              </text>
            </g>
          );
        })}

        {/* Indigo beat markers */}
        {shownIndigoBeats.map((b) => (
          b !== 12 ? (
            <motion.circle
              key={`ib-${b}`}
              cx={beatX(b)}
              cy={trackY}
              r={5}
              fill={PRIMARY}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={SPRING_POP}
            />
          ) : null
        ))}

        {/* Emerald beat markers */}
        {shownEmeraldBeats.map((b) => (
          b !== 12 ? (
            <motion.circle
              key={`eb-${b}`}
              cx={beatX(b)}
              cy={trackY}
              r={5}
              fill={EMERALD}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={SPRING_POP}
            />
          ) : null
        ))}

        {/* Sync marker at 12 */}
        {showSync && (
          <motion.circle
            cx={beatX(12)}
            cy={trackY}
            r={8}
            fill="url(#syncGrad)"
            stroke={AMBER}
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={SPRING_POP}
          />
        )}

        {/* Gradient defs */}
        <defs>
          <radialGradient id="syncGrad">
            <stop offset="0%" stopColor={PRIMARY} />
            <stop offset="100%" stopColor={EMERALD} />
          </radialGradient>
        </defs>

        {/* Annotation: "Beat 12: they sync!" */}
        {showAnnotation && (
          <>
            <motion.text
              x={200} y={260}
              textAnchor={"middle" as const}
              fill={AMBER}
              fontSize={20}
              fontWeight={700}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Beat 12: they sync!
            </motion.text>
            <motion.text
              x={200} y={280}
              textAnchor={"middle" as const}
              fill={THEME.textLight}
              fontSize={14}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              12 is the smallest number in BOTH lists.
            </motion.text>
            <motion.text
              x={200} y={300}
              textAnchor={"middle" as const}
              fill={PRIMARY}
              fontSize={13}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {"Multiples of 3: 3, 6, 9, 12, 15, 18\u2026"}
            </motion.text>
            <motion.text
              x={200} y={318}
              textAnchor={"middle" as const}
              fill={EMERALD}
              fontSize={13}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              {"Multiples of 4: 4, 8, 12, 16, 20, 24\u2026"}
            </motion.text>
          </>
        )}
      </svg>

      {/* LCM label */}
      {showLcmLabel && (
        <motion.p
          className="mt-2 text-center text-lg"
          style={{ color: TEXT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {"This is called the "}
          <span style={{ color: AMBER, fontWeight: 700 }}>
            Least Common Multiple
          </span>
          .
        </motion.p>
      )}

      {/* GCF tease */}
      {showGcfTease && (
        <motion.p
          className="mt-1 text-center text-lg"
          style={{ color: TEXT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {"But what about the "}
          <span style={{ color: PRIMARY, fontWeight: 700 }}>
            BIGGEST factor
          </span>
          {" they SHARE?"}
        </motion.p>
      )}

      <ContinueButton
        onClick={onComplete}
        disabled={!showCTA}
        color={PRIMARY}
      >
        {"Explore GCF & LCM"}
      </ContinueButton>

      {/* Accessibility narration */}
      <div aria-live="polite" className="sr-only">
        {showSync
          ? "Both metronomes tick together at beat 12! 12 is the Least Common Multiple of 3 and 4."
          : null}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE
   Phase A: Venn Diagram Factor Sorter (3 challenges)
   Phase B: Dual Number Line
   ═══════════════════════════════════════════════════════════════════════════ */

interface VennChallenge {
  a: number;
  b: number;
  tiles: number[];
  refA: string;
  refB: string;
}

const VENN_CHALLENGES: VennChallenge[] = [
  { a: 12, b: 18, tiles: vennTiles(12, 18), refA: "12 = 2 \u00d7 2 \u00d7 3", refB: "18 = 2 \u00d7 3 \u00d7 3" },
  { a: 8, b: 20, tiles: vennTiles(8, 20), refA: "8 = 2 \u00d7 2 \u00d7 2", refB: "20 = 2 \u00d7 2 \u00d7 5" },
  { a: 9, b: 14, tiles: vennTiles(9, 14), refA: "9 = 3 \u00d7 3", refB: "14 = 2 \u00d7 7" },
];

type VennZone = "tray" | "left" | "overlap" | "right";

interface TileState {
  value: number;
  id: number;
  zone: VennZone;
}

interface NumberLineExample {
  a: number;
  b: number;
  lcmVal: number;
  annotation: string;
}

const NL_EXAMPLES: NumberLineExample[] = [
  {
    a: 3, b: 4, lcmVal: 12,
    annotation: "The metronomes sync at every common multiple: 12, 24\u2026 The FIRST sync is the LCM!",
  },
  {
    a: 6, b: 8, lcmVal: 24,
    annotation: "6 \u00d7 8 = 48, but LCM = 24, not 48! Because 6 and 8 share the factor 2.",
  },
];

function buildInitialTiles(idx: number): TileState[] {
  const ch = VENN_CHALLENGES[idx];
  if (!ch) return [];
  return ch.tiles.map((v, i) => ({ value: v, id: i, zone: "tray" as VennZone }));
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [spatialPhase, setSpatialPhase] = useState<"venn" | "numberLine">("venn");
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [tiles, setTiles] = useState<TileState[]>(() => buildInitialTiles(0));
  const [interactionCount, setInteractionCount] = useState(0);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [nlExampleIdx, setNlExampleIdx] = useState(0);

  const challenge = VENN_CHALLENGES[challengeIdx];
  const correct = challenge ? correctVennPlacement(challenge.a, challenge.b) : null;

  // Get tiles in each zone
  const trayTiles = useMemo(() => tiles.filter((t) => t.zone === "tray"), [tiles]);
  const leftTiles = useMemo(() => tiles.filter((t) => t.zone === "left"), [tiles]);
  const overlapTiles = useMemo(() => tiles.filter((t) => t.zone === "overlap"), [tiles]);
  const rightTiles = useMemo(() => tiles.filter((t) => t.zone === "right"), [tiles]);

  // Live GCF / LCM readout
  const overlapProduct = product(overlapTiles.map((t) => t.value));
  const allPlacedProduct = product(
    [...leftTiles, ...overlapTiles, ...rightTiles].map((t) => t.value),
  );
  const allPlaced = trayTiles.length === 0;

  // Check correctness
  const isCorrectPlacement = useMemo(() => {
    if (!correct || !allPlaced) return false;
    const leftVals = leftTiles.map((t) => t.value).sort((a, b) => a - b);
    const overlapVals = overlapTiles.map((t) => t.value).sort((a, b) => a - b);
    const rightVals = rightTiles.map((t) => t.value).sort((a, b) => a - b);
    return (
      JSON.stringify(leftVals) === JSON.stringify(correct.left) &&
      JSON.stringify(overlapVals) === JSON.stringify(correct.overlap) &&
      JSON.stringify(rightVals) === JSON.stringify(correct.right)
    );
  }, [correct, allPlaced, leftTiles, overlapTiles, rightTiles]);

  // Detect completion
  useEffect(() => {
    if (allPlaced && isCorrectPlacement) {
      setChallengeComplete(true);
      setShowHint(false);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    } else if (allPlaced && !isCorrectPlacement) {
      setChallengeComplete(false);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      hintTimerRef.current = setTimeout(() => setShowHint(true), 5000);
    } else {
      setShowHint(false);
      setChallengeComplete(false);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    }
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [allPlaced, isCorrectPlacement]);

  const moveTile = useCallback((tileId: number, toZone: VennZone) => {
    setTiles((prev) =>
      prev.map((t) => (t.id === tileId ? { ...t, zone: toZone } : t)),
    );
    setInteractionCount((c) => c + 1);
  }, []);

  const nextChallenge = useCallback(() => {
    const nextIdx = challengeIdx + 1;
    if (nextIdx >= VENN_CHALLENGES.length) {
      setSpatialPhase("numberLine");
    } else {
      setChallengeIdx(nextIdx);
      setTiles(buildInitialTiles(nextIdx));
      setChallengeComplete(false);
      setShowHint(false);
    }
  }, [challengeIdx]);

  const canContinue = spatialPhase === "numberLine" && interactionCount >= 10;

  // Coprime annotation
  const isCoprime = correct !== null && correct.overlap.length === 0;

  if (spatialPhase === "venn" && challenge && correct) {
    return (
      <div className="flex flex-1 flex-col items-center px-4 pt-2">
        {/* Instruction */}
        <div className="w-full max-w-lg rounded-xl bg-nm-bg-secondary p-3 mb-3">
          <p className="text-center text-base font-semibold" style={{ color: TEXT }}>
            Sort the prime factors!
          </p>
          <div className="flex justify-center gap-4 mt-1">
            <span className="text-sm" style={{ color: PRIMARY }}>{challenge.refA}</span>
            <span className="text-sm" style={{ color: EMERALD }}>{challenge.refB}</span>
          </div>
          <p className="text-center text-xs mt-1" style={{ color: MUTED }}>
            Challenge {challengeIdx + 1} of {VENN_CHALLENGES.length}
          </p>
        </div>

        {/* Venn Diagram */}
        <div className="w-full max-w-lg">
          <svg viewBox="0 0 400 260" className="w-full" role="application" aria-label={`Prime Factor Venn Diagram: sort prime factors of ${challenge.a} and ${challenge.b}`}>
            {/* Left circle */}
            <circle cx={155} cy={130} r={95} fill={THEME.numberABg} stroke={PRIMARY} strokeWidth={1.5} strokeDasharray="6 3" />
            {/* Right circle */}
            <circle cx={245} cy={130} r={95} fill={THEME.numberBBg} stroke={EMERALD} strokeWidth={1.5} strokeDasharray="6 3" />

            {/* Overlap region indicator via clipPath */}
            <defs>
              <clipPath id={`clipL-${challengeIdx}`}>
                <circle cx={155} cy={130} r={95} />
              </clipPath>
              <clipPath id={`clipR-${challengeIdx}`}>
                <circle cx={245} cy={130} r={95} />
              </clipPath>
            </defs>
            {/* Amber overlap: a rect clipped to left circle, then further by right circle */}
            <circle cx={245} cy={130} r={95} fill={THEME.gcfBg} clipPath={`url(#clipL-${challengeIdx})`} />

            {/* Labels above circles */}
            <text x={110} y={28} textAnchor={"middle" as const} fill={PRIMARY} fontSize={20} fontWeight={700}>
              {challenge.a}
            </text>
            <text x={290} y={28} textAnchor={"middle" as const} fill={EMERALD} fontSize={20} fontWeight={700}>
              {challenge.b}
            </text>

            {/* Zone labels */}
            <text x={95} y={130} textAnchor={"middle" as const} fill={PRIMARY} fontSize={11} opacity={0.4}>
              {`Only in ${challenge.a}`}
            </text>
            <text x={200} y={78} textAnchor={"middle" as const} fill={AMBER} fontSize={11} opacity={0.4}>
              Shared
            </text>
            <text x={305} y={130} textAnchor={"middle" as const} fill={EMERALD} fontSize={11} opacity={0.4}>
              {`Only in ${challenge.b}`}
            </text>

            {/* Placed tiles in left crescent */}
            {leftTiles.map((t, i) => {
              const tx = 72 + (i % 2) * 40;
              const ty = 105 + Math.floor(i / 2) * 40;
              return (
                <motion.g key={`pl-${t.id}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING_STIFF}>
                  <rect x={tx} y={ty} width={36} height={36} rx={8} fill={SURFACE} stroke={PRIMARY} strokeWidth={1.5} />
                  <text x={tx + 18} y={ty + 24} textAnchor={"middle" as const} fill={TEXT} fontSize={18} fontWeight={700}>
                    {t.value}
                  </text>
                </motion.g>
              );
            })}

            {/* Placed tiles in overlap */}
            {overlapTiles.map((t, i) => {
              const tx = 182 + (i % 2) * 36;
              const ty = 100 + Math.floor(i / 2) * 40;
              return (
                <motion.g key={`po-${t.id}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING_STIFF}>
                  <rect x={tx} y={ty} width={36} height={36} rx={8} fill={SURFACE} stroke={AMBER} strokeWidth={1.5} />
                  <text x={tx + 18} y={ty + 24} textAnchor={"middle" as const} fill={TEXT} fontSize={18} fontWeight={700}>
                    {t.value}
                  </text>
                </motion.g>
              );
            })}

            {/* Placed tiles in right crescent */}
            {rightTiles.map((t, i) => {
              const tx = 284 + (i % 2) * 40;
              const ty = 105 + Math.floor(i / 2) * 40;
              return (
                <motion.g key={`pr-${t.id}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING_STIFF}>
                  <rect x={tx} y={ty} width={36} height={36} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1.5} />
                  <text x={tx + 18} y={ty + 24} textAnchor={"middle" as const} fill={TEXT} fontSize={18} fontWeight={700}>
                    {t.value}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Source tray - tap-to-place */}
        {trayTiles.length > 0 && (
          <div className="w-full max-w-lg mt-2">
            <p className="text-xs mb-1 text-center" style={{ color: MUTED }}>
              Tap a tile, then tap a zone to place it
            </p>
            <TilePlacer
              trayTiles={trayTiles}
              challengeA={challenge.a}
              challengeB={challenge.b}
              onPlace={moveTile}
            />
          </div>
        )}

        {/* Return buttons for placed tiles */}
        {(leftTiles.length > 0 || overlapTiles.length > 0 || rightTiles.length > 0) && !challengeComplete && (
          <div className="w-full max-w-lg mt-2">
            <p className="text-xs text-center mb-1" style={{ color: MUTED }}>
              Tap placed tiles to return them
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {[...leftTiles, ...overlapTiles, ...rightTiles].map((t) => (
                <button
                  key={`ret-${t.id}`}
                  onClick={() => moveTile(t.id, "tray")}
                  className="min-h-[44px] min-w-[44px] rounded-lg px-3 py-2 text-sm font-bold active:scale-95"
                  style={{
                    backgroundColor: SURFACE,
                    border: `1px solid ${SURFACE_ELEVATED}`,
                    color: TEXT,
                  }}
                >
                  {t.value} {"\u2190"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GCF/LCM readout */}
        <div className="w-full max-w-lg flex justify-center gap-6 mt-3">
          <motion.p className="text-lg" key={`gcf-r-${overlapProduct}`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.2 }}>
            <span style={{ color: AMBER, fontWeight: 700 }}>GCF</span>
            {" = "}
            <span style={{ color: TEXT }}>
              {overlapProduct}{!allPlaced ? "\u2026" : ""}
            </span>
          </motion.p>
          <motion.p className="text-lg" key={`lcm-r-${allPlacedProduct}`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.2 }}>
            <span style={{ color: PRIMARY, fontWeight: 700 }}>LCM</span>
            {" = "}
            <span style={{ color: TEXT }}>
              {allPlacedProduct}{!allPlaced ? "\u2026" : ""}
            </span>
          </motion.p>
        </div>

        {/* Hint */}
        {showHint && !challengeComplete && (
          <motion.p
            className="mt-2 text-sm italic text-center max-w-lg"
            style={{ color: TEXT_SEC }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Hmm, check which factors BOTH numbers share. Try swapping some tiles.
          </motion.p>
        )}

        {/* Completion annotation */}
        {challengeComplete && (
          <motion.div
            className="mt-3 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_POP}
          >
            <p className="text-sm" style={{ color: AMBER }}>
              {"GCF("}{challenge.a}{", "}{challenge.b}{") = "}
              {product(correct.overlap)}
              {" \u2014 the product of the SHARED factors!"}
            </p>
            <p className="text-sm" style={{ color: PRIMARY }}>
              {"LCM("}{challenge.a}{", "}{challenge.b}{") = "}
              {product([...correct.left, ...correct.overlap, ...correct.right])}
              {" \u2014 the product of ALL unique factors!"}
            </p>
            {isCoprime && (
              <p className="text-sm mt-1" style={{ color: AMBER }}>
                {"No shared factors! GCF = 1. These numbers are called "}
                <span style={{ fontWeight: 700 }}>coprime</span>.
              </p>
            )}
            <div className="mt-3">
              <button
                onClick={nextChallenge}
                className="min-h-[44px] min-w-[44px] rounded-xl px-6 py-3 text-base font-semibold text-white active:scale-95"
                style={{ backgroundColor: PRIMARY }}
              >
                {challengeIdx + 1 >= VENN_CHALLENGES.length ? "See Number Lines" : "Next Challenge"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Phase B: Number Line
  const nlExample = NL_EXAMPLES[nlExampleIdx];

  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-2">
      <div className="w-full max-w-lg rounded-xl bg-nm-bg-secondary p-3 mb-3">
        <p className="text-center text-base font-semibold" style={{ color: TEXT }}>
          Find where they land together!
        </p>
      </div>

      {nlExample && (
        <NumberLineDisplay
          key={`nl-${nlExampleIdx}`}
          a={nlExample.a}
          b={nlExample.b}
          lcmVal={nlExample.lcmVal}
          annotation={nlExample.annotation}
          onInteract={() => setInteractionCount((c) => c + 1)}
        />
      )}

      {nlExampleIdx + 1 < NL_EXAMPLES.length && (
        <button
          onClick={() => setNlExampleIdx((i) => i + 1)}
          className="mt-3 min-h-[44px] min-w-[44px] rounded-xl px-5 py-2 text-sm font-semibold text-white active:scale-95"
          style={{ backgroundColor: PRIMARY }}
        >
          {"Next Example \u2192"}
        </button>
      )}

      <ContinueButton
        onClick={onComplete}
        disabled={!canContinue}
        color={PRIMARY}
      >
        Continue
      </ContinueButton>
    </div>
  );
}

/** Tap-to-place tile placer (accessible alternative to drag). */
function TilePlacer({
  trayTiles,
  challengeA,
  challengeB,
  onPlace,
}: {
  trayTiles: TileState[];
  challengeA: number;
  challengeB: number;
  onPlace: (tileId: number, zone: VennZone) => void;
}) {
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);

  const handleTileTap = (id: number) => {
    setSelectedTileId(id === selectedTileId ? null : id);
  };

  const handleZoneTap = (zone: VennZone) => {
    if (selectedTileId === null) return;
    onPlace(selectedTileId, zone);
    setSelectedTileId(null);
  };

  return (
    <div>
      {/* Tile buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        {trayTiles.map((t) => (
          <button
            key={`tile-${t.id}`}
            onClick={() => handleTileTap(t.id)}
            className={cn(
              "min-h-[48px] min-w-[48px] rounded-lg text-xl font-bold transition-all active:scale-95",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
            )}
            style={{
              backgroundColor: SURFACE,
              border: `2px solid ${selectedTileId === t.id ? PRIMARY : SURFACE_ELEVATED}`,
              color: TEXT,
            }}
            aria-pressed={selectedTileId === t.id}
          >
            {t.value}
          </button>
        ))}
      </div>

      {/* Zone buttons (shown when a tile is selected) */}
      {selectedTileId !== null && (
        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            onClick={() => handleZoneTap("left")}
            className="min-h-[44px] rounded-lg px-3 py-2 text-xs font-semibold active:scale-95"
            style={{ backgroundColor: THEME.numberABg, border: `1px solid ${PRIMARY}`, color: PRIMARY }}
          >
            {`Only ${challengeA}`}
          </button>
          <button
            onClick={() => handleZoneTap("overlap")}
            className="min-h-[44px] rounded-lg px-3 py-2 text-xs font-semibold active:scale-95"
            style={{ backgroundColor: THEME.gcfBg, border: `1px solid ${AMBER}`, color: AMBER }}
          >
            Shared
          </button>
          <button
            onClick={() => handleZoneTap("right")}
            className="min-h-[44px] rounded-lg px-3 py-2 text-xs font-semibold active:scale-95"
            style={{ backgroundColor: THEME.numberBBg, border: `1px solid ${EMERALD}`, color: EMERALD }}
          >
            {`Only ${challengeB}`}
          </button>
        </motion.div>
      )}
    </div>
  );
}

/** Dual number line display. */
function NumberLineDisplay({
  a,
  b,
  lcmVal,
  annotation,
  onInteract,
}: {
  a: number;
  b: number;
  lcmVal: number;
  annotation: string;
  onInteract: () => void;
}) {
  const [tapped, setTapped] = useState<number | null>(null);

  const margin = 30;
  const lineWidth = 340;
  const rangeMax = lcmVal + Math.max(a, b) * 2;
  const topY = 60;
  const botY = 160;

  const posX = useCallback(
    (val: number) => margin + (val / rangeMax) * lineWidth,
    [margin, lineWidth, rangeMax],
  );

  const multiplesA = useMemo(() => {
    const arr: number[] = [];
    for (let m = a; m <= rangeMax; m += a) arr.push(m);
    return arr;
  }, [a, rangeMax]);

  const multiplesB = useMemo(() => {
    const arr: number[] = [];
    for (let m = b; m <= rangeMax; m += b) arr.push(m);
    return arr;
  }, [b, rangeMax]);

  const commonMultiples = useMemo(
    () => multiplesA.filter((m) => m % b === 0),
    [multiplesA, b],
  );

  const handleDotTap = useCallback(
    (val: number) => {
      setTapped(val);
      onInteract();
    },
    [onInteract],
  );

  return (
    <div className="w-full max-w-lg">
      <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label={`Number lines showing multiples of ${a} and ${b}, meeting at ${lcmVal}`}>
        {/* Top number line */}
        <line x1={margin} y1={topY} x2={margin + lineWidth} y2={topY} stroke={PRIMARY} strokeWidth={2} />
        <polygon points={`${margin + lineWidth},${topY - 4} ${margin + lineWidth + 8},${topY} ${margin + lineWidth},${topY + 4}`} fill={PRIMARY} />

        {/* Top multiples and hop arcs */}
        {multiplesA.map((m, i) => {
          const x = posX(m);
          const prevX = i > 0 ? posX(multiplesA[i - 1]!) : posX(0);
          const isCommon = m % b === 0;
          return (
            <g key={`ta-${m}`}>
              <motion.path
                d={`M ${prevX} ${topY} Q ${(prevX + x) / 2} ${topY - 25} ${x} ${topY}`}
                stroke={PRIMARY}
                strokeWidth={1.5}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: i * 0.15 }}
              />
              <motion.circle
                cx={x}
                cy={topY}
                r={isCommon ? 7 : 5}
                fill={PRIMARY}
                stroke={isCommon ? AMBER : "none"}
                strokeWidth={isCommon ? 2 : 0}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING_POP, delay: i * 0.15 + 0.2 }}
                onClick={() => handleDotTap(m)}
                className="cursor-pointer"
                data-interactive="true"
              />
              <text x={x} y={topY - 12} textAnchor={"middle" as const} fill={isCommon ? AMBER : PRIMARY} fontSize={12} fontWeight={isCommon ? 700 : 400}>
                {m}
              </text>
            </g>
          );
        })}

        {/* Bottom number line */}
        <line x1={margin} y1={botY} x2={margin + lineWidth} y2={botY} stroke={EMERALD} strokeWidth={2} />
        <polygon points={`${margin + lineWidth},${botY - 4} ${margin + lineWidth + 8},${botY} ${margin + lineWidth},${botY + 4}`} fill={EMERALD} />

        {/* Bottom multiples and hop arcs */}
        {multiplesB.map((m, i) => {
          const x = posX(m);
          const prevX = i > 0 ? posX(multiplesB[i - 1]!) : posX(0);
          const isCommon = m % a === 0;
          return (
            <g key={`tb-${m}`}>
              <motion.path
                d={`M ${prevX} ${botY} Q ${(prevX + x) / 2} ${botY - 25} ${x} ${botY}`}
                stroke={EMERALD}
                strokeWidth={1.5}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: i * 0.15 }}
              />
              <motion.circle
                cx={x}
                cy={botY}
                r={isCommon ? 7 : 5}
                fill={EMERALD}
                stroke={isCommon ? AMBER : "none"}
                strokeWidth={isCommon ? 2 : 0}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING_POP, delay: i * 0.15 + 0.2 }}
                onClick={() => handleDotTap(m)}
                className="cursor-pointer"
                data-interactive="true"
              />
              <text x={x} y={botY + 18} textAnchor={"middle" as const} fill={isCommon ? AMBER : EMERALD} fontSize={12} fontWeight={isCommon ? 700 : 400}>
                {m}
              </text>
            </g>
          );
        })}

        {/* Common multiple connectors */}
        {commonMultiples.map((m) => {
          const x = posX(m);
          const isFirst = m === lcmVal;
          return (
            <g key={`cm-${m}`}>
              <line x1={x} y1={topY + 8} x2={x} y2={botY - 8} stroke={AMBER} strokeWidth={1.5} strokeDasharray="4 4" />
              <text x={x} y={(topY + botY) / 2 + 4} textAnchor={"middle" as const} fill={AMBER} fontSize={isFirst ? 16 : 14} fontWeight={700}>
                {m}
              </text>
              {isFirst && (
                <motion.text
                  x={x}
                  y={(topY + botY) / 2 + 20}
                  textAnchor={"middle" as const}
                  fill={AMBER}
                  fontSize={12}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_POP}
                >
                  LCM!
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Tooltip */}
        {tapped !== null && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect
              x={Math.max(5, Math.min(posX(tapped) - 60, 335))}
              y={210}
              width={120}
              height={24}
              rx={6}
              fill={SURFACE}
              stroke={commonMultiples.includes(tapped) ? AMBER : SURFACE_ELEVATED}
              strokeWidth={1}
            />
            <text
              x={Math.max(65, Math.min(posX(tapped), 395))}
              y={226}
              textAnchor={"middle" as const}
              fill={commonMultiples.includes(tapped) ? AMBER : THEME.textLight}
              fontSize={11}
            >
              {commonMultiples.includes(tapped)
                ? `${tapped} is a COMMON multiple!`
                : `${tapped} is a multiple of ${tapped % a === 0 ? a : b}`}
            </text>
          </motion.g>
        )}
      </svg>

      {/* Annotation */}
      <p className="text-sm text-center mt-1 px-2" style={{ color: THEME.textLight }}>
        {annotation}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY
   Five prompts with visuals and micro-interactions
   ═══════════════════════════════════════════════════════════════════════════ */

interface DiscoveryPrompt {
  id: string;
  text: string;
  microCheck?: {
    question: string;
    options: Array<{ label: string; correct: boolean; feedback: string }>;
  };
}

const DISCOVERY_PROMPTS: DiscoveryPrompt[] = [
  {
    id: "naming-gcf",
    text: "Look at the overlap of the Venn diagram for 12 and 18. The shared prime factors are 2 and 3. Multiply them: 2 \u00d7 3 = 6. This is the Greatest Common Factor \u2014 the BIGGEST number that divides both 12 and 18 evenly.",
  },
  {
    id: "naming-lcm",
    text: "Now look at ALL the tiles in the diagram \u2014 the whole union. Multiply them: 2 \u00d7 2 \u00d7 3 \u00d7 3 = 36. This is the Least Common Multiple \u2014 the SMALLEST number that both 12 and 18 divide into.",
  },
  {
    id: "gcf-vs-lcm",
    text: "GCF asks: \u2018What\u2019s the biggest number that fits into both?\u2019 LCM asks: \u2018What\u2019s the smallest number both fit into?\u2019 They\u2019re opposite questions!",
    microCheck: {
      question: "Which is BIGGER: GCF or LCM?",
      options: [
        { label: "GCF", correct: false, feedback: "Not quite \u2014 the GCF divides into both numbers, so it must be SMALLER than either of them." },
        { label: "LCM", correct: true, feedback: "Right! The LCM is always at least as big as the larger number." },
      ],
    },
  },
  {
    id: "coprime-case",
    text: "Remember 9 and 14? They shared NO prime factors \u2014 the overlap was empty. When GCF = 1, the LCM equals the product: 9 \u00d7 14 = 126. But when numbers DO share factors, the LCM is less than the product!",
  },
  {
    id: "fractions",
    text: "GCF simplifies fractions: 12/18 \u00f7 6/6 = 2/3. LCM finds common denominators: to add 1/4 + 1/6, use LCM(4, 6) = 12 as the denominator. GCF and LCM are your fraction superpowers!",
  },
];

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [microAnswer, setMicroAnswer] = useState<string | null>(null);
  const prompt = DISCOVERY_PROMPTS[promptIdx];

  const handleNext = useCallback(() => {
    if (promptIdx + 1 >= DISCOVERY_PROMPTS.length) {
      onComplete();
    } else {
      setPromptIdx((i) => i + 1);
      setMicroAnswer(null);
    }
  }, [promptIdx, onComplete]);

  if (!prompt) return null;

  const micro = prompt.microCheck;
  const showMicroButtons = micro !== undefined && microAnswer === null;
  const microFeedback = micro
    ? micro.options.find((o) => o.label === microAnswer) ?? null
    : null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={prompt.id}
          className="w-full max-w-lg rounded-2xl p-5"
          style={{
            backgroundColor: SURFACE,
            border: `1px solid ${SURFACE_ELEVATED}`,
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={SPRING}
        >
          {/* Prompt counter */}
          <p className="text-xs mb-3" style={{ color: MUTED }}>
            {promptIdx + 1} of {DISCOVERY_PROMPTS.length}
          </p>

          {/* Prompt text */}
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: THEME.textLight }}
            aria-live="polite"
          >
            {prompt.text}
          </p>

          {/* Micro-check question */}
          {showMicroButtons && micro !== undefined && (
            <>
              <p className="text-sm font-medium mb-2" style={{ color: TEXT }}>
                {micro.question}
              </p>
              <div className="flex gap-3 mb-4">
                {micro.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setMicroAnswer(opt.label)}
                    className="flex-1 min-h-[44px] rounded-xl px-4 py-3 text-base font-semibold active:scale-95"
                    style={{
                      backgroundColor: opt.label === "GCF"
                        ? "rgba(251,191,36,0.1)"
                        : "rgba(129,140,248,0.1)",
                      color: opt.label === "GCF" ? AMBER : PRIMARY,
                      border: `1px solid ${opt.label === "GCF" ? AMBER : PRIMARY}`,
                    }}
                    aria-label={`I think ${opt.label} is bigger`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Micro-check feedback */}
          {microFeedback !== null && (
            <motion.p
              className="text-sm mb-4 px-3 py-2 rounded-lg"
              style={{
                color: microFeedback.correct ? SUCCESS : TEXT_SEC,
                backgroundColor: microFeedback.correct
                  ? "rgba(52,211,153,0.1)"
                  : "rgba(148,163,184,0.1)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {microFeedback.feedback}
            </motion.p>
          )}

          {/* Next button (hidden during unanswered micro-check) */}
          {!showMicroButtons && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="min-h-[44px] min-w-[44px] rounded-xl px-6 py-3 text-sm font-semibold text-white active:scale-95"
                style={{ backgroundColor: PRIMARY }}
              >
                {promptIdx + 1 >= DISCOVERY_PROMPTS.length ? "Continue" : "Next"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE
   Formal notation linked to spatial experience
   ═══════════════════════════════════════════════════════════════════════════ */

interface SymbolCard {
  id: string;
  title: string;
  lines: string[];
  highlight: string;
}

const SYMBOL_CARDS: SymbolCard[] = [
  {
    id: "gcf-def",
    title: "GCF Definition",
    lines: [
      "GCF(a, b) = product of shared prime factors",
      "GCF(12, 18) = 2 \u00d7 3 = 6",
      "12 \u00f7 6 = 2 \u2713   18 \u00f7 6 = 3 \u2713",
    ],
    highlight: "GCF",
  },
  {
    id: "lcm-def",
    title: "LCM Definition",
    lines: [
      "LCM(a, b) = product of ALL prime factors (max count of each)",
      "LCM(12, 18) = 2\u00b2 \u00d7 3\u00b2 = 36",
      "36 \u00f7 12 = 3 \u2713   36 \u00f7 18 = 2 \u2713",
    ],
    highlight: "LCM",
  },
  {
    id: "identity",
    title: "The GCF \u00d7 LCM Identity",
    lines: [
      "GCF(a, b) \u00d7 LCM(a, b) = a \u00d7 b",
      "6 \u00d7 36 = 216 = 12 \u00d7 18 \u2713",
      "This always works! GCF captures the overlap, LCM captures the union.",
    ],
    highlight: "identity",
  },
  {
    id: "method",
    title: "Finding GCF & LCM via Prime Factorization",
    lines: [
      "Step 1: Write prime factorizations",
      "  12 = 2\u00b2 \u00d7 3   and   18 = 2 \u00d7 3\u00b2",
      "Step 2: GCF = take MINIMUM exponent of each prime",
      "  2\u00b9 \u00d7 3\u00b9 = 6",
      "Step 3: LCM = take MAXIMUM exponent of each prime",
      "  2\u00b2 \u00d7 3\u00b2 = 36",
    ],
    highlight: "method",
  },
];

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [cardIdx, setCardIdx] = useState(0);
  const card = SYMBOL_CARDS[cardIdx];

  const handleNext = useCallback(() => {
    if (cardIdx + 1 >= SYMBOL_CARDS.length) {
      onComplete();
    } else {
      setCardIdx((i) => i + 1);
    }
  }, [cardIdx, onComplete]);

  if (!card) return null;

  const accentColor =
    card.highlight === "GCF"
      ? AMBER
      : card.highlight === "LCM"
        ? PRIMARY
        : card.highlight === "identity"
          ? AMBER
          : TEXT;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          className="w-full max-w-lg rounded-2xl p-5"
          style={{
            backgroundColor: SURFACE,
            border: card.highlight === "identity"
              ? `2px solid ${AMBER}`
              : `1px solid ${SURFACE_ELEVATED}`,
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={SPRING}
        >
          <p className="text-xs mb-1" style={{ color: MUTED }}>
            {cardIdx + 1} of {SYMBOL_CARDS.length}
          </p>

          <h3
            className="text-lg font-bold mb-4"
            style={{ color: accentColor }}
          >
            {card.title}
          </h3>

          {card.lines.map((line, i) => (
            <motion.p
              key={`${card.id}-line-${i}`}
              className="text-sm leading-relaxed mb-2 font-mono"
              style={{
                color: line.includes("\u2713") ? SUCCESS : THEME.textLight,
                paddingLeft: line.startsWith("  ") ? 16 : 0,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              role="math"
              aria-label={line}
            >
              {line}
            </motion.p>
          ))}

          <div className="flex justify-end mt-4">
            <button
              onClick={handleNext}
              className="min-h-[44px] min-w-[44px] rounded-xl px-6 py-3 text-sm font-semibold text-white active:scale-95"
              style={{ backgroundColor: PRIMARY }}
            >
              {cardIdx + 1 >= SYMBOL_CARDS.length ? "Continue" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 5 — REAL-WORLD ANCHOR
   ═══════════════════════════════════════════════════════════════════════════ */

interface RealWorldCard {
  id: string;
  title: string;
  body: string;
  accentColor: string;
}

const RW_CARDS: RealWorldCard[] = [
  {
    id: "fractions",
    title: "Simplifying Fractions with GCF",
    body: "You baked 24 cookies and ate 16. What fraction did you eat? 16/24 seems messy \u2014 but GCF(16, 24) = 8. Divide both by 8: 16/24 = 2/3. You ate two-thirds of the cookies!",
    accentColor: AMBER,
  },
  {
    id: "scheduling",
    title: "When Do Schedules Sync?",
    body: "Your favorite streamer goes live every 3 days. Your friend\u2019s favorite goes live every 5 days. Both went live today. When will they BOTH be live on the same day again? LCM(3, 5) = 15. In 15 days!",
    accentColor: PRIMARY,
  },
  {
    id: "party-bags",
    title: "Party Favor Bags",
    body: "You have 18 candies and 12 stickers to put into identical party bags with no leftovers. What\u2019s the MOST bags you can make? GCF(18, 12) = 6 bags! Each gets 3 candies and 2 stickers.",
    accentColor: SUCCESS,
  },
];

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [cardIdx, setCardIdx] = useState(0);
  const card = RW_CARDS[cardIdx];

  const handleNext = useCallback(() => {
    if (cardIdx + 1 >= RW_CARDS.length) {
      onComplete();
    } else {
      setCardIdx((i) => i + 1);
    }
  }, [cardIdx, onComplete]);

  if (!card) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          className="w-full max-w-lg rounded-2xl p-5"
          style={{
            backgroundColor: SURFACE,
            border: `1px solid ${SURFACE_ELEVATED}`,
            borderLeft: `4px solid ${card.accentColor}`,
          }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={SPRING}
          role="article"
        >
          <p className="text-xs mb-1" style={{ color: MUTED }}>
            {cardIdx + 1} of {RW_CARDS.length}
          </p>
          <h3
            className="text-lg font-bold mb-3"
            style={{ color: TEXT }}
          >
            {card.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: THEME.textLight }}
          >
            {card.body}
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="min-h-[44px] min-w-[44px] rounded-xl px-6 py-3 text-sm font-semibold text-white active:scale-95"
              style={{ backgroundColor: PRIMARY }}
            >
              {cardIdx + 1 >= RW_CARDS.length ? "Continue" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE (9 problems)
   ═══════════════════════════════════════════════════════════════════════════ */

interface PracticeProblem {
  id: string;
  layer: number;
  type: "multiple-choice" | "numeric-input";
  prompt: string;
  options?: string[];
  correctAnswer: string | number;
  feedback: Record<string, string>;
  explanation: string;
}

const PROBLEMS: PracticeProblem[] = [
  // Layer 0: Recall
  {
    id: "R1",
    layer: 0,
    type: "multiple-choice",
    prompt: "The GCF of two numbers is the\u2026",
    options: [
      "Smallest number they both divide into",
      "Biggest number that divides both of them",
      "Product of the two numbers",
      "Biggest multiple they share",
    ],
    correctAnswer: "Biggest number that divides both of them",
    feedback: {
      "Smallest number they both divide into":
        "That describes the LCM, not the GCF! GCF = biggest factor that goes into both. LCM = smallest multiple both go into.",
      "Product of the two numbers":
        "The product of two numbers is usually much larger than their GCF. GCF(12, 18) = 6, not 12 \u00d7 18 = 216!",
      "Biggest multiple they share":
        "Multiples go on forever, so the \u2018biggest multiple\u2019 doesn\u2019t make sense! You\u2019re thinking of the LCM, which is the SMALLEST common multiple.",
      correct: "Correct! The GCF is the biggest number that divides evenly into both numbers.",
    },
    explanation: "The GCF (Greatest Common Factor) is the largest number that divides both numbers evenly.",
  },
  {
    id: "R2",
    layer: 0,
    type: "numeric-input",
    prompt: "What is the GCF of 8 and 12?",
    correctAnswer: 4,
    feedback: {
      "2": "2 IS a common factor of 8 and 12, but it\u2019s not the GREATEST. Is there a bigger number that divides both?",
      "8": "8 divides into 8, but does 8 divide into 12? 12/8 = 1.5 \u2014 not evenly!",
      "24": "24 is the LCM of 8 and 12, not the GCF! The GCF is always \u2264 the smaller number.",
      correct: "Yes! The factors of 8 are {1, 2, 4, 8} and the factors of 12 are {1, 2, 3, 4, 6, 12}. The biggest in BOTH is 4.",
      incorrect: "The GCF of 8 and 12 is 4. Factors of 8: 1, 2, 4, 8. Factors of 12: 1, 2, 3, 4, 6, 12. Biggest shared = 4.",
    },
    explanation: "GCF(8, 12) = 4. Factors of 8: {1, 2, 4, 8}. Factors of 12: {1, 2, 3, 4, 6, 12}. Biggest in both = 4.",
  },
  {
    id: "R3",
    layer: 0,
    type: "numeric-input",
    prompt: "What is the LCM of 4 and 6?",
    correctAnswer: 12,
    feedback: {
      "24": "24 IS a common multiple of 4 and 6, but it\u2019s not the LEAST. There\u2019s a smaller one!",
      "2": "2 is the GCF of 4 and 6, not the LCM! The LCM is a multiple (bigger), the GCF is a factor (smaller).",
      "4": "4 is a multiple of 4 trivially, but is 4 a multiple of 6? No! Keep listing.",
      "6": "6 is a multiple of 6 trivially, but is 6 a multiple of 4? 6/4 = 1.5 \u2014 nope. Keep going!",
      correct: "Right! Multiples of 4: 4, 8, 12\u2026 Multiples of 6: 6, 12\u2026 The first in BOTH is 12.",
      incorrect: "LCM(4, 6) = 12. Multiples of 4: 4, 8, 12\u2026 Multiples of 6: 6, 12\u2026 First shared = 12.",
    },
    explanation: "LCM(4, 6) = 12. Multiples of 4: 4, 8, 12, 16\u2026 Multiples of 6: 6, 12, 18\u2026 First shared = 12.",
  },
  // Layer 1: Procedure
  {
    id: "P1",
    layer: 1,
    type: "numeric-input",
    prompt: "Find the GCF of 24 and 36 using prime factorization. 24 = 2\u00b3 \u00d7 3, 36 = 2\u00b2 \u00d7 3\u00b2. GCF = ?",
    correctAnswer: 12,
    feedback: {
      "6": "You might be taking only one 2 and one 3. But min(3,2) = 2 for the prime 2, so GCF = 2\u00b2 \u00d7 3\u00b9 = 12.",
      "36": "36 doesn\u2019t divide into 24 (24/36 < 1). The GCF can\u2019t be bigger than the smaller number!",
      "72": "72 is the LCM of 24 and 36, not the GCF! For GCF, take MINIMUM exponents.",
      correct: "GCF(24, 36) = 2\u00b2 \u00d7 3\u00b9 = 12. Both 24 and 36 divide evenly by 12.",
      incorrect: "GCF(24, 36) = 2^min(3,2) \u00d7 3^min(1,2) = 2\u00b2 \u00d7 3 = 12.",
    },
    explanation: "GCF(24, 36) = 2^min(3,2) \u00d7 3^min(1,2) = 4 \u00d7 3 = 12.",
  },
  {
    id: "P2",
    layer: 1,
    type: "numeric-input",
    prompt: "Find the LCM of 6 and 9. List multiples of each until you find the first common one.",
    correctAnswer: 18,
    feedback: {
      "54": "54 IS a common multiple (6 \u00d7 9), but it\u2019s not the LEAST. GCF(6,9) = 3, so LCM = 54/3 = 18.",
      "3": "3 is the GCF of 6 and 9, not the LCM! The LCM is bigger than both numbers.",
      "36": "36 is a common multiple, but not the smallest. Multiples of 6: 6, 12, 18\u2026 Multiples of 9: 9, 18\u2026",
      correct: "LCM(6, 9) = 18. Note: 6 \u00d7 9 = 54, but LCM = 18 because they share the factor 3.",
      incorrect: "LCM(6, 9) = 18. Multiples of 6: 6, 12, 18\u2026 Multiples of 9: 9, 18\u2026 First shared = 18.",
    },
    explanation: "LCM(6, 9) = 18. They share factor 3, so LCM = 6 \u00d7 9 / 3 = 18.",
  },
  {
    id: "P3",
    layer: 1,
    type: "multiple-choice",
    prompt: "Simplify the fraction 15/25 using the GCF.",
    options: ["3/5", "1/5", "5/10", "15/25 is already simplified"],
    correctAnswer: "3/5",
    feedback: {
      "1/5": "You divided the numerator by 15 and the denominator by 25 \u2014 but you need to divide BOTH by the SAME number (the GCF). GCF(15, 25) = 5.",
      "5/10": "You divided both by 3, but 5/10 can be simplified further. Use the GCF of the original numbers: GCF(15, 25) = 5.",
      "15/25 is already simplified": "15 and 25 are both divisible by 5. GCF(15, 25) = 5, so divide both by 5.",
      correct: "GCF(15, 25) = 5. Divide both: 15 \u00f7 5 = 3, 25 \u00f7 5 = 5. So 15/25 = 3/5!",
    },
    explanation: "GCF(15, 25) = 5. 15/5 = 3, 25/5 = 5. So 15/25 = 3/5.",
  },
  // Layer 2: Understanding
  {
    id: "U1",
    layer: 2,
    type: "multiple-choice",
    prompt: "The LCM of 6 and 10 is NOT 60 (which is 6 \u00d7 10). Why?",
    options: [
      "Because 6 and 10 share a common factor (2), so the LCM is smaller",
      "Because the LCM is always half the product",
      "Because 60 is not a multiple of 6 or 10",
      "Because you need to add them, not multiply",
    ],
    correctAnswer: "Because 6 and 10 share a common factor (2), so the LCM is smaller",
    feedback: {
      "Because the LCM is always half the product":
        "The LCM is not always half the product \u2014 it depends on how many factors the numbers share. For 12 and 18, LCM = 36 and product = 216.",
      "Because 60 is not a multiple of 6 or 10":
        "Actually, 60 IS a multiple of both (6 \u00d7 10 = 60). But the LCM is the SMALLEST common multiple, and 30 works too.",
      "Because you need to add them, not multiply":
        "Adding 6 + 10 = 16, which is not a multiple of either. The LCM involves factoring, not adding.",
      correct:
        "Exactly! 6 = 2 \u00d7 3 and 10 = 2 \u00d7 5. They share factor 2, so LCM = 2 \u00d7 3 \u00d7 5 = 30, not 60.",
    },
    explanation: "When two numbers share factors, their LCM is less than their product. LCM(6, 10) = 30.",
  },
  {
    id: "U2",
    layer: 2,
    type: "numeric-input",
    prompt: "GCF(15, 20) = 5. What is LCM(15, 20)? Hint: GCF \u00d7 LCM = 15 \u00d7 20.",
    correctAnswer: 60,
    feedback: {
      "300": "300 = 15 \u00d7 20 is the product. Since GCF = 5 (not 1), LCM is smaller. Use: LCM = 300 / 5 = 60.",
      "15": "15 is a multiple of 15, but is 15 a multiple of 20? 15/20 = 0.75 \u2014 no!",
      "20": "20 is a multiple of 20, but is 20 a multiple of 15? 20/15 = 1.33 \u2014 no!",
      correct: "Using the identity: 5 \u00d7 LCM = 15 \u00d7 20 = 300, so LCM = 300 / 5 = 60. Verify: 60/15 = 4 \u2713 and 60/20 = 3 \u2713.",
      incorrect: "Use GCF \u00d7 LCM = a \u00d7 b. So 5 \u00d7 LCM = 300, meaning LCM = 60.",
    },
    explanation: "GCF \u00d7 LCM = a \u00d7 b. 5 \u00d7 LCM = 300. LCM = 60.",
  },
  {
    id: "U3",
    layer: 2,
    type: "multiple-choice",
    prompt: "To add 1/8 + 1/6, you need a common denominator. What is the LCD (Least Common Denominator)?",
    options: ["48", "24", "14", "2"],
    correctAnswer: "24",
    feedback: {
      "48": "48 IS a common multiple (6 \u00d7 8), but not the LEAST. GCF(8, 6) = 2, so LCM = 48/2 = 24.",
      "14": "14 = 8 + 6. Adding denominators is a common mistake! You need the LCM, not the sum.",
      "2": "2 is the GCF of 8 and 6, not the LCM! The LCD must be a number BOTH 8 and 6 divide into.",
      correct: "LCD = LCM(8, 6) = 24. Now: 1/8 = 3/24 and 1/6 = 4/24. So 1/8 + 1/6 = 7/24!",
    },
    explanation: "LCD = LCM(8, 6) = 24. 1/8 = 3/24, 1/6 = 4/24, sum = 7/24.",
  },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [phase, setPhase] = useState<"answering" | "feedback">("answering");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showXp, setShowXp] = useState(false);

  const problem = PROBLEMS[problemIdx]!;

  const handleSelect = useCallback(
    (option: string) => {
      if (phase !== "answering") return;
      setSelectedAnswer(option);
    },
    [phase],
  );

  const handleSubmit = useCallback(() => {
    let correct = false;
    if (problem.type === "multiple-choice") {
      correct = selectedAnswer === problem.correctAnswer;
    } else if (problem.type === "numeric-input") {
      correct = parseInt(numericInput, 10) === problem.correctAnswer;
    }
    setIsCorrect(correct);
    setPhase("feedback");
    if (correct) {
      setShowXp(true);
    }
  }, [selectedAnswer, numericInput, problem]);

  const handleNext = useCallback(() => {
    if (problemIdx + 1 >= PROBLEMS.length) {
      onComplete();
      return;
    }
    setProblemIdx((p) => p + 1);
    setPhase("answering");
    setSelectedAnswer(null);
    setNumericInput("");
    setIsCorrect(false);
    setShowXp(false);
  }, [problemIdx, onComplete]);

  const canSubmit =
    problem.type === "numeric-input"
      ? numericInput.trim().length > 0
      : selectedAnswer !== null;

  const getFeedbackText = (): string => {
    if (isCorrect) return problem.feedback["correct"] ?? problem.explanation;
    if (problem.type === "numeric-input") {
      return (
        problem.feedback[numericInput] ??
        problem.feedback["incorrect"] ??
        problem.explanation
      );
    }
    return selectedAnswer
      ? (problem.feedback[selectedAnswer] ?? problem.explanation)
      : problem.explanation;
  };

  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={problem.id}
          className="relative w-full max-w-lg rounded-2xl p-5"
          style={{
            backgroundColor: BG,
            border: `1px solid ${SURFACE}`,
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={SPRING}
        >
          {showXp && <XpFloat amount={10} />}

          {/* Header */}
          <div className="mb-4 flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: LAYER_COLORS[problem.layer] ?? INFO,
              }}
              aria-hidden="true"
            />
            <span className="text-xs" style={{ color: MUTED }}>
              {problemIdx + 1} of {PROBLEMS.length}
            </span>
          </div>

          <p
            className="mb-5 text-base font-medium leading-relaxed"
            style={{ color: TEXT }}
          >
            {problem.prompt}
          </p>

          {phase === "answering" && (
            <>
              {/* Multiple-choice options */}
              {problem.type === "multiple-choice" && problem.options && (
                <div className="mb-5 space-y-2" role="radiogroup">
                  {problem.options.map((opt) => {
                    const sel = selectedAnswer === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        className={cn(
                          "w-full rounded-xl px-4 py-3 text-left text-sm font-medium min-h-[44px] transition-all",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                        )}
                        style={{
                          backgroundColor: sel ? SURFACE : "transparent",
                          border: `2px solid ${sel ? PRIMARY : SURFACE_ELEVATED}`,
                          color: sel ? PRIMARY : THEME.textLight,
                        }}
                        role="radio"
                        aria-checked={sel}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric input */}
              {problem.type === "numeric-input" && (
                <div className="mb-5 flex justify-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={numericInput}
                    onChange={(e) =>
                      setNumericInput(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="w-20 rounded-lg px-3 py-3 text-center text-2xl font-bold outline-none"
                    style={{
                      backgroundColor: BG,
                      border: `2px solid ${SURFACE_ELEVATED}`,
                      color: TEXT,
                    }}
                    aria-label="Enter a number"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PRIMARY;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = SURFACE_ELEVATED;
                    }}
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(
                  "w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px] transition-all duration-150 active:scale-95",
                  !canSubmit && "opacity-40 cursor-not-allowed",
                )}
                style={{ backgroundColor: PRIMARY }}
                aria-disabled={!canSubmit}
              >
                Check Answer
              </button>
            </>
          )}

          {phase === "feedback" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              aria-live="assertive"
            >
              <div
                className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
                style={{
                  backgroundColor: isCorrect
                    ? "rgba(52,211,153,0.15)"
                    : "rgba(148,163,184,0.15)",
                  color: isCorrect ? SUCCESS : TEXT_SEC,
                  border: `1px solid ${isCorrect ? SUCCESS : TEXT_SEC}`,
                }}
              >
                {isCorrect
                  ? "Correct!"
                  : "Not quite \u2014 let\u2019s think about this\u2026"}
              </div>
              <p
                className="mb-5 text-sm leading-relaxed"
                style={{ color: THEME.textLight }}
              >
                {getFeedbackText()}
              </p>
              <button
                onClick={handleNext}
                className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px] active:scale-95"
                style={{ backgroundColor: PRIMARY }}
              >
                {problemIdx + 1 >= PROBLEMS.length
                  ? "Continue"
                  : "Next \u2192"}
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

const REFL_PROMPT =
  "Explain in your own words: how does the Venn diagram of prime factors help you find BOTH the GCF and the LCM? Why are GCF and LCM useful for fractions?";
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
        <motion.div
          className="w-full max-w-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SPRING}
        >
          {submitted && (
            <div
              className="mb-6 rounded-2xl p-5"
              style={{
                backgroundColor: SURFACE,
                border: `1px solid ${SURFACE_ELEVATED}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(251,191,36,0.12)" }}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill={AMBER}
                  >
                    <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
                  </svg>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: AMBER }}
                >
                  Great reflection!
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: THEME.textLight }}
              >
                Thanks for sharing your thinking! Explaining GCF and LCM in
                your own words helps solidify the connection between the Venn
                diagram model and fraction operations.
              </p>
            </div>
          )}
          <ContinueButton
            onClick={onComplete}
            color={PRIMARY}
          >
            Complete Lesson
          </ContinueButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center"
      >
        {/* Icon */}
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(167,139,250,0.1)" }}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke={VIOLET}
            strokeWidth={2}
          >
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 013.002 3.002L7.368 18.635a2 2 0 01-.855.506l-2.872.838a.5.5 0 01-.62-.62l.838-2.872a2 2 0 01.506-.854z" />
          </svg>
        </div>

        <h2
          className="mb-2 text-lg font-bold"
          style={{ color: TEXT }}
        >
          {"Reflect & Explain"}
        </h2>

        <div
          className="mb-6 rounded-2xl p-4"
          style={{
            backgroundColor: SURFACE,
            border: `1px solid ${SURFACE_ELEVATED}`,
            borderLeft: `4px solid ${AMBER}`,
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: THEME.textLight }}
          >
            {REFL_PROMPT}
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= REFL_MAX) setText(e.target.value);
          }}
          placeholder="The Venn diagram helps because..."
          rows={5}
          className="w-full resize-none rounded-xl px-4 py-3 outline-none"
          style={{
            backgroundColor: BG,
            border: `1px solid ${SURFACE_ELEVATED}`,
            color: TEXT,
            fontSize: 16,
            minHeight: 120,
            maxHeight: 300,
          }}
          aria-label="Write your reflection about how the Venn diagram helps find GCF and LCM"
        />

        <div className="mt-2 flex justify-between">
          <span
            className="text-xs"
            style={{ color: ok ? SUCCESS : MUTED }}
          >
            {text.trim().length}/{REFL_MIN} min characters
          </span>
          <span className="text-xs" style={{ color: MUTED }}>
            {text.length}/{REFL_MAX}
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-2 pb-8">
        <ContinueButton
          onClick={() => setSubmitted(true)}
          disabled={!ok}
          color={PRIMARY}
        >
          Share My Thinking
        </ContinueButton>
        <button
          onClick={() => setSkipped(true)}
          className="text-xs min-h-[44px] px-4"
          style={{ color: colors.bg.elevated }}
          aria-label="Skip reflection"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — GcfLcmLesson
   ═══════════════════════════════════════════════════════════════════════════ */

export function GcfLcmLesson({ onComplete }: GcfLcmLessonProps) {
  return (
    <LessonShell title="NT-2.3 GCF & LCM" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
            return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default:
            return null;
        }
      }}
    </LessonShell>
  );
}
