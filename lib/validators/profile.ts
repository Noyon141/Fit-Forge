import { z } from "zod";

export const ProfileInputSchema = z.object({
  age: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().int().positive()
  ),
  gender: z.union([z.literal("MALE"), z.literal("FEMALE")]),
  heightCm: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().int().positive().min(50).max(300)
  ),
  weightKg: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().positive().min(15).max(500)
  ),
  goal: z.string(),
  experienceLevel: z
    .union([
      z.literal("beginner"),
      z.literal("intermediate"),
      z.literal("advanced"),
    ])
    .optional(),
  timePerWeek: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().positive().optional()
  ),
  equipment: z.string().optional(),
});

export type ProfileInput = z.infer<typeof ProfileInputSchema>;
