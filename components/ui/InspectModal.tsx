"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";
import { useScrollLock } from "@/lib/useScrollLock";
import { X, CheckCircle, Sparkles, Terminal, BookOpen, Award, ShieldCheck, Tag } from "lucide-react";

export interface InspectItemData {
  type: "identity" | "education" | "course" | "skill" | "achievement" | "journey";
  categoryTag: string;
  title: string;
  subtitle?: string;
  institutionOrOrg?: string;
  badge?: string;
  description: string;
  accentColor?: string;
  metadata?: { label: string; value: string }[];
  tags?: string[];
  bulletPoints?: string[];
}

interface InspectModalProps {
  item: InspectItemData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InspectModal({ item, isOpen, onClose }: InspectModalProps) {
  // Global Lenis & body scroll locking
  useScrollLock(isOpen);

  // Support ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        soundManager.playClick();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  const accent = item.accentColor || "#B8FF4A";

  const getIcon = () => {
    switch (item.type) {
      case "identity":
        return <Terminal className="w-5 h-5" style={{ color: accent }} />;
      case "education":
        return <ShieldCheck className="w-5 h-5" style={{ color: accent }} />;
      case "course":
        return <BookOpen className="w-5 h-5" style={{ color: accent }} />;
      case "achievement":
        return <Award className="w-5 h-5" style={{ color: accent }} />;
      case "skill":
        return <Tag className="w-5 h-5" style={{ color: accent }} />;
      default:
        return <Sparkles className="w-5 h-5" style={{ color: accent }} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspect-modal-title"
          data-lenis-prevent
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop with Blur and Pointer Prevention */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#050507]/90 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative z-10 w-full max-w-2xl bg-[#0E1117] border border-white/12 rounded-[22px] shadow-2xl overflow-hidden flex flex-col my-auto overscroll-contain"
          >
            {/* Top Technical Header */}
            <div className="p-6 border-b border-white/8 flex items-center justify-between bg-[#141821]/80 shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  {getIcon()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase font-bold"
                      style={{ color: accent }}
                    >
                      {item.categoryTag}
                    </span>
                    {item.badge && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold"
                        style={{
                          backgroundColor: `${accent}18`,
                          color: accent,
                          border: `1px solid ${accent}40`,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    id="inspect-modal-title"
                    className="text-xl sm:text-2xl font-display font-extrabold text-[#F3F1EA] tracking-tight mt-0.5"
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                data-cursor="CLOSE"
                aria-label="Close inspection popup"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#A6A8AE] hover:text-[#F3F1EA] transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div
              data-lenis-prevent
              className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto overscroll-contain"
            >
              {/* Institution / Subtitle line */}
              {(item.subtitle || item.institutionOrOrg) && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#6CA8FF] border-b border-white/6 pb-3">
                  {item.institutionOrOrg && (
                    <span className="text-[#F3F1EA] font-medium">
                      {item.institutionOrOrg}
                    </span>
                  )}
                  {item.subtitle && item.institutionOrOrg && (
                    <span className="text-white/20">//</span>
                  )}
                  {item.subtitle && (
                    <span className="text-[#A6A8AE]">{item.subtitle}</span>
                  )}
                </div>
              )}

              {/* Detailed Description */}
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#666A73] mb-2">
                  VERIFIED PROFILE CONTEXT
                </h4>
                <p className="text-sm sm:text-base text-[#F3F1EA]/90 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Metadata Key-Value pairs if any */}
              {item.metadata && item.metadata.length > 0 && (
                <div className="grid grid-cols-2 gap-3 p-4 rounded-[12px] bg-[#090B10] border border-white/6">
                  {item.metadata.map((meta, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-[9px] font-mono uppercase text-[#666A73]">
                        {meta.label}
                      </div>
                      <div className="text-xs font-mono font-medium text-[#F3F1EA]">
                        {meta.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullet Points / Details if any */}
              {item.bulletPoints && item.bulletPoints.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#666A73]">
                    CURRICULUM & CORE COMPETENCIES
                  </h4>
                  <div className="space-y-2">
                    {item.bulletPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[#A6A8AE] font-body leading-normal"
                      >
                        <CheckCircle
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: accent }}
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated Tags */}
              {item.tags && item.tags.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#666A73] mb-2">
                    TECHNICAL TAGS & FRAMEWORKS
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-[6px] bg-white/5 border border-white/8 text-[10px] font-mono text-[#F3F1EA]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            <div className="p-4 sm:p-5 border-t border-white/8 bg-[#141821]/80 flex items-center justify-between text-[10px] font-mono text-[#666A73] shrink-0">
              <span>PAVAN.OS // TELEMETRY DETAIL VERIFIED</span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-4 py-1.5 rounded-[6px] bg-white/10 hover:bg-white/20 text-[#F3F1EA] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
