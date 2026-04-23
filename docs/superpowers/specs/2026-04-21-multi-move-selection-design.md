# Multi-Move Selection — Design Spec

**Date:** 2026-04-21  
**Status:** Approved

---

## Problem

The current move selector is single-select: picking a new move immediately replaces the previous one. When a user wants to compare damage across multiple moves (e.g., Moonblast vs. Fire Blast vs. Psyshock), they must reopen the picker every time. This is slow and breaks flow.

---

## Goal

Allow the user to pre-load up to 4 moves in one session, then instantly switch which move is used for damage calculation by tapping a chip — no reopening the picker required.

---

## UX Flow

1. **Tap the move trigger (›)** → bottom sheet opens in multi-select mode
2. **Checkbox each move**, max 4. Counter shows "X / 4". Items beyond 4 are disabled.
3. **Tap 確定** → sheet closes. Card displays the selected moves as chips.
4. **Tap a chip** → that move becomes active (highlighted blue), damage recalculates instantly.
5. **Tap › again** → sheet reopens with current selection pre-checked for editing.

---

## Data Model

### `pokemonData.ts` store additions

| Field | Type | Default | Description |
|---|---|---|---|
| `activeMoveIndex` | `Ref<number>` | `0` | Index into `pokemonRef.moves[]` currently used for damage calc |

- `pokemonRef.moves: string[]` already exists and supports multiple entries — no change needed to the Pokemon class.
- `activeMoveIndex` resets to `0` whenever `pokemonRef.moves` is updated (on selection confirm and on default move set).

---

## Component Changes

### `SelectSheet.vue`

**Trigger area (Move type):**
- Replace the single `displayLabel` row with a chip grid showing all selected moves.
- Each chip: `TypeChip` + move name. Active chip (index === `activeMoveIndex`) gets blue border + tinted background.
- Tapping a chip calls `pm.activeMoveIndex = i` (`@click.stop` to prevent opening the sheet).
- `›` arrow opens the picker as before.

**Sheet interior (Move type):**
- Items use `@click="toggleMove(item)"` instead of `selectItem`.
- Checkbox icon: `mdi-checkbox-marked` (blue) when selected, `mdi-checkbox-blank-outline` (dim) when not.
- Items are pointer-events disabled when 4 are already selected and the item is not selected.
- Header area shows counter `X / 4` and a **確定** button (disabled when 0 selected).
- Closing via 確定 commits `pm.pokemonRef.moves = [...selectedMoves]` and resets `pm.activeMoveIndex = 0`.
- ESC / backdrop tap dismisses without saving (existing `closeSheet` behavior).

**Other list types (Pokemon / Ability / Item):**  
No changes — existing single-select behavior preserved.

### `DamageText.vue`

- Read active move: `pokemonRef.moves[activeMoveIndex] ?? pokemonRef.moves[0]`
- Add `() => attackerPokemon.activeMoveIndex` to the `watch` source array so switching chips triggers recalculation.

---

## i18n

Add key `confirm` if missing in locale files (`app/locales/en.json`, `app/locales/ja.json`, `app/locales/zh.json`):
```json
"confirm": "確定"
```

---

## Edge Cases

| Case | Behaviour |
|---|---|
| Pokemon changes | `setDefaultSelection` sets `moves = [defaultMove]` and `activeMoveIndex = 0` |
| All moves removed in picker | 確定 disabled; user must keep ≥ 1 |
| `activeMoveIndex` points to removed slot | Guarded by `?? moves[0]` fallback |
| Only 1 move selected | No chip switching needed; works identically to current behaviour |

---

## Files Modified

| File | Change |
|---|---|
| `app/stores/pokemonData.ts` | Add + export `activeMoveIndex` ref; reset on move set |
| `app/components/SelectSheet.vue` | Multi-select mode for Move type; new trigger display; confirm button |
| `app/components/DamageText.vue` | Use `activeMoveIndex`; add to watch deps |
| `app/locales/*.json` | Add `confirm` key if missing |
