import { describe, it, expect } from 'vitest'
import { typeColorMap, getTypeColor } from '~/utils/typeColors'

describe('typeColorMap', () => {
  it('covers all 19 Pokémon types including Stellar', () => {
    const expected = [
      'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dragon',
      'Dark', 'Steel', 'Normal', 'Fighting', 'Poison', 'Ground', 'Flying',
      'Bug', 'Rock', 'Ghost', 'Fairy', 'Stellar',
    ]
    expected.forEach(type => {
      expect(typeColorMap).toHaveProperty(type)
    })
    expect(Object.keys(typeColorMap)).toHaveLength(19)
  })

  it('each entry has bg and textColor strings', () => {
    Object.entries(typeColorMap).forEach(([, colors]) => {
      expect(typeof colors.bg).toBe('string')
      expect(typeof colors.textColor).toBe('string')
    })
  })
})

describe('getTypeColor', () => {
  it('returns correct colors for a known type', () => {
    const result = getTypeColor('Fire')
    expect(result.bg).toBe(typeColorMap.Fire.bg)
    expect(result.textColor).toBe(typeColorMap.Fire.textColor)
  })

  it('returns fallback colors for an unknown type', () => {
    const result = getTypeColor('UnknownType')
    expect(result.bg).toBe('#888')
    expect(result.textColor).toBe('#fff')
  })

  it('returns fallback for empty string', () => {
    const result = getTypeColor('')
    expect(result.bg).toBe('#888')
    expect(result.textColor).toBe('#fff')
  })
})
