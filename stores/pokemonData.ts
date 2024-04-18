import { Pokemon } from 'vgc_data_wrapper'
import type { PokemonType, Sprite } from '~/utils/schema'

// eslint-disable-next-line antfu/top-level-function
export const usePokemonDataStore = (role: string) => defineStore(role, () => {
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
      types: ['Normal'],
      level: 50
    })
  }

  const pokemonRef = ref(createNewPokemon())
  const pokemonSprite = ref(new URL(
    '../assets/src/default.png',
    import.meta.url
  ).href)

  const setPokemon = (stats: Stats, types: PokemonType, sprite: Sprite) => {
    pokemonRef.value.baseStat = stats
    pokemonRef.value.types = types
    pokemonSprite.value = sprite.front_default.length > 0 ? sprite.front_default : pokemonSprite.value
  }
  return {
    pokemonRef,
    pokemonSprite,
    setPokemon
  }
})()
