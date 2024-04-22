<!-- eslint-disable vue/no-mutating-props -->
<script lang="ts" setup>
const field = useFieldStore()
const nv = useNavigationStore()
const battleByAttacker = usePokemonBattleStore('attacker')
const battleByDefender = usePokemonBattleStore('defender')

function setWeather() {
  battleByAttacker.battleField.setField({ weather: field.weather === 'None' ? undefined : field.weather })
  battleByDefender.battleField.setField({ weather: field.weather === 'None' ? undefined : field.weather })
}

function setTerrain() {
  battleByAttacker.battleField.setField({ terrain: field.terrain === 'None' ? undefined : field.terrain })
  battleByDefender.battleField.setField({ terrain: field.terrain === 'None' ? undefined : field.terrain })
}

function setRuin() {
  battleByAttacker.battleField.setField({ ruin: field.ruin })
  battleByDefender.battleField.setField({ ruin: field.ruin })
}

function setAura() {
  battleByAttacker.battleField.setField({ aura: field.aura })
  battleByDefender.battleField.setField({ aura: field.aura })
}

function setIsDouble() {
  battleByAttacker.battleField.setField({ isDouble: field.isDouble })
  battleByDefender.battleField.setField({ isDouble: field.isDouble })
}
</script>

<template>
  <v-navigation-drawer
    v-model="nv.condition"
    location="left"
    width="350"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="font-weight-bold mb-1 text-h6">
            {{ $t('field.weather.title') }}
            <span v-if="field.weather !== 'None'" class="text-grey text-subtitle-2 pt-1 pl-4">
              {{ $t(`field.weather.${field.weather}`) }}
            </span>
          </p>
          <v-btn-toggle
            v-model="field.weather"
            rounded="8"
            color="secondary-darken-1"
            density="comfortable"
            variant="elevated"
            mandatory
            @click="setWeather"
          >
            <v-btn value="None">
              -
            </v-btn>
            <v-btn value="Sun">
              <v-icon>mdi-white-balance-sunny</v-icon>
            </v-btn>
            <v-btn value="Rain">
              <v-icon>mdi-weather-pouring</v-icon>
            </v-btn>
            <v-btn value="Sand">
              <v-icon>mdi-grain</v-icon>
            </v-btn>
            <v-btn value="Snow">
              <v-icon>mdi-snowflake</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col cols="12">
          <v-divider class="border-opacity-75" color="grey" />
        </v-col>

        <v-col cols="12">
          <p class="font-weight-bold mb-1 text-h6">
            {{ $t('field.terrain.title') }}
            <span v-if="field.terrain !== 'None'" class="text-grey text-subtitle-2 pt-1 pl-4">
              {{ $t(`field.terrain.${field.terrain}`) }}
            </span>
          </p>
          <v-btn-toggle
            v-model="field.terrain"
            rounded="8"
            color="primary-darken-1"
            density="comfortable"
            variant="elevated"
            mandatory
            @click="setTerrain"
          >
            <v-btn value="None">
              -
            </v-btn>
            <v-btn value="Electric">
              <v-icon>mdi-lightning-bolt</v-icon>
            </v-btn>
            <v-btn value="Grassy">
              <v-icon>mdi-leaf</v-icon>
            </v-btn>
            <v-btn value="Misty">
              <v-icon>mdi-weather-fog</v-icon>
            </v-btn>
            <v-btn value="Psychic">
              <v-icon>mdi-eye-circle</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col cols="12">
          <v-divider class="border-opacity-75" color="grey" />
        </v-col>

        <v-col cols="12">
          <p class="font-weight-bold mb-1 text-h6">
            {{ $t('field.ruin.title') }}
            <template v-if="field.ruin.length > 0">
              <span v-for="ruin in field.ruin" :key="ruin" class="text-grey text-subtitle-2 pt-1 pl-3">
                {{ $t(`field.ruin.${ruin}`) }}
              </span>
            </template>
          </p>
          <v-btn-toggle
            v-model="field.ruin"
            rounded="8"
            color="green-darken-4"
            density="comfortable"
            variant="elevated"
            multiple
            @click="setRuin"
          >
            <v-btn value="Tablets">
              <v-icon>mdi-snail</v-icon>
            </v-btn>
            <v-btn value="Sword">
              <v-icon>mdi-sword</v-icon>
            </v-btn>
            <v-btn value="Vessel">
              <v-icon>mdi-bowl</v-icon>
            </v-btn>
            <v-btn value="Beads">
              <v-icon>mdi-orbit</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col cols="12">
          <v-divider class="border-opacity-75" color="grey" />
        </v-col>

        <v-col cols="12">
          <p class="font-weight-bold mb-1 text-h6">
            {{ $t('field.aura.title') }}
            <template v-if="field.aura.length > 0">
              <span v-for="aura in field.aura" :key="aura" class="text-grey text-subtitle-2 pt-1 pl-3">
                {{ $t(`field.aura.${aura}`) }}
              </span>
            </template>
          </p>
          <v-btn-toggle
            v-model="field.aura"
            rounded="8"
            color="yellow-darken-3"
            density="comfortable"
            variant="elevated"
            multiple
            @click="setAura"
          >
            <v-btn value="Fairy">
              <v-icon>mdi-butterfly</v-icon>
            </v-btn>
            <v-btn value="Dark">
              <v-icon>mdi-eye-circle</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col cols="12">
          <v-divider class="border-opacity-75" color="grey" />
        </v-col>

        <v-col cols="12" class="d-flex justify-center">
          <v-btn-toggle
            model-value="Double"
            rounded="8"
            color="indigo-darken-4"
            density="comfortable"
            variant="elevated"
            mandatory
            @click="setIsDouble"
          >
            <v-btn value="Single" size="large" @click="field.isDouble = false">
              {{ $t('field.Single') }}
            </v-btn>
            <v-btn value="Double" size="large" @click="field.isDouble = true">
              {{ $t('field.Double') }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
