// /types/index.ts
export type ID = string;

export type Role = "USER" | "COACH" | "ADMIN";
export type Gender = "MALE" | "FEMALE";

export interface User {
  id: ID;
  email: string;
  name?: string | null;
  role: Role;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface Profile {
  id: ID;
  userId: ID;
  age?: number | null;
  gender?: Gender | null;
  heightCm?: number | null;
  weightKg?: number | null;
  goal?: string | null; // e.g. "muscle_gain" | "fat_loss" | "maintain"
  experienceLevel?: "beginner" | "intermediate" | "advanced" | null;
  timePerWeek?: number | null; // hours per week
  equipment?: string | null; // comma separated or JSON string for now
}

export interface WorkoutPlanDB {
  id: ID;
  userId: ID;
  title: string;
  content: unknown; // stored as JSON in DB — validate via zod before use
  createdAt: string;
  expiresAt?: string | null;
}

export interface Subscription {
  id: ID;
  userId: ID;
  stripeCustomer?: string | null;
  stripeSubId?: string | null;
  status?: string | null; // active/past_due/canceled
  priceId?: string | null;
  currentPeriodEnd?: number | null; // unix timestamp
  createdAt: string;
  updatedAt: string;
}

export interface ProgressEntry {
  id: ID;
  userId: ID;
  date: string; // ISO
  exerciseId: string;
  sets?: number | null;
  reps?: string | null;
  notes?: string | null;
}
