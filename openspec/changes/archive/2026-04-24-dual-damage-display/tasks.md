## 1. 移除 Swap 按鈕

- [x] [P] 1.1 從 `PokemonCard.vue` 移除 swap button（`mdi-swap-horizontal`）template 節點，實現「Swap button removed from PokémonCard」需求
- [x] [P] 1.2 從 `PokemonCard.vue` 移除 `useSwapPokemon` import、`swap` 解構、`canSwap` computed 及 `attackerData`、`defenderData` store 宣告
- [x] [P] 1.3 刪除 `app/composables/useSwapPokemon.ts`（確認無其他引用後刪除，對應「新增第二個 DamageText（['defender', 'attacker']）」設計中的 cleanup）

## 2. DamageResult 雙向顯示

- [x] 2.1 在 `DamageResult.vue` 加入第二個 `<damage-text :pokemon="['defender', 'attacker']" />`，實現「Single damage result display」→ 雙向同時顯示的需求
- [x] 2.2 依 `lgAndUp` 切換 flex-row / flex-column 佈局：大螢幕水平並排（實現「Responsive layout on large viewport」），小螢幕垂直疊放（實現「Responsive layout on small viewport」）
- [x] 2.3 調整 `.damage-content` CSS：大螢幕 100px、小螢幕 115px（對應「響應式佈局高度」設計決策）
- [x] 2.4 為 `DamageText.vue` 新增 `showSprites` 與 `direction` props：`showSprites=false` 隱藏 sprite 列並顯示方向箭頭；`direction` 控制箭頭圖示與顏色（primary / secondary），含桌面版 sprite 列箭頭（對應「DamageText 新增 showSprites / direction props」設計決策）
- [x] 2.5 在 `DamageResult.vue` 行動版加入共用 sprite 列，兩個 `DamageText` 傳入 `showSprites=lgAndUp`；以 CSS `order` 實現 forward→sprites→reverse 排列（對應「行動版共用 Sprite 列」設計決策）；`display: flex` 保留在 scoped CSS 而非 Vuetify `d-flex` class，以避免 `v-show` 被 `!important` 覆蓋（對應「使用 CSS display 而非 Vuetify d-flex class」設計決策）

## 3. 主頁 Padding 調整

- [x] 3.1 在 `index.vue` 為手機版 `pb-panel` 調整 bottom padding（155px），大螢幕維持 124px（對應「調整 pb-panel padding（響應式）」設計決策）
