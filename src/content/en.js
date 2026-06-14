// =============================================================================
// NON Academy — English course content (base language, fully populated).
//
// EVERYTHING user-facing is data here, not hardcoded in components. To add a
// market, copy this file to <code>.js, translate the strings, and register it in
// content/registry.js. Keep the NON1–NON9 codes and the NON logotype as-is in
// every language.
//
// DRAFT COPY: tasting notes, pairings, glassware and serve temperatures are my
// considered drafts in the NON voice, NOT approved fact. Every one is flagged
// `draft: true` and surfaces a visible DRAFT badge in the app. Replace with
// Aaron's real content. A full list lives in content/PLACEHOLDERS.md.
//
// Voice: direct, considered, confident. AU English. No mocktail language, no
// emojis, no em dashes.
// =============================================================================

// ----------------------------------------------------------------- the six SKUs
// `code` (NON1…) never translates. `name`, the flavour descriptor, MAY be
// localised per market. still/sparkling is fact, not draft.
export const skus = [
  {
    id: 'NON1',
    code: 'NON1',
    name: 'Salted Raspberry & Chamomile',
    format: 'Sparkling',
    still: false,
    draft: true,
    tasting:
      'Raspberry led, with a saline edge that keeps it dry. Chamomile softens the finish. Bright, not sweet.',
    glassware: 'White wine stem',
    serveTemp: '6 to 8 C, well chilled',
    pairings: ['Cured salmon', 'Goats cheese', 'Tomato and burrata'],
  },
  {
    id: 'NON2',
    code: 'NON2',
    name: 'Caramelised Pear & Kombu',
    format: 'Sparkling',
    still: false,
    draft: true,
    tasting:
      'Roasted pear and a deep umami base from kombu. Savoury and rounded, with a long, dry finish.',
    glassware: 'White wine stem',
    serveTemp: '6 to 8 C, well chilled',
    pairings: ['Roast chicken', 'Mushroom risotto', 'Aged hard cheese'],
  },
  {
    id: 'NON3',
    code: 'NON3',
    name: 'Toasted Cinnamon & Yuzu',
    format: 'Still',
    still: true,
    draft: true,
    tasting:
      'Warm toasted spice lifted by sharp yuzu citrus. Still, textural, with grip on the finish.',
    glassware: 'Red wine stem',
    serveTemp: '10 to 12 C, lightly chilled',
    pairings: ['Duck', 'Pork belly', 'Squash and sage'],
  },
  {
    id: 'NON5',
    code: 'NON5',
    name: 'Lemon Marmalade & Hibiscus',
    format: 'Sparkling',
    still: false,
    draft: true,
    tasting:
      'Bitter lemon marmalade over floral hibiscus. Tart and aromatic, with a clean, bracing finish.',
    glassware: 'White wine stem',
    serveTemp: '6 to 8 C, well chilled',
    pairings: ['Oysters', 'Ceviche', 'Fried chicken'],
  },
  {
    id: 'NON7',
    code: 'NON7',
    name: 'Stewed Cherry & Coffee',
    format: 'Sparkling',
    still: false,
    draft: true,
    tasting:
      'Dark stewed cherry with a roasted coffee backbone. The most red-wine-like of the sparkling range. Dry and structured.',
    glassware: 'Red wine stem',
    serveTemp: '8 to 10 C',
    pairings: ['Charcuterie', 'Beef', 'Dark chocolate'],
  },
  {
    id: 'NON9',
    code: 'NON9',
    name: 'Oaked Blackberry & Plum',
    format: 'Still',
    still: true,
    draft: true,
    tasting:
      'Ripe blackberry and plum carried on soft oak. Still, full bodied, with tannic structure that reads like a red.',
    glassware: 'Red wine stem',
    serveTemp: '12 to 14 C',
    pairings: ['Lamb', 'Aged cheese', 'Slow braises'],
  },
]

