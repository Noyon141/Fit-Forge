export type ID = string;

export interface AiExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  tempo?: string | null;
  restSec?: number | null;
  progression?: string | null;
  notes?: string | null;
}

export interface AiWorkoutDay {
  id: string;
  name: string;
  warmup?: string[];
  exercises: AiExercise[];
  cooldown?: string[];
}

export interface AiPlan {
  title: string;
  summary: string;
  weeklyStructure: {
    [weekKey: string]: {
      [dayKey: string]: AiWorkoutDay;
    };
  };
  nutrition?: {
    calories?: number | null;
    protein_g?: number | null;
    carbs_g?: number | null;
    fats_g?: number | null;
    notes?: string | null;
  };
  progressMetrics?: string[];
  coachNotes?: string | null;
}
