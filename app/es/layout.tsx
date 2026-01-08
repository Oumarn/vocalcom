import type { Metadata } from "next";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { landingES } from "@/content/landing.es";

export const metadata: Metadata = {
  title: landingES.meta.title,
  description: landingES.meta.description,
};

export default function SpanishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader content={landingES.header} />
      {children}
      <AppFooter content={landingES.footer} />
    </>
  );
}
