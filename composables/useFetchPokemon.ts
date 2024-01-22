import { graphql } from '../gql'
import { Cache } from '~/utils/cache'

const pokemonCache = new Cache<number, Pokemon>()
const fetchPokemonInfo = graphql(`
query fetchPokemonInfo($id: Int!) {
  pokemon_v2_pokemon(distinct_on: name, where: {id: {_eq: $id}}) {
    name
    pokemon_v2_pokemonmoves(where: {pokemon_id: {_eq: $id}, pokemon_v2_versiongroup: {name: {_eq: "scarlet-violet"}}}) {
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
  }
}`)

export default async function (): Promise<Pokemon | void> {
  try {
    const id = Math.round(Math.random() * 1020)
    const cachedPokemonInfo = pokemonCache.get(id)
    if (cachedPokemonInfo.success)
      return cachedPokemonInfo.value

    const variables = { id }
    const response = await useAsyncQuery(fetchPokemonInfo, variables)
    const validation = pokemonsResponseSchema.safeParse(response.data.value)
    if (!validation.success) {
      // TODO error handle
      console.error(validation.error)
      return
    }

    const targetPokemon = validation.data[0]
    pokemonCache.set(id, targetPokemon)
    return targetPokemon
  }
  catch (e) {
    if (e instanceof Error)
      console.log(e.message)
  }
}
