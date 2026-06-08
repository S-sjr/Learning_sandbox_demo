# Learning Sandbox UI Design System

This design system defines the visual and component rules for Learning Sandbox. The product should feel like a low-fidelity pixel sandbox game for learning: playful, readable, sturdy, and built from clear square blocks.

## 1. Design Principles

- Square, not soft: UI controls use hard corners, thick outlines, and offset shadows. Avoid rounded cards and pill buttons.
- Game-like but readable: Komika Axis gives the interface personality, while generous letter spacing keeps English labels legible.
- Course progress is spatial: buildings, levels, tasks, and quiz completion should always feel connected to the map world.
- System over decoration: colors, icons, and panels should communicate state first, decoration second.
- Prototype clarity: every screen should make the next action obvious without tutorial text-heavy panels.

## 2. Color System

### Core Tokens

| Token | Hex / Value | Usage |
| --- | --- | --- |
| `--ink` | `#2f241f` | Primary text, thick borders, icon fill |
| `--muted` | `#695b50` | Secondary text, helper copy |
| `--panel` | `#fff8e7` | Modal and panel surfaces |
| `--shadow` | `rgba(47, 36, 31, 0.24)` | Hard offset shadows |
| `--accent` | `#d94f2f` | Primary action buttons |
| `--accent-dark` | `#96381f` | Primary button shadow |
| `--good` | `#4f9e4d` | Success and completion states |

### Terrain Tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `--grass` | `#8ccf61` | Buildable grass tile |
| `--grass-alt` | `#77bd55` | Alternate buildable grass tile |
| `--meadow` | `#9edb70` | Decorative flower terrain |
| `--dirt` | `#b98247` | Buildable project/lab terrain |
| `--sand` | `#d9c379` | Buildable water-edge terrain |
| `--water` | `#5eb6d9` | Water terrain |
| `--water-dark` | `#3f91b7` | Water stripe detail |
| `--forest` | `#3f8b4c` | Forest resource |
| `--hill` | `#8b8f70` | Hill resource |
| `--rock` | `#9ca09c` | Rock resource |

### Semantic Colors

- Primary action: `--accent` with `--accent-dark` shadow.
- Secondary action: `--panel` surface, `--ink` text, brown translucent shadow.
- Confirm/success action: `#3f8b4c` with `#2e6338` shadow.
- Danger/cancel action: `#d84a3a` with `#8f2f25` shadow.
- Disabled controls: `#c9c4bb` background, `#77716a` text, `#8f8981` shadow.
- Task completion: gold star background `#ffe16a`.
- Invalid placement: red outline `#e13f31`.
- Valid placement: cream outline `#fff8e7`.

## 3. Typography

### Font Stack

Primary font:

```css
font-family: "Learning Komika Axis", "Komika Axis", "KomikaAxis", Impact, "Arial Black", sans-serif;
```

Font loading should support:

```css
url("../assets/fonts/Komika%20Axis.ttf")
url("../assets/fonts/Komika-Axis.ttf")
url("../assets/fonts/KomikaAxis.ttf")
```

### Type Rules

- Global letter spacing: `2px`.
- Paragraph/helper text at `13px` uses tighter `1px` letter spacing for readability.
- Text casing: use short English labels; uppercase only for small labels such as `.eyebrow`.
- Body helper text uses `--muted` and tighter sizes.
- Avoid long paragraphs inside gameplay UI. Use concise labels and direct status text.

### Current Scale

| Element | Size | Weight | Notes |
| --- | --- | --- | --- |
| `h1` | `23px` | inherited heavy | HUD title |
| `h2` | `18px` | inherited heavy | Modal titles |
| `h3` | `15px` | inherited heavy | Card and row titles |
| `.eyebrow` | `11px` | `900` | Uppercase section label |
| `.quiet` | `13px` | inherited | Helper copy |
| HUD stat | `12px` | `900` | Compact counters |
| Building label | `11px` to `13px` | `900` | Must fit inside map footprint |

## 4. Icon System

### Icon Style

- Icons should be simple, filled, and readable at small sizes.
- Icons inherit the square, heavy-outline game language.
- Prefer one-color icons unless state color is required.
- Settings uses `setting.svg` as a square icon button.
- Task overview uses `toDoList.svg` as a square icon button.
- Build Course uses `construction.svg` as a larger square primary button with a white icon and `Blueprint` label.
- Close controls use `close.svg` inside square danger icon buttons.

### Icon Usage

- Icon-only buttons require an `aria-label`.
- Decorative images inside buttons use `alt=""` and `aria-hidden="true"`.
- Avoid emoji as final production icons. Current letter icons (`M`, `R`, `S`, `E`, `P`) are prototype placeholders.
- Use square icon containers with `3px` border when an icon needs framing.

### Current Icon Types

| Type | Current Use | Rule |
| --- | --- | --- |
| Gear SVG | Settings button | Square button, icon only |
| To-do SVG | Task overview button | Square button, icon only |
| Construction SVG | Build Course button | Larger square primary button, white icon with Blueprint label |
| Close SVG | Modal and page close buttons | Square danger icon button |
| Star mark | Task completion | Status marker, not manual completion |
| Course letters | Buildings | Placeholder until final subject icons exist |
| Terrain glyphs | Resource preview | Prototype only |

## 5. Layout and Spacing

### Base Grid

