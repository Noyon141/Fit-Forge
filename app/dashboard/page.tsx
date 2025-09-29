"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import GeneratePlanModal from "@/components/Generate-Plan-Modal";
import { usePlanStore } from "@/utils/store/usePlanStore";

export default function DashboardPage() {
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const setPlan = usePlanStore((s) => s.setPlan);
  const plan = usePlanStore((s) => s.plan);

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((res) => {
        setProfileExists(!!res.data.profile);
      })
      .catch(() => setProfileExists(false));
  }, []);

  async function fetchLatestPlan() {
    // optional: fetch latest saved plan listing
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          {profileExists ? (
            <GeneratePlanModal onCreated={(p) => setPlan(p)} />
          ) : (
            <Link href="/profile" className="px-4 py-2 bg-yellow-500 rounded">
              Create Profile
            </Link>
          )}
        </div>
      </div>

      {plan ? (
        <div id="plan-print" className="bg-black p-6 rounded shadow">
          {/* Render plan (use AiPlan structure) */}
          <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
          <p className="text-sm text-slate-600 mb-4">{plan.summary}</p>

          {Object.entries(plan.weeklyStructure).map(([wk, days]) => (
            <div key={wk} className="mb-4">
              <h3 className="font-bold">{wk.toUpperCase()}</h3>
              {Object.entries(days).map(([dayKey, day]) => (
                <div
                  key={dayKey}
                  className="border p-3 rounded my-2 bg-black"
                >
                  <div className="font-semibold">{day.name}</div>
                  {day.warmup && (
                    <div className="text-sm text-muted-foreground">
                      Warmup: {day.warmup.join(", ")}
                    </div>
                  )}
                  <ul className="list-disc ml-6 mt-2">
                    {day.exercises.map((ex: any) => (
                      <li key={ex.id}>
                        {ex.name} — {ex.sets} x {ex.reps}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-4 flex gap-2">
            <button
              onClick={() =>
                import("@/lib/pdf/exportClient").then((m) =>
                  m.exportElementToPdf("plan-print")
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Download PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="text-slate-600">
          No plan yet. Create one using the Generate button above.
        </div>
      )}
    </div>
  );
}
