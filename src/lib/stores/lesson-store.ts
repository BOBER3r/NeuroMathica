import { create } from "zustand";

type NlsStage =
  | "hook"
  | "spatial"
  | "discovery"
  | "symbol"
  | "realWorld"
  | "practice"
  | "reflection";

const NLS_STAGES: NlsStage[] = [
  "hook",
  "spatial",
  "discovery",
  "symbol",
  "realWorld",
  "practice",
  "reflection",
];

interface LessonState {
  // Current lesson
  conceptId: string | null;
  lessonId: string | null;
  currentStage: NlsStage;
  stageIndex: number;
  completedStages: NlsStage[];
  isActive: boolean;

  // Stage-specific state
  stageProgress: number; // 0-100 within current stage
  interactionCount: number; // Tracks manipulation diversity (Stage 2)

  // Actions
  startLesson: (conceptId: string, lessonId: string) => void;
  advanceStage: () => void;
  completeStage: (stage: NlsStage) => void;
  setStageProgress: (progress: number) => void;
  incrementInteraction: () => void;
  endLesson: () => void;
  reset: () => void;
}

const initialState: Omit<
  LessonState,
  | "startLesson"
  | "advanceStage"
  | "completeStage"
  | "setStageProgress"
  | "incrementInteraction"
  | "endLesson"
  | "reset"
> = {
  conceptId: null,
  lessonId: null,
  currentStage: "hook",
  stageIndex: 0,
  completedStages: [],
  isActive: false,
  stageProgress: 0,
  interactionCount: 0,
};

export const useLessonStore = create<LessonState>()((set) => ({
  ...initialState,

  startLesson: (conceptId, lessonId) =>
    set({
      conceptId,
      lessonId,
      currentStage: "hook",
      stageIndex: 0,
      completedStages: [],
      isActive: true,
      stageProgress: 0,
      interactionCount: 0,
    }),

  advanceStage: () =>
    set((state) => {
      const nextIndex = state.stageIndex + 1;
      const nextStage = NLS_STAGES[nextIndex];
      if (nextStage === undefined) {
        return state;
      }
      return {
        stageIndex: nextIndex,
        currentStage: nextStage,
        stageProgress: 0,
        interactionCount: 0,
      };
    }),

  completeStage: (stage) =>
    set((state) => {
      if (state.completedStages.includes(stage)) {
        return state;
      }
      return {
        completedStages: [...state.completedStages, stage],
      };
    }),

  setStageProgress: (progress) =>
    set({ stageProgress: Math.min(100, Math.max(0, progress)) }),

  incrementInteraction: () =>
    set((state) => ({ interactionCount: state.interactionCount + 1 })),

  endLesson: () =>
    set({
      isActive: false,
    }),

  reset: () => set(initialState),
}));
