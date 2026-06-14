# NON Academy

Mobile-first training and certification for NON sales reps and venue staff.
Trade up, not down.

Built to match the NON web stack: React + Vite frontend on **Cloudflare Pages**,
optional logic on **Cloudflare Workers** (Pages Functions), deployed with
`wrangler`. Same house style as the existing `non-ar` and `maps` projects
(Helvetica, white-on-dark, the NON wordmark).

## Run it

```bash
npm install
npm run dev      # vite dev server
npm run build    # outputs dist/
npm run deploy   # builds and deploys to Cloudflare Pages (project: non-academy)
```

## What's built (reference standard)

- Role selector (Venue / Rep) routing to the right track over a shared core.
- App shell with the NON logotype and a persistent **language switcher**.
- **Product Mastery** module, end to end: observable objectives, five
  5-minute scenario segments, a practical task, and a formative quiz with a pass
  threshold.
- **Quick-reference** SKU cards: glassware, serve temp, pairings, tasting notes.
  Offline-readable; the two-tap on-shift companion after certification.
- **Certification** flow: pass the quiz to earn the badge (NON Certified
  Sommelier / NON Rep Accreditation), which unlocks the pinned quick reference.
- Progress with **autosave + resume** (localStorage), with a Worker+KV sync stub
  ready in `functions/api/cert.js`.

Every other module (Brand Story, Category & Market Context, the five Rep and five
Venue modules) is **scaffolded and visible** so the full course shape is clear,
marked "Soon" until built to this standard.

## i18n

- Standard `i18next` / `react-i18next` for UI labels (`src/i18n/locales`).
- Course content is fully externalised per language under `src/content`.
- Selected language is saved to progress state, so it holds across sessions and
  across both tracks and quick-reference mode.

**Languages stubbed** (flagged for human translation, currently falling back to
English — never machine-translated):

| Code | Language  | Status |
|------|-----------|--------|
| en   | English   | Fully populated (base) |
| de   | Deutsch   | Stub — awaiting translation |
| fr   | Français  | Stub — awaiting translation |
| es   | Español   | Stub — awaiting translation |
| ja   | 日本語     | Stub — awaiting translation (also proves non-Latin layout) |

Untranslated locales show an honest "awaiting translation" banner. Layouts wrap
rather than clip, so longer German/French strings hold on the mobile cards.

### Add a market

1. `src/i18n/locales/<code>.js` — translate the UI labels (copy keys from
   `en.js`).
2. `src/content/<code>.js` — translate the course content (copy from `en.js`).
   Register it in `src/content/registry.js`.
3. `src/i18n/languages.js` — add the entry and set `translated: true`.

Keep the **NON1–NON9 codes** and the **NON logotype** untranslated everywhere.

## Draft content

Tasting notes, pairings, glassware and serve temperatures are drafts in the NON
voice, flagged with a `DRAFT` badge in-app. See
[`src/content/PLACEHOLDERS.md`](src/content/PLACEHOLDERS.md). Replace with
approved copy and remove the `draft` flag.
