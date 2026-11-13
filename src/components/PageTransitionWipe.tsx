"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionWipeProps {
  isActive: boolean;
  targetName?: string;
}

export default function PageTransitionWipe({ isActive, targetName }: PageTransitionWipeProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          {/* Subtle horizontal laser scan line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
          />

          {targetName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute text-xs font-mono tracking-[0.3em] uppercase text-zinc-400"
            >
              // NAVIGATING TO {targetName}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
