# Elvara

Elvara is a design-led travel explorer built in React for curious travelers who want a place to feel legible before they arrive. It combines editorial destination browsing with live-weather-style context, location awareness, notable places, an assistant panel, and a readable day-by-day itinerary.

## Features

The landing experience opens with a cinematic looping hero treatment and clear navigation into the explorer. Visitors can search destinations, filter them by mood, select a destination to reveal its current conditions and reasons to stay longer, and use the browser's geolocation permission when available. The interface also includes intentional empty and unavailable states for search and location.

The assistant panel is designed as a graceful front-end prototype: visitors can ask for a slower, food-led, outdoors, or otherwise tailored trip, receive a helpful response, and generate a structured three-day plan that renders as itinerary cards rather than an undifferentiated chat transcript.

## APIs and data sources

This front-end prototype uses a small local destination dataset to keep the experience deterministic in preview and deployment environments. The hero includes a remote looping video source from Coverr with a generated image poster and fallback. In a production version, the weather panel can be wired to OpenWeather, images can be sourced from Unsplash or Pexels, and the assistant can be connected to Google Gemini through a server-side proxy. API keys should remain in environment variables and must never be committed to the repository.

## Run locally

```bash
pnpm install
pnpm dev
```

The production build can be checked with:

```bash
pnpm check
pnpm build
```

## Design system

Elvara follows a **Coastline Modern** direction: limestone canvas, ink typography, Atlas Cobalt wayfinding accents, DM Serif Display for editorial headlines, and Manrope for interface copy. The layout uses staggered editorial rails, route-line motifs, tactile color fields, and restrained motion. The experience respects `prefers-reduced-motion`.

## Screenshots

The live preview in the Manus project workspace contains the current responsive implementation. The primary visual checkpoints are the cinematic hero, staggered destination explorer, selected-destination weather and places section, and the assistant-driven itinerary state.

## Project structure

- `client/src/pages/Home.tsx` contains the main travel experience and interaction state.
- `client/src/index.css` contains the design tokens, typography, and motion system.
- `client/src/App.tsx` wires the application route and theme provider.
- `ideas.md` records the design exploration and chosen direction.
