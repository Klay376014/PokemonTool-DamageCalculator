<script setup lang="ts">
import { stats, type StatKeys } from '~/utils/schema'
import { displayToInternal, internalToDisplay } from '~/utils/evConversion'

const props = defineProps({
  role: {
    type: String,
    required: true,
  }
})

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
  return 66 - Object.values(pm.pokemonRef.effortValues).reduce((sum, value) => sum + internalToDisplay(value), 0)
})

// Pokemon Champions make Pokemon's EV at 31
// const checkIv = (key: StatKeys): void => {
//   if (!pm.pokemonRef.individualValues[key] || pm.pokemonRef.individualValues[key] < 0)
//     pm.pokemonRef.individualValues[key] = 0
//   else if (pm.pokemonRef.individualValues[key] > 31)
//     pm.pokemonRef.individualValues[key] = 31
// }

const setEvFromDisplay = (key: StatKeys, event: Event): void => {
  let val = Number((event.target as HTMLInputElement).value)
  val = Math.max(0, Math.min(32, Math.round(val)))
  pm.pokemonRef.effortValues[key] = displayToInternal(val)
}

const setEvZero = (key: StatKeys): void => {
  pm.pokemonRef.effortValues[key] = 0
}

const setEvMax = (key: StatKeys): void => {
  pm.pokemonRef.effortValues[key] = 252
}

const incrementStage = (key: StatKeysWithoutHP) => {
  if (pm.pokemonRef.statStage[key] < 6)
    pm.pokemonRef.statStage[key]++
}

const decrementStage = (key: StatKeysWithoutHP) => {
  if (pm.pokemonRef.statStage[key] > -6)
    pm.pokemonRef.statStage[key]--
}

const resetStage = (key: StatKeysWithoutHP) => {
  pm.pokemonRef.statStage[key] = 0
}

const getStageEffectColor = (key: StatKeys) => {
  if (key === 'hp') return ''
  const stage = pm.pokemonRef.statStage[key]
  return stage > 0 ? 'text-primary' : stage < 0 ? 'text-secondary' : ''
}
</script>

<template>
  <div class="stat-table-scroll">
    <v-table density="comfortable">
      <thead>
        <tr>
          <th class="px-0" />
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
          <td class="text-center">{{ $t('stat.base') }}</td>
          <td v-for="(_, key) in pm.pokemonRef.baseStat" :key="key">
            <input :name="key" type="number" class="py-2 w-75 text-center" :value="pm.pokemonRef.baseStat[key]" disabled>
          </td>
        </tr>
        <tr>
          <td class="text-center">{{ $t('stat.ev') }}<br><span class="font-weight-bold" :class="{ 'text-secondary': getEvRemaining < 0 }">{{ getEvRemaining }}</span></td>
          <td v-for="(_, key) in stats" :key="key">
            <input :value="internalToDisplay(pm.pokemonRef.effortValues[key])" :name="key" type="number" class="py-2 w-75" min="0" max="32" step="1" @change="setEvFromDisplay(key, $event)" :placeholder="key">
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
          <td class="text-center">{{ $t('stat.stat') }}</td>
          <td v-for="(_, key) in pm.pokemonRef.baseStat" :key="key">
            <input :name="key" class="py-2 w-75 text-center pr-lg-3" :value="`${pm.pokemonRef.getStat(key, true)}`" :class="getStageEffectColor(key)" disabled>
          </td>
        </tr>
        <tr>
          <td class="text-center">{{ $t('stat.stage') }}</td>
          <td v-for="(_, key) in stats" :key="key">
            <template v-if="key === 'hp'" />
            <div v-else class="stepper">
              <v-btn icon density="compact" variant="text" size="x-small" :disabled="pm.pokemonRef.statStage[key] <= -6" @click="decrementStage(key)">
                <v-icon size="12">mdi-minus</v-icon>
              </v-btn>
              <span class="stage-val text-subtitle-2" :class="getStageEffectColor(key)" @click="resetStage(key)">
                {{ pm.pokemonRef.statStage[key] > 0 ? `+${pm.pokemonRef.statStage[key]}` : pm.pokemonRef.statStage[key] }}
              </span>
              <v-btn icon density="compact" variant="text" size="x-small" :disabled="pm.pokemonRef.statStage[key] >= 6" @click="incrementStage(key)">
                <v-icon size="12">mdi-plus</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style lang="scss" scoped>
th {
  padding: 0;
  &:first-child {
    width: 52px;
    min-width: 52px;
  }
}

td {
  padding: 0 !important;
  text-align: center;
  white-space: nowrap !important;

  &:first-child {
    padding-left: 4px !important;
    padding-right: 4px !important;
    text-align: left;
    white-space: normal !important;
    width: 52px;
    min-width: 52px;
  }
}

input[type=number] {
  text-align: center;
  color: inherit;
}

input:disabled {
  color: inherit;
}

.stat-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.stepper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.stage-val {
  min-width: 24px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.v-icon {
  cursor: pointer;
  font-weight: bold;
  &.minus { font-size: 9px; }
  &.plus  { font-size: 10px; }
}

.evButton {
  background-color: #0066cc;
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

  &-1 {
    background-color: #CC7F08;
    &:hover  { background-color: #e5940a; }
    &:focus  { background-color: #CC7F08; }
  }
  &-2 {
    background-color: #0066cc;
    &:hover  { background-color: #0071e3; }
    &:focus  { background-color: #0066cc; }
  }
}

table {
  table-layout: fixed !important;
}
</style>