// --------------------------------------------------------- the Product Mastery
// module: the reference standard, built end to end.
const productMastery = {
  id: 'product-mastery',
  track: 'shared',
  status: 'ready',
  eyebrow: 'Shared core',
  title: 'Product Mastery',
  summary:
    'The six SKUs, how to taste them, and how to place them. The foundation for every conversation, in any role.',
  objectives: [
    'Name all six NON SKUs and state whether each is still or sparkling.',
    'Describe the lead flavour and the structure of each SKU in one sentence.',
    'Match each SKU to at least one dish or course.',
    'Explain why NON is poured in stemware and listed beside the wine, not the soft drinks.',
  ],
  segments: [
    {
      id: 'the-six',
      title: 'The six, at a glance',
      minutes: 5,
      body: [
        'NON makes six. Not a wall of flavours, a considered range. Four sparkling, two still. Learn them as a set and you can navigate any list or fridge from memory.',
        'Sparkling: NON1 Salted Raspberry & Chamomile, NON2 Caramelised Pear & Kombu, NON5 Lemon Marmalade & Hibiscus, NON7 Stewed Cherry & Coffee. Still: NON3 Toasted Cinnamon & Yuzu, NON9 Oaked Blackberry & Plum.',
        'The codes never change and never translate. NON7 is NON7 in Melbourne, Berlin and Tokyo. The flavour names help you remember; the code is what you sell.',
      ],
      points: [
        'Four sparkling, two still.',
        'NON7 and NON9 carry the most structure. They read closest to red wine.',
        'The number is the name. Lead with it.',
      ],
    },
    {
      id: 'reading-a-non',
      title: 'Structure, not sweetness',
      minutes: 5,
      body: [
        'NON is built like wine, not like a soft drink. Taste for the same things: aroma, acidity, texture, length. Sweetness is not the point, and calling it a mocktail undersells it.',
        'Scenario. A guest says "I do not drink, so just give me a lemonade." You pour NON5 into a white wine glass and say: bitter lemon marmalade, floral hibiscus, finishes dry. They taste structure where they expected sugar. That is the trade up.',
        'Run every SKU through the same four-part read and you can describe anything in the range in one confident sentence.',
      ],
      points: [
        'Aroma first. Then acidity, texture, length.',
        'Dry is a feature. Say it out loud.',
        'Never "mocktail". It is on the wine list for a reason.',
      ],
    },
    {
      id: 'sparkling',
      title: 'The sparkling four',
      minutes: 5,
      body: [
        'NON1 is the aperitif. Raspberry led, saline edge, bright and dry. The easy first pour.',
        'NON2 is the savoury one. Caramelised pear over a kombu umami base, rounded and long. It surprises people.',
        'NON5 is the sharpest. Bitter lemon marmalade and hibiscus, tart and aromatic. Built for shellfish and fried, salty food.',
        'NON7 is the boldest sparkling. Stewed cherry and roasted coffee, dry and structured. Reach for it when a guest wants something that drinks like red.',
      ],
      points: [
        'NON1 to open, NON5 to cut through salt and fat.',
        'NON2 for savoury plates and umami.',
        'NON7 when they ask for "something like a red".',
      ],
    },
    {
      id: 'still',
      title: 'The still two',
      minutes: 5,
      body: [
        'NON3 Toasted Cinnamon & Yuzu. Warm spice lifted by sharp citrus, still and textural with grip on the finish. Serve lightly chilled in a red wine glass.',
        'NON9 Oaked Blackberry & Plum. Ripe dark fruit on soft oak, full bodied with tannic structure. This is the one you pour for a committed red drinker.',
        'Scenario. A table is finishing on lamb and one guest is not drinking. NON9, red wine glass, served at cellar temperature. It holds its own next to the bottle the rest of the table is sharing.',
      ],
      points: [
        'Both still SKUs go in red wine stems.',
        'NON9 carries tannin. It pairs with red meat and braises.',
        'NON3 bridges spice and citrus. Strong with duck and squash.',
      ],
    },
    {
      id: 'pairing-principles',
      title: 'Pairing like a somm',
      minutes: 5,
      body: [
        'Pair NON the way you pair wine. Match weight to weight, use acidity to cut richness, and let structure stand up to protein.',
        'Light and bright with delicate plates: NON1 and NON5 with raw fish, shellfish and fresh cheese. Savoury and rounded with mushroom, roast chicken, umami: NON2. Structured with red meat and braises: NON7, and the still NON9.',
        'You do not need a perfect match. You need a confident one. Name the SKU, name the dish, pour it in the right glass.',
      ],
      points: [
        'Weight to weight, acidity against richness.',
        'Sparkling for fresh and fried; still for red meat.',
        'A confident pairing beats a perfect one.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Pour NON3 and NON7 side by side in the correct glassware. Write one tasting sentence for each in the NON voice, then name one dish you would pair with each. Keep it dry, considered, and free of mocktail language.',
  },
  quiz: {
    id: 'product-mastery',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'Which two SKUs are still rather than sparkling?',
        options: [
          'NON1 and NON5',
          'NON3 and NON9',
          'NON2 and NON7',
          'NON5 and NON7',
        ],
        answer: 1,
        explanation: 'NON3 Toasted Cinnamon & Yuzu and NON9 Oaked Blackberry & Plum are the two still SKUs.',
      },
      {
        id: 'q2',
        prompt: 'A guest wants something that drinks like a red wine alongside lamb. What do you pour?',
        options: [
          'NON1 in a flute',
          'NON5 over ice',
          'NON9 in a red wine stem',
          'NON2 in a tumbler',
        ],
        answer: 2,
        explanation: 'NON9 is full bodied with tannic structure and pairs with red meat. Serve it in a red wine glass.',
      },
      {
        id: 'q3',
        prompt: 'Which SKU leads with a savoury, umami character from kombu?',
        options: ['NON1', 'NON2', 'NON5', 'NON7'],
        answer: 1,
        explanation: 'NON2 Caramelised Pear & Kombu is the savoury, umami-led SKU in the range.',
      },
      {
        id: 'q4',
        prompt: 'How should you describe NON to a sceptical guest expecting a sweet soft drink?',
        options: [
          'As a refreshing mocktail alternative',
          'As a low-sugar fizzy drink',
          'As a structured, dry drink built like wine, poured in stemware',
          'As a fruit juice with bubbles',
        ],
        answer: 2,
        explanation: 'NON trades up. Describe structure and dryness, pour it in the right glass, and never call it a mocktail.',
      },
      {
        id: 'q5',
        prompt: 'Which pairing follows sound principle?',
        options: [
          'NON5 with rich braised beef',
          'NON1 or NON5 with oysters and shellfish',
          'NON9 with delicate raw fish',
          'NON2 with nothing, it does not pair',
        ],
        answer: 1,
        explanation: 'The bright, high-acid sparkling SKUs cut through salt and brine. NON1 and NON5 work with shellfish.',
      },
    ],
  },
}

