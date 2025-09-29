"use client";

import { AnimatedCard } from "@/components/animations/Animated-Card";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import { AiPlan } from "@/lib/validators/aiPlan";
import axios from "axios";
import {
  Activity,
  Calendar,
  Clock,
  Dumbbell,
  Heart,
  Loader2,
  Target,
  TrendingUp,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface WorkoutPlan {
  id: string;
  title: string;
  content: AiPlan;
  createdAt: string;
  expiresAt?: string;
}

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      redirect("/sign-in");
      return;
    }

    fetchPlans();
  }, [session, status]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/plans");
      setPlans(res.data.plans || []);
    } catch (err: any) {
      console.error("Failed to fetch plans:", err);
      setError("Failed to load workout plans");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-black dark:text-stone-50 mx-auto" />
              <div className="absolute inset-0 h-12 w-12 border-2 border-black/20 dark:border-stone-50/20 rounded-full mx-auto animate-pulse"></div>
            </div>
            <p className="mt-4 text-lg text-black dark:text-stone-50 font-medium">
              Loading your fitness journey...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <AnimatedFormContainer>
        <AnimatedFormItem>
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-black dark:bg-stone-50 rounded-full mb-4 md:mb-6">
              <Trophy className="h-8 w-8 md:h-10 md:w-10 text-stone-50 dark:text-black" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-stone-50 mb-4 md:mb-6 tracking-tight">
              Your Fitness Arsenal
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-black dark:text-stone-50 max-w-3xl mx-auto leading-relaxed px-2">
              Every great transformation begins with a plan. Here's your
              collection of
              <span className="font-bold">
                {" "}
                personalized workout blueprints
              </span>{" "}
              designed to push your limits.
            </p>
          </div>
        </AnimatedFormItem>

        {error && (
          <AnimatedFormItem>
            <AnimatedCard className="border-2 border-red-500 bg-red-50 dark:bg-red-950/20 p-8 mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                      Something went wrong
                    </h3>
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </AnimatedFormItem>
        )}

        {plans.length === 0 && !loading ? (
          <AnimatedFormItem>
            <AnimatedCard className="border-2 border-black dark:border-stone-50 p-6 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-stone-100 dark:bg-stone-800 rounded-full mb-6 md:mb-8">
                  <Dumbbell className="h-10 w-10 md:h-12 md:w-12 text-black dark:text-stone-50" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-stone-50 mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-base md:text-lg text-black dark:text-stone-50 mb-6 md:mb-8 leading-relaxed">
                  Your fitness transformation awaits! Generate your first
                  personalized workout plan and take the first step towards your
                  goals.
                </p>
                <a
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 bg-black dark:bg-stone-50 text-stone-50 dark:text-black px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-300 transform hover:scale-105 font-medium text-base md:text-lg"
                >
                  <Target className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Create Your First Plan</span>
                </a>
              </div>
            </AnimatedCard>
          </AnimatedFormItem>
        ) : (
          <div className="space-y-8">
            {plans.map((plan, index) => (
              <AnimatedFormItem key={plan.id}>
                <AnimatedCard className="border-2 border-black dark:border-stone-50 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Header Section */}
                  <div className="bg-stone-50 dark:bg-stone-900 p-4 md:p-8 border-b-2 border-black dark:border-stone-50">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-black dark:bg-stone-50 rounded-full flex items-center justify-center">
                            <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-stone-50 dark:text-black" />
                          </div>
                          <div>
                            <span className="text-xs md:text-sm font-medium text-black/60 dark:text-stone-50/60 uppercase tracking-wide">
                              Workout Plan #{plans.length - index}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-stone-50 mb-2 md:mb-3">
                          {plan.content.title}
                        </h3>
                        <p className="text-base md:text-lg text-black dark:text-stone-50 leading-relaxed">
                          {plan.content.summary}
                        </p>
                      </div>
                      <div className="md:text-right md:ml-6">
                        <div className="flex flex-col space-y-1 md:space-y-2">
                          <div className="flex items-center space-x-2 text-xs md:text-sm text-black/60 dark:text-stone-50/60">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                            <span>Created {formatDate(plan.createdAt)}</span>
                          </div>
                          {plan.expiresAt && (
                            <div className="flex items-center space-x-2 text-xs md:text-sm text-black/60 dark:text-stone-50/60">
                              <Clock className="h-3 w-3 md:h-4 md:w-4" />
                              <span>Expires {formatDate(plan.expiresAt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 md:p-8">
                    {/* Weekly Structure */}
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center space-x-2 mb-4 md:mb-6">
                        <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-black dark:text-stone-50" />
                        <h4 className="text-lg md:text-xl font-bold text-black dark:text-stone-50">
                          4-Week Training Schedule
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                        {Object.entries(plan.content.weeklyStructure).map(
                          ([weekKey, week]) => (
                            <div
                              key={weekKey}
                              className="border-2 border-black dark:border-stone-50 rounded-xl p-6 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                            >
                              <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-black dark:bg-stone-50 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-stone-50 dark:text-black">
                                    {weekKey.replace("week", "")}
                                  </span>
                                </div>
                                <h5 className="font-bold text-black dark:text-stone-50 capitalize">
                                  {weekKey.replace("week", "Week ")}
                                </h5>
                              </div>
                              <div className="space-y-3">
                                {Object.entries(week).map(([dayKey, day]) => (
                                  <div
                                    key={dayKey}
                                    className="bg-white dark:bg-stone-950 rounded-lg p-3 border border-black/10 dark:border-stone-50/10"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-black dark:text-stone-50 text-sm capitalize">
                                        {dayKey.replace("day", "Day ")}
                                      </span>
                                      <span className="text-xs bg-black dark:bg-stone-50 text-stone-50 dark:text-black px-2 py-1 rounded-full">
                                        {day.exercises.length} exercises
                                      </span>
                                    </div>
                                    <p className="text-sm text-black/70 dark:text-stone-50/70 mt-1 truncate">
                                      {day.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Nutrition Info */}
                    {plan.content.nutrition && (
                      <div className="mb-6 md:mb-8">
                        <div className="flex items-center space-x-2 mb-3 md:mb-4">
                          <Heart className="h-4 w-4 md:h-5 md:w-5 text-black dark:text-stone-50" />
                          <h4 className="text-lg md:text-xl font-bold text-black dark:text-stone-50">
                            Nutrition Guidelines
                          </h4>
                        </div>
                        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl p-4 md:p-6 border-2 border-black dark:border-stone-50">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                            {plan.content.nutrition.calories && (
                              <div className="text-center p-3 md:p-4 bg-white dark:bg-stone-950 rounded-lg border border-black/10 dark:border-stone-50/10">
                                <div className="text-xl md:text-2xl font-bold text-black dark:text-stone-50 mb-1">
                                  {plan.content.nutrition.calories}
                                </div>
                                <div className="text-xs md:text-sm text-black/60 dark:text-stone-50/60 uppercase tracking-wide">
                                  Calories
                                </div>
                              </div>
                            )}
                            {plan.content.nutrition.protein_g && (
                              <div className="text-center p-4 bg-white dark:bg-stone-950 rounded-lg border border-black/10 dark:border-stone-50/10">
                                <div className="text-2xl font-bold text-black dark:text-stone-50 mb-1">
                                  {plan.content.nutrition.protein_g}g
                                </div>
                                <div className="text-sm text-black/60 dark:text-stone-50/60 uppercase tracking-wide">
                                  Protein
                                </div>
                              </div>
                            )}
                            {plan.content.nutrition.carbs_g && (
                              <div className="text-center p-4 bg-white dark:bg-stone-950 rounded-lg border border-black/10 dark:border-stone-50/10">
                                <div className="text-2xl font-bold text-black dark:text-stone-50 mb-1">
                                  {plan.content.nutrition.carbs_g}g
                                </div>
                                <div className="text-sm text-black/60 dark:text-stone-50/60 uppercase tracking-wide">
                                  Carbs
                                </div>
                              </div>
                            )}
                            {plan.content.nutrition.fats_g && (
                              <div className="text-center p-4 bg-white dark:bg-stone-950 rounded-lg border border-black/10 dark:border-stone-50/10">
                                <div className="text-2xl font-bold text-black dark:text-stone-50 mb-1">
                                  {plan.content.nutrition.fats_g}g
                                </div>
                                <div className="text-sm text-black/60 dark:text-stone-50/60 uppercase tracking-wide">
                                  Fats
                                </div>
                              </div>
                            )}
                          </div>
                          {plan.content.nutrition.notes && (
                            <div className="mt-6 p-4 bg-white dark:bg-stone-950 rounded-lg border border-black/10 dark:border-stone-50/10">
                              <p className="text-black dark:text-stone-50 leading-relaxed">
                                <span className="font-medium">
                                  Nutritionist Note:
                                </span>{" "}
                                {plan.content.nutrition.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Coach Notes */}
                    {plan.content.coachNotes && (
                      <div className="mb-6 md:mb-8">
                        <div className="flex items-center space-x-2 mb-3 md:mb-4">
                          <User className="h-4 w-4 md:h-5 md:w-5 text-black dark:text-stone-50" />
                          <h4 className="text-lg md:text-xl font-bold text-black dark:text-stone-50">
                            Coach's Corner
                          </h4>
                        </div>
                        <div className="bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 rounded-xl p-4 md:p-6 border-l-4 md:border-l-8 border-black dark:border-stone-50">
                          <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-black dark:bg-stone-50 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                              <User className="h-5 w-5 md:h-6 md:w-6 text-stone-50 dark:text-black" />
                            </div>
                            <div className="text-center md:text-left">
                              <p className="text-base md:text-lg text-black dark:text-stone-50 leading-relaxed italic">
                                "{plan.content.coachNotes}"
                              </p>
                              <p className="text-xs md:text-sm text-black/60 dark:text-stone-50/60 mt-2">
                                — Your Personal Trainer
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Progress Metrics */}
                    {plan.content.progressMetrics &&
                      plan.content.progressMetrics.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-3 md:mb-4">
                            <Activity className="h-4 w-4 md:h-5 md:w-5 text-black dark:text-stone-50" />
                            <h4 className="text-lg md:text-xl font-bold text-black dark:text-stone-50">
                              Track Your Progress
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2 md:gap-3">
                            {plan.content.progressMetrics.map((metric, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 bg-black dark:bg-stone-50 text-stone-50 dark:text-black text-xs md:text-sm font-medium rounded-full hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                              >
                                <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{metric}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </AnimatedCard>
              </AnimatedFormItem>
            ))}
          </div>
        )}
      </AnimatedFormContainer>
    </div>
  );
}
