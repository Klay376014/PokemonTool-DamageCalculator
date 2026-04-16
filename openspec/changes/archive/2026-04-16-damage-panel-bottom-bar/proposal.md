## Why

傷害計算結果目前放在右側 `v-navigation-drawer`，需要手動點擊 AppBar 按鈕才能看到，使用體驗割裂。將傷害面板移至畫面底部固定顯示，讓計算結果與 Pokémon 設定並存於同一視角，提升操作流暢度。

## What Changes

- 移除 `DamageResult.vue` 的右側 `v-navigation-drawer`，改為固定在畫面底部的可收合面板
- 面板展開高度約 100px，收合後剩 24px 細條 handle，點擊 handle 切換展開/收合
- **BREAKING** 移除 `addResult` / `removeResult`，只保留單一筆傷害結果（固定 attacker → defender）
- **BREAKING** 移除 `DamageText.vue` 的 `pauseWatch` / `resumeWatch` 功能及相關 UI
- 移除 `AppBar` 的計算機圖示按鈕（`mdi-calculator-variant`）
- 移除 `useNavigationStore` 的 `damage` state

## Capabilities

### New Capabilities

- `damage-bottom-panel`: 固定於畫面底部的可收合傷害計算面板，含 handle 切換展開收合

### Modified Capabilities

（none）

## Impact

- Affected code:
  - `components/DamageResult.vue` — 重構為底部面板容器
  - `components/DamageText.vue` — 移除 pause/resume/remove，簡化 props
  - `components/AppBar.vue` — 移除計算機按鈕
  - `stores/navigation.ts` — 移除 `damage` state
