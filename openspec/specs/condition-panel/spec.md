# condition-panel Specification

## Purpose

TBD - created by archiving change 'move-condition-panel-to-right'. Update Purpose after archive.

## Requirements

### Requirement: Condition panel renders on the right side

The condition panel SHALL be rendered as a `v-navigation-drawer` with `location="right"`.

#### Scenario: Panel appears on the right

- **WHEN** the user opens the application on any device
- **THEN** the condition panel SHALL slide in from or reside on the right side of the viewport


<!-- @trace
source: move-condition-panel-to-right
updated: 2026-04-16
code:
  - .mcp.json
  - components/AppBar.vue
  - DESIGN.md
  - app.vue
  - new_forms.yaml
  - components/Navigation.vue
  - components/DamageResult.vue
-->

---
### Requirement: Condition panel is permanent on desktop

On desktop breakpoints (lg and above), the condition panel SHALL be rendered in `permanent` mode, always visible without requiring user interaction.

#### Scenario: Panel is always open on desktop

- **WHEN** the user opens the application on a desktop (viewport width >= lg breakpoint)
- **THEN** the condition panel SHALL be visible and the main content area SHALL be inset to the left to accommodate it


<!-- @trace
source: move-condition-panel-to-right
updated: 2026-04-16
code:
  - .mcp.json
  - components/AppBar.vue
  - DESIGN.md
  - app.vue
  - new_forms.yaml
  - components/Navigation.vue
  - components/DamageResult.vue
-->

---
### Requirement: Condition panel is collapsible on mobile and tablet

On mobile and tablet breakpoints (below lg), the condition panel SHALL be in overlay mode, hidden by default and toggled by the user.

#### Scenario: Panel is hidden on initial load on mobile/tablet

- **WHEN** the user opens the application on a mobile or tablet (viewport width < lg breakpoint)
- **THEN** the condition panel SHALL NOT be visible

#### Scenario: Panel opens from the right on toggle

- **WHEN** the user taps the toggle button on mobile/tablet
- **THEN** the condition panel SHALL slide in from the right side of the screen

#### Scenario: Panel closes on backdrop tap

- **WHEN** the condition panel is open on mobile/tablet and the user taps outside the panel
- **THEN** the condition panel SHALL close


<!-- @trace
source: move-condition-panel-to-right
updated: 2026-04-16
code:
  - .mcp.json
  - components/AppBar.vue
  - DESIGN.md
  - app.vue
  - new_forms.yaml
  - components/Navigation.vue
  - components/DamageResult.vue
-->

---
### Requirement: Condition panel toggle button uses tune icon

The toggle button for the condition panel SHALL use the `mdi-tune` icon and SHALL only be visible on non-desktop breakpoints.

#### Scenario: Toggle button visible on mobile/tablet

- **WHEN** the user views the AppBar on a mobile or tablet
- **THEN** a button with the `mdi-tune` icon SHALL be present in the AppBar

#### Scenario: Toggle button hidden on desktop

- **WHEN** the user views the AppBar on a desktop
- **THEN** no condition panel toggle button SHALL be visible in the AppBar

<!-- @trace
source: move-condition-panel-to-right
updated: 2026-04-16
code:
  - .mcp.json
  - components/AppBar.vue
  - DESIGN.md
  - app.vue
  - new_forms.yaml
  - components/Navigation.vue
  - components/DamageResult.vue
-->