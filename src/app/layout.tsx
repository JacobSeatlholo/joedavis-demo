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
  title: "Joe Davis Auto Locksmiths | Key Cutting, Transponder Programming & LASA-Accredited Work",
  description:
    "Mobile auto locksmith serving South Africa. Professional key cutting, transponder programming, and LASA-accredited automotive locksmith work. Request a service via WhatsApp for fast follow-up.",
  keywords: [
    "auto locksmith",
    "key cutting",
    "transponder programming",
    "LASA accredited",
    "car keys",
    "Joe Davis",
    "joedavis.co.za",
    "South Africa locksmith",
    "mobile locksmith",
  ],
  authors: [{ name: "Joe Davis Auto Locksmiths" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL("https://joedavis.co.za"),
  alternates: {
    canonical: "https://joedavis.co.za",
  },
  openGraph: {
    title: "Joe Davis Auto Locksmiths",
    description:
      "Mobile auto locksmith — key cutting, transponder programming & LASA-accredited work. WhatsApp us to request a service.",
    url: "https://joedavis.co.za",
    siteName: "Joe Davis Auto Locksmiths",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Davis Auto Locksmiths",
    description:
      "Mobile auto locksmith — key cutting, transponder programming & LASA-accredited work.",
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
