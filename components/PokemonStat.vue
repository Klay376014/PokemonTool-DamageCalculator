<script setup lang="ts">
const stages = ['+6', '+5', '+4', '+3', '+2', '+1', '0', '-1', '-2', '-3', '-4', '-5', '-6']
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
        <th class="text-center pl-3 pl-md-1">
          Hp
        </th>
        <th class="text-center pl-3 pl-md-1">
          Atk
        </th>
        <th class="text-center pl-3 pl-md-1">
          Def
        </th>
        <th class="text-center pl-3 pl-md-1">
          Spa
        </th>
        <th class="text-center pl-3 pl-md-1">
          Spd
        </th>
        <th class="text-center pl-3 pl-md-1">
          Spe
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
        <td>{{ $t('stat.ev') }}</td>
        <td><input type="number" class="py-2" min="0" max="252" value="252"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="0"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="0"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="252"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="0"></td>
        <td><input type="number" class="py-2" min="0" max="252" value="4"></td>
      </tr>
      <tr>
        <td>{{ $t('stat.stat') }}</td>
        <td><input type="number" class="py-2" min="0" max="300" disabled value="162"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled value="80"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled value="115"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled value="153"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled value="111"></td>
        <td><input type="number" class="py-2" min="0" max="300" disabled value="104"></td>
      </tr>
      <tr>
        <td>{{ $t('stat.stage') }}</td>
        <td />
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details :model-value="stages[6]">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details :model-value="stages[6]">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details :model-value="stages[6]">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details :model-value="stages[6]">
            <template #selection="{ item }">
              <span class="text-subtitle-2">{{ item.value }}</span>
            </template>
          </v-select>
        </td>
        <td>
          <v-select :items="stages" variant="solo" density="compact" flat hide-details :model-value="stages[6]">
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
</style>
