## 1. Vuetify 顏色 Token 更新

- [x] [P] 1.1 更新 `plugins/vuetify.ts`：依設計決策「實作方式：集中式 CSS 覆寫而非逐元件修改」，將 darkMode 的 color tokens 替換為 Apple 設計系統顏色（background `#000000`、surface `#1c1c1e`、primary `#0071e3`、primary-darken-1 `#0066cc`、secondary `#FF9F0A`、secondary-darken-1 `#CC7F08`）；符合規格「Color tokens follow Apple design system」
- [x] [P] 1.2 更新 `plugins/vuetify.ts`：將 lightMode 的 color tokens 替換為 Apple 設計系統顏色（background `#f5f5f7`、surface `#ffffff`、primary `#0071e3`、secondary `#FF9F0A`）；維持「主題預設值：維持深色模式」，保留 lightMode `dark: true` 不動

## 2. 全域 CSS 覆寫檔案

- [x] [P] 2.1 新增 `assets/styles/overwrite.css`：定義 CSS custom properties `--apple-font-display` 與 `--apple-font-text`，套用至 body 與 `.v-application`，啟用 font smoothing；符合規格「Typography uses Apple system font stack」
- [x] [P] 2.2 在 `assets/styles/overwrite.css` 加入 AppBar 玻璃效果樣式（深色 `rgba(0,0,0,0.82)` + `backdrop-filter`、淺色 `rgba(255,255,255,0.72)`、`-webkit-backdrop-filter` fallback）；符合規格「AppBar displays glass morphism effect」
- [x] [P] 2.3 在 `assets/styles/overwrite.css` 加入 Navigation drawer 毛玻璃背景（深色 `rgba(28,28,30,0.95)`、淺色 `rgba(255,255,255,0.9)`、`-webkit-backdrop-filter` fallback）；符合規格「Navigation drawer uses frosted glass background」
- [x] [P] 2.4 在 `assets/styles/overwrite.css` 加入按鈕圓角規則（實色 8px、outlined pill 980px、btn-toggle 8px）；符合規格「Buttons use Apple-style border radius」
- [x] [P] 2.5 在 `assets/styles/overwrite.css` 加入卡片樣式（`border: none`、`border-radius: 8px`、深色 box-shadow `rgba(0,0,0,0.22) 3px 5px 30px`、淺色 box-shadow `rgba(0,0,0,0.08) 0px 2px 12px`）；符合規格「Cards use Apple-style shadow and border」

## 3. Nuxt 設定

- [x] 3.1 更新 `nuxt.config.ts`：在 `css` 陣列加入 `~/assets/styles/overwrite.css`，實現「CSS 載入：nuxt.config.ts 全域注入」；符合規格「Overwrite CSS is globally loaded」

## 4. 驗證

- [x] 4.1 啟動開發伺服器，確認深色模式下 AppBar 玻璃效果、顏色 token、字型、按鈕圓角、卡片陰影均正確顯示
- [x] 4.2 切換至淺色模式，確認顏色 token 與 AppBar 白色玻璃效果正確顯示
- [x] 4.3 在 Safari 瀏覽器確認 `-webkit-backdrop-filter` fallback 正常運作
