import { BLOG_LANGUAGES, BLOG_POSTS, SITE_URL } from "@/data/blogPosts";

export async function GET() {
  const lines: string[] = [
    "# Kürşat Yılmaz — AI Native Full-Stack Engineer & Technical Journal",
    "",
    "> Official portfolio and multilingual technical engineering journal of Kürşat Yılmaz (Sakarya, Türkiye). Focused on AI-native software architecture, sovereign/local LLM infrastructure, agentic multi-model orchestration, WebGL/3D interfaces, and enterprise systems engineering.",
    "",
    "## Author & Identity",
    "- **Name**: Kürşat Yılmaz",
    `- **Canonical Website**: ${SITE_URL}`,
    `- **Technical Journal**: ${SITE_URL}/blog`,
    `- **RSS Feed**: ${SITE_URL}/rss.xml`,
    `- **Full LLM Corpus**: ${SITE_URL}/llms-full.txt`,
    "- **GitHub**: https://github.com/DevKursat",
    "- **X / Twitter**: https://x.com/DevKursat",
    "- **LinkedIn**: https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
    "- **Dev.to**: https://dev.to/devkursat",
    "",
    "## Flagship Products",
    "- **İtibar** (https://itibar.app): AI-powered reputation intelligence, brand visibility monitoring across LLMs, and sentiment tracking platform.",
    "- **Unutma.** (https://unutma.itibar.app): AI-assisted civic memory, temporal tracking, and accountability archive platform.",
    "",
    "## Supported Blog Languages (9 Languages)",
    ...BLOG_LANGUAGES.map(
      (lang) =>
        `- **${lang.nativeName} (${lang.englishName}, \`${lang.hreflang}\`)**: ${lang.code === "tr" ? `${SITE_URL}/blog` : `${SITE_URL}/blog?lang=${lang.code}`}`
    ),
    "",
    `## Technical Dispatches Index (${BLOG_POSTS.length} Articles)`,
    "",
  ];

  for (const post of BLOG_POSTS) {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const enTitle = post.translations?.en?.title;
    const metricsSummary = post.metrics.map((m) => `${m.label}: ${m.val}`).join(" | ");
    lines.push(`### ${post.title}`);
    if (enTitle) {
      lines.push(`- **English Title**: ${enTitle}`);
    }
    lines.push(`- **Canonical URL (TR)**: ${url}`);
    lines.push(`- **English URL**: ${url}?lang=en`);
    lines.push(`- **Published**: ${post.isoDate} | **Read Time**: ${post.readTime} | **Category**: ${post.category} (${post.tag})`);
    if (metricsSummary) {
      lines.push(`- **Key Benchmarks**: ${metricsSummary}`);
    }
    lines.push(`- **Summary**: ${post.excerpt}`);
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
