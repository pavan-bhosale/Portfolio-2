import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pavan Bhosale — Software Developer | AI/ML | Full Stack",
  description:
    "Interactive portfolio of Pavan Bhosale, Computer Science (Data Science) profile focused on software development, AI/ML systems, and full-stack web solutions.",
  keywords: [
    "Pavan Bhosale",
    "Software Developer",
    "AI/ML",
    "Data Science",
    "Full Stack",
    "NeuroNotes",
    "GreenCode",
    "VCET",
  ],
  authors: [{ name: "Pavan Bhosale" }],
  creator: "Pavan Bhosale",
  openGraph: {
    title: "Pavan Bhosale — Software Developer | AI/ML | Full Stack",
    description:
      "Enter PAVAN.OS — an immersive interactive journey through software development, AI/ML, and sustainable computing.",
    url: "https://pavanbhosale.dev",
    siteName: "Pavan Bhosale Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Bhosale — Software Developer | AI/ML | Full Stack",
    description:
      "Enter PAVAN.OS — an immersive interactive journey through software development, AI/ML, and sustainable computing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#050507] text-[#F3F1EA] font-sans antialiased overflow-x-hidden selection:bg-[#B8FF4A] selection:text-[#050507]">
        {children}
      </body>
    </html>
  );
}
