export interface ShichenInfo {
  branchZh: string;
  branchPinyin: string;
  timeRange: string;
  startHour: number;
  endHour: number;
  meridianId: string;
  nextMeridianId: string;
  organZh: string;
  organEn: string;
  progress: number; // 0..1 within the 2-hour window
}

const SHICHEN_ORDER: Omit<ShichenInfo, 'progress'>[] = [
  {
    branchZh: '寅时',
    branchPinyin: 'Yín Shí',
    timeRange: '03:00–05:00',
    startHour: 3,
    endHour: 5,
    meridianId: 'LU',
    nextMeridianId: 'LI',
    organZh: '手太阴肺经',
    organEn: 'Lung (LU)'
  },
  {
    branchZh: '卯时',
    branchPinyin: 'Mǎo Shí',
    timeRange: '05:00–07:00',
    startHour: 5,
    endHour: 7,
    meridianId: 'LI',
    nextMeridianId: 'ST',
    organZh: '手阳明大肠经',
    organEn: 'Large Intestine (LI)'
  },
  {
    branchZh: '辰时',
    branchPinyin: 'Chén Shí',
    timeRange: '07:00–09:00',
    startHour: 7,
    endHour: 9,
    meridianId: 'ST',
    nextMeridianId: 'SP',
    organZh: '足阳明胃经',
    organEn: 'Stomach (ST)'
  },
  {
    branchZh: '巳时',
    branchPinyin: 'Sì Shí',
    timeRange: '09:00–11:00',
    startHour: 9,
    endHour: 11,
    meridianId: 'SP',
    nextMeridianId: 'HT',
    organZh: '足太阴脾经',
    organEn: 'Spleen (SP)'
  },
  {
    branchZh: '午时',
    branchPinyin: 'Wǔ Shí',
    timeRange: '11:00–13:00',
    startHour: 11,
    endHour: 13,
    meridianId: 'HT',
    nextMeridianId: 'SI',
    organZh: '手少阴心经',
    organEn: 'Heart (HT)'
  },
  {
    branchZh: '未时',
    branchPinyin: 'Wèi Shí',
    timeRange: '13:00–15:00',
    startHour: 13,
    endHour: 15,
    meridianId: 'SI',
    nextMeridianId: 'BL',
    organZh: '手太阳小肠经',
    organEn: 'Small Intestine (SI)'
  },
  {
    branchZh: '申时',
    branchPinyin: 'Shēn Shí',
    timeRange: '15:00–17:00',
    startHour: 15,
    endHour: 17,
    meridianId: 'BL',
    nextMeridianId: 'KI',
    organZh: '足太阳膀胱经',
    organEn: 'Bladder (BL)'
  },
  {
    branchZh: '酉时',
    branchPinyin: 'Yǒu Shí',
    timeRange: '17:00–19:00',
    startHour: 17,
    endHour: 19,
    meridianId: 'KI',
    nextMeridianId: 'PC',
    organZh: '足少阴肾经',
    organEn: 'Kidney (KI)'
  },
  {
    branchZh: '戌时',
    branchPinyin: 'Xū Shí',
    timeRange: '19:00–21:00',
    startHour: 19,
    endHour: 21,
    meridianId: 'PC',
    nextMeridianId: 'TE',
    organZh: '手厥阴心包经',
    organEn: 'Pericardium (PC)'
  },
  {
    branchZh: '亥时',
    branchPinyin: 'Hài Shí',
    timeRange: '21:00–23:00',
    startHour: 21,
    endHour: 23,
    meridianId: 'TE',
    nextMeridianId: 'GB',
    organZh: '手少阳三焦经',
    organEn: 'San Jiao (TE)'
  },
  {
    branchZh: '子时',
    branchPinyin: 'Zǐ Shí',
    timeRange: '23:00–01:00',
    startHour: 23,
    endHour: 1,
    meridianId: 'GB',
    nextMeridianId: 'LR',
    organZh: '足少阳胆经',
    organEn: 'Gallbladder (GB)'
  },
  {
    branchZh: '丑时',
    branchPinyin: 'Chǒu Shí',
    timeRange: '01:00–03:00',
    startHour: 1,
    endHour: 3,
    meridianId: 'LR',
    nextMeridianId: 'LU',
    organZh: '足厥阴肝经',
    organEn: 'Liver (LR)'
  }
];

/**
 * Computes the active TCM Circadian Meridian (子午流注) for a given Date object.
 */
export function getCurrentQiClock(now: Date = new Date()): ShichenInfo {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const decimalHour = hours + minutes / 60 + seconds / 3600;

  // Map 24h to one of the 12 two-hour shichen blocks starting at 03:00 (LU)
  const shifted = (decimalHour - 3 + 24) % 24;
  const index = Math.floor(shifted / 2) % 12;
  const progress = (shifted % 2) / 2;

  return {
    ...SHICHEN_ORDER[index],
    progress: Math.min(1, Math.max(0, progress))
  };
}
