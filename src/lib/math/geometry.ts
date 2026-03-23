/**
 * Geometry utilities for NeuroMathica.
 * Covers distances, areas, angle conversions, polygon area (shoelace),
 * and helpers for coordinate-geometry topics in grades 6-8.
 */

const DEFAULT_EPSILON = 1e-10;

/** Euclidean distance between two points. */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/** Midpoint of two points. */
export function midpoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): [number, number] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

/**
 * Slope between two points.
 * Returns `null` for a vertical line (x1 === x2).
 */
export function slope(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number | null {
  if (x1 === x2) return null;
  return (y2 - y1) / (x2 - x1);
}

/**
 * Area of a triangle given three vertices, using the cross-product formula.
 * Always returns a non-negative value.
 */
export function triangleArea(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): number {
  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}

/**
 * Area of a triangle from its three side lengths using Heron's formula.
 * Throws if the sides cannot form a valid triangle.
 */
export function triangleAreaFromSides(
  a: number,
  b: number,
  c: number,
): number {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error("Side lengths must be positive");
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("Invalid triangle: side lengths violate triangle inequality");
  }
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

/** Pythagorean theorem: returns hypotenuse c given legs a and b. */
export function pythagorean(a: number, b: number): number {
  return Math.sqrt(a ** 2 + b ** 2);
}

/** Area of a rectangle. */
export function rectangleArea(width: number, height: number): number {
  return width * height;
}

/** Area of a circle. */
export function circleArea(radius: number): number {
  return Math.PI * radius ** 2;
}

/** Circumference of a circle. */
export function circleCircumference(radius: number): number {
  return 2 * Math.PI * radius;
}

/** Convert degrees to radians. */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** Convert radians to degrees. */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Angle (in degrees) from center (cx, cy) to point (px, py),
 * measured counter-clockwise from the positive x-axis.
 * Returns a value in [0, 360).
 */
export function angleBetweenPoints(
  cx: number,
  cy: number,
  px: number,
  py: number,
): number {
  const rad = Math.atan2(py - cy, px - cx);
  const deg = radiansToDegrees(rad);
  return ((deg % 360) + 360) % 360;
}

/**
 * Area of a simple (non-self-intersecting) polygon using the Shoelace formula.
 * Vertices are given as an array of [x, y] pairs in order.
 * Throws if fewer than 3 vertices are provided.
 */
export function polygonArea(vertices: [number, number][]): number {
  if (vertices.length < 3) {
    throw new Error("A polygon must have at least 3 vertices");
  }
  let area = 0;
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = vertices[i] as [number, number];
    const [x2, y2] = vertices[(i + 1) % n] as [number, number];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
}

/**
 * Check whether three side lengths form a right triangle.
 * Automatically identifies the hypotenuse (longest side).
 */
export function isRightTriangle(
  a: number,
  b: number,
  c: number,
  epsilon: number = DEFAULT_EPSILON,
): boolean {
  const sides = [a, b, c].sort((x, y) => x - y);
  const [s1, s2, s3] = sides as [number, number, number];
  return Math.abs(s1 ** 2 + s2 ** 2 - s3 ** 2) < epsilon;
}
