# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Israeli voters preparing for the 2026 Knesset elections, across the political spectrum. Most homepage visitors arrive cold, via a WhatsApp/social share from someone else who already used the tool — they don't yet know what the site is and need to understand it fast before committing to the quiz. A smaller share are returning users or people who searched for it directly.

## Product Purpose

Help a voter figure out which party's platform actually matches their own stated positions — not their tribal identity or media diet — through a structured quiz, transparent scoring, and independent research into what parties actually stand for. Success is a voter leaving with a concrete, personally-derived answer (a ranked match list) they didn't have walking in, and enough understanding of *why* to trust it.

## Positioning

100% objective, 0% funded: independent, ad-free, not affiliated with or paid for by any party, built by two volunteers on their own time. All quiz computation happens client-side in the visitor's browser and answers are discarded on page close — nothing is submitted to a server. A neighboring "who should I vote for" quiz run by a media outlet, a party-adjacent org, or a funded campaign could not truthfully make either claim (objectivity or privacy). No signup, no accounts, no tracking of individual answers.

## Operating Context

Used in a short, intense window around Israeli general elections (currently the 2026 cycle). Heavily mobile — the existing product already ships hand-tuned, viewport-fitted mobile layouts (not a squeezed desktop), confirmed as a strength in a prior audit. Distribution is peer-to-peer sharing (the results page has a first-class WhatsApp share action) rather than paid acquisition, so the homepage has to earn trust in seconds from someone who just landed via a friend's link and knows nothing about the site yet. Available in Hebrew (RTL, default), English, and Arabic (RTL).

## Capabilities and Constraints

- A quiz engine with two modes: "fast track" (20 questions, ~3 min) and "comprehensive track" (58 questions, ~8 min), plus a sector/bloc/threshold filter step and a scored, ranked results page (match % per party, computed from a documented distance+direction formula shown on the About page).
- A party platform reference section ("מצעים") — short, neutral per-party summaries plus full per-party profile pages, broken down by policy category.
- "הנושאים החמים" (hot topics) — neutral, two-sided explainers on contested issues, independent of the quiz.
- "מפרק בועות" ("bubble popper" / challenge) — an existing feature that confronts a visitor with the strongest opposing arguments to positions they hold, explicitly meant to challenge existing opinions rather than confirm them.
- No backend accounts; everything computed and stored client-side (localStorage) for quiz-progress resume only.
- Constraint for this redesign specifically: reorganize the homepage's information architecture around three pillars — quiz (dominant, by far the most-used entry point), party information (the existing platforms page, redesigned as the pillar's home), and challenge-your-views (the existing bubble-popper feature) — folding today's secondary links (how-it-works, hot topics, news) into whichever pillar they belong under, rather than keeping them as a separate row. This is a restructuring of an established surface, not a rebrand: the existing visual system (see Brand Commitments) stays intact.

## Brand Commitments

- Name: "מצפן בחירות 2026" (Elections Compass 2026); a compass mark is the site's recurring motif (nav icon, hero eyebrow, how-it-works badge).
- Established palette: navy/navy-light as the primary dark surface, sapphire and emerald/success as the two "quiz track" accent colors, gold reserved for the results page's #1-match badge, coral/amber used for the hot-topics and challenge accents respectively.
- Recurring signature elements: a diagonal torn-paper ribbon banner ("100% אובייקטיבי · 0% ממומן"), a Star of David line-art watermark on the homepage hero, a dotted-grid decorative background texture.
- A prior design audit scored this system's implementation integrity 4/4 ("coherent, product-specific, doesn't read as templated") — preserve it; this task is IA/composition work inside that established world, not a new visual-identity exercise.

## Evidence on Hand

- Real, already-authored content for all three pillars: full quiz question bank (`src/data/questions`), real per-party platform text in three languages (`src/data/parties`), real hot-topics explainers (`src/components/topics`), and a working bubble-popper challenge flow (`src/app/[lang]/challenge`). Nothing in this redesign needs placeholder content.
- No usage numbers, launch date, or press mentions exist to display (confirmed: none exist yet). Do not invent a "used by N voters" or "since 20XX" stat — lean on the objectivity/independence/privacy claims only, which are already true and already the badge shown today.
- Built by two independent volunteers (אוהד בר אלי, איתי אילת) per the About page; this "built by volunteers, not an institution" fact is available if a pillar needs a trust signal, but is not currently surfaced on the homepage itself.

## Product Principles

1. Objectivity over persuasion — never nudge the visitor toward an answer; the tool's entire claim to trust rests on this.
2. Privacy by default — no accounts, no server-side answer storage; state this plainly where it reduces friction to starting.
3. Mobile-first, sittable in one sitting — the fast track (3 min) is the product's actual center of gravity per usage, not a secondary option to the comprehensive track.
4. Earn trust from a cold, shared link fast — most visitors arrive via WhatsApp with zero context; the first viewport must make the "what is this and can I trust it" case before asking for any commitment.
5. RTL-native, not RTL-adapted — Hebrew and Arabic are first-class, not a mirrored afterthought.

## Accessibility & Inclusion

No project-specific requirement beyond standard web accessibility (WCAG AA target); prior audit found no major gaps but flagged it as spot-checked, not exhaustively verified.
