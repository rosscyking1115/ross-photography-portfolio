// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Replace with your real domain when you have one.
  site: "https://ross-photography-portfolio.pages.dev",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Sharp handles AVIF/WebP encoding at build time.
    service: { entrypoint: "astro/assets/services/sharp" },
  },
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "viewport",
  },
});
