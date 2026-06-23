// =============================================================================
// NON Academy — English course content (base language, fully populated).
//
// EVERYTHING user-facing is data here, not hardcoded in components. To add a
// market, copy this file to <code>.js, translate the strings, and register it in
// content/registry.js. Keep the NON1–NON9 codes and the NON logotype as-is in
// every language.
//
// DRAFT COPY: tasting notes, pairings, glassware, serve temperatures and any
// commercial/category figures are considered drafts in the NON voice, NOT
// approved fact. SKU specifics are flagged `draft: true` and surface a visible
// DRAFT badge. Copy that needs a real figure or fact is marked inline with
// [DRAFT]. A full list lives in content/PLACEHOLDERS.md.
//
// Voice: direct, considered, confident. AU English. No mocktail language, no
// emojis, no em dashes.
// =============================================================================

// ----------------------------------------------------------------- the six SKUs
// `code` (NON1…) never translates. `name`, the flavour descriptor, MAY be
// localised per market. still/sparkling is fact, not draft.
// Each SKU carries a scenario-first frame: `scenario` is the guest moment or
// dish you lead with, and the tasting note is revealed as the answer.
// `serviceSituation` anchors when to reach for it. These read as the active-
// recall prompts in flashcard mode.
export const skus = [
  {
    id: 'NON1',
    code: 'NON1',
    name: 'Salted Raspberry & Chamomile',
    format: 'Sparkling',
    still: false,
    draft: true,
    scenario: 'A guest sits down, is not drinking, and wants something to open the evening with.',
    serviceSituation: 'The aperitif. The easy, confident first pour.',
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
    scenario: 'A guest orders the roast chicken or a mushroom dish and wants something savoury, not sweet.',
    serviceSituation: 'The savoury pour. Reach for it with umami and white meat.',
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
    scenario: 'A guest is eating duck or a spiced autumn plate and wants a still drink with grip.',
    serviceSituation: 'The still bridge between spice and citrus. Lightly chilled, red wine stem.',
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
    scenario: 'A guest starts on oysters or fried, salty food and wants something to cut through it.',
    serviceSituation: 'The sharpest pour. Built for shellfish, brine and fat.',
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
    scenario: 'A guest is not drinking but wants something that drinks like a red alongside charcuterie.',
    serviceSituation: 'The boldest sparkling. Reach for it when they ask for something like a red.',
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
    scenario: 'A committed red drinker is finishing on lamb and is not drinking tonight.',
    serviceSituation: 'The pour for the red drinker. Full bodied, tannic, cellar temperature.',
    tasting:
      'Ripe blackberry and plum carried on soft oak. Still, full bodied, with tannic structure that reads like a red.',
    glassware: 'Red wine stem',
    serveTemp: '12 to 14 C',
    pairings: ['Lamb', 'Aged cheese', 'Slow braises'],
  },
]

// ----------------------------------------------------- SKU recall question bank
// Authored once. Used by the mandatory recall in "The Six and the Structure",
// the recall opener in "Pairing Like a Somm", and the spaced recall at the open
// of every later pairing module (see `spacedRecall` on those modules). Pull with
// getSkuRecall(code, moduleId, count) in content/registry.js.
export const skuRecallBank = [
  {
    id: 'b1',
    prompt: 'Which two SKUs are still rather than sparkling?',
    options: ['NON1 and NON5', 'NON3 and NON9', 'NON2 and NON7', 'NON5 and NON7'],
    answer: 1,
    explanation: 'NON3 Toasted Cinnamon & Yuzu and NON9 Oaked Blackberry & Plum are the still SKUs.',
  },
  {
    id: 'b2',
    prompt: 'Which SKU leads with a savoury, umami character from kombu?',
    options: ['NON1', 'NON2', 'NON5', 'NON7'],
    answer: 1,
    explanation: 'NON2 Caramelised Pear & Kombu is the savoury, umami-led SKU.',
  },
  {
    id: 'b3',
    prompt: 'A guest wants the boldest sparkling, something that drinks like a red. What do you pour?',
    options: ['NON1', 'NON5', 'NON7', 'NON2'],
    answer: 2,
    explanation: 'NON7 Stewed Cherry & Coffee is the boldest, most red-like sparkling.',
  },
  {
    id: 'b4',
    prompt: 'Which SKU is the bright, high-acid one built for oysters and fried, salty food?',
    options: ['NON5', 'NON2', 'NON9', 'NON3'],
    answer: 0,
    explanation: 'NON5 Lemon Marmalade & Hibiscus is the sharpest, made to cut salt and brine.',
  },
  {
    id: 'b5',
    prompt: 'A committed red drinker is on lamb and not drinking. What do you pour?',
    options: ['NON1 in a flute', 'NON9 in a red wine stem', 'NON5 over ice', 'NON2 in a tumbler'],
    answer: 1,
    explanation: 'NON9 Oaked Blackberry & Plum is full bodied and tannic. Red wine stem.',
  },
  {
    id: 'b6',
    prompt: 'Which SKU is the easy aperitif, raspberry led with a saline edge?',
    options: ['NON2', 'NON7', 'NON1', 'NON3'],
    answer: 2,
    explanation: 'NON1 Salted Raspberry & Chamomile is the bright, dry first pour.',
  },
  {
    id: 'b7',
    prompt: 'Which still SKU bridges warm spice and sharp citrus, strong with duck?',
    options: ['NON3', 'NON9', 'NON5', 'NON7'],
    answer: 0,
    explanation: 'NON3 Toasted Cinnamon & Yuzu. Lightly chilled, red wine stem.',
  },
  {
    id: 'b8',
    prompt: 'How many SKUs does NON make, and how do they split?',
    options: ['Six: four sparkling, two still', 'Nine, all sparkling', 'Six, all still', 'Four sparkling only'],
    answer: 0,
    explanation: 'Six SKUs: four sparkling (NON1, NON2, NON5, NON7), two still (NON3, NON9).',
  },
]

// ============================================================ SHARED CORE
const brandStory = {
  id: 'brand-story',
  track: 'shared',
  status: 'ready',
  eyebrow: 'Shared core',
  title: 'Brand Story',
  summary:
    'Why premium non-alcoholic exists, and the case for trading up rather than down. The story behind every pour.',
  objectives: [
    'Deliver a one-sentence answer to "what is NON?" in the NON voice.',
    'Position NON as trading up, without mocktail or alternative language.',
    'Name the moment at the table that NON is made for.',
  ],
  segments: [
    {
      id: 'why-non',
      title: 'Why NON exists',
      minutes: 5,
      body: [
        'For a long time the person not drinking was handed an afterthought. A sugary soft drink, a tonic with nothing in it, or tap water. The rest of the table drank something made with care; they did not.',
        'NON was built to close that gap. The non-drinker gets a drink made with the same intent as wine: considered ingredients, real structure, designed to sit at the table as an equal.',
        'That is the whole idea. Not a substitute for wine, a considered drink in its own right.',
      ],
      points: [
        'The non-drinker was under-served. NON fixes that.',
        'Made with the same care as wine, not as a soft drink.',
        'An equal at the table, not an afterthought.',
      ],
    },
    {
      id: 'trade-up',
      title: 'Trade up, not down',
      minutes: 5,
      body: [
        'NON is positioned to trade up. It belongs on the wine list, priced and served like wine, poured in stemware. It is not the cheap option and it is not pretending to be something it is not.',
        'Language matters. NON is not a mocktail, not an alcohol-free alternative, not a replacement. Those words trade it down. Talk about flavour, structure and the occasion instead.',
        'When you place NON beside the wine, you are telling the guest it deserves to be there. It does.',
      ],
      points: [
        'On the wine list, in stemware, priced like wine.',
        'Never mocktail, never alternative. Lead with flavour and structure.',
        'Trading up is the whole positioning.',
      ],
    },
    {
      id: 'the-moment',
      title: 'The moment at the table',
      minutes: 5,
      body: [
        'Scenario. A table of four. One is pregnant, one is driving, two are sharing a bottle of wine. Without NON, half the table gets a considered experience and half gets a soft drink.',
        'With NON, everyone is poured something made with care. The table is whole. That equality is the product, and it is the moment every pour is built for.',
        'Hold that picture. It is the reason the brand exists and the easiest way to explain it.',
      ],
      points: [
        'NON makes the whole table equal.',
        'The non-drinker is poured with the same care as the wine drinker.',
        'Sell the moment, not the absence of alcohol.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Write your one-sentence answer to "What is NON?" in the NON voice, without the words mocktail, alcohol-free, or alternative. Make it about flavour, care and the table.',
  },
  quiz: {
    id: 'brand-story',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'What is the core idea behind NON?',
        options: [
          'A cheaper option for guests on a budget',
          'A considered drink that makes the whole table equal',
          'A healthier soft drink',
          'An alcohol-free version of wine',
        ],
        answer: 1,
        explanation: 'NON exists so the non-drinker is poured something made with the same care as wine. The table is whole.',
      },
      {
        id: 'q2',
        prompt: 'Which phrase fits the NON positioning?',
        options: [
          'Our best-selling mocktail',
          'A great alcohol-free alternative',
          'On the wine list, poured in stemware',
          'Two for one on soft drinks',
        ],
        answer: 2,
        explanation: 'NON trades up. It sits on the wine list, in stemware, priced and served like wine.',
      },
      {
        id: 'q3',
        prompt: 'A guest asks what NON is. What is the strongest answer?',
        options: [
          'It is a soft drink for people who are not drinking',
          'It is a considered drink, built like wine, made for the table',
          'It is a sugar-free health drink',
          'It is a cheaper option when you skip the wine',
        ],
        answer: 1,
        explanation:
          'NON is built like wine and belongs on the table as an equal. The other three all trade it down: a soft drink, a health drink, a cheap substitute.',
      },
      {
        id: 'q4',
        prompt: 'Why does language like "mocktail" work against NON?',
        options: [
          'It is too long to say',
          'It trades the product down and undersells the structure',
          'It is hard to translate',
          'Guests do not understand it',
        ],
        answer: 1,
        explanation: 'Mocktail frames NON as a novelty. It trades down a product built to trade up.',
      },
    ],
  },
}

