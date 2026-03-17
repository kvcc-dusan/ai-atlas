# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

**Stack:** React 19 + React Router 7 + Vite 7, CSS custom properties for theming, PWA via vite-plugin-pwa.

**Routing:** Three routes defined in `App.jsx`:
- `/` — Home (Hero, OnboardingBanner, CardGrid, ToolsSection, UpdatesFeed)
- `/skills/:id` — DetailView
- `/updates/:id` — UpdateDetailView

**Data layer:** All content lives in `src/data.js` — a static file exporting `skills`, `toolsData`, `updates`, `categories`, `stats`, and `navItems`. No backend or API calls; this is a fully static content app.

**Skill data shape:**
```js
{
  id, chapter, category, title, brief, tools, status, lastUpdated, hasDetail,
  detail: { overview, tools, gettingStarted, prompts, tips, relatedSkills }
}
```

**Custom hooks:**
- `useTheme` — dark/light toggle, persisted in localStorage via `data-theme` attribute on `<html>`
- `useAnalytics` — lightweight event logging to localStorage (page views, skill reads, searches)
- `useCountUp` — animated stat counters in Hero
- `useScrollReveal` — Intersection Observer scroll animations

**Styling:** Single `src/index.css` defines all CSS variables (colors, spacing, typography, shadows) for both light and dark themes. Dark mode uses `[data-theme="dark"]` selector. No CSS modules or styled-components — components use inline styles and direct class names referencing these variables.

**PWA:** Configured in `vite.config.js` with auto-updating service workers, Google Fonts caching (1-year expiry), and standalone display mode.
