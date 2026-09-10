"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/data/projects";
import { soundManager } from "@/lib/sound";
import { useScrollLock } from "@/lib/useScrollLock";
import { X, CheckCircle, FileText, Cpu, BookOpen, MessageSquare, ArrowRight, Zap } from "lucide-react";

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);

  // Global Lenis scroll lock
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const isNeuroNotes = project.id === "neuronotes";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop */}
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative z-10 w-full max-w-4xl max-h-[88vh] bg-[#0E1117] border border-white/12 rounded-[24px] shadow-2xl overflow-hidden flex flex-col overscroll-contain my-auto"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/8 flex items-center justify-between bg-[#141821]/80">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF4A] shadow-[0_0_10px_#B8FF4A]" />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#B8FF4A] uppercase">
                    PROJECT EXPLORATION // {project.category}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#F3F1EA]">
                    {project.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                data-cursor="CLOSE"
                aria-label="Close project walkthrough"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#A6A8AE] hover:text-[#F3F1EA] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Project Subtitle & Description */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#6CA8FF] mb-2">
                  {project.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#A6A8AE] font-body leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Interactive Simulation Workflow */}
              {isNeuroNotes ? (
                <div className="rounded-[18px] bg-[#090B10] border border-white/8 p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#6CA8FF]" />
                      <span className="text-xs font-mono font-bold text-[#F3F1EA] tracking-wider uppercase">
                        INTERACTIVE WORKFLOW PROTOTYPE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#666A73]">
                      STEP {activeStep + 1} OF 4
                    </span>
                  </div>

                  {/* Step Selector Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {["1. INGEST", "2. PARSE", "3. FLASHCARDS", "4. QUIZ"].map((label, idx) => (
                      <button
                        key={label}
                        onClick={() => {
                          soundManager.playClick();
                          setActiveStep(idx);
                        }}
                        className={`py-2 px-3 rounded-[8px] text-[11px] font-mono transition-all cursor-pointer ${
                          activeStep === idx
                            ? "bg-[#6CA8FF] text-[#050507] font-bold"
                            : "bg-white/5 text-[#A6A8AE] hover:text-[#F3F1EA]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Step Content */}
                  {activeStep === 0 && (
                    <div className="p-6 rounded-[14px] bg-[#0E1117] border border-dashed border-white/15 text-center">
                      <FileText className="w-8 h-8 text-[#6CA8FF] mx-auto mb-3" />
                      <div className="text-sm font-display font-bold text-[#F3F1EA]">
                        Multi-Format Ingestion Engine
                      </div>
                      <p className="text-xs text-[#A6A8AE] font-body mt-1 max-w-md mx-auto">
                        Accepts raw handwritten lecture notes, textbook PDFs, presentation slides (PPTs), and recorded lectures.
                      </p>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {project.supportedInputs?.map((inp) => (
                          <span
                            key={inp}
                            className="px-3 py-1 rounded-full bg-[#6CA8FF]/10 text-[#6CA8FF] text-[10px] font-mono"
                          >
                            + {inp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="p-6 rounded-[14px] bg-[#0E1117] border border-white/10 space-y-3 font-mono text-xs">
                      <div className="text-[#6CA8FF] text-[11px]">// SEMANTIC DECOMPOSITION STREAM:</div>
                      <div className="text-white/80">[0.04s] Tokenizing raw document chunks...</div>
                      <div className="text-white/80">[0.12s] Generating conceptual semantic vectors...</div>
                      <div className="text-white/80">[0.21s] Extracting high-yield recall prompts...</div>
                      <div className="text-[#B8FF4A] flex items-center gap-2 mt-3">
                        <CheckCircle className="w-4 h-4" />
                        <span>KNOWLEDGE GRAPH READY FOR SYNTHESIS</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="text-center">
                      <div
                        onClick={() => {
                          soundManager.playClick();
                          setIsFlashcardFlipped(!isFlashcardFlipped);
                        }}
                        data-cursor="FLIP"
                        className="cursor-pointer min-h-[140px] p-6 rounded-[14px] bg-[#141821] border border-[#6CA8FF]/30 hover:border-[#6CA8FF] transition-all flex flex-col items-center justify-center"
                      >
                        <span className="text-[10px] font-mono text-[#6CA8FF] mb-2 uppercase">
                          {isFlashcardFlipped ? "FLASHCARD ANSWER (CLICK TO FLIP)" : "FLASHCARD QUESTION (CLICK TO FLIP)"}
                        </span>
                        <p className="text-base font-display font-bold text-[#F3F1EA]">
                          {isFlashcardFlipped
                            ? "Generates spaced-repetition prompts to maximize active recall and cognitive retention."
                            : "How does NeuroNotes automate knowledge retention from study notes?"}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="p-5 rounded-[14px] bg-[#0E1117] border border-white/10">
                      <div className="text-[11px] font-mono text-[#6CA8FF] mb-2">
                        AUTO-GENERATED QUIZ QUESTION //
                      </div>
                      <div className="text-sm font-display font-bold text-[#F3F1EA] mb-4">
                        Which of the following describes the key capability of NeuroNotes?
                      </div>

                      <div className="space-y-2">
                        {[
                          "Converting passive materials into flashcards, quizzes & study guidance",
                          "Only editing raw video files without text extraction",
                          "Manually scheduling calendar invites",
                        ].map((opt, idx) => {
                          const isCorrect = idx === 0;
                          const isPicked = quizSelected === idx;

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                soundManager.playClick();
                                setQuizSelected(idx);
                              }}
                              className={`w-full text-left p-3 rounded-[8px] text-xs font-body transition-colors cursor-pointer border ${
                                isPicked
                                  ? isCorrect
                                    ? "bg-[#B8FF4A]/15 border-[#B8FF4A] text-[#F3F1EA]"
                                    : "bg-red-500/15 border-red-500 text-red-200"
                                  : "bg-white/5 border-white/5 hover:border-white/20 text-[#A6A8AE]"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* GreenCode Details */
                <div className="rounded-[18px] bg-[#090B10] border border-white/8 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8FF4A] tracking-wider uppercase">
                    <Zap className="w-4 h-4" />
                    <span>SUSTAINABLE SOFTWARE ARCHITECTURE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A6A8AE] font-body leading-relaxed">
                    Evaluates computational cost, algorithm complexity, and hardware power states to estimate carbon emissions and cloud computing billing. It refactors code structures to yield lower environmental impact while preserving execution correctness and latency.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-[12px] bg-[#0E1117] border border-white/8">
                      <div className="text-xs font-mono text-[#B8FF4A] font-bold mb-1">
                        CARBON ESTIMATION
                      </div>
                      <div className="text-xs text-[#A6A8AE] font-body">
                        Direct correlation of compute instruction cycles to regional grid carbon emission metrics.
                      </div>
                    </div>
                    <div className="p-4 rounded-[12px] bg-[#0E1117] border border-white/8">
                      <div className="text-xs font-mono text-[#B8FF4A] font-bold mb-1">
                        CLOUD COST PREDICTION
                      </div>
                      <div className="text-xs text-[#A6A8AE] font-body">
                        Predicts cloud instance tiering and resource costs before deploying into production clusters.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Features List */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#F3F1EA] mb-3">
                  KEY FEATURES & CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-[10px] bg-white/3 border border-white/6 flex items-start gap-2.5 text-xs text-[#F3F1EA]/90 font-body"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#B8FF4A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/8 flex items-center justify-between bg-[#141821]/80">
              <span className="text-[11px] font-mono text-[#666A73]">
                PROJECT NODE // VERIFIED REPOSITORY SPECIFICATION
              </span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-5 py-2 rounded-[8px] bg-white/10 hover:bg-white/20 text-[#F3F1EA] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                CLOSE EXPLORATION
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
