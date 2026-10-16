import { ImageResponse } from "next/og"

export const alt = "AfriCash — Turn USDC into Local Cash with Nearby Agents"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "radial-gradient(circle at center, #A2D729, #F6FBEA 70%)",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: "#1a1a1a" }}>AfriCash</div>
        <div style={{ fontSize: 32, color: "#3a3a3a", maxWidth: 820, textAlign: "center" }}>
          Turn USDC into Local Cash, with Nearby Agents
        </div>
      </div>
    ),
    size
  )
}
