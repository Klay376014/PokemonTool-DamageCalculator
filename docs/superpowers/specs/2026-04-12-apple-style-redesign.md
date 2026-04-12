# Apple 風格樣式重設計

**日期：** 2026-04-12
**狀態：** 待實作

## 目標

將現有 Vuetify 主題從紫/紅配色升級為 Apple 風格設計語言，提升視覺質感。保留所有 Vuetify 元件結構與功能，僅更換視覺層。

## 範圍

**包含：**
- Vuetify 主題顏色（`plugins/vuetify.ts`）
- 全域樣式覆寫檔案（`assets/styles/overwrite.css`）
- AppBar 玻璃效果
- 按鈕圓角與顏色
- 卡片陰影與邊框
- 字型設定

**不包含：**
- 元件結構或功能邏輯變更
- 響應式佈局重構
- 新增元件

## 決策記錄

| 項目 | 決定 |
|------|------|
| 實作方式 | 方案二：`vuetify.ts` + 全域 `overwrite.css` |
| 預設主題 | 深色模式（維持現況） |
| 攻擊方顏色 | Apple Blue `#0071e3` |
| 防守方顏色 | Apple Orange `#FF9F0A` |

## 1. 顏色系統

### 深色模式（`darkMode`，預設）

| Token | 舊值 | 新值 | 用途 |
|-------|------|------|------|
| `background` | `#202020` | `#000000` | 頁面背景 |
| `surface` | `#121212` | `#1c1c1e` | 卡片、drawer 背景 |
| `primary` | `#8A4DFF` | `#0071e3` | 攻擊方、主要 CTA |
| `primary-darken-1` | `#533194` | `#0066cc` | AppBar（若不用玻璃效果時的 fallback） |
| `secondary` | `#DC3545` | `#FF9F0A` | 防守方、次要 CTA |
| `secondary-darken-1` | `#C42F3D` | `#CC7F08` | Secondary hover/active 狀態 |
| `warning` | `#FF0000` | `#FF0000` | 不變 |

### 淺色模式（`lightMode`）

| Token | 新值 |
|-------|------|
| `background` | `#f5f5f7` |
| `surface` | `#ffffff` |
| `primary` | `#0071e3` |
| `primary-darken-1` | `#0066cc` |
| `secondary` | `#FF9F0A` |
| `secondary-darken-1` | `#CC7F08` |

> 注意：`lightMode` 的 `dark` 屬性目前為 `true`（看起來是 bug），維持不動，僅更換顏色 token。

## 2. AppBar 玻璃效果

**目標元素：** `.v-app-bar`

```css
.v-app-bar {
  background: rgba(0, 0, 0, 0.82) !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

淺色模式下改為白色玻璃：
```css
.v-theme--lightMode .v-app-bar {
  background: rgba(255, 255, 255, 0.72) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
```

## 3. 字型

**字族：**
```css
:root {
  --apple-font-display: -apple-system, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --apple-font-text:    -apple-system, "SF Pro Text",    "Helvetica Neue", Helvetica, Arial, sans-serif;
}

body, .v-application {
  font-family: var(--apple-font-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, .text-h4, .text-h5, .text-h6 {
  font-family: var(--apple-font-display);
  letter-spacing: -0.28px;
}

.text-body-1, .text-body-2 {
  letter-spacing: -0.224px;
}

.text-caption {
  letter-spacing: -0.12px;
}
```

## 4. 按鈕

```css
/* 實色按鈕 — 8px 圓角 */
.v-btn:not(.v-btn--icon):not(.v-btn--outlined-pill) {
  border-radius: 8px !important;
}

/* Outlined pill（"Learn more" 風格）— 980px 圓角 */
.v-btn--variant-outlined {
  border-radius: 980px !important;
}

/* btn-toggle */
.v-btn-toggle {
  border-radius: 8px !important;
}
```

## 5. 卡片

```css
.v-card {
  border: none !important;
  border-radius: 8px !important;
  box-shadow: rgba(0, 0, 0, 0.22) 3px 5px 30px 0px !important;
}

.v-theme--lightMode .v-card {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 12px !important;
}
```

## 6. Drawer（Navigation & DamageResult）

```css
.v-navigation-drawer {
  background: rgba(28, 28, 30, 0.95) !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.v-theme--lightMode .v-navigation-drawer {
  background: rgba(255, 255, 255, 0.9) !important;
}
```

## 7. 實作步驟

1. 更新 `plugins/vuetify.ts` — 替換所有顏色 token
2. 新增 `assets/styles/overwrite.css` — 包含上述所有 CSS
3. 在 `nuxt.config.ts` 的 `css` 陣列加入 `~/assets/styles/overwrite.css`
4. 驗證深色/淺色模式切換正常
5. 驗證 AppBar 玻璃效果在各瀏覽器顯示正確

## 8. 不改動的部分

- 元件邏輯與 `<script>` 區塊
- i18n / 語言設定
- Pinia store
- 路由結構
- `warning` 顏色（維持紅色）
