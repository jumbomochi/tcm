'use client';

import React, { useState } from 'react';
import { LanguageMode } from '@/types/tcm';
import { CURRICULUM_CHAPTERS, CURATED_VIDEOS } from '@/data/curriculumAndMediaData';
import { renderProse, VermilionSeal, LabMetadataChips } from './BilingualUi';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Plus,
  Trash2,
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
    <div className="space-y-14">
      {/* SECTION 1: GUIDED 5-CHAPTER CURRICULUM & SELF-CHECK QUIZ */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <VermilionSeal text="杏林传习" variant="solid" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Path 05 · Guided Curriculum & University Lectures
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 dark:text-stone-100">
              循序渐进五章导学 · Guided TCM Mastery Curriculum ({completedChapters.length}/{CURRICULUM_CHAPTERS.length} Completed)
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Complete each learning module and pass the mastery check to earn your TCM Skill Path milestones
            </p>
          </div>

          <div className="w-full sm:w-52 bg-stone-300/80 dark:bg-stone-800 h-1.5 overflow-hidden">
            <div
              className="bg-[#2D6A4F] h-full transition-all duration-300"
              style={{
                width: `${(completedChapters.length / CURRICULUM_CHAPTERS.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Clean 5-Chapter Horizontal Underline Stepper Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-b border-stone-300/80 dark:border-stone-800 divide-y md:divide-y-0 md:divide-x divide-stone-300/60 dark:divide-stone-800">
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
                className={`py-3.5 px-3 text-left transition border-b-2 -mb-px flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#B91C1C] text-stone-950 dark:text-amber-50'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-800 dark:text-amber-400 mb-1">
                  <span>MODULE 0{ch.chapterNumber}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </div>
                <div className="font-serif font-bold text-sm">
                  {ch.title.zh.split('：')[1] || ch.title.zh}
                </div>
                {lang !== 'zh' && (
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {ch.title.en.replace(/^Ch \d:\s*/, '')}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details + Interactive Quiz Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:divide-x divide-stone-300/70 dark:divide-stone-800 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <LabMetadataChips
                  chips={[
                    { label: `Module 0${activeChapter.chapterNumber}`, tone: 'cinnabar' },
                    { label: 'Guided Reading + Interactive Lab', tone: 'amber' }
                  ]}
                />
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-100 mt-1.5">
                  {activeChapter.title.zh}
                  {lang !== 'zh' && (
                    <span className="block text-sm font-sans font-normal text-stone-600 dark:text-stone-300 mt-0.5">
                      {activeChapter.title.en}
                    </span>
                  )}
                </h3>
              </div>
              <button
                onClick={() => onToggleChapterComplete(activeChapter.id)}
                className={`pb-1 border-b-2 text-xs font-semibold flex items-center gap-1.5 transition ${
                  completedChapters.includes(activeChapter.id)
                    ? 'border-[#2D6A4F] text-[#2D6A4F] dark:text-emerald-400'
                    : 'border-stone-400 text-stone-700 dark:text-stone-300 hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedChapters.includes(activeChapter.id)
                    ? '已修毕 · Completed'
                    : '标记修毕 · Mark Complete'}
                </span>
              </button>
            </div>

            {renderProse(lang, activeChapter.subtitleEn, activeChapter.subtitleZh)}

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <VermilionSeal text="核心纲领" />
                <span className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Core Classical Takeaways
                </span>
              </div>
              <ol className="divide-y divide-stone-300/60 dark:divide-stone-800 border-y border-stone-300/60 dark:border-stone-800">
                {activeChapter.keyTakeaways.map((tk, i) => (
                  <li key={tk.zh} className="py-3 flex items-baseline gap-3">
                    <span className="text-xs font-mono font-bold text-[#B91C1C]">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="font-serif font-bold text-sm text-stone-950 dark:text-stone-100">
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
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-1">
              <button
                onClick={() => onNavigateModule(activeChapter.targetModule)}
                className="inline-flex items-center gap-1.5 pb-1 border-b-2 border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 text-xs font-serif font-bold hover:opacity-80 transition"
              >
                <span>进入本节互动实训室 · Launch Interactive Lab 0{activeChapter.chapterNumber}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Page: Unboxed Chapter Quiz */}
          <div className="lg:col-span-5 lg:pl-10 space-y-4">
            <div className="flex items-center gap-2">
              <VermilionSeal text="随堂考校" variant="solid" />
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-amber-300">
                Module Mastery Check
              </span>
            </div>

            {renderProse(
              lang,
              activeChapter.quizQuestion.questionEn,
              activeChapter.quizQuestion.questionZh
            )}

            <div className="divide-y divide-stone-300/60 dark:divide-stone-800 border-y border-stone-300/70 dark:border-stone-800">
              {activeChapter.quizQuestion.options.map((opt, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === activeChapter.quizQuestion.correctIndex;
                let rowStyle =
                  'text-stone-800 dark:text-stone-200 hover:bg-stone-900/5';
                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    rowStyle =
                      'border-l-2 border-l-[#2D6A4F] pl-3 text-[#2D6A4F] dark:text-emerald-300 font-bold';
                  } else if (isSelected) {
                    rowStyle =
                      'border-l-2 border-l-[#B91C1C] pl-3 text-[#B91C1C] dark:text-red-300';
                  }
                }
                return (
                  <button
                    key={opt.zh}
                    onClick={() => setSelectedQuizAnswer(idx)}
                    className={`w-full py-3 text-left text-xs transition flex items-baseline gap-2.5 ${rowStyle}`}
                  >
                    <span className="font-mono text-[11px] text-stone-400">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <div>
                      <div className="font-serif font-bold text-sm">{opt.zh}</div>
                      {lang !== 'zh' && <div className="opacity-85 mt-0.5">{opt.en}</div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="border-l-2 border-amber-700 pl-3.5 py-1 text-xs space-y-1">
                <div className="font-serif font-bold text-amber-900 dark:text-amber-300">
                  {selectedQuizAnswer === activeChapter.quizQuestion.correctIndex
                    ? '✓ 考校通过 · Correct'
                    : '✗ 医理详析 · Review Explanation:'}
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
      <section className="pt-8 border-t border-stone-300/80 dark:border-stone-800 space-y-8">
        <div className="pb-4 border-b border-stone-300/80 dark:border-stone-800 flex items-center gap-3">
          <VermilionSeal text="理法方穴" variant="solid" />
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-100">
              中医理法方穴贯通图谱 · Interactive Theory → Pattern → Acupoint & Formula Network
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Click any node in the graph to inspect how Zang-Fu physiology connects to clinical patterns, acupoints, and herbal formulas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:divide-x divide-stone-300/70 dark:divide-stone-800 items-center">
          <div className="lg:col-span-8 canvas-stage p-5 overflow-x-auto">
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
                      stroke={active ? '#B91C1C' : '#C4B5A3'}
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
                      fill="#44403C"
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
                      rx="8"
                      fill={isSelected ? node.color : '#FFFFFF'}
                      stroke={node.color}
                      strokeWidth={isSelected ? 2.5 : 1.5}
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

          <div className="lg:col-span-4 lg:pl-8 space-y-4">
            <span
              className="inline-block text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: activeGraphNode.color }}
            >
              [{activeGraphNode.category} Node]
            </span>
            <h4 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-100">
              {activeGraphNode.labelZh}
              <span className="block text-sm font-sans font-normal text-stone-600 dark:text-stone-300 mt-0.5">
                {activeGraphNode.labelEn}
              </span>
            </h4>
            {renderProse(lang, activeGraphNode.summaryEn, activeGraphNode.summaryZh)}
            <button
              onClick={() => onNavigateModule(activeGraphNode.targetModule)}
              className="inline-flex items-center gap-1.5 pb-1 border-b-2 border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 text-xs font-serif font-bold hover:opacity-80 transition"
            >
              <span>Jump to {activeGraphNode.category} Interactive Lab</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: RICH MEDIA LECTURE VAULT & PERSONAL STUDY NOTES */}
      <section className="pt-8 border-t border-stone-300/80 dark:border-stone-800 space-y-8">
        <div className="pb-4 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <VermilionSeal text="名师讲堂" variant="solid" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                University Video Theater & Study Journal
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-100">
              名师公开课与读书医案札记 · University Video Theater & Study Notes
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              8 Verified University Courses (BUCM, CDUTCM, TUTCM, FJUTCM, Stanford, CMU) · In-App Player & Personal Study Vault
            </p>
          </div>

          {/* Minimalist Underline Topic Filter Tabs */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-stone-300 dark:border-stone-700">
            {['ALL', 'Foundations', 'Meridians', 'Diagnostics', 'Materia Medica', 'Formulas'].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setVideoFilter(tag)}
                  className={`pb-2 text-xs font-medium transition border-b-2 -mb-px ${
                    videoFilter === tag
                      ? 'border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 font-bold'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tag === 'ALL' ? 'All Courses (8)' : tag}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:divide-x divide-stone-300/70 dark:divide-stone-800 items-start">
          {/* Left Page: Video Theater Stage + Clean Hairline Course Index */}
          <div className="lg:col-span-7 space-y-6">
            {/* Embedded Interactive Video Theater Stage */}
            <div className="canvas-stage overflow-hidden bg-stone-950">
              <div className="px-4 py-2.5 bg-stone-900 text-stone-100 flex flex-wrap items-center justify-between gap-2 border-b border-stone-800">
                <div className="flex items-center gap-2 min-w-0">
                  <Tv className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-serif font-bold truncate">
                    正在播放: {activeVideo.titleZh}
                  </span>
                  <span className="text-amber-300 text-[10px] font-mono shrink-0">
                    [{activeVideo.platform} · {activeVideo.videoId}]
                  </span>
                </div>
                <a
                  href={activeDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 hover:text-amber-200 underline shrink-0"
                >
                  <span>Direct Link ({activeVideo.videoId})</span>
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

              {/* Active Lecture Metadata & Multi-Episode Switcher */}
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
                    className="pb-0.5 border-b border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 text-xs font-semibold inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Watch on {activeVideo.platform}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {activeVideo.platform === 'Bilibili' && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-[11px] font-mono text-stone-500">
                      分集选播 ({activeVideo.episodesCount || activeVideo.duration}):
                    </span>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((ep) => (
                      <button
                        key={ep}
                        onClick={() => setBilibiliPage(ep)}
                        className={`px-1.5 py-0.5 text-[11px] font-mono border-b-2 transition ${
                          bilibiliPage === ep
                            ? 'border-[#B91C1C] text-[#B91C1C] font-bold'
                            : 'border-transparent text-stone-600 hover:text-stone-950'
                        }`}
                      >
                        P{ep}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Clean Editorial Course Catalog List (Zero Box Cards) */}
            <div className="divide-y divide-stone-300/70 dark:divide-stone-800 border-y border-stone-300/70 dark:border-stone-800">
              {filteredVideos.map((vid, idx) => {
                const isPlaying = vid.id === activeVideo.id;
                return (
                  <div
                    key={vid.id}
                    className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                      isPlaying ? 'border-l-2 border-l-[#B91C1C] pl-3.5' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-amber-800 dark:text-amber-400">
                        <span>0{idx + 1}</span>
                        <span>·</span>
                        <span>{vid.institution}</span>
                        <span>·</span>
                        <span>{vid.topicTag}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100">
                        {vid.titleZh}
                      </h4>
                      {lang !== 'zh' && (
                        <p className="text-xs text-stone-700 dark:text-stone-300">
                          {vid.titleEn}
                        </p>
                      )}
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {lang === 'zh' ? vid.descriptionZh : vid.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs">
                      <button
                        onClick={() => {
                          setActiveVideoId(vid.id);
                          setBilibiliPage(1);
                        }}
                        className={`inline-flex items-center gap-1 pb-0.5 border-b font-semibold ${
                          isPlaying
                            ? 'border-[#2D6A4F] text-[#2D6A4F] dark:text-emerald-400'
                            : 'border-stone-400 text-stone-800 dark:text-stone-200 hover:border-[#B91C1C] hover:text-[#B91C1C]'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isPlaying ? 'Playing' : 'Load Course'}</span>
                      </button>
                      <a
                        href={vid.watchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-stone-500 hover:text-[#B91C1C]"
                      >
                        <span>{vid.platform}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Page: Unboxed Personal Bookmarks & Study Notes Vault */}
          <div className="lg:col-span-5 lg:pl-10 space-y-8 divide-y divide-stone-300/70 dark:divide-stone-800">
            {/* Saved Bookmarks */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <VermilionSeal text="收藏夹" />
                <h3 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100">
                  Saved Bookmarks ({bookmarks.length})
                </h3>
              </div>

              {bookmarks.length === 0 ? (
                <p className="text-xs text-stone-500 italic">
                  No bookmarked items yet. Click &ldquo;Save&rdquo; or &ldquo;Bookmark&rdquo; on any Element, Acupoint, Pattern, or Herb to save it here.
                </p>
              ) : (
                <div className="divide-y divide-stone-300/60 dark:divide-stone-800 border-y border-stone-300/60 dark:border-stone-800 max-h-52 overflow-y-auto">
                  {bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="flex items-center justify-between py-2.5 text-xs"
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
                        className="text-stone-400 hover:text-[#B91C1C] transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Study Notes Journal */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <VermilionSeal text="医案札记" variant="solid" />
                <h3 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100">
                  读书医案笔记 · Personal Study Notes
                </h3>
              </div>

              <form onSubmit={handleCreateNote} className="space-y-3">
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title (e.g., 逍遥散 vs 柴胡疏肝散)..."
                  className="w-full border-0 border-b border-stone-400 dark:border-stone-700 bg-transparent px-1 py-2 text-xs focus:outline-none focus:border-[#B91C1C]"
                />
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write bilingual reflections, acupoint combinations, or classical quotes..."
                  className="w-full border-0 border-b border-stone-400 dark:border-stone-700 bg-transparent px-1 py-2 text-xs focus:outline-none focus:border-[#B91C1C]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 pb-1 border-b-2 border-stone-900 dark:border-amber-400 text-stone-950 dark:text-amber-300 text-xs font-serif font-bold hover:border-[#B91C1C] hover:text-[#B91C1C] transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Note to Vault</span>
                </button>
              </form>

              <div className="divide-y divide-stone-300/60 dark:divide-stone-800 max-h-60 overflow-y-auto">
                {notes.map((n) => (
                  <div key={n.id} className="py-3 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-stone-950 dark:text-stone-100">
                        {n.title}
                      </span>
                      <button
                        onClick={() => onDeleteNote(n.id)}
                        className="text-stone-400 hover:text-[#B91C1C]"
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
          </div>
        </div>
      </section>
    </div>
  );
}
