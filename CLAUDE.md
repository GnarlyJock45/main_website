# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Azwa (عزوة)** — an Arabic-first (RTL) mobile-web prototype for a Riyadh entertainment rewards card. Multi-page static site backed by Supabase for auth, catalog, wallet, favorites, and bookings. Built as a hackathon prototype; UI copy and toasts are in Arabic.

## Running

No build step, no package manager. It's a static site of ES-module HTML pages. Open with any static server from the repo root:

```powershell
# any of these work
python -m http.server 5500
npx serve .
```

Then browse to `http://localhost:5500/index.html`. Opening files with `file://` will break because `js/app.js` is loaded as an ES module and imports from a CDN.

There are no tests, no linter, no CI.

## Architecture

### Pages
Five hand-authored HTML pages share one script and one stylesheet:

- [index.html](index.html) — home (hero card, popular events, nearby categories)
- [events.html](events.html) — full catalog with category chips + search
- [calendar.html](calendar.html) — month grid + day agenda
- [map.html](map.html) — venue list with embedded Google Maps iframe
- [more.html](more.html) — profile, wallet, card link, settings, support

Every page ends with `<script type="module" src="js/app.js"></script>`. The script inspects the DOM (via `data-render="..."`, `data-agenda`, etc.) to decide which page-specific renderers to run — there is no router.

### JS layer
Three modules in [js/](js/):

- [js/config.js](js/config.js) — Supabase URL + publishable anon key. Safe to commit; RLS enforces per-user access.
- [js/api.js](js/api.js) — the **only** place that talks to Supabase. Wraps auth, `profiles`, `wallets`, `cards`, `events`, `favorites`, `bookings`, and two RPCs: `recharge_wallet` and `book_event` (atomic wallet writes).
- [js/app.js](js/app.js) — everything else: data seed, renderers, sheet (bottom-drawer) system, auth wiring, toasts, calendar, event details.

**Never call `supabase` directly from `app.js` or new page code.** Add a thin wrapper in `api.js` and call that. `api.js` throws raw Supabase errors; `app.js` maps them to Arabic strings via `friendlyError()` in [js/app.js:716](js/app.js#L716).

### State model
`app.js` holds a single `state` object (guest defaults in `GUEST_STATE`). On boot:

1. `injectSharedSheets()` appends all bottom-sheet dialogs (recharge, event, signin, profile, card, support) into `.app`. Pages don't declare their own — they rely on this injection.
2. `bootAuth()` reads the Supabase session; if signed in, `hydrateFromServer()` fetches profile/wallet/card/favorites/bookings in parallel and replaces `state`. On failure, `setGuestState()`.
3. `api.onAuthChange()` re-hydrates when the session changes (other tabs, refresh, sign-out).
4. `loadEventsFromServer()` replaces the offline `EVENTS` seed and re-renders. The seed exists so the first paint shows content before the network responds — do not remove it.

Any mutation must call `refreshAll()` (renders home stats + auth labels). Renderers read `state` directly; they don't take it as a parameter.

### Backend (Supabase)
Schema is not tracked in this repo. Tables referenced by `api.js`: `profiles`, `wallets`, `cards`, `events`, `favorites`, `bookings`. RPCs: `recharge_wallet(p_amount)`, `book_event(p_event_id, p_quantity)`. When schema changes are needed, use the Supabase MCP tools (`list_tables`, `apply_migration`, etc.) against project `wtaveucbqvppddckihqy`. RLS is assumed to gate all reads/writes per user.

### RTL / i18n
The site is Arabic-only, `dir="rtl"`. Numbers are formatted with `enDigits`/`arDigits` helpers ([js/app.js:283](js/app.js#L283)). When adding icons or layout, remember `inset-inline-start` / `inset-inline-end` semantics — logical properties are used throughout [css/styles.css](css/styles.css).

### Conventions to preserve
- **Optimistic UI**: favorite toggling in `wireEventTriggers()` flips UI first, then rolls back on API error — mirror that pattern for other write actions.
- **Auth gate**: user-writing actions must call `requireAuth(msg)` before hitting the API; it toasts and opens the sign-in sheet.
- **Sheets**: use `openSheet(el)` / `closeSheet(el)` — they handle body scroll lock, focus, and Escape. Never toggle `.open` directly.
- **Toasts**: single global `toast(msg, 'success'|'error')`. Do not build ad-hoc alert UI.
- **Icons**: prefer entries in the `ICONS` map ([js/app.js:309](js/app.js#L309)) over inline SVG duplicates.

## Team / delegation

The user's global CLAUDE.md defines a lead-engineer orchestration pattern with these subagents available in [.claude/agents/](.claude/agents/): `architect`, `planner`, `code-reviewer`. When a task cleanly matches one specialty (design, backend schema, review), delegate rather than doing it inline.
