/**
 * Lesson Player type definitions for the Neuro-Learning Sequence (NLS).
 * These types describe the data shape required to drive the 7-stage lesson flow.
 */

export interface ProblemData {
  id: string;
  content: {
    question: string;
    options?: string[];
    solution: string;
    visualization?: unknown;
  };
  explanationPrompt: string;
  layer: number;
}

export interface LessonData {
  conceptId: string;
  lessonId: string;
  stages: {
    hook: { animation: unknown };
    spatial: { scene: unknown };
    discovery: { scene: unknown; prompts: string[] };
    symbol: { scene: unknown; notation: string[] };
    realWorld: { context: string; illustration?: string };
    practice: { problems: ProblemData[] };
    reflection: { prompt: string };
  };
}
