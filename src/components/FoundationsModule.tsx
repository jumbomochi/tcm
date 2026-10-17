'use client';

import React, { useState, useEffect } from 'react';
import { ElementKey, LanguageMode } from '@/types/tcm';
import { WUXING_ELEMENTS, ZANG_FU_ORGANS, QI_CLOCK_HOURS } from '@/data/foundationsData';
import { ClassicalQuoteCard, renderProse, TermBadge } from './BilingualUi';
import {
  Flame,
  Droplets,
  Mountain,
  Shield,
  Sprout,
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  Activity
} from 'lucide-react';

interface FoundationsModuleProps {
  lang: LanguageMode;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, category: string) => void;
}

const ELEMENT_COORDS: Record<ElementKey, { x: number; y: number }> = {
  fire: { x: 200, y: 48 },
  earth: { x: 342, y: 152 },
  metal: { x: 288, y: 322 },
  water: { x: 112, y: 322 },
  wood: { x: 58, y: 152 }
};

export default function FoundationsModule({
  lang,
  bookmarks,
  onToggleBookmark
}: FoundationsModuleProps) {
  const [selectedElementKey, setSelectedElementKey] = useState<ElementKey>('wood');
  const [cycleMode, setCycleMode] = useState<'sheng-ke' | 'pathology'>('sheng-ke');
  const [selectedOrganId, setSelectedOrganId] = useState<string>('liver');
  const [selectedClockIdx, setSelectedClockIdx] = useState<number>(3); // Default 09:00-11:00 Spleen or live hour
  const [currentHour, setCurrentHour] = useState<number>(10);

  useEffect(() => {
    const now = new Date().getHours();
    setCurrentHour(now);
    const matchingIdx = QI_CLOCK_HOURS.findIndex((h) => {
      if (h.startHour === 23) return now >= 23 || now < 1;
      return now >= h.startHour && now < h.endHour;
    });
    if (matchingIdx !== -1) {
      setSelectedClockIdx(matchingIdx);
    }
  }, []);

  const activeElement = WUXING_ELEMENTS.find((e) => e.key === selectedElementKey) || WUXING_ELEMENTS[0];
  const activeOrgan = ZANG_FU_ORGANS.find((o) => o.id === selectedOrganId) || ZANG_FU_ORGANS[0];
  const activeClock = QI_CLOCK_HOURS[selectedClockIdx] || QI_CLOCK_HOURS[0];

  const getElementIcon = (key: ElementKey) => {
    switch (key) {
      case 'wood':
        return <Sprout className="w-5 h-5" />;
      case 'fire':
        return <Flame className="w-5 h-5" />;
      case 'earth':
        return <Mountain className="w-5 h-5" />;
      case 'metal':
        return <Shield className="w-5 h-5" />;
      case 'water':
        return <Droplets className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner with Classical Artwork */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-900/20 dark:border-stone-700 bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#EFE6D5] dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/10 dark:bg-red-500/20 text-red-800 dark:text-red-300 text-xs font-semibold tracking-wider uppercase">
              <span>中医基础理论 · Foundational Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              阴阳五行、藏象与子午流注
              {lang !== 'zh' && (
                <span className="block text-lg sm:text-xl font-normal text-stone-600 dark:text-stone-300 mt-1">
                  Yin-Yang, Five Elements, Zang-Fu Systems & The 24-Hour Qi Clock
                </span>
              )}
            </h2>
            {renderProse(
              lang,
              'Traditional Chinese Medicine views the human body as a microcosm of nature (天人合一). Rather than isolating anatomical parts, it tracks how Vital Substances (Qi 气, Blood 血, Jing 精, Fluids 津液) transform and circulate through five interconnected functional systems.',
              '中医学以“天人相应”整体观为核心，不孤立看待局部解剖，而是通过阴阳消长、五行生克制化，洞察气、血、精、津液在五脏六腑与十二时辰中的动态流转。'
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border-2 border-amber-900/25 shadow-md aspect-video bg-stone-200 dark:bg-stone-800">
              <img
                src="/images/wuxing_scroll.jpg"
                alt="Wu Xing Classical Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《五行生克与五脏应象图》· Classical Five-Element Scroll</span>
                <span className="px-2 py-0.5 bg-red-800/90 rounded text-[10px]">宣纸工笔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: WU XING DYNAMIC ENGINE */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Interactive Diagram 01 · 五行生克乘侮
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              Wu Xing (五行) Dynamic Cycle Engine
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg">
            <button
              onClick={() => setCycleMode('sheng-ke')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                cycleMode === 'sheng-ke'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>生理生克 · Generating & Controlling</span>
            </button>
            <button
              onClick={() => setCycleMode('pathology')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                cycleMode === 'pathology'
                  ? 'bg-red-800 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>病理乘侮 · Overacting & Counter-Acting</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
          {/* Interactive SVG Pentagram */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[380px] aspect-square relative bg-[#FAF6F0] dark:bg-stone-950 rounded-2xl border border-amber-900/20 dark:border-stone-800 p-3 shadow-inner">
              <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                <defs>
                  <marker
                    id="arrow-sheng"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#2D6A4F" />
                  </marker>
                  <marker
                    id="arrow-ke"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#C83E31" />
                  </marker>
                </defs>

                {/* Outer Generating Ring (相生) */}
                <circle
                  cx="200"
                  cy="202"
                  r="148"
                  fill="none"
                  stroke="#D6C7B2"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />

                {/* Generating (相生) Lines */}
                {WUXING_ELEMENTS.map((el) => {
                  const from = ELEMENT_COORDS[el.key];
                  const to = ELEMENT_COORDS[el.generates];
                  const isHighlighted = el.key === selectedElementKey || el.generates === selectedElementKey;
                  const dx = to.x - from.x;
                  const dy = to.y - from.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const pad = 42;
                  const x1 = Number((from.x + (dx / dist) * pad).toFixed(2));
                  const y1 = Number((from.y + (dy / dist) * pad).toFixed(2));
                  const x2 = Number((to.x - (dx / dist) * pad).toFixed(2));
                  const y2 = Number((to.y - (dy / dist) * pad).toFixed(2));

                  return (
                    <g key={`sheng-${el.key}`}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#2D6A4F"
                        strokeWidth={isHighlighted ? 3.5 : 1.8}
                        strokeOpacity={isHighlighted ? 0.95 : 0.35}
                        markerEnd="url(#arrow-sheng)"
                      />
                    </g>
                  );
                })}

                {/* Controlling (相克) Inner Star Lines */}
                {WUXING_ELEMENTS.map((el) => {
                  const from = ELEMENT_COORDS[el.key];
                  const to = ELEMENT_COORDS[el.controls];
                  const isHighlighted = el.key === selectedElementKey || el.controls === selectedElementKey;
                  const dx = to.x - from.x;
                  const dy = to.y - from.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const pad = 42;
                  const x1 = Number((from.x + (dx / dist) * pad).toFixed(2));
                  const y1 = Number((from.y + (dy / dist) * pad).toFixed(2));
                  const x2 = Number((to.x - (dx / dist) * pad).toFixed(2));
                  const y2 = Number((to.y - (dy / dist) * pad).toFixed(2));

                  return (
                    <g key={`ke-${el.key}`}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#C83E31"
                        strokeWidth={isHighlighted ? 3 : 1.5}
                        strokeDasharray={cycleMode === 'pathology' ? '5 3' : undefined}
                        strokeOpacity={isHighlighted ? 0.9 : 0.3}
                        markerEnd="url(#arrow-ke)"
                      />
                    </g>
                  );
                })}

                {/* Element Nodes */}
                {WUXING_ELEMENTS.map((el) => {
                  const pos = ELEMENT_COORDS[el.key];
                  const isSelected = el.key === selectedElementKey;
                  return (
                    <g
                      key={el.key}
                      onClick={() => {
                        setSelectedElementKey(el.key);
                        const matchingOrgan = ZANG_FU_ORGANS.find((o) => o.element === el.key);
                        if (matchingOrgan) setSelectedOrganId(matchingOrgan.id);
                      }}
                      className="cursor-pointer transition-transform"
                    >
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="42"
                          fill="none"
                          stroke={el.colorHex}
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                        />
                      )}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="35"
                        fill={isSelected ? el.colorHex : '#FAF6F0'}
                        stroke={el.colorHex}
                        strokeWidth="3"
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 4}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : el.colorHex}
                        className="font-serif font-bold text-lg"
                      >
                        {el.name.zh} · {el.zangOrgan.zh}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 14}
                        textAnchor="middle"
                        fill={isSelected ? '#FEF3C7' : '#57534E'}
                        className="text-[10px] font-sans font-semibold"
                      >
                        {el.name.en}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-stone-600 dark:text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#2D6A4F] inline-block" />
                <span>相生 Generating (Mother → Child)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#C83E31] inline-block" />
                <span>相克 Controlling (Check & Balance)</span>
              </span>
            </div>
          </div>

          {/* Element Detail Card */}
          <div className="lg:col-span-7 space-y-5">
            <div
              className="rounded-xl p-5 border-l-4 bg-stone-50/90 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700"
              style={{ borderLeftColor: activeElement.colorHex }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-xs"
                    style={{ backgroundColor: activeElement.colorHex }}
                  >
                    {activeElement.name.zh}
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      {activeElement.name.zh}行 · {activeElement.name.en} Element ({activeElement.name.pinyin})
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Zang: {activeElement.zangOrgan.zh} ({activeElement.zangOrgan.en}) · Fu: {activeElement.fuOrgan.zh} ({activeElement.fuOrgan.en})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onToggleBookmark(
                      `wuxing-${activeElement.key}`,
                      `${activeElement.name.zh}行 · ${activeElement.name.en} Element`,
                      'Foundations'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-amber-50 dark:hover:bg-stone-700 transition"
                >
                  {bookmarks.includes(`wuxing-${activeElement.key}`) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-700" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4">
                {renderProse(lang, activeElement.physiologyEn, activeElement.physiologyZh)}
              </div>

              {/* Correspondences Grid (五脏、五腑、五官、五体、五志、五味、五季) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                {[
                  { label: 'Zang (脏)', val: activeElement.zangOrgan },
                  { label: 'Fu (腑)', val: activeElement.fuOrgan },
                  { label: 'Sense Orifice (五官)', val: activeElement.senseOrgan },
                  { label: 'Body Tissue (五体)', val: activeElement.tissue },
                  { label: 'Emotion (五志)', val: activeElement.emotion },
                  { label: 'Flavor (五味)', val: activeElement.taste },
                  { label: 'Season (五季)', val: activeElement.season },
                  { label: 'Climate Qi (五气)', val: activeElement.climate }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-700/80"
                  >
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">{item.label}</div>
                    <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                      {item.val.zh}{' '}
                      <span className="font-sans font-normal text-xs text-stone-600 dark:text-stone-300">
                        · {item.val.en}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cycle Mode Explanation Box */}
              {cycleMode === 'sheng-ke' ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-800/20">
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>相生 (Generates Child): {activeElement.name.zh}生{WUXING_ELEMENTS.find(e => e.key === activeElement.generates)?.name.zh}</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                      Nourishes <strong>{WUXING_ELEMENTS.find(e => e.key === activeElement.generates)?.name.en} ({WUXING_ELEMENTS.find(e => e.key === activeElement.generates)?.zangOrgan.en})</strong>. Clinical rule: &ldquo;In Deficiency, tonify the Mother (虚则补其母).&rdquo;
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-red-950/5 dark:bg-red-950/30 border border-red-800/20">
                    <div className="text-xs font-bold text-red-800 dark:text-red-400 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>相克 (Controls Target): {activeElement.name.zh}克{WUXING_ELEMENTS.find(e => e.key === activeElement.controls)?.name.zh}</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                      Restrains <strong>{WUXING_ELEMENTS.find(e => e.key === activeElement.controls)?.name.en} ({WUXING_ELEMENTS.find(e => e.key === activeElement.controls)?.zangOrgan.en})</strong> from becoming excessive.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800/60">
                    <div className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wider mb-1">
                      相乘 · Overacting Pathology (Bullying the Controlled Organ)
                    </div>
                    {renderProse(lang, activeElement.overactingDescEn, activeElement.overactingDescZh)}
                  </div>
                  <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60">
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1">
                      相侮 · Counter-Acting Pathology (Rebelling Against the Controller)
                    </div>
                    {renderProse(lang, activeElement.counteractingDescEn, activeElement.counteractingDescZh)}
                  </div>
                </div>
              )}
            </div>

            <ClassicalQuoteCard quote={activeElement.classicalQuote} lang={lang} />
          </div>
        </div>
      </section>

      {/* SECTION 2: ZANG-FU WESTERN VS TCM BRIDGE */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Interactive Diagram 02 · 藏象学说与中西医对照
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              Zang-Fu (脏腑) Functional Systems vs. Western Anatomy
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ZANG_FU_ORGANS.map((org) => {
              const elColor = WUXING_ELEMENTS.find((e) => e.key === org.element)?.colorHex || '#2D6A4F';
              const active = org.id === selectedOrganId;
              return (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrganId(org.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition flex items-center gap-1.5 border ${
                    active
                      ? 'text-white shadow-sm'
                      : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                  }`}
                  style={active ? { backgroundColor: elColor, borderColor: elColor } : undefined}
                >
                  <span>{org.name.zh}</span>
                  <span className="font-sans font-normal text-xs opacity-90">{org.name.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Side-by-Side Western vs TCM Identity + Patterns */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-4">
              <div className="flex items-center justify-between">
                <TermBadge term={activeOrgan.name} lang={lang} size="lg" />
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-900/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300">
                  Paired Fu: {activeOrgan.pairedOrgan.zh} ({activeOrgan.pairedOrgan.en})
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  🔬 Western Anatomical Organ (西医解剖概念)
                </div>
                {renderProse(lang, activeOrgan.westernViewEn, activeOrgan.westernViewZh)}
              </div>

              <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-800/20">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2">
                  ⚠️ Common Clinical Disharmony Patterns (常见证候)
                </div>
                <div className="space-y-3">
                  {activeOrgan.commonPatterns.map((pat) => (
                    <div key={pat.name.zh} className="border-t border-amber-900/10 pt-2 first:border-0 first:pt-0">
                      <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                        {pat.name.zh} ({pat.name.pinyin}) · {pat.name.en}
                      </div>
                      {lang !== 'zh' && (
                        <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">{pat.symptomsEn}</p>
                      )}
                      {lang !== 'en' && (
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-serif mt-0.5">{pat.symptomsZh}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ClassicalQuoteCard quote={activeOrgan.classicalQuote} lang={lang} />
          </div>

          {/* Right Column: Core TCM Physiological Pillars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span>TCM Functional Responsibilities (中医核心生理功能)</span>
              </h4>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Peak Qi Flow: {activeOrgan.peakHours}
              </span>
            </div>

            <div className="space-y-4">
              {activeOrgan.tcmFunctions.map((fn, idx) => (
                <div
                  key={fn.title.zh}
                  className="p-5 rounded-xl bg-[#FAF6F0] dark:bg-stone-800/60 border border-amber-900/20 dark:border-stone-700 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-full bg-red-800 text-amber-50 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h5 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-amber-100">
                      {fn.title.zh}{' '}
                      <span className="text-xs font-mono text-amber-800 dark:text-amber-400 font-normal">
                        ({fn.title.pinyin})
                      </span>
                      {lang !== 'zh' && (
                        <span className="block sm:inline sm:ml-2 font-sans text-sm font-semibold text-stone-700 dark:text-stone-300">
                          · {fn.title.en}
                        </span>
                      )}
                    </h5>
                  </div>
                  {renderProse(lang, fn.descEn, fn.descZh)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 24-HOUR MERIDIAN QI CLOCK (子午流注) */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Interactive Diagram 03 · 十二时辰子午流注图
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              24-Hour Meridian Qi Clock (子午流注养生钟)
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-medium">
            <Clock className="w-4 h-4 text-red-800 dark:text-amber-400" />
            <span>Current Local Hour: {String(currentHour).padStart(2, '0')}:00 · Click any Shichen (时辰)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
          {/* Interactive Circular 12-Branch Dial */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[540px] aspect-square relative">
              <svg viewBox="0 0 520 520" className="w-full h-full select-none">
                <circle
                  cx="260"
                  cy="260"
                  r="248"
                  fill="#FAF6F0"
                  stroke="#D6C7B2"
                  strokeWidth="2.5"
                />
                <circle
                  cx="260"
                  cy="260"
                  r="182"
                  fill="none"
                  stroke="#E7E0D6"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="260"
                  cy="260"
                  r="86"
                  fill="#1C1917"
                  stroke="#D97706"
                  strokeWidth="2.5"
                />
                <text
                  x="260"
                  y="246"
                  textAnchor="middle"
                  fill="#FAF6F0"
                  className="font-serif font-bold text-lg"
                >
                  子午流注
                </text>
                <text
                  x="260"
                  y="266"
                  textAnchor="middle"
                  fill="#FDE68A"
                  className="font-serif text-xs"
                >
                  {activeClock.branchZh} · {activeClock.organ.zh.replace('当令', '')}
                </text>
                <text
                  x="260"
                  y="284"
                  textAnchor="middle"
                  fill="#F59E0B"
                  className="text-[11px] font-mono"
                >
                  {activeClock.timeRange}
                </text>

                {QI_CLOCK_HOURS.map((h, i) => {
                  const angleDeg = i * 30 - 60; // Position around dial
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const rNode = 182;
                  const cx = Number((260 + rNode * Math.cos(angleRad)).toFixed(2));
                  const cy = Number((260 + rNode * Math.sin(angleRad)).toFixed(2));
                  const textY1 = Number((cy - 11).toFixed(2));
                  const textY2 = Number((cy + 5).toFixed(2));
                  const textY3 = Number((cy + 19).toFixed(2));
                  const isSelected = i === selectedClockIdx;
                  const elColor =
                    WUXING_ELEMENTS.find((e) => e.key === h.element)?.colorHex || '#B45309';
                  const meridianShortZh = h.organ.zh.replace('当令', '');

                  return (
                    <g
                      key={h.branchZh}
                      onClick={() => setSelectedClockIdx(i)}
                      className="cursor-pointer"
                    >
                      <line
                        x1="260"
                        y1="260"
                        x2={cx}
                        y2={cy}
                        stroke={isSelected ? elColor : '#E7E0D6'}
                        strokeWidth={isSelected ? '3' : '1.2'}
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 43 : 38}
                        fill={isSelected ? elColor : '#FFFFFF'}
                        stroke={elColor}
                        strokeWidth={isSelected ? 3.5 : 2}
                      />
                      <text
                        x={cx}
                        y={textY1}
                        textAnchor="middle"
                        fill={isSelected ? '#FEF3C7' : '#78716C'}
                        className="font-serif font-bold text-[11px]"
                      >
                        {h.branchZh}
                      </text>
                      <text
                        x={cx}
                        y={textY2}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : '#1C1917'}
                        className="font-serif font-bold text-[13px]"
                      >
                        {meridianShortZh}
                      </text>
                      <text
                        x={cx}
                        y={textY3}
                        textAnchor="middle"
                        fill={isSelected ? '#FDE68A' : '#78716C'}
                        className="text-[9.5px] font-mono"
                      >
                        {h.meridianCode}·{h.timeRange.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Selected Shichen Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/80 border border-amber-900/20 dark:border-stone-700 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-red-800 dark:text-amber-400">
                    {activeClock.timeRange} · {activeClock.branchZh} ({activeClock.branchPinyin} · {activeClock.animalEn})
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                    {activeClock.organ.zh} · {activeClock.organ.en} ({activeClock.meridianCode})
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-900/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300">
                  Element: {activeClock.element.toUpperCase()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-700" />
                  <span>Physiological Qi Flow (气血当令生理机制)</span>
                </div>
                {renderProse(lang, activeClock.physiologicalActionEn, activeClock.physiologicalActionZh)}
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-800/20 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  🍵 Classical Yangsheng Tip (顺时养生法则)
                </div>
                {renderProse(lang, activeClock.yangshengTipEn, activeClock.yangshengTipZh)}
              </div>
            </div>

            {/* Quick Shichen Strip */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {QI_CLOCK_HOURS.map((h, idx) => (
                <button
                  key={h.branchZh}
                  onClick={() => setSelectedClockIdx(idx)}
                  className={`p-2 rounded-lg text-center border transition ${
                    idx === selectedClockIdx
                      ? 'bg-amber-900 text-white border-amber-900'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-serif font-bold text-xs">{h.branchZh}</div>
                  <div className="text-[10px] opacity-80">{h.timeRange.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
