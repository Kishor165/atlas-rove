# Elvara — Design Direction

## Three Possible Directions

### Theme Name: Salt Atlas
Very quiet editorial travel design: warm paper, deep ink, and sun-faded mineral tones make the interface feel like a beautifully kept field journal.

**Probability:** 0.07

### Theme Name: Night Cartography
A cinematic, low-light map room with indigo surfaces, saffron highlights, and atmospheric glows for a sense of discovery after dark.

**Probability:** 0.03

### Theme Name: Coastline Modern
A fresh, tactile system inspired by Mediterranean wayfinding: cobalt ink, limestone, sea-glass green, and oversized photographic crops create a confident, sunlit travel companion.

**Probability:** 0.06

## Selected Direction: Coastline Modern

### Design Movement
Contemporary Mediterranean modernism blended with Swiss editorial wayfinding: strict typographic hierarchy and clear navigation softened by sun-washed color, generous margins, and expressive photography.

### Core Principles
1. **Editorial confidence:** oversized headlines, short copy, and strong visual pacing should feel like a magazine opener rather than a generic SaaS dashboard.
2. **Wayfinding over decoration:** every interactive element should help the visitor orient, choose, or move forward.
3. **Sunlit tactility:** color blocks, grain, map-like linework, and image crops should create material depth without visual noise.
4. **Useful warmth:** states, helper text, and assistant responses should feel human and calm, especially when an API or location permission fails.

### Color Philosophy
The base is limestone (#F4F0E8), a warm neutral that makes photography and blue ink feel more physical than a white canvas. Cobalt (#1857D5) is the signature wayfinding color: energetic, legible, and associated with open water and hand-painted signs. Sea-glass (#B9D6C7) and marigold (#F3B94C) act as contextual signals rather than decoration—sea-glass for calm and marigold for moments worth noticing. Ink (#15263B) anchors the system with a softer alternative to black.

### Layout Paradigm
Use a staggered editorial rail rather than centered cards: a left-side vertical index, wide asymmetric hero composition, and horizontally drifting destination cards. Details should open as a focused reading column with a persistent weather/plan rail. On mobile, the rail collapses into a sticky chapter bar without losing the sense of sequence.

### Signature Elements
A small cobalt compass mark beside section labels; thin route lines that connect sections like a hand-drawn itinerary; and pill-shaped location chips with one intentionally squared-off edge to echo map legends.

### Interaction Philosophy
Interactions should feel like selecting a point on a map: direct, tactile, and reversible. Hover reveals a destination's route marker and image shift; selected filters stay visibly anchored; assistant actions preview their effect before replacing content. Permission-denied and network-failure states offer a clear alternate path instead of dead-ending.

### Animation
Use short ease-out arrivals (180–240ms) for chips, panels, and image crops. Hero content enters in two staggered waves: eyebrow/heading first, search second. Destination cards lift only 4px and shift their image crop on hover. Route lines draw once on section entry, never loop. Respect reduced motion by removing image zoom and line-draw effects while preserving focus and state changes.

### Typography System
Display: **DM Serif Display**, used for the hero title and destination names with restrained italic emphasis. UI and body: **Manrope**, with 500–700 weights for labels and 400–500 for readable copy. Headings use tight line-height (0.94–1.04); body copy uses 1.55. Eyebrows are uppercase, letter-spaced, and small enough to feel like navigation metadata.

### Brand Essence
**Elvara is a considered travel companion for curious people who want a place to feel legible before they arrive—through live context, visual cues, and a plan that reads like a good recommendation.**

Personality: **curious, grounded, quietly bold**.

### Brand Voice
Headlines are concise and sensory. CTAs are active but unhurried. Microcopy is specific and reassuring, never stuffed with travel clichés.

Example lines: “Go where the light changes.” and “Build a day that leaves room for wandering.”

### Wordmark & Logo
The wordmark uses a custom-styled lowercase “elvara” with the “o” in rove replaced by a small compass ring. The standalone mark is a four-point compass star nested inside an offset route loop, rendered as a cobalt line symbol with no text.

### Signature Brand Color
**Atlas Cobalt — #1857D5.** It should appear as a decisive navigational accent, never as a full-page gradient.

## Style Decisions

- Use a limestone canvas with ink typography and cobalt wayfinding accents.
- Prefer staggered editorial composition over centered SaaS layouts.
- Use photography as a primary storytelling device; avoid repeating the same image in multiple contexts.
- Keep motion short, purposeful, and removable under `prefers-reduced-motion`.

## India Field Journal Refresh

Elvara now leads with an India-first editorial frame: the explorer opens on a broad regional field guide instead of a global shortlist, and the story language moves from generic travel discovery toward local rhythm, colour, craft, altitude, river, coast, and food. The visual system remains Coastline Modern but gains warmer saffron cues and stronger geographic metadata so the UI feels like a contemporary field notebook rather than a booking interface.

The catalog now prioritizes Jaipur, Varanasi, Kerala, Ladakh, Goa, Meghalaya, Hampi, Kolkata, and Mumbai. Each destination carries a distinct travel mood, weather fallback, recommended stay length, and three place-specific reasons to visit. Filters are organized around how a traveler wants to move—slow, mountains, coast, or culture—rather than around generic categories.
