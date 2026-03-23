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

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

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

interface PracticeProblem {
  id: string;
  stem: string;
  layer: 0 | 1 | 2;
  inputType: "multiple-choice" | "tap-to-select-multiple" | "numeric-input";
  options?: Array<{
    id: string;
    text: string;
    correct: boolean;
    crossProducts?: string;
  }>;
  answer?: number;
  feedback: { correct: string; incorrect: string };
  hints?: string[];
}

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const INDIGO = "#818cf8";
const VIOLET = "#a78bfa";
const EMERALD = "#34d399";
const RED = "#f87171";
const AMBER = "#fbbf24";
const BLUE = "#60a5fa";
const TEXT_PRIMARY = "#e2e8f0";
const TEXT_SEC = "#94a3b8";
const TEXT_DIM = "#64748b";
const SURFACE = "#1e293b";
const BG = "#0f172a";
const BORDER_CLR = "#334155";

const SPRING: { type: "spring"; damping: number; stiffness: number } = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};
const SPRING_GENTLE: { type: "spring"; damping: number; stiffness: number } = {
  type: "spring",
  damping: 25,
  stiffness: 200,
};
const EASE: { type: "tween"; duration: number; ease: "easeInOut" } = {
  type: "tween",
  duration: 0.3,
  ease: "easeInOut",
};

const MIN_INTERACTIONS = 10;

const LAYER_COLORS: Record<number, string> = {
  0: INDIGO,
  1: AMBER,
  2: EMERALD,
};
const LAYER_LABELS: Record<number, string> = {
  0: "Recall",
  1: "Procedure",
  2: "Understanding",
};

/* ================================================================== */
/*  Practice Problem Bank                                              */
/* ================================================================== */

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: "R1",
    stem: "Which of the following is a PROPORTION?",
    layer: 0,
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "2:3 = 4:6", correct: true },
      { id: "b", text: "2:3 = 3:4", correct: false },
      { id: "c", text: "2 + 3 = 5", correct: false },
      { id: "d", text: "2:3 > 4:6", correct: false },
    ],
    feedback: {
      correct:
        "Right! 2:3 = 4:6 is a proportion because both ratios are equivalent. Cross products: 2 \u00d7 6 = 12 and 3 \u00d7 4 = 12.",
      incorrect:
        "A proportion is a statement that two RATIOS are equal, like a:b = c:d. Check which pair has equal cross products.",
    },
  },
  {
    id: "R2",
    stem: "Cross multiplication is used to:",
    layer: 0,
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "Add two fractions together", correct: false },
      {
        id: "b",
        text: "Test if two ratios form a proportion",
        correct: true,
      },
      { id: "c", text: "Find the greatest common factor", correct: false },
      { id: "d", text: "Simplify a fraction", correct: false },
    ],
    feedback: {
      correct:
        "Exactly! Cross multiplication tests whether two ratios are equal. If a/b = c/d, then a \u00d7 d = b \u00d7 c.",
      incorrect:
        "Cross multiplication is specifically for testing whether two ratios form a proportion by comparing their cross products.",
    },
  },
  {
    id: "R3",
    stem: "In the proportion 3:7 = 9:21, what is the scale factor?",
    layer: 0,
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "\u00d72", correct: false },
      { id: "b", text: "\u00d73", correct: true },
      { id: "c", text: "\u00d76", correct: false },
      { id: "d", text: "+6", correct: false },
    ],
    feedback: {
      correct:
        "Right! 3 \u00d7 3 = 9 and 7 \u00d7 3 = 21. Both parts multiplied by 3.",
      incorrect:
        "Check: what number do you multiply 3 by to get 9? And does the same multiplier turn 7 into 21?",
    },
  },
  {
    id: "P1",
    stem: "Which of these pairs form a proportion? Tap ALL that apply.",
    layer: 1,
    inputType: "tap-to-select-multiple",
    options: [
      {
        id: "a",
        text: "2/5 = 6/15",
        correct: true,
        crossProducts: "2\u00d715=30, 5\u00d76=30",
      },
      {
        id: "b",
        text: "3/4 = 9/16",
        correct: false,
        crossProducts: "3\u00d716=48, 4\u00d79=36",
      },
      {
        id: "c",
        text: "4/7 = 12/21",
        correct: true,
        crossProducts: "4\u00d721=84, 7\u00d712=84",
      },
      {
        id: "d",
        text: "5/8 = 10/15",
        correct: false,
        crossProducts: "5\u00d715=75, 8\u00d710=80",
      },
    ],
    feedback: {
      correct:
        "You got them all! 2/5 = 6/15 (30=30) and 4/7 = 12/21 (84=84) are proportions.",
      incorrect:
        "Cross multiply each pair: equal cross products means it IS a proportion.",
    },
  },
  {
    id: "P2",
    stem: "Solve the proportion: 5/8 = x/24. What is x?",
    layer: 1,
    inputType: "numeric-input",
    answer: 15,
    hints: [
      "Look at the denominators: 8 and 24. What do you multiply 8 by to get 24?",
      "8 \u00d7 3 = 24, so the scale factor is 3. What is 5 \u00d7 3?",
    ],
    feedback: {
      correct:
        "15 is correct! Scale factor \u00d73: 5 \u00d7 3 = 15. Cross-check: 5 \u00d7 24 = 120 = 8 \u00d7 15.",
      incorrect:
        "The denominator goes from 8 to 24: that is \u00d73. Apply the same factor to the numerator: 5 \u00d7 3 = 15.",
    },
  },
  {
    id: "P3",
    stem: "Solve: 7/4 = 21/x. What is x?",
    layer: 1,
    inputType: "numeric-input",
    answer: 12,
    hints: [
      "Cross multiply: 7 \u00d7 x = 4 \u00d7 21.",
      "7x = 84. Divide both sides by 7.",
    ],
    feedback: {
      correct:
        "12 is right! 7 \u00d7 3 = 21, so 4 \u00d7 3 = 12. Cross-check: 7 \u00d7 12 = 84 = 4 \u00d7 21.",
      incorrect:
        "Cross multiply: 7 \u00d7 x = 4 \u00d7 21 = 84. Then x = 84 / 7 = 12.",
    },
  },
  {
    id: "U1",
    stem: "Jake says: \"The ratio 3:5 is the same as 5:7 because I added 2 to both parts.\" Is Jake correct?",
    layer: 2,
    inputType: "multiple-choice",
    options: [
      {
        id: "a",
        text: "Jake is wrong. Adding does NOT keep ratios equal. Cross products: 3\u00d77=21 but 5\u00d75=25.",
        correct: true,
      },
      {
        id: "b",
        text: "Jake is right. Adding the same number always keeps the ratio.",
        correct: false,
      },
      {
        id: "c",
        text: "Jake is right, but only because both numbers are odd.",
        correct: false,
      },
      {
        id: "d",
        text: "Jake is wrong because you need to subtract, not add.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Exactly! 3/5 = 0.60 but 5/7 = 0.71. Cross products: 21 \u2260 25. To keep a ratio, MULTIPLY both parts.",
      incorrect:
        "Adding the same number changes the ratio. 3:5 = 6:10 = 9:15 (multiply), NOT 5:7 (add 2).",
    },
  },
  {
    id: "U2",
    stem: "Rectangle A is 2:5 and Rectangle B is 6:15. Without computing, which visual test BEST confirms they are proportional?",
    layer: 2,
    inputType: "multiple-choice",
    options: [
      { id: "a", text: "They have the same area", correct: false },
      {
        id: "b",
        text: "One is an exact scaled copy -- same shape, different size",
        correct: true,
      },
      { id: "c", text: "They have the same perimeter", correct: false },
      { id: "d", text: "Their widths are the same", correct: false },
    ],
    feedback: {
      correct:
        "That is the key insight! Proportional rectangles are SCALED COPIES -- same shape, different size. The ratio of width to height is preserved.",
      incorrect:
        "Same area or perimeter does not mean same shape. What matters is the RATIO of width to height being preserved.",
    },
  },
  {
    id: "U3",
    stem: "A car travels 150 km on 10 L of fuel. At the same rate, how many liters for 375 km?",
    layer: 2,
    inputType: "multiple-choice",
    options: [
      {
        id: "a",
        text: "25 liters (150/10 = 375/25, cross products: 3750 = 3750)",
        correct: true,
      },
      { id: "b", text: "37.5 liters (375 / 10)", correct: false },
      { id: "c", text: "235 liters (375 - 150 + 10)", correct: false },
      { id: "d", text: "15 liters (150 / 10)", correct: false },
    ],
    feedback: {
      correct:
        "25 liters! 150/10 = 375/x. Scale factor: 375/150 = 2.5, so 10 \u00d7 2.5 = 25.",
      incorrect:
        "Set up the proportion: 150/10 = 375/x. Cross multiply: 150x = 3750, so x = 25.",
    },
  },
];

