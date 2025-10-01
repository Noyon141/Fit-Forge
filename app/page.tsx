import { AnimatedButton } from "@/components/animations/Animated-Button";
import { AnimatedCard } from "@/components/animations/Animated-Card";
import {
  AnimatedFormContainer,
  AnimatedFormItem,
} from "@/components/animations/Form-Animation";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-black pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <AnimatedFormContainer className="text-center lg:text-left">
              <AnimatedFormItem>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black dark:text-stone-50 leading-tight">
                  FitForge
                </h1>
              </AnimatedFormItem>

              <AnimatedFormItem>
                <p className="text-2xl md:text-3xl text-black dark:text-stone-50 font-medium mt-6">
                  Personalized 4-Week Workout Plans
                </p>
              </AnimatedFormItem>

              <AnimatedFormItem>
                <p className="mt-8 text-xl text-black dark:text-stone-50 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Transform your fitness journey with AI-powered personalized
                  workout plans and comprehensive progress tracking.
                </p>
              </AnimatedFormItem>

              <AnimatedFormItem>
                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <AnimatedButton
                    variant="default"
                    size="lg"
                    className="px-10 py-5 text-xl bg-black dark:bg-stone-50 text-stone-50 dark:text-black hover:bg-gray-800 dark:hover:bg-stone-100 border-0"
                  >
                    <Link href="/onboard">Get Started — $4.99</Link>
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    size="lg"
                    className="px-10 py-5 text-xl border-2 border-black dark:border-stone-50 text-black dark:text-stone-50 hover:bg-black hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-black"
                  >
                    <Link href="#features">Learn More</Link>
                  </AnimatedButton>
                </div>
              </AnimatedFormItem>
            </AnimatedFormContainer>

            {/* Hero Image Side */}
            <div className="relative">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl bg-black dark:bg-stone-50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  <Image
                    src="/assets/hero-image.png"
                    alt="Hero Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              {/* Floating Stats */}
              <AnimatedCard className="hidden lg:block absolute -top-6 -left-6 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 shadow-xl">
                <div className="p-6">
                  <div className="text-3xl font-bold text-black dark:text-stone-50">
                    1000+
                  </div>
                  <div className="text-black dark:text-stone-50">
                    Active Users
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard className="hidden lg:block absolute -bottom-6 -right-6 bg-stone-50 dark:bg-black border-2 border-black dark:border-stone-50 shadow-xl">
                <div className="p-6">
                  <div className="text-3xl font-bold text-black dark:text-stone-50">
                    98%
                  </div>
                  <div className="text-black dark:text-stone-50">
                    Success Rate
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedFormContainer className="text-center mb-20">
            <AnimatedFormItem>
              <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-stone-50 mb-6">
                What You Get
              </h2>
            </AnimatedFormItem>
            <AnimatedFormItem>
              <p className="text-2xl text-black dark:text-stone-50 max-w-4xl mx-auto">
                Everything you need to transform your fitness journey with
                personalized, AI-powered workout plans.
              </p>
            </AnimatedFormItem>
          </AnimatedFormContainer>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard className="group border-2 border-black dark:border-stone-50 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                <div className="w-full h-full " />
                <div className="absolute inset-0">
                  <Image
                    src="/assets/workout-plan.png"
                    alt="Description"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-stone-50 dark:text-black mb-8">
                  🎯
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6">
                  AI-Generated Workout Plans
                </h3>
                <p className="text-xl text-black dark:text-stone-50 leading-relaxed">
                  Deep, personalized 4-week workout plans that are structured,
                  actionable, and tailored specifically to your fitness level
                  and goals.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="group border-2 border-black dark:border-stone-50 relative overflow-hidden">
              {/* Background Image */}
             <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                <div className="w-full h-full " />
                <div className="absolute inset-0">
                  <Image
                    src="/assets/progress-tracker.png"
                    alt="Description"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-stone-50 dark:text-black mb-8">
                  📊
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6">
                  Progress Tracker
                </h3>
                <p className="text-xl text-black dark:text-stone-50 leading-relaxed">
                  Mark completed workouts, track your progress, and visualize
                  your fitness journey with detailed weekly progress reports.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="group border-2 border-black dark:border-stone-50 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                <div className="w-full h-full " />
                <div className="absolute inset-0">
                  <Image
                    src="/assets/coach-account.png"
                    alt="Description"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-stone-50 dark:text-black mb-8">
                  👨‍💼
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6">
                  Coach Accounts
                </h3>
                <p className="text-xl text-black dark:text-stone-50 leading-relaxed">
                  Professional coaching features coming soon, plus downloadable
                  PDF versions of your personalized workout plans.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="group border-2 border-black dark:border-stone-50 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                <div className="w-full h-full " />
                <div className="absolute inset-0">
                  <Image
                    src="/assets/free-trial.png"
                    alt="Description"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-black dark:bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-stone-50 dark:text-black mb-8">
                  ⚡
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-stone-50 mb-6">
                  7-Day Free Trial
                </h3>
                <p className="text-xl text-black dark:text-stone-50 leading-relaxed">
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
              Not medical advice. Consult a healthcare professional if you have
              health concerns.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
