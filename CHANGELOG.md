# Changelog

## 1.0.2

- Fix: the table of contents panel never opened. `toc.js` was ported verbatim but nothing imported
  it — upstream loads it conditionally from `head/js.html`, while the Astro layout only pulled in
  `main.js`. The script now ships with the TOC component, so the dock button, scroll spy and pinning
  work again.

## 1.0.1

Synced with upstream 2.0.2:

- Dock container is a `<div role="toolbar">` instead of `<nav>`, fixing the Lighthouse
  `aria-allowed-role` audit
- Sprite preload removed (external `<use>` references cannot reuse it); the menu button is back to a
  single icon and the table of contents uses the new `toc` icon
- `announcement.autoClose` added: set it to a number of seconds to dismiss the banner automatically
- Icon set trimmed from 73 to 48 SVGs, sprite down from ~27 KB to ~17.5 KB

## 1.0.0

First public release. Port of [hugo-narrow](https://github.com/tom2almighty/hugo-narrow) v2.0.1 to
Astro.

Synced with upstream 2.0.1:

- Subpath deployments work: `base` now flows through internal links, cover images, the icon sprite,
  the search index, the web manifest and the feed
- Collapsed dock capsule shrinks to a single item, with distinct icons for the expanded menu,
  collapsed menu and table of contents

**Layout and reading**

- Content column with a floating dock and a breadcrumb context bar
- Appearance panel: 12 colour schemes, light/dark/system, adjustable width, blur and grain
- Post header with meta, prose typography, TOC panel with pin, reading progress
- Prev/next navigation, related posts, series progress bar and popover

**Content and lists**

- Posts with pagination, archives by year and month
- Tags, categories and series indexes with term pages
- Projects, about, resume and timeline pages
- RSS feed, sitemap, robots.txt and an SVG icon sprite endpoint

**Rendering**

- Code blocks: Shiki dual theme, language label, copy and collapse
- Math: KaTeX rendered at build time
- Diagrams: Mermaid loaded on demand and re-rendered on theme change
- Images: adjacent images grouped into a gallery with layout switcher and lightbox
- Alerts: GitHub-style `[!NOTE]` blockquotes, including collapsible `+` / `-` variants
- Cover images rendered above the post header, and an optional updated date in the meta line
- MDX components replacing the upstream shortcodes (button, link card, tabs, Bilibili, Tencent Video)

**Integration**

- Search with a Ctrl+K modal and a generated index
- Comments: giscus, disqus, utterances, waline, artalk, twikoo, comentario
- Analytics: Google, Baidu, Clarity, Umami
- UI copy in 13 languages, generated from the upstream i18n files
- Site-wide and per-page feature switches

**Known differences from upstream**

- KaTeX renders at build time instead of in the browser
- Resume and timeline use CSS for their section layout instead of splitting the rendered HTML
- The `link` shortcode's group form (reading `data/links.yaml`) is not ported
- Localized routes are not implemented; `lang` switches UI copy only
