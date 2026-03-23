"use client";

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProblemCard } from "@/components/lesson/ProblemCard";
import { usePracticeStore } from "@/lib/stores/practice-store";
import { motion, AnimatePresence } from "framer-motion";

type SessionPhase = "idle" | "loading" | "active" | "summary";

export default function PracticePage() {
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const store = usePracticeStore();

  const generateSession = trpc.practice.generateSession.useMutation({
    onSuccess: (data) => {
      store.startSession({
        sessionId: data.sessionId,
        sessionType: "review",
        totalProblems: data.items.length,
      });
      setPhase("active");
    },
  });

  const getNextProblem = trpc.practice.getNextProblem.useQuery(
    {
      sessionId: store.sessionId ?? "",
      conceptId: generateSession.data?.items[store.currentProblemIndex]?.conceptId ?? "",
      layer: generateSession.data?.items[store.currentProblemIndex]?.layer ?? 0,
    },
    {
      enabled: phase === "active" && !!store.sessionId && !!generateSession.data?.items[store.currentProblemIndex],
    },
  );

  const submitAnswer = trpc.practice.submitAnswer.useMutation();

  const handleStartSession = useCallback(() => {
    setPhase("loading");
    generateSession.mutate({ sessionType: "review", maxItems: 10 });
  }, [generateSession]);

  const handleSubmitAnswer = useCallback(
    (answer: string, correct: boolean) => {
      store.submitAnswer(correct);
      if (store.sessionId && getNextProblem.data) {
        submitAnswer.mutate({
          sessionId: store.sessionId,
          problemId: getNextProblem.data.id,
          answer,
          responseTimeMs: 15000,
          hintsUsed: 0,
        });
      }
    },
    [store, submitAnswer, getNextProblem.data],
  );

  const handleNextProblem = useCallback(() => {
    if (store.currentProblemIndex + 1 >= store.totalProblems) {
      store.endSession();
      setPhase("summary");
    } else {
      store.nextProblem();
    }
  }, [store]);

  const handleNewSession = useCallback(() => {
    store.reset();
    setPhase("idle");
  }, [store]);

  // Idle — start screen
  if (phase === "idle") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-nm-accent-indigo/10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--nm-accent-indigo)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-2 3.46V12h2a4 4 0 0 1 0 8h-1" />
            <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 2 3.46V12h-2a4 4 0 0 0 0 8h1" />
            <path d="M12 12v10" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-nm-text-primary">Daily Practice</h1>
        <p className="mb-8 text-center text-sm text-nm-text-secondary">
          Review your knowledge with adaptive spaced repetition
        </p>
        <Button variant="primary" size="lg" onClick={handleStartSession}>
          Start Practice Session
        </Button>
      </div>
    );
  }

  // Loading
  if (phase === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
          <p className="text-sm text-nm-text-muted">Generating your session...</p>
        </div>
      </div>
    );
  }

  // Summary
  if (phase === "summary") {
    const accuracy = store.problemsAttempted > 0
      ? Math.round((store.problemsCorrect / store.problemsAttempted) * 100)
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[70vh] flex-col items-center justify-center p-4"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-nm-accent-emerald/10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--nm-accent-emerald)" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-nm-text-primary">Session Complete!</h2>
        <p className="mb-6 text-nm-text-secondary">
          {store.problemsCorrect} of {store.problemsAttempted} correct
        </p>

        <div className="mb-8 grid w-full max-w-xs grid-cols-2 gap-3">
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-nm-accent-indigo">{accuracy}%</p>
            <p className="text-xs text-nm-text-muted">Accuracy</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-nm-accent-emerald">+{store.xpEarned}</p>
            <p className="text-xs text-nm-text-muted">XP Earned</p>
          </Card>
        </div>

        <div className="mb-3 w-full max-w-xs rounded-xl bg-nm-bg-secondary p-3">
          <p className="mb-1 text-xs text-nm-text-muted">Emotional State</p>
          <p className="text-sm font-medium capitalize text-nm-text-primary">
            {store.emotionalState.replace("_", " ")}
          </p>
        </div>

        <Button variant="primary" size="lg" onClick={handleNewSession}>
          Done
        </Button>
      </motion.div>
    );
  }

  // Active session
  const currentItem = generateSession.data?.items[store.currentProblemIndex];
  const problem = getNextProblem.data;

  return (
    <div className="flex min-h-dvh flex-col p-4 pb-20">
      {/* Header */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-nm-text-muted">
            Problem {store.currentProblemIndex + 1} of {store.totalProblems}
          </span>
          <span className="text-sm text-nm-accent-emerald">
            {store.problemsCorrect} correct
          </span>
        </div>
        <ProgressBar
          value={(store.currentProblemIndex / store.totalProblems) * 100}
          variant="default"
          size="sm"
        />
      </div>

      {/* Concept label */}
      {currentItem && (
        <p className="mb-4 text-xs font-medium text-nm-accent-indigo">
          {currentItem.conceptName} — {currentItem.reason.replace("_", " ")}
        </p>
      )}

      {/* Problem */}
      <AnimatePresence mode="wait">
        {problem ? (
          <motion.div
            key={problem.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex-1"
          >
            <ProblemCard
              problem={{
                id: problem.id,
                content: problem.content as { question: string; options?: string[]; solution: string },
                explanationPrompt: problem.explanationPrompt ?? "Why does this work?",
                layer: problem.layer,
              }}
              onSubmit={(answer, correct) => {
                handleSubmitAnswer(answer, correct);
                setTimeout(handleNextProblem, 1500);
              }}
            />
          </motion.div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
