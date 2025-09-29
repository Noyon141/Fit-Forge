"use client";

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
    <div id="plan-print" className="bg-black p-6 rounded shadow">
      {/* Render plan (use AiPlan structure) */}
      <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
      <p className="text-sm text-slate-600 mb-4">{plan.summary}</p>

      {Object.entries(plan.weeklyStructure).map(([wk, days]) => (
        <div key={wk} className="mb-4">
          <h3 className="font-bold">{wk.toUpperCase()}</h3>
          {Object.entries(days).map(([dayKey, day]) => (
            <div key={dayKey} className="border p-3 rounded my-2 bg-black">
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
  );
}
