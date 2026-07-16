import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  base: "/utbetalingsoversikt",
  build: {
    assetsPrefix:
      "https://cdn.nav.no/min-side/tms-utbetalingsoversikt-frontend",
  },
  vite: {
    build: {
      sourcemap: true,
    },
  },
  integrations: [react()],
  logger: {
    entrypoint: "@navikt/astro-logger",
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
