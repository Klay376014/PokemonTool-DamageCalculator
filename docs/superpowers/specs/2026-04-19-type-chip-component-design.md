# TypeChip Component Design

## Goal

Extract the Pokémon type chip styling (color map + chip CSS) from `SelectSheet.vue` into a shared `TypeChip.vue` component, then apply it to the Pokémon type display in `PokemonInfo.vue`.

## New Component

**`app/components/TypeChip.vue`**

- Props: `type: string`
- Module-level `typeColorMap: Record<string, { bg: string; textColor: string }>` with all 19 types (18 standard + Stellar)
- Renders `<span class="type-chip" :style="{ background, color }">{{ $t('type.{type}') }}</span>`
- Fallback colors: bg `#888`, text `#fff` for unknown types
- `.type-chip` CSS in `<style scoped>` (same rules as current SelectSheet)

## Changes

### SelectSheet.vue
- Remove `typeColorMap` const (lines ~159–179)
- Remove `.type-chip` CSS block (lines ~405–414)
- Replace `<span class="type-chip" :style="...">` with `<TypeChip :type="md.type" />`

### PokemonInfo.vue
- Replace plain text type display with:
  ```vue
  <TypeChip v-for="type in pm.pokemonRef.types" :key="type" :type="type" />
  ```

## Non-Goals

- No changes to the color values themselves
- No changes to category badges (Physical/Special/Status) in SelectSheet
- No changes to TeraSelect or other type-related components
