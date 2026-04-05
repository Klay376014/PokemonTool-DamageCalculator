## Why

目前 `useFetchPokemon` 依賴 PokeAPI GraphQL endpoint，但自家後端服務 rotom-dex 提供更可控的資料來源。將資料依賴切換至 rotom-dex，並把 fetch 邏輯移至 Nuxt server 端，可避免暴露後端 URL、消除 CORS 問題，並為未來 server-side cache 做準備。

## What Changes

- 新增 Nuxt server route `GET /api/pokemon/:name`，代理呼叫 rotom-dex REST API
- 移除 `useFetchPokemon` 的 Apollo/GQL 依賴，改呼叫 Nuxt server route
- 將 `rotomDexFormSchema`（Zod）加入 `utils/schema.ts`，取代舊的 GQL response schema
- **BREAKING** 移除 `moves` 欄位（rotom-dex 尚未支援，待後續補回）
- 新增 `runtimeConfig.rotomDexBaseUrl`（server-only）於 `nuxt.config.ts`
- 移除 `PokemonSelect.vue` 中與 moves 相關的程式碼
- 新增 `utils/schema.test.ts` 單元測試

## Capabilities

### New Capabilities

- `pokemon-server-route`: Nuxt server route `/api/pokemon/:name`，代理 rotom-dex，回傳標準化 PokemonSchema

### Modified Capabilities

(none)

## Impact

- 受影響的程式碼：
  - `nuxt.config.ts`
  - `utils/schema.ts`
  - `server/api/pokemon/[name].get.ts`（新增）
  - `composables/useFetchPokemon.ts`
  - `components/PokemonSelect.vue`
  - `utils/schema.test.ts`（新增）
- 移除依賴：`@nuxtjs/apollo`（Apollo 設定本次保留，但 composable 不再使用）
- 新增環境變數：`ROTOM_DEX_BASE_URL`
