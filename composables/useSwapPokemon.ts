import { usePokemonDataStore } from '~/stores/pokemonData'
import { useConditionStore } from '~/stores/condition'

export function useSwapPokemon() {
  const attackerData = usePokemonDataStore('attacker')
  const defenderData = usePokemonDataStore('defender')
  const attackerCond = useConditionStore('attacker')
  const defenderCond = useConditionStore('defender')

  function swap() {
    const tempPokemon = attackerData.pokemonRef
    attackerData.pokemonRef = defenderData.pokemonRef
    defenderData.pokemonRef = tempPokemon

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
