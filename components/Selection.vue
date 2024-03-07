<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps({
  listType: String
})
const json = await import(`../assets/pokemon${props.listType}.json`)
const defaultList = json.default
const { t } = useI18n()
const list = Object.keys(defaultList)
const loading = ref(false)

function itemProps(item: string) {
  switch (props.listType) {
  case 'Move': {
    const type: string = defaultList[item].type
    const basePower = defaultList[item].basePower
    const category = defaultList[item].category
    return {
      title: `${t(`move.${item}`)}`,
      subtitle: `${t(`type.${type ? type.toLowerCase() : type}`)}/${basePower}/${t(`${category}`)}`
    }
  }
  case 'Item': {
    const effect: string = defaultList[item].effect
    return {
      title: t(`item.${item}`),
      subtitle: effect
    }
  }
  case 'Ability': {
    const effect: string = defaultList[item].effect
    return {
      title: t(`ability.${item}`),
      subtitle: effect
    }
  }
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
      :label="$t(`choose${props.listType}`)"
      :items="list"
      :loading="loading"
      :item-props="itemProps"
      :custom-filter="customFilter"
      class="px-2"
      bg-color="transparent"
      variant="outlined"
      :no-data-text="`No ${props.listType} found`"
      density="compact"
      hide-details
      @update:model-value="showData"
    />
  </div>
</template>

<style>

</style>