/* ================================================================== */
/*  Utility Helpers                                                    */
/* ================================================================== */

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

function crossProductsEqual(
  a: number,
  b: number,
  c: number,
  d: number,
): boolean {
  return a * d === b * c;
}

/* ================================================================== */
/*  Shared Sub-Components                                              */
/* ================================================================== */

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 10,
            height: 10,
            backgroundColor:
              i <= current ? INDIGO : BORDER_CLR,
          }}
          animate={{
            scale: i === current ? 1.25 : 1,
            backgroundColor:
              i < current
                ? EMERALD
                : i === current
                  ? INDIGO
                  : BORDER_CLR,
          }}
          transition={SPRING}
        />
      ))}
    </div>
  );
}

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
      className="relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium select-none"
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
            stroke={BORDER_CLR}
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
            animate={{
              strokeDashoffset: 62.83 * (1 - progress),
            }}
            transition={SPRING_GENTLE}
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}

function Stepper({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={label}
    >
      <motion.button
        className="flex items-center justify-center rounded-lg font-bold select-none"
        style={{
          minWidth: 44,
          minHeight: 44,
          backgroundColor: SURFACE,
          color: TEXT_PRIMARY,
          border: `1px solid ${BORDER_CLR}`,
          cursor: value <= min ? "not-allowed" : "pointer",
          opacity: value <= min ? 0.4 : 1,
        }}
        whileTap={value > min ? { scale: 0.95 } : undefined}
        onClick={() => value > min && onChange(value - 1)}
        aria-label={`Decrease ${label}`}
      >
        {"\u2212"}
      </motion.button>
      <span
        className="flex items-center justify-center text-lg font-bold tabular-nums"
        style={{
          minWidth: 32,
          color: TEXT_PRIMARY,
          textAlign: "center",
        }}
        aria-live="polite"
      >
        {value}
      </span>
      <motion.button
        className="flex items-center justify-center rounded-lg font-bold select-none"
        style={{
          minWidth: 44,
          minHeight: 44,
          backgroundColor: SURFACE,
          color: TEXT_PRIMARY,
          border: `1px solid ${BORDER_CLR}`,
          cursor: value >= max ? "not-allowed" : "pointer",
          opacity: value >= max ? 0.4 : 1,
        }}
        whileTap={value < max ? { scale: 0.95 } : undefined}
        onClick={() => value < max && onChange(value + 1)}
        aria-label={`Increase ${label}`}
      >
        +
      </motion.button>
    </div>
  );
}

