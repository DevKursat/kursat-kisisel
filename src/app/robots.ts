import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/blogPosts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/vault-ky", "/ops", "/api/ops/"],
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/news-sitemap.xml`],
    host: SITE_URL,
  };
}
