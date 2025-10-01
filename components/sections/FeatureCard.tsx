"use client";

import { AnimatedCard } from "@/components/animations/Animated-Card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  hoverColor: string;
  backgroundPattern?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  hoverColor,
  backgroundPattern,
}: FeatureCardProps) {
  return (
    <AnimatedCard className="group border border-white/20 dark:border-white/10 relative overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div
          className={`w-full h-full bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
        />
        {backgroundPattern && (
          <div className={`absolute inset-0 ${backgroundPattern} opacity-20`} />
        )}
      </div>

      <div className="relative z-10 p-10">
        <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center text-3xl text-white dark:text-black mb-8 shadow-lg backdrop-blur-sm">
          {icon}
        </div>
        <h3
          className={`text-3xl font-bold text-black dark:text-stone-50 mb-6 ${hoverColor} transition-colors duration-300`}
        >
          {title}
        </h3>
        <p className="text-xl text-black/80 dark:text-stone-50/90 leading-relaxed">
          {description}
        </p>
      </div>
    </AnimatedCard>
  );
}
