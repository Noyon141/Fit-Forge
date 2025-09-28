"use client";

import { AiPlan } from "@/lib/validators/aiPlan";
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
  const [plan, setPlan] = useState<AiPlan | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post("/api/generate");
      const parsed = res.data.plan as AiPlan;
      setPlan(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AnimatedButton
          onClick={generatePlan}
          className="p-4 py-16 bg-black dark:bg-stone-50 text-stone-50 dark:text-black rounded-2xl hover:bg-gray-800 dark:hover:bg-stone-100 transition-colors"
        >
          {loading ? (
            <div className="animate-pulse text-4xl font-semibold">...</div>
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
                <p className="mb-4">{plan.summary}</p>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(plan, null, 2)}
                </pre>
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