const categoryContext = {
  id: 'category-context',
  spacedRecall: { count: 3 },
  track: 'shared',
  status: 'ready',
  eyebrow: 'Shared core',
  title: 'Category & Market Context',
  summary:
    'Where premium non-alcoholic sits today, who is drinking it, and why venues are listing it now.',
  objectives: [
    'Describe the premium non-alcoholic category in one or two clear points.',
    'Identify three guest occasions where NON wins the sale.',
    'Explain why a venue benefits from listing NON.',
  ],
  segments: [
    {
      id: 'a-category',
      title: 'A category, not a fad',
      minutes: 5,
      body: [
        'Moderation is structural, not a passing trend. People are drinking less across age groups, and the shift is holding. [DRAFT: insert NON market figures and sources confirmed by Aaron.]',
        'Premium non-alcoholic is the part of that shift that venues can sell. The guest still wants an occasion, a considered drink and a reason to stay. NON gives them all three.',
        'Treat it as a permanent category with real demand, not a seasonal line.',
      ],
      points: [
        'Drinking less is a lasting shift, not a fad.',
        'Premium non-alc is the sellable, on-list part of it.',
        '[DRAFT] Confirm category growth figures with Aaron.',
      ],
    },
    {
      id: 'who',
      title: 'Who is not drinking',
      minutes: 5,
      body: [
        'The non-drinker is not one person. Designated drivers, guests who are pregnant, people managing health or medication, athletes, those who do not drink for faith, the sober-curious, and anyone simply not drinking tonight.',
        'That is a large, permanent and under-served group. Every one of them sits at a table and wants to be poured something considered.',
        'When you spot them, you have found the sale. NON is what you pour.',
      ],
      points: [
        'Drivers, pregnancy, health, faith, athletes, sober-curious, and tonight-only.',
        'Large, permanent, under-served.',
        'Spotting the non-drinker is spotting the sale.',
      ],
    },
    {
      id: 'why-list',
      title: 'Why venues list NON',
      minutes: 5,
      body: [
        'For a venue, NON turns a guest who used to order tap water into a paying cover. It protects spend, lifts the average bill, and improves the experience for the whole table.',
        'It also signals care. A venue that lists NON is telling every guest that the non-drinker matters here.',
        'Scenario. A table of six with two non-drinkers. Tap water earns nothing. Two NON by the glass earns a real margin and a better night for the table.',
      ],
      points: [
        'Turns tap-water guests into paying covers.',
        'Lifts the average bill and protects spend.',
        'Signals that the venue cares about every guest.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Name three guests from your last shift or visit who would have traded up to NON. For each, note the occasion (driving, pregnant, off it tonight) and which SKU you would have poured.',
  },
  quiz: {
    id: 'category-context',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'How should you treat the non-alcoholic category?',
        options: [
          'A seasonal line for summer',
          'A passing trend to watch',
          'A permanent category with real demand',
          'A favour to a few guests',
        ],
        answer: 2,
        explanation: 'The shift to drinking less is structural. Treat premium non-alc as a permanent category.',
      },
      {
        id: 'q2',
        prompt: 'Which best describes the NON guest?',
        options: [
          'Only people who never drink alcohol',
          'A wide, permanent group including drivers, pregnancy, health, faith and the sober-curious',
          'Mainly teenagers',
          'People who cannot afford wine',
        ],
        answer: 1,
        explanation: 'The non-drinker is a broad, under-served group, including anyone simply not drinking tonight.',
      },
      {
        id: 'q3',
        prompt: 'What does listing NON do for a venue commercially?',
        options: [
          'Nothing measurable',
          'Turns tap-water guests into paying covers and lifts the average bill',
          'Replaces wine sales',
          'Only helps in dry January',
        ],
        answer: 1,
        explanation: 'NON captures spend that would otherwise be lost to tap water and lifts the bill for the table.',
      },
      {
        id: 'q4',
        prompt: 'A table of six has two non-drinkers. What is the opportunity?',
        options: [
          'Two glasses of tap water',
          'Two NON by the glass, earning margin and improving the table',
          'Suggest they share a wine',
          'Nothing, they are not drinking',
        ],
        answer: 1,
        explanation: 'Two NON by the glass earns a real margin and makes the whole table equal.',
      },
    ],
  },
}

// ============================================================ REP TRACK
const repListPlacement = {
  id: 'rep-list-placement',
  spacedRecall: { count: 3 },
  track: 'rep',
  status: 'ready',
  eyebrow: 'Rep track',
  title: 'List Placement & the Venue Pitch',
  summary: 'Win the listing and place NON beside the wine, not the soft drinks.',
  objectives: [
    'Deliver a 60-second venue pitch that lands the trade-up positioning.',
    'Place NON beside the wine on a list and justify it.',
    'Use a pour, not a speech, to close.',
  ],
  segments: [
    {
      id: 'where-it-belongs',
      title: 'Where NON belongs on the list',
      minutes: 5,
      body: [
        'NON belongs beside the wine, available by the glass, served in stemware. Not buried in the soft drinks, not on a separate novelty page.',
        'The placement is half the pitch. Where a drink sits on the list tells the guest how to think about it. Put NON among the wines and the guest reads it as a considered choice.',
        'When you pitch a buyer, pitch the placement as much as the product.',
      ],
      points: [
        'Beside the wine, by the glass, in stemware.',
        'Never the soft drink section.',
        'Placement signals value before a word is said.',
      ],
    },
    {
      id: 'the-pitch',
      title: 'The 60-second pitch',
      minutes: 5,
      body: [
        'Keep it to four beats. The gap: your non-drinkers currently get tap water or a soft drink. The product: NON, six SKUs, built like wine. The proof: let me pour you one. The ask: list two by the glass to start.',
        'Lead with the guest, not the brand. The buyer cares about covers and experience, so frame NON as the answer to a gap they already have.',
        'Sixty seconds is enough. Say less, pour more.',
      ],
      points: [
        'Four beats: gap, product, proof, ask.',
        'Lead with the buyer’s gap, not the brand.',
        'Ask for two SKUs by the glass to start.',
      ],
    },
    {
      id: 'pour-dont-tell',
      title: 'Pour, do not tell',
      minutes: 5,
      body: [
        'Scenario. A sceptical buyer has heard every non-alc pitch. Do not argue. Open NON7, pour it into a wine glass, and let them taste structure where they expected sugar.',
        'A pour beats a paragraph. The product makes the case better than you can. Your job is to get it into the glass and out of the way.',
        'Then make the ask while the taste is still with them.',
      ],
      points: [
        'A pour beats a paragraph.',
        'Pour NON7 for the sceptic. It carries the most structure.',
        'Make the ask while the taste lands.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Write your 60-second pitch using the four beats: gap, product, proof, ask. Time yourself saying it out loud. Cut anything that is about the brand rather than the buyer.',
  },
  quiz: {
    id: 'rep-list-placement',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'Where should NON sit on a venue list?',
        options: [
          'In the soft drinks section',
          'On a separate novelty page',
          'Beside the wine, by the glass',
          'Only on the cocktail list',
        ],
        answer: 2,
        explanation: 'Placement is half the pitch. Beside the wine, by the glass, in stemware.',
      },
      {
        id: 'q2',
        prompt: 'What are the four beats of the 60-second pitch?',
        options: [
          'Price, discount, deal, contract',
          'Gap, product, proof, ask',
          'History, awards, story, brand',
          'Feature, feature, feature, feature',
        ],
        answer: 1,
        explanation: 'Gap (their non-drinkers), product (six, built like wine), proof (a pour), ask (two by the glass).',
      },
      {
        id: 'q3',
        prompt: 'A buyer is sceptical and has heard it all. What works best?',
        options: [
          'A longer, more detailed argument',
          'Open and pour NON7, then make the ask',
          'Leave a brochure and go',
          'Lead with the no-alcohol angle',
        ],
        answer: 1,
        explanation: 'A pour beats a paragraph. Let the structure of NON7 make the case.',
      },
      {
        id: 'q4',
        prompt: 'What is the right opening ask?',
        options: [
          'List all six SKUs immediately',
          'List two SKUs by the glass to start',
          'Take a full pallet',
          'Trial it in the staff room',
        ],
        answer: 1,
        explanation: 'A small, confident commitment: two by the glass. It is easy to say yes to and easy to grow.',
      },
    ],
  },
}

