"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps {
  className?: string;
  direction?: "top" | "bottom" | "left" | "right";
  blurIntensity?: number;
}

export function ProgressiveBlur({
  className,
  direction = "bottom",
  blurIntensity = 8,
}: ProgressiveBlurProps) {
  const steps = 8;
  const blurs = Array.from({ length: steps }, (_, i) => {
    const step = i + 1;
    const blur = (step / steps) * blurIntensity;
    const start = (i / steps) * 100;
    const end = (step / steps) * 100;

    let gradientDirection = "to bottom";
    if (direction === "top") gradientDirection = "to top";
    if (direction === "left") gradientDirection = "to left";
    if (direction === "right") gradientDirection = "to right";

    return {
      blur,
      mask: `linear-gradient(${gradientDirection}, transparent ${start}%, black ${end}%)`,
    };
  });

  return (
    <div className={cn("pointer-events-none relative overflow-hidden", className)}>
      {blurs.map((b, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${b.blur}px)`,
            WebkitBackdropFilter: `blur(${b.blur}px)`,
            maskImage: b.mask,
            WebkitMaskImage: b.mask,
          }}
        />
      ))}
    </div>
  );
}
