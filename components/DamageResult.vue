<script lang="ts" setup>
const nv = useNavigationStore()
const attacker = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/212.png'
const defender = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/987.png'
const pokemonSet = ref([
  [attacker, defender]
])
function addResult(atk: string, def: string) {
  pokemonSet.value.push([atk, def])
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
    <div v-if="pokemonSet.length < 7" class="d-flex align-center justify-space-around">
      <v-btn color="primary" @click="addResult(attacker, defender)">
        <v-icon icon="mdi-sword-cross" class="mr-2" />
        <v-icon icon="mdi-arrow-right-thin" />
        <v-icon icon="mdi-shield-half-full" class="ml-2" />
      </v-btn>
      <v-btn color="secondary" @click="addResult(defender, attacker)">
        <v-icon icon="mdi-shield-half-full" class="mr-2" />
        <v-icon icon="mdi-arrow-right-thin" />
        <v-icon icon="mdi-sword-cross" class="ml-2" />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>

</style>
