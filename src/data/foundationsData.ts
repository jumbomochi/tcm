import { WuXingElement, ZangFuOrgan, QiClockHour } from '@/types/tcm';

export const WUXING_ELEMENTS: WuXingElement[] = [
  {
    key: 'wood',
    name: { zh: '木', pinyin: 'Mù', en: 'Wood' },
    colorHex: '#2D6A4F',
    bgSoftHex: '#ECFDF5',
    season: { zh: '春', pinyin: 'Chūn', en: 'Spring' },
    climate: { zh: '风', pinyin: 'Fēng', en: 'Wind' },
    direction: { zh: '东', pinyin: 'Dōng', en: 'East' },
    zangOrgan: { zh: '肝', pinyin: 'Gān', en: 'Liver' },
    fuOrgan: { zh: '胆', pinyin: 'Dǎn', en: 'Gallbladder' },
    senseOrgan: { zh: '目', pinyin: 'Mù', en: 'Eyes' },
    tissue: { zh: '筋', pinyin: 'Jīn', en: 'Sinews & Tendons' },
    emotion: { zh: '怒', pinyin: 'Nù', en: 'Anger / Frustration' },
    taste: { zh: '酸', pinyin: 'Suān', en: 'Sour' },
    voice: { zh: '呼', pinyin: 'Hū', en: 'Shouting' },
    generates: 'fire',
    controls: 'earth',
    physiologyEn:
      'Wood represents germination, upward growth, flexible expansion, and free-flowing movement (曲直). In the body, Liver Wood ensures the smooth, unobstructed flow of Qi, Blood, and emotions.',
    physiologyZh:
      '“木曰曲直”，象征春天草木萌发、向上向外舒展之性。在人体对应肝胆，主疏泄、喜条达而恶抑郁，统领全身气机之畅达与血液之贮藏调节。',
    overactingDescEn:
      'Wood Overacting on Earth (木乘土 / 肝气犯脾): Emotional stress or Liver Qi stagnation bullies the Spleen & Stomach, causing abdominal distension, acid reflux, IBS-like alternating diarrhea/constipation, and poor appetite.',
    overactingDescZh:
      '木乘土（肝气犯脾/犯胃）：情志不遂或肝气郁结过亢，横逆克伐脾胃之土，临床常见胸胁胀满、嗳气吞酸、腹痛腹泻（痛泻要方证）。',
    counteractingDescEn:
      'Wood Counter-acting on Metal (木侮金 / 木火刑金): Normally Metal controls Wood, but blazing Liver Fire rebels upward against the Lungs, causing irritable dry cough, flank pain, and even hemoptysis.',
    counteractingDescZh:
      '木侮金（木火刑金）：正常金能克木，若肝火炽盛反而逆侮肺金，可见急躁易怒、胸胁灼痛、干咳少痰甚或咳血。',
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·阴阳应象大论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 5',
      quoteZh: '东方生风，风生木，木生酸，酸生肝，肝生筋，筋生心，肝主目。',
      quotePinyin: 'Dōng fāng shēng fēng, fēng shēng mù, mù shēng suān, suān shēng gān, gān shēng jīn, jīn shēng xīn, gān zhǔ mù.',
      quoteEn: 'The East generates Wind; Wind generates Wood; Wood generates Sourness; Sourness nourishes the Liver; the Liver nourishes the Sinews; the Sinews generate the Heart; the Liver rules the Eyes.',
      commentaryEn: 'Establishes the ecological macro-microcosm link between spring growth, wind movement, tendon flexibility, vision, and Liver Qi.',
      commentaryZh: '确立了自然界春风生发之气与人体肝脏、筋脉、双目及酸味之间的天人相应网络。'
    }
  },
  {
    key: 'fire',
    name: { zh: '火', pinyin: 'Huǒ', en: 'Fire' },
    colorHex: '#C83E31',
    bgSoftHex: '#FEF2F2',
    season: { zh: '夏', pinyin: 'Xià', en: 'Summer' },
    climate: { zh: '暑 / 热', pinyin: 'Shǔ / Rè', en: 'Summer-Heat' },
    direction: { zh: '南', pinyin: 'Nán', en: 'South' },
    zangOrgan: { zh: '心 (心包)', pinyin: 'Xīn', en: 'Heart & Pericardium' },
    fuOrgan: { zh: '小肠 (三焦)', pinyin: 'Xiǎo Cháng', en: 'Small Intestine & San Jiao' },
    senseOrgan: { zh: '舌', pinyin: 'Shé', en: 'Tongue' },
    tissue: { zh: '脉', pinyin: 'Mài', en: 'Blood Vessels' },
    emotion: { zh: '喜', pinyin: 'Xǐ', en: 'Joy / Elation' },
    taste: { zh: '苦', pinyin: 'Kǔ', en: 'Bitter' },
    voice: { zh: '笑', pinyin: 'Xiào', en: 'Laughing' },
    generates: 'earth',
    controls: 'metal',
    physiologyEn:
      'Fire represents warmth, radiance, upward flaring, and consciousness (炎上). The Heart is the "Monarch Organ" (君主之官) that houses the Shen (Spirit/Mind) and propels blood through the vessels.',
    physiologyZh:
      '“火曰炎上”，具有温热、光明、升腾的特性。心居胸中属火，为“君主之官”，主血脉而藏神，温煦全身并统摄精神意识与睡眠。',
    overactingDescEn:
      'Fire Overacting on Metal (火乘金 / 心火灼肺): Excessive Heart/Summer Fire scorches Lung Metal, leading to dry throat, nasal dryness, feverish restlessness, and dry cough.',
    overactingDescZh:
      '火乘金（火旺刑金）：心火或温热之邪过亢，灼伤肺金津液，导致心烦口渴、咽干鼻燥、干咳无痰。',
    counteractingDescEn:
      'Fire Counter-acting on Water (火侮水): When Heart Fire blazes uncontrollably and fails to descend to warm the Kidneys, it depletes Kidney Yin Water, causing insomnia, night sweats, and tinnitus (心肾不交).',
    counteractingDescZh:
      '火侮水（心火亢盛耗伤肾水）：心火不降反而下汲肾水，致水火失济、心肾不交，出现心烦失眠、梦遗耳鸣、舌尖红赤。',
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·灵兰秘典论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 8',
      quoteZh: '心者，君主之官也，神明出焉。主明则下安，主不明则十二官危。',
      quotePinyin: 'Xīn zhě, jūn zhǔ zhī guān yě, shén míng chū yān. Zhǔ míng zé xià ān, zhǔ bù míng zé shí èr guān wēi.',
      quoteEn: 'The Heart is the Sovereign Monarch from whom Spirit and clarity of mind emerge. When the Sovereign is clear, all organs below are at peace; when unclear, all twelve organs are endangered.',
      commentaryEn: 'Highlights why emotional tranquility and Shen (Spirit) stability are considered the supreme foundation of longevity in TCM.',
      commentaryZh: '阐明心神在脏腑系统中的统帅地位，养心安神乃中医养生与治病之本。'
    }
  },
  {
    key: 'earth',
    name: { zh: '土', pinyin: 'Tǔ', en: 'Earth' },
    colorHex: '#D97706',
    bgSoftHex: '#FFFBEB',
    season: { zh: '长夏 (四季末)', pinyin: 'Cháng Xià', en: 'Late Summer / Transitions' },
    climate: { zh: '湿', pinyin: 'Shī', en: 'Dampness' },
    direction: { zh: '中', pinyin: 'Zhōng', en: 'Center' },
    zangOrgan: { zh: '脾', pinyin: 'Pí', en: 'Spleen' },
    fuOrgan: { zh: '胃', pinyin: 'Wèi', en: 'Stomach' },
    senseOrgan: { zh: '口 (唇)', pinyin: 'Kǒu', en: 'Mouth & Lips' },
    tissue: { zh: '肉 (肌肉)', pinyin: 'Ròu', en: 'Muscles & Flesh' },
    emotion: { zh: '思', pinyin: 'Sī', en: 'Pensiveness / Overthinking' },
    taste: { zh: '甘', pinyin: 'Gān', en: 'Sweet' },
    voice: { zh: '歌', pinyin: 'Gē', en: 'Singing' },
    generates: 'metal',
    controls: 'water',
    physiologyEn:
      'Earth represents sowing, harvesting, nourishment, and transformation (稼穑). The Spleen and Stomach form the "Post-Natal Root" (后天之本), transforming food and drink into Qi and Blood to nourish all organs.',
    physiologyZh:
      '“土爰稼穑”，居中央而灌溉四旁，主承载、受纳与化生。脾胃属土，为“后天之本、气血生化之源”，一升一降，枢纽全身气机。',
    overactingDescEn:
      'Earth Overacting on Water (土乘水): Severe Spleen Dampness retention obstructs Kidney water metabolism, leading to chronic edema, heavy limbs, and scanty urination.',
    overactingDescZh:
      '土乘水：脾虚湿困或湿浊中阻，土不制水反致水湿泛滥，累及肾之气化，出现水肿、小便不利。',
    counteractingDescEn:
      'Earth Counter-acting on Wood (土侮木): Damp-Heat stagnating in the Spleen & Stomach blocks the Liver and Gallbladder from coursing bile, resulting in jaundice and right hypochondriac fullness (土壅木郁).',
    counteractingDescZh:
      '土侮木（土壅木郁）：脾胃湿热内蕴，中焦枢机不利，反侮肝胆疏泄，导致胁肋胀满、身目发黄。',
    classicalQuote: {
      sourceZh: '李东垣《脾胃论》',
      sourceEn: 'Li Dongyuan · Treatise on the Spleen and Stomach (1249 CE)',
      quoteZh: '内伤脾胃，百病由生。脾胃既虚，四脏俱无生气。',
      quotePinyin: 'Nèi shāng pí wèi,ǎi bìng yóu shēng. Pí wèi jì xū, sì zàng jù wú shēng qì.',
      quoteEn: 'When the Spleen and Stomach are injured internally, the hundred diseases arise. Once the Spleen and Stomach are deficient, the other four Zang organs lose their source of vitality.',
      commentaryEn: 'Explains why protecting digestive fire (Middle Jiao) is central to treating chronic fatigue, immunity, and dampness.',
      commentaryZh: '金元四大家李东垣“补土派”核心思想，强调顾护中焦脾胃阳气是防治慢性病的关键。'
    }
  },
  {
    key: 'metal',
    name: { zh: '金', pinyin: 'Jīn', en: 'Metal' },
    colorHex: '#64748B',
    bgSoftHex: '#F8FAFC',
    season: { zh: '秋', pinyin: 'Qiū', en: 'Autumn' },
    climate: { zh: '燥', pinyin: 'Zào', en: 'Dryness' },
    direction: { zh: '西', pinyin: 'Xī', en: 'West' },
    zangOrgan: { zh: '肺', pinyin: 'Fèi', en: 'Lung' },
    fuOrgan: { zh: '大肠', pinyin: 'Dà Cháng', en: 'Large Intestine' },
    senseOrgan: { zh: '鼻', pinyin: 'Bí', en: 'Nose' },
    tissue: { zh: '皮毛', pinyin: 'Pí Máo', en: 'Skin & Body Hair' },
    emotion: { zh: '悲 / 忧', pinyin: 'Bēi / Yōu', en: 'Grief & Sadness' },
    taste: { zh: '辛', pinyin: 'Xīn', en: 'Pungent / Acrid' },
    voice: { zh: '哭', pinyin: 'Kū', en: 'Weeping' },
    generates: 'water',
    controls: 'wood',
    physiologyEn:
      'Metal represents purification, astringency, structure, and descending clarity (从革). The Lungs act as the "Florid Canopy" (华盖), governing respiration, Wei Qi (defensive immunity), skin pores, and descending water to the Kidneys.',
    physiologyZh:
      '“金曰从革”，主肃降、收敛、清洁。肺属金，为五脏之“华盖”，主气司呼吸、主宣发肃降、通调水道，外合皮毛以卫外御邪。',
    overactingDescEn:
      'Metal Overacting on Wood (金乘木): Excessive Lung Qi contraction or unresolved grief suppresses Liver Qi, leading to sighing, chest constriction, and hypochondriac depression.',
    overactingDescZh:
      '金乘木：肺气肃降过度或悲忧伤肺，克伐肝木生发之气，出现胸闷善太息、两胁不舒、情志抑郁。',
    counteractingDescEn:
      'Metal Counter-acting on Fire (金侮火): Chronic Lung phlegm-cold or deficiency burdens the Heart circulation in the Upper Jiao, causing palpitations, chest oppression, and cyanotic lips.',
    counteractingDescZh:
      '金侮火：肺气久虚或痰饮阻肺，宗气不足，累及心血运行，导致心悸胸闷、气短唇紫。',
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·经脉别论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 21',
      quoteZh: '肺朝百脉，输精于皮毛……通调水道，下输膀胱。',
      quotePinyin: 'Fèi cháo bǎi mài, shū jīng yú pí máo... tōng tiáo shuǐ dào, xià shū páng guāng.',
      quoteEn: 'The Lung converges the hundred vessels, distributes essence to the skin and hair... and regulates the water pathways down to the Bladder.',
      commentaryEn: 'Connects respiratory rhythm with circulation, skin barrier immunity, and fluid metabolism.',
      commentaryZh: '揭示肺不仅主管呼吸，更参与全身血液汇聚、皮肤卫气布散与水液代谢。'
    }
  },
  {
    key: 'water',
    name: { zh: '水', pinyin: 'Shuǐ', en: 'Water' },
    colorHex: '#1E3A8A',
    bgSoftHex: '#EFF6FF',
    season: { zh: '冬', pinyin: 'Dōng', en: 'Winter' },
    climate: { zh: '寒', pinyin: 'Hán', en: 'Cold' },
    direction: { zh: '北', pinyin: 'Běi', en: 'North' },
    zangOrgan: { zh: '肾', pinyin: 'Shèn', en: 'Kidney' },
    fuOrgan: { zh: '膀胱', pinyin: 'Páng Guāng', en: 'Urinary Bladder' },
    senseOrgan: { zh: '耳 (及二阴)', pinyin: 'Ěr', en: 'Ears & Lower Orifices' },
    tissue: { zh: '骨 (及髓、发)', pinyin: 'Gǔ / Suǐ', en: 'Bones, Marrow & Head Hair' },
    emotion: { zh: '恐 / 惊', pinyin: 'Kǒng', en: 'Fear & Fright' },
    taste: { zh: '咸', pinyin: 'Xián', en: 'Salty' },
    voice: { zh: '呻', pinyin: 'Shēn', en: 'Groaning' },
    generates: 'wood',
    controls: 'fire',
    physiologyEn:
      'Water represents moistening, downward flow, deep storage, and latent potential (润下). The Kidneys are the "Pre-Natal Root" (先天之本), storing Essence (Jing 精), governing growth, reproduction, bone marrow, brain nourishment, and the Mingmen (Life-Gate) Fire.',
    physiologyZh:
      '“水曰润下”，具有滋润、下行、闭藏之性。肾属水，为“先天之本”，主藏精、主水、主纳气，生髓充骨通脑，内寄命门真火，为生命之根基。',
    overactingDescEn:
      'Water Overacting on Fire (水乘火 / 水气凌心): Kidney Yang deficiency fails to transform fluids; cold water floods upward to suppress Heart Yang, causing palpitations, shortness of breath, cold limbs, and edema.',
    overactingDescZh:
      '水乘火（水气凌心）：肾阳虚衰不能化水，寒水泛溢上凌心火，症见心悸气短、畏寒肢冷、水肿小便不利（真武汤证）。',
    counteractingDescEn:
      'Water Counter-acting on Earth (水侮土): Kidney Yang deficiency fails to warm Spleen Earth (火不暖土 / 肾虚水泛), resulting in early-morning "5 AM diarrhea" (五更泄泻) and abdominal cold.',
    counteractingDescZh:
      '水侮土：肾水寒盛或肾阳不足，反侮脾土运化，导致水湿泛滥、腹胀便溏、黎明五更泄泻。',
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·上古天真论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 1',
      quoteZh: '肾者主水，受五脏六腑之精而藏之，故五脏盛，乃能泻。',
      quotePinyin: 'Shèn zhě zhǔ shuǐ, shòu wǔ zàng liù fǔ zhī jīng ér cáng zhī, gù wǔ zàng shèng, nǎi néng xiè.',
      quoteEn: 'The Kidney governs Water; it receives and stores the Essence (Jing) of all five Zang and six Fu organs. Only when the five Zang flourish can Essence overflow.',
      commentaryEn: 'Defines the Kidney as the deep reservoir of constitutional vitality and longevity.',
      commentaryZh: '说明肾精兼具先天之精与后天五脏六腑充养之精，主宰人体生长壮老已的生命节律。'
    }
  }
];

