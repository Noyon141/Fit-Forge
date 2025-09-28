import { z } from "zod";

export const ProfileInputSchema = z.object({
  age: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().int().positive().optional()
  ),
  gender: z
    .union([z.literal("male"), z.literal("female"), z.literal("other")])
    .optional(),
  heightCm: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().int().positive().optional()
  ),
  weightKg: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().positive().optional()
  ),
  goal: z.string().optional(),
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
