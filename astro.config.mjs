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
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
