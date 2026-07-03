# Flowspace — an AI focus copilot

Built for **Frontend Battle 2026** (theme: Business & Productivity, with an AI-powered angle).

## Problem

Most to-do apps ignore energy and attention. They treat a 7am brain and an 11am
brain the same, so hard tasks get scheduled at the worst possible time, get
rescheduled, and momentum dies. Flowspace reframes the day around three simple
moves — **Plan, Focus, Reflect** — and uses lightweight pattern detection over
task and focus-session history to surface the one or two things worth acting
on each week.

## What's included

- **Landing page** — problem framing, live focus-ring demo, Plan/Focus/Reflect walkthrough
- **Dashboard** — today's task list with energy tags, a live focus ring, and a start/pause focus timer
- **Insights** — AI-style pattern cards (peak focus hours, slipping tasks, streaks)
- **Analytics** — weekly focus-vs-target bar chart, energy-by-hour line chart, time-by-category breakdown

All data is realistic mock data (`src/data/mockData.js`) so the prototype is fully
interactive without a backend — swap in real user data via the same shape.

## Tech stack

- React 19 + Vite
- Tailwind CSS (custom design tokens — see `tailwind.config.js`)
- React Router (HashRouter, so the build works from a static `index.html` with no server config)
- Recharts for data visualization
- lucide-react for icons
- Fonts: Fraunces (display), Inter (body), IBM Plex Mono (data/timer digits)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The production build outputs to `dist/` and is a static site — deployable as-is
to Vercel, Netlify, or GitHub Pages.

## Slide Presentation & PDF Export

Flowspace comes with a built-in presentation slide deck styled for professional 16:9 Landscape PDF printing. To export your submission:

1. Run the application locally or open your hosted deployment.
2. Navigate directly to the slides path (e.g. `http://localhost:5173/#/slides` or via the footer link).
3. Open the browser's print dialog (press `Ctrl + P` or `Cmd + P`).
4. Apply the following settings:
   - **Destination:** Save as PDF
   - **Layout:** Landscape
   - **Margins:** None (or Default, but ensure no clipping)
   - **Headers and Footers:** Uncheck (removes URL, page number, and date stamps)
   - **Background Graphics:** Check (keeps background colors, custom borders, and SVGs)
5. Save the generated file. This yields a pixel-perfect, 6-page presentation ready for submission.

## Design notes

The **focus ring** is the signature element: it appears in the hero as a live
demo, on the Dashboard as the actual session timer, and on Analytics as the
weekly-goal readout — one visual language used for three real jobs, not a
decorative motif. Palette is a warm paper background with a deep teal accent
(deliberately avoiding the generic "cream + terracotta" AI-app look) and a
muted amber used sparingly for energy/streak highlights.
