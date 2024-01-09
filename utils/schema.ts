import { z } from 'zod'

export const statKeys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const

type StatProperty = typeof statKeys[number]

export type Stats = Record<StatProperty, number>

const spriteSchema = z.object({
  front_default: z.string().default('') // put placeholder image
})

const pokemonSchema = z.object({
  name: z.string(),
  pokemon_v2_pokemonmoves: z.array(z.object({
    pokemon_v2_move: z.object({
      name: z.string(),
      move_damage_class_id: z.number()
    }),
  })).transform(arg => arg.filter(move => move.pokemon_v2_move.move_damage_class_id !== 1)), // 過濾變化招
  pokemon_v2_pokemonsprites: z.array(z.object({
    sprites: z.string().transform((arg) => {
      try {
        const spritesObj = JSON.parse(arg)
        return spriteSchema.parse(spritesObj)
      }
      catch (error) {
        console.error('failed to get correct sprites')
        return spriteSchema.parse({})
      }
    }) // 回傳的圖片為json字串
  })),
  pokemon_v2_pokemonstats: z.array(z.object({ base_stat: z.number() })).transform((arg) => {
    return arg.reduce((pre, cur, i) => {
      const statKey = statKeys[i]
      pre[statKey] = cur.base_stat
      return pre
    }, {} as Stats) // tranform from stats array to stat object
  })
}).transform(({ name, pokemon_v2_pokemonmoves, pokemon_v2_pokemonsprites, pokemon_v2_pokemonstats }) => ({
  name,
  stats: pokemon_v2_pokemonstats,
  sprite: pokemon_v2_pokemonsprites[0].sprites,
  moves: pokemon_v2_pokemonmoves,
})) // transform into more readable property names

export type Pokemon = z.infer<typeof pokemonSchema>

export const pokemonsResponseSchema = z.object({
  pokemon_v2_pokemon: z.array(pokemonSchema),
})
