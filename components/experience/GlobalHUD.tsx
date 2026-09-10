"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface GlobalHUDProps {
  currentChapter: number;
  totalChapters?: number;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

const CHAPTER_NAMES = [
  "INITIALIZE",
  "IDENTITY",
  "JOURNEY",
  "BUILD",
  "TOOLKIT",
  "PROOF",
  "FOUNDATION",
  "NEXT CHAPTER",
];

export function GlobalHUD({
  currentChapter,
  totalChapters = 8,
  onOpenMenu,
  isMenuOpen,
}: GlobalHUDProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const enabled = soundManager.toggleSound();
    setSoundEnabled(enabled);
  };

  const scrollToTop = () => {
    soundManager.playClick();
    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const chapterPad = String(currentChapter).padStart(2, "0");
  const totalPad = String(totalChapters).padStart(2, "0");
  const currentName = CHAPTER_NAMES[currentChapter - 1] || "INITIALIZE";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#050507]/80 backdrop-blur-md border-b border-white/8 py-3"
          : "bg-transparent py-5 sm:py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Top-Left: PAVAN.OS System Identity */}
        <button
          onClick={scrollToTop}
          data-cursor="HOME"
          className="flex items-center gap-3 group text-left cursor-pointer select-none"
        >
          <div className="w-2 h-2 rounded-full bg-[#B8FF4A] shadow-[0_0_10px_#B8FF4A] group-hover:scale-125 transition-transform" />
          <div>
            <div className="flex items-center gap-1.5 font-display font-bold text-sm tracking-wide text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors">
              <span>PAVAN</span>
              <span className="text-[#B8FF4A]">.OS</span>
            </div>
            <div className="text-[9px] font-mono tracking-[0.14em] text-[#666A73] uppercase hidden sm:block">
              SYSTEM STATUS // ONLINE
            </div>
          </div>
        </button>

        {/* Center / Right: Chapter Indicator & Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Chapter readout */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="text-[#B8FF4A] font-semibold">{chapterPad}</span>
            <span className="text-white/20">/</span>
            <span className="text-[#666A73]">{totalPad}</span>
            <span className="text-white/20 mx-1">—</span>
            <span className="text-[#A6A8AE] tracking-widest text-[11px] uppercase">{currentName}</span>
          </div>

          {/* Mobile chapter mini badge */}
          <div className="sm:hidden px-2.5 py-1 rounded-full bg-[#0E1117] border border-white/10 text-[10px] font-mono text-[#B8FF4A]">
            {chapterPad}/{totalPad}
          </div>

          {/* Sound Toggle (Opt-in) */}
          <button
            onClick={handleToggleSound}
            data-cursor={soundEnabled ? "MUTE" : "AUDIO"}
            aria-label={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 hover:border-[#B8FF4A]/40 text-[#A6A8AE] hover:text-[#F3F1EA] text-xs font-mono transition-all cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#B8FF4A]" />
                <span className="text-[10px] tracking-wider hidden md:inline text-[#B8FF4A]">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#666A73]" />
                <span className="text-[10px] tracking-wider hidden md:inline text-[#666A73]">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Fullscreen Menu Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenMenu();
            }}
            data-cursor={isMenuOpen ? "CLOSE" : "MENU"}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1117] hover:bg-[#141821] border border-white/12 hover:border-[#B8FF4A]/50 text-[#F3F1EA] text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            {isMenuOpen ? (
              <>
                <X className="w-3.5 h-3.5 text-[#B8FF4A]" />
                <span className="text-[11px] font-semibold">CLOSE</span>
              </>
            ) : (
              <>
                <Menu className="w-3.5 h-3.5 text-[#B8FF4A]" />
                <span className="text-[11px] font-semibold">MENU</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
