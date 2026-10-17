import { TongueState, PulseType, DiagnosticCase } from '@/types/tcm';

export const TONGUE_STATES: TongueState[] = [
  {
    id: 'normal',
    name: { zh: '淡红舌 · 薄白苔（正常舌象）', pinyin: 'Dàn Hóng Shé · Báo Bái Tái', en: 'Pale-Red Body · Thin White Coat (Healthy Norm)' },
    bodyColorHex: '#E07A84',
    edgeStyle: 'normal',
    coatColorHex: '#F8FAFC',
    coatOpacity: 0.35,
    coatTexture: 'thin',
    clinicalMeaningEn: 'Indicates harmonious Stomach Qi, abundant Qi and Blood, and balanced Yin-Yang ("Stomach Qi is steaming upward normally").',
    clinicalMeaningZh: '舌体淡红润泽、胖瘦适中，舌面上铺一层颗粒均匀、干湿适中的薄白苔，乃气血充盈、胃气旺盛之健康舌象。',
    associatedPattern: { zh: '平人（阴阳气血调和）', pinyin: 'Píng Rén', en: 'Balanced Constitution' },
    recommendedFormula: { zh: '无需用药，四时调摄养生', pinyin: 'Yǎng Shēng', en: 'Seasonal Dietary & Lifestyle Harmony' }
  },
  {
    id: 'pale-scalloped',
    name: { zh: '淡胖齿痕舌 · 薄白润苔', pinyin: 'Dàn Pàng Chǐ Hén Shé', en: 'Pale Swollen Body with Teeth Marks (Spleen Qi/Yang Deficiency)' },
    bodyColorHex: '#F3B8BE',
    edgeStyle: 'scalloped',
    coatColorHex: '#F8FAFC',
    coatOpacity: 0.45,
    coatTexture: 'thin',
    clinicalMeaningEn: 'Qi and Yang deficiency fail to transform water fluids; the waterlogged, boggy tongue swells against the dental arch, leaving scalloped indentations along the lateral borders.',
    clinicalMeaningZh: '阳气虚弱、运化失职，水湿内停浸泡舌体致舌质淡白胖嫩，受齿缘挤压而现明显齿痕（“齿痕舌”），多见于脾虚湿盛或阳虚水泛。',
    associatedPattern: { zh: '脾气虚弱 / 脾阳虚湿困证', pinyin: 'Pí Qì Xū Ruò', en: 'Spleen Qi & Yang Deficiency with Dampness' },
    recommendedFormula: { zh: '四君子汤 / 参苓白术散', pinyin: 'Sì Jūn Zǐ Tāng', en: 'Si Jun Zi Tang / Shen Ling Bai Zhu San' }
  },
  {
    id: 'red-yellow-greasy',
    name: { zh: '红舌 · 黄腻苔', pinyin: 'Hóng Shé · Huáng Nì Tái', en: 'Red Body · Thick Greasy Yellow Coat (Damp-Heat)' },
    bodyColorHex: '#C93B48',
    edgeStyle: 'swollen',
    coatColorHex: '#D97706',
    coatOpacity: 0.78,
    coatTexture: 'thick-greasy',
    clinicalMeaningEn: 'Pathogenic Heat combines with turbid Dampness or Phlegm in the Middle/Lower Jiao or Liver-Gallbladder. The coating is thick, slimy, and cannot be easily scraped off.',
    clinicalMeaningZh: '舌质红赤主热，苔黄而厚腻如涂油垢、刮之不去，主湿热内蕴、痰热交阻或食积化热（如肝胆湿热、脾胃湿热）。',
    associatedPattern: { zh: '肝胆湿热 / 中焦湿热蕴结证', pinyin: 'Shī Rè Yùn Jié', en: 'Damp-Heat Accumulating internally' },
    recommendedFormula: { zh: '龙胆泻肝汤 / 茵陈蒿汤', pinyin: 'Lóng Dǎn Xiè Gān Tāng', en: 'Long Dan Xie Gan Tang' }
  },
  {
    id: 'crimson-peeled',
    name: { zh: '红绛裂纹舌 · 少苔/镜面苔', pinyin: 'Hóng Jiàng Liè Wén Shé · Shǎo Tái', en: 'Crimson Cracked Body · Peeled/Scant Coat (Yin Deficiency Fire)' },
    bodyColorHex: '#A61C31',
    edgeStyle: 'thin',
    coatColorHex: '#FFF1F2',
    coatOpacity: 0.08,
    coatTexture: 'peeled',
    clinicalMeaningEn: 'Exhaustion of Stomach and Kidney Yin fluids fails to steam upward to generate a tongue coating, while Empty Heat (虚火) scorches the tongue body, producing fissures and a mirror-like dry surface.',
    clinicalMeaningZh: '胃肾阴液枯竭，无以熏蒸上潮故舌苔剥落殆尽（镜面舌），虚火内燔灼伤舌体故色泽红绛且生裂纹。',
    associatedPattern: { zh: '肝肾阴虚 / 阴虚火旺证', pinyin: 'Yīn Xū Huǒ Wàng', en: 'Kidney & Stomach Yin Deficiency with Empty Heat' },
    recommendedFormula: { zh: '六味地黄丸 / 知柏地黄丸', pinyin: 'Liù Wèi Dì Huáng Wán', en: 'Liu Wei Di Huang Wan' }
  },
  {
    id: 'purple-stasis',
    name: { zh: '青紫瘀斑舌 · 薄苔', pinyin: 'Qīng Zǐ Yū Bān Shé', en: 'Dusky Purple Body with Petechiae (Blood Stasis)' },
    bodyColorHex: '#7E4B7B',
    edgeStyle: 'normal',
    coatColorHex: '#E2E8F0',
    coatOpacity: 0.30,
    coatTexture: 'thin',
    clinicalMeaningEn: 'Impaired circulation of Qi and Blood (from chronic Qi stagnation, Cold congealing, or trauma) causes deoxygenated stagnation and dark purple macules/spots on the sides or tip.',
    clinicalMeaningZh: '全身或局部气血运行不畅，气滞血瘀或寒凝血脉，舌色紫暗或舌边尖呈现明显瘀点、瘀斑。',
    associatedPattern: { zh: '气滞血瘀 / 寒凝血瘀证', pinyin: 'Qì Zhì Xuè Yū', en: 'Qi Stagnation & Blood Stasis' },
    recommendedFormula: { zh: '血府逐瘀汤 / 桂枝茯苓丸', pinyin: 'Xuè Fǔ Zhú Yū Tāng', en: 'Xue Fu Zhu Yu Tang' }
  }
];

