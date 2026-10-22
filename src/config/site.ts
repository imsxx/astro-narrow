import { z } from "astro/zod"

const socialSchema = z.object({
  name: z.string(),
  url: z.string(),
  icon: z.string(),
})

const navItemSchema: z.ZodType<NavItem> = z.lazy(() =>
  z.object({
    label: z.string(),
    href: z.string().optional(),
    icon: z.string().optional(),
    children: z.array(navItemSchema).optional(),
  }),
)

export type NavItem = {
  label: string
  href?: string
  icon?: string
  children?: NavItem[]
}

const siteSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(["zh-hans", "en"]),
  keywords: z.array(z.string()).default([]),
  shortName: z.string().optional(),
  images: z.array(z.string()).default([]),
  favicon: z
    .object({
      svg: z.string().optional(),
      png: z.string().optional(),
    })
    .default({}),
  pwa: z
    .object({
      backgroundColor: z.string().default("#ffffff"),
      themeColor: z.string().default("#09090b"),
      darkThemeColor: z.string().default("#09090b"),
      orientation: z.string().default("portrait-primary"),
      appleTouchIcon: z.string().default(""),
    })
    .default({}),
  announcement: z
    .object({
      enabled: z.boolean().default(false),
      message: z.string().default(""),
      type: z.enum(["info", "warning", "destructive"]).default("info"),
    })
    .default({}),
  author: z.object({
    name: z.string(),
    title: z.string().default(""),
    description: z.string().default(""),
    avatar: z.string().default(""),
    social: z.array(socialSchema).default([]),
  }),
  search: z
    .object({
      indexContentLength: z.number().int().positive().default(2000),
    })
    .default({}),
  contentWidth: z.string().default("56rem"),
  backdropBlur: z.number().min(0).max(24).default(12),
  grainSize: z.number().min(0).max(100).default(25),
  toc: z.object({ enabled: z.boolean().default(true) }).default({}),
  colorScheme: z.string().default("default"),
  home: z
    .object({
      recentPostsCount: z.number().int().default(3),
      contentOrder: z
        .array(z.string())
        .default(["author-section", "recent-posts", "featured-projects"]),
    })
    .default({}),
  post: z
    .object({
      showRelated: z.boolean().default(true),
      relatedPostsCount: z.number().int().default(3),
      license: z.string().default(""),
    })
    .default({}),
  comments: z
    .object({
      enabled: z.boolean().default(false),
      system: z
        .enum([
          "giscus",
          "disqus",
          "utterances",
          "waline",
          "artalk",
          "twikoo",
          "comentario",
        ])
        .default("giscus"),
    })
    .default({}),
  analytics: z
    .object({
      provider: z.enum(["", "google", "baidu", "clarity", "umami"]).default(""),
    })
    .default({}),
  katex: z.object({ enabled: z.boolean().default(true) }).default({}),
  mermaid: z.object({ enabled: z.boolean().default(true) }).default({}),
  gallery: z
    .object({
      enabled: z.boolean().default(true),
      defaultLayout: z.enum(["justified", "masonry", "grid"]).default("justified"),
    })
    .default({}),
  lightbox: z.object({ enabled: z.boolean().default(true) }).default({}),
  codeblock: z
    .object({
      collapse: z
        .object({
          enabled: z.boolean().default(true),
          defaultState: z.enum(["expanded", "collapsed"]).default("expanded"),
          maxLines: z.number().int().default(30),
          collapsedHeight: z.number().int().default(120),
        })
        .default({}),
    })
    .default({}),
  readingProgress: z
    .object({
      enabled: z.boolean().default(true),
      showOnHomepage: z.boolean().default(false),
    })
    .default({}),
  nav: z.array(navItemSchema),
})

export const siteConfig = siteSchema.parse({
  title: "Hugo Narrow",
  description:
    "A modern, clean, and minimal theme ported from hugo-narrow to Astro.",
  lang: "zh-hans",
  keywords: ["Astro", "Blog", "Theme", "Hugo Narrow"],
  shortName: "Narrow",
  images: ["/images/og-default.png"],
  favicon: { svg: "/favicon.svg" },
  pwa: {
    backgroundColor: "#ffffff",
    themeColor: "#09090b",
    darkThemeColor: "#09090b",
    orientation: "portrait-primary",
    appleTouchIcon: "",
  },
  announcement: {
    enabled: false,
    message: "",
    type: "info",
  },
  author: {
    name: "Your Name",
    title: "A Clean and Minimal Blog Theme",
    description: "Focused on content and user experience.",
    avatar: "",
    social: [],
  },
  search: { indexContentLength: 2000 },
  contentWidth: "56rem",
  backdropBlur: 12,
  grainSize: 25,
  toc: { enabled: true },
  colorScheme: "default",
  home: {
    recentPostsCount: 3,
    contentOrder: ["author-section", "recent-posts", "featured-projects"],
  },
  post: {
    showRelated: true,
    relatedPostsCount: 3,
    license: "",
  },
  comments: { enabled: false, system: "giscus" },
  analytics: { provider: "" },
  katex: { enabled: true },
  mermaid: { enabled: true },
  gallery: { enabled: true, defaultLayout: "justified" },
  lightbox: { enabled: true },
  codeblock: {
    collapse: { enabled: true, defaultState: "expanded", maxLines: 30, collapsedHeight: 120 },
  },
  readingProgress: { enabled: true, showOnHomepage: false },
  nav: [
    { label: "文章", href: "/posts", icon: "posts" },
    { label: "归档", href: "/archives", icon: "archive" },
    {
      label: "更多",
      icon: "layers",
      children: [
        { label: "分类", href: "/categories", icon: "categories" },
        { label: "标签", href: "/tags", icon: "tags" },
        { label: "系列", href: "/series", icon: "bookmark" },
        { label: "项目", href: "/projects", icon: "projects" },
        { label: "时间线", href: "/timeline", icon: "chart" },
        { label: "关于", href: "/about", icon: "about" },
        { label: "简历", href: "/resume", icon: "file-text" },
        { label: "RSS", href: "/rss.xml", icon: "rss" },
      ],
    },
  ],
})

export const POST_BASE = "/posts"
