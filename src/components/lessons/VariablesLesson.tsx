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
import {
  motion,
  AnimatePresence,
} from "framer-motion";
// @use-gesture/react available if drag interactions are added later

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface VariablesLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TOKEN ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.surface;
const ELEVATED = colors.bg.elevated;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;
const WARNING = colors.functional.warning;

const SPRING = springs.default;
const SPRING_POP = springs.pop;
const SPRING_BOUNCY = springs.bouncy;
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC THEME
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  variable: colors.accent.violet,
  variableFill: "#a78bfa33",
  coefficient: "#f59e0b",
  coefficientFill: "#f59e0b33",
  constant: colors.accent.cyan,
  constantFill: "#22d3ee33",
  output: colors.accent.emerald,
  outputFill: "#34d39933",
  primary: "#8b5cf6",
  primaryHover: "#7c3aed",
  textPrimary: "#f8fafc",
  textSecondary: "#e2e8f0",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/VariablesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));    // text appears
    timers.push(setTimeout(() => setPhase(2), 1200));   // mystery box
    timers.push(setTimeout(() => setPhase(3), 2000));   // gear 1
    timers.push(setTimeout(() => setPhase(4), 2800));   // gear 2
    timers.push(setTimeout(() => setPhase(5), 3600));   // result
    timers.push(setTimeout(() => setPhase(6), 4200));   // description
    timers.push(setTimeout(() => setPhase(7), 4800));   // question
    timers.push(setTimeout(() => setPhase(8), 5500));   // reveal ?->4
    timers.push(setTimeout(() => setPhase(9), 6300));   // chain animation
    timers.push(setTimeout(() => setPhase(10), 7000));  // summary
    timers.push(setTimeout(() => setPhase(11), 7500));  // continue button
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 11)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 640 }}
        aria-live="polite"
      >
        {/* Title text */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              key="hook-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center italic"
              style={{
                color: THEME.textPrimary,
                fontSize: "clamp(20px, 5vw, 32px)",
              }}
            >
              I&apos;m thinking of a number...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Machine SVG */}
        <svg
          viewBox="0 0 800 300"
          className="mx-auto w-full"
          style={{ maxWidth: 600 }}
          aria-label="Function machine: mystery number goes through multiply by 2, then add 3, to get 11"
        >
          {/* Mystery box */}
          {phase >= 2 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING_POP}
            >
              <rect
                x={120}
                y={110}
                width={80}
                height={80}
                rx={16}
                fill="#8b5cf620"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
              {/* ? or 4 */}
              {phase < 8 ? (
                <motion.text
                  x={160}
                  y={160}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill="#8b5cf6"
                  fontSize={48}
                  fontWeight={700}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ?
                </motion.text>
              ) : (
                <motion.text
                  x={160}
                  y={160}
                  textAnchor={"middle" as const}
                  dominantBaseline="central"
                  fill={THEME.variable}
                  fontSize={48}
                  fontWeight={700}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING_POP}
                >
                  4
                </motion.text>
              )}
            </motion.g>
          )}

          {/* Arrow 1 */}
          {phase >= 3 && (
            <motion.line
              x1={200}
              y1={150}
              x2={260}
              y2={150}
              stroke={MUTED}
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Gear 1: x2 */}
          {phase >= 3 && (
            <motion.g
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={SPRING}
            >
              <motion.circle
                cx={310}
                cy={150}
                r={28}
                fill="#f59e0b20"
                stroke={THEME.coefficient}
                strokeWidth={2}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
              />
              <text
                x={310}
                y={150}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={THEME.coefficient}
                fontSize={20}
                fontWeight={700}
              >
                x2
              </text>
            </motion.g>
          )}

          {/* Arrow 2 */}
          {phase >= 4 && (
            <motion.line
              x1={338}
              y1={150}
              x2={398}
              y2={150}
              stroke={MUTED}
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Gear 2: +3 */}
          {phase >= 4 && (
            <motion.g
              initial={{ scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={SPRING}
            >
              <motion.circle
                cx={448}
                cy={150}
                r={28}
                fill="#22d3ee20"
                stroke={THEME.constant}
                strokeWidth={2}
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
              />
              <text
                x={448}
                y={150}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={THEME.constant}
                fontSize={20}
                fontWeight={700}
              >
                +3
              </text>
            </motion.g>
          )}

          {/* Arrow 3 */}
          {phase >= 5 && (
            <motion.line
              x1={476}
              y1={150}
              x2={536}
              y2={150}
              stroke={MUTED}
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Result box */}
          {phase >= 5 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={FADE}
            >
              <rect
                x={560}
                y={120}
                width={80}
                height={60}
                rx={12}
                fill="#34d39920"
                stroke={THEME.output}
                strokeWidth={2}
              />
              <motion.text
                x={600}
                y={150}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={THEME.output}
                fontSize={40}
                fontWeight={700}
                style={{ fontVariantNumeric: "tabular-nums" }}
                animate={
                  phase >= 9 ? { scale: [1, 1.15, 1] } : {}
                }
                transition={{ duration: 0.3 }}
              >
                11
              </motion.text>
            </motion.g>
          )}

          {/* Calculation labels during reveal */}
          {phase >= 9 && (
            <>
              <motion.text
                x={310}
                y={108}
                textAnchor={"middle" as const}
                fill={THEME.coefficient}
                fontSize={14}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.1, 0.7, 1] }}
              >
                4 x 2 = 8
              </motion.text>
              <motion.text
                x={448}
                y={108}
                textAnchor={"middle" as const}
                fill={THEME.constant}
                fontSize={14}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.2, 0.3, 0.8, 1],
                }}
              >
                8 + 3 = 11
              </motion.text>
            </>
          )}
        </svg>

        {/* Description text */}
        <AnimatePresence>
          {phase >= 6 && (
            <motion.p
              key="hook-desc"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-4 text-center"
              style={{ color: THEME.textSecondary, fontSize: 18 }}
            >
              I double it and add 3, and I get 11.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 7 && (
            <motion.p
              key="hook-q"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-2 text-center font-semibold"
              style={{ color: THEME.textPrimary, fontSize: 20 }}
            >
              What&apos;s my number?
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 10 && (
            <motion.p
              key="hook-reveal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="mt-3 text-center font-semibold"
              style={{ color: SUCCESS, fontSize: 18 }}
            >
              The mystery number was 4!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Continue */}
      {phase >= 11 && (
        <ContinueButton onClick={onComplete} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE (Function Machine + Expression Builder)
// ═══════════════════════════════════════════════════════════════════════════

const MACHINE_RULE = { multiply: 2, add: 3 };
const INPUT_CHIPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -2];

function evaluateMachine(input: number): {
  intermediate: number;
  output: number;
} {
  const intermediate = input * MACHINE_RULE.multiply;
  const output = intermediate + MACHINE_RULE.add;
  return { intermediate, output };
}

interface HistoryEntry {
  input: number;
  output: number;
}

// Expression builder tile types
type TileKind = "variable" | "number" | "operator";

interface BuilderTile {
  id: string;
  label: string;
  kind: TileKind;
}

const BUILDER_TILES: readonly BuilderTile[] = [
  { id: "x", label: "x", kind: "variable" },
  { id: "2", label: "2", kind: "number" },
  { id: "3", label: "3", kind: "number" },
  { id: "5", label: "5", kind: "number" },
  { id: "7", label: "7", kind: "number" },
  { id: "plus", label: "+", kind: "operator" },
  { id: "minus", label: "-", kind: "operator" },
  { id: "times", label: "*", kind: "operator" },
] as const;

function tileColor(kind: TileKind): string {
  switch (kind) {
    case "variable":
      return THEME.primary;
    case "number":
      return THEME.output;
    case "operator":
      return THEME.coefficient;
  }
}

function tileColorFill(kind: TileKind): string {
  switch (kind) {
    case "variable":
      return "#8b5cf620";
    case "number":
      return "#34d39920";
    case "operator":
      return "#f59e0b20";
  }
}

// Check if expression builder arrangement is correct: 2 * x + 3 or x * 2 + 3
function isCorrectExpression(slots: ReadonlyArray<string | null>): boolean {
  const labels = slots
    .map((id) => {
      if (!id) return null;
      const tile = BUILDER_TILES.find((t) => t.id === id);
      return tile ? tile.label : null;
    })
    .filter((l): l is string => l !== null);

  const expr = labels.join("");
  // Accept: 2*x+3, x*2+3, 2x+3 (tile ids)
  const valid = ["2*x+3", "x*2+3", "2x+3"];
  const tileIds = slots.filter((s): s is string => s !== null).join("");
  const validIds = ["times,x,plus,3", "x,times,2,plus,3", "2,times,x,plus,3"];

  // Check using the slot ids directly
  const filled = slots.filter((s): s is string => s !== null);
  if (filled.length < 3) return false;

  // Build the expression string from labels
  const exprStr = filled
    .map((id) => BUILDER_TILES.find((t) => t.id === id)?.label ?? "")
    .join("");

  // All accepted forms
  if (
    exprStr === "2*x+3" ||
    exprStr === "x*2+3" ||
    exprStr === "2x+3"
  )
    return true;

  // Also check without explicit multiply: pieces are 2, x, +, 3 in some order
  // The rule is 2x+3, so we accept: [2][x][+][3] or [x][2][+][3]
  // This means the first two slots should have 2 and x (in any order), slot 3 = +, slot 4 = 3
  // Or: slots form something equivalent
  const idStr = filled.join(",");
  if (
    idStr === "2,x,plus,3" ||
    idStr === "x,2,plus,3" ||
    idStr === "2,times,x,plus,3" ||
    idStr === "x,times,2,plus,3"
  )
    return true;

  return false;
}

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingNumber, setProcessingNumber] = useState<number | null>(null);
  const [processingPhase, setProcessingPhase] = useState(0);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderSlots, setBuilderSlots] = useState<
    [string | null, string | null, string | null, string | null]
  >([null, null, null, null]);
  const [builderChecked, setBuilderChecked] = useState(false);
  const [builderCorrect, setBuilderCorrect] = useState(false);
  const [hasAttemptedBuilder, setHasAttemptedBuilder] = useState(false);
  const [draggedChip, setDraggedChip] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [draggingTile, setDraggingTile] = useState<string | null>(null);
  const [tileDragPos, setTileDragPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const inputQueueRef = useRef<number[]>([]);

  const uniqueInputs = useMemo(
    () => new Set(history.map((h) => h.input)).size,
    [history],
  );

  // Show builder after 5 unique machine inputs
  useEffect(() => {
    if (uniqueInputs >= 5 && !showBuilder) {
      setShowBuilder(true);
    }
  }, [uniqueInputs, showBuilder]);

  const canContinue =
    interactionCount >= 8 && hasAttemptedBuilder;

  const processInput = useCallback(
    (num: number) => {
      if (isProcessing) {
        // queue it (max 2)
        if (inputQueueRef.current.length < 2) {
          inputQueueRef.current.push(num);
        }
        return;
      }

      setIsProcessing(true);
      setProcessingNumber(num);
      setProcessingPhase(1);
      setInteractionCount((c) => c + 1);

      const { intermediate, output } = evaluateMachine(num);

      // Phase 1: number enters (0.3s)
      // Phase 2: multiply (0.8s)
      // Phase 3: add (1.3s)
      // Phase 4: output (1.8s)
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(
        setTimeout(() => setProcessingPhase(2), 600),
      );
      timers.push(
        setTimeout(() => setProcessingPhase(3), 1200),
      );
      timers.push(
        setTimeout(() => setProcessingPhase(4), 1800),
      );
      timers.push(
        setTimeout(() => {
          setHistory((h) => [...h, { input: num, output }]);
          setProcessingNumber(null);
          setProcessingPhase(0);
          setIsProcessing(false);

          // Process queue
          const next = inputQueueRef.current.shift();
          if (next !== undefined) {
            // Small delay before processing next
            setTimeout(() => processInput(next), 300);
          }
        }, 2300),
      );

      return () => timers.forEach(clearTimeout);
    },
    [isProcessing],
  );

  const handleChipTap = useCallback(
    (num: number) => {
      processInput(num);
    },
    [processInput],
  );

  // Builder slot management
  const placeTile = useCallback(
    (tileId: string, slotIndex: number) => {
      setBuilderSlots((prev) => {
        const next = [...prev] as [
          string | null,
          string | null,
          string | null,
          string | null,
        ];
        // Remove tile from any other slot first
        for (let i = 0; i < 4; i++) {
          if (next[i] === tileId) next[i] = null;
        }
        next[slotIndex] = tileId;
        return next;
      });
      setBuilderChecked(false);
      setInteractionCount((c) => c + 1);
    },
    [],
  );

  const removeTile = useCallback((slotIndex: number) => {
    setBuilderSlots((prev) => {
      const next = [...prev] as [
        string | null,
        string | null,
        string | null,
        string | null,
      ];
      next[slotIndex] = null;
      return next;
    });
    setBuilderChecked(false);
  }, []);

  const checkExpression = useCallback(() => {
    setHasAttemptedBuilder(true);
    const correct = isCorrectExpression(builderSlots);
    setBuilderCorrect(correct);
    setBuilderChecked(true);
  }, [builderSlots]);

  const filledSlotCount = builderSlots.filter((s) => s !== null).length;

  // Current processing display values
  const procDisplay = useMemo(() => {
    if (processingNumber === null) return null;
    const { intermediate, output } = evaluateMachine(processingNumber);
    return { input: processingNumber, intermediate, output };
  }, [processingNumber]);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col px-4 pb-4"
      style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}
    >
      {/* History strip */}
      <div
        className="mb-3 flex items-center gap-3 overflow-x-auto rounded-xl bg-nm-bg-secondary px-3 py-2"
        aria-label="Input-output history"
      >
        <span
          className="whitespace-nowrap text-xs uppercase tracking-wider"
          style={{ color: MUTED }}
        >
          In &rarr; Out
        </span>
        {history.slice(-6).map((entry, i) => (
          <motion.span
            key={`${entry.input}-${i}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={FADE}
            className="whitespace-nowrap text-sm font-mono"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <span style={{ color: THEME.variable }}>{entry.input}</span>
            <span style={{ color: MUTED }}> &rarr; </span>
            <span
              style={{
                color:
                  entry.output < 0 ? ERROR : THEME.output,
              }}
            >
              {entry.output}
            </span>
          </motion.span>
        ))}
        {history.length === 0 && (
          <span
            className="text-xs italic"
            style={{ color: MUTED }}
          >
            Drag a number into the machine!
          </span>
        )}
      </div>

      {/* Function machine */}
      <div
        className="relative mx-auto flex flex-col items-center rounded-2xl p-4"
        style={{
          backgroundColor: SURFACE,
          border: `2px solid ${BORDER}`,
          maxWidth: 320,
          width: "100%",
        }}
      >
        {/* Input funnel */}
        <div
          ref={funnelRef}
          className="relative mb-3 flex items-center justify-center rounded-xl"
          style={{
            width: 120,
            height: 64,
            backgroundColor: "#8b5cf610",
            border: `2px ${isProcessing ? "solid" : "dashed"} ${THEME.primary}`,
            clipPath:
              "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
          }}
          aria-label="Input funnel - drag numbers here"
        >
          {processingPhase === 1 && procDisplay && (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
              className="text-2xl font-bold"
              style={{ color: THEME.variable }}
            >
              {procDisplay.input}
            </motion.span>
          )}
          {!isProcessing && (
            <span
              className="text-sm"
              style={{ color: MUTED }}
            >
              Drop here
            </span>
          )}
        </div>

        {/* Pipe */}
        <div
          style={{
            width: 8,
            height: 20,
            backgroundColor:
              processingPhase >= 1 ? THEME.primary : ELEVATED,
            borderRadius: 4,
            transition: "background-color 0.3s",
          }}
        />

        {/* Operation 1: x2 */}
        <motion.div
          className="relative mb-1 flex items-center justify-center gap-2 rounded-xl"
          style={{
            width: 200,
            height: 64,
            backgroundColor: "#f59e0b10",
            border: `2px solid ${processingPhase === 2 ? WARNING : THEME.coefficient}`,
          }}
          animate={
            processingPhase === 2
              ? { borderColor: [THEME.coefficient, WARNING, THEME.coefficient] }
              : {}
          }
          transition={{ duration: 0.6 }}
          aria-label="Operation: multiply by 2"
        >
          <motion.div
            animate={{ rotate: isProcessing ? 360 : 0 }}
            transition={{
              repeat: isProcessing ? Infinity : 0,
              duration: isProcessing ? 0.5 : 2,
              ease: "linear",
            }}
            style={{ color: THEME.coefficient, fontSize: 24 }}
          >
            &#9881;
          </motion.div>
          <span
            className="text-lg font-bold"
            style={{ color: THEME.coefficient }}
          >
            &times; 2
          </span>
          {/* Calculation label */}
          <AnimatePresence>
            {processingPhase === 2 && procDisplay && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -right-2 -top-8 whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "#f59e0b20",
                  color: THEME.coefficient,
                }}
              >
                {procDisplay.input} &times; 2 ={" "}
                {procDisplay.intermediate}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pipe */}
        <div
          style={{
            width: 8,
            height: 20,
            backgroundColor:
              processingPhase >= 2
                ? THEME.coefficient
                : ELEVATED,
            borderRadius: 4,
            transition: "background-color 0.3s",
          }}
        />

        {/* Operation 2: +3 */}
        <motion.div
          className="relative mb-1 flex items-center justify-center gap-2 rounded-xl"
          style={{
            width: 200,
            height: 64,
            backgroundColor: "#22d3ee10",
            border: `2px solid ${processingPhase === 3 ? "#67e8f9" : THEME.constant}`,
          }}
          animate={
            processingPhase === 3
              ? { borderColor: [THEME.constant, "#67e8f9", THEME.constant] }
              : {}
          }
          transition={{ duration: 0.6 }}
          aria-label="Operation: add 3"
        >
          <motion.div
            animate={{ rotate: isProcessing ? -360 : 0 }}
            transition={{
              repeat: isProcessing ? Infinity : 0,
              duration: isProcessing ? 0.5 : 2,
              ease: "linear",
            }}
            style={{ color: THEME.constant, fontSize: 24 }}
          >
            &#9881;
          </motion.div>
          <span
            className="text-lg font-bold"
            style={{ color: THEME.constant }}
          >
            + 3
          </span>
          <AnimatePresence>
            {processingPhase === 3 && procDisplay && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -right-2 -top-8 whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "#22d3ee20",
                  color: THEME.constant,
                }}
              >
                {procDisplay.intermediate} + 3 ={" "}
                {procDisplay.output}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pipe */}
        <div
          style={{
            width: 8,
            height: 20,
            backgroundColor:
              processingPhase >= 3
                ? THEME.constant
                : ELEVATED,
            borderRadius: 4,
            transition: "background-color 0.3s",
          }}
        />

        {/* Output tray */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 120,
            height: 56,
            backgroundColor: "#34d39915",
            border: `2px solid ${THEME.output}`,
          }}
        >
          <AnimatePresence mode="wait">
            {processingPhase === 4 && procDisplay && (
              <motion.span
                key={`out-${procDisplay.output}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING_BOUNCY}
                className="text-2xl font-bold"
                style={{
                  color:
                    procDisplay.output < 0
                      ? ERROR
                      : THEME.output,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {procDisplay.output}
              </motion.span>
            )}
            {processingPhase === 0 && history.length > 0 && (
              <motion.span
                key="last-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-lg"
                style={{
                  color: THEME.output,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {history[history.length - 1]!.output}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Number chip selector */}
      <div className="mt-4">
        <p
          className="mb-2 text-center text-xs uppercase tracking-wider"
          style={{ color: MUTED }}
        >
          Tap or drag a number into the machine
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {INPUT_CHIPS.map((num) => {
            const used = history.some((h) => h.input === num);
            return (
              <motion.button
                key={num}
                onClick={() => handleChipTap(num)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center rounded-xl text-xl font-bold"
                style={{
                  width: 52,
                  height: 52,
                  backgroundColor: SURFACE,
                  border: `1px solid ${ELEVATED}`,
                  color: THEME.textPrimary,
                }}
                aria-label={`Input number ${num}`}
              >
                {num}
                {used && (
                  <span
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-xs"
                    style={{
                      backgroundColor: SUCCESS,
                      color: BG,
                    }}
                  >
                    &#10003;
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expression Builder - appears after 5 unique inputs */}
      <AnimatePresence>
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            className="mt-6 rounded-2xl p-4"
            style={{
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
            }}
          >
            <p
              className="mb-3 text-sm italic"
              style={{ color: THEME.textSecondary }}
            >
              Can you build the machine&apos;s rule?
            </p>

            {/* Source tiles */}
            <div className="mb-4 flex flex-wrap gap-2">
              {BUILDER_TILES.map((tile) => {
                const placed = builderSlots.includes(tile.id);
                return (
                  <motion.button
                    key={tile.id}
                    onClick={() => {
                      if (placed) return;
                      // Find first empty slot
                      const emptyIdx = builderSlots.findIndex(
                        (s) => s === null,
                      );
                      if (emptyIdx !== -1) {
                        placeTile(tile.id, emptyIdx);
                      }
                    }}
                    whileHover={placed ? {} : { scale: 1.05 }}
                    whileTap={placed ? {} : { scale: 0.95 }}
                    className="flex items-center justify-center rounded-xl text-lg font-bold transition-opacity"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: tileColorFill(tile.kind),
                      border: `2px solid ${tileColor(tile.kind)}`,
                      color: tileColor(tile.kind),
                      opacity: placed ? 0.3 : 1,
                    }}
                    aria-label={`${tile.kind}: ${tile.label}`}
                    disabled={placed}
                  >
                    {tile.label === "*" ? "\u00d7" : tile.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Build zone: 4 drop slots */}
            <div className="mb-3 flex justify-center gap-2">
              {builderSlots.map((slotContent, idx) => {
                const tile = slotContent
                  ? BUILDER_TILES.find((t) => t.id === slotContent)
                  : null;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      if (slotContent) removeTile(idx);
                    }}
                    className="flex items-center justify-center rounded-lg text-lg font-bold"
                    style={{
                      width: 56,
                      height: 56,
                      border: `2px ${slotContent ? "solid" : "dashed"} ${
                        tile ? tileColor(tile.kind) : ELEVATED
                      }`,
                      backgroundColor: tile
                        ? tileColorFill(tile.kind)
                        : "transparent",
                      color: tile
                        ? tileColor(tile.kind)
                        : MUTED,
                    }}
                    aria-label={
                      tile
                        ? `Slot ${idx + 1}: ${tile.label}. Tap to remove.`
                        : `Empty slot ${idx + 1}`
                    }
                  >
                    {tile
                      ? tile.label === "*"
                        ? "\u00d7"
                        : tile.label
                      : ""}
                  </motion.button>
                );
              })}
            </div>

            {/* Live preview */}
            <div className="mb-3 text-center">
              <span
                className="font-mono text-lg"
                style={{
                  color: builderChecked
                    ? builderCorrect
                      ? SUCCESS
                      : ERROR
                    : THEME.textSecondary,
                }}
              >
                {builderSlots
                  .filter((s): s is string => s !== null)
                  .map(
                    (id) =>
                      BUILDER_TILES.find((t) => t.id === id)
                        ?.label ?? "",
                  )
                  .map((l) => (l === "*" ? " \u00d7 " : l))
                  .join("") || "..."}
              </span>
            </div>

            {/* Check button & feedback */}
            <div className="flex flex-col items-center gap-2">
              {!builderChecked && (
                <motion.button
                  onClick={checkExpression}
                  disabled={filledSlotCount < 3}
                  className="min-h-[44px] rounded-xl px-6 py-2 text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    border: `2px solid ${THEME.coefficient}`,
                    color: THEME.coefficient,
                    backgroundColor: "transparent",
                  }}
                  whileTap={
                    filledSlotCount >= 3 ? { scale: 0.97 } : {}
                  }
                >
                  Check
                </motion.button>
              )}

              <AnimatePresence>
                {builderChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={FADE}
                    className="text-center"
                  >
                    {builderCorrect ? (
                      <p
                        className="text-sm font-semibold"
                        style={{ color: SUCCESS }}
                      >
                        That&apos;s the machine&apos;s rule! 2
                        times x, plus 3.
                      </p>
                    ) : (
                      <div>
                        <p
                          className="mb-2 text-sm"
                          style={{ color: ERROR }}
                        >
                          Not quite. Try the machine with x = 1:
                          you get 5. Try different arrangements!
                        </p>
                        <motion.button
                          onClick={() => {
                            setBuilderChecked(false);
                          }}
                          className="min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold"
                          style={{
                            color: THEME.textSecondary,
                            backgroundColor: BORDER,
                          }}
                        >
                          Try Again
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      {canContinue && (
        <ContinueButton onClick={onComplete} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(4);
  const [sliderMoved, setSliderMoved] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  // Auto-show continue for prompt 5 after 10 seconds if slider not moved
  useEffect(() => {
    if (promptIndex === 4 && !sliderMoved) {
      const timer = setTimeout(() => setShowContinue(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [promptIndex, sliderMoved]);

  useEffect(() => {
    if (promptIndex === 4 && sliderMoved) {
      setShowContinue(true);
    }
  }, [promptIndex, sliderMoved]);

  const handleAck = () => {
    if (promptIndex < 4) {
      setPromptIndex((i) => i + 1);
    } else {
      onComplete();
    }
  };

  // Sample data for the table display
  const tableData = [
    { input: 1, times2: 2, plus3: 5, output: 5 },
    { input: 2, times2: 4, plus3: 7, output: 7 },
    { input: 3, times2: 6, plus3: 9, output: 9 },
    { input: 4, times2: 8, plus3: 11, output: 11 },
    { input: 5, times2: 10, plus3: 13, output: 13 },
  ];

  return (
    <div
      className="flex flex-1 flex-col items-center px-4 py-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <AnimatePresence mode="wait">
        {/* Prompt 1: Pattern Recognition */}
        {promptIndex === 0 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={FADE}
            className="w-full"
          >
            {/* Table */}
            <div
              className="mb-4 overflow-hidden rounded-xl bg-nm-bg-secondary p-4"
            >
              <table className="w-full text-center" aria-label="Input-output pattern table">
                <thead>
                  <tr>
                    <th
                      className="pb-2 text-xs font-semibold uppercase"
                      style={{ color: TEXT_SEC }}
                    >
                      Input (x)
                    </th>
                    <th
                      className="pb-2 text-xs font-semibold uppercase"
                      style={{ color: THEME.coefficient }}
                    >
                      &times; 2
                    </th>
                    <th
                      className="pb-2 text-xs font-semibold uppercase"
                      style={{ color: THEME.constant }}
                    >
                      + 3
                    </th>
                    <th
                      className="pb-2 text-xs font-semibold uppercase"
                      style={{ color: THEME.output }}
                    >
                      Output
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <motion.tr
                      key={row.input}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.15,
                        ...FADE,
                      }}
                    >
                      <td
                        className="py-1.5 font-mono font-bold"
                        style={{ color: THEME.variable }}
                      >
                        {row.input}
                      </td>
                      <td
                        className="py-1.5 font-mono"
                        style={{ color: THEME.coefficient }}
                      >
                        {row.times2}
                      </td>
                      <td
                        className="py-1.5 font-mono"
                        style={{ color: THEME.constant }}
                      >
                        {row.plus3}
                      </td>
                      <td
                        className="py-1.5 font-mono font-bold"
                        style={{ color: THEME.output }}
                      >
                        {row.output}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="mb-6 rounded-xl bg-nm-bg-secondary p-4"
            >
              <p
                className="leading-relaxed"
                style={{
                  color: THEME.textSecondary,
                  fontSize: 16,
                }}
              >
                Look at the pattern! Every input goes through
                the same two steps: first{" "}
                <strong style={{ color: THEME.coefficient }}>
                  multiply by 2
                </strong>
                , then{" "}
                <strong style={{ color: THEME.constant }}>
                  add 3
                </strong>
                .
              </p>
            </div>

            <div className="flex justify-center">
              <ContinueButton
                onClick={handleAck}
                label="I see the pattern!"
              />
            </div>
          </motion.div>
        )}

        {/* Prompt 2: Naming the Unknown */}
        {promptIndex === 1 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={FADE}
            className="w-full"
          >
            <div className="mb-6 flex flex-col items-center">
              {/* Mini machine with ? -> x */}
              <div
                className="mb-4 flex items-center gap-4 rounded-xl bg-nm-bg-secondary p-4"
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#8b5cf615",
                    border: `2px solid ${THEME.primary}`,
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold italic"
                    style={{ color: THEME.variable }}
                  >
                    x
                  </motion.span>
                </div>
                <div>
                  <p
                    className="text-sm italic"
                    style={{ color: MUTED }}
                  >
                    Any number can go in!
                  </p>
                  <p className="mt-1" style={{ color: THEME.textSecondary }}>
                    We call it{" "}
                    <strong style={{ color: THEME.variable }}>
                      x
                    </strong>
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl bg-nm-bg-secondary p-4"
              >
                <p
                  className="leading-relaxed"
                  style={{
                    color: THEME.textSecondary,
                    fontSize: 16,
                  }}
                >
                  In math, we use letters like x, y, or n to
                  represent numbers we don&apos;t know yet --
                  or numbers that can change. These are called{" "}
                  <strong
                    className="rounded px-1.5 py-0.5"
                    style={{
                      color: THEME.variable,
                      backgroundColor: THEME.variableFill,
                    }}
                  >
                    variables
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ContinueButton
                onClick={handleAck}
                label="Got it!"
              />
            </div>
          </motion.div>
        )}

        {/* Prompt 3: Building the Expression */}
        {promptIndex === 2 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={FADE}
            className="w-full"
          >
            {/* Expression building animation */}
            <div
              className="mb-4 flex flex-col items-center rounded-xl bg-nm-bg-secondary p-6"
            >
              <div className="mb-4 flex items-baseline gap-1 text-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, ...SPRING_POP }}
                  className="font-mono font-bold"
                  style={{
                    fontSize: "clamp(28px, 6vw, 44px)",
                    color: THEME.coefficient,
                  }}
                >
                  2
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0, ...SPRING_POP }}
                  className="font-mono font-bold italic"
                  style={{
                    fontSize: "clamp(28px, 6vw, 44px)",
                    color: THEME.variable,
                  }}
                >
                  x
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, ...FADE }}
                  className="font-mono font-bold"
                  style={{
                    fontSize: "clamp(28px, 6vw, 44px)",
                    color: THEME.textPrimary,
                  }}
                >
                  {" "}
                  +{" "}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, ...SPRING_POP }}
                  className="font-mono font-bold"
                  style={{
                    fontSize: "clamp(28px, 6vw, 44px)",
                    color: THEME.constant,
                  }}
                >
                  3
                </motion.span>
              </div>

              {/* Labels */}
              <div className="mb-3 flex gap-6 text-xs italic">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ color: THEME.variable }}
                >
                  whatever goes in
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ color: THEME.coefficient }}
                >
                  multiply by 2
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  style={{ color: THEME.constant }}
                >
                  add 3
                </motion.span>
              </div>
            </div>

            {/* Callout: 2x means 2 times x */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, ...FADE }}
              className="mb-4 rounded-r-lg py-3 pl-4 pr-4"
              style={{
                backgroundColor: "#f59e0b15",
                borderLeft: `4px solid ${THEME.coefficient}`,
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: WARNING }}
              >
                Wait -- when we write{" "}
                <strong>2x</strong>, we mean{" "}
                <strong>2 times x</strong>. In algebra, we skip
                the multiplication sign!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, ...FADE }}
              className="mb-6 rounded-xl bg-nm-bg-secondary p-4"
            >
              <p
                className="leading-relaxed"
                style={{
                  color: THEME.textSecondary,
                  fontSize: 16,
                }}
              >
                The machine&apos;s rule is{" "}
                <strong className="font-mono">2x + 3</strong>.
                This is called an{" "}
                <strong
                  className="rounded px-1.5 py-0.5"
                  style={{
                    color: THEME.constant,
                    backgroundColor: THEME.constantFill,
                  }}
                >
                  expression
                </strong>
                . It&apos;s a recipe that tells you what to do
                with any number you put in.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <ContinueButton
                onClick={handleAck}
                label="I see it!"
              />
            </div>
          </motion.div>
        )}

        {/* Prompt 4: Expression vs Equation */}
        {promptIndex === 3 && (
          <motion.div
            key="p4"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={FADE}
            className="w-full"
          >
            <div className="mb-4 flex gap-3">
              {/* Expression card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, ...FADE }}
                className="flex-1 rounded-xl p-4"
                style={{
                  backgroundColor: SURFACE,
                  borderTop: `3px solid ${THEME.constant}`,
                }}
              >
                <span
                  className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: THEME.constantFill,
                    color: THEME.constant,
                  }}
                >
                  Expression
                </span>
                <p
                  className="my-2 font-mono text-xl font-bold"
                  style={{ color: THEME.textPrimary }}
                >
                  2x + 3
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: MUTED }}
                >
                  A recipe. No equals sign. No final answer.
                </p>
              </motion.div>

              {/* VS divider */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className="h-full w-px"
                  style={{ backgroundColor: ELEVATED }}
                />
                <span
                  className="my-1 text-xs font-semibold"
                  style={{ color: MUTED }}
                >
                  vs
                </span>
                <div
                  className="h-full w-px"
                  style={{ backgroundColor: ELEVATED }}
                />
              </div>

              {/* Equation card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ...FADE }}
                className="flex-1 rounded-xl p-4"
                style={{
                  backgroundColor: SURFACE,
                  borderTop: `3px solid ${THEME.output}`,
                }}
              >
                <span
                  className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: THEME.outputFill,
                    color: THEME.output,
                  }}
                >
                  Equation
                </span>
                <p
                  className="my-2 font-mono text-xl font-bold"
                  style={{ color: THEME.textPrimary }}
                >
                  2x + 3 = 11
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: MUTED }}
                >
                  A statement. Has equals sign. Says two things
                  are the same.
                </p>
              </motion.div>
            </div>

            <div
              className="mb-6 rounded-xl bg-nm-bg-secondary p-4"
            >
              <p
                className="leading-relaxed"
                style={{
                  color: THEME.textSecondary,
                  fontSize: 16,
                }}
              >
                An expression is like a recipe -- it describes
                what to do, but doesn&apos;t tell you the
                answer. An equation says &quot;these two things
                are equal.&quot; Today we&apos;re learning about{" "}
                <strong style={{ color: THEME.constant }}>
                  expressions
                </strong>
                .
              </p>
            </div>

            <div className="flex justify-center">
              <ContinueButton
                onClick={handleAck}
                label="Got it!"
              />
            </div>
          </motion.div>
        )}

        {/* Prompt 5: The Key Insight + slider */}
        {promptIndex === 4 && (
          <motion.div
            key="p5"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={FADE}
            className="w-full"
          >
            {/* Insight card */}
            <div
              className="mb-4 rounded-r-xl p-5"
              style={{
                backgroundColor: "#7c3aed20",
                borderLeft: `4px solid ${THEME.variable}`,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span style={{ color: THEME.coefficient, fontSize: 24 }}>
                  &#128161;
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: THEME.variable }}
                >
                  Key Insight
                </span>
              </div>
              <p
                className="leading-relaxed"
                style={{
                  color: THEME.textPrimary,
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 1.7,
                }}
              >
                A{" "}
                <strong
                  className="rounded px-1 py-0.5"
                  style={{
                    color: THEME.variable,
                    backgroundColor: THEME.variableFill,
                  }}
                >
                  variable
                </strong>{" "}
                is a box that holds a number -- we don&apos;t
                know which number yet, but we can still write
                rules about it. An{" "}
                <strong
                  className="rounded px-1 py-0.5"
                  style={{
                    color: THEME.constant,
                    backgroundColor: THEME.constantFill,
                  }}
                >
                  expression
                </strong>{" "}
                is a recipe that uses variables and operations to
                describe a calculation.
              </p>
            </div>

            {/* Interactive slider */}
            <div
              className="mb-6 rounded-xl bg-nm-bg-secondary p-4"
            >
              <div className="mb-3 flex items-baseline justify-center gap-1 font-mono text-2xl font-bold">
                <span style={{ color: THEME.coefficient }}>2</span>
                <span style={{ color: THEME.variable }}>
                  ({sliderValue})
                </span>
                <span style={{ color: THEME.textPrimary }}>
                  {" "}
                  + 3 ={" "}
                </span>
                <motion.span
                  key={sliderValue}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={SPRING}
                  style={{
                    color: THEME.output,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {2 * sliderValue + 3}
                </motion.span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-semibold"
                  style={{ color: THEME.variable }}
                >
                  x =
                </span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={sliderValue}
                  onChange={(e) => {
                    setSliderValue(
                      parseInt(e.target.value, 10),
                    );
                    setSliderMoved(true);
                  }}
                  className="flex-1"
                  style={{
                    accentColor: THEME.primary,
                    minHeight: 44,
                  }}
                  aria-label="Change the value of x"
                  aria-valuetext={`x equals ${sliderValue}, expression equals ${2 * sliderValue + 3}`}
                />
                <span
                  className="min-w-[28px] text-center font-mono text-lg font-bold"
                  style={{ color: THEME.variable }}
                >
                  {sliderValue}
                </span>
              </div>
            </div>

            {showContinue && (
              <div className="flex justify-center">
                <ContinueButton onClick={handleAck} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

function SymbolBridgeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 1500));
    timers.push(setTimeout(() => setStep(2), 3500));
    timers.push(setTimeout(() => setStep(3), 5500));
    timers.push(setTimeout(() => setStep(4), 7500));
    timers.push(setTimeout(() => setStep(5), 9500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="flex flex-1 flex-col items-center px-4 py-6"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
      aria-live="polite"
    >
      {/* The expression displayed large */}
      <div
        className="mb-8 rounded-xl bg-nm-bg-secondary p-6 text-center"
      >
        <div
          className="mb-2 font-mono font-bold"
          style={{ fontSize: "clamp(32px, 7vw, 56px)" }}
        >
          <span style={{ color: THEME.coefficient }}>2</span>
          <span style={{ color: THEME.variable }}>x</span>
          <span style={{ color: THEME.textPrimary }}>
            {" "}
            +{" "}
          </span>
          <span style={{ color: THEME.constant }}>3</span>
        </div>
      </div>

      {/* Vocabulary annotations */}
      <div className="w-full space-y-4">
        {/* Step 1: Variable */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: step === 5 ? 1 : step >= 1 ? 1 : 0,
                y: 0,
              }}
              transition={FADE}
              className="rounded-xl p-4"
              style={{
                backgroundColor: SURFACE,
                borderLeft: `4px solid ${THEME.variable}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: THEME.variable }}>
                x &mdash; Variable
              </p>
              <p
                className="text-sm"
                style={{ color: THEME.textSecondary }}
              >
                The unknown number. It can be anything!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Coefficient */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="rounded-xl p-4"
              style={{
                backgroundColor: SURFACE,
                borderLeft: `4px solid ${THEME.coefficient}`,
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: THEME.coefficient }}
              >
                2 &mdash; Coefficient
              </p>
              <p
                className="text-sm"
                style={{ color: THEME.textSecondary }}
              >
                The number multiplied by the variable. 2x means
                2 &times; x.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Constant */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="rounded-xl p-4"
              style={{
                backgroundColor: SURFACE,
                borderLeft: `4px solid ${THEME.constant}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: THEME.constant }}>
                3 &mdash; Constant
              </p>
              <p
                className="text-sm"
                style={{ color: THEME.textSecondary }}
              >
                A fixed number that doesn&apos;t change.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Terms */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
              className="rounded-xl p-4"
              style={{
                backgroundColor: SURFACE,
                borderLeft: `4px solid ${THEME.textPrimary}`,
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: THEME.textPrimary }}
              >
                Terms
              </p>
              <p
                className="text-sm"
                style={{ color: THEME.textSecondary }}
              >
                An expression has{" "}
                <strong>terms</strong> separated by + or -
                signs.{" "}
                <span style={{ color: THEME.coefficient }}>2x</span>{" "}
                is Term 1 (variable term) and{" "}
                <span style={{ color: THEME.constant }}>3</span> is
                Term 2 (constant term).
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 5: Complete Picture */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl p-5"
              style={{
                backgroundColor: SURFACE,
                border: `2px solid ${THEME.primary}`,
              }}
            >
              <p
                className="mb-3 text-center text-lg font-semibold"
                style={{
                  color: THEME.textPrimary,
                  textShadow: `0 0 12px ${THEME.constant}40`,
                }}
              >
                Algebraic Expression
              </p>
              <p
                className="text-center text-sm leading-relaxed"
                style={{ color: THEME.textSecondary }}
              >
                A combination of variables, numbers, and
                operations that describes a calculation.
              </p>

              {/* Summary tree */}
              <div
                className="mt-4 rounded-lg bg-nm-bg-primary p-3 font-mono text-xs"
              >
                <p className="font-bold" style={{ color: THEME.textPrimary }}>
                  2x + 3
                </p>
                <p style={{ color: THEME.coefficient }}>
                  &nbsp;&nbsp;2 &larr; coefficient
                </p>
                <p style={{ color: THEME.variable }}>
                  &nbsp;&nbsp;x &larr; variable
                </p>
                <p style={{ color: THEME.constant }}>
                  &nbsp;&nbsp;3 &larr; constant
                </p>
                <p style={{ color: MUTED }}>
                  &nbsp;&nbsp;2x &larr; Term 1
                </p>
                <p style={{ color: MUTED }}>
                  &nbsp;&nbsp;3 &nbsp;&larr; Term 2
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step >= 5 && (
        <ContinueButton onClick={onComplete} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL WORLD ANCHOR
// ═══════════════════════════════════════════════════════════════════════════

interface ScenarioCard {
  icon: string;
  title: string;
  body: string;
  expression: string;
  exprParts: Array<{ text: string; color: string }>;
  example: string;
}

const SCENARIOS: readonly ScenarioCard[] = [
  {
    icon: "\uD83C\uDFAE",
    title: "Score Multipliers",
    body: "In a game, you earn double points during a power-up, plus a 5-point bonus each round. If you collect x points:",
    expression: "2x + 5",
    exprParts: [
      { text: "2", color: THEME.coefficient },
      { text: "x", color: THEME.variable },
      { text: " + ", color: THEME.textPrimary },
      { text: "5", color: THEME.constant },
    ],
    example:
      "Get 10 points? That's 2(10) + 5 = 25! Get 50? That's 2(50) + 5 = 105!",
  },
  {
    icon: "\uD83D\uDECD\uFE0F",
    title: "Buying T-Shirts Online",
    body: "T-shirts cost $12 each and shipping is always $4, no matter how many you buy. If you buy n shirts:",
    expression: "12n + 4",
    exprParts: [
      { text: "12", color: THEME.coefficient },
      { text: "n", color: THEME.variable },
      { text: " + ", color: THEME.textPrimary },
      { text: "4", color: THEME.constant },
    ],
    example:
      "Buy 3 shirts? 12(3) + 4 = $40. Buy 1? 12(1) + 4 = $16.",
  },
  {
    icon: "\uD83E\uDD64",
    title: "Scaling a Recipe",
    body: "A smoothie recipe uses 2 cups of fruit per person plus 1 extra cup of ice. For p people:",
    expression: "2p + 1",
    exprParts: [
      { text: "2", color: THEME.coefficient },
      { text: "p", color: THEME.variable },
      { text: " + ", color: THEME.textPrimary },
      { text: "1", color: THEME.constant },
    ],
    example:
      "Party of 6? 2(6) + 1 = 13 cups. Just yourself? 2(1) + 1 = 3 cups.",
  },
  {
    icon: "\uD83C\uDFC0",
    title: "Scoring in Basketball",
    body: "A regular basket is 2 points and a three-pointer is 3 points. For b regular baskets and t three-pointers:",
    expression: "2b + 3t",
    exprParts: [
      { text: "2", color: THEME.coefficient },
      { text: "b", color: THEME.variable },
      { text: " + ", color: THEME.textPrimary },
      { text: "3", color: THEME.coefficient },
      { text: "t", color: THEME.variable },
    ],
    example:
      "This one has TWO variables! 5 regular baskets and 4 three-pointers: 2(5) + 3(4) = 10 + 12 = 22 points.",
  },
] as const;

function RealWorldStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <div
      className="flex flex-1 flex-col px-4 py-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div className="space-y-4">
        {SCENARIOS.map((card, i) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...FADE }}
            className="rounded-2xl bg-nm-bg-secondary p-5"
            role="article"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                {card.icon}
              </span>
              <h3
                className="text-lg font-bold"
                style={{ color: THEME.textPrimary }}
              >
                {card.title}
              </h3>
            </div>

            <p
              className="mb-3 leading-relaxed"
              style={{
                color: THEME.textSecondary,
                fontSize: 16,
              }}
            >
              {card.body}
            </p>

            {/* Expression display */}
            <div
              className="mb-3 inline-flex rounded-lg bg-nm-bg-primary px-4 py-2"
              aria-label={`Expression: ${card.expression}`}
            >
              {card.exprParts.map((part, j) => (
                <span
                  key={j}
                  className="font-mono text-2xl font-bold"
                  style={{ color: part.color }}
                >
                  {part.text}
                </span>
              ))}
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: MUTED }}
            >
              {card.example}
            </p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: SCENARIOS.length * 0.2 + 0.2 }}
      >
        <ContinueButton onClick={onComplete} />
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE (9 problems across 3 layers)
// ═══════════════════════════════════════════════════════════════════════════

type ProblemKind = "tap-select" | "multi-choice" | "numeric" | "drag-arrange" | "true-false";

interface Problem {
  id: string;
  layer: 0 | 1 | 2;
  prompt: string;
  kind: ProblemKind;
  options?: string[];
  // For tap-select: the parts to tap
  tapParts?: Array<{ label: string; color: string; isCorrect: boolean }>;
  // For drag-arrange: the chips to arrange
  dragChips?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

const PRACTICE_PROBLEMS: readonly Problem[] = [
  // Layer 0: Recall
  {
    id: "p1",
    layer: 0,
    prompt: "In the expression 3x + 7, which is the variable?",
    kind: "tap-select",
    tapParts: [
      { label: "3", color: THEME.coefficient, isCorrect: false },
      { label: "x", color: THEME.variable, isCorrect: true },
      { label: "+", color: THEME.textPrimary, isCorrect: false },
      { label: "7", color: THEME.constant, isCorrect: false },
    ],
    correctAnswer: "x",
    feedbackCorrect:
      "Correct! The variable x represents an unknown number. It can be any value!",
    feedbackIncorrect:
      "Not quite. The variable is the letter that represents an unknown number. Look for the letter!",
  },
  {
    id: "p2",
    layer: 0,
    prompt: "What is the coefficient of x in the expression 5x - 2?",
    kind: "multi-choice",
    options: ["x", "5", "2", "-2"],
    correctAnswer: "5",
    feedbackCorrect:
      "Yes! The coefficient is the number in front of the variable. In 5x, the coefficient is 5, meaning 'x is multiplied by 5.'",
    feedbackIncorrect:
      "The coefficient is the number directly attached to the variable by multiplication. Look at what's touching the x!",
  },
  {
    id: "p3",
    layer: 0,
    prompt: "Which of these is an EXPRESSION (not an equation)?",
    kind: "multi-choice",
    options: ["x + 5 = 12", "3x - 1", "7 = 2y + 3", "4n + 6 = 22"],
    correctAnswer: "3x - 1",
    feedbackCorrect:
      "That's right! 3x - 1 is an expression -- it has no equals sign. The others are equations because they use = to say two things are equal.",
    feedbackIncorrect:
      "Look carefully: an expression has NO equals sign -- it's just a recipe for a calculation. Which option has no = sign?",
  },
  // Layer 1: Procedure
  {
    id: "p4",
    layer: 1,
    prompt: "What is the value of 2x + 5 when x = 3?",
    kind: "numeric",
    correctAnswer: "11",
    feedbackCorrect:
      "Correct! Replace x with 3: 2(3) + 5 = 6 + 5 = 11",
    feedbackIncorrect:
      "Remember, 2x means 2 TIMES x, not 2 next to x. So 2(3) = 2 x 3 = 6, then 6 + 5 = 11.",
  },
  {
    id: "p5",
    layer: 1,
    prompt:
      "A pizza costs $8 plus $2 per topping. Build the expression for total cost with t toppings.",
    kind: "drag-arrange",
    dragChips: ["t", "2", "8", "+"],
    correctAnswer: "2t+8",
    acceptedAnswers: ["2t+8", "8+2t"],
    feedbackCorrect:
      "Perfect! The cost per topping ($2) multiplied by the number of toppings (t), plus the base price ($8). 3 toppings = 2(3) + 8 = $14!",
    feedbackIncorrect:
      "We need 2t (2 times t) to show $2 for EACH topping. Then add the $8 base cost: 2t + 8.",
  },
  {
    id: "p6",
    layer: 1,
    prompt: "Find the value of 3x - 4 when x = -2.",
    kind: "multi-choice",
    options: ["-10", "-2", "2", "10"],
    correctAnswer: "-10",
    feedbackCorrect:
      "Right! 3(-2) = -6, then -6 - 4 = -10. Negative inputs can give negative outputs!",
    feedbackIncorrect:
      "Be careful with signs! 3 times (-2) = -6 (positive times negative = negative). Then -6 - 4 = -10.",
  },
  // Layer 2: Understanding
  {
    id: "p7",
    layer: 2,
    prompt:
      "Ava says 'x always equals 4 because last time we found that x = 4.' Is Ava right or wrong?",
    kind: "true-false",
    options: ["Ava is RIGHT", "Ava is WRONG"],
    correctAnswer: "Ava is WRONG",
    feedbackCorrect:
      "Correct! A variable can represent ANY number, not just one specific value. The whole point of a variable is that it can VARY!",
    feedbackIncorrect:
      "Think again: if x ALWAYS equaled 4, we wouldn't need a letter -- we'd just write 4! A variable changes depending on the situation.",
  },
  {
    id: "p8",
    layer: 2,
    prompt: "Write the expression: 'five more than triple a number n'",
    kind: "multi-choice",
    options: ["5n + 3", "3n + 5", "3 + 5n", "5(n + 3)"],
    correctAnswer: "3n + 5",
    feedbackCorrect:
      "Excellent! 'Triple a number n' means 3n. 'Five more than' means + 5. Put them together: 3n + 5.",
    feedbackIncorrect:
      "'Triple' means multiply by 3, and 'five more' means add 5. Break it down: 'triple n' = 3n, then 'five more' = + 5. Answer: 3n + 5.",
  },
  {
    id: "p9",
    layer: 2,
    prompt:
      "You have $20 and earn $7 for each hour you babysit. Build an expression for your total after h hours.",
    kind: "drag-arrange",
    dragChips: ["h", "7", "20", "+"],
    correctAnswer: "7h+20",
    acceptedAnswers: ["7h+20", "20+7h"],
    feedbackCorrect:
      "That's it! $7 per hour x h hours gives 7h, plus the $20 you started with: 7h + 20. After 3 hours: 7(3) + 20 = $41!",
    feedbackIncorrect:
      "You earn $7 for EACH hour, so you need 7h (7 times h). Then add the starting $20: 7h + 20.",
  },
] as const;

const LAYER_COLORS = [colors.accent.violet, colors.functional.warning, colors.accent.cyan] as const;
const LAYER_LABELS = ["Recall", "Procedure", "Understanding"] as const;

function PracticeStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState("");
  const [dragSlots, setDragSlots] = useState<Array<string | null>>([
    null,
    null,
    null,
    null,
  ]);
  const [phase, setPhase] = useState<"answering" | "feedback">(
    "answering",
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [dotStates, setDotStates] = useState<Array<"pending" | "correct" | "incorrect">>(
    Array(PRACTICE_PROBLEMS.length).fill("pending") as Array<"pending" | "correct" | "incorrect">,
  );

  const prob = PRACTICE_PROBLEMS[currentIdx]!;
  const total = PRACTICE_PROBLEMS.length;

  const checkAnswer = useCallback(() => {
    let correct = false;

    switch (prob.kind) {
      case "tap-select":
      case "multi-choice":
      case "true-false":
        correct = selectedAnswer === prob.correctAnswer;
        break;
      case "numeric":
        correct =
          numericInput.trim() === prob.correctAnswer;
        break;
      case "drag-arrange": {
        const arranged = dragSlots
          .filter((s): s is string => s !== null)
          .join("");
        correct =
          arranged === prob.correctAnswer ||
          (prob.acceptedAnswers?.includes(arranged) ?? false);
        break;
      }
    }

    setIsCorrect(correct);
    if (correct) setCorrectCount((c) => c + 1);
    setDotStates((prev) => {
      const next = [...prev] as Array<"pending" | "correct" | "incorrect">;
      next[currentIdx] = correct ? "correct" : "incorrect";
      return next;
    });
    setPhase("feedback");
  }, [prob, selectedAnswer, numericInput, dragSlots, currentIdx]);

  const nextProblem = useCallback(() => {
    if (currentIdx + 1 >= total) {
      setDone(true);
      return;
    }
    setCurrentIdx((i) => i + 1);
    setSelectedAnswer(null);
    setNumericInput("");
    setDragSlots([null, null, null, null]);
    setPhase("answering");
    setIsCorrect(false);
  }, [currentIdx, total]);

  // Drag-arrange: place chip in first empty slot
  const placeChip = useCallback(
    (chip: string) => {
      setDragSlots((prev) => {
        const next = [...prev];
        // Remove from existing slot if placed
        const existingIdx = next.indexOf(chip);
        if (existingIdx !== -1) next[existingIdx] = null;
        // Find first empty slot
        const emptyIdx = next.indexOf(null);
        if (emptyIdx !== -1) next[emptyIdx] = chip;
        return next;
      });
    },
    [],
  );

  const removeChip = useCallback((idx: number) => {
    setDragSlots((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  }, []);

  const canSubmit = useMemo(() => {
    switch (prob.kind) {
      case "tap-select":
      case "multi-choice":
      case "true-false":
        return selectedAnswer !== null;
      case "numeric":
        return numericInput.trim() !== "";
      case "drag-arrange":
        return dragSlots.filter((s) => s !== null).length >= 3;
    }
  }, [prob.kind, selectedAnswer, numericInput, dragSlots]);

  if (done) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 flex-col items-center justify-center px-4"
      >
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: THEME.outputFill }}
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke={SUCCESS}
            strokeWidth={2.5}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2
          className="mb-2 text-xl font-bold"
          style={{ color: THEME.textPrimary }}
        >
          Practice Complete!
        </h2>
        <p className="mb-6" style={{ color: MUTED }}>
          {correctCount}/{total} correct ({pct}%)
        </p>
        <ContinueButton onClick={onComplete} />
      </motion.div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Problem progress dots */}
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
                  ? SUCCESS
                  : state === "incorrect"
                    ? ERROR
                    : BORDER,
              border:
                i === currentIdx
                  ? `2px solid ${THEME.primary}`
                  : "none",
              boxShadow:
                i === currentIdx
                  ? `0 0 6px ${THEME.primary}80`
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
          <span style={{ color: MUTED }}>
            Problem {currentIdx + 1} / {total}
          </span>
        </span>
        <span style={{ color: MUTED }}>
          {correctCount} correct
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={prob.id}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={FADE}
        >
          {/* Problem card */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
            }}
            role="form"
            aria-label={prob.prompt}
          >
            <p
              className="mb-5 text-base font-medium leading-relaxed"
              style={{ color: THEME.textPrimary }}
            >
              {prob.prompt}
            </p>

            {/* Answer area */}
            {phase === "answering" && (
              <>
                {/* Tap-select */}
                {prob.kind === "tap-select" && prob.tapParts && (
                  <div
                    className="mb-5 flex justify-center gap-3"
                    role="radiogroup"
                    aria-label="Select the correct part"
                  >
                    {prob.tapParts.map((part) => (
                      <button
                        key={part.label}
                        onClick={() =>
                          setSelectedAnswer(part.label)
                        }
                        className="flex items-center justify-center rounded-lg font-mono text-xl font-bold transition-all"
                        style={{
                          width: 56,
                          minHeight: 44,
                          backgroundColor:
                            selectedAnswer === part.label
                              ? `${THEME.primary}20`
                              : BG,
                          border: `2px solid ${
                            selectedAnswer === part.label
                              ? THEME.primary
                              : BORDER
                          }`,
                          color: part.color,
                        }}
                        role="radio"
                        aria-checked={
                          selectedAnswer === part.label
                        }
                        aria-label={`Select ${part.label}`}
                      >
                        {part.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Multi-choice */}
                {prob.kind === "multi-choice" && prob.options && (
                  <div
                    className="mb-5 space-y-2"
                    role="radiogroup"
                  >
                    {prob.options.map((opt, i) => {
                      const letter = String.fromCharCode(
                        65 + i,
                      );
                      return (
                        <button
                          key={opt}
                          onClick={() =>
                            setSelectedAnswer(opt)
                          }
                          className="flex w-full items-center gap-3 rounded-xl px-4 text-left text-base font-medium transition-all"
                          style={{
                            minHeight: 52,
                            maxWidth: 400,
                            backgroundColor:
                              selectedAnswer === opt
                                ? `${THEME.primary}15`
                                : BG,
                            border: `2px solid ${
                              selectedAnswer === opt
                                ? THEME.primary
                                : BORDER
                            }`,
                            color: THEME.textSecondary,
                          }}
                          role="radio"
                          aria-checked={selectedAnswer === opt}
                        >
                          <span
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                            style={{
                              backgroundColor:
                                selectedAnswer === opt
                                  ? THEME.primary
                                  : BORDER,
                              color:
                                selectedAnswer === opt
                                  ? THEME.textPrimary
                                  : MUTED,
                            }}
                          >
                            {letter}
                          </span>
                          <span className="font-mono">
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* True-false */}
                {prob.kind === "true-false" && prob.options && (
                  <div className="mb-5 flex gap-3">
                    {prob.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setSelectedAnswer(opt)
                        }
                        className="flex-1 rounded-xl py-3 text-base font-semibold transition-all"
                        style={{
                          minHeight: 56,
                          backgroundColor:
                            selectedAnswer === opt
                              ? `${THEME.primary}15`
                              : BG,
                          border: `2px solid ${
                            selectedAnswer === opt
                              ? THEME.primary
                              : BORDER
                          }`,
                          color:
                            selectedAnswer === opt
                              ? THEME.textPrimary
                              : THEME.textSecondary,
                        }}
                        aria-label={`Select: ${opt}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Numeric input */}
                {prob.kind === "numeric" && (
                  <div className="mb-5">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={numericInput}
                      onChange={(e) =>
                        setNumericInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          numericInput.trim()
                        )
                          checkAnswer();
                      }}
                      placeholder="?"
                      className="mx-auto block rounded-xl text-center font-mono text-2xl font-bold outline-none"
                      style={{
                        width: 120,
                        minHeight: 52,
                        backgroundColor: BG,
                        border: `2px solid ${BORDER}`,
                        color: THEME.textPrimary,
                      }}
                      aria-label="Enter the value of the expression"
                    />
                  </div>
                )}

                {/* Drag-arrange (simplified: tap to fill) */}
                {prob.kind === "drag-arrange" &&
                  prob.dragChips && (
                    <div className="mb-5">
                      {/* Source chips */}
                      <p
                        className="mb-2 text-xs"
                        style={{ color: MUTED }}
                      >
                        Tap tiles to build the expression:
                      </p>
                      <div className="mb-3 flex justify-center gap-2">
                        {prob.dragChips.map((chip) => {
                          const placed =
                            dragSlots.includes(chip);
                          const isVar =
                            /^[a-z]$/.test(chip);
                          const isOp = ["+", "-", "*"].includes(
                            chip,
                          );
                          let chipColor: string = THEME.constant;
                          if (isVar) chipColor = THEME.variable;
                          else if (isOp) chipColor = THEME.coefficient;
                          return (
                            <motion.button
                              key={chip}
                              onClick={() =>
                                !placed && placeChip(chip)
                              }
                              whileTap={
                                placed ? {} : { scale: 0.95 }
                              }
                              className="flex items-center justify-center rounded-xl text-lg font-bold transition-opacity"
                              style={{
                                width: 48,
                                height: 48,
                                backgroundColor: `${chipColor}20`,
                                border: `2px solid ${chipColor}`,
                                color: chipColor,
                                opacity: placed ? 0.3 : 1,
                              }}
                              disabled={placed}
                              aria-label={`Tile: ${chip}`}
                            >
                              {chip}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Drop slots */}
                      <div className="flex justify-center gap-2">
                        {dragSlots.map((slot, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() =>
                              slot !== null && removeChip(idx)
                            }
                            className="flex items-center justify-center rounded-lg text-lg font-bold"
                            style={{
                              width: 56,
                              height: 56,
                              border: `2px ${slot ? "solid" : "dashed"} ${slot ? THEME.primary : ELEVATED}`,
                              backgroundColor: slot
                                ? `${THEME.primary}15`
                                : "transparent",
                              color: slot
                                ? THEME.textPrimary
                                : MUTED,
                            }}
                            aria-label={
                              slot
                                ? `Slot ${idx + 1}: ${slot}. Tap to remove.`
                                : `Empty slot ${idx + 1}`
                            }
                          >
                            {slot ?? ""}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Submit button */}
                <button
                  onClick={checkAnswer}
                  disabled={!canSubmit}
                  className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    backgroundColor: THEME.primary,
                    minHeight: 44,
                  }}
                >
                  Check Answer
                </button>
              </>
            )}

            {/* Feedback */}
            {phase === "feedback" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={FADE}
              >
                {/* Result indicator */}
                <div
                  className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: isCorrect
                      ? `${SUCCESS}15`
                      : `${ERROR}15`,
                    border: `1px solid ${isCorrect ? SUCCESS : ERROR}`,
                  }}
                  aria-live="assertive"
                >
                  <span
                    className="text-lg"
                    style={{
                      color: isCorrect
                        ? SUCCESS
                        : ERROR,
                    }}
                  >
                    {isCorrect ? "\u2713" : "\u2717"}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: isCorrect
                        ? SUCCESS
                        : ERROR,
                    }}
                  >
                    {isCorrect ? "Correct!" : "Not quite"}
                  </span>
                </div>

                {/* Explanation */}
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: THEME.textSecondary }}
                  aria-live="polite"
                >
                  {isCorrect
                    ? prob.feedbackCorrect
                    : prob.feedbackIncorrect}
                </p>

                {/* Next button - no auto-advance */}
                <button
                  onClick={nextProblem}
                  className="w-full rounded-xl px-6 py-3 text-base font-semibold text-white"
                  style={{
                    backgroundColor: THEME.primary,
                    minHeight: 44,
                  }}
                  aria-label="Next problem"
                >
                  Next &rarr;
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 7 — REFLECTION
// ═══════════════════════════════════════════════════════════════════════════

function ReflectionStage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const charCount = text.trim().length;
  const meetsMinimum = charCount >= 20;

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
        style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
      >
        {submitted && (
          <div className="mb-6 w-full">
            {/* Feedback */}
            <div
              className="mb-4 rounded-xl py-3 pl-4 pr-4"
              style={{
                backgroundColor: BG,
                borderLeft: `4px solid ${THEME.primary}`,
              }}
            >
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: MUTED }}
              >
                Great reflection! Thinking about why we use variables
                helps deepen your understanding. Variables let us write
                general rules that work for any number -- that&apos;s the
                power of algebra!
              </p>
            </div>
          </div>
        )}

        {/* Confirmation animation */}
        <div
          className="mb-6 rounded-xl bg-nm-bg-secondary p-5 text-center"
        >
          <ExpressionCycler />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-3 text-sm font-semibold"
            style={{ color: THEME.textPrimary }}
          >
            One expression, infinite possibilities.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-2 text-sm"
            style={{ color: THEME.textSecondary }}
          >
            You&apos;ve learned the language of algebra. Variables
            let us write rules that work for ANY number.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <ContinueButton
            onClick={onComplete}
            label="Complete Lesson"
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col items-center px-4 py-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      <div
        className="w-full rounded-2xl bg-nm-bg-secondary p-6"
      >
        {/* Header */}
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            backgroundColor: "#7c3aed20",
            color: THEME.variable,
          }}
        >
          Reflection
        </span>

        {/* Prompt */}
        <p
          className="mb-4 leading-relaxed"
          style={{
            color: THEME.textPrimary,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Why do you think mathematicians use letters like x
          instead of just using numbers? When is a variable more
          useful than a specific number?
        </p>

        {/* Visual hint: specific vs general */}
        <div className="mb-4 flex gap-3">
          <div
            className="flex-1 rounded-lg bg-nm-bg-primary p-3 text-center"
          >
            <p
              className="text-xs uppercase"
              style={{ color: MUTED }}
            >
              Specific
            </p>
            <p
              className="mt-1 font-mono text-sm font-bold"
              style={{ color: TEXT_SEC }}
            >
              2(4) + 3 = 11
            </p>
          </div>
          <div className="flex items-center">
            <span
              className="text-xs font-semibold"
              style={{ color: MUTED }}
            >
              vs
            </span>
          </div>
          <motion.div
            animate={{ borderColor: [THEME.primary, THEME.variable, THEME.primary] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex-1 rounded-lg border-2 bg-nm-bg-primary p-3 text-center"
          >
            <p
              className="text-xs uppercase"
              style={{ color: MUTED }}
            >
              General
            </p>
            <p
              className="mt-1 font-mono text-sm font-bold"
              style={{ color: THEME.textPrimary }}
            >
              2x + 3 = ?
            </p>
          </motion.div>
        </div>

        {/* Text area */}
        <label htmlFor="reflection-input" className="sr-only">
          Your reflection
        </label>
        <textarea
          id="reflection-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Variables are useful because..."
          className="w-full resize-none rounded-xl px-4 py-3 text-base outline-none"
          style={{
            minHeight: 120,
            maxHeight: 240,
            backgroundColor: BG,
            border: `1px solid ${BORDER}`,
            color: THEME.textPrimary,
            lineHeight: 1.6,
          }}
          rows={4}
        />

        {/* Character counter */}
        <p
          className="mt-1 text-right text-xs"
          style={{
            color: meetsMinimum ? SUCCESS : MUTED,
          }}
        >
          {charCount} / 20 minimum
        </p>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!meetsMinimum}
          className="mt-3 w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            backgroundColor: THEME.primary,
            minHeight: 52,
          }}
        >
          Submit Reflection
        </button>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="mt-2 w-full py-2 text-sm underline-offset-2 hover:underline"
          style={{
            color: MUTED,
            minHeight: 44,
          }}
          aria-label="Skip reflection"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

/** Mini animation: cycles x through values showing expression results */
function ExpressionCycler() {
  const values = [1, 2, 3, 5, 10, 100];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % values.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const x = values[idx]!;
  const result = 2 * x + 3;

  return (
    <div
      className="font-mono text-xl font-bold"
      aria-label={`The expression 2x + 3 evaluated for different values of x`}
    >
      <span style={{ color: THEME.coefficient }}>2</span>
      <span style={{ color: THEME.variable }}>({x})</span>
      <span style={{ color: THEME.textPrimary }}> + 3 = </span>
      <motion.span
        key={result}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={SPRING}
        style={{
          color: THEME.output,
          fontVariantNumeric: "tabular-nums",
          display: "inline-block",
        }}
      >
        {result}
      </motion.span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LESSON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function VariablesLesson({
  onComplete,
}: VariablesLessonProps) {
  return (
    <LessonShell title="AL-1.1 Variables" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
