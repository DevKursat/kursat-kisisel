"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft rain noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(0.8, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start(0);
      noiseNodeRef.current = whiteNoise;

      // Subtle atmospheric drone
      const droneOsc = ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(55, ctx.currentTime);
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.03, ctx.currentTime);
      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start(0);
      droneOscRef.current = droneOsc;
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (!gainNodeRef.current || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    if (isPlaying) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      setTimeout(() => setIsPlaying(false), 400);
    } else {
      setIsPlaying(true);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.6);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      aria-label={isPlaying ? "Mute sound" : "Play sound"}
      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-white" />
      ) : (
        <VolumeX className="w-4 h-4 text-zinc-500" />
      )}
    </button>
  );
}
