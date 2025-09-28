import { z } from "zod";

const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.number().int().nonnegative(),
  reps: z.string(),
  tempo: z.string().optional().nullable(),
  restSec: z.number().int().nonnegative().optional().nullable(),
  progression: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

const WorkoutDaySchema = z.object({
  name: z.string(),
  warmup: z.array(z.string()).optional(),
  exercises: z.array(ExerciseSchema),
  cooldown: z.array(z.string()).optional(),
});

const WeekSchema = z.record(z.string(), WorkoutDaySchema); // keys: day1, day2, etc.

const NutritionSchema = z.object({
  calories: z.number().optional().nullable(),
  protein_g: z.number().optional().nullable(),
  carbs_g: z.number().optional().nullable(),
  fats_g: z.number().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const AiPlanSchema = z.object({
  title: z.string(),
  summary: z.string(),
  weeklyStructure: z.record(z.string(), WeekSchema),
  nutrition: NutritionSchema.optional(),
  progressMetrics: z.array(z.string()).optional(),
  coachNotes: z.string().optional().nullable(),
});

export type AiPlan = z.infer<typeof AiPlanSchema>;

/**
 * Safe parse helper — returns typed AiPlan or throws with detailed validation error.
 */
export function parseAiPlan(raw: unknown): AiPlan {
  return AiPlanSchema.parse(raw);
}
