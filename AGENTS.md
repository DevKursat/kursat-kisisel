<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project & Publishing Continuity (`kursat.itibar.app`)

- **Canonical Content & Distribution Spec:** Always read `/Users/kursat/social-pipeline/blog.md` before creating blog posts or modifying publishing/syndication flows.
- **Next.js 16 Cache Components:** `cacheComponents: true` and `partialPrefetching: true` are active in `next.config.ts`. Never export `runtime = 'nodejs'` or `runtime = 'edge'` on routes, and wrap `useSearchParams()` client trees in `<Suspense>`.
- **4-Language Blog Gate:** Every post lives in `src/data/posts/<slug>.ts` (`tr` + `en`, `de`, `es` translations) and is registered at the top of `src/data/blogPosts.ts`. Always run `bun run verify:blog && bun run build` before committing or deploying.
- **Organic Engagement Stack (Preserve on Edits):**
  - `src/components/ArticleEngagementHub.tsx` + `src/app/api/poll/route.ts` + `src/data/postDiscussions.ts`: 1-click architectural dilemma poll, live `publishedUrls` discussion bridge, and zero-login technical comment/reaction board.
  - `src/components/NewsletterSignupBox.tsx`: 24-point Production AI Security & Cost Audit lead magnet with instant `.md` download and `/tools?tab=checklist` unlock.
  - `src/app/tools/page.tsx` + `src/components/ToolsHubClient.tsx`: Interactive LLM API vs. Bare-Metal GPU/VRAM Break-Even Calculator, Multi-Agent `p^N` Simulator, and 24-Point Audit Matrix.
- **Channel Cadence:**
  - **Daily (`VSE >= 80`):** Blog (4 langs) + X (`@DevKursat`) + DEV.to + Hashnode + Bluesky (`syndicate_global_channels.mjs`).
  - **Selective Flagships (`VSE >= 90`):** LinkedIn (`3–4/week`, `36–48h` breathing window) and Medium (`2–3/week`, `>=48h` breathing window).
