import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { ref } from 'vue'

// Mock stores with explicit imports to avoid Nuxt auto-import dependency
vi.mock('~/stores/pokemonData', async () => {
  const { defineStore } = await import('pinia')
  const { ref } = await import('vue')
  return {
    usePokemonDataStore: (role: string) =>
      defineStore(role, () => {
        const pokemonRef = ref<{ name: string; moves?: string[] }>({ name: '' })
        const moveList = ref<string[]>([])
        return { pokemonRef, moveList }
      })(),
  }
})

vi.mock('~/stores/condition', async () => {
  const { defineStore } = await import('pinia')
  const { ref } = await import('vue')
  return {
    useConditionStore: (role: string) =>
      defineStore(`conditions-for-${role}`, () => {
        const conditions = ref<Record<string, boolean>>({
          helpingHand: false,
          burned: false,
          charge: false,
          critical: false,
        })
        const switchFilter = ref(false)
        return { conditions, switchFilter }
      })(),
  }
})

import { useSwapPokemon } from '~/composables/useSwapPokemon'
import { usePokemonDataStore } from '~/stores/pokemonData'
import { useConditionStore } from '~/stores/condition'

describe('useSwapPokemon', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('swaps pokemonRef between attacker and defender', () => {
    const attacker = usePokemonDataStore('attacker')
    const defender = usePokemonDataStore('defender')
    attacker.pokemonRef.name = 'Miraidon'
    defender.pokemonRef.name = 'Koraidon'

    const { swap } = useSwapPokemon()
    swap()

    expect(attacker.pokemonRef.name).toBe('Koraidon')
    expect(defender.pokemonRef.name).toBe('Miraidon')
  })

  it('swaps moveList between attacker and defender', () => {
    const attacker = usePokemonDataStore('attacker')
    const defender = usePokemonDataStore('defender')
    attacker.moveList = ['Discharge', 'Electro Drift']
    defender.moveList = ['Flare Blitz', 'Collision Course']

    const { swap } = useSwapPokemon()
    swap()

    expect(attacker.moveList).toEqual(['Flare Blitz', 'Collision Course'])
    expect(defender.moveList).toEqual(['Discharge', 'Electro Drift'])
  })

  it('swaps conditions between attacker and defender', () => {
    const attackerCond = useConditionStore('attacker')
    const defenderCond = useConditionStore('defender')
    attackerCond.conditions.helpingHand = true
    attackerCond.conditions.burned = false
    defenderCond.conditions.helpingHand = false
    defenderCond.conditions.burned = true

    const { swap } = useSwapPokemon()
    swap()

    expect(attackerCond.conditions.helpingHand).toBe(false)
    expect(attackerCond.conditions.burned).toBe(true)
    expect(defenderCond.conditions.helpingHand).toBe(true)
    expect(defenderCond.conditions.burned).toBe(false)
  })

  it('swaps switchFilter between attacker and defender', () => {
    const attackerCond = useConditionStore('attacker')
    const defenderCond = useConditionStore('defender')
    attackerCond.switchFilter = true
    defenderCond.switchFilter = false

    const { swap } = useSwapPokemon()
    swap()

    expect(attackerCond.switchFilter).toBe(false)
    expect(defenderCond.switchFilter).toBe(true)
  })

  it('returns to original state after swapping twice', () => {
    const attacker = usePokemonDataStore('attacker')
    const defender = usePokemonDataStore('defender')
    attacker.pokemonRef.name = 'Miraidon'
    defender.pokemonRef.name = 'Koraidon'
    attacker.moveList = ['Discharge']
    defender.moveList = ['Flare Blitz']

    const { swap } = useSwapPokemon()
    swap()
    swap()

    expect(attacker.pokemonRef.name).toBe('Miraidon')
    expect(defender.pokemonRef.name).toBe('Koraidon')
    expect(attacker.moveList).toEqual(['Discharge'])
    expect(defender.moveList).toEqual(['Flare Blitz'])
  })

  it('does not throw when called with empty/default state', () => {
    expect(() => {
      const { swap } = useSwapPokemon()
      swap()
    }).not.toThrow()
  })
})
