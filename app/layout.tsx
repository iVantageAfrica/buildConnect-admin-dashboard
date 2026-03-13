import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/libs/providers";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buildconnect.com"),
  title: {
    default: "BuildConnect - Connect Clients with Trusted Builders",
    template: "%s | BuildConnect",
  },
  description:
    "BuildConnect helps you find verified builders and contractors for your construction projects. Post your project, receive bids, and hire the best builder — all in one place.",
  keywords: [
    "find builders",
    "hire contractors",
    "construction projects",
    "building contractors",
    "project bids",
    "verified builders",
    "construction platform",
    "home renovation",
    "contractor marketplace",
    "building professionals",
    "construction management",
    "client contractor connect",
  ],
  authors: [{ name: "BuildConnect" }],
  creator: "BuildConnect",
  publisher: "BuildConnect",
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
    google: 'f7e1503caf31ecdd',
  },
  openGraph: {
    title: "BuildConnect - Connect Clients with Trusted Builders",
    description:
      "Post your construction project and receive bids from verified builders. Find the right contractor for any job — fast, easy, and reliable.",
    url: "https://buildconnect.com",
    siteName: "BuildConnect",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildConnect - Find Trusted Builders for Your Project",
    description:
      "Post a project, get bids, hire verified builders. BuildConnect makes construction hiring simple for clients and professionals.",
    creator: "@BuildConnect",
    site: "@BuildConnect",
  },
  alternates: {
    canonical: "https://buildconnect.com",
  },
  category: "Construction & Real Estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BuildConnect",
    "description":
      "A marketplace platform that connects clients with verified builders and contractors. Post projects, receive competitive bids, and manage construction from start to finish.",
    "url": "https://buildconnect.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Post construction projects",
      "Receive bids from verified builders",
      "Builder profile and portfolio review",
      "Milestone-based payment tracking",
      "Client and contractor messaging",
      "Project progress management",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2463EB" />
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