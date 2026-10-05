"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { lenisStore } from "@/lib/lenis";

/**
 * Lenis smoothing for wheel/trackpad (same duration and expo easing as the
 * reference). Touch keeps native scrolling; reduced-motion users get none.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 },
      autoRaf: true,
    });
    lenisStore.set(lenis);

    const onChange = () => {
      if (reduce.matches) lenis.destroy();
    };
    reduce.addEventListener("change", onChange);

    return () => {
      reduce.removeEventListener("change", onChange);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);

  // New route: jump to top immediately.
  useEffect(() => {
    lenisStore.get()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
