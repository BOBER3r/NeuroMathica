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
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED TOKEN ALIASES
   ═══════════════════════════════════════════════════════════════════════════ */

const TEXT_PRIMARY = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const TEXT_MUTED = colors.text.muted;
const SURFACE = colors.bg.secondary;
const SURFACE_DEEP = colors.bg.primary;
const BORDER = colors.bg.surface;

const SPRING = springs.default;
const SPRING_POP = springs.pop;
const FADE = { duration: 0.3, ease: "easeOut" as const };

/* ═══════════════════════════════════════════════════════════════════════════
   LESSON-SPECIFIC THEME
   ═══════════════════════════════════════════════════════════════════════════ */

const THEME = {
  base: colors.accent.indigo,        // indigo-400 — base colour
  baseStroke: "#6366f1",             // indigo-500
  exponent: colors.accent.amber,     // amber-400 — exponent colour
  exponentDark: "#d97706",           // amber-600
  result: colors.accent.emerald,     // emerald-400 — results colour
  penny: "#d97706",                  // amber-600 — penny fill
  pennyStroke: "#b45309",            // amber-700
  pennyText: "#451a03",              // amber-900
  wrong: colors.accent.rose,         // rose-400
  violet: colors.accent.violet,      // violet-400
  textSecondary: "#e2e8f0",          // slate-200 — lesson body text
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   MATH UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

function power(base: number, exp: number): number {
  let result = 1;
  for (let i = 0; i < exp; i++) result *= base;
  return result;
}

function formatDollars(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      style={{ color: THEME.exponent }}
    >
      +{amount} XP
    </motion.span>
  );
}

/* CTAButton removed — using shared ContinueButton from @/components/lessons/ui/ContinueButton */

/* ═══════════════════════════════════════════════════════════════════════════
   BRANCHING TREE — layout helpers
   ═══════════════════════════════════════════════════════════════════════════ */

interface TreeNode {
  id: string;
  x: number;
  y: number;
  r: number;
  isLeaf: boolean;
  parentId: string | null;
  parentX: number;
  parentY: number;
}

function buildTree(
  base: number,
  levels: number,
  vbWidth: number,
  vbHeight: number,
): TreeNode[] {
  const nodes: TreeNode[] = [];
  const margin = 20;
  const topY = 40;
  const maxLeaves = power(base, levels);
  const useCluster = maxLeaves > 64;
  const effectiveLevels = useCluster ? Math.min(levels, 3) : levels;

  const levelSpacing = effectiveLevels > 0 ? (vbHeight - topY - 80) / effectiveLevels : 0;

  const rootX = vbWidth / 2;
  const rootY = topY;
  const rootR = 14;

  nodes.push({
    id: "root",
    x: rootX,
    y: rootY,
    r: rootR,
    isLeaf: levels === 0,
    parentId: null,
    parentX: rootX,
    parentY: rootY,
  });

  if (effectiveLevels === 0) return nodes;

  // BFS-style tree build
  interface QueueItem {
    parentId: string;
    parentX: number;
    parentY: number;
    level: number;
    rangeStart: number;
    rangeEnd: number;
  }

  const queue: QueueItem[] = [
    { parentId: "root", parentX: rootX, parentY: rootY, level: 1, rangeStart: 0, rangeEnd: vbWidth - margin * 2 },
  ];

  const radiusByLevel = [14, 12, 10, 8, 6, 5];

  while (queue.length > 0) {
    const item = queue.shift()!;
    const childCount = base;
    const isLeafLevel = item.level === effectiveLevels;
    const childR = radiusByLevel[item.level] ?? 5;
    const childY = topY + item.level * levelSpacing;
    const rangeWidth = item.rangeEnd - item.rangeStart;
    const segWidth = rangeWidth / childCount;

    for (let c = 0; c < childCount; c++) {
      const childX = margin + item.rangeStart + segWidth * c + segWidth / 2;
      const childId = `${item.parentId}-${c}`;
      nodes.push({
        id: childId,
        x: childX,
        y: childY,
        r: childR,
        isLeaf: isLeafLevel,
        parentId: item.parentId,
        parentX: item.parentX,
        parentY: item.parentY,
      });

      if (!isLeafLevel) {
        queue.push({
          parentId: childId,
          parentX: childX,
          parentY: childY,
          level: item.level + 1,
          rangeStart: item.rangeStart + segWidth * c,
          rangeEnd: item.rangeStart + segWidth * (c + 1),
        });
      }
    }
  }

  return nodes;
}

function expandedForm(base: number, levels: number): string {
  if (levels === 0) return "1";
  if (levels === 1) return `${base}`;
  return Array.from({ length: levels }, () => `${base}`).join(" \u00d7 ");
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 1 — HOOK
   Penny doubling: 1 cent doubled 30 times = $5,368,709.12
   ═══════════════════════════════════════════════════════════════════════════ */

type HookPhase =
  | "penny"
  | "doubling"
  | "accel"
  | "explosion"
  | "reveal"
  | "ready";

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/ExponentsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState<HookPhase>("penny");
  const [day, setDay] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cents = power(2, day - 1);
  const dollarStr = formatDollars(cents);

  // Penny pile width percentage (visual bar)
  const pileWidth = Math.min((day / 30) * 100, 100);

  // Milestones
  const milestone =
    day === 15
      ? "A nice dinner?"
      : day === 20
        ? "A used car!"
        : day === 25
          ? "A house!"
          : day >= 28 && day < 30
            ? "Over a million!"
            : null;

  // Auto-advance through animation phases
  useEffect(() => {
    if (phase === "penny") {
      timerRef.current = setTimeout(() => setPhase("doubling"), 1500);
    } else if (phase === "doubling") {
      if (day < 10) {
        timerRef.current = setTimeout(() => setDay((d) => d + 1), 300);
      } else {
        setPhase("accel");
      }
    } else if (phase === "accel") {
      if (day < 20) {
        timerRef.current = setTimeout(() => setDay((d) => d + 1), 200);
      } else {
        setPhase("explosion");
      }
    } else if (phase === "explosion") {
      if (day < 30) {
        timerRef.current = setTimeout(() => setDay((d) => d + 1), 150);
      } else {
        timerRef.current = setTimeout(() => setPhase("reveal"), 500);
      }
    } else if (phase === "reveal") {
      timerRef.current = setTimeout(() => {
        setShowBtn(true);
        setPhase("ready");
      }, 2000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, day]);

  // Failsafe: guarantee Continue button within 4s
  useEffect(() => {
    const failsafe = setTimeout(() => setShowBtn(true), 4000);
    return () => clearTimeout(failsafe);
  }, []);

  const valueFontSize =
    day <= 10 ? 24 : day <= 20 ? 28 : day <= 28 ? 32 : 36;

  const valueColor = day >= 28 ? THEME.result : THEME.exponent;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <svg viewBox="0 0 400 400" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pennyGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={THEME.penny} />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Penny */}
        {(phase === "penny" || phase === "reveal" || phase === "ready") && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING}
          >
            <circle cx={200} cy={60} r={18} fill={THEME.penny} stroke={THEME.pennyStroke} strokeWidth={2} />
            <text x={200} y={65} textAnchor={"middle" as const} fill={THEME.pennyText} fontSize={12} fontWeight={700}>
              1c
            </text>
          </motion.g>
        )}

        {/* Question text */}
        {phase === "penny" && (
          <motion.text
            x={200} y={100}
            textAnchor={"middle" as const}
            fill={TEXT_SEC} fontSize={16} fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ...FADE }}
          >
            What if you doubled a penny every day?
          </motion.text>
        )}

        {/* Day counter and value during doubling */}
        {(phase === "doubling" || phase === "accel" || phase === "explosion") && (
          <>
            <motion.text
              x={200} y={50}
              textAnchor={"middle" as const} fill={TEXT_PRIMARY} fontSize={14}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={FADE}
            >
              {`Day ${day}`}
            </motion.text>

            <motion.text
              key={`val-${day}`}
              x={200} y={90}
              textAnchor={"middle" as const} fill={valueColor}
              fontSize={valueFontSize} fontWeight={700}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
            >
              {dollarStr}
            </motion.text>

            {milestone && (
              <motion.text
                key={`ms-${day}`}
                x={200} y={125}
                textAnchor={"middle" as const} fill={TEXT_SEC}
                fontSize={13} fontStyle="italic"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={FADE}
              >
                {milestone}
              </motion.text>
            )}

            {/* Pile bar */}
            <motion.rect
              x={40} y={200} rx={4} height={40}
              fill="url(#pennyGrad)"
              initial={{ width: 0 }}
              animate={{ width: pileWidth * 3.2 }}
              transition={SPRING}
            />
          </>
        )}

        {/* Reveal text */}
        {(phase === "reveal" || phase === "ready") && (
          <>
            <motion.text
              x={200} y={140}
              textAnchor={"middle" as const} fill={TEXT_PRIMARY} fontSize={18}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.2, ...FADE }}
            >
              {"1\u00a2 \u00d7 2\u00b3\u2070 = $5,368,709.12"}
            </motion.text>

            <motion.text
              x={200} y={175}
              textAnchor={"middle" as const} fill={THEME.exponent} fontSize={16} fontWeight={600}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, ...SPRING }}
            >
              That tiny superscript 30 does ALL the work.
            </motion.text>
          </>
        )}
      </svg>

      {/* aria-live region for accessibility */}
      <div className="sr-only" aria-live="polite">
        {phase === "reveal" &&
          "A single penny doubles every day. After 30 days it becomes over 5 million dollars. The equation 2 to the power of 30 creates this explosive growth."}
      </div>

      <ContinueButton
        onClick={onComplete}
        disabled={!showBtn}
        label="Learn the power of powers"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 2 — SPATIAL EXPERIENCE
   Phase A: Branching Tree Builder
   Phase B: Tower of Powers
   ═══════════════════════════════════════════════════════════════════════════ */

