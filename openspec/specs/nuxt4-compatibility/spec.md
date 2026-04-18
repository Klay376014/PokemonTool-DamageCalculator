### Requirement: Application runs on Nuxt 4

The application SHALL run correctly under Nuxt 4 with no runtime errors. All existing features SHALL remain functional after the upgrade.

#### Scenario: Dev server starts without errors

- **WHEN** developer runs `nuxt dev`
- **THEN** the dev server SHALL start successfully with no critical errors or warnings about deprecated APIs

#### Scenario: Production build succeeds

- **WHEN** developer runs `nuxt build`
- **THEN** the build SHALL complete without errors


<!-- @trace
source: upgrade-to-nuxt4
updated: 2026-04-18
code:
  - package.json
  - utils/convertKana.ts
  - nuxt.config.ts
  - components/Navigation.vue
  - app/app.vue
  - app/components/PokemonInfo.vue
  - app/utils/evConversion.ts
  - components/Selection.vue
  - app.vue
  - app/stores/condition.ts
  - app/components/PokemonCard.vue
  - composables/useAssetKeyToContext.ts
  - composables/useFetchPokemon.ts
  - .nuxtrc
  - locales/ja.json
  - app/stores/navigation.ts
  - components/AppBar.vue
  - app/utils/cache.ts
  - components/PokemonSelect.vue
  - app/components/PokemonSelect.vue
  - utils/defaultMove.ts
  - utils/evConversion.ts
  - assets/styles/overwrite.css
  - components/SaveLoad.vue
  - app/components/SaveLoad.vue
  - app/components/MoveListFilter.vue
  - app/plugins/i18n.ts
  - app/stores/pokemonData.ts
  - locales/en.json
  - components/DamageResult.vue
  - stores/pokemonBattle.ts
  - utils/cache.ts
  - components/PokemonCard.vue
  - app/components/TeraSelect.vue
  - locales/zhHant.json
  - stores/field.ts
  - app/composables/useSwapPokemon.ts
  - app/composables/useFetchPokemon.ts
  - app/components/Condition.vue
  - app/assets/styles/overwrite.css
  - app/stores/field.ts
  - app/composables/useAssetKeyToContext.ts
  - app/locales/en.json
  - app/plugins/vuetify.ts
  - app/utils/convertKana.ts
  - app/assets/src/default.png
  - app/assets/pokemonAbility.json
  - app/utils/schema.ts
  - utils/evioliteMap.ts
  - app/components/Navigation.vue
  - assets/src/default.png
  - app/components/DamageResult.vue
  - app/components/DamageText.vue
  - app/utils/defaultMove.ts
  - composables/useSwapPokemon.ts
  - stores/condition.ts
  - app/assets/pokemonItem.json
  - app/locales/zhHant.json
  - stores/navigation.ts
  - app/pages/index.vue
  - app/components/Selection.vue
  - components/MoveListFilter.vue
  - assets/pokemonMove.json
  - app/locales/ja.json
  - .mcp.json
  - app/stores/pokemonBattle.ts
  - components/DamageText.vue
  - components/PokemonStat.vue
  - assets/pokemonAbility.json
  - new_forms.yaml
  - pages/index.vue
  - plugins/vuetify.ts
  - components/Condition.vue
  - app/components/AppBar.vue
  - DESIGN.md
  - plugins/i18n.ts
  - app/components/PokemonStat.vue
  - app/components/SelectSheet.vue
  - app/utils/evioliteMap.ts
  - bun.lock
  - components/SelectSheet.vue
  - components/TeraSelect.vue
  - stores/pokemonData.ts
  - app/assets/pokemonMove.json
  - components/PokemonInfo.vue
  - assets/pokemonItem.json
  - utils/schema.ts
tests:
  - app/utils/schema.test.ts
  - utils/cache.test.ts
  - utils/schema.test.ts
  - app/utils/cache.test.ts
-->

### Requirement: Directory structure follows Nuxt 4 conventions

App-layer source files SHALL reside inside the `app/` subdirectory. Server routes SHALL remain at project root under `server/`.

#### Scenario: App layer directories are inside app/

- **WHEN** the project structure is inspected
- **THEN** `pages/`, `components/`, `composables/`, `plugins/`, `assets/`, `utils/`, and `stores/` SHALL all be located under `app/`

#### Scenario: Server routes are at project root

