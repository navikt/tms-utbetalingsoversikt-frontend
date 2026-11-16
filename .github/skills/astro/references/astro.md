# .astro files, islands, endpoints and middleware

Team conventions. Where they touch an API, the rule in [astro-docs.md](astro-docs.md) wins.

## .astro or .tsx

- Pages, layouts, lists and anything that fetches data are `.astro`. Aksel components (`Heading`, `BodyShort`, `Alert`, `Skeleton`, `Tag`, `HStack`, `VStack`) go straight into `.astro` markup with no directive.
- `.tsx` is for client islands (error flag, telemetry, decorator language, a link with click tracking inside a `.map`, an interactive widget), for small presentational pieces rendered statically, and for SVG icons.
- Hydration, picked by what the user sees:
  - static: no directive
  - a visible interactive widget: `client:visible` when it sits below the fold, `client:load` when it must work at once
  - an island with no server HTML worth showing (error flag, telemetry, decorator language, browser-only APIs): `client:only="react"`
- Write the directive as the **last** attribute.
- A data-fetching section is mounted with `server:defer` (last attribute) and a fallback child: `<UtbetalingFallback slot="fallback" />`, or an Aksel `<Skeleton ... slot="fallback" />` the size of the final content.
- Islands get flat, serializable props: `language` plus at most one plain object or primitive. Never a function.
- Click tracking on one static element uses an `id` on it and a plain `<script>` at the end of the component. On repeated elements from a `.map`, use a small `.tsx` link island, not repeated ids.

```astro
<Utbetaling language={language} server:defer>
  <UtbetalingFallback slot="fallback" />
</Utbetaling>
<Feilmelding language={language} client:only="react" />
```

```astro
<script>
  import { logEvent } from "../../../utils/client/umami";

  const seAlle = document.querySelector("#seAlle");

  seAlle?.addEventListener("click", () => {
    logEvent("utbetaling-widget", "generell", "se-alle-utbetalinger");
  });
</script>
```

## Frontmatter

Order: imports → `interface Props` → destructuring → data → derived consts.

- Props: `interface Props { ... }` right after the imports and a blank line (`export interface Props` only in layouts). Read them in one line, `const { a, b } = Astro.props;`, with no type annotation. Give a default only to a prop that is optional in `Props`.
- Language: the page reads it once, with `const language = Astro.currentLocale as Language;` in repos with i18n routing, otherwise with the repo's own helper. It passes `language={language}` down to every section and island. A `server:defer` section never works out the language itself, because `Astro.url` there is `/_server-islands/...`.
- Data fetching is in the frontmatter of the section that renders it: a `let` with a usable default, `let isError = false`, and one try/catch that swallows the error.

```astro
const audience = getAudience("tms-min-side-proxy");
const oboToken = await getOboToken(Astro.locals.token, audience);

let data = { navn: "", ident: "" };
let isError = false;

try {
  data = await fetchData(oboToken, navnUrl);
} catch (error: any) {
  logger.error(`Fetching navn failed. ${error.message}`);
  isError = true;
}
---

{isError && <ClientError client:only="react" />}
```

- After the try/catch, unpack into plain consts named `isX`/`hasX` with Norwegian domain words: `const isKommende = data.kommende && !data.sisteUtbetaling;`.
- A redirect route is frontmatter only: `return Astro.redirect(varslerUrl);`. Redirects happen in pages, never in sections or islands.

## Markup

- HTML elements take `class={styles.x}`; Aksel and React components take `className={styles.x}`.
- Combine classes on HTML elements with `class:list={[styles.a, { [styles.b]: isActive }]}`. On a component, use a template literal: `` className={`${styles.a} ${styles.b}`} ``.
- Conditionals are `{cond && (...)}` or a ternary with `null`.
- Headings: `<Heading level="2" size="xsmall">` with string literals. The link arrow is `import { ChevronRightIcon as Chevron } from "@navikt/aksel-icons";`, rendered as `<Chevron className={styles.chevron} fontSize="24px" aria-hidden={true} />`.
- Links to another locale in the same app use `getRelativeLocaleUrl(language, "path")` from `astro:i18n`. Links to other apps use their URL from the env config.

## Endpoints, middleware, error page

These are red zone when they touch auth: ask first.

```ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(null, { status: 200 });
};
```

- Health checks live in `src/pages/api/internal/` as `isAlive.ts` and `isReady.ts`, or wherever the repo already keeps them.
- New middleware imports `defineMiddleware` and `sequence` from `astro:middleware` and exports `onRequest`. It sets `context.locals.token = ...` and never replaces `locals`. Its types go in `src/env.d.ts` under `App.Locals`. Don't touch the import in an existing middleware file as a drive-by.
- Unhandled errors show `src/pages/500.astro`:

```astro
---
interface Props {
  error: unknown;
}

const { error } = Astro.props;
---
```

  Log `error instanceof Error ? error.message : error`. Show the repo's normal error text, never the error or its stack; this is a team rule, stricter than the docs example. The page must not read `Astro.locals.token`.
