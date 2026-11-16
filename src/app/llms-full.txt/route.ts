import {
  BLOG_LANGUAGES,
  BLOG_POSTS,
  SITE_URL,
  generatePostFaqs,
  getLocalizedPost,
} from "@/data/blogPosts";

export async function GET() {
  const lines: string[] = [
    "# Kürşat Yılmaz — Complete Technical Engineering Corpus (llms-full.txt)",
    "",
    `> Full structured technical knowledge base for Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). Contains complete canonical articles, verified engineering benchmarks, structured Q&A pairs, and multilingual edition links across ${BLOG_LANGUAGES.length} languages.`,
    "",
    `- **Author**: Kürşat Yılmaz (${SITE_URL})`,
    `- **Concise Index**: ${SITE_URL}/llms.txt`,
    `- **Blog Archive**: ${SITE_URL}/blog`,
    `- **RSS Feed**: ${SITE_URL}/rss.xml`,
    `- **Total Dispatches**: ${BLOG_POSTS.length}`,
    "",
    "---",
    "",
  ];

  for (const rawPost of BLOG_POSTS) {
    const canonicalUrl = `${SITE_URL}/blog/${rawPost.slug}`;
    const enPost = getLocalizedPost(rawPost, "en");
    const faqsTr = generatePostFaqs(rawPost, "tr");
    const faqsEn = generatePostFaqs(rawPost, "en");

    lines.push(`## ${rawPost.title}`);
    if (enPost.title !== rawPost.title) {
      lines.push(`### EN: ${enPost.title}`);
    }
    lines.push("");
    lines.push(`- **Canonical URL**: ${canonicalUrl}`);
    lines.push(`- **Published**: ${rawPost.isoDate}`);
    lines.push(`- **Category / Tag**: ${rawPost.category} / ${rawPost.tag}`);
    lines.push(`- **Read Time**: ${rawPost.readTime}`);
    lines.push(
      `- **Multilingual Editions**: ${BLOG_LANGUAGES.map((l) =>
        l.code === "tr" ? `tr: ${canonicalUrl}` : `${l.hreflang}: ${canonicalUrl}?lang=${l.code}`
      ).join(" | ")}`
    );
    lines.push("");
    lines.push("#### Key Engineering Metrics");
    for (const m of rawPost.metrics) {
      lines.push(`- **${m.label}**: ${m.val}`);
    }
    lines.push("");
    lines.push("#### Executive Summary (TR)");
    lines.push(rawPost.excerpt);
    lines.push("");
    if (enPost.excerpt !== rawPost.excerpt) {
      lines.push("#### Executive Summary (EN)");
      lines.push(enPost.excerpt);
      lines.push("");
    }
    lines.push("#### Full Technical Article (TR)");
    for (const paragraph of rawPost.content) {
      lines.push(paragraph);
      lines.push("");
    }
    if (enPost.content.length > 0 && enPost.title !== rawPost.title) {
      lines.push("#### Full Technical Article (EN)");
      for (const paragraph of enPost.content) {
        lines.push(paragraph);
        lines.push("");
      }
    }
    lines.push("#### Answer Engine FAQ (TR)");
    for (const faq of faqsTr) {
      lines.push(`- **Q:** ${faq.question}`);
      lines.push(`  **A:** ${faq.answer}`);
    }
    lines.push("");
    lines.push("#### Answer Engine FAQ (EN)");
    for (const faq of faqsEn) {
      lines.push(`- **Q:** ${faq.question}`);
      lines.push(`  **A:** ${faq.answer}`);
    }
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
