import { Gender } from ".";
import { AiPlan } from "./ai";

export interface GenerateRequest {
  profile: {
    age?: number;
    gender?: Gender;
    heightCm?: number;
    weightKg?: number;
    goal?: string;
    experienceLevel?: "beginner" | "intermediate" | "advanced";
    timePerWeek?: number;
    equipment?: string;
  };
}

export interface GenerateResponse {
  planId: string;
  plan: AiPlan;
}

export interface CheckoutRequest {
  priceId: string;
  customerEmail?: string;
}

export interface CheckoutResponse {
  url: string;
}
