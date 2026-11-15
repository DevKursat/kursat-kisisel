import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  SITE_URL,
  type BlogLang,
} from "@/data/blogPosts";
import { LinkedinIcon, TwitterXIcon } from "@/components/Icons";
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

  const languageAlternates: Record<string, string> = { tr: canonicalUrl };
  if (post.translations) {
    for (const code of Object.keys(post.translations) as Exclude<BlogLang, "tr">[]) {
      languageAlternates[code] = `${canonicalUrl}?lang=${code}`;
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}${post.imageUrl}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": ["NewsArticle", "TechArticle"],
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: `${post.isoDate}T09:00:00+03:00`,
    dateModified: `${post.isoDate}T09:00:00+03:00`,
    inLanguage: "tr-TR",
    articleSection: post.tag,
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
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Tüm Yazılar</span>
          </Link>

          <Link
            href="/"
            className="font-archivo font-[800] text-sm tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            KÜRŞAT YILMAZ <span className="font-mono text-zinc-500 font-normal text-xs ml-1.5">// GÜNLÜK</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="X"
            >
              <TwitterXIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      <Suspense fallback={<ArticleMarkup rawPost={post} activeLang="tr" />}>
        <BlogPostArticleBody rawPost={post} />
      </Suspense>
    </main>
  );
}
