import { describe, it, expect } from "vitest";
import {
  gcd,
  lcm,
  simplifyFraction,
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  decimalToFraction,
  percentToDecimal,
  decimalToPercent,
  roundToDecimals,
  isApproximatelyEqual,
} from "@/lib/math/arithmetic";

// ---------------------------------------------------------------------------
// gcd
// ---------------------------------------------------------------------------
describe("gcd", () => {
  it("computes gcd of two positive integers", () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(54, 24)).toBe(6);
  });

  it("handles one operand being zero", () => {
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(7, 0)).toBe(7);
  });

  it("handles both operands being zero", () => {
    expect(gcd(0, 0)).toBe(0);
  });

  it("handles negative numbers", () => {
    expect(gcd(-12, 8)).toBe(4);
    expect(gcd(12, -8)).toBe(4);
    expect(gcd(-12, -8)).toBe(4);
  });

  it("returns the number itself when both are equal", () => {
    expect(gcd(17, 17)).toBe(17);
  });
});

// ---------------------------------------------------------------------------
// lcm
// ---------------------------------------------------------------------------
describe("lcm", () => {
  it("computes lcm of two positive integers", () => {
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(3, 5)).toBe(15);
    expect(lcm(12, 18)).toBe(36);
  });

  it("returns 0 when either operand is zero", () => {
    expect(lcm(0, 5)).toBe(0);
    expect(lcm(7, 0)).toBe(0);
  });

  it("handles equal numbers", () => {
    expect(lcm(7, 7)).toBe(7);
  });

  it("handles coprime numbers", () => {
    expect(lcm(8, 9)).toBe(72);
  });
});

// ---------------------------------------------------------------------------
// simplifyFraction
// ---------------------------------------------------------------------------
describe("simplifyFraction", () => {
  it("reduces to lowest terms", () => {
    expect(simplifyFraction(4, 8)).toEqual([1, 2]);
    expect(simplifyFraction(6, 9)).toEqual([2, 3]);
  });

  it("handles already-simplified fractions", () => {
    expect(simplifyFraction(3, 7)).toEqual([3, 7]);
  });

  it("normalizes sign to numerator", () => {
    expect(simplifyFraction(-4, 8)).toEqual([-1, 2]);
    expect(simplifyFraction(4, -8)).toEqual([-1, 2]);
    expect(simplifyFraction(-4, -8)).toEqual([1, 2]);
  });

  it("handles zero numerator", () => {
    expect(simplifyFraction(0, 5)).toEqual([0, 1]);
  });

  it("throws for zero denominator", () => {
    expect(() => simplifyFraction(3, 0)).toThrow("Denominator cannot be zero");
  });
});

// ---------------------------------------------------------------------------
// addFractions
// ---------------------------------------------------------------------------
describe("addFractions", () => {
  it("adds two simple fractions", () => {
    expect(addFractions(1, 2, 1, 3)).toEqual([5, 6]);
  });

  it("adds and simplifies", () => {
    expect(addFractions(1, 4, 1, 4)).toEqual([1, 2]);
  });

  it("adds negative fractions", () => {
    expect(addFractions(-1, 3, 1, 3)).toEqual([0, 1]);
  });

  it("throws for zero denominator", () => {
    expect(() => addFractions(1, 0, 1, 3)).toThrow("Denominator cannot be zero");
  });
});

// ---------------------------------------------------------------------------
// subtractFractions
// ---------------------------------------------------------------------------
describe("subtractFractions", () => {
  it("subtracts two simple fractions", () => {
    expect(subtractFractions(3, 4, 1, 4)).toEqual([1, 2]);
  });

  it("produces a negative result", () => {
    expect(subtractFractions(1, 4, 3, 4)).toEqual([-1, 2]);
  });

  it("produces zero", () => {
    expect(subtractFractions(2, 5, 2, 5)).toEqual([0, 1]);
  });
});

// ---------------------------------------------------------------------------
// multiplyFractions
// ---------------------------------------------------------------------------
describe("multiplyFractions", () => {
  it("multiplies two fractions", () => {
    expect(multiplyFractions(2, 3, 3, 4)).toEqual([1, 2]);
  });

  it("multiplies by zero", () => {
    expect(multiplyFractions(0, 1, 5, 7)).toEqual([0, 1]);
  });

  it("multiplies negative fractions", () => {
    expect(multiplyFractions(-1, 2, 1, 3)).toEqual([-1, 6]);
  });
});

