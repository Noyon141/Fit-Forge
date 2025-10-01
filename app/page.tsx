"use client";

import { AnimatedButton } from "@/components/animations/Animated-Button";
import { AnimatedCard } from "@/components/animations/Animated-Card";
import { BackgroundCharacterScene } from "@/components/animations/Animated-Character-Scene";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import { SmoothScrollProvider } from "@/components/animations/Smooth-Scroll";
import { useScrollProgress } from "@/hooks/useScroll";
import Link from "next/link";

function HomeContent() {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Background 3D Character */}
      <BackgroundCharacterScene scrollProgress={scrollProgress} />

      <main className="relative min-h-screen bg-gradient-to-br from-white/20 via-transparent to-gray-50/30 dark:from-black/50 dark:via-transparent dark:to-gray-900/30  z-10">
        {/* Hero Section */}
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
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight">
                      FitForge
                    </h1>
                    <div className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl font-bold text-black/5 dark:text-white/5 leading-tight">
                      FitForge
                    </div>
                  </div>
                </AnimatedFormItem>

                <AnimatedFormItem>
                  <div className="mt-6 p-6 rounded-2xl bg-white/10 dark:bg-black/20  border border-white/20 dark:border-white/10">
                    <p className="text-2xl md:text-3xl text-black dark:text-stone-50 font-medium">
                      Personalized 4-Week Workout Plans
                    </p>
                  </div>
                </AnimatedFormItem>

                <AnimatedFormItem>
                  <div className="mt-8 p-6 rounded-2xl bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5">
                    <p className="text-xl text-black dark:text-stone-50 max-w-2xl mx-auto leading-relaxed">
                      Transform your fitness journey with AI-powered
                      personalized workout plans and comprehensive progress
                      tracking.
                    </p>
                  </div>
                </AnimatedFormItem>

                <AnimatedFormItem>
                  <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                    <AnimatedButton
                      variant="default"
                      size="lg"
                      className="px-10 py-5 text-xl bg-black/90 dark:bg-white/90 text-white dark:text-black hover:bg-black dark:hover:bg-white border-0  shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/onboard">Get Started — $4.99</Link>
                    </AnimatedButton>
                    <AnimatedButton
                      variant="outline"
                      size="lg"
                      className="px-10 py-5 text-xl border-2 border-black/20 dark:border-white/30 bg-white/10 dark:bg-black/20 text-black dark:text-stone-50 hover:bg-black/10 hover:border-black/40 dark:hover:bg-white/10 dark:hover:border-white/50  transition-all duration-300 hover:scale-105"
                    >
                      <Link href="#features">Learn More</Link>
                    </AnimatedButton>
                  </div>
                </AnimatedFormItem>
              </AnimatedFormContainer>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
              <AnimatedCard className=" group border border-white/20 dark:border-white/10 relative overflow-hidden bg-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 dark:from-blue-400/20 dark:to-purple-500/20" />
                </div>

                <div className="relative z-10 p-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center text-3xl text-white dark:text-black mb-8 shadow-lg backdrop-blur-sm">
                    🎯
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    AI-Generated Workout Plans
                  </h3>
                  <p className="text-xl text-black/80 dark:text-stone-50/90 leading-relaxed">
                    Deep, personalized 4-week workout plans that are structured,
                    actionable, and tailored specifically to your fitness level
                    and goals.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard className="group border border-white/20 dark:border-white/10 relative overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 dark:from-green-400/20 dark:to-emerald-500/20" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMjBMMTYgMjhMMzIgMTIiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+Cg==')] opacity-20" />
                </div>

                <div className="relative z-10 p-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center text-3xl text-white dark:text-black mb-8 shadow-lg backdrop-blur-sm">
                    📊
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Progress Tracker
                  </h3>
                  <p className="text-xl text-black/80 dark:text-stone-50/90 leading-relaxed">
                    Mark completed workouts, track your progress, and visualize
                    your fitness journey with detailed weekly progress reports.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard className="group border border-white/20 dark:border-white/10 relative overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-orange-500/30 to-red-600/30 dark:from-orange-400/20 dark:to-red-500/20" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMTAgMzBjMC01LjUgNC41LTEwIDEwLTEwczEwIDQuNSAxMCAxMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+Cg==')] opacity-20" />
                </div>

                <div className="relative z-10 p-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center text-3xl text-white dark:text-black mb-8 shadow-lg backdrop-blur-sm">
                    👨‍💼
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    Coach Accounts
                  </h3>
                  <p className="text-xl text-black/80 dark:text-stone-50/90 leading-relaxed">
                    Professional coaching features coming soon, plus
                    downloadable PDF versions of your personalized workout
                    plans.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard className="group border border-white/20 dark:border-white/10 relative overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-500/30 to-amber-600/30 dark:from-yellow-400/20 dark:to-amber-500/20" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSIyMCwyIDI2LDE0IDM4LDE0IDI5LDIyIDMyLDM2IDIwLDI4IDgsMzYgMTEsMjIgMiwxNCA0LDE0IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-20" />
                </div>

                <div className="relative z-10 p-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center text-3xl text-white dark:text-black mb-8 shadow-lg backdrop-blur-sm">
                    ⚡
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                    7-Day Free Trial
                  </h3>
                  <p className="text-xl text-black/80 dark:text-stone-50/90 leading-relaxed">
                    Start your fitness transformation risk-free with our 7-day
                    trial, powered by secure Stripe payments.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black dark:bg-stone-50">
          <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <AnimatedFormContainer>
              <AnimatedFormItem>
                <h2 className="text-5xl md:text-6xl font-bold text-stone-50 dark:text-black mb-8">
                  Ready to Transform Your Fitness?
                </h2>
              </AnimatedFormItem>
              <AnimatedFormItem>
                <p className="text-2xl text-stone-50 dark:text-black mb-12">
                  Join thousands who have already started their journey with
                  FitForge
                </p>
              </AnimatedFormItem>
              <AnimatedFormItem>
                <AnimatedButton
                  variant="default"
                  size="lg"
                  className="px-12 py-6 text-xl bg-stone-50 dark:bg-black text-black dark:text-stone-50 hover:bg-stone-100 dark:hover:bg-gray-800 border-0"
                >
                  <Link href="/onboard">Start Your Free Trial</Link>
                </AnimatedButton>
              </AnimatedFormItem>
            </AnimatedFormContainer>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-stone-50 dark:bg-black border-t-2 border-black dark:border-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-black dark:text-stone-50">
              <p className="text-xl mb-4">
                <strong>FitForge</strong> — Transform your fitness journey with
                AI-powered personalization
              </p>
              <p className="text-lg">
                Not medical advice. Consult a healthcare professional if you
                have health concerns.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

const Home = () => {
  return (
    <SmoothScrollProvider>
      <HomeContent />
    </SmoothScrollProvider>
  );
};

export default Home;
