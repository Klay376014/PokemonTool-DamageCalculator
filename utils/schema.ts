import { z } from 'zod'

export const statKeys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const

type StatProperty = typeof statKeys[number]

export type Stats = Record<StatProperty, number>

const pokemonSchema = z.object({
  name: z.string(),
  pokemon_v2_pokemonmoves: z.array(z.object({
    pokemon_v2_move: z.object({
      name: z.string(),
      move_damage_class_id: z.number(),
    })
  })).transform(arg => arg.filter(move => move.pokemon_v2_move.move_damage_class_id !== 1)), // 過濾變化招
  pokemon_v2_pokemonsprites: z.array(z.object({
    sprites: z.string().transform(arg => JSON.parse(arg)), // 回傳的圖片為json字串
  })),
  pokemon_v2_pokemonstats: z.array(z.object({ base_stat: z.number() })).transform((arg) => {
    return arg.reduce((pre, cur, i) => {
      const statKey = statKeys[i]
      pre[statKey] = cur.base_stat
      return pre
    }, {} as Stats) // tranform from stats array to stat object
  }),
})

export type Pokemon = z.infer<typeof pokemonSchema>

export const pokemonsResponseSchema = z.object({
  pokemon_v2_pokemon: z.array(pokemonSchema)
})