const repReadingProgram = {
  id: 'rep-reading-program',
  spacedRecall: { count: 3 },
  track: 'rep',
  status: 'ready',
  eyebrow: 'Rep track',
  title: 'Reading a Beverage Program',
  summary: 'Read a venue list like a buyer and find the gap NON fills.',
  objectives: [
    'Audit a beverage list and name the placement opportunity for NON.',
    'Match SKUs to the style of a venue’s menu.',
  ],
  segments: [
    {
      id: 'read-like-buyer',
      title: 'Read the list like a buyer',
      minutes: 5,
      body: [
        'Pick up the list and look at what is by the glass, what the venue is proud of, and how the non-alcoholic offer is handled. Usually that last part is thin.',
        'The shape of the list tells you the venue’s priorities and where a considered non-alc pour would fit.',
        'You are looking for the gap, not the competition.',
      ],
      points: [
        'Check the by-the-glass selection first.',
        'Find how the non-drinker is currently handled.',
        'Read for the gap, not the rivals.',
      ],
    },
    {
      id: 'find-the-gap',
      title: 'Find the gap',
      minutes: 5,
      body: [
        'On most lists the non-drinker lands on tap water, a soft drink, or a tonic. That is the gap, and it is your opening.',
        'Name it plainly to the buyer. There is nothing considered here for the guest who is not drinking, and that guest is at every table.',
        'A clear gap makes the ask obvious.',
      ],
      points: [
        'The gap is usually soft drinks or tap water.',
        'Name the gap to the buyer in one sentence.',
        'A clear gap makes the ask easy.',
      ],
    },
    {
      id: 'match-skus',
      title: 'Match SKUs to the menu',
      minutes: 5,
      body: [
        'Scenario. A seafood-led list wants the bright, high-acid sparkling SKUs: NON1 and NON5. A steakhouse wants structure: NON7 and the still NON9.',
        'Match the recommendation to the food the venue actually serves. A pairing that fits the menu is far easier to list than a generic range.',
        'Bring two specific SKUs to the table, not all six.',
      ],
      points: [
        'Seafood and fresh plates: NON1, NON5.',
        'Red meat and structure: NON7, NON9.',
        'Recommend two SKUs that fit the menu.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Audit one real venue list. Write the one-sentence gap and your two-SKU placement recommendation, matched to the food the venue serves.',
  },
  quiz: {
    id: 'rep-reading-program',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'When reading a list, what are you looking for?',
        options: [
          'The most expensive wine',
          'The gap where the non-drinker is under-served',
          'How many cocktails they list',
          'The font they used',
        ],
        answer: 1,
        explanation: 'Read for the gap. On most lists the non-drinker lands on tap water or a soft drink.',
      },
      {
        id: 'q2',
        prompt: 'A seafood-led venue. Which SKUs do you bring?',
        options: ['NON7 and NON9', 'NON1 and NON5', 'NON2 and NON9', 'NON3 and NON7'],
        answer: 1,
        explanation: 'Bright, high-acid sparkling cuts through brine and salt. NON1 and NON5 suit seafood.',
      },
      {
        id: 'q3',
        prompt: 'How many SKUs should you recommend for a listing?',
        options: ['All six at once', 'Two that fit the menu', 'None, let them choose', 'Whichever is on offer'],
        answer: 1,
        explanation: 'Bring two specific SKUs matched to the menu. It is easier to list and easier to grow.',
      },
    ],
  },
}

const repObjections = {
  id: 'rep-objections',
  track: 'rep',
  status: 'ready',
  eyebrow: 'Rep track',
  title: 'Commercial Objection Handling',
  summary: 'Answer the three objections you will hear most: price, fridge space, and "we already have something".',
  objectives: [
    'Handle the price, range and incumbent objections with a confident, specific answer.',
    'Reframe cost as margin per cover.',
  ],
  segments: [
    {
      id: 'price',
      title: '"It is too expensive"',
      minutes: 5,
      body: [
        'NON is priced like wine because it is made like wine, and it earns a wine-like margin. Move the conversation from cost to margin per cover.',
        'A non-drinker on tap water earns nothing. The same guest on a NON by the glass earns a real margin. The price is the point, not the problem.',
        'Reframe, do not discount.',
      ],
      points: [
        'Priced like wine because it is made like wine.',
        'Reframe cost as margin per cover.',
        'Tap water earns nothing. NON earns margin.',
      ],
    },
    {
      id: 'space',
      title: '"We do not have the fridge space"',
      minutes: 5,
      body: [
        'You are not asking for all six. Start with two SKUs by the glass. That is a small footprint and a small commitment.',
        'Once they move, the range grows itself. The first two prove the demand and earn their shelf.',
        'Make the first yes easy.',
      ],
      points: [
        'Start with two SKUs, not the full range.',
        'Small footprint, small commitment.',
        'Let the first two earn the rest.',
      ],
    },
    {
      id: 'incumbent',
      title: '"We already have something"',
      minutes: 5,
      body: [
        'Usually that something is a tonic, a soft drink or a single tired non-alc line. That is not a considered offer for the non-drinker.',
        'Do not argue. Pour NON next to what they have and let the difference show. Structure beside sugar makes its own case.',
        'Then ask to add NON by the glass alongside it.',
      ],
      points: [
        'The incumbent is usually a soft drink, not a real offer.',
        'Pour NON beside it. Let the difference show.',
        'Add by the glass rather than replace.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Script your answer to each of the three objections: price, fridge space, and "we already have something". Keep each to two sentences, confident and specific.',
  },
  quiz: {
    id: 'rep-objections',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'A buyer says NON is too expensive. Best response?',
        options: [
          'Offer a discount',
          'Reframe from cost to margin per cover',
          'Agree and move on',
          'Compare it to cheap soft drinks',
        ],
        answer: 1,
        explanation: 'NON is priced like wine and earns a wine-like margin. Move the conversation to margin per cover.',
      },
      {
        id: 'q2',
        prompt: 'A buyer worries about fridge space. What do you ask for?',
        options: [
          'All six SKUs',
          'Two SKUs by the glass to start',
          'A full pallet',
          'Nothing, walk away',
        ],
        answer: 1,
        explanation: 'Start small. Two SKUs by the glass is a small footprint and an easy yes.',
      },
      {
        id: 'q3',
        prompt: 'A buyer says "we already have something". What works?',
        options: [
          'Argue that yours is better',
          'Pour NON beside theirs and let the difference show',
          'Leave a price list',
          'Drop the visit',
        ],
        answer: 1,
        explanation: 'The incumbent is usually a soft drink. Pour NON next to it and ask to add by the glass.',
      },
    ],
  },
}

const repDistributor = {
  id: 'rep-distributor',
  track: 'rep',
  status: 'ready',
  eyebrow: 'Rep track',
  title: 'Distributor & Reorder Conversations',
  summary: 'Keep stock moving and reorders flowing so a venue never runs dry on the hero SKU.',
  objectives: [
    'Run a reorder conversation that protects shelf presence.',
    'Use what is selling to grow the range.',
  ],
  segments: [
    {
      id: 'keep-moving',
      title: 'Keep stock moving',
      minutes: 5,
      body: [
        'A listing only earns if the stock is there to pour. Track depletion and never let a venue run dry on its best-selling SKU.',
        'An empty shelf is a lost sale and a quiet way to lose the listing. Stay ahead of it.',
        'Know what each account is selling and when they will need more.',
      ],
      points: [
        'A listing only earns if it is in stock.',
        'Never let the hero SKU run dry.',
        'Track depletion per account.',
      ],
    },
    {
      id: 'reorder',
      title: 'The reorder conversation',
      minutes: 5,
      body: [
        'Lead with what is selling. Confirm the top-up on the movers, then suggest one new SKU to widen the range.',
        'A reorder is a chance to grow, not just to replace. Use the proof of what is working to introduce what is next.',
        'Make reordering effortless. You are the link that keeps it simple.',
      ],
      points: [
        'Lead with the movers, then widen the range.',
        'Use proof to introduce one new SKU.',
        'Make reordering effortless.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Draft a short reorder check-in message for one account. Lead with what is selling, confirm the top-up, and suggest one new SKU.',
  },
  quiz: {
    id: 'rep-distributor',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'Why does running dry on a hero SKU matter?',
        options: [
          'It does not matter',
          'An empty shelf is a lost sale and a quiet way to lose the listing',
          'It frees up fridge space',
          'It encourages guests to try wine',
        ],
        answer: 1,
        explanation: 'A listing only earns if the stock is there to pour. Stay ahead of depletion.',
      },
      {
        id: 'q2',
        prompt: 'How should you open a reorder conversation?',
        options: [
          'With a complaint about slow sales',
          'Lead with what is selling, then widen the range',
          'Ask them to clear old stock first',
          'Push the full range every time',
        ],
        answer: 1,
        explanation: 'Lead with the movers. Use that proof to introduce one new SKU.',
      },
    ],
  },
}

