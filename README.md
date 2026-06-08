# Learning Sandbox Low-Fidelity Prototype

This prototype tests the core idea of turning learning progress into a sandbox world. The focus is interaction flow, not final production art.

## How to Open

Open `index.html` directly in a browser.

## Project Structure

```text
.
├── index.html
├── src/
│   ├── app.js
│   └── styles.css
├── assets/
│   ├── icons/
│   │   ├── close.svg
│   │   ├── construction.svg
│   │   ├── setting.svg
│   │   └── toDoList.svg
│   └── fonts/
│       └── README.md
├── docs/
│   └── UI-DESIGN-SYSTEM.md
└── README.md
```

## Current Prototype Scope

- Full-screen 100 by 100 tile map.
- Drag to pan the map.
- Mouse wheel or pinch to zoom within fixed limits.
- Fixed map HUD in the upper-left corner.
- Fixed icon buttons for `Tasks` and `Build Course` in the lower-right corner.
- Fixed `SET` button in the upper-right corner for the settings framework.
- Settings framework includes Sound, Display, Privacy, Account, and Other sections.
- Credits is represented as a `Production Team` button placeholder inside Other.
- Terrain types: grass, meadow, dirt, sand, water, forest, hill, and rock.
- Natural resources can be selected to show a bottom information panel.
- Course buildings are selected from a centered build dialog.
- Building placement uses a bottom confirm/cancel bar.
- Valid placement highlights in cream; invalid placement highlights in red.
- Each course subject can only be built once.
- New buildings begin in a `Building` state.
- Clicking a building task opens its quiz page.
- A task is marked complete automatically after the quiz condition is met.
- The current prototype condition is a score of at least 2 out of 3.
- Completing all tasks finishes the current building level.
- Completed buildings can be upgraded.
- Upgrades create a new task set and finish only after all tasks are complete.
- Completed buildings show only their name on the map.
- Building levels use bronze, silver, gold, cyan, and red color states.

## Design Direction

- Font: Komika Axis.
- Button style: square corners, thick outline, hard offset shadow.
- Visual language: low-fidelity pixel sandbox with warm cream panels, earthy terrain colors, and red-brown primary actions.
- Content language: English.
- UI system: see `docs/UI-DESIGN-SYSTEM.md`.

## Interaction Goal

Students should understand that buildings are not just decoration. Each building represents a course, its current learning state, and its visible learning achievements.
