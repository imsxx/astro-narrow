import type { APIRoute } from "astro"
import { siteConfig } from "@/config/site"
import { getPosts, readingTime, summaryOf } from "@/lib/posts"
import { formatDate } from "@/lib/date"

function plain(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export const GET: APIRoute = async () => {
  const posts = await getPosts()
  const limit = siteConfig.search.indexContentLength

  const records = posts.map((post) => ({
    title: post.data.title,
    summary: summaryOf(post),
    content: plain(post.body ?? "").slice(0, limit),
    permalink: `/posts/${post.id}/`,
    section: "posts",
    date: formatDate(post.data.date),
    readingTime: readingTime(post.body ?? ""),
    tags: post.data.tags,
    categories: post.data.categories,
  }))

  return new Response(JSON.stringify(records), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
}
