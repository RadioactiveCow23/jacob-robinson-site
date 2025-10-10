import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jacob Robinson — Speaker & Entrepreneur",
  description:
    "Jacob Robinson inspires teams to think boldly, act courageously, and lead with heart. Book Jacob for your next event.",
  openGraph: {
    title: "Jacob Robinson — Speaker & Entrepreneur",
    description:
      "Finding Joy in the Valley: Jacob's story of purpose, resilience, and building DIG World.",
    url: "https://your-domain.com",
    siteName: "Jacob Robinson",
    images: [{ url: "/jacob/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob Robinson — Speaker & Entrepreneur",
    description: "Your valleys have value, and your dreams are worth chasing.",
    images: ["/jacob/og.jpg"],
  },
  icons: {
    icon: "/jacob_favicon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
