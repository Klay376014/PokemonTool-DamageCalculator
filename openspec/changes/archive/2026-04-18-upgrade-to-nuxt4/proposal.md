## Why

Nuxt 4 帶來更清晰的目錄結構、更好的效能與模組相容性。現在升級可確保專案長期維護性，並趁專案仍小（單頁 SPA）時以最低成本完成遷移。

## What Changes

- 升級 `nuxt` 套件至 `^4.x`
- 將 app 層檔案移入 `app/` 子目錄（`pages/`、`components/`、`composables/`、`plugins/`、`assets/`、`utils/`、`stores/`）
- 更新 `@pinia/nuxt`、`nuxt-gtag`、`@nuxt/eslint` 等模組至 Nuxt 4 相容版本
- 調整 `nuxt.config.ts` 設定（移除已棄用選項、確認 `compatibilityDate`）
- 確認 `vite-plugin-vuetify` 的 Nuxt 4 相容性

## Capabilities

### New Capabilities

（無，這是純升級 / 重構，不引入新功能）

### Modified Capabilities

（無需修改現有 spec 的行為需求）

## Impact

- **Affected code**:
  - `nuxt.config.ts` — 設定調整
  - `package.json` — 依賴版本更新
  - `pages/`, `components/`, `composables/`, `plugins/`, `assets/`, `utils/`, `stores/` → 搬移至 `app/` 子目錄
  - `server/` — 留在根目錄，無需搬移
  - `tsconfig.json` — 若路徑別名需更新
- **Dependencies**: `nuxt ^4.x`、`@pinia/nuxt ^0.10+`、`nuxt-gtag`（需確認版本）、`@nuxt/eslint`（需確認版本）
