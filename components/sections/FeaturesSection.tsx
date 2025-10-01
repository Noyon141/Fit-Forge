"use client";

import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/5 via-transparent to-white/10 dark:from-black/10 dark:via-transparent dark:to-black/20 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedFormContainer className="text-center mb-20">
          <AnimatedFormItem>
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-6">
                What You Get
              </h2>
              <div className="absolute inset-0 text-5xl md:text-6xl font-bold text-black/3 dark:text-white/3 mb-6">
                What You Get
              </div>
            </div>
          </AnimatedFormItem>
          <AnimatedFormItem>
            <div className="p-6 rounded-2xl bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5">
              <p className="text-2xl text-black dark:text-stone-50 max-w-4xl mx-auto">
                Everything you need to transform your fitness journey with
                personalized, AI-powered workout plans.
              </p>
            </div>
          </AnimatedFormItem>
        </AnimatedFormContainer>

        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon="🎯"
            title="AI-Generated Workout Plans"
            description="Deep, personalized 4-week workout plans that are structured, actionable, and tailored specifically to your fitness level and goals."
            gradientFrom="from-blue-500/30"
            gradientTo="to-purple-600/30 dark:from-blue-400/20 dark:to-purple-500/20"
            hoverColor="group-hover:text-blue-600 dark:group-hover:text-blue-400"
          />

          <FeatureCard
            icon="📊"
            title="Progress Tracker"
            description="Mark completed workouts, track your progress, and visualize your fitness journey with detailed weekly progress reports."
            gradientFrom="from-green-500/30"
            gradientTo="to-emerald-600/30 dark:from-green-400/20 dark:to-emerald-500/20"
            hoverColor="group-hover:text-green-600 dark:group-hover:text-green-400"
            backgroundPattern="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMjBMMTYgMjhMMzIgMTIiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+Cg==')]"
          />

          <FeatureCard
            icon="👨‍💼"
            title="Coach Accounts"
            description="Professional coaching features coming soon, plus downloadable PDF versions of your personalized workout plans."
            gradientFrom="from-orange-500/30"
            gradientTo="to-red-600/30 dark:from-orange-400/20 dark:to-red-500/20"
            hoverColor="group-hover:text-orange-600 dark:group-hover:text-orange-400"
            backgroundPattern="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUgNC41LTEwIDEwLTEwczEwIDQuNSAxMCAxMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+Cg==')]"
          />

          <FeatureCard
            icon="⚡"
            title="7-Day Free Trial"
            description="Start your fitness transformation risk-free with our 7-day trial, powered by secure Stripe payments."
            gradientFrom="from-yellow-500/30"
            gradientTo="to-amber-600/30 dark:from-yellow-400/20 dark:to-amber-500/20"
            hoverColor="group-hover:text-yellow-600 dark:group-hover:text-yellow-400"
            backgroundPattern="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSIyMCwyIDI2LDE0IDM4LDE0IDI5LDIyIDMyLDM2IDIwLDI4IDgsMzYgMTEsMjIgMiwxNCA0LDE0IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')]"
          />
        </div>
      </div>
    </section>
  );
}
