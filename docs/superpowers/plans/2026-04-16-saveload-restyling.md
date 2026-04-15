# SaveLoad.vue Restyling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `components/SaveLoad.vue` to match the Apple-inspired design system (DESIGN.md), with full Vuetify light/dark theme support and visual consistency with SelectSheet.vue.

**Architecture:** Pure template/style changes only — zero script logic changes. All color assignments migrate from hardcoded inline styles to Vuetify theme tokens (`primary`, `secondary`, `error`). `overwrite.css` already handles pill border-radius and card shadows globally, so no new CSS classes are needed.

**Tech Stack:** Vue 3, Vuetify 3, `overwrite.css` global theme, MDI icons

---

## File Map

| File | Change |
|------|--------|
| `components/SaveLoad.vue` | Modify template only — 4 areas: trigger buttons, save dialog, load dialog, import URL dialog |

No new files. No script changes.

---

### Task 1: Trigger Buttons

**Files:**
- Modify: `components/SaveLoad.vue` — `<div class="d-flex justify-center">` block (lines 117–120)

**Context:** Currently two `v-btn` icon-only buttons with hardcoded inline `style="color: #0066cc"` and `style="color: #CC7F08"`. These ignore the Vuetify theme. `variant="outlined"` on a `v-btn` gets `border-radius: 980px !important` automatically from `overwrite.css`.

- [ ] **Step 1: Replace trigger button block**

Replace the existing trigger div:
```html
<div class="d-flex justify-center">
  <v-btn icon="mdi-content-save" variant="tonal" class="text-h6" size="40" style="color: #0066cc" @click="openSaveDialog" />
  <v-btn icon="mdi-import" variant="tonal" class="text-h6 pl-1" size="40" style="color: #CC7F08" @click="openLoadDialog" />
</div>
```

With:
```html
<div class="d-flex justify-center ga-2">
  <v-btn
    variant="outlined"
    color="primary"
    size="small"
    prepend-icon="mdi-content-save"
    @click="openSaveDialog"
  >{{ $t('pokemonSave') }}</v-btn>
  <v-btn
    variant="outlined"
    color="secondary"
    size="small"
    prepend-icon="mdi-import"
    @click="openLoadDialog"
  >{{ $t('pokemonLoad') }}</v-btn>
</div>
```

- [ ] **Step 2: Visual check**

Start the dev server (`npm run dev`) and verify:
- Both buttons render as pills (980px radius) via overwrite.css
- Save button is Apple Blue, load button is orange
- Switching theme (darkMode ↔ lightMode) keeps correct colors — no inline overrides

- [ ] **Step 3: Commit**

```bash
git add components/SaveLoad.vue
git commit -m "fix: restyle SaveLoad trigger buttons to outlined pill with theme colors"
```

---

### Task 2: Save Dialog

**Files:**
- Modify: `components/SaveLoad.vue` — `v-dialog v-model="dialogSave"` block (lines 193–219)

**Context:** Current card has `prepend-icon="mdi-content-save"` (the floppy disk icon in the dialog header) and a plain underline text field. Buttons have no visual hierarchy.

- [ ] **Step 1: Replace save dialog block**

Replace:
```html
<v-dialog
  v-model="dialogSave"
  width="350px"
>
  <v-card
    prepend-icon="mdi-content-save"
    :text="$t('pokemonSaveConfirm')"
    :title="$t('pokemonSave')"
  >
  <v-text-field v-model="note" :label="$t('writeNote')"></v-text-field>
    <v-divider />

    <v-card-actions>
      <v-btn
        :text="$t('close')"
        @click="dialogSave = false"
      />
      <v-btn
        color="surface-variant"
        class="ms-auto"
        :text="$t('confirm')"
        variant="flat"
        @click="saveCurrentPokemonSetting"
      />
    </v-card-actions>
  </v-card>
</v-dialog>
```

With:
```html
<v-dialog
  v-model="dialogSave"
  width="350px"
>
  <v-card
    :text="$t('pokemonSaveConfirm')"
    :title="$t('pokemonSave')"
    class="px-2 pb-2"
  >
    <v-card-text class="px-4 pt-0 pb-3">
      <v-text-field
        v-model="note"
        :label="$t('writeNote')"
        variant="outlined"
        color="primary"
        density="compact"
        hide-details
      />
    </v-card-text>
    <v-divider />
    <v-card-actions class="px-4 pt-3">
      <v-btn
        variant="outlined"
        :text="$t('close')"
        @click="dialogSave = false"
      />
      <v-btn
        color="primary"
        variant="flat"
        class="ms-auto"
        :text="$t('confirm')"
        @click="saveCurrentPokemonSetting"
      />
    </v-card-actions>
  </v-card>
</v-dialog>
```

