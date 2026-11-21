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

  if (searchParams.get("mode") === "sponsor") {
    try {
      const absPosterPath = path.join(
        process.cwd(),
        "public",
        "videos",
        "sponsor-hero-desktop-poster.jpg"
      );
      let posterDataUri = "";
      try {
        const buf = await fs.readFile(absPosterPath);
        posterDataUri = `data:image/jpeg;base64,${buf.toString("base64")}`;
      } catch {
        posterDataUri = "";
      }

      const sponsorStats = [
        { label: "CUMULATIVE REACH", value: "1M+" },
        { label: "LINKEDIN PEAK", value: "127.4K+" },
        { label: "DECISION MAKERS", value: "78% CTOs" },
      ];

      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              backgroundColor: "#050505",
              color: "#F3EFEA",
              padding: "44px",
              justifyContent: "space-between",
              alignItems: "stretch",
              fontFamily: "sans-serif",
            }}
          >
            {/* Left Visual Column */}
            <div
              style={{
                display: "flex",
                width: "410px",
                height: "100%",
                borderRadius: "22px",
                border: "1px solid rgba(243,239,234,0.16)",
                backgroundColor: "#0A0A0C",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {posterDataUri ? (
                <img
                  src={posterDataUri}
                  alt="Kürşat Yılmaz Partner"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    fontSize: "28px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    color: "#C4BEB4",
                  }}
                >
                  KY // PARTNER
                </div>
              )}
            </div>

            {/* Right Editorial Column */}
            <div
              style={{
                display: "flex",
                width: "666px",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingLeft: "36px",
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
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#C4BEB4",
                  }}
                >
                  KÜRŞAT YILMAZ · PARTNER
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(243,239,234,0.22)",
                    backgroundColor: "rgba(243,239,234,0.06)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#F3EFEA",
                  }}
                >
                  MEDIA KIT 2026
                </div>
              </div>

              {/* Center Hero Copy */}
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
                    flexDirection: "column",
                    fontSize: "52px",
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    color: "#F3EFEA",
                  }}
                >
                  <div style={{ display: "flex" }}>1M+ Organic Reach.</div>
                  <div style={{ display: "flex" }}>Put Your Stack First.</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "19px",
                    lineHeight: 1.45,
                    color: "#C4BEB4",
                  }}
                >
                  Production benchmarks &amp; founder-led launches across 4 languages and 11 channels. Cash sponsorships or API / Cloud GPU credits.
                </div>
              </div>

              {/* Bottom Telemetry & URL Row */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(243,239,234,0.14)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    width: "100%",
                  }}
                >
                  {sponsorStats.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#0A0A0C",
                        border: "1px solid rgba(243,239,234,0.14)",
                        borderRadius: "14px",
                        padding: "12px 18px",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          fontSize: "11px",
                          letterSpacing: "0.08em",
                          color: "#8E8A84",
                          marginBottom: "4px",
                        }}
                      >
                        {stat.label}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#F3EFEA",
                        }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    fontSize: "14px",
                    color: "#8E8A84",
                    fontWeight: 600,
                  }}
                >
                  <div style={{ display: "flex" }}>kursat.itibar.app/sponsor</div>
                  <div style={{ display: "flex" }}>kursat@itibar.app</div>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    } catch (error) {
      console.error("Sponsor OG generation error:", error);
      return new Response("Failed to generate Sponsor OG image", { status: 500 });
    }
  }

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