export const PULSE_TYPES: PulseType[] = [
  {
    id: 'normal',
    name: { zh: '平脉（缓和有力）', pinyin: 'Píng Mài', en: 'Normal Harmonious Pulse' },
    frequencyHz: 1.2,
    amplitude: 0.65,
    sharpness: 1.0,
    depthLevel: 'Middle (中)',
    dicroticNotch: 0.3,
    irregularity: 0,
    tactileMetaphor: {
      zh: '不浮不沉，一息四至，从容和缓，柔和有力（有胃、有神、有根）',
      pinyin: 'Yǒu Wèi, Yǒu Shén, Yǒu Gēn',
      en: '4 beats per breath (~72 bpm), neither floating nor deep, gentle yet rooted in the Chi position.'
    },
    clinicalMeaningEn: 'Possesses Stomach Qi (gentle rhythm), Spirit (supple vitality), and Root (felt clearly at the deep kidney position).',
    clinicalMeaningZh: '健康人之脉象，具备“胃、神、根”三要素，反映气血充盛、阴阳平衡。'
  },
  {
    id: 'floating',
    name: { zh: '浮脉', pinyin: 'Fú Mài', en: 'Floating / Superficial Pulse' },
    frequencyHz: 1.35,
    amplitude: 0.78,
    sharpness: 1.1,
    depthLevel: 'Superficial (浮)',
    dicroticNotch: 0.25,
    irregularity: 0,
    tactileMetaphor: {
      zh: '如水漂木，举之有余，按之不足',
      pinyin: 'Rú Shuǐ Piāo Mù',
      en: '"Like wood floating on water"—felt immediately with light touch, weakens when pressed deeply.'
    },
    clinicalMeaningEn: 'Indicates Exterior Syndromes (表证): Wei Qi rushes to the body surface to battle invading Wind-Cold or Wind-Heat.',
    clinicalMeaningZh: '主表证（亦主虚阳浮越）。外感风寒或风热袭表，卫阳抗邪于外，故脉气浮显于皮下。'
  },
  {
    id: 'deep',
    name: { zh: '沉脉', pinyin: 'Chén Mài', en: 'Deep / Sinking Pulse' },
    frequencyHz: 1.0,
    amplitude: 0.45,
    sharpness: 0.9,
    depthLevel: 'Deep (沉)',
    dicroticNotch: 0.15,
    irregularity: 0,
    tactileMetaphor: {
      zh: '如石投水，轻取不应，重按始得',
      pinyin: 'Rú Shí Tóu Shuǐ',
      en: '"Like a stone thrown into water"—barely perceptible on light touch, felt only when pressing down to the bone.'
    },
    clinicalMeaningEn: 'Indicates Interior Syndromes (里证): Deep and forceful = Interior Excess (cold/stagnation); Deep and weak = Interior Yang/Qi Deficiency.',
    clinicalMeaningZh: '主里证。有力为里实（寒凝气滞），无力为里虚（脏腑阳气虚衰，无力升举脉气）。'
  },
  {
    id: 'wiry',
    name: { zh: '弦脉', pinyin: 'Xián Mài', en: 'Wiry / Taut Pulse' },
    frequencyHz: 1.3,
    amplitude: 0.85,
    sharpness: 2.2,
    depthLevel: 'Middle (中)',
    dicroticNotch: 0.05,
    irregularity: 0,
    tactileMetaphor: {
      zh: '端直以长，如按琴弦',
      pinyin: 'Rú Àn Qín Xián',
      en: '"Like pressing the taut string of a Guqin zither"—straight, long, and stiffly springy against the fingers.'
    },
    clinicalMeaningEn: 'Classic pulse of Liver & Gallbladder Disharmony (肝胆病), Pain syndromes (痛证), Phlegm-Fluid retention (痰饮), or Liver Yang rising.',
    clinicalMeaningZh: '主肝胆病、诸痛证、痰饮。肝失疏泄，气机郁滞使得脉道拘急紧张，故指下如按琴弦。'
  },
  {
    id: 'slippery',
    name: { zh: '滑脉', pinyin: 'Huá Mài', en: 'Slippery / Rolling Pulse' },
    frequencyHz: 1.45,
    amplitude: 0.82,
    sharpness: 0.7,
    depthLevel: 'Middle (中)',
    dicroticNotch: 0.55,
    irregularity: 0,
    tactileMetaphor: {
      zh: '往来流利，应指圆滑，如盘走珠',
      pinyin: 'Rú Pán Zǒu Zhū',
      en: '"Like pearls rolling smoothly on a porcelain plate"—rounded, fluid, and gliding effortlessly under the fingertips.'
    },
    clinicalMeaningEn: 'Indicates Phlegm-Dampness (痰湿), Food Stagnation (食积), Excess Heat, or healthy pregnancy in women (喜脉) where Blood is abundant.',
    clinicalMeaningZh: '主痰饮、食滞、实热；亦见于青壮年气血充盛或妇人妊娠（“滑疾而散”之喜脉）。'
  },
  {
    id: 'thready-rapid',
    name: { zh: '细数脉', pinyin: 'Xì Shù Mài', en: 'Thready & Rapid Pulse' },
    frequencyHz: 1.85,
    amplitude: 0.35,
    sharpness: 1.5,
    depthLevel: 'Deep (沉)',
    dicroticNotch: 0.2,
    irregularity: 0,
    tactileMetaphor: {
      zh: '脉细如丝线而应指明显，一息五至以上',
      pinyin: 'Mài Xì Rú Sī, Yī Xī Liù Zhì',
      en: '"Thin as a silk thread yet distinct, beating >5–6 times per breath (>90 bpm)".'
    },
    clinicalMeaningEn: 'Hallmark of Yin & Blood Deficiency with Empty Heat (阴虚内热): depleted Yin fluids narrow the vessel stream ("Thready"), while deficiency fire accelerates the heart rate ("Rapid").',
    clinicalMeaningZh: '主阴虚火旺证。阴血亏虚不能充盈脉道故脉细如丝，虚热内扰加速血行故脉来急数。'
  }
];

