import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The dashboard is wallet-gated and has no useful content for crawlers.
      disallow: "/app/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
