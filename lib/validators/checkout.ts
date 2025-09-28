import { z } from "zod";

export const CheckoutRequestSchema = z.object({
  priceId: z.string().min(1),
  customerEmail: z.email().optional(),
});

export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;
