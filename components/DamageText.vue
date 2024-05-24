<script lang="ts" setup>
import type { Pokemon } from 'vgc_data_wrapper'
import { createMove } from 'vgc_data_wrapper'
import moves from '../assets/pokemonMove.json'
import { watchPausable } from '@vueuse/core'

const props = defineProps<{
  pokemon: string[]
}>()
const attacker = usePokemonDataStore(props.pokemon[0])
const defender = usePokemonDataStore(props.pokemon[1])
const battle = usePokemonBattleStore(props.pokemon[0])
battle.battleField.setPokemon('attacker', attacker.pokemonRef as Pokemon)
battle.battleField.setPokemon('defender', defender.pokemonRef as Pokemon)
const cd = useConditionStore(props.pokemon[0])

const damageText = ref('')
const damageDetail = ref('')
type JSONMove = {
  num: number
  accuracy: number
  basePower: number
  category: string
  pp: number
  priority: number
  flags: {
    contact: number
    protect: number
    mirror: number
    bite?: number
    slicing?: number
    punch?: number
    sound?: number
    pulse?: number
  }
  multihit?: true | number | number[]
  recoil?: number[]
  secondary?: null
  target: string
  type: string
}
const watcher = watchPausable(
  [attacker.pokemonRef, defender.pokemonRef, battle.battleField.attacker, battle.battleField.defender, battle.battleField.field, cd.conditions],
  () => {
    if (attacker.pokemonRef.name && defender.pokemonRef.name && attacker.pokemonRef.moves) {
      const text = moves[attacker.pokemonRef.moves[0] as keyof typeof moves] as JSONMove
      const move = createMove({
        base: typeof text.basePower === 'number' ? text.basePower : 0,
        category: text.category as any,
        id: text.num,
        type: text.type as any,
        target: text.target as any,
        flags: {
          isCriticalHit: cd.conditions.critical,
          isPriority: text.priority > 0,
          hasRecoil: !!text.recoil,
          hasSecondary: text.secondary !== null,
          isBite: text.flags.bite === 1,
          isContact: text.flags.contact === 1,
          isPunch: text.flags.punch === 1,
          isSlicing: text.flags.slicing === 1,
          isSound: text.flags.slicing === 1,
          isPulse: text.flags.pulse === 1,
          isMultihit: !!text.multihit
        }
      })
      battle.battleField.move = move
      console.log(battle.battleField.move, battle.battleField.defender)
      damageText.value = damageTextI18n.value
    }
  }
)

const OHKOChance = ref('')
const OHKOPercentage = ref(0)

const damageTextI18n = computed(() => {
  const { koChance, rolls } = battle.battleField.getDamage()
  const { number: minNumber, percentage: minPercentage } = rolls[0]
  const { number: maxNumber, percentage: maxPercentage } = rolls[15]
  OHKOPercentage.value = koChance
  if (koChance >= 100) {
    OHKOChance.value = 'description.damage.OHKO'
  } else if (koChance > 0) {
    OHKOChance.value = 'description.damage.chanceToOHKO'
  } else if (minPercentage > 50) {
    OHKOChance.value = 'description.damage.2HKO'
  } else if (maxPercentage > 50) {
    OHKOChance.value = 'description.damage.chanceTo2HKO'
  }
  return `${minNumber} ~ ${maxNumber} (${minPercentage}% ~${maxPercentage}%)`
})

const isPause = ref(false)

const stoppedResult: Ref<{ [key: string]: string | null }> = ref({
  attackerSprite: null,
  defenderSprite: null,
})

const pauseWatch = () => {
  stoppedResult.value.attackerSprite = attacker.pokemonRef.sprite ?? attacker.defaultImage
  stoppedResult.value.defenderSprite = defender.pokemonRef.sprite ?? defender.defaultImage
  isPause.value = true
  watcher.pause()
}

const resumeWatch = () => {
  stoppedResult.value.attackerSprite = null
  stoppedResult.value.defenderSprite = null
  isPause.value = false
  watcher.resume()
  const damageResult = battle.battleField.getDamage()
  damageText.value = `${damageResult.rolls[0].number} ~ ${damageResult.rolls[15].number} (${damageResult.rolls[0].percentage}% ~${damageResult.rolls[15].percentage}%) ${damageResult.koChance}`
}

const copyText = () => {
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
          :src="stoppedResult.attackerSprite ?? attacker.pokemonRef.sprite"
        />
        <v-icon icon="mdi-arrow-right-bold" class="text-h4 text-primary" />
        <v-img
          max-width="50"
          aspect-ratio="1"
          :src="stoppedResult.defenderSprite ?? defender.pokemonRef.sprite"
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
        <v-icon color="secondary" class="mx-3" style="cursor: pointer;" @click="pauseWatch" v-if="!isPause">
          mdi-cancel
        </v-icon>
        <v-icon color="secondary" class="mx-3" style="cursor: pointer;" @click="resumeWatch" v-else>
          mdi-play
        </v-icon>
      </div>
    </div>
    <div class="pt-4" style="font-size: 18px;">
      <p class="text-center text-subtitle-1 w-100">
        {{ damageText ? damageText : $t('setPokemonAndMove') }}
      </p>
      <p class="text-center text-subtitle-1 w-100">
        {{ damageText ? $t(OHKOChance, [OHKOPercentage]) : '' }}
      </p>
    </div>
  </div>
</template>
