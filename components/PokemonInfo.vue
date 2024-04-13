<script lang="ts" setup>
const props = defineProps({
  role: {
    type: String,
    required: true
  }
})
const pm = usePokemonDataStore(props.role)
const teraType = ref('none')
function changeTeraType(type: string) {
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
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1000.png"
          />
        </v-col>
        <v-col cols="8">
          <div class="d-flex justify-space-between">
            <div>
              <p class="pt-2 font-weight-bold">
                {{ `${$t('type.ghost')} / ${$t('type.steel')}` }}
              </p>
              <div class="d-flex">
                <p>
                  {{ `${$t('terastal')}\ufe30${$t(`type.${teraType}`)}` }}
                </p>
                <tera-select :tera-type="teraType" @change-tera-type="changeTeraType" />
              </div>

              <p class="text-grey text-subtitle-2 pt-2">
                {{ `H${pm.pokemonRef.baseStat.hp} A${pm.pokemonRef.baseStat.attack} B${pm.pokemonRef.baseStat.defense} C${pm.pokemonRef.baseStat.specialAttack} D${pm.pokemonRef.baseStat.specialDefense} S${pm.pokemonRef.baseStat.speed}` }}
              </p>
            </div>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="d-md-flex">
            <v-btn icon="mdi-content-save" color="purple-lighten-2" variant="plain" class="text-md-h6" size="40" />
            <v-btn icon="mdi-import" color="red-lighten-1" variant="plain" class="text-h6" size="40" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
