import {
  BLOG_POSTS,
  getBlogLangMeta,
  getLocalizedPost,
  resolveBlogLang,
  SITE_URL,
} from "@/data/blogPosts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getImageMimeType(imageUrl: string): string {
  const lower = imageUrl.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/png";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const activeLang = resolveBlogLang(searchParams.get("lang"));
  const langMeta = getBlogLangMeta(activeLang);
  const rssLangCode = langMeta.locale.toLowerCase().replace("_", "-");
  const selfUrl = activeLang === "tr" ? `${SITE_URL}/rss.xml` : `${SITE_URL}/rss.xml?lang=${activeLang}`;

  const items = BLOG_POSTS.map((rawPost) => {
    const post = getLocalizedPost(rawPost, activeLang);
    const link =
      activeLang === "tr"
        ? `${SITE_URL}/blog/${post.slug}`
        : `${SITE_URL}/blog/${post.slug}?lang=${activeLang}`;
    const pubDate = new Date(`${post.isoDate}T09:00:00+03:00`).toUTCString();
    const imageUrl = `${SITE_URL}${post.imageUrl}`;
    const mimeType = getImageMimeType(post.imageUrl);

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.tag)}</category>
      <description>${escapeXml(post.excerpt)}</description>
      <enclosure url="${escapeXml(imageUrl)}" type="${mimeType}" />
      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${mimeType}" />
    </item>`;
  }).join("\n");

  const channelTitle =
    activeLang === "tr"
      ? "Kürşat Yılmaz — Teknoloji & AI Sistem Mimarisi Günlüğü"
      : "Kürşat Yılmaz — AI Systems Architecture & Engineering Journal";
  const channelDesc =
    activeLang === "tr"
      ? "Yapay zekâ sistem mimarisi, GPU/bellek sınırları, otonom ajan güvenliği ve teknoloji endüstrisi analizleri."
      : "Technical autopsies on AI systems architecture, hardware supply chains, autonomous agent security, and cloud reliability.";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${rssLangCode}</language>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
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