const repAccountPlanning = {
  id: 'rep-account-planning',
  track: 'rep',
  status: 'ready',
  eyebrow: 'Rep track',
  title: 'Account Planning',
  summary: 'Build and work a territory with intent, one account at a time.',
  objectives: [
    'Build a simple account plan for a target venue.',
    'Set a clear goal and a follow-up rhythm.',
  ],
  segments: [
    {
      id: 'know-account',
      title: 'Know the account',
      minutes: 5,
      body: [
        'Before the first visit, know the basics: the venue style, roughly how many covers, the kind of guest, and who actually makes the buying decision.',
        'A plan built on a real picture of the account beats a generic pitch every time.',
        'Walk in knowing who you need to convince.',
      ],
      points: [
        'Style, covers, guest, decision-maker.',
        'Know who signs off before you pitch.',
        'A real picture beats a generic pitch.',
      ],
    },
    {
      id: 'set-goal',
      title: 'Set the goal',
      minutes: 5,
      body: [
        'Set one clear goal per account: secure the listing, get two SKUs by the glass, and establish a reorder cadence.',
        'A specific goal turns a friendly visit into progress you can measure.',
        'Write it down before you go.',
      ],
      points: [
        'One clear goal per account.',
        'Listing, by-the-glass placement, reorder cadence.',
        'Write the goal down before the visit.',
      ],
    },
    {
      id: 'work-plan',
      title: 'Work the plan',
      minutes: 5,
      body: [
        'First visit: pour and make the ask. Follow up while the taste is fresh. Review what listed, what sold, and what is next.',
        'Working the plan is a rhythm, not a single call. The accounts that grow are the ones you come back to.',
        'Close the loop, then set the next goal.',
      ],
      points: [
        'Pour, follow up, review.',
        'It is a rhythm, not a single visit.',
        'Close the loop and set the next goal.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Build a one-page plan for a target account: the picture (style, covers, decision-maker), the goal, and your first three steps.',
  },
  quiz: {
    id: 'rep-account-planning',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'What should you know before the first visit?',
        options: [
          'The owner’s home address',
          'Style, covers, guest, and the decision-maker',
          'Their entire wine list by heart',
          'Nothing, improvise',
        ],
        answer: 1,
        explanation: 'A plan built on a real picture of the account beats a generic pitch.',
      },
      {
        id: 'q2',
        prompt: 'What makes a good account goal?',
        options: [
          'Vague and friendly',
          'Specific and measurable, like two SKUs by the glass',
          'As large as possible',
          'Whatever the buyer suggests',
        ],
        answer: 1,
        explanation: 'A specific goal turns a friendly visit into measurable progress.',
      },
      {
        id: 'q3',
        prompt: 'How should you treat working the plan?',
        options: [
          'A single call and done',
          'A rhythm of pour, follow up, review',
          'Only revisit if they call you',
          'Leave it to the distributor',
        ],
        answer: 1,
        explanation: 'The accounts that grow are the ones you come back to. Close the loop, set the next goal.',
      },
    ],
  },
}

// ============================================================ VENUE TRACK
const venueRecommending = {
  id: 'venue-recommending',
  spacedRecall: { count: 3 },
  track: 'venue',
  status: 'ready',
  eyebrow: 'Venue track',
  title: 'Recommending NON to a Guest',
  summary: 'Read the table and make the call, the same way you would recommend a wine.',
  objectives: [
    'Recommend a specific SKU to a guest based on what they are eating.',
    'Make the recommendation with confidence and the right glass.',
  ],
  segments: [
    {
      id: 'read-table',
      title: 'Read the table',
      minutes: 5,
      body: [
        'Notice who is not drinking and what they have ordered. The recommendation starts before anyone asks.',
        'A guest who orders the fish and waves off the wine list is the easiest NON sale of the night.',
        'Read the table the way you read it for wine.',
      ],
      points: [
        'Spot the non-drinker early.',
        'Note what they have ordered.',
        'The recommendation starts before they ask.',
      ],
    },
    {
      id: 'make-call',
      title: 'Make the call',
      minutes: 5,
      body: [
        'Name the SKU, name why, and pour it in stemware. "Can I pour you the NON5? Bitter lemon and hibiscus, finishes dry, it works beautifully with the fish."',
        'A confident, specific recommendation lands. A vague "we have some non-alcoholic options" does not.',
        'Recommend one SKU, not the whole range.',
      ],
      points: [
        'Name the SKU, name why, pour in stemware.',
        'Specific beats vague every time.',
        'Recommend one, not the whole list.',
      ],
    },
    {
      id: 'recommend-scenario',
      title: 'Scenario: the fish course',
      minutes: 5,
      body: [
        'A guest orders the snapper and is not drinking. You pour NON5 in a white wine glass and say it finishes dry and cuts through the dish.',
        'They expected to sip water through dinner. Instead they have a considered pour that matches the table.',
        'That is the recommendation done well, and it is the same instinct as pairing a wine.',
      ],
      points: [
        'Match the SKU to the dish.',
        'White wine glass for the sparkling SKUs.',
        'Same instinct as pairing wine.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Write three recommendations for three dishes on your menu. For each: the dish, the SKU, one sentence of why, and the glass.',
  },
  quiz: {
    id: 'venue-recommending',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'When does a good recommendation start?',
        options: [
          'When the guest asks for it',
          'Before they ask, by reading the table',
          'At the end of the meal',
          'Only if they mention NON first',
        ],
        answer: 1,
        explanation: 'Spot the non-drinker and what they ordered early. The recommendation starts before they ask.',
      },
      {
        id: 'q2',
        prompt: 'A guest orders the fish and is not drinking. Best line?',
        options: [
          'We have some non-alcoholic options',
          'Can I pour you the NON5? Finishes dry, works with the fish',
          'Just water then?',
          'Maybe try the soft drinks',
        ],
        answer: 1,
        explanation: 'Name the SKU, name why, pour in stemware. Specific and confident.',
      },
      {
        id: 'q3',
        prompt: 'How many SKUs should you recommend at once?',
        options: ['All six', 'One that fits the dish', 'At least three', 'None, let them ask'],
        answer: 1,
        explanation: 'Recommend one SKU matched to the dish, the same way you would pair a wine.',
      },
      {
        id: 'q4',
        prompt: 'Which glass for a sparkling SKU like NON5?',
        options: ['A tumbler', 'A flute', 'A white wine stem', 'A highball'],
        answer: 2,
        explanation: 'Sparkling SKUs are served in white wine stems, not tumblers or flutes by default.',
      },
    ],
  },
}

const venueTradeUp = {
  id: 'venue-trade-up',
  track: 'venue',
  status: 'ready',
  eyebrow: 'Venue track',
  title: 'The Trade-Up Conversation',
  summary: 'Turn "just a water" into a considered pour.',
  objectives: [
    'Convert a default soft-drink or water request into a NON recommendation.',
    'Offer the trade up with confidence, not pressure.',
  ],
  segments: [
    {
      id: 'default-request',
      title: 'The default request',
      minutes: 5,
      body: [
        'When a guest asks for "just a water" or a lemonade, that is the opening, not the end of the conversation.',
        'Most guests default because they do not know there is anything better on offer. Your job is to show them there is.',
        'Hear the default as an invitation.',
      ],
      points: [
        'A default request is an opening.',
        'Guests default because they do not know the option exists.',
        'Hear it as an invitation, not a full stop.',
      ],
    },
    {
      id: 'offer-trade',
      title: 'Offer the trade up',
      minutes: 5,
      body: [
        'Offer it plainly. "We have something made for that. Can I pour you a NON instead?" Confident, warm, and never pushy.',
        'Give them a reason in one line: it is dry, it is considered, and it suits what you are eating.',
        'If they say no, that is fine. You offered the better thing.',
      ],
      points: [
        '"We have something made for that."',
        'One line of why: dry, considered, suits the food.',
        'Confident, not pushy.',
      ],
    },
    {
      id: 'tradeup-scenario',
      title: 'Scenario: turning a soda',
      minutes: 5,
      body: [
        'A guest orders a soda water. You say, "I can do that, or I can pour you a NON1 instead. It is raspberry and chamomile, finishes dry, and it drinks like a proper glass." They take the NON.',
        'You turned a default into a considered pour and a paying cover, without any pressure.',
        'That exchange is the whole skill.',
      ],
      points: [
        'Offer the trade up alongside the default.',
        'A default becomes a considered pour.',
        'No pressure, just the better option.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Script your trade-up line in your own words. Make it warm, confident, and under two sentences, with one reason the guest should say yes.',
  },
  quiz: {
    id: 'venue-trade-up',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'A guest asks for "just a water". How should you hear it?',
        options: [
          'As a closed decision',
          'As an opening to offer the trade up',
          'As a complaint',
          'As a request to be left alone',
        ],
        answer: 1,
        explanation: 'Most guests default because they do not know there is something better. Hear it as an invitation.',
      },
      {
        id: 'q2',
        prompt: 'Which trade-up line fits the NON voice?',
        options: [
          'Are you sure you do not want a real drink?',
          'We have something made for that. Can I pour you a NON instead?',
          'Water is boring, try this mocktail',
          'You should really try our alcohol-free range',
        ],
        answer: 1,
        explanation: 'Confident and warm, with the trade up offered plainly and never pushed.',
      },
      {
        id: 'q3',
        prompt: 'The guest declines the trade up. What is the right attitude?',
        options: [
          'Push harder',
          'That is fine, you offered the better thing',
          'Refuse to bring water',
          'Take it personally',
        ],
        answer: 1,
        explanation: 'Offer with confidence, accept the answer. No pressure.',
      },
    ],
  },
}