// ---------------------------------------------------------------------------
// divideFractions
// ---------------------------------------------------------------------------
describe("divideFractions", () => {
  it("divides two fractions", () => {
    expect(divideFractions(1, 2, 3, 4)).toEqual([2, 3]);
  });

  it("divides by one", () => {
    expect(divideFractions(5, 7, 1, 1)).toEqual([5, 7]);
  });

  it("throws when dividing by zero fraction", () => {
    expect(() => divideFractions(1, 2, 0, 5)).toThrow("Cannot divide by zero fraction");
  });

  it("handles negative divisor", () => {
    expect(divideFractions(1, 2, -1, 3)).toEqual([-3, 2]);
  });
});

// ---------------------------------------------------------------------------
// decimalToFraction
// ---------------------------------------------------------------------------
describe("decimalToFraction", () => {
  it("converts 0.5 to 1/2", () => {
    expect(decimalToFraction(0.5)).toEqual([1, 2]);
  });

  it("converts 0.333... to 1/3 (within tolerance)", () => {
    const [num, den] = decimalToFraction(1 / 3);
    expect(num).toBe(1);
    expect(den).toBe(3);
  });

  it("converts 0.75 to 3/4", () => {
    expect(decimalToFraction(0.75)).toEqual([3, 4]);
  });

  it("converts a negative decimal", () => {
    expect(decimalToFraction(-0.25)).toEqual([-1, 4]);
  });

  it("converts a whole number", () => {
    expect(decimalToFraction(5)).toEqual([5, 1]);
  });

  it("converts 0.125 to 1/8", () => {
    expect(decimalToFraction(0.125)).toEqual([1, 8]);
  });
});

// ---------------------------------------------------------------------------
// percentToDecimal
// ---------------------------------------------------------------------------
describe("percentToDecimal", () => {
  it("converts 50% to 0.5", () => {
    expect(percentToDecimal(50)).toBeCloseTo(0.5, 10);
  });

  it("converts 100% to 1", () => {
    expect(percentToDecimal(100)).toBeCloseTo(1, 10);
  });

  it("converts 0% to 0", () => {
    expect(percentToDecimal(0)).toBeCloseTo(0, 10);
  });

  it("converts 12.5% to 0.125", () => {
    expect(percentToDecimal(12.5)).toBeCloseTo(0.125, 10);
  });

  it("handles negative percentages", () => {
    expect(percentToDecimal(-25)).toBeCloseTo(-0.25, 10);
  });
});

// ---------------------------------------------------------------------------
// decimalToPercent
// ---------------------------------------------------------------------------
describe("decimalToPercent", () => {
  it("converts 0.5 to 50", () => {
    expect(decimalToPercent(0.5)).toBeCloseTo(50, 10);
  });

  it("converts 1 to 100", () => {
    expect(decimalToPercent(1)).toBeCloseTo(100, 10);
  });

  it("converts 0.333 to ~33.3", () => {
    expect(decimalToPercent(0.333)).toBeCloseTo(33.3, 10);
  });

  it("handles values greater than 1", () => {
    expect(decimalToPercent(2.5)).toBeCloseTo(250, 10);
  });
});

// ---------------------------------------------------------------------------
// roundToDecimals
// ---------------------------------------------------------------------------
describe("roundToDecimals", () => {
  it("rounds to 2 decimal places", () => {
    expect(roundToDecimals(3.14159, 2)).toBeCloseTo(3.14, 10);
  });

  it("rounds to 0 decimal places", () => {
    expect(roundToDecimals(3.7, 0)).toBeCloseTo(4, 10);
  });

  it("rounds 2.5 to 3 (0 places)", () => {
    expect(roundToDecimals(2.5, 0)).toBeCloseTo(3, 10);
  });

  it("handles negative numbers", () => {
    expect(roundToDecimals(-2.456, 1)).toBeCloseTo(-2.5, 10);
  });

  it("rounds to many decimal places", () => {
    expect(roundToDecimals(1.23456789, 5)).toBeCloseTo(1.23457, 10);
  });
});

// ---------------------------------------------------------------------------
// isApproximatelyEqual
// ---------------------------------------------------------------------------
describe("isApproximatelyEqual", () => {
  it("returns true for exactly equal values", () => {
    expect(isApproximatelyEqual(1, 1)).toBe(true);
  });

  it("returns true for values within epsilon", () => {
    expect(isApproximatelyEqual(1, 1 + 1e-11)).toBe(true);
  });

  it("returns false for values outside epsilon", () => {
    expect(isApproximatelyEqual(1, 1.001)).toBe(false);
  });

  it("works with custom epsilon", () => {
    expect(isApproximatelyEqual(1, 1.05, 0.1)).toBe(true);
    expect(isApproximatelyEqual(1, 1.2, 0.1)).toBe(false);
  });

  it("handles 0.1 + 0.2 vs 0.3", () => {
    expect(isApproximatelyEqual(0.1 + 0.2, 0.3)).toBe(true);
  });
});
