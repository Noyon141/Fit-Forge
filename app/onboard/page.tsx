"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Onboard() {
  const router = useRouter();
  const [form, setForm] = useState({
    age: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    goal: "",
    experienceLevel: "",
    timePerWeek: "",
    equipment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/profile", form);
    router.push("/dashboard");
  };

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
          onChange={handleChange}
        />
        <select
          name="gender"
          className="border p-2 w-full"
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <input
          name="weightKg"
          placeholder="Weight (kg)"
          type="number"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="goal"
          placeholder="Your fitness goal"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="experienceLevel"
          placeholder="Experience (beginner/intermediate/pro)"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="timePerWeek"
          placeholder="Time per week (hours)"
          type="number"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <textarea
          name="equipment"
          placeholder="Available equipment"
          className="border p-2 w-full"
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Continue
        </button>
      </form>
    </main>
  );
}
