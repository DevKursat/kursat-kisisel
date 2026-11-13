"use client";

import React, {
  createContext,
  useContext,
  useState,
  useId,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
  type Variants,
} from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MorphingDialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const MorphingDialogContext = createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error("useMorphingDialog must be used within a MorphingDialog");
  }
  return context;
}

export interface MorphingDialogProps {
  children: ReactNode;
  transition?: Transition;
}

export function MorphingDialog({ children, transition }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Lenis smooth scroll'u modal açıkken tamamen durdur
      if (typeof window !== "undefined" && (window as unknown as { __lenis?: { stop: () => void } }).__lenis) {
        (window as unknown as { __lenis: { stop: () => void } }).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Modal kapanınca Lenis'i yeniden başlat
      if (typeof window !== "undefined" && (window as unknown as { __lenis?: { start: () => void } }).__lenis) {
        (window as unknown as { __lenis: { start: () => void } }).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && (window as unknown as { __lenis?: { start: () => void } }).__lenis) {
        (window as unknown as { __lenis: { start: () => void } }).__lenis.start();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <MorphingDialogContext.Provider
      value={{ isOpen, setIsOpen, uniqueId, triggerRef }}
    >
      <MotionConfig transition={transition}>
        {children}
      </MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

export interface MorphingDialogTriggerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
}: MorphingDialogTriggerProps) {
  const { setIsOpen, uniqueId, triggerRef } = useMorphingDialog();

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      onClick={() => setIsOpen(true)}
      className={cn("cursor-pointer", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogContainerProps {
  children: ReactNode;
  className?: string;
}

export function MorphingDialogContainer({
  children,
  className,
}: MorphingDialogContainerProps) {
  const { isOpen, setIsOpen } = useMorphingDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className={cn(
            "fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 overscroll-contain",
            className
          )}
        >
          {/* Backdrop with Frosted Glass Cinema Blur (Keeps Background Softly Visible) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-lg sm:backdrop-blur-xl"
          />
          {children}
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export interface MorphingDialogContentProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: MorphingDialogContentProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-${uniqueId}`}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className={cn("relative z-10 overflow-hidden overscroll-contain", className)}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function MorphingDialogImage({
  src,
  alt,
  className,
}: MorphingDialogImageProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.img
      layoutId={`dialog-img-${uniqueId}`}
      src={src}
      alt={alt}
      className={cn("block object-cover", className)}
    />
  );
}

export interface MorphingDialogTitleProps {
  children: ReactNode;
  className?: string;
}

export function MorphingDialogTitle({
  children,
  className,
}: MorphingDialogTitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.h3
      layoutId={`dialog-title-${uniqueId}`}
      className={cn("font-bold text-white", className)}
    >
      {children}
    </motion.h3>
  );
}

export interface MorphingDialogSubtitleProps {
  children: ReactNode;
  className?: string;
}

export function MorphingDialogSubtitle({
  children,
  className,
}: MorphingDialogSubtitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.p
      layoutId={`dialog-subtitle-${uniqueId}`}
      className={cn("text-zinc-400", className)}
    >
      {children}
    </motion.p>
  );
}

export interface MorphingDialogDescriptionProps {
  children: ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: Variants;
}

export function MorphingDialogDescription({
  children,
  className,
  variants,
}: MorphingDialogDescriptionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn("text-zinc-300", className)}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogCloseProps {
  className?: string;
}

export function MorphingDialogClose({ className }: MorphingDialogCloseProps) {
  const { setIsOpen } = useMorphingDialog();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      className={cn(
        "absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-all",
        className
      )}
      aria-label="Close dialog"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
