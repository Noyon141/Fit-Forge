"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import GeneratePlanModal from "@/components/Generate-Plan-Modal";
import PlanContent from "@/components/Plan-Content";
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
        <PlanContent plan={plan} />
      ) : (
        <div className="text-slate-600">
          No plan yet. Create one using the Generate button above.
        </div>
      )}
    </div>
  );
}
