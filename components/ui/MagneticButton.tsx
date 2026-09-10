"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sound";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  cursorLabel = "ENTER",
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.25;
    const distanceY = (e.clientY - centerY) * 0.25;

    const clampedX = Math.max(-12, Math.min(12, distanceX));
    const clampedY = Math.max(-12, Math.min(12, distanceY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playClick();
    if (onClick) onClick(e);
  };

  const variants = {
    primary:
      "bg-[#B8FF4A] text-[#050507] hover:bg-[#D5FF8A] font-medium shadow-[0_0_20px_-5px_rgba(184,255,74,0.3)]",
    secondary:
      "bg-[#141821] text-[#F3F1EA] hover:bg-[#1B202A] border border-white/10 hover:border-[#B8FF4A]/40",
    outline:
      "bg-transparent text-[#F3F1EA] border border-white/15 hover:border-[#B8FF4A] hover:text-[#B8FF4A]",
    ghost:
      "bg-transparent text-[#A6A8AE] hover:text-[#F3F1EA] hover:bg-white/5",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor={cursorLabel}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[8px] text-xs font-mono uppercase tracking-[0.12em] transition-colors duration-200 cursor-pointer select-none",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
