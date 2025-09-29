import { AiPlan } from "@/types/ai";
import { create } from "zustand";
interface PlanStore {
  plan: AiPlan | null;
  setPlan: (plan: AiPlan | null) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  plan: null,
  setPlan: (plan) => set({ plan }),
}));
