"use client";

import { ProfileInput, ProfileInputSchema } from "@/lib/validators/profile";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";

export default function Onboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileInput>({
    age: undefined,
    gender: undefined,
    heightCm: undefined,
    weightKg: undefined,
    goal: "",
    experienceLevel: undefined,
    timePerWeek: undefined,
    equipment: "",
  });

  function handleChange<K extends keyof ProfileInput>(
    key: K,
    value: string | number
  ) {
    setForm((prev) => ({ ...prev, [key]: value as any }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // client-side validation
    const parsed = ProfileInputSchema.safeParse(form);
    if (!parsed.success) {
      setError("Invalid input. Check your entries.");
      const treeifyError = z.treeifyError(parsed.error);
      console.error(treeifyError);
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/profile", parsed.data);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to save profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded space-y-4 w-full max-w-md"
      >
        <h1 className="text-xl font-bold">Tell us about you</h1>

        <input
          name="age"
          placeholder="Age"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => handleChange("age", Number(e.target.value))}
        />
        <select
          name="gender"
          className="border p-2 w-full"
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          name="heightCm"
          placeholder="Height (cm)"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => handleChange("heightCm", Number(e.target.value))}
        />
        <input
          name="weightKg"
          placeholder="Weight (kg)"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => handleChange("weightKg", Number(e.target.value))}
        />
        <input
          name="goal"
          placeholder="Your fitness goal"
          className="border p-2 w-full"
          onChange={(e) => handleChange("goal", e.target.value)}
        />
        <input
          name="experienceLevel"
          placeholder="Experience (beginner/intermediate/pro)"
          className="border p-2 w-full"
          onChange={(e) => handleChange("experienceLevel", e.target.value)}
        />
        <input
          name="timePerWeek"
          placeholder="Time per week (hours)"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => handleChange("timePerWeek", Number(e.target.value))}
        />
        <textarea
          name="equipment"
          placeholder="Available equipment"
          className="border p-2 w-full"
          onChange={(e) => handleChange("equipment", e.target.value)}
        ></textarea>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Continue
        </button>
      </form>
    </main>
  );
}
