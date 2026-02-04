import { craftActions } from './craftactions';
import { SupportedLanguages } from "../types/craftactions"

export { craftActions };

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