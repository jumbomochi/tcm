'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LanguageMode } from '@/types/tcm';
import { MERIDIAN_CHANNELS, KEY_ACUPOINTS } from '@/data/meridiansData';
import { WUXING_ELEMENTS } from '@/data/foundationsData';
import { renderProse, TermBadge } from './BilingualUi';
import {
  Compass,
  Box,
  Layers,
  MapPin,
  Ruler,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Navigation
} from 'lucide-react';

const Meridian3DCanvas = dynamic(() => import('./Meridian3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-stone-900 text-amber-200 flex items-center justify-center font-serif">
      Loading 3D Bronze Acupoint Mannequin (加载三维经络铜人模型)...
    </div>
  )
});

interface MeridiansModuleProps {
  lang: LanguageMode;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, category: string) => void;
}

export default function MeridiansModule({
  lang,
  bookmarks,
  onToggleBookmark
}: MeridiansModuleProps) {
  const [viewerMode, setViewerMode] = useState<'both' | '2d' | '3d'>('both');
  const [svgViewSide, setSvgViewSide] = useState<'anterior' | 'posterior'>('anterior');
  const [selectedMeridianId, setSelectedMeridianId] = useState<string>('ALL');
  const [selectedAcupointCode, setSelectedAcupointCode] = useState<string>('ST36');

  const activePoint =
    KEY_ACUPOINTS.find((pt) => pt.code === selectedAcupointCode) || KEY_ACUPOINTS[0];
  const activeChannel =
    MERIDIAN_CHANNELS.find((ch) =>
      selectedMeridianId === 'ALL' ? ch.id === activePoint.meridianId : ch.id === selectedMeridianId
    ) || MERIDIAN_CHANNELS[0];

  const handleSelectPoint = (code: string) => {
    setSelectedAcupointCode(code);
    const pt = KEY_ACUPOINTS.find((p) => p.code === code);
    if (pt && pt.coords2D.view !== 'lateral') {
      setSvgViewSide(pt.coords2D.view);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner with Classical Meridian Scroll */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-900/20 dark:border-stone-700 bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#EFE6D5] dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/10 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <span>经络与腧穴图谱 · Meridian & Acupoint Atlas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              十二正经、任督二脉与核心要穴
              {lang !== 'zh' && (
                <span className="block text-lg sm:text-xl font-normal text-stone-600 dark:text-stone-300 mt-1">
                  2D Anatomical SVG + 3D WebGL Meridian Pathways & Clinical Acupoints
                </span>
              )}
            </h2>
            {renderProse(
              lang,
              'The Jing-Luo (经络) system is the energetic network connecting internal Zang-Fu organs with the body surface and extremities. Where Qi and Blood gather and infuse along these pathways are the Acupoints (腧穴).',
              '“经脉者，所以能决死生，处百病，调虚实，不可不通。”经络内属脏腑、外络肢节，腧穴则是脏腑经络之气输注于体表的特殊门户。'
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border-2 border-amber-900/25 shadow-md aspect-video bg-stone-200 dark:bg-stone-800">
              <img
                src="/images/meridian_scroll.jpg"
                alt="Classical Meridian Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《明堂经络铜人图》· Classical Meridian Atlas</span>
                <span className="px-2 py-0.5 bg-amber-700/90 rounded text-[10px]">经穴流注</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar: Channels & View Mode Switcher */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-red-800 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Select Meridian Channel (选择经脉) & Spatial View
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg">
            <button
              onClick={() => setViewerMode('both')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                viewerMode === 'both'
                  ? 'bg-amber-800 text-white'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Dual 2D + 3D</span>
            </button>
            <button
              onClick={() => setViewerMode('2d')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                viewerMode === '2d'
                  ? 'bg-amber-800 text-white'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>2D SVG Atlas</span>
            </button>
            <button
              onClick={() => setViewerMode('3d')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                viewerMode === '3d'
                  ? 'bg-amber-800 text-white'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D WebGL Mannequin</span>
            </button>
          </div>
        </div>

        {/* Channel Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedMeridianId('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              selectedMeridianId === 'ALL'
                ? 'bg-stone-900 text-amber-100 border-stone-900 dark:bg-amber-500 dark:text-stone-950'
                : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
            }`}
          >
            All Channels · 十二经与任督全览
          </button>
          {MERIDIAN_CHANNELS.map((ch) => {
            const elColor =
              WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';
            const active = selectedMeridianId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedMeridianId(ch.id);
                  const firstPt = KEY_ACUPOINTS.find((p) => p.meridianId === ch.id);
                  if (firstPt) handleSelectPoint(firstPt.code);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition border ${
                  active
                    ? 'text-white shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
                style={active ? { backgroundColor: elColor, borderColor: elColor } : undefined}
              >
                {ch.id} · {ch.name.zh}
              </button>
            );
          })}
        </div>

        {/* Dual Viewers + Acupoint Drawer Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start pt-2">
          {/* Left/Center Visualizers */}
          <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2D Precision SVG Body Map */}
            {(viewerMode === 'both' || viewerMode === '2d') && (
              <div
                className={`${
                  viewerMode === '2d' ? 'md:col-span-2' : ''
                } rounded-2xl border border-amber-900/20 dark:border-stone-700 bg-[#FAF6F0] dark:bg-stone-950 p-4 flex flex-col items-center relative h-[500px]`}
              >
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-xs font-serif font-bold text-stone-800 dark:text-stone-200">
                    2D SVG Atlas ({svgViewSide === 'anterior' ? '正面 Anterior' : '背面 Posterior'})
                  </span>
                  <div className="flex gap-1 bg-stone-200/80 dark:bg-stone-800 p-0.5 rounded-md text-[11px]">
                    <button
                      onClick={() => setSvgViewSide('anterior')}
                      className={`px-2 py-0.5 rounded ${
                        svgViewSide === 'anterior'
                          ? 'bg-red-800 text-white font-semibold'
                          : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      正面 Front
                    </button>
                    <button
                      onClick={() => setSvgViewSide('posterior')}
                      className={`px-2 py-0.5 rounded ${
                        svgViewSide === 'posterior'
                          ? 'bg-red-800 text-white font-semibold'
                          : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      背面 Back
                    </button>
                  </div>
                </div>

                <svg viewBox="0 0 100 105" className="w-full h-full max-w-[260px] select-none">
                  {/* Anatomical Silhouette Outline */}
                  <g
                    fill="#EFE6D5"
                    stroke="#B45309"
                    strokeWidth="0.6"
                    opacity="0.85"
                  >
                    {/* Head */}
                    <circle cx="50" cy="11" r="6.5" />
                    {/* Neck */}
                    <rect x="47.5" y="17" width="5" height="4" rx="1" />
                    {/* Torso */}
                    <path d="M 37,22 Q 50,20 63,22 L 59,54 Q 50,56 41,54 Z" />
                    {/* Left Arm (Viewer Left) */}
                    <path d="M 37,22 L 26,42 L 17,61 L 21,63 L 31,44 L 39,28 Z" />
                    {/* Right Arm */}
                    <path d="M 63,22 L 74,42 L 83,61 L 79,63 L 69,44 L 61,28 Z" />
                    {/* Left Leg */}
                    <path d="M 41,54 L 40,76 L 41,96 L 47,96 L 48,76 L 49,55 Z" />
                    {/* Right Leg */}
                    <path d="M 59,54 L 60,76 L 59,96 L 53,96 L 52,76 L 51,55 Z" />
                  </g>

                  {/* Centerline (Ren / Du) */}
                  <line
                    x1="50"
                    y1="5"
                    x2="50"
                    y2="55"
                    stroke="#D97706"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 1.5"
                  />

                  {/* Meridian Pathways on current 2D side */}
                  {MERIDIAN_CHANNELS.map((ch) => {
                    const pathData =
                      svgViewSide === 'anterior' ? ch.svgPathAnterior : ch.svgPathPosterior;
                    if (!pathData) return null;
                    const isSelected =
                      selectedMeridianId === 'ALL' || selectedMeridianId === ch.id;
                    const elColor =
                      WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';

                    return (
                      <path
                        key={ch.id}
                        d={pathData}
                        fill="none"
                        stroke={elColor}
                        strokeWidth={isSelected ? '1.3' : '0.5'}
                        strokeOpacity={isSelected ? 0.95 : 0.25}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Acupoint Nodes */}
                  {KEY_ACUPOINTS.filter((pt) => pt.coords2D.view === svgViewSide).map((pt) => {
                    const isSelected = pt.code === selectedAcupointCode;
                    const elColor =
                      WUXING_ELEMENTS.find((e) => e.key === pt.element)?.colorHex || '#C83E31';

                    return (
                      <g
                        key={pt.code}
                        onClick={() => handleSelectPoint(pt.code)}
                        className="cursor-pointer"
                      >
                        {isSelected && (
                          <circle
                            cx={pt.coords2D.x}
                            cy={pt.coords2D.y}
                            r="3.6"
                            fill="none"
                            stroke="#C83E31"
                            strokeWidth="0.6"
                          />
                        )}
                        <circle
                          cx={pt.coords2D.x}
                          cy={pt.coords2D.y}
                          r={isSelected ? '2.3' : '1.7'}
                          fill={isSelected ? '#C83E31' : elColor}
                          stroke="#FFFFFF"
                          strokeWidth="0.4"
                        />
                        <text
                          x={pt.coords2D.x - 3}
                          y={pt.coords2D.y + 0.8}
                          textAnchor="end"
                          fill={isSelected ? '#991B1B' : '#1C1917'}
                          className="text-[3.1px] font-serif font-bold"
                        >
                          {pt.code} {pt.name.zh}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Quick Point Switcher Strip at Bottom */}
                <div className="w-full flex flex-wrap justify-center gap-1 mt-2">
                  {KEY_ACUPOINTS.map((pt) => (
                    <button
                      key={pt.code}
                      onClick={() => handleSelectPoint(pt.code)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                        pt.code === selectedAcupointCode
                          ? 'bg-red-800 text-white font-bold'
                          : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-200/60'
                      }`}
                    >
                      {pt.code} {pt.name.zh}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3D WebGL Viewer */}
            {(viewerMode === 'both' || viewerMode === '3d') && (
              <div className={viewerMode === '3d' ? 'md:col-span-2' : ''}>
                <Meridian3DCanvas
                  meridians={MERIDIAN_CHANNELS}
                  acupoints={KEY_ACUPOINTS}
                  selectedMeridianId={selectedMeridianId}
                  selectedAcupointCode={selectedAcupointCode}
                  onSelectAcupoint={handleSelectPoint}
                />
              </div>
            )}
          </div>

          {/* Right Column: Rich-Media Acupoint & Meridian Drawer */}
          <div className="xl:col-span-5 space-y-4">
            {/* Active Meridian Summary Card */}
            <div className="p-4 rounded-xl bg-stone-100/90 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Active Channel · 所属经脉</span>
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-700">
                  {activeChannel.polarity} · Peak: {activeChannel.peakTime}
                </span>
              </div>
              <div className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                {activeChannel.fullTitle.zh} · {activeChannel.fullTitle.en}
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-300 font-medium">
                Qi Trajectory: {lang === 'zh' ? activeChannel.flowDirectionZh : activeChannel.flowDirectionEn}
              </p>
              {renderProse(lang, activeChannel.pathwaySummaryEn, activeChannel.pathwaySummaryZh)}
            </div>

            {/* Active Acupoint Deep-Dive Card */}
            <div className="p-5 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/90 border-2 border-amber-900/25 dark:border-amber-500/30 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-red-800 text-amber-50 text-xs font-mono font-bold mb-1.5">
                    {activePoint.code} · {activePoint.categoryBadge.zh}
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {activePoint.name.zh} ({activePoint.name.pinyin}) · {activePoint.name.en}
                  </h4>
                </div>
                <button
                  onClick={() =>
                    onToggleBookmark(
                      `acupoint-${activePoint.code}`,
                      `${activePoint.code} ${activePoint.name.zh} · ${activePoint.name.en}`,
                      'Meridians & Acupoints'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-amber-100 dark:hover:bg-stone-700 transition"
                >
                  {bookmarks.includes(`acupoint-${activePoint.code}`) ? (
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

              {/* Character Etymology */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  📜 Character Etymology (穴名释义)
                </div>
                {renderProse(lang, activePoint.etymologyEn, activePoint.etymologyZh)}
              </div>

              {/* Anatomical Location & Finger-Cun Guide */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-800/20 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4" />
                  <span>Anatomical Location & Finger-Cun Guide (标准定位与简便取穴)</span>
                </div>
                {renderProse(lang, activePoint.locationEn, activePoint.locationZh)}
                <div className="pt-2 border-t border-amber-900/15 text-xs text-stone-700 dark:text-stone-300">
                  <strong>👍 Cun Measurement Tip (手指同身寸): </strong>
                  {lang === 'zh' ? activePoint.cunGuideZh : activePoint.cunGuideEn}
                </div>
              </div>

              {/* Therapeutic Actions Badges */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-800" />
                  <span>Core Therapeutic Actions (功效主治)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePoint.actions.map((act) => (
                    <TermBadge key={act.zh} term={act} lang={lang} size="sm" />
                  ))}
                </div>
              </div>

              {/* Clinical Indications List */}
              <div className="space-y-1.5 text-xs sm:text-sm">
                <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
                  {(lang === 'zh' ? activePoint.indicationsZh : activePoint.indicationsEn).map(
                    (ind) => (
                      <li key={ind}>{ind}</li>
                    )
                  )}
                </ul>
                {lang === 'dual' && (
                  <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400 font-serif text-xs pt-1 border-t border-stone-200 dark:border-stone-700">
                    {activePoint.indicationsZh.map((ind) => (
                      <li key={ind}>{ind}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-stone-200/70 dark:bg-stone-900 text-xs text-stone-700 dark:text-stone-300">
                <strong>Needling / Acupressure Method:</strong> {activePoint.needlingEn}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