- **WHEN** the project structure is inspected
- **THEN** `server/api/` SHALL remain at the project root level


<!-- @trace
source: upgrade-to-nuxt4
updated: 2026-04-18
code:
  - package.json
  - utils/convertKana.ts
  - nuxt.config.ts
  - components/Navigation.vue
  - app/app.vue
  - app/components/PokemonInfo.vue
  - app/utils/evConversion.ts
  - components/Selection.vue
  - app.vue
  - app/stores/condition.ts
  - app/components/PokemonCard.vue
  - composables/useAssetKeyToContext.ts
  - composables/useFetchPokemon.ts
  - .nuxtrc
  - locales/ja.json
  - app/stores/navigation.ts
  - components/AppBar.vue
  - app/utils/cache.ts
  - components/PokemonSelect.vue
  - app/components/PokemonSelect.vue
  - utils/defaultMove.ts
  - utils/evConversion.ts
  - assets/styles/overwrite.css
  - components/SaveLoad.vue
  - app/components/SaveLoad.vue
  - app/components/MoveListFilter.vue
  - app/plugins/i18n.ts
  - app/stores/pokemonData.ts
  - locales/en.json
  - components/DamageResult.vue
  - stores/pokemonBattle.ts
  - utils/cache.ts
  - components/PokemonCard.vue
  - app/components/TeraSelect.vue
  - locales/zhHant.json
  - stores/field.ts
  - app/composables/useSwapPokemon.ts
  - app/composables/useFetchPokemon.ts
  - app/components/Condition.vue
  - app/assets/styles/overwrite.css
  - app/stores/field.ts
  - app/composables/useAssetKeyToContext.ts
  - app/locales/en.json
  - app/plugins/vuetify.ts
  - app/utils/convertKana.ts
  - app/assets/src/default.png
  - app/assets/pokemonAbility.json
  - app/utils/schema.ts
  - utils/evioliteMap.ts
  - app/components/Navigation.vue
  - assets/src/default.png
  - app/components/DamageResult.vue
  - app/components/DamageText.vue
  - app/utils/defaultMove.ts
  - composables/useSwapPokemon.ts
  - stores/condition.ts
  - app/assets/pokemonItem.json
  - app/locales/zhHant.json
  - stores/navigation.ts
  - app/pages/index.vue
  - app/components/Selection.vue
  - components/MoveListFilter.vue
  - assets/pokemonMove.json
  - app/locales/ja.json
  - .mcp.json
  - app/stores/pokemonBattle.ts
  - components/DamageText.vue
  - components/PokemonStat.vue
  - assets/pokemonAbility.json
  - new_forms.yaml
  - pages/index.vue
  - plugins/vuetify.ts
  - components/Condition.vue
  - app/components/AppBar.vue
  - DESIGN.md
  - plugins/i18n.ts
  - app/components/PokemonStat.vue
  - app/components/SelectSheet.vue
  - app/utils/evioliteMap.ts
  - bun.lock
  - components/SelectSheet.vue
  - components/TeraSelect.vue
  - stores/pokemonData.ts
  - app/assets/pokemonMove.json
  - components/PokemonInfo.vue
  - assets/pokemonItem.json
  - utils/schema.ts
tests:
  - app/utils/schema.test.ts
  - utils/cache.test.ts
  - utils/schema.test.ts
  - app/utils/cache.test.ts
-->

### Requirement: All dependencies are compatible with Nuxt 4

All Nuxt modules and plugins SHALL be updated to versions that support Nuxt 4.

#### Scenario: No peer dependency warnings on install

- **WHEN** `npm install` or `bun install` is run after upgrade
- **THEN** there SHALL be no peer dependency errors for `@pinia/nuxt`, `nuxt-gtag`, or `@nuxt/eslint`

#### Scenario: Vuetify renders correctly

- **WHEN** the application is opened in a browser
- **THEN** Vuetify components SHALL render with correct styles and theming

## Requirements


