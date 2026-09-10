"use client";

import React from "react";
import { ExperienceShell } from "@/components/experience/ExperienceShell";
import { HeroSection } from "@/components/sections/01-Hero";
import { IdentitySection } from "@/components/sections/02-Identity";
import { JourneySection } from "@/components/sections/03-Journey";
import { BuildSection } from "@/components/sections/04-Build";
import { ToolkitSection } from "@/components/sections/05-Toolkit";
import { ProofSection } from "@/components/sections/06-Proof";
import { FoundationSection } from "@/components/sections/07-Foundation";
import { NextChapterSection } from "@/components/sections/08-NextChapter";

export default function Home() {
  const handleScrollToIdentity = () => {
    const el = document.getElementById("identity");
    if (el) {
      if (typeof window !== "undefined") {
        const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <ExperienceShell>
      {/* Chapter 01: INITIALIZE */}
      <HeroSection onScrollNext={handleScrollToIdentity} />

      {/* Chapter 02: IDENTITY */}
      <IdentitySection />

      {/* Chapter 03: JOURNEY */}
      <JourneySection />

      {/* Chapter 04: BUILD (NeuroNotes & GreenCode) */}
      <BuildSection />

      {/* Chapter 05: TOOLKIT (3D Skills Orbit) */}
      <ToolkitSection />

      {/* Chapter 06: PROOF (Constellation & Achievements) */}
      <ProofSection />

      {/* Chapter 07: FOUNDATION (Education & Knowledge Vault) */}
      <FoundationSection />

      {/* Chapter 08: NEXT CHAPTER (Mission Complete & Connect) */}
      <NextChapterSection />
    </ExperienceShell>
  );
}