export const ZANG_FU_ORGANS: ZangFuOrgan[] = [
  {
    id: 'liver',
    name: { zh: '肝', pinyin: 'Gān', en: 'Liver' },
    type: 'Zang (Yin)',
    element: 'wood',
    pairedOrgan: { zh: '胆', pinyin: 'Dǎn', en: 'Gallbladder' },
    meridianCode: 'LR',
    peakHours: '01:00 – 03:00 (丑时 Chǒu Shí)',
    westernViewEn: 'Metabolic organ in the right upper quadrant responsible for detoxification, bile synthesis, protein metabolism, and glycogen storage.',
    westernViewZh: '位于右上腹的实质性代谢器官，负责解毒、胆汁合成、蛋白质合成及糖原储存。',
    tcmFunctions: [
      {
        title: { zh: '肝主疏泄', pinyin: 'Gān Zhǔ Shū Xiè', en: 'Governs Free Coursing (Shu Xie)' },
        descEn: 'Ensures the smooth, uninhibited movement of Qi throughout the entire body, regulating emotional equilibrium, digestion (bile secretion & Spleen/Stomach Qi movement), and menstruation.',
        descZh: '调畅全身气机，推动血与津液运行；调节情志活动；协助脾胃升降运化与胆汁分泌；调理冲任二脉与女子月经。'
      },
      {
        title: { zh: '肝藏血', pinyin: 'Gān Cáng Xuè', en: 'Stores Blood & Regulates Volume' },
        descEn: 'Stores blood during rest and sleep, and releases it to the sinews and eyes during physical activity ("When a person lies down, blood returns to the Liver — 人卧血归于肝").',
        descZh: '贮藏血液、调节血量并防止出血。“人卧血归于肝”，睡眠充足则肝血得养，双目清亮、筋脉柔韧。'
      },
      {
        title: { zh: '在体合筋，开窍于目，其华在爪', pinyin: 'Hé Jīn, Kāi Qiào Yú Mù', en: 'Rules Sinews, Opens into Eyes, Manifests in Nails' },
        descEn: 'Liver Blood moistens tendons and joints; deficiency causes muscle cramps, brittle nails, dry eyes, or floaters.',
        descZh: '肝血濡养筋膜与双目，肝血充足则筋强力壮、爪甲红润坚韧、视物清晰。'
      }
    ],
    commonPatterns: [
      {
        name: { zh: '肝气郁结证', pinyin: 'Gān Qì Yù Jié', en: 'Liver Qi Stagnation' },
        symptomsEn: 'Frequent sighing, chest/rib-side distension, irritability, mood swings, PMS, wiry pulse (弦脉).',
        symptomsZh: '胸胁胀痛、善太息、情绪抑郁或急躁、乳房胀痛、月经不调、脉弦。'
      },
      {
        name: { zh: '肝火上炎证', pinyin: 'Gān Huǒ Shàng Yán', en: 'Liver Fire Blazing Upward' },
        symptomsEn: 'Red eyes, throbbing temporal headache, bitter taste in mouth, tinnitus, explosive anger, red tongue with yellow coat.',
        symptomsZh: '头晕胀痛、面红目赤、口苦咽干、急躁易怒、耳鸣如潮、舌红苔黄、脉弦数。'
      },
      {
        name: { zh: '肝血虚证', pinyin: 'Gān Xuè Xū', en: 'Liver Blood Deficiency' },
        symptomsEn: 'Dry eyes, blurred vision, muscle spasms/cramps, pale brittle nails, scanty menses, pale tongue.',
        symptomsZh: '眩晕耳鸣、两目干涩、视物模糊、肢体麻木或筋脉拘急、爪甲枯薄、舌淡脉细。'
      }
    ],
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·灵兰秘典论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 8',
      quoteZh: '肝者，将军之官，谋虑出焉。胆者，中正之官，决断出焉。',
      quotePinyin: 'Gān zhě, jiāng jūn zhī guān, móu lǜ chū yān. Dǎn zhě, zhōng zhèng zhī guān, jué duàn chū yān.',
      quoteEn: 'The Liver is the General of the Armed Forces, from whom strategy and planning emerge. The Gallbladder is the Upright Official, from whom decisiveness emerges.',
      commentaryEn: 'Liver plans strategy (vision & adaptability), while Gallbladder executes courageous decisions.',
      commentaryZh: '肝气充足则谋略深远，胆气充盛则临事果断，肝胆相照共主勇怯与谋断。'
    }
  },
  {
    id: 'heart',
    name: { zh: '心', pinyin: 'Xīn', en: 'Heart' },
    type: 'Zang (Yin)',
    element: 'fire',
    pairedOrgan: { zh: '小肠', pinyin: 'Xiǎo Cháng', en: 'Small Intestine' },
    meridianCode: 'HT',
    peakHours: '11:00 – 13:00 (午时 Wǔ Shí)',
    westernViewEn: 'Four-chambered muscular pump circulating oxygenated blood through the arterial and venous vasculature.',
    westernViewZh: '推动血液在心血管系统中循环流动的肌肉泵器官。',
    tcmFunctions: [
      {
        title: { zh: '心主血脉', pinyin: 'Xīn Zhǔ Xuè Mài', en: 'Governs Blood and Vessels' },
        descEn: 'Heart Qi propels blood through the vessels to warm and nourish tissues; manifests externally in the complexion (其华在面).',
        descZh: '心气推动血液在脉管中运行不息，营养周身，面色红润光泽反映心气心血之盛衰。'
      },
      {
        title: { zh: '心藏神', pinyin: 'Xīn Cáng Shén', en: 'Houses the Shen (Mind & Spirit)' },
        descEn: 'Governs consciousness, memory, cognition, emotional harmony, and restful sleep. When Heart Blood/Yin is deficient, Shen becomes unanchored, causing insomnia and palpitations.',
        descZh: '统帅人体生命活动及精神、意识、思维与睡眠。心血充盈则神志清晰、夜寐安和。'
      },
      {
        title: { zh: '开窍于舌，汗为心之液', pinyin: 'Kāi Qiào Yú Shé', en: 'Opens into the Tongue & Rules Sweat' },
        descEn: 'Speech clarity and the color of the tongue tip directly mirror Heart health. Profuse sweating depletes Heart Qi and Blood.',
        descZh: '舌为“心之苗”，言语流利与舌尖色泽直映心况；血汗同源，汗出过多易耗伤心气心血。'
      }
    ],
    commonPatterns: [
      {
        name: { zh: '心脾两虚证', pinyin: 'Xīn Pí Liǎng Xū', en: 'Heart & Spleen Deficiency' },
        symptomsEn: 'Palpitations, insomnia, dream-disturbed sleep, forgetfulness, fatigue, poor appetite, pale tongue with teeth marks.',
        symptomsZh: '心悸怔忡、失眠多梦、健忘、食少腹胀、倦怠乏力、面色萎黄、舌淡苔白。'
      },
      {
        name: { zh: '心火亢盛证', pinyin: 'Xīn Huǒ Kàng Shèng', en: 'Heart Fire Blazing' },
        symptomsEn: 'Tongue ulcers/sores, red painful tongue tip, severe restlessness, insomnia, dark burning urine.',
        symptomsZh: '心烦失眠、口舌生疮、舌尖红绛刺痛、口渴喜冷饮、小便短赤灼热。'
      }
    ],
    classicalQuote: {
      sourceZh: '《黄帝内经·灵枢·邪客》',
      sourceEn: 'Huangdi Neijing · Lingshu Ch. 71',
      quoteZh: '心者，五脏六腑之大主也，精神之所舍也。',
      quotePinyin: 'Xīn zhě, wǔ zàng liù fǔ zhī dà zhǔ yě, jīng shén zhī suǒ shè yě.',
      quoteEn: 'The Heart is the Great Master of the five Zang and six Fu organs, and the residence of Essence and Spirit (Shen).',
      commentaryEn: 'Explains why mental/emotional therapies and sleep medicine in TCM always treat the Heart.',
      commentaryZh: '阐明中医治疗失眠、焦虑、神志病必从调心入手的理论根基。'
    }
  },
  {
    id: 'spleen',
    name: { zh: '脾', pinyin: 'Pí', en: 'Spleen' },
    type: 'Zang (Yin)',
    element: 'earth',
    pairedOrgan: { zh: '胃', pinyin: 'Wèi', en: 'Stomach' },
    meridianCode: 'SP',
    peakHours: '09:00 – 11:00 (巳时 Sì Shí)',
    westernViewEn: 'Lymphoid organ filtering blood, recycling red blood cells, and mounting immune responses (Note: TCM Spleen encompasses pancreatic & gastrointestinal digestive functions).',
    westernViewZh: '西方医学指左上腹淋巴免疫器官；而中医之“脾”涵盖消化系统（含胰腺、小肠吸收）及水液代谢、能量转化功能。',
    tcmFunctions: [
      {
        title: { zh: '脾主运化', pinyin: 'Pí Zhǔ Yùn Huà', en: 'Governs Transformation & Transportation' },
        descEn: 'Extracts Gu Qi (Food Essence 水谷精微) from food and fluids to generate Qi and Blood, and metabolizes water to prevent internal Dampness (湿) and Phlegm (痰).',
        descZh: '运化水谷精微以化生气血，运化水湿以防痰饮水肿（“诸湿肿满，皆属于脾”）。'
      },
      {
        title: { zh: '脾主升清', pinyin: 'Pí Zhǔ Shēng Qīng', en: 'Governs Ascending the Clear' },
        descEn: 'Sends clear nourishment upward to the Heart, Lungs, and head, and holds internal organs in place (preventing prolapse).',
        descZh: '将水谷精微上输心肺头目，并维持内脏恒定位置，防止胃下垂、子宫脱垂等中气下陷之证。'
      },
      {
        title: { zh: '脾主统血', pinyin: 'Pí Zhǔ Tǒng Xuè', en: 'Commands Blood Within Vessels' },
        descEn: 'Spleen Qi holds blood inside the vessels; deficiency leads to easy bruising, nosebleeds, or heavy menstrual bleeding.',
        descZh: '统摄血液在脉管内正常循行而不逸出脉外，脾不统血则见皮下瘀斑、崩漏便血。'
      }
    ],
    commonPatterns: [
      {
        name: { zh: '脾气虚证', pinyin: 'Pí Qì Xū', en: 'Spleen Qi Deficiency' },
        symptomsEn: 'Post-meal bloating, fatigue, loose stools, weak limbs, sallow complexion, pale swollen tongue with scalloped teeth marks (齿痕舌).',
        symptomsZh: '食后腹胀、大便溏薄、少气懒言、四肢倦怠、面色萎黄、舌淡胖有齿痕。'
      },
      {
        name: { zh: '湿困脾胃证', pinyin: 'Shī Kùn Pí Wèi', en: 'Dampness Encumbering the Spleen' },
        symptomsEn: 'Heavy head ("like wrapped in a wet towel"), sticky sweet taste in mouth, chest/epigastric fullness, greasy tongue coat.',
        symptomsZh: '头重如裹、口淡或口腻、脘腹痞满、肢体困重、大便粘滞、舌苔白腻。'
      }
    ],
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·至真要大论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 74',
      quoteZh: '诸湿肿满，皆属于脾。',
      quotePinyin: 'Zhū shī zhǒng mǎn, jiē shǔ yú pí.',
      quoteEn: 'All conditions of Dampness, swelling, and fullness pertain to the Spleen.',
      commentaryEn: 'One of the nineteen foundational pathomechanism lines (病机十九条) in the Neijing.',
      commentaryZh: '《内经》病机十九条名言，指明治疗水湿、痰饮、肥胖浮肿必先健脾祛湿。'
    }
  },
  {
    id: 'lung',
    name: { zh: '肺', pinyin: 'Fèi', en: 'Lung' },
    type: 'Zang (Yin)',
    element: 'metal',
    pairedOrgan: { zh: '大肠', pinyin: 'Dà Cháng', en: 'Large Intestine' },
    meridianCode: 'LU',
    peakHours: '03:00 – 05:00 (寅时 Yín Shí)',
    westernViewEn: 'Paired respiratory organs in the thoracic cavity performing alveolar gas exchange (O₂ intake and CO₂ expulsion).',
    westernViewZh: '位于胸腔内的呼吸器官，通过肺泡进行氧气与二氧化碳的气体交换。',
    tcmFunctions: [
      {
        title: { zh: '肺主气，司呼吸', pinyin: 'Fèi Zhǔ Qì, Sī Hū Xī', en: 'Governs Qi and Respiration' },
        descEn: 'Inhales crisp natural 清气 (Clear Qi) and combines it with Spleen Gu Qi in the chest to form Zong Qi (Gathering Qi 宗气).',
        descZh: '吸入自然界清气，与脾运化之水谷精气在胸中汇合生成“宗气”，贯心脉而司呼吸。'
      },
      {
        title: { zh: '肺主宣发与肃降', pinyin: 'Xuān Fā Yǔ Sù Jiàng', en: 'Governs Diffusing & Descending' },
        descEn: 'Diffuses Wei Qi (Defensive Qi) and moisture outward to the skin and pores; descends clean Qi and fluids downward to the Kidneys and Large Intestine.',
        descZh: '宣发卫气与津液以温润皮毛、调控汗孔开阖；肃降清气与水液下归肾与膀胱。'
      },
      {
        title: { zh: '肺为娇脏', pinyin: 'Fèi Wéi Jiāo Zàng', en: 'The "Delicate Canopy Organ"' },
        descEn: 'Directly exposed to the external atmosphere via nose and throat; vulnerable to Wind, Cold, Heat, and Dryness.',
        descZh: '肺叶娇嫩，不耐寒热燥湿之邪侵袭，外感六淫往往首先犯肺。'
      }
    ],
    commonPatterns: [
      {
        name: { zh: '肺气虚证', pinyin: 'Fèi Qì Xū', en: 'Lung Qi Deficiency' },
        symptomsEn: 'Shortness of breath, weak voice, spontaneous daytime sweating, frequent colds, aversion to wind.',
        symptomsZh: '咳喘无力、少气短息、语声低微、自汗畏风、极易感冒、舌淡苔白。'
      },
      {
        name: { zh: '燥邪犯肺证', pinyin: 'Zào Xié Fàn Fèi', en: 'Dryness Invading the Lung' },
        symptomsEn: 'Dry hacking cough with scant sticky sputum, dry nose and throat, hoarse voice, dry tongue.',
        symptomsZh: '干咳无痰或痰少而粘、鼻咽干燥、唇舌干裂、脉浮数或细数。'
      }
    ],
    classicalQuote: {
      sourceZh: '《黄帝内经·素问·灵兰秘典论》',
      sourceEn: 'Huangdi Neijing · Suwen Ch. 8',
      quoteZh: '肺者，相傅之官，治节出焉。',
      quotePinyin: 'Fèi zhě, xiàng fù zhī guān, zhì jié chū yān.',
      quoteEn: 'The Lung is the Prime Minister, from whom rhythmic regulation and order emerge.',
      commentaryEn: 'Just as the Heart is the Monarch, the Lung acts as Prime Minister, setting the rhythmic cadence of breath, pulse, and fluid circulation.',
      commentaryZh: '肺辅佐心君，协调呼吸节律、全身气机升降、血液运行及水液代谢，故称“治节出焉”。'
    }
  },
  {
    id: 'kidney',
    name: { zh: '肾', pinyin: 'Shèn', en: 'Kidney' },
    type: 'Zang (Yin)',
    element: 'water',
    pairedOrgan: { zh: '膀胱', pinyin: 'Páng Guāng', en: 'Urinary Bladder' },
    meridianCode: 'KI',
    peakHours: '17:00 – 19:00 (酉时 Yǒu Shí)',
    westernViewEn: 'Retroperitoneal bean-shaped organs filtering blood plasma, regulating electrolytes, blood pressure, and erythropoietin.',
    westernViewZh: '位于腹膜后的泌尿器官，负责过滤血液、排泄代谢废物及调节水盐酸碱平衡。',
    tcmFunctions: [
      {
        title: { zh: '肾藏精，主生长发育生殖', pinyin: 'Shèn Cáng Jīng', en: 'Stores Essence (Jing) & Governs Lifecycle' },
        descEn: 'Houses Pre-Natal and Post-Natal Jing, driving development in 7-year (female) and 8-year (male) cycles: dentition, puberty, fertility, and aging.',
        descZh: '封藏先天与后天之精，主导人体“女七男八”生命节律的生长、发育、生殖与衰老。'
      },
      {
        title: { zh: '肾主水、主纳气', pinyin: 'Zhǔ Shuǐ, Zhǔ Nà Qì', en: 'Governs Water & Grasps Qi' },
        descEn: 'Kidney Yang steams and transforms fluids; also anchors inhaled Lung Qi deep into the lower abdomen (Dan Tian) for deep breathing.',
        descZh: '通过肾阳气化蒸腾调节全身水液排泄；摄纳肺所吸入之清气归于丹田，防止呼吸浅表喘促。'
      },
      {
        title: { zh: '肾主骨生髓，其华在发', pinyin: 'Zhǔ Gǔ Shēng Suǐ', en: 'Governs Bones, Generates Marrow, Blooms in Hair' },
        descEn: 'Nourishes skeletal strength, teeth ("teeth are the surplus of bone"), brain ("the brain is the Sea of Marrow"), and lustrous hair.',
        descZh: '肾精生骨髓、养脑髓（“脑为髓之海”）、固牙齿（“齿为骨之余”）、乌须发（“发为血之余，其华在发”）。'
      }
    ],
    commonPatterns: [
      {
        name: { zh: '肾阴虚证', pinyin: 'Shèn Yīn Xū', en: 'Kidney Yin Deficiency' },
        symptomsEn: 'Sore lower back and knees, tinnitus, night sweats, five-palm heat (五心烦热), dizziness, red peeled tongue, thready rapid pulse.',
        symptomsZh: '腰膝酸软、头晕耳鸣、五心烦热、潮热盗汗、咽干颧红、舌红少苔、脉细数（六味地黄丸证）。'
      },
      {
        name: { zh: '肾阳虚证', pinyin: 'Shèn Yáng Xū', en: 'Kidney Yang Deficiency' },
        symptomsEn: 'Cold lower back and knees, aversion to cold, frequent clear night urination (nocturia), lethargy, low libido, pale swollen tongue.',
        symptomsZh: '腰膝冷痛、畏寒肢冷、精神萎靡、夜尿频多清长、黎明腹泻、舌淡胖苔白、脉沉细尺弱（金匮肾气丸证）。'
      }
    ],
    classicalQuote: {
      sourceZh: '张景岳《景岳全书·命门余义》',
      sourceEn: 'Zhang Jingyue · Complete Works of Jingyue (1624 CE)',
      quoteZh: '命门为元气之根，为水火之宅。五脏之阴气，非此不能滋；五脏之阳气，非此不能发。',
      quotePinyin: 'Mìng mén wéi yuán qì zhī gēn, wéi shuǐ huǒ zhī zhái. Wǔ zàng zhī yīn qì, fēi cǐ bù néng zī; wǔ zàng zhī yáng qì, fēi cǐ bù néng fā.',
      quoteEn: 'The Mingmen (Kidney Life-Gate) is the root of Original Qi and the residence of Water and Fire. The Yin of the five Zang cannot be nourished without it; the Yang of the five Zang cannot be kindled without it.',
      commentaryEn: 'Explains why Kidney Yin and Kidney Yang are the ultimate Yin-Yang thermostat of the human body.',
      commentaryZh: '确立肾阴（真阴）与肾阳（真阳/命门火）为全身五脏六腑阴阳之根本。'
    }
  }
];

