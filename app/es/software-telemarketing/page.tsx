import type { Metadata } from "next";
import { outboundES } from "@/content/outbound.es";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: outboundES.meta.title,
  description: outboundES.meta.description,
  keywords: outboundES.meta.keywords,
};

export default function SoftwareTelemarketingPage() {
  return <CallCenterPage content={outboundES} />;
}
