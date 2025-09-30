"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import {
  DashboardCard,
  DashboardContent,
  DashboardGrid,
  DashboardHeader,
} from "@/components/animations/Dashboard-Animation";
import GeneratePlanModal from "@/components/Generate-Plan-Modal";
import { Skeleton } from "@/components/ui/skeleton";

import { usePlanStore } from "@/utils/store/usePlanStore";
import { useWorkoutPlansStore } from "@/utils/store/useWorkoutPlansStore";
import {
  Activity,
  Calendar,
  Clock,
  Dumbbell,
  Target,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const setPlan = usePlanStore((s) => s.setPlan);
  const plan = usePlanStore((s) => s.plan);

  // Workout plans store
  const { plans, isLoading, error, hasLoaded, fetchPlans } =
    useWorkoutPlansStore();
  const latestPlan = plans.length > 0 ? plans[0] : null;

  useEffect(() => {
    // Fetch profile status
    axios
      .get("/api/profile")
      .then((res) => {
        setProfileExists(!!res.data.profile);
      })
      .catch(() => setProfileExists(false));

    // Fetch workout plans
    fetchPlans();
  }, [fetchPlans]);

  // Update the current plan in usePlanStore if we have a latest plan
  useEffect(() => {
    if (latestPlan && !plan) {
      setPlan(latestPlan.content);
    } else if (hasLoaded && plans.length === 0 && plan) {
      // Clear the plan if no plans exist after loading
      setPlan(null);
    }
  }, [latestPlan, plan, setPlan, hasLoaded, plans.length]);

  async function fetchLatestPlan() {
    try {
      await fetchPlans();
    } catch (error) {
      console.error("Failed to fetch latest plan:", error);
    }
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

      {isLoading && !hasLoaded ? (
        <div className="space-y-8">
          {/* Skeleton Stats Grid */}
          <DashboardGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <DashboardCard key={i}>
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </DashboardCard>
            ))}
          </DashboardGrid>

          {/* Skeleton Plan Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-xl" />
              <Skeleton className="h-9 w-48" />
            </div>

            <DashboardCard>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-2xl ml-4" />
                </div>
                <div className="pt-4 border-t border-black/20 dark:border-stone-50/20">
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      ) : plans.length > 0 || plan ? (
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
                    {plans.length}
                  </p>
                  <p className="text-black dark:text-stone-50 opacity-70">
                    Plans
                  </p>
                </div>
              </div>
            </DashboardCard>
          </DashboardGrid>

          {/* Current Plan Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-3xl font-bold text-black dark:text-stone-50">
                  {plans.length > 1
                    ? "Your Workout Plans"
                    : "Your Current Plan"}
                </h2>
              </div>

              {/* Additional Actions */}
              <div className="flex gap-3">
                <Link href="/profile">
                  <AnimatedButton
                    variant="outline"
                    className="px-6 py-3 text-base border-2 border-black dark:border-stone-50 text-black dark:text-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black font-semibold"
                  >
                    Update Profile
                  </AnimatedButton>
                </Link>
                <GeneratePlanModal
                  onCreated={(p) => {
                    setPlan(p);
                    fetchPlans(); // Refresh the plans list
                  }}
                />
              </div>
            </div>

            {/* Plans Display */}
            {isLoading && hasLoaded ? (
              <div className="text-center py-4">
                <div className="text-sm text-black dark:text-stone-50 opacity-60">
                  Refreshing plans...
                </div>
              </div>
            ) : error ? (
              <DashboardCard className="text-center py-16">
                <div className="text-lg text-red-600 dark:text-red-400">
                  Error: {error}
                </div>
              </DashboardCard>
            ) : plans.length > 1 ? (
              <DashboardGrid className="grid-cols-1 lg:grid-cols-2">
                {plans.map((workoutPlan) => (
                  <DashboardCard
                    key={workoutPlan.id}
                    className="cursor-pointer transition-all hover:shadow-xl"
                    onClick={() => {
                      setPlan(workoutPlan.content);
                      router.push(`/dashboard/plan/${workoutPlan.id}`);
                    }}
                  >
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-black dark:text-stone-50">
                        {workoutPlan.title}
                      </h3>
                      <p className="text-lg text-black dark:text-stone-50 opacity-80 line-clamp-3">
                        {workoutPlan.content.summary}
                      </p>
                      <div className="text-sm text-black dark:text-stone-50 opacity-60">
                        Created:{" "}
                        {new Date(workoutPlan.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </DashboardCard>
                ))}
              </DashboardGrid>
            ) : plan ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  const latestPlanId = plans.length > 0 ? plans[0].id : null;
                  if (latestPlanId) {
                    router.push(`/dashboard/plan/${latestPlanId}`);
                  }
                }}
              >
                <DashboardCard className="transition-all hover:shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-stone-50 mb-2 line-clamp-2">
                          {plan.title}
                        </h3>
                        <p className="text-lg text-black dark:text-stone-50 opacity-80 line-clamp-3 leading-relaxed">
                          {plan.summary}
                        </p>
                      </div>
                      <div className="ml-4 w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black flex-shrink-0">
                        <Target className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-black/20 dark:border-stone-50/20">
                      <p className="text-center text-black dark:text-stone-50 opacity-60 text-sm font-medium">
                        Click to view full plan →
                      </p>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            ) : null}
          </div>
        </div>
      ) : hasLoaded && plans.length === 0 && !plan ? (
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
      ) : null}
    </DashboardContent>
  );
}
