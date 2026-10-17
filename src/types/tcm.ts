export type LanguageMode = 'dual' | 'en' | 'zh';

export interface BilingualText {
  zh: string;
  pinyin: string;
  en: string;
}

export interface ClassicalQuote {
  sourceZh: string;
  sourceEn: string;
  quoteZh: string;
  quotePinyin: string;
  quoteEn: string;
  commentaryEn: string;
  commentaryZh: string;
}

export interface VideoResource {
  id: string;
  videoId: string; // Exact Bilibili BVID (e.g. BV11WD2Y6ENv) or YouTube Video ID
  titleZh: string;
  titleEn: string;
  speaker: string;
  institution: string;
  platform: 'YouTube' | 'Bilibili';
  embedUrl: string;
  watchUrl: string;
  duration: string;
  episodesCount?: string;
  topicTag: string;
  descriptionEn: string;
  descriptionZh: string;
  thumbnailIllustration?: string;
}

export type ElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface WuXingElement {
  key: ElementKey;
  name: BilingualText;
  colorHex: string;
  bgSoftHex: string;
  season: BilingualText;
  climate: BilingualText;
  direction: BilingualText;
  zangOrgan: BilingualText;
  fuOrgan: BilingualText;
  senseOrgan: BilingualText;
  tissue: BilingualText;
  emotion: BilingualText;
  taste: BilingualText;
  voice: BilingualText;
  generates: ElementKey;
  controls: ElementKey;
  physiologyEn: string;
  physiologyZh: string;
  overactingDescEn: string;
  overactingDescZh: string;
  counteractingDescEn: string;
  counteractingDescZh: string;
  classicalQuote: ClassicalQuote;
}

export interface ZangFuOrgan {
  id: string;
  name: BilingualText;
  type: 'Zang (Yin)' | 'Fu (Yang)';
  element: ElementKey;
  pairedOrgan: BilingualText;
  meridianCode: string;
  peakHours: string;
  westernViewEn: string;
  westernViewZh: string;
  tcmFunctions: {
    title: BilingualText;
    descEn: string;
    descZh: string;
  }[];
  commonPatterns: {
    name: BilingualText;
    symptomsEn: string;
    symptomsZh: string;
  }[];
  classicalQuote: ClassicalQuote;
  videoId?: string;
}

export interface QiClockHour {
  branchZh: string;
  branchPinyin: string;
  animalEn: string;
  timeRange: string;
  startHour: number; // 0-23
  endHour: number;
  organ: BilingualText;
  meridianCode: string;
  element: ElementKey;
  physiologicalActionEn: string;
  physiologicalActionZh: string;
  yangshengTipEn: string;
  yangshengTipZh: string;
}

export interface Acupoint {
  code: string; // e.g., "LI4", "ST36"
  name: BilingualText;
  etymologyEn: string;
  etymologyZh: string;
  meridianId: string;
  meridianName: BilingualText;
  element: ElementKey;
  categoryBadge: BilingualText; // e.g., Yuan-Source Point 原穴
  locationEn: string;
  locationZh: string;
  cunGuideEn: string;
  cunGuideZh: string;
  actions: BilingualText[];
  indicationsEn: string[];
  indicationsZh: string[];
  needlingEn: string;
  coords2D: {
    view: 'anterior' | 'posterior' | 'lateral';
    x: number; // 0-100 SVG percentage
    y: number; // 0-100 SVG percentage
  };
  coords3D: [number, number, number]; // x, y, z in 3D mannequin space
  videoUrl?: string;
}

export interface MeridianChannel {
  id: string; // e.g., "LU", "LI", "ST", "SP", "HT", "SI", "BL", "KI", "PC", "TE", "GB", "LR", "CV", "GV"
  name: BilingualText;
  fullTitle: BilingualText;
  polarity: 'Yin' | 'Yang';
  element: ElementKey;
  peakTime: string;
  flowDirectionEn: string;
  flowDirectionZh: string;
  pathwaySummaryEn: string;
  pathwaySummaryZh: string;
  svgPathAnterior?: string;
  svgPathPosterior?: string;
  svgInternalPath?: string;
  channelNodes?: {
    code: string;
    zh: string;
    x: number;
    y: number;
    view: 'anterior' | 'posterior';
  }[];
  points3D: [number, number, number][];
}

