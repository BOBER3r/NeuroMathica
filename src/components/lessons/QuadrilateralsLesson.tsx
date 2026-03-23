"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface QuadrilateralsLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TOKEN ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const BG = colors.bg.primary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.surface;
const BORDER_LIGHT = colors.bg.elevated;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC SEMANTIC COLORS (geometry property highlights)
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  parallel: "#f59e0b",
  parallelFill: "#f59e0b33",
  rightAngle: colors.accent.cyan,
  rightAngleFill: "#22d3ee33",
  equalSides: colors.accent.violet,
  equalSidesFill: "#a78bfa33",
  shape: colors.functional.info,
  shapeFill: "#60a5fa15",
  successFill: "#34d39933",
  errorFill: "#fb718533",
  textSecondary: "#e2e8f0",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// QUADRILATERAL DATA
// ═══════════════════════════════════════════════════════════════════════════

interface QuadPreset {
  name: string;
  points: string;
  properties: { parallelPairs: number; allRightAngles: boolean; allSidesEqual: boolean; oppSidesEqual: boolean };
  angles: [number, number, number, number];
}

const QUAD_PRESETS: readonly QuadPreset[] = [
  { name: "Trapezoid", points: "160,60 340,60 400,220 80,220", properties: { parallelPairs: 1, allRightAngles: false, allSidesEqual: false, oppSidesEqual: false }, angles: [115, 65, 65, 115] },
  { name: "Parallelogram", points: "140,60 380,60 340,220 100,220", properties: { parallelPairs: 2, allRightAngles: false, allSidesEqual: false, oppSidesEqual: true }, angles: [75, 105, 75, 105] },
  { name: "Rectangle", points: "100,60 380,60 380,220 100,220", properties: { parallelPairs: 2, allRightAngles: true, allSidesEqual: false, oppSidesEqual: true }, angles: [90, 90, 90, 90] },
  { name: "Rhombus", points: "240,40 400,140 240,240 80,140", properties: { parallelPairs: 2, allRightAngles: false, allSidesEqual: true, oppSidesEqual: true }, angles: [60, 120, 60, 120] },
  { name: "Square", points: "120,50 360,50 360,230 120,230", properties: { parallelPairs: 2, allRightAngles: true, allSidesEqual: true, oppSidesEqual: true }, angles: [90, 90, 90, 90] },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function QuadrilateralsLesson({ onComplete }: QuadrilateralsLessonProps) {
  return (
    <LessonShell title="GE-4.3 Quadrilaterals" stages={[...NLS_STAGES]} onComplete={onComplete}>
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

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/QuadrilateralsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1400));
    timers.push(setTimeout(() => setPhase(3), 2600));
    timers.push(setTimeout(() => setPhase(4), 3800));
    timers.push(setTimeout(() => setPhase(5), 5000));
    timers.push(setTimeout(() => setPhase(6), 6200));
    timers.push(setTimeout(() => setPhase(7), 7200));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 7)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const shapes = [
    { name: "Trapezoid", points: "160,60 340,60 400,200 80,200", color: "#f87171" },
    { name: "Parallelogram", points: "140,60 380,60 340,200 100,200", color: "#f59e0b" },
    { name: "Rectangle", points: "100,60 380,60 380,200 100,200", color: "#22d3ee" },
    { name: "Square", points: "140,40 340,40 340,220 140,220", color: "#34d399" },
    { name: "Rhombus", points: "240,30 400,130 240,230 80,130", color: "#a78bfa" },
  ] as const;

  const currentShape = phase >= 1 && phase <= 5 ? shapes[Math.min(phase - 1, 4)]! : shapes[0]!;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="relative w-full" style={{ maxWidth: 640 }} aria-live="polite">
        {phase >= 1 && phase <= 5 && (
          <svg viewBox="0 0 480 260" className="mx-auto mb-4 w-full" style={{ maxWidth: 480 }} aria-label={`Morphing quadrilateral: ${currentShape.name}`}>
            <motion.polygon
              key={phase}
              points={currentShape.points}
              fill={`${currentShape.color}20`}
              stroke={currentShape.color}
              strokeWidth={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={SPRING}
            />
            <motion.text
              key={`label-${phase}`}
              x={240} y={240}
              textAnchor={"middle" as const}
              fill={currentShape.color}
              fontSize={18}
              fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, ...FADE }}
            >
              {currentShape.name}
            </motion.text>
          </svg>
        )}

        <AnimatePresence>
          {phase >= 6 && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
              style={{ color: TEXT, fontSize: "clamp(18px, 4.5vw, 28px)", fontWeight: 700 }}
            >
              One family. Five special members.
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 7 && (
          <ContinueButton onClick={onComplete} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL
// ═══════════════════════════════════════════════════════════════════════════

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [viewedSet, setViewedSet] = useState<Set<number>>(new Set([0]));

  const preset = QUAD_PRESETS[presetIdx]!;
  const canContinue = viewedSet.size >= 5 && interactions >= 6;

  const handleNext = useCallback(() => {
    const nextIdx = (presetIdx + 1) % QUAD_PRESETS.length;
    setPresetIdx(nextIdx);
    setInteractions((c) => c + 1);
    setViewedSet((prev) => { const n = new Set(prev); n.add(nextIdx); return n; });
  }, [presetIdx]);

  const handlePrev = useCallback(() => {
    const prevIdx = (presetIdx - 1 + QUAD_PRESETS.length) % QUAD_PRESETS.length;
    setPresetIdx(prevIdx);
    setInteractions((c) => c + 1);
    setViewedSet((prev) => { const n = new Set(prev); n.add(prevIdx); return n; });
  }, [presetIdx]);

  const props = preset.properties;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      {/* Shape name */}
      <motion.h2
        key={presetIdx}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 text-center text-xl font-bold"
        style={{ color: THEME.shape }}
      >
        {preset.name}
      </motion.h2>

      {/* SVG shape */}
      <svg viewBox="0 0 480 280" className="mx-auto mb-3 w-full" style={{ maxWidth: 480 }} aria-label={`${preset.name} with highlighted properties`}>
        <motion.polygon
          key={presetIdx}
          points={preset.points}
          fill={THEME.shapeFill}
          stroke={THEME.shape}
          strokeWidth={3}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={SPRING}
        />
        {/* Angle labels */}
        {(() => {
          const pts = preset.points.split(" ").map(p => { const [x, y] = p.split(","); return { x: Number(x), y: Number(y) }; });
          const cx = pts.reduce((s, p) => s + p.x, 0) / 4;
          const cy = pts.reduce((s, p) => s + p.y, 0) / 4;
          return pts.map((pt, i) => {
            const dx = (cx - pt.x) * 0.2;
            const dy = (cy - pt.y) * 0.2;
            return (
              <text
                key={`angle-${i}`}
                x={pt.x + dx}
                y={pt.y + dy}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={props.allRightAngles ? THEME.rightAngle : THEME.textSecondary}
                fontSize={13}
                fontWeight={700}
              >
                {preset.angles[i]}{"\u00B0"}
              </text>
            );
          });
        })()}
      </svg>

      {/* Properties checklist */}
      <div className="mb-4 w-full rounded-xl p-4 bg-nm-bg-secondary">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: TEXT_SEC }}>Properties</p>
        {[
          { label: `${props.parallelPairs} pair(s) of parallel sides`, active: props.parallelPairs > 0, color: THEME.parallel },
          { label: "Opposite sides equal", active: props.oppSidesEqual, color: THEME.equalSides },
          { label: "All angles 90\u00B0", active: props.allRightAngles, color: THEME.rightAngle },
          { label: "All sides equal", active: props.allSidesEqual, color: THEME.equalSides },
        ].map((prop) => (
          <div key={prop.label} className="flex items-center gap-2 py-1">
            <div
              className="flex h-5 w-5 items-center justify-center rounded text-xs font-bold"
              style={{ backgroundColor: prop.active ? `${prop.color}33` : `${BORDER}50`, color: prop.active ? prop.color : MUTED }}
            >
              {prop.active ? "\u2713" : "\u2014"}
            </div>
            <span className="text-sm" style={{ color: prop.active ? TEXT : MUTED }}>
              {prop.label}
            </span>
          </div>
        ))}
        <p className="mt-2 text-center text-sm font-semibold" style={{ color: SUCCESS }}>
          Angle sum: {preset.angles[0]! + preset.angles[1]! + preset.angles[2]! + preset.angles[3]!}{"\u00B0"} = 360{"\u00B0"}
        </p>
      </div>

      {/* Navigation */}
      <div className="mb-4 flex gap-3 justify-center">
        <motion.button onClick={handlePrev} className="min-h-[48px] min-w-[48px] rounded-xl px-4 py-3 text-sm font-semibold bg-nm-bg-secondary" style={{ border: `2px solid ${BORDER_LIGHT}`, color: THEME.textSecondary }} whileTap={{ scale: 0.95 }} aria-label="Previous shape">{"\u2190"}</motion.button>
        <motion.button onClick={handleNext} className="min-h-[48px] min-w-[120px] rounded-xl px-4 py-3 text-sm font-semibold bg-nm-bg-secondary" style={{ border: `2px solid ${BORDER_LIGHT}`, color: THEME.textSecondary }} whileTap={{ scale: 0.95 }} aria-label="Next shape">{"Next Shape \u2192"}</motion.button>
      </div>

      <InteractionDots count={interactions} total={6} activeColor={PRIMARY} />

      {canContinue && <ContinueButton onClick={onComplete} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  { text: "Draw a diagonal in any quadrilateral \u2014 you get TWO triangles! Each has 180\u00B0.", detail: "2 \u00D7 180\u00B0 = 360\u00B0. Every quadrilateral\u2019s angles sum to 360\u00B0!", button: "I see it!" },
  { text: "A square is a special rectangle (all sides equal). A rectangle is a special parallelogram (all 90\u00B0 angles).", detail: "Square \u2282 Rectangle \u2282 Parallelogram. It\u2019s a family tree!", button: "I see it!" },
  { text: "The rhombus is a parallelogram with all sides equal. Make the angles 90\u00B0 and it becomes a square!", detail: "Rhombus + right angles = Square. Square = Rectangle \u2229 Rhombus.", button: "I see it!" },
  { text: "The trapezoid stands alone \u2014 only ONE pair of parallel sides. It\u2019s the independent cousin!", detail: "Trapezoid: exactly 1 pair parallel. Parallelogram: 2 pairs.", button: "Got it!" },
  { text: "So: Trapezoid (1 parallel pair) \u2192 Parallelogram (2 pairs) \u2192 Rectangle/Rhombus \u2192 Square (has everything).", detail: "The hierarchy is based on adding more properties.", button: "Got it!" },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const prompt = DISCOVERY_PROMPTS[promptIdx];

  const handleAck = useCallback(() => {
    if (promptIdx < DISCOVERY_PROMPTS.length - 1) setPromptIdx((i) => i + 1);
    else onComplete();
  }, [promptIdx, onComplete]);

  if (!prompt) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6 bg-nm-bg-secondary">
        <div className="mb-4 flex items-center gap-1 justify-center">
          {DISCOVERY_PROMPTS.map((_, i) => (
            <div key={i} className="rounded-full" style={{ width: 8, height: 8, backgroundColor: i <= promptIdx ? PRIMARY : BORDER }} />
          ))}
        </div>
        <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: TEXT }}>{prompt.text}</p>
          <p className="mb-6 rounded-lg px-4 py-3 font-mono text-sm bg-nm-bg-primary" style={{ color: THEME.textSecondary }}>{prompt.detail}</p>
        </motion.div>
        <div className="flex justify-center">
          <motion.button onClick={handleAck} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-base font-semibold text-white" style={{ backgroundColor: PRIMARY }} whileTap={{ scale: 0.95 }}>{prompt.button}</motion.button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOL_STEPS = [
  { notation: "\u2220A + \u2220B + \u2220C + \u2220D = 360\u00B0", description: "Quadrilateral angle sum (2 triangles)" },
  { notation: "Trapezoid: 1 pair parallel", description: "The minimum special property" },
  { notation: "Parallelogram: 2 pairs parallel, opposite sides equal", description: "Rectangle and rhombus share this parent" },
  { notation: "Square = Rectangle \u2229 Rhombus", description: "All right angles + all sides equal" },
] as const;

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < SYMBOL_STEPS.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 1800 * (i + 1)));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6 bg-nm-bg-secondary">
        <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#7c3aed20", color: THEME.shape }}>Symbol Bridge</span>
        <div className="space-y-3">
          {SYMBOL_STEPS.map((_, i) => {
            const step = SYMBOL_STEPS[i]!;
            return i < visibleCount ? (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex items-center gap-3 rounded-lg px-4 py-3 bg-nm-bg-primary" style={{ border: `1px solid ${BORDER}` }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: PRIMARY, color: "#fff" }}>{i + 1}</span>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: THEME.shape }}>{step.notation}</p>
                  <p className="text-xs" style={{ color: TEXT_SEC }}>{step.description}</p>
                </div>
              </motion.div>
            ) : null;
          })}
        </div>
        {visibleCount >= SYMBOL_STEPS.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <p className="mb-4 text-center text-sm font-semibold" style={{ color: THEME.textSecondary }}>Angles sum to 360{"\u00B0"}. Hierarchy based on parallel sides, equal sides, right angles.</p>
            <ContinueButton onClick={onComplete} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL WORLD
// ═══════════════════════════════════════════════════════════════════════════

const REAL_WORLD_CARDS = [
  { title: "Windows", icon: "\uD83E\uDE9F", example: "Most windows are rectangles \u2014 four right angles", math: "Rectangle properties" },
  { title: "Floor Tiles", icon: "\uD83E\uDDF1", example: "Square tiles tessellate perfectly", math: "4 \u00D7 90\u00B0 = 360\u00B0" },
  { title: "Kites", icon: "\uD83E\uDE81", example: "A kite has two pairs of adjacent equal sides", math: "Special quadrilateral" },
  { title: "Baseball Diamond", icon: "\u26BE", example: "A baseball diamond is a square rotated 45\u00B0", math: "Square = rhombus + right angles" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <span className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: TEXT_SEC }}>Real World Connections</span>
      <div className="mb-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {REAL_WORLD_CARDS.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: i * 0.15 }} className="rounded-xl p-4 bg-nm-bg-secondary" style={{ border: `1px solid ${BORDER}` }}>
            <p className="mb-1 text-lg">{card.icon}</p>
            <p className="mb-1 text-sm font-semibold" style={{ color: TEXT }}>{card.title}</p>
            <p className="mb-2 text-xs" style={{ color: THEME.textSecondary }}>{card.example}</p>
            <p className="font-mono text-xs" style={{ color: THEME.shape }}>{card.math}</p>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onComplete} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE
