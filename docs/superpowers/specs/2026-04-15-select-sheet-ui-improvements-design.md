# SelectSheet UI Improvements

**Date:** 2026-04-15  
**File:** `components/SelectSheet.vue`

## Background

The SelectSheet component (a bottom-sheet dialog for selecting Pokemon, moves, abilities, and items) has three visual issues on its current implementation:

1. The search field displays an underline/divider below the input that feels too close to the field.
2. On desktop, the dialog spans the full viewport width, which is too wide.
3. The sheet has no color accents and looks monotonous.

---

## Fix 1 — Remove search field underline

**Problem:** `v-text-field` with `variant="filled"` renders a bottom underline indicator directly below the field.

**Solution:** Change to `variant="outlined"` and add `color="secondary"` so the field renders with an orange border (`#FF9F0A`) instead of a filled background with an underline. The `rounded` and `hide-details` props remain unchanged.

```diff
- variant="filled"
+ variant="outlined"
+ color="secondary"
```

---

## Fix 2 — Constrain desktop dialog width

**Problem:** `v-dialog` uses `width="100%"` which fills the full viewport on desktop, but the page content only spans the Vuetify container width (1280px on `lg`, 1200px on `xl`).

**Solution:** Use `useDisplay()` inside `SelectSheet.vue` to compute a responsive `max-width` for the dialog:

| Breakpoint | Container max-width | Dialog max-width |
|---|---|---|
| `< lg` (mobile/tablet) | fluid | `100%` (unchanged) |
| `lg` (1280–1924px) | 1280px | `1280px` |
| `xl` (≥ 1925px) | 1200px (CSS override) | `1200px` |

Implementation:

```ts
const { lgAndUp, xlAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  if (!lgAndUp.value) return '100%'
  return xlAndUp.value ? '1200px' : '1280px'
})
```

Bind to the dialog:

```diff
- width="100%"
+ width="100%"
+ :max-width="dialogMaxWidth"
```

---

## Fix 3 — Secondary orange color accents

**Color:** `#FF9F0A` (existing `secondary` theme color)

Three elements receive orange accents:

| Element | Current | After |
|---|---|---|
| Handle bar | `rgba(white, 0.18)` | `#FF9F0A` (via CSS class) |
| Search field border | filled underline (removed) | `color="secondary"` → orange border |
| Selected list item | `active-color="primary"` (blue) | `active-color="secondary"` (orange) |

No new colors are introduced — `secondary` is already defined in `plugins/vuetify.ts`.

---

## Scope

All changes are confined to `components/SelectSheet.vue`. No other files need modification.

- No changes to `pages/index.vue`, `plugins/vuetify.ts`, or other components.
- The `active-color` change affects all `listType` values (Pokemon, Move, Ability, Item) equally — this is intentional.
