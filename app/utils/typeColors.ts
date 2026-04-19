export const typeColorMap: Record<string, { bg: string; textColor: string }> = {
  Fire:     { bg: '#dd6620', textColor: '#ffffff' },
  Water:    { bg: '#4f90d0', textColor: '#ffffff' },
  Grass:    { bg: '#5a9e40', textColor: '#ffffff' },
  Electric: { bg: '#c8a800', textColor: '#1c1c1e' },
  Ice:      { bg: '#5aacbd', textColor: '#ffffff' },
  Psychic:  { bg: '#e05080', textColor: '#ffffff' },
  Dragon:   { bg: '#6040d0', textColor: '#ffffff' },
  Dark:     { bg: '#6a5040', textColor: '#ffffff' },
  Steel:    { bg: '#9898b8', textColor: '#ffffff' },
  Normal:   { bg: '#9898a0', textColor: '#ffffff' },
  Fighting: { bg: '#b03028', textColor: '#ffffff' },
  Poison:   { bg: '#9040a0', textColor: '#ffffff' },
  Ground:   { bg: '#9a7020', textColor: '#ffffff' },
  Flying:   { bg: '#8870d0', textColor: '#ffffff' },
  Bug:      { bg: '#8a9820', textColor: '#ffffff' },
  Rock:     { bg: '#a89030', textColor: '#ffffff' },
  Ghost:    { bg: '#6050a0', textColor: '#ffffff' },
  Fairy:    { bg: '#d070a0', textColor: '#ffffff' },
  Stellar:  { bg: '#5588cc', textColor: '#ffffff' },
}

export function getTypeColor(type: string): { bg: string; textColor: string } {
  return typeColorMap[type] ?? { bg: '#888', textColor: '#fff' }
}