// ═══════════════════════════════════════════════════════════════════════════

interface PracticeProblem { layer: string; type: "mc" | "tf" | "numeric"; prompt: string; options?: string[]; answer: string; feedback: string; }

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  { layer: "Recall", type: "mc", prompt: "Which quadrilateral has exactly ONE pair of parallel sides?", options: ["Trapezoid", "Rectangle", "Rhombus", "Square"], answer: "Trapezoid", feedback: "Trapezoid has exactly one pair of parallel sides." },
  { layer: "Recall", type: "mc", prompt: "Every square is also a...", options: ["Rectangle, rhombus, and parallelogram", "Only a rectangle", "Only a rhombus", "Trapezoid"], answer: "Rectangle, rhombus, and parallelogram", feedback: "A square has ALL special properties \u2014 it belongs to every category." },
  { layer: "Recall", type: "tf", prompt: "A rectangle is always a square.", options: ["True", "False"], answer: "False", feedback: "False! A rectangle needs all sides equal to be a square." },
  { layer: "Procedure", type: "numeric", prompt: "Angles 90\u00B0, 110\u00B0, and 80\u00B0. Fourth angle = ?", answer: "80", feedback: "360\u00B0 \u2212 90\u00B0 \u2212 110\u00B0 \u2212 80\u00B0 = 80\u00B0." },
  { layer: "Procedure", type: "mc", prompt: "A parallelogram has one angle of 70\u00B0. Other three?", options: ["110\u00B0, 70\u00B0, 110\u00B0", "70\u00B0, 70\u00B0, 70\u00B0", "90\u00B0, 110\u00B0, 90\u00B0", "110\u00B0, 110\u00B0, 70\u00B0"], answer: "110\u00B0, 70\u00B0, 110\u00B0", feedback: "Opposite angles equal. Adjacent angles supplementary (sum to 180\u00B0)." },
  { layer: "Procedure", type: "mc", prompt: "All sides equal but NOT necessarily right angles?", options: ["Rhombus", "Rectangle", "Square", "Trapezoid"], answer: "Rhombus", feedback: "Rhombus has four equal sides. Only becomes a square when angles are 90\u00B0." },
  { layer: "Understanding", type: "mc", prompt: "Why do quadrilateral angles sum to 360\u00B0?", options: ["A diagonal splits it into two triangles (2 \u00D7 180\u00B0)", "Because it has 4 sides", "Because 4 \u00D7 90 = 360", "It\u2019s a rule"], answer: "A diagonal splits it into two triangles (2 \u00D7 180\u00B0)", feedback: "Any quad splits into two triangles. 2 \u00D7 180\u00B0 = 360\u00B0." },
  { layer: "Understanding", type: "mc", prompt: "Is every rhombus a rectangle?", options: ["No \u2014 only when all angles are 90\u00B0", "Yes, always", "Only if sides are equal", "Only if it\u2019s large"], answer: "No \u2014 only when all angles are 90\u00B0", feedback: "A rhombus has equal sides but angles can be non-right. Only a square is both." },
  { layer: "Understanding", type: "mc", prompt: "What does a parallelogram have that a trapezoid does NOT?", options: ["TWO pairs of parallel sides", "Four sides", "Angles", "A perimeter"], answer: "TWO pairs of parallel sides", feedback: "Parallelogram: both pairs parallel. Trapezoid: only one pair." },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [numericValue, setNumericValue] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = PRACTICE_PROBLEMS[idx];
  const isLast = idx === PRACTICE_PROBLEMS.length - 1;

  const handleSelect = useCallback((option: string) => { if (showFeedback) return; setSelected(option); setShowFeedback(true); }, [showFeedback]);
  const handleNumericSubmit = useCallback(() => { if (showFeedback || !numericValue.trim()) return; setSelected(numericValue.trim()); setShowFeedback(true); }, [showFeedback, numericValue]);
  const handleNext = useCallback(() => { if (isLast) { onComplete(); return; } setIdx((i) => i + 1); setSelected(null); setNumericValue(""); setShowFeedback(false); }, [isLast, onComplete]);

  if (!problem) return null;
  const isCorrect = selected === problem.answer;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6 bg-nm-bg-secondary">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: PRIMARY + "30", color: PRIMARY }}>{problem.layer}</span>
          <span className="text-xs font-semibold" style={{ color: TEXT_SEC }}>{idx + 1}/{PRACTICE_PROBLEMS.length}</span>
        </div>
        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>{problem.prompt}</p>

        {problem.type === "mc" || problem.type === "tf" ? (
          <div className="mb-4 space-y-2">
            {(problem.options ?? []).map((opt) => {
              const oc = opt === problem.answer;
              const os = opt === selected;
              let bg: string = BG; let border: string = BORDER;
              if (showFeedback && os) { bg = oc ? THEME.successFill : THEME.errorFill; border = oc ? SUCCESS : ERROR; }
              else if (showFeedback && oc) { bg = THEME.successFill; border = SUCCESS; }
              return (<motion.button key={opt} onClick={() => handleSelect(opt)} disabled={showFeedback} className="min-h-[44px] w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed" style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }} whileTap={showFeedback ? {} : { scale: 0.98 }}>{opt}</motion.button>);
            })}
          </div>
        ) : (
          <div className="mb-4 flex gap-2">
            <input type="text" inputMode="numeric" value={numericValue} onChange={(e) => setNumericValue(e.target.value)} disabled={showFeedback} className="min-h-[44px] flex-1 rounded-lg px-4 py-2 text-sm font-mono disabled:opacity-50 bg-nm-bg-primary" style={{ border: `2px solid ${BORDER}`, color: TEXT }} placeholder="Your answer" aria-label="Numeric answer input" />
            {!showFeedback && <motion.button onClick={handleNumericSubmit} className="min-h-[44px] min-w-[44px] rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: PRIMARY }} whileTap={{ scale: 0.95 }} aria-label="Submit answer">Check</motion.button>}
          </div>
        )}

        <AnimatePresence>
          {showFeedback && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: isCorrect ? THEME.successFill : THEME.errorFill, color: isCorrect ? SUCCESS : ERROR }}>
              <p className="mb-1 font-semibold">{isCorrect ? "Correct!" : `Incorrect. Answer: ${problem.answer}`}</p>
              <p style={{ color: THEME.textSecondary }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showFeedback && (
          <div className="flex justify-center">
            <motion.button onClick={handleNext} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ backgroundColor: PRIMARY }} whileTap={{ scale: 0.95 }}>{isLast ? "Complete" : "Next \u2192"}</motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 7 — REFLECTION
