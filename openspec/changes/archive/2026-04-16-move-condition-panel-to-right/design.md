## Context

本應用使用 Vuetify 3 + Nuxt 3。目前 `app.vue` 未使用 `v-main`，導致 `v-navigation-drawer` 只能 overlay 內容，無法在 permanent 模式下真正推移主要內容區域。

現有的底部面板（`damage-bottom-panel`）透過 `.pb-panel` class 在 `pages/index.vue` 手動加入 `padding-bottom: 124px` 避免被遮擋。加入 `v-main` 後，需確認此 padding 仍正常生效。

## Goals / Non-Goals

**Goals:**

- Condition 面板移至右側
- 電腦版（lg+）常駐顯示，透過 Vuetify layout 系統自動縮排主內容
- 平板/手機 overlay 模式，從右側滑入，AppBar 右側有 `mdi-tune` toggle 按鈕
- 加入 `v-main` 使 Vuetify layout 正確運作

**Non-Goals:**

- 不改變 Condition 面板的內容或功能
- 不改變 damage-bottom-panel 的行為
- 不改變 PokemonCard 的內部佈局

## Decisions

### 使用 Vuetify v-main 整合 navigation-drawer layout

Vuetify 的 `v-navigation-drawer` 在 `permanent` 模式下需要 `v-main` 才能自動調整內容縮排。手動用 CSS `margin-right` 模擬推移行為雖然可行，但在 drawer width、breakpoint 改變時容易失同步，且不符合 Vuetify 的設計意圖。

**決策**：在 `app.vue` 加入 `v-main` 包裹 `<NuxtPage />`，採用 Vuetify 標準 layout 系統。

### AppBar toggle 按鈕位置與顯示條件

原有漢堡按鈕在 prepend slot（左側），語義上暗示開啟左側選單。移至右側 append slot 並改用 `mdi-tune` icon，同時透過 `v-if="!lgAndUp"` 僅在非電腦版顯示（電腦版 permanent 模式不需手動 toggle）。

**決策**：`v-app-bar-nav-icon` 移除，改在 append slot 加入 `v-btn`（`mdi-tune`，`v-if="!lgAndUp"`）。

### navigation store 初始值

`permanent` 模式下，Vuetify 的 `v-navigation-drawer` 會忽略 `v-model`，直接保持開啟。因此 `nv.condition` 初始值維持 `false` 即可——電腦版 permanent、手機版預設關閉，行為都正確。

**決策**：`stores/navigation.ts` 不需修改。

## Risks / Trade-offs

- **v-main 加入影響 `.pb-panel` padding**：`v-main` 本身會套用 Vuetify 的 layout padding。需驗證現有 `padding-bottom: 124px` 是否仍能正確避開底部面板。若有衝突，在 `pages/index.vue` 調整即可。
  → Mitigation：實作後目視確認底部面板未被遮擋。

- **drawer width 固定 300px**：目前 `Navigation.vue` hardcode `width="300"`，縮排後兩個 PokemonCard 可用空間減少。在標準 1920px 螢幕下問題不大，但需目視確認 lg breakpoint 下版面不過擠。
  → Mitigation：若過擠，可調整 drawer width 或 PokemonCard 的 col 設定。
