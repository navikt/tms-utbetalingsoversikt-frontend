/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  // Astro's helper accepts this at runtime, but its type here doesn't include Vitest's augmentation.
  // @ts-expect-error Vitest config
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
