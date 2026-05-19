import type { Metadata } from "next";
import AppHeader from "../components/AppHeader";
import { landingES } from "@/content/landing.es";
import AppFooterEs from "../components/AppFooterES";

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
      <AppFooterEs content={landingES.footer} />
    </>
  );
}
