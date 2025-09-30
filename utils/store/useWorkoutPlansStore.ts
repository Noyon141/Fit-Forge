import { AiPlan } from "@/types/ai";
import { create } from "zustand";

export interface WorkoutPlan {
  id: string;
  title: string;
  content: AiPlan;
  createdAt: string;
}

interface WorkoutPlansStore {
  plans: WorkoutPlan[];
  isLoading: boolean;
  error: string | null;
  hasLoaded: boolean; // Track if we've ever loaded plans

  // Actions
  setPlans: (plans: WorkoutPlan[]) => void;
  addPlan: (plan: WorkoutPlan) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearPlans: () => void;

  // API Actions
  fetchPlans: () => Promise<void>;
}

export const useWorkoutPlansStore = create<WorkoutPlansStore>((set, get) => ({
  plans: [],
  isLoading: false,
  error: null,
  hasLoaded: false,

  setPlans: (plans) => set({ plans, error: null, hasLoaded: true }),
  addPlan: (plan) =>
    set((state) => ({
      plans: [plan, ...state.plans],
      error: null,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearPlans: () => set({ plans: [], error: null, hasLoaded: false }),

  fetchPlans: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("/api/plans");

      if (!response.ok) {
        throw new Error(`Failed to fetch plans: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      set({
        plans: data.plans || [],
        isLoading: false,
        error: null,
        hasLoaded: true,
      });
    } catch (error) {
      console.error("Error fetching workout plans:", error);
      set({
        plans: [],
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch plans",
        hasLoaded: true,
      });
    }
  },
}));
