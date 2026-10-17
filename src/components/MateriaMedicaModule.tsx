'use client';

import React, { useState } from 'react';
import { LanguageMode } from '@/types/tcm';
import { ESSENTIAL_HERBS, CLASSIC_FORMULAS } from '@/data/materiaMedicaData';
import { renderProse, TermBadge, VermilionSeal, LabMetadataChips } from './BilingualUi';
import {
  Thermometer,
  AlertCircle,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

interface MateriaMedicaModuleProps {
  lang: LanguageMode;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, category: string) => void;
}

export default function MateriaMedicaModule({
  lang,
  bookmarks,
  onToggleBookmark
}: MateriaMedicaModuleProps) {
  const [selectedHerbId, setSelectedHerbId] = useState<string>('ren-shen');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('xiao-yao-san');
  const [tempFilter, setTempFilter] = useState<string>('ALL');

  const activeHerb =
    ESSENTIAL_HERBS.find((h) => h.id === selectedHerbId) || ESSENTIAL_HERBS[0];
  const activeFormula =
    CLASSIC_FORMULAS.find((f) => f.id === selectedFormulaId) || CLASSIC_FORMULAS[0];

  const filteredHerbs =
    tempFilter === 'ALL'
      ? ESSENTIAL_HERBS
      : ESSENTIAL_HERBS.filter((h) => h.temperature.includes(tempFilter));

  // Five-Flavor Pentagon Radar Helper
  const radarAxes = [
    { key: 'sweet', labelZh: '甘 Sweet', angle: -90 },
    { key: 'pungent', labelZh: '辛 Pungent', angle: -18 },
    { key: 'bitter', labelZh: '苦 Bitter', angle: 54 },
    { key: 'sour', labelZh: '酸 Sour', angle: 126 },
    { key: 'salty', labelZh: '咸 Salty', angle: 198 }
  ] as const;

  const radarPoints = radarAxes
    .map((ax) => {
      const val = activeHerb.flavorRadar[ax.key] || 10;
      const r = (val / 100) * 68;
      const rad = (ax.angle * Math.PI) / 180;
      const x = Number((100 + r * Math.cos(rad)).toFixed(2));
      const y = Number((100 + r * Math.sin(rad)).toFixed(2));
      return `${x},${y}`;
    })
    .join(' ');

  const getRoleSealInfo = (role: string) => {
    if (role.startsWith('Jun')) {
      return {
        seal: '君药',
        accentBorder: 'border-t-2 border-t-[#B91C1C]',
        roleLabel: '君 · Chief Sovereign Herb'
      };
    }
    if (role.startsWith('Chen')) {
      return {
        seal: '臣药',
        accentBorder: 'border-t-2 border-t-amber-700',
        roleLabel: '臣 · Deputy Minister Herb'
      };
    }
    if (role.startsWith('Zuo')) {
      return {
        seal: '佐药',
        accentBorder: 'border-t-2 border-t-[#2D6A4F]',
        roleLabel: '佐 · Assistant Herb'
      };
    }
    return {
      seal: '使药',
      accentBorder: 'border-t-2 border-t-stone-700',
      roleLabel: '使 · Envoy Harmonizer'
    };
  };

  return (
    <div className="space-y-14">
      {/* Unboxed Editorial Track Overview Header */}
      <header className="pb-10 border-b border-stone-300/80 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <LabMetadataChips
              chips={[
                { label: 'Path 04 · 本草与方剂配伍', tone: 'jade' },
                { label: 'Pharmacopeia & Formula Lab', tone: 'amber' },
                { label: '10 Essential Herbs & 5 Formulas', tone: 'cinnabar' },
                { label: '20 min', tone: 'stone' }
              ]}
            />
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-stone-100 tracking-wide leading-tight">
              中药四气五味归经与方剂「君臣佐使」拆解器
              {lang !== 'zh' && (
                <span className="block text-base sm:text-xl font-sans font-normal text-stone-600 dark:text-stone-400 mt-2">
                  Essential Materia Medica Atlas & Jun-Chen-Zuo-Shi Formula Architecture
                </span>
              )}
            </h2>
            {renderProse(
              lang,
              'Every Chinese herb is defined by its Four Natures (寒热温凉 — Cold, Hot, Warm, Cool), Five Flavors (酸苦甘辛咸 — Sour, Bitter, Sweet, Pungent, Salty), and Meridian Entry (归经). Classical formulas combine herbs into a strategic hierarchy of Chief (君), Deputy (臣), Assistant (佐), and Envoy (使).',
              '中药治病，凭藉“四气五味、升降浮沉、归经”以纠人体阴阳之偏；方剂配伍，则遵“君、臣、佐、使”之法度，相须相使、制毒增效。'
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-md overflow-hidden border border-stone-300/80 dark:border-stone-700 shadow-xs aspect-video bg-stone-200 dark:bg-stone-900">
              <img
                src="/images/materia_medica_scroll.jpg"
                alt="Materia Medica Botanical Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 py-2.5 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《本草道地饮片图鉴》· Classical Pharmacopeia</span>
                <VermilionSeal text="四气五味" variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LAB 01: ESSENTIAL MATERIA MEDICA (道地本草图鉴) */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <VermilionSeal text="神农本草" variant="solid" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Lab 01 · Materia Medica Pharmacopeia
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-100">
              道地中药饮片与四气五味归经 · Essential Herbs & Five-Flavor Radar
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Filter herbs by thermal nature (四气) and inspect their five-flavor radar profile and slice morphology
            </p>
          </div>

          {/* Minimalist Underline Filter by Thermal Nature (四气) */}
          <div className="flex items-center gap-4 border-b border-stone-300 dark:border-stone-700">
            {['ALL', 'Warm', 'Neutral', 'Cool', 'Cold'].map((t) => (
              <button
                key={t}
                onClick={() => setTempFilter(t)}
                className={`pb-2 text-xs font-medium transition border-b-2 -mb-px ${
                  tempFilter === t
                    ? 'border-[#2D6A4F] text-[#2D6A4F] dark:text-emerald-400 font-bold'
                    : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {t === 'ALL' ? '四气全览 · All' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Underline Herb Catalog Selector Strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-stone-300/80 dark:border-stone-800">
          {filteredHerbs.map((herb) => {
            const active = herb.id === selectedHerbId;
            return (
              <button
                key={herb.id}
                onClick={() => setSelectedHerbId(herb.id)}
                className={`pb-3 text-left transition border-b-2 -mb-px flex items-center gap-2 ${
                  active
                    ? 'border-[#B91C1C] text-stone-950 dark:text-amber-50 font-bold'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: herb.botanicalColor }}
                />
                <span className="font-serif text-base">{herb.name.zh}</span>
                {lang !== 'zh' && (
                  <span className="text-xs text-stone-500 font-normal">
                    {herb.name.en}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Herb Split-Screen Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:divide-x divide-stone-300/70 dark:divide-stone-800 items-start">
          {/* Left Page: Five Flavors Radar Stage + Thermal Gauge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-800 dark:text-stone-200">
                五味雷达图 · Five Flavors Profile
              </span>
              <span className="text-xs font-mono font-semibold text-amber-900 dark:text-amber-300">
                {activeHerb.flavors.join(' · ')}
              </span>
            </div>

            <div className="canvas-stage p-6 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-56 h-56 select-none">
                {/* Concentric Pentagon Web */}
                {[22, 45, 68].map((r) => (
                  <polygon
                    key={r}
                    points={radarAxes
                      .map((ax) => {
                        const rad = (ax.angle * Math.PI) / 180;
                        return `${Number((100 + r * Math.cos(rad)).toFixed(2))},${Number(
                          (100 + r * Math.sin(rad)).toFixed(2)
                        )}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#D6C7B2"
                    strokeWidth="1"
                  />
                ))}

                {/* Axis Lines & Labels */}
                {radarAxes.map((ax) => {
                  const rad = (ax.angle * Math.PI) / 180;
                  const xEnd = Number((100 + 68 * Math.cos(rad)).toFixed(2));
                  const yEnd = Number((100 + 68 * Math.sin(rad)).toFixed(2));
                  const xLbl = Number((100 + 86 * Math.cos(rad)).toFixed(2));
                  const yLbl = Number((100 + 86 * Math.sin(rad) + 3).toFixed(2));
                  return (
                    <g key={ax.key}>
                      <line
                        x1="100"
                        y1="100"
                        x2={xEnd}
                        y2={yEnd}
                        stroke="#D6C7B2"
                        strokeWidth="1"
                      />
                      <text
                        x={xLbl}
                        y={yLbl}
                        textAnchor="middle"
                        fill="#44403C"
                        className="text-[9px] font-serif font-bold"
                      >
                        {ax.labelZh}
                      </text>
                    </g>
                  );
                })}

                {/* Herb Flavor Polygon */}
                <polygon
                  points={radarPoints}
                  fill={activeHerb.botanicalColor}
                  fillOpacity="0.38"
                  stroke={activeHerb.botanicalColor}
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Thermal Spectrum Bar (四气：寒、凉、平、温、热) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span>四气寒热属性 · Thermal Nature:</span>
                </span>
                <span className="font-mono font-bold text-amber-900 dark:text-amber-300">
                  {activeHerb.temperature}
                </span>
              </div>
              <div className="grid grid-cols-5 divide-x divide-stone-300 dark:divide-stone-700 border-y border-stone-300 dark:border-stone-700 text-[10px] text-center font-mono">
                {[
                  { label: '寒 Cold', score: -2, color: 'bg-blue-900 text-white' },
                  { label: '凉 Cool', score: -1, color: 'bg-sky-700 text-white' },
                  { label: '平 Neutral', score: 0, color: 'bg-[#2D6A4F] text-white' },
                  { label: '温 Warm', score: 1, color: 'bg-amber-700 text-white' },
                  { label: '热 Hot', score: 2, color: 'bg-[#B91C1C] text-white' }
                ].map((lv) => (
                  <div
                    key={lv.label}
                    className={`py-1.5 ${
                      activeHerb.temperatureScore === lv.score
                        ? `${lv.color} font-bold`
                        : 'text-stone-500'
                    }`}
                  >
                    {lv.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Page: Unboxed Herb Monograph */}
          <div className="lg:col-span-7 lg:pl-10 space-y-6 divide-y divide-stone-300/70 dark:divide-stone-800">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                    {activeHerb.pharmaceuticalLatin} · {activeHerb.category.zh} ({activeHerb.category.en})
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-100 mt-1">
                    {activeHerb.name.zh} ({activeHerb.name.pinyin}) · {activeHerb.name.en}
                  </h4>
                </div>

                <button
                  onClick={() =>
                    onToggleBookmark(
                      `herb-${activeHerb.id}`,
                      `${activeHerb.name.zh} · ${activeHerb.name.en}`,
                      'Materia Medica'
                    )
                  }
                  className="inline-flex items-center gap-1.5 pb-1 border-b border-stone-400 hover:border-[#B91C1C] text-xs font-medium text-stone-700 dark:text-stone-300 transition"
                >
                  {bookmarks.includes(`herb-${activeHerb.id}`) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span className="text-[#B91C1C] font-bold">Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>
              </div>

              {/* Meridians Entered & Dosage Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="font-serif font-bold text-stone-600 dark:text-stone-400">
                  归经 Meridians Entered:
                </span>
                <span className="font-serif font-bold text-amber-900 dark:text-amber-300">
                  {activeHerb.meridiansEntered.join(' · ')}
                </span>
                <span className="ml-auto font-mono text-stone-600 dark:text-stone-400">
                  煎服剂量 Dosage: <strong>{activeHerb.dosage}</strong>
                </span>
              </div>

              {/* Key Therapeutic Actions */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {activeHerb.keyActions.map((act) => (
                  <TermBadge
                    key={act.zh}
                    term={act}
                    lang={lang}
                    size="sm"
                    accentColor={activeHerb.botanicalColor}
                  />
                ))}
              </div>
            </div>

            {/* Prepared Slice (中药饮片) Visual Identification */}
            <div className="pt-5 space-y-1.5">
              <div className="text-xs font-serif font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
                道地饮片性状鉴别 · Apothecary Slice Identification
              </div>
              {renderProse(lang, activeHerb.visualDescriptionEn, activeHerb.visualDescriptionZh)}
            </div>

            {/* Clinical Uses */}
            <div className="pt-5 space-y-1.5">
              <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#2D6A4F] dark:text-emerald-400">
                临床主治与配伍要旨 · Clinical Applications
              </div>
              {renderProse(lang, activeHerb.clinicalUsesEn, activeHerb.clinicalUsesZh)}
            </div>

            {/* Cautions / Contraindications */}
            <div className="pt-5 flex items-start gap-2.5 text-xs border-l-2 border-[#B91C1C] pl-3.5">
              <AlertCircle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-[#B91C1C] dark:text-red-400">
                  使用禁忌 (Contraindications):{' '}
                </strong>
                <span className="text-stone-700 dark:text-stone-300">
                  {lang === 'zh' ? activeHerb.cautionsZh : activeHerb.cautionsEn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAB 02: JUN-CHEN-ZUO-SHI (君臣佐使) FORMULA DECONSTRUCTOR */}
      <section className="pt-8 border-t border-stone-300/80 dark:border-stone-800 space-y-8">
        <div className="pb-4 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <VermilionSeal text="君臣佐使" variant="solid" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Lab 02 · Classical Formula Architecture
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-100">
              经典名方「君臣佐使」配伍拆解 · Classical Formula Deconstructor
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Deconstruct how Chief, Deputy, Assistant, and Envoy herbs work in clinical synergy
            </p>
          </div>

          {/* Minimalist Underline Formula Selector Tabs */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-stone-300 dark:border-stone-700">
            {CLASSIC_FORMULAS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormulaId(f.id)}
                className={`pb-2 text-xs sm:text-sm font-serif transition border-b-2 -mb-px ${
                  f.id === selectedFormulaId
                    ? 'border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 font-bold'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                {f.name.zh} · {f.name.en.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Open Formula Header */}
          <div className="space-y-3 pb-6 border-b border-stone-300/70 dark:border-stone-800">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                  典籍出处: {activeFormula.sourceText.zh} ({activeFormula.sourceText.en}) · {activeFormula.category.zh}
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 dark:text-stone-100 mt-1">
                  {activeFormula.name.zh} ({activeFormula.name.pinyin}) · {activeFormula.name.en}
                </h4>
              </div>
              <div className="flex flex-wrap gap-4">
                <TermBadge term={activeFormula.actions} lang={lang} />
                <TermBadge term={activeFormula.targetPattern} lang={lang} />
              </div>
            </div>

            {renderProse(lang, activeFormula.indicationsEn, activeFormula.indicationsZh)}

            <div className="text-xs font-mono text-stone-600 dark:text-stone-400 pt-1">
              辨证舌脉指征 (Tongue & Pulse): {lang === 'zh' ? activeFormula.tongueAndPulseZh : activeFormula.tongueAndPulseEn}
            </div>
          </div>

          {/* Open 4-Column Editorial Split for Jun-Chen-Zuo-Shi (Zero Box Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-300/70 dark:divide-stone-800 border-b border-stone-300/70 dark:border-stone-800 pb-6">
            {activeFormula.architecture.map((item, idx) => {
              const info = getRoleSealInfo(item.role);
              return (
                <div
                  key={item.herbName.zh}
                  className={`pt-4 flex flex-col justify-between space-y-4 ${info.accentBorder} ${
                    idx > 0 ? 'md:pl-5' : ''
                  } ${idx < 3 ? 'md:pr-5' : ''}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <VermilionSeal
                        text={info.seal}
                        variant={item.role.startsWith('Jun') ? 'solid' : 'outline'}
                      />
                      <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
                        {item.dosage}
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono uppercase text-stone-500">
                        {info.roleLabel}
                      </div>
                      <h5 className="font-serif font-bold text-lg text-stone-950 dark:text-stone-100 mt-0.5">
                        {item.herbName.zh}
                        <span className="block text-xs font-sans font-normal text-stone-600 dark:text-stone-400">
                          {item.herbName.pinyin} · {item.herbName.en}
                        </span>
                      </h5>
                    </div>

                    {renderProse(lang, item.roleExplanationEn, item.roleExplanationZh)}
                  </div>

                  {ESSENTIAL_HERBS.some((h) => h.id === item.herbId) && (
                    <button
                      onClick={() => setSelectedHerbId(item.herbId)}
                      className="text-left text-[11px] font-mono text-[#B91C1C] dark:text-amber-400 hover:underline pt-2"
                    >
                      ↑ 检视本草饮片 · Inspect {item.herbName.zh.split(' ')[0]}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Open Left-Bordered Formula Synergy Callout */}
          <div className="border-l-2 border-[#B91C1C] pl-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <VermilionSeal text="方义配伍" />
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-amber-300">
                Architectural Synergy & Pairing Wisdom (方义配伍精髓)
              </span>
            </div>
            {renderProse(lang, activeFormula.synergyAnalysisEn, activeFormula.synergyAnalysisZh)}
          </div>
        </div>
      </section>
    </div>
  );
}
