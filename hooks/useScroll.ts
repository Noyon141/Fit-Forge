"use client";

import { useCallback, useEffect, useState } from "react";

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / documentHeight, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    // Initial calculation
    updateScrollProgress();

    // Add scroll listener
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [updateScrollProgress]);

  return scrollProgress;
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  const updateScrollPosition = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [updateScrollPosition]);

  return scrollY;
}
