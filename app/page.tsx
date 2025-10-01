"use client";

import { BackgroundCharacterScene } from "@/components/animations/Animated-Character-Scene";
import {
  SmoothScrollProvider,
  useSmoothScroll,
} from "@/components/animations/Smooth-Scroll";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

function HomeContent() {
  const { scrollProgress } = useSmoothScroll();

  return (
    <>
      {/* Background 3D Character */}
      <BackgroundCharacterScene scrollProgress={scrollProgress} />

      <main className="relative min-h-screen bg-gradient-to-br from-white/20 via-transparent to-gray-50/30 dark:from-black/50 dark:via-transparent dark:to-gray-900/30 z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
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
