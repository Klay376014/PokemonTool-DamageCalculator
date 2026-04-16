## Context

目前傷害計算面板實作為 `v-navigation-drawer`（`location="right"`），透過 `useNavigationStore().damage` 開關，AppBar 上有計算機按鈕觸發。面板支援多筆結果（addResult）以及 pauseWatch/resumeWatch 功能。

重構目標是簡化互動模型：單一結果、固定顯示、移除手動控制。

## Goals / Non-Goals

**Goals:**
- 底部固定面板取代右側 drawer
- 展開 ~100px，收合後留 24px handle
- 點擊 handle 切換狀態
- 移除 addResult/removeResult、pauseWatch/resumeWatch

**Non-Goals:**
- 不改動左側 condition drawer
- 不支援多筆結果
- 不改動傷害計算邏輯本身

## Decisions

### 使用自訂 fixed div 而非 v-bottom-navigation

`v-bottom-navigation` 設計給導航連結，不適合用作內容面板。改用 `position: fixed; bottom: 0` 的自訂 div，搭配 CSS transition 控制高度，實作彈性較高。

handle 區塊固定 24px，展開後下方 content 區塊顯示原有傷害資訊。

### collapse state 存在 DamageResult 本地 ref

只有 DamageResult 自己需要知道展開/收合狀態，不需要跨元件共享。使用本地 `ref<boolean> isOpen` 即可，無需放進 store。

`useNavigationStore` 的 `damage` state 可同步移除。

### DamageText 移除 index prop 與 emit

原本 `index` prop 用於 removeResult 的 splice 定位。只保留一筆結果後，remove 機制整個移除，`index` prop 與 `remove` emit 一併刪除。

### watchPausable 改為普通 watch

移除 pauseWatch/resumeWatch 後，不再需要 `watchPausable`。改用一般 `watch`（或 `watchEffect`），並清除 `isPause`、`stoppedResult` 相關狀態。

## Risks / Trade-offs

- **底部面板佔用畫面高度** → 展開時頁面主內容需要有足夠的 padding-bottom，避免被面板遮住。須在 `pages/index.vue` 或全域 layout 加上 `pb-[100px]`。
- **手機畫面滾動衝突** → fixed bottom panel 在 iOS Safari 可能與虛擬鍵盤互動，目前不在處理範圍內。
