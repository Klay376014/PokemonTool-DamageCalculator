# Mobile Tab Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the vertically-stacked mobile layout with a v-tabs/v-window interface so users can switch between Pokémon 1 and Pokémon 2 without scrolling; the original two-column layout is preserved on large screens.

**Architecture:** Use Vuetify 3's `useDisplay()` composable to get a reactive `lgAndUp` boolean. Wrap the entire template in a conditional: `v-if="!lgAndUp"` renders the tab layout; `v-else` renders the unchanged desktop grid. No child components, stores, or props are touched.

**Tech Stack:** Vue 3, Nuxt 3, Vuetify 3 (`useDisplay`, `v-tabs`, `v-window`, `v-window-item`)

---

### Task 1: Add `useDisplay` and tab state to `pages/index.vue`

**Files:**
- Modify: `pages/index.vue` (script setup block)

- [ ] **Step 1: Replace the empty `<script setup>` block**

Open `pages/index.vue`. The current script block is:

```vue
<script setup lang="ts">
</script>
```

Replace it with:

```vue
<script setup lang="ts">
const { lgAndUp } = useDisplay()
const activeTab = ref<string>('attacker')
</script>
```

`useDisplay` and `ref` are auto-imported by Nuxt/Vuetify — no explicit import statements needed.

- [ ] **Step 2: Verify the dev server still compiles**

```bash
bun run dev
```

Expected: no TypeScript or compilation errors in the terminal. The page should look identical (script changes alone don't affect rendering).

---

### Task 2: Add the mobile tab layout block

**Files:**
- Modify: `pages/index.vue` (template block)

- [ ] **Step 1: Insert the mobile layout before the existing `<v-container>`**

The current template is:

```vue
<template>
  <div>
    <v-container class="mt-4 px-0" :fluid="false">
      ...
    </v-container>
  </div>
</template>
```

Replace the entire `<template>` block with:

```vue
<template>
  <div>
    <!-- Mobile / tablet: tab layout (< lg) -->
    <v-container v-if="!lgAndUp" class="mt-4 px-0" :fluid="false">
      <v-tabs v-model="activeTab" fixed-tabs class="pt-8 mb-2">
        <v-tab value="attacker">
          <v-icon icon="mdi-numeric-1-box" class="text-primary mr-2" />
          Pokémon 1
        </v-tab>
        <v-tab value="defender">
          <v-icon icon="mdi-numeric-2-box" class="text-secondary mr-2" />
          Pokémon 2
        </v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item value="attacker">
          <div class="d-flex flex-column flex-shrink-0 px-0 px-sm-2 px-md-3 mt-4">
            <pokemon-card role="attacker" />
          </div>
        </v-window-item>

        <v-window-item value="defender">
          <div class="d-flex flex-column px-0 px-sm-2 px-md-3 mt-4">
            <pokemon-card role="defender" />
          </div>
        </v-window-item>
      </v-window>
    </v-container>

    <!-- Desktop: original side-by-side layout (>= lg) -->
    <v-container v-else class="mt-4 px-0" :fluid="false">
      <v-row class="pt-8" no-gutters justify="center">
        <v-col cols="12" lg="6" class="px-0 px-sm-2 px-md-3 mb-4 mb-lg-0">
          <div class="d-flex flex-column flex-shrink-0">
            <div class="d-flex align-center text-h4 mb-3 mx-2">
              <v-icon icon="mdi-numeric-1-box" class="text-h5 text-primary mr-3" />
              <p>Pokémon 1</p>
            </div>
            <pokemon-card role="attacker" />
          </div>
        </v-col>

        <v-col cols="12" lg="6" class="px-0 px-sm-2 px-md-3">
          <div class="d-flex flex-column">
            <div class="d-flex align-center text-h4 mb-3 mx-2">
              <v-icon icon="mdi-numeric-2-box" class="text-h5 text-secondary mr-3" />
              <p>Pokémon 2</p>
            </div>
            <pokemon-card role="defender" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
```

- [ ] **Step 2: Verify mobile layout in the browser**

With the dev server running, open DevTools → toggle device toolbar (mobile viewport, e.g. 390px wide).

Expected:
- Two tabs ("Pokémon 1" / "Pokémon 2") appear at the top
- Only one PokémonCard is visible at a time
- Clicking "Pokémon 2" tab switches to the defender card

- [ ] **Step 3: Verify desktop layout in the browser**

Expand the browser to ≥ 1280px wide.

Expected:
- Tabs disappear
- Both PokémonCards appear side-by-side in two equal columns, identical to the original layout

- [ ] **Step 4: Verify PokémonCard functionality is intact**

On both layouts, confirm:
- Pokémon select / search works
- Stats display correctly
- Move, Item, Ability buttons open their respective dialogs/selectors
- Condition expand/collapse toggle works

- [ ] **Step 5: Commit**

```bash
git add pages/index.vue
git commit -m "feat: add v-tabs mobile layout for Pokémon card switching"
```