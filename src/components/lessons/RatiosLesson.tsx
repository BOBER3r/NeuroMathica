"use client";
import { VideoHook } from "@/components/lessons/VideoHook";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { cn } from "@/lib/utils/cn";

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */

type Stage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const STAGES: readonly Stage[] = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
] as const;

interface PracticeOption {
  id: string;
  text: string;
  correct: boolean;
}

interface PracticeProblem {
  id: string;
  layer: "recall" | "procedure" | "understanding";
  stem: string;
  type: "multiple-choice" | "multi-select" | "numeric-input" | "ratio-table";
  options?: PracticeOption[];
  correctAnswer?: number;
  tableData?: {
    headerA: string;
    headerB: string;
    rows: { a: number | string; b: number | string }[];
    correctAnswers: { row: number; column: "a" | "b"; value: number }[];
  };
  feedback: Record<string, string>;
}

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════ */

const INDIGO = "#818cf8";
const VIOLET = "#a78bfa";
const EMERALD = "#34d399";
const RED = "#f87171";
const AMBER = "#fbbf24";
const BLUE = "#60a5fa";
const ORANGE = "#fb923c";
const PINK = "#f472b6";
const PURPLE = "#c084fc";

const UNSHADED = "#334155";
const BORDER = "#64748b";
const SURFACE = "#1e293b";
const BG = "#0f172a";
const TEXT = "#e2e8f0";
const TEXT_SEC = "#94a3b8";

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };
const SPRING_GENTLE = {
  type: "spring" as const,
  damping: 25,
  stiffness: 200,
};
const EASE = {
  type: "tween" as const,
  duration: 0.3,
  ease: "easeInOut" as const,
};

const MIN_INTERACTIONS = 10;
const MAX_TOKENS = 12;
const DEFAULT_BLUE = 3;
const DEFAULT_ORANGE = 5;
const MAX_GROUPS = 8;

/* ═══════════════════════════════════════════════════════════════════════
   PRACTICE PROBLEM BANK (9 problems)
   ═══════════════════════════════════════════════════════════════════════ */

