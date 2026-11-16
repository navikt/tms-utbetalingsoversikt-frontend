# Astro docs rules

These rules come from the Astro 7 docs. Each one names the docs page it comes from, so you don't need to look it up. **(7)** means Astro 7 only; everything else also holds on Astro 6. Astro has no `llms.txt`; if you need more, read the HTML page at the URL.

## Version traps

- **(7)** `compressHTML` defaults to `"jsx"`. Whitespace that is only a line break between tags, or between text and a tag, is removed; a space on the same line is kept. Write `{" "}` where a space must survive a line break. https://docs.astro.build/en/guides/upgrade-to/v7/#new-default-whitespace-handling-compresshtml-jsx
- **(7)** The Rust compiler fails on unclosed non-void tags and no longer repairs invalid HTML. Close every tag. https://docs.astro.build/en/guides/upgrade-to/v7/#rust-compiler
- **(7)** `src/fetch.ts` is a reserved file name. Never name a helper that. https://docs.astro.build/en/guides/upgrade-to/v7/#reserved-file-name-srcfetchts
- **(7)** On macOS and Linux, when an AI agent runs `astro dev`, it starts as a background process (on Windows it stays in the foreground; `--background` forces it). Manage a background server with `astro dev status`, `astro dev logs` and `astro dev stop`; turn it off with `ASTRO_DEV_BACKGROUND=0`. https://docs.astro.build/en/guides/build-with-ai/#background-mode · https://docs.astro.build/en/reference/cli-reference/#common-subcommands
- **(7)** Import `getContainerRenderer` from `@astrojs/react/container-renderer`; the root import from `@astrojs/react` is deprecated. On Astro 6 (`@astrojs/react` 5.x) only the root import exists. https://docs.astro.build/en/guides/upgrade-to/v7/#deprecated
- Gone, never write them: `output: "hybrid"`, `Astro.glob()`, `<ViewTransitions />` (now `<ClientRouter />`), and `env` or `serverIslands` under `experimental`. https://docs.astro.build/en/guides/upgrade-to/v5/#removed · https://docs.astro.build/en/guides/upgrade-to/v6/#removed-astroglob · https://docs.astro.build/en/guides/upgrade-to/v6/#removed-viewtransitions--component
- **(7)** `@astrojs/db` is removed. https://docs.astro.build/en/guides/upgrade-to/v7/#removed-astrojsdb
- Node 22.12 or newer. https://docs.astro.build/en/guides/upgrade-to/v6/#node-22
- With `getViteConfig`, Vitest must be 3.2 or newer on the 3.x line, or 4.1 or newer; not 4.0. https://docs.astro.build/en/guides/upgrade-to/v6/#vite-70

## Client islands (React)

- A framework component with no `client:*` directive renders as HTML with no JavaScript. https://docs.astro.build/en/reference/directives-reference/#client-directives
- `client:load` hydrates as soon as the page loads, `client:idle` when the browser is idle, and `client:visible` when the island scrolls into view. Same page as above.
- `client:only="react"` skips server rendering: nothing shows until the JS has loaded. It needs the framework name, and a child with `slot="fallback"` shows while it loads. https://docs.astro.build/en/reference/directives-reference/#clientonly
- `client:*` directives only work on a framework component imported directly into a `.astro` file, never on `.astro` components. Write any directive literally on the tag, never inside a `{...spread}`. https://docs.astro.build/en/reference/directives-reference/#client-directives · https://docs.astro.build/en/reference/directives-reference/#rules
- Props to a hydrated island must be serializable. Plain objects, arrays, numbers, strings, `Date`, `Map`, `Set` and `URL` are fine; functions are not. https://docs.astro.build/en/guides/framework-components/#passing-props-to-framework-components
- A `.tsx` file can't import a `.astro` component. Pass Astro content in as children or named slots from the `.astro` parent. https://docs.astro.build/en/guides/framework-components/#can-i-use-astro-components-inside-my-framework-components

## Server islands (`server:defer`)

- `server:defer` only works on `.astro` components and needs an adapter. https://docs.astro.build/en/guides/server-islands/
- Inside an island, `Astro.url` and `Astro.request.url` are `/_server-islands/<Name>`. Take what you need from the page (such as `language`) and pass it as a prop. The docs don't say what `Astro.currentLocale` returns inside an island, so don't rely on it there. https://docs.astro.build/en/guides/server-islands/#accessing-the-page-url-in-a-server-island
- Island props are serialized: no functions. They travel in the URL, and past 2048 bytes the request becomes an uncacheable POST, so pass only what the island needs. https://docs.astro.build/en/guides/server-islands/#caching
- A child with `slot="fallback"` shows until the island arrives. Make it the same size as the final content. https://docs.astro.build/en/guides/server-islands/#server-island-fallback-content
- On rolling deploys, islands need a constant `ASTRO_KEY` (made with `astro create-key`). If islands fail during a deploy, that is the cause. https://docs.astro.build/en/guides/server-islands/#reusing-the-encryption-key

## Routing and SSR

