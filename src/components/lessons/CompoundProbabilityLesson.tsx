"use client";
import { VideoHook } from "@/components/lessons/VideoHook";
import { LessonShell } from "@/components/lessons/ui/LessonShell";
import { ContinueButton } from "@/components/lessons/ui/ContinueButton";
import { InteractionDots } from "@/components/lessons/ui/InteractionDots";
import { colors } from "@/lib/tokens/colors";
import { springs } from "@/lib/tokens/motion";
import { NLS_STAGES } from "@/lib/tokens/stages";

/**
 * SP-5.4a Compound Probability — Grade 7
 * Prerequisites: SP-5.4 (Simple Probability)
 *
 * Pedagogical Design (embedded):
 * ─────────────────────────────
 * Core insight: For independent events, P(A and B) = P(A) * P(B).
 *   For dependent events (without replacement), the second probability
 *   changes because the sample space shrinks.
 *
 * Stage flow:
 *  1. Hook — two coins flip simultaneously; how likely both heads?
 *  2. Spatial — interactive tree diagram: tap branches to build outcomes
 *  3. Discovery — independent vs dependent; with/without replacement
 *  4. Symbol Bridge — P(A and B) = P(A) * P(B); conditional adjustment
 *  5. Real World — card games, weather forecasts, genetics
 *  6. Practice — 9 problems
 *  7. Reflection
 */

import { useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/* ── Lesson-specific semantic colors (THEME) ── */
const THEME = {
  eventA: colors.functional.info,      // #60a5fa — blue
  eventB: colors.accent.violet,        // #a78bfa — purple
  result: colors.accent.cyan,          // #22d3ee — cyan
  warn: colors.functional.warning,     // #fbbf24 — yellow
} as const;

/* ── Aliases for shared tokens (keeps inline style refs short) ── */
const SURFACE = colors.bg.secondary;
const TEXT = colors.text.primary;
const MUTED = colors.text.secondary;
const BORDER = colors.bg.elevated;
const PRIMARY = colors.accent.indigo;
const SUCCESS = colors.functional.success;
const ERROR = colors.functional.error;

const SPRING = springs.default;

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

function StageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary px-4 py-12"
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  STAGE 1: Hook — Two coins                                         */
/* ================================================================== */

function HookStage({ onContinue }: { onContinue: () => void }) {
  return <VideoHook src="/videos/CompoundProbabilityHook.webm" onComplete={onContinue} />;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5000),
      // Failsafe: guarantee Continue button within 4s
      setTimeout(() => setPhase((p) => Math.max(p, 4)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const outcomes = ["HH", "HT", "TH", "TT"];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center text-[clamp(20px,5vw,32px)] font-bold"
          style={{ color: TEXT }}
        >
          Flip two coins. What are the chances?
        </motion.h2>

        {/* Two coin circles */}
        <div className="flex gap-8">
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }}
              className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
              style={{ background: `${THEME.eventA}25`, border: `3px solid ${THEME.eventA}`, color: THEME.eventA }}
            >
              H
            </motion.div>
          )}
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
              style={{ background: `${THEME.eventB}25`, border: `3px solid ${THEME.eventB}`, color: THEME.eventB }}
            >
              T
            </motion.div>
          )}
        </div>

        {/* Outcomes grid */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            {outcomes.map((o, i) => (
              <motion.div
                key={o}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, ...SPRING }}
                className="rounded-xl px-4 py-3 text-center font-mono text-lg font-bold"
                style={{
                  background: o === "HH" && phase >= 3 ? `${SUCCESS}25` : SURFACE,
                  color: o === "HH" && phase >= 3 ? SUCCESS : TEXT,
                  border: `2px solid ${o === "HH" && phase >= 3 ? SUCCESS : BORDER}`,
                }}
              >
                {o}
              </motion.div>
            ))}
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center font-mono text-xl font-bold"
            style={{ color: TEXT }}
          >
            {"P(HH) = "}
            <span style={{ color: THEME.eventA }}>{"1/2"}</span>
            {" \u00D7 "}
            <span style={{ color: THEME.eventB }}>{"1/2"}</span>
            {" = "}
            <span style={{ color: THEME.result }}>{"1/4"}</span>
          </motion.p>
        )}

        {phase >= 4 && <ContinueButton onClick={onContinue} delay={0.3} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 2: Spatial — Interactive tree diagram                        */
/* ================================================================== */

function SpatialStage({ onContinue }: { onContinue: () => void }) {
  // Coin + Die tree: Coin {H, T}, then Die {1,2,3,4,5,6}
  const [coinChoice, setCoinChoice] = useState<"H" | "T" | null>(null);
  const [dieChoice, setDieChoice] = useState<number | null>(null);
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [interactions, setInteractions] = useState(0);
  const canContinue = interactions >= 6;

  const handleCoin = useCallback((c: "H" | "T") => {
    setCoinChoice(c);
    setDieChoice(null);
    setInteractions((n) => n + 1);
  }, []);

  const handleDie = useCallback((d: number) => {
    if (!coinChoice) return;
    setDieChoice(d);
    setInteractions((n) => n + 1);
    const outcome = `${coinChoice}${d}`;
    setOutcomes((prev) => prev.includes(outcome) ? prev : [...prev, outcome]);
  }, [coinChoice]);

  const handleReset = useCallback(() => {
    setCoinChoice(null);
    setDieChoice(null);
  }, []);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Build the tree: Coin + Die
        </h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>
          First pick a coin outcome, then a die number. How many total outcomes?
        </p>

        {/* Step 1: Coin */}
        <div className="flex gap-3">
          <p className="text-sm font-semibold self-center" style={{ color: THEME.eventA }}>Coin:</p>
          {(["H", "T"] as const).map((c) => (
            <motion.button
              key={c}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCoin(c)}
              className="flex items-center justify-center rounded-xl font-mono text-lg font-bold"
              style={{
                minHeight: 48,
                minWidth: 56,
                background: coinChoice === c ? `${THEME.eventA}40` : SURFACE,
                border: `2px solid ${coinChoice === c ? THEME.eventA : BORDER}`,
                color: coinChoice === c ? THEME.eventA : TEXT,
              }}
              aria-label={`Coin: ${c}`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* Step 2: Die */}
        {coinChoice && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2">
            <p className="w-full text-center text-sm font-semibold" style={{ color: THEME.eventB }}>Die:</p>
            {[1, 2, 3, 4, 5, 6].map((d) => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDie(d)}
                className="flex items-center justify-center rounded-xl font-mono text-lg font-bold"
                style={{
                  minHeight: 48,
                  minWidth: 48,
                  background: dieChoice === d ? `${THEME.eventB}40` : SURFACE,
                  border: `2px solid ${dieChoice === d ? THEME.eventB : BORDER}`,
                  color: dieChoice === d ? THEME.eventB : TEXT,
                }}
                aria-label={`Die: ${d}`}
              >
                {d}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Current outcome */}
        {dieChoice !== null && coinChoice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            className="rounded-xl px-6 py-3 text-center"
            style={{ background: `${THEME.result}20`, border: `2px solid ${THEME.result}` }}
          >
            <p className="font-mono text-lg font-bold" style={{ color: THEME.result }}>
              {"Outcome: "}{coinChoice}{dieChoice}
            </p>
            <p className="text-sm" style={{ color: MUTED }}>
              {"P = 1/2 \u00D7 1/6 = 1/12"}
            </p>
          </motion.div>
        )}

        {/* Try again */}
        {dieChoice !== null && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="rounded-lg px-4 py-2 text-sm font-semibold"
            style={{ background: SURFACE, color: MUTED, minHeight: 44 }}
            aria-label="Try another combination"
          >
            {"Try another \u21BA"}
          </motion.button>
        )}

        {/* Collected outcomes */}
        {outcomes.length > 0 && (
          <div className="rounded-xl p-3" style={{ background: SURFACE }}>
            <p className="mb-2 text-xs font-semibold" style={{ color: MUTED }}>
              Found {outcomes.length} of 12 outcomes:
            </p>
            <div className="flex flex-wrap gap-1">
              {outcomes.map((o) => (
                <span key={o} className="rounded-md px-2 py-1 font-mono text-xs font-bold" style={{ background: `${THEME.result}20`, color: THEME.result }}>
                  {o}
                </span>
              ))}
            </div>
          </div>
        )}

        {canContinue && <ContinueButton onClick={onContinue} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 3: Discovery                                                 */
/* ================================================================== */

function DiscoveryStage({ onContinue }: { onContinue: () => void }) {
  const prompts = useMemo(() => [
    { text: "When two events don't affect each other (like flipping a coin then rolling a die), they are INDEPENDENT. The first result doesn't change the second.", button: "I see it!" },
    { text: "For independent events: P(A and B) = P(A) \u00D7 P(B). Just multiply the individual probabilities!", button: "I see it!" },
    { text: "But what if you draw a card and don't put it back? Now the second draw has fewer cards. These are DEPENDENT events (without replacement). The probabilities change!", button: "Got it!" },
  ], []);

  const [promptIdx, setPromptIdx] = useState(0);
  const current = prompts[promptIdx]!;

  const handleAck = useCallback(() => {
    if (promptIdx < prompts.length - 1) setPromptIdx((i) => i + 1);
    else onContinue();
  }, [promptIdx, prompts.length, onContinue]);

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <InteractionDots count={promptIdx + 1} total={prompts.length} activeColor={PRIMARY} />

        <AnimatePresence mode="wait">
          <motion.div
            key={promptIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: SURFACE }}
          >
            <p className="text-[clamp(16px,4vw,20px)] leading-relaxed" style={{ color: TEXT }}>
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dependent vs Independent visual */}
        {promptIdx >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="rounded-xl p-3 text-center" style={{ background: `${SUCCESS}15` }}>
              <p className="text-xs font-bold" style={{ color: SUCCESS }}>With Replacement</p>
              <p className="mt-1 font-mono text-sm" style={{ color: TEXT }}>
                {"P = 4/52 \u00D7 4/52"}<br />
                {"(Independent)"}
              </p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: `${THEME.warn}15` }}>
              <p className="text-xs font-bold" style={{ color: THEME.warn }}>Without Replacement</p>
              <p className="mt-1 font-mono text-sm" style={{ color: TEXT }}>
                {"P = 4/52 \u00D7 3/51"}<br />
                {"(Dependent)"}
              </p>
            </div>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAck}
          className="rounded-xl px-8 py-3 text-base font-semibold text-white"
          style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}
        >
          {current.button}
        </motion.button>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 4: Symbol Bridge                                             */
