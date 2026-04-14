<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Pokemon as WrapperPokemon } from 'vgc_data_wrapper'
import { assetToPropsMapping, assetType, getAsset } from '~/composables/useAssetKeyToContext'
import type { AssetType } from '~/composables/useAssetKeyToContext'
import { hiraToKata, romanToKana } from '~/utils/convertKana'
import { effectByEviolite } from '~/utils/evioliteMap'
import json from '../locales/en.json'
import type { PokemonType } from '~/utils/schema'
import { useDisplay } from 'vuetify'

const props = defineProps({
  listType: {
    type: String as PropType<'Pokemon' | AssetType>,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

const { lgAndUp, xlAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  if (!lgAndUp.value) return '100%'
  return xlAndUp.value ? '1200px' : '1280px'
})

const { t } = useI18n()
const pm = usePokemonDataStore(props.role)
const cd = useConditionStore(props.role)

// ── List data ─────────────────────────────────────────────
type AllPokemon = keyof typeof json.pokemon
const pokemonList = Object.keys(json.pokemon) as AllPokemon[]

// For Move/Ability/Item, load the asset JSON at component init.
// For Pokemon, we use the static pokemonList above.
const defaultList = props.listType !== 'Pokemon'
  ? await getAsset(props.listType as AssetType)
  : {} as Record<string, unknown>

const assetList = computed((): string[] => {
  if (props.listType === 'Pokemon') return pokemonList as string[]
  if (props.listType !== 'Move' || pm.moveList.length === 0 || !cd.switchFilter)
    return Object.keys(defaultList)
  return Object.keys(defaultList).filter(key =>
    pm.moveList.some(m => m.includes(key.toLowerCase().replaceAll(' ', '-')))
  )
})

// ── Current selection ──────────────────────────────────────
const currentValue = computed((): string | undefined => {
  if (props.listType === 'Pokemon') return pm.pokemonRef.name ?? undefined
  if (props.listType === 'Move') return pm.pokemonRef.moves?.[0] ?? undefined
  return pm.pokemonRef[assetType[props.listType as AssetType]] as string | undefined
})

const canClear = computed(() =>
  !!currentValue.value && (props.listType === 'Ability' || props.listType === 'Item')
)

// ── Display helpers ────────────────────────────────────────
const getItemProps = (item: string): { title: string; subtitle: string | undefined } => {
  if (props.listType === 'Pokemon') {
    return { title: t(`pokemon.${item}`), subtitle: undefined }
  }
  const raw = assetToPropsMapping[props.listType as AssetType](item, defaultList[item])
  const parts = raw.subtitle.split('/')
  const subtitle = parts.length === 3
    ? `${t(parts[0])}/${parts[1]}/${t(parts[2])}`
    : t(raw.subtitle)
  return { title: t(raw.title), subtitle }
}

const displayLabel = computed((): string | null => {
  if (!currentValue.value) return null
  return getItemProps(currentValue.value).title
})

// ── Search & filter ────────────────────────────────────────
const dialog = ref(false)
const searchText = ref('')

const filteredList = computed((): string[] => {
  const q = searchText.value.trim()
  if (!q) return assetList.value
  const lower = q.toLowerCase()
  const kana = hiraToKata(q)
  const roman = romanToKana(q)
  return assetList.value.filter(item => {
    const title = getItemProps(item).title
    return (
      item.toLowerCase().includes(lower) ||
      title.toLowerCase().includes(lower) ||
      hiraToKata(title).includes(kana) ||
      hiraToKata(title).includes(roman)
    )
  })
})

const openSheet = () => {
  searchText.value = ''
  dialog.value = true
}

const closeSheet = () => {
  dialog.value = false
  searchText.value = ''
}

// ── Selection handlers ─────────────────────────────────────
const isLoading = ref(false)

const selectItem = async (item: string) => {
  if (props.listType === 'Pokemon') {
    closeSheet()
    isLoading.value = true
    const r = await useFetchPokemon(item) as PokemonSchema | null
    if (!r) { isLoading.value = false; return }
    const { stats, types, sprite, weight } = r
    if (item !== 'terapagos-stellar') {
      pm.setPokemon(item, stats, types as PokemonType, sprite.front_default || sprite.artwork, weight)
      pm.pokemonRef.setFlags({ hasEvolution: effectByEviolite(item) })
    } else {
      pm.setPokemon(item, {
        hp: 160, attack: 105, defense: 110,
        specialAttack: 130, specialDefense: 110, speed: 85
      }, types as PokemonType, sprite.front_default || sprite.artwork, weight)
      pm.pokemonRef.teraType = 'Stellar'
    }
    pm.setDefaultSelection(item)
    isLoading.value = false
    return
  }
  switch (props.listType) {
    case 'Move':
      pm.pokemonRef.moves = [item]
      break
    case 'Ability':
      pm.pokemonRef.ability = item as WrapperPokemon['ability']
      break
    case 'Item':
      pm.pokemonRef.item = item as WrapperPokemon['item']
      break
  }
  closeSheet()
}

const clearValue = () => {
  switch (props.listType) {
    case 'Ability': pm.pokemonRef.ability = undefined; break
    case 'Item':    pm.pokemonRef.item = undefined;    break
  }
}
</script>

<template>
  <!-- ── Trigger (Apple Row style) ───────────────────────── -->
  <div class="select-trigger mt-2 mx-2" @click="openSheet">
    <div class="trigger-text">
      <div class="trigger-label">{{ $t(`label${listType}`) }}</div>
      <div class="trigger-value" :class="{ 'trigger-placeholder': !displayLabel }">
        {{ displayLabel ?? $t(`choose${listType}`) }}
      </div>
    </div>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      size="16"
      width="2"
      color="primary"
    />
    <v-icon
      v-else-if="canClear"
      icon="mdi-close-circle"
      size="16"
      class="trigger-clear"
      @click.stop="clearValue"
    />
    <span v-else class="trigger-arrow">›</span>
  </div>

  <!-- ── Bottom Sheet ─────────────────────────────────────── -->
  <v-dialog
    v-model="dialog"
    location="bottom"
    width="100%"
    :max-width="dialogMaxWidth"
    max-height="55vh"
    :scrim="true"
  >
    <v-card rounded="t-xl" class="sheet-card pa-0">
      <!-- Drag handle -->
      <div class="handle-row">
        <div class="handle-bar" />
      </div>

      <!-- Search field -->
      <div class="px-3 pb-2">
        <v-text-field
          v-model="searchText"
          :placeholder="$t(`choose${listType}`)"
          prepend-inner-icon="mdi-magnify"
          variant="filled"
          density="compact"
          hide-details
          autofocus
          clearable
          rounded
        />
      </div>

      <!-- Virtual scrolling list -->
      <v-virtual-scroll
        :items="filteredList"
        :item-height="52"
        class="sheet-list"
      >
        <template #default="{ item }">
          <v-list-item
            :key="item"
            v-bind="getItemProps(item)"
            density="compact"
            :append-icon="item === currentValue ? 'mdi-check' : undefined"
            :active="item === currentValue"
            active-color="primary"
            @click="selectItem(item)"
          />
        </template>
      </v-virtual-scroll>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid rgba(var(--v-border-color), 0.18);
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  background: rgba(var(--v-theme-on-surface), 0.03);
  transition: background 0.12s;
  min-height: 48px;
}
.select-trigger:active {
  background: rgba(var(--v-theme-on-surface), 0.07);
}
.trigger-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.trigger-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(var(--v-theme-on-surface), 0.45);
  margin-bottom: 2px;
}
.trigger-value {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.trigger-placeholder {
  color: rgba(var(--v-theme-on-surface), 0.4);
  font-weight: 400;
}
.trigger-arrow {
  color: rgb(var(--v-theme-primary));
  font-size: 18px;
  line-height: 1;
  margin-left: 4px;
}
.trigger-clear {
  color: rgba(var(--v-theme-on-surface), 0.4);
  margin-left: 4px;
}
.handle-row {
  display: flex;
  justify-content: center;
  padding: 10px 0 6px;
}
.handle-bar {
  width: 36px;
  height: 4px;
  background: rgba(var(--v-theme-on-surface), 0.18);
  border-radius: 2px;
}
.sheet-card {
  overflow: hidden;
  /* overwrite.css sets border-radius: 8px !important on .v-card — override for top-rounded sheet */
  border-radius: 16px 16px 0 0 !important;
}
.sheet-list {
  height: calc(55vh - 112px);
}
</style>
