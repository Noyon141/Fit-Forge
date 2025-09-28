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

export default function GeneratePlan({
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
  const [plan, setPlan] = useState<AiPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/plans", {
        goal,
        experience,
        daysPerWeek,
        equipment,
      });
      const generatedPlan = res.data.plan as AiPlan;
      setPlan(generatedPlan);
      if (onCreated) onCreated(generatedPlan);
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AnimatedButton
          onClick={handleOpenDialog}
          className="p-4 py-16 bg-black dark:bg-stone-50 text-stone-50 dark:text-black rounded-2xl hover:bg-gray-800 dark:hover:bg-stone-100 transition-colors"
        >
          <div className="text-2xl mb-2">🎯</div>
          <p className="font-medium">New Plan</p>
        </AnimatedButton>
      </DialogTrigger>

      <AnimatedDialogContent className="max-w-4xl max-h-[80vh] mt-80 md:mt-64 lg:mt-44 xl:mt-32 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50">
        {plan ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-black dark:text-stone-50">
                Your Workout Plan
              </DialogTitle>
            </DialogHeader>

            <div className="overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="text-black dark:text-stone-50">
                  <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                  <p className="mb-6">{plan.summary}</p>

                  {Object.entries(plan.weeklyStructure).map(
                    ([weekKey, week]) => (
                      <div
                        key={weekKey}
                        className="mb-8 p-4 border-2 border-black dark:border-stone-50 rounded-2xl"
                      >
                        <h4 className="text-lg font-bold mb-4 capitalize">
                          {weekKey}
                        </h4>
                        {Object.entries(week).map(([dayKey, day]) => (
                          <div key={`${weekKey}-${dayKey}`} className="mb-6">
                            <h5 className="font-medium mb-3">{day.name}</h5>
                            <div className="space-y-2 pl-4">
                              {day.exercises.map((exercise) => (
                                <div key={exercise.id} className="text-sm">
                                  <span className="font-medium">
                                    {exercise.name}
                                  </span>
                                  <span className="ml-2 opacity-70">
                                    {exercise.sets} sets × {exercise.reps} reps
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-black dark:text-stone-50">
                Generate Your Workout Plan
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-black dark:text-stone-50 mb-2">
                    Fitness Goal
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Muscle gain, Weight loss, Strength"
                    className="w-full px-4 py-3 border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-black dark:text-stone-50 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experience}
                    onChange={(e) =>
                      setExperience(
                        e.target.value as
                          | "beginner"
                          | "intermediate"
                          | "advanced"
                      )
                    }
                    className="w-full px-4 py-3 border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-black dark:text-stone-50 mb-2">
                    Days Per Week
                  </label>
                  <input
                    type="number"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    min="1"
                    max="7"
                    className="w-full px-4 py-3 border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-black dark:text-stone-50 mb-2">
                    Available Equipment
                  </label>
                  <input
                    type="text"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    placeholder="e.g., Dumbbells, Gym access, Bodyweight only"
                    className="w-full px-4 py-3 border-2 border-black dark:border-stone-50 rounded-2xl bg-stone-50 dark:bg-black text-black dark:text-stone-50"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-center p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl">
                  {error}
                </div>
              )}

              <div className="flex justify-end pt-4">
                <AnimatedButton
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-8 py-3 text-lg font-bold bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 rounded-2xl disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Plan"}
                </AnimatedButton>
              </div>
            </div>
          </>
        )}
      </AnimatedDialogContent>
    </Dialog>
  );
}
