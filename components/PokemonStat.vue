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
  level: 50
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

const getEvRemaining = computed((): number => {
  return 508 - Object.values(pokemonRef.value.effortValues).reduce((sum, value) => sum + value, 0)
})

function checkIv(key: StatKeys): void {
  if (!pokemonRef.value.individualValues[key] || pokemonRef.value.individualValues[key] < 0)
    pokemonRef.value.individualValues[key] = 0
  else if (pokemonRef.value.individualValues[key] > 31)
    pokemonRef.value.individualValues[key] = 31
}

function checkEv(key: StatKeys): void {
  if (!pokemonRef.value.effortValues[key] || pokemonRef.value.effortValues[key] < 0)
    pokemonRef.value.effortValues[key] = 0
  else if (pokemonRef.value.effortValues[key] > 252)
    pokemonRef.value.effortValues[key] = 252
  else if (pokemonRef.value.effortValues[key] % 4 !== 0)
    pokemonRef.value.effortValues[key] = Math.round(pokemonRef.value.effortValues[key] / 4) * 4
}

function setEvZero(key: StatKeys): void {
  pokemonRef.value.effortValues[key] = 0
}

function setEvMax(key: StatKeys): void {
  pokemonRef.value.effortValues[key] = 252
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
    <thead class="">
      <tr>
        <th class="px-0">
          <div class="d-flex align-center justify-center">
            <p class="d-none d-sm-block mr-1">
              lv
            </p>
            <input v-model="pokemonRef.level" type="number" class="py-2" min="1" max="100">
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
      <tr class="w-100">
        <td>{{ $t('stat.iv') }}</td>
        <td v-for="(_, key) in stats" :key="key">
          <input v-model="pokemonRef.individualValues[key]" :name="key" type="number" class="py-2" min="0" max="31" @change="checkIv(key)">
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.ev') }}<br><span class="font-weight-bold" :class="{ 'text-secondary': getEvRemaining < 0 }">{{ getEvRemaining }}</span></td>
        <td v-for="(_, key) in stats" :key="key">
          <input v-model="pokemonRef.effortValues[key]" :name="key" type="number" class="py-2 w-100" min="0" max="252" step="4" @change="checkEv(key)">
          <div class="d-flex justify-center pb-2">
            <span class="px-2 evButton evButton-1" @click="setEvZero(key)">
              0
            </span>
            <span class="px-2 ml-sm-1 mr-sm-2 evButton evButton-2" @click="setEvMax(key)">
              M
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.stat') }}</td>
        <td v-for="(value, key) in pokemonRef.getStats()" :key="key">
          <input :name="key" type="number" class="py-2 w-100" min="0" max="300" :value="value">
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

.evButton {
  background-color: #533194;
  cursor: pointer;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  list-style: none;
  margin: 0;
  text-align: center;
  &-1{
    background-color: #C42F3D;
    &:hover {
      background-color: #da5562;
    }
    &:focus {
      background-color: #C42F3D;
    }
  }
  &-2{
    background-color: #533194;
    &:hover {
      background-color: #664f92;
    }
    &:focus {
      background-color: #533194;
    }
  }
}
</style>
