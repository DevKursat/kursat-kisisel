import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug, SITE_URL } from "@/data/blogPosts";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "@/components/Icons";

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

  return {
    title: `${post.title} — Kürşat Yılmaz`,
    description: post.excerpt,
    authors: [{ name: "Kürşat Yılmaz", url: SITE_URL }],
    alternates: {
      canonical: canonicalUrl,
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

      <article className="pt-28 pb-24 max-w-3xl mx-auto px-6 sm:px-8">
        <header className="space-y-5 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-white">
              {post.tag}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-archivo font-[800] text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.025em] leading-[1.12]">
            {post.title}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">YAZAR</span>
              <Link href="/" className="text-white hover:underline">
                Kürşat Yılmaz
              </Link>
            </div>
            {post.metrics.map((metric) => (
              <div key={metric.label}>
                <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-white font-semibold">{metric.val}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-10">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-zinc-200 text-base sm:text-lg leading-relaxed font-normal">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <footer className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-500">
            Kürşat Yılmaz — AI Product Engineer & Mimari Notlar
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-black" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-black" />
            </a>
            <a
              href="https://dev.to/devkursat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              <DevtoIcon className="w-3.5 h-3.5" />
              <span>DEV.to</span>
            </a>
          </div>
        </footer>
      </article>
    </main>
  );
}
