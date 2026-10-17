import { MeridianChannel, Acupoint } from '@/types/tcm';

export const MERIDIAN_CHANNELS: MeridianChannel[] = [
  {
    id: 'LU',
    name: { zh: '手太阴肺经', pinyin: 'Shǒu Tài Yīn Fèi Jīng', en: 'Lung Meridian (LU)' },
    fullTitle: { zh: '手太阴肺经 (11穴)', pinyin: 'Hand Taiyin Lung', en: 'Hand Taiyin Lung Channel (11 Points)' },
    polarity: 'Yin',
    element: 'metal',
    peakTime: '03:00 – 05:00 (寅时)',
    flowDirectionEn: 'Chest → Medial Aspect of Arm → Radial Thumb Tip (从胸走手)',
    flowDirectionZh: '从胸走手：起于中焦，上行肺系，出锁骨下（中府），沿上肢内侧前缘下行至拇指桡侧端（少商）。',
    pathwaySummaryEn: 'Originates in the Middle Jiao, descends to the Large Intestine, ascends through the diaphragm to the Lung and throat, emerges at LU1 (Zhongfu) below the clavicle, and travels down the radial border of the inner arm to the thumb.',
    pathwaySummaryZh: '起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横出腋下，沿上肢内侧前缘下行，止于拇指少商穴。',
    svgPathAnterior: 'M 39,26 Q 35,24 31,26 L 26,38 L 21,50 L 17,60',
    points3D: [
      [-0.36, 1.15, 0.22],
      [-0.48, 1.10, 0.16],
      [-0.58, 0.72, 0.12],
      [-0.68, 0.36, 0.14],
      [-0.76, 0.10, 0.18]
    ]
  },
  {
    id: 'LI',
    name: { zh: '手阳明大肠经', pinyin: 'Shǒu Yáng Míng Dà Cháng Jīng', en: 'Large Intestine Meridian (LI)' },
    fullTitle: { zh: '手阳明大肠经 (20穴)', pinyin: 'Hand Yangming Large Intestine', en: 'Hand Yangming Large Intestine Channel (20 Points)' },
    polarity: 'Yang',
    element: 'metal',
    peakTime: '05:00 – 07:00 (卯时)',
    flowDirectionEn: 'Index Finger → Lateral Arm → Shoulder & Neck → Contralateral Nose (从手走头)',
    flowDirectionZh: '从手走头：起于食指端（商阳），经合谷沿上肢外侧前缘上肩、过颈，交人中，止于对侧鼻旁（迎香）。',
    pathwaySummaryEn: 'Starts at the tip of the index finger, passes through LI4 (Hegu) between thumb and index finger, ascends the dorsal-radial forearm and lateral elbow (LI11 Quchi) to the shoulder, neck, face, and ends beside the opposite nostril (LI20 Yingxiang).',
    pathwaySummaryZh: '起于食指桡侧端，经第一、二掌骨间合谷穴，沿前臂外侧前缘上行至曲池、肩髃，上颈贯颊，止于对侧鼻翼旁迎香穴。',
    svgPathAnterior: 'M 18,61 L 23,49 L 28,37 L 33,24 L 44,18 L 52,13',
    points3D: [
      [-0.78, 0.08, 0.14],
      [-0.66, 0.42, 0.04],
      [-0.52, 0.85, 0.02],
      [-0.42, 1.24, 0.05],
      [-0.12, 1.56, 0.22],
      [0.06, 1.62, 0.26]
    ]
  },
  {
    id: 'ST',
    name: { zh: '足阳明胃经', pinyin: 'Zú Yáng Míng Wèi Jīng', en: 'Stomach Meridian (ST)' },
    fullTitle: { zh: '足阳明胃经 (45穴)', pinyin: 'Foot Yangming Stomach', en: 'Foot Yangming Stomach Channel (45 Points)' },
    polarity: 'Yang',
    element: 'earth',
    peakTime: '07:00 – 09:00 (辰时)',
    flowDirectionEn: 'Infraorbital Face → Chest & Abdomen → Anterior Thigh & Tibia → 2nd Toe (从头走足)',
    flowDirectionZh: '从头走足：起于鼻旁目下（承泣），环口下颈，循胸腹第二侧线，经大腿前侧及犊鼻、足三里下行至第二趾端（厉兑）。',
    pathwaySummaryEn: 'Rich in both Qi and Blood (多气多血之经). Begins below the eye, circles the mouth, ascends to the forehead, and descends along the throat, nipple line, abdomen (2 cun lateral to midline), anterior thigh, knee, and lateral shin (ST36 Zusanli) to the second toe.',
    pathwaySummaryZh: '多气多血之经。起于目下承泣，下循鼻外入上齿，环唇下交承浆，循喉咙下胸腹，经膝下足三里，止于足次趾厉兑穴。',
    svgPathAnterior: 'M 47,12 L 45,16 L 43,28 L 45,44 L 44,65 L 43,78 L 43,95',
    points3D: [
      [-0.08, 1.65, 0.26],
      [-0.14, 1.52, 0.22],
      [-0.24, 1.10, 0.24],
      [-0.16, 0.65, 0.24],
      [-0.20, 0.10, 0.20],
      [-0.20, -0.45, 0.18],
      [-0.20, -0.95, 0.22]
    ]
  },
  {
    id: 'SP',
    name: { zh: '足太阴脾经', pinyin: 'Zú Tài Yīn Pí Jīng', en: 'Spleen Meridian (SP)' },
    fullTitle: { zh: '足太阴脾经 (21穴)', pinyin: 'Foot Taiyin Spleen', en: 'Foot Taiyin Spleen Channel (21 Points)' },
    polarity: 'Yin',
    element: 'earth',
    peakTime: '09:00 – 11:00 (巳时)',
    flowDirectionEn: 'Medial Great Toe → Medial Ankle & Tibia → Abdomen → Lateral Chest (从足走腹胸)',
    flowDirectionZh: '从足走胸腹：起于足大趾内侧端（隐白），上内踝前，经三阴交、阴陵泉，沿大腿内侧入腹属脾络胃，上膈连舌本。',
    pathwaySummaryEn: 'Starts on the medial aspect of the big toe, passes anterior to the medial malleolus, ascends the medial tibia through SP6 (Sanyinjiao—where Liver, Spleen, and Kidney channels cross) and SP9 (Yinlingquan), enters the abdomen to connect with Spleen and Stomach, and spreads below the tongue.',
    pathwaySummaryZh: '起于足大趾内侧端隐白穴，上行内踝前，交会足三阴于三阴交，循胫骨后缘经阴陵泉入腹，属脾络胃，上膈夹咽连舌本。',
    svgPathAnterior: 'M 48,96 L 47,85 L 47,73 L 46,56 L 42,40 L 38,31',
    points3D: [
      [-0.12, -0.96, 0.22],
      [-0.14, -0.68, 0.14],
      [-0.15, -0.38, 0.14],
      [-0.16, 0.15, 0.18],
      [-0.24, 0.72, 0.22],
      [-0.36, 1.02, 0.18]
    ]
  },
  {
    id: 'HT',
    name: { zh: '手少阴心经', pinyin: 'Shǒu Shào Yīn Xīn Jīng', en: 'Heart Meridian (HT)' },
    fullTitle: { zh: '手少阴心经 (9穴)', pinyin: 'Hand Shaoyin Heart', en: 'Hand Shaoyin Heart Channel (9 Points)' },
    polarity: 'Yin',
    element: 'fire',
    peakTime: '11:00 – 13:00 (午时)',
    flowDirectionEn: 'Heart & Axilla → Posteromedial Arm → Ulnar Wrist (HT7) → Little Finger (从胸走手)',
    flowDirectionZh: '从胸走手：起于心中，出腋下（极泉），沿上肢内侧后缘下行，经腕部神门穴，止于小指桡侧端（少冲）。',
    pathwaySummaryEn: 'Originates in the Heart, emerges in the axilla (HT1 Jiquan), descends along the posterior-medial border of the upper arm and forearm, crosses the ulnar wrist crease at HT7 (Shenmen—Spirit Gate), and terminates at the radial tip of the little finger.',
    pathwaySummaryZh: '起于心中，出属心系，下膈络小肠；直行者从心系上肺，下出腋窝极泉穴，循臂内后缘经神门穴，止于小指少冲穴。',
    svgPathAnterior: 'M 36,30 L 31,42 L 26,53 L 22,62',
    points3D: [
      [-0.38, 1.05, 0.12],
      [-0.50, 0.68, 0.08],
      [-0.62, 0.32, 0.10],
      [-0.70, 0.06, 0.12]
    ]
  },
  {
    id: 'BL',
    name: { zh: '足太阳膀胱经', pinyin: 'Zú Tài Yáng Páng Guāng Jīng', en: 'Bladder Meridian (BL)' },
    fullTitle: { zh: '足太阳膀胱经 (67穴)', pinyin: 'Foot Taiyang Bladder', en: 'Foot Taiyang Bladder Channel (67 Points)' },
    polarity: 'Yang',
    element: 'water',
    peakTime: '15:00 – 17:00 (申时)',
    flowDirectionEn: 'Inner Canthus → Vertex & Occiput → Dual Paraspinal Back Shu Lines → Posterior Leg → 5th Toe (从头走足)',
    flowDirectionZh: '从头走足：起于目内眦（睛明），上额交百会，下项夹脊分为两支背俞线，贯臀入腘中（委中），下行外踝后至小趾外侧（至阴）。',
    pathwaySummaryEn: 'The longest and most expansive Yang meridian in the body, housing all the Back-Shu (背俞穴) diagnostic and therapeutic points for every Zang-Fu organ along the spine.',
    pathwaySummaryZh: '人体最长、穴位最多之巨阳经脉，挟脊柱两旁走行，总揽五脏六腑全部“背俞穴”（肺俞、心俞、肝俞、脾俞、肾俞等），主一身之表。',
    svgPathPosterior: 'M 48,8 L 46,16 L 45,25 L 45,50 L 45,70 L 45,86 L 44,96',
    points3D: [
      [-0.08, 1.72, 0.05],
      [-0.10, 1.45, -0.16],
      [-0.14, 1.10, -0.22],
      [-0.14, 0.65, -0.20],
      [-0.16, 0.15, -0.22],
      [-0.18, -0.35, -0.18],
      [-0.18, -0.85, -0.14]
    ]
  },
  {
    id: 'KI',
    name: { zh: '足少阴肾经', pinyin: 'Zú Shào Yīn Shèn Jīng', en: 'Kidney Meridian (KI)' },
    fullTitle: { zh: '足少阴肾经 (27穴)', pinyin: 'Foot Shaoyin Kidney', en: 'Foot Shaoyin Kidney Channel (27 Points)' },
    polarity: 'Yin',
    element: 'water',
    peakTime: '17:00 – 19:00 (酉时)',
    flowDirectionEn: 'Sole of Foot (KI1) → Medial Malleolus (KI3) → Medial Leg → Abdomen & Chest (从足走腹胸)',
    flowDirectionZh: '从足走胸腹：起于足底涌泉穴，绕内踝后太溪穴，沿下肢内侧后缘上行入腹，属肾络膀胱，贯肝膈入肺中。',
    pathwaySummaryEn: 'Begins on the sole of the foot at KI1 (Yongquan—Gushing Spring), loops behind the medial malleolus at KI3 (Taixi), ascends the posteromedial leg and spine to the Kidney, Liver, Lung, and root of the tongue.',
    pathwaySummaryZh: '起于足心涌泉穴，出于舟骨粗隆下，循内踝后太溪穴，上小腿内侧后缘，贯脊属肾络膀胱，直行上贯肝膈入肺，挟舌本。',
    svgPathAnterior: 'M 49,96 L 48,88 L 48,68 L 48,48 L 47,26',
    points3D: [
      [-0.14, -0.98, 0.08],
      [-0.12, -0.82, 0.06],
      [-0.12, -0.35, 0.10],
      [-0.08, 0.55, 0.22],
      [-0.10, 1.12, 0.22]
    ]
  },
  {
    id: 'PC',
    name: { zh: '手厥阴心包经', pinyin: 'Shǒu Jué Yīn Xīn Bāo Jīng', en: 'Pericardium Meridian (PC)' },
    fullTitle: { zh: '手厥阴心包经 (9穴)', pinyin: 'Hand Jueyin Pericardium', en: 'Hand Jueyin Pericardium Channel (9 Points)' },
    polarity: 'Yin',
    element: 'fire',
    peakTime: '19:00 – 21:00 (戌时)',
    flowDirectionEn: 'Chest → Midline of Inner Arm (PC6) → Center of Palm (PC8) → Middle Finger (从胸走手)',
    flowDirectionZh: '从胸走手：起于胸中，出乳外侧天池穴，循上肢内侧中线下行，经内关、劳宫，止于中指尖端（中冲）。',
    pathwaySummaryEn: 'Starts in the chest, wraps the Pericardium, descends through the Three Jiao, and travels straight down the midline of the inner arm through PC6 (Neiguan) and PC8 (Laogong in the palm) to the tip of the middle finger.',
    pathwaySummaryZh: '起于胸中，出属心包络，下膈历络三焦；其支者循胸出胁，沿上肢内侧正中线下行，经内关、掌中劳宫，止于中指中冲穴。',
    svgPathAnterior: 'M 38,28 L 29,40 L 24,52 L 19,61',
    points3D: [
      [-0.36, 1.08, 0.20],
      [-0.54, 0.70, 0.10],
      [-0.65, 0.30, 0.12],
      [-0.74, 0.05, 0.15]
    ]
  },
  {
    id: 'GB',
    name: { zh: '足少阳胆经', pinyin: 'Zú Shào Yáng Dǎn Jīng', en: 'Gallbladder Meridian (GB)' },
    fullTitle: { zh: '足少阳胆经 (44穴)', pinyin: 'Foot Shaoyang Gallbladder', en: 'Foot Shaoyang Gallbladder Channel (44 Points)' },
    polarity: 'Yang',
    element: 'wood',
    peakTime: '23:00 – 01:00 (子时)',
    flowDirectionEn: 'Outer Canthus & Temple → Occiput (GB20) & Shoulder (GB21) → Lateral Ribcage, Hip & Leg (GB34) → 4th Toe (从头走足)',
    flowDirectionZh: '从头走足：起于目外眦（瞳子髎），绕耳后及头侧，经风池、肩井，循胁肋及下肢外侧中线（阳陵泉），止于第四趾端。',
    pathwaySummaryEn: 'The pivot of the Yang channels, governing the entire lateral aspect of the body (head temples, neck base, shoulder, flank, lateral hip, IT band, fibula, and ankle).',
    pathwaySummaryZh: '少阳为枢，统管头身側面：起于目外眦，曲折循行头侧颞部，下风池、肩井，沿胸胁侧面及大腿、小腿外侧中线下行至足第四趾。',
    svgPathAnterior: 'M 44,11 L 43,17 L 38,22 L 39,38 L 41,54 L 41,76 L 41,95',
    svgPathPosterior: 'M 44,15 L 40,22 L 40,52 L 41,76 L 41,94',
    points3D: [
      [-0.12, 1.66, 0.16],
      [-0.14, 1.48, -0.12],
      [-0.26, 1.32, 0.00],
      [-0.26, 0.75, 0.04],
      [-0.26, 0.25, 0.02],
      [-0.24, -0.38, 0.04],
      [-0.22, -0.94, 0.14]
    ]
  },
  {
    id: 'LR',
    name: { zh: '足厥阴肝经', pinyin: 'Zú Jué Yīn Gān Jīng', en: 'Liver Meridian (LR)' },
    fullTitle: { zh: '足厥阴肝经 (14穴)', pinyin: 'Foot Jueyin Liver', en: 'Foot Jueyin Liver Channel (14 Points)' },
    polarity: 'Yin',
    element: 'wood',
    peakTime: '01:00 – 03:00 (丑时)',
    flowDirectionEn: 'Dorsum of Great Toe → Dorsum of Foot (LR3) → Medial Leg → Lower Abdomen & Ribcage → Vertex (从足走腹胸巅顶)',
    flowDirectionZh: '从足走腹胸：起于足大趾背毫毛部（大敦），经足背太冲穴，沿下肢内侧上行绕阴器、抵小腹、布胁肋，上连目系会于百会。',
    pathwaySummaryEn: 'Starts on the big toe, crosses the dorsum of the foot at LR3 (Taichong), ascends the medial leg, circles the external genitalia, enters the lower abdomen and ribcage (LR14 Qimen), and ascends internally to the eyes and vertex (GV20 Baihui).',
    pathwaySummaryZh: '起于大趾背大敦穴，经行间、太冲上内踝前，循股内侧绕阴器、入小腹，挟胃属肝络胆，布胁肋，循喉咙之后连目系，与督脉会于巅顶。',
    svgPathAnterior: 'M 47,96 L 46,91 L 46,72 L 47,52 L 42,35',
    points3D: [
      [-0.14, -0.96, 0.24],
      [-0.15, -0.88, 0.20],
      [-0.16, -0.35, 0.16],
      [-0.12, 0.35, 0.22],
      [-0.24, 0.88, 0.24]
    ]
  },
  {
    id: 'CV',
    name: { zh: '任脉 (奇经八脉)', pinyin: 'Rèn Mài', en: 'Conception Vessel (Ren Mai / CV)' },
    fullTitle: { zh: '任脉 · 阴脉之海 (24穴)', pinyin: 'Sea of Yin Meridians', en: 'Ren Mai · Sea of All Yin Channels (24 Points)' },
    polarity: 'Yin',
    element: 'water',
    peakTime: 'Continuous Reservoir (奇经蓄溢)',
    flowDirectionEn: 'Perineum → Anterior Midline of Abdomen, Chest & Throat → Lower Lip (循腹胸正中线上行)',
    flowDirectionZh: '起于胞中，出于会阴，沿腹部、胸部、咽喉正中线上行，经关元、气海、中脘、膻中，止于下唇下承浆穴。',
    pathwaySummaryEn: 'Known as the "Sea of the Yin Meridians" (阴脉之海). Travels directly up the anterior midline, governing reproductive essence, pregnancy ("Ren governs the fetus — 任主胞胎"), and the Three Jiao.',
    pathwaySummaryZh: '总任一身之阴经，故称“阴脉之海”。循腹胸正中线上行，汇聚关元、气海、神阙、中脘、膻中等要穴，主治生殖、脾胃与心肺虚证。',
    svgPathAnterior: 'M 50,53 L 50,45 L 50,38 L 50,28 L 50,16',
    points3D: [
      [0, 0.35, 0.24],
      [0, 0.58, 0.26],
      [0, 0.85, 0.26],
      [0, 1.12, 0.25],
      [0, 1.54, 0.25]
    ]
  },
  {
    id: 'GV',
    name: { zh: '督脉 (奇经八脉)', pinyin: 'Dū Mài', en: 'Governing Vessel (Du Mai / GV)' },
    fullTitle: { zh: '督脉 · 阳脉之海 (28穴)', pinyin: 'Sea of Yang Meridians', en: 'Du Mai · Sea of All Yang Channels (28 Points)' },
    polarity: 'Yang',
    element: 'fire',
    peakTime: 'Continuous Reservoir (奇经蓄溢)',
    flowDirectionEn: 'Coccyx → Posterior Midline of Spine (GV4, GV14) → Vertex (GV20) → Upper Lip (循背脊正中线上行至头顶)',
    flowDirectionZh: '起于胞中，下出会阴，沿脊柱正中线上行（命门、大椎），入脑上巅顶（百会），沿额鼻下行止于上唇系带（龈交）。',
    pathwaySummaryEn: 'Known as the "Sea of the Yang Meridians" (阳脉之海). Ascends directly inside and along the spinal column, entering the brain and crowning at GV20 (Baihui) to command all Yang Qi in the body.',
    pathwaySummaryZh: '总督一身之阳经，故称“阳脉之海”。行于背部正中，贯脊属肾入脑，统摄命门、大椎、风府、百会、水沟（人中）等急救与扶阳大穴。',
    svgPathPosterior: 'M 50,52 L 50,40 L 50,20 L 50,6',
    points3D: [
      [0, 0.35, -0.22],
      [0, 0.65, -0.22],
      [0, 1.35, -0.18],
      [0, 1.80, 0.02],
      [0, 1.60, 0.26]
    ]
  }
];

