'use client';

import React, { useState } from 'react';
import { LanguageMode } from '@/types/tcm';
import { ArrowRight, Compass, Sparkles, BookOpen } from 'lucide-react';

type ActiveTab =
  | 'foundations'
  | 'meridians'
  | 'diagnostics'
  | 'materia-medica'
  | 'media-vault';

interface WelcomeSplashProps {
  lang: LanguageMode;
  onSelectLang: (lang: LanguageMode) => void;
  onEnter: (targetTab?: ActiveTab) => void;
}

const SPLASH_PATHS: {
  id: ActiveTab;
  num: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
}[] = [
  {
    id: 'foundations',
    num: '01',
    titleZh: '阴阳五行与藏象流注',
    titleEn: 'Foundations, Zang-Fu & 24h Qi Clock',
    descZh: '五行生克乘侮推演、五脏中西医对照、十二时辰子午流注气血钟',
    descEn: 'Interactive Five-Phase cycles, Zang-Fu organ bridge & circadian meridian clock'
  },
  {
    id: 'meridians',
    num: '02',
    titleZh: '经络铜人与骨度取穴',
    titleEn: '14 Meridians & 3D Bronze Statue Lab',
    descZh: '天圣针灸铜人三维交互、十四经脉体表循行与体内络属、骨度同身寸定位',
    descEn: '2D/3D anatomical pathways, internal organ branches & proportional Cun landmarks'
  },
  {
    id: 'diagnostics',
    num: '03',
    titleZh: '四诊八纲辨证沙盒',
    titleEn: 'Tongue, Pulse & Clinical Case Sandbox',
    descZh: '望舌脏腑分部、寸关尺脉搏示波器、四诊合参八纲辨证医案推演',
    descEn: 'Tongue reflection zones, radial pulse oscilloscope & syndrome differentiation'
  },
  {
    id: 'materia-medica',
    num: '04',
    titleZh: '道地本草与君臣佐使',
    titleEn: 'Materia Medica & Formula Architecture',
    descZh: '道地饮片四气五味雷达图、经典名方「君臣佐使」配伍拆解',
    descEn: 'Five-flavor radar profiles, thermal nature & Jun-Chen-Zuo-Shi formula deconstructor'
  },
  {
    id: 'media-vault',
    num: '05',
    titleZh: '五章导学与名师讲堂',
    titleEn: 'Guided Curriculum & University Lectures',
    descZh: '循序渐进五章考校、理法方穴知识图谱、八大中医药名校公开课与医案札记',
    descEn: '5-chapter mastery track, concept graph & verified university video courses'
  }
];

