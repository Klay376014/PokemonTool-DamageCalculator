<script lang="ts" setup>
const nv = useNavigationStore()
const pokemonSet = ref([
  ['attacker', 'defender']
])
const addResult = (attacker: string) => {
  if (attacker === 'attacker')
    pokemonSet.value.push(['attacker', 'defender'])
  else
    pokemonSet.value.push(['defender', 'attacker'])
}
</script>

<template>
  <v-navigation-drawer
    v-model="nv.damage"
    location="right"
    width="350"
    class="pt-4"
  >
    <damage-text v-for="(pokemon, index) in pokemonSet" :key="index" :pokemon="pokemon" class="mb-8" />
    <div v-if="pokemonSet.length < 5" class="d-flex align-center justify-space-around">
      <v-btn color="primary" @click="addResult('attacker')">
        <v-icon icon="mdi-numeric-1-box" class="mr-2" />
        <v-icon icon="mdi-arrow-right-thin" />
        <v-icon icon="mdi-numeric-2-box" class="ml-2" />
      </v-btn>
      <v-btn color="secondary" @click="addResult('defender')">
        <v-icon icon="mdi-numeric-2-box" class="mr-2" />
        <v-icon icon="mdi-arrow-right-thin" />
        <v-icon icon="mdi-numeric-1-box" class="ml-2" />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>

</style>
