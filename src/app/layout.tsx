import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://mediabuyercom.vercel.app";
const SITE_NAME = "mediabuyer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "mediabuyer — Native Ad Intelligence",
    template: "%s · mediabuyer",
  },
  description:
    "Discover winning Taboola, Outbrain, MGID and RevContent campaigns. Hourly-fresh native ad intelligence for performance marketers.",
  applicationName: SITE_NAME,
  keywords: [
    "native ad spy tool",
    "taboola spy",
    "outbrain spy",
    "mgid spy",
    "revcontent spy",
    "ad intelligence",
    "affiliate marketing",
    "competitive intelligence",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "mediabuyer — Native Ad Intelligence",
    description:
      "Discover winning Taboola, Outbrain, MGID and RevContent campaigns. Hourly-fresh native ad intelligence for performance marketers.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "mediabuyer — Native Ad Intelligence",
    description:
      "Hourly-fresh native ad intelligence: Taboola, Outbrain, MGID, RevContent.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Native ad intelligence for performance marketers — Taboola, Outbrain, MGID, RevContent.",
  };
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/spy?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-foreground focus:text-background focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
      </body>
    </html>
  );
}
