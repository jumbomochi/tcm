'use client';

import React, { useState, useEffect } from 'react';
import { ElementKey, LanguageMode } from '@/types/tcm';
import { WUXING_ELEMENTS, ZANG_FU_ORGANS, QI_CLOCK_HOURS } from '@/data/foundationsData';
import {
  ClassicalQuoteCard,
  renderProse,
  TermBadge,
  VermilionSeal,
  LabMetadataChips
} from './BilingualUi';
import {
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

interface FoundationsModuleProps {
  lang: LanguageMode;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, category: string) => void;
}

const ELEMENT_COORDS: Record<ElementKey, { x: number; y: number }> = {
  fire: { x: 220, y: 68 },
  earth: { x: 358, y: 168 },
  metal: { x: 305, y: 330 },
  water: { x: 135, y: 330 },
  wood: { x: 82, y: 168 }
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
    <div className="space-y-16">
      {/* UNBOXED EDITORIAL HERO DIRECTLY ON CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-stone-300/80 dark:border-stone-800">
        <div className="lg:col-span-7 space-y-4">
          <LabMetadataChips
            chips={[
              { label: 'Path 01 · 中医基础理论', tone: 'cinnabar' },
              { label: '3 Interactive Labs', tone: 'amber' },
              { label: 'Foundational Level', tone: 'jade' },
              { label: '20 min', tone: 'stone' }
            ]}
          />
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-stone-100 tracking-wide leading-tight">
            阴阳五行、藏象与子午流注
            {lang !== 'zh' && (
              <span className="block text-lg sm:text-xl font-sans font-normal text-stone-600 dark:text-stone-400 mt-1.5">
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
          <div className="relative rounded-md overflow-hidden border border-stone-300 dark:border-stone-700 shadow-md aspect-video bg-stone-200 dark:bg-stone-900">
            <img
              src="/images/wuxing_scroll.jpg"
              alt="Wu Xing Classical Scroll"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 py-2.5 text-xs text-amber-100 font-serif flex justify-between items-center gap-3">
              <span className="truncate">《五行生克与五脏应象图》· Five-Element Scroll</span>
              <VermilionSeal text="宣纸工笔" variant="solid" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 01: WU XING DYNAMIC ENGINE — OPEN EDITORIAL LAYOUT */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300/80 dark:border-stone-800 pb-4">
          <div>
            <div className="editorial-kicker text-[#B91C1C] dark:text-amber-400">
              Lab 01 · Five-Phase Systemic Dynamics
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-100 mt-1">
              五行生克乘侮图解 · Wu Xing Dynamic Cycle Engine
            </h3>
          </div>

          {/* Minimalist Underline Tab Toggle with >=40px Tap Targets */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-serif">
            <button
              onClick={() => setCycleMode('sheng-ke')}
              className={`py-2 px-1 min-h-[40px] border-b-2 transition ${
                cycleMode === 'sheng-ke'
                  ? 'border-stone-900 dark:border-amber-400 text-stone-950 dark:text-amber-200 font-bold'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              生理生克 · Generating & Controlling
            </button>
            <button
              onClick={() => setCycleMode('pathology')}
              className={`py-2 px-1 min-h-[40px] border-b-2 transition ${
                cycleMode === 'pathology'
                  ? 'border-[#B91C1C] text-[#B91C1C] dark:text-red-400 font-bold'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              病理乘侮 · Overacting & Rebellion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Single-Layer Interactive SVG Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[400px] aspect-square canvas-stage p-3">
              <svg viewBox="0 0 440 410" className="w-full h-full select-none">
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

                <circle
                  cx="220"
                  cy="213"
                  r="145"
                  fill="none"
                  stroke="#C4B5A3"
                  strokeWidth="1.2"
                  strokeDasharray="5 4"
                />

                {WUXING_ELEMENTS.map((el) => {
                  const from = ELEMENT_COORDS[el.key];
                  const to = ELEMENT_COORDS[el.generates];
                  const isHighlighted = el.key === selectedElementKey || el.generates === selectedElementKey;
                  const dx = to.x - from.x;
                  const dy = to.y - from.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const pad = 48;
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

                {WUXING_ELEMENTS.map((el) => {
                  const from = ELEMENT_COORDS[el.key];
                  const to = ELEMENT_COORDS[el.controls];
                  const isHighlighted = el.key === selectedElementKey || el.controls === selectedElementKey;
                  const dx = to.x - from.x;
                  const dy = to.y - from.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const pad = 48;
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

                {WUXING_ELEMENTS.map((el) => {
                  const pos = ELEMENT_COORDS[el.key];
                  const isSelected = el.key === selectedElementKey;
                  const compactOrganZh = el.zangOrgan.zh.replace('(心包)', '·心包');
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
                          r="47"
                          fill="none"
                          stroke={el.colorHex}
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      )}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="41"
                        fill={isSelected ? el.colorHex : '#FAF6F0'}
                        stroke={el.colorHex}
                        strokeWidth="2.5"
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 10}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : el.colorHex}
                        className="font-serif font-bold text-base"
                      >
                        {el.name.zh}行
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 6}
                        textAnchor="middle"
                        fill={isSelected ? '#FEF3C7' : '#292524'}
                        className="font-serif font-semibold text-xs"
                      >
                        {compactOrganZh}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 21}
                        textAnchor="middle"
                        fill={isSelected ? '#FDE68A' : '#57534E'}
                        className="text-[11px] font-sans font-semibold uppercase"
                      >
                        {el.name.en}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="pt-3 flex flex-wrap justify-center gap-6 text-xs text-stone-700 dark:text-stone-300">
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

          {/* Right: Unboxed Open Typography & Hairline Definition List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-stone-300/70 dark:border-stone-800 pb-4">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-serif font-bold text-3xl"
                  style={{ color: activeElement.colorHex }}
                >
                  {activeElement.name.zh}行
                </span>
                <div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-100 inline">
                    {activeElement.name.en} Phase ({activeElement.name.pinyin})
                  </h4>
                  <span className="block sm:inline sm:ml-3 text-xs font-sans font-semibold text-stone-600 dark:text-stone-400">
                    Zang: {activeElement.zangOrgan.zh} ({activeElement.zangOrgan.en}) · Fu: {activeElement.fuOrgan.zh} ({activeElement.fuOrgan.en})
                  </span>
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
                className="inline-flex items-center gap-1.5 py-2 px-2 min-h-[40px] text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 hover:text-[#B91C1C] transition"
              >
                {bookmarks.includes(`wuxing-${activeElement.key}`) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#B91C1C]" />
                    <span className="text-[#B91C1C] font-bold">Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark</span>
                  </>
                )}
              </button>
            </div>

            {renderProse(lang, activeElement.physiologyEn, activeElement.physiologyZh)}

            {/* Unboxed Hairline Definition List (Replaces 8 Mini-Cards) */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 py-4 border-y border-stone-300/80 dark:border-stone-800">
              {[
                { label: '五脏 Zang', val: activeElement.zangOrgan },
                { label: '六腑 Fu', val: activeElement.fuOrgan },
                { label: '五官 Orifice', val: activeElement.senseOrgan },
                { label: '五体 Tissue', val: activeElement.tissue },
                { label: '五志 Emotion', val: activeElement.emotion },
                { label: '五味 Flavor', val: activeElement.taste },
                { label: '五季 Season', val: activeElement.season },
                { label: '五气 Climate', val: activeElement.climate }
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-sans font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    {item.label}
                  </dt>
                  <dd className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                    {item.val.zh}{' '}
                    <span className="font-sans font-normal text-xs text-stone-700 dark:text-stone-300">
                      · {item.val.en}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Unboxed Left-Border Callouts for Cycles */}
            {cycleMode === 'sheng-ke' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-l-2 border-[#2D6A4F] pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-[#2D6A4F] dark:text-emerald-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>
                      相生 (Generates Child): {activeElement.name.zh}生
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.generates)?.name.zh}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    Nourishes{' '}
                    <strong>
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.generates)?.name.en} (
                      {WUXING_ELEMENTS.find((e) => e.key === activeElement.generates)?.zangOrgan.en})
                    </strong>
                    . Clinical rule: &ldquo;In Deficiency, tonify the Mother (虚则补其母).&rdquo;
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
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
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
              <div className="space-y-4">
                <div className="border-l-2 border-[#B91C1C] pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-[#B91C1C] dark:text-red-400 uppercase tracking-wider">
                    相乘 · Overacting Pathology (Bullying the Controlled Organ)
                  </div>
                  {renderProse(lang, activeElement.overactingDescEn, activeElement.overactingDescZh)}
                </div>
                <div className="border-l-2 border-amber-700 pl-4 space-y-1">
                  <div className="text-xs font-serif font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
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

      {/* SECTION 02: ZANG-FU WESTERN VS TCM BRIDGE — OPEN EDITORIAL COLUMNS */}
      <section className="pt-12 border-t border-stone-300/80 dark:border-stone-800 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300/80 dark:border-stone-800 pb-4">
          <div>
            <div className="editorial-kicker text-[#B91C1C] dark:text-amber-400">
              Lab 02 · Zang-Fu Functional Systems vs. Anatomy
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-100 mt-1">
              五脏藏象与中西医对照 · Zang-Fu Systems Bridge
            </h3>
          </div>

          {/* Clean Underline Tab Bar for the 5 Zang Organs (>=40px tap targets) */}
          <div className="flex flex-wrap gap-5">
            {ZANG_FU_ORGANS.map((org) => {
              const elColor = WUXING_ELEMENTS.find((e) => e.key === org.element)?.colorHex || '#2D6A4F';
              const active = org.id === selectedOrganId;
              return (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrganId(org.id)}
                  className={`py-2 px-1.5 min-h-[40px] text-sm font-serif font-bold transition border-b-2 flex items-baseline gap-1.5 ${
                    active
                      ? 'text-stone-950 dark:text-amber-50'
                      : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                  style={active ? { borderBottomColor: elColor } : undefined}
                >
                  <span>{org.name.zh}</span>
                  <span className="font-sans font-normal text-xs opacity-85">{org.name.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:divide-x divide-stone-300/70 dark:divide-stone-800">
          {/* Left Column: Unboxed Western View & Disharmony Patterns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-baseline justify-between border-b border-stone-300/70 dark:border-stone-800 pb-3">
              <TermBadge term={activeOrgan.name} lang={lang} size="lg" />
              <span className="text-xs font-sans font-semibold text-amber-900 dark:text-amber-300">
                表里配腑: {activeOrgan.pairedOrgan.zh} ({activeOrgan.pairedOrgan.en})
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="editorial-kicker text-stone-600 dark:text-stone-400">
                西医解剖概念 · Western Anatomical Scope
              </div>
              {renderProse(lang, activeOrgan.westernViewEn, activeOrgan.westernViewZh)}
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-300/70 dark:border-stone-800">
              <div className="editorial-kicker text-[#B91C1C] dark:text-amber-400">
                常见临床证候 · Core Clinical Disharmony Patterns
              </div>
              <div className="divide-y divide-stone-300/60 dark:divide-stone-800">
                {activeOrgan.commonPatterns.map((pat) => (
                  <div key={pat.name.zh} className="py-3 first:pt-1 last:pb-1">
                    <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {pat.name.zh} ({pat.name.pinyin}) · {pat.name.en}
                    </div>
                    {lang !== 'zh' && (
                      <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-0.5">{pat.symptomsEn}</p>
                    )}
                    {lang !== 'en' && (
                      <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif mt-0.5">{pat.symptomsZh}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <ClassicalQuoteCard quote={activeOrgan.classicalQuote} lang={lang} />
            </div>
          </div>

          {/* Right Column: Unboxed Numbered List of TCM Physiological Pillars */}
          <div className="lg:col-span-7 lg:pl-10 space-y-4">
            <div className="flex items-baseline justify-between border-b border-stone-300/70 dark:border-stone-800 pb-3">
              <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                中医藏象核心职能 · TCM Functional Responsibilities
              </h4>
              <span className="text-xs font-sans font-semibold text-stone-600 dark:text-stone-400">
                当令时辰: {activeOrgan.peakHours}
              </span>
            </div>

            <div className="divide-y divide-stone-300/70 dark:divide-stone-800">
              {activeOrgan.tcmFunctions.map((fn, idx) => (
                <div key={fn.title.zh} className="py-5 first:pt-2 last:pb-1 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-xs font-bold text-[#B91C1C] dark:text-amber-400">
                      0{idx + 1}
                    </span>
                    <h5 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
                      {fn.title.zh}{' '}
                      <span className="text-xs font-sans text-amber-900 dark:text-amber-300 font-normal">
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

      {/* SECTION 03: 24-HOUR MERIDIAN QI CLOCK (子午流注) */}
      <section className="pt-12 border-t border-stone-300/80 dark:border-stone-800 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300/80 dark:border-stone-800 pb-4">
          <div>
            <div className="editorial-kicker text-[#B91C1C] dark:text-amber-400">
              Lab 03 · Twelve Shichen Circadian Qi Tidal Flow
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-100 mt-1">
              十二时辰子午流注图 · 24-Hour Meridian Qi Clock
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-stone-700 dark:text-stone-300">
            <Clock className="w-4 h-4 text-[#B91C1C] dark:text-amber-400" />
            <span>Local Hour: {String(currentHour).padStart(2, '0')}:00 · Click any Shichen</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Enlarged 520x520 Circular 12-Branch Dial */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[540px] aspect-square relative">
              <svg viewBox="0 0 520 520" className="w-full h-full select-none">
                <circle
                  cx="260"
                  cy="260"
                  r="248"
                  fill="#FAF6F0"
                  stroke="#D6C7B2"
                  strokeWidth="2"
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
                  className="text-xs font-sans font-semibold"
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
                        className="text-[10px] font-sans font-semibold"
                      >
                        {h.meridianCode}·{h.timeRange.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right: Unboxed Shichen Details & Clean Hairline Strip */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-stone-300/70 dark:border-stone-800 pb-4 flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="editorial-kicker text-[#B91C1C] dark:text-amber-400">
                  {activeClock.timeRange} · {activeClock.branchZh} ({activeClock.branchPinyin} · {activeClock.animalEn})
                </span>
                <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {activeClock.organ.zh} · {activeClock.organ.en} ({activeClock.meridianCode})
                </h4>
              </div>
              <VermilionSeal text={`${activeClock.branchZh}当令`} variant="solid" />
            </div>

            <div className="space-y-5">
              <div className="border-l-2 border-stone-800 dark:border-stone-500 pl-4 space-y-1">
                <div className="editorial-kicker text-stone-600 dark:text-stone-400">
                  气血当令生理机制 · Physiological Qi Flow
                </div>
                {renderProse(lang, activeClock.physiologicalActionEn, activeClock.physiologicalActionZh)}
              </div>

              <div className="border-l-2 border-[#2D6A4F] pl-4 space-y-1">
                <div className="editorial-kicker text-[#2D6A4F] dark:text-emerald-400">
                  顺时摄生法要 · Classical Yangsheng Regimen
                </div>
                {renderProse(lang, activeClock.yangshengTipEn, activeClock.yangshengTipZh)}
              </div>
            </div>

            {/* Clean Hairline 12-Shichen Strip (>=40px Tap Targets) */}
            <div className="pt-4 border-t border-stone-300/70 dark:border-stone-800">
              <div className="editorial-kicker text-stone-600 dark:text-stone-400 mb-2">
                十二时辰速查 · Twelve Shichen Quick Select
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {QI_CLOCK_HOURS.map((h, idx) => (
                  <button
                    key={h.branchZh}
                    onClick={() => setSelectedClockIdx(idx)}
                    className={`py-2 px-2 min-h-[42px] text-left border-b-2 transition ${
                      idx === selectedClockIdx
                        ? 'border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 font-bold'
                        : 'border-stone-300/60 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950'
                    }`}
                  >
                    <span className="font-serif text-xs block">{h.branchZh}</span>
                    <span className="text-xs font-sans opacity-80 block">
                      {h.timeRange.split(' ')[0]}
                    </span>
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
