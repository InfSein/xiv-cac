/**
 * 需要在本文件中手动维护生产技能。
 * ————————————————————————————————————————————————————————————————————————————————
 * ! 维护注意事项
 *   - CraftAction 的 ids 前8个元素遵循固定顺序：CRP->BSM->ARM->GSM->LTW->WVR->ALC->CUL
 *   - 各 CraftAction 之间的 ids / signatures 不能有重复
 * ————————————————————————————————————————————————————————————————————————————————
 */

import { CraftAction, CraftActionCacId, SupportedLanguages } from "../types/craftactions"

export const craftActions: Record<CraftActionCacId, CraftAction> = {
  [CraftActionCacId.GreatStrides]: {
    name_zh: "阔步",
    name_tc: "闊步",
    name_ko: "장족의 발전",
    name_ja: "グレートストライド",
    name_en: "Great Strides",
    name_de: "Große Schritte",
    name_fr: "Grands progrès",
    sheet: "Action",
    ids: [
      260, 261, 262, 263, 264, 265, 266, 267,
    ],
    signatures: [
      "greatStrides",
      "great_strides",
    ],
    wait_time: 2,
    icon: 1955,
  },
  [CraftActionCacId.Manipulation]: {
    name_zh: "掌握",
    name_tc: "掌握",
    name_ko: "교묘한 손놀림",
    name_ja: "マニピュレーション",
    name_en: "Manipulation",
    name_de: "Manipulation",
    name_fr: "Manipulation",
    sheet: "Action",
    ids: [
      4574, 4575, 4576, 4577, 4578, 4579, 4580, 4581,
    ],
    signatures: [
      "manipulation",
    ],
    wait_time: 2,
    icon: 1985,
  },
  [CraftActionCacId.WasteNot]: {
    name_zh: "俭约",
    name_tc: "儉約",
    name_ko: "근검절약",
    name_ja: "倹約",
    name_en: "Waste Not",
    name_de: "Nachhaltigkeit",
    name_fr: "Parcimonie",
    sheet: "Action",
    ids: [
      4631, 4632, 4633, 4634, 4635, 4636, 4637, 4638,
    ],
    signatures: [
      "wasteNot",
      "waste_not",
    ],
    wait_time: 2,
    icon: 1992,
  },
  [CraftActionCacId.WasteNot2]: {
    name_zh: "长期俭约",
    name_tc: "長期儉約",
    name_ko: "장기 절약",
    name_ja: "長期倹約",
    name_en: "Waste Not II",
    name_de: "Nachhaltigkeit II",
    name_fr: "Parcimonie pérenne",
    sheet: "Action",
    ids: [
      4639, 4640, 4641, 4642, 4643, 4644, 19002, 19003,
    ],
    signatures: [
      "wasteNot2",
      "waste_not_ii",
    ],
    wait_time: 2,
    icon: 1993,
  },
  [CraftActionCacId.Innovation]: {
    name_zh: "改革",
    name_tc: "改革",
    name_ko: "혁신",
    name_ja: "イノベーション",
    name_en: "Innovation",
    name_de: "Innovation",
    name_fr: "Innovation",
    sheet: "Action",
    ids: [
      19004, 19005, 19006, 19007, 19008, 19009, 19010, 19011,
    ],
    signatures: [
      "innovation",
    ],
    wait_time: 2,
    icon: 1987,
  },
  [CraftActionCacId.FinalAppraisal]: {
    name_zh: "最终确认",
    name_tc: "最終確認",
    name_ko: "최종 확인",
    name_ja: "最終確認",
    name_en: "Final Appraisal",
    name_de: "Letzte Kontrolle",
    name_fr: "Dernières vérifications",
    sheet: "Action",
    ids: [
      19012, 19013, 19014, 19015, 19016, 19017, 19018, 19019,
    ],
    signatures: [
      "finalAppraisal",
      "final_appraisal",
    ],
    wait_time: 2,
    icon: 1983,
  },
  [CraftActionCacId.Veneration]: {
    name_zh: "崇敬",
    name_tc: "崇敬",
    name_ko: "공경",
    name_ja: "ヴェネレーション",
    name_en: "Veneration",
    name_de: "Ehrfurcht",
    name_fr: "Vénération",
    sheet: "Action",
    ids: [
      19297, 19298, 19299, 19300, 19301, 19302, 19303, 19304,
    ],
    signatures: [
      "veneration",
    ],
    wait_time: 2,
    icon: 1995,
  },
  [CraftActionCacId.BasicSynthesis]: {
    name_zh: "制作",
    name_tc: "製作",
    name_ko: "작업",
    name_ja: "作業",
    name_en: "Basic Synthesis",
    name_de: "Bearbeiten",
    name_fr: "Travail de base",
    sheet: "CraftAction",
    ids: [
      100001, 100015, 100030, 100075, 100045, 100060, 100090, 100105,
    ],
    signatures: [
      "basicSynth",
      "basicSynth2",
      "basic_synthesis",
    ],
    wait_time: 3,
    icon: 1501,
  },
  [CraftActionCacId.BasicTouch]: {
    name_zh: "加工",
    name_tc: "加工",
    name_ko: "가공",
    name_ja: "加工",
    name_en: "Basic Touch",
    name_de: "Veredelung",
    name_fr: "Ouvrage de base",
    sheet: "CraftAction",
    ids: [
      100002, 100016, 100031, 100076, 100046, 100061, 100091, 100106,
    ],
    signatures: [
      "basicTouch",
      "basic_touch",
    ],
    wait_time: 3,
    icon: 1502,
  },
  [CraftActionCacId.MastersMend]: {
    name_zh: "精修",
    name_tc: "精修",
    name_ko: "능숙한 땜질",
    name_ja: "マスターズメンド",
    name_en: "Master's Mend",
    name_de: "Wiederherstellung",
    name_fr: "Réparation de maître",
    sheet: "CraftAction",
    ids: [
      100003, 100017, 100032, 100077, 100047, 100062, 100092, 100107,
    ],
    signatures: [
      "mastersMend",
      "masters_mend",
    ],
    wait_time: 3,
    icon: 1952,
  },
  [CraftActionCacId.StandardTouch]: {
    name_zh: "中级加工",
    name_tc: "中級加工",
    name_ko: "중급 가공",
    name_ja: "中級加工",
    name_en: "Standard Touch",
    name_de: "Solide Veredelung",
    name_fr: "Ouvrage standard",
    sheet: "CraftAction",
    ids: [
      100004, 100018, 100034, 100078, 100048, 100064, 100093, 100109,
    ],
    signatures: [
      "standardTouch",
      "standard_touch",
    ],
    wait_time: 3,
    icon: 1516,
  },
  [CraftActionCacId.Observe]: {
    name_zh: "观察",
    name_tc: "觀察",
    name_ko: "경과 관찰",
    name_ja: "経過観察",
    name_en: "Observe",
    name_de: "Beobachten",
    name_fr: "Observation",
    sheet: "CraftAction",
    ids: [
      100010, 100023, 100040, 100082, 100053, 100070, 100099, 100113,
    ],
    signatures: [
      "observe",
    ],
    wait_time: 3,
    icon: 1954,
  },
  [CraftActionCacId.PreciseTouch]: {
    name_zh: "集中加工",
    name_tc: "集中加工",
    name_ko: "집중 가공",
    name_ja: "集中加工",
    name_en: "Precise Touch",
    name_de: "Präzise Veredelung",
    name_fr: "Ouvrage précis",
    sheet: "CraftAction",
    ids: [
      100128, 100129, 100130, 100131, 100132, 100133, 100134, 100135,
    ],
    signatures: [
      "preciseTouch",
      "precise_touch",
    ],
    wait_time: 3,
    icon: 1524,
  },
  [CraftActionCacId.CarefulSynthesis]: {
    name_zh: "模范制作",
    name_tc: "模範製作",
    name_ko: "모범 작업",
    name_ja: "模範作業",
    name_en: "Careful Synthesis",
    name_de: "Sorgfältige Bearbeitung",
    name_fr: "Travail prudent",
    sheet: "CraftAction",
    ids: [
      100203, 100204, 100205, 100206, 100207, 100208, 100209, 100210,
    ],
    signatures: [
      "carefulSynthesis",
      "carefulSynthesis2",
      "careful_synthesis",
    ],
    wait_time: 3,
    icon: 1986,
  },
  [CraftActionCacId.PrudentTouch]: {
    name_zh: "俭约加工",
    name_tc: "儉約加工",
    name_ko: "절약 가공",
    name_ja: "倹約加工",
    name_en: "Prudent Touch",
    name_de: "Nachhaltige Veredelung",
    name_fr: "Ouvrage parcimonieux",
    sheet: "CraftAction",
    ids: [
      100227, 100228, 100229, 100230, 100231, 100232, 100233, 100234,
    ],
    signatures: [
      "prudentTouch",
      "prudent_touch",
    ],
    wait_time: 3,
    icon: 1535,
  },
  [CraftActionCacId.TrainedEye]: {
    name_zh: "工匠的神速技巧",
    name_tc: "工匠的神速技巧",
    name_ko: "장인의 날랜손",
    name_ja: "匠の早業",
    name_en: "Trained Eye",
    name_de: "Flinke Hand",
    name_fr: "Main preste",
    sheet: "CraftAction",
    ids: [
      100283, 100284, 100285, 100286, 100287, 100288, 100289, 100290,
    ],
    signatures: [
      "trainedEye",
      "trained_eye",
    ],
    wait_time: 3,
    icon: 1981,
  },
  [CraftActionCacId.PreparatoryTouch]: {
    name_zh: "坯料加工",
    name_tc: "坯料加工",
    name_ko: "밑가공",
    name_ja: "下地加工",
    name_en: "Preparatory Touch",
    name_de: "Basisveredelung",
    name_fr: "Ouvrage préparatoire",
    sheet: "CraftAction",
    ids: [
      100299, 100300, 100301, 100302, 100303, 100304, 100305, 100306,
    ],
    signatures: [
      "preparatoryTouch",
      "preparatory_touch",
    ],
    wait_time: 3,
    icon: 1507,
  },
  [CraftActionCacId.IntensiveSynthesis]: {
    name_zh: "集中制作",
    name_tc: "集中製作",
    name_ko: "집중 작업",
    name_ja: "集中作業",
    name_en: "Intensive Synthesis",
    name_de: "Fokussierte Bearbeitung",
    name_fr: "Travail vigilant",
    sheet: "CraftAction",
    ids: [
      100315, 100316, 100317, 100318, 100319, 100320, 100321, 100322,
    ],
    signatures: [
      "intensiveSynthesis",
      "intensive_synthesis",
    ],
    wait_time: 3,
    icon: 1514,
  },
  [CraftActionCacId.DelicateSynthesis]: {
    name_zh: "精密制作",
    name_tc: "精密製作",
    name_ko: "정밀 작업",
    name_ja: "精密作業",
    name_en: "Delicate Synthesis",
    name_de: "Akribische Bearbeitung",
    name_fr: "Travail minutieux",
    sheet: "CraftAction",
    ids: [
      100323, 100324, 100325, 100326, 100327, 100328, 100329, 100330,
    ],
    signatures: [
      "delicateSynthesis",
      "delicateSynthesis2",
      "delicate_synthesis",
    ],
    wait_time: 3,
    icon: 1503,
  },
  [CraftActionCacId.ByregotsBlessing]: {
    name_zh: "比尔格的祝福",
    name_tc: "比爾格的祝福",
    name_ko: "비레고의 축복",
    name_ja: "ビエルゴの祝福",
    name_en: "Byregot's Blessing",
    name_de: "Byregots Benediktion",
    name_fr: "Bénédiction de Byregot",
    sheet: "CraftAction",
    ids: [
      100339, 100340, 100341, 100342, 100343, 100344, 100345, 100346,
    ],
    signatures: [
      "byregotsBlessing",
      "byregot_s_blessing",
    ],
    wait_time: 3,
    icon: 1975,
  },
  [CraftActionCacId.HastyTouch]: {
    name_zh: "仓促",
    name_tc: "倉促",
    name_ko: "성급한 손길",
    name_ja: "ヘイスティタッチ",
    name_en: "Hasty Touch",
    name_de: "Hastige Veredelung",
    name_fr: "Ouvrage hâtif",
    sheet: "CraftAction",
    ids: [
      100355, 100356, 100357, 100358, 100359, 100360, 100361, 100362,
    ],
    signatures: [
      "hastyTouch",
      "hasty_touch",
    ],
    wait_time: 3,
    icon: 1989,
  },
  [CraftActionCacId.RapidSynthesis]: {
    name_zh: "高速制作",
    name_tc: "高速製作",
    name_ko: "강행 작업",
    name_ja: "突貫作業",
    name_en: "Rapid Synthesis",
    name_de: "Schnelle Bearbeitung",
    name_fr: "Travail rapide",
    sheet: "CraftAction",
    ids: [
      100363, 100364, 100365, 100366, 100367, 100368, 100369, 100370,
    ],
    signatures: [
      "rapidSynthesis",
      "rapidSynthesis2",
      "rapid_synthesis",
    ],
    wait_time: 3,
    icon: 1988,
  },
  [CraftActionCacId.TricksOfTheTrade]: {
    name_zh: "秘诀",
    name_tc: "秘訣",
    name_ko: "비결",
    name_ja: "秘訣",
    name_en: "Tricks of the Trade",
    name_de: "Kunstgriff",
    name_fr: "Ficelles du métier",
    sheet: "CraftAction",
    ids: [
      100371, 100372, 100373, 100374, 100375, 100376, 100377, 100378,
    ],
    signatures: [
      "tricksOfTheTrade",
      "tricks_of_the_trade",
    ],
    wait_time: 3,
    icon: 1990,
  },
  [CraftActionCacId.MuscleMemory]: {
    name_zh: "坚信",
    name_tc: "堅信",
    name_ko: "확신",
    name_ja: "確信",
    name_en: "Muscle Memory",
    name_de: "Motorisches Gedächtnis",
    name_fr: "Mémoire musculaire",
    sheet: "CraftAction",
    ids: [
      100379, 100380, 100381, 100382, 100383, 100384, 100385, 100386,
    ],
    signatures: [
      "muscleMemory",
      "muscle_memory",
    ],
    wait_time: 3,
    icon: 1994,
  },
  [CraftActionCacId.Reflect]: {
    name_zh: "闲静",
    name_tc: "閒靜",
    name_ko: "진가",
    name_ja: "真価",
    name_en: "Reflect",
    name_de: "Einkehr",
    name_fr: "Véritable valeur",
    sheet: "CraftAction",
    ids: [
      100387, 100388, 100389, 100390, 100391, 100392, 100393, 100394,
    ],
    signatures: [
      "reflect",
    ],
    wait_time: 3,
    icon: 1982,
  },
  [CraftActionCacId.CarefulObservation]: {
    name_zh: "设计变动",
    name_tc: "設計變動",
    name_ko: "설계 변경",
    name_ja: "設計変更",
    name_en: "Careful Observation",
    name_de: "Planänderung",
    name_fr: "Changement de patron",
    sheet: "CraftAction",
    ids: [
      100395, 100396, 100397, 100398, 100399, 100400, 100401, 100402,
    ],
    signatures: [
    ],
    wait_time: 3,
    icon: 1984,
  },
  [CraftActionCacId.Groundwork]: {
    name_zh: "坯料制作",
    name_tc: "坯料製作",
    name_ko: "밑작업",
    name_ja: "下地作業",
    name_en: "Groundwork",
    name_de: "Vorarbeit",
    name_fr: "Travail préparatoire",
    sheet: "CraftAction",
    ids: [
      100403, 100404, 100405, 100406, 100407, 100408, 100409, 100410,
    ],
    signatures: [
      "groundwork",
      "groundwork2",
    ],
    wait_time: 3,
    icon: 1518,
  },
  [CraftActionCacId.AdvancedTouch]: {
    name_zh: "上级加工",
    name_tc: "上級加工",
    name_ko: "상급 가공",
    name_ja: "上級加工",
    name_en: "Advanced Touch",
    name_de: "Höhere Veredelung",
    name_fr: "Ouvrage avancé",
    sheet: "CraftAction",
    ids: [
      100411, 100412, 100413, 100414, 100415, 100416, 100417, 100418,
    ],
    signatures: [
      "advancedTouch",
      "advanced_touch",
    ],
    wait_time: 3,
    icon: 1519,
  },
  [CraftActionCacId.HeartAndSoul]: {
    name_zh: "专心致志",
    name_tc: "專心致志",
    name_ko: "일심불란",
    name_ja: "一心不乱",
    name_en: "Heart and Soul",
    name_de: "Mit Leib und Seele",
    name_fr: "Attention totale",
    sheet: "CraftAction",
    ids: [
      100419, 100420, 100421, 100422, 100423, 100424, 100425, 100426,
    ],
    signatures: [
      "heartAndSoul",
      "heart_and_soul",
    ],
    wait_time: 3,
    icon: 1996,
  },
  [CraftActionCacId.PrudentSynthesis]: {
    name_zh: "俭约制作",
    name_tc: "儉約製作",
    name_ko: "절약 작업",
    name_ja: "倹約作業",
    name_en: "Prudent Synthesis",
    name_de: "Rationelle Bearbeitung",
    name_fr: "Travail économe",
    sheet: "CraftAction",
    ids: [
      100427, 100428, 100429, 100430, 100431, 100432, 100433, 100434,
    ],
    signatures: [
      "prudentSynthesis",
      "prudent_synthesis",
    ],
    wait_time: 3,
    icon: 1520,
  },
  [CraftActionCacId.TrainedFinesse]: {
    name_zh: "工匠的神技",
    name_tc: "工匠的神技",
    name_ko: "장인의 황금손",
    name_ja: "匠の神業",
    name_en: "Trained Finesse",
    name_de: "Götter Werk",
    name_fr: "Main divine",
    sheet: "CraftAction",
    ids: [
      100435, 100436, 100437, 100438, 100439, 100440, 100441, 100442,
    ],
    signatures: [
      "trainedFinesse",
      "trained_finesse",
    ],
    wait_time: 3,
    icon: 1997,
  },
  [CraftActionCacId.RefinedTouch]: {
    name_zh: "精炼加工",
    name_tc: "精煉加工",
    name_ko: "세련 가공",
    name_ja: "洗練加工",
    name_en: "Refined Touch",
    name_de: "Raffinierte Veredelung",
    name_fr: "Ouvrage raffiné",
    sheet: "CraftAction",
    ids: [
      100443, 100444, 100445, 100446, 100447, 100448, 100449, 100450,
    ],
    signatures: [
      "refinedTouch",
      "refined_touch",
    ],
    wait_time: 3,
    icon: 1522,
  },
  [CraftActionCacId.DaringTouch]: {
    name_zh: "冒进",
    name_tc: "冒進",
    name_ko: "대담한 손길",
    name_ja: "デアリングタッチ",
    name_en: "Daring Touch",
    name_de: "Kühne Veredelung",
    name_fr: "Ouvrage audacieux",
    sheet: "CraftAction",
    ids: [
      100451, 100452, 100453, 100454, 100455, 100456, 100457, 100458,
    ],
    signatures: [
      "daringTouch",
      "daring_touch",
    ],
    wait_time: 3,
    icon: 1998,
  },
  [CraftActionCacId.QuickInnovation]: {
    name_zh: "快速改革",
    name_tc: "快速改革",
    name_ko: "신속한 혁신",
    name_ja: "クイックイノベーション",
    name_en: "Quick Innovation",
    name_de: "Spontane Innovation",
    name_fr: "Innovation instantanée",
    sheet: "CraftAction",
    ids: [
      100459, 100460, 100461, 100462, 100463, 100464, 100465, 100466,
    ],
    signatures: [
      "quickInnovation",
      "quick_innovation",
    ],
    wait_time: 3,
    icon: 1999,
  },
  [CraftActionCacId.ImmaculateMend]: {
    name_zh: "巧夺天工",
    name_tc: "巧奪天工",
    name_ko: "완벽한 땜질",
    name_ja: "パーフェクトメンド",
    name_en: "Immaculate Mend",
    name_de: "Winkelzug",
    name_fr: "Réparation totale",
    sheet: "CraftAction",
    ids: [
      100467, 100468, 100469, 100470, 100471, 100472, 100473, 100474,
    ],
    signatures: [
      "immaculateMend",
      "immaculate_mend",
    ],
    wait_time: 3,
    icon: 1950,
  },
  [CraftActionCacId.TrainedPerfection]: {
    name_zh: "工匠的绝技",
    name_tc: "工匠的絕技",
    name_ko: "장인의 초절 기술",
    name_ja: "匠の絶技",
    name_en: "Trained Perfection",
    name_de: "Meisters Beitrag",
    name_fr: "Main suprême",
    sheet: "CraftAction",
    ids: [
      100475, 100476, 100477, 100478, 100479, 100480, 100481, 100482,
    ],
    signatures: [
      "trainedPerfection",
      "trained_perfection",
    ],
    wait_time: 3,
    icon: 1926,
  },
}

export const craftActionMapById = Object.entries(craftActions)
  .flatMap(([aid, action]) => action.ids.map(id => [id, Number(aid)] as const))
  .reduce<Record<number, number>>((map, [id, aid]) => {
    map[id] = aid
    return map
  }, {})

export const craftActionMapByName = Object.entries(craftActions).reduce<Record<string, number>>(
  (map, [aid, action]) => {
    const value = Number(aid)
    SupportedLanguages.forEach(lang => {
      map[action[`name_${lang}`]] = value
    })
    return map
  },
  {}
)

export const craftActionMapBySignature = Object.entries(craftActions)
  .flatMap(([aid, action]) => action.signatures.map(signature => [signature, Number(aid)] as const))
  .reduce<Record<string, number>>((map, [signature, aid]) => {
    map[signature] = aid
    return map
  }, {})
