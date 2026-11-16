---
name: astro
description: Writes and reviews code in team min-side's Astro apps (navikt tms-* frontends, personopplysninger) so it is correct by the current Astro 7 and Aksel docs and follows the team's conventions. Use when creating or changing .astro, .tsx, .ts, .module.css or test files in a min-side Astro app, or when reviewing such a change.
---

# Astro in min-side apps

Your training data on Astro and Aksel is out of date. The rules in this skill are taken from the Astro 7 and Aksel docs, with the docs URL next to each one. Trust them over what you remember.

## Who wins

1. **Astro docs**: APIs and documented recommendations, collected in [references/astro-docs.md](references/astro-docs.md).
2. **Aksel docs**: [references/aksel.md](references/aksel.md).
3. **Team conventions**: this file and the other references, taken from tms-min-side, tms-utkast-frontend and tms-microfrontend-template-ssr.
4. **The repo's existing files.**

Code style in doc examples (function or arrow, `satisfies`) is not a recommendation, so team style wins there. When existing code in the repo breaks a docs rule, write the new code the docs way and leave the old code alone.

## Steps

1. **Versions.** Read `astro` and `@navikt/ds-react` in `package.json`.
   - Astro 7: every rule applies.
   - Astro 6: skip the rules marked **(7)** in astro-docs.md.
   - Astro 5 or older: tell the user the skill is written for Astro 7 and suggest upgrading before following it.
   - Aksel 7 uses `--a-*` CSS variables, Aksel 8 uses `--ax-*`.

   Done when you can name both versions.
2. **Neighbours.** Open two existing files of the same kind in the same repo and mirror their folder, file naming, import style and test location. Done when you can name the two files.
3. **References.** Open these before writing:
   - always: [references/astro-docs.md](references/astro-docs.md)
   - `.astro` pages, sections, islands, endpoints, middleware: [references/astro.md](references/astro.md)
   - layout, Aksel components, `.module.css`: [references/aksel.md](references/aksel.md) and [references/css.md](references/css.md)
   - React `.tsx`: [references/react.md](references/react.md)
   - `.ts` utilities, types, fetch helpers, text: [references/typescript.md](references/typescript.md)
   - tests: [references/tests.md](references/tests.md)
4. **Write.** If you need an Astro or Aksel API that is in neither the references nor a neighbour file, read its docs page before using it: a `docs.astro.build/en/...` page (Astro has no `llms.txt`), or the index at `https://aksel.nav.no/llm.md`. If you can't read the docs, tell the user which API is unverified. Done when every API you used is in a reference, a neighbour or a docs page you read.
5. **Check and run.**
   - Run `astro check`, or the repo's own script for it. `astro build` does not type-check.
   - Start the dev server. On Astro 7 on macOS or Linux, `astro dev` moves itself to the background when an agent runs it; manage it with `astro dev status`, `astro dev logs` and `astro dev stop`. On Windows it stays in the foreground; stop it yourself.
   - Open the changed page, then stop the server.

   Done when the check passes, the page renders with the change, and the server is stopped.
6. **Final check.** Go through the diff line by line against the table below.

## Traps agents hit most

- **(7)** Whitespace that is only a line break between tags, or between text and a tag, is dropped (`compressHTML: "jsx"` is the default); a space on the same line is kept. Where a space must survive a line break, write `{" "}`. A repo with `compressHTML: true` in `astro.config.*` keeps the old spacing.
- Inside a `server:defer` component, `Astro.url` is `/_server-islands/<Name>`. Work out `language` on the page and pass it down as a prop.
- On-demand dynamic routes (the default with `output: "server"`) never use `getStaticPaths`. Read `Astro.params` instead.
- Import middleware helpers from `astro:middleware`, not `astro/middleware`. New env values go in the `astro:env` schema.

## Check table

| | |
|---|---|
| **Always** | No directive on anything static, Aksel components included. A visible interactive React island gets `client:visible` (below the fold) or `client:load`. Use `client:only="react"` only for islands with no server HTML worth showing: error flag, telemetry, decorator language, browser-only APIs. Directives and `server:defer` go last in the attribute list. The page works out `language` once and passes it down. `interface Props` comes right after the imports. Components are `const Name = (...) =>` with `export default Name;` alone on the last line. Fetching happens in the section's frontmatter: `let data = <usable default>`, `let isError = false`, one try/catch, and `{isError && <ClientError client:only="react" />}` first in the markup. Layout uses Aksel primitives with `space-*` tokens. A CSS module covers only what primitives can't do. The smallest diff that does the task. |
| **Ask first** | Red zone: login, OBO token exchange, `Astro.locals.token`, middleware, access control, the local-dev auth bypass (`isLocal`), anything that logs personal data. New dependencies. Shared config (`astro.config.*`, tsconfig, lint rules), except adding an `env.schema` entry for a new env value, which you report in your summary. Moving existing code to the docs way beyond what the task needs. |
| **Never** | Comments of any kind in `.ts`, `.tsx`, `.astro`, `.css`. `enum`, `as const`, `satisfies`, non-null `!`, zod, generic helpers like `fetchData<T>`. `unknown` is allowed only for the `error` prop of `500.astro`. `React.FC`, return types on components, `import React`, hooks beyond `useEffect`/`useId`/`useStore`. Functions as props to hydrated islands. CSS nesting, `:global`, logical properties, the `transition` shorthand, clsx (use `class:list` in `.astro`), inline `style=`, raw `rem` spacing where a token exists. Extra polish: print styles, `:focus-visible` rings, `prefers-reduced-motion`, extra ARIA, named constants for a value used twice. A new barrel `index.ts`, or `utils/`, `types/`, `hooks/`, `services/` folders the repo doesn't have. Refactors or "fixes" beyond the task, including the team's own typos. |
