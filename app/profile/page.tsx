"use client";
import { ProfileInput, ProfileInputSchema } from "@/lib/validators/profile";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileInput>({
    age: undefined,
    gender: "MALE", // Required field with default value
    heightCm: undefined,
    weightKg: undefined,
    goal: "",
    experienceLevel: "",
    timePerWeek: undefined,
    equipment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // fetch current profile
    axios
      .get("/api/profile")
      .then((res) => {
        if (res.data?.profile) {
          setForm({
            age: res.data.profile.age,
            gender: res.data.profile.gender || "MALE", // Ensure gender has a value
            heightCm: res.data.profile.heightCm,
            weightKg: res.data.profile.weightKg,
            goal: res.data.profile.goal || "",
            experienceLevel: res.data.profile.experienceLevel || "",
            timePerWeek: res.data.profile.timePerWeek,
            equipment: res.data.profile.equipment || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  async function save() {
    setError(null);
    const parsed = ProfileInputSchema.safeParse(form);
    if (!parsed.success) {
      setError("Invalid input");
      console.error(z.treeifyError(parsed.error));
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/profile", parsed.data);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to save");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Profile</h1>

      <input
        type="number"
        placeholder="Age"
        min={5}
        max={120}
        value={form.age ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            age: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="border p-2 w-full mb-2"
      />
      <select
        value={form.gender}
        onChange={(e) =>
          setForm({
            ...form,
            gender: e.target.value as "MALE" | "FEMALE",
          })
        }
        className="border p-2 w-full mb-2"
        required
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <input
        type="number"
        placeholder="Height cm"
        min={50}
        max={300}
        value={form.heightCm ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            heightCm: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Weight kg"
        min={30}
        max={300}
        value={form.weightKg ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            weightKg: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Goal"
        value={form.goal ?? ""}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <select
        value={form.experienceLevel ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            experienceLevel: e.target.value || undefined,
          })
        }
        className="border p-2 w-full mb-2"
      >
        <option value="">Experience Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <input
        type="number"
        placeholder="Hours per week"
        min={1}
        value={form.timePerWeek ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            timePerWeek: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Equipment (comma)"
        value={form.equipment ?? ""}
        onChange={(e) => setForm({ ...form, equipment: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-2">
        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
