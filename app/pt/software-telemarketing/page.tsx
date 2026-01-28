import type { Metadata } from "next";
import { outboundPT } from "@/content/outbound.pt";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: outboundPT.meta.title,
  description: outboundPT.meta.description,
  keywords: outboundPT.meta.keywords,
};

export default function SoftwareTelemarketingPage() {
  return <CallCenterPage content={outboundPT} />;
}
