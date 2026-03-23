"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function OnboardingIdentityPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [gradeLevel, setGradeLevel] = useState<number | null>(null);

  const canContinue = displayName.trim().length >= 2 && gradeLevel !== null;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm"
      >
        <h2 className="mb-2 text-center text-2xl font-bold text-nm-text-primary">
          Who are you?
        </h2>
        <p className="mb-8 text-center text-sm text-nm-text-secondary">
          This helps us personalize your journey
        </p>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-nm-text-secondary">
            Your name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
            className="w-full rounded-xl border border-nm-bg-surface bg-nm-bg-secondary px-4 py-3 text-nm-text-primary placeholder-nm-text-muted outline-none focus:border-nm-accent-indigo"
          />
        </div>

        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-nm-text-secondary">
            Grade level
          </label>
          <div className="flex gap-3">
            {[6, 7, 8].map((grade) => (
              <button
                key={grade}
                onClick={() => setGradeLevel(grade)}
                className={`flex-1 rounded-xl border px-4 py-3 text-center font-medium transition-colors ${
                  gradeLevel === grade
                    ? "border-nm-accent-indigo bg-nm-accent-indigo/10 text-nm-accent-indigo"
                    : "border-nm-bg-surface bg-nm-bg-secondary text-nm-text-secondary hover:border-nm-text-muted"
                }`}
              >
                Grade {grade}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => router.push("/onboarding/diagnostic")}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
