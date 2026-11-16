# Aksel

Aksel's docs win over team habit. The index of every Aksel docs page is at `https://aksel.nav.no/llm.md`; each page is a `.md` file. Read the page for a component before using a prop you haven't seen in a neighbour file.

## Versions

- `@navikt/ds-react` 7: CSS variables are `--a-*` (`--a-space-16`, `--a-surface-default`).
- `@navikt/ds-react` 8: CSS variables are `--ax-*` (`--ax-space-16`, `--ax-bg-default`). Aksel 8 renamed the `navds-*` classes to `aksel-*`, so `.navds-*` selectors no longer match. Never copy or target Aksel's internal classes. https://aksel.nav.no/grunnleggende/migreringsguider/versjon-8.md
- Primitive props take `space-*` tokens on both versions: `gap="space-16"`, `padding="space-24"`.

## Layout: primitives first

Aksel's layout primitives let you build layout without writing your own CSS (https://aksel.nav.no/grunnleggende/kode/layout-primitives.md):

- `VStack` / `HStack`: one-dimensional flex layout (`gap`, `align`, `justify`, `wrap`)
- `HGrid`: columns (`columns={{ xs: 1, md: 2 }}`)
- `Box`: background, border, radius, shadow and padding
- `Show` / `Hide`: show or hide by breakpoint
- `Page`: top-level page width and centring

Spacing props take `space-*` tokens. Props typed `ResponsiveProp` (`gap`, `padding`, `align`, `justify`, `direction`, `columns`) can vary by breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`); `wrap` and Box `background`, `borderColor` and `shadow` cannot. Mobile first: start with `xs`.

`Chevron` is `import { ChevronRightIcon as Chevron } from "@navikt/aksel-icons";`.

```astro
<VStack gap={{ xs: "space-8", md: "space-16" }}>
  <Heading level="2" size="small">{text.tittel[language]}</Heading>
  <HStack gap="space-16" wrap={false} align="center" justify="space-between">
    <BodyShort>{text.ingress[language]}</BodyShort>
    <Chevron className={styles.chevron} fontSize="24px" aria-hidden={true} />
  </HStack>
</VStack>
```

Primitives are React components, so they render statically in `.astro` with no directive, like other Aksel components.

## Tokens in CSS

Write a CSS module only for what primitives and component props can't do (a hover effect, a border on one side, a fixed width). There, spacing uses the space tokens for the installed version (`padding: var(--ax-space-16);`), and colours, radii and shadows use Aksel variables. Token name = pixel value: `space-16` is `1rem`, `space-4` is `0.25rem`. Full list: https://aksel.nav.no/grunnleggende/styling/design-tokens.md
