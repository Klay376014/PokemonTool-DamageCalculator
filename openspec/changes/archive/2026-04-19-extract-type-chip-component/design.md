## Context

目前 `SelectSheet.vue` 同時承擔清單渲染與屬性顏色邏輯。`typeColorMap`（19 種屬性的背景/文字色對應）與 `.type-chip` 樣式只存在於該檔案中，導致 `PokemonInfo.vue` 無法重用相同樣式，只能以純文字顯示屬性。

## Goals / Non-Goals

**Goals:**

- 建立單一真實來源（single source of truth）的屬性 chip 元件
- 讓 `PokemonInfo.vue` 使用與清單相同的視覺樣式顯示屬性
- 移除 `SelectSheet.vue` 中的重複色票邏輯

**Non-Goals:**

- 不修改色票的顏色值
- 不改動類別徽章（Physical/Special/Status）
- 不影響 TeraSelect 或其他與屬性相關的元件

## Decisions

### TypeChip 以 Scoped Style 實作

將 `.type-chip` CSS 移至 `TypeChip.vue` 的 `<style scoped>`，與元件封裝在一起，避免全域樣式污染。

**Alternatives considered**: 使用全域 CSS class — 不選擇，因為會造成命名衝突風險且難以追蹤。

### typeColorMap 放在模組層級（非 reactive）

色票映射為靜態資料，不需要 Vue 響應式系統。放在 `<script setup>` 外的模組層級可避免每次渲染重新建立物件。

**Alternatives considered**: 使用 `computed` 或 `ref` — 不選擇，靜態資料不需要響應式開銷。

### Props 設計：單一 `type` string

元件只接受 `type: string`，內部查表取得顏色，對外介面最小化。

## Risks / Trade-offs

- [Risk] 若未來新增屬性，需同步更新 `TypeChip.vue` 中的 `typeColorMap` → 緩解：色票已集中管理，比分散在多個元件更易維護
- [Risk] `PokemonInfo.vue` 中屬性資料結構不確定 → 緩解：實作前讀取現有程式碼確認 `pm.pokemonRef.types` 的型別
