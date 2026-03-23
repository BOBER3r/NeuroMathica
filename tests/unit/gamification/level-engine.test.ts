import { describe, it, expect } from "vitest";
import {
  getXpForLevel,
  getLevelForXp,
  getTierForLevel,
  getProgressToNextLevel,
} from "@/server/services/gamification/level-engine";

// ---------------------------------------------------------------------------
// getXpForLevel
// ---------------------------------------------------------------------------
describe("getXpForLevel", () => {
  it("returns 100 for level 1", () => {
    expect(getXpForLevel(1)).toBe(100);
  });

  it("returns floor(100 * 1.15^1) = 115 for level 2", () => {
    expect(getXpForLevel(2)).toBe(Math.floor(100 * 1.15));
  });

  it("returns floor(100 * 1.15^4) = 174 for level 5", () => {
    expect(getXpForLevel(5)).toBe(Math.floor(100 * Math.pow(1.15, 4)));
  });

  it("grows exponentially — level 10 > level 5", () => {
    expect(getXpForLevel(10)).toBeGreaterThan(getXpForLevel(5));
  });

  it("level 50 requires significantly more XP than level 10", () => {
    expect(getXpForLevel(50)).toBeGreaterThan(getXpForLevel(10) * 5);
  });

  it("throws RangeError for level 0", () => {
    expect(() => getXpForLevel(0)).toThrow(RangeError);
  });

  it("throws RangeError for level 101", () => {
    expect(() => getXpForLevel(101)).toThrow(RangeError);
  });

  it("throws RangeError for negative level", () => {
    expect(() => getXpForLevel(-1)).toThrow(RangeError);
  });

  it("accepts level 100 without error", () => {
    expect(() => getXpForLevel(100)).not.toThrow();
    expect(getXpForLevel(100)).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// getLevelForXp
// ---------------------------------------------------------------------------
describe("getLevelForXp", () => {
  it("returns level 1 for 0 XP", () => {
    expect(getLevelForXp(0)).toBe(1);
  });

  it("returns level 1 for 99 XP (not enough to complete level 1)", () => {
    expect(getLevelForXp(99)).toBe(1);
  });

  it("returns level 2 for exactly 100 XP (completed level 1)", () => {
    // Level 1 costs 100 XP. At 100 XP, you've completed level 1 threshold
    // but not level 2, so you should be IN level 2.
    // Actually: cumulative for level 1 = 100, at 100 XP you're still level 1
    // because you need >= 100 to be past level 1. Let's check:
    // getLevelForXp: accumulates, if totalXp < accumulated, return level.
    // level 1: accumulated = 100. 100 < 100 is false.
    // level 2: accumulated = 100 + 115 = 215. 100 < 215 is true -> return 2.
    expect(getLevelForXp(100)).toBe(2);
  });

  it("returns level 1 for 50 XP", () => {
    expect(getLevelForXp(50)).toBe(1);
  });

  it("returns 100 for extremely large XP", () => {
    expect(getLevelForXp(999_999_999)).toBe(100);
  });

  it("throws for negative XP", () => {
    expect(() => getLevelForXp(-1)).toThrow(RangeError);
  });

  it("is consistent: getXpForLevel round-trips", () => {
    // Accumulate XP for levels 1-10 and verify getLevelForXp returns level 11
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += getXpForLevel(i);
    }
    expect(getLevelForXp(total)).toBe(11);
    expect(getLevelForXp(total - 1)).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// getTierForLevel
// ---------------------------------------------------------------------------
describe("getTierForLevel", () => {
  it("returns Spark for level 1", () => {
    const tier = getTierForLevel(1);
    expect(tier.name).toBe("Spark");
    expect(tier.tierIndex).toBe(0);
  });

  it("returns Spark for level 10", () => {
    expect(getTierForLevel(10).name).toBe("Spark");
  });

  it("returns Signal for level 11", () => {
    const tier = getTierForLevel(11);
    expect(tier.name).toBe("Signal");
    expect(tier.tierIndex).toBe(1);
  });

  it("returns Synapse for level 21", () => {
    expect(getTierForLevel(21).name).toBe("Synapse");
  });

  it("returns Circuit for level 35", () => {
    expect(getTierForLevel(35).name).toBe("Circuit");
    expect(getTierForLevel(35).tierIndex).toBe(3);
  });

  it("returns Network for level 50", () => {
    expect(getTierForLevel(50).name).toBe("Network");
  });

  it("returns Transcendent for level 100", () => {
    const tier = getTierForLevel(100);
    expect(tier.name).toBe("Transcendent");
    expect(tier.tierIndex).toBe(9);
  });

  it("throws for level 0", () => {
    expect(() => getTierForLevel(0)).toThrow(RangeError);
  });

  it("throws for level 101", () => {
    expect(() => getTierForLevel(101)).toThrow(RangeError);
  });

  it("all 10 tiers are accessible", () => {
    const tierNames = new Set<string>();
    for (let level = 1; level <= 100; level += 10) {
      tierNames.add(getTierForLevel(level).name);
    }
    expect(tierNames.size).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// getProgressToNextLevel
// ---------------------------------------------------------------------------
describe("getProgressToNextLevel", () => {
  it("returns level 1 with 0 progress for 0 XP", () => {
    const progress = getProgressToNextLevel(0);
    expect(progress.currentLevel).toBe(1);
    expect(progress.currentTier).toBe("Spark");
    expect(progress.xpInCurrentLevel).toBe(0);
    expect(progress.xpNeededForNext).toBe(100);
    expect(progress.progressPercent).toBe(0);
  });

  it("returns 50% progress halfway through level 1", () => {
    const progress = getProgressToNextLevel(50);
    expect(progress.currentLevel).toBe(1);
    expect(progress.xpInCurrentLevel).toBe(50);
    expect(progress.progressPercent).toBe(50);
  });

  it("returns level 2 at exactly 100 XP", () => {
    const progress = getProgressToNextLevel(100);
    expect(progress.currentLevel).toBe(2);
    expect(progress.xpInCurrentLevel).toBe(0);
    expect(progress.xpNeededForNext).toBe(getXpForLevel(2));
  });

  it("returns 100% progress at max level", () => {
    const progress = getProgressToNextLevel(999_999_999);
    expect(progress.currentLevel).toBe(100);
    expect(progress.currentTier).toBe("Transcendent");
    expect(progress.progressPercent).toBe(100);
    expect(progress.xpNeededForNext).toBe(0);
  });

  it("calculates correct tier name", () => {
    // Accumulate enough XP to reach level 11 (Signal tier)
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += getXpForLevel(i);
    }
    const progress = getProgressToNextLevel(total);
    expect(progress.currentLevel).toBe(11);
    expect(progress.currentTier).toBe("Signal");
  });

  it("progress percent is always between 0 and 100", () => {
    for (const xp of [0, 1, 50, 99, 100, 500, 10000, 999_999_999]) {
      const progress = getProgressToNextLevel(xp);
      expect(progress.progressPercent).toBeGreaterThanOrEqual(0);
      expect(progress.progressPercent).toBeLessThanOrEqual(100);
    }
  });

  it("xpInCurrentLevel + remaining equals xpNeededForNext", () => {
    const progress = getProgressToNextLevel(75);
    expect(progress.xpInCurrentLevel).toBe(75);
    expect(progress.xpNeededForNext).toBe(100);
  });
});
