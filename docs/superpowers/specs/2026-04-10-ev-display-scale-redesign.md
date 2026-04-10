# EV Display Scale Redesign

## Context

The game updated how effort values (EVs) are presented to players. The old scale (0–252, multiples of 4, total 508) has been replaced with a new surface scale (0–32 integers, total 66). Internally, the stat calculation formula is unchanged — the library `vgc_data_wrapper` still uses the old values. This spec covers updating the UI to show and accept the new scale while keeping internal storage in the old format.

## Conversion Rules

| Display (new) | Internal (old) |
|:---:|:---:|
| 0 | 0 |
| 1 | 4 |
| 2 | 12 |
| n ≥ 2 | 8n − 4 |
| 32 | 252 |

Inverse: `internalToDisplay(v) = v === 0 ? 0 : (v + 4) / 8`

## Decision

Internal `effortValues` storage (0–252 multiples of 4) is **unchanged** — no localStorage migration needed. All conversion happens in the display/input layer only. Conversion logic is centralised in a single utility file imported by the three components that show EV values.

---

## Changes

### 1. New file: `utils/evConversion.ts`

```typescript
export function displayToInternal(display: number): number {
  if (display <= 0) return 0
  return 8 * display - 4
}

export function internalToDisplay(internal: number): number {
  if (internal <= 0) return 0
  return Math.round((internal + 4) / 8)
}
```

### 2. `components/PokemonStat.vue`

**Line 47 — remaining budget:**
```typescript
// Before
return 508 - Object.values(pm.pokemonRef.effortValues).reduce((sum, value) => sum + value, 0)

// After
return 66 - Object.values(pm.pokemonRef.effortValues)
  .reduce((sum, value) => sum + internalToDisplay(value), 0)
```

**Lines 57–64 — replace `checkEv()` with `setEvFromDisplay()`:**
```typescript
const setEvFromDisplay = (key: StatKeys, event: Event): void => {
  let val = Number((event.target as HTMLInputElement).value)
  val = Math.max(0, Math.min(32, Math.round(val)))
  pm.pokemonRef.effortValues[key] = displayToInternal(val)
}
```

**Line 71 — `setEvMax()` unchanged** (still stores 252 internally = display 32).

**Line 120 — input element:**
```vue
<!-- Before -->
<input v-model="pm.pokemonRef.effortValues[key]" min="0" max="252" step="4" @change="checkEv(key)" ...>

<!-- After -->
<input :value="internalToDisplay(pm.pokemonRef.effortValues[key])"
       min="0" max="32" step="1"
       @change="setEvFromDisplay(key, $event)" ...>
```

### 3. `components/SaveLoad.vue`

Lines 154–163 — wrap each `effortValues.*` access with `internalToDisplay()`:

```vue
<!-- Before -->
{{ `H${pokemon.effortValues.hp}` }}
{{ `A${pokemon.effortValues.attack}...` }}
...

<!-- After -->
{{ `H${internalToDisplay(pokemon.effortValues.hp)}` }}
{{ `A${internalToDisplay(pokemon.effortValues.attack)}...` }}
...
```
All 6 stats (hp, attack, defense, specialAttack, specialDefense, speed).

### 4. `components/DamageText.vue`

Four locations where `effortValues[key]` is interpolated into strings:

- Line 117: `attackerPokemon.pokemonRef.effortValues[attacker.atk]`
- Line 119: `defenderPokemon.pokemonRef.effortValues[attacker.atk]`
- Line 208: `defenderPokemon.pokemonRef.effortValues['hp']`
- Line 211: `defenderPokemon.pokemonRef.effortValues[defender.def]`

Each wrapped with `internalToDisplay(...)`.

---

## Verification

1. Enter display value `1` for a stat → internal value is 4 → stat calculation unchanged
2. Enter display value `32` → internal value is 252 → stat calculation at max
3. Sum of all display EVs cannot exceed 66 (remaining counter turns red when negative)
4. SaveLoad card shows e.g. `H32 A1` instead of `H252 A4`
5. Damage detail text shows display-scale EV numbers
6. Old saved configurations load correctly (internal values untouched)
