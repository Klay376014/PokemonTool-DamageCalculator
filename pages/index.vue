<script setup lang="ts">
const name = ref('bulbasaur')
const id = ref(1)
const imgUrl = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png')

const baseStat = ref<Stats>({
  hp: 45,
  atk: 49,
  def: 49,
  spa: 65,
  spd: 65,
  spe: 45
})

const fetchPokemonInfo = gql`
query fetchPokemonInfo($id: Int!) {
  pokemon_v2_pokemon(distinct_on: name, where: {id: {_eq: $id}}) {
    name
    pokemon_v2_pokemonmoves(where: {pokemon_id: {_eq: $id}, pokemon_v2_versiongroup: {name: {_eq: "scarlet-violet"}}}) {
      pokemon_v2_move {
        name
        move_damage_class_id
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonstats {
      base_stat
    }
  }
}
`
async function getPokemon() {
  try {
    id.value = Math.round(Math.random() * 1020)
    const variables = { id: id.value }
    const response = await useAsyncQuery(fetchPokemonInfo, variables)

    const validation = pokemonsResponseSchema.safeParse(response.data.value)
    if (!validation.success) {
      // TODO error handle
      return
    }
    const targetPokemon = validation.data.pokemon_v2_pokemon[0]
    // 拿名字
    name.value = targetPokemon.name
    // 拿圖片網址
    imgUrl.value = targetPokemon.sprite.front_default
    // 拿種族值
    const stats = targetPokemon.stats
    baseStat.value = stats
  }
  catch (e) {
    if (e instanceof Error)
      console.log(e.message)
  }
}
</script>

<template>
  <div>
    <Toolbar />
    <div class="mx-auto text-center px-16">
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
  <div class="px-16 w-50 mx-auto">
    <v-progress-linear
      v-model="baseStat.hp"
      color="red"
      height="20"
      max="200"
      class="mb-2"
    >
      <strong>{{ baseStat.hp }}</strong>
    </v-progress-linear>

    <v-progress-linear
      v-model="baseStat.atk"
      color="blue-grey"
      height="20"
      max="200"
      class="mb-2"
    >
      <strong>{{ baseStat.atk }}</strong>
    </v-progress-linear>

    <v-progress-linear
      v-model="baseStat.def"
      color="amber"
      height="20"
      max="200"
      class="mb-2"
    >
      <strong>{{ baseStat.def }}</strong>
    </v-progress-linear>

    <v-progress-linear
      v-model="baseStat.spa"
      color="teal"
      height="20"
      max="200"
      class="mb-2"
    >
      <strong>{{ baseStat.spa }}</strong>
    </v-progress-linear>

    <v-progress-linear
      v-model="baseStat.spd"
      color="brown"
      height="20"
      max="200"
      class="mb-2"
    >
      <strong>{{ baseStat.spd }}</strong>
    </v-progress-linear>

    <v-progress-linear
      v-model="baseStat.spe"
      color="deep-purple"
      height="20"
      max="200"
    >
      <strong>{{ baseStat.spe }}</strong>
    </v-progress-linear>
  </div>
</template>

<style></style>
