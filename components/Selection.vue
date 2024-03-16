<script setup lang="ts" generic="T extends string, U">
import { useI18n } from 'vue-i18n'
import { assetToPropsMapping } from '~/composables/useAssetKeyToContext'
import { hiraToKata, romanToKana } from '~/utils/convertKana'

interface ISelection {
  listType: AssetType
}
const props = defineProps<ISelection>()
const { t } = useI18n()
const defaultList = await getAsset<T, U>(props.listType)
const list = Object.keys(defaultList) as Array<T>
const loading = ref(false)

function itemProps(item: T) {
  const oriItem = (assetToPropsMapping[props.listType](item, defaultList[item]))
  const splitSubtitle = oriItem.subtitle.split('/')
  const i18nItem = {
    title: t(`${oriItem.title}`),
    subtitle: splitSubtitle.length !== 3 ? t(oriItem.subtitle) : `${t(`${splitSubtitle[0]}`)}/${splitSubtitle[1]}/${t(`${splitSubtitle[2]}`)}`
  }
  return i18nItem
}

function customFilter(itemText: string, queryText: string, item?: {
  value: unknown
}) {
  const searchText = queryText.toLowerCase()
  const romanToKanaText = romanToKana(queryText)
  const kanaText = hiraToKata(queryText)

  const textOne = typeof item?.value === 'string' ? item.value.toLowerCase().includes(searchText.toLowerCase()) : ''
  const textTwo = itemText.toLowerCase().includes(searchText)
  const textForKana = hiraToKata(itemText).includes(kanaText)
  const textForRomanToKana = hiraToKata(itemText).includes(romanToKanaText)
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
