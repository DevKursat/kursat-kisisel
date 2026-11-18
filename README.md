# kursat.itibar.app — Engineering Portfolio, Multilingual GEO Blog & Ops Telemetry Vault

Production flagship web platform for **Kürşat Yılmaz** (`DevKursat`), combining a high-contrast engineering portfolio, a multilingual (`tr`, `en`, `de`, `es`) GEO-indexed technical blog, and an authenticated real-time operations & publishing telemetry vault.

**Live Production:** [https://kursat.itibar.app](https://kursat.itibar.app)

---

## Core Architecture

- **Framework & Styling:** Next.js `16.4.6` (App Router), React `19.3.0`, TypeScript, Tailwind CSS `4.3.3`, Framer Motion, Lenis.
- **GEO & LLM Discovery Layer:** Dedicated endpoints at `/llms.txt`, `/llms-full.txt`, `/rss.xml`, `/sitemap.xml`, `/news-sitemap.xml`, and dynamic Open Graph image generation (`/api/og`).
- **Multilingual Technical Publishing (`/blog`):** Supports `tr`, `en`, `de`, and `es` long-form engineering post-mortems, benchmarks, and arbitrage analyses verified via `scripts/verify-blog.mjs`.
- **Encrypted Operations Vault (`/vault-ky` & `/api/ops`):** Firebase Admin (`firebase-admin`) backed telemetry, freelance tracking, multi-axis comment filtering, and instant publishing trigger sync (`src/data/opsSnapshot.json`).

---

## Local Development

```bash
bun install
bun run dev
```

Verify blog integrity and build before deploying:

```bash
bun run verify:blog
bun run build
```

---

## Key Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Engineering portfolio, selected works & live telemetry terminal |
| `/blog` | Multilingual technical archive (`tr`, `en`, `de`, `es`) |
| `/llms.txt` & `/llms-full.txt` | Machine-readable GEO context for AI search engines |
| `/rss.xml` & `/news-sitemap.xml` | Real-time syndication and news indexing feeds |
| `/vault-ky` | Authenticated operations, analytics & pipeline trigger console |
| `/links` | Unified creator & engineering distribution hub |

---

**Author:** Kürşat Yılmaz — [kursat@itibar.app](mailto:kursat@itibar.app) · [@DevKursat](https://x.com/DevKursat)
