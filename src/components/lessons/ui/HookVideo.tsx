"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Types ──────────────────────────────────────────────────────────────────

interface HookVideoProps {
  /** Video source URL (WebM / MP4) */
  src: string;
  /** Called when the user taps Continue */
  onComplete: () => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────

/** Failsafe: show buttons even if video never fires onEnded */
const FAILSAFE_MS = 4000;

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Plays a Manim-generated video as the lesson hook.
 * Displays Replay and Continue buttons when the video ends (or after a
 * failsafe timeout).
 */
export function HookVideo({ src, onComplete }: HookVideoProps) {
  const [showButtons, setShowButtons] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Failsafe timer — ensures buttons appear even if video stalls
  useEffect(() => {
    timerRef.current = setTimeout(() => setShowButtons(true), FAILSAFE_MS);
    return () => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    };
  }, []);

  const replay = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play();
      setShowButtons(false);
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowButtons(true), FAILSAFE_MS);
    }
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4">
      {/* Video */}
      <div className="flex flex-1 w-full items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          playsInline
          onEnded={() => setShowButtons(true)}
          onError={() => setShowButtons(true)}
          className="w-full max-w-xl rounded-2xl"
          style={{ maxHeight: "60vh", objectFit: "contain" }}
        />
      </div>

      {/* Controls */}
      <motion.div
        className="flex items-center gap-3 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButtons ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showButtons ? "auto" : "none" }}
      >
        <button
          type="button"
          onClick={replay}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-xl border border-nm-bg-surface",
            "px-5 py-3 text-sm text-nm-text-secondary",
            "transition-all hover:border-nm-accent-indigo hover:text-nm-text-primary",
            "active:scale-95",
          )}
        >
          {"↺"} Replay
        </button>
        <button
          type="button"
          onClick={onComplete}
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-2xl bg-nm-accent-indigo",
            "px-8 py-3.5 text-lg font-semibold text-white",
            "transition-all active:scale-95",
          )}
        >
          Continue
        </button>
      </motion.div>
    </section>
  );
}
