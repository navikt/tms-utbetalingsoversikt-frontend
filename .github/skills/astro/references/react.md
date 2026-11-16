# React components

```tsx
import type { Language } from "../../shared/language/language";
import { text } from "./innboksText";

interface Props {
  innbokser: number;
  language: Language;
}

const InnboksTag = ({ innbokser, language }: Props) => {
  if (innbokser > 0) {
    return (
      <Tag variant="moderate" size="small">
        {innbokser === 1 ? text.innboksNyMeldingEntall[language] : text.innboksNyMeldingFlertall[language](innbokser)}
      </Tag>
    );
  }

  return null;
};

export default InnboksTag;
```

- `const Name = (...) =>`, one per file, and `export default Name;` alone on the last line.
- Props: unexported `interface Props` above the component, destructured in the signature. A hydrated island's props must be serializable (plain objects, arrays, strings, numbers, `Date`), never functions.
- A `.tsx` file never imports a `.astro` component.
- Layout inside a component uses Aksel primitives (`HStack`, `VStack`, `HGrid`, `Box`) with `space-*` tokens. See [aksel.md](aksel.md).
- Branch on the whole output with an early `if (...) { return (...); }` then `return null;`.
- Headless islands call their hook or function straight in the body and `return null;`.
- Handlers are inline: `onClick={() => logEvent("innloggede-tjenester-lenke", ...)}`.
- Hooks in use: `useEffect` inside a `useX` hook, `useId` for SVG titles, nanostores `useStore`. Shared client state is a nanostores `atom` in `src/store/store.ts`.
- SVG icons: a no-prop `const IkonX = () => (<svg ... aria-hidden={true}>...</svg>);` in the feature's `assets/` folder.
