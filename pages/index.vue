<script setup>

</script>

<template>
  <div class="mx-auto text-center px-10">
    <div class="text-h3 pt-8 mb-8">
      {{ $t("hello") }}
    </div>
    <v-select
      v-model="$i18n.locale"
      label="Select"
      :items="[
        'zhHant',
        'en',
        'ja',
      ]"
      variant="outlined"
      class="d-flex justify-center"
    />
  </div>
  <div class="text-h4 text-center pt-8 mb-8">
    {{ `去吧！${$t("pokemon.Charizard")}` }}
  </div>
</template>

<style></style>
