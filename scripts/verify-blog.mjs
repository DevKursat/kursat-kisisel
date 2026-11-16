import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const ROOT_DIR = process.cwd();
const BLOG_INDEX_PATH = path.join(ROOT_DIR, "src", "data", "blogIndex.ts");
const BLOG_POSTS_PATH = path.join(ROOT_DIR, "src", "data", "blogPosts.ts");
const REQUIRED_TRANSLATIONS = ["en", "de", "es"];
const ALLOWED_CATEGORIES = new Set(["mimari", "donanim", "llm", "guvenlik"]);

function loadTsModule(filePath, customRequire) {
  const source = fs.readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });

  const mod = { exports: {} };
  const fn = vm.runInThisContext(
    `(function(exports, require, module, __filename, __dirname) { ${outputText}\n })`,
    { filename: filePath }
  );
  fn(mod.exports, customRequire, mod, filePath, path.dirname(filePath));
  return mod.exports;
}

function main() {
  const blogIndexExports = loadTsModule(BLOG_INDEX_PATH, require);
  const blogPostsExports = loadTsModule(BLOG_POSTS_PATH, (spec) => {
    if (spec === "./blogIndex") return blogIndexExports;
    if (spec.startsWith("./posts/")) {
      const postPath = path.join(ROOT_DIR, "src", "data", `${spec.slice(2)}.ts`);
      return loadTsModule(postPath, (nestedSpec) => {
        if (nestedSpec === "../blogIndex") return blogIndexExports;
        return require(nestedSpec);
      });
    }
    return require(spec);
  });

  const posts = blogPostsExports.BLOG_POSTS;
  if (!Array.isArray(posts) || posts.length === 0) {
    console.error("FAIL: BLOG_POSTS is empty or not an array.");
    process.exit(1);
  }

  const errors = [];
  const seenSlugs = new Set();

  for (const post of posts) {
    const slug = post?.slug || "(missing-slug)";
    if (!post?.slug || typeof post.slug !== "string") {
      errors.push(`Missing valid slug on post`);
      continue;
    }
    if (seenSlugs.has(slug)) {
      errors.push(`[${slug}] Duplicate slug detected`);
    }
    seenSlugs.add(slug);

    if (!ALLOWED_CATEGORIES.has(post.category)) {
      errors.push(`[${slug}] Invalid category: ${post.category}`);
    }
    for (const field of ["tag", "title", "excerpt", "date", "readTime", "imageUrl"]) {
      if (!post[field] || typeof post[field] !== "string" || !post[field].trim()) {
        errors.push(`[${slug}] Missing or empty required field: ${field}`);
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.isoDate || "")) {
      errors.push(`[${slug}] Invalid isoDate format (expected YYYY-MM-DD): ${post.isoDate}`);
    }
    if (!Array.isArray(post.metrics) || post.metrics.length < 2) {
      errors.push(`[${slug}] Expected at least 2 metrics`);
    }
    if (!Array.isArray(post.content) || post.content.length < 2) {
      errors.push(`[${slug}] Expected at least 2 content paragraphs`);
    }

    const relImage = String(post.imageUrl || "").replace(/^\/+/, "");
    const absImage = path.join(ROOT_DIR, "public", relImage);
    if (!fs.existsSync(absImage)) {
      errors.push(`[${slug}] Image asset missing on disk: public/${relImage}`);
    } else if (fs.statSync(absImage).size === 0) {
      errors.push(`[${slug}] Image asset is 0 bytes: public/${relImage}`);
    }

    const translations = post.translations || {};
    for (const lang of REQUIRED_TRANSLATIONS) {
      const tr = translations[lang];
      if (!tr) {
        errors.push(`[${slug}] Missing translation key: ${lang}`);
        continue;
      }
      for (const field of ["tag", "title", "excerpt", "date", "readTime"]) {
        if (!tr[field] || typeof tr[field] !== "string" || !tr[field].trim()) {
          errors.push(`[${slug}][${lang}] Missing field: ${field}`);
        }
      }
      if (!Array.isArray(tr.metrics) || tr.metrics.length < 2) {
        errors.push(`[${slug}][${lang}] Expected at least 2 translated metrics`);
      }
      if (!Array.isArray(tr.content) || tr.content.length < 2) {
        errors.push(`[${slug}][${lang}] Expected at least 2 translated paragraphs`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Blog pre-publish verification FAILED:");
    for (const err of errors) {
      console.error(` - ${err}`);
    }
    process.exit(1);
  }

  console.log(
    `OK: Verified ${posts.length} blog posts x ${REQUIRED_TRANSLATIONS.length + 1} languages & local image assets.`
  );
}

main();
