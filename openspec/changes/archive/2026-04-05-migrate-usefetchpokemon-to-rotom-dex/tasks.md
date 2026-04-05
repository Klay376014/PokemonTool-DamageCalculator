## 1. 設定與 Schema 準備

- [x] 1.1 在 `nuxt.config.ts` 新增 private `runtimeConfig.rotomDexBaseUrl`（使用 Nuxt Server Route 作為代理層）
- [x] 1.2 更新 `utils/schema.ts`：新增 `rotomDexFormSchema`（rotomDexFormSchema transforms rotom-dex response to PokemonSchema），移除舊 GQL response schema（pokemonsResponseSchema、舊 pokemonSchema）
- [x] 1.3 確認 `PokemonSchema` 型別從 `rotomDexFormSchema` infer，且不含 `moves` 欄位（moves field is removed from PokemonSchema）

## 2. Server Route

- [x] 2.1 新增 `server/api/pokemon/[name].get.ts`：Server route proxies rotom-dex for Pokemon data，import `rotomDexFormSchema`，呼叫 rotom-dex（使用 Nuxt Server Route 作為代理層，rotomDexBaseUrl 使用 private runtimeConfig）
- [x] 2.2 server route 在 safeParse 失敗時回傳 502（rotom-dex returns invalid response）
- [x] 2.3 確認 `rotomDexBaseUrl` 不暴露至前端（rotomDexBaseUrl is not exposed to frontend）

## 3. Composable 更新

- [x] 3.1 重寫 `composables/useFetchPokemon.ts`，移除 Apollo/GQL，改呼叫 `/api/pokemon/:name`（useFetchPokemon uses Nuxt server route）
- [x] 3.2 確認 cache hit 行為正確（cache hit returns cached value）
- [x] 3.3 確認 cache miss 呼叫 server route 並存入 cache（cache miss fetches from server route）
- [x] 3.4 確認 fetch 錯誤時靜默處理（fetch error is handled silently）

## 4. 元件修改

- [x] 4.1 修改 `components/PokemonSelect.vue`：移除 moves 相關的解構賦值與 `pm.moveList` 賦值

## 5. 測試

- [x] 5.1 新增 `utils/schema.test.ts`，針對 `rotomDexFormSchema` 撰寫單元測試（rotomDexFormSchema 放在 utils/schema.ts）
- [x] 5.2 測試：完整資料轉換（full data transformation）
- [x] 5.3 測試：type 首字大寫（type capitalization）
- [x] 5.4 測試：兩個 types 都存在（both types present）
- [x] 5.5 測試：sprite_url 為 null 時回傳空字串（null sprite URLs）
- [x] 5.6 測試：artwork_url 為 null 時回傳空字串（null artwork URL）
- [x] 5.7 測試：缺少必要欄位時 safeParse 回傳 failure（invalid response fails gracefully）

## 6. Verification

- [x] 6.1 執行 `bun test` 確認所有測試通過
- [x] 6.2 啟動 rotom-dex（`go run ./cmd/server/main.go`）與前端（`bun dev`），驗證 stats、sprite、types、weight 正確顯示
- [x] 6.3 開啟 DevTools Network tab，確認無 `beta.pokeapi.co` 請求，有 `/api/pokemon/:name` 請求，且無直接打 `localhost:8080`
