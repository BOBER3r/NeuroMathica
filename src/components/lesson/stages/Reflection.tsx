"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ReflectionProps {
  prompt: string;
  onComplete: (text: string) => void;
}

const MIN_LENGTH = 20;

export function Reflection({ prompt, onComplete }: ReflectionProps) {
  const [text, setText] = useState("");
  const canSubmit = text.trim().length >= MIN_LENGTH;

  return (
    <section className="flex flex-1 flex-col bg-nm-bg-primary px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-nm-accent-violet/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--nm-accent-violet)" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          </svg>
        </div>
        <h2 className="mb-2 text-lg font-bold text-nm-text-primary">Reflect &amp; Explain</h2>
        <p className="mb-6 text-sm text-nm-text-secondary">
          {prompt || "Explain what you learned in your own words."}
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your explanation here..."
          rows={5}
          className="w-full rounded-xl border border-nm-bg-surface bg-nm-bg-secondary px-4 py-3 text-nm-text-primary placeholder-nm-text-muted outline-none focus:border-nm-accent-indigo resize-none"
        />
        <p className="mt-2 text-xs text-nm-text-muted">{text.trim().length}/{MIN_LENGTH} characters minimum</p>
      </motion.div>
      <div className="w-full max-w-sm mx-auto pb-8">
        <Button size="lg" onClick={() => onComplete(text)} disabled={!canSubmit} className="w-full">
          Submit Reflection
        </Button>
      </div>
    </section>
  );
}
