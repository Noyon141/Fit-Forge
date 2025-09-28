"use client";

import { AiPlan } from "@/lib/validators/aiPlan";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedButton } from "./animations/Animated-Button";

export default function GeneratePlanModal({
  onCreated,
}: {
  onCreated?: (plan: AiPlan) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [equipment, setEquipment] = useState("");

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await axios.post("/api/plans");
      const plan = res.data.plan as AiPlan;
      if (onCreated) onCreated(plan);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatedButton
        variant={"outline"}
        onClick={() => setOpen(true)}
        className=" rounded-full  px-4 py-2"
      >
        Create Plan
      </AnimatedButton>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 rounded shadow max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-3">Generate 4-week Plan</h3>

            <label className="block mb-2">
              <div className="text-sm text-slate-600">Goal</div>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="muscle gain"
                className="border p-2 w-full rounded"
              />
            </label>

            <label className="block mb-2">
              <div className="text-sm text-slate-600">Experience</div>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value as any)}
                className="border p-2 w-full rounded"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <label className="block mb-4">
              <div className="text-sm text-slate-600">Equipment (comma)</div>
              <input
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
