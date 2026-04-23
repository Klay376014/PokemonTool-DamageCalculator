# damage-bottom-panel Specification

## Purpose

TBD - created by archiving change 'damage-panel-bottom-bar'. Update Purpose after archive.

## Requirements

### Requirement: Fixed bottom panel replaces right drawer

The damage result panel SHALL be rendered as a fixed-position element at the bottom of the viewport, replacing the right-side `v-navigation-drawer`. The panel SHALL always be present in the DOM (not toggled via a store flag).

#### Scenario: Panel is visible on page load

- **WHEN** the user opens the application
- **THEN** the damage bottom panel SHALL be visible at the bottom of the screen

#### Scenario: Panel does not obstruct main content

- **WHEN** the bottom panel is expanded
- **THEN** the main page content SHALL have sufficient bottom padding so that it is not obscured by the panel


<!-- @trace
source: damage-panel-bottom-bar
updated: 2026-04-16
code:
  - locales/en.json
  - locales/ja.json
  - locales/zhHant.json
  - components/DamageResult.vue
  - DESIGN.md
  - stores/navigation.ts
  - .mcp.json
  - components/AppBar.vue
  - components/DamageText.vue
  - pages/index.vue
  - new_forms.yaml
-->

---
### Requirement: Collapsible handle

The panel SHALL include a 24px tall handle bar at the top. Clicking the handle SHALL toggle the panel between expanded (~100px content area) and collapsed (handle only) states.

#### Scenario: Panel collapses on handle click

- **WHEN** the panel is expanded and the user clicks the handle
- **THEN** the content area SHALL collapse so only the 24px handle remains visible

#### Scenario: Panel expands on handle click

- **WHEN** the panel is collapsed and the user clicks the handle
- **THEN** the content area SHALL expand to its full height (~100px)


<!-- @trace
source: damage-panel-bottom-bar
updated: 2026-04-16
code:
  - locales/en.json
  - locales/ja.json
  - locales/zhHant.json
  - components/DamageResult.vue
  - DESIGN.md
  - stores/navigation.ts
  - .mcp.json
  - components/AppBar.vue
  - components/DamageText.vue
  - pages/index.vue
  - new_forms.yaml
-->

---
### Requirement: Single damage result display

The panel SHALL display exactly two damage results simultaneously: one computed from Pokémon 1 attacking Pokémon 2 (forward direction), and one computed from Pokémon 2 attacking Pokémon 1 (reverse direction). The system SHALL NOT support adding or removing additional results beyond these two.

On large viewports (`lgAndUp`), the two results SHALL be rendered side by side in a horizontal layout, each occupying 50% of the panel width. On smaller viewports, the two results SHALL be stacked vertically.

The panel content area height SHALL be approximately 100px on large viewports and approximately 115px on smaller viewports.

On large viewports, each damage result SHALL display its own Pokémon sprites with a directional arrow. The forward result (1→2) SHALL use a primary-colored arrow; the reverse result (2→1) SHALL use a secondary-colored arrow. No divider SHALL be rendered between the two columns.

On small viewports, a single shared sprite row (with a swap icon between the two Pokémon images) SHALL be displayed between the forward and reverse damage rows. Each damage row SHALL show a small colored directional arrow (→ primary for forward, ← secondary for reverse) instead of sprites.

#### Scenario: Both damage results are shown

- **WHEN** both Pokémon are set with at least one move each
- **THEN** the panel SHALL display both the forward (1→2) and reverse (2→1) damage ranges, percentages, and OHKO/2HKO classifications simultaneously

#### Scenario: Placeholder when Pokémon not set

- **WHEN** either Pokémon name or move is missing for a given direction
- **THEN** the panel SHALL display a placeholder message for that direction instead of damage numbers

#### Scenario: Responsive layout on large viewport

- **WHEN** the viewport is `lgAndUp`
- **THEN** the two damage results SHALL be displayed side by side horizontally within the 100px content area, forward (1→2) on the left and reverse (2→1) on the right

#### Scenario: Responsive layout on small viewport

- **WHEN** the viewport is smaller than `lg`
- **THEN** the forward damage (1→2) SHALL appear above the shared sprite row, and the reverse damage (2→1) SHALL appear below it, within the 115px content area

#### Scenario: Direction indicated by arrow color

- **WHEN** the panel displays a damage result
- **THEN** the directional arrow for the forward result (1→2) SHALL be rendered in the primary color, and the reverse result (2→1) arrow SHALL be rendered in the secondary color


<!-- @trace
source: dual-damage-display
updated: 2026-04-24
code:
  - app/composables/useSwapPokemon.ts
  - app/components/DamageText.vue
  - app/components/PokemonCard.vue
  - app/pages/index.vue
  - docs/superpowers/specs/2026-04-21-multi-move-selection-design.md
  - app/components/DamageResult.vue
-->

---
### Requirement: Copy damage text

The panel SHALL provide a copy button that writes the full damage description text to the clipboard.

#### Scenario: Copy on button click

- **WHEN** the user clicks the copy icon
- **THEN** the full detail damage text SHALL be written to the system clipboard


<!-- @trace
source: damage-panel-bottom-bar
updated: 2026-04-16
code:
  - locales/en.json
  - locales/ja.json
  - locales/zhHant.json
  - components/DamageResult.vue
  - DESIGN.md
  - stores/navigation.ts
  - .mcp.json
  - components/AppBar.vue
  - components/DamageText.vue
  - pages/index.vue
  - new_forms.yaml
-->

---
### Requirement: Remove pauseWatch and resumeWatch

The panel SHALL NOT include pause or resume controls. The damage result SHALL always reflect the current live state of both Pokémon.

#### Scenario: Damage updates automatically

- **WHEN** any relevant Pokémon stat, move, condition, or field value changes
- **THEN** the displayed damage result SHALL update immediately without user interaction


<!-- @trace
source: damage-panel-bottom-bar
updated: 2026-04-16
code:
  - locales/en.json
  - locales/ja.json
  - locales/zhHant.json
  - components/DamageResult.vue
  - DESIGN.md
  - stores/navigation.ts
  - .mcp.json
  - components/AppBar.vue
  - components/DamageText.vue
  - pages/index.vue
  - new_forms.yaml
-->

---
### Requirement: Calculator button removed from AppBar

The AppBar SHALL NOT contain a calculator toggle button. The damage panel visibility is controlled exclusively by its own handle.

#### Scenario: AppBar has no calculator button

- **WHEN** the user views the AppBar
- **THEN** no calculator icon button SHALL be present

<!-- @trace
source: damage-panel-bottom-bar
updated: 2026-04-16
code:
  - locales/en.json
  - locales/ja.json
  - locales/zhHant.json
  - components/DamageResult.vue
  - DESIGN.md
  - stores/navigation.ts
  - .mcp.json
  - components/AppBar.vue
  - components/DamageText.vue
  - pages/index.vue
  - new_forms.yaml
-->

---
### Requirement: Swap button removed from PokémonCard

The PokémonCard component SHALL NOT include a swap button (`mdi-swap-horizontal`). The swap functionality is no longer necessary because both damage directions are displayed simultaneously.

#### Scenario: No swap button visible

- **WHEN** the user views either PokémonCard
- **THEN** no swap button SHALL be present in the card header area

<!-- @trace
source: dual-damage-display
updated: 2026-04-24
code:
  - app/composables/useSwapPokemon.ts
  - app/components/DamageText.vue
  - app/components/PokemonCard.vue
  - app/pages/index.vue
  - docs/superpowers/specs/2026-04-21-multi-move-selection-design.md
  - app/components/DamageResult.vue
-->