type SpatialPhase = "tree" | "transition" | "tower";

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [spatialPhase, setSpatialPhase] = useState<SpatialPhase>("tree");
  const [base, setBase] = useState(2);
  const [levels, setLevels] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [baseUnlocked, setBaseUnlocked] = useState(false);
  const [freeExplore, setFreeExplore] = useState(false);
  const [towerBuilt, setTowerBuilt] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [debouncing, setDebouncing] = useState(false);

  // Unlock base selector after 3 levels with base 2
  useEffect(() => {
    if (levels >= 3 && base === 2 && !baseUnlocked) {
      setBaseUnlocked(true);
    }
  }, [levels, base, baseUnlocked]);

  // Track base3 exploration for free explore unlock
  const triedBase3Ref = useRef(false);
  const base3LevelsRef = useRef(0);

  useEffect(() => {
    if (base === 3) {
      triedBase3Ref.current = true;
      base3LevelsRef.current = Math.max(base3LevelsRef.current, levels);
    }
  }, [base, levels]);

  useEffect(() => {
    if (triedBase3Ref.current && base3LevelsRef.current >= 2 && !freeExplore) {
      setFreeExplore(true);
    }
  }, [base, levels, freeExplore]);

  const leafCount = power(base, levels);
  const isCluster = leafCount > 64;

  const addLevel = useCallback(() => {
    if (debouncing || levels >= 5) return;
    setLevels((l) => l + 1);
    setInteractions((i) => i + 1);
    setDebouncing(true);
    debounceRef.current = setTimeout(() => setDebouncing(false), 300);
  }, [debouncing, levels]);

  const removeLevel = useCallback(() => {
    if (debouncing || levels <= 0) return;
    setLevels((l) => l - 1);
    setInteractions((i) => i + 1);
    setDebouncing(true);
    debounceRef.current = setTimeout(() => setDebouncing(false), 300);
  }, [debouncing, levels]);

  const changeBase = useCallback(
    (delta: number) => {
      if (debouncing) return;
      setBase((b) => {
        const next = b + delta;
        if (next < 2 || next > 5) return b;
        return next;
      });
      setInteractions((i) => i + 1);
      setDebouncing(true);
      debounceRef.current = setTimeout(() => setDebouncing(false), 300);
    },
    [debouncing],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const canContinueTree = interactions >= 10;
  const canFinish = interactions + towerBuilt >= 15;

  const VB_W = 360;
  const VB_H = 360;

  const treeNodes = useMemo(
    () => buildTree(base, levels, VB_W, VB_H),
    [base, levels],
  );

  const instruction =
    levels === 0
      ? "This tree has 1 leaf. Tap Add Level to grow it!"
      : levels < 3 && base === 2
        ? `${leafCount} leaves! Keep adding levels.`
        : levels === 3 && base === 2 && !baseUnlocked
          ? "Each new level DOUBLES the leaves!"
          : baseUnlocked && !freeExplore
            ? base === 3
              ? `3 branches per node \u2014 ${leafCount} leaves! Compare that to 8 with base 2.`
              : "Try changing the base to 3!"
            : levels >= 5
              ? "Max depth reached! Try changing the base."
              : "Explore! What happens with different bases and levels?";

  // Tower Phase
  if (spatialPhase === "transition") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-8 text-center text-lg"
          style={{ color: TEXT_PRIMARY }}
        >
          Now let&apos;s see exponents as shapes...
        </motion.p>
        <ContinueButton onClick={() => setSpatialPhase("tower")} />
      </div>
    );
  }

  if (spatialPhase === "tower") {
    return (
      <TowerPhase
        towerBuilt={towerBuilt}
        onBuild={() => setTowerBuilt((t) => t + 1)}
        canFinish={canFinish}
        onComplete={onComplete}
      />
    );
  }

  // Tree Phase
  return (
    <div className="flex flex-1 flex-col px-4">
      {/* Instruction + Stats */}
      <div className="mb-2 mt-2 rounded-xl p-3" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
        <p className="mb-2 text-sm" style={{ color: THEME.textSecondary }}>{instruction}</p>
        <div className="mb-2">
          <InteractionDots count={Math.min(interactions, 10)} total={10} activeColor={THEME.base} />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="rounded-full px-3 py-1 font-semibold" style={{ backgroundColor: "rgba(129,140,248,0.15)", color: THEME.base }}>
            Base: {base}
          </span>
          <span className="rounded-full px-3 py-1 font-semibold" style={{ backgroundColor: "rgba(251,191,36,0.15)", color: THEME.exponent }}>
            Levels: {levels}
          </span>
          <motion.span
            key={leafCount}
            className="font-bold text-lg"
            style={{ color: THEME.result }}
            initial={{ scale: 1.3 }} animate={{ scale: 1 }}
            transition={SPRING}
          >
            {leafCount} {leafCount === 1 ? "leaf" : "leaves"}
          </motion.span>
        </div>
      </div>

      {/* Tree SVG */}
      <div
        className="flex flex-1 items-center justify-center"
        role="img"
        aria-label={`Branching tree with base ${base} and ${levels} levels, producing ${leafCount} leaves`}
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full max-w-lg" preserveAspectRatio="xMidYMid meet">
          {/* Branch lines */}
          {treeNodes
            .filter((n) => n.parentId !== null)
            .map((n) => (
              <motion.line
                key={`line-${n.id}`}
                x1={n.parentX} y1={n.parentY} x2={n.x} y2={n.y}
                stroke={BORDER} strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            ))}

          {/* Nodes */}
          {treeNodes.map((n) => (
            <motion.circle
              key={`node-${n.id}`}
              r={n.r}
              fill={n.isLeaf ? THEME.exponent : THEME.base}
              stroke={n.isLeaf ? THEME.exponentDark : THEME.baseStroke}
              strokeWidth={2}
              style={
                n.isLeaf
                  ? { filter: "drop-shadow(0 0 4px rgba(251,191,36,0.3))" }
                  : { filter: "drop-shadow(0 1px 2px rgba(129,140,248,0.2))" }
              }
              initial={{ cx: n.parentX, cy: n.parentY, scale: 0, opacity: 0 }}
              animate={{ cx: n.x, cy: n.y, scale: 1, opacity: n.isLeaf ? 1 : 0.85 }}
              transition={SPRING_POP}
            />
          ))}

          {/* Cluster bar for large trees */}
          {isCluster && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={FADE}>
              <rect x={VB_W * 0.1} y={VB_H - 60} width={VB_W * 0.8} height={24} rx={6} fill={THEME.exponent} opacity={0.3} />
              <text x={VB_W / 2} y={VB_H - 44} textAnchor={"middle" as const} fill={THEME.result} fontSize={14} fontWeight={700}>
                {leafCount} leaves
              </text>
            </motion.g>
          )}
        </svg>
      </div>

      {/* Expanded equation bar */}
      <div className="mb-2 text-center" style={{ color: THEME.textSecondary }}>
        <motion.span
          key={`eq-${base}-${levels}`}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={SPRING}
          className="text-base"
        >
          <span style={{ color: THEME.base }}>{expandedForm(base, levels)}</span>
          {levels > 0 && (
            <>
              {" = "}
              <span className="font-bold" style={{ color: THEME.result }}>{leafCount}</span>
            </>
          )}
        </motion.span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <button
          onClick={addLevel}
          disabled={levels >= 5 || debouncing}
          className={cn(
            "rounded-xl px-5 py-3 text-base font-semibold min-h-[44px] min-w-[44px] transition-all",
            (levels >= 5 || debouncing) && "opacity-30 cursor-not-allowed",
          )}
          style={{
            backgroundColor: "rgba(129,140,248,0.15)",
            border: `2px solid ${THEME.base}`,
            color: THEME.base,
            animation: levels === 0 ? "pulse 1.5s ease-in-out infinite" : undefined,
          }}
          aria-label="Add one branching level"
          data-interactive="true"
        >
          Add Level +
        </button>

        <button
          onClick={removeLevel}
          disabled={levels <= 0 || debouncing}
          className={cn(
            "rounded-xl px-5 py-3 text-base font-semibold min-h-[44px] min-w-[44px] transition-all",
            (levels <= 0 || debouncing) && "opacity-30 cursor-not-allowed",
          )}
          style={{
            backgroundColor: "rgba(129,140,248,0.08)",
            border: `2px solid ${BORDER}`,
            color: TEXT_SEC,
          }}
          aria-label="Remove one branching level"
          data-interactive="true"
        >
          {"Remove Level \u2212"}
        </button>
      </div>

      {/* Base selector */}
      {baseUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <button
            onClick={() => changeBase(-1)}
            disabled={base <= 2 || debouncing}
            className={cn(
              "flex items-center justify-center rounded-lg min-h-[44px] min-w-[44px] text-xl font-bold transition-all",
              (base <= 2 || debouncing) && "opacity-30 cursor-not-allowed",
            )}
            style={{ border: `2px solid ${BORDER}`, color: THEME.textSecondary }}
            aria-label="Decrease base"
            data-interactive="true"
          >
            {"<"}
          </button>
          <span
            className="text-xl font-bold min-w-[44px] text-center"
            style={{ color: THEME.base }}
            role="spinbutton"
            aria-valuemin={2} aria-valuemax={5} aria-valuenow={base}
            aria-label="Base value"
          >
            {base}
          </span>
          <button
            onClick={() => changeBase(1)}
            disabled={base >= 5 || debouncing || !freeExplore}
            className={cn(
              "flex items-center justify-center rounded-lg min-h-[44px] min-w-[44px] text-xl font-bold transition-all",
              (base >= 5 || debouncing || !freeExplore) && "opacity-30 cursor-not-allowed",
            )}
            style={{ border: `2px solid ${BORDER}`, color: THEME.textSecondary }}
            aria-label="Increase base"
            data-interactive="true"
          >
            {">"}
          </button>
        </motion.div>
      )}

      {/* Continue to tower */}
      {canContinueTree && (
        <ContinueButton onClick={() => setSpatialPhase("transition")} label="Continue to Tower of Powers" />
      )}

      {/* aria-live for stats changes */}
      <div className="sr-only" aria-live="polite">
        {`Base ${base}, Level ${levels}, ${leafCount} leaves`}
      </div>
    </div>
  );
}

