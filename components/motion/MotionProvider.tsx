"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion respects the OS reduced-motion setting everywhere. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
