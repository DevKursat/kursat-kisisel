import type { MetadataRoute } from "next";
import { BLOG_LANGUAGES, BLOG_POSTS, SITE_URL } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogIndexUrl = `${SITE_URL}/blog`;
  const trMeta = BLOG_LANGUAGES.find((lang) => lang.code === "tr");
  const blogIndexLanguages: Record<string, string> = {
    "x-default": blogIndexUrl,
    [trMeta?.hreflang ?? "tr"]: blogIndexUrl,
  };
  for (const lang of BLOG_LANGUAGES) {
    if (lang.code !== "tr") {
      blogIndexLanguages[lang.hreflang] = `${blogIndexUrl}?lang=${lang.code}`;
    }
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...BLOG_LANGUAGES.map((lang) => ({
      url: lang.code === "tr" ? blogIndexUrl : `${blogIndexUrl}?lang=${lang.code}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
      alternates: {
        languages: blogIndexLanguages,
      },
    })),
    {
      url: `${SITE_URL}/links`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/sponsor`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // Emit a dedicated <url><loc> entry for EVERY available language (tr, en, de, es)
  // with full reciprocal hreflang alternates so Google & Bing index all 4 languages independently.
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) => {
    const baseUrl = `${SITE_URL}/blog/${post.slug}`;
    const languages: Record<string, string> = {
      "x-default": baseUrl,
      [trMeta?.hreflang ?? "tr"]: baseUrl,
    };
    const availableLangCodes: string[] = ["tr"];

    if (post.translations) {
      for (const meta of BLOG_LANGUAGES) {
        if (meta.code !== "tr" && post.translations[meta.code]) {
          languages[meta.hreflang] = `${baseUrl}?lang=${meta.code}`;
          availableLangCodes.push(meta.code);
        }
      }
    }

    const lastMod = new Date(`${post.isoDate}T09:00:00+03:00`);
    return availableLangCodes.map((code) => ({
      url: code === "tr" ? baseUrl : `${baseUrl}?lang=${code}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: code === "tr" || code === "en" ? 0.85 : 0.75,
      alternates: {
        languages,
      },
    }));
  });

  return [...staticPages, ...blogPages];
}
