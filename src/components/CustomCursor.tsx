"use client";

import { useEffect, useRef } from "react";

const lastPointer = {
  x: -100,
  y: -100,
  active: false,
};

const INTERACTIVE_SELECTOR =
  "button, a, [role='button'], summary, select, input, textarea, label, [data-cursor-hover], .cursor-pointer";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: lastPointer.x, y: lastPointer.y });
  const isVisibleRef = useRef(lastPointer.active);
  const isHoveredRef = useRef(false);
  const isPressedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Match globals.css @media (pointer: fine) 1:1 so cursor is always present when native cursor is hidden
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const activateOverlayCursor = () => {
      isVisibleRef.current = true;
      document.documentElement.classList.add("custom-cursor-active");
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    const deactivateOverlayCursor = () => {
      isVisibleRef.current = false;
      document.documentElement.classList.remove("custom-cursor-active");
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    if (lastPointer.active) {
      posRef.current.x = lastPointer.x;
      posRef.current.y = lastPointer.y;
      activateOverlayCursor();
    } else {
      deactivateOverlayCursor();
    }

    const updatePosition = () => {
      const el = cursorRef.current;
      if (el) {
        // Finger tip hotspot is at (3.5px, 0.5px) inside the 38x41 hand image
        const x = posRef.current.x - 3.5;
        const y = posRef.current.y - 0.5;

        let scale = 1;
        let rotate = 0;

        if (isPressedRef.current) {
          scale = 0.94;
          rotate = 0;
        } else if (isHoveredRef.current) {
          scale = 1.08;
          rotate = -3;
        }

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
        el.style.opacity = isVisibleRef.current ? "1" : "0";
      }

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    rafIdRef.current = requestAnimationFrame(updatePosition);

    const syncCoords = (clientX: number, clientY: number) => {
      if (clientX === 0 && clientY === 0 && !lastPointer.active) return;
      posRef.current.x = clientX;
      posRef.current.y = clientY;
      lastPointer.x = clientX;
      lastPointer.y = clientY;
      lastPointer.active = true;
      activateOverlayCursor();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      syncCoords(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      syncCoords(e.clientX, e.clientY);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.clientX !== 0 || e.clientY !== 0) {
        syncCoords(e.clientX, e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.clientX !== 0 || e.clientY !== 0) {
        syncCoords(e.clientX, e.clientY);
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = Boolean(target.closest(INTERACTIVE_SELECTOR));
      isHoveredRef.current = isClickable;
      if (glowRef.current) {
        glowRef.current.style.opacity = isClickable ? "0.4" : "0";
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      isPressedRef.current = true;
      syncCoords(e.clientX, e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isPressedRef.current = true;
      syncCoords(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isPressedRef.current = false;
    };

    const handleMouseLeave = () => {
      deactivateOverlayCursor();
    };

    const handleMouseEnter = (e: MouseEvent) => {
      syncCoords(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("pointerup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      deactivateOverlayCursor();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("pointerup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[999999] will-change-transform select-none"
      style={{
        opacity: 0,
        transformOrigin: "3.5px 0.5px", // Pivot exactly at index finger tip
        transition: "opacity 0.15s ease",
      }}
    >
      <div className="relative">
        <img
          src="/cursor-hand-2x.png"
          alt=""
          width={38}
          height={41}
          decoding="sync"
          draggable={false}
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
