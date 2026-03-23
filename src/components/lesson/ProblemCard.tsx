"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import type { ProblemData } from "./types";

interface ProblemCardProps {
  problem: ProblemData;
  onSubmit: (answer: string, correct: boolean) => void;
}

/** Minimum length for the "Why does this work?" explanation (CP-I). */
const MIN_EXPLANATION_LENGTH = 20;

type Phase = "answering" | "feedback" | "explanation";

/**
 * T049 - ProblemCard
 *
 * Renders a single practice problem. Supports multiple-choice (radio)
 * and free-text input modes. After a correct answer, requires the student
 * to explain *why* the answer works (CP-I: Understanding Over Memorization).
 */
export function ProblemCard({ problem, onSubmit }: ProblemCardProps) {
  const [phase, setPhase] = useState<Phase>("answering");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState("");

  const isMultipleChoice =
    problem.content.options !== undefined && problem.content.options.length > 0;

  const handleSubmitAnswer = () => {
    const trimmed = selectedAnswer.trim();
    if (trimmed === "") return;

    const correct = trimmed.toLowerCase() === problem.content.solution.toLowerCase();
    setIsCorrect(correct);
    setPhase("feedback");

    // If incorrect, report immediately so the parent can move on
    if (!correct) {
      onSubmit(trimmed, false);
    }
  };

  const handleExplanationSubmit = () => {
    if (explanation.trim().length < MIN_EXPLANATION_LENGTH) return;
    onSubmit(selectedAnswer, true);
  };

  const handleProceedToExplanation = () => {
    setPhase("explanation");
  };

  return (
    <div className="w-full max-w-lg rounded-2xl bg-nm-bg-secondary p-5 border border-nm-bg-surface/20">
      {/* Question */}
      <p className="mb-5 text-base font-medium leading-relaxed text-nm-text-primary">
        {problem.content.question}
      </p>

      <AnimatePresence mode="wait">
        {/* Phase: Answering */}
        {phase === "answering" && (
          <motion.div
            key="answering"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isMultipleChoice && problem.content.options !== undefined ? (
              <div className="mb-5 flex flex-col gap-2">
                {problem.content.options.map((option) => (
                  <label
                    key={option}
                    className={cn(
                      "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                      selectedAnswer === option
                        ? "border-nm-accent-indigo bg-nm-accent-indigo/10 text-nm-text-primary"
                        : "border-nm-bg-elevated bg-nm-bg-surface text-nm-text-secondary hover:border-nm-accent-indigo/40",
                    )}
                  >
                    <input
                      type="radio"
                      name={`problem-${problem.id}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        selectedAnswer === option
                          ? "border-nm-accent-indigo bg-nm-accent-indigo"
                          : "border-nm-text-muted",
                      )}
                    >
                      {selectedAnswer === option && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="mb-5">
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="min-h-[44px] w-full rounded-xl border border-nm-bg-elevated bg-nm-bg-surface px-4 py-3 text-nm-text-primary placeholder:text-nm-text-muted focus:border-nm-accent-indigo focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedAnswer.trim() !== "") {
                      handleSubmitAnswer();
                    }
                  }}
                />
              </div>
            )}

            <Button
              size="md"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer.trim() === ""}
              className="w-full"
            >
              Submit
            </Button>
          </motion.div>
        )}

        {/* Phase: Feedback */}
        {phase === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={cn(
                "mb-4 rounded-xl px-4 py-3 text-sm font-medium",
                isCorrect
                  ? "bg-nm-accent-emerald/15 text-nm-accent-emerald"
                  : "bg-nm-error/15 text-nm-error",
              )}
            >
              {isCorrect ? "Correct! Nice work." : `Not quite. The answer is: ${problem.content.solution}`}
            </div>

            {isCorrect ? (
              <Button size="md" onClick={handleProceedToExplanation} className="w-full">
                Explain Why
              </Button>
            ) : (
              /* For incorrect answers the onSubmit was already called; parent manages flow */
              <p className="text-center text-xs text-nm-text-muted">
                Moving to the next problem...
              </p>
            )}
          </motion.div>
        )}

        {/* Phase: Explanation (CP-I — Understanding Over Memorization) */}
        {phase === "explanation" && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="mb-3 text-sm text-nm-text-secondary">
              {problem.explanationPrompt}
            </p>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Why does this work? Explain in your own words..."
              rows={3}
              className="mb-2 w-full resize-none rounded-xl border border-nm-bg-elevated bg-nm-bg-surface px-4 py-3 text-sm text-nm-text-primary placeholder:text-nm-text-muted focus:border-nm-accent-indigo focus:outline-none"
            />
            <div className="mb-4 flex items-center justify-between">
              <span
                className={cn(
                  "text-xs tabular-nums",
                  explanation.trim().length >= MIN_EXPLANATION_LENGTH
                    ? "text-nm-accent-emerald"
                    : "text-nm-text-muted",
                )}
              >
                {explanation.trim().length} / {MIN_EXPLANATION_LENGTH} min characters
              </span>
            </div>
            <Button
              size="md"
              onClick={handleExplanationSubmit}
              disabled={explanation.trim().length < MIN_EXPLANATION_LENGTH}
              className="w-full"
            >
              Done
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
