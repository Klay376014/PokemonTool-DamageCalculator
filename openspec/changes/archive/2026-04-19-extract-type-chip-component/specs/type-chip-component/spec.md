## ADDED Requirements

### Requirement: TypeChip renders a styled badge for a Pokémon type

The system SHALL provide a `TypeChip` Vue component that accepts a `type` string prop and renders a visually styled chip displaying the localized type name with the appropriate background and text color.

The component SHALL define a module-level `typeColorMap` covering all 19 Pokémon types (18 standard + Stellar) with `bg` and `textColor` values.

The component SHALL fall back to `bg: '#888'` and `textColor: '#fff'` for any unrecognized type string.

#### Scenario: Known type renders with correct colors

- **WHEN** `TypeChip` receives a `type` prop matching a known Pokémon type (e.g., `"fire"`)
- **THEN** the chip SHALL render with the background color defined in `typeColorMap` for that type
- **AND** the chip SHALL render with the text color defined in `typeColorMap` for that type
- **AND** the chip SHALL display the localized type label via `$t('type.fire')`

#### Scenario: Unknown type renders with fallback colors

- **WHEN** `TypeChip` receives a `type` prop that does not exist in `typeColorMap`
- **THEN** the chip SHALL render with background color `#888` and text color `#fff`

### Requirement: SelectSheet uses TypeChip for type display

`SelectSheet.vue` SHALL replace its inline `<span class="type-chip">` rendering with `<TypeChip :type="md.type" />` and SHALL NOT define its own `typeColorMap` or `.type-chip` CSS.

#### Scenario: SelectSheet list item shows type chip

- **WHEN** a move list item is rendered in SelectSheet
- **THEN** the type badge SHALL be rendered by the `TypeChip` component
- **AND** the visual appearance SHALL be identical to the previous inline implementation

### Requirement: PokemonInfo displays types using TypeChip

`PokemonInfo.vue` SHALL render each Pokémon type using `<TypeChip :type="type" />` instead of plain text.

#### Scenario: Pokémon with multiple types shows styled chips

- **WHEN** a Pokémon with two types is displayed in PokemonInfo
- **THEN** each type SHALL render as a styled TypeChip badge
- **AND** each chip SHALL display the correct color and localized label for its type