export const KEY_ACUPOINTS: Acupoint[] = [
  {
    code: 'LI4',
    name: { zh: '合谷', pinyin: 'Hé Gǔ', en: 'Joining Valley' },
    etymologyEn: 'Named "Joining Valley" because when the thumb and index finger are brought together, the flesh mounds up like two mountain ridges meeting over a deep valley.',
    etymologyZh: '拇指与食指并拢时，第一、二掌骨之间肌肉隆起如山峰，指骨相合如深谷，故名“合谷”。',
    meridianId: 'LI',
    meridianName: { zh: '手阳明大肠经', pinyin: 'Shǒu Yáng Míng', en: 'Large Intestine Meridian' },
    element: 'metal',
    categoryBadge: { zh: '原穴 · 四总穴（面口合谷收）', pinyin: 'Yuán Xué', en: 'Yuan-Source & Command Point of Face/Mouth' },
    locationEn: 'On the dorsum of the hand, between the 1st and 2nd metacarpal bones, at the midpoint of the radial border of the 2nd metacarpal bone.',
    locationZh: '在手背，第1、2掌骨间，当第二掌骨桡侧的中点处。',
    cunGuideEn: 'Press the thumb interphalangeal joint crease of one hand against the web margin between the thumb and index finger of the other hand; the tip of the thumb lands directly on LI4.',
    cunGuideZh: '简便取穴：以一手的拇指指骨关节横纹，放在另一手拇、食指之间的指蹼缘上，当拇指尖下即是此穴。',
    actions: [
      { zh: '疏风解表', pinyin: 'Shū Fēng Jiě Biǎo', en: 'Expels Wind & Releases the Exterior' },
      { zh: '通络镇痛', pinyin: 'Tōng Luò Zhèn Tòng', en: 'Unblocks Meridians & Stops Pain' },
      { zh: '清泄肺气', pinyin: 'Qīng Xiè Fèi Qì', en: 'Clears Heat & Regulates Sweating' }
    ],
    indicationsEn: [
      'Headache, toothache, facial paralysis, sinus congestion ("Face and mouth disorders are commanded by Hegu — 面口合谷收")',
      'Common cold with fever, chills, or absence of sweating',
      'Abdominal pain, constipation, or dysmenorrhea (strongly moves Qi)'
    ],
    indicationsZh: [
      '头面五官诸疾：头痛、牙痛、目赤肿痛、鼻渊、面瘫（“面口合谷收”）',
      '外感表证：发热恶寒、无汗或多汗',
      '痛证与气滞：经闭、滞产、脘腹疼痛（孕妇禁针或慎重按）'
    ],
    needlingEn: 'Perpendicular insertion 0.5–1.0 cun, or firm acupressure toward the 2nd metacarpal bone. Contraindicated during pregnancy.',
    coords2D: { view: 'anterior', x: 18, y: 61 },
    coords3D: [-0.78, 0.08, 0.14],
    videoUrl: 'https://www.bilibili.com/video/BV1AH4y1E7Px/'
  },
  {
    code: 'ST36',
    name: { zh: '足三里', pinyin: 'Zú Sān Lǐ', en: 'Foot Three Miles' },
    etymologyEn: '"San Li" means Three Cun (three finger-breadths below the knee) and also implies that stimulating this point gives an exhausted traveler the strength to walk another three miles.',
    etymologyZh: '位于膝下三寸（“里”通“寸”），又因针灸此穴能健步强身、虽疲乏仍可再行三里路，故名“足三里”。',
    meridianId: 'ST',
    meridianName: { zh: '足阳明胃经', pinyin: 'Zú Yáng Míng', en: 'Stomach Meridian' },
    element: 'earth',
    categoryBadge: { zh: '合土穴 · 四总穴（肚腹三里留）', pinyin: 'Hé Xué', en: 'He-Sea (Earth) Point & Supreme Longevity Point' },
    locationEn: 'On the anterior aspect of the lower leg, 3 cun below ST35 (Dubi / lateral knee eye), one finger-breadth (middle finger) lateral to the anterior crest of the tibia.',
    locationZh: '在小腿前外侧，当犊鼻（外膝眼）下3寸，距胫骨前缘一横指（中指）。',
    cunGuideEn: 'Place four fingers together (3 cun) directly below the lateral indentation of the kneecap (Dubi), then move 1 finger-breadth lateral to the shinbone crest into the tibialis anterior muscle belly.',
    cunGuideZh: '屈膝90度，外膝眼（犊鼻）直下四横指（3寸），胫骨前嵴外一横指肌肉丰厚处，按之有酸胀感放射至足背。',
    actions: [
      { zh: '燥化脾湿，生发胃气', pinyin: 'Jiàn Pí Hé Wèi', en: 'Fortifies Spleen & Harmonizes Stomach' },
      { zh: '扶正培元，补益气血', pinyin: 'Fú Zhèng Péi Yuán', en: 'Tonifies Qi, Nourishes Blood & Boosts Immunity' },
      { zh: '通经活络', pinyin: 'Tōng Jīng Huó Luò', en: 'Activates the Channel & Relieves Lower Limb Weakness' }
    ],
    indicationsEn: [
      'All digestive disorders: epigastric pain, bloating, nausea, diarrhea, constipation ("Abdominal disorders are retained at Sanli — 肚腹三里留")',
      'Chronic fatigue, weak immunity, post-illness deficiency, dizziness',
      'Moxibustion on ST36 is the classic TCM longevity practice ("若要安，三里常不干")'
    ],
    indicationsZh: [
      '一切脾胃消化系统疾患：胃痛、呕吐、腹胀、泄泻、便秘（“肚腹三里留”）',
      '气血亏虚诸证：倦怠乏力、头晕心悸、免疫力低下',
      '养生保健第一大穴（“常灸足三里，胜吃老母鸡”）'
    ],
    needlingEn: 'Perpendicular insertion 1.0–1.5 cun, or warming moxibustion for 10–15 minutes.',
    coords2D: { view: 'anterior', x: 43, y: 78 },
    coords3D: [-0.20, -0.45, 0.18]
  },
  {
    code: 'LR3',
    name: { zh: '太冲', pinyin: 'Tài Chōng', en: 'Great Surge' },
    etymologyEn: '"Tai" means Great/Supreme; "Chong" means Thoroughfare or Surge—here the Qi and Blood of the Liver Meridian surge abundantly on the dorsum of the foot.',
    etymologyZh: '“太”为盛大，“冲”为要冲、涌动。此处为肝经原气汇聚冲涌之大道，故名“太冲”。',
    meridianId: 'LR',
    meridianName: { zh: '足厥阴肝经', pinyin: 'Zú Jué Yīn', en: 'Liver Meridian' },
    element: 'wood',
    categoryBadge: { zh: '输土穴 · 原穴（四关穴之一）', pinyin: 'Yuán Xué', en: 'Shu-Stream & Yuan-Source Point of Liver' },
    locationEn: 'On the dorsum of the foot, in the depression distal to the junction of the 1st and 2nd metatarsal bones.',
    locationZh: '在足背侧，当第1、2跖骨结合部之前凹陷处。',
    cunGuideEn: 'Slide your finger upward along the groove between the big toe and second toe until it stops at the V-shaped bone junction; LR3 sits in the tender hollow just before the bones meet.',
    cunGuideZh: '沿足大趾与次趾夹缝向足背上推，至两跖骨相交前的凹陷中，按压极易产生明显酸胀感。',
    actions: [
      { zh: '疏肝理气，解郁畅怀', pinyin: 'Shū Gān Lǐ Qì', en: 'Spreads Liver Qi & Releases Emotional Constraint' },
      { zh: '平肝潜阳，熄风清火', pinyin: 'Píng Gān Xī Fēng', en: 'Subdues Liver Yang & Extinguishes Internal Wind' },
      { zh: '调经止痛', pinyin: 'Tiáo Jīng Zhǐ Tòng', en: 'Regulates Menstruation & Nourishes Liver Blood' }
    ],
    indicationsEn: [
      'Stress, irritability, sighing, rib-side distension, PMS, dysmenorrhea',
      'Vertex/temporal headache, dizziness, hypertension, red swollen eyes, insomnia',
      'Paired with LI4 (Hegu) as the famous "Four Gates" (开四关) to powerfully course Qi and Blood throughout the body'
    ],
    indicationsZh: [
      '肝气郁结之情绪急躁、胸胁胀满、叹气、痛经、乳房胀痛',
      '肝阳上亢之眩晕、巅峰或偏头痛、目赤肿痛、失眠多梦',
      '配伍合谷穴称为“开四关”，一气一血、一升一降，大开周身气机'
    ],
    needlingEn: 'Perpendicular insertion 0.5–0.8 cun; press and knead from LR3 toward LR2 (Xingjian) to drain Liver Fire.',
    coords2D: { view: 'anterior', x: 46, y: 92 },
    coords3D: [-0.15, -0.88, 0.20]
  },
  {
    code: 'PC6',
    name: { zh: '内关', pinyin: 'Nèi Guān', en: 'Inner Pass' },
    etymologyEn: 'Situated on the inner (Yin) aspect of the forearm, acting as the strategic "Pass" governing the internal chest, Heart, Pericardium, and Middle Jiao.',
    etymologyZh: '位于前臂内侧要冲，内通心胸与三焦气机，与外侧三焦经之“外关”遥相呼应，故名“内关”。',
    meridianId: 'PC',
    meridianName: { zh: '手厥阴心包经', pinyin: 'Shǒu Jué Yīn', en: 'Pericardium Meridian' },
    element: 'fire',
    categoryBadge: { zh: '络穴 · 八脉交会穴（通阴维脉）', pinyin: 'Luò Xué', en: 'Luo-Connecting & Command Point of Chest/Heart' },
    locationEn: 'On the anterior forearm, 2 cun proximal to the transverse wrist crease, between the tendons of palmaris longus and flexor carpi radialis.',
    locationZh: '在前臂掌侧，当曲泽与大陵的连线上，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间。',
    cunGuideEn: 'Place three fingers (index, middle, ring = 2 cun) from the wrist crease up the inner forearm; PC6 lies directly between the two prominent central tendons when you clench your fist.',
    cunGuideZh: '仰掌微屈腕，从腕横纹向上量三横指（2寸），在手腕正中两条明显肌腱之间取穴。',
    actions: [
      { zh: '宁心安神', pinyin: 'Níng Xīn Ān Shén', en: 'Calms the Heart & Settles the Shen (Spirit)' },
      { zh: '和胃降逆，止呕宽胸', pinyin: 'Hé Wèi Jiàng Nì', en: 'Harmonizes the Stomach, Stops Nausea & Unbinds the Chest' },
      { zh: '理气止痛', pinyin: 'Lǐ Qì Zhǐ Tòng', en: 'Regulates Qi & Relieves Cardiac/Thoracic Pain' }
    ],
    indicationsEn: [
      'Nausea, motion sickness, morning sickness, acid reflux, hiccups',
      'Palpitations, chest tightness, anxiety, panic, insomnia ("Chest and胁 rib disorders are commanded by Neiguan — 胸胁内关谋")',
      'Cardiac pain and arrhythmia support'
    ],
    indicationsZh: [
      '胃气上逆之恶心、呕吐、晕车晕船、妊娠恶阻、呃逆',
      '心胸诸疾：心悸、胸闷、心痛、失眠焦虑（“胸胁内关谋”）'
    ],
    needlingEn: 'Perpendicular insertion 0.5–1.0 cun. Caution: Median nerve lies directly underneath.',
    coords2D: { view: 'anterior', x: 24, y: 52 },
    coords3D: [-0.65, 0.30, 0.12]
  },
  {
    code: 'SP6',
    name: { zh: '三阴交', pinyin: 'Sān Yīn Jiāo', en: 'Three Yin Intersection' },
    etymologyEn: 'The anatomical crossroads where the Three Yin Meridians of the Foot—Spleen (Taiyin), Liver (Jueyin), and Kidney (Shaoyin)—intersect and harmonize.',
    etymologyZh: '足太阴脾经、足厥阴肝经、足少阴肾经三条足阴经在此交会，一穴统调肝脾肾三脏，故名“三阴交”。',
    meridianId: 'SP',
    meridianName: { zh: '足太阴脾经', pinyin: 'Zú Tài Yīn', en: 'Spleen Meridian' },
    element: 'earth',
    categoryBadge: { zh: '足三阴交会穴 · 妇科圣穴', pinyin: 'Jiāo Huì Xué', en: 'Meeting Point of Spleen, Liver & Kidney' },
    locationEn: 'On the tibial aspect of the lower leg, 3 cun directly above the tip of the medial malleolus, just posterior to the medial border of the tibia.',
    locationZh: '在小腿内侧，当足内踝尖上3寸，胫骨内侧缘后方。',
    cunGuideEn: 'Place four fingers together (3 cun) directly above the highest prominence of the inner ankle bone; SP6 sits in the tender depression right behind the shinbone edge.',
    cunGuideZh: '由内踝尖最高点直上四横指（3寸），紧贴胫骨后缘凹陷处取穴。',
    actions: [
      { zh: '健脾化湿', pinyin: 'Jiàn Pí Huà Shī', en: 'Strengthens the Spleen & Resolves Dampness' },
      { zh: '调补肝肾，养血调经', pinyin: 'Tiáo Bǔ Gān Shèn', en: 'Nourishes Liver & Kidney Yin and Regulates Blood/Menses' },
      { zh: '安神定志', pinyin: 'Ān Shén Dìng Zhì', en: 'Harmonizes Lower Jiao & Calms Insomnia' }
    ],
    indicationsEn: [
      'Gynecological & reproductive disorders: irregular menses, dysmenorrhea, infertility, menopausal hot flashes',
      'Digestive weakness: bloating, loose stools, edema',
      'Insomnia, palpitations, night sweats from Yin/Blood deficiency'
    ],
    indicationsZh: [
      '妇科要穴：月经不调、痛经、崩漏、带下、不孕、更年期综合征',
      '脾胃虚弱之腹胀肠鸣、泄泻水肿',
      '肝肾阴虚之失眠、遗精、腰膝酸软（孕妇禁针）'
    ],
    needlingEn: 'Perpendicular insertion 1.0–1.5 cun. Contraindicated during pregnancy.',
    coords2D: { view: 'anterior', x: 47, y: 85 },
    coords3D: [-0.14, -0.68, 0.14]
  },
  {
    code: 'GV20',
    name: { zh: '百会', pinyin: 'Bǎi Huì', en: 'Hundred Convergences' },
    etymologyEn: 'Situated at the very crown of the head where all the Yang channels and the Liver meridian converge ("Hundred Vessels Meet").',
    etymologyZh: '居颠顶之中央，手足三阳经、督脉及足厥阴肝经百脉皆交会于此，如百川归宗，故名“百会”。',
    meridianId: 'GV',
    meridianName: { zh: '督脉', pinyin: 'Dū Mài', en: 'Governing Vessel (Du Mai)' },
    element: 'fire',
    categoryBadge: { zh: '三阳五会 · 升阳举陷大穴', pinyin: 'Dū Mài Yào Xué', en: 'Crown Convergence of All Yang Channels' },
    locationEn: 'On the vertex of the head, 5 cun posterior to the anterior hairline, or at the midpoint of the line connecting the apices of both ears.',
    locationZh: '在头部，当前发际正中直上5寸，或两耳尖连线的中点处。',
    cunGuideEn: 'Fold both ears forward Slightly to find the highest tip of each ear; trace a line straight up from both ear tips to meet the midline of the skull.',
    cunGuideZh: '简便取穴：两耳尖直上连线与头部正中线之交点，按之有微小骨缝凹陷感。',
    actions: [
      { zh: '升阳举陷，益气固脱', pinyin: 'Shēng Yáng Jǔ Xiàn', en: 'Raises Clear Yang & Lifts Sinking Qi' },
      { zh: '醒脑开窍，安神定志', pinyin: 'Xǐng Nǎo Kāi Qiào', en: 'Awakens the Brain, Clears the Mind & Calms Spirit' },
      { zh: '平肝熄风', pinyin: 'Píng Gān Xī Fēng', en: 'Pacifies Liver Wind & Relieves Dizziness' }
    ],
    indicationsEn: [
      'Mental fog, poor memory, dizziness, vertex headache, tinnitus',
      'Sinking Spleen Qi: chronic diarrhea, organ prolapse, hemorrhoids (paired with moxibustion)',
      'Insomnia, emotional low mood, post-stroke recovery'
    ],
    indicationsZh: [
      '神志与头面病：头顶痛、眩晕、耳鸣、健忘、神疲乏力、失眠',
      '中气下陷证：久泻脱肛、胃下垂、子宫脱垂（宜温和灸）'
    ],
    needlingEn: 'Subcutaneous transverse insertion 0.5–0.8 cun, or gentle finger tapping/moxibustion.',
    coords2D: { view: 'posterior', x: 50, y: 6 },
    coords3D: [0, 1.80, 0.02]
  },
  {
    code: 'CV4',
    name: { zh: '关元', pinyin: 'Guān Yuán', en: 'Gate of Original Qi' },
    etymologyEn: 'The strategic "Gate" (Guan) where the body seals and stores Original Qi (Yuan Qi) in the Lower Dan Tian.',
    etymologyZh: '居下丹田，乃男子藏精、女子蓄血之处，为封藏人身元阴元阳之关隘，故名“关元”。',
    meridianId: 'CV',
    meridianName: { zh: '任脉', pinyin: 'Rèn Mài', en: 'Conception Vessel (Ren Mai)' },
    element: 'water',
    categoryBadge: { zh: '小肠募穴 · 足三阴任脉交会穴', pinyin: 'Mù Xué', en: 'Front-Mu of Small Intestine & Lower Dan Tian Root' },
    locationEn: 'On the lower abdomen, on the anterior midline, 3 cun inferior to the center of the umbilicus (umbilicus to pubic symphysis = 5 cun).',
    locationZh: '在下腹部，前正中线上，当脐中（神阙）下3寸。',
    cunGuideEn: 'Place four fingers together (index to little finger = 3 cun) directly below the belly button along the midline.',
    cunGuideZh: '将除拇指外的四指并拢，置于肚脐正下方，小指下缘与腹正中线交点处即是。',
    actions: [
      { zh: '培元固本，补益下焦', pinyin: 'Péi Yuán Gù Běn', en: 'Tonifies Original Qi & Fortifies Kidney Yang/Essence' },
      { zh: '温通下焦，回阳救逆', pinyin: 'Wēn Tōng Xià Jiāo', en: 'Warms the Lower Jiao & Rescues Yang' }
    ],
    indicationsEn: [
      'Deep constitutional exhaustion, cold limbs, lower back weakness, frequent night urination',
      'Cold-type menstrual cramps (dysmenorrhea), fertility support',
      'Chronic diarrhea from Spleen/Kidney Yang deficiency'
    ],
    indicationsZh: [
      '元气亏损、畏寒肢冷、腰膝酸软、夜尿频多',
      '宫寒痛经、闭经、不孕、遗精阳痿',
      '脾肾阳虚之久泻不止'
    ],
    needlingEn: 'Perpendicular insertion 1.0–1.5 cun after emptying bladder; ideal for warming moxibustion.',
    coords2D: { view: 'anterior', x: 50, y: 47 },
    coords3D: [0, 0.52, 0.25]
  },
  {
    code: 'KI1',
    name: { zh: '涌泉', pinyin: 'Yǒng Quán', en: 'Gushing Spring' },
    etymologyEn: 'The lowest point on the human body; Kidney Qi bubbles up from the earth through the sole of the foot like a mountain spring.',
    etymologyZh: '为肾经井穴，居人身最下部，肾气由足底喷涌而出，如泉水涌动上行，故名“涌泉”。',
    meridianId: 'KI',
    meridianName: { zh: '足少阴肾经', pinyin: 'Zú Shào Yīn', en: 'Kidney Meridian' },
    element: 'water',
    categoryBadge: { zh: '井木穴 · 引火归元要穴', pinyin: 'Jǐng Xué', en: 'Jing-Well Point & Fire-Descending Anchor' },
    locationEn: 'On the sole of the foot, in the depression formed when the foot is in plantar flexion, approximately at the junction of the anterior one-third and posterior two-thirds of the sole (excluding toes).',
    locationZh: '在足底部，蜷足时足前部凹陷处，约当足底第2、3趾趾缝纹头端与足跟连线的前1/3与后2/3交点上。',
    cunGuideEn: 'Curl your toes downward; KI1 is the deep hollow that forms right in the upper-center of the sole behind the ball of the foot.',
    cunGuideZh: '用力蜷曲脚趾，足底前1/3正中出现的最深人字形凹陷处即是。',
    actions: [
      { zh: '滋阴降火，引火归元', pinyin: 'Yǐn Huǒ Guī Yuán', en: 'Nourishes Kidney Yin & Guides Unruly Fire Back to the Source' },
      { zh: '醒神开窍', pinyin: 'Xǐng Shén Kāi Qiào', en: 'Revives Consciousness & Calms the Spirit' }
    ],
    indicationsEn: [
      '"Upper Heat, Lower Cold" (上热下寒): insomnia, oral ulcers, dizziness, or high blood pressure combined with icy feet',
      'Evening warm foot soak followed by rubbing KI1 100 times is a classic sleep remedy'
    ],
    indicationsZh: [
      '虚火上炎之失眠、头晕耳鸣、口腔溃疡、咽喉肿痛（引火下行）',
      '睡前温水泡脚后搓擦涌泉穴百次，能交通心肾、助眠安神'
    ],
    needlingEn: 'Firm thumb acupressure, brisk palm rubbing ("擦涌泉"), or moxibustion.',
    coords2D: { view: 'posterior', x: 49, y: 97 },
    coords3D: [-0.14, -0.98, 0.08]
  },
  {
    code: 'GB20',
    name: { zh: '风池', pinyin: 'Fēng Chí', en: 'Wind Pool' },
    etymologyEn: 'Located in the deep depression at the base of the skull that resembles a "pool" where external pathogenic Wind collects and can be dispersed.',
    etymologyZh: '位于项后枕骨下凹陷如池处，为外感风邪易聚及搜风散邪之要穴，故名“风池”。',
    meridianId: 'GB',
    meridianName: { zh: '足少阳胆经', pinyin: 'Zú Shào Yáng', en: 'Gallbladder Meridian' },
    element: 'wood',
    categoryBadge: { zh: '足少阳、阳维之会 · 治风要穴', pinyin: 'Zhì Fēng Yào Xué', en: 'Master Point for Internal & External Wind' },
    locationEn: 'In the posterior neck region, inferior to the occipital bone, in the depression between the upper origins of the sternocleidomastoid and trapezius muscles.',
    locationZh: '在项部，当枕骨之下，与风府相平，胸锁乳突肌与斜方肌上端之间的凹陷处。',
    cunGuideEn: 'Slide your thumbs up the back of the neck on either side of the thick trapezius muscles until they drop into the two deep hollows right beneath the base of the skull.',
    cunGuideZh: '双手抱头，拇指沿耳后乳突向后下方滑动，推至枕骨下两条大筋外侧的深窝中，按压酸胀感直通眼眶。',
    actions: [
      { zh: '祛风解表，清头明目', pinyin: 'Qū Fēng Míng Mù', en: 'Expels Exterior Wind, Clears the Head & Brightens the Eyes' },
      { zh: '平肝熄风，通络止痛', pinyin: 'Píng Gān Xī Fēng', en: 'Pacifies Liver Wind & Relieves Neck/Head Tension' }
    ],
    indicationsEn: [
      'Common cold, chills, fever, nasal congestion, stiff neck',
      'Tension headache, migraine, vertigo, eye strain from screen work, tinnitus'
    ],
    indicationsZh: [
      '外感风寒/风热感冒、鼻塞流涕、项强落枕',
      '偏正头痛、眩晕、视疲劳、耳鸣耳聋、高血压'
    ],
    needlingEn: 'Oblique insertion 0.8–1.2 cun directed toward the tip of the nose, or deep thumb-kneading.',
    coords2D: { view: 'posterior', x: 44, y: 15 },
    coords3D: [-0.14, 1.48, -0.12]
  },
  {
    code: 'BL23',
    name: { zh: '肾俞', pinyin: 'Shèn Shù', en: 'Kidney Shu' },
    etymologyEn: 'The Back-Shu (背俞穴) transport point where the Qi of the Kidney organ infuses directly onto the lower back.',
    etymologyZh: '肾脏之气输注于背腰部的特定背俞穴，内应于肾，故名“肾俞”。',
    meridianId: 'BL',
    meridianName: { zh: '足太阳膀胱经', pinyin: 'Zú Tài Yáng', en: 'Bladder Meridian' },
    element: 'water',
    categoryBadge: { zh: '肾之背俞穴', pinyin: 'Bèi Shù Xué', en: 'Back-Shu Point of the Kidney' },
    locationEn: 'In the lumbar region, at the same level as the inferior border of the spinous process of the 2nd lumbar vertebra (L2), 1.5 cun lateral to the posterior midline.',
    locationZh: '在腰部，当第2腰椎棘突下（命门穴），旁开1.5寸。',
    cunGuideEn: 'Find the level of the navel (umbilicus) and trace horizontally around to the spine (L2 / Mingmen GV4); BL23 lies two finger-breadths lateral to the spine on both sides.',
    cunGuideZh: '与肚脐水平相对的脊椎棘突下为命门穴（第2腰椎），其左右旁开二横指（1.5寸）处即是。',
    actions: [
      { zh: '益肾助阳，纳气利水', pinyin: 'Yì Shèn Zhù Yáng', en: 'Tonifies Kidney Qi/Yang, Nourishes Essence & Strengthens the Lumbar' },
      { zh: '强腰壮骨，聪耳明目', pinyin: 'Qiáng Yāo Zhuàng Gǔ', en: 'Fortifies Bones, Marrow & Hearing' }
    ],
    indicationsEn: [
      'Chronic lower back ache, weak knees, bone weakness',
      'Tinnitus, hearing loss, edema, frequent urination, reproductive deficiency'
    ],
    indicationsZh: [
      '慢性腰痛、腰膝酸软、骨质疏松',
      '耳鸣耳聋、水肿、夜尿频多、遗精早泄、月经不调'
    ],
    needlingEn: 'Perpendicular insertion 0.5–1.0 cun, or rub palms warm and massage vigorously over the lower back ("擦肾俞").',
    coords2D: { view: 'posterior', x: 45, y: 44 },
    coords3D: [-0.14, 0.65, -0.20]
  }
];
