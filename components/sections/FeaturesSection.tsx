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
      title: "Forge Your Best Self",
      link: "#ai-plans",
      thumbnail: "/assets/forged-strength.png",
      description:
        "FitForge pushes you to break limits, build discipline, and transform your body and mind.",
      emoji: "🏋️‍♂️",
    },
    {
      title: "Fuel Your Body Right",
      link: "#meal-planner",
      thumbnail: "/assets/meal-planner.png",
      description:
        "Easy meal prep guidance and nutrition tracking to match your workout intensity and goals.",
      emoji: "🍎",
    },
    {
      title: "Always the Right Challenge",
      link: "#coach-accounts",
      thumbnail: "/assets/community.png",
      description:
        "Your workouts evolve with you—stay challenged, avoid plateaus, and keep progressing.",
      emoji: "💪",
    },
    {
      title: "Fitness in Minutes",
      link: "#free-trial",
      thumbnail: "/assets/anytime-anywhere.png",
      description:
        "Short, high-intensity sessions designed for busy lifestyles—no excuses, only results.",
      emoji: "🚀",
    },
    // Additional duplicates for third row
    {
      title: "Never Miss a Workout",
      link: "#ai-plans",
      thumbnail: "/assets/calender.png",
      description:
        "Automated calendar sync and push reminders to keep your training consistent and on track.",
      emoji: "🤖",
    },
    {
      title: "Anytime, Anywhere",
      link: "#progress-tracker",
      thumbnail: "/assets/anytime-anywhere.png",
      description:
        "Access your workouts on any device—mobile, tablet, or desktop—without missing a beat.",
      emoji: "📱",
    },
    {
      title: "Stronger Together",
      link: "#coach-accounts",
      thumbnail: "/assets/community.png",
      description:
        "Join a like-minded fitness community—share progress, exchange tips, and celebrate victories.",
      emoji: "🎓",
    },
  ];

  return (
    <section id="features" className="relative">
      <HeroParallax products={features} />
    </section>
  );
}