// ---------------------------------------------------- remaining architecture
// These modules are scaffolded and visible so the full course shape is clear.
// They are marked `status: 'planned'` and locked until built to the standard
// set by Product Mastery. Objectives are written now as observable outcomes.
const planned = (over) => ({
  status: 'planned',
  segments: [],
  objectives: [],
  ...over,
})

export const modules = [
  // shared core
  planned({
    id: 'brand-story',
    track: 'shared',
    eyebrow: 'Shared core',
    title: 'Brand Story',
    summary: 'Why premium non-alcoholic exists, and the case for trading up rather than down.',
    objectives: [
      'Explain in one sentence why NON exists and who it is for.',
      'State the trade-up positioning without using mocktail language.',
    ],
  }),
  productMastery,
  planned({
    id: 'category-context',
    track: 'shared',
    eyebrow: 'Shared core',
    title: 'Category & Market Context',
    summary: 'Where non-alcoholic sits today, who is drinking it, and why venues are listing it.',
    objectives: [
      'Describe the growth of the premium non-alcoholic category in one or two facts.',
      'Identify three guest occasions where NON wins the sale.',
    ],
  }),
  // rep track
  planned({
    id: 'rep-list-placement',
    track: 'rep',
    eyebrow: 'Rep track',
    title: 'List Placement & the Venue Pitch',
    summary: 'Win the listing and place NON beside the wine, not the soft drinks.',
    objectives: ['Deliver a 60-second venue pitch that lands the trade-up positioning.'],
  }),
  planned({
    id: 'rep-reading-program',
    track: 'rep',
    eyebrow: 'Rep track',
    title: 'Reading a Beverage Program',
    summary: 'Read a venue list and find the gap NON fills.',
    objectives: ['Audit a beverage list and name the placement opportunity for NON.'],
  }),
  planned({
    id: 'rep-objections',
    track: 'rep',
    eyebrow: 'Rep track',
    title: 'Commercial Objection Handling',
    summary: 'Price, fridge space, and "we already have something".',
    objectives: ['Respond to the three most common objections with a confident, specific answer.'],
  }),
  planned({
    id: 'rep-distributor',
    track: 'rep',
    eyebrow: 'Rep track',
    title: 'Distributor & Reorder Conversations',
    summary: 'Keep stock moving and reorders flowing.',
    objectives: ['Run a reorder conversation that protects shelf presence.'],
  }),
  planned({
    id: 'rep-account-planning',
    track: 'rep',
    eyebrow: 'Rep track',
    title: 'Account Planning',
    summary: 'Build and work a territory with intent.',
    objectives: ['Build a simple account plan for a target venue.'],
  }),
  // venue track
  planned({
    id: 'venue-recommending',
    track: 'venue',
    eyebrow: 'Venue track',
    title: 'Recommending NON to a Guest',
    summary: 'Read the table and make the call.',
    objectives: ['Recommend a specific SKU to a guest based on what they are eating.'],
  }),
  planned({
    id: 'venue-trade-up',
    track: 'venue',
    eyebrow: 'Venue track',
    title: 'The Trade-Up Conversation',
    summary: 'Turn "just a water" into a considered pour.',
    objectives: ['Convert a default soft-drink request into a NON recommendation.'],
  }),
  planned({
    id: 'venue-serve-ritual',
    track: 'venue',
    eyebrow: 'Venue track',
    title: 'Pour, Temperature & Glassware Ritual',
    summary: 'Serve NON with the same ritual as wine.',
    objectives: ['Serve each SKU at the right temperature, in the right glass, with the right ritual.'],
  }),
  planned({
    id: 'venue-pairing-menu',
    track: 'venue',
    eyebrow: 'Venue track',
    title: 'Pairing to a Real Menu',
    summary: 'Pair the range across an actual menu.',
    objectives: ['Pair at least four SKUs to courses on a working menu.'],
  }),
  planned({
    id: 'venue-sceptical-guest',
    track: 'venue',
    eyebrow: 'Venue track',
    title: 'Handling the Sceptical Guest',
    summary: 'Win over the guest who expects sugar water.',
    objectives: ['Turn a sceptical guest into a confident NON drinker in one exchange.'],
  }),
]

// ----------------------------------------------------------- certifications
export const certifications = {
  venue: {
    id: 'venue',
    title: 'NON Certified Sommelier',
    threshold: 80,
    intro:
      'Pass the venue certification to earn the NON Certified Sommelier badge and unlock the on-shift quick-reference cards.',
    requires: ['product-mastery'],
  },
  rep: {
    id: 'rep',
    title: 'NON Rep Accreditation',
    threshold: 80,
    intro:
      'Pass the rep certification to earn your NON Accreditation tier.',
    requires: ['product-mastery'],
  },
}

export default { skus, modules, certifications }
