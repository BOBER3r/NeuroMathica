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

interface TrianglesLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TOKEN ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.surface;
const ELEVATED = colors.bg.elevated;
const PRIMARY = colors.accent.violet;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;
const SPRING_POP = springs.pop;
const FADE = { duration: 0.3, ease: "easeOut" as const };

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC THEME
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  angleA: "#f87171",
  angleAFill: "#f8717133",
  angleB: "#60a5fa",
  angleBFill: "#60a5fa33",
  angleC: "#34d399",
  angleCFill: "#34d39933",
  sides: colors.accent.violet,
  sidesFill: "#a78bfa33",
  textSecondary: "#e2e8f0",
  successFill: "#34d39933",
  errorFill: "#f8717133",
  primaryHover: "#7c3aed",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TRIANGLE DATA
// ═══════════════════════════════════════════════════════════════════════════

interface TrianglePreset {
  name: string;
  angles: [number, number, number];
  sideLabels: [string, string, string];
  bySides: string;
  byAngles: string;
  vertices: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }];
}

const TRIANGLE_PRESETS: readonly TrianglePreset[] = [
  {
    name: "Equilateral",
    angles: [60, 60, 60],
    sideLabels: ["5", "5", "5"],
    bySides: "Equilateral",
    byAngles: "Acute",
    vertices: [{ x: 240, y: 40 }, { x: 120, y: 240 }, { x: 360, y: 240 }],
  },
  {
    name: "Right Isosceles",
    angles: [90, 45, 45],
    sideLabels: ["5", "5", "7.1"],
    bySides: "Isosceles",
    byAngles: "Right",
    vertices: [{ x: 120, y: 40 }, { x: 120, y: 240 }, { x: 360, y: 240 }],
  },
  {
    name: "Obtuse Scalene",
    angles: [120, 35, 25],
    sideLabels: ["4", "6", "8"],
    bySides: "Scalene",
    byAngles: "Obtuse",
    vertices: [{ x: 160, y: 60 }, { x: 100, y: 240 }, { x: 380, y: 240 }],
  },
  {
    name: "Acute Isosceles",
    angles: [80, 50, 50],
    sideLabels: ["5", "5", "6"],
    bySides: "Isosceles",
    byAngles: "Acute",
    vertices: [{ x: 240, y: 40 }, { x: 110, y: 240 }, { x: 370, y: 240 }],
  },
  {
    name: "Right Scalene",
    angles: [90, 30, 60],
    sideLabels: ["3", "5.2", "6"],
    bySides: "Scalene",
    byAngles: "Right",
    vertices: [{ x: 140, y: 40 }, { x: 140, y: 240 }, { x: 380, y: 240 }],
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function TrianglesLesson({ onComplete }: TrianglesLessonProps) {
  return (
    <LessonShell title="GE-4.2 Triangles" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onComplete={advance} />;
          case "spatial": return <SpatialStage onComplete={advance} />;
          case "discovery": return <DiscoveryStage onComplete={advance} />;
          case "symbol": return <SymbolBridgeStage onComplete={advance} />;
          case "realWorld": return <RealWorldStage onComplete={advance} />;
          case "practice": return <PracticeStage onComplete={advance} />;
          case "reflection": return <ReflectionStage onComplete={advance} />;
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
  return <VideoHook src="/videos/TrianglesHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1400));
    timers.push(setTimeout(() => setPhase(3), 3000));
    timers.push(setTimeout(() => setPhase(4), 4500));
    timers.push(setTimeout(() => setPhase(5), 5800));
    timers.push(setTimeout(() => setPhase(6), 7000));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 6)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="relative w-full" style={{ maxWidth: 640 }} aria-live="polite">
        {phase >= 1 && (
          <svg
            viewBox="0 0 480 300"
            className="mx-auto mb-4 w-full"
            style={{ maxWidth: 480 }}
            aria-label="A triangle with three colored angles tearing off and forming a straight line to show they sum to 180 degrees"
          >
            {/* Triangle outline */}
            <AnimatePresence>
              {phase >= 1 && phase < 4 && (
                <motion.polygon
                  points="240,40 100,240 380,240"
                  fill="none"
                  stroke={ELEVATED}
                  strokeWidth={3}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE}
                />
              )}
            </AnimatePresence>

            {/* Angle dots at vertices */}
            {phase >= 1 && phase < 2 && (
              <>
                <motion.circle cx={240} cy={60} r={14} fill={THEME.angleA} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING_POP} />
                <motion.circle cx={115} cy={225} r={14} fill={THEME.angleB} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING_POP, delay: 0.2 }} />
                <motion.circle cx={365} cy={225} r={14} fill={THEME.angleC} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING_POP, delay: 0.4 }} />
              </>
            )}

            {/* Corners tear off and align */}
            {phase >= 2 && phase < 4 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.circle cx={160} cy={270} r={14} fill={THEME.angleA} initial={{ x: 80, y: -210 }} animate={{ x: 0, y: 0 }} transition={SPRING} />
                <motion.circle cx={240} cy={270} r={14} fill={THEME.angleB} initial={{ x: -125, y: -45 }} animate={{ x: 0, y: 0 }} transition={{ ...SPRING, delay: 0.2 }} />
                <motion.circle cx={320} cy={270} r={14} fill={THEME.angleC} initial={{ x: 45, y: -45 }} animate={{ x: 0, y: 0 }} transition={{ ...SPRING, delay: 0.4 }} />
                <motion.line
                  x1={130} y1={270} x2={350} y2={270}
                  stroke={TEXT_SEC} strokeWidth={2} strokeDasharray="4 4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                />
              </motion.g>
            )}

            {/* 180 label */}
            {phase >= 3 && (
              <motion.text
                x={240} y={270}
                textAnchor={"middle" as const}
                dominantBaseline="central"
                fill={TEXT}
                fontSize={24}
                fontWeight={700}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING_POP}
              >
                {"180\u00B0"}
              </motion.text>
            )}
          </svg>
        )}

        <AnimatePresence>
          {phase >= 3 && phase < 5 && (
            <motion.p
              key="every"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 text-center"
              style={{ color: TEXT, fontSize: "clamp(18px, 4.5vw, 28px)", fontWeight: 700 }}
            >
              Every triangle. Every time. 180{"\u00B0"}.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 5 && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
              style={{ color: THEME.textSecondary, fontSize: "clamp(16px, 4vw, 22px)" }}
            >
              It&apos;s not a coincidence {"\u2014"} it&apos;s geometry.
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 6 && (
          <ContinueButton onClick={onComplete} color={PRIMARY} />
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

  const preset = TRIANGLE_PRESETS[presetIdx % TRIANGLE_PRESETS.length]!;
  const canContinue = interactions >= 6;

  const handleNextShape = useCallback(() => {
    setPresetIdx((i) => (i + 1) % TRIANGLE_PRESETS.length);
    setInteractions((c) => c + 1);
  }, []);

  const handlePrevShape = useCallback(() => {
    setPresetIdx((i) => (i - 1 + TRIANGLE_PRESETS.length) % TRIANGLE_PRESETS.length);
    setInteractions((c) => c + 1);
  }, []);

  const [vA, vB, vC] = preset.vertices;
  const angleColors = [THEME.angleA, THEME.angleB, THEME.angleC] as const;

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4"
      style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}
    >
      {/* Angle readouts */}
      <div className="mb-3 w-full rounded-xl bg-nm-bg-secondary p-4">
        <div className="mb-2 flex items-center justify-center gap-4">
          {preset.angles.map((angle, i) => (
            <div key={i} className="text-center">
              <span className="text-xs font-semibold" style={{ color: angleColors[i] }}>
                {String.fromCharCode(65 + i)}
              </span>
              <p className="font-mono text-lg font-bold" style={{ color: angleColors[i], fontVariantNumeric: "tabular-nums" }}>
                {angle}{"\u00B0"}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-semibold" style={{ color: SUCCESS }}>
          Sum: {preset.angles[0]! + preset.angles[1]! + preset.angles[2]!}{"\u00B0"} (always 180{"\u00B0"})
        </p>
      </div>

      {/* Triangle SVG */}
      <svg
        viewBox="0 0 480 280"
        className="mx-auto mb-3 w-full"
        style={{ maxWidth: 480 }}
        aria-label={`${preset.name} triangle with angles ${preset.angles.join(", ")} degrees`}
      >
        <motion.polygon
          key={presetIdx}
          points={`${vA.x},${vA.y} ${vB.x},${vB.y} ${vC.x},${vC.y}`}
          fill={`${THEME.sides}15`}
          stroke={THEME.sides}
          strokeWidth={3}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={SPRING}
        />

        {/* Angle labels at each vertex */}
        {[vA, vB, vC].map((v, i) => {
          const angle = preset.angles[i]!;
          const cx = (vA.x + vB.x + vC.x) / 3;
          const cy = (vA.y + vB.y + vC.y) / 3;
          const dx = (cx - v.x) * 0.25;
          const dy = (cy - v.y) * 0.25;
          return (
            <motion.text
              key={`angle-${i}-${presetIdx}`}
              x={v.x + dx}
              y={v.y + dy}
              textAnchor={"middle" as const}
              dominantBaseline="central"
              fill={angleColors[i]}
              fontSize={14}
              fontWeight={700}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_POP, delay: i * 0.15 }}
            >
              {angle}{"\u00B0"}
            </motion.text>
          );
        })}

        {/* Side labels */}
        {([[vA, vB, 0], [vB, vC, 1], [vC, vA, 2]] as const).map(([p1, p2, si]) => {
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          const cx = (vA.x + vB.x + vC.x) / 3;
          const cy = (vA.y + vB.y + vC.y) / 3;
          const dx = (mx - cx) * 0.15;
          const dy = (my - cy) * 0.15;
          return (
            <text
              key={`side-${si}`}
              x={mx + dx}
              y={my + dy}
              textAnchor={"middle" as const}
              dominantBaseline="central"
              fill={TEXT_SEC}
              fontSize={12}
              fontWeight={600}
            >
              {preset.sideLabels[si]}
            </text>
          );
        })}
      </svg>

      {/* Classification */}
      <div className="mb-4 flex gap-3 justify-center">
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: THEME.sidesFill, color: THEME.sides }}>
          Sides: {preset.bySides}
        </span>
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: THEME.angleAFill, color: THEME.angleA }}>
          Angles: {preset.byAngles}
        </span>
      </div>

      {/* Navigation */}
      <div className="mb-4 flex gap-3 justify-center">
        <motion.button
          onClick={handlePrevShape}
          className="min-h-[48px] min-w-[48px] rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ backgroundColor: SURFACE, border: `2px solid ${ELEVATED}`, color: THEME.textSecondary }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous triangle shape"
        >
          {"\u2190"}
        </motion.button>
        <motion.button
          onClick={handleNextShape}
          className="min-h-[48px] min-w-[120px] rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ backgroundColor: SURFACE, border: `2px solid ${ELEVATED}`, color: THEME.textSecondary }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next triangle shape"
        >
          {"New Shape \u2192"}
        </motion.button>
      </div>

      {/* Progress */}
      <InteractionDots count={interactions} total={6} activeColor={PRIMARY} />

      {canContinue && <ContinueButton onClick={onComplete} color={PRIMARY} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  { text: "No matter how you change the triangle, the three angles ALWAYS sum to 180\u00B0.", detail: "60 + 60 + 60 = 180. Or 90 + 45 + 45 = 180. Or 120 + 35 + 25 = 180. Always!", button: "I see it!" },
  { text: "Count the equal sides: 0 equal = scalene, 2 equal = isosceles, 3 equal = equilateral.", detail: "Scalene: all different. Isosceles: two match. Equilateral: all three match.", button: "I see it!" },
  { text: "Now look at the LARGEST angle: all < 90\u00B0 = acute. One = 90\u00B0 = right. One > 90\u00B0 = obtuse.", detail: "The biggest angle determines the classification.", button: "I see it!" },
  { text: "A triangle can be BOTH 'isosceles' AND 'right' \u2014 two labels, one for sides, one for angles!", detail: "Example: a 90-45-45 triangle is right (by angles) and isosceles (by sides).", button: "Got it!" },
  { text: "If you know two angles, the third is always 180\u00B0 minus the other two!", detail: "\u2220C = 180\u00B0 \u2212 \u2220A \u2212 \u2220B. For 60\u00B0 and 80\u00B0: 180 \u2212 60 \u2212 80 = 40\u00B0.", button: "Got it!" },
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-4 flex items-center gap-1 justify-center">
          {DISCOVERY_PROMPTS.map((_, i) => (
            <div key={i} className="rounded-full" style={{ width: 8, height: 8, backgroundColor: i <= promptIdx ? PRIMARY : BORDER }} />
          ))}
        </div>
        <motion.div key={promptIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <p className="mb-3 text-lg font-medium leading-relaxed" style={{ color: TEXT }}>{prompt.text}</p>
          <p className="mb-6 rounded-lg bg-nm-bg-primary px-4 py-3 font-mono text-sm" style={{ color: THEME.textSecondary }}>{prompt.detail}</p>
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
  { notation: "\u2220A + \u2220B + \u2220C = 180\u00B0", description: "Triangle angle sum property" },
  { notation: "Scalene | Isosceles | Equilateral", description: "Classification by sides (0, 2, or 3 equal)" },
  { notation: "Acute | Right | Obtuse", description: "Classification by largest angle (< 90, = 90, > 90)" },
  { notation: "\u2220C = 180\u00B0 \u2212 \u2220A \u2212 \u2220B", description: "Find missing angle formula" },
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
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#7c3aed20", color: THEME.sides }}>Symbol Bridge</span>
        <div className="space-y-3">
          {SYMBOL_STEPS.map((_, i) => {
            const step = SYMBOL_STEPS[i]!;
            return i < visibleCount ? (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: PRIMARY, color: "#fff" }}>{i + 1}</span>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: THEME.sides }}>{step.notation}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{step.description}</p>
                </div>
              </motion.div>
            ) : null;
          })}
        </div>
        {visibleCount >= SYMBOL_STEPS.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <p className="mb-4 text-center text-sm font-semibold" style={{ color: THEME.textSecondary }}>Angles sum to 180{"\u00B0"}. Classify by sides and by angles.</p>
            <ContinueButton onClick={onComplete} color={PRIMARY} />
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
  { title: "Architecture", icon: "\uD83C\uDFDB\uFE0F", example: "Roof trusses use triangles for structural strength", math: "Equilateral/isosceles in trusses" },
  { title: "Bridges", icon: "\uD83C\uDF09", example: "Bridge supports are triangles \u2014 the most rigid shape", math: "Right triangles in beams" },
  { title: "Pizza", icon: "\uD83C\uDF55", example: "8 slices = 8 isosceles triangles with 45\u00B0 tips", math: "360\u00B0 \u00F7 8 = 45\u00B0" },
  { title: "Navigation", icon: "\uD83E\uDDED", example: "Triangulation: finding position using 3 reference points", math: "Angle sum in surveying" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <span className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Real World Connections</span>
      <div className="mb-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {REAL_WORLD_CARDS.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: i * 0.15 }} className="rounded-xl p-4" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
            <p className="mb-1 text-lg">{card.icon}</p>
            <p className="mb-1 text-sm font-semibold" style={{ color: TEXT }}>{card.title}</p>
            <p className="mb-2 text-xs" style={{ color: THEME.textSecondary }}>{card.example}</p>
            <p className="font-mono text-xs" style={{ color: THEME.sides }}>{card.math}</p>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onComplete} color={PRIMARY} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE
// ═══════════════════════════════════════════════════════════════════════════

interface PracticeProblem {
  layer: string;
  type: "mc" | "tf" | "numeric";
  prompt: string;
  options?: string[];
  answer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: readonly PracticeProblem[] = [
  { layer: "Recall", type: "mc", prompt: "A triangle with sides 3, 3, 5 is called...", options: ["Isosceles", "Equilateral", "Scalene", "Right"], answer: "Isosceles", feedback: "Two equal sides = isosceles." },
  { layer: "Recall", type: "mc", prompt: "A triangle with angles 60\u00B0, 60\u00B0, 60\u00B0 is classified as...", options: ["Acute (and equilateral)", "Right", "Obtuse", "Scalene"], answer: "Acute (and equilateral)", feedback: "All angles < 90\u00B0 = acute. All angles equal = equilateral." },
  { layer: "Recall", type: "tf", prompt: "A triangle can have two obtuse angles.", options: ["True", "False"], answer: "False", feedback: "False! Two obtuse angles would sum to more than 180\u00B0 \u2014 impossible." },
  { layer: "Procedure", type: "numeric", prompt: "Two angles are 70\u00B0 and 55\u00B0. The third angle = ?", answer: "55", feedback: "180\u00B0 \u2212 70\u00B0 \u2212 55\u00B0 = 55\u00B0. This is an acute triangle!" },
  { layer: "Procedure", type: "mc", prompt: "A triangle has angles 90\u00B0, 45\u00B0, and ___.", options: ["45\u00B0", "90\u00B0", "35\u00B0", "55\u00B0"], answer: "45\u00B0", feedback: "180\u00B0 \u2212 90\u00B0 \u2212 45\u00B0 = 45\u00B0. Right isosceles triangle." },
  { layer: "Procedure", type: "mc", prompt: "Classify: sides 3, 4, 5 with a 90\u00B0 angle.", options: ["Right scalene", "Right isosceles", "Acute scalene", "Obtuse scalene"], answer: "Right scalene", feedback: "One 90\u00B0 angle = right. All sides different = scalene." },
  { layer: "Understanding", type: "mc", prompt: "Why can a triangle have at most ONE right angle?", options: ["Two right angles = 180\u00B0, leaving 0\u00B0 for the third", "Because triangles are small", "Right angles are too big", "It\u2019s just a rule"], answer: "Two right angles = 180\u00B0, leaving 0\u00B0 for the third", feedback: "90\u00B0 + 90\u00B0 = 180\u00B0 already. The third angle would be 0\u00B0!" },
  { layer: "Understanding", type: "mc", prompt: "Make a triangle bigger but keep the shape. Angles?", options: ["Stay the same", "Get bigger", "Get smaller", "Double"], answer: "Stay the same", feedback: "Scaling changes side lengths but not angles \u2014 still sum to 180\u00B0." },
  { layer: "Understanding", type: "mc", prompt: "Every equilateral triangle is also...", options: ["Acute and isosceles", "Right and scalene", "Obtuse", "None of the above"], answer: "Acute and isosceles", feedback: "All 60\u00B0 angles are acute. Has (at least) two equal sides = isosceles!" },
] as const;

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [numericValue, setNumericValue] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = PRACTICE_PROBLEMS[idx];
  const isLast = idx === PRACTICE_PROBLEMS.length - 1;

  const handleSelect = useCallback((option: string) => {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);
  }, [showFeedback]);

  const handleNumericSubmit = useCallback(() => {
    if (showFeedback || !numericValue.trim()) return;
    setSelected(numericValue.trim());
    setShowFeedback(true);
  }, [showFeedback, numericValue]);

  const handleNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setIdx((i) => i + 1);
    setSelected(null);
    setNumericValue("");
    setShowFeedback(false);
  }, [isLast, onComplete]);

  if (!problem) return null;
  const isCorrect = selected === problem.answer;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: PRIMARY + "30", color: PRIMARY }}>{problem.layer}</span>
          <span className="text-xs font-semibold" style={{ color: MUTED }}>{idx + 1}/{PRACTICE_PROBLEMS.length}</span>
        </div>
        <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>{problem.prompt}</p>

        {problem.type === "mc" || problem.type === "tf" ? (
          <div className="mb-4 space-y-2">
            {(problem.options ?? []).map((opt) => {
              const optCorrect = opt === problem.answer;
              const optSelected = opt === selected;
              let bg: string = BG;
              let border: string = BORDER;
              if (showFeedback && optSelected) { bg = optCorrect ? THEME.successFill : THEME.errorFill; border = optCorrect ? SUCCESS : ERROR; }
              else if (showFeedback && optCorrect) { bg = THEME.successFill; border = SUCCESS; }
              return (
                <motion.button key={opt} onClick={() => handleSelect(opt)} disabled={showFeedback} className="min-h-[44px] w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed" style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }} whileTap={showFeedback ? {} : { scale: 0.98 }}>{opt}</motion.button>
              );
            })}
          </div>
        ) : (
          <div className="mb-4 flex gap-2">
            <input type="text" inputMode="numeric" value={numericValue} onChange={(e) => setNumericValue(e.target.value)} disabled={showFeedback} className="min-h-[44px] flex-1 rounded-lg px-4 py-2 text-sm font-mono disabled:opacity-50" style={{ backgroundColor: BG, border: `2px solid ${BORDER}`, color: TEXT }} placeholder="Your answer" aria-label="Numeric answer input" />
            {!showFeedback && (
              <motion.button onClick={handleNumericSubmit} className="min-h-[44px] min-w-[44px] rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: PRIMARY }} whileTap={{ scale: 0.95 }} aria-label="Submit answer">Check</motion.button>
            )}
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

  const handleSubmit = useCallback(() => {
    if (text.length >= 20) setSubmitted(true);
  }, [text]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="w-full rounded-2xl bg-nm-bg-secondary p-6">
        <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "#7c3aed20", color: PRIMARY }}>Reflection</span>

        {!submitted ? (
          <>
            <p className="mb-4 text-base font-medium leading-relaxed" style={{ color: TEXT }}>
              Imagine tearing off the three corners of any triangle and lining them up. Why do they always form a straight line (180{"\u00B0"})? What does this tell us about triangles?
            </p>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="mb-2 min-h-[100px] w-full rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: BG, border: `2px solid ${BORDER}`, color: TEXT, resize: "vertical" }} placeholder="Type your explanation..." aria-label="Reflection text" />
            <p className="mb-4 text-xs" style={{ color: text.length >= 20 ? SUCCESS : MUTED }}>{text.length}/20 characters minimum</p>
            <div className="flex items-center justify-between">
              <button onClick={onComplete} className="min-h-[44px] px-4 py-2 text-sm" style={{ color: MUTED }} aria-label="Skip reflection">Skip</button>
              <motion.button onClick={handleSubmit} disabled={text.length < 20} className="min-h-[48px] min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed" style={{ backgroundColor: PRIMARY }} whileTap={text.length >= 20 ? { scale: 0.95 } : {}}>Submit</motion.button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            <p className="mb-4 text-lg font-semibold" style={{ color: SUCCESS }}>Wonderful geometric thinking!</p>
            <p className="mb-6 text-sm" style={{ color: THEME.textSecondary }}>The 180{"\u00B0"} angle sum is one of the most fundamental properties in geometry. It connects to parallel lines, polygon angle sums, and even the shape of the universe!</p>
            <ContinueButton onClick={onComplete} label="Complete Lesson" color={PRIMARY} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