const venueServeRitual = {
  id: 'venue-serve-ritual',
  track: 'venue',
  status: 'ready',
  eyebrow: 'Venue track',
  title: 'Pour, Temperature & Glassware Ritual',
  summary: 'Serve NON with the same ritual as wine: right glass, right temperature, poured at the table.',
  objectives: [
    'Serve each SKU at the right temperature, in the right glass.',
    'Run the full serve ritual the way you would for wine.',
  ],
  segments: [
    {
      id: 'glassware',
      title: 'Glassware',
      minutes: 5,
      body: [
        'Sparkling SKUs go in white wine stems. Still SKUs go in red wine stems. Never a tumbler and never a flute by default. [DRAFT: confirm glassware standard with Aaron.]',
        'The glass tells the guest how to drink it. Stemware says this is considered. A tumbler says soft drink.',
        'Get the glass right and half the ritual is done.',
      ],
      points: [
        'Sparkling: white wine stem. Still: red wine stem.',
        'Never a tumbler or a default flute.',
        '[DRAFT] Confirm glassware standard with Aaron.',
      ],
    },
    {
      id: 'temperature',
      title: 'Temperature',
      minutes: 5,
      body: [
        'Serve sparkling SKUs well chilled. Serve still SKUs lightly chilled, closer to cellar temperature. [DRAFT: confirm exact serve temperatures with Aaron; the SKU cards carry working figures.]',
        'Temperature changes how a drink reads. Too warm and the structure flattens. Too cold and the aroma closes.',
        'Treat serve temperature with the same care as wine.',
      ],
      points: [
        'Sparkling well chilled, still lightly chilled.',
        'Temperature changes how the drink reads.',
        '[DRAFT] Confirm exact temperatures with Aaron.',
      ],
    },
    {
      id: 'ritual',
      title: 'The ritual',
      minutes: 5,
      body: [
        'Present the bottle, pour at the table, and treat it like wine. The ritual is part of the trade up.',
        'Scenario. A guest on NON9 watches you present and pour the bottle just as you would a red. They feel looked after, the same as the wine drinkers beside them.',
        'The ritual is what makes the table equal.',
      ],
      points: [
        'Present the bottle, pour at the table.',
        'Treat it exactly like wine.',
        'The ritual is part of the trade up.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Run the full serve ritual for one sparkling and one still SKU: correct glass, correct temperature, presented and poured at the table.',
  },
  quiz: {
    id: 'venue-serve-ritual',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'Which glassware for a still SKU like NON9?',
        options: ['A tumbler', 'A flute', 'A red wine stem', 'A highball'],
        answer: 2,
        explanation: 'Still SKUs are served in red wine stems. Sparkling go in white wine stems.',
      },
      {
        id: 'q2',
        prompt: 'How should sparkling SKUs be served?',
        options: ['Room temperature', 'Well chilled', 'Over ice', 'Warm'],
        answer: 1,
        explanation: 'Sparkling SKUs are served well chilled. Still SKUs are served lightly chilled.',
      },
      {
        id: 'q3',
        prompt: 'Why does the serve ritual matter?',
        options: [
          'It looks impressive only',
          'It is part of the trade up and makes the table equal',
          'It slows down service',
          'It does not matter',
        ],
        answer: 1,
        explanation: 'Presenting and pouring at the table treats NON like wine and makes the table equal.',
      },
      {
        id: 'q4',
        prompt: 'Why avoid serving NON in a tumbler by default?',
        options: [
          'Tumblers are expensive',
          'A tumbler reads as a soft drink; stemware says considered',
          'It spills more easily',
          'There is no reason',
        ],
        answer: 1,
        explanation: 'The glass tells the guest how to drink it. Stemware signals the trade up.',
      },
    ],
  },
}

const venuePairingMenu = {
  id: 'venue-pairing-menu',
  spacedRecall: { count: 3 },
  track: 'venue',
  status: 'ready',
  eyebrow: 'Venue track',
  title: 'Pairing to a Real Menu',
  summary: 'Pair the range across an actual menu, course by course.',
  objectives: [
    'Pair at least four SKUs to courses on a working menu.',
    'Apply weight, acidity and structure to real dishes.',
  ],
  segments: [
    {
      id: 'principles-recap',
      title: 'Pairing principles, recapped',
      minutes: 5,
      body: [
        'Match weight to weight. Use acidity to cut richness. Let structure stand up to protein. The same rules you use for wine.',
        'You do not need a perfect match, you need a confident one.',
        'Carry these three rules to every menu.',
      ],
      points: [
        'Weight to weight.',
        'Acidity against richness.',
        'Structure against protein.',
      ],
    },
    {
      id: 'across-menu',
      title: 'Across a menu',
      minutes: 5,
      body: [
        'Starters and fresh plates: NON1 and NON5. Savoury, mushroom or white meat: NON2. Red meat and braises: NON7 and the still NON9. Something to finish: NON7 with dark chocolate.',
        'Walk the menu top to bottom and place a SKU against each section. The range covers a full meal.',
        'Pair the way the kitchen built the menu.',
      ],
      points: [
        'Starters: NON1, NON5.',
        'Savoury and white meat: NON2.',
        'Red meat and braises: NON7, NON9.',
      ],
    },
    {
      id: 'pairing-scenario',
      title: 'Scenario: a three-course menu',
      minutes: 5,
      body: [
        'Oysters to start: NON5. Roast chicken main: NON2. Chocolate to finish: NON7. Three courses, three considered pours, no wine required.',
        'A non-drinker can have a full pairing menu through NON. That is the range working as it was designed.',
        'Build the pairing the same way you would a wine flight.',
      ],
      points: [
        'A full pairing menu is possible through NON alone.',
        'Oysters: NON5. Chicken: NON2. Chocolate: NON7.',
        'Build it like a wine flight.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Pair four SKUs across your actual menu. Note the dish, the SKU, and the principle (weight, acidity or structure) behind each pairing.',
  },
  quiz: {
    id: 'venue-pairing-menu',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'What are the three pairing principles?',
        options: [
          'Colour, price, brand',
          'Weight to weight, acidity against richness, structure against protein',
          'Sweet, sour, salty',
          'Bubbles, ice, garnish',
        ],
        answer: 1,
        explanation: 'The same rules as wine: match weight, use acidity to cut richness, let structure meet protein.',
      },
      {
        id: 'q2',
        prompt: 'Which SKU pairs with oysters to start?',
        options: ['NON9', 'NON5', 'NON2', 'NON7'],
        answer: 1,
        explanation: 'Bright, high-acid NON5 cuts through brine. It is a strong opener with shellfish.',
      },
      {
        id: 'q3',
        prompt: 'Roast chicken main. Which SKU?',
        options: ['NON5', 'NON2', 'NON1', 'NON9'],
        answer: 1,
        explanation: 'NON2 is savoury and rounded, with umami from kombu. It suits roast chicken.',
      },
      {
        id: 'q4',
        prompt: 'Can a non-drinker have a full pairing menu through NON?',
        options: [
          'No, only one SKU per meal',
          'Yes, the range covers starter to dessert',
          'Only for dessert',
          'Only with wine alongside',
        ],
        answer: 1,
        explanation: 'The range is designed to pair across a full meal, like a wine flight.',
      },
    ],
  },
}

