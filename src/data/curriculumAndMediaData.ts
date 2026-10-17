import { CurriculumChapter, VideoResource } from '@/types/tcm';

export const CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'ch1-yinyang-wuxing',
    chapterNumber: 1,
    title: { zh: '第一章：阴阳五行与气血津液', pinyin: 'Yīn Yáng Wǔ Xíng Yǔ Qì Xuè', en: 'Ch 1: Yin-Yang, Wu Xing & Vital Substances' },
    subtitleEn: 'Understand how TCM models the body as a dynamic ecosystem through Generating (相生) and Controlling (相克) cycles.',
    subtitleZh: '掌握阴阳消长、五行生克乘侮规律，以及气、血、津液、精四大生命物质。',
    targetModule: 'foundations',
    keyTakeaways: [
      { zh: '阴阳互根互用，消长平衡', pinyin: 'Yīn Yáng Hù Gēn', en: 'Yin (structure/cooling/fluid) and Yang (function/warming/qi) are mutually rooted.' },
      { zh: '五行相生相克，制则生化', pinyin: 'Shēng Kè Zhì Huà', en: 'Harmony requires both Generation (相生) and Control (相克); without control, excess causes damage (亢则害，承乃制).' },
      { zh: '气为血之帅，血为气之母', pinyin: 'Qì Wéi Xuè Zhī Shuài', en: 'Qi is the Commander of Blood (moves & holds it); Blood is the Mother of Qi (anchors & nourishes it).' }
    ],
    quizQuestion: {
      questionEn: 'When chronic emotional stress causes Liver Wood to bully Spleen Earth, resulting in rib-side distension and post-meal bloating/loose stools, what is this Five-Element relationship called?',
      questionZh: '情志不遂导致肝木横逆克伐脾土（胸胁胀满、腹痛腹泻），在五行学说中称为什么传变规律？',
      options: [
        { zh: '木乘土（相乘）', pinyin: 'Mù Chéng Tǔ', en: 'Wood Overacting on Earth (Xiang Cheng)' },
        { zh: '木侮金（相侮）', pinyin: 'Mù Wǔ Jīn', en: 'Wood Counter-acting on Metal (Xiang Wu)' },
        { zh: '母病及子', pinyin: 'Mǔ Bìng Jí Zǐ', en: 'Mother Affecting Child' },
        { zh: '水不涵木', pinyin: 'Shuǐ Bù Hán Mù', en: 'Water Failing to Nourish Wood' }
      ],
      correctIndex: 0,
      explanationEn: 'Because Wood naturally controls Earth (木克土), excessive Wood bullying Earth beyond normal bounds is called Overacting (相乘 / 木乘土).',
      explanationZh: '正常情况下木克土；当肝木过亢或脾土本虚，克制太过而致病，称为“相乘”（木乘土/肝气犯脾）。'
    }
  },
  {
    id: 'ch2-zangfu-qiclock',
    chapterNumber: 2,
    title: { zh: '第二章：藏象学说与子午流注', pinyin: 'Zàng Xiàng Yǔ Zǐ Wǔ Liú Zhù', en: 'Ch 2: Zang-Fu Systems & 24-Hour Qi Clock' },
    subtitleEn: 'Bridge Western anatomical organs with TCM functional systems and circadian meridian rhythms.',
    subtitleZh: '对比中西医脏腑概念差异，理解五脏藏精气而不泻、六腑传化物而不藏及十二时辰气血当令。',
    targetModule: 'foundations',
    keyTakeaways: [
      { zh: '肾为先天之本，脾为后天之本', pinyin: 'Xiān Tiān Yǔ Hòu Tiān', en: 'The Kidney is the Pre-Natal Root (Essence/Jing); the Spleen is the Post-Natal Root (Gu Qi/Digestion).' },
      { zh: '肝主疏泄，心主神明，肺朝百脉', pinyin: 'Gān Shū Xiè, Xīn Shén Míng', en: 'Liver courses Qi & stores Blood; Heart houses Spirit (Shen); Lung governs respiration & Wei Qi.' },
      { zh: '子午流注：顺时养生', pinyin: 'Zǐ Wǔ Liú Zhù', en: 'Qi peaks in each of the 12 meridians for a 2-hour window every day (e.g., Gallbladder 23:00–01:00, Liver 01:00–03:00).' }
    ],
    quizQuestion: {
      questionEn: 'In TCM, which two Zang organs are revered respectively as the "Pre-Natal Root" (先天之本) and the "Post-Natal Root" (后天之本)?',
      questionZh: '中医学中，分别被称为“先天之本”与“后天之本”的两个核心脏腑是？',
      options: [
        { zh: '心与肺', pinyin: 'Xīn yǔ Fèi', en: 'Heart and Lung' },
        { zh: '肾与脾', pinyin: 'Shèn yǔ Pí', en: 'Kidney and Spleen' },
        { zh: '肝与肾', pinyin: 'Gān yǔ Shèn', en: 'Liver and Kidney' },
        { zh: '脾与胃', pinyin: 'Pí yǔ Wèi', en: 'Spleen and Stomach' }
      ],
      correctIndex: 1,
      explanationEn: 'The Kidney stores congenital Essence (先天之精), while the Spleen transforms food and drink after birth to replenish Qi and Blood (后天气血生化之源).',
      explanationZh: '肾藏先天之精，主生长发育生殖，为“先天之本”；脾主运化水谷精微以化生气血，为“后天之本”。'
    }
  },
  {
    id: 'ch3-meridians-acupoints',
    chapterNumber: 3,
    title: { zh: '第三章：十二正经、奇经八脉与核心要穴', pinyin: 'Jīng Luò Yǔ Shù Xué', en: 'Ch 3: Meridians & High-Yield Acupoints' },
    subtitleEn: 'Explore the 3D & 2D pathways of Qi flow and master the classical Command Points (四总穴) and Four Gates (四关穴).',
    subtitleZh: '立体掌握手足三阴三阳走向规律、任督二脉及临床最常用的九大核心穴位。',
    targetModule: 'meridians',
    keyTakeaways: [
      { zh: '手之三阴从胸走手，手之三阳从手走头', pinyin: 'Shǒu Sān Yīn Sān Yáng', en: 'Hand Yin channels flow Chest → Hand; Hand Yang channels flow Hand → Head.' },
      { zh: '足之三阳从头走足，足之三阴从足走腹胸', pinyin: 'Zú Sān Yáng Sān Yīn', en: 'Foot Yang channels flow Head → Foot; Foot Yin channels flow Foot → Abdomen/Chest.' },
      { zh: '肚腹三里留，面口合谷收，合谷配太冲名曰“开四关”', pinyin: 'Sì Zǒng Xué Yǔ Sì Guān', en: 'ST36 commands the abdomen; LI4 commands the face/mouth; LI4 + LR3 open the "Four Gates" of Qi and Blood.' }
    ],
    quizQuestion: {
      questionEn: 'Which classical acupoint pair is known as "Opening the Four Gates" (开四关) to powerfully course Qi and Blood throughout the body?',
      questionZh: '临床上被称为“开四关”（一气一血、一阳一阴，大开周身气机）的经典配穴是？',
      options: [
        { zh: '足三里 (ST36) + 三阴交 (SP6)', pinyin: 'Zú Sān Lǐ + Sān Yīn Jiāo', en: 'Zusanli (ST36) + Sanyinjiao (SP6)' },
        { zh: '合谷 (LI4) + 太冲 (LR3)', pinyin: 'Hé Gǔ + Tài Chōng', en: 'Hegu (LI4) + Taichong (LR3)' },
        { zh: '内关 (PC6) + 外关 (TE5)', pinyin: 'Nèi Guān + Wài Guān', en: 'Neiguan (PC6) + Waiguan (TE5)' },
        { zh: '百会 (GV20) + 涌泉 (KI1)', pinyin: 'Bǎi Huì + Yǒng Quán', en: 'Baihui (GV20) + Yongquan (KI1)' }
      ],
      correctIndex: 1,
      explanationEn: 'Bilateral LI4 (Hegu - Yangming Qi) and bilateral LR3 (Taichong - Jueyin Blood) form the four gates of the upper and lower extremities.',
      explanationZh: '双侧合谷（手阳明原穴，主气）配伍双侧太冲（足厥阴原穴，主血），合称四关穴，善治一切气机郁滞与痛证。'
    }
  },
  {
    id: 'ch4-diagnostics-bianzheng',
    chapterNumber: 4,
    title: { zh: '第四章：四诊合参（舌诊脉诊）与八纲辨证', pinyin: 'Sì Zhěn Yǔ Biàn Zhèng', en: 'Ch 4: Tongue/Pulse Diagnostics & Pattern Differentiation' },
    subtitleEn: 'Read the tongue zones, feel pulse waveforms, and synthesize symptoms into a root Pattern (证候).',
    subtitleZh: '学会观察舌质舌苔、体悟寸关尺脉象波形，运用八纲与脏腑辨证推导病机。',
    targetModule: 'diagnostics',
    keyTakeaways: [
      { zh: '舌尖候心肺，舌中候脾胃，舌边候肝胆，舌根候肾', pinyin: 'Shé Zhěn Fēn Qū', en: 'Tongue Tip = Heart/Lung; Center = Spleen/Stomach; Sides = Liver/GB; Root = Kidney.' },
      { zh: '舌质察脏腑气血虚实，舌苔察病邪深浅与胃气', pinyin: 'Shé Zhì Yǔ Shé Tái', en: 'Tongue Body color/shape shows Zang-Fu Qi/Blood state; Tongue Coating shows pathogenic factor & Stomach Qi.' },
      { zh: '同病异治，异病同治：治病必求于本（证候）', pinyin: 'Biàn Zhèng Lùn Zhì', en: 'TCM treats the underlying Pattern (Zheng 证), not just the isolated symptom.' }
    ],
    quizQuestion: {
      questionEn: 'What does a Pale, Swollen tongue with scalloped teeth marks (淡胖齿痕舌) primarily indicate?',
      questionZh: '患者舌体淡白胖大、舌边有明显齿痕（淡胖齿痕舌），最常提示何种证候？',
      options: [
        { zh: '肝胆湿热内蕴', pinyin: 'Gān Dǎn Shī Rè', en: 'Liver-Gallbladder Damp-Heat' },
        { zh: '脾气虚弱 / 阳虚水湿内停', pinyin: 'Pí Qì Xū / Shuǐ Shī Nèi Tíng', en: 'Spleen Qi/Yang Deficiency with Fluid-Dampness Retention' },
        { zh: '肝肾阴虚火旺', pinyin: 'Yīn Xū Huǒ Wàng', en: 'Kidney Yin Deficiency with Empty Heat' },
        { zh: '气滞血瘀', pinyin: 'Qì Zhì Xuè Yū', en: 'Qi Stagnation & Blood Stasis' }
      ],
      correctIndex: 1,
      explanationEn: 'When Spleen Qi/Yang is deficient, water-dampness is not transformed and swells the tongue body against the teeth.',
      explanationZh: '脾气虚或阳虚不能运化水湿，水湿浸渍舌体致胖大娇嫩，受牙齿挤压形成齿痕。'
    }
  },
  {
    id: 'ch5-herbs-formulas',
    chapterNumber: 5,
    title: { zh: '第五章：本草四气五味与方剂君臣佐使', pinyin: 'Běn Cǎo Yǔ Fāng Jì', en: 'Ch 5: Materia Medica & Formula Architecture (君臣佐使)' },
    subtitleEn: 'Deconstruct classical herbal formulas and understand how Chief, Deputy, Assistant, and Envoy herbs synergize.',
    subtitleZh: '理解中药寒热温凉四气、酸苦甘辛咸五味及方剂“君臣佐使”配伍之道。',
    targetModule: 'materia-medica',
    keyTakeaways: [
      { zh: '四气（寒热温凉）定阴阳属性，五味（辛甘酸苦咸）定作用趋向', pinyin: 'Sì Qì Wǔ Wèi', en: 'Pungent disperses/moves; Sweet tonifies/harmonizes; Sour astringes; Bitter drains/dries; Salty softens.' },
      { zh: '君药针对主病主证，臣药辅助君药，佐药佐助或反佐制毒，使药引经调和', pinyin: 'Jūn Chén Zuǒ Shǐ', en: 'Classical formulas are architectural teams (Chief 君, Deputy 臣, Assistant 佐, Envoy 使), never random herb lists.' },
      { zh: '六味地黄丸之“三补三泻”，四君子汤之“寓渗于补”', pinyin: 'Bǔ Zhōng Yǒu Xiè', en: 'Great tonic formulas pair tonifying herbs with draining/moving herbs so nourishment never stagnates.' }
    ],
    quizQuestion: {
      questionEn: 'In Liu Wei Di Huang Wan (六味地黄丸), why are Alisma (泽泻), Moutan (牡丹皮), and Poria (茯苓) included alongside the three tonifying herbs?',
      questionZh: '《六味地黄丸》在重用熟地、山茱萸、山药“三补”的同时，为何配伍泽泻、丹皮、茯苓“三泻”？',
      options: [
        { zh: '发汗解表以散风寒', pinyin: 'Fā Hàn Jiě Biǎo', en: 'To induce sweating and release exterior Wind-Cold' },
        { zh: '补中有泻，泄浊清虚火、渗脾湿，防滋腻恋邪', pinyin: 'Bǔ Zhōng Yǒu Xiè', en: 'To clear turbidity, empty heat, and dampness so the rich Yin tonics do not cloy' },
        { zh: '温补命门真火', pinyin: 'Wēn Bǔ Mìng Mén', en: 'To strongly warm Mingmen Yang Fire' },
        { zh: '破血逐瘀通经', pinyin: 'Pò Xuè Zhú Yū', en: 'To forcefully break severe blood stasis' }
      ],
      correctIndex: 1,
      explanationEn: 'Known as the "Three Drainers" (三泻), they prevent the rich tonics (especially Shu Di Huang) from creating cloying dampness while clearing Empty Fire.',
      explanationZh: '“三泻”配“三补”，泻肾浊以防熟地滋腻、清肝火以助山茱萸、渗脾湿以助山药，达致“补而不滞”之妙。'
    }
  }
];

