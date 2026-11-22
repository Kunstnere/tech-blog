import type { APIRoute } from "astro";
import { getPublishedPosts } from "../lib/posts";

function escapeXML(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];
  const staticPages = [
    { path: "/", lastmod: posts[0]?.data.pubDate },
    { path: "/archive/", lastmod: posts[0]?.data.pubDate },
    { path: "/about/" }
  ];
  const tagPages = tags.map((tag) => ({
    path: `/tags/${encodeURIComponent(tag)}/`,
    lastmod: posts.find((post) => post.data.tags.includes(tag))?.data.pubDate
  }));
  const postPages = posts.map((post) => ({
    path: `/blog/${post.id}/`,
    lastmod: post.data.updatedDate ?? post.data.pubDate
  }));
  const urls = [...staticPages, ...tagPages, ...postPages]
    .map((page) => {
      const loc = escapeXML(new URL(page.path, site).toString());
      const lastmod = page.lastmod
        ? `<lastmod>${page.lastmod.toISOString()}</lastmod>`
        : "";

      return `<url><loc>${loc}</loc>${lastmod}</url>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
