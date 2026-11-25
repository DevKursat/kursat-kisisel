import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import BlogArchiveClient from "@/components/BlogArchiveClient";
import {
  BLOG_LANGUAGES,
  getBlogLangMeta,
  getBlogPostSummaries,
  getBlogUiCopy,
  resolveBlogLang,
  SITE_URL,
} from "@/data/blogPosts";

interface BlogArchivePageProps {
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogArchivePageProps): Promise<Metadata> {
  let rawLang: string | undefined;
  try {
    const sp = searchParams ? await searchParams : undefined;
    rawLang = sp?.lang;
  } catch {
    rawLang = undefined;
  }

  const activeLang = resolveBlogLang(rawLang);
  const ui = getBlogUiCopy(activeLang);
  const langMeta = getBlogLangMeta(activeLang);

  const canonicalUrl = `${SITE_URL}/blog`;
  const localizedUrl =
    activeLang === "tr" ? canonicalUrl : `${canonicalUrl}?lang=${activeLang}`;

  const languageAlternates: Record<string, string> = {
    "x-default": canonicalUrl,
  };
  for (const meta of BLOG_LANGUAGES) {
    languageAlternates[meta.hreflang] =
      meta.code === "tr" ? canonicalUrl : `${canonicalUrl}?lang=${meta.code}`;
  }

  const fullTitle = `${ui.archiveTitleLine1} ${ui.archiveTitleAccent} ${ui.archiveTitleLine2} — Kürşat Yılmaz`;

  return {
    title: fullTitle,
    description: ui.archiveDesc,
    alternates: {
      canonical: localizedUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      locale: langMeta.locale,
      url: localizedUrl,
      title: fullTitle,
      description: ui.archiveDesc,
      siteName: "Kürşat Yılmaz",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1920,
          height: 1080,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: ui.archiveDesc,
      images: [`${SITE_URL}/og-image.jpg`],
      creator: "@DevKursat",
    },
  };
}

async function DynamicMetadataMarker() {
  await connection();
  return null;
}

export default function BlogArchivePage() {
  const posts = getBlogPostSummaries();
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMetadataMarker />
      </Suspense>
      <BlogArchiveClient posts={posts} />
    </>
  );
}
