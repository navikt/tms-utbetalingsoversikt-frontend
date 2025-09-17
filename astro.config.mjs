import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import importmap from "./importmap.json";

// https://astro.build/config
export default defineConfig({
  base: "/utbetalingsoversikt",
  build: {
    assetsPrefix:
      "https://cdn.nav.no/min-side/tms-utbetalingsoversikt-frontend",
  },
  integrations: [
    react(),
    {
      name: "importmap",
      hooks: {
        "astro:build:setup": ({ vite, target }) => {
          if (target === "client") {
            vite.plugins.push({
              ...rollupImportMapPlugin(importmap),
              enforce: "pre",
              apply: "build",
            });
          }
        },
      },
    },
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
