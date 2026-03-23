"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface RealWorldAnchorProps {
  context: string;
  illustration?: string;
  onComplete: () => void;
}

export function RealWorldAnchor({ context, onComplete }: RealWorldAnchorProps) {
  return (
    <section className="relative flex flex-1 flex-col bg-nm-bg-primary px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-nm-accent-emerald/10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--nm-accent-emerald)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <h2 className="mb-4 text-xl font-bold text-nm-text-primary">Real World Connection</h2>
        <p className="text-nm-text-secondary leading-relaxed">
          {context || "This concept appears all around you in everyday life."}
        </p>
      </motion.div>

      <div className="w-full max-w-sm mx-auto pb-8">
        <Button size="lg" onClick={onComplete} className="w-full">Continue</Button>
      </div>
    </section>
  );
}