/* ================================================================== */
/*  Stage 1: Hook                                                      */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/ProportionsHook.webm" onComplete={onContinue} />;

  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const delays = [
      500, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 4000, 4000,
    ];
    const d = delays[step];
    if (d !== undefined && step < delays.length) {
      timerRef.current = setTimeout(
        () => setStep((s) => s + 1),
        d,
      );
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step]);

  // Failsafe: guarantee Continue button within 4s
  useEffect(() => {
    const failsafe = setTimeout(() => setStep((s) => Math.max(s, 5)), 4000);
    return () => clearTimeout(failsafe);
  }, []);

  const showContinue = step >= 5;

  // SVG dimensions
  const VW = 400;
  const VH = 440;

  // Original rectangle: 2:3 ratio => 80x120
  const origX = 40;
  const origY = 70;
  const origW = 80;
  const origH = 120;

  // Additive rectangle: 3:4 ratio => 120x160
  const addX = 160;
  const addY = 70;
  const addW = 120;
  const addH = 160;

  // Multiplicative rectangle: 4:6 ratio => 160x240
  const mulX = 160;
  const mulY = 70;
  const mulW = 160;
  const mulH = 240;

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-4">
      <motion.h2
        className="mb-2 text-center text-xl font-bold"
        style={{ color: TEXT_PRIMARY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 0 ? 1 : 0 }}
        transition={EASE}
      >
        Enlarging a Photo
      </motion.h2>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        style={{ maxWidth: 400 }}
        role="img"
        aria-label="Photo enlargement comparison: additive vs multiplicative scaling"
      >
        {/* Original rectangle */}
        <motion.rect
          x={origX}
          y={origY}
          width={origW}
          height={origH}
          rx={4}
          fill={INDIGO}
          fillOpacity={0.3}
          stroke={INDIGO}
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            scale: step >= 1 ? 1 : 0.8,
          }}
          transition={SPRING}
        />
        {step >= 1 && (
          <motion.text
            x={origX + origW / 2}
            y={origY + origH + 20}
            textAnchor={"middle" as const}
            fill={INDIGO}
            fontSize={16}
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...EASE, delay: 0.3 }}
          >
            {"2 \u00d7 3"}
          </motion.text>
        )}

        {/* Additive rectangle (shown in steps 3-7) */}
        {step >= 3 && step < 8 && (
          <>
            <motion.rect
              x={addX}
              y={addY}
              width={addW}
              height={addH}
              rx={4}
              fill={RED}
              fillOpacity={0.3}
              stroke={RED}
              strokeWidth={2}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
            />
            <motion.text
              x={addX + addW / 2}
              y={addY + addH + 20}
              textAnchor={"middle" as const}
              fill={RED}
              fontSize={16}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"3 \u00d7 4 (+1)"}
            </motion.text>
          </>
        )}

        {/* Cross-products for additive: unequal */}
        {step >= 4 && step < 8 && (
          <>
            <motion.text
              x={VW / 2}
              y={280}
              textAnchor={"middle" as const}
              fill={RED}
              fontSize={14}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"2\u00d74 = 8  vs  3\u00d73 = 9"}
            </motion.text>
            <motion.text
              x={VW / 2}
              y={300}
              textAnchor={"middle" as const}
              fill={RED}
              fontSize={16}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"8 \u2260 9 \u2014 NOT a proportion!"}
            </motion.text>
          </>
        )}

        {/* Multiplicative rectangle */}
        {step >= 8 && (
          <>
            <motion.rect
              x={mulX}
              y={mulY}
              width={mulW}
              height={mulH}
              rx={4}
              fill={EMERALD}
              fillOpacity={0.3}
              stroke={EMERALD}
              strokeWidth={2}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={SPRING}
            />
            <motion.text
              x={mulX + mulW / 2}
              y={mulY + mulH + 20}
              textAnchor={"middle" as const}
              fill={EMERALD}
              fontSize={16}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"4 \u00d7 6 (\u00d72)"}
            </motion.text>
          </>
        )}

        {/* Cross-products for multiplicative: equal */}
        {step >= 9 && (
          <>
            <motion.text
              x={VW / 2}
              y={360}
              textAnchor={"middle" as const}
              fill={EMERALD}
              fontSize={14}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"2\u00d76 = 12  and  3\u00d74 = 12"}
            </motion.text>
            <motion.text
              x={VW / 2}
              y={380}
              textAnchor={"middle" as const}
              fill={EMERALD}
              fontSize={16}
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"12 = 12 \u2014 This IS a proportion!"}
            </motion.text>
          </>
        )}

        {/* Narration text */}
        {step >= 2 && step < 3 && (
          <motion.text
            x={VW / 2}
            y={VH - 30}
            textAnchor={"middle" as const}
            fill={TEXT_PRIMARY}
            fontSize={15}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            This photo is 2 cm wide and 3 cm tall.
          </motion.text>
        )}
        {step >= 3 && step < 5 && (
          <motion.text
            x={VW / 2}
            y={VH - 30}
            textAnchor={"middle" as const}
            fill={TEXT_PRIMARY}
            fontSize={15}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {"Adding 1 to each side\u2026 looks STRETCHED!"}
          </motion.text>
        )}
        {step >= 8 && step < 10 && (
          <motion.text
            x={VW / 2}
            y={VH - 30}
            textAnchor={"middle" as const}
            fill={TEXT_PRIMARY}
            fontSize={15}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {"Multiplying each side by 2\u2026 same shape!"}
          </motion.text>
        )}
      </svg>

      {showContinue && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ContinueButton onClick={onContinue}>
            {"Continue \u2192"}
          </ContinueButton>
        </motion.div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Stage 2: Spatial Experience                                        */
/* ================================================================== */

function SpatialStage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [baseW, setBaseW] = useState(2);
  const [baseH, setBaseH] = useState(3);
  const [scaleFactor, setScaleFactor] = useState(2);
  const [lockRatio, setLockRatio] = useState(true);
  const [freeW, setFreeW] = useState(4);
  const [freeH, setFreeH] = useState(6);
  const [interactions, setInteractions] = useState(0);
  const [markerCount, setMarkerCount] = useState(1);

  const incInteraction = useCallback(() => {
    setInteractions((c) => c + 1);
  }, []);

  const scaledW = lockRatio ? baseW * scaleFactor : freeW;
  const scaledH = lockRatio ? baseH * scaleFactor : freeH;

  const ratiosMatch = crossProductsEqual(
    baseW,
    baseH,
    scaledW,
    scaledH,
  );
  const crossA = baseW * scaledH;
  const crossB = baseH * scaledW;

  // Pixel sizes for rectangles
  const MAX_PX = 100;
  const origMax = Math.max(baseW, baseH);
  const origPxW = (baseW / origMax) * MAX_PX;
  const origPxH = (baseH / origMax) * MAX_PX;

  const scaledMax = Math.max(scaledW, scaledH);
  const scaledPxW = Math.min(
    (scaledW / scaledMax) * 180,
    240,
  );
  const scaledPxH = Math.min(
    (scaledH / scaledMax) * 180,
    240,
  );

  // Drag bind for scaled rectangle
  const dragBind = useDrag(
    ({ movement: [mx, my], memo }) => {
      const m = (memo ?? {
        startFactor: scaleFactor,
        startW: freeW,
        startH: freeH,
      }) as {
        startFactor: number;
        startW: number;
        startH: number;
      };
      if (lockRatio) {
        const delta = (mx + my) / 100;
        const newFactor = clamp(
          Math.round(m.startFactor + delta),
          1,
          5,
        );
        if (newFactor !== scaleFactor) {
          setScaleFactor(newFactor);
          incInteraction();
        }
      } else {
        const nw = clamp(
          Math.round(m.startW + mx / 30),
          1,
          10,
        );
        const nh = clamp(
          Math.round(m.startH + my / 30),
          1,
          10,
        );
        if (nw !== freeW || nh !== freeH) {
          setFreeW(nw);
          setFreeH(nh);
          incInteraction();
        }
      }
      return m;
    },
    {
      filterTaps: true,
      from: () => [0, 0] as [number, number],
    },
  );

  // Double number line
  const LINE_LEFT = 40;
  const LINE_WIDTH = 300;
  const TOP_Y = 60;
  const BOT_Y = 140;
  const topMax = baseW * 6;
  const botMax = baseH * 6;

  const markerPairs = useMemo(() => {
    return Array.from({ length: markerCount }, (_, i) => ({
      top: baseW * (i + 1),
      bottom: baseH * (i + 1),
    }));
  }, [markerCount, baseW, baseH]);

  const topPosOf = useCallback(
    (val: number) =>
      LINE_LEFT + (val / topMax) * LINE_WIDTH,
    [topMax],
  );
  const botPosOf = useCallback(
    (val: number) =>
      LINE_LEFT + (val / botMax) * LINE_WIDTH,
    [botMax],
  );

  const canContinue = interactions >= MIN_INTERACTIONS;

  return (
    <div
      className="flex flex-1 flex-col px-4 py-2"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Tabs */}
      <div className="mb-3 flex gap-2">
        {(
          ["Scaling Rectangles", "Double Number Line"] as const
        ).map((label, i) => (
          <motion.button
            key={label}
            className="flex-1 rounded-lg py-2 text-sm font-medium select-none"
            style={{
              minHeight: 44,
              backgroundColor:
                activeTab === i ? INDIGO : SURFACE,
              color: activeTab === i ? "#fff" : TEXT_SEC,
              border: `1px solid ${activeTab === i ? INDIGO : BORDER_CLR}`,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (activeTab !== i) {
                setActiveTab(i as 0 | 1);
                incInteraction();
              }
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 0 ? (
          <motion.div
            key="rect-ws"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={EASE}
          >
            {/* Base ratio controls */}
            <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
              <span
                className="text-sm font-medium"
                style={{ color: TEXT_SEC }}
              >
                Base Ratio:
              </span>
              <Stepper
                value={baseW}
                onChange={(v) => {
                  setBaseW(v);
                  incInteraction();
                }}
                min={1}
                max={10}
                label="width"
              />
              <span
                className="text-lg font-bold"
                style={{ color: TEXT_SEC }}
              >
                :
              </span>
              <Stepper
                value={baseH}
                onChange={(v) => {
                  setBaseH(v);
                  incInteraction();
                }}
                min={1}
                max={10}
                label="height"
              />
            </div>

            {/* Lock toggle */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <motion.button
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium select-none"
                style={{
                  minHeight: 44,
                  backgroundColor: lockRatio
                    ? `${EMERALD}20`
                    : `${RED}20`,
                  color: lockRatio ? EMERALD : RED,
                  border: `1px solid ${lockRatio ? EMERALD : RED}`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setLockRatio((p) => !p);
                  if (!lockRatio) {
                    setFreeW(baseW * scaleFactor);
                    setFreeH(baseH * scaleFactor);
                  }
                  incInteraction();
                }}
              >
                {lockRatio
                  ? "Lock Ratio: ON"
                  : "Lock Ratio: OFF"}
              </motion.button>
            </div>

            {/* Rectangles side by side */}
            <div className="mb-3 flex items-end justify-center gap-6">
              {/* Original */}
              <div className="flex flex-col items-center gap-1">
                <div
                  style={{
                    width: origPxW,
                    height: origPxH,
                    border: `2px solid ${INDIGO}`,
                    backgroundColor: `${INDIGO}26`,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {baseW}:{baseH}
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{ color: TEXT_SEC }}
                >
                  Original
                </span>
              </div>

              {/* Scaled */}
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  style={{
                    width: scaledPxW,
                    height: scaledPxH,
                    border: `2px solid ${ratiosMatch ? EMERALD : RED}`,
                    backgroundColor: ratiosMatch
                      ? `${EMERALD}26`
                      : `${RED}26`,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    touchAction: "none",
                  }}
                  animate={{
                    width: scaledPxW,
                    height: scaledPxH,
                    borderColor: ratiosMatch
                      ? EMERALD
                      : RED,
                  }}
                  transition={SPRING}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {scaledW}:{scaledH}
                  </span>
                  {/* Drag handle */}
                  <motion.div
                    {...(dragBind() as Record<string, unknown>)}
                    className="absolute flex items-center justify-center rounded-full"
                    style={{
                      width: 24,
                      height: 24,
                      minWidth: 44,
                      minHeight: 44,
                      bottom: -12,
                      right: -12,
                      backgroundColor: AMBER,
                      cursor: "grab",
                      touchAction: "none",
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    role="slider"
                    aria-label={`Drag to resize. Current ratio: ${scaledW}:${scaledH}`}
                    aria-valuemin={1}
                    aria-valuemax={lockRatio ? 5 : 10}
                    aria-valuenow={
                      lockRatio ? scaleFactor : scaledW
                    }
                    tabIndex={0}
                  />
                </motion.div>
                <span
                  className="text-xs"
                  style={{ color: TEXT_SEC }}
                >
                  Scaled
                </span>
              </div>
            </div>

            {/* Cross products + match indicator */}
            <div
              className="rounded-xl p-3 text-center"
              style={{ backgroundColor: SURFACE }}
              role="math"
              aria-label={`Cross products: ${baseW} times ${scaledH} equals ${crossA}, ${baseH} times ${scaledW} equals ${crossB}. ${ratiosMatch ? "Equal" : "Not equal"}.`}
            >
              <div className="mb-1 flex items-center justify-center gap-3 font-mono text-sm">
                <span
                  style={{
                    color: ratiosMatch ? EMERALD : RED,
                  }}
                >
                  {baseW}
                  {"\u00d7"}
                  {scaledH} = {crossA}
                </span>
                <span style={{ color: TEXT_DIM }}>vs</span>
                <span
                  style={{
                    color: ratiosMatch ? EMERALD : RED,
                  }}
                >
                  {baseH}
                  {"\u00d7"}
                  {scaledW} = {crossB}
                </span>
              </div>
              <div
                className="text-sm font-bold"
                style={{
                  color: ratiosMatch ? EMERALD : RED,
                }}
              >
                {ratiosMatch
                  ? "\u2713 Same shape! This is a proportion."
                  : "\u2717 Different shape! Not a proportion."}
                {ratiosMatch && lockRatio && (
                  <span style={{ color: AMBER }}>
                    {` (\u00d7${scaleFactor})`}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dnl-ws"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={EASE}
          >
            <div className="mb-2 flex flex-wrap items-center justify-center gap-3">
              <span
                className="text-sm font-medium"
                style={{ color: TEXT_SEC }}
              >
                Base Ratio:
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: INDIGO }}
              >
                {baseW}:{baseH}
              </span>
            </div>

            <svg
              viewBox="0 0 400 240"
              className="w-full"
              style={{ maxWidth: 420 }}
              role="img"
              aria-label={`Double number line showing equivalent ratios for ${baseW}:${baseH}`}
            >
              {/* Top label */}
              <text
                x={10}
                y={TOP_Y - 20}
                fill={TEXT_SEC}
                fontSize={12}
              >
                Quantity A
              </text>
              {/* Top line */}
              <line
                x1={LINE_LEFT}
                y1={TOP_Y}
                x2={LINE_LEFT + LINE_WIDTH}
                y2={TOP_Y}
                stroke={INDIGO}
                strokeWidth={2}
              />
              {/* Top ticks */}
              {Array.from(
                { length: topMax + 1 },
                (_, i) => {
                  const x = topPosOf(i);
                  const isMajor = i % baseW === 0;
                  return (
                    <g key={`tt-${i}`}>
                      <line
                        x1={x}
                        y1={
                          TOP_Y - (isMajor ? 8 : 4)
                        }
                        x2={x}
                        y2={
                          TOP_Y + (isMajor ? 8 : 4)
                        }
                        stroke={TEXT_DIM}
                        strokeWidth={
                          isMajor ? 1.5 : 1
                        }
                      />
                      {isMajor && (
                        <text
                          x={x}
                          y={TOP_Y - 12}
                          textAnchor={
                            "middle" as const
                          }
                          fill={TEXT_SEC}
                          fontSize={10}
                        >
                          {i}
                        </text>
                      )}
                    </g>
                  );
                },
              )}

              {/* Bottom label */}
              <text
                x={10}
                y={BOT_Y - 20}
                fill={TEXT_SEC}
                fontSize={12}
              >
                Quantity B
              </text>
              {/* Bottom line */}
              <line
                x1={LINE_LEFT}
                y1={BOT_Y}
                x2={LINE_LEFT + LINE_WIDTH}
                y2={BOT_Y}
                stroke={VIOLET}
                strokeWidth={2}
              />
              {/* Bottom ticks */}
              {Array.from(
                { length: botMax + 1 },
                (_, i) => {
                  const x = botPosOf(i);
                  const isMajor = i % baseH === 0;
                  return (
                    <g key={`bt-${i}`}>
                      <line
                        x1={x}
                        y1={
                          BOT_Y - (isMajor ? 8 : 4)
                        }
                        x2={x}
                        y2={
                          BOT_Y + (isMajor ? 8 : 4)
                        }
                        stroke={TEXT_DIM}
                        strokeWidth={
                          isMajor ? 1.5 : 1
                        }
                      />
                      {isMajor && (
                        <text
                          x={x}
                          y={BOT_Y + 20}
                          textAnchor={
                            "middle" as const
                          }
                          fill={TEXT_SEC}
                          fontSize={10}
                        >
                          {i}
                        </text>
                      )}
                    </g>
                  );
                },
              )}

              {/* Marker pairs */}
              {markerPairs.map((pair, idx) => {
                const topX = topPosOf(pair.top);
                const botX = botPosOf(pair.bottom);
                return (
                  <g key={`mp-${idx}`}>
                    {/* Connector */}
                    <motion.line
                      x1={topX}
                      y1={TOP_Y + 8}
                      x2={botX}
                      y2={BOT_Y - 8}
                      stroke={AMBER}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        ...EASE,
                        delay: idx * 0.1,
                      }}
                    />
                    {/* Top dot */}
                    <motion.circle
                      cx={topX}
                      cy={TOP_Y}
                      r={6}
                      fill={INDIGO}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        ...SPRING,
                        delay: idx * 0.1,
                      }}
                    />
                    {/* Bottom dot */}
                    <motion.circle
                      cx={botX}
                      cy={BOT_Y}
                      r={6}
                      fill={VIOLET}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        ...SPRING,
                        delay: idx * 0.1 + 0.05,
                      }}
                    />
                    {/* Ratio badge */}
                    <motion.text
                      x={(topX + botX) / 2}
                      y={BOT_Y + 40}
                      textAnchor={
                        "middle" as const
                      }
                      fill={TEXT_PRIMARY}
                      fontSize={11}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: idx * 0.1 + 0.15,
                      }}
                    >
                      {pair.top}:{pair.bottom}
                    </motion.text>
                  </g>
                );
              })}
            </svg>

            {/* Controls */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <motion.button
                className="rounded-lg px-4 py-2 text-sm font-medium select-none"
                style={{
                  minHeight: 44,
                  minWidth: 44,
                  backgroundColor: INDIGO,
                  color: "#fff",
                  opacity: markerCount >= 6 ? 0.4 : 1,
                  cursor:
                    markerCount >= 6
                      ? "not-allowed"
                      : "pointer",
                }}
                whileTap={
                  markerCount < 6
                    ? { scale: 0.95 }
                    : undefined
                }
                onClick={() => {
                  if (markerCount < 6) {
                    setMarkerCount((c) => c + 1);
                    incInteraction();
                  }
                }}
              >
                Add Marker
              </motion.button>
              <motion.button
                className="rounded-lg px-4 py-2 text-sm font-medium select-none"
                style={{
                  minHeight: 44,
                  minWidth: 44,
                  backgroundColor: SURFACE,
                  color: TEXT_SEC,
                  border: `1px solid ${BORDER_CLR}`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMarkerCount(1);
                  incInteraction();
                }}
              >
                Clear
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <div className="mt-4 flex justify-center">
        <ContinueButton
          onClick={onContinue}
          disabled={!canContinue}
          progress={Math.min(
            interactions / MIN_INTERACTIONS,
            1,
          )}
        >
          {canContinue
            ? "Continue \u2192"
            : `Explore more (${interactions}/${MIN_INTERACTIONS})`}
        </ContinueButton>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Stage 3: Guided Discovery                                          */
/* ================================================================== */

function DiscoveryStage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [solveValue4, setSolveValue4] = useState(1);
  const [solveValue5, setSolveValue5] = useState(1);
  const [solved4, setSolved4] = useState(false);
  const [solved5, setSolved5] = useState(false);

  const prompts = useMemo(
    () => [
      {
        title: "Additive vs Multiplicative",
        text: "Width 3, height 4: we added 1 to 2:3. Does it look the same? Now try multiplying each part by 2 (width 4, height 6). Which matches?",
        button: "I see it!",
        visual: "compare" as const,
      },
      {
        title: "Equivalent Ratios on the Number Line",
        text: "All equivalent ratios of 2:3 line up vertically on the double number line: 4:6, 6:9, 8:12\u2026 Each pair is a MULTIPLE of 2:3.",
        button: "I see it!",
        visual: "chain" as const,
      },
      {
        title: "The Cross Multiplication Test",
        text: "Is 3:5 proportional to 6:10? Cross multiply: 3\u00d710=30, 5\u00d76=30. Equal! Is 3:5 proportional to 5:8? 3\u00d78=24, 5\u00d75=25. NOT equal!",
        button: "Got it!",
        visual: "cross" as const,
      },
      {
        title: "Solve: 2/3 = ?/9",
        text: "Height tripled from 3 to 9 (\u00d73). Width must also triple: 2 \u00d7 3 = ?",
        button: "Makes sense!",
        visual: "solve4" as const,
      },
      {
        title: "Solve: 4/5 = ?/15",
        text: "Height tripled from 5 to 15 (\u00d73). Width: 4 \u00d7 3 = ?",
        button: "I've got it!",
        visual: "solve5" as const,
      },
    ],
    [],
  );

  const currentPrompt = prompts[promptIdx]!;
  const isLastPrompt = promptIdx >= prompts.length - 1;

  const canAdvancePrompt = useMemo(() => {
    if (currentPrompt.visual === "solve4") return solved4;
    if (currentPrompt.visual === "solve5") return solved5;
    return true;
  }, [currentPrompt.visual, solved4, solved5]);

  const handleAdvance = useCallback(() => {
    if (isLastPrompt) {
      onContinue();
    } else {
      setPromptIdx((i) => i + 1);
    }
  }, [isLastPrompt, onContinue]);

  return (
    <div
      className="flex flex-1 flex-col px-4 py-4"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Prompt counter */}
      <div className="mb-3 flex items-center justify-center gap-1.5">
        {prompts.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor:
                i < promptIdx
                  ? EMERALD
                  : i === promptIdx
                    ? INDIGO
                    : BORDER_CLR,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={promptIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={EASE}
          className="flex-1"
        >
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: SURFACE }}
          >
            <h3
              className="mb-2 text-lg font-bold"
              style={{ color: TEXT_PRIMARY }}
            >
              {currentPrompt.title}
            </h3>
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: TEXT_SEC }}
            >
              {currentPrompt.text}
            </p>

            {/* Visual for compare: two rectangles */}
            {currentPrompt.visual === "compare" && (
              <div className="mb-4 flex items-end justify-center gap-4">
                {/* 2:3 original */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    style={{
                      width: 53,
                      height: 80,
                      border: `2px solid ${INDIGO}`,
                      backgroundColor: `${INDIGO}26`,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: TEXT_PRIMARY,
                      }}
                    >
                      2:3
                    </span>
                  </div>
                </div>
                {/* 3:4 additive */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    style={{
                      width: 60,
                      height: 80,
                      border: `2px solid ${RED}`,
                      backgroundColor: `${RED}26`,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: TEXT_PRIMARY,
                      }}
                    >
                      3:4
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: RED }}
                  >
                    {"\u2717"} +1
                  </span>
                </div>
                {/* 4:6 multiplicative */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    style={{
                      width: 80,
                      height: 120,
                      border: `2px solid ${EMERALD}`,
                      backgroundColor: `${EMERALD}26`,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: TEXT_PRIMARY,
                      }}
                    >
                      4:6
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: EMERALD }}
                  >
                    {"\u2713"} {"\u00d7"}2
                  </span>
                </div>
              </div>
            )}

            {/* Visual for chain: equivalent ratio chain */}
            {currentPrompt.visual === "chain" && (
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                {[1, 2, 3, 4].map((k) => (
                  <motion.span
                    key={k}
                    className="rounded-full px-3 py-1 text-sm font-bold"
                    style={{
                      backgroundColor: `${INDIGO}20`,
                      color: INDIGO,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      ...SPRING,
                      delay: k * 0.15,
                    }}
                  >
                    {2 * k}:{3 * k}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Visual for cross multiplication */}
            {currentPrompt.visual === "cross" && (
              <div className="mb-4 flex flex-col gap-2">
                <div
                  className="flex items-center justify-between rounded-lg p-3"
                  style={{ backgroundColor: BG }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: INDIGO }}
                  >
                    3:5 = 6:10
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: EMERALD }}
                  >
                    3{"\u00d7"}10=30, 5{"\u00d7"}6=30{" "}
                    {"\u2713"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between rounded-lg p-3"
                  style={{ backgroundColor: BG }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: INDIGO }}
                  >
                    3:5 vs 5:8
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: RED }}
                  >
                    3{"\u00d7"}8=24, 5{"\u00d7"}5=25{" "}
                    {"\u2717"}
                  </span>
                </div>
              </div>
            )}

            {/* Solve prompt 4: 2/3 = ?/9 */}
            {currentPrompt.visual === "solve4" && (
              <div className="mb-4 flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex flex-col items-center rounded-lg p-3"
                    style={{ backgroundColor: BG }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: INDIGO }}
                    >
                      2/3
                    </span>
                  </div>
                  <span
                    className="text-lg font-bold"
                    style={{ color: TEXT_SEC }}
                  >
                    =
                  </span>
                  <div
                    className="flex flex-col items-center rounded-lg p-3"
                    style={{
                      backgroundColor: BG,
                      border: `2px ${solved4 ? "solid" : "dashed"} ${solved4 ? EMERALD : AMBER}`,
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{
                        color: solved4
                          ? EMERALD
                          : AMBER,
                      }}
                    >
                      {solved4
                        ? "6"
                        : `${solveValue4}`}
                      /9
                    </span>
                  </div>
                </div>
                {!solved4 && (
                  <div className="flex items-center gap-2">
                    <Stepper
                      value={solveValue4}
                      onChange={(v) => {
                        setSolveValue4(v);
                        if (v === 6)
                          setSolved4(true);
                      }}
                      min={1}
                      max={20}
                      label="missing value"
                    />
                  </div>
                )}
                {solved4 && (
                  <motion.p
                    className="text-sm font-medium"
                    style={{ color: EMERALD }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {"\u2713"} Correct! 2 {"\u00d7"}{" "}
                    3 = 6. Cross check: 2{"\u00d7"}9=18,
                    3{"\u00d7"}6=18.
                  </motion.p>
                )}
              </div>
            )}

            {/* Solve prompt 5: 4/5 = ?/15 */}
            {currentPrompt.visual === "solve5" && (
              <div className="mb-4 flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex flex-col items-center rounded-lg p-3"
                    style={{ backgroundColor: BG }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: INDIGO }}
                    >
                      4/5
                    </span>
                  </div>
                  <span
                    className="text-lg font-bold"
                    style={{ color: TEXT_SEC }}
                  >
                    =
                  </span>
                  <div
                    className="flex flex-col items-center rounded-lg p-3"
                    style={{
                      backgroundColor: BG,
                      border: `2px ${solved5 ? "solid" : "dashed"} ${solved5 ? EMERALD : AMBER}`,
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{
                        color: solved5
                          ? EMERALD
                          : AMBER,
                      }}
                    >
                      {solved5
                        ? "12"
                        : `${solveValue5}`}
                      /15
                    </span>
                  </div>
                </div>
                {!solved5 && (
                  <div className="flex items-center gap-2">
                    <Stepper
                      value={solveValue5}
                      onChange={(v) => {
                        setSolveValue5(v);
                        if (v === 12)
                          setSolved5(true);
                      }}
                      min={1}
                      max={30}
                      label="missing value"
                    />
                  </div>
                )}
                {solved5 && (
                  <motion.p
                    className="text-sm font-medium"
                    style={{ color: EMERALD }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {"\u2713"} Correct! 4 {"\u00d7"}{" "}
                    3 = 12. Cross check: 4{"\u00d7"}
                    15=60, 5{"\u00d7"}12=60.
                  </motion.p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-center">
            <ContinueButton
              onClick={handleAdvance}
              disabled={!canAdvancePrompt}
            >
              {canAdvancePrompt
                ? currentPrompt.button
                : "Solve to continue"}
            </ContinueButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  Stage 4: Symbol Bridge                                             */
/* ================================================================== */

function SymbolBridgeStage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [step, setStep] = useState(0);

  const steps = useMemo(
    () => [
      {
        title: "Proportion Notation",
        lines: [
          {
            text: "A proportion says two ratios are equal:",
            color: TEXT_SEC,
          },
          {
            text: "2:3 = 4:6",
            color: INDIGO,
            bold: true,
            size: 22,
          },
          { text: "As fractions:", color: TEXT_SEC },
          {
            text: "2/3 = 4/6",
            color: INDIGO,
            bold: true,
            size: 22,
          },
          {
            text: "General form: a/b = c/d",
            color: TEXT_SEC,
          },
        ],
        chain: ["2:3", "4:6", "6:9", "8:12"],
      },
      {
        title: "Cross Multiplication",
        lines: [
          {
            text: "To test a proportion, cross multiply:",
            color: TEXT_SEC,
          },
          {
            text: "2/3 = 4/6",
            color: INDIGO,
            bold: true,
            size: 20,
          },
          {
            text: "2 \u00d7 6 = 12    3 \u00d7 4 = 12",
            color: AMBER,
            bold: true,
            size: 18,
          },
          {
            text: "Equal cross products = proportion confirmed!",
            color: EMERALD,
            bold: true,
          },
          {
            text: "If a/b = c/d, then a \u00d7 d = b \u00d7 c",
            color: TEXT_PRIMARY,
            size: 16,
          },
        ],
        counter: {
          fail: "2\u00d74=8 vs 3\u00d73=9 \u2192 8\u22609",
        },
      },
      {
        title: "Solving Proportions",
        lines: [
          {
            text: "Solve: 3/5 = x/20",
            color: TEXT_SEC,
          },
          {
            text: "Cross multiply:",
            color: TEXT_SEC,
          },
          {
            text: "3 \u00d7 20 = 5 \u00d7 x",
            color: AMBER,
            bold: true,
            size: 18,
          },
          {
            text: "60 = 5x",
            color: AMBER,
            bold: true,
            size: 18,
          },
          {
            text: "x = 60 / 5 = 12",
            color: EMERALD,
            bold: true,
            size: 20,
          },
          {
            text: "Verify: 3/5 = 12/20 \u2713",
            color: EMERALD,
          },
        ],
        procedure: true,
      },
    ],
    [],
  );

  const currentStep = steps[step]!;

  return (
    <div
      className="flex flex-1 flex-col px-4 py-4"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Step dots */}
      <div className="mb-3 flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor:
                i <= step ? INDIGO : BORDER_CLR,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={EASE}
        >
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: SURFACE }}
          >
            <h3
              className="mb-4 text-lg font-bold"
              style={{ color: TEXT_PRIMARY }}
            >
              {currentStep.title}
            </h3>

            <div className="flex flex-col gap-2">
              {currentStep.lines.map((line, i) => (
                <motion.p
                  key={i}
                  className={cn(
                    line.bold && "font-bold",
                  )}
                  style={{
                    color: line.color,
                    fontSize: line.size ?? 14,
                    textAlign: "center",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            {/* Equivalent ratio chain */}
            {currentStep.chain && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {currentStep.chain.map(
                  (ratio, i) => (
                    <motion.span
                      key={ratio}
                      className="rounded-full px-3 py-1 text-sm font-bold"
                      style={{
                        backgroundColor: `${INDIGO}20`,
                        color: INDIGO,
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 400,
                        delay:
                          currentStep.lines
                            .length *
                            0.2 +
                          i * 0.15,
                      }}
                    >
                      {ratio}
                    </motion.span>
                  ),
                )}
              </div>
            )}

            {/* Counter-example flash */}
            {currentStep.counter && (
              <motion.div
                className="mt-4 rounded-lg p-2 text-center text-sm"
                style={{
                  backgroundColor: `${RED}15`,
                  color: RED,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:
                    currentStep.lines.length * 0.2 +
                    0.3,
                }}
              >
                Counter-example:{" "}
                {currentStep.counter.fail}
              </motion.div>
            )}

            {/* General procedure */}
            {currentStep.procedure && (
              <motion.div
                className="mt-4 rounded-lg p-3 text-center text-sm"
                style={{
                  backgroundColor: BG,
                  color: TEXT_SEC,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:
                    currentStep.lines.length * 0.2 +
                    0.3,
                }}
              >
                <strong
                  style={{ color: TEXT_PRIMARY }}
                >
                  To solve a/b = c/d:
                </strong>
                <br />
                1. Cross multiply: a {"\u00d7"} d = b{" "}
                {"\u00d7"} c
                <br />
                2. Solve for the unknown
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-center">
        <ContinueButton
          onClick={() => {
            if (step < steps.length - 1) {
              setStep((s) => s + 1);
            } else {
              onContinue();
            }
          }}
        >
          {step < steps.length - 1
            ? "Next \u2192"
            : "Continue \u2192"}
        </ContinueButton>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Stage 5: Real-World Anchor                                         */
/* ================================================================== */

function RealWorldStage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [cardIdx, setCardIdx] = useState(0);

  const cards = useMemo(
    () => [
      {
        title: "Recipe Scaling",
        icon: "\uD83C\uDF72",
        text: "A recipe uses 2 cups of flour for 3 cups of milk. For 9 cups of milk, you need 6 cups of flour.",
        math: "2/3 = 6/9 \u2014 triple the milk, triple the flour!",
        color: AMBER,
      },
      {
        title: "Map Distances",
        icon: "\uD83D\uDDFA\uFE0F",
        text: "On a map, 1 cm = 5 km. Cities 3.4 cm apart are 17 km apart in reality.",
        math: "1/5 = 3.4/17 \u2014 map scales are proportions!",
        color: BLUE,
      },
      {
        title: "Video Game Aspect Ratio",
        icon: "\uD83C\uDFAE",
        text: "A 16:9 display with 1920px width has 1080px height.",
        math: "16/9 = 1920/1080 \u2014 that is why it is called 1080p!",
        color: EMERALD,
      },
      {
        title: "Sports Statistics",
        icon: "\uD83C\uDFC0",
        text: "A player makes 3/5 free throws. In 20 attempts, she would make about 12.",
        math: "3/5 = 12/20 \u2014 proportional reasoning predicts performance!",
        color: INDIGO,
      },
    ],
    [],
  );

  const card = cards[cardIdx]!;
  const total = cards.length;

  return (
    <div
      className="flex flex-1 flex-col px-4 py-4"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={cardIdx}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={EASE}
          className="flex-1"
        >
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: SURFACE,
              borderLeft: `4px solid ${card.color}`,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">
                {card.icon}
              </span>
              <h3
                className="text-lg font-bold"
                style={{ color: TEXT_PRIMARY }}
              >
                {card.title}
              </h3>
            </div>
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: TEXT_SEC }}
            >
              {card.text}
            </p>
            <div
              className="rounded-lg p-3 text-center text-sm font-bold"
              style={{
                backgroundColor: BG,
                color: card.color,
              }}
            >
              {card.math}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor:
                i === cardIdx ? INDIGO : TEXT_DIM,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-3 flex items-center justify-center gap-3">
        {cardIdx > 0 && (
          <motion.button
            className="rounded-lg px-4 py-2 text-sm font-medium select-none"
            style={{
              minHeight: 44,
              minWidth: 44,
              backgroundColor: SURFACE,
              color: TEXT_SEC,
              border: `1px solid ${BORDER_CLR}`,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCardIdx((i) => i - 1)}
          >
            {"\u2190"} Prev
          </motion.button>
        )}
        {cardIdx < total - 1 ? (
          <motion.button
            className="rounded-lg px-4 py-2 text-sm font-medium select-none"
            style={{
              minHeight: 44,
              minWidth: 44,
              backgroundColor: INDIGO,
              color: "#fff",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCardIdx((i) => i + 1)}
          >
            {"Next \u2192"}
          </motion.button>
        ) : (
          <ContinueButton onClick={onContinue}>
            {"Continue \u2192"}
          </ContinueButton>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Stage 6: Practice                                                  */
/* ================================================================== */

function PracticeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] =
    useState<Set<string>>(new Set());
  const [numericInput, setNumericInput] = useState("");
  const [phase, setPhase] = useState<
    "answering" | "feedback"
  >("answering");
  const [isCorrect, setIsCorrect] = useState(false);
  const [dotStates, setDotStates] = useState<
    Array<"pending" | "correct" | "incorrect">
  >(
    Array(PRACTICE_PROBLEMS.length).fill("pending") as Array<
      "pending" | "correct" | "incorrect"
    >,
  );
  const [hintIdx, setHintIdx] = useState(-1);

  const prob = PRACTICE_PROBLEMS[currentIdx]!;
  const total = PRACTICE_PROBLEMS.length;

  const checkAnswer = useCallback(() => {
    let correct = false;

    switch (prob.inputType) {
      case "multiple-choice": {
        const correctOpt = prob.options?.find(
          (o) => o.correct,
        );
        correct = selectedAnswer === correctOpt?.id;
        break;
      }
      case "tap-to-select-multiple": {
        const correctIds = new Set(
          prob.options
            ?.filter((o) => o.correct)
            .map((o) => o.id) ?? [],
        );
        correct =
          selectedMultiple.size === correctIds.size &&
          [...selectedMultiple].every((id) =>
            correctIds.has(id),
          );
        break;
      }
      case "numeric-input": {
        const parsed = parseInt(
          numericInput.trim(),
          10,
        );
        correct =
          !isNaN(parsed) && parsed === prob.answer;
        break;
      }
    }

    setIsCorrect(correct);
    if (correct) setCorrectCount((c) => c + 1);
    setDotStates((prev) => {
      const next = [...prev] as Array<
        "pending" | "correct" | "incorrect"
      >;
      next[currentIdx] = correct
        ? "correct"
        : "incorrect";
      return next;
    });
    setPhase("feedback");
  }, [
    prob,
    selectedAnswer,
    selectedMultiple,
    numericInput,
    currentIdx,
  ]);

  const nextProblem = useCallback(() => {
    if (currentIdx + 1 >= total) {
      setDone(true);
      return;
    }
    setCurrentIdx((i) => i + 1);
    setSelectedAnswer(null);
    setSelectedMultiple(new Set());
    setNumericInput("");
    setPhase("answering");
    setIsCorrect(false);
    setHintIdx(-1);
  }, [currentIdx, total]);

  const canSubmit = useMemo(() => {
    switch (prob.inputType) {
      case "multiple-choice":
        return selectedAnswer !== null;
      case "tap-to-select-multiple":
        return selectedMultiple.size > 0;
      case "numeric-input":
        return numericInput.trim() !== "";
    }
  }, [
    prob.inputType,
    selectedAnswer,
    selectedMultiple,
    numericInput,
  ]);

  if (done) {
    const pct = Math.round(
      (correctCount / total) * 100,
    );
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center px-4"
      >
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            backgroundColor: `${EMERALD}20`,
          }}
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke={EMERALD}
            strokeWidth={2.5}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2
          className="mb-2 text-xl font-bold"
          style={{ color: TEXT_PRIMARY }}
        >
          Practice Complete!
        </h2>
        <p
          className="mb-6"
          style={{ color: TEXT_SEC }}
        >
          {correctCount}/{total} correct ({pct}%)
        </p>
        <ContinueButton onClick={onComplete}>
          {"Continue \u2192"}
        </ContinueButton>
      </motion.div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Progress dots */}
      <div className="mb-4 mt-2 flex items-center justify-center gap-1.5">
        {dotStates.map((state, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor:
                state === "correct"
                  ? EMERALD
                  : state === "incorrect"
                    ? RED
                    : BORDER_CLR,
              border:
                i === currentIdx
                  ? `2px solid ${INDIGO}`
                  : "none",
              boxShadow:
                i === currentIdx
                  ? `0 0 6px ${INDIGO}80`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Problem header */}
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: `${LAYER_COLORS[prob.layer]!}20`,
              color: LAYER_COLORS[prob.layer]!,
            }}
          >
            {LAYER_LABELS[prob.layer]!}
          </span>
          <span style={{ color: TEXT_DIM }}>
            Problem {currentIdx + 1} / {total}
          </span>
        </span>
        <span style={{ color: TEXT_DIM }}>
          {correctCount} correct
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={EASE}
        >
          {/* Problem card */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER_CLR}`,
            }}
          >
            <p
              className="mb-4 leading-relaxed"
              style={{
                color: TEXT_PRIMARY,
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              {prob.stem}
            </p>

            {/* Multiple choice options */}
            {(prob.inputType === "multiple-choice" ||
              prob.inputType ===
                "tap-to-select-multiple") &&
              prob.options && (
                <div className="flex flex-col gap-2">
                  {prob.options.map((opt) => {
                    const isSelected =
                      prob.inputType ===
                      "multiple-choice"
                        ? selectedAnswer === opt.id
                        : selectedMultiple.has(
                            opt.id,
                          );

                    let borderColor: string = BORDER_CLR;
                    let bgColor: string = BG;
                    if (phase === "feedback") {
                      if (opt.correct) {
                        borderColor = EMERALD;
                        bgColor = `${EMERALD}15`;
                      } else if (
                        isSelected &&
                        !opt.correct
                      ) {
                        borderColor = RED;
                        bgColor = `${RED}15`;
                      }
                    } else if (isSelected) {
                      borderColor = INDIGO;
                      bgColor = `${INDIGO}15`;
                    }

                    return (
                      <motion.button
                        key={opt.id}
                        className="w-full rounded-lg px-4 py-3 text-left text-sm select-none"
                        style={{
                          minHeight: 48,
                          backgroundColor: bgColor,
                          border: `2px solid ${borderColor}`,
                          color: TEXT_PRIMARY,
                          cursor:
                            phase === "feedback"
                              ? "default"
                              : "pointer",
                        }}
                        whileTap={
                          phase === "answering"
                            ? { scale: 0.97 }
                            : undefined
                        }
                        onClick={() => {
                          if (phase === "feedback")
                            return;
                          if (
                            prob.inputType ===
                            "multiple-choice"
                          ) {
                            setSelectedAnswer(
                              opt.id,
                            );
                          } else {
                            setSelectedMultiple(
                              (prev) => {
                                const next =
                                  new Set(prev);
                                if (
                                  next.has(opt.id)
                                )
                                  next.delete(
                                    opt.id,
                                  );
                                else
                                  next.add(opt.id);
                                return next;
                              },
                            );
                          }
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{
                              backgroundColor:
                                phase ===
                                  "feedback" &&
                                opt.correct
                                  ? EMERALD
                                  : isSelected
                                    ? INDIGO
                                    : BORDER_CLR,
                              color: "#fff",
                            }}
                          >
                            {opt.id.toUpperCase()}
                          </span>
                          {opt.text}
                        </span>
                        {opt.crossProducts &&
                          phase === "feedback" && (
                            <span
                              className="mt-1 block text-xs"
                              style={{
                                color: opt.correct
                                  ? EMERALD
                                  : RED,
                              }}
                            >
                              {opt.crossProducts}
                            </span>
                          )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* Numeric input */}
            {prob.inputType === "numeric-input" && (
              <div className="flex flex-col items-center gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  value={numericInput}
                  onChange={(e) =>
                    setNumericInput(e.target.value)
                  }
                  disabled={phase === "feedback"}
                  className="rounded-lg text-center text-lg font-bold"
                  style={{
                    width: 100,
                    height: 48,
                    backgroundColor: BG,
                    border: `2px solid ${
                      phase === "feedback"
                        ? isCorrect
                          ? EMERALD
                          : RED
                        : BORDER_CLR
                    }`,
                    color: TEXT_PRIMARY,
                    outline: "none",
                  }}
                  aria-label="Enter the missing value"
                  placeholder="?"
                />

                {/* Hints */}
                {prob.hints &&
                  phase === "answering" &&
                  hintIdx <
                    prob.hints.length - 1 && (
                    <motion.button
                      className="text-xs underline select-none"
                      style={{
                        color: TEXT_DIM,
                        minHeight: 44,
                        minWidth: 44,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setHintIdx((h) => h + 1)
                      }
                    >
                      Need a hint?
                    </motion.button>
                  )}
                {prob.hints &&
                  hintIdx >= 0 &&
                  prob.hints
                    .slice(0, hintIdx + 1)
                    .map((hint, i) => (
                      <motion.div
                        key={i}
                        className="w-full rounded-lg p-3 text-xs"
                        style={{
                          backgroundColor: `${INDIGO}10`,
                          borderLeft: `3px solid ${INDIGO}`,
                          color: TEXT_SEC,
                        }}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                      >
                        {hint}
                      </motion.div>
                    ))}
              </div>
            )}

            {/* Submit button */}
            {phase === "answering" && (
              <div className="mt-4 flex justify-center">
                <motion.button
                  className="rounded-xl px-6 py-3 text-sm font-medium select-none"
                  style={{
                    minHeight: 48,
                    minWidth: 48,
                    backgroundColor: canSubmit
                      ? INDIGO
                      : `${INDIGO}44`,
                    color: "#fff",
                    cursor: canSubmit
                      ? "pointer"
                      : "not-allowed",
                    opacity: canSubmit ? 1 : 0.5,
                  }}
                  whileTap={
                    canSubmit
                      ? { scale: 0.97 }
                      : undefined
                  }
                  onClick={
                    canSubmit
                      ? checkAnswer
                      : undefined
                  }
                >
                  {prob.inputType ===
                  "tap-to-select-multiple"
                    ? "Submit"
                    : "Check"}
                </motion.button>
              </div>
            )}

            {/* Feedback */}
            {phase === "feedback" && (
              <motion.div
                className="mt-4 rounded-lg p-4 text-sm leading-relaxed"
                style={{
                  backgroundColor: BG,
                  borderLeft: `3px solid ${isCorrect ? EMERALD : AMBER}`,
                  color: TEXT_SEC,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span
                  className="mb-1 block font-bold"
                  style={{
                    color: isCorrect
                      ? EMERALD
                      : AMBER,
                  }}
                >
                  {isCorrect
                    ? "\u2713 Correct!"
                    : "\u2717 Not quite."}
                </span>
                {isCorrect
                  ? prob.feedback.correct
                  : prob.feedback.incorrect}
              </motion.div>
            )}

            {/* Next button (feedback phase only) */}
            {phase === "feedback" && (
              <div className="mt-4 flex justify-center">
                <ContinueButton onClick={nextProblem}>
                  {currentIdx + 1 >= total
                    ? "Finish Practice"
                    : "Next \u2192"}
                </ContinueButton>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  Stage 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const charCount = text.trim().length;
  const meetsMinimum = charCount >= 30;

  const handleSubmit = () => {
    if (!meetsMinimum) return;
    setSubmitted(true);
  };

  const handleSkip = () => {
    setSkipped(true);
  };

  if (submitted || skipped) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center px-4"
        style={{
          maxWidth: 640,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {submitted && (
          <div className="mb-6 w-full">
            <div
              className="mb-4 rounded-xl py-3 pl-4 pr-4"
              style={{
                backgroundColor: BG,
                borderLeft: `4px solid ${INDIGO}`,
              }}
            >
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: TEXT_SEC }}
              >
                Great reflection! Understanding WHY
                proportions work multiplicatively is the
                deepest insight here. When you multiply
                both parts by the same factor, you
                scale the whole relationship evenly.
                Adding changes each part by a different
                PROPORTION of itself, distorting the
                relationship.
              </p>
            </div>
          </div>
        )}

        <div
          className="mb-6 rounded-xl p-5 text-center"
          style={{ backgroundColor: SURFACE }}
        >
          <motion.div
            className="mb-3 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {["2:3", "=", "4:6", "=", "6:9"].map(
              (s, i) => (
                <motion.span
                  key={i}
                  className="text-lg font-bold"
                  style={{
                    color:
                      s === "="
                        ? TEXT_DIM
                        : INDIGO,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.5 + i * 0.15,
                  }}
                >
                  {s}
                </motion.span>
              ),
            )}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-3 text-sm font-semibold"
            style={{ color: TEXT_PRIMARY }}
          >
            Same shape, different size.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-2 text-sm"
            style={{ color: TEXT_SEC }}
          >
            You have learned how proportions keep
            relationships in balance through
            multiplication, not addition.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <ContinueButton onClick={onComplete}>
            Complete Lesson
          </ContinueButton>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col items-center px-4 py-4"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        className="w-full rounded-2xl p-6"
        style={{ backgroundColor: SURFACE }}
      >
        {/* Header */}
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            backgroundColor: `${INDIGO}20`,
            color: INDIGO,
          }}
        >
          Reflection
        </span>

        {/* Prompt */}
        <p
          className="mb-4 leading-relaxed"
          style={{
            color: TEXT_PRIMARY,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Explain WHY adding the same number to both
          parts of a ratio changes it, but multiplying
          by the same number keeps it the same. Think
          about the scaling rectangles.
        </p>

        {/* Visual hint */}
        <div className="mb-4 flex gap-3">
          <div
            className="flex-1 rounded-lg p-3 text-center"
            style={{ backgroundColor: BG }}
          >
            <p
              className="text-xs uppercase"
              style={{ color: TEXT_DIM }}
            >
              Add +1
            </p>
            <p
              className="mt-1 text-sm font-bold"
              style={{ color: RED }}
            >
              2:3 {"\u2192"} 3:4 {"\u2717"}
            </p>
          </div>
          <div
            className="flex-1 rounded-lg p-3 text-center"
            style={{ backgroundColor: BG }}
          >
            <p
              className="text-xs uppercase"
              style={{ color: TEXT_DIM }}
            >
              Multiply {"\u00d7"}2
            </p>
            <p
              className="mt-1 text-sm font-bold"
              style={{ color: EMERALD }}
            >
              2:3 {"\u2192"} 4:6 {"\u2713"}
            </p>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full resize-none rounded-lg p-3 text-sm leading-relaxed"
            style={{
              minHeight: 120,
              backgroundColor: BG,
              border: `1px solid ${BORDER_CLR}`,
              color: TEXT_PRIMARY,
              outline: "none",
            }}
            placeholder="Think about what happens to the rectangle's shape when you add vs when you multiply..."
          />
          <span
            className="absolute right-3 bottom-2 text-xs"
            style={{
              color: meetsMinimum
                ? EMERALD
                : TEXT_DIM,
            }}
          >
            {charCount}/30 minimum
          </span>
        </div>

        {/* Submit & skip */}
        <div className="mt-4 flex items-center justify-between">
          <button
            className="text-xs select-none"
            style={{
              color: TEXT_DIM,
              minHeight: 44,
              minWidth: 44,
              cursor: "pointer",
            }}
            onClick={handleSkip}
          >
            Skip for now
          </button>
          <motion.button
            className="rounded-xl px-6 py-3 text-sm font-medium select-none"
            style={{
              minHeight: 48,
              minWidth: 48,
              backgroundColor: meetsMinimum
                ? INDIGO
                : `${INDIGO}44`,
              color: "#fff",
              cursor: meetsMinimum
                ? "pointer"
                : "not-allowed",
              opacity: meetsMinimum ? 1 : 0.5,
            }}
            whileTap={
              meetsMinimum
                ? { scale: 0.97 }
                : undefined
            }
            onClick={handleSubmit}
          >
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

export function ProportionsLesson({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGES[stageIdx + 1];
    if (next) setStage(next);
    else onComplete?.();
  }, [stageIdx, onComplete]);

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: BG }}
    >
      {/* Progress bar */}
      <ProgressBar
        current={stageIdx}
        total={STAGES.length}
      />

      {/* Stage content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={EASE}
        >
          {stage === "hook" && (
            <HookStage onContinue={advance} />
          )}
          {stage === "spatial" && (
            <SpatialStage onContinue={advance} />
          )}
          {stage === "discovery" && (
            <DiscoveryStage onContinue={advance} />
          )}
          {stage === "symbol" && (
            <SymbolBridgeStage onContinue={advance} />
          )}
          {stage === "realWorld" && (
            <RealWorldStage onContinue={advance} />
          )}
          {stage === "practice" && (
            <PracticeStage onComplete={advance} />
          )}
          {stage === "reflection" && (
            <ReflectionStage onComplete={advance} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
