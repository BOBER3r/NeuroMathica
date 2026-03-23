"use client";

import { cn } from "@/lib/utils/cn";

interface TutorButtonProps {
  onClick: () => void;
}

/**
 * Floating "Ask Tutor" button.
 *
 * Fixed to the bottom-right of the viewport, positioned above
 * the BottomTabs navigation. Circular with a chat/question-mark icon
 * and a gentle pulse animation to indicate availability.
 */
function TutorButton({ onClick }: TutorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Ask Tutor"
      className={cn(
        "fixed bottom-20 right-4 z-40",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "bg-nm-accent-cyan text-nm-bg-primary",
        "shadow-lg shadow-nm-accent-cyan/30",
        "transition-transform duration-150 ease-out",
        "hover:scale-105 active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-accent-cyan",
        "animate-[tutor-pulse_3s_ease-in-out_infinite]",
      )}
    >
      {/* Chat bubble with question mark icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    </button>
  );
}

export { TutorButton };
export type { TutorButtonProps };
