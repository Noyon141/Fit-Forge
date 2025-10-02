"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial state - cards positioned off-screen to the left
    gsap.set(cards, {
      x: -200,
      opacity: 0,
      rotationY: -15,
      scale: 0.9,
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Animate cards in sequence from left to right
    cards.forEach((card, index) => {
      tl.to(
        card,
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        index * 0.3 // Stagger the animations
      );
    });

    // Add a subtle continuous animation for visual interest
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: Math.sin(index * 2) * 10,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-4 bg-gradient-to-b from-transparent to-white/10 dark:to-black/20 overflow-hidden"
    >
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

      {/* Horizontal Scroll Cards Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {aboutData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => addToRefs(el, index)}
              className="relative group"
            >
              {/* Card */}
              <div className="relative p-8 lg:p-10 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 transform-gpu will-change-transform transition-all duration-300 hover:bg-white/15 dark:hover:bg-black/25 hover:border-white/30 dark:hover:border-white/20">
                {/* Card Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 flex items-center justify-center transform-gpu group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-black dark:text-white">
                    {item.id}
                  </span>
                </div>

                {/* Card Content */}
                <div className="pt-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-white mb-6 leading-tight group-hover:text-black/90 dark:group-hover:text-white/90 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-lg lg:text-xl text-black/80 dark:text-white/80 leading-relaxed font-medium group-hover:text-black/90 dark:group-hover:text-white/90 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent dark:from-black/30 pointer-events-none" />
    </section>
  );
}
