"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChapterHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  systemTag?: string;
  className?: string;
  align?: "left" | "center";
}

export function ChapterHeader({
  number,
  title,
  subtitle,
  systemTag,
  className,
  align = "left",
}: ChapterHeaderProps) {
  return (
    <div
      className={cn(
        "relative mb-12 sm:mb-16",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {/* Monospace Metadata Rail */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex items-center gap-3 text-xs font-mono uppercase tracking-[0.16em] text-[#B8FF4A] mb-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-[#B8FF4A] shadow-[0_0_8px_#B8FF4A]" />
        <span>{number}</span>
        {systemTag && (
          <>
            <span className="text-white/20">//</span>
            <span className="text-[#A6A8AE]">{systemTag}</span>
          </>
        )}
      </motion.div>

      {/* Massive Editorial Display Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#F3F1EA] uppercase leading-[0.95]"
      >
        {title}
      </motion.h2>

      {/* Supporting Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-[#A6A8AE] font-body max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
