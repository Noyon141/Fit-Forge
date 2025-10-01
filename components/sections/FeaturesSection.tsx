"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";

export function FeaturesSection() {
  const features = [
    {
      title: "AI-Generated Workout Plans",
      link: "#ai-plans",
      thumbnail: "/assets/workout-plan.png",
      description:
        "Deep, personalized 4-week workout plans that are structured, actionable, and tailored specifically to your fitness level and goals.",
      emoji: "🎯",
    },
    {
      title: "Progress Tracker",
      link: "#progress-tracker",
      thumbnail: "/assets/progress-tracker.png",
      description:
        "Mark completed workouts, track your progress, and visualize your fitness journey with detailed weekly progress reports.",
      emoji: "📊",
    },
    {
      title: "Coach Accounts",
      link: "#coach-accounts",
      thumbnail: "/assets/coach-account.png",
      description:
        "Professional coaching features coming soon, plus downloadable PDF versions of your personalized workout plans.",
      emoji: "👨‍💼",
    },
    {
      title: "7-Day Free Trial",
      link: "#free-trial",
      thumbnail: "/assets/free-trial.png",
      description:
        "Start your fitness transformation risk-free with our 7-day trial, powered by secure Stripe payments.",
      emoji: "⚡",
    },
    // Duplicate for more cards in parallax effect
    {
      title: "Personalized Workouts",
      link: "#ai-plans",
      thumbnail: "/assets/workout-plan.png",
      description:
        "Advanced AI algorithms create custom fitness routines based on your preferences, schedule, and fitness history.",
      emoji: "🏋️‍♂️",
    },
    {
      title: "Track Your Progress",
      link: "#progress-tracker",
      thumbnail: "/assets/progress-tracker.png",
      description:
        "Comprehensive analytics and insights to monitor your fitness achievements and milestone celebrations.",
      emoji: "📈",
    },
    {
      title: "Professional Coaching",
      link: "#coach-accounts",
      thumbnail: "/assets/coach-account.png",
      description:
        "Connect with certified fitness professionals and access expert guidance throughout your fitness journey.",
      emoji: "💪",
    },
    {
      title: "Risk-Free Trial",
      link: "#free-trial",
      thumbnail: "/assets/free-trial.png",
      description:
        "Experience the full power of FitForge with our commitment-free trial period and easy cancellation.",
      emoji: "🚀",
    },
    // Additional duplicates for third row
    {
      title: "AI Fitness Plans",
      link: "#ai-plans",
      thumbnail: "/assets/workout-plan.png",
      description:
        "Revolutionary machine learning technology that adapts your workout plans based on real-time performance data.",
      emoji: "🤖",
    },
    {
      title: "Fitness Analytics",
      link: "#progress-tracker",
      thumbnail: "/assets/progress-tracker.png",
      description:
        "Deep dive into your fitness metrics with advanced analytics, trend analysis, and predictive insights.",
      emoji: "📱",
    },
    {
      title: "Expert Guidance",
      link: "#coach-accounts",
      thumbnail: "/assets/coach-account.png",
      description:
        "Access to premium coaching features, form correction, and personalized nutrition recommendations.",
      emoji: "🎓",
    },
    {
      title: "Start Today",
      link: "#free-trial",
      thumbnail: "/assets/free-trial.png",
      description:
        "Begin your transformation immediately with instant access to all features and zero setup required.",
      emoji: "✨",
    },
    // Extra cards for better parallax effect
    {
      title: "Smart Training",
      link: "#ai-plans",
      thumbnail: "/assets/workout-plan.png",
      description:
        "Intelligent workout adaptation that learns from your performance and automatically adjusts difficulty levels.",
      emoji: "🧠",
    },
    {
      title: "Detailed Insights",
      link: "#progress-tracker",
      thumbnail: "/assets/progress-tracker.png",
      description:
        "Get comprehensive reports on your fitness journey with detailed breakdowns and achievement tracking.",
      emoji: "🔍",
    },
    {
      title: "Premium Features",
      link: "#coach-accounts",
      thumbnail: "/assets/coach-account.png",
      description:
        "Unlock advanced features including meal planning, recovery tracking, and exclusive workout content.",
      emoji: "⭐",
    },
  ];

  return (
    <section id="features" className="relative">
      <HeroParallax products={features} />
    </section>
  );
}
