<script lang="ts" setup>

const nv = useNavigationStore()
const pokemonSet = ref(<{id: number, pokemon: string[]}[]>[])
pokemonSet.value.push({id: 1, pokemon: ['attacker', 'defender']})
const addResult = (attacker: string) => {
  if (attacker === 'attacker')
    pokemonSet.value.push({ id: Math.random(), pokemon:['attacker', 'defender'] })
  else
    pokemonSet.value.push({ id: Math.random(), pokemon:['defender', 'attacker'] })
}
const removeResult = (index: number) => {
  pokemonSet.value.splice(index, 1)
}
</script>

<template>
  <v-navigation-drawer
    v-model="nv.damage"
    location="right"
    width="350"
    class="pt-4"
  >
    <damage-text
      v-for="(pokemon, index) in pokemonSet"
      :key="pokemon.id"
      :pokemon="pokemon.pokemon"
      :index="index"
      @remove="removeResult"
      class="mb-8" 
    />
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
