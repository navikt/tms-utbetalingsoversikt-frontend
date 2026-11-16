# CSS modules

Layout comes from Aksel primitives first ([aksel.md](aksel.md)). A CSS module holds what is left.

- `Foo.module.css` sits next to `Foo.astro`/`Foo.tsx` and is imported as `import styles from "./Foo.module.css";` among the other imports. A child or icon may reuse its parent's module (`../Varsler.module.css`).
- Class names are camelCase: Norwegian domain words plus English structure words (`container`, `wrapper`, `heading`, `chevron`). A variant is the base name plus a suffix: `headerContainer` → `headerContainerNyMelding`.
- Spacing, colours, radii and shadows come from Aksel variables for the repo's Aksel version (`--a-*` on 7, `--ax-*` on 8). Use `px` only for widths, borders, the chevron's `translate(3px, 0)` and the `648px` media query, and write a bare `0`.
- When sides differ, write all four values: `padding: var(--ax-space-16) var(--ax-space-20) var(--ax-space-12) var(--ax-space-20);`.
- Rules stay flat. One `@media (min-width: 648px)` block at the very end of the file holds all overrides; responsive layout itself belongs in primitive props.
- The hover nudge on a chevron is exactly:

```css
.headerContainer:hover .chevron {
  transition-duration: 0.2s;
  transform: translate(3px, 0);
}

.chevron {
  flex-shrink: 0;
}
```

- Prefer component props and primitives over overriding Aksel CSS. If you must override an Aksel component's margin or colour, pass your own module class through `className`, never a `.navds-*` or `.aksel-*` selector. On Aksel 8 your class wins as is, because Aksel's CSS sits in `@layer`. On Aksel 7, put `!important` on that one declaration if it loses.
