"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/* ── Lesson-specific semantic colors (solids) ── */
const THEME = {
  prism: colors.domain.numbers,       // #60a5fa
  prismFill: "#60a5fa33",
  cylinder: colors.accent.emerald,    // #34d399
  cylinderFill: "#34d39933",
  cone: "#f59e0b",                    // amber-500 (lesson-specific shade)
  coneFill: "#f59e0b33",
  sphere: colors.accent.indigo,       // #818cf8
  sphereFill: "#818cf833",
  textSecondaryLight: "#e2e8f0",      // lighter secondary (lesson-specific)
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const ELEVATED = colors.bg.surface;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;
const PRIMARY = colors.accent.violet;

const SPRING = springs.default;

const PI = Math.PI;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SolidType = "prism" | "cylinder" | "cone" | "sphere";

interface PracticeProblem {
  id: number;
  layer: string;
  type: "multiple-choice" | "numeric-input";
  prompt: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "Recall", type: "multiple-choice", prompt: "Volume measures...",
    options: ["The distance around a shape", "The 3D space inside a solid", "The total surface area", "The weight of an object"],
    correctAnswer: "The 3D space inside a solid",
    feedback: "Volume is the amount of 3D space a solid occupies, measured in cubic units." },
  { id: 2, layer: "Recall", type: "multiple-choice", prompt: "Volume of a rectangular prism is...",
    options: ["length + width + height", "length \u00D7 width \u00D7 height", "2(lw + lh + wh)", "length \u00D7 width"],
    correctAnswer: "length \u00D7 width \u00D7 height",
    feedback: "V = lwh \u2014 multiply the three dimensions to get cubic units." },
  { id: 3, layer: "Recall", type: "multiple-choice", prompt: "Volume of a cylinder is...",
    options: ["\u03C0r\u00B2", "\u03C0r\u00B2h", "2\u03C0rh", "\u03C0dh"],
    correctAnswer: "\u03C0r\u00B2h",
    feedback: "A cylinder is a circle (\u03C0r\u00B2) stacked h times: V = \u03C0r\u00B2h." },
  { id: 4, layer: "Procedure", type: "numeric-input",
    prompt: "A rectangular prism is 4 \u00D7 3 \u00D7 5. What is its volume?",
    correctAnswer: "60",
    feedback: "V = 4 \u00D7 3 \u00D7 5 = 60 cubic units" },
  { id: 5, layer: "Procedure", type: "numeric-input",
    prompt: "A cylinder has radius 3 and height 7. What is its volume? (Use \u03C0 = 3.14, round to nearest tenth)",
    correctAnswer: "197.8",
    feedback: "V = \u03C0r\u00B2h = 3.14 \u00D7 9 \u00D7 7 = 197.82 \u2248 197.8" },
  { id: 6, layer: "Procedure", type: "numeric-input",
    prompt: "A cone has radius 3 and height 7. What is its volume? (Use \u03C0 = 3.14, round to nearest tenth)",
    correctAnswer: "65.9",
    feedback: "V = (1/3)\u03C0r\u00B2h = (1/3) \u00D7 3.14 \u00D7 9 \u00D7 7 = 65.94 \u2248 65.9" },
  { id: 7, layer: "Understanding", type: "multiple-choice",
    prompt: "A cone and a cylinder have the same radius and height. How do their volumes compare?",
    options: ["The cone is half", "The cone is one-third", "They are equal", "The cone is two-thirds"],
    correctAnswer: "The cone is one-third",
    feedback: "V(cone) = (1/3)\u03C0r\u00B2h, so a cone is exactly 1/3 the volume of the same cylinder." },
  { id: 8, layer: "Understanding", type: "multiple-choice",
    prompt: "If you double the radius of a sphere, its volume...",
    options: ["Doubles", "Quadruples", "Multiplies by 8", "Stays the same"],
    correctAnswer: "Multiplies by 8",
    feedback: "V = (4/3)\u03C0r\u00B3. Double r means (2r)\u00B3 = 8r\u00B3, so volume \u00D7 8." },
  { id: 9, layer: "Understanding", type: "multiple-choice",
    prompt: "Why is the cone volume formula (1/3) of the cylinder?",
    options: [
      "Because a cone tapers to a point, using only 1/3 of the space",
      "Because cones have 3 sides",
      "Because the height is divided by 3",
      "It is just a coincidence",
    ],
    correctAnswer: "Because a cone tapers to a point, using only 1/3 of the space",
    feedback: "The tapering means each layer is smaller, and the integral works out to exactly 1/3." },
];

