<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import moves from '../assets/pokemonMove.json'

const { t } = useI18n()

const loading = ref(false)

type Move = keyof typeof moves

const moveList = Object.keys(moves) as unknown as Move[]

function itemProps(item: Move) {
  const type: string = moves[item].type
  const basePower = moves[item].basePower
  const category = moves[item].category
  return {
    title: `${t(`move.${item}`)}`,
    subtitle: `${t(`type.${type.toLowerCase()}`)}/${basePower}/${t(`${category}`)}`
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
  <div class="mt-2">
    <v-autocomplete
      :label="$t('chooseMove')"
      :items="moveList"
      :loading="loading"
      :item-props="itemProps"
      :custom-filter="customFilter"
      class="px-2"
      bg-color="transparent"
      variant="outlined"
      no-data-text="No move found"
      density="compact"
      hide-details
      @update:model-value="showData"
    />
  </div>
</template>

<style>

</style>
