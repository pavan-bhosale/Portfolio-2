"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroScene } from "@/components/canvas/HeroScene";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDown, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";
import { soundManager } from "@/lib/sound";

interface HeroProps {
  onScrollNext: () => void;
}

export function HeroSection({ onScrollNext }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Chapter 01: Initialize Hero"
      className="relative w-full min-h-screen flex flex-col justify-between px-6 sm:px-12 py-12 pt-28 sm:pt-32 overflow-hidden"
    >
      {/* 3D WebGL Scene Background */}
      <HeroScene />

      {/* Atmospheric Radial Depth Gradients */}
      <div className="absolute inset-0 glow-accent opacity-40 pointer-events-none" />
      <div className="absolute inset-0 tech-grid-bg opacity-25 pointer-events-none" />

      {/* Top System Status Line */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2.5 text-xs font-mono tracking-[0.16em] text-[#B8FF4A]"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>CHAPTER 01 // INITIALIZE</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] font-mono tracking-widest text-[#666A73] uppercase hidden sm:block"
        >
          COGNITIVE ENGINE // ONLINE
        </motion.div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#A6A8AE] tracking-widest uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF4A] shadow-[0_0_6px_#B8FF4A]" />
          <span>{profileData.resumeTitle}</span>
        </motion.div>

        {/* Massive Editorial Display Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display font-extrabold tracking-tighter text-[#F3F1EA] uppercase leading-[0.85] select-none"
          >
            PAVAN
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display font-extrabold tracking-tighter text-[#F3F1EA] uppercase leading-[0.85] select-none flex items-baseline gap-4"
          >
            <span>BHOSALE</span>
            <span className="text-[#B8FF4A] text-4xl sm:text-6xl md:text-8xl font-mono font-normal">.</span>
          </motion.h1>
        </div>

        {/* Focus Domains Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-wider text-[#A6A8AE]"
        >
          {profileData.specializations.map((spec, idx) => (
            <React.Fragment key={spec}>
              <span className="hover:text-[#B8FF4A] transition-colors">{spec}</span>
              {idx < profileData.specializations.length - 1 && (
                <span className="text-white/20 select-none">//</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Bottom Exploration CTA */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-white/8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xs text-[#666A73] font-mono max-w-md uppercase tracking-wider"
        >
          EXPLORING THE COMPUTATIONAL JOURNEY // COMPUTER SCIENCE ENGINEERING (DATA SCIENCE)
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-4"
        >
          <MagneticButton
            onClick={() => {
              soundManager.playClick();
              onScrollNext();
            }}
            cursorLabel="ENTER"
            variant="primary"
          >
            <span>ENTER EXPERIENCE</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
