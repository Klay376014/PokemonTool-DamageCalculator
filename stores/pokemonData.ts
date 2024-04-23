import { Pokemon } from 'vgc_data_wrapper'
import type { PokemonType, Sprite } from '~/utils/schema'

// eslint-disable-next-line antfu/top-level-function
export const usePokemonDataStore = (role: string) => defineStore(role, () => {
  const defaultImage = new URL('../assets/src/default.png', import.meta.url).href
  const createNewPokemon = () => {
    return new Pokemon({
      baseStat: {
        hp: 100,
        attack: 100,
        defense: 100,
        specialAttack: 100,
        specialDefense: 100,
        speed: 100,
      },
      sprite: defaultImage,
      types: ['Normal'],
      level: 50,
    })
  }

  const pokemonRef = ref(createNewPokemon())

  const setPokemon = (name: string, stats: Stats, types: PokemonType, sprite: Sprite, weight: number) => {
    pokemonRef.value.name = name
    pokemonRef.value.baseStat = stats
    pokemonRef.value.types = types
    pokemonRef.value.sprite = sprite.front_default.length > 0 ? sprite.front_default : defaultImage
    pokemonRef.value.weight = weight / 10
  }

  const setDefaultSelection = (name: string) => {
    switch (name) {
    case 'wo-chien':
      pokemonRef.value.ability = 'Tablets of Ruin'
      break;
    case 'chien-pao':
      pokemonRef.value.ability = 'Sword of Ruin'
      break;
    case 'ting-lu':
      pokemonRef.value.ability = 'Vessel of Ruin'
      break;
    case 'chi-yu':
      pokemonRef.value.ability = 'Beads of Ruin'
      break;
    case 'ogerpon':
      pokemonRef.value.item = 'Ogerpon Mask'
      break;
    case 'ogerpon-wellspring-mask':
      pokemonRef.value.item = 'Ogerpon Mask'
      break;
    case 'ogerpon-hearthflame-mask':
      pokemonRef.value.item = 'Ogerpon Mask'
      break;
    case 'ogerpon-cornerstone-mask':
      pokemonRef.value.item = 'Ogerpon Mask'
      break;
    default:
      pokemonRef.value.item = undefined
      pokemonRef.value.ability = undefined
      break;
    }
  }

  return {
    pokemonRef,
    setPokemon,
    setDefaultSelection
  }
})()
