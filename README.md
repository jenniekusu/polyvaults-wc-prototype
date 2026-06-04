# Football Manager World Cup — Landing Page Prototype

A single-screen, tab-based landing page for the **PolyVaults Football Manager World Cup**
campaign (FIFA World Cup 2026). Built as a visual + interaction prototype with mock data,
matching the PolyVaults brand (warm cream palette, Cormorant Garamond serif headings, DM Sans body).

> **Status:** Prototype. All data is mocked (see `src/data/mockData.js`). No backend,
> no wallet integration, no real transactions. Designed so the data layer can be swapped
> for a real API with minimal changes.

🔗 **Live preview:** https://polyvaults-wc.vercel.app

---

## Quick start

Requirements: **Node 18+** and npm.

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # eslint
```

## Tech stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | React 19 (function components + hooks)  |
| Build tool   | Vite                                    |
| Styling      | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Fonts        | Cormorant Garamond (serif), DM Sans (body) — loaded from Google Fonts in `src/index.css` |
| State        | React `useState` only — **no** localStorage / sessionStorage |

## Project structure

```
src/
├── App.jsx              # All UI. Single file, one component per section/tab.
├── index.css           # Tailwind import + brand design tokens (@theme block)
├── main.jsx            # React entry point
└── data/
    └── mockData.js      # ⭐ ALL mock data lives here — the only file to touch for real data
public/
└── favicon.svg
```

### `App.jsx` layout

The page is a **single screen** with a persistent shell + a tab switcher (no long scroll):

- `Navbar` — sticky top bar (brand, nav, Connect)
- `HeroBanner` — campaign title, dual countdowns, prize pool
- `FundStatusBar` — persistent fund context (name, AUM, ROI, rank, squad flags)
- `TabBar` — switches the content area between 8 tabs
- Tab panels: `IntroTab` (campaign walkthrough), `CredentialsTab`, `StrategyTab`,
  `IndexesTab`, `CalculatorTab`, `RankingsTab`, `ReportTab`, `RulesTab`

State is held in `App` and passed down:
- `activeTab` — which tab is showing
- `credentials` — credential completion state; `handleComplete(key)` flips one to earned
  (this is where you'd wire real verification)

## Wiring up real data

Everything fake is exported from **`src/data/mockData.js`**:

| Export            | Used by            | Notes |
| ----------------- | ------------------ | ----- |
| `mockUser`        | status bar, report, strategy | The current user's fund. Field names mirror a likely API shape (`aum`, `roiPct`, `rank`, `depositMultiplier`, `squad[]`, `credentials{}`, `explorerIndexes{}`, …). |
| `credentialsList` | CredentialsTab     | Static metadata + `actionType` (`external` / `copy` / `internal`) and `actionUrl`. |
| `campaignSteps`   | IntroTab           | The 5-step walkthrough. |
| `wcIndexes`       | StrategyTab        | Pre-built World Cup baskets + custom option. |
| `explorerIndexes` | IndexesTab         | BTC / ETH / OIL / TACO indexes. |
| `leaderboard`     | RankingsTab        | 10-row leaderboard; `isUser: true` marks the highlighted row. |
| `faqItems`        | RulesTab           | FAQ accordion content. |

To integrate a real backend:
1. Replace the imports in `App.jsx` with data fetched from your API (e.g. React Query / SWR).
2. Keep the same object shapes, or adjust the components where fields are read.
3. Replace `handleComplete` in `App.jsx` with a real verification call.
4. The credential action buttons (`CredentialsTab` → `handleAction`) currently open
   external links / copy a referral URL / jump tabs — point these at real flows.

## Brand tokens

Defined in `src/index.css` under the `@theme` block (Tailwind v4). Key colors:

- `--color-cream` `#FAF8F5` (page background)
- `--color-ink` `#1A202C` (primary text / dark buttons)
- `--color-amber` `#B7791F` (prizes, highlights)
- `--color-green` `#2D6A4F` (positive ROI, earned states)
- Field green `#1B4332` is used for the World Cup–themed Fund Report card.

## Notes & known scope

- The Fund Report "Download Image" / "Share to X" buttons are **placeholders** (no handler yet).
- Countdowns are real (live ticking) and target Jun 11 / Jul 19 2026.
- Responsive: mobile-first; the tab bar scrolls horizontally on small screens.
- No routing — it's intentionally one page.
