"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "lime" | "blue" | "gold";
  maxTilt?: number;
  "data-cursor"?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function TiltCard({
  children,
  className,
  glowColor = "lime",
  maxTilt = 7,
  "data-cursor": dataCursor,
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlarePosition({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    lime: "rgba(184, 255, 74, 0.12)",
    blue: "rgba(108, 168, 255, 0.15)",
    gold: "rgba(217, 184, 108, 0.14)",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-[16px] bg-[#0E1117] border border-white/8 transition-colors duration-300 p-6 perspective-1000",
        isHovered && "border-white/18 bg-[#141821]/90 shadow-2xl",
        className
      )}
    >
      {/* Dynamic Cursor Light Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${glarePosition.x}% ${glarePosition.y}%, ${glowStyles[glowColor]}, transparent 70%)`,
        }}
      />

      {/* Card Content with 3D Depth */}
      <div className="relative z-10 [transform:translateZ(20px)] transition-transform duration-200">
        {children}
      </div>
    </motion.div>
  );
}
