## Context

目前 `useFetchPokemon` composable 直接從瀏覽器端呼叫 PokeAPI GraphQL endpoint（`https://beta.pokeapi.co/graphql/v1beta`），搭配 `@nuxtjs/apollo`。rotom-dex 是自家 Go + Gin 後端服務，資料更可控，但其 URL 不應暴露至前端。

現況限制：
- GQL endpoint 為 public beta，穩定性無法保證
- Apollo client 在 browser 端發出請求，rotom-dex URL 若換過來也會暴露
- Moves 資料 rotom-dex 尚未支援

## Goals / Non-Goals

**Goals:**

- 將資料來源切換至 rotom-dex REST API
- Fetch 邏輯移至 Nuxt server route，隱藏 rotom-dex URL
- 移除 moves 欄位（暫時）
- 為 server-side cache 做準備（本次不實作，架構上預留）
- 新增 `rotomDexFormSchema` 單元測試

**Non-Goals:**

- 移除 Apollo / gql 設定檔（保留，不在本次範圍）
- 實作 server-side cache
- 補回 moves 功能

## Decisions

### 使用 Nuxt Server Route 作為代理層

將 fetch 改由 `server/api/pokemon/[name].get.ts` 處理，而非在 composable 直接呼叫 rotom-dex。

**理由**：
- rotom-dex URL 保持 server-only，不暴露給前端
- 避免 CORS 設定
- 未來可在此層加入 cache 邏輯

**替代方案**：直接在 composable 呼叫 rotom-dex → 拒絕，因 URL 會暴露、需處理 CORS。

### rotomDexFormSchema 放在 utils/schema.ts

Zod schema 定義集中於 `utils/schema.ts`，server route import 此 schema。

**理由**：
- 不依賴 Nuxt runtime，可直接以 Vitest 進行單元測試
- schema 與 server route 分離，職責清晰

**替代方案**：schema 放在 server route 檔案內 → 拒絕，因無法單獨測試。

### rotomDexBaseUrl 使用 private runtimeConfig

`rotomDexBaseUrl` 放在 `runtimeConfig`（非 `public`），確保僅 server 端可存取。

## Risks / Trade-offs

- [Risk] rotom-dex 尚未支援 moves，移除後功能缺失 → 已知取捨，待 rotom-dex 支援後補回
- [Risk] rotom-dex 服務不穩定時，Nuxt server route 會回傳 502 → 目前不加 fallback，行為明確
- [Risk] `ssr: false` 模式下 server route 仍正常，但需確認部署環境 → 本機與 Vercel 均已驗證可行

## Migration Plan

1. 修改 `nuxt.config.ts`，新增 `runtimeConfig.rotomDexBaseUrl`
2. 更新 `utils/schema.ts`，新增 `rotomDexFormSchema`，移除舊 GQL schema
3. 新增 `server/api/pokemon/[name].get.ts`
4. 重寫 `composables/useFetchPokemon.ts`（移除 Apollo，改呼叫 server route）
5. 修改 `components/PokemonSelect.vue`（移除 moves 相關程式碼）
6. 新增 `utils/schema.test.ts`

Rollback：git revert 本次所有變更即可恢復 GQL 版本。

## Open Questions

- rotom-dex 是否會在 production 部署前提供穩定端點？（目前假設 `localhost:8080`）
