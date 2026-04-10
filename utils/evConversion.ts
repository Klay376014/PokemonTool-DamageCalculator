export function displayToInternal(display: number): number {
  if (display <= 0) return 0
  return 8 * display - 4
}

export function internalToDisplay(internal: number): number {
  if (internal <= 0) return 0
  return Math.round((internal + 4) / 8)
}
