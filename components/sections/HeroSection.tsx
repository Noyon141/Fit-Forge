"use client";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Content with Glassmorphism */}
          <AnimatedFormContainer className="max-w-4xl">
            <AnimatedFormItem>
              <div className="relative">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-black via-zinc-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight pb-2">
                  FitForge
                </h1>
              </div>
            </AnimatedFormItem>

            <AnimatedFormItem>
              <div className="mt-6 p-6 rounded-2xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
                <p className="text-2xl md:text-3xl text-black dark:text-stone-50 font-medium">
                  Personalized 4-Week Workout Plans
                </p>
              </div>
            </AnimatedFormItem>

            <AnimatedFormItem>
              <div className="mt-8 p-6 rounded-2xl bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5">
                <p className="text-xl text-black dark:text-stone-50 max-w-2xl mx-auto leading-relaxed">
                  Transform your fitness journey with AI-powered personalized
                  workout plans and comprehensive progress tracking.
                </p>
              </div>
            </AnimatedFormItem>

            <AnimatedFormItem>
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                <AnimatedButton
                  variant="default"
                  size="lg"
                  className="px-10 py-5 text-xl bg-black/90 dark:bg-white/90 text-white dark:text-black hover:bg-black dark:hover:bg-white border-0 shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="/sign-up">Get Started — $4.99</Link>
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="px-10 py-5 text-xl border-2 border-black/20 dark:border-white/30 bg-white/10 dark:bg-black/20 text-black dark:text-stone-50 hover:bg-black/10 hover:border-black/40 dark:hover:bg-white/10 dark:hover:border-white/50 transition-all duration-300 hover:scale-105"
                >
                  <Link href="#features">Learn More</Link>
                </AnimatedButton>
              </div>
            </AnimatedFormItem>
          </AnimatedFormContainer>
        </div>
      </div>
    </section>
  );
}
