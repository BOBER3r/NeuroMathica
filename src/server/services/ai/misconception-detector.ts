interface ErrorPattern {
  conceptId: string;
  errorType: number; // 0=calculation, 1=conceptual, 2=procedural, 3=careless
  studentAnswer: string;
  correctAnswer: string;
}

interface MisconceptionResult {
  detected: boolean;
  misconceptionType?: string;
  description?: string;
  suggestedReteaching?: string;
  confidence: number;
}

// Common middle school math misconceptions
const KNOWN_MISCONCEPTIONS: Array<{
  pattern: RegExp;
  conceptIds: string[];
  type: string;
  description: string;
  reteaching: string;
}> = [
  {
    pattern: /fraction.*add.*numerator.*denominator/i,
    conceptIds: ["NO-1.4a"],
    type: "fraction-addition-common-denominator",
    description: "Student adds fractions by adding numerators AND denominators separately (e.g., 1/2 + 1/3 = 2/5)",
    reteaching: "Revisit fraction addition with visual fraction bars to show why common denominators are needed",
  },
  {
    pattern: /negative.*negative.*negative/i,
    conceptIds: ["NO-1.2a", "NO-1.2b"],
    type: "negative-times-negative",
    description: "Student believes negative × negative = negative",
    reteaching: "Use number line direction reversal to visualize double negation",
  },
  {
    pattern: /area.*perimeter/i,
    conceptIds: ["GE-4.6"],
    type: "area-perimeter-confusion",
    description: "Student confuses area and perimeter formulas",
    reteaching: "Compare area (filling inside) vs perimeter (walking around outside) with physical models",
  },
  {
    pattern: /exponent.*multiply.*base/i,
    conceptIds: ["NT-2.4"],
    type: "exponent-multiplication",
    description: "Student multiplies base by exponent instead of repeated multiplication (e.g., 2^3 = 6 instead of 8)",
    reteaching: "Show exponents as repeated multiplication with visual expansion",
  },
];

export function detectMisconception(
  errors: ErrorPattern[],
): MisconceptionResult {
  if (errors.length < 2) {
    return { detected: false, confidence: 0 };
  }

  // Check for systematic errors (same error type on same concept)
  const conceptErrors = new Map<string, ErrorPattern[]>();
  for (const error of errors) {
    const key = `${error.conceptId}-${error.errorType}`;
    const existing = conceptErrors.get(key) ?? [];
    existing.push(error);
    conceptErrors.set(key, existing);
  }

  // Look for patterns with 2+ occurrences
  for (const [, groupedErrors] of conceptErrors) {
    if (groupedErrors.length >= 2) {
      const conceptId = groupedErrors[0]?.conceptId ?? "";
      const errorType = groupedErrors[0]?.errorType ?? 0;

      // Check against known misconceptions
      for (const misconception of KNOWN_MISCONCEPTIONS) {
        if (misconception.conceptIds.includes(conceptId)) {
          return {
            detected: true,
            misconceptionType: misconception.type,
            description: misconception.description,
            suggestedReteaching: misconception.reteaching,
            confidence: Math.min(0.95, 0.5 + groupedErrors.length * 0.15),
          };
        }
      }

      // Generic systematic error
      return {
        detected: true,
        misconceptionType: `systematic-${errorType === 1 ? "conceptual" : "procedural"}`,
        description: `Systematic ${errorType === 1 ? "conceptual" : "procedural"} errors detected on concept ${conceptId}`,
        suggestedReteaching: "Review the concept with emphasis on visual understanding before procedural practice",
        confidence: Math.min(0.8, 0.4 + groupedErrors.length * 0.1),
      };
    }
  }

  return { detected: false, confidence: 0 };
}
