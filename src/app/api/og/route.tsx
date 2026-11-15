import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getLocalizedPost,
  resolveBlogLang,
} from "@/data/blogPosts";

function getMimeType(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const langParam = searchParams.get("lang");

  try {
    const post = getBlogPostBySlug(slug) ?? BLOG_POSTS[0];
    const resolvedLang = resolveBlogLang(langParam);
    // Satori default font renders Latin scripts crisply; fallback non-Latin scripts to English on the OG canvas
    const renderLang = ["tr", "en", "es", "pt", "de"].includes(resolvedLang)
      ? resolvedLang
      : "en";
    const localized = getLocalizedPost(post, renderLang);

    const safeRelPath = post.imageUrl.replace(/^\/+/, "");
    const absImagePath = path.join(process.cwd(), "public", safeRelPath);
    let imageDataUri = "";
    try {
      const buf = await fs.readFile(absImagePath);
      const mime = getMimeType(absImagePath);
      imageDataUri = `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
      imageDataUri = "";
    }

    const titleLen = localized.title.length;
    const titleFontSize = titleLen > 78 ? 34 : titleLen > 56 ? 38 : 42;
    const metrics = localized.metrics.slice(0, 2);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "#060608",
            color: "#ffffff",
            padding: "48px",
            justifyContent: "space-between",
            alignItems: "stretch",
            fontFamily: "sans-serif",
          }}
        >
          {/* Left Column: Typography, Tag, Excerpt & Telemetry Metrics */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "630px",
              height: "100%",
              paddingRight: "24px",
            }}
          >
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15px",
                  letterSpacing: "0.08em",
                  color: "#a1a1aa",
                  fontWeight: 700,
                }}
              >
                KÜRŞAT YILMAZ // {renderLang === "tr" ? "GÜNLÜK" : "JOURNAL"}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#e4e4e7",
                  letterSpacing: "0.06em",
                }}
              >
                {localized.tag}
              </div>
            </div>

            {/* Title & Excerpt */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: `${titleFontSize}px`,
                  fontWeight: 800,
                  lineHeight: 1.12,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                }}
              >
                {localized.title}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  lineHeight: 1.45,
                  color: "#a1a1aa",
                }}
              >
                {localized.excerpt.length > 155
                  ? `${localized.excerpt.slice(0, 152)}...`
                  : localized.excerpt}
              </div>
            </div>

            {/* Bottom Telemetry Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: "18px",
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div style={{ display: "flex", gap: "16px" }}>
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#0c0c10",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "14px",
                      padding: "10px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        color: "#71717a",
                        marginBottom: "2px",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      {metric.val}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "14px",
                  color: "#71717a",
                  fontWeight: 600,
                }}
              >
                kursat.itibar.app
              </div>
            </div>
          </div>

          {/* Right Column: Original Press / Technical Visual Frame */}
          <div
            style={{
              display: "flex",
              width: "430px",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "#0c0c10",
              padding: "16px",
              overflow: "hidden",
            }}
          >
            {imageDataUri ? (
              <img
                src={imageDataUri}
                alt={localized.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "14px",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#52525b",
                }}
              >
                KÜRŞAT YILMAZ
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG generation error:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