<!-- @trace
source: upgrade-to-nuxt4
updated: 2026-04-18
code:
  - package.json
  - utils/convertKana.ts
  - nuxt.config.ts
  - components/Navigation.vue
  - app/app.vue
  - app/components/PokemonInfo.vue
  - app/utils/evConversion.ts
  - components/Selection.vue
  - app.vue
  - app/stores/condition.ts
  - app/components/PokemonCard.vue
  - composables/useAssetKeyToContext.ts
  - composables/useFetchPokemon.ts
  - .nuxtrc
  - locales/ja.json
  - app/stores/navigation.ts
  - components/AppBar.vue
  - app/utils/cache.ts
  - components/PokemonSelect.vue
  - app/components/PokemonSelect.vue
  - utils/defaultMove.ts
  - utils/evConversion.ts
  - assets/styles/overwrite.css
  - components/SaveLoad.vue
  - app/components/SaveLoad.vue
  - app/components/MoveListFilter.vue
  - app/plugins/i18n.ts
  - app/stores/pokemonData.ts
  - locales/en.json
  - components/DamageResult.vue
  - stores/pokemonBattle.ts
  - utils/cache.ts
  - components/PokemonCard.vue
  - app/components/TeraSelect.vue
  - locales/zhHant.json
  - stores/field.ts
  - app/composables/useSwapPokemon.ts
  - app/composables/useFetchPokemon.ts
  - app/components/Condition.vue
  - app/assets/styles/overwrite.css
  - app/stores/field.ts
  - app/composables/useAssetKeyToContext.ts
  - app/locales/en.json
  - app/plugins/vuetify.ts
  - app/utils/convertKana.ts
  - app/assets/src/default.png
  - app/assets/pokemonAbility.json
  - app/utils/schema.ts
  - utils/evioliteMap.ts
  - app/components/Navigation.vue
  - assets/src/default.png
  - app/components/DamageResult.vue
  - app/components/DamageText.vue
  - app/utils/defaultMove.ts
  - composables/useSwapPokemon.ts
  - stores/condition.ts
  - app/assets/pokemonItem.json
  - app/locales/zhHant.json
  - stores/navigation.ts
  - app/pages/index.vue
  - app/components/Selection.vue
  - components/MoveListFilter.vue
  - assets/pokemonMove.json
  - app/locales/ja.json
  - .mcp.json
  - app/stores/pokemonBattle.ts
  - components/DamageText.vue
  - components/PokemonStat.vue
  - assets/pokemonAbility.json
  - new_forms.yaml
  - pages/index.vue
  - plugins/vuetify.ts
  - components/Condition.vue
  - app/components/AppBar.vue
  - DESIGN.md
  - plugins/i18n.ts
  - app/components/PokemonStat.vue
  - app/components/SelectSheet.vue
  - app/utils/evioliteMap.ts
  - bun.lock
  - components/SelectSheet.vue
  - components/TeraSelect.vue
  - stores/pokemonData.ts
  - app/assets/pokemonMove.json
  - components/PokemonInfo.vue
  - assets/pokemonItem.json
  - utils/schema.ts
tests:
  - app/utils/schema.test.ts
  - utils/cache.test.ts
  - utils/schema.test.ts
  - app/utils/cache.test.ts
-->

### Requirement: Application runs on Nuxt 4

The application SHALL run correctly under Nuxt 4 with no runtime errors. All existing features SHALL remain functional after the upgrade.

#### Scenario: Dev server starts without errors

- **WHEN** developer runs `nuxt dev`
- **THEN** the dev server SHALL start successfully with no critical errors or warnings about deprecated APIs

#### Scenario: Production build succeeds

- **WHEN** developer runs `nuxt build`
- **THEN** the build SHALL complete without errors

---
### Requirement: Directory structure follows Nuxt 4 conventions

App-layer source files SHALL reside inside the `app/` subdirectory. Server routes SHALL remain at project root under `server/`.

#### Scenario: App layer directories are inside app/

- **WHEN** the project structure is inspected
- **THEN** `pages/`, `components/`, `composables/`, `plugins/`, `assets/`, `utils/`, and `stores/` SHALL all be located under `app/`

#### Scenario: Server routes are at project root

- **WHEN** the project structure is inspected
- **THEN** `server/api/` SHALL remain at the project root level

---
### Requirement: All dependencies are compatible with Nuxt 4

All Nuxt modules and plugins SHALL be updated to versions that support Nuxt 4.

#### Scenario: No peer dependency warnings on install

- **WHEN** `npm install` or `bun install` is run after upgrade
- **THEN** there SHALL be no peer dependency errors for `@pinia/nuxt`, `nuxt-gtag`, or `@nuxt/eslint`

#### Scenario: Vuetify renders correctly

- **WHEN** the application is opened in a browser
- **THEN** Vuetify components SHALL render with correct styles and theming