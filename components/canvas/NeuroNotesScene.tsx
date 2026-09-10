"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { soundManager } from "@/lib/sound";
import {
  FileText,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  BookOpen,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Maximize2,
  Compass,
} from "lucide-react";

export interface NeuroNodeDetail {
  id: string;
  stage: "INPUT" | "CORE" | "OUTPUT";
  category: string;
  label: string;
  sublabel: string;
  description: string;
  accentColor: string;
  pos: [number, number, number];
  iconType: "file" | "core" | "flashcard" | "quiz" | "chat";
  stats: { label: string; val: string }[];
}

const NEURO_NODES: NeuroNodeDetail[] = [
  // 1. INPUT DOCUMENTS (Left Spatial Array)
  {
    id: "input-notes",
    stage: "INPUT",
    category: "UNSTRUCTURED DATA",
    label: "STUDENT NOTES",
    sublabel: "Markdown, Handwriting, Text",
    description:
      "Ingests raw student notes, typed outlines, and lecture summaries. Normalizes vocabulary, breaks documents into semantic passages, and prepares key conceptual anchors.",
    accentColor: "#6CA8FF",
    pos: [-3.8, 1.7, 0.3],
    iconType: "file",
    stats: [
      { label: "FORMATS", val: ".TXT / .MD" },
      { label: "PARSING", val: "SYNTACTIC CHUNKING" },
    ],
  },
  {
    id: "input-pdf",
    stage: "INPUT",
    category: "ACADEMIC TEXTS",
    label: "PDF DOCUMENTS",
    sublabel: "Textbooks, Research Papers, Slides",
    description:
      "High-fidelity PDF document parser extracting tabular structures, section hierarchies, formulas, and academic citations into clean hierarchical vector representations.",
    accentColor: "#6CA8FF",
    pos: [-4.0, 0.4, -0.4],
    iconType: "file",
    stats: [
      { label: "PIPELINE", val: "LAYOUT-AWARE OCR" },
      { label: "EXTRACTION", val: "SECTION VECTOR" },
    ],
  },
  {
    id: "input-ppt",
    stage: "INPUT",
    category: "PRESENTATIONS",
    label: "SLIDE DECKS (PPT)",
    sublabel: "Keynote, PowerPoint, PDF Decks",
    description:
      "Extracts slide-by-slide bullet hierarchies, visual relationships, presentation flow, and speaker notes to synthesize high-level modular topic summaries.",
    accentColor: "#6CA8FF",
    pos: [-3.9, -0.9, 0.5],
    iconType: "file",
    stats: [
      { label: "PARSER", val: "HIERARCHICAL SLIDE" },
      { label: "RETENTION", val: "TOPIC CLUSTERS" },
    ],
  },
  {
    id: "input-video",
    stage: "INPUT",
    category: "MULTIMODAL AUDIO/VIDEO",
    label: "LECTURE RECORDINGS",
    sublabel: "MP4, WebM, Audio Transcripts",
    description:
      "Processes lecture timestamps, transcribed audio, and video slide frames to map timeline concepts to timestamped learning references.",
    accentColor: "#6CA8FF",
    pos: [-3.5, -2.1, -0.2],
    iconType: "file",
    stats: [
      { label: "AUDIO", val: "TRANSCRIPTION" },
      { label: "TIMESTAMPS", val: "SYNCHRONIZED" },
    ],
  },

  // 2. CENTRAL AI COGNITIVE CORE (Center Focal Point)
  {
    id: "ai-core",
    stage: "CORE",
    category: "SYNAPTIC NEURAL ENGINE",
    label: "AI PROCESSING CORE",
    sublabel: "Semantic Understanding & Knowledge Graph",
    description:
      "The central intelligence engine that distills multi-modal inputs, builds interactive knowledge graphs, assesses concept difficulties, and orchestrates active retrieval generation.",
    accentColor: "#B8FF4A",
    pos: [0, 0, 0.4],
    iconType: "core",
    stats: [
      { label: "EMBEDDINGS", val: "HIGH-DIM KNOWLEDGE GRAPH" },
      { label: "RETRIEVAL", val: "ACTIVE SYNTHESIS" },
    ],
  },

  // 3. LEARNING OUTPUT PORTALS (Right Spatial Array)
  {
    id: "output-flashcards",
    stage: "OUTPUT",
    category: "ACTIVE RECALL",
    label: "SPACED FLASHCARDS",
    sublabel: "Adaptive Retention & Review Intervals",
    description:
      "Generates atomic question-and-answer pairs scored against the SM-2 spaced repetition curve, ensuring high recall with minimal review fatigue.",
    accentColor: "#6CA8FF",
    pos: [3.7, 1.6, 0.4],
    iconType: "flashcard",
    stats: [
      { label: "ALGORITHM", val: "SPACED REPETITION (SM-2)" },
      { label: "CARD FORMAT", val: "ATOMIC DRILLS" },
    ],
  },
  {
    id: "output-quizzes",
    stage: "OUTPUT",
    category: "ASSESSMENT MATRIX",
    label: "ADAPTIVE QUIZZES",
    sublabel: "Multiple-Choice, Explanations, Grading",
    description:
      "Synthesizes concept mastery quizzes with context-aware distractor choices, instant rationales, and progressive difficulty escalations.",
    accentColor: "#6CA8FF",
    pos: [4.0, 0.1, -0.3],
    iconType: "quiz",
    stats: [
      { label: "GENERATION", val: "CONTEXT DISTRACTORS" },
      { label: "FEEDBACK", val: "INSTANT RATIONALE" },
    ],
  },
  {
    id: "output-chat",
    stage: "OUTPUT",
    category: "COGNITIVE ASSISTANT",
    label: "AI CHAT & GUIDANCE",
    sublabel: "Socratic Inquiries & Well-being Support",
    description:
      "Interactive conversational companion answering deep conceptual doubts, suggesting study pacing, providing analogies, and sustaining learning motivation.",
    accentColor: "#6CA8FF",
    pos: [3.6, -1.6, 0.2],
    iconType: "chat",
    stats: [
      { label: "MODE", val: "SOCRATIC COGNITION" },
      { label: "CONTEXT", val: "MULTI-PASS RAG" },
    ],
  },
];

