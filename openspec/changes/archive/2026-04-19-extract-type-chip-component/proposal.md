## Why

`SelectSheet.vue` 中的寶可夢屬性色票（typeColorMap）與 `.type-chip` 樣式目前是硬編碼的，無法在其他元件（如 `PokemonInfo.vue`）中重用。將其提取為獨立的 `TypeChip.vue` 共用元件，可消除重複並建立一致的屬性顯示標準。

## What Changes

- 新增 `app/components/TypeChip.vue`，包含所有 19 種屬性的色票映射與 chip 樣式
- `SelectSheet.vue` 移除 `typeColorMap` 常數與 `.type-chip` CSS，改用 `<TypeChip>` 元件
- `PokemonInfo.vue` 以 `<TypeChip>` 取代純文字的屬性顯示

## Capabilities

### New Capabilities

- `type-chip-component`: 可重用的寶可夢屬性 chip 元件，支援所有 19 種屬性的色票顯示與未知屬性的後備顏色

### Modified Capabilities

（無）

## Impact

- 影響的程式碼：
  - `app/components/TypeChip.vue`（新增）
  - `app/components/SelectSheet.vue`（移除 typeColorMap 與 .type-chip CSS）
  - `app/components/PokemonInfo.vue`（改用 TypeChip 元件）
