## ADDED Requirements

### Requirement: Fixed bottom panel replaces right drawer

The damage result panel SHALL be rendered as a fixed-position element at the bottom of the viewport, replacing the right-side `v-navigation-drawer`. The panel SHALL always be present in the DOM (not toggled via a store flag).

#### Scenario: Panel is visible on page load

- **WHEN** the user opens the application
- **THEN** the damage bottom panel SHALL be visible at the bottom of the screen

#### Scenario: Panel does not obstruct main content

- **WHEN** the bottom panel is expanded
- **THEN** the main page content SHALL have sufficient bottom padding so that it is not obscured by the panel

### Requirement: Collapsible handle

The panel SHALL include a 24px tall handle bar at the top. Clicking the handle SHALL toggle the panel between expanded (~100px content area) and collapsed (handle only) states.

#### Scenario: Panel collapses on handle click

- **WHEN** the panel is expanded and the user clicks the handle
- **THEN** the content area SHALL collapse so only the 24px handle remains visible

#### Scenario: Panel expands on handle click

- **WHEN** the panel is collapsed and the user clicks the handle
- **THEN** the content area SHALL expand to its full height (~100px)

### Requirement: Single damage result display

The panel SHALL display exactly one damage result at all times, computed from the attacker Pokémon attacking the defender Pokémon. The system SHALL NOT support adding or removing additional results.

#### Scenario: Damage result is shown

- **WHEN** both attacker and defender Pokémon are set with at least one move
- **THEN** the panel SHALL display the damage range, percentage, and OHKO/2HKO classification

#### Scenario: Placeholder when Pokémon not set

- **WHEN** either Pokémon name or move is missing
- **THEN** the panel SHALL display a placeholder message instead of damage numbers

### Requirement: Copy damage text

The panel SHALL provide a copy button that writes the full damage description text to the clipboard.

#### Scenario: Copy on button click

- **WHEN** the user clicks the copy icon
- **THEN** the full detail damage text SHALL be written to the system clipboard

### Requirement: Remove pauseWatch and resumeWatch

The panel SHALL NOT include pause or resume controls. The damage result SHALL always reflect the current live state of both Pokémon.

#### Scenario: Damage updates automatically

- **WHEN** any relevant Pokémon stat, move, condition, or field value changes
- **THEN** the displayed damage result SHALL update immediately without user interaction

### Requirement: Calculator button removed from AppBar

The AppBar SHALL NOT contain a calculator toggle button. The damage panel visibility is controlled exclusively by its own handle.

#### Scenario: AppBar has no calculator button

- **WHEN** the user views the AppBar
- **THEN** no calculator icon button SHALL be present
