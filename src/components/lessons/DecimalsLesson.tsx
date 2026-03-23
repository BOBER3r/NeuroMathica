"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useDrag } from "@use-gesture/react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BG = "#0f172a";
const SURFACE = "#1e293b";
const TEXT = "#f8fafc";
const TEXT_SEC = "#e2e8f0";
const MUTED = "#94a3b8";
const BORDER = "#475569";
const ELEVATED = "#334155";
const PRIMARY = "#8b5cf6";
const SUCCESS = "#34d399";
const ERROR = "#f87171";
const WARNING = "#fbbf24";

const CYAN = "#22d3ee";
const PURPLE = "#a78bfa";
const AMBER = "#f59e0b";
const ROSE = "#fb7185";
const INDIGO = "#818cf8";

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };

type Stage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGES: Stage[] = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
];

interface DecimalsLessonProps {
  onComplete?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function ContinueButton({
  onClick,
  label = "Continue",
  delay = 0,
  color = PRIMARY,
}: {
  onClick: () => void;
  label?: string;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="mx-auto mt-8 block min-w-[160px] rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors hover:brightness-110 active:scale-[0.97]"
      style={{ background: color, minHeight: 48 }}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-8"
      style={{ background: BG }}
    >
      {children}
    </motion.div>
  );
}

/** Mini 10x10 grid for illustration purposes (non-interactive) */
function MiniGrid({
  shadedCount,
  size = 180,
  fillColor = `${CYAN}80`,
  label,
}: {
  shadedCount: number;
  size?: number;
  fillColor?: string;
  label?: string;
}) {
  const cellSize = size / 10;
  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span
          className="font-mono text-lg font-bold tabular-nums"
          style={{ color: TEXT }}
        >
          {label}
        </span>
      )}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(10, ${cellSize}px)`,
          gap: 1,
          background: ELEVATED,
          borderRadius: 4,
          overflow: "hidden",
          width: size + 9,
        }}
        aria-label={
          label
            ? `Grid showing ${label}: ${shadedCount} out of 100 cells shaded`
            : `Grid with ${shadedCount} out of 100 cells shaded`
        }
      >
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              background: i < shadedCount ? fillColor : SURFACE,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
      <span className="text-xs" style={{ color: MUTED }}>
        {shadedCount} out of 100
      </span>
    </div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/DecimalsHook.webm" onComplete={onContinue} />;

  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPhase(6);
      return;
    }
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => setPhase(5), 7500),
      setTimeout(() => setPhase(6), 9500),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const tenths = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        label: `0.${i + 1}`,
        pct: ((i + 1) / 10) * 100,
      })),
    [],
  );

  const hundredths = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        label: `0.1${i + 1}`,
        pct: ((i + 1) / 10) * 100,
      })),
    [],
  );

  return (
    <StageWrapper>
      <div
        className="relative flex w-full max-w-2xl flex-col items-center justify-center gap-6"
        style={{ minHeight: "70vh" }}
        aria-live="polite"
      >
        {/* Question / info text */}
        <AnimatePresence mode="wait">
          {phase >= 2 && phase < 3 && (
            <motion.p
              key="question"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center font-semibold"
              style={{
                color: TEXT,
                fontSize: "clamp(20px, 5vw, 36px)",
                textShadow: "0 0 20px rgba(129,140,248,0.3)",
              }}
            >
              What lives between 0 and 1?
            </motion.p>
          )}

          {phase >= 3 && phase < 4 && (
            <motion.p
              key="tenths-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center font-bold tracking-wider"
              style={{ color: CYAN, fontSize: "clamp(16px, 4vw, 28px)" }}
            >
              10 numbers hiding between 0 and 1!
            </motion.p>
          )}

          {phase >= 4 && phase < 5 && (
            <motion.p
              key="hundredths-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center font-bold"
              style={{ color: PURPLE, fontSize: "clamp(16px, 4vw, 28px)" }}
            >
              10 more between 0.1 and 0.2! Every gap has 10 numbers...
            </motion.p>
          )}

          {phase >= 5 && (
            <motion.p
              key="reveal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center italic"
              style={{ color: TEXT, fontSize: "clamp(16px, 4vw, 24px)" }}
            >
              It never ends. Between any two numbers, there are infinitely more.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Number line */}
        <div className="relative w-full" style={{ height: 120 }}>
          {/* Main line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-[10%] right-[10%] top-1/2"
            style={{ height: 2, background: BORDER, transformOrigin: "center" }}
          />

          {/* End labels */}
          {phase >= 1 && (
            <>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-[60%] font-mono font-bold tabular-nums"
                style={{
                  left: "10%",
                  transform: "translateX(-50%)",
                  color: phase >= 4 ? CYAN : TEXT,
                  fontSize:
                    phase >= 4
                      ? "clamp(16px, 4vw, 24px)"
                      : "clamp(32px, 7vw, 56px)",
                }}
              >
                {phase >= 4 ? "0.1" : "0"}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-[60%] font-mono font-bold tabular-nums"
                style={{
                  right: "10%",
                  transform: "translateX(50%)",
                  color: phase >= 4 ? CYAN : TEXT,
                  fontSize:
                    phase >= 4
                      ? "clamp(16px, 4vw, 24px)"
                      : "clamp(32px, 7vw, 56px)",
                }}
              >
                {phase >= 4 ? "0.2" : "1"}
              </motion.span>
            </>
          )}

          {/* Tenths ticks */}
          {phase === 3 &&
            tenths.map((t, i) => (
              <motion.div
                key={`tenth-${t.label}`}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: i * 0.06, duration: 0.2, ease: "easeOut" }}
                className="absolute top-1/2 flex flex-col items-center"
                style={{
                  left: `${10 + t.pct * 0.8}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  style={{ width: 1.5, height: 8, background: CYAN, marginBottom: 4 }}
                />
                <span
                  className="font-mono text-xs font-semibold tabular-nums"
                  style={{ color: CYAN, fontSize: "clamp(10px, 2.5vw, 14px)" }}
                >
                  {t.label}
                </span>
              </motion.div>
            ))}

          {/* Hundredths ticks */}
          {phase === 4 &&
            hundredths.map((t, i) => (
              <motion.div
                key={`hundredth-${t.label}`}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: i * 0.04, duration: 0.2, ease: "easeOut" }}
                className="absolute top-1/2 flex flex-col items-center"
                style={{
                  left: `${10 + t.pct * 0.8}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  style={{ width: 1, height: 6, background: PURPLE, marginBottom: 4 }}
                />
                <span
                  className="font-mono font-semibold tabular-nums"
                  style={{ color: PURPLE, fontSize: "clamp(9px, 2vw, 12px)" }}
                >
                  {t.label}
                </span>
              </motion.div>
            ))}
        </div>

        {phase >= 6 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>

      {/* Screen-reader description */}
      <div className="sr-only" aria-live="polite">
        A number line from 0 to 1. Zooming in reveals 10 numbers between 0 and
        1: 0.1, 0.2, 0.3 and so on. Zooming further reveals 10 more between 0.1
        and 0.2: 0.11, 0.12, 0.13 and so on. Between any two numbers, there are
        infinitely more.
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [shadedCells, setShadedCells] = useState<Set<number>>(
    () => new Set<number>(),
  );
  const [activeModel, setActiveModel] = useState<"grid" | "numberLine">("grid");
  const [pointPosition, setPointPosition] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [hasUsedGrid, setHasUsedGrid] = useState(false);
  const [hasUsedNumberLine, setHasUsedNumberLine] = useState(false);

  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const shadedCount = shadedCells.size;
  const decimalValue =
    activeModel === "grid" ? shadedCount / 100 : pointPosition;

  const tenthsDigit = Math.floor((decimalValue * 10) % 10);
  const hundredthsDigit = Math.floor((decimalValue * 100) % 10);

  const canContinue = interactionCount >= 10 && hasUsedGrid && hasUsedNumberLine;

  const toggleCell = useCallback((cellIndex: number) => {
    setShadedCells((prev) => {
      const next = new Set(prev);
      if (next.has(cellIndex)) {
        next.delete(cellIndex);
      } else {
        next.add(cellIndex);
      }
      return next;
    });
    setInteractionCount((c) => c + 1);
    setHasUsedGrid(true);
  }, []);

  const toggleColumn = useCallback((colIndex: number) => {
    setShadedCells((prev) => {
      const next = new Set(prev);
      const columnCells = Array.from({ length: 10 }, (_, r) => r * 10 + colIndex);
      const allShaded = columnCells.every((c) => next.has(c));
      for (const c of columnCells) {
        if (allShaded) {
          next.delete(c);
        } else {
          next.add(c);
        }
      }
      return next;
    });
    setInteractionCount((c) => c + 1);
    setHasUsedGrid(true);
  }, []);

  const clearGrid = useCallback(() => {
    setShadedCells(new Set<number>());
  }, []);

  const bindDrag = useDrag(
    ({ xy: [x], active }) => {
      if (!lineRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const snapped = Math.round(pct * 20) / 20;
      setPointPosition(snapped);
      if (active) {
        setInteractionCount((c) => c + 1);
        setHasUsedNumberLine(true);
      }
    },
    { filterTaps: true, axis: "x" as const },
  );

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        {/* Decimal Display */}
        <motion.div
          key={decimalValue.toFixed(2)}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center rounded-2xl px-6 py-4"
          style={{ background: SURFACE }}
          aria-live="polite"
        >
          <span
            className="font-mono font-bold tabular-nums"
            style={{ color: TEXT, fontSize: "clamp(36px, 8vw, 56px)" }}
          >
            {decimalValue.toFixed(2)}
          </span>
          <span className="mt-1 text-sm">
            <span style={{ color: AMBER }}>{tenthsDigit} tenths</span>
            <span style={{ color: MUTED }}> + </span>
            <span style={{ color: ROSE }}>{hundredthsDigit} hundredths</span>
          </span>
          <span className="mt-0.5 text-xs" style={{ color: MUTED }}>
            = {Math.round(decimalValue * 100)}/100
          </span>
        </motion.div>

        {/* Model Toggle */}
        <div
          className="flex rounded-xl p-1"
          style={{ background: BG, border: `1px solid ${ELEVATED}` }}
          role="tablist"
          aria-label="Spatial model selection"
        >
          {(["grid", "numberLine"] as const).map((model) => (
            <button
              key={model}
              role="tab"
              aria-selected={activeModel === model}
              onClick={() => setActiveModel(model)}
              className="rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
              style={{
                minWidth: 80,
                minHeight: 40,
                background: activeModel === model ? ELEVATED : "transparent",
                color: activeModel === model ? TEXT : MUTED,
              }}
            >
              {model === "grid" ? "Grid" : "Number Line"}
            </button>
          ))}
        </div>

        {/* Grid Model */}
        {activeModel === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            {/* Column headers */}
            <div className="flex" style={{ gap: 1 }}>
              {Array.from({ length: 10 }, (_, c) => (
                <button
                  key={`col-${c}`}
                  onClick={() => toggleColumn(c)}
                  className="text-center font-mono text-[10px] font-semibold tabular-nums"
                  style={{ width: "min(8vw, 36px)", color: AMBER, minHeight: 20 }}
                  aria-label={`Toggle column ${c + 1}`}
                >
                  {c % 2 === 0 ? `0.${c + 1}` : ""}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(10, min(8vw, 36px))",
                gap: 1,
                background: ELEVATED,
                borderRadius: 4,
                overflow: "hidden",
              }}
              aria-label={`Interactive 10 by 10 grid. ${shadedCount} cells shaded. Value: ${decimalValue.toFixed(2)}`}
            >
              {Array.from({ length: 100 }, (_, i) => {
                const isShaded = shadedCells.has(i);
                return (
                  <motion.button
                    key={i}
                    onClick={() => toggleCell(i)}
                    animate={
                      isShaded
                        ? { scale: 1, opacity: 0.8 }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={reduced ? { duration: 0 } : SPRING_POP}
                    role="checkbox"
                    aria-checked={isShaded}
                    aria-label={`Row ${Math.floor(i / 10) + 1}, Column ${(i % 10) + 1}`}
                    style={{
                      width: "min(8vw, 36px)",
                      height: "min(8vw, 36px)",
                      background: isShaded ? INDIGO : SURFACE,
                      borderRadius: 2,
                      border: "none",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>

            {/* Clear button */}
            <button
              onClick={clearGrid}
              disabled={shadedCount === 0}
              className="mt-2 rounded-lg px-5 py-2 text-sm font-medium transition-colors active:scale-[0.97]"
              style={{
                background: ELEVATED,
                color: MUTED,
                minHeight: 44,
                opacity: shadedCount === 0 ? 0.3 : 1,
              }}
            >
              Clear Grid
            </button>

            {/* Full grid message */}
            <AnimatePresence>
              {shadedCount === 100 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-lg font-semibold"
                  style={{ color: TEXT }}
                >
                  {"That's a whole 1!"}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Number Line Model */}
        {activeModel === "numberLine" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full flex-col items-center gap-4"
          >
            <span
              className="font-mono text-base font-semibold tabular-nums"
              style={{ color: TEXT }}
            >
              {pointPosition.toFixed(2)}
            </span>

            <div
              ref={lineRef}
              className="relative w-[85%]"
              style={{ height: 80 }}
              role="slider"
              aria-label="Decimal value"
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={pointPosition}
            >
              <div
                className="absolute left-0 right-0 top-1/2"
                style={{ height: 2, background: BORDER }}
              />

              {Array.from({ length: 11 }, (_, i) => (
                <div
                  key={`tick-${i}`}
                  className="absolute top-1/2 flex flex-col items-center"
                  style={{
                    left: `${(i / 10) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    style={{
                      width: i === 0 || i === 10 ? 2 : 1.5,
                      height: i === 0 || i === 10 ? 12 : 8,
                      background: i === 0 || i === 10 ? TEXT : CYAN,
                    }}
                  />
                  <span
                    className="mt-1 font-mono text-xs font-semibold tabular-nums"
                    style={{
                      color: i === 0 || i === 10 ? TEXT : CYAN,
                      fontSize: i === 0 || i === 10 ? 16 : 12,
                    }}
                  >
                    {(i / 10).toFixed(1)}
                  </span>
                </div>
              ))}

              {/* Draggable point */}
              <motion.div
                {...(bindDrag() as Record<string, unknown>)}
                animate={{ left: `${pointPosition * 100}%` }}
                transition={SPRING}
                className="absolute top-1/2 cursor-grab active:cursor-grabbing"
                style={{
                  width: 44,
                  height: 44,
                  marginLeft: -22,
                  marginTop: -22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  touchAction: "none",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: INDIGO,
                    border: "2px solid #c4b5fd",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [prompt, setPrompt] = useState(1);
  const reduced = useReducedMotion();

  // Prompt 4 state
  const [p4Answer, setP4Answer] = useState<string | null>(null);
  const [p4Correct, setP4Correct] = useState(false);

  // Prompt 5 state
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [p5Checked, setP5Checked] = useState(false);
  const [p5Correct, setP5Correct] = useState(false);
  const chips = useMemo(() => ["0.7", "0.07", "0.71"], []);
  const correctOrder = useMemo(() => ["0.07", "0.7", "0.71"], []);

  const placedChips = useMemo(
    () => new Set(slots.filter((s): s is string => s !== null)),
    [slots],
  );

  const handlePlaceChip = useCallback(
    (slotIndex: number) => {
      if (!selectedChip) return;
      setSlots((prev) => {
        const next = [...prev];
        const existingIdx = next.indexOf(selectedChip);
        if (existingIdx !== -1) {
          next[existingIdx] = null;
        }
        next[slotIndex] = selectedChip;
        return next;
      });
      setSelectedChip(null);
    },
    [selectedChip],
  );

  const checkP5 = useCallback(() => {
    setP5Checked(true);
    const isCorrect = slots.every((s, i) => s === correctOrder[i]);
    setP5Correct(isCorrect);
    if (!isCorrect) {
      setTimeout(() => setP5Checked(false), 2000);
    }
  }, [slots, correctOrder]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {/* Prompt 1: The Trap */}
          {prompt === 1 && (
            <motion.div
              key="p1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex w-full flex-col items-center gap-6"
            >
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex flex-col items-center">
                  <span
                    className="font-mono font-bold tabular-nums"
                    style={{ color: TEXT, fontSize: "clamp(36px, 8vw, 56px)" }}
                  >
                    0.9
                  </span>
                  <span className="text-xs" style={{ color: MUTED }}>
                    just one digit after the point
                  </span>
                </div>

                <motion.span
                  animate={{
                    boxShadow: [
                      `0 0 0 2px ${WARNING}40`,
                      `0 0 0 6px ${WARNING}20`,
                      `0 0 0 2px ${WARNING}40`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center rounded-full font-bold"
                  style={{
                    width: 40,
                    height: 40,
                    color: WARNING,
                    fontSize: 24,
                    border: `2px solid ${WARNING}`,
                  }}
                >
                  ?
                </motion.span>

                <div className="flex flex-col items-center">
                  <span
                    className="font-mono font-bold tabular-nums"
                    style={{ color: TEXT, fontSize: "clamp(36px, 8vw, 56px)" }}
                  >
                    0.45
                  </span>
                  <span className="text-xs" style={{ color: MUTED }}>
                    two digits after the point
                  </span>
                </div>
              </div>

              <div
                className="rounded-xl px-5 py-4 text-center leading-relaxed"
                style={{ background: SURFACE, color: TEXT_SEC, fontSize: 16 }}
              >
                Which is bigger: 0.9 or 0.45? A lot of people{" "}
                <span className="font-bold" style={{ color: WARNING }}>
                  get this wrong
                </span>
                . What do YOU think?
              </div>

              <ContinueButton
                onClick={() => setPrompt(2)}
                label="Hmm, let me think..."
                color={AMBER}
              />
            </motion.div>
          )}

          {/* Prompt 2: The Grid Proof */}
          {prompt === 2 && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex w-full flex-col items-center gap-4"
            >
              <div className="flex flex-wrap items-end justify-center gap-4">
                <MiniGrid
                  shadedCount={90}
                  size={Math.min(180, 40 * 4.5)}
                  fillColor={`${CYAN}80`}
                  label="0.9"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, ...SPRING_POP }}
                  className="text-3xl font-bold"
                  style={{ color: SUCCESS }}
                >
                  {">"}
                </motion.span>
                <MiniGrid
                  shadedCount={45}
                  size={Math.min(180, 40 * 4.5)}
                  fillColor={`${PURPLE}80`}
                  label="0.45"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.4 }}
                className="max-w-md text-center text-sm leading-relaxed"
                style={{ color: TEXT_SEC }}
              >
                0.9 = 90/100. 0.45 = 45/100. When you compare using the{" "}
                <span
                  className="rounded px-1.5 py-0.5 font-bold"
                  style={{ background: `${SUCCESS}20`, color: SUCCESS }}
                >
                  SAME denominator
                </span>
                , it is obvious: 90 {">"} 45, so 0.9 {">"} 0.45. The number of
                decimal digits{" "}
                <span className="font-bold" style={{ color: WARNING }}>
                  does not tell you the size
                </span>
                !
              </motion.p>

              <ContinueButton onClick={() => setPrompt(3)} label="I see it!" />
            </motion.div>
          )}

          {/* Prompt 3: Trailing Zeros */}
          {prompt === 3 && (
            <motion.div
              key="p3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex w-full flex-col items-center gap-4"
            >
              <TrailingZerosDemo reduced={reduced} />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.4 }}
                className="max-w-md text-center text-sm leading-relaxed"
                style={{ color: TEXT_SEC }}
              >
                0.5 = 0.50 = 0.500.{" "}
                <strong>Adding zeros AFTER the last decimal digit</strong> does
                not change the value. You can always add or remove trailing zeros.
              </motion.p>

              <ContinueButton
                onClick={() => setPrompt(4)}
                label="Got it!"
                delay={3}
              />
            </motion.div>
          )}

          {/* Prompt 4: Interactive Comparison */}
          {prompt === 4 && (
            <motion.div
              key="p4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex w-full flex-col items-center gap-6"
            >
              <p
                className="text-center text-lg font-medium"
                style={{ color: TEXT }}
              >
                Now you try: Which is bigger, 0.8 or 0.62?
              </p>

              <div className="flex gap-4">
                {(["0.8", "0.62"] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setP4Answer(val);
                      if (val === "0.8") setP4Correct(true);
                    }}
                    disabled={p4Correct}
                    className="rounded-xl font-mono text-2xl font-bold tabular-nums transition-transform active:scale-[0.97]"
                    style={{
                      width: 120,
                      minHeight: 56,
                      background: ELEVATED,
                      color: TEXT,
                      border:
                        p4Answer === val
                          ? `2px solid ${val === "0.8" && p4Correct ? SUCCESS : ERROR}`
                          : "2px solid transparent",
                    }}
                    aria-label={`Select ${val}`}
                  >
                    {val}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {p4Correct && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex gap-4">
                      <MiniGrid
                        shadedCount={80}
                        size={120}
                        fillColor={`${CYAN}80`}
                        label="0.8"
                      />
                      <MiniGrid
                        shadedCount={62}
                        size={120}
                        fillColor={`${PURPLE}80`}
                        label="0.62"
                      />
                    </div>
                    <p
                      className="max-w-sm text-center text-sm"
                      style={{ color: SUCCESS }}
                    >
                      Correct! 0.8 = 80/100 which is greater than 0.62 = 62/100.
                      Think in hundredths to compare!
                    </p>
                  </motion.div>
                )}
                {p4Answer === "0.62" && !p4Correct && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-sm text-center text-sm"
                    style={{ color: ROSE }}
                  >
                    Not quite! Try thinking of both numbers as hundredths: 0.8 =
                    0.80 = 80 hundredths, and 0.62 = 62 hundredths. Now which is
                    bigger?
                  </motion.p>
                )}
              </AnimatePresence>

              {p4Correct && (
                <ContinueButton
                  onClick={() => setPrompt(5)}
                  label="One more!"
                />
              )}
            </motion.div>
          )}

          {/* Prompt 5: Ordering */}
          {prompt === 5 && (
            <motion.div
              key="p5"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex w-full flex-col items-center gap-6"
            >
              <p
                className="text-center text-lg font-medium"
                style={{ color: TEXT }}
              >
                Order from smallest to largest: 0.7, 0.07, 0.71
              </p>

              {/* Available chips */}
              <div className="flex gap-3">
                {chips.map((chip) => {
                  const isPlaced = placedChips.has(chip);
                  const isSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      onClick={() => {
                        if (p5Correct) return;
                        if (isPlaced) {
                          setSlots((prev) =>
                            prev.map((s) => (s === chip ? null : s)),
                          );
                          return;
                        }
                        setSelectedChip(isSelected ? null : chip);
                      }}
                      disabled={p5Correct}
                      className="rounded-xl font-mono text-xl font-bold tabular-nums transition-transform active:scale-[0.97]"
                      style={{
                        minWidth: 72,
                        minHeight: 56,
                        background: ELEVATED,
                        color: TEXT,
                        opacity: isPlaced ? 0.3 : 1,
                        border: isSelected
                          ? `2px solid ${INDIGO}`
                          : "2px solid transparent",
                      }}
                      aria-label={`Chip ${chip}${isSelected ? ", selected" : ""}${isPlaced ? ", placed" : ""}`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Target slots */}
              <div className="flex gap-3">
                {(["Smallest", "", "Largest"] as const).map((slotLabel, idx) => {
                  const placed = slots[idx]!;
                  const isCorrectSlot =
                    p5Checked && placed !== null && placed === correctOrder[idx];
                  const isWrongSlot =
                    p5Checked &&
                    placed !== null &&
                    placed !== correctOrder[idx];
                  return (
                    <button
                      key={`slot-${idx}`}
                      onClick={() => handlePlaceChip(idx)}
                      disabled={p5Correct || (!selectedChip && !placed)}
                      className="flex flex-col items-center gap-1"
                      aria-label={`Slot ${idx + 1}${slotLabel ? `, ${slotLabel}` : ""}${placed ? `, contains ${placed}` : ", empty"}`}
                    >
                      <span
                        className="text-xs"
                        style={{
                          color: slotLabel ? MUTED : "transparent",
                        }}
                      >
                        {slotLabel || "."}
                      </span>
                      <div
                        className="flex items-center justify-center rounded-xl font-mono text-xl font-bold tabular-nums"
                        style={{
                          minWidth: 72,
                          minHeight: 56,
                          border: `2px ${placed ? "solid" : "dashed"} ${
                            isCorrectSlot
                              ? SUCCESS
                              : isWrongSlot
                                ? ERROR
                                : selectedChip
                                  ? INDIGO
                                  : BORDER
                          }`,
                          background: placed ? ELEVATED : "transparent",
                          color: TEXT,
                        }}
                      >
                        {placed ?? ""}
                      </div>

                      {p5Correct && placed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs"
                          style={{ color: MUTED }}
                        >
                          {placed === "0.07"
                            ? "7/100"
                            : placed === "0.7"
                              ? "70/100"
                              : "71/100"}
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Check button */}
              {slots.every((s) => s !== null) && !p5Correct && (
                <button
                  onClick={checkP5}
                  className="rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
                  style={{ background: PRIMARY, minHeight: 48 }}
                >
                  Check Order
                </button>
              )}

              <AnimatePresence>
                {p5Checked && !p5Correct && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-sm text-center text-sm"
                    style={{ color: ROSE }}
                  >
                    Try converting each number to hundredths first. How many
                    hundredths is 0.07? How many is 0.7?
                  </motion.p>
                )}
              </AnimatePresence>

              {p5Correct && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <p
                    className="max-w-md text-center text-sm"
                    style={{ color: SUCCESS }}
                  >
                    0.07 has only 7 hundredths. 0.7 has 70 hundredths. 0.71 has
                    71 hundredths. Converting to the same unit makes comparison
                    easy!
                  </p>

                  <div
                    className="rounded-lg px-4 py-3 text-sm"
                    style={{
                      background: `${PRIMARY}15`,
                      borderLeft: `4px solid ${PURPLE}`,
                      color: TEXT_SEC,
                    }}
                  >
                    <strong>Key Insight:</strong> To compare decimals, think in
                    hundredths (or thousandths). The number of digits after the
                    decimal point does NOT tell you which number is bigger.
                  </div>

                  <ContinueButton onClick={onContinue} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StageWrapper>
  );
}

/** Trailing zeros animation sub-component */
function TrailingZerosDemo({ reduced }: { reduced: boolean | null }) {
  const [zeroCount, setZeroCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setZeroCount(2);
      return;
    }
    const t1 = setTimeout(() => setZeroCount(1), 1500);
    const t2 = setTimeout(() => setZeroCount(2), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  const displayValue = "0.5" + "0".repeat(zeroCount);

  return (
    <div className="flex flex-col items-center gap-4">
      <span
        className="font-mono font-bold tabular-nums"
        style={{ color: TEXT, fontSize: "clamp(32px, 7vw, 48px)" }}
      >
        {displayValue}
      </span>

      <MiniGrid
        shadedCount={50}
        size={Math.min(220, 50 * 4.4)}
        fillColor={`${CYAN}80`}
      />

      {zeroCount >= 2 && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-lg font-semibold"
          style={{ color: SUCCESS }}
        >
          Same amount shaded. Same value.
        </motion.p>
      )}
    </div>
  );
}

/* ================================================================== */
/*  STAGE 4: Symbol Bridge                                             */
/* ================================================================== */

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(5);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 5500),
      setTimeout(() => setStep(4), 7500),
      setTimeout(() => setStep(5), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        {/* Displayed value */}
        <span
          className="font-mono font-bold tabular-nums"
          style={{ color: TEXT, fontSize: "clamp(36px, 8vw, 48px)" }}
        >
          <span style={{ opacity: 0.6 }}>0</span>
          <span>.</span>
          <span
            style={{
              color: AMBER,
              textDecoration: step >= 1 ? "underline" : "none",
              textDecorationColor: AMBER,
            }}
          >
            3
          </span>
          <span
            style={{
              color: ROSE,
              textDecoration: step >= 2 ? "underline" : "none",
              textDecorationColor: ROSE,
            }}
          >
            5
          </span>
        </span>

        {/* Mini grid showing 0.35 + notation */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center">
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(10, 20px)",
                gap: 1,
                background: ELEVATED,
                borderRadius: 4,
                overflow: "hidden",
              }}
              aria-label="Grid showing 0.35: 3 columns in amber, 5 cells in rose"
            >
              {Array.from({ length: 100 }, (_, i) => {
                const col = i % 10;
                const row = Math.floor(i / 10);
                const isTenthsCol = col < 3;
                const isHundredthsCell = col === 3 && row < 5;
                return (
                  <div
                    key={i}
                    style={{
                      width: 20,
                      height: 20,
                      background: isTenthsCol
                        ? `${AMBER}80`
                        : isHundredthsCell
                          ? `${ROSE}80`
                          : SURFACE,
                      borderRadius: 1,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Notation panel */}
          <div className="flex flex-col gap-3" style={{ minWidth: 200 }}>
            {step >= 0 && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-sm"
                style={{ color: TEXT, opacity: 0.6 }}
              >
                0 ones
              </motion.p>
            )}

            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-0.5"
              >
                <span
                  className="font-mono text-sm font-semibold"
                  style={{ color: AMBER }}
                  aria-label="3 times one-tenth equals three-tenths equals 0.3"
                >
                  {`3 \u00D7 1/10 = 3/10 = 0.3`}
                </span>
                <span
                  className="text-xs italic"
                  style={{ color: AMBER, opacity: 0.7 }}
                >
                  Tenths place: first digit right of the point
                </span>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-0.5"
              >
                <span
                  className="font-mono text-sm font-semibold"
                  style={{ color: ROSE }}
                  aria-label="5 times one-hundredth equals five-hundredths equals 0.05"
                >
                  {`5 \u00D7 1/100 = 5/100 = 0.05`}
                </span>
                <span
                  className="text-xs italic"
                  style={{ color: ROSE, opacity: 0.7 }}
                >
                  Hundredths place: second digit right of the point
                </span>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-1 border-t pt-2"
                style={{ borderColor: BORDER }}
              >
                <span className="font-mono text-sm font-semibold">
                  <span style={{ color: TEXT }}>0.35 = </span>
                  <span style={{ color: AMBER }}>{`3 \u00D7 1/10`}</span>
                  <span style={{ color: TEXT }}>{" + "}</span>
                  <span style={{ color: ROSE }}>{`5 \u00D7 1/100`}</span>
                  <span style={{ color: TEXT }}>{" = 35/100"}</span>
                </span>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-2 text-xs italic leading-relaxed"
                style={{ color: TEXT_SEC }}
              >
                Each place is 1/10 of the place to its left — the same
                {` \u00D710 pattern from place value, but going RIGHT!`}
              </motion.div>
            )}

            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-2 flex flex-wrap items-center gap-2 text-xs"
              >
                <span style={{ color: TEXT }}>Ones</span>
                <span style={{ color: MUTED }}>{`\u00F710`}</span>
                <span style={{ color: AMBER }}>Tenths</span>
                <span style={{ color: MUTED }}>{`\u00F710`}</span>
                <span style={{ color: ROSE }}>Hundredths</span>
                <span style={{ color: MUTED }}>{`\u00F710`}</span>
                <span style={{ color: PURPLE }}>Thousandths</span>
              </motion.div>
            )}
          </div>
        </div>

        {step >= 5 && <ContinueButton onClick={onContinue} delay={1} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real-World Anchor                                         */
/* ================================================================== */

interface ScenarioCard {
  title: string;
  body: ReactNode;
  iconPath: ReactNode;
  iconColor: string;
}

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const cards: ScenarioCard[] = useMemo(
    () => [
      {
        title: "Every Hundredth Counts",
        iconColor: CYAN,
        iconPath: (
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        ),
        body: (
          <>
            {"Usain Bolt\u2019s world record 100m sprint: "}
            <strong style={{ color: TEXT }}>9.58</strong> seconds. The silver
            medalist ran <strong style={{ color: TEXT }}>9.69</strong> seconds.
            The difference? Just{" "}
            <strong style={{ color: SUCCESS }}>0.11</strong> seconds — eleven
            hundredths of a second!
          </>
        ),
      },
      {
        title: "Dollars and Cents ARE Decimals",
        iconColor: SUCCESS,
        iconPath: (
          <>
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <text
              x="20"
              y="25"
              textAnchor={"middle" as const}
              fill="currentColor"
              fontSize="16"
              fontWeight="bold"
            >
              $
            </text>
          </>
        ),
        body: (
          <>
            When you see <strong style={{ color: TEXT }}>$3.49</strong>, you are
            reading a decimal! The{" "}
            <span style={{ color: TEXT }}>3</span> is 3 whole dollars. The{" "}
            <span style={{ color: AMBER }}>4</span> is 4 tenths (40 cents). The{" "}
            <span style={{ color: ROSE }}>9</span> is 9 hundredths (9 cents).
          </>
        ),
      },
      {
        title: "Tenths That Matter",
        iconColor: ERROR,
        iconPath: (
          <rect
            x="16"
            y="4"
            width="8"
            height="28"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        ),
        body: (
          <>
            Normal body temperature is{" "}
            <strong style={{ color: TEXT }}>{`98.6\u00B0F`}</strong>. A fever
            starts at{" "}
            <strong style={{ color: TEXT }}>{`100.4\u00B0F`}</strong>. That is
            only a <strong style={{ color: AMBER }}>1.8</strong> degree
            difference! Doctors use tenths because whole numbers are not precise
            enough.
          </>
        ),
      },
      {
        title: "Ratings Get Real",
        iconColor: WARNING,
        iconPath: (
          <polygon
            points="20,4 24,14 35,14 26,21 29,32 20,25 11,32 14,21 5,14 16,14"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        ),
        body: (
          <>
            Your favorite game has a{" "}
            <strong style={{ color: TEXT }}>4.7</strong> star rating while
            another has <strong style={{ color: TEXT }}>4.65</strong> stars.
            Which is better? 4.7 = 4.70, and 4.70 {">"} 4.65. The trailing zero
            trick makes it clear!
          </>
        ),
      },
    ],
    [],
  );

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-4">
        <h2
          className="mb-2 text-center text-xl font-semibold"
          style={{ color: TEXT }}
        >
          Decimals Are Everywhere
        </h2>

        {cards.map((card, i) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.4, ease: "easeOut" }}
            className="flex w-full gap-4 rounded-2xl px-5 py-4"
            style={{ background: SURFACE }}
            role="article"
          >
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              style={{ color: card.iconColor, flexShrink: 0 }}
              aria-hidden="true"
            >
              {card.iconPath}
            </svg>
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold" style={{ color: TEXT }}>
                {card.title}
              </span>
              <span
                className="text-sm leading-relaxed"
                style={{ color: TEXT_SEC }}
              >
                {card.body}
              </span>
            </div>
          </motion.article>
        ))}

        <ContinueButton onClick={onContinue} delay={0.8} />
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 6: Practice                                                  */
/* ================================================================== */

type PracticeAnswer = string | null;

interface PracticeProblem {
  id: number;
  layer: "Recall" | "Procedure" | "Understanding";
  prompt: string;
  render: (props: PracticeProblemRenderProps) => ReactNode;
  correctAnswer: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

interface PracticeProblemRenderProps {
  answer: PracticeAnswer;
  setAnswer: (a: string) => void;
  checked: boolean;
  correct: boolean;
  onCheck: () => void;
}

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [answer, setAnswer] = useState<PracticeAnswer>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const problems: PracticeProblem[] = useMemo(
    () => [
      // P1: Digit Place Identification
      {
        id: 1,
        layer: "Recall" as const,
        prompt: "What place is the 7 in: 0.47?",
        correctAnswer: "Hundredths",
        correctFeedback:
          "Correct! The 7 is in the hundredths place — the second digit after the decimal point. It is worth 7/100 = 0.07.",
        incorrectFeedback:
          "Not quite. The tenths place is the FIRST digit after the decimal point (the 4). The 7 is one more spot to the right — the hundredths place.",
        render: ({ answer: ans, setAnswer: setA, checked: chk, correct: cor }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <span
              className="font-mono font-bold tabular-nums"
              style={{ fontSize: "clamp(36px, 8vw, 48px)" }}
            >
              <span style={{ color: TEXT, opacity: 0.6 }}>0</span>
              <span style={{ color: TEXT }}>.</span>
              <span style={{ color: AMBER }}>4</span>
              <span
                style={{
                  color: ROSE,
                  boxShadow: `0 0 0 4px ${ROSE}40`,
                  borderRadius: 4,
                  padding: "0 4px",
                }}
              >
                7
              </span>
            </span>

            <div
              className="flex flex-wrap justify-center gap-2"
              role="radiogroup"
              aria-label="Select the place of digit 7"
            >
              {["Ones", "Tenths", "Hundredths", "Thousandths"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "Hundredths"}
                  wrong={chk && ans === opt && opt !== "Hundredths"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                />
              ))}
            </div>
          </div>
        ),
      },
      // P2: Grid Value Reading
      {
        id: 2,
        layer: "Recall" as const,
        prompt: "What decimal does this grid show?",
        correctAnswer: "0.63",
        correctFeedback:
          "Yes! 63 out of 100 cells = 63/100 = 0.63. Six tenths (6 columns) and three hundredths (3 cells).",
        incorrectFeedback:
          "Careful! The whole grid equals 1.0, not 10. So 63 cells out of 100 = 63/100 = 0.63.",
        render: ({ answer: ans, setAnswer: setA, checked: chk, correct: cor }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <MiniGrid shadedCount={63} size={180} fillColor={`${CYAN}80`} />
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label="Select the decimal value"
            >
              {["6.3", "0.63", "0.063", "63.0"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "0.63"}
                  wrong={chk && ans === opt && opt !== "0.63"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                  wide
                />
              ))}
            </div>
          </div>
        ),
      },
      // P3: Fraction-to-Decimal
      {
        id: 3,
        layer: "Recall" as const,
        prompt: "What is 3/10 as a decimal?",
        correctAnswer: "0.3",
        correctFeedback:
          "3/10 = 0.3. The denominator 10 tells you it is tenths. Three tenths = 0.3.",
        incorrectFeedback:
          "Not quite. 0.03 would be 3 hundredths (3/100). But this is 3/10 — tenths, not hundredths. Tenths go in the first place after the decimal point.",
        render: ({ answer: ans, setAnswer: setA, checked: chk, correct: cor }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <span
              className="font-mono text-4xl font-bold"
              style={{ color: AMBER }}
              aria-label="Three tenths"
            >
              3/10
            </span>
            <MiniGrid shadedCount={30} size={140} fillColor={`${AMBER}80`} />
            <div
              className="flex flex-wrap justify-center gap-2"
              role="radiogroup"
              aria-label="Select the decimal equivalent"
            >
              {["0.03", "0.3", "3.0", "0.310"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "0.3"}
                  wrong={chk && ans === opt && opt !== "0.3"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                />
              ))}
            </div>
          </div>
        ),
      },
      // P4: Comparison
      {
        id: 4,
        layer: "Procedure" as const,
        prompt: "Which is greater: 0.6 or 0.52?",
        correctAnswer: "0.6",
        correctFeedback:
          "0.6 = 0.60 = 60 hundredths. 0.52 = 52 hundredths. 60 > 52, so 0.6 > 0.52. The trailing zero trick makes it clear!",
        incorrectFeedback:
          "Think about it with the grid: 0.6 fills 6 whole columns (60 cells), but 0.52 fills only 5 columns plus 2 cells (52 cells). 0.6 covers MORE.",
        render: ({ answer: ans, setAnswer: setA, checked: chk, correct: cor }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-3xl font-bold tabular-nums"
                style={{ color: TEXT }}
              >
                0.6
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: chk && cor ? SUCCESS : MUTED }}
              >
                {chk && cor ? ">" : "?"}
              </span>
              <span
                className="font-mono text-3xl font-bold tabular-nums"
                style={{ color: TEXT }}
              >
                0.52
              </span>
            </div>
            <div className="flex gap-4">
              <MiniGrid shadedCount={60} size={120} fillColor={`${CYAN}80`} />
              <MiniGrid
                shadedCount={52}
                size={120}
                fillColor={`${PURPLE}80`}
              />
            </div>
            <div
              className="flex gap-3"
              role="radiogroup"
              aria-label="Select the greater decimal"
            >
              {["0.6", "0.52"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "0.6"}
                  wrong={chk && ans === opt && opt !== "0.6"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                  mono
                />
              ))}
            </div>
          </div>
        ),
      },
      // P5: Number Line Placement
      {
        id: 5,
        layer: "Procedure" as const,
        prompt: "Drag the point to 0.35 on the number line.",
        correctAnswer: "0.35",
        correctFeedback:
          "0.35 is 3 tenths and 5 hundredths past zero. On the number line, that is just past the 0.3 mark.",
        incorrectFeedback:
          "Not quite! 0.35 should be between 0.3 and 0.4, closer to the 0.3 side. Look at the tenths marks to guide you.",
        render: (props: PracticeProblemRenderProps) => (
          <NumberLineProblem {...props} />
        ),
      },
      // P6: Order Decimals
      {
        id: 6,
        layer: "Procedure" as const,
        prompt: "Order from least to greatest: 0.4, 0.09, 0.41, 0.399",
        correctAnswer: "0.09,0.399,0.4,0.41",
        correctFeedback:
          "Converting to thousandths: 90 < 399 < 400 < 410. Notice that 0.4 > 0.399 even though 0.399 has more digits!",
        incorrectFeedback:
          "Try writing each number with 3 decimal places: 0.090, 0.399, 0.400, 0.410. Now compare!",
        render: (props: PracticeProblemRenderProps) => (
          <OrderProblem
            items={["0.4", "0.09", "0.41", "0.399"]}
            correctOrder={["0.09", "0.399", "0.4", "0.41"]}
            {...props}
          />
        ),
      },
      // P7: Misconception Buster
      {
        id: 7,
        layer: "Understanding" as const,
        prompt:
          "Sarah says 0.45 > 0.9 because 45 > 9. Why is Sarah wrong?",
        correctAnswer: "B",
        correctFeedback:
          "Exactly! Sarah treated the digits after the decimal point as a whole number. But 0.9 = 0.90 = 90/100, and 90 > 45.",
        incorrectFeedback:
          "The key is to compare using the same unit. 0.9 = 0.90 = 90 hundredths, and 0.45 = 45 hundredths. 90 > 45.",
        render: ({ answer: ans, setAnswer: setA, checked: chk, correct: cor }: PracticeProblemRenderProps) => (
          <div
            className="flex flex-col gap-2"
            role="radiogroup"
            aria-label="Why is Sarah wrong?"
          >
            {[
              {
                key: "A",
                text: "Because 0.45 has more digits so it must be smaller",
              },
              {
                key: "B",
                text: "Because 0.9 = 0.90, and 90 hundredths > 45 hundredths",
              },
              {
                key: "C",
                text: "Because 9 is an odd number and 45 is not",
              },
              {
                key: "D",
                text: "Because you cannot compare decimals with different numbers of digits",
              },
            ].map((opt) => (
              <McButton
                key={opt.key}
                label={opt.text}
                selected={ans === opt.key}
                correct={chk && opt.key === "B"}
                wrong={chk && ans === opt.key && opt.key !== "B"}
                onClick={() => !chk && setA(opt.key)}
                disabled={chk && cor}
                wide
              />
            ))}
          </div>
        ),
      },
      // P8: Grid Shading
      {
        id: 8,
        layer: "Understanding" as const,
        prompt: "Shade the grid to show 0.08. How many cells is that?",
        correctAnswer: "8",
        correctFeedback:
          "8 cells = 8/100 = 0.08. That is ZERO full columns (zero tenths) and 8 individual cells. This is why 0.08 < 0.8 — 0.8 is 80 cells!",
        incorrectFeedback:
          "0.08 means 8 hundredths. Each cell is one hundredth. You need exactly 8 cells shaded.",
        render: (props: PracticeProblemRenderProps) => (
          <GridShadingProblem targetCount={8} {...props} />
        ),
      },
      // P9: True/False
      {
        id: 9,
        layer: "Understanding" as const,
        prompt: "Are these statements TRUE or FALSE?",
        correctAnswer: "T,F,F",
        correctFeedback:
          "0.5 and 0.50 are the same (trailing zeros). 0.30 = 0.3, not greater. 0.19 = 19/100 < 0.2 = 20/100.",
        incorrectFeedback:
          "Trailing zeros do not change value (0.5 = 0.50). To compare 0.19 and 0.2, think: 19/100 < 20/100.",
        render: (props: PracticeProblemRenderProps) => (
          <TrueFalseProblem {...props} />
        ),
      },
    ],
    [],
  );

  const problem = problems[currentProblem]!;
  const isCustomCheck = [5, 8, 9].includes(problem.id);

  const handleCheck = useCallback(() => {
    if (!answer) return;
    const isCorrect = answer === problem.correctAnswer;
    setCorrect(isCorrect);
    setChecked(true);
  }, [answer, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    setResults((prev) => [...prev, correct]);
    if (currentProblem < problems.length - 1) {
      setCurrentProblem((p) => p + 1);
      setAnswer(null);
      setChecked(false);
      setCorrect(false);
    }
  }, [correct, currentProblem, problems.length]);

  const isLastProblem = currentProblem === problems.length - 1;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-4">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {problems.map((p, i) => (
            <div
              key={p.id}
              className="rounded-full"
              style={{
                width: 12,
                height: 12,
                background:
                  i < results.length
                    ? results[i]
                      ? SUCCESS
                      : ERROR
                    : i === currentProblem
                      ? PRIMARY
                      : ELEVATED,
                border:
                  i === currentProblem ? `2px solid ${PRIMARY}` : "none",
              }}
            />
          ))}
        </div>

        {/* Problem card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="flex w-full flex-col gap-4 rounded-2xl px-5 py-5"
            style={{ background: SURFACE }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: MUTED }}>
                Problem {currentProblem + 1} of {problems.length}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{ background: `${PRIMARY}20`, color: PURPLE }}
              >
                {problem.layer}
              </span>
            </div>

            <p
              className="text-center text-base font-medium leading-relaxed"
              style={{ color: TEXT }}
            >
              {problem.prompt}
            </p>

            {problem.render({
              answer,
              setAnswer,
              checked,
              correct,
              onCheck: handleCheck,
            })}

            {/* Check button for standard MC problems */}
            {answer && !checked && !isCustomCheck && (
              <button
                onClick={handleCheck}
                className="mx-auto mt-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
                style={{ background: PRIMARY, minHeight: 48 }}
              >
                Check
              </button>
            )}

            {/* Feedback */}
            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-2"
                aria-live="assertive"
              >
                <p
                  className="text-center text-sm leading-relaxed"
                  style={{ color: correct ? SUCCESS : ROSE }}
                >
                  {correct
                    ? problem.correctFeedback
                    : problem.incorrectFeedback}
                </p>

                {correct && (
                  <button
                    onClick={isLastProblem ? onContinue : handleNext}
                    className="mt-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
                    style={{ background: PRIMARY, minHeight: 48 }}
                  >
                    {isLastProblem ? "Continue" : "Next \u2192"}
                  </button>
                )}

                {!correct && (
                  <button
                    onClick={() => {
                      setChecked(false);
                      setAnswer(null);
                    }}
                    className="mx-auto mt-1 text-sm underline"
                    style={{ color: MUTED, minHeight: 44 }}
                  >
                    Try again
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </StageWrapper>
  );
}

