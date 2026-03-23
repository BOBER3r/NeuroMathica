import Dexie, { type EntityTable } from "dexie";

interface LessonProgress {
  id: string;
  conceptId: string;
  currentStage: number;
  completedStages: number[];
  lastUpdated: Date;
  synced: boolean;
}

interface PendingAction {
  id: string;
  type: "completeStage" | "submitAnswer" | "submitReflection";
  payload: string; // JSON stringified
  createdAt: Date;
  retryCount: number;
  synced: boolean;
}

class NeuroMathicaDB extends Dexie {
  lessonProgress!: EntityTable<LessonProgress, "id">;
  pendingActions!: EntityTable<PendingAction, "id">;

  constructor() {
    super("neuromathica");
    this.version(1).stores({
      lessonProgress: "id, conceptId, synced, lastUpdated",
      pendingActions: "id, type, synced, createdAt",
    });
  }
}

export const offlineDb = new NeuroMathicaDB();

export type { LessonProgress, PendingAction };
