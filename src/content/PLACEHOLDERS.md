# Placeholder content — needs Aaron's approved copy

Everything below is **draft copy written in the NON voice**, not approved fact.
Each item renders with a visible `DRAFT` badge in the app. Replace the values in
`src/content/en.js`, then remove `draft: true` from each SKU once signed off.

## Certification performance tasks (highest priority to confirm)

- **Venue exam, menu pairing task** (`certifications.venue.exam.questions[0].menu`):
  the three dishes and the `accept` (sound SKUs) per course are my drafts. Confirm
  or supply your own unseen menu; new menu is a content edit only.
- **Rep exam, beverage-list task** (`certifications.rep.exam.questions[0]`): the
  sample list, the gap answer, and the `accept` SKUs are drafts. Confirm or supply
  a real list.

## Worked examples (model performances)

- Every skill module now has a `workedExample` (a model pitch / recommendation /
  objection turn). These are drafts in the NON voice — review the wording.

## Other flagged placeholders

- Certification reward (`cert.rewardBody`) — set the real incentive.
- Team-wide completion needs the backend (KV/D1) — flagged `BACKEND` in the Team
  view; only the learner's own completion is real for now.

## SKU product specifics (all six are draft)

For each SKU the following four fields are draft and need confirming:
`tasting`, `glassware`, `serveTemp`, `pairings`.

| SKU  | Name (descriptor)              | Format    | Draft fields |
|------|--------------------------------|-----------|--------------|
| NON1 | Salted Raspberry & Chamomile   | Sparkling | tasting, glassware, serveTemp, pairings |
| NON2 | Caramelised Pear & Kombu       | Sparkling | tasting, glassware, serveTemp, pairings |
| NON3 | Toasted Cinnamon & Yuzu        | Still     | tasting, glassware, serveTemp, pairings |
| NON5 | Lemon Marmalade & Hibiscus     | Sparkling | tasting, glassware, serveTemp, pairings |
| NON7 | Stewed Cherry & Coffee         | Sparkling | tasting, glassware, serveTemp, pairings |
| NON9 | Oaked Blackberry & Plum        | Still     | tasting, glassware, serveTemp, pairings |

Confirmed as fact (not draft): the six codes, the flavour names, and still vs
sparkling.

## Module copy

All 13 modules are now built end to end (segments, objectives, practical task,
quiz). The copy is drafted in the NON voice for your review:

- **Shared core:** Brand Story, Product Mastery, Category & Market Context.
- **Rep track:** List Placement & the Venue Pitch, Reading a Beverage Program,
  Commercial Objection Handling, Distributor & Reorder Conversations, Account
  Planning.
- **Venue track:** Recommending NON to a Guest, The Trade-Up Conversation,
  Pour/Temperature & Glassware Ritual, Pairing to a Real Menu, Handling the
  Sceptical Guest.

### Inline [DRAFT] facts that need your real figures

- **Category & Market Context > "A category, not a fad"** — needs real NON
  market/category growth figures and sources.
- **Venue > Serve Ritual** and the SKU cards — confirm the glassware standard
  and exact serve temperatures per SKU.

## Completion incentive (needs your decision)

- The certification page shows a **"Your reward"** block with a `Set reward`
  DRAFT badge. Set the real reward in `src/i18n/locales/en.js` under
  `cert.rewardBody` (e.g. prize-draw entry, physical certificate, early SKU
  access). The data + trigger are built; only the reward text is a placeholder.

## Gamification values (confirm or adjust)

- XP per action and level thresholds/names live in `src/state/gamification.js`
  (`XP`, `LEVELS`). Levels are named Taster, Apprentice, Pourer, Server,
  Specialist, Sommelier, Master. Adjust freely.

## Email / transactional service (assumed)

- Assumed **Cloudflare Email Service** (Email Sending) for the certificate email,
  to keep everything on the existing Cloudflare stack. Not yet wired (that is the
  next phase). To enable when we build it you will need: a verified sender domain
  in Cloudflare Email, the DNS records (SPF/DKIM/DMARC) it provides, and a KV or
  D1 binding for the event funnel. Tell me if you would rather use Resend,
  Postmark or SendGrid instead.

## Certification copy

- Two final role exams (6 questions each) plus per-module quizzes. Pass threshold
  **80%** throughout — confirm.
- A track certifies only after every module in it is complete and the final exam
  is passed.
- Badge names: "NON Certified Sommelier" (venue), "NON Rep Accreditation" (rep).
