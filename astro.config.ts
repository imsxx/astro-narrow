import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { siteConfig } from "./src/config/site"
import { remarkMermaid } from "./src/lib/remark/mermaid"
import { rehypeCodeBlockShell } from "./src/lib/rehype/code-block"
import { rehypeKatexGuard } from "./src/lib/rehype/katex-guard"
import { rehypeImageFigure } from "./src/lib/rehype/image-figure"
import { rehypeImageAttrs } from "./src/lib/rehype/image-attrs"

const katexEnabled = siteConfig.katex.enabled

export default defineConfig({
  site: "https://narrow.imsxx.com",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkMermaid, ...(katexEnabled ? [remarkMath] : [])] as never[],
    rehypePlugins: [
      ...(katexEnabled
        ? ([
            rehypeKatexGuard,
            [rehypeKatex, { throwOnError: false, errorColor: "#cc0000" }],
          ] as never[])
        : []),
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
