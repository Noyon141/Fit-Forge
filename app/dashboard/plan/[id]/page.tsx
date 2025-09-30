import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Activity,
  Calendar,
  ChefHat,
  Dumbbell,
  FileText,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import AnimatedBackButton from "@/components/animations/AnimatedBackButton";
import {
  DashboardCard,
  DashboardContent,
  DashboardGrid,
  DashboardHeader,
} from "@/components/animations/Dashboard-Animation";
import type { AiPlan } from "@/types/ai";

interface PlanDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PlanDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { title: "Workout Plan | FitForge" };
    }

    const plan = await prisma.workoutPlan.findUnique({
      where: { id: id },
    });

    if (!plan || plan.userId !== session.user.id) {
      return { title: "Plan Not Found | FitForge" };
    }

    const planContent: AiPlan =
      typeof plan.content === "string"
        ? JSON.parse(plan.content)
        : (plan.content as unknown as AiPlan);

    return {
      title: `${planContent.title} | FitForge`,
      description: planContent.summary,
    };
  } catch (error) {
    return { title: "Workout Plan | FitForge" };
  }
}

async function getPlanData(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const plan = await prisma.workoutPlan.findUnique({
    where: { id: id },
  });

  if (!plan) {
    notFound();
  }

  if (plan.userId !== session.user.id) {
    notFound();
  }

  return {
    plan,
    user: session.user,
  };
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { id } = await params;
  const { plan, user } = await getPlanData(id);

  const planContent: AiPlan =
    typeof plan.content === "string"
      ? JSON.parse(plan.content)
      : (plan.content as unknown as AiPlan);

  const weekKeys = Object.keys(planContent.weeklyStructure || {});
  const totalWeeks = weekKeys.length;
  const totalDays = weekKeys.reduce((acc, weekKey) => {
    return acc + Object.keys(planContent.weeklyStructure[weekKey] || {}).length;
  }, 0);

  return (
    <DashboardContent>
      <DashboardHeader>
        <div className="space-y-6">
          {/* Back Button */}
          <AnimatedBackButton href="/dashboard" label="Back to Dashboard" />

          {/* Plan Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-4xl lg:text-5xl font-bold text-black dark:text-stone-50 leading-tight">
                    {planContent.title}
                  </h1>
                  <p className="text-lg text-black dark:text-stone-50 opacity-60 mt-1">
                    Created on{" "}
                    {new Date(plan.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p className="text-xl text-black dark:text-stone-50 opacity-80 leading-relaxed max-w-3xl">
                {planContent.summary}
              </p>
            </div>
          </div>
        </div>
      </DashboardHeader>

      <div className="space-y-8">
        {/* Quick Stats Grid */}
        <DashboardGrid className="grid-cols-2 md:grid-cols-4">
          <DashboardCard>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black dark:text-stone-50">
                  {totalWeeks}
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
                  {totalDays}
                </p>
                <p className="text-black dark:text-stone-50 opacity-70">
                  Workouts
                </p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-stone-50 dark:text-black">
                <Activity className="w-6 h-6" />
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
        </DashboardGrid>

        {/* Workout Plan Structure */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-black dark:text-stone-50">
              Workout Schedule
            </h2>
          </div>

          {weekKeys.map((weekKey, weekIndex) => {
            const week = planContent.weeklyStructure[weekKey];
            const dayKeys = Object.keys(week || {});

            return (
              <div key={weekKey} className="space-y-4">
                <h3 className="text-2xl font-bold text-black dark:text-stone-50 mb-4 flex items-center gap-3">
                  <div className="w-6 h-6 bg-black dark:bg-stone-50 rounded-lg flex items-center justify-center text-stone-50 dark:text-black text-sm font-bold">
                    {weekIndex + 1}
                  </div>
                  Week {weekIndex + 1}
                </h3>

                <DashboardGrid className="grid-cols-1 lg:grid-cols-2">
                  {dayKeys.map((dayKey) => {
                    const day = week[dayKey];

                    return (
                      <DashboardCard key={dayKey} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-black dark:text-stone-50">
                              {day.name}
                            </h4>
                            <p className="text-sm text-black dark:text-stone-50 opacity-60">
                              {day.exercises.length} exercises
                            </p>
                          </div>
                        </div>

                        {/* Warmup */}
                        {day.warmup && day.warmup.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-black dark:text-stone-50 opacity-80 uppercase tracking-wider">
                              Warmup
                            </h5>
                            <ul className="space-y-1">
                              {day.warmup.map((warmupItem, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-black dark:text-stone-50 opacity-70"
                                >
                                  • {warmupItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Exercises */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-semibold text-black dark:text-stone-50 opacity-80 uppercase tracking-wider">
                            Exercises
                          </h5>
                          <div className="space-y-3">
                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div
                                key={exercise.id}
                                className="bg-black/5 dark:bg-stone-50/5 rounded-xl p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-lg flex items-center justify-center text-stone-50 dark:text-black text-sm font-bold flex-shrink-0 mt-0.5">
                                    {exerciseIndex + 1}
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <h6 className="font-semibold text-black dark:text-stone-50">
                                      {exercise.name}
                                    </h6>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                      <div className="flex items-center gap-1">
                                        <Dumbbell className="w-4 h-4 text-black dark:text-stone-50 opacity-60" />
                                        <span className="text-black dark:text-stone-50 opacity-80">
                                          {exercise.sets} sets
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Target className="w-4 h-4 text-black dark:text-stone-50 opacity-60" />
                                        <span className="text-black dark:text-stone-50 opacity-80">
                                          {exercise.reps} reps
                                        </span>
                                      </div>
                                      {exercise.restSec && (
                                        <div className="flex items-center gap-1">
                                          <Timer className="w-4 h-4 text-black dark:text-stone-50 opacity-60" />
                                          <span className="text-black dark:text-stone-50 opacity-80">
                                            {exercise.restSec}s rest
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {exercise.notes && (
                                      <p className="text-sm text-black dark:text-stone-50 opacity-70 italic">
                                        {exercise.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Cooldown */}
                        {day.cooldown && day.cooldown.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-black dark:text-stone-50 opacity-80 uppercase tracking-wider">
                              Cooldown
                            </h5>
                            <ul className="space-y-1">
                              {day.cooldown.map((cooldownItem, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-black dark:text-stone-50 opacity-70"
                                >
                                  • {cooldownItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </DashboardCard>
                    );
                  })}
                </DashboardGrid>
              </div>
            );
          })}
        </div>

        {/* Nutrition Guidelines */}
        {planContent.nutrition && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                <ChefHat className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-black dark:text-stone-50">
                Nutrition Guidelines
              </h2>
            </div>

            <DashboardCard>
              <div className="space-y-6">
                {(planContent.nutrition.calories ||
                  planContent.nutrition.protein_g ||
                  planContent.nutrition.carbs_g ||
                  planContent.nutrition.fats_g) && (
                  <DashboardGrid className="grid-cols-2 md:grid-cols-4">
                    {planContent.nutrition.calories && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-black dark:text-stone-50">
                          {planContent.nutrition.calories}
                        </p>
                        <p className="text-black dark:text-stone-50 opacity-70">
                          Calories
                        </p>
                      </div>
                    )}
                    {planContent.nutrition.protein_g && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-black dark:text-stone-50">
                          {planContent.nutrition.protein_g}g
                        </p>
                        <p className="text-black dark:text-stone-50 opacity-70">
                          Protein
                        </p>
                      </div>
                    )}
                    {planContent.nutrition.carbs_g && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-black dark:text-stone-50">
                          {planContent.nutrition.carbs_g}g
                        </p>
                        <p className="text-black dark:text-stone-50 opacity-70">
                          Carbs
                        </p>
                      </div>
                    )}
                    {planContent.nutrition.fats_g && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-black dark:text-stone-50">
                          {planContent.nutrition.fats_g}g
                        </p>
                        <p className="text-black dark:text-stone-50 opacity-70">
                          Fats
                        </p>
                      </div>
                    )}
                  </DashboardGrid>
                )}

                {planContent.nutrition.notes && (
                  <div className="pt-4 border-t border-black/20 dark:border-stone-50/20">
                    <h5 className="text-lg font-semibold text-black dark:text-stone-50 mb-3">
                      Nutrition Notes
                    </h5>
                    <p className="text-black dark:text-stone-50 opacity-80 leading-relaxed">
                      {planContent.nutrition.notes}
                    </p>
                  </div>
                )}
              </div>
            </DashboardCard>
          </div>
        )}

        {/* Progress Metrics & Coach Notes */}
        {(planContent.progressMetrics?.length || planContent.coachNotes) && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-xl flex items-center justify-center text-stone-50 dark:text-black">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-black dark:text-stone-50">
                Additional Guidelines
              </h2>
            </div>

            <DashboardGrid className="grid-cols-1 lg:grid-cols-2">
              {planContent.progressMetrics?.length && (
                <DashboardCard>
                  <h5 className="text-xl font-semibold text-black dark:text-stone-50 mb-4">
                    Progress Metrics
                  </h5>
                  <ul className="space-y-2">
                    {planContent.progressMetrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-black dark:bg-stone-50 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-black dark:text-stone-50 opacity-80">
                          {metric}
                        </span>
                      </li>
                    ))}
                  </ul>
                </DashboardCard>
              )}

              {planContent.coachNotes && (
                <DashboardCard>
                  <h5 className="text-xl font-semibold text-black dark:text-stone-50 mb-4">
                    Coach Notes
                  </h5>
                  <p className="text-black dark:text-stone-50 opacity-80 leading-relaxed">
                    {planContent.coachNotes}
                  </p>
                </DashboardCard>
              )}
            </DashboardGrid>
          </div>
        )}
      </div>
    </DashboardContent>
  );
}
