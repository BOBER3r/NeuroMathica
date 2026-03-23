/**
 * Arithmetic utilities for NeuroMathica.
 * Covers GCD, LCM, fraction operations, decimal/percent conversions,
 * and approximate equality for floating-point comparisons.
 */

const DEFAULT_EPSILON = 1e-10;

/**
 * Greatest common divisor using the Euclidean algorithm.
 * Operates on absolute values so negative inputs are handled correctly.
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Least common multiple.
 * Returns 0 when either argument is 0.
 */
export function lcm(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  if (a === 0 || b === 0) return 0;
  return (a / gcd(a, b)) * b;
}

/**
 * Reduce a fraction to lowest terms.
 * Denominator is always positive in the result; the sign lives on the numerator.
 * Throws if the denominator is zero.
 */
export function simplifyFraction(num: number, den: number): [number, number] {
  if (den === 0) throw new Error("Denominator cannot be zero");
  if (num === 0) return [0, 1];
  const sign = Math.sign(num) * Math.sign(den);
  const g = gcd(Math.abs(num), Math.abs(den));
  return [sign * (Math.abs(num) / g), Math.abs(den) / g];
}

/** Add two fractions and return the simplified result. */
export function addFractions(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
): [number, number] {
  if (d1 === 0 || d2 === 0) throw new Error("Denominator cannot be zero");
  const num = n1 * d2 + n2 * d1;
  const den = d1 * d2;
  return simplifyFraction(num, den);
}

/** Subtract the second fraction from the first and return the simplified result. */
export function subtractFractions(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
): [number, number] {
  if (d1 === 0 || d2 === 0) throw new Error("Denominator cannot be zero");
  const num = n1 * d2 - n2 * d1;
  const den = d1 * d2;
  return simplifyFraction(num, den);
}

/** Multiply two fractions and return the simplified result. */
export function multiplyFractions(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
): [number, number] {
  if (d1 === 0 || d2 === 0) throw new Error("Denominator cannot be zero");
  return simplifyFraction(n1 * n2, d1 * d2);
}

/** Divide the first fraction by the second and return the simplified result. */
export function divideFractions(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
): [number, number] {
  if (d1 === 0 || d2 === 0) throw new Error("Denominator cannot be zero");
  if (n2 === 0) throw new Error("Cannot divide by zero fraction");
  return simplifyFraction(n1 * d2, d1 * n2);
}

/**
 * Convert a decimal number to a fraction using continued-fraction approximation.
 * @param decimal  The value to convert.
 * @param tolerance  Maximum allowed error (default 1e-10).
 */
export function decimalToFraction(
  decimal: number,
  tolerance: number = 1e-10,
): [number, number] {
  if (Number.isInteger(decimal)) return [decimal, 1];

  const sign = Math.sign(decimal);
  let value = Math.abs(decimal);

  let h0 = 0,
    h1 = 1;
  let k0 = 1,
    k1 = 0;

  let remaining = value;

  for (let i = 0; i < 100; i++) {
    const a = Math.floor(remaining);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;

    h0 = h1;
    h1 = h2;
    k0 = k1;
    k1 = k2;

    if (Math.abs(value - h1 / k1) < tolerance) break;

    const diff = remaining - a;
    if (diff < tolerance) break;
    remaining = 1 / diff;
  }

  return simplifyFraction(sign * h1, k1);
}

/** Convert a percentage to its decimal equivalent. */
export function percentToDecimal(percent: number): number {
  return percent / 100;
}

/** Convert a decimal to its percentage equivalent. */
export function decimalToPercent(decimal: number): number {
  return decimal * 100;
}

/** Round a number to a given number of decimal places. */
export function roundToDecimals(value: number, places: number): number {
  const factor = Math.pow(10, places);
  return Math.round(value * factor) / factor;
}

/**
 * Check whether two numbers are approximately equal.
 * @param epsilon  Maximum allowed absolute difference (default 1e-10).
 */
export function isApproximatelyEqual(
  a: number,
  b: number,
  epsilon: number = DEFAULT_EPSILON,
): boolean {
  return Math.abs(a - b) < epsilon;
}