/* -- Practice sub-components ---------------------------------------- */

function McButton({
  label,
  selected,
  correct,
  wrong,
  onClick,
  disabled,
  wide,
  mono,
}: {
  label: string;
  selected: boolean;
  correct: boolean;
  wrong: boolean;
  onClick: () => void;
  disabled: boolean;
  wide?: boolean;
  mono?: boolean;
}) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl text-left transition-transform active:scale-[0.97] ${
        wide ? "w-full" : ""
      } ${mono ? "font-mono tabular-nums" : ""}`}
      style={{
        minWidth: wide ? undefined : 100,
        minHeight: 48,
        padding: "12px 16px",
        fontSize: wide ? 14 : 16,
        fontWeight: 600,
        background: correct
          ? `${SUCCESS}15`
          : wrong
            ? `${ERROR}15`
            : ELEVATED,
        color: correct ? SUCCESS : wrong ? ERROR : TEXT,
        border: correct
          ? `2px solid ${SUCCESS}`
          : wrong
            ? `2px solid ${ERROR}`
            : selected
              ? `2px solid ${INDIGO}`
              : "2px solid transparent",
        opacity: disabled && !correct && !wrong ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

function NumberLineProblem({
  checked,
  correct,
  onCheck,
  setAnswer,
}: PracticeProblemRenderProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [moved, setMoved] = useState(false);

  const bindDrag = useDrag(
    ({ xy: [x] }) => {
      if (!lineRef.current || checked) return;
      const rect = lineRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const snapped = Math.round(pct * 20) / 20;
      setPos(snapped);
      setMoved(true);
    },
    { filterTaps: true, axis: "x" as const },
  );

  const handleCheck = useCallback(() => {
    // Accept 0.33 to 0.37
    if (pos >= 0.33 && pos <= 0.37) {
      setAnswer("0.35");
    } else {
      setAnswer(pos.toFixed(2));
    }
    onCheck();
  }, [pos, onCheck, setAnswer]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span
        className="font-mono text-base font-semibold tabular-nums"
        style={{ color: TEXT }}
      >
        {pos.toFixed(2)}
      </span>

      <div
        ref={lineRef}
        className="relative w-full"
        style={{ height: 80 }}
        role="slider"
        aria-label="Place point on number line"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={pos}
      >
        <div
          className="absolute left-0 right-0 top-1/2"
          style={{ height: 2, background: BORDER }}
        />

        {Array.from({ length: 11 }, (_, i) => (
          <div
            key={`tick-${i}`}
            className="absolute top-1/2 flex flex-col items-center"
            style={{
              left: `${(i / 10) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              style={{
                width: i === 0 || i === 5 || i === 10 ? 2 : 1.5,
                height: i === 0 || i === 5 || i === 10 ? 12 : 8,
                background: i === 0 || i === 5 || i === 10 ? TEXT : CYAN,
              }}
            />
            <span
              className="mt-1 font-mono text-xs tabular-nums"
              style={{
                color: i === 0 || i === 5 || i === 10 ? TEXT : CYAN,
                fontSize: 12,
              }}
            >
              {(i / 10).toFixed(1)}
            </span>
          </div>
        ))}

        {/* Ghost marker when incorrect */}
        {checked && !correct && (
          <div
            className="absolute top-1/2"
            style={{
              left: "35%",
              width: 16,
              height: 16,
              marginLeft: -8,
              marginTop: -8,
              borderRadius: "50%",
              border: `2px dashed ${SUCCESS}`,
              opacity: 0.6,
            }}
          />
        )}

        {/* Draggable point */}
        <motion.div
          {...(checked ? {} : (bindDrag() as Record<string, unknown>))}
          animate={{ left: `${pos * 100}%` }}
          transition={SPRING}
          className="absolute top-1/2 cursor-grab active:cursor-grabbing"
          style={{
            width: 44,
            height: 44,
            marginLeft: -22,
            marginTop: -22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "none",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: checked
                ? correct
                  ? SUCCESS
                  : ERROR
                : INDIGO,
              border: `2px solid ${checked ? (correct ? SUCCESS : ERROR) : "#c4b5fd"}`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          />
        </motion.div>
      </div>

      {moved && !checked && (
        <button
          onClick={handleCheck}
          className="rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
          style={{ background: PRIMARY, minHeight: 48 }}
        >
          Check
        </button>
      )}
    </div>
  );
}

