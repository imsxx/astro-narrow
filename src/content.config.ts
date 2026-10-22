import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

/** Upstream accepts either `key: false` or `key: { enabled: false }`. */
const toggle = z.union([z.boolean(), z.object({ enabled: z.boolean() })])

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    series: z.string().optional(),
    series_order: z.number().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    toc: toggle.optional(),
    comments: z
      .union([
        z.boolean(),
        z.object({
          enabled: z.boolean(),
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
            .optional(),
        }),
      ])
      .optional(),
    katex: toggle.optional(),
    mermaid: toggle.optional(),
    lightbox: toggle.optional(),
    license: z.union([z.string(), z.boolean()]).optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date().optional(),
    links: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
          description: z.string().optional(),
          icon: z.string().optional(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),
    date: z.coerce.date(),
    link: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
})

export const collections = { posts, pages, projects }
