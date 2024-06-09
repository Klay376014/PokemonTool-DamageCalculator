<script setup lang="ts">
import { stats, type StatKeys } from '~/utils/schema'

const props = defineProps({
  role: {
    type: String,
    required: true,
  }
})

const stages = ['+6', '+5', '+4', '+3', '+2', '+1', '0', '-1', '-2', '-3', '-4', '-5', '-6'] as const
// TODO get information from props
const pm = usePokemonDataStore(props.role)


type StatKeysWithoutHP = Exclude<StatKeys, 'hp'>


const setPlusNature = (key: StatKeysWithoutHP) => {
  if (pm.pokemonRef.nature.minus === key) {
    pm.pokemonRef.setNature({ minus: undefined })
    return
  }
  pm.pokemonRef.setNature({ plus: key })
}

const setMinusNature = (key: StatKeysWithoutHP) => {
  if (pm.pokemonRef.nature.plus === key) {
    pm.pokemonRef.setNature({ plus: undefined })
    return
  }
  pm.pokemonRef.nature.minus = key
  pm.pokemonRef.setNature({ minus: key })
}

const getNatureToggleColor = (key: StatKeysWithoutHP): string => {
  if (pm.pokemonRef.nature.plus === key)
    return 'text-primary'

  if (pm.pokemonRef.nature.minus === key)
    return 'text-secondary'

  return ''
}

const getEvRemaining = computed((): number => {
  return 508 - Object.values(pm.pokemonRef.effortValues).reduce((sum, value) => sum + value, 0)
})

const checkIv = (key: StatKeys): void => {
  if (!pm.pokemonRef.individualValues[key] || pm.pokemonRef.individualValues[key] < 0)
    pm.pokemonRef.individualValues[key] = 0
  else if (pm.pokemonRef.individualValues[key] > 31)
    pm.pokemonRef.individualValues[key] = 31
}

const checkEv = (key: StatKeys): void => {
  if (!pm.pokemonRef.effortValues[key] || pm.pokemonRef.effortValues[key] < 0)
    pm.pokemonRef.effortValues[key] = 0
  else if (pm.pokemonRef.effortValues[key] > 252)
    pm.pokemonRef.effortValues[key] = 252
  else if (pm.pokemonRef.effortValues[key] % 4 !== 0)
    pm.pokemonRef.effortValues[key] = Math.round(pm.pokemonRef.effortValues[key] / 4) * 4
}

const setEvZero = (key: StatKeys): void => {
  pm.pokemonRef.effortValues[key] = 0
}

const setEvMax = (key: StatKeys): void => {
  pm.pokemonRef.effortValues[key] = 252
}

const setStatStages = (key: StatKeysWithoutHP, value: typeof stages[number] | null) => {
  if (!value)
    return
  pm.pokemonRef.statStage[key] = +value
}

const getStageModelValue = (val: number): typeof stages[number] => {
  return (val > 0 ? `+${val}` : val === 0 ? '0' : `${val}`) as typeof stages[number]
}

const valueWithStage = ref((value: number, key: StatKeys) => {
  if (key === 'hp') return value
  const stage = pm.pokemonRef.statStage[key]
  return stage >= 0 ? Math.trunc(value * (2 + stage) / 2) :  Math.trunc(value * 2 / (2 - stage))
})

const getStageEffectColor = (key: StatKeys) => {
  if (key === 'hp') return ''
  const stage = pm.pokemonRef.statStage[key]
  return stage > 0 ? 'text-primary' : stage < 0 ? 'text-secondary' : ''
}
</script>

<template>
  <v-table density="comfortable">
    <thead>
      <tr>
        <th class="px-0">
          <div class="d-flex align-center justify-center">
            <p class="d-none d-sm-block mr-1">
              lv
            </p>
            <input v-model="pm.pokemonRef.level" type="number" class="py-2" min="1" max="100">
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
        <td>
          {{ $t('stat.iv') }}
        </td>
        <td v-for="(_, key) in stats" :key="key">
          <input v-model="pm.pokemonRef.individualValues[key]" :name="key" type="number" class="py-2 w-75" min="0" max="31" @change="checkIv(key)">
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.ev') }}<br><span class="font-weight-bold" :class="{ 'text-secondary': getEvRemaining < 0 }">{{ getEvRemaining }}</span></td>
        <td v-for="(_, key) in stats" :key="key">
          <input v-model="pm.pokemonRef.effortValues[key]" :name="key" type="number" class="py-2 w-75" min="0" max="252" step="4" @change="checkEv(key)">
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
        <td v-for="(value, key) in pm.pokemonRef.getStats()" :key="key">
          <div class="d-flex flex-column align-center pr-3">
            <input :name="key" class="pt-1 w-75 text-center" :value="value" disabled>
            <input :name="key" class="pb-1 w-75 text-center" :value="`(${valueWithStage(value, key)})`" :class="getStageEffectColor(key)" disabled>
          </div>
        </td>
      </tr>
      <tr>
        <td>{{ $t('stat.stage') }}</td>
        <td v-for="(_, key) in stats" :key="key">
          <template v-if="key === 'hp'" />
          <v-select v-else :items="stages" variant="solo" density="compact" :model-value="getStageModelValue(pm.pokemonRef.statStage[key])" flat hide-details @update:model-value="(val) => setStatStages(key, val)">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.title }}</span>
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

td {
  white-space: nowrap !important;
}

table{
  table-layout: fixed !important;
}
</style>
