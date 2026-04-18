## 1. Phase 1 — 使用兩階段升級策略（相容模式驗證）

- [x] 1.1 在 `nuxt.config.ts` 加入 `future: { compatibilityVersion: 4 }` 開啟相容模式
- [x] 1.2 執行 `nuxt dev`，確認 application runs on Nuxt 4（無 critical 錯誤）
- [x] 1.3 修復相容模式下出現的所有警告與錯誤

## 2. Phase 2 — 升版與依賴更新

- [x] 2.1 [P] 查詢 `@pinia/nuxt` Nuxt 4 相容版本，將 `package.json` 更新至 `^0.10+`（確認 all dependencies are compatible with Nuxt 4）
- [x] 2.2 [P] 查詢 `nuxt-gtag` Nuxt 4 相容版本並更新（確認 all dependencies are compatible with Nuxt 4）
- [x] 2.3 [P] 查詢 `@nuxt/eslint` Nuxt 4 相容版本並更新
- [x] 2.4 確認 `vite-plugin-vuetify` 保留 inline module 寫法在 Nuxt 4 下仍相容，若失效則改為標準方式（使用兩階段升級策略）
- [x] 2.5 將 `nuxt` 升至 `^4.x` 並執行 `bun install`，確認 no peer dependency warnings on install
- [x] 2.6 移除 `nuxt.config.ts` 中的 `future.compatibilityVersion: 4`（正式版已不需要）

## 3. Phase 3 — 目錄重組（directory structure follows Nuxt 4 conventions）

- [x] 3.1 建立 `app/` 目錄
- [x] 3.2 [P] 將 `pages/` 搬移至 `app/pages/`
- [x] 3.3 [P] 將 `components/` 搬移至 `app/components/`
- [x] 3.4 [P] 將 `composables/` 搬移至 `app/composables/`
- [x] 3.5 [P] 將 `plugins/` 搬移至 `app/plugins/`
- [x] 3.6 [P] 將 `assets/` 搬移至 `app/assets/`
- [x] 3.7 [P] 將 `utils/` 搬移至 `app/utils/`
- [x] 3.8 [P] 將 `stores/` 搬移至 `app/stores/`
- [x] 3.9 確認 `server/` 留在根目錄（app layer directories are inside app，server routes are at project root；directory structure follows Nuxt 4 conventions，目錄搬移到 `app/` 子目錄）
- [x] 3.10 確認 `tsconfig.json` 路徑別名（`~/`、`@/`）仍正確指向

## 4. Phase 4 — 驗證與清理

- [x] 4.1 執行 `nuxt dev`，確認 dev server starts without errors
- [x] 4.2 執行 `nuxt build`，確認 production build succeeds
- [x] 4.3 在瀏覽器中開啟應用，確認 Vuetify renders correctly
- [x] 4.4 確認所有 Vuetify 元件樣式與主題正常（application runs on Nuxt 4）
- [x] 4.5 移除 `nuxt.config.ts` 中已棄用的設定項目
