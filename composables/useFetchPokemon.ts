import { graphql } from '../gql'

export default async function () {
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
  try {
    const id = Math.round(Math.random() * 1020)
    const variables = { id }
    const response = await useAsyncQuery(fetchPokemonInfo, variables)
    const validation = pokemonsResponseSchema.safeParse(response.data.value)
    if (!validation.success) {
      // TODO error handle
    }
    else {
      const targetPokemon = validation.data
      return targetPokemon.pokemon_v2_pokemon[0]
    }
  }
  catch (e) {
    if (e instanceof Error)
      console.log(e.message)
  }
}
