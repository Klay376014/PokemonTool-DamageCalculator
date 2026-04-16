<script lang="ts" setup>
import { internalToDisplay } from '~/utils/evConversion'
import type { Pokemon } from 'vgc_data_wrapper';
import { createMove } from 'vgc_data_wrapper';
import { useI18n } from 'vue-i18n';
import moves from '../assets/pokemonMove.json';

const props = defineProps<{
  pokemon: string[]
}>()

const attackerPokemon = usePokemonDataStore(props.pokemon[0])
const defenderPokemon = usePokemonDataStore(props.pokemon[1])
const battle = usePokemonBattleStore(props.pokemon[0])
battle.battleField.setPokemon('attacker', attackerPokemon.pokemonRef as Pokemon)
battle.battleField.setPokemon('defender', defenderPokemon.pokemonRef as Pokemon)
const cd = useConditionStore(props.pokemon[0])
const fi = useFieldStore()
const { t, locale } = useI18n()

const damageText = ref('')
const detailDamageText = ref('')
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
  } else {
    OHKOChance.value = ''
  }
  return `${minNumber} ~ ${maxNumber} (${minPercentage}% ~${maxPercentage}%)`
})

// 組詳細傷害文字，目前useI18n放進ts會有問題，先擺進這支檔案裡
const composeDetailText = (): string => {
  const { factors } = battle.battleField.getDamage()
  if (!factors) return ''

  const detailArray: string[] = []
  const { attacker, defender, field, move } = factors

  const natureCheck = (role: string, statFrom: keyof typeof stats) => {
    if (role === 'attack') {
      return attackerPokemon.pokemonRef.nature.plus === statFrom ? '+' : attackerPokemon.pokemonRef.nature.minus === statFrom ? '-' : ''
    } else {
      return defenderPokemon.pokemonRef.nature.plus === statFrom ? '+' : defenderPokemon.pokemonRef.nature.minus === statFrom ? '-' : ''
    }
  }

  const teraI18n = (role: string) => {
    const tera = role === 'attack' ? attackerPokemon.pokemonRef.teraType : defenderPokemon.pokemonRef.teraType
    switch (locale.value) {
      case 'zhHant':
        return tera === 'Stellar' ? t('stellar') : `${t('tera')}${t(`type.${tera}`)}`
      case 'en':
        return tera === 'Stellar' ? t('stellar') : `${t('tera')} ${t(`type.${tera}`)}`
      case 'ja':
        return tera === 'Stellar' ? t('stellar') : `${t(`type.${tera}`)}${t('tera')}`
      default:
        return ''
    }
  }

  // attacker name
  detailArray.push(t(`pokemon.${attackerPokemon.pokemonRef.name}`))

  // atk stage
  if (attackerPokemon.pokemonRef.statStage[attacker.atk] !== 0) {
    detailArray.push(`${attackerPokemon.pokemonRef.statStage[attacker.atk] > 0 ? '+' : ''}${attackerPokemon.pokemonRef.statStage[attacker.atk]}`)
  }

  // atk nature
  const atkStatFrom = attacker.statFrom
  if (atkStatFrom === 'Attacker') {
    detailArray.push(`${internalToDisplay(attackerPokemon.pokemonRef.effortValues[attacker.atk])}${stats[attacker.atk]}${natureCheck('attack', attacker.atk)}`)
  } else {
    detailArray.push(`${internalToDisplay(defenderPokemon.pokemonRef.effortValues[attacker.atk])}${stats[attacker.atk]}${natureCheck('defense', attacker.atk)}`)
  }


  // atk tera
  if (attacker.isTera) {
    detailArray.push(teraI18n('attack'))
  }

  // atk ability
  if (attacker.ability) {
    detailArray.push(t(`ability.${attackerPokemon.pokemonRef.ability}`))
  }

  // atk item
  if (attacker.item) {
    detailArray.push(t(`item.${attackerPokemon.pokemonRef.item}`))
  }

  // atk werther
  if (attacker.weather) {
    detailArray.push(t(`field.weather.${fi.weather}`))
  }

  // atk terrain
  if (field.terrain) {
    detailArray.push(t(`field.terrain.${fi.terrain}`))
  }

  // atk helpingHand
  if (attacker.helpingHand) {
    detailArray.push(t(`condition.helpingHand`))
  }

  // atk isCriticalHit
  if (move.isCriticalHit) {
    detailArray.push(t(`condition.critical`))
  }

  // atk charge
  if (attacker.charge) {
    detailArray.push(t(`condition.charge`))
  }

  // atk powerSpot
  if (attacker.powerSpot) {
    detailArray.push(t(`condition.powerSpot`))
  }

  // atk steelySpirit
  if (attacker.steelySpirit) {
    detailArray.push(t(`condition.steelySpirit`))
  }

  // atk ruin
  if (attacker.ruin) {
    detailArray.push(t(`ability.${attacker.ruin} of Ruin`))
  }

  // aura
  if (field.aura) {
    detailArray.push(`${battle.battleField.move?.type === 'Fairy' ? t('field.aura.Fairy') : t('field.aura.Dark')}${t('field.aura.title')}`)
  }

  // atk status
  if (attacker.status) {
    detailArray.push(t(`condition.burned`))
  }

  // isDouble
  if (field.isDouble) {
    detailArray.push(t(`condition.isDouble`))
  }

  // move
  detailArray.push(t(`move.${attackerPokemon.pokemonRef.moves[0]}`))

  // vs
  detailArray.push('vs')

  // defender name
  detailArray.push(t(`pokemon.${defenderPokemon .pokemonRef.name}`))

  // def stage
  if (defenderPokemon.pokemonRef.statStage[defender.def] !== 0) {
    detailArray.push(`${defenderPokemon.pokemonRef.statStage[defender.def] > 0 ? '+' : ''}${defenderPokemon.pokemonRef.statStage[defender.def]}`)
  }

  // def hp
  detailArray.push(`${internalToDisplay(defenderPokemon.pokemonRef.effortValues['hp'])}Hp`)

  // def nature
  detailArray.push(`${internalToDisplay(defenderPokemon.pokemonRef.effortValues[defender.def])}${stats[defender.def]}${natureCheck('defense', defender.def)}`)

  // def tera
  if (defender.isTera) {
    detailArray.push(teraI18n('defense'))
  }

  // def ability
  if (defender.ability) {
    detailArray.push(t(`ability.${defenderPokemon.pokemonRef.ability}`))
  }

  // def item
  if (defender.item) {
    detailArray.push(t(`item.${defenderPokemon.pokemonRef.item}`))
  }

  // def werther
  if (defender.weather) {
    detailArray.push(t(`field.weather.${fi.weather}`))
  }

  // def lightScreen
  if (defender.lightScreen) {
    detailArray.push(t('condition.lightScreen'))
  }

  // def reflect
  if (defender.reflect) {
    detailArray.push(t('condition.reflect'))
  }

  // def hasFriendGuard
  if (defender.hasFriendGuard) {
    detailArray.push(t('condition.hasFriendGuard'))
  }

  // def ruin
  if (defender.ruin) {
    detailArray.push(t(`ability.${defender.ruin} of Ruin`))
  }

  return detailArray.join(' ')
}

