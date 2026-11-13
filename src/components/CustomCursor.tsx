"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isPressedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only desktop fine pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Enforce cursor hiding
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const updatePosition = () => {
      const el = cursorRef.current;
      if (el) {
        // Finger tip hotspot is at (3.5px, 0.5px) inside the 38x41 hand image
        const x = posRef.current.x - 3.5;
        const y = posRef.current.y - 0.5;
        
        let scale = 1;
        let rotate = 0;

        if (isPressedRef.current) {
          // Tıklamada parmak ucu asla geriye veya sağa sola kaymaz, milimetrik basılır
          scale = 0.94;
          rotate = 0;
        } else if (isHoveredRef.current) {
          scale = 1.08;
          rotate = -3;
        }

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    rafIdRef.current = requestAnimationFrame(updatePosition);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (cursorRef.current && cursorRef.current.style.opacity === "0") {
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = !!(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")
      );

      isHoveredRef.current = isClickable;
      if (glowRef.current) {
        glowRef.current.style.opacity = isClickable ? "0.4" : "0";
      }
    };

    const handleMouseDown = () => {
      isPressedRef.current = true;
    };

    const handleMouseUp = () => {
      isPressedRef.current = false;
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform select-none"
      style={{
        opacity: 0,
        transformOrigin: "3.5px 0.5px", // Pivot exactly at index finger tip
        transition: "opacity 0.15s ease",
      }}
    >
      <div className="relative">
        <Image
          src="/cursor-hand-2x.png"
          alt="Cursor"
          width={38}
          height={41}
          priority
          unoptimized
          className="w-[38px] h-[41px] object-contain pointer-events-none select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
        />

        {/* Subtle glow on hover */}
        <div
          ref={glowRef}
          className="absolute -inset-1 rounded-full bg-white/30 blur-sm pointer-events-none -z-10 opacity-0 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}