const venueScepticalGuest = {
  id: 'venue-sceptical-guest',
  spacedRecall: { count: 3 },
  track: 'venue',
  status: 'ready',
  eyebrow: 'Venue track',
  title: 'Handling the Sceptical Guest',
  summary: 'Win over the guest who expects sugar water and has been let down by bad non-alc before.',
  objectives: [
    'Turn a sceptical guest into a confident NON drinker in one exchange.',
    'Use a taste and a dry description rather than a hard sell.',
  ],
  segments: [
    {
      id: 'the-sceptic',
      title: 'The sceptic',
      minutes: 5,
      body: [
        'The sceptical guest expects sugar water. They have likely been handed a bad non-alc drink before and remember it.',
        'Do not take it personally, and do not oversell. Scepticism is fair. It just needs the right answer.',
        'Meet it with the product, not a pitch.',
      ],
      points: [
        'The sceptic expects sugar water.',
        'Their doubt is fair, not a challenge.',
        'Answer with the product, not a pitch.',
      ],
    },
    {
      id: 'win-structure',
      title: 'Win with structure',
      minutes: 5,
      body: [
        'Offer a small taste and describe it honestly: dry, structured, more like a red than a soft drink. Let the structure surprise them.',
        'A taste does in one sip what a paragraph cannot. Pour a little, say little, let it land.',
        'Then leave the decision with them.',
      ],
      points: [
        'Offer a taste, not a speech.',
        'Describe it dry and structured.',
        'Let the product do the convincing.',
      ],
    },
    {
      id: 'sceptic-scenario',
      title: 'Scenario: "I do not usually like those"',
      minutes: 5,
      body: [
        'A guest says they do not usually like non-alc drinks. You pour a small taste of NON7 and say, "This one is dry and structured, more like a red. No pressure, just try it."',
        'They taste coffee and dark cherry where they expected sugar, and they order a glass.',
        'One honest taste turned the sceptic. That is the exchange.',
      ],
      points: [
        'Pour a small taste of NON7 for the sceptic.',
        '"Dry, structured, more like a red. No pressure."',
        'One honest taste does the work.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Script your one-exchange response to the guest who says "I do not usually like those". Include the SKU you would pour and your one honest line.',
  },
  quiz: {
    id: 'venue-sceptical-guest',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'What does the sceptical guest usually expect?',
        options: ['A fine wine', 'Sugar water', 'Nothing at all', 'A cocktail'],
        answer: 1,
        explanation: 'They expect sugar water, often from a bad past experience. Their doubt is fair.',
      },
      {
        id: 'q2',
        prompt: 'What is the best way to win a sceptic?',
        options: [
          'A long, detailed argument',
          'Offer a small taste and an honest, dry description',
          'Insist they will like it',
          'Tell them it is alcohol-free',
        ],
        answer: 1,
        explanation: 'A taste does in one sip what a paragraph cannot. Pour a little, say little, let it land.',
      },
      {
        id: 'q3',
        prompt: 'Which SKU is well suited to convince a sceptic?',
        options: ['NON1', 'NON7', 'NON5', 'A soft drink'],
        answer: 1,
        explanation: 'NON7 carries dark cherry and coffee with real structure. It surprises guests expecting sugar.',
      },
    ],
  },
}

// --------------------------------------------------- the Product Mastery module
// the reference standard, built first.
// --------------------------------------------------- Product Mastery, split
// 2A "The Six and the Structure" — recall and recognition. Goal: know the six
// cold. Ends with a MANDATORY flashcard round before the module can complete.
const productFoundation = {
  id: 'product-foundation',
  track: 'shared',
  status: 'ready',
  eyebrow: 'Shared core',
  title: 'The Six and the Structure',
  summary:
    'The six SKUs at a glance: still versus sparkling, and why NON is built on structure, not sweetness. Learn them cold.',
  objectives: [
    'Name all six NON SKUs and state whether each is still or sparkling.',
    'Recall the lead flavour and structure of each SKU in one sentence.',
    'Explain why NON is poured in stemware and listed beside the wine.',
  ],
  requireFlashcards: true,
  preCheck: {
    id: 'precheck-product-foundation',
    passToSkip: 100,
    questions: [
      {
        id: 'p1',
        prompt: 'How many SKUs does NON make, and how do they split?',
        options: ['Six: four sparkling, two still', 'Nine, all sparkling', 'Six, all still', 'Four sparkling only'],
        answer: 0,
        explanation: 'Six SKUs: four sparkling, two still.',
      },
      {
        id: 'p2',
        prompt: 'Which is the right way to place NON on a venue list?',
        options: [
          'In the soft drinks section',
          'Beside the wine, by the glass, in stemware',
          'On a separate novelty page',
          'It does not go on the list',
        ],
        answer: 1,
        explanation: 'NON trades up. It belongs beside the wine, in stemware.',
      },
    ],
  },
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
  ],
  practical: {
    title: 'Practical task',
    body: 'From memory, list all six SKUs with their format (still or sparkling) and one word for each lead flavour. Check yourself against the quick-reference cards.',
  },
  quiz: {
    id: 'product-foundation',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'Which two SKUs are still rather than sparkling?',
        options: ['NON1 and NON5', 'NON3 and NON9', 'NON2 and NON7', 'NON5 and NON7'],
        answer: 1,
        explanation: 'NON3 Toasted Cinnamon & Yuzu and NON9 Oaked Blackberry & Plum are the still SKUs.',
      },
      {
        id: 'q2',
        prompt: 'Which SKU leads with a savoury, umami character from kombu?',
        options: ['NON1', 'NON2', 'NON5', 'NON7'],
        answer: 1,
        explanation: 'NON2 Caramelised Pear & Kombu is the savoury, umami-led SKU in the range.',
      },
      {
        id: 'q3',
        prompt: 'Which is the sharpest, highest-acid sparkling, built for shellfish and fried food?',
        options: ['NON1', 'NON2', 'NON5', 'NON7'],
        answer: 2,
        explanation: 'NON5 Lemon Marmalade & Hibiscus is the tart, bracing one.',
      },
      {
        id: 'q4',
        prompt: 'Which SKU is the boldest sparkling, the one that drinks closest to a red?',
        options: ['NON1', 'NON5', 'NON7', 'NON3'],
        answer: 2,
        explanation: 'NON7 Stewed Cherry & Coffee. Dark, dry, structured.',
      },
      {
        id: 'q5',
        prompt: 'Why is NON poured in stemware and listed beside the wine?',
        options: [
          'It looks fancy',
          'Because it is built like wine and trades up, not down',
          'There are no soft-drink glasses',
          'To charge more for the same thing',
        ],
        answer: 1,
        explanation: 'Stemware and placement signal a considered drink. NON trades up.',
      },
    ],
  },
}

// 2B "Pairing Like a Somm" — application. Opens with a spaced recall of the six
// from 2A, then the three principles, a worked example, and guided practice.
const productPairing = {
  id: 'product-pairing',
  track: 'shared',
  status: 'ready',
  eyebrow: 'Shared core',
  title: 'Pairing Like a Somm',
  summary:
    'Three pairing principles, a worked example, then guided practice. Turn knowing the six into pairing them on the fly.',
  objectives: [
    'Apply the three pairing principles to match a SKU to a dish.',
    'Pair each SKU to at least one dish or course with a reason.',
    'Recommend a confident pour for an unfamiliar dish.',
  ],
  spacedRecall: { count: 3 },
  workedExample: {
    label: 'A model pairing',
    setup: 'A guest orders the seared scallops to start, then the lamb, and is not drinking.',
    model: [
      'Scallops are delicate, sweet and a little rich. I reach for NON1, bright and dry with a saline edge, in a white wine stem. It lifts the dish without covering it.',
      'Lamb is rich and full. I move to NON9, the still oaked blackberry and plum, in a red wine stem at cellar temperature. Its tannin stands up to the meat the way a red would.',
    ],
    callouts: [
      'Weight to weight: light SKU for the delicate plate, full SKU for the rich one.',
      'Right glass each time. The ritual is part of the pour.',
      'A reason in one line. Not "this one is nice", but why it works.',
    ],
  },
  segments: [
    {
      id: 'pairing-principles',
      title: 'The three principles',
      minutes: 5,
      body: [
        'Pair NON the way you pair wine, on three principles. Match weight to weight. Use acidity to cut richness. Let structure stand up to protein.',
        'Light and bright with delicate plates: NON1 and NON5 with raw fish, shellfish and fresh cheese. Savoury and rounded with mushroom, roast chicken and umami: NON2. Structured with red meat and braises: NON7, and the still NON9.',
        'You do not need a perfect match. You need a confident one. Name the SKU, name the dish, pour it in the right glass.',
      ],
      points: [
        'Weight to weight.',
        'Acidity against richness.',
        'Structure against protein.',
      ],
    },
    {
      id: 'guided-practice',
      title: 'Guided practice',
      minutes: 5,
      body: [
        'Work through these out loud before you taste. A guest orders oysters: reach for NON5, the bracing acid cuts the brine. A mushroom risotto: NON2, savoury meets savoury. A chocolate dessert: NON7, dark fruit and coffee echo the cocoa.',
        'Notice the move each time: read the weight and the dominant flavour, pick the SKU that meets it, name why in a line.',
        'Then push yourself on a dish not covered here. That is the skill the certification tests.',
      ],
      points: [
        'Read weight and dominant flavour first.',
        'Meet richness with acid, protein with structure.',
        'Always close with a one-line reason.',
      ],
    },
  ],
  practical: {
    title: 'Practical task',
    body: 'Take three dishes off a menu you know. For each, name the SKU you would pour, the glass, and a one-line reason. Then have someone quiz you on a dish you have not pre-planned.',
  },
  quiz: {
    id: 'product-pairing',
    threshold: 80,
    questions: [
      {
        id: 'q1',
        prompt: 'A guest orders oysters to start. Which pour and why?',
        options: [
          'NON9, its tannin suits shellfish',
          'NON5, its bracing acid cuts the brine',
          'NON2, its umami matches the sea',
          'NON7, its coffee note lifts oysters',
        ],
        answer: 1,
        explanation: 'High-acid NON5 cuts salt and brine. Weight and acidity both fit.',
      },
      {
        id: 'q2',
        prompt: 'The main is a rich mushroom risotto. Best pour?',
        options: ['NON1', 'NON2', 'NON5', 'NON9'],
        answer: 1,
        explanation: 'NON2 is savoury and rounded with umami from kombu. Savoury meets savoury.',
      },
      {
        id: 'q3',
        prompt: 'Which principle pairs a full, tannic SKU with red meat?',
        options: [
          'Acidity against richness',
          'Weight to weight and structure against protein',
          'Sweetness against salt',
          'Bubbles against fat',
        ],
        answer: 1,
        explanation: 'Match the weight and let structure stand up to the protein. NON9 with lamb.',
      },
      {
        id: 'q4',
        prompt: 'A guest is on a dark chocolate dessert. Which sparkling SKU echoes it best?',
        options: ['NON1', 'NON5', 'NON7', 'NON2'],
        answer: 2,
        explanation: 'NON7 Stewed Cherry & Coffee mirrors cocoa and dark fruit.',
      },
      {
        id: 'q5',
        prompt: 'What makes a pairing recommendation land with a guest?',
        options: [
          'A perfect, scientific match',
          'A confident choice named with a one-line reason',
          'Offering all six and letting them choose',
          'Avoiding any comparison to wine',
        ],
        answer: 1,
        explanation: 'A confident pairing beats a perfect one. Name the SKU and why in one line.',
      },
    ],
  },
}

