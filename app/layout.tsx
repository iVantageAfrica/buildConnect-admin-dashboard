import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/libs/providers";


const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dnwhouse.com"),
  title: {
    default: "Dnwhouse - Domain Research & Keyword Analysis Tool",
    template: "%s | Dnwhouse",
  },
  description:
    "Discover powerful domain insights and keyword research tools. Search across 350M+ domains for your next big idea. Affordable domain research for investors and SEO professionals.",
  keywords: [
    "domain research",
    "keyword research",
    "keyword analysis",
    "domain finder",
    "SEO tool",
    "related keywords",
    "domain metrics",
    "backlink analysis",
    "domain value",
    "keyword planner",
    "domain investor tools",
    "expired domains",
  ],
  authors: [{ name: "Dnwhouse" }],
  creator: "Dnwhouse",
  publisher: "Dnwhouse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: 'f7e1503caf31ecdd', // Your Google verification code
  },
  openGraph: {
    title: "Dnwhouse - Domain Research & Keyword Analysis Tool",
    description:
      "Search across 350M+ domains to find the perfect name for your next project. Powerful keyword research and domain insights.",
    url: "https://dnwhouse.com",
    siteName: "Dnwhouse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dnwhouse - Domain Research & Keyword Tool",
    description:
      "Search 350M+ domains. Powerful keyword research and domain analysis for investors and SEO professionals.",
    creator: "@DomainSwif96103",
    site: "@DomainSwif96103",
  },
  alternates: {
    canonical: "https://dnwhouse.com",
  },
  category: "SEO Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dnwhouse",
    "description": "Domain research and keyword analysis tool with access to 350M+ domains. Perfect for domain investors and SEO professionals.",
    "url": "https://dnwhouse.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Domain keyword research",
      "350M+ domain database",
      "Related keyword discovery",
      "Domain metrics analysis",
      "Fast search results"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#016FB9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${urbanist.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}