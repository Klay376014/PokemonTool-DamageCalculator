import { usePokemonDataStore } from '~/stores/pokemonData'
import { useConditionStore } from '~/stores/condition'

function swapObjectProperties(obj1: Record<string, unknown>, obj2: Record<string, unknown>) {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  for (const key of keys) {
    if (typeof obj1[key] === 'function' || typeof obj2[key] === 'function') continue
    const temp = obj1[key]
    obj1[key] = obj2[key]
    obj2[key] = temp
  }
}

export function useSwapPokemon() {
  const attackerData = usePokemonDataStore('attacker')
  const defenderData = usePokemonDataStore('defender')
  const attackerCond = useConditionStore('attacker')
  const defenderCond = useConditionStore('defender')

  function swap() {
    // Mutate the Pokemon objects in place so DamageText's deep watcher detects the change.
    // (Replacing the reference would leave the watcher tracking the old object.)
    swapObjectProperties(
      attackerData.pokemonRef as unknown as Record<string, unknown>,
      defenderData.pokemonRef as unknown as Record<string, unknown>,
    )

    const tempMoveList = [...attackerData.moveList]
    attackerData.moveList = [...defenderData.moveList]
    defenderData.moveList = tempMoveList

    const tempConditions = { ...attackerCond.conditions }
    attackerCond.conditions = { ...defenderCond.conditions }
    defenderCond.conditions = tempConditions

    const tempSwitchFilter = attackerCond.switchFilter
    attackerCond.switchFilter = defenderCond.switchFilter
    defenderCond.switchFilter = tempSwitchFilter
  }

  return { swap }
}
