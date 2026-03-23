/**
 * FSRS (Free Spaced Repetition Scheduler) algorithm implementation.
 *
 * Based on the FSRS-4.5 paper. Uses a power-law forgetting curve:
 *   R(t) = (1 + t / (9 * S))^(-1)
 * where t = elapsed days and S = stability (days for R to drop to 0.9).
 *
 * Task: T058
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** FSRS default parameters (w0..w14). */
export const DEFAULT_PARAMS: readonly number[] = [
  0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05,
  0.34, 1.26,
] as const;

/** Target retrievability threshold for scheduling. */
const TARGET_RETRIEVABILITY = 0.9;

/** Milliseconds per day. */
const MS_PER_DAY = 86_400_000;

/** Minimum stability in days. */
const MIN_STABILITY = 0.1;

/** Difficulty bounds. */
const MIN_DIFFICULTY = 1;
const MAX_DIFFICULTY = 10;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** State of a single memory (concept x layer) tracked by FSRS. */
export interface FsrsState {
  /** Days for retrievability to drop to 0.9. */
  stability: number;
  /** 1-10 scale representing inherent difficulty of this memory. */
  difficulty: number;
  /** Timestamp of the last review. */
  lastReview: Date;
  /** Number of successful reviews. */
  reviewCount: number;
  /** Number of times this memory lapsed (grade === 1 after initial learning). */
  lapseCount: number;
}

