"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { skillsData, skillCategories, SkillCategory, SkillItem } from "@/data/skills";
import { soundManager } from "@/lib/sound";
import { ArrowUpRight } from "lucide-react";

interface SkillOrbitSceneProps {
  selectedCategory: SkillCategory;
  onSelectCategory: (cat: SkillCategory) => void;
  onInspectSkill?: (skill: SkillItem) => void;
}

export function SkillOrbitScene({
  selectedCategory,
  onSelectCategory,
  onInspectSkill,
}: SkillOrbitSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const selectedCategoryRef = useRef<SkillCategory>(selectedCategory);
  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Core ("PAVAN")
    const coreGeo = new THREE.OctahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0e1117,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const coreInnerGeo = new THREE.SphereGeometry(0.48, 20, 20);
    const coreInnerMat = new THREE.MeshBasicMaterial({ color: 0xb8ff4a });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    group.add(coreInner);

    // 2. Orbital Rings with Reference Handles
    const orbitRadii = [2.2, 2.8, 3.4, 4.0, 4.6];
    const ringMeshes: THREE.Mesh[] = [];

    orbitRadii.forEach((r) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.012, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xb8ff4a,
        transparent: true,
        opacity: 0.15,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      ringMeshes.push(ring);
    });

    // 3. Skill Node Meshes with Luminous Halos
    const nodeMeshes: { [key: string]: THREE.Mesh } = {};
    const haloMeshes: { [key: string]: THREE.Mesh } = {};
    const nodeGeo = new THREE.SphereGeometry(0.22, 20, 20);
    const haloGeo = new THREE.RingGeometry(0.28, 0.34, 32);

    skillsData.forEach((skill, index) => {
      const angle = (index / skillsData.length) * Math.PI * 2;
      const x = Math.cos(angle) * skill.orbitRadius;
      const z = Math.sin(angle) * skill.orbitRadius;

      const isAIML = skill.category === "AI / ML";
      const isProg = skill.category === "PROGRAMMING";
      const isWeb = skill.category === "WEB";

      const colorHex = isProg ? 0xb8ff4a : isAIML ? 0x6ca8ff : isWeb ? 0xd9b86c : 0xf3f1ea;

      const nodeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 1,
      });

      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, 0, z);
      mesh.userData = { skill, angle, radius: skill.orbitRadius, speed: skill.speed };
      group.add(mesh);
      nodeMeshes[skill.id] = mesh;

      // Halo ring around each node
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      mesh.add(halo);
      haloMeshes[skill.id] = halo;
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xb8ff4a, 2.5, 14);
    pointLight.position.set(0, 2.5, 2);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x6ca8ff, 2.0, 12);
    blueLight.position.set(0, -2, -2);
    scene.add(blueLight);

    // Raycasting for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Object.values(nodeMeshes));

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const skill = hit.userData.skill as SkillItem;
        if (skill) {
          setHoveredSkill(skill);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Object.values(nodeMeshes));

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const skill = hit.userData.skill as SkillItem;
        if (skill && onInspectSkill) {
          onInspectSkill(skill);
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

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
      const currentCat = selectedCategoryRef.current;

      // Slow core rotation
      core.rotation.y = time * 0.25;
      core.rotation.x = time * 0.12;

      // Move skill nodes along their orbits
      skillsData.forEach((skill) => {
        const mesh = nodeMeshes[skill.id];
        const halo = haloMeshes[skill.id];
        if (!mesh) return;

        const baseAngle = mesh.userData.angle;
        const currentAngle = baseAngle + time * (skill.speed * 0.28);
        const r = skill.orbitRadius;

        mesh.position.x = Math.cos(currentAngle) * r;
        mesh.position.z = Math.sin(currentAngle) * r;

        // Dynamic Filtering Transformations
        const matchesCat = currentCat === "ALL" || skill.category === currentCat;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const haloMat = halo ? (halo.material as THREE.MeshBasicMaterial) : null;

        if (matchesCat) {
          // Highlight active matching nodes
          const targetScale = currentCat === "ALL" ? 1.0 : 1.7;
          mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          mat.opacity = 1.0;
          mat.emissiveIntensity = currentCat === "ALL" ? 0.6 : 1.2;
          if (haloMat) haloMat.opacity = currentCat === "ALL" ? 0.5 : 0.95;
        } else {
          // Dim and shrink non-matching nodes
          mesh.scale.lerp(new THREE.Vector3(0.35, 0.35, 0.35), 0.1);
          mat.opacity = 0.12;
          mat.emissiveIntensity = 0.1;
          if (haloMat) haloMat.opacity = 0.05;
        }
      });

      // Rings luminosity reaction to filter
      ringMeshes.forEach((ring) => {
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = currentCat === "ALL" ? 0.15 : 0.35;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreInnerGeo.dispose();
      coreInnerMat.dispose();
      nodeGeo.dispose();
      haloGeo.dispose();
    };
  }, [onInspectSkill]);

  const matchingCount =
    selectedCategory === "ALL"
      ? skillsData.length
      : skillsData.filter((s) => s.category === selectedCategory).length;

  return (
    <div className="relative w-full rounded-[24px] bg-[#090B10] border border-white/12 p-6 sm:p-8 flex flex-col shadow-2xl">
      {/* 1. Category Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 z-10 border-b border-white/8 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {skillCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "ALL"
                ? skillsData.length
                : skillsData.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  onSelectCategory(cat);
                }}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#B8FF4A] text-[#050507] font-bold shadow-[0_0_20px_rgba(184,255,74,0.4)] scale-105"
                    : "bg-[#141824] text-[#A6A8AE] hover:text-[#F3F1EA] hover:bg-[#1B2232] border border-white/10"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[#050507]/20 text-[#050507]" : "bg-white/8 text-[#666A73]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter telemetry readout */}
        <div className="text-xs font-mono text-[#A6A8AE] hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8FF4A] shadow-[0_0_8px_#B8FF4A]" />
          <span>
            ACTIVE FILTER: <span className="text-[#B8FF4A] font-bold">{selectedCategory}</span> (
            {matchingCount} NODES)
          </span>
        </div>
      </div>

      {/* 2. 3D Orbit Viewport */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-[18px] overflow-hidden bg-[#050507]/90 border border-white/8 shadow-inner">
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab" />

        {/* Central Core Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
          <div className="text-xs font-mono tracking-[0.2em] text-[#B8FF4A] font-bold">
            PAVAN CORE
          </div>
          <div className="text-[9px] font-mono text-[#6CA8FF] uppercase mt-0.5">
            {selectedCategory === "ALL" ? "ORBITAL KERNEL" : `${selectedCategory} ACTIVE`}
          </div>
        </div>

        {/* Dynamic Hover Detail Card */}
        {hoveredSkill && (
          <div
            onClick={() => onInspectSkill && onInspectSkill(hoveredSkill)}
            data-cursor="INSPECT"
            className="absolute bottom-4 left-4 right-4 sm:right-auto z-20 max-w-sm p-4 rounded-[14px] bg-[#0E1117]/95 border border-white/15 backdrop-blur-md shadow-2xl cursor-pointer group hover:border-[#B8FF4A]/50 transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-mono font-bold text-[#B8FF4A] group-hover:underline">
                {hoveredSkill.name}
              </span>
              <div className="flex items-center gap-1.5 text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#A6A8AE]">
                <span>{hoveredSkill.category}</span>
                <ArrowUpRight className="w-3 h-3 text-[#B8FF4A]" />
              </div>
            </div>
            <p className="text-xs text-[#A6A8AE] font-body mt-1 leading-relaxed">
              {hoveredSkill.description}
            </p>
            <div className="mt-2 text-[9px] font-mono text-[#B8FF4A] tracking-wider uppercase">
              CLICK TO INSPECT ARCHITECTURAL CONTEXT →
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 text-[9px] font-mono text-[#666A73] uppercase pointer-events-none hidden sm:block">
          CLICK OR HOVER NODES TO INSPECT // DRAG TO ROTATE
        </div>
      </div>
    </div>
  );
}