// ═══════════════════════════════════════════════════════════════════════════

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback(() => { if (text.length >= 20) setSubmitted(true); }, [text]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl p-6 bg-nm-bg-secondary">
        <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#7c3aed20", color: PRIMARY }}>Reflection</span>
        {!submitted ? (
          <>
            <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>Explain why every square is a rectangle but not every rectangle is a square. What extra property does a square have?</p>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="mb-2 min-h-[100px] w-full rounded-lg px-4 py-3 text-sm bg-nm-bg-primary" style={{ border: `2px solid ${BORDER}`, color: TEXT, resize: "vertical" }} placeholder="Type your explanation..." aria-label="Reflection text" />
            <p className="mb-4 text-xs" style={{ color: text.length >= 20 ? SUCCESS : TEXT_SEC }}>{text.length}/20 characters minimum</p>
            <div className="flex items-center justify-between">
              <button onClick={onComplete} className="min-h-[44px] px-4 py-2 text-sm" style={{ color: MUTED }} aria-label="Skip reflection">Skip</button>
              <motion.button onClick={handleSubmit} disabled={text.length < 20} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed" style={{ backgroundColor: PRIMARY }} whileTap={text.length >= 20 ? { scale: 0.95 } : {}}>Submit</motion.button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            <p className="mb-4 text-lg font-semibold" style={{ color: SUCCESS }}>Great reasoning!</p>
            <p className="mb-6 text-sm" style={{ color: THEME.textSecondary }}>Understanding the hierarchy of quadrilaterals {"\u2014"} that squares are special rectangles which are special parallelograms {"\u2014"} is a key insight in geometry.</p>
            <ContinueButton onClick={onComplete} label="Complete Lesson" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
