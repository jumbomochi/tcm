'use client';

import React from 'react';
import { BilingualText, ClassicalQuote, LanguageMode } from '@/types/tcm';
import { BookOpen } from 'lucide-react';

interface TermBadgeProps {
  term: BilingualText;
  lang: LanguageMode;
  size?: 'sm' | 'md' | 'lg';
  accentColor?: string;
}

export function VermilionSeal({
  text,
  variant = 'outline'
}: {
  text: string;
  variant?: 'outline' | 'solid';
}) {
  return (
    <span className={variant === 'solid' ? 'seal-stamp-solid text-xs' : 'seal-stamp text-xs'}>
      {text}
    </span>
  );
}

export function LabMetadataChips({
  chips
}: {
  chips: { label: string; tone?: 'amber' | 'jade' | 'cinnabar' | 'stone' }[];
}) {
  const toneClasses = {
    amber:
      'bg-amber-900/10 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200 border-amber-800/15',
    jade:
      'bg-emerald-900/10 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200 border-emerald-800/15',
    cinnabar:
      'bg-red-900/10 text-red-900 dark:bg-red-400/15 dark:text-red-200 border-red-800/15',
    stone:
      'bg-stone-900/6 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-400/20'
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <span
          key={c.label}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            toneClasses[c.tone || 'stone']
          }`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

export function TermBadge({ term, lang, size = 'md', accentColor }: TermBadgeProps) {
  const sizeMap = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-3.5 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-1.5 rounded-full bg-white/85 dark:bg-stone-800/85 border border-stone-200/80 dark:border-stone-700 shadow-2xs ${sizeMap[size]}`}
      style={accentColor ? { borderLeftWidth: '3px', borderLeftColor: accentColor } : undefined}
    >
      {(lang === 'dual' || lang === 'zh') && (
        <span className="font-serif font-bold tracking-wide text-stone-900 dark:text-amber-100">
          {term.zh}
        </span>
      )}
      {lang === 'dual' && (
        <span className="text-[11px] font-mono text-amber-800/90 dark:text-amber-400/90">
          {term.pinyin}
        </span>
      )}
      {(lang === 'dual' || lang === 'en') && (
        <span className="font-sans font-medium text-stone-700 dark:text-stone-300">
          {lang === 'dual' ? `· ${term.en}` : `${term.en} (${term.zh})`}
        </span>
      )}
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
    <div className="relative rounded-[20px] bg-gradient-to-br from-[#F7F1E5]/95 to-[#EFE6D6]/90 dark:from-stone-900/90 dark:to-stone-800/80 border border-amber-900/15 dark:border-stone-700/80 p-5 shadow-2xs">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-2xl bg-red-900/10 dark:bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-4 h-4 text-[#B91C1C] dark:text-amber-400" />
        </div>
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900/80 dark:text-amber-400/90">
              Classical Source · 典籍引文
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-900/8 dark:bg-stone-800 text-[11px] font-serif font-semibold text-stone-700 dark:text-amber-200">
              {quote.sourceZh} · {quote.sourceEn}
            </span>
          </div>
          <p className="font-serif text-base sm:text-lg font-bold tracking-wider text-stone-900 dark:text-amber-50 leading-relaxed">
            「{quote.quoteZh}」
          </p>
          {lang !== 'zh' && (
            <p className="text-xs font-mono text-stone-500 dark:text-stone-400 leading-relaxed">
              {quote.quotePinyin}
            </p>
          )}
          {(lang === 'dual' || lang === 'en') && (
            <p className="text-sm italic text-stone-700 dark:text-stone-300 leading-relaxed pt-0.5">
              &ldquo;{quote.quoteEn}&rdquo;
            </p>
          )}
          <div className="pt-2 border-t border-amber-900/10 dark:border-stone-700/70 text-xs text-stone-600 dark:text-stone-400">
            {lang === 'zh' ? quote.commentaryZh : quote.commentaryEn}
          </div>
        </div>
      </div>
    </div>
  );
}

export function renderBilingualText(
  lang: LanguageMode,
  en: string,
  zh: string,
  pinyin?: string
) {
  if (lang === 'en') return <span>{en}</span>;
  if (lang === 'zh') return <span className="font-serif">{zh}</span>;
  return (
    <span>
      <span className="font-serif font-semibold">{zh}</span>
      {pinyin ? <span className="text-xs font-mono opacity-75 ml-1">({pinyin})</span> : null}
      <span className="mx-1.5 opacity-50">·</span>
      <span>{en}</span>
    </span>
  );
}

export function renderProse(lang: LanguageMode, en: string, zh: string) {
  if (lang === 'en') {
    return <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base">{en}</p>;
  }
  if (lang === 'zh') {
    return (
      <p className="font-serif text-stone-800 dark:text-stone-200 leading-relaxed text-base tracking-wide">
        {zh}
      </p>
    );
  }
  return (
    <div className="space-y-2">
      <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
        {en}
      </p>
      <p className="font-serif text-stone-600 dark:text-stone-400 leading-relaxed text-sm tracking-wide pl-3 border-l-2 border-amber-700/35">
        {zh}
      </p>
    </div>
  );
}
