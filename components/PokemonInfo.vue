<script lang="ts" setup>
const props = defineProps({
  role: {
    type: String,
    required: true
  }
})
const pm = usePokemonDataStore(props.role)
const teraType = ref('None')
const isTerapagosStellar = computed(() => {
  if (pm.pokemonRef.name === 'terapagos-stellar') {
    teraType.value = 'Stellar'
  }
  return pm.pokemonRef.name
})
const changeTeraType = (type: string) => {
  pm.pokemonRef.isTera = type !== 'None'
  pm.pokemonRef.teraType = type !== 'None' ? type as typeof pm.pokemonRef.teraType : pm.pokemonRef.teraType
  teraType.value = type
}
</script>

<template>
  <div>
    <v-container class="px-0 py-1">
      <v-row
        align="center"
        no-gutters
        style="height:100px"
      >
        <v-col cols="2">
          <v-img
            max-width="75"
            aspect-ratio="1"
            :src="pm.pokemonRef.sprite"
          />
        </v-col>
        <v-col cols="8">
          <div class="d-flex justify-space-between">
            <div>
              <p class="pt-2 font-weight-bold">
                {{ pm.pokemonRef.types.length > 1
                  ? `${$t(`type.${pm.pokemonRef.types[0]}`)} / ${$t(`type.${pm.pokemonRef.types[1]}`)}`
                  : `${$t(`type.${pm.pokemonRef.types[0]}`)}` }}
              </p>
              <div class="d-flex">
                <p>
                  {{ `${$t('terastal')}\ufe30${$t(`type.${teraType}`)}` }}
                </p>
                <tera-select :tera-type="teraType" :role="props.role" @change-tera-type="changeTeraType" :key="isTerapagosStellar"/>
              </div>

              <p class="text-grey text-subtitle-2 pt-2">
                {{ `H${pm.pokemonRef.baseStat.hp} A${pm.pokemonRef.baseStat.attack} B${pm.pokemonRef.baseStat.defense} C${pm.pokemonRef.baseStat.specialAttack} D${pm.pokemonRef.baseStat.specialDefense} S${pm.pokemonRef.baseStat.speed}` }}
              </p>
            </div>
          </div>
        </v-col>
        <v-col cols="2">
          <save-load :role="props.role" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
