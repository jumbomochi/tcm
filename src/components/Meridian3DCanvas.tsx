'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Acupoint, MeridianChannel } from '@/types/tcm';
import { WUXING_ELEMENTS } from '@/data/foundationsData';

interface Meridian3DCanvasProps {
  meridians: MeridianChannel[];
  acupoints: Acupoint[];
  selectedMeridianId: string;
  selectedAcupointCode: string;
  onSelectAcupoint: (code: string) => void;
}

type StatueFinish = 'bronze' | 'jade' | 'wireframe';
type CameraPreset = 'full' | 'head' | 'torso' | 'arm' | 'leg' | 'posterior';

interface CrossSectionSlice {
  cx: number;
  cy: number;
  cz: number;
  rx: number;
  rz: number;
  indentFrontBack?: number; // creates sternal & spinal anatomical furrow
}

/**
 * Builds a smooth lofted anatomical mesh through a series of elliptical/anatomical cross-sections.
 */
function createLoftedMesh(
  slices: CrossSectionSlice[],
  radialSegments: number,
  material: THREE.Material
): THREE.Mesh {
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < slices.length; i++) {
    const s = slices[i];
    for (let j = 0; j <= radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      // Subtle sternal & spinal groove when indentFrontBack > 0
      const furrow = s.indentFrontBack
        ? 1 - s.indentFrontBack * Math.pow(Math.sin(theta), 6)
        : 1;

      const x = s.cx + s.rx * cosT;
      const y = s.cy;
      const z = s.cz + s.rz * sinT * furrow;
      positions.push(x, y, z);
    }
  }

  const ringVerts = radialSegments + 1;
  for (let i = 0; i < slices.length - 1; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * ringVerts + j;
      const b = (i + 1) * ringVerts + j;
      const c = (i + 1) * ringVerts + (j + 1);
      const d = i * ringVerts + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
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
  const [finish, setFinish] = useState<StatueFinish>('bronze');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('full');

  const onSelectRef = useRef(onSelectAcupoint);
  onSelectRef.current = onSelectAcupoint;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 560;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. OrbitControls & Camera Preset Positioning
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.minDistance = 0.9;
    controls.maxDistance = 4.8;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    const applyPreset = (preset: CameraPreset) => {
      switch (preset) {
        case 'head':
          camera.position.set(0, 1.62, 1.35);
          controls.target.set(0, 1.58, 0);
          break;
        case 'torso':
          camera.position.set(0, 0.82, 1.95);
          controls.target.set(0, 0.78, 0);
          break;
        case 'arm':
          camera.position.set(-0.55, 0.52, 1.65);
          controls.target.set(-0.52, 0.55, 0.08);
          break;
        case 'leg':
          camera.position.set(-0.22, -0.52, 1.85);
          controls.target.set(-0.15, -0.55, 0.08);
          break;
        case 'posterior':
          camera.position.set(0, 0.55, -3.35);
          controls.target.set(0, 0.42, 0);
          break;
        case 'full':
        default:
          camera.position.set(0, 0.48, 3.45);
          controls.target.set(0, 0.40, 0);
          break;
      }
      controls.update();
    };
    applyPreset(cameraPreset);

    // 3. Museum Studio Lighting for Patinated Bronze / Celadon Jade
    const ambientLight = new THREE.AmbientLight(0xfff8e7, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.85);
    keyLight.position.set(2.8, 4.2, 3.8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.9);
    rimLight.position.set(-3.2, 2.5, -3.5);
    scene.add(rimLight);

    const warmFillLight = new THREE.PointLight(0xd97706, 0.85, 6);
    warmFillLight.position.set(0, -0.6, 2.2);
    scene.add(warmFillLight);

    // 4. Material Selection (Song Dynasty Tiansheng Bronze / Celadon Jade / Anatomical Wire)
    let bodyMat: THREE.Material;
    if (finish === 'bronze') {
      bodyMat = new THREE.MeshStandardMaterial({
        color: 0x7c6340,
        roughness: 0.34,
        metalness: 0.72,
        transparent: true,
        opacity: 0.88
      });
    } else if (finish === 'jade') {
      bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0xa7c4b5,
        roughness: 0.22,
        metalness: 0.08,
        transmission: 0.35,
        transparent: true,
        opacity: 0.52
      });
    } else {
      bodyMat = new THREE.MeshBasicMaterial({
        color: 0xb49b78,
        wireframe: true,
        transparent: true,
        opacity: 0.36
      });
    }

    // 5. Sculpted Anatomical Human Mesh (Tiansheng Tongren 天圣铜人)
    const statueGroup = new THREE.Group();

    // 5a. Cranium, Face, Jaw, Neck, Shoulders, Thorax, Waist & Pelvis Loft
    const headTorsoSlices: CrossSectionSlice[] = [
      { cx: 0, cy: 1.81, cz: 0.01, rx: 0.02, rz: 0.02 }, // Vertex crown (GV20 Baihui)
      { cx: 0, cy: 1.77, cz: 0.01, rx: 0.11, rz: 0.13 }, // Upper cranium
      { cx: 0, cy: 1.69, cz: 0.02, rx: 0.145, rz: 0.165 }, // Forehead & temples
      { cx: 0, cy: 1.61, cz: 0.03, rx: 0.14, rz: 0.16 }, // Zygomatic cheek & eyes
      { cx: 0, cy: 1.53, cz: 0.03, rx: 0.115, rz: 0.135 }, // Maxilla / philtrum
      { cx: 0, cy: 1.47, cz: 0.02, rx: 0.09, rz: 0.105 }, // Mandible / chin
      { cx: 0, cy: 1.41, cz: 0.00, rx: 0.085, rz: 0.085 }, // Upper neck
      { cx: 0, cy: 1.33, cz: 0.00, rx: 0.105, rz: 0.095 }, // Base of neck (C7 GV14)
      { cx: 0, cy: 1.25, cz: 0.01, rx: 0.31, rz: 0.145, indentFrontBack: 0.08 }, // Clavicle & acromion
      { cx: 0, cy: 1.12, cz: 0.02, rx: 0.28, rz: 0.175, indentFrontBack: 0.12 }, // Upper chest / pectorals
      { cx: 0, cy: 0.96, cz: 0.02, rx: 0.25, rz: 0.165, indentFrontBack: 0.12 }, // Lower thorax / xiphoid
      { cx: 0, cy: 0.78, cz: 0.02, rx: 0.215, rz: 0.15, indentFrontBack: 0.10 }, // Epigastrium / ribs
      { cx: 0, cy: 0.60, cz: 0.02, rx: 0.205, rz: 0.145, indentFrontBack: 0.08 }, // Waist / umbilicus (CV8 / BL23)
      { cx: 0, cy: 0.44, cz: 0.01, rx: 0.235, rz: 0.16, indentFrontBack: 0.08 }, // Iliac crest / lower abdomen (CV4)
      { cx: 0, cy: 0.30, cz: 0.00, rx: 0.225, rz: 0.155, indentFrontBack: 0.12 }, // Pelvis / greater trochanter
      { cx: 0, cy: 0.22, cz: 0.00, rx: 0.14, rz: 0.11 } // Perineum / pelvic floor
    ];
    statueGroup.add(createLoftedMesh(headTorsoSlices, 36, bodyMat));

    // Subtle nose bridge, ears & classical topknot (发髻) for anatomical orientation
    const noseGeo = new THREE.ConeGeometry(0.024, 0.08, 12);
    const noseMesh = new THREE.Mesh(noseGeo, bodyMat);
    noseMesh.position.set(0, 1.60, 0.195);
    noseMesh.rotation.x = Math.PI * 0.38;
    statueGroup.add(noseMesh);

    [-1, 1].forEach((side) => {
      const earGeo = new THREE.SphereGeometry(0.032, 12, 12);
      earGeo.scale(0.45, 1.25, 0.75);
      const earMesh = new THREE.Mesh(earGeo, bodyMat);
      earMesh.position.set(side * 0.148, 1.61, 0.01);
      statueGroup.add(earMesh);
    });

    // 5b. Left & Right Sculpted Arms + Hands (Deltoid → Biceps → Cubital → Forearm → Wrist → Palm)
    [-1, 1].forEach((side) => {
      const armSlices: CrossSectionSlice[] = [
        { cx: side * 0.31, cy: 1.23, cz: 0.00, rx: 0.085, rz: 0.085 }, // Deltoid origin
        { cx: side * 0.37, cy: 1.12, cz: 0.01, rx: 0.078, rz: 0.075 }, // Deltoid belly
        { cx: side * 0.43, cy: 0.92, cz: 0.02, rx: 0.068, rz: 0.066 }, // Biceps / triceps
        { cx: side * 0.49, cy: 0.71, cz: 0.03, rx: 0.062, rz: 0.056 }, // Elbow / cubital crease (LU5, PC3, LI11)
        { cx: side * 0.56, cy: 0.50, cz: 0.06, rx: 0.058, rz: 0.050 }, // Upper forearm
        { cx: side * 0.63, cy: 0.30, cz: 0.09, rx: 0.048, rz: 0.038 }, // Distal forearm (PC6, TE5, LU7)
        { cx: side * 0.67, cy: 0.16, cz: 0.11, rx: 0.042, rz: 0.028 }, // Wrist crease (LU9, PC7, HT7)
        { cx: side * 0.72, cy: 0.07, cz: 0.12, rx: 0.052, rz: 0.022 }, // Metacarpals / palm & dorsum (LI4, PC8)
        { cx: side * 0.75, cy: 0.00, cz: 0.13, rx: 0.036, rz: 0.014 }  // Fingertips (LU11, LI1, PC9)
      ];
      statueGroup.add(createLoftedMesh(armSlices, 24, bodyMat));
    });

    // 5c. Left & Right Sculpted Legs + Feet (Hip → Quadriceps → Patella → Shin/Calf → Malleolus → Foot)
    [-1, 1].forEach((side) => {
      const legSlices: CrossSectionSlice[] = [
        { cx: side * 0.14, cy: 0.28, cz: 0.00, rx: 0.105, rz: 0.11 }, // Hip / upper thigh
        { cx: side * 0.15, cy: 0.06, cz: 0.01, rx: 0.098, rz: 0.102 }, // Mid-thigh quadriceps/hamstrings
        { cx: side * 0.16, cy: -0.18, cz: 0.01, rx: 0.082, rz: 0.085 }, // Above knee (SP10)
        { cx: side * 0.16, cy: -0.34, cz: 0.01, rx: 0.074, rz: 0.076 }, // Knee / patella & popliteal (ST35, BL40)
        { cx: side * 0.16, cy: -0.46, cz: 0.00, rx: 0.076, rz: 0.082 }, // Upper shin & calf (ST36, GB34, SP9)
        { cx: side * 0.16, cy: -0.66, cz: -0.01, rx: 0.064, rz: 0.070 }, // Mid-lower leg (ST40, SP6, BL57)
        { cx: side * 0.15, cy: -0.88, cz: 0.01, rx: 0.050, rz: 0.054 }, // Malleoli / ankle (KI3, BL60)
        { cx: side * 0.15, cy: -0.95, cz: 0.08, rx: 0.056, rz: 0.115 }, // Foot arch & dorsum (LR3, KI1)
        { cx: side * 0.15, cy: -0.98, cz: 0.16, rx: 0.052, rz: 0.095 }  // Toes (SP1, LR1, ST45, BL67)
      ];
      statueGroup.add(createLoftedMesh(legSlices, 26, bodyMat));
    });

    // 5d. Classical Museum Bronze Pedestal (铜人台座)
    const plinthGeo = new THREE.CylinderGeometry(0.46, 0.52, 0.08, 32);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x292524,
      roughness: 0.6,
      metalness: 0.3
    });
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
    plinthMesh.position.set(0, -1.03, 0.04);
    statueGroup.add(plinthMesh);

    const ringBorderGeo = new THREE.RingGeometry(0.44, 0.46, 48);
    const ringBorderMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      side: THREE.DoubleSide
    });
    const ringBorder = new THREE.Mesh(ringBorderGeo, ringBorderMat);
    ringBorder.rotation.x = -Math.PI / 2;
    ringBorder.position.set(0, -0.988, 0.04);
    statueGroup.add(ringBorder);

    scene.add(statueGroup);

    // 6. Surface-Hugging Meridian Channels, Waypoint Pearls & Flowing Qi Particles
    const meridianGroup = new THREE.Group();
    const animatedPulses: {
      mesh: THREE.Mesh;
      curve: THREE.CatmullRomCurve3;
      speed: number;
      offset: number;
    }[] = [];

    meridians.forEach((ch) => {
      const isSelected = selectedMeridianId === 'ALL' || ch.id === selectedMeridianId;
      const isSingleFocus = ch.id === selectedMeridianId;
      const elHex =
        WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';

      const buildChannelBranch = (pts: [number, number, number][], opacityScale = 1) => {
        const vectors = pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
        const curve = new THREE.CatmullRomCurve3(vectors);
        const radius = isSingleFocus ? 0.012 : isSelected ? 0.0085 : 0.0035;
        const tubeGeo = new THREE.TubeGeometry(curve, 64, radius, 10, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(isSelected ? elHex : '#57534E'),
          emissive: new THREE.Color(isSelected ? elHex : '#292524'),
          emissiveIntensity: isSingleFocus ? 0.85 : isSelected ? 0.55 : 0.1,
          transparent: true,
          opacity: (isSelected ? 0.96 : 0.22) * opacityScale
        });
        meridianGroup.add(new THREE.Mesh(tubeGeo, tubeMat));

        // Add small golden/elemental acupuncture pearls along every waypoint of active meridian(s)
        if (isSelected) {
          pts.forEach((p) => {
            const nodeGeo = new THREE.SphereGeometry(isSingleFocus ? 0.018 : 0.013, 12, 12);
            const nodeMat = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#FDE68A'),
              emissive: new THREE.Color(elHex),
              emissiveIntensity: 0.7
            });
            const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
            nodeMesh.position.set(p[0], p[1], p[2]);
            meridianGroup.add(nodeMesh);
          });

          // Add flowing Qi particles along the meridian curve
          const pulseCount = isSingleFocus ? 3 : 1;
          for (let k = 0; k < pulseCount; k++) {
            const pulseGeo = new THREE.SphereGeometry(isSingleFocus ? 0.024 : 0.016, 14, 14);
            const pulseMat = new THREE.MeshBasicMaterial({
              color: 0xfef08a
            });
            const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
            meridianGroup.add(pulseMesh);
            animatedPulses.push({
              mesh: pulseMesh,
              curve,
              speed: 0.22,
              offset: k / pulseCount
            });
          }
        }
      };

      buildChannelBranch(ch.points3D, 1);
      if (ch.id !== 'CV' && ch.id !== 'GV') {
        const mirroredPts: [number, number, number][] = ch.points3D.map((p) => [
          -p[0],
          p[1],
          p[2]
        ]);
        buildChannelBranch(mirroredPts, 0.85);
      }
    });
    scene.add(meridianGroup);

    // 7. Interactive Key Acupoint Beacons
    const acupointMeshes: THREE.Mesh[] = [];
    const haloRings: THREE.Mesh[] = [];

    acupoints.forEach((pt) => {
      const isSelected = pt.code === selectedAcupointCode;
      const elHex =
        WUXING_ELEMENTS.find((e) => e.key === pt.element)?.colorHex || '#F59E0B';

      const sphereGeo = new THREE.SphereGeometry(isSelected ? 0.048 : 0.032, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(isSelected ? '#FEF08A' : elHex),
        emissive: new THREE.Color(isSelected ? '#F59E0B' : elHex),
        emissiveIntensity: isSelected ? 1.1 : 0.65
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(pt.coords3D[0], pt.coords3D[1], pt.coords3D[2]);
      mesh.userData = { code: pt.code };
      acupointMeshes.push(mesh);
      scene.add(mesh);

      if (isSelected) {
        const ringGeo = new THREE.RingGeometry(0.058, 0.076, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(mesh.position);
        haloRings.push(ringMesh);
        scene.add(ringMesh);
      }
    });

    // 8. Raycaster for Click & Hover on Acupoints
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

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 520;
      const newH = container.clientHeight || 560;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop (Flowing Qi Particles + Billboard Halo Ring)
    let frameId: number;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;

      animatedPulses.forEach((p) => {
        const t = (elapsedSec * p.speed + p.offset) % 1;
        const pos = p.curve.getPointAt(t);
        p.mesh.position.copy(pos);
      });

      haloRings.forEach((ring) => {
        ring.lookAt(camera.position);
      });

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, [meridians, acupoints, selectedMeridianId, selectedAcupointCode, finish, cameraPreset]);

  const activePt = acupoints.find((p) => p.code === (hoveredCode || selectedAcupointCode));

  return (
    <div className="w-full h-[580px] bg-gradient-to-b from-[#161513] via-[#1F1C18] to-[#11100E] border-2 border-stone-800 relative flex flex-col justify-between select-none">
      {/* Top Bar: Camera Region Presets & Material Finish Switcher */}
      <div className="relative z-10 p-2.5 bg-black/75 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mr-1">
            视角 Region:
          </span>
          {(
            [
              { id: 'full', label: '全身 Full' },
              { id: 'head', label: '头项 Head' },
              { id: 'torso', label: '胸腹 Torso' },
              { id: 'arm', label: '上肢手 Arm' },
              { id: 'leg', label: '下肢足 Leg' },
              { id: 'posterior', label: '背脊督脉 Back' }
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              onClick={() => setCameraPreset(p.id)}
              className={`px-2 py-0.5 text-[11px] font-serif border transition ${
                cameraPreset === p.id
                  ? 'bg-[#9E2A2B] text-white border-[#9E2A2B] font-bold'
                  : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mr-1">
            铜人材质:
          </span>
          {(
            [
              { id: 'bronze', label: '天圣古铜' },
              { id: 'jade', label: '青玉透视' },
              { id: 'wireframe', label: '白描骨度' }
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setFinish(m.id)}
              className={`px-2 py-0.5 text-[11px] font-serif border transition ${
                finish === m.id
                  ? 'bg-amber-600 text-stone-950 border-amber-500 font-bold'
                  : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/60'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full flex-1 min-h-0" />

      {/* Bottom Floating Acupoint Directory & Active Point Readout */}
      <div className="relative z-10 p-2.5 bg-black/80 border-t border-stone-800 space-y-2">
        {activePt && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-amber-100 font-serif border-b border-stone-800 pb-1.5">
            <div>
              <span className="px-1.5 py-0.5 bg-[#9E2A2B] text-white font-mono font-bold text-[10px] mr-2">
                {activePt.code}
              </span>
              <span className="font-bold text-amber-300">{activePt.name.zh}</span> (
              {activePt.name.pinyin}) ·{' '}
              <span className="text-stone-300">{activePt.name.en}</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400/90">
              {activePt.meridianName.zh} · 拖拽旋转 / 滚轮缩放
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {acupoints.map((pt) => {
            const isSelected = pt.code === selectedAcupointCode;
            return (
              <button
                key={pt.code}
                onClick={() => onSelectAcupoint(pt.code)}
                className={`px-2 py-0.5 border text-[10px] font-mono transition ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                    : 'bg-stone-900 text-amber-100/90 border-stone-700 hover:border-amber-500'
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

