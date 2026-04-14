# SelectSheet UI Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three visual issues in `components/SelectSheet.vue`: remove the search field underline, constrain dialog width on desktop, and add secondary orange color accents.

**Architecture:** All changes are confined to a single file (`components/SelectSheet.vue`). No new files, no new dependencies. Two changes are template/prop changes; one adds a `computed` using the existing `useDisplay()` Vuetify composable.

**Tech Stack:** Vue 3 (Composition API), Vuetify 3, Nuxt 3. Dev server: `npm run dev`.

---

### Task 1: Constrain desktop dialog width

**Files:**
- Modify: `components/SelectSheet.vue`

- [ ] **Step 1: Add `useDisplay()` import and `dialogMaxWidth` computed**

In the `<script setup>` block, after the existing imports, add:

```ts
const { lgAndUp, xlAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  if (!lgAndUp.value) return '100%'
  return xlAndUp.value ? '1200px' : '1280px'
})
```

`useDisplay` is a Vuetify composable — no import statement needed as it is auto-imported by Nuxt/Vuetify.

- [ ] **Step 2: Bind `dialogMaxWidth` to the dialog**

In the template, find the `<v-dialog>` tag and add `:max-width`:

```diff
  <v-dialog
    v-model="dialog"
    location="bottom"
    width="100%"
+   :max-width="dialogMaxWidth"
    max-height="55vh"
    :scrim="true"
  >
```

- [ ] **Step 3: Verify visually**

Run `npm run dev`, open the app on a wide browser window (≥ 1280px), open any SelectSheet. Confirm the dialog no longer stretches edge-to-edge — it should be centered and roughly as wide as the two Pokemon cards combined.

- [ ] **Step 4: Commit**

```bash
git add components/SelectSheet.vue
git commit -m "fix: constrain SelectSheet dialog width on desktop"
```

---

### Task 2: Replace search field underline with orange outlined border

**Files:**
- Modify: `components/SelectSheet.vue`

- [ ] **Step 1: Change `v-text-field` variant and add color**

Find the `<v-text-field>` inside the `<!-- Search field -->` section and update two props:

```diff
  <v-text-field
    v-model="searchText"
    :placeholder="$t(`choose${listType}`)"
    prepend-inner-icon="mdi-magnify"
-   variant="filled"
+   variant="outlined"
+   color="secondary"
    density="compact"
    hide-details
    autofocus
    clearable
    rounded
  />
```

`variant="outlined"` removes the filled background and bottom underline. `color="secondary"` makes the border and focus ring use `#FF9F0A` (the existing secondary theme color).

- [ ] **Step 2: Verify visually**

In the running dev server, open any SelectSheet. Confirm:
- No underline below the search input
- The search field has a rounded orange border
- The border glows orange when focused

- [ ] **Step 3: Commit**

```bash
git add components/SelectSheet.vue
git commit -m "fix: replace search field underline with orange outlined border"
```

---

### Task 3: Apply orange accents to handle bar and selected item

**Files:**
- Modify: `components/SelectSheet.vue`

- [ ] **Step 1: Update handle bar color in CSS**

Find `.handle-bar` in the `<style scoped>` block and change the background:

```diff
  .handle-bar {
    width: 36px;
    height: 4px;
-   background: rgba(var(--v-theme-on-surface), 0.18);
+   background: rgb(var(--v-theme-secondary));
    border-radius: 2px;
  }
```

- [ ] **Step 2: Update selected item accent color**

Find the `<v-list-item>` in the virtual scroll template and change `active-color`:

```diff
  <v-list-item
    :key="item"
    v-bind="getItemProps(item)"
    density="compact"
    :append-icon="item === currentValue ? 'mdi-check' : undefined"
    :active="item === currentValue"
-   active-color="primary"
+   active-color="secondary"
    @click="selectItem(item)"
  />
```

- [ ] **Step 3: Verify visually**

In the running dev server, open any SelectSheet. Confirm:
- The drag handle at the top is orange
- The currently selected item is highlighted in orange with an orange checkmark

- [ ] **Step 4: Commit**

```bash
git add components/SelectSheet.vue
git commit -m "fix: apply secondary orange accents to SelectSheet handle and selection"
```
