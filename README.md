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
- Images: adjacent images grouped into a gallery with layout switcher and lightbox
- Embeds: button, link card, tabs, Bilibili, Tencent Video (MDX components)
- Standalone pages: about, resume, timeline, projects
- Comments: giscus, disqus, utterances, waline, artalk, twikoo, comentario
- Analytics: Google, Baidu, Clarity, Umami
- UI locales: 13 languages generated from the upstream i18n files
- Feeds: RSS, sitemap, SVG icon sprite endpoint

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

## Not ported yet

- Per-page front matter overrides (comments, katex, mermaid, lightbox are site-wide only)
- Localized routes (UI copy switches via `lang`, content is single-locale)
- Gallery layouts beyond the three the upstream script ships with

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
