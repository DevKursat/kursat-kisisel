"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import {
  BLOG_LANGUAGES,
  getBlogLangMeta,
  getLocalizedPost,
  resolveBlogLang,
  type BlogPostItem,
} from "@/data/blogPosts";
import { LinkedinIcon, DevtoIcon } from "@/components/Icons";

export function BlogPostArticleBody({ rawPost }: { rawPost: BlogPostItem }) {
  const searchParams = useSearchParams();
  const activeLang = resolveBlogLang(searchParams.get("lang"));
  return <ArticleMarkup rawPost={rawPost} activeLang={activeLang} />;
}

export function ArticleMarkup({
  rawPost,
  activeLang = "tr",
}: {
  rawPost: BlogPostItem;
  activeLang?: ReturnType<typeof resolveBlogLang>;
}) {
  const post = getLocalizedPost(rawPost, activeLang);
  const langMeta = getBlogLangMeta(activeLang);

  const availableLanguages = BLOG_LANGUAGES.filter(
    (item) => item.code === "tr" || Boolean(rawPost.translations?.[item.code])
  );

  return (
    <article dir={langMeta.dir} className="pt-28 pb-24 max-w-3xl mx-auto px-6 sm:px-8">
      {availableLanguages.length > 1 && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5" dir="ltr">
          {availableLanguages.map((item) => {
            const isActive = item.code === activeLang;
            const href =
              item.code === "tr" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${item.code}`;
            return (
              <Link
                key={item.code}
                href={href}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all border ${
                  isActive
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

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
  );
}
