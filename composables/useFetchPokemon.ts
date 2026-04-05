import { Cache } from '~/utils/cache'

const pokemonCache = new Cache<string, PokemonSchema>()

export default async function (pokemon: string): Promise<PokemonSchema | void> {
  try {
    const cached = pokemonCache.get(pokemon)
    if (cached.success)
      return cached.value

    const data = await $fetch<PokemonSchema>(`/api/pokemon/${pokemon}`)
    pokemonCache.set(pokemon, data)
    return data
  }
  catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}