/* ─── Tower of Powers sub-component ─────────────────────────────────────── */

function TowerPhase({
  towerBuilt,
  onBuild,
  canFinish,
  onComplete,
}: {
  towerBuilt: number;
  onBuild: () => void;
  canFinish: boolean;
  onComplete: () => void;
}) {
  const [built, setBuilt] = useState<Set<string>>(new Set());

  const shapes: { key: string; label: string; exp: number; desc: string }[] = [
    { key: "line", label: "2\u00b9 = 2", exp: 1, desc: "a line" },
    { key: "square", label: "2\u00b2 = 4", exp: 2, desc: "a square" },
    { key: "cube", label: "2\u00b3 = 8", exp: 3, desc: "a cube" },
  ];

  const handleBuild = useCallback(
    (key: string) => {
      if (built.has(key)) return;
      setBuilt((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      onBuild();
    },
    [built, onBuild],
  );

  const unitSize = 24;

  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="mb-3 mt-2 rounded-xl p-3" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
        <p className="text-sm" style={{ color: THEME.textSecondary }}>
          Build the tower! Tap each shape to see exponents as geometry.
        </p>
      </div>

      <div className="flex flex-1 items-start justify-center gap-6 pt-4">
        {shapes.map((shape) => {
          const isBuilt = built.has(shape.key);
          const shapeColors =
            shape.exp === 1
              ? { fill: "rgba(129,140,248,0.12)", stroke: THEME.base }
              : shape.exp === 2
                ? { fill: "rgba(251,191,36,0.12)", stroke: THEME.exponent }
                : { fill: "rgba(52,211,153,0.12)", stroke: THEME.result };

          return (
            <div key={shape.key} className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleBuild(shape.key)}
                disabled={isBuilt}
                className="min-h-[44px] min-w-[44px] rounded-xl p-3 transition-all"
                style={{
                  backgroundColor: isBuilt ? shapeColors.fill : "transparent",
                  border: `2px solid ${isBuilt ? shapeColors.stroke : BORDER}`,
                }}
                aria-label={`Build ${shape.label} shown as ${shape.desc}`}
                data-interactive="true"
              >
                <svg
                  width={shape.exp === 3 ? 80 : unitSize * 2 + 4}
                  height={shape.exp === 3 ? 70 : shape.exp === 2 ? unitSize * 2 + 4 : unitSize + 4}
                  viewBox={
                    shape.exp === 3
                      ? "0 0 80 70"
                      : `0 0 ${unitSize * 2 + 4} ${shape.exp === 2 ? unitSize * 2 + 4 : unitSize + 4}`
                  }
                >
                  {shape.exp === 1 && (
                    <g>
                      {[0, 1].map((i) => (
                        <motion.rect
                          key={i}
                          x={2 + i * unitSize} y={2}
                          width={unitSize} height={unitSize} rx={2}
                          fill={isBuilt ? shapeColors.fill : "transparent"}
                          stroke={isBuilt ? shapeColors.stroke : BORDER}
                          strokeWidth={1}
                          initial={{ scale: 0 }}
                          animate={{ scale: isBuilt ? 1 : 0.3 }}
                          transition={{ ...SPRING, delay: i * 0.1 }}
                        />
                      ))}
                    </g>
                  )}

                  {shape.exp === 2 && (
                    <g>
                      {[0, 1].map((r) =>
                        [0, 1].map((col) => (
                          <motion.rect
                            key={`${r}-${col}`}
                            x={2 + col * unitSize} y={2 + r * unitSize}
                            width={unitSize} height={unitSize} rx={2}
                            fill={isBuilt ? shapeColors.fill : "transparent"}
                            stroke={isBuilt ? shapeColors.stroke : BORDER}
                            strokeWidth={1}
                            initial={{ scale: 0 }}
                            animate={{ scale: isBuilt ? 1 : 0.3 }}
                            transition={{ ...SPRING, delay: (r * 2 + col) * 0.1 }}
                          />
                        )),
                      )}
                    </g>
                  )}

                  {shape.exp === 3 && (
                    <g>
                      <motion.polygon
                        points="10,30 40,30 40,60 10,60"
                        fill={isBuilt ? "rgba(52,211,153,0.2)" : "transparent"}
                        stroke={isBuilt ? THEME.result : BORDER} strokeWidth={1}
                        initial={{ opacity: 0 }} animate={{ opacity: isBuilt ? 1 : 0.3 }}
                        transition={SPRING}
                      />
                      <motion.polygon
                        points="10,30 40,30 60,15 30,15"
                        fill={isBuilt ? "rgba(52,211,153,0.3)" : "transparent"}
                        stroke={isBuilt ? THEME.result : BORDER} strokeWidth={1}
                        initial={{ opacity: 0 }} animate={{ opacity: isBuilt ? 1 : 0.3 }}
                        transition={{ ...SPRING, delay: 0.1 }}
                      />
                      <motion.polygon
                        points="40,30 60,15 60,45 40,60"
                        fill={isBuilt ? "rgba(52,211,153,0.1)" : "transparent"}
                        stroke={isBuilt ? THEME.result : BORDER} strokeWidth={1}
                        initial={{ opacity: 0 }} animate={{ opacity: isBuilt ? 1 : 0.3 }}
                        transition={{ ...SPRING, delay: 0.2 }}
                      />
                    </g>
                  )}
                </svg>
              </button>

              <span className="text-sm font-semibold" style={{ color: isBuilt ? shapeColors.stroke : TEXT_MUTED }}>
                {shape.label}
              </span>
              <span className="text-xs italic" style={{ color: TEXT_SEC }}>
                {shape.desc}
              </span>
            </div>
          );
        })}
      </div>

      {built.size >= 3 && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-4 text-center font-semibold"
          style={{ color: THEME.exponent, fontSize: 16 }}
        >
          Each exponent adds a DIMENSION
        </motion.p>
      )}

      {canFinish && (
        <ContinueButton onClick={onComplete} label="Ready to discover the patterns?" />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 3 — GUIDED DISCOVERY (5 prompts)
   ═══════════════════════════════════════════════════════════════════════════ */

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [microAnswer, setMicroAnswer] = useState<string | null>(null);
  const [microRevealed, setMicroRevealed] = useState(false);

  const HL = useCallback(
    (t: string, color: string = THEME.base) => (
      <span className="font-semibold" style={{ color }}>{t}</span>
    ),
    [],
  );

  interface DiscoveryPrompt {
    body: ReactNode;
    visual: ReactNode;
    hasMicro?: boolean;
    microOptions?: { label: string; value: string }[];
  }

  const prompts: DiscoveryPrompt[] = useMemo(
    () => [
      // Prompt 1: Exponents are NOT multiplication
      {
        hasMicro: true,
        microOptions: [
          { label: "6", value: "6" },
          { label: "8", value: "8" },
          { label: "9", value: "9" },
        ],
        body: (
          <>
            {microAnswer === null && "Quick check: What is 2\u00b3?"}
            {microAnswer === "6" && (
              <>
                That&apos;s 2 {"\u00d7"} 3 {"\u2014"} a common mistake! But exponents mean{" "}
                {HL("REPEATED multiplication", THEME.exponent)}: 2 {"\u00d7"} 2 {"\u00d7"} 2 = 8.
              </>
            )}
            {microAnswer === "8" && (
              <>
                {HL("Exactly right!", THEME.result)} Let&apos;s see why...
              </>
            )}
            {microAnswer === "9" && (
              <>
                Close, but that would be 3{"\u00b2"} (3 {"\u00d7"} 3). We need 2{"\u00b3"} = 2{" "}
                {"\u00d7"} 2 {"\u00d7"} 2 = 8.
              </>
            )}
            {microAnswer !== null && (
              <>
                {" "}
                The exponent tells you {HL("how many times", THEME.exponent)} to multiply the base by
                itself: 2 {"\u00d7"} 2 {"\u00d7"} 2 = {HL("8", THEME.result)}.
              </>
            )}
          </>
        ),
        visual: (
          <svg viewBox="0 0 360 120" className="w-full max-w-md">
            {microRevealed && (
              <>
                <text x={180} y={30} textAnchor={"middle" as const} fill={THEME.wrong} fontSize={20}>
                  {"2\u00b3 \u2260 2 \u00d7 3 = 6"}
                </text>
                <motion.line
                  x1={80} y1={30} x2={280} y2={30}
                  stroke={THEME.wrong} strokeWidth={2}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={180} y={70}
                  textAnchor={"middle" as const} fill={THEME.result} fontSize={22}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                  transition={{ delay: 0.3, ...SPRING }}
                >
                  {"2\u00b3 = 2 \u00d7 2 \u00d7 2 = 8"}
                </motion.text>
              </>
            )}
          </svg>
        ),
      },
      // Prompt 2: Base vs Exponent
      {
        body: (
          <>
            In 2{"\u00b3"}, the big number (2) is called the{" "}
            {HL("base", THEME.base)} {"\u2014"} it&apos;s WHAT you multiply. The small raised number (3)
            is called the {HL("exponent", THEME.exponent)} or{" "}
            {HL("power", THEME.exponent)} {"\u2014"} it&apos;s HOW MANY TIMES you
            multiply. Think of it like the tree: the base is how many{" "}
            {HL("branches")} each node has, and the exponent is how many{" "}
            {HL("levels", THEME.exponent)} deep you go.
          </>
        ),
        visual: (
          <svg viewBox="0 0 360 100" className="w-full max-w-md">
            <text x={140} y={55} fill={THEME.base} fontSize={48} fontWeight={700}>
              2
            </text>
            <text x={175} y={35} fill={THEME.exponent} fontSize={28} fontWeight={700}>
              3
            </text>
            <text x={148} y={80} textAnchor={"middle" as const} fill={THEME.base} fontSize={14}>
              base
            </text>
            <text x={185} y={18} textAnchor={"middle" as const} fill={THEME.exponent} fontSize={14}>
              exponent
            </text>
          </svg>
        ),
      },
      // Prompt 3: Adding a level MULTIPLIES
      {
        body: (
          <>
            Watch what happens when you add one more level. With base 2: 1
            level = 2 leaves, 2 levels = 4 leaves, 3 levels = 8 leaves. Each
            time, the count {HL("doubles", THEME.exponent)} {"\u2014"} it MULTIPLIES
            by 2, not adds 2. That&apos;s why exponents grow so fast!
          </>
        ),
        visual: (
          <svg viewBox="0 0 360 80" className="w-full max-w-md">
            <text x={50} y={30} fill={THEME.textSecondary} fontSize={14}>
              {"2\u00b9 = 2"}
            </text>
            <text x={120} y={22} fill={THEME.exponent} fontSize={16} fontWeight={600}>
              {"\u00d72"}
            </text>
            <text x={160} y={30} fill={THEME.textSecondary} fontSize={14}>
              {"2\u00b2 = 4"}
            </text>
            <text x={230} y={22} fill={THEME.exponent} fontSize={16} fontWeight={600}>
              {"\u00d72"}
            </text>
            <text x={270} y={30} fill={THEME.textSecondary} fontSize={14}>
              {"2\u00b3 = 8"}
            </text>
            <text x={20} y={60} fill={TEXT_SEC} fontSize={12}>
              Addition: 2, 4, 6, 8, 10 (+2)
            </text>
            <text x={20} y={75} fill={THEME.exponent} fontSize={12} fontWeight={600}>
              {"Exponents: 2, 4, 8, 16, 32 (\u00d72)"}
            </text>
          </svg>
        ),
      },
      // Prompt 4: Exponent 0
      {
        body: (
          <>
            Here&apos;s a puzzle: what is 2{"\u2070"}? Look at the pattern
            going backward: 2{"\u00b3"} = 8, 2{"\u00b2"} = 4, 2{"\u00b9"} = 2.
            Each step we {HL("divide by 2", THEME.exponent)}. So 2{"\u2070"} = 2{" "}
            {"\u00f7"} 2 = {HL("1", THEME.result)}. Any number (except 0) raised to
            the power 0 equals 1!
          </>
        ),
        visual: (
          <svg viewBox="0 0 360 140" className="w-full max-w-md">
            {[
              { exp: "2\u00b3 = 8", y: 25 },
              { exp: "2\u00b2 = 4", y: 55 },
              { exp: "2\u00b9 = 2", y: 85 },
              { exp: "2\u2070 = 1", y: 115 },
            ].map((step, i) => (
              <motion.g
                key={step.exp}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: i * 0.2 }}
              >
                <text
                  x={100} y={step.y}
                  fill={i === 3 ? THEME.result : THEME.textSecondary}
                  fontSize={i === 3 ? 22 : 18}
                  fontWeight={i === 3 ? 700 : 400}
                >
                  {step.exp}
                </text>
                {i < 3 && (
                  <text x={220} y={step.y + 15} fill={THEME.exponent} fontSize={14} fontWeight={600}>
                    {"\u00f7 2"}
                  </text>
                )}
              </motion.g>
            ))}
          </svg>
        ),
      },
      // Prompt 5: Bigger exponent doesn't always win
      {
        body: (
          <>
            Does a bigger exponent always give a bigger result? Not always!
            Compare: {HL("10\u00b2 = 100")} vs {HL("2\u00b9\u2070 = 1024", THEME.result)}.
            The base matters too! And what about{" "}
            {HL("1\u00b9\u2070\u2070", THEME.exponent)}? No matter how many times
            you multiply 1 by itself, you still get {HL("1", THEME.result)}. The
            base and exponent work TOGETHER.
          </>
        ),
        visual: (
          <svg viewBox="0 0 360 100" className="w-full max-w-md">
            <motion.g initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}>
              <text x={30} y={25} fill={THEME.textSecondary} fontSize={14}>{"10\u00b2 = 100"}</text>
              <text x={170} y={25} fill={TEXT_SEC} fontSize={14}>vs</text>
              <text x={210} y={25} fill={THEME.result} fontSize={14} fontWeight={600}>{"2\u00b9\u2070 = 1024"}</text>
            </motion.g>
            <motion.g initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ ...SPRING, delay: 0.3 }}>
              <text x={30} y={55} fill={THEME.textSecondary} fontSize={14}>{"100\u00b9 = 100"}</text>
              <text x={170} y={55} fill={TEXT_SEC} fontSize={14}>vs</text>
              <text x={210} y={55} fill={THEME.result} fontSize={14} fontWeight={600}>{"2\u2077 = 128"}</text>
            </motion.g>
            <motion.text
              x={180} y={88}
              textAnchor={"middle" as const} fill={THEME.exponent} fontSize={14}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ ...SPRING, delay: 0.6 }}
            >
              {"1\u00b9\u2070\u2070 = 1   (1 \u00d7 1 \u00d7 1... always 1)"}
            </motion.text>
          </svg>
        ),
      },
    ],
    [microAnswer, microRevealed, HL],
  );

  const allDone = idx >= prompts.length;
  const cur = prompts[idx] as DiscoveryPrompt | undefined;
  const needMicro = cur?.hasMicro === true && microAnswer === null;

  const handleMicroAnswer = useCallback((value: string) => {
    setMicroAnswer(value);
    setMicroRevealed(true);
  }, []);

  const handleNext = useCallback(() => {
    setIdx((i) => i + 1);
    setMicroAnswer(null);
    setMicroRevealed(false);
  }, []);

  return (
    <div className="flex flex-1 flex-col px-4">
      {/* Visual area */}
      <div className="flex flex-1 items-center justify-center w-full py-2">
        {cur && cur.visual}
      </div>

      {/* Prompt card */}
      <div className="mb-4">
        <AnimatePresence mode="wait">
          {!allDone && cur && (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-5"
              style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
              aria-live="polite"
            >
              <p className="mb-4 leading-relaxed" style={{ color: THEME.textSecondary, fontSize: 16 }}>
                {cur.body}
              </p>

              {needMicro && cur.microOptions && (
                <div className="mb-4 flex gap-3">
                  {cur.microOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleMicroAnswer(opt.value)}
                      className="flex-1 rounded-xl py-3 text-lg font-semibold min-h-[48px] min-w-[44px]"
                      style={{ backgroundColor: SURFACE, border: `2px solid ${BORDER}`, color: THEME.textSecondary }}
                      aria-label={`I think 2 to the power of 3 equals ${opt.label}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {!needMicro && (
                <button
                  onClick={handleNext}
                  className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
                  style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${BORDER}`, color: TEXT_PRIMARY }}
                >
                  Next
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-2xl p-5 text-center"
          style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
        >
          <p className="mb-4" style={{ color: THEME.textSecondary }}>
            Now let&apos;s connect what you discovered to the proper math notation.
          </p>
          <ContinueButton onClick={onComplete} />
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 4 — SYMBOL BRIDGE
   Notation overlay on spatial representations
   ═══════════════════════════════════════════════════════════════════════════ */

function SymbolStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  const handleNext = useCallback(() => {
    setStep((s) => s + 1);
  }, []);

  const allDone = step >= totalSteps;

  return (
    <div className="flex flex-1 flex-col px-4">
      <AnimatePresence mode="wait">
        {/* Symbol 1: Exponent notation */}
        {step === 0 && (
          <motion.div
            key="sym1"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <svg viewBox="0 0 360 120" className="w-full max-w-md mb-6">
              <motion.text
                x={180} y={40}
                textAnchor={"middle" as const} fontSize={20} fill={TEXT_PRIMARY}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ ...FADE, delay: 0.2 }}
              >
                <tspan fill={THEME.base}>b</tspan>
                <tspan dy={-8} fontSize={14} fill={THEME.exponent}>n</tspan>
                <tspan dy={8}>{" = "}</tspan>
                <tspan fill={THEME.base}>b</tspan>
                {" \u00d7 "}
                <tspan fill={THEME.base}>b</tspan>
                {" \u00d7 \u2026 \u00d7 "}
                <tspan fill={THEME.base}>b</tspan>
              </motion.text>
              <motion.text
                x={180} y={75}
                textAnchor={"middle" as const} fontSize={14} fill={THEME.exponent}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ ...FADE, delay: 0.6 }}
              >
                n times
              </motion.text>
              <motion.line
                x1={110} y1={55} x2={250} y2={55}
                stroke={THEME.exponent} strokeWidth={1} strokeDasharray="4 2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </svg>

            <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
              <p className="text-sm leading-relaxed" style={{ color: THEME.textSecondary }}>
                The <span style={{ color: THEME.base }} className="font-semibold">base</span> is
                the number being multiplied. The{" "}
                <span style={{ color: THEME.exponent }} className="font-semibold">exponent</span>{" "}
                tells how many times.
              </p>
            </div>

            <button
              onClick={handleNext}
              className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
              style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${BORDER}`, color: TEXT_PRIMARY }}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Symbol 2: Reading exponents aloud */}
        {step === 1 && (
          <motion.div
            key="sym2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <div className="w-full max-w-md space-y-3 mb-6">
              {[
                { expr: "2\u00b2", say: "two squared", color: THEME.exponent },
                { expr: "2\u00b3", say: "two cubed", color: THEME.result },
                { expr: "2\u2074", say: "two to the fourth power", color: THEME.base },
                { expr: "b\u207f", say: "b to the n-th power", color: THEME.textSecondary },
              ].map((row, i) => (
                <motion.div
                  key={row.expr}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SPRING, delay: i * 0.3 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
                >
                  <span className="text-lg font-bold" style={{ color: row.color }}>{row.expr}</span>
                  <span className="text-sm italic" style={{ color: TEXT_SEC }}>{row.say}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
              style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${BORDER}`, color: TEXT_PRIMARY }}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Symbol 3: Concrete examples table */}
        {step === 2 && (
          <motion.div
            key="sym3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <div className="w-full max-w-md mb-6">
              <div className="flex items-center px-4 py-2 text-xs font-semibold" style={{ color: TEXT_MUTED }}>
                <span className="flex-1">Expression</span>
                <span className="flex-1 text-center">Expanded</span>
                <span className="flex-1 text-right">Value</span>
              </div>

              {[
                { expr: "3\u00b2", expanded: "3 \u00d7 3", value: "9", special: false },
                { expr: "5\u00b3", expanded: "5 \u00d7 5 \u00d7 5", value: "125", special: false },
                { expr: "10\u2074", expanded: "10\u00d710\u00d710\u00d710", value: "10,000", special: false },
                { expr: "2\u2070", expanded: "\u2014", value: "1", special: true },
              ].map((row, i) => (
                <motion.div
                  key={row.expr}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING, delay: i * 0.4 }}
                  className="flex items-center rounded-xl px-4 py-3 mb-1"
                  style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
                  role="row"
                >
                  <span className="flex-1 text-lg font-bold" style={{ color: THEME.base }}>{row.expr}</span>
                  <span className="flex-1 text-center text-sm" style={{ color: THEME.textSecondary }}>{row.expanded}</span>
                  <span className="flex-1 text-right text-lg font-bold" style={{ color: row.special ? THEME.exponent : THEME.result }}>
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
              style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${BORDER}`, color: TEXT_PRIMARY }}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Symbol 4: Key rule box */}
        {step === 3 && (
          <motion.div
            key="sym4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <motion.div
              className="w-full max-w-md rounded-2xl p-6 mb-4"
              style={{ border: `2px solid ${THEME.exponent}`, backgroundColor: "rgba(251,191,36,0.06)" }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
            >
              <p className="text-center text-lg leading-relaxed" style={{ color: TEXT_PRIMARY }}>
                <span style={{ color: THEME.base }} className="font-bold">b</span>
                <sup style={{ color: THEME.exponent }} className="font-bold">n</sup>
                {" = "}
                <span style={{ color: THEME.base }}>b</span>
                {" \u00d7 "}
                <span style={{ color: THEME.base }}>b</span>
                {" \u00d7 \u2026 \u00d7 "}
                <span style={{ color: THEME.base }}>b</span>
              </p>
              <p className="mt-2 text-center font-bold" style={{ color: THEME.exponent }}>
                (n factors of b)
              </p>
            </motion.div>

            <p className="mb-6 text-center text-sm italic" style={{ color: TEXT_SEC }}>
              The exponent counts the multiplications. That&apos;s it!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {allDone && <ContinueButton onClick={onComplete} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 5 — REAL-WORLD ANCHOR (3 example cards)
   ═══════════════════════════════════════════════════════════════════════════ */

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [card, setCard] = useState(0);

  interface RWCard {
    accent: string;
    title: string;
    body: ReactNode;
    icon: ReactNode;
  }

  const cards: RWCard[] = useMemo(
    () => [
      {
        accent: THEME.base,
        title: "The Paper Folding Puzzle",
        icon: (
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={THEME.base} strokeWidth={2}>
            <rect x={4} y={4} width={16} height={16} rx={2} />
            <path d="M4 12h16" />
          </svg>
        ),
        body: (
          <>
            If you fold a piece of paper in half, you get 2 layers. Fold again: 4
            layers. Again: 8. Each fold DOUBLES the layers {"\u2014"} that&apos;s 2
            raised to the number of folds. After just 7 folds, you have{" "}
            <span style={{ color: THEME.exponent }} className="font-semibold">
              2{"\u2077"} = 128 layers
            </span>
            ! After 42 folds (if you could), the paper would{" "}
            <span style={{ color: THEME.result }} className="font-semibold">reach the Moon</span>.
          </>
        ),
      },
      {
        accent: THEME.result,
        title: "How Things Go Viral",
        icon: (
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={THEME.result} strokeWidth={2}>
            <circle cx={12} cy={5} r={3} />
            <circle cx={5} cy={18} r={3} />
            <circle cx={19} cy={18} r={3} />
            <line x1={12} y1={8} x2={5} y2={15} />
            <line x1={12} y1={8} x2={19} y2={15} />
          </svg>
        ),
        body: (
          <>
            You share a video with 3 friends. Each of them shares it with 3 more.
            That&apos;s 3{"\u00b9"} = 3 people, then 3{"\u00b2"} = 9, then 3{"\u00b3"} = 27.
            After 10 rounds of sharing (
            <span style={{ color: THEME.exponent }} className="font-semibold">3{"\u00b9\u2070"}</span>
            ), over{" "}
            <span style={{ color: THEME.result }} className="font-semibold">59,000 people</span>{" "}
            have seen it! That&apos;s the power of exponential growth.
          </>
        ),
      },
      {
        accent: THEME.violet,
        title: "How Big Is a Minecraft World?",
        icon: (
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={THEME.violet} strokeWidth={2}>
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          </svg>
        ),
        body: (
          <>
            A chunk in Minecraft is 16 {"\u00d7"} 16 {"\u00d7"} 384 blocks.
            That&apos;s{" "}
            <span style={{ color: THEME.exponent }} className="font-semibold">
              16{"\u00b2"} = 256
            </span>{" "}
            blocks per layer times 384 layers. A full world has 14.4 TRILLION
            blocks {"\u2014"}{" "}
            <span style={{ color: THEME.violet }} className="font-semibold">powers of 2</span>{" "}
            are everywhere in games because computers think in powers of 2!
          </>
        ),
      },
    ],
    [],
  );

  const allSeen = card >= cards.length;
  const cur = cards[card] as RWCard | undefined;

  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {!allSeen && cur && (
            <motion.div
              key={card}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={SPRING}
              className="w-full max-w-md rounded-2xl p-5"
              style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${cur.accent}`, border: `1px solid ${BORDER}` }}
              role="article"
            >
              <div className="mb-3 flex items-center gap-3">
                {cur.icon}
                <h3 className="text-lg font-bold" style={{ color: TEXT_PRIMARY }}>{cur.title}</h3>
              </div>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: THEME.textSecondary }}>
                {cur.body}
              </p>
              <button
                onClick={() => setCard((c) => c + 1)}
                className="rounded-xl px-6 py-2 text-sm font-medium min-h-[44px] min-w-[44px]"
                style={{ backgroundColor: "rgba(129,140,248,0.1)", border: `1px solid ${BORDER}`, color: TEXT_PRIMARY }}
              >
                {card < cards.length - 1 ? "Next" : "Got it!"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {allSeen && <ContinueButton onClick={onComplete} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGE 6 — PRACTICE (9 problems, 3 layers)
   ═══════════════════════════════════════════════════════════════════════════ */

interface Prob {
  id: string;
  layer: number; // 0 recall, 1 procedure, 2 understanding
  prompt: string;
  kind: "choice" | "numeric" | "tap";
  options?: string[];
  correct: string[];
  feedbackCorrect: string;
  feedbackWrong: Record<string, string>;
  feedbackDefault: string;
}

const PROBLEMS: Prob[] = [
  // ─── Recall Layer ────────────────────────────────────
  {
    id: "r1", layer: 0,
    prompt: "What is 3\u2074?",
    kind: "choice",
    options: ["12", "64", "81", "7"],
    correct: ["81"],
    feedbackCorrect: "3\u2074 = 3 \u00d7 3 \u00d7 3 \u00d7 3 = 81. Four copies of 3 multiplied together!",
    feedbackWrong: {
      "12": "12 would be 3 \u00d7 4 \u2014 but that\u2019s multiplication, not exponents! 3\u2074 means 3 \u00d7 3 \u00d7 3 \u00d7 3. Multiply it out: 3 \u00d7 3 = 9, 9 \u00d7 3 = 27, 27 \u00d7 3 = 81.",
      "64": "64 is actually 4\u00b3 (4 \u00d7 4 \u00d7 4). Watch the order: in 3\u2074, the BASE is 3 and the EXPONENT is 4. So it\u2019s 3 multiplied 4 times.",
      "7": "7 is 3 + 4 \u2014 addition, not exponents! 3\u2074 means 3 \u00d7 3 \u00d7 3 \u00d7 3 = 81.",
    },
    feedbackDefault: "3\u2074 = 3 \u00d7 3 \u00d7 3 \u00d7 3 = 81.",
  },
  {
    id: "r2", layer: 0,
    prompt: "In the expression 5\u2076, which number is the EXPONENT?",
    kind: "tap",
    options: ["5", "6"],
    correct: ["6"],
    feedbackCorrect: "The exponent is 6 \u2014 it tells you to multiply 5 by itself 6 times. 5 \u00d7 5 \u00d7 5 \u00d7 5 \u00d7 5 \u00d7 5 = 15,625.",
    feedbackWrong: {
      "5": "That\u2019s the base \u2014 the number being multiplied. The exponent is the small raised number that tells you HOW MANY TIMES to multiply.",
    },
    feedbackDefault: "The exponent is the small raised number. In 5\u2076, the exponent is 6.",
  },
  {
    id: "r3", layer: 0,
    prompt: "Which shows the correct meaning of 4\u00b3?",
    kind: "choice",
    options: ["4 + 4 + 4", "4 \u00d7 3", "4 \u00d7 4 \u00d7 4", "3 \u00d7 3 \u00d7 3 \u00d7 3"],
    correct: ["4 \u00d7 4 \u00d7 4"],
    feedbackCorrect: "4\u00b3 means 4 \u00d7 4 \u00d7 4 = 64. The base (4) is what you multiply, the exponent (3) is how many times.",
    feedbackWrong: {
      "4 + 4 + 4": "4 + 4 + 4 = 12. That\u2019s 3 \u00d7 4 (repeated ADDITION). Exponents are repeated MULTIPLICATION: 4 \u00d7 4 \u00d7 4 = 64.",
      "4 \u00d7 3": "4 \u00d7 3 = 12 \u2014 that\u2019s just regular multiplication. 4\u00b3 means 4 multiplied by ITSELF three times: 4 \u00d7 4 \u00d7 4 = 64.",
      "3 \u00d7 3 \u00d7 3 \u00d7 3": "That would be 3\u2074 (base 3, exponent 4). In 4\u00b3, the BIG number (4) is the base and the small raised number (3) is the exponent.",
    },
    feedbackDefault: "4\u00b3 = 4 \u00d7 4 \u00d7 4 = 64.",
  },
  // ─── Procedure Layer ────────────────────────────────
  {
    id: "p1", layer: 1,
    prompt: "Evaluate: 2\u2075. Type the result.",
    kind: "numeric",
    correct: ["32"],
    feedbackCorrect: "2\u2075 = 2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2 = 32. Five copies of 2 multiplied together!",
    feedbackWrong: {
      "10": "10 is 2 \u00d7 5 \u2014 but remember, exponents mean REPEATED multiplication. 2\u2075 = 2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2. Start: 2 \u00d7 2 = 4, 4 \u00d7 2 = 8, 8 \u00d7 2 = 16, 16 \u00d7 2 = 32.",
      "16": "Almost! 16 is 2\u2074 (four 2s). You need one more: 16 \u00d7 2 = 32.",
      "64": "That\u2019s 2\u2076 \u2014 one level too many! 2\u2075 = 32.",
      "25": "That\u2019s 5\u00b2 (5 \u00d7 5). In 2\u2075, the base is 2 and the exponent is 5: 2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2 = 32.",
    },
    feedbackDefault: "Let\u2019s work through it: 2 \u00d7 2 = 4, 4 \u00d7 2 = 8, 8 \u00d7 2 = 16, 16 \u00d7 2 = 32.",
  },
  {
    id: "p2", layer: 1,
    prompt: "Which is GREATER? Tap the larger value.",
    kind: "tap",
    options: ["2\u2076", "6\u00b2"],
    correct: ["2\u2076"],
    feedbackCorrect: "2\u2076 = 64, while 6\u00b2 = 36. The bigger exponent won here, even with a smaller base!",
    feedbackWrong: {
      "6\u00b2": "6\u00b2 = 36, but 2\u2076 = 2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2 = 64. Even though 6 > 2, multiplying 2 by itself SIX times beats multiplying 6 by itself only twice!",
    },
    feedbackDefault: "2\u2076 = 64 > 6\u00b2 = 36.",
  },
  {
    id: "p3", layer: 1,
    prompt: "What is 7\u2070?",
    kind: "choice",
    options: ["0", "1", "7", "70"],
    correct: ["1"],
    feedbackCorrect: "Any non-zero number raised to the power 0 equals 1. Remember: 7\u00b3 = 343, 7\u00b2 = 49, 7\u00b9 = 7 \u2014 each dividing by 7. So 7\u2070 = 7 \u00f7 7 = 1.",
    feedbackWrong: {
      "0": "It\u2019s tempting to think \u2018zero power = zero,\u2019 but remember the pattern: 7\u00b3 = 343, 7\u00b2 = 49, 7\u00b9 = 7. Each divides by 7: 7 \u00f7 7 = 1. So 7\u2070 = 1!",
      "7": "7 would be 7\u00b9 (seven to the first power). 7\u2070 is one step BELOW that: 7 \u00f7 7 = 1.",
      "70": "In math, 7\u2070 doesn\u2019t mean \u2018put 7 and 0 next to each other.\u2019 The 0 is an exponent telling you to multiply 7 by itself zero times, which gives 1.",
    },
    feedbackDefault: "Any non-zero base raised to the power 0 equals 1.",
  },
  // ─── Understanding Layer ────────────────────────────
  {
    id: "u1", layer: 2,
    prompt: "A classmate says \u20182\u00b3 = 6 because you multiply 2 times 3.\u2019 What\u2019s wrong with their thinking?",
    kind: "choice",
    options: [
      "Nothing \u2014 2\u00b3 does equal 6",
      "The exponent means how many times to WRITE the base, then multiply: 2 \u00d7 2 \u00d7 2 = 8",
      "They should ADD instead: 2 + 3 = 5",
      "They mixed up the numbers: it should be 3 \u00d7 2 = 6",
    ],
    correct: ["The exponent means how many times to WRITE the base, then multiply: 2 \u00d7 2 \u00d7 2 = 8"],
    feedbackCorrect: "Exactly! The exponent 3 means \u2018write three copies of 2 and multiply them together\u2019: 2 \u00d7 2 \u00d7 2 = 8. The classmate confused exponents with regular multiplication.",
    feedbackWrong: {
      "Nothing \u2014 2\u00b3 does equal 6": "2\u00b3 actually equals 8, not 6. 2 \u00d7 3 = 6 is regular multiplication. 2\u00b3 = 2 \u00d7 2 \u00d7 2 = 8 is an exponent \u2014 repeated multiplication.",
      "They should ADD instead: 2 + 3 = 5": "Addition would give 2 + 3 = 5, but that\u2019s not what exponents do either! 2\u00b3 = 2 \u00d7 2 \u00d7 2 = 8.",
      "They mixed up the numbers: it should be 3 \u00d7 2 = 6": "2 \u00d7 3 and 3 \u00d7 2 both equal 6, but neither is what 2\u00b3 means. 2\u00b3 = 2 \u00d7 2 \u00d7 2 = 8.",
    },
    feedbackDefault: "2\u00b3 = 2 \u00d7 2 \u00d7 2 = 8, not 2 \u00d7 3 = 6.",
  },
  {
    id: "u2", layer: 2,
    prompt: "Arrange from SMALLEST to LARGEST: 3 \u00d7 4, 3\u00b3, 4\u00b2, 2\u2074. Which is the SMALLEST?",
    kind: "choice",
    options: ["3 \u00d7 4 = 12", "4\u00b2 = 16", "2\u2074 = 16", "3\u00b3 = 27"],
    correct: ["3 \u00d7 4 = 12"],
    feedbackCorrect: "3 \u00d7 4 = 12 is the smallest. Then 4\u00b2 = 2\u2074 = 16 (both equal!), and 3\u00b3 = 27 is the largest. Notice 4\u00b2 and 2\u2074 give the SAME result!",
    feedbackWrong: {},
    feedbackDefault: "3 \u00d7 4 = 12 < 4\u00b2 = 2\u2074 = 16 < 3\u00b3 = 27. The smallest is 12.",
  },
  {
    id: "u3", layer: 2,
    prompt: "You start with 1 bacterium that triples every hour. After 5 hours, how many bacteria are there?",
    kind: "choice",
    options: ["15", "5", "243", "125"],
    correct: ["243"],
    feedbackCorrect: "Each hour the count TRIPLES: 1 \u2192 3 \u2192 9 \u2192 27 \u2192 81 \u2192 243. That\u2019s 3\u2075 = 243 bacteria after 5 hours. Exponential growth is powerful!",
    feedbackWrong: {
      "15": "15 = 5 \u00d7 3. That\u2019s just one multiplication. But tripling happens EVERY hour for 5 hours: 3 \u00d7 3 \u00d7 3 \u00d7 3 \u00d7 3 = 3\u2075 = 243.",
      "5": "5 would mean only 1 new bacterium per hour (addition). But each hour, the TOTAL triples: 1, 3, 9, 27, 81, 243.",
      "125": "125 = 5\u00b3. The base should be 3 (tripling) and the exponent should be 5 (hours). 3\u2075 = 243, not 5\u00b3 = 125.",
    },
    feedbackDefault: "Tripling 5 times: 3\u2075 = 3 \u00d7 3 \u00d7 3 \u00d7 3 \u00d7 3 = 243.",
  },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [ci, setCi] = useState(0);
  const [ok, setOk] = useState(0);
  const [done, setDone] = useState(false);
  const [answer, setAnswer] = useState("");
  const [phase, setPhase] = useState<"ans" | "fb">("ans");
  const [correct, setCorrect] = useState(false);
  const [showXp, setShowXp] = useState(false);

  const p = PROBLEMS[ci]!;
  const total = PROBLEMS.length;
  const pct = ((ci + (done ? 1 : 0)) / total) * 100;

  const check = useCallback(() => {
    const prob = PROBLEMS[ci]!;
    const isOk = prob.correct.includes(prob.kind === "numeric" ? answer.trim() : answer);
    setCorrect(isOk);
    if (isOk) {
      setOk((c) => c + 1);
      setShowXp(true);
    }
    setPhase("fb");
  }, [ci, answer]);

  const next = useCallback(() => {
    if (ci + 1 >= total) { setDone(true); return; }
    setCi((i) => i + 1);
    setAnswer("");
    setPhase("ans");
    setCorrect(false);
    setShowXp(false);
  }, [ci, total]);

  const getFeedback = useCallback((): string => {
    const prob = PROBLEMS[ci]!;
    if (correct) return prob.feedbackCorrect;
    const specific = prob.feedbackWrong[answer];
    if (specific) return specific;
    return prob.feedbackDefault;
  }, [ci, correct, answer]);

  const layerClr = [colors.functional.info, colors.accent.violet, "#f59e0b"];

  if (done) {
    const acc = Math.round((ok / total) * 100);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(52,211,153,0.1)" }}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={THEME.result} strokeWidth={2.5}>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold" style={{ color: TEXT_PRIMARY }}>Practice Complete!</h2>
        <p className="mb-6" style={{ color: TEXT_SEC }}>{ok}/{total} correct ({acc}%)</p>
        <ContinueButton onClick={onComplete} />
      </motion.div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col px-4">
      {showXp && <XpFloat amount={10} />}

      {/* Progress */}
      <div className="mb-4 mt-2">
        <div className="mb-2 flex justify-between text-xs" style={{ color: TEXT_MUTED }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: layerClr[p.layer] ?? colors.functional.info }} aria-hidden="true" />
            Problem {ci + 1} / {total}
          </span>
          <span>{ok} correct</span>
        </div>
        <div className="h-1.5 w-full rounded-full overflow-hidden bg-nm-bg-surface">
          <motion.div
            className="h-full rounded-full bg-nm-accent-indigo"
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          className="flex-1"
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{ backgroundColor: SURFACE_DEEP, border: `1px solid ${SURFACE}` }}
            role="form" aria-label={p.prompt}
          >
            <p className="mb-5 text-base font-medium leading-relaxed" style={{ color: TEXT_PRIMARY }}>
              {p.prompt}
            </p>

            {phase === "ans" && (
              <>
                {(p.kind === "choice" || p.kind === "tap") && p.options && (
                  <div className="mb-5 space-y-2" role="radiogroup">
                    {p.options.map((o) => (
                      <button
                        key={o}
                        onClick={() => setAnswer(o)}
                        role="radio" aria-checked={answer === o}
                        className="w-full rounded-xl py-3 px-4 text-base font-semibold min-h-[44px] text-left transition-colors"
                        style={{
                          border: `2px solid ${answer === o ? THEME.base : BORDER}`,
                          backgroundColor: answer === o ? "rgba(129,140,248,0.12)" : SURFACE,
                          color: answer === o ? THEME.base : THEME.textSecondary,
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}

                {p.kind === "numeric" && (
                  <div className="mb-5 flex justify-center">
                    <input
                      type="text" inputMode="numeric"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="?"
                      className="min-h-[44px] w-28 rounded-xl px-4 py-3 text-center text-2xl font-bold outline-none"
                      style={{ backgroundColor: SURFACE, border: `2px solid ${answer ? THEME.base : BORDER}`, color: TEXT_PRIMARY }}
                      onKeyDown={(e) => { if (e.key === "Enter" && answer.trim()) check(); }}
                      aria-label="Type your numeric answer"
                    />
                  </div>
                )}

                <button
                  onClick={check}
                  disabled={!answer.trim()}
                  className={cn(
                    "w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px] transition-all bg-nm-accent-indigo",
                    !answer.trim() && "opacity-40 cursor-not-allowed",
                  )}
                  aria-disabled={!answer.trim()}
                >
                  Check Answer
                </button>
              </>
            )}

            {phase === "fb" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div
                  className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
                  style={{
                    backgroundColor: correct ? "rgba(52,211,153,0.15)" : "rgba(148,163,184,0.15)",
                    color: correct ? THEME.result : TEXT_SEC,
                  }}
                  aria-live="assertive"
                >
                  {correct ? "Correct! Nice work." : "Not quite \u2014 let\u2019s think about this..."}
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: TEXT_SEC }}>
                  {getFeedback()}
                </p>
                <button
                  onClick={next}
                  className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white min-h-[44px] bg-nm-accent-indigo"
                >
                  {"Next \u2192"}
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

const REFL_PROMPT = "A friend says \u20182\u00b3 = 6 because you multiply 2 times 3.\u2019 How would you explain why they\u2019re wrong and what 2\u00b3 actually means? Use the tree or tower model if it helps!";
const REFL_MIN = 20;
const REFL_MAX = 800;

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const charCount = text.trim().length;
  const canSubmit = charCount >= REFL_MIN;

  return (
    <div className="flex flex-1 flex-col px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(167,139,250,0.1)" }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={THEME.violet} strokeWidth={2}>
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 013.002 3.002L7.368 18.635a2 2 0 01-.855.506l-2.872.838a.5.5 0 01-.62-.62l.838-2.872a2 2 0 01.506-.854z" />
          </svg>
        </div>

        <h2 className="mb-2 text-lg font-bold" style={{ color: TEXT_PRIMARY }}>Reflect &amp; Explain</h2>

        <div
          className="mb-6 rounded-2xl p-4"
          style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${THEME.exponent}` }}
        >
          <p className="text-sm leading-relaxed" style={{ color: THEME.textSecondary }}>{REFL_PROMPT}</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => { if (e.target.value.length <= REFL_MAX) setText(e.target.value); }}
          placeholder="I'd explain that..."
          rows={5}
          className="w-full resize-none rounded-xl px-4 py-3 outline-none"
          style={{
            backgroundColor: SURFACE_DEEP,
            border: `1px solid ${BORDER}`,
            color: TEXT_PRIMARY,
            fontSize: 16,
            minHeight: 120,
            maxHeight: 300,
          }}
          aria-label="Explain why 2 to the third power equals 8, not 6, and what exponents really mean"
        />
        <div className="mt-2 flex justify-between">
          <span className="text-xs" style={{ color: canSubmit ? THEME.result : TEXT_MUTED }}>
            {charCount}/{REFL_MIN} min characters
          </span>
          <span className="text-xs" style={{ color: TEXT_MUTED }}>
            {text.length}/{REFL_MAX}
          </span>
        </div>
      </motion.div>

      <div className="pb-4">
        <ContinueButton onClick={onComplete} disabled={!canSubmit} label="Share My Thinking" />
        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="min-h-[44px] px-4 py-2 text-sm"
            style={{ color: TEXT_MUTED }}
            aria-label="Skip reflection"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — ExponentsLesson
   ═══════════════════════════════════════════════════════════════════════════ */

export function ExponentsLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="NO-2.6 Exponents" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook":       return <HookStage onComplete={advance} />;
          case "spatial":    return <SpatialStage onComplete={advance} />;
          case "discovery":  return <DiscoveryStage onComplete={advance} />;
          case "symbol":     return <SymbolStage onComplete={advance} />;
          case "realWorld":  return <RealWorldStage onComplete={advance} />;
          case "practice":   return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default:           return null;
        }
      }}
    </LessonShell>
  );
}
