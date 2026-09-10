"use client";

import React from "react";
import { soundManager } from "@/lib/sound";

interface ChapterRailProps {
  currentChapter: number;
  totalChapters?: number;
  onSelectChapter: (chapterIndex: number) => void;
}

const CHAPTERS = [
  { id: "hero", num: "01", name: "INITIALIZE" },
  { id: "identity", num: "02", name: "IDENTITY" },
  { id: "journey", num: "03", name: "JOURNEY" },
  { id: "build", num: "04", name: "BUILD" },
  { id: "toolkit", num: "05", name: "TOOLKIT" },
  { id: "proof", num: "06", name: "PROOF" },
  { id: "foundation", num: "07", name: "FOUNDATION" },
  { id: "contact", num: "08", name: "NEXT" },
];

export function ChapterRail({
  currentChapter,
  onSelectChapter,
}: ChapterRailProps) {
  return (
    <aside
      aria-label="Chapter quick navigation rail"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {CHAPTERS.map((ch, idx) => {
        const chapterNum = idx + 1;
        const isActive = currentChapter === chapterNum;

        return (
          <button
            key={ch.id}
            onClick={() => {
              soundManager.playClick();
              onSelectChapter(chapterNum);
            }}
            data-cursor={`CH ${ch.num}`}
            className="group flex items-center gap-2.5 py-1 text-right transition-all cursor-pointer"
          >
            {/* Tooltip Label on Hover */}
            <span
              className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isActive ? "text-[#B8FF4A] opacity-100" : "text-[#A6A8AE]"
              }`}
            >
              {ch.name}
            </span>

            {/* Chapter Number */}
            <span
              className={`text-[11px] font-mono transition-colors duration-200 ${
                isActive
                  ? "text-[#B8FF4A] font-bold"
                  : "text-[#666A73] group-hover:text-[#F3F1EA]"
              }`}
            >
              {ch.num}
            </span>

            {/* Node Dot */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2 h-2 bg-[#B8FF4A] shadow-[0_0_10px_#B8FF4A]"
                  : "w-1 h-1 bg-white/20 group-hover:bg-white/60 group-hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
