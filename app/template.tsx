"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

// The first paint is handled by CSS entrance animations; only client-side
// navigations get the page transition, so server HTML is never hidden.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