- Tile size: `20px`.
- Tile gap: `2px`.
- Grid padding: `10px`.
- Map size: `100 x 100` tiles.

### Border and Shadow

- Major panels: `4px solid --ink`, `6px 6px 0 --shadow`.
- Buttons: `3px solid --ink`, `4px 4px 0` shadow.
- Small icon buttons: `3px solid --ink`, `3px 3px 0` shadow.
- Resource outlines: `4px` exposed edge segments.

### Surfaces

- Main panels use `--panel`.
- Header bands use `#f6cf74`.
- List and row surfaces alternate between `#fff8e7` and `#fff2c8`.
- Hover surfaces use `#ffe9a6`.

## 6. Atomic Design

### Atoms

Atoms are the smallest reusable primitives.

- Color tokens
- Type tokens
- Tile
- Button border and shadow
- Icon container
- Star marker
- Tag
- Toggle
- Range slider
- Select input
- Text labels: `.eyebrow`, `.quiet`

Rules:

- All atoms are square-cornered.
- Atoms should not introduce new shadows or border widths without becoming a named token.
- Inputs should use `--accent` for active or selected states.

### Molecules

Molecules combine atoms into small functional units.

- Primary button with icon
- Secondary task button
- Danger button
- Confirm button
- Course card
- Task row
- Quiz option row
- Settings row
- HUD stat group
- Resource preview row
- Building info summary

Rules:

- Molecules should use one clear action or state.
- Rows use `2px` or `3px` borders depending on importance.
- Hover should change background, not shape.

### Organisms

Organisms are larger interface blocks.

- Map HUD
- FAB stack
- Settings modal
- Course selection modal
- Task modal
- Quiz page
- Resource bottom panel
- Building info bottom panel
- Placement bar
- Celebration modal

Rules:

- Organisms should have stable placement.
- Modals use a sticky header when content can scroll.
- Bottom panels are for contextual map information.
- Full-screen pages are reserved for focused modes such as quiz.

### Templates

Templates define screen structures.

- Map Home: world stage, HUD, settings button, action stack.
- Modal Workflow: backdrop, centered modal, sticky header, content list.
- Bottom Panel Workflow: contextual map detail anchored to bottom.
- Quiz Workflow: full-screen page, quiz header, summary, questions, actions.
- Settings Workflow: modal with category navigation and settings panel.

### Pages

Current pages:

- Home Map
- Quiz Page
- Settings Modal
- Course Build Modal
- Task Board Modal
- Resource Info Panel
- Building Info Panel

## 7. Component Rules

### Buttons

Common button rules:

- No border radius.
- Use `inline-flex` or `grid` center alignment.
- Minimum height: `42px` for text buttons.
- Border: `3px solid --ink`.
- Primary shadow offset: `4px 4px 0`.
- Active state moves by `3px, 3px` and reduces shadow.

Button variants:

- Primary: red-orange fill, cream text.
- Secondary: cream fill, ink text.
- Confirm: green fill, cream text.
- Danger: red fill, cream text.
- Icon-only: square, framed, with accessible label.
- Disabled: grey fill, grey text, no hover brightness.

### Panels and Modals

- Use `4px` ink border.
- Use hard `6px` shadow.
- Header background: `#f6cf74`.
- Keep content dense but scannable.
- Avoid cards inside cards.

### Forms and Settings

- Settings categories: Sound, Display, Privacy, Account, Other.
- Sound uses sliders for Master Volume, Sound Effects, and Music.
- Other contains the `Production Team` placeholder button.
- Controls are visual placeholders until persistence is added.

### Quiz

- Task rows open a quiz page.
- A task is complete only after the quiz condition is met.
- Current condition: at least `2/3` correct.
- Quiz options use bordered rows and selected state background.

### Map Buildings

- Buildings use thick borders, hard shadows, and level colors.
- Building state should be legible at small footprint sizes.
- Complete buildings show only the building name on the map.
- Constructing buildings show level, icon, label, and status.

## 8. State System

### Placement States

- Can place: cream outline and inset glow.
- Cannot place: red outline.
- Draft valid: stronger cream outline.
- Draft invalid: stronger red outline with red inset glow.

### Task States

- Not done: task row opens quiz.
- Done: gold star marker.
- Archived: task is no longer editable after the level is complete.

### Building States

- Building: dashed construction texture.
- Complete: simplified display.
- Selected: brightness lift and slight upward transform.

## 9. Accessibility

- Icon-only buttons must have `aria-label`.
- Decorative images inside buttons must be hidden from assistive tech.
- Buttons must remain actual `<button>` elements.
- Text must not overlap at mobile widths.
- Avoid relying on color alone for invalid/valid placement; pair with outlines and row text where possible.
- Keep hit targets at least `42px` for primary controls.

## 10. Implementation Notes

The current design system is implemented mainly in:

- `src/styles.css`: tokens, layout, component styling, states.
- `index.html`: semantic page and modal structure.
- `src/app.js`: dynamic component rendering and state-driven UI.
- `assets/icons/setting.svg`: settings icon asset.
- `assets/icons/toDoList.svg`: task overview icon asset.
- `assets/icons/construction.svg`: build course icon asset.
- `assets/icons/close.svg`: close button icon asset.

When adding new UI, first check whether it can be built from existing atoms and molecules. Add new tokens only when the existing system cannot express the needed state clearly.