// ===========================================================================
// STAGE 1: HOOK
// ===========================================================================

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/VolumeHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 2200));
    timers.push(setTimeout(() => setPhase(3), 3800));
    timers.push(setTimeout(() => setPhase(4), 5500));
    timers.push(setTimeout(() => setPhase(5), 6800));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 5)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const svgW = 320;
  const svgH = 240;

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-md" aria-label="3D solids filling with cubes">
        {/* Box / Prism */}
        {phase >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <rect x={20} y={60} width={80} height={100} fill={THEME.prismFill} stroke={THEME.prism} strokeWidth={2} rx={2} />
            {/* Grid lines to show unit cubes */}
            {[1, 2, 3].map((r) => (
              <line key={`h${r}`} x1={20} y1={60 + r * 25} x2={100} y2={60 + r * 25}
                stroke={THEME.prism} strokeWidth={0.5} opacity={0.5} />
            ))}
            {[1, 2, 3].map((c) => (
              <line key={`v${c}`} x1={20 + c * 20} y1={60} x2={20 + c * 20} y2={160}
                stroke={THEME.prism} strokeWidth={0.5} opacity={0.5} />
            ))}
            <text x={60} y={185} textAnchor={"middle" as const} fill={THEME.prism} fontSize={11} fontWeight={600}>
              Prism
            </text>
          </motion.g>
        )}

        {/* Cylinder */}
        {phase >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <ellipse cx={170} cy={70} rx={35} ry={10} fill={THEME.cylinderFill} stroke={THEME.cylinder} strokeWidth={2} />
            <line x1={135} y1={70} x2={135} y2={155} stroke={THEME.cylinder} strokeWidth={2} />
            <line x1={205} y1={70} x2={205} y2={155} stroke={THEME.cylinder} strokeWidth={2} />
            <ellipse cx={170} cy={155} rx={35} ry={10} fill={THEME.cylinderFill} stroke={THEME.cylinder} strokeWidth={2} />
            <text x={170} y={185} textAnchor={"middle" as const} fill={THEME.cylinder} fontSize={11} fontWeight={600}>
              Cylinder
            </text>
          </motion.g>
        )}

        {/* Cone */}
        {phase >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <line x1={280} y1={60} x2={250} y2={155} stroke={THEME.cone} strokeWidth={2} />
            <line x1={280} y1={60} x2={310} y2={155} stroke={THEME.cone} strokeWidth={2} />
            <ellipse cx={280} cy={155} rx={30} ry={8} fill={THEME.coneFill} stroke={THEME.cone} strokeWidth={2} />
            <text x={280} y={185} textAnchor={"middle" as const} fill={THEME.cone} fontSize={11} fontWeight={600}>
              Cone
            </text>
          </motion.g>
        )}

        {/* Title */}
        {phase >= 4 && (
          <motion.text x={svgW / 2} y={30} textAnchor={"middle" as const}
            fill={TEXT} fontSize={16} fontWeight={700}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            How much space is inside?
          </motion.text>
        )}
      </svg>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-medium"
            style={{ color: THEME.textSecondaryLight, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            Volume tells us the 3D space a solid fills.
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 5 && <ContinueButton onClick={onContinue} delay={0.3} />}
    </section>
  );
}

