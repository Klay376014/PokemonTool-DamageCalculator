# 將 useFetchPokemon 從 GQL 改成打 rotom-dex REST API

## Context

目前 `useFetchPokemon` composable 使用 PokeAPI 的 GraphQL endpoint (`https://beta.pokeapi.co/graphql/v1beta`) 搭配 `@nuxtjs/apollo`。
rotom-dex 是自家的 Go + Gin 後端服務，提供更可控的 Pokemon 資料來源，目標是把資料依賴切換到這個服務。
Moves 資料 rotom-dex 目前尚未支援，本次先移除 moves 功能。

fetch 改做在 **Nuxt server 端**：好處是 rotom-dex URL 不暴露給前端、不需處理 CORS、之後可在 server 加 cache。

---

## 架構

```
瀏覽器
  → GET /api/pokemon/:name  (Nuxt Server Route)
    → GET /api/v1/pokemon/forms/:name  (rotom-dex)
```

---

## 資料對照

| PokemonSchema 欄位 | GQL 來源 | rotom-dex 來源 |
|---|---|---|
| `name` | `pokemon_v2_pokemon.name` | `data.form_name` |
| `weight` | `weight / 10`（hectogram→kg）| `data.weight`（已是 kg，不需換算）|
| `stats.hp` | `pokemon_v2_pokemonstats[0]` | `data.hp` |
| `stats.attack` | `[1]` | `data.attack` |
| `stats.defense` | `[2]` | `data.defense` |
| `stats.specialAttack` | `[3]` | `data.sp_attack` |
| `stats.specialDefense` | `[4]` | `data.sp_defense` |
| `stats.speed` | `[5]` | `data.speed` |
| `sprite.front_default` | `pokemon_v2_pokemonsprites[0].sprites.front_default` | `data.sprite_url` |
| `sprite.artwork` | — | `data.artwork_url` |
| `types` | `pokemon_v2_pokemontypes[].name`（首字大寫）| `[primary_type, secondary_type].filter(Boolean)`（首字大寫）|
| `moves` | 有 | **移除**（待 rotom-dex 支援後補）|

---

## 修改檔案清單

### 1. `nuxt.config.ts`

新增 private `runtimeConfig.rotomDexBaseUrl`（server-only，不放 `public`）：

```ts
runtimeConfig: {
  rotomDexBaseUrl: process.env.ROTOM_DEX_BASE_URL || 'http://localhost:8080'
}
```

`ssr: false` 不動，Nuxt server route 在 `ssr: false` 下仍正常運作。

### 2. `utils/schema.ts`

- 移除 `pokemonsResponseSchema` 和舊 `pokemonSchema`（GQL 格式）
- 新增 `rotomDexFormSchema`（放這裡方便單元測試，server route import 此 schema）
- `PokemonSchema` 改從此 schema infer：

```ts
export const rotomDexFormSchema = z.object({
  success: z.boolean(),
  data: z.object({
    form_name: z.string(),
    weight: z.number(),
    hp: z.number(),
    attack: z.number(),
    defense: z.number(),
    sp_attack: z.number(),
    sp_defense: z.number(),
    speed: z.number(),
    sprite_url: z.string().nullable().catch(''),
    artwork_url: z.string().nullable().catch(''),
    primary_type: z.string(),
    secondary_type: z.string().nullable(),
  }).transform(({ form_name, weight, hp, attack, defense, sp_attack, sp_defense, speed, sprite_url, artwork_url, primary_type, secondary_type }) => ({
    name: form_name,
    weight,
    stats: { hp, attack, defense, specialAttack: sp_attack, specialDefense: sp_defense, speed },
    sprite: { front_default: sprite_url ?? '', artwork: artwork_url ?? '' },
    types: [primary_type, secondary_type]
      .filter((t): t is string => t !== null)
      .map(t => t.charAt(0).toUpperCase() + t.slice(1)),
  }))
}).transform(r => r.data)

export type PokemonSchema = z.infer<typeof rotomDexFormSchema>
```

（`moves` 欄位自動消失）

### 3. `server/api/pokemon/[name].get.ts`（新增）

import schema、打 rotom-dex、回傳轉換後資料：

```ts
import { rotomDexFormSchema } from '~/utils/schema'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  const config = useRuntimeConfig()

  const raw = await $fetch(`${config.rotomDexBaseUrl}/api/v1/pokemon/forms/${name}`)
  const parsed = rotomDexFormSchema.safeParse(raw)
  if (!parsed.success) {
    throw createError({ statusCode: 502, message: 'Invalid response from rotom-dex' })
  }

  return parsed.data
})
```

### 4. `composables/useFetchPokemon.ts`

移除 GQL，改呼叫 Nuxt server route，邏輯大幅簡化：

```ts
import { Cache } from '~/utils/cache'

const pokemonCache = new Cache<string, PokemonSchema>()

export default async function (pokemon: string): Promise<PokemonSchema | void> {
  try {
    const cached = pokemonCache.get(pokemon)
    if (cached.success) return cached.value

    const data = await $fetch<PokemonSchema>(`/api/pokemon/${pokemon}`)
    pokemonCache.set(pokemon, data)
    return data
  }
  catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}
```

### 5. `components/PokemonSelect.vue`

兩處修改：

```ts
// Line 51 — 移除 moves
const { stats, types, sprite, weight } = r

// Line 67 — 移除整行
pm.moveList = moves.map(move => move.pokemon_v2_move.name)  // 刪除
```

---

## 測試

### `utils/schema.test.ts`（新增）

`rotomDexFormSchema` 是純 Zod 轉換，不依賴 Nuxt，可直接單元測試。

**測試情境：**

```ts
import { describe, expect, it } from 'vitest'
import { rotomDexFormSchema } from './schema'

const baseInput = {
  success: true,
  data: {
    form_name: 'pikachu',
    weight: 6.0,
    hp: 35, attack: 55, defense: 40,
    sp_attack: 50, sp_defense: 50, speed: 90,
    sprite_url: 'https://example.com/pikachu.png',
    artwork_url: 'https://example.com/pikachu-art.png',
    primary_type: 'electric',
    secondary_type: null,
  }
}

describe('rotomDexFormSchema', () => {
  it('正確轉換完整資料', () => { ... })
  it('secondary_type 為 null 時，types 只有一個元素', () => { ... })
  it('兩個 types 都存在時正確首字大寫', () => { ... })
  it('sprite_url 為 null 時，front_default 為空字串', () => { ... })
  it('artwork_url 為 null 時，artwork 為空字串', () => { ... })
  it('缺少必要欄位時 safeParse 回傳 failure', () => { ... })
})
```

---

## 不動的部分

- `nuxt.config.ts` 的 Apollo 設定暫時保留
- `gql/` 目錄暫時保留
- `utils/cache.ts` 不動

---

## Verification

1. 啟動 rotom-dex：在 `~/Coding/PokemonTool/rotom-dex` 執行 `go run ./cmd/server/main.go`
2. 執行測試：`bun test`
3. 啟動前端：`bun dev`
4. 開網頁，選一隻 Pokemon（例如 Pikachu），確認：
   - Stats 正確顯示
   - Sprite 圖片正確載入
   - Types 正確（首字大寫，例如 `Electric`）
   - Weight 正確（單位 kg）
5. 打開 DevTools Network tab：
   - 沒有打 `beta.pokeapi.co`
   - 有打 `/api/pokemon/pikachu`（Nuxt server route）
   - **沒有**直接打 `localhost:8080`（應該在 server side）
