import type { Pokemon } from 'vgc_data_wrapper'
import { Battle, createMove } from 'vgc_data_wrapper'
import moves from '../assets/pokemonMove.json'

// eslint-disable-next-line antfu/top-level-function
export const usePokemonBattleStore = (attacker: string, defender: string) => defineStore(`${attacker}-to-${defender}`, () => {
  const battle = ref(new Battle({
  }))

  return {
    battle
  }
})()