// Module order: shared core first (brand story, product mastery, category), then
// the role tracks. getModulesForRole filters shared + the active role.
// ----------------------------------------------------- worked examples
// One annotated model performance per skill module, shown before the practical
// and quiz so novices see the move modelled first. Attached to modules below.
// product-pairing already carries its own inline worked example.
const WORKED = {
  'brand-story': {
    label: 'A model answer at the table',
    setup: 'A guest at a four-top asks, "So what actually is this NON thing?"',
    model: [
      '"It is a drink we make the way a winemaker makes wine. Real ingredients, proper structure, built to sit on the table with the wine, not instead of it. So whether or not you are drinking tonight, you get something considered."',
    ],
    callouts: [
      'Leads with how it is made, not what it lacks.',
      'Puts it on the table as an equal, naming the occasion.',
      'Never says mocktail, alcohol-free, or alternative.',
    ],
  },
  'rep-list-placement': {
    label: 'A model 60-second pitch',
    setup: 'You have one minute with a buyer who is busy and a little sceptical.',
    model: [
      '"Every service you have guests who are not drinking. Right now they get tap water or a soft drink, and you earn nothing from them. NON is six drinks built like wine, poured by the glass beside your wines. Let me pour you one. If you list two to start, you turn those guests into covers."',
    ],
    callouts: [
      'Opens on the buyer\'s gap, not the brand.',
      'Names the commercial upside: covers, not cost.',
      'Closes with a pour and a small, specific ask.',
    ],
  },
  'rep-reading-program': {
    label: 'A model list read',
    setup: 'You are handed a wine-led list with one tired soft-drink line at the bottom.',
    model: [
      '"Strong by-the-glass wines, but the only thing here for a non-drinker is a cola. That is the gap. For this seafood-led room I would lead with NON1 and NON5 by the glass: both bright, both cut through the raw bar, both sit naturally next to your whites."',
    ],
    callouts: [
      'Names the gap in one plain sentence.',
      'Matches the recommendation to the food the venue serves.',
      'Brings two specific SKUs, not the whole range.',
    ],
  },
  'rep-objections': {
    label: 'A model objection turn',
    setup: 'Buyer: "It is too expensive for a soft drink."',
    model: [
      '"It is not priced as a soft drink, it is priced as wine, because it is made like wine and earns a wine-like margin. A non-drinker on tap water earns you nothing. The same guest on a glass of NON earns you real margin per cover. Start with two by the glass and watch what they return."',
    ],
    callouts: [
      'Reframes from cost to margin per cover.',
      'Does not discount; holds the position.',
      'Lowers the risk with a small first step.',
    ],
  },
  'rep-distributor': {
    label: 'A model reorder call',
    setup: 'You are checking in with an account two weeks after the listing went live.',
    model: [
      '"Your NON1 is moving fastest, so let us top that up before you run dry. I will add a case of NON5 to widen the by-the-glass offer, and drop in NON7 to trial with your red drinkers. Same easy reorder, I will handle it."',
    ],
    callouts: [
      'Leads with the mover, protects the hero SKU.',
      'Uses what is selling to widen the range.',
      'Makes reordering effortless for the buyer.',
    ],
  },
  'rep-account-planning': {
    label: 'A model account plan',
    setup: 'A 120-cover bistro, wine-led, owner makes the call.',
    model: [
      '"Goal: two NON by the glass listed within a month, reordering monthly. Visit one, pour NON1 and NON7 for the owner and land the trade-up. Visit two, confirm the listing and set the reorder. Then review what sold and add a third SKU."',
    ],
    callouts: [
      'One specific, measurable goal per account.',
      'A clear sequence: pour, list, reorder, review.',
      'Built on a real read of the venue.',
    ],
  },
  'venue-recommending': {
    label: 'A model recommendation',
    setup: 'A guest orders the snapper and waves away the wine list.',
    model: [
      '"Can I pour you the NON5 with that? Bitter lemon and hibiscus, finishes dry, it cuts through the fish beautifully. I will bring it in a wine glass."',
    ],
    callouts: [
      'Names a specific SKU, not "we have some options".',
      'Gives the reason in one line, tied to the dish.',
      'Pours it in stemware, like wine.',
    ],
  },
  'venue-trade-up': {
    label: 'A model trade-up',
    setup: 'A guest asks for "just a soda water".',
    model: [
      '"I can do that, or I can pour you a NON1 instead. Raspberry and chamomile, finishes dry, it drinks like a proper glass. No pressure, just a better option if you fancy it."',
    ],
    callouts: [
      'Offers the trade up plainly, alongside the default.',
      'One line of why, warm and confident.',
      'No pressure if they say no.',
    ],
  },
  'venue-serve-ritual': {
    label: 'A model serve',
    setup: 'A guest is on the still NON9 with their main.',
    model: [
      'Present the bottle as you would a red. Pour at the table into a red wine stem, served at cellar temperature. "NON9, oaked blackberry and plum, full bodied, it will stand up to the lamb."',
    ],
    callouts: [
      'Right glass: red wine stem for the still SKUs.',
      'Right temperature: cellar, not over-chilled.',
      'The ritual is the same as wine. That is the point.',
    ],
  },
  'venue-pairing-menu': {
    label: 'A model menu pairing',
    setup: 'A non-drinking guest takes the three-course set menu.',
    model: [
      '"Oysters to start, so NON5, the acid cuts the brine. The mushroom risotto next, NON2, savoury meets savoury. And the chocolate tart to finish, NON7, dark fruit and coffee echo the cocoa."',
    ],
    callouts: [
      'Weight to weight across the whole menu.',
      'A reason for each pour, in a line.',
      'A full pairing flight through NON alone.',
    ],
  },
  'venue-sceptical-guest': {
    label: 'A model turn of a sceptic',
    setup: 'Guest: "I do not usually like those."',
    model: [
      '"Fair enough, most of them are sugar. This one is different. Let me pour you a small taste of NON7, it is dry and structured, more like a red. No pressure, just try it."',
    ],
    callouts: [
      'Acknowledges the doubt instead of arguing.',
      'Offers a taste, not a speech.',
      'Describes structure and dryness, lets it land.',
    ],
  },
}

// A short manager-discussion prompt shown at the end of each module for
// distributor-team rollout. Keep it to one practical conversation.
const MANAGER_PROMPT = {
  'brand-story': 'Agree on the one-line answer your team gives when a guest asks what NON is.',
  'product-foundation': 'Quiz each other on the six SKUs until everyone can name them cold.',
  'product-pairing': 'Pick three dishes from your menu and agree the pour for each.',
  'category-context': 'Name the guest occasions in your venue where NON should be offered first.',
  'rep-list-placement': 'Run your 60-second pitch past your manager and tighten it.',
  'rep-reading-program': 'Review a real account list together and agree the placement.',
  'rep-objections': 'Role-play the three objections, one playing the buyer.',
  'rep-distributor': 'Agree which accounts are due a reorder check-in this week.',
  'rep-account-planning': 'Walk your manager through one target account plan.',
  'venue-recommending': 'Agree a recommendation for each section of tonight\'s menu.',
  'venue-trade-up': 'Practise the trade-up line until it feels natural for the floor.',
  'venue-serve-ritual': 'Check glassware and serve temperatures are set for service.',
  'venue-pairing-menu': 'Pair four SKUs across your current menu as a team.',
  'venue-sceptical-guest': 'Role-play the sceptical guest and agree the house response.',
}

