import { graphql } from '../gql'
import { Cache } from '~/utils/cache'

const pokemonCache = new Cache<string, Pokemon>()
const fetchPokemonInfo = graphql(`
query fetchPokemonInfo($pokemon: String!) {
  pokemon_v2_pokemon(distinct_on: name, where: {name: {_eq: $pokemon}}) {
    name
    weight
    pokemon_v2_pokemonmoves(where: {pokemon_v2_versiongroup: {name: {_eq: "scarlet-violet"}}, pokemon_v2_pokemon: {name: {_eq: $pokemon}}}) {
      pokemon_v2_move {
        name
        move_damage_class_id
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonstats {
      base_stat
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}`)

export default async function (pokemon: string): Promise<Pokemon | void> {
  try {
    const cachedPokemonInfo = pokemonCache.get(pokemon)
    if (cachedPokemonInfo.success)
      return cachedPokemonInfo.value

    const variables = { pokemon }
    const response = await useAsyncQuery(fetchPokemonInfo, variables)
    const validation = pokemonsResponseSchema.safeParse(response.data.value)
    if (!validation.success) {
      // TODO error handle
      console.error(validation.error)
      return
    }

    const targetPokemon = validation.data[0]
    pokemonCache.set(pokemon, targetPokemon)
    return targetPokemon
  }
  catch (e) {
    if (e instanceof Error)
      console.log(e.message)
  }
}
