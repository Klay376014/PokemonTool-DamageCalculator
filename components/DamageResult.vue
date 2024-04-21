<script lang="ts" setup>
import type { Pokemon } from 'vgc_data_wrapper'
import { createMove } from 'vgc_data_wrapper'
import moves from '../assets/pokemonMove.json'

const nv = useNavigationStore()
const pm1 = usePokemonDataStore('attacker')
const pm2 = usePokemonDataStore('defender')
const attacker = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/212.png'
const defender = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/987.png'
const pokemonSet = ref([
  [attacker, defender]
])
function addResult(atk: string, def: string) {
  pokemonSet.value.push([atk, def])
  const battle = usePokemonBattleStore('attacker', 'defender')
  if (!pm1.pokemonRef.moves)
    return
  const text = moves[pm1.pokemonRef.moves[0] as keyof typeof moves]
  const move = createMove({
    base: typeof text.basePower === 'number' ? text.basePower : 0,
    category: text.category as any,
    id: text.num,
    type: text.type as any,
    target: text.target as any,
    flags: text.flags as any
  })
  battle.battle.setPokemon('attacker', pm1.pokemonRef as Pokemon)
  battle.battle.setPokemon('defender', pm2.pokemonRef as Pokemon)
  battle.battle.move = move
  console.log(battle.battle.getDamage())
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
