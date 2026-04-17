import { ImageResponse } from "next/og";
import { products } from "@/lib/data";

export const alt = "VanLifeKitchen review card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const name = product?.name ?? "Van Life Kitchen Gear";
  const category = product?.category ?? "Reviews";
  const score = product?.score ?? 9.0;
  const verdict = product?.verdict ?? "";
  const price = product?.priceLabel ?? "";
  const author = product?.author ?? "VanLifeKitchen";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#faf8f5",
          fontFamily: "system-ui, sans-serif",
          padding: 64,
          position: "relative",
        }}
      >
        {/* Warm orange accent bar */}
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

        {/* Left: content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            paddingRight: 48,
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#d97706",
                marginBottom: 28,
              }}
            >
              {category} · Review
            </div>
            {/* Title */}
            <div
              style={{
                fontSize: name.length > 48 ? 56 : 68,
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#1c1917",
                letterSpacing: -1.5,
                display: "flex",
              }}
            >
              {name}
            </div>
            {/* Verdict */}
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.4,
                color: "#57534e",
                marginTop: 24,
                fontStyle: "italic",
                display: "flex",
              }}
            >
              &ldquo;{verdict.slice(0, 140)}{verdict.length > 140 ? "…" : ""}&rdquo;
            </div>
          </div>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "2px solid #e7e5e4",
              paddingTop: 24,
              marginTop: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 24,
                color: "#1c1917",
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "#d97706",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                  fontSize: 22,
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
                color: "#78716c",
                fontWeight: 600,
              }}
            >
              By {author}
            </div>
          </div>
        </div>

        {/* Right: score + price tile */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            backgroundColor: "#1c1917",
            borderRadius: 32,
            color: "white",
            padding: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#fbbf24",
              marginBottom: 12,
            }}
          >
            Score
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {score}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#a8a29e",
              marginBottom: 32,
            }}
          >
            of 10
          </div>
          {price && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderTop: "1px solid #44403c",
                paddingTop: 20,
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  color: "#a8a29e",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 4,
                }}
              >
                Starting at
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 32,
                  fontWeight: 800,
                  color: "white",
                }}
              >
                {price}
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
