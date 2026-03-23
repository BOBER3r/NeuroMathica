import { create } from "zustand";

type SessionType = "review" | "mixed" | "diagnostic";
type EmotionalState = "engaged" | "productive_struggle" | "frustrated" | "bored";

function deriveEmotionalState(
  consecutiveCorrect: number,
  consecutiveIncorrect: number,
): EmotionalState {
  if (consecutiveIncorrect >= 3) {
    return "frustrated";
  }
  if (consecutiveCorrect >= 4) {
    return "bored";
  }
  if (
    consecutiveIncorrect >= 1 &&
    consecutiveIncorrect <= 2
  ) {
    return "productive_struggle";
  }
  return "engaged";
}

interface PracticeState {
  // Session
  sessionId: string | null;
  isActive: boolean;
  sessionType: SessionType | null;

  // Problems
  currentProblemIndex: number;
  totalProblems: number;
  problemsCorrect: number;
  problemsAttempted: number;

  // Emotional state tracking
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  emotionalState: EmotionalState;

  // Session results
  xpEarned: number;

  // Actions
  startSession: (data: {
    sessionId: string;
    sessionType: SessionType;
    totalProblems: number;
  }) => void;
  submitAnswer: (correct: boolean) => void;
  nextProblem: () => void;
  addXp: (amount: number) => void;
  endSession: () => void;
  reset: () => void;
}

const initialState: Omit<
  PracticeState,
  "startSession" | "submitAnswer" | "nextProblem" | "addXp" | "endSession" | "reset"
> = {
  sessionId: null,
  isActive: false,
  sessionType: null,
  currentProblemIndex: 0,
  totalProblems: 0,
  problemsCorrect: 0,
  problemsAttempted: 0,
  consecutiveCorrect: 0,
  consecutiveIncorrect: 0,
  emotionalState: "engaged",
  xpEarned: 0,
};

export const usePracticeStore = create<PracticeState>()((set) => ({
  ...initialState,

  startSession: (data) =>
    set({
      sessionId: data.sessionId,
      sessionType: data.sessionType,
      totalProblems: data.totalProblems,
      isActive: true,
      currentProblemIndex: 0,
      problemsCorrect: 0,
      problemsAttempted: 0,
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      emotionalState: "engaged",
      xpEarned: 0,
    }),

  submitAnswer: (correct) =>
    set((state) => {
      const consecutiveCorrect = correct ? state.consecutiveCorrect + 1 : 0;
      const consecutiveIncorrect = correct ? 0 : state.consecutiveIncorrect + 1;
      const emotionalState = deriveEmotionalState(
        consecutiveCorrect,
        consecutiveIncorrect,
      );

      return {
        problemsAttempted: state.problemsAttempted + 1,
        problemsCorrect: correct
          ? state.problemsCorrect + 1
          : state.problemsCorrect,
        consecutiveCorrect,
        consecutiveIncorrect,
        emotionalState,
      };
    }),

  nextProblem: () =>
    set((state) => ({
      currentProblemIndex: state.currentProblemIndex + 1,
    })),

  addXp: (amount) =>
    set((state) => ({ xpEarned: state.xpEarned + amount })),

  endSession: () =>
    set({
      isActive: false,
    }),

  reset: () => set(initialState),
}));
