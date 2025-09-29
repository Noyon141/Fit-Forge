import { z } from "zod";

export const ProfileInputSchema = z.object({
  age: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().int().positive().min(5).max(120).optional()
  ),
  gender: z.enum(["MALE", "FEMALE"]), // Required to match Prisma enum
  heightCm: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().int().positive().min(50).max(300).optional()
  ),
  weightKg: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().positive().min(30).optional()
  ),
  goal: z.string().optional(),
  experienceLevel: z.string().optional(), // Changed to match Prisma String? type
  timePerWeek: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().positive().min(1).optional()
  ),
  equipment: z.string().optional(),
});

export type ProfileInput = z.infer<typeof ProfileInputSchema>;
