<script setup lang="ts">
import { Pokemon } from 'vgc_data_wrapper'

const stages = ['+6', '+5', '+4', '+3', '+2', '+1', '0', '-1', '-2', '-3', '-4', '-5', '-6'] as const
// TODO get information from props
const pokemon = new Pokemon({
  baseStat: {
    hp: 87,
    attack: 60,
    defense: 95,
    specialAttack: 133,
    specialDefense: 91,
    speed: 84,
  },
})
const pokemonRef = ref(pokemon)
type StatKeys = keyof (Pokemon['stats'] & object) // use & object to filter out undefined
type StatKeysWithoutHP = Exclude<StatKeys, 'hp'>
const stats = {
  hp: 'Hp',
  attack: 'Atk',
  defense: 'Def',
  specialAttack: 'Spa',
  specialDefense: 'Spd',
  speed: 'Spe',
} satisfies Record<StatKeys, string>

function setPlusNature(key: StatKeysWithoutHP) {
  if (pokemonRef.value.nature.minus === key) {
    pokemonRef.value.setNature({ minus: undefined })
    return
  }
  pokemonRef.value.setNature({ plus: key })
}

function setMinusNature(key: StatKeysWithoutHP) {
  if (pokemonRef.value.nature.plus === key) {
    pokemonRef.value.setNature({ plus: undefined })
    return
  }
  pokemonRef.value.nature.minus = key
  pokemonRef.value.setNature({ minus: key })
}

function getNatureToggleColor(key: StatKeysWithoutHP): string {
  if (pokemonRef.value.nature.plus === key)
    return 'text-primary'

  if (pokemonRef.value.nature.minus === key)
    return 'text-secondary'

  return ''
}
function setStatStages(key: StatKeysWithoutHP, value: typeof stages[number] | null) {
  if (!value)
    return
  pokemonRef.value.statStage[key] = +value
}
function getStageModelValue(val: number): typeof stages[number] {
  return (val > 0 ? `+${val}` : val === 0 ? '0' : `${val}`) as typeof stages[number]
}
</script>

<template>
  <v-table density="comfortable">
    <thead>
      <tr>
        <th class="px-0">
          <div class="d-flex align-center justify-center">
            <p class="d-none d-sm-block mr-2">
              lv
            </p>
            <input type="number" class="py-2 w-50" min="0" max="100" value="50">
          </div>
        </th>
        <th v-for="(label, key) in stats" :key="key" class="text-center px-0 pr-md-3">
          <span v-if="key === 'hp'" class="font-weight-bold">Hp</span>
          <template v-else>
            <v-icon class="minus" @click="setMinusNature(key)">
              mdi-minus-thick
            </v-icon>
            <span class="font-weight-bold" :class="getNatureToggleColor(key)">{{ label }}</span>
            <v-icon class="plus" @click="setPlusNature(key)">
              mdi-plus-thick
            </v-icon>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ $t('stat.iv') }}</td>
        <td v-for="(_, key) in stats" :key="key">
          <input v-model="pokemonRef.individualValues[key]" :name="key" type="number" class="py-2" min="0" max="31">
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.ev') }}<br><span class="font-weight-bold">{{ 508 }}</span></td>
        <td v-for="(_, key) in stats" :key="key">
          <input v-model="pokemonRef.effortValues[key]" :name="key" type="number" class="py-2" min="0" max="252" step="4">
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.stat') }}</td>
        <td v-for="(value, key) in pokemonRef.getStats()" :key="key">
          <input :name="key" type="number" class="py-2" min="0" max="300" :value="value">
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.stage') }}</td>
        <td v-for="(_, key) in stats" :key="key">
          <template v-if="key === 'hp'" />
          <v-select v-else :items="stages" variant="solo" density="compact" :model-value="getStageModelValue(pokemonRef.statStage[key])" flat hide-details @update:model-value="(val) => setStatStages(key, val)">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>
th {
  padding: 0;
}
td {
  padding: 0 !important;
  text-align: center;
}
input[type=number] {
  text-align: center;
  color: inherit;
}
input:disabled {
  color: inherit;
}
.v-select {
  padding: 0 8px;
  @media (max-width: 576px) {
    padding: 0;
  }
  text-align: center;
}
.v-icon {
  cursor: pointer;
  font-weight: bold;
  &.minus {
    font-size: 9px;
  }
  &.plus {
    font-size: 10px;
  }
}
</style>
