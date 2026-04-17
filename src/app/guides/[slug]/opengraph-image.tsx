import { ImageResponse } from "next/og";
import { guides } from "@/lib/data";

export const runtime = "edge";
export const alt = "VanLifeKitchen field guide card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);
  const title = guide?.title ?? "Van Life Field Guide";
  const category = guide?.category ?? "Field Guide";
  const excerpt = guide?.excerpt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1917",
          fontFamily: "system-ui, sans-serif",
          padding: 72,
          position: "relative",
          color: "white",
        }}
      >
        {/* Orange accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: "#d97706",
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#fbbf24",
            marginBottom: 32,
          }}
        >
          Field Guide · {category}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 56 ? 60 : 76,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: -2,
            maxWidth: 1050,
            marginBottom: 28,
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            lineHeight: 1.35,
            color: "#d6d3d1",
            maxWidth: 1050,
            marginBottom: "auto",
          }}
        >
          {excerpt.slice(0, 160)}{excerpt.length > 160 ? "…" : ""}
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #44403c",
            paddingTop: 28,
            marginTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "#d97706",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 18,
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              ▲
            </div>
            vanlifekitchens.com
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#a8a29e",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Independent · Ad-free
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
