import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface EvaluationResult {
  qualityScore: number;      // 0-5
  feedback: string;
  referencesPriorConcept: boolean;
  ahaDetected: boolean;
  xpMultiplier: number;
}

export async function evaluateExplanation(
  reflectionText: string,
  conceptName: string,
  conceptDescription: string,
  studentLevel: number,
): Promise<EvaluationResult> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system: `You evaluate student math explanations. Return JSON only.

Rate the explanation on a 0-5 scale:
0: Empty or irrelevant
1: Restates the question or gives only the answer
2: Shows some understanding but is incomplete
3: Demonstrates procedural understanding
4: Shows conceptual understanding with reasoning
5: Deep understanding with connections to other concepts

Also detect:
- referencesPriorConcept: true if student mentions a related/prerequisite concept
- ahaDetected: true if the explanation shows a genuine insight or breakthrough moment`,
    messages: [
      {
        role: "user",
        content: `Concept: ${conceptName}
Description: ${conceptDescription}
Student Level: ${studentLevel}
Student's Explanation: "${reflectionText}"

Respond with JSON: { "qualityScore": number, "feedback": string, "referencesPriorConcept": boolean, "ahaDetected": boolean }`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const text = textBlock ? textBlock.text : '{"qualityScore":1,"feedback":"Could not evaluate","referencesPriorConcept":false,"ahaDetected":false}';

  try {
    const parsed = JSON.parse(text) as {
      qualityScore: number;
      feedback: string;
      referencesPriorConcept: boolean;
      ahaDetected: boolean;
    };

    const qualityScore = Math.max(0, Math.min(5, Math.round(parsed.qualityScore)));

    let xpMultiplier = 1.0;
    if (parsed.referencesPriorConcept) xpMultiplier *= 2.0; // Connection Maker
    if (qualityScore === 5 && parsed.ahaDetected) xpMultiplier *= 1.2; // First Try Clarity (for reflection)

    return {
      qualityScore,
      feedback: parsed.feedback,
      referencesPriorConcept: parsed.referencesPriorConcept,
      ahaDetected: parsed.ahaDetected,
      xpMultiplier,
    };
  } catch {
    return {
      qualityScore: 1,
      feedback: "Thank you for your explanation! Keep practicing expressing your mathematical thinking.",
      referencesPriorConcept: false,
      ahaDetected: false,
      xpMultiplier: 1.0,
    };
  }
}
