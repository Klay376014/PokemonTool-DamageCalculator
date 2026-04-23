## Context

目前 `DamageResult.vue` 只放一個 `<damage-text :pokemon="['attacker', 'defender']" />`，顯示 Pokemon1→Pokemon2 的傷害。使用者若想查看反向傷害，必須點擊 `PokemonCard.vue` 的 swap 按鈕互換雙方，反覆切換操作不便。

`DamageText` 元件接收 role 字串陣列（`pokemon[0]` 為攻擊方、`pokemon[1]` 為防守方），各 store 以 role name 為 key 獨立運作，因此傳入 `['defender', 'attacker']` 即可正確計算反向傷害。

## Goals / Non-Goals

**Goals:**

- 同時顯示 1→2 與 2→1 兩條傷害結果
- 大螢幕（`lgAndUp`）水平並排；小螢幕垂直疊放
- 移除 swap 按鈕及其相關邏輯（composable import、computed）
- 調整 panel 高度與主頁 bottom padding 以配合新佈局

**Non-Goals:**

- 不更動計算邏輯（store、battleField 等）

## Decisions

### 新增第二個 DamageText（['defender', 'attacker']）

在 `DamageResult.vue` 加入第二個 `<damage-text :pokemon="['defender', 'attacker']" />`。

**理由**：`DamageText` 的所有 store 都以 role name 為 key，傳入反向陣列即自動對應到正確的計算，無需任何新邏輯。

**替代方案**：修改 `DamageText` 內部同時計算雙向 → 破壞元件職責單一性，不採用。

### DamageText 新增 showSprites / direction props

為 `DamageText.vue` 加入 `showSprites?: boolean` 與 `direction?: 'forward' | 'reverse'` props。

- `showSprites=false`：隱藏 sprite 列，改在傷害文字前顯示小型方向箭頭
- `direction`：控制箭頭圖示（`mdi-arrow-right-bold` / `mdi-arrow-left-bold`）與顏色（primary / secondary）
- 桌面版 sprite 列中的箭頭也依 `direction` 顯示對應顏色（primary for forward, secondary for reverse）

### 行動版共用 Sprite 列

行動版 `DamageResult.vue` 在兩條傷害文字之間插入單一共用 sprite 列（`usePokemonDataStore('attacker'/'defender')`），兩側 `DamageText` 傳入 `showSprites=false`，以減少重複元素並縮小面板高度。

佈局順序：正向傷害（1→2）→ 共用 sprites → 反向傷害（2→1）。以 CSS `order` 控制排列，不依賴 DOM 順序。

### 使用 CSS display 而非 Vuetify d-flex class

`v-show` 以 inline style `display: none` 控制可見性，但 Vuetify utility class `d-flex` 帶有 `display: flex !important`，會蓋過 `v-show`，導致面板無法收合。

**解法**：`display: flex` 保留在 scoped CSS（無 `!important`），`:class` 只用來切換 `flex-row` / `flex-column`（flex-direction，不影響 v-show）。

### 響應式佈局高度

- `lgAndUp`：`flex-row`，content 高度 100px，各欄對齊 center
- `< lg`：`flex-column`，content 高度 115px（48px sprite 列 + 2×~33px 傷害列）

### 調整 pb-panel padding（響應式）

`index.vue` 的 `pb-panel`：
- `< lg`：155px（115px content + 24px handle + ~16px margin）
- `lgAndUp`：124px（不變）

### 移除 swap 按鈕

從 `PokemonCard.vue` 移除：
- `<v-btn icon="mdi-swap-horizontal" .../>` template 節點
- `useSwapPokemon` import 及 `swap` 解構
- `canSwap` computed
- `attackerData`、`defenderData` store（僅用於 `canSwap`）

`app/composables/useSwapPokemon.ts` 無其他引用，一併刪除。

## Risks / Trade-offs

- [反向計算的 conditionStore] 使用 `useConditionStore('defender')`，即 Pokemon2 作為攻擊方的條件。屬預期行為，Pokemon2 的攻擊條件本來就應由其自己的 conditionStore 管理。
- [Panel 高度硬編碼] 高度值（100px / 115px）直接寫在 CSS → 簡單且現行做法一致。
- [移除 swap 後無法快速對調] 雙向同時顯示後已無切換必要；若未來需要對調完整資料可另行評估。