watch(
  [attackerPokemon.pokemonRef, defenderPokemon.pokemonRef, battle.battleField.attacker, battle.battleField.defender, battle.battleField.field, cd.conditions, locale],
  () => {
    if (attackerPokemon.pokemonRef.name && defenderPokemon.pokemonRef.name && attackerPokemon.pokemonRef.moves.length > 0) {
      const text = moves[attackerPokemon.pokemonRef.moves[0] as keyof typeof moves] as JSONMove
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
          isSound: text.flags.sound === 1,
          isPulse: text.flags.pulse === 1,
          isMultihit: !!text.multihit
        }
      })
      battle.battleField.move = move
      damageText.value = damageTextI18n.value
      detailDamageText.value = `${composeDetailText()}\n${damageText.value} ${t(OHKOChance.value, [OHKOPercentage.value])}`
    }
  }, { immediate: true, deep: true }
)

const copyText = () => {
  navigator.clipboard.writeText(detailDamageText.value)
}
</script>

<template>
  <div class="d-flex flex-column align-center justify-center px-4 h-100 w-100">
    <div class="d-flex align-center justify-center">
      <v-img
        width="50"
        max-width="50"
        aspect-ratio="1"
        :src="attackerPokemon.pokemonRef.sprite"
      />
      <v-icon icon="mdi-arrow-right-bold" class="text-h4 text-primary mx-2" />
      <v-img
        width="50"
        max-width="50"
        aspect-ratio="1"
        :src="defenderPokemon.pokemonRef.sprite"
      />
    </div>

    <div class="d-flex align-center justify-center">
      <p class="text-center text-subtitle-1 mr-2">
        {{ damageText ? `${damageText}${OHKOChance ? '　' + $t(OHKOChance, [OHKOPercentage]) : ''}` : $t('setPokemonAndMove') }}
      </p>
      <v-tooltip :text="detailDamageText">
        <template #activator="{ props }">
          <v-icon color="primary" v-bind="props" @click="copyText">
            mdi-content-copy
          </v-icon>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>
