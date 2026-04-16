## 1. Layout 基礎：加入 v-main

- [x] 1.1 在 `app.vue` 中以 `v-main` 包裹 `<NuxtPage />`，整合 使用 Vuetify v-main 整合 navigation-drawer layout
- [x] 1.2 確認 `navigation store 初始值` 維持 `false` 不需修改（permanent 模式下 v-model 不影響顯示）

## 2. Condition 面板響應式行為

- [x] 2.1 [P] 在 `Navigation.vue` 中將 `location` 從 `left` 改為 `right`，實作 condition panel renders on the right side
- [x] 2.2 [P] 在 `Navigation.vue` 加入 `:permanent="lgAndUp"`，實作 condition panel is permanent on desktop
- [x] 2.3 [P] 確認 `Navigation.vue` 在 lg 以下為 overlay 模式（無 permanent），實作 condition panel is collapsible on mobile and tablet

## 3. AppBar toggle 按鈕

- [x] 3.1 移除 `AppBar.vue` 中 prepend slot 的 `v-app-bar-nav-icon`，根據設計決策 AppBar toggle 按鈕位置與顯示條件
- [x] 3.2 在 `AppBar.vue` 的 append slot 加入使用 tune icon 的 toggle 按鈕（`mdi-tune`），並設 `v-if="!lgAndUp"`，實作 condition panel toggle button uses tune icon

## 4. 視覺驗證

- [x] 4.1 確認電腦版（lg+）：面板常駐於右側，主內容自動縮排，`v-main` layout 正確運作
- [x] 4.2 確認平板/手機：面板預設隱藏，tap tune icon 後從右側滑入，tap backdrop 後關閉
- [x] 4.3 確認底部 damage 面板未被 `v-main` 的 padding 影響（`.pb-panel` 仍有效）；電腦版加 `right: 300px` 避免壓在 condition panel 下
- [x] 4.4 確認 lg breakpoint 下兩個 PokemonCard 版面不過擠，若需調整 `pages/index.vue` container padding 則進行微調
