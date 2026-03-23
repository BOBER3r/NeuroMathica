/**
 * Spaced Repetition System — public API barrel export.
 */

export {
  computeRetrievability,
  computeNextState,
  computeNextReviewDate,
  autoGrade,
  DEFAULT_PARAMS,
  type FsrsState,
  type ReviewInput,
} from "./fsrs";

export {
  probability2PL,
  fisherInformation,
  updateAbility,
  selectNextItem,
  type IrtItem,
  type StudentAbility,
} from "./irt";

export {
  checkPrerequisiteHealth,
  getPrerequisiteRefreshers,
} from "./prerequisite-graph";

export {
  interleaveSession,
  type SessionItem,
  type ConfusionPair,
  type InterleaveOptions,
} from "./interleaver";

export {
  detectRoteMemorization,
  type ConceptKnowledge,
  type RoteDetectionResult,
} from "./rote-detector";
