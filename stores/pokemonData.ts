import { Pokemon } from 'vgc_data_wrapper'

// eslint-disable-next-line antfu/top-level-function
export const usePokemonDataStore = (id: string) => defineStore(id, () => {
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

  const setPokemon = () => {
    if (id === 'attacker') {
      pokemonRef.value.baseStat = {
        hp: 70,
        attack: 130,
        defense: 100,
        specialAttack: 55,
        specialDefense: 80,
        speed: 65,
      }
    }
    else {
      pokemonRef.value.baseStat = {
        hp: 55,
        attack: 55,
        defense: 55,
        specialAttack: 135,
        specialDefense: 135,
        speed: 135,
      }
    }
  }
  return {
    pokemonRef,
    setPokemon
  }
})()
