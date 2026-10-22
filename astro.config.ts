import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { siteConfig } from "./src/config/site"
import { remarkMermaid } from "./src/lib/remark/mermaid"
import { rehypeAlert } from "./src/lib/rehype/alert"
import { rehypeBaseLinks } from "./src/lib/rehype/base-links"
import { rehypeCodeBlockShell } from "./src/lib/rehype/code-block"
import { rehypeKatexGuard } from "./src/lib/rehype/katex-guard"
import { rehypeImageFigure } from "./src/lib/rehype/image-figure"
import { rehypeImageAttrs } from "./src/lib/rehype/image-attrs"

const katexEnabled = siteConfig.katex.enabled

export default defineConfig({
  // Replace with the domain you deploy to: it drives canonical URLs, the sitemap and robots.txt.
  site: "https://example.com",
  base: siteConfig.base,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [
      remarkMermaid,
      ...(katexEnabled ? [remarkMath] : []),
    ] as never[],
    rehypePlugins: [
      ...(katexEnabled
        ? ([
            rehypeKatexGuard,
            [rehypeKatex, { throwOnError: false, errorColor: "#cc0000" }],
          ] as never[])
        : []),
      rehypeAlert,
      rehypeBaseLinks,
      rehypeCodeBlockShell,
      rehypeImageFigure,
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
