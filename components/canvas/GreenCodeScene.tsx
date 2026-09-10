"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundManager } from "@/lib/sound";
import { Zap, CheckCircle2, Cpu, Activity, ArrowRight, ShieldCheck, Layers } from "lucide-react";

const PIPELINE_STEPS = [
  { step: "01", label: "CODE", desc: "AST & Loop Profiling" },
  { step: "02", label: "COMPUTATION", desc: "CPU / Memory Cycles" },
  { step: "03", label: "ENERGY", desc: "Wattage Draw Mapping" },
  { step: "04", label: "CARBON", desc: "Grid Emissions Index" },
  { step: "05", label: "CLOUD COST", desc: "Instance Infrastructure" },
  { step: "06", label: "OPTIMIZATION", desc: "Eco-Efficiency Synthesis" },
];

export function GreenCodeScene({ onInspect }: { onInspect?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOptimized, setIsOptimized] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stateRef = useRef({ isOptimized: false });
  useEffect(() => {
    stateRef.current.isOptimized = isOptimized;
  }, [isOptimized]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    // Light, controlled fog to preserve dark cinematic mood without submerging geometry into pitch blackness
    scene.fog = new THREE.FogExp2(0x050507, 0.015);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.8, 7.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Glowing Floor Grid & Bus Circuit Traces
    const gridHelper = new THREE.GridHelper(12, 24, 0xb8ff4a, 0x1f2937);
    gridHelper.position.y = -1.1;
    group.add(gridHelper);

    // Glowing Bus Lines along the floor
    const busLineCount = 5;
    const busLineGeo = new THREE.BufferGeometry();
    const busLineMat = new THREE.LineBasicMaterial({
      color: 0xb8ff4a,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < busLineCount; i++) {
      const z = (i - 2) * 1.2;
      const pts = [new THREE.Vector3(-4.5, -1.08, z), new THREE.Vector3(4.5, -1.08, z)];
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), busLineMat);
      group.add(line);
    }

    // 2. High-Contrast Server & Computation Columns with Luminous Edge Geometry
    const boxGeo = new THREE.BoxGeometry(0.42, 1.2, 0.42);
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);

    const pillars: {
      mesh: THREE.Mesh;
      edges: THREE.LineSegments;
      baseY: number;
    }[] = [];

    const rows = 4;
    const cols = 7;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pillarMat = new THREE.MeshStandardMaterial({
          color: 0x141824,
          roughness: 0.2,
          metalness: 0.85,
          emissive: 0x081008,
          emissiveIntensity: 0.5,
        });

        const edgeMat = new THREE.LineBasicMaterial({
          color: 0xb8ff4a,
          transparent: true,
          opacity: 0.85,
        });

        const mesh = new THREE.Mesh(boxGeo, pillarMat);
        const edges = new THREE.LineSegments(edgesGeo, edgeMat);
        mesh.add(edges);

        mesh.position.set((c - 3) * 0.95, -0.5, (r - 1.5) * 1.1);
        group.add(mesh);

        pillars.push({ mesh, edges, baseY: mesh.position.y });
      }
    }

    // 3. Central Luminous Energy Core / Stream Generator
    const coreGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.4, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xb8ff4a,
      emissive: 0xb8ff4a,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.75,
      wireframe: true,
    });
    const energyCore = new THREE.Mesh(coreGeo, coreMat);
    energyCore.position.set(0, 0.2, 0);
    group.add(energyCore);

    // 4. Energy & Carbon Particles with Additive Glow Blending
    const particleCount = 280;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = Math.random() * 3.5 - 1.0;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      pSpeeds[i] = 0.015 + Math.random() * 0.025;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xb8ff4a,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(pGeo, pMat);
    group.add(particleSystem);

    // 5. Crisp Directional and Accent Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xb8ff4a, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const cyanLight = new THREE.DirectionalLight(0x6ca8ff, 2.2);
    cyanLight.position.set(-5, 4, -3);
    scene.add(cyanLight);

    const pointLight = new THREE.PointLight(0xb8ff4a, 2.5, 12);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;
      const optimized = stateRef.current.isOptimized;

      // Group rotation
      group.rotation.y = time * 0.06;

      // Core rotation and breathing
      energyCore.rotation.y = time * 0.4;
      const coreScale = 1 + Math.sin(time * 3) * 0.08;
      energyCore.scale.set(coreScale, 1, coreScale);

      // Dynamic pillar heights and visual feedback
      pillars.forEach((p, idx) => {
        const wave = Math.sin(time * (optimized ? 1.5 : 4.0) + idx * 0.25);
        const targetScaleY = optimized ? 0.85 + wave * 0.2 : 1.5 + wave * 0.9;
        p.mesh.scale.y += (targetScaleY - p.mesh.scale.y) * 0.12;
        p.mesh.position.y = -1.1 + (p.mesh.scale.y * 1.2) / 2;

        const mat = p.mesh.material as THREE.MeshStandardMaterial;
        const edgeMat = p.edges.material as THREE.LineBasicMaterial;

        if (optimized) {
          mat.emissive.setHex(0x0e2814);
          mat.color.setHex(0x112418);
          edgeMat.color.setHex(0xb8ff4a);
        } else {
          // Unoptimized: Warning amber-orange pulse
          mat.emissive.setHex(0x331808);
          mat.color.setHex(0x241410);
          edgeMat.color.setHex(0xff7733);
        }
      });

      // Particle system movement
      const posAttr = pGeo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const speed = optimized ? pSpeeds[i] * 0.7 : pSpeeds[i] * 2.6;
        arr[i * 3 + 1] += speed;
        if (arr[i * 3 + 1] > 3.2) {
          arr[i * 3 + 1] = -1.0;
        }
      }
      posAttr.needsUpdate = true;

      // Dynamic lighting & particle color shift
      if (optimized) {
        pMat.color.setHex(0xb8ff4a);
        pointLight.color.setHex(0xb8ff4a);
        (energyCore.material as THREE.MeshStandardMaterial).color.setHex(0xb8ff4a);
        (energyCore.material as THREE.MeshStandardMaterial).emissive.setHex(0xb8ff4a);
      } else {
        pMat.color.setHex(0xff7733);
        pointLight.color.setHex(0xff5522);
        (energyCore.material as THREE.MeshStandardMaterial).color.setHex(0xff7733);
        (energyCore.material as THREE.MeshStandardMaterial).emissive.setHex(0xff7733);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      edgesGeo.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      gridHelper.dispose();
    };
  }, []);

  const handleToggle = () => {
    soundManager.playNodePulse(isOptimized ? "blue" : "lime");
    setIsOptimized((prev) => !prev);
  };

  return (
    <div className="relative w-full rounded-[24px] bg-[#090B10] border border-white/12 overflow-hidden shadow-2xl">
      {/* 1. Top High-Contrast Pipeline Flow Rail */}
      <div className="p-4 sm:p-5 bg-[#0E1117]/95 border-b border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOptimized
                  ? "bg-[#B8FF4A] shadow-[0_0_12px_#B8FF4A]"
                  : "bg-[#FF7733] shadow-[0_0_12px_#FF7733]"
              }`}
            />
            <span className="text-xs font-mono font-bold tracking-wider text-[#F3F1EA] uppercase">
              GREENCODE PIPELINE // {isOptimized ? "ECO-OPTIMIZED STATE" : "BASELINE (HIGH INTENSITY)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onInspect && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onInspect();
                }}
                data-cursor="INSPECT"
                className="px-3 py-1 rounded-[6px] bg-white/5 hover:bg-white/10 border border-white/12 text-[10px] font-mono text-[#B8FF4A] hover:text-[#D5FF8A] transition-colors cursor-pointer"
              >
                INSPECT MODEL
              </button>
            )}
          </div>
        </div>

        {/* The 6-Step Visual Flow: Code → Computation → Energy → Carbon → Cloud Cost → Optimization */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <div
                key={step.step}
                onClick={() => {
                  soundManager.playClick();
                  setActiveStepIndex(idx);
                }}
                className={`p-2.5 rounded-[8px] border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#141824] border-[#B8FF4A] shadow-[0_0_15px_-4px_rgba(184,255,74,0.3)]"
                    : "bg-[#0A0D14] border-white/6 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                  <span className="text-[#6CA8FF] font-bold">{step.step}</span>
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <ArrowRight className="w-2.5 h-2.5 text-white/30 hidden lg:block" />
                  )}
                </div>
                <div className="text-xs font-display font-bold text-[#F3F1EA] tracking-wide">
                  {step.label}
                </div>
                <div className="text-[10px] font-body text-[#A6A8AE] mt-0.5 truncate">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. 3D WebGL Viewport (Enhanced High Visibility Canvas) */}
      <div className="relative w-full h-[400px] sm:h-[480px]">
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab" />

        {/* Ambient Top Glow for Depth */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] pointer-events-none transition-colors duration-500 blur-3xl opacity-30 ${
            isOptimized ? "bg-[#B8FF4A]" : "bg-[#FF7733]"
          }`}
        />

        {/* Qualitative Metric Dashboard (High Contrast Overlay) */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2 max-w-md pointer-events-none">
          <div className="px-3.5 py-2 rounded-[10px] bg-[#0E1117]/95 border border-white/15 backdrop-blur-md text-[11px] font-mono shadow-xl">
            <span className="text-[#666A73]">ENERGY DRAW: </span>
            <span
              className={`font-bold ${
                isOptimized ? "text-[#B8FF4A]" : "text-[#FF7733]"
              }`}
            >
              {isOptimized ? "MINIMIZED (CLEAN GRID)" : "ELEVATED (PEAK LOAD)"}
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-[10px] bg-[#0E1117]/95 border border-white/15 backdrop-blur-md text-[11px] font-mono shadow-xl">
            <span className="text-[#666A73]">CARBON IMPACT: </span>
            <span
              className={`font-bold ${
                isOptimized ? "text-[#B8FF4A]" : "text-[#FF7733]"
              }`}
            >
              {isOptimized ? "LOW-EMISSION" : "HIGH-FOOTPRINT"}
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-[10px] bg-[#0E1117]/95 border border-white/15 backdrop-blur-md text-[11px] font-mono shadow-xl">
            <span className="text-[#666A73]">EXECUTION LATENCY: </span>
            <span className="text-[#B8FF4A] font-bold">100% PRESERVED</span>
          </div>
        </div>

        {/* Interactive Optimization State Trigger Button */}
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={handleToggle}
            data-cursor="OPTIMIZE"
            className={`px-5 py-2.5 rounded-[10px] border text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-2xl ${
              isOptimized
                ? "bg-[#B8FF4A] text-[#050507] border-[#B8FF4A] shadow-[0_0_25px_rgba(184,255,74,0.4)] font-bold"
                : "bg-[#0E1117] text-[#F3F1EA] border-white/25 hover:border-[#B8FF4A]/60 hover:bg-[#141824]"
            }`}
          >
            {isOptimized ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>OPTIMIZED STATE ACTIVE (RESET)</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-[#B8FF4A]" />
                <span>TRIGGER ECO-OPTIMIZATION</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
