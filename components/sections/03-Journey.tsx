"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChapterHeader } from "@/components/ui/ChapterHeader";
import { InspectModal, InspectItemData } from "@/components/ui/InspectModal";
import { journeyMilestones, MilestoneNode } from "@/data/experience";
import { soundManager } from "@/lib/sound";
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Cpu, FlaskConical, Rocket, ArrowUpRight } from "lucide-react";

export function JourneySection() {
  const [expandedId, setExpandedId] = useState<string | null>("cozmoh");
  const [inspectItem, setInspectItem] = useState<InspectItemData | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  const getNodeIcon = (type: MilestoneNode["type"]) => {
    switch (type) {
      case "academic":
        return <GraduationCap className="w-4 h-4 text-[#B8FF4A]" />;
      case "domain":
        return <Cpu className="w-4 h-4 text-[#6CA8FF]" />;
      case "research":
        return <FlaskConical className="w-4 h-4 text-[#D9B86C]" />;
      case "industry":
        return <Briefcase className="w-4 h-4 text-[#B8FF4A]" />;
      case "vision":
        return <Rocket className="w-4 h-4 text-[#6CA8FF]" />;
    }
  };

  const handleInspectMilestone = (node: MilestoneNode) => {
    soundManager.playClick();
    const isCozmoh = node.id === "cozmoh";

    setInspectItem({
      type: "journey",
      categoryTag: `PHASE ${node.step} // TRAJECTORY MILESTONE`,
      title: node.role,
      subtitle: node.organization ? `Organization: ${node.organization}` : "Engineering Evolution",
      institutionOrOrg: node.organization,
      badge: node.type.toUpperCase(),
      description: node.description,
      accentColor: isCozmoh ? "#B8FF4A" : "#6CA8FF",
      metadata: [
        { label: "TRAJECTORY PHASE", value: `Phase ${node.step}` },
        { label: "MILESTONE CLASSIFICATION", value: node.type.toUpperCase() },
        { label: "AFFILIATION", value: node.organization || "Academic & Independent" },
        { label: "STATUS", value: "Verified Progress Milestone" },
      ],
      bulletPoints: isCozmoh
        ? [
            "Full Stack Web Developer role engineering modern interactive digital solutions.",
            "Structuring clean data flow between frontend components and server endpoints.",
            "Extensible container architecture ready for production metrics and case studies.",
          ]
        : [
            `Core evolution phase developing ${node.role.toLowerCase()} competencies.`,
            "Grounded in verified Computer Science (Data Science) curriculum and projects.",
          ],
      tags: [node.role, node.type, node.organization || "VCET", "Computer Science"],
    });
    setIsInspectOpen(true);
  };

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundManager.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="journey"
      aria-label="Chapter 03: Journey"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <ChapterHeader
        number="CHAPTER 03"
        systemTag="TRAJECTORY"
        title="JOURNEY"
        subtitle="A spatial timeline through engineering foundations, specialized AI studies, and full-stack software development."
      />

      {/* Spatial Timeline Container */}
      <div className="relative border-l border-white/10 ml-4 sm:ml-12 pl-6 sm:pl-12 space-y-12 sm:space-y-16">
        {journeyMilestones.map((node, idx) => {
          const isExpanded = expandedId === node.id;
          const isCozmoh = node.id === "cozmoh";

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Glowing Node Dot on Timeline Rail */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1 flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isCozmoh
                      ? "bg-[#B8FF4A] shadow-[0_0_12px_#B8FF4A] scale-125"
                      : "bg-white/30 group-hover:bg-[#B8FF4A] group-hover:shadow-[0_0_8px_#B8FF4A]"
                  }`}
                />
              </div>

              {/* Node Card (Clickable to Inspect) */}
              <div
                onClick={() => handleInspectMilestone(node)}
                className={`p-6 sm:p-8 rounded-[18px] border transition-all duration-300 cursor-pointer group hover:border-[#B8FF4A]/50 ${
                  isCozmoh
                    ? "bg-[#0E1117] border-[#B8FF4A]/40 shadow-[0_0_30px_-10px_rgba(184,255,74,0.15)]"
                    : "bg-[#0E1117]/80 border-white/8 hover:border-white/20"
                }`}
                data-cursor="INSPECT"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#B8FF4A]/40 transition-colors">
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#B8FF4A] uppercase">
                        PHASE {node.step} // {node.type}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors">
                        {node.role}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {node.organization && (
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-mono text-[#A6A8AE]">
                        {node.organization}
                      </span>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-[#666A73] group-hover:text-[#B8FF4A] transition-colors" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A6A8AE] font-body leading-relaxed max-w-3xl">
                  {node.description}
                </p>

                {/* Cozmoh Specific Expandable Module */}
                {isCozmoh && (
                  <div className="mt-4 pt-4 border-t border-white/8">
                    <button
                      onClick={(e) => toggleExpand(e, node.id)}
                      className="w-full flex items-center justify-between text-xs font-mono text-[#B8FF4A] hover:underline cursor-pointer"
                    >
                      <span>VERIFIED INDUSTRY ROLE // FULL STACK WEB DEVELOPER</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-4 rounded-[10px] bg-[#141821] border border-white/8 space-y-2 text-xs font-body text-[#A6A8AE]"
                      >
                        <p>
                          Responsible for full-stack web application engineering, implementing responsive user interfaces, and structuring clean data exchange between client applications and web servers.
                        </p>
                        <div className="text-[10px] font-mono text-[#666A73] uppercase pt-1">
                          SYSTEM STATUS // EXTENSIBLE FIELDS READY FOR PRODUCTION METRICS & CASE STUDIES
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
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
