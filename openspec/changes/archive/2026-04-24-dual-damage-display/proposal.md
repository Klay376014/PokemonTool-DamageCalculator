## Why

目前傷害計算面板每次只顯示單一方向（Pokemon1 → Pokemon2），要查看反向傷害需手動按下切換按鈕，反覆操作不便。同時展示雙向傷害，讓玩家一眼掌握對戰局勢。

## What Changes

- `DamageResult.vue` 同時渲染兩組 `<damage-text>`：正向（1→2）與反向（2→1）
- 大螢幕（`lgAndUp`）採水平並排佈局；小螢幕採垂直疊放佈局
- 調整 bottom panel 高度與 `pb-panel` padding，配合雙行顯示
- 移除 `PokemonCard.vue` 中的 swap 按鈕（`mdi-swap-horizontal`）及相關邏輯，雙向同時顯示後已無切換必要

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `damage-bottom-panel`：面板需同時呈現兩個方向的傷害結果，並依螢幕尺寸採用不同佈局

## Impact

- Affected specs: `damage-bottom-panel`
- Affected code:
  - `app/components/DamageResult.vue`
  - `app/components/PokemonCard.vue`
  - `app/composables/useSwapPokemon.ts`（可評估刪除）
  - `app/pages/index.vue`
