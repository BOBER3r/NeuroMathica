/**
 * Rote memorization detection.
 *
 * Detects when a student has memorized procedures without genuine
 * understanding, based on the three-layer SRS stability model and
 * error pattern analysis.
 *
 * Task: T062
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ConceptKnowledge {
  /** Stability for recall-layer items (days). */
  recallStability: number;
  /** Stability for procedure-layer items (days). */
  procedureStability: number;
  /** Stability for understanding-layer items (days). */
  understandingStability: number;
  /** Number of times the student failed a transfer problem for this concept. */
  transferFailureCount: number;
  /** Array of error pattern identifiers (e.g. "sign-error", "order-of-operations"). */
  systematicErrors: string[];
}

export interface RoteDetectionResult {
  /** Whether the student is likely rote memorizing. */
  isRote: boolean;
  /** Confidence in the detection (0-1). */
  confidence: number;
  /** Human-readable explanation of why rote was detected, if applicable. */
  reason?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Minimum ratio of procedure/understanding stability that signals a gap.
 * If procedure stability is more than this many times the understanding
 * stability, it is a flag.
 */
const STABILITY_GAP_RATIO = 3.0;

/**
 * Minimum procedure stability to even consider rote detection.
 * If the student is still learning the procedure, a stability gap is
 * expected and not indicative of rote memorization.
 */
const MIN_PROCEDURE_STABILITY = 5.0;

/**
 * Transfer failure count threshold for flagging.
 */
const TRANSFER_FAILURE_THRESHOLD = 2;

/**
 * Number of systematic errors that constitutes a pattern.
 */
const SYSTEMATIC_ERROR_THRESHOLD = 3;

/**
 * Weight for each signal in the confidence calculation.
 */
const SIGNAL_WEIGHTS = {
  stabilityGap: 0.45,
  transferFailure: 0.35,
  systematicErrors: 0.20,
} as const;

// ---------------------------------------------------------------------------
// Core function
// ---------------------------------------------------------------------------

/**
 * Detect rote memorization patterns in a student's concept knowledge.
 *
 * Three independent signals are evaluated:
 *
 * 1. **Stability gap**: High procedure stability with low understanding
 *    stability suggests the student can execute the algorithm but cannot
 *    explain *why* it works.
 *
 * 2. **Transfer failures**: The student can solve routine problems but
 *    fails when the same concept appears in a novel context.
 *
 * 3. **Systematic errors**: Repeated identical errors suggest memorized
 *    but flawed procedures (e.g., always forgetting to flip the sign).
 *
 * @param knowledge - The student's knowledge state for a single concept.
 * @returns Detection result with confidence and optional reason.
 */
export function detectRoteMemorization(
  knowledge: ConceptKnowledge,
): RoteDetectionResult {
  const signals: Array<{ active: boolean; confidence: number; reason: string }> =
    [];

  // --- Signal 1: Stability gap ---
  const hasStabilityGap =
    knowledge.procedureStability >= MIN_PROCEDURE_STABILITY &&
    knowledge.understandingStability > 0 &&
    knowledge.procedureStability / knowledge.understandingStability >=
      STABILITY_GAP_RATIO;

  if (hasStabilityGap) {
    const ratio =
      knowledge.procedureStability / knowledge.understandingStability;
    // Confidence scales with the gap: ratio of 3 = baseline, ratio of 10+ = near certain
    const gapConfidence = Math.min((ratio - STABILITY_GAP_RATIO) / 7 + 0.5, 1.0);
    signals.push({
      active: true,
      confidence: gapConfidence,
      reason: `Procedure stability (${knowledge.procedureStability.toFixed(1)}d) is ${ratio.toFixed(1)}x understanding stability (${knowledge.understandingStability.toFixed(1)}d)`,
    });
  } else {
    signals.push({ active: false, confidence: 0, reason: "" });
  }

  // --- Signal 2: Transfer failures ---
  const hasTransferFailures =
    knowledge.transferFailureCount >= TRANSFER_FAILURE_THRESHOLD;

  if (hasTransferFailures) {
    const transferConfidence = Math.min(
      knowledge.transferFailureCount / (TRANSFER_FAILURE_THRESHOLD * 2),
      1.0,
    );
    signals.push({
      active: true,
      confidence: transferConfidence,
      reason: `${knowledge.transferFailureCount} transfer problem failures indicate procedural-only knowledge`,
    });
  } else {
    signals.push({ active: false, confidence: 0, reason: "" });
  }

  // --- Signal 3: Systematic errors ---
  const hasSystematicErrors =
    knowledge.systematicErrors.length >= SYSTEMATIC_ERROR_THRESHOLD;

  if (hasSystematicErrors) {
    // Deduplicate errors and check for repeated patterns
    const errorCounts = new Map<string, number>();
    for (const err of knowledge.systematicErrors) {
      errorCounts.set(err, (errorCounts.get(err) ?? 0) + 1);
    }

    const repeatedErrors = [...errorCounts.entries()].filter(
      ([, count]) => count >= 2,
    );
    const hasRepeated = repeatedErrors.length > 0;

    if (hasRepeated || knowledge.systematicErrors.length >= SYSTEMATIC_ERROR_THRESHOLD) {
      const errorConfidence = Math.min(
        knowledge.systematicErrors.length / (SYSTEMATIC_ERROR_THRESHOLD * 2),
        1.0,
      );
      signals.push({
        active: true,
        confidence: errorConfidence,
        reason: `Systematic error patterns detected: ${[...errorCounts.keys()].join(", ")}`,
      });
    } else {
      signals.push({ active: false, confidence: 0, reason: "" });
    }
  } else {
    signals.push({ active: false, confidence: 0, reason: "" });
  }

  // --- Combine signals ---
  const stabilityGapSignal = signals[0]!;
  const transferSignal = signals[1]!;
  const errorSignal = signals[2]!;

  const weightedConfidence =
    stabilityGapSignal.confidence * SIGNAL_WEIGHTS.stabilityGap +
    transferSignal.confidence * SIGNAL_WEIGHTS.transferFailure +
    errorSignal.confidence * SIGNAL_WEIGHTS.systematicErrors;

  const activeCount = [stabilityGapSignal, transferSignal, errorSignal].filter(
    (s) => s.active,
  ).length;

  // isRote requires at least one active signal with combined confidence > 0.4
  const isRote = activeCount >= 1 && weightedConfidence > 0.4;

  // Build reason from active signals
  const reasons = [stabilityGapSignal, transferSignal, errorSignal]
    .filter((s) => s.active)
    .map((s) => s.reason);

  return {
    isRote,
    confidence: Math.min(weightedConfidence, 1.0),
    reason: reasons.length > 0 ? reasons.join("; ") : undefined,
  };
}
