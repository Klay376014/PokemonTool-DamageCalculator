## ADDED Requirements

### Requirement: Color tokens follow Apple design system

The theme SHALL define color tokens for dark and light modes using the Apple color palette.

The `darkMode` theme SHALL use:
- `background`: `#000000`
- `surface`: `#1c1c1e`
- `primary`: `#0071e3` (Apple Blue)
- `primary-darken-1`: `#0066cc`
- `secondary`: `#FF9F0A` (Apple Orange)
- `secondary-darken-1`: `#CC7F08`
- `warning`: `#FF0000` (unchanged)

The `lightMode` theme SHALL use:
- `background`: `#f5f5f7`
- `surface`: `#ffffff`
- `primary`: `#0071e3`
- `primary-darken-1`: `#0066cc`
- `secondary`: `#FF9F0A`
- `secondary-darken-1`: `#CC7F08`

#### Scenario: Dark mode primary color

- **WHEN** the app renders in `darkMode`
- **THEN** primary color tokens SHALL resolve to `#0071e3`

#### Scenario: Light mode background color

- **WHEN** the app renders in `lightMode`
- **THEN** background color token SHALL resolve to `#f5f5f7`

### Requirement: AppBar displays glass morphism effect

The `.v-app-bar` element SHALL display a glass morphism effect using backdrop-filter blur.

In dark mode, the AppBar SHALL use `rgba(0, 0, 0, 0.82)` background with `backdrop-filter: saturate(180%) blur(20px)` and a bottom border of `1px solid rgba(255, 255, 255, 0.08)`.

In light mode (`.v-theme--lightMode`), the AppBar SHALL use `rgba(255, 255, 255, 0.72)` background with a bottom border of `1px solid rgba(0, 0, 0, 0.08)`.

Both dark and light modes SHALL include `-webkit-backdrop-filter` for Safari compatibility.

#### Scenario: Dark mode AppBar glass effect

- **WHEN** the app renders in dark mode
- **THEN** the AppBar SHALL display a semi-transparent dark background with blur effect

#### Scenario: Light mode AppBar glass effect

- **WHEN** the app renders in light mode
- **THEN** the AppBar SHALL display a semi-transparent white background with blur effect

### Requirement: Navigation drawer uses frosted glass background

The `.v-navigation-drawer` element SHALL use a frosted glass background.

In dark mode, the drawer SHALL use `rgba(28, 28, 30, 0.95)` with `backdrop-filter: saturate(180%) blur(20px)`.

In light mode, the drawer SHALL use `rgba(255, 255, 255, 0.9)`.

Both modes SHALL include `-webkit-backdrop-filter` for Safari compatibility.

#### Scenario: Dark mode drawer background

- **WHEN** the navigation drawer renders in dark mode
- **THEN** it SHALL display a near-opaque dark frosted background

#### Scenario: Light mode drawer background

- **WHEN** the navigation drawer renders in light mode
- **THEN** it SHALL display a near-opaque white frosted background

### Requirement: Typography uses Apple system font stack

The application body and `.v-application` SHALL use the Apple system font stack: `-apple-system, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif`.

Headings (h1–h4, `.text-h4`–`.text-h6`) SHALL use the display font stack: `-apple-system, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif` with `letter-spacing: -0.28px`.

The application SHALL enable `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on the body.

CSS custom properties `--apple-font-display` and `--apple-font-text` SHALL be defined on `:root`.

#### Scenario: Body font family

- **WHEN** the app renders
- **THEN** body text SHALL use the Apple system font stack with antialiased rendering

#### Scenario: Heading font family

- **WHEN** heading elements render
- **THEN** they SHALL use the display font stack with negative letter-spacing

### Requirement: Buttons use Apple-style border radius

Solid buttons (`.v-btn:not(.v-btn--icon):not(.v-btn--outlined-pill)`) SHALL have `border-radius: 8px`.

Outlined buttons (`.v-btn--variant-outlined`) SHALL have `border-radius: 980px` (pill shape).

Button toggle groups (`.v-btn-toggle`) SHALL have `border-radius: 8px`.

#### Scenario: Solid button border radius

- **WHEN** a solid (filled) button renders
- **THEN** it SHALL display with 8px border radius

#### Scenario: Outlined button pill shape

- **WHEN** an outlined button renders
- **THEN** it SHALL display with full pill border radius (980px)

### Requirement: Cards use Apple-style shadow and border

Cards (`.v-card`) SHALL have no border (`border: none`) and `border-radius: 8px`.

In dark mode, cards SHALL use `box-shadow: rgba(0, 0, 0, 0.22) 3px 5px 30px 0px`.

In light mode (`.v-theme--lightMode .v-card`), cards SHALL use `box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 12px`.

#### Scenario: Dark mode card shadow

- **WHEN** a card renders in dark mode
- **THEN** it SHALL display with a deep shadow and no visible border

#### Scenario: Light mode card shadow

- **WHEN** a card renders in light mode
- **THEN** it SHALL display with a subtle soft shadow and no visible border

### Requirement: Overwrite CSS is globally loaded

The file `assets/styles/overwrite.css` SHALL be listed in `nuxt.config.ts` under the `css` array to ensure global application of all visual overrides.

#### Scenario: CSS file loaded globally

- **WHEN** the Nuxt application starts
- **THEN** the overwrite CSS SHALL be applied to all pages and components
