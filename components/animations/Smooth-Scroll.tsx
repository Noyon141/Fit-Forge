"use client";

import Lenis from "lenis";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

interface SmoothScrollContextType {
  scrollProgress: number;
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollProgress: 0,
  lenis: null,
});

export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Listen to Lenis scroll events for accurate progress
    lenis.on("scroll", (e: any) => {
      const progress = e.progress || 0;
      setScrollProgress(progress);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{ scrollProgress, lenis: lenisRef.current }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);

  const scrollTo = (target: string | number, options?: any) => {
    if (context.lenis) {
      context.lenis.scrollTo(target, options);
    }
  };

  return {
    scrollTo,
    scrollProgress: context.scrollProgress,
    lenis: context.lenis,
  };
}
