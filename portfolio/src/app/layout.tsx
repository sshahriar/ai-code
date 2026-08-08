import type { Metadata, Viewport } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { ChatWidget } from "@/components/chat/chat-widget";
import { siteConfig } from "@/data/profile";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shahriarnewaz.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} · ${siteConfig.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.headline,
  keywords: [
    "Shahriar Newaz",
    "Software Engineer",
    "SELISE Digital Platforms",
    "ASP.NET Core",
    "TypeScript",
    "JavaScript",
    "Competitive Programming",
    "ICPC",
    "Bangladesh",
    "IIUC",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.headline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.headline,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${outfit.variable} ${sourceSerif.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
