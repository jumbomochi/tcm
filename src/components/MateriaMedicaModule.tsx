'use client';

import React, { useState } from 'react';
import { LanguageMode } from '@/types/tcm';
import { ESSENTIAL_HERBS, CLASSIC_FORMULAS } from '@/data/materiaMedicaData';
import { renderProse, TermBadge } from './BilingualUi';
import {
  Leaf,
  FlaskConical,
  Thermometer,
  Sparkles,
  AlertCircle,
  Crown,
  ShieldCheck,
  Users,
  Send,
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

  const getRoleBadgeStyle = (role: string) => {
    if (role.startsWith('Jun')) {
      return {
        bg: 'bg-red-800 text-amber-50 border-red-900',
        cardBorder: 'border-red-800/40 bg-red-950/5 dark:bg-red-950/25',
        icon: <Crown className="w-4 h-4 text-amber-300" />
      };
    }
    if (role.startsWith('Chen')) {
      return {
        bg: 'bg-amber-700 text-white border-amber-800',
        cardBorder: 'border-amber-700/40 bg-amber-950/5 dark:bg-amber-950/25',
        icon: <ShieldCheck className="w-4 h-4 text-amber-100" />
      };
    }
    if (role.startsWith('Zuo')) {
      return {
        bg: 'bg-emerald-800 text-white border-emerald-900',
        cardBorder: 'border-emerald-800/40 bg-emerald-950/5 dark:bg-emerald-950/25',
        icon: <Users className="w-4 h-4 text-emerald-100" />
      };
    }
    return {
      bg: 'bg-slate-700 text-white border-slate-800',
      cardBorder: 'border-slate-600/40 bg-slate-950/5 dark:bg-slate-900/40',
      icon: <Send className="w-4 h-4 text-slate-200" />
    };
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner with Classical Materia Medica Scroll */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-900/20 dark:border-stone-700 bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#EFE6D5] dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <span>本草纲目与方剂配伍 · Materia Medica & Classical Formulas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              中药四气五味归经与方剂「君臣佐使」拆解器
              {lang !== 'zh' && (
                <span className="block text-lg sm:text-xl font-normal text-stone-600 dark:text-stone-300 mt-1">
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
            <div className="relative rounded-xl overflow-hidden border-2 border-amber-900/25 shadow-md aspect-video bg-stone-200 dark:bg-stone-800">
              <img
                src="/images/materia_medica_scroll.jpg"
                alt="Materia Medica Botanical Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《本草道地饮片图鉴》· Classical Pharmacopeia</span>
                <span className="px-2 py-0.5 bg-emerald-800/90 rounded text-[10px]">四气五味</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: ESSENTIAL MATERIA MEDICA (本草图鉴) */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Interactive Pharmacopeia · 道地中药饮片图谱
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Essential Herbs & Four Natures / Five Flavors Radar
              </h3>
            </div>
          </div>

          {/* Filter by Thermal Nature (四气) */}
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'Warm', 'Neutral', 'Cool', 'Cold'].map((t) => (
              <button
                key={t}
                onClick={() => setTempFilter(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                  tempFilter === t
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                {t === 'ALL' ? 'All Natures (四气全览)' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Herb Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {filteredHerbs.map((herb) => {
            const active = herb.id === selectedHerbId;
            return (
              <button
                key={herb.id}
                onClick={() => setSelectedHerbId(herb.id)}
                className={`p-3 rounded-xl text-left border transition flex flex-col justify-between ${
                  active
                    ? 'bg-[#FAF6F0] dark:bg-stone-800 border-2 border-amber-800 dark:border-amber-400 shadow-xs'
                    : 'bg-stone-50/80 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    {herb.name.zh}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: herb.botanicalColor }}
                  />
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                  {herb.name.en}
                </div>
                <div className="text-[10px] font-mono text-amber-800 dark:text-amber-400 mt-1">
                  {herb.category.zh} · {herb.temperature}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Herb Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Left: Five Flavors Radar + Thermal Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center p-5 rounded-2xl bg-[#FAF6F0] dark:bg-stone-950 border border-amber-900/20 space-y-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-800 dark:text-stone-200">
                五味雷达图 · Five Flavors Profile
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-900/10 text-amber-900 dark:text-amber-300">
                {activeHerb.flavors.join(' · ')}
              </span>
            </div>

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
                      fill="#57534E"
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

            {/* Thermal Spectrum Bar (四气：寒、凉、平、温、热) */}
            <div className="w-full space-y-1.5 pt-2 border-t border-amber-900/15">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-red-800" />
                  <span>Thermal Nature (四气):</span>
                </span>
                <span className="font-bold text-amber-900 dark:text-amber-300">
                  {activeHerb.temperature}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-mono">
                {[
                  { label: '寒 Cold', score: -2, color: 'bg-blue-800 text-white' },
                  { label: '凉 Cool', score: -1, color: 'bg-sky-600 text-white' },
                  { label: '平 Neutral', score: 0, color: 'bg-emerald-700 text-white' },
                  { label: '温 Warm', score: 1, color: 'bg-amber-600 text-white' },
                  { label: '热 Hot', score: 2, color: 'bg-red-700 text-white' }
                ].map((lv) => (
                  <div
                    key={lv.label}
                    className={`py-1 rounded ${
                      activeHerb.temperatureScore === lv.score
                        ? `${lv.color} font-bold ring-2 ring-stone-900 dark:ring-white`
                        : 'bg-stone-200/70 dark:bg-stone-800 text-stone-500'
                    }`}
                  >
                    {lv.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Herb Details, Slices Appearance, Meridians Entered, Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                    {activeHerb.pharmaceuticalLatin} · {activeHerb.category.zh} ({activeHerb.category.en})
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-amber-100 dark:hover:bg-stone-700 transition"
                >
                  {bookmarks.includes(`herb-${activeHerb.id}`) ? (
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

              {/* Meridians Entered (归经) */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-stone-500 mr-1">
                  归经 Meridians Entered:
                </span>
                {activeHerb.meridiansEntered.map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-0.5 rounded-full text-xs font-serif font-semibold bg-amber-900/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300"
                  >
                    {m}
                  </span>
                ))}
                <span className="ml-auto text-xs font-mono text-stone-500">
                  Dosage: {activeHerb.dosage}
                </span>
              </div>

              {/* Key Therapeutic Actions */}
              <div className="flex flex-wrap gap-2">
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

              {/* Prepared Slice (中药饮片) Visual Identification */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  🔍 Apothecary Slice Identification (道地饮片性状鉴别)
                </div>
                {renderProse(lang, activeHerb.visualDescriptionEn, activeHerb.visualDescriptionZh)}
              </div>

              {/* Clinical Uses */}
              <div className="p-3.5 rounded-xl bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-800/20 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clinical Applications (临床应用要旨)</span>
                </div>
                {renderProse(lang, activeHerb.clinicalUsesEn, activeHerb.clinicalUsesZh)}
              </div>

              {/* Cautions / Contraindications */}
              <div className="p-3 rounded-xl bg-red-950/5 dark:bg-red-950/30 border border-red-800/20 flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-red-800 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-800 dark:text-red-300">使用注意 (Cautions): </strong>
                  <span className="text-stone-700 dark:text-stone-300">
                    {lang === 'zh' ? activeHerb.cautionsZh : activeHerb.cautionsEn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: JUN-CHEN-ZUO-SHI (君臣佐使) FORMULA DECONSTRUCTOR */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-red-800 dark:text-amber-400" />
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-800 dark:text-amber-400">
                Interactive Formula Architecture · 经典名方配伍拆解
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                君臣佐使 (Jun-Chen-Zuo-Shi) Classical Formula Deconstructor
              </h3>
            </div>
          </div>

          {/* Formula Selector Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {CLASSIC_FORMULAS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormulaId(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition border ${
                  f.id === selectedFormulaId
                    ? 'bg-red-800 text-amber-50 border-red-800 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {f.name.zh} · {f.name.en.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Formula Header Summary */}
        <div className="p-6 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/80 border border-amber-900/20 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                {activeFormula.sourceText.zh} · {activeFormula.category.zh}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                {activeFormula.name.zh} ({activeFormula.name.pinyin}) · {activeFormula.name.en}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <TermBadge term={activeFormula.actions} lang={lang} />
              <TermBadge term={activeFormula.targetPattern} lang={lang} />
            </div>
          </div>

          {renderProse(lang, activeFormula.indicationsEn, activeFormula.indicationsZh)}

          <div className="text-xs font-mono text-stone-600 dark:text-stone-400 pt-2 border-t border-amber-900/15">
            👅 Typical Tongue & Pulse: {lang === 'zh' ? activeFormula.tongueAndPulseZh : activeFormula.tongueAndPulseEn}
          </div>
        </div>

        {/* Jun-Chen-Zuo-Shi Architectural Hierarchy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeFormula.architecture.map((item) => {
            const style = getRoleBadgeStyle(item.role);
            return (
              <div
                key={item.herbName.zh}
                className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-3 ${style.cardBorder}`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-serif font-bold ${style.bg}`}
                    >
                      {style.icon}
                      <span>{item.role}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-300">
                      {item.dosage}
                    </span>
                  </div>

                  <h5 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                    {item.herbName.zh}
                    <span className="block text-xs font-sans font-normal text-stone-600 dark:text-stone-400">
                      {item.herbName.pinyin} · {item.herbName.en}
                    </span>
                  </h5>

                  {renderProse(lang, item.roleExplanationEn, item.roleExplanationZh)}
                </div>

                {ESSENTIAL_HERBS.some((h) => h.id === item.herbId) && (
                  <button
                    onClick={() => setSelectedHerbId(item.herbId)}
                    className="text-left text-[11px] font-mono text-amber-800 dark:text-amber-400 hover:underline pt-2 border-t border-stone-200/60 dark:border-stone-700"
                  >
                    ↑ Inspect {item.herbName.zh.split(' ')[0]} in Herb Radar
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Formula Synergy Masterclass Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/5 via-red-950/5 to-amber-950/5 dark:from-stone-800 dark:to-stone-800/70 border border-amber-800/25 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-red-800 dark:text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Architectural Synergy & Pairing Wisdom (方义配伍精髓)</span>
          </div>
          {renderProse(lang, activeFormula.synergyAnalysisEn, activeFormula.synergyAnalysisZh)}
        </div>
      </section>
    </div>
  );
}