- [ ] **Step 2: Visual check**

Open the save dialog and verify:
- No floppy disk icon in the card title area
- Note field has an outlined border that turns Apple Blue on focus
- Close button renders as a pill (outlined variant → overwrite.css)
- Confirm button is filled Apple Blue

- [ ] **Step 3: Commit**

```bash
git add components/SaveLoad.vue
git commit -m "fix: restyle save dialog — remove prepend-icon, outlined text field, theme buttons"
```

---

### Task 3: Load Dialog — List Items

**Files:**
- Modify: `components/SaveLoad.vue` — inner `<template #item>` block inside `<draggable>` (lines 141–172)

**Context:** Each pokemon row is a raw `d-flex` div. Action buttons use `variant="plain"` with no color context, making them feel low-contrast and hard to distinguish.

- [ ] **Step 1: Restyle pokemon list rows**

Replace the `<template #item>` content:
```html
<template #item="{ element: pokemon, index }">
    <div class="d-flex justify-space-between py-2">
    <v-img
      max-width="50"
      aspect-ratio="1"
      :src="pokemon.sprite"
    >
      <v-tooltip
        v-if="pokemon.note"
        activator="parent"
        location="top"
        >{{ $te(pokemon.note) ? $t(pokemon.note) : pokemon.note }}
      </v-tooltip>
    </v-img>
    <div>
      <p>{{ `H${internalToDisplay(pokemon.effortValues.hp)}` }}</p>
      <p>{{ `C${internalToDisplay(pokemon.effortValues.specialAttack)}${natureOperator(pokemon.nature, 'specialAttack')}` }}</p>
    </div>
    <div>
      <p>{{ `A${internalToDisplay(pokemon.effortValues.attack)}${natureOperator(pokemon.nature, 'attack')}` }}</p>
      <p>{{ `D${internalToDisplay(pokemon.effortValues.specialDefense)}${natureOperator(pokemon.nature, 'specialDefense')}` }}</p>
    </div>
    <div class="mr-4">
      <p>{{ `B${internalToDisplay(pokemon.effortValues.defense)}${natureOperator(pokemon.nature, 'defense')}` }}</p>
      <p>{{ `S${internalToDisplay(pokemon.effortValues.speed)}${natureOperator(pokemon.nature, 'speed')}` }}</p>
    </div>
    <div class="d-flex align-center pb-3">
      <v-btn icon="mdi-import" color="red-lighten-1" variant="plain" class="text-h6 mr-2" size="20" @click="loadSelectedPoekmon(index)" />
      <v-btn icon="mdi-trash-can-outline" variant="plain" class="text-h6" size="20" @click="deleteSelectedPokemon(index)" />
    </div>
  </div>
  </template>
```

