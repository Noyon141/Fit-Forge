"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import {
  DashboardCard,
  DashboardContent,
  DashboardGrid,
  DashboardHeader,
} from "@/components/animations/Dashboard-Animation";
import GeneratePlanModal from "@/components/Generate-Plan-Modal";
import PlanContent from "@/components/Plan-Content";
import { usePlanStore } from "@/utils/store/usePlanStore";
import {
  Activity,
  Calendar,
  Clock,
  Dumbbell,
  Target,
  TrendingUp,
} from "lucide-react";

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
    <DashboardContent>
      <DashboardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-black dark:text-stone-50 mb-3">
              Dashboard
            </h1>
            <p className="text-xl text-black dark:text-stone-50 opacity-80">
              Track your fitness journey and progress
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {profileExists ? (
              <GeneratePlanModal onCreated={(p) => setPlan(p)} />
            ) : (
              <Link href="/profile">
                <AnimatedButton
                  size="lg"
                  className="px-8 py-4 text-lg bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 font-semibold"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Create Profile
                </AnimatedButton>
              </Link>
            )}
          </div>
        </div>
      </DashboardHeader>

      {plan ? (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <DashboardGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-stone-50">
                    4
                  </p>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Weeks
                  </p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-stone-50">
                    0
                  </p>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Completed
                  </p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-stone-50">
                    0%
                  </p>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Progress
                  </p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-stone-50">
                    0
                  </p>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Hours
                  </p>
                </div>
              </div>
            </DashboardCard>
          </DashboardGrid>

          {/* Current Plan Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-black dark:text-stone-50">
                Your Current Plan
              </h2>
            </div>
            <PlanContent plan={plan} />
          </div>
        </div>
      ) : (
        <DashboardCard className="text-center py-16">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 bg-black dark:bg-stone-50 rounded-3xl flex items-center justify-center text-stone-50 dark:text-black mx-auto">
              <Target className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-stone-50 mb-3">
                No Plan Yet
              </h3>
              <p className="text-lg text-black dark:text-stone-50 opacity-70 mb-6">
                {profileExists
                  ? "Create your first personalized workout plan to get started on your fitness journey."
                  : "Set up your profile first, then generate your personalized workout plan."}
              </p>
              {profileExists ? (
                <GeneratePlanModal onCreated={(p) => setPlan(p)} />
              ) : (
                <Link href="/profile">
                  <AnimatedButton
                    size="lg"
                    className="px-8 py-4 text-lg bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0 font-semibold"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Create Profile First
                  </AnimatedButton>
                </Link>
              )}
            </div>
          </div>
        </DashboardCard>
      )}
    </DashboardContent>
  );
}
