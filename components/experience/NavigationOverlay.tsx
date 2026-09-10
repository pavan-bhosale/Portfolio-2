"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";
import { ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterIndex: number) => void;
  currentChapter: number;
}

const MENU_ITEMS = [
  { index: 1, tag: "CH // 01", title: "INITIALIZE", desc: "Digital Environment & Entry" },
  { index: 2, tag: "CH // 02", title: "IDENTITY", desc: "Profile, Mindset & Focus" },
  { index: 3, tag: "CH // 03", title: "JOURNEY", desc: "Milestones & Cozmoh" },
  { index: 4, tag: "CH // 04", title: "BUILD", desc: "NeuroNotes & GreenCode" },
  { index: 5, tag: "CH // 05", title: "TOOLKIT", desc: "3D Skills & Technologies" },
  { index: 6, tag: "CH // 06", title: "PROOF", desc: "Research, Awards & Competitions" },
  { index: 7, tag: "CH // 07", title: "FOUNDATION", desc: "Education & Knowledge Vault" },
  { index: 8, tag: "CH // 08", title: "NEXT CHAPTER", desc: "Mission Complete & Contact" },
];

export function NavigationOverlay({
  isOpen,
  onClose,
  onSelectChapter,
  currentChapter,
}: NavigationOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] bg-[#050507]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none" />

          {/* Top Bar Space */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto pt-4 border-b border-white/8 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B8FF4A]">
              <span className="w-2 h-2 rounded-full bg-[#B8FF4A] shadow-[0_0_8px_#B8FF4A]" />
              <span>SPATIAL NAVIGATION INDEX</span>
            </div>
            <div className="text-xs font-mono text-[#666A73]">
              PRESS ESC TO CLOSE
            </div>
          </div>

          {/* Chapters Navigation Grid */}
          <div className="max-w-6xl w-full mx-auto my-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {MENU_ITEMS.map((item, idx) => {
              const isActive = currentChapter === item.index;

              return (
                <motion.button
                  key={item.index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectChapter(item.index);
                    onClose();
                  }}
                  data-cursor="GO"
                  className={`group text-left p-4 sm:p-6 rounded-[14px] border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#141821] border-[#B8FF4A]/50 shadow-[0_0_20px_-5px_rgba(184,255,74,0.15)]"
                      : "bg-[#0E1117]/60 border-white/8 hover:border-white/20 hover:bg-[#141821]/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[11px] font-mono text-[#B8FF4A]">
                        {item.tag}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-mono tracking-widest text-[#B8FF4A] bg-[#B8FF4A]/10 px-2 py-0.5 rounded-full">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A6A8AE] font-body mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#666A73] group-hover:text-[#B8FF4A] group-hover:border-[#B8FF4A]/40 transition-all shrink-0 ml-4">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom Quick Access */}
          <div className="max-w-6xl w-full mx-auto border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A6A8AE]">
            <div className="flex items-center gap-4">
              <span>DIRECT CHANNELS:</span>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F3F1EA] hover:text-[#B8FF4A] underline underline-offset-4 transition-colors"
                data-cursor="OPEN ↗"
              >
                LINKEDIN
              </a>
              <span className="text-white/20">//</span>
              <a
                href={`mailto:${profileData.email}`}
                className="text-[#F3F1EA] hover:text-[#B8FF4A] underline underline-offset-4 transition-colors"
                data-cursor="EMAIL"
              >
                {profileData.email}
              </a>
            </div>

            <div className="text-[11px] text-[#666A73]">
              {profileData.name} — {profileData.degree}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
