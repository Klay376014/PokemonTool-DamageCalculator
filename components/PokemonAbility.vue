<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import abilities from '../assets/pokemonAbility.json'

const { t } = useI18n()

type Ability = keyof typeof abilities

const abilityList = Object.keys(abilities) as unknown as Ability[]

function itemProps(item: Ability) {
  const effect: string = abilities[item].effect
  return {
    title: t(`ability.${item}`),
    subtitle: effect
  }
}

function customFilter(itemText: string, queryText: string, item: any) {
  const searchText = queryText.toLowerCase()
  const kanaText = useHiraToKata(queryText)
  const romanToKanaText = useRomanToKatakana(queryText)

  const textOne = item.value.toLowerCase().includes(searchText.toLowerCase())
  const textTwo = itemText.toLowerCase().includes(searchText)
  const textForKana = useHiraToKata(itemText).includes(kanaText)
  const textForRomanToKana = useHiraToKata(itemText).includes(romanToKanaText)
  return textOne || textTwo || textForRomanToKana || textForKana
}

function showData(value: string | null) {
  if (!value)
    return
  console.log(value)
}
</script>

<template>
  <v-autocomplete
    :label="$t('chooseAbility')"
    :items="abilityList"
    :item-props="itemProps"
    :custom-filter="customFilter"
    bg-color="transparent"
    variant="outlined"
    no-data-text="No ability found"
    density="compact"
    hide-details
    @update:model-value="showData"
  />
</template>

<style>

</style>
