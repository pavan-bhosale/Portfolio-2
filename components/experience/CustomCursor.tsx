"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 35, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check target element for custom cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const clickable = target.closest("button, a, input, textarea, select, [role='button']");
        if (clickable) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const hasLabel = Boolean(cursorText);

  return (
    <>
      {/* Subtle trail dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1.5 h-1.5 rounded-full bg-[#B8FF4A]/40 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trailX,
          y: trailY,
        }}
      />

      {/* Main contextual cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: hasLabel ? 54 : isHovered ? 32 : isClicking ? 4 : 6,
          height: hasLabel ? 54 : isHovered ? 32 : isClicking ? 4 : 6,
          backgroundColor: hasLabel
            ? "rgba(184, 255, 74, 0.95)"
            : isHovered
            ? "rgba(184, 255, 74, 0.15)"
            : "rgba(243, 241, 234, 0.9)",
          border: isHovered && !hasLabel ? "1px solid rgba(184, 255, 74, 0.8)" : "none",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {hasLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono font-bold tracking-wider text-[#050507] select-none text-center px-1 uppercase leading-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
