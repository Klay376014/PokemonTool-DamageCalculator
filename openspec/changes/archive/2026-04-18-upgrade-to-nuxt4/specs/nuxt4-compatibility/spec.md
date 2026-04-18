## ADDED Requirements

### Requirement: Application runs on Nuxt 4

The application SHALL run correctly under Nuxt 4 with no runtime errors. All existing features SHALL remain functional after the upgrade.

#### Scenario: Dev server starts without errors

- **WHEN** developer runs `nuxt dev`
- **THEN** the dev server SHALL start successfully with no critical errors or warnings about deprecated APIs

#### Scenario: Production build succeeds

- **WHEN** developer runs `nuxt build`
- **THEN** the build SHALL complete without errors

### Requirement: Directory structure follows Nuxt 4 conventions

App-layer source files SHALL reside inside the `app/` subdirectory. Server routes SHALL remain at project root under `server/`.

#### Scenario: App layer directories are inside app/

- **WHEN** the project structure is inspected
- **THEN** `pages/`, `components/`, `composables/`, `plugins/`, `assets/`, `utils/`, and `stores/` SHALL all be located under `app/`

#### Scenario: Server routes are at project root

- **WHEN** the project structure is inspected
- **THEN** `server/api/` SHALL remain at the project root level

### Requirement: All dependencies are compatible with Nuxt 4

All Nuxt modules and plugins SHALL be updated to versions that support Nuxt 4.

#### Scenario: No peer dependency warnings on install

- **WHEN** `npm install` or `bun install` is run after upgrade
- **THEN** there SHALL be no peer dependency errors for `@pinia/nuxt`, `nuxt-gtag`, or `@nuxt/eslint`

#### Scenario: Vuetify renders correctly

- **WHEN** the application is opened in a browser
- **THEN** Vuetify components SHALL render with correct styles and theming
