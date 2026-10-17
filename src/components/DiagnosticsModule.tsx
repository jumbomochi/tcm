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
import { renderProse, TermBadge } from './BilingualUi';
import {
  Eye,
  Activity,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Wand2
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
    <div className="space-y-10">
      {/* Hero Banner with Classical Diagnostics Scroll */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-900/20 dark:border-stone-700 bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#EFE6D5] dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/10 dark:bg-red-500/20 text-red-800 dark:text-red-300 text-xs font-semibold tracking-wider uppercase">
              <span>四诊合参 · 辨证论治 · Diagnostics & Pattern Differentiation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              望舌、切脉与八纲脏腑辨证模拟器
              {lang !== 'zh' && (
                <span className="block text-lg sm:text-xl font-normal text-stone-600 dark:text-stone-300 mt-1">
                  Interactive Tongue Atlas, Pulse Oscilloscope & Bian Zheng Pattern Sandbox
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
            <div className="relative rounded-xl overflow-hidden border-2 border-amber-900/25 shadow-md aspect-video bg-stone-200 dark:bg-stone-800">
              <img
                src="/images/diagnostics_scroll.jpg"
                alt="Classical Diagnostics Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《四诊望舌切脉图》· Pulse & Tongue Inspection</span>
                <span className="px-2 py-0.5 bg-red-800/90 rounded text-[10px]">寸关尺三部</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE TONGUE ATLAS + PULSE OSCILLOSCOPE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Tongue Diagnostic SVG Map */}
        <section className="lg:col-span-6 rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-red-800 dark:text-amber-400" />
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Interactive Tongue Map (望舌诊图谱)
                </h3>
                <p className="text-xs text-stone-500">
                  Switch tongue states or click Zang-Fu reflection zones
                </p>
              </div>
            </div>
          </div>

          {/* Tongue State Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {TONGUE_STATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTongueId(t.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold transition border ${
                  t.id === selectedTongueId
                    ? 'bg-red-800 text-white border-red-800 shadow-2xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {t.name.zh.split(' · ')[0]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* SVG Tongue Visualizer */}
            <div className="sm:col-span-5 flex flex-col items-center bg-[#FAF6F0] dark:bg-stone-950 rounded-xl p-4 border border-amber-900/20">
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
                {/* Root: Kidney */}
                <g
                  onClick={() => setSelectedZoneId('root')}
                  className="cursor-pointer"
                >
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

                {/* Center: Spleen & Stomach */}
                <g
                  onClick={() => setSelectedZoneId('center')}
                  className="cursor-pointer"
                >
                  <rect
                    x="68"
                    y="80"
                    width="64"
                    height="72"
                    rx="14"
                    fill={selectedZoneId === 'center' ? 'rgba(255,255,255,0.28)' : 'transparent'}
                    stroke={selectedZoneId === 'center' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                    strokeDasharray="3 2"
                  />
                  <text x="100" y="120" textAnchor="middle" fill="#1C1917" className="text-[11px] font-serif font-bold">
                    舌中 · 脾胃
                  </text>
                </g>

                {/* Sides: Liver & GB */}
                <g
                  onClick={() => setSelectedZoneId('sides')}
                  className="cursor-pointer"
                >
                  <text x="50" y="125" textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-serif font-bold">
                    肝胆
                  </text>
                  <text x="150" y="125" textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-serif font-bold">
                    肝胆
                  </text>
                </g>

                {/* Tip: Heart & Lung */}
                <g
                  onClick={() => setSelectedZoneId('tip')}
                  className="cursor-pointer"
                >
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

            {/* Tongue Interpretation Panel */}
            <div className="sm:col-span-7 space-y-3">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  {activeTongue.name.zh}
                </div>
                <div className="text-xs font-mono text-amber-800 dark:text-amber-400">
                  {activeTongue.name.en}
                </div>
                {renderProse(lang, activeTongue.clinicalMeaningEn, activeTongue.clinicalMeaningZh)}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-red-900/10 text-red-800 dark:text-red-300 font-semibold">
                    Pattern: {activeTongue.associatedPattern.zh}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-900/10 text-amber-900 dark:text-amber-300 font-semibold">
                    Formula: {activeTongue.recommendedFormula.zh}
                  </span>
                </div>
              </div>

              {/* Clicked Topographical Zone Info */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-800/20 space-y-1">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  📍 Selected Zone: {activeZone.name.zh} ({activeZone.name.en})
                </div>
                {renderProse(lang, activeZone.descEn, activeZone.descZh)}
              </div>
            </div>
          </div>
        </section>

        {/* Animated Pulse Waveform Visualizer */}
        <section className="lg:col-span-6 rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-800 dark:text-amber-400" />
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Pulse Waveform Oscilloscope (切脉波形图谱)
                </h3>
                <p className="text-xs text-stone-500">
                  Compare tactile pulse waves across Superficial (浮), Middle (中), and Deep (沉) levels
                </p>
              </div>
            </div>
          </div>

          {/* Pulse Selector Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {PULSE_TYPES.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPulseId(p.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold transition border ${
                  p.id === selectedPulseId
                    ? 'bg-amber-800 text-white border-amber-800 shadow-2xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {p.name.zh} · {p.name.en.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Live Canvas Oscilloscope */}
          <div className="relative rounded-xl overflow-hidden bg-[#161514] border border-amber-900/40 p-3">
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
            <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
              <span>浮取 (Light Touch)</span>
              <span>中取 (Moderate)</span>
              <span>沉取 (Deep Press to Bone)</span>
            </div>
          </div>

          {/* Tactile Metaphor & Clinical Meaning */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2">
            <div className="flex items-center justify-between">
              <TermBadge term={activePulse.name} lang={lang} />
              <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                {activePulse.depthLevel}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-800/20 text-xs">
              <span className="font-serif font-bold text-amber-950 dark:text-amber-200">
                指下体悟 (Classical Tactile Metaphor): 「{activePulse.tactileMetaphor.zh}」
              </span>
              {lang !== 'zh' && (
                <span className="block text-stone-700 dark:text-stone-300 mt-0.5 italic">
                  {activePulse.tactileMetaphor.en}
                </span>
              )}
            </div>
            {renderProse(lang, activePulse.clinicalMeaningEn, activePulse.clinicalMeaningZh)}
          </div>
        </section>
      </div>

      {/* SECTION 2: BIAN ZHENG (辨证论治) SYMPTOM SANDBOX & CASE SIMULATOR */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-800 dark:text-amber-400">
              Interactive Clinical Simulator · 四诊合参辨证沙盒
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              Bian Zheng (辨证论治) Pattern Differentiation Sandbox
            </h3>
          </div>

          {/* Preset Clinical Case Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-stone-500 mr-1 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5" /> Presets:
            </span>
            {DIAGNOSTIC_CASES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => loadPresetCase(c.id)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-serif font-semibold bg-amber-50 dark:bg-stone-800 text-amber-950 dark:text-amber-200 border border-amber-800/25 hover:bg-amber-100 transition"
              >
                Case {idx + 1}: {c.title.zh.split('（')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Select Symptoms, Tongue, and Pulse */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2.5">
                1. Toggle Patient Symptoms (选择临床症状)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DIAGNOSTIC_SYMPTOM_OPTIONS.map((sym) => {
                  const checked = selectedSymptoms.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      onClick={() => toggleSymptom(sym.id)}
                      className={`p-2.5 rounded-xl text-left border transition flex items-start gap-2 ${
                        checked
                          ? 'bg-amber-900/10 dark:bg-amber-500/20 border-amber-800 dark:border-amber-500 text-stone-900 dark:text-stone-100'
                          : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          checked ? 'text-red-800 dark:text-amber-400' : 'opacity-30'
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-serif font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  2. Patient Tongue Sign (舌象)
                </label>
                <select
                  value={sandboxTongueId}
                  onChange={(e) => setSandboxTongueId(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-2 text-xs font-serif font-semibold text-stone-900 dark:text-stone-100"
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
                  3. Patient Pulse Quality (脉象)
                </label>
                <select
                  value={sandboxPulseId}
                  onChange={(e) => setSandboxPulseId(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-2 text-xs font-serif font-semibold text-stone-900 dark:text-stone-100"
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

          {/* Right Column: Synthesized Pattern Diagnosis & Treatment Output */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/90 border-2 border-red-900/25 dark:border-amber-500/30 space-y-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-800 text-amber-50 text-xs font-serif font-bold">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>辨证结果 · Deduced Syndrome Pattern</span>
                  </span>
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
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-amber-100 dark:hover:bg-stone-700 transition"
                >
                  {bookmarks.includes(`case-${bestMatchedCase.id}`) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-700" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
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
                    className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700"
                  >
                    <div className="text-[10px] text-stone-500">{item.label}</div>
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
              <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pathomechanism Synthesis (审症求因 · 病机推导)</span>
                </div>
                {renderProse(
                  lang,
                  bestMatchedCase.pathomechanismEn,
                  bestMatchedCase.pathomechanismZh
                )}
              </div>

              {/* Treatment Principle + Formula + Acupoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-800/20">
                  <div className="text-[11px] font-bold uppercase text-emerald-800 dark:text-emerald-400">
                    治法 · Treatment Principle
                  </div>
                  <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-1">
                    {bestMatchedCase.treatmentPrinciple.zh}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300">
                    {bestMatchedCase.treatmentPrinciple.en}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/5 dark:bg-amber-950/30 border border-amber-800/20">
                  <div className="text-[11px] font-bold uppercase text-amber-900 dark:text-amber-400">
                    代表方剂与配穴 · Formula & Acupoints
                  </div>
                  {matchedFormula && (
                    <div className="font-serif font-bold text-sm text-red-800 dark:text-amber-300 mt-1">
                      {matchedFormula.name.zh} ({matchedFormula.name.en})
                    </div>
                  )}
                  <div className="text-xs font-mono text-stone-700 dark:text-stone-300 mt-1">
                    Acupoints: {bestMatchedCase.recommendedAcupoints.join(' + ')}
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
