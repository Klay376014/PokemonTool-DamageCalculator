import { useI18n } from 'vue-i18n'
import type moves from '../assets/pokemonMove.json'
import type abilities from '../assets/pokemonAbility.json'
import type items from '../assets/pokemonItem.json'

export type AssetType = 'Move' | 'Item' | 'Ability'

type JSONKey<T extends Record<string, any>> = keyof T
type JSONValue<T extends Record<string, any>> = T[JSONKey<T>]

const { t } = useI18n()

export async function getAsset<T extends string, U>(assetType: AssetType) {
  return (await import(`../assets/pokemon${assetType}.json`)).default as Record<T, U>
}

export function movesProps(move: JSONKey<typeof moves>, value: JSONValue<typeof moves>) {
  const { type, basePower, category } = value
  return {
    title: `${t(`move.${move}`)}`,
    subtitle: `${t(`type.${type ? type.toLowerCase() : type}`)}/${basePower}/${t(`${category}`)}`
  }
}

export function abilityProps(ability: JSONKey<typeof abilities>, value: JSONValue<typeof abilities>) {
  const { effect } = value
  return {
    title: `${t(`ability.${ability}`)}`,
    subtitle: effect
  }
}

export function itemsProps(item: JSONKey<typeof items>, value: JSONValue<typeof items>) {
  const { effect } = value
  return {
    title: `${t(`item.${item}`)}`,
    subtitle: effect
  }
}
