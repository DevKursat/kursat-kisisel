import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG_LANGUAGES,
  BLOG_POSTS,
  generatePostFaqs,
  getBlogPostBySlug,
  SITE_URL,
  type BlogLang,
} from "@/data/blogPosts";
import { ArticleMarkup, BlogPostArticleBody } from "@/components/BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı — Kürşat Yılmaz",
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}${post.imageUrl}`;

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
    title: `${post.title} — Kürşat Yılmaz`,
    description: post.excerpt,
    authors: [{ name: "Kürşat Yılmaz", url: SITE_URL }],
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt,
      siteName: "Kürşat Yılmaz",
      publishedTime: `${post.isoDate}T09:00:00+03:00`,
      authors: ["Kürşat Yılmaz"],
      tags: [post.tag, post.category, "Yapay Zeka", "Yazılım Mühendisliği"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
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

      <Suspense fallback={<ArticleMarkup rawPost={post} activeLang="tr" />}>
        <BlogPostArticleBody rawPost={post} />
      </Suspense>
    </>
  );
}
