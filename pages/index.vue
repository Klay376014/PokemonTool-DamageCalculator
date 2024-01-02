<script setup lang="ts">
const name = ref('bulbasaur')
const id = ref(1)
const imgUrl = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png')
async function getPokemon(): Promise<any> {
  try {
    id.value = Math.round(Math.random() * 1020)
    const url = `https://pokeapi.co/api/v2/pokemon/${id.value}`
    const response = await fetch(url)

    if (!response.ok)
      throw new Error('Network response error')

    const data = await response.json()
    name.value = data.name
    imgUrl.value = data.sprites.front_default
  }
  catch (error) {
    console.error('Error:', error)
    throw error
  }
}
</script>

<template>
  <div>
    <Toolbar />
    <div class="mx-auto text-center px-10">
      <div class="text-h3 pt-8 mb-8">
        {{ $t("hello") }}
      </div>
    </div>
    <div class="text-h4 text-center pt-8 mb-8">
      <v-btn @click="getPokemon">
        GO
      </v-btn>
      {{ `${$t('go')}${$t(`pokemon.${name}`)}` }}
    </div>
    <v-img
      class="mx-auto"
      :width="150"
      aspect-ratio="1/1"
      :src="imgUrl"
      cover
    />
  </div>
</template>

<style></style>
