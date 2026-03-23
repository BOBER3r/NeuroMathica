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
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */

interface FractionOpsLessonProps {
  onComplete?: () => void;
}

/* Stage type & STAGES constant replaced by NLS_STAGES from @/lib/tokens/stages */

interface Fraction {
  numerator: number;
  denominator: number;
}

interface PracticeOption {
  id: string;
  text: string;
  correct: boolean;
}

interface PracticeProblem {
  id: string;
  layer: "recall" | "procedure" | "understanding";
  stem: string;
  options: PracticeOption[];
  feedback: Record<string, string>;
}

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Lesson-specific colors (no shared token equivalent) ── */
const THEME = {
  purple: "#c084fc",
  red: "#f87171",
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const INDIGO = colors.accent.indigo;
const VIOLET = colors.accent.violet;
const PURPLE = THEME.purple;
const EMERALD = colors.accent.emerald;
const RED = THEME.red;
const AMBER = colors.accent.amber;
const BLUE = colors.functional.info;
const CYAN = colors.accent.cyan;

const UNSHADED = colors.bg.surface;
const BORDER = colors.text.muted;
const BG = colors.bg.primary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;

const SPRING = springs.default;
const SPRING_GENTLE = springs.gentle;
const EASE = {
  type: "tween" as const,
  duration: 0.3,
  ease: "easeInOut" as const,
};

const MIN_DENOM = 2;
const MAX_DENOM = 12;
const MIN_INTERACTIONS = 12;

/* ═══════════════════════════════════════════════════════════════════════
   PRACTICE PROBLEM BANK (9 problems)
   ═══════════════════════════════════════════════════════════════════════ */

const PROBLEMS: PracticeProblem[] = [
  {
    id: "R1",
    layer: "recall",
    stem: "To add fractions with DIFFERENT denominators, what must you do first?",
    options: [
      { id: "a", text: "Multiply the numerators", correct: false },
      { id: "b", text: "Find a common denominator", correct: true },
      { id: "c", text: "Add the denominators together", correct: false },
      { id: "d", text: "Flip the second fraction", correct: false },
    ],
    feedback: {
      correct:
        "Right! You need a common denominator so the pieces are the same size before you can add them.",
      a: "Multiplying the numerators is what you do for multiplication, not addition. For addition, you need same-sized pieces first.",
      c: "Adding denominators is the classic mistake! 1/2 + 1/3 is NOT 2/5. You need to find a COMMON denominator.",
      d: "Flipping the second fraction is for division. For addition, you need common denominators.",
    },
  },
  {
    id: "R2",
    layer: "recall",
    stem: "What is the rule for multiplying fractions?",
    options: [
      {
        id: "a",
        text: "Find a common denominator, then multiply numerators",
        correct: false,
      },
      {
        id: "b",
        text: "Multiply numerators together, multiply denominators together",
        correct: true,
      },
      {
        id: "c",
        text: "Add numerators, keep the denominator",
        correct: false,
      },
      {
        id: "d",
        text: "Flip the second fraction, then add",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Exactly! Multiply tops, multiply bottoms. No common denominator needed for multiplication.",
      a: "Common denominators are needed for addition, not multiplication. For multiplication, just multiply straight across.",
      c: "That\u2019s the rule for addition (when denominators are already the same). Multiplication is different.",
      d: "Flipping is for division. Multiplication is simpler: multiply numerators together and denominators together.",
    },
  },
  {
    id: "R3",
    layer: "recall",
    stem: "When you divide a number by a fraction less than 1, the result is:",
    options: [
      {
        id: "a",
        text: "Always smaller than the original number",
        correct: false,
      },
      {
        id: "b",
        text: "Always larger than the original number",
        correct: true,
      },
      {
        id: "c",
        text: "Always equal to the original number",
        correct: false,
      },
      {
        id: "d",
        text: "Sometimes larger, sometimes smaller",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Yes! Dividing by a fraction less than 1 gives a LARGER result. Think: \u2018How many small pieces fit in this big amount?\u2019",
      a: "This is the most common misconception! Dividing by a fraction less than 1 is like asking \u2018how many half-cups fit in 3 cups?\u2019 \u2014 the answer (6) is BIGGER.",
      c: "Dividing by 1 gives the same number, but dividing by a fraction LESS than 1 gives you more.",
      d: "When dividing by a proper fraction (less than 1), the result is ALWAYS larger. Try: 6 \u00F7 (1/2) = 12.",
    },
  },
  {
    id: "P1",
    layer: "procedure",
    stem: "Add 1/4 + 2/3. What is the result?",
    options: [
      { id: "a", text: "3/7", correct: false },
      { id: "b", text: "11/12", correct: true },
      { id: "c", text: "2/12", correct: false },
      { id: "d", text: "3/12", correct: false },
    ],
    feedback: {
      correct:
        "11/12 is right! 1/4 = 3/12, 2/3 = 8/12, and 3 + 8 = 11. The answer is 11/12.",
      a: "3/7 comes from adding numerators (1+2=3) and denominators (4+3=7). That\u2019s the classic mistake! You need common denominators first.",
      c: "2/12 would mean the numerator is 2, but 1/4 = 3/12 and 2/3 = 8/12. 3 + 8 = 11, not 2.",
      d: "3/12 is just 1/4 converted to twelfths. You still need to add the 8/12 from the 2/3.",
    },
  },
  {
    id: "P2",
    layer: "procedure",
    stem: "Multiply 3/4 \u00D7 2/5. What is the result?",
    options: [
      { id: "a", text: "6/20", correct: true },
      { id: "b", text: "5/9", correct: false },
      { id: "c", text: "6/9", correct: false },
      { id: "d", text: "3/10", correct: false },
    ],
    feedback: {
      correct:
        "6/20 is correct! 3\u00D72 = 6 on top, 4\u00D75 = 20 on the bottom. You can simplify to 3/10. Notice it\u2019s SMALLER than either fraction!",
      b: "5/9 comes from adding numerators (3+2) and denominators (4+5). For multiplication, multiply tops with tops and bottoms with bottoms.",
      c: "6/9 has the right numerator (3\u00D72=6) but the wrong denominator. It should be 4\u00D75=20, not 4+5=9.",
      d: "3/10 is the simplified form of 6/20. Both are correct, but 6/20 is the direct result of 3\u00D72 / 4\u00D75.",
    },
  },
  {
    id: "P3",
    layer: "procedure",
    stem: "Divide 2/3 by 1/4. What is 2/3 \u00F7 1/4?",
    options: [
      { id: "a", text: "2/12", correct: false },
      { id: "b", text: "8/3", correct: true },
      { id: "c", text: "3/8", correct: false },
      { id: "d", text: "2/7", correct: false },
    ],
    feedback: {
      correct:
        "8/3 is right! Flip 1/4 to get 4/1, then multiply: 2/3 \u00D7 4/1 = 8/3. That\u2019s 2 and 2/3.",
      a: "2/12 would come from multiplying (not dividing). But the question asks you to DIVIDE. Flip the 1/4 to 4/1, then multiply.",
      c: "3/8 is the reciprocal of the correct answer. You flipped the wrong fraction! Flip the SECOND fraction (1/4 becomes 4/1).",
      d: "2/7 doesn\u2019t follow any fraction operation rule. To divide: flip the second fraction and multiply: 2/3 \u00D7 4/1 = 8/3.",
    },
  },
  {
    id: "U1",
    layer: "understanding",
    stem: "Maria says: \u20181/2 + 1/3 = 2/5 because you add tops and bottoms.\u2019 Which statement BEST shows why she is wrong?",
    options: [
      {
        id: "a",
        text: "2/5 is LESS than 1/2 alone, so adding 1/3 can\u2019t give 2/5",
        correct: true,
      },
      {
        id: "b",
        text: "The fractions have different colors, so you can\u2019t add them",
        correct: false,
      },
      {
        id: "c",
        text: "You should subtract instead of add",
        correct: false,
      },
      {
        id: "d",
        text: "Fractions can\u2019t be added at all",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Exactly! 2/5 is LESS than 1/2 alone. Since 1/3 is positive, adding it MUST give something bigger than 1/2. The real answer is 5/6.",
      b: "Colors don\u2019t affect whether fractions can be added! The issue is that 2/5 is smaller than 1/2, which is impossible when adding a positive amount.",
      c: "The problem is the method (adding tops and bottoms), not the operation. Addition is correct, but you need common denominators first.",
      d: "Fractions can absolutely be added! You just need common denominators. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    },
  },
  {
    id: "U2",
    layer: "understanding",
    stem: "When you multiply 3/4 \u00D7 1/2, the answer (3/8) is SMALLER than both 3/4 and 1/2. Why?",
    options: [
      {
        id: "a",
        text: "You are taking a PART of a part \u2014 half of 3/4 is less than 3/4",
        correct: true,
      },
      {
        id: "b",
        text: "Multiplication always makes numbers smaller",
        correct: false,
      },
      {
        id: "c",
        text: "You divided instead of multiplied",
        correct: false,
      },
      { id: "d", text: "You made a calculation error", correct: false },
    ],
    feedback: {
      correct:
        "Exactly right! 3/4 \u00D7 1/2 means \u2018half OF 3/4.\u2019 You\u2019re taking a fraction of a fraction \u2014 a piece of a piece.",
      b: "Multiplication doesn\u2019t ALWAYS make things smaller! 3 \u00D7 4 = 12. But multiplying by a number LESS than 1 shrinks the result.",
      c: "No, 3/4 \u00D7 1/2 = 3/8 is correctly computed. Multiplying by a fraction less than 1 genuinely gives a smaller result.",
      d: "3/4 \u00D7 1/2 = (3\u00D71)/(4\u00D72) = 3/8. The calculation is correct! The result really is smaller when both inputs are less than 1.",
    },
  },
  {
    id: "U3",
    layer: "understanding",
    stem: "You have 2 meters of ribbon. Each bow needs 1/3 of a meter. How many bows can you make?",
    options: [
      { id: "a", text: "2/3 bows (2 \u00D7 1/3)", correct: false },
      {
        id: "b",
        text: "6 bows (2 \u00F7 1/3 = 6)",
        correct: true,
      },
      {
        id: "c",
        text: "3 bows (2 + 1/3 rounded)",
        correct: false,
      },
      {
        id: "d",
        text: "1 bow (not enough ribbon)",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "6 bows! 2 \u00F7 (1/3) = 2 \u00D7 3 = 6. Each meter has 3 thirds, so 2 meters have 6 thirds.",
      a: "2/3 is from 2 \u00D7 1/3 (multiplication). But the question asks how many 1/3-meter pieces FIT in 2 meters. That\u2019s division: 2 \u00F7 (1/3) = 6.",
      c: "Each meter contains 3 thirds, so 2 meters contain 6 thirds. You need to divide, not add.",
      d: "2 meters is plenty! Each bow only needs 1/3 of a meter. You can make 6 bows from 2 meters.",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

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

function lcmOf(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/* ContinueButton is now imported from @/components/lessons/ui/ContinueButton */

/* ── Fraction Bar ─────────────────────────────────────────────────── */

interface FractionBarProps {
  denominator: number;
  shadedCount: number;
  width: number;
  height: number;
  shadedColor?: string;
  unshadedColor?: string;
  showLabel?: boolean;
  borderColor?: string;
  clipSuffix?: string;
}

function FrBar({
  denominator,
  shadedCount,
  width,
  height,
  shadedColor = INDIGO,
  unshadedColor = UNSHADED,
  showLabel = true,
  borderColor = BORDER,
  clipSuffix = "",
}: FractionBarProps) {
  const pw = width / denominator;
  const idRef = useRef(
    `fb-${denominator}-${clipSuffix || Math.random().toString(36).slice(2, 6)}`,
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={width + 4}
        height={height + 4}
        viewBox={`-2 -2 ${width + 4} ${height + 4}`}
        role="img"
        aria-label={`Fraction bar: ${shadedCount} of ${denominator} parts shaded`}
      >
        <defs>
          <clipPath id={idRef.current}>
            <rect x={0} y={0} width={width} height={height} rx={4} ry={4} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${idRef.current})`}>
          {Array.from({ length: denominator }, (_, i) => (
            <motion.rect
              key={`p-${denominator}-${i}`}
              x={i * pw}
              y={0}
              width={pw}
              height={height}
              initial={{ fill: unshadedColor }}
              animate={{
                fill: i < shadedCount ? shadedColor : unshadedColor,
              }}
              transition={SPRING}
            />
          ))}
          {Array.from({ length: denominator - 1 }, (_, i) => (
            <motion.line
              key={`d-${denominator}-${i}`}
              x1={(i + 1) * pw}
              y1={0}
              x2={(i + 1) * pw}
              y2={height}
              stroke={borderColor}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ ...EASE, delay: i * 0.03 }}
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
          stroke={borderColor}
          strokeWidth={1.5}
        />
      </svg>
      {showLabel && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${shadedCount}/${denominator}`}
            className="flex items-baseline gap-1 text-lg font-bold tabular-nums"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <span style={{ color: shadedColor }}>{shadedCount}</span>
            <span style={{ color: TEXT_SEC }}>/</span>
            <span style={{ color: AMBER }}>{denominator}</span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/* ── Stepper ──────────────────────────────────────────────────────── */

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      <motion.button
        className="flex items-center justify-center rounded-lg font-bold text-lg select-none"
        style={{
          minWidth: 44,
          minHeight: 44,
          background: UNSHADED,
          color: TEXT,
          opacity: value <= min ? 0.3 : 1,
        }}
        onClick={() => value > min && onChange(value - 1)}
        whileTap={value > min ? { scale: 0.9 } : undefined}
        aria-label={`Decrease ${label}`}
        aria-disabled={value <= min}
      >
        &minus;
      </motion.button>
      <span
        className="w-8 text-center text-lg font-bold tabular-nums"
        style={{ color: TEXT }}
        aria-live="polite"
      >
        {value}
      </span>
      <motion.button
        className="flex items-center justify-center rounded-lg font-bold text-lg select-none"
        style={{
          minWidth: 44,
          minHeight: 44,
          background: UNSHADED,
          color: TEXT,
          opacity: value >= max ? 0.3 : 1,
        }}
        onClick={() => value < max && onChange(value + 1)}
        whileTap={value < max ? { scale: 0.9 } : undefined}
        aria-label={`Increase ${label}`}
        aria-disabled={value >= max}
      >
        +
      </motion.button>
    </div>
  );
}

/* ── Fraction Picker ──────────────────────────────────────────────── */

function FractionPicker({
  fraction,
  onChange,
  label,
  color,
}: {
  fraction: Fraction;
  onChange: (f: Fraction) => void;
  label: string;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1"
      role="group"
      aria-label={`${label}: ${fraction.numerator} over ${fraction.denominator}`}
    >
      <span className="text-xs font-medium" style={{ color: TEXT_SEC }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <Stepper
          value={fraction.numerator}
          min={0}
          max={fraction.denominator}
          onChange={(n) => onChange({ ...fraction, numerator: n })}
          label="numerator"
        />
        <span className="text-2xl font-bold" style={{ color }}>
          /
        </span>
        <Stepper
          value={fraction.denominator}
          min={MIN_DENOM}
          max={MAX_DENOM}
          onChange={(d) =>
            onChange({
              numerator: Math.min(fraction.numerator, d),
              denominator: d,
            })
          }
          label="denominator"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 1: HOOK
   ═══════════════════════════════════════════════════════════════════════ */

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/FractionOpsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /*
   * 0  equation "1/2 + 1/3 = ?" fades in
   * 1  wrong answer "= 2/5" appears
   * 2  narration: "Lots of people think..."
   * 3  1/2 bar slides in
   * 4  1/3 bar slides in
   * 5  2/5 bar slides in (red)
   * 6  alignment lines + red flash on 2/5
   * 7  narration: "2/5 is LESS than 1/2 alone!"
   * 8  bars split to sixths, combine to 5/6
   * 9  correct answer reveal
   * 10 final narration
   */

  useEffect(() => {
    const delays = [
      1500, 2000, 2000, 1500, 1500, 1500, 2000, 3000, 4000, 3000, 4000,
    ];
    let i = 0;
    function next() {
      if (i >= delays.length) return;
      const d = delays[i] ?? 1000;
      timerRef.current = setTimeout(() => {
        setPhase(i + 1);
        if (i + 1 >= 6) setCanSkip(true);
        i++;
        next();
      }, d);
    }
    next();
    // Failsafe: guarantee Continue button within 4s
    const failsafe = setTimeout(() => setCanSkip(true), 4000);
    return () => { clearTimeout(timerRef.current); clearTimeout(failsafe); };
  }, []);

  const barWidth = 260;
  const barH = 36;

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4">
      {/* Equation */}
      <AnimatePresence mode="wait">
        {phase >= 0 && phase < 1 && (
          <motion.p
            key="eq-q"
            className="text-2xl font-bold tabular-nums text-center"
            style={{ color: TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            1/2 + 1/3 = ?
          </motion.p>
        )}
        {phase >= 1 && (
          <motion.p
            key="eq-wrong"
            className="text-2xl font-bold tabular-nums text-center"
            style={{ color: phase >= 7 ? RED : TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            1/2 + 1/3 = 2/5{" "}
            {phase >= 6 && phase < 8 ? "\u274C" : ""}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Narration */}
      <AnimatePresence mode="wait">
        {phase >= 2 && phase < 5 && (
          <motion.p
            key="nar1"
            className="text-sm text-center max-w-xs"
            style={{ color: TEXT_SEC }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Lots of people think you just add the tops and add the bottoms...
          </motion.p>
        )}
        {phase >= 5 && phase < 7 && (
          <motion.p
            key="nar2"
            className="text-sm text-center max-w-xs"
            style={{ color: TEXT_SEC }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Let&apos;s check. Here&apos;s 1/2 and 1/3...
          </motion.p>
        )}
        {phase >= 7 && phase < 8 && (
          <motion.p
            key="nar3"
            className="text-sm text-center max-w-xs font-semibold"
            style={{ color: TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Wait &mdash; 2/5 is{" "}
            <span style={{ color: RED, fontWeight: 700 }}>LESS</span> than 1/2
            alone! Adding 1/3 can&apos;t make it{" "}
            <span style={{ color: RED, fontWeight: 700 }}>SMALLER</span>!
          </motion.p>
        )}
        {phase >= 8 && phase < 9 && (
          <motion.p
            key="nar4"
            className="text-sm text-center max-w-xs font-semibold"
            style={{ color: EMERALD }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            The pieces need to be the{" "}
            <span style={{ fontWeight: 700 }}>SAME SIZE</span> first!
          </motion.p>
        )}
        {phase >= 9 && phase < 10 && (
          <motion.p
            key="nar5"
            className="text-2xl font-bold text-center tabular-nums"
            style={{ color: EMERALD }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
          >
            1/2 + 1/3 = 3/6 + 2/6 = 5/6
          </motion.p>
        )}
        {phase >= 10 && (
          <motion.p
            key="nar6"
            className="text-sm text-center max-w-xs"
            style={{ color: TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            To add fractions, you need the{" "}
            <span style={{ color: EMERALD, fontWeight: 700 }}>
              SAME-SIZED PIECES
            </span>
            . That&apos;s what this lesson is all about.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Fraction bars */}
      <div className="flex flex-col items-center gap-3">
        {phase >= 3 && phase < 8 && (
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING}
          >
            <FrBar
              denominator={2}
              shadedCount={1}
              width={barWidth}
              height={barH}
              shadedColor={INDIGO}
              clipSuffix="hook-half"
            />
          </motion.div>
        )}
        {phase >= 4 && phase < 8 && (
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING}
          >
            <FrBar
              denominator={3}
              shadedCount={1}
              width={barWidth}
              height={barH}
              shadedColor={VIOLET}
              clipSuffix="hook-third"
            />
          </motion.div>
        )}
        {phase >= 5 && phase < 8 && (
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING}
          >
            <FrBar
              denominator={5}
              shadedCount={2}
              width={barWidth}
              height={barH}
              shadedColor={RED}
              borderColor={phase >= 6 ? RED : BORDER}
              clipSuffix="hook-twofifths"
            />
          </motion.div>
        )}

        {/* After split: sixths */}
        {phase >= 8 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={SPRING}
            >
              <FrBar
                denominator={6}
                shadedCount={3}
                width={barWidth}
                height={barH}
                shadedColor={INDIGO}
                clipSuffix="hook-3of6"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...SPRING, delay: 0.2 }}
            >
              <FrBar
                denominator={6}
                shadedCount={2}
                width={barWidth}
                height={barH}
                shadedColor={VIOLET}
                clipSuffix="hook-2of6"
              />
            </motion.div>
            {phase >= 9 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING, delay: 0.4 }}
              >
                <FrBar
                  denominator={6}
                  shadedCount={5}
                  width={barWidth}
                  height={barH}
                  shadedColor={EMERALD}
                  clipSuffix="hook-5of6"
                />
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Continue button */}
      {canSkip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ContinueButton onClick={onComplete}>Continue</ContinueButton>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 2: SPATIAL EXPERIENCE
   ═══════════════════════════════════════════════════════════════════════ */

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [tab, setTab] = useState<0 | 1>(0);
  const [interactions, setInteractions] = useState(0);
  const tabSwitchCountRef = useRef(0);

  const inc = useCallback(() => setInteractions((i) => i + 1), []);

  const handleTabSwitch = useCallback(
    (t: 0 | 1) => {
      if (t !== tab) {
        setTab(t);
        if (tabSwitchCountRef.current < 2) {
          tabSwitchCountRef.current++;
          inc();
        }
      }
    },
    [tab, inc],
  );

  const tabBind = useDrag(
    ({ direction: [dx], velocity: [vx], cancel }) => {
      if (Math.abs(vx) > 0.3) {
        handleTabSwitch(dx > 0 ? 0 : 1);
        cancel();
      }
    },
    { axis: "x", filterTaps: true },
  );

  const progress = Math.min(interactions / MIN_INTERACTIONS, 1);

  return (
    <div className="flex flex-col items-center flex-1 gap-4 p-4 overflow-y-auto">
      {/* Tabs */}
      <div
        className="flex gap-2"
        {...(tabBind() as Record<string, unknown>)}
      >
        {(["Add / Subtract", "Multiply"] as const).map((lbl, i) => (
          <motion.button
            key={lbl}
            className="px-4 py-2 rounded-lg text-sm font-medium select-none"
            style={{
              minHeight: 44,
              background: tab === i ? INDIGO : UNSHADED,
              color: tab === i ? "#fff" : TEXT_SEC,
            }}
            onClick={() => handleTabSwitch(i as 0 | 1)}
            whileTap={{ scale: 0.95 }}
            aria-label={`${lbl} workspace`}
            aria-pressed={tab === i}
          >
            {lbl}
          </motion.button>
        ))}
      </div>

      {/* Workspace content */}
      <AnimatePresence mode="wait">
        {tab === 0 ? (
          <motion.div
            key="ws-add"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={SPRING_GENTLE}
          >
            <AddSubWorkspace onInteraction={inc} />
          </motion.div>
        ) : (
          <motion.div
            key="ws-mul"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={SPRING_GENTLE}
          >
            <AreaModelWorkspace onInteraction={inc} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <ContinueButton
        onClick={onComplete}
        disabled={progress < 1}
      >
        {progress < 1 ? "Keep exploring..." : "Continue"}
      </ContinueButton>
    </div>
  );
}

/* ── Add/Subtract Workspace ───────────────────────────────────────── */

function AddSubWorkspace({
  onInteraction,
}: {
  onInteraction: () => void;
}) {
  const [fracA, setFracA] = useState<Fraction>({
    numerator: 1,
    denominator: 2,
  });
  const [fracB, setFracB] = useState<Fraction>({
    numerator: 1,
    denominator: 3,
  });
  const [commonDenom, setCommonDenom] = useState<number | null>(null);
  const [convertedA, setConvertedA] = useState<Fraction | null>(null);
  const [convertedB, setConvertedB] = useState<Fraction | null>(null);
  const [result, setResult] = useState<Fraction | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const msgTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showMsg = useCallback((m: string) => {
    setMessage(m);
    clearTimeout(msgTimerRef.current);
    msgTimerRef.current = setTimeout(() => setMessage(null), 3000);
  }, []);

  const handleChangeFracA = useCallback(
    (f: Fraction) => {
      setFracA(f);
      setCommonDenom(null);
      setConvertedA(null);
      setConvertedB(null);
      setResult(null);
      onInteraction();
    },
    [onInteraction],
  );

  const handleChangeFracB = useCallback(
    (f: Fraction) => {
      setFracB(f);
      setCommonDenom(null);
      setConvertedA(null);
      setConvertedB(null);
      setResult(null);
      onInteraction();
    },
    [onInteraction],
  );

  const handleSplit = useCallback(() => {
    const cd = lcmOf(fracA.denominator, fracB.denominator);
    if (fracA.denominator === fracB.denominator) {
      showMsg("Already the same size!");
    } else {
      showMsg("Now the pieces are the same size!");
    }
    const mulA = cd / fracA.denominator;
    const mulB = cd / fracB.denominator;
    setCommonDenom(cd);
    setConvertedA({
      numerator: fracA.numerator * mulA,
      denominator: cd,
    });
    setConvertedB({
      numerator: fracB.numerator * mulB,
      denominator: cd,
    });
    setResult(null);
    onInteraction();
  }, [fracA, fracB, onInteraction, showMsg]);

  const sameD =
    commonDenom !== null || fracA.denominator === fracB.denominator;
  const effA = convertedA ?? fracA;
  const effB = convertedB ?? fracB;
  const canSubtract = sameD && effA.numerator >= effB.numerator;

  const handleCombine = useCallback(() => {
    if (!sameD) return;
    const d = effA.denominator;
    const n = effA.numerator + effB.numerator;
    setResult({ numerator: n, denominator: d });
    if (n > d) {
      const whole = Math.floor(n / d);
      const rem = n % d;
      showMsg(
        `More than 1 whole! ${n}/${d} = ${whole} and ${rem}/${d}.`,
      );
    }
    onInteraction();
  }, [sameD, effA, effB, onInteraction, showMsg]);

  const handleSeparate = useCallback(() => {
    if (!sameD) return;
    if (effA.numerator < effB.numerator) {
      showMsg("Fraction A must be \u2265 Fraction B to subtract.");
      return;
    }
    const d = effA.denominator;
    const n = effA.numerator - effB.numerator;
    setResult({ numerator: n, denominator: d });
    onInteraction();
  }, [sameD, effA, effB, onInteraction, showMsg]);

  const barWidth = 280;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      {/* Fraction A */}
      <FractionPicker
        fraction={fracA}
        onChange={handleChangeFracA}
        label="Fraction A"
        color={INDIGO}
      />
      <FrBar
        denominator={effA.denominator}
        shadedCount={effA.numerator}
        width={barWidth}
        height={44}
        shadedColor={INDIGO}
        clipSuffix="spa-a"
      />

      {/* Fraction B */}
      <FractionPicker
        fraction={fracB}
        onChange={handleChangeFracB}
        label="Fraction B"
        color={VIOLET}
      />
      <FrBar
        denominator={effB.denominator}
        shadedCount={effB.numerator}
        width={barWidth}
        height={44}
        shadedColor={VIOLET}
        clipSuffix="spa-b"
      />

      {/* Action Buttons */}
      <motion.button
        className="w-full max-w-xs rounded-lg px-4 py-3 text-sm font-medium select-none"
        style={{
          minHeight: 48,
          background: INDIGO,
          color: "#fff",
        }}
        onClick={handleSplit}
        whileTap={{ scale: 0.95 }}
        aria-label="Split both bars to common denominator"
      >
        Split to Same-Sized Pieces
      </motion.button>

      <div className="flex gap-2 w-full max-w-xs">
        <motion.button
          className="flex-1 rounded-lg px-3 py-3 text-sm font-medium select-none"
          style={{
            minHeight: 48,
            background: sameD ? EMERALD : UNSHADED,
            color: sameD ? "#fff" : TEXT_SEC,
            opacity: sameD ? 1 : 0.4,
          }}
          onClick={handleCombine}
          whileTap={sameD ? { scale: 0.95 } : undefined}
          aria-label="Combine fractions (add)"
          aria-disabled={!sameD}
        >
          Combine (Add)
        </motion.button>
        <motion.button
          className="flex-1 rounded-lg px-3 py-3 text-sm font-medium select-none"
          style={{
            minHeight: 48,
            background: canSubtract ? BLUE : UNSHADED,
            color: canSubtract ? "#fff" : TEXT_SEC,
            opacity: canSubtract ? 1 : 0.4,
          }}
          onClick={handleSeparate}
          whileTap={canSubtract ? { scale: 0.95 } : undefined}
          aria-label="Separate fractions (subtract)"
          aria-disabled={!canSubtract}
        >
          Separate (Sub)
        </motion.button>
      </div>

      {!sameD && (
        <p className="text-xs" style={{ color: AMBER }}>
          Split to same-sized pieces first!
        </p>
      )}

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.p
            className="text-sm font-medium text-center max-w-xs"
            style={{ color: EMERALD }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Result Bar */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
          >
            <FrBar
              denominator={result.denominator}
              shadedCount={Math.min(result.numerator, result.denominator)}
              width={barWidth}
              height={44}
              shadedColor={EMERALD}
              clipSuffix="spa-result"
            />
            {result.numerator > result.denominator && (
              <p
                className="text-sm text-center mt-1 font-bold tabular-nums"
                style={{ color: AMBER }}
              >
                {result.numerator}/{result.denominator} (improper)
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Area Model Workspace ─────────────────────────────────────────── */

function AreaModelWorkspace({
  onInteraction,
}: {
  onInteraction: () => void;
}) {
  const [fracA, setFracA] = useState<Fraction>({
    numerator: 1,
    denominator: 2,
  });
  const [fracB, setFracB] = useState<Fraction>({
    numerator: 1,
    denominator: 3,
  });
  const [productRevealed, setProductRevealed] = useState(false);

  const size = 240;
  const colW = size / fracA.denominator;
  const rowH = size / fracB.denominator;
  const productCells = fracA.numerator * fracB.numerator;
  const totalCells = fracA.denominator * fracB.denominator;

  const handleChangeFracA = useCallback(
    (f: Fraction) => {
      setFracA(f);
      setProductRevealed(false);
      onInteraction();
    },
    [onInteraction],
  );

  const handleChangeFracB = useCallback(
    (f: Fraction) => {
      setFracB(f);
      setProductRevealed(false);
      onInteraction();
    },
    [onInteraction],
  );

  const handleProductTap = useCallback(() => {
    setProductRevealed(true);
    onInteraction();
  }, [onInteraction]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <FractionPicker
        fraction={fracA}
        onChange={handleChangeFracA}
        label="Width (Fraction A)"
        color={INDIGO}
      />
      <FractionPicker
        fraction={fracB}
        onChange={handleChangeFracB}
        label="Height (Fraction B)"
        color={VIOLET}
      />

      {/* Area model SVG */}
      <svg
        width={size + 40}
        height={size + 40}
        viewBox={`-20 -20 ${size + 40} ${size + 40}`}
        role="img"
        aria-label={`Area model: ${fracA.numerator}/${fracA.denominator} times ${fracB.numerator}/${fracB.denominator}. Grid has ${totalCells} cells, ${productCells} are the product.`}
      >
        {/* Unit square background */}
        <rect
          x={0}
          y={0}
          width={size}
          height={size}
          fill={UNSHADED}
          stroke={BORDER}
          strokeWidth={2}
          rx={2}
        />

        {/* Horizontal shading (Fraction B rows) */}
        {fracB.numerator > 0 && (
          <rect
            x={0}
            y={0}
            width={size}
            height={fracB.numerator * rowH}
            fill={VIOLET}
            opacity={0.25}
          />
        )}

        {/* Vertical shading (Fraction A columns) */}
        {fracA.numerator > 0 && (
          <rect
            x={0}
            y={0}
            width={fracA.numerator * colW}
            height={size}
            fill={INDIGO}
            opacity={0.25}
          />
        )}

        {/* Product overlap */}
        {productCells > 0 && (
          <motion.rect
            x={0}
            y={0}
            width={fracA.numerator * colW}
            height={fracB.numerator * rowH}
            fill={PURPLE}
            opacity={0.6}
            role="button"
            tabIndex={0}
            aria-label={`Product region: ${productCells} out of ${totalCells} cells. Tap to reveal result.`}
            style={{ cursor: "pointer" }}
            onClick={handleProductTap}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") handleProductTap();
            }}
            whileTap={{ scale: 1.05 }}
            whileHover={{ opacity: 0.8 }}
          />
        )}

        {/* Vertical grid lines */}
        {Array.from({ length: fracA.denominator - 1 }, (_, i) => (
          <motion.line
            key={`vl-${i}`}
            x1={(i + 1) * colW}
            y1={0}
            x2={(i + 1) * colW}
            y2={size}
            stroke={BORDER}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...EASE, delay: i * 0.03 }}
          />
        ))}

        {/* Horizontal grid lines */}
        {Array.from({ length: fracB.denominator - 1 }, (_, i) => (
          <motion.line
            key={`hl-${i}`}
            x1={0}
            y1={(i + 1) * rowH}
            x2={size}
            y2={(i + 1) * rowH}
            stroke={BORDER}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...EASE, delay: i * 0.03 }}
          />
        ))}

        {/* Labels */}
        <text
          x={(fracA.numerator * colW) / 2}
          y={size + 16}
          textAnchor={"middle" as const}
          fill={INDIGO}
          fontSize={14}
          fontWeight={700}
        >
          {fracA.numerator}/{fracA.denominator}
        </text>
        <text
          x={-10}
          y={(fracB.numerator * rowH) / 2 + 4}
          textAnchor={"end" as const}
          fill={VIOLET}
          fontSize={14}
          fontWeight={700}
        >
          {fracB.numerator}/{fracB.denominator}
        </text>
      </svg>

      {/* Tap prompt or result */}
      <AnimatePresence mode="wait">
        {!productRevealed && productCells > 0 && (
          <motion.p
            key="prompt"
            className="text-sm text-center"
            style={{ color: TEXT_SEC }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Tap the purple region to see the product
          </motion.p>
        )}
        {productRevealed && (
          <motion.div
            key="result"
            className="text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p
              className="text-lg font-bold tabular-nums"
              style={{ color: PURPLE }}
            >
              {productCells} out of {totalCells} = {productCells}/
              {totalCells}
            </p>
            <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>
              {fracA.numerator}/{fracA.denominator} &times;{" "}
              {fracB.numerator}/{fracB.denominator} ={" "}
              {fracA.numerator * fracB.numerator}/
              {fracA.denominator * fracB.denominator}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 3: GUIDED DISCOVERY
   ═══════════════════════════════════════════════════════════════════════ */

interface DiscoveryPrompt {
  id: string;
  text: string;
  insight: string;
  buttonText: string;
  visual: ReactNode;
}

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [showInsight, setShowInsight] = useState(false);

  const barW = 260;
  const barH = 36;

  const prompts: DiscoveryPrompt[] = useMemo(
    () => [
      {
        id: "p1",
        text: "Look at the bars for 1/2 and 1/3. The pieces are different sizes. What happens if you try to count them together without making them the same size?",
        insight:
          "Exactly! You can\u2019t add pieces that are different sizes. It\u2019s like adding 1 apple + 1 orange and saying you have 2 \u2018appanges.\u2019 You need to convert to the same unit first.",
        buttonText: "I see it!",
        visual: (
          <div className="flex flex-col gap-3 items-center">
            <FrBar
              denominator={2}
              shadedCount={1}
              width={barW}
              height={barH}
              shadedColor={INDIGO}
              clipSuffix="disc-half"
            />
            <FrBar
              denominator={3}
              shadedCount={1}
              width={barW}
              height={barH}
              shadedColor={VIOLET}
              clipSuffix="disc-third"
            />
            <p
              className="text-xs text-center max-w-xs"
              style={{ color: AMBER }}
            >
              1/2-sized piece + 1/3-sized piece = ???
            </p>
          </div>
        ),
      },
      {
        id: "p2",
        text: "Now imagine splitting to same-sized pieces. Both bars become sixths. 1/2 becomes 3/6, and 1/3 becomes 2/6. The shaded area didn\u2019t change \u2014 we just cut the pieces smaller!",
        insight:
          "Now the pieces are the same size! Notice the SHADED AREA didn\u2019t change \u2014 we just cut the pieces smaller. Now you CAN count them together.",
        buttonText: "Got it!",
        visual: (
          <div className="flex flex-col gap-3 items-center">
            <FrBar
              denominator={6}
              shadedCount={3}
              width={barW}
              height={barH}
              shadedColor={INDIGO}
              clipSuffix="disc-3of6"
            />
            <FrBar
              denominator={6}
              shadedCount={2}
              width={barW}
              height={barH}
              shadedColor={VIOLET}
              clipSuffix="disc-2of6"
            />
            <p
              className="text-xs text-center"
              style={{ color: EMERALD }}
            >
              Both bars now have 6 equal parts!
            </p>
          </div>
        ),
      },
      {
        id: "p3",
        text: "Combine them! 3 sixths + 2 sixths = 5 sixths. Once the pieces are the SAME SIZE, adding is just counting: 3 + 2 = 5.",
        insight:
          "The denominator stays the same (still sixths). Only the numerators add. 3/6 + 2/6 = (3+2)/6 = 5/6.",
        buttonText: "Makes sense!",
        visual: (
          <div className="flex flex-col gap-3 items-center">
            <FrBar
              denominator={6}
              shadedCount={5}
              width={barW}
              height={barH}
              shadedColor={EMERALD}
              clipSuffix="disc-5of6"
            />
            <p
              className="text-lg font-bold tabular-nums text-center"
              style={{ color: TEXT }}
            >
              3/6 + 2/6 = 5/6
            </p>
          </div>
        ),
      },
      {
        id: "p4",
        text: "Now consider multiplication. In the area model, 1/2 \u00D7 1/3: a 2\u00D73 grid where only 1 out of 6 cells is the overlap. You did NOT need common denominators!",
        insight:
          "1/2 of the width times 1/3 of the height = 1/6 of the total area. You just multiplied 1\u00D71 = 1 for the top, and 2\u00D73 = 6 for the bottom. Multiplication does NOT need common denominators.",
        buttonText: "I see it!",
        visual: (
          <div className="flex flex-col gap-3 items-center">
            <svg
              width={180}
              height={180}
              viewBox="-4 -4 128 128"
              role="img"
              aria-label="Area model 1/2 times 1/3"
            >
              <rect
                x={0}
                y={0}
                width={120}
                height={120}
                fill={UNSHADED}
                stroke={BORDER}
                strokeWidth={2}
              />
              <line
                x1={60}
                y1={0}
                x2={60}
                y2={120}
                stroke={BORDER}
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={40}
                x2={120}
                y2={40}
                stroke={BORDER}
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={80}
                x2={120}
                y2={80}
                stroke={BORDER}
                strokeWidth={1}
              />
              <rect
                x={0}
                y={0}
                width={120}
                height={40}
                fill={VIOLET}
                opacity={0.25}
              />
              <rect
                x={0}
                y={0}
                width={60}
                height={120}
                fill={INDIGO}
                opacity={0.25}
              />
              <rect
                x={0}
                y={0}
                width={60}
                height={40}
                fill={PURPLE}
                opacity={0.6}
              />
            </svg>
            <p
              className="text-sm font-bold tabular-nums"
              style={{ color: PURPLE }}
            >
              1 &times; 1 / (2 &times; 3) = 1/6
            </p>
          </div>
        ),
      },
      {
        id: "p5",
        text: "Try 2/3 \u00D7 3/4. The area model shows 6 purple cells out of 12 total = 6/12 = 1/2. The answer is SMALLER than both 2/3 and 3/4!",
        insight:
          "When you multiply two fractions less than 1, the result is always smaller. You\u2019re taking a fraction OF a fraction \u2014 a piece of a piece.",
        buttonText: "That's surprising!",
        visual: (
          <div className="flex flex-col gap-3 items-center">
            <svg
              width={180}
              height={180}
              viewBox="-4 -4 128 128"
              role="img"
              aria-label="Area model 2/3 times 3/4"
            >
              <rect
                x={0}
                y={0}
                width={120}
                height={120}
                fill={UNSHADED}
                stroke={BORDER}
                strokeWidth={2}
              />
              <line
                x1={40}
                y1={0}
                x2={40}
                y2={120}
                stroke={BORDER}
                strokeWidth={1}
              />
              <line
                x1={80}
                y1={0}
                x2={80}
                y2={120}
                stroke={BORDER}
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={30}
                x2={120}
                y2={30}
                stroke={BORDER}
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={60}
                x2={120}
                y2={60}
                stroke={BORDER}
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={90}
                x2={120}
                y2={90}
                stroke={BORDER}
                strokeWidth={1}
              />
              <rect
                x={0}
                y={0}
                width={120}
                height={90}
                fill={VIOLET}
                opacity={0.25}
              />
              <rect
                x={0}
                y={0}
                width={80}
                height={120}
                fill={INDIGO}
                opacity={0.25}
              />
              <rect
                x={0}
                y={0}
                width={80}
                height={90}
                fill={PURPLE}
                opacity={0.6}
              />
            </svg>
            <p
              className="text-sm font-bold tabular-nums"
              style={{ color: PURPLE }}
            >
              6 out of 12 = 6/12 = 1/2
            </p>
            <p className="text-xs" style={{ color: AMBER }}>
              1/2 is SMALLER than both 2/3 and 3/4!
            </p>
          </div>
        ),
      },
      {
        id: "p6",
        text: "Final challenge: You have 3 whole chocolate bars. Each serving is 1/4 of a bar. How many servings? Each bar has 4 quarters, so 3 bars = 12 servings!",
        insight:
          "Dividing by a fraction LESS than 1 gives you MORE, not less. 3 \u00F7 (1/4) = 3 \u00D7 4 = 12. The \u2018flip and multiply\u2019 rule isn\u2019t magic \u2014 it\u2019s asking \u2018how many groups of this size fit in?\u2019",
        buttonText: "Mind blown!",
        visual: (
          <div className="flex flex-col gap-3 items-center">
            {[0, 1, 2].map((barIdx) => (
              <div key={barIdx} className="flex gap-1">
                {[0, 1, 2, 3].map((q) => (
                  <motion.div
                    key={q}
                    className="flex items-center justify-center rounded text-xs font-bold"
                    style={{
                      width: 56,
                      height: 36,
                      minHeight: 36,
                      background: [INDIGO, VIOLET, PURPLE, CYAN][
                        q % 4
                      ] ?? INDIGO,
                      color: "#fff",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (barIdx * 4 + q) * 0.08,
                      ...SPRING,
                    }}
                  >
                    {barIdx * 4 + q + 1}
                  </motion.div>
                ))}
              </div>
            ))}
            <p
              className="text-lg font-bold"
              style={{ color: EMERALD }}
            >
              12 servings!
            </p>
            <p className="text-xs" style={{ color: TEXT_SEC }}>
              3 &divide; (1/4) = 3 &times; 4 = 12
            </p>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const currentPrompt = prompts[promptIdx]!;
  const isLast = promptIdx >= prompts.length - 1;

  const handleAck = useCallback(() => {
    if (!showInsight) {
      setShowInsight(true);
      return;
    }
    if (isLast) {
      onComplete();
    } else {
      setPromptIdx((i) => i + 1);
      setShowInsight(false);
    }
  }, [showInsight, isLast, onComplete]);

  return (
    <div className="flex flex-col items-center flex-1 gap-4 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Guided Discovery
      </h2>

      {/* Progress */}
      <div className="flex gap-1.5">
        {prompts.map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background:
                i < promptIdx
                  ? EMERALD
                  : i === promptIdx
                    ? INDIGO
                    : UNSHADED,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPrompt.id}
          className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4 bg-nm-bg-secondary border border-nm-bg-surface"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={SPRING_GENTLE}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: TEXT }}
          >
            {currentPrompt.text}
          </p>

          <div className="flex justify-center py-2">
            {currentPrompt.visual}
          </div>

          {showInsight && (
            <motion.div
              className="rounded-lg p-3 text-sm leading-relaxed"
              style={{
                background: `${BG}cc`,
                borderLeft: `3px solid ${EMERALD}`,
                color: TEXT,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentPrompt.insight}
            </motion.div>
          )}

          <div className="flex justify-center">
            <ContinueButton onClick={handleAck}>
              {!showInsight
                ? currentPrompt.buttonText
                : isLast
                  ? "Continue"
                  : "Next"}
            </ContinueButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 4: SYMBOL BRIDGE
   ═══════════════════════════════════════════════════════════════════════ */

function SymbolBridgeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);

  const isLast = step >= 2;

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete();
    } else {
      setStep((s) => s + 1);
    }
  }, [isLast, onComplete]);

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Symbol Bridge
      </h2>

      {/* Steps indicator */}
      <div className="flex gap-2">
        {["Add/Sub", "Multiply", "Divide"].map((lbl, i) => (
          <span
            key={lbl}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: step === i ? INDIGO : UNSHADED,
              color: step === i ? "#fff" : TEXT_SEC,
            }}
          >
            {lbl}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s0"
            className="w-full max-w-md rounded-xl p-5 flex flex-col gap-5 bg-nm-bg-secondary border border-nm-bg-surface"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={SPRING_GENTLE}
          >
            <p
              className="text-base font-semibold"
              style={{ color: TEXT }}
            >
              Addition &amp; Subtraction
            </p>
            <div className="flex flex-col gap-3 items-center">
              <FrBar
                denominator={6}
                shadedCount={3}
                width={240}
                height={32}
                shadedColor={INDIGO}
                clipSuffix="sym-3of6"
              />
              <FrBar
                denominator={6}
                shadedCount={2}
                width={240}
                height={32}
                shadedColor={VIOLET}
                clipSuffix="sym-2of6"
              />
              <FrBar
                denominator={6}
                shadedCount={5}
                width={240}
                height={32}
                shadedColor={EMERALD}
                clipSuffix="sym-5of6"
              />
            </div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-lg font-bold tabular-nums"
                style={{ color: TEXT }}
              >
                <span style={{ color: INDIGO }}>3/6</span>
                {" + "}
                <span style={{ color: VIOLET }}>2/6</span>
                {" = "}
                <span style={{ color: AMBER }}>(3+2)</span>
                <span style={{ color: BLUE }}>/6</span>
                {" = "}
                <span style={{ color: EMERALD }}>5/6</span>
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg p-3 text-sm"
              style={{ background: `${BG}99`, color: TEXT_SEC }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <p className="font-bold" style={{ color: TEXT }}>
                a/b + c/b = (a+c)/b
              </p>
              <p className="mt-1">
                When the denominators are the same, just add the
                numerators.
              </p>
              <p className="font-bold mt-2" style={{ color: TEXT }}>
                a/b &minus; c/b = (a&minus;c)/b
              </p>
              <p className="mt-1">Subtraction works the same way.</p>
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="s1"
            className="w-full max-w-md rounded-xl p-5 flex flex-col gap-5 bg-nm-bg-secondary border border-nm-bg-surface"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={SPRING_GENTLE}
          >
            <p
              className="text-base font-semibold"
              style={{ color: TEXT }}
            >
              Multiplication
            </p>
            <div className="flex justify-center">
              <svg
                width={180}
                height={180}
                viewBox="-4 -4 128 128"
                role="img"
                aria-label="Area model 1/2 times 1/3 = 1/6"
              >
                <rect
                  x={0}
                  y={0}
                  width={120}
                  height={120}
                  fill={UNSHADED}
                  stroke={BORDER}
                  strokeWidth={2}
                />
                <line
                  x1={60}
                  y1={0}
                  x2={60}
                  y2={120}
                  stroke={BORDER}
                  strokeWidth={1}
                />
                <line
                  x1={0}
                  y1={40}
                  x2={120}
                  y2={40}
                  stroke={BORDER}
                  strokeWidth={1}
                />
                <line
                  x1={0}
                  y1={80}
                  x2={120}
                  y2={80}
                  stroke={BORDER}
                  strokeWidth={1}
                />
                <rect
                  x={0}
                  y={0}
                  width={120}
                  height={40}
                  fill={VIOLET}
                  opacity={0.25}
                />
                <rect
                  x={0}
                  y={0}
                  width={60}
                  height={120}
                  fill={INDIGO}
                  opacity={0.25}
                />
                <rect
                  x={0}
                  y={0}
                  width={60}
                  height={40}
                  fill={PURPLE}
                  opacity={0.6}
                />
              </svg>
            </div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-lg font-bold tabular-nums"
                style={{ color: TEXT }}
              >
                <span style={{ color: INDIGO }}>1/2</span>
                {" \u00D7 "}
                <span style={{ color: VIOLET }}>1/3</span>
                {" = "}
                <span style={{ color: PURPLE }}>(1{"\u00D7"}1)</span>/
                <span style={{ color: BLUE }}>(2{"\u00D7"}3)</span>
                {" = "}
                <span style={{ color: PURPLE }}>1/6</span>
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg p-3 text-sm"
              style={{ background: `${BG}99`, color: TEXT_SEC }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <p className="font-bold" style={{ color: TEXT }}>
                a/b &times; c/d = (a &times; c) / (b &times; d)
              </p>
              <p className="mt-1">
                Multiply tops. Multiply bottoms. No common denominator
                needed.
              </p>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            className="w-full max-w-md rounded-xl p-5 flex flex-col gap-5 bg-nm-bg-secondary border border-nm-bg-surface"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={SPRING_GENTLE}
          >
            <p
              className="text-base font-semibold"
              style={{ color: TEXT }}
            >
              Division
            </p>
            {/* 3 wholes split into quarters */}
            <div className="flex flex-col gap-2 items-center">
              {[0, 1, 2].map((idx) => (
                <FrBar
                  key={idx}
                  denominator={4}
                  shadedCount={4}
                  width={240}
                  height={28}
                  shadedColor={
                    [INDIGO, VIOLET, PURPLE][idx % 3] ?? INDIGO
                  }
                  clipSuffix={`sym-div-${idx}`}
                />
              ))}
              <p
                className="text-sm font-semibold"
                style={{ color: AMBER }}
              >
                12 quarter-sized servings
              </p>
            </div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-lg font-bold tabular-nums"
                style={{ color: TEXT }}
              >
                3 &divide; (1/4) = 3 &times;{" "}
                <motion.span
                  style={{
                    color: CYAN,
                    display: "inline-block",
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  (4/1)
                </motion.span>{" "}
                = 12
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg p-3 text-sm"
              style={{ background: `${BG}99`, color: TEXT_SEC }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="font-bold" style={{ color: TEXT }}>
                a/b &divide; c/d = a/b &times; d/c
              </p>
              <p className="mt-1">
                To divide by a fraction, flip it and multiply.
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: TEXT_SEC }}
              >
                Because dividing asks &quot;how many groups of this
                size fit?&quot; Flipping converts the question to
                multiplication.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinueButton onClick={handleNext}>
        {isLast ? "Continue" : "Next Step"}
      </ContinueButton>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 5: REAL WORLD ANCHOR
   ═══════════════════════════════════════════════════════════════════════ */

interface RWCard {
  title: string;
  icon: string;
  text: string;
  math: string;
  connection: string;
}

const RW_CARDS: RWCard[] = [
  {
    title: "Baking",
    icon: "\uD83C\uDF75",
    text: "A recipe calls for 2/3 cup of sugar. You want to make a double batch.",
    math: "2/3 + 2/3 = 4/3 = 1 and 1/3 cups",
    connection: "Addition with like denominators, improper fraction result.",
  },
  {
    title: "Pizza Sharing",
    icon: "\uD83C\uDF55",
    text: "3 friends share 3/4 of a pizza equally. How much does each get?",
    math: "3/4 \u00F7 3 = 3/4 \u00D7 1/3 = 1/4",
    connection: "Division of a fraction by a whole number.",
  },
  {
    title: "Garden Area",
    icon: "\uD83C\uDF3B",
    text: "A garden is 3/4 yard long and 2/3 yard wide. What fraction of a square yard?",
    math: "3/4 \u00D7 2/3 = 6/12 = 1/2 sq yard",
    connection: "Multiplication with area model, simplification.",
  },
  {
    title: "Running a Race",
    icon: "\uD83C\uDFC3",
    text: "You\u2019ve run 5/8 of a race. Your friend has run 1/4. How much further ahead are you?",
    math: "5/8 \u2212 2/8 = 3/8 of the race ahead",
    connection:
      "Subtraction with unlike denominators, common denominator conversion.",
  },
];

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  const [cardIdx, setCardIdx] = useState(0);

  const bind = useDrag(
    ({ direction: [dx], velocity: [vx], cancel }) => {
      if (Math.abs(vx) > 0.4) {
        setCardIdx((i) =>
          clamp(i + (dx > 0 ? -1 : 1), 0, RW_CARDS.length - 1),
        );
        cancel();
      }
    },
    { axis: "x", filterTaps: true },
  );

  const card = RW_CARDS[cardIdx]!;

  return (
    <div className="flex flex-col items-center flex-1 gap-5 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Real World
      </h2>

      {/* Pagination dots */}
      <div className="flex gap-2">
        {RW_CARDS.map((_, i) => (
          <button
            key={i}
            className="rounded-full"
            style={{
              width: 10,
              height: 10,
              minWidth: 10,
              minHeight: 44,
              padding: "17px 0",
              background: "transparent",
            }}
            onClick={() => setCardIdx(i)}
            aria-label={`Card ${i + 1}`}
          >
            <span
              className="block rounded-full"
              style={{
                width: 10,
                height: 10,
                background:
                  i === cardIdx ? INDIGO : UNSHADED,
              }}
            />
          </button>
        ))}
      </div>

      <div
        {...(bind() as Record<string, unknown>)}
        className="touch-none w-full flex justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={card.title}
            className="w-full max-w-sm rounded-xl p-5 flex flex-col gap-4 bg-nm-bg-secondary border border-nm-bg-surface"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={SPRING_GENTLE}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-2xl"
                role="img"
                aria-hidden="true"
              >
                {card.icon}
              </span>
              <span
                className="text-base font-semibold"
                style={{ color: TEXT }}
              >
                {card.title}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: TEXT }}
            >
              {card.text}
            </p>
            <div
              className="rounded-lg p-3"
              style={{
                background: `${BG}cc`,
                borderLeft: `3px solid ${INDIGO}`,
              }}
            >
              <p
                className="text-base font-bold tabular-nums"
                style={{ color: INDIGO }}
              >
                {card.math}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: TEXT_SEC }}
              >
                {card.connection}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex gap-3">
        <motion.button
          className="rounded-lg px-4 py-2 text-sm font-medium select-none"
          style={{
            minHeight: 44,
            minWidth: 44,
            background: UNSHADED,
            color: cardIdx > 0 ? TEXT : TEXT_SEC,
            opacity: cardIdx > 0 ? 1 : 0.4,
          }}
          onClick={() => cardIdx > 0 && setCardIdx(cardIdx - 1)}
          whileTap={cardIdx > 0 ? { scale: 0.95 } : undefined}
          aria-label="Previous card"
          aria-disabled={cardIdx === 0}
        >
          &larr; Prev
        </motion.button>
        <motion.button
          className="rounded-lg px-4 py-2 text-sm font-medium select-none"
          style={{
            minHeight: 44,
            minWidth: 44,
            background: UNSHADED,
            color:
              cardIdx < RW_CARDS.length - 1 ? TEXT : TEXT_SEC,
            opacity: cardIdx < RW_CARDS.length - 1 ? 1 : 0.4,
          }}
          onClick={() =>
            cardIdx < RW_CARDS.length - 1 &&
            setCardIdx(cardIdx + 1)
          }
          whileTap={
            cardIdx < RW_CARDS.length - 1
              ? { scale: 0.95 }
              : undefined
          }
          aria-label="Next card"
          aria-disabled={cardIdx === RW_CARDS.length - 1}
        >
          Next &rarr;
        </motion.button>
      </div>

      <ContinueButton onClick={onComplete}>Continue</ContinueButton>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 6: PRACTICE
   ═══════════════════════════════════════════════════════════════════════ */

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [pi, setPi] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [ok, setOk] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const prob = PROBLEMS[pi]!;
  const last = pi === PROBLEMS.length - 1;

  const handleSubmit = useCallback(() => {
    if (choice === null) return;
    const correct =
      prob.options.find((o) => o.id === choice)?.correct ?? false;
    setOk(correct);
    setSubmitted(true);
    setResults((r) => [...r, correct]);
  }, [choice, prob]);

  const handleNext = useCallback(() => {
    if (last) {
      onComplete();
      return;
    }
    setPi((i) => i + 1);
    setChoice(null);
    setSubmitted(false);
    setOk(false);
  }, [last, onComplete]);

  const feedbackText = useMemo((): string => {
    if (!submitted || choice === null) return "";
    if (ok) return prob.feedback["correct"] ?? "";
    return prob.feedback[choice] ?? prob.feedback["correct"] ?? "";
  }, [submitted, choice, ok, prob.feedback]);

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
          className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4 bg-nm-bg-secondary border border-nm-bg-surface"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={SPRING_GENTLE}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: TEXT }}
          >
            {prob.stem}
          </p>

          {/* Multiple choice options */}
          <div className="flex flex-col gap-2">
            {prob.options.map((o) => {
              const isSelected = choice === o.id;
              const showCorrect = submitted && o.correct;
              const showWrong =
                submitted && isSelected && !o.correct;

              return (
                <motion.button
                  key={o.id}
                  className="text-left px-4 py-3 rounded-lg text-sm border transition-colors"
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
                  onClick={() => !submitted && setChoice(o.id)}
                  disabled={submitted}
                  whileTap={
                    !submitted ? { scale: 0.98 } : undefined
                  }
                  aria-label={`Option ${o.id}: ${o.text}`}
                  aria-pressed={isSelected}
                >
                  <span
                    className="font-semibold mr-2"
                    style={{ color: TEXT_SEC }}
                  >
                    {o.id.toUpperCase()}.
                  </span>
                  {o.text}
                  {showCorrect && (
                    <span
                      className="ml-2"
                      style={{ color: EMERALD }}
                    >
                      {"\u2713"}
                    </span>
                  )}
                  {showWrong && (
                    <span className="ml-2" style={{ color: RED }}>
                      {"\u2717"}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
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
                disabled={choice === null}
              >
                Submit
              </ContinueButton>
            ) : (
              <ContinueButton onClick={handleNext}>
                {last
                  ? "Continue to Reflection"
                  : "Next \u2192"}
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

function ReflectionStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const minChars = 30;

  const handleSubmit = useCallback(() => {
    if (text.trim().length < minChars) return;
    const lo = text.toLowerCase();
    let s = 1;
    if (/common\s*denominator|same.?sized?\s*pieces?|same\s*size/.test(lo))
      s++;
    if (/area\s*model|rectangle|grid|overlap/.test(lo)) s++;
    if (/numerator|denominator|top|bottom/.test(lo)) s++;
    if (/multiply|multiplication|fraction\s*of|piece\s*of/.test(lo))
      s++;
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
      return "Excellent explanation! You clearly understand why common denominators are needed for addition but not multiplication.";
    if (score >= 3)
      return "Good understanding! You captured the core idea. Try also explaining how the area model shows why multiplication is different.";
    if (score >= 2)
      return "Nice start! Explain more about what makes addition and multiplication different for fractions.";
    return "Keep exploring! Think about why same-sized pieces matter for addition but not for the area model.";
  }, [score, skipped]);

  return (
    <div className="flex flex-col items-center flex-1 gap-6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold" style={{ color: TEXT }}>
        Reflection
      </h2>

      <div
        className="w-full max-w-md rounded-xl p-5 flex flex-col gap-4 bg-nm-bg-secondary border border-nm-bg-surface"
      >
        <p
          className="text-base font-medium leading-relaxed"
          style={{ color: TEXT }}
        >
          Explain WHY you need common denominators to add fractions,
          but NOT to multiply them. Use the fraction bars or area
          model in your explanation.
        </p>

        <textarea
          className="w-full p-3 rounded-lg text-sm resize-y focus:outline-none"
          style={{
            minHeight: 120,
            background: BG,
            border: `1px solid ${submitted ? INDIGO : BORDER}`,
            color: TEXT,
          }}
          placeholder="Think about the fraction bars for addition and the area model for multiplication. What's different about how they work?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
          aria-label="Reflection text"
        />

        <div className="flex justify-between items-center">
          <p
            className="text-xs tabular-nums"
            style={{
              color:
                text.length >= minChars ? EMERALD : TEXT_SEC,
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
            {/* Stars */}
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

export function FractionOpsLesson({ onComplete }: FractionOpsLessonProps) {
  return (
    <LessonShell title="NO-2.3 Fraction Operations" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onComplete={advance} />;
          case "spatial": return <SpatialStage onComplete={advance} />;
          case "discovery": return <DiscoveryStage onComplete={advance} />;
          case "symbol": return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld": return <RealWorldStage onComplete={advance} />;
          case "practice": return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={onComplete ?? (() => {})} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
