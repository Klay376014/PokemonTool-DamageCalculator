import { Pokemon } from 'vgc_data_wrapper'

// eslint-disable-next-line antfu/top-level-function
export const usePokemonDataStore = (id: string) => defineStore(id, () => {
  const createNewPokemon = () => {
    return new Pokemon({
      baseStat: {
        hp: 87,
        attack: 60,
        defense: 95,
        specialAttack: 133,
        specialDefense: 91,
        speed: 84,
      },
      level: 50
    })
  }
  const pokemon = createNewPokemon()
  const pokemonRef = ref(pokemon)

  return {
    pokemonRef
  }
})()
