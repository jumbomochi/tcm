'use client';

import React from 'react';
import { BilingualText, ClassicalQuote, LanguageMode } from '@/types/tcm';

export function renderProse(lang: LanguageMode, en: string, zh: string) {
  if (lang === 'en') {
    return <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-[15px]">{en}</p>;
  }
  if (lang === 'zh') {
    return <p className="text-stone-900 dark:text-stone-100 leading-relaxed font-serif text-base">{zh}</p>;
  }
  return (
    <div className="space-y-1.5">
      <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-[15px]">{en}</p>
      <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif text-sm border-l-2 border-[#9E2A2B]/60 pl-3">
        {zh}
      </p>
    </div>
  );
}

export function VermilionSeal({
  text,
  variant = 'solid',
  size = 'sm'
}: {
  text: string;
  variant?: 'solid' | 'outline';
  size?: 'xs' | 'sm' | 'md';
}) {
  const dims = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm'
  }[size];
  return (
    <span className={`${variant === 'solid' ? 'seal-stamp-solid' : 'seal-stamp'} ${dims} select-none shrink-0`}>
      {text}
    </span>
  );
}

export function TermBadge({
  term,
  lang,
  size = 'md',
  accentColor
}: {
  term: BilingualText;
  lang: LanguageMode;
  size?: 'sm' | 'md' | 'lg';
  accentColor?: string;
}) {
  const sizeClasses = {
    sm: 'text-xs py-0.5',
    md: 'text-sm py-1',
    lg: 'text-base py-1 font-semibold'
  }[size];

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-1.5 border-b border-stone-400/70 dark:border-stone-600 text-stone-900 dark:text-stone-100 ${sizeClasses}`}
      style={accentColor ? { borderBottomColor: accentColor, borderBottomWidth: '2px' } : undefined}
    >
      <span className="font-serif font-bold tracking-wide">{term.zh}</span>
      <span className="text-xs text-[#9E2A2B] dark:text-amber-400 font-mono">[{term.pinyin}]</span>
      {lang !== 'zh' && <span className="text-stone-700 dark:text-stone-300 font-serif italic">· {term.en}</span>}
    </span>
  );
}

export function ClassicalQuoteCard({
  quote,
  lang
}: {
  quote: ClassicalQuote;
  lang: LanguageMode;
}) {
  return (
    <div className="relative border-y-2 border-stone-800/80 dark:border-stone-600 bg-[#F3EAD8]/70 dark:bg-stone-900/80 px-5 py-4">
      {/* Vertical Red Silk Column Rule (朱丝栏) */}
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex flex-col items-center shrink-0 pt-1 select-none">
          <span className="seal-stamp-solid px-1.5 py-2 text-xs vertical-rl">
            经典原文
          </span>
          <div className="w-px h-14 bg-[#9E2A2B]/40 mt-2" />
        </div>

        <div className="flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-400/40 dark:border-stone-700 pb-1.5">
            <div className="text-xs font-serif font-bold tracking-wider text-[#9E2A2B] dark:text-amber-400">
              <span>{quote.sourceZh}</span>
              {lang !== 'zh' && (
                <span className="font-mono font-normal text-stone-600 dark:text-stone-400 ml-2">
                  [{quote.sourceEn}]
                </span>
              )}
            </div>
            <span className="text-[11px] font-serif text-stone-500 dark:text-stone-400">
              卷帙注疏 · Classical Exegesis
            </span>
          </div>

          <blockquote className="space-y-1.5">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-950 dark:text-amber-100 tracking-wider leading-snug">
              「{quote.quoteZh}」
            </p>
            <p className="text-xs font-mono text-stone-600 dark:text-amber-300/80">
              {quote.quotePinyin}
            </p>
            {lang !== 'zh' && (
              <p className="text-sm font-serif italic text-stone-800 dark:text-stone-200 pt-0.5">
                “{quote.quoteEn}”
              </p>
            )}
          </blockquote>

          <div className="pt-2 border-t border-stone-400/30 dark:border-stone-800 text-xs sm:text-sm space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
              按语 · Clinical Commentary
            </div>
            {lang !== 'zh' && <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{quote.commentaryEn}</p>}
            {lang !== 'en' && <p className="text-stone-700 dark:text-stone-300 font-serif leading-relaxed">{quote.commentaryZh}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

