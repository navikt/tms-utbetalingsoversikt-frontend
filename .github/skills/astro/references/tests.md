# Tests

Follow the repo's current test setup and location. Tests are small and direct:

```ts
import { hasOppgaver } from "@src/features/alert-island/varsler/varslerUtils";
import { describe, expect, it } from "vitest";

describe("count predicates", () => {
  it("hasOppgaver should be true only for a positive count", () => {
    expect(hasOppgaver(1)).toBe(true);
    expect(hasOppgaver(0)).toBe(false);
  });
});
```

- Name tests in the language the repo's existing tests use (personopplysninger: Norwegian; tms-min-side: English `it("... should ...")`).
- One `it` per behaviour the task names, with several `expect`s when they belong together (`undefined` and `null` in one test). Two or three tests for a small helper is the norm.
- Use the inputs the task talks about. Skip extra edge-case and "does not mutate" tests.

## Setup (from the Astro docs)

- Vitest is configured with `getViteConfig` from `astro/config`: `export default getViteConfig({ test: { ... } });`.
- Tests that render `.astro` components use the Container API in `environment: "node"`, never jsdom. Keep them in their own Vitest project or config (`*.astro.test.ts`) when the other tests run in jsdom.

```ts
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { loadRenderers } from "astro:container";

const container = await AstroContainer.create({
  renderers: await loadRenderers([getContainerRenderer()]),
});

const html = await container.renderToString(Navn, { props: { language: "nb" } });
```

- On Astro 6, import `getContainerRenderer` from `@astrojs/react` instead.
- Don't rely on `Astro.currentLocale` in a container render (the Container API has no locale option); pass `language` as a prop.