const PROBLEMS: PracticeProblem[] = [
  /* ── Layer 0: Recall (R1-R3) ────────────────────────────────────── */
  {
    id: "R1",
    layer: "recall",
    type: "multiple-choice",
    stem: "A bag has 4 red marbles and 7 blue marbles. What is the ratio of red to blue marbles?",
    options: [
      { id: "a", text: "4 : 7", correct: true },
      { id: "b", text: "7 : 4", correct: false },
      { id: "c", text: "4 : 11", correct: false },
      { id: "d", text: "7 : 11", correct: false },
    ],
    feedback: {
      correct:
        "Right! The ratio of red to blue is 4:7. The first number matches the first thing named (red), and the second matches the second (blue).",
      b: "Close, but order matters! The question asked for red TO blue, so red comes first. The answer is 4:7, not 7:4.",
      c: "4:11 would be the ratio of red to TOTAL marbles (4+7=11). The question asked for red to BLUE, which is 4:7.",
      d: "7:11 would be the ratio of blue to TOTAL. The question asked for red to blue, which is 4:7.",
    },
  },
  {
    id: "R2",
    layer: "recall",
    type: "multiple-choice",
    stem: "In a class, there are 5 students who walk to school for every 3 students who take the bus. What is the ratio of walkers to bus riders?",
    options: [
      { id: "a", text: "5 : 3", correct: true },
      { id: "b", text: "3 : 5", correct: false },
      { id: "c", text: "5 : 8", correct: false },
      { id: "d", text: "3 : 8", correct: false },
    ],
    feedback: {
      correct:
        "Exactly! 5 walkers for every 3 bus riders = 5:3. The first thing named (walkers) goes first.",
      b: "Careful with order! The question says 'walkers to bus riders,' so walkers come first: 5:3.",
      c: "5:8 would be the ratio of walkers to ALL students (5+3=8). The question asks for walkers to bus riders: 5:3.",
      d: "3:8 would be bus riders to ALL students. The question asks for walkers to bus riders: 5:3.",
    },
  },
  {
    id: "R3",
    layer: "recall",
    type: "multiple-choice",
    stem: "This double number line shows cups of flour and cups of sugar in a recipe. The first pair is (2, 3). What is the ratio of flour to sugar?",
    options: [
      { id: "a", text: "2 : 3", correct: true },
      { id: "b", text: "3 : 2", correct: false },
      { id: "c", text: "4 : 6", correct: false },
      { id: "d", text: "2 : 5", correct: false },
    ],
    feedback: {
      correct:
        "Right! The first pair on the double number line is (2, 3), so the ratio of flour to sugar is 2:3.",
      b: "Watch the order! Flour is on top, sugar is on the bottom. The ratio of flour to sugar is 2:3, not 3:2.",
      c: "4:6 is an equivalent ratio (the second mark), but 2:3 is the simplest form. Both are correct, but 2:3 best matches the question.",
      d: "Check the number lines again. The first mark shows flour=2 and sugar=3, so the ratio is 2:3.",
    },
  },
  /* ── Layer 1: Procedure (P1-P3) ─────────────────────────────────── */
  {
    id: "P1",
    layer: "procedure",
    type: "numeric-input",
    stem: "The ratio of cats to dogs at a shelter is 3:7. If there are 12 cats, how many dogs are there?",
    correctAnswer: 28,
    feedback: {
      correct:
        "28 dogs! You found that 12 is 3 \u00D7 4, so you need 7 \u00D7 4 = 28 dogs to keep the same ratio.",
      incorrect:
        "To go from 3 cats to 12 cats, we multiply by 4 (since 3 \u00D7 4 = 12). To keep the ratio 3:7, we must also multiply the dogs by 4: 7 \u00D7 4 = 28.",
    },
  },
  {
    id: "P2",
    layer: "procedure",
    type: "ratio-table",
    stem: "Complete the ratio table for the ratio 5 : 2.",
    tableData: {
      headerA: "Apples",
      headerB: "Oranges",
      rows: [
        { a: 5, b: 2 },
        { a: 10, b: "?" },
        { a: "?", b: 6 },
        { a: 25, b: "?" },
      ],
      correctAnswers: [
        { row: 1, column: "b", value: 4 },
        { row: 2, column: "a", value: 15 },
        { row: 3, column: "b", value: 10 },
      ],
    },
    feedback: {
      correct:
        "Perfect! You found all the missing values by multiplying both parts of the ratio by the same number.",
      incorrect:
        "For each row, find the multiplier. Row 2: 10/5 = \u00D72, so 2 \u00D7 2 = 4. Row 3: 6/2 = \u00D73, so 5 \u00D7 3 = 15. Row 4: 25/5 = \u00D75, so 2 \u00D7 5 = 10.",
    },
  },
  {
    id: "P3",
    layer: "procedure",
    type: "multiple-choice",
    stem: "Are these two ratios equivalent? 6 : 9 and 10 : 15",
    options: [
      { id: "a", text: "Yes, they are equivalent", correct: true },
      { id: "b", text: "No, they are NOT equivalent", correct: false },
    ],
    feedback: {
      correct:
        "Yes! Both simplify to 2:3. Divide both parts of 6:9 by 3 to get 2:3. Divide both parts of 10:15 by 5 to get 2:3. Same ratio!",
      b: "Actually, they ARE equivalent! Both simplify to 2:3. Divide both parts of 6:9 by 3 to get 2:3. Divide both parts of 10:15 by 5 to get 2:3.",
    },
  },
  /* ── Layer 2: Understanding (U1-U3) ─────────────────────────────── */
  {
    id: "U1",
    layer: "understanding",
    type: "multi-select",
    stem: "A bag has 3 green marbles and 7 yellow marbles. Select ALL statements that are TRUE.",
    options: [
      { id: "a", text: "The ratio of green to yellow is 3:7", correct: true },
      {
        id: "b",
        text: "The ratio of yellow to green is 3:7",
        correct: false,
      },
      { id: "c", text: "3/10 of the marbles are green", correct: true },
      { id: "d", text: "3/7 of the marbles are green", correct: false },
    ],
    feedback: {
      correct:
        "Excellent! The ratio of green to yellow is 3:7 (comparing two groups) AND 3/10 of ALL marbles are green (fraction of the whole: 3 out of 3+7=10).",
      incorrect:
        "The ratio of green to yellow is 3:7 (green first since it is named first). 3/10 of marbles are green (3 out of 10 total). 7:3 would be yellow-to-green, and 3/7 is the ratio notation, not the fraction of the whole.",
    },
  },
  {
    id: "U2",
    layer: "understanding",
    type: "multiple-choice",
    stem: "A recipe calls for a 2:5 ratio of sugar to flour. Your friend accidentally uses a 5:2 ratio of sugar to flour. What happens?",
    options: [
      { id: "a", text: "The recipe turns out the same", correct: false },
      { id: "b", text: "The recipe is way too sweet", correct: true },
      { id: "c", text: "The recipe is way too floury", correct: false },
      {
        id: "d",
        text: "You can\u2019t tell without knowing the amounts",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Exactly! 5:2 sugar-to-flour means MORE sugar than flour \u2014 the opposite of the original recipe. That would make it extremely sweet! Order matters in ratios.",
      a: "Actually, 2:5 and 5:2 are very different! With 2:5, flour is the bigger amount. With 5:2, sugar becomes the bigger amount.",
      c: "Think again: 5:2 sugar-to-flour means 5 parts SUGAR for every 2 parts flour. That\u2019s a LOT of sugar \u2014 it would be too sweet, not too floury.",
      d: "Even without knowing exact amounts, we can tell. 2:5 means less sugar than flour. 5:2 means more sugar than flour. The proportions flip!",
    },
  },
  {
    id: "U3",
    layer: "understanding",
    type: "multiple-choice",
    stem: "Which pair of ratios is NOT equivalent?",
    options: [
      { id: "a", text: "3:5 and 6:10", correct: false },
      { id: "b", text: "4:6 and 10:15", correct: false },
      { id: "c", text: "2:3 and 6:8", correct: true },
      { id: "d", text: "1:4 and 3:12", correct: false },
    ],
    feedback: {
      correct:
        "Correct! 2:3 and 6:8 are NOT equivalent. 2:3 scaled by 3 gives 6:9, not 6:8. Meanwhile 6:8 simplifies to 3:4, which is a different ratio.",
      a: "3:5 and 6:10 ARE equivalent (multiply both parts by 2). Keep looking for the pair that doesn\u2019t match.",
      b: "4:6 and 10:15 ARE equivalent (both simplify to 2:3). Keep looking.",
      d: "1:4 and 3:12 ARE equivalent (multiply both parts by 3). Keep looking.",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

/* ═══════════════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

function ContinueButton({
  onClick,
  disabled = false,
  children = "Continue" as ReactNode,
  progress,
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: ReactNode;
  progress?: number;
}) {
  return (
    <motion.button
      className="relative inline-flex items-center justify-center gap-2 rounded-xl font-medium px-6 py-3 text-base select-none"
      style={{
        minHeight: 48,
        minWidth: 48,
        background: disabled ? `${INDIGO}66` : INDIGO,
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", damping: 15, stiffness: 400 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: disabled ? 0.5 : 1, y: 0 }}
      aria-label={typeof children === "string" ? children : "Continue"}
      aria-disabled={disabled}
    >
      {progress !== undefined && progress < 1 && (
        <svg
          className="absolute -top-1 -right-1"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <circle
            cx={12}
            cy={12}
            r={10}
            fill="none"
            stroke={UNSHADED}
            strokeWidth={2}
          />
          <motion.circle
            cx={12}
            cy={12}
            r={10}
            fill="none"
            stroke={INDIGO}
            strokeWidth={2}
            strokeDasharray={62.83}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
            animate={{ strokeDashoffset: 62.83 * (1 - progress) }}
            transition={SPRING_GENTLE}
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 1: HOOK — "Who's MORE viral?"
   ═══════════════════════════════════════════════════════════════════════ */

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/RatiosHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /*
   * 0  Title "Who's MORE viral?" fades in
   * 1  Creator A avatar + name slide in
   * 2  Creator A bars grow (2.4M likes, 800K shares)
   * 3  Hold Creator A
   * 4  Creator B avatar + name slide in
   * 5  Creator B bars grow (500K likes, 200K shares)
   * 6  Hold both — "Creator A has way more likes…"
   * 7  Ratio calculation — bars fade
   * 8  Simplified ratios: A=3:1, B=2.5:1
   * 9  "Per share, A gets only slightly more"
   * 10 Creator C appears (1M likes, 250K shares)
   * 11 Creator C ratio: 4:1 — comparison bars
   * 12 "RATIO reveals what raw numbers hide"
   * 13 "But what IS a ratio?"
   */

  useEffect(() => {
    const delays = [
      1500, 1500, 2000, 1500, 1500, 2000, 2000, 2000, 2000, 2000, 2000, 2500,
      3000, 6000,
    ];
    let i = 0;
    function next() {
      if (i >= delays.length) return;
      const d = delays[i] ?? 1000;
      timerRef.current = setTimeout(() => {
        setPhase(i + 1);
        if (i + 1 >= 7) setCanSkip(true);
        i++;
        next();
      }, d);
    }
    next();
    // Failsafe: guarantee Continue button within 4s
    const failsafe = setTimeout(() => setCanSkip(true), 4000);
    return () => { clearTimeout(timerRef.current); clearTimeout(failsafe); };
  }, []);

  const barW = 80;
  const maxBarH = 100;
  const likesA = maxBarH;
  const sharesA = maxBarH * (800 / 2400);
  const likesB = maxBarH * (500 / 2400);
  const sharesB = maxBarH * (200 / 2400);
  const lpsUnit = 40;

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4">
      {/* Title */}
      {phase >= 0 && (
        <motion.h2
          className="text-2xl font-bold text-center"
          style={{ color: TEXT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Who&apos;s MORE viral?
        </motion.h2>
      )}

      {/* Creator comparison area */}
      {phase >= 1 && phase < 7 && (
        <div className="flex gap-8 items-end justify-center">
          {/* Creator A */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING}
          >
            <svg width={48} height={48} viewBox="0 0 48 48">
              <circle
                cx={24}
                cy={24}
                r={22}
                fill={INDIGO}
                stroke="#6366f1"
                strokeWidth={2}
              />
              <text
                x={24}
                y={29}
                textAnchor={"middle" as const}
                fill="#fff"
                fontSize={16}
                fontWeight={700}
              >
                A
              </text>
            </svg>
            <span className="text-xs font-medium" style={{ color: TEXT }}>
              Creator A
            </span>

            {phase >= 2 && (
              <div
                className="flex gap-2 items-end"
                style={{ height: maxBarH + 20 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="rounded-t"
                    style={{ width: barW / 2 - 2, background: PINK }}
                    initial={{ height: 0 }}
                    animate={{ height: likesA }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <span className="text-[10px]" style={{ color: TEXT_SEC }}>
                    2.4M likes
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="rounded-t"
                    style={{ width: barW / 2 - 2, background: BLUE }}
                    initial={{ height: 0 }}
                    animate={{ height: sharesA }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 0.3,
                    }}
                  />
                  <span className="text-[10px]" style={{ color: TEXT_SEC }}>
                    800K shares
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Creator B */}
          {phase >= 4 && (
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={SPRING}
            >
              <svg width={48} height={48} viewBox="0 0 48 48">
                <circle
                  cx={24}
                  cy={24}
                  r={22}
                  fill={VIOLET}
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
                <text
                  x={24}
                  y={29}
                  textAnchor={"middle" as const}
                  fill="#fff"
                  fontSize={16}
                  fontWeight={700}
                >
                  B
                </text>
              </svg>
              <span className="text-xs font-medium" style={{ color: TEXT }}>
                Creator B
              </span>

              {phase >= 5 && (
                <div
                  className="flex gap-2 items-end"
                  style={{ height: maxBarH + 20 }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="rounded-t"
                      style={{ width: barW / 2 - 2, background: PINK }}
                      initial={{ height: 0 }}
                      animate={{ height: likesB }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <span className="text-[10px]" style={{ color: TEXT_SEC }}>
                      500K likes
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="rounded-t"
                      style={{ width: barW / 2 - 2, background: BLUE }}
                      initial={{ height: 0 }}
                      animate={{ height: sharesB }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    />
                    <span className="text-[10px]" style={{ color: TEXT_SEC }}>
                      200K shares
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Narration / phases */}
      <AnimatePresence mode="wait">
        {phase >= 6 && phase < 7 && (
          <motion.p
            key="nar1"
            className="text-sm text-center max-w-xs"
            style={{ color: TEXT_SEC }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Creator A has way more likes. So A is more viral&hellip; right?
          </motion.p>
        )}

        {phase >= 7 && phase < 9 && (
          <motion.div
            key="ratios"
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
          >
            <p className="text-xs text-center" style={{ color: TEXT_SEC }}>
              Likes per share:
            </p>
            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs" style={{ color: TEXT_SEC }}>
                  A
                </span>
                <motion.span
                  className="text-xl font-bold tabular-nums"
                  style={{ color: INDIGO }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={SPRING}
                >
                  3 : 1
                </motion.span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs" style={{ color: TEXT_SEC }}>
                  B
                </span>
                <motion.span
                  className="text-xl font-bold tabular-nums"
                  style={{ color: VIOLET }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...SPRING, delay: 0.3 }}
                >
                  2.5 : 1
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        {phase >= 9 && phase < 10 && (
          <motion.p
            key="nar2"
            className="text-sm text-center max-w-xs"
            style={{ color: TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Per share, A gets only slightly more. The raw numbers were{" "}
            <span style={{ color: RED, fontWeight: 700 }}>misleading</span>!
          </motion.p>
        )}

        {phase >= 10 && phase < 12 && (
          <motion.div
            key="creatorC"
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
          >
            <svg width={48} height={48} viewBox="0 0 48 48">
              <circle
                cx={24}
                cy={24}
                r={22}
                fill={EMERALD}
                stroke="#059669"
                strokeWidth={2}
              />
              <text
                x={24}
                y={29}
                textAnchor={"middle" as const}
                fill="#fff"
                fontSize={16}
                fontWeight={700}
              >
                C
              </text>
            </svg>
            <span className="text-xs" style={{ color: TEXT }}>
              Creator C: 1M likes, 250K shares
            </span>
            <motion.span
              className="text-xl font-bold tabular-nums"
              style={{ color: EMERALD }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={SPRING}
            >
              4 : 1
            </motion.span>
          </motion.div>
        )}

        {phase >= 11 && phase < 13 && (
          <motion.div
            key="compareBars"
            className="flex flex-col gap-2 w-full max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs w-8" style={{ color: TEXT_SEC }}>
                A
              </span>
              <motion.div
                className="h-6 rounded"
                style={{ background: INDIGO }}
                initial={{ width: 0 }}
                animate={{ width: 3 * lpsUnit }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <span
                className="text-xs tabular-nums"
                style={{ color: TEXT_SEC }}
              >
                3
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-8" style={{ color: TEXT_SEC }}>
                B
              </span>
              <motion.div
                className="h-6 rounded"
                style={{ background: VIOLET }}
                initial={{ width: 0 }}
                animate={{ width: 2.5 * lpsUnit }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
              <span
                className="text-xs tabular-nums"
                style={{ color: TEXT_SEC }}
              >
                2.5
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-8" style={{ color: TEXT_SEC }}>
                C
              </span>
              <motion.div
                className="h-6 rounded"
                style={{ background: EMERALD }}
                initial={{ width: 0 }}
                animate={{ width: 4 * lpsUnit }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              />
              <span
                className="text-xs tabular-nums"
                style={{ color: TEXT_SEC }}
              >
                4
              </span>
            </div>
            <p
              className="text-xs text-center mt-1"
              style={{ color: TEXT_SEC }}
            >
              likes per share
            </p>
          </motion.div>
        )}

        {phase >= 12 && phase < 13 && (
          <motion.p
            key="nar3"
            className="text-sm text-center max-w-xs font-semibold"
            style={{ color: TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Creator C is the MOST viral per share.{" "}
            <span style={{ color: AMBER, fontWeight: 700 }}>RATIO</span>{" "}
            reveals what raw numbers hide.
          </motion.p>
        )}

        {phase >= 13 && (
          <motion.p
            key="nar4"
            className="text-sm text-center max-w-xs"
            style={{ color: TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            But what IS a ratio, exactly? And how does it compare to a
            fraction?
          </motion.p>
        )}
      </AnimatePresence>

      {canSkip && (
        <div className="pt-4">
          <ContinueButton onClick={onComplete}>Continue</ContinueButton>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 2: SPATIAL EXPERIENCE — Double number line + grouping
   ═══════════════════════════════════════════════════════════════════════ */

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [blueCount, setBlueCount] = useState(DEFAULT_BLUE);
  const [orangeCount, setOrangeCount] = useState(DEFAULT_ORANGE);
  const [markerPos, setMarkerPos] = useState(1);
  const [interactions, setInteractions] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [annotation, setAnnotation] = useState("");
  const annotationTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const lineLeft = 40;
  const lineRight = 340;
  const lineWidth = lineRight - lineLeft;
  const groupWidth = lineWidth / MAX_GROUPS;

  const topVal = swapped ? orangeCount : blueCount;
  const botVal = swapped ? blueCount : orangeCount;
  const topColor = swapped ? ORANGE : BLUE;
  const botColor = swapped ? BLUE : ORANGE;
  const topLabel = swapped ? "Orange" : "Blue";
  const botLabel = swapped ? "Blue" : "Orange";

  const showAnnotation = useCallback((msg: string) => {
    clearTimeout(annotationTimer.current);
    setAnnotation(msg);
    annotationTimer.current = setTimeout(() => setAnnotation(""), 3000);
  }, []);

  const incInteractions = useCallback(() => {
    setInteractions((c) => c + 1);
  }, []);

  const handleAddBlue = useCallback(() => {
    if (blueCount >= MAX_TOKENS) return;
    setBlueCount((c) => c + 1);
    incInteractions();
    if (blueCount + 1 === orangeCount) {
      showAnnotation("Equal amounts! The ratio simplifies to 1 : 1.");
    }
  }, [blueCount, orangeCount, incInteractions, showAnnotation]);

  const handleRemoveBlue = useCallback(() => {
    if (blueCount <= 0) return;
    setBlueCount((c) => c - 1);
    incInteractions();
    if (blueCount - 1 === 0 && orangeCount > 0) {
      showAnnotation("With zero of one type, there is nothing to compare!");
    }
  }, [blueCount, orangeCount, incInteractions, showAnnotation]);

  const handleAddOrange = useCallback(() => {
    if (orangeCount >= MAX_TOKENS) return;
    setOrangeCount((c) => c + 1);
    incInteractions();
    if (orangeCount + 1 === blueCount) {
      showAnnotation("Equal amounts! The ratio simplifies to 1 : 1.");
    }
  }, [orangeCount, blueCount, incInteractions, showAnnotation]);

  const handleRemoveOrange = useCallback(() => {
    if (orangeCount <= 0) return;
    setOrangeCount((c) => c - 1);
    incInteractions();
    if (orangeCount - 1 === 0 && blueCount > 0) {
      showAnnotation("With zero of one type, there is nothing to compare!");
    }
  }, [orangeCount, blueCount, incInteractions, showAnnotation]);

  const handleSwap = useCallback(() => {
    setSwapped((s) => !s);
    incInteractions();
    showAnnotation(
      swapped
        ? "Back to original order."
        : "The ratio flipped! Order matters in a ratio.",
    );
  }, [swapped, incInteractions, showAnnotation]);

  const handleToggleTable = useCallback(() => {
    setShowTable((s) => !s);
    if (!showTable) incInteractions();
  }, [showTable, incInteractions]);

  const handleColumnTap = useCallback(
    (col: number) => {
      setMarkerPos(col);
      incInteractions();
    },
    [incInteractions],
  );

  /* Marker drag with @use-gesture/react */
  const svgRef = useRef<SVGSVGElement>(null);
  const markerBind = useDrag(
    ({ movement: [mx], memo, first, event }) => {
      if (first && svgRef.current) {
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        if (event && "clientX" in event) {
          pt.x = (event as PointerEvent).clientX;
          const ctm = svg.getScreenCTM();
          if (ctm) {
            const transformed = pt.matrixTransform(ctm.inverse());
            return transformed.x;
          }
        }
        return lineLeft + markerPos * groupWidth;
      }
      const startX =
        (memo as number | undefined) ?? lineLeft + markerPos * groupWidth;
      const newX = clamp(startX + mx, lineLeft, lineRight);
      const snappedGroup = Math.round((newX - lineLeft) / groupWidth);
      const clampedGroup = clamp(snappedGroup, 0, MAX_GROUPS);
      if (clampedGroup !== markerPos) {
        setMarkerPos(clampedGroup);
        incInteractions();
      }
      return startX;
    },
    { filterTaps: true },
  );

  const markerX = lineLeft + markerPos * groupWidth;
  const progress = Math.min(interactions / MIN_INTERACTIONS, 1);

  return (
    <div className="flex flex-col items-center flex-1 gap-4 p-4 overflow-y-auto">
      <p className="text-sm text-center max-w-sm" style={{ color: TEXT_SEC }}>
        Make a group of blue circles and orange circles. Watch how the double
        number line tracks their relationship.
      </p>

      {/* ── Grouping workspace ──────────────────────────── */}
      <div
        className="w-full max-w-md rounded-xl p-4 flex flex-col gap-3"
        style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}
      >
        {/* Blue row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium w-12" style={{ color: BLUE }}>
            Blue:
          </span>
          <div className="flex gap-1 flex-wrap items-center">
            {Array.from({ length: blueCount }, (_, i) => (
              <motion.div
                key={`blue-${i}`}
                className="rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: BLUE,
                  border: "1.5px solid #3b82f6",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={SPRING_POP}
              />
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            <motion.button
              className="flex items-center justify-center rounded-lg font-bold select-none"
              style={{
                minWidth: 44,
                minHeight: 44,
                background: UNSHADED,
                color: TEXT,
                opacity: blueCount >= MAX_TOKENS ? 0.3 : 1,
              }}
              onClick={handleAddBlue}
              whileTap={blueCount < MAX_TOKENS ? { scale: 0.9 } : undefined}
              aria-label="Add one blue circle"
              aria-disabled={blueCount >= MAX_TOKENS}
            >
              +
            </motion.button>
            <motion.button
              className="flex items-center justify-center rounded-lg font-bold select-none"
              style={{
                minWidth: 44,
                minHeight: 44,
                background: UNSHADED,
                color: TEXT,
                opacity: blueCount <= 0 ? 0.3 : 1,
              }}
              onClick={handleRemoveBlue}
              whileTap={blueCount > 0 ? { scale: 0.9 } : undefined}
              aria-label="Remove one blue circle"
              aria-disabled={blueCount <= 0}
            >
              &minus;
            </motion.button>
          </div>
        </div>

        {/* Orange row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-medium w-12"
            style={{ color: ORANGE }}
          >
            Orange:
          </span>
          <div className="flex gap-1 flex-wrap items-center">
            {Array.from({ length: orangeCount }, (_, i) => (
              <motion.div
                key={`orange-${i}`}
                className="rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: ORANGE,
                  border: "1.5px solid #f97316",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={SPRING_POP}
              />
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            <motion.button
              className="flex items-center justify-center rounded-lg font-bold select-none"
              style={{
                minWidth: 44,
                minHeight: 44,
                background: UNSHADED,
                color: TEXT,
                opacity: orangeCount >= MAX_TOKENS ? 0.3 : 1,
              }}
              onClick={handleAddOrange}
              whileTap={
                orangeCount < MAX_TOKENS ? { scale: 0.9 } : undefined
              }
              aria-label="Add one orange circle"
              aria-disabled={orangeCount >= MAX_TOKENS}
            >
              +
            </motion.button>
            <motion.button
              className="flex items-center justify-center rounded-lg font-bold select-none"
              style={{
                minWidth: 44,
                minHeight: 44,
                background: UNSHADED,
                color: TEXT,
                opacity: orangeCount <= 0 ? 0.3 : 1,
              }}
              onClick={handleRemoveOrange}
              whileTap={orangeCount > 0 ? { scale: 0.9 } : undefined}
              aria-label="Remove one orange circle"
              aria-disabled={orangeCount <= 0}
            >
              &minus;
            </motion.button>
          </div>
        </div>

        {/* Ratio display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${topVal}-${botVal}`}
            className="text-center text-xl font-bold tabular-nums"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="status"
            aria-live="polite"
            aria-label={`Current ratio: ${topVal} to ${botVal}`}
          >
            <span style={{ color: topColor }}>{topVal}</span>
            <span style={{ color: AMBER }}>{" : "}</span>
            <span style={{ color: botColor }}>{botVal}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Double Number Line ──────────────────────────── */}
      <div
        className="w-full max-w-md rounded-xl p-3"
        style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}
      >
        <svg
          ref={svgRef}
          width="100%"
          viewBox="0 0 380 140"
          role="application"
          aria-label={`Double number line comparing ${topLabel} and ${botLabel}`}
          style={{ touchAction: "none" }}
        >
          {/* Top line */}
          <line
            x1={lineLeft}
            y1={40}
            x2={lineRight}
            y2={40}
            stroke={topColor}
            strokeWidth={2.5}
          />
          <text
            x={16}
            y={44}
            textAnchor={"end" as const}
            fill={topColor}
            fontSize={11}
          >
            {topLabel.slice(0, 3)}
          </text>

          {/* Bottom line */}
          <line
            x1={lineLeft}
            y1={100}
            x2={lineRight}
            y2={100}
            stroke={botColor}
            strokeWidth={2.5}
          />
          <text
            x={16}
            y={104}
            textAnchor={"end" as const}
            fill={botColor}
            fontSize={11}
          >
            {botLabel.slice(0, 3)}
          </text>

          {/* Tick marks + labels */}
          {Array.from({ length: MAX_GROUPS + 1 }, (_, k) => {
            const tx = lineLeft + k * groupWidth;
            const topTick = topVal * k;
            const botTick = botVal * k;
            return (
              <g key={`tick-${k}`}>
                <line
                  x1={tx}
                  y1={32}
                  x2={tx}
                  y2={48}
                  stroke={topColor}
                  strokeWidth={1.5}
                />
                <text
                  x={tx}
                  y={28}
                  textAnchor={"middle" as const}
                  fill={topColor}
                  fontSize={10}
                  className="tabular-nums"
                >
                  {topTick}
                </text>
                <line
                  x1={tx}
                  y1={92}
                  x2={tx}
                  y2={108}
                  stroke={botColor}
                  strokeWidth={1.5}
                />
                <text
                  x={tx}
                  y={120}
                  textAnchor={"middle" as const}
                  fill={botColor}
                  fontSize={10}
                  className="tabular-nums"
                >
                  {botTick}
                </text>
                <line
                  x1={tx}
                  y1={48}
                  x2={tx}
                  y2={92}
                  stroke={AMBER}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.2}
                />
              </g>
            );
          })}

          {/* Draggable ratio marker */}
          <g
            {...(markerBind() as Record<string, unknown>)}
            style={{ cursor: "grab", touchAction: "none" }}
          >
            <rect
              x={markerX - 22}
              y={25}
              width={44}
              height={90}
              fill="transparent"
              role="slider"
              aria-label="Ratio marker"
              aria-valuemin={0}
              aria-valuemax={MAX_GROUPS}
              aria-valuenow={markerPos}
              aria-valuetext={`${topLabel}: ${topVal * markerPos}, ${botLabel}: ${botVal * markerPos}`}
              tabIndex={0}
            />
            <motion.rect
              x={markerX - 1.5}
              y={25}
              width={3}
              height={90}
              rx={1.5}
              fill={AMBER}
              opacity={0.8}
              transition={SPRING}
            />
            <text
              x={markerX}
              y={72}
              textAnchor={"middle" as const}
              fill={AMBER}
              fontSize={11}
              fontWeight={700}
            >
              {`${topVal * markerPos}:${botVal * markerPos}`}
            </text>
          </g>
        </svg>
      </div>

      {/* Annotation */}
      <AnimatePresence>
        {annotation && (
          <motion.p
            className="text-xs text-center max-w-xs"
            style={{ color: AMBER }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {annotation}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <motion.button
          className="px-4 py-2 rounded-lg text-sm font-medium border select-none"
          style={{
            minHeight: 44,
            borderColor: INDIGO,
            color: INDIGO,
            background: "transparent",
          }}
          onClick={handleToggleTable}
          whileTap={{ scale: 0.95 }}
          aria-label={showTable ? "Hide ratio table" : "Show ratio table"}
        >
          {showTable ? "Hide Ratio Table" : "Show Ratio Table"}
        </motion.button>
        <motion.button
          className="px-4 py-2 rounded-lg text-sm font-medium border select-none"
          style={{
            minHeight: 44,
            borderColor: INDIGO,
            color: INDIGO,
            background: "transparent",
          }}
          onClick={handleSwap}
          whileTap={{ scale: 0.95 }}
          aria-label="Swap order"
        >
          Swap Order
        </motion.button>
      </div>

      {/* Ratio table */}
      <AnimatePresence>
        {showTable && (
          <motion.div
            className="w-full max-w-md overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={SPRING}
          >
            <table
              className="w-full text-sm tabular-nums"
              role="grid"
              aria-label={`Ratio table for ${topVal} to ${botVal}`}
            >
              <tbody>
                <tr>
                  <td
                    className="px-2 py-2 font-medium sticky left-0"
                    style={{
                      background: SURFACE,
                      color: topColor,
                      minHeight: 44,
                    }}
                  >
                    {topLabel}
                  </td>
                  {Array.from({ length: MAX_GROUPS + 1 }, (_, k) => (
                    <motion.td
                      key={`tA-${k}`}
                      className="px-2 py-2 text-center cursor-pointer"
                      style={{
                        color: TEXT,
                        background:
                          k === markerPos ? `${AMBER}22` : "transparent",
                        borderLeft:
                          k === markerPos
                            ? `2px solid ${AMBER}`
                            : "1px solid transparent",
                        borderRight:
                          k === markerPos
                            ? `2px solid ${AMBER}`
                            : "1px solid transparent",
                        minHeight: 44,
                      }}
                      onClick={() => handleColumnTap(k)}
                      role="gridcell"
                      tabIndex={0}
                      aria-label={`${topLabel} value: ${topVal * k}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: k * 0.05, ...SPRING_GENTLE }}
                    >
                      {topVal * k}
                    </motion.td>
                  ))}
                </tr>
                <tr>
                  <td
                    className="px-2 py-2 font-medium sticky left-0"
                    style={{
                      background: SURFACE,
                      color: botColor,
                      minHeight: 44,
                    }}
                  >
                    {botLabel}
                  </td>
                  {Array.from({ length: MAX_GROUPS + 1 }, (_, k) => (
                    <motion.td
                      key={`tB-${k}`}
                      className="px-2 py-2 text-center cursor-pointer"
                      style={{
                        color: TEXT,
                        background:
                          k === markerPos ? `${AMBER}22` : "transparent",
                        borderLeft:
                          k === markerPos
                            ? `2px solid ${AMBER}`
                            : "1px solid transparent",
                        borderRight:
                          k === markerPos
                            ? `2px solid ${AMBER}`
                            : "1px solid transparent",
                        minHeight: 44,
                      }}
                      onClick={() => handleColumnTap(k)}
                      role="gridcell"
                      tabIndex={0}
                      aria-label={`${botLabel} value: ${botVal * k}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: k * 0.05, ...SPRING_GENTLE }}
                    >
                      {botVal * k}
                    </motion.td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button with progress ring */}
      <div className="pt-4">
        <ContinueButton
          onClick={onComplete}
          disabled={interactions < MIN_INTERACTIONS}
          progress={progress}
        >
          Continue to Discovery
        </ContinueButton>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 3: GUIDED DISCOVERY — 5 prompts
   ═══════════════════════════════════════════════════════════════════════ */

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [prompt, setPrompt] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setShowHint(false);
    const delay = prompt === 2 ? 10000 : 15000;
    hintTimerRef.current = setTimeout(() => setShowHint(true), delay);
    return () => clearTimeout(hintTimerRef.current);
  }, [prompt]);

  const prompts = useMemo(
    () => [
      {
        title: "Discover \"For Every\" Language",
        text: "Imagine 2 blue circles and 3 orange circles on a double number line. At position 1 you see 2 and 3. At position 2, you see 4 and 6. What happens to both numbers as you move the marker right?",
        insight:
          "The ratio relationship is preserved as you scale up. \"For every 2 blue, there are 3 orange\" stays true at any position!",
        ack: "I see it!",
      },
      {
        title: "Order Matters",
        text: "The ratio of blue to orange is 2:3. What if we swap it? Think about what 3:2 would mean compared to 2:3.",
        insight:
          "2:3 and 3:2 are different ratios. \"2 blue for every 3 orange\" is NOT the same as \"3 blue for every 2 orange.\" The first number always refers to the first quantity named.",
        ack: "I see it!",
      },
      {
        title: "Ratio vs Fraction",
        text: "You have 3 blue and 5 orange circles. Someone says \"the ratio 3:5 means 3/5 of the circles are blue.\" Count the total circles. Is that right?",
        insight:
          "3 + 5 = 8 total circles. 3 out of 8 are blue = 3/8, NOT 3/5. The ratio 3:5 compares BLUE to ORANGE (two groups). The fraction 3/8 compares BLUE to ALL (part of the whole).",
        ack: "Got it!",
      },
      {
        title: "Equivalent Ratios: Multiply, Don\u2019t Add",
        text: "A friend says: \"To get an equivalent ratio to 2:5, add 1 to each: 3:6.\" The multiples of 2:5 are (4,10), (6,15), (8,20). Is 3:6 among them? What about 4:10?",
        insight:
          "3:6 is NOT equivalent to 2:5. Adding 1 to each breaks the pattern! 4:10 IS equivalent \u2014 we MULTIPLIED both by 2.",
        ack: "Got it!",
      },
      {
        title: "Pattern in the Ratio Table",
        text: "Look at a ratio table for 2:5 \u2014 (2,5), (4,10), (6,15), (8,20), (10,25). What do you multiply each number by to get from one column to the next?",
        insight:
          "To get equivalent ratios, multiply BOTH numbers by the SAME amount. Column k = (2k, 5k). Just like equivalent fractions!",
        ack: "Got it!",
      },
    ],
    [],
  );

  const currentPrompt = prompts[prompt]!;
  const isLast = prompt === prompts.length - 1;

  const handleAck = useCallback(() => {
    clearTimeout(hintTimerRef.current);
    if (isLast) {
      onComplete();
    } else {
      setPrompt((p) => p + 1);
    }
  }, [isLast, onComplete]);

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Guided Discovery
      </h2>

      <div className="flex gap-1.5">
        {prompts.map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background:
                i < prompt ? EMERALD : i === prompt ? INDIGO : UNSHADED,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={prompt}
          className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4"
          style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={EASE}
        >
          <h3 className="text-base font-bold" style={{ color: AMBER }}>
            {currentPrompt.title}
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
            {currentPrompt.text}
          </p>

          {showHint && (
            <motion.div
              className="rounded-lg p-3 text-sm leading-relaxed"
              style={{
                background: `${BG}cc`,
                borderLeft: `3px solid ${EMERALD}`,
                color: TEXT,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING_GENTLE}
            >
              {currentPrompt.insight}
            </motion.div>
          )}

          <div className="flex gap-3 justify-center pt-2">
            {!showHint && (
              <ContinueButton onClick={() => setShowHint(true)}>
                Show me
              </ContinueButton>
            )}
            {showHint && (
              <ContinueButton onClick={handleAck}>
                {currentPrompt.ack}
              </ContinueButton>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 4: SYMBOL BRIDGE
   ═══════════════════════════════════════════════════════════════════════ */

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const delays = [2000, 2000, 2000, 3000, 3000];
    let i = 0;
    function next() {
      if (i >= delays.length) return;
      const d = delays[i] ?? 2000;
      timerRef.current = setTimeout(() => {
        setStep(i + 1);
        i++;
        next();
      }, d);
    }
    next();
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Symbol Bridge
      </h2>

      <div
        className="w-full max-w-md rounded-xl p-5 flex flex-col gap-5"
        style={{ background: SURFACE, border: `1px solid ${UNSHADED}` }}
      >
        <p className="text-sm text-center" style={{ color: TEXT_SEC }}>
          Three ways to write the same ratio (blue = 3, orange = 5):
        </p>

        {/* Step 1: Colon */}
        {step >= 0 && (
          <motion.div
            className="text-center text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_GENTLE}
          >
            <span style={{ color: BLUE }}>3</span>
            <motion.span
              style={{ color: AMBER }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {" : "}
            </motion.span>
            <span style={{ color: ORANGE }}>5</span>
          </motion.div>
        )}

        {/* Step 2: "to" */}
        {step >= 1 && (
          <motion.div
            className="text-center text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_GENTLE}
          >
            <span style={{ color: BLUE }}>3</span>
            <span style={{ color: TEXT }}>{" to "}</span>
            <span style={{ color: ORANGE }}>5</span>
          </motion.div>
        )}

        {/* Step 3: Fraction notation */}
        {step >= 2 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_GENTLE}
          >
            <div className="inline-flex flex-col items-center gap-0">
              <span className="text-xl font-bold" style={{ color: BLUE }}>
                3
              </span>
              <div
                className="w-8 h-0.5"
                style={{ background: TEXT_SEC }}
              />
              <span className="text-xl font-bold" style={{ color: ORANGE }}>
                5
              </span>
            </div>
          </motion.div>
        )}

        {/* Step 4: Distinction */}
        {step >= 3 && (
          <motion.div
            className="flex gap-3 items-center justify-center text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_GENTLE}
          >
            <div
              className="rounded-lg p-3 text-center"
              style={{ background: BG, flex: 1 }}
            >
              <p className="font-bold" style={{ color: BLUE }}>
                Ratio 3:5
              </p>
              <p className="text-xs mt-1" style={{ color: TEXT_SEC }}>
                Compares two groups
              </p>
              <div className="flex gap-2 justify-center mt-2">
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`rb-${i}`}
                      className="w-3 h-3 rounded-full"
                      style={{ background: BLUE }}
                    />
                  ))}
                </div>
                <span style={{ color: BORDER }}>|</span>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={`ro-${i}`}
                      className="w-3 h-3 rounded-full"
                      style={{ background: ORANGE }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <span className="text-xl font-bold" style={{ color: RED }}>
              {"\u2260"}
            </span>

            <div
              className="rounded-lg p-3 text-center"
              style={{ background: BG, flex: 1 }}
            >
              <p className="font-bold" style={{ color: EMERALD }}>
                Fraction 3/8
              </p>
              <p className="text-xs mt-1" style={{ color: TEXT_SEC }}>
                Part of a whole
              </p>
              <div className="flex justify-center mt-2">
                <div className="flex">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={`fb-${i}`}
                      className="w-3 h-3"
                      style={{
                        background: i < 3 ? BLUE : `${ORANGE}44`,
                        borderRight:
                          i < 7 ? `1px solid ${BORDER}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Equivalent ratios */}
        {step >= 4 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_GENTLE}
          >
            <p className="text-sm mb-2" style={{ color: TEXT_SEC }}>
              Equivalent ratios:
            </p>
            <div className="flex gap-3 justify-center items-center text-lg font-bold tabular-nums">
              <span>
                <span style={{ color: BLUE }}>3</span>
                <span style={{ color: AMBER }}>:</span>
                <span style={{ color: ORANGE }}>5</span>
              </span>
              <span style={{ color: TEXT_SEC }}>=</span>
              <span>
                <span style={{ color: BLUE }}>6</span>
                <span style={{ color: AMBER }}>:</span>
                <span style={{ color: ORANGE }}>10</span>
              </span>
              <span style={{ color: TEXT_SEC }}>=</span>
              <span>
                <span style={{ color: BLUE }}>9</span>
                <span style={{ color: AMBER }}>:</span>
                <span style={{ color: ORANGE }}>15</span>
              </span>
            </div>
            <div className="flex gap-3 justify-center mt-1 text-xs">
              <span style={{ color: EMERALD }}>{"  "}</span>
              <span style={{ color: EMERALD }}>{"\u00D72"}</span>
              <span style={{ color: EMERALD }}>{"\u00D73"}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary card */}
      {step >= 4 && (
        <motion.div
          className="w-full max-w-md rounded-xl p-5 text-sm"
          style={{
            background: SURFACE,
            border: `1px solid ${UNSHADED}`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, ...SPRING_GENTLE }}
        >
          <p className="font-bold mb-2" style={{ color: TEXT }}>
            Three ways to write the same ratio:
          </p>
          <p className="tabular-nums mb-3" style={{ color: TEXT_SEC }}>
            {"  "}3 : 5{"    "}&quot;3 to 5&quot;{"    "}3/5
          </p>
          <p className="font-bold mb-1" style={{ color: TEXT }}>
            Equivalent ratios:
          </p>
          <p className="tabular-nums mb-3" style={{ color: TEXT_SEC }}>
            3:5 = 6:10 = 9:15 = 12:20 = ...
          </p>
          <p className="text-xs" style={{ color: TEXT_SEC }}>
            (multiply BOTH parts by the same number)
          </p>
          <p className="mt-3 font-semibold" style={{ color: AMBER }}>
            {"Ratio \u2260 Fraction of the whole"}
          </p>
          <p className="text-xs" style={{ color: TEXT_SEC }}>
            3:5 means &quot;3 compared to 5&quot; &mdash; NOT &quot;3 out of 5
            total&quot;
          </p>
        </motion.div>
      )}

      {step >= 4 && (
        <div className="pt-2">
          <ContinueButton onClick={onComplete}>Continue</ContinueButton>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 5: REAL-WORLD ANCHOR — 4 scenario cards
   ═══════════════════════════════════════════════════════════════════════ */

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [card, setCard] = useState(0);

  const scenarios = useMemo(
    () => [
      {
        title: "Recipes",
        body: "A smoothie recipe uses 2 cups of fruit for every 1 cup of yogurt. Want to make it for 4 friends? Use 8 cups of fruit and 4 cups of yogurt.",
        ratio: ["2 : 1", "=", "8 : 4"],
        icon: "M",
      },
      {
        title: "Gaming",
        body: "In Minecraft, you need 3 iron and 2 sticks to make a pickaxe. For 5 pickaxes, you need 15 iron and 10 sticks.",
        ratio: ["3 : 2", "=", "15 : 10"],
        icon: "G",
      },
      {
        title: "Sports",
        body: "A basketball player makes 7 shots for every 10 attempts. In 50 attempts, they\u2019d make about 35 shots.",
        ratio: ["7 : 10", "=", "35 : 50"],
        icon: "S",
      },
      {
        title: "Social Media",
        body: "Your video gets 4 comments for every 100 views. That\u2019s a 4:100 ratio (or simplified, 1:25). A friend\u2019s video gets 3:50. Who has more engagement per view?",
        ratio: ["4 : 100", "=", "1 : 25"],
        icon: "P",
      },
    ],
    [],
  );

  const currentCard = scenarios[card]!;
  const cardCount = scenarios.length;

  const swipeBind = useDrag(
    ({ direction: [dx], velocity: [vx], cancel }) => {
      if (Math.abs(vx) > 0.5) {
        const newIdx = clamp(card + (dx > 0 ? -1 : 1), 0, cardCount - 1);
        setCard(newIdx);
        cancel();
      }
    },
    { axis: "x", filterTaps: true },
  );

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Real-World Ratios
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={card}
          className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4"
          style={{
            background: SURFACE,
            border: `1px solid ${UNSHADED}`,
            touchAction: "pan-y",
          }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={EASE}
          {...(swipeBind() as Record<string, unknown>)}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
              style={{ background: `${INDIGO}33`, color: INDIGO }}
            >
              {currentCard.icon}
            </div>
            <h3 className="text-base font-bold" style={{ color: TEXT }}>
              {currentCard.title}
            </h3>
          </div>

          <p
            className="text-sm leading-relaxed"
            style={{ color: TEXT_SEC, lineHeight: 1.6 }}
          >
            {currentCard.body}
          </p>

          <div
            className="rounded-lg p-3 text-center text-lg font-bold tabular-nums"
            style={{ background: BG, border: `1px solid ${AMBER}` }}
          >
            {currentCard.ratio.map((part, i) => (
              <span
                key={i}
                style={{
                  color: part === "=" ? AMBER : i === 0 ? BLUE : ORANGE,
                }}
              >
                {part}{" "}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center gap-4">
        <motion.button
          className="flex items-center justify-center rounded-lg font-bold select-none"
          style={{
            minWidth: 44,
            minHeight: 44,
            background: card > 0 ? UNSHADED : "transparent",
            color: card > 0 ? TEXT : BORDER,
          }}
          onClick={() => card > 0 && setCard(card - 1)}
          whileTap={card > 0 ? { scale: 0.95 } : undefined}
          aria-label="Previous scenario"
          aria-disabled={card <= 0}
        >
          {"\u2190"}
        </motion.button>

        <div className="flex gap-1.5">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: i === card ? INDIGO : UNSHADED }}
            />
          ))}
        </div>

        <motion.button
          className="flex items-center justify-center rounded-lg font-bold select-none"
          style={{
            minWidth: 44,
            minHeight: 44,
            background: card < cardCount - 1 ? UNSHADED : "transparent",
            color: card < cardCount - 1 ? TEXT : BORDER,
          }}
          onClick={() => card < cardCount - 1 && setCard(card + 1)}
          whileTap={card < cardCount - 1 ? { scale: 0.95 } : undefined}
          aria-label="Next scenario"
          aria-disabled={card >= cardCount - 1}
        >
          {"\u2192"}
        </motion.button>
      </div>

      <div className="pt-2">
        <ContinueButton onClick={onComplete}>Continue</ContinueButton>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 6: PRACTICE — 9 problems, NO auto-advance
   ═══════════════════════════════════════════════════════════════════════ */

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [pi, setPi] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [multiSelect, setMultiSelect] = useState<Set<string>>(new Set());
  const [numericAnswer, setNumericAnswer] = useState("");
  const [tableInputs, setTableInputs] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [ok, setOk] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const prob = PROBLEMS[pi]!;
  const last = pi === PROBLEMS.length - 1;

  const handleSubmit = useCallback(() => {
    let correct = false;

    if (prob.type === "multiple-choice") {
      if (choice === null) return;
      correct =
        prob.options?.find((o) => o.id === choice)?.correct ?? false;
    } else if (prob.type === "multi-select") {
      if (multiSelect.size === 0) return;
      const correctIds = new Set(
        (prob.options ?? []).filter((o) => o.correct).map((o) => o.id),
      );
      const wrongIds = new Set(
        (prob.options ?? []).filter((o) => !o.correct).map((o) => o.id),
      );
      const selectedCorrectAll = [...correctIds].every((id) =>
        multiSelect.has(id),
      );
      const selectedNoWrong = [...multiSelect].every(
        (id) => !wrongIds.has(id),
      );
      correct = selectedCorrectAll && selectedNoWrong;
    } else if (prob.type === "numeric-input") {
      const val = parseInt(numericAnswer, 10);
      correct = val === prob.correctAnswer;
    } else if (prob.type === "ratio-table") {
      if (!prob.tableData) return;
      correct = prob.tableData.correctAnswers.every((ca) => {
        const key = `${ca.row}-${ca.column}`;
        const input = tableInputs[key];
        return input !== undefined && parseInt(input, 10) === ca.value;
      });
    }

    setOk(correct);
    setSubmitted(true);
    setResults((r) => [...r, correct]);
  }, [choice, multiSelect, numericAnswer, tableInputs, prob]);

  const handleNext = useCallback(() => {
    if (last) {
      onComplete();
      return;
    }
    setPi((i) => i + 1);
    setChoice(null);
    setMultiSelect(new Set());
    setNumericAnswer("");
    setTableInputs({});
    setSubmitted(false);
    setOk(false);
  }, [last, onComplete]);

  const feedbackText = useMemo((): string => {
    if (!submitted) return "";
    if (ok) return prob.feedback["correct"] ?? "";
    if (prob.type === "multiple-choice" && choice !== null) {
      return (
        prob.feedback[choice] ??
        prob.feedback["incorrect"] ??
        prob.feedback["correct"] ??
        ""
      );
    }
    return prob.feedback["incorrect"] ?? prob.feedback["correct"] ?? "";
  }, [submitted, choice, ok, prob]);

  const handleMultiToggle = useCallback((id: string) => {
    setMultiSelect((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const canSubmit = useMemo((): boolean => {
    if (prob.type === "multiple-choice") return choice !== null;
    if (prob.type === "multi-select") return multiSelect.size > 0;
    if (prob.type === "numeric-input")
      return numericAnswer.trim().length > 0;
    if (prob.type === "ratio-table" && prob.tableData) {
      return prob.tableData.correctAnswers.every((ca) => {
        const key = `${ca.row}-${ca.column}`;
        return (tableInputs[key] ?? "").trim().length > 0;
      });
    }
    return false;
  }, [prob, choice, multiSelect, numericAnswer, tableInputs]);

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Practice
      </h2>

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {PROBLEMS.map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background:
                i < results.length
                  ? (results[i] ?? false)
                    ? EMERALD
                    : RED
                  : i === pi
                    ? INDIGO
                    : UNSHADED,
            }}
          />
        ))}
      </div>

      {/* Layer badge */}
      <span
        className="text-xs px-2 py-1 rounded-full"
        style={{
          background: UNSHADED,
          color:
            prob.layer === "recall"
              ? BLUE
              : prob.layer === "procedure"
                ? AMBER
                : PURPLE,
        }}
      >
        {prob.layer === "recall"
          ? "Recall"
          : prob.layer === "procedure"
            ? "Procedure"
            : "Understanding"}
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={pi}
          className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4"
          style={{
            background: SURFACE,
            border: `1px solid ${UNSHADED}`,
          }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={SPRING_GENTLE}
        >
          <p className="text-base leading-relaxed" style={{ color: TEXT }}>
            {prob.stem}
          </p>

          {/* ── MC / Multi-select ──────────────────────── */}
          {(prob.type === "multiple-choice" ||
            prob.type === "multi-select") &&
            prob.options && (
              <div className="flex flex-col gap-2">
                {prob.options.map((o) => {
                  const isMulti = prob.type === "multi-select";
                  const isSelected = isMulti
                    ? multiSelect.has(o.id)
                    : choice === o.id;
                  const showCorrect = submitted && o.correct;
                  const showWrong =
                    submitted && isSelected && !o.correct;

                  return (
                    <motion.button
                      key={o.id}
                      className="text-left px-4 py-3 rounded-lg text-sm border transition-colors flex items-center gap-2"
                      style={{
                        minHeight: 44,
                        background: showCorrect
                          ? `${EMERALD}22`
                          : showWrong
                            ? `${RED}22`
                            : isSelected
                              ? `${INDIGO}22`
                              : "transparent",
                        borderColor: showCorrect
                          ? EMERALD
                          : showWrong
                            ? RED
                            : isSelected
                              ? INDIGO
                              : UNSHADED,
                        color: TEXT,
                        cursor: submitted ? "default" : "pointer",
                      }}
                      onClick={() => {
                        if (submitted) return;
                        if (isMulti) {
                          handleMultiToggle(o.id);
                        } else {
                          setChoice(o.id);
                        }
                      }}
                      disabled={submitted}
                      whileTap={
                        !submitted ? { scale: 0.98 } : undefined
                      }
                      aria-label={`Option ${o.id}: ${o.text}`}
                      aria-pressed={isSelected}
                    >
                      {isMulti && (
                        <div
                          className="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center"
                          style={{
                            borderColor: isSelected ? INDIGO : BORDER,
                            background: isSelected
                              ? INDIGO
                              : "transparent",
                          }}
                        >
                          {isSelected && (
                            <span className="text-[10px] text-white">
                              {"\u2713"}
                            </span>
                          )}
                        </div>
                      )}
                      <span>
                        <span
                          className="font-semibold mr-2"
                          style={{ color: TEXT_SEC }}
                        >
                          {o.id.toUpperCase()}.
                        </span>
                        {o.text}
                      </span>
                      {showCorrect && (
                        <span
                          className="ml-auto"
                          style={{ color: EMERALD }}
                        >
                          {"\u2713"}
                        </span>
                      )}
                      {showWrong && (
                        <span className="ml-auto" style={{ color: RED }}>
                          {"\u2717"}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

          {/* ── Numeric input ──────────────────────────── */}
          {prob.type === "numeric-input" && (
            <div className="flex gap-2 items-center justify-center">
              <input
                type="number"
                inputMode="numeric"
                className="w-20 text-center px-3 py-2 rounded-lg text-lg font-bold focus:outline-none"
                style={{
                  minHeight: 48,
                  background: BG,
                  border: `1px solid ${submitted ? (ok ? EMERALD : RED) : BORDER}`,
                  color: TEXT,
                }}
                value={numericAnswer}
                onChange={(e) => setNumericAnswer(e.target.value)}
                disabled={submitted}
                aria-label="Your answer"
              />
            </div>
          )}

          {/* ── Ratio table input ──────────────────────── */}
          {prob.type === "ratio-table" && prob.tableData && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm tabular-nums">
                <thead>
                  <tr>
                    <th
                      className="px-2 py-2 text-left"
                      style={{ color: TEXT_SEC }}
                    >
                      {" "}
                    </th>
                    {prob.tableData.rows.map((_, i) => (
                      <th
                        key={i}
                        className="px-2 py-2 text-center"
                        style={{ color: TEXT_SEC }}
                      >
                        {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="px-2 py-2 font-medium"
                      style={{ color: BLUE }}
                    >
                      {prob.tableData.headerA}
                    </td>
                    {prob.tableData.rows.map((row, i) => {
                      const isInput = row.a === "?";
                      const key = `${i}-a`;
                      const correctVal =
                        prob.tableData!.correctAnswers.find(
                          (ca) => ca.row === i && ca.column === "a",
                        );
                      const inputVal = tableInputs[key] ?? "";
                      const isCorrectCell =
                        submitted &&
                        isInput &&
                        correctVal !== undefined &&
                        parseInt(inputVal, 10) === correctVal.value;
                      const isWrongCell =
                        submitted &&
                        isInput &&
                        correctVal !== undefined &&
                        parseInt(inputVal, 10) !== correctVal.value;

                      return (
                        <td key={key} className="px-1 py-1 text-center">
                          {isInput ? (
                            <input
                              type="number"
                              inputMode="numeric"
                              className="w-14 text-center px-1 py-1 rounded text-sm font-bold focus:outline-none"
                              style={{
                                minHeight: 44,
                                background: BG,
                                border: `1px solid ${isCorrectCell ? EMERALD : isWrongCell ? RED : BORDER}`,
                                color: TEXT,
                              }}
                              value={inputVal}
                              onChange={(e) =>
                                setTableInputs((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              disabled={submitted}
                              aria-label={`${prob.tableData!.headerA} row ${i + 1}`}
                            />
                          ) : (
                            <span style={{ color: TEXT }}>
                              {row.a}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td
                      className="px-2 py-2 font-medium"
                      style={{ color: ORANGE }}
                    >
                      {prob.tableData.headerB}
                    </td>
                    {prob.tableData.rows.map((row, i) => {
                      const isInput = row.b === "?";
                      const key = `${i}-b`;
                      const correctVal =
                        prob.tableData!.correctAnswers.find(
                          (ca) => ca.row === i && ca.column === "b",
                        );
                      const inputVal = tableInputs[key] ?? "";
                      const isCorrectCell =
                        submitted &&
                        isInput &&
                        correctVal !== undefined &&
                        parseInt(inputVal, 10) === correctVal.value;
                      const isWrongCell =
                        submitted &&
                        isInput &&
                        correctVal !== undefined &&
                        parseInt(inputVal, 10) !== correctVal.value;

                      return (
                        <td key={key} className="px-1 py-1 text-center">
                          {isInput ? (
                            <input
                              type="number"
                              inputMode="numeric"
                              className="w-14 text-center px-1 py-1 rounded text-sm font-bold focus:outline-none"
                              style={{
                                minHeight: 44,
                                background: BG,
                                border: `1px solid ${isCorrectCell ? EMERALD : isWrongCell ? RED : BORDER}`,
                                color: TEXT,
                              }}
                              value={inputVal}
                              onChange={(e) =>
                                setTableInputs((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              disabled={submitted}
                              aria-label={`${prob.tableData!.headerB} row ${i + 1}`}
                            />
                          ) : (
                            <span style={{ color: TEXT }}>
                              {row.b}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Feedback — stays until Next tap, NO auto-advance */}
          {submitted && (
            <motion.div
              className="rounded-lg p-3 text-sm leading-relaxed"
              style={{
                background: `${BG}cc`,
                borderLeft: `3px solid ${ok ? EMERALD : AMBER}`,
                color: TEXT,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {feedbackText}
            </motion.div>
          )}

          {/* Action button */}
          <div className="flex justify-center pt-2">
            {!submitted ? (
              <ContinueButton
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                Submit
              </ContinueButton>
            ) : (
              <ContinueButton onClick={handleNext}>
                {last ? "Continue to Reflection" : "Next \u2192"}
              </ContinueButton>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 7: REFLECTION
   ═══════════════════════════════════════════════════════════════════════ */

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const minChars = 30;

  const handleSubmit = useCallback(() => {
    if (text.trim().length < minChars) return;
    const lo = text.toLowerCase();
    let s = 1;
    if (/compar(e|ing|ison)|two\s+(group|quantit)/.test(lo)) s++;
    if (/order\s+matter|first.*second|not\s+the\s+same|differ/.test(lo))
      s++;
    if (/number\s*line|double|spatial|group/.test(lo)) s++;
    if (/equival|multiply|scal/.test(lo)) s++;
    setScore(Math.min(s, 5));
    setSubmitted(true);
  }, [text]);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    setSubmitted(true);
    setScore(0);
  }, []);

  const feedback = useMemo((): string => {
    if (skipped)
      return "No worries \u2014 you can always come back to reflect later!";
    if (score >= 4)
      return "Excellent explanation! You clearly understand that a ratio compares two separate groups while a fraction is part of a whole, and that order matters.";
    if (score >= 3)
      return "Good understanding! You captured the core idea. To make it even stronger, give an example showing how 3:5 and 5:3 lead to different outcomes.";
    if (score >= 2)
      return "Nice start! Explain more about what makes a ratio different from a fraction, and why the order of numbers matters.";
    return "Keep exploring! Think about the blue and orange circles \u2014 what does the ratio tell you compared to the fraction of the whole?";
  }, [score, skipped]);

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Reflection
      </h2>

      <div
        className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4"
        style={{
          background: SURFACE,
          border: `1px solid ${UNSHADED}`,
        }}
      >
        <p
          className="text-base font-medium leading-relaxed"
          style={{ color: TEXT }}
        >
          Explain in your own words: what is the difference between a ratio
          and a fraction? Why does order matter in a ratio?
        </p>

        <textarea
          className="w-full p-3 rounded-lg text-sm resize-y focus:outline-none"
          style={{
            minHeight: 120,
            background: BG,
            border: `1px solid ${submitted ? INDIGO : BORDER}`,
            color: TEXT,
          }}
          placeholder="Think about the blue and orange circles... a ratio compares ___ while a fraction tells you ___. Order matters because..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
          aria-label="Reflection text"
        />

        <div className="flex justify-between items-center">
          <p
            className="text-xs tabular-nums"
            style={{
              color: text.length >= minChars ? EMERALD : TEXT_SEC,
            }}
          >
            {text.length}/{minChars} minimum
          </p>
          {!submitted && (
            <button
              className="text-xs underline"
              style={{
                minHeight: 44,
                color: TEXT_SEC,
                opacity: 0.6,
              }}
              onClick={handleSkip}
              aria-label="Skip reflection"
            >
              Skip
            </button>
          )}
        </div>

        {!submitted ? (
          <ContinueButton
            onClick={handleSubmit}
            disabled={text.trim().length < minChars}
          >
            Submit Reflection
          </ContinueButton>
        ) : (
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!skipped && (
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
                      fill={i < score ? AMBER : UNSHADED}
                      stroke={i < score ? AMBER : BORDER}
                      strokeWidth={1}
                    />
                  </motion.svg>
                ))}
              </div>
            )}

            <div
              className="rounded-lg p-3 text-sm leading-relaxed"
              style={{
                background: `${BG}cc`,
                borderLeft: `3px solid ${EMERALD}`,
                color: TEXT,
              }}
            >
              {feedback}
            </div>

            {!skipped && (
              <motion.p
                className="text-center text-lg font-bold"
                style={{ color: AMBER }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, ...SPRING }}
              >
                +{score * 16} XP
              </motion.p>
            )}

            <ContinueButton onClick={onComplete}>
              Complete Lesson
            </ContinueButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════ */

export function RatiosLesson({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [si, setSi] = useState(0);
  const stage = STAGES[si] ?? "hook";

  const advance = useCallback(() => {
    if (si >= STAGES.length - 1) {
      onComplete?.();
      return;
    }
    setSi((i) => i + 1);
  }, [si, onComplete]);

  const stageView = useMemo((): ReactNode => {
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
  }, [stage, advance]);

  return (
    <div
      className={cn("flex min-h-screen flex-col")}
      style={{ background: BG }}
    >
      {/* Progress nav */}
      <nav
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3"
        style={{ background: SURFACE }}
        aria-label="Lesson progress"
      >
        <span
          className="text-sm font-medium tabular-nums"
          style={{ color: TEXT_SEC }}
        >
          {si + 1}/{STAGES.length}
        </span>
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: UNSHADED }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: INDIGO }}
            animate={{
              width: `${((si + 1) / STAGES.length) * 100}%`,
            }}
            transition={SPRING_GENTLE}
          />
        </div>

        <div className="flex gap-1.5">
          {STAGES.map((s, i) => (
            <div
              key={s}
              className="w-2 h-2 rounded-full"
              style={{
                background:
                  i < si ? EMERALD : i === si ? INDIGO : UNSHADED,
              }}
              aria-label={`Stage ${i + 1}: ${s === "realWorld" ? "real world" : s}${i === si ? " (current)" : ""}`}
            />
          ))}
        </div>

        <span className="text-xs capitalize" style={{ color: TEXT_SEC }}>
          {stage === "realWorld" ? "real world" : stage}
        </span>
      </nav>

      {/* Stage content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={SPRING_GENTLE}
        >
          {stageView}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
