import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface TutorContext {
  conceptName: string;
  conceptDescription: string;
  currentStage: string;
  studentLevel: number;
  sceneState?: unknown;
  conversationHistory: Array<{ role: "student" | "tutor"; content: string }>;
}

const SYSTEM_PROMPT = `You are Nova, an AI math tutor for NeuroMathica. You guide middle school students (grades 6-8) using the Socratic method.

RULES:
1. NEVER give the answer directly. Ask guiding questions that lead the student to discover it themselves.
2. Use simple, encouraging language appropriate for the student's level.
3. Reference the visual on screen when relevant (you know what's displayed).
4. When the student is stuck after 3 hints, provide a more direct nudge.
5. Celebrate genuine understanding, not just correct answers.
6. If you detect a misconception, address it gently with a counter-example.
7. Keep responses concise (2-4 sentences max unless explaining a concept).
8. You can generate scene commands to add/modify visualizations. Use them to illustrate concepts.

PERSONALITY:
- Warm, patient, curious
- Uses analogies and real-world connections
- Gets genuinely excited about math insights
- Never condescending or impatient`;

export async function sendTutorMessage(
  message: string,
  context: TutorContext,
): Promise<{ response: string; sceneCommands?: unknown[] }> {
  const messages: Anthropic.MessageParam[] = [];

  // Add conversation history
  for (const msg of context.conversationHistory) {
    messages.push({
      role: msg.role === "student" ? "user" : "assistant",
      content: msg.content,
    });
  }

  // Add current message
  messages.push({
    role: "user",
    content: `[Context: Student is on "${context.currentStage}" stage of "${context.conceptName}" lesson. Level: ${context.studentLevel}]

${message}`,
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages,
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const responseText = textBlock ? textBlock.text : "I'm having trouble thinking right now. Try asking again!";

  return {
    response: responseText,
    sceneCommands: undefined, // Scene command generation handled separately
  };
}
