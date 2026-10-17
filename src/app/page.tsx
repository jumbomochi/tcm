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
    volZh: string;
    labelZh: string;
    labelEn: string;
  }[] = [
    {
      id: 'foundations',
      volZh: '卷一',
      labelZh: '阴阳藏象 · 子午流注',
      labelEn: 'I. Foundations & Qi Clock'
    },
    {
      id: 'meridians',
      volZh: '卷二',
      labelZh: '经络铜人 · 骨度取穴',
      labelEn: 'II. 2D/3D Meridian & Acupoint Atlas'
    },
    {
      id: 'diagnostics',
      volZh: '卷三',
      labelZh: '四诊合参 · 舌脉辨证',
      labelEn: 'III. Tongue, Pulse & Pattern Sandbox'
    },
    {
      id: 'materia-medica',
      volZh: '卷四',
      labelZh: '本草饮片 · 君臣佐使',
      labelEn: 'IV. Materia Medica & Formula Architecture'
    },
    {
      id: 'media-vault',
      volZh: '卷五',
      labelZh: '五章导学 · 名师讲堂',
      labelEn: 'V. Curriculum, Graph & Lecture Theater'
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F7F2E7] dark:bg-[#131311] text-stone-900 dark:text-stone-100 transition-colors">
        {/* Top Classical Woodblock Compendium Masthead */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F7F2E7]/95 dark:bg-[#131311]/95 border-b-2 border-stone-800 dark:border-stone-700">
          <div className="border-b border-stone-400/60 dark:border-stone-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
              {/* Brand Identity with Carved Vermilion Seal (朱文印章) */}
              <div className="flex items-center gap-3.5">
                <div className="seal-stamp-solid px-2 py-1.5 text-xs flex flex-col items-center justify-center leading-tight select-none">
                  <span>内经</span>
                  <span>图考</span>
                </div>
                <div className="border-l border-stone-400 dark:border-stone-700 pl-3.5">
                  <div className="flex items-baseline gap-2.5">
                    <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-stone-950 dark:text-amber-100">
                      本草与经络
                    </h1>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#9E2A2B] dark:text-amber-400">
                      THE NEIJING SCHOLAR
                    </span>
                  </div>
                  <p className="text-[11px] font-serif text-stone-600 dark:text-stone-400">
                    中英对照传统医学图谱 · Bilingual Classical Chinese Medicine Atlas & Interactive Compendium
                  </p>
                </div>
              </div>

              {/* Global Search + Language Mode + Dark Mode */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Global Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="检索 肝, ST36, 逍遥散, Qi..."
                    className="pl-8 pr-7 py-1 border border-stone-500 dark:border-stone-600 bg-[#FAF6F0] dark:bg-stone-900 text-xs w-44 sm:w-60 font-serif focus:outline-none focus:border-[#9E2A2B]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Instant Search Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute right-0 mt-1 w-80 sm:w-96 bg-[#FAF6F0] dark:bg-stone-900 border-2 border-stone-800 dark:border-stone-600 shadow-xl divide-y divide-stone-300 dark:divide-stone-800 z-50">
                      {searchResults.map((res, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveTab(res.tab);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-[#EFE6D5] dark:hover:bg-stone-800 transition flex items-start justify-between gap-2"
                        >
                          <div>
                            <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                              {res.title}
                            </div>
                            <div className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-1">
                              {res.subtitle}
                            </div>
                          </div>
                          <span className="seal-stamp px-1.5 py-0.5 text-[10px] shrink-0">
                            {res.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bilingual Language Switcher */}
                <div className="inline-flex border border-stone-600 dark:border-stone-600 divide-x divide-stone-600 text-xs font-serif">
                  {(
                    [
                      { id: 'dual', label: '双语对照' },
                      { id: 'en', label: 'EN' },
                      { id: 'zh', label: '純中文' }
                    ] as const
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setLang(mode.id)}
                      className={`px-2.5 py-1 transition ${
                        lang === mode.id
                          ? 'bg-[#9E2A2B] text-[#FAF6F0] font-bold'
                          : 'bg-[#FAF6F0] dark:bg-stone-900 text-stone-800 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* Bookmark Count Quick Jump */}
                <button
                  onClick={() => setActiveTab('media-vault')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-stone-600 bg-[#FAF6F0] dark:bg-stone-900 text-xs font-serif hover:bg-[#EFE6D5] dark:hover:bg-stone-800 transition"
                  title="藏书笺 · View Saved Bookmarks & Notes"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#9E2A2B]" />
                  <span>书签 ({bookmarks.length})</span>
                </button>

                {/* Theme Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-2 py-1 border border-stone-600 bg-[#FAF6F0] dark:bg-stone-900 text-stone-800 dark:text-amber-300 hover:bg-[#EFE6D5] dark:hover:bg-stone-800 transition text-xs font-serif flex items-center gap-1"
                  aria-label="Toggle Rice-Paper Light / Inkstone Dark Mode"
                >
                  {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{darkMode ? '宣纸昼读' : '端砚夜读'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Classical Five-Volume Folio Index Bar (五卷目录) */}
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-stone-400/70 dark:divide-stone-800 border-x border-stone-400/70 dark:border-stone-800">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2.5 text-left transition relative group ${
                    isActive
                      ? 'bg-[#231F1C] text-[#FAF6F0] dark:bg-amber-950/70 dark:text-amber-100'
                      : 'bg-transparent text-stone-800 dark:text-stone-300 hover:bg-[#EDE3CE]/70 dark:hover:bg-stone-900'
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-[#9E2A2B]" />
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-[10px] font-serif tracking-widest px-1.5 py-0.2 border ${
                        isActive
                          ? 'border-[#9E2A2B] bg-[#9E2A2B] text-white'
                          : 'border-stone-500 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {item.volZh}
                    </span>
                    <span className="text-[10px] font-mono opacity-65">❖</span>
                  </div>
                  <div className="font-serif font-bold text-xs sm:text-sm mt-1 tracking-wide">
                    {item.labelZh}
                  </div>
                  {lang !== 'zh' && (
                    <div
                      className={`text-[11px] truncate ${
                        isActive ? 'text-amber-200/90' : 'text-stone-500 dark:text-stone-400'
                      }`}
                    >
                      {item.labelEn}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
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

        {/* Classical Woodblock Colophon Footer (牌记 / 跋尾) */}
        <footer className="border-t-2 border-stone-800 dark:border-stone-700 mt-16 py-8 px-4 sm:px-6 text-xs text-stone-600 dark:text-stone-400 bg-[#EFE8D8]/60 dark:bg-stone-950">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-serif">
            <div className="flex items-center gap-3">
              <span className="seal-stamp px-2 py-0.5 text-[11px]">杏林书斋</span>
              <span>
                <strong>《本草与经络 · The Neijing Scholar》</strong> — 传统中医学理法方穴交互图谱
              </span>
            </div>
            <div>
              据《黄帝内经》《针灸甲乙经》《伤寒杂病论》《神农本草经》编纂考订 · For Classical Scholarship & Educational Study
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
