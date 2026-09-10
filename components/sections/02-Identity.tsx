"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChapterHeader } from "@/components/ui/ChapterHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { InspectModal, InspectItemData } from "@/components/ui/InspectModal";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { profileData } from "@/data/profile";
import { soundManager } from "@/lib/sound";
import { MapPin, Mail, Code, Brain, Database, Globe, Wrench, ArrowUpRight } from "lucide-react";

export function IdentitySection() {
  const [inspectItem, setInspectItem] = useState<InspectItemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIcon = (id: string) => {
    switch (id) {
      case "software":
        return <Code className="w-5 h-5 text-[#B8FF4A]" />;
      case "ai-ml":
        return <Brain className="w-5 h-5 text-[#6CA8FF]" />;
      case "data":
        return <Database className="w-5 h-5 text-[#D9B86C]" />;
      case "web":
        return <Globe className="w-5 h-5 text-[#B8FF4A]" />;
      case "problem-solving":
        return <Wrench className="w-5 h-5 text-[#6CA8FF]" />;
      default:
        return <Code className="w-5 h-5 text-[#B8FF4A]" />;
    }
  };

  const handleCardClick = (card: (typeof profileData.identityCards)[number], idx: number) => {
    soundManager.playClick();
    const accent = idx % 2 === 0 ? "#B8FF4A" : "#6CA8FF";

    setInspectItem({
      type: "identity",
      categoryTag: `CORE DOMAIN 0${idx + 1} // IDENTITY`,
      title: card.title,
      subtitle: card.label,
      badge: "ACTIVE FOCUS",
      description: card.description,
      accentColor: accent,
      metadata: [
        { label: "ENGINEERING DOMAIN", value: card.title },
        { label: "SUBSYSTEM ROLE", value: card.label },
        { label: "DEGREE SPECIALIZATION", value: "Computer Science (Data Science)" },
        { label: "APPLICATION", value: "Scalable Software & Intelligent Systems" },
      ],
      tags: card.tags,
      bulletPoints: [
        `Architectural discipline centered on ${card.title.toLowerCase()} problem solving.`,
        `Direct alignment with verified academic and project executions.`,
        `Engineered for high performance, maintainability, and clean design patterns.`,
      ],
    });
    setIsModalOpen(true);
  };

  return (
    <section
      id="identity"
      aria-label="Chapter 02: Identity"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 glow-accent opacity-20 pointer-events-none" />

      {/* Chapter Heading */}
      <ChapterHeader
        number="CHAPTER 02"
        systemTag="CORE PROFILE"
        title="WHO AM I?"
        subtitle="Bridging Computer Science theory with production software architecture and AI workflows."
      />

      {/* Profile Manifesto & Verified Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 space-y-6"
        >
          <p className="text-xl sm:text-2xl font-body text-[#F3F1EA] leading-relaxed font-light">
            {profileData.positioning}
          </p>

          <p className="text-sm sm:text-base text-[#A6A8AE] font-body leading-relaxed max-w-2xl">
            Pursuing a degree in <span className="text-[#F3F1EA] font-medium">{profileData.degree}</span>, with an emphasis on engineering intelligent systems, clean computational models, and sustainable software solutions.
          </p>
        </motion.div>

        {/* Quick System Coordinates Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-4 p-6 rounded-[16px] bg-[#0E1117] border border-white/8 space-y-4 font-mono text-xs"
        >
          <div className="text-[10px] uppercase text-[#B8FF4A] tracking-widest border-b border-white/8 pb-2">
            SYSTEM TELEMETRY
          </div>

          <div className="flex items-center gap-3 text-[#A6A8AE]">
            <MapPin className="w-4 h-4 text-[#B8FF4A] shrink-0" />
            <span>{profileData.location}</span>
          </div>

          <div className="flex items-center gap-3 text-[#A6A8AE]">
            <Mail className="w-4 h-4 text-[#6CA8FF] shrink-0" />
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-[#F3F1EA] truncate transition-colors"
              data-cursor="EMAIL"
            >
              {profileData.email}
            </a>
          </div>

          <div className="flex items-center gap-3 text-[#A6A8AE]">
            <LinkedInIcon className="w-4 h-4 text-[#D9B86C] shrink-0" />
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3F1EA] transition-colors"
              data-cursor="OPEN ↗"
            >
              linkedin.com/in/pavan-prb
            </a>
          </div>
        </motion.div>
      </div>

      {/* Five Interactive 3D Tilt Identity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileData.identityCards.map((card, idx) => (
          <TiltCard
            key={card.id}
            glowColor={idx % 2 === 0 ? "lime" : "blue"}
            className="flex flex-col justify-between min-h-[260px] cursor-pointer group hover:border-[#B8FF4A]/50 transition-all duration-300"
            data-cursor="INSPECT"
            onClick={() => handleCardClick(card, idx)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:border-[#B8FF4A]/40 transition-colors">
                  {getIcon(card.id)}
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase text-[#666A73] group-hover:text-[#B8FF4A] transition-colors">
                  <span>0{idx + 1} // DOMAIN</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <span className="text-[10px] font-mono tracking-wider uppercase text-[#B8FF4A]">
                {card.label}
              </span>
              <h3 className="text-xl font-display font-bold text-[#F3F1EA] mt-1 mb-2 group-hover:text-[#B8FF4A] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-[#A6A8AE] font-body leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Micro tags */}
            <div className="mt-6 pt-4 border-t border-white/6 flex flex-wrap gap-1.5">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-[4px] bg-white/4 text-[10px] font-mono text-[#A6A8AE]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
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
