# tms-utbetalingsoversikt-frontend

Astro 7 SSR app for Nav's payment overview ("utbetalinger") at `nav.no/utbetalingsoversikt`, in Norwegian bokmål only. The list page is a `client:only` React island that fetches in the browser; the detail page `utbetaling/[id]` fetches on the server with TokenX. React 18, Aksel 8 (`--ax-*` tokens), TypeScript 5, pnpm 10, Node 24.

## Commands

- Install: `pnpm install`. The `@navikt` packages need a GitHub token with `read:packages` in `~/.npmrc`; if install fails on auth, stop and ask.
- Dev: `pnpm run dev`, served at `http://localhost:4321/utbetalingsoversikt`. `@navikt/astro-mocks` answers the backend calls inside it: each entry in `src/mocks/utbetalinger.ts` is a route at the origin root, and its `path` and `method` must match the `local` URL in `src/utils/client/urls.ts` or `src/utils/server/urls.ts` that calls it.
- Before you say a change is done: `pnpm run verify` (`astro check`, then Vitest). Vitest only runs `test/unit/**/*.test.{ts,tsx}`: put unit tests there, in the folder that mirrors the source file's, and import from `src/` with the `@src/*` alias.
- When a page, visible text or a file in `src/mocks/` changed: `pnpm run test:e2e`. The Playwright specs in `test/integration` assert on visible text, the mock data and accessibility (axe). Playwright starts the dev server itself, or reuses one already running on port 4321. Needs `pnpm exec playwright install chromium` once.
- Biome runs in the husky pre-commit hook (lint-staged) on staged JS, TS, JSON and Astro files (formats, sorts imports, applies safe lint fixes). For CSS, run `pnpm exec biome check --write <file>` yourself. Never run it on `nais/*/nais.yaml` (it rewrites `{{ image }}`) or on the whole repo: `biome check .` is not clean on main.

## Rules

- Use the `astro` skill before editing `.astro`, `.tsx`, `.ts` or `.css` files. If `/astro` or `/commit` is missing, tell the developer to trust this folder in Copilot CLI and start a new session.
- Ask first before changing authentication (`src/middleware.ts`, `@navikt/astro-auth`), TokenX token exchange and its local bypass (`src/utils/server/token.ts`, `isLocal` in `src/utils/server/environment.ts`, `Astro.locals.token`), `src/pages/api/navn.ts` (returns name and national identity number), `astro.config.mjs`, `nais/` or `.github/workflows/` (a push to `main` runs `deploy-main.yaml` for dev and prod), or anything that logs personal data, and before adding a dependency.
- React is 18, not the 19 the `astro` skill assumes: use no React 19 API (`use`, `useActionState`, `ref` as a plain prop) and do not upgrade React as part of another task.
- `src/utils/client/urls.ts` reads `window.location` when it is imported and picks URLs by hostname. Code that imports it only works inside a `client:only="react"` island, never in server-rendered code or a `client:load`/`client:visible` island; `pnpm run verify` does not catch this. Server-rendered code imports `src/utils/server/urls.ts`.
- `ErrorPanel` and `PrintPageHeading` each exist as `.astro` (server) and `.tsx` (island): change both.
- There is no i18n here: write visible text in bokmål in the component, and do not add `language` props, nn/en text or locale routes.
