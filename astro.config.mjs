import node from "@astrojs/node";
import react from "@astrojs/react";
import mockServer from "@navikt/astro-mocks";
import { defineConfig } from "astro/config";
import { utbetalingMocks } from "./src/mocks/utbetalinger.ts";

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
  integrations: [react(), mockServer({ mocks: utbetalingMocks })],
  logger: {
    entrypoint: "@navikt/astro-logger",
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