export const QI_CLOCK_HOURS: QiClockHour[] = [
  {
    branchZh: '寅时',
    branchPinyin: 'Yín Shí',
    animalEn: 'Tiger',
    timeRange: '03:00 – 05:00',
    startHour: 3,
    endHour: 5,
    organ: { zh: '肺经当令', pinyin: 'Fèi Jīng', en: 'Lung Meridian' },
    meridianCode: 'LU',
    element: 'metal',
    physiologicalActionEn: 'The Lung distributes fresh Qi and Blood to all organs as the body transitions from Yin stillness to Yang awakening.',
    physiologicalActionZh: '大地阴阳由静转动，肺朝百脉，将气血重新分配输布至全身脏腑。',
    yangshengTipEn: 'Stay in deep sleep and keep shoulders covered; people with Lung deficiency often wake up coughing around 3–4 AM.',
    yangshengTipZh: '宜深度熟睡、注意保暖；肺气不足或有痰热者常在此刻醒来咳嗽。'
  },
  {
    branchZh: '卯时',
    branchPinyin: 'Mǎo Shí',
    animalEn: 'Rabbit',
    timeRange: '05:00 – 07:00',
    startHour: 5,
    endHour: 7,
    organ: { zh: '大肠经当令', pinyin: 'Dà Cháng Jīng', en: 'Large Intestine Meridian' },
    meridianCode: 'LI',
    element: 'metal',
    physiologicalActionEn: 'Paired with the Lung, the Large Intestine awakens peristalsis to eliminate metabolic waste and clear turbidity.',
    physiologicalActionZh: '天门开，肺气足则大肠传导有力，推动糟粕排出体外。',
    yangshengTipEn: 'Wake gently, drink a glass of warm water (温开水) to moisten the intestines, and cultivate a regular morning bowel habit.',
    yangshengTipZh: '晨起宜饮一杯温开水以润肠通便，养成定时排便的习惯。'
  },
  {
    branchZh: '辰时',
    branchPinyin: 'Chén Shí',
    animalEn: 'Dragon',
    timeRange: '07:00 – 09:00',
    startHour: 7,
    endHour: 9,
    organ: { zh: '胃经当令', pinyin: 'Wèi Jīng', en: 'Stomach Meridian' },
    meridianCode: 'ST',
    element: 'earth',
    physiologicalActionEn: 'Yang Qi is rising strongly; the Stomach ("Sea of Food and Drink") is primed to receive and rot/ripen warm nourishment.',
    physiologicalActionZh: '天地阳气升发，胃气最旺，受纳腐熟水谷能力最强。',
    yangshengTipEn: 'Eat a warm, nourishing breakfast (congee, eggs, warm grains) and avoid iced coffee or raw cold smoothies on an empty stomach.',
    yangshengTipZh: '必吃温热营养早餐（如五谷粥、鸡蛋），切忌空腹饮用冰水或寒凉生冷之品。'
  },
  {
    branchZh: '巳时',
    branchPinyin: 'Sì Shí',
    animalEn: 'Snake',
    timeRange: '09:00 – 11:00',
    startHour: 9,
    endHour: 11,
    organ: { zh: '脾经当令', pinyin: 'Pí Jīng', en: 'Spleen Meridian' },
    meridianCode: 'SP',
    element: 'earth',
    physiologicalActionEn: 'The Spleen transforms breakfast into clear Gu Qi and ascends nourishment to the brain and muscles.',
    physiologicalActionZh: '脾主运化升清，将胃腐熟的食物转化为气血精微，上输心肺与头目。',
    yangshengTipEn: 'Peak morning window for deep mental work, study, and physical movement; stand up and stretch every hour to avoid injuring Spleen Qi ("prolonged sitting injures the flesh — 久坐伤肉").',
    yangshengTipZh: '上午精力最充沛的黄金学习与工作时段；宜间歇起身活动，避免“久坐伤肉”。'
  },
  {
    branchZh: '午时',
    branchPinyin: 'Wǔ Shí',
    animalEn: 'Horse',
    timeRange: '11:00 – 13:00',
    startHour: 11,
    endHour: 13,
    organ: { zh: '心经当令', pinyin: 'Xīn Jīng', en: 'Heart Meridian' },
    meridianCode: 'HT',
    element: 'fire',
    physiologicalActionEn: 'Solar Yang reaches its zenith and the first seed of Yin is born (一阴生). The Heart governs Blood and Spirit.',
    physiologicalActionZh: '日中阳气最盛，阳极生阴（一阴生），心主神明、推动血脉。',
    yangshengTipEn: 'Enjoy a balanced lunch followed by a 15–20 minute quiet eyes-closed rest or nap (子午觉) to nourish Heart Yin and calm Shen.',
    yangshengTipZh: '午餐宜七分饱，餐后静坐闭目养神或小憩15–20分钟（“子午觉”），以养心阴。'
  },
  {
    branchZh: '未时',
    branchPinyin: 'Wèi Shí',
    animalEn: 'Goat',
    timeRange: '13:00 – 15:00',
    startHour: 13,
    endHour: 15,
    organ: { zh: '小肠经当令', pinyin: 'Xiǎo Cháng Jīng', en: 'Small Intestine Meridian' },
    meridianCode: 'SI',
    element: 'fire',
    physiologicalActionEn: 'The Small Intestine "separates the Clear from the Turbid" (泌别清浊), absorbing nutrients and directing waste downward.',
    physiologicalActionZh: '小肠受盛化物、泌别清浊，吸收水谷精微并下输水液与糟粕。',
    yangshengTipEn: 'Sip warm water or herbal tea to assist fluid separation and circulation through the afternoon.',
    yangshengTipZh: '午后宜适量饮用温水或清茶，助小肠泌别清浊、稀释血液。'
  },
  {
    branchZh: '申时',
    branchPinyin: 'Shēn Shí',
    animalEn: 'Monkey',
    timeRange: '15:00 – 17:00',
    startHour: 15,
    endHour: 17,
    organ: { zh: '膀胱经当令', pinyin: 'Páng Guāng Jīng', en: 'Bladder Meridian' },
    meridianCode: 'BL',
    element: 'water',
    physiologicalActionEn: 'The Foot Taiyang Bladder Meridian—the longest channel traversing the brain, neck, and entire spine—reaches peak flow.',
    physiologicalActionZh: '足太阳膀胱经循行头项、夹脊贯臀，上通脑络，此时气血最旺、记忆力与体力俱佳。',
    yangshengTipEn: 'Second prime window for study, exercise, and hydration; gently tap the back of the neck and spine to relieve stagnation.',
    yangshengTipZh: '全天第二个高效学习与运动时段，宜多饮温水排毒，切勿憋尿。'
  },
  {
    branchZh: '酉时',
    branchPinyin: 'Yǒu Shí',
    animalEn: 'Rooster',
    timeRange: '17:00 – 19:00',
    startHour: 17,
    endHour: 19,
    organ: { zh: '肾经当令', pinyin: 'Shèn Jīng', en: 'Kidney Meridian' },
    meridianCode: 'KI',
    element: 'water',
    physiologicalActionEn: 'As dusk falls, the Kidneys gather and store the Essence (Jing) generated by the organs throughout the day.',
    physiologicalActionZh: '日落而息，肾主藏精，开始贮藏一日五脏六腑所化生之精气。',
    yangshengTipEn: 'Eat a light, early dinner; avoid overworking or heavy stimulant intake so Kidney Qi can shift into storage mode.',
    yangshengTipZh: '晚餐宜清淡少食，不宜过劳或大量饮酒，顺应肾气收敛封藏之性。'
  },
  {
    branchZh: '戌时',
    branchPinyin: 'Xū Shí',
    animalEn: 'Dog',
    timeRange: '19:00 – 21:00',
    startHour: 19,
    endHour: 21,
    organ: { zh: '心包经当令', pinyin: 'Xīn Bāo Jīng', en: 'Pericardium Meridian' },
    meridianCode: 'PC',
    element: 'fire',
    physiologicalActionEn: 'The Pericardium protects the Heart Monarch, clears pathogenic heat from the chest, and promotes emotional joy and connection.',
    physiologicalActionZh: '心包为“膻中”，代心受邪、护卫心主，喜乐出焉。',
    yangshengTipEn: 'Take an evening stroll, converse warmly with family, massage Neiguan (PC6), and unwind from work stress.',
    yangshengTipZh: '宜散步谈心、放松心情、拍打心包经或按揉内关穴，释放日间压力。'
  },
  {
    branchZh: '亥时',
    branchPinyin: 'Hài Shí',
    animalEn: 'Pig',
    timeRange: '21:00 – 23:00',
    startHour: 21,
    endHour: 23,
    organ: { zh: '三焦经当令', pinyin: 'Sān Jiāo Jīng', en: 'San Jiao (Triple Burner) Meridian' },
    meridianCode: 'TE',
    element: 'fire',
    physiologicalActionEn: 'The Triple Burner harmonizes the hundred passages of Qi and water across the Upper, Middle, and Lower Jiao as the body prepares for sleep.',
    physiologicalActionZh: '三焦通百脉，统管全身气机与水液通道，百脉皆归于休养生息。',
    yangshengTipEn: 'Soak your feet in warm water (泡脚) for 15 minutes, dim blue screens, and prepare for sleep before 23:00.',
    yangshengTipZh: '宜温水泡脚引火归元，放下手机、安神定志，准备在23点前入睡。'
  },
  {
    branchZh: '子时',
    branchPinyin: 'Zǐ Shí',
    animalEn: 'Rat',
    timeRange: '23:00 – 01:00',
    startHour: 23,
    endHour: 1,
    organ: { zh: '胆经当令', pinyin: 'Dǎn Jīng', en: 'Gallbladder Meridian' },
    meridianCode: 'GB',
    element: 'wood',
    physiologicalActionEn: 'Midnight is the pivot where Yin reaches its extreme and the first spark of Yang is born (一阳生). The Gallbladder initiates Shaoyang renewal.',
    physiologicalActionZh: '夜半阴极生阳（一阳初生），少阳胆气初萌，“凡十一脏取决于胆”。',
    yangshengTipEn: 'Crucial "sleep beauty & longevity" window: being asleep by 23:00 nurtures the nascent Yang Qi; staying up late depletes Gallbladder & Liver Yin.',
    yangshengTipZh: '中医养生最重“睡子觉”，23点前入睡方能养护初生之少阳生机，熬夜最伤肝胆阴血。'
  },
  {
    branchZh: '丑时',
    branchPinyin: 'Chǒu Shí',
    animalEn: 'Ox',
    timeRange: '01:00 – 03:00',
    startHour: 1,
    endHour: 3,
    organ: { zh: '肝经当令', pinyin: 'Gān Jīng', en: 'Liver Meridian' },
    meridianCode: 'LR',
    element: 'wood',
    physiologicalActionEn: 'Blood returns to the Liver (人卧血归于肝) for deep detoxification, renewal, and emotional resetting.',
    physiologicalActionZh: '“人卧血归于肝”，肝藏血并推陈出新、涵养肝木之气。',
    yangshengTipEn: 'Must be in deep, uninterrupted sleep; waking regularly between 1–3 AM often signals Liver Fire or Liver Qi stagnation.',
    yangshengTipZh: '必须处于深度睡眠状态；若常在凌晨1–3点醒来烦躁多梦，多提示肝火偏旺或肝气郁结。'
  }
];
