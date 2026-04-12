## Context

目前應用使用 Vuetify 作為 UI 框架，主題以紫色（`#8A4DFF`）與紅色（`#DC3545`）為主色調，透過 `plugins/vuetify.ts` 設定。全域樣式覆寫尚不存在（無 `assets/styles/overwrite.css`）。需在不更動任何元件邏輯的前提下，提升視覺質感至 Apple 設計語言標準。

## Goals / Non-Goals

**Goals:**

- 以 Apple Blue（`#0071e3`）取代攻擊方主色、Apple Orange（`#FF9F0A`）取代防守方配色
- 深色模式背景改為純黑（`#000000`），surface 改為 iOS 系統灰（`#1c1c1e`）
- AppBar 與 Drawer 套用毛玻璃（backdrop-filter blur）效果
- 字型切換至 SF Pro / system font stack，啟用 font smoothing
- 按鈕圓角統一（實色 8px，outlined pill 980px）
- 卡片移除 border，套用 Apple 風格 box-shadow

**Non-Goals:**

- 元件結構、功能邏輯、響應式佈局
- 新增元件或頁面
- i18n、Pinia store、路由結構
- `warning` 顏色（維持紅色 `#FF0000`）

## Decisions

### 實作方式：集中式 CSS 覆寫而非逐元件修改

採用方案二：`plugins/vuetify.ts` 負責顏色 token，`assets/styles/overwrite.css` 負責所有非 Vuetify token 的視覺覆寫（backdrop-filter、border-radius、box-shadow、font）。

**替代方案：** 逐元件在 `.vue` 內寫 scoped style — 散落在多個元件，難以維護與一致性保證。

**結論：** 集中式覆寫易於 diff、回滾成本低、不污染元件邏輯。

### 主題預設值：維持深色模式

`darkMode` 為預設，`lightMode` 的 `dark: true` 屬性為已知 bug，本次維持不動，僅替換顏色 token。

### CSS 載入：nuxt.config.ts 全域注入

在 `nuxt.config.ts` 的 `css` 陣列加入 `~/assets/styles/overwrite.css`，確保覆寫在 Vuetify 預設樣式之後載入。

## Risks / Trade-offs

- **backdrop-filter 瀏覽器支援** → 已加入 `-webkit-backdrop-filter` fallback；不支援的瀏覽器退回半透明背景色，視覺可接受
- **`!important` 覆寫副作用** → 僅針對具體選擇器（`.v-app-bar`、`.v-card`），範圍可控；若未來 Vuetify 升版有衝突需重新審查
- **lightMode `dark: true` bug** → 已記錄為已知問題，不在本次範圍內修復，避免範疇蔓延
