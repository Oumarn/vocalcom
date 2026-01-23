import { customerServicePT } from "@/content/customer-service.pt";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata = {
    title: customerServicePT.meta.title,
    description: customerServicePT.meta.description,
};

export default function SoftwareAtendimentoClientePage() {
    return <CallCenterPage content={customerServicePT} />;
}
