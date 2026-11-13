"use client";

import React, { useMemo } from "react";
import { motion, type Variants, type Transition } from "framer-motion";

export type PresetType = "fade" | "fade-in-blur" | "scale" | "slide";
export type PerType = "char" | "word" | "line";

export interface TextEffectProps {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  speedReveal?: number;
  speedSegment?: number;
}

const defaultPresets: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  fade: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
      },
    },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
    },
  },
  "fade-in-blur": {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      },
    },
  },
  scale: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
      },
    },
    item: {
      hidden: { opacity: 0, scale: 0.6 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    },
  },
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    },
  },
};

export function TextEffect({
  children,
  per = "word",
  as: Component = "span",
  variants,
  className,
  preset = "fade",
  delay = 0,
  trigger = true,
  onAnimationComplete,
  speedReveal = 1,
  speedSegment = 1,
}: TextEffectProps) {
  const segments = useMemo(() => {
    if (per === "char") {
      return children.split("");
    }
    if (per === "word") {
      return children.split(/(\s+)/);
    }
    return [children];
  }, [children, per]);

  const activePreset = defaultPresets[preset] || defaultPresets.fade;

  const containerVariants = useMemo(() => {
    const base = variants?.container || activePreset.container;
    return {
      ...base,
      visible: {
        ...base.visible,
        transition: {
          delayChildren: delay,
          staggerChildren: 0.04 / speedReveal,
        },
      },
    };
  }, [variants, activePreset, delay, speedReveal]);

  const itemVariants = useMemo(() => {
    const base = variants?.item || activePreset.item;
    return {
      ...base,
      visible: {
        ...base.visible,
        transition: {
          duration: 0.35 / speedSegment,
        },
      },
    };
  }, [variants, activePreset, speedSegment]);

  const MotionComponent = motion[Component as keyof typeof motion] as React.ElementType;

  return (
    <MotionComponent
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
      variants={containerVariants}
      onAnimationComplete={onAnimationComplete}
      className={`inline-block ${className || ""}`}
    >
      {segments.map((segment, index) => {
        if (per === "word" && /^\s+$/.test(segment)) {
          return <span key={index}>{segment}</span>;
        }

        return (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block whitespace-pre"
          >
            {segment}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}
