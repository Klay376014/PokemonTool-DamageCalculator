import { z } from 'zod'
import type { Pokemon } from 'vgc_data_wrapper'

export type StatKeys = keyof (Pokemon['stats'] & object) // use & object to filter out undefined

export const statKeysArray = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'] as const

export const stats = {
  hp: 'Hp',
  attack: 'Atk',
  defense: 'Def',
  specialAttack: 'Spa',
  specialDefense: 'Spd',
  speed: 'Spe',
} satisfies Record<StatKeys, string>

type StatProperty = typeof statKeysArray[number]

export type Stats = Record<StatProperty, number>

const types = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'] as const

type Type = (typeof types)[number]

export type PokemonType = [Type] | [Type, Type]

export interface Sprite {
  front_default: string
  artwork: string
}

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
    secondary_type: z.string().nullable().optional(),
  }).transform(({ form_name, weight, hp, attack, defense, sp_attack, sp_defense, speed, sprite_url, artwork_url, primary_type, secondary_type }) => ({
    name: form_name,
    weight,
    stats: { hp, attack, defense, specialAttack: sp_attack, specialDefense: sp_defense, speed },
    sprite: { front_default: sprite_url ?? '', artwork: artwork_url ?? '' },
    types: [primary_type, secondary_type]
      .filter((t): t is string => t != null)
      .map(t => t.charAt(0).toUpperCase() + t.slice(1)),
  }))
}).transform(r => r.data)

export type PokemonSchema = z.infer<typeof rotomDexFormSchema>
