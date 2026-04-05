## ADDED Requirements

### Requirement: Server route proxies rotom-dex for Pokemon data

The system SHALL expose a Nuxt server route `GET /api/pokemon/:name` that proxies requests to the rotom-dex REST API and returns a normalized `PokemonSchema` object.

#### Scenario: Successful fetch returns normalized data

- **WHEN** a client calls `GET /api/pokemon/pikachu`
- **THEN** the server SHALL call `GET {rotomDexBaseUrl}/api/v1/pokemon/forms/pikachu`
- **THEN** the server SHALL parse the response with `rotomDexFormSchema`
- **THEN** the server SHALL return the normalized `PokemonSchema` (name, weight, stats, sprite, types)

#### Scenario: rotom-dex returns invalid response

- **WHEN** the rotom-dex response fails schema validation
- **THEN** the server SHALL throw an error with status code 502

#### Scenario: rotomDexBaseUrl is not exposed to frontend

- **WHEN** the client receives the response from `/api/pokemon/:name`
- **THEN** the `rotomDexBaseUrl` value SHALL NOT appear in any client-side bundle or network response

### Requirement: rotomDexFormSchema transforms rotom-dex response to PokemonSchema

The system SHALL define a `rotomDexFormSchema` Zod schema in `utils/schema.ts` that transforms a rotom-dex `/api/v1/pokemon/forms/:name` response into the application's `PokemonSchema`.

#### Scenario: Full data transformation

- **WHEN** rotom-dex returns a valid response with all fields present
- **THEN** `rotomDexFormSchema.parse()` SHALL return an object with `name`, `weight`, `stats`, `sprite`, and `types`
- **THEN** `stats` SHALL contain `hp`, `attack`, `defense`, `specialAttack`, `specialDefense`, `speed`
- **THEN** `sprite` SHALL contain `front_default` and `artwork`

#### Scenario: Type capitalization

- **WHEN** rotom-dex returns `primary_type: "electric"` and `secondary_type: null`
- **THEN** `types` SHALL be `["Electric"]`

#### Scenario: Both types present

- **WHEN** rotom-dex returns `primary_type: "water"` and `secondary_type: "flying"`
- **THEN** `types` SHALL be `["Water", "Flying"]`

#### Scenario: Null sprite URLs

- **WHEN** `sprite_url` is `null`
- **THEN** `sprite.front_default` SHALL be an empty string `""`

#### Scenario: Null artwork URL

- **WHEN** `artwork_url` is `null`
- **THEN** `sprite.artwork` SHALL be an empty string `""`

#### Scenario: Invalid response fails gracefully

- **WHEN** the rotom-dex response is missing required fields
- **THEN** `rotomDexFormSchema.safeParse()` SHALL return `{ success: false }`

### Requirement: moves field is removed from PokemonSchema

The system SHALL NOT include a `moves` field in `PokemonSchema` for this release.

#### Scenario: PokemonSchema has no moves

- **WHEN** `rotomDexFormSchema` transforms a rotom-dex response
- **THEN** the resulting object SHALL NOT have a `moves` property

### Requirement: useFetchPokemon uses Nuxt server route

The `useFetchPokemon` composable SHALL fetch Pokemon data by calling the Nuxt server route `/api/pokemon/:name` instead of any external GraphQL endpoint.

#### Scenario: Cache hit returns cached value

- **WHEN** `useFetchPokemon` is called with a Pokemon name that has been fetched before
- **THEN** the composable SHALL return the cached value without making a network request

#### Scenario: Cache miss fetches from server route

- **WHEN** `useFetchPokemon` is called with a Pokemon name not in cache
- **THEN** the composable SHALL call `$fetch("/api/pokemon/:name")`
- **THEN** the result SHALL be stored in cache

#### Scenario: Fetch error is handled silently

- **WHEN** the server route returns an error
- **THEN** `useFetchPokemon` SHALL log the error message and return `void`
