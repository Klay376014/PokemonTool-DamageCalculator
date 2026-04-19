## 1. 建立 TypeChip 元件

- [x] 1.1 建立 `app/components/TypeChip.vue`，Props 設計：單一 `type` string
- [x] 1.2 在模組層級實作 typeColorMap 放在模組層級（非 reactive），包含所有 19 種屬性色票（含 Stellar）及未知屬性後備色（bg: `#888`，text: `#fff`）
- [x] 1.3 TypeChip 以 Scoped Style 實作 `.type-chip` CSS，樣式與 SelectSheet 現有實作一致
- [x] 1.4 確認 TypeChip renders a styled badge for a Pokémon type：已知屬性顯示正確背景/文字色，未知屬性顯示後備色

## 2. 重構 SelectSheet

- [x] [P] 2.1 從 `SelectSheet.vue` 移除 `typeColorMap` 常數及 `.type-chip` CSS block（SelectSheet uses TypeChip for type display）
- [x] [P] 2.2 將 `<span class="type-chip" :style="...">` 替換為 `<TypeChip :type="md.type" />`，確認視覺效果不變

## 3. 更新 PokemonInfo

- [x] [P] 3.1 閱讀 `app/components/PokemonInfo.vue`，確認 `pm.pokemonRef.types` 的型別與現有屬性顯示方式
- [x] [P] 3.2 以 `<TypeChip v-for="type in pm.pokemonRef.types" :key="type" :type="type" />` 取代純文字，實作 PokemonInfo displays types using TypeChip
