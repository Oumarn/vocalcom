import type { Metadata } from "next";
import { competitorGenesysFR } from "@/content/competitor-genesys.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: competitorGenesysFR.meta.title,
  description: competitorGenesysFR.meta.description,
  keywords: competitorGenesysFR.meta.keywords,
};

export default function AlternativeGenesysPage() {
  return <CallCenterPage content={competitorGenesysFR} />;
}
