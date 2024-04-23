<script lang="ts" setup>
import type { Pokemon } from 'vgc_data_wrapper'
import { createMove } from 'vgc_data_wrapper'
import moves from '../assets/pokemonMove.json'

const props = defineProps<{
  pokemon: string[]
}>()
const attacker = usePokemonDataStore(props.pokemon[0])
const defender = usePokemonDataStore(props.pokemon[1])

const damageText = ref('wait for pokemon set')
const damageDetail = ref(
  'to be checked...'
)

const battle = usePokemonBattleStore(props.pokemon[0])
battle.battleField.setPokemon('attacker', attacker.pokemonRef as Pokemon)
battle.battleField.setPokemon('defender', defender.pokemonRef as Pokemon)

watch ([attacker.pokemonRef, defender.pokemonRef, battle.battleField], () => {
  if (attacker.pokemonRef.name && defender.pokemonRef.name && attacker.pokemonRef.moves) {
    const text = moves[attacker.pokemonRef.moves[0] as keyof typeof moves]
    const move = createMove({
      base: typeof text.basePower === 'number' ? text.basePower : 0,
      category: text.category as any,
      id: text.num,
      type: text.type as any,
      target: text.target as any,
      flags: text.flags as any
    })

    battle.battleField.move = move
    const damageResult = battle.battleField.getDamage()
    console.log(damageResult, battle.battleField)
    damageText.value = `${damageResult.rolls[0].number} ~ ${damageResult.rolls[15].number} (${damageResult.rolls[0].percentage}% ~${damageResult.rolls[15].percentage}%)`
  }
}, { deep: true, immediate: true })

function copyText() {
  navigator.clipboard.writeText(damageDetail.value)
}
</script>

<template>
  <div class="px-3">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center justify-space-around flex-1-1">
        <v-img
          max-width="50"
          aspect-ratio="1"
          :src="attacker.pokemonRef.sprite"
        />
        <v-icon icon="mdi-arrow-right-bold" class="text-h4 text-primary" />
        <v-img
          max-width="50"
          aspect-ratio="1"
          :src="defender.pokemonRef.sprite"
        />
      </div>

      <div class="d-flex align-center justify-space-between">
        <v-tooltip :text="damageDetail">
          <template #activator="{ props }">
            <v-icon color="primary" v-bind="props" @click="copyText">
              mdi-content-copy
            </v-icon>
          </template>
        </v-tooltip>
        <v-icon color="secondary" class="mx-3" style="cursor: pointer;">
          mdi-close-box
        </v-icon>
      </div>
    </div>
    <div class="d-flex align-center justify-space-between pt-2" style="font-size: 18px;">
      <p>
        {{ damageText }}
      </p>
    </div>
  </div>
</template>
