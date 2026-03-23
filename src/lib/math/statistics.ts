/**
 * Statistics utilities for NeuroMathica.
 * Covers central tendency, spread, and quartile calculations
 * aligned with middle-school standards.
 */

/**
 * Arithmetic mean of a set of values.
 * Throws if the array is empty.
 */
export function mean(values: number[]): number {
  if (values.length === 0) throw new Error("Cannot compute mean of empty array");
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Median of a set of values.
 * For even-length arrays, returns the average of the two middle values.
 * Throws if the array is empty.
 */
export function median(values: number[]): number {
  if (values.length === 0) throw new Error("Cannot compute median of empty array");
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return ((sorted[mid - 1] as number) + (sorted[mid] as number)) / 2;
  }
  return sorted[mid] as number;
}

/**
 * Mode(s) of a set of values.
 * Returns an array because there can be multiple modes.
 * If all values appear equally often, all are returned (uniform distribution).
 * Throws if the array is empty.
 */
export function mode(values: number[]): number[] {
  if (values.length === 0) throw new Error("Cannot compute mode of empty array");

  const counts = new Map<number, number>();
  let maxCount = 0;

  for (const v of values) {
    const count = (counts.get(v) ?? 0) + 1;
    counts.set(v, count);
    if (count > maxCount) maxCount = count;
  }

  const modes: number[] = [];
  for (const [value, count] of counts) {
    if (count === maxCount) modes.push(value);
  }

  return modes.sort((a, b) => a - b);
}

/**
 * Range of a set of values (max - min).
 * Throws if the array is empty.
 */
export function range(values: number[]): number {
  if (values.length === 0) throw new Error("Cannot compute range of empty array");
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return max - min;
}

/**
 * Variance of a set of values.
 * @param population  If true, divides by N (population variance).
 *                    If false (default), divides by N-1 (sample variance).
 * Throws if the array is empty or if sample variance is requested for a single value.
 */
export function variance(
  values: number[],
  population: boolean = false,
): number {
  if (values.length === 0) throw new Error("Cannot compute variance of empty array");
  const divisor = population ? values.length : values.length - 1;
  if (divisor === 0) {
    throw new Error("Cannot compute sample variance of a single value");
  }
  const avg = mean(values);
  const sumSquaredDiffs = values.reduce(
    (sum, v) => sum + (v - avg) ** 2,
    0,
  );
  return sumSquaredDiffs / divisor;
}

/**
 * Standard deviation of a set of values.
 * @param population  If true, population standard deviation (divides by N).
 *                    If false (default), sample standard deviation (divides by N-1).
 */
export function standardDeviation(
  values: number[],
  population: boolean = false,
): number {
  return Math.sqrt(variance(values, population));
}

/**
 * Quartiles: Q1, Q2 (median), Q3.
 * Uses the "exclusive" median method (split data into two halves, excluding
 * the median for odd-length arrays) consistent with common middle-school textbooks.
 * Throws if fewer than 3 values are provided.
 */
export function quartiles(
  values: number[],
): [number, number, number] {
  if (values.length < 3) {
    throw new Error("Need at least 3 values to compute quartiles");
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const q2 = median(sorted);

  // Split into lower and upper halves
  const mid = Math.floor(n / 2);
  const lower = sorted.slice(0, mid);
  const upper = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);

  const q1 = median(lower);
  const q3 = median(upper);

  return [q1, q2, q3];
}
