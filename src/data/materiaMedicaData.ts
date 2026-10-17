import { HerbItem, HerbalFormula } from '@/types/tcm';

export const ESSENTIAL_HERBS: HerbItem[] = [
  {
    id: 'ren-shen',
    name: { zh: '人参', pinyin: 'Rén Shēn', en: 'Ginseng Root' },
    pharmaceuticalLatin: 'Radix et Rhizoma Ginseng',
    category: { zh: '补气药', pinyin: 'Bǔ Qì Yào', en: 'Qi-Tonifying Herb' },
    temperature: 'Warm (温)',
    temperatureScore: 1,
    flavors: ['Sweet (甘)', 'Bitter (苦)'],
    flavorRadar: { sweet: 90, pungent: 10, bitter: 45, sour: 10, salty: 10 },
    meridiansEntered: ['Spleen 脾', 'Lung 肺', 'Heart 心', 'Kidney 肾'],
    keyActions: [
      { zh: '大补元气', pinyin: 'Dà Bǔ Yuán Qì', en: 'Powerfully Tonifies Original Qi (Yuan Qi)' },
      { zh: '复脉固脱', pinyin: 'Fù Mài Gù Tuō', en: 'Restores the Pulse & Rescues from Collapse' },
      { zh: '补脾益肺，生津安神', pinyin: 'Bǔ Pí Yì Fèi, Shēng Jīn Ān Shén', en: 'Tonifies Spleen/Lung, Generates Fluids & Calms Shen' }
    ],
    clinicalUsesEn: 'Severe exhaustion of Qi, shallow respiration, weak Spleen digestion, diabetes-like thirst from Qi/Yin deficiency, palpitations with insomnia.',
    clinicalUsesZh: '用于体虚欲脱、肢冷脉微之危证，以及脾虚食少、肺虚喘咳、津伤口渴、内热消渴、心神不安、失眠健忘。',
    dosage: '3–9g (decocted separately 另煎)',
    cautionsEn: 'Contraindicated in Excess Heat or Yang hyperactivity; do not combine with Veratrum (藜芦) or eat raw radish/strong tea while taking.',
    cautionsZh: '实证、热证而正气不虚者忌服；反藜芦，畏五灵脂，服药期间忌食萝卜与浓茶。',
    botanicalColor: '#D97706',
    visualDescriptionEn: 'Fleshy, cylindrical taproot resembling a human form ("Man-Root") with fine annular rings at the neck and translucent amber-ivory cross-sections.',
    visualDescriptionZh: '主根呈纺锤形或圆柱形，形如人体，上部有细密环纹（芦碗），断面淡黄白色、气味芳香特异。'
  },
  {
    id: 'huang-qi',
    name: { zh: '黄芪', pinyin: 'Huáng Qí', en: 'Astragalus Root' },
    pharmaceuticalLatin: 'Radix Astragali',
    category: { zh: '补气药', pinyin: 'Bǔ Qì Yào', en: 'Qi-Tonifying Herb' },
    temperature: 'Warm (温)',
    temperatureScore: 1,
    flavors: ['Sweet (甘)'],
    flavorRadar: { sweet: 95, pungent: 15, bitter: 10, sour: 10, salty: 10 },
    meridiansEntered: ['Spleen 脾', 'Lung 肺'],
    keyActions: [
      { zh: '补气升阳', pinyin: 'Bǔ Qì Shēng Yáng', en: 'Tonifies Qi & Raises Sinking Yang' },
      { zh: '益卫固表', pinyin: 'Yì Wèi Gù Biǎo', en: 'Strengthens Wei Qi & Consolidates the Exterior' },
      { zh: '利水消肿，托毒生肌', pinyin: 'Lì Shuǐ Xiāo Zhǒng', en: 'Promotes Urination to Reduce Edema & Generates Flesh' }
    ],
    clinicalUsesEn: 'The supreme herb for boosting Wei Qi immunity (preventing frequent colds), stopping spontaneous daytime sweating, lifting organ prolapse, and resolving Qi-deficiency fatigue.',
    clinicalUsesZh: '“补气诸药之最”。主治脾肺气虚、中气下陷之久泻脱肛、表虚自汗、易感风邪、气虚水肿及慢性溃疡不敛。',
    dosage: '9–30g (up to 60g in severe deficiency)',
    cautionsEn: 'Avoid during acute exterior infections (fever/sore throat), Yin deficiency with heat, or stagnant Qi/dampness.',
    cautionsZh: '表实邪盛、气滞湿阻、食积内停、阴虚阳亢者均不宜用。',
    botanicalColor: '#EAB308',
    visualDescriptionEn: 'Long tongue-shaped obliquely sliced woody root slices with a pale cream bark and a bright chrysanthemum-like yellow center ("金井玉栏 — Golden Well within a Jade Fence").',
    visualDescriptionZh: '饮片多呈斜片，外表淡棕黄色，皮部乳白而木部淡黄，具放射状纹理，古称“金井玉栏”，嚼之微甜带豆腥味。'
  },
  {
    id: 'dang-gui',
    name: { zh: '当归', pinyin: 'Dāng Guī', en: 'Chinese Angelica Root' },
    pharmaceuticalLatin: 'Radix Angelicae Sinensis',
    category: { zh: '补血药', pinyin: 'Bǔ Xuè Yào', en: 'Blood-Tonifying Herb' },
    temperature: 'Warm (温)',
    temperatureScore: 1,
    flavors: ['Sweet (甘)', 'Pungent (辛)'],
    flavorRadar: { sweet: 80, pungent: 70, bitter: 25, sour: 10, salty: 10 },
    meridiansEntered: ['Liver 肝', 'Heart 心', 'Spleen 脾'],
    keyActions: [
      { zh: '补血活血', pinyin: 'Bǔ Xuè Huó Xuè', en: 'Tonifies Blood & Invigorates Blood Circulation' },
      { zh: '调经止痛', pinyin: 'Tiáo Jīng Zhǐ Tòng', en: 'Regulates Menstruation & Alleviates Pain' },
      { zh: '润肠通便', pinyin: 'Rùn Cháng Tōng Biàn', en: 'Moistens the Intestines & Unblocks Bowels' }
    ],
    clinicalUsesEn: '"Ten formulas for women, nine contain Dang Gui" (十方九归). Simultaneously nourishes deficient Blood while moving stagnant Blood—ideal for pale complexion, dizziness, menstrual cramps, and blood-dryness constipation.',
    clinicalUsesZh: '“血中圣药”，既能补血又能活血。主治血虚萎黄、眩晕心悸、月经不调、经闭痛经、虚寒腹痛及血虚肠燥便秘。',
    dosage: '6–12g',
    cautionsEn: 'Use with caution in patients with Spleen dampness and chronic loose stools/diarrhea.',
    cautionsZh: '湿盛中满、大便溏泄者慎服。',
    botanicalColor: '#B45309',
    visualDescriptionEn: 'Aromatic root divided into Head (归头 - tonifies blood), Body (归身 - nourishes blood), and Tail (归尾 - breaks blood stasis), with rich essential oil rings.',
    visualDescriptionZh: '根部分归头（止血上行）、归身（养血守中）、归尾（破血下行），全当归则和血（既补又活），香气浓郁。'
  },
  {
    id: 'chai-hu',
    name: { zh: '柴胡', pinyin: 'Chái Hú', en: 'Bupleurum Root' },
    pharmaceuticalLatin: 'Radix Bupleuri',
    category: { zh: '辛凉解表 / 疏肝药', pinyin: 'Shū Gān Jiě Biǎo Yào', en: 'Exterior-Releasing & Liver-Coursing Herb' },
    temperature: 'Cool (凉)',
    temperatureScore: -1,
    flavors: ['Bitter (苦)', 'Pungent (辛)'],
    flavorRadar: { sweet: 10, pungent: 75, bitter: 80, sour: 10, salty: 10 },
    meridiansEntered: ['Liver 肝', 'Gallbladder 胆', 'Pericardium 心包', 'San Jiao 三焦'],
    keyActions: [
      { zh: '和解少阳，退热截疟', pinyin: 'Hé Jiě Shào Yáng', en: 'Harmonizes Shaoyang (Alternating Chills & Fever)' },
      { zh: '疏肝解郁', pinyin: 'Shū Gān Jiě Yù', en: 'Spreads Liver Qi & Relieves Emotional Constraint' },
      { zh: '升举阳气', pinyin: 'Shēng Jǔ Yáng Qì', en: 'Raises Clear Spleen/Stomach Yang Qi' }
    ],
    clinicalUsesEn: 'Cornerstone herb for Shaoyang disorders (bitter taste, alternating chills/fever), emotional stress/depression with rib-side pain, PMS, and lifting prolapsed Qi.',
    clinicalUsesZh: '少阳枢机之主药。主治寒热往来、胸胁苦满、口苦咽干（小柴胡汤证），肝郁气滞之胁痛月经不调（逍遥散证），以及气虚下陷。',
    dosage: '3–10g',
    cautionsEn: 'Use cautiously in Liver Yang rising (hypertension/headache) or Yin deficiency fire ("Chai Hu plunders Liver Yin if overused — 柴胡劫肝阴").',
    cautionsZh: '性能升散，肝阳上亢、肝风内动、阴虚火旺及气机上逆者忌用或慎用。',
    botanicalColor: '#2D6A4F',
    visualDescriptionEn: 'Slender, fibrous dark-brown rootlets with a fragrant, slightly acrid aroma that ascends lightly in decoction.',
    visualDescriptionZh: '根呈圆锥形，质硬而韧，断面呈片状纤维性，气微香，性轻清升散。'
  },
  {
    id: 'bai-zhu',
    name: { zh: '白术', pinyin: 'Bái Zhú', en: 'White Atractylodes Rhizome' },
    pharmaceuticalLatin: 'Rhizoma Atractylodis Macrocephalae',
    category: { zh: '补气健脾药', pinyin: 'Bǔ Qì Jiàn Pí Yào', en: 'Qi-Tonifying & Damp-Drying Herb' },
    temperature: 'Warm (温)',
    temperatureScore: 1,
    flavors: ['Bitter (苦)', 'Sweet (甘)'],
    flavorRadar: { sweet: 75, pungent: 20, bitter: 70, sour: 10, salty: 10 },
    meridiansEntered: ['Spleen 脾', 'Stomach 胃'],
    keyActions: [
      { zh: '健脾益气', pinyin: 'Jiàn Pí Yì Qì', en: 'Fortifies the Spleen & Tonifies Qi' },
      { zh: '燥湿利水', pinyin: 'Zào Shī Lì Shuǐ', en: 'Dries Dampness & Promotes Water Metabolism' },
      { zh: '止汗，安胎', pinyin: 'Zhǐ Hàn, Ān Tāi', en: 'Stops Spontaneous Sweating & Calms the Fetus' }
    ],
    clinicalUsesEn: 'The premier herb for strengthening Spleen Earth while drying internal Dampness: treats bloating, fatigue, loose stools, edema, and restless fetus.',
    clinicalUsesZh: '“脾脏补气健脾第一要药”。主治脾虚食少、腹胀泄泻、痰饮眩悸、水肿、自汗及胎动不安。',
    dosage: '6–12g (stir-fried 炒白术 for tonifying Spleen; raw 生白术 for moving water/bowels)',
    cautionsEn: 'Avoid in Yin deficiency with internal heat and severe thirst/fluid dryness.',
    cautionsZh: '阴虚燥渴、气滞胀闷者忌服。',
    botanicalColor: '#D97706',
    visualDescriptionEn: 'Knobby fist-like rhizome ("如意头" Ruyi cloud shape) with dotted oil glands on the cream-yellow cut surface.',
    visualDescriptionZh: '根茎肥厚呈拳状团块，断面黄白色并散布棕黄色油点（朱砂点），烘烤后香气醇厚。'
  },
  {
    id: 'fu-ling',
    name: { zh: '茯苓', pinyin: 'Fú Líng', en: 'Poria Sclerotium' },
    pharmaceuticalLatin: 'Poria',
    category: { zh: '利水渗湿药', pinyin: 'Lì Shuǐ Shèn Shī Yào', en: 'Dampness-Draining & Shen-Calming Herb' },
    temperature: 'Neutral (平)',
    temperatureScore: 0,
    flavors: ['Sweet (甘)', 'Bland (淡)'],
    flavorRadar: { sweet: 65, pungent: 5, bitter: 10, sour: 5, salty: 10 },
    meridiansEntered: ['Heart 心', 'Spleen 脾', 'Kidney 肾', 'Lung 肺'],
    keyActions: [
      { zh: '利水渗湿', pinyin: 'Lì Shuǐ Shèn Shī', en: 'Promotes Urination & Leaches Out Dampness' },
      { zh: '健脾和胃', pinyin: 'Jiàn Pí Hé Wèi', en: 'Strengthens the Spleen & Harmonizes the Middle Jiao' },
      { zh: '宁心安神', pinyin: 'Níng Xīn Ān Shén', en: 'Quiets the Heart & Calms the Spirit (Shen)' }
    ],
    clinicalUsesEn: 'Gentle, neutral fungus growing on pine roots that drains dampness without injuring righteous Qi—used for edema, phlegm dizziness, loose stools, palpitations, and insomnia.',
    clinicalUsesZh: '甘淡平和，利水而不伤正气，补脾而不留邪。主治水肿尿少、痰饮眩悸、脾虚食少便溏、心神不安、惊悸失眠。',
    dosage: '10–15g',
    cautionsEn: 'Use cautiously in patients with frequent copious urination from Kidney Qi deficiency.',
    cautionsZh: '阴虚而无湿热、虚寒精滑或气虚下陷者慎服。',
    botanicalColor: '#94A3B8',
    visualDescriptionEn: 'Snow-white cube or thin square slices cut from subterranean pine-root sclerotium, mild and chalky-smooth in texture.',
    visualDescriptionZh: '寄生于松树根部的菌核，切制成洁白方丁或薄片（白茯苓），质坚实，味甘淡。'
  },
  {
    id: 'shu-di-huang',
    name: { zh: '熟地黄', pinyin: 'Shú Dì Huáng', en: 'Prepared Rehmannia Root' },
    pharmaceuticalLatin: 'Radix Rehmanniae Praeparata',
    category: { zh: '补血滋阴药', pinyin: 'Bǔ Xuè Zī Yīn Yào', en: 'Blood & Kidney-Essence Tonifying Herb' },
    temperature: 'Warm (温)',
    temperatureScore: 1,
    flavors: ['Sweet (甘)'],
    flavorRadar: { sweet: 95, pungent: 5, bitter: 15, sour: 15, salty: 25 },
    meridiansEntered: ['Liver 肝', 'Kidney 肾'],
    keyActions: [
      { zh: '补血滋阴', pinyin: 'Bǔ Xuè Zī Yīn', en: 'Nourishes Blood & Enriches Liver/Kidney Yin' },
      { zh: '益精填髓', pinyin: 'Yì Jīng Tián Suǐ', en: 'Replenishes Essence (Jing) & Fills the Marrow' }
    ],
    clinicalUsesEn: 'Steamed nine times with rice wine and sun-dried nine times (九蒸九晒) until glossy jet-black; the chief herb in Liu Wei Di Huang Wan and Si Wu Tang for blood deficiency, premature graying, tinnitus, and lower back weakness.',
    clinicalUsesZh: '经黄酒九蒸九晒而成，乌黑油润、味甘如饴。主治血虚萎黄、心悸怔忡、月经不调，以及肾阴不足之潮热盗汗、遗精、腰膝酸软、须发早白。',
    dosage: '9–15g',
    cautionsEn: 'Rich and cloying in texture; often paired with Amomum (砂仁) or陈皮 (Chen Pi) so it does not cause bloating in weak Spleens.',
    cautionsZh: '性质黏腻，有碍消化，凡气滞痰多、脘腹胀痛、食少便溏者忌服，常配砂仁、陈皮以防滋腻碍胃。',
    botanicalColor: '#1E293B',
    visualDescriptionEn: 'Lustrous, pitch-black, soft and chewy root pieces ("乌黑如漆，味甘如饴" — black as lacquer, sweet as malt sugar).',
    visualDescriptionZh: '质地柔软黏润，色泽乌黑发亮如漆，味甘醇厚。'
  },
  {
    id: 'gui-zhi',
    name: { zh: '桂枝', pinyin: 'Guì Zhī', en: 'Cinnamon Twig' },
    pharmaceuticalLatin: 'Ramulus Cinnamomi',
    category: { zh: '辛温解表 / 温阳药', pinyin: 'Xīn Wēn Jiě Biǎo Yào', en: 'Warming Exterior-Releasing & Yang-Unblocking Herb' },
    temperature: 'Warm (温)',
    temperatureScore: 1,
    flavors: ['Pungent (辛)', 'Sweet (甘)'],
    flavorRadar: { sweet: 65, pungent: 85, bitter: 10, sour: 5, salty: 5 },
    meridiansEntered: ['Heart 心', 'Lung 肺', 'Bladder 膀胱'],
    keyActions: [
      { zh: '发汗解肌', pinyin: 'Fā Hàn Jiě Jī', en: 'Releases the Muscle Layer & Harmonizes Ying and Wei Qi' },
      { zh: '温通经脉', pinyin: 'Wēn Tōng Jīng Mài', en: 'Warms & Unblocks the Channels and Vessels' },
      { zh: '助阳化气', pinyin: 'Zhù Yáng Huà Qì', en: 'Assists Heart & Bladder Yang to Transform Fluids' }
    ],
    clinicalUsesEn: 'The most frequently used herb in Zhang Zhongjing’s Shanghan Lun (《伤寒论》). Warms the extremities, harmonizes nutritive/defensive Qi, calms Heart palpitations, and transforms cold fluid retention.',
    clinicalUsesZh: '仲景《伤寒论》第一要药。主治风寒表虚有汗（桂枝汤证）、寒凝血滞之痹痛痛经、胸阳不振之心悸，以及痰饮水肿。',
    dosage: '3–10g',
    cautionsEn: 'Contraindicated in warm-febrile diseases, Yin deficiency with blazing fire, or heat-induced bleeding.',
    cautionsZh: '温热病、阴虚火旺、血热妄行者忌服，孕妇及月经过多者慎用。',
    botanicalColor: '#B91C1C',
    visualDescriptionEn: 'Slender reddish-brown young twigs of the cassia cinnamon tree, sliced into fragrant round or oblique medallions.',
    visualDescriptionZh: '樟科肉桂的嫩枝斜切片，外皮红棕色，切面皮部红棕、木部黄白，香气温煦芳香。'
  },
  {
    id: 'gan-cao',
    name: { zh: '甘草', pinyin: 'Gān Cǎo', en: 'Licorice Root' },
    pharmaceuticalLatin: 'Radix et Rhizoma Glycyrrhizae',
    category: { zh: '补气调和药', pinyin: 'Bǔ Qì Tiáo Hé Yào', en: 'Qi-Tonifying & Formula-Harmonizing Herb' },
    temperature: 'Neutral (平)',
    temperatureScore: 0,
    flavors: ['Sweet (甘)'],
    flavorRadar: { sweet: 100, pungent: 5, bitter: 10, sour: 5, salty: 5 },
    meridiansEntered: ['Heart 心', 'Lung 肺', 'Spleen 脾', 'Stomach 胃 (enters all 12 channels)'],
    keyActions: [
      { zh: '补脾益气', pinyin: 'Bǔ Pí Yì Qì', en: 'Tonifies Spleen & Heart Qi' },
      { zh: '缓急止痛，润肺止咳', pinyin: 'Huǎn Jí Zhǐ Tòng', en: 'Moderates Spasms, Alleviates Pain & Moistens Cough' },
      { zh: '清热解毒，调和诸药', pinyin: 'Tiáo Hé Zhū Yào', en: 'Clears Heat/Toxins (Raw) & Harmonizes All Herbs (国老)' }
    ],
    clinicalUsesEn: 'Revered as the "Elder Statesman" (国老) of Chinese herbalism because it enters all 12 meridians to mediate harsh properties of other herbs, stop muscle/abdominal spasms, and soothe sore throats.',
    clinicalUsesZh: '被尊为“国老”，通行十二经。生甘草偏于清热解毒、利咽止咳；炙甘草偏于补脾和胃、益气复脉；并能调和百药、缓急止痛。',
    dosage: '2–10g',
    cautionsEn: 'Large long-term doses can cause fluid/sodium retention and bloating; incompatible with Sargassum/Euphorbia (十八反).',
    cautionsZh: '湿盛胀满、水肿者不宜多用；反大戟、甘遂、芫花、海藻。',
    botanicalColor: '#F59E0B',
    visualDescriptionEn: 'Fibrous yellow root medallions with a reddish-brown bark and intensely sweet glycyrrhizin aftertaste.',
    visualDescriptionZh: '外皮红棕色，切面鲜黄色并具明显菊花心放射纹理，味极甘甜。'
  },
  {
    id: 'huang-lian',
    name: { zh: '黄连', pinyin: 'Huáng Lián', en: 'Coptis Rhizome' },
    pharmaceuticalLatin: 'Rhizoma Coptidis',
    category: { zh: '清热燥湿药', pinyin: 'Qīng Rè Zào Shī Yào', en: 'Heat-Clearing & Dampness-Drying Herb' },
    temperature: 'Cold (寒)',
    temperatureScore: -2,
    flavors: ['Bitter (苦)'],
    flavorRadar: { sweet: 5, pungent: 5, bitter: 100, sour: 10, salty: 10 },
    meridiansEntered: ['Heart 心', 'Stomach 胃', 'Liver 肝', 'Large Intestine 大肠'],
    keyActions: [
      { zh: '清热燥湿', pinyin: 'Qīng Rè Zào Shī', en: 'Clears Heat & Dries Dampness in Middle/Lower Jiao' },
      { zh: '泻火解毒', pinyin: 'Xiè Huǒ Jiě Dú', en: 'Drains Blazing Heart & Stomach Fire and Resolves Toxicity' }
    ],
    clinicalUsesEn: 'Proverbially the bitterest herb in TCM ("哑巴吃黄连 — like a mute eating Coptis"). Rapidly extinguishes Heart Fire insomnia/ulcers, Stomach Fire acid/halitosis, and damp-heat dysentery.',
    clinicalUsesZh: '大苦大寒之品，最善清心胃之实火、燥中焦之湿热。主治湿热痞满、呕吐吞酸、泻痢、心火亢盛之心烦失眠、口舌生疮。',
    dosage: '2–5g',
    cautionsEn: 'Extremely bitter and cold; avoid long-term use so as not to injure Spleen/Stomach Yang.',
    cautionsZh: '大苦大寒，过服久服易伤脾胃阳气，脾胃虚寒及阴虚津伤者慎用。',
    botanicalColor: '#CA8A04',
    visualDescriptionEn: 'Clustered, curved rhizomes resembling chicken claws ("鸡爪连"), with a brilliant golden-yellow interior rich in berberine.',
    visualDescriptionZh: '多集聚成簇，形如鸡爪（“鸡爪连”），断面皮部橙红、木部鲜黄色，味极苦。'
  }
];

