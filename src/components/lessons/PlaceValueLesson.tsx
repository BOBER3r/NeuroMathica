"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* ── Lesson-specific semantic colors ── */
const COLORS = {
  thousands: colors.accent.violet,
  hundreds: colors.functional.info,
  tens: colors.accent.cyan,
  ones: colors.accent.emerald,
} as const;

const COLOR_LIST = [COLORS.thousands, COLORS.hundreds, COLORS.tens, COLORS.ones] as const;
const PLACE_NAMES = ["Thousands", "Hundreds", "Tens", "Ones"] as const;
const PLACE_VALUES = [1000, 100, 10, 1] as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.elevated;
const ELEVATED = colors.bg.surface;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;
const SPRING_BOUNCY = springs.bouncy;
const SPRING_POP = springs.pop;

interface PlaceValueLessonProps {
  onComplete?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

/* ContinueButton is now imported from @/components/lessons/ui/ContinueButton */

function ColoredDigit({
  digit,
  placeIndex,
  size = "lg",
  dimmed = false,
}: {
  digit: string | number;
  placeIndex: number;
  size?: "sm" | "md" | "lg";
  dimmed?: boolean;
}) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  return (
    <span
      className={`font-mono font-bold tabular-nums ${sizes[size]}`}
      style={{
        color: COLOR_LIST[placeIndex]!,
        opacity: dimmed ? 0.35 : 1,
      }}
    >
      {digit}
    </span>
  );
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
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

/* ================================================================== */
/*  STAGE 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  // Manim video hook
  return <VideoHook src="/videos/PlaceValueHook.webm" onComplete={onContinue} />;

  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPhase(5);
      return;
    }
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => setPhase(5), 5400),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const digits = [
    { d: "3", value: "3,000", color: COLORS.thousands },
    { d: "4", value: "400", color: COLORS.hundreds },
    { d: "5", value: "50", color: COLORS.tens },
    { d: "6", value: "6", color: COLORS.ones },
  ];

  return (
    <StageWrapper>
      <div
        className="relative flex w-full max-w-2xl flex-col items-center justify-center"
        style={{ minHeight: "70vh" }}
        aria-live="polite"
      >
        {/* Phase 0: Number fades in */}
        {phase < 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: phase >= 1 ? (phase >= 2 ? 0 : 1) : 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-mono text-[clamp(48px,10vw,96px)] font-bold tabular-nums"
            style={{ color: TEXT }}
          >
            <span>3</span>
            <motion.span
              animate={{ opacity: phase >= 1 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              ,
            </motion.span>
            <span>456</span>
          </motion.div>
        )}

        {/* Phase 2+: Columns slide up */}
        {phase >= 2 && (
          <div className="flex w-full justify-center gap-4 sm:gap-6 md:gap-8">
            {digits.map((d, i) => (
              <motion.div
                key={i}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
                }
                className="flex flex-col items-center"
                style={{ width: "clamp(60px,15vw,120px)" }}
              >
                {/* Column label */}
                <span
                  className="mb-2 text-[clamp(10px,2.5vw,14px)] font-semibold uppercase tracking-wide"
                  style={{ color: d.color }}
                >
                  {PLACE_NAMES[i]!}
                </span>

                {/* Column background */}
                <div
                  className="flex flex-col items-center justify-center rounded-t-xl"
                  style={{
                    background: `${d.color}20`,
                    width: "100%",
                    height: "clamp(180px,40vh,300px)",
                    paddingTop: 32,
                  }}
                >
                  {/* Digit flies in */}
                  {phase >= 3 && (
                    <motion.span
                      initial={reduced ? {} : { opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={
                        reduced
                          ? { duration: 0.3 }
                          : { delay: i * 0.2, ...SPRING }
                      }
                      className="font-mono text-[clamp(36px,8vw,72px)] font-bold tabular-nums"
                      style={{ color: d.color }}
                    >
                      {d.d}
                    </motion.span>
                  )}

                  {/* Value appears below */}
                  {phase >= 4 && (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.4, duration: 0.3, ease: "easeOut" }}
                      className="mt-2 font-mono text-[clamp(16px,4vw,28px)] font-bold"
                      style={{
                        color: d.color,
                        textShadow: `0 0 12px ${d.color}40`,
                      }}
                    >
                      {d.value}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Phase 5: Reassembly equation */}
        {phase >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <div
              className="h-[2px] w-full max-w-lg"
              style={{ background: BORDER }}
            />
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-[clamp(14px,3vw,22px)] font-bold"
              style={{ color: TEXT }}
            >
              <span style={{ color: COLORS.thousands }}>3,000</span>
              {" + "}
              <span style={{ color: COLORS.hundreds }}>400</span>
              {" + "}
              <span style={{ color: COLORS.tens }}>50</span>
              {" + "}
              <span style={{ color: COLORS.ones }}>6</span>
              {" = "}
              <span className="brightness-125">3,456</span>
            </motion.p>
            <ContinueButton onClick={onContinue} delay={0.5} />
          </motion.div>
        )}
      </div>

      {/* Accessibility announcement */}
      <div className="sr-only" aria-live="polite">
        Three thousand four hundred fifty-six. Each digit has a different value
        based on its position. 3 is worth 3,000. 4 is worth 400. 5 is worth 50.
        6 is worth 6.
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial Experience — Base-10 Blocks                       */
/* ================================================================== */

interface BlockState {
  thousands: number;
  hundreds: number;
  tens: number;
  ones: number;
}

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [blocks, setBlocks] = useState<BlockState>({
    thousands: 0,
    hundreds: 0,
    tens: 0,
    ones: 0,
  });
  const [interactions, setInteractions] = useState(0);
  const [usedTypes, setUsedTypes] = useState<Set<string>>(new Set());
  const [isRegrouping, setIsRegrouping] = useState(false);
  const [regroupMsg, setRegroupMsg] = useState<string | null>(null);

  const total = useMemo(
    () =>
      blocks.thousands * 1000 +
      blocks.hundreds * 100 +
      blocks.tens * 10 +
      blocks.ones,
    [blocks],
  );

  const keys: (keyof BlockState)[] = ["thousands", "hundreds", "tens", "ones"];

  const canContinue =
    interactions >= 8 && usedTypes.size >= 4;

  const handleAdd = useCallback(
    (key: keyof BlockState) => {
      if (isRegrouping) return;
      setInteractions((c) => c + 1);
      setUsedTypes((s) => new Set(s).add(key));

      setBlocks((prev) => {
        const next = { ...prev, [key]: prev[key] + 1 };
        // Regrouping check
        if (next[key] >= 10) {
          const upper =
            key === "ones"
              ? "tens"
              : key === "tens"
                ? "hundreds"
                : key === "hundreds"
                  ? "thousands"
                  : null;
          if (upper && next[upper as keyof BlockState] < 9) {
            setIsRegrouping(true);
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            const upperLabel =
              upper.charAt(0).toUpperCase() + upper.slice(1);
            setRegroupMsg(`10 ${label} = 1 ${upperLabel}!`);
            setTimeout(() => {
              setBlocks((p) => ({
                ...p,
                [key]: p[key] - 10,
                [upper]: p[upper as keyof BlockState] + 1,
              }));
              setUsedTypes((s) => new Set(s).add(upper));
              setTimeout(() => {
                setIsRegrouping(false);
                setRegroupMsg(null);
              }, 600);
            }, 1200);
          }
        }
        return next;
      });
    },
    [isRegrouping],
  );

  const handleRemove = useCallback(
    (key: keyof BlockState) => {
      if (isRegrouping || blocks[key] <= 0) return;
      setInteractions((c) => c + 1);
      setBlocks((prev) => ({ ...prev, [key]: prev[key] - 1 }));
    },
    [isRegrouping, blocks],
  );

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg mx-auto flex-col items-center gap-5 px-4">
        {/* Number display */}
        <motion.div
          key={total}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={SPRING}
          className="w-full rounded-2xl px-6 py-4 text-center"
          style={{ background: SURFACE }}
        >
          <div
            className="font-mono text-[clamp(36px,8vw,56px)] font-bold tabular-nums"
            style={{ color: TEXT }}
          >
            {formatNumber(total)}
          </div>
          <div className="mt-1 flex flex-wrap justify-center gap-2 text-sm" aria-live="polite">
            {keys.map((k, i) => (
              <span key={k} style={{ color: COLOR_LIST[i]! }}>
                {blocks[k]} {PLACE_NAMES[i]!.toLowerCase()}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Regroup message */}
        <AnimatePresence>
          {regroupMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING_POP}
              className="rounded-xl px-6 py-3 text-lg font-bold"
              style={{ background: `${PRIMARY}30`, color: TEXT }}
            >
              {regroupMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Block workspace */}
        <div className="flex w-full flex-col gap-2">
          {keys.map((key, idx) => (
            <div key={key} className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: `${COLOR_LIST[idx]!}08`, borderLeft: `3px solid ${COLOR_LIST[idx]!}40` }}>
              <span
                className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-wider"
                style={{ color: COLOR_LIST[idx]! }}
              >
                {PLACE_NAMES[idx]!}
              </span>
              <div className="flex min-h-[48px] flex-1 flex-wrap items-center gap-1.5">
                <AnimatePresence>
                  {Array.from({ length: blocks[key] }).map((_, bi) => (
                    <motion.div
                      key={`${key}-${bi}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={SPRING_POP}
                      style={{
                        width: key === "thousands" ? 48 : key === "hundreds" ? 36 : key === "tens" ? 36 : 10,
                        height: key === "thousands" ? 48 : key === "hundreds" ? 36 : key === "tens" ? 10 : 10,
                        background: `${COLOR_LIST[idx]!}20`,
                        border: `1.5px solid ${COLOR_LIST[idx]!}`,
                        borderRadius: key === "thousands" ? 6 : 3,
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Controls — one row, always 4 columns */}
        <div className="grid w-full grid-cols-4 gap-2">
          {keys.map((key, idx) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1.5 rounded-xl py-2"
              style={{ background: SURFACE }}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: COLOR_LIST[idx]! }}>
                {formatNumber(PLACE_VALUES[idx]!)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleRemove(key)}
                  disabled={isRegrouping || blocks[key] <= 0}
                  aria-label={`Remove one ${PLACE_NAMES[idx]!.toLowerCase()}`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-xl font-bold text-white transition-all active:scale-90 disabled:pointer-events-none disabled:opacity-30"
                  style={{ background: ELEVATED }}
                >
                  &minus;
                </button>
                <motion.span
                  key={blocks[key]}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="w-7 text-center font-mono text-lg font-bold text-white tabular-nums"
                >
                  {blocks[key]}
                </motion.span>
                <button
                  onClick={() => handleAdd(key)}
                  disabled={isRegrouping || blocks[key] >= 9}
                  aria-label={`Add one ${PLACE_NAMES[idx]!.toLowerCase()}`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-xl font-bold text-white transition-all active:scale-90 disabled:pointer-events-none disabled:opacity-30"
                  style={{ background: ELEVATED }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Guided Discovery                                          */
/* ================================================================== */

function DropSlot({
  label,
  color,
  filled,
  isOver,
  size = 56,
}: {
  label: string;
  color: string;
  filled: number | null;
  isOver?: boolean;
  size?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-[clamp(9px,2vw,12px)] font-semibold uppercase tracking-wide"
        style={{ color }}
      >
        {label}
      </span>
      <div
        style={{
          width: size,
          height: size,
          border: filled
            ? `2px solid ${color}`
            : isOver
              ? `2px solid ${color}`
              : `2px dashed ${BORDER}`,
          borderRadius: 12,
          background: filled ? `${color}30` : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "ui-monospace, monospace",
          fontSize: size * 0.5,
          fontWeight: 700,
          color: filled !== null ? color : MUTED,
          transition: "all 0.2s",
        }}
      >
        {filled !== null ? filled : ""}
      </div>
    </div>
  );
}

function DragArrangeChallenge({
  digits,
  correctAnswer,
  onCorrect,
}: {
  digits: number[];
  correctAnswer: number[];
  onCorrect: () => void;
}) {
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null, null]);
  const [available, setAvailable] = useState<number[]>([...digits]);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const liveValue = useMemo(() => {
    if (slots.some((s) => s === null)) return null;
    return (slots[0] as number) * 1000 + (slots[1] as number) * 100 + (slots[2] as number) * 10 + (slots[3] as number);
  }, [slots]);

  // Tap-to-place: track selected digit
  const [selectedDigit, setSelectedDigit] = useState<number | null>(null);

  const handleSlotTap = (slotIdx: number) => {
    if (selectedDigit === null) {
      // If slot is filled, return digit to available
      if (slots[slotIdx] !== null) {
        setAvailable((a) => [...a, slots[slotIdx] as number]);
        setSlots((s) => {
          const n = [...s];
          n[slotIdx] = null;
          return n;
        });
        setResult(null);
      }
      return;
    }
    // Place selected digit
    if (slots[slotIdx] !== null) {
      setAvailable((a) => [...a, slots[slotIdx] as number]);
    }
    setSlots((s) => {
      const n = [...s];
      n[slotIdx] = selectedDigit;
      return n;
    });
    setAvailable((a) => {
      const idx = a.indexOf(selectedDigit);
      if (idx === -1) return a;
      const n = [...a];
      n.splice(idx, 1);
      return n;
    });
    setSelectedDigit(null);
    setResult(null);
  };

  // Check answer when all slots filled
  useEffect(() => {
    if (slots.every((s) => s !== null)) {
      const isCorrect =
        slots[0] === correctAnswer[0] &&
        slots[1] === correctAnswer[1] &&
        slots[2] === correctAnswer[2] &&
        slots[3] === correctAnswer[3];
      setResult(isCorrect ? "correct" : "wrong");
    }
  }, [slots, correctAnswer]);

  const handleReset = () => {
    setSlots([null, null, null, null]);
    setAvailable([...digits]);
    setResult(null);
    setSelectedDigit(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Available digits */}
      <div className="flex gap-3">
        {available.map((d, i) => (
          <motion.div
            key={`avail-${d}-${i}`}
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              outline: selectedDigit === d ? `3px solid ${TEXT}` : "none",
              outlineOffset: 2,
              borderRadius: 12,
            }}
            transition={SPRING_POP}
            onClick={() => setSelectedDigit(selectedDigit === d ? null : d)}
            style={{
              width: 56,
              height: 56,
              background: ELEVATED,
              border: `2px solid ${BORDER}`,
              borderRadius: 12,
              color: TEXT,
              fontSize: 28,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {d}
          </motion.div>
        ))}
      </div>

      {/* Drop slots */}
      <div className="flex gap-3">
        {PLACE_NAMES.map((name, i) => (
          <div
            key={name}
            onClick={() => handleSlotTap(i)}
            className="cursor-pointer"
          >
            <DropSlot
              label={name}
              color={COLOR_LIST[i]!}
              filled={slots[i] ?? null}
            />
          </div>
        ))}
      </div>

      {/* Live value */}
      <div
        className="font-mono text-2xl font-bold tabular-nums"
        style={{ color: TEXT }}
        aria-live="polite"
      >
        {liveValue !== null ? formatNumber(liveValue) : "_ , _ _ _"}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {result === "correct" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_BOUNCY}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-lg font-bold" style={{ color: SUCCESS }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={SUCCESS} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Correct!
            </div>
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          </motion.div>
        )}
        {result === "wrong" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm" style={{ color: ERROR }}>
              Not quite! Think about which digit should be in the most powerful position.
            </span>
            <button
              onClick={handleReset}
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              style={{ background: ELEVATED, color: TEXT }}
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [prompt, setPrompt] = useState(0);

  return (
    <StageWrapper>
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {/* Prompt 1: The Puzzle */}
          {prompt === 0 && (
            <motion.div
              key="p1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="flex">
                  {[3, 4, 5, 6].map((d, i) => (
                    <ColoredDigit key={i} digit={d} placeIndex={i} size="lg" />
                  ))}
                </div>
                <span className="text-2xl font-light" style={{ color: MUTED }}>vs</span>
                <div className="flex">
                  {[6, 4, 5, 3].map((d, i) => (
                    <ColoredDigit key={i} digit={d} placeIndex={i} size="lg" />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {[3, 4, 5, 6].map((d) => (
                  <span
                    key={d}
                    className="rounded-lg px-3 py-1 font-mono text-lg font-bold"
                    style={{ background: ELEVATED, color: TEXT }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="rounded-xl p-5" style={{ background: SURFACE }}>
                <p className="text-base leading-relaxed" style={{ color: TEXT_SEC }}>
                  These two numbers use the exact same digits: 3, 4, 5, and 6.
                  But <strong style={{ color: TEXT }}>3,456</strong> and{" "}
                  <strong style={{ color: TEXT }}>6,453</strong> are very different numbers. Why?
                </p>
              </div>

              <ContinueButton onClick={() => setPrompt(1)} label="Got it, show me!" />
            </motion.div>
          )}

          {/* Prompt 2: Explanation */}
          {prompt === 1 && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex">
                    {[3, 4, 5, 6].map((d, i) => (
                      <ColoredDigit key={i} digit={d} placeIndex={i} size="lg" />
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-lg font-bold"
                    style={{ color: COLORS.thousands }}
                  >
                    3 is worth 3,000
                  </motion.div>
                </div>
                <span className="text-2xl font-light" style={{ color: MUTED }}>vs</span>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex">
                    {[6, 4, 5, 3].map((d, i) => (
                      <ColoredDigit key={i} digit={d} placeIndex={i} size="lg" />
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-lg font-bold"
                    style={{ color: COLORS.ones }}
                  >
                    3 is worth just 3
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-center text-sm italic"
                style={{ color: MUTED }}
              >
                Same digit, different value!
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="rounded-xl p-5"
                style={{ background: SURFACE }}
              >
                <p className="text-base leading-relaxed" style={{ color: TEXT_SEC }}>
                  Look at the 3 in each number. In 3,456, the 3 is in the thousands
                  place — it&apos;s worth 3,000. In 6,453, the 3 is in the ones place — it&apos;s
                  worth just 3. The{" "}
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-bold" style={{ color: TEXT }}>
                    POSITION
                  </span>{" "}
                  changes the{" "}
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-bold" style={{ color: TEXT }}>
                    VALUE
                  </span>
                  !
                </p>
              </motion.div>

              <ContinueButton onClick={() => setPrompt(2)} label="I see!" delay={2.0} />
            </motion.div>
          )}

          {/* Prompt 3: Make the biggest number */}
          {prompt === 2 && (
            <motion.div
              key="p3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="rounded-xl p-4" style={{ background: SURFACE }}>
                <p className="text-center text-base font-medium" style={{ color: TEXT }}>
                  What&apos;s the <strong>BIGGEST</strong> number you can make with the
                  digits 3, 4, 5, and 6?
                </p>
              </div>
              <DragArrangeChallenge
                digits={[3, 4, 5, 6]}
                correctAnswer={[6, 5, 4, 3]}
                onCorrect={() => setPrompt(3)}
              />
            </motion.div>
          )}

          {/* Prompt 4: Make the smallest number */}
          {prompt === 3 && (
            <motion.div
              key="p4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="rounded-xl p-4" style={{ background: SURFACE }}>
                <p className="text-center text-base font-medium" style={{ color: TEXT }}>
                  Now make the <strong>SMALLEST</strong> number with the same digits.
                </p>
              </div>
              <DragArrangeChallenge
                digits={[3, 4, 5, 6]}
                correctAnswer={[3, 4, 5, 6]}
                onCorrect={() => setPrompt(4)}
              />
            </motion.div>
          )}

          {/* Insight card + continue */}
          {prompt === 4 && (
            <motion.div
              key="p-insight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div
                className="w-full rounded-xl p-5"
                style={{
                  background: `${PRIMARY}15`,
                  borderLeft: `4px solid ${COLORS.thousands}`,
                }}
              >
                <p className="text-base font-medium" style={{ color: TEXT }}>
                  <strong>Key Insight:</strong> Same digits, different positions = different
                  numbers. The further LEFT a digit is, the more it&apos;s worth.
                </p>
              </div>
              <ContinueButton onClick={onContinue} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StageWrapper>
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
      setStep(6);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setStep(4), 6000),
      setTimeout(() => setStep(5), 7500),
      setTimeout(() => setStep(6), 8500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const notations = [
    { text: "3 \u00d7 1,000 = 3,000", color: COLORS.thousands, count: 3, blockSize: 40 },
    { text: "4 \u00d7 100 = 400", color: COLORS.hundreds, count: 4, blockSize: 30 },
    { text: "5 \u00d7 10 = 50", color: COLORS.tens, count: 5, blockSize: 24 },
    { text: "6 \u00d7 1 = 6", color: COLORS.ones, count: 6, blockSize: 8 },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        {/* Number at top */}
        <div className="font-mono text-[clamp(28px,6vw,48px)] font-bold tabular-nums" style={{ color: TEXT }}>
          3,456
        </div>

        {/* Block rows with notation */}
        <div className="flex w-full flex-col gap-4">
          {notations.map((n, i) => (
            <motion.div
              key={i}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: -10 }}
              animate={step > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-4 rounded-xl p-3"
              style={{ background: `${n.color}10` }}
            >
              {/* Mini blocks */}
              <div className="flex shrink-0 items-center gap-1">
                {Array.from({ length: n.count }).map((_, bi) => (
                  <div
                    key={bi}
                    style={{
                      width: Math.max(n.blockSize, 8),
                      height: Math.max(n.blockSize, 8),
                      background: `${n.color}25`,
                      border: `1.5px solid ${n.color}`,
                      borderRadius: n.blockSize > 20 ? 4 : 2,
                    }}
                  />
                ))}
              </div>

              {/* Arrow */}
              <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                <line x1="0" y1="8" x2="24" y2="8" stroke={n.color} strokeWidth="2" />
                <polyline points="20,3 26,8 20,13" stroke={n.color} strokeWidth="2" fill="none" />
              </svg>

              {/* Notation */}
              <span
                className="font-mono text-[clamp(14px,3vw,20px)] font-bold"
                style={{ color: n.color }}
                aria-label={n.text}
              >
                {n.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Expanded form */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            <div className="h-[2px] w-full" style={{ background: BORDER }} />
            <p className="text-center font-mono text-[clamp(12px,2.5vw,18px)] font-bold">
              <span style={{ color: TEXT }}>3,456 = </span>
              <span style={{ color: COLORS.thousands }}>3 &times; 1,000</span>
              <span style={{ color: TEXT }}> + </span>
              <span style={{ color: COLORS.hundreds }}>4 &times; 100</span>
              <span style={{ color: TEXT }}> + </span>
              <span style={{ color: COLORS.tens }}>5 &times; 10</span>
              <span style={{ color: TEXT }}> + </span>
              <span style={{ color: COLORS.ones }}>6 &times; 1</span>
            </p>
          </motion.div>
        )}

        {/* Power-of-10 insight */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-center text-sm italic" style={{ color: TEXT_SEC }}>
              Notice: each place is 10 times more than the place to its right!
            </p>
            <div className="flex items-center gap-2" style={{ color: MUTED }}>
              {["1", "10", "100", "1,000"].map((v, i) => (
                <span key={v} className="flex items-center gap-1">
                  <span className="font-mono text-sm font-semibold" style={{ color: COLOR_LIST[3 - i]! }}>
                    {v}
                  </span>
                  {i < 3 && (
                    <span className="text-xs" style={{ color: MUTED }}>
                      &rarr; &times;10 &rarr;
                    </span>
                  )}
                </span>
              ))}
            </div>
            <ContinueButton onClick={onContinue} delay={0.5} />
          </motion.div>
        )}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real-World Anchor                                         */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const cards = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke={SUCCESS} strokeWidth="2" />
          <text x="20" y="26" textAnchor="middle" fill={SUCCESS} fontSize="20" fontWeight="700">
            $
          </text>
        </svg>
      ),
      title: "Price Tags",
      body: (
        <>
          Every time you see a price like{" "}
          <strong style={{ color: TEXT }}>$34.56</strong>, you&apos;re reading place
          value. The 3 is worth thirty dollars, the 4 is worth four dollars, the 5
          is worth fifty cents, and the 6 is worth six cents.
        </>
      ),
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect x="6" y="10" width="28" height="20" rx="3" stroke={COLORS.hundreds} strokeWidth="2" />
          <line x1="20" y1="10" x2="20" y2="30" stroke={COLORS.hundreds} strokeWidth="1.5" />
          <line x1="6" y1="20" x2="34" y2="20" stroke={COLORS.hundreds} strokeWidth="1.5" />
        </svg>
      ),
      title: "Sports Scores & Stats",
      body: (
        <>
          A basketball player who scored{" "}
          <strong style={{ color: COLORS.hundreds }}>1,203</strong> career points
          is completely different from one with{" "}
          <strong style={{ color: COLORS.hundreds }}>1,023</strong>. Same digits,
          different positions — a 180-point gap thanks to place value!
        </>
      ),
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <polygon points="20,4 36,34 4,34" stroke="#fbbf24" strokeWidth="2" fill="none" />
          <text x="20" y="29" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="700">
            !
          </text>
        </svg>
      ),
      title: "The $27,000 Mistake",
      body: (
        <>
          Imagine a bank puts{" "}
          <strong style={{ color: COLORS.hundreds }}>$300</strong> in your account
          instead of{" "}
          <strong style={{ color: COLORS.thousands }}>$3,000</strong>. That&apos;s a
          place value error — the 3 was put in the hundreds place instead of
          the thousands place. One position = one zero = a very big difference!
        </>
      ),
    },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-4">
        <h2 className="mb-2 text-xl font-bold" style={{ color: TEXT }}>
          Place Value in the Real World
        </h2>
        {cards.map((card, i) => (
          <motion.article
            key={i}
            role="article"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.4, ease: "easeOut" }}
            className="w-full rounded-2xl p-5"
            style={{ background: SURFACE }}
          >
            <div className="mb-3 flex items-center gap-3">
              {card.icon}
              <h3 className="text-lg font-bold" style={{ color: TEXT }}>
                {card.title}
              </h3>
            </div>
            <p className="text-base leading-relaxed" style={{ color: TEXT_SEC }}>
              {card.body}
            </p>
          </motion.article>
        ))}
        <ContinueButton onClick={onContinue} delay={0.8} />
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 6: Practice (9 problems)                                     */
/* ================================================================== */

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<("correct" | "wrong" | null)[]>(
    Array.from({ length: 9 }, () => null),
  );

  const advance = useCallback(() => {
    setResults((r) => {
      const n = [...r];
      n[current] = "correct";
      return n;
    });
    if (current < 8) {
      setCurrent((c) => c + 1);
    } else {
      onContinue();
    }
  }, [current, onContinue]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        {/* Progress dots */}
        <div className="flex gap-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full transition-all"
              style={{
                background:
                  r === "correct" ? SUCCESS : r === "wrong" ? ERROR : ELEVATED,
                boxShadow: i === current ? `0 0 0 2px ${PRIMARY}` : "none",
              }}
            />
          ))}
        </div>

        <span className="text-xs uppercase tracking-wide" style={{ color: MUTED }}>
          Problem {current + 1} of 9 &middot;{" "}
          {current < 3 ? "Recall" : current < 6 ? "Procedure" : "Understanding"}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {current === 0 && <P1DigitId onCorrect={advance} />}
            {current === 1 && <P2ValueId onCorrect={advance} />}
            {current === 2 && <P3ExpandedForm onCorrect={advance} />}
            {current === 3 && <P4Comparison onCorrect={advance} />}
            {current === 4 && <P5Rounding onCorrect={advance} />}
            {current === 5 && <P6Ordering onCorrect={advance} />}
            {current === 6 && <P7Conceptual onCorrect={advance} />}
            {current === 7 && <P8Creative onCorrect={advance} />}
            {current === 8 && <P9ZeroPurpose onCorrect={advance} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </StageWrapper>
  );
}

/* --- Practice Problem Components --- */

function ProblemShell({
  prompt,
  number,
  children,
}: {
  prompt: string;
  number?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl p-6" style={{ background: SURFACE }}>
      <p className="text-center text-base font-medium" style={{ color: TEXT }}>
        {prompt}
      </p>
      {number && (
        <div className="font-mono text-[clamp(28px,6vw,48px)] font-bold tabular-nums" style={{ color: TEXT }}>
          {number}
        </div>
      )}
      {children}
    </div>
  );
}

function P1DigitId({ onCorrect }: { onCorrect: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const correct = 7;
  const digits = [4, 7, 2, 9];

  const handleSelect = (d: number) => {
    setSelected(d);
    if (d === correct) {
      setFeedback("Correct! The 7 is in the hundreds place.");
    } else {
      setFeedback(`Not quite. The ${d} is in the ${PLACE_NAMES[digits.indexOf(d)]!.toLowerCase()} place.`);
    }
  };

  return (
    <ProblemShell prompt="What digit is in the hundreds place of 4,729?">
      <div className="flex gap-1">
        {digits.map((d, i) => (
          <div key={d} className="flex flex-col items-center">
            <ColoredDigit digit={d} placeIndex={i} size="lg" />
            <span className="mt-1 text-[10px]" style={{ color: COLOR_LIST[i]!, opacity: 0.5 }}>
              {PLACE_NAMES[i]!.slice(0, 2)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {digits.map((d) => (
          <button
            key={d}
            onClick={() => handleSelect(d)}
            className="flex h-14 w-14 items-center justify-center rounded-xl font-mono text-2xl font-bold transition-all active:scale-95"
            style={{
              background:
                selected === d
                  ? d === correct
                    ? SUCCESS
                    : ERROR
                  : ELEVATED,
              color: TEXT,
              minHeight: 48,
            }}
          >
            {d}
          </button>
        ))}
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-sm" style={{ color: selected === correct ? SUCCESS : ERROR }}>
            {feedback}
          </p>
          {selected === correct && (
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          )}
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P2ValueId({ onCorrect }: { onCorrect: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const options = ["7", "70", "700", "7,000"];
  const correct = "7,000";

  const handleSelect = (opt: string) => {
    setSelected(opt);
    if (opt === correct) {
      setFeedback("Yes! The 7 is in the thousands place, so its value is 7,000.");
    } else {
      setFeedback(`Close! ${opt} would be the value in a different position.`);
    }
  };

  return (
    <ProblemShell prompt="What is the VALUE of the 7 in 7,845?">
      <div className="flex gap-1">
        {[7, 8, 4, 5].map((d, i) => (
          <ColoredDigit key={i} digit={d} placeIndex={i} size="lg" dimmed={i !== 0} />
        ))}
      </div>
      <div className="flex w-full flex-col gap-2">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-lg font-medium transition-all active:scale-[0.98]"
            style={{
              background:
                selected === opt
                  ? opt === correct
                    ? SUCCESS
                    : ERROR
                  : ELEVATED,
              color: TEXT,
              minHeight: 52,
            }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: `${BORDER}`, color: TEXT }}
            >
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-sm" style={{ color: selected === correct ? SUCCESS : ERROR }}>
            {feedback}
          </p>
          {selected === correct && (
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          )}
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P3ExpandedForm({ onCorrect }: { onCorrect: () => void }) {
  const terms = [
    { label: "5 \u00d7 1,000", color: COLORS.thousands },
    { label: "3 \u00d7 100", color: COLORS.hundreds },
    { label: "0 \u00d7 10", color: COLORS.tens },
    { label: "2 \u00d7 1", color: COLORS.ones },
  ];
  const [placed, setPlaced] = useState<(number | null)[]>([null, null, null, null]);
  const [avail, setAvail] = useState([0, 1, 2, 3].sort(() => Math.random() - 0.5));
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSlotClick = (slotIdx: number) => {
    if (selectedTerm === null) {
      if (placed[slotIdx] !== null) {
        setAvail((a) => [...a, placed[slotIdx] as number]);
        setPlaced((p) => { const n = [...p]; n[slotIdx] = null; return n; });
        setFeedback(null);
      }
      return;
    }
    if (placed[slotIdx] !== null) {
      setAvail((a) => [...a, placed[slotIdx] as number]);
    }
    setPlaced((p) => { const n = [...p]; n[slotIdx] = selectedTerm; return n; });
    setAvail((a) => a.filter((x) => x !== selectedTerm));
    setSelectedTerm(null);
    setFeedback(null);
  };

  useEffect(() => {
    if (placed.every((p) => p !== null)) {
      if (placed[0] === 0 && placed[1] === 1 && placed[2] === 2 && placed[3] === 3) {
        setFeedback("Correct! Notice how we include 0 \u00d7 10 even though it equals zero.");
      } else {
        setFeedback("Not quite. Place them in order: thousands, hundreds, tens, ones.");
      }
    }
  }, [placed]);

  return (
    <ProblemShell prompt="Write 5,302 in expanded form. Tap a term, then tap a slot.">
      <div className="flex gap-1">
        {[5, 3, 0, 2].map((d, i) => (
          <ColoredDigit key={i} digit={d} placeIndex={i} size="lg" />
        ))}
      </div>
      {/* Available terms */}
      <div className="flex flex-wrap justify-center gap-2">
        {avail.map((ti) => (
          <motion.button
            key={ti}
            layout
            onClick={() => setSelectedTerm(selectedTerm === ti ? null : ti)}
            className="rounded-lg px-3 py-2 text-sm font-bold transition-all"
            style={{
              background: `${terms[ti]!.color}25`,
              border: `2px solid ${selectedTerm === ti ? TEXT : terms[ti]!.color}`,
              color: terms[ti]!.color,
              minHeight: 44,
            }}
          >
            {terms[ti]!.label}
          </motion.button>
        ))}
      </div>
      {/* Slots */}
      <div className="flex items-center gap-1">
        {placed.map((p, i) => (
          <span key={i} className="flex items-center gap-1">
            <button
              onClick={() => handleSlotClick(i)}
              className="flex min-h-[44px] min-w-[80px] items-center justify-center rounded-lg px-2 py-1 text-sm font-bold"
              style={{
                border: p !== null ? `2px solid ${terms[p]!.color}` : `2px dashed ${BORDER}`,
                background: p !== null ? `${terms[p]!.color}20` : "transparent",
                color: p !== null ? terms[p]!.color : MUTED,
              }}
            >
              {p !== null ? terms[p]!.label : "____"}
            </button>
            {i < 3 && (
              <span className="text-lg font-bold" style={{ color: MUTED }}>
                +
              </span>
            )}
          </span>
        ))}
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-sm" style={{ color: feedback.startsWith("Correct") ? SUCCESS : ERROR }}>
            {feedback}
          </p>
          {feedback.startsWith("Correct") && (
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          )}
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P4Comparison({ onCorrect }: { onCorrect: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelect = (val: string) => {
    setSelected(val);
    if (val === "3,465") {
      setFeedback(
        "3,465 is greater! Same thousands and hundreds, but 6 tens beats 5 tens.",
      );
    } else {
      setFeedback("Not quite. Compare digit by digit from the left.");
    }
  };

  return (
    <ProblemShell prompt="Which is greater: 3,456 or 3,465?">
      <div className="flex items-center gap-4">
        <div className="flex">
          {[3, 4, 5, 6].map((d, i) => (
            <ColoredDigit key={i} digit={d} placeIndex={i} size="md" />
          ))}
        </div>
        <span className="text-2xl" style={{ color: MUTED }}>?</span>
        <div className="flex">
          {[3, 4, 6, 5].map((d, i) => (
            <ColoredDigit key={i} digit={d} placeIndex={i} size="md" />
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        {["3,456", "3,465"].map((val) => (
          <button
            key={val}
            onClick={() => handleSelect(val)}
            className="rounded-xl px-6 py-3 font-mono text-xl font-bold transition-all active:scale-95"
            style={{
              background: selected === val ? (val === "3,465" ? SUCCESS : ERROR) : ELEVATED,
              color: TEXT,
              minWidth: 120,
              minHeight: 52,
            }}
          >
            {val}
          </button>
        ))}
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-sm" style={{ color: selected === "3,465" ? SUCCESS : ERROR }}>
            {feedback}
          </p>
          {selected === "3,465" && (
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          )}
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P5Rounding({ onCorrect }: { onCorrect: () => void }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelect = (val: number) => {
    setAnswer(val);
    if (val === 4700) {
      setFeedback("4,678 rounds to 4,700 because it's closer (only 22 away vs 78).");
    } else {
      setFeedback("Not quite. 4,678 is closer to 4,700 than to 4,600.");
    }
  };

  return (
    <ProblemShell prompt="Round 4,678 to the nearest hundred.">
      {/* Simple number line */}
      <div className="relative w-full px-4 py-6">
        <div className="relative mx-auto h-1 rounded-full" style={{ background: BORDER }}>
          {/* Endpoints */}
          <span className="absolute -left-1 -top-6 font-mono text-sm font-bold" style={{ color: TEXT }}>
            4,600
          </span>
          <span className="absolute -right-1 -top-6 font-mono text-sm font-bold" style={{ color: TEXT }}>
            4,700
          </span>
          {/* Midpoint */}
          <div className="absolute left-1/2 -top-5 -translate-x-1/2 font-mono text-xs" style={{ color: MUTED }}>
            4,650
          </div>
          <div className="absolute left-1/2 -top-1 h-3 w-[1px]" style={{ background: MUTED }} />
          {/* Marker at 4,678 = 78% of the way */}
          <div
            className="absolute -top-2 h-4 w-4 rounded-full"
            style={{ left: "78%", background: ERROR, transform: "translateX(-50%)" }}
          />
          <span
            className="absolute -top-7 font-mono text-xs font-bold"
            style={{ left: "78%", color: TEXT, transform: "translateX(-50%)" }}
          >
            4,678
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        {[4600, 4700].map((val) => (
          <button
            key={val}
            onClick={() => handleSelect(val)}
            className="rounded-xl px-6 py-3 font-mono text-xl font-bold transition-all active:scale-95"
            style={{
              background: answer === val ? (val === 4700 ? SUCCESS : ERROR) : ELEVATED,
              color: TEXT,
              minHeight: 52,
            }}
          >
            {formatNumber(val)}
          </button>
        ))}
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-sm" style={{ color: answer === 4700 ? SUCCESS : ERROR }}>
            {feedback}
          </p>
          {answer === 4700 && (
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          )}
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P6Ordering({ onCorrect }: { onCorrect: () => void }) {
  const nums = ["5,432", "5,423", "5,234"];
  const correct = ["5,234", "5,423", "5,432"];
  const [order, setOrder] = useState<string[]>([]);
  const [available, setAvailable] = useState([...nums]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleTap = (num: string) => {
    const newOrder = [...order, num];
    setOrder(newOrder);
    setAvailable((a) => a.filter((x) => x !== num));

    if (newOrder.length === 3) {
      if (newOrder[0] === correct[0] && newOrder[1] === correct[1] && newOrder[2] === correct[2]) {
        setFeedback("Correct! Compare hundreds: 200 < 400. For those with 400, compare tens: 20 < 30.");
      } else {
        setFeedback("Not quite. Try again — order from least to greatest.");
        setTimeout(() => {
          setOrder([]);
          setAvailable([...nums]);
          setFeedback(null);
        }, 1500);
      }
    }
  };

  return (
    <ProblemShell prompt="Order from least to greatest. Tap numbers in order.">
      {/* Available */}
      <div className="flex gap-3">
        {available.map((num) => (
          <motion.button
            key={num}
            layout
            onClick={() => handleTap(num)}
            className="rounded-xl px-4 py-3 font-mono text-lg font-bold transition-all active:scale-95"
            style={{ background: ELEVATED, color: TEXT, minHeight: 52 }}
          >
            {num}
          </motion.button>
        ))}
      </div>
      {/* Placed */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="flex min-h-[52px] min-w-[80px] items-center justify-center rounded-xl font-mono text-lg font-bold"
              style={{
                border: order[i] ? `2px solid ${SUCCESS}` : `2px dashed ${BORDER}`,
                color: order[i] ? TEXT : MUTED,
                background: order[i] ? `${SUCCESS}15` : "transparent",
              }}
            >
              {order[i] || (i === 0 ? "Least" : i === 2 ? "Greatest" : "___")}
            </div>
            {i < 2 && <span style={{ color: MUTED }}>&lt;</span>}
          </div>
        ))}
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-sm" style={{ color: feedback.startsWith("Correct") ? SUCCESS : ERROR }}>
            {feedback}
          </p>
          {feedback.startsWith("Correct") && (
            <button
              onClick={onCorrect}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: PRIMARY, minHeight: 44 }}
            >
              Next &rarr;
            </button>
          )}
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P7Conceptual({ onCorrect }: { onCorrect: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { id: "a", text: "Because we add 10 each time we move left", correct: false },
    { id: "b", text: "Because our number system is base 10 — each place is ×10 the one to its right", correct: true },
    { id: "c", text: "Because bigger numbers are always on the left side", correct: false },
    { id: "d", text: "Because each place holds more digits than the one before", correct: false },
  ];

  const isCorrect = options.find((o) => o.id === selected)?.correct ?? false;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <ProblemShell prompt="Why does moving a digit one place to the left make it worth 10 times more?">
      {!submitted ? (
        <div className="flex w-full flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all active:scale-[0.98]"
              style={{
                background: selected === opt.id ? `${PRIMARY}30` : ELEVATED,
                border: `2px solid ${selected === opt.id ? PRIMARY : "transparent"}`,
                color: TEXT,
                minHeight: 52,
              }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: BORDER, color: TEXT }}
              >
                {opt.id.toUpperCase()}
              </span>
              {opt.text}
            </button>
          ))}
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="mt-2 self-end rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            style={{ background: PRIMARY, minHeight: 44 }}
          >
            Check Answer
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            {["1", "10", "100", "1,000"].map((v, i) => (
              <span key={v} className="flex items-center gap-1">
                <span className="font-mono text-lg font-bold" style={{ color: COLOR_LIST[3 - i]! }}>
                  {v}
                </span>
                {i < 3 && (
                  <span className="text-sm" style={{ color: MUTED }}>
                    &rarr; &times;10 &rarr;
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="text-center text-sm" style={{ color: TEXT_SEC }}>
            Each position is 10 times the one before it because our number system is base 10.
          </p>
          <p className="text-sm font-semibold" style={{ color: isCorrect ? SUCCESS : ERROR }}>
            {isCorrect ? "Correct!" : "Not quite — it's because our system is base 10."}
          </p>
          <button
            onClick={onCorrect}
            className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: PRIMARY, minHeight: 44 }}
          >
            Next &rarr;
          </button>
        </motion.div>
      )}
    </ProblemShell>
  );
}

function P8Creative({ onCorrect }: { onCorrect: () => void }) {
  return (
    <ProblemShell prompt="Create the largest 4-digit number using 1, 3, 7, 9. Each digit once.">
      <DragArrangeChallenge
        digits={[1, 3, 7, 9]}
        correctAnswer={[9, 7, 3, 1]}
        onCorrect={onCorrect}
      />
    </ProblemShell>
  );
}

function P9ZeroPurpose({ onCorrect }: { onCorrect: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { id: "a", text: "The 0 adds nothing — 5,027 and 527 are the same number", correct: false },
    { id: "b", text: "The 0 holds the hundreds place empty, keeping the 5 in the thousands place", correct: true },
    { id: "c", text: "The 0 makes the number even", correct: false },
  ];

  const isCorrect = options.find((o) => o.id === selected)?.correct ?? false;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <ProblemShell prompt="Why is the 0 important in 5,027?">
      {!submitted ? (
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="text-center">
              <div className="font-mono text-2xl font-bold" style={{ color: TEXT }}>5,027</div>
            </div>
          </div>
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all active:scale-[0.98]"
              style={{
                background: selected === opt.id ? `${PRIMARY}30` : ELEVATED,
                border: `2px solid ${selected === opt.id ? PRIMARY : "transparent"}`,
                color: TEXT,
                minHeight: 52,
              }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: BORDER, color: TEXT }}
              >
                {opt.id.toUpperCase()}
              </span>
              {opt.text}
            </button>
          ))}
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="mt-2 self-end rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            style={{ background: PRIMARY, minHeight: 44 }}
          >
            Check Answer
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-mono text-2xl font-bold" style={{ color: TEXT }}>
                5,027
              </div>
              <span className="text-xs" style={{ color: MUTED }}>
                with zero
              </span>
            </div>
            <span className="text-2xl font-bold" style={{ color: ERROR }}>
              &ne;
            </span>
            <div className="text-center">
              <div className="font-mono text-2xl font-bold" style={{ color: TEXT }}>
                527
              </div>
              <span className="text-xs" style={{ color: MUTED }}>
                without zero
              </span>
            </div>
          </div>
          <p className="text-center text-sm" style={{ color: TEXT_SEC }}>
            Without the 0, the 5 drops from thousands to hundreds.
            That&apos;s <strong style={{ color: ERROR }}>4,500 less</strong>!
            Zero keeps digits in their correct positions.
          </p>
          <p className="text-sm font-semibold" style={{ color: isCorrect ? SUCCESS : ERROR }}>
            {isCorrect ? "Correct!" : "Not quite — the zero is a placeholder that keeps other digits in position."}
          </p>
          <button
            onClick={onCorrect}
            className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: PRIMARY, minHeight: 44 }}
          >
            Next &rarr;
          </button>
        </motion.div>
      )}
    </ProblemShell>
  );
}

/* ================================================================== */
/*  STAGE 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const minLen = 30;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <StageWrapper>
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        <div className="w-full rounded-2xl p-6" style={{ background: SURFACE }}>
          {/* Header badge */}
          <div className="mb-4">
            <span
              className="rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{ background: `${PRIMARY}20`, color: COLORS.thousands }}
            >
              Reflection
            </span>
          </div>

          {/* Prompt */}
          <p className="mb-4 text-lg font-medium leading-relaxed" style={{ color: TEXT }}>
            Explain in your own words why the digit 5 means different things in 500, 50, and 5.
          </p>

          {/* Visual hint */}
          <div className="mb-6 flex items-center justify-center gap-4">
            {[
              { num: "500", placeIdx: 1, label: "hundreds" },
              { num: "50", placeIdx: 2, label: "tens" },
              { num: "5", placeIdx: 3, label: "ones" },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <span
                  className="font-mono text-2xl font-bold"
                  style={{ color: COLOR_LIST[item.placeIdx]! }}
                >
                  {item.num}
                </span>
                <div className="text-[10px] uppercase" style={{ color: COLOR_LIST[item.placeIdx]!, opacity: 0.6 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {!submitted ? (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="The digit 5 means different things because..."
                className="mb-3 w-full resize-none rounded-xl p-4 text-base leading-relaxed focus:outline-none focus:ring-2"
                style={{
                  background: BG,
                  border: `1px solid ${BORDER}`,
                  color: TEXT_SEC,
                  minHeight: 120,
                  maxHeight: 240,
                }}
                aria-label="Explain why the digit 5 means different things in 500, 50, and 5"
              />

              <div className="mb-4 flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: text.length >= minLen ? SUCCESS : MUTED }}
                >
                  {text.length} / {minLen} minimum
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={text.length < minLen}
                className="w-full rounded-xl py-3 text-base font-semibold text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
                style={{ background: PRIMARY, minHeight: 52 }}
              >
                Submit Reflection
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-1" aria-live="polite">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={s <= 4 ? "#fbbf24" : ELEVATED}
                    stroke={s <= 4 ? "#fbbf24" : BORDER}
                    strokeWidth="1.5"
                  >
                    <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
                  </svg>
                ))}
                <span className="ml-2 text-sm" style={{ color: MUTED }}>
                  4/5
                </span>
              </div>

              {/* AI feedback */}
              <div
                className="rounded-xl p-4 text-sm italic"
                style={{
                  background: BG,
                  borderLeft: `4px solid ${PRIMARY}`,
                  color: MUTED,
                }}
              >
                Great job connecting position to value! You clearly understand that the
                same digit carries different weight depending on where it sits in a number.
              </div>

              {/* XP */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center text-lg font-bold"
                style={{ color: "#fbbf24" }}
              >
                +65 XP
              </motion.div>

              {/* Confirmation visual */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-6"
              >
                {[
                  { val: "500", pos: "Hundreds", color: COLORS.hundreds },
                  { val: "50", pos: "Tens", color: COLORS.tens },
                  { val: "5", pos: "Ones", color: COLORS.ones },
                ].map((item) => (
                  <div key={item.val} className="flex flex-col items-center gap-1">
                    <span
                      className="text-[10px] font-semibold uppercase"
                      style={{ color: item.color }}
                    >
                      {item.pos}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg font-mono text-xl font-bold"
                      style={{ background: `${item.color}20`, border: `2px solid ${item.color}`, color: item.color }}
                    >
                      5
                    </div>
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {item.val}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Complete button */}
              <ContinueButton
                onClick={onComplete}
                label="Complete Lesson"
                delay={1.0}
              />
            </motion.div>
          )}
        </div>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

export function PlaceValueLesson({ onComplete }: PlaceValueLessonProps) {
  return (
    <LessonShell title="NO-1.1 Place Value" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
