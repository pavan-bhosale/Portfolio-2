"use client";

import React, { useState } from "react";
import { ChapterHeader } from "@/components/ui/ChapterHeader";
import { ConstellationScene } from "@/components/canvas/ConstellationScene";
import { InspectModal, InspectItemData } from "@/components/ui/InspectModal";
import { AchievementItem } from "@/data/achievements";
import { soundManager } from "@/lib/sound";

export function ProofSection() {
  const [inspectItem, setInspectItem] = useState<InspectItemData | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  const handleInspectAchievement = (ach: AchievementItem) => {
    soundManager.playClick();

    setInspectItem({
      type: "achievement",
      categoryTag: `${ach.nodeIndex} // PROOF OF WORK`,
      title: ach.title,
      subtitle: ach.affiliation,
      badge: ach.badge,
      description: ach.summary,
      accentColor: ach.accentColor,
      metadata: [
        { label: "AWARD / STATUS", value: ach.badge },
        { label: "ORGANIZATION / EVENT", value: ach.affiliation },
        { label: "NODE INDEX", value: ach.nodeIndex },
        { label: "VERIFICATION", value: "Verified Credentials" },
      ],
      bulletPoints: ach.details,
      tags: [ach.badge, "National Award", "Research Authorship", "Aerodynamics", "Sustainable Computing"],
    });
    setIsInspectOpen(true);
  };

  return (
    <section
      id="proof"
      aria-label="Chapter 06: Proof of Work"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <ChapterHeader
        number="CHAPTER 06"
        systemTag="VALIDATED OUTCOMES"
        title="PROOF OF WORK"
        subtitle="A 3D constellation of research authorship, national engineering competition victories, and technical presentations."
      />

      <ConstellationScene onInspectAchievement={handleInspectAchievement} />

      {/* Inspection Modal */}
      <InspectModal
        item={inspectItem}
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
      />
    </section>
  );
}
