<script setup lang="ts">

</script>

<template>
  <v-table density="comfortable">
    <thead>
      <tr>
        <th class="text-left d-flex align-center">
          <p class="d-none d-sm-block">
            lv
          </p>
        </th>
        <th class="text-center">
          H
        </th>
        <th class="text-center">
          A
        </th>
        <th class="text-center">
          B
        </th>
        <th class="text-center">
          C
        </th>
        <th class="text-center">
          D
        </th>
        <th class="text-center">
          S
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ $t('stat.iv') }}</td>
        <td><v-text-field hide-details type="number" variant="outlined" density="compact" min="0" max="31" /></td>
        <td><v-text-field hide-details type="number" variant="outlined" density="compact" min="0" max="31" /></td>
        <td><v-text-field hide-details type="number" variant="outlined" density="compact" min="0" max="31" /></td>
        <td><v-text-field hide-details type="number" variant="outlined" density="compact" min="0" max="31" /></td>
        <td><v-text-field hide-details type="number" variant="outlined" density="compact" min="0" max="31" /></td>
        <td><v-text-field hide-details type="number" variant="outlined" density="compact" min="0" max="31" /></td>
      </tr>
      <tr>
        <td>{{ $t('stat.ev') }}</td>
        <td>{{ 252 }}</td>
        <td>{{ 0 }}</td>
        <td>{{ 4 }}</td>
        <td>{{ 252 }}</td>
        <td>{{ 0 }}</td>
        <td>{{ 0 }}</td>
      </tr>
      <tr>
        <td>{{ $t('stat.stat') }}</td>
        <td>{{ 162 }}</td>
        <td>{{ 80 }}</td>
        <td>{{ 115 }}</td>
        <td>{{ 153 }}</td>
        <td>{{ 111 }}</td>
        <td>{{ 104 }}</td>
      </tr>
      <tr>
        <td>{{ $t('stat.stage') }}</td>
        <td />
        <td>{{ 0 }}</td>
        <td>{{ 4 }}</td>
        <td>{{ '+2' }}</td>
        <td>{{ 0 }}</td>
        <td>{{ '-1' }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
td {
  padding: 0 !important;
  text-align: center;
}
</style>
