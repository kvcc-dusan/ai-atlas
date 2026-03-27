# CLAUDE.md

INOVA IT's internal AI knowledge base — branded "AI Atlas" / "AI Playbook". Lets non-developers browse AI skills, tools, and articles via a public site, and manage all content via a protected admin dashboard backed by Supabase. PWA-capable, no backend beyond Supabase.

## Commands

```bash
npm run dev       # Dev server with HMR (localhost:5173)
npm run build     # Production build → dist/
npm run lint      # ESLint (flat config, eslint.config.js)
npm run preview   # Preview production build locally
```

No test runner configured.

## Stack

- **React 19** + **React Router DOM 7** (using `react-router-dom`, not the framework adapter)
- **Vite 7** + `@vitejs/plugin-react`
- **Supabase** (`@supabase/supabase-js ^2`) — sole backend/database
- **vite-plugin-pwa ^1** — service workers, offline, standalone PWA
- **No TypeScript** — pure JSX; `@types/react` in devDeps is for IDE inference only
- **No Tailwind** — all styling via CSS custom properties in `src/index.css`
- **No CSS modules** — components use class names that reference CSS vars directly

## Environment Variables

Required in `.env.local`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Supabase client is in `src/lib/supabase.js`. Missing env vars cause graceful empty-string fallback, not a hard crash — but the app will fail to load data.

## Project Structure

```
src/
├── App.jsx              # Root — routing, global state, Cmd+K palette
├── main.jsx             # Entry point
├── index.css            # Entire design system: CSS vars, theme, layout, components
├── data.js              # Static reference/seed data (NOT the live data source)
├── lib/
│   └── supabase.js      # Supabase client init
├── hooks/
│   ├── useData.js       # All Supabase queries (source of truth for live data)
│   ├── useTheme.js      # Dark/light toggle, persisted in localStorage
│   ├── useAnalytics.js  # Event tracking to localStorage (max 500 events, 30d)
│   └── useCountUp.js    # Animated stat counters
├── components/          # Public-facing UI
│   ├── Hero.jsx
│   ├── CardGrid.jsx / SkillCard.jsx
│   ├── ToolsSection.jsx
│   ├── UpdatesFeed.jsx / UpdateDetailView.jsx
│   ├── DetailView.jsx
│   ├── CommandPalette.jsx  # Cmd+K / Ctrl+K global shortcut
│   ├── Header.jsx / Footer.jsx
│   ├── Icon.jsx
│   ├── FlickeringGrid.jsx / MagnetLines.jsx  # Decorative canvas effects
│   ├── OnboardingBanner.jsx
│   └── WorkflowsSection.jsx
└── admin/               # CMS dashboard — fully separate from public UI
    ├── AdminLogin.jsx
    ├── ProtectedRoute.jsx
    ├── useAdminAuth.js
    ├── AdminLayout.jsx
    ├── SkillsAdmin.jsx / SkillForm.jsx
    ├── ToolsAdmin.jsx / ToolForm.jsx
    ├── UpdatesAdmin.jsx / UpdateForm.jsx
    ├── SitePreview.jsx
    ├── admin.css            # Admin-specific styles (separate from index.css)
    ├── components/          # Admin-only form components
    │   ├── ImageUpload.jsx
    │   ├── ImageRowsEditor.jsx
    │   ├── MultiSelectDropdown.jsx
    │   ├── RepeatableField.jsx
    │   └── SingleSelectDropdown.jsx
    └── previews/
        ├── PreviewDrawer.jsx
        ├── SkillPreview.jsx
        └── UpdatePreview.jsx

supabase/
├── schema.sql    # DB table definitions
└── seed.sql      # Seed data
```

## Routing

```
/                     → Home (Hero + CardGrid + ToolsSection + UpdatesFeed)
/skills/:id           → DetailView
/updates/:id          → UpdateDetailView
/admin/login          → AdminLogin (public)
/admin                → redirect to /admin/skills
/admin/skills         → SkillsAdmin (protected)
/admin/skills/:id     → SkillForm (protected)
/admin/tools          → ToolsAdmin (protected)
/admin/tools/:id      → ToolForm (protected)
/admin/updates        → UpdatesAdmin (protected)
/admin/updates/:id    → UpdateForm (protected)
/admin/preview        → SitePreview (protected)
*                     → redirect to /
```

