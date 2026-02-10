import type { Metadata } from "next";
import { comparatifFR } from "@/content/comparatif.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: comparatifFR.meta.title,
  description: comparatifFR.meta.description,
  keywords: comparatifFR.meta.keywords,
};

export default function ComparatifPage() {
  return <CallCenterPage content={comparatifFR} />;
}
