"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface AnimatedSignupButtonProps {
  loading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSignupButton({
  loading,
  disabled = false,
  onClick,
  children,
  className = "",
}: AnimatedSignupButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const dumbbellRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current || !dumbbellRef.current) return;

    // Initial setup
    gsap.set(dumbbellRef.current, {
      opacity: 0,
      scale: 0,
      rotation: 0,
    });

    gsap.set(textRef.current, {
      opacity: 1,
      scale: 1,
    });

    if (loading && !isAnimating) {
      setIsAnimating(true);

      // Animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Keep dumbbell visible while loading
        },
      });

      // Animate text out
      tl.to(textRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      })
        // Animate dumbbell in
        .to(
          dumbbellRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        )
        // Rotate dumbbell continuously
        .to(dumbbellRef.current, {
          rotation: 360,
          duration: 1.5,
          ease: "none",
          repeat: -1,
        });
    } else if (!loading && isAnimating) {
      // Animation complete - reset to text
      setIsAnimating(false);

      const tl = gsap.timeline();

      // Stop rotation and animate dumbbell out
      tl.to(dumbbellRef.current, {
        rotation: 0,
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
        // Animate text back in
        .to(
          textRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        );
    }
  }, [loading, isAnimating]);

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      // Button press animation
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      onClick();
    }
  };

  return (
    <Button
      ref={buttonRef}
      type="submit"
      disabled={disabled || loading}
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-75 ${className}`}
    >
      {/* Text Content */}
      <span ref={textRef} className="block">
        {children}
      </span>

      {/* Dumbbell Icon */}
      <div
        ref={dumbbellRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative">
          {/* Dumbbell SVG */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="text-current"
          >
            {/* Left weight */}
            <rect
              x="2"
              y="10"
              width="6"
              height="12"
              rx="2"
              fill="currentColor"
            />
            {/* Right weight */}
            <rect
              x="24"
              y="10"
              width="6"
              height="12"
              rx="2"
              fill="currentColor"
            />
            {/* Handle */}
            <rect
              x="8"
              y="14"
              width="16"
              height="4"
              rx="2"
              fill="currentColor"
            />
            {/* Handle grips */}
            <line
              x1="12"
              y1="14"
              x2="12"
              y2="18"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <line
              x1="16"
              y1="14"
              x2="16"
              y2="18"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <line
              x1="20"
              y1="14"
              x2="20"
              y2="18"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </Button>
  );
}
