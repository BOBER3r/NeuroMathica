"use client";

import { useState, useRef, useEffect } from "react";

interface VideoHookProps {
  src: string;
  onComplete: () => void;
}

/**
 * Plays a Manim-generated WebM video as the lesson hook.
 * Shows Continue + Replay buttons when video ends.
 */
export function VideoHook({ src, onComplete }: VideoHookProps) {
  const [showButtons, setShowButtons] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const replay = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play();
      setShowButtons(false);
      setTimeout(() => setShowButtons(true), 4000);
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-nm-bg-primary px-4">
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

      <div
        className="flex items-center gap-3 pb-6 transition-opacity duration-300"
        style={{ opacity: showButtons ? 1 : 0, pointerEvents: showButtons ? "auto" : "none" }}
      >
        <button
          onClick={replay}
          className="rounded-xl border border-nm-bg-surface px-5 py-3 text-sm text-nm-text-secondary transition-all hover:border-nm-accent-indigo hover:text-nm-text-primary active:scale-95"
        >
          {"↺"} Replay
        </button>
        <button
          onClick={onComplete}
          className="rounded-2xl bg-nm-accent-indigo px-8 py-3.5 text-lg font-semibold text-white transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
