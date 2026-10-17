'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LanguageMode } from '@/types/tcm';
import {
  TONGUE_STATES,
  PULSE_TYPES,
  DIAGNOSTIC_SYMPTOM_OPTIONS,
  DIAGNOSTIC_CASES
} from '@/data/diagnosticsData';
import { CLASSIC_FORMULAS } from '@/data/materiaMedicaData';
import { renderProse, TermBadge, VermilionSeal, LabMetadataChips } from './BilingualUi';
import {
  CheckCircle2,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

interface DiagnosticsModuleProps {
  lang: LanguageMode;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, category: string) => void;
}

const TONGUE_ZONES = [
  {
    id: 'tip',
    name: { zh: '舌尖 · 心肺反射区', pinyin: 'Shé Jiān · Xīn Fèi', en: 'Tongue Tip · Heart & Lung Zone' },
    descEn: 'Redness or ulcers on the very tip signify blazing Heart Fire (insomnia, restlessness) or Lung Heat.',
    descZh: '“舌尖候上焦心肺”。舌尖红赤起刺或生疮，多属心火亢盛（心烦失眠）或肺热。'
  },
  {
    id: 'sides',
    name: { zh: '舌边 · 肝胆反射区', pinyin: 'Shé Biān · Gān Dǎn', en: 'Lateral Borders · Liver & Gallbladder Zone' },
    descEn: 'Red/purple edges indicate Liver-Gallbladder Fire or Blood Stasis; scalloped teeth marks on the sides reflect Spleen Qi/Dampness.',
    descZh: '“舌边候肝胆”（左肝右胆）。舌边红赤主肝胆火旺，青紫瘀点主气滞血瘀，齿痕主脾虚湿盛。'
  },
  {
    id: 'center',
    name: { zh: '舌中 · 脾胃反射区', pinyin: 'Shé Zhōng · Pí Wèi', en: 'Center · Spleen & Stomach (Middle Jiao) Zone' },
    descEn: 'Coating thickness and moisture in the center directly mirror Stomach Qi, food stagnation, or Middle Jiao Damp-Heat.',
    descZh: '“舌中候中焦脾胃”。舌中苔厚腻主食积或痰湿中阻；中剥苔主胃阴不足。'
  },
  {
    id: 'root',
    name: { zh: '舌根 · 肾与下焦区', pinyin: 'Shé Gēn · Shèn Yǔ Xià Jiāo', en: 'Tongue Root · Kidney, Bladder & Lower Jiao Zone' },
    descEn: 'Greasy yellow fur at the root signals Lower Jiao Damp-Heat; peeled root coat indicates Kidney Yin exhaustion.',
    descZh: '“舌根候下焦肾与膀胱”。根部黄腻主下焦湿热（如淋证、带下），舌根无苔主肾阴枯竭。'
  }
];

