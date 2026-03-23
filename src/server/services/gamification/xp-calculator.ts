// ---------------------------------------------------------------------------
// XP Calculator — T071
// Calculates experience points from 11 sources with 4 multipliers.
// Design: Understanding Over Memorization (CP-I). NO speed bonuses.
// ---------------------------------------------------------------------------

export type XpSource =
  | "lesson_completion" // 100 XP
  | "reflection_quality" // 0-80 XP (based on AI quality score 0-5)
  | "exploration_depth" // 20-40 XP (based on interaction count in spatial stage)
  | "discovery_insight" // 30 XP (triggered by guided discovery completion)
  | "practice_session" // 50 XP per session
  | "spaced_review" // 30 XP per review
  | "peer_help" // 40-80 XP
  | "real_world_connection" // 60 XP (triggered by real-world anchor engagement)
  | "first_try" // 25 XP bonus (correct on first attempt, no hints)
  | "streak_day" // 20 XP per streak day maintained
  | "challenge_complete"; // 75 XP (challenge problems)

export type XpMultiplier =
  | "deep_dive" // 1.5x — spent >2x average time exploring
  | "connection_maker" // 2.0x — referenced prior concept in reflection
  | "struggle_bonus" // 1.3x — got it right after 2+ failures
  | "first_try_clarity"; // 1.2x — perfect answer + quality explanation

const MULTIPLIER_VALUES: Record<XpMultiplier, number> = {
  deep_dive: 1.5,
  connection_maker: 2.0,
  struggle_bonus: 1.3,
  first_try_clarity: 1.2,
};

/**
 * XP base values. Fixed numbers are exact; tuples are [min, max] ranges.
 */
const XP_BASE: Record<XpSource, number | [number, number]> = {
  lesson_completion: 100,
  reflection_quality: [0, 80],
  exploration_depth: [20, 40],
  discovery_insight: 30,
  practice_session: 50,
  spaced_review: 30,
  peer_help: [40, 80],
  real_world_connection: 60,
  first_try: 25,
  streak_day: 20,
  challenge_complete: 75,
};

export interface XpCalculation {
  baseAmount: number;
  multipliers: Array<{ type: XpMultiplier; value: number }>;
  finalAmount: number;
  neuronsEarned: number; // 1 neuron per 100 XP
}

export interface XpContext {
  /** 0-5 for reflection quality scoring */
  qualityScore?: number;
  /** Number of interactions in spatial exploration stage */
  interactionCount?: number;
  /** Whether the student referenced a prior concept in their reflection */
  referencesPrior?: boolean;
  /** Whether the student got it right on the first attempt with no hints */
  isFirstTry?: boolean;
  /** Time the student spent on the activity in milliseconds */
  timeSpentMs?: number;
  /** Average time students spend on this activity in milliseconds */
  averageTimeMs?: number;
  /** Number of failures before the student got the correct answer */
  failuresBefore?: number;
}

/**
 * Resolves the base XP for a given source, scaling range-based sources
 * using the provided context.
 */
function resolveBaseAmount(source: XpSource, context: XpContext): number {
  const base = XP_BASE[source];

  if (typeof base === "number") {
    return base;
  }

  const [min, max] = base;

  switch (source) {
    case "reflection_quality": {
      // Quality score 0-5 maps linearly to 0-80 XP
      const score = Math.max(0, Math.min(5, context.qualityScore ?? 0));
      return Math.round(min + (score / 5) * (max - min));
    }

    case "exploration_depth": {
      // Interaction count: 0 interactions = min, 10+ = max
      const count = Math.max(0, context.interactionCount ?? 0);
      const ratio = Math.min(1, count / 10);
      return Math.round(min + ratio * (max - min));
    }

    case "peer_help": {
      // Quality score 0-5 maps to 40-80 XP range
      const score = Math.max(0, Math.min(5, context.qualityScore ?? 0));
      return Math.round(min + (score / 5) * (max - min));
    }

    default:
      return min;
  }
}

/**
 * Determines which multipliers apply based on the context, and returns them
 * in a stable order.
 */
function resolveMultipliers(
  context: XpContext,
): Array<{ type: XpMultiplier; value: number }> {
  const multipliers: Array<{ type: XpMultiplier; value: number }> = [];

  // Deep Dive: spent >2x average time exploring
  if (
    context.timeSpentMs !== undefined &&
    context.averageTimeMs !== undefined &&
    context.averageTimeMs > 0 &&
    context.timeSpentMs > 2 * context.averageTimeMs
  ) {
    multipliers.push({
      type: "deep_dive",
      value: MULTIPLIER_VALUES.deep_dive,
    });
  }

  // Connection Maker: referenced prior concept in reflection
  if (context.referencesPrior === true) {
    multipliers.push({
      type: "connection_maker",
      value: MULTIPLIER_VALUES.connection_maker,
    });
  }

  // Struggle Bonus: got it right after 2+ failures
  if (
    context.failuresBefore !== undefined &&
    context.failuresBefore >= 2
  ) {
    multipliers.push({
      type: "struggle_bonus",
      value: MULTIPLIER_VALUES.struggle_bonus,
    });
  }

  // First Try Clarity: perfect answer + quality explanation on first try
  if (
    context.isFirstTry === true &&
    context.qualityScore !== undefined &&
    context.qualityScore >= 4
  ) {
    multipliers.push({
      type: "first_try_clarity",
      value: MULTIPLIER_VALUES.first_try_clarity,
    });
  }

  return multipliers;
}

/**
 * Calculates the XP earned for a given source and context.
 *
 * The final amount is: floor(baseAmount * product(multipliers))
 * Neurons earned: floor(finalAmount / 100)
 */
export function calculateXp(
  source: XpSource,
  context: XpContext = {},
): XpCalculation {
  const baseAmount = resolveBaseAmount(source, context);
  const multipliers = resolveMultipliers(context);

  const combinedMultiplier = multipliers.reduce(
    (acc, m) => acc * m.value,
    1,
  );

  const finalAmount = Math.floor(baseAmount * combinedMultiplier);
  const neuronsEarned = Math.floor(finalAmount / 100);

  return {
    baseAmount,
    multipliers,
    finalAmount,
    neuronsEarned,
  };
}
