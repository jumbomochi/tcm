'use client';

import React from 'react';
import { BilingualText, ClassicalQuote, LanguageMode } from '@/types/tcm';

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

/**
 * Unboxed, dot-separated editorial metadata eyebrow line (12px+ small-caps sans, no monospace).
 */
export function LabMetadataChips({
  chips
}: {
  chips: { label: string; tone?: 'amber' | 'jade' | 'cinnabar' | 'stone' }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-sans font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
      {chips.map((c, idx) => (
        <React.Fragment key={c.label}>
          {idx > 0 && <span className="text-stone-400 dark:text-stone-600">·</span>}
          <span
            className={
              c.tone === 'cinnabar'
                ? 'text-[#B91C1C] dark:text-amber-400 font-bold'
                : c.tone === 'jade'
                ? 'text-[#2D6A4F] dark:text-emerald-400 font-bold'
                : ''
            }
          >
            {c.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Unboxed inline typographic term callout with a subtle bottom rule instead of a bordered pill box.
 */
export function TermBadge({ term, lang, size = 'md', accentColor }: TermBadgeProps) {
  const sizeMap = {
    sm: 'text-xs pb-0.5',
    md: 'text-sm pb-0.5',
    lg: 'text-base pb-1'
  };

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-1.5 border-b border-stone-400/80 dark:border-stone-600 ${sizeMap[size]}`}
      style={accentColor ? { borderBottomColor: accentColor, borderBottomWidth: '2px' } : undefined}
    >
      {(lang === 'dual' || lang === 'zh') && (
        <span className="font-serif font-bold tracking-wide text-stone-950 dark:text-amber-100">
          {term.zh}
        </span>
      )}
      {lang === 'dual' && (
        <span className="text-xs font-sans text-amber-900 dark:text-amber-300">
          {term.pinyin}
        </span>
      )}
      {(lang === 'dual' || lang === 'en') && (
        <span className="font-sans font-medium text-stone-800 dark:text-stone-200">
          {lang === 'dual' ? `· ${term.en}` : `${term.en} (${term.zh})`}
        </span>
      )}
    </span>
  );
}

/**
 * Unboxed classical quotation block with a simple left cinnabar rule — zero outer box or card border.
 */
export function ClassicalQuoteCard({
  quote,
  lang
}: {
  quote: ClassicalQuote;
  lang: LanguageMode;
}) {
  return (
    <blockquote className="border-l-2 border-[#B91C1C] dark:border-amber-500 pl-4 py-1.5 space-y-1.5">
      <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
        <span className="text-[#B91C1C] dark:text-amber-400 font-serif font-bold text-sm">
          {quote.sourceZh}
        </span>
        <span>·</span>
        <span>{quote.sourceEn}</span>
      </div>
      <p className="font-serif text-base sm:text-lg font-bold tracking-wider text-stone-950 dark:text-amber-50 leading-relaxed">
        「{quote.quoteZh}」
      </p>
      {lang !== 'zh' && (
        <p className="text-xs font-sans text-stone-600 dark:text-stone-300 leading-relaxed">
          {quote.quotePinyin}
        </p>
      )}
      {(lang === 'dual' || lang === 'en') && (
        <p className="text-sm italic text-stone-800 dark:text-stone-200 leading-relaxed">
          &ldquo;{quote.quoteEn}&rdquo;
        </p>
      )}
      <p className="text-xs text-stone-700 dark:text-stone-300 pt-0.5 leading-relaxed">
        {lang === 'zh' ? quote.commentaryZh : quote.commentaryEn}
      </p>
    </blockquote>
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
      <span className="font-serif font-semibold text-stone-950 dark:text-stone-100">{zh}</span>
      {pinyin ? <span className="text-xs font-sans opacity-80 ml-1">({pinyin})</span> : null}
      <span className="mx-1.5 opacity-50">·</span>
      <span>{en}</span>
    </span>
  );
}

/**
 * Side-by-side bilingual prose on desktop (md:grid-cols-2) with high-contrast ink for both languages,
 * eliminating vertical page doubling and low-contrast grey Chinese text.
 */
export function renderProse(lang: LanguageMode, en: string, zh: string) {
  if (lang === 'en') {
    return (
      <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
        {en}
      </p>
    );
  }
  if (lang === 'zh') {
    return (
      <p className="font-serif text-stone-900 dark:text-stone-100 leading-relaxed text-base tracking-wide">
        {zh}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-baseline">
      <p className="text-stone-900 dark:text-stone-100 leading-relaxed text-sm sm:text-[15px]">
        {en}
      </p>
      <p className="font-serif text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-[15px] tracking-wide md:border-l md:border-stone-300/70 dark:md:border-stone-700/80 md:pl-4">
        {zh}
      </p>
    </div>
  );
}
