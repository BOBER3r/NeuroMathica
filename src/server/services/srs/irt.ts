/**
 * Item Response Theory (IRT) 2-Parameter Logistic model implementation.
 *
 * Used for adaptive item selection and student ability estimation.
 *
 * Task: T060
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** IRT parameters for a single problem/item. */
export interface IrtItem {
  /** Item difficulty (location on the ability scale). */
  difficultyB: number;
  /** Item discrimination (slope of the ICC at the difficulty point). */
  discriminationA: number;
}

/** Student ability estimate with uncertainty. */
export interface StudentAbility {
  /** Current ability estimate (logit scale). */
  theta: number;
  /** Standard error of the ability estimate. */
  standardError: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default prior standard deviation for Bayesian update. */
const PRIOR_SD = 1.0;

/** Minimum standard error to prevent collapse. */
const MIN_SE = 0.1;

/** Maximum standard error. */
const MAX_SE = 3.0;

/** Default target success probability for item selection. */
const DEFAULT_TARGET_SUCCESS = 0.85;

// ---------------------------------------------------------------------------
// Core IRT functions
// ---------------------------------------------------------------------------

/**
 * Compute the probability of a correct response using the 2PL model.
 *
 *   P(theta) = 1 / (1 + exp(-a * (theta - b)))
 *
 * @param theta - Student ability.
 * @param item  - Item parameters (difficulty b, discrimination a).
 * @returns Probability of correct response in [0, 1].
 */
export function probability2PL(theta: number, item: IrtItem): number {
  const exponent = -item.discriminationA * (theta - item.difficultyB);
  return 1 / (1 + Math.exp(exponent));
}

/**
 * Compute the Fisher information of an item at a given ability level.
 *
 *   I(theta) = a^2 * P(theta) * (1 - P(theta))
 *
 * @param theta - Student ability.
 * @param item  - Item parameters.
 * @returns Fisher information value.
 */
export function fisherInformation(theta: number, item: IrtItem): number {
  const p = probability2PL(theta, item);
  return item.discriminationA ** 2 * p * (1 - p);
}

/**
 * Update student ability estimate using Bayesian EAP (Expected A Posteriori).
 *
 * Uses a single Newton-Raphson step with a normal prior:
 *   posterior proportional to likelihood * prior
 *
 * The likelihood for a single binary response is:
 *   L = P^x * (1-P)^(1-x)
 *
 * Log-posterior derivative (score):
 *   dL/dtheta = a * (x - P) - (theta - mu_prior) / sigma_prior^2
 *
 * Log-posterior second derivative (negative information):
 *   d2L/dtheta2 = -a^2 * P * (1-P) - 1/sigma_prior^2
 *
 * Newton step: theta_new = theta - score / d2L
 *
 * @param ability - Current student ability estimate.
 * @param item    - Item that was just administered.
 * @param correct - Whether the student answered correctly.
 * @returns Updated student ability estimate.
 */
export function updateAbility(
  ability: StudentAbility,
  item: IrtItem,
  correct: boolean,
): StudentAbility {
  const x = correct ? 1 : 0;
  const p = probability2PL(ability.theta, item);
  const a = item.discriminationA;

  // Prior precision (inverse variance)
  const priorPrecision = 1 / (PRIOR_SD * PRIOR_SD);

  // Score function: d(log posterior)/d(theta)
  const score = a * (x - p) - (ability.theta * priorPrecision);

  // Negative of second derivative (observed information + prior precision)
  const info = a * a * p * (1 - p) + priorPrecision;

  // Newton-Raphson step
  const newTheta = ability.theta + score / info;

  // New standard error from posterior precision
  // SE = 1 / sqrt(total information)
  // Total information = item Fisher info + prior precision + accumulated precision
  const accumulatedPrecision = 1 / (ability.standardError * ability.standardError);
  const totalPrecision = fisherInformation(newTheta, item) + accumulatedPrecision;
  const newSE = clamp(1 / Math.sqrt(totalPrecision), MIN_SE, MAX_SE);

  return {
    theta: newTheta,
    standardError: newSE,
  };
}

/**
 * Select the next item that targets a specific success probability.
 *
 * Finds the item whose predicted success probability is closest to the
 * target. This is a form of Sympson-Hetter content balancing that avoids
 * over-exposing maximally informative items and instead targets a
 * pedagogically appropriate difficulty.
 *
 * Typical targets:
 * - Normal mode: 0.85 (students succeed most of the time)
 * - Frustrated mode: 0.92 (easier items to rebuild confidence)
 * - Bored mode: 0.75 (harder items to increase engagement)
 *
 * @param ability       - Current student ability estimate.
 * @param items         - Available items to select from.
 * @param targetSuccess - Target success probability (default 0.85).
 * @returns The selected item, or the first item if the array has only one.
 * @throws Error if the items array is empty.
 */
export function selectNextItem(
  ability: StudentAbility,
  items: readonly IrtItem[],
  targetSuccess: number = DEFAULT_TARGET_SUCCESS,
): IrtItem {
  if (items.length === 0) {
    throw new Error("Cannot select from an empty item pool");
  }

  let bestItem: IrtItem = items[0]!;
  let bestDistance = Infinity;

  for (const item of items) {
    const p = probability2PL(ability.theta, item);
    const distance = Math.abs(p - targetSuccess);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestItem = item;
    }
  }

  return bestItem;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
