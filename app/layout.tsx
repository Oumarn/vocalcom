import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocalcom - AI-First Contact Center Platform",
  description: "Vocalcom unifies every channel, customer, and agent in an AI-native platform for faster, more human CX.",
  icons: {
    icon: "/apple-touch-icon.png",
  },
   openGraph: {
    images: ["/apple-touch-icon.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
