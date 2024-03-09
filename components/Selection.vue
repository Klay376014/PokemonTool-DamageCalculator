<script setup lang="ts" generic="T extends string, U">
interface ISelection {
  listType: AssetType
  convertItemProps: (item: T, value: U) => {
    title: string
    subtitle: string
  }
}

const props = defineProps<ISelection>()
const defaultList = await getAsset<T, U>(props.listType)
const list = Object.keys(defaultList) as Array<T>
const loading = ref(false)

function itemProps(item: T) {
  return props.convertItemProps(item, defaultList[item])
}

function customFilter(itemText: string, queryText: string, item?: {
  value: unknown
}) {
  const searchText = queryText.toLowerCase()
  const romanToKanaText = useRomanToKatakana(queryText)
  const kanaText = useHiraToKata(queryText)

  const textOne = typeof item?.value === 'string' ? item.value.toLowerCase().includes(searchText.toLowerCase()) : ''
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
