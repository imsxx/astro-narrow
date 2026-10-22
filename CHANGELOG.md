# Changelog

## 0.1.0

First port of [hugo-narrow](https://github.com/tom2almighty/hugo-narrow) v2.0.0 to Astro.

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
