<script setup lang="ts">

</script>

<template>
  <div>
    <v-container class="px-0">
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
                  {{ `${$t('terastal')}\ufe30${$t('type.none')}` }}
                </p>
                <v-img
                  max-width="24"
                  max-height="24"
                  src="/terastal.png"
                  style="cursor:pointer"
                />
              </div>

              <p class="text-grey text-subtitle-2 pt-2">
                {{ 'H87 A60 B95 C133 D91 S84' }}
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
