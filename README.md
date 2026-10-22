# astro-narrow

An Astro port of [hugo-narrow](https://github.com/tom2almighty/hugo-narrow).

This is a from-scratch reimplementation, not a line-by-line template translation. The feature set
and visual output follow the upstream theme; the implementation uses Astro's native capabilities
wherever they replace hand-rolled Hugo logic (image pipeline, code highlighting, TOC, config
validation).

- Upstream: `hugo-narrow v2.0.0`
- Status: skeleton — layout shell, styling, dock, appearance panel and a single post route work.
  Lists, taxonomies, search, series, comments and shortcodes are not ported yet.

## Requirements

- Node.js 22.12+
- pnpm 10

## Development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
pnpm preview
```

## Structure

```
src/
├── config/       # site config, validated with Zod
├── content/      # posts and standalone pages
├── components/
│   ├── ui/       # dock, appearance panel, reading progress
│   ├── content/  # cards, lists, meta blocks
│   ├── embeds/   # shortcode equivalents
│   └── features/ # comments, analytics, math, diagrams
├── layouts/      # Base layout
├── pages/        # routes, feed, sprite endpoint
├── lib/          # data aggregation, dates, theme list
├── i18n/         # typed dictionaries
├── styles/       # Tailwind entry + upstream stylesheets (copied verbatim)
├── icons/        # upstream SVG icons
└── scripts/      # upstream interaction scripts (copied, selectors unchanged)
upstream/         # read-only snapshot of the upstream theme, used for diffing
```

## Porting policy

`src/styles` and `src/icons` are copied from upstream without modification. `src/scripts` is copied
too; only selectors that depend on Hugo-specific markup need adapting. Everything else is written
as Astro components. See [PORTING.md](./PORTING.md) for the file-by-file mapping.

## License

AGPL-3.0-only. The original theme is copyright its authors; see [LICENSE](./LICENSE).
