# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

모든 결과물과 설명은 반드시 한국어로 작성한다. 코드 주석, 커밋 메시지, 사용자 응답 등 모든 텍스트 출력은 한글을 기본으로 한다.

## Running the project

No build step or package manager. Open `calculator/index.html` directly in a browser:

```
start calculator/index.html   # Windows
```

For live-reload development, use any static file server (e.g., `npx serve calculator` or VS Code Live Server).

## Project structure

Single sub-project: `calculator/` — a vanilla HTML/CSS/JS web calculator with no dependencies beyond Google Fonts.

- `index.html` — markup only; buttons use `data-action` / `data-value` attributes for event delegation
- `script.js` — all logic; a single `state` object is the source of truth; DOM is only written via `updateDisplay()`
- `style.css` — dark-theme design system built on CSS custom properties (defined in `:root`)

## Architecture

**State machine (script.js)**

All calculator state lives in one `state` object:
- `current` (string) — the number shown on the display
- `previous` (number | null) — left operand held between operator press and `=`
- `operator` (string | null) — pending operator symbol (`+`, `−`, `×`, `÷`)
- `waitingNext` (bool) — next digit starts a fresh operand instead of appending
- `justEvaled` (bool) — next digit clears the expression (post-`=` behavior)

Event delegation on `#calculator` dispatches to five pure action functions (`inputNumber`, `inputDecimal`, `inputOperator`, `calculate`, `clearAll`, `toggleSign`, `applyPercent`). Keyboard events map through `keyMap` and also visually flash the matching button.

`formatNumber()` formats the string stored in `state.current` for display, with comma separators and automatic switch to scientific notation for very large/small values.

**Design tokens (style.css)**

All colors (`--bg`, `--surface`, `--op-color` `#c8ff00`, etc.) and timings (`--t-fast`, `--t-mid`) are CSS variables on `:root`. Edit those variables to retheme without touching component rules.
