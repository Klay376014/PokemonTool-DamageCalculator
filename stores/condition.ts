import type { Battle, Pokemon } from 'vgc_data_wrapper'

export const useConditionStore = (attacker: string) => defineStore(`conditions-for-${attacker}`, () => {
  const conditions: Ref<{ [key: string]: boolean }> = ref({
    helpingHand: false,
    burned: false,
    charge: false,
    critical: false,
    powerSpot: false,
    lightScreen: false,
    reflect: false,
    steelySpirit: false,
    hasFriendGuard: false,
  })

  return {
    conditions
  }
})()
