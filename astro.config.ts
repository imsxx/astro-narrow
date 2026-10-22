import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import { rehypeCodeBlockShell } from "./src/lib/rehype/code-block"
import { rehypeImageAttrs } from "./src/lib/rehype/image-attrs"

export default defineConfig({
  site: "https://narrow.imsxx.com",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [rehypeCodeBlockShell, rehypeImageAttrs],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    },
  },
})
