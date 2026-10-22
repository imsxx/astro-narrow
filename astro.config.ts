import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { remarkMermaid } from "./src/lib/remark/mermaid"
import { rehypeCodeBlockShell } from "./src/lib/rehype/code-block"
import { rehypeImageAttrs } from "./src/lib/rehype/image-attrs"

export default defineConfig({
  site: "https://narrow.imsxx.com",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: [
      [rehypeKatex, { throwOnError: false, errorColor: "#cc0000" }],
      rehypeCodeBlockShell,
      rehypeImageAttrs,
    ],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    },
  },
})
