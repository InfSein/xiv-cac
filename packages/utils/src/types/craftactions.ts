export const SupportedLanguages = ['zh', 'tc', 'ko', 'ja', 'en', 'de', 'fr'] as const
export type SupportedLanguage = typeof SupportedLanguages[number]
export interface CraftAction
  extends Record<`name_${SupportedLanguage}`, string> {
  /**
   * 该技能在哪个表
   * 有一部分技能并未记录在 CraftAction.csv ，而是 Action.csv
   * 下方 `ids` 所记述的便是这里指定的表名中的 ID
   */
  sheet: "Action" | "CraftAction"
  ids: number[]
  signatures: string[]
  /** 图标id，不过去除了前置的0 */
  icon: number
  /** 该技能在生产宏中的等待时间 */
  wait_time: number
}

export enum CraftActionCacId {
  /** 阔步 */
  GreatStrides = 1,
  /** 掌握 */
  Manipulation = 2,
  /** 俭约 */
  WasteNot = 3,
  /** 长期俭约 */
  WasteNot2 = 4,
  /** 改革 */
  Innovation = 5,
  /** 最终确认 */
  FinalAppraisal = 6,
  /** 崇敬 */
  Veneration = 7,
  /** 制作 */
  BasicSynthesis = 8,
  /** 加工 */
  BasicTouch = 9,
  /** 精修 */
  MastersMend = 10,
  /** 中级加工 */
  StandardTouch = 11,
  /** 观察 */
  Observe = 12,
  /** 集中加工 */
  PreciseTouch = 13,
  /** 模范制作 */
  CarefulSynthesis = 14,
  /** 俭约加工 */
  PrudentTouch = 15,
  /** 工匠的神速技巧 */
  TrainedEye = 16,
  /** 坯料加工 */
  PreparatoryTouch = 17,
  /** 集中制作 */
  IntensiveSynthesis = 18,
  /** 精密制作 */
  DelicateSynthesis = 19,
  /** 比尔格的祝福 */
  ByregotsBlessing = 20,
  /** 仓促 */
  HastyTouch = 21,
  /** 高速制作 */
  RapidSynthesis = 22,
  /** 秘诀 */
  TricksOfTheTrade = 23,
  /** 坚信 */
  MuscleMemory = 24,
  /** 闲静 */
  Reflect = 25,
  /** 设计变动 */
  CarefulObservation = 26,
  /** 坯料制作 */
  Groundwork = 27,
  /** 上级加工 */
  AdvancedTouch = 28,
  /** 专心致志 */
  HeartAndSoul = 29,
  /** 俭约制作 */
  PrudentSynthesis = 30,
  /** 工匠的神技 */
  TrainedFinesse = 31,
  /** 精炼加工 */
  RefinedTouch = 32,
  /** 冒进 */
  DaringTouch = 33,
  /** 快速改革 */
  QuickInnovation = 34,
  /** 巧夺天工 */
  ImmaculateMend = 35,
  /** 工匠的绝技 */
  TrainedPerfection = 36,
}