/** Input from a single review event. */
export interface ReviewInput {
  /** 1 = again, 2 = hard, 3 = good, 4 = easy. */
  grade: 1 | 2 | 3 | 4;
  /** How long the student took to answer, in milliseconds. */
  responseTimeMs: number;
  /** Number of hints the student requested. */
  hintsUsed: number;
  /** Whether the answer was ultimately correct. */
  correct: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Clamp a number between min and max (inclusive). */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Get a safe parameter value from the params array. */
function param(params: readonly number[], index: number): number {
  const value = params[index];
  if (value === undefined) {
    const defaultValue = DEFAULT_PARAMS[index];
    if (defaultValue === undefined) {
      throw new Error(`Invalid FSRS parameter index: ${index}`);
    }
    return defaultValue;
  }
  return value;
}

// ---------------------------------------------------------------------------
// Core FSRS functions
// ---------------------------------------------------------------------------

/**
 * Compute the current retrievability R(t) for a memory.
 *
 * Uses the FSRS power-law forgetting curve:
 *   R(t) = (1 + t / (9 * S))^(-1)
 *
 * @param state - Current FSRS state of the memory.
 * @param now   - The current time.
 * @returns Retrievability in [0, 1].
 */
export function computeRetrievability(state: FsrsState, now: Date): number {
  const elapsedMs = now.getTime() - state.lastReview.getTime();
  const elapsedDays = elapsedMs / MS_PER_DAY;

  if (elapsedDays <= 0) {
    return 1.0;
  }

  return Math.pow(1 + elapsedDays / (9 * state.stability), -1);
}

/**
 * Compute the next FSRS state after a review.
 *
 * Updates stability and difficulty based on the grade. The formulas follow
 * FSRS-4.5 with the 15-parameter model.
 *
 * @param state  - Current FSRS state.
 * @param review - The review result.
 * @param params - Optional custom parameters (defaults to DEFAULT_PARAMS).
 * @returns The updated FSRS state.
 */
export function computeNextState(
  state: FsrsState,
  review: ReviewInput,
  params: readonly number[] = DEFAULT_PARAMS,
): FsrsState {
  const now = new Date();
  const retrievability = computeRetrievability(state, now);
  const { grade } = review;

  const isLapse = grade === 1 && state.reviewCount > 0;
  const isFirstReview = state.reviewCount === 0;

  // --- Difficulty update ---
  // D' = D + w6 * (grade - 3)
  // Clamp to [1, 10]
  const newDifficulty = clamp(
    state.difficulty + param(params, 6) * (grade - 3),
    MIN_DIFFICULTY,
    MAX_DIFFICULTY,
  );

  // --- Stability update ---
  let newStability: number;

  if (isFirstReview) {
    // Initial stability based on grade: S0 = w[grade-1]
    newStability = Math.max(param(params, grade - 1), MIN_STABILITY);
  } else if (isLapse) {
    // Lapse: stability drops significantly
    // S_lapse = max(MIN_STABILITY, S * w11 * D^(-w12) * ((S+1)^w13 - 1))
    // Ensure the result is always less than current stability
    const lapseFactor =
      param(params, 11) *
      Math.pow(newDifficulty, -param(params, 12)) *
      (Math.pow(state.stability + 1, param(params, 13)) - 1);
    newStability = Math.max(
      Math.min(state.stability * Math.min(lapseFactor, 0.5), state.stability * 0.5),
      MIN_STABILITY,
    );
  } else {
    // Successful review: stability increases
    // S_success = S * (1 + exp(w8) * (11 - D) * S^(-w9) * (exp(w10 * (1 - R)) - 1))
    // Grade modifier: hard = w[14]^-1 multiplier, easy = w[14] multiplier
    const gradeMultiplier =
      grade === 2
        ? 1 / param(params, 14)
        : grade === 4
          ? param(params, 14)
          : 1;

    const increment =
      Math.exp(param(params, 8)) *
      (11 - newDifficulty) *
      Math.pow(state.stability, -param(params, 9)) *
      (Math.exp(param(params, 10) * (1 - retrievability)) - 1);

    newStability = Math.max(
      state.stability * (1 + increment) * gradeMultiplier,
      MIN_STABILITY,
    );
  }

  return {
    stability: newStability,
    difficulty: newDifficulty,
    lastReview: now,
    reviewCount: state.reviewCount + 1,
    lapseCount: state.lapseCount + (isLapse ? 1 : 0),
  };
}

/**
 * Compute the next optimal review date.
 *
 * Returns the date at which retrievability drops below 0.9 (the FSRS
 * target). Derived from inverting R(t) = (1 + t / (9 * S))^(-1) = 0.9:
 *   t = 9 * S * (R_target^(-1) - 1)
 *
 * For R_target = 0.9: t = 9 * S * (1/0.9 - 1) = 9 * S * (1/9) = S
 * So the next review is simply S days after the last review.
 *
 * @param state - Current FSRS state.
 * @returns The Date when the next review should happen.
 */
export function computeNextReviewDate(state: FsrsState): Date {
  // t = 9 * S * (R^(-1) - 1) where R = TARGET_RETRIEVABILITY
  const intervalDays =
    9 * state.stability * (Math.pow(TARGET_RETRIEVABILITY, -1) - 1);

  const nextMs = state.lastReview.getTime() + intervalDays * MS_PER_DAY;
  return new Date(nextMs);
}

/**
 * Automatically determine a grade from objective response metrics.
 *
 * - Incorrect -> 1 (AGAIN)
 * - Correct + hints used or slow (>30s) -> 2 (HARD)
 * - Correct + normal speed (10-30s) + no hints -> 3 (GOOD)
 * - Correct + fast (<10s) + no hints -> 4 (EASY)
 *
 * @param correct        - Whether the answer was correct.
 * @param responseTimeMs - How long the student took in milliseconds.
 * @param hintsUsed      - Number of hints requested.
 * @returns A grade from 1 to 4.
 */
export function autoGrade(
  correct: boolean,
  responseTimeMs: number,
  hintsUsed: number,
): 1 | 2 | 3 | 4 {
  if (!correct) {
    return 1;
  }

  if (hintsUsed > 0 || responseTimeMs > 30_000) {
    return 2;
  }

  if (responseTimeMs < 10_000) {
    return 4;
  }

  return 3;
}
