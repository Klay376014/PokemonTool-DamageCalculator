## Context

專案目前使用 Nuxt `^3.21.2`，以 SPA 模式（`ssr: false`）運行，只有一個頁面（`pages/index.vue`）。`compatibilityDate` 已設為 `2026-04-05`，沒有 SSR、layouts 目錄或 middleware，是規模小、結構簡單的 Nuxt 應用。

Nuxt 4 的主要破壞性變更是將 app 層目錄結構改放入 `app/` 子目錄，並對部分 composable 行為做調整。

## Goals / Non-Goals

**Goals:**

- 成功升級至 Nuxt 4，確保所有現有功能正常運作
- 依 Nuxt 4 慣例重組目錄結構
- 更新所有相依模組至 Nuxt 4 相容版本
- 不引入任何新功能或行為變更

**Non-Goals:**

- 重構業務邏輯或 UI 元件
- 引入新功能
- 更換狀態管理或路由方案

## Decisions

### 使用兩階段升級策略

先在 Nuxt 3 開啟相容模式（`future.compatibilityVersion: 4`）測試，確認無破壞後再正式升版。

**理由**：直接升版風險較高；相容模式讓我們在不換版本的情況下提前發現問題。

**替代方案**：直接升版 — 風險較高，問題難追溯來源。

### 目錄搬移到 `app/` 子目錄

Nuxt 4 預設 `srcDir: 'app'`，需將以下目錄搬入 `app/`：

```
app/
  assets/
  components/
  composables/
  pages/
  plugins/
  stores/
  utils/
```

`server/`、`public/`、`nuxt.config.ts`、`package.json` 等留在根目錄。

**理由**：符合 Nuxt 4 慣例，未來 `nuxt upgrade` 才不會有路徑混淆。

### `vite-plugin-vuetify` 保留 inline module 寫法

目前 `nuxt.config.ts` 以 inline function 方式掛載 `vite-plugin-vuetify`。確認 Nuxt 4 下此寫法仍有效（預期無問題），若失效則改為標準 Vite plugin 掛載。

## Risks / Trade-offs

- **模組版本不相容** → 在 Phase 1（相容模式）提前發現，升版前修復
- **`vite-plugin-vuetify` 在 Nuxt 4 下失效** → 退回 Nuxt 官方建議的 Vuetify 整合方式
- **路徑別名（`~/`、`@/`）失效** → 搬移後確認 `tsconfig.json` 路徑設定，必要時手動補上

## Migration Plan

1. **Phase 1 — 相容模式驗證**：在 Nuxt 3 加入 `future: { compatibilityVersion: 4 }`，修復所有警告與錯誤
2. **Phase 2 — 升版**：將 `nuxt` 升至 `^4.x`，更新相關模組版本
3. **Phase 3 — 目錄重組**：將 app 層目錄搬入 `app/`，驗證應用正常運作
4. **Phase 4 — 清理**：移除相容性 workaround，確認 `nuxt.config.ts` 無棄用設定

## Open Questions

- `nuxt-gtag` 是否有正式的 Nuxt 4 相容版本？（需查官方 release notes）
- `@pinia/nuxt` `^0.5.5` → 升至哪個版本？（預期需 `^0.10+`）