export const CLASSIC_FORMULAS: HerbalFormula[] = [
  {
    id: 'si-jun-zi-tang',
    name: { zh: '四君子汤', pinyin: 'Sì Jūn Zǐ Tāng', en: 'Four Gentlemen Decoction' },
    sourceText: { zh: '《太平惠民和剂局方》（宋代）', pinyin: 'Tài Píng Huì Mín Hé Jì Jú Fāng', en: 'Imperial Grace Formulary of the Tai Ping Era (Song Dynasty)' },
    category: { zh: '补益剂 · 补气基础总方', pinyin: 'Bǔ Qì Jì', en: 'Foundational Qi-Tonifying Formula' },
    actions: { zh: '益气健脾', pinyin: 'Yì Qì Jiàn Pí', en: 'Tonifies Qi and Strengthens the Spleen' },
    targetPattern: { zh: '脾胃气虚证', pinyin: 'Pí Wèi Qì Xū Zhèng', en: 'Spleen & Stomach Qi Deficiency' },
    indicationsEn: 'Pallid/sallow complexion, low and weak voice, chronic fatigue, poor appetite, post-meal bloating, and loose stools.',
    indicationsZh: '面色萎白、语声低微、气短乏力、食少便溏。乃一切补气健脾方剂之祖方（加陈皮为异功散，再加半夏为六君子汤）。',
    tongueAndPulseEn: 'Pale swollen tongue with thin white coat and teeth marks; weak/empty pulse (脉虚弱).',
    tongueAndPulseZh: '舌淡苔白（常伴齿痕），脉虚缓或细软。',
    architecture: [
      {
        herbId: 'ren-shen',
        herbName: { zh: '人参', pinyin: 'Rén Shēn', en: 'Ginseng (or Dang Shen)' },
        role: 'Jun (君 Chief)',
        dosage: '9g',
        roleExplanationEn: 'Sweet and warm; directly revives Yuan Qi and fortifies Spleen & Stomach transformation.',
        roleExplanationZh: '甘温益气，大补脾胃之气，健运中州，为君药。'
      },
      {
        herbId: 'bai-zhu',
        herbName: { zh: '白术', pinyin: 'Bái Zhú', en: 'White Atractylodes' },
        role: 'Chen (臣 Deputy)',
        dosage: '9g',
        roleExplanationEn: 'Bitter and warm; strengthens Spleen Qi while drying internal Dampness so Qi tonification does not stagnate.',
        roleExplanationZh: '苦温健脾燥湿，助君药益气助运，绝湿浊内生之源，为臣药。'
      },
      {
        herbId: 'fu-ling',
        herbName: { zh: '茯苓', pinyin: 'Fú Líng', en: 'Poria' },
        role: 'Zuo (佐 Assistant)',
        dosage: '9g',
        roleExplanationEn: 'Sweet and bland; leaches dampness downward through urination, partnering with Bai Zhu ("术苓相须") to restore Middle Jiao transport.',
        roleExplanationZh: '甘淡渗湿健脾，与白术相须为用，健脾祛湿之力益彰，为佐药。'
      },
      {
        herbId: 'gan-cao',
        herbName: { zh: '炙甘草', pinyin: 'Zhì Gān Cǎo', en: 'Honey-Fried Licorice' },
        role: 'Shi (使 Envoy)',
        dosage: '6g',
        roleExplanationEn: 'Warms the Middle Jiao and harmonizes the other three herbs so their tonifying power is gentle and sustained ("like four noble gentlemen").',
        roleExplanationZh: '甘温调中，益气补脾，并调和诸药，使补而不峻、温而不燥，兼具佐使之功。'
      }
    ],
    synergyAnalysisEn: 'Named "Four Gentlemen" because all four herbs are mild, upright, and devoid of harsh燥烈 qualities. Ren Shen tonifies Qi, Bai Zhu dries dampness, Fu Ling percolates dampness, and Gan Cao harmonizes—establishing the golden rule of Spleen treatment: "Tonify Qi while resolving Dampness (补中有渗)".',
    synergyAnalysisZh: '四药皆甘温中和之品，不偏不倚，有“君子致中和”之风。人参补气为君，白术燥湿、茯苓渗湿为臣佐，甘草调中为使，体现“寓渗于补、补而不滞”的配伍精髓。'
  },
  {
    id: 'xiao-yao-san',
    name: { zh: '逍遥散', pinyin: 'Xiāo Yáo Sǎn', en: 'Free and Easy Wanderer Powder' },
    sourceText: { zh: '《太平惠民和剂局方》（宋代）', pinyin: 'Tài Píng Huì Mín Hé Jì Jú Fāng', en: 'Imperial Grace Formulary (Named after Zhuangzi’s "Xiao Yao You")' },
    category: { zh: '和解剂 · 调和肝脾名方', pinyin: 'Hé Jiě Jì', en: 'Liver-Spleen Harmonizing Formula' },
    actions: { zh: '疏肝解郁，养血健脾', pinyin: 'Shū Gān Jiě Yù, Yǎng Xuè Jiàn Pí', en: 'Spreads Liver Qi, Nourishes Blood & Strengthens the Spleen' },
    targetPattern: { zh: '肝郁血虚脾弱证', pinyin: 'Gān Yù Xuè Xū Pí Ruò Zhèng', en: 'Liver Qi Stagnation with Blood & Spleen Deficiency' },
    indicationsEn: 'Rib-side distension and pain, frequent sighing, emotional stress/irritability, headache, dry eyes, fatigue, poor appetite, and irregular or painful menstruation.',
    indicationsZh: '两胁作痛、头痛目眩、口燥咽干、神疲食少，或寒热往来、乳房胀痛、月经不调。使郁结之肝气得以条达舒展，故名“逍遥”。',
    tongueAndPulseEn: 'Pale-red tongue (often with scalloped edges); wiry and deficient pulse (脉弦而虚).',
    tongueAndPulseZh: '舌质淡红，脉弦而虚。',
    architecture: [
      {
        herbId: 'chai-hu',
        herbName: { zh: '柴胡', pinyin: 'Chái Hú', en: 'Bupleurum Root' },
        role: 'Jun (君 Chief)',
        dosage: '9g',
        roleExplanationEn: 'Courses the Liver and releases constraint, restoring the natural upward and outward movement of Wood Qi.',
        roleExplanationZh: '疏肝解郁，顺应肝木条达之性，使肝气得以疏泄，为君药。'
      },
      {
        herbId: 'dang-gui',
        herbName: { zh: '当归 & 白芍', pinyin: 'Dāng Guī & Bái Sháo', en: 'Angelica & White Peony Root' },
        role: 'Chen (臣 Deputy)',
        dosage: '9g each',
        roleExplanationEn: 'Nourish Liver Blood and soften the Liver ("體陰而用陽 — The Liver’s substance is Yin Blood while its function is Yang Qi"). Without nourishing Blood, coursing Qi alone would dry out the Liver.',
        roleExplanationZh: '当归养血和血，白芍养血敛阴柔肝。肝为“体阴而用阳”之脏，补肝体以助肝用，共为臣药。'
      },
      {
        herbId: 'bai-zhu',
        herbName: { zh: '白术 & 茯苓', pinyin: 'Bái Zhú & Fú Líng', en: 'Atractylodes & Poria' },
        role: 'Zuo (佐 Assistant)',
        dosage: '9g each',
        roleExplanationEn: 'Fortify Spleen Earth to prevent stagnant Liver Wood from bullying the Spleen ("见肝之病，知肝传脾，当先实脾") and promote the source of Qi and Blood.',
        roleExplanationZh: '实脾土以防木乘土，并资气血生化之源，为佐药。'
      },
      {
        herbId: 'gan-cao',
        herbName: { zh: '炙甘草、煨姜、薄荷', pinyin: 'Gān Cǎo, Shēng Jiāng, Bò Hé', en: 'Licorice, Roasted Ginger & Mint' },
        role: 'Shi (使 Envoy)',
        dosage: '3–6g',
        roleExplanationEn: 'A touch of Mint disperses郁熱 (stagnant heat), Ginger harmonizes the Stomach, and Licorice coordinates the whole formula.',
        roleExplanationZh: '少许薄荷疏散郁遏之气，煨姜温胃和中，炙甘草缓急调药，共为佐使。'
      }
    ],
    synergyAnalysisEn: 'Masterfully addresses the Liver’s dual nature: "Its structure is Yin (Blood), while its function is Yang (Qi movement)." By combining Chai Hu (which moves Liver Qi) with Dang Gui & Bai Shao (which replenish Liver Blood) and Bai Zhu & Fu Ling (which protect Spleen Earth), it resolves stress and digestive/hormonal disharmony simultaneously.',
    synergyAnalysisZh: '全方既疏肝气又养肝血，既治肝木又实脾土，肝脾同调、气血兼顾，堪称中医调理情志与内分泌失调的第一名方。'
  },
  {
    id: 'liu-wei-di-huang-wan',
    name: { zh: '六味地黄丸', pinyin: 'Liù Wèi Dì Huáng Wán', en: 'Six-Ingredient Pill with Rehmannia' },
    sourceText: { zh: '钱乙《小儿药证直诀》（宋代）', pinyin: 'Xiǎo Ér Yào Zhèng Zhí Jué', en: 'Key to Therapeutics of Children’s Diseases (Qian Yi, 1119 CE)' },
    category: { zh: '补益剂 · 滋阴祖方', pinyin: 'Zī Yīn Jì', en: 'Foundational Yin-Nourishing Formula' },
    actions: { zh: '滋补肝肾', pinyin: 'Zī Bǔ Gān Shèn', en: 'Enriches and Tonifies Liver & Kidney Yin' },
    targetPattern: { zh: '肝肾阴虚证', pinyin: 'Gān Shèn Yīn Xū Zhèng', en: 'Kidney and Liver Yin Deficiency' },
    indicationsEn: 'Sore and weak lower back and knees, dizziness, vertigo, tinnitus, night sweats, five-palm heat (steaming bone disorder), dry throat, and loose teeth.',
    indicationsZh: '腰膝酸软、头晕目眩、耳鸣耳聋、盗汗遗精、骨蒸潮热、手足心热、口燥咽干、牙齿动摇。',
    tongueAndPulseEn: 'Red tongue body with scant or peeled coating; thready and rapid pulse (脉细数).',
    tongueAndPulseZh: '舌红少苔，脉沉细数。',
    architecture: [
      {
        herbId: 'shu-di-huang',
        herbName: { zh: '熟地黄 (八钱)', pinyin: 'Shú Dì Huáng', en: 'Prepared Rehmannia (24g ratio)' },
        role: 'Jun (君 Chief)',
        dosage: '24g',
        roleExplanationEn: 'Nourishes Kidney Yin, enriches Essence (Jing), and fills the bone marrow.',
        roleExplanationZh: '滋阴补肾，填精益髓，重用为君药。'
      },
      {
        herbId: 'dang-gui',
        herbName: { zh: '山茱萸 & 山药 (各四钱)', pinyin: 'Shān Zhū Yú & Shān Yào', en: 'Cornus Fruit & Chinese Yam (12g each)' },
        role: 'Chen (臣 Deputy)',
        dosage: '12g each',
        roleExplanationEn: 'Cornus nourishes the Liver and astringes Essence; Chinese Yam tonifies Spleen Yin and stabilizes Kidney Jing. Together with Shu Di Huang, they tonify Liver, Spleen, and Kidney ("Three Tonifiers — 三补").',
        roleExplanationZh: '山茱萸补养肝肾而涩精，山药补益脾阴而固精。与熟地合称“三补”（肝脾肾三阴并补），为臣药。'
      },
      {
        herbId: 'fu-ling',
        herbName: { zh: '泽泻、牡丹皮、茯苓 (各三钱)', pinyin: 'Zé Xiè, Mǔ Dān Pí, Fú Líng', en: 'Alisma, Moutan Bark & Poria (9g each)' },
        role: 'Zuo (佐 Assistant)',
        dosage: '9g each',
        roleExplanationEn: 'The famous "Three Drainers" (三泻): Alisma clears Kidney turbidity and prevents Shu Di Huang from being cloying; Moutan clears Liver Empty Fire to balance Cornus; Poria drains Spleen dampness to assist Yam.',
        roleExplanationZh: '合称“三泻”：泽泻泄肾浊以防熟地滋腻；丹皮清相火以制山茱萸之温涩；茯苓渗脾湿以助山药健运，共为佐药。'
      }
    ],
    synergyAnalysisEn: 'Celebrated for its "Three Tonifiers and Three Drainers" (三补三泻) symmetry in an 8:4:4:3:3:3 dosage ratio. Every tonifying herb for Kidney, Liver, and Spleen is paired with a draining/clearing herb so that Yin is deeply replenished without creating stagnation or dampness ("补中有泻，寓泻于补").',
    synergyAnalysisZh: '钱乙由《金匮要略》肾气丸减去桂枝、附子而成。全方“三补三泻”，以补为主，肝脾肾三阴并治而重在补肾阴，配伍严谨精妙，为千古滋阴第一方。'
  },
  {
    id: 'gui-zhi-tang',
    name: { zh: '桂枝汤', pinyin: 'Guì Zhī Tāng', en: 'Cinnamon Twig Decoction' },
    sourceText: { zh: '张仲景《伤寒论》（东汉）', pinyin: 'Shāng Hán Lùn', en: 'Treatise on Cold Damage (Zhang Zhongjing, ~200 CE)' },
    category: { zh: '解表剂 · 群方之冠', pinyin: 'Jiě Biǎo Jì', en: 'Harmonizing Exterior-Releasing Formula ("Crown of All Formulas")' },
    actions: { zh: '解肌发表，调和营卫', pinyin: 'Jiě Jī Fā Biǎo, Tiáo Hé Yíng Wèi', en: 'Releases the Muscle Layer & Harmonizes Ying (Nutritive) and Wei (Defensive) Qi' },
    targetPattern: { zh: '太阳中风表虚证 / 营卫不和证', pinyin: 'Tài Yáng Zhòng Fēng', en: 'Taiyang Wind-Strike (Exterior Deficiency) & Ying-Wei Disharmony' },
    indicationsEn: 'Fever with spontaneous sweating, aversion to wind/drafts, headache, stiff neck, nasal congestion, and absence of thirst.',
    indicationsZh: '外感风寒表虚证：发热、汗出、恶风、头痛鼻鸣、干呕、不渴。亦广泛用于内伤杂病中一切“营卫不和、阴阳失调”之自汗、盗汗、荨麻疹、体质虚弱。',
    tongueAndPulseEn: 'Thin white moist tongue coat; floating and moderate/weak pulse (脉浮缓或浮弱).',
    tongueAndPulseZh: '舌苔薄白而润，脉浮缓或浮弱。',
    architecture: [
      {
        herbId: 'gui-zhi',
        herbName: { zh: '桂枝', pinyin: 'Guì Zhī', en: 'Cinnamon Twig' },
        role: 'Jun (君 Chief)',
        dosage: '9g',
        roleExplanationEn: 'Pungent and warm; warms the channels, disperses pathogenic Wind-Cold from the muscle layer, and supports Wei Yang.',
        roleExplanationZh: '辛甘温煦，温经通阳，解肌发表以散外感风寒，助卫阳之气，为君药。'
      },
      {
        herbId: 'dang-gui',
        herbName: { zh: '白芍', pinyin: 'Bái Sháo', en: 'White Peony Root' },
        role: 'Chen (臣 Deputy)',
        dosage: '9g',
        roleExplanationEn: 'Sour and slightly cold; astringes leaking Yin fluids and nourishes Ying (Nutritive) Blood. Equal doses of Gui Zhi (dispersing Yang) and Bai Shao (astringing Yin) balance sweating and immunity.',
        roleExplanationZh: '酸寒益阴敛营，收敛外泄之汗液。与桂枝等量配伍，一散一收、一阳一阴，调和营卫，为臣药。'
      },
      {
        herbId: 'huang-qi',
        herbName: { zh: '生姜 & 大枣', pinyin: 'Shēng Jiāng & Dà Zǎo', en: 'Fresh Ginger & Jujube Dates' },
        role: 'Zuo (佐 Assistant)',
        dosage: '9g / 4 dates',
        roleExplanationEn: 'Fresh Ginger assists Gui Zhi in venting the exterior and warming the Stomach; Jujube assists Bai Shao in nourishing Spleen Qi and Ying Blood.',
        roleExplanationZh: '生姜辛温助桂枝散表邪、和胃止呕；大枣甘平助白芍益脾气、滋营血，姜枣相配升腾脾胃生发之气，为佐药。'
      },
      {
        herbId: 'gan-cao',
        herbName: { zh: '炙甘草', pinyin: 'Zhì Gān Cǎo', en: 'Honey-Fried Licorice' },
        role: 'Shi (使 Envoy)',
        dosage: '6g',
        roleExplanationEn: 'Combines with Gui Zhi ("辛甘化阳" — pungent + sweet generates Yang) and with Bai Shao ("酸甘化阴" — sour + sweet generates Yin).',
        roleExplanationZh: '合桂枝则“辛甘化阳”以实卫，合白芍则“酸甘化阴”以和营，调和诸药，为使药。'
      }
    ],
    synergyAnalysisEn: 'Praised by Qing physician Ke Qin as the "Crown of All Formulas in the Shanghan Lun" (仲景群方之冠). Through the twin alchemies of Pungent+Sweet generating Yang (Gui Zhi + Gan Cao) and Sour+Sweet generating Yin (Bai Shao + Gan Cao), plus sipping warm rice congee after taking the decoction to fuel Stomach Qi, it models the heart of TCM: harmonizing Yin and Yang.',
    synergyAnalysisZh: '《伤寒论》开篇第一方，被誉为“群方之冠”。内含“辛甘化阳”与“酸甘化阴”两大法门，发汗而不伤正，止汗而不留邪，服药后啜热稀粥以助胃气酿汗，尽显中医扶正祛邪、燮理阴阳之智慧。'
  },
  {
    id: 'xiao-chai-hu-tang',
    name: { zh: '小柴胡汤', pinyin: 'Xiǎo Chái Hú Tāng', en: 'Minor Bupleurum Decoction' },
    sourceText: { zh: '张仲景《伤寒论》（东汉）', pinyin: 'Shāng Hán Lùn', en: 'Treatise on Cold Damage (Zhang Zhongjing, ~200 CE)' },
    category: { zh: '和解剂 · 和解少阳祖方', pinyin: 'Hé Jiě Jì', en: 'Shaoyang Pivot-Harmonizing Formula' },
    actions: { zh: '和解少阳，扶正祛邪', pinyin: 'Hé Jiě Shào Yáng', en: 'Harmonizes the Shaoyang Pivot & Supports Upright Qi' },
    targetPattern: { zh: '少阳病（半表半里证）', pinyin: 'Shào Yáng Bìng', en: 'Shaoyang Half-Exterior, Half-Interior Syndrome' },
    indicationsEn: 'Alternating chills and fever (往来寒热), fullness and discomfort in the chest and rib-sides (胸胁苦满), bitter taste in the mouth, dry throat, dizziness, poor appetite, and irritability/nausea.',
    indicationsZh: '往来寒热、胸胁苦满、嘿嘿不欲饮食、心烦喜呕、口苦、咽干、目眩。',
    tongueAndPulseEn: 'Thin white or slightly yellow tongue coat; wiry pulse (脉弦).',
    tongueAndPulseZh: '舌苔薄白或微黄，脉弦。',
    architecture: [
      {
        herbId: 'chai-hu',
        herbName: { zh: '柴胡', pinyin: 'Chái Hú', en: 'Bupleurum Root' },
        role: 'Jun (君 Chief)',
        dosage: '15–24g',
        roleExplanationEn: 'Enters the Shaoyang Gallbladder channel to vent and disperse pathogenic factor outward from the half-exterior pivot.',
        roleExplanationZh: '气质轻清，苦平微寒，透泄少阳半表之邪，疏畅气机之郁滞，为君药。'
      },
      {
        herbId: 'huang-lian',
        herbName: { zh: '黄芩', pinyin: 'Huáng Qín', en: 'Scutellaria Root' },
        role: 'Chen (臣 Deputy)',
        dosage: '9g',
        roleExplanationEn: 'Bitter and cold; clears ministerial fire郁熱 (郁热) trapped inside the Shaoyang Gallbladder. Chai Hu (dispersing outward) + Huang Qin (clearing inward) is the classic pair to pivot Shaoyang.',
        roleExplanationZh: '苦寒清降，清泄少阳半里之郁热。柴胡升散与黄芩清降相配，一散一清，和解少阳枢机，为臣药。'
      },
      {
        herbId: 'ren-shen',
        herbName: { zh: '半夏、生姜、人参、大枣', pinyin: 'Bàn Xià, Shēng Jiāng, Rén Shēn, Dà Zǎo', en: 'Pinellia, Ginger, Ginseng & Jujube' },
        role: 'Zuo (佐 Assistant)',
        dosage: '9g each',
        roleExplanationEn: 'Pinellia & Ginger descend rebellious Stomach Qi to stop nausea; Ginseng & Jujube fortify Spleen/Stomach upright Qi so the pathogen cannot penetrate deeper into the Taiyin interior.',
        roleExplanationZh: '半夏、生姜和胃降逆止呕；人参、大枣益气健脾，既扶正以助祛邪，又预实脾土以防少阳之邪内传太阴，共为佐药。'
      },
      {
        herbId: 'gan-cao',
        herbName: { zh: '炙甘草', pinyin: 'Zhì Gān Cǎo', en: 'Honey-Fried Licorice' },
        role: 'Shi (使 Envoy)',
        dosage: '6g',
        roleExplanationEn: 'Supports Spleen Qi and harmonizes the cold/warm and ascending/descending herbs.',
        roleExplanationZh: '助参枣扶正，调和寒温升降诸药，为使药。'
      }
    ],
    synergyAnalysisEn: 'Combines venting (Chai Hu), clearing (Huang Qin), descending Stomach rebellion (Ban Xia + Sheng Jiang), and tonifying upright Qi (Ren Shen + Da Zao + Gan Cao). It teaches how TCM resolves complex "caught-in-between" (半表半里) states by unlocking the pivot rather than using harsh sweating or purging.',
    synergyAnalysisZh: '寒温并用、升降协调、攻补兼施，旋转少阳枢机，令“上焦得通，津液得下，胃气因和，身濈然汗出而解”。'
  }
];
