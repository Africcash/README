import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AfriCash",
    short_name: "AfriCash",
    description: "Turn USDC into local cash with nearby agents, secured by Stellar Soroban escrow.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7657FF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
