"use client";

import { FitForgePlan, WeekPlan } from "@/types/plan";
import axios from "axios";
import { useState } from "react";
import { AnimatedButton } from "./animations/Animated-Button";
import {
  AnimatedDialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./animations/Dialog-Animation";

export default function GeneratePlan() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FitForgePlan | null>(null);
  const [open, setOpen] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    const res = await axios.post<FitForgePlan>("/api/generate", {
      goal: "Muscle Gain",
      equipment: "Dumbbells",
      time: 5,
    });
    setPlan(res.data);
    setLoading(false);
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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
      </DialogTrigger>

      <AnimatedDialogContent className="max-w-4xl max-h-[80vh] bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black dark:text-stone-50">
            Your Workout Plan
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto p-6">
          {plan ? (
            <div className="space-y-6">
              <div className="text-black dark:text-stone-50">
                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>

                {plan.weeks.map((week: WeekPlan) => (
                  <div
                    key={week.id}
                    className="mb-8 p-4 border-2 border-black dark:border-stone-50 rounded-2xl"
                  >
                    <h4 className="text-lg font-bold mb-4">Week {week.week}</h4>
                    <div className="space-y-4">
                      <div className="text-sm opacity-70">
                        Workout plan content will be displayed here
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-black dark:text-stone-50">
              Generate a plan to see it here
            </div>
          )}
        </div>
      </AnimatedDialogContent>
    </Dialog>
  );
}
