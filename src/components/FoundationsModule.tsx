'use client';

import React, { useState, useEffect } from 'react';
import { ElementKey, LanguageMode } from '@/types/tcm';
import { WUXING_ELEMENTS, ZANG_FU_ORGANS, QI_CLOCK_HOURS } from '@/data/foundationsData';
import { ClassicalQuoteCard, renderProse, TermBadge, VermilionSeal } from './BilingualUi';
import {
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  AlertTriangle
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
  const [selectedClockIdx, setSelectedClockIdx] = useState<number>(3);
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

  return (
    <div className="space-y-12">
      {/* VOLUME I FOLIO FRONTISPIECE */}
      <div className="woodblock-frame bg-[#FAF6F0] dark:bg-stone-950 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <VermilionSeal text="内经要旨" variant="solid" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                VOLUME I · FOUNDATIONAL COSMOLOGY & PHYSIOLOGY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-wide">
              阴阳五行、藏象与子午流注总览
              {lang !== 'zh' && (
                <span className="block text-base sm:text-lg font-normal text-stone-600 dark:text-stone-400 mt-1">
                  Yin-Yang, Five Elements, Zang-Fu Systems & The 24-Hour Qi Clock
                </span>
              )}
            </h2>
            <div className="border-t border-stone-300 dark:border-stone-800 pt-3">
              {renderProse(
                lang,
                'Traditional Chinese Medicine views the human body as a microcosm of nature (天人合一). Rather than isolating anatomical parts, it tracks how Vital Substances (Qi 气, Blood 血, Jing 精, Fluids 津液) transform and circulate through five interconnected functional systems.',
                '中医学以“天人相应”整体观为核心，不孤立看待局部解剖，而是通过阴阳消长、五行生克制化，洞察气、血、精、津液在五脏六腑与十二时辰中的动态流转。'
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border-2 border-stone-800/80 dark:border-stone-700 aspect-video bg-stone-200 dark:bg-stone-900">
              <img
                src="/images/wuxing_scroll.jpg"
                alt="Wu Xing Classical Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-stone-950/85 px-3 py-2 text-xs text-amber-100 font-serif flex justify-between items-center border-t border-amber-500/30">
                <span>《五行生克与五脏应象图》· Classical Five-Element Scroll</span>
                <span className="seal-stamp-solid text-[10px]">宣纸工笔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: WU XING DYNAMIC ENGINE — WOODBLOCK FOLIO SPREAD */}
      <section className="woodblock-frame bg-[#FAF6F0] dark:bg-stone-950">
        {/* Top Folio Bar */}
        <div className="px-6 py-4 border-b-2 border-stone-800/80 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F3ECE1] dark:bg-stone-900">
          <div className="flex items-center gap-3">
            <VermilionSeal text="五行生克" />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                FOLIO I.1 · FIVE-PHASE SYSTEMIC DYNAMICS
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                五行生克乘侮图解 · Wu Xing Dynamic Cycle Engine
              </h3>
            </div>
          </div>

          <div className="inline-flex border border-stone-800/40 dark:border-stone-700 bg-[#FAF6F0] dark:bg-stone-950">
            <button
              onClick={() => setCycleMode('sheng-ke')}
              className={`px-3 py-1.5 text-xs font-serif font-bold transition flex items-center gap-1.5 ${
                cycleMode === 'sheng-ke'
                  ? 'bg-stone-900 text-amber-50 dark:bg-amber-600 dark:text-stone-950'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>生理生克 · Generating & Controlling</span>
            </button>
            <button
              onClick={() => setCycleMode('pathology')}
              className={`px-3 py-1.5 text-xs font-serif font-bold transition flex items-center gap-1.5 border-l border-stone-800/40 dark:border-stone-700 ${
                cycleMode === 'pathology'
                  ? 'bg-[#B91C1C] text-amber-50'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>病理乘侮 · Overacting & Rebellion</span>
            </button>
          </div>
        </div>

        {/* Open Book Spread with Vertical Spine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-stone-800/20 dark:divide-stone-800">
          {/* Left Page: Interactive SVG Pentagram */}
          <div className="lg:col-span-5 p-6 flex flex-col items-center justify-between bg-[#F7F1E6] dark:bg-stone-900/50">
            <div className="w-full max-w-[380px] aspect-square relative">
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
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#B91C1C" />
                  </marker>
                </defs>

                {/* Outer Generating Ring (相生) */}
                <circle
                  cx="200"
                  cy="202"
                  r="148"
                  fill="none"
                  stroke="#A89F91"
                  strokeWidth="1.2"
                  strokeDasharray="5 4"
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
                    <line
                      key={`sheng-${el.key}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#2D6A4F"
                      strokeWidth={isHighlighted ? 3.2 : 1.5}
                      strokeOpacity={isHighlighted ? 0.95 : 0.35}
                      markerEnd="url(#arrow-sheng)"
                    />
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
                    <line
                      key={`ke-${el.key}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#B91C1C"
                      strokeWidth={isHighlighted ? 2.8 : 1.4}
                      strokeDasharray={cycleMode === 'pathology' ? '5 3' : undefined}
                      strokeOpacity={isHighlighted ? 0.9 : 0.3}
                      markerEnd="url(#arrow-ke)"
                    />
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
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="42"
                          fill="none"
                          stroke={el.colorHex}
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      )}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="35"
                        fill={isSelected ? el.colorHex : '#FAF6F0'}
                        stroke={el.colorHex}
                        strokeWidth="2.5"
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
                        className="text-[10px] font-mono font-semibold"
                      >
                        {el.name.en}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full pt-3 border-t border-stone-300 dark:border-stone-800 flex flex-wrap justify-between gap-2 text-xs font-serif text-stone-600 dark:text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-0.5 bg-[#2D6A4F] inline-block" />
                <span>相生 · Generating (Mother → Child)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-0.5 bg-[#B91C1C] inline-block" />
                <span>相克 · Controlling (Restraint)</span>
              </span>
            </div>
          </div>

          {/* Right Page: Unboxed Woodblock Ledger for Active Element */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-800/20 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <span
                  className="w-11 h-11 flex items-center justify-center text-white font-serif font-bold text-2xl border border-stone-900/30"
                  style={{ backgroundColor: activeElement.colorHex }}
                >
                  {activeElement.name.zh}
                </span>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {activeElement.name.zh}行 · {activeElement.name.en} Phase ({activeElement.name.pinyin})
                  </h4>
                  <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-800/30 dark:border-stone-700 text-xs font-serif font-bold hover:bg-stone-200/60 dark:hover:bg-stone-800 transition"
              >
                {bookmarks.includes(`wuxing-${activeElement.key}`) ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span>已藏 · Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>藏卷 · Bookmark</span>
                  </>
                )}
              </button>
            </div>

            {renderProse(lang, activeElement.physiologyEn, activeElement.physiologyZh)}

            {/* Classical 8-Correspondence Hairline Ledger Table (五脏应象表) */}
            <div className="border-y-2 border-stone-800/60 dark:border-stone-700 divide-y divide-stone-300 dark:divide-stone-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-stone-300 dark:divide-stone-800">
                {[
                  { label: '五脏 Zang', val: activeElement.zangOrgan },
                  { label: '六腑 Fu', val: activeElement.fuOrgan },
                  { label: '五官 Orifice', val: activeElement.senseOrgan },
                  { label: '五体 Tissue', val: activeElement.tissue }
                ].map((item) => (
                  <div key={item.label} className="p-2.5">
                    <div className="text-[10px] font-mono uppercase text-stone-500">{item.label}</div>
                    <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                      {item.val.zh} <span className="font-sans font-normal text-xs text-stone-600 dark:text-stone-400">· {item.val.en}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-stone-300 dark:divide-stone-800">
                {[
                  { label: '五志 Emotion', val: activeElement.emotion },
                  { label: '五味 Flavor', val: activeElement.taste },
                  { label: '五季 Season', val: activeElement.season },
                  { label: '五气 Climate', val: activeElement.climate }
                ].map((item) => (
                  <div key={item.label} className="p-2.5">
                    <div className="text-[10px] font-mono uppercase text-stone-500">{item.label}</div>
                    <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                      {item.val.zh} <span className="font-sans font-normal text-xs text-stone-600 dark:text-stone-400">· {item.val.en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cycle Mode Ledger Rows */}
            {cycleMode === 'sheng-ke' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                <div className="border-l-2 border-[#2D6A4F] pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-[#2D6A4F] dark:text-emerald-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>
                      相生 (Generates Child): {activeElement.name.zh}生
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.generates)?.name.zh}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    Nourishes{' '}
                    <strong>
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.generates)?.name.en} (
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.generates)?.zangOrgan.en})
                    </strong>
                    . Classical treatment law: &ldquo;In Deficiency, tonify the Mother (虚则补其母).&rdquo;
                  </p>
                </div>

                <div className="border-l-2 border-[#B91C1C] pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-[#B91C1C] dark:text-red-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>
                      相克 (Controls Target): {activeElement.name.zh}克
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.controls)?.name.zh}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    Restrains{' '}
                    <strong>
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.controls)?.name.en} (
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.controls)?.zangOrgan.en})
                    </strong>{' '}
                    from becoming excessive and maintains physiological equilibrium.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <div className="border-l-2 border-[#B91C1C] pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-[#B91C1C] dark:text-red-400 uppercase tracking-wider">
                    相乘 · Overacting Pathology (Bullying the Controlled Organ)
                  </div>
                  {renderProse(lang, activeElement.overactingDescEn, activeElement.overactingDescZh)}
                </div>
                <div className="border-l-2 border-amber-700 pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                    相侮 · Counter-Acting Pathology (Rebelling Against the Controller)
                  </div>
                  {renderProse(lang, activeElement.counteractingDescEn, activeElement.counteractingDescZh)}
                </div>
              </div>
            )}

            <ClassicalQuoteCard quote={activeElement.classicalQuote} lang={lang} />
          </div>
        </div>
      </section>

      {/* SECTION 2: ZANG-FU WESTERN VS TCM BRIDGE — WOODBLOCK FOLIO */}
      <section className="woodblock-frame bg-[#FAF6F0] dark:bg-stone-950">
        <div className="px-6 py-4 border-b-2 border-stone-800/80 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F3ECE1] dark:bg-stone-900">
          <div className="flex items-center gap-3">
            <VermilionSeal text="藏象学说" />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                FOLIO I.2 · ZANG-FU FUNCTIONAL SYSTEMS VS. ANATOMY
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                五脏藏象与中西医对照 · Zang-Fu Systems Bridge
              </h3>
            </div>
          </div>

          {/* Tabular Organ Index Strip */}
          <div className="inline-flex flex-wrap border border-stone-800/40 dark:border-stone-700 divide-x divide-stone-800/30 dark:divide-stone-700 bg-[#FAF6F0] dark:bg-stone-950">
            {ZANG_FU_ORGANS.map((org) => {
              const elColor = WUXING_ELEMENTS.find((e) => e.key === org.element)?.colorHex || '#2D6A4F';
              const active = org.id === selectedOrganId;
              return (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrganId(org.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-serif font-bold transition flex items-center gap-1.5 ${
                    active
                      ? 'text-white'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  style={active ? { backgroundColor: elColor } : undefined}
                >
                  <span>{org.name.zh}</span>
                  <span className="font-sans font-normal text-xs opacity-90">{org.name.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-stone-800/20 dark:divide-stone-800">
          {/* Left Page: Western vs TCM Identity + Clinical Disharmony Ledger */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-[#F7F1E6]/60 dark:bg-stone-900/40">
            <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-3">
              <TermBadge term={activeOrgan.name} lang={lang} size="lg" />
              <span className="text-xs font-mono text-amber-900 dark:text-amber-300">
                表里配腑: {activeOrgan.pairedOrgan.zh} ({activeOrgan.pairedOrgan.en})
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <VermilionSeal text="西医解剖" />
                <span className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Western Anatomical Scope
                </span>
              </div>
              {renderProse(lang, activeOrgan.westernViewEn, activeOrgan.westernViewZh)}
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-300 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <VermilionSeal text="常见证候" variant="solid" />
                <span className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Core Clinical Disharmony Patterns
                </span>
              </div>
              <div className="divide-y divide-stone-300/80 dark:divide-stone-800 border-y border-stone-300 dark:border-stone-800">
                {activeOrgan.commonPatterns.map((pat) => (
                  <div key={pat.name.zh} className="py-3">
                    <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {pat.name.zh} ({pat.name.pinyin}) · {pat.name.en}
                    </div>
                    {lang !== 'zh' && (
                      <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">{pat.symptomsEn}</p>
                    )}
                    {lang !== 'en' && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 font-serif mt-0.5">{pat.symptomsZh}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <ClassicalQuoteCard quote={activeOrgan.classicalQuote} lang={lang} />
          </div>

          {/* Right Page: Core TCM Physiological Pillars */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <VermilionSeal text="生理职能" />
                <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  中医藏象核心职能 · TCM Functional Responsibilities
                </h4>
              </div>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                当令时辰: {activeOrgan.peakHours}
              </span>
            </div>

            <div className="divide-y divide-stone-300 dark:divide-stone-800">
              {activeOrgan.tcmFunctions.map((fn, idx) => (
                <div key={fn.title.zh} className="py-5 first:pt-1 last:pb-1 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#B91C1C] dark:text-amber-400">
                      0{idx + 1}
                    </span>
                    <h5 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
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
                  <div className="pl-7">
                    {renderProse(lang, fn.descEn, fn.descZh)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 24-HOUR MERIDIAN QI CLOCK (子午流注) */}
      <section className="woodblock-frame bg-[#FAF6F0] dark:bg-stone-950">
        <div className="px-6 py-4 border-b-2 border-stone-800/80 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F3ECE1] dark:bg-stone-900">
          <div className="flex items-center gap-3">
            <VermilionSeal text="子午流注" />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                FOLIO I.3 · TWELVE SHICHEN CIRCADIAN QI TIDAL FLOW
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                十二时辰子午流注图 · 24-Hour Meridian Qi Clock
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-stone-800/30 dark:border-stone-700 bg-[#FAF6F0] dark:bg-stone-950 text-xs font-mono text-stone-800 dark:text-stone-200">
            <Clock className="w-3.5 h-3.5 text-[#B91C1C] dark:text-amber-400" />
            <span>Local Hour: {String(currentHour).padStart(2, '0')}:00 · Click any Shichen (时辰)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-stone-800/20 dark:divide-stone-800 items-center">
          {/* Left Page: Enlarged 520x520 Circular 12-Branch Dial */}
          <div className="lg:col-span-6 p-6 flex justify-center bg-[#F7F1E6]/50 dark:bg-stone-900/40">
            <div className="w-full max-w-[540px] aspect-square relative">
              <svg viewBox="0 0 520 520" className="w-full h-full select-none">
                <circle
                  cx="260"
                  cy="260"
                  r="248"
                  fill="#FAF6F0"
                  stroke="#78716C"
                  strokeWidth="2"
                />
                <circle
                  cx="260"
                  cy="260"
                  r="242"
                  fill="none"
                  stroke="#A8A29E"
                  strokeWidth="0.8"
                />
                <circle
                  cx="260"
                  cy="260"
                  r="182"
                  fill="none"
                  stroke="#D6C7B2"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="260"
                  cy="260"
                  r="86"
                  fill="#1C1917"
                  stroke="#B91C1C"
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
                  const angleDeg = i * 30 - 60;
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

          {/* Right Page: Selected Shichen Ledger & 12-Branch Index Table */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-300 dark:border-stone-800 pb-4 flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#B91C1C] dark:text-amber-400">
                  {activeClock.timeRange} · {activeClock.branchZh} ({activeClock.branchPinyin} · {activeClock.animalEn})
                </span>
                <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {activeClock.organ.zh} · {activeClock.organ.en} ({activeClock.meridianCode})
                </h4>
              </div>
              <VermilionSeal text={`${activeClock.branchZh}当令`} variant="solid" />
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-stone-800 dark:border-stone-500 pl-4 space-y-1">
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  气血当令生理机制 · Physiological Qi Flow
                </div>
                {renderProse(lang, activeClock.physiologicalActionEn, activeClock.physiologicalActionZh)}
              </div>

              <div className="border-l-2 border-[#2D6A4F] pl-4 space-y-1">
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#2D6A4F] dark:text-emerald-400">
                  顺时摄生法要 · Classical Yangsheng Regimen
                </div>
                {renderProse(lang, activeClock.yangshengTipEn, activeClock.yangshengTipZh)}
              </div>
            </div>

            {/* Tabular 12-Shichen Drawer Grid */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-2">
                十二时辰检索表 · Twelve Earthly Branches Index
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 border-t border-l border-stone-400/70 dark:border-stone-700">
                {QI_CLOCK_HOURS.map((h, idx) => (
                  <button
                    key={h.branchZh}
                    onClick={() => setSelectedClockIdx(idx)}
                    className={`p-2 text-center border-r border-b border-stone-400/70 dark:border-stone-700 transition ${
                      idx === selectedClockIdx
                        ? 'bg-stone-900 text-amber-50 dark:bg-amber-600 dark:text-stone-950'
                        : 'bg-[#FAF6F0] dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-200/60'
                    }`}
                  >
                    <div className="font-serif font-bold text-xs">{h.branchZh}</div>
                    <div className="text-[10px] font-mono opacity-80">{h.timeRange.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
