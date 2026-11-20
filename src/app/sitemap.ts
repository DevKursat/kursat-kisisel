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
    {
      url: blogIndexUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: blogIndexLanguages,
      },
    },
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
      url: `${SITE_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    const baseUrl = `${SITE_URL}/blog/${post.slug}`;
    const languages: Record<string, string> = {
      "x-default": baseUrl,
      [trMeta?.hreflang ?? "tr"]: baseUrl,
    };
    if (post.translations) {
      for (const meta of BLOG_LANGUAGES) {
        if (meta.code !== "tr" && post.translations[meta.code]) {
          languages[meta.hreflang] = `${baseUrl}?lang=${meta.code}`;
        }
      }
    }

    return {
      url: baseUrl,
      lastModified: new Date(`${post.isoDate}T09:00:00+03:00`),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages,
      },
    };
  });

  return [...staticPages, ...blogPages];
}
