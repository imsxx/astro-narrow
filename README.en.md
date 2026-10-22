# astro-narrow

**English** · [简体中文](./README.md)

An Astro port of [hugo-narrow](https://github.com/tom2almighty/hugo-narrow).

This is a from-scratch reimplementation, not a line-by-line template translation. The feature set
and visual output follow the upstream theme; the implementation uses Astro's native capabilities
wherever they replace hand-rolled Hugo logic (image pipeline, code highlighting, TOC, config
validation).

- Upstream: `hugo-narrow v2.0.2`
- Built on Astro 7 + Tailwind CSS 4
- Live demo: [imsxx.com](https://imsxx.com) — the author's blog, running this theme unmodified

## What works

- Layout shell: content column, floating dock, breadcrumb context bar, footer
- Appearance panel: 12 colour schemes, light/dark/system, width / blur / grain sliders
- Posts: header meta, prose typography, TOC panel with pin, reading progress, prev/next,
  related posts, series progress bar and popover
- Lists: posts with pagination, archives by year/month, tags, categories, series
- Search: client-side index with Ctrl+K modal
- Code blocks: Shiki dual theme, language label, copy, collapse
- Math: KaTeX rendered at build time
- Diagrams: Mermaid loaded on demand, re-rendered on theme change
- Images: adjacent images grouped into a gallery with layout switcher and lightbox
- Embeds: button, link card, tabs, Bilibili, Tencent Video (MDX components)
- Standalone pages: about, resume, timeline, projects
- Comments: giscus, disqus, utterances, waline, artalk, twikoo, comentario
- Analytics: Google, Baidu, Clarity, Umami
- UI locales: 13 languages generated from the upstream i18n files
- Feeds: RSS, sitemap, SVG icon sprite endpoint, web manifest

## Feature switches

Every feature is off the moment its switch is off — no markup, no script, no network request.
All of them live in `src/config/site.ts` and are validated by Zod.

| Switch | Default | Effect when off |
| --- | --- | --- |
| `announcement.enabled` | `false` | no banner |
| `toc.enabled` | `true` | no TOC panel, dock button hidden |
| `readingProgress.enabled` | `true` | no progress bar |
| `search` | always on | index endpoint still generated |
| `comments.enabled` + `system` | `false` | no comment markup; provider config required |
| `analytics.provider` | `""` | no analytics script |
| `katex.enabled` | `true` | math stays literal text, KaTeX plugin not registered |
| `mermaid.enabled` | `true` | diagram blocks render as code, no runtime loaded |
| `gallery.enabled` | `true` | images stay plain `<img>` |
| `lightbox.enabled` | `true` | gallery has no lightbox |
| `codeblock.collapse.enabled` | `true` | no collapse button |
| `post.showRelated` | `true` | no related section |

### Page-level overrides

A post can override the site default in its front matter:

```yaml
toc: false
comments: false # or { enabled: true, system: "giscus" }
katex: false
mermaid: false
lightbox: false
license: "CC BY-ND 4.0" # or false to hide it
```

Both `key: false` and `key: { enabled: false }` are accepted, same as upstream. `katex` and
`mermaid` are resolved at build time, before the markdown is rendered, so a disabled block keeps its
literal source instead of being half-processed.

## Not ported yet

- Localized routes (UI copy switches via `lang`, content is single-locale)
- Gallery layouts beyond the three the upstream script ships with

## Requirements

- Node.js 22.23.4+ (Astro 7)
- pnpm 10

## Development

```bash
pnpm install
pnpm dev
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | local dev server |
| `pnpm build` | static build into `dist/` |
| `pnpm preview` | serve the build locally |
| `pnpm check` | type-check `.astro` and `.ts` |
| `pnpm format` | format with Biome |
| `pnpm i18n` | regenerate locale dictionaries from the upstream snapshot |
| `pnpm upstream:pull <tag>` | refresh `upstream/hugo-narrow` to a given tag |

Biome formats scripts, config and data files. `.astro` files are excluded from the formatter: the
experimental HTML parser cannot read Astro's `define:vars` directive. Type safety for templates comes
from `pnpm check` instead.

## Deploy

The output is fully static: build with `pnpm build`, publish `dist/`. Any static host works
(Cloudflare Pages, Vercel, Netlify, S3, nginx).

```ts
// astro.config.ts
export default defineConfig({
  site: "https://example.com", // your domain: canonical URLs, sitemap, robots.txt
  base: "/", // set to "/repo" when deploying under a subpath
  // ...
})
```

Both values flow through internal links, cover images, the icon sprite, the search index, the web
manifest and the feed. Keep `base` at `"/"` unless the site lives under a subpath such as a GitHub
Pages project page.

Node version: CI reads `.node-version`. Keep it at 24; Node 25 currently crashes during Astro's
build on Windows.

## Example content

`src/content/posts` ships with four sample posts. Three of them form the "主题使用指南" series and
cover Markdown syntax, MDX embeds, and per-page toggles; the fourth is the same tour in English.
Delete them once your own posts are in place — the front matter in each one doubles as a reference
for what the theme supports.

`src/content/pages` holds about / resume / timeline, `src/content/projects` holds the project list.

## Structure

```
src/
├── config/       # site config, validated with Zod
├── content/      # posts (.md / .mdx) and standalone pages
├── components/
│   ├── ui/       # dock, context bar, TOC, search, appearance, nav menu
│   ├── content/  # cards, grids, list feed, pagination, related posts
│   ├── embeds/   # MDX replacements for Hugo shortcodes
│   └── features/ # comments
├── layouts/      # Base layout
├── pages/        # routes, feed, search index, sprite endpoint
├── lib/          # data aggregation, dates, pagination, rehype plugins
├── i18n/         # typed dictionaries
├── styles/       # Tailwind entry + upstream stylesheets
├── icons/        # upstream SVG icons
└── scripts/      # upstream interaction scripts
upstream/         # read-only snapshot of the upstream theme, used for diffing
```

## Porting policy

`src/styles`, `src/icons` and `src/scripts` are copied from upstream. Only `main.css` gained one
`@import` for the Shiki bridge. Everything else is written as Astro components. See
[PORTING.md](./PORTING.md) for the file-by-file mapping.

## License

AGPL-3.0-only. The original theme is copyright its authors; see [LICENSE](./LICENSE).
