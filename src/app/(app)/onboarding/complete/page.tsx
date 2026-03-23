"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function OnboardingCompletePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-nm-accent-indigo to-nm-accent-cyan"
      >
        <span className="text-5xl font-bold text-white">1</span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-center text-3xl font-bold text-nm-text-primary"
      >
        Spark I
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-4 text-center text-nm-accent-indigo"
      >
        Your journey begins
      </motion.p>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-10 max-w-xs text-center text-sm text-nm-text-secondary"
      >
        Your Knowledge Nebula is waiting. Each star is a math concept — light them up by learning and understanding.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/learn")}
        >
          Start Learning
        </Button>
      </motion.div>
    </div>
  );
}
