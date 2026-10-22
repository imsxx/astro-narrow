# astro-narrow

An Astro port of [hugo-narrow](https://github.com/tom2almighty/hugo-narrow).

This is a from-scratch reimplementation, not a line-by-line template translation. The feature set
and visual output follow the upstream theme; the implementation uses Astro's native capabilities
wherever they replace hand-rolled Hugo logic (image pipeline, code highlighting, TOC, config
validation).

- Upstream: `hugo-narrow v2.0.0`
- Built on Astro 7 + Tailwind CSS 4

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
- Embeds: button, link card, tabs, Bilibili, Tencent Video (MDX components)
- Standalone pages: about, resume, timeline, projects
- Comments: giscus (disabled by default)
- Feeds: RSS, sitemap, SVG icon sprite endpoint

## Not ported yet

- KaTeX and Mermaid are available, but per-page front matter overrides are not
- Comment providers other than giscus
- Analytics integrations
- Localized routes (UI copy is typed, but only `zh-hans` / `en` dictionaries exist)
- Gallery lightbox and gallery layouts

## Requirements

- Node.js 22.23.4+ (Astro 7)
- pnpm 10

## Development

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

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
