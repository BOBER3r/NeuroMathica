import { create } from "zustand";

interface UserState {
  // Auth (populated from Clerk + DB)
  studentId: string | null;
  displayName: string | null;
  gradeLevel: number | null;
  isAuthenticated: boolean;

  // Gamification
  totalXp: number;
  currentLevel: number;
  neurons: number;

  // Preferences
  themeId: string;
  soundEnabled: boolean;

  // Actions
  setStudent: (data: {
    studentId: string;
    displayName: string;
    gradeLevel: number | null;
    totalXp: number;
    currentLevel: number;
    neurons: number;
  }) => void;
  clearStudent: () => void;
  updatePreferences: (
    prefs: Partial<{ themeId: string; soundEnabled: boolean }>,
  ) => void;
  addXp: (amount: number) => void;
  setLevel: (level: number) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  // Auth
  studentId: null,
  displayName: null,
  gradeLevel: null,
  isAuthenticated: false,

  // Gamification
  totalXp: 0,
  currentLevel: 1,
  neurons: 0,

  // Preferences
  themeId: "default",
  soundEnabled: true,

  // Actions
  setStudent: (data) =>
    set({
      studentId: data.studentId,
      displayName: data.displayName,
      gradeLevel: data.gradeLevel,
      totalXp: data.totalXp,
      currentLevel: data.currentLevel,
      neurons: data.neurons,
      isAuthenticated: true,
    }),

  clearStudent: () =>
    set({
      studentId: null,
      displayName: null,
      gradeLevel: null,
      isAuthenticated: false,
      totalXp: 0,
      currentLevel: 1,
      neurons: 0,
    }),

  updatePreferences: (prefs) => set((state) => ({ ...state, ...prefs })),

  addXp: (amount) =>
    set((state) => ({ totalXp: state.totalXp + amount })),

  setLevel: (level) => set({ currentLevel: level }),
}));
