## Quick repo snapshot

- Purpose: a drag-and-drop ordering game for a configurable number of process steps (currently 9). Built as a static single-page app (vanilla JS, no frameworks). Core files: `index.html`, `style.css`, `script.js`, `data.json`.
- Runtime: client-side JS. `script.js` fetches `data.json` so serve the files over HTTP (see "Dev / run").
- Target: Chrome desktop/mobile with touch and mouse support. Must work **offline** (all assets local, no CDN dependencies).

## Big-picture architecture

- Single-page static app: all logic is in `script.js`. UI is defined in `index.html` and styled in `style.css`.
- Data-driven: `data.json` contains `elements` (cards), `correctOrders`, `partialOrders`, and `feedback`. Changes to game content and scoring are made here.
- Custom drag/drop: Uses **Pointer Events API** (not HTML5 drag/drop) for cross-device compatibility (mouse + touch). See `handlePointerDown`, `handlePointerMove`, `handlePointerUp` in `script.js`.

## Key files and hot spots to edit

- `data.json` — add / edit card entries under `elements` (fields: `id`, `title`, `subtitle`, `info`, `special`). Update `correctOrders` / `partialOrders` for scoring and feedback.
- `script.js` — core areas:
  - createCards(elements): builds DOM cards from `data.json`.
  - Drag/drop: handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel, finalizeDrop.
  - Completion/evaluation: checkCompletion(), evaluateSequence() — update these if you change how ordering or scoring works.
  - Helpers: positionCardRandomly, storePoolPosition, snapToPoolPosition, placeCardInSlot.
- `index.html` — placeholder slots are explicit DOM nodes (many `.placeholder-slot` entries). Adjust the number/order here if you change game length.

## Project-specific patterns & conventions

- **Data attributes drive behavior**: cards use `data-id`, `data-special` and `data-slotIndex`. Placeholder slots use `data-index` and `data-cardId`.
- **The special card (communication)** is marked via `special: true` in `data.json` and `card.dataset.special === 'true'` in code:
  - **Cannot** be placed in normal slots; only dropped onto `.arrow-indicator.active` elements (arrows between filled adjacent slots).
  - Is **reusable** (dropping it on an arrow toggles the arrow's `.comm` class but does not consume the card; it stays in the pool).
  - Once applied to an arrow, the arrow state persists until reset or one of the adjacent slots is emptied.
- **Drag/drop swap logic**: 
  - Pool → empty slot: place card.
  - Pool → filled slot: **disallowed** (no drop).
  - Slot → slot: **swap** the two cards (even if target is filled).
  - Slot → pool: remove card from slot, place in pool at drop coords.
- **Arrows** (`.arrow-indicator`): appear between adjacent slots only when **both** slots are filled. Hidden (opacity:0, pointer-events:none) otherwise. Use `updateArrows()` after any card placement/removal.
- **Modals**: modal elements in `index.html` toggle via `aria-hidden` and `modal-open` on the document body; buttons use `data-close="<id>"` to close dialogs.
- **Inactivity timer**: 60s of no interaction → show inactivity modal. 10s more without response → auto-reset. Reset timer on any `pointerdown` or `keydown` event (see `registerActivity()` and `resetInactivityTimer()`).
- **Offline-first**: all assets (fonts, icons, images) must be local relative paths. No external CDN or network dependencies except optional analytics POST on confirm (wrapped in try/catch).

## Dev / run / debug (practical)

- Recommended (works reliably): run a simple HTTP server at the project root so fetch('data.json') succeeds.
  - Python (if available): `python -m http.server 8000`
  - Node (if you have http-server): `npx http-server . -p 8000`
- In VS Code, the Live Server extension also works and auto-reloads on save.
- Debugging tips: open browser DevTools → Console. The global `state` object in `script.js` contains runtime info (cards Map, data). Add breakpoints in `script.js` inside the drag/drop handlers or `evaluateSequence()` to inspect behavior.

## Small examples to follow

- **To add a new card**, update `data.json` elements with a unique `id` and a `special: true|false` flag. The UI will be rebuilt on reload.
- **To mark an arrow as active programmatically**: find the `.arrow-indicator` with the `data-index` you want and add the `active` class; the special card logic checks for arrows with `.active` before allowing drops.
- **Swapping cards**: when dragging a card from one slot to another filled slot, `finalizeDrop()` calls logic that appends the dragged card to the target slot and moves the occupant to the source slot (or pool if source was pool).
- **Pointer capture**: `card.setPointerCapture(event.pointerId)` ensures `pointermove` events follow the card even if pointer leaves its bounds. Release with `card.releasePointerCapture(event.pointerId)` on drop.

## Design constraints (from original spec)

- **Touch + mouse**: use Pointer Events API (not HTML5 drag/drop) for reliable touch/mouse support. Set `touch-action: none` on draggable elements to prevent scroll interference.
- **9 slots fixed**: the game always has 9 placeholder slots (hardcoded in `index.html`). If you change the number of steps, update the HTML manually (9 `.placeholder-slot` + 8 `.arrow-indicator` elements).
  - **Recommended refactor:** For better maintainability, consider generating the placeholder slots and arrow indicators dynamically in JavaScript based on the number of steps in `data.json`. This decouples the HTML structure from the game logic and allows the game length to be changed by editing only `data.json`.
- **Confirm flow**: when all 9 slots are filled, enable the "Confirm Order" button and optionally show the confirm modal. On confirm, `evaluateSequence()` compares the slot order to `correctOrders` and `partialOrders` arrays.
- **Partial credit**: `partialOrders` in `data.json` can have custom feedback per sequence. If a user's order matches a partial sequence, show that specific feedback; otherwise fall back to generic incorrect message.
- **Info modal**: clicking the info icon (`.info-icon`) opens a modal with `element.info` HTML content. While modal is open, dragging is implicitly disabled (overlay catches pointer events).
- **Reset behavior**: reset clears all slots, removes all arrow states (`.active`, `.comm`), repositions cards randomly in pool, and hides any open modals. Optionally prompt for confirmation before resetting (see `#reset-modal`).

## Notes for AI agents

- Prefer minimal, localized edits. Changing drag/drop math or DOM structure in `script.js` affects many behaviors — run the app and test interactive flows after edits.
- Preserve existing DOM data-attributes and ARIA attributes when refactoring; they are used by the script for behavior and accessibility.
- If a change requires serving new static assets (e.g., images), update `index.html` and `assets/` and verify paths.

If any of this is incomplete or you want the agent to add a small developer script (example: `start-server.ps1`), say which you prefer and I will add it.