interface NeuroNotesSceneProps {
  onInspectNode?: (node: NeuroNodeDetail) => void;
  onTestDrive?: () => void;
}

export function NeuroNotesScene({ onInspectNode, onTestDrive }: NeuroNotesSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("ai-core");
  const [isHovered, setIsHovered] = useState(false);

  const selectedNode = useMemo(() => {
    return NEURO_NODES.find((n) => n.id === selectedNodeId) || NEURO_NODES[4];
  }, [selectedNodeId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 9.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 2. Subtle Synaptic Particle Atmosphere
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleScales[i] = Math.random() * 0.04 + 0.015;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x6ca8ff,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(starField);

    // 3. Node Meshes & Interactive Objects
    const interactiveMeshes: THREE.Object3D[] = [];
    const nodeMeshMap = new Map<string, THREE.Group>();

    const corePos = new THREE.Vector3(0, 0, 0.4);

    NEURO_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.pos);
      nodeGroup.userData = { node };

      const isCore = node.stage === "CORE";

      if (isCore) {
        // AI Core: Multi-shell Icosahedron with Wireframe Exoskeleton & Double Glowing Rings
        const coreGeo = new THREE.IcosahedronGeometry(0.72, 2);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0xb8ff4a,
          emissive: 0x224411,
          emissiveIntensity: 0.8,
          roughness: 0.2,
          metalness: 0.85,
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreMesh.userData = { node, isCoreSphere: true };
        nodeGroup.add(coreMesh);
        interactiveMeshes.push(coreMesh);

        // Outer Wireframe Cage
        const cageGeo = new THREE.IcosahedronGeometry(0.95, 1);
        const cageMat = new THREE.MeshBasicMaterial({
          color: 0x6ca8ff,
          wireframe: true,
          transparent: true,
          opacity: 0.4,
        });
        const cageMesh = new THREE.Mesh(cageGeo, cageMat);
        cageMesh.name = "cage";
        nodeGroup.add(cageMesh);

        // Synaptic Halo Rings
        const ringGeo1 = new THREE.TorusGeometry(1.2, 0.018, 16, 64);
        const ringMat1 = new THREE.MeshBasicMaterial({
          color: 0xb8ff4a,
          transparent: true,
          opacity: 0.7,
        });
        const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.name = "ring1";
        nodeGroup.add(ring1);

        const ringGeo2 = new THREE.TorusGeometry(1.45, 0.012, 16, 64);
        const ringMat2 = new THREE.MeshBasicMaterial({
          color: 0x6ca8ff,
          transparent: true,
          opacity: 0.5,
        });
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.name = "ring2";
        ring2.rotation.x = Math.PI * 0.35;
        nodeGroup.add(ring2);
      } else {
        // Peripheral Nodes (Translucent Glass Cube/Plate for Ingestion, Hexagonal Prisms for Outputs)
        const isInput = node.stage === "INPUT";
        const geo = isInput
          ? new THREE.BoxGeometry(0.55, 0.65, 0.12)
          : new THREE.CylinderGeometry(0.38, 0.38, 0.2, 6);

        const mat = new THREE.MeshStandardMaterial({
          color: isInput ? 0x6ca8ff : 0x4a90e2,
          emissive: isInput ? 0x112244 : 0x113355,
          emissiveIntensity: 0.6,
          roughness: 0.25,
          metalness: 0.7,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData = { node };
        nodeGroup.add(mesh);
        interactiveMeshes.push(mesh);

        // Subtle wireframe edge outline
        const edges = new THREE.EdgesGeometry(geo);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.45,
        });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        nodeGroup.add(wireframe);

        // Ground anchor line / orientation
        if (isInput) {
          mesh.rotation.y = 0.25;
        } else {
          mesh.rotation.x = Math.PI * 0.4;
          mesh.rotation.z = -0.2;
        }
      }

      worldGroup.add(nodeGroup);
      nodeMeshMap.set(node.id, nodeGroup);
    });

    // 4. Data Streams & Neural Connection Splines (Inputs -> Core -> Outputs)
    const splinePaths: THREE.CatmullRomCurve3[] = [];
    const pulseObjects: { mesh: THREE.Mesh; path: THREE.CatmullRomCurve3; speed: number; progress: number }[] = [];

    const streamLineMat = new THREE.LineBasicMaterial({
      color: 0x6ca8ff,
      transparent: true,
      opacity: 0.4,
    });

    const activeStreamMat = new THREE.LineBasicMaterial({
      color: 0xb8ff4a,
      transparent: true,
      opacity: 0.75,
    });

    const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xb8ff4a,
      transparent: true,
      opacity: 0.9,
    });

    NEURO_NODES.forEach((node) => {
      if (node.stage === "CORE") return;

      const nPos = new THREE.Vector3(...node.pos);
      // Intermediate curved bezier control point
      const midPoint = new THREE.Vector3()
        .addVectors(nPos, corePos)
        .multiplyScalar(0.5);

      if (node.stage === "INPUT") {
        midPoint.y += (Math.random() - 0.5) * 0.6;
        midPoint.z += 0.4;
      } else {
        midPoint.y += (Math.random() - 0.5) * 0.6;
        midPoint.z += -0.3;
      }

      const curve = new THREE.CatmullRomCurve3([nPos, midPoint, corePos]);
      splinePaths.push(curve);

      const points = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const splineLine = new THREE.Line(lineGeo, streamLineMat);
      worldGroup.add(splineLine);

      // Add 2 travelling pulse packets along each spline
      for (let p = 0; p < 2; p++) {
        const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
        worldGroup.add(pMesh);
        pulseObjects.push({
          mesh: pMesh,
          path: curve,
          speed: 0.25 + Math.random() * 0.15,
          progress: p * 0.5,
        });
      }
    });

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const centerPointLight = new THREE.PointLight(0xb8ff4a, 2.8, 12);
    centerPointLight.position.set(0, 0, 1.8);
    scene.add(centerPointLight);

    const blueLight = new THREE.PointLight(0x6ca8ff, 2.0, 14);
    blueLight.position.set(-3.5, 1, 3);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x4a90e2, 2.0, 14);
    cyanLight.position.set(3.5, -1, 3);
    scene.add(cyanLight);

    // 6. Raycasting & Mouse Parallax Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = mouse.x * 0.25;
      targetRotationX = -mouse.y * 0.18;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const n = hit.userData.node as NeuroNodeDetail;
        if (n) {
          container.style.cursor = "pointer";
        }
      } else {
        container.style.cursor = "grab";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const n = hit.userData.node as NeuroNodeDetail;
        if (n) {
          soundManager.playNodePulse(n.stage === "CORE" ? "lime" : "blue");
          setSelectedNodeId(n.id);
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation RAF Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth camera / world tilt with mouse dampening
      worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.05;
      worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.05;

      // Rotate Starfield slowly
      starField.rotation.y = time * 0.02;

      // Animate AI Core elements
      const coreGroup = nodeMeshMap.get("ai-core");
      if (coreGroup) {
        const cage = coreGroup.getObjectByName("cage");
        if (cage) cage.rotation.y = time * 0.35;

        const ring1 = coreGroup.getObjectByName("ring1");
        if (ring1) ring1.rotation.z = time * 0.6;

        const ring2 = coreGroup.getObjectByName("ring2");
        if (ring2) ring2.rotation.z = -time * 0.45;

        // Heartbeat breathing pulse
        const coreSphere = coreGroup.children.find((c) => (c as THREE.Mesh).userData?.isCoreSphere);
        if (coreSphere) {
          const pulse = 1 + Math.sin(time * 2.8) * 0.05;
          coreSphere.scale.set(pulse, pulse, pulse);
        }
      }

      // Animate Peripheral Nodes subtle floating motion
      nodeMeshMap.forEach((grp, id) => {
        if (id === "ai-core") return;
        const offset = NEURO_NODES.findIndex((n) => n.id === id);
        grp.position.y = grp.userData.node.pos[1] + Math.sin(time * 1.5 + offset) * 0.08;
      });

      // Update travelling synaptic pulse particles
      pulseObjects.forEach((p) => {
        p.progress += 0.004 * p.speed;
        if (p.progress > 1) p.progress = 0;

        const pt = p.path.getPoint(p.progress);
        p.mesh.position.copy(pt);
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
    };
  }, []);

  return (
    <div className="relative w-full rounded-[24px] bg-[#090B10] border border-white/12 p-5 sm:p-8 flex flex-col space-y-6 shadow-2xl overflow-hidden">
      {/* 3D Knowledge Environment Viewport */}
      <div
        className="relative w-full h-[400px] sm:h-[490px] rounded-[20px] bg-[#050507]/95 border border-white/10 overflow-hidden shadow-inner group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Spatial Architecture Compass HUD Header */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3 pointer-events-none bg-[#0E1117]/85 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#B8FF4A] shadow-[0_0_8px_#B8FF4A] animate-pulse" />
          <span className="text-[10px] font-mono text-[#F3F1EA] tracking-wider uppercase">
            NEURONOTES 3D KNOWLEDGE SPHERE // {selectedNode.stage} ACTIVE
          </span>
        </div>

        {/* Workflow Stage Breadcrumbs HUD */}
        <div className="absolute top-4 right-4 z-10 hidden md:flex items-center gap-2 pointer-events-none bg-[#0E1117]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md text-[10px] font-mono">
          <span className={selectedNode.stage === "INPUT" ? "text-[#6CA8FF] font-bold" : "text-[#666A73]"}>
            01 INGESTION
          </span>
          <span className="text-white/20">→</span>
          <span className={selectedNode.stage === "CORE" ? "text-[#B8FF4A] font-bold" : "text-[#666A73]"}>
            02 AI CORE
          </span>
          <span className="text-white/20">→</span>
          <span className={selectedNode.stage === "OUTPUT" ? "text-[#6CA8FF] font-bold" : "text-[#666A73]"}>
            03 RETRIEVAL
          </span>
        </div>

        {/* Spatial Flow Labels in 3D Space */}
        <div className="absolute bottom-4 left-5 z-10 pointer-events-none hidden sm:block">
          <div className="text-[9px] font-mono text-[#6CA8FF] tracking-widest uppercase">
            ← MULTI-MODAL INPUT CLUSTERS
          </div>
          <div className="text-[8px] font-mono text-[#666A73]">NOTES • PDF • PPT • VIDEO</div>
        </div>

        <div className="absolute bottom-4 right-5 z-10 pointer-events-none text-right hidden sm:block">
          <div className="text-[9px] font-mono text-[#6CA8FF] tracking-widest uppercase">
            ACTIVE RETRIEVAL PORTALS →
          </div>
          <div className="text-[8px] font-mono text-[#666A73]">FLASHCARDS • QUIZZES • CHAT</div>
        </div>

        {/* Interactive Affordance Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[9px] font-mono text-[#A6A8AE] pointer-events-none uppercase">
          CLICK ANY 3D NODE TO INSPECT ITS PIPELINE STAGE
        </div>
      </div>

      {/* Selected Node Telemetry & Pipeline Inspector Card */}
      <div
        onClick={() => onInspectNode && onInspectNode(selectedNode)}
        data-cursor="INSPECT"
        className="relative p-6 sm:p-7 rounded-[18px] bg-[#0E1117] border border-white/10 hover:border-[#B8FF4A]/50 transition-all duration-300 cursor-pointer group shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: `${selectedNode.accentColor}15`,
                borderColor: `${selectedNode.accentColor}40`,
                color: selectedNode.accentColor,
              }}
            >
              {selectedNode.iconType === "core" ? (
                <Cpu className="w-5 h-5" />
              ) : selectedNode.iconType === "file" ? (
                <FileText className="w-5 h-5" />
              ) : selectedNode.iconType === "flashcard" ? (
                <BookOpen className="w-5 h-5" />
              ) : selectedNode.iconType === "quiz" ? (
                <HelpCircle className="w-5 h-5" />
              ) : (
                <MessageSquare className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase font-bold"
                  style={{ color: selectedNode.accentColor }}
                >
                  STAGE // {selectedNode.stage}
                </span>
                <span className="text-white/20">//</span>
                <span className="text-[10px] font-mono text-[#A6A8AE] uppercase">
                  {selectedNode.category}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-extrabold text-[#F3F1EA] group-hover:text-[#B8FF4A] transition-colors mt-0.5">
                {selectedNode.label}
              </h4>
            </div>
          </div>

          {/* Action Affordance */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#A6A8AE] hidden sm:inline">
              {selectedNode.sublabel}
            </span>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#B8FF4A] group-hover:bg-[#B8FF4A] group-hover:text-[#050507] transition-all">
              <span>INSPECT ARCHITECTURE</span>
              <Maximize2 className="w-3 h-3" />
            </div>
          </div>
        </div>

        <p className="text-sm text-[#A6A8AE] font-body leading-relaxed mb-5 max-w-4xl">
          {selectedNode.description}
        </p>

        {/* Technical Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/8">
          {selectedNode.stats.map((st, i) => (
            <div key={i} className="p-2.5 rounded-[10px] bg-[#141824]/60 border border-white/6">
              <div className="text-[9px] font-mono text-[#666A73] uppercase">{st.label}</div>
              <div className="text-xs font-mono font-bold text-[#F3F1EA] mt-0.5 truncate">
                {st.val}
              </div>
            </div>
          ))}

          <div className="p-2.5 rounded-[10px] bg-[#141824]/60 border border-white/6 col-span-2 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono text-[#666A73] uppercase">PIPELINE INTEGRATION</div>
              <div className="text-xs font-mono font-bold text-[#B8FF4A] mt-0.5">
                VERIFIED NEURONOTES ENGINE
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#666A73] group-hover:text-[#B8FF4A] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
