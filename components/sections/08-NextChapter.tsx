"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { profileData } from "@/data/profile";
import { soundManager } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Mail, Copy, Check, ArrowUpRight, Sparkles } from "lucide-react";

export function NextChapterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerCelebration = () => {
    soundManager.playChirp(880, 0.15, 0.1);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#B8FF4A", "#6CA8FF", "#F3F1EA"],
    });
  };

  return (
    <section
      id="contact"
      aria-label="Chapter 08: Next Chapter"
      className="relative w-full min-h-[90vh] py-28 sm:py-36 px-6 sm:px-12 flex flex-col justify-between max-w-7xl mx-auto text-center"
    >
      {/* Background Calming Radial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-accent opacity-20 pointer-events-none" />

      {/* Top Completion Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8FF4A]/10 border border-[#B8FF4A]/30 text-xs font-mono text-[#B8FF4A] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 08 // MISSION COMPLETE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#F3F1EA] uppercase mt-4">
          THE NEXT CHAPTER
          <br />
          <span className="text-[#B8FF4A]">ISN&apos;T WRITTEN YET.</span>
        </h2>
      </motion.div>

      {/* Center Cinematic Statement & Actions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="my-16 max-w-2xl mx-auto space-y-8"
      >
        <p className="text-base sm:text-xl font-body text-[#A6A8AE] font-light leading-relaxed">
          Open to software engineering roles, AI/ML research collaborations, and innovative product developments.
        </p>

        <div className="text-xl sm:text-2xl font-display font-bold text-[#F3F1EA] tracking-wide">
          PAVAN BHOSALE — LET&apos;S BUILD SOMETHING WORTH EXPLORING.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerCelebration}
            className="cursor-pointer"
          >
            <MagneticButton
              variant="primary"
              cursorLabel="CONNECT"
              className="gap-2.5 px-7 py-4 text-xs font-mono font-bold"
            >
              <LinkedInIcon className="w-4 h-4 text-[#050507]" />
              <span>CONNECT ON LINKEDIN</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </a>

          <a
            href={`mailto:${profileData.email}`}
            onClick={triggerCelebration}
            className="cursor-pointer"
          >
            <MagneticButton
              variant="secondary"
              cursorLabel="EMAIL"
              className="gap-2.5 px-7 py-4 text-xs font-mono"
            >
              <Mail className="w-4 h-4 text-[#B8FF4A]" />
              <span>SEND AN EMAIL</span>
            </MagneticButton>
          </a>

          <button
            onClick={handleCopyEmail}
            data-cursor="COPY"
            className="px-5 py-4 rounded-[8px] bg-white/5 hover:bg-white/10 border border-white/10 text-[#A6A8AE] hover:text-[#F3F1EA] text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#B8FF4A]" />
                <span className="text-[#B8FF4A]">COPIED ADDRESS</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Bottom Telemetry Footer */}
      <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666A73]">
        <div>
          PAVAN.OS // SESSION TERMINATED IN SECURE STATE
        </div>
        <div>
          {profileData.name} © {new Date().getFullYear()} — {profileData.location}
        </div>
      </div>
    </section>
  );
}
