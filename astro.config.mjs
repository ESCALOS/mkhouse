import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "http://localhost:4321",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), tailwind(), icon()],
  adapter: vercel(),
});
