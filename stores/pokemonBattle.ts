import { Battle, createMove } from 'vgc_data_wrapper'

// eslint-disable-next-line antfu/top-level-function
export const usePokemonBattleStore = (attacker: string) => defineStore(`battle-by-${attacker}`, () => {
  const battleField = ref(new Battle({
  }))

  return {
    battleField
  }
})()
