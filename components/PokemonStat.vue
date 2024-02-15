<script setup lang="ts">
import { Pokemon } from 'vgc_data_wrapper'

const stages = ['+6', '+5', '+4', '+3', '+2', '+1', '0', '-1', '-2', '-3', '-4', '-5', '-6']

// 自肥式串接
const pokemon = new Pokemon({
  baseStat: {
    hp: 87,
    attack: 60,
    defense: 95,
    specialAttack: 133,
    specialDefense: 91,
    speed: 84,
  },
  effortValues: {
    hp: 252,
    specialAttack: 252,
    speed: 4
  }
})
const pokemonRef = ref(pokemon)
const stats = {
  atk: 'Atk',
  def: 'Def',
  spa: 'Spa',
  spd: 'Spd',
  spe: 'Spe',
} as const

type Stat = keyof typeof stats

const nature: Ref<{
  plus: Stat | ''
  minus: Stat | ''
}> = ref({
  plus: '',
  minus: '',
})

function setPlusNature(key: Stat) {
  if (nature.value.minus === key) {
    nature.value.minus = ''
    pokemonRef.value.setNature({ minus: undefined })
    return
  }
  nature.value.plus = key
  pokemonRef.value.setNature({ plus: convertStatKey(key) })
}

function setMinusNature(key: Stat) {
  if (nature.value.plus === key) {
    nature.value.plus = ''
    pokemonRef.value.setNature({ plus: undefined })
    return
  }
  nature.value.minus = key
  pokemonRef.value.setNature({ minus: convertStatKey(key) })
}

function getColor(key: Stat): string {
  if (nature.value.plus === key)
    return 'text-primary'

  if (nature.value.minus === key)
    return 'text-secondary'

  return ''
}

function convertStatKey(key: Stat): typeof pokemon.nature['minus'] {
  switch (key) {
  case 'atk':
    return 'attack'
  case 'def':
    return 'defense'
  case 'spa':
    return 'specialAttack'
  case 'spd':
    return 'specialDefense'
  case 'spe':
    return 'speed'
  }
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
        <th class="text-center px-0 pr-md-3">
          <span class="font-weight-bold">Hp</span>
        </th>
        <th v-for="(label, key) in stats" :key="key" class="text-center px-0 pr-md-3">
          <v-icon class="minus" @click="setMinusNature(key)">
            mdi-minus-thick
          </v-icon>
          <span class="font-weight-bold" :class="getColor(key)">{{ label }}</span>
          <v-icon class="plus" @click="setPlusNature(key)">
            mdi-plus-thick
          </v-icon>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ $t('stat.iv') }}</td>
        <td><input type="number" class="py-2" min="0" max="31" value="31"></td>
        <td><input type="number" class="py-2" min="0" max="31" value="31"></td>
        <td><input type="number" class="py-2" min="0" max="31" value="31"></td>
        <td><input type="number" class="py-2" min="0" max="31" value="31"></td>
        <td><input type="number" class="py-2" min="0" max="31" value="31"></td>
        <td><input type="number" class="py-2" min="0" max="31" value="31"></td>
      </tr>
      <tr>
        <td>{{ $t('stat.ev') }}<br><span class="font-weight-bold">{{ 508 }}</span></td>
        <td><input type="number" class="py-2" min="0" max="252" value="252" step="4"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="0" step="4"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="0" step="4"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="252" step="4"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="0" step="4"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="4" step="4"></td>
      </tr>
      <tr>
        <td>{{ $t('stat.stat') }}</td>
        <td><input type="number" class="py-2" min="0" max="300" disabled :value="pokemonRef.getStat('hp')"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled :value="pokemonRef.getStat('attack')"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled :value="pokemonRef.getStat('defense')"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled :value="pokemonRef.getStat('specialAttack')"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled :value="pokemonRef.getStat('specialDefense')"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled :value="pokemonRef.getStat('speed')"></td>
      </tr>
      <tr>
        <td>{{ $t('stat.stage') }}</td>
        <td />
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details model-value="0">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details model-value="0">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details model-value="0">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details model-value="0">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details model-value="0">
            <template #selection="{ item }">
              <span class="text-subtitle-2 text-right">{{ item.value }}</span>
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
