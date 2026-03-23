// ---------------------------------------------------------------------------
// Level Engine — T072
// Neuron Scale leveling system (1-100) with 10 tiers.
// Exponential curve: base 100 XP, growing ~15% per level.
// ---------------------------------------------------------------------------

export interface Tier {
  readonly name: string;
  readonly levels: readonly [number, number];
}

const TIERS: readonly Tier[] = [
  { name: "Spark", levels: [1, 10] },
  { name: "Signal", levels: [11, 20] },
  { name: "Synapse", levels: [21, 30] },
  { name: "Circuit", levels: [31, 40] },
  { name: "Network", levels: [41, 50] },
  { name: "Cortex", levels: [51, 60] },
  { name: "Hemisphere", levels: [61, 70] },
  { name: "Resonance", levels: [71, 80] },
  { name: "Architect", levels: [81, 90] },
  { name: "Transcendent", levels: [91, 100] },
] as const;

const MAX_LEVEL = 100;
const BASE_XP = 100;
const GROWTH_RATE = 0.15;

/**
 * Returns the XP required to go from (level - 1) to `level`.
 * Uses an exponential curve: floor(100 * 1.15^(level - 1))
 *
 * Level must be between 1 and 100 inclusive.
 */
export function getXpForLevel(level: number): number {
  if (level < 1 || level > MAX_LEVEL) {
    throw new RangeError(
      `Level must be between 1 and ${MAX_LEVEL}, got ${level}`,
    );
  }
  return Math.floor(BASE_XP * Math.pow(1 + GROWTH_RATE, level - 1));
}

/**
 * Computes the cumulative XP needed to reach a given level (i.e., the total
 * XP required to go from 0 to `level`).
 */
function cumulativeXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += getXpForLevel(i);
  }
  return total;
}

/**
 * Given a total accumulated XP value, returns the current level (1-100).
 * A player with 0 XP is level 1.
 */
export function getLevelForXp(totalXp: number): number {
  if (totalXp < 0) {
    throw new RangeError("Total XP cannot be negative");
  }

  let accumulated = 0;
  for (let level = 1; level <= MAX_LEVEL; level++) {
    accumulated += getXpForLevel(level);
    if (totalXp < accumulated) {
      return level;
    }
  }

  return MAX_LEVEL;
}

/**
 * Returns the tier name and 0-based tier index for a given level.
 */
export function getTierForLevel(
  level: number,
): { name: string; tierIndex: number } {
  if (level < 1 || level > MAX_LEVEL) {
    throw new RangeError(
      `Level must be between 1 and ${MAX_LEVEL}, got ${level}`,
    );
  }

  for (let i = 0; i < TIERS.length; i++) {
    const tier = TIERS[i];
    if (tier && level >= tier.levels[0] && level <= tier.levels[1]) {
      return { name: tier.name, tierIndex: i };
    }
  }

  // Should be unreachable given the range check, but satisfies strict mode
  return { name: "Transcendent", tierIndex: TIERS.length - 1 };
}

export interface LevelProgress {
  currentLevel: number;
  currentTier: string;
  xpInCurrentLevel: number;
  xpNeededForNext: number;
  progressPercent: number;
}

/**
 * Computes detailed progress information for a given total XP.
 *
 * - `xpInCurrentLevel`: how much XP the player has earned toward the next level
 * - `xpNeededForNext`: total XP cost of the current level
 * - `progressPercent`: 0-100 progress within the current level
 *
 * At max level (100), progressPercent is 100 and xpNeededForNext is 0.
 */
export function getProgressToNextLevel(totalXp: number): LevelProgress {
  const currentLevel = getLevelForXp(totalXp);
  const { name: currentTier } = getTierForLevel(currentLevel);

  if (currentLevel >= MAX_LEVEL) {
    return {
      currentLevel: MAX_LEVEL,
      currentTier,
      xpInCurrentLevel: 0,
      xpNeededForNext: 0,
      progressPercent: 100,
    };
  }

  // XP already consumed by levels before the current one
  const xpConsumedByPriorLevels = cumulativeXpForLevel(currentLevel - 1);
  const xpInCurrentLevel = totalXp - xpConsumedByPriorLevels;
  const xpNeededForNext = getXpForLevel(currentLevel);
  const progressPercent = Math.min(
    100,
    Math.floor((xpInCurrentLevel / xpNeededForNext) * 100),
  );

  return {
    currentLevel,
    currentTier,
    xpInCurrentLevel,
    xpNeededForNext,
    progressPercent,
  };
}
