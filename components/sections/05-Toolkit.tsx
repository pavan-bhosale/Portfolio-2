"use client";

import React, { useState } from "react";
import { ChapterHeader } from "@/components/ui/ChapterHeader";
import { SkillOrbitScene } from "@/components/canvas/SkillOrbitScene";
import { InspectModal, InspectItemData } from "@/components/ui/InspectModal";
import { skillsData, skillCategories, SkillCategory, SkillItem } from "@/data/skills";
import { soundManager } from "@/lib/sound";
import { Terminal, Cpu, Globe, Wrench, ArrowUpRight, Check, Sparkles } from "lucide-react";

export function ToolkitSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("ALL");
  const [inspectItem, setInspectItem] = useState<InspectItemData | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "PROGRAMMING":
        return <Terminal className="w-4 h-4 text-[#B8FF4A]" />;
      case "AI / ML":
        return <Cpu className="w-4 h-4 text-[#6CA8FF]" />;
      case "WEB":
        return <Globe className="w-4 h-4 text-[#D9B86C]" />;
      case "TOOLS":
        return <Wrench className="w-4 h-4 text-[#F3F1EA]" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  const getCategoryAccent = (cat: string) => {
    switch (cat) {
      case "PROGRAMMING":
        return "#B8FF4A";
      case "AI / ML":
        return "#6CA8FF";
      case "WEB":
        return "#D9B86C";
      default:
        return "#F3F1EA";
    }
  };

  const handleInspectSkill = (skill: SkillItem) => {
    soundManager.playClick();
    const accent = getCategoryAccent(skill.category);

    setInspectItem({
      type: "skill",
      categoryTag: `${skill.category} // TOOLKIT INVENTORY`,
      title: skill.name,
      subtitle: `Verified Technology Stack // ${skill.category}`,
      badge: "VERIFIED STACK",
      description: skill.description,
      accentColor: accent,
      metadata: [
        { label: "TECHNOLOGY NAME", value: skill.name },
        { label: "TOOLKIT CATEGORY", value: skill.category },
        { label: "ORBITAL RADIUS", value: `${skill.orbitRadius} AU` },
        { label: "ENGINEERING ROLE", value: "Verified Resume Competency" },
      ],
      bulletPoints: [
        `Applied in software architecture and systems engineering workflows.`,
        `Grounded in verified academic curriculum, AI research, and development.`,
        `Integrated across core projects such as NeuroNotes, GreenCode, and web platforms.`,
      ],
      tags: [skill.name, skill.category, "Computer Science (Data Science)"],
    });
    setIsInspectOpen(true);
  };

  const categories = ["PROGRAMMING", "AI / ML", "WEB", "TOOLS"] as const;

  // Filter categories to display
  const displayedCategories =
    selectedCategory === "ALL"
      ? categories
      : categories.filter((c) => c === selectedCategory);

  return (
    <section
      id="toolkit"
      aria-label="Chapter 05: Toolkit"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <ChapterHeader
        number="CHAPTER 05"
        systemTag="TECHNICAL INVENTORY"
        title="THE TOOLKIT"
        subtitle="A 3D orbital system of verified programming languages, machine learning stacks, and development environments."
      />

      {/* 3D Orbit Canvas Scene with Unified Filter State */}
      <div className="mb-12">
        <SkillOrbitScene
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onInspectSkill={handleInspectSkill}
        />
      </div>

      {/* Filtered Category Matrix with Smooth Transitions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A6A8AE]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8FF4A]" />
            <span>
              DISPLAYING {selectedCategory === "ALL" ? "ALL TOOLKIT DOMAINS" : `${selectedCategory} DOMAIN`}{" "}
              (CLICK ANY SKILL TO INSPECT)
            </span>
          </div>

          {selectedCategory !== "ALL" && (
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory("ALL");
              }}
              className="text-xs font-mono text-[#B8FF4A] hover:underline cursor-pointer"
            >
              RESTORE ALL CATEGORIES →
            </button>
          )}
        </div>

        <div
          className={`grid gap-4 transition-all duration-300 ${
            selectedCategory === "ALL"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {displayedCategories.map((cat) => {
            const catSkills = skillsData.filter((s) => s.category === cat);
            const accent = getCategoryAccent(cat);

            return (
              <div
                key={cat}
                className="p-6 rounded-[18px] bg-[#0E1117] border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(cat)}
                    <span className="text-sm font-mono font-bold tracking-wider text-[#F3F1EA]">
                      {cat}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor: `${accent}18`,
                      color: accent,
                    }}
                  >
                    {catSkills.length} NODES
                  </span>
                </div>

                <div
                  className={`grid gap-2.5 ${
                    selectedCategory !== "ALL"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      onClick={() => handleInspectSkill(skill)}
                      data-cursor="INSPECT"
                      className="p-3.5 rounded-[10px] bg-[#141824]/80 border border-white/6 hover:border-[#B8FF4A]/50 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors">
                          {skill.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#666A73] group-hover:text-[#B8FF4A] transition-colors" />
                      </div>
                      <div className="text-[11px] font-body text-[#A6A8AE] mt-0.5 leading-snug">
                        {skill.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspection Modal */}
      <InspectModal
        item={inspectItem}
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
      />
    </section>
  );
}