// Attach worked examples and manager prompts without editing each module object.
// An inline workedExample on a module wins over the map.
export const modules = [
  brandStory,
  productFoundation,
  productPairing,
  categoryContext,
  // rep track
  repListPlacement,
  repReadingProgram,
  repObjections,
  repDistributor,
  repAccountPlanning,
  // venue track
  venueRecommending,
  venueTradeUp,
  venueServeRitual,
  venuePairingMenu,
  venueScepticalGuest,
].map((m) => ({
  ...m,
  workedExample: m.workedExample || WORKED[m.id] || null,
  managerPrompt: m.managerPrompt || MANAGER_PROMPT[m.id] || null,
}))

// ----------------------------------------------------------- certifications
// Final, role-specific exam after every module in the track is complete.
// Passing earns the badge and unlocks the on-shift quick-reference cards.
export const certifications = {
  venue: {
    id: 'venue',
    title: 'NON Certified Sommelier',
    threshold: 80,
    intro:
      'Complete the shared core and the venue track, then pass the final exam to earn the NON Certified Sommelier badge and unlock the on-shift quick-reference cards.',
    requires: [
      'brand-story',
      'product-foundation',
      'product-pairing',
      'category-context',
      'venue-recommending',
      'venue-trade-up',
      'venue-serve-ritual',
      'venue-pairing-menu',
      'venue-sceptical-guest',
    ],
    exam: {
      id: 'cert-venue',
      threshold: 80,
      // Lead item is a performance task on an unseen menu. Then two scenarios,
      // two serve/glassware items, and one recall backstop. New menu = content
      // edit only (see the `menu` object), no code change.
      questions: [
        {
          id: 'e1',
          type: 'menu',
          prompt:
            'A table of four, one guest not drinking, orders the set menu below. Pair one SKU to each course and give a one-line reason.',
          menu: {
            name: "Tonight's set menu",
            courses: [
              {
                id: 'c1',
                course: 'To start',
                dish: 'Kingfish crudo, finger lime, cucumber',
                accept: ['NON5', 'NON1'],
              },
              {
                id: 'c2',
                course: 'Main',
                dish: 'Confit duck leg, witlof, burnt orange',
                accept: ['NON3', 'NON7', 'NON9'],
              },
              {
                id: 'c3',
                course: 'Dessert',
                dish: 'Bitter chocolate and salted caramel tart',
                accept: ['NON7', 'NON9'],
              },
            ],
          },
          reasonPrompt: 'Why this pour?',
          explanation:
            'Weight to weight, acidity against richness, structure against the protein. Bright NON5 or NON1 lifts the delicate crudo. NON3, NON7 or the still NON9 meets the duck. NON7 or NON9 stands up to dark chocolate. A confident, reasoned pour is the job. [DRAFT: confirm the accepted SKUs per course with Aaron.]',
        },
        {
          id: 'e2',
          type: 'choice',
          prompt: 'A guest says "I do not usually like those". Your move?',
          options: [
            'Insist they will like it',
            'Pour a small taste of NON7 and describe it dry and structured',
            'Bring water instead',
            'Explain it is alcohol-free',
          ],
          answer: 1,
          explanation: 'One honest taste of a structured SKU does what a pitch cannot.',
        },
        {
          id: 'e3',
          type: 'choice',
          prompt: 'A guest asks for "just a lemonade". Best response?',
          options: [
            'Bring the lemonade without comment',
            'We have something made for that. Can I pour you a NON instead?',
            'Tell them lemonade is unhealthy',
            'Offer the cocktail list',
          ],
          answer: 1,
          explanation: 'Offer the trade up plainly and warmly. The default is an opening.',
        },
        {
          id: 'e4',
          type: 'choice',
          prompt: 'Which serve is correct?',
          options: [
            'Still SKUs in flutes, served warm',
            'Sparkling SKUs well chilled in white wine stems',
            'All SKUs over ice in tumblers',
            'Still SKUs in white wine stems only',
          ],
          answer: 1,
          explanation: 'Sparkling SKUs are served well chilled in white wine stems; still SKUs in red wine stems.',
        },
        {
          id: 'e5',
          type: 'choice',
          prompt: 'A guest is on the still NON9 with their main. Glass and temperature?',
          options: [
            'Flute, well chilled',
            'Red wine stem, cellar temperature',
            'Tumbler over ice',
            'White wine stem, room temperature',
          ],
          answer: 1,
          explanation: 'The still SKUs go in red wine stems, served lightly chilled to cellar temperature.',
        },
        {
          id: 'e6',
          type: 'choice',
          prompt: 'Which two SKUs are still?',
          options: ['NON1 and NON2', 'NON3 and NON9', 'NON5 and NON7', 'NON2 and NON5'],
          answer: 1,
          explanation: 'NON3 and NON9 are the still SKUs.',
        },
      ],
    },
  },
  rep: {
    id: 'rep',
    title: 'NON Rep Accreditation',
    threshold: 80,
    intro:
      'Complete the shared core and the rep track, then pass the final exam to earn your NON Accreditation tier.',
    requires: [
      'brand-story',
      'product-foundation',
      'product-pairing',
      'category-context',
      'rep-list-placement',
      'rep-reading-program',
      'rep-objections',
      'rep-distributor',
      'rep-account-planning',
    ],
    exam: {
      id: 'cert-rep',
      threshold: 80,
      // Lead item is a performance task on an unseen beverage list: find the gap
      // and name the two SKUs to pitch with reasons. Then two objection
      // scenarios, one pitch-structure item, and one recall backstop. New list =
      // content edit only (see the `list` object), no code change.
      questions: [
        {
          id: 'e1',
          type: 'list',
          prompt:
            'You are pitching the venue below. Read their by-the-glass list, identify the gap, then choose the two SKUs you would pitch and why.',
          list: {
            name: 'The Cellar Door, by the glass',
            lines: [
              'Sparkling NV',
              'Riesling',
              'Chardonnay',
              'Rosé',
              'Pinot Noir',
              'Shiraz',
              'Soft drinks, juice, sparkling water',
            ],
          },
          gap: {
            prompt: 'Where is the gap?',
            options: [
              'No sparkling wine',
              'Nothing considered for the guest who is not drinking',
              'Too few red wines',
              'No dessert wine',
            ],
            answer: 1,
          },
          pick: {
            prompt: 'Name the two SKUs to pitch first',
            count: 2,
            accept: ['NON1', 'NON5', 'NON7', 'NON9'],
          },
          reasonPrompt: 'Why these two?',
          explanation:
            'The non-drinker lands on soft drinks, juice or water. That is the gap. Lead with two by the glass that cover the range: a bright opener (NON1 or NON5) and a structured pour for the reds drinker (NON7 or NON9). [DRAFT: confirm the accepted opening SKUs with Aaron.]',
        },
        {
          id: 'e2',
          type: 'choice',
          prompt: 'A buyer says NON is too expensive. Best response?',
          options: [
            'Offer a discount',
            'Reframe from cost to margin per cover',
            'Agree and leave',
            'Compare it to soft drinks',
          ],
          answer: 1,
          explanation: 'NON is priced like wine and earns a wine-like margin. Reframe to margin per cover.',
        },
        {
          id: 'e3',
          type: 'choice',
          prompt: 'A buyer says "we already have something". What works?',
          options: [
            'Argue yours is better',
            'Pour NON beside theirs and ask to add by the glass',
            'Leave a price list',
            'End the visit',
          ],
          answer: 1,
          explanation: 'The incumbent is usually a soft drink. Let the difference show, then add by the glass.',
        },
        {
          id: 'e4',
          type: 'choice',
          prompt: 'What are the four beats of the 60-second pitch?',
          options: [
            'Price, discount, deal, contract',
            'Gap, product, proof, ask',
            'Story, awards, brand, history',
            'Feature, feature, feature, feature',
          ],
          answer: 1,
          explanation: 'Gap, product, proof, ask. Lead with the buyer’s gap, close with a pour.',
        },
        {
          id: 'e5',
          type: 'choice',
          prompt: 'Which two SKUs are still?',
          options: ['NON1 and NON2', 'NON3 and NON9', 'NON5 and NON7', 'NON2 and NON5'],
          answer: 1,
          explanation: 'NON3 and NON9 are the still SKUs.',
        },
      ],
    },
  },
}

export default { skus, skuRecallBank, modules, certifications }