Admin routes are detected via `location.pathname.startsWith('/admin')` in `App.jsx` — the public `<Header>` and `<Footer>` are suppressed for all admin paths.

## Data Layer — Critical

**`src/data.js` is NOT the live data source.** It's static reference/seed data. Live data comes from Supabase via `src/hooks/useData.js`.

All data hooks live in `useData.js`:
- `useSkills()` — all skills (mapped from DB)
- `useSkillById(id)` — single skill
- `useTools()` — all tools
- `useUpdates()` — reverse chronological
- `useUpdateById(id)` — single update
- `useStats()` — count aggregation

Hooks return `{ data, loading, error }`. Queries have a 10s timeout. The mapping layer in `useData.js` normalizes DB column names to the shape components expect — if you add a DB column, add it to the mapping here too.

## Data Shapes

**Skill:**
```js
{
  id, chapter, category, title, brief, tools, status, lastUpdated, hasDetail,
  detail: {
    overview: string[],
    tools: { name, best, note }[],
    gettingStarted: string[],
    prompts: { title, context, template }[],
    tips: string[],
    relatedSkills: number[]
  }
}
```

**Tool:**
```js
{
  id, name, provider, category, status, description,
  bestFor: string[],
  usedInSkills: number[],
  tier: 'PRIMARY' | 'SECONDARY' | 'SPECIALIZED'
}
```

**Update:**
```js
{
  id, date, title, summary, tag,
  detail: {
    content: string[],
    actionItems: string[],
    affectedSkills: number[]
  }
}
```

## Styling Conventions

All design tokens are CSS custom properties in `src/index.css`. Light mode on `:root`, dark mode on `[data-theme="dark"]`. Key vars:

```css
--bg-primary, --bg-secondary, --bg-card
--text-primary, --text-secondary, --text-muted
--accent, --accent-dim, --accent-hover
--border-light, --border-medium, --border-dark
--font-sans (Plus Jakarta Sans), --font-mono (Space Grotesk)
--fs-xs through --fs-hero
--space-xs through --space-5xl
--max-width: 1400px, --border-radius: 12px
```

When adding styles: use these vars, not hardcoded values. Don't add Tailwind — it's intentionally absent. Admin-specific styles go in `src/admin/admin.css`.

## Theme

`useTheme` hook — returns `[isDark, toggleTheme]`. Persists to localStorage key `ai-playbook-theme`. Sets `data-theme="dark"` on `<html>`. Default is light mode. Pass `isDark` as prop to components that need it (e.g. `Hero`, `Header`).

## PWA

Configured in `vite.config.js` via `VitePWA`. Auto-updating service workers. Google Fonts cached 1 year (CacheFirst). Icons: `public/icon-192.png`, `public/icon-512.png`. Don't rename or move these — they're in the PWA manifest.

## Gotchas

- **No TypeScript** — don't add `.ts`/`.tsx` extensions or tsconfig. @types packages are dev-only for editor hints.
- **`data.js` is stale** — never read it to understand what's in the DB; check Supabase schema or `useData.js` mapping.
- **Admin auth** is handled by `useAdminAuth.js` — check this before modifying admin routes or protected behavior.
- **ESLint rule:** `no-unused-vars` ignores `UPPER_CASE` variables (pattern `^[A-Z_]`).
- **Fonts** loaded via Google Fonts in `index.html` — not self-hosted, not npm packages.
- **Scroll behavior** — back navigation from `/updates/:id` scrolls to `#updates-section`; from `/skills/:id` goes to `/` top. This logic is in `handleBack()` in `App.jsx`.
- **CommandPalette** is rendered at App level, toggled by `isPaletteOpen` state, triggered by Cmd+K/Ctrl+K global listener.
