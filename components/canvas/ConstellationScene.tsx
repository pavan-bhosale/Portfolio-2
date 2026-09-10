"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { achievementsData, AchievementItem } from "@/data/achievements";
import { soundManager } from "@/lib/sound";
import {
  Award,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  FileCode,
  Plane,
  TrendingUp,
  Cpu,
} from "lucide-react";

interface ConstellationSceneProps {
  onInspectAchievement?: (ach: AchievementItem) => void;
}

export function ConstellationScene({ onInspectAchievement }: ConstellationSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem>(
    achievementsData[0]
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.0, 8.4);

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

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 2. Central Engineering Core (Body of Work Anchor)
    const centralGroup = new THREE.Group();
    centralGroup.position.set(0, 0, 0);
    constellationGroup.add(centralGroup);

    // Central Core Mesh: Golden Octahedron with Wireframe Halo
    const centralGeo = new THREE.OctahedronGeometry(0.72, 1);
    const centralMat = new THREE.MeshStandardMaterial({
      color: 0xd9b86c,
      emissive: 0x443311,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.9,
    });
    const centralMesh = new THREE.Mesh(centralGeo, centralMat);
    centralGroup.add(centralMesh);

    // Central Wireframe Shell
    const centralWireGeo = new THREE.OctahedronGeometry(0.92, 1);
    const centralWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const centralWire = new THREE.Mesh(centralWireGeo, centralWireMat);
    centralGroup.add(centralWire);

    // Orbital Rings around Central Core
    const coreRingGeo = new THREE.TorusGeometry(1.3, 0.015, 16, 64);
    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0xd9b86c,
      transparent: true,
      opacity: 0.45,
    });
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    coreRing.rotation.x = Math.PI * 0.4;
    centralGroup.add(coreRing);

    // 3. Orbiting Achievement Milestones with Distinct 3D Visual Identities
    // Node 0: GreenCode INDIACom (Research / Green Computing)
    // Node 1: Airnova (Glider Aerodynamics / 1st Place IIT BHU)
    // Node 2: Oscillations (Technical Presentation / 1st Prize)
    const nodeCoords: [number, number, number][] = [
      [-2.8, 1.2, 0.4],  // GreenCode Research
      [2.9, 0.9, 0.6],   // Airnova Glider
      [0.0, -2.1, -0.4], // Oscillations Award
    ];

    const achievementMeshGroups: THREE.Group[] = [];
    const interactiveClickMeshes: THREE.Object3D[] = [];

    achievementsData.forEach((item, idx) => {
      const nodeGrp = new THREE.Group();
      nodeGrp.position.set(...nodeCoords[idx]);
      nodeGrp.userData = { achievement: item, index: idx };

      const colorHex =
        item.id === "greencode-indiacom"
          ? 0xb8ff4a
          : item.id === "airnova-glider"
          ? 0xd9b86c
          : 0x6ca8ff;

      if (item.id === "greencode-indiacom") {
        // Research Milestone: Futuristic Floating Research Matrix / Hex Prism
        const prismGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.4, 6);
        const prismMat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: 0x224411,
          emissiveIntensity: 0.9,
          roughness: 0.2,
          metalness: 0.85,
        });
        const prism = new THREE.Mesh(prismGeo, prismMat);
        prism.rotation.x = Math.PI * 0.3;
        prism.userData = { achievement: item, index: idx };
        nodeGrp.add(prism);
        interactiveClickMeshes.push(prism);

        // Research Wireframe Outer Edge
        const edges = new THREE.EdgesGeometry(prismGeo);
        const edgeMat = new THREE.LineBasicMaterial({ color: 0xb8ff4a, transparent: true, opacity: 0.8 });
        const edgeMesh = new THREE.LineSegments(edges, edgeMat);
        prism.add(edgeMesh);

        // Circular Floating Matrix Halo
        const ringGeo = new THREE.RingGeometry(0.65, 0.72, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xb8ff4a, side: THREE.DoubleSide, transparent: true, opacity: 0.65 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        nodeGrp.add(ring);
      } else if (item.id === "airnova-glider") {
        // Aerodynamic Milestone: Swept-wing Glider Airfoil Tetrahedron / Wing Diamond
        const gliderGeo = new THREE.ConeGeometry(0.55, 1.1, 4);
        const gliderMat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: 0x443311,
          emissiveIntensity: 0.85,
          roughness: 0.2,
          metalness: 0.9,
        });
        const glider = new THREE.Mesh(gliderGeo, gliderMat);
        glider.rotation.z = -Math.PI * 0.25;
        glider.rotation.x = Math.PI * 0.2;
        glider.userData = { achievement: item, index: idx };
        nodeGrp.add(glider);
        interactiveClickMeshes.push(glider);

        // Swept Wing Ribs
        const edges = new THREE.EdgesGeometry(gliderGeo);
        const edgeMat = new THREE.LineBasicMaterial({ color: 0xd9b86c, transparent: true, opacity: 0.8 });
        const edgeMesh = new THREE.LineSegments(edges, edgeMat);
        glider.add(edgeMesh);

        // Aerodynamic Streamline Halo Ring
        const ringGeo = new THREE.RingGeometry(0.7, 0.78, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xd9b86c, side: THREE.DoubleSide, transparent: true, opacity: 0.65 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI * 0.3;
        nodeGrp.add(ring);
      } else {
        // Presentation Award Milestone: Eco-AI Dual Resonance Sphere & Torus
        const sphereGeo = new THREE.DodecahedronGeometry(0.48, 1);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: 0x112244,
          emissiveIntensity: 0.85,
          roughness: 0.2,
          metalness: 0.85,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.userData = { achievement: item, index: idx };
        nodeGrp.add(sphere);
        interactiveClickMeshes.push(sphere);

        // Torus Ring
        const ringGeo = new THREE.TorusGeometry(0.72, 0.02, 16, 48);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x6ca8ff, transparent: true, opacity: 0.7 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.y = Math.PI * 0.4;
        nodeGrp.add(ring);
      }

      constellationGroup.add(nodeGrp);
      achievementMeshGroups.push(nodeGrp);
    });

    // 4. Energy Beams from Central Focal Core to Achievement Nodes
    const centralPos = new THREE.Vector3(0, 0, 0);
    nodeCoords.forEach((coord, i) => {
      const targetPos = new THREE.Vector3(...coord);
      const points = [centralPos, targetPos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

      const colorHex =
        i === 0 ? 0xb8ff4a : i === 1 ? 0xd9b86c : 0x6ca8ff;

      const beamMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.5,
      });
      const beam = new THREE.Line(lineGeo, beamMat);
      constellationGroup.add(beam);
    });

    // Outer Constellation Triangle Vectors connecting the 3 nodes
    const trianglePoints = [
      new THREE.Vector3(...nodeCoords[0]),
      new THREE.Vector3(...nodeCoords[1]),
      new THREE.Vector3(...nodeCoords[2]),
      new THREE.Vector3(...nodeCoords[0]),
    ];
    const triGeo = new THREE.BufferGeometry().setFromPoints(trianglePoints);
    const triMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
    });
    const triLine = new THREE.Line(triGeo, triMat);
    constellationGroup.add(triLine);

    // 5. Star Dust & Constellation Particles
    const starCount = 140;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 14;
      starPos[i + 1] = (Math.random() - 0.5) * 10;
      starPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const starField = new THREE.Points(starGeo, starMat);
    constellationGroup.add(starField);

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const centralLight = new THREE.PointLight(0xd9b86c, 3, 10);
    centralLight.position.set(0, 0, 1.5);
    scene.add(centralLight);

    const greenPointLight = new THREE.PointLight(0xb8ff4a, 2.5, 8);
    greenPointLight.position.set(-2.8, 1.2, 2.0);
    scene.add(greenPointLight);

    const goldPointLight = new THREE.PointLight(0xd9b86c, 2.5, 8);
    goldPointLight.position.set(2.9, 0.9, 2.0);
    scene.add(goldPointLight);

    const bluePointLight = new THREE.PointLight(0x6ca8ff, 2.5, 8);
    bluePointLight.position.set(0, -2.1, 2.0);
    scene.add(bluePointLight);

    // 7. Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = mouse.x * 0.22;
      targetRotationX = -mouse.y * 0.15;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveClickMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const idx = hit.userData.index as number;
        setHoveredIdx(idx);
        container.style.cursor = "pointer";
      } else {
        setHoveredIdx(null);
        container.style.cursor = "grab";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveClickMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const ach = hit.userData.achievement as AchievementItem;
        if (ach) {
          soundManager.playNodePulse(
            ach.id === "greencode-indiacom" ? "lime" : ach.id === "airnova-glider" ? "gold" : "blue"
          );
          setSelectedAchievement(ach);
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 9. RAF Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Parallax rotation
      constellationGroup.rotation.y += (targetRotationY - constellationGroup.rotation.y) * 0.04;
      constellationGroup.rotation.x += (targetRotationX - constellationGroup.rotation.x) * 0.04;

      // Animate Central Core
      centralMesh.rotation.y = time * 0.4;
      centralMesh.rotation.x = time * 0.25;
      centralWire.rotation.y = -time * 0.3;
      coreRing.rotation.z = time * 0.5;

      // Animate Achievement Milestone Nodes
      achievementMeshGroups.forEach((grp, idx) => {
        const ach = grp.userData.achievement as AchievementItem;
        const isHovered = hoveredIdx === idx;
        const isSelected = selectedAchievement.id === ach.id;

        // Elevation and breathing
        const floatY = Math.sin(time * 1.6 + idx * 2.0) * 0.08;
        grp.position.y = nodeCoords[idx][1] + floatY;

        // Spin child elements
        if (grp.children[0]) {
          grp.children[0].rotation.y = time * (0.5 + idx * 0.2);
        }
        if (grp.children[1]) {
          grp.children[1].rotation.z = -time * 0.4;
        }

        // Slight scale accentuation for active/hovered node
        const targetScale = isSelected ? 1.25 : isHovered ? 1.15 : 1.0;
        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Starfield rotation
      starField.rotation.y = time * 0.015;

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
    };
  }, [hoveredIdx, selectedAchievement]);

  return (
    <div className="relative w-full rounded-[24px] bg-[#090B10] border border-white/12 p-5 sm:p-8 flex flex-col space-y-6 shadow-2xl overflow-hidden">
      {/* 3D Constellation Viewport */}
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-[20px] bg-[#050507]/95 border border-white/10 overflow-hidden shadow-inner">
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* HUD Overlay: Constellation Header */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5 pointer-events-none bg-[#0E1117]/85 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D9B86C] animate-pulse" />
          <span className="text-[10px] font-mono text-[#F3F1EA] tracking-wider uppercase font-bold">
            3D PROOF CONSTELLATION // 3 VERIFIED MILESTONES
          </span>
        </div>

        {/* Central Core Label */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 pointer-events-none bg-[#0E1117]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md text-[10px] font-mono text-[#D9B86C]">
          <Cpu className="w-3 h-3" />
          <span>CENTRAL BODY OF WORK</span>
        </div>

        {/* Node Index Quick Bar */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex items-center gap-2">
          {achievementsData.map((ach, idx) => {
            const isSelected = selectedAchievement.id === ach.id;
            return (
              <button
                key={ach.id}
                onClick={() => {
                  soundManager.playNodePulse(
                    ach.id === "greencode-indiacom" ? "lime" : ach.id === "airnova-glider" ? "gold" : "blue"
                  );
                  setSelectedAchievement(ach);
                }}
                className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-2 backdrop-blur-md cursor-pointer ${
                  isSelected
                    ? "bg-[#0E1117] border-white/40 text-[#F3F1EA] shadow-lg"
                    : "bg-[#0E1117]/70 border-white/10 text-[#666A73] hover:text-[#A6A8AE] hover:border-white/20"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ach.accentColor }}
                />
                <span className="font-bold">0{idx + 1}</span>
                <span className="hidden md:inline">{ach.badge}</span>
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-4 right-4 z-10 text-[9px] font-mono text-[#666A73] uppercase pointer-events-none hidden lg:block">
          CLICK 3D ARTIFACT TO INSPECT FULL RECORD
        </div>
      </div>

      {/* Selected Achievement Detail Sheet (Integrated with Inspect Modal) */}
      {selectedAchievement && (
        <div
          onClick={() => onInspectAchievement && onInspectAchievement(selectedAchievement)}
          data-cursor="INSPECT"
          className="p-6 sm:p-7 rounded-[18px] bg-[#0E1117] border border-white/10 hover:border-[#B8FF4A]/50 transition-all duration-300 cursor-pointer group shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${selectedAchievement.accentColor}18`,
                  borderColor: `${selectedAchievement.accentColor}40`,
                  color: selectedAchievement.accentColor,
                }}
              >
                {selectedAchievement.id === "greencode-indiacom" ? (
                  <FileCode className="w-5 h-5" />
                ) : selectedAchievement.id === "airnova-glider" ? (
                  <Plane className="w-5 h-5" />
                ) : (
                  <TrendingUp className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#A6A8AE] uppercase">
                    {selectedAchievement.nodeIndex}
                  </span>
                  <span className="text-white/20">//</span>
                  <span className="text-[10px] font-mono text-[#6CA8FF] uppercase">
                    {selectedAchievement.affiliation}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors mt-0.5">
                  {selectedAchievement.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider"
                style={{
                  backgroundColor: `${selectedAchievement.accentColor}18`,
                  color: selectedAchievement.accentColor,
                  border: `1px solid ${selectedAchievement.accentColor}40`,
                }}
              >
                {selectedAchievement.badge}
              </span>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#B8FF4A] group-hover:bg-[#B8FF4A] group-hover:text-[#050507] transition-all">
                <span>INSPECT RECORD</span>
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          </div>

          <p className="text-sm text-[#A6A8AE] font-body leading-relaxed mb-5 max-w-4xl">
            {selectedAchievement.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-white/8 pt-4">
            {selectedAchievement.details.map((point, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[12px] bg-[#141824]/60 border border-white/6 flex items-start gap-2.5 text-xs text-[#F3F1EA]/85 font-body"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: selectedAchievement.accentColor }}
                />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
