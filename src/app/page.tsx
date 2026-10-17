'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { LanguageMode } from '@/types/tcm';
import FoundationsModule from '@/components/FoundationsModule';
import MeridiansModule from '@/components/MeridiansModule';
import DiagnosticsModule from '@/components/DiagnosticsModule';
import MateriaMedicaModule from '@/components/MateriaMedicaModule';
import CurriculumAndVaultModule, {
  SavedBookmark,
  StudyNote
} from '@/components/CurriculumAndVaultModule';
import { WUXING_ELEMENTS, ZANG_FU_ORGANS } from '@/data/foundationsData';
import { KEY_ACUPOINTS } from '@/data/meridiansData';
import { DIAGNOSTIC_CASES } from '@/data/diagnosticsData';
import { ESSENTIAL_HERBS, CLASSIC_FORMULAS } from '@/data/materiaMedicaData';
import {
  Search,
  Moon,
  Sun,
  Bookmark,
  Award,
  X
} from 'lucide-react';

type ActiveTab =
  | 'foundations'
  | 'meridians'
  | 'diagnostics'
  | 'materia-medica'
  | 'media-vault';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('foundations');
  const [lang, setLang] = useState<LanguageMode>('dual');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([
    { id: 'acupoint-ST36', title: 'ST36 足三里 · Foot Three Miles', category: 'Meridians & Acupoints' },
    { id: 'herb-ren-shen', title: '人参 · Ginseng Root', category: 'Materia Medica' }
  ]);
  const [completedChapters, setCompletedChapters] = useState<string[]>(['ch1-yinyang-wuxing']);
  const [notes, setNotes] = useState<StudyNote[]>([
    {
      id: 'note-1',
      title: '开四关 (Four Gates: LI4 合谷 + LR3 太冲)',
      content: 'LI4 (Hand Yangming) governs Qi; LR3 (Foot Jueyin) governs Blood. Together they open the four gates to strongly course stagnant Qi & Blood.',
      createdAt: '2026-10-17'
    }
  ]);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('tcm_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      const savedChapters = localStorage.getItem('tcm_chapters');
      if (savedChapters) setCompletedChapters(JSON.parse(savedChapters));
      const savedNotes = localStorage.getItem('tcm_notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleToggleBookmark = (id: string, title: string, category: string) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === id);
      const next = exists ? prev.filter((b) => b.id !== id) : [...prev, { id, title, category }];
      try {
        localStorage.setItem('tcm_bookmarks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem('tcm_bookmarks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleToggleChapterComplete = (chapterId: string) => {
    setCompletedChapters((prev) => {
      const next = prev.includes(chapterId)
        ? prev.filter((c) => c !== chapterId)
        : [...prev, chapterId];
      try {
        localStorage.setItem('tcm_chapters', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleAddNote = (title: string, content: string) => {
    const newNote: StudyNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setNotes((prev) => {
      const next = [newNote, ...prev];
      try {
        localStorage.setItem('tcm_notes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      try {
        localStorage.setItem('tcm_notes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Global Bilingual Search Index
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const items: {
      title: string;
      subtitle: string;
      category: string;
      tab: ActiveTab;
    }[] = [];

    WUXING_ELEMENTS.forEach((el) => {
      if (
        el.name.zh.includes(q) ||
        el.name.en.toLowerCase().includes(q) ||
        el.zangOrgan.zh.includes(q) ||
        el.zangOrgan.en.toLowerCase().includes(q)
      ) {
        items.push({
          title: `${el.name.zh}行 · ${el.name.en} Element (${el.zangOrgan.zh}/${el.fuOrgan.zh})`,
          subtitle: el.physiologyEn.slice(0, 90) + '...',
          category: 'Wu Xing · 五行',
          tab: 'foundations'
        });
      }
    });

    ZANG_FU_ORGANS.forEach((org) => {
      if (
        org.name.zh.includes(q) ||
        org.name.en.toLowerCase().includes(q) ||
        org.name.pinyin.toLowerCase().includes(q)
      ) {
        items.push({
          title: `${org.name.zh} · ${org.name.en} (${org.meridianCode})`,
          subtitle: org.tcmFunctions.map((f) => f.title.zh).join(' · '),
          category: 'Zang-Fu · 脏腑',
          tab: 'foundations'
        });
      }
    });

    KEY_ACUPOINTS.forEach((pt) => {
      if (
        pt.code.toLowerCase().includes(q) ||
        pt.name.zh.includes(q) ||
        pt.name.en.toLowerCase().includes(q) ||
        pt.name.pinyin.toLowerCase().includes(q)
      ) {
        items.push({
          title: `${pt.code} ${pt.name.zh} (${pt.name.pinyin}) · ${pt.name.en}`,
          subtitle: pt.locationEn,
          category: 'Acupoint · 腧穴',
          tab: 'meridians'
        });
      }
    });

    DIAGNOSTIC_CASES.forEach((c) => {
      if (
        c.title.zh.includes(q) ||
        c.title.en.toLowerCase().includes(q) ||
        c.patternDiagnosis.zh.includes(q)
      ) {
        items.push({
          title: `${c.title.zh} · ${c.title.en}`,
          subtitle: c.treatmentPrinciple.zh + ' · ' + c.treatmentPrinciple.en,
          category: 'Pattern · 证候',
          tab: 'diagnostics'
        });
      }
    });

    ESSENTIAL_HERBS.forEach((h) => {
      if (
        h.name.zh.includes(q) ||
        h.name.en.toLowerCase().includes(q) ||
        h.name.pinyin.toLowerCase().includes(q)
      ) {
        items.push({
          title: `${h.name.zh} (${h.name.pinyin}) · ${h.name.en}`,
          subtitle: `${h.category.zh} · ${h.temperature}`,
          category: 'Materia Medica · 中药',
          tab: 'materia-medica'
        });
      }
    });

    CLASSIC_FORMULAS.forEach((f) => {
      if (
        f.name.zh.includes(q) ||
        f.name.en.toLowerCase().includes(q) ||
        f.name.pinyin.toLowerCase().includes(q)
      ) {
        items.push({
          title: `${f.name.zh} (${f.name.pinyin}) · ${f.name.en}`,
          subtitle: `${f.actions.zh} · ${f.actions.en}`,
          category: 'Formula · 方剂',
          tab: 'materia-medica'
        });
      }
    });

    return items.slice(0, 8);
  }, [searchQuery]);

  const navItems: {
    id: ActiveTab;
    num: string;
    labelZh: string;
    labelEn: string;
  }[] = [
    {
      id: 'foundations',
      num: '01',
      labelZh: '阴阳五行与藏象',
      labelEn: 'Foundations & Qi Clock'
    },
    {
      id: 'meridians',
      num: '02',
      labelZh: '经络铜人与骨度取穴',
      labelEn: '2D/3D Meridians Lab'
    },
    {
      id: 'diagnostics',
      num: '03',
      labelZh: '四诊八纲辨证沙盒',
      labelEn: 'Diagnostics & Case Lab'
    },
    {
      id: 'materia-medica',
      num: '04',
      labelZh: '本草饮片与君臣佐使',
      labelEn: 'Materia Medica & Formulas'
    },
    {
      id: 'media-vault',
      num: '05',
      labelZh: '五章导学与名师讲堂',
      labelEn: 'Curriculum & Video Lectures'
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="relative min-h-screen text-stone-900 dark:text-stone-100 transition-colors selection:bg-amber-900/20">
        {/* Full-Page Fixed Classical Ink-Wash Landscape Background (山水云雾宣纸) */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/shanshui_bg.jpg"
            alt=""
            className="w-full h-full object-cover object-center opacity-85 dark:opacity-22 dark:invert transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/55 via-[#FAF6F0]/75 to-[#F5EFE6]/85 dark:from-[#121110]/85 dark:via-[#141311]/90 dark:to-[#121110]/95" />
        </div>

        {/* Minimalist Top Bar + Integrated Underline Tab Strip (Zero Box-Grid Clutter) */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF6F0]/82 dark:bg-[#141311]/85 border-b border-stone-300/70 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3.5 pb-2 flex flex-wrap items-center justify-between gap-4">
            {/* Brand Identity */}
            <div className="flex items-center gap-3">
              <span className="seal-stamp-solid text-xs">内经</span>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h1 className="text-lg sm:text-xl font-serif font-bold tracking-wide text-stone-950 dark:text-amber-50">
                  本草与经络 · The Neijing Scholar
                </h1>
                <span className="hidden lg:inline text-xs font-mono text-stone-500 dark:text-stone-400">
                  TCM Interactive Learning & Lab Platform
                </span>
              </div>
            </div>

            {/* Right Controls: Progress + Search + Language + Bookmarks + Theme */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* Minimalist Progress Indicator */}
              <button
                onClick={() => setActiveTab('media-vault')}
                className="hidden xl:inline-flex items-center gap-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition"
                title="View Guided Curriculum Progress"
              >
                <Award className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-emerald-400" />
                <span className="font-mono">
                  PATH <strong>{completedChapters.length}/5</strong>
                </span>
                <div className="w-14 h-1 bg-stone-300 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-[#2D6A4F] transition-all duration-300"
                    style={{ width: `${(completedChapters.length / 5) * 100}%` }}
                  />
                </div>
              </button>

              {/* Minimal Underline Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-0 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 肝, ST36, 逍遥散..."
                  className="pl-5 pr-5 py-1 border-b border-stone-400 dark:border-stone-700 bg-transparent text-xs w-40 sm:w-52 focus:outline-none focus:border-[#B91C1C] transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Instant Search Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FAF6F0] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-xl divide-y divide-stone-200 dark:divide-stone-800 z-50">
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveTab(res.tab);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-amber-900/6 dark:hover:bg-stone-800 transition flex items-start justify-between gap-2"
                      >
                        <div>
                          <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                            {res.title}
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {res.subtitle}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#B91C1C] dark:text-amber-400 shrink-0">
                          {res.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clean Text Language Switcher */}
              <div className="inline-flex items-center gap-2 font-mono">
                {(
                  [
                    { id: 'dual', label: '双语' },
                    { id: 'en', label: 'EN' },
                    { id: 'zh', label: '中文' }
                  ] as const
                ).map((mode, idx) => (
                  <React.Fragment key={mode.id}>
                    {idx > 0 && <span className="text-stone-300 dark:text-stone-700">/</span>}
                    <button
                      onClick={() => setLang(mode.id)}
                      className={`pb-0.5 transition ${
                        lang === mode.id
                          ? 'text-[#B91C1C] dark:text-amber-400 font-bold border-b-2 border-[#B91C1C] dark:border-amber-400'
                          : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Bookmark Link */}
              <button
                onClick={() => setActiveTab('media-vault')}
                className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-[#B91C1C] transition"
                title="Saved Bookmarks & Study Notes"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#B91C1C] dark:text-amber-400" />
                <span className="font-mono">({bookmarks.length})</span>
              </button>

              {/* Theme Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-stone-600 dark:text-amber-300 hover:text-stone-950 transition"
                aria-label="Toggle Light / Dark Mode"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Single Clean Horizontal Underline Tab Bar (Google Skills Style) */}
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`py-2.5 text-left whitespace-nowrap border-b-2 transition-colors flex items-baseline gap-2 ${
                    isActive
                      ? 'border-[#B91C1C] dark:border-amber-400 text-stone-950 dark:text-amber-50'
                      : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono ${
                      isActive ? 'text-[#B91C1C] dark:text-amber-400 font-bold' : 'opacity-60'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="font-serif font-bold text-sm">{item.labelZh}</span>
                  {lang !== 'zh' && (
                    <span className="text-xs font-sans hidden md:inline opacity-80">
                      {item.labelEn}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Main Open-Canvas Content Workspace */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {activeTab === 'foundations' && (
            <FoundationsModule
              lang={lang}
              bookmarks={bookmarks.map((b) => b.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'meridians' && (
            <MeridiansModule
              lang={lang}
              bookmarks={bookmarks.map((b) => b.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'diagnostics' && (
            <DiagnosticsModule
              lang={lang}
              bookmarks={bookmarks.map((b) => b.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'materia-medica' && (
            <MateriaMedicaModule
              lang={lang}
              bookmarks={bookmarks.map((b) => b.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'media-vault' && (
            <CurriculumAndVaultModule
              lang={lang}
              completedChapters={completedChapters}
              onToggleChapterComplete={handleToggleChapterComplete}
              onNavigateModule={(mod) => setActiveTab(mod)}
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </main>

        {/* Minimalist Hairline Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-stone-300/70 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-3">
            <span className="seal-stamp">杏林实训</span>
            <span>
              <strong>《本草与经络 · The Neijing Scholar》</strong> — Interactive Traditional Chinese Medicine Learning & Lab Platform
            </span>
          </div>
          <div className="font-serif">
            据《黄帝内经》《针灸甲乙经》《伤寒杂病论》《神农本草经》考订
          </div>
        </footer>
      </div>
    </div>
  );
}
