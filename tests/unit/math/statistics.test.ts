import { describe, it, expect } from "vitest";
import {
  mean,
  median,
  mode,
  range,
  variance,
  standardDeviation,
  quartiles,
} from "@/lib/math/statistics";

// ---------------------------------------------------------------------------
// mean
// ---------------------------------------------------------------------------
describe("mean", () => {
  it("computes mean of positive integers", () => {
    expect(mean([1, 2, 3, 4, 5])).toBeCloseTo(3, 10);
  });

  it("computes mean of a single value", () => {
    expect(mean([42])).toBeCloseTo(42, 10);
  });

  it("computes mean with negative numbers", () => {
    expect(mean([-2, 0, 2])).toBeCloseTo(0, 10);
  });

  it("computes mean with decimals", () => {
    expect(mean([1.5, 2.5, 3.5])).toBeCloseTo(2.5, 10);
  });

  it("throws for empty array", () => {
    expect(() => mean([])).toThrow("empty array");
  });
});

// ---------------------------------------------------------------------------
// median
// ---------------------------------------------------------------------------
describe("median", () => {
  it("computes median of odd-length array", () => {
    expect(median([1, 3, 5])).toBeCloseTo(3, 10);
  });

  it("computes median of even-length array", () => {
    expect(median([1, 2, 3, 4])).toBeCloseTo(2.5, 10);
  });

  it("computes median of single element", () => {
    expect(median([7])).toBeCloseTo(7, 10);
  });

  it("handles unsorted input", () => {
    expect(median([5, 1, 3, 2, 4])).toBeCloseTo(3, 10);
  });

  it("throws for empty array", () => {
    expect(() => median([])).toThrow("empty array");
  });
});

// ---------------------------------------------------------------------------
// mode
// ---------------------------------------------------------------------------
describe("mode", () => {
  it("finds single mode", () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
  });

  it("finds multiple modes (bimodal)", () => {
    expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
  });

  it("returns all values when all appear once", () => {
    expect(mode([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles single element", () => {
    expect(mode([5])).toEqual([5]);
  });

  it("handles all same values", () => {
    expect(mode([4, 4, 4])).toEqual([4]);
  });

  it("throws for empty array", () => {
    expect(() => mode([])).toThrow("empty array");
  });
});

// ---------------------------------------------------------------------------
// range
// ---------------------------------------------------------------------------
describe("range", () => {
  it("computes range of positive numbers", () => {
    expect(range([1, 5, 3, 9, 2])).toBeCloseTo(8, 10);
  });

  it("computes range with negative numbers", () => {
    expect(range([-5, 0, 5])).toBeCloseTo(10, 10);
  });

  it("returns 0 for single element", () => {
    expect(range([42])).toBeCloseTo(0, 10);
  });

  it("returns 0 for identical elements", () => {
    expect(range([3, 3, 3])).toBeCloseTo(0, 10);
  });

  it("throws for empty array", () => {
    expect(() => range([])).toThrow("empty array");
  });
});

// ---------------------------------------------------------------------------
// variance
// ---------------------------------------------------------------------------
describe("variance", () => {
  it("computes population variance", () => {
    // [2, 4, 4, 4, 5, 5, 7, 9] -> mean = 5, pop variance = 4
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9], true)).toBeCloseTo(4, 10);
  });

  it("computes sample variance", () => {
    // [2, 4, 4, 4, 5, 5, 7, 9] -> sample variance = 32/7 ≈ 4.571
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(32 / 7, 10);
  });

  it("computes population variance for two elements", () => {
    expect(variance([0, 10], true)).toBeCloseTo(25, 10);
  });

  it("throws for sample variance of single element", () => {
    expect(() => variance([5])).toThrow("single value");
  });

  it("throws for empty array", () => {
    expect(() => variance([])).toThrow("empty array");
  });
});

// ---------------------------------------------------------------------------
// standardDeviation
// ---------------------------------------------------------------------------
describe("standardDeviation", () => {
  it("computes population standard deviation", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], true)).toBeCloseTo(
      2,
      10,
    );
  });

  it("computes sample standard deviation", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(
      Math.sqrt(32 / 7),
      10,
    );
  });

  it("returns 0 for identical values (population)", () => {
    expect(standardDeviation([5, 5, 5], true)).toBeCloseTo(0, 10);
  });

  it("computes correctly for [1, 2, 3, 4, 5] population", () => {
    // Population variance = 2, stddev = sqrt(2)
    expect(standardDeviation([1, 2, 3, 4, 5], true)).toBeCloseTo(
      Math.sqrt(2),
      10,
    );
  });
});

// ---------------------------------------------------------------------------
// quartiles
// ---------------------------------------------------------------------------
describe("quartiles", () => {
  it("computes quartiles for odd-length dataset", () => {
    // [1, 2, 3, 4, 5, 6, 7] -> Q1=2, Q2=4, Q3=6
    const [q1, q2, q3] = quartiles([1, 2, 3, 4, 5, 6, 7]);
    expect(q1).toBeCloseTo(2, 10);
    expect(q2).toBeCloseTo(4, 10);
    expect(q3).toBeCloseTo(6, 10);
  });

  it("computes quartiles for even-length dataset", () => {
    // [1, 2, 3, 4, 5, 6, 7, 8] -> Q1=2.5, Q2=4.5, Q3=6.5
    const [q1, q2, q3] = quartiles([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(q1).toBeCloseTo(2.5, 10);
    expect(q2).toBeCloseTo(4.5, 10);
    expect(q3).toBeCloseTo(6.5, 10);
  });

  it("computes quartiles for classic textbook example", () => {
    // [6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49]
    const data = [6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49];
    const [q1, q2, q3] = quartiles(data);
    expect(q1).toBeCloseTo(15, 10);
    expect(q2).toBeCloseTo(40, 10);
    expect(q3).toBeCloseTo(43, 10);
  });

  it("handles unsorted input", () => {
    const [q1, q2, q3] = quartiles([7, 3, 1, 5]);
    expect(q1).toBeCloseTo(2, 10);
    expect(q2).toBeCloseTo(4, 10);
    expect(q3).toBeCloseTo(6, 10);
  });

  it("throws for fewer than 3 values", () => {
    expect(() => quartiles([1, 2])).toThrow("at least 3 values");
  });

  it("computes quartiles for 3-element dataset", () => {
    // [1, 5, 9] -> Q1 = median([1]) = 1, Q2 = 5, Q3 = median([9]) = 9
    const [q1, q2, q3] = quartiles([1, 5, 9]);
    expect(q1).toBeCloseTo(1, 10);
    expect(q2).toBeCloseTo(5, 10);
    expect(q3).toBeCloseTo(9, 10);
  });
});
