"use client";

import React, { useState } from "react";
import { ChapterHeader } from "@/components/ui/ChapterHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { InspectModal, InspectItemData } from "@/components/ui/InspectModal";
import { educationData, EducationItem } from "@/data/education";
import { coursesData, CourseItem } from "@/data/courses";
import { soundManager } from "@/lib/sound";
import { GraduationCap, ShieldCheck, Bookmark, ArrowUpRight } from "lucide-react";

export function FoundationSection() {
  const [inspectItem, setInspectItem] = useState<InspectItemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInspectEducation = (edu: EducationItem, idx: number) => {
    soundManager.playClick();
    const isDominant = edu.isDominant;

    setInspectItem({
      type: "education",
      categoryTag: `ACADEMIC MILESTONE 0${idx + 1} // FOUNDATION`,
      title: edu.degree,
      subtitle: edu.field,
      institutionOrOrg: edu.institution,
      badge: isDominant ? "PRIMARY DEGREE" : "ACADEMIC BASE",
      description: edu.description,
      accentColor: isDominant ? "#B8FF4A" : "#6CA8FF",
      metadata: [
        { label: "INSTITUTION", value: edu.institution },
        { label: "ACADEMIC LEVEL", value: edu.level },
        { label: "FIELD / TRACK", value: edu.field || "General Science" },
        { label: "ACCREDITATION", value: "Verified Academic Record" },
      ],
      bulletPoints: isDominant
        ? [
            "Data Science specialization covering algorithmic theory, statistics, and machine learning.",
            "Software engineering lifecycle, data structures, database management systems, and web stacks.",
            "Rigorous computational coursework based on engineering problem solving.",
          ]
        : [
            "Higher secondary foundation with concentration in science and mathematics.",
            "Focus on analytical reasoning, physics principles, and quantitative foundations.",
          ],
      tags: isDominant
        ? ["Data Science", "Algorithms", "Machine Learning", "System Architecture", "Software Engineering"]
        : ["Mathematics", "Physics", "Analytical Science"],
    });
    setIsModalOpen(true);
  };

  const handleInspectCourse = (course: CourseItem) => {
    soundManager.playClick();

    setInspectItem({
      type: "course",
      categoryTag: `${course.vaultId} // KNOWLEDGE VAULT`,
      title: course.title,
      subtitle: course.tagline,
      institutionOrOrg: course.provider,
      badge: "VERIFIED CURRICULUM",
      description: course.description,
      accentColor: "#6CA8FF",
      metadata: [
        { label: "COURSE PROVIDER", value: course.provider },
        { label: "VAULT REGISTER", value: course.vaultId },
        { label: "CURRICULUM TYPE", value: "Advanced AI Specialization" },
        { label: "CORE FOCUS", value: course.tagline },
      ],
      bulletPoints: course.focusAreas.map(
        (area) => `Comprehensive module focusing on ${area.toLowerCase()} and practical application.`
      ),
      tags: course.focusAreas,
    });
    setIsModalOpen(true);
  };

  return (
    <section
      id="foundation"
      aria-label="Chapter 07: Foundation"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto space-y-20 sm:space-y-24"
    >
      <ChapterHeader
        number="CHAPTER 07"
        systemTag="ACADEMIC & KNOWLEDGE VAULT"
        title="THE FOUNDATION"
        subtitle="Formal Computer Science Engineering education and specialized coursework across generative AI and computational linguistics."
      />

      {/* Part 1: Academic Milestones Timeline */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B8FF4A] tracking-wider uppercase mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>FORMAL ACADEMIC DEGREES (CLICK TO INSPECT)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {educationData.map((edu, idx) => {
            const isDominant = edu.isDominant;

            return (
              <TiltCard
                key={edu.id}
                glowColor={isDominant ? "lime" : "blue"}
                className={`flex flex-col justify-between cursor-pointer group hover:border-[#B8FF4A]/50 transition-all duration-300 ${
                  isDominant
                    ? "lg:col-span-3 lg:flex-row items-start lg:items-center bg-[#141821]/90 border-[#B8FF4A]/40 shadow-[0_0_30px_-10px_rgba(184,255,74,0.15)]"
                    : "bg-[#0E1117]/80 border-white/8"
                }`}
                data-cursor="INSPECT"
                onClick={() => handleInspectEducation(edu, idx)}
              >
                <div className={isDominant ? "max-w-2xl" : ""}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#B8FF4A] tracking-wider uppercase">
                        0{idx + 1} // {edu.level}
                      </span>
                      {isDominant && (
                        <span className="px-2 py-0.5 rounded-full bg-[#B8FF4A]/10 text-[#B8FF4A] text-[9px] font-mono font-bold">
                          PRIMARY SPECIALIZATION
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#666A73] group-hover:text-[#B8FF4A] transition-colors" />
                  </div>

                  <h3
                    className={`font-display font-extrabold text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors ${
                      isDominant ? "text-2xl sm:text-3xl mb-2" : "text-lg mb-1.5"
                    }`}
                  >
                    {edu.degree}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-[#6CA8FF] mb-3">
                    {edu.institution}
                  </p>

                  <p className="text-xs text-[#A6A8AE] font-body leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {isDominant && (
                  <div className="mt-6 lg:mt-0 lg:pl-8 lg:border-l lg:border-white/10 shrink-0">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8FF4A]/10 border border-[#B8FF4A]/30 text-xs font-mono text-[#B8FF4A]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>DATA SCIENCE CONCENTRATION</span>
                    </div>
                  </div>
                )}
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Part 2: Knowledge Vault (Floating Document Cards) */}
      <div className="space-y-6 pt-6 border-t border-white/8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6CA8FF] tracking-wider uppercase mb-4">
          <Bookmark className="w-4 h-4" />
          <span>KNOWLEDGE VAULT // SPECIALIZED CURRICULUM (CLICK TO INSPECT)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coursesData.map((course) => (
            <TiltCard
              key={course.id}
              glowColor="blue"
              className="p-6 sm:p-8 bg-[#0E1117] border-white/8 flex flex-col justify-between cursor-pointer group hover:border-[#6CA8FF]/50 transition-all duration-300"
              data-cursor="INSPECT"
              onClick={() => handleInspectCourse(course)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#6CA8FF] tracking-widest uppercase">
                    {course.vaultId}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#A6A8AE]">
                      {course.provider}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#666A73] group-hover:text-[#6CA8FF] transition-colors" />
                  </div>
                </div>

                <h4 className="text-xl sm:text-2xl font-display font-bold text-[#F3F1EA] group-hover:text-[#6CA8FF] transition-colors mb-2 leading-tight">
                  {course.title}
                </h4>
                <p className="text-xs font-mono text-[#B8FF4A] mb-3">
                  {course.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#A6A8AE] font-body leading-relaxed mb-6">
                  {course.description}
                </p>
              </div>

              {/* Focus Curriculum Topics */}
              <div className="border-t border-white/8 pt-4">
                <div className="text-[10px] font-mono uppercase text-[#666A73] mb-2">
                  CURRICULUM TOPICS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.focusAreas.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-[6px] bg-white/4 border border-white/6 text-[10px] font-mono text-[#F3F1EA]/80"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Inspection Modal */}
      <InspectModal
        item={inspectItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