// ===========================================================================
// STAGE 2: SPATIAL
// ===========================================================================

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  const [solid, setSolid] = useState<SolidType>("prism");
  const [dim1, setDim1] = useState(4);
  const [dim2, setDim2] = useState(3);
  const [height, setHeight] = useState(5);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 8;

  const volume = useMemo(() => {
    switch (solid) {
      case "prism": return dim1 * dim2 * height;
      case "cylinder": return Math.round(PI * dim1 * dim1 * height * 100) / 100;
      case "cone": return Math.round((PI * dim1 * dim1 * height / 3) * 100) / 100;
      case "sphere": return Math.round((4 / 3 * PI * dim1 * dim1 * dim1) * 100) / 100;
    }
  }, [solid, dim1, dim2, height]);

  const formula = useMemo(() => {
    switch (solid) {
      case "prism": return `V = ${dim1} \u00D7 ${dim2} \u00D7 ${height} = ${volume}`;
      case "cylinder": return `V = \u03C0 \u00D7 ${dim1}\u00B2 \u00D7 ${height} = ${volume}`;
      case "cone": return `V = (1/3)\u03C0 \u00D7 ${dim1}\u00B2 \u00D7 ${height} = ${volume}`;
      case "sphere": return `V = (4/3)\u03C0 \u00D7 ${dim1}\u00B3 = ${volume}`;
    }
  }, [solid, dim1, dim2, height, volume]);

  const svgW = 280;
  const svgH = 200;

  const solidColor = solid === "prism" ? THEME.prism : solid === "cylinder" ? THEME.cylinder
    : solid === "cone" ? THEME.cone : THEME.sphere;
  const solidFill = solid === "prism" ? THEME.prismFill : solid === "cylinder" ? THEME.cylinderFill
    : solid === "cone" ? THEME.coneFill : THEME.sphereFill;

  const interact = useCallback(() => { setInteractions((i) => i + 1); }, []);

  return (
    <section className="flex flex-1 flex-col items-center px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <p className="text-center mb-2 font-medium"
        style={{ color: THEME.textSecondaryLight, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
        Pick a solid and adjust its dimensions
      </p>

      {/* Solid picker */}
      <div className="flex gap-1 justify-center mb-3 flex-wrap">
        {(["prism", "cylinder", "cone", "sphere"] as const).map((s) => {
          const c = s === "prism" ? THEME.prism : s === "cylinder" ? THEME.cylinder
            : s === "cone" ? THEME.cone : THEME.sphere;
          return (
            <button key={s} onClick={() => { setSolid(s); interact(); }}
              className="rounded-lg px-3 py-2 text-xs font-medium transition-colors min-h-[44px] min-w-[44px]"
              style={{ backgroundColor: solid === s ? c : SURFACE, color: TEXT }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          );
        })}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs" aria-label={`Interactive ${solid}`}>
        {solid === "prism" && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={90} y={30} width={dim1 * 15} height={height * 15}
              fill={solidFill} stroke={solidColor} strokeWidth={2} rx={2} />
            <text x={90 + dim1 * 7.5} y={25} textAnchor={"middle" as const} fill={solidColor} fontSize={12}>
              {dim1} {"\u00D7"} {dim2}
            </text>
            <text x={90 + dim1 * 15 + 15} y={30 + height * 7.5} textAnchor={"start" as const} fill={solidColor} fontSize={12}>
              h={height}
            </text>
          </motion.g>
        )}
        {solid === "cylinder" && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={svgW / 2} cy={40} rx={dim1 * 12} ry={8} fill={solidFill} stroke={solidColor} strokeWidth={2} />
            <line x1={svgW / 2 - dim1 * 12} y1={40} x2={svgW / 2 - dim1 * 12} y2={40 + height * 18}
              stroke={solidColor} strokeWidth={2} />
            <line x1={svgW / 2 + dim1 * 12} y1={40} x2={svgW / 2 + dim1 * 12} y2={40 + height * 18}
              stroke={solidColor} strokeWidth={2} />
            <ellipse cx={svgW / 2} cy={40 + height * 18} rx={dim1 * 12} ry={8}
              fill={solidFill} stroke={solidColor} strokeWidth={2} />
            <text x={svgW / 2} y={25} textAnchor={"middle" as const} fill={solidColor} fontSize={12}>
              r={dim1}
            </text>
          </motion.g>
        )}
        {solid === "cone" && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={svgW / 2} y1={30} x2={svgW / 2 - dim1 * 12} y2={30 + height * 18}
              stroke={solidColor} strokeWidth={2} />
            <line x1={svgW / 2} y1={30} x2={svgW / 2 + dim1 * 12} y2={30 + height * 18}
              stroke={solidColor} strokeWidth={2} />
            <ellipse cx={svgW / 2} cy={30 + height * 18} rx={dim1 * 12} ry={8}
              fill={solidFill} stroke={solidColor} strokeWidth={2} />
            <text x={svgW / 2} y={20} textAnchor={"middle" as const} fill={solidColor} fontSize={12}>
              r={dim1}, h={height}
            </text>
          </motion.g>
        )}
        {solid === "sphere" && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={svgW / 2} cy={svgH / 2} r={dim1 * 15} fill={solidFill} stroke={solidColor} strokeWidth={2} />
            <line x1={svgW / 2} y1={svgH / 2} x2={svgW / 2 + dim1 * 15} y2={svgH / 2}
              stroke={solidColor} strokeWidth={2} strokeDasharray="4,3" />
            <text x={svgW / 2 + dim1 * 7.5} y={svgH / 2 - 8} textAnchor={"middle" as const}
              fill={solidColor} fontSize={12}>r={dim1}</text>
          </motion.g>
        )}
      </svg>

      {/* Dimension controls */}
      <div className="w-full max-w-xs space-y-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-xs w-16" style={{ color: TEXT_SEC }}>
            {solid === "prism" ? "Length" : "Radius"}
          </span>
          <button onClick={() => { if (dim1 > 1) { setDim1(dim1 - 1); interact(); } }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
            style={{ backgroundColor: SURFACE, color: TEXT }}>
            {"\u2212"}
          </button>
          <span className="font-mono font-bold tabular-nums flex-1 text-center" style={{ color: TEXT }}>
            {dim1}
          </span>
          <button onClick={() => { if (dim1 < 6) { setDim1(dim1 + 1); interact(); } }}
            className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
            style={{ backgroundColor: SURFACE, color: TEXT }}>
            +
          </button>
        </div>
        {solid === "prism" && (
          <div className="flex items-center gap-3">
            <span className="text-xs w-16" style={{ color: TEXT_SEC }}>Width</span>
            <button onClick={() => { if (dim2 > 1) { setDim2(dim2 - 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
              style={{ backgroundColor: SURFACE, color: TEXT }}>
              {"\u2212"}
            </button>
            <span className="font-mono font-bold tabular-nums flex-1 text-center" style={{ color: TEXT }}>
              {dim2}
            </span>
            <button onClick={() => { if (dim2 < 6) { setDim2(dim2 + 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
              style={{ backgroundColor: SURFACE, color: TEXT }}>
              +
            </button>
          </div>
        )}
        {solid !== "sphere" && (
          <div className="flex items-center gap-3">
            <span className="text-xs w-16" style={{ color: TEXT_SEC }}>Height</span>
            <button onClick={() => { if (height > 1) { setHeight(height - 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
              style={{ backgroundColor: SURFACE, color: TEXT }}>
              {"\u2212"}
            </button>
            <span className="font-mono font-bold tabular-nums flex-1 text-center" style={{ color: TEXT }}>
              {height}
            </span>
            <button onClick={() => { if (height < 8) { setHeight(height + 1); interact(); } }}
              className="rounded-full flex items-center justify-center min-h-[44px] min-w-[44px] font-bold"
              style={{ backgroundColor: SURFACE, color: TEXT }}>
              +
            </button>
          </div>
        )}
      </div>

      {/* Formula */}
      <div className="rounded-xl p-3 w-full max-w-xs text-center" style={{ backgroundColor: SURFACE }}>
        <p className="font-mono font-bold" style={{ color: solidColor }}>{formula}</p>
      </div>

      <div className="mt-3">
        <InteractionDots count={Math.min(interactions, 8)} total={8} activeColor={PRIMARY} />
      </div>
      {canContinue && <ContinueButton onClick={onContinue} color={PRIMARY} />}
    </section>
  );
}

// ===========================================================================
// STAGE 3: DISCOVERY
// ===========================================================================

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  const prompts = useMemo(() => [
    { text: "A prism is just layers of its base stacked up: V = Base Area \u00D7 height.", btn: "I see it!" },
    { text: "A cylinder is a circular prism: the base is \u03C0r\u00B2, so V = \u03C0r\u00B2h.", btn: "I see it!" },
    { text: "A cone is exactly 1/3 of a cylinder with the same base and height: V = (1/3)\u03C0r\u00B2h.", btn: "Got it!" },
  ], []);

  const current = prompts[step];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <svg viewBox="0 0 260 140" className="w-full max-w-[260px] mb-6">
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stacked layers */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.rect key={i} x={70} y={20 + i * 20} width={120} height={18}
                fill={THEME.prismFill} stroke={THEME.prism} strokeWidth={1} rx={2}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }} />
            ))}
            <text x={130} y={135} textAnchor={"middle" as const} fill={THEME.prism} fontSize={13} fontWeight={600}>
              Base {"\u00D7"} height
            </text>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={130} cy={30} rx={50} ry={12} fill={THEME.cylinderFill} stroke={THEME.cylinder} strokeWidth={2} />
            <line x1={80} y1={30} x2={80} y2={110} stroke={THEME.cylinder} strokeWidth={2} />
            <line x1={180} y1={30} x2={180} y2={110} stroke={THEME.cylinder} strokeWidth={2} />
            <ellipse cx={130} cy={110} rx={50} ry={12} fill={THEME.cylinderFill} stroke={THEME.cylinder} strokeWidth={2} />
            <text x={130} y={135} textAnchor={"middle" as const} fill={THEME.cylinder} fontSize={13} fontWeight={600}>
              {"\u03C0"}r{"\u00B2"} {"\u00D7"} h
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Cylinder ghost */}
            <ellipse cx={130} cy={110} rx={50} ry={12} fill="none" stroke={THEME.cylinder} strokeWidth={1}
              strokeDasharray="4,3" opacity={0.4} />
            <line x1={80} y1={30} x2={80} y2={110} stroke={THEME.cylinder} strokeWidth={1}
              strokeDasharray="4,3" opacity={0.4} />
            <line x1={180} y1={30} x2={180} y2={110} stroke={THEME.cylinder} strokeWidth={1}
              strokeDasharray="4,3" opacity={0.4} />
            {/* Cone */}
            <line x1={130} y1={20} x2={80} y2={110} stroke={THEME.cone} strokeWidth={2} />
            <line x1={130} y1={20} x2={180} y2={110} stroke={THEME.cone} strokeWidth={2} />
            <ellipse cx={130} cy={110} rx={50} ry={12} fill={THEME.coneFill} stroke={THEME.cone} strokeWidth={2} />
            <text x={130} y={135} textAnchor={"middle" as const} fill={THEME.cone} fontSize={13} fontWeight={600}>
              (1/3) {"\u00D7"} cylinder
            </text>
          </motion.g>
        )}
      </svg>

      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={SPRING} className="max-w-md text-center px-4">
          <p className="font-medium mb-4"
            style={{ color: TEXT, fontSize: "clamp(14px, 3.5vw, 18px)" }}>
            {current.text}
          </p>
          <Button size="lg"
            onClick={() => { if (step < prompts.length - 1) setStep((s) => s + 1); else onContinue(); }}
            className="min-w-[140px]" style={{ backgroundColor: PRIMARY }}>
            {current.btn}
          </Button>
        </motion.div>
      )}
    </section>
  );
}

