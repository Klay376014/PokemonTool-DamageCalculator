## Why

目前 Condition 面板位於左側，與 Vuetify 標準的 `v-app-bar-nav-icon` 開啟方式耦合，語義上像是「選單」而非「條件設定」。將面板移至右側並改為電腦版常駐，可讓操作流程更直覺，且充分利用寬螢幕的空間。

## What Changes

- `Navigation.vue` 的 `v-navigation-drawer` 從 `location="left"` 改為 `location="right"`
- 電腦版（lg+）設為 `permanent`，面板常駐顯示；平板與手機維持 overlay 模式，從右側滑入
- `app.vue` 加入 `v-main` 包裹 `NuxtPage`，讓 Vuetify layout 系統能自動縮排主要內容區域
- `AppBar.vue` 的 toggle 按鈕移至右側（append slot），僅在非電腦版顯示，icon 改為 `mdi-tune`
- `stores/navigation.ts` 維持初始值 `false`（permanent 模式下 v-model 不影響顯示）

## Capabilities

### New Capabilities

- `condition-panel`：Condition 面板的響應式行為——電腦版常駐於右側，平板/手機版從右側滑入（overlay）

### Modified Capabilities

（無）

## Impact

- Affected specs: （無）
- Affected code:
  - `app.vue`
  - `components/Navigation.vue`
  - `components/AppBar.vue`
  - `stores/navigation.ts`（若需調整初始值）
  - `pages/index.vue`（container padding 微調）
