# Porting map

Upstream snapshot: `hugo-narrow v2.0.0`.
Status values: **copied** (verbatim, safe to overwrite), **rewritten** (same behaviour, Astro
structure), **replaced** (upstream logic dropped because Astro has a native equivalent).

When upstream changes a file marked `replaced`, there is nothing to port. That is the point of the
column.

## Styles

| Upstream | Here | Status |
| --- | --- | --- |
| `assets/css/main.css` | `src/styles/main.css` | copied |
| `assets/css/themes.css` | `src/styles/themes.css` | copied |
| `assets/css/base.css` | `src/styles/base.css` | copied |
| `assets/css/components.css` | `src/styles/components.css` | copied |
| `assets/css/gallery.css` | `src/styles/gallery.css` | copied |
| `assets/css/toc.css` | `src/styles/toc.css` | copied |
| `assets/css/prose.*.css` | `src/styles/prose.*.css` | copied |
| `assets/css/custom.css` | `src/styles/custom.css` | copied |
| `assets/css/compiled.css` | — | replaced (build output; Vite compiles `main.css`) |

## Icons and scripts

| Upstream | Here | Status |
| --- | --- | --- |
| `assets/icons/*.svg` | `src/icons/*.svg` | copied |
| `layouts/_partials/features/icon-sprite.html` | `src/pages/icons/sprite.svg.ts` | rewritten |
| `assets/js/*.js` | `src/scripts/*.js` | copied |
| `assets/js/theme-init.js` | inline script in `src/layouts/Base.astro` | rewritten (Hugo templating removed) |

## Layouts

| Upstream | Here | Status |
| --- | --- | --- |
| `layouts/baseof.html` | `src/layouts/Base.astro` | rewritten |
| `layouts/home.html` | `src/pages/index.astro` | rewritten |
| `layouts/single.html` | `src/pages/posts/[...slug].astro` | rewritten |
| `layouts/_partials/ui/dock.html` | `src/components/ui/Dock.astro` | rewritten |
| `layouts/_partials/ui/appearance-popover.html` | `src/components/ui/AppearancePopover.astro` | rewritten |
| `layouts/_partials/ui/reading-progress.html` | `src/components/ui/ReadingProgress.astro` | rewritten |
| `layouts/_partials/content/image-processor.html` | — | replaced (`astro:assets`) |
| `layouts/_markup/render-codeblock.html` | — | replaced (Shiki / Expressive Code) |
| `layouts/_markup/render-heading.html` | — | replaced (rehype heading plugin) |
| `layouts/_partials/layout/head.html` | head block in `Base.astro` | rewritten |
| `layouts/index.json` | `src/pages/search-index.json.ts` (todo) | rewritten |
| `layouts/_partials/layout/footer.html` | `src/components/ui/Footer.astro` (todo) | rewritten |
| `layouts/list.html`, `taxonomy.html`, `term.html`, `archives.html`, `timeline.html`, `about.html`, `resume.html`, `projects/*` | not ported yet | — |

## Data and config

| Upstream | Here | Status |
| --- | --- | --- |
| `data/themes.yaml` | `src/lib/themes.ts` | rewritten |
| `exampleSite/config/_default/params.yaml` | `src/config/site.ts` | rewritten (Zod validated) |
| `exampleSite/config/_default/menus.yaml` | `nav` in `src/config/site.ts` | rewritten |
| `i18n/zh-hans.toml`, `i18n/en.toml` | `src/i18n/zh-hans.ts`, `src/i18n/en.ts` | rewritten (typed) |
| `i18n/*.toml` (other languages) | — | not ported yet |

## Syncing with upstream

```bash
pnpm upstream:pull v2.1.0   # refresh upstream/hugo-narrow and print a changed-file list
```

1. Read the diff. Split changes by layer:
   - **Styles / icons / copy** — files marked `copied`. Overwrite them, rebuild, compare screenshots.
   - **Components** — files marked `rewritten`. Apply the same change to the Astro counterpart.
   - **Replaced** — ignore. Astro handles it.
2. Run `pnpm build` and compare the affected pages against the upstream demo.
3. Update the snapshot version at the top of this file and add a `CHANGELOG.md` entry.

**Do not chase major versions.** If upstream restructures its layout again (as v1 → v2 replaced the
navbar with a dock), rebuilding is cheaper than merging. If the work exceeds roughly five days,
stay on the current baseline and say so in the README.
