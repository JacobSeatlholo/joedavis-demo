import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joe Davis Locksmiths | Security for life since 1947 — Gqeberha",
  description:
    "Established 1947 in Gqeberha (Port Elizabeth). Vehicle key coding, key cutting, access controls, locksmithing and safes. LASA-accredited, PSIRA-registered, 24/7 emergency callouts across the Eastern Cape.",
  keywords: [
    "locksmith",
    "Gqeberha locksmith",
    "Port Elizabeth locksmith",
    "key cutting",
    "vehicle key coding",
    "transponder programming",
    "access controls",
    "safes",
    "LASA accredited",
    "PSIRA registered",
    "Joe Davis",
    "joedavis.co.za",
    "Eastern Cape locksmith",
    "emergency locksmith",
  ],
  authors: [{ name: "Joe Davis Locksmiths" }],
  icons: {
    icon: [
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "500x500", type: "image/png" }],
  },
  metadataBase: new URL("https://joedavis.co.za"),
  alternates: {
    canonical: "https://joedavis.co.za",
  },
  openGraph: {
    title: "Joe Davis Locksmiths — Security for life since 1947",
    description:
      "Gqeberha's trusted locksmiths since 1947. Key cutting, vehicle key coding, access controls, locksmithing and safes. LASA-accredited, PSIRA-registered, 24/7 emergency callouts.",
    url: "https://joedavis.co.za",
    siteName: "Joe Davis Locksmiths",
    type: "website",
    locale: "en_ZA",
    images: [{ url: "/assets/hero-workshop.jpg", width: 1187, height: 881, alt: "Joe Davis Locksmiths — Est. 1947" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Davis Locksmiths",
    description:
      "Security for life since 1947. Key cutting, vehicle key coding, access controls, locksmithing and safes — Gqeberha, Eastern Cape.",
    images: ["/assets/hero-workshop.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