// ===========================================================================
// STAGE 4: SYMBOL BRIDGE
// ===========================================================================

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setRevealed(1), 1500));
    timers.push(setTimeout(() => setRevealed(2), 3000));
    timers.push(setTimeout(() => setRevealed(3), 4500));
    timers.push(setTimeout(() => setRevealed(4), 6000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { formula: "V = lwh", desc: "Rectangular prism: length \u00D7 width \u00D7 height", color: THEME.prism },
    { formula: "V = \u03C0r\u00B2h", desc: "Cylinder: circle area times height", color: THEME.cylinder },
    { formula: "V = (1/3)\u03C0r\u00B2h", desc: "Cone: one-third of a cylinder", color: THEME.cone },
    { formula: "V = (4/3)\u03C0r\u00B3", desc: "Sphere: four-thirds pi r-cubed", color: THEME.sphere },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-8"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Volume Formulas
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {notations.map((n, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={SPRING}
                className="rounded-xl p-4"
                style={{ backgroundColor: SURFACE, borderLeft: `4px solid ${n.color}` }}>
                <p className="font-bold font-mono text-lg" style={{ color: n.color }}>{n.formula}</p>
                <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>{n.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= 4 && <ContinueButton onClick={onContinue} delay={0.5} color={PRIMARY} />}
    </section>
  );
}

// ===========================================================================
// STAGE 5: REAL WORLD
// ===========================================================================

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F4E6}", title: "Shipping Box", desc: "How much can a box hold? V = lwh.", math: "Prism volume" },
    { icon: "\u{1F964}", title: "Drinking Cup", desc: "A cylindrical cup: V = \u03C0r\u00B2h tells you how much it holds.", math: "Cylinder volume" },
    { icon: "\u{1F366}", title: "Ice Cream Cone", desc: "The cone holds 1/3 as much as the same-sized cup.", math: "V = (1/3)\u03C0r\u00B2h" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <h2 className="text-center font-bold mb-6"
        style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>
        Real World Connections
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, ...SPRING }}
            className="rounded-xl p-4 flex gap-3 items-start"
            style={{ backgroundColor: SURFACE }}>
            <span className="text-2xl" role="img" aria-hidden="true">{s.icon}</span>
            <div>
              <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
              <p className="text-sm" style={{ color: THEME.textSecondaryLight }}>{s.desc}</p>
              <p className="text-xs font-mono mt-1" style={{ color: PRIMARY }}>{s.math}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <ContinueButton onClick={onContinue} delay={0.3} color={PRIMARY} />
    </section>
  );
}

