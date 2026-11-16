# TypeScript and text

## TypeScript

- Everything is `export const name = (...) => ...`; one-liners use an expression body, with a blank line between them.

```ts
export const hasOppgaver = (oppgaver: number) => oppgaver > 0;

export const hasBeskjeder = (beskjeder: number) => beskjeder > 0;
```

- `interface` for object shapes (domain shapes in a sibling `<feature>Types.ts` as `export interface`), `type` only for string unions like `type Language = "nb" | "nn" | "en"`.
- Return types come from inference. Plain `async`/`await`.
- Branch with flat guard clauses separated by blank lines, ending in an unconditional return.
- Fetch helpers:

```ts
export const fetchUtkast = async (oboToken: string, url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${oboToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Http error with status: ${response.status}`);
  }

  return await response.json();
};
```

- Names: English verb or prefix + Norwegian domain noun (`fetchUtkast`, `hasOppgaver`, `isKommende`, `getProduktkortList`). Domain types and fields are Norwegian, as in the backend JSON. Logs and error messages are English.
- Environment values: new ones go in the `astro:env` schema in `astro.config.*` and are read with `import { INNBOKS_URL } from "astro:env/server";`.

```js
env: {
  schema: {
    INNBOKS_URL: envField.string({
      context: "server",
      access: "secret",
      default: "http://localhost:3000/innboks",
    }),
  },
},
```

  Adding a schema entry for a new value needs no asking, but say so in your summary. New values go in the schema even when the repo also has UPPER_SNAKE objects keyed `local`/`dev`/`prod` (`INNBOKS_URL[getEnvironment()]`). Leave the existing keyed values alone, and never define one value both ways.
- Errors in `catch` are `error: any` (`catch (error: any)`), except in `500.astro`, where the docs type `error` as `unknown`.
- Import types with `import type`; write paths without `.ts`/`.tsx`.

## Text

All visible text lives in a text file (`<feature>Text.ts` or `src/language/text.ts`) as `export const text = { key: { nb, nn, en } }`. Read it as `text.key[language]`; plurals are functions: `nb: (antall: number) => `${antall} nye meldinger``.
