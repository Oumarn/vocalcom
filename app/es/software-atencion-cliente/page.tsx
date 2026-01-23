import { customerServiceES } from "@/content/customer-service.es";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata = {
    title: customerServiceES.meta.title,
    description: customerServiceES.meta.description,
};

export default function SoftwareAtencionClientePage() {
    return <CallCenterPage content={customerServiceES} />;
}
