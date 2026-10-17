import { MeridianChannel, Acupoint } from '@/types/tcm';

export const MERIDIAN_CHANNELS: MeridianChannel[] = [
  {
    id: 'LU',
    name: { zh: '手太阴肺经', pinyin: 'Shǒu Tài Yīn Fèi Jīng', en: 'Lung Meridian (LU)' },
    fullTitle: { zh: '手太阴肺经 (11穴)', pinyin: 'Hand Taiyin Lung', en: 'Hand Taiyin Lung Channel (11 Points)' },
    polarity: 'Yin',
    element: 'metal',
    peakTime: '03:00 – 05:00 (寅时)',
    flowDirectionEn: 'Middle Jiao → Lung → Subclavicular Fossa (LU1) → Anterolateral Biceps & Forearm → Radial Thumb Tip (LU11)',
    flowDirectionZh: '从胸走手：起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横出锁骨下（中府），沿上肢内侧前缘经尺泽、列缺、太渊，止于拇指桡侧端（少商）。',
    pathwaySummaryEn: 'Originates in the Middle Jiao (Stomach), descends to connect with the Large Intestine, ascends through the diaphragm to the Lung and throat, emerges superficially at LU1 (Zhongfu) in the 1st intercostal space, and descends along the radial border of the biceps and forearm to the thumb nail corner.',
    pathwaySummaryZh: '起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横出腋下，沿上肢内侧前缘下行，经肘窝尺泽、腕后列缺、寸口太渊，止于拇指少商穴。',
    svgInternalPath: 'M 50,39 L 50,46 L 50,38 L 44,29 L 50,19 L 38,24',
    svgPathAnterior: 'M 38,24 C 36,22 33,24 31,28 C 29,33 27,36 25,39 C 23,44 20,49 18,53 C 16,56 15,58 14,60',
    channelNodes: [
      { code: 'LU1', zh: '中府', x: 38, y: 24, view: 'anterior' },
      { code: 'LU2', zh: '云门', x: 36, y: 22.5, view: 'anterior' },
      { code: 'LU5', zh: '尺泽', x: 25, y: 39, view: 'anterior' },
      { code: 'LU7', zh: '列缺', x: 19, y: 50.5, view: 'anterior' },
      { code: 'LU9', zh: '太渊', x: 18, y: 53, view: 'anterior' },
      { code: 'LU11', zh: '少商', x: 14, y: 60, view: 'anterior' }
    ],
    points3D: [
      [-0.24, 1.18, 0.21],
      [-0.28, 1.24, 0.19],
      [-0.38, 1.16, 0.14],
      [-0.44, 0.94, 0.11],
      [-0.50, 0.72, 0.11],
      [-0.57, 0.50, 0.13],
      [-0.63, 0.32, 0.15],
      [-0.71, 0.14, 0.19]
    ]
  },
  {
    id: 'LI',
    name: { zh: '手阳明大肠经', pinyin: 'Shǒu Yáng Míng Dà Cháng Jīng', en: 'Large Intestine Meridian (LI)' },
    fullTitle: { zh: '手阳明大肠经 (20穴)', pinyin: 'Hand Yangming Large Intestine', en: 'Hand Yangming Large Intestine Channel (20 Points)' },
    polarity: 'Yang',
    element: 'metal',
    peakTime: '05:00 – 07:00 (卯时)',
    flowDirectionEn: 'Index Finger Tip (LI1) → 1st/2nd Metacarpal (LI4) → Lateral Elbow (LI11) → Acromion (LI15) → Neck → Contralateral Alar Base (LI20)',
    flowDirectionZh: '从手走头：起于食指桡侧端（商阳），经合谷、阳溪，循前臂外侧前缘上曲池、肩髃，过颈贯颊交人中，止于对侧鼻翼旁（迎香）。',
    pathwaySummaryEn: 'Begins at the radial tip of the index finger (LI1), passes between the 1st and 2nd metacarpals at LI4 (Hegu), ascends the radial-dorsal forearm to the lateral elbow crease (LI11 Quchi) and shoulder tip (LI15 Jianyu), crosses the supraclavicular fossa (where its internal branch descends to the Lung and Large Intestine), ascends the neck and cheek, crosses the philtrum, and ends beside the opposite nostril (LI20 Yingxiang).',
    pathwaySummaryZh: '起于食指桡侧端商阳，经合谷穴，沿前臂外侧上行至曲池、肩髃，入缺盆络肺下属大肠；支脉上颈贯颊，交人中，止于对侧鼻旁迎香穴。',
    svgInternalPath: 'M 39,21 L 43,29 L 47,46',
    svgPathAnterior: 'M 15,62 C 17,59 18,57 18,55 C 21,49 24,44 26,38 C 29,32 31,27 33,22 C 37,21 41,19 45,16 C 47,14 50,13.5 52,12.5',
    channelNodes: [
      { code: 'LI1', zh: '商阳', x: 15, y: 62, view: 'anterior' },
      { code: 'LI4', zh: '合谷', x: 18, y: 61, view: 'anterior' },
      { code: 'LI10', zh: '手三里', x: 24.5, y: 41.5, view: 'anterior' },
      { code: 'LI11', zh: '曲池', x: 26, y: 38, view: 'anterior' },
      { code: 'LI15', zh: '肩髃', x: 33, y: 22, view: 'anterior' },
      { code: 'LI20', zh: '迎香', x: 52, y: 12.5, view: 'anterior' }
    ],
    points3D: [
      [-0.75, 0.06, 0.16],
      [-0.78, 0.08, 0.14],
      [-0.64, 0.34, 0.08],
      [-0.58, 0.56, 0.05],
      [-0.52, 0.74, 0.04],
      [-0.45, 1.00, 0.04],
      [-0.38, 1.24, 0.05],
      [-0.18, 1.34, 0.12],
      [-0.10, 1.48, 0.16],
      [0.05, 1.62, 0.25]
    ]
  },
  {
    id: 'ST',
    name: { zh: '足阳明胃经', pinyin: 'Zú Yáng Míng Wèi Jīng', en: 'Stomach Meridian (ST)' },
    fullTitle: { zh: '足阳明胃经 (45穴)', pinyin: 'Foot Yangming Stomach', en: 'Foot Yangming Stomach Channel (45 Points)' },
    polarity: 'Yang',
    element: 'earth',
    peakTime: '07:00 – 09:00 (辰时)',
    flowDirectionEn: 'Infraorbital Ridge (ST1) → Jaw & Forehead (ST8) → Throat → Nipple Line (4 cun) → Abdomen (2 cun, ST25) → Anterior Thigh & Tibia (ST36) → 2nd Toe (ST45)',
    flowDirectionZh: '从头走足：起于目下承泣，环唇交承浆，循颊车上头维，下人迎循胸腹第二侧线（天枢），经大腿前侧下膝膑，循胫骨外侧（足三里、丰隆）至足次趾厉兑。',
    pathwaySummaryEn: 'Abundant in both Qi and Blood (多气多血). Starts directly below the pupil at ST1 (Chengqi), loops the mouth and jaw angle (ST6 Jiache) with a branch to the temple corner (ST8 Touwei), descends the throat, travels 4 cun lateral to the chest midline and 2 cun lateral to the umbilicus (ST25 Tianshu), descends the rectus femoris and lateral patella (ST35 Dubi) to ST36 (Zusanli) and ST40 (Fenglong) along the anterior tibialis, ending at the 2nd toe.',
    pathwaySummaryZh: '多气多血之阳明大经。起于鼻旁下承泣，入上齿环唇，循喉咙入缺盆，下膈属胃络脾；直行者循乳中线下挟脐两寸天枢穴，下膝膑外犊鼻、足三里、丰隆，止于次趾厉兑穴。',
    svgInternalPath: 'M 43,21 L 47,36 L 44,39',
    svgPathAnterior: 'M 47,10.5 L 47,13.5 L 44.5,14.5 L 44,8.5 M 44.5,14.5 C 45,17 44,20 43,22 C 41.5,25 41.5,30 41.5,33 C 43,36 45,39 45,44 C 45,48 45,51 44.5,54 C 43.5,61 43,68 43,75 C 43,78 43,85 43,92 L 43,96.5',
    channelNodes: [
      { code: 'ST1', zh: '承泣', x: 47, y: 10.5, view: 'anterior' },
      { code: 'ST8', zh: '头维', x: 44, y: 8.5, view: 'anterior' },
      { code: 'ST21', zh: '梁门', x: 45, y: 38.5, view: 'anterior' },
      { code: 'ST25', zh: '天枢', x: 45, y: 44, view: 'anterior' },
      { code: 'ST36', zh: '足三里', x: 43, y: 78, view: 'anterior' },
      { code: 'ST40', zh: '丰隆', x: 42, y: 84, view: 'anterior' },
      { code: 'ST44', zh: '内庭', x: 43, y: 95.5, view: 'anterior' }
    ],
    points3D: [
      [-0.07, 1.66, 0.25],
      [-0.11, 1.56, 0.22],
      [-0.09, 1.44, 0.16],
      [-0.18, 1.28, 0.18],
      [-0.22, 1.06, 0.24],
      [-0.15, 0.78, 0.24],
      [-0.14, 0.58, 0.25],
      [-0.16, 0.34, 0.22],
      [-0.19, -0.02, 0.20],
      [-0.19, -0.32, 0.19],
      [-0.20, -0.45, 0.18],
      [-0.21, -0.68, 0.16],
      [-0.19, -0.92, 0.18],
      [-0.19, -0.98, 0.25]
    ]
  },
  {
    id: 'SP',
    name: { zh: '足太阴脾经', pinyin: 'Zú Tài Yīn Pí Jīng', en: 'Spleen Meridian (SP)' },
    fullTitle: { zh: '足太阴脾经 (21穴)', pinyin: 'Foot Taiyin Spleen', en: 'Foot Taiyin Spleen Channel (21 Points)' },
    polarity: 'Yin',
    element: 'earth',
    peakTime: '09:00 – 11:00 (巳时)',
    flowDirectionEn: 'Medial Hallux (SP1) → Medial Malleolus → Posterior Tibial Border (SP6, SP9) → Medial Thigh → Abdomen (4 cun) & Ribcage (SP21)',
    flowDirectionZh: '从足走胸腹：起于足大趾内侧端（隐白），循内踝前上小腿内侧胫骨后缘（三阴交、阴陵泉），经膝股内侧前缘入腹属脾络胃，上膈连舌本，散舌下。',
    pathwaySummaryEn: 'Starts on the medial corner of the great toe (SP1 Yinbai), runs along the medial foot border ("red and white flesh" junction), ascends anterior to the medial malleolus and along the posterior border of the tibia through SP6 (Sanyinjiao) and SP9 (Yinlingquan), ascends the anteromedial thigh to the abdomen (4 cun lateral to midline), connects internally with the Spleen, Stomach, Heart, and root of the tongue, and ends on the mid-axillary chest wall at SP21 (Dabao—Great Luo of the Spleen).',
    pathwaySummaryZh: '起于大趾内侧隐白穴，循核骨后上内踝前廉，交出厥阴之前，循胫骨后缘经三阴交、阴陵泉，入腹属脾络胃，上膈夹咽连舌本，支脉注心中，大络出腋下大包穴。',
    svgInternalPath: 'M 42,44 L 46,39 L 49,31 L 50,16',
    svgPathAnterior: 'M 48.5,96.5 L 47.5,92.5 C 47,89 47,85 47,78 C 46.5,73 46,64 45.5,55 C 44,49 42,44 42,38 C 40.5,33 38.5,27 36.5,24 C 36,27 36.5,31 37.5,34',
    channelNodes: [
      { code: 'SP1', zh: '隐白', x: 48.5, y: 96.5, view: 'anterior' },
      { code: 'SP3', zh: '太白', x: 48, y: 94.5, view: 'anterior' },
      { code: 'SP6', zh: '三阴交', x: 47, y: 85, view: 'anterior' },
      { code: 'SP9', zh: '阴陵泉', x: 46.5, y: 76.5, view: 'anterior' },
      { code: 'SP10', zh: '血海', x: 46, y: 69, view: 'anterior' },
      { code: 'SP15', zh: '大横', x: 42, y: 44, view: 'anterior' },
      { code: 'SP21', zh: '大包', x: 37.5, y: 34, view: 'anterior' }
    ],
    points3D: [
      [-0.13, -0.98, 0.25],
      [-0.14, -0.92, 0.16],
      [-0.14, -0.68, 0.14],
      [-0.15, -0.40, 0.14],
      [-0.15, -0.18, 0.17],
      [-0.16, 0.18, 0.19],
      [-0.22, 0.58, 0.23],
      [-0.28, 1.08, 0.21],
      [-0.31, 0.92, 0.10]
    ]
  },
  {
    id: 'HT',
    name: { zh: '手少阴心经', pinyin: 'Shǒu Shào Yīn Xīn Jīng', en: 'Heart Meridian (HT)' },
    fullTitle: { zh: '手少阴心经 (9穴)', pinyin: 'Hand Shaoyin Heart', en: 'Hand Shaoyin Heart Channel (9 Points)' },
    polarity: 'Yin',
    element: 'fire',
    peakTime: '11:00 – 13:00 (午时)',
    flowDirectionEn: 'Heart System → Axilla (HT1) → Posteromedial Biceps & Elbow (HT3) → Ulnar Wrist Crease (HT7) → Radial Tip of Little Finger (HT9)',
    flowDirectionZh: '从胸走手：起于心中，下膈络小肠，上肺出腋下（极泉），沿上肢内侧后缘经少海、灵道、通里、神门，止于小指桡侧端（少冲）。',
    pathwaySummaryEn: 'Originates in the Heart, descends through the diaphragm to connect with the Small Intestine, ascends alongside the esophagus to the eye system, and crosses the Lung to emerge in the center of the axilla at HT1 (Jiquan). Travels down the posteromedial aspect of the arm to the medial elbow crease (HT3 Shaohai), ulnar wrist crease (HT7 Shenmen), palm (HT8 Shaofu), and tip of the little finger (HT9 Shaochong).',
    pathwaySummaryZh: '起于心中，出属心系，下膈络小肠；其支者夹咽系目系；直行者复从心系却上肺，下出腋下极泉，循臂内后廉，经少海、神门、少府，抵小指内侧端少冲穴。',
    svgInternalPath: 'M 49,30 L 50,48 M 49,30 L 50,18 L 48,10.5 M 49,30 L 36.5,28.5',
    svgPathAnterior: 'M 36.5,28.5 C 34,32 31.5,36 29.5,40.5 C 27.5,45 25,50 23,54 C 21.5,57 20.5,59.5 19.5,61.5',
    channelNodes: [
      { code: 'HT1', zh: '极泉', x: 36.5, y: 28.5, view: 'anterior' },
      { code: 'HT3', zh: '少海', x: 29.5, y: 40.5, view: 'anterior' },
      { code: 'HT5', zh: '通里', x: 24, y: 51.5, view: 'anterior' },
      { code: 'HT7', zh: '神门', x: 23, y: 54, view: 'anterior' },
      { code: 'HT9', zh: '少冲', x: 19.5, y: 61.5, view: 'anterior' }
    ],
    points3D: [
      [-0.32, 1.08, 0.10],
      [-0.41, 0.88, 0.08],
      [-0.47, 0.68, 0.07],
      [-0.54, 0.46, 0.09],
      [-0.60, 0.28, 0.11],
      [-0.66, 0.14, 0.12],
      [-0.70, 0.04, 0.11]
    ]
  },
  {
    id: 'SI',
    name: { zh: '手太阳小肠经', pinyin: 'Shǒu Tài Yáng Xiǎo Cháng Jīng', en: 'Small Intestine Meridian (SI)' },
    fullTitle: { zh: '手太阳小肠经 (19穴)', pinyin: 'Hand Taiyang Small Intestine', en: 'Hand Taiyang Small Intestine Channel (19 Points)' },
    polarity: 'Yang',
    element: 'fire',
    peakTime: '13:00 – 15:00 (未时)',
    flowDirectionEn: 'Ulnar Little Finger (SI1) → Ulnar Hand (SI3) & Forearm → Olecranon (SI8) → Scapula Zigzag (SI9–SI15) → Neck & Cheek → Tragus of Ear (SI19)',
    flowDirectionZh: '从手走头：起于小指尺侧端（少泽），经后溪循前臂外侧后缘上肘尖（小海），绕肩胛曲折上行，入缺盆络心属小肠，上颈至面颊，止于耳前（听宫）。',
    pathwaySummaryEn: 'Starts at the ulnar corner of the little fingernail (SI1 Shaoze), passes SI3 (Houxi—Master Point of the Du Mai), ascends the ulnar border of the posterior forearm to the medial olecranon groove (SI8 Xiaohai), zigzags across the scapula spine (SI11 Tianzong), sends an internal branch down to the Heart and Small Intestine, ascends the lateral neck and zygoma, and enters the ear at SI19 (Tinggong).',
    pathwaySummaryZh: '起于小指尺侧少泽穴，经腕前八脉交会穴后溪，循上肢外侧后缘过肘部小海，绕行肩胛冈上下（天宗），入缺盆络心下属小肠；支脉上颈至颧部，入耳中听宫穴。',
    svgInternalPath: 'M 42,21 L 49,30 L 50,48',
    svgPathPosterior: 'M 20,61.5 C 21.5,58 23,54 25,49 C 27,44 29,40 31,37 C 33,31 35,26 38,24 L 41,28 L 39,21 L 44,18 L 45.5,12',
    channelNodes: [
      { code: 'SI1', zh: '少泽', x: 20, y: 61.5, view: 'posterior' },
      { code: 'SI3', zh: '后溪', x: 21.5, y: 57.5, view: 'posterior' },
      { code: 'SI8', zh: '小海', x: 30, y: 39, view: 'posterior' },
      { code: 'SI11', zh: '天宗', x: 40, y: 27, view: 'posterior' },
      { code: 'SI19', zh: '听宫', x: 45.5, y: 12, view: 'posterior' }
    ],
    points3D: [
      [-0.71, 0.04, 0.06],
      [-0.68, 0.16, 0.05],
      [-0.61, 0.32, 0.03],
      [-0.53, 0.66, -0.04],
      [-0.44, 0.98, -0.08],
      [-0.35, 1.18, -0.14],
      [-0.24, 1.12, -0.19],
      [-0.18, 1.32, -0.10],
      [-0.12, 1.48, 0.04],
      [-0.13, 1.63, 0.08]
    ]
  },
  {
    id: 'BL',
    name: { zh: '足太阳膀胱经', pinyin: 'Zú Tài Yáng Páng Guāng Jīng', en: 'Bladder Meridian (BL)' },
    fullTitle: { zh: '足太阳膀胱经 (67穴)', pinyin: 'Foot Taiyang Bladder', en: 'Foot Taiyang Bladder Channel (67 Points)' },
    polarity: 'Yang',
    element: 'water',
    peakTime: '15:00 – 17:00 (申时)',
    flowDirectionEn: 'Inner Canthus (BL1) → Forehead & Vertex → Dual Paraspinal Lines (1.5 & 3 cun) → Popliteal Crease (BL40) → Calf (BL57) & Lateral Malleolus (BL60) → 5th Toe (BL67)',
    flowDirectionZh: '从头走足：起于目内眦（睛明），上额交百会，下项分第一、二侧线（1.5寸背俞线与3寸神志线）夹脊抵腰络肾属膀胱，下贯臀合于腘中（委中），循小腿后侧（承山、昆仑）至足小趾至阴穴。',
    pathwaySummaryEn: 'The grand Taiyang channel covering the entire dorsal surface of the body. Rises from the inner corner of the eye (BL1 Jingming) over the crown to the occiput (BL10 Tianzhu), splits into two parallel paraspinal trunks at 1.5 cun (housing all the Zang-Fu Back-Shu points: BL13 Lung, BL15 Heart, BL18 Liver, BL20 Spleen, BL23 Kidney) and 3 cun lateral to the spine, converges at the center of the back of the knee (BL40 Weizhong), descends the gastrocnemius (BL57 Chengshan), passes behind the lateral malleolus (BL60 Kunlun), and terminates at the lateral 5th toe (BL67 Zhiyin).',
    pathwaySummaryZh: '人体最长、穴位最多之巨阳经。起于晴明，上额交巅入脑，下项分两支平行夹脊（内线旁开1.5寸统摄肺俞、心俞、膈俞、肝俞、脾俞、肾俞等全套脏腑背俞穴；外线旁开3寸主五脏神志），汇聚于膝后委中穴，经承山、昆仑至足小趾外侧至阴穴。',
    svgInternalPath: 'M 45,44 L 47,42 L 50,51',
    svgPathPosterior: 'M 47.5,7 L 46.5,14 L 45.5,21 L 45.5,52 L 44.5,64 L 44,75.5 L 44,84 L 43,93 L 42,96.5 M 42.5,21 L 42.5,52 L 44,75.5',
    channelNodes: [
      { code: 'BL10', zh: '天柱', x: 46.5, y: 15.5, view: 'posterior' },
      { code: 'BL13', zh: '肺俞', x: 45.5, y: 25, view: 'posterior' },
      { code: 'BL18', zh: '肝俞', x: 45.5, y: 35, view: 'posterior' },
      { code: 'BL20', zh: '脾俞', x: 45.5, y: 39, view: 'posterior' },
      { code: 'BL23', zh: '肾俞', x: 45, y: 44, view: 'posterior' },
      { code: 'BL40', zh: '委中', x: 44, y: 75.5, view: 'posterior' },
      { code: 'BL57', zh: '承山', x: 44, y: 84, view: 'posterior' },
      { code: 'BL60', zh: '昆仑', x: 43, y: 93, view: 'posterior' }
    ],
    points3D: [
      [-0.04, 1.66, 0.25],
      [-0.06, 1.78, 0.10],
      [-0.07, 1.72, -0.10],
      [-0.09, 1.46, -0.14],
      [-0.14, 1.20, -0.20],
      [-0.14, 0.92, -0.21],
      [-0.14, 0.65, -0.20],
      [-0.15, 0.36, -0.22],
      [-0.18, -0.02, -0.19],
      [-0.19, -0.34, -0.16],
      [-0.19, -0.62, -0.17],
      [-0.20, -0.91, -0.08],
      [-0.22, -0.98, 0.16]
    ]
  },
  {
    id: 'KI',
    name: { zh: '足少阴肾经', pinyin: 'Zú Shào Yīn Shèn Jīng', en: 'Kidney Meridian (KI)' },
    fullTitle: { zh: '足少阴肾经 (27穴)', pinyin: 'Foot Shaoyin Kidney', en: 'Foot Shaoyin Kidney Channel (27 Points)' },
    polarity: 'Yin',
    element: 'water',
    peakTime: '17:00 – 19:00 (酉时)',
    flowDirectionEn: 'Center of Sole (KI1) → Posterior Medial Malleolus Loop (KI3) → Posteromedial Leg (KI7, KI10) → Abdomen (0.5 cun) & Chest (2 cun, KI27)',
    flowDirectionZh: '从足走胸腹：起于足心涌泉穴，绕内踝后（太溪、照海），上小腿内侧后缘（复溜、阴谷），贯脊属肾络膀胱，循腹正中线旁开0.5寸、胸旁开2寸上行至锁骨下俞府穴。',
    pathwaySummaryEn: 'Starts on the plantar sole at KI1 (Yongquan—Gushing Spring), emerges beneath the navicular tuberosity (KI2 Rangu), loops behind the medial malleolus at KI3 (Taixi—Supreme Stream), ascends the medial Achilles and tibia (intersecting SP6), enters the medial popliteal crease (KI10 Yingu), ascends the posteromedial thigh to the coccyx and spine to enter the Kidney and Bladder, and runs superficially 0.5 cun lateral to the abdominal midline and 2 cun lateral to the sternum up to KI27 (Shufu) below the clavicle.',
    pathwaySummaryZh: '起于足底涌泉穴，出然谷循内踝后太溪、大钟、水泉、照海，上行复溜、交信，会三阴交，上膝内侧阴谷穴，贯脊属肾络膀胱；直行者从肾上贯肝膈入肺中，循喉咙挟舌本；体表循腹正中旁0.5寸、胸旁2寸至锁骨下俞府穴。',
    svgInternalPath: 'M 48.5,52 L 47,43 L 45,35 L 45,28 L 50,17',
    svgPathAnterior: 'M 48,96 L 48,92.5 C 48,88 47.5,82 47.5,75.5 C 47.5,67 48,59 48.5,52 L 48.5,38 L 46,35 L 46,23.5',
    svgPathPosterior: 'M 49,97 L 47.5,93 L 47.5,76',
    channelNodes: [
      { code: 'KI1', zh: '涌泉', x: 49, y: 97, view: 'posterior' },
      { code: 'KI3', zh: '太溪', x: 48, y: 92.5, view: 'anterior' },
      { code: 'KI6', zh: '照海', x: 48, y: 94, view: 'anterior' },
      { code: 'KI7', zh: '复溜', x: 47.8, y: 89, view: 'anterior' },
      { code: 'KI10', zh: '阴谷', x: 47.5, y: 75.5, view: 'anterior' },
      { code: 'KI27', zh: '俞府', x: 46, y: 23.5, view: 'anterior' }
    ],
    points3D: [
      [-0.14, -0.98, 0.08],
      [-0.12, -0.92, 0.04],
      [-0.13, -0.80, 0.07],
      [-0.13, -0.58, 0.09],
      [-0.13, -0.35, 0.11],
      [-0.12, 0.05, 0.14],
      [-0.05, 0.42, 0.24],
      [-0.05, 0.72, 0.24],
      [-0.10, 0.96, 0.24],
      [-0.11, 1.22, 0.22]
    ]
  },
  {
    id: 'PC',
    name: { zh: '手厥阴心包经', pinyin: 'Shǒu Jué Yīn Xīn Bāo Jīng', en: 'Pericardium Meridian (PC)' },
    fullTitle: { zh: '手厥阴心包经 (9穴)', pinyin: 'Hand Jueyin Pericardium', en: 'Hand Jueyin Pericardium Channel (9 Points)' },
    polarity: 'Yin',
    element: 'fire',
    peakTime: '19:00 – 21:00 (戌时)',
    flowDirectionEn: 'Pericardium → 4th ICS Lateral to Nipple (PC1) → Midline of Biceps & Cubital Crease (PC3) → Between Flexor Tendons (PC6) → Palm Center (PC8) → Middle Finger Tip (PC9)',
    flowDirectionZh: '从胸走手：起于胸中，出属心包络，下膈历络上中下三焦；支脉循胸出胁下（天池），沿上肢内侧正中线经曲泽、内关、大陵、劳宫，止于中指端（中冲）。',
    pathwaySummaryEn: 'Originates in the chest in the Pericardium (Heart Protector), descends through the diaphragm to string together the Upper, Middle, and Lower Jiao, and emerges at PC1 (Tianchi) 1 cun lateral to the nipple. Ascends over the anterior axilla and runs straight down the anatomical midline of the inner arm between the Lung and Heart channels—passing PC3 (Quze) at the elbow, PC6 (Neiguan) between the two forearm tendons, PC7 (Daling) at the wrist crease, PC8 (Laogong) in the center of the palm, and PC9 (Zhongchong) at the tip of the middle finger.',
    pathwaySummaryZh: '起于胸中，属心包络，下膈历络三焦；支脉出乳外天池穴，上抵腋下，行于手太阴与手少阴之间（上肢内侧正中线），入肘中曲泽，下前臂两筋之间内关、大陵，入掌中劳宫，直抵中指尖中冲穴。',
    svgInternalPath: 'M 49,30 L 49,38 L 49,47 M 49,30 L 38,29.5',
    svgPathAnterior: 'M 38,29.5 C 35,27 33,29 30.5,34 L 27.5,39.5 L 24,52 L 20.5,54.5 L 18.5,58 L 16.5,62.5',
    channelNodes: [
      { code: 'PC1', zh: '天池', x: 38, y: 29.5, view: 'anterior' },
      { code: 'PC3', zh: '曲泽', x: 27.5, y: 39.5, view: 'anterior' },
      { code: 'PC6', zh: '内关', x: 24, y: 52, view: 'anterior' },
      { code: 'PC7', zh: '大陵', x: 20.5, y: 54.5, view: 'anterior' },
      { code: 'PC8', zh: '劳宫', x: 18.5, y: 58, view: 'anterior' },
      { code: 'PC9', zh: '中冲', x: 16.5, y: 62.5, view: 'anterior' }
    ],
    points3D: [
      [-0.27, 1.04, 0.22],
      [-0.36, 1.08, 0.14],
      [-0.43, 0.90, 0.10],
      [-0.49, 0.70, 0.09],
      [-0.57, 0.48, 0.11],
      [-0.65, 0.30, 0.12],
      [-0.69, 0.15, 0.14],
      [-0.72, 0.08, 0.15],
      [-0.75, 0.02, 0.15]
    ]
  },
  {
    id: 'TE',
    name: { zh: '手少阳三焦经', pinyin: 'Shǒu Shào Yáng Sān Jiāo Jīng', en: 'San Jiao / Triple Energizer Meridian (TE)' },
    fullTitle: { zh: '手少阳三焦经 (23穴)', pinyin: 'Hand Shaoyang San Jiao', en: 'Hand Shaoyang Triple Energizer Channel (23 Points)' },
    polarity: 'Yang',
    element: 'fire',
    peakTime: '21:00 – 23:00 (亥时)',
    flowDirectionEn: 'Ring Finger Tip (TE1) → Dorsal Wrist & Midline Forearm (TE5, TE6) → Olecranon (TE10) → Posterior Deltoid (TE14) → Retroauricular Curve (TE17–TE20) → Lateral Eyebrow (TE23)',
    flowDirectionZh: '从手走头：起于无名指尺侧端（关冲），循手背及前臂外侧正中（外关、支沟），过肘尖天井，上肩入缺盆布膻中络心包属三焦，上项绕耳后（翳风），止于眉梢（丝竹空）。',
    pathwaySummaryEn: 'Begins at the ulnar tip of the ring finger (TE1 Guanchong), runs up the dorsum of the hand between the 4th and 5th metacarpals (TE3 Zhongzhu), ascends the dorsal midline of the forearm between radius and ulna through TE5 (Waiguan—Master Point of the Yang Wei Mai) and TE6 (Zhigou), crosses the olecranon (TE10 Tianjing) and posterior shoulder (TE14 Jianliao), curves around the back of the ear from TE17 (Yifeng) to the apex, and ends at the lateral tip of the eyebrow (TE23 Sizhukong).',
    pathwaySummaryZh: '起于无名指关冲穴，经手背中渚、腕背阳池，行于尺桡骨之间外关、支沟，上贯肘尖天井，循臂外上肩，入缺盆布膻中，散络心包，下贯三焦；支脉从膻中上出缺盆，上项系耳后翳风，绕耳上角至眉梢丝竹空穴。',
    svgInternalPath: 'M 41,21 L 49,30 L 49,39 L 49,48',
    svgPathPosterior: 'M 18,62 L 20,55 L 22.5,51 L 28,39 L 33,24 L 40,21 L 44.5,14 L 44.5,10 L 45.5,9.5',
    channelNodes: [
      { code: 'TE1', zh: '关冲', x: 18, y: 62, view: 'posterior' },
      { code: 'TE3', zh: '中渚', x: 19, y: 58.5, view: 'posterior' },
      { code: 'TE5', zh: '外关', x: 22.5, y: 51, view: 'posterior' },
      { code: 'TE6', zh: '支沟', x: 23.5, y: 49, view: 'posterior' },
      { code: 'TE14', zh: '肩髎', x: 33, y: 24, view: 'posterior' },
      { code: 'TE17', zh: '翳风', x: 44.5, y: 14, view: 'posterior' },
      { code: 'TE23', zh: '丝竹空', x: 45.5, y: 9.5, view: 'posterior' }
    ],
    points3D: [
      [-0.73, 0.03, 0.09],
      [-0.68, 0.16, 0.07],
      [-0.63, 0.30, 0.05],
      [-0.56, 0.48, 0.02],
      [-0.50, 0.68, -0.02],
      [-0.43, 0.96, -0.04],
      [-0.36, 1.22, -0.05],
      [-0.18, 1.34, -0.06],
      [-0.13, 1.56, -0.04],
      [-0.13, 1.66, 0.04],
      [-0.10, 1.68, 0.22]
    ]
  },
  {
    id: 'GB',
    name: { zh: '足少阳胆经', pinyin: 'Zú Shào Yáng Dǎn Jīng', en: 'Gallbladder Meridian (GB)' },
    fullTitle: { zh: '足少阳胆经 (44穴)', pinyin: 'Foot Shaoyang Gallbladder', en: 'Foot Shaoyang Gallbladder Channel (44 Points)' },
    polarity: 'Yang',
    element: 'wood',
    peakTime: '23:00 – 01:00 (子时)',
    flowDirectionEn: 'Outer Canthus (GB1) → Temporal Zigzag → Occiput (GB20) → Shoulder Well (GB21) → Lateral Ribcage & Hip (GB30) → Fibular Head (GB34) & Lateral Ankle (GB39) → 4th Toe (GB44)',
    flowDirectionZh: '从头走足：起于目外眦（瞳子髎），三折于头侧颞部，下耳后至枕下风池，过肩井下胸胁侧面，经环跳沿大腿外侧（风市）、小腿腓骨前（阳陵泉、悬钟）至第四趾足窍阴。',
    pathwaySummaryEn: 'The Shaoyang pivot governing the entire lateral body. Starts at the outer canthus (GB1 Tongziliao), traces three zigzags over the temporal scalp (explaining why migraines strike the temples), descends behind the ear to the base of the skull at GB20 (Fengchi), sits atop the trapezius at GB21 (Jianjing), zigzags down the lateral ribcage and waist (GB26 Daimai) to the hip (GB30 Huantiao), runs down the iliotibial (IT) band to GB34 (Yanglingquan—Hui-Meeting Point of Sinews) and GB39 (Xuanzhong—Hui-Meeting Point of Marrow), and ends at the 4th toe (GB44 Zuqiaoyin).',
    pathwaySummaryZh: '少阳为枢，主一身之半表半里及头身两侧。起于瞳子髎，曲折绕行头侧颞部（偏头痛主经），至枕骨下风池穴，下肩井，循胸胁侧面经日月、带脉、环跳，沿大腿外侧风市、膝外下阳陵泉（筋会）、外踝上悬钟（髓会），止于第四趾端足窍阴。',
    svgInternalPath: 'M 40,21 L 43,35 L 45,37',
    svgPathAnterior: 'M 45,10.5 L 43.5,12 L 43.5,8 L 44.5,15 L 38,21.5 C 37,27 38,32 39.5,36 C 38.5,40 39,45 38.5,51 C 39.5,59 40.5,67 41,76.5 C 41,83 41.5,88 41.5,93 L 41.5,96.5',
    svgPathPosterior: 'M 44,9 L 44,15 L 38,21.5 L 40,52 L 41,65 L 41,76.5 L 41.5,93 L 41.5,96',
    channelNodes: [
      { code: 'GB1', zh: '瞳子髎', x: 45, y: 10.5, view: 'anterior' },
      { code: 'GB20', zh: '风池', x: 44, y: 15, view: 'posterior' },
      { code: 'GB21', zh: '肩井', x: 38, y: 21.5, view: 'anterior' },
      { code: 'GB30', zh: '环跳', x: 40, y: 52, view: 'posterior' },
      { code: 'GB34', zh: '阳陵泉', x: 41, y: 76.5, view: 'anterior' },
      { code: 'GB39', zh: '悬钟', x: 41.5, y: 90, view: 'anterior' },
      { code: 'GB44', zh: '足窍阴', x: 41.5, y: 96.5, view: 'anterior' }
    ],
    points3D: [
      [-0.10, 1.66, 0.21],
      [-0.14, 1.72, 0.06],
      [-0.14, 1.48, -0.12],
      [-0.24, 1.32, -0.02],
      [-0.26, 0.96, 0.10],
      [-0.25, 0.62, 0.08],
      [-0.25, 0.28, -0.06],
      [-0.25, -0.06, 0.02],
      [-0.23, -0.40, 0.06],
      [-0.23, -0.78, 0.05],
      [-0.22, -0.92, 0.08],
      [-0.21, -0.98, 0.22]
    ]
  },
  {
    id: 'LR',
    name: { zh: '足厥阴肝经', pinyin: 'Zú Jué Yīn Gān Jīng', en: 'Liver Meridian (LR)' },
    fullTitle: { zh: '足厥阴肝经 (14穴)', pinyin: 'Foot Jueyin Liver', en: 'Foot Jueyin Liver Channel (14 Points)' },
    polarity: 'Yin',
    element: 'wood',
    peakTime: '01:00 – 03:00 (丑时)',
    flowDirectionEn: 'Lateral Great Toe (LR1) → 1st/2nd Metatarsal Groove (LR2, LR3) → Medial Leg & Knee (LR8) → Groin & External Genitalia → Ribcage (LR13, LR14) → Eye System & Vertex (GV20)',
    flowDirectionZh: '从足走腹胸巅顶：起于大趾背大敦穴，经行间、太冲上内踝前，交三阴交上膝内曲泉，循股内侧绕阴器、抵小腹，布胁肋（章门、期门）属肝络胆，上循喉咙连目系，会督脉于百会。',
    pathwaySummaryEn: 'Starts on the lateral dorsum of the big toe (LR1 Dadun), courses between the 1st and 2nd metatarsals through LR2 (Xingjian) and LR3 (Taichong), passes anterior to the medial malleolus (LR4 Zhongfeng), crosses SP6 and ascends the medial tibia and knee (LR8 Ququan) and inner thigh, loops around the reproductive region into the lower abdomen, terminates superficially at LR13 (Zhangmen) and LR14 (Qimen—Front-Mu of Liver in the 6th ICS), while its deep branch ascends the throat, eyes, and brain crown (GV20 Baihui).',
    pathwaySummaryZh: '起于大趾背毫毛部大敦，经行间、太冲，上内踝前中封，交三阴交循胫骨内侧上膝内曲泉，沿大腿内侧入阴毛中、绕阴器、抵小腹，止于胁下章门（脾募/脏会）、乳下期门（肝募）；深支属肝络胆，上膈循喉咙连目系，与督脉会于巅顶百会。',
    svgInternalPath: 'M 43,35 L 46,28 L 49,19 L 47,10.5 L 50,4.5',
    svgPathAnterior: 'M 47.5,96.5 L 46,92 C 46.5,88 47,85 46.5,79 C 46,75 46,66 47,56 L 49.5,52 L 47,47 L 40.5,41 L 43,35',
    channelNodes: [
      { code: 'LR1', zh: '大敦', x: 47.5, y: 96.5, view: 'anterior' },
      { code: 'LR2', zh: '行间', x: 46.5, y: 94.5, view: 'anterior' },
      { code: 'LR3', zh: '太冲', x: 46, y: 92, view: 'anterior' },
      { code: 'LR8', zh: '曲泉', x: 46, y: 75, view: 'anterior' },
      { code: 'LR13', zh: '章门', x: 40.5, y: 41, view: 'anterior' },
      { code: 'LR14', zh: '期门', x: 43, y: 35, view: 'anterior' }
    ],
    points3D: [
      [-0.14, -0.98, 0.25],
      [-0.15, -0.94, 0.23],
      [-0.15, -0.88, 0.20],
      [-0.14, -0.68, 0.14],
      [-0.14, -0.34, 0.14],
      [-0.13, 0.04, 0.17],
      [-0.04, 0.32, 0.23],
      [-0.25, 0.68, 0.16],
      [-0.19, 0.88, 0.24]
    ]
  },
  {
    id: 'CV',
    name: { zh: '任脉 (奇经八脉)', pinyin: 'Rèn Mài', en: 'Conception Vessel (Ren Mai / CV)' },
    fullTitle: { zh: '任脉 · 阴脉之海 (24穴)', pinyin: 'Sea of Yin Meridians', en: 'Ren Mai · Sea of All Yin Channels (24 Points)' },
    polarity: 'Yin',
    element: 'water',
    peakTime: 'Continuous Reservoir (奇经蓄溢)',
    flowDirectionEn: 'Uterus / Lower Dan Tian → Perineum (CV1) → Pubic Symphysis (CV2) → Umbilicus (CV8) & Epigastrium (CV12) → Sternum (CV17) & Suprasternal Notch (CV22) → Mentolabial Groove (CV24)',
    flowDirectionZh: '起于胞中，下出会阴，上毛际（曲骨），循腹胸咽喉正中线上行，统领关元、气海、神阙、中脘、膻中、天突、廉泉，止于下唇下承浆穴。',
    pathwaySummaryEn: 'Revered as the "Sea of the Yin Meridians" (阴脉之海). Originates in the Lower Dan Tian / uterus and emerges at the perineum (CV1 Huiyin), ascending strictly along the anterior midline through the Lower Jiao (CV4 Guanyuan, CV6 Qihai), umbilicus (CV8 Shenque), Middle Jiao (CV12 Zhongwan—Front-Mu of Stomach), Upper Jiao chest center (CV17 Danzhong—Hui-Meeting Point of Qi), throat (CV22 Tiantu), and chin (CV24 Chengjiang).',
    pathwaySummaryZh: '总任一身之阴经，调节月经妊育（“任主胞胎”）。循腹胸正中线上行，串连下焦元气之根（关元、气海）、中焦脾胃之枢纽（神阙、中脘）与上焦宗气之海（膻中），至下颏承浆穴。',
    svgPathAnterior: 'M 50,53 L 50,47 L 50,45 L 50,43 L 50,38.5 L 50,30 L 50,21.5 L 50,14.5',
    channelNodes: [
      { code: 'CV3', zh: '中极', x: 50, y: 49, view: 'anterior' },
      { code: 'CV4', zh: '关元', x: 50, y: 47, view: 'anterior' },
      { code: 'CV6', zh: '气海', x: 50, y: 45, view: 'anterior' },
      { code: 'CV8', zh: '神阙', x: 50, y: 43, view: 'anterior' },
      { code: 'CV12', zh: '中脘', x: 50, y: 38.5, view: 'anterior' },
      { code: 'CV17', zh: '膻中', x: 50, y: 30, view: 'anterior' },
      { code: 'CV22', zh: '天突', x: 50, y: 21.5, view: 'anterior' },
      { code: 'CV24', zh: '承浆', x: 50, y: 14.5, view: 'anterior' }
    ],
    points3D: [
      [0, 0.34, 0.24],
      [0, 0.44, 0.25],
      [0, 0.52, 0.26],
      [0, 0.62, 0.26],
      [0, 0.80, 0.26],
      [0, 1.06, 0.25],
      [0, 1.32, 0.20],
      [0, 1.54, 0.26]
    ]
  },
  {
    id: 'GV',
    name: { zh: '督脉 (奇经八脉)', pinyin: 'Dū Mài', en: 'Governing Vessel (Du Mai / GV)' },
    fullTitle: { zh: '督脉 · 阳脉之海 (28穴)', pinyin: 'Sea of Yang Meridians', en: 'Du Mai · Sea of All Yang Channels (28 Points)' },
    polarity: 'Yang',
    element: 'fire',
    peakTime: 'Continuous Reservoir (奇经蓄溢)',
    flowDirectionEn: 'Lower Dan Tian → Coccyx (GV1) → Lumbar Mingmen (GV4) → C7 Vertebra Prominens (GV14) → Occiput (GV16) → Crown Vertex (GV20) → Bridge of Nose & Philtrum (GV26)',
    flowDirectionZh: '起于胞中，下出会阴，由尾骨长强穴循脊柱正中线上行，经腰部命门、项背大椎、枕下风府入脑，上巅顶百会，沿额鼻正中下行至人中（水沟）、上唇系带（龈交）。',
    pathwaySummaryEn: 'Revered as the "Sea of the Yang Meridians" (阳脉之海). Ascends directly along the interior of the spinal column from the coccyx (GV1 Changqiang) through the lumbar Life-Gate (GV4 Mingmen at L2), the confluence of all Yang channels below C7 (GV14 Dazhui), enters the brain at the base of the skull (GV16 Fengfu), crowns at the vertex (GV20 Baihui), and descends the forehead and philtrum (GV26 Shuigou/Renzhong) to the upper gum.',
    pathwaySummaryZh: '总督一身之阳经，贯脊属肾入脑。统摄命门（真阳之宅）、大椎（诸阳之会）、风府、百会（三阳五会）及水沟（人中急救穴），主治神志、脊柱与阳气虚衰诸证。',
    svgPathPosterior: 'M 50,53 L 50,44 L 50,33 L 50,20.5 L 50,15 L 50,5',
    svgPathAnterior: 'M 50,5 L 50,9 L 50,13',
    channelNodes: [
      { code: 'GV1', zh: '长强', x: 50, y: 53, view: 'posterior' },
      { code: 'GV4', zh: '命门', x: 50, y: 44, view: 'posterior' },
      { code: 'GV9', zh: '至阳', x: 50, y: 33, view: 'posterior' },
      { code: 'GV14', zh: '大椎', x: 50, y: 20.5, view: 'posterior' },
      { code: 'GV16', zh: '风府', x: 50, y: 15, view: 'posterior' },
      { code: 'GV20', zh: '百会', x: 50, y: 5, view: 'posterior' },
      { code: 'GV26', zh: '水沟(人中)', x: 50, y: 13, view: 'anterior' }
    ],
    points3D: [
      [0, 0.30, -0.22],
      [0, 0.65, -0.21],
      [0, 1.00, -0.22],
      [0, 1.34, -0.18],
      [0, 1.48, -0.15],
      [0, 1.72, -0.10],
      [0, 1.80, 0.02],
      [0, 1.72, 0.21],
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
