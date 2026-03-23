"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { AchievementCard } from "@/components/gamification/AchievementCard";
import { useUserStore } from "@/lib/stores/user-store";

type ThemeOption = "default" | "warm" | "cool";

const THEME_OPTIONS: Array<{ id: ThemeOption; label: string }> = [
  { id: "default", label: "Nebula Dark" },
  { id: "warm", label: "Solar Warm" },
  { id: "cool", label: "Arctic Cool" },
];

/**
 * Profile page (T088).
 * Shows LevelBadge + tier name header, an achievement grid, and user
 * settings (streak schedule, sound toggle, theme selector).
 */
export default function ProfilePage() {
  const levelQuery = trpc.gamification.getLevelInfo.useQuery();
  const achievementsQuery = trpc.gamification.getAchievements.useQuery();
  const streakQuery = trpc.gamification.getStreak.useQuery();

  const { soundEnabled, themeId, updatePreferences } = useUserStore();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(
    (themeId as ThemeOption) || "default",
  );

  const handleThemeChange = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    updatePreferences({ themeId: theme });
  };

  const handleSoundToggle = () => {
    updatePreferences({ soundEnabled: !soundEnabled });
  };

  const isLoading =
    levelQuery.isLoading ||
    achievementsQuery.isLoading ||
    streakQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
      </div>
    );
  }

  const achievements = achievementsQuery.data ?? [];
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="flex flex-col gap-6 p-4 pb-8">
      {/* Header — Level badge + tier */}
      {levelQuery.data && (
        <div className="flex flex-col items-center gap-2">
          <LevelBadge
            level={levelQuery.data.level}
            tierName={levelQuery.data.tierName}
            progressPercent={levelQuery.data.progressPercent}
          />
          <p className="text-sm text-nm-text-secondary">
            {levelQuery.data.totalXp.toLocaleString()} total XP
            {" \u00B7 "}
            {levelQuery.data.neurons} neurons
          </p>
        </div>
      )}

      {/* Achievements */}
      <section aria-label="Achievements">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-nm-text-primary">
            Achievements
          </h2>
          <span className="text-sm text-nm-text-muted tabular-nums">
            {unlockedCount}/{achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              name={achievement.name}
              description={achievement.description}
              category={achievement.category}
              rarity={achievement.rarity}
              unlocked={achievement.unlocked}
              unlockedAt={
                achievement.unlockedAt
                  ? new Date(achievement.unlockedAt)
                  : undefined
              }
            />
          ))}
        </div>
        {achievements.length === 0 && (
          <Card padding="md">
            <p className="text-center text-sm text-nm-text-muted">
              No achievements yet. Start learning to unlock them!
            </p>
          </Card>
        )}
      </section>

      {/* Settings */}
      <section aria-label="Settings">
        <h2 className="mb-3 text-lg font-semibold text-nm-text-primary">
          Settings
        </h2>

        {/* Streak schedule info */}
        <Card padding="md" className="mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-nm-text-primary">
                Streak Schedule
              </p>
              <p className="text-xs text-nm-text-secondary">
                Mode:{" "}
                <span className="font-medium text-nm-accent-amber">
                  {streakQuery.data?.streakMode ?? "daily"}
                </span>
              </p>
            </div>
            {streakQuery.data && (
              <div className="text-right">
                <p className="text-sm tabular-nums text-nm-text-primary">
                  {streakQuery.data.currentStreak} day streak
                </p>
                <p className="text-xs text-nm-text-muted">
                  Best: {streakQuery.data.longestStreak}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Sound toggle */}
        <Card padding="md" className="mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-nm-text-primary">Sound Effects</p>
              <p className="text-xs text-nm-text-secondary">
                Celebration sounds and feedback
              </p>
            </div>
            <Button
              variant={soundEnabled ? "primary" : "secondary"}
              size="sm"
              onClick={handleSoundToggle}
            >
              {soundEnabled ? "On" : "Off"}
            </Button>
          </div>
        </Card>

        {/* Theme selector */}
        <Card padding="md">
          <p className="mb-2 text-sm font-medium text-nm-text-primary">Theme</p>
          <div className="flex gap-2">
            {THEME_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={selectedTheme === option.id ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleThemeChange(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
