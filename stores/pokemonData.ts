import { Pokemon } from 'vgc_data_wrapper'

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
      level: 50
    })
  }

  const pokemonRef = ref(createNewPokemon())

  const setPokemon = (stats: Stats) => {
    pokemonRef.value.baseStat = stats
  }
  return {
    pokemonRef,
    setPokemon
  }
})()
