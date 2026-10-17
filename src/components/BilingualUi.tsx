'use client';

import React from 'react';
import { BilingualText, ClassicalQuote, LanguageMode } from '@/types/tcm';
import { BookOpen, Sparkles } from 'lucide-react';

export function renderProse(lang: LanguageMode, en: string, zh: string) {
  if (lang === 'en') {
    return <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{en}</p>;
  }
  if (lang === 'zh') {
    return <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-base">{zh}</p>;
  }
  return (
    <div className="space-y-1.5">
      <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">{en}</p>
      <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-serif text-sm border-l-2 border-amber-700/40 pl-3">
        {zh}
      </p>
    </div>
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
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5 font-semibold'
  }[size];

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-1.5 rounded-md border border-stone-300/80 dark:border-stone-700 bg-amber-50/60 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 ${sizeClasses}`}
      style={accentColor ? { borderLeftWidth: '4px', borderLeftColor: accentColor } : undefined}
    >
      <span className="font-serif font-bold tracking-wide">{term.zh}</span>
      <span className="text-xs text-amber-800 dark:text-amber-400 font-mono">({term.pinyin})</span>
      {lang !== 'zh' && <span className="text-stone-700 dark:text-stone-300">· {term.en}</span>}
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
    <div className="relative overflow-hidden rounded-xl border border-amber-900/20 dark:border-amber-500/20 bg-gradient-to-br from-[#F7F1E5] to-[#EFE6D5] dark:from-stone-900 dark:to-stone-800/90 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-800 dark:text-amber-400">
          <BookOpen className="w-4 h-4" />
          <span>{quote.sourceZh}</span>
          {lang !== 'zh' && <span className="text-stone-500 dark:text-stone-400">· {quote.sourceEn}</span>}
        </div>
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-serif font-bold bg-red-800 text-amber-50 rounded shadow-xs">
          经典原文
        </span>
      </div>

      <blockquote className="space-y-2">
        <p className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-amber-100 tracking-wide">
          「{quote.quoteZh}」
        </p>
        <p className="text-xs font-mono text-amber-900/80 dark:text-amber-300/80 italic">
          {quote.quotePinyin}
        </p>
        {lang !== 'zh' && (
          <p className="text-sm text-stone-800 dark:text-stone-200 italic pt-1">
            “{quote.quoteEn}”
          </p>
        )}
      </blockquote>

      <div className="mt-4 pt-3 border-t border-amber-900/15 dark:border-stone-700 flex items-start gap-2 text-xs sm:text-sm">
        <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          {lang !== 'zh' && <p className="text-stone-700 dark:text-stone-300">{quote.commentaryEn}</p>}
          {lang !== 'en' && <p className="text-stone-600 dark:text-stone-400 font-serif">{quote.commentaryZh}</p>}
        </div>
      </div>
    </div>
  );
}
