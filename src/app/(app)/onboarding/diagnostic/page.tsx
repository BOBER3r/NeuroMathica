"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface DiagnosticProblem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const DIAGNOSTIC_PROBLEMS: DiagnosticProblem[] = [
  { id: "d1", question: "What is 3 × 7?", options: ["18", "21", "24", "28"], correctIndex: 1 },
  { id: "d2", question: "What is 1/2 + 1/4?", options: ["1/3", "2/6", "3/4", "1/6"], correctIndex: 2 },
  { id: "d3", question: "Solve: x + 5 = 12", options: ["x = 5", "x = 7", "x = 17", "x = 6"], correctIndex: 1 },
  { id: "d4", question: "What is the area of a rectangle with width 4 and height 6?", options: ["10", "20", "24", "12"], correctIndex: 2 },
  { id: "d5", question: "What is 25% of 80?", options: ["20", "25", "15", "40"], correctIndex: 0 },
  { id: "d6", question: "What is the value of 2³?", options: ["6", "8", "9", "5"], correctIndex: 1 },
  { id: "d7", question: "Which is greater: 0.45 or 0.405?", options: ["0.45", "0.405", "They're equal"], correctIndex: 0 },
  { id: "d8", question: "What is the GCF of 12 and 18?", options: ["2", "3", "6", "36"], correctIndex: 2 },
  { id: "d9", question: "If y = 2x + 3, what is y when x = 4?", options: ["8", "9", "10", "11"], correctIndex: 3 },
  { id: "d10", question: "What is the mean of 4, 8, 6, 10, 2?", options: ["5", "6", "7", "8"], correctIndex: 1 },
  { id: "d11", question: "Solve: 3x - 6 = 9", options: ["x = 1", "x = 3", "x = 5", "x = 15"], correctIndex: 2 },
  { id: "d12", question: "What is -4 + 7?", options: ["-3", "3", "11", "-11"], correctIndex: 1 },
  { id: "d13", question: "What is the probability of rolling an even number on a die?", options: ["1/3", "1/2", "1/6", "2/3"], correctIndex: 1 },
  { id: "d14", question: "What angle do the hands of a clock make at 3:00?", options: ["60°", "90°", "120°", "180°"], correctIndex: 1 },
  { id: "d15", question: "What is √64?", options: ["6", "7", "8", "9"], correctIndex: 2 },
];

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const problem = DIAGNOSTIC_PROBLEMS[currentIndex];
  const totalProblems = DIAGNOSTIC_PROBLEMS.length;
  const progress = ((currentIndex + (showResult ? 1 : 0)) / totalProblems) * 100;

  if (!problem) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-nm-bg-primary">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
      </div>
    );
  }

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === problem.correctIndex) {
      setCorrect((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalProblems) {
      router.push("/onboarding/complete");
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-nm-bg-primary p-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-nm-text-muted">
            Question {currentIndex + 1} of {totalProblems}
          </span>
          <span className="text-sm text-nm-accent-emerald">
            {correct} correct
          </span>
        </div>
        <ProgressBar value={progress} variant="default" size="sm" />
      </div>

      <motion.div
        key={problem.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex-1"
      >
        <h2 className="mb-8 text-xl font-semibold text-nm-text-primary">
          {problem.question}
        </h2>

        <div className="flex flex-col gap-3">
          {problem.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                showResult && i === problem.correctIndex
                  ? "border-nm-success bg-nm-success/10 text-nm-success"
                  : showResult && i === selected && i !== problem.correctIndex
                    ? "border-nm-error bg-nm-error/10 text-nm-error"
                    : selected === i
                      ? "border-nm-accent-indigo bg-nm-accent-indigo/10 text-nm-accent-indigo"
                      : "border-nm-bg-surface bg-nm-bg-secondary text-nm-text-secondary hover:border-nm-text-muted"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>

      {showResult && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <Button variant="primary" size="lg" className="mt-6 w-full" onClick={handleNext}>
            {currentIndex + 1 >= totalProblems ? "See Results" : "Next Question"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
