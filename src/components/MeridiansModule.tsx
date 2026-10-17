'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LanguageMode } from '@/types/tcm';
import { MERIDIAN_CHANNELS, KEY_ACUPOINTS } from '@/data/meridiansData';
import { WUXING_ELEMENTS } from '@/data/foundationsData';
import { renderProse, TermBadge, VermilionSeal, LabMetadataChips } from './BilingualUi';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const Meridian3DCanvas = dynamic(() => import('./Meridian3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] canvas-stage bg-stone-950 text-amber-200 flex items-center justify-center font-serif text-sm">
      正在铸造三维天圣针灸铜人 · Casting 3D Tiansheng Bronze Acupuncture Statue...
    </div>
  )
});

interface MeridiansModuleProps {
  lang: LanguageMode;
  bookmarks: string[];
  onToggleBookmark: (id: string, title: string, category: string) => void;
}

/**
 * Renders a bespoke, high-precision Regional Anatomical & Finger-Cun Close-Up SVG Plate
 * for the selected acupoint (局部骨度与手指同身寸取穴特写图).
 */
function RegionalAcupointCloseUp({
  code,
  accentColor
}: {
  code: string;
  accentColor: string;
}) {
  return (
    <div className="canvas-stage p-3.5">
      <div className="flex items-center justify-between border-b border-stone-300/60 dark:border-stone-800 pb-2 mb-2.5">
        <span className="text-xs font-serif font-bold text-stone-900 dark:text-amber-100">
          局部骨度与同身寸取穴图 · Regional Anatomical Landmark Plate
        </span>
        <span className="text-[10px] font-mono font-semibold text-[#9E2A2B] dark:text-amber-400">
          {code} ANATOMY
        </span>
      </div>

      <svg viewBox="0 0 280 145" className="w-full h-auto select-none">
        <rect x="2" y="2" width="276" height="141" fill="none" stroke="#A89F91" strokeWidth="0.7" />

        {code === 'LI4' && (
          <g>
            {/* Dorsum of Hand & 1st/2nd Metacarpal Bones */}
            <path
              d="M 35,120 C 45,95 65,78 90,72 L 125,42 C 132,36 140,42 135,52 L 112,76 L 185,55 C 195,53 198,62 188,66 L 135,84 L 195,78 C 204,77 205,86 195,89 L 135,95 L 185,98 C 192,99 192,107 183,108 L 122,110 C 95,118 68,125 45,130 Z"
              fill="#EFE4CE"
              stroke="#57534E"
              strokeWidth="1.5"
            />
            {/* 1st & 2nd Metacarpal Bone Outlines */}
            <line x1="65" y1="112" x2="122" y2="52" stroke="#A8A29E" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
            <line x1="72" y1="114" x2="165" y2="66" stroke="#A8A29E" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
            <text x="148" y="50" fill="#57534E" className="text-[8px] font-serif">第一掌骨 (1st Metacarpal)</text>
            <text x="155" y="125" fill="#57534E" className="text-[8px] font-serif">第二掌骨桡侧中点 (Midpoint 2nd Metacarpal)</text>
            <line x1="72" y1="114" x2="132" y2="83" stroke="#9E2A2B" strokeWidth="1" strokeDasharray="2 2" />
            {/* LI4 Point */}
            <circle cx="106" cy="91" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
            <circle cx="106" cy="91" r="3.8" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
            <text x="98" y="80" textAnchor="end" fill="#9E2A2B" className="text-[10px] font-serif font-bold">
              合谷 LI4
            </text>
          </g>
        )}

        {code === 'ST36' && (
          <g>
            {/* Knee Patella, Tibia Anterior Crest & 3 Cun (4-Finger) Guide */}
            <path d="M 65,12 C 62,45 64,95 68,136 L 138,136 C 144,95 148,45 142,12 Z" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
            {/* Patella & Dubi (ST35) */}
            <ellipse cx="102" cy="28" rx="22" ry="13" fill="#E5D5B5" stroke="#78716C" strokeWidth="1.2" />
            <text x="102" y="31" textAnchor="middle" fill="#44403C" className="text-[8px] font-serif">髌骨 Patella</text>
            <circle cx="122" cy="38" r="2.5" fill="#57534E" />
            <text x="132" y="40" fill="#57534E" className="text-[8px] font-serif">犊鼻 ST35 (外膝眼)</text>
            {/* Anterior Crest of Tibia */}
            <line x1="100" y1="42" x2="100" y2="135" stroke="#78716C" strokeWidth="2.5" strokeDasharray="4 2" />
            <text x="94" y="126" textAnchor="end" fill="#57534E" className="text-[8px] font-serif">胫骨前嵴 Tibia Crest</text>
            {/* 3 Cun Bracket (4 Finger-Breadths) */}
            <line x1="162" y1="38" x2="176" y2="38" stroke="#9E2A2B" strokeWidth="1" />
            <line x1="169" y1="38" x2="169" y2="88" stroke="#9E2A2B" strokeWidth="1.2" />
            <line x1="162" y1="88" x2="176" y2="88" stroke="#9E2A2B" strokeWidth="1" />
            <text x="182" y="66" fill="#9E2A2B" className="text-[9px] font-serif font-bold">直下 3寸 (四横指)</text>
            <text x="182" y="78" fill="#57534E" className="text-[8px] font-mono">1 Finger Lateral to Tibia</text>
            {/* ST36 Point */}
            <circle cx="116" cy="88" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
            <circle cx="116" cy="88" r="4" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
            <text x="128" y="92" fill="#9E2A2B" className="text-[10px] font-serif font-bold">足三里 ST36</text>
          </g>
        )}

        {code === 'LR3' && (
          <g>
            {/* Dorsum of Foot & 1st/2nd Metatarsals */}
            <path d="M 65,132 L 72,32 C 74,18 92,18 94,32 L 95,52 C 98,24 114,24 116,48 L 118,56 C 122,32 135,34 136,56 L 146,132 Z" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
            {/* 1st & 2nd Metatarsal Bones Meeting in V-Junction */}
            <line x1="84" y1="42" x2="96" y2="108" stroke="#A8A29E" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
            <line x1="106" y1="45" x2="98" y2="108" stroke="#A8A29E" strokeWidth="4.5" strokeLinecap="round" opacity="0.6" />
            <circle cx="95" cy="84" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
            <circle cx="95" cy="84" r="4" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="104" y1="84" x2="155" y2="84" stroke="#9E2A2B" strokeWidth="1" />
            <text x="160" y="82" fill="#9E2A2B" className="text-[10px] font-serif font-bold">太冲 LR3</text>
            <text x="160" y="95" fill="#57534E" className="text-[8px] font-serif">第1、2跖骨结合部前凹陷</text>
            <text x="160" y="107" fill="#57534E" className="text-[8px] font-mono">Distal to 1st/2nd Metatarsal Junction</text>
          </g>
        )}

        {code === 'PC6' && (
          <g>
            {/* Anterior Forearm, Wrist Crease & Two Central Tendons */}
            <path d="M 68,14 L 76,134 L 136,134 L 144,14 Z" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
            {/* Transverse Wrist Crease */}
            <line x1="72" y1="42" x2="140" y2="42" stroke="#44403C" strokeWidth="2" />
            <text x="64" y="45" textAnchor="end" fill="#44403C" className="text-[8px] font-serif">腕横纹 Wrist Crease</text>
            {/* Palmaris Longus & Flexor Carpi Radialis Tendons */}
            <line x1="99" y1="42" x2="99" y2="132" stroke="#78716C" strokeWidth="2.2" />
            <line x1="113" y1="42" x2="113" y2="132" stroke="#78716C" strokeWidth="2.2" />
            <text x="150" y="116" fill="#57534E" className="text-[8px] font-serif">掌长肌腱与桡侧腕屈肌腱之间</text>
            {/* 2 Cun (3 Fingers) Bracket */}
            <line x1="148" y1="42" x2="160" y2="42" stroke="#9E2A2B" strokeWidth="1" />
            <line x1="154" y1="42" x2="154" y2="82" stroke="#9E2A2B" strokeWidth="1.2" />
            <line x1="148" y1="82" x2="160" y2="82" stroke="#9E2A2B" strokeWidth="1" />
            <text x="166" y="65" fill="#9E2A2B" className="text-[9px] font-serif font-bold">腕横纹上 2寸 (三横指)</text>
            {/* PC6 Point */}
            <circle cx="106" cy="82" r="7.5" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
            <circle cx="106" cy="82" r="3.8" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
            <text x="62" y="85" textAnchor="end" fill="#9E2A2B" className="text-[10px] font-serif font-bold">内关 PC6</text>
          </g>
        )}

        {code === 'SP6' && (
          <g>
            {/* Medial Lower Leg, Medial Malleolus & Posterior Tibia */}
            <path d="M 75,12 L 80,108 C 72,115 74,126 84,132 L 135,132 L 130,12 Z" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
            {/* Medial Border of Tibia */}
            <line x1="102" y1="14" x2="102" y2="112" stroke="#78716C" strokeWidth="3" />
            <text x="68" y="45" textAnchor="end" fill="#57534E" className="text-[8px] font-serif">胫骨内侧缘后方</text>
            {/* Medial Malleolus Prominence */}
            <circle cx="92" cy="116" r="8" fill="#E5D5B5" stroke="#57534E" strokeWidth="1.2" />
            <text x="68" y="119" textAnchor="end" fill="#44403C" className="text-[8px] font-serif">内踝尖最高点</text>
            {/* 3 Cun Bracket above Medial Malleolus */}
            <line x1="145" y1="66" x2="157" y2="66" stroke="#9E2A2B" strokeWidth="1" />
            <line x1="151" y1="66" x2="151" y2="116" stroke="#9E2A2B" strokeWidth="1.2" />
            <line x1="145" y1="116" x2="157" y2="116" stroke="#9E2A2B" strokeWidth="1" />
            <text x="164" y="92" fill="#9E2A2B" className="text-[9px] font-serif font-bold">内踝尖直上 3寸 (四横指)</text>
            <text x="164" y="105" fill="#57534E" className="text-[8px] font-serif">肝脾肾三阴交会处</text>
            {/* SP6 Point */}
            <circle cx="106" cy="66" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
            <circle cx="106" cy="66" r="4" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
            <text x="118" y="64" fill="#9E2A2B" className="text-[10px] font-serif font-bold">三阴交 SP6</text>
          </g>
        )}

        {(code === 'GV20' || code === 'GB20' || code === 'CV4' || code === 'KI1' || code === 'BL23') && (
          <g>
            {code === 'GV20' && (
              <>
                <ellipse cx="105" cy="74" rx="46" ry="54" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
                <line x1="105" y1="16" x2="105" y2="132" stroke="#78716C" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="55" y1="74" x2="155" y2="74" stroke="#9E2A2B" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="105" cy="74" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
                <circle cx="105" cy="74" r="4" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <text x="166" y="66" fill="#9E2A2B" className="text-[10px] font-serif font-bold">百会 GV20 (三阳五会)</text>
                <text x="166" y="80" fill="#57534E" className="text-[8px] font-serif">前发际直上5寸 · 两耳尖连线中点</text>
              </>
            )}
            {code === 'CV4' && (
              <>
                <rect x="64" y="14" width="82" height="118" rx="14" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
                <line x1="105" y1="14" x2="105" y2="132" stroke="#78716C" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="105" cy="40" r="3.5" fill="#44403C" />
                <text x="58" y="43" textAnchor="end" fill="#44403C" className="text-[8px] font-serif">神阙 (肚脐)</text>
                <line x1="75" y1="118" x2="135" y2="118" stroke="#78716C" strokeWidth="2" />
                <text x="58" y="121" textAnchor="end" fill="#44403C" className="text-[8px] font-serif">曲骨 (5寸)</text>
                <circle cx="105" cy="86" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
                <circle cx="105" cy="86" r="4" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <text x="158" y="82" fill="#9E2A2B" className="text-[10px] font-serif font-bold">关元 CV4 (脐下3寸)</text>
                <text x="158" y="96" fill="#57534E" className="text-[8px] font-serif">脐下四横指 · 足三阴任脉之会</text>
              </>
            )}
            {code === 'KI1' && (
              <>
                <path d="M 85,18 C 68,20 65,68 72,102 C 76,124 92,132 106,132 C 122,132 132,118 130,96 C 128,66 135,22 85,18 Z" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
                <path d="M 78,56 Q 102,44 124,58" fill="none" stroke="#78716C" strokeWidth="1.5" />
                <circle cx="101" cy="56" r="8" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
                <circle cx="101" cy="56" r="4" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <text x="148" y="56" fill="#9E2A2B" className="text-[10px] font-serif font-bold">涌泉 KI1 (足底前1/3凹陷)</text>
                <text x="148" y="70" fill="#57534E" className="text-[8px] font-serif">蜷足时足前部人字纹最深凹陷处</text>
              </>
            )}
            {code === 'GB20' && (
              <>
                <path d="M 65,18 C 65,55 72,85 75,130 L 135,130 C 138,85 145,55 145,18 Z" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
                <path d="M 68,54 Q 105,64 142,54" fill="none" stroke="#78716C" strokeWidth="2" />
                <line x1="94" y1="58" x2="92" y2="128" stroke="#A8A29E" strokeWidth="4" />
                <line x1="116" y1="58" x2="118" y2="128" stroke="#A8A29E" strokeWidth="4" />
                <circle cx="82" cy="62" r="7" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
                <circle cx="82" cy="62" r="3.5" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="128" cy="62" r="3.5" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <text x="155" y="62" fill="#9E2A2B" className="text-[10px] font-serif font-bold">风池 GB20 (枕骨下凹陷)</text>
                <text x="155" y="76" fill="#57534E" className="text-[8px] font-serif">胸锁乳突肌与斜方肌上端之间</text>
              </>
            )}
            {code === 'BL23' && (
              <>
                <rect x="62" y="14" width="86" height="118" fill="#EFE4CE" stroke="#57534E" strokeWidth="1.5" />
                <line x1="105" y1="14" x2="105" y2="132" stroke="#57534E" strokeWidth="3" strokeDasharray="5 3" />
                <circle cx="105" cy="72" r="3.5" fill="#44403C" />
                <text x="56" y="75" textAnchor="end" fill="#44403C" className="text-[8px] font-serif">第2腰椎 命门 GV4</text>
                <circle cx="86" cy="72" r="7.5" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.2" />
                <circle cx="86" cy="72" r="3.8" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="124" cy="72" r="3.8" fill="#9E2A2B" stroke="#FFFFFF" strokeWidth="1" />
                <text x="158" y="68" fill="#9E2A2B" className="text-[10px] font-serif font-bold">肾俞 BL23 (旁开1.5寸)</text>
                <text x="158" y="82" fill="#57534E" className="text-[8px] font-serif">第二腰椎棘突下左右旁开二横指</text>
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

export default function MeridiansModule({
  lang,
  bookmarks,
  onToggleBookmark
}: MeridiansModuleProps) {
  const [viewerMode, setViewerMode] = useState<'both' | '2d' | '3d'>('both');
  const [svgViewSide, setSvgViewSide] = useState<'anterior' | 'posterior'>('anterior');
  const [selectedMeridianId, setSelectedMeridianId] = useState<string>('LU');
  const [selectedAcupointCode, setSelectedAcupointCode] = useState<string>('LI4');
  const [showCunRulers, setShowCunRulers] = useState<boolean>(true);
  const [showInternalBranches, setShowInternalBranches] = useState<boolean>(true);

  const activePoint =
    KEY_ACUPOINTS.find((pt) => pt.code === selectedAcupointCode) || KEY_ACUPOINTS[0];
  const activeChannel =
    MERIDIAN_CHANNELS.find((ch) =>
      selectedMeridianId === 'ALL' ? ch.id === activePoint.meridianId : ch.id === selectedMeridianId
    ) || MERIDIAN_CHANNELS[0];

  const handleSelectPoint = (code: string) => {
    setSelectedAcupointCode(code);
    const pt = KEY_ACUPOINTS.find((p) => p.code === code);
    if (pt) {
      setSelectedMeridianId(pt.meridianId);
      if (pt.coords2D.view !== 'lateral') {
        setSvgViewSide(pt.coords2D.view);
      }
    }
  };

  const handleSelectMeridian = (id: string) => {
    setSelectedMeridianId(id);
    if (id !== 'ALL') {
      const ch = MERIDIAN_CHANNELS.find((m) => m.id === id);
      if (ch) {
        if (ch.svgPathPosterior && !ch.svgPathAnterior) {
          setSvgViewSide('posterior');
        } else if (ch.svgPathAnterior && !ch.svgPathPosterior) {
          setSvgViewSide('anterior');
        }
      }
      const matchingPt = KEY_ACUPOINTS.find((p) => p.meridianId === id);
      if (matchingPt) {
        setSelectedAcupointCode(matchingPt.code);
      }
    }
  };

  return (
    <div className="space-y-14">
      {/* Unboxed Editorial Track Overview Header */}
      <header className="pb-10 border-b border-stone-300/80 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <LabMetadataChips
              chips={[
                { label: 'Path 02 · 经络铜人实训', tone: 'cinnabar' },
                { label: 'Interactive 2D/3D Lab', tone: 'amber' },
                { label: '14 Channels & 10 Key Acupoints', tone: 'jade' },
                { label: '25 min', tone: 'stone' }
              ]}
            />
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-amber-50 leading-tight">
              十二正经、奇经八脉与骨度同身寸实训室
              {lang !== 'zh' && (
                <span className="block text-base sm:text-xl font-sans font-normal text-stone-600 dark:text-stone-300 mt-2">
                  Anatomical Surface Pathways, Internal Organ Branches & Proportional Cun Landmarks
                </span>
              )}
            </h2>
            {renderProse(
              lang,
              'Rather than abstract lines, the Jing-Luo (经络) follow precise anatomical grooves between bones, muscles, and tendons—measured proportionally across every body using Bone-Cun (骨度分寸) and Finger-Cun (同身寸).',
              '《灵枢·经脉》：“经脉者，所以能决死生，处百病，调虚实，不可不通。”古人立“骨度分寸”与“天圣针灸铜人”，循骨节肌腱之隙定经脉之行，内属脏腑，外络肢节。'
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-md overflow-hidden border border-stone-300/80 dark:border-stone-700 shadow-xs aspect-video bg-stone-200 dark:bg-stone-950">
              <img
                src="/images/meridian_scroll.jpg"
                alt="Classical Meridian Scroll"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 py-2.5 text-xs text-amber-100 font-serif flex justify-between items-center">
                <span>《明堂经络铜人图》· Imperial Bronze Acupoint Scroll</span>
                <VermilionSeal text="针灸甲乙" variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Open Split-Screen Interactive Lab Workspace */}
      <section className="space-y-8">
        {/* Lab Workspace Top Header */}
        <div className="pb-4 border-b border-stone-300/80 dark:border-stone-800 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <VermilionSeal text="天圣铜人" variant="solid" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                14-Channel & 3D Bronze Tongren Atlas
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-950 dark:text-amber-50">
              十四经脉与三维天圣铜人实训台 · 14-Channel & 3D Tongren Interactive Lab
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Select any channel tab below to trace its external course (实线), internal organ branch (虚线), and key acupoints
            </p>
          </div>

          {/* Minimalist Underline Viewport Mode Switcher */}
          <div className="flex items-center gap-4 border-b border-stone-300 dark:border-stone-700 text-xs">
            {(
              [
                { id: 'both', label: '双图并列 · Dual 2D + 3D' },
                { id: '2d', label: '平面骨度 · 2D Atlas' },
                { id: '3d', label: '天圣铜人 · 3D Bronze' }
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setViewerMode(m.id)}
                className={`pb-2 font-medium transition border-b-2 -mb-px ${
                  viewerMode === m.id
                    ? 'border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 font-bold'
                    : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Underline Channel Selector Bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-stone-300/80 dark:border-stone-800">
          <button
            onClick={() => handleSelectMeridian('ALL')}
            className={`pb-2.5 text-xs font-serif transition border-b-2 -mb-px ${
              selectedMeridianId === 'ALL'
                ? 'border-[#B91C1C] text-[#B91C1C] dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950'
            }`}
          >
            全经总览 · All 14
          </button>
          {MERIDIAN_CHANNELS.map((ch) => {
            const elColor =
              WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';
            const active = selectedMeridianId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectMeridian(ch.id)}
                className={`pb-2.5 text-xs font-serif transition flex items-center gap-1.5 border-b-2 -mb-px ${
                  active
                    ? 'text-stone-950 dark:text-amber-50 font-bold'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
                style={active ? { borderColor: elColor } : undefined}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: elColor }}
                />
                <span className="font-mono text-[11px]">{ch.id}</span>
                <span>{ch.name.zh.replace(/手|足|奇经八脉|\(|\)/g, '')}</span>
              </button>
            );
          })}
        </div>

        {/* Split-Screen Lab Body: Left Interactive 2D/3D Canvases + Right Open Documentation Column */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:divide-x divide-stone-300/70 dark:divide-stone-800 items-start">
          {/* LEFT PANE: 2D Anatomical & Bone-Cun Atlas + 3D Bronze Statue */}
          <div className="xl:col-span-7 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              {/* 2D Multi-Layer Anatomical & Bone-Cun SVG Plate */}
              {(viewerMode === 'both' || viewerMode === '2d') && (
                <div
                  className={`${
                    viewerMode === '2d' ? 'md:col-span-2' : ''
                  } canvas-stage overflow-hidden flex flex-col justify-between h-[580px]`}
                >
                  {/* Plate Header & Layer Toggles */}
                  <div className="px-3.5 py-2.5 border-b border-stone-300/70 dark:border-stone-800 bg-[#F3ECE1]/85 dark:bg-stone-900 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-amber-100">
                      平面经络骨度图 ({svgViewSide === 'anterior' ? '正视图 Anterior' : '背视图 Posterior'})
                    </span>

                    <div className="flex flex-wrap items-center gap-3 text-[11px]">
                      <button
                        onClick={() => setSvgViewSide('anterior')}
                        className={`pb-0.5 border-b transition ${
                          svgViewSide === 'anterior'
                            ? 'border-[#B91C1C] text-[#B91C1C] font-bold'
                            : 'border-transparent text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        正面 Front
                      </button>
                      <button
                        onClick={() => setSvgViewSide('posterior')}
                        className={`pb-0.5 border-b transition ${
                          svgViewSide === 'posterior'
                            ? 'border-[#B91C1C] text-[#B91C1C] font-bold'
                            : 'border-transparent text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        背面 Back
                      </button>
                      <button
                        onClick={() => setShowCunRulers(!showCunRulers)}
                        className={`pb-0.5 border-b transition ${
                          showCunRulers
                            ? 'border-stone-900 text-stone-950 dark:text-amber-200 font-bold'
                            : 'border-transparent text-stone-500'
                        }`}
                        title="Toggle Proportional Bone-Cun Rulers (骨度分寸)"
                      >
                        骨度尺
                      </button>
                      <button
                        onClick={() => setShowInternalBranches(!showInternalBranches)}
                        className={`pb-0.5 border-b transition ${
                          showInternalBranches
                            ? 'border-stone-900 text-stone-950 dark:text-amber-200 font-bold'
                            : 'border-transparent text-stone-500'
                        }`}
                        title="Toggle Internal Organ Branches (体内络属支脉)"
                      >
                        内景支脉
                      </button>
                    </div>
                  </div>

                  {/* Detailed Anatomical SVG Body Canvas */}
                  <div className="flex-1 min-h-0 flex items-center justify-center p-2 overflow-hidden">
                    <svg
                      viewBox="0 0 112 104"
                      className="w-full h-full max-w-[360px] select-none"
                    >
                      <defs>
                        <marker
                          id="qi-arrow"
                          viewBox="0 0 6 6"
                          refX="3"
                          refY="3"
                          markerWidth="3.2"
                          markerHeight="3.2"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0,1 L 6,3 L 0,5 z" fill="#9E2A2B" />
                        </marker>
                      </defs>

                      {/* LAYER 1: Detailed Anatomical Human Contour & Muscular/Skeletal Landmarks */}
                      <g
                        fill="#EFE5D4"
                        stroke="#6B5E4C"
                        strokeWidth="0.45"
                      >
                        {/* Cranium, Jaw & Ears */}
                        <path d="M 50,3.8 C 46,3.8 44,6.8 44.2,10.5 C 44.4,13.5 46.2,16.2 50,16.6 C 53.8,16.2 55.6,13.5 55.8,10.5 C 56,6.8 54,3.8 50,3.8 Z" />
                        <path d="M 44.1,9.5 C 43.2,9.5 43.2,12 44.3,12.2" fill="none" />
                        <path d="M 55.9,9.5 C 56.8,9.5 56.8,12 55.7,12.2" fill="none" />

                        {/* Neck, Trapezius, Shoulders, Torso, Arms, Hands, Pelvis, Legs & Feet */}
                        <path
                          d="M 47.2,16.2 L 46.8,19.5 C 43.5,20.5 38.5,21.2 35,22.2 C 32.2,23.2 30.2,26.5 28.5,31 L 24.5,39.5 L 19.5,51.5 L 17.2,54.5 L 13.5,59.5 C 13,60.5 14,61.5 15,60.5 L 17.5,58 C 16.5,61 17.5,63 18.8,62.5 L 21.2,56.5 L 23.2,54.5 L 28.5,42 L 34,31.5 L 37.2,27.5 C 37.8,33 39,38.5 39.8,44 C 40,48 39,51.5 39.5,55.5 L 40.2,74.5 L 40.8,92.5 L 39.5,96.8 L 48.8,96.8 L 48.2,92.5 L 48.2,75 L 49.4,55.5 L 50.6,55.5 L 51.8,75 L 51.8,92.5 L 51.2,96.8 L 60.5,96.8 L 59.2,92.5 L 59.8,74.5 L 60.5,55.5 C 61,51.5 60,48 60.2,44 C 61,38.5 62.2,33 62.8,27.5 L 66,31.5 L 71.5,42 L 76.8,54.5 L 78.8,56.5 L 81.2,62.5 C 82.5,63 83.5,61 82.5,58 L 85,60.5 C 86,61.5 87,60.5 86.5,59.5 L 82.8,54.5 L 80.5,51.5 L 75.5,39.5 L 71.5,31 C 69.8,26.5 67.8,23.2 65,22.2 C 61.5,21.2 56.5,20.5 53.2,19.5 L 52.8,16.2 Z"
                        />
                      </g>

                      {/* Anatomical Landmarks Overlay (Clavicles, Ribcage/Pectorals, Umbilicus, Knees, Spine/Scapulae) */}
                      {svgViewSide === 'anterior' ? (
                        <g fill="none" stroke="#8C7A65" strokeWidth="0.32" opacity="0.75">
                          {/* Eyes, Nose & Mouth */}
                          <path d="M 47,9.8 Q 48,9.4 49,9.8 M 51,9.8 Q 52,9.4 53,9.8" />
                          <line x1="50" y1="9.8" x2="50" y2="12.2" />
                          <path d="M 48.5,13.6 Q 50,14.1 51.5,13.6" />
                          {/* Clavicles & Suprasternal Notch (天突) */}
                          <path d="M 36,22.2 Q 43,21 48.5,21.8 Q 50,22.4 51.5,21.8 Q 57,21 64,22.2" strokeWidth="0.45" />
                          {/* Pectoral Contours & Nipple Landmarks (4 cun line) */}
                          <path d="M 38.5,28.5 Q 43.5,31.5 48.5,29.5 M 61.5,28.5 Q 56.5,31.5 51.5,29.5" />
                          <circle cx="42" cy="29.5" r="0.45" fill="#8C7A65" />
                          <circle cx="58" cy="29.5" r="0.45" fill="#8C7A65" />
                          {/* Costal Arch (胸肋弓) & Xiphoid */}
                          <path d="M 40,39.5 Q 46,35 50,33.5 Q 54,35 60,39.5" strokeDasharray="1 0.8" />
                          {/* Umbilicus (神阙 CV8) & Pubic Symphysis (曲骨) */}
                          <circle cx="50" cy="43" r="0.65" />
                          <path d="M 46,52.5 Q 50,53.2 54,52.5" />
                          {/* Cubital & Wrist Creases */}
                          <line x1="24.5" y1="39" x2="28.5" y2="41" />
                          <line x1="17.5" y1="53.5" x2="22" y2="55" />
                          {/* Patella (Knee Caps) & Tibial Crests */}
                          <ellipse cx="44" cy="75" rx="2.2" ry="1.8" />
                          <ellipse cx="56" cy="75" rx="2.2" ry="1.8" />
                          <line x1="44.5" y1="77" x2="45.5" y2="92" strokeDasharray="1.2 0.8" />
                          <line x1="55.5" y1="77" x2="54.5" y2="92" strokeDasharray="1.2 0.8" />
                        </g>
                      ) : (
                        <g fill="none" stroke="#8C7A65" strokeWidth="0.32" opacity="0.75">
                          {/* Occiput Hairline & C7 (大椎 GV14) */}
                          <path d="M 45.5,14.8 Q 50,15.6 54.5,14.8" />
                          <circle cx="50" cy="20.5" r="0.7" fill="#8C7A65" />
                          {/* Scapular Spines (肩胛冈) */}
                          <path d="M 38,24.5 L 45.5,23.5 L 45,31.5 Z" />
                          <path d="M 62,24.5 L 54.5,23.5 L 55,31.5 Z" />
                          {/* Spinal Vertebral Line & Iliac Crest / L2 Mingmen */}
                          <line x1="50" y1="15" x2="50" y2="53" strokeWidth="0.55" strokeDasharray="0.9 0.7" />
                          <path d="M 40,44.5 Q 50,43.5 60,44.5" strokeDasharray="1 1" />
                          {/* Popliteal Creases (委中 BL40) */}
                          <line x1="41.5" y1="75.5" x2="46.5" y2="75.5" />
                          <line x1="53.5" y1="75.5" x2="58.5" y2="75.5" />
                        </g>
                      )}

                      {/* LAYER 2: Proportional Bone-Cun Rulers (骨度分寸参考标尺) */}
                      {showCunRulers && (
                        <g stroke="#78716C" strokeWidth="0.3" fill="#57534E" className="text-[2.4px] font-serif">
                          {/* Right-side Trunk Cun Brackets */}
                          <line x1="89" y1="21.5" x2="92" y2="21.5" />
                          <line x1="90.5" y1="21.5" x2="90.5" y2="33.5" />
                          <line x1="89" y1="33.5" x2="92" y2="33.5" />
                          <text x="93" y="28">胸骨 9寸</text>

                          <line x1="90.5" y1="33.5" x2="90.5" y2="43" />
                          <line x1="89" y1="43" x2="92" y2="43" />
                          <text x="93" y="39">歧至脐 8寸</text>

                          <line x1="90.5" y1="43" x2="90.5" y2="52.5" />
                          <line x1="89" y1="52.5" x2="92" y2="52.5" />
                          <text x="93" y="48.5">脐至曲骨 5寸</text>

                          {/* Lower Limb Cun Brackets */}
                          <line x1="89" y1="75" x2="92" y2="75" />
                          <line x1="90.5" y1="75" x2="90.5" y2="93" />
                          <line x1="89" y1="93" x2="92" y2="93" />
                          <text x="93" y="84.5">膝至外踝 16寸</text>

                          {/* Left-side Forearm Cun Bracket */}
                          <line x1="9" y1="39" x2="12" y2="39" />
                          <line x1="10.5" y1="39" x2="10.5" y2="54" />
                          <line x1="9" y1="54" x2="12" y2="54" />
                          <text x="8" y="47" textAnchor="end">前臂 12寸</text>
                        </g>
                      )}

                      {/* LAYER 3: Internal Organ-Connecting Branches (体内络属支脉) */}
                      {showInternalBranches &&
                        svgViewSide === 'anterior' &&
                        MERIDIAN_CHANNELS.map((ch) => {
                          if (!ch.svgInternalPath) return null;
                          const isSelected = ch.id === selectedMeridianId;
                          if (!isSelected) return null;
                          const elColor =
                            WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#9E2A2B';
                          return (
                            <path
                              key={`internal-${ch.id}`}
                              d={ch.svgInternalPath}
                              fill="none"
                              stroke={elColor}
                              strokeWidth="0.65"
                              strokeDasharray="1.2 1"
                              strokeOpacity="0.85"
                            />
                          );
                        })}

                      {/* LAYER 4: Primary Meridian Pathways (Bilateral + Directional Flow) */}
                      {MERIDIAN_CHANNELS.map((ch) => {
                        const pathData =
                          svgViewSide === 'anterior' ? ch.svgPathAnterior : ch.svgPathPosterior;
                        if (!pathData) return null;
                        const isSelected =
                          selectedMeridianId === 'ALL' || selectedMeridianId === ch.id;
                        const isSingleFocus = selectedMeridianId === ch.id;
                        const elColor =
                          WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';

                        return (
                          <g key={ch.id}>
                            {/* Primary Left Side Channel */}
                            <path
                              d={pathData}
                              fill="none"
                              stroke={elColor}
                              strokeWidth={isSingleFocus ? '1.35' : isSelected ? '0.9' : '0.35'}
                              strokeOpacity={isSelected ? 0.95 : 0.22}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              markerEnd={isSingleFocus ? 'url(#qi-arrow)' : undefined}
                            />
                            {/* Bilateral Mirrored Right Side Channel */}
                            {ch.id !== 'CV' && ch.id !== 'GV' && isSelected && (
                              <g transform="translate(100, 0) scale(-1, 1)">
                                <path
                                  d={pathData}
                                  fill="none"
                                  stroke={elColor}
                                  strokeWidth={isSingleFocus ? '0.95' : '0.6'}
                                  strokeOpacity={isSingleFocus ? 0.65 : 0.35}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                            )}
                          </g>
                        );
                      })}

                      {/* LAYER 5: Named Intermediate Channel Waypoint Nodes (本经沿线要穴) */}
                      {MERIDIAN_CHANNELS.map((ch) => {
                        if (selectedMeridianId !== ch.id || !ch.channelNodes) return null;
                        const elColor =
                          WUXING_ELEMENTS.find((e) => e.key === ch.element)?.colorHex || '#C83E31';
                        return ch.channelNodes
                          .filter((n) => n.view === svgViewSide)
                          .map((node) => {
                            const isKeyPoint = KEY_ACUPOINTS.some((k) => k.code === node.code);
                            if (isKeyPoint) return null; // Rendered by Layer 6
                            return (
                              <g key={node.code}>
                                <circle
                                  cx={node.x}
                                  cy={node.y}
                                  r="1.05"
                                  fill="#FAF6F0"
                                  stroke={elColor}
                                  strokeWidth="0.45"
                                />
                                <text
                                  x={node.x > 49 ? node.x + 1.8 : node.x - 1.8}
                                  y={node.y + 0.7}
                                  textAnchor={node.x > 49 ? 'start' : 'end'}
                                  fill="#44403C"
                                  className="text-[2.4px] font-serif"
                                >
                                  {node.code} {node.zh}
                                </text>
                              </g>
                            );
                          });
                      })}

                      {/* LAYER 6: Interactive High-Yield Key Acupoints */}
                      {KEY_ACUPOINTS.filter((pt) => pt.coords2D.view === svgViewSide).map((pt) => {
                        const isSelected = pt.code === selectedAcupointCode;
                        const elColor =
                          WUXING_ELEMENTS.find((e) => e.key === pt.element)?.colorHex || '#C83E31';

                        return (
                          <g
                            key={pt.code}
                            onClick={() => handleSelectPoint(pt.code)}
                            className="cursor-pointer"
                          >
                            {isSelected && (
                              <circle
                                cx={pt.coords2D.x}
                                cy={pt.coords2D.y}
                                r="3.4"
                                fill="#9E2A2B"
                                fillOpacity="0.18"
                                stroke="#9E2A2B"
                                strokeWidth="0.55"
                              />
                            )}
                            <circle
                              cx={pt.coords2D.x}
                              cy={pt.coords2D.y}
                              r={isSelected ? '1.95' : '1.45'}
                              fill={isSelected ? '#9E2A2B' : elColor}
                              stroke="#FFFFFF"
                              strokeWidth="0.4"
                            />
                            <text
                              x={pt.coords2D.x >= 50 ? pt.coords2D.x + 2.4 : pt.coords2D.x - 2.4}
                              y={pt.coords2D.y + 0.8}
                              textAnchor={pt.coords2D.x >= 50 ? 'start' : 'end'}
                              fill={isSelected ? '#9E2A2B' : '#1C1917'}
                              className="text-[2.85px] font-serif font-bold"
                            >
                              {pt.code} {pt.name.zh}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Plate Footer Legend & Quick Acupoint Index */}
                  <div className="px-3.5 py-2.5 border-t border-stone-300/70 dark:border-stone-800 bg-[#F3ECE1]/85 dark:bg-stone-900 space-y-2">
                    <div className="flex flex-wrap items-center justify-between text-[10px] font-serif text-stone-600 dark:text-stone-400">
                      <span>━━ 体表主干 Superficial Channel</span>
                      <span>┈┈ 体内络属 Internal Organ Branch</span>
                      <span>● 核心要穴 Click Point</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {KEY_ACUPOINTS.map((pt) => (
                        <button
                          key={pt.code}
                          onClick={() => handleSelectPoint(pt.code)}
                          className={`pb-0.5 text-[10px] font-mono transition border-b ${
                            pt.code === selectedAcupointCode
                              ? 'border-[#B91C1C] text-[#B91C1C] font-bold'
                              : 'border-transparent text-stone-700 dark:text-stone-300 hover:text-[#B91C1C]'
                          }`}
                        >
                          {pt.code} {pt.name.zh}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3D Sculpted Bronze Statue Viewer */}
              {(viewerMode === 'both' || viewerMode === '3d') && (
                <div className={`${viewerMode === '3d' ? 'md:col-span-2' : ''} canvas-stage overflow-hidden`}>
                  <Meridian3DCanvas
                    meridians={MERIDIAN_CHANNELS}
                    acupoints={KEY_ACUPOINTS}
                    selectedMeridianId={selectedMeridianId}
                    selectedAcupointCode={selectedAcupointCode}
                    onSelectAcupoint={handleSelectPoint}
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE: Unboxed Meridian & Acupoint Monograph Column */}
          <div className="xl:col-span-5 xl:pl-8 space-y-8 divide-y divide-stone-300/70 dark:divide-stone-800">
            {/* Part A: Active Meridian Channel Section */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <VermilionSeal text={activeChannel.polarity === 'Yin' ? '阴经' : '阳经'} />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#B91C1C] dark:text-amber-400">
                    {activeChannel.id} CHANNEL · 当令时辰: {activeChannel.peakTime}
                  </span>
                </div>
              </div>

              <h4 className="text-xl font-serif font-bold text-stone-950 dark:text-amber-50">
                {activeChannel.fullTitle.zh}
                {lang !== 'zh' && (
                  <span className="block text-sm font-sans font-normal text-stone-600 dark:text-stone-400 mt-0.5">
                    {activeChannel.fullTitle.en}
                  </span>
                )}
              </h4>

              <div className="border-l-2 border-stone-500 pl-3 py-0.5 text-xs font-serif text-stone-800 dark:text-stone-200">
                <strong>循行走向 (Trajectory): </strong>
                {lang === 'zh' ? activeChannel.flowDirectionZh : activeChannel.flowDirectionEn}
              </div>

              {renderProse(lang, activeChannel.pathwaySummaryEn, activeChannel.pathwaySummaryZh)}

              {activeChannel.channelNodes && (
                <div className="pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                    本经沿线标志要穴 · Channel Landmark Nodes:
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-serif">
                    {activeChannel.channelNodes.map((n, idx) => (
                      <span key={n.code} className="text-stone-800 dark:text-stone-200">
                        <strong className="font-mono text-[#B91C1C] dark:text-amber-400">{n.code}</strong>{' '}
                        {n.zh}
                        {idx < activeChannel.channelNodes!.length - 1 && (
                          <span className="ml-3 text-stone-300">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Part B: Active Acupoint Monograph & Regional Anatomy Plate */}
            <div className="pt-6 space-y-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <VermilionSeal text={activePoint.code} variant="solid" />
                    <span className="text-xs font-serif font-bold text-[#B91C1C] dark:text-amber-400">
                      {activePoint.categoryBadge.zh} · {activePoint.categoryBadge.en}
                    </span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-100">
                    {activePoint.name.zh}{' '}
                    <span className="text-sm font-mono font-normal text-stone-600 dark:text-stone-400">
                      [{activePoint.name.pinyin}]
                    </span>{' '}
                    {lang !== 'zh' && (
                      <span className="text-base font-sans font-normal text-stone-700 dark:text-stone-300">
                        · {activePoint.name.en}
                      </span>
                    )}
                  </h4>
                </div>

                <button
                  onClick={() =>
                    onToggleBookmark(
                      `acupoint-${activePoint.code}`,
                      `${activePoint.code} ${activePoint.name.zh} · ${activePoint.name.en}`,
                      'Meridians & Acupoints'
                    )
                  }
                  className="inline-flex items-center gap-1.5 pb-1 border-b border-stone-400 hover:border-[#B91C1C] text-xs font-medium text-stone-700 dark:text-stone-300 transition"
                >
                  {bookmarks.includes(`acupoint-${activePoint.code}`) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span className="text-[#B91C1C] font-bold">Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dedicated Regional Anatomical & Finger-Cun Close-Up SVG Plate */}
              <RegionalAcupointCloseUp
                code={activePoint.code}
                accentColor={
                  WUXING_ELEMENTS.find((e) => e.key === activePoint.element)?.colorHex || '#B91C1C'
                }
              />

              {/* Anatomical Location & Proportional Finger-Cun Guide */}
              <div className="space-y-2 border-l-2 border-[#B91C1C] pl-3.5">
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#B91C1C] dark:text-amber-400">
                  骨度标准定位与同身寸取穴法 · Anatomical Location & Cun Method
                </div>
                {renderProse(lang, activePoint.locationEn, activePoint.locationZh)}
                <div className="text-xs font-serif text-stone-800 dark:text-stone-200 pt-1">
                  <strong>同身寸简便取穴 (Clinical Finger-Cun): </strong>
                  {lang === 'zh' ? activePoint.cunGuideZh : activePoint.cunGuideEn}
                </div>
              </div>

              {/* Character Etymology */}
              <div className="space-y-1.5 pt-3 border-t border-stone-300/60 dark:border-stone-800">
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  穴名考源 · Character Etymology
                </div>
                {renderProse(lang, activePoint.etymologyEn, activePoint.etymologyZh)}
              </div>

              {/* Core Therapeutic Actions & Clinical Indications */}
              <div className="space-y-2.5 pt-3 border-t border-stone-300/60 dark:border-stone-800">
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  功用与临床主治 · Therapeutic Actions & Indications
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {activePoint.actions.map((act) => (
                    <TermBadge key={act.zh} term={act} lang={lang} size="sm" />
                  ))}
                </div>

                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-800 dark:text-stone-200 pt-1">
                  {(lang === 'zh' ? activePoint.indicationsZh : activePoint.indicationsEn).map(
                    (ind) => (
                      <li key={ind}>{ind}</li>
                    )
                  )}
                </ul>
                {lang === 'dual' && (
                  <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400 font-serif text-xs pt-1.5 border-t border-stone-200/70 dark:border-stone-800">
                    {activePoint.indicationsZh.map((ind) => (
                      <li key={ind}>{ind}</li>
                    ))}
                  </ul>
                )}

                <div className="pt-2 text-xs font-serif text-stone-600 dark:text-stone-400">
                  <strong>刺灸法 (Needling & Moxibustion):</strong> {activePoint.needlingEn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

