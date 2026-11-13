"use client";

import React, {
  createContext,
  useContext,
  useState,
  useId,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  motion,
  AnimatePresence,
  type Transition,
} from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MorphingPopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
}

const MorphingPopoverContext = createContext<MorphingPopoverContextType | null>(null);

export function useMorphingPopover() {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error("useMorphingPopover must be used within a MorphingPopover");
  }
  return context;
}

export interface MorphingPopoverProps {
  children: ReactNode;
  transition?: Transition;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MorphingPopover({
  children,
  defaultOpen = false,
  onOpenChange,
}: MorphingPopoverProps) {
  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const uniqueId = useId();

  const setIsOpen = (open: boolean) => {
    setIsOpenState(open);
    onOpenChange?.(open);
  };

  return (
    <MorphingPopoverContext.Provider value={{ isOpen, setIsOpen, uniqueId }}>
      <div className="relative inline-block">{children}</div>
    </MorphingPopoverContext.Provider>
  );
}

export interface MorphingPopoverTriggerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  asChild?: boolean;
}

export function MorphingPopoverTrigger({
  children,
  className,
  style,
}: MorphingPopoverTriggerProps) {
  const { isOpen, setIsOpen, uniqueId } = useMorphingPopover();

  if (isOpen) {
    return (
      <div
        className={cn("invisible pointer-events-none select-none", className)}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      layoutId={`popover-container-${uniqueId}`}
      onClick={() => setIsOpen(true)}
      className={cn("outline-none cursor-pointer select-none", className)}
      style={style}
      transition={{
        type: "spring",
        bounce: 0.08,
        duration: 0.35,
      }}
    >
      {children}
    </motion.button>
  );
}

export interface MorphingPopoverContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function MorphingPopoverContent({
  children,
  className,
  style,
}: MorphingPopoverContentProps) {
  const { isOpen, setIsOpen, uniqueId } = useMorphingPopover();
  const contentRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Dim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Morphing Popover Box */}
          <motion.div
            ref={contentRef}
            layoutId={`popover-container-${uniqueId}`}
            className={cn(
              "fixed z-50 left-1/2 bottom-12 sm:bottom-16 -translate-x-1/2 w-[90vw] max-w-md rounded-2xl border border-white/20 bg-[#0e0e12]/95 backdrop-blur-2xl text-white p-5 sm:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.95)] outline-none overflow-hidden",
              className
            )}
            style={style}
            transition={{
              type: "spring",
              bounce: 0.08,
              duration: 0.35,
            }}
          >
            {/* Close Cross */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
