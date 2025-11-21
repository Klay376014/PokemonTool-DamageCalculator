<script lang="ts" setup>
import json from '../locales/en.json'

// 用原有寫法會判斷成optional，使用時需要多一層處理
const props = defineProps({
  teraType: {
    type: String,
    required: true,
    default: 'None'
  },
  role: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{
  changeTeraType: [teraType: string]
}>()

const pm = usePokemonDataStore(props.role)
const dialog = ref(false)
const currentTeraType = ref(props.teraType)
const isTerapagosStellar = computed(() => {
  if (pm.pokemonRef.name === 'terapagos-stellar') {
    currentTeraType.value = 'Stellar'
  }
  return pm.pokemonRef.name
})
const { name } = pm.pokemonRef
// 移除 none
const typeList = Object.keys(json.type)

const changeTeraType = (reset?: boolean) => {
  dialog.value = false
  if (reset) {
    currentTeraType.value = 'None'
    pm.pokemonRef.toggleTera({ isTera: false })
  }
  emit('changeTeraType', currentTeraType.value)
}

const isSpecificPokemon = (type: string) => {
  const isDisabled = ref(false)
  const isNone = type === 'None'
  if (!name) return false
  switch (name) {
    case 'ogerpon':
      isDisabled.value = (type !== 'Grass' || isNone)
      break;
    case 'ogerpon-wellspring-mask':
      isDisabled.value = (type !== 'Water' || isNone)
      break;
    case 'ogerpon-hearthflame-mask':
      isDisabled.value = (type !== 'Fire' || isNone)
      break;
    case 'ogerpon-cornerstone-mask':
      isDisabled.value = (type !== 'Rock' || isNone)
      break;
    case 'terapagos-stellar':
      isDisabled.value = type !== 'Stellar'
      break;
    default:
      break;
    }
    return isDisabled.value
}
</script>

<template>
  <v-img
    max-width="24"
    max-height="24"
    src="/terastal.webp"
    style="cursor:pointer"
    class="ms-1"
    @click="dialog = true"
  />

  <v-dialog
    v-model="dialog"
    max-width="400"
    scrollable
  >
    <v-card
      :title="$t('chooseTera')"
    >
      <v-divider class="mt-1" />

      <v-card-text class="px-0 py-0" style="height: 360px;">
        <v-radio-group
          v-model="currentTeraType"
          :key="isTerapagosStellar"
          inline
          hide-details
          class="p-0"
        >
          <v-container class="p-0">
            <v-row dense>
              <v-col v-for="type in typeList" :key="type" cols="4" style="padding:0 0 10px 0;" >
                <v-radio
                  :label="$t(`type.${type}`)"
                  :value="type"
                  density="compact"
                  :disabled="isSpecificPokemon(type)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          :text="$t('close')"
          @click="dialog = !dialog"
        />

        <v-spacer />

        <v-btn
          color="secondary"
          :text="$t('reset')"
          variant="flat"
          @click="changeTeraType(true)"
        />
        <v-btn
          color="primary"
          :text="$t('confirm')"
          variant="flat"
          @click="changeTeraType()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-label.v-label--clickable {
  font-size: 14px !important;
}
</style>
