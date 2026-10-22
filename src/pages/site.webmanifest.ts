import type { APIRoute } from "astro"
import { siteConfig } from "@/config/site"

/** Mirrors the upstream `index.webappmanifest` template. */
export const GET: APIRoute = () => {
  const icons: Array<Record<string, string>> = []

  if (siteConfig.favicon.svg) {
    icons.push({
      src: siteConfig.favicon.svg,
      sizes: "any",
      type: "image/svg+xml",
    })
  }

  if (siteConfig.pwa.appleTouchIcon) {
    icons.push({
      src: siteConfig.pwa.appleTouchIcon,
      sizes: "180x180",
      type: "image/png",
    })
  }

  const manifest = {
    name: siteConfig.title,
    short_name: siteConfig.shortName ?? siteConfig.title,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.pwa.backgroundColor,
    theme_color: siteConfig.pwa.themeColor,
    orientation: siteConfig.pwa.orientation,
    lang: siteConfig.lang,
    dir: siteConfig.lang === "ar" ? "rtl" : "ltr",
    categories: ["blog", "technology", "education"],
    ...(icons.length > 0 ? { icons } : {}),
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  })
}
