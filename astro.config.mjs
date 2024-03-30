import netlify from "@astrojs/netlify";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://datainthewild.fm",
  output: "static",
  adapter: netlify(),
});
