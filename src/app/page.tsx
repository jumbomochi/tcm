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
  Compass,
  Stethoscope,
  Leaf,
  GraduationCap,
  Search,
  Moon,
  Sun,
  Languages,
  Bookmark,
  Sparkles,
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
    labelZh: string;
    labelEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'foundations',
      labelZh: '基础理论 · 五行藏象',
      labelEn: 'Foundations & Qi Clock',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'meridians',
      labelZh: '经络穴位 · 2D/3D铜人',
      labelEn: '2D/3D Meridians & Points',
      icon: <Compass className="w-4 h-4" />
    },
    {
      id: 'diagnostics',
      labelZh: '四诊辨证 · 舌脉沙盒',
      labelEn: 'Tongue, Pulse & Sandbox',
      icon: <Stethoscope className="w-4 h-4" />
    },
    {
      id: 'materia-medica',
      labelZh: '本草方剂 · 君臣佐使',
      labelEn: 'Herbs & Formula Builder',
      icon: <Leaf className="w-4 h-4" />
    },
    {
      id: 'media-vault',
      labelZh: '导学图谱 · 视频与笔记',
      labelEn: 'Curriculum, Graph & Vault',
      icon: <GraduationCap className="w-4 h-4" />
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#121316] text-stone-900 dark:text-stone-100 transition-colors">
        {/* Top Classical Apothecary Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF6F0]/90 dark:bg-[#121316]/90 border-b border-amber-900/20 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Brand Identity with Vermilion Seal (印章) */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-800 text-amber-50 flex flex-col items-center justify-center font-serif font-bold text-xs leading-tight shadow-sm border border-red-950 select-none">
                  <span>内经</span>
                  <span>本草</span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-serif font-bold tracking-wide text-stone-900 dark:text-amber-100">
                    本草与经络 · The Neijing Scholar
                  </h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Bilingual Interactive Traditional Chinese Medicine (中医) Systems Explorer
                  </p>
                </div>
              </div>

              {/* Global Search + Language Mode + Dark Mode */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Global Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 肝, ST36, 逍遥散, Qi..."
                    className="pl-9 pr-7 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-900 text-xs w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Instant Search Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-xl p-2 z-50 space-y-1">
                      {searchResults.map((res, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveTab(res.tab);
                            setSearchQuery('');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-800 transition flex items-start justify-between gap-2"
                        >
                          <div>
                            <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                              {res.title}
                            </div>
                            <div className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                              {res.subtitle}
                            </div>
                          </div>
                          <span className="shrink-0 px-2 py-0.5 rounded bg-amber-900/10 text-amber-900 dark:text-amber-300 text-[10px] font-mono">
                            {res.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bilingual Language Switcher */}
                <div className="flex items-center bg-stone-200/80 dark:bg-stone-800 p-1 rounded-xl text-xs">
                  <Languages className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400 mx-1.5" />
                  {(
                    [
                      { id: 'dual', label: '中英双语' },
                      { id: 'en', label: 'EN' },
                      { id: 'zh', label: '中文' }
                    ] as const
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setLang(mode.id)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        lang === mode.id
                          ? 'bg-red-800 text-amber-50 shadow-2xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-300/60 dark:hover:bg-stone-700'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* Bookmark Count Quick Jump */}
                <button
                  onClick={() => setActiveTab('media-vault')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900 text-xs font-medium hover:bg-amber-50 dark:hover:bg-stone-800 transition"
                  title="View Saved Bookmarks & Notes"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-700" />
                  <span>{bookmarks.length}</span>
                </button>

                {/* Theme Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900 text-stone-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-stone-800 transition"
                  aria-label="Toggle Rice-Paper Light / Inkstone Dark Mode"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Module Navigation Bar */}
            <nav className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                      isActive
                        ? 'bg-stone-900 text-amber-100 border-stone-900 dark:bg-amber-500 dark:text-stone-950 dark:border-amber-500 shadow-xs'
                        : 'bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-amber-50/80 dark:hover:bg-stone-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.labelZh}</span>
                    {lang !== 'zh' && (
                      <span className="font-sans font-normal text-xs opacity-80 hidden md:inline">
                        · {item.labelEn}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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

        {/* Classical Apothecary Footer */}
        <footer className="border-t border-amber-900/15 dark:border-stone-800 mt-16 py-8 px-4 sm:px-6 text-center text-xs text-stone-500 dark:text-stone-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-serif">
              <strong>本草与经络 · The Neijing Scholar</strong> — Bilingual Interactive TCM Systems Explorer
            </div>
            <div>
              For educational & classical scholarship exploration of《黄帝内经》《伤寒杂病论》《神农本草经》.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
