import { describe, expect, it } from 'vitest'
import { rotomDexFormSchema } from './schema'

const baseInput = {
  success: true,
  data: {
    form_name: 'pikachu',
    weight: 6.0,
    hp: 35,
    attack: 55,
    defense: 40,
    sp_attack: 50,
    sp_defense: 50,
    speed: 90,
    sprite_url: 'https://example.com/pikachu.png',
    artwork_url: 'https://example.com/pikachu-art.png',
    primary_type: 'electric',
    secondary_type: null,
  },
}

describe('rotomDexFormSchema', () => {
  it('full data transformation', () => {
    const result = rotomDexFormSchema.parse(baseInput)
    expect(result.name).toBe('pikachu')
    expect(result.weight).toBe(6.0)
    expect(result.stats).toEqual({ hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 })
    expect(result.sprite).toEqual({ front_default: 'https://example.com/pikachu.png', artwork: 'https://example.com/pikachu-art.png' })
    expect('moves' in result).toBe(false)
  })

  it('type capitalization', () => {
    const result = rotomDexFormSchema.parse(baseInput)
    expect(result.types).toEqual(['Electric'])
  })

  it('both types present', () => {
    const input = { ...baseInput, data: { ...baseInput.data, primary_type: 'water', secondary_type: 'flying' } }
    const result = rotomDexFormSchema.parse(input)
    expect(result.types).toEqual(['Water', 'Flying'])
  })

  it('null sprite URLs', () => {
    const input = { ...baseInput, data: { ...baseInput.data, sprite_url: null } }
    const result = rotomDexFormSchema.parse(input)
    expect(result.sprite.front_default).toBe('')
  })

  it('null artwork URL', () => {
    const input = { ...baseInput, data: { ...baseInput.data, artwork_url: null } }
    const result = rotomDexFormSchema.parse(input)
    expect(result.sprite.artwork).toBe('')
  })

  it('invalid response fails gracefully', () => {
    const result = rotomDexFormSchema.safeParse({ success: true, data: { form_name: 'pikachu' } })
    expect(result.success).toBe(false)
  })
})
