import type { Metadata } from "next";
import { outboundEN } from "@/content/outbound.en";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: outboundEN.meta.title,
  description: outboundEN.meta.description,
  keywords: outboundEN.meta.keywords,
};

export default function OutboundSoftwarePage() {
  return <CallCenterPage content={outboundEN} />;
}
