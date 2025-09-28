"use client";

import { FitForgePlan } from "@/types/plan";
import axios from "axios";
import { useState } from "react";
import { AnimatedButton } from "./animations/Animated-Button";

export default function GeneratePlan() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FitForgePlan | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    const res = await axios.post("/api/generate", {
      goal: "Muscle Gain",
      equipment: "Dumbbells",
      time: 5,
    });
    setPlan(res.data);
  };
  return (
    <>
      <AnimatedButton
        onClick={generatePlan}
        className="p-4 py-16 bg-black dark:bg-stone-50 text-stone-50 dark:text-black rounded-2xl hover:bg-gray-800 dark:hover:bg-stone-100 transition-colors"
      >
        {loading ? (
          <div className="animate-pulse">...</div>
        ) : (
          <>
            <div className="text-2xl mb-2">🎯</div>
            <p className="font-medium">New Plan</p>
          </>
        )}
      </AnimatedButton>
    </>
  );
}
