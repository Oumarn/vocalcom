import type { Metadata } from "next";
import { bpoEN } from "@/content/bpo.en";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: bpoEN.meta.title,
  description: bpoEN.meta.description,
  keywords: bpoEN.meta.keywords,
};

export default function BPOOutsourcingPage() {
  return <CallCenterPage content={bpoEN} />;
}
