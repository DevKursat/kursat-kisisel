import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG_LANGUAGES,
  BLOG_POSTS,
  generatePostFaqs,
  getBlogLangMeta,
  getBlogPostBySlug,
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

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const localizedUrl =
    activeLang === "tr" ? canonicalUrl : `${canonicalUrl}?lang=${activeLang}`;
  const imageUrl = `${SITE_URL}${post.imageUrl}`;
  const ogImageUrl = `${SITE_URL}/api/og?slug=${encodeURIComponent(post.slug)}&lang=${activeLang}`;

  const trMeta = BLOG_LANGUAGES.find((lang) => lang.code === "tr");
  const languageAlternates: Record<string, string> = {
    "x-default": canonicalUrl,
    [trMeta?.hreflang ?? "tr"]: canonicalUrl,
  };
  if (post.translations) {
    for (const meta of BLOG_LANGUAGES) {
      if (meta.code !== "tr" && post.translations[meta.code]) {
        languageAlternates[meta.hreflang] = `${canonicalUrl}?lang=${meta.code}`;
      }
    }
  }

  return {
    title: `${localized.title} — Kürşat Yılmaz`,
    description: localized.excerpt,
    authors: [{ name: "Kürşat Yılmaz", url: SITE_URL }],
    alternates: {
      canonical: canonicalUrl,
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      <Suspense fallback={<div className="min-h-screen bg-[#000000]" />}>
        <BlogPostResolved params={params} />
      </Suspense>
    </main>
  );
}

async function BlogPostResolved({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedSummaries = getRelatedPostSummaries(post.slug, 3);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}${post.imageUrl}`;

  const wordCount = [post.title, post.excerpt, ...post.content]
    .join(" ")
    .trim()
    .split(/\s+/).length;

  const faqs = generatePostFaqs(post, "tr");

  const workTranslations = post.translations
    ? BLOG_LANGUAGES.filter((l) => l.code !== "tr" && post.translations?.[l.code]).map((l) => {
        const translated = post.translations![l.code as Exclude<BlogLang, "tr">]!;
        return {
          "@type": ["NewsArticle", "TechArticle"],
          "@id": `${canonicalUrl}?lang=${l.code}#article`,
          url: `${canonicalUrl}?lang=${l.code}`,
          inLanguage: l.locale.replace("_", "-"),
          headline: translated.title,
          name: translated.title,
        };
      })
    : [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NewsArticle", "TechArticle"],
        "@id": `${canonicalUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [imageUrl],
        datePublished: `${post.isoDate}T09:00:00+03:00`,
        dateModified: `${post.isoDate}T09:00:00+03:00`,
        inLanguage: "tr-TR",
        articleSection: post.tag,
        keywords: [post.tag, post.category, "Yapay Zeka", "Yazılım Mühendisliği"],
        wordCount,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#article-headline", "#article-tldr", "#article-faq"],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        author: {
          "@type": "Person",
          name: "Kürşat Yılmaz",
          url: SITE_URL,
          sameAs: [
            "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
            "https://x.com/DevKursat",
            "https://github.com/DevKursat",
            "https://dev.to/devkursat",
            "https://medium.com/@ykursat054",
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
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Günlük",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        inLanguage: "tr-TR",
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
            activeLang="tr"
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