export default function DiagnosticsModule({
  lang,
  bookmarks,
  onToggleBookmark
}: DiagnosticsModuleProps) {
  const [selectedTongueId, setSelectedTongueId] = useState<string>('pale-scalloped');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('sides');
  const [selectedPulseId, setSelectedPulseId] = useState<string>('wiry');

  // Bian Zheng Sandbox State
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'sighing',
    'irritability',
    'fatigue',
    'bloating',
    'loose-stools'
  ]);
  const [sandboxTongueId, setSandboxTongueId] = useState<string>('pale-scalloped');
  const [sandboxPulseId, setSandboxPulseId] = useState<string>('wiry');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeTongue =
    TONGUE_STATES.find((t) => t.id === selectedTongueId) || TONGUE_STATES[0];
  const activeZone =
    TONGUE_ZONES.find((z) => z.id === selectedZoneId) || TONGUE_ZONES[0];
  const activePulse =
    PULSE_TYPES.find((p) => p.id === selectedPulseId) || PULSE_TYPES[0];

  // Animated Pulse Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw Subtle Grid & 3 Depth Lines (Fu 浮, Zhong 中, Chen 沉)
      ctx.strokeStyle = 'rgba(214, 199, 178, 0.2)';
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach((ratio) => {
        ctx.beginPath();
        ctx.moveTo(0, h * ratio);
        ctx.lineTo(w, h * ratio);
        ctx.stroke();
      });

      const baselineY =
        activePulse.depthLevel === 'Superficial (浮)'
          ? h * 0.32
          : activePulse.depthLevel === 'Deep (沉)'
          ? h * 0.68
          : h * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = activePulse.id === 'thready-rapid' ? 1.8 : 3.2;

      for (let x = 0; x < w; x++) {
        const t = (x / w) * Math.PI * 2 * (activePulse.frequencyHz * 3) + phase;
        const primary = Math.pow(Math.max(0, Math.sin(t)), activePulse.sharpness);
        const notch =
          activePulse.dicroticNotch *
          Math.pow(Math.max(0, Math.sin(t - 1.1)), 2);
        const yOffset = (primary + notch) * (activePulse.amplitude * 52);
        const y = baselineY - yOffset;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase -= 0.06 * activePulse.frequencyHz;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [activePulse]);

  // Match Best Clinical Case Pattern based on sandbox selections
  const scoredCases = DIAGNOSTIC_CASES.map((c) => {
    const symptomMatches = c.symptoms.filter((s) => selectedSymptoms.includes(s)).length;
    const tongueBonus = c.tongueId === sandboxTongueId ? 2 : 0;
    const pulseBonus = c.pulseId === sandboxPulseId ? 2 : 0;
    return {
      caseItem: c,
      score: symptomMatches * 2 + tongueBonus + pulseBonus
    };
  }).sort((a, b) => b.score - a.score);

  const bestMatchedCase = scoredCases[0].caseItem;
  const matchedFormula = CLASSIC_FORMULAS.find(
    (f) => f.id === bestMatchedCase.recommendedFormulaId
  );

  const loadPresetCase = (caseId: string) => {
    const found = DIAGNOSTIC_CASES.find((c) => c.id === caseId);
    if (!found) return;
    setSelectedSymptoms(found.symptoms);
    setSandboxTongueId(found.tongueId);
    setSandboxPulseId(found.pulseId);
    setSelectedTongueId(found.tongueId);
    setSelectedPulseId(found.pulseId);
  };

  const toggleSymptom = (symId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symId) ? prev.filter((s) => s !== symId) : [...prev, symId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Google Skills Track Overview Card */}
      <div className="skills-surface p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <LabMetadataChips
              chips={[
                { label: 'Path 03 · 四诊八纲辨证', tone: 'cinnabar' },
                { label: 'Clinical Simulation Lab', tone: 'amber' },
                { label: 'Tongue, Pulse & Case Sandbox', tone: 'jade' },
                { label: '20 min', tone: 'stone' }
              ]}
            />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-wide">
              望舌、切脉与八纲脏腑辨证模拟器
              {lang !== 'zh' && (
                <span className="block text-base sm:text-lg font-sans font-normal text-stone-600 dark:text-stone-400 mt-1">
                  Interactive Tongue Inspection, Pulse Oscilloscope & Bian Zheng Clinical Sandbox
                </span>
              )}
            </h2>
            {renderProse(
              lang,
              'TCM diagnosis gathers clues through the Four Examinations (望 Inspection, 闻 Auscultation/Olfaction, 问 Inquiry, 切 Palpation) to synthesize a Root Pattern (证候 Zheng)—revealing the exact location, temperature, and strength of disharmony.',
              '“望而知之谓之神，切而知之谓之巧。”中医通过望舌、切脉、问诊四诊合参，以八纲（阴阳、表里、寒热、虚实）与脏腑辨证洞察疾病本质。'
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-[24px] overflow-hidden border border-stone-300/70 dark:border-stone-700 shadow-md aspect-video bg-stone-200 dark:bg-stone-900">
              <img
                src="/images/diagnostics_scroll.jpg"
                alt="Classical Diagnostics Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 py-3 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《四诊望舌切脉图》· Pulse & Tongue Inspection</span>
                <VermilionSeal text="寸关尺三部" variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAB 01: INTERACTIVE TONGUE ATLAS + PULSE OSCILLOSCOPE */}
      <section className="skills-surface overflow-hidden">
        <div className="skills-lab-header px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VermilionSeal text="Lab 01 · 舌脉互参" variant="solid" />
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                察舌辨苔与寸关尺脉象实训 · Tongue Topography & Pulse Oscilloscope
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Inspect Zang-Fu reflection zones on the tongue and compare radial pulse waveforms across three depths
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200/80 dark:divide-stone-800">
          {/* Left Page: Interactive Tongue Diagnostic SVG Map */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  望舌诊图谱 · Interactive Tongue Topography
                </h4>
                <p className="text-xs text-stone-500">
                  Select a tongue presentation pill or click Zang-Fu reflection zones
                </p>
              </div>
              <VermilionSeal text="伤寒金镜录" />
            </div>

            {/* Rounded Pill Tongue Selector */}
            <div className="flex flex-wrap gap-1.5">
              {TONGUE_STATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTongueId(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition border ${
                    t.id === selectedTongueId
                      ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-2xs'
                      : 'bg-white/85 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300/70 dark:border-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.name.zh.split(' · ')[0]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pt-1">
              {/* SVG Tongue Visualizer */}
              <div className="sm:col-span-5 flex flex-col items-center rounded-[22px] bg-[#FAF6F0] dark:bg-stone-950 p-4 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
                <svg viewBox="0 0 200 250" className="w-40 h-52 select-none">
                  {/* Base Tongue Body */}
                  <path
                    d={
                      activeTongue.edgeStyle === 'scalloped'
                        ? 'M 45,30 Q 100,15 155,30 Q 170,65 158,85 Q 172,110 156,135 Q 168,160 150,185 Q 128,230 100,235 Q 72,230 50,185 Q 32,160 44,135 Q 28,110 42,85 Q 30,65 45,30 Z'
                        : 'M 45,30 Q 100,15 155,30 C 172,95 165,175 135,215 Q 100,242 65,215 C 35,175 28,95 45,30 Z'
                    }
                    fill={activeTongue.bodyColorHex}
                    stroke="#7F1D1D"
                    strokeWidth="2.5"
                  />

                  {/* Tongue Coating Layer (舌苔) */}
                  <ellipse
                    cx="100"
                    cy="115"
                    rx="42"
                    ry="72"
                    fill={activeTongue.coatColorHex}
                    fillOpacity={activeTongue.coatOpacity}
                  />

                  {/* Cracks if Crimson Peeled */}
                  {activeTongue.coatTexture === 'peeled' && (
                    <g stroke="#7F1D1D" strokeWidth="1.8" opacity="0.75">
                      <line x1="100" y1="45" x2="100" y2="195" />
                      <line x1="78" y1="85" x2="100" y2="102" />
                      <line x1="122" y1="90" x2="100" y2="108" />
                      <line x1="75" y1="135" x2="100" y2="150" />
                      <line x1="125" y1="140" x2="100" y2="155" />
                    </g>
                  )}

                  {/* Stasis Petechiae if Purple */}
                  {activeTongue.id === 'purple-stasis' && (
                    <g fill="#3B0764" opacity="0.8">
                      <circle cx="62" cy="145" r="3" />
                      <circle cx="58" cy="165" r="2.5" />
                      <circle cx="138" cy="150" r="3.2" />
                      <circle cx="132" cy="172" r="2.2" />
                      <circle cx="88" cy="205" r="2.5" />
                      <circle cx="112" cy="202" r="2.8" />
                    </g>
                  )}

                  {/* Clickable Zang-Fu Zone Overlays */}
                  <g onClick={() => setSelectedZoneId('root')} className="cursor-pointer">
                    <rect
                      x="65"
                      y="34"
                      width="70"
                      height="36"
                      rx="10"
                      fill={selectedZoneId === 'root' ? 'rgba(255,255,255,0.28)' : 'transparent'}
                      stroke={selectedZoneId === 'root' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                      strokeDasharray="3 2"
                    />
                    <text x="100" y="56" textAnchor="middle" fill="#1C1917" className="text-[11px] font-serif font-bold">
                      舌根 · 肾
                    </text>
                  </g>

                  <g onClick={() => setSelectedZoneId('center')} className="cursor-pointer">
                    <rect
                      x="68"
                      y="80"
                      width="64"
                      height="72"
                      rx="12"
                      fill={selectedZoneId === 'center' ? 'rgba(255,255,255,0.28)' : 'transparent'}
                      stroke={selectedZoneId === 'center' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                      strokeDasharray="3 2"
                    />
                    <text x="100" y="120" textAnchor="middle" fill="#1C1917" className="text-[11px] font-serif font-bold">
                      舌中 · 脾胃
                    </text>
                  </g>

                  <g onClick={() => setSelectedZoneId('sides')} className="cursor-pointer">
                    <text x="50" y="125" textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-serif font-bold">
                      肝胆
                    </text>
                    <text x="150" y="125" textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-serif font-bold">
                      肝胆
                    </text>
                  </g>

                  <g onClick={() => setSelectedZoneId('tip')} className="cursor-pointer">
                    <ellipse
                      cx="100"
                      cy="195"
                      rx="35"
                      ry="24"
                      fill={selectedZoneId === 'tip' ? 'rgba(255,255,255,0.28)' : 'transparent'}
                      stroke={selectedZoneId === 'tip' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                      strokeDasharray="3 2"
                    />
                    <text x="100" y="199" textAnchor="middle" fill="#FFFFFF" className="text-[11px] font-serif font-bold">
                      舌尖 · 心肺
                    </text>
                  </g>
                </svg>
              </div>

              {/* Tongue Interpretation Card */}
              <div className="sm:col-span-7 space-y-3">
                <div className="skills-card p-4 space-y-2">
                  <div className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    {activeTongue.name.zh}
                  </div>
                  <div className="text-xs font-mono text-amber-800 dark:text-amber-400">
                    {activeTongue.name.en}
                  </div>
                  {renderProse(lang, activeTongue.clinicalMeaningEn, activeTongue.clinicalMeaningZh)}
                  <div className="pt-2 border-t border-stone-200/80 dark:border-stone-700 flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-900/10 text-[#B91C1C] dark:text-red-300 font-semibold">
                      主证: {activeTongue.associatedPattern.zh}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-900 dark:text-amber-300 font-semibold">
                      主方: {activeTongue.recommendedFormula.zh}
                    </span>
                  </div>
                </div>

                {/* Clicked Topographical Zone Info */}
                <div className="p-3.5 rounded-2xl bg-amber-900/8 dark:bg-amber-950/35 border border-amber-800/20 space-y-1">
                  <div className="text-xs font-serif font-bold text-amber-950 dark:text-amber-200">
                    脏腑分部 · {activeZone.name.zh} ({activeZone.name.en})
                  </div>
                  {renderProse(lang, activeZone.descEn, activeZone.descZh)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Page: Animated Pulse Waveform Visualizer */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  寸关尺脉象图谱 · Pulse Waveform Oscilloscope
                </h4>
                <p className="text-xs text-stone-500">
                  Compare tactile pulse waves across Superficial (浮), Middle (中), and Deep (沉) levels
                </p>
              </div>
              <VermilionSeal text="濒湖脉学" />
            </div>

            {/* Rounded Pill Pulse Selector */}
            <div className="flex flex-wrap gap-1.5">
              {PULSE_TYPES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPulseId(p.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition border ${
                    p.id === selectedPulseId
                      ? 'bg-stone-900 text-amber-50 border-stone-900 dark:bg-amber-600 dark:text-stone-950 shadow-2xs'
                      : 'bg-white/85 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300/70 dark:border-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {p.name.zh} · {p.name.en.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Live Canvas Oscilloscope */}
            <div className="rounded-[22px] overflow-hidden bg-[#161514] border border-stone-800 p-4 shadow-sm">
              <div className="flex justify-between text-[10px] font-mono text-amber-200/70 mb-1">
                <span>Depth Level: {activePulse.depthLevel}</span>
                <span>Cun (寸-Distal) · Guan (关-Middle) · Chi (尺-Proximal)</span>
              </div>
              <canvas
                ref={canvasRef}
                width={520}
                height={150}
                className="w-full h-[140px] block"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1 border-t border-stone-800 pt-1.5">
                <span>浮取 (Light Touch)</span>
                <span>中取 (Moderate)</span>
                <span>沉取 (Deep Press to Bone)</span>
              </div>
            </div>

            {/* Tactile Metaphor & Clinical Meaning */}
            <div className="skills-card p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <TermBadge term={activePulse.name} lang={lang} />
                <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                  {activePulse.depthLevel}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-900/8 dark:bg-amber-950/40 border border-amber-800/20 text-xs">
                <span className="font-serif font-bold text-stone-900 dark:text-amber-200">
                  指下体悟 (Classical Tactile Simile): 「{activePulse.tactileMetaphor.zh}」
                </span>
                {lang !== 'zh' && (
                  <span className="block text-stone-600 dark:text-stone-300 mt-0.5 italic">
                    {activePulse.tactileMetaphor.en}
                  </span>
                )}
              </div>
              {renderProse(lang, activePulse.clinicalMeaningEn, activePulse.clinicalMeaningZh)}
            </div>
          </div>
        </div>
      </section>

      {/* LAB 02: BIAN ZHENG (辨证论治) SYMPTOM SANDBOX & CASE SIMULATOR */}
      <section className="skills-surface overflow-hidden">
        <div className="skills-lab-header px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VermilionSeal text="Lab 02 · 辨证沙盒" variant="solid" />
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                四诊合参辨证医案推演 · Bian Zheng Pattern Differentiation Sandbox
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Toggle patient symptoms, tongue, and pulse on the left or load a preset clinical case
              </p>
            </div>
          </div>

          {/* Preset Clinical Case Pill Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {DIAGNOSTIC_CASES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => loadPresetCase(c.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-serif font-bold bg-white/85 dark:bg-stone-800 text-stone-800 dark:text-amber-200 border border-stone-300/80 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-700 transition"
              >
                医案 {idx + 1}: {c.title.zh.split('（')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200/80 dark:divide-stone-800">
          {/* Left Page: Select Symptoms, Tongue, and Pulse */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  1. 问诊症状勾选 · Select Patient Symptoms
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-900/10 text-xs font-mono text-amber-900 dark:text-amber-300">
                  Selected: {selectedSymptoms.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DIAGNOSTIC_SYMPTOM_OPTIONS.map((sym) => {
                  const checked = selectedSymptoms.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      onClick={() => toggleSymptom(sym.id)}
                      className={`p-3 rounded-2xl text-left border transition flex items-start gap-2.5 ${
                        checked
                          ? 'bg-amber-900/10 dark:bg-amber-500/20 border-amber-800/50 dark:border-amber-500 text-stone-900 dark:text-stone-100 shadow-2xs'
                          : 'bg-white/75 dark:bg-stone-800/50 border-stone-200/80 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-white'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          checked ? 'text-[#B91C1C] dark:text-amber-400' : 'opacity-25'
                        }`}
                      />
                      <div>
                        <div className="font-serif font-bold text-xs">{sym.label.zh}</div>
                        {lang !== 'zh' && (
                          <div className="text-[11px] opacity-85">{sym.label.en}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200/80 dark:border-stone-800">
              <div>
                <label className="block font-serif font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  2. 望舌象 · Patient Tongue Sign
                </label>
                <select
                  value={sandboxTongueId}
                  onChange={(e) => setSandboxTongueId(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/85 dark:bg-stone-900 px-3.5 py-2.5 text-xs font-serif font-bold text-stone-900 dark:text-stone-100"
                >
                  {TONGUE_STATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name.zh} · {t.name.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-serif font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  3. 切脉象 · Patient Pulse Quality
                </label>
                <select
                  value={sandboxPulseId}
                  onChange={(e) => setSandboxPulseId(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/85 dark:bg-stone-900 px-3.5 py-2.5 text-xs font-serif font-bold text-stone-900 dark:text-stone-100"
                >
                  {PULSE_TYPES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.zh} · {p.name.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Page: Synthesized Pattern Diagnosis & Treatment Output */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#FAF6F0]/45 dark:bg-stone-950/45">
            <div className="skills-card p-6 space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-stone-200/80 dark:border-stone-700 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <VermilionSeal text="辨证断案" variant="solid" />
                    <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                      DEDUCED SYNDROME PATTERN
                    </span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
                    {bestMatchedCase.patternDiagnosis.zh} · {bestMatchedCase.patternDiagnosis.en}
                  </h4>
                  <p className="text-xs font-mono text-amber-800 dark:text-amber-400">
                    ({bestMatchedCase.patternDiagnosis.pinyin})
                  </p>
                </div>

                <button
                  onClick={() =>
                    onToggleBookmark(
                      `case-${bestMatchedCase.id}`,
                      `${bestMatchedCase.patternDiagnosis.zh} · ${bestMatchedCase.patternDiagnosis.en}`,
                      'Diagnostics & Patterns'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white/85 dark:bg-stone-900 text-xs font-medium hover:bg-amber-50 transition"
                >
                  {bookmarks.includes(`case-${bestMatchedCase.id}`) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>

              {/* Eight Principles Breakdown (八纲辨证) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: '表里 Location', val: bestMatchedCase.eightPrinciples.location },
                  { label: '寒热 Nature', val: bestMatchedCase.eightPrinciples.nature },
                  { label: '虚实 Strength', val: bestMatchedCase.eightPrinciples.strength },
                  { label: '阴阳总纲 Root', val: bestMatchedCase.eightPrinciples.root }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-2xl bg-white/85 dark:bg-stone-900/85 border border-stone-200/80 dark:border-stone-700"
                  >
                    <div className="text-[10px] font-mono text-stone-500">{item.label}</div>
                    <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 mt-0.5">
                      {item.val.zh}
                    </div>
                    {lang !== 'zh' && (
                      <div className="text-[10px] text-stone-600 dark:text-stone-400">
                        {item.val.en}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pathomechanism Analysis (病机分析) */}
              <div className="p-4 rounded-2xl bg-white/85 dark:bg-stone-900/85 border border-stone-200/80 dark:border-stone-700 space-y-1.5">
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#B91C1C] dark:text-amber-400">
                  审症求因 · 病机推导 (Pathomechanism Synthesis)
                </div>
                {renderProse(
                  lang,
                  bestMatchedCase.pathomechanismEn,
                  bestMatchedCase.pathomechanismZh
                )}
              </div>

              {/* Treatment Principle + Formula + Acupoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-900/6 dark:bg-emerald-950/35 border border-emerald-800/20">
                  <div className="text-[11px] font-mono uppercase text-[#2D6A4F] dark:text-emerald-400">
                    治法纲领 · Treatment Principle
                  </div>
                  <div className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                    {bestMatchedCase.treatmentPrinciple.zh}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300">
                    {bestMatchedCase.treatmentPrinciple.en}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/6 dark:bg-amber-950/35 border border-amber-800/20">
                  <div className="text-[11px] font-mono uppercase text-amber-900 dark:text-amber-400">
                    代表方剂与配穴 · Formula & Acupoints
                  </div>
                  {matchedFormula && (
                    <div className="font-serif font-bold text-base text-[#B91C1C] dark:text-amber-300 mt-1">
                      {matchedFormula.name.zh} ({matchedFormula.name.en})
                    </div>
                  )}
                  <div className="text-xs font-mono text-stone-700 dark:text-stone-300 mt-1">
                    主穴 Acupoints: {bestMatchedCase.recommendedAcupoints.join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
