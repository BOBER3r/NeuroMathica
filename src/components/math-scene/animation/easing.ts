import { easeCubicInOut, easeBackOut, easeLinear } from "d3-ease";

export type EasingName = "linear" | "easeInOut" | "easeOutBack" | "spring";

const EASING_FUNCTIONS: Record<EasingName, (t: number) => number> = {
  linear: easeLinear,
  easeInOut: easeCubicInOut,
  easeOutBack: easeBackOut,
  spring: (t: number) => {
    // Damped spring simulation
    const w = 2 * Math.PI * 3; // frequency
    const d = 0.7; // damping
    return 1 - Math.exp(-d * w * t) * Math.cos(w * Math.sqrt(1 - d * d) * t);
  },
};

export function getEasing(name: EasingName): (t: number) => number {
  return EASING_FUNCTIONS[name] ?? EASING_FUNCTIONS.easeInOut;
}

export function toFramerEasing(name: EasingName): readonly [number, number, number, number] | "anticipate" {
  switch (name) {
    case "linear":
      return [0, 0, 1, 1] as const;
    case "easeInOut":
      return [0.42, 0, 0.58, 1] as const;
    case "easeOutBack":
      return [0.34, 1.56, 0.64, 1] as const;
    case "spring":
      return "anticipate";
    default:
      return [0.42, 0, 0.58, 1] as const;
  }
}
