"use client";

import { useRouter } from "next/navigation";

interface LessonNavProps {
  totalStages: number;
  currentStage: number;
  onBack?: () => void;
}

export function LessonNav({ totalStages, currentStage, onBack }: LessonNavProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center gap-3 bg-nm-bg-primary/95 px-4 py-3 backdrop-blur-md">
      <button
        onClick={handleBack}
        className="flex min-h-[var(--nm-touch-target)] min-w-[var(--nm-touch-target)] items-center justify-center rounded-full text-nm-text-secondary hover:text-nm-text-primary"
        aria-label="Go back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-1 items-center gap-1.5">
        {Array.from({ length: totalStages }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentStage
                ? "bg-nm-accent-indigo"
                : i === currentStage
                  ? "bg-nm-accent-indigo/50"
                  : "bg-nm-bg-surface"
            }`}
          />
        ))}
      </div>
    </nav>
  );
}