export const CURATED_VIDEOS: VideoResource[] = [
  {
    id: 'vid-bucm-foundations',
    videoId: 'BV11WD2Y6ENv',
    titleZh: '《中医基础理论》全套精品课（绪论、阴阳五行、藏象、气血津液）',
    titleEn: 'TCM Foundations Master Course: Holism, Yin-Yang, Wu Xing & Zang-Fu',
    speaker: '北京中医药大学中医基础理论教研室',
    institution: 'Beijing University of Chinese Medicine (北京中医药大学)',
    platform: 'Bilibili',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV11WD2Y6ENv&page=1&high_quality=1&danmaku=0&autoplay=0',
    watchUrl: 'https://www.bilibili.com/video/BV11WD2Y6ENv/',
    duration: '75 Lectures',
    episodesCount: '75集全',
    topicTag: 'Foundations · 中医基础',
    descriptionEn: 'Complete Beijing University of Chinese Medicine curriculum covering Holistic Philosophy (整体观念), Pattern Differentiation (辨证论治), Yin-Yang, Five Elements, Zang-Fu, and Qi-Blood-Fluids.',
    descriptionZh: '北京中医药大学精品课程（BV11WD2Y6ENv），系统精讲中医学哲学基础、阴阳五行生克乘侮、五脏六腑藏象及气血津液神。',
    thumbnailIllustration: '/images/wuxing_scroll.jpg'
  },
  {
    id: 'vid-stanford-lao-tcm',
    videoId: 'bd_bzKPMqoA',
    titleZh: '斯坦福大学医学讲座：传统中医学导论（英文主讲：劳力行教授）',
    titleEn: 'Stanford University Lecture: Introduction to Traditional Chinese Medicine',
    speaker: 'Prof. Lixing Lao (劳力行教授, PhD, MB, LAc)',
    institution: 'Stanford Center for Asian Health Research & Education (CARE)',
    platform: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/bd_bzKPMqoA',
    watchUrl: 'https://www.youtube.com/watch?v=bd_bzKPMqoA',
    duration: '57:54',
    episodesCount: 'Full Keynote',
    topicTag: 'Foundations · 英文导论',
    descriptionEn: 'Delivered in English at Stanford Medicine by Dr. Lixing Lao (President of Virginia University of Integrative Medicine & former Director at HKU School of Chinese Medicine), bridging classical TCM theory with modern clinical evidence.',
    descriptionZh: '劳力行教授（原香港大学中医药学院院长）于斯坦福大学医学院全英文主讲（YouTube ID: bd_bzKPMqoA），深入浅出地用现代医学语言阐释阴阳、气血、经络与针灸循证医学。',
    thumbnailIllustration: '/images/wuxing_scroll.jpg'
  },
  {
    id: 'vid-shixuemin-acupuncture',
    videoId: 'BV1AH4y1E7Px',
    titleZh: '国医大师石学敏院士《针灸学》全套精讲课程（经络总论与临床刺灸）',
    titleEn: 'Grandmaster Academician Shi Xuemin: Complete Acupuncture & Moxibustion',
    speaker: '石学敏院士 (Academician Shi Xuemin)',
    institution: 'Tianjin University of Traditional Chinese Medicine (天津中医药大学)',
    platform: 'Bilibili',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1AH4y1E7Px&page=1&high_quality=1&danmaku=0&autoplay=0',
    watchUrl: 'https://www.bilibili.com/video/BV1AH4y1E7Px/',
    duration: '52 Lectures',
    episodesCount: '52集全',
    topicTag: 'Meridians · 针灸大师课',
    descriptionEn: 'Taught by Academician Shi Xuemin ("醒脑开窍" founder), demonstrating meridian theory, acupoint selection, and clinical needling manipulations.',
    descriptionZh: '中国工程院院士、国医大师石学敏领衔主讲（BV1AH4y1E7Px，共52集），涵盖经络腧穴总论、刺灸手法与临床辨证配穴。',
    thumbnailIllustration: '/images/meridian_scroll.jpg'
  },
  {
    id: 'vid-cdutcm-meridians',
    videoId: 'BV17N411M7sA',
    titleZh: '成都中医药大学《针灸学·经络腧穴各论》十二正经与奇经八脉定位实操',
    titleEn: 'CDUTCM Meridians & Acupoints Atlas: 12 Primary Channels & Point Location',
    speaker: '成都中医药大学针灸推拿学院',
    institution: 'Chengdu University of TCM (成都中医药大学)',
    platform: 'Bilibili',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV17N411M7sA&page=1&high_quality=1&danmaku=0&autoplay=0',
    watchUrl: 'https://www.bilibili.com/video/BV17N411M7sA/',
    duration: '36 Lectures',
    episodesCount: '36集全',
    topicTag: 'Meridians · 经络取穴',
    descriptionEn: 'Step-by-step anatomical surface tracing and proportional bone-cun (骨度分寸) location of key acupoints along the 12 primary channels and Ren/Du vessels.',
    descriptionZh: '成都中医药大学《针灸学》课程（BV17N411M7sA），详尽演示十二正经循行路线与合谷、足三里、太冲、内关、三阴交等体表定位。',
    thumbnailIllustration: '/images/meridian_scroll.jpg'
  },
  {
    id: 'vid-licandong-diagnostics',
    videoId: 'BV1GYT4zcEAh',
    titleZh: '李灿东教授《中医诊断学》全集（望舌、切脉、八纲与脏腑辨证）',
    titleEn: 'Prof. Li Candong: TCM Diagnostics (Tongue Inspection, Pulse & Pattern Diff)',
    speaker: '李灿东教授 (Prof. Li Candong)',
    institution: 'Fujian University of TCM (福建中医药大学)',
    platform: 'Bilibili',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1GYT4zcEAh&page=1&high_quality=1&danmaku=0&autoplay=0',
    watchUrl: 'https://www.bilibili.com/video/BV1GYT4zcEAh/',
    duration: '128 Lectures',
    episodesCount: '128集全',
    topicTag: 'Diagnostics · 中医诊断学',
    descriptionEn: 'National key textbook chief editor Prof. Li Candong walks through visual tongue inspection (望舌质舌苔), 28 pulse waveforms (二十八脉), Eight Principles (八纲), and Zang-Fu pattern differentiation.',
    descriptionZh: '国家级规划教材《中医诊断学》主编李灿东教授亲授（BV1GYT4zcEAh，128集全），深入剖析四诊合参、临床舌象图谱、寸关尺脉诊与辨证思维。',
    thumbnailIllustration: '/images/diagnostics_scroll.jpg'
  },
  {
    id: 'vid-cmu-yen-english-tcm',
    videoId: 'j5-dCB8WaqM',
    titleZh: '中国医药大学（台湾）全英文公开课：中医核心概念与四诊辨证',
    titleEn: 'China Medical University (English): Basic Concepts & Clinical Diagnostics in TCM',
    speaker: 'Prof. Hung-Rong Yen (颜宏融教授, MD, PhD)',
    institution: 'China Medical University, Taiwan (中国医药大学)',
    platform: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/j5-dCB8WaqM',
    watchUrl: 'https://www.youtube.com/watch?v=j5-dCB8WaqM',
    duration: '18:45',
    episodesCount: 'English MOOC',
    topicTag: 'Diagnostics · 英文课程',
    descriptionEn: 'English-language university lecture by Prof. Hung-Rong Yen (Dean of College of Chinese Medicine, CMU) introducing Qi, Yin-Yang, and how TCM physicians synthesize signs into Patterns.',
    descriptionZh: '台湾中国医药大学中医学院院长颜宏融教授全英文授课（YouTube ID: j5-dCB8WaqM），非常适合中英双语对照理解中医病机与现代临床结合。',
    thumbnailIllustration: '/images/diagnostics_scroll.jpg'
  },
  {
    id: 'vid-zhangtingmo-materia-medica',
    videoId: 'BV1Yx411m7DD',
    titleZh: '张廷模教授《中药学》78集全（四气五味、升降浮沉与道地本草精讲）',
    titleEn: 'Prof. Zhang Tingmo: Classical Materia Medica (78-Lecture Masterclass)',
    speaker: '张廷模教授 (Prof. Zhang Tingmo)',
    institution: 'Chengdu University of TCM (成都中医药大学)',
    platform: 'Bilibili',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1Yx411m7DD&page=1&high_quality=1&danmaku=0&autoplay=0',
    watchUrl: 'https://www.bilibili.com/video/BV1Yx411m7DD/',
    duration: '78 Lectures',
    episodesCount: '78集全',
    topicTag: 'Materia Medica · 中药学神作',
    descriptionEn: 'Widely regarded as the gold-standard Chinese herbal medicine lecture series. Covers Four Natures, Five Flavors, processing (炮制), and clinical nuances of over 300 herbs.',
    descriptionZh: '中医界公认殿堂级《中药学》课程（BV1Yx411m7DD，张廷模教授主讲，78集全），详析中药性能、配伍禁忌及各章道地药材临床鉴别。',
    thumbnailIllustration: '/images/materia_medica_scroll.jpg'
  },
  {
    id: 'vid-dengzhongjia-formulas',
    videoId: 'BV1zP411k7W2',
    titleZh: '邓中甲教授《方剂学》82讲全（君臣佐使配伍艺术与经典名方拆解）',
    titleEn: 'Prof. Deng Zhongjia: Formula Architecture & Classical Prescriptions (82 Lectures)',
    speaker: '邓中甲教授 (Prof. Deng Zhongjia)',
    institution: 'Chengdu University of TCM (成都中医药大学)',
    platform: 'Bilibili',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1zP411k7W2&page=1&high_quality=1&danmaku=0&autoplay=0',
    watchUrl: 'https://www.bilibili.com/video/BV1zP411k7W2/',
    duration: '82 Lectures',
    episodesCount: '82讲全',
    topicTag: 'Formulas · 方剂学殿堂课',
    descriptionEn: 'Masterful deconstruction of Chief-Deputy-Assistant-Envoy (君臣佐使) synergy across Gui Zhi Tang, Si Jun Zi Tang, Xiao Yao San, Liu Wei Di Huang Wan, and more.',
    descriptionZh: '成都中医药大学邓中甲教授经典《方剂学》全集（BV1zP411k7W2，82讲全），抽丝剥茧拆解桂枝汤、四君子汤、逍遥散、六味地黄丸之君臣佐使配伍精义。',
    thumbnailIllustration: '/images/materia_medica_scroll.jpg'
  }
];

