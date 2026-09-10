"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Abstract Core (PB Polyhedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0e1117,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xb8ff4a,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Orbital Data Rings
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xb8ff4a,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x6ca8ff,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // 3. Floating Digital Coordinate Planes
    const planeGeo = new THREE.PlaneGeometry(1.1, 0.7);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x141821,
      metalness: 0.9,
      roughness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });

    const floatingPanels: THREE.Mesh[] = [];
    const panelCoords = [
      { pos: [2.5, 1.2, -1.0], rot: [0.2, -0.4, 0.1] },
      { pos: [-2.6, 0.8, -0.5], rot: [-0.3, 0.5, -0.2] },
      { pos: [1.8, -1.8, 0.5], rot: [0.4, -0.2, 0.3] },
      { pos: [-2.2, -1.5, 0.8], rot: [-0.2, 0.3, 0.1] },
    ];

    panelCoords.forEach((item) => {
      const panel = new THREE.Mesh(planeGeo, planeMat);
      panel.position.set(item.pos[0], item.pos[1], item.pos[2]);
      panel.rotation.set(item.rot[0], item.rot[1], item.rot[2]);
      mainGroup.add(panel);
      floatingPanels.push(panel);
    });

    // 4. Subtle Atmospheric Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb8ff4a,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xb8ff4a, 1.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6ca8ff, 1.2);
    rimLight.position.set(-4, -3, -2);
    scene.add(rimLight);

    // Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (!prefersReducedMotion) {
        // Smooth mouse parallax lerp
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        mainGroup.rotation.y = currentX;
        mainGroup.rotation.x = -currentY;

        // Subtle continuous geometric rotation
        coreMesh.rotation.y = elapsedTime * 0.15;
        coreMesh.rotation.x = elapsedTime * 0.08;

        ring1.rotation.z = elapsedTime * 0.12;
        ring2.rotation.z = -elapsedTime * 0.09;

        // Floating panels gentle wave
        floatingPanels.forEach((p, idx) => {
          p.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.0015;
        });

        // Slow particle drift
        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
