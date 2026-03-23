"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

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
/*  Shared token aliases                                               */
/* ------------------------------------------------------------------ */

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const MUTED = colors.text.secondary;
const BORDER = colors.bg.elevated;
const ELEVATED = colors.bg.surface;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;
const WARNING = colors.functional.warning;

const EMERALD = colors.accent.emerald;
const INDIGO = colors.accent.indigo;
const PURPLE = colors.accent.violet;
const ROSE = colors.accent.rose;

const SPRING = springs.default;
const SPRING_POP = springs.pop;

/* ------------------------------------------------------------------ */
/*  Lesson-specific theme (values not in shared palette)               */
/* ------------------------------------------------------------------ */

const THEME = {
  /** Original primary — deeper violet than colors.accent.violet */
  primary: "#8b5cf6",
  /** Amber accent — warmer than colors.accent.amber */
  amber: "#f59e0b",
  /** Light text secondary — brighter than the muted token */
  textSec: "#e2e8f0",
} as const;

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

/** Stage content wrapper — replaces the old StageWrapper now that LessonShell handles transitions. */
function StageContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center bg-nm-bg-primary px-4 py-8">
      {children}
    </div>
  );
}

/** Mini 10x10 grid for illustration purposes (non-interactive) */
function MiniGrid({
  shadedCount,
  size = 180,
  fillColor = `${INDIGO}cc`,
  label,
  rows = 10,
  cols = 10,
}: {
  shadedCount: number;
  size?: number;
  fillColor?: string;
  label?: string;
  rows?: number;
  cols?: number;
}) {
  const totalCells = rows * cols;
  const cellSize = size / cols;
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
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gap: 1,
          background: ELEVATED,
          borderRadius: 4,
          overflow: "hidden",
          width: size + (cols - 1),
        }}
        aria-label={
          label
            ? `Grid showing ${label}: ${shadedCount} out of ${totalCells} cells shaded`
            : `Grid with ${shadedCount} out of ${totalCells} cells shaded`
        }
      >
        {Array.from({ length: totalCells }, (_, i) => (
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
        {shadedCount} out of {totalCells}
      </span>
    </div>
  );
}

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
        minHeight: 52,
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

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/PercentsHook.webm" onComplete={onContinue} />;

  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPhase(7);
      return;
    }
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 5500),
      setTimeout(() => setPhase(6), 6500),
      setTimeout(() => setPhase(7), 10000),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 7)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  /* Battery fill height = 120 * 0.45 = 54px */
  const fillH = 54;
  const fillY = 206;

  return (
    <StageContent>
      <div
        className="relative flex w-full max-w-2xl flex-col items-center justify-center gap-6"
        style={{ minHeight: "70vh" }}
        aria-live="polite"
      >
        {/* Question text */}
        {phase >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center font-semibold"
            style={{
              color: TEXT,
              fontSize: "clamp(20px, 5vw, 28px)",
              textShadow: "0 0 20px rgba(129,140,248,0.3)",
            }}
          >
            Which phone has more charge?
          </motion.p>
        )}

        {/* Two phones side-by-side as SVG */}
        <svg
          viewBox="0 0 800 400"
          className="w-full max-w-lg"
          role="img"
          aria-label="Two phones showing 45 percent and 45 out of 100"
        >
          <rect width="800" height="400" fill={BG} rx="8" />

          {/* Left phone */}
          {phase >= 0 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <rect
                x={140} y={80} width={120} height={220}
                fill={SURFACE} stroke={BORDER} strokeWidth={2} rx={16}
              />
              <rect
                x={160} y={140} width={80} height={120}
                fill={BG} stroke={ELEVATED} strokeWidth={1} rx={4}
              />
              {/* Battery fill left */}
              {phase >= 4 && (
                <motion.rect
                  x={162}
                  width={76}
                  rx={3}
                  fill={EMERALD}
                  initial={{ y: fillY + fillH, height: 0 }}
                  animate={{ y: fillY, height: fillH }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              )}
            </motion.g>
          )}

          {/* Left label: 45% */}
          {phase >= 2 && (
            <motion.text
              x={200} y={115}
              textAnchor={"middle" as const}
              fill={EMERALD}
              fontSize={28}
              fontWeight={700}
              fontFamily="monospace"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={SPRING_POP}
            >
              45%
            </motion.text>
          )}

          {/* Right phone */}
          {phase >= 0 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <rect
                x={540} y={80} width={120} height={220}
                fill={SURFACE} stroke={BORDER} strokeWidth={2} rx={16}
              />
              <rect
                x={560} y={140} width={80} height={120}
                fill={BG} stroke={ELEVATED} strokeWidth={1} rx={4}
              />
              {/* Battery fill right */}
              {phase >= 4 && (
                <motion.rect
                  x={562}
                  width={76}
                  rx={3}
                  fill={INDIGO}
                  initial={{ y: fillY + fillH, height: 0 }}
                  animate={{ y: fillY, height: fillH }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              )}
            </motion.g>
          )}

          {/* Right label: 45/100 */}
          {phase >= 3 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={SPRING_POP}
            >
              <text
                x={600} y={105}
                textAnchor={"middle" as const}
                fill={INDIGO}
                fontSize={22}
                fontWeight={700}
                fontFamily="monospace"
              >
                45
              </text>
              <line x1={582} y1={110} x2={618} y2={110} stroke={INDIGO} strokeWidth={2} />
              <text
                x={600} y={128}
                textAnchor={"middle" as const}
                fill={INDIGO}
                fontSize={22}
                fontWeight={700}
                fontFamily="monospace"
              >
                100
              </text>
            </motion.g>
          )}

          {/* Equals sign */}
          {phase >= 5 && (
            <motion.text
              x={400} y={215}
              textAnchor={"middle" as const}
              fill={WARNING}
              fontSize={64}
              fontWeight={700}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_POP, duration: 1 }}
            >
              =
            </motion.text>
          )}

          {/* Reveal text */}
          {phase >= 6 && (
            <motion.text
              x={400} y={365}
              textAnchor={"middle" as const}
              fill={TEXT}
              fontSize={18}
              fontStyle="italic"
              fontWeight={500}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {"\u201C"}Per cent{"\u201D"} = {"\u201C"}per hundred.{"\u201D"} You already think in percents every day.
            </motion.text>
          )}
        </svg>

        {phase >= 7 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>

      {/* Screen reader description */}
      <div className="sr-only" aria-live="polite">
        Two phones shown side by side. Left phone says 45 percent. Right phone
        says 45 out of 100. Both have the same amount of battery charge. Per cent
        means per hundred.
      </div>
    </StageContent>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [shadedCells, setShadedCells] = useState<Set<number>>(
    () => new Set<number>(),
  );
  const [activeModel, setActiveModel] = useState<"grid" | "bar" | "circle">(
    "grid",
  );
  const [interactionCount, setInteractionCount] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const shadedCount = shadedCells.size;
  const percentValue = shadedCount;
  const fractionNum = shadedCount;
  const decimalValue = (shadedCount / 100).toFixed(2);

  const canContinue = interactionCount >= 10;

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
  }, []);

  const toggleColumn = useCallback((colIndex: number) => {
    setShadedCells((prev) => {
      const next = new Set(prev);
      const columnCells = Array.from(
        { length: 10 },
        (_, r) => r * 10 + colIndex,
      );
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
  }, []);

  const clearGrid = useCallback(() => {
    setShadedCells(new Set<number>());
  }, []);

  const setFromSlider = useCallback((pct: number) => {
    const target = Math.max(0, Math.min(100, Math.round(pct)));
    setShadedCells(() => {
      const next = new Set<number>();
      // Fill column-by-column, top-to-bottom within each column
      for (let i = 0; i < target; i++) {
        const col = Math.floor(i / 10);
        const row = i % 10;
        next.add(row * 10 + col);
      }
      return next;
    });
    setInteractionCount((c) => c + 1);
  }, []);

  const bindSliderDrag = useDrag(
    ({ xy: [x] }) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      setFromSlider(pct * 100);
    },
    { filterTaps: true, axis: "x" as const },
  );

  const handleSliderClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const pct = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      setFromSlider(pct * 100);
    },
    [setFromSlider],
  );

  // Circle chart SVG arc helper
  const circleArc = useMemo(() => {
    const cx = 120;
    const cy = 120;
    const r = 90;
    const innerR = 60;
    const angle = (percentValue / 100) * 360;
    const rad = ((angle - 90) * Math.PI) / 180;
    const startRad = (-90 * Math.PI) / 180;
    const largeArc = angle > 180 ? 1 : 0;
    if (percentValue === 0) return "";
    if (percentValue >= 100) {
      return [
        `M ${cx} ${cy - r}`,
        `A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`,
        `L ${cx - 0.01} ${cy - innerR}`,
        `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy - innerR}`,
        "Z",
      ].join(" ");
    }
    const outerEndX = cx + r * Math.cos(rad);
    const outerEndY = cy + r * Math.sin(rad);
    const innerEndX = cx + innerR * Math.cos(rad);
    const innerEndY = cy + innerR * Math.sin(rad);
    const outerStartX = cx + r * Math.cos(startRad);
    const outerStartY = cy + r * Math.sin(startRad);
    const innerStartX = cx + innerR * Math.cos(startRad);
    const innerStartY = cy + innerR * Math.sin(startRad);
    return [
      `M ${outerStartX} ${outerStartY}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
      `L ${innerEndX} ${innerEndY}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStartX} ${innerStartY}`,
      "Z",
    ].join(" ");
  }, [percentValue]);

  return (
    <StageContent>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        {/* Triple Readout Bar */}
        <motion.div
          key={percentValue}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-1 rounded-2xl px-6 py-4 sm:flex-row sm:gap-3"
          style={{ background: SURFACE }}
          aria-live="polite"
        >
          <span
            className="font-mono font-bold tabular-nums"
            style={{ color: EMERALD, fontSize: "clamp(28px, 7vw, 48px)" }}
          >
            {percentValue}%
          </span>
          <span className="text-lg font-bold" style={{ color: TEXT }}>
            =
          </span>
          <span
            className="font-mono font-bold tabular-nums"
            style={{ color: INDIGO, fontSize: "clamp(22px, 5vw, 36px)" }}
          >
            {fractionNum}/100
          </span>
          <span className="text-lg font-bold" style={{ color: TEXT }}>
            =
          </span>
          <span
            className="font-mono font-bold tabular-nums"
            style={{ color: THEME.amber, fontSize: "clamp(28px, 7vw, 48px)" }}
          >
            {decimalValue}
          </span>
        </motion.div>

        {/* Model Toggle */}
        <div
          className="flex rounded-xl border border-nm-bg-surface bg-nm-bg-primary p-1"
          role="tablist"
          aria-label="Spatial model selection"
        >
          {(["grid", "bar", "circle"] as const).map((model) => (
            <button
              key={model}
              role="tab"
              aria-selected={activeModel === model}
              onClick={() => setActiveModel(model)}
              className="rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
              style={{
                minWidth: 72,
                minHeight: 40,
                background: activeModel === model ? ELEVATED : "transparent",
                color: activeModel === model ? TEXT : MUTED,
              }}
            >
              {model === "grid" ? "Grid" : model === "bar" ? "Bar" : "Circle"}
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
                  style={{
                    width: "min(8vw, 36px)",
                    color: EMERALD,
                    minHeight: 20,
                  }}
                  aria-label={`Toggle column ${c + 1} (${(c + 1) * 10}%)`}
                >
                  {(c + 1) * 10}%
                </button>
              ))}
            </div>

            {/* 10x10 grid */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(10, min(8vw, 36px))",
                gap: 1,
                background: ELEVATED,
                borderRadius: 6,
                overflow: "hidden",
              }}
              role="grid"
              aria-label={`Percent grid: ${percentValue} percent shaded`}
            >
              {Array.from({ length: 100 }, (_, i) => {
                const row = Math.floor(i / 10);
                const col = i % 10;
                const isShaded = shadedCells.has(i);
                return (
                  <motion.button
                    key={i}
                    onClick={() => toggleCell(i)}
                    role="gridcell"
                    aria-checked={isShaded}
                    aria-label={`Cell row ${row + 1}, column ${col + 1}, ${isShaded ? "shaded" : "unshaded"}. 1 percent.`}
                    animate={
                      isShaded
                        ? { scale: 1, background: `${INDIGO}cc` }
                        : { scale: 1, background: SURFACE }
                    }
                    whileTap={{ scale: 0.9 }}
                    transition={reduced ? { duration: 0.1 } : SPRING_POP}
                    style={{
                      width: "min(8vw, 36px)",
                      height: "min(8vw, 36px)",
                      borderRadius: 2,
                      border: "none",
                      cursor: "pointer",
                      minWidth: 28,
                      minHeight: 28,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Bar Model */}
        {activeModel === "bar" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full flex-col items-center gap-2"
          >
            <div
              className="relative w-full overflow-hidden rounded-lg"
              style={{
                maxWidth: 400,
                height: 48,
                background: SURFACE,
                border: `1.5px solid ${BORDER}`,
              }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full rounded-lg"
                style={{ background: `${INDIGO}cc` }}
                animate={{ width: `${percentValue}%` }}
                transition={SPRING}
              />
              <span
                className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-xs"
                style={{ color: MUTED }}
              >
                0%
              </span>
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs"
                style={{ color: MUTED }}
              >
                100%
              </span>
            </div>
          </motion.div>
        )}

        {/* Circle Model */}
        {activeModel === "circle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <svg width={240} height={240} viewBox="0 0 240 240">
              {/* Background ring */}
              <circle
                cx={120}
                cy={120}
                r={90}
                fill="none"
                stroke={ELEVATED}
                strokeWidth={30}
              />
              {/* Filled arc */}
              {percentValue > 0 && <path d={circleArc} fill={`${INDIGO}cc`} />}
              {/* Center label */}
              <text
                x={120}
                y={128}
                textAnchor={"middle" as const}
                fill={TEXT}
                fontSize={36}
                fontWeight={700}
                fontFamily="monospace"
              >
                {percentValue}%
              </text>
            </svg>
          </motion.div>
        )}

        {/* Percent Slider */}
        <div className="w-full" style={{ maxWidth: 400 }}>
          <div
            ref={sliderRef}
            className="relative h-6 cursor-pointer"
            onClick={handleSliderClick}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentValue}
            aria-label="Percentage value"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight")
                setFromSlider(percentValue + (e.shiftKey ? 10 : 1));
              if (e.key === "ArrowLeft")
                setFromSlider(percentValue - (e.shiftKey ? 10 : 1));
              if (e.key === "Home") setFromSlider(0);
              if (e.key === "End") setFromSlider(100);
            }}
          >
            {/* Track */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full"
              style={{ height: 6, background: SURFACE }}
            />
            {/* Filled track */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
              style={{
                height: 6,
                width: `${percentValue}%`,
                background: `linear-gradient(90deg, ${INDIGO}, ${EMERALD})`,
              }}
            />
            {/* Thumb */}
            <motion.div
              {...(bindSliderDrag() as Record<string, unknown>)}
              className="absolute top-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 28,
                height: 28,
                background: INDIGO,
                border: `2px solid ${THEME.textSec}`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                left: `calc(${percentValue}% - 14px)`,
                touchAction: "none",
                cursor: "grab",
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 1.15 }}
            >
              {/* Extended touch area */}
              <div
                className="absolute -inset-2"
                style={{ minWidth: 44, minHeight: 44 }}
              />
            </motion.div>
          </div>
          {/* Tick labels */}
          <div className="mt-1 flex justify-between px-0.5">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
              <span
                key={v}
                className="font-mono text-[10px] tabular-nums"
                style={{
                  color: v === percentValue ? EMERALD : MUTED,
                  fontWeight: v === percentValue ? 600 : 400,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={clearGrid}
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors active:scale-[0.97]"
            style={{
              background: ELEVATED,
              color: MUTED,
              minHeight: 44,
              minWidth: 44,
            }}
          >
            Clear
          </button>

          {canContinue && <ContinueButton onClick={onContinue} delay={0.3} />}
        </div>

        {!canContinue && (
          <div className="flex flex-col items-center gap-1">
            <InteractionDots count={Math.min(interactionCount, 10)} total={10} activeColor={INDIGO} />
            <p className="text-xs" style={{ color: MUTED }}>
              Interact with the grid to continue
            </p>
          </div>
        )}
      </div>

      {/* Screen reader */}
      <div className="sr-only" aria-live="polite">
        {shadedCount} cells shaded. {percentValue} percent. {fractionNum} out of
        100. {decimalValue}.
      </div>
    </StageContent>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [prompt, setPrompt] = useState(1);
  const [p2CellCount, setP2CellCount] = useState(0);
  const [p2Done, setP2Done] = useState(false);
  const [p4Answer, setP4Answer] = useState<number | null>(null);
  const [p4Checked, setP4Checked] = useState(false);

  // Prompt 2: simple cell counter for 75% target
  const handleP2Cell = useCallback(() => {
    setP2CellCount((c) => {
      const next = c + 1;
      if (next >= 73 && next <= 77) {
        setP2Done(true);
      }
      return Math.min(next, 100);
    });
  }, []);

  return (
    <StageContent>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {/* -- Prompt 1: Triple Identity -- */}
          {prompt === 1 && (
            <motion.div
              key="p1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <MiniGrid shadedCount={45} size={180} />

              <div className="flex flex-col items-center gap-1">
                <motion.span
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-mono text-3xl font-bold"
                  style={{ color: EMERALD }}
                >
                  45%
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-2xl font-bold"
                  style={{ color: INDIGO }}
                >
                  = 45/100
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="font-mono text-2xl font-bold tabular-nums"
                  style={{ color: THEME.amber }}
                >
                  = 0.45
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="rounded-xl px-5 py-4"
                style={{ background: SURFACE }}
              >
                <p
                  className="text-center text-base leading-relaxed"
                  style={{ color: THEME.textSec }}
                >
                  45 cells out of 100 = 45 per hundred = 45%. The percent sign
                  (%) is just shorthand for{" "}
                  <strong
                    style={{
                      color: WARNING,
                      background: `${WARNING}20`,
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    out of 100
                  </strong>
                  .{" "}
                  <strong style={{ color: INDIGO }}>
                    Every percent IS a fraction
                  </strong>{" "}
                  with 100 on the bottom.
                </p>
              </motion.div>

              <ContinueButton
                onClick={() => setPrompt(2)}
                label="I see it!"
                color={EMERALD}
                delay={1.5}
              />
            </motion.div>
          )}

          {/* -- Prompt 2: Conversion Machine -- */}
          {prompt === 2 && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <p
                className="text-center text-base font-medium"
                style={{ color: TEXT }}
              >
                Set the grid to 75%. What fraction and decimal is that?
              </p>

              <MiniGrid shadedCount={p2Done ? 75 : p2CellCount} size={180} />

              {!p2Done && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleP2Cell}
                    className="rounded-xl px-6 py-3 text-base font-semibold text-white active:scale-[0.97]"
                    style={{
                      background: INDIGO,
                      minHeight: 48,
                      minWidth: 44,
                    }}
                  >
                    Shade cells ({p2CellCount}/75)
                  </button>
                  <button
                    onClick={() => {
                      setP2CellCount(75);
                      setP2Done(true);
                    }}
                    className="rounded-xl px-4 py-3 text-sm text-white active:scale-[0.97]"
                    style={{
                      background: ELEVATED,
                      minHeight: 48,
                      minWidth: 44,
                    }}
                  >
                    Set to 75%
                  </button>
                </div>
              )}

              {p2Done && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xl font-bold"
                      style={{ color: EMERALD }}
                    >
                      75%
                    </span>
                    <span style={{ color: TEXT }}>=</span>
                    <span
                      className="font-mono text-xl font-bold"
                      style={{ color: INDIGO }}
                    >
                      75/100
                    </span>
                    <span style={{ color: TEXT }}>=</span>
                    <span
                      className="font-mono text-xl font-bold tabular-nums"
                      style={{ color: THEME.amber }}
                    >
                      0.75
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={SPRING_POP}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="font-mono font-bold"
                      style={{ color: INDIGO }}
                    >
                      75/100
                    </span>
                    <span className="font-mono text-sm" style={{ color: THEME.amber }}>
                      {"\u00F7"}25 {"\u2192"}
                    </span>
                    <span
                      className="font-mono text-xl font-bold"
                      style={{ color: INDIGO }}
                    >
                      3/4
                    </span>
                  </motion.div>

                  <p
                    className="text-center text-sm leading-relaxed"
                    style={{ color: THEME.textSec }}
                  >
                    75% = 75/100 = 3/4 = 0.75. Every percent can simplify to a
                    simpler fraction too!
                  </p>

                  <ContinueButton
                    onClick={() => setPrompt(3)}
                    label="Got it!"
                    color={EMERALD}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* -- Prompt 3: Breaking 100% -- */}
          {prompt === 3 && (
            <motion.div
              key="p3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <p
                className="text-center text-base font-medium"
                style={{ color: TEXT }}
              >
                Can percent go above 100? Watch this.
              </p>

              {/* 100% grid + overflow row */}
              <div className="flex flex-col items-center gap-1">
                <MiniGrid
                  shadedCount={100}
                  size={180}
                  fillColor={`${INDIGO}cc`}
                  label="100%"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, ...SPRING }}
                  className="flex gap-[1px]"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={`overflow-${i}`}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 2,
                        background: i < 2 ? `${THEME.amber}cc` : "transparent",
                        border: `1px dashed ${INDIGO}60`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex items-center gap-2"
              >
                <span
                  className="font-mono text-2xl font-bold"
                  style={{ color: THEME.amber }}
                >
                  120%
                </span>
                <span style={{ color: TEXT }}>=</span>
                <span
                  className="font-mono text-xl font-bold"
                  style={{ color: INDIGO }}
                >
                  120/100
                </span>
                <span style={{ color: TEXT }}>=</span>
                <span
                  className="font-mono text-xl font-bold tabular-nums"
                  style={{ color: THEME.amber }}
                >
                  1.20
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="rounded-xl px-5 py-4"
                style={{ background: SURFACE }}
              >
                <p
                  className="text-center text-sm leading-relaxed"
                  style={{ color: THEME.textSec }}
                >
                  Percent CAN go above 100. 120% = 1.20 ={" "}
                  <strong style={{ color: THEME.amber }}>MORE</strong> than 1 whole.
                  200% would mean 2 wholes. There is no ceiling!
                </p>
              </motion.div>

              <ContinueButton
                onClick={() => setPrompt(4)}
                label="Mind blown!"
                color={THEME.amber}
                delay={3}
              />
            </motion.div>
          )}

          {/* -- Prompt 4: Percent-Of Trap -- */}
          {prompt === 4 && (
            <motion.div
              key="p4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <p
                className="text-center text-base font-medium"
                style={{ color: TEXT }}
              >
                Here is where it gets tricky. What is 50% of 80?
              </p>

              <p className="font-mono text-2xl font-bold" style={{ color: TEXT }}>
                50% of 80 ={" "}
                <span style={{ color: WARNING }}>?</span>
              </p>

              {!p4Checked && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setP4Answer(130);
                      setP4Checked(true);
                    }}
                    className="rounded-xl px-8 py-3 text-2xl font-bold transition-transform active:scale-[0.95]"
                    style={{
                      background: ELEVATED,
                      color: TEXT,
                      minWidth: 120,
                      minHeight: 56,
                      borderRadius: 12,
                    }}
                  >
                    130
                  </button>
                  <button
                    onClick={() => {
                      setP4Answer(40);
                      setP4Checked(true);
                    }}
                    className="rounded-xl px-8 py-3 text-2xl font-bold transition-transform active:scale-[0.95]"
                    style={{
                      background: ELEVATED,
                      color: TEXT,
                      minWidth: 120,
                      minHeight: 56,
                      borderRadius: 12,
                    }}
                  >
                    40
                  </button>
                </div>
              )}

              {p4Checked && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  {p4Answer === 40 && (
                    <p
                      className="text-center text-base font-semibold"
                      style={{ color: SUCCESS }}
                    >
                      {"Correct! \u2713"}
                    </p>
                  )}
                  {p4Answer === 130 && (
                    <p className="text-center text-sm" style={{ color: ROSE }}>
                      Careful! 50% of 80 does not mean 50 + 80. The word
                      {"\u00A0"}&quot;of&quot; in math means multiply.
                    </p>
                  )}

                  {/* Visual: 8x10 grid showing half of 80 */}
                  <MiniGrid
                    shadedCount={40}
                    size={160}
                    rows={8}
                    cols={10}
                    fillColor={`${INDIGO}cc`}
                    label="50% of 80 = 40"
                  />

                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: SURFACE }}
                  >
                    <p
                      className="text-center text-sm leading-relaxed"
                      style={{ color: THEME.textSec }}
                    >
                      50% of 80 means HALF of 80. Half of 80 is 40.{" "}
                      <strong
                        style={{
                          color: THEME.amber,
                          background: `${THEME.amber}20`,
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        Percent-of is multiplication
                      </strong>
                      : 50/100 {"\u00D7"} 80 = 40.
                    </p>
                  </div>

                  {p4Answer === 130 && (
                    <button
                      onClick={() => {
                        setP4Checked(false);
                        setP4Answer(null);
                      }}
                      className="text-sm underline"
                      style={{ color: MUTED, minHeight: 44 }}
                    >
                      Try again
                    </button>
                  )}

                  {p4Answer === 40 && (
                    <ContinueButton
                      onClick={() => setPrompt(5)}
                      label="I get it!"
                      color={EMERALD}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* -- Prompt 5: Building Mental Model -- */}
          {prompt === 5 && (
            <motion.div
              key="p5"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Card A */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: SURFACE }}
                aria-label="10 percent of 200 equals 20"
              >
                <MiniGrid shadedCount={10} size={60} />
                <p className="font-mono font-bold" style={{ color: EMERALD }}>
                  10% of 200 = 20
                </p>
              </motion.div>

              {/* Card B */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: SURFACE }}
                aria-label="25 percent of 60 equals 15"
              >
                <MiniGrid shadedCount={25} size={60} />
                <p className="font-mono font-bold" style={{ color: EMERALD }}>
                  25% of 60 = 15
                </p>
              </motion.div>

              {/* Card C */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: SURFACE }}
                aria-label="100 percent of 50 equals 50, the whole thing"
              >
                <MiniGrid shadedCount={100} size={60} />
                <p className="font-mono font-bold" style={{ color: EMERALD }}>
                  100% of 50 = 50 (the whole thing!)
                </p>
              </motion.div>

              {/* Key Insight */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5 }}
                className="rounded-xl px-4 py-4"
                style={{
                  background: `${PURPLE}10`,
                  borderLeft: `4px solid ${PURPLE}`,
                }}
              >
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: THEME.textSec }}
                >
                  <strong style={{ color: TEXT }}>Key Insight:</strong> To find
                  X% of a number, convert the percent to a decimal (divide by
                  100) and multiply.{" "}
                  <span className="font-mono font-bold" style={{ color: THEME.amber }}>
                    25% of 60 = 0.25 {"\u00D7"} 60 = 15
                  </span>
                </p>
              </motion.div>

              <ContinueButton onClick={onContinue} delay={5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StageContent>
  );
}

/* ================================================================== */
/*  STAGE 4: Symbol Bridge                                             */
/* ================================================================== */

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStep(5);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
      setTimeout(() => setStep(4), 8000),
      setTimeout(() => setStep(5), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <StageContent>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        {/* Reference grid */}
        <MiniGrid shadedCount={45} size={160} label="45% shaded" />

        {/* Notation steps */}
        <div className="flex flex-col items-center gap-4">
          {/* Step 1: percent = fraction */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: EMERALD }}
              >
                45%
              </span>
              <span className="text-xl" style={{ color: TEXT }}>
                =
              </span>
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: INDIGO }}
              >
                45/100
              </span>
            </motion.div>
          )}

          {/* Step 2: simplify fraction */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span
                className="font-mono text-xl font-bold"
                style={{ color: INDIGO }}
              >
                45/100
              </span>
              <span className="font-mono text-sm" style={{ color: THEME.amber }}>
                {"\u00F7"}5 {"\u2192"}
              </span>
              <span
                className="font-mono text-xl font-bold"
                style={{ color: INDIGO }}
              >
                9/20
              </span>
            </motion.div>
          )}

          {/* Step 3: decimal */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span
                className="font-mono text-xl font-bold"
                style={{ color: INDIGO }}
              >
                45/100
              </span>
              <span className="text-xl" style={{ color: TEXT }}>
                =
              </span>
              <span
                className="font-mono text-2xl font-bold tabular-nums"
                style={{ color: THEME.amber }}
              >
                0.45
              </span>
            </motion.div>
          )}

          {/* Step 4: general formula */}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-5 py-4"
              style={{ background: SURFACE }}
            >
              <p
                className="text-center font-mono text-xl font-bold"
                style={{ color: TEXT }}
              >
                <span style={{ color: THEME.amber }}>x</span>% ={" "}
                <span style={{ color: THEME.amber }}>x</span>/100 ={" "}
                <span style={{ color: THEME.amber }}>x</span> {"\u00F7"} 100
              </p>
            </motion.div>
          )}

          {/* Step 5: percent-of formula + summary */}
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="rounded-xl px-5 py-4"
                style={{ background: SURFACE }}
              >
                <p
                  className="text-center text-base leading-loose"
                  style={{ color: TEXT }}
                >
                  <span className="font-mono font-bold">50% of 80</span>
                  <br />
                  <span className="font-mono" style={{ color: INDIGO }}>
                    = 50/100 {"\u00D7"} 80
                  </span>
                  <br />
                  <span
                    className="font-mono tabular-nums"
                    style={{ color: THEME.amber }}
                  >
                    = 0.50 {"\u00D7"} 80
                  </span>
                  <br />
                  <span
                    className="font-mono text-xl font-bold"
                    style={{ color: EMERALD }}
                  >
                    = 40 {"\u2713"}
                  </span>
                </p>
              </div>

              {/* Summary card */}
              <div
                className="rounded-xl px-4 py-4"
                style={{
                  background: `${PURPLE}10`,
                  borderLeft: `4px solid ${PURPLE}`,
                }}
              >
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: THEME.textSec }}
                >
                  <strong style={{ color: TEXT }}>The Percent Triple:</strong>{" "}
                  <span className="font-mono" style={{ color: THEME.amber }}>
                    x% = x/100 = x {"\u00F7"} 100
                  </span>
                  <br />
                  <strong style={{ color: TEXT }}>Percent OF:</strong>{" "}
                  <span className="font-mono" style={{ color: THEME.amber }}>
                    x% of n = (x/100) {"\u00D7"} n
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {step >= 5 && <ContinueButton onClick={onContinue} delay={2} />}
      </div>
    </StageContent>
  );
}

/* ================================================================== */
/*  STAGE 5: Real-World Anchor                                         */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const cards = useMemo(
    () => [
      {
        icon: "\uD83D\uDED2",
        title: "SHOPPING",
        color: EMERALD,
        text: "Sneakers: $120, on sale for 25% off. You save $30, pay $90.",
        math: "25% of $120 = 0.25 \u00D7 120 = $30",
      },
      {
        icon: "\uD83C\uDFAE",
        title: "GAMING",
        color: INDIGO,
        text: "Game download: 73% complete. 73 out of every 100 chunks received.",
        math: "73/100 = 73%",
      },
      {
        icon: "\uD83C\uDFC0",
        title: "SPORTS",
        color: THEME.amber,
        text: "Free-throw shooting: 80%. Made 80 out of every 100 attempts.",
        math: "80% = 80/100 = 4/5",
      },
      {
        icon: "\u2B50",
        title: "GRADES",
        color: PURPLE,
        text: "Test score: 18 out of 20 = 90%. Converting to 'out of 100' lets you compare across different tests.",
        math: "18/20 = 90/100 = 90%",
      },
    ],
    [],
  );

  return (
    <StageContent>
      <div className="flex w-full max-w-xl flex-col items-center gap-3">
        {cards.map((card, i) => (
          <motion.section
            key={card.title}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3, duration: 0.4, ease: "easeOut" }}
            className="flex w-full gap-4 rounded-xl px-5 py-4"
            style={{ background: SURFACE }}
            aria-label={`Real-world example: ${card.title}`}
          >
            <span
              className="text-3xl"
              aria-hidden="true"
              style={{ lineHeight: 1.2 }}
            >
              {card.icon}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: card.color, letterSpacing: 1 }}
              >
                {card.title}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: THEME.textSec }}>
                {card.text}
              </p>
              <p
                className="font-mono text-sm font-bold"
                style={{ color: THEME.amber }}
              >
                {card.math}
              </p>
            </div>
          </motion.section>
        ))}

        <ContinueButton onClick={onContinue} delay={0} />
      </div>
    </StageContent>
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

/* ---- Problem 5: Interactive Grid Shading ---- */

function GridShadingProblem({
  targetCount,
  checked,
  onCheck,
  setAnswer,
}: PracticeProblemRenderProps & { targetCount: number }) {
  const [cells, setCells] = useState<Set<number>>(() => new Set<number>());
  const count = cells.size;

  const toggle = useCallback((i: number) => {
    if (checked) return;
    setCells((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, [checked]);

  const handleCheck = useCallback(() => {
    setAnswer(String(count));
    onCheck();
  }, [count, setAnswer, onCheck]);

  useEffect(() => {
    setAnswer(String(count));
  }, [count, setAnswer]);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-2xl font-bold" style={{ color: EMERALD }}>
        Target: {targetCount}%
      </p>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(10, 20px)",
          gap: 1,
          background: ELEVATED,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            disabled={checked}
            style={{
              width: 20,
              height: 20,
              background: cells.has(i) ? `${INDIGO}cc` : SURFACE,
              border: "none",
              borderRadius: 1,
              cursor: checked ? "default" : "pointer",
              minWidth: 20,
              minHeight: 20,
            }}
            aria-label={`Cell ${i + 1}`}
          />
        ))}
      </div>

      <span className="font-mono text-sm tabular-nums" style={{ color: MUTED }}>
        {count}% shaded
      </span>

      {!checked && (
        <button
          onClick={handleCheck}
          className="rounded-xl px-6 py-3 text-base font-semibold text-white active:scale-[0.97]"
          style={{ background: THEME.primary, minHeight: 48 }}
        >
          Check
        </button>
      )}
    </div>
  );
}

/* ---- Problem 6: Ordering ---- */

function OrderingProblem({
  checked,
  setAnswer,
  onCheck,
}: PracticeProblemRenderProps) {
  const items = useMemo(() => ["0.3", "1/2", "45%", "0.09"], []);
  const correctOrder = useMemo(() => ["0.09", "0.3", "45%", "1/2"], []);
  const [order, setOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback(
    (item: string) => {
      if (checked) return;
      if (selected === item) {
        setSelected(null);
        return;
      }
      if (order.includes(item)) return;
      setOrder((prev) => [...prev, item]);
      setSelected(null);
    },
    [checked, selected, order],
  );

  const reset = useCallback(() => {
    setOrder([]);
    setSelected(null);
  }, []);

  const handleCheck = useCallback(() => {
    setAnswer(order.join(","));
    onCheck();
  }, [order, setAnswer, onCheck]);

  useEffect(() => {
    if (order.length === 4) {
      setAnswer(order.join(","));
    }
  }, [order, setAnswer]);

  const isOrderCorrect = order.join(",") === correctOrder.join(",");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Available items */}
      <div className="flex flex-wrap justify-center gap-2">
        {items
          .filter((it) => !order.includes(it))
          .map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className="rounded-xl px-4 py-2 font-mono text-base font-semibold active:scale-[0.95]"
              style={{
                background: ELEVATED,
                color: TEXT,
                minWidth: 80,
                minHeight: 52,
                border:
                  selected === item
                    ? `2px solid ${INDIGO}`
                    : "2px solid transparent",
              }}
            >
              {item}
            </button>
          ))}
      </div>

      {/* Slots */}
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((slot) => {
          const item = order[slot];
          return (
            <div key={slot} className="flex flex-col items-center gap-1">
              <div
                className="flex items-center justify-center rounded-xl font-mono text-sm font-semibold"
                style={{
                  minWidth: 80,
                  minHeight: 52,
                  border: item
                    ? checked
                      ? isOrderCorrect
                        ? `2px solid ${SUCCESS}`
                        : `2px solid ${ERROR}`
                      : `2px solid ${INDIGO}`
                    : `2px dashed ${BORDER}`,
                  borderRadius: 12,
                  background: item ? ELEVATED : "transparent",
                  color: item ? TEXT : MUTED,
                }}
              >
                {item || String(slot + 1)}
              </div>
              {slot === 0 && (
                <span className="text-[10px]" style={{ color: MUTED }}>
                  Least
                </span>
              )}
              {slot === 3 && (
                <span className="text-[10px]" style={{ color: MUTED }}>
                  Greatest
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Percent equivalents shown after correct check */}
      {checked && isOrderCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2"
        >
          {correctOrder.map((item) => {
            const pctMap: Record<string, string> = {
              "0.09": "= 9%",
              "0.3": "= 30%",
              "45%": "= 45%",
              "1/2": "= 50%",
            };
            return (
              <span
                key={item}
                className="font-mono text-xs"
                style={{ color: MUTED, minWidth: 80, textAlign: "center" }}
              >
                {pctMap[item]}
              </span>
            );
          })}
        </motion.div>
      )}

      <div className="flex items-center gap-2">
        {!checked && order.length > 0 && (
          <button
            onClick={reset}
            className="rounded-lg px-3 py-2 text-sm"
            style={{ color: MUTED, minHeight: 44, minWidth: 44 }}
          >
            Reset
          </button>
        )}
        {!checked && order.length === 4 && (
          <button
            onClick={handleCheck}
            className="rounded-xl px-6 py-3 text-base font-semibold text-white active:scale-[0.97]"
            style={{ background: THEME.primary, minHeight: 48 }}
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
}

/* ---- Problem 9: Triple Matching ---- */

function TripleMatchingProblem({
  checked,
  setAnswer,
  onCheck,
}: PracticeProblemRenderProps) {
  const percents = useMemo(() => ["20%", "75%", "5%"], []);
  const fractions = useMemo(() => ["3/4", "1/5", "1/20"], []);
  const decimals = useMemo(() => ["0.05", "0.75", "0.2"], []);

  const correctMap: Record<string, { frac: string; dec: string }> = useMemo(
    () => ({
      "20%": { frac: "1/5", dec: "0.2" },
      "75%": { frac: "3/4", dec: "0.75" },
      "5%": { frac: "1/20", dec: "0.05" },
    }),
    [],
  );

  const [selectedPct, setSelectedPct] = useState<string | null>(null);
  const [matches, setMatches] = useState<
    Record<string, { frac?: string; dec?: string }>
  >({});

  const handleFracClick = useCallback(
    (frac: string) => {
      if (checked || !selectedPct) return;
      setMatches((prev) => ({
        ...prev,
        [selectedPct]: { ...prev[selectedPct], frac },
      }));
    },
    [checked, selectedPct],
  );

  const handleDecClick = useCallback(
    (dec: string) => {
      if (checked || !selectedPct) return;
      setMatches((prev) => ({
        ...prev,
        [selectedPct]: { ...prev[selectedPct], dec },
      }));
    },
    [checked, selectedPct],
  );

  const allMatched = percents.every(
    (p) => matches[p]?.frac && matches[p]?.dec,
  );

  const allCorrect = percents.every((p) => {
    const m = matches[p];
    const c = correctMap[p]!;
    return m?.frac === c.frac && m?.dec === c.dec;
  });

  const handleCheck = useCallback(() => {
    const serialized = percents
      .map((p) => `${p}:${matches[p]?.frac ?? ""}:${matches[p]?.dec ?? ""}`)
      .join("|");
    setAnswer(serialized);
    onCheck();
  }, [percents, matches, setAnswer, onCheck]);

  useEffect(() => {
    if (allMatched) {
      const serialized = percents
        .map((p) => `${p}:${matches[p]?.frac ?? ""}:${matches[p]?.dec ?? ""}`)
        .join("|");
      setAnswer(serialized);
    }
  }, [allMatched, percents, matches, setAnswer]);

  const usedFracs = new Set(
    Object.values(matches)
      .map((m) => m.frac)
      .filter(Boolean),
  );
  const usedDecs = new Set(
    Object.values(matches)
      .map((m) => m.dec)
      .filter(Boolean),
  );

  return (
    <div className="flex flex-col items-center gap-4">
      {selectedPct && (
        <p className="text-sm" style={{ color: MUTED }}>
          Now tap the matching fraction and decimal for{" "}
          <strong style={{ color: EMERALD }}>{selectedPct}</strong>
        </p>
      )}
      {!selectedPct && !checked && (
        <p className="text-sm" style={{ color: MUTED }}>
          Tap a percent, then tap its matching fraction and decimal
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {/* Percents column */}
        <div className="flex flex-col gap-2">
          <span
            className="text-center text-xs font-semibold uppercase"
            style={{ color: EMERALD }}
          >
            Percent
          </span>
          {percents.map((p) => {
            const m = matches[p];
            const isComplete = m?.frac && m?.dec;
            const isCorrectMatch =
              checked &&
              m?.frac === correctMap[p]!.frac &&
              m?.dec === correctMap[p]!.dec;
            const isWrongMatch = checked && !isCorrectMatch && isComplete;
            return (
              <button
                key={p}
                onClick={() => !checked && setSelectedPct(p)}
                className="rounded-lg px-4 py-2 text-center font-mono font-semibold active:scale-[0.95]"
                style={{
                  minWidth: 80,
                  minHeight: 44,
                  background: ELEVATED,
                  color: EMERALD,
                  border:
                    selectedPct === p
                      ? `2px solid ${EMERALD}`
                      : isCorrectMatch
                        ? `2px solid ${SUCCESS}`
                        : isWrongMatch
                          ? `2px solid ${ERROR}`
                          : "2px solid transparent",
                }}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Fractions column */}
        <div className="flex flex-col gap-2">
          <span
            className="text-center text-xs font-semibold uppercase"
            style={{ color: INDIGO }}
          >
            Fraction
          </span>
          {fractions.map((f) => {
            const isUsed = usedFracs.has(f);
            return (
              <button
                key={f}
                onClick={() => handleFracClick(f)}
                disabled={checked || !selectedPct || isUsed}
                className="rounded-lg px-4 py-2 text-center font-mono font-semibold active:scale-[0.95]"
                style={{
                  minWidth: 80,
                  minHeight: 44,
                  background: ELEVATED,
                  color: isUsed ? MUTED : INDIGO,
                  opacity: isUsed ? 0.5 : 1,
                  border: "2px solid transparent",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Decimals column */}
        <div className="flex flex-col gap-2">
          <span
            className="text-center text-xs font-semibold uppercase"
            style={{ color: THEME.amber }}
          >
            Decimal
          </span>
          {decimals.map((d) => {
            const isUsed = usedDecs.has(d);
            return (
              <button
                key={d}
                onClick={() => handleDecClick(d)}
                disabled={checked || !selectedPct || isUsed}
                className="rounded-lg px-4 py-2 text-center font-mono font-semibold tabular-nums active:scale-[0.95]"
                style={{
                  minWidth: 80,
                  minHeight: 44,
                  background: ELEVATED,
                  color: isUsed ? MUTED : THEME.amber,
                  opacity: isUsed ? 0.5 : 1,
                  border: "2px solid transparent",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current matches display */}
      {Object.keys(matches).length > 0 && !checked && (
        <div className="flex flex-col items-center gap-1">
          {Object.entries(matches).map(([pct, m]) => (
            <span
              key={pct}
              className="font-mono text-xs"
              style={{ color: MUTED }}
            >
              {pct} {"\u2194"} {m.frac ?? "?"} {"\u2194"} {m.dec ?? "?"}
            </span>
          ))}
        </div>
      )}

      {!checked && allMatched && (
        <button
          onClick={handleCheck}
          className="rounded-xl px-6 py-3 text-base font-semibold text-white active:scale-[0.97]"
          style={{ background: THEME.primary, minHeight: 48 }}
        >
          Check
        </button>
      )}

      {!checked && Object.keys(matches).length > 0 && (
        <button
          onClick={() => {
            setMatches({});
            setSelectedPct(null);
          }}
          className="text-sm underline"
          style={{ color: MUTED, minHeight: 44 }}
        >
          Reset matches
        </button>
      )}
    </div>
  );
}

/* ---- Main Practice Stage ---- */

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [answer, setAnswer] = useState<PracticeAnswer>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const problems: PracticeProblem[] = useMemo(
    () => [
      /* -- P1: Percent Meaning Identification -- */
      {
        id: 1,
        layer: "Recall" as const,
        prompt: "What does 60% mean?",
        correctAnswer: "60 out of 100",
        correctFeedback:
          "Correct! 60% means 60 out of 100. The word \u2018percent\u2019 comes from Latin \u2018per centum\u2019 \u2014 per hundred.",
        incorrectFeedback:
          "Not quite. Percent means \u2018out of 100.\u2019 Look at the grid: 60 out of 100 cells are shaded \u2014 that is 60%.",
        render: ({
          answer: ans,
          setAnswer: setA,
          checked: chk,
          correct: cor,
        }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <span
              className="font-mono text-5xl font-bold"
              style={{ color: EMERALD }}
            >
              60%
            </span>
            <MiniGrid shadedCount={60} size={160} />
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label="What does 60 percent mean"
            >
              {[
                "60 more than 100",
                "60 out of 100",
                "60 times 100",
                "100 out of 60",
              ].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "60 out of 100"}
                  wrong={chk && ans === opt && opt !== "60 out of 100"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                  wide
                />
              ))}
            </div>
          </div>
        ),
      },

      /* -- P2: Percent-to-Fraction -- */
      {
        id: 2,
        layer: "Recall" as const,
        prompt: "Write 35% as a fraction.",
        correctAnswer: "35/100",
        correctFeedback:
          "35% = 35/100. You can simplify: 35/100 = 7/20 (divide both by 5). But 35/100 is always correct \u2014 percent IS \u2018out of 100.\u2019",
        incorrectFeedback:
          "Remember: percent means \u2018per hundred,\u2019 so the denominator is always 100. 35% = 35/100.",
        render: ({
          answer: ans,
          setAnswer: setA,
          checked: chk,
          correct: cor,
        }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <span
              className="font-mono text-4xl font-bold"
              style={{ color: EMERALD }}
            >
              35%
            </span>
            <MiniGrid shadedCount={35} size={140} />
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label="Write 35 percent as a fraction"
            >
              {["35/10", "35/1000", "35/100", "7/10"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "35/100"}
                  wrong={chk && ans === opt && opt !== "35/100"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                  wide
                  mono
                />
              ))}
            </div>
          </div>
        ),
      },

      /* -- P3: Percent-to-Decimal -- */
      {
        id: 3,
        layer: "Recall" as const,
        prompt: "Convert 8% to a decimal.",
        correctAnswer: "0.08",
        correctFeedback:
          "8% = 8/100 = 0.08. To convert percent to decimal, divide by 100 (move the decimal point 2 places left). Be careful: 0.8 would be 80%, not 8%!",
        incorrectFeedback:
          "To go from percent to decimal, divide by 100 (move the decimal 2 places left): 8% = 8 \u00F7 100 = 0.08.",
        render: ({
          answer: ans,
          setAnswer: setA,
          checked: chk,
          correct: cor,
        }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <span
              className="font-mono text-4xl font-bold"
              style={{ color: EMERALD }}
            >
              8%
            </span>
            <MiniGrid shadedCount={8} size={140} />
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label="Convert 8 percent to a decimal"
            >
              {["0.8", "8.0", "0.08", "0.008"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "0.08"}
                  wrong={chk && ans === opt && opt !== "0.08"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                  wide
                  mono
                />
              ))}
            </div>
          </div>
        ),
      },

      /* -- P4: Finding Percent of a Number -- */
      {
        id: 4,
        layer: "Procedure" as const,
        prompt: "What is 25% of 200?",
        correctAnswer: "50",
        correctFeedback:
          "25% = 1/4. One quarter of 200 = 50. You can also think: 25/100 \u00D7 200 = 0.25 \u00D7 200 = 50.",
        incorrectFeedback:
          "\u201825% of 200\u2019 means multiply, not add. 25% = 25/100 = 0.25. So 0.25 \u00D7 200 = 50. Think of it as one quarter of 200.",
        render: ({
          answer: ans,
          setAnswer: setA,
          checked: chk,
          correct: cor,
          onCheck,
        }: PracticeProblemRenderProps) => (
          <NumericInputProblem
            expression="25% of 200 = ?"
            answer={ans}
            setAnswer={setA}
            checked={chk}
            correct={cor}
            onCheck={onCheck}
          />
        ),
      },

      /* -- P5: Grid Shading -- */
      {
        id: 5,
        layer: "Procedure" as const,
        prompt: "Shade the grid to show 70%.",
        correctAnswer: "70",
        correctFeedback:
          "70% = 70 out of 100. That is 7 full columns = 7/10 = 0.70. Percent, fraction, and decimal are just three ways to say the same thing.",
        incorrectFeedback:
          "Each cell is 1%, so shade exactly 70 cells. Try using column headers \u2014 each column is 10%!",
        render: (props: PracticeProblemRenderProps) => (
          <GridShadingProblem targetCount={70} {...props} />
        ),
      },

      /* -- P6: Ordering -- */
      {
        id: 6,
        layer: "Procedure" as const,
        prompt: "Order from least to greatest: 0.3, 1/2, 45%, 0.09",
        correctAnswer: "0.09,0.3,45%,1/2",
        correctFeedback:
          "Converting everything to percent makes ordering easy! 9% < 30% < 45% < 50%. This is WHY percent exists \u2014 it gives a common language for comparison.",
        incorrectFeedback:
          "Try converting each value to a percent first. 0.3 = 30%, 1/2 = 50%, 45% = 45%, 0.09 = 9%.",
        render: (props: PracticeProblemRenderProps) => (
          <OrderingProblem {...props} />
        ),
      },

      /* -- P7: Misconception Buster -- */
      {
        id: 7,
        layer: "Understanding" as const,
        prompt:
          "Marcus says 50% of 80 = 130. He added 50 + 80. Why is Marcus wrong?",
        correctAnswer: "B",
        correctFeedback:
          "The word \u2018of\u2019 in math means multiply. 50% is 0.5, and 0.5 \u00D7 80 = 40. Marcus treated percent as a number to add, but percent is a RATIO \u2014 it tells you what FRACTION of the amount to take.",
        incorrectFeedback:
          "The problem is that Marcus ADDED instead of MULTIPLYING. \u2018Of\u2019 means multiply. 50% of 80 = 0.5 \u00D7 80 = 40.",
        render: ({
          answer: ans,
          setAnswer: setA,
          checked: chk,
          correct: cor,
        }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            <div
              className="rounded-xl px-4 py-3"
              style={{ background: `${ERROR}10` }}
            >
              <p
                className="text-center font-mono text-base line-through"
                style={{ color: ERROR }}
              >
                50% of 80 = 50 + 80 = 130 {"\u2717"}
              </p>
            </div>
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label="Why is Marcus wrong"
            >
              {[
                { key: "A", text: "Because 50 + 80 = 120, not 130" },
                {
                  key: "B",
                  text: "Because \u2018of\u2019 means multiply, not add. 50% of 80 = 50/100 \u00D7 80 = 40",
                },
                {
                  key: "C",
                  text: "Because percent can never be used with other numbers",
                },
                {
                  key: "D",
                  text: "Because you need to subtract instead: 80 \u2212 50 = 30",
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
          </div>
        ),
      },

      /* -- P8: Greater Than 100% -- */
      {
        id: 8,
        layer: "Understanding" as const,
        prompt:
          "A store had 200 customers last month and 300 this month. This month\u2019s customers as a percent of last month\u2019s is...",
        correctAnswer: "150%",
        correctFeedback:
          "300 is 150% of 200. That is 100% (the original 200) plus 50% more (another 100). Percent CAN exceed 100%.",
        incorrectFeedback:
          "Think of it as: 300/200 = 1.5, and 1.5 as a percent = 150%. The increase is 50%, but the total is 150%.",
        render: ({
          answer: ans,
          setAnswer: setA,
          checked: chk,
          correct: cor,
        }: PracticeProblemRenderProps) => (
          <div className="flex flex-col items-center gap-4">
            {/* Bar chart */}
            <svg
              viewBox="0 0 300 200"
              className="w-full max-w-xs"
              role="img"
              aria-label="Bar chart: last month 200 customers, this month 300 customers"
            >
              <rect width="300" height="200" fill="transparent" />
              <rect
                x={50}
                y={60}
                width={80}
                height={120}
                fill={BORDER}
                rx={4}
              />
              <text
                x={90}
                y={55}
                textAnchor={"middle" as const}
                fill={MUTED}
                fontSize={11}
              >
                Last: 200
              </text>
              <rect
                x={170}
                y={20}
                width={80}
                height={160}
                fill={INDIGO}
                rx={4}
              />
              <rect
                x={170}
                y={20}
                width={80}
                height={40}
                fill={THEME.amber}
                rx={4}
                opacity={0.6}
              />
              <text
                x={210}
                y={15}
                textAnchor={"middle" as const}
                fill={MUTED}
                fontSize={11}
              >
                This: 300
              </text>
              <line
                x1={40}
                y1={60}
                x2={260}
                y2={60}
                stroke={THEME.textSec}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <text x={270} y={64} fill={THEME.textSec} fontSize={10}>
                100%
              </text>
            </svg>

            <div
              className="flex flex-wrap justify-center gap-2"
              role="radiogroup"
              aria-label="Percent of last month's customers"
            >
              {["50%", "100%", "150%", "300%"].map((opt) => (
                <McButton
                  key={opt}
                  label={opt}
                  selected={ans === opt}
                  correct={chk && opt === "150%"}
                  wrong={chk && ans === opt && opt !== "150%"}
                  onClick={() => !chk && setA(opt)}
                  disabled={chk && cor}
                  mono
                />
              ))}
            </div>
          </div>
        ),
      },

      /* -- P9: Triple Matching -- */
      {
        id: 9,
        layer: "Understanding" as const,
        prompt: "Match each percent to its fraction AND decimal equivalent.",
        correctAnswer: "20%:1/5:0.2|75%:3/4:0.75|5%:1/20:0.05",
        correctFeedback:
          "Every percent has a fraction and decimal twin. Converting between them is the key skill \u2014 you divide by 100 to go from percent to decimal, and simplify the fraction by finding the GCF.",
        incorrectFeedback:
          "Convert each percent to hundredths first: 20% = 20/100, 75% = 75/100, 5% = 5/100. Then simplify and convert to decimals.",
        render: (props: PracticeProblemRenderProps) => (
          <TripleMatchingProblem {...props} />
        ),
      },
    ],
    [],
  );

  const problem = problems[currentProblem]!;
  const isCustomCheck = [4, 5, 6, 9].includes(problem.id);
  const isLastProblem = currentProblem === problems.length - 1;

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

  return (
    <StageContent>
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
                      ? THEME.primary
                      : ELEVATED,
                border:
                  i === currentProblem ? `2px solid ${THEME.primary}` : "none",
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
                style={{ background: `${THEME.primary}20`, color: PURPLE }}
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
                style={{ background: THEME.primary, minHeight: 48 }}
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
                    style={{ background: THEME.primary, minHeight: 48 }}
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
    </StageContent>
  );
}

/* ---- Numeric Input Sub-component ---- */

function NumericInputProblem({
  expression,
  answer,
  setAnswer,
  checked,
  correct,
  onCheck,
}: {
  expression: string;
  answer: PracticeAnswer;
  setAnswer: (a: string) => void;
  checked: boolean;
  correct: boolean;
  onCheck: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-2xl font-bold" style={{ color: TEXT }}>
        {expression}
      </p>
      <MiniGrid shadedCount={25} size={120} />
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          placeholder="?"
          value={answer ?? ""}
          onChange={(e) => !checked && setAnswer(e.target.value)}
          disabled={checked}
          className="rounded-xl bg-nm-bg-primary text-center font-mono text-2xl font-bold tabular-nums"
          style={{
            width: 120,
            height: 56,
            color: TEXT,
            border: `2px solid ${checked ? (correct ? SUCCESS : ERROR) : BORDER}`,
            borderRadius: 12,
          }}
          aria-label={`Enter the value of ${expression}`}
        />
        {!checked && answer && (
          <button
            onClick={onCheck}
            className="rounded-xl px-6 py-3 text-base font-semibold text-white active:scale-[0.97]"
            style={{ background: THEME.primary, minHeight: 48 }}
          >
            Check
          </button>
        )}
      </div>
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
    <StageContent>
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
                background: `${THEME.primary}15`,
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
              Your friend thinks &quot;50% of 80&quot; means you add 50 + 80 to
              get 130. How would you explain why the answer is actually 40?
            </label>

            {/* Visual hint */}
            <div className="flex justify-center">
              <MiniGrid
                shadedCount={40}
                size={100}
                rows={8}
                cols={10}
                fillColor={`${INDIGO}cc`}
                label="50% of 80 = 40"
              />
            </div>

            <div className="relative">
              <textarea
                id="reflection-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="I would explain that..."
                className="w-full resize-none rounded-xl border border-nm-bg-elevated bg-nm-bg-primary p-4 text-base leading-relaxed"
                style={{
                  color: THEME.textSec,
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
                background: THEME.primary,
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

                <div className="flex flex-col items-center gap-2">
                  <MiniGrid
                    shadedCount={40}
                    size={100}
                    rows={8}
                    cols={10}
                    fillColor={`${INDIGO}cc`}
                  />
                  <p
                    className="text-center font-mono text-sm font-bold"
                    style={{ color: EMERALD }}
                  >
                    50% of 80 = 0.5 {"\u00D7"} 80 = 40
                  </p>
                  <p
                    className="text-center text-sm italic"
                    style={{ color: THEME.textSec }}
                  >
                    Percent means per hundred. &quot;Of&quot; means multiply.
                  </p>
                </div>
              </div>
            )}

            {skipped && (
              <p className="text-center text-base" style={{ color: MUTED }}>
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
    </StageContent>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

export function PercentsLesson({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  return (
    <LessonShell title="NO-2.3 Percents" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onContinue={advance} />;
          case "spatial": return <SpatialStage onContinue={advance} />;
          case "discovery": return <DiscoveryStage onContinue={advance} />;
          case "symbol": return <SymbolBridgeStage onContinue={advance} />;
          case "realWorld": return <RealWorldStage onContinue={advance} />;
          case "practice": return <PracticeStage onContinue={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
