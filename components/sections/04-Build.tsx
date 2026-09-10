"use client";

import React, { useState } from "react";
import { ChapterHeader } from "@/components/ui/ChapterHeader";
import { NeuroNotesScene } from "@/components/canvas/NeuroNotesScene";
import { GreenCodeScene } from "@/components/canvas/GreenCodeScene";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { InspectModal, InspectItemData } from "@/components/ui/InspectModal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { projectsData, ProjectData } from "@/data/projects";
import { soundManager } from "@/lib/sound";
import { Zap, Compass, ArrowRight } from "lucide-react";

export function BuildSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspectItem, setInspectItem] = useState<InspectItemData | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  const neuronotes = projectsData.find((p) => p.id === "neuronotes")!;
  const greencode = projectsData.find((p) => p.id === "greencode")!;

  const handleOpenProject = (proj: ProjectData) => {
    soundManager.playClick();
    setSelectedProject(proj);
    setIsModalOpen(true);
  };

  const handleInspectStep = (
    step: { label: string; description: string },
    project: ProjectData,
    index: number
  ) => {
    soundManager.playClick();
    setInspectItem({
      type: "identity",
      categoryTag: `${project.title} // PIPELINE NODE 0${index + 1}`,
      title: step.label,
      subtitle: project.subtitle,
      badge: "ARCHITECTURE NODE",
      description: step.description,
      accentColor: project.accentColor,
      metadata: [
        { label: "PARENT SYSTEM", value: project.title },
        { label: "STAGE SEQUENCE", value: `Phase ${index + 1} of ${project.pipelineSteps.length}` },
        { label: "THEME DOMAIN", value: project.theme },
        { label: "EXECUTION", value: "Verified Engineering Pipeline" },
      ],
      tags: project.features.slice(0, 4),
      bulletPoints: [
        `Operational stage designed to guarantee continuous flow within the ${project.title} engine.`,
        `Preserves runtime efficiency while extracting structural representations.`,
        `Integrated directly into the end-to-end user workflows.`,
      ],
    });
    setIsInspectOpen(true);
  };

  return (
    <section
      id="build"
      aria-label="Chapter 04: Build Projects"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto space-y-28 sm:space-y-36"
    >
      <ChapterHeader
        number="CHAPTER 04"
        systemTag="CORE SYSTEMS"
        title="WHAT I BUILD"
        subtitle="Two interactive engineering universes: intelligent assistive learning platforms and green computing carbon prediction models."
      />

      {/* ========================================================
          PROJECT WORLD 01: NEURONOTES
      ======================================================== */}
      <div className="relative rounded-[28px] bg-[#0E1117] border border-white/12 p-6 sm:p-10 space-y-8 overflow-hidden shadow-2xl">
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 glow-neural opacity-30 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/8 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#6CA8FF] tracking-widest uppercase mb-2">
              <span>PROJECT // {neuronotes.number}</span>
              <span className="text-white/20">//</span>
              <span>{neuronotes.category}</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight">
              {neuronotes.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#A6A8AE] mt-2 max-w-2xl">
              {neuronotes.subtitle}
            </p>
          </div>

          <MagneticButton
            onClick={() => handleOpenProject(neuronotes)}
            cursorLabel="EXPLORE"
            variant="secondary"
            className="border-[#6CA8FF]/40 text-[#6CA8FF] hover:bg-[#6CA8FF] hover:text-[#050507]"
          >
            <span>TEST-DRIVE NEURONOTES</span>
            <Compass className="w-4 h-4" />
          </MagneticButton>
        </div>

        {/* 3D Neural Knowledge System */}
        <NeuroNotesScene
          onInspectNode={(node) => {
            soundManager.playClick();
            setInspectItem({
              type: "identity",
              categoryTag: `NEURONOTES // ${node.stage} ARCHITECTURE`,
              title: node.label,
              subtitle: node.sublabel,
              badge: node.stage,
              description: node.description,
              accentColor: node.accentColor,
              metadata: [
                { label: "SYSTEM DOMAIN", value: "NeuroNotes 3D Knowledge Graph" },
                { label: "PIPELINE STAGE", value: node.stage },
                { label: "DATA CLUSTER", value: node.category },
                { label: "VERIFICATION", value: "Verified Active Recall Engine" },
              ],
              tags: node.stats.map((s) => `${s.label}: ${s.val}`),
              bulletPoints: [
                `Direct architectural component of the NeuroNotes study acceleration pipeline.`,
                `Preserves semantic accuracy while translating unstructured input into active learning artifacts.`,
                `Engineered for low-latency feedback and frictionless student engagement.`,
              ],
            });
            setIsInspectOpen(true);
          }}
          onTestDrive={() => handleOpenProject(neuronotes)}
        />

        {/* Pipeline & Narrative Flow Cards (Clickable to Inspect) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {neuronotes.pipelineSteps.map((step, idx) => (
            <div
              key={step.label}
              onClick={() => handleInspectStep(step, neuronotes, idx)}
              data-cursor="INSPECT"
              className="p-5 rounded-[14px] bg-[#141824]/80 border border-white/8 hover:border-[#6CA8FF]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#6CA8FF] tracking-wider uppercase font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#666A73] group-hover:text-[#6CA8FF] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-sm font-display font-bold text-[#F3F1EA] mt-1 mb-2 group-hover:text-[#6CA8FF] transition-colors">
                  {step.label}
                </h4>
                <p className="text-xs text-[#A6A8AE] font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          TRANSITION CONDUIT: Synapses dissolve into Green Energy
      ======================================================== */}
      <div className="relative py-8 flex flex-col items-center justify-center text-center">
        <div className="w-px h-16 bg-gradient-to-b from-[#6CA8FF] via-white/30 to-[#B8FF4A]" />
        <div className="my-3 px-4 py-1.5 rounded-full bg-[#0E1117] border border-white/10 text-[10px] font-mono text-[#A6A8AE] tracking-widest uppercase">
          ENERGY STATE TRANSFORMATION // FROM NEURAL LOGIC TO ECO-EFFICIENCY
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-[#B8FF4A] to-transparent" />
      </div>

      {/* ========================================================
          PROJECT WORLD 02: GREENCODE (High Contrast & Clear Hierarchy)
      ======================================================== */}
      <div className="relative rounded-[28px] bg-[#0E1117] border border-white/12 p-6 sm:p-10 space-y-8 overflow-hidden shadow-2xl">
        {/* Glow Accent */}
        <div className="absolute -top-24 -left-24 w-96 h-96 glow-accent opacity-30 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/8 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#B8FF4A] tracking-widest uppercase mb-2">
              <span>PROJECT // {greencode.number}</span>
              <span className="text-white/20">//</span>
              <span>{greencode.category}</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight">
              {greencode.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#A6A8AE] mt-2 max-w-2xl">
              {greencode.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={() => handleOpenProject(greencode)}
              cursorLabel="EXPLORE"
              variant="secondary"
              className="border-[#B8FF4A]/40 text-[#B8FF4A] hover:bg-[#B8FF4A] hover:text-[#050507]"
            >
              <span>INSPECT GREENCODE ENGINE</span>
              <Zap className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Enhanced High-Visibility 3D GreenCode Scene with Pipeline Rail */}
        <GreenCodeScene onInspect={() => handleOpenProject(greencode)} />

        {/* Sustainable Software Architecture Capabilities (Clickable to Inspect) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-4">
          {greencode.pipelineSteps.map((step, idx) => (
            <div
              key={step.label}
              onClick={() => handleInspectStep(step, greencode, idx)}
              data-cursor="INSPECT"
              className="p-4 rounded-[14px] bg-[#141824]/90 border border-white/10 hover:border-[#B8FF4A]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#B8FF4A] tracking-wider uppercase font-bold">
                    NODE 0{idx + 1}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#666A73] group-hover:text-[#B8FF4A] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-xs font-display font-bold text-[#F3F1EA] mt-1 mb-1.5 group-hover:text-[#B8FF4A] transition-colors">
                  {step.label}
                </h4>
                <p className="text-[11px] text-[#A6A8AE] font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Interactive Walkthrough Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* General Inspection Modal for Architecture Nodes */}
      <InspectModal
        item={inspectItem}
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
      />
    </section>
  );
}
