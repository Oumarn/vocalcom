import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
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
  title: "La Plateforme de Centre de Contact IA Conçue pour l'Échelle",
  description: "Vocalcom.ai unifie chaque canal, client et agent dans une plateforme IA native pour une CX plus rapide et humaine.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CookieConsent />
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
