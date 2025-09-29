import z from "zod";

export const signupSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email address" })
    .min(2)
    .max(100),
  password: z
    .string({
      error: "Password must be at least 6 characters long",
    })
    .min(6),
  name: z
    .string({
      error: "Please enter your full name",
    })
    .min(2)
    .max(100),
  role: z.enum(["USER", "COACH", "ADMIN"]).default("USER").optional(),
});
