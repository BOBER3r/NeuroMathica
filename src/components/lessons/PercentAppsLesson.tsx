"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface PercentAppsLessonProps {
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// SPRING ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const SPRING = springs.default;
const SPRING_POP = springs.pop;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TOKEN ALIASES
// ═══════════════════════════════════════════════════════════════════════════

const BG = colors.bg.primary;
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const TEXT_SEC = colors.text.secondary;
const MUTED = colors.text.muted;
const BORDER = colors.bg.surface;
const BORDER_LIGHT = colors.bg.elevated;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

// ═══════════════════════════════════════════════════════════════════════════
// LESSON-SPECIFIC THEME COLORS
// ═══════════════════════════════════════════════════════════════════════════

const THEME = {
  kept: colors.accent.indigo,       // "you pay" segment
  discount: colors.accent.rose,     // discount/saved segment
  tax: colors.accent.emerald,       // tax/tip segment
  amber: colors.accent.amber,       // highlights
  primary: "#8b5cf6",               // purple — buttons (lesson-specific)
  primaryHover: "#7c3aed",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

/* ContinueButton is now imported from @/components/lessons/ui/ContinueButton */
/* InteractionDots is now imported from @/components/lessons/ui/InteractionDots */

function McButton({
  label,
  selected,
  correct,
  wrong,
  onClick,
  disabled,
}: {
  label: string;
  selected: boolean;
  correct: boolean;
  wrong: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl text-left transition-transform active:scale-[0.97] font-semibold"
      style={{
        minHeight: 52,
        padding: "12px 16px",
        fontSize: 15,
        background: correct
          ? `${SUCCESS}15`
          : wrong
            ? `${ERROR}15`
            : BORDER,
        color: correct ? SUCCESS : wrong ? ERROR : TEXT,
        border: correct
          ? `2px solid ${SUCCESS}`
          : wrong
            ? `2px solid ${ERROR}`
            : selected
              ? `2px solid ${THEME.kept}`
              : "2px solid transparent",
        opacity: disabled && !correct && !wrong ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — HOOK
// Sneaker with 25% off — price bar splits
// ═══════════════════════════════════════════════════════════════════════════

function HookStage({ onComplete }: { onComplete: () => void }) {
  return <VideoHook src="/videos/PercentAppsHook.webm" onComplete={onComplete} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 500));
    timers.push(setTimeout(() => setPhase(2), 1000));
    timers.push(setTimeout(() => setPhase(3), 2000));
    timers.push(setTimeout(() => setPhase(4), 3000));
    timers.push(setTimeout(() => setPhase(5), 3500));
    timers.push(setTimeout(() => setPhase(6), 4500));
    timers.push(setTimeout(() => setPhase(7), 5500));
    timers.push(setTimeout(() => setPhase(8), 6500));
    timers.push(setTimeout(() => setPhase(9), 7500));
    // Failsafe: guarantee Continue button within 4s
    timers.push(setTimeout(() => setPhase((p) => Math.max(p, 9)), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const barW = 500;
  const barH = 36;
  const barX = 150;
  const barY = 260;
  const keptW = barW * 0.75;
  const discW = barW * 0.25;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div
        className="relative w-full"
        style={{ maxWidth: 640 }}
        aria-live="polite"
      >
        <svg
          viewBox="0 0 800 400"
          className="mx-auto w-full"
          style={{ maxWidth: 600 }}
          aria-label="A sneaker priced at $120 with 25 percent off. The price bar splits to show $30 saved and $90 final price."
        >
          <rect width="800" height="400" fill={BG} rx="8" />

          {/* Sneaker silhouette */}
          {phase >= 1 && (
            <motion.g
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <rect x={320} y={80} width={160} height={100} rx={16} fill={BORDER} />
              <rect x={300} y={140} width={200} height={40} rx={8} fill={BORDER_LIGHT} />
              <rect x={310} y={170} width={180} height={10} rx={5} fill={MUTED} />
            </motion.g>
          )}

          {/* Price tag $120 */}
          {phase >= 2 && (
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={SPRING_POP}
            >
              <rect x={350} y={40} width={100} height={36} rx={8} fill={SURFACE} stroke={BORDER_LIGHT} strokeWidth={1} />
              <motion.text
                x={400}
                y={63}
                textAnchor={"middle" as const}
                fill={TEXT}
                fontSize={20}
                fontWeight={700}
                fontFamily="monospace"
              >
                $120
              </motion.text>
            </motion.g>
          )}

          {/* SALE badge */}
          {phase >= 3 && (
            <motion.g
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={SPRING_POP}
            >
              <rect x={520} y={60} width={140} height={40} rx={10} fill={THEME.discount} />
              <motion.text
                x={590}
                y={85}
                textAnchor={"middle" as const}
                fill="white"
                fontSize={16}
                fontWeight={800}
              >
                25% OFF
              </motion.text>
            </motion.g>
          )}

          {/* Full price bar */}
          {phase >= 4 && phase < 5 && (
            <motion.rect
              x={barX}
              y={barY}
              width={barW}
              height={barH}
              rx={6}
              fill={THEME.kept}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}

          {/* Split bar: kept portion */}
          {phase >= 5 && (
            <motion.rect
              x={barX}
              y={barY}
              width={keptW}
              height={barH}
              rx={6}
              fill={THEME.kept}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Split bar: discount portion */}
          {phase >= 5 && (
            <motion.rect
              x={barX + keptW + 4}
              y={barY}
              width={discW - 4}
              height={barH}
              rx={6}
              fill={THEME.discount}
              initial={{ opacity: 1 }}
              animate={{ opacity: phase >= 6 ? 0.3 : 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* $30 saved label */}
          {phase >= 6 && (
            <motion.text
              x={barX + keptW + discW / 2}
              y={barY + barH + 22}
              textAnchor={"middle" as const}
              fill={THEME.discount}
              fontSize={14}
              fontWeight={600}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              $30 saved
            </motion.text>
          )}

          {/* $90 final label */}
          {phase >= 7 && (
            <motion.text
              x={barX + keptW / 2}
              y={barY + barH + 22}
              textAnchor={"middle" as const}
              fill={TEXT}
              fontSize={18}
              fontWeight={700}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={SPRING}
            >
              $90
            </motion.text>
          )}

          {/* Tagline */}
          {phase >= 8 && (
            <motion.text
              x={400}
              y={360}
              textAnchor={"middle" as const}
              fill={MUTED}
              fontSize={16}
              fontStyle="italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Percents in action — every day
            </motion.text>
          )}
        </svg>

        {phase >= 9 && (
          <div className="flex justify-center mt-6">
            <ContinueButton onClick={onComplete} color={THEME.primary} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — SPATIAL EXPERIENCE
// Discount bar model with draggable slider
// ═══════════════════════════════════════════════════════════════════════════

function SpatialStage({ onComplete }: { onComplete: () => void }) {
  const [discountPct, setDiscountPct] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const lastPctRef = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const PRICE = 100;
  const savedAmount = Math.round(PRICE * discountPct) / 100;
  const finalAmount = PRICE - savedAmount;

  const handleSliderChange = useCallback(
    (newPct: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(newPct)));
      setDiscountPct(clamped);
      if (Math.abs(clamped - lastPctRef.current) >= 5) {
        setInteractions((n) => n + 1);
        lastPctRef.current = clamped;
      }
    },
    [],
  );

  const bind = useDrag(
    ({ event, memo, first, xy: [x] }) => {
      event?.preventDefault();
      const el = sliderRef.current;
      if (!el) return memo;
      const rect = first ? el.getBoundingClientRect() : (memo as DOMRect);
      const pct = ((x - rect.left) / rect.width) * 100;
      handleSliderChange(pct);
      return rect;
    },
    { filterTaps: true },
  );

  const tapPreset = useCallback(
    (pct: number) => {
      setDiscountPct(pct);
      setInteractions((n) => n + 1);
      lastPctRef.current = pct;
    },
    [],
  );

  const barW = 300;
  const keptW = barW * ((100 - discountPct) / 100);
  const discW = barW * (discountPct / 100);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg" aria-live="polite">
        <h2
          className="mb-6 text-center text-xl font-bold"
          style={{ color: TEXT }}
        >
          Set the discount
        </h2>

        {/* Original Price */}
        <p
          className="text-center font-mono text-lg font-semibold tabular-nums mb-4"
          style={{ color: TEXT_SEC }}
        >
          Original Price: $100
        </p>

        {/* Bar Model */}
        <div className="flex justify-center mb-6">
          <svg
            viewBox={`0 0 ${barW + 20} 80`}
            width={barW + 20}
            className="w-full max-w-xs"
            aria-label={`Bar showing you pay $${finalAmount.toFixed(0)} and save $${savedAmount.toFixed(0)}`}
          >
            {/* Kept segment */}
            <motion.rect
              x={10}
              y={10}
              width={Math.max(keptW, 0)}
              height={30}
              rx={4}
              fill={THEME.kept}
              animate={{ width: Math.max(keptW, 0) }}
              transition={SPRING}
            />
            {/* Discount segment */}
            {discountPct > 0 && (
              <motion.rect
                x={10 + keptW + 2}
                y={10}
                width={Math.max(discW - 2, 0)}
                height={30}
                rx={4}
                fill={THEME.discount}
                animate={{ width: Math.max(discW - 2, 0), x: 10 + keptW + 2 }}
                transition={SPRING}
              />
            )}
            {/* You Pay label */}
            <motion.text
              x={10 + keptW / 2}
              y={58}
              textAnchor={"middle" as const}
              fill={THEME.kept}
              fontSize={13}
              fontWeight={700}
              fontFamily="monospace"
            >
              {`$${finalAmount.toFixed(0)}`}
            </motion.text>
            {/* Saved label */}
            {discountPct > 5 && (
              <motion.text
                x={10 + keptW + discW / 2}
                y={58}
                textAnchor={"middle" as const}
                fill={THEME.discount}
                fontSize={13}
                fontWeight={700}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {`$${savedAmount.toFixed(0)}`}
              </motion.text>
            )}
          </svg>
        </div>

        {/* Slider */}
        <div className="mb-4 px-4">
          <p className="text-center text-sm mb-2" style={{ color: MUTED }}>
            Discount:{" "}
            <span className="font-mono font-bold tabular-nums" style={{ color: THEME.discount }}>
              {discountPct}%
            </span>
          </p>
          <div
            ref={sliderRef}
            className="relative h-10 rounded-full cursor-pointer touch-none select-none"
            style={{ background: BORDER }}
            {...(bind() as Record<string, unknown>)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              handleSliderChange(pct);
            }}
            role="slider"
            aria-valuenow={discountPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Discount percentage slider"
          >
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: THEME.discount }}
              animate={{ width: `${discountPct}%` }}
              transition={SPRING}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full shadow-lg"
              style={{
                background: TEXT,
                border: `3px solid ${THEME.discount}`,
              }}
              animate={{ left: `calc(${discountPct}% - 14px)` }}
              transition={SPRING}
            />
          </div>
        </div>

        {/* Preset buttons */}
        <div className="flex justify-center gap-2 mb-6">
          {[10, 25, 50, 75].map((pct) => (
            <button
              key={pct}
              onClick={() => tapPreset(pct)}
              className="min-h-[44px] min-w-[44px] rounded-lg px-3 py-2 text-sm font-semibold transition-transform active:scale-95"
              style={{
                background: discountPct === pct ? THEME.discount : BORDER,
                color: TEXT,
              }}
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Status */}
        <InteractionDots count={Math.min(interactions, 8)} total={8} activeColor={THEME.primary} />

        {interactions >= 8 && (
          <div className="flex justify-center mt-4">
            <ContinueButton onClick={onComplete} color={THEME.primary} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — GUIDED DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

const DISCOVERY_PROMPTS = [
  {
    text: "Set the slider to 25%. How much do you save on $100?",
    detail: "25% of $100 = $25 saved. You pay $75.",
    barPct: 25,
    price: 100,
    button: "I see it!",
  },
  {
    text: "Now the price is $80. Is 25% still $25?",
    detail: "25% of $80 = $20, not $25. The discount depends on the price!",
    barPct: 25,
    price: 80,
    button: "I see it!",
  },
  {
    text: "50% off, then another 50% off the sale price. Is it free?",
    detail: "$100 \u2192 $50 \u2192 $25. Two 50% discounts = 75% off, not 100%!",
    barPct: 50,
    price: 100,
    button: "Got it!",
  },
  {
    text: "Tax works the OTHER way \u2014 it ADDS a percent. Watch 8% tax on $50.",
    detail: "$50 + $4 tax = $54. Tax extends the bar beyond the original.",
    barPct: 8,
    price: 50,
    button: "Got it!",
  },
] as const;

function DiscoveryStage({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const prompt = DISCOVERY_PROMPTS[promptIdx]!;
  const isLast = promptIdx >= DISCOVERY_PROMPTS.length - 1;
  const isTax = promptIdx === 3;

  const saved = Math.round(prompt.price * prompt.barPct) / 100;
  const barW = 260;
  const mainW = isTax ? barW : barW * ((100 - prompt.barPct) / 100);
  const extraW = isTax ? barW * (prompt.barPct / 100) : barW * (prompt.barPct / 100);

  const handleAck = useCallback(() => {
    setShowDetail(false);
    if (isLast) {
      onComplete();
    } else {
      setPromptIdx((i) => i + 1);
    }
  }, [isLast, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className="mb-6 text-lg font-semibold"
              style={{ color: TEXT, fontSize: "clamp(16px, 4vw, 20px)" }}
            >
              {prompt.text}
            </p>

            {/* Bar visual */}
            <div className="flex justify-center mb-4">
              <svg
                viewBox={`0 0 ${barW + 40} 70`}
                width={barW + 40}
                className="w-full max-w-xs"
                aria-label={`Bar for ${prompt.price} dollars with ${prompt.barPct} percent`}
              >
                <motion.rect
                  x={10}
                  y={10}
                  width={mainW}
                  height={28}
                  rx={4}
                  fill={THEME.kept}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.rect
                  x={10 + mainW + 2}
                  y={10}
                  width={Math.max(extraW - 2, 0)}
                  height={28}
                  rx={4}
                  fill={isTax ? THEME.tax : THEME.discount}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
                <motion.text
                  x={10 + mainW / 2}
                  y={55}
                  textAnchor={"middle" as const}
                  fill={THEME.kept}
                  fontSize={12}
                  fontWeight={700}
                  fontFamily="monospace"
                >
                  {isTax ? `$${prompt.price}` : `$${prompt.price - saved}`}
                </motion.text>
                <motion.text
                  x={10 + mainW + extraW / 2}
                  y={55}
                  textAnchor={"middle" as const}
                  fill={isTax ? THEME.tax : THEME.discount}
                  fontSize={12}
                  fontWeight={700}
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {isTax ? `+$${saved}` : `$${saved}`}
                </motion.text>
              </svg>
            </div>

            {/* Detail */}
            {!showDetail && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setShowDetail(true)}
                className="mx-auto mb-4 block min-h-[44px] rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: BORDER, color: THEME.amber }}
              >
                Reveal insight
              </motion.button>
            )}

            {showDetail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className="mb-6 text-base"
                  style={{ color: THEME.amber }}
                >
                  {prompt.detail}
                </p>
                <ContinueButton
                  onClick={handleAck}
                  label={prompt.button}
                  color={THEME.primary}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — SYMBOL BRIDGE
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOL_STEPS = [
  { notation: "Discount = Price \u00d7 Rate", color: THEME.kept, detail: "$80 \u00d7 0.25 = $20" },
  { notation: "Final = Price \u2212 Discount", color: SUCCESS, detail: "$80 \u2212 $20 = $60" },
  { notation: "Tax: Final = Price + (Price \u00d7 Rate)", color: THEME.tax, detail: "$50 + ($50 \u00d7 0.08) = $54" },
] as const;

function SymbolBridgeStage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < SYMBOL_STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <h2
          className="mb-8 text-xl font-bold"
          style={{ color: TEXT }}
        >
          The Math Behind It
        </h2>

        <div className="space-y-6">
          {SYMBOL_STEPS.map((s, i) => (
            i < step ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-4"
                style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
              >
                <p
                  className="font-mono text-base font-bold"
                  style={{ color: s.color }}
                >
                  {s.notation}
                </p>
                <p
                  className="mt-1 font-mono text-sm tabular-nums"
                  style={{ color: TEXT_SEC }}
                >
                  {s.detail}
                </p>
              </motion.div>
            ) : null
          ))}
        </div>

        {step >= SYMBOL_STEPS.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div
              className="rounded-xl p-4 mb-6"
              style={{ background: `${THEME.amber}15`, border: `1px solid ${THEME.amber}40` }}
            >
              <p className="font-mono text-sm font-semibold" style={{ color: THEME.amber }}>
                Discount: Final = Price {"\u2212"} (Price {"\u00d7"} Rate)
              </p>
              <p className="font-mono text-sm font-semibold mt-1" style={{ color: THEME.amber }}>
                Tax/Tip: Final = Price + (Price {"\u00d7"} Rate)
              </p>
            </div>
            <ContinueButton onClick={onComplete} color={THEME.primary} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — REAL WORLD ANCHOR
// ═══════════════════════════════════════════════════════════════════════════

const REAL_WORLD = [
  { icon: "Cart", title: "Shopping", text: "Sneakers marked 30% off $95", math: "$95 \u00d7 0.30 = $28.50 saved" },
  { icon: "Fork", title: "Restaurant", text: "18% tip on a $42 meal", math: "$42 \u00d7 0.18 = $7.56 tip" },
  { icon: "Receipt", title: "Sales Tax", text: "7% tax on a $15 book", math: "$15 \u00d7 0.07 = $1.05 tax" },
  { icon: "Piggy", title: "Savings", text: "Your $200 savings grew 5%", math: "$200 \u00d7 0.05 = $10 earned" },
] as const;

function RealWorldStage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <h2
          className="mb-6 text-center text-xl font-bold"
          style={{ color: TEXT }}
        >
          Percents Are Everywhere
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {REAL_WORLD.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.3 }}
              className="rounded-xl p-4"
              style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: THEME.kept }}>
                {item.title}
              </p>
              <p className="text-sm mb-2" style={{ color: TEXT_SEC }}>
                {item.text}
              </p>
              <p className="font-mono text-xs tabular-nums" style={{ color: THEME.amber }}>
                {item.math}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <ContinueButton onClick={onComplete} color={THEME.primary} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 6 — PRACTICE
// ═══════════════════════════════════════════════════════════════════════════

interface PracticeProblem {
  layer: string;
  type: "mc" | "numeric";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctNumeric?: number;
  feedback: string;
}

const PROBLEMS: PracticeProblem[] = [
  {
    layer: "Recall",
    type: "mc",
    prompt: "What does '20% off' mean?",
    options: [
      "Subtract 20 from the price",
      "Multiply by 0.20 then subtract",
      "Divide the price by 20",
      "Add 20% to the price",
    ],
    correctIndex: 1,
    feedback: "20% off means finding 20% of the price, then subtracting that amount.",
  },
  {
    layer: "Recall",
    type: "mc",
    prompt: "A shirt costs $50. The discount is 10%. How much is the discount?",
    options: ["$10", "$5", "$40", "$15"],
    correctIndex: 1,
    feedback: "$50 \u00d7 0.10 = $5. The discount is $5.",
  },
  {
    layer: "Recall",
    type: "mc",
    prompt: "Tax is 8% on a $25 item. Is the final price more or less than $25?",
    options: ["More", "Less", "Same", "Can't tell"],
    correctIndex: 0,
    feedback: "Tax adds to the price, so $25 + tax > $25.",
  },
  {
    layer: "Procedure",
    type: "mc",
    prompt: "A jacket costs $80 and is 25% off. What\u2019s the sale price?",
    options: ["$55", "$60", "$65", "$20"],
    correctIndex: 1,
    feedback: "$80 \u00d7 0.25 = $20 discount. $80 \u2212 $20 = $60.",
  },
  {
    layer: "Procedure",
    type: "numeric",
    prompt: "You leave an 18% tip on a $40 meal. How much is the tip? (in dollars, e.g. 7.20)",
    correctNumeric: 7.2,
    feedback: "$40 \u00d7 0.18 = $7.20.",
  },
  {
    layer: "Procedure",
    type: "mc",
    prompt: "A $60 item has 6% sales tax. What\u2019s the total?",
    options: ["$63.60", "$66.00", "$56.40", "$3.60"],
    correctIndex: 0,
    feedback: "$60 \u00d7 0.06 = $3.60 tax. $60 + $3.60 = $63.60.",
  },
  {
    layer: "Understanding",
    type: "mc",
    prompt: "A store marks an item 40% off, then takes another 10% off the sale price. Is this the same as 50% off?",
    options: [
      "Yes, 40 + 10 = 50",
      "No \u2014 it\u2019s less than 50% off",
      "No \u2014 it\u2019s more than 50% off",
      "Only for items over $100",
    ],
    correctIndex: 1,
    feedback: "0.60 \u00d7 0.90 = 0.54, so you pay 54%. That\u2019s only 46% off, less than 50%.",
  },
  {
    layer: "Understanding",
    type: "mc",
    prompt: "Item A: $200, 30% off. Item B: $150, 40% off. Which is cheaper?",
    options: ["Item A at $140", "Item B at $90", "Same price", "Can't tell"],
    correctIndex: 1,
    feedback: "A: $200 \u00d7 0.70 = $140. B: $150 \u00d7 0.60 = $90. Item B is cheaper.",
  },
  {
    layer: "Understanding",
    type: "mc",
    prompt: "A price goes from $80 to $100. What is the percent increase?",
    options: ["20%", "25%", "80%", "125%"],
    correctIndex: 1,
    feedback: "Change = $20. Percent change = 20/80 = 0.25 = 25%. Divide by the ORIGINAL.",
  },
];

function PracticeStage({ onComplete }: { onComplete: () => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [numInput, setNumInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const problem = PROBLEMS[qIdx]!;
  const isLast = qIdx >= PROBLEMS.length - 1;

  const handleMcSelect = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      const correct = idx === problem.correctIndex;
      setIsCorrect(correct);
      setAnswered(true);
    },
    [answered, problem.correctIndex],
  );

  const handleNumericSubmit = useCallback(() => {
    if (answered) return;
    const val = parseFloat(numInput);
    if (isNaN(val)) return;
    const correct =
      problem.correctNumeric !== undefined &&
      Math.abs(val - problem.correctNumeric) < 0.01;
    setIsCorrect(correct);
    setAnswered(true);
  }, [answered, numInput, problem.correctNumeric]);

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete();
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
      setNumInput("");
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [isLast, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: MUTED }}
          >
            {problem.layer}
          </span>
          <span
            className="font-mono text-xs tabular-nums"
            style={{ color: MUTED }}
          >
            {qIdx + 1}/{PROBLEMS.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <p
              className="mb-5 text-base font-semibold"
              style={{ color: TEXT }}
            >
              {problem.prompt}
            </p>

            {problem.type === "mc" && problem.options && (
              <div className="space-y-2">
                {problem.options.map((opt, i) => (
                  <McButton
                    key={i}
                    label={opt}
                    selected={selected === i}
                    correct={answered && i === problem.correctIndex}
                    wrong={answered && selected === i && i !== problem.correctIndex}
                    onClick={() => handleMcSelect(i)}
                    disabled={answered}
                  />
                ))}
              </div>
            )}

            {problem.type === "numeric" && (
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={numInput}
                  onChange={(e) => setNumInput(e.target.value)}
                  disabled={answered}
                  className="flex-1 rounded-xl px-4 py-3 font-mono text-base tabular-nums min-h-[48px]"
                  style={{
                    background: BORDER,
                    color: TEXT,
                    border: answered
                      ? `2px solid ${isCorrect ? SUCCESS : ERROR}`
                      : `2px solid transparent`,
                  }}
                  aria-label="Your answer"
                />
                {!answered && (
                  <button
                    onClick={handleNumericSubmit}
                    className="min-h-[48px] min-w-[48px] rounded-xl px-4 font-semibold text-white active:scale-95"
                    style={{ background: THEME.primary }}
                  >
                    Check
                  </button>
                )}
              </div>
            )}

            {/* Feedback */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 rounded-xl p-4"
                style={{
                  background: isCorrect ? `${SUCCESS}15` : `${ERROR}15`,
                  border: `1px solid ${isCorrect ? SUCCESS : ERROR}40`,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: isCorrect ? SUCCESS : ERROR }}>
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                <p className="text-sm mt-1" style={{ color: TEXT_SEC }}>
                  {problem.feedback}
                </p>
              </motion.div>
            )}

            {/* Next button — no auto-advance */}
            {answered && (
              <div className="flex justify-center mt-5">
                <ContinueButton
                  onClick={handleNext}
                  label={isLast ? "Finish Practice" : "Next \u2192"}
                  color={THEME.primary}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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

  const handleSkip = useCallback(() => {
    setSubmitted(true);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <h2 className="mb-4 text-xl font-bold" style={{ color: TEXT }}>
          Reflect
        </h2>
        <p className="mb-6 text-base" style={{ color: TEXT_SEC }}>
          Explain in your own words why {"\u201C"}20% off $80{"\u201D"} is NOT the same as subtracting 20 from 80.
        </p>

        {!submitted ? (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl p-4 text-sm min-h-[100px] resize-none"
              style={{
                background: SURFACE,
                color: TEXT,
                border: `1px solid ${BORDER}`,
              }}
              placeholder="Type your explanation here..."
              aria-label="Your reflection"
            />
            <p className="mt-1 text-xs" style={{ color: MUTED }}>
              {text.length < 20
                ? `${20 - text.length} more characters needed`
                : "Ready to submit!"}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={handleSkip}
                className="min-h-[44px] rounded-lg px-4 py-2 text-sm"
                style={{ color: MUTED }}
              >
                Skip
              </button>
              <ContinueButton
                onClick={handleSubmit}
                label="Submit"
                disabled={text.length < 20}
                color={THEME.primary}
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
          >
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${SUCCESS}15`, border: `1px solid ${SUCCESS}40` }}
            >
              <p className="text-base font-semibold" style={{ color: SUCCESS }}>
                Great thinking!
              </p>
              <p className="text-sm mt-2" style={{ color: TEXT_SEC }}>
                Explaining concepts in your own words is one of the most powerful ways to learn. +15 XP
              </p>
            </div>
            <ContinueButton onClick={onComplete} label="Complete Lesson" color={THEME.primary} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LESSON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PercentAppsLesson({ onComplete }: PercentAppsLessonProps) {
  return (
    <LessonShell title="NO-3.2 Percent Applications" stages={[...NLS_STAGES]} onComplete={onComplete}>
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
