import { Battle, createMove } from 'vgc_data_wrapper'

export const usePokemonBattleStore = (attacker: string) => defineStore(`battle-by-${attacker}`, () => {
  const field = useFieldStore()
  const battleField = ref(new Battle({
  }))
  battleField.value.setField({ isDouble: field.isDouble })
  return {
    battleField
  }
})()
