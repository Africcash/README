import type { Metadata } from "next";
import { AppColors } from "@/components/reuseables/app_colors";
import { Navbar } from "@/components/layouts/landing/navbar";
import { Hero } from "@/components/layouts/landing/hero";
import { WalletToCash } from "@/components/layouts/landing/wallet-to-cash";
import { FromNearbyAgent } from "@/components/layouts/landing/from-nearby-agent";
import { Faq, faqs } from "@/components/layouts/landing/faq";
import { WalletSetupBanner } from "@/components/layouts/landing/wallet-setup-banner";
import { Footer } from "@/components/layouts/landing/footer";
import { siteUrl } from "@/lib/site-config";

// Scoped to this route only — setting `openGraph.url`/`alternates.canonical`
// on the root layout instead breaks metadata for dynamic routes like /app/agents/[id].
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AfriCash",
    url: siteUrl,
    logo: `${siteUrl}/icons/Africcash.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AfriCash",
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div
        style={{
          background: `radial-gradient(circle at center, ${AppColors.darkGreen}, ${AppColors.lightGreen} 70%)`,
        }}
      >
        <Navbar />
        <Hero />
      </div>
      <WalletToCash />
      <Faq />
      <FromNearbyAgent />
      <WalletSetupBanner />
      <Footer />
    </div>
  );
}

