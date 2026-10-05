"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ease, duration } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "p" | "h1" | "h2" | "h3";
};

/** Fade + rise once when 20% of the element is in view. */
export function Reveal({ delay = 0, y = 30, as = "div", children, ...rest }: Props) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.reveal, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
