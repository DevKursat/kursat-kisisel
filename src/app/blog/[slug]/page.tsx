import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG_LANGUAGES,
  BLOG_POSTS,
  generatePostFaqs,
  getBlogLangMeta,
  getBlogPostBySlug,
  getBlogUiCopy,
  getLocalizedPost,
  getRelatedPostSummaries,
  resolveBlogLang,
  SITE_URL,
  type BlogLang,
} from "@/data/blogPosts";
import { ArticleMarkup, BlogPostArticleBody } from "@/components/BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı — Kürşat Yılmaz",
    };
  }

  let rawLang: string | undefined;
  try {
    const sp = searchParams ? await searchParams : undefined;
    rawLang = sp?.lang;
  } catch {
    rawLang = undefined;
  }

  const activeLang = resolveBlogLang(rawLang);
  const localized = getLocalizedPost(post, activeLang);
  const langMeta = getBlogLangMeta(activeLang);

  const canonicalBaseUrl = `${SITE_URL}/blog/${post.slug}`;
  const localizedUrl =
    activeLang === "tr"
      ? canonicalBaseUrl
      : `${canonicalBaseUrl}?lang=${activeLang}`;
  const imageUrl = `${SITE_URL}${post.imageUrl}`;
  const ogImageUrl = `${SITE_URL}/api/og?slug=${encodeURIComponent(post.slug)}&lang=${activeLang}`;

  const trMeta = BLOG_LANGUAGES.find((lang) => lang.code === "tr");
  const languageAlternates: Record<string, string> = {
    "x-default": canonicalBaseUrl,
    [trMeta?.hreflang ?? "tr"]: canonicalBaseUrl,
  };
  if (post.translations) {
    for (const meta of BLOG_LANGUAGES) {
      if (meta.code !== "tr" && post.translations[meta.code]) {
        languageAlternates[meta.hreflang] = `${canonicalBaseUrl}?lang=${meta.code}`;
      }
    }
  }

  return {
    title: `${localized.title} — Kürşat Yılmaz`,
    description: localized.excerpt,
    authors: [{ name: "Kürşat Yılmaz", url: SITE_URL }],
    alternates: {
      // Self-referencing canonical per language so Google & Bing index TR, EN, DE, and ES independently
      canonical: localizedUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "article",
      locale: langMeta.locale,
      url: localizedUrl,
      title: localized.title,
      description: localized.excerpt,
      siteName: "Kürşat Yılmaz",
      publishedTime: `${post.isoDate}T09:00:00+03:00`,
      authors: ["Kürşat Yılmaz"],
      tags: [localized.tag, post.category, "AI Systems Engineering"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: localized.title,
        },
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: localized.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.excerpt,
      images: [ogImageUrl],
      creator: "@DevKursat",
    },
  };
}

export default function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      <Suspense fallback={<div className="min-h-screen bg-[#000000]" />}>
        <BlogPostResolved params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function BlogPostResolved({ params, searchParams }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let rawLang: string | undefined;
  try {
    const sp = searchParams ? await searchParams : undefined;
    rawLang = sp?.lang;
  } catch {
    rawLang = undefined;
  }

  const activeLang = resolveBlogLang(rawLang);
  const localized = getLocalizedPost(post, activeLang);
  const langMeta = getBlogLangMeta(activeLang);
  const ui = getBlogUiCopy(activeLang);

  const relatedSummaries = getRelatedPostSummaries(post.slug, 3);
  const canonicalBaseUrl = `${SITE_URL}/blog/${post.slug}`;
  const localizedUrl =
    activeLang === "tr"
      ? canonicalBaseUrl
      : `${canonicalBaseUrl}?lang=${activeLang}`;
  const localizedBlogIndexUrl =
    activeLang === "tr" ? `${SITE_URL}/blog` : `${SITE_URL}/blog?lang=${activeLang}`;
  const imageUrl = `${SITE_URL}${post.imageUrl}`;
  const inLanguageBcp47 = langMeta.locale.replace("_", "-");

  const wordCount = [localized.title, localized.excerpt, ...localized.content]
    .join(" ")
    .trim()
    .split(/\s+/).length;

  const faqs = generatePostFaqs(post, activeLang);

  const workTranslations = BLOG_LANGUAGES.filter((l) => {
    if (l.code === activeLang) return false;
    if (l.code === "tr") return true;
    return Boolean(post.translations?.[l.code]);
  }).map((l) => {
    const translated = getLocalizedPost(post, l.code);
    const transUrl =
      l.code === "tr" ? canonicalBaseUrl : `${canonicalBaseUrl}?lang=${l.code}`;
    return {
      "@type": ["NewsArticle", "TechArticle"],
      "@id": `${transUrl}#article`,
      url: transUrl,
      inLanguage: l.locale.replace("_", "-"),
      headline: translated.title,
      name: translated.title,
    };
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NewsArticle", "TechArticle"],
        "@id": `${localizedUrl}#article`,
        headline: localized.title,
        description: localized.excerpt,
        image: [imageUrl],
        datePublished: `${post.isoDate}T09:00:00+03:00`,
        dateModified: `${post.isoDate}T09:00:00+03:00`,
        inLanguage: inLanguageBcp47,
        articleSection: localized.tag,
        keywords: [
          localized.tag,
          post.category,
          activeLang === "tr" ? "Yapay Zeka" : "Artificial Intelligence",
          activeLang === "tr" ? "Yazılım Mühendisliği" : "Software Engineering",
        ],
        wordCount,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#article-headline", "#article-tldr", "#article-faq"],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": localizedUrl,
        },
        author: {
          "@type": "Person",
          name: "Kürşat Yılmaz",
          url: SITE_URL,
          sameAs: [
            "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
            "https://x.com/DevKursat",
            "https://github.com/DevKursat",
            "https://dev.to/kursatyz",
            "https://hashnode.com/@kursatyz",
            "https://medium.com/@ykursat054",
            "https://bsky.app/profile/kursatyz.bsky.social",
            "https://www.reddit.com/user/Delicious_Character6/",
          ],
        },
        publisher: {
          "@type": "Person",
          name: "Kürşat Yılmaz",
          url: SITE_URL,
        },
        ...(workTranslations.length > 0 ? { workTranslation: workTranslations } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${localizedUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: ui.home,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: activeLang === "tr" ? "Blog" : "Dispatches",
            item: localizedBlogIndexUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: localized.title,
            item: localizedUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${localizedUrl}#faq`,
        inLanguage: inLanguageBcp47,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Suspense
        fallback={
          <ArticleMarkup
            rawPost={post}
            relatedSummaries={relatedSummaries}
            activeLang={activeLang}
          />
        }
      >
        <BlogPostArticleBody
          rawPost={post}
          relatedSummaries={relatedSummaries}
        />
      </Suspense>
    </>
  );
}
