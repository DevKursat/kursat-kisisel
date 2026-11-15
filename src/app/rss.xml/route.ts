import { BLOG_POSTS, SITE_URL } from "@/data/blogPosts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = BLOG_POSTS.map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(`${post.isoDate}T09:00:00+03:00`).toUTCString();
    const imageUrl = `${SITE_URL}${post.imageUrl}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.tag)}</category>
      <description>${escapeXml(post.excerpt)}</description>
      <enclosure url="${escapeXml(imageUrl)}" type="image/png" />
    </item>`;
  }).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kürşat Yılmaz — Teknoloji &amp; AI Sistem Mimarisi Günlüğü</title>
    <link>${SITE_URL}/blog</link>
    <description>Yapay zekâ sistem mimarisi, GPU/bellek sınırları, otonom ajan güvenliği ve teknoloji endüstrisi analizleri.</description>
    <language>tr-tr</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