- With `output: "server"`, on-demand dynamic routes read `Astro.params`. They use no `getStaticPaths` and get no route props, and `prerender = false` is not needed. Only a dynamic route you prerender with `export const prerender = true` uses `getStaticPaths`. https://docs.astro.build/en/guides/routing/#on-demand-dynamic-routes
- `export const prerender = true` takes a literal boolean, and only goes on pages that are fully static. https://docs.astro.build/en/guides/on-demand-rendering/#enabling-on-demand-rendering
- `return Astro.redirect(url)` only works in a page, not in a component, layout or island. The default status is 302. Cookies, headers and status can only be set in a page, endpoint or middleware. https://docs.astro.build/en/reference/api-reference/#redirect · https://docs.astro.build/en/guides/on-demand-rendering/#on-demand-rendering-features
- Unhandled render errors on on-demand pages show `src/pages/500.astro`. It gets an `error` prop typed `unknown`; narrow it with `error instanceof Error`, and never show the stack. The docs example shows `error.message`; the team doesn't (see astro.md). A page called `error.astro` is just an ordinary route. https://docs.astro.build/en/basics/astro-pages/#custom-500-error-page
- `Astro.currentLocale` is `string | undefined`. https://docs.astro.build/en/reference/api-reference/#currentlocale
- For links to another locale in the same app, use `getRelativeLocaleUrl(language, "path")` from `astro:i18n`. Build links to other apps from their URL. https://docs.astro.build/en/guides/internationalization/#create-links
- On Astro 6 and 7, `redirectToDefaultLocale` defaults to `false` and requires `prefixDefaultLocale: true`. https://docs.astro.build/en/guides/upgrade-to/v6/#changed-i18nroutingredirecttodefaultlocale-default-value

## Middleware and endpoints

- Middleware lives in `src/middleware.ts` (or `src/middleware/index.ts`) as a named `onRequest` export, wrapped in `defineMiddleware` from `astro:middleware`. Chain several with `sequence`. Every path returns `next()` or a `Response`. https://docs.astro.build/en/reference/modules/astro-middleware/
- Set values with `context.locals.x = ...`; never replace `locals` itself. https://docs.astro.build/en/guides/upgrade-to/v5/#changed-adding-values-to-contextlocals
- Type locals in `src/env.d.ts` with `declare namespace App { interface Locals { ... } }`. https://docs.astro.build/en/guides/middleware/#middleware-types
- Middleware also runs for the 404 and 500 pages. If the middleware itself threw, the 500 page gets no locals, so error pages must not depend on `Astro.locals.token`. https://docs.astro.build/en/guides/middleware/#error-pages
- An endpoint is a `.ts` file in `src/pages/` that exports an uppercase method, `export const GET: APIRoute = ...`, and returns a `Response` on every path. https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes
- `security.checkOrigin` is on by default. On on-demand pages, a cross-origin POST, PUT, PATCH or DELETE with no content type, or with `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`, gets a 403. Other content types, such as `application/json`, are not checked. https://docs.astro.build/en/reference/configuration-reference/#securitycheckorigin

## Environment variables

- New values go in `env.schema` (in `astro.config.*`, built with `envField`) and are imported from `astro:env/server`. Use `context: "server", access: "secret"` for values that differ per cluster. https://docs.astro.build/en/guides/environment-variables/#type-safe-environment-variables
- `astro:env` can't be used in `astro.config.*`; use `process.env` there. https://docs.astro.build/en/guides/environment-variables/#limitations
- `import.meta.env` values are inlined at build time, so never use them for values that change per environment at runtime. Use `import.meta.env.DEV`/`PROD` to tell dev from prod. https://docs.astro.build/en/guides/upgrade-to/v6/#changed-importmetaenv-values-are-always-inlined · https://docs.astro.build/en/guides/environment-variables/#default-environment-variables

## Scripts and styles

- A `<script>` with no attributes is bundled, can be TypeScript, and runs once per page even if the component repeats; use `querySelectorAll` when there are several. Any attribute other than `src` makes it inline and unprocessed. https://docs.astro.build/en/guides/client-side-scripts/#script-processing
- Pass frontmatter values to a bundled `<script>` through `data-*` attributes. `define:vars` also works but makes the script `is:inline` (not bundled, repeated per instance), so don't use it. https://docs.astro.build/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts
- CSS modules must be named `*.module.css`. In `.astro` markup HTML elements take `class`; build conditional classes with `class:list={[styles.a, { [styles.b]: isActive }]}`. https://docs.astro.build/en/guides/imports/#css-modules · https://docs.astro.build/en/reference/directives-reference/#classlist
- An Astro component that accepts `class` reads it as `const { class: className, ...rest } = Astro.props;` and puts `class={className} {...rest}` on its root element; `...rest` carries the `data-astro-cid-*` attribute the parent's scoped styles need. https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component

## TypeScript and tests

- Type-check with `astro check`; `astro build` does not type-check. https://docs.astro.build/en/guides/typescript/#type-checking
- Vitest config: `export default getViteConfig({ test: { ... } })` with `getViteConfig` from `astro/config`. https://docs.astro.build/en/guides/testing/#vitest
- Tests that render `.astro` components with the Container API run in `environment: "node"`, never jsdom. https://docs.astro.build/en/guides/upgrade-to/v6/#changed-astro-components-cannot-be-rendered-in-vitest-client-environments-container-api
- Container setup: `const container = await experimental_AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });`, with `experimental_AstroContainer` from `astro/container`, `loadRenderers` from `astro:container` and `getContainerRenderer` from `@astrojs/react/container-renderer` (on Astro 6: from `@astrojs/react`). Render with `container.renderToString(Component, { props, slots, locals, request })`. The API is experimental. https://docs.astro.build/en/reference/container-reference/
