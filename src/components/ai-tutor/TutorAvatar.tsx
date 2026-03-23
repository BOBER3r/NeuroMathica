"use client";

import { cn } from "@/lib/utils/cn";

type AvatarMood = "happy" | "thinking" | "excited" | "neutral";

interface TutorAvatarProps {
  speaking?: boolean;
  mood?: AvatarMood;
}

const moodBorderColors: Record<AvatarMood, string> = {
  happy: "border-nm-accent-emerald",
  thinking: "border-nm-accent-amber",
  excited: "border-nm-accent-rose",
  neutral: "border-nm-accent-indigo",
};

/**
 * T095 - TutorAvatar
 *
 * Simple circular avatar placeholder for the AI tutor.
 * Displays "NM" initials with a gradient background.
 * Pulsing animation when speaking, bounce when excited.
 * Border color changes based on mood.
 */
function TutorAvatar({ speaking = false, mood = "neutral" }: TutorAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
        "bg-gradient-to-br from-nm-accent-indigo to-nm-accent-cyan",
        "select-none",
        moodBorderColors[mood],
        speaking && "animate-[pulse_1.5s_ease-in-out_infinite]",
        mood === "excited" && !speaking && "animate-[bounce_1s_ease-in-out_infinite]",
      )}
      aria-hidden="true"
    >
      <span className="text-sm font-bold text-white leading-none">NM</span>
    </div>
  );
}

export { TutorAvatar };
export type { TutorAvatarProps, AvatarMood };