With:
```html
<template #item="{ element: pokemon, index }">
  <div class="pokemon-row d-flex align-center justify-space-between px-2 py-2 mb-1">
    <v-img
      max-width="44"
      :aspect-ratio="1"
      :src="pokemon.sprite"
      class="pokemon-sprite flex-grow-0"
    >
      <v-tooltip
        v-if="pokemon.note"
        activator="parent"
        location="top"
      >{{ $te(pokemon.note) ? $t(pokemon.note) : pokemon.note }}</v-tooltip>
    </v-img>
    <div class="ev-col text-caption">
      <p>{{ `H${internalToDisplay(pokemon.effortValues.hp)}` }}</p>
      <p>{{ `C${internalToDisplay(pokemon.effortValues.specialAttack)}${natureOperator(pokemon.nature, 'specialAttack')}` }}</p>
    </div>
    <div class="ev-col text-caption">
      <p>{{ `A${internalToDisplay(pokemon.effortValues.attack)}${natureOperator(pokemon.nature, 'attack')}` }}</p>
      <p>{{ `D${internalToDisplay(pokemon.effortValues.specialDefense)}${natureOperator(pokemon.nature, 'specialDefense')}` }}</p>
    </div>
    <div class="ev-col text-caption">
      <p>{{ `B${internalToDisplay(pokemon.effortValues.defense)}${natureOperator(pokemon.nature, 'defense')}` }}</p>
      <p>{{ `S${internalToDisplay(pokemon.effortValues.speed)}${natureOperator(pokemon.nature, 'speed')}` }}</p>
    </div>
    <div class="d-flex align-center ga-1">
      <v-btn icon="mdi-import" color="primary" variant="tonal" size="28" @click="loadSelectedPoekmon(index)" />
      <v-btn icon="mdi-trash-can-outline" color="error" variant="tonal" size="28" @click="deleteSelectedPokemon(index)" />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Add scoped styles for the new row**

Replace the empty `<style>` block at the bottom of the file:
```html
<style scoped>
.pokemon-row {
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04);
  border: 1px solid rgba(var(--v-border-color), 0.08);
}
.pokemon-sprite {
  border-radius: 6px;
}
.ev-col {
  line-height: 1.5;
  letter-spacing: -0.12px;
  min-width: 32px;
}
</style>
```

- [ ] **Step 3: Visual check**

Open the load dialog with at least one saved pokemon and verify:
- Each row has a subtle rounded background
- Load button is blue-tinted (primary tonal), delete button is red-tinted (error tonal)
- Sprite has rounded corners
- Layout stays aligned and doesn't break on narrow screens

- [ ] **Step 4: Commit**

```bash
git add components/SaveLoad.vue
git commit -m "fix: restyle load dialog list items with card rows and theme-colored action buttons"
```

---

### Task 4: Load Dialog Footer + Import URL Dialog

**Files:**
- Modify: `components/SaveLoad.vue` — load dialog footer (lines 176–190) and import URL dialog (lines 221–247)

**Context:** Load dialog footer buttons have no visual hierarchy. Import URL dialog has a `prepend-icon` and plain text field.

- [ ] **Step 1: Restyle load dialog footer buttons**

Replace:
```html
<v-card-actions>
  <v-btn
    :text="$t('close')"
    @click="dialogLoad = false"
  />
  <v-btn
    :text="$t('importFromPaste')"
    color="primary"
    class="ms-auto"
    @click="dialogImportFromUrl = true"
  />
</v-card-actions>
```

With:
```html
<v-card-actions class="px-2">
  <v-btn
    variant="outlined"
    :text="$t('close')"
    @click="dialogLoad = false"
  />
  <v-btn
    color="primary"
    variant="flat"
    class="ms-auto"
    :text="$t('importFromPaste')"
    @click="dialogImportFromUrl = true"
  />
</v-card-actions>
```

- [ ] **Step 2: Restyle import URL dialog**

Replace:
```html
<v-dialog
  v-model="dialogImportFromUrl"
  width="350px"
>
  <v-card
    prepend-icon="mdi-arrow-down-bold-hexagon-outline"
    :text="$t('pasteUrl')"
    :title="$t('pokemonImport')"
  >
    <form>
      <v-text-field
        label="url"
        v-model="pokePasteUrl"
        clearable
      />

      <v-btn
        @click="importFromUrl"
        :disabled="importing"
        class="w-100"
        color="primary"
      >
        {{ $t('submit')}}
      </v-btn>
    </form>
  </v-card>
</v-dialog>
```

With:
```html
<v-dialog
  v-model="dialogImportFromUrl"
  width="350px"
>
  <v-card
    :text="$t('pasteUrl')"
    :title="$t('pokemonImport')"
    class="px-2 pb-2"
  >
    <v-card-text class="px-4 pt-0 pb-3">
      <v-text-field
        label="url"
        v-model="pokePasteUrl"
        variant="outlined"
        color="primary"
        density="compact"
        hide-details
        clearable
      />
    </v-card-text>
    <v-card-actions class="px-4 pt-0">
      <v-btn
        @click="importFromUrl"
        :disabled="importing"
        class="w-100"
        color="primary"
        variant="flat"
      >
        {{ $t('submit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
```

- [ ] **Step 3: Visual check**

Verify both:
- Load dialog footer: close is a pill outline, import is filled blue
- Import URL dialog: no prepend-icon, URL field has outlined border, submit button is full-width filled blue

- [ ] **Step 4: Commit**

```bash
git add components/SaveLoad.vue
git commit -m "fix: restyle load dialog footer and import URL dialog to match design system"
```
