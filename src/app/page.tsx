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
  Bookmark,
  Sparkles,
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
    trackBadge: string;
    labelZh: string;
    labelEn: string;
    meta: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'foundations',
      trackBadge: 'Path 01 · 卷一',
      labelZh: '阴阳五行与藏象',
      labelEn: 'Foundations & Qi Clock',
      meta: '3 Interactive Labs · 20m',
      icon: <Compass className="w-4 h-4" />
    },
    {
      id: 'meridians',
      trackBadge: 'Path 02 · 卷二',
      labelZh: '3D 铜人经络与骨度取穴',
      labelEn: '2D/3D Meridians Lab',
      meta: '3D Bronze Statue · 25m',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'diagnostics',
      trackBadge: 'Path 03 · 卷三',
      labelZh: '四诊八纲辨证沙盒',
      labelEn: 'Diagnostics & Case Lab',
      meta: 'Clinical Sandbox · 20m',
      icon: <Stethoscope className="w-4 h-4" />
    },
    {
      id: 'materia-medica',
      trackBadge: 'Path 04 · 卷四',
      labelZh: '本草饮片与君臣佐使',
      labelEn: 'Materia Medica & Formulas',
      meta: 'Pharmacopeia Lab · 20m',
      icon: <Leaf className="w-4 h-4" />
    },
    {
      id: 'media-vault',
      trackBadge: 'Path 05 · 卷五',
      labelZh: '五章导学与名师讲堂',
      labelEn: 'Curriculum & Video Labs',
      meta: '8 University Courses',
      icon: <GraduationCap className="w-4 h-4" />
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
            className="w-full h-full object-cover object-center scale-[1.02] opacity-85 dark:opacity-25 dark:invert transition-opacity duration-500"
          />
          {/* Atmospheric Veil so translucent frosted cards pop with crisp legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/55 via-[#FAF6F0]/72 to-[#F5EFE6]/82 dark:from-[#121110]/82 dark:via-[#141311]/88 dark:to-[#121110]/94" />
        </div>

        {/* Google Skills-Style Floating Frosted Top App Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FAF6F0]/78 dark:bg-[#141311]/82 border-b border-stone-300/60 dark:border-stone-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            {/* Brand Identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B91C1C] to-[#881313] text-[#FAF6F0] font-serif font-bold text-xs flex flex-col items-center justify-center leading-tight shadow-sm select-none">
                <span>本草</span>
                <span>经络</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-serif font-bold tracking-wide text-stone-950 dark:text-amber-50">
                    本草与经络 · The Neijing Scholar
                  </h1>
                  <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-900/10 dark:bg-amber-400/15 text-amber-900 dark:text-amber-300 text-[11px] font-medium">
                    Interactive Learning & Lab Suite
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  中英双语传统医学交互实训平台 · Guided Paths, 3D Meridians & Clinical Sandboxes
                </p>
              </div>
            </div>

            {/* Right Controls: Learning Progress Pill + Search + Language + Bookmarks + Theme */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Google Skills-Style Skill Badge / Progress Pill */}
              <button
                onClick={() => setActiveTab('media-vault')}
                className="hidden xl:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-stone-900/90 border border-stone-300/70 dark:border-stone-700/80 shadow-2xs hover:border-amber-700/50 transition text-xs"
                title="View Guided Curriculum Progress"
              >
                <Award className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  Skill Path: <strong>{completedChapters.length}/5</strong>
                </span>
                <div className="w-16 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-[#2D6A4F] rounded-full transition-all duration-300"
                    style={{ width: `${(completedChapters.length / 5) * 100}%` }}
                  />
                </div>
              </button>

              {/* Rounded Pill Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 肝, ST36, 逍遥散, Qi..."
                  className="pl-9 pr-8 py-1.5 rounded-full border border-stone-300/80 dark:border-stone-700 bg-white/85 dark:bg-stone-900/90 text-xs w-44 sm:w-60 focus:outline-none focus:ring-2 focus:ring-amber-700/30 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Instant Search Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-[24px] bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200 dark:border-stone-700 shadow-2xl divide-y divide-stone-200/70 dark:divide-stone-800 overflow-hidden z-50">
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveTab(res.tab);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-amber-900/6 dark:hover:bg-stone-800 transition flex items-start justify-between gap-2"
                      >
                        <div>
                          <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                            {res.title}
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {res.subtitle}
                          </div>
                        </div>
                        <span className="seal-stamp text-[10px] shrink-0">
                          {res.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Material 3 Segmented Pill Language Switcher */}
              <div className="inline-flex p-0.5 rounded-full bg-stone-200/75 dark:bg-stone-800/90 border border-stone-300/60 dark:border-stone-700 text-xs">
                {(
                  [
                    { id: 'dual', label: '双语 Bilingual' },
                    { id: 'en', label: 'EN' },
                    { id: 'zh', label: '中文' }
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setLang(mode.id)}
                    className={`px-3 py-1 rounded-full font-medium transition ${
                      lang === mode.id
                        ? 'bg-[#B91C1C] text-white shadow-2xs'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Bookmark Pill */}
              <button
                onClick={() => setActiveTab('media-vault')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-stone-900/90 border border-stone-300/70 dark:border-stone-700 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                title="Saved Bookmarks & Study Notes"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#B91C1C] dark:text-amber-400" />
                <span>Saved ({bookmarks.length})</span>
              </button>

              {/* Theme Mode Toggle Pill */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-white/85 dark:bg-stone-900/90 border border-stone-300/70 dark:border-stone-700 text-stone-700 dark:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                aria-label="Toggle Light / Dark Mode"
                title={darkMode ? 'Switch to Rice-Paper Light Mode' : 'Switch to Inkstone Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Google Skills Learning Path Track Selector Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <nav className="skills-surface p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 rounded-[22px] text-left transition-all flex flex-col justify-between gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#231F1C] to-[#362F2A] text-[#FAF6F0] dark:from-amber-900/80 dark:to-stone-900 shadow-md'
                      : 'bg-transparent text-stone-800 dark:text-stone-300 hover:bg-stone-900/5 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#B91C1C] text-white font-semibold'
                          : 'bg-amber-900/10 dark:bg-stone-800 text-amber-900 dark:text-amber-300'
                      }`}
                    >
                      {item.trackBadge}
                    </span>
                    <span className={isActive ? 'text-amber-300' : 'text-stone-500'}>
                      {item.icon}
                    </span>
                  </div>

                  <div>
                    <div className="font-serif font-bold text-sm leading-snug">
                      {item.labelZh}
                    </div>
                    {lang !== 'zh' && (
                      <div
                        className={`text-xs truncate ${
                          isActive ? 'text-amber-100/90' : 'text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        {item.labelEn}
                      </div>
                    )}
                  </div>

                  <div
                    className={`text-[10px] font-mono pt-1 border-t ${
                      isActive
                        ? 'border-white/15 text-amber-200/80'
                        : 'border-stone-300/50 dark:border-stone-800 text-stone-500'
                    }`}
                  >
                    {item.meta}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Workspace */}
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

        {/* Airy Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-4">
          <div className="skills-surface px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <span className="seal-stamp">杏林实训</span>
              <span>
                <strong>《本草与经络 · The Neijing Scholar》</strong> — Interactive Traditional Chinese Medicine Learning & Lab Platform
              </span>
            </div>
            <div className="font-serif">
              据《黄帝内经》《针灸甲乙经》《伤寒杂病论》《神农本草经》考订 · Educational & Scholarly Reference
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
