import { ImageResponse } from "next/og";
import { setups } from "@/lib/data";

export const runtime = "edge";
export const alt = "VanLifeKitchen real setup card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return setups.map((s) => ({ slug: s.slug }));
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const setup = setups.find((s) => s.slug === params.slug);
  const name = setup?.name ?? "Real Van Kitchen Build";
  const vanType = setup?.vanType ?? "Van Build";
  const budget = setup?.budget ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#fef3e2",
          fontFamily: "system-ui, sans-serif",
          padding: 72,
          position: "relative",
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#d97706",
                marginBottom: 28,
              }}
            >
              Real Setup · {vanType}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 900,
                color: "#1c1917",
                lineHeight: 1,
                letterSpacing: -2,
                marginBottom: 32,
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#57534e",
                lineHeight: 1.35,
                maxWidth: 900,
              }}
            >
              Inside the build — every product, every trade-off, every lesson learned.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "2px solid #e7e5e4",
              paddingTop: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 26,
                color: "#1c1917",
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
            {budget && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 14,
                    color: "#78716c",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginBottom: 4,
                  }}
                >
                  Total gear cost
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 40,
                    fontWeight: 900,
                    color: "#1c1917",
                  }}
                >
                  {budget}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
