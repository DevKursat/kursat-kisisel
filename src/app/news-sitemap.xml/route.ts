import { BLOG_POSTS, getLocalizedPost, SITE_URL, type BlogLang } from "@/data/blogPosts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const entries: string[] = [];
  const nowMs = Date.now();
  // Google News Sitemap specification strictly requires articles published within the last 48 hours
  // (using 56h buffer across timezones; falls back to latest post so feed is never empty).
  const MAX_AGE_MS = 56 * 60 * 60 * 1000;

  const recentPosts = BLOG_POSTS.filter((post) => {
    const postMs = new Date(`${post.isoDate}T12:00:00+03:00`).getTime();
    return Number.isFinite(postMs) && nowMs - postMs <= MAX_AGE_MS;
  });

  const targetPosts = recentPosts.length > 0 ? recentPosts : BLOG_POSTS.slice(0, 1);

  for (const post of targetPosts) {
    const pubDate = `${post.isoDate}T12:30:00+03:00`;
    const imageUrl = `${SITE_URL}${post.imageUrl}`;

    const langs: BlogLang[] = ["tr"];
    if (post.translations) {
      for (const code of Object.keys(post.translations) as Exclude<BlogLang, "tr">[]) {
        langs.push(code);
      }
    }

    for (const lang of langs) {
      const localized = getLocalizedPost(post, lang);
      const loc =
        lang === "tr" ? `${SITE_URL}/blog/${post.slug}` : `${SITE_URL}/blog/${post.slug}?lang=${lang}`;

      entries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>Kürşat Yılmaz</news:name>
        <news:language>${lang}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(pubDate)}</news:publication_date>
      <news:title>${escapeXml(localized.title)}</news:title>
    </news:news>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(localized.title)}</image:title>
    </image:image>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
