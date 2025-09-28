// /types/ai.ts
export interface AiExercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // e.g. "8-12"
  tempo?: string | null; // e.g. "2-0-1"
  restSec?: number | null;
  progression?: string | null;
  notes?: string | null;
}

export interface AiWorkoutDay {
  name: string; // e.g. "Upper Push"
  warmup?: string[]; // array of warmup items
  exercises: AiExercise[];
  cooldown?: string[]; // array of cooldown items
}

export interface AiWeek {
  weekNumber: number;
  days: Record<string, AiWorkoutDay>; // "day1", "day2", ...
}

export interface AiNutrition {
  calories?: number | null;
  protein_g?: number | null;
  carbs_g?: number | null;
  fats_g?: number | null;
  notes?: string | null;
}

export interface AiPlan {
  title: string;
  summary: string;
  weeklyStructure: {
    [weekKey: string]: {
      [dayKey: string]: AiWorkoutDay;
    };
  };
  nutrition?: AiNutrition;
  progressMetrics?: string[]; // e.g. ["bodyweight","completion_percent"]
  coachNotes?: string | null;
}
