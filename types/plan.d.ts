import { z } from "zod";

export const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.string(),
  reps: z.string(),
});

export const DayPlanSchema = z.object({
  day: z.string(),
  exercises: z.array(ExerciseSchema),
});

export const PlanResponseSchema = z.object({
  week: z.array(DayPlanSchema),
});

// 🔒 Type inference (no `any`)
export type Exercise = z.infer<typeof ExerciseSchema>;
export type DayPlan = z.infer<typeof DayPlanSchema>;
export type PlanResponse = z.infer<typeof PlanResponseSchema>;
