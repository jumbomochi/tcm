'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LanguageMode } from '@/types/tcm';
import FoundationsModule from '@/components/FoundationsModule';
import MeridiansModule from '@/components/MeridiansModule';
import DiagnosticsModule from '@/components/DiagnosticsModule';
import MateriaMedicaModule from '@/components/MateriaMedicaModule';
import CurriculumAndVaultModule, {
  SavedBookmark,
  StudyNote
} from '@/components/CurriculumAndVaultModule';
import WelcomeSplash from '@/components/WelcomeSplash';
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
  X,
  Menu
} from 'lucide-react';

type ActiveTab =
  | 'foundations'
  | 'meridians'
  | 'diagnostics'
  | 'materia-medica'
  | 'media-vault';

const VALID_TABS: ActiveTab[] = [
  'foundations',
  'meridians',
  'diagnostics',
  'materia-medica',
  'media-vault'
];

export default function HomePage() {
  const [activeTab, setActiveTabState] = useState<ActiveTab>('foundations');
  const [lang, setLang] = useState<LanguageMode>('dual');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
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

  // Navigate to a tab and sync ?m= in the browser URL so links are shareable and survive refresh
  const setActiveTab = useCallback((tab: ActiveTab) => {
    setActiveTabState(tab);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('m', tab);
      window.history.pushState({ tab }, '', url.toString());
    }
  }, []);

  const handleEnterFromSplash = useCallback(
    (targetTab?: ActiveTab) => {
      setShowSplash(false);
      try {
        localStorage.setItem('tcm_visited_splash', 'true');
      } catch {}
      if (targetTab) {
        setActiveTab(targetTab);
      }
    },
    [setActiveTab]
  );

  // Sync URL query param (?m=...) and saved localStorage on mount & browser back/forward
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasExplicitModuleParam = params.has('m');
    const forceSplash = params.get('splash') === '1';

    const syncFromUrl = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const mParam = currentParams.get('m') as ActiveTab | 'curriculum' | null;
      if (mParam === 'curriculum') {
        setActiveTabState('media-vault');
      } else if (mParam && VALID_TABS.includes(mParam)) {
        setActiveTabState(mParam);
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);

    try {
      const hasVisitedSplash = localStorage.getItem('tcm_visited_splash');
      if (forceSplash || (!hasVisitedSplash && !hasExplicitModuleParam)) {
        setShowSplash(true);
      }
      const savedBookmarks = localStorage.getItem('tcm_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      const savedChapters = localStorage.getItem('tcm_chapters');
      if (savedChapters) setCompletedChapters(JSON.parse(savedChapters));
      const savedNotes = localStorage.getItem('tcm_notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      const savedDark = localStorage.getItem('tcm_dark_mode');
      if (savedDark === 'true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch {
      // ignore storage errors
    }

    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // Apply .dark class directly to <html> so <body> and all Tailwind v4 dark: classes respond
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('tcm_dark_mode', String(darkMode));
    } catch {}
  }, [darkMode]);

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

  // Concise tab titles so all 5 modules fit cleanly across the viewport without clipping
  const navItems: {
    id: ActiveTab;
    num: string;
    labelZh: string;
    labelEn: string;
  }[] = [
    {
      id: 'foundations',
      num: '01',
      labelZh: '阴阳五行',
      labelEn: 'Foundations'
    },
    {
      id: 'meridians',
      num: '02',
      labelZh: '经络铜人',
      labelEn: 'Meridians Lab'
    },
    {
      id: 'diagnostics',
      num: '03',
      labelZh: '四诊辨证',
      labelEn: 'Diagnostics'
    },
    {
      id: 'materia-medica',
      num: '04',
      labelZh: '本草方剂',
      labelEn: 'Materia Medica'
    },
    {
      id: 'media-vault',
      num: '05',
      labelZh: '导学讲堂',
      labelEn: 'Curriculum & Vault'
    }
  ];

  return (
    <div className="relative isolate min-h-screen text-stone-900 dark:text-stone-100 transition-colors selection:bg-amber-900/20">
      {/* First-Time Visitor Frontispiece Splash Page (展卷入杏林) */}
      {showSplash && (
        <WelcomeSplash
          lang={lang}
          onSelectLang={setLang}
          onEnter={handleEnterFromSplash}
        />
      )}

      {/* Full-Page Fixed Classical Ink-Wash Landscape Background with Soft Vertical Gradient Fade */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden shanshui-backdrop">
        <img
          src="/images/shanshui_bg.jpg"
          alt=""
          className="w-full h-full object-cover object-top opacity-90 dark:opacity-25 dark:invert transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/45 via-[#FAF6F0]/72 to-[#FAF6F0]/92 dark:from-[#121110]/75 dark:via-[#121110]/88 dark:to-[#121110]/96" />
      </div>

      {/* Minimalist Top Bar + Integrated Underline Tab Strip */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF6F0]/88 dark:bg-[#141311]/90 border-b border-stone-300/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Identity (Click to Reopen Welcome Frontispiece) */}
          <button
            onClick={() => setShowSplash(true)}
            title="Open Welcome Frontispiece · 展卷扉页"
            className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-85 transition cursor-pointer"
          >
            <span className="seal-stamp-solid text-xs">内经</span>
            <h1 className="text-base sm:text-xl font-serif font-bold tracking-wide text-stone-950 dark:text-amber-50 truncate">
              本草与经络 <span className="hidden sm:inline">· The Neijing Scholar</span>
            </h1>
          </button>

          {/* Right Controls: Search + Desktop Controls + Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs">
            {/* Self-Explanatory Curriculum Progress Indicator (Desktop) */}
            <button
              onClick={() => setActiveTab('media-vault')}
              className="hidden xl:inline-flex items-center gap-2 min-h-[40px] px-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition"
              title="Open 5-Chapter Guided Curriculum"
            >
              <Award className="w-4 h-4 text-[#2D6A4F] dark:text-emerald-400" />
              <span className="font-sans font-medium">
                Curriculum: <strong>{completedChapters.length}/5 Chapters</strong>
              </span>
              <div className="w-14 h-1.5 bg-stone-300 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-[#2D6A4F] transition-all duration-300"
                  style={{ width: `${(completedChapters.length / 5) * 100}%` }}
                />
              </div>
            </button>

            {/* Minimal Underline Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-500 absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 肝, ST36, 逍遥散..."
                className="pl-6 pr-6 py-2 min-h-[40px] border-b border-stone-400 dark:border-stone-700 bg-transparent text-xs w-36 sm:w-52 focus:outline-none focus:border-[#B91C1C] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
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
                      className="w-full text-left px-4 py-3 hover:bg-amber-900/6 dark:hover:bg-stone-800 transition flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                          {res.title}
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1 mt-0.5">
                          {res.subtitle}
                        </div>
                      </div>
                      <span className="text-xs font-sans font-semibold text-[#B91C1C] dark:text-amber-400 shrink-0">
                        {res.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Language Switcher, Bookmarks & Dark Mode (Hidden on small mobile to prevent wrapping) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 font-sans font-semibold">
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
                      className={`px-2 py-2 min-h-[40px] transition ${
                        lang === mode.id
                          ? 'text-[#B91C1C] dark:text-amber-400 font-bold border-b-2 border-[#B91C1C] dark:border-amber-400'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('media-vault')}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[40px] text-stone-700 dark:text-stone-300 hover:text-[#B91C1C] transition"
                title="Saved Bookmarks & Study Notes"
              >
                <Bookmark className="w-4 h-4 text-[#B91C1C] dark:text-amber-400" />
                <span className="font-sans font-semibold">({bookmarks.length})</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="inline-flex items-center justify-center w-10 h-10 text-stone-700 dark:text-amber-300 hover:text-stone-950 dark:hover:text-white transition"
                aria-label="Toggle Light / Dark Mode"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Controls Menu Toggle (< md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-md"
              aria-label="Open Settings & Language Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Drawer for Language, Theme, Curriculum & Bookmarks */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-3 bg-[#FAF6F0] dark:bg-stone-900 border-t border-stone-300/70 dark:border-stone-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-stone-700 dark:text-stone-300">
                语言模式 · Language:
              </span>
              <div className="inline-flex items-center gap-2">
                {(
                  [
                    { id: 'dual', label: '双语 Dual' },
                    { id: 'en', label: 'English' },
                    { id: 'zh', label: '中文' }
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setLang(mode.id)}
                    className={`px-3 py-2 min-h-[40px] rounded-md border font-semibold ${
                      lang === mode.id
                        ? 'border-[#B91C1C] bg-[#B91C1C] text-white'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setActiveTab('media-vault')}
                className="inline-flex items-center gap-2 min-h-[40px] text-stone-700 dark:text-stone-300 font-medium"
              >
                <Award className="w-4 h-4 text-[#2D6A4F]" />
                <span>Curriculum: {completedChapters.length}/5 Chapters</span>
                <span className="text-stone-400">·</span>
                <Bookmark className="w-4 h-4 text-[#B91C1C]" />
                <span>Saved ({bookmarks.length})</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="inline-flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-md border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-amber-300 font-semibold"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Single Clean Horizontal Underline Tab Bar — All 5 Tabs Fit Without Clipping */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 border-t border-stone-200/70 dark:border-stone-800/80">
          <nav
            aria-label="Learning Modules"
            className="grid grid-cols-5 sm:flex sm:items-center sm:justify-between md:justify-start md:gap-8 overflow-x-auto"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={`${item.num} ${item.labelZh} · ${item.labelEn}`}
                  className={`py-2.5 px-1.5 sm:px-2 min-h-[44px] text-center sm:text-left border-b-2 transition-colors flex flex-col sm:flex-row sm:items-baseline justify-center sm:gap-2 ${
                    isActive
                      ? 'border-[#B91C1C] dark:border-amber-400 text-stone-950 dark:text-amber-50'
                      : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-200'
                  }`}
                >
                  <span
                    className={`text-xs font-sans font-bold ${
                      isActive ? 'text-[#B91C1C] dark:text-amber-400' : 'opacity-65'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="font-serif font-bold text-xs sm:text-sm leading-tight">
                    {item.labelZh}
                  </span>
                  {lang !== 'zh' && (
                    <span className="text-xs font-sans hidden lg:inline opacity-85">
                      {item.labelEn}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Open-Canvas Content Workspace */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
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
      <footer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-stone-300/70 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 dark:text-stone-400">
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
  );
}
