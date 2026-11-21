"use client";

import React, { useEffect, useRef } from "react";

interface SponsorHeroBackdropProps {
  isDesktop: boolean;
  reducedMotion: boolean;
}

const DESKTOP_MEDIA = {
  src: "/videos/sponsor-hero-desktop.mp4",
  poster: "/videos/sponsor-hero-desktop-poster.jpg",
  objectPosition: "50% 50%",
};

const MOBILE_MEDIA = {
  src: "/videos/sponsor-hero-mobile.mp4",
  poster: "/videos/sponsor-hero-mobile-poster.jpg",
  objectPosition: "50% 58%",
};

export default function SponsorHeroBackdrop({
  isDesktop,
  reducedMotion,
}: SponsorHeroBackdropProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = isDesktop ? DESKTOP_MEDIA : MOBILE_MEDIA;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!isDesktop || reducedMotion || !finePointer) {
      el.style.transform = "none";
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const vw = Math.max(1, window.innerWidth);
      const vh = Math.max(1, window.innerHeight);
      targetX = e.clientX / vw - 0.5;
      targetY = e.clientY / vh - 0.5;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      el.style.transform = `translate3d(${(curX * -14).toFixed(2)}px, ${(curY * -10).toFixed(2)}px, 0) scale(1.045)`;
      rafId = requestAnimationFrame(updateParallax);
    };

    el.style.transform = "translate3d(0px, 0px, 0) scale(1.045)";
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isDesktop, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playbackRate = 0.85;
    if (reducedMotion) {
      video.pause();
    } else if (!video.ended) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }
  }, [reducedMotion, isDesktop]);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full will-change-transform pointer-events-none"
    >
      <video
        key={isDesktop ? "sponsor-oneshot-desktop" : "sponsor-oneshot-mobile"}
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        autoPlay={!reducedMotion}
        muted
        loop={false}
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover contrast-[1.03]"
        style={{ objectPosition: media.objectPosition }}
      />
    </div>
  );
}
