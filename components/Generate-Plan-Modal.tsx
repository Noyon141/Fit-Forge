"use client";
import { AiPlan } from "@/types/ai";
import { usePlanStore } from "@/utils/store/usePlanStore";
import axios from "axios";
import { useState } from "react";
import { AnimatedButton } from "./animations/Animated-Button";

export default function GeneratePlanModal({
  onCreated,
}: {
  onCreated?: (p: AiPlan) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const setPlan = usePlanStore((s) => s.setPlan);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await axios.post("/api/plans");
      const plan = res.data.plan as AiPlan;
      setPlan(plan);
      if (onCreated) onCreated(plan);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to generate plan. Make sure you have a profile and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatedButton
        onClick={() => setOpen(true)}
        className="px-4 py-2 font-semibold rounded"
      >
        Generate Plan
      </AnimatedButton>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3">Generate 4-week Plan</h3>
            <p className="text-sm text-slate-600 mb-4">
              We will use your saved profile to create a personalized plan.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <AnimatedButton
                onClick={handleGenerate}
                disabled={loading}
                className="px-4 py-2  rounded"
              >
                {loading ? "Generating..." : "Generate"}
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
