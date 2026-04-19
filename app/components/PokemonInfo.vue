<script lang="ts" setup>
const props = defineProps({
  role: {
    type: String,
    required: true
  }
})
const pm = usePokemonDataStore(props.role)
const teraType = ref('None')
// const isTerapagosStellar = computed(() => {
//   if (pm.pokemonRef.name === 'terapagos-stellar') {
//     changeTeraType('Stellar')
//   }
//   return pm.pokemonRef.name
// })
const changeTeraType = (type: string) => {
  if (type !== 'None') {
    pm.pokemonRef.toggleTera({ isTera: true, type: type as typeof pm.pokemonRef.teraType })
  } else {
    pm.pokemonRef.toggleTera({ isTera: false })
  }
  teraType.value = type
}
</script>

<template>
  <div>
    <v-container class="px-2 py-1">
      <v-row
        align="center"
        no-gutters
        style="height:100px"
      >
        <v-col cols="2" class="d-flex justify-center">
          <v-img
            max-width="75"
            aspect-ratio="1"
            :src="pm.pokemonRef.sprite"
          />
        </v-col>
        <v-col cols="7" class="pl-4">
          <div class="d-flex justify-space-between">
            <div>
              <div class="pt-2 d-flex gap-1">
                <TypeChip v-for="type in pm.pokemonRef.types" :key="type" :type="type" size="sm" class="mr-1" />
              </div>
              <!-- Champions 規則目前無太晶化 -->
              <!-- <div class="d-flex">
                <p>
                  {{ `${$t('terastal')}\ufe30${$t(`type.${teraType}`)}` }}
                </p>
                <tera-select :tera-type="teraType" :role="props.role" @change-tera-type="changeTeraType" :key="isTerapagosStellar"/>
              </div> -->
            </div>
          </div>
        </v-col>
        <v-col cols="3">
          <save-load :role="props.role" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
