import type { Metadata } from "next";
import { callCenterES } from "@/content/call-center.es";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: callCenterES.meta.title,
  description: callCenterES.meta.description,
  keywords: callCenterES.meta.keywords,
};

export default function SoftwareCallCenterPage() {
  return <CallCenterPage content={callCenterES} />;
}
