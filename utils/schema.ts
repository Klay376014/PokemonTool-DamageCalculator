import { z } from 'zod'

export const statKeys = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'] as const

type StatProperty = typeof statKeys[number]

export type Stats = Record<StatProperty, number>

const types = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'] as const

type Type = (typeof types)[number]

export type PokemonType = [Type] | [Type, Type]

export interface Sprite {
  front_default: string
  front_shiny?: string
}

const spriteSchema = z.object({
  front_default: z.string().catch(''), // put placeholder image
  front_shiny: z.string().catch(''),
})

const pokemonSchema = z.object({
  name: z.string(),
  weight: z.number(),
  pokemon_v2_pokemonmoves: z.array(z.object({
    pokemon_v2_move: z.object({
      name: z.string(),
      move_damage_class_id: z.number(),
    })
  })).transform(arg => arg.filter(move => move.pokemon_v2_move.move_damage_class_id !== 1)), // 過濾變化招
  pokemon_v2_pokemonsprites: z.array(z.object({
    sprites: spriteSchema,
  })),
  pokemon_v2_pokemonstats: z.array(z.object({ base_stat: z.number() })).transform((arg) => {
    return arg.reduce((pre, cur, i) => {
      const statKey = statKeys[i]
      pre[statKey] = cur.base_stat
      return pre
    }, {} as Stats) // tranform from stats array to stat object
  }),
  pokemon_v2_pokemontypes: z.array(z.object({
    pokemon_v2_type: z.object({
      name: z.string()
    })
  })).transform(arg => arg.map(type => type.pokemon_v2_type.name.replace(/^./, type.pokemon_v2_type.name[0].toUpperCase())))
}).transform(({ name, weight, pokemon_v2_pokemonmoves, pokemon_v2_pokemonsprites, pokemon_v2_pokemonstats, pokemon_v2_pokemontypes }) => ({
  name,
  weight,
  stats: pokemon_v2_pokemonstats,
  sprite: pokemon_v2_pokemonsprites[0].sprites,
  moves: pokemon_v2_pokemonmoves,
  types: pokemon_v2_pokemontypes
})) // transform into more readable property names

export type Pokemon = z.infer<typeof pokemonSchema>

export const pokemonsResponseSchema = z.object({
  pokemon_v2_pokemon: z.array(pokemonSchema)
}).transform(arg => arg.pokemon_v2_pokemon)