export default function WelcomeSplash({
  lang,
  onSelectLang,
  onEnter
}: WelcomeSplashProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = (targetTab?: ActiveTab) => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter(targetTab);
    }, 260);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to The Neijing Scholar — Traditional Chinese Medicine Interactive Platform"
      className={`fixed inset-0 z-100 overflow-y-auto bg-[#FAF6F0] dark:bg-[#121110] text-stone-900 dark:text-stone-100 transition-opacity duration-300 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Atmospheric Shanshui Ink-Wash Backdrop */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src="/images/shanshui_bg.jpg"
          alt=""
          className="w-full h-full object-cover object-top opacity-90 dark:opacity-25 dark:invert"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/55 via-[#FAF6F0]/80 to-[#FAF6F0]/95 dark:from-[#121110]/75 dark:via-[#121110]/90 dark:to-[#121110]/98" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12 min-h-screen flex flex-col justify-between">
        {/* Top Frontispiece Hairline Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-400/60 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="seal-stamp-solid text-xs">内经博考</span>
            <span className="editorial-kicker text-stone-700 dark:text-stone-300">
              Classical Chinese Medicine Digital Monograph · 杏林传习录
            </span>
          </div>

          {/* Language Preference Selector on Splash */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-serif">
              阅读语言 · Language:
            </span>
            <div className="inline-flex items-center gap-1 font-sans font-semibold">
              {(
                [
                  { id: 'dual', label: '双语 Dual' },
                  { id: 'en', label: 'English' },
                  { id: 'zh', label: '中文' }
                ] as const
              ).map((m, idx) => (
                <React.Fragment key={m.id}>
                  {idx > 0 && <span className="text-stone-400 dark:text-stone-700">/</span>}
                  <button
                    onClick={() => onSelectLang(m.id)}
                    className={`px-2 py-1.5 min-h-[38px] transition border-b-2 ${
                      lang === m.id
                        ? 'border-[#B91C1C] dark:border-amber-400 text-[#B91C1C] dark:text-amber-400 font-bold'
                        : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </header>

        {/* Center Editorial Frontispiece (扉页) */}
        <div className="my-auto py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Title, Epigraph, Overview & Primary Enter CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 text-xs font-serif text-[#B91C1C] dark:text-amber-400">
              <span className="seal-stamp">卷首扉页</span>
              <span>《黄帝内经》：「法于阴阳，和于术数，起居有常，不妄作劳」</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-wide text-stone-950 dark:text-amber-50 leading-[1.15]">
                本草与经络
                <span className="block text-2xl sm:text-3xl font-normal text-stone-800 dark:text-stone-200 mt-2">
                  The Neijing Scholar
                </span>
              </h1>
              <p className="editorial-kicker text-amber-900 dark:text-amber-400 pt-1">
                An Interactive Atlas & Clinical Sandbox for Traditional Chinese Medicine
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#B91C1C] dark:border-amber-500 pl-4 py-1">
              {(lang === 'dual' || lang === 'en') && (
                <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed">
                  Explore two millennia of classical medical wisdom through interactive visualizers: trace the <strong>14 Meridian Channels</strong> across a 2D/3D Tiansheng Bronze Statue, inspect <strong>Tongue &amp; Radial Pulse Waveforms</strong>, deconstruct <strong>Jun-Chen-Zuo-Shi Herbal Formulas</strong>, and study verified university lectures.
                </p>
              )}
              {(lang === 'dual' || lang === 'zh') && (
                <p className="font-serif text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed tracking-wide">
                  融汇《黄帝内经》《针灸甲乙经》《伤寒杂病论》《神农本草经》之医理精髓，以平面骨度与三维天圣铜人、察舌切脉示波、方剂君臣佐使拆解及名校公开课，构筑沉浸式中医数字实训室。
                </p>
              )}
            </div>

            {/* Primary Call to Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleDismiss()}
                className="inline-flex items-center gap-3 px-6 py-3.5 min-h-[48px] bg-[#B91C1C] hover:bg-red-900 text-[#FAF6F0] font-serif font-bold text-base tracking-wide transition shadow-sm cursor-pointer"
              >
                <span>展卷入杏林 · Enter The Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDismiss('media-vault')}
                className="inline-flex items-center gap-2 px-4 py-3 min-h-[48px] border-b-2 border-stone-800 dark:border-amber-400 text-stone-900 dark:text-amber-200 hover:text-[#B91C1C] hover:border-[#B91C1C] font-serif font-bold text-sm transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>从五章导学开始 · Start 5-Chapter Guided Path</span>
              </button>
            </div>

            {/* Key Highlights Footnote */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-600 dark:text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#B91C1C] dark:text-amber-400" />
                <span>5 Interactive Learning Modules</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-emerald-400" />
                <span>Bilingual Classical &amp; Modern Citations</span>
              </span>
              <span>·</span>
              <span>No sign-up required (progress saved locally)</span>
            </div>
          </div>

          {/* Right Column: Open Hairline Directory of the 5 Learning Paths */}
          <div className="lg:col-span-5 lg:border-l lg:border-stone-300/80 dark:lg:border-stone-800 lg:pl-10">
            <div className="pb-3 border-b border-stone-300/80 dark:border-stone-800 flex items-center justify-between">
              <span className="editorial-kicker text-stone-600 dark:text-stone-400">
                五卷实训目录 · Select Any Module to Begin
              </span>
              <span className="seal-stamp text-xs">五卷全览</span>
            </div>

            <div className="divide-y divide-stone-300/70 dark:divide-stone-800 border-b border-stone-300/80 dark:border-stone-800">
              {SPLASH_PATHS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleDismiss(p.id)}
                  className="w-full py-3.5 px-2 text-left group hover:bg-stone-900/4 dark:hover:bg-white/4 transition flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans font-bold text-xs text-[#B91C1C] dark:text-amber-400">
                      {p.num}
                    </span>
                    <div>
                      <div className="font-serif font-bold text-base text-stone-950 dark:text-stone-100 group-hover:text-[#B91C1C] dark:group-hover:text-amber-300 transition">
                        {p.titleZh}
                        {lang !== 'zh' && (
                          <span className="block sm:inline sm:ml-2 font-sans font-medium text-xs text-stone-600 dark:text-stone-400">
                            · {p.titleEn}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                        {lang === 'zh' ? p.descZh : p.descEn}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#B91C1C] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Frontispiece Colophon */}
        <footer className="pt-5 border-t border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 dark:text-stone-400">
          <div className="font-serif">
            据《黄帝内经》《针灸甲乙经》《伤寒杂病论》《神农本草经》考订编纂
          </div>
          <div>
            Educational &amp; Scholarly Reference · Not a substitute for professional medical diagnosis
          </div>
        </footer>
      </div>
    </div>
  );
}
