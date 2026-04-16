## 1. 清理舊架構（Store 與 AppBar）

- [x] 1.1 [P] 從 `stores/navigation.ts` 移除 `damage` state，對應設計決策「collapse state 存在 DamageResult」，不再需要 store 控制面板開關
- [x] 1.2 [P] 從 `components/AppBar.vue` 移除計算機圖示按鈕（`mdi-calculator-variant`），確認「Calculator button removed from AppBar」

## 2. 簡化 DamageText

- [x] 2.1 移除 `DamageText.vue` 的 `pauseWatch`、`resumeWatch` 函式與相關模板 UI（cancel/play icon），對應「Remove pauseWatch and resumeWatch」
- [x] 2.2 移除 `index` prop 與 `remove` emit，對應設計決策「DamageText 移除 index prop 與 emit」以及「Single damage result display」
- [x] 2.3 將 `watchPausable` 改為普通 `watch`，移除 `isPause`、`stoppedResult` 相關 ref，對應設計決策「watchPausable 改為普通 watch」，確認「Damage updates automatically」

## 3. 重構 DamageResult 為底部面板

- [x] 3.1 將 `DamageResult.vue` 的 `v-navigation-drawer` 替換為使用自訂 fixed div（`position: fixed; bottom: 0`），對應設計決策「使用自訂 fixed div 而非 v-bottom-navigation」以及「Fixed bottom panel replaces right drawer」
- [x] 3.2 實作 24px handle bar，加入本地 `ref<boolean> isOpen` 控制收合狀態，對應設計決策「collapse state 存在 DamageResult 本地 ref」以及「Collapsible handle」
- [x] 3.3 移除 `addResult`/`removeResult` 邏輯，只保留單一 `<damage-text>` 實例，確認「Single damage result display」
- [x] 3.4 確認 `Copy damage text` 功能保留，copy icon 仍可寫入剪貼簿

## 4. 版面調整

- [x] 4.1 在 `pages/index.vue` 的主要容器加上 `padding-bottom`（~100px），確保面板展開時不遮住主內容，對應「Panel does not obstruct main content」
