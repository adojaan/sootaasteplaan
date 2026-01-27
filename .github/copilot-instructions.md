## Custom fonts

- All custom fonts are in `assets/fonts/` (Regar Demo, Bogle in .woff/.otf/.ttf formats)
- Fonts are loaded via `@font-face` in `style.css` (see top of file)
- Usage:
  - Regar Demo: game title (`.game-title`)
  - Bogle Bold: card title (`.card-title`)
  - Bogle Regular: card text (default for `.card`)
  - Bogle Italic: card subtitle (`.card-subtitle`)
- To add new fonts, place files in `assets/fonts/` and add a new `@font-face` rule in `style.css`
## Quick repo snapshot

- Purpose: a drag-and-drop ordering game for bog restoration process steps (currently 10 slots + 1 special card). Built as a static single-page app (vanilla JS, no frameworks). Core files: `index.html`, `style.css`, `script.js`.
- Runtime: client-side JS. Game data is embedded inline in `script.js` (no external JSON fetch).
- Target: Edge/Chrome/Firefox desktop with touch and mouse support. Must work **offline** (all assets local, no CDN dependencies except Chart.js in statistika.php).
- Deployment: Windows kiosk mode via `start-kiosk.bat` or `start-kiosk-local.bat`.

## Big-picture architecture

- Single-page static app: all logic is in `script.js`. UI is defined in `index.html` and styled in `style.css`.
- Data-driven: `gameData` object in `script.js` contains `elements` (cards), `validationRules` (phase-based), and `feedback`. Changes to game content and scoring are made there.
- Custom drag/drop: Uses **Pointer Events API** (not HTML5 drag/drop) for cross-device compatibility (mouse + touch). See `handlePointerDown`, `handlePointerMove`, `handlePointerUp` in `script.js`.
- Kiosk mode: `kioskConfig` in `script.js` controls right-click blocking, text selection prevention, and backdoor exit (long-press special card info icon).
- Logging: `loggingConfig` in `script.js` sends session data to `log.php` on confirm or inactivity reset.

## Key files and hot spots to edit

- `script.js` — core areas:
  - `gameData.elements`: card definitions (id, title, subtitle, info, special, autoComm)
  - `gameData.validationRules.phases`: phase-based validation logic
  - `kioskConfig`: kiosk mode settings
  - `loggingConfig`: remote logging endpoint
  - Drag/drop: handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel, finalizeDrop
  - Completion/evaluation: checkCompletion(), evaluateSequence()
  - Auto-comm animation: animateSpecialCardToArrow()
- `style.css` — `.card.special` has inline SVG background for arrow shape
- `index.html` — 10 `.placeholder-slot` elements + 9 `.arrow-indicator` elements
- `start-kiosk.bat` / `start-kiosk-local.bat` — Windows kiosk launchers (Edge/Chrome/Firefox)
- `auto-update.bat` — Git pull with conditional browser restart
- `log.php` — Server-side CSV logging
- `statistika.php` — Statistics dashboard (uses Chart.js CDN)

## Project-specific patterns & conventions

- **Data attributes drive behavior**: cards use `data-id`, `data-special` and `data-slotIndex`. Placeholder slots use `data-index` and `data-cardId`.
- **The special card (suhtlus/communication)** is marked via `special: true` in gameData:
  - **Cannot** be placed in normal slots; only dropped onto `.arrow-indicator.active` elements.
  - Is **reusable** (stays in pool after applying to arrow).
  - Cards with `autoComm: true` trigger automatic arrow highlighting with flying animation.
- **Validation uses phases**, not fixed correct order:
  - Position 0: oneOf `["tahame_taastada", "mis_on_lugu"]`
  - Positions 1-4: conditional mustContainAll (depends on position 0)
  - Positions 5-6: mustContainAll `["arvuti_mudel", "taastamiskava"]` anyOrder
  - Position 7: mustBe `"ehitusprojekt"`
  - Position 8: mustBe `"teoks_tegemine"`
  - Position 9: mustBe `"jarelevalve"`
- **Mistake counting**: 0 mistakes = correct, 1-2 = partial, 3+ = incorrect
- **Arrows** (`.arrow-indicator`): visible only when both adjacent slots filled. `.comm` class = orange color.
- **Inactivity timer**: 60s → inactivity modal. 10s more → log + hard page reload (picks up git pull changes).
- **Kiosk backdoor**: Long-press (3s) on reset button ("Alusta uuesti") to exit kiosk mode.

## Kiosk deployment files

| File | Purpose |
|------|---------|
| `start-kiosk.bat` | Launch kiosk with remote URL (or custom URL as argument) |
| `start-kiosk-local.bat` | Launch kiosk with local index.html (auto-detects path) |
| `start-kiosk.ps1` | PowerShell version of above |
| `auto-update.bat` | Git pull, restart browser only if changes detected |

Browser priority: Edge → Chrome → Firefox. Uses separate profile (`%TEMP%\KioskProfile`) to not interfere with user's browser.

## Dev / run / debug

- **Development server**: `python -m http.server 8000` (NOT Node.js) or VS Code Live Server
- For kiosk testing: `start-kiosk-local.bat` (runs local file directly)
- Debug: browser DevTools → Console. `window.testGame` has helpers:
  - `testGame.testCorrect()` — fill all slots correctly
  - `testGame.testPartial()` — fill with 1-2 mistakes
  - `testGame.reset()` — reset game
  - `testGame.evaluate()` — trigger evaluation

## Server-side files

- `log.php` — receives POST with session data, appends to `game_logs.csv`
- `statistika.php` — reads CSV, shows charts (pie, line, bar) and 10×10 heatmap
- CSV format: datetime, ip, trigger, feedback_result, slot_ids (semicolon-separated), usage_time_seconds

## Notes for AI agents

- Game data is now inline in `script.js`, not in external `data.json`
- 10 slots (not 9) — index.html has 10 placeholder-slot elements
- Preserve kiosk/logging config at top of script.js when editing
- Kiosk scripts support Edge, Chrome, Firefox — test accordingly
- Statistics page uses Chart.js from CDN (only exception to offline-first rule)
