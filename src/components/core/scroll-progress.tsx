"use client";

import { motion, useScroll, useSpring, type SpringOptions } from "framer-motion";
import { type RefObject } from "react";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps {
  className?: string;
  containerRef?: RefObject<HTMLElement | null>;
  springOptions?: SpringOptions;
}

export function ScrollProgress({
  className,
  containerRef,
  springOptions = {
    stiffness: 280,
    damping: 18,
    mass: 0.3,
  },
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : {}
  );

  const scaleX = useSpring(scrollYProgress, springOptions);

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
      }}
      className={cn("origin-left", className)}
    />
  );
}
