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

  for (const post of BLOG_POSTS) {
    const pubDate = `${post.isoDate}T09:00:00+03:00`;
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
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
