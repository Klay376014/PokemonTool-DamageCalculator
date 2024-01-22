<script setup lang="ts">
const pm1 = usePokemonDataStore('pokemon1')
const pm2 = usePokemonDataStore('pokemon2')
async function getPokemon() {
  const targetPokemon1 = await useFetchPokemon()
  const targetPokemon2 = await useFetchPokemon()
  if (targetPokemon1) {
    const random = Math.random() * 8
    // 拿名字
    pm1.name = targetPokemon1.name
    // 拿圖片網址
    pm1.imgUrl = random < 1 && targetPokemon1.sprite.front_shiny ? targetPokemon1.sprite.front_shiny : targetPokemon1.sprite.front_default
    // 拿種族值
    const stats = targetPokemon1.stats
    pm1.baseStat = stats
  }

  if (targetPokemon2) {
    const random = Math.random() * 8
    // 拿名字
    pm2.name = targetPokemon2.name
    // 拿圖片網址
    pm2.imgUrl = random < 1 && targetPokemon2.sprite.front_shiny ? targetPokemon2.sprite.front_shiny : targetPokemon2.sprite.front_default
    // 拿種族值
    const stats = targetPokemon2.stats
    pm2.baseStat = stats
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
      <v-btn @click="getPokemon()">
        GO
      </v-btn>
    </div>
  </div>
  <div class="d-flex">
    <div class="px-16 w-50 mx-auto">
      <div class="text-h4 text-center pt-8 mb-8">
        {{ `${$t('go')}${$t(`pokemon.${pm1.name}`)}` }}
      </div>
      <v-img
        class="mx-auto"
        :width="150"
        aspect-ratio="1/1"
        :src="pm1.imgUrl"
        cover
      />
      <div>
        <v-progress-linear
          v-model="pm1.baseStat.hp"
          color="red"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm1.baseStat.hp }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm1.baseStat.atk"
          color="blue-grey"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm1.baseStat.atk }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm1.baseStat.def"
          color="amber"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm1.baseStat.def }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm1.baseStat.spa"
          color="teal"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm1.baseStat.spa }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm1.baseStat.spd"
          color="brown"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm1.baseStat.spd }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm1.baseStat.spe"
          color="deep-purple"
          height="20"
          max="200"
        >
          <strong>{{ pm1.baseStat.spe }}</strong>
        </v-progress-linear>
      </div>
    </div>
    <div class="px-16 w-50 mx-auto">
      <div class="text-h4 text-center pt-8 mb-8">
        {{ `${$t('go')}${$t(`pokemon.${pm2.name}`)}` }}
      </div>
      <v-img
        class="mx-auto"
        :width="150"
        aspect-ratio="1/1"
        :src="pm2.imgUrl"
        cover
      />

      <div>
        <v-progress-linear
          v-model="pm2.baseStat.hp"
          color="red"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm2.baseStat.hp }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm2.baseStat.atk"
          color="blue-grey"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm2.baseStat.atk }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm2.baseStat.def"
          color="amber"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm2.baseStat.def }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm2.baseStat.spa"
          color="teal"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm2.baseStat.spa }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm2.baseStat.spd"
          color="brown"
          height="20"
          max="200"
          class="mb-2"
        >
          <strong>{{ pm2.baseStat.spd }}</strong>
        </v-progress-linear>

        <v-progress-linear
          v-model="pm2.baseStat.spe"
          color="deep-purple"
          height="20"
          max="200"
        >
          <strong>{{ pm2.baseStat.spe }}</strong>
        </v-progress-linear>
      </div>
    </div>
  </div>
</template>

<style></style>
