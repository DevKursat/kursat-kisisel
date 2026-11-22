import {
  BLOG_LANGUAGES,
  type BlogLang,
  type BlogPostItem,
  type BlogPostSummary,
  type BlogPostSummaryTranslation,
} from "./blogIndex";

import post00_signal from "./posts/signal-ai-ajanlari-ekran-goruntusu-kilidi";
import post00_riemann from "./posts/levent-alpoge-claude-riemann-hipotezi-17-milyon-satir-lean-kaniti";
import post00_starlink from "./posts/elon-musk-spacex-25-milyar-starlink-cati-baz-istasyonu";
import post00_neon from "./posts/google-gemini-4-neon-fiyat-arbitraji-ve-harness-gercegi";
import post00 from "./posts/microsoft-agent-framework-pypi-trojani";
import post00a from "./posts/alibaba-qwen4-max-kapali-model-carki";
import post00b from "./posts/anthropic-ipo-26-milyar-dongusel-sermaye";
import post01 from "./posts/openai-chatgpt-wallet-ve-lovable-veri-sizintisi";
import post02 from "./posts/nvidia-jensen-huang-megaspeed-skandali";
import post03 from "./posts/claude-code-secret-leak-gitignore-skandali";
import post04 from "./posts/microsoft-ve-claude-cokus-bulut-sla-yalani";
import post05 from "./posts/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari";
import post06 from "./posts/nvidia-jensen-huang-cin-casusluk-skandali";
import post07 from "./posts/ai-bumerangi-muhendislerin-donusu";
import post08 from "./posts/sam-altman-ram-krizi";
import post09 from "./posts/claude-code-trojan-npm-analiz";
import post10 from "./posts/ollama-performans-vergisi-vllm";
import post11 from "./posts/qwen-acik-kaynak-silikon-vadisi";
import post12 from "./posts/openai-1-2-milyon-dolarlik-linux-exploit-skandali";
import post13 from "./posts/10-kasim-teknolojik-egemenlik-ve-ataturk";

export * from "./blogIndex";

export const BLOG_POSTS: BlogPostItem[] = [
  post00_signal,
  post00_riemann,
  post00_starlink,
  post00_neon,
  post00,
  post00a,
  post00b,
  post01,
  post02,
  post03,
  post04,
  post05,
  post06,
  post07,
  post08,
  post09,
  post10,
  post11,
  post12,
  post13,
];

export function getBlogPostBySlug(slug: string): BlogPostItem | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function toBlogPostSummary(post: BlogPostItem): BlogPostSummary {
  let summaryTranslations:
    | Partial<Record<Exclude<BlogLang, "tr">, BlogPostSummaryTranslation>>
    | undefined;

  if (post.translations) {
    summaryTranslations = {};
    for (const meta of BLOG_LANGUAGES) {
      if (meta.code === "tr") continue;
      const tr = post.translations[meta.code];
      if (tr) {
        summaryTranslations[meta.code] = {
          tag: tr.tag,
          title: tr.title,
          excerpt: tr.excerpt,
          date: tr.date,
          readTime: tr.readTime,
          metrics: tr.metrics,
        };
      }
    }
  }

  return {
    slug: post.slug,
    tag: post.tag,
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    isoDate: post.isoDate,
    readTime: post.readTime,
    imageUrl: post.imageUrl,
    metrics: post.metrics,
    ...(summaryTranslations ? { translations: summaryTranslations } : {}),
  };
}

export function getBlogPostSummaries(): BlogPostSummary[] {
  return BLOG_POSTS.map(toBlogPostSummary);
}

export function getRelatedPostSummaries(slug: string, limit = 3): BlogPostSummary[] {
  const current = getBlogPostBySlug(slug);
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      if (current) {
        const aMatch = a.category === current.category ? 0 : 1;
        const bMatch = b.category === current.category ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
      }
      return b.isoDate.localeCompare(a.isoDate);
    })
    .slice(0, limit)
    .map(toBlogPostSummary);
}
