# Mobile Tab Layout Design

**Date:** 2026-04-12  
**Status:** Approved

## Context

On mobile and tablet screens (< lg breakpoint), the two PokémonCard components in `pages/index.vue` stack vertically (each `cols="12"`), requiring the user to scroll to see the second card. The goal is to replace this with a tab-based interface so both cards are accessible without scrolling. On large screens (≥ lg), the original side-by-side grid layout is preserved.

## Scope

Single file change: `pages/index.vue`

## Design

### Breakpoint Detection

Use Vuetify 3's `useDisplay()` composable to obtain `lgAndUp` (reactive ref, true when viewport ≥ 1280px).

```ts
const { lgAndUp } = useDisplay()
```

### Template Structure

Two conditional blocks using `v-if` / `v-else`:

**Mobile/Tablet (`v-if="!lgAndUp"`):**
- `v-tabs` with `fixed-tabs` (equal-width tabs)
  - Tab 1: `mdi-numeric-1-box` icon + "Pokémon 1" label, `text-primary` colour
  - Tab 2: `mdi-numeric-2-box` icon + "Pokémon 2" label, `text-secondary` colour
- `v-window` bound to the active tab index
  - `v-window-item` for attacker: heading + `<pokemon-card role="attacker" />`
  - `v-window-item` for defender: heading + `<pokemon-card role="defender" />`
- Default active tab: Pokémon 1 (index 0)

**Desktop (`v-else`, ≥ lg):**
- Existing `v-container` → `v-row` → two `v-col cols="12" lg="6"` — unchanged.

### Data Flow

No changes to props, store, or child components. `useDisplay()` is a pure UI concern.

## Verification

1. Resize browser to mobile width (< 1280px) → v-tabs appears, only one card visible at a time, clicking tabs switches between Pokémon 1 and Pokémon 2.
2. Resize to ≥ 1280px → tabs disappear, both cards shown side by side in the original layout.
3. Confirm no regressions in PokémonCard functionality (select, stat, move, item, ability).
