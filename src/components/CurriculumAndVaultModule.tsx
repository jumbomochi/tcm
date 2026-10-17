'use client';

import React, { useState } from 'react';
import { LanguageMode } from '@/types/tcm';
import { CURRICULUM_CHAPTERS, CURATED_VIDEOS } from '@/data/curriculumAndMediaData';
import { renderProse } from './BilingualUi';
import {
  GraduationCap,
  Network,
  Video,
  CheckCircle2,
  Circle,
  ExternalLink,
  Plus,
  Trash2,
  StickyNote,
  Bookmark,
  HelpCircle,
  ArrowUpRight,
  Play,
  Tv
} from 'lucide-react';

export interface SavedBookmark {
  id: string;
  title: string;
  category: string;
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface CurriculumAndVaultModuleProps {
  lang: LanguageMode;
  completedChapters: string[];
  onToggleChapterComplete: (chapterId: string) => void;
  onNavigateModule: (mod: 'foundations' | 'meridians' | 'diagnostics' | 'materia-medica' | 'media-vault') => void;
  bookmarks: SavedBookmark[];
  onRemoveBookmark: (id: string) => void;
  notes: StudyNote[];
  onAddNote: (title: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

interface GraphNode {
  id: string;
  labelZh: string;
  labelEn: string;
  category: 'Element' | 'Organ' | 'Pattern' | 'Acupoint' | 'Formula';
  x: number;
  y: number;
  color: string;
  summaryEn: string;
  summaryZh: string;
  targetModule: 'foundations' | 'meridians' | 'diagnostics' | 'materia-medica';
}

const KNOWLEDGE_GRAPH_NODES: GraphNode[] = [
  {
    id: 'wood-liver',
    labelZh: '木 · 肝主疏泄',
    labelEn: 'Wood · Liver System',
    category: 'Organ',
    x: 120,
    y: 95,
    color: '#2D6A4F',
    summaryEn: 'Liver Wood courses Qi smoothly across the body, stores Blood during sleep, opens into the eyes, and governs sinews.',
    summaryZh: '肝属木，主疏泄而藏血，喜条达而恶抑郁，在体合筋，开窍于目。',
    targetModule: 'foundations'
  },
  {
    id: 'earth-spleen',
    labelZh: '土 · 脾主运化',
    labelEn: 'Earth · Spleen System',
    category: 'Organ',
    x: 360,
    y: 95,
    color: '#D97706',
    summaryEn: 'Spleen Earth is the Post-Natal Root (后天之本) that transforms food into Gu Qi and prevents internal Dampness.',
    summaryZh: '脾属土，为后天之本、气血生化之源，主运化水谷与水湿，主升清统血。',
    targetModule: 'foundations'
  },
  {
    id: 'water-kidney',
    labelZh: '水 · 肾藏精',
    labelEn: 'Water · Kidney System',
    category: 'Organ',
    x: 590,
    y: 95,
    color: '#1E3A8A',
    summaryEn: 'Kidney Water is the Pre-Natal Root (先天之本), storing Jing (Essence), governing bones/marrow, and housing Mingmen Fire.',
    summaryZh: '肾属水，为先天之本，藏真阴而寓命门真火，主骨生髓通于脑。',
    targetModule: 'foundations'
  },
  {
    id: 'pat-wood-earth',
    labelZh: '肝郁脾虚证 (木乘土)',
    labelEn: 'Liver Invading Spleen',
    category: 'Pattern',
    x: 240,
    y: 215,
    color: '#B45309',
    summaryEn: 'Stress constrains Liver Qi, which bullies the Spleen—causing sighing, rib distension, bloating, scalloped tongue, and wiry pulse.',
    summaryZh: '情志不遂致肝气横逆犯脾，见胸胁胀满、善太息、食后腹胀便溏、舌有齿痕、脉弦。',
    targetModule: 'diagnostics'
  },
  {
    id: 'pat-kidney-yin',
    labelZh: '肝肾阴虚火旺证',
    labelEn: 'Kidney Yin Deficiency Fire',
    category: 'Pattern',
    x: 530,
    y: 215,
    color: '#991B1B',
    summaryEn: 'Depleted Kidney Water fails to anchor Yang and nourish Liver Wood, causing sore lower back, tinnitus, night sweats, and peeled red tongue.',
    summaryZh: '水不涵木、阴虚火旺，见腰膝酸软、耳鸣盗汗、五心烦热、舌红少苔、脉细数。',
    targetModule: 'diagnostics'
  },
  {
    id: 'acu-lr3-st36',
    labelZh: '太冲 (LR3) + 足三里 (ST36)',
    labelEn: 'Taichong + Zusanli',
    category: 'Acupoint',
    x: 155,
    y: 335,
    color: '#047857',
    summaryEn: 'LR3 courses Liver Qi while ST36 fortifies Spleen & Stomach Earth—the classic acupoint pair for Wood-Earth disharmony.',
    summaryZh: '太冲疏肝理气解郁，足三里健脾和胃培土，合用平调肝脾气机。',
    targetModule: 'meridians'
  },
  {
    id: 'form-xiaoyao',
    labelZh: '逍遥散 / 四君子汤',
    labelEn: 'Xiao Yao San / Si Jun Zi',
    category: 'Formula',
    x: 345,
    y: 335,
    color: '#C83E31',
    summaryEn: 'Chai Hu courses Liver Qi, Dang Gui & Bai Shao nourish Liver Blood, and Bai Zhu & Fu Ling strengthen Spleen Earth.',
    summaryZh: '疏肝解郁、养血健脾，肝脾同调以解“木乘土”之困。',
    targetModule: 'materia-medica'
  },
  {
    id: 'form-liuwei',
    labelZh: '六味地黄丸 + 太溪/涌泉',
    labelEn: 'Liu Wei Di Huang Wan + KI1',
    category: 'Formula',
    x: 560,
    y: 335,
    color: '#4338CA',
    summaryEn: 'Three Tonifiers and Three Drainers enrich Kidney & Liver Yin while KI1 (Yongquan) guides unruly Empty Fire back to its source.',
    summaryZh: '三补三泻滋补肝肾真阴，配涌泉穴引火归元、交通心肾。',
    targetModule: 'materia-medica'
  }
];

const KNOWLEDGE_GRAPH_EDGES: [string, string, string][] = [
  ['wood-liver', 'earth-spleen', '木克土 Controls'],
  ['water-kidney', 'wood-liver', '水生木 Generates'],
  ['wood-liver', 'pat-wood-earth', '肝气横逆 Stagnates'],
  ['earth-spleen', 'pat-wood-earth', '脾虚受制 Weakened'],
  ['water-kidney', 'pat-kidney-yin', '真阴亏虚 Depleted'],
  ['pat-wood-earth', 'acu-lr3-st36', '针灸处方 Acupoints'],
  ['pat-wood-earth', 'form-xiaoyao', '方药主治 Formula'],
  ['pat-kidney-yin', 'form-liuwei', '滋阴降火 Formula']
];

export default function CurriculumAndVaultModule({
  lang,
  completedChapters,
  onToggleChapterComplete,
  onNavigateModule,
  bookmarks,
  onRemoveBookmark,
  notes,
  onAddNote,
  onDeleteNote
}: CurriculumAndVaultModuleProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CURRICULUM_CHAPTERS[0].id);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [selectedGraphNodeId, setSelectedGraphNodeId] = useState<string>('pat-wood-earth');
  const [activeVideoId, setActiveVideoId] = useState<string>(CURATED_VIDEOS[0].id);
  const [bilibiliPage, setBilibiliPage] = useState<number>(1);
  const [videoFilter, setVideoFilter] = useState<string>('ALL');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const activeChapter =
    CURRICULUM_CHAPTERS.find((c) => c.id === selectedChapterId) || CURRICULUM_CHAPTERS[0];
  const activeGraphNode =
    KNOWLEDGE_GRAPH_NODES.find((n) => n.id === selectedGraphNodeId) || KNOWLEDGE_GRAPH_NODES[0];
  const activeVideo =
    CURATED_VIDEOS.find((v) => v.id === activeVideoId) || CURATED_VIDEOS[0];
  const filteredVideos =
    videoFilter === 'ALL'
      ? CURATED_VIDEOS
      : CURATED_VIDEOS.filter((v) =>
          v.topicTag.toLowerCase().includes(videoFilter.toLowerCase())
        );
  const activeEmbedUrl =
    activeVideo.platform === 'Bilibili'
      ? `https://player.bilibili.com/player.html?bvid=${activeVideo.videoId}&page=${bilibiliPage}&high_quality=1&danmaku=0&autoplay=0`
      : activeVideo.embedUrl;
  const activeDirectUrl =
    activeVideo.platform === 'Bilibili' && bilibiliPage > 1
      ? `${activeVideo.watchUrl}?p=${bilibiliPage}`
      : activeVideo.watchUrl;

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    onAddNote(noteTitle.trim(), noteContent.trim());
    setNoteTitle('');
    setNoteContent('');
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: GUIDED 5-CHAPTER CURRICULUM & SELF-CHECK QUIZ */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-red-800 dark:text-amber-400" />
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Structured Learning Path · 循序渐进五章导学
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Guided TCM Mastery Curriculum ({completedChapters.length}/{CURRICULUM_CHAPTERS.length} Completed)
              </h2>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-stone-200 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-700 h-full transition-all duration-300"
              style={{
                width: `${(completedChapters.length / CURRICULUM_CHAPTERS.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Chapter Stepper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {CURRICULUM_CHAPTERS.map((ch) => {
            const isDone = completedChapters.includes(ch.id);
            const isSelected = ch.id === selectedChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterId(ch.id);
                  setSelectedQuizAnswer(null);
                }}
                className={`p-3.5 rounded-xl text-left border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FAF6F0] dark:bg-stone-800 border-2 border-red-800 dark:border-amber-400 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-amber-800 dark:text-amber-400 mb-1">
                  <span>CHAPTER 0{ch.chapterNumber}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-400" />
                  )}
                </div>
                <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  {ch.title.zh.split('：')[1] || ch.title.zh}
                </div>
                {lang !== 'zh' && (
                  <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                    {ch.title.en.replace(/^Ch \d:\s*/, '')}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details + Interactive Quiz */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/80 border border-amber-900/20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {activeChapter.title.zh}
                {lang !== 'zh' && (
                  <span className="block text-sm font-sans font-normal text-stone-600 dark:text-stone-300 mt-0.5">
                    {activeChapter.title.en}
                  </span>
                )}
              </h3>
              <button
                onClick={() => onToggleChapterComplete(activeChapter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  completedChapters.includes(activeChapter.id)
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 hover:bg-emerald-700 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedChapters.includes(activeChapter.id)
                    ? 'Completed (已掌握)'
                    : 'Mark Complete (标记完成)'}
                </span>
              </button>
            </div>

            {renderProse(lang, activeChapter.subtitleEn, activeChapter.subtitleZh)}

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                📌 Core Classical Takeaways (核心纲领)
              </div>
              {activeChapter.keyTakeaways.map((tk) => (
                <div
                  key={tk.zh}
                  className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700"
                >
                  <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {tk.zh}{' '}
                    <span className="text-xs font-mono font-normal text-amber-800 dark:text-amber-400">
                      ({tk.pinyin})
                    </span>
                  </div>
                  {lang !== 'zh' && (
                    <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      {tk.en}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigateModule(activeChapter.targetModule)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-800 text-amber-50 text-xs font-semibold hover:bg-red-900 transition shadow-xs"
              >
                <span>Open Interactive Lab for Chapter {activeChapter.chapterNumber}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chapter Quiz Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 dark:text-amber-400">
              <HelpCircle className="w-4 h-4" />
              <span>Chapter Mastery Check (随堂辨证问答)</span>
            </div>

            {renderProse(
              lang,
              activeChapter.quizQuestion.questionEn,
              activeChapter.quizQuestion.questionZh
            )}

            <div className="space-y-2">
              {activeChapter.quizQuestion.options.map((opt, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === activeChapter.quizQuestion.correctIndex;
                let btnStyle =
                  'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200';
                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle =
                      'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle =
                      'bg-red-50 dark:bg-red-950/50 border-red-600 text-red-950 dark:text-red-200';
                  }
                }
                return (
                  <button
                    key={opt.zh}
                    onClick={() => setSelectedQuizAnswer(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition ${btnStyle}`}
                  >
                    <div className="font-serif font-bold text-sm">{opt.zh}</div>
                    {lang !== 'zh' && <div className="opacity-85 mt-0.5">{opt.en}</div>}
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-800/30 text-xs space-y-1">
                <div className="font-bold text-amber-900 dark:text-amber-300">
                  {selectedQuizAnswer === activeChapter.quizQuestion.correctIndex
                    ? '✓ Correct! (回答正确)'
                    : '✗ Review Explanation (解析):'}
                </div>
                {renderProse(
                  lang,
                  activeChapter.quizQuestion.explanationEn,
                  activeChapter.quizQuestion.explanationZh
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE CONCEPT KNOWLEDGE GRAPH */}
      <section className="rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-4">
          <Network className="w-5 h-5 text-red-800 dark:text-amber-400" />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Systems Network · 中医理法方穴知识图谱
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Interactive Theory → Pattern → Acupoint & Formula Knowledge Graph
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 bg-[#FAF6F0] dark:bg-stone-950 rounded-2xl border border-amber-900/20 p-3 overflow-x-auto">
            <svg viewBox="0 0 720 410" className="w-full min-w-[540px] h-auto select-none">
              {/* Edges */}
              {KNOWLEDGE_GRAPH_EDGES.map(([fromId, toId, label]) => {
                const from = KNOWLEDGE_GRAPH_NODES.find((n) => n.id === fromId)!;
                const to = KNOWLEDGE_GRAPH_NODES.find((n) => n.id === toId)!;
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2;
                const active =
                  selectedGraphNodeId === fromId || selectedGraphNodeId === toId;
                return (
                  <g key={`${fromId}-${toId}`}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={active ? '#C83E31' : '#D6C7B2'}
                      strokeWidth={active ? 2.5 : 1.5}
                    />
                    <rect
                      x={mx - 42}
                      y={my - 9}
                      width="84"
                      height="16"
                      rx="4"
                      fill="#FAF6F0"
                      stroke="#D6C7B2"
                      strokeWidth="0.8"
                    />
                    <text
                      x={mx}
                      y={my + 2}
                      textAnchor="middle"
                      fill="#57534E"
                      className="text-[9px] font-mono"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {KNOWLEDGE_GRAPH_NODES.map((node) => {
                const isSelected = node.id === selectedGraphNodeId;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedGraphNodeId(node.id)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={node.x - 78}
                      y={node.y - 26}
                      width="156"
                      height="52"
                      rx="12"
                      fill={isSelected ? node.color : '#FFFFFF'}
                      stroke={node.color}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#1C1917'}
                      className="font-serif font-bold text-xs"
                    >
                      {node.labelZh}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 13}
                      textAnchor="middle"
                      fill={isSelected ? '#FEF3C7' : '#57534E'}
                      className="text-[10px] font-sans"
                    >
                      {node.labelEn}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3">
            <span
              className="inline-block px-2.5 py-0.5 rounded text-xs font-mono text-white"
              style={{ backgroundColor: activeGraphNode.color }}
            >
              {activeGraphNode.category} Node
            </span>
            <h4 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {activeGraphNode.labelZh}
              <span className="block text-sm font-sans font-normal text-stone-600 dark:text-stone-300">
                {activeGraphNode.labelEn}
              </span>
            </h4>
            {renderProse(lang, activeGraphNode.summaryEn, activeGraphNode.summaryZh)}
            <button
              onClick={() => onNavigateModule(activeGraphNode.targetModule)}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition flex items-center justify-center gap-1.5"
            >
              <span>Jump to {activeGraphNode.category} Interactive Module</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: RICH MEDIA LECTURE VAULT & PERSONAL STUDY NOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Curated Bilingual Video Lectures */}
        <section className="lg:col-span-7 rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-red-800 dark:text-amber-400" />
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Curated Bilingual Video & Visual Scroll Library (名师视频与古籍画卷)
                </h3>
                <p className="text-xs text-stone-500">
                  8 Verified University Courses (BUCM, CDUTCM, TUTCM, FJUTCM, Stanford, CMU) · In-App Player & Direct Links
                </p>
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'Foundations', 'Meridians', 'Diagnostics', 'Materia Medica', 'Formulas'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setVideoFilter(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                      videoFilter === tag
                        ? 'bg-red-800 text-amber-50'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {tag === 'ALL' ? 'All (8)' : tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Embedded Interactive Video Theater */}
          <div className="rounded-2xl overflow-hidden border-2 border-amber-900/30 dark:border-amber-500/30 bg-stone-950 shadow-md">
            <div className="px-4 py-2.5 bg-stone-900 text-stone-100 flex flex-wrap items-center justify-between gap-2 border-b border-stone-800">
              <div className="flex items-center gap-2 min-w-0">
                <Tv className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-serif font-bold truncate">
                  Now Playing: {activeVideo.titleZh}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono shrink-0">
                  {activeVideo.platform} · {activeVideo.videoId}
                </span>
              </div>
              <a
                href={activeDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 underline shrink-0"
              >
                <span>Open Direct Video ({activeVideo.videoId})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                key={`${activeVideo.id}-p${bilibiliPage}`}
                src={activeEmbedUrl}
                title={activeVideo.titleEn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              />
            </div>

            {/* Active Lecture Metadata & Multi-Episode Switcher for Bilibili University Courses */}
            <div className="p-4 bg-[#FAF6F0] dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-mono text-amber-800 dark:text-amber-400">
                    {activeVideo.institution} · {activeVideo.speaker}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {activeVideo.titleZh}
                  </h4>
                  {lang !== 'zh' && (
                    <p className="text-xs text-stone-700 dark:text-stone-300">
                      {activeVideo.titleEn}
                    </p>
                  )}
                </div>
                <a
                  href={activeDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-red-800 text-amber-50 text-xs font-semibold hover:bg-red-900 transition inline-flex items-center gap-1.5 shrink-0"
                >
                  <span>Watch on {activeVideo.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {activeVideo.platform === 'Bilibili' && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-stone-200/80 dark:border-stone-800">
                  <span className="text-[11px] font-mono text-stone-500 mr-1">
                    Episode Switcher ({activeVideo.episodesCount || activeVideo.duration}):
                  </span>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((ep) => (
                    <button
                      key={ep}
                      onClick={() => setBilibiliPage(ep)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                        bilibiliPage === ep
                          ? 'bg-red-800 text-white font-bold'
                          : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                      }`}
                    >
                      P{ep}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Curated Video Collection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredVideos.map((vid) => {
              const isPlaying = vid.id === activeVideo.id;
              return (
                <div
                  key={vid.id}
                  className={`rounded-xl overflow-hidden border transition flex flex-col justify-between ${
                    isPlaying
                      ? 'border-2 border-red-800 dark:border-amber-400 bg-[#FAF6F0] dark:bg-stone-800 shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:border-stone-400'
                  }`}
                >
                  <div>
                    <div
                      onClick={() => {
                        setActiveVideoId(vid.id);
                        setBilibiliPage(1);
                      }}
                      className="relative h-32 bg-stone-900 cursor-pointer group"
                    >
                      {vid.thumbnailIllustration && (
                        <img
                          src={vid.thumbnailIllustration}
                          alt={vid.titleEn}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-65 transition"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition ${
                            isPlaying
                              ? 'bg-emerald-700 text-white'
                              : 'bg-black/75 text-amber-100 group-hover:bg-red-800 group-hover:text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isPlaying ? 'Playing in Theater' : 'Play Lecture'}</span>
                        </span>
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-amber-200 text-[10px] font-mono">
                        {vid.topicTag}
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-red-800/95 text-white text-[10px] font-mono">
                        {vid.platform} · {vid.videoId}
                      </span>
                    </div>
                    <div className="p-3.5 space-y-1.5">
                      <div className="text-[10px] font-mono text-amber-800 dark:text-amber-400">
                        {vid.institution}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">
                        {vid.titleZh}
                      </h4>
                      {lang !== 'zh' && (
                        <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
                          {vid.titleEn}
                        </p>
                      )}
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {lang === 'zh' ? vid.descriptionZh : vid.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between gap-2 border-t border-stone-200/60 dark:border-stone-700/60">
                    <button
                      onClick={() => {
                        setActiveVideoId(vid.id);
                        setBilibiliPage(1);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isPlaying ? 'Active in Player' : 'Load in Player'}</span>
                    </button>
                    <a
                      href={vid.watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-800 dark:text-amber-400 hover:underline"
                    >
                      <span>Direct Link ({vid.duration})</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Personal Bookmarks & Study Notes Vault */}
        <section className="lg:col-span-5 rounded-2xl border border-stone-300/80 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-6 shadow-xs space-y-6">
          {/* Saved Bookmarks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  Saved Bookmarks (收藏夹 · {bookmarks.length})
                </h3>
              </div>
            </div>

            {bookmarks.length === 0 ? (
              <p className="text-xs text-stone-500 italic">
                No bookmarked items yet. Click &ldquo;Bookmark&rdquo; on any Element, Acupoint, Pattern, or Herb to save it here.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
                  >
                    <div>
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                        {bm.title}
                      </span>
                      <span className="ml-2 text-[10px] font-mono text-amber-800 dark:text-amber-400">
                        [{bm.category}]
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="text-stone-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Study Notes Journal */}
          <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-red-800 dark:text-amber-400" />
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                Personal Study Notes (读书医案笔记)
              </h3>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-2">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title (e.g., 逍遥散 vs 柴胡疏肝散)..."
                className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 text-xs"
              />
              <textarea
                rows={2}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write bilingual reflections, acupoint combinations, or classical quotes..."
                className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 text-xs"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Note to Local Vault</span>
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-xl bg-[#FAF6F0] dark:bg-stone-800/80 border border-amber-900/20 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                      {n.title}
                    </span>
                    <button
                      onClick={() => onDeleteNote(n.id)}
                      className="text-stone-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                    {n.content}
                  </p>
                  <div className="text-[10px] font-mono text-stone-400">{n.createdAt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
