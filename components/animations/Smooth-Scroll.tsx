"use client";

import Lenis from "lenis";
import { ReactNode, useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function useSmoothScroll() {
  const scrollTo = (target: string | number, options?: any) => {
    const lenis = new Lenis();
    lenis.scrollTo(target, options);
  };

  return { scrollTo };
}
