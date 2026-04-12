## Why

現有 Vuetify 主題使用紫/紅配色，視覺質感不夠精緻。透過引入 Apple 設計語言（顏色系統、玻璃效果、字型、圓角規範），可以在不更動任何元件結構或功能邏輯的前提下，大幅提升整體 UI 的現代感與一致性。

## What Changes

- 更新 `plugins/vuetify.ts`：替換深色與淺色模式的所有顏色 token（background、surface、primary、secondary 等）為 Apple 風格色彩
- 新增 `assets/styles/overwrite.css`：包含 AppBar 玻璃效果、字型設定、按鈕圓角、卡片陰影、Drawer 毛玻璃效果
- 更新 `nuxt.config.ts`：將 `overwrite.css` 加入全域 CSS 陣列

## Capabilities

### New Capabilities

- `apple-visual-theme`: 定義 Apple 風格的視覺設計系統，包含顏色 token、字型規範、元件視覺覆寫（AppBar 玻璃效果、按鈕圓角、卡片陰影、Drawer 毛玻璃）

### Modified Capabilities

(none)

## Impact

- Affected specs: `apple-visual-theme`（新建）
- Affected code:
  - `plugins/vuetify.ts`
  - `assets/styles/overwrite.css`（新增）
  - `nuxt.config.ts`
