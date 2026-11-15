import type { MetadataRoute } from "next";
import { BLOG_POSTS, SITE_URL, type BlogLang } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/links`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    const baseUrl = `${SITE_URL}/blog/${post.slug}`;
    const languages: Record<string, string> = { tr: baseUrl };
    if (post.translations) {
      for (const code of Object.keys(post.translations) as Exclude<BlogLang, "tr">[]) {
        languages[code] = `${baseUrl}?lang=${code}`;
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