/* ================================================================== */

function SymbolBridgeStage({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const notations = [
    { text: "P(A and B) = P(A) \u00D7 P(B)", subtitle: "Independent events", color: SUCCESS },
    { text: "P(A and B) = P(A) \u00D7 P(B|A)", subtitle: "Dependent events", color: THEME.warn },
    { text: "Total outcomes = n\u2081 \u00D7 n\u2082", subtitle: "Counting principle", color: THEME.result },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Compound Probability Rules
        </h2>
        {notations.map((n, i) =>
          i <= step ? (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="w-full rounded-xl px-6 py-4 text-center" style={{ background: SURFACE }}>
              <p className="font-mono text-[clamp(16px,4vw,22px)] font-bold" style={{ color: n.color }}>{n.text}</p>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>{n.subtitle}</p>
            </motion.div>
          ) : null
        )}
        {step >= 3 && <ContinueButton onClick={onContinue} delay={0.5} />}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 5: Real World                                                */
/* ================================================================== */

function RealWorldStage({ onContinue }: { onContinue: () => void }) {
  const scenarios = [
    { icon: "\u{1F0CF}", title: "Card Games", desc: "Drawing two aces without replacement: P = 4/52 \u00D7 3/51 = 12/2652 \u2248 0.45%. Much harder than with replacement!" },
    { icon: "\u{1F327}\uFE0F", title: "Weather Forecasts", desc: "If there's a 30% chance of rain on Saturday AND Sunday (independent), P(both rainy) = 0.3 \u00D7 0.3 = 9%." },
    { icon: "\u{1F9EC}", title: "Genetics", desc: "Each parent has a 50% chance of passing a gene. P(both pass it) = 0.5 \u00D7 0.5 = 25%." },
  ];

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>
          Compound Probability in Real Life
        </h2>
        {scenarios.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, ...SPRING }} className="w-full rounded-xl p-4" style={{ background: SURFACE }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: TEXT }}>{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <ContinueButton onClick={onContinue} />
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 6: Practice                                                  */
/* ================================================================== */

interface PracticeProblem {
  id: number;
  layer: "recall" | "procedure" | "understanding";
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

const PROBLEMS: PracticeProblem[] = [
  { id: 1, layer: "recall", question: "Two events are independent when:", options: ["One affects the other", "One does NOT affect the other", "They happen at the same time", "They have the same probability"], correctIndex: 1, feedback: "Independent events don't influence each other. The result of one doesn't change the probability of the other." },
  { id: 2, layer: "recall", question: "For independent events, P(A and B) =", options: ["P(A) + P(B)", "P(A) \u00D7 P(B)", "P(A) \u2212 P(B)", "P(A) \u00F7 P(B)"], correctIndex: 1, feedback: "For independent events, you MULTIPLY the probabilities: P(A and B) = P(A) \u00D7 P(B)." },
  { id: 3, layer: "recall", question: "Drawing cards WITHOUT replacement makes events:", options: ["Independent", "Dependent", "Impossible", "Certain"], correctIndex: 1, feedback: "Without replacement, the first draw changes the remaining cards, making the events dependent." },
  { id: 4, layer: "procedure", question: "You flip a coin twice. P(both heads) =", options: ["1/2", "1/4", "1/3", "1/8"], correctIndex: 1, feedback: "P(H) \u00D7 P(H) = 1/2 \u00D7 1/2 = 1/4." },
  { id: 5, layer: "procedure", question: "You roll two dice. P(both show 6) =", options: ["1/6", "1/12", "1/36", "2/6"], correctIndex: 2, feedback: "P(6) \u00D7 P(6) = 1/6 \u00D7 1/6 = 1/36." },
  { id: 6, layer: "procedure", question: "A bag has 5 red and 3 blue marbles. You draw 2 WITHOUT replacement. P(both red) =", options: ["25/64", "5/14", "20/56", "5/8"], correctIndex: 2, feedback: "P(1st red) = 5/8. P(2nd red) = 4/7. Product = 20/56 = 5/14. Both 20/56 and 5/14 are correct." },
  { id: 7, layer: "understanding", question: "You flip a coin 3 times. How many total outcomes are there?", options: ["3", "6", "8", "9"], correctIndex: 2, feedback: "2 \u00D7 2 \u00D7 2 = 8 outcomes (HHH, HHT, HTH, HTT, THH, THT, TTH, TTT)." },
  { id: 8, layer: "understanding", question: "With replacement, does the probability change between draws?", options: ["Yes, it always changes", "No, it stays the same", "Only if you draw the same item", "Only on the third draw"], correctIndex: 1, feedback: "With replacement, you put the item back. The sample space stays the same, so probabilities don't change." },
  { id: 9, layer: "understanding", question: "Why is P(A and B) always less than or equal to P(A) alone?", options: ["Because multiplication makes numbers smaller (when multiplying by fractions < 1)", "Because events cancel each other out", "Because A and B are always independent", "It's not \u2014 P(A and B) can be larger"], correctIndex: 0, feedback: "When you multiply by a probability (0 to 1), you get a smaller number. Adding a condition can only keep the probability the same or reduce it." },
];

function PracticeStage({ onContinue }: { onContinue: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const done = currentIdx >= PROBLEMS.length;
  const problem = PROBLEMS[currentIdx];

  const handleSelect = useCallback((optIdx: number) => {
    if (answered || !problem) return;
    setSelected(optIdx);
    setAnswered(true);
    if (optIdx === problem.correctIndex) setScore((s) => s + 1);
  }, [answered, problem]);

  const handleNext = useCallback(() => {
    setSelected(null);
    setAnswered(false);
    setCurrentIdx((i) => i + 1);
  }, []);

  if (done || !problem) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[clamp(20px,5vw,28px)] font-bold" style={{ color: TEXT }}>Practice Complete!</h2>
          <p className="text-lg" style={{ color: MUTED }}>{score} out of {PROBLEMS.length} correct.</p>
          <ContinueButton onClick={onContinue} />
        </div>
      </StageWrapper>
    );
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <p className="text-sm font-semibold" style={{ color: MUTED }}>Problem {currentIdx + 1} of {PROBLEMS.length} ({problem.layer})</p>
        <div className="w-full rounded-xl p-6" style={{ background: SURFACE }}>
          <p className="text-center text-[clamp(16px,4vw,20px)] font-semibold leading-relaxed" style={{ color: TEXT }}>{problem.question}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {problem.options.map((opt, i) => {
            const isCorrect = i === problem.correctIndex;
            const isSelected = i === selected;
            let bg: string = SURFACE;
            let border: string = BORDER;
            if (answered) {
              if (isCorrect) { bg = `${SUCCESS}20`; border = SUCCESS; }
              else if (isSelected) { bg = `${ERROR}20`; border = ERROR; }
            }
            return (
              <motion.button key={i} whileTap={answered ? {} : { scale: 0.97 }} onClick={() => handleSelect(i)} className="w-full rounded-xl border-2 px-4 py-3 text-left font-medium" style={{ background: bg, borderColor: border, color: TEXT, minHeight: 48 }} aria-label={`Option: ${opt}`}>
                {opt}
                {answered && isCorrect && <span style={{ color: SUCCESS }}>{" \u2713"}</span>}
                {answered && isSelected && !isCorrect && <span style={{ color: ERROR }}>{" \u2717"}</span>}
              </motion.button>
            );
          })}
        </div>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-xl p-4" style={{ background: selected === problem.correctIndex ? `${SUCCESS}15` : `${ERROR}15` }}>
            <p className="text-sm leading-relaxed" style={{ color: TEXT }}>{problem.feedback}</p>
          </motion.div>
        )}
        {answered && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="rounded-xl px-8 py-3 font-semibold text-white" style={{ background: PRIMARY, minHeight: 48, minWidth: 160 }}>
            {"Next \u2192"}
          </motion.button>
        )}
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  STAGE 7: Reflection                                                */
/* ================================================================== */

function ReflectionStage({ onContinue }: { onContinue: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <StageWrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={SPRING}>
            <p className="text-4xl">{"\u{1F9E0}"}</p>
            <h2 className="mt-2 text-xl font-bold" style={{ color: TEXT }}>Great reflection!</h2>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Self-explanation strengthens your understanding. +50 XP</p>
          </motion.div>
          <ContinueButton onClick={onContinue} label="Complete Lesson" delay={0.5} />
        </div>
      </StageWrapper>
    );
  }

  return (
    <StageWrapper>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <h2 className="text-center text-[clamp(18px,4.5vw,26px)] font-bold" style={{ color: TEXT }}>Reflect</h2>
        <p className="text-center text-sm" style={{ color: MUTED }}>
          Explain the difference between independent and dependent events. Give a real-life example of each.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          className="w-full rounded-xl border-2 p-4 text-base"
          style={{ background: SURFACE, borderColor: BORDER, color: TEXT, minHeight: 120, resize: "vertical" }}
          aria-label="Reflection text"
        />
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue} className="rounded-xl px-6 py-3 text-sm" style={{ background: SURFACE, color: MUTED, minHeight: 44 }}>Skip</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setSubmitted(true)} disabled={text.length < 20} className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-40" style={{ background: PRIMARY, minHeight: 48, minWidth: 120 }}>Submit</motion.button>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{text.length < 20 ? `${20 - text.length} more characters needed` : "Ready to submit!"}</p>
      </div>
    </StageWrapper>
  );
}

/* ================================================================== */
/*  Main                                                               */
/* ================================================================== */

export function CompoundProbabilityLesson({ onComplete }: { onComplete?: () => void }) {
  return (
    <LessonShell title="SP-5.4a Compound Probability" stages={[...NLS_STAGES]} onComplete={onComplete}>
      {({ stage, advance }) => {
        switch (stage) {
          case "hook": return <HookStage onContinue={advance} />;
          case "spatial": return <SpatialStage onContinue={advance} />;
          case "discovery": return <DiscoveryStage onContinue={advance} />;
          case "symbol": return <SymbolBridgeStage onContinue={advance} />;
          case "realWorld": return <RealWorldStage onContinue={advance} />;
          case "practice": return <PracticeStage onContinue={advance} />;
          case "reflection": return <ReflectionStage onContinue={advance} />;
          default: return null;
        }
      }}
    </LessonShell>
  );
}