function OrderProblem({
  items,
  correctOrder,
  checked,
  correct: _correct,
  setAnswer,
}: PracticeProblemRenderProps & {
  items: string[];
  correctOrder: string[];
}) {
  const [slots, setSlots] = useState<(string | null)[]>(
    () => new Array<string | null>(items.length).fill(null),
  );
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const placedSet = useMemo(
    () => new Set(slots.filter((s): s is string => s !== null)),
    [slots],
  );

  const handlePlaceChip = useCallback(
    (slotIndex: number) => {
      if (!selectedChip || checked) return;
      setSlots((prev) => {
        const next = [...prev];
        const existingIdx = next.indexOf(selectedChip);
        if (existingIdx !== -1) next[existingIdx] = null;
        next[slotIndex] = selectedChip;
        return next;
      });
      setSelectedChip(null);
    },
    [selectedChip, checked],
  );

  useEffect(() => {
    if (slots.every((s) => s !== null)) {
      setAnswer(slots.join(","));
    }
  }, [slots, setAnswer]);

  const slotLabels = ["Least", "", "", "Greatest"];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item) => {
          const isPlaced = placedSet.has(item);
          const isSelected = selectedChip === item;
          return (
            <button
              key={item}
              onClick={() => {
                if (checked) return;
                if (isPlaced) {
                  setSlots((prev) =>
                    prev.map((s) => (s === item ? null : s)),
                  );
                  return;
                }
                setSelectedChip(isSelected ? null : item);
              }}
              disabled={checked}
              className="rounded-xl font-mono text-lg font-bold tabular-nums transition-transform active:scale-[0.97]"
              style={{
                minWidth: 72,
                minHeight: 48,
                padding: "8px 12px",
                background: ELEVATED,
                color: TEXT,
                opacity: isPlaced ? 0.3 : 1,
                border: isSelected
                  ? `2px solid ${INDIGO}`
                  : "2px solid transparent",
              }}
              aria-label={`${item}${isSelected ? ", selected" : ""}${isPlaced ? ", placed" : ""}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {slots.map((placed, idx) => {
          const isCorrectSlot =
            checked && placed !== null && placed === correctOrder[idx];
          const isWrongSlot =
            checked && placed !== null && placed !== correctOrder[idx];
          return (
            <button
              key={`slot-${idx}`}
              onClick={() => handlePlaceChip(idx)}
              disabled={checked || !selectedChip}
              className="flex flex-col items-center gap-0.5"
              aria-label={`Slot ${idx + 1}, ${slotLabels[idx] ?? ""}${placed ? `, contains ${placed}` : ", empty"}`}
            >
              <span className="text-[10px]" style={{ color: MUTED }}>
                {slotLabels[idx] ?? ""}
              </span>
              <div
                className="flex items-center justify-center rounded-xl font-mono text-lg font-bold tabular-nums"
                style={{
                  minWidth: 72,
                  minHeight: 48,
                  border: `2px ${placed ? "solid" : "dashed"} ${
                    isCorrectSlot
                      ? SUCCESS
                      : isWrongSlot
                        ? ERROR
                        : selectedChip
                          ? INDIGO
                          : BORDER
                  }`,
                  background: placed ? ELEVATED : "transparent",
                  color: TEXT,
                }}
              >
                {placed ?? ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GridShadingProblem({
  targetCount,
  checked,
  correct,
  onCheck,
  setAnswer,
}: PracticeProblemRenderProps & { targetCount: number }) {
  const [shadedCells, setShadedCells] = useState<Set<number>>(
    () => new Set<number>(),
  );

  const toggleCell = useCallback(
    (idx: number) => {
      if (checked) return;
      setShadedCells((prev) => {
        const next = new Set(prev);
        if (next.has(idx)) {
          next.delete(idx);
        } else {
          next.add(idx);
        }
        return next;
      });
    },
    [checked],
  );

  const handleCheck = useCallback(() => {
    setAnswer(String(shadedCells.size));
    onCheck();
  }, [shadedCells.size, setAnswer, onCheck]);

  // Keep answer in sync with shading
  useEffect(() => {
    setAnswer(String(shadedCells.size));
  }, [shadedCells.size, setAnswer]);

  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="font-mono text-2xl font-bold tabular-nums"
        style={{ color: TEXT }}
      >
        Target: 0.0{targetCount}
      </span>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(10, 18px)",
          gap: 1,
          background: ELEVATED,
          borderRadius: 4,
          overflow: "hidden",
        }}
        aria-label={`Interactive grid. ${shadedCells.size} cells shaded.`}
      >
        {Array.from({ length: 100 }, (_, i) => {
          const isShaded = shadedCells.has(i);
          return (
            <button
              key={i}
              onClick={() => toggleCell(i)}
              role="checkbox"
              aria-checked={isShaded}
              aria-label={`Row ${Math.floor(i / 10) + 1}, Column ${(i % 10) + 1}`}
              style={{
                width: 18,
                height: 18,
                background: isShaded
                  ? checked
                    ? correct
                      ? SUCCESS
                      : ERROR
                    : INDIGO
                  : SURFACE,
                borderRadius: 1,
                border: "none",
                cursor: checked ? "default" : "pointer",
              }}
            />
          );
        })}
      </div>

      <span className="text-xs" style={{ color: MUTED }}>
        {shadedCells.size} cells shaded
      </span>

      {!checked && (
        <button
          onClick={handleCheck}
          disabled={shadedCells.size === 0}
          className="rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
          style={{
            background: PRIMARY,
            minHeight: 48,
            opacity: shadedCells.size === 0 ? 0.4 : 1,
          }}
        >
          Check
        </button>
      )}
    </div>
  );
}

function TrueFalseProblem({
  checked,
  onCheck,
  setAnswer,
}: PracticeProblemRenderProps) {
  const statements = useMemo(
    () => [
      { text: "0.5 = 0.50", correct: true },
      { text: "0.30 > 0.3", correct: false },
      { text: "0.19 > 0.2", correct: false },
    ],
    [],
  );

  const feedbacks = useMemo(
    () => [
      "0.5 and 0.50 are the same — trailing zeros do not change the value.",
      "0.30 and 0.3 are equal, not greater. 0.30 = 0.3. Trailing zeros again!",
      "0.19 = 19/100 = 0.190. 0.2 = 20/100 = 0.200. Since 19 < 20, 0.19 < 0.2.",
    ],
    [],
  );

  const [toggles, setToggles] = useState<(boolean | null)[]>([
    null,
    null,
    null,
  ]);

  const setToggle = useCallback(
    (idx: number, val: boolean) => {
      if (checked) return;
      setToggles((prev) => {
        const next = [...prev];
        next[idx] = val;
        return next;
      });
    },
    [checked],
  );

  const allSet = toggles.every((t) => t !== null);

  useEffect(() => {
    if (allSet) {
      const answerStr = toggles.map((t) => (t ? "T" : "F")).join(",");
      setAnswer(answerStr);
    }
  }, [toggles, allSet, setAnswer]);

  return (
    <div className="flex flex-col gap-3">
      {statements.map((stmt, idx) => {
        const toggle = toggles[idx];
        const isCorrectToggle = checked && toggle === stmt.correct;
        const isWrongToggle =
          checked && toggle !== null && toggle !== stmt.correct;

        return (
          <div
            key={stmt.text}
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            style={{
              background: BG,
              border: `1px solid ${
                isCorrectToggle
                  ? SUCCESS
                  : isWrongToggle
                    ? ERROR
                    : BORDER
              }`,
            }}
          >
            <span className="text-sm" style={{ color: TEXT_SEC }}>
              {stmt.text}
            </span>
            <div className="flex gap-1">
              <button
                role="switch"
                aria-checked={toggle === true}
                aria-label={`${stmt.text}: True`}
                onClick={() => setToggle(idx, true)}
                disabled={checked}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  minWidth: 44,
                  minHeight: 36,
                  background:
                    toggle === true
                      ? checked
                        ? stmt.correct
                          ? `${SUCCESS}20`
                          : `${ERROR}20`
                        : `${SUCCESS}20`
                      : ELEVATED,
                  color:
                    toggle === true
                      ? checked
                        ? stmt.correct
                          ? SUCCESS
                          : ERROR
                        : SUCCESS
                      : MUTED,
                  border:
                    toggle === true
                      ? `1px solid ${
                          checked
                            ? stmt.correct
                              ? SUCCESS
                              : ERROR
                            : SUCCESS
                        }`
                      : "1px solid transparent",
                }}
              >
                True
              </button>
              <button
                role="switch"
                aria-checked={toggle === false}
                aria-label={`${stmt.text}: False`}
                onClick={() => setToggle(idx, false)}
                disabled={checked}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  minWidth: 44,
                  minHeight: 36,
                  background:
                    toggle === false
                      ? checked
                        ? !stmt.correct
                          ? `${SUCCESS}20`
                          : `${ERROR}20`
                        : `${ERROR}20`
                      : ELEVATED,
                  color:
                    toggle === false
                      ? checked
                        ? !stmt.correct
                          ? SUCCESS
                          : ERROR
                        : ERROR
                      : MUTED,
                  border:
                    toggle === false
                      ? `1px solid ${
                          checked
                            ? !stmt.correct
                              ? SUCCESS
                              : ERROR
                            : ERROR
                        }`
                      : "1px solid transparent",
                }}
              >
                False
              </button>
            </div>
          </div>
        );
      })}

      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-1"
        >
          {feedbacks.map((fb, idx) => {
            const isCorrectToggle =
              toggles[idx] === statements[idx]!.correct;
            return (
              <p
                key={fb}
                className="text-xs leading-relaxed"
                style={{ color: isCorrectToggle ? SUCCESS : TEXT_SEC }}
              >
                {fb}
              </p>
            );
          })}
        </motion.div>
      )}

      {allSet && !checked && (
        <button
          onClick={onCheck}
          className="mx-auto rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
          style={{ background: PRIMARY, minHeight: 48 }}
        >
          Check All
        </button>
      )}
    </div>
  );
}

/* ================================================================== */
/*  STAGE 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const trimmedLength = text.trim().length;
  const canSubmit = trimmedLength >= 20;

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setSubmitted(true);
  }, [canSubmit]);

  const showCompletion = submitted || skipped;

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        {!showCompletion && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col gap-4 rounded-2xl px-5 py-5"
            style={{ background: SURFACE }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{
                color: PURPLE,
                background: `${PRIMARY}15`,
                padding: "4px 10px",
                borderRadius: 12,
                alignSelf: "flex-start",
              }}
            >
              Reflection
            </span>

            <label
              htmlFor="reflection-textarea"
              className="text-lg font-medium leading-relaxed"
              style={{ color: TEXT }}
            >
              Your friend says 0.45 is bigger than 0.9 &quot;because 45 is
              bigger than 9.&quot; How would you explain why they are wrong?
            </label>

            {/* Visual hint */}
            <div className="flex justify-center gap-3">
              <MiniGrid
                shadedCount={90}
                size={100}
                fillColor={`${CYAN}80`}
                label="0.9"
              />
              <span
                className="self-center text-2xl font-bold"
                style={{ color: SUCCESS }}
              >
                {">"}
              </span>
              <MiniGrid
                shadedCount={45}
                size={100}
                fillColor={`${PURPLE}80`}
                label="0.45"
              />
            </div>

            <div className="relative">
              <textarea
                id="reflection-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="I would tell my friend that..."
                className="w-full resize-none rounded-xl p-4 text-base leading-relaxed"
                style={{
                  background: BG,
                  color: TEXT_SEC,
                  border: `1px solid ${BORDER}`,
                  minHeight: 120,
                  maxHeight: 240,
                }}
                rows={4}
              />
              <span
                className="absolute bottom-2 right-3 text-xs"
                style={{ color: canSubmit ? SUCCESS : MUTED }}
              >
                {trimmedLength} / 20 minimum
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full rounded-xl py-3 text-base font-semibold text-white transition-colors active:scale-[0.97]"
              style={{
                background: PRIMARY,
                minHeight: 52,
                opacity: canSubmit ? 1 : 0.4,
                pointerEvents: canSubmit ? "auto" : "none",
              }}
            >
              Submit Reflection
            </button>

            <button
              onClick={() => setSkipped(true)}
              className="mx-auto text-sm underline"
              style={{ color: MUTED, minHeight: 36 }}
              aria-label="Skip reflection (0 XP earned)"
            >
              Skip
            </button>
          </motion.div>
        )}

        {showCompletion && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full flex-col items-center gap-6"
          >
            {submitted && (
              <div
                className="flex w-full flex-col gap-3 rounded-2xl px-5 py-5"
                style={{ background: SURFACE }}
              >
                <p
                  className="text-center text-base font-medium"
                  style={{ color: SUCCESS }}
                >
                  Great reflection! Explaining concepts in your own words is one
                  of the most powerful ways to learn.
                </p>

                <div className="flex justify-center gap-3">
                  <span
                    className="font-mono text-xl font-bold tabular-nums"
                    style={{ color: CYAN }}
                  >
                    0.9 = 90/100
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: SUCCESS }}
                  >
                    {">"}
                  </span>
                  <span
                    className="font-mono text-xl font-bold tabular-nums"
                    style={{ color: PURPLE }}
                  >
                    0.45 = 45/100
                  </span>
                </div>

                <p
                  className="text-center text-sm italic"
                  style={{ color: TEXT_SEC }}
                >
                  90 hundredths {">"} 45 hundredths. Position, not digit count,
                  determines value.
                </p>
              </div>
            )}

            {skipped && (
              <p
                className="text-center text-base"
                style={{ color: MUTED }}
              >
                Reflection skipped. You can always revisit this lesson to try
                explaining the concept.
              </p>
            )}

            <ContinueButton
              onClick={onComplete}
              label="Complete Lesson"
              delay={1}
            />
          </motion.div>
        )}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

export function DecimalsLesson({ onComplete }: DecimalsLessonProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const currentStage = STAGES[stageIndex];

  const advance = useCallback(() => {
    if (stageIndex < STAGES.length - 1) {
      setStageIndex((i) => i + 1);
    }
  }, [stageIndex]);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <div className="relative min-h-dvh" style={{ background: BG }}>
      {/* Stage progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-1.5 bg-black/30 py-2 backdrop-blur-sm">
        {STAGES.map((s, i) => (
          <div
            key={s}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i <= stageIndex ? 32 : 16,
              background:
                i < stageIndex
                  ? SUCCESS
                  : i === stageIndex
                    ? PRIMARY
                    : ELEVATED,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStage === "hook" && (
          <HookStage key="hook" onContinue={advance} />
        )}
        {currentStage === "spatial" && (
          <SpatialStage key="spatial" onContinue={advance} />
        )}
        {currentStage === "discovery" && (
          <DiscoveryStage key="discovery" onContinue={advance} />
        )}
        {currentStage === "symbol" && (
          <SymbolBridgeStage key="symbol" onContinue={advance} />
        )}
        {currentStage === "realWorld" && (
          <RealWorldStage key="realWorld" onContinue={advance} />
        )}
        {currentStage === "practice" && (
          <PracticeStage key="practice" onContinue={advance} />
        )}
        {currentStage === "reflection" && (
          <ReflectionStage key="reflection" onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
