import { craftActionMapById, craftActionMapByName, craftActionMapBySignature, craftActions } from "../data"
import { encode, decode } from "./code"
import { CompressOption, DecompressedCraftAction, CraftActionCacId } from "../types"

export const compress = (option: CompressOption | number[] | string[]) => {
  const parsedActions : number[] = []
  if (Array.isArray(option)) {
    option.forEach(action => {
      let cacId: number | undefined
      if (typeof action === 'number') {
        cacId = craftActionMapById[action]
        if (cacId === undefined) throw new Error(`Invalid action id: ${action}`)
      } else {
        cacId = craftActionMapByName[action]
        if (cacId === undefined) {
          cacId = craftActionMapBySignature[action]
        }
        if (cacId === undefined) throw new Error(`Invalid action name or signature: ${action}`)
      }
      parsedActions.push(cacId)
    })
  } else {
    switch(option.type) {
      case "id":
        option.actions.forEach(action => {
          const cacId = craftActionMapById[action]
          if (!cacId) throw new Error(`Invalid action id: ${action}`)
          parsedActions.push(cacId)
        })
        break
      case "name":
        option.actions.forEach(action => {
          const cacId = craftActionMapByName[action]
          if (!cacId) throw new Error(`Invalid action name: ${action}`)
          parsedActions.push(cacId)
        })
        break
      case "signature":
        option.actions.forEach(action => {
          const cacId = craftActionMapBySignature[action]
          if (!cacId) throw new Error(`Invalid action signature: ${action}`)
          parsedActions.push(cacId)
        })
        break
    }
  }
  const result = encode(parsedActions)
  return result
}

export const decompress = (compressed: string) => {
  const parsedActions = decode(compressed)
  const result : DecompressedCraftAction[] = []
  parsedActions.skillIds.forEach(cacId => {
    const action = craftActions[cacId as CraftActionCacId]
    if (!action) throw new Error(`Unknown action : ${cacId}`)
    result.push({
      cacId,
      ...action
    })
  })
  return result
}

export const getActionInfo = (gameId: number): DecompressedCraftAction | undefined => {
  const cacId = craftActionMapById[gameId]
  if (cacId === undefined) return undefined
  const action = craftActions[cacId as CraftActionCacId]
  return {
    cacId,
    ...action
  }
}
