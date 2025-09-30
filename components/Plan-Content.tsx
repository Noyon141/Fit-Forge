"use client";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import { DashboardCard } from "@/components/animations/Dashboard-Animation";
import { Download } from "lucide-react";

interface PlanContentProps {
  plan: {
    title: string;
    summary: string;
    weeklyStructure: {
      [key: string]: {
        [dayKey: string]: {
          name: string;
          warmup?: string[];
          exercises: {
            id: string;
            name: string;
            sets: number;
            reps: string;
          }[];
        };
      };
    };
  };
}

export default function PlanContent({ plan }: PlanContentProps) {
  return (
    <DashboardCard id="plan-print" className="space-y-6">
      {/* Plan Header */}
      <div className="pb-6 border-b-2 border-black dark:border-stone-50">
        <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-stone-50 mb-3">
          {plan.title}
        </h2>
        <p className="text-lg text-black dark:text-stone-50 opacity-80 leading-relaxed">
          {plan.summary}
        </p>
      </div>

      {/* Weekly Structure */}
      <div className="space-y-8">
        {Object.entries(plan.weeklyStructure).map(([wk, days]) => (
          <div key={wk} className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-stone-50 flex items-center gap-3">
              <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-lg flex items-center justify-center text-stone-50 dark:text-black text-sm font-bold">
                {wk.replace("week", "")}
              </div>
              {wk.toUpperCase()}
            </h3>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {Object.entries(days).map(([dayKey, day]) => (
                <div
                  key={dayKey}
                  className="bg-black dark:bg-stone-50 border-2 border-black dark:border-stone-50 rounded-xl p-5 space-y-4"
                >
                  <h4 className="text-xl font-bold text-stone-50 dark:text-black">
                    {day.name}
                  </h4>

                  {day.warmup && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-stone-50 dark:text-black opacity-80">
                        WARMUP:
                      </p>
                      <p className="text-stone-50 dark:text-black opacity-90">
                        {day.warmup.join(", ")}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-stone-50 dark:text-black opacity-80">
                      EXERCISES:
                    </p>
                    <ul className="space-y-2">
                      {day.exercises.map((ex: any) => (
                        <li
                          key={ex.id}
                          className="text-stone-50 dark:text-black flex justify-between items-center py-2 border-b border-stone-50/20 dark:border-black/20 last:border-b-0"
                        >
                          <span className="font-medium">{ex.name}</span>
                          <span className="text-sm opacity-80 font-semibold">
                            {ex.sets} × {ex.reps}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t-2 border-black dark:border-stone-50 flex flex-col sm:flex-row gap-4">
        <AnimatedButton
          onClick={() =>
            import("@/lib/pdf/exportClient").then((m) =>
              m.exportElementToPdf("plan-print")
            )
          }
          size="lg"
          className="px-8 py-4 text-lg bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 font-semibold"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF
        </AnimatedButton>
      </div>
    </DashboardCard>
  );
}
