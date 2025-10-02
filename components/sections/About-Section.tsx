"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

export default function AboutSection() {
  const aboutData = [
    {
      id: 1,
      title: "Introduction - Who We Are",
      description:
        "FitForge is a revolutionary fitness platform designed to transform your workout experience. We believe that everyone deserves access to personalized, professional-grade fitness guidance. Our team of fitness experts and AI specialists work together to create the most advanced workout planning system available today.",
    },
    {
      id: 2,
      title: "Our Goal",
      description:
        "Our mission is to democratize fitness by making personalized workout plans accessible to everyone. We aim to eliminate the guesswork from fitness routines and provide you with scientifically-backed, AI-generated workout plans that adapt to your progress, goals, and lifestyle constraints.",
    },
    {
      id: 3,
      title: "Our Promise to Customers",
      description:
        "We promise to deliver workout plans that are not just generic templates, but deeply personalized programs that evolve with you. Every plan is crafted with precision, taking into account your fitness level, available equipment, time constraints, and specific goals to ensure maximum effectiveness and safety.",
    },
    {
      id: 4,
      title: "Best of Luck on Your Journey",
      description:
        "Your fitness journey is unique, and we're honored to be part of it. Whether you're just starting out or looking to break through plateaus, FitForge is here to support you every step of the way. Here's to achieving your strongest, healthiest self - the forge awaits!",
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-transparent to-white/10 dark:to-black/20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-6">
          About FitForge
        </h2>
        <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
          Discover the story behind the platform that's revolutionizing personal
          fitness
        </p>
      </div>

      {/* ScrollStack Container */}
      <div className="max-w-4xl mx-auto">
        <ScrollStack
          className="about-scroll-stack"
          itemDistance={100}
          itemScale={0.03}
          itemStackDistance={35}
          stackPosition="30%"
          scaleEndPosition="20%"
          baseScale={0.92}
          scaleDuration={0.8}
          rotationAmount={1}
          blurAmount={0.3}
          useWindowScroll={true}
        >
          {aboutData.map((item) => (
            <ScrollStackItem
              key={item.id}
              itemClassName="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 transform-gpu"
            >
              <div className="flex flex-col justify-center h-full transform-gpu will-change-transform">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm mb-4 transform-gpu">
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {item.id}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4 leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-lg md:text-xl text-black/80 dark:text-white/80 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent dark:from-black/30 pointer-events-none" />
    </section>
  );
}