export interface TongueState {
  id: string;
  name: BilingualText;
  bodyColorHex: string;
  edgeStyle: 'normal' | 'scalloped' | 'thin' | 'swollen';
  coatColorHex: string;
  coatOpacity: number;
  coatTexture: 'thin' | 'thick-greasy' | 'peeled' | 'dry-cracked';
  clinicalMeaningEn: string;
  clinicalMeaningZh: string;
  associatedPattern: BilingualText;
  recommendedFormula: BilingualText;
}

export interface PulseType {
  id: string;
  name: BilingualText;
  frequencyHz: number;
  amplitude: number;
  sharpness: number;
  depthLevel: 'Superficial (浮)' | 'Middle (中)' | 'Deep (沉)';
  dicroticNotch: number;
  irregularity: number;
  tactileMetaphor: BilingualText;
  clinicalMeaningEn: string;
  clinicalMeaningZh: string;
}

export interface DiagnosticCase {
  id: string;
  title: BilingualText;
  patientProfileEn: string;
  patientProfileZh: string;
  symptoms: string[]; // symptom IDs
  tongueId: string;
  pulseId: string;
  eightPrinciples: {
    location: BilingualText; // Interior/Exterior
    nature: BilingualText; // Cold/Heat
    strength: BilingualText; // Deficiency/Excess
    root: BilingualText; // Yin/Yang
  };
  patternDiagnosis: BilingualText;
  pathomechanismEn: string;
  pathomechanismZh: string;
  treatmentPrinciple: BilingualText;
  recommendedFormulaId: string;
  recommendedAcupoints: string[];
}

export interface HerbItem {
  id: string;
  name: BilingualText;
  pharmaceuticalLatin: string;
  category: BilingualText;
  temperature: 'Cold (寒)' | 'Cool (凉)' | 'Neutral (平)' | 'Warm (温)' | 'Hot (热)';
  temperatureScore: number; // -2 (Cold) to +2 (Hot)
  flavors: ('Sweet (甘)' | 'Pungent (辛)' | 'Bitter (苦)' | 'Sour (酸)' | 'Salty (咸)' | 'Bland (淡)')[];
  flavorRadar: {
    sweet: number;
    pungent: number;
    bitter: number;
    sour: number;
    salty: number;
  };
  meridiansEntered: string[]; // e.g. ["Spleen 脾", "Lung 肺"]
  keyActions: BilingualText[];
  clinicalUsesEn: string;
  clinicalUsesZh: string;
  dosage: string;
  cautionsEn: string;
  cautionsZh: string;
  botanicalColor: string;
  visualDescriptionEn: string;
  visualDescriptionZh: string;
}

export interface FormulaRoleIngredient {
  herbId: string;
  herbName: BilingualText;
  role: 'Jun (君 Chief)' | 'Chen (臣 Deputy)' | 'Zuo (佐 Assistant)' | 'Shi (使 Envoy)';
  dosage: string;
  roleExplanationEn: string;
  roleExplanationZh: string;
}

export interface HerbalFormula {
  id: string;
  name: BilingualText;
  sourceText: BilingualText;
  category: BilingualText;
  actions: BilingualText;
  targetPattern: BilingualText;
  indicationsEn: string;
  indicationsZh: string;
  tongueAndPulseEn: string;
  tongueAndPulseZh: string;
  architecture: FormulaRoleIngredient[];
  synergyAnalysisEn: string;
  synergyAnalysisZh: string;
}

export interface CurriculumChapter {
  id: string;
  chapterNumber: number;
  title: BilingualText;
  subtitleEn: string;
  subtitleZh: string;
  targetModule: 'foundations' | 'meridians' | 'diagnostics' | 'materia-medica' | 'media-vault';
  keyTakeaways: BilingualText[];
  quizQuestion: {
    questionEn: string;
    questionZh: string;
    options: BilingualText[];
    correctIndex: number;
    explanationEn: string;
    explanationZh: string;
  };
}
