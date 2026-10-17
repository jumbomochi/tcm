'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Acupoint, MeridianChannel } from '@/types/tcm';
import { WUXING_ELEMENTS } from '@/data/foundationsData';
import { RotateCcw } from 'lucide-react';

interface Meridian3DCanvasProps {
  meridians: MeridianChannel[];
  acupoints: Acupoint[];
  selectedMeridianId: string;
  selectedAcupointCode: string;
  onSelectAcupoint: (code: string) => void;
}

export default function Meridian3DCanvas({
  meridians,
  acupoints,
  selectedMeridianId,
  selectedAcupointCode,
  onSelectAcupoint
}: Meridian3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  // Store latest callback & state in refs for raycasting and animation loop
  const onSelectRef = useRef(onSelectAcupoint);
  onSelectRef.current = onSelectAcupoint;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.55, 3.25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.38, 0);
    controls.enablePan = false;
    controls.minDistance = 1.7;
    controls.maxDistance = 4.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.update();

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffbeb, 1.4);
    dirLight1.position.set(3, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.65);
    dirLight2.position.set(-3, 2, -4);
    scene.add(dirLight2);

    // 4. Classical Bronze-Jade Translucent Mannequin Group
    const mannequinGroup = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xd6c7b2,
      transparent: true,
      opacity: 0.42,
      roughness: 0.45,
      metalness: 0.15
    });

    const addPart = (
      geo: THREE.BufferGeometry,
      pos: [number, number, number],
      rot?: [number, number, number]
    ) => {
      const mesh = new THREE.Mesh(geo, bodyMat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
      mannequinGroup.add(mesh);
    };

    // Head, Neck, Thorax, Abdomen/Pelvis, Arms, Legs
    addPart(new THREE.SphereGeometry(0.19, 32, 32), [0, 1.62, 0]);
    addPart(new THREE.CylinderGeometry(0.08, 0.09, 0.18, 24), [0, 1.38, 0]);
    addPart(new THREE.CylinderGeometry(0.26, 0.22, 0.65, 32), [0, 0.98, 0]);
    addPart(new THREE.CylinderGeometry(0.22, 0.23, 0.45, 32), [0, 0.45, 0]);
    addPart(new THREE.CylinderGeometry(0.065, 0.055, 0.62, 20), [-0.48, 0.85, 0.05], [0, 0, -0.32]);
    addPart(new THREE.CylinderGeometry(0.055, 0.045, 0.55, 20), [-0.68, 0.35, 0.1], [0, 0, -0.32]);
    addPart(new THREE.CylinderGeometry(0.065, 0.055, 0.62, 20), [0.48, 0.85, 0.05], [0, 0, 0.32]);
    addPart(new THREE.CylinderGeometry(0.055, 0.045, 0.55, 20), [0.68, 0.35, 0.1], [0, 0, 0.32]);
    addPart(new THREE.CylinderGeometry(0.095, 0.075, 0.68, 24), [-0.15, -0.1, 0]);
    addPart(new THREE.CylinderGeometry(0.07, 0.05, 0.62, 24), [-0.16, -0.68, 0.02]);
    addPart(new THREE.CylinderGeometry(0.095, 0.075, 0.68, 24), [0.15, -0.1, 0]);
    addPart(new THREE.CylinderGeometry(0.07, 0.05, 0.62, 24), [0.16, -0.68, 0.02]);

    scene.add(mannequinGroup);

    // 5. Meridian Tube Splines
    const meridianGroup = new THREE.Group();
    meridians.forEach((ch) => {
      const isSelected = selectedMeridianId === 'ALL' || ch.id === selectedMeridianId;
      const elHex =
        WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';

      const buildTube = (pts: [number, number, number][], opacityFactor = 1) => {
        const vectors = pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
        const curve = new THREE.CatmullRomCurve3(vectors);
        const tubeGeo = new THREE.TubeGeometry(
          curve,
          44,
          isSelected ? 0.012 : 0.005,
          8,
          false
        );
        const tubeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(isSelected ? elHex : '#64748B'),
          emissive: new THREE.Color(isSelected ? elHex : '#334155'),
          emissiveIntensity: isSelected ? 0.65 : 0.15,
          transparent: true,
          opacity: (isSelected ? 0.95 : 0.28) * opacityFactor
        });
        return new THREE.Mesh(tubeGeo, tubeMat);
      };

      meridianGroup.add(buildTube(ch.points3D, 1));
      if (ch.id !== 'CV' && ch.id !== 'GV') {
        const mirroredPts: [number, number, number][] = ch.points3D.map((p) => [
          -p[0],
          p[1],
          p[2]
        ]);
        meridianGroup.add(buildTube(mirroredPts, 0.75));
      }
    });
    scene.add(meridianGroup);

    // 6. Interactive Acupoint Spheres
    const acupointMeshes: THREE.Mesh[] = [];
    acupoints.forEach((pt) => {
      const isSelected = pt.code === selectedAcupointCode;
      const elHex =
        WUXING_ELEMENTS.find((e) => e.key === pt.element)?.colorHex || '#F59E0B';

      const sphereGeo = new THREE.SphereGeometry(isSelected ? 0.056 : 0.038, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(isSelected ? '#F59E0B' : elHex),
        emissive: new THREE.Color(isSelected ? '#F59E0B' : elHex),
        emissiveIntensity: isSelected ? 0.95 : 0.5
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(pt.coords3D[0], pt.coords3D[1], pt.coords3D[2]);
      mesh.userData = { code: pt.code };
      acupointMeshes.push(mesh);
      scene.add(mesh);

      // Halo ring for currently selected point
      if (isSelected) {
        const ringGeo = new THREE.RingGeometry(0.068, 0.085, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(mesh.position);
        scene.add(ringMesh);
      }
    });

    // 7. Raycaster for Click & Hover on Acupoints
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const updatePointer = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerMove = (e: MouseEvent) => {
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(acupointMeshes, false);
      if (hits.length > 0) {
        const code = hits[0].object.userData?.code;
        renderer.domElement.style.cursor = 'pointer';
        setHoveredCode(code || null);
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredCode(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(acupointMeshes, false);
      if (hits.length > 0) {
        const code = hits[0].object.userData?.code;
        if (code) onSelectRef.current(code);
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 500;
      const newH = container.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let frameId: number;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, [meridians, acupoints, selectedMeridianId, selectedAcupointCode]);

  const activePt = acupoints.find((p) => p.code === (hoveredCode || selectedAcupointCode));

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#171614] via-[#1F1D1A] to-[#121110] border border-amber-900/30 relative">
      <div ref={containerRef} className="w-full h-full" />

      {/* Top Overlay Instructions */}
      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-xs border border-amber-500/20 text-[11px] text-amber-100 font-mono flex items-center gap-2 pointer-events-none">
        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
        <span>3D Bronze Mannequin · Drag to Rotate 360° · Click Glowing Acupoints</span>
      </div>

      {/* Bottom Floating Acupoint Pill Selector & Active Point Status */}
      <div className="absolute bottom-3 inset-x-3 flex flex-col gap-2">
        {activePt && (
          <div className="self-start px-3 py-1.5 rounded-xl bg-black/80 border border-amber-500/40 text-xs text-amber-100 font-serif shadow-md">
            <span className="font-mono font-bold text-amber-400 mr-1.5">{activePt.code}</span>
            <span className="font-bold">{activePt.name.zh}</span> ({activePt.name.pinyin}) ·{' '}
            <span className="font-sans text-stone-300">{activePt.name.en}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1 bg-black/65 backdrop-blur-xs p-1.5 rounded-xl border border-stone-700/80">
          {acupoints.map((pt) => {
            const isSelected = pt.code === selectedAcupointCode;
            return (
              <button
                key={pt.code}
                onClick={() => onSelectAcupoint(pt.code)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800/90 text-amber-100 hover:bg-amber-800/60'
                }`}
              >
                {pt.code} {pt.name.zh}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