// ===========================================================================
// STAGE 6: PRACTICE
// ===========================================================================

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<boolean | null>>(() => PRACTICE_PROBLEMS.map(() => null));

  const problem = PRACTICE_PROBLEMS[currentQ]!;
  const isLast = currentQ === PRACTICE_PROBLEMS.length - 1;
  const userAnswer = problem.type === "numeric-input" ? inputValue.trim() : selected;
  const isCorrect = userAnswer === problem.correctAnswer;

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;
    setSubmitted(true);
    setResults((prev) => { const next = [...prev]; next[currentQ] = userAnswer === problem.correctAnswer; return next; });
  }, [userAnswer, currentQ, problem.correctAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) { onContinue(); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setInputValue(""); setSubmitted(false);
  }, [isLast, onContinue]);

  return (
    <section className="flex flex-1 flex-col px-4 pt-4 bg-nm-bg-primary"
      aria-live="polite">
      <div className="flex items-center gap-1.5 justify-center mb-4">
        {PRACTICE_PROBLEMS.map((_, i) => {
          const r = results[i];
          let bg: string = ELEVATED;
          if (r === true) bg = SUCCESS;
          else if (r === false) bg = ERROR;
          return <div key={i} className="rounded-full transition-colors duration-200"
            style={{ width: 10, height: 10, backgroundColor: bg,
              border: i === currentQ ? `2px solid ${PRIMARY}` : "none" }} />;
        })}
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={SPRING} className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: TEXT_SEC }}>
          {problem.layer} {"\u2022"} {currentQ + 1}/{PRACTICE_PROBLEMS.length}
        </p>
        <p className="text-center font-medium mb-6"
          style={{ color: TEXT, fontSize: "clamp(15px, 3.5vw, 18px)" }}>
          {problem.prompt}
        </p>

        {problem.type === "multiple-choice" && problem.options && (
          <div className="space-y-2 w-full">
            {problem.options.map((opt) => {
              let bg: string = SURFACE; let border: string = ELEVATED;
              if (submitted) {
                if (opt === problem.correctAnswer) { bg = "#34d39933"; border = SUCCESS; }
                else if (opt === selected && opt !== problem.correctAnswer) { bg = "#f8717133"; border = ERROR; }
              } else if (opt === selected) { bg = "#8b5cf633"; border = PRIMARY; }
              return (
                <button key={opt} onClick={() => { if (!submitted) setSelected(opt); }}
                  disabled={submitted}
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors min-h-[44px]"
                  style={{ backgroundColor: bg, border: `2px solid ${border}`, color: TEXT }}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {problem.type === "numeric-input" && (
          <input type="number" value={inputValue}
            onChange={(e) => { if (!submitted) setInputValue(e.target.value); }}
            disabled={submitted} placeholder="Enter your answer"
            className="w-full rounded-xl px-4 py-3 text-center text-lg font-mono min-h-[44px]"
            style={{ backgroundColor: SURFACE, color: TEXT,
              border: `2px solid ${submitted ? (isCorrect ? SUCCESS : ERROR) : ELEVATED}`,
              outline: "none" }} />
        )}

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
              className="mt-4 rounded-xl p-4 w-full"
              style={{ backgroundColor: isCorrect ? "#34d39920" : "#f8717120",
                border: `1px solid ${isCorrect ? SUCCESS : ERROR}` }}>
              <p className="font-bold mb-1" style={{ color: isCorrect ? SUCCESS : ERROR }}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm" style={{ color: THEME.textSecondaryLight }}>{problem.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full mt-4 pb-8">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={!userAnswer} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: userAnswer ? 1 : 0.4 }}>
              Check Answer
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full" style={{ backgroundColor: PRIMARY }}>
              {isLast ? "Continue" : "Next \u2192"}
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ===========================================================================
// STAGE 7: REFLECTION
// ===========================================================================

function ReflectionStage({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = text.trim().length >= 20;

  const handleSubmit = useCallback(() => { if (canSubmit) setSubmitted(true); }, [canSubmit]);
  const handleSkip = useCallback(() => { setSubmitted(true); }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 bg-nm-bg-primary"
      aria-live="polite">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={SPRING} className="w-full max-w-md">
        <h2 className="text-center font-bold mb-2"
          style={{ color: TEXT, fontSize: "clamp(20px, 5vw, 28px)" }}>Reflect</h2>
        <p className="text-center mb-6"
          style={{ color: THEME.textSecondaryLight, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Why is a cone exactly 1/3 of a cylinder? How does stacking layers help you understand prism volume?
        </p>

        {!submitted ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type your explanation here..." rows={4}
              className="w-full rounded-xl px-4 py-3 resize-none min-h-[120px]"
              style={{ backgroundColor: SURFACE, color: TEXT,
                border: `2px solid ${ELEVATED}`, outline: "none" }} />
            <p className="text-xs mt-1 text-right"
              style={{ color: text.trim().length >= 20 ? SUCCESS : TEXT_SEC }}>
              {text.trim().length}/20 characters minimum
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={SPRING} className="rounded-xl p-6 text-center"
            style={{ backgroundColor: SURFACE }}>
            <p className="text-2xl mb-2" role="img" aria-label="Star">{"\u2B50"}</p>
            <p className="font-bold" style={{ color: SUCCESS }}>Great thinking!</p>
            <p className="text-sm mt-1" style={{ color: THEME.textSecondaryLight }}>
              Reflecting on concepts deepens your understanding.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-md mx-auto pb-8 pt-4 space-y-2">
        {!submitted ? (
          <>
            <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="w-full"
              style={{ backgroundColor: PRIMARY, opacity: canSubmit ? 1 : 0.4 }}>
              Submit Reflection
            </Button>
            <button onClick={handleSkip} className="w-full text-center py-2 min-h-[44px]"
              style={{ color: MUTED, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Button size="lg" onClick={onComplete} className="w-full" style={{ backgroundColor: PRIMARY }}>
              Complete Lesson
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ===========================================================================
// ROOT COMPONENT
// ===========================================================================

export function VolumeLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="GE-4.7 Volume" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
