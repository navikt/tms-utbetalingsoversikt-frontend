import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  base: "/utbetalingsoversikt",
  // Astro 7 changed the default to 'jsx', which strips spaces between inline
  // elements. Pin to HTML-aware compression to keep rendered output identical
  // to Astro 5 (no whitespace regressions in user-facing Norwegian copy).
  compressHTML: true,
  build: {
    assetsPrefix:
      "https://cdn.nav.no/min-side/tms-utbetalingsoversikt-frontend",
  },
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
