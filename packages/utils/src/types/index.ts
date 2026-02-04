import { CraftAction, CraftActionCacId } from "./craftactions"
export { CraftActionCacId }

interface CompressOptionBase {
}
interface CompressOptionById extends CompressOptionBase {
  type: "id",
  actions: number[]
}
interface CompressOptionByName extends CompressOptionBase {
  type: "name",
  actions: string[]
}
interface CompressOptionBySignature extends CompressOptionBase {
  type: "signature",
  actions: string[]
}
export type CompressOption = CompressOptionById | CompressOptionByName | CompressOptionBySignature

export interface DecompressedCraftAction extends CraftAction {
  cacId: CraftActionCacId
}