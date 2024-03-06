<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import items from '../assets/pokemonItem.json'

const { t } = useI18n()

type Item = keyof typeof items

const itemList = Object.keys(items) as unknown as Item[]

function itemProps(item: Item) {
  const effect: string = items[item].effect
  return {
    title: t(`item.${item}`),
    subtitle: effect
  }
}

function customFilter(itemText: string, queryText: string, item: any) {
  const searchText = queryText.toLowerCase()
  const romanToKanaText = useRomanToKatakana(queryText)
  const kanaText = useHiraToKata(queryText)

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
    :label="$t('chooseItem')"
    :items="itemList"
    :item-props="itemProps"
    :custom-filter="customFilter"
    bg-color="transparent"
    variant="outlined"
    no-data-text="No item found"
    density="compact"
    hide-details
    @update:model-value="showData"
  />
</template>

<style>

</style>
