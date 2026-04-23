## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Swap button removed from PokémonCard

The PokémonCard component SHALL NOT include a swap button (`mdi-swap-horizontal`). The swap functionality is no longer necessary because both damage directions are displayed simultaneously.

#### Scenario: No swap button visible

- **WHEN** the user views either PokémonCard
- **THEN** no swap button SHALL be present in the card header area
