import type { Metadata } from "next";
import { outboundFR } from "@/content/outbound.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: outboundFR.meta.title,
  description: outboundFR.meta.description,
  keywords: outboundFR.meta.keywords,
};

export default function LogicielTeleprospectionPage() {
  return <CallCenterPage content={outboundFR} />;
}
