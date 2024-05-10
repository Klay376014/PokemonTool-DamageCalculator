import type moves from '../assets/pokemonMove.json'
import type abilities from '../assets/pokemonAbility.json'
import type items from '../assets/pokemonItem.json'

export const assetType = {
  Move: "moves",
  Item: "item",
  Ability: "ability"
} as const 

export type AssetType = keyof typeof assetType

export type JSONKey<T extends Record<string, any>> = keyof T
export type JSONValue<T extends Record<string, any>> = T[JSONKey<T>]

export async function getAsset<T extends string, U>(assetType: AssetType) {
  return (await import(`../assets/pokemon${assetType}.json`)).default as Record<T, U>
}

const movesProps = (move: JSONKey<typeof moves>, value: JSONValue<typeof moves>) => {
  const { type, basePower, category } = value
  return {
    title: `move.${move}`,
    subtitle: `type.${type}/${basePower}/${category}`
  }
}

const abilityProps = (ability: JSONKey<typeof abilities>, value: JSONValue<typeof abilities>) => {
  const { effect } = value
  return {
    title: `ability.${ability}`,
    subtitle: effect
  }
}

const itemsProps = (item: JSONKey<typeof items>, value: JSONValue<typeof items>) => {
  const { effect } = value
  return {
    title: `item.${item}`,
    subtitle: effect
  }
}

export const assetToPropsMapping: Record<AssetType, (...args: any) => { title: string, subtitle: string }> = {
  Move: movesProps,
  Ability: abilityProps,
  Item: itemsProps
}
