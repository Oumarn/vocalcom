import type { Metadata } from "next";
import { bpoFR } from "@/content/bpo.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: bpoFR.meta.title,
  description: bpoFR.meta.description,
  keywords: bpoFR.meta.keywords,
};

export default function BPOOutsourcingPage() {
  return <CallCenterPage content={bpoFR} />;
}