export const DIAGNOSTIC_SYMPTOM_OPTIONS = [
  { id: 'sighing', category: 'Emotion & Head', label: { zh: '胸胁胀闷、善太息（常叹气）', pinyin: 'Shàn Tài Xī', en: 'Rib-side distension & frequent sighing' } },
  { id: 'irritability', category: 'Emotion & Head', label: { zh: '急躁易怒 / 情绪抑郁波动', pinyin: 'Jí Zào Yì Nù', en: 'Irritability, stress & mood swings' } },
  { id: 'bitter-mouth', category: 'Emotion & Head', label: { zh: '口苦咽干、目赤头晕', pinyin: 'Kǒu Kǔ Mù Chì', en: 'Bitter taste in mouth, red eyes & dizziness' } },
  { id: 'fatigue', category: 'Digestion & Qi', label: { zh: '神疲乏力、少气懒言', pinyin: 'Shén Pí Fá Lì', en: 'Chronic fatigue & low voice' } },
  { id: 'bloating', category: 'Digestion & Qi', label: { zh: '食少纳呆、餐后腹胀', pinyin: 'Shí Shǎo Fù Zhàng', en: 'Poor appetite & post-meal bloating' } },
  { id: 'loose-stools', category: 'Digestion & Qi', label: { zh: '大便溏薄不成形', pinyin: 'Dà Biàn Táng Báo', en: 'Loose or unformed stools' } },
  { id: 'heavy-limbs', category: 'Digestion & Qi', label: { zh: '头重如裹、肢体困重', pinyin: 'Tóu Zhòng Rú Guǒ', en: 'Heavy head & sluggish limbs' } },
  { id: 'night-sweats', category: 'Sleep & Thermal', label: { zh: '五心烦热、潮热盗汗', pinyin: 'Wǔ Xīn Fán Rè, Dào Hàn', en: 'Five-palm heat & night sweats' } },
  { id: 'insomnia', category: 'Sleep & Thermal', label: { zh: '心烦失眠、多梦易醒', pinyin: 'Xīn Fán Shī Mián', en: 'Restless insomnia & vivid dreams' } },
  { id: 'back-tinnitus', category: 'Lower Jiao & Bones', label: { zh: '腰膝酸软、耳鸣健忘', pinyin: 'Yāo Xī Suān Ruǎn, Ěr Míng', en: 'Sore lower back/knees & tinnitus' } },
  { id: 'cold-limbs', category: 'Sleep & Thermal', label: { zh: '畏寒肢冷、夜尿频多清长', pinyin: 'Wèi Hán Zhī Lěng', en: 'Aversion to cold, icy hands/feet & nocturia' } },
  { id: 'stabbing-pain', category: 'Circulation', label: { zh: '痛处固定如针刺、夜间尤甚', pinyin: 'Tòng Rú Zhēn Cì', en: 'Fixed stabbing pain worse at night' } }
];

