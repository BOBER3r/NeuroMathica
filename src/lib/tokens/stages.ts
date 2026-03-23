/**
 * Neural Learning Sequence stage constants.
 * Every lesson follows this 7-stage pipeline (see Constitution §Pedagogical Framework).
 */

export const NLS_STAGES = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
] as const;

export type NLSStage = (typeof NLS_STAGES)[number];

export const STAGE_LABELS: Record<NLSStage, string> = {
  hook: "Hook",
  spatial: "Explore",
  discovery: "Discover",
  symbol: "Symbols",
  realWorld: "Real World",
  practice: "Practice",
  reflection: "Reflect",
};
