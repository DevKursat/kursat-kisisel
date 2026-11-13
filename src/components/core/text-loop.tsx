"use client";

import {
  Children,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "framer-motion";

export type TextLoopProps = {
  children: ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: "popLayout" | "sync" | "wait";
};

export function TextLoop({
  children,
  className,
  interval = 2.5,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = "popLayout",
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    if (!trigger) return;

    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger]);

  const defaultVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <span
      className={`relative inline-block whitespace-nowrap align-bottom ${className || ""}`}
    >
      <AnimatePresence mode={mode} initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || defaultVariants}
          className="inline-block"
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
