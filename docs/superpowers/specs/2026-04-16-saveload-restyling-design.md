# SaveLoad.vue Restyling Design

**Date:** 2026-04-16  
**Scope:** Visual-only changes to `components/SaveLoad.vue` — no logic or data changes.

---

## Goals

- Apply the Apple-inspired design system (DESIGN.md) to SaveLoad.vue
- Support both `darkMode` and `lightMode` Vuetify themes correctly (no hardcoded colors)
- Achieve visual consistency with other components, especially SelectSheet.vue
- Improve the visual appeal of the pokemon list in the load dialog

---

## Design Decisions

### 1. Trigger Buttons

**Current:** Two small `v-btn` icon-only buttons with hardcoded inline `style="color: #0066cc"` and `style="color: #CC7F08"`. These break when the Vuetify theme changes.

**New:** Two `v-btn` with `variant="outlined"`, text label, and prepend-icon.

| Button | color | variant | prepend-icon | text |
|--------|-------|---------|--------------|------|
| Save | `primary` | `outlined` | `mdi-content-save` | i18n key |
| Load | `secondary` | `outlined` | `mdi-import` | i18n key |

`overwrite.css` already applies `border-radius: 980px !important` to `variant="outlined"` buttons, so the pill shape is automatic.

### 2. Save Dialog (`dialogSave`)

**Current:** `v-card` with `prepend-icon="mdi-content-save"`, plain underline text field, action buttons with no clear visual hierarchy.

**New:**
- Remove `prepend-icon` from `v-card` (cleaner title-only header)
- `v-text-field` → `variant="outlined"` + `color="primary"` (Apple-style outlined input matching DESIGN.md button focus color)
- Close button: `variant="outlined"` (pill via overwrite.css), default color
- Confirm button: `color="primary"` + `variant="flat"` (filled Apple Blue)

### 3. Load Dialog (`dialogLoad`)

**Current:** Each pokemon row is a plain `d-flex` div with no background, small sprite, plain icon buttons for load/delete.

**New:**
- Each row wrapped in a rounded card-like container: `border-radius: 8px`, subtle background (`rgba(var(--v-theme-on-surface), 0.04)`), thin border (`1px solid rgba(var(--v-border-color), 0.08)`)
- Sprite `max-width` increased from 50px → 44px with `border-radius: 8px`
- Load button: `color="primary"` + `variant="tonal"` (blue tinted background)
- Delete button: `color="error"` + `variant="tonal"` (red tinted background)
- Close button: `variant="outlined"` pill
- Import From Paste button: `color="primary"`

### 4. Import From URL Dialog (`dialogImportFromUrl`)

**Current:** `prepend-icon="mdi-arrow-down-bold-hexagon-outline"`, plain text field, `color="primary"` submit button.

**New:**
- Remove `prepend-icon` from `v-card`
- `v-text-field` → `variant="outlined"` + `color="primary"`
- Submit button: `color="primary"` + `variant="flat"`, full width — no change needed

---

## Theme Compatibility

All color assignments use Vuetify theme tokens (`primary`, `secondary`, `error`) rather than hardcoded hex values. The existing `overwrite.css` and Vuetify theme in `plugins/vuetify.ts` handle the visual mapping for both `darkMode` and `lightMode` automatically.

---

## Out of Scope

- No changes to script logic, computed properties, or event handlers
- No icon replacements (`mdi-content-save`, `mdi-import` kept as-is)
- No layout restructuring of dialogs (width, scrollable, etc.)
- No draggable interaction changes
