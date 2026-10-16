import type { Metadata, Viewport } from "next";
import { Geist_Mono, Google_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site-config";

const googleSans = Google_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — AfriCash",
  },
  description: siteDescription,
  keywords: [
    "AfriCash",
    "USDC to cash",
    "Stellar",
    "Soroban escrow",
    "cash agents",
    "crypto off-ramp",
    "non-custodial exchange",
  ],
  applicationName: "AfriCash",
  authors: [{ name: "AfriCash" }],
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  openGraph: {
    type: "website",
    siteName: "AfriCash",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#7657FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans", googleSans.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
