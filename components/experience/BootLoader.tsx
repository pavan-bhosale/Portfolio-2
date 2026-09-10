"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLoaderProps {
  onComplete: () => void;
}

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CORE SYSTEMS...");

  useEffect(() => {
    const steps = [
      { p: 25, text: "CALIBRATING 3D ENVIRONMENT..." },
      { p: 55, text: "INITIALIZING SPATIAL PHYSICS & SHADERS..." },
      { p: 85, text: "LINKING NEURAL KNOWLEDGE GRAPHS..." },
      { p: 100, text: "SYSTEM READY. ENTERING PAVAN.OS" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[10000] bg-[#050507] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />

        {/* Central Boot Card */}
        <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
          {/* System Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-2xl border border-[#B8FF4A]/30 bg-[#0E1117] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(184,255,74,0.15)]"
          >
            <span className="font-display font-black text-xl text-[#B8FF4A]">PB</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[#F3F1EA] uppercase"
          >
            PAVAN<span className="text-[#B8FF4A]">.OS</span>
          </motion.h1>

          <p className="mt-1 text-[11px] font-mono tracking-[0.2em] text-[#666A73] uppercase">
            EXPERIENCE KERNEL // BUILD 2026
          </p>

          {/* Progress bar container */}
          <div className="w-full mt-8 bg-white/5 border border-white/10 rounded-full h-1.5 p-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B8FF4A]/60 via-[#B8FF4A] to-[#D5FF8A] rounded-full shadow-[0_0_12px_#B8FF4A]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          </div>

          {/* Dynamic Status Readout */}
          <div className="mt-4 flex items-center justify-between w-full text-[10px] font-mono text-[#A6A8AE]">
            <span className="truncate max-w-[280px] text-left">{statusText}</span>
            <span className="text-[#B8FF4A] font-bold">{progress}%</span>
          </div>

          <div className="mt-8 text-[9px] font-mono text-white/20 tracking-wider">
            PRESS ANY KEY OR SCROLL TO EXPLORE
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
