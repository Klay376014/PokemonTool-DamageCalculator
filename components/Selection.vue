<script setup lang="ts" generic="T extends string, U">
import { useI18n } from 'vue-i18n'
import type { Pokemon as WrapperPokemon } from 'vgc_data_wrapper'
import { assetToPropsMapping, assetType } from '~/composables/useAssetKeyToContext'
import { hiraToKata, romanToKana } from '~/utils/convertKana'
const props = defineProps({
  listType: {
    type: String as PropType<AssetType>,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'attacker'
  }
})
const { t } = useI18n()
const includesPartial = (array: string[], subStr: string): boolean => {
  return array.some(item => item.includes(subStr));
}
const pm = usePokemonDataStore(props.role)
const cd = useConditionStore(props.role)
const defaultList = await getAsset<T, U>(props.listType)
const list = computed(() => {
  if (props.listType !== 'Move' || pm.moveList.length === 0 || !cd.switchFilter) return Object.keys(defaultList) as Array<T>
  
  // TODO 如果selection是招式欄位，並開啟朱紫學習限定，且確實有抓到招式清單才做過濾
  return Object.keys(defaultList).filter(key => includesPartial(pm.moveList, key.toLowerCase().replaceAll(' ', '-'))) as Array<T>
})
const itemProps = (item: T) => {
  const oriItem = (assetToPropsMapping[props.listType](item, defaultList[item]))
  const splitSubtitle = oriItem.subtitle.split('/')
  const i18nItem = {
    title: t(`${oriItem.title}`),
    subtitle: splitSubtitle.length !== 3 ? t(oriItem.subtitle) : `${t(`${splitSubtitle[0]}`)}/${splitSubtitle[1]}/${t(`${splitSubtitle[2]}`)}`
  }
  return i18nItem
}

const customFilter = (itemText: string, queryText: string, item?: {
  value: unknown
}) => {
  const searchText = queryText.toLowerCase()
  const romanToKanaText = romanToKana(queryText)
  const kanaText = hiraToKata(queryText)

  const textOne = typeof item?.value === 'string' ? item.value.toLowerCase().includes(searchText.toLowerCase()) : false
  const textTwo = itemText.toLowerCase().includes(searchText)
  const textForKana = hiraToKata(itemText).includes(kanaText)
  const textForRomanToKana = hiraToKata(itemText).includes(romanToKanaText)
  return textOne || textTwo || textForRomanToKana || textForKana
}

const setSelection = (value: string | null) => {
  if (!value) return
  switch (props.listType) {
  case 'Move':
    pm.pokemonRef.moves = [value]
    break;
  case 'Ability':
    pm.pokemonRef.ability = value as WrapperPokemon['ability']
    break
  case 'Item':
    pm.pokemonRef.item = value as WrapperPokemon['item']
    break;
  }
}

const clearSelection = () => {
  switch (props.listType) {
  case 'Ability':
    pm.pokemonRef.ability = undefined
    break
  case 'Item':
    pm.pokemonRef.item = undefined
    break;
  }
}
</script>

<template>
  <div class="mt-2">
    <v-autocomplete
      :label="$t(`choose${props.listType}`)"
      :items="list"
      :item-props="itemProps"
      :custom-filter="customFilter"
      class="px-2"
      bg-color="transparent"
      variant="outlined"
      :no-data-text="`No ${props.listType} found`"
      density="compact"
      hide-details
      clearable
      @update:model-value="setSelection"
      @click:clear="clearSelection"
      :model-value="pm.pokemonRef[assetType[props.listType]] as T"
    />
  </div>
</template>

<style>

</style>