export const DIAGNOSTIC_CASES: DiagnosticCase[] = [
  {
    id: 'liver-spleen-disharmony',
    title: { zh: '肝郁脾虚证（木乘土）', pinyin: 'Gān Yù Pí Xū Zhèng', en: 'Liver Qi Stagnation Invading the Spleen (Wood Overacting on Earth)' },
    patientProfileEn: '34-year-old software engineer experiencing high work stress, frequent sighing, rib-side tightness, post-meal bloating, and loose stools whenever deadlines approach.',
    patientProfileZh: '34岁程序员，长期工作高压，常见胸胁胀闷、善太息，每逢紧张则腹痛腹泻、食后腹胀、倦怠乏力。',
    symptoms: ['sighing', 'irritability', 'fatigue', 'bloating', 'loose-stools'],
    tongueId: 'pale-scalloped',
    pulseId: 'wiry',
    eightPrinciples: {
      location: { zh: '里证', pinyin: 'Lǐ Zhèng', en: 'Interior' },
      nature: { zh: '寒热错杂 / 平', pinyin: 'Píng', en: 'Neutral / Mixed' },
      strength: { zh: '本虚标实（脾虚肝郁）', pinyin: 'Běn Xū Biāo Shí', en: 'Root Deficiency (Spleen) with Branch Excess (Liver Stagnation)' },
      root: { zh: '气机失调', pinyin: 'Qì Jī', en: 'Qi Dynamic Disharmony' }
    },
    patternDiagnosis: { zh: '肝郁血虚脾弱证', pinyin: 'Gān Yù Pí Xū Zhèng', en: 'Liver Constraint with Spleen Deficiency' },
    pathomechanismEn: 'Emotional stress constrains Liver Wood (肝失疏泄), causing it to horizontally bully Spleen Earth (木乘土). The Spleen loses its power to transform food and fluids, resulting in bloating, fatigue, and scalloped tongue edges, while Liver stagnation produces a wiry pulse.',
    pathomechanismZh: '情志不遂致肝气郁结、疏泄失职，横逆克伐脾土（木乘土），脾失健运则食少腹胀便溏、舌边齿痕，肝郁则脉弦。',
    treatmentPrinciple: { zh: '疏肝解郁，健脾养血', pinyin: 'Shū Gān Jiàn Pí', en: 'Course the Liver, Release Constraint, Fortify the Spleen & Nourish Blood' },
    recommendedFormulaId: 'xiao-yao-san',
    recommendedAcupoints: ['LR3', 'ST36', 'SP6', 'PC6']
  },
  {
    id: 'spleen-qi-dampness',
    title: { zh: '脾虚湿盛证', pinyin: 'Pí Xū Shī Shèng Zhèng', en: 'Spleen Qi Deficiency with Internal Dampness' },
    patientProfileEn: '42-year-old teacher who drinks iced beverages daily, complaining of chronic afternoon exhaustion, bloating after small meals, heavy limbs, and loose stools.',
    patientProfileZh: '42岁教师，嗜饮冰水，长期午后倦怠乏力、少气懒言、食后脘腹胀满、四肢沉重、大便溏薄。',
    symptoms: ['fatigue', 'bloating', 'loose-stools', 'heavy-limbs'],
    tongueId: 'pale-scalloped',
    pulseId: 'slippery',
    eightPrinciples: {
      location: { zh: '里证', pinyin: 'Lǐ Zhèng', en: 'Interior' },
      nature: { zh: '虚寒夹湿', pinyin: 'Xū Hán Jiā Shī', en: 'Deficiency Cold with Dampness' },
      strength: { zh: '虚证夹湿', pinyin: 'Xū Zhèng', en: 'Deficiency (with Damp Accumulation)' },
      root: { zh: '阳气虚（太阴病）', pinyin: 'Yáng Qì Xū', en: 'Yang / Qi Deficiency' }
    },
    patternDiagnosis: { zh: '脾胃气虚夹湿证', pinyin: 'Pí Wèi Qì Xū', en: 'Spleen & Stomach Qi Deficiency with Dampness' },
    pathomechanismEn: 'Cold raw diet and overthinking injure Spleen Qi. When the Spleen fails to transport and transform (脾失健运), clear Qi cannot ascend (fatigue) and water-dampness pools internally (scalloped tongue, heavy limbs, loose stools).',
    pathomechanismZh: '饮食生冷或思虑过度损伤脾气，脾失健运则水谷不化精微反聚为湿，清阳不升故神疲头重，水湿浸渍故舌胖有齿痕。',
    treatmentPrinciple: { zh: '益气健脾，渗湿止泻', pinyin: 'Yì Qì Jiàn Pí, Shèn Shī', en: 'Tonify Qi, Strengthen the Spleen & Percolate Dampness' },
    recommendedFormulaId: 'si-jun-zi-tang',
    recommendedAcupoints: ['ST36', 'SP6', 'CV4']
  },
  {
    id: 'kidney-yin-deficiency',
    title: { zh: '肝肾阴虚 · 虚火上炎证', pinyin: 'Gān Shèn Yīn Xū Zhèng', en: 'Kidney & Liver Yin Deficiency with Empty Heat' },
    patientProfileEn: '51-year-old executive working late nights for years, presenting with sore lower back, high-pitched tinnitus, night sweats, hot palms/soles at night, and insomnia.',
    patientProfileZh: '51岁企业高管，常年熬夜操劳，近半年出现腰膝酸软、耳鸣如蝉、五心烦热、夜间盗汗、失眠口干。',
    symptoms: ['night-sweats', 'insomnia', 'back-tinnitus'],
    tongueId: 'crimson-peeled',
    pulseId: 'thready-rapid',
    eightPrinciples: {
      location: { zh: '里证', pinyin: 'Lǐ Zhèng', en: 'Interior' },
      nature: { zh: '虚热证', pinyin: 'Xū Rè Zhèng', en: 'Deficiency Heat (Empty Fire)' },
      strength: { zh: '虚证', pinyin: 'Xū Zhèng', en: 'Deficiency' },
      root: { zh: '阴虚（少阴阴虚）', pinyin: 'Yīn Xū', en: 'Yin Deficiency' }
    },
    patternDiagnosis: { zh: '肾阴亏虚 · 虚火内扰证', pinyin: 'Shèn Yīn Kuī Xū', en: 'Kidney Yin Deficiency with Empty Fire' },
    pathomechanismEn: 'Chronic overwork and late sleep deplete Kidney Water (肾水亏虚). Marrow and bones lose nourishment (sore back, tinnitus), and Yin can no longer anchor Yang at night, causing Empty Fire to flare (night sweats, crimson peeled tongue, thready-rapid pulse).',
    pathomechanismZh: '久病熬夜耗伤真阴，腰府失养故腰膝酸软，脑髓失充故耳鸣，阴不制阳、虚火内蒸故见五心烦热、盗汗、舌红少苔、脉细数。',
    treatmentPrinciple: { zh: '滋补肝肾，育阴潜阳', pinyin: 'Zī Bǔ Gān Shèn', en: 'Nourish Liver & Kidney Yin and Subdue Empty Fire' },
    recommendedFormulaId: 'liu-wei-di-huang-wan',
    recommendedAcupoints: ['KI1', 'SP6', 'BL23', 'PC6']
  },
  {
    id: 'liver-gallbladder-damp-heat',
    title: { zh: '肝胆湿热 / 肝火上炎证', pinyin: 'Gān Dǎn Shī Rè Zhèng', en: 'Liver-Gallbladder Fire & Damp-Heat' },
    patientProfileEn: '38-year-old patient with high alcohol/spicy food intake presenting with bitter taste on waking, red eyes, temporal throbbing headache, explosive irritability, and rib-side fullness.',
    patientProfileZh: '38岁患者，嗜食辛辣饮酒，晨起口苦咽干、面红目赤、偏头痛胀痛、急躁易怒、胸胁苦满、小便黄赤。',
    symptoms: ['bitter-mouth', 'irritability', 'sighing', 'heavy-limbs'],
    tongueId: 'red-yellow-greasy',
    pulseId: 'wiry',
    eightPrinciples: {
      location: { zh: '里证（少阳/厥阴）', pinyin: 'Lǐ Zhèng', en: 'Interior' },
      nature: { zh: '实热夹湿', pinyin: 'Shí Rè Jiā Shī', en: 'Excess Heat & Dampness' },
      strength: { zh: '实证', pinyin: 'Shí Zhèng', en: 'Excess' },
      root: { zh: '阳盛热实', pinyin: 'Yáng Shèng', en: 'Yang Excess' }
    },
    patternDiagnosis: { zh: '肝胆实火湿热循经上炎证', pinyin: 'Gān Dǎn Shī Rè', en: 'Liver-Gallbladder Fire & Damp-Heat Blazing Upward' },
    pathomechanismEn: 'Unresolved Liver constraint combines with alcohol/greasy food to generate blazing Fire and Damp-Heat in the Liver and Gallbladder channels, forcing Gallbladder Qi upward (bitter taste, temporal headache, red tongue with greasy yellow fur).',
    pathomechanismZh: '肝郁化火，加之嗜酒肥甘助湿生热，湿热郁蒸肝胆，胆气上溢则口苦，循经上攻则头痛目赤，舌红苔黄腻、脉弦数有力。',
    treatmentPrinciple: { zh: '清泻肝胆实火，清利肝经湿热', pinyin: 'Qīng Xiè Gān Dǎn', en: 'Drain Liver-Gallbladder Fire & Clear Damp-Heat' },
    recommendedFormulaId: 'xiao-chai-hu-tang',
    recommendedAcupoints: ['LR3', 'GB20', 'LI4']
  }
];
