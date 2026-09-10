"use client";

import React, { useState, useEffect } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";
import { GlobalHUD } from "./GlobalHUD";
import { ChapterRail } from "./ChapterRail";
import { NavigationOverlay } from "./NavigationOverlay";
import { BootLoader } from "./BootLoader";

export function ExperienceShell({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll listener to update active chapter based on section positions
  useEffect(() => {
    const chapterIds = [
      "hero",
      "identity",
      "journey",
      "build",
      "toolkit",
      "proof",
      "foundation",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapterIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentChapter(i + 1);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (chapterIndex: number) => {
    const chapterIds = [
      "hero",
      "identity",
      "journey",
      "build",
      "toolkit",
      "proof",
      "foundation",
      "contact",
    ];

    const targetId = chapterIds[chapterIndex - 1];
    const el = document.getElementById(targetId);
    if (!el) return;

    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -20 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScroll>
      {/* Contextual Custom Cursor */}
      <CustomCursor />

      {/* Bootloader Simulation on initial load */}
      {!booted && <BootLoader onComplete={() => setBooted(true)} />}

      {/* Persistent Atmosphere Layers */}
      <div className="fixed inset-0 tech-grid-bg opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 noise-overlay pointer-events-none z-1" />

      {/* Global Heads-Up Display (HUD) */}
      <GlobalHUD
        currentChapter={currentChapter}
        onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      {/* Right Edge Chapter Rail (Desktop) */}
      <ChapterRail
        currentChapter={currentChapter}
        onSelectChapter={scrollToChapter}
      />

      {/* Fullscreen Spatial Navigation Overlay */}
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectChapter={scrollToChapter}
        currentChapter={currentChapter}
      />

      {/* The 8 Journey Chapters Content */}
      <main className="relative z-10">{children}</main>
    </SmoothScroll>
  );
}